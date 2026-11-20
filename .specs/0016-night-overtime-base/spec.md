# 0016 — Adicional noturno na base da hora extra noturna

> Owner: product-manager · Gate: `spec`

## Problem

No estado-base `5c0c6fa`, a calculadora somava a hora extra sobre a hora diurna e o adicional noturno ordinário como parcelas independentes. Os controles abaixo tinham os mesmos 600 minutos creditados, 120 minutos extras e 120 minutos noturnos creditados e recebiam R$ 68,00 cada. O controle B tinha também sobreposição entre noite e hora extra e recebia R$ 4,00 a menos do que exigem a OJ 97 da SBDI-1 e o Tema 288 do IRR do TST.

## Audience & moment

Pessoa trabalhadora CLT que encerrou ou está acompanhando uma jornada com horas extras entre 22:00 e 05:00 e consulta, no resumo do dia, quanto essas horas valem.

## Outcome

Para a mesma jornada e o mesmo salário-hora, o resumo distingue minutos extras diurnos de minutos extras noturnos e calcula, até o centavo, a integração juridicamente exigida apenas sobre a interseção real entre o período noturno creditado e cada faixa de hora extra.

## Scope

- Representar cronologicamente a interseção entre trabalho noturno creditado e hora extra, separada por faixa de adicional de hora extra.
- Corrigir os valores visíveis de hora extra, adicional noturno e o valor variável que alimenta o DSR, sem duplicar o adicional noturno ordinário já exibido.
- Cobrir jornadas concluídas por saída manual e jornadas em andamento avaliadas no mesmo instante.
- Cobrir a fronteira de 120 minutos entre faixas, a passagem da meia-noite, os limites 22:00 e 05:00 e intervalos não remunerados total ou parcialmente sobrepostos.
- Preservar a janela noturna vigente de 22:00–05:00 e a hora reduzida já calculada pelo produto.
- Acrescentar testes permanentes de unidade e componente com controles positivos, negativos e contagem explícita dos casos exercitados.
- Atualizar a evidência jurídica e a divulgação ao usuário somente no que o gate G2 demonstrar necessário.

## Out of scope

- Alterar percentuais de hora extra, o limite de 120 minutos ou o roteamento de faixas por dia da semana; essa fronteira pertence à `.specs/0012-saturday-overtime-tier/` e deve estar entregue antes desta implementação, ou os testes desta spec devem usar explicitamente a segunda-feira.
- Alterar o divisor mensal ou a derivação do salário-hora; essa fronteira pertence à `.specs/0007-sumula-431-citation-scope/`.
- Reestruturar o registro geral de fontes; essa fronteira pertence à `.specs/0003-citation-registry/`. Esta spec apenas registra ou referencia a fonte que G2 aprovar.
- Implementar a prorrogação do adicional após 05:00 prevista na Súmula 60 II; o produto continua deliberadamente limitado à janela 22:00–05:00.
- Alterar a fórmula de DSR. Somente a entrada de remuneração variável corrigida deve chegar ao cálculo existente.
- Alterar incidência tributária, acúmulo mensal, histórico, feriados, banco de convenções coletivas ou qualquer layout não exigido por uma lacuna demonstrada em G2/G3.

## Acceptance criteria

| # | Criterion | How it is verified |
|---|---|---|
| AC1 | Antes de qualquer implementação, `.specs/0016-night-overtime-base/legal.md` fecha a norma aplicável, a fonte oficial, o domínio, a fórmula, a ordem de arredondamento e a forma de evitar dupla contagem; o gate `law` passa sem ressalva. | Revisão bloqueante do `labor-law-analyst` contra a fonte oficial do TST e atualização de `.specs/0016-night-overtime-base/STATUS.md`. |
| AC2 | No controle A — segunda-feira, 06/01/2025, entrada 22:00, intervalo 23:45–05:00, saída 13:00 do dia seguinte, jornada prevista de 480 min, salário-hora R$ 20,00 e faixa de 50% — o sistema deriva exatamente 600 min creditados, 120 min extras, 120 min noturnos creditados, 0 min na interseção noite∩extra e mantém R$ 68,00 de remuneração variável antes do DSR. | Teste permanente deriva e afirma todos os cinco operandos antes do valor. O conjunto afirma exatamente um controle A, não aceita conjunto vazio e espera R$ 68,00. |
| AC3 | No controle B — segunda-feira, 06/01/2025, entrada 13:00, intervalo 21:00–22:00, saída 23:45, com os mesmos demais parâmetros — o sistema deriva exatamente 600 min creditados, 120 min extras, 120 min noturnos creditados e 120 min na interseção noite∩extra; a remuneração variável antes do DSR passa de R$ 68,00 no estado-base para R$ 72,00 no estado entregue: R$ 60,00 de hora extra + R$ 8,00 de adicional noturno ordinário + R$ 4,00 de integração. | Teste permanente afirma os operandos e as três parcelas separadamente. A matriz afirma exatamente um controle B e falha se o valor entregue continuar em R$ 68,00. |
| AC4 | Os controles A e B continuam iguais em minutos totais, minutos extras e minutos noturnos; somente a posição cronológica muda. Portanto, uma implementação baseada em `min(minutosNoturnos, minutosExtras)` ou que multiplique toda hora extra por 1,20 não satisfaz a spec. | Teste relacional compara os dois controles, afirma as três igualdades e a diferença 0 min versus 120 min de interseção antes de comparar R$ 68,00 versus R$ 72,00. |
| AC5 | A interseção é atribuída à faixa correta quando cruza 119, 120 e 121 minutos de hora extra; cada faixa usa seu próprio percentual e nenhum minuto é contado duas vezes. | Teste de tabela declara 3 casos esperados, afirma `measured + exempt = 3` e verifica minutos e centavos por faixa. |
| AC6 | Os limites 21:59/22:00 e 04:59/05:00, a passagem da meia-noite e um intervalo não remunerado inteiro ou parcial dentro da possível interseção não geram minutos fantasmas. | Teste de tabela deriva o conjunto da obrigação, declara a contagem esperada antes da iteração e afirma a interseção de cada célula; zero casos nunca é aprovação. |
| AC7 | Uma saída manual e uma jornada em andamento observada exatamente no mesmo timestamp produzem os mesmos minutos de interseção, as mesmas faixas e os mesmos centavos. | Teste pareado fixa todos os operandos, incluindo `now`, e compara a saída completa dos dois caminhos. |
| AC8 | O DSR recebe a remuneração variável corrigida, inclusive os R$ 4,00 do controle B, mas sua fórmula, calendário e hipóteses permanecem os existentes. | Teste de componente verifica a base entregue ao cálculo de DSR e um controle diurno de não regressão; revisão do diff confirma ausência de mudança na fórmula de DSR. |
| AC9 | A janela 22:00–05:00 e a exclusão deliberada da prorrogação após 05:00 permanecem explícitas e testadas; nenhuma mudança de regra de `0003`, `0007` ou `0012` entra neste diff sem nova decisão registrada. | `node_modules/.bin/vitest run __tests__/night-shift.test.ts __tests__/day-breakdown.test.ts __tests__/day-summary.test.tsx __tests__/use-work-calculator.test.ts` passa junto dos novos testes; o comando foi validado neste estado com 4 arquivos e 77 testes aprovados. |

## Numeric discrimination evidence

Estado da árvore: lógica remota no topo `5c0c6fa`; reprodução feita em 19/11/2026 no snapshot isolado `/tmp/workload-stack-review.GANNze`, que também contém ajustes locais da revisão da stack sem alteração desta fórmula. Estado da aplicação em ambos os controles: segunda-feira, jornada prevista de 480 min, salário-hora de R$ 20,00, primeira faixa de 50%, saída manual e sem DSR incluído no número comparado.

Um teste temporário de G1, consumido na sessão e removido depois, chamou `buildDayBreakdown`, `overtimePay` e `nightPremiumPay` do próprio snapshot e imprimiu:

```text
{"baselineA":68,"correctA":68,"baselineB":68,"correctB":72}
```

- Estado conhecido-bom: controle A. O defeito é ausente porque seus 120 min extras são diurnos; a fórmula atual e a regra corrigida retornam R$ 68,00.
- Estado conhecido-ruim: controle B. Seus 120 min extras são noturnos; a fórmula atual ainda retorna R$ 68,00, enquanto a integração move a quantidade em R$ 4,00 para R$ 72,00.
- Lever desta spec: minutos creditados na interseção noite∩extra por faixa. No controle B, `120/60 × 20 × 0,20 × 0,50 = R$ 4,00`; no controle A, o mesmo termo é zero.
- Margem e ruído: cálculo determinístico em centavos, sem amostragem temporal; a margem observada de R$ 4,00 é maior que o spread de R$ 0,00 entre repetições determinísticas.

## Evidence available

| Claim | Source |
|---|---|
| O adicional noturno integra a base das horas extraordinárias prestadas no período noturno. | Tema 288 do IRR do TST, reafirmando a OJ 97 da SBDI-1; a URL e a versão consultada constam em `.specs/0016-night-overtime-base/legal.md`. |
| O estado-base soma hora extra e adicional noturno como parcelas independentes, sem representar a interseção. | `components/organisms/day-summary.tsx`, função `DaySummary`, no estado `5c0c6fa`. |
| Os dois controles derivam 600 min creditados, 120 min extras e 120 min noturnos; a fórmula atual retorna R$ 68,00 nos dois. | Reprodução temporária de G1 descrita em “Numeric discrimination evidence”. |
| A suíte de regressão diretamente relacionada opera neste snapshot. | Execução em 19/11/2026: 4 arquivos, 77 testes aprovados pelo comando de AC9. A execução 2 de G6 aprovou 90 testes nos mesmos arquivos. Ver [.specs/0016-night-overtime-base/reports/qa.md](reports/qa.md). |
| A fonte oficial está acessível na Jornada. | A execução 2 de G6 verificou o nome acessível, a navegação por teclado e o endereço do link. Ver [.specs/0016-night-overtime-base/reports/audit.md](reports/audit.md) e [.specs/0016-night-overtime-base/reports/legal.md](reports/legal.md). |

## Decisions

| Question | Default chosen | Why |
|---|---|---|
| A integração aparece como uma linha própria ou incorporada ao valor da hora extra? | A integração compõe o valor da própria faixa. Uma legenda condicional abaixo dos valores explica a base. | O valor deve ficar correto primeiro; a interface não deve expor jargão nem contar o adicional ordinário duas vezes. |
| Em que etapa cada parcela é arredondada? | Os valores mantêm precisão até a apresentação ou o resultado final. O DSR recebe a soma integral. | Arredondamento muda centavos e é matéria de correção jurídica/financeira. |
| Como a pessoa chega à fonte? | O rodapé de Jornada mostra “Horas extras noturnas: Tema 288 do TST (OJ 97).” com o destino oficial registrado em `lib/legal-tables.ts`. | G6 confirmou o texto, o destino e o acesso por teclado. |
