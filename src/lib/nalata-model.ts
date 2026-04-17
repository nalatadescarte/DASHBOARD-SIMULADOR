// Modelo Nalata Descarte Inteligente — REV6
// Lógica paramétrica de receita + despesas por modo de operação

export type OperationMode = "solo" | "um_colaborador" | "equipe_completa";
export type Scenario = "conservador" | "moderado" | "otimista";

export const SCENARIO_MULTIPLIER: Record<Scenario, number> = {
  conservador: 0.65,
  moderado: 1.0,
  otimista: 1.35,
};

// Despesas fixas (iguais em todos os modos)
export const DESPESAS_FIXAS = {
  pontoAguaLuz: 1700.0,
  combustivelManutencaoSeguro: 1746.67,
  marketingRoyaltiesContab: 3130.0,
  parcelaVeiculo: 1139.51,
};

export const TOTAL_FIXAS =
  DESPESAS_FIXAS.pontoAguaLuz +
  DESPESAS_FIXAS.combustivelManutencaoSeguro +
  DESPESAS_FIXAS.marketingRoyaltiesContab +
  DESPESAS_FIXAS.parcelaVeiculo; // 7.716,18

export const SALARIO_ENTREGADOR = 4700.0;
export const SALARIO_AJUDANTE = 3600.0;

export const MODE_LABELS: Record<OperationMode, string> = {
  solo: "Mão na Massa",
  um_colaborador: "1 Colaborador",
  equipe_completa: "Equipe Completa",
};

// Curva base M1-M12 (referência REV6 com 60 latas, ticket 460, markup 1.70)
export const CURVA_BASE_M1_M12 = [
  6000, 7500, 9000, 11000, 13000, 15000, 17000, 18000, 18000, 22000, 25000, 27600,
];

export const RECEITA_MATURACAO_BASE = 27600; // M12 base

/**
 * Despesa total mensal por modo + mês
 */
export function calcularDespesaMensal(mes: number, modo: OperationMode): number {
  if (modo === "solo") return TOTAL_FIXAS;
  if (modo === "um_colaborador") return TOTAL_FIXAS + SALARIO_ENTREGADOR;
  // equipe_completa: ajudante entra a partir do mês 5
  const ajudante = mes >= 5 ? SALARIO_AJUDANTE : 0;
  return TOTAL_FIXAS + SALARIO_ENTREGADOR + ajudante;
}

/**
 * Receita de maturação calculada de forma puramente paramétrica.
 * Ajustada por cenário.
 */
export function calcularReceitaMaturacao(params: {
  latas: number;
  ticket: number;
  conversao: number; // %
  markup: number;
  scenario: Scenario;
}): number {
  const { latas, ticket, conversao, markup, scenario } = params;
  // Receita ≈ latas × ticket × (conversao/100) × markup, ajustado para alinhar com baseline
  // Baseline: 60 × 460 × 1.0 × 1.70 ≈ 46.920 → normalizar para 27.600
  const bruta = latas * ticket * (conversao / 100) * markup;
  const fatorNorm = 27600 / (60 * 460 * (8 / 100) * 1.7); // ~ 1.0498
  return bruta * fatorNorm * SCENARIO_MULTIPLIER[scenario];
}

/**
 * Gera curva de 12 meses interpolada proporcionalmente entre o ponto inicial
 * (CURVA_BASE M1) e a maturação calculada (M12).
 */
export function gerarCurvaReceita(receitaMaturacao: number): number[] {
  const fator = receitaMaturacao / RECEITA_MATURACAO_BASE;
  return CURVA_BASE_M1_M12.map((v) => v * fator);
}

/**
 * Capital de giro = max(15000, 1.6 × somatório dos déficits mensais)
 */
export function calcularCapitalDeGiro(
  receitaMensal: number[],
  modo: OperationMode
): number {
  let deficit = 0;
  for (let i = 0; i < receitaMensal.length; i++) {
    const despesa = calcularDespesaMensal(i + 1, modo);
    const saldo = receitaMensal[i] - despesa;
    if (saldo < 0) deficit += Math.abs(saldo);
  }
  return Math.max(15000, deficit * 1.6);
}

export function mesBreakEven(receitaMensal: number[], modo: OperationMode): number | null {
  for (let i = 0; i < receitaMensal.length; i++) {
    const despesa = calcularDespesaMensal(i + 1, modo);
    if (receitaMensal[i] - despesa > 0) return i + 1;
  }
  return null;
}
