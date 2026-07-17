---
nalata_id: mogi_das_cruzes_sp
nalata_label: Mogi das Cruzes — SP
nalata_latasAlvoM12: 300
nalata_precoMinimo: 110
nalata_precoMaximo: 150
nalata_qtdObras: ~1.950 obras/ano
nalata_qtdEdif: ~1.040 torres
nalata_qtdCond: ~850 condomínios
nalata_qtdConst: ~75 construtoras
nalata_qtdCltes: ~500 clientes
nalata_score: 8.2
nalata_taxaConversao: 5
---

# NALATA DESCARTE INTELIGENTE
## Simulação Territorial — Mogi das Cruzes — SP

**Data de elaboração:** 17 de julho de 2026  
**Território considerado:** Município de Mogi das Cruzes, com implantação comercial e operacional concentrada inicialmente no eixo urbano consolidado.

---

## 1. Contexto do Território

Mogi das Cruzes está inserida no Alto Tietê e integra a Região Metropolitana de São Paulo. O município reúne escala populacional relevante, estoque residencial vertical expressivo e conexão logística com a capital, o Vale do Paraíba, o ABC e o litoral.

O território municipal é extenso e contém áreas urbanas, periurbanas e rurais. Por isso, a viabilidade da operação NaLata não deve ser analisada apenas pela densidade média municipal. O indicador decisivo é a concentração de apartamentos, edifícios, condomínios e reformas no núcleo urbano formado principalmente pelas regiões de Centro, Mogilar, Vila Oliveira, Socorro, Jardim Armênia, Alto do Ipiranga, Cezar de Souza e Brás Cubas.

A recomendação técnica é iniciar a unidade com uma área de atendimento comercialmente densa, evitando dispersão logística por todo o município durante a curva de maturação.

---

## 2. Dados Oficiais

| Indicador | Valor de referência | Fonte |
|---|---:|---|
| População no Censo 2022 | 451.505 habitantes | IBGE |
| População estimada em 2025 | 470.302 habitantes | IBGE |
| Área territorial | 712,532 km² | IBGE |
| Densidade demográfica | 633,65 hab./km² | IBGE |
| Domicílios particulares permanentes ocupados | aproximadamente 158,7 mil | IBGE — Censo 2022 |
| Apartamentos ocupados | aproximadamente 35.361 | IBGE — Tabela 6326 |
| Participação de apartamentos | aproximadamente 22,3% dos domicílios | Censo 2022 |
| PIB per capita | R$ 57.745,81 | IBGE — 2023 |
| IDHM | 0,783 | PNUD/IBGE — referência 2010 |

### Leitura dos dados

A população supera 450 mil habitantes e o estoque de aproximadamente 35,4 mil apartamentos coloca Mogi das Cruzes acima do padrão de cidades interioranas pouco verticalizadas.

A densidade média municipal é reduzida pela grande extensão territorial e pela presença de áreas rurais e ambientais. No núcleo urbano, entretanto, a concentração de edifícios e atividades econômicas é significativamente maior do que a média municipal.

---

## 3. Leitura Estratégica

### Pontos favoráveis

- população suficiente para sustentar uma operação isolada;
- aproximadamente 35 mil apartamentos ocupados;
- participação de apartamentos próxima de 22,3%;
- presença de bairros com verticalização consolidada;
- mercado regional de construção representado por estrutura própria do SindusCon-SP;
- quatro ecopontos municipais identificados;
- regra municipal que limita o descarte voluntário de RCC e atribui às empresas a responsabilidade pela destinação de seus resíduos;
- integração rodoviária e ferroviária com a Região Metropolitana de São Paulo;
- demanda potencial de condomínios, reformas residenciais, manutenção predial, arquitetos, engenheiros e pequenos empreiteiros.

### Pontos de atenção

- território municipal muito extenso;
- risco de perda de produtividade quando a operação atende bairros e distritos muito dispersos;
- necessidade de validar previamente ATT, transbordo, transportador e destinação licenciada;
- tráfego urbano e restrições de circulação de veículos pesados em determinados corredores;
- necessidade de trabalhar rotas compactas e janelas programadas de coleta.

---

## 4. Mercado Imobiliário, SindusCon, Secovi e Seconci

Mogi das Cruzes possui uma regional própria do SindusCon-SP, criada para atender o município e cidades do Alto Tietê. A existência dessa estrutura regional demonstra presença organizada de construtoras, incorporadoras, prestadores e empresas ligadas à cadeia da construção civil.

O município também conta com unidade regional do Seconci-SP e instrumentos municipais de planejamento urbano, como Plano Diretor, legislação de uso e ocupação do solo e o GeoMogi.

Não foi localizada, em fonte pública aberta consultada, uma série recorrente do Secovi-SP dedicada exclusivamente aos lançamentos residenciais de Mogi das Cruzes. Por essa razão, o dimensionamento não utiliza números não confirmados de lançamentos imobiliários.

A avaliação de mercado foi baseada principalmente em:

- estoque oficial de apartamentos do Censo 2022;
- participação de apartamentos no total de domicílios;
- estrutura regional do setor da construção;
- padrão urbano dos bairros verticalizados;
- base populacional;
- infraestrutura de mobilidade e descarte;
- potencial de reformas no estoque residencial existente.

---

## 5. Dados do Território Mapeado

| Campo do simulador | Estimativa moderada |
|---|---:|
| Apartamentos existentes | ~35.361 |
| Média adotada de unidades por torre | 34 apartamentos |
| Edifícios/torres residenciais | ~1.040 |
| Média de torres por condomínio | ~1,22 |
| Condomínios verticais | ~850 |
| Taxa anual de reformas adotada | 5,5% |
| Obras e reformas relevantes | ~1.950 por ano |
| Construtoras e empresas recorrentes | ~75 |
| Clientes comerciais abordáveis | ~500 |
| Meta operacional no mês 12 | ~300 ciclos/latas por mês |
| Score Nalata™ | 8,2/10 |
| Taxa de conversão recomendada | 5% |

---

## 6. Justificativa Técnica dos Números

Os números foram estimados em cenário moderado, sem projeção agressiva.

### 6.1. Universo de apartamentos

O Censo 2022 registra aproximadamente 35.361 domicílios do tipo apartamento em Mogi das Cruzes.

```text
apartamentos_estimados = 35.361
```

### 6.2. Estimativa de edifícios e torres

Foi adotada média de 34 apartamentos por torre, compatível com cidade média inserida em região metropolitana, com mistura de prédios menores, torres residenciais médias e empreendimentos com múltiplos blocos.

```text
edificios_estimados =
35.361 apartamentos ÷ 34 unidades por torre
= 1.040 torres
```

Resultado utilizado:

```yaml
nalata_qtdEdif: ~1.040 torres
```

### 6.3. Estimativa de condomínios

Foi adotado universo moderado de aproximadamente 850 condomínios verticais.

```text
media_torres_por_condominio =
1.040 torres ÷ 850 condomínios
= 1,22 torre por condomínio
```

A relação é coerente com uma malha composta por edifícios isolados, condomínios de torre única e conjuntos com duas ou mais torres.

Resultado utilizado:

```yaml
nalata_qtdCond: ~850 condomínios
```

### 6.4. Potencial anual de obras e reformas

Foi aplicada taxa anual moderada de 5,5% sobre o estoque estimado de apartamentos.

```text
obras_reformas =
35.361 apartamentos × 5,5%
= 1.945 obras/reformas por ano
```

Resultado arredondado:

```yaml
nalata_qtdObras: ~1.950 obras/ano
```

A estimativa não inclui integralmente reformas em casas, obras comerciais, obras públicas ou novas construções. Portanto, permanece prudente para o modelo NaLata.

### 6.5. Construtoras e empresas relevantes

O número de aproximadamente 75 empresas não representa o total de CNPJs cadastrados no município.

A estimativa considera somente empresas com maior aderência comercial à operação:

- construtoras locais;
- incorporadoras;
- empreiteiras;
- empresas de manutenção predial;
- empresas de reforma;
- prestadores com geração recorrente de RCC.

Resultado utilizado:

```yaml
nalata_qtdConst: ~75 construtoras
```

### 6.6. Clientes recorrentes potenciais

Foi utilizada a seguinte lógica conservadora:

```text
condomínios com maior aderência:
850 × 35% = ~298

construtoras, empreiteiras e manutenção:
~75

administradoras relevantes:
~20

engenheiros, arquitetos e profissionais recorrentes:
~110

total estimado:
~503 clientes comerciais abordáveis
```

Resultado arredondado:

```yaml
nalata_qtdCltes: ~500 clientes
```

Não se considera que todos os condomínios sejam clientes. O universo representa a base comercialmente abordável ao longo da maturação da unidade.

### 6.7. Meta de latas/ciclos no mês 12

A meta de 300 ciclos mensais foi definida como objetivo operacional moderado para uma unidade madura, concentrada nos bairros de maior densidade.

Esse indicador representa volume mensal de atendimento e rotação, não a quantidade física inicial de tambores.

A operação pode iniciar com o kit padrão e ampliar o estoque físico conforme ocupação, giro e recorrência.

---

## 7. Perfil Operacional Recomendado

### Área inicial prioritária

Concentrar prospecção e logística no núcleo urbano com maior presença de edifícios, condomínios, comércio e serviços:

- Centro;
- Mogilar;
- Vila Oliveira;
- Socorro;
- Jardim Armênia;
- Alto do Ipiranga;
- Cezar de Souza;
- Brás Cubas.

### Segmentos prioritários

1. condomínios verticais;
2. administradoras de condomínios;
3. empresas de manutenção predial;
4. arquitetos e engenheiros;
5. empreiteiros de reformas;
6. pequenas construtoras;
7. lojas de acabamento, marcenaria e materiais de construção;
8. reformas comerciais e corporativas de pequeno porte.

### Configuração operacional

- kit inicial padrão com 60 latas;
- veículo leve compatível com a operação;
- atendimento inicialmente concentrado em raio operacional reduzido;
- roteirização por bairros e dias fixos;
- expansão territorial condicionada à densidade da carteira;
- relacionamento formal com ATT ou destino licenciado;
- emissão e guarda dos comprovantes de destinação aplicáveis;
- comercial ativo orientado a recorrência.

---

## 8. Infraestrutura de RCC

A Prefeitura de Mogi das Cruzes informa quatro ecopontos:

- Jardim Armênia;
- Parque Olímpico;
- Jundiapeba;
- Cezar de Souza.

Os ecopontos recebem resíduos de construção civil e demolição em quantidade limitada a 1 m³ ou 10 sacos de 100 litros por pessoa por mês.

A própria Prefeitura registra que os ecopontos atendem cidadãos e que as empresas são responsáveis pela destinação dos resíduos que geram.

### Implicação para a NaLata

Essa regra favorece a proposta da NaLata porque:

- o cliente empresarial precisa de solução formal;
- pequenas reformas geram volumes superiores ao descarte doméstico permitido;
- condomínios não devem depender do deslocamento informal do morador;
- arquitetos, engenheiros e empreiteiros precisam organizar transporte e destinação;
- a operação pode entregar conveniência, limpeza, rastreabilidade e comprovante.

### Validação obrigatória antes da implantação

Antes do início da operação, a unidade deverá confirmar:

- ATT ou estação de transbordo licenciada;
- aterro ou reciclador autorizado;
- tipos de RCC aceitos;
- preço por tonelada ou viagem;
- distância real de deslocamento;
- exigência de CTR, MTR ou documento municipal;
- condições para transportador de RCC;
- restrições ambientais e de circulação.

Não foi atribuído no documento um operador privado específico porque a contratação deve ser baseada em licença vigente e validação documental no momento da implantação.

---

## 9. Classificação de Viabilidade

### Score Nalata™: 8,2/10

**Classificação:** território muito forte.

| Critério | Avaliação |
|---|---|
| População | Muito forte |
| Densidade municipal | Moderada |
| Densidade no núcleo urbano | Forte |
| Estoque de apartamentos | Forte |
| Condomínios verticais | Forte |
| Mercado de reformas | Forte |
| Estrutura da construção civil | Forte |
| Infraestrutura de RCC | Boa, com validação privada necessária |
| Logística regional | Forte |
| Dispersão territorial | Ponto de atenção |
| Renda e capacidade de ticket | Boa |

### Parecer técnico

Mogi das Cruzes atende aos requisitos para implantação de uma unidade NaLata independente.

A principal condição de sucesso é não tratar os 712 km² do município como um único raio operacional desde o início. A unidade deve iniciar no corredor urbano de maior verticalização, formar densidade de clientes e somente depois ampliar sua cobertura.

---

## 10. Estratégia Recomendada

### Fase 1 — Implantação

- mapear os principais condomínios dos bairros prioritários;
- identificar administradoras com carteiras locais;
- cadastrar construtoras, arquitetos e empreiteiros;
- contratar destino licenciado antes da primeira coleta;
- estruturar tabela de preços por ciclo, distância e tipo de resíduo;
- operar com dias fixos por região;
- trabalhar prova de conceito e indicação local.

### Fase 2 — Densificação

- transformar clientes avulsos em contratos recorrentes;
- criar parcerias com síndicos e administradoras;
- implantar programa de indicação para profissionais da construção;
- concentrar campanhas digitais nos bairros já atendidos;
- ampliar estoque físico somente após validar giro e ocupação.

### Fase 3 — Expansão

- avançar para Cezar de Souza, Brás Cubas e outros eixos conforme densidade;
- avaliar rotas específicas para distritos mais afastados;
- aplicar adicional de deslocamento quando necessário;
- considerar segunda equipe apenas após saturação da primeira rota.

---

## 11. Premissas para a Simulação Financeira

As premissas recomendadas para o simulador REV6 são:

| Parâmetro | Valor recomendado |
|---|---:|
| Cenário | Moderado |
| Score territorial | 8,2 |
| Taxa de conversão | 5% |
| Kit físico inicial | 60 latas |
| Ticket médio mensal do modelo | R$ 460 |
| Markup | 1,70 |
| Faixa de preço por ciclo | R$ 110 a R$ 150 |
| Meta de maturidade | 300 ciclos/mês |
| Modo inicial | 1 colaborador ou estrutura enxuta |
| Expansão de equipe | Condicionada à demanda e às rotas |

### Observação

O ticket de R$ 460 é o parâmetro-padrão do modelo financeiro REV6 e representa receita média mensal por contrato ativo. Não corresponde necessariamente ao preço isolado de uma coleta.

A faixa de R$ 110 a R$ 150 deve ser validada comercialmente conforme:

- quantidade de latas;
- recorrência;
- distância;
- acesso ao imóvel;
- tipo de resíduo;
- custo de destinação;
- necessidade de ajudante;
- horário e restrições operacionais.

---

## 12. Nota Metodológica

Os dados oficiais de população, domicílios, apartamentos, área e densidade foram obtidos preferencialmente em fontes públicas do IBGE e da Prefeitura de Mogi das Cruzes.

Os campos de obras e reformas, edifícios residenciais, condomínios verticais, construtoras ativas e clientes recorrentes potenciais são estimativas técnicas moderadas.

Essas estimativas foram calculadas por coerência urbana, considerando:

- estoque habitacional;
- percentual de apartamentos;
- média de unidades por torre;
- média de torres por condomínio;
- taxa anual de reformas;
- verticalização;
- mercado imobiliário;
- infraestrutura RCC;
- estrutura regional do SindusCon-SP;
- planejamento municipal;
- logística urbana.

As projeções não representam garantia de resultado financeiro. O desempenho dependerá de execução comercial, gestão operacional, qualidade do atendimento, aderência ao plano da franquia e condições reais do território.

---

## 13. Fontes Utilizadas

1. [IBGE — Mogi das Cruzes: Cidades e Estados](https://www.ibge.gov.br/cidades-e-estados/sp/mogi-das-cruzes.html)
2. [IBGE — Censo 2022: Panorama de Mogi das Cruzes](https://cidades.ibge.gov.br/brasil/sp/mogi-das-cruzes/pesquisa/10101/0)
3. [IBGE/SIDRA — Tabela 6326: domicílios por tipo](https://sidra.ibge.gov.br/tabela/6326)
4. [Prefeitura de Mogi das Cruzes — Dados abertos do Censo 2022](https://dados.mogidascruzes.sp.gov.br/dataset/censo-2022-ibge-mogi-das-cruzes)
5. [Prefeitura de Mogi das Cruzes — Ecopontos](https://www.mogidascruzes.sp.gov.br/servico/sustentabilidade-e-agricultura/recebimento-de-materiais-inserviveis-ecopontos)
6. [Prefeitura de Mogi das Cruzes — responsabilidade empresarial e descarte de resíduos](https://www.mogidascruzes.sp.gov.br/noticia/descarte-de-residuos-de-madeira-deve-ser-direcionado-para-o-ecoponto-do-jardim-armenia)
7. [SindusCon-SP — Regional de Mogi das Cruzes](https://sindusconsp.com.br/regionais/regional-de-mogi-das-cruzes/)
8. [Prefeitura de Mogi das Cruzes — Plano Diretor](https://www.mogidascruzes.sp.gov.br/public/site/doc/planodiretor/2019/Institui%20o%20Plano%20Diretor%20do%20Municipio%20de%20Mogi%20das%20Cruzes%20-%20PLC.pdf)
9. [Prefeitura de Mogi das Cruzes — GeoMogi](https://geomogi.mogidascruzes.sp.gov.br/)
10. [Prefeitura de Mogi das Cruzes — acessos rodoviários e ferroviários](https://www.mogidascruzes.sp.gov.br/mogi-das-cruzes/como-chegar)
11. [CPTM — Linha 11-Coral](https://www.cptm.sp.gov.br/cptm/sua-viagem/linhas-e-estacoes/linha-11)
12. [Estudo acadêmico com dados do Censo 2022 sobre verticalização municipal](https://mail.editorarealize.com.br/editora/anais/enanpur/2025/TRABALHO_CORRECAO_COM_IDENT_EV212_MD1_ID2022_TB677_19032025121539.pdf)

---

*Documento técnico interno — NaLata Descarte Inteligente.*  
*Elaborado conforme o Roteiro Base de Simulação Territorial e o modelo financeiro REV6.*
