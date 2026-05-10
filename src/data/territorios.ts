import type { TerritoryData } from "@/components/TerritoryPanel";
import autoRaw from "./territorios-auto.json";

export interface TerritoryPreset {
  id: string;
  label: string;
  arquivo: string;
  latasAlvoM12: number;
  precoMinimoSugerido: number;
  precoMaximoSugerido: number;
  data: TerritoryData;
}

// Fonte principal agora é o JSON gerado a partir dos arquivos .md
const TERRITORIOS_BASE: TerritoryPreset[] = [];

const autoData = autoRaw as TerritoryPreset[];
const autoIds = new Set(autoData.map((t) => t.id));

export const TERRITORIOS: TerritoryPreset[] = [
  ...TERRITORIOS_BASE.filter((t) => !autoIds.has(t.id)),
  ...autoData,
].sort((a, b) => a.label.localeCompare(b.label, "pt-BR"));

export const TERRITORIO_VAZIO: TerritoryData = {
  cidade: "",
  qtdObras: "",
  qtdEdif: "",
  qtdCond: "",
  qtdConst: "",
  qtdCltes: "",
  latasAlvo: "",
  score: "",
  taxaConversao: "",
};