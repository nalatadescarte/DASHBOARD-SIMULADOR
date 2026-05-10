import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import type { SimParams, SimResult } from "@/lib/nalata-model";
import { MODELO_CENARIOS } from "@/lib/nalata-model";

interface Props {
  result: SimResult;
  params: SimParams;
}

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });

export function MaturationRampChart({ result, params }: Props) {
  const cfg = MODELO_CENARIOS[params.scenario];

  const data = result.curva.map((rec, i) => ({
    mes: `M${i + 1}`,
    receita: rec,
    despesa: result.despesas[i],
    saldo: rec - result.despesas[i],
    latasAtivas: result.latasAtivasPorMes[i],
    latasFisicas: result.latasFisicasPorMes[i],
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg text-xs space-y-1">
        <p className="font-semibold mb-1">{label}</p>
        <p style={{ color: cfg.cor }}>Receita: {fmtBRL(d.receita)}</p>
        <p className="text-muted-foreground">Despesa: {fmtBRL(d.despesa)}</p>
        <p className={d.saldo >= 0 ? "text-green-600 font-bold" : "text-red-500 font-bold"}>
          Saldo: {fmtBRL(d.saldo)}
        </p>
        <p className="text-muted-foreground border-t border-border pt-1">
          {d.latasFisicas} latas físicas · {d.latasAtivas} locações
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
          <Bar
            dataKey="receita"
            name={`Receita — ${cfg.label}`}
            fill={cfg.cor}
            radius={[4, 4, 0, 0]}
            fillOpacity={0.85}
          />
          <Bar
            dataKey="despesa"
            name="Despesa total"
            fill="#374151"
            radius={[4, 4, 0, 0]}
            fillOpacity={0.75}
          />
          {result.breakEvenMes && (
            <ReferenceLine
              x={`M${result.breakEvenMes}`}
              stroke={cfg.cor}
              strokeDasharray="4 4"
              label={{
                value: `Break-even — Mês ${result.breakEvenMes}`,
                fill: cfg.cor,
                fontSize: 11,
                position: "insideTopRight",
              }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-3 flex flex-wrap gap-6 text-xs text-muted-foreground">
        <span>
          <strong style={{ color: cfg.cor }}>Cenário {cfg.label}:</strong>{" "}
          {(result.taxaCrescimentoMes * 100).toFixed(1)}%/mês · M1: {result.latasM1} latas
        </span>
        <span>
          <strong>Maturação (M12):</strong> {fmtBRL(result.receitaMaturacao)} ·{" "}
          {result.latasFisicasPorMes[11]} latas físicas
        </span>
        <span>
          <strong>Break-even:</strong>{" "}
          {result.breakEvenMes ? `Mês ${result.breakEvenMes}` : "não atingido em 12 meses"}
        </span>
      </div>
    </div>
  );
}
