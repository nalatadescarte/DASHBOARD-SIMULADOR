// Modelo Nalata Descarte Inteligente — REV8
// Driver central: latas_ativas × precoMedio × ciclosPorMes
// Âncora SJC: 280 latas × R$98 × 1 ciclo = R$27.440

export type Scenario = "conservador" | "moderado" | "otimista";
export type OperationMode = "solo" | "um_funcionario" | "dois_funcionarios";

export const MODE_LABELS: Record<OperationMode, string> = {
  solo: "Mão na Massa",
  um_funcionario: "01 Funcionário",
  dois_funcionarios: "02 Funcionários",
};

// Capacidade de locações por pessoa (franqueado ou funcionário)
export const LOCACOES_POR_PESSOA = 100;
export const SALARIO_FUNCIONARIO = 4700; // R$/mês por funcionário
export const VEICULO_EXTRA_THRESHOLD = 300; // acima de 300 locações ativas → 2° veículo + parcela extra

export function calcNumFuncionarios(mode: OperationMode, latasAtivas: number): number {
  if (latasAtivas > VEICULO_EXTRA_THRESHOLD) return mode === "solo" ? 2 : 3;
  if (latasAtivas >= LOCACOES_POR_PESSOA) return mode === "solo" ? 1 : 2;
  return { solo: 0, um_funcionario: 1, dois_funcionarios: 2 }[mode];
}

// ─── Constantes físicas ───────────────────────────────────────────────────────
export const LATAS_POR_MODULO = 300;   // ciclos/mês por módulo operacional
export const OPEX_MODULO = 8300;       // R$/mês por módulo (2 colabs + encargos)
export const CAPEX_MODULO = 35000;     // R$ CAPEX por módulo / 2º veículo
export const PRECO_LATA = 230;         // R$ por lata física nova
export const ESTOQUE_INICIAL_LATAS = 60;
export const LATAS_ALVO_SJC = 280;     // âncora SJC — latas ativas M12 moderado
export const TAXA_CRESCIMENTO_MODERADO = 0.15; // mantida como referência histórica

// ─── Rampa M1 — learning phase dos ads ───────────────────────────────────────
const MULT_SEMANAS = [0.50, 0.60, 0.80, 1.00] as const;

/**
 * Calcula as latas ativas estimadas no M1, modelando o learning phase dos ads.
 * Semana 1–2: menor volume (campanha ainda otimizando).
 * Semana 3–4: ads otimizados, conversão plena.
 */
export function calcularLatasM1(
  leadsPorSemana: number,
  taxaConversao: number,   // 0–100
  latasPorCliente: number
): number {
  const conv = taxaConversao / 100;
  return MULT_SEMANAS.reduce((total, mult) => {
    const clientes = Math.round(leadsPorSemana * mult * conv);
    return total + clientes * latasPorCliente;
  }, 0);
}

// ─── Cenários ────────────────────────────────────────────────────────────────
// O cenário altera:
// 1) a intensidade de aquisição no M1
// 2) o alvo relativo de M12 sobre o slider
export const FATORES_CENARIO = {
  conservador: {
    leadsMult: 0.95,
    convMult: 1.00,
    latasClienteMult: 1.00,
    m12Mult: 0.90,
  },
  moderado: {
    leadsMult: 1.00,
    convMult: 1.00,
    latasClienteMult: 1.00,
    m12Mult: 1.00,
  },
  otimista: {
    leadsMult: 1.10,
    convMult: 1.05,
    latasClienteMult: 1.00,
    m12Mult: 1.20,
  },
};

export const MODELO_CENARIOS = {
  LATAS_ALVO_SJC,
  LATAS_POR_MODULO,
  ESTOQUE_INICIAL_LATAS,
  conservador: {
    label: "Conservador",
    cor: "#ef4444",
    percentualDoModerado: 0.70,
  },
  moderado: {
    label: "Moderado",
    cor: "#f59e0b",
    percentualDoModerado: 1.00,
  },
  otimista: {
    label: "Otimista",
    cor: "#22c55e",
    percentualDoModerado: 1.25,
  },
} as const;

// ─── Custos fixos ─────────────────────────────────────────────────────────────
export const DESPESAS_FIXAS_CONSTANTES = {
  seguro: 450.0,
  royalties: 1500.0,
  parcelaVeiculo: 1139.51,
};

// Custos variáveis por km/lata
export const PRECO_COMBUSTIVEL_DEFAULT = 0.60;
export const KM_RODADO_DEFAULT = 60;
export const TAXA_DESTINACAO_FINAL = 9.0;
export const TAXA_MANUTENCAO_KM = 0.35;
export const PONTO_OPERACIONAL_DEFAULT = 1700.0;
export const MKT_DIGITAL_ADS_DEFAULT = 500.0;
export const TAXA_MARKETING_NACIONAL = 500.0;
export const CONTABILIDADE_DEFAULT = 630.0;

// ─── Interfaces ───────────────────────────────────────────────────────────────
export interface SimParams {
  mode: OperationMode;
  scenario: Scenario;
  latasAlvoM12: number;     // alvo moderado do território / slider
  ciclosPorMes: 1 | 2 | 3;  // quantas vezes cada lata física é usada/mês
  precoMinimo: number;      // preço B2B por ciclo (R$)
  precoMaximo: number;      // preço B2C por ciclo (R$)
  mixAvulsa: number;        // 0–100
  pontoOperacional: number;
  mktDigitalAds: number;
  contabilidade: number;
  precoCombustivel: number;
  kmRodado: number;
  leadsPorSemana: number;
  taxaConversao: number;    // 0–100
  latasPorCliente: number;
}

export interface SimMesResult {
  mes: number;
  latasAtivas: number;
  latasFisicas: number;
  latasNovas: number;
  numModulos: number;
  numFuncionarios: number;
  receitaTotal: number;
  custoLatas: number;
  combustivel: number;
  manutencao: number;
  taxaDestinacao: number;
  parcelaExtraVeiculo: number;
  despesaTotal: number;
  lucroMensal: number;
  deficit: number;
}

export interface SimResult {
  curva: number[];
  despesas: number[];
  lucros: number[];
  meses: SimMesResult[];
  latasAtivasPorMes: number[];
  latasFisicasPorMes: number[];
  numModulosPorMes: number[];
  numFuncionariosPorMes: number[];
  custoLatasPorMes: number[];
  precoMedioEfetivo: number;
  receitaMaturacao: number;
  despesaMaturacao: number;
  lucroMaturacao: number;
  margemLiquida: number;
  capitalDeGiro: number;
  investimentoTotal: number;
  investimentoCidade: number;
  payback: number | null;
  rentabilidadeMes: number;
  roiAnual: number;
  roi12: number | null;
  roi24: number | null;
  breakEvenMes: number | null;
  mesPrimeiroDegrau: number | null;
  totalFixoBase: number;
  latasM1: number;
  taxaCrescimentoMes: number;       // taxa geométrica mensal (decimal)
  taxasCrescimentoPorMes: number[]; // array constante M1..M12
  warnings: string[];
}

// ─── Helpers de cenário ───────────────────────────────────────────────────────
function aplicarCenarioNaAquisicao(
  leadsPorSemana: number,
  taxaConversao: number,
  latasPorCliente: number,
  cenario: Scenario
) {
  const f = FATORES_CENARIO[cenario];

  return {
    leadsAjustados: leadsPorSemana * f.leadsMult,
    conversaoAjustada: taxaConversao * f.convMult,
    latasPorClienteAjustada: latasPorCliente * f.latasClienteMult,
  };
}

export function calcularPontosDosCenario(
  leadsPorSemana: number,
  taxaConversao: number,
  latasPorCliente: number,
  latasM12Alvo: number,
  cenario: Scenario
): {
  m1: number;
  m12: number;
  leadsAjustados: number;
  conversaoAjustada: number;
  latasPorClienteAjustada: number;
} {
  const ajustes = aplicarCenarioNaAquisicao(
    leadsPorSemana,
    taxaConversao,
    latasPorCliente,
    cenario
  );

  const m1 = Math.max(
    1,
    calcularLatasM1(
      ajustes.leadsAjustados,
      ajustes.conversaoAjustada,
      ajustes.latasPorClienteAjustada
    )
  );

  const m12Bruto = Math.max(2, Math.round(latasM12Alvo * FATORES_CENARIO[cenario].m12Mult));

  // trava para evitar curva decrescente se o usuário colocar um alvo muito baixo
  const m12 = Math.max(m1, m12Bruto);

  return {
    m1,
    m12,
    ...ajustes,
  };
}

function calcularFatorGeometrico(m1: number, m12: number): number {
  if (m1 <= 0 || m12 <= 0) return 0;
  if (m12 <= m1) return 0;
  return Math.pow(m12 / m1, 1 / 11) - 1;
}

function gerarRampaGeometrica(m1: number, m12: number): number[] {
  if (m1 <= 0) return Array(12).fill(0);

  if (m12 <= m1) {
    return Array.from({ length: 12 }, () => m1);
  }

  const fator = Math.pow(m12 / m1, 1 / 11);

  return Array.from({ length: 12 }, (_, i) =>
    Math.max(1, Math.round(m1 * Math.pow(fator, i)))
  );
}

function calcularTaxasGeometricas(m1: number, m12: number): number[] {
  const taxa = calcularFatorGeometrico(m1, m12);
  return Array(12).fill(taxa);
}

const DIAS_UTEIS_MES = 20;

function calcularViagensDiaPorLatasAtivas(latasAtivas: number): number {
  if (latasAtivas <= 0) return 0;

  const latasDia = latasAtivas / DIAS_UTEIS_MES;

  // <= 8 latas/dia = 2 viagens
  // > 8 até 16 = 3 viagens
  // > 16 até 24 = 4 viagens
  return Math.max(2, Math.ceil(latasDia / 8) + 1);
}

// ─── Funções de cálculo ───────────────────────────────────────────────────────

// mixAvulsa: 0 = 100% pacotes (precoMin), 100 = 100% avulsas (precoMax)
export function calcularPrecoMedioEfetivo(
  precoMinimo: number,
  precoMaximo: number,
  mixAvulsa: number
): number {
  return precoMinimo + (mixAvulsa / 100) * (precoMaximo - precoMinimo);
}

/**
 * Ponto de entrada para exibição comparativa do cenário.
 */
export function calcularSimulacaoCenario(
  leadsPorSemana: number,
  taxaConversao: number,
  latasPorCliente: number,
  latasM12Alvo: number,
  cenario: Scenario
) {
  const {
    m1,
    m12,
    leadsAjustados,
    conversaoAjustada,
    latasPorClienteAjustada,
  } = calcularPontosDosCenario(
    leadsPorSemana,
    taxaConversao,
    latasPorCliente,
    latasM12Alvo,
    cenario
  );

  const rampa = gerarRampaGeometrica(m1, m12);
  const deltaMedioLatas = Math.round((rampa[11] - rampa[0]) / 11);
  const taxaMediaGeom = calcularFatorGeometrico(m1, m12) * 100;

  return {
    rampa,
    m1,
    m12,
    deltaMedioLatas,
    taxaMediaGeom,
    exibicao: {
      crescimentoMedio: `+${deltaMedioLatas} latas ativas/mês (média)`,
      viaAds: `${Math.round(leadsAjustados)} leads/semana · ${conversaoAjustada.toFixed(1)}% conversão`,
      viaB2B: `${latasPorClienteAjustada.toFixed(1)} latas por cliente (média)`,
    },
  };
}

/**
 * Rampa de latas ativas M1–M12.
 * M1 nasce dos drivers de aquisição ajustados pelo cenário.
 * M12 nasce do slider × multiplicador do cenário.
 */
export function calcularLatasAtivasPorMes(
  scenario: Scenario,
  latasAlvoM12: number,
  leadsPorSemana: number,
  taxaConversao: number,
  latasPorCliente: number
): number[] {
  const { m1, m12 } = calcularPontosDosCenario(
    leadsPorSemana,
    taxaConversao,
    latasPorCliente,
    latasAlvoM12,
    scenario
  );

  return gerarRampaGeometrica(m1, m12);
}

export function calcularTotalFixoBase(
  pontoOperacional: number,
  mktDigitalAds: number,
  contabilidade = CONTABILIDADE_DEFAULT
): number {
  return (
    pontoOperacional +
    DESPESAS_FIXAS_CONSTANTES.seguro +
    mktDigitalAds +
    TAXA_MARKETING_NACIONAL +
    DESPESAS_FIXAS_CONSTANTES.royalties +
    contabilidade +
    DESPESAS_FIXAS_CONSTANTES.parcelaVeiculo
  );
}

// ─── Simulação completa ───────────────────────────────────────────────────────
export function calcularSimulacaoCompleta(params: SimParams): SimResult {
  const {
    mode,
    scenario,
    latasAlvoM12,
    ciclosPorMes,
    precoMinimo,
    precoMaximo,
    mixAvulsa,
    pontoOperacional,
    mktDigitalAds,
    contabilidade,
    precoCombustivel,
    kmRodado,
    leadsPorSemana,
    taxaConversao,
    latasPorCliente,
  } = params;

  const precoMedioEfetivo = calcularPrecoMedioEfetivo(precoMinimo, precoMaximo, mixAvulsa);
  const totalFixoBase = calcularTotalFixoBase(pontoOperacional, mktDigitalAds, contabilidade);

  const {
    m1: latasM1,
    m12: alvoM12,
  } = calcularPontosDosCenario(
    leadsPorSemana,
    taxaConversao,
    latasPorCliente,
    latasAlvoM12,
    scenario
  );

  const latasAtivasPorMes = gerarRampaGeometrica(latasM1, alvoM12);
  const taxasCrescimentoPorMes = calcularTaxasGeometricas(latasM1, alvoM12);
  const taxaCrescimentoMes = taxasCrescimentoPorMes[11];

  let estoqueLatas = ESTOQUE_INICIAL_LATAS;

  const curva: number[] = [];
  const despesas: number[] = [];
  const lucros: number[] = [];
  const meses: SimMesResult[] = [];
  const latasFisicasPorMes: number[] = [];
  const numModulosPorMes: number[] = [];
  const numFuncionariosPorMes: number[] = [];
  const custoLatasPorMes: number[] = [];

  for (let m = 1; m <= 12; m++) {
    const latasAtivas = latasAtivasPorMes[m - 1];

    // Frota física: cada lata física serve ciclosPorMes latas ativas
    const latasFisicas = Math.ceil(latasAtivas / ciclosPorMes);
    const latasNovas = Math.max(0, latasFisicas - estoqueLatas);
    estoqueLatas = Math.max(estoqueLatas, latasFisicas);
    const custoLatas = latasNovas * PRECO_LATA;

    // Módulos: 1 módulo suporta 300 ciclos/mês
    const numModulos = Math.ceil((latasFisicas * ciclosPorMes) / LATAS_POR_MODULO);

    // Funcionários: escala por faixas de latasAtivas conforme modo operacional
    const numFuncionarios = calcNumFuncionarios(mode, latasAtivas);
    const custoFuncionarios = numFuncionarios * SALARIO_FUNCIONARIO;

    // 2° veículo: parcela extra a partir de 301 latas ativas
    const parcelaExtraVeiculo =
      latasAtivas > VEICULO_EXTRA_THRESHOLD
        ? DESPESAS_FIXAS_CONSTANTES.parcelaVeiculo
        : 0;

    // Custos variáveis logísticos — escalam com as latas ativas do mês
    const viagensDia = calcularViagensDiaPorLatasAtivas(latasAtivas);
    const viagensMes = viagensDia * DIAS_UTEIS_MES;

    const combustivel = Math.round(precoCombustivel * kmRodado * viagensMes);
    const manutencao = Math.round(TAXA_MANUTENCAO_KM * kmRodado * viagensMes);
    
    const taxaDestinacao = Math.round(TAXA_DESTINACAO_FINAL * latasAtivas);

    // Receita = latas_fisicas × ciclosPorMes × precoMedio
    const receitaTotal = Math.round(latasFisicas * ciclosPorMes * precoMedioEfetivo);

    const despesaTotal =
      totalFixoBase +
      custoFuncionarios +
      custoLatas +
      combustivel +
      manutencao +
      taxaDestinacao +
      parcelaExtraVeiculo;

    const lucroMensal = receitaTotal - despesaTotal;
    const deficit = Math.max(0, -lucroMensal);

    curva.push(receitaTotal);
    despesas.push(despesaTotal);
    lucros.push(lucroMensal);
    latasFisicasPorMes.push(latasFisicas);
    numModulosPorMes.push(numModulos);
    numFuncionariosPorMes.push(numFuncionarios);
    custoLatasPorMes.push(custoLatas);

    meses.push({
      mes: m,
      latasAtivas,
      latasFisicas,
      latasNovas,
      numModulos,
      numFuncionarios,
      receitaTotal,
      custoLatas,
      combustivel,
      manutencao,
      taxaDestinacao,
      parcelaExtraVeiculo,
      despesaTotal,
      lucroMensal,
      deficit,
    });
  }

  const receitaMaturacao = curva[11];
  const despesaMaturacao = despesas[11];
  const lucroMaturacao = lucros[11];
  const margemLiquida = receitaMaturacao > 0 ? (lucroMaturacao / receitaMaturacao) * 100 : 0;

  // Capital de giro = 1.5 × déficits até break-even
  const beIdx = meses.findIndex((m) => m.lucroMensal > 0);
  const sliceEnd = beIdx === -1 ? 12 : beIdx;
  const deficitAteBreakEven = meses.slice(0, sliceEnd).reduce((acc, m) => acc + m.deficit, 0);
  const capitalDeGiro = Math.max(15000, 1.5 * deficitAteBreakEven);

  // Investimento total: franquia base + módulos adicionais + 2° veículo + giro
  const numModulosM12 = numModulosPorMes[11];
  const modulosAdicionais = Math.max(0, numModulosM12 - 1);
  const precisaVeiculoExtra = meses.some((m) => m.latasAtivas > VEICULO_EXTRA_THRESHOLD);
  const capexVeiculoExtra = precisaVeiculoExtra ? CAPEX_MODULO : 0;

  const investimentoCidade =
    capitalDeGiro +
    modulosAdicionais * CAPEX_MODULO +
    capexVeiculoExtra;

  const investimentoTotal = 98370 + investimentoCidade;

  // ── Payback REAL: simula acumulado mês a mês ─────────────────────────────────
  // Começa em -investimentoTotal e soma cada lucro mensal real (M1–M12),
  // depois projeta com lucroMaturacao constante até o acumulado cruzar zero.
  // Isso reflete o tempo real para recuperar o capital investido.
  let payback: number | null = null;
  if (lucroMaturacao > 0) {
    let acumulado = -investimentoTotal;
    // Fase 1: meses reais M1–M12
    for (let i = 0; i < 12; i++) {
      acumulado += lucros[i];
      if (acumulado >= 0) { payback = i + 1; break; }
    }
    // Fase 2: projeta além do M12 com lucro de maturidade constante
    if (payback === null) {
      let mes = 13;
      while (mes <= 120) { // teto de 10 anos
        acumulado += lucroMaturacao;
        if (acumulado >= 0) { payback = mes; break; }
        mes++;
      }
    }
  }

  // ── ROI ──────────────────────────────────────────────────────────────────────
  // roiAnual: retorno anualizado na maturidade (indicador forward-looking).
  //   Responde: "rendendo como no M12, quanto gero em 12 meses sobre o investimento?"
  // roi12: retorno real acumulado nos primeiros 12 meses (inclui a rampa de crescimento).
  // roi24: retorno real nos 12 meses seguintes (todos ao nível de maturidade) + roi12.
  const totalLucro12 = lucros.reduce((s, l) => s + l, 0);
  const rentabilidadeMes = lucroMaturacao > 0 ? (lucroMaturacao / investimentoTotal) * 100 : 0;
  const roiAnual = lucroMaturacao > 0 ? ((lucroMaturacao * 12) / investimentoTotal) * 100 : 0;
  const roi12 =
    investimentoTotal > 0
      ? (totalLucro12 / investimentoTotal) * 100
      : null;
  const roi24 =
    lucroMaturacao > 0
      ? ((totalLucro12 + lucroMaturacao * 12) / investimentoTotal) * 100
      : null;

  const breakEvenMes = meses.find((m) => m.lucroMensal > 0)?.mes ?? null;
  const mesPrimeiroDegrau =
    meses.find((m, i) => i > 0 && m.numModulos > meses[i - 1].numModulos)?.mes ?? null;

  const warnings: string[] = [];
  if (mesPrimeiroDegrau) {
    warnings.push(`ALERTA: 2° módulo (veículo + equipe) necessário no Mês ${mesPrimeiroDegrau}`);
  }
  if (warnings.length > 0) console.warn("[Nalata REV8]", warnings);

  return {
    curva,
    despesas,
    lucros,
    meses,
    latasAtivasPorMes,
    latasFisicasPorMes,
    numModulosPorMes,
    numFuncionariosPorMes,
    custoLatasPorMes,
    precoMedioEfetivo,
    receitaMaturacao,
    despesaMaturacao,
    lucroMaturacao,
    margemLiquida,
    capitalDeGiro,
    investimentoTotal,
    investimentoCidade,
    payback,
    rentabilidadeMes,
    roiAnual,
    roi12,
    roi24,
    breakEvenMes,
    mesPrimeiroDegrau,
    totalFixoBase,
    latasM1,
    taxaCrescimentoMes,
    taxasCrescimentoPorMes,
    warnings,
  };
}

// ─── Backward compat ──────────────────────────────────────────────────────────
export const TOTAL_FIXAS = calcularTotalFixoBase(
  PONTO_OPERACIONAL_DEFAULT,
  MKT_DIGITAL_ADS_DEFAULT,
  CONTABILIDADE_DEFAULT
);