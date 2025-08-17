import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DashboardData {
  vendaLatasPrimeiroMes: number;
  valorLocacaoLata: number;
  precoGasolina: number;
  distanciaDescarte: number;
  taxaCrescimentoMensal: number;
  salariosEncargos: number;
  aluguelPonto: number;
}

interface CostsChartProps {
  dados: DashboardData;
  botaForaLicenciado: number;
}

export function CostsChart({ dados, botaForaLicenciado }: CostsChartProps) {
  const chartData = useMemo(() => {
    const receitaBruta = dados.vendaLatasPrimeiroMes * dados.valorLocacaoLata;
    
    // Custos Variáveis - baseados no número de latas
    const custosVariaveis = dados.vendaLatasPrimeiroMes * botaForaLicenciado;
    
    // Custos Fixos Totais
    const custosFixosTotais = dados.salariosEncargos + dados.aluguelPonto;
    
    // Lucro Operacional
    const lucroOperacional = receitaBruta - custosVariaveis - custosFixosTotais;
    
    return [
      {
        name: "Custos Variáveis",
        value: custosVariaveis,
        color: "hsl(var(--chart-variable))",
      },
      {
        name: "Custos Fixos Totais",
        value: custosFixosTotais,
        color: "hsl(var(--chart-fixed))",
      },
      {
        name: "Lucro Operacional",
        value: Math.max(0, lucroOperacional),
        color: "hsl(var(--chart-profit))",
      },
    ].filter(item => item.value > 0);
  }, [dados, botaForaLicenciado]);

  const lucroInfo = useMemo(() => {
    const receitaBruta = dados.vendaLatasPrimeiroMes * dados.valorLocacaoLata;
    const custosVariaveis = dados.vendaLatasPrimeiroMes * botaForaLicenciado;
    const custosFixosTotais = dados.salariosEncargos + dados.aluguelPonto;
    const lucroOperacional = receitaBruta - custosVariaveis - custosFixosTotais;
    const margemLucro = receitaBruta > 0 ? (lucroOperacional / receitaBruta) * 100 : 0;
    
    return {
      receitaBruta,
      lucroOperacional,
      margemLucro,
    };
  }, [dados, botaForaLicenciado]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{data.name}</p>
          <p style={{ color: data.color }}>
            Valor: {formatCurrency(data.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="w-full">
      {/* Indicadores de Lucro */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Receita Bruta</p>
          <p className="text-lg font-bold text-foreground">{formatCurrency(lucroInfo.receitaBruta)}</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Lucro Operacional</p>
          <p className="text-lg font-bold" style={{ color: "hsl(var(--chart-profit))" }}>
            {formatCurrency(lucroInfo.lucroOperacional)}
          </p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Margem de Lucro</p>
          <p className="text-lg font-bold" style={{ color: "hsl(var(--chart-profit))" }}>
            {lucroInfo.margemLucro.toFixed(1)}%
          </p>
        </div>
      </div>
      
      {/* Gráfico de Pizza */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={CustomLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{
                paddingTop: '20px',
                fontSize: '14px'
              }}
              formatter={(value, entry: any) => {
                const total = chartData.reduce((sum, item) => sum + item.value, 0);
                const percentage = ((entry.payload.value / total) * 100).toFixed(1);
                return (
                  <span style={{ color: entry.color, fontWeight: 'bold' }}>
                    {value}: {formatCurrency(entry.payload.value)} ({percentage}%)
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}