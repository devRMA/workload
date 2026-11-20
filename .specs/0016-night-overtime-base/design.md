# 0016 — Design: adicional noturno na base da hora extra noturna

> Owner: product-designer · Gate: `design` · Run: 1 · Data: 2026-11-19

## Veredito

**PASS.** A correção não pede um novo componente, uma nova linha, uma nova cor nem uma mudança de hierarquia. O produto cruzado definido em `legal.md` entra no valor monetário da faixa de hora extra à qual seus minutos pertencem. A linha existente de adicional noturno continua mostrando somente o adicional noturno ordinário.

Essa composição mantém a resposta no lugar onde a pessoa já a procura e evita transformar uma obrigação de cálculo em jargão visual. A pessoa não precisa reconhecer “OJ 97” ou “produto cruzado” para receber o valor correto.

## Decisão de apresentação

O bloco financeiro de `DaySummary` mantém os três tipos de linha abaixo.

| Linha | Duração mostrada | Valor mostrado | O que não entra |
|---|---|---|---|
| `Extra {taxa}%` | todos os minutos creditados da faixa | hora extra já calculada para a faixa **mais** a integração do adicional noturno correspondente somente aos minutos noturnos extraordinários dessa faixa | adicional noturno ordinário |
| `Adicional noturno 20%` | todos os minutos noturnos creditados da jornada | adicional noturno ordinário sobre esses minutos | produto cruzado da hora extra |
| `DSR sobre os extras` | nenhuma duração | resultado da fórmula existente sobre a remuneração variável integral, já corrigida | qualquer nova fórmula ou hipótese |

No controle B de `legal.md`, a primeira linha mostra R$ 64,00, a linha noturna mostra R$ 8,00 e a remuneração variável antes do DSR totaliza R$ 72,00. No controle A, as mesmas linhas permanecem R$ 60,00 e R$ 8,00. Essa diferença é o sinal visual do cálculo cronológico correto; não se cria uma quarta linha de R$ 4,00.

## Hierarquia e leitura

- O cartão, o título “Seu Dia”, a ordem das seções e a ordem das linhas permanecem como entregues.
- Cada faixa continua usando uma única linha `text-body-sm`, com duração no primeiro campo numérico e dinheiro no campo monetário alinhado à direita.
- O valor corrigido continua em `numeric font-semibold text-positive-ink`, porque é remuneração positiva e porque todo dinheiro precisa obedecer à Tabular Rule de `DESIGN.md`.
- `IconBolt` e a família visual de hora extra permanecem na linha da faixa. O incremento pertence ao valor daquela hora extra; usar uma segunda `IconMoonStars` sugeriria incorretamente um segundo adicional noturno ordinário.
- A linha `Adicional noturno 20%` conserva `IconMoonStars` e a duração noturna total. Ela não absorve nem repete o produto cruzado.
- Uma legenda condicional entre os valores de hora extra e adicional noturno e o DSR explica a base de cálculo. Ela usa `text-caption text-ink-subtle text-pretty`.

## Estados

| Estado | Resultado visual |
|---|---|
| Salário-hora desconhecido | As durações continuam visíveis; nenhum valor em reais aparece, e o convite existente para calcular o valor da hora permanece. |
| Sem interseção noite∩extra | O valor da faixa permanece byte a byte equivalente ao cálculo anterior; a linha noturna continua independente. |
| Com interseção em uma faixa | Somente o valor monetário dessa faixa cresce pelo produto cruzado correspondente. |
| Com interseção nas duas faixas | Cada linha recebe apenas o produto cruzado dos próprios minutos e da própria taxa. |
| Sem remuneração variável | O DSR permanece ausente, como hoje. |
| Jornada inválida | `DaySummary` permanece suprimido pelo fluxo existente; nenhum resultado parcial é apresentado. |

## Responsividade, temas e acessibilidade

- A legenda e a fonte do rodapé ocupam parágrafos de fluxo normal e seguem as larguras responsivas existentes. A auditoria de G6 verificou a composição em 390, 768, 1440, 2560 e 3840 px nos dois temas. [.specs/0016-night-overtime-base/reports/audit.md](reports/audit.md)
- Não há token novo. Light e dark usam as mesmas classes sem novas combinações de contraste.
- O comportamento de anúncio do resumo permanece como entregue. Não se adiciona uma live region exclusiva para o incremento, porque ele é parte do valor da faixa e um segundo anúncio duplicaria a mesma remuneração.
- O texto e o ícone continuam sendo canais redundantes para identificar cada linha; cor não passa a carregar significado novo.
- A moeda continua formatada em pt-BR e cada quantidade conserva algarismos tabulares.

## Limites para implementação e revisão

- A UI recebe por faixa os minutos totais, os minutos noturnos extraordinários e o valor integral não arredondado; ela não reconstitui a interseção pela aparência nem por totais agregados.
- A apresentação arredonda apenas no limite já usado por `formatCurrency`. A base do DSR não pode ser reconstruída a partir do texto formatado.
- Um teste de componente deve demonstrar os controles A e B pela saída observável: mesmos minutos nas linhas, R$ 60,00/R$ 8,00 no A e R$ 64,00/R$ 8,00 no B, além da base corrigida do DSR. O teste não afirma classes Tailwind.
- O rodapé existente de Jornada inclui um parágrafo com a fonte oficial e reutiliza o tratamento visual e de foco dos links do próprio rodapé. O texto consta em [.specs/0016-night-overtime-base/copy.md](copy.md).

## Mudança no sistema

Nenhuma. `DESIGN.md` permanece válido sem emenda: a correção reutiliza a hierarquia, as linhas, os ícones, os tokens, a tipografia e os estados já definidos para `DaySummary`.

## Decisão final do gate

G3 design passa na execução 1. A implementação deve incorporar o produto cruzado ao valor da faixa de hora extra, preservar a linha noturna ordinária e não criar uma linha autônoma de “integração”.
