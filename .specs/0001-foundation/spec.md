# 0001 — Foundation

> Owner: product-manager · Gate: `spec`

Baseline spec. It documents the calculator **as it exists today**, written after the fact so the rebuild contract in `.specs/README.md` holds for code that predates the pipeline. Nothing here proposes a change; everything here describes something that ships.

## Problem

A Brazilian CLT worker is standing at a time clock with a phone in one hand. They have a question about their own hours or their own money and no way to answer it that they can trust. The calculators that rank for these searches give them a number and nothing else — not the table it came from, not the year that table took effect, not what it left out. A worker who cannot see the source cannot tell a correct number from an invented one, and both are displayed with the same confidence.

The gap is not arithmetic. It is **provenance**. `PRODUCT.md` §4 states the whole positioning in one sentence: every number WorkLoad shows can be traced to a Brazilian norm in force, and WorkLoad says so.

## Audience & moment

`PRODUCT.md` §1: a CLT worker, on a phone, usually standing, at the moment of clocking in or clocking out. Not a lawyer, not an accountant, not an HR department. Secondary audiences with the same product and the same screens: the **servidor público estatutário** (federal RPPS ladder instead of the RGPS table) and the **empregado público** (CLT contract inside a state company).

Ten-second first contact. There is no onboarding, no account, no submit button, and no result screen to navigate to.

## The three questions

Straight from `PRODUCT.md` §1. Everything in scope exists to answer one of them.

| # | The user's words | Where it is answered |
|---|---|---|
| Q1 | **"A que horas eu posso sair?"** — I clocked in at 08:12, took an hour for lunch, my journey is 8h. When am I free? | `/` — Jornada. The hero panel shows the projected exit and a live countdown to it. |
| Q2 | **"Quanto de hora extra eu já tenho?"** — and is it being paid at the right rate, with the night premium I am owed? | `/` — Jornada. The day summary splits overtime into its two tiers, prices each in reais, adds the 20% night premium and the DSR it generates. |
| Q3 | **"Quanto cai na minha conta?"** — my gross is X. After INSS, IRRF, dependents and deductions, what is left? | `/custo-da-hora` — Custo da Hora. Net salary, total deductions, and the same pay expressed per hour, day, week, month or year. |

## Outcome

- The user reads the answer to their question within ten seconds of a cold load on a phone, without pressing anything.
- Every figure they read is traceable to a table in `lib/legal-tables.ts` that carries its norm, its effective date and its source URL, and the app names that table and its year on screen.
- Where the calculation omits a variable their real payslip includes, the user is told so in plain Portuguese, next to the numbers — not in a collapsed panel, not in a tooltip, not in silence.

## Scope

**Two routes, one app shell, one bottom tab bar.** `/` (Jornada) and `/custo-da-hora` (Custo da Hora). The view is the route; there is no client-side tab state.

**Jornada — `/`**

- Entry, lunch out, lunch in, exit, each as a date + time pair with a Brazilian mask.
- **AUTO** exit: the app computes when the journey closes from the daily journey length. **MANUAL** exit: the user types what they actually clocked.
- Live countdown to the projected exit, flipping to a live overtime clock once it passes; a progress ring showing the day consumed and the overtime accrued.
- Day summary: morning / lunch / afternoon stretches, the reduced night hour credited as extra journey time, worked vs. expected, the remaining time, and the signed day balance.
- Overtime split into the first two hours and the hours beyond, each priced in reais at its own configurable rate, defaulting to 50% and 100%.
- The 20% night premium (CLT art. 73, *caput*), computed on the ficta night minutes and shown as money.
- The DSR those variable amounts generate (Súmula 172 do TST), computed from the calendar month of the entry date.
- Compliance warnings: the 2h daily overtime limit, the 15-minute break for a 4h–6h journey, the 1h lunch for a journey over 6h, and the 11h interregno since the previous day's exit.
- Journey settings: daily journey length and the two overtime rates, each carrying the norm that governs it.
- Reset, behind a confirmation dialog.

**Custo da Hora — `/custo-da-hora`**

- Gross salary, work regime (CLT / Estatutário), monthly hours, daily journey.
- INSS by regime (RGPS ladder for CLT, federal RPPS ladder for Estatutário), IRRF with dependents and the Lei 15.270/2025 reduction, both overridable by hand.
- Free-form extra deductions and extra gains, each a name and an amount.
- Net salary, total received, total deductions.
- The value of the user's time expressed per hour, day, week, month or year, with the per-hour and per-minute rate always in support.
- A divisor-coherence warning when the monthly hours do not match the daily journey (Súmula 431 do TST).
- Empty-data warnings: no gross salary, no monthly hours — each naming that the zero on screen is the missing input, not the answer.

**Across both**

- Everything persists to `localStorage` and nowhere else. No account, no backend, no network call that carries a number the user typed.
- Dark and light, both first-class, following the system by default.
- Cookie consent gating Google Analytics; AdSense in a reserved footer slot behind the same consent, never between the user and an answer.
- A footer that states the privacy position, the estimate disclaimer, the explicit list of what is not computed, and the year, effective date and source of the fiscal tables.
- pt-BR only.

## Out of scope

Binding on every downstream agent. Each of these is a deliberate exclusion, not an oversight, and the full legal list with its reasoning is in `legal.md` § *Out of scope*.

- **Súmula 60, II do TST** — the night premium is not extended to hours worked past 05:00 on a journey wholly performed at night.
- **Holidays, Sundays and Saturdays as a pay tier.** The weekend check keys off the entry date's weekday and is not a holiday calendar. Feriados are not detected, nationally or municipally.
- **Overtime, the night premium and the DSR inside the INSS/IRRF base.** The tax screen taxes the gross salary field alone.
- **13º salário, the constitutional one-third of férias, and their separate tax treatment.** The year is thirteen monthly nets.
- **The monetary value of a suppressed break** (art. 71, §4º). The warning explains the rule; it does not price it.
- **Banco de horas / compensação, escalas 12×36, turnos ininterruptos de revezamento, trabalhador rural, menor de 18.**
- **FGTS.**
- **State and municipal RPPS.** "Estatutário" applies the federal ladder and says so.
- **Pensão alimentícia and previdência complementar** as IRRF deductions.
- **Convenção coletiva database, timesheet history, employer-side features, sync, English, legal advice.** `PRODUCT.md` §7.

## Acceptance criteria

| # | Criterion | How it is verified |
|---|---|---|
| AC1 | From a cold load of `/` with the defaults, the hero panel shows a projected exit time and a running countdown without any input from the user. | Browser at 390px; `__tests__/work-calculator.test.tsx` |
| AC2 | Changing any journey field updates the exit, the balance and the day summary without a submit action. | `__tests__/journey-form.test.tsx`, `__tests__/use-work-calculator.test.ts` |
| AC3 | Every INSS bracket, RPPS bracket, IRRF bracket, parcela a deduzir, simplified deduction, dependent deduction, exemption ceiling and reduction coefficient in `lib/legal-tables.ts` matches `legal.md` digit for digit. | `__tests__/legal-tables.test.ts`, `__tests__/payroll.test.ts` |
| AC4 | INSS on a salary at or above the RGPS ceiling equals **R$ 988,09**. | `__tests__/legal-tables.test.ts` asserts the computed ceiling discount against the published value |
| AC5 | No fiscal figure appears as a literal in any UI string; every one is interpolated from `lib/legal-tables.ts`. | `grep -rn` over `components/`, `app/`, `lib/` for bracket values; `lib/payroll.ts` `WORK_REGIME_INFO[].impact` builds its text with `formatCurrency` |
| AC6 | The footer names the table year, its effective date in `DD/MM/AAAA`, and links to the source URL, all read from `CURRENT_LEGAL_YEAR`. | `__tests__/calculator-views.test.tsx` |
| AC7 | The overtime tiers and the night premium are priced on the **gross** hourly rate (`grossSalary / monthlyHours`), never on a net-derived rate. | `__tests__/payroll.test.ts`, `__tests__/use-gross-hourly-rate.test.ts` |
| AC8 | The night line in the day summary renders a currency amount, not a bare duration. | `__tests__/day-summary.test.tsx` |
| AC9 | The DSR line appears whenever the variable pay is above zero and carries its assumption in visible text. | `__tests__/day-summary.test.tsx`, `__tests__/weekly-rest.test.ts` |
| AC10 | Each of the four compliance warnings fires exactly at its threshold and carries its article. | `__tests__/compliance.test.ts` |
| AC11 | Both overtime-rate fields carry a hint naming the legal floor, bound to the input by `aria-describedby`. | `__tests__/journey-form.test.tsx` |
| AC12 | A monthly load incoherent with the daily journey raises the Súmula 431 warning naming the coherent divisor. | `__tests__/salary-calculator.test.ts`, `__tests__/salary-period.test.ts` |
| AC13 | A gross salary that is not a real positive amount raises a visible warning instead of rendering a confident R$ 0,00. | `__tests__/salary-calculator.test.tsx` |
| AC14 | Nothing the user types leaves the browser: no `fetch`, no form action, no analytics payload carries a salary or a timestamp. | `grep` for `fetch(`; `lib/analytics.ts` event parameters are device metadata only |
| AC15 | Reloading the page restores every input from `localStorage`, with stored journey timestamps shifted to today. | `__tests__/use-work-calculator.test.ts`, `__tests__/use-salary-calculator.test.ts`, `__tests__/storage.test.ts` |
| AC16 | `pnpm test:coverage` holds 100% statements/branches/functions/lines in `lib/**` and `hooks/**`, and 90% in `app/**` and `components/**`. | `vitest.config.ts` thresholds fail the run below the bar |
| AC17 | No horizontal overflow and no control outside the viewport at 390, 1440, 2560 and 3840. | `tests/e2e/responsive.spec.ts` |
| AC18 | Zero axe-core violations at `critical` or `serious`, in both themes. | `node .agents/tools/preview.mjs` |
| AC19 | Analytics load only after the user accepts telemetry, and the choice survives a reload. | `__tests__/cookie-consent.test.tsx`, `__tests__/analytics-wrapper.test.tsx`, `__tests__/consent.test.ts` |
| AC20 | The footer lists every computation named in `legal.md` § *Out of scope* that a user could mistake for a promise. | Read the footer against `legal.md`; `__tests__/calculator-views.test.tsx` |

## Evidence available

Every claim the product may make, and nothing beyond it. `PRODUCT.md` §9 is the ceiling.

| Claim | Source |
|---|---|
| The 2026 RGPS and federal RPPS tables are correct | Portaria Interministerial MPS/MF nº 13, de 09/01/2026 — `legal.md` R4, R5 |
| The 2026 IRRF table, the simplified deduction and the Lei 15.270/2025 reduction are correct, and the reduction keys off **gross** income | Lei nº 15.270, de 26/11/2025 — `legal.md` R6, R7 |
| The night window and the 52min30s reduced hour are correct | CLT art. 73, §§1º e 2º — `legal.md` R2 |
| The 20% night premium is paid and cumulative with the reduced hour | CLT art. 73, *caput* — `legal.md` R1 |
| Overtime is priced on the gross hour | CF art. 7º, XVI; CLT art. 59, §1º — `legal.md` R8 |
| The DSR on habitual overtime is computed, not merely mentioned | Lei 605/49 art. 7º, §2º; Súmula 172 do TST — `legal.md` R9 |
| Coverage is enforced, not asserted | `vitest.config.ts` fails the run below the per-area thresholds |
| Works at 390 / 1440 / 2560 / 3840 | `tests/e2e/responsive.spec.ts` |

## Disclosure obligations

`PRODUCT.md` §4, "name the gap". Each of these must be visible, in pt-BR, where the user can reach it without opening anything. Wording lives in `copy.md`; placement in `design.md`; the legal reason in `legal.md`.

| Obligation | Where it must appear |
|---|---|
| The values are an estimate and are not a payslip, not an official ponto record, and not legal or accounting advice | Footer, both views |
| The explicit list of what is not computed — FGTS, CCT benefits, 13º and the one-third of férias, INSS/IRRF over overtime, Súmula 60 extension, holidays, the suppressed-break amount, insalubridade and periculosidade | Footer, both views |
| "Estatutário" applies the **federal** RPPS ladder and does not hold for state or municipal servants | Footer, and the regime option's own text |
| The year and effective date of the fiscal tables, with a link to the norm | Footer, both views |
| The DSR assumes the same extras on every working day of the month and counts Sundays only | Day summary, immediately below the DSR line |
| The 100% tier above the second hour is a collective-agreement step, not a statutory one | Hint on the rate field, bound by `aria-describedby` |
| A zero on screen caused by a missing input is the missing input, not an answer | Alert above the results on Custo da Hora |
| Everything typed stays in this browser | Footer, both views |

## Non-goals

What a well-meaning downstream agent might add, and must not.

- A holiday calendar, a CCT database, or any rate table that cannot be kept accurate.
- A year selector, a remote fetch of the tables, or dynamic table loading. The year registry exists to make the yearly update a one-file diff and to give the numbers a date — not to become a feature.
- Silently rewriting a value the user typed. The Súmula 431 mismatch warns; it does not overwrite the monthly load.
- Moving a disclosure into a collapsed panel to buy layout room.
- An ad slot between the user and a result, or in the space a result occupies.
- A submit button, a result page, an account, or English.

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| Should the 100% tier default change to 50%, the statutory floor? | Keep 100% | `PRODUCT.md` §5 — the default is the common case, and the two-tier step is what most CCTs carry. The hint names the floor and says the step depends on the convention. |
| Should the 2h limit of art. 59 be measured on real minutes or on ficta minutes? | Ficta | `lib/day-breakdown.ts` derives overtime from `workedMinutes`, which already includes the night bonus. Defensible — the ficta hour counts as journey — and recorded as a known imprecision in `legal.md`. |
| Should the monthly load be corrected to the Súmula 431 divisor automatically? | No, warn | Overwriting a number the user typed is the one behavior this product cannot afford; the warning names the coherent divisor and what the mismatch costs them. |
| Should the year registry expose a selector? | No | Only one year is supported. A selector implies years that do not exist. |
