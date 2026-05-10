# Contexto Técnico — Territórios Nalata

Esta pasta contém os arquivos de referência técnica para cada território mapeado pela Nalata Descarte Inteligente. Cada arquivo `.md` documenta o contexto de mercado, dados operacionais e premissas de simulação de uma cidade ou região.

## Como usar

1. Antes de uma apresentação, abra o arquivo do território correspondente
2. Use os dados para preencher o simulador em [nalata-insights-dashboard.lovable.app](https://nalata-insights-dashboard.lovable.app/)
3. Ou selecione a cidade no **dropdown do cabeçalho** do dashboard para carregar os dados automaticamente

## Territórios disponíveis

| Arquivo | Cidade | Score Nalata™ | Potencial |
|---|---|---|---|
| [sao_jose_dos_campos_SP.md](./sao_jose_dos_campos_SP.md) | São José dos Campos — SP | 8.5/10 | Alto |
| [campinas_SP.md](./campinas_SP.md) | Campinas — SP | 9.2/10 | Muito Alto |
| [ribeirao_preto_SP.md](./ribeirao_preto_SP.md) | Ribeirão Preto — SP | 7.8/10 | Médio-Alto |
| [sorocaba_SP.md](./sorocaba_SP.md) | Sorocaba — SP | 7.5/10 | Médio |
| [sao_paulo_zona_leste_SP.md](./sao_paulo_zona_leste_SP.md) | São Paulo — Zona Leste | 9.8/10 | Altíssimo |

## Estrutura de cada arquivo

- **Dados do Território** — tabela com todos os campos `{{ }}` do roteiro
- **Perfil de Mercado** — contexto local, drivers de demanda, segmentos prioritários
- **Análise Competitiva Local** — concorrentes e vantagens Nalata
- **Premissas para Simulação** — ticket, markup, modo e cenário recomendados

## Adicionando novos territórios

Copie qualquer arquivo existente como template, renomeie para `cidade_UF.md` e preencha com os dados do novo território. O dropdown do dashboard é atualizado em `src/data/territorios.ts`.
