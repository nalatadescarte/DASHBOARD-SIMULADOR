# Arquitetura do Sistema — Nalata Dashboard REV7

> Painel de simulação financeira para franquia Nalata Descarte Inteligente.
> Stack: React 18 + TypeScript 5 + Vite 5 + Tailwind CSS 3 + Recharts 2 + Radix UI

---

## Visão Geral

```
┌─────────────────────────────────────────────────────────────────┐
│                        Dashboard.tsx                            │
│   Estado global: SimParams + TerritoryData + SimResult          │
│                                                                 │
│  ┌───────────────┐  ┌──────────────────────────────────────┐   │
│  │MarketContext  │  │         NalataModel.tsx               │   │
│  │Panel.tsx      │  │  Controles SimParams → onChange()     │   │
│  └───────────────┘  │  Exibe KPIs, DRE, tabela cenários    │   │
│                     └──────────────────────────────────────┘   │
│  ┌───────────────┐  ┌──────────────────────────────────────┐   │
│  │TerritoryPanel │  │      MaturationRampChart.tsx          │   │
│  │.tsx           │  │  Bar receita/despesa M1–M12           │   │
│  └───────────────┘  └──────────────────────────────────────┘   │
│                                                                 │
│  ┌───────────────┐  ┌──────────────────────────────────────┐   │
│  │BreakEvenPanel │  │       CompetitiveTable.tsx            │   │
│  │.tsx           │  │  Nalata vs Caçamba (7 critérios)      │   │
│  └───────────────┘  └──────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
         ┌────────────────────────────────────┐
         │       src/lib/nalata-model.ts       │
         │   Núcleo matemático da simulação    │
         └────────────────────────────────────┘
                              │
                              ▼
         ┌────────────────────────────────────┐
         │       src/data/territorios.ts       │
         │   Presets de 5 territórios SP       │
         └────────────────────────────────────┘
```

---

## Estrutura de Pastas

```
APP NALATA DASHBOARD/
├── src/
│   ├── components/
│   │   ├── ui/                     # 40+ componentes Radix/shadcn
│   │   ├── charts/                 # Gráficos auxiliares (Recharts)
│   │   │   ├── MaturationRampChart.tsx
│   │   │   ├── BreakEvenChart.tsx
│   │   │   ├── CostsChart.tsx
│   │   │   ├── PaybackChart.tsx
│   │   │   ├── ProfitabilityChart.tsx
│   │   │   └── RevenueChart.tsx
│   │   ├── Dashboard.tsx           # Container principal
│   │   ├── NalataModel.tsx         # Painel de simulação (maior componente)
│   │   ├── BreakEvenPanel.tsx      # Painel break-even e capital de giro
│   │   ├── TerritoryPanel.tsx      # Dados e score do território
│   │   ├── MarketContextPanel.tsx  # Contexto de mercado nacional
│   │   └── CompetitiveTable.tsx    # Diferenciais Nalata vs Caçamba
│   ├── lib/
│   │   ├── nalata-model.ts         # Núcleo: toda lógica financeira
│   │   ├── projection-utils.ts     # Utilitários de projeção
│   │   └── utils.ts                # cn() para classnames
│   ├── data/
│   │   ├── territorios.ts          # Presets de territórios (TypeScript)
│   │   └── territorios-auto.json   # Gerado pelo plugin Vite (front-matter .md)
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/
│   └── apresentacao/               # HTML + logos para export PDF
│       ├── apresentacao_nalata.html
│       ├── logo_completo.png
│       ├── logo_icone.png
│       └── *.png (gráficos estáticos)
├── Contexto Técnico/               # Markdown por território (front-matter)
│   ├── campinas_SP.md
│   ├── ribeirao_preto_SP.md
│   ├── sao_jose_dos_campos_SP.md
│   ├── sorocaba_SP.md
│   ├── sao_paulo_zona_leste_SP.md
│   └── brasilia_DF.md
├── APRESENTAÇÃO SIMULAÇÕES/        # Assets originais (logos, gráficos)
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Núcleo Matemático — `src/lib/nalata-model.ts`

### Fluxo de Cálculo

```
SimParams
    │
    ├─► calcularLatasM1()           M1 base via learning phase ads
    │       └─ MULT_SEMANAS [0.50, 0.60, 0.80, 1.00]
    │          leads × mult × conv × latas/cliente → soma 4 semanas
    │
    ├─► calcularPontosDosCenario()  M1 e M12 específicos por cenário
    │       └─ FATORES_CENARIO[cenario].m1 × latasM1Base
    │          FATORES_CENARIO[cenario].m12 × latasAlvoM12
    │
    ├─► calcularDelta()             Busca binária (60 iter, high=0.30)
    │       └─ Encontra delta tal que simularRampaInterna()[11] ≈ alvoM12
    │
    ├─► simularRampaInterna()       Rampa acelerada M1→M12
    │       └─ taxa(m) = TAXA_BASE_ADS + acumulado
    │          Fase 1 (M2-M4):  taxa += delta × 0.20
    │          Fase 2 (M5-M12): taxa += delta × 0.80 / 8
    │          Sem cap — cresce além do alvo se atingido antes do M12
    │
    └─► calcularSimulacaoCompleta() → SimResult
            Loop M1–M12:
              latasFisicas = ceil(latasAtivas / ciclosPorMes)
              latasNovas   = max(0, latasFisicas - estoqueAcumulado)
              viagens      = latasAtivas / 8
              combustivel  = precoCombustivel × kmRodado × viagens
              manutencao   = 0.35 × kmRodado × viagens
              taxaDest     = 9.00 × latasAtivas
              receita      = latasFisicas × ciclosPorMes × precoMedio
              despesa      = fixoBase + funcionarios + custoLatas
                           + combustivel + manutencao + taxaDest
                           + parcelaExtraVeiculo
              lucro        = receita − despesa
```

### Tipos

```typescript
type Scenario      = "conservador" | "moderado" | "otimista"
type OperationMode = "solo" | "um_funcionario" | "dois_funcionarios"
```

### SimParams — Entradas do Simulador

| Campo | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `mode` | OperationMode | `um_funcionario` | Modo operacional |
| `scenario` | Scenario | `moderado` | Cenário de mercado |
| `latasAlvoM12` | number | 280 | Meta de latas ativas no M12 (moderado) |
| `ciclosPorMes` | 1\|2\|3 | 1 | Ciclos de uso por lata física/mês |
| `precoMinimo` | number | 80 | Preço B2B por ciclo (R$) |
| `precoMaximo` | number | 116 | Preço B2C por ciclo (R$) |
| `mixAvulsa` | number | 82 | % avulsas no mix (0=100% pacote) |
| `pontoOperacional` | number | 1.700 | Aluguel ponto (R$/mês) |
| `mktDigitalAds` | number | 500 | Ads digitais (R$/mês) |
| `contabilidade` | number | 630 | Contabilidade/sistemas (R$/mês) |
| `precoCombustivel` | number | 0,60 | Custo combustível por km (R$/km) |
| `kmRodado` | number | 60 | Km por rota de coleta (batch 8 latas) |
| `leadsPorSemana` | number | 20 | Leads semanais com ads a plena capacidade |
| `taxaConversao` | number | 30 | % leads que fecham contrato |
| `latasPorCliente` | number | 2 | Média de latas por cliente |

### SimResult — Saídas do Simulador

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `curva` | number[12] | Receita bruta por mês |
| `despesas` | number[12] | Despesa total por mês |
| `lucros` | number[12] | Lucro/prejuízo por mês |
| `meses` | SimMesResult[12] | Detalhe completo por mês |
| `latasAtivasPorMes` | number[12] | Rampa de latas ativas |
| `latasFisicasPorMes` | number[12] | Frota física necessária |
| `precoMedioEfetivo` | number | Preço ponderado pelo mix B2B/B2C |
| `receitaMaturacao` | number | Receita do M12 |
| `lucroMaturacao` | number | Lucro do M12 |
| `margemLiquida` | number | % margem no M12 |
| `capitalDeGiro` | number | max(15k, 1,5× déficits até break-even) |
| `investimentoTotal` | number | R$98.370 + módulos + veículo + giro |
| `payback` | number\|null | ceil(investimento / lucroM12) em meses |
| `roiAnual` | number | % (lucroM12 × 12) / investimento |
| `roi12` | number\|null | % retorno ao final de 12 meses |
| `roi24` | number\|null | % retorno ao final de 24 meses |
| `breakEvenMes` | number\|null | Primeiro mês com lucro > 0 |
| `latasM1` | number | Latas no M1 do cenário selecionado |
| `taxasCrescimentoPorMes` | number[12] | Taxa progressiva M1→M12 |
| `warnings` | string[] | Alertas de degrau (módulo/veículo) |

### SimMesResult — Detalhe por Mês

| Campo | Descrição |
|-------|-----------|
| `latasAtivas` | Locações ativas no mês |
| `latasFisicas` | Tambores físicos em frota |
| `latasNovas` | Tambores adquiridos no mês |
| `numFuncionarios` | Funcionários ativos (escala por faixas) |
| `combustivel` | `precoComb × km × (latas/8)` |
| `manutencao` | `0,35 × km × (latas/8)` |
| `taxaDestinacao` | `R$9,00 × latasAtivas` |
| `parcelaExtraVeiculo` | R$1.139,51 se latas > 300 |
| `despesaTotal` | Soma de todos os custos |
| `lucroMensal` | receita − despesa |

---

## Cenários

```
                    Fator M1    Fator M12
Conservador:         × 0,85      × 0,70
Moderado (base):     × 1,00      × 1,00
Otimista:            × 1,30      × 1,25
```

**Exemplo com M1 base = 36 latas e M12 alvo = 280 latas:**

| Cenário | M1 | M12 | Delta médio | Taxa média geom. |
|---------|-----|-----|-------------|-----------------|
| Conservador | 31 | 196 | +15 latas/mês | ~17,6% |
| Moderado | 36 | 280 | +22 latas/mês | ~20,7% |
| Otimista | 47 | 350 | +28 latas/mês | ~19,8% |

> A taxa geométrica do otimista (~19,8%) ser menor que a do moderado (~20,7%) é matematicamente correto: o otimista começa de um patamar mais alto (47 vs 36), portanto precisa de uma taxa menor para atingir o M12.

---

## Modos Operacionais — Escala de Funcionários

| Faixa de latas | Mão na Massa | 01 Funcionário | 02 Funcionários |
|----------------|-------------|----------------|-----------------|
| 0 – 99 | 0 func | 1 func | 2 func |
| 100 – 300 | 1 func | 2 func | 2 func |
| > 300 | 2 func + 2° veículo | 3 func + 2° veículo | 3 func + 2° veículo |

**2° veículo:** CAPEX R$35.000 + parcela R$1.139,51/mês (ativado acima de 300 latas ativas).

---

## Estrutura de Custos

### Despesas Fixas (todos os meses)

| Item | Valor |
|------|-------|
| Aluguel do ponto | R$ 1.700 (configurável) |
| Seguro veículo e operação | R$ 450 |
| MKT Digital Ads | R$ 500 (configurável) |
| Taxa Marketing Nacional | R$ 500 |
| Royalties Nalata | R$ 1.500 |
| Contabilidade / ADM | R$ 630 (configurável) |
| Parcela veículo (1°) | R$ 1.139,51 |
| **Total fixo base** | **R$ 6.419,51** |

### Custos Variáveis (escalam com latas ativas)

| Item | Fórmula |
|------|---------|
| Combustível e logística | `precoComb × kmRota × (latas / 8)` |
| Manutenção preventiva | `0,35 × kmRota × (latas / 8)` |
| Taxa destinação (ATT/Aterro) | `R$ 9,00 × latasAtivas` |
| Funcionários | `N × R$ 4.700` (N por faixa e modo) |
| Aquisição de tambores | `latasNovas × R$ 230` |
| Parcela veículo (2°) | R$ 1.139,51 se latas > 300 |

### Receita

```
receita(m) = latasFisicas(m) × ciclosPorMes × precoMedioEfetivo

precoMedioEfetivo = precoMinimo + (mixAvulsa / 100) × (precoMaximo − precoMinimo)
```

---

## M1 — Learning Phase dos Ads

Modela os primeiros 4 semanas de campanha com eficiência crescente:

```
Multiplicadores semanais: [50%, 60%, 80%, 100%]

latasM1 = Σ(semanas 1-4) round(leads × mult × conv/100) × latasCliente

Exemplo padrão (20 leads, 30% conv, 2 latas):
  Sem 1: round(20 × 0,50 × 0,30) × 2 =  3 × 2 =  6 latas
  Sem 2: round(20 × 0,60 × 0,30) × 2 =  4 × 2 =  8 latas
  Sem 3: round(20 × 0,80 × 0,30) × 2 =  5 × 2 = 10 latas
  Sem 4: round(20 × 1,00 × 0,30) × 2 =  6 × 2 = 12 latas
                                              Total: 36 latas
```

---

## Investimento e Payback

```
investimentoTotal = 98.370 (franquia base)
                  + capitalDeGiro
                  + (modulosAdicionais × 35.000)
                  + capexVeiculoExtra (se latas > 300)

capitalDeGiro = max(15.000, 1,5 × déficits acumulados até break-even)

payback = ceil(investimentoTotal / lucroMaturacao)   [meses]
```

---

## Exportações

### PDF — Apresentação Executiva
- Busca `/apresentacao/apresentacao_nalata.html`
- Substitui tokens `{{FATURAMENTO_M12_NUM}}`, `{{LUCRO_M12_NUM}}`, `{{BREAK_EVEN}}`, etc.
- Corrige caminhos de imagem para URLs absolutas
- Abre blob URL e dispara `window.print()`

### Planilha (.xls — SpreadsheetML)
- Sem dependências externas — XML puro com MIME `application/vnd.ms-excel`
- Seções: Receitas · Despesas Fixas · Custos Variáveis (por mês M1–M12) · Resultado · Dados Operacionais
- Células coloridas por categoria (verde receita, cinza fixo, roxo variável, azul resultado)

### Roteiro (.md)
- Markdown com todos os parâmetros e KPIs da simulação atual

---

## Territórios

Presets em `src/data/territorios.ts` (5 cidades SP):

| Território | Latas M12 | Preço mín. | Preço máx. | Score |
|------------|-----------|------------|------------|-------|
| São José dos Campos | 280 | R$ 80 | R$ 116 | 8,5 |
| Campinas | 420 | R$ 85 | R$ 125 | 9,2 |
| Ribeirão Preto | 350 | R$ 78 | R$ 115 | 7,8 |
| Sorocaba | 200 | R$ 70 | R$ 105 | 7,5 |
| SP Zona Leste | 500 | R$ 90 | R$ 130 | 9,0+ |

**TerritoryData** contém: `cidade`, `qtdObras`, `qtdEdif`, `qtdCond`, `qtdConst`, `qtdCltes`, `latasAlvo`, `score`, `taxaConversao`.

Territórios extras em `Contexto Técnico/*.md` são parseados pelo plugin Vite `nalataTerritoriosPlugin()` e gerados em `territorios-auto.json` via front-matter YAML.

---

## Plugins Vite Customizados

```typescript
// vite.config.ts

nalataTerritoriosPlugin()
// buildStart + configureServer (watch):
//   Lê Contexto Técnico/*.md
//   Extrai front-matter YAML
//   Gera src/data/territorios-auto.json

copiarApresentacaoPlugin()
// buildStart + configureServer (watch):
//   Copia APRESENTAÇÃO SIMULAÇÕES/*.png → public/apresentacao/
//   Renomeia para nomes canônicos (logo_completo.png, etc.)
```

---

## Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| react | 18.3.1 | UI |
| react-router-dom | 6.30.1 | Roteamento |
| @tanstack/react-query | 5.83.0 | Cache de queries |
| recharts | 2.15.4 | Gráficos |
| @radix-ui/* | 1.1–1.3 | Primitivos UI (25 pacotes) |
| tailwindcss | 3.4.17 | Estilização |
| lucide-react | 0.462.0 | Ícones |
| react-hook-form | 7.61.1 | Formulários |
| zod | 3.25.76 | Validação |
| date-fns | 3.6.0 | Datas |
| sonner | 1.7.4 | Toasts |
| vite | 5.4.19 | Build/dev server (porta 8080) |
| typescript | 5.8.3 | Tipagem |

---

## Fluxo de Dados

```
Usuário interage com NalataModel.tsx
    │
    ▼
onChange(SimParams) → Dashboard.tsx
    │
    ▼
useMemo → calcularSimulacaoCompleta(SimParams) → SimResult
    │
    ├─► NalataModel.tsx        (KPIs, DRE, tabela comparativa)
    ├─► MaturationRampChart.tsx (gráfico M1–M12)
    └─► BreakEvenPanel.tsx     (break-even, provisão)
```

---

*Gerado automaticamente — Nalata Dashboard REV7*
