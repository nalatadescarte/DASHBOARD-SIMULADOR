import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from "recharts";
import { calculateMonthlyCanProjection } from "@/lib/projection-utils";

interface DashboardData {
  vendaLatasPrimeiroMes: number;
  valorLocacaoLata: number;
  precoGasolina: number;
  distanciaDescarte: number;
  taxaCrescimentoMensal: number;
  salariosEncargos: number;
  aluguelPonto: number;
}

interface RevenueChartProps {
  dados: DashboardData;
  periodo: "12" | "24" | "36";
  limiteLatas: number;
}

export function RevenueChart({ dados, periodo, limiteLatas }: RevenueChartProps) {
  const chartData = useMemo(() => {
    const meses = parseInt(periodo);
    const data = [];
    
    for (let i = 1; i <= meses; i++) {
      const latasDoMes = calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, i, limiteLatas);
      const faturamento = latasDoMes * dados.valorLocacaoLata;
      
      data.push({
        mes: `Mês ${i}`,
        faturamento: Math.round(faturamento),
        latas: Math.round(latasDoMes),
      });
    }
    
    return data;
  }, [dados, periodo, limiteLatas]);

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
          <p className="text-nalata-orange">
            Faturamento: {formatCurrency(payload[0].value)}
          </p>
          <p className="text-nalata-black">
            Latas: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis 
          dataKey="mes" 
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <YAxis 
          yAxisId="faturamento"
          orientation="left"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
          tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
        />
        <YAxis 
          yAxisId="latas"
          orientation="right"
          stroke="hsl(var(--muted-foreground))"
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar 
          yAxisId="faturamento"
          dataKey="faturamento" 
          fill="hsl(var(--chart-revenue-bar))" 
          name="Faturamento (R$)"
          radius={[4, 4, 0, 0]}
        />
        <Line 
          yAxisId="latas"
          type="monotone" 
          dataKey="latas" 
          stroke="hsl(var(--chart-revenue-line))" 
          strokeWidth={3}
          name="Crescimento de Latas"
          dot={{ fill: "hsl(var(--chart-revenue-line))", strokeWidth: 2, r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}