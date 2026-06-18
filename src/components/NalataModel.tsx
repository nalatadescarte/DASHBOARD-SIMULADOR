import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ExcelJS from "exceljs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertTriangle, Info, ChevronDown, ChevronUp, Sparkles, Gauge, FileDown, FileText, Monitor, Table } from "lucide-react";
import {
  type Scenario,
  type OperationMode,
  type SimParams,
  type SimResult,
  DESPESAS_FIXAS_CONSTANTES,
  TAXA_MARKETING_NACIONAL,
  OPEX_MODULO,
  LATAS_POR_MODULO,
  PRECO_LATA,
  ESTOQUE_INICIAL_LATAS,
  CAPEX_MODULO,
  MODELO_CENARIOS,
  MODE_LABELS,
  LOCACOES_POR_PESSOA,
  SALARIO_FUNCIONARIO,
  VEICULO_EXTRA_THRESHOLD,
  calcNumFuncionarios,
  calcularLatasM1,
  calcularTotalFixoBase,
  calcularSimulacaoCompleta,
  calcularSimulacaoCenario,
  FATORES_CENARIO,
  PRECO_COMBUSTIVEL_DEFAULT,
  KM_RODADO_DEFAULT,
  TAXA_DESTINACAO_FINAL,
  TAXA_MANUTENCAO_KM,
} from "@/lib/nalata-model";

interface Props {
  params: SimParams;
  onChange: (p: SimParams) => void;
  result: SimResult;
}

const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

const ROI_FIXOS = [
  { label: "Imóvel (aluguel)", roi: 7.0, cor: "#94a3b8" },
  { label: "Poupança", roi: 8.4, cor: "#64748b" },
  { label: "CDI", roi: 10.5, cor: "#475569" },
];

export function NalataModel({ params, onChange, result }: Props) {
  const [showParams, setShowParams] = useState(false);

  const set = <K extends keyof SimParams>(key: K, value: SimParams[K]) =>
    onChange({ ...params, [key]: value });

  const {
    mode, scenario, latasAlvoM12, ciclosPorMes,
    precoMinimo, precoMaximo, mixAvulsa,
    pontoOperacional, mktDigitalAds, contabilidade,
    precoCombustivel, kmRodado,
    leadsPorSemana, taxaConversao, latasPorCliente,
  } = params;

  const {
    receitaMaturacao, lucroMaturacao, margemLiquida, capitalDeGiro,
    investimentoTotal, payback, rentabilidadeMes, roiAnual,
    roi12, roi24, breakEvenMes, precoMedioEfetivo,
    totalFixoBase, meses, latasAtivasPorMes, latasFisicasPorMes,
    numModulosPorMes, numFuncionariosPorMes, mesPrimeiroDegrau, investimentoCidade, despesaMaturacao,
  } = result;

  const parametrosConservadores = receitaMaturacao < 8000;

  const numFuncionariosM12 = numFuncionariosPorMes[11];
  const custoFuncionariosM12 = numFuncionariosM12 * SALARIO_FUNCIONARIO;

  // Occupancy gauge (M12 state)
  const ciclosM12 = latasAtivasPorMes[11] * ciclosPorMes;
  const modCap = LATAS_POR_MODULO;
  const ciclosUltimoModulo = ciclosM12 === 0 ? 0 : ((ciclosM12 - 1) % modCap) + 1;
  const ocupacaoPct = (ciclosUltimoModulo / modCap) * 100;
  const numModulosM12 = numModulosPorMes[11];

  // Three-scenario comparison
const scenariosComparacao = useMemo(() => {
  return (["conservador", "moderado", "otimista"] as Scenario[]).map((sc) => {
    const r = calcularSimulacaoCompleta({ ...params, scenario: sc });

    const sim = calcularSimulacaoCenario(
      params.leadsPorSemana,
      params.taxaConversao,
      params.latasPorCliente,
      params.latasAlvoM12,
      sc
    );

    return {
      scenario: sc,
      receita: r.receitaMaturacao,
      lucro: r.lucroMaturacao,
      payback: r.payback,
      latasM1: sim.m1,
      latasM12: sim.m12,
      breakEven: r.breakEvenMes,
      margem: r.margemLiquida,
      capitalDeGiro: r.capitalDeGiro,
      taxaCrescimento: r.taxaCrescimentoMes,
      deltaMedioLatas: sim.deltaMedioLatas,
      taxaMediaGeom: sim.taxaMediaGeom,
      exibicao: sim.exibicao,
    };
  });
}, [params]);

  const maxBar = Math.max(roiAnual * 1.1, 40);

  return (
    <Card className="border-nalata-orange/20 shadow-elegant mb-6">
      <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          Simulador de Franquia — Nalata REV7
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">

        {/* Cenário */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Cenário de Mercado</Label>
          <Tabs value={scenario} onValueChange={(v) => set("scenario", v as Scenario)}>
            <TabsList className="grid w-full grid-cols-3">
              {scenariosComparacao.map((s) => (
                <TabsTrigger key={s.scenario} value={s.scenario}>
                  {s.scenario === "conservador" ? "Conservador" : s.scenario === "moderado" ? "Moderado" : "Otimista"}
                  {" "}(+{s.deltaMedioLatas}/mês)
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          {(() => {
            const sc = scenariosComparacao.find((s) => s.scenario === scenario);
            if (!sc) return null;
            const descricoes: Record<string, { cor: string; label: string; desc: string }> = {
              conservador: { cor: "text-red-500",   label: "Conservador", desc: "baixa adesão — mercado com resistência ou franqueado em aprendizado" },
              moderado:    { cor: "text-amber-500", label: "Moderado — referência", desc: "crescimento consistente com ads bem otimizados" },
              otimista:    { cor: "text-green-500", label: "Otimista",   desc: "território premium + execução ativa" },
            };
            const d = descricoes[scenario];
            return (
              <div className="mt-3 rounded-lg bg-muted/50 border p-3 text-xs text-muted-foreground space-y-1">
                <p><strong className={d.cor}>{d.label}:</strong> {d.desc}.</p>
                <p>
                  Início (M1): <strong>{sc.latasM1} latas</strong>
                  {"  ·  "}Meta (M12): <strong>{sc.latasM12} latas</strong>
                  {"  ·  "}Crescimento: <strong>+{sc.deltaMedioLatas} latas ativas/mês</strong>
                </p>
                <p className="text-muted-foreground/70">
                  Via ads: {sc.exibicao.viaAds}
                  {" "}· {sc.exibicao.viaB2B}
                </p>
              </div>
            );
          })()}
        </div>

        {/* Modo operacional */}
        <div>
          <Label className="text-sm font-semibold mb-2 block">Modo Operacional</Label>
          <div className="flex gap-3">
            {(["solo", "um_funcionario", "dois_funcionarios"] as OperationMode[]).map((m) => (
              <button
                key={m}
                onClick={() => set("mode", m)}
                className={`flex-1 rounded-lg border-2 py-3 text-sm font-semibold transition-all ${
                  mode === m
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {MODE_LABELS[m]}
              </button>
            ))}
          </div>
          {(() => {
            const latasM12 = latasAtivasPorMes[11];
            const total = calcNumFuncionarios(mode, latasM12);
            const veiculoExtra = latasM12 > VEICULO_EXTRA_THRESHOLD;
            return (
              <div className="mt-2 rounded-lg bg-muted/50 border p-3 text-xs text-muted-foreground space-y-0.5">
                <p>
                  <strong>M12:</strong> {latasM12} locações ativas →{" "}
                  <strong>{total} funcionário{total !== 1 ? "s" : ""}</strong>
                  {" "}· Custo: <strong>{fmtBRL(total * SALARIO_FUNCIONARIO)}/mês</strong>
                  {veiculoExtra && (
                    <span className="text-amber-600 font-semibold"> · 2° veículo ativo (+{fmtBRL(DESPESAS_FIXAS_CONSTANTES.parcelaVeiculo)}/mês)</span>
                  )}
                </p>
                <p className="text-muted-foreground/70">
                  Escala: 0–99 latas → base do modo · 100–300 latas → {mode === "solo" ? "1 func." : "2 funcs."} · acima de 300 → {mode === "solo" ? "2 funcs." : "3 funcs."} + 2° veículo (35k CAPEX + parcela extra)
                </p>
              </div>
            );
          })()}
        </div>

        {/* Gauge de ocupação + alerta de módulo */}
        <div className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">Ocupação do Módulo em M12</span>
            </div>
            <span className="text-xs text-muted-foreground">
              {numModulosM12} módulo{numModulosM12 > 1 ? "s" : ""} operacional{numModulosM12 > 1 ? "is" : ""}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{ciclosUltimoModulo} ciclos no módulo {numModulosM12}</span>
              <span>{ciclosUltimoModulo}/{modCap} ({ocupacaoPct.toFixed(0)}%)</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all duration-500 ${
                  ocupacaoPct >= 100
                    ? "bg-red-500"
                    : ocupacaoPct >= 80
                    ? "bg-amber-400"
                    : "bg-green-500"
                }`}
                style={{ width: `${Math.min(ocupacaoPct, 100)}%` }}
              />
            </div>
          </div>
          {mesPrimeiroDegrau && (
            <div className="rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-300 p-2 text-xs text-amber-800 dark:text-amber-200">
              <strong>Alerta:</strong> frota precisará de 2° veículo (módulo adicional) no <strong>Mês {mesPrimeiroDegrau}</strong>.
              CAPEX: {fmtBRL(CAPEX_MODULO)} · OPEX adicional: {fmtBRL(OPEX_MODULO)}/mês
            </div>
          )}
          {ocupacaoPct >= 80 && ocupacaoPct < 100 && (
            <div className="rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-300 p-2 text-xs text-amber-800 dark:text-amber-200">
              <strong>Próximo do limite do módulo</strong> — {(modCap - ciclosUltimoModulo)} ciclos disponíveis. Planeje o próximo módulo.
            </div>
          )}
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <div className="text-muted-foreground">Latas ativas M12</div>
              <div className="font-bold">{latasAtivasPorMes[11]}</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Latas físicas M12</div>
              <div className="font-bold">{latasFisicasPorMes[11]}</div>
            </div>
            <div className="text-center">
              <div className="text-muted-foreground">Ciclos totais/mês</div>
              <div className="font-bold">{ciclosM12}</div>
            </div>
          </div>
        </div>

        {/* Toggle parâmetros */}
        <div>
          <button
            onClick={() => setShowParams((v) => !v)}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
          >
            {showParams ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {showParams ? "Ocultar parâmetros" : "Configurar parâmetros de frota, preço e custos"}
          </button>
        </div>

        {showParams && (
          <>
            {/* Aquisição de Clientes — base M1 (learning phase) */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Aquisição de Clientes — Base M1 (Learning Phase)</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Leads/semana (ads otimizados)</Label>
                  <Input type="number" min={1} max={200} value={leadsPorSemana}
                    onChange={(e) => set("leadsPorSemana", Number(e.target.value))} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Taxa de conversão (%)</Label>
                  <Input type="number" min={1} max={100} value={taxaConversao}
                    onChange={(e) => set("taxaConversao", Number(e.target.value))} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Latas por cliente (média)</Label>
                  <Input type="number" min={1} max={10} step={0.5} value={latasPorCliente}
                    onChange={(e) => set("latasPorCliente", Number(e.target.value))} />
                </div>
              </div>
              {(() => {
                const conv = taxaConversao / 100;
                const semanas = [0.50, 0.60, 0.80, 1.00];
                const detalhe = semanas.map((mult, i) => {
                  const leads = Math.round(leadsPorSemana * mult);
                  const clientes = Math.round(leads * conv);
                  return { semana: i + 1, leads, clientes, latas: clientes * latasPorCliente };
                });
                const totalClientes = detalhe.reduce((s, d) => s + d.clientes, 0);
                const m1 = calcularLatasM1(leadsPorSemana, taxaConversao, latasPorCliente);
                return (
                  <div className="mt-3 rounded-lg bg-muted/50 border p-3 text-xs font-mono text-muted-foreground space-y-1">
                    {detalhe.map((d) => (
                      <div key={d.semana} className="flex gap-4">
                        <span className="w-16">Sem {d.semana}:</span>
                        <span>{d.leads} leads × {taxaConversao}% = {d.clientes} clientes × {latasPorCliente} = <strong>{d.latas} latas</strong></span>
                      </div>
                    ))}
                    <div className="border-t border-border/50 pt-1 flex gap-4 font-bold text-foreground">
                      <span className="w-16">M1 base:</span>
                      <span>{totalClientes} clientes × {latasPorCliente} latas = <strong className="text-primary">{m1} latas ativas</strong></span>
                    </div>
                    <p className="text-muted-foreground/70 font-sans pt-1">
                      Semanas 1–2: learning phase (50%/60% do volume). Semana 3–4: ads otimizados (80%/100%).
                      SP vertical: aumente latas/cliente para 3–4 → M1 sobe naturalmente.
                    </p>
                  </div>
                );
              })()}
            </div>

            {/* Frota e ciclos */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Frota e Ciclos</Label>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-xs text-muted-foreground">Latas ativas alvo M12 — cenário moderado</Label>
                    <span className="font-bold text-primary">{latasAlvoM12} latas</span>
                  </div>
                  <Slider
                    min={50}
                    max={600}
                    step={10}
                    value={[latasAlvoM12]}
                    onValueChange={(v) => set("latasAlvoM12", v[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>50 (pequeno)</span>
                    <span className="text-primary font-medium">280 = SJC âncora</span>
                    <span>600 (grande)</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    fator_mercado = {(latasAlvoM12 / 280).toFixed(2)} ·
                    Latas físicas necessárias: {Math.ceil(latasAlvoM12 / ciclosPorMes)} ·
                    A comprar: {Math.max(0, Math.ceil(latasAlvoM12 / ciclosPorMes) - ESTOQUE_INICIAL_LATAS)} × {fmtBRL(PRECO_LATA)}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Ciclos por lata/mês</Label>
                  <div className="flex gap-3">
                    {([1, 2, 3] as const).map((c) => (
                      <button
                        key={c}
                        onClick={() => set("ciclosPorMes", c)}
                        className={`flex-1 rounded-lg border-2 py-3 text-sm font-semibold transition-all ${
                          ciclosPorMes === c
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {c}× / mês
                        <div className="text-xs font-normal text-muted-foreground mt-0.5">
                          {c === 1 ? "Ciclo mensal" : c === 2 ? "~15 dias" : "~10 dias"}
                        </div>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Capacidade M12: {ciclosM12} ciclos/mês — {numModulosM12} módulo{numModulosM12 > 1 ? "s" : ""} ({numModulosM12} × {LATAS_POR_MODULO} ciclos)
                  </p>
                </div>
              </div>
            </div>

            {/* Precificação */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Precificação por Ciclo</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Preço/lata — pacote maior (ex: 6 latas) (R$)</Label>
                  <Input
                    type="number" min={20} max={1000}
                    value={precoMinimo}
                    onChange={(e) => set("precoMinimo", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Preço/lata — avulsa (1 lata) (R$)</Label>
                  <Input
                    type="number" min={20} max={2000}
                    value={precoMaximo}
                    onChange={(e) => set("precoMaximo", Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <Label className="text-xs text-muted-foreground">Mix de vendas por volume</Label>
                  <span className="text-xs font-semibold text-primary">
                    Preço médio ponderado: <strong>{fmtBRL(precoMedioEfetivo)}/lata</strong>
                  </span>
                </div>
                <Slider
                  min={0} max={100} step={1}
                  value={[mixAvulsa]}
                  onValueChange={(v) => set("mixAvulsa", v[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>← Mais pacotes ({fmtBRL(precoMinimo)}/lata)</span>
                  <span>Mais avulsas ({fmtBRL(precoMaximo)}/lata) →</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {mixAvulsa}% avulsa · {100 - mixAvulsa}% pacote ·
                  Receita M12 = {result.latasFisicasPorMes[11]} latas × {ciclosPorMes} ciclos × {fmtBRL(precoMedioEfetivo)} = <strong>{fmtBRL(receitaMaturacao)}</strong>
                </p>
              </div>
            </div>

            {/* Custos operacionais */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Custos Operacionais</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Aluguel do ponto (R$)</Label>
                  <Input type="number" min={0} value={pontoOperacional}
                    onChange={(e) => set("pontoOperacional", Number(e.target.value))} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">MKT Digital Ads (R$)</Label>
                  <Input type="number" min={0} value={mktDigitalAds}
                    onChange={(e) => set("mktDigitalAds", Number(e.target.value))} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Contabilidade (R$)</Label>
                  <Input type="number" min={0} value={contabilidade}
                    onChange={(e) => set("contabilidade", Number(e.target.value))} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Combustível (R$/km)</Label>
                  <Input type="number" min={0} step={0.01} value={precoCombustivel}
                    onChange={(e) => set("precoCombustivel", Number(e.target.value))} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Km por rota (8 latas)</Label>
                  <Input type="number" min={1} value={kmRodado}
                    onChange={(e) => set("kmRodado", Number(e.target.value))} />
                </div>
              </div>
              <div className="mt-3 rounded-lg bg-muted/50 border p-3 text-xs font-mono text-muted-foreground space-y-1">
                <div className="flex justify-between"><span>Aluguel do ponto</span><span>{fmtBRL(pontoOperacional)}</span></div>
                <div className="flex justify-between"><span>Seguro (veículo e operação)</span><span>{fmtBRL(DESPESAS_FIXAS_CONSTANTES.seguro)}</span></div>
                <div className="flex justify-between"><span>MKT Digital Ads</span><span>{fmtBRL(mktDigitalAds)}</span></div>
                <div className="flex justify-between"><span>Taxa Marketing Nacional</span><span>{fmtBRL(TAXA_MARKETING_NACIONAL)}</span></div>
                <div className="flex justify-between"><span>Royalties Nalata</span><span>{fmtBRL(DESPESAS_FIXAS_CONSTANTES.royalties)}</span></div>
                <div className="flex justify-between"><span>Contabilidade / ADM</span><span>{fmtBRL(contabilidade)}</span></div>
                <div className="flex justify-between"><span>Parcela veículo (módulo 1)</span><span>{fmtBRL(DESPESAS_FIXAS_CONSTANTES.parcelaVeiculo)}</span></div>
                <div className="flex justify-between border-t border-border/50 pt-1"><span>Fixo base (sem funcionários)</span><span>{fmtBRL(totalFixoBase)}</span></div>
                <div className="flex justify-between text-amber-600"><span>↳ Combustível M12 (variável)</span><span>{fmtBRL(result.meses[11].combustivel)}</span></div>
                <div className="flex justify-between text-amber-600"><span>↳ Manutenção M12 (variável)</span><span>{fmtBRL(result.meses[11].manutencao)}</span></div>
                <div className="flex justify-between text-amber-600"><span>↳ Taxa destinação M12 (variável)</span><span>{fmtBRL(result.meses[11].taxaDestinacao)}</span></div>
                <div className="flex justify-between text-foreground font-bold">
                  <span>Funcionários — {numFuncionariosM12} × R$4.700 ({MODE_LABELS[mode]})</span>
                  <span>{fmtBRL(custoFuncionariosM12)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-border pt-1 text-foreground">
                  <span>Total despesa M12</span><span>{fmtBRL(despesaMaturacao)}</span>
                </div>
              </div>
            </div>
          </>
        )}

        {parametrosConservadores && (
          <div className="flex items-start gap-3 rounded-lg border border-yellow-400 bg-yellow-50 dark:bg-yellow-950/20 p-3 text-sm text-yellow-800 dark:text-yellow-200">
            <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-yellow-600" />
            <span>
              <strong>Parâmetros muito conservadores</strong> — receita projetada no M12 abaixo de R$8.000.
              Aumente as latas alvo, o preço ou revise o mix B2B/B2C.
            </span>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard label="Payback" value={payback ? `${payback} meses` : "—"} />
          <KpiCard label="Margem líquida M12" value={isFinite(margemLiquida) ? `${margemLiquida.toFixed(0)}%` : "—"} />
          <KpiCard label="Rentabilidade/mês" value={rentabilidadeMes > 0 ? `${rentabilidadeMes.toFixed(1)}%` : "—"} />
          <KpiCard label="Break-even" value={breakEvenMes ? `Mês ${breakEvenMes}` : "—"} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <KpiCard label="Lucro líquido M12" value={fmtBRL(Math.max(0, lucroMaturacao))} />
          <KpiCard label="Capital de giro" value={fmtBRL(capitalDeGiro)} />
          <KpiCard label="ROI real M1–M12" value={roi12 != null ? `${roi12.toFixed(0)}%` : "—"} />
          <KpiCard label="ROI real M1–M24" value={roi24 != null ? `${roi24.toFixed(0)}%` : "—"} />
        </div>

        {/* DRE Simplificado */}
        {(() => {
          const mesM12 = result.meses[11];
          const latasFisicasM12 = result.latasFisicasPorMes[11];
          const custoLatasM12 = mesM12.custoLatas;
          const custCombustivel = mesM12.combustivel;
          const custManutencao = mesM12.manutencao;
          const custDestinacao = mesM12.taxaDestinacao;
          const custSeguros = DESPESAS_FIXAS_CONSTANTES.seguro;
          const totalCustosVar = custCombustivel + custDestinacao + custManutencao + custoLatasM12;
          const margemContribuicao = receitaMaturacao - totalCustosVar;
          const mktTotal = mktDigitalAds + TAXA_MARKETING_NACIONAL;
          const funcionariosTotal = custoFuncionariosM12;
          const impostos = Math.round(receitaMaturacao * 0.06);
          return (
            <div className="rounded-lg border bg-card p-4">
              <h4 className="font-bold mb-3">DRE Simplificado — Mês de Maturidade (M12)</h4>
              <div className="space-y-0.5 text-sm font-mono">
                <RowBold label={`(+) RECEITA BRUTA — ${latasFisicasM12} latas × ${ciclosPorMes} ciclos × ${fmtBRL(precoMedioEfetivo)}`} value={fmtBRL(receitaMaturacao)} />
                <div className="pt-2 pb-0.5 text-xs text-muted-foreground font-sans uppercase tracking-wide">Custos Variáveis</div>
                <Row label="   (-) Combustível e logística" value={fmtBRL(custCombustivel)} negative />
                <Row label="   (-) Taxa de destinação final (ATT/Aterro)" value={fmtBRL(custDestinacao)} negative />
                <Row label="   (-) Manutenção preventiva" value={fmtBRL(custManutencao)} negative />
                {custoLatasM12 > 0 && (
                  <Row label="   (-) Aquisição de tambores" value={fmtBRL(custoLatasM12)} negative />
                )}
                <RowBold label="(=) MARGEM DE CONTRIBUIÇÃO" value={fmtBRL(margemContribuicao)} highlight={margemContribuicao > 0} />
                <div className="pt-2 pb-0.5 text-xs text-muted-foreground font-sans uppercase tracking-wide">Despesas Fixas</div>
                <Row label="   (-) Seguros (veículo e operação)" value={fmtBRL(custSeguros)} negative />
                <Row label="   (-) Royalties Nalata" value={fmtBRL(DESPESAS_FIXAS_CONSTANTES.royalties)} negative />
                <Row label={`   (-) Marketing local (Ads + Taxa Nacional)`} value={fmtBRL(mktTotal)} negative />
                <Row label="   (-) Contabilidade / Sistemas" value={fmtBRL(contabilidade)} negative />
                <Row label="   (-) Aluguel do ponto" value={fmtBRL(pontoOperacional)} negative />
                <Row label="   (-) Parcela veículo (1°)" value={fmtBRL(DESPESAS_FIXAS_CONSTANTES.parcelaVeiculo)} negative />
                {result.meses[11].parcelaExtraVeiculo > 0 && (
                  <Row label="   (-) Parcela veículo (2°) — acima de 300 locações" value={fmtBRL(result.meses[11].parcelaExtraVeiculo)} negative />
                )}
                <Row label={`   (-) Funcionários — ${numFuncionariosM12} × R$${SALARIO_FUNCIONARIO.toLocaleString("pt-BR")} (${MODE_LABELS[mode]})`} value={fmtBRL(funcionariosTotal)} negative />
                <div className="border-t border-primary/40 mt-2 pt-2" />
                <RowBold
                  label="(=) EBITDA / LUCRO LÍQUIDO"
                  value={lucroMaturacao > 0 ? fmtBRL(lucroMaturacao) : "Revisar parâmetros"}
                  highlight={lucroMaturacao > 0}
                />
                <div className="mt-2 rounded bg-muted/50 p-2 text-xs text-muted-foreground font-sans space-y-0.5">
                  <div>ℹ Impostos Simples Nacional (~6%): est. {fmtBRL(impostos)} — planejamento fiscal separado</div>
                  <div>Margem: {isFinite(margemLiquida) ? margemLiquida.toFixed(1) : "—"}% · Break-even: {breakEvenMes ? `Mês ${breakEvenMes}` : "não atingido"}</div>
                  <div>Capital de giro: {fmtBRL(capitalDeGiro)} · Investimento cidade: {fmtBRL(investimentoCidade)}</div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* DRE detalhado — acumulado 12 meses */}
        {(() => {
          const totalReceita   = meses.reduce((s, m) => s + m.receitaTotal, 0);
          const totalLatas     = meses.reduce((s, m) => s + m.custoLatas, 0);
          const totalFuncs     = meses.reduce((s, m) => s + m.numFuncionarios * SALARIO_FUNCIONARIO, 0);
          const totalDespesa   = meses.reduce((s, m) => s + m.despesaTotal, 0);
          const totalLucro     = meses.reduce((s, m) => s + m.lucroMensal, 0);
          const totalImpostos  = Math.round(totalReceita * 0.06);
          const totalRecLiq    = totalReceita - totalImpostos;
          const custCombustivel = meses.reduce((s, m) => s + m.combustivel, 0);
          const custDestinacao  = meses.reduce((s, m) => s + m.taxaDestinacao, 0);
          const custManutencao  = meses.reduce((s, m) => s + m.manutencao, 0);
          const custSeguros     = DESPESAS_FIXAS_CONSTANTES.seguro * 12;
          const totalCustosVar  = custCombustivel + custDestinacao + custManutencao + totalLatas;
          const margemContrib   = totalRecLiq - totalCustosVar;
          const mktTotal12      = (mktDigitalAds + TAXA_MARKETING_NACIONAL) * 12;
          const margemLiq12     = totalReceita > 0 ? (totalLucro / totalReceita) * 100 : 0;
          return (
            <details className="rounded-lg border bg-card">
              <summary className="p-4 font-bold cursor-pointer select-none hover:bg-muted/30 rounded-lg">
                DRE Completo — Acumulado 12 Meses (expandir)
              </summary>
              <div className="p-4 pt-0 space-y-0.5 text-sm font-mono">
                <RowBold label="(+) RECEITA BRUTA — Acumulado M1–M12" value={fmtBRL(totalReceita)} />
                <Row label="(-) Impostos Simples (~6%)" value={fmtBRL(totalImpostos)} negative />
                <RowBold label="(=) RECEITA LÍQUIDA" value={fmtBRL(totalRecLiq)} />
                <div className="pt-2 pb-0.5 text-xs text-muted-foreground font-sans uppercase tracking-wide">Custos Variáveis</div>
                <Row label="   (-) Combustível e logística" value={fmtBRL(custCombustivel)} negative />
                <Row label="   (-) Taxa de destinação (ATT/Aterro)" value={fmtBRL(custDestinacao)} negative />
                <Row label="   (-) Manutenção preventiva" value={fmtBRL(custManutencao)} negative />
                {totalLatas > 0 && <Row label="   (-) Aquisição de tambores" value={fmtBRL(totalLatas)} negative />}
                <RowBold label="(=) MARGEM DE CONTRIBUIÇÃO" value={fmtBRL(margemContrib)} highlight={margemContrib > 0} />
                <div className="pt-2 pb-0.5 text-xs text-muted-foreground font-sans uppercase tracking-wide">Despesas Fixas</div>
                <Row label="   (-) Seguros (veículo e operação)" value={fmtBRL(custSeguros)} negative />
                <Row label="   (-) Royalties Nalata" value={fmtBRL(DESPESAS_FIXAS_CONSTANTES.royalties * 12)} negative />
                <Row label="   (-) Marketing (Ads + Taxa Nacional)" value={fmtBRL(mktTotal12)} negative />
                <Row label="   (-) Contabilidade / Sistemas" value={fmtBRL(contabilidade * 12)} negative />
                <Row label="   (-) Aluguel do ponto" value={fmtBRL(pontoOperacional * 12)} negative />
                <Row label="   (-) Parcela veículo (1°)" value={fmtBRL(DESPESAS_FIXAS_CONSTANTES.parcelaVeiculo * 12)} negative />
                {(() => {
                  const totalParcelaExtra = meses.reduce((s, m) => s + m.parcelaExtraVeiculo, 0);
                  return totalParcelaExtra > 0 ? (
                    <Row label="   (-) Parcela veículo (2°) — acum. meses acima de 300 locações" value={fmtBRL(totalParcelaExtra)} negative />
                  ) : null;
                })()}
                <Row label={`   (-) Funcionários (acum. — modo ${MODE_LABELS[mode]})`} value={fmtBRL(totalFuncs)} negative />
                <div className="border-t border-primary/40 mt-2 pt-2" />
                <RowBold
                  label={`(=) RESULTADO ACUMULADO 12 MESES  |  Margem: ${margemLiq12.toFixed(1)}%`}
                  value={fmtBRL(totalLucro)}
                  highlight={totalLucro > 0}
                />
                <div className="mt-2 rounded bg-muted/50 p-2 text-xs text-muted-foreground font-sans space-y-0.5">
                  <div>Receita total: {fmtBRL(totalReceita)} · Despesa total: {fmtBRL(totalDespesa)}</div>
                  <div>Break-even: {breakEvenMes ? `Mês ${breakEvenMes}` : "não atingido"} · Lucro M12: {fmtBRL(lucroMaturacao)}</div>
                </div>
              </div>
            </details>
          );
        })()}

        {/* Tabela comparativa 3 cenários */}
        <div className="rounded-lg border bg-card p-4">
          <h4 className="font-bold mb-3">Projeção de Crescimento — 3 Cenários (Mês 12)</h4>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Indicador</th>
                  <th className="text-right py-2 px-3 text-red-500 font-semibold">🔴 Conservador</th>
                  <th className="text-right py-2 px-3 text-amber-500 font-semibold">🟡 Moderado</th>
                  <th className="text-right py-2 px-3 text-green-500 font-semibold">🟢 Otimista</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-muted-foreground">Taxa média geométrica</td>
                  {scenariosComparacao.map((s, i) => (
                    <td key={s.scenario} className={`text-right py-2 px-3 font-mono ${["text-red-500","text-amber-500","text-green-500"][i]}`}>
                      {s.taxaMediaGeom.toFixed(1)}%/mês
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-muted-foreground">Latas ativas M1</td>
                  {scenariosComparacao.map((s) => (
                    <td key={s.scenario} className="text-right py-2 px-3 font-mono">{s.latasM1} latas</td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-muted-foreground">Latas ativas M12</td>
                  {scenariosComparacao.map((s) => (
                    <td key={s.scenario} className="text-right py-2 px-3 font-mono font-semibold">{s.latasM12} latas</td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-muted-foreground">Receita bruta M12</td>
                  {scenariosComparacao.map((s) => (
                    <td key={s.scenario} className="text-right py-2 px-3 font-mono">{fmtBRL(s.receita)}</td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-muted-foreground">Lucro líquido M12</td>
                  {scenariosComparacao.map((s) => (
                    <td key={s.scenario} className={`text-right py-2 px-3 font-mono font-semibold ${s.lucro >= 0 ? "text-chart-profit" : "text-destructive"}`}>
                      {fmtBRL(s.lucro)}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-muted-foreground">Margem líquida</td>
                  {scenariosComparacao.map((s) => (
                    <td key={s.scenario} className="text-right py-2 px-3 font-mono">
                      {isFinite(s.margem) ? `${s.margem.toFixed(0)}%` : "—"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-muted-foreground">Break-even</td>
                  {scenariosComparacao.map((s) => (
                    <td key={s.scenario} className="text-right py-2 px-3 font-mono">
                      {s.breakEven ? `Mês ${s.breakEven}` : "—"}
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-2 pr-4 text-muted-foreground">Capital de giro</td>
                  {scenariosComparacao.map((s) => (
                    <td key={s.scenario} className="text-right py-2 px-3 font-mono">{fmtBRL(s.capitalDeGiro)}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-muted-foreground">Payback estimado</td>
                  {scenariosComparacao.map((s) => (
                    <td key={s.scenario} className="text-right py-2 px-3 font-mono">
                      {s.payback ? `${s.payback} meses` : "—"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            * Preço médio efetivo {fmtBRL(precoMedioEfetivo)}/ciclo · {ciclosPorMes} ciclo/mês · Alvo {latasAlvoM12} latas (moderado)
          </p>
        </div>

        {/* Comparativo ROI */}
        <div className="rounded-lg border bg-card p-4">
          <h4 className="font-bold mb-1">Comparativo de Retorno — Nalata vs. Outras Aplicações</h4>
          <p className="text-xs text-muted-foreground mb-4">ROI anual estimado sobre investimento total</p>
          <div className="space-y-3">
            {ROI_FIXOS.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="text-sm w-36 shrink-0 text-muted-foreground">{item.label}</span>
                <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                  <div
                    className="h-5 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(item.roi / maxBar) * 100}%`, backgroundColor: item.cor }}
                  >
                    <span className="text-xs text-white font-semibold">{item.roi}%</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3">
              <span className="text-sm w-36 shrink-0 font-bold text-primary">Nalata</span>
              <div className="flex-1 bg-muted rounded-full h-5 overflow-hidden">
                <div
                  className="h-5 rounded-full bg-green-500 flex items-center justify-end pr-2 transition-all duration-500"
                  style={{ width: `${Math.min((roiAnual / maxBar) * 100, 100)}%` }}
                >
                  <span className="text-xs text-white font-bold">
                    {roiAnual > 0 ? `${roiAnual.toFixed(0)}%` : "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notas */}
        <div className="rounded-lg bg-muted/40 border p-4 space-y-2 text-xs text-muted-foreground">
          <div className="flex items-start gap-2">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span><strong>Vida útil dos tambores:</strong> estimada em 5 anos com manutenção preventiva regular. Reposição parcial prevista a partir do Mês 48.</span>
          </div>
          <div className="flex items-start gap-2">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span><strong>Tabela de preços por volume:</strong> preço mínimo ({fmtBRL(precoMinimo)}/lata) para pacotes maiores; preço avulsa ({fmtBRL(precoMaximo)}/lata) para locação unitária. O preço médio reflete o mix real do território.</span>
          </div>
          <div className="flex items-start gap-2">
            <Info className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <span><strong>Módulo operacional:</strong> 1 veículo + 2 colaboradores + 300 ciclos/mês. CAPEX por módulo adicional: {fmtBRL(CAPEX_MODULO)}. OPEX por módulo: {fmtBRL(OPEX_MODULO)}/mês.</span>
          </div>
        </div>

        {/* Exportar */}
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <FileDown className="h-4 w-4" />
                Exportar Simulação
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => exportarApresentacaoPDF({ params, result })} className="gap-2 cursor-pointer">
                <Monitor className="h-4 w-4" />
                Apresentação (PDF)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportarPlanilha({ params, result })} className="gap-2 cursor-pointer">
                <Table className="h-4 w-4" />
                Planilha mensal (.xls)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportarMarkdown({ params, result })} className="gap-2 cursor-pointer">
                <FileText className="h-4 w-4" />
                Roteiro (.md)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

function RowBold({ label, value, negative, highlight }: { label: string; value: string; negative?: boolean; highlight?: boolean }) {
  return (
    <div className="flex justify-between font-bold">
      <span>{label}</span>
      <span className={highlight ? "text-chart-profit" : negative ? "text-destructive" : ""}>{value}</span>
    </div>
  );
}

async function exportarPlanilha({ params, result }: { params: SimParams; result: SimResult }) {
  const { meses } = result;

  const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

  const receita = meses.map((m) => m.receitaTotal);
  const custoLatas = meses.map((m) => m.custoLatas);
  const parcelaV2 = meses.map((m) => m.parcelaExtraVeiculo);
  const custoFuncs = meses.map((m) => m.numFuncionarios * SALARIO_FUNCIONARIO);
  const numFuncs = meses.map((m) => m.numFuncionarios);
  const latasAtiv = meses.map((m) => m.latasAtivas);
  const latasFis = meses.map((m) => m.latasFisicas);
  const numMod = meses.map((m) => m.numModulos);

  const fixed = (v: number) => Array(12).fill(v);
  const aluguel = fixed(params.pontoOperacional);
  const seguro = fixed(DESPESAS_FIXAS_CONSTANTES.seguro);
  const mktAds = fixed(params.mktDigitalAds);
  const mktNac = fixed(TAXA_MARKETING_NACIONAL);
  const royal = fixed(DESPESAS_FIXAS_CONSTANTES.royalties);
  const contab = fixed(params.contabilidade);
  const parcelaV1 = fixed(DESPESAS_FIXAS_CONSTANTES.parcelaVeiculo);
  const combVar = meses.map((m) => m.combustivel);
  const manutVar = meses.map((m) => m.manutencao);
  const destVar = meses.map((m) => m.taxaDestinacao);

  const totalFixo = fixed(
    params.pontoOperacional +
      DESPESAS_FIXAS_CONSTANTES.seguro +
      params.mktDigitalAds +
      TAXA_MARKETING_NACIONAL +
      DESPESAS_FIXAS_CONSTANTES.royalties +
      params.contabilidade +
      DESPESAS_FIXAS_CONSTANTES.parcelaVeiculo
  );

  const totalVar = meses.map(
    (_, i) => custoFuncs[i] + custoLatas[i] + combVar[i] + manutVar[i] + destVar[i] + parcelaV2[i]
  );
  const totalDesp = meses.map((_, i) => totalFixo[i] + totalVar[i]);
  const saldo = meses.map((m) => m.lucroMensal);

  const saldoAcum: number[] = [];
  let acc = 0;
  for (const s of saldo) {
    acc += s;
    saldoAcum.push(acc);
  }

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ChatGPT";
  workbook.created = new Date();

  const ws = workbook.addWorksheet("DRE Nalata REV7", {
    views: [{ state: "frozen", ySplit: 1, xSplit: 1 }],
    properties: { defaultRowHeight: 20 },
  });

  ws.columns = [
    { width: 42 },
    ...Array.from({ length: 12 }, () => ({ width: 14 })),
    { width: 16 },
  ];

  const header = ["CONTA", ...meses.map((m) => `M${m.mes}`), "TOTAL / M12"];
  ws.addRow(header);

  const colors = {
    headerBg: "1A237E",
    headerFont: "FFFFFF",
    receitaBg: "1B5E20",
    fixoBg: "37474F",
    variavelBg: "4A148C",
    resultadoBg: "0D47A1",
    operacionalBg: "E3F2FD",
    totalBg: "212121",
    subBg: "EEEEEE",
    posFont: "1B5E20",
    posBg: "E8F5E9",
    negFont: "B71C1C",
    negBg: "FFEBEE",
    border: "D0D7DE",
  };

  const currencyFmt = '#,##0.00';
  const integerFmt = '0';

  function applyThinBorder(row: ExcelJS.Row) {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin", color: { argb: colors.border } },
        left: { style: "thin", color: { argb: colors.border } },
        bottom: { style: "thin", color: { argb: colors.border } },
        right: { style: "thin", color: { argb: colors.border } },
      };
    });
  }

  function styleHeaderRow(rowNumber: number) {
    const row = ws.getRow(rowNumber);
    row.height = 22;
    row.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: colors.headerFont }, size: 10 };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: colors.headerBg } };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    });
    applyThinBorder(row);
  }

  function addSectionRow(title: string, bg: string, fontColor = "FFFFFF") {
    const row = ws.addRow([title, ...Array(13).fill("")]);
    row.getCell(1).font = { bold: true, color: { argb: fontColor } };
    row.getCell(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: bg } };
    applyThinBorder(row);
    return row.number;
  }

  function addCurrencyRow(label: string, values: number[], totalOverride?: number) {
    const total = totalOverride ?? sum(values);
    const row = ws.addRow([label, ...values, total]);
    row.eachCell((cell, colNumber) => {
      if (colNumber >= 2) cell.numFmt = currencyFmt;
    });
    applyThinBorder(row);
    return row.number;
  }

  function addIntegerRow(label: string, values: number[], totalOverride?: number) {
    const total = totalOverride ?? values[values.length - 1] ?? 0;
    const row = ws.addRow([label, ...values, total]);
    row.eachCell((cell, colNumber) => {
      if (colNumber >= 2) {
        cell.numFmt = integerFmt;
        cell.alignment = { horizontal: "center", vertical: "middle" };
      }
    });
    applyThinBorder(row);
    return row.number;
  }

  function addSignedCurrencyRow(label: string, values: number[], totalOverride?: number) {
    const total = totalOverride ?? sum(values);
    const row = ws.addRow([label, ...values, total]);

    row.eachCell((cell, colNumber) => {
      if (colNumber >= 2 && typeof cell.value === "number") {
        cell.numFmt = currencyFmt;
        const value = cell.value;
        if (value >= 0) {
          cell.font = { bold: true, color: { argb: colors.posFont } };
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: colors.posBg } };
        } else {
          cell.font = { bold: true, color: { argb: colors.negFont } };
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: colors.negBg } };
        }
      }
    });

    applyThinBorder(row);
    return row.number;
  }

  function styleSubtotalRow(rowNumber: number) {
    const row = ws.getRow(rowNumber);
    row.eachCell((cell) => {
      cell.font = { bold: true };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: colors.subBg } };
    });
    applyThinBorder(row);
  }

  function styleTotalRow(rowNumber: number) {
    const row = ws.getRow(rowNumber);
    row.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: colors.totalBg } };
      if (typeof cell.value === "number") cell.numFmt = currencyFmt;
    });
    applyThinBorder(row);
  }

  function addBlankRow() {
    ws.addRow([]);
  }

  styleHeaderRow(1);

  addSectionRow("RECEITAS", colors.receitaBg);
  addCurrencyRow("Receita Bruta — latas × ciclos × preço médio", receita);

  addBlankRow();

  addSectionRow("DESPESAS FIXAS — iguais em todos os meses", colors.fixoBg);
  addCurrencyRow("Aluguel do ponto", aluguel);
  addCurrencyRow("Seguro (veículo e operação)", seguro);
  addCurrencyRow("MKT Digital Ads", mktAds);
  addCurrencyRow("Taxa Marketing Nacional", mktNac);
  addCurrencyRow("Royalties Nalata", royal);
  addCurrencyRow("Contabilidade / ADM", contab);
  addCurrencyRow("Parcela veículo (1°)", parcelaV1);
  const subtotalFixoRow = addCurrencyRow("Subtotal Despesas Fixas", totalFixo);
  styleSubtotalRow(subtotalFixoRow);

  addBlankRow();

  addSectionRow("CUSTOS VARIÁVEIS — escalam com as latas ativas", colors.variavelBg);
  addCurrencyRow("Combustível e logística", combVar);
  addCurrencyRow("Taxa de destinação final (ATT/Aterro)", destVar);
  addCurrencyRow("Manutenção preventiva", manutVar);
  addCurrencyRow("Funcionários (N × R$4.700 — variável por faixa)", custoFuncs);
  addCurrencyRow("Parcela veículo 2° (acima de 300 locações)", parcelaV2);
  addCurrencyRow("Aquisição de tambores (novos)", custoLatas);
  const subtotalVarRow = addCurrencyRow("Subtotal Custos Variáveis", totalVar);
  styleSubtotalRow(subtotalVarRow);

  addBlankRow();

  const totalDespesaRow = addCurrencyRow("TOTAL DESPESAS", totalDesp);
  styleTotalRow(totalDespesaRow);

  addBlankRow();

  addSectionRow("RESULTADO", colors.resultadoBg);
  addSignedCurrencyRow("Saldo Mensal (Lucro / Prejuízo)", saldo);
  addSignedCurrencyRow(
    "Saldo Acumulado",
    saldoAcum,
    saldoAcum.length ? saldoAcum[saldoAcum.length - 1] : 0
  );

  addBlankRow();

  addSectionRow("DADOS OPERACIONAIS", colors.operacionalBg, "1A237E");
  addIntegerRow("Latas ativas por mês", latasAtiv);
  addIntegerRow("Latas físicas (frota)", latasFis);
  addIntegerRow("Nº funcionários", numFuncs);
  addIntegerRow("Nº módulos operacionais", numMod);

  // Alinhamentos
  ws.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (colNumber === 1) {
        cell.alignment = { horizontal: "left", vertical: "middle" };
      } else if (rowNumber !== 1) {
        cell.alignment = { horizontal: "right", vertical: "middle" };
      }
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob(
    [buffer],
    { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dre-nalata-${Date.now()}.xlsx`;
  a.click();
  URL.revokeObjectURL(url);
}
function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function fmtCurrencyShort(value: number) {
  const abs = Math.abs(value);

  if (abs >= 1000) {
    return `R$${(value / 1000).toFixed(1)}k`.replace(".", ",");
  }

  return `R$${Math.round(value)}`;
}

function gerarGraficoLinhaLatasSvg(result: SimResult) {
  const width = 1400;
  const height = 620;
  const padLeft = 85;
  const padRight = 70;
  const padTop = 70;
  const padBottom = 80;

  const data = result.latasAtivasPorMes;
const maxY = Math.max(...data, 10);
const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const x = (i: number) => padLeft + (i / 11) * plotW;
  const y = (v: number) => padTop + plotH - (v / maxY) * plotH;

  const points = data.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const areaPoints = `${padLeft},${height - padBottom} ${points} ${width - padRight},${height - padBottom}`;

  const gridY = [0, 0.25, 0.5, 0.75, 1].map((p) => {
    const gy = padTop + plotH - p * plotH;
    const label = Math.round(maxY * p);
    return `
      <line x1="${padLeft}" y1="${gy}" x2="${width - padRight}" y2="${gy}" stroke="#e5e7eb" stroke-dasharray="6 6"/>
      <text x="${padLeft - 18}" y="${gy + 6}" text-anchor="end" font-size="22" fill="#252C33">${label}</text>
    `;
  }).join("");

  const monthLabels = data.map((_, i) => `
    <text x="${x(i)}" y="${height - 35}" text-anchor="middle" font-size="22" fill="#252C33">${i + 1}</text>
  `).join("");

  const circles = data.map((v, i) => `
    <circle cx="${x(i)}" cy="${y(v)}" r="9" fill="#ffffff" stroke="#F26E2C" stroke-width="6"/>
  `).join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="${width / 2}" y="38" text-anchor="middle" font-size="34" font-weight="800" fill="#252C33" letter-spacing="1">
        CRESCIMENTO PREVISÍVEL DE LATAS ATIVAS
      </text>

      ${gridY}
      ${monthLabels}

      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${height - padBottom}" stroke="#252C33" stroke-width="2"/>
      <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}" stroke="#252C33" stroke-width="2"/>

      <polygon points="${areaPoints}" fill="#F26E2C" opacity="0.14"/>
      <polyline points="${points}" fill="none" stroke="#F26E2C" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      ${circles}

      <text x="${width / 2}" y="${height - 5}" text-anchor="middle" font-size="28" font-weight="700" fill="#252C33">Mês</text>
      <text x="28" y="${height / 2}" transform="rotate(-90 28 ${height / 2})" text-anchor="middle" font-size="28" font-weight="700" fill="#252C33">Latas Ativas</text>

      <text x="${width - 245}" y="48" font-size="30" font-weight="800" fill="#F26E2C">
        ${data[11]} latas
      </text>
      <text x="${width - 245}" y="82" font-size="26" font-weight="800" fill="#F26E2C">
        Meta M12
      </text>
    </svg>
  `;
}

function gerarGraficoLucroSvg(result: SimResult) {
  const width = 1400;
  const height = 620;
  const padLeft = 95;
  const padRight = 70;
  const padTop = 200;
  const padBottom = 80;

  const data = result.lucros;
  const maxPositive = Math.max(...data, 0);
  const minNegative = Math.min(...data, 0);
  const maxAbs = Math.max(Math.abs(maxPositive), Math.abs(minNegative), 1000);

  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const zeroY = padTop + plotH / 2;

  const x = (i: number) => padLeft + (i / data.length) * plotW + plotW / data.length / 2;
  const y = (v: number) => zeroY - (v / maxAbs) * (plotH / 2);
  const barW = plotW / data.length * 0.62;

  const bars = data.map((v, i) => {
    const top = v >= 0 ? y(v) : zeroY;
    const h = Math.abs(zeroY - y(v));
    const color = v >= 0 ? "#2E7D32" : "#CF3A3A";

    return `
      <rect x="${x(i) - barW / 2}" y="${top}" width="${barW}" height="${h}" fill="${color}" opacity="0.92"/>
      <text x="${x(i)}" y="${height - 35}" text-anchor="middle" font-size="22" fill="#252C33">${i + 1}</text>
    `;
  }).join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="${width / 2}" y="42" text-anchor="middle" font-size="34" font-weight="800" fill="#252C33" letter-spacing="1">
        LUCRO LÍQUIDO MENSAL &amp; PONTO DE EQUILÍBRIO
      </text>

      <line x1="${padLeft}" y1="${zeroY}" x2="${width - padRight}" y2="${zeroY}" stroke="#252C33" stroke-width="3"/>
      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${height - padBottom}" stroke="#d1d5db" stroke-width="2"/>
      <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}" stroke="#d1d5db" stroke-width="2"/>

      ${bars}

      <text x="${width / 2}" y="${height - 5}" text-anchor="middle" font-size="28" font-weight="700" fill="#252C33">Mês</text>
      <text x="30" y="${height / 2}" transform="rotate(-90 30 ${height / 2})" text-anchor="middle" font-size="28" font-weight="700" fill="#252C33">Lucro Líquido (R$)</text>

      <text x="${width - 270}" y="90" font-size="30" font-weight="800" fill="#2E7D32">
        ${escapeHtml(fmtBRL(result.lucroMaturacao))}
      </text>
      <text x="${width - 270}" y="125" font-size="22" font-weight="700" fill="#2E7D32">
        Lucro M12
      </text>

      ${
        result.breakEvenMes
          ? `<text x="${padLeft + 390}" y="${padTop + 150}" font-size="26" font-weight="800" fill="#2E7D32">BREAK-EVEN Mês ${result.breakEvenMes}</text>`
          : `<text x="${padLeft + 390}" y="${padTop + 150}" font-size="26" font-weight="800" fill="#CF3A3A">BREAK-EVEN não atingido</text>`
      }
    </svg>
  `;
}

function gerarGraficoReceitaSvg(result: SimResult) {
  const width = 1400;
  const height = 620;
  const padLeft = 95;
  const padRight = 70;
  const padTop = 75;
  const padBottom = 80;

  const data = result.curva;
  const maxY = Math.max(...data, 1000);
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const x = (i: number) => padLeft + (i / data.length) * plotW + plotW / data.length / 2;
  const y = (v: number) => padTop + plotH - (v / maxY) * plotH;
  const barW = plotW / data.length * 0.62;

  const bars = data.map((v, i) => {
    const isM12 = i === 11;
    const color = isM12 ? "#252C33" : "#F26E2C";
    const top = y(v);
    const h = height - padBottom - top;

    return `
      <rect x="${x(i) - barW / 2}" y="${top}" width="${barW}" height="${h}" fill="${color}" opacity="${isM12 ? "0.96" : "0.92"}"/>
      <text x="${x(i)}" y="${height - 35}" text-anchor="middle" font-size="22" fill="#252C33">${i + 1}</text>
    `;
  }).join("");

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#ffffff"/>
      <text x="${width / 2}" y="42" text-anchor="middle" font-size="34" font-weight="800" fill="#252C33" letter-spacing="1">
        FATURAMENTO BRUTO MENSAL
      </text>

      <line x1="${padLeft}" y1="${padTop}" x2="${padLeft}" y2="${height - padBottom}" stroke="#d1d5db" stroke-width="2"/>
      <line x1="${padLeft}" y1="${height - padBottom}" x2="${width - padRight}" y2="${height - padBottom}" stroke="#d1d5db" stroke-width="2"/>

      ${bars}

      <text x="${width / 2}" y="${height - 5}" text-anchor="middle" font-size="28" font-weight="700" fill="#252C33">Mês</text>
      <text x="30" y="${height / 2}" transform="rotate(-90 30 ${height / 2})" text-anchor="middle" font-size="28" font-weight="700" fill="#252C33">Receita (R$)</text>

      <text x="${width - 300}" y="45" font-size="30" font-weight="800" fill="#252C33">
        ${escapeHtml(fmtBRL(result.receitaMaturacao))}
      </text>
      <text x="${width - 300}" y="80" font-size="22" font-weight="700" fill="#252C33">
        Receita M12
      </text>
    </svg>
  `;
}

function gerarGraficosApresentacao(result: SimResult) {
  return {
    GRAFICO_LATAS: gerarGraficoLinhaLatasSvg(result),
    GRAFICO_LUCRO: gerarGraficoLucroSvg(result),
    GRAFICO_RECEITA: gerarGraficoReceitaSvg(result),
  };
}
async function exportarApresentacaoPDF({ params, result }: { params: SimParams; result: SimResult }) {
  const fmtBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 });
  const fmtK = (v: number) =>
    `R$${(v / 1000).toFixed(1).replace(".", ",")} mil`;

  const breakEvenNum = result.breakEvenMes ?? 0;
  const lucroBreakEven = breakEvenNum > 0 ? (result.meses[breakEvenNum - 1]?.lucroMensal ?? 0) : 0;
const crescimentoLucroPct =
  lucroBreakEven > 0 && result.lucroMaturacao > 0
    ? `${Math.round(((result.lucroMaturacao - lucroBreakEven) / lucroBreakEven) * 100)}%`
    : "—";

const graficos = gerarGraficosApresentacao(result);

const tokens: Record<string, string> = {
    DATA: new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" }),
    LATAS_ALVO_M12: String(params.latasAlvoM12),
    LATAS_INICIAL: "60",
    LATAS_FISICAS_M12: String(result.latasFisicasPorMes[11]),
    PRECO_MEDIO: fmtBRL(result.precoMedioEfetivo),
    MIX_AVULSA: String(params.mixAvulsa),
    MIX_PACOTE: String(100 - params.mixAvulsa),
    CICLOS_MES: String(params.ciclosPorMes),
    MODULOS_M12: String(result.numModulosPorMes[11]),
    CAPITAL_GIRO: fmtBRL(result.capitalDeGiro),
    CAPITAL_GIRO_K: `R$${Math.round(result.capitalDeGiro / 1000)} mil`,
    FATURAMENTO_M12: fmtBRL(result.receitaMaturacao),
    FATURAMENTO_M12_NUM: fmtBRL(result.receitaMaturacao),
    FATURAMENTO_M12_K: fmtK(result.receitaMaturacao),
    FATURAMENTO_M1_K: fmtK(result.curva[0]),
    LUCRO_M12_NUM: fmtBRL(result.lucroMaturacao),
    MARGEM_M12: `${result.margemLiquida.toFixed(1)}%`,
    BREAK_EVEN: result.breakEvenMes ? `Mês ${result.breakEvenMes}` : "—",
    BREAK_EVEN_LOWER: result.breakEvenMes ? `mês ${result.breakEvenMes}` : "não atingido",
    BREAK_EVEN_NUM_MENOS1: result.breakEvenMes ? String(result.breakEvenMes - 1) : "5",
    PAYBACK: result.payback ? `${result.payback} meses` : "—",
    ROI_ANUAL: result.roiAnual > 0 ? `${result.roiAnual.toFixed(0)}%` : "—",
    CRESCIMENTO_MULT:
      result.curva[0] > 0
        ? `${(result.receitaMaturacao / result.curva[0]).toFixed(1)}×`
        : "—",
    CRESCIMENTO_LUCRO_PCT: crescimentoLucroPct,
    GRAFICO_LATAS: graficos.GRAFICO_LATAS,
    GRAFICO_LUCRO: graficos.GRAFICO_LUCRO,
    GRAFICO_RECEITA: graficos.GRAFICO_RECEITA,
  };

  const win = window.open("", "_blank");

if (!win) {
  alert("O navegador bloqueou a abertura do PDF. Libere pop-ups para este site e tente novamente.");
  return;
}

try {
  win.document.write(`
    <html>
      <head>
        <title>Gerando apresentação...</title>
      </head>
      <body style="font-family: Arial, sans-serif; padding: 32px;">
        Gerando apresentação Nalata...
      </body>
    </html>
  `);
  win.document.close();

  const res = await fetch("/apresentacao/apresentacao_nalata.html");
  if (!res.ok) throw new Error("template não encontrado");

  let html = await res.text();

  for (const [key, value] of Object.entries(tokens)) {
    html = html.split(`{{${key}}}`).join(value);
  }

  const origin = window.location.origin;
  html = html.replace(
    /src="(logo_completo\.png|logo_icone\.png|infografico_m12\.png)"/g,
    `src="${origin}/apresentacao/$1"`
  );

  win.document.open();
  win.document.write(html);
  win.document.close();

  win.addEventListener("load", () => {
    setTimeout(() => {
      win.focus();
      win.print();
    }, 800);
  });
} catch (e) {
  console.error("[Nalata] Erro ao gerar PDF:", e);

  win.document.open();
  win.document.write(`
    <html>
      <body style="font-family: Arial, sans-serif; padding: 32px; color: #b91c1c;">
        Não foi possível carregar o template da apresentação.
        Verifique se o arquivo <strong>/public/apresentacao/apresentacao_nalata.html</strong> existe.
      </body>
    </html>
  `);
  win.document.close();

  alert("Não foi possível carregar o template da apresentação. Verifique se o servidor está rodando.");
}
}

function exportarMarkdown({ params, result }: { params: SimParams; result: SimResult }) {
  const fmtBRL = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2 });

  const md = `# Simulação Financeira Nalata — REV7

## Parâmetros
- **Cenário:** ${params.scenario}
- **Latas ativas alvo M12:** ${params.latasAlvoM12}
- **Ciclos por lata/mês:** ${params.ciclosPorMes}×
- **Preço B2B (mín):** ${fmtBRL(params.precoMinimo)} | **Preço B2C (máx):** ${fmtBRL(params.precoMaximo)}
- **Mix de vendas:** ${params.mixAvulsa}% avulsa | Preço médio ponderado: ${fmtBRL(result.precoMedioEfetivo)}/lata
- **fator_mercado:** ${(params.latasAlvoM12 / 280).toFixed(2)}

## Resultado — Mês 12
- **Latas ativas M12:** ${result.latasAtivasPorMes[11]} | **Latas físicas:** ${result.latasFisicasPorMes[11]}
- **Módulos operacionais:** ${result.numModulosPorMes[11]}
- **Faturamento Bruto:** ${fmtBRL(result.receitaMaturacao)}
- **Lucro Líquido Mensal:** ${result.lucroMaturacao > 0 ? fmtBRL(result.lucroMaturacao) : "Não calculável"}
- **Margem Líquida:** ${result.margemLiquida.toFixed(1)}%
- **Break-even:** ${result.breakEvenMes ? "Mês " + result.breakEvenMes : "Não atingido"}
- **Capital de Giro:** ${fmtBRL(result.capitalDeGiro)}
- **Payback:** ${result.payback ? result.payback + " meses" : "Não calculável"}
- **ROI Anual:** ${result.roiAnual > 0 ? result.roiAnual.toFixed(0) + "%" : "—"}

## Curva M1–M12
${result.meses.map((m) => `- M${m.mes}: ${m.latasAtivas} latas · ${fmtBRL(m.receitaTotal)} receita · ${fmtBRL(m.lucroMensal)} lucro`).join("\n")}

---
*Projeções baseadas no modelo operacional Nalata REV7. Não constituem garantia de rendimento.*
`;
  const blob = new Blob([md], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `simulacao-nalata-rev7-${Date.now()}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
