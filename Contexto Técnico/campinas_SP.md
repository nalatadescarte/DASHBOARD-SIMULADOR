---
nalata_id: campinas_sp
nalata_label: Campinas — SP
nalata_latasAlvoM12: 520
nalata_precoMinimo: 110
nalata_precoMaximo: 150
nalata_qtdObras: ~6.800 obras/ano
nalata_qtdEdif: ~2.800 torres
nalata_qtdCond: ~2.100 condomínios
nalata_qtdConst: ~160 construtoras
nalata_qtdCltes: ~1.150 clientes
nalata_score: 9.2
nalata_taxaConversao: 8
---

# Simulação Financeira Territorial — NaLata Campinas/SP

**Documento interno — NaLata Descarte Inteligente**  
**Cidade analisada:** Campinas — SP  
**Versão:** 1.0  
**Data:** 01/06/2026  
**Lead:** não informado  
**Ticket médio usado:** R$ 460,00/mês por contrato ativo, conforme padrão REV6  
**Modo financeiro simulado:** Equipe Completa  
**Cenário recomendado para apresentação:** Moderado

---

## 1. Contexto do Território

Campinas é um dos territórios mais fortes para o modelo NaLata no interior de São Paulo.

A cidade combina:

- população acima de 1 milhão de habitantes;
- alta densidade urbana;
- forte presença de bairros verticalizados;
- mercado imobiliário ativo;
- estrutura municipal formal para controle de resíduos da construção civil;
- boa aderência para logística com tambores de 200L em condomínios, apartamentos, reformas, obras comerciais e manutenção predial.

A leitura estratégica é de **território premium**, com potencial para operação estruturada e expansão progressiva de estoque de latas após validação comercial.

---

## 2. Dados Oficiais e Estruturais

| Indicador | Valor utilizado | Fonte / leitura |
|---|---:|---|
| População Censo 2022 | 1.139.047 habitantes | IBGE |
| População estimada 2024 | 1.185.977 habitantes | IBGE |
| Densidade demográfica 2022 | 1.433,54 hab/km² | IBGE |
| Área territorial 2023 | 794,571 km² | IBGE |
| Área urbanizada 2019 | 245,14 km² | IBGE |
| Salário médio formal 2022 | 3,8 salários mínimos | IBGE |
| Infraestrutura RCC | Sistema municipal de controle de RCC/PGRCC | Prefeitura de Campinas |
| Ecopontos | 16 ecopontos municipais | Prefeitura de Campinas |
| Mercado imobiliário | Região com expansão e dados setoriais acompanhados pelo Secovi-SP | Secovi-SP |

---

## 3. Leitura Estratégica

Campinas tem perfil superior ao de uma cidade média tradicional. A cidade se comporta como polo metropolitano, com demanda relevante em:

- reformas em apartamentos;
- obras em condomínios verticais;
- manutenção predial;
- reformas comerciais;
- obras de pequeno e médio porte;
- serviços recorrentes para síndicos, administradoras, engenheiros, arquitetos e empreiteiros.

O modelo NaLata tende a se beneficiar principalmente em bairros como:

- Cambuí;
- Taquaral;
- Guanabara;
- Mansões Santo Antônio;
- Castelo;
- Centro;
- Nova Campinas;
- Barão Geraldo;
- Parque Prado;
- Jardim Chapadão;
- Bonfim;
- Jardim Nova América;
- eixo Parque Dom Pedro / Alphaville Campinas.

---

## 4. Mercado Imobiliário / SECOVI / SINDUSCON / SECONCI

Campinas possui mercado imobiliário regional relevante e monitorado por entidades setoriais. O Secovi-SP mantém estudos específicos para Campinas e região, além de apontar expansão recente do mercado imobiliário regional.

Para fins da simulação NaLata, a leitura não depende apenas de lançamentos novos. O ponto central é o **estoque habitacional vertical existente**, que gera reformas recorrentes, trocas de piso, gesso, marcenaria, manutenção, pequenas demolições, obras de banheiro/cozinha e modernização de unidades.

A operação deve priorizar:

1. Condomínios verticais de médio e alto padrão.
2. Administradoras de condomínio.
3. Engenheiros e arquitetos com atuação recorrente.
4. Empreiteiros de reforma.
5. Construtoras locais e incorporadoras regionais.
6. Empresas de manutenção predial.

---

## 5. Dados do Território Mapeado

| Campo | Valor |
|---|---:|
| Apartamentos estimados | ~118.000 unidades |
| Média estimada de unidades por torre | 42 apartamentos/torre |
| Edifícios / torres estimados | ~2.800 torres |
| Condomínios verticais estimados | ~2.100 condomínios |
| Média de torres por condomínio | ~1,33 torre/condomínio |
| Taxa anual de reforma aplicada | 5,8% |
| Obras/reformas relevantes por ano | ~6.800 obras/ano |
| Construtoras / incorporadoras / empreiteiras relevantes | ~160 empresas |
| Clientes recorrentes potenciais | ~1.150 clientes |
| Latas alvo em M12 | 520 latas |
| Score Nalata™ | 9,2/10 |
| Classificação | Território premium |

---

## 6. Justificativa Técnica dos Números

Os números foram estimados em cenário moderado, sem projeção agressiva.

A lógica de verticalização seguiu a equação:

```text
apartamentos_estimados ÷ média_unidades_por_torre = edifícios/torres estimados
118.000 ÷ 42 = 2.809 torres
```

Resultado arredondado:

```text
nalata_qtdEdif = ~2.800 torres
```

A quantidade de condomínios foi validada pela relação:

```text
edifícios_estimados ÷ condomínios_estimados = média de torres por condomínio
2.800 ÷ 2.100 = 1,33 torre/condomínio
```

Interpretação:

> Coerente para Campinas, pois a cidade possui mistura de prédios isolados, condomínios de torre única, condomínios médios e conjuntos residenciais maiores.

O potencial de obras/reformas foi calculado aplicando uma taxa anual moderada de reforma sobre o estoque estimado de apartamentos:

```text
apartamentos_estimados × taxa_anual_reforma = obras/reformas anuais
118.000 × 5,8% = 6.844 obras/reformas por ano
```

Resultado arredondado:

```text
nalata_qtdObras = ~6.800 obras/ano
```

A estimativa de clientes potenciais considera apenas uma fração abordável do mercado, evitando usar 100% dos condomínios como potenciais clientes imediatos:

```text
condomínios ICP = 2.100 × 40% = ~840 condomínios abordáveis
clientes potenciais = condomínios ICP + administradoras + construtoras/empreiteiros + arquitetos/engenheiros recorrentes
clientes potenciais = ~840 + ~50 + ~160 + ~100 = ~1.150 clientes
```

---

## 7. Perfil Operacional Recomendado

### 7.1. Operação inicial

| Item | Premissa |
|---|---|
| Estoque inicial | 60 latas |
| Veículo | pickup / utilitário leve adaptado |
| Equipe inicial | 1 entregador + 1 ajudante a partir da fase de escala |
| Base operacional | espaço simples para armazenamento de latas |
| Área de atendimento prioritária | Campinas urbana e bairros verticalizados |
| Modelo comercial | B2B recorrente + reformas avulsas qualificadas |
| Principal canal | WhatsApp + indicação + administradoras + Google Ads local |

### 7.2. Estratégia de expansão operacional

Campinas comporta crescimento acima do kit inicial, porém a expansão de latas deve ser feita por tração real, não por compra antecipada de estoque.

Escala recomendada:

| Fase | Estoque aproximado | Condição para avançar |
|---|---:|---|
| Implantação | 60 latas | início da operação |
| Validação | 90 a 120 latas | recorrência comercial e rotas estáveis |
| Expansão 1 | 180 a 240 latas | carteira recorrente ativa |
| Expansão 2 | 300 a 360 latas | necessidade de reforço de equipe/veículo |
| Maturidade territorial | 450 a 520 latas | operação consolidada, demanda B2B e rotas otimizadas |

---

## 8. Infraestrutura RCC

Campinas possui estrutura formal para gestão de resíduos da construção civil.

Pontos relevantes:

- existência de sistema municipal de controle de resíduos da construção civil;
- monitoramento de geração, transporte e destinação de RCC;
- certificação eletrônica do manejo conforme PGRCC;
- rede municipal de ecopontos para pequenos volumes;
- ambiente regulatório favorável para uma operação que oferece descarte regularizado.

Essa estrutura reforça o valor comercial da NaLata, principalmente em comparação com descarte informal, caçambas irregulares ou soluções sem rastreabilidade.

---

## 9. Classificação de Viabilidade

| Critério | Avaliação |
|---|---|
| População | Muito forte |
| Densidade urbana | Muito forte |
| Verticalização | Forte |
| Condomínios | Muito forte |
| Mercado imobiliário | Muito forte |
| Infraestrutura RCC | Forte |
| Logística urbana | Boa, com atenção a rotas e trânsito |
| Ticket potencial | Forte |
| Concorrência | Existe, mas o modelo por lata tem diferenciação clara |
| Score final | 9,2/10 |

**Classificação final:** Território premium para operação NaLata.

---

## 10. Estratégia Recomendada

A operação Campinas deve ser apresentada como uma unidade de alto potencial, mas com discurso financeiro moderado.

### Prioridade comercial

1. Administradoras de condomínio.
2. Síndicos profissionais.
3. Condomínios verticais em bairros premium.
4. Engenheiros e arquitetos.
5. Empreiteiros recorrentes.
6. Reformas de apartamentos.
7. Pequenas obras comerciais.
8. Construtoras e incorporadoras regionais.

### Posicionamento recomendado

> “Solução para retirada de entulho em apartamentos, condomínios e reformas urbanas, sem caçamba na rua, com coleta organizada e descarte regularizado.”

### Argumentos comerciais fortes

- Tambor de 200L entra em locais onde caçamba não resolve.
- Reduz sujeira em área comum.
- Facilita logística vertical.
- Evita exposição de entulho em calçada.
- Gera solução mais adequada para reformas pequenas e médias.
- Ajuda condomínios e obras a manterem conformidade com descarte regularizado.

---

## 11. Premissas para Simulação Financeira REV6

| Parâmetro | Valor utilizado |
|---|---:|
| Quantidade inicial de latas | 60 |
| Ticket médio mensal por contrato ativo | R$ 460,00 |
| Taxa de conversão do simulador | 8% |
| Markup | 1,70x |
| Score territorial | 9,2 |
| Fator score | 9,2 ÷ 8,2 = 1,12 |
| Modo operacional | Equipe Completa |
| Despesa M1–M4 | R$ 12.416,18/mês |
| Despesa M5+ | R$ 16.266,18/mês |
| Investimento fixo inicial | R$ 98.370,00 |
| Capital de giro | Calculado conforme déficits mensais |
| Cenário recomendado | Moderado |

---

## 12. Curva de Receita Projetada — M1 a M12

| Mês | Conservador | Moderado | Otimista |
|---|---:|---:|---:|
| M1 | R$ 4.375,61 | R$ 6.731,71 | R$ 9.087,80 |
| M2 | R$ 5.469,51 | R$ 8.414,63 | R$ 11.359,76 |
| M3 | R$ 6.563,41 | R$ 10.097,56 | R$ 13.631,71 |
| M4 | R$ 8.021,95 | R$ 12.341,46 | R$ 16.660,98 |
| M5 | R$ 9.480,49 | R$ 14.585,37 | R$ 19.690,24 |
| M6 | R$ 10.939,02 | R$ 16.829,27 | R$ 22.719,51 |
| M7 | R$ 12.397,56 | R$ 19.073,17 | R$ 25.748,78 |
| M8 | R$ 13.126,83 | R$ 20.195,12 | R$ 27.263,41 |
| M9 | R$ 13.126,83 | R$ 20.195,12 | R$ 27.263,41 |
| M10 | R$ 16.043,90 | R$ 24.682,93 | R$ 33.321,95 |
| M11 | R$ 18.231,71 | R$ 28.048,78 | R$ 37.865,85 |
| M12 | R$ 20.127,80 | R$ 30.965,85 | R$ 41.803,90 |


---

## 13. Resultado Financeiro por Cenário

| Cenário | Receita M12 | Despesa M12 | Lucro Líquido M12 | Capital de Giro | Investimento Total | Payback | Margem Líquida | ROI anualizado |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Conservador | R$ 20.127,80 | R$ 16.266,18 | R$ 3.861,62 | R$ 76.346,68 | R$ 174.716,68 | 45,2 meses | 19,2% | 26,5% |
| Moderado | R$ 30.965,85 | R$ 16.266,18 | R$ 14.699,67 | R$ 22.016,27 | R$ 120.386,27 | 8,2 meses | 47,5% | 146,5% |
| Otimista | R$ 41.803,90 | R$ 16.266,18 | R$ 25.537,72 | R$ 15.000,00 | R$ 113.370,00 | 4,4 meses | 61,1% | 270,3% |


---

## 14. Leitura do Cenário Moderado

No cenário moderado, Campinas projeta:

- **Receita M12:** R$ 30.965,85
- **Lucro líquido M12:** R$ 14.699,67
- **Margem líquida M12:** 47,5%
- **Capital de giro estimado:** R$ 22.016,27
- **Investimento total estimado:** R$ 120.386,27
- **Payback estimado:** 8,2 meses
- **ROI anualizado sobre lucro M12:** 146,5%

A simulação indica que Campinas permite uma operação financeiramente atrativa já no kit inicial, com possibilidade de acelerar payback se a unidade operar com disciplina comercial, recorrência em condomínios e controle de rota.

---

## 15. Interpretação Comercial para Franqueado

Campinas não deve ser vendida apenas como “cidade grande”. A tese correta é:

> Campinas possui estoque vertical, renda, urbanização, mercado imobiliário ativo e estrutura regulatória de RCC suficientes para sustentar uma operação NaLata com forte potencial de recorrência.

A abordagem com o franqueado deve enfatizar que o resultado dependerá de:

- execução comercial ativa;
- capacidade de formar carteira recorrente;
- relacionamento com síndicos e administradoras;
- qualidade operacional;
- frequência de visitas e prospecção;
- cumprimento do playbook de implantação;
- uso correto das campanhas regionais.

---

## 16. Riscos e Pontos de Atenção

| Risco | Mitigação |
|---|---|
| Concorrência com caçambas e descarte informal | Posicionar NaLata como solução vertical, limpa e regularizada |
| Trânsito e deslocamento urbano | Dividir atendimento por zonas e janelas de rota |
| Ticket abaixo do previsto | Priorizar condomínios e contratos recorrentes |
| Operação pulverizada demais | Evitar aceitar qualquer coleta distante sem margem |
| Crescimento de estoque sem demanda validada | Comprar latas adicionais somente após tração comercial |
| Dependência de leads pagos | Desenvolver canal B2B com administradoras e recorrência |

---

## 17. Conclusão

Campinas/SP atende aos pré-requisitos da NaLata com folga.

A cidade apresenta:

- escala populacional;
- densidade urbana;
- estoque vertical relevante;
- mercado imobiliário ativo;
- bairros com perfil de reforma;
- infraestrutura pública de controle de RCC;
- potencial para contratos recorrentes;
- score territorial premium.

**Recomendação:** território aprovado para operação NaLata, com estratégia de implantação estruturada, foco em condomínios verticais e expansão gradual de estoque até 450–520 latas conforme carteira ativa.

---

## 18. Nota Metodológica

Os dados oficiais de população, densidade, área territorial e área urbanizada foram obtidos em fontes públicas, especialmente IBGE e Prefeitura Municipal de Campinas.

Os campos de obras/reformas, edifícios residenciais, condomínios verticais, construtoras ativas e clientes recorrentes potenciais são estimativas técnicas moderadas.

Essas estimativas são calculadas por coerência urbana, considerando:

- estoque habitacional;
- percentual estimado de apartamentos;
- média de unidades por torre;
- média de torres por condomínio;
- taxa anual de reformas;
- verticalização;
- mercado imobiliário;
- infraestrutura RCC;
- entidades setoriais como SECOVI, SINDUSCON e SECONCI.

As projeções não representam garantia de resultado financeiro. O desempenho dependerá de execução comercial, gestão operacional, qualidade do atendimento, aderência ao plano da franquia e condições reais do território.

---

## 19. Fontes Utilizadas

### Fontes públicas

- IBGE Cidades — Campinas/SP — população, densidade, área territorial, área urbanizada e indicadores socioeconômicos.
- Prefeitura Municipal de Campinas — Sistema Integrado de Resíduos da Construção Civil / PGRCC.
- Prefeitura Municipal de Campinas — Ecopontos municipais.
- Secovi-SP — estudos e publicações sobre mercado imobiliário em Campinas e interior de São Paulo.

### Fontes internas NaLata

- Roteiro Base de Simulação Territorial — NaLata Descarte Inteligente — versão 2.0.
- Glossário do Modelo Financeiro — NaLata REV6.
- Contexto Técnico — Territórios NaLata.
