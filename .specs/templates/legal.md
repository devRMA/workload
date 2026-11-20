# NNNN — Legal basis

> Owner: labor-law-analyst · Gate: `law` · **Blocking — no design, copy, or code starts before this passes.**

Everything the change computes is derived here, with its source. A number that appears in the app and not in this file does not exist.

## Rules in play

| # | Rule | Why this change depends on it |
|---|---|---|
| R1 | <Short name, e.g. "night-shift premium"> | <What the change computes or displays because of it.> |

## Sources

### R1 — <Rule name>

| | |
|---|---|
| Norm | <CLT / Lei nº X / IN RFB nº Y / Portaria Interministerial nº Z> |
| Article | <art. NN, § N, inciso N> |
| Effective from | <YYYY-MM-DD> |
| Superseded by | <norm, or "in force"> |
| Source | <URL to the official text — planalto.gov.br, in.gov.br, gov.br/receitafederal> |

<The rule in one paragraph, in the terms the calculator needs: what is owed, to whom, computed on what base.>

## Tables

Reproduced in full — every row, every boundary, no abbreviation and no "etc.". Downstream this becomes a constant in `lib/`, and the constant carries this citation.

### <Table name> — <competence year / effective date>

| Bracket | From (R$) | To (R$) | Rate | Deduction (R$) |
|---|---|---|---|---|
| 1 | <0,00> | <inclusive upper bound> | <%> | <R$> |

- **Boundaries:** <state each one as inclusive or exclusive — a range written as plain text gets implemented with the wrong comparison operator.>
- **Ceiling:** <the capped value, or "none">
- **Source:** <norm, article, URL>

## Worked examples

At least one per rule, and one on every boundary a table defines. These become test cases; a plan that cannot reproduce them has not implemented the rule.

### E1 — <What is being computed>

| | |
|---|---|
| Input | <hours, salary, dates — everything the calculation consumes> |
| Steps | <each intermediate value, in order, with the rule that produces it> |
| Result | <R$ 0,00 / HH:MM> |
| Rule | <R1> |

## Rounding

| Quantity | Unit | Direction | Applied at | Source |
|---|---|---|---|---|
| <e.g. monetary result> | <centavo / minute> | <half-up / down / to nearest> | <each step / only the final result> | <norm and article, or "project convention"> |

Rounding is stated per quantity and per step, never once in general. Whether a step rounds or carries full precision decides the last centavo, and two defensible readings of the same rule can differ by one.

## Disclaimers the app must show

| Where | What the user is told | Why |
|---|---|---|
| <screen or component> | <the visible pt-BR message, verbatim> | <the variable this calculation omits that their real payslip includes> |

Where the app cannot be sure, it says so. A computation that leaves out a variable the user's actual payslip includes carries a visible disclaimer, not silence.

## Out of scope

| Excluded | Why | What the user sees instead |
|---|---|---|

Binding on every downstream agent. An agent that computes something listed here has broken this gate.

## Known imprecisions

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|

Only the human accepts a known legal imprecision, and the acceptance is recorded here. Empty when none.
