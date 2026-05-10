# 📋 NALATA DESCARTE INTELIGENTE
## Roteiro de Simulação Financeira para Investidores
### Template Operacional — Uso com Simulador de Mercado

---

> **INSTRUÇÕES DE USO**
> Este documento é um roteiro dinâmico. Ao receber um pedido de simulação para **bairro, zona, região ou cidade**, preencha os campos marcados com `{{ }}` usando os dados do simulador Nalata Insights Dashboard. Todas as seções marcadas com `[APRESENTADOR]` são falas do consultor. As seções marcadas com `[DADOS]` são os blocos financeiros a exibir na tela.

---

## FASE 0 — ABERTURA E ANCORAGEM EMOCIONAL

### [APRESENTADOR — Fala de Abertura]

> _"Antes de qualquer número, preciso te fazer uma pergunta simples:_
> _Você já reparou que toda obra do seu bairro tem uma caçamba na calçada?_
> _Pois é. O mercado que você está prestes a ver não é sobre construção — é sobre o que sobra dela._
> _E esse 'sobra' movimenta **mais de R$ 7 bilhões por ano** no Brasil."_

**Técnica aplicada:** *Future pacing + Ancoragem de mercado*
O cérebro do investidor já está 'vendo' o problema em todo lugar. Isso ativa o sistema de atenção seletiva (RAS) e cria familiaridade instantânea com a oportunidade.

---

## FASE 1 — CONTEXTO DE MERCADO (O PROBLEMA É GRANDE)

### [DADOS — Painel de Mercado Nacional]

| Indicador | Dado | Fonte |
|---|---|---|
| Resíduos de construção gerados/ano no Brasil | **+70 milhões de toneladas** | ABRECON/SINDUSCON |
| Volume corretamente reciclado ou destinado | apenas **20% a 30%** | ABRECON |
| Edificações residenciais e comerciais no Brasil | ~**5,5 milhões** | SINDUSCON |
| Reformas realizadas por ano (estimativa) | **1,5 a 2 milhões** | SINDUSCON |
| Risco de multa para empresas sem destinação correta | **Alto** — legislação municipal crescente | CONAMA |

---

### [APRESENTADOR — Fala de Contexto Local]

> _"Agora deixa eu trazer isso para perto de você._
> _Estamos falando de **{{ CIDADE / BAIRRO / REGIÃO }}**._
> _O simulador Nalata mapeou esse território e os dados são específicos para onde você vai operar."_

**Técnica aplicada:** *Localização + Especificidade*
Números locais têm 3x mais impacto cognitivo do que dados nacionais. O investidor 'sente' o mercado no seu próprio quintal.

---

## FASE 2 — DADOS DO TERRITÓRIO MAPEADO

### [DADOS — Painel do Simulador para {{ CIDADE/BAIRRO/REGIÃO }}]

```
╔══════════════════════════════════════════════════════════════╗
║        ANÁLISE DE MERCADO — {{ CIDADE / BAIRRO / REGIÃO }}   ║
╠══════════════════════════════════════════════════════════════╣
║  Potencial de obras/reformas no território   {{ QTD_OBRAS }} ║
║  Densidade de edifícios residenciais         {{ QTD_EDIF }}  ║
║  Condomínios verticais mapeados              {{ QTD_COND }}  ║
║  Construtoras ativas identificadas           {{ QTD_CONST }} ║
║  Potencial de clientes recorrentes           {{ QTD_CLTES }} ║
║  Índice de Oportunidade Nalata™              {{ SCORE }}/10  ║
╚══════════════════════════════════════════════════════════════╝
```

> **Nota ao apresentador:** Preencha os campos `{{ }}` com os dados gerados pelo painel [nalata-insights-dashboard.lovable.app](https://nalata-insights-dashboard.lovable.app/) para o território selecionado.

---

### [APRESENTADOR — Fala de Oportunidade]

> _"Veja o que isso significa na prática:_
> _Se você converter apenas **{{ TAXA_CONVERSAO }}% desse potencial** em contratos ativos,_
> _já temos a base para montar o fluxo financeiro do seu negócio._
> _E é exatamente isso que vamos fazer agora — juntos, com números reais."_

**Técnica aplicada:** *Micro-comprometimento*
Ao dizer "juntos", o consultor gera pertencimento. O investidor começa a se ver como dono, não como expectador.

---

## FASE 3 — PREMISSAS DO MODELO DE NEGÓCIO

### [DADOS — Como a Nalata Gera Receita]

O modelo de franquia Nalata é baseado em **locação recorrente de tambores de 200 litros** para:

| Segmento de Cliente | Tipo de Serviço | Recorrência |
|---|---|---|
| Condomínios verticais | Contrato mensal de coleta programada | **Alta** — mensal |
| Construtoras e empreiteiras | Locação + coleta por demanda | **Média** — por obra |
| Reformas residenciais | Coleta avulsa/imediata | **Baixa** — pontual |
| Comércios e escritórios | Plano mensal de descarte | **Alta** — mensal |

**Receita = Volume de tambores locados × Ticket médio por ciclo**

---

### [APRESENTADOR — Fala das Premissas]

> _"O modelo é simples — e simples é poderoso._
> _Você não vende um produto que some. Você aluga um serviço que volta._
> _Cada tambor colocado é uma receita que se repete todo mês._
> _Não é venda. É **receita recorrente**. Como uma mensalidade de academia — só que o cliente não cancela porque o entulho não para de existir."_

**Técnica aplicada:** *Analogia de Recorrência + Inevitabilidade*
O cérebro humano percebe recorrência como segurança. A analogia da mensalidade ativa memória positiva e reduz a percepção de risco.

---

## FASE 4 — SIMULAÇÃO FINANCEIRA — DRE SIMPLIFICADO

### [DADOS — Cenário Base para {{ CIDADE/BAIRRO/REGIÃO }}]

> **Premissas do Cenário Base:**
> - Operação: **2 colaboradores**
> - Frota inicial: **{{ QTD_TAMBORES }} tambores** em operação
> - Ticket médio por coleta/mês: **R$ {{ TICKET_MEDIO }}**
> - Taxa de ocupação dos tambores: **{{ TAXA_OCUP }}%**
> - Mês de referência: **Operação estabilizada (mês 6+)**

---

```
══════════════════════════════════════════════════════════════
        DRE SIMPLIFICADO — NALATA {{ CIDADE/BAIRRO/REGIÃO }}
        Cenário: {{ CENARIO }} | Referência: Mês Estabilizado
══════════════════════════════════════════════════════════════

  RECEITA BRUTA DE SERVIÇOS
  ┌─────────────────────────────────────────────────────────┐
  │ Locação e coleta recorrente (condomínios/contratos)     │
  │                                        R$ {{ REC_REC }} │
  │ Coletas avulsas e emergenciais                          │
  │                                        R$ {{ REC_AVU }} │
  │ Serviços adicionais (triagem, certificado ambiental)    │
  │                                        R$ {{ REC_ADC }} │
  │─────────────────────────────────────────────────────────│
  │ (=) RECEITA BRUTA TOTAL            R$ {{ REC_BRUTA }}   │
  └─────────────────────────────────────────────────────────┘

  DEDUÇÕES SOBRE RECEITA
  ┌─────────────────────────────────────────────────────────┐
  │ Impostos e taxas (Simples Nacional — faixa estimada)    │
  │                                        R$ {{ IMP }}     │
  │─────────────────────────────────────────────────────────│
  │ (=) RECEITA LÍQUIDA                R$ {{ REC_LIQ }}     │
  └─────────────────────────────────────────────────────────┘

  CUSTOS OPERACIONAIS (CMV/CSP)
  ┌─────────────────────────────────────────────────────────┐
  │ Destinação de resíduos (ATT/Aterro)    R$ {{ DEST }}    │
  │ Combustível e logística                R$ {{ COMB }}    │
  │ Manutenção de tambores e equipamentos  R$ {{ MANUT }}   │
  │ Royalties Nalata (% sobre receita)     R$ {{ ROY }}     │
  │─────────────────────────────────────────────────────────│
  │ (=) TOTAL CUSTOS OPERACIONAIS      R$ {{ CUSTO_OP }}    │
  └─────────────────────────────────────────────────────────┘

  ┌─────────────────────────────────────────────────────────┐
  │ (=) LUCRO BRUTO                    R$ {{ LUC_BRUTO }}   │
  │     Margem Bruta                       {{ MARG_B }}%    │
  └─────────────────────────────────────────────────────────┘

  DESPESAS FIXAS OPERACIONAIS
  ┌─────────────────────────────────────────────────────────┐
  │ Folha de pagamento (2 colaboradores)   R$ {{ FOLHA }}   │
  │ Aluguel/galpão de apoio (se aplicável) R$ {{ ALU }}     │
  │ Fundo de Marketing Nalata (% receita)  R$ {{ MKTG }}    │
  │ Telefone, internet, sistema            R$ {{ ADM }}     │
  │ Outras despesas administrativas        R$ {{ OUTRAS }}  │
  │─────────────────────────────────────────────────────────│
  │ (=) TOTAL DESPESAS FIXAS           R$ {{ DESP_FIX }}    │
  └─────────────────────────────────────────────────────────┘

  ══════════════════════════════════════════════════════════
  │ (=) RESULTADO OPERACIONAL (EBITDA) R$ {{ EBITDA }}      │
  │ (=) LUCRO LÍQUIDO ESTIMADO         R$ {{ LUC_LIQ }}     │
  │     Margem Líquida                     {{ MARG_L }}%    │
  ══════════════════════════════════════════════════════════
```

---

### [APRESENTADOR — Fala do DRE]

> _"Olha o que aparece aqui._
> _Com uma operação enxuta de **2 pessoas**, você tem uma margem líquida de **{{ MARG_L }}%**._
> _Para te dar uma referência: a maioria das franquias de alimentação opera com margem entre 8% e 15%._
> _Aqui estamos falando de {{ MARG_L }}%. Esse é o poder de um serviço sem produto físico para comprar, sem estoque, sem validade."_

**Técnica aplicada:** *Contraste de Referência (Anchoring Comparativo)*
Comparar com o que o investidor já conhece (alimentação) faz o número parecer ainda maior sem mentir.

---

## FASE 5 — ANÁLISE DE PAYBACK E ROI

### [DADOS — Retorno do Investimento]

```
══════════════════════════════════════════════════════════════
              ANÁLISE DE RETORNO — {{ CIDADE/BAIRRO/REGIÃO }}
══════════════════════════════════════════════════════════════

  Investimento Total Necessário
  ┌─────────────────────────────────────────────────────────┐
  │ Taxa de franquia + suporte inicial     R$ {{ INV_FRQ }} │
  │ Capital de giro (3 meses)              R$ {{ CAP_GIR }} │
  │ Tambores e equipamentos iniciais       R$ {{ INV_EQP }} │
  │ Veículo (próprio ou financiado)        R$ {{ INV_VEI }} │
  │─────────────────────────────────────────────────────────│
  │ (=) INVESTIMENTO TOTAL             R$ {{ INV_TOTAL }}   │
  └─────────────────────────────────────────────────────────┘

  Projeção de Recuperação
  ┌─────────────────────────────────────────────────────────┐
  │ Lucro Líquido Mensal (estabilizado)    R$ {{ LUC_LIQ }} │
  │ Payback Estimado                       {{ PAYBACK }} meses│
  │ ROI (12 meses)                         {{ ROI_12 }}%    │
  │ ROI (24 meses)                         {{ ROI_24 }}%    │
  └─────────────────────────────────────────────────────────┘
```

---

### [APRESENTADOR — Fala do Payback]

> _"Veja esse número aqui: **{{ PAYBACK }} meses**._
> _Isso significa que em menos de {{ PAYBACK }} meses você já recuperou tudo o que investiu._
> _Depois disso, cada real que entra é retorno._
> _Poupança rende hoje em torno de 10,5% ao ano._
> _Esse modelo entrega {{ ROI_12 }}% ao ano — com você no controle."_

**Técnica aplicada:** *Ancoragem com Benchmark Financeiro*
Comparar com poupança é poderoso porque todo brasileiro entende poupança. O contraste é devastador a favor do investimento.

---

## FASE 6 — PROJEÇÃO DE CRESCIMENTO (CENÁRIOS)

### [DADOS — Três Cenários de Operação]

| | 🔵 Conservador | 🟡 Moderado | 🟢 Otimista |
|---|---|---|---|
| Tambores em operação | {{ TAM_C }} | {{ TAM_M }} | {{ TAM_O }} |
| Taxa de ocupação | {{ OCP_C }}% | {{ OCP_M }}% | {{ OCP_O }}% |
| Receita Bruta/mês | R$ {{ RB_C }} | R$ {{ RB_M }} | R$ {{ RB_O }} |
| Lucro Líquido/mês | R$ {{ LL_C }} | R$ {{ LL_M }} | R$ {{ LL_O }} |
| Payback estimado | {{ PB_C }} meses | {{ PB_M }} meses | {{ PB_O }} meses |

> _*Os resultados podem variar. Os valores são projeções baseadas no modelo operacional Nalata e dados do território mapeado. Não constituem garantia de rendimento._

---

### [APRESENTADOR — Fala dos Cenários]

> _"Eu sempre apresento três cenários._
> _O conservador, porque eu respeito o seu dinheiro e não vou te vender sonho._
> _O moderado, porque é onde a maioria dos nossos franqueados se encontra no 6° mês._
> _E o otimista, porque sim — ele acontece, e quando acontece,_
> _os franqueados voltam aqui pedindo para expandir o território._
> _Qual desses cenários você imagina para {{ CIDADE/BAIRRO/REGIÃO }}?"_

**Técnica aplicada:** *Escolha dentro do 'Sim' + Pergunta de Engajamento*
Ao perguntar qual cenário o investidor imagina para si, você não pergunta SE ele vai investir — você pergunta COMO será quando ele investir. O 'não' sai do mapa mental.

---

## FASE 7 — DIFERENCIAIS COMPETITIVOS DA NALATA

### [DADOS — Por que Nalata e não uma caçamba tradicional?]

| | Caçamba Tradicional | 🟢 Nalata Descarte Inteligente |
|---|---|---|
| Espaço físico necessário | Grande (ocupa calçada/rua) | Mínimo (tambor 200L) |
| Velocidade de instalação | Horas / autorização prefeitura | Imediata |
| Acesso em condomínios verticais | Impossível | Projetado para isso |
| Certificação ambiental ao cliente | Não oferece | Inclusa no serviço |
| Fidelização do cliente | Baixa | Alta (contrato recorrente) |
| Receita para o franqueado | Por evento (esporádica) | Mensal (recorrente) |

---

### [APRESENTADOR — Fala dos Diferenciais]

> _"A caçamba não é concorrente da Nalata. Ela é o problema que a Nalata resolve._
> _Um prédio vertical não consegue usar caçamba no corredor do décimo andar._
> _Um condomínio não quer uma caçamba bloqueando a garagem._
> _A Nalata entra onde a caçamba não pode entrar._
> _Isso não é nicho — é um **mercado inteiro esperando por você**."_

**Técnica aplicada:** *Reframing de Competição + Criação de Categoria*
Eliminar a concorrência ao redefinir o mercado-alvo tira a objeção de "já tem muita concorrência" antes que ela apareça.

---

## FASE 8 — O QUE VEM COM A FRANQUIA

### [DADOS — Suporte Nalata ao Franqueado]

- ✅ **Marca e posicionamento** já validados no mercado
- ✅ **Treinamento operacional** completo (presencial + online)
- ✅ **Suporte em marketing digital** e captação de clientes
- ✅ **Sistema de gestão** de coletas e clientes
- ✅ **Central de atendimento** de apoio ao franqueado
- ✅ **Rede de destinação** de resíduos já homologada
- ✅ **Exclusividade de território** na área contratada
- ✅ **Manual de operações** e processos documentados
- ✅ **Consultoria contínua** de crescimento

---

### [APRESENTADOR — Fala do Suporte]

> _"Você não vai começar do zero._
> _A Nalata já errou, corrigiu e documentou tudo isso para você._
> _Você não paga para testar — você paga para já chegar com o mapa nas mãos._
> _É como entrar numa corrida que já passou da curva perigosa."_

**Técnica aplicada:** *Transferência de Risco + Metáfora Visual*
O investidor mede risco. Mostrar que o risco foi absorvido pela franqueadora ativa o sistema de recompensa sem o freio do medo.

---

## FASE 9 — OBJEÇÕES PREVISÍVEIS E RESPOSTAS

### [APRESENTADOR — Como lidar com as principais objeções]

---

**Objeção 1: "Não tenho experiência no setor."**

> _"Perfeito — e você não precisa ter._
> _A Nalata não é uma empresa de engenharia. É um negócio de logística e relacionamento._
> _Os nossos melhores franqueados vieram de vendas, de gestão, de pessoas._
> _O entulho é só o produto. O negócio é a solução que você entrega ao cliente."_

---

**Objeção 2: "O investimento está alto para mim agora."**

> _"Entendo. Mas me deixa fazer uma conta com você._
> _Se você deixar esse valor na poupança por 15 meses, ele rende X._
> _Se você montar a operação Nalata com ele, em 15 meses ele já voltou inteiro para você — e o negócio continua gerando._
> _O custo real não é investir. O custo real é esperar."_

**Técnica aplicada:** *Inversão de Custo de Oportunidade (Loss Aversion)*

---

**Objeção 3: "Preciso pensar mais."**

> _"Claro. E eu respeito isso._
> _Mas posso te dizer uma coisa? Essa região aqui — {{ CIDADE/BAIRRO/REGIÃO }} —_
> _está no radar de outros candidatos também._
> _A exclusividade de território é por contrato. Quem assina primeiro, opera com exclusividade._
> _Eu não quero te apressar. Só quero que você tome a decisão com essa informação em mãos."_

**Técnica aplicada:** *Escassez Legítima + Urgência sem Pressão*

---

**Objeção 4: "E se não der certo?"**

> _"Boa pergunta. Vamos olhar para o cenário conservador que montamos juntos._
> _Mesmo no cenário mais travado, com {{ TAM_C }} tambores e {{ OCP_C }}% de ocupação,_
> _o negócio cobre seus custos e gera renda._
> _O risco zero não existe — nem no emprego CLT. Mas aqui, você controla._
> _E controle, na vida financeira, é o ativo mais valioso que existe."_

**Técnica aplicada:** *Validação da Objeção + Autonomia como Valor*

---

## FASE 10 — FECHAMENTO E PRÓXIMOS PASSOS

### [APRESENTADOR — Fala de Fechamento]

> _"Deixa eu resumir o que construímos juntos aqui:_
> _— Um mercado de **70 milhões de toneladas** que não vai a lugar nenhum;_
> _— Um território em **{{ CIDADE/BAIRRO/REGIÃO }}** com {{ SCORE }}/10 de potencial mapeado;_
> _— Um modelo com **{{ MARG_L }}% de margem líquida** e payback de **{{ PAYBACK }} meses**;_
> _— Uma operação de **2 pessoas** que você pode gerenciar;_
> _— Uma franqueadora que já fez o trabalho duro para você._
> _A pergunta que fica é só uma:_
> _Você quer que esse território seja seu — ou prefere ver outro franqueado operando aqui daqui a 6 meses?"_

**Técnica aplicada:** *Resumo de Valor (Recapitulação Cognitiva) + Pergunta de Fechamento por Visualização de Perda*

---

### [DADOS — Próximos Passos Concretos]

| Etapa | Ação | Prazo |
|---|---|---|
| 1 | Envio da proposta formal e COF (Circular de Oferta) | Imediato |
| 2 | Análise do contrato pelo candidato | 7 dias |
| 3 | Visita à operação matriz em São José dos Campos | A combinar |
| 4 | Assinatura do contrato e reserva de território | {{ DATA_PREVISTA }} |
| 5 | Início do treinamento e setup da operação | {{ DATA_INICIO }} |
| 6 | Go-live — primeira coleta no território | {{ DATA_GOLIVE }} |

---

## APÊNDICE — GLOSSÁRIO DO ROTEIRO

| Termo | Significado no Contexto |
|---|---|
| **DRE Simplificado** | Demonstrativo de Resultado do Exercício — mostra receitas, custos e lucro de forma objetiva |
| **Receita Recorrente** | Receita que se repete todos os meses sem nova venda (contratos mensais) |
| **Payback** | Tempo para recuperar o investimento inicial com o lucro gerado |
| **ROI** | Retorno sobre o investimento — quanto % o capital retornou em determinado período |
| **EBITDA** | Lucro antes de juros, impostos, depreciação e amortização — mede eficiência operacional |
| **ATT** | Área de Transbordo e Triagem — destino legal para resíduos de construção |
| **Taxa de Ocupação** | % dos tambores disponíveis que estão ativamente em uso/locação |
| **Score Nalata™** | Índice interno de potencial de mercado por território, gerado pelo simulador |
| **Capital de Giro** | Reserva financeira para operar nos primeiros meses antes da receita estabilizar |

---

## NOTAS TÉCNICAS PARA O APRESENTADOR

### Sobre o uso do Simulador (nalata-insights-dashboard.lovable.app)

1. **Antes da reunião:** Acesse o painel, selecione o território solicitado e exporte os dados dos campos `{{ }}`.
2. **Durante a apresentação:** Use os dados do simulador para preencher os blocos em tempo real — isso gera percepção de personalização e análise séria.
3. **Regra dos 3 cenários:** Sempre apresente conservador, moderado e otimista. Nunca apresente apenas o melhor cenário — isso destrói credibilidade.
4. **Validação legal:** Reforce sempre o disclaimer: _"Os valores são projeções e não garantias de rendimento. O sucesso depende da gestão e dedicação do franqueado."_

### Princípios de Neurovendas Aplicados neste Roteiro

| Princípio | Onde Aparece |
|---|---|
| **Ancoragem** | Dado de R$7bi antes de falar o investimento |
| **Social Proof** | Dados de mercado (ABRECON/SINDUSCON) + franqueados existentes |
| **Scarcity** | Exclusividade de território |
| **Future Pacing** | Perguntas que colocam o investidor dentro da operação |
| **Loss Aversion** | Custo de oportunidade (poupança vs franquia) |
| **Contrast** | Caçamba tradicional vs Nalata |
| **Authority** | Nalata na mídia + dados oficiais |
| **Reciprocity** | Apresentação gratuita + análise personalizada do território |
| **Commitment** | Micro-comprometimentos ao longo da conversa |
| **Story** | Origem familiar da empresa (DNA + paixão por sustentabilidade) |

---

*Documento desenvolvido para uso interno pela equipe Nalata Descarte Inteligente.*
*Versão: 1.0 | Uso: Simulações de franquia por território*
*Os dados com `{{ }}` devem ser preenchidos com informações do simulador Nalata Insights Dashboard antes de cada apresentação.*
