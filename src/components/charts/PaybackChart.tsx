import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
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
  etapaCrescimento: "primeira" | "expansao";
}

interface PaybackChartProps {
  dados: DashboardData;
  totalCustosVariaveis: number;
  totalCustosFixos: number;
  limiteLatas: number;
  etapaCrescimento: "primeira" | "expansao";
  getSalarioPorMes: (mes: number) => number;
}

export function PaybackChart({ dados, totalCustosVariaveis, totalCustosFixos, limiteLatas, etapaCrescimento, getSalarioPorMes }: PaybackChartProps) {
  const chartData = useMemo(() => {
    const meses = [];
    let lucroAcumulado = -dados.investimentoInicial;
    let mesPayback = null;

    for (let mes = 1; mes <= 36; mes++) {
      const latasDoMes = calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, mes, limiteLatas);
      const receitaMensal = latasDoMes * dados.valorLocacaoLata;
      
      // Aplicar multiplicador de custos apenas a partir do mês que exceder 320 latas
      let multiplicadorCustos = 1;
      if (etapaCrescimento === "expansao") {
        // Encontrar o primeiro mês que ultrapassa 320 latas
        let primeiroMesAcima320 = null;
        for (let m = 1; m <= mes; m++) {
          const latasDoMesCheck = calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, m, 640);
          if (latasDoMesCheck > 320) {
            primeiroMesAcima320 = m;
            break;
          }
        }
        
        // Aplicar multiplicador apenas se já passou do primeiro mês que ultrapassa 320
        if (primeiroMesAcima320 && mes >= primeiroMesAcima320) {
          multiplicadorCustos = 2;
        }
      }
      
      const custosVariaveisMensal = (totalCustosVariaveis * multiplicadorCustos / dados.vendaLatasPrimeiroMes) * latasDoMes;
      
      // Calcular custos fixos com salário específico do mês
      const salarioDoMes = getSalarioPorMes(mes);
      const custosFixosSemSalario = totalCustosFixos - dados.salariosEncargos;
      const custosFixosMensal = (custosFixosSemSalario + salarioDoMes) * multiplicadorCustos;
      
      const lucroMensal = receitaMensal - custosVariaveisMensal - custosFixosMensal;
      
      lucroAcumulado += lucroMensal;

      if (!mesPayback && lucroAcumulado >= 0) {
        mesPayback = mes;
      }

      meses.push({
        mes: `Mês ${mes}`,
        mesNumero: mes,
        lucroAcumulado: lucroAcumulado,
        investimentoInicial: -dados.investimentoInicial,
      });
    }

    return { meses, mesPayback };
  }, [dados, totalCustosVariaveis, totalCustosFixos, limiteLatas, getSalarioPorMes]);

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
          <p className="font-semibold text-card-foreground">{label}</p>
          <p style={{ color: "hsl(var(--chart-profit))" }}>
            Lucro Acumulado: {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      {/* Indicadores de Payback */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Investimento Inicial</p>
          <p className="text-lg font-bold text-foreground">{formatCurrency(dados.investimentoInicial)}</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Payback (meses)</p>
          <p className="text-lg font-bold" style={{ color: "hsl(var(--chart-profit))" }}>
            {chartData.mesPayback ? `${chartData.mesPayback} meses` : "Não alcançado"}
          </p>
        </div>
      </div>
      
      {/* Gráfico de Payback */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData.meses}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="mes" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              interval={2}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="hsl(var(--border))" strokeDasharray="2 2" />
            {chartData.mesPayback && (
              <ReferenceLine 
                x={chartData.mesPayback} 
                stroke="hsl(var(--chart-profit))" 
                strokeDasharray="5 5"
                label={{ value: "Payback", position: "top" }}
              />
            )}
            <Line
              type="monotone"
              dataKey="lucroAcumulado"
              stroke="hsl(var(--chart-profit))"
              strokeWidth={3}
              dot={{ fill: "hsl(var(--chart-profit))", strokeWidth: 2 }}
              activeDot={{ r: 6, fill: "hsl(var(--chart-profit))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}