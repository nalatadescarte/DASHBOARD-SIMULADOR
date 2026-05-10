import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { SimResult } from "@/lib/nalata-model";

interface Props {
  result: SimResult;
}

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

export function BreakEvenPanel({ result }: Props) {
  const { breakEvenMes, meses, capitalDeGiro, investimentoTotal } = result;

  const mesBE = breakEvenMes ? meses[breakEvenMes - 1] : null;
  const capitalConsumido = meses
    .slice(0, (breakEvenMes ?? meses.length) - 1)
    .reduce((acc, m) => acc + m.deficit, 0);

  return (
    <Card className="border-nalata-orange/20 shadow-elegant mb-6">
      <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Break-even Operacional
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {breakEvenMes ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="rounded-lg border bg-card p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Mês do Break-even</div>
                <div className="text-4xl font-black text-chart-profit">M{breakEvenMes}</div>
              </div>
              {mesBE && (
                <>
                  <div className="rounded-lg border bg-card p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Receita no break-even</div>
                    <div className="text-lg font-bold text-primary">{fmtBRL(mesBE.receitaTotal)}</div>
                  </div>
                  <div className="rounded-lg border bg-card p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Despesa no break-even</div>
                    <div className="text-lg font-bold">{fmtBRL(mesBE.despesaTotal)}</div>
                  </div>
                </>
              )}
              <div className="rounded-lg border bg-card p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Capital consumido até BE</div>
                <div className="text-lg font-bold text-amber-600">{fmtBRL(capitalConsumido)}</div>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-4 text-sm text-blue-800 dark:text-blue-200">
              <strong>Provisão recomendada (1,6×):</strong> mantenha{" "}
              <strong>{fmtBRL(capitalDeGiro)}</strong> de capital de giro reservado para cobrir o
              período pré-break-even com folga operacional. Investimento total projetado:{" "}
              <strong>{fmtBRL(investimentoTotal)}</strong>.
            </div>

            {/* Mini tabela de déficits mensais */}
            <details className="rounded-lg border bg-card">
              <summary className="p-3 text-sm font-semibold cursor-pointer select-none hover:bg-muted/30 rounded-lg">
                Déficits mensais acumulados (expandir)
              </summary>
              <div className="p-3 pt-0">
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2 text-xs">
                  {meses.map((m) => (
                    <div
                      key={m.mes}
                      className={`rounded p-2 border text-center ${
                        m.lucroMensal >= 0
                          ? "border-green-200 bg-green-50 dark:bg-green-950/20"
                          : "border-red-200 bg-red-50 dark:bg-red-950/20"
                      }`}
                    >
                      <div className="text-muted-foreground">M{m.mes}</div>
                      <div className={`font-semibold ${m.lucroMensal >= 0 ? "text-chart-profit" : "text-destructive"}`}>
                        {m.lucroMensal >= 0 ? "+" : ""}{fmtBRL(m.lucroMensal).replace("R$\u00a0", "")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </details>
          </div>
        ) : (
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 p-4 text-sm text-red-800 dark:text-red-200">
            Break-even não atingido em 12 meses com os parâmetros atuais. Revise a taxa de conversão,
            o preço unitário ou o modo de operação.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
