import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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

interface CostsChartProps {
  dados: DashboardData;
  custosVariaveis: number;
  custosFixos: number;
  limiteLatas: number;
  etapaCrescimento: "primeira" | "expansao";
}

export function CostsChart({ dados, custosVariaveis, custosFixos, limiteLatas, etapaCrescimento }: CostsChartProps) {
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const chartData = useMemo(() => {
    // Calcular vendas do mês selecionado com crescimento e limite dinâmico de latas
    const vendasMes = calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, selectedMonth, limiteLatas);
    const receitaBruta = vendasMes * dados.valorLocacaoLata;
    
    // Aplicar multiplicador de custos apenas quando a projeção exceder 320 latas
    let multiplicadorCustos = 1;
    if (etapaCrescimento === "expansao") {
      const latasPreviousMes = selectedMonth > 1 ? calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, selectedMonth - 1, limiteLatas) : 0;
      if (vendasMes > 320 || latasPreviousMes > 320) {
        multiplicadorCustos = 2;
      }
    }
    
    const custosVariaveisAjustados = custosVariaveis * multiplicadorCustos;
    const custosFixosAjustados = custosFixos * multiplicadorCustos;
    
    // Cálculo dos impostos (aproximadamente 8% da receita bruta)
    const impostos = receitaBruta * 0.08;
    
    // Lucro Líquido
    const lucroLiquido = receitaBruta - custosVariaveisAjustados - custosFixosAjustados - impostos;
    
    return [
      {
        name: "Lucro Líquido",
        value: Math.max(0, lucroLiquido),
        color: "hsl(120, 70%, 50%)", // Verde vibrante
      },
      {
        name: "Custos Fixos",
        value: custosFixosAjustados,
        color: "hsl(var(--chart-fixed))",
      },
      {
        name: "Custos Variáveis",
        value: custosVariaveisAjustados,
        color: "hsl(var(--chart-variable))",
      },
      {
        name: "Impostos",
        value: impostos,
        color: "hsl(0, 70%, 60%)", // Vermelho para impostos
      },
    ].filter(item => item.value > 0);
  }, [dados, custosVariaveis, custosFixos, selectedMonth, limiteLatas, etapaCrescimento]);

  const lucroInfo = useMemo(() => {
    const vendasMes = calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, selectedMonth, limiteLatas);
    const receitaBruta = vendasMes * dados.valorLocacaoLata;
    
    // Aplicar multiplicador de custos apenas quando a projeção exceder 320 latas
    let multiplicadorCustos = 1;
    if (etapaCrescimento === "expansao") {
      const latasPreviousMes = selectedMonth > 1 ? calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, selectedMonth - 1, limiteLatas) : 0;
      if (vendasMes > 320 || latasPreviousMes > 320) {
        multiplicadorCustos = 2;
      }
    }
    
    const lucroOperacional = receitaBruta - (custosVariaveis * multiplicadorCustos) - (custosFixos * multiplicadorCustos);
    const margemLucro = receitaBruta > 0 ? (lucroOperacional / receitaBruta) * 100 : 0;
    
    return {
      receitaBruta,
      lucroOperacional,
      margemLucro,
    };
  }, [dados, custosVariaveis, custosFixos, selectedMonth, limiteLatas, etapaCrescimento]);

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
          <p className="text-lg font-bold" style={{ color: lucroInfo.lucroOperacional < 0 ? "hsl(0, 70%, 60%)" : "hsl(var(--chart-profit))" }}>
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
      
      {/* Gráfico de Pizza com Slider */}
      <div className="flex h-96">
        {/* Slider Vertical */}
        <div className="flex flex-col items-center justify-center w-20 mr-4">
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <div className="text-xs font-semibold text-muted-foreground mb-2 cursor-help">Mês {selectedMonth}</div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Escolha o mês de<br />projeção</p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
          <div className="h-72 flex items-center relative">
            {/* Linha vertical preta */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-black z-0"></div>
            
            {/* Labels dos meses - invertidos */}
            <div className="absolute left-full ml-2 h-full flex flex-col justify-between text-xs font-medium z-10">
              {['- Dez', '- Nov', '- Out', '- Set', '- Ago', '- Jul', '- Jun', '- Mai', '- Abr', '- Mar', '- Fev', '- Jan'].map((month, index) => (
                <span key={month} className="text-muted-foreground leading-none" style={{ transform: 'translateY(-50%)' }}>
                  {month}
                </span>
              ))}
            </div>
            
            <Slider
              value={[selectedMonth]}
              onValueChange={(value) => setSelectedMonth(value[0])}
              max={12}
              min={1}
              step={1}
              orientation="vertical"
              className="h-full z-20 relative"
            />
          </div>
          <div className="text-xs text-muted-foreground mt-2">Projeção</div>
        </div>
        
        {/* Gráfico */}
        <div className="flex-1">
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
    </div>
  );
}