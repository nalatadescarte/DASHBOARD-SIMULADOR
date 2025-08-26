import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { calculateMonthlyCanProjection } from "@/lib/projection-utils";

interface DashboardData {
  vendaLatasPrimeiroMes: number;
  valorLocacaoLata: number;
  precoGasolina: number;
  distanciaDescarte: number;
  taxaCrescimentoMensal: number;
  salariosEncargos: number;
  aluguelPonto: number;
  investimentoInicial: number;
}

interface ProfitabilityChartProps {
  dados: DashboardData;
  periodo: "12" | "24" | "36";
  totalCustosVariaveis: number;
  totalCustosFixos: number;
  limiteLatas: number;
  etapaCrescimento: "primeira" | "expansao";
}

export function ProfitabilityChart({ dados, periodo, totalCustosVariaveis, totalCustosFixos, limiteLatas, etapaCrescimento }: ProfitabilityChartProps) {
  const chartData = useMemo(() => {
    const meses = parseInt(periodo);
    const data = [];
    
    for (let mes = 1; mes <= meses; mes++) {
      const latasDoMes = calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, mes, limiteLatas);
      const receitaMensal = latasDoMes * dados.valorLocacaoLata;
      
      // Aplicar multiplicador de custos apenas quando a projeção exceder 320 latas
      let multiplicadorCustos = 1;
      if (etapaCrescimento === "expansao") {
        const latasPreviousMes = mes > 1 ? calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, mes - 1, limiteLatas) : 0;
        if (latasDoMes > 320 || latasPreviousMes > 320) {
          multiplicadorCustos = 2;
        }
      }
      
      const custosVariaveisMensal = (totalCustosVariaveis * multiplicadorCustos / dados.vendaLatasPrimeiroMes) * latasDoMes;
      const lucroMensal = receitaMensal - custosVariaveisMensal - (totalCustosFixos * multiplicadorCustos);
      const margemLucro = receitaMensal > 0 ? (lucroMensal / receitaMensal) * 100 : 0;
      
      data.push({
        mes: `${mes}`,
        mesNome: `Mês ${mes}`,
        receita: receitaMensal,
        lucro: Math.max(0, lucroMensal),
        margemLucro: margemLucro,
      });
    }
    
    return data;
  }, [dados, periodo, totalCustosVariaveis, totalCustosFixos, limiteLatas]);

  const lucroMedio = useMemo(() => {
    const totalLucro = chartData.reduce((acc, item) => acc + item.lucro, 0);
    const margemMedia = chartData.reduce((acc, item) => acc + item.margemLucro, 0) / chartData.length;
    return {
      lucroMedio: totalLucro / chartData.length,
      margemMedia: margemMedia,
    };
  }, [chartData]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">Mês {label}</p>
          <p style={{ color: "hsl(var(--chart-revenue))" }}>
            Receita: {formatCurrency(payload[0]?.payload?.receita || 0)}
          </p>
          <p style={{ color: "hsl(var(--chart-profit))" }}>
            Lucro: {formatCurrency(payload[0]?.value || 0)}
          </p>
          <p className="text-muted-foreground">
            Margem: {(payload[0]?.payload?.margemLucro || 0).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* Indicadores de Lucratividade */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Lucro Médio Mensal</p>
          <p className="text-lg font-bold" style={{ color: "hsl(var(--chart-profit))" }}>
            {formatCurrency(lucroMedio.lucroMedio)}
          </p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Margem Média</p>
          <p className="text-lg font-bold" style={{ color: "hsl(var(--chart-profit))" }}>
            {lucroMedio.margemMedia.toFixed(1)}%
          </p>
        </div>
      </div>
      
      {/* Gráfico de Área */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="mes" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="lucro"
              stroke="hsl(var(--chart-profit))"
              fill="hsl(var(--chart-profit))"
              fillOpacity={0.3}
              strokeWidth={2}
              name="Lucro Mensal"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}