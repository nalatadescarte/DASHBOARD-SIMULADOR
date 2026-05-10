# PROMPT PARA AGENTE LOVABLE — NALATA INSIGHTS DASHBOARD
## Revisão completa do simulador financeiro de franquias

---

> **Como usar este prompt:**
> Cole o conteúdo da seção **"PROMPT PRINCIPAL"** diretamente no chat do agente Claude dentro do Lovable.
> As seções de **"CONTEXTO TÉCNICO"** e **"DADOS DE REFERÊNCIA"** são para seu uso — não precisam ser coladas, mas podem ser anexadas como documentos de contexto caso o agente suporte upload.

---

## ════════════════════════════════════════
## PROMPT PRINCIPAL — COLAR NO LOVABLE
## ════════════════════════════════════════

---

Você é o agente de desenvolvimento do dashboard **Nalata Insights Dashboard**.

Preciso que você faça uma **revisão completa e estrutural** do simulador financeiro de franquias, transformando-o em uma ferramenta de apresentação para investidores interessados na aquisição de uma unidade de franquia Nalata Descarte Inteligente.

Este dashboard é utilizado por consultores durante apresentações comerciais. O **documento de entrada** que alimenta cada simulação é um roteiro estruturado em markdown (descrito abaixo) com campos marcados como `{{ VARIAVEL }}` que são preenchidos com os dados do território selecionado.

Leia com atenção todos os requisitos antes de iniciar qualquer modificação.

---

## 1. CONTEXTO DO NEGÓCIO

**Empresa:** Nalata Descarte Inteligente — franquia de locação de mini-coletores (tambores de 200L) para descarte de entulho em condomínios, obras e reformas.

**Modelo de receita:** Locação recorrente de tambores com coleta programada. Receita mensal por cliente ativo.

**Estrutura de investimento (dados oficiais do fluxo financeiro REV6):**

```
DESEMBOLSO INICIAL FIXO: R$ 98.370
  ├── Kit inicial (equipamentos):  R$ 27.570
  │     ├── 60 latas:              R$ 13.800
  │     ├── 20 patins:             R$  5.500
  │     ├── Guincho:               R$  4.000
  │     ├── Pega tambor:           R$  2.600
  │     ├── Tombador:              R$    850
  │     └── Acessórios:            R$    820
  ├── Logística (veículo):         R$ 67.500
  │     ├── Veículo (Ano 2022):    R$ 65.000 (entrada R$35k, resto financiado)
  │     ├── Plotagem profissional: R$  1.500
  │     └── Instalação guincho:    R$  1.000
  └── Infra & Marketing:           R$  7.650
        ├── Marketing inauguração: R$  3.000
        ├── Abertura de empresa:   R$  1.500
        ├── Uniformes/EPIs:        R$  1.650
        └── Celulares/Ferramentas: R$  1.500

CAPITAL DE GIRO SUGERIDO: R$ 51.407
  └── Calculado como 1.6× o déficit acumulado durante a rampa de maturação

INVESTIMENTO TOTAL (com capital de giro): R$ 149.777
```

---

## 2. ESTRUTURA DE DESPESAS FIXAS — DOIS ESTÁGIOS

O modelo de despesas opera em **dois patamares distintos** que DEVEM ser refletidos no simulador:

```
ESTÁGIO 1 — Mês 1 ao Mês 4 (operação inicial, sem ajudante):
  Funcionário Entregador (com encargos 80%):  R$  4.700,00
  Ponto Comercial / Água / Luz:               R$  1.700,00
  Combustível / Manutenção / Seguro:          R$  1.746,67
  Marketing / Royalties / Contabilidade:      R$  3.130,00
  Parcela Veículo (financiamento):            R$  1.139,51
  ─────────────────────────────────────────────────────────
  TOTAL DESPESA FIXA MÊS 1-4:                R$ 12.416,18

ESTÁGIO 2 — Mês 5 em diante (operação com ajudante):
  + Funcionário Ajudante (com encargos 80%): R$  3.600,00
  ─────────────────────────────────────────────────────────
  TOTAL DESPESA FIXA MÊS 5+:                 R$ 16.266,18
  TOTAL SEM FINANCIAMENTO (equipe completa):  R$ 15.126,67
```

---

## 3. MODO "MÃO NA MASSA" — REQUISITO ESPECIAL

**Esta é uma funcionalidade nova e prioritária.**

Adicione um **seletor de modo de operação** com as seguintes opções:

```
MODO DE OPERAÇÃO:
  ○ Operação Solo — "Mão na Massa"     ← NOVO
  ○ Com 1 colaborador (Entregador)     ← padrão atual (mês 1-4)
  ○ Equipe completa (2 colaboradores)  ← padrão atual (mês 5+)
```

**Regras do Modo "Mão na Massa":**

Quando selecionado "Operação Solo — Mão na Massa", o campo de **salários e encargos** deve ser zerado (R$ 0,00) para TODOS os meses da simulação.

A despesa fixa total recalculada fica:
```
Ponto Comercial / Água / Luz:         R$ 1.700,00
Combustível / Manutenção / Seguro:    R$ 1.746,67
Marketing / Royalties / Contabilidade:R$ 3.130,00
Parcela Veículo (financiamento):      R$ 1.139,51
──────────────────────────────────────────────────
TOTAL DESPESA FIXA (Solo):            R$ 7.716,18
```

**Comportamento do modo solo:**
- O gráfico de receita vs. despesa deve refletir a despesa reduzida
- O break-even antecipa (chega antes do mês 9 — recalcular dinamicamente)
- O payback total deve ser recalculado com a nova margem
- O capital de giro sugerido deve ser recalculado (déficit acumulado × 1.6)
- A margem líquida sobe significativamente — mostrar esse delta em destaque
- Exibir um label/badge: **"Operação realizada pelo franqueado — sem custo de mão de obra"**
- Adicionar nota informativa: *"Ideal para o período inicial de rampa ou para franqueados que optam por operar o negócio pessoalmente. A contratação de colaboradores pode ser feita conforme o crescimento do faturamento."*

**Comparativo visual:** Quando o modo "Mão na Massa" estiver ativo, mostrar ao lado do lucro líquido um comparativo simples:
```
Modo Solo:         Lucro líquido = R$ XX.XXX/mês
Com 1 colaborador: Lucro líquido = R$ YY.YYY/mês
Diferença:         +R$ ZZ.ZZZ/mês (economia de equipe)
```

---

## 4. RAMPA DE MATURAÇÃO — DADOS OFICIAIS

A curva de receita mensal **base** (com 60 latas, markup 1.70, ticket médio R$460) é:

```
Mês  1:  R$  6.000   ← início da operação
Mês  2:  R$  7.500
Mês  3:  R$  9.000
Mês  4:  R$ 11.000
Mês  5:  R$ 13.000
Mês  6:  R$ 15.000
Mês  7:  R$ 17.000
Mês  8:  R$ 18.000   ← zona do break-even
Mês  9:  R$ 18.000   ← break-even (Receita = Despesa)
Mês 10:  R$ 22.000
Mês 11:  R$ 25.000
Mês 12:  R$ 27.600   ← maturidade plena
```

**A curva deve ser multiplicada por um fator dinâmico** baseado em:
- Densidade do território (score de potencial)
- Ticket médio configurado pelo usuário
- Taxa de conversão selecionada
- Modo de operação (solo vs. com equipe — não altera a receita, só as despesas)
- Cenário selecionado (conservador × 0.65 / moderado × 1.0 / otimista × 1.35)

---

## 5. INDICADORES DE INVESTIMENTO OFICIAIS (referência base)

```
Payback total:          21 meses (com equipe completa)
Lucratividade:          41%
Rentabilidade/mês:      > 10%
Markup sugerido:        1.70
DRE — Mês 12:
  Faturamento Bruto:    R$ 27.600,00
  Despesas Fixas:      (R$ 15.126,67)
  Parcela Veículo:     (R$  1.139,51)
  Lucro Líquido:        R$ 11.333,82
Projeção Ano 2:         > R$ 135.000 (lucro anual)
```

---

## 6. MODIFICAÇÕES SOLICITADAS NO DASHBOARD

### 6.1 — BARRA DE NAVEGAÇÃO / SELETOR DE TERRITÓRIO

Mantenha o seletor de cidade/bairro existente.

Adicione, logo abaixo do seletor de território, um **painel de Score de Potencial** com:
- Número grande: Score X.X / 10
- Barra de progresso proporcional ao score
- Tag de classificação:
  - 8.0–10.0 → "Alta densidade — rampa acelerada" (verde)
  - 6.0–7.9  → "Média densidade — crescimento consistente" (amarelo)
  - 0–5.9    → "Território em desenvolvimento" (cinza)
- Quatro métricas rápidas: Edifícios mapeados / Condomínios verticais / Construtoras ativas / Potencial de clientes

### 6.2 — SELETOR DE MODO DE OPERAÇÃO (NOVO — PRIORIDADE ALTA)

Posicionar antes do bloco de despesas fixas. Deve ser um conjunto de **radio buttons ou toggle buttons** com visual claro:

```
[Mão na Massa]  [1 Colaborador]  [Equipe Completa]
```

- Ao selecionar qualquer modo, todos os valores da simulação recalculam automaticamente
- O modo selecionado deve permanecer visível como contexto em todos os painéis abaixo

### 6.3 — BLOCO DE PARÂMETROS EDITÁVEIS

Transforme os parâmetros fixos em **sliders interativos**:

| Parâmetro | Min | Max | Default | Step |
|---|---|---|---|---|
| Ticket médio por coleta/mês | R$200 | R$800 | R$460 | R$10 |
| Taxa de conversão do potencial | 3% | 25% | 8% | 1% |
| Markup de precificação | 1.20 | 2.50 | 1.70 | 0.05 |
| Quantidade de latas em operação | 20 | 120 | 60 | 5 |

Cada slider deve atualizar todos os blocos em tempo real (sem reload).

Exibir ao lado do slider de markup: *"Markup 1.70 → margem de 41% na maturidade"* (atualizar conforme o valor muda).

### 6.4 — TABS DE CENÁRIO

Adicionar três tabs acima do DRE e do gráfico:

```
[Conservador (-35%)]  [Moderado (base)]  [Otimista (+35%)]
```

O tab ativo aplica o multiplicador correspondente sobre a curva de receita. As despesas fixas NÃO se alteram por cenário (são fixas).

### 6.5 — GRÁFICO DE RAMPA DE MATURAÇÃO (NOVO)

Substituir qualquer gráfico de barras estático por um **gráfico de barras agrupadas** com:

**Eixo X:** Meses (M1 a M12)
**Séries:**
- Barras verdes: Receita mensal projetada
- Barras vermelhas/laranja: Despesa total (varia por modo de operação)
- Área sombreada amarela: zona de déficit (onde receita < despesa) — representa o capital de giro consumido

**Marcadores obrigatórios:**
- Linha vertical tracejada no mês do break-even com label: "Break-even — Mês X"
- Ponto de maturidade (mês 12) com label: "Maturidade — R$XX.XXX"

**Tooltip ao hover:** mostrar receita, despesa e saldo (positivo ou negativo) de cada mês.

### 6.6 — DRE SIMPLIFICADO — MÊS DE MATURIDADE

Reorganizar o DRE com as seguintes linhas **na ordem exata**:

```
(+) Faturamento Bruto:                         R$ XX.XXX
──────────────────────────────────────────────────────────
(-) Despesas Fixas — Equipe:
      └── [modo selecionado determina o valor]  (R$ X.XXX)
(-) Ponto / Água / Luz:                        (R$ 1.700)
(-) Combustível / Manutenção / Seguro:         (R$ 1.747)
(-) Marketing / Royalties / Contabilidade:     (R$ 3.130)
(-) Parcela Veículo (financiamento):           (R$ 1.140)
──────────────────────────────────────────────────────────
(=) LUCRO LÍQUIDO MENSAL:                       R$ XX.XXX
    Margem Líquida:                                  XX%
══════════════════════════════════════════════════════════
    Capital de Giro Necessário (calculado):    R$ XX.XXX
    Projeção Lucro Ano 2:                      R$ XXX.XXX
```

Quando o modo "Mão na Massa" estiver ativo, a linha de despesas de equipe deve aparecer como:
```
(-) Despesas com equipe (Modo Solo — Mão na Massa):  R$ 0,00
```
E um ícone ou badge indicando: "Operação realizada pelo próprio franqueado."

### 6.7 — BLOCO DE INDICADORES-CHAVE (KPIs)

Exibir como cards destacados com números grandes:

```
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  Payback     │ │  Lucrativ.   │ │  Rentab./mês │ │  Markup      │
│  XX meses    │ │     XX%      │ │    >XX%      │ │    X.XX      │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

- Todos os KPIs devem recalcular ao mudar modo de operação, cenário ou parâmetros
- Payback: usar lógica `investimento total ÷ lucro líquido mensal` (arredondar para cima)
- Capital de giro: usar lógica `1.6 × Σ(déficits mensais durante a rampa)`

### 6.8 — PAINEL COMPARATIVO DE ROI (NOVO)

Adicionar um painel visual comparando o retorno da franquia com outras aplicações financeiras:

```
Poupança       ████░░░░░░░░░░░░  ~8,4%/ano
CDI            █████░░░░░░░░░░░  ~10,5%/ano
Imóvel (alug.) ████░░░░░░░░░░░░  ~7%/ano
Nalata         ████████████████  XX%/ano  ← calculado dinamicamente
```

- O ROI da Nalata é calculado como: `(lucro líquido mensal × 12) ÷ investimento total × 100`
- Exibir nota: *"*Após payback — rentabilidade sobre capital já recuperado."*
- As barras dos outros investimentos são fixas. A barra da Nalata é dinâmica.

### 6.9 — CAMPO DE CAPITAL DE GIRO — CÁLCULO DINÂMICO

O capital de giro não é mais um número fixo (R$51.407).

**Lógica de cálculo:**
```javascript
// Para cada mês da rampa:
const saldoMensal = receitaMes[i] - despesaTotal[i];
// Acumular déficits:
const deficitAcumulado = saldoMensal < 0 ? Math.abs(saldoMensal) : 0;
// Somar todos os déficits:
const totalDeficit = sum(deficitAcumulado para cada mês);
// Capital de giro = 1.6× o total de déficits:
const capitalDeGiro = totalDeficit * 1.6;
```

Exibir com:
- Valor calculado em destaque
- Label explicativo: *"Reserva estimada (1.6× o déficit acumulado) para sustentar a rampa com total segurança financeira."*
- No modo "Mão na Massa", o déficit é menor → capital de giro menor → exibir o delta: *"Economia de R$ X.XXX no capital de giro necessário vs. modo com equipe."*

---

## 7. ESTRUTURA DE DADOS — DOCUMENTO MARKDOWN DE ENTRADA

O dashboard deve ser capaz de receber um **documento markdown estruturado** (o roteiro de simulação financeira) e usar seus campos `{{ VARIAVEL }}` como fonte de dados para a simulação.

Os campos do markdown que alimentam o dashboard são:

```
{{ CIDADE / BAIRRO / REGIÃO }}  → seletor de território
{{ QTD_OBRAS }}                 → potencial de obras
{{ QTD_EDIF }}                  → edifícios mapeados
{{ QTD_COND }}                  → condomínios verticais
{{ QTD_CONST }}                 → construtoras ativas
{{ QTD_CLTES }}                 → potencial de clientes
{{ SCORE }}                     → score de potencial /10
{{ TAXA_CONVERSAO }}            → taxa de conversão (%)
{{ TICKET_MEDIO }}              → ticket médio (R$)
{{ REC_BRUTA }}                 → receita bruta projetada
{{ LUC_LIQ }}                   → lucro líquido mensal
{{ MARG_L }}                    → margem líquida (%)
{{ PAYBACK }}                   → payback em meses
{{ ROI_12 }}                    → ROI em 12 meses (%)
{{ INV_TOTAL }}                 → investimento total
{{ CAP_GIR }}                   → capital de giro necessário
```

**Implementar um botão "Exportar Simulação"** que gere um arquivo markdown preenchido com todos os valores calculados pelo simulador, seguindo exatamente a estrutura do roteiro de referência.

---

## 8. LÓGICA DE RECÁLCULO — REGRAS GERAIS

Sempre que qualquer parâmetro mudar (território, modo de operação, ticket, conversão, markup, latas, cenário), o seguinte deve recalcular **em tempo real**:

1. Receita mensal de M1 a M12 (aplicar fator dinâmico sobre rampa base)
2. Despesa mensal de M1 a M12 (aplicar modo de operação)
3. Saldo mensal (receita − despesa)
4. Mês do break-even (primeiro mês em que saldo > 0)
5. Lucro líquido na maturidade (mês 12)
6. Margem líquida (%)
7. Payback total em meses
8. Capital de giro necessário (1.6× déficit acumulado)
9. ROI anual (%)
10. Projeção lucro Ano 2 (lucro mensal maturidade × 12)
11. Comparativo de modo de operação (diferença de lucro entre modos)

**Fator dinâmico de receita** é calculado como:
```javascript
const fatorReceita = 
  (ticketMedio / 460) *           // ajuste de ticket
  (taxaConversao / 8) *           // ajuste de conversão
  (quantidadeLatas / 60) *        // ajuste de capacidade
  multiplicadorCenario *          // 0.65 / 1.0 / 1.35
  (score / 8.2);                  // ajuste de densidade do território
```

---

## 9. DISCLAIMER LEGAL — OBRIGATÓRIO EM TODOS OS MODOS

Em todos os modos e telas do simulador, manter visível (pode ser no rodapé):

> *"Os valores apresentados são projeções com base no modelo operacional Nalata e não constituem garantia de rendimento. O sucesso depende da gestão e dedicação do franqueado. Os resultados podem variar entre unidades."*

---

## 10. PALETA VISUAL E IDENTIDADE

Manter a identidade visual Nalata:
- Cor primária: **laranja** `#F97316` (ou próximo ao usado atualmente)
- Fundo: **dark** `#1a1a1a` / `#111111`
- Cards: fundo escuro com borda sutil
- Textos: branco e cinza claro
- Positivo / lucro: **verde** `#22c55e`
- Negativo / despesa: **vermelho/laranja escuro**
- Break-even / atenção: **amarelo âmbar** `#f59e0b`
- Modo "Mão na Massa": badge especial na cor **âmbar/dourado** para destacar

---

## 11. COMPONENTES ADICIONAIS — MODO "MÃO NA MASSA"

Quando o modo Solo estiver ativo, exibir um **card informativo destacado** com fundo âmbar suave:

```
┌─────────────────────────────────────────────────────────┐
│  ✋ Modo Mão na Massa ativo                               │
│  Operação realizada pelo próprio franqueado.             │
│  Salários e encargos: R$ 0,00                           │
│                                                          │
│  Benefícios neste modo:                                  │
│  ✓ Menor custo fixo mensal                              │
│  ✓ Break-even antecipado                                │
│  ✓ Menor capital de giro necessário                     │
│  ✓ Maior margem líquida nos primeiros meses             │
│                                                          │
│  Recomendação: Ideal para a fase inicial. Contrate      │
│  o primeiro colaborador quando o faturamento mensal     │
│  superar R$ 15.000 por dois meses consecutivos.         │
└─────────────────────────────────────────────────────────┘
```

---

## 12. ORDEM DAS SEÇÕES NO DASHBOARD (LAYOUT FINAL)

Seguir esta sequência de cima para baixo:

```
1. Header com logo Nalata + título "Simulador de Franquia"
2. [SELETOR] Território (cidade + bairro/zona)
3. [PAINEL] Score de Potencial do Território
4. [DADOS] Métricas do território (edifícios, condomínios, construtoras, potencial)
5. [SELETOR] Modo de Operação (Mão na Massa / 1 Colaborador / Equipe Completa)
6. [PAINEL] Card informativo do modo ativo
7. [PARÂMETROS] Sliders interativos (ticket, conversão, markup, latas)
8. [TABS] Seletor de cenário (Conservador / Moderado / Otimista)
9. [KPIs] Indicadores principais (payback, lucratividade, rentabilidade, markup)
10. [GRÁFICO] Rampa de maturação receita vs. despesa M1-M12
11. [DRE] Demonstrativo de resultado simplificado (mês de maturidade)
12. [COMPARATIVO] ROI vs. outras aplicações
13. [BOTÃO] Exportar simulação como markdown
14. [RODAPÉ] Disclaimer legal
```

---

## 13. VALIDAÇÕES E COMPORTAMENTOS ESPERADOS

- Nenhum valor deve exibir casas decimais desnecessárias — usar `toLocaleString('pt-BR', {minimumFractionDigits: 2})`
- Payback nunca deve exibir valor negativo — se lucro ≤ 0, exibir "Não calculável — revisar parâmetros"
- Capital de giro mínimo: R$ 15.000 (mesmo que o cálculo resulte em menos)
- Se a taxa de conversão × potencial de clientes × ticket médio resultar em receita de maturidade abaixo de R$ 8.000, exibir aviso: "Parâmetros muito conservadores — considere aumentar a taxa de conversão ou o ticket médio."
- O gráfico deve sempre mostrar os 12 meses completos mesmo que a maturidade seja atingida antes

---

## FIM DO PROMPT PRINCIPAL

---

## ════════════════════════════════════════
## CONTEXTO TÉCNICO — REFERÊNCIA DO DESENVOLVEDOR
## ════════════════════════════════════════

### Estrutura do Documento Markdown de Entrada (Roteiro)

O roteiro de simulação financeira está organizado em **10 fases**:

- Fase 0: Abertura emocional (dados de mercado nacional)
- Fase 1: Contexto de mercado (70M ton/ano, 5.5M edificações)
- Fase 2: Dados do território mapeado (campos `{{ }}`)
- Fase 3: Premissas do modelo (tabela de segmentos)
- Fase 4: DRE Simplificado (bloco principal)
- Fase 5: Payback e ROI
- Fase 6: Três cenários comparativos
- Fase 7: Diferencial vs. caçamba tradicional
- Fase 8: Suporte da franqueadora
- Fase 9: Objeções e respostas
- Fase 10: Fechamento e próximos passos

O dashboard deve ser capaz de **exportar** o roteiro com todos os campos `{{ }}` preenchidos com os valores calculados pela simulação ativa.

### Dados de Território por Cidade (exemplos para popular o simulador)

```javascript
const TERRITORIOS = {
  "sjc_centro": {
    cidade: "São José dos Campos",
    bairro: "Centro",
    score: 8.2,
    edificios: 3240,
    condominios: 847,
    construtoras: 62,
    potencialClientes: 1180
  },
  "campinas_jardins": {
    cidade: "Campinas",
    bairro: "Jardins / Nova Campinas",
    score: 9.1,
    edificios: 5820,
    condominios: 1640,
    construtoras: 118,
    potencialClientes: 2280
  },
  "natal_zona_sul": {
    cidade: "Natal",
    bairro: "Zona Sul",
    score: 6.8,
    edificios: 2100,
    condominios: 510,
    construtoras: 38,
    potencialClientes: 720
  },
  "sorocaba_centro": {
    cidade: "Sorocaba",
    bairro: "Centro",
    score: 7.5,
    edificios: 2800,
    condominios: 680,
    construtoras: 55,
    potencialClientes: 960
  }
};
```

### Lógica de Despesas por Modo de Operação

```javascript
const DESPESAS = {
  // FIXAS — iguais em todos os modos
  pontoAguzLuz: 1700.00,
  combustivelManutencaoSeguro: 1746.67,
  marketingRoyaltiesContab: 3130.00,
  parcelaVeiculo: 1139.51,

  // VARIÁVEIS — dependem do modo
  modos: {
    solo: {
      label: "Mão na Massa",
      badge: "Operação realizada pelo franqueado",
      colaboradores: 0,
      salarioEntregador: 0,
      salarioAjudante: 0,
      // Despesa fixa total:
      // 1700 + 1746.67 + 3130 + 1139.51 = 7716.18
    },
    um_colaborador: {
      label: "1 Colaborador",
      badge: "Funcionário Entregador",
      colaboradores: 1,
      salarioEntregador: 4700.00,  // com 80% de encargos
      salarioAjudante: 0,
      // Mês 1-4: 12.416,18
    },
    equipe_completa: {
      label: "Equipe Completa",
      badge: "Entregador + Ajudante",
      colaboradores: 2,
      salarioEntregador: 4700.00,
      salarioAjudante: 3600.00,   // entra no mês 5+
      // Mês 5+: 16.266,18
    }
  }
};

function calcularDespesaTotal(mes, modo) {
  const fixas = DESPESAS.pontoAguzLuz +
                DESPESAS.combustivelManutencaoSeguro +
                DESPESAS.marketingRoyaltiesContab +
                DESPESAS.parcelaVeiculo;

  if (modo === 'solo') return fixas; // R$ 7.716,18

  if (modo === 'um_colaborador') {
    return fixas + DESPESAS.modos.um_colaborador.salarioEntregador;
    // R$ 12.416,18
  }

  if (modo === 'equipe_completa') {
    const ajudante = mes >= 5 ? DESPESAS.modos.equipe_completa.salarioAjudante : 0;
    return fixas + DESPESAS.modos.equipe_completa.salarioEntregador + ajudante;
    // Mês 1-4: R$ 12.416,18 / Mês 5+: R$ 16.266,18
  }
}
```

### Lógica de Cálculo do Capital de Giro

```javascript
function calcularCapitalDeGiro(receitaRampa, modo) {
  let deficitAcumulado = 0;
  for (let mes = 0; mes < 12; mes++) {
    const despesa = calcularDespesaTotal(mes + 1, modo);
    const saldo = receitaRampa[mes] - despesa;
    if (saldo < 0) {
      deficitAcumulado += Math.abs(saldo);
    }
  }
  return Math.max(15000, deficitAcumulado * 1.6);
}
```

### Comparativo de ROI para o Painel

```javascript
const ROI_COMPARATIVO = [
  { label: "Poupança",        roi: 8.4,  cor: "#94a3b8" },
  { label: "CDI",             roi: 10.5, cor: "#64748b" },
  { label: "Imóvel (aluguel)",roi: 7.0,  cor: "#94a3b8" },
  { label: "Nalata",          roi: null, cor: "#22c55e" } // calculado dinamicamente
];

// ROI Nalata = (lucroLiquidoMensal * 12 / investimentoTotal) * 100
```

---

*Este prompt foi gerado com base no fluxo financeiro REV6 da Nalata Descarte Inteligente e no roteiro de simulação financeira para investidores. Versão para uso com agente Claude no Lovable.*
