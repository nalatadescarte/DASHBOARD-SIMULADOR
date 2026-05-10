import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Building2, Home, HardHat, Users } from "lucide-react";

export interface TerritoryData {
  cidade: string;
  qtdObras: string;
  qtdEdif: string;
  qtdCond: string;
  qtdConst: string;
  qtdCltes: string;
  latasAlvo: string;
  score: string;
  taxaConversao: string;
}

interface Props {
  data: TerritoryData;
  onChange: (data: TerritoryData) => void;
}

function getScoreClass(score: number): { label: string; color: string; bg: string; bar: string } {
  if (score >= 8.0) return { label: "Alta densidade — rampa acelerada", color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/30 border-green-300", bar: "bg-green-500" };
  if (score >= 6.0) return { label: "Média densidade — crescimento consistente", color: "text-yellow-600", bg: "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300", bar: "bg-yellow-500" };
  return { label: "Território em desenvolvimento", color: "text-slate-500", bg: "bg-slate-50 dark:bg-slate-900/30 border-slate-300", bar: "bg-slate-400" };
}

export function TerritoryPanel({ data, onChange }: Props) {
  const [editing, setEditing] = useState(false);

  const set = (field: keyof TerritoryData, value: string) =>
    onChange({ ...data, [field]: value });

  const filled = data.cidade.trim() !== "";
  const scoreNum = parseFloat(data.score) || 0;
  const scoreClass = getScoreClass(scoreNum);

  return (
    <Card className="border-nalata-orange/20 shadow-elegant mb-6">
      <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Território de Simulação
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {filled && !editing ? (
          <div className="space-y-4">
            {/* Score visual — seção 6.1 do documento */}
            {scoreNum > 0 && (
              <div className={`rounded-xl border p-5 ${scoreClass.bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Índice de Oportunidade Nalata™</p>
                    <div className="flex items-end gap-2">
                      <span className={`text-5xl font-black ${scoreClass.color}`}>{scoreNum.toFixed(1)}</span>
                      <span className="text-xl text-muted-foreground mb-1">/10</span>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold px-3 py-1.5 rounded-full border ${scoreClass.color} ${scoreClass.bg}`}>
                    {scoreClass.label}
                  </span>
                </div>
                {/* Barra de progresso */}
                <div className="w-full bg-muted/60 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${scoreClass.bar}`}
                    style={{ width: `${(scoreNum / 10) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-right">{data.cidade}</p>
              </div>
            )}

            {/* 4 métricas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <MetricCard icon={Building2} label="Unidades em prédios verticais" value={data.qtdEdif || "—"} />
              <MetricCard icon={Home} label="Condomínios verticais" value={data.qtdCond || "—"} />
              <MetricCard icon={HardHat} label="Construtoras ativas" value={data.qtdConst || "—"} />
              <MetricCard icon={Users} label="Potencial de clientes" value={data.qtdCltes || "—"} />
            </div>

            {/* Dados complementares */}
            <div className="font-mono text-sm bg-muted rounded-lg p-4 border border-border">
              <p className="font-bold text-center text-primary mb-2">
                ╔══ ANÁLISE DE MERCADO — {data.cidade.toUpperCase()} ══╗
              </p>
              <div className="space-y-1 pl-2">
                <PanelRow label="Potencial de obras/reformas" value={data.qtdObras || "—"} />
                <PanelRow label="Latas alvo M12 (moderado)" value={data.latasAlvo ? `${data.latasAlvo} latas` : "—"} bold />
                <PanelRow label="Taxa de conversão estimada" value={data.taxaConversao ? `${data.taxaConversao}%` : "—"} />
                <PanelRow label="Índice de Oportunidade Nalata™" value={scoreNum > 0 ? `${scoreNum.toFixed(1)}/10` : "—"} />
              </div>
              <p className="font-bold text-center text-primary mt-2">╚═══════════════════════════════════════╝</p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="text-xs text-muted-foreground underline hover:text-primary"
            >
              Editar dados do território
            </button>
          </div>
        ) : (
          /* Formulário de entrada */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Cidade / Bairro / Região</Label>
              <Input className="mt-1" placeholder="Ex: Vila Prudente, São Paulo — SP" value={data.cidade} onChange={(e) => set("cidade", e.target.value)} />
            </div>
            <div>
              <Label>Potencial de obras/reformas</Label>
              <Input className="mt-1" placeholder="Ex: 1.200 obras/ano" value={data.qtdObras} onChange={(e) => set("qtdObras", e.target.value)} />
            </div>
            <div>
              <Label>Unidades em prédios verticais</Label>
              <Input className="mt-1" placeholder="Ex: 3.200 unidades" value={data.qtdEdif} onChange={(e) => set("qtdEdif", e.target.value)} />
            </div>
            <div>
              <Label>Condomínios verticais</Label>
              <Input className="mt-1" placeholder="Ex: 85 condomínios" value={data.qtdCond} onChange={(e) => set("qtdCond", e.target.value)} />
            </div>
            <div>
              <Label>Construtoras ativas</Label>
              <Input className="mt-1" placeholder="Ex: 28 construtoras" value={data.qtdConst} onChange={(e) => set("qtdConst", e.target.value)} />
            </div>
            <div>
              <Label>Potencial de clientes recorrentes</Label>
              <Input className="mt-1" placeholder="Ex: 120 clientes" value={data.qtdCltes} onChange={(e) => set("qtdCltes", e.target.value)} />
            </div>
            <div>
              <Label>Latas ativas alvo no M12 — cenário moderado</Label>
              <Input className="mt-1" placeholder="Ex: 280" value={data.latasAlvo} onChange={(e) => set("latasAlvo", e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">Âncora SJC = 280 · fator_mercado = latas_alvo / 280</p>
            </div>
            <div>
              <Label>Índice de Oportunidade Nalata™ (0–10)</Label>
              <Input className="mt-1" placeholder="Ex: 8.5" value={data.score} onChange={(e) => set("score", e.target.value)} />
            </div>
            <div>
              <Label>Taxa de conversão estimada (%)</Label>
              <Input className="mt-1" placeholder="Ex: 30" value={data.taxaConversao} onChange={(e) => set("taxaConversao", e.target.value)} />
            </div>
            {editing && (
              <div className="md:col-span-2 flex justify-end">
                <button onClick={() => setEditing(false)} className="text-sm text-primary font-semibold underline hover:opacity-80">
                  Ver painel do território →
                </button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-3 text-center">
      <Icon className="h-4 w-4 text-primary mx-auto mb-1" />
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-bold text-sm mt-0.5">{value}</div>
    </div>
  );
}

function PanelRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  if (bold) {
    return (
      <div className="font-bold text-primary">
        {label}: {value}
      </div>
    );
  }
  return (
    <div>
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span>{value}</span>
    </div>
  );
}
