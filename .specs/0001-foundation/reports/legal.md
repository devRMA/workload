# 0001 — Law-check report

> Owner: labor-law-analyst · Run: 1

**Verdict:** `passed`

The G6 re-check: does the shipped code still match the tables and rules settled in `legal.md`. This report also carries the record of the labor-law cycle that produced the current state — what was wrong, what was fixed, the before and after figures, and what remains open by decision rather than by oversight.

The working tree was read, never mutated (`AGENTS.md` §4, rule 6).

## Acceptance criteria

| # | Status | Evidence |
|---|---|---|
| AC3 | met | `lib/legal-tables.ts` read constant by constant against `legal.md` § *Tables*. All four RGPS brackets, all eight RPPS federal brackets, all four bounded IRRF brackets plus the top rate, the simplified deduction, the dependent deduction, the exemption ceiling and the three reduction coefficients match digit for digit. |
| AC4 | met | `__tests__/legal-tables.test.ts` computes the contribution at the RGPS ceiling from the brackets themselves and asserts **R$ 988,09** — the published maximum. It is derived, not transcribed, so a mistyped bracket fails the test. |
| AC5 | met | `grep` over `components/`, `app/` and `lib/` finds no fiscal literal outside `lib/legal-tables.ts`. `WORK_REGIME_INFO[].impact` builds its text with `formatCurrency` from `CURRENT_LEGAL_YEAR`; the footer interpolates the year, the effective date and the source. |
| AC6 | met | `components/organisms/calculator-views.tsx` renders the year, `formatIsoDate(effectiveFrom)` and the source as a link to `sourceUrl`, all from `CURRENT_LEGAL_YEAR`. |
| AC7 | met | `lib/payroll.ts:grossHourlyRate` divides the **gross** salary by the monthly load; `hooks/use-gross-hourly-rate.ts` recomputes from the two primary storage keys and deletes the legacy net-derived key on mount. No derived rate is persisted. |
| AC8 | met | `components/organisms/day-summary.tsx` renders the night line through `formatCurrency(nightPremiumPay(...))`, in the same slot and the same ink as the two overtime tiers. |
| AC9 | met | The DSR line renders whenever the variable pay is above zero, with its assumption paragraph directly below it — not in a tooltip and not behind a collapse. |
| AC10 | met | `__tests__/compliance.test.ts` exercises both sides of all four thresholds; each warning carries its article in its body text. |
| AC20 | met | The footer's omissions paragraph was read line by line against `legal.md` § *Out of scope*. Every excluded computation a user could mistake for a promise is named. |

## What was verified

| Computation | Against | Result |
|---|---|---|
| RGPS ladder and ceiling | `legal.md` R4, E1, E2 | R$ 3.000,00 → R$ 248,60; at and above R$ 8.475,55 → R$ 988,09 |
| RPPS federal ladder | `legal.md` R5, E3 | R$ 20.000,00 → R$ 2.768,85; bracket 5 begins exactly at the RGPS ceiling because it is built by spreading the RGPS array |
| IRRF table, parcela and deduction choice | `legal.md` R6, E5, E6 | R$ 6.000,00 → R$ 289,80; R$ 5.500,00 with two dependents → R$ 101,78. `max(legal, simplified)` confirmed — the simplified deduction substitutes, never sums |
| Lei 15.270/2025 exemption and reduction | `legal.md` R7, E4, E7 | Exempt at and below R$ 5.000,00; the reduction keys off **gross** income, which is the point most generic calculators get wrong, and the phase-out boundary is continuous |
| Night window, ficta hour, premium | `legal.md` R1, R2, R3, E11 | 22:00–05:00 counted as `[22:00, 05:00)`; 420 real minutes → 480 ficta, +60 to the journey; premium R$ 21,82 on the ficta minutes, cumulative with the reduced hour |
| Overtime base and tiers | `legal.md` R8, E9, E10 | Priced on R$ 13,6363…/h, not on the net hour; 2h at 50% → R$ 40,91 |
| DSR | `legal.md` R9, E12 | Computed from the unrounded sum of both tiers plus the premium; March 2026 splits 26 working days / 5 rest days; R$ 8,13 |
| Divisor coherence | `legal.md` R10, E14 | An 8h journey on a 220h load warns and names 200; 8h48 on 220 is silent; a sub-one-hour difference is silent |
| Compliance thresholds | `legal.md` R11–R14, E15 | All four fire at exactly their stated comparison; a null previous shift produces no warning |
| Rounding order | `legal.md` § *Rounding* | INSS rounds only on the final sum; IRRF only on the final tax; the hourly rate, the tier pays, the premium and the DSR carry full precision into the display formatter |

## Findings

None at blocker or major. The items below are recorded so the next reviewer does not re-open them.

### minor — the art. 59 limit is measured on ficta minutes, and the screen does not say so

- **Where:** `lib/day-breakdown.ts:93-94` → `components/organisms/work-calculator.tsx`
- **What is wrong:** `overtimeMinutes` derives from `workedMinutes`, which already includes `nightBonusMinutes`. A night worker trips the 2h warning with less real time at work.
- **What correct looks like:** either measure the limit on real minutes, or state the interpretation where the warning appears. The reading itself is defensible — the ficta hour *is* journey time — so this is a disclosure gap, not an arithmetic one.
- **Status:** accepted by the human, recorded in `legal.md` § *Known imprecisions*.

### minor — the Saturday tier has no statutory basis, and the weekend is keyed on the entry day

- **Where:** `hooks/use-work-calculator.ts:64,70`
- **What is wrong:** every overtime minute on a Saturday or Sunday goes to the second tier. Saturday is a working day in the 5×2 week; what Súmula 146 do TST guarantees at double is the **uncompensated Sunday or holiday**. The weekday is read from the **entry** date, so a Friday-night shift ending Saturday morning is priced as a weekday and a Saturday-night shift ending Sunday is priced as a Saturday.
- **What correct looks like:** a tier rule that distinguishes the uncompensated Sunday and holiday from Saturday, and that keys off the day the hours actually fell on.
- **Status:** accepted by the human, recorded in `legal.md` § *Known imprecisions*. Holidays are separately out of scope and named in the footer.

### minor — `parseCurrency` silently misreads a pasted US-format amount

- **Where:** `lib/utils.ts:54-57`
- **What is wrong:** the parser keeps digits only, so a pasted `1234.56` becomes R$ 123.456,00 — an order-of-magnitude error with no signal.
- **What correct looks like:** detect a trailing `.dd` group with no thousands grouping and treat it as a decimal separator, or reject the paste.
- **Status:** accepted by the human, recorded in `legal.md` § *Known imprecisions*. Typing is unaffected: the mask reformats as the user types, so the displayed value always equals the parsed value.

### minor — the ficta conversion rounds to the whole minute

- **Where:** `lib/night-shift.ts:39-41`
- **What is wrong:** `Math.round` on `minutes × 60 / 52,5` can move the journey by up to a minute per night stretch, which becomes money across a month.
- **Status:** accepted; the journey is expressed in whole minutes throughout.

## What was fixed in this cycle, with the numbers

The record of the labor-law corrections that produced the current state. Baseline figures throughout: gross R$ 3.000,00, monthly load 220h, gross hour R$ 13,6363…

| # | Norm | Before | After |
|---|---|---|---|
| D1 | CLT art. 73, *caput* — the 20% night premium | The night line showed a **duration** (`8h 0m`) and rendered an empty span where the other tiers show money. A 22:00–05:00 shift paid **R$ 0,00** of premium; over twenty nights, **R$ 436,36 never appeared** | The premium is computed on the ficta minutes and rendered as currency: **R$ 21,82** per night, **R$ 436,36** over twenty. The label reads `Adicional noturno 20%` |
| D2 | CLT art. 59, §1º; CF art. 7º, XVI | Overtime was priced on the **net** hour (R$ 12,5064), a value derived from gross minus INSS, IRRF and other deductions and then persisted under its own storage key. 2h at 50% paid **R$ 37,52** | Priced on the **gross** hour (R$ 13,6364): **R$ 40,91**. The derived key is deleted on mount and never rewritten; the journey screen reads the two primaries. The two hour concepts — personal net cost, and the statutory overtime base — are now separate values with separate homes |
| O1 | Lei 605/49 art. 7º, §2º; Súmula 172 do TST | The DSR on habitual overtime was **absent**, not even declared | Computed from the unrounded variable pay over the month's working days and Sundays. On the audit's own case — R$ 818,18 of extras, 25 working days, 5 Sundays — **R$ 163,64** |
| D4 | Súmula 431 do TST | An 8h journey on a 220h load silently understated every hour by 9,1% | The value is not overwritten; a warning names the coherent divisor (**200**) and states that a larger divisor lowers the value of every hour |
| D5 | CF art. 7º, XVI; CLT art. 59, §1º | `Adicional acima de 2h (%)` defaulted to 100 with nothing saying that no law doubles the premium after the second hour | The default stays 100 (`PRODUCT.md` §5, the common case) and both rate fields carry a hint, bound by `aria-describedby`, naming the 50% floor and attributing the step to the collective agreement |
| O2 | CLT art. 66 | The 11h interregno was never checked, although the data to check it was already persisted | The day's exit is stored; on a later calendar day the gap to today's entry is measured against 660 minutes and warned on |
| O3 | CLT art. 71, §1º | A 5h journey with no break passed in silence — only the 6h threshold existed | The 15-minute warning fires for a journey above 4h and up to 6h |
| §5 | Versioning | Fiscal numbers lived as loose constants in `lib/payroll.ts` and were **duplicated in UI prose**, so a yearly update meant remembering two places, one of them untested | `lib/legal-tables.ts` holds every fiscal number, indexed by year with its source and effective date. `lib/payroll.ts` holds none. A sanity test asserts monotonic ceilings and rates in all three ladders and re-derives the R$ 988,09 ceiling discount |

### Communication risks closed

| Risk | Resolution |
|---|---|
| The night line reading as "my premium is 8h" or "R$ 0,00" | Renders currency, in the same slot and ink as the other tiers |
| The net hour cost silently pricing overtime | The Custo da Hora header states that the Jornada overtime is computed on the gross hour, citing art. 59, §1º |
| The RGPS ceiling hard-coded in a UI string, with no year | Interpolated from the table, with the year in the sentence |
| No table version anywhere on screen | The footer names the year, the effective date and links the norm |
| "Estatutário" applying the federal ladder to any servant | The regime text and the footer both say the table is the **federal** RPPS one and does not hold for state or municipal servants |
| A generic disclaimer that named no omission | Replaced by a paragraph naming each one, plus "nada aqui é orientação jurídica ou contábil" |
| A confident R$ 0,00 from a missing input | A named alert above the results says the zero is the missing data |

## Traceability audit

Every user-visible number, and the `lib/` table it traces to. A number with no table is an automatic reject; there are none.

| Number on screen | Traces to |
|---|---|
| INSS (auto) | `lib/legal-tables.ts` → `rgpsBrackets` / `rppsFederalBrackets` via `calculateSocialSecurity` |
| IRRF (auto) | `incomeTaxBrackets`, `topIncomeTaxRate`, `simplifiedDeduction`, `dependentDeduction`, `exemptionCeiling`, `reduction` via `calculateIncomeTax` |
| Net salary, total received, total deductions | The two above, plus the user's own extras |
| Value per hour / day / week / month / year | `lib/salary-period.ts` over the user's own inputs |
| RGPS ceiling and maximum discount in the regime text | `rgpsBrackets` last ceiling and `rgpsCeilingDiscount`, formatted, never typed |
| Extra 50% / Extra 100% | `overtimePay` over `grossHourlyRate`, rates from the user's own fields with the statutory floor stated |
| Adicional noturno 20% | `NIGHT_PREMIUM_RATE` in `lib/night-shift.ts`, cited to CLT art. 73, *caput* |
| Reduced-hour bonus | `NIGHT_HOUR_MINUTES = 52.5`, cited to CLT art. 73, §1º |
| DSR | `lib/weekly-rest.ts`, cited to Lei 605/49 and Súmula 172 |
| Coherent divisor in the warning | `lib/salary-period.ts`, cited to Súmula 431 |
| Thresholds quoted in the four warnings | `lib/compliance.ts`, each with its article in the visible text |
| Table year, effective date, source | `CURRENT_LEGAL_YEAR` |

## Disclosure audit

Each required disclosure from `legal.md` § *Disclaimers*, and whether it is visible.

| Disclosure | Visible | Where |
|---|---|---|
| Estimate, not a holerite, not a ponto record, not legal or accounting advice | yes | Footer, both views, uncollapsed |
| The named list of omitted variables | yes | Footer, both views |
| Estatutário = federal RPPS only | yes | Footer, and the regime option's own body text |
| Table year, effective date, source link | yes | Footer, both views |
| DSR assumption and the holiday omission | yes | Directly under the DSR line |
| The 50% floor on the first-tier field | yes | Field hint, bound by `aria-describedby` |
| The 100% step belongs to the collective agreement | yes | Field hint, bound by `aria-describedby` |
| A zero means a missing input | yes | Alert above the results on Custo da Hora |
| The Jornada overtime uses the gross hour | yes | Custo da Hora header |
| Súmula 431 divisor mismatch | yes | Alert above the results, naming both divisors |
| The regime changes only the INSS | yes | Note inside the regime panel |
| Everything stays in this browser | yes | Footer, both views |

None is behind a collapse.

## Still open

Deferred by decision, each named in the footer where a user could mistake its absence for a promise. Full reasoning in `legal.md` § *Out of scope*.

| Item | Norm | Why it is still open |
|---|---|---|
| Night-journey extension past 05:00 | Súmula 60, II do TST | Changes the night count, the ficta bonus, the premium and the DSR at once, and needs a "journey wholly performed at night" predicate the day model does not express |
| Holidays; the weekend tier and the day it is keyed on | Súmula 146 do TST; municipal calendars | No holiday calendar can be kept accurate for 5.570 municipalities |
| Overtime, premium and DSR inside the INSS/IRRF base | Lei 8.212/91 art. 28, I; Lei 7.713/88 art. 7º | Requires a monthly accumulation shared between the two screens, which the product does not keep |
| 13º salário and the terço de férias | Lei 4.090/62; CF art. 7º, XVII | The year is thirteen monthly nets; the 13º has its own bases |
| The value of the suppressed break | CLT art. 71, §4º | The rule is stated; pricing it needs the gross hour inside the compliance module |
| Weekly rest of 24h; banco de horas; 12×36; rural; menor de 18 | CLT arts. 59-A, 67, 404; Lei 5.889/73 | Each needs state or a regime field the single-day model does not carry |
| FGTS | Lei 8.036/90 art. 15 | Not an employee deduction |
| State and municipal RPPS | EC 103/2019 art. 9º, §4º | No national table to cite |
| Pensão alimentícia and previdência complementar as IRRF deductions | Lei 9.250/95 art. 4º, II e V | Not offered; the manual IRRF override is the escape hatch |

## Checked and clean

So the next reviewer does not re-litigate it:

- Every constant in `lib/legal-tables.ts` read against the Portaria and Lei 15.270/2025, digit by digit, from the constant itself and not from the test.
- The order of operations in `calculateIncomeTax` — exemption, legal vs. simplified deduction, base, bracket, parcela, reduction — matches `legal.md` R6 and R7 exactly, including that the reduction takes **gross** and not the base.
- The progressive sum is portion-by-portion with a single final rounding; the ceiling case reproduces the published R$ 988,09.
- The binary-dust defence (`toPrecision(12)` before `Math.round`) is present and is the reason the ceiling case lands on the right centavo. It must survive any refactor.
- The night premium is applied to **ficta** minutes, so §1º and the *caput* are cumulative rather than alternative.
- The DSR consumes the **unrounded** variable pay.
- No fiscal literal survives in UI prose.
- The source note in the audit still holds: the gov.br PDF of Portaria MPS/MF nº 13/2026 is a scan with no text layer; the annexes were confirmed through the LegisWeb transcription and cross-checked against three independent secondary sources, all convergent. Four RGPS limits and four RPPS limits match the code digit for digit.
