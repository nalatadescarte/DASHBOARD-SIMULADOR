import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3 } from "lucide-react";
import { NalataModel } from "./NalataModel";
import { MaturationRampChart } from "./charts/MaturationRampChart";
import { MarketContextPanel } from "./MarketContextPanel";
import { TerritoryPanel, type TerritoryData } from "./TerritoryPanel";
import { CompetitiveTable } from "./CompetitiveTable";
import { BreakEvenPanel } from "./BreakEvenPanel";
import { TERRITORIOS, TERRITORIO_VAZIO } from "@/data/territorios";
import {
  type SimParams,
  calcularSimulacaoCompleta,
  PONTO_OPERACIONAL_DEFAULT,
  MKT_DIGITAL_ADS_DEFAULT,
  CONTABILIDADE_DEFAULT,
  PRECO_COMBUSTIVEL_DEFAULT,
  KM_RODADO_DEFAULT,
} from "@/lib/nalata-model";

// Âncora SJC: 280 × R$98 × 1 = R$27.440
// precoMedioEfetivo = 0.5 × 80 + 0.5 × 116 = R$98
const DEFAULT_PARAMS: SimParams = {
  mode: "um_funcionario",
  scenario: "moderado",
  latasAlvoM12: 280,
  ciclosPorMes: 1,
  precoMinimo: 80,
  precoMaximo: 116,
  mixAvulsa: 82,
  pontoOperacional: PONTO_OPERACIONAL_DEFAULT,
  mktDigitalAds: MKT_DIGITAL_ADS_DEFAULT,
  contabilidade: CONTABILIDADE_DEFAULT,
  precoCombustivel: PRECO_COMBUSTIVEL_DEFAULT,
  kmRodado: KM_RODADO_DEFAULT,
  leadsPorSemana: 20,
  taxaConversao: 30,
  latasPorCliente: 2,
};

export function Dashboard() {
  const [territory, setTerritory] = useState<TerritoryData>(TERRITORIO_VAZIO);
  const [territorioSelecionado, setTerritorioSelecionado] = useState<string>("");
  const [simParams, setSimParams] = useState<SimParams>(DEFAULT_PARAMS);

  const handleTerritoryChange = (data: TerritoryData) => {
    setTerritory(data);
    const latasNum = parseInt(data.latasAlvo) || 280;
    setSimParams((prev) => ({ ...prev, latasAlvoM12: latasNum }));
  };

  const simResult = useMemo(() => calcularSimulacaoCompleta(simParams), [simParams]);

  return (
    <div className="min-h-screen bg-background">
      {/* [1] Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <img
                src="/lovable-uploads/733fe496-d79b-4548-b7b5-85c79c31a8fd.png"
                alt="NaLata Logo"
                className="h-12"
              />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Dashboard NaLata</h1>
                <p className="text-muted-foreground text-sm">PAINEL SIMULAÇÃO FINANCEIRA — FRANQUIA REV7</p>
              </div>
            </div>
            {/* Seletor de território */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground whitespace-nowrap hidden sm:block">
                Território de referência:
              </span>
              <Select
                value={territorioSelecionado}
                onValueChange={(id) => {
                  setTerritorioSelecionado(id);
                  const preset = TERRITORIOS.find((t) => t.id === id);
                  if (preset) {
                    handleTerritoryChange(preset.data);
                    setSimParams((prev) => ({
                      ...prev,
                      latasAlvoM12: preset.latasAlvoM12,
                      precoMinimo: preset.precoMinimoSugerido,
                      precoMaximo: preset.precoMaximoSugerido,
                    }));
                  } else {
                    setTerritory(TERRITORIO_VAZIO);
                    setSimParams((prev) => ({ ...prev, latasAlvoM12: 280 }));
                  }
                }}
              >
                <SelectTrigger className="w-56">
                  <SelectValue placeholder="Selecionar cidade…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">— Preencher manualmente —</SelectItem>
                  {TERRITORIOS.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-0">

        {/* [2] FASE 1 — Contexto de mercado nacional */}
        <MarketContextPanel />

        {/* [3] FASE 2 — Dados do território */}
        <TerritoryPanel data={territory} onChange={handleTerritoryChange} />

        {/* [4–13] Simulador Nalata REV7 */}
        <NalataModel
          params={simParams}
          onChange={setSimParams}
          result={simResult}
        />

        {/* [Rampa] Gráfico Rampa de Crescimento M1–M12 */}
        <Card className="border-nalata-orange/20 shadow-elegant mb-6">
          <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Rampa de Crescimento M1–M12 — 3 Cenários
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <MaturationRampChart result={simResult} params={simParams} />
          </CardContent>
        </Card>

        {/* [Break-even] Painel Break-even Operacional */}
        <BreakEvenPanel result={simResult} />

        {/* [Diferenciais] FASE 7 — Diferenciais competitivos */}
        <div className="mb-6">
          <CompetitiveTable />
        </div>
      </div>

      {/* [14] Disclaimer legal */}
      <footer className="border-t bg-muted/40 mt-4">
        <div className="container mx-auto px-6 py-4 text-center">
          <p className="text-xs text-muted-foreground italic max-w-3xl mx-auto">
            Os valores apresentados são projeções com base no modelo operacional Nalata REV7 e não constituem
            garantia de rendimento. O sucesso depende da gestão, execução e dedicação do franqueado.
            Os resultados podem variar entre unidades e territórios.
          </p>
        </div>
      </footer>
    </div>
  );
}
