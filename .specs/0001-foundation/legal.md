# 0001 — Legal basis

> Owner: labor-law-analyst · Gate: `law` · **Blocking — no design, copy, or code starts before this passes.**

**Verdict:** `pass`

Everything the product computes is derived here, with its source. A number that appears in the app and not in this file does not exist.

**Scope of this analysis.** It covers every arithmetic operation WorkLoad performs on a user's hours or money: the night window and the reduced night hour, the 20% night premium, the overtime tiers and their base, the DSR on variable pay, the monthly divisor, the four compliance thresholds, INSS under the RGPS and under the federal RPPS, and IRRF with dependents and the Lei 15.270/2025 reduction. It does **not** cover anything in § *Out of scope* below, and nothing in that list may be computed by any downstream agent.

**Competence year.** All fiscal tables reproduced here are the **2026** tables, in force from **2026-01-01**. They live in `lib/legal-tables.ts` as `LEGAL_YEARS[2026]`, exported as `CURRENT_LEGAL_YEAR`. No other module holds a fiscal number.

---

## Rules in play

| # | Rule | Why the product depends on it |
|---|---|---|
| R1 | Night premium — 20% | The app pays the premium as money on the night line of the day summary, cumulative with R2. |
| R2 | Reduced night hour — 52min30s | Night minutes are converted into equivalent (ficta) minutes; the surplus is credited to the journey and forms the base of R1. |
| R3 | Night window — 22:00 to 05:00 | Defines which worked minutes are night minutes for R1 and R2. |
| R4 | INSS / RGPS progressive ladder | The CLT regime's social-security deduction and the ceiling the deduction stops at. |
| R5 | INSS / federal RPPS progressive ladder | The Estatutário regime's deduction, uncapped, continuing past the RGPS ceiling. |
| R6 | IRRF monthly table with parcela a deduzir | The income-tax deduction on the gross salary field. |
| R7 | Lei 15.270/2025 — exemption up to R$ 5.000 and the reduction phase-out | Zeroes the tax up to the ceiling and reduces it up to the phase-out, keyed on **gross** income. |
| R8 | Overtime — 50% statutory floor, priced on the normal (gross) hour | Both overtime tiers and R1 are priced on `grossSalary / monthlyHours`. |
| R9 | DSR on habitual variable pay | The month's overtime and night premium generate a paid weekly rest, shown as its own line. |
| R10 | Monthly divisor coherent with the weekly journey | The app warns when the monthly load contradicts the daily journey. |
| R11 | Daily overtime limit — 2 hours | Compliance warning; the hours worked past it remain owed. |
| R12 | Intrajourney break — 15 min between 4h and 6h | Compliance warning. |
| R13 | Intrajourney break — 1 hour above 6h, reducible to 30 min by collective norm | Compliance warning. |
| R14 | Interjourney rest — 11 consecutive hours | Compliance warning, measured from the previous day's stored exit. |

---

## Sources

### R1 — Night premium, 20%

| | |
|---|---|
| Norm | Decreto-Lei nº 5.452/1943 (CLT) |
| Article | art. 73, *caput* |
| Effective from | 1943-05-01 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

Night work performed in the urban sector is paid with an increase of **at least 20%** over the hour worked during the day. The premium is a monetary increase on the hour's value; it is a distinct institute from the reduced hour of §1º, which shortens the hour's duration. The two are **cumulative** — the reduced hour first converts the time, and the premium is then applied to the converted (ficta) time. The 20% is a floor; a collective norm may raise it. The app applies the floor and does not expose a field for it.

Implemented in `lib/night-shift.ts` as `NIGHT_PREMIUM_RATE = 0.2` and `nightPremiumPay(nightMinutes, hourlyRate)`, called with the **ficta** minutes.

### R2 — Reduced night hour, 52 minutes 30 seconds

| | |
|---|---|
| Norm | Decreto-Lei nº 5.452/1943 (CLT) |
| Article | art. 73, §1º |
| Effective from | 1943-05-01 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

The night hour is computed as **52 minutes and 30 seconds**. Sixty minutes actually worked at night therefore correspond to 60 / 52,5 ≈ 1,142857 hours of journey. The app converts night minutes worked into equivalent minutes and credits the surplus to the day's journey, so a worker who spends seven real hours inside the window has worked eight hours of journey.

`lib/night-shift.ts`: `NIGHT_HOUR_MINUTES = 52.5`; `nightEquivalentMinutes(m) = Math.round(m * 60 / 52.5)`; `nightBonusMinutes(m) = nightEquivalentMinutes(m) - m`.

### R3 — Night window, 22:00 to 05:00

| | |
|---|---|
| Norm | Decreto-Lei nº 5.452/1943 (CLT) |
| Article | art. 73, §2º |
| Effective from | 1943-05-01 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

Urban night work is the work performed between **22:00 of one day and 05:00 of the following day**.

- **Boundaries:** the window is `[22:00, 05:00)` — a minute starting at exactly 05:00 is not a night minute; a minute starting at exactly 22:00 is. `overlapInMinutes` in `lib/night-shift.ts` counts an intersection only where `end > start`.
- The window is evaluated for every calendar day the journey can touch, starting from the day **before** the entry date, so a journey that begins before midnight and ends after it is counted once and only once.
- Lunch minutes falling inside the window are subtracted; the worker is not working during them.
- The rural windows of Lei 5.889/73 (lavoura 21:00–05:00, pecuária 20:00–04:00) are **not** implemented — see § *Out of scope*.

### R4 — INSS, RGPS progressive ladder

| | |
|---|---|
| Norm | Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II |
| Article | Anexo II (tabela de contribuição do segurado empregado) |
| Effective from | 2026-01-01 |
| Superseded by | in force |
| Source | https://www.legisweb.com.br/legislacao/?id=489284 · https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf |

The employee's contribution is **progressive by portion**: each rate applies only to the slice of the salário-de-contribuição that falls inside its bracket, and the contribution is the sum of the slices. Above the ceiling the contribution stops growing.

### R5 — INSS, federal RPPS progressive ladder

| | |
|---|---|
| Norm | Emenda Constitucional nº 103/2019, art. 11; Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo III |
| Article | EC 103/2019 art. 11, §1º; Anexo III da Portaria |
| Effective from | 2026-01-01 |
| Superseded by | in force |
| Source | https://www.legisweb.com.br/legislacao/?id=489284 |

The federal civil servant's contribution uses the same four RGPS brackets and then **continues past the RGPS ceiling** with four further brackets, up to 22% on the highest portion. There is no ceiling. This is the **federal** ladder only; states and municipalities legislate their own rates, frequently a flat 14% — the app applies the federal ladder and says so out loud.

### R6 — IRRF, monthly table

| | |
|---|---|
| Norm | Lei nº 9.250/1995, com a redação da Lei nº 15.270, de 26/11/2025 |
| Article | Lei 9.250/95 art. 4º; Lei 15.270/2025 |
| Effective from | 2026-01-01 |
| Superseded by | in force |
| Source | https://calcularclt.com.br/tabelas/irrf-2026 · https://bemcalculado.com.br/blog/imposto-de-renda-2026-lei-15270/ |

The monthly withholding uses a bracket table with a **parcela a deduzir**: tax = base × rate − parcela. The base is the gross minus the deductible amount, where the deductible amount is the **greater** of (a) the legal deductions — INSS plus R$ 189,59 per dependent — and (b) the simplified deduction of R$ 607,20. The simplified deduction **replaces** all legal deductions; it never adds to them (Lei 9.250/95 art. 4º, §§).

### R7 — Lei 15.270/2025 exemption and reduction

| | |
|---|---|
| Norm | Lei nº 15.270, de 26 de novembro de 2025 |
| Article | arts. 1º e 2º |
| Effective from | 2026-01-01 |
| Superseded by | in force |
| Source | https://bemcalculado.com.br/blog/imposto-de-renda-2026-lei-15270/ |

Monthly gross income up to **R$ 5.000,00** is fully exempt. Above it, a reduction is subtracted from the tax computed by R6, decaying linearly until it reaches zero:

```
reduction = 978,62 − 0,133145 × gross income
```

The reduction is zero for gross income above **R$ 7.350,00**. **The variable in this formula is gross income, not the taxable base** — the most common error in generic Brazilian calculators, and the app gets it right (`lib/payroll.ts:taxReductionFor` takes `grossSalary`).

### R8 — Overtime: the 50% floor, on the normal hour

| | |
|---|---|
| Norm | Constituição Federal de 1988; Decreto-Lei nº 5.452/1943 (CLT) |
| Article | CF art. 7º, XVI; CLT art. 59, §1º; base remuneratória: CLT arts. 457 e 458 |
| Effective from | 1988-10-05 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm · https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

Overtime is paid at **at least 50%** over the value of the normal hour. The normal hour is derived from **gross** remuneration: INSS and IRRF are deductions that come *after*, and they fall on the overtime itself (Lei 8.212/91 art. 28, I). Pricing overtime on a net hour understates it by the whole deduction percentage, and the error grows with the salary band.

**There is no general norm that doubles the premium after the second hour.** Art. 59 sets a *limit* of two hours, not a price tier. A 100% rate above the second hour is a collective-agreement clause, variable by category. The app ships 100% as the default because it is the common case (`PRODUCT.md` §5) and states, on the field itself, that the floor is 50% and the step depends on the user's convention.

`lib/payroll.ts`: `grossHourlyRate(grossSalary, monthlyHours) = grossSalary / monthlyHours`; `overtimePay(minutes, hourlyRate, ratePercent) = (minutes / 60) × hourlyRate × (1 + ratePercent / 100)`.

### R9 — DSR on habitual variable pay

| | |
|---|---|
| Norm | Lei nº 605, de 05/01/1949; Lei nº 7.415/1985; Súmula 172 do TST |
| Article | Lei 605/49 art. 7º, §2º |
| Effective from | 1949-01-05 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/leis/l0605.htm · https://www.guiatrabalhista.com.br/guia/dsr_hora_extra.htm |

Habitually worked overtime is included in the calculation of the paid weekly rest. The computation the app uses:

```
DSR = variable pay in the month / working days in the month × rest days in the month
```

where "variable pay" is the sum of both overtime tiers plus the night premium, working days are every calendar day of the month that is not a Sunday, and rest days are the Sundays. **Saturday counts as a working day** in the 5×2 week. **Holidays are not detected**, which slightly understates the DSR, and the app says so next to the number.

`lib/weekly-rest.ts`: `splitMonthDays(reference)` and `restDayPayOnOvertime(overtimeAmount, split)`. The reference month is the month of the **entry** date the user typed.

### R10 — Monthly divisor coherent with the weekly journey

| | |
|---|---|
| Norm | Súmula 431 do TST |
| Article | Súmula 431 |
| Effective from | 2012-09-14 |
| Superseded by | in force |
| Source | https://www.tst.jus.br/sumulas |

For an employee on a weekly journey below 44 hours, the value of the hour is found with the divisor obtained by multiplying the **weekly** journey by five. A 44h week gives 220; a 40h week gives 200. Using 220 for a 40h week understates every hour by 9,1%.

The app **warns, it does not overwrite**: `findDivisorMismatch(monthlyHours, dailyHours)` computes `dailyHours × 5 × 5`, rounded to two decimals, and returns it when it differs from the entered monthly load by **one hour or more** (`DIVISOR_TOLERANCE_HOURS = 1`, absorbing floating-point noise from a masked `HH:mm` journey). A difference strictly below one hour is treated as coherent.

### R11 — Daily overtime limit, 2 hours

| | |
|---|---|
| Norm | Decreto-Lei nº 5.452/1943 (CLT); Súmula 376, I, do TST |
| Article | art. 59, *caput* e §2º |
| Effective from | 1943-05-01 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

The journey may be extended by no more than two supplementary hours per day. Exceeding it is an irregularity of the **employer**; under Súmula 376, I, every hour actually worked remains owed to the employee. The app warns and keeps paying.

- **Boundary:** the warning fires when overtime is **strictly greater** than 120 minutes. Exactly 120 minutes is lawful and silent.

### R12 — Intrajourney break of 15 minutes

| | |
|---|---|
| Norm | Decreto-Lei nº 5.452/1943 (CLT) |
| Article | art. 71, §1º |
| Effective from | 1943-05-01 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

A journey exceeding four hours and not exceeding six hours requires a break of at least fifteen minutes.

- **Boundary:** fires when worked minutes are **strictly greater than 240** and **less than or equal to 360**, and the break is **strictly less than 15** minutes.

### R13 — Intrajourney break of 1 hour

| | |
|---|---|
| Norm | Decreto-Lei nº 5.452/1943 (CLT), com a redação da Lei nº 13.467/2017 |
| Article | art. 71, *caput*, §3º e §4º; art. 611-A, III |
| Effective from | 1943-05-01; §4º na redação de 2017-11-11 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

A journey exceeding six hours requires a break of at least one hour; a collective norm may reduce it to thirty minutes (art. 611-A, III). Suppressing the break, in whole or in part, obliges payment of the suppressed period with a **50% indemnifying increase** (§4º).

- **Boundary:** fires when worked minutes are **strictly greater than 360** and the break is **strictly less than 60** minutes.
- The app **states** the §4º consequence and does **not** price it — see § *Out of scope*.

### R14 — Interjourney rest of 11 hours

| | |
|---|---|
| Norm | Decreto-Lei nº 5.452/1943 (CLT) |
| Article | art. 66 |
| Effective from | 1943-05-01 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

Between two journeys there must be a minimum of **eleven consecutive hours** of rest.

- **Boundary:** fires when the measured gap is **strictly less than 660 minutes**. Exactly 660 is lawful and silent.
- The gap is measured from the exit stored on a **previous calendar day** to today's entry. When no earlier exit is stored, the check does not run and no warning is shown — absence of data is never reported as compliance.

---

## Tables

Reproduced in full — every row, every boundary, no abbreviation and no "etc." These are the constants of `lib/legal-tables.ts`, and the module carries this citation.

### INSS / RGPS — competence 2026

Progressive by portion. Each rate applies only to the slice of the salary inside its bracket.

| Bracket | From (R$) | To (R$) | Rate | Deduction (R$) |
|---|---|---|---|---|
| 1 | 0,00 | 1.621,00 | 7,5% | — |
| 2 | 1.621,01 | 2.902,84 | 9% | — |
| 3 | 2.902,85 | 4.354,27 | 12% | — |
| 4 | 4.354,28 | 8.475,55 | 14% | — |

- **Boundaries:** each upper bound is **inclusive** of the portion it closes. The implementation adds `(min(amount, ceiling) − lowerBound) × rate` for each bracket and stops as soon as `amount ≤ lowerBound`, which makes the boundary exact at the centavo with no comparison-operator ambiguity.
- **Ceiling:** R$ 8.475,55. The maximum employee contribution is **R$ 988,09** (see E2). No portion above the ceiling contributes.
- **Deduction column:** not applicable — this is a portion-by-portion ladder, not a table with a parcela a deduzir.
- **Source:** Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II — https://www.legisweb.com.br/legislacao/?id=489284

### INSS / RPPS federal — competence 2026

The four RGPS brackets above, then four more. Uncapped.

| Bracket | From (R$) | To (R$) | Rate | Deduction (R$) |
|---|---|---|---|---|
| 1 | 0,00 | 1.621,00 | 7,5% | — |
| 2 | 1.621,01 | 2.902,84 | 9% | — |
| 3 | 2.902,85 | 4.354,27 | 12% | — |
| 4 | 4.354,28 | 8.475,55 | 14% | — |
| 5 | 8.475,56 | 14.514,30 | 14,5% | — |
| 6 | 14.514,31 | 29.028,57 | 16,5% | — |
| 7 | 29.028,58 | 56.605,73 | 19% | — |
| 8 | 56.605,74 | — | 22% | — |

- **Boundaries:** identical semantics to the RGPS ladder. Bracket 5 begins exactly where the RGPS ceiling ends, with no gap and no overlap.
- **Ceiling:** none. Bracket 8 is open-ended (`Number.POSITIVE_INFINITY` in the implementation).
- **Applicability:** **federal** servants only. State and municipal RPPS have their own rates.
- **Source:** EC 103/2019 art. 11 + Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo III — https://www.legisweb.com.br/legislacao/?id=489284

### IRRF mensal — competence 2026

| Bracket | From (R$) | To (R$) | Rate | Deduction (R$) |
|---|---|---|---|---|
| 1 | 0,00 | 2.428,80 | 0% | 0,00 |
| 2 | 2.428,81 | 2.826,65 | 7,5% | 182,16 |
| 3 | 2.826,66 | 3.751,05 | 15% | 394,16 |
| 4 | 3.751,06 | 4.664,68 | 22,5% | 675,49 |
| 5 | 4.664,69 | — | 27,5% | 908,73 |

- **Boundaries:** each upper bound is **inclusive**. The bracket is selected by the first row whose ceiling satisfies `base ≤ ceiling`; a base above the last ceiling falls to bracket 5.
- **Base:** the table is read against the **taxable base** (gross minus the deductible amount), not against the gross.
- **Ceiling:** none — bracket 5 is open-ended.
- **Source:** Lei nº 15.270, de 26/11/2025 — https://calcularclt.com.br/tabelas/irrf-2026

### IRRF — deductions, exemption and reduction, competence 2026

| Quantity | Value (R$) | Applies to |
|---|---|---|
| Simplified deduction | 607,20 | Replaces all legal deductions when it is the greater of the two |
| Deduction per dependent | 189,59 | Per dependent, added to the INSS in the legal-deduction branch |
| Exemption ceiling | 5.000,00 | Gross income **at or below** this is fully exempt |
| Reduction — intercept | 978,62 | `reduction = 978,62 − 0,133145 × gross` |
| Reduction — coefficient | 0,133145 | Multiplies **gross** income, never the base |
| Reduction — phase-out ceiling | 7.350,00 | Gross income **strictly above** this gets no reduction |

- **Boundaries:** exemption at exactly R$ 5.000,00 is exempt (`gross ≤ 5000` returns zero tax). The phase-out is exclusive: at exactly R$ 7.350,00 the formula still applies and yields R$ 0,00425, which rounds to R$ 0,00; above it the reduction is set to zero outright. The two paths meet continuously, which is why the boundary direction does not create a step.
- **Dependents:** the count is truncated toward zero before use; a fractional dependent is not a thing.
- **Choice rule:** `deductible = max(INSS + 189,59 × dependents, 607,20)`. The simplified deduction **substitutes**, it never sums.
- **Source:** Lei 9.250/95 art. 4º + Lei nº 15.270, de 26/11/2025 — https://bemcalculado.com.br/blog/imposto-de-renda-2026-lei-15270/

### Night-shift constants

| Quantity | Value | Norm |
|---|---|---|
| Window start | 22:00 | CLT art. 73, §2º |
| Window end | 05:00 | CLT art. 73, §2º |
| Night hour | 52,5 minutes | CLT art. 73, §1º |
| Premium rate | 20% | CLT art. 73, *caput* |

### Compliance thresholds

| Quantity | Value | Comparison | Norm |
|---|---|---|---|
| Daily overtime limit | 120 min | warns when `>` | CLT art. 59 |
| Short-journey floor | 240 min | warns when worked `>` | CLT art. 71, §1º |
| Long-journey floor | 360 min | warns when worked `>` | CLT art. 71, *caput* |
| Minimum short break | 15 min | warns when break `<` | CLT art. 71, §1º |
| Minimum lunch | 60 min | warns when break `<` | CLT art. 71, *caput* |
| Minimum interjourney rest | 660 min | warns when gap `<` | CLT art. 66 |

### Divisor constants

| Quantity | Value | Norm |
|---|---|---|
| Working days per week | 5 | Súmula 431 do TST |
| Weeks in the divisor | 5 | Súmula 431 do TST |
| Divisor tolerance | 1 hour | Project convention — absorbs `HH:mm` rounding |
| Paid months per year | 13 | Lei 4.090/62 (13º), applied as a plain multiplier — see § *Known imprecisions* |

---

## Worked examples

At least one per rule, and one on every boundary a table defines. These are test cases; a plan that cannot reproduce them has not implemented the rule. Every one of them is reproducible from the tables above alone.

### E1 — INSS/RGPS on R$ 3.000,00, regime CLT

| | |
|---|---|
| Input | gross R$ 3.000,00; regime `clt` |
| Steps | 1.621,00 × 7,5% = 121,575 · (2.902,84 − 1.621,00) = 1.281,84 × 9% = 115,3656 · (3.000,00 − 2.902,84) = 97,16 × 12% = 11,6592 · sum = 248,5998 · round to centavo |
| Result | **R$ 248,60** |
| Rule | R4 |

### E2 — INSS/RGPS at or above the ceiling (boundary)

| | |
|---|---|
| Input | gross R$ 8.475,55 (and any value above it); regime `clt` |
| Steps | 121,575 + 115,3656 + (4.354,27 − 2.902,84) × 12% = 174,1716 + (8.475,55 − 4.354,27) × 14% = 576,9792 · sum = 988,0914 · round |
| Result | **R$ 988,09** — the published maximum contribution for 2026 |
| Rule | R4 |

### E3 — INSS/RPPS federal on R$ 20.000,00, regime Estatutário

| | |
|---|---|
| Input | gross R$ 20.000,00; regime `estatutario` |
| Steps | portion up to 8.475,55 = 988,0914 · (14.514,30 − 8.475,55) = 6.038,75 × 14,5% = 875,61875 · (20.000,00 − 14.514,30) = 5.485,70 × 16,5% = 905,1405 · sum = 2.768,85065 · round |
| Result | **R$ 2.768,85** |
| Rule | R5 |

### E4 — IRRF exempt (boundary)

| | |
|---|---|
| Input | gross R$ 5.000,00; 0 dependents |
| Steps | gross ≤ exemption ceiling of 5.000,00 → the calculation short-circuits before the table is read |
| Result | **R$ 0,00** |
| Rule | R7 |

### E5 — IRRF on R$ 6.000,00, 0 dependents, regime CLT

| | |
|---|---|
| Input | gross R$ 6.000,00; 0 dependents; INSS auto |
| Steps | INSS = 988,09 (E2) · legal deduction = 988,09 + 0 = 988,09 · simplified = 607,20 · deductible = max = 988,09 · base = 6.000,00 − 988,09 = 5.011,91 · base > 4.664,68 → rate 27,5%, parcela 908,73 · 5.011,91 × 27,5% = 1.378,27525 · − 908,73 = 469,54525 · reduction = 978,62 − 0,133145 × 6.000,00 = 179,75 · 469,54525 − 179,75 = 289,79525 · round |
| Result | **R$ 289,80** |
| Rule | R6, R7 |

### E6 — IRRF on R$ 5.500,00 with 2 dependents

| | |
|---|---|
| Input | gross R$ 5.500,00; 2 dependents; INSS auto |
| Steps | INSS: 121,575 + 115,3656 + 174,1716 + (5.500,00 − 4.354,27) × 14% = 160,4022 · sum 571,5144 → **571,51** · legal deduction = 571,51 + 2 × 189,59 = 950,69 · simplified 607,20 · deductible = 950,69 · base = 5.500,00 − 950,69 = 4.549,31 · base ≤ 4.664,68 → rate 22,5%, parcela 675,49 · 4.549,31 × 22,5% = 1.023,59475 · − 675,49 = 348,10475 · reduction = 978,62 − 0,133145 × 5.500,00 = 246,3225 · 348,10475 − 246,3225 = 101,78225 · round |
| Result | **R$ 101,78** |
| Rule | R6, R7 |

### E7 — IRRF reduction at the phase-out boundary

| | |
|---|---|
| Input | gross R$ 7.350,00 versus gross R$ 7.350,01 |
| Steps | at 7.350,00: reduction = 978,62 − 0,133145 × 7.350,00 = 0,00425 · above 7.350,00: the phase-out branch returns 0 outright |
| Result | The two branches differ by less than half a centavo, so the tax is identical after rounding. **The boundary is continuous.** |
| Rule | R7 |

### E8 — Net salary on R$ 3.000,00, regime CLT, no dependents

| | |
|---|---|
| Input | gross R$ 3.000,00; regime `clt`; 0 dependents; no extra gains or deductions |
| Steps | INSS = 248,60 (E1) · IRRF = 0,00 (gross ≤ 5.000,00, R7) · net = 3.000,00 − 248,60 − 0,00 |
| Result | **R$ 2.751,40** |
| Rule | R4, R7 |

### E9 — Gross hourly rate

| | |
|---|---|
| Input | gross R$ 3.000,00; monthly load 220 h |
| Steps | 3.000,00 / 220 — carried at full precision, never rounded before it is used |
| Result | **R$ 13,636363…** (displayed as R$ 13,64 wherever it is shown alone) |
| Rule | R8, R10 |

### E10 — Overtime, 2 hours at 50%

| | |
|---|---|
| Input | 120 overtime minutes; gross hourly rate from E9; tier rate 50% |
| Steps | (120 / 60) × 13,636363… × (1 + 0,50) = 2 × 13,636363… × 1,5 = 40,909090… |
| Result | **R$ 40,91** |
| Rule | R8 |

*Counter-example, kept because it is the defect this baseline fixed:* the same two hours priced on the **net** hour of E8 (2.751,40 / 220 = R$ 12,5064) would pay R$ 37,52 — R$ 3,39 less per day, and the gap widens with the salary band.

### E11 — Night minutes, premium and the reduced hour

| | |
|---|---|
| Input | entry 2026-03-02T22:00, no lunch, exit 2026-03-03T05:00; gross hourly rate from E9 |
| Steps | real night minutes inside `[22:00, 05:00)` = 420 · ficta = round(420 × 60 / 52,5) = **480** · bonus credited to the journey = 480 − 420 = **60** · premium = (480 / 60) × 13,636363… × 20% = 8 × 13,636363… × 0,2 = 21,818181… |
| Result | journey credited **8h 00m** for 7 real hours; premium **R$ 21,82** |
| Rule | R1, R2, R3 |

### E12 — A full night journey with overtime and DSR

| | |
|---|---|
| Input | entry Monday 2026-03-02T22:00; lunch 2026-03-03T02:00 → 02:00 (none taken); exit 2026-03-03T06:00; expected journey 480 min (8h); gross R$ 3.000,00 over 220 h; tiers 50% / 100% |
| Steps | morning 22:00→02:00 = 240 · afternoon 02:00→06:00 = 240 · real worked 480 · night minutes `[22:00, 05:00)` = 420 → ficta 480, bonus 60 · **journey credited = 240 + 240 + 60 = 540** · overtime = 540 − 480 = **60 min** · entry weekday = Monday, not weekend → first tier 60 min, second tier 0 · first tier pay = (60/60) × 13,636363… × 1,5 = 20,454545… · night premium = 21,818181… (E11) · variable pay = 42,272727… · March 2026 = 31 days, 5 Sundays → working days 26, rest days 5 · DSR = 42,272727… / 26 × 5 = 8,129370… |
| Result | Extra 50% **R$ 20,45** · Adicional noturno 20% **R$ 21,82** · DSR **R$ 8,13** · balance **+1h 00m** |
| Rule | R1, R2, R3, R8, R9 |

*Note on the Súmula 60, II reading:* the hour worked between 05:00 and 06:00 is **not** counted as night time. See § *Out of scope*.

### E13 — Suggested exit, day journey

| | |
|---|---|
| Input | entry 08:00, lunch 12:00 → 13:00, expected journey 528 min (8h48) |
| Steps | worked before lunch = 240 · remaining = 528 − 240 = 288 · first candidate = 13:00 + 288 min = 17:48 · credited until 17:48 = 240 + 288 + 0 night bonus = 528 · surplus = 0, the refinement loop does not run |
| Result | **17:48** |
| Rule | — (journey arithmetic; the refinement loop exists so a night journey converges, since crediting the ficta bonus moves the exit that produces it) |

### E14 — Divisor coherence (boundary)

| | |
|---|---|
| Input | (a) daily journey 8h00 with monthly load 220 · (b) daily journey 8h48 with monthly load 220 · (c) daily journey 8h00 with monthly load 200,5 |
| Steps | coherent divisor = daily hours × 5 × 5 · (a) 8 × 25 = 200; \|220 − 200\| = 20 ≥ 1 · (b) 8,8 × 25 = 220; \|220 − 220\| = 0 < 1 · (c) 8 × 25 = 200; \|200,5 − 200\| = 0,5 < 1 |
| Result | (a) warns, naming **200** · (b) silent · (c) silent |
| Rule | R10 |

### E15 — Compliance thresholds at their boundaries

| | |
|---|---|
| Input | (a) overtime 120 vs. 121 min · (b) worked 240 vs. 241 min with a 0-min break · (c) worked 360 vs. 361 min with a 59-min break · (d) interjourney gap 660 vs. 659 min |
| Steps | each warning uses a strict comparison — see § *Compliance thresholds* |
| Result | (a) silent / warns · (b) silent / warns (15-min break) · (c) 15-min warning applies at 360 with a break under 15; the 1-hour warning fires only above 360 · (d) silent / warns |
| Rule | R11, R12, R13, R14 |

---

## Rounding

Stated per quantity and per step, never once in general. Whether a step rounds or carries full precision decides the last centavo.

| Quantity | Unit | Direction | Applied at | Source |
|---|---|---|---|---|
| INSS contribution | centavo | half-up | **Only on the final sum** of all brackets — never bracket by bracket | Portaria MPS/MF nº 13/2026 — the published R$ 988,09 ceiling discount reproduces only under this order (E2) |
| IRRF | centavo | half-up | **Only on the final tax**, after the parcela and the reduction are both subtracted | Project convention, consistent with RFB practice for positive amounts |
| INSS used as an IRRF deduction | centavo | half-up | The already-rounded INSS enters the deduction (E6) | Project convention |
| Gross hourly rate | — | none | Carried at full double precision into every downstream product | Rounding it first would leak a fraction of a centavo into every hour |
| Overtime pay per tier | — | none in the model | Rounded only by the display formatter, per line | Each line is formatted independently; there is no displayed total of the lines |
| Night premium | — | none in the model | Rounded only by the display formatter | Same |
| DSR | — | none in the model | Computed from the **unrounded** sum of overtime and premium, then formatted | Rounding each tier first would shift the DSR by up to a centavo |
| Displayed currency | centavo | `Intl.NumberFormat("pt-BR")` default (half-expand) | Presentation only | Project convention |
| Night ficta minutes | minute | half-up (`Math.round`) | On the conversion `minutes × 60 / 52,5` | Project convention — the journey is expressed in whole minutes |
| Displayed durations | minute | half-up | On formatting only | Project convention |
| Coherent divisor | 0,01 h | half-up | On `dailyHours × 25` | Project convention |
| Dependents | whole | truncate toward zero | Before the deduction is multiplied | Project convention |

**Binary-dust defence.** Monetary rounding goes through `Number((value * 100).toPrecision(12))` before `Math.round`, so a value that is mathematically 988,0914 cannot arrive as 988,09139999 and round down. This is deliberate and must survive any refactor.

**Non-real amounts.** A value that is not finite or not strictly positive is treated as zero before it enters any formula (`isRealAmount` / `sanitizeAmount`). Because a zero produced this way is indistinguishable on screen from a zero that is the answer, the gross-salary field carries a visible warning when it is not a real amount — silence there would be a defect, not a simplification.

---

## Disclaimers the app must show

Where the app cannot be sure, it says so. The verbatim pt-BR wording is in `copy.md`; this table states the obligation and the variable it exists for.

| Where | What the user is told | Why |
|---|---|---|
| Footer, both views | The values are an estimate, do not replace a holerite, do not count as an official ponto record, and are not legal or accounting advice | The app computes; it does not advise (`PRODUCT.md` §7) |
| Footer, both views | The explicit list of what is not in the calculation: FGTS, collective-agreement benefits and premiums, 13º salário and the one-third of férias, INSS and IRRF over the overtime, the night-journey extension past 05:00 (Súmula 60 do TST), holidays, the value of the suppressed break, insalubridade and periculosidade | Each is a variable a real payslip includes and this calculation omits |
| Footer, both views | The Estatutário regime uses the **federal** RPPS table and does not hold for state or municipal servants | The federal ladder reaches 22%; most state and municipal regimes are a flat 14% |
| Footer, both views | The table year, its effective date, and a link to the norm | The year is part of the answer (`PRODUCT.md` §4). Without it the app is indistinguishable from an out-of-date one |
| Footer, both views | Everything typed stays in this browser | Privacy is a product commitment, and the user is typing a salary |
| Day summary, under the DSR line | The DSR assumes these extras repeat on every working day of the month and counts Sundays only — holidays do not enter | The DSR extrapolates a single day to a month, and the holiday omission understates it |
| Journey settings, on the first-tier field | The legal floor is 50% over the normal hour (CF art. 7º, XVI; CLT art. 59, §1º) | Anchors the user's own rate to the statutory minimum |
| Journey settings, on the second-tier field | No law doubles the premium after the second hour; the floor stays 50%, and 100% should only be used if the user's collective agreement provides that step | The 100% default would otherwise read as a legal entitlement |
| Custo da Hora, above the results | A missing gross salary or a missing monthly load is named as a missing input, not shown as R$ 0,00 | A confident zero is a wrong number |
| Custo da Hora, header | The overtime on the Jornada tab is priced on the **gross** hour, per CLT art. 59, §1º — while this screen's own figure is the net cost of an hour | Two different hour concepts share one screen; without this line the user cannot tell them apart |
| Custo da Hora, when the load contradicts the journey | Súmula 431 do TST: the entered journey corresponds to a different divisor, and a larger divisor lowers the value of every hour | The app refuses to silently overwrite a number the user typed |
| Regime picker | The regime changes only the INSS calculation; the IRRF table is the same for both | Prevents the user reading the regime as a full tax profile |

---

## Out of scope

Binding on every downstream agent. An agent that computes something listed here has broken this gate. Each item is named in the app's footer wherever a user could mistake its absence for a promise.

| Excluded | Why | What the user sees instead |
|---|---|---|
| **Súmula 60, II do TST** — night premium extended to hours worked past 05:00 when the whole journey was at night | Deferred at the baseline. It changes the night minute count, the ficta bonus, the premium and the DSR at once, and it needs a rule for "whole journey performed at night" that the current day model does not express | The footer names the Súmula 60 extension among what is not in the calculation |
| **Holidays, and weekend tiering keyed on the exit day** | No holiday calendar can be kept accurate for 5.570 municipalities, and an inaccurate one is worse than the disclaimer that replaces it (`PRODUCT.md` §7). The weekend check reads the **entry** date's weekday, so a Friday-night shift ending Saturday is a weekday shift | The footer names holidays among what is not in the calculation |
| **Overtime, night premium and DSR inside the INSS and IRRF base** (Lei 8.212/91 art. 28, I; Lei 7.713/88 art. 7º) | The tax screen taxes the gross-salary field alone; the Jornada figures never feed it. Wiring them together would require the two screens to share a monthly accumulation the product does not keep | The footer names the INSS/IRRF incidence over overtime among what is not in the calculation |
| **13º salário and the one-third of férias** (Lei 4.090/62; CF art. 7º, XVII) | The yearly figure multiplies the monthly net by 13. The 13º has its own INSS and exclusive-source IRRF, so its net is not the monthly net; the one-third is absent entirely | The footer names the 13º and the terço de férias among what is not in the calculation |
| **The monetary value of the suppressed break** (CLT art. 71, §4º) | The warning states the rule; pricing it needs the same gross hour the compliance module does not receive | The warning explains that the suppressed time is owed with a 50% indemnifying increase, without a figure |
| **Weekly rest of 24 consecutive hours** (CLT art. 67; Lei 605/49) | The app has no weekly aggregation. It is strictly a single-day model | Nothing — there is no partial check to mislead with |
| **Banco de horas and compensação** (CLT art. 59, §§2º–6º; art. 611-A, XIII) | Requires a period, a regime and a distinction between paid and compensated overtime that the single-day model does not carry | The day balance, with no compensation regime attached |
| **Trabalhador rural** (Lei 5.889/73 art. 7º) | Different night windows (lavoura 21:00–05:00, pecuária 20:00–04:00) and no reduced hour. Applying the urban rule would be wrong, and detecting the sector would need a field the product will not add | The urban window, disclosed as CLT art. 73 |
| **Menor de 18 e jornadas especiais** (CLT art. 404; CF art. 7º, XIV) | Prohibition of night work for minors and the 6h journey for uninterrupted shift rotation are status rules, not arithmetic the app can infer | Nothing |
| **Escalas 12×36** (CLT art. 59-A) | A 12h journey is expressly authorised and would trip the art. 59 warning wrongly; suppressing the warning needs a regime field | The art. 59 warning, which will fire on a 12×36 day |
| **FGTS** (Lei 8.036/90 art. 15) | Not an employee deduction. Adding it would mean the screen mixes what is deducted from the worker with what is deposited for them | The footer names FGTS among what is not in the calculation |
| **State and municipal RPPS** (EC 103/2019 art. 9º, §4º) | Each of them legislates its own rates; there is no national table to cite | The regime text and the footer both say the federal table is the one applied and does not hold for state or municipal servants |
| **Pensão alimentícia and previdência complementar as IRRF deductions** (Lei 9.250/95 art. 4º, II e V) | Real legal deductions the app does not offer, which overstates the IRRF of anyone who pays them | The manual IRRF override, which lets the user type their real figure |
| **Convenção coletiva rates beyond the two overtime fields** | Cannot be kept accurate (`PRODUCT.md` §7) | Two editable rate fields, each carrying the statutory floor |

---

## Known imprecisions

Only the human accepts a known legal imprecision, and the acceptance is recorded here.

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|
| The 2h limit of art. 59 is measured on **ficta** minutes, because overtime derives from a journey that already includes the night bonus. A night worker trips the warning with less real time worked. | No monetary impact. Shifts only the moment the warning appears, by up to the night bonus (roughly 8 minutes per real night hour). Defensible — the ficta hour *is* journey time — but it is an interpretive choice and it is not stated on screen. | human | 2026-09-14 |
| The year figure is the monthly net × 13, with no one-third of férias and no separate 13º tax treatment. | Understates the year by roughly 2,5% from the missing terço, and the 13º net is not the monthly net because its tax bases differ. Both directions of error are present. | human | 2026-09-14 |
| `parseCurrency` keeps digits only, so a pasted US-format string such as `1234.56` is read as R$ 123.456,00. | A silent order-of-magnitude error on paste. Typing is unaffected: the mask formats as the user types, so the displayed value always matches what was parsed. | human | 2026-09-14 |
| The ficta conversion rounds to the whole minute, which can shift the journey by up to one minute per night stretch. | Up to one minute of journey per day, which becomes money once multiplied across a month. | human | 2026-09-14 |
| The weekend tier is keyed on the **entry** date's weekday, and Saturday is treated as a 100%-tier day. | A Friday-night shift ending Saturday is priced as a weekday; a Saturday shift is priced entirely in the second tier. There is no statutory basis for the Saturday tier — Súmula 146 guarantees the double for the **uncompensated Sunday or holiday**. | human | 2026-09-14 |
