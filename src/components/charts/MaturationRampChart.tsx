import { useMemo } from "react";
import {
  ComposedChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import {
  OperationMode,
  Scenario,
  calcularReceitaMaturacao,
  gerarCurvaReceita,
  calcularDespesaMensal,
  mesBreakEven,
} from "@/lib/nalata-model";

interface Props {
  mode: OperationMode;
  scenario: Scenario;
  ticket: number;
  conversao: number;
  markup: number;
  latas: number;
}

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

export function MaturationRampChart({ mode, scenario, ticket, conversao, markup, latas }: Props) {
  const { data, breakEven, maturacao } = useMemo(() => {
    const receitaMat = calcularReceitaMaturacao({ latas, ticket, conversao, markup, scenario });
    const curva = gerarCurvaReceita(receitaMat);
    const breakEven = mesBreakEven(curva, mode);
    const data = curva.map((rec, i) => {
      const mes = i + 1;
      const desp = calcularDespesaMensal(mes, mode);
      const saldo = rec - desp;
      return {
        mes: `M${mes}`,
        receita: Math.round(rec),
        despesa: Math.round(desp),
        saldo: Math.round(saldo),
        deficit: saldo < 0 ? Math.round(desp) : 0, // área até a despesa quando saldo é negativo
      };
    });
    return { data, breakEven, maturacao: curva[11] };
  }, [mode, scenario, ticket, conversao, markup, latas]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs">
        <p className="font-semibold mb-1">{label}</p>
        <p className="text-chart-profit">Receita: {fmtBRL(d.receita)}</p>
        <p className="text-destructive">Despesa: {fmtBRL(d.despesa)}</p>
        <p className={d.saldo >= 0 ? "text-chart-profit font-bold" : "text-destructive font-bold"}>
          Saldo: {fmtBRL(d.saldo)}
        </p>
      </div>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(v) => `R$ ${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {/* Zona de déficit */}
          <Area
            type="monotone"
            dataKey="deficit"
            fill="hsl(var(--nalata-amber))"
            fillOpacity={0.18}
            stroke="hsl(var(--nalata-amber))"
            strokeOpacity={0.4}
            name="Zona de déficit (capital de giro)"
          />
          <Bar
            dataKey="receita"
            fill="hsl(var(--chart-profit))"
            name="Receita"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="despesa"
            fill="hsl(var(--destructive))"
            name="Despesa total"
            radius={[4, 4, 0, 0]}
          />
          {breakEven && (
            <ReferenceLine
              x={`M${breakEven}`}
              stroke="hsl(var(--nalata-amber))"
              strokeDasharray="4 4"
              label={{
                value: `Break-even — Mês ${breakEven}`,
                fill: "hsl(var(--nalata-amber-fg))",
                fontSize: 11,
                position: "insideTopRight",
              }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span>
          <strong className="text-chart-profit">Maturação (M12):</strong> {fmtBRL(maturacao)}
        </span>
        <span>
          <strong>Break-even:</strong>{" "}
          {breakEven ? `Mês ${breakEven}` : "não atingido em 12 meses"}
        </span>
      </div>
    </div>
  );
}
