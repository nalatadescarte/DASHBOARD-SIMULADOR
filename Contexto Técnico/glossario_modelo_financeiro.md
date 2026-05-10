# Glossário do Modelo Financeiro — Nalata REV6
## Explicação de cada campo, dado fonte e fórmula

---

## ⚠️ Aviso Importante — Como o Modelo Funciona

O modelo REV6 **não é linear**. Ele parte de um ponto âncora (a receita base validada operacionalmente) e escala proporcionalmente conforme os parâmetros mudam.

**Ponto âncora (REV6):** 60 latas · R$460/mês · 8% conversão · markup 1.70 → **R$27.600/mês no Mês 12**

Cada parâmetro age como **multiplicador relativo** ao baseline, não como valor absoluto isolado.

---

## PARÂMETROS DE ENTRADA (Sliders)

---

### 🔵 Ticket Médio por Coleta/Mês
**Default:** R$ 460,00 | **Range:** R$200 – R$800

**O que é:**
O ticket médio é a **receita mensal gerada por cada contrato ativo** — ou seja, quanto o franqueado fatura mensalmente por cada tambor que está em campo com cliente.

**Não é:**
- ❌ O preço de uma coleta avulsa
- ❌ O valor de locação diária do tambor
- ❌ O preço cobrado por kg de entulho coletado

**É:**
- ✅ A mensalidade média de um contrato de locação + coleta recorrente
- ✅ O valor médio ponderado entre contratos de condomínio (ex: R$550/mês) e contratos de reforma (ex: R$320/evento)

**Exemplo prático:**
> Condomínio paga R$550/mês pelo serviço recorrente.
> Reforma paga R$350 por ciclo (um tambor coletado e devolvido).
> Média ponderada = R$460/mês por contrato.

**Efeito no modelo:**
> Aumentar o ticket de R$460 para R$520 (+13%) → receita projetada aumenta ~13%.

---

### 🟢 Taxa de Conversão
**Default:** 8% | **Range:** 3% – 25%

**O que é:**
A porcentagem do **potencial de clientes do território** que se torna cliente ativo no mês de maturidade (M12).

**Dado fonte:**
Combinação do Score do Território + experiência operacional das unidades Nalata.
- Territórios com Score 8+: espera-se 7%–10%
- Territórios com Score 6–7: espera-se 5%–8%

**Como entra na fórmula:**
```
receita_base = latas × ticket × (conversao / 100) × markup
```

**Exemplo:**
> Taxa 8% com 60 latas = 60 × 0.08 = 4,8 "unidades equivalentes ativas"
> Isso não é uma leitura direta de clientes — é um fator proporcional ao baseline.

**⚠️ Atenção:**
> A taxa de conversão no modelo funciona como **fator de escala** em relação ao baseline de 8%.
> Uma taxa de 16% não significa 16% dos clientes do território — significa que a operação está convertendo **2× mais** que o baseline.

---

### 🟡 Markup de Precificação
**Default:** 1.70× | **Range:** 1.20 – 2.50

**O que é:**
O multiplicador que transforma o custo operacional em preço de venda. Representa a **margem bruta embutida no preço**.

**Relação markup × margem:**
| Markup | Margem Bruta Aproximada |
|--------|------------------------|
| 1.20×  | ~17%                   |
| 1.50×  | ~33%                   |
| 1.70×  | **~41%** (baseline)    |
| 2.00×  | ~50%                   |
| 2.50×  | ~60%                   |

**Fórmula de margem:**
```
margem = (1 - 1/markup) × 100
margem = (1 - 1/1.70) × 100 = 41,2%
```

**Efeito no modelo:**
Aumentar o markup eleva a receita projetada proporcionalmente ao baseline.
> Markup 1.70 → 2.00 (+18%) = receita aumenta ~18%.

---

### 🔴 Quantidade de Latas
**Default:** 60 | **Range:** 20 – 120

**O que é:**
O número de tambores de 200L que a unidade terá disponíveis para operação no território.

**Dado fonte:**
Definido no kit inicial da franquia:
- Kit padrão Nalata: **60 latas** (R$13.800 em equipamentos)
- Cada lata adicional: ~R$230 unitária

**Como entra na fórmula:**
Multiplica linearmente a receita. 120 latas = 2× a receita de 60 latas (ceteris paribus).

**Lógica operacional:**
> Com 60 latas e ciclo médio de 3 dias por lata, é possível servir até 20 clientes simultâneos em rotação contínua.

---

### 🗺️ Score do Território (Índice de Oportunidade Nalata™)
**Default:** 8.2 (baseline) | **Range:** 0 – 10

**O que é:**
Um índice composto que representa a **densidade e qualidade do mercado** no território selecionado. Influencia diretamente a receita projetada.

**Componentes do score (estimados):**
- Quantidade de condomínios verticais
- Volume de obras e reformas no território
- Presença de construtoras ativas
- Aderência regulatória municipal (risco de multa por descarte irregular)

**Fórmula de impacto:**
```
fator_score = score / 8.2
```

**Exemplos:**
| Score | Fator | Efeito na receita |
|-------|-------|-------------------|
| 6.0   | 0.73  | -27% vs baseline  |
| 8.2   | 1.00  | = baseline        |
| 9.2   | 1.12  | +12% vs baseline  |
| 9.8   | 1.20  | +20% vs baseline  |

---

## FÓRMULA COMPLETA DE RECEITA DE MATURAÇÃO

```
receita_maturacao =
  latas
  × ticket
  × (conversao / 100)
  × markup
  × fator_normalizacao      ← ancora a curva no baseline R$27.600
  × multiplicador_cenario   ← Conservador: 0.65 / Moderado: 1.0 / Otimista: 1.35
  × (score / 8.2)           ← densidade do território
```

**Fator de normalização:**
```
fator_norm = 27.600 / (60 × 460 × 0.08 × 1.70) ≈ 7.35
```

> O fator_norm garante que com os parâmetros baseline, a receita no M12 seja exatamente R$27.600 — o valor validado operacionalmente pela Nalata.

---

## CURVA DE MATURAÇÃO M1–M12

A curva mensal não é calculada mês a mês — ela é **gerada a partir do ponto de maturidade (M12)** e interpolada proporcionalmente:

**Curva base REV6** (60 latas, ticket R$460, markup 1.70, score 8.2, cenário moderado):
```
M1:  R$  6.000   M7:  R$ 17.000
M2:  R$  7.500   M8:  R$ 18.000
M3:  R$  9.000   M9:  R$ 18.000  ← zona de break-even
M4:  R$ 11.000   M10: R$ 22.000
M5:  R$ 13.000   M11: R$ 25.000
M6:  R$ 15.000   M12: R$ 27.600  ← maturidade plena
```

**Para outros cenários:**
```
receita_mes_N = curva_base[N] × (receita_maturacao_calculada / 27.600)
```

---

## DESPESAS FIXAS POR MODO DE OPERAÇÃO

| Item | Valor |
|------|-------|
| Ponto Comercial / Água / Luz | R$ 1.700,00 |
| Combustível / Manutenção / Seguro | R$ 1.746,67 |
| Marketing / Royalties / Contabilidade | R$ 3.130,00 |
| Parcela Veículo (financiamento) | R$ 1.139,51 |
| **Total Fixo Base** | **R$ 7.716,18** |

| Modo | Despesa Total M1–M4 | Despesa Total M5+ |
|------|--------------------|--------------------|
| Mão na Massa (solo) | R$ 7.716,18 | R$ 7.716,18 |
| 1 Colaborador | R$ 12.416,18 | R$ 12.416,18 |
| Equipe Completa | R$ 12.416,18 | R$ 16.266,18 |

> Salário Entregador: R$4.700/mês (com 80% encargos)
> Salário Ajudante: R$3.600/mês (entra no M5 no modo Equipe Completa)

---

## KPIs CALCULADOS

### Payback
```
payback (meses) = investimento_total / lucro_liquido_mensal_M12
investimento_total = R$98.370 (fixo) + capital_de_giro (variável)
```

### Capital de Giro
```
capital_giro = MAX(R$15.000, 1.6 × Σ(déficits mensais M1–M12))
déficit_mensal = MAX(0, despesa_mes - receita_mes)
```

### Rentabilidade/mês
```
rentabilidade_mes (%) = (lucro_liquido_M12 / investimento_total) × 100
```

### ROI Anual
```
roi_anual (%) = (lucro_liquido_M12 × 12 / investimento_total) × 100
```

### Margem Líquida
```
margem_liquida (%) = (lucro_liquido_M12 / receita_bruta_M12) × 100
```

---

## CENÁRIOS

| Cenário | Multiplicador | Interpretação |
|---------|--------------|---------------|
| Conservador | 0.65 | Crescimento lento, mercado difícil, baixa adesão |
| Moderado | 1.00 | Operação dentro do esperado pelo modelo REV6 |
| Otimista | 1.35 | Alta adesão, território premium, franqueado comercialmente ativo |

> **As despesas fixas NÃO variam por cenário** — apenas a receita é afetada.

---

## INVESTIMENTO INICIAL (REV6)

| Item | Valor |
|------|-------|
| Kit inicial (60 latas + equipamentos) | R$ 27.570 |
| Veículo (entrada R$35k + plotagem + instalação guincho) | R$ 67.500 |
| Infra, marketing inaugural, uniformes, abertura empresa | R$ 7.650 |
| **Desembolso Fixo Total** | **R$ 98.370** |
| Capital de Giro (calculado dinamicamente) | R$ ~51.407 |
| **Investimento Total Estimado** | **~R$ 149.777** |

---

*Documento técnico interno — Nalata Descarte Inteligente*
*Modelo: REV6 · Atualizado: 2026*
