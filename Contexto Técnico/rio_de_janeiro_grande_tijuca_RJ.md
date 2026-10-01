---
nalata_id: rio_de_janeiro_grande_tijuca_rj
nalata_label: Rio de Janeiro — Grande Tijuca — RJ
nalata_latasAlvoM12: 320
nalata_precoMinimo: 110
nalata_precoMaximo: 150
nalata_qtdObras: ~5.350 obras/ano
nalata_qtdEdif: ~2.025 torres residenciais
nalata_qtdCond: ~1.690 condomínios verticais
nalata_qtdConst: ~170 construtoras, incorporadoras, empreiteiras e empresas de reforma
nalata_qtdCltes: ~1.000 clientes recorrentes potenciais
nalata_score: 9.1
nalata_taxaConversao: 5
---

# NALATA DESCARTE INTELIGENTE
## Simulação Territorial e Financeira — Rio de Janeiro — Grande Tijuca — RJ

**Data de elaboração:** 01 de outubro de 2026  
**Território considerado:** Tijuca, Vila Isabel, Andaraí, Grajaú e Maracanã — município do Rio de Janeiro/RJ.

> **Classificação:** território premium de alta verticalização e forte recorrência de reformas  
> **Cenário financeiro de referência:** moderado  
> **Modelo territorial:** Equação Urbana Obrigatória — Template NaLata v2  
> **Modelo financeiro:** NaLata REV8

---

## 1. Delimitação do território

A simulação não considera a Zona Norte inteira do Rio de Janeiro como uma única franquia.

O recorte foi deliberadamente limitado ao núcleo denominado **Grande Tijuca**, formado por:

- Tijuca;
- Vila Isabel;
- Andaraí;
- Grajaú;
- Maracanã.

Essa delimitação busca preservar densidade de rota, produtividade operacional e concentração de demanda vertical.

O território é reconhecido pela própria estrutura administrativa municipal como um conjunto urbano integrado. A Gerência de Licenciamento e Fiscalização da Tijuca abrange Alto da Boa Vista, Andaraí, Grajaú, Maracanã, Praça da Bandeira, Tijuca e Vila Isabel. Para esta simulação, Alto da Boa Vista e Praça da Bandeira foram excluídos para manter foco no núcleo vertical de maior aderência ao modelo NaLata.

---

## 2. Contexto do território

A Grande Tijuca apresenta uma das combinações mais fortes já analisadas para o modelo NaLata:

- aproximadamente 299 mil habitantes no recorte operacional;
- verticalização muito elevada;
- cerca de 97,2 mil apartamentos estimados;
- grande estoque de edifícios consolidados e antigos;
- alta recorrência de reformas internas e manutenção predial;
- bairros contíguos e densos;
- forte presença de arquitetos, engenheiros, administradoras, síndicos e empresas de reforma;
- restrições naturais ao uso de caçambas em vias densas e áreas de difícil estacionamento;
- ambiente regulatório formal para coleta e transporte de RCC no município do Rio de Janeiro.

O principal risco não é falta de mercado. O desafio é controlar crescimento de frota, janelas de condomínio, estacionamento, congestionamento e produtividade da operação.

---

## 3. População e verticalização

Os dados do Censo 2022 utilizados para os cinco bairros são:

| Bairro | População 2022 | Moradores/domicílio | % apartamentos | Apartamentos estimados |
|---|---:|---:|---:|---:|
| Tijuca | 142.909 | ~2,3 | ~80% | ~49.700 |
| Vila Isabel | 65.790 | ~2,3 | ~69% | ~19.700 |
| Andaraí | 34.576 | ~2,3 | ~62% | ~9.300 |
| Grajaú | 32.816 | ~2,4 | ~71% | ~9.700 |
| Maracanã | 22.915 | ~2,3 | ~88% | ~8.800 |
| **Total** | **~299.000** | — | — | **~97.200** |

A população é compatível com publicações municipais e bases derivadas dos agregados do Censo 2022. A participação de apartamentos foi utilizada a partir de consolidações dos dados do IBGE por bairro.

A estimativa de apartamentos é calculada como:

```text
apartamentos = (população ÷ moradores_por_domicílio) × percentual_apartamentos
```

O valor de aproximadamente **97,2 mil apartamentos** deve ser entendido como estimativa técnica territorial, e não como cadastro fiscal exato de unidades.

---

## 4. Equação urbana obrigatória

### 4.1. Estimativa de torres

Para um território metropolitano altamente verticalizado, com ampla presença de edifícios médios e grandes, foi adotada média técnica de aproximadamente **48 apartamentos por torre/bloco**.

```text
torres_estimadas = 97.200 ÷ 48
torres_estimadas ≈ 2.025
```

Valor utilizado:

```text
nalata_qtdEdif = ~2.025 torres residenciais
```

### 4.2. Estimativa de condomínios

Foi adotada relação média de aproximadamente **1,20 torre por condomínio**, compatível com um território que combina muitos edifícios isolados e conjuntos com dois ou mais blocos.

```text
condominios_estimados = 2.025 ÷ 1,20
condominios_estimados ≈ 1.688
```

Valor arredondado:

```text
nalata_qtdCond = ~1.690 condomínios verticais
```

### 4.3. Reformas anuais

Foi aplicada taxa anual moderada de **5,5%** sobre o estoque vertical.

```text
reformas = 97.200 × 5,5%
reformas ≈ 5.346 reformas/ano
```

Valor operacional:

```text
nalata_qtdObras = ~5.350 obras/ano
```

A taxa é prudente para um território de edifícios consolidados, com alta presença de imóveis antigos e mercado ativo de compra, venda e reforma.

### 4.4. Empresas relevantes

Foram considerados aproximadamente **170 agentes empresariais potencialmente aderentes**, entre:

- construtoras;
- incorporadoras;
- empresas de reforma;
- empreiteiras;
- manutenção predial;
- escritórios de arquitetura com execução;
- empresas de engenharia e retrofit.

O número não representa todos os CNPJs de construção civil existentes na região. É um filtro comercial para empresas com probabilidade real de gerar demanda recorrente.

### 4.5. Clientes potenciais

A base de aproximadamente **1.000 clientes recorrentes potenciais** considera:

- condomínios prioritários;
- administradoras;
- síndicos profissionais;
- construtoras e incorporadoras;
- empresas de reforma;
- arquitetos;
- engenheiros;
- empreiteiros;
- manutenção predial;
- clientes comerciais recorrentes.

Não se assume demanda simultânea de todos os condomínios.

---

## 5. Validação da meta M12

A meta moderada foi definida em **320 latas ativas no M12**.

Com média de 2 latas por relação comercial:

```text
320 ÷ 2 = ~160 relações comerciais ativas equivalentes
```

Comparando com a base potencial:

```text
160 ÷ 1.000 = ~16% da base potencial
```

A exigência comercial é relevante, porém defensável para um território com aproximadamente 97 mil apartamentos e mais de 5 mil reformas verticais anuais estimadas.

### Corte mínimo interno

```text
corte_minimo = 200 latas no M12
meta_grande_tijuca = 320 latas no M12
margem_sobre_corte = 120 latas
```

**Grande Tijuca passa com ampla margem no critério territorial da NaLata.**

---

## 6. Score NaLata

### Score territorial: **9,1/10**

| Critério | Avaliação |
|---|---:|
| População útil no território | 8,8 |
| Densidade urbana | 9,7 |
| Apartamentos / verticalização | 9,8 |
| Condomínios | 9,5 |
| Recorrência de reformas | 9,6 |
| Mercado imobiliário | 8,8 |
| Construção / profissionais | 9,2 |
| Logística de rota | 8,5 |
| Ticket / capacidade de preço | 8,5 |
| Aderência ao diferencial NaLata | 9,7 |

O score é elevado pela combinação de densidade, estoque vertical, recorrência de reformas e dificuldade estrutural do uso de caçambas em parte importante do território.

---

## 7. Mercado imobiliário e perfil de demanda

Os cinco bairros apresentam estoque residencial consolidado e mercado imobiliário ativo.

Em setembro/outubro de 2026, levantamentos de anúncios indicavam aproximadamente:

- Tijuca: ~R$ 7.059/m²;
- Maracanã: ~R$ 6.013/m²;
- Grajaú: ~R$ 5.572/m²;
- Andaraí: ~R$ 5.135/m²;
- Vila Isabel: ~R$ 5.000/m².

Esses valores não são utilizados diretamente na projeção financeira da franquia. Servem apenas como indicador de liquidez, ticket imobiliário e capacidade de investimento em reformas.

A Tijuca também apareceu entre as regiões de maior procura do mercado imobiliário carioca em levantamentos recentes baseados em transações de ITBI.

Para a NaLata, o fator mais relevante não é lançamento de novos edifícios, mas o enorme estoque já construído, que sustenta demanda recorrente por:

- reformas de cozinha e banheiro;
- troca de revestimentos;
- demolições internas;
- modernização elétrica e hidráulica;
- retrofit de apartamentos;
- obras em áreas comuns;
- manutenção predial;
- reformas comerciais.

---

## 8. Ambiente RCC e conformidade

A COMLURB mantém regras específicas para cadastro e credenciamento de pessoas jurídicas que realizam coleta e remoção de **Resíduos da Construção Civil e Resíduos Sólidos Inertes — RCC/RSI**.

Em 2026 entrou em vigor a Portaria COMLURB nº 001/2026 para o cadastro de empresas destinadas à coleta e remoção de RCC/RSI, em conjunto com as normas técnicas municipais e referências ao sistema de Manifesto de Transporte de Resíduos do INEA.

Antes do início da operação devem ser validados:

- enquadramento da NaLata no credenciamento municipal;
- requisitos de veículos e equipamentos;
- MTR / NOP INEA aplicável;
- destinos licenciados;
- documentação por carga;
- regras para estacionamento e carga/descarga;
- restrições de circulação locais;
- horários permitidos por condomínio.

O ambiente regulatório reforça a necessidade de uma operação profissional e rastreável.

---

## 9. Perfil operacional recomendado

### Implantação

- base operacional preferencialmente central ao eixo Tijuca / Vila Isabel;
- 60 latas físicas iniciais;
- 1 veículo no início;
- operação com **1 funcionário**, utilizando o equipamento operacional atual da NaLata;
- franqueado focado em gestão, comercial e relacionamento B2B;
- expansão do estoque conforme ocupação efetiva.

### Microterritórios comerciais prioritários

A operação não deve tentar atender os cinco bairros de maneira indiferenciada desde o primeiro mês.

Prioridade sugerida:

1. Tijuca — Praça Saens Peña / Uruguai / Conde de Bonfim e eixos verticais;
2. Maracanã / São Francisco Xavier limítrofe ao núcleo;
3. Vila Isabel — 28 de Setembro / Teodoro da Silva;
4. Andaraí;
5. Grajaú.

O objetivo é construir densidade de rota antes de ampliar cobertura diária.

---

## 10. Premissas financeiras REV8

| Parâmetro | Valor |
|---|---:|
| Cenário | Moderado |
| Modo operacional | 01 Funcionário |
| Latas físicas iniciais | 60 |
| Meta M12 | **320 latas ativas** |
| Ciclos por mês | 1 |
| Preço mínimo B2B | **R$ 110** |
| Preço máximo avulso | **R$ 150** |
| Mix avulsa | 82% |
| Preço médio efetivo | **R$ 142,80** |
| Leads por semana | 20 |
| Conversão de aquisição REV8 | 30% |
| Latas por cliente | 2 |
| Conversão territorial | 5% |
| Ponto operacional | R$ 1.700/mês |
| Marketing digital | R$ 500/mês |
| Contabilidade | R$ 630/mês |
| Combustível de referência | R$ 0,60/km |
| Quilometragem de referência | 60 km/viagem |

A conversão territorial de 5% é uma premissa de mercado. A conversão de aquisição de 30% é um driver da engine REV8 para construir a rampa M1–M12.

---

## 11. Rampa de latas ativas

A engine REV8 gera a seguinte progressão geométrica:

```text
M1    36
M2    44
M3    54
M4    65
M5    80
M6    97
M7   119
M8   145
M9   176
M10  215
M11  262
M12  320
```

---

## 12. Resultado financeiro M1–M12

| Mês | Latas ativas | Latas novas | Módulos | Receita | Despesa total | Resultado de caixa |
|---:|---:|---:|---:|---:|---:|---:|
| M1 | 36 | 0 | 1 | R$ 5.141 | R$ 13.723,51 | -R$ 8.582,51 |
| M2 | 44 | 0 | 1 | R$ 6.283 | R$ 13.795,51 | -R$ 7.512,51 |
| M3 | 54 | 0 | 1 | R$ 7.711 | R$ 13.885,51 | -R$ 6.174,51 |
| M4 | 65 | 5 | 1 | R$ 9.282 | R$ 14.634,51 | -R$ 5.352,51 |
| M5 | 80 | 15 | 1 | R$ 11.424 | R$ 16.069,51 | -R$ 4.645,51 |
| M6 | 97 | 17 | 1 | R$ 13.852 | R$ 16.482,51 | -R$ 2.630,51 |
| M7 | 119 | 22 | 1 | R$ 16.993 | R$ 17.330,51 | -R$ 337,51 |
| **M8** | **145** | **26** | **1** | **R$ 20.706** | **R$ 18.084,51** | **R$ 2.621,49** |
| M9 | 176 | 31 | 1 | R$ 25.133 | R$ 20.153,51 | R$ 4.979,49 |
| M10 | 215 | 39 | 1 | R$ 30.702 | R$ 21.544,51 | R$ 9.157,49 |
| M11 | 262 | 47 | 1 | R$ 37.414 | R$ 23.007,51 | R$ 14.406,49 |
| **M12** | **320** | **58** | **2** | **R$ 45.696** | **R$ 26.099,02** | **R$ 19.596,98** |

---

## 13. Segundo módulo e segundo veículo

A REV8 possui gatilho operacional acima de 300 latas ativas.

No M12:

```text
latas_ativas = 320
limite_modulo = 300
```

Assim, a simulação ativa:

- 2º módulo operacional;
- CAPEX adicional de módulo: **R$ 35.000**;
- necessidade de 2º veículo;
- CAPEX adicional de veículo: **R$ 35.000**;
- parcela mensal adicional do veículo no M12: **R$ 1.139,51**.

O modelo não reduz a meta para evitar esse degrau. O custo é mantido porque faz parte da arquitetura atual da REV8.

---

## 14. Indicadores financeiros consolidados

| Indicador | Resultado |
|---|---:|
| Receita M12 | **R$ 45.696** |
| Resultado de caixa M12 | **R$ 19.596,98** |
| Compra de latas no M12 | 58 latas / R$ 7.540 |
| Lucro recorrente estabilizado após expansão das latas | **~R$ 27.136,98/mês** |
| Margem líquida pontual M12 | **~42,9%** |
| Break-even sustentável | **M8** |
| Capital de giro estimado | **~R$ 52.853** |
| Investimento base REV8 | R$ 98.370 |
| CAPEX módulo adicional | R$ 35.000 |
| CAPEX 2º veículo | R$ 35.000 |
| Investimento total estimado | **~R$ 221.223** |
| Payback corrigido | **~20 meses** |
| ROI acumulado M1–M12 | **~7,0%** |
| ROI até M24 — métrica REV8 | **~113,3%** |
| Rentabilidade pontual M12 | **~8,9%** |
| ROI anualizado na maturidade — métrica REV8 | **~106,3%** |

### Leitura do M12

O resultado de caixa do M12 ainda contém a compra das 58 latas físicas necessárias para levar o estoque de 262 para 320 unidades.

```text
resultado_caixa_M12 = R$ 19.596,98
CAPEX_latas_M12 = R$ 7.540
lucro_recorrente_estabilizado = R$ 27.136,98/mês
```

O custo das novas latas não é repetido mensalmente após a estabilização no patamar de 320.

---

## 15. Capital de giro

O break-even sustentável ocorre no M8.

A REV8 calcula o capital de giro como 1,5 vez o maior déficit acumulado real antes do break-even sustentável, respeitando piso mínimo de R$ 15 mil.

O resultado para Grande Tijuca é:

```text
capital_de_giro ≈ R$ 52.853
```

O investimento total calculado pela engine é:

```text
investimento_base           R$ 98.370
capital_de_giro             R$ 52.853
módulo_adicional            R$ 35.000
segundo_veículo             R$ 35.000
--------------------------------------
investimento_total         ~R$ 221.223
```

---

## 16. Estratégia comercial recomendada

A implantação deve ser fortemente B2B.

Canais prioritários:

1. administradoras de condomínios;
2. síndicos profissionais;
3. arquitetos e designers de interiores;
4. engenheiros civis;
5. empresas de reforma de apartamentos;
6. empreiteiros;
7. manutenção predial;
8. Google Ads com intenção local;
9. Meta Ads por microterritório;
10. relacionamento com lojas de acabamento, marcenarias e parceiros de obra.

### Mensagem de valor

O território é particularmente aderente aos diferenciais da NaLata:

- retirada de RCC por elevador;
- menor impacto em áreas comuns;
- ausência de caçamba estacionada permanentemente na rua;
- coleta programada;
- solução adequada a obras pequenas e médias em apartamentos;
- rastreabilidade e conformidade de destinação.

---

## 17. Pontos de atenção

Apesar do fit muito alto, a operação exige disciplina logística.

Principais riscos:

- trânsito intenso em horários de pico;
- dificuldade de estacionamento;
- janelas restritas de carga e descarga;
- regras específicas de elevadores em condomínios;
- prédios antigos com elevadores pequenos;
- necessidade de concentração de rotas;
- custo de destinação deve ser validado localmente;
- credenciamento COMLURB/INEA deve ser confirmado antes da implantação;
- expansão para além da Grande Tijuca não deve ocorrer antes de estabilizar a densidade operacional.

---

## 18. Comparação com Zona Sul do Rio

A simulação já existente da Zona Sul considera aproximadamente 239,3 mil apartamentos e alvo de 600 latas no M12.

A Grande Tijuca, com aproximadamente 97,2 mil apartamentos estimados, utiliza alvo de 320 latas.

A proporção é coerente porque:

- Grande Tijuca possui estoque vertical muito forte;
- ticket médio é inferior ao núcleo premium da Zona Sul;
- densidade de apartamentos é elevada;
- há grande estoque de prédios consolidados;
- a meta de 320 representa apenas cerca de 16% das relações comerciais potenciais estimadas quando utilizadas 2 latas por cliente.

---

## 19. Decisão territorial

**RIO DE JANEIRO — GRANDE TIJUCA — RJ: APROVADO.**

### Premissas finais

```text
nalata_latasAlvoM12: 320
nalata_score: 9.1
nalata_qtdObras: ~5.350 obras/ano
nalata_qtdEdif: ~2.025 torres residenciais
nalata_qtdCond: ~1.690 condomínios verticais
nalata_qtdConst: ~170 empresas relevantes
nalata_qtdCltes: ~1.000 clientes potenciais
nalata_precoMinimo: 110
nalata_precoMaximo: 150
nalata_taxaConversao: 5
```

A Grande Tijuca deve ser tratada como uma unidade territorial independente. A expansão futura para Grande Méier ou outros eixos da Zona Norte deve ser objeto de análises territoriais próprias.

---

## 20. Fontes utilizadas

1. **Prefeitura do Rio de Janeiro — dados populacionais por bairro / Censo 2022 e vigilância municipal**  
   https://prefeitura.rio/

2. **Secretaria Municipal de Desenvolvimento Urbano e Licenciamento — GLF Tijuca e bairros de abrangência**  
   https://desenvolvimentourbano.prefeitura.rio/licenciamento-urbanistico/canais-de-atendimento-licenciamento-urbanistico/

3. **IBGE — Censo Demográfico 2022 — agregados por bairro**  
   https://www.ibge.gov.br/

4. **A Corrida dos Bairros — consolidação de população, perfil de domicílios e mercado imobiliário com base no Censo 2022**  
   https://acorridadosbairros.com.br/

5. **COMLURB — empresas credenciadas, RCC/RSI e normas de coleta e remoção**  
   https://comlurb.prefeitura.rio/consulta/empresas-credenciadas/

6. **COMLURB — legislação vigente**  
   https://comlurb.prefeitura.rio/info/legislacao/

7. **Portaria COMLURB nº 001/2026 — RCC/RSI**  
   https://comlurb.prefeitura.rio/wp-content/uploads/sites/74/2026/02/2602-PORTARIA-N-001-20260219-RCC_RSI.pdf

8. **Secovi Rio / mercado imobiliário carioca — referências de transações e liquidez**  
   https://www.secovirio.com.br/

---

## 21. Nota metodológica

Os números de apartamentos, torres, condomínios, obras, empresas e clientes potenciais são estimativas territoriais moderadas construídas a partir dos dados disponíveis e das regras do Template Territorial NaLata v2.

Os valores financeiros foram calculados com a engine REV8 vigente no repositório em 01/10/2026.

As projeções não representam garantia de faturamento ou retorno. O resultado real dependerá de execução comercial, preço praticado, taxa de ocupação, custo de destinação, trânsito, densidade de rota, disponibilidade de mão de obra, regras condominiais e conformidade regulatória.

---

*Documento desenvolvido para uso interno pela equipe NaLata Descarte Inteligente.*  
*Versão: 1.0 — Grande Tijuca — RJ*  
*Data de elaboração: 01/10/2026*  
*Modelo compatível com Template Territorial NaLata v2 e Simulador Financeiro REV8.*
