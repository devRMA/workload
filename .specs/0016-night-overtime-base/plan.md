# 0016 — Plano de implementação: adicional noturno na hora extra noturna

> Owner: tech-lead · Gate: `plan` · Run: 1 · Data: 2026-11-19

## Veredito

**PASS.** G1 fixou o escopo, G2 fixou a norma, a fórmula e a ordem de arredondamento, e G3 fixou a apresentação. Este plano apenas decompõe essas decisões. O `frontend-dev` não escolhe fórmula, fronteira, texto, fonte ou estrutura durante a implementação; qualquer ambiguidade volta ao tech-lead em `STATUS.md`.

O defeito é corrigido com uma única fonte de verdade para a cronologia: `lib/night-shift.ts` passa a alocar os deltas de minutos noturnos creditados às faixas de hora extra pelas mesmas janelas noturnas recortadas usadas na contagem canônica. Nenhuma solução por `min(totalNoturno, totalExtra)`, por presença de noite na jornada ou por arredondamento de fragmentos satisfaz este plano.

## 1. Arquitetura

### 1.1 Fluxo entregue

```text
entrada → trecho antes do intervalo ─┐
                                     ├─ janelas noturnas recortadas pelos trechos de trabalho
intervalo não remunerado (excluído) ─┤       │
                                     │       ├─ crédito acumulado total
saída ← trecho depois do intervalo ──┘       └─ crédito noturno acumulado (60/52,5, uma conversão cumulativa)
                                                     │
                          [previsto, previsto + faixa 1) → firstTierNightMinutes
                          [fim da faixa 1, fim jornada)  → extraTierNightMinutes
                                                     │
                WorkStats → DaySummary → produto cruzado em cada linha Extra → variável integral → DSR existente
```

`calculateSuggestedExit` não participa dessa atribuição. Ele é deliberadamente limitado a sugerir uma saída depois do intervalo e, portanto, não representa corretamente uma jornada cujo limite previsto seja alcançado antes do almoço. A nova regra usa os próprios trechos trabalhados e funciona nos dois lados do intervalo.

### 1.2 Contratos

#### `lib/night-shift.ts`

Adicionar:

```ts
export interface NightOvertimeTiers {
  firstTierNightMinutes: number;
  extraTierNightMinutes: number;
}

export function splitNightOvertimeByTier(input: {
  entryDate: Date;
  lunchStartDate: Date;
  lunchEndDate: Date;
  exitDate: Date;
  expectedMinutes: number;
  firstTierMinutes: number;
}): NightOvertimeTiers;

export function nightOvertimePremiumPay(
  nightOvertimeMinutes: number,
  hourlyRate: number,
  overtimeRatePercent: number,
): number;
```

`splitNightOvertimeByTier` e `countNightMinutes` usam os trechos não vazios `[entry, min(lunchStart, exit))` e `[lunchEnd, exit)` e recortam as mesmas janelas locais `[22:00, 05:00)`. A busca de cada trecho parte da data anterior para incluir uma janela em andamento. A repartição retorna os dois campos zerados para datas inválidas, ordem inválida ou jornada vazia.

Para cada sobreposição noturna, `creditedBefore` soma os minutos reais de trabalho até o começo da sobreposição, desconta o acumulado de minutos reais noturnos e acrescenta a conversão cumulativa desses minutos. `creditedAfter` acrescenta a diferença entre as conversões cumulativas do fim e do começo da sobreposição. O intervalo `[creditedBefore, creditedAfter)` é todo noturno e sua interseção é alocada em:

- primeira faixa: `[expectedMinutes, expectedMinutes + firstTierMinutes)`;
- faixa excedente: `[expectedMinutes + firstTierMinutes, +∞)`.

O acumulado preserva a distribuição dos créditos de hora reduzida na fronteira da faixa, inclusive quando um minuto real libera dois créditos. A duração real da sobreposição usa os minutos inteiros do mesmo recorte empregado na contagem canônica. Ao final devem valer, e os testes devem afirmar, `0 ≤ firstTierNightMinutes ≤ firstTierMinutes`, `0 ≤ extraTierNightMinutes ≤ extraTierMinutes` e soma das faixas igual aos créditos noturnos efetivamente extraordinários.

`nightOvertimePremiumPay` retorna, sem arredondar:

```text
(minutos / 60) × salário-hora × 0,20 × (percentual-extra / 100)
```

O comentário junto aos operandos em `lib/night-shift.ts` identifica o art. 73 e o Tema 288/OJ 97. `NIGHT_OVERTIME_SOURCE` guarda o nome e a URL oficial do precedente em `lib/legal-tables.ts`.

#### `hooks/use-work-calculator.ts`

Ampliar `WorkStats` com `firstTierNightMinutes` e `extraTierNightMinutes`. Em `calculateWorkStats`:

1. construir o `breakdown` canônico;
2. calcular `firstTierMinutes` e `extraTierMinutes` com `splitOvertime`, sem mudar sua política;
3. chamar `splitNightOvertimeByTier` com as datas da jornada, `breakdown.expectedMinutes` e os **minutos creditados já atribuídos à primeira faixa** (`firstTierMinutes`);
4. retornar os sete operandos juntos.

No sábado/domingo, `splitOvertime` já retorna `firstTierMinutes = 0`; portanto todo minuto noturno extraordinário cai na faixa excedente sem introduzir regra nova nesta spec. A correção do roteamento de sábado continua pertencendo a `0012`.

#### `components/organisms/work-calculator.tsx`

Passar os dois novos campos de `stats` para `DaySummary`. Não rederivar horários, minutos ou interseções no componente.

#### `components/organisms/day-summary.tsx`

Adicionar os dois campos às props. Para cada faixa, somar ao `overtimePay` existente apenas o retorno não arredondado de `nightOvertimePremiumPay` daquela faixa. `nightPremiumPay` continua inalterado e continua cobrindo o adicional ordinário uma única vez.

`variablePay` permanece a soma dos dois valores integrais de faixa e do adicional noturno ordinário. Como os valores de faixa já carregam o produto cruzado, a chamada existente a `restDayPayOnOvertime` recebe a base corrigida sem qualquer mudança em `lib/weekly-rest.ts`.

Renderizar, depois das três linhas monetárias e antes do DSR, exatamente uma legenda:

> A hora extra feita à noite é calculada sobre a hora já com o adicional noturno.

Somente quando `grossHourlyRate !== null` e `firstTierNightMinutes + extraTierNightMinutes > 0`. Usar `text-caption text-ink-subtle text-pretty`; não adicionar linha monetária, ícone, tooltip, modal, live region ou referência normativa inline.

#### `components/organisms/calculator-views.tsx`

No rodapé de Jornada, após as fontes fiscais, exibir “Horas extras noturnas: Tema 288 do TST (OJ 97).”. O trecho “Tema 288 do TST (OJ 97)” é o link de `NIGHT_OVERTIME_SOURCE`, com o tratamento visual e de foco dos links existentes.

### 1.3 Dependências e arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `lib/night-shift.ts` | editar | alocação cronológica cumulativa e produto cruzado |
| `hooks/use-work-calculator.ts` | editar | compor faixas totais e noturnas no `WorkStats` |
| `components/organisms/work-calculator.tsx` | editar | transportar os operandos, sem cálculo |
| `components/organisms/day-summary.tsx` | editar | calcular valores não arredondados, legenda e base do DSR |
| `__tests__/night-shift.test.ts` | editar | unidade da cronologia, conservação e fórmula |
| `__tests__/use-work-calculator.test.ts` | editar | controles A/B, faixas, inválidos e live/manual |
| `__tests__/day-summary.test.tsx` | editar | valores visíveis, legenda e DSR |
| `components/organisms/calculator-views.tsx` | editar | expor o link oficial no rodapé de Jornada |
| `lib/legal-tables.ts` | editar | registrar o nome e o endereço oficial do precedente trabalhista |
| `__tests__/calculator-views.test.tsx` | editar | verificar nome acessível, endereço e visibilidade por rota |
| `.specs/0001-foundation/legal.md`, `.specs/0001-foundation/plan.md`, `.specs/0001-foundation/spec.md`, `.specs/0001-foundation/copy.md` | editar | reconciliar a regra reconstruível da fundação após a correção |

Nenhuma dependência npm nova. `lib/day-breakdown.ts`, `lib/payroll.ts`, `lib/weekly-rest.ts`, percentuais, limite de 120 minutos e layout permanecem sem alteração.

## 2. Tarefas

### T2 — Modelar a interseção cronológica por faixa

- **Arquivos:** `lib/night-shift.ts`, `__tests__/night-shift.test.ts`.
- **Implementar:** os contratos de §1.2, com um único acumulador de hora reduzida para toda a jornada e alocação pelo intervalo de créditos antes e depois de cada sobreposição noturna.
- **Matriz unitária obrigatória:**
  - controles A/B, afirmando 120 minutos noturnos totais em ambos e interseções `0/0` versus `120/0`;
  - 104, 105 e 106 minutos reais noturnos após 480 diurnos, que produzem 119, 120 e 121 créditos: resultados `119/0`, `120/0`, `120/1`;
  - minuto iniciado 21:59 versus 22:00 e 04:59 versus 05:00;
  - passagem da meia-noite sem reinício de faixa e conservação diante de uma transição histórica de fuso que deixa um minuto atravessar 05:00;
  - intervalo inteiro dentro, parcialmente dentro e fora da potencial interseção;
  - noite sem extra, extra sem noite e entrada inválida, todos `0/0`;
  - fórmula monetária com zero, 50% e 100%, sem arredondamento interno.
- **Guardas da tabela:** declarar `expectedCases` antes da iteração, afirmar `measured + exempt === expectedCases`, afirmar os operandos de cada célula antes do resultado e nunca aceitar conjunto vazio.
- **Done when:** `node_modules/.bin/vitest run __tests__/night-shift.test.ts` passa e cobertura de `lib/night-shift.ts` permanece 100%.

### T3 — Integrar os operandos ao cálculo e à apresentação

- **Arquivos:** `hooks/use-work-calculator.ts`, `components/organisms/work-calculator.tsx`, `components/organisms/day-summary.tsx`, `__tests__/use-work-calculator.test.ts`, `__tests__/day-summary.test.tsx`, `lib/legal-tables.ts`, `components/organisms/calculator-views.tsx`, `__tests__/calculator-views.test.tsx`.
- **Implementar:** ampliar `WorkStats`/props, transportar campos, compor o produto cruzado na própria faixa, inserir a legenda condicional e deixar a fórmula de DSR intacta.
- **Controles A/B de domínio:** derive ambos os casos por `calculateWorkStats` e passe os resultados ao resumo antes de afirmar os valores. Nos dois casos, verifique `totalWorked = 600`, extra total `= 120`, `nightMinutes = 120`; A retorna `firstTierNightMinutes = 0`, B retorna `120`. Um teste relacional compara primeiro os três totais iguais e só então a interseção diferente.
- **Controle de componente A:** primeira faixa R$ 60,00, adicional noturno R$ 8,00, remuneração variável R$ 68,00; legenda ausente.
- **Controle de componente B:** primeira faixa R$ 64,00, adicional noturno R$ 8,00, remuneração variável R$ 72,00; legenda presente exatamente uma vez. O DSR de janeiro de 2025 deve refletir R$ 72,00, e o teste equivalente de A deve provar que a diferença de base chegou à fórmula existente.
- **Estados negativos:** legenda ausente com `grossHourlyRate = null`, com noite sem extra e com extra diurna; stats inválidos incluem os dois novos campos zerados.
- **Live/manual:** em `useWorkCalculator`, fixar o mesmo timestamp por fake timer e comparar o objeto `stats` completo de uma saída manual com o caminho automático observado naquele instante; ambos precisam produzir as mesmas faixas e os mesmos centavos quando entregues ao componente.
- **Faixas e fonte:** os controles monetários afirmam os três casos 119/120/121 e os centavos nas duas faixas. O teste do rodapé afirma o texto e a URL oficial em Jornada e a ausência do link em Custo da Hora.
- **Done when:** `node_modules/.bin/vitest run __tests__/use-work-calculator.test.ts __tests__/day-summary.test.tsx` passa.

### T4 — Reconciliar a documentação reconstruível

- **Arquivos:** `.specs/0001-foundation/legal.md`, `.specs/0001-foundation/plan.md`, `.specs/0001-foundation/spec.md`, `.specs/0001-foundation/copy.md`, `.specs/0016-night-overtime-base/STATUS.md`.
- **Implementar:** registrar Tema 288/OJ 97, a fórmula do produto cruzado, os dois novos campos de `WorkStats`, a legenda condicional e os controles A/B. Não alterar as regras pertencentes a `0003`, `0007` ou `0012`.
- **Done when:** `node .agents/tools/docs-check.mjs 0001-foundation` e `node .agents/tools/docs-check.mjs 0016-night-overtime-base` passam.

### T5 — Gates locais antes da revisão

Executar em cópia isolada que possua `.next` e porta próprias:

```bash
node_modules/.bin/vitest run __tests__/night-shift.test.ts __tests__/day-breakdown.test.ts __tests__/day-summary.test.tsx __tests__/use-work-calculator.test.ts
pnpm lint
pnpm typecheck
pnpm test:coverage
pnpm build
```

O primeiro comando parte de uma linha de base já executada neste snapshot em G1: **4 arquivos, 77 testes aprovados**. A entrega deve aumentar a contagem pelos casos acima; repetir 77 sem explicar a ausência dos novos casos é falha do gate. A build deve usar o mesmo modo da CI; falha ambiental de porta do Turbopack não é convertida em evidência de código e precisa ser reproduzida numa cópia/ambiente apto ou pela CI antes do merge.

## 3. Mapeamento de critérios

| Critério | Tarefa/prova |
|---|---|
| AC1 | `legal.md` passado antes deste plano; sem implementação até G2 |
| AC2–AC4 | T2 + T3, controles A/B e comparação relacional |
| AC5 | T2 + T3, tabela 119/120/121 com contagem explícita, minutos e centavos por faixa |
| AC6 | T2, matriz 22:00/05:00/meia-noite/intervalo |
| AC7 | T3, teste pareado do hook no mesmo timestamp |
| AC8 | T3, valores visíveis e DSR; diff vazio em `lib/weekly-rest.ts` |
| AC9 | T4 + T5, documentação, limites e suíte relacionada |

## 4. Restrições de revisão

- Rejeitar se os minutos noturnos extraordinários forem derivados apenas de totais agregados.
- Rejeitar se qualquer fragmento noturno for convertido por `nightEquivalentMinutes` de forma independente.
- Rejeitar se `firstTierNightMinutes > firstTierMinutes`, `extraTierNightMinutes > extraTierMinutes` ou se uma faixa receber créditos da outra.
- Rejeitar se o produto cruzado for somado à linha `Adicional noturno 20%`, exibido como quarta parcela ou arredondado antes de compor a faixa.
- Rejeitar se o DSR usar strings já formatadas, se `lib/weekly-rest.ts` mudar ou se a legenda aparecer sem dinheiro/interseção.
- Rejeitar se um teste verde não afirmar a quantidade de casos que percorreu.
- Rejeitar mudança em percentuais, no limite de 120, no roteamento semanal, na janela após 05:00 ou no divisor salarial.

## Decisão final do gate

G4 passou na execução 1. O plano incorpora as três correções da revisão de G6, cuja execução 2 foi aprovada. A publicação aguarda G8 e G9.

## Revisão 2 — correções encaminhadas por G6

- Em `lib/night-shift.ts`, usar os mesmos trechos efetivos e janelas 22:00–05:00 no total canônico e na interseção. Calcular o intervalo de créditos antes/depois de cada trecho noturno inteiro, preservando o acumulador e as mesmas interseções com as faixas. Isso substitui a varredura minuto a minuto, que penaliza datas distantes e diverge do total canônico em transições de fuso fora da grade de minutos.
- Em `components/organisms/calculator-views.tsx`, acrescentar “Horas extras noturnas: Tema 288 do TST (OJ 97).” ao rodapé de Jornada, via URL oficial em `lib/legal-tables.ts`. A legenda de `components/organisms/day-summary.tsx` permanece inalterada.
- Exercitar os controles A/B com os valores derivados da jornada, 119/120/121 com valores por faixa e o acesso à fonte oficial. Reexecutar os gates após a correção.
