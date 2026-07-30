---
nalata_id: sorocaba_sp
nalata_label: Sorocaba — SP
nalata_latasAlvoM12: 280
nalata_precoMinimo: 105
nalata_precoMaximo: 130
nalata_qtdObras: ~2.750 obras/reformas por ano
nalata_qtdEdif: ~1.500 torres residenciais
nalata_qtdCond: ~1.150 condomínios verticais estimados
nalata_qtdConst: ~120 construtoras, incorporadoras e empreiteiras relevantes
nalata_qtdCltes: ~620 clientes recorrentes potenciais
nalata_score: 7.5
nalata_taxaConversao: 6
---

# Simulação Financeira — Sorocaba/SP

## Síntese executiva

**Sorocaba é um território viável para uma unidade NaLata operada inicialmente com um colaborador e participação direta do franqueado.** A cidade reúne população elevada, crescimento imobiliário, verticalização relevante e uma gestão de RCC estruturada. O cenário recomendado é moderado: crescimento comercial progressivo, conversão de 6% e controle rigoroso de custos até a maturação.

O ponto central é comercial: a operação deve priorizar condomínios verticalizados, reformas em apartamentos, administradoras, arquitetos, engenheiros e empreiteiros — e não disputar o descarte de grande volume típico de caçamba.

| Indicador do cenário recomendado | Valor |
|---|---:|
| Receita estimada no mês 12 | **R$ 18.932,93** |
| Despesa mensal (1 colaborador) | R$ 12.416,18 |
| Resultado operacional no mês 12 | **R$ 6.516,75** |
| Ponto de equilíbrio mensal | **mês 10** |
| Capital de giro calculado | R$ 53.122,26 |
| Investimento total estimado | **R$ 151.492,26** |
| Payback em regime de maturidade* | **~23,2 meses** |

\*Indicador calculado pela fórmula REV6: investimento total ÷ lucro líquido mensal do mês 12. Não equivale ao caixa acumulado no primeiro ano.

## Contexto do território

Sorocaba tinha **723.682 habitantes** no Censo 2022, densidade de **1.608,64 hab./km²** e **224.980 domicílios particulares**. É uma cidade de porte suficiente para sustentar uma operação própria, desde que a implantação comercial comece pelos bairros e eixos mais verticalizados e com maior recorrência de reformas.

O mercado imobiliário é um reforço importante da tese. O Secovi-SP destaca o alto índice de verticalização de Sorocaba e o crescimento do setor; em divulgação sobre 2025, a entidade informou cerca de 95 mil vínculos ativos na construção civil e aproximadamente 3,3 mil novas vagas no ano.

## Dados oficiais e leitura de mercado

| Indicador | Dado | Uso na análise |
|---|---:|---|
| População (Censo 2022) | 723.682 habitantes | Base de escala urbana |
| Densidade demográfica | 1.608,64 hab./km² | Favorece rotas concentradas em eixos urbanos |
| Domicílios particulares | 224.980 unidades | Base habitacional municipal |
| Apartamentos estimados | ~49.900 unidades | Estoque-alvo para reformas em prédios |
| Crescimento de apartamentos, 2010–2022 | +29.677 unidades | Evidência de adensamento vertical |
| Obras/reformas anuais estimadas | ~2.750 | Potencial moderado de demanda recorrente |

O número de apartamentos foi adotado em aproximadamente 49,9 mil unidades: a estimativa é consistente com a informação de que Sorocaba incorporou 29.677 apartamentos entre 2010 e 2022, crescimento de 146,83%. Onde não há cadastro municipal aberto consolidado por tipologia, o documento mantém uma premissa conservadora.

## Equação urbana aplicada

```text
apartamentos_estimados = ~49.900
media_unidades_por_torre = 33
edificios_estimados = 49.900 ÷ 33 = ~1.512 torres

condominios_estimados = ~1.150
media_torres_por_condominio = 1.512 ÷ 1.150 = ~1,31 torres/condomínio

taxa_anual_reforma = 5,5%
obras_reformas = 49.900 × 5,5% = ~2.745 obras/ano
```

A média de 33 unidades por torre é apropriada a uma cidade média fortemente verticalizada, sem assumir o padrão de torres de capital. A relação de 1,31 torre por condomínio é coerente com edifícios isolados e pequenos conjuntos.

## Mercado imobiliário e segmentos prioritários

**Prioridade comercial:** condomínios residenciais, reformas de apartamentos, administradoras, arquitetos, engenheiros, empreiteiros de retrofit e construtoras de porte médio.

**Bairros/eixos para validação comercial inicial:** Centro, Campolim, Santa Rosália, Jardim Faculdade, Mangal, Alto da Boa Vista, Parque Campolim e demais corredores com concentração comprovada de edifícios. A definição final do roteiro deve ser ajustada após mapeamento de administradoras, obras ativas e tempos reais de rota.

O objetivo do primeiro ciclo comercial não é atender toda a cidade; é concentrar a base em microterritórios para reduzir deslocamento e aumentar recorrência.

## Infraestrutura de RCC e aderência regulatória

Sorocaba possui Plano de Gestão de Resíduos da Construção Civil e Aterro Municipal de Resíduos Inertes. O plano municipal prevê mecanismos de rastreabilidade pelo SIGOR-RCC e informa que obras com área igual ou superior a 1.000 m² devem comprovar a destinação adequada dos resíduos para obtenção de habite-se ou certidão de conclusão.

Isso não elimina a concorrência de caçambas e transportadores, mas aumenta a relevância de uma operação organizada, com destinação regular e registro operacional. Para a NaLata, a vantagem é atender o resíduo fracionado de reforma em edifício, evitando sacos, sujeira nas áreas comuns e conflito de circulação em elevadores.

## Premissas financeiras — Modelo REV6

| Parâmetro | Premissa | Justificativa |
|---|---:|---|
| Latas iniciais | 60 | Kit padrão do modelo REV6 |
| Ticket médio mensal | R$ 460,00 | Ponto âncora validado no modelo |
| Conversão | 6% | Faixa moderada alta; exige execução comercial ativa |
| Markup | 1,70× | Premissa base REV6 |
| Score territorial | 7,5/10 | Boa aderência, sem classificar Sorocaba como território premium |
| Cenário | Moderado | Multiplicador 1,00 |
| Modo operacional | 1 colaborador | Franqueado acompanha comercial e gestão no início |

### Fórmula de maturação

```text
fator territorial = (6% ÷ 8%) × (7,5 ÷ 8,2) = 0,68598

receita M12 = R$ 27.600,00 × 0,68598 = R$ 18.932,93
```

## DRE projetada — meses 1 a 12

| Mês | Receita projetada | Despesa fixa | Resultado operacional |
|---:|---:|---:|---:|
| 1 | R$ 4.115,85 | R$ 12.416,18 | **- R$ 8.300,33** |
| 2 | R$ 5.144,82 | R$ 12.416,18 | **- R$ 7.271,36** |
| 3 | R$ 6.173,78 | R$ 12.416,18 | **- R$ 6.242,40** |
| 4 | R$ 7.545,73 | R$ 12.416,18 | **- R$ 4.870,45** |
| 5 | R$ 8.917,68 | R$ 12.416,18 | **- R$ 3.498,50** |
| 6 | R$ 10.289,63 | R$ 12.416,18 | **- R$ 2.126,55** |
| 7 | R$ 11.661,59 | R$ 12.416,18 | **- R$ 754,59** |
| 8 | R$ 12.347,56 | R$ 12.416,18 | **- R$ 68,62** |
| 9 | R$ 12.347,56 | R$ 12.416,18 | **- R$ 68,62** |
| 10 | R$ 15.091,46 | R$ 12.416,18 | **R$ 2.675,28** |
| 11 | R$ 17.149,39 | R$ 12.416,18 | **R$ 4.733,21** |
| 12 | R$ 18.932,93 | R$ 12.416,18 | **R$ 6.516,75** |

> A DRE utiliza a curva de maturação REV6 e despesas fixas de **um colaborador**. Não inclui retirada do sócio. A expansão para equipe completa deve ocorrer somente após confirmação de volume e recorrência que sustentem o novo custo fixo.

## Investimento e indicadores

| Componente | Valor |
|---|---:|
| Desembolso fixo inicial REV6 | R$ 98.370,00 |
| Déficits operacionais projetados M1–M9 | R$ 33.201,41 |
| Capital de giro (1,6 × déficits) | R$ 53.122,26 |
| **Investimento total estimado** | **R$ 151.492,26** |
| Margem líquida no mês 12 | 34,4% |
| ROI anualizado pelo resultado do mês 12 | 51,6% |
| Payback em regime de maturidade | ~23,2 meses |

No acumulado dos primeiros 12 meses, o cenário projeta resultado operacional negativo de **R$ 19.276,17**, pois a maturação comercial consome caixa antes do equilíbrio mensal. Esse ponto é precisamente a razão para o capital de giro calculado; não deve ser omitido em uma decisão de investimento.

## Classificação de viabilidade

**Classificação: boa, com implantação comercial disciplinada.**

Sorocaba tem escala, verticalização e ambiente regulatório que favorecem a proposta de descarte inteligente. O score de 7,5 reflete, porém, que o território não deve ser vendido como captura automática de demanda: a concentração em condomínios e a rotina de prospecção local serão determinantes para alcançar a curva projetada.

## Estratégia recomendada de implantação

1. Iniciar por dois ou três microterritórios verticalizados, com rota curta e administradoras mapeadas.
2. Usar o franqueado na frente comercial nos primeiros meses; terceirizar integralmente a venda logo no início reduz a probabilidade de atingir o M10.
3. Construir carteira recorrente antes de aumentar equipe e frota.
4. Oferecer proposta centrada em organização dentro do prédio, circulação por elevador, limpeza de áreas comuns e destinação regular — não em preço por volume.
5. Validar antes da inauguração as áreas licenciadas de destinação, custos de descarte, percurso, janelas de coleta e exigências de CTR/SIGOR aplicáveis ao perfil de cada obra.

## Justificativa técnica dos números

Os números foram estimados em cenário moderado, sem projeção agressiva.

A lógica de verticalização seguiu a equação:

`apartamentos estimados ÷ média de unidades por torre = edifícios/torres estimados`

A quantidade de condomínios foi validada pela relação:

`edifícios estimados ÷ condomínios estimados = média de torres por condomínio`

O potencial de obras/reformas foi calculado aplicando uma taxa anual moderada de reforma sobre o estoque estimado de apartamentos. Quando não houve dado oficial aberto consolidado, foi usada estimativa conservadora baseada no Censo 2022, no perfil imobiliário local e na coerência urbana.

## Nota metodológica

Os indicadores territoriais não representam garantia de resultado financeiro. A receita depende da execução comercial, concentração de rota, qualidade do atendimento, preço efetivamente praticado, custos locais de destinação e gestão do franqueado.

O modelo financeiro REV6 é ancorado em uma receita base de R$ 27.600,00 no mês 12. Nesta simulação, a receita é ajustada pela conversão de 6% e pelo score territorial de 7,5. O investimento, o capital de giro e o payback devem ser atualizados caso as cotações reais de veículo, aluguel, descarte, seguro ou pessoal em Sorocaba se desviem das premissas de referência.

## Fontes utilizadas

- [IBGE — Panorama de Sorocaba](https://cidades.ibge.gov.br/brasil/sp/sorocaba/panorama): população e densidade do Censo 2022.
- [IBGE — Pesquisa “População e domicílio”](https://cidades.ibge.gov.br/brasil/sp/sorocaba/pesquisa/10105/329757): domicílios particulares.
- [IBGE — Censo 2022, tipo de domicílio](https://sidra.ibge.gov.br/tabela/6326): referência metodológica para apartamentos e domicílios ocupados.
- [SECOVI-SP — mercado imobiliário de Sorocaba](https://secovi.com.br/diretor-do-secovi-sp-discute-mercado-imobiliario-de-sorocaba-em-evento-da-mrv/): evidência de verticalização.
- [SECOVI-SP — construção civil em Sorocaba](https://secovi.com.br/sorocaba-impulsiona-o-mercado-imobiliario-e-registra-forte-geracao-de-empregos/): dados de vínculos e geração de vagas divulgados para 2025.
- [Prefeitura de Sorocaba — Plano de Gestão de RCC](https://meioambiente.sorocaba.sp.gov.br/wp-content/uploads/2024/04/plano-de-gestao-de-residuos-da-construcao-civil-do-municipio-de-sorocaba-pgrccms-2022-1.pdf): aterro de inertes, SIGOR-RCC, CTR e regras municipais.

---

*Documento técnico interno — NaLata Descarte Inteligente · Modelo REV6 · julho de 2026.*
