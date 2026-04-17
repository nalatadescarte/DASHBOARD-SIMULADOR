import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HandMetal, Users, UserPlus, Sparkles } from "lucide-react";
import {
  OperationMode,
  Scenario,
  MODE_LABELS,
  calcularReceitaMaturacao,
  gerarCurvaReceita,
  calcularDespesaMensal,
  calcularCapitalDeGiro,
  mesBreakEven,
  TOTAL_FIXAS,
  SALARIO_ENTREGADOR,
} from "@/lib/nalata-model";

interface Props {
  mode: OperationMode;
  setMode: (m: OperationMode) => void;
  scenario: Scenario;
  setScenario: (s: Scenario) => void;
  ticket: number;
  setTicket: (n: number) => void;
  conversao: number;
  setConversao: (n: number) => void;
  markup: number;
  setMarkup: (n: number) => void;
  latas: number;
  setLatas: (n: number) => void;
}

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

export function NalataModel(props: Props) {
  const {
    mode, setMode, scenario, setScenario,
    ticket, setTicket, conversao, setConversao,
    markup, setMarkup, latas, setLatas,
  } = props;

  const receitaMaturacao = useMemo(
    () => calcularReceitaMaturacao({ latas, ticket, conversao, markup, scenario }),
    [latas, ticket, conversao, markup, scenario]
  );

  const curva = useMemo(() => gerarCurvaReceita(receitaMaturacao), [receitaMaturacao]);
  const breakEven = useMemo(() => mesBreakEven(curva, mode), [curva, mode]);
  const capitalGiro = useMemo(() => calcularCapitalDeGiro(curva, mode), [curva, mode]);
  const despesaMaturacao = calcularDespesaMensal(12, mode);
  const lucroMaturacao = curva[11] - despesaMaturacao;
  const margemLiquida = (lucroMaturacao / curva[11]) * 100;
  const investimentoTotal = 98370 + capitalGiro;
  const payback = lucroMaturacao > 0 ? Math.ceil(investimentoTotal / lucroMaturacao) : null;

  // Comparativo solo vs 1 colab
  const lucroSolo = curva[11] - calcularDespesaMensal(12, "solo");
  const lucro1Colab = curva[11] - calcularDespesaMensal(12, "um_colaborador");

  const modes: { id: OperationMode; icon: typeof HandMetal; desc: string }[] = [
    { id: "solo", icon: HandMetal, desc: fmtBRL(TOTAL_FIXAS) + "/mês" },
    { id: "um_colaborador", icon: UserPlus, desc: fmtBRL(TOTAL_FIXAS + SALARIO_ENTREGADOR) + "/mês" },
    { id: "equipe_completa", icon: Users, desc: "M1-M4: 1 colab / M5+: 2 colab" },
  ];

  return (
    <Card className="border-nalata-orange/20 shadow-elegant mb-6">
      <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Modelo Nalata Descarte Inteligente (REV6)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Modo de operação */}
        <div>
          <Label className="text-sm font-semibold mb-3 block">Modo de Operação</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {modes.map(({ id, icon: Icon, desc }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  mode === id
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border bg-card hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="font-semibold">{MODE_LABELS[id]}</span>
                </div>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Card especial Mão na Massa */}
        {mode === "solo" && (
          <div className="rounded-lg border-2 border-amber-500/40 bg-amber-50 dark:bg-amber-950/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <HandMetal className="h-5 w-5 text-amber-600" />
              <span className="font-bold text-amber-900 dark:text-amber-200">
                Modo Mão na Massa ativo
              </span>
              <Badge variant="outline" className="border-amber-500 text-amber-700">
                Salários: R$ 0,00
              </Badge>
            </div>
            <p className="text-sm text-amber-900/80 dark:text-amber-100/80 mb-2">
              Operação realizada pelo próprio franqueado. Ideal para a fase inicial de rampa.
            </p>
            <ul className="text-xs text-amber-900/70 dark:text-amber-100/70 space-y-1 mb-2">
              <li>✓ Menor custo fixo mensal</li>
              <li>✓ Break-even antecipado</li>
              <li>✓ Menor capital de giro necessário</li>
              <li>✓ Maior margem líquida nos primeiros meses</li>
            </ul>
            <p className="text-xs italic text-amber-900/70 dark:text-amber-100/70">
              Recomendação: contrate o primeiro colaborador quando o faturamento mensal superar
              R$ 15.000 por dois meses consecutivos.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-card rounded p-2 border">
                <div className="text-muted-foreground">Lucro Solo</div>
                <div className="font-bold text-chart-profit">{fmtBRL(lucroSolo)}</div>
              </div>
              <div className="bg-card rounded p-2 border">
                <div className="text-muted-foreground">Lucro 1 Colab</div>
                <div className="font-bold">{fmtBRL(lucro1Colab)}</div>
              </div>
            </div>
            <p className="mt-2 text-xs font-semibold text-amber-700">
              Economia de equipe: +{fmtBRL(lucroSolo - lucro1Colab)}/mês
            </p>
          </div>
        )}

        {/* Cenário */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Cenário</Label>
          <Tabs value={scenario} onValueChange={(v) => setScenario(v as Scenario)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="conservador">Conservador (-35%)</TabsTrigger>
              <TabsTrigger value="moderado">Moderado (base)</TabsTrigger>
              <TabsTrigger value="otimista">Otimista (+35%)</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between mb-2">
              <Label>Ticket médio por coleta/mês</Label>
              <span className="font-semibold text-primary">{fmtBRL(ticket)}</span>
            </div>
            <Slider min={200} max={800} step={10} value={[ticket]} onValueChange={(v) => setTicket(v[0])} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>Taxa de conversão</Label>
              <span className="font-semibold text-primary">{conversao}%</span>
            </div>
            <Slider min={3} max={25} step={1} value={[conversao]} onValueChange={(v) => setConversao(v[0])} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>Markup de precificação</Label>
              <span className="font-semibold text-primary">{markup.toFixed(2)}×</span>
            </div>
            <Slider min={1.2} max={2.5} step={0.05} value={[markup]} onValueChange={(v) => setMarkup(v[0])} />
            <p className="text-xs text-muted-foreground mt-1">
              Markup {markup.toFixed(2)} → margem aproximada de {Math.round((1 - 1 / markup) * 100)}%
            </p>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label>Quantidade de latas</Label>
              <span className="font-semibold text-primary">{latas}</span>
            </div>
            <Slider min={20} max={120} step={5} value={[latas]} onValueChange={(v) => setLatas(v[0])} />
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard label="Payback" value={payback ? `${payback} meses` : "—"} />
          <KpiCard
            label="Lucratividade"
            value={isFinite(margemLiquida) ? `${margemLiquida.toFixed(0)}%` : "—"}
          />
          <KpiCard label="Lucro Maturação" value={fmtBRL(Math.max(0, lucroMaturacao))} />
          <KpiCard label="Capital de Giro" value={fmtBRL(capitalGiro)} />
        </div>

        {/* DRE simplificado */}
        <div className="rounded-lg border bg-card p-4">
          <h4 className="font-bold mb-3">DRE — Mês de Maturidade (M12)</h4>
          <div className="space-y-1 text-sm font-mono">
            <Row label="(+) Faturamento Bruto" value={fmtBRL(curva[11])} />
            <Row
              label={mode === "solo" ? "(-) Equipe (Modo Solo)" : "(-) Salários e Encargos"}
              value={fmtBRL(despesaMaturacao - TOTAL_FIXAS)}
              negative
            />
            <Row label="(-) Ponto / Água / Luz" value="R$ 1.700,00" negative />
            <Row label="(-) Combustível / Manut. / Seguro" value="R$ 1.746,67" negative />
            <Row label="(-) Marketing / Royalties / Contab." value="R$ 3.130,00" negative />
            <Row label="(-) Parcela Veículo" value="R$ 1.139,51" negative />
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>(=) LUCRO LÍQUIDO MENSAL</span>
              <span className={lucroMaturacao < 0 ? "text-destructive" : "text-chart-profit"}>
                {fmtBRL(lucroMaturacao)}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Margem líquida: {isFinite(margemLiquida) ? margemLiquida.toFixed(1) : "—"}% · Break-even:{" "}
              {breakEven ? `Mês ${breakEven}` : "Não atingido em 12 meses"}
            </div>
          </div>
        </div>

        {/* Exportar */}
        <div className="flex justify-end">
          <Button
            variant="outline"
            onClick={() => exportarMarkdown({ mode, scenario, curva, lucroMaturacao, margemLiquida, payback, capitalGiro, investimentoTotal, ticket, conversao, markup, latas })}
          >
            Exportar Simulação (.md)
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function KpiCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-center">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-bold text-primary mt-1">{value}</div>
    </div>
  );
}

function Row({ label, value, negative }: { label: string; value: string; negative?: boolean }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={negative ? "text-destructive" : ""}>{value}</span>
    </div>
  );
}

function exportarMarkdown(data: any) {
  const md = `# Simulação Financeira Nalata

- **Modo de operação:** ${MODE_LABELS[data.mode as OperationMode]}
- **Cenário:** ${data.scenario}
- **Ticket médio:** ${fmtBRL(data.ticket)}
- **Taxa de conversão:** ${data.conversao}%
- **Markup:** ${data.markup}
- **Latas:** ${data.latas}

## Resultado (Mês 12)
- **Faturamento Bruto:** ${fmtBRL(data.curva[11])}
- **Lucro Líquido Mensal:** ${fmtBRL(data.lucroMaturacao)}
- **Margem Líquida:** ${data.margemLiquida.toFixed(1)}%
- **Payback:** ${data.payback ? data.payback + " meses" : "Não calculável"}
- **Capital de Giro:** ${fmtBRL(data.capitalGiro)}
- **Investimento Total:** ${fmtBRL(data.investimentoTotal)}

## Curva M1-M12
${data.curva.map((v: number, i: number) => `- Mês ${i + 1}: ${fmtBRL(v)}`).join("\n")}
`;
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `simulacao-nalata-${Date.now()}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
