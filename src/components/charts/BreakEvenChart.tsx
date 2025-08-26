import { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { calculateMonthlyCanProjection } from "@/lib/projection-utils";

interface DashboardData {
  vendaLatasPrimeiroMes: number;
  valorLocacaoLata: number;
  precoGasolina: number;
  distanciaDescarte: number;
  taxaCrescimentoMensal: number;
  salariosEncargos: number;
  aluguelPonto: number;
  etapaCrescimento: "primeira" | "expansao";
}

interface BreakEvenChartProps {
  dados: DashboardData;
  totalCustosVariaveis: number;
  totalCustosFixos: number;
  limiteLatas: number;
  etapaCrescimento: "primeira" | "expansao";
}

export function BreakEvenChart({ dados, totalCustosVariaveis, totalCustosFixos, limiteLatas, etapaCrescimento }: BreakEvenChartProps) {
  const chartData = useMemo(() => {
    const data = [];
    const custoVariavelPorLata = totalCustosVariaveis / dados.vendaLatasPrimeiroMes;
    const margemContribuicao = dados.valorLocacaoLata - custoVariavelPorLata;
    
    // Para break-even, usar custos base (primeira unidade)
    const breakEvenLatas = totalCustosFixos / margemContribuicao;
    const breakEvenReceita = breakEvenLatas * dados.valorLocacaoLata;
    
    // Gerar dados para 12 meses
    for (let mes = 1; mes <= 12; mes++) {
      const latasProjetadas = calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, mes, limiteLatas);
      const receitaProjetada = latasProjetadas * dados.valorLocacaoLata;
      
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
      
      const custoTotal = (totalCustosFixos * multiplicadorCustos) + (latasProjetadas * custoVariavelPorLata * multiplicadorCustos);
      const lucro = receitaProjetada - custoTotal;
      
      data.push({
        mes: `${mes}`,
        receita: Math.round(receitaProjetada),
        custoTotal: Math.round(custoTotal),
        lucro: Math.round(lucro),
        breakEvenReceita: Math.round(breakEvenReceita),
        latasProjetadas: Math.round(latasProjetadas),
      });
    }
    
    return { data, breakEvenLatas: Math.round(breakEvenLatas), breakEvenReceita: Math.round(breakEvenReceita) };
  }, [dados, totalCustosVariaveis, totalCustosFixos, limiteLatas]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">Mês {label}</p>
          <p className="text-nalata-orange">
            Receita: {formatCurrency(data.receita)}
          </p>
          <p className="text-nalata-black">
            Custo Total: {formatCurrency(data.custoTotal)}
          </p>
          <p className={`${data.lucro >= 0 ? 'text-chart-profit' : 'text-destructive'}`}>
            Lucro: {formatCurrency(data.lucro)}
          </p>
          <p className="text-muted-foreground">
            Latas: {data.latasProjetadas}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Break-Even Latas</p>
          <p className="text-2xl font-bold text-primary">{chartData.breakEvenLatas}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Break-Even Receita</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(chartData.breakEvenReceita)}</p>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData.data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="mes" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <ReferenceLine 
            y={chartData.breakEvenReceita} 
            stroke="hsl(var(--chart-breakeven-line))" 
            strokeDasharray="5 5"
            label={{ value: "Break-Even", position: "insideTopRight" }}
          />
          <Line 
            type="monotone" 
            dataKey="receita" 
            stroke="hsl(var(--chart-breakeven-revenue))" 
            strokeWidth={3}
            name="Receita Projetada"
            dot={{ fill: "hsl(var(--chart-breakeven-revenue))", strokeWidth: 2, r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="custoTotal" 
            stroke="hsl(var(--chart-breakeven-cost))" 
            strokeWidth={3}
            name="Custo Total"
            dot={{ fill: "hsl(var(--chart-breakeven-cost))", strokeWidth: 2, r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}