# 📋 NALATA DESCARTE INTELIGENTE
## Roteiro Base de Simulação Territorial
### Template Operacional — Uso com Simulador de Mercado

---

> **INSTRUÇÕES DE USO**
>
> Este documento é o modelo base para qualquer simulação territorial da Nalata Descarte Inteligente.
> Ao receber um pedido de simulação para **cidade, bairro, zona ou região**, os dados devem ser preenchidos com base em fontes reais e projeções moderadas.
>
> Sempre que houver dúvida relevante sobre dados estruturais do território, **o usuário deve ser consultado antes da geração do markdown final**.

---

## 0. REGRA CENTRAL DO MODELO

Toda simulação deve ser:

- tecnicamente defensável;
- baseada em dados reais sempre que disponíveis;
- moderada, não agressiva;
- coerente com o estoque habitacional real;
- compatível com a verticalização efetiva do território;
- validada contra fontes como IBGE, SECOVI, SINDUSCON, SECONCI, prefeitura e entidades locais.

Nunca utilizar números que inflem artificialmente o potencial do território.

---

## 1. FONTES PRIORITÁRIAS

### 1.1. Dados demográficos e habitacionais

Prioridade de fontes:

1. IBGE — Censo 2022
2. IBGE Cidades
3. Fundação SEADE
4. Prefeitura municipal
5. Plano Diretor / Cadastro Imobiliário Municipal

Dados obrigatórios quando disponíveis:

- população;
- número total de domicílios;
- domicílios ocupados;
- apartamentos;
- casas;
- área territorial;
- densidade demográfica;
- taxa de urbanização.

---

### 1.2. Mercado imobiliário e construção civil

Prioridade de fontes:

1. SECOVI / SECOVI-SP / SECOVI regional
2. SINDUSCON
3. SECONCI
4. ACONVAP ou associação local equivalente
5. CREA / CAU regional
6. Sindicato das imobiliárias
7. Prefeitura / cadastro de obras / alvarás
8. Estudos locais de mercado imobiliário

Dados desejados:

- lançamentos imobiliários;
- unidades residenciais lançadas;
- estoque vertical;
- média de unidades por torre;
- volume de reformas;
- número de construtoras;
- número de administradoras de condomínio;
- perfil de verticalização por bairro.

---

### 1.3. Infraestrutura RCC

Fontes prioritárias:

1. Prefeitura municipal
2. Secretaria de Meio Ambiente
3. CETESB ou órgão ambiental equivalente
4. Ecopontos municipais
5. ATT — Áreas de Transbordo e Triagem
6. Aterros licenciados
7. Plano Municipal de Gestão de Resíduos
8. Resolução CONAMA 307

Dados obrigatórios:

- existência de ecopontos;
- existência de ATT;
- operadores licenciados;
- regras para RCC;
- limite de descarte;
- fiscalização;
- possibilidade de emissão de comprovante/CTR.

---

## 2. REGRA DE DÚVIDA OBRIGATÓRIA

Antes de gerar o markdown final, perguntar ao usuário quando houver dúvida sobre:

- território exato;
- bairros incluídos;
- operação isolada ou regional;
- ticket médio;
- cidade-base;
- foco em condomínios ou reformas avulsas;
- ausência de dados oficiais relevantes;
- divergência entre dados de fontes diferentes.

Se o dado não for encontrado de forma confiável:

- não inventar;
- usar estimativa conservadora;
- explicar a metodologia no markdown;
- reduzir score se a incerteza afetar a viabilidade.

---

# 3. FRONT MATTER OBRIGATÓRIO

Todo arquivo markdown deve iniciar com:

```yaml
---
nalata_id: cidade_estado
nalata_label: Cidade — UF
nalata_latasAlvoM12: 220
nalata_precoMinimo: 100
nalata_precoMaximo: 140
nalata_qtdObras: ~3.500 obras/ano
nalata_qtdEdif: ~900 edifícios
nalata_qtdCond: ~750 condomínios
nalata_qtdConst: ~80 construtoras
nalata_qtdCltes: ~450 clientes
nalata_score: 8.2
nalata_taxaConversao: 5
---
```

---

# 4. EQUAÇÃO URBANA OBRIGATÓRIA

Esta é a nova regra obrigatória para evitar inconsistência matemática entre apartamentos, edifícios e condomínios.

## 4.1. Definições

### Universo de apartamentos

Número total estimado de apartamentos existentes no território.

Fonte preferencial:

- IBGE Censo 2022;
- cadastro municipal;
- SEADE;
- estudos SECOVI;
- estimativa derivada do total de domicílios.

Fórmula quando não houver dado direto:

```text
apartamentos_estimados = domicilios_ocupados × percentual_apartamentos
```

O percentual de apartamentos deve ser baseado em:

- IBGE;
- perfil urbano;
- bairros verticalizados;
- SECOVI;
- dados municipais;
- comparação com cidades similares.

---

### Média de unidades por torre

Representa quantos apartamentos, em média, existem por torre/prédio.

Fonte preferencial:

- SECOVI;
- mercado imobiliário local;
- lançamentos recentes;
- padrão construtivo predominante.

Quando não houver dado oficial, usar faixa conservadora:

| Perfil urbano | Média sugerida |
|---|---:|
| Cidade interior pouco verticalizada | 18 a 28 unidades/torre |
| Cidade média verticalizada | 28 a 38 unidades/torre |
| Região metropolitana verticalizada | 35 a 50 unidades/torre |
| Capital / bairro premium vertical | 45 a 80 unidades/torre |

---

## 4.2. Fórmula de edifícios / torres

```text
nalata_qtdEdif = apartamentos_estimados ÷ media_unidades_por_torre
```

Exemplo São Bernardo do Campo:

```text
apartamentos_estimados = ~72.300
media_unidades_por_torre = 38
nalata_qtdEdif = 72.300 ÷ 38 = ~1.902 torres
```

Resultado a usar no front matter:

```yaml
nalata_qtdEdif: ~1.900 unidades
```

---

## 4.3. Fórmula de condomínios

Condomínios não são iguais a torres.

Um condomínio pode ter:

- 1 torre;
- 2 torres;
- múltiplas torres;
- gestão única com várias edificações.

Fórmula de validação:

```text
media_torres_por_condominio = nalata_qtdEdif ÷ nalata_qtdCond
```

Faixa defensável:

| Perfil | Média esperada |
|---|---:|
| Bairros com prédios isolados | 1,0 a 1,3 torres/condomínio |
| Condomínios médios | 1,3 a 2,0 torres/condomínio |
| Grandes conjuntos residenciais | 2,0 a 5,0 torres/condomínio |

Exemplo São Bernardo:

```text
nalata_qtdEdif = ~1.900 torres
nalata_qtdCond = ~1.600 condomínios
media = 1.18 torres/condomínio
```

Interpretação:

> Coerente para uma malha urbana dominada por condomínios de torre única ou pequenos conjuntos em bairros como Jardim do Mar, Centro, Nova Petrópolis e Rudge Ramos.

---

## 4.4. Validação de coerência obrigatória

Antes de finalizar qualquer MD, validar:

```text
apartamentos_estimados ≈ nalata_qtdEdif × media_unidades_por_torre
nalata_qtdEdif ≈ nalata_qtdCond × media_torres_por_condominio
```

Se o resultado gerar distorção, ajustar.

Exemplo de erro:

```text
72.300 apartamentos ÷ 6.800 edifícios = 10,6 apartamentos por prédio
```

Isso é incoerente para uma cidade verticalizada e deve ser corrigido.

---

# 5. CÁLCULO DO POTENCIAL DE OBRAS / REFORMAS

O campo `nalata_qtdObras` deve representar o volume anual estimado de obras e reformas relevantes para o modelo Nalata.

## 5.1. Fórmula base

```text
nalata_qtdObras = apartamentos_estimados × taxa_anual_reforma
```

## 5.2. Taxa anual de reforma

Faixa sugerida:

| Perfil do território | Taxa anual |
|---|---:|
| Conservador | 3% a 4% |
| Moderado | 5% a 6% |
| Forte retrofit / alta renda | 6% a 8% |

Exemplo São Bernardo:

```text
apartamentos_estimados = ~72.300
taxa_anual_reforma = 5,8%
nalata_qtdObras = 72.300 × 0,058 = ~4.193 obras/ano
```

Resultado:

```yaml
nalata_qtdObras: ~4.200 obras/ano
```

---

# 6. CÁLCULO DE CONSTRUTORAS ATIVAS

O campo `nalata_qtdConst` deve considerar empresas realmente relevantes para a operação.

Incluir:

- construtoras locais;
- incorporadoras;
- empreiteiras médias;
- empresas de manutenção predial;
- empresas com histórico de obra/reforma.

Não incluir de forma indiscriminada:

- MEIs sem atividade recorrente;
- empresas inativas;
- prestadores sem relação com RCC.

## Critérios de estimativa

| Território | Faixa típica |
|---|---:|
| Cidade média | 30 a 80 empresas |
| Cidade grande | 80 a 180 empresas |
| Região metropolitana forte | 120 a 300 empresas |

---

# 7. CÁLCULO DE CLIENTES RECORRENTES POTENCIAIS

O campo `nalata_qtdCltes` deve representar o público comercialmente abordável e recorrente.

Incluir:

- condomínios mais ativos;
- administradoras;
- construtoras;
- empreiteiros;
- arquitetos;
- engenheiros;
- empresas de manutenção predial.

## Fórmula recomendada

```text
clientes_potenciais =
  condominios_ativos_para_abordagem
  + administradoras_relevantes
  + construtoras/empreiteiros
  + arquitetos/engenheiros com atuação recorrente
```

## Regra de prudência

Não usar 100% dos condomínios como clientes potenciais.

Usar somente:

- condomínios com maior chance de reforma;
- edifícios em bairros-alvo;
- condomínios com perfil de contratação;
- administradoras com carteira ativa.

Faixa de abordagem:

| Território | % dos condomínios como ICP |
|---|---:|
| Conservador | 20% a 30% |
| Moderado | 30% a 45% |
| Premium vertical | 45% a 60% |

---

# 8. CÁLCULO DE SCORE NALATA™

## Critérios

| Critério | Peso |
|---|---:|
| População | Alto |
| Densidade | Alto |
| Apartamentos / verticalização | Muito alto |
| Condomínios | Muito alto |
| RCC estruturado | Alto |
| Mercado imobiliário | Alto |
| Logística | Médio |
| Renda / ticket | Médio |

## Interpretação

| Score | Classificação |
|---|---|
| 9.0+ | Território premium |
| 8.0 a 8.9 | Muito forte |
| 7.0 a 7.9 | Bom |
| 6.0 a 6.9 | Operação adaptada |
| abaixo de 6.0 | Não recomendado isoladamente |

---

# 9. TAXA DE CONVERSÃO

Taxa de conversão deve ser conservadora e defensável.

| Cenário | Taxa |
|---|---:|
| Conservador | 3% |
| Moderado | 5% a 6% |
| Forte / premium | 7% a 8% |

Regra:

> Nunca usar acima de 8% sem justificativa técnica forte.

---

# 10. ESTRUTURA OBRIGATÓRIA DO MARKDOWN FINAL

Todo MD territorial deve seguir esta ordem:

1. Front matter
2. Título Nalata
3. Contexto do território
4. Dados oficiais
5. Leitura estratégica
6. Mercado imobiliário / SECOVI / SINDUSCON / SECONCI
7. Dados do território mapeado
8. Justificativa técnica dos números
9. Perfil operacional
10. Infraestrutura RCC
11. Classificação de viabilidade
12. Estratégia recomendada
13. Premissas para simulação
14. Nota metodológica
15. Fontes utilizadas

---

# 11. BLOCO PADRÃO — JUSTIFICATIVA TÉCNICA

Usar este bloco em todos os documentos:

```markdown
## Justificativa Técnica dos Números

Os números foram estimados em cenário moderado, sem projeção agressiva.

A lógica de verticalização seguiu a equação:

apartamentos_estimados ÷ média_unidades_por_torre = edifícios/torres estimados

A quantidade de condomínios foi validada pela relação:

edifícios_estimados ÷ condomínios_estimados = média de torres por condomínio

O potencial de obras/reformas foi calculado aplicando uma taxa anual moderada de reforma sobre o estoque estimado de apartamentos.

Quando não houve dado oficial aberto, foi utilizada estimativa conservadora com base em IBGE, SECOVI, SINDUSCON, SECONCI, prefeitura, perfil imobiliário e comparação com territórios similares.
```

---

# 12. BLOCO PADRÃO — NOTA METODOLÓGICA

```markdown
## Nota Metodológica

Os dados oficiais de população, domicílios, apartamentos, área e densidade devem ser obtidos preferencialmente em fontes públicas como IBGE, SEADE e prefeitura municipal.

Os campos de obras/reformas, edifícios residenciais, condomínios verticais, construtoras ativas e clientes recorrentes potenciais são estimativas técnicas moderadas.

Essas estimativas são calculadas por coerência urbana, considerando:

- estoque habitacional;
- percentual de apartamentos;
- média de unidades por torre;
- média de torres por condomínio;
- taxa anual de reformas;
- verticalização;
- mercado imobiliário;
- infraestrutura RCC;
- entidades setoriais como SECOVI, SINDUSCON e SECONCI.

As projeções não representam garantia de resultado financeiro. O desempenho dependerá de execução comercial, gestão operacional, qualidade do atendimento, aderência ao plano da franquia e condições reais do território.
```

---

# 13. EXEMPLO VALIDADO — SÃO BERNARDO DO CAMPO

```yaml
---
nalata_id: sao_bernardo_do_campo_sp
nalata_label: São Bernardo do Campo — SP
nalata_latasAlvoM12: 450
nalata_precoMinimo: 110
nalata_precoMaximo: 150
nalata_qtdObras: ~4.200 obras/ano
nalata_qtdEdif: ~1.900 unidades
nalata_qtdCond: ~1.600 condomínios
nalata_qtdConst: ~110 construtoras
nalata_qtdCltes: ~850 clientes
nalata_score: 8.7
nalata_taxaConversao: 5
---
```

## Equação aplicada

```text
apartamentos_estimados = ~72.300
media_unidades_por_torre = 38
edificios_estimados = 72.300 ÷ 38 = ~1.900 torres

condominios_estimados = ~1.600
media_torres_por_condominio = 1.900 ÷ 1.600 = ~1,18 torres/condomínio

taxa_anual_reforma = 5,8%
obras_reformas = 72.300 × 0,058 = ~4.200 obras/ano
```

---

# 14. REGRA FINAL

Se algum campo não puder ser defendido matematicamente:

- reduzir o número;
- explicar a estimativa;
- perguntar ao usuário;
- ou não gerar o documento final até confirmar a premissa.

O objetivo não é impressionar com números altos.

O objetivo é construir simulações que resistam a uma conversa com:

- investidor;
- contador;
- advogado;
- franqueado experiente;
- profissional da construção civil;
- operador imobiliário.

---

*Documento desenvolvido para uso interno pela equipe Nalata Descarte Inteligente.*  
*Versão: 2.0 — Template com Equação Urbana Obrigatória*  
*Uso: Simulações territoriais de franquia por cidade, região, bairro ou zona.*  
