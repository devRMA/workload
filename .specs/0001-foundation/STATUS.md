# 0001 — Status

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** in-progress
**Next agent:** release-manager
**Bounces:** none

Baseline spec. It documents the calculator as it already exists, so its gates did not run forward in the usual order — the code came first and the artifacts were written against it. Each gate below records the state it is **actually** in, not the state the template starts in.

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| G1 spec | product-manager | done | 1 | `spec.md` |
| G2 law | labor-law-analyst | done | 1 | `legal.md` |
| G3 design | product-designer | done | 1 | `design.md` |
| G3 copy | content-writer | done | 1 | `copy.md` |
| G4 plan | tech-lead | done | 1 | `plan.md` |
| G5 build | frontend-dev | done | 1 | shipped code — this spec is written against it |
| G6 qa | qa-engineer | pending | 0 | `reports/qa.md` |
| G6 audit | web-standards-auditor | pending | 0 | `reports/audit.md` |
| G6 law-check | labor-law-analyst | done | 1 | `reports/legal.md` |
| G6 ponytail | refactor-scout | pending | 0 | `reports/ponytail.md` |
| G7 docs | release-manager | pending | 0 | docs reconciled, lessons written |
| G8 release | release-manager | pending | 0 | `reports/release.md` |
| G9 preview | web-standards-auditor + labor-law-analyst | pending | 0 | `reports/audit-preview.md` |
| G10 compound | tech-lead | pending | 0 | lessons promoted, spec closed |

The G6 law-check passed: `reports/legal.md`, verdict `passed`, with four minor findings all accepted by the human and recorded in `legal.md` § *Known imprecisions*. The three remaining G6 gates have not run against this spec.

## Tasks

The build order the artifacts describe. Every task is already reflected in the shipped tree; the ids exist so a rebuild has a dependency order and so a future bounce has something to name.

| Id | Title | State |
|---|---|---|
| T1 | Token layer and `lib/utils.ts` | done |
| T2 | App shell, routing, metadata | done |
| T3 | `lib/legal-tables.ts` — the year registry | done |
| T4 | `lib/payroll.ts` — INSS, IRRF, the gross hour, rounding | done |
| T5 | `lib/night-shift.ts` — window, ficta hour, premium | done |
| T6 | `lib/weekly-rest.ts` — the DSR | done |
| T7 | `lib/compliance.ts` — the four warnings | done |
| T8 | `lib/journey.ts`, `lib/duration.ts`, `lib/salary-period.ts` | done |
| T9 | `lib/day-breakdown.ts` — the single day calculation | done |
| T10 | `lib/storage.ts`, `lib/consent.ts`, `lib/analytics.ts` | done |
| T11 | `hooks/use-current-time.ts` | done |
| T12 | `hooks/use-gross-hourly-rate.ts` | done |
| T13 | `hooks/use-salary-calculator.ts` | done |
| T14 | `hooks/use-work-calculator.ts` | done |
| T15 | The atom set | done |
| T16 | Input and field molecules | done |
| T17 | Control and list molecules | done |
| T18 | Header, view switcher, footer | done |
| T19 | `JourneyForm` | done |
| T20 | `DaySummary` | done |
| T21 | `WorkCalculator` and `HeroPanel` | done |
| T22 | `SalaryCalculator` and `TaxDetailsPanel` | done |
| T23 | Consent, analytics, ads | done |
| T24 | `CalculatorLayout` | done |
| T25 | Wire the routes | done |
| T26 | Coverage configuration | done |
| T27 | End-to-end specs | done |
| T28 | Audit pass | pending |

## Blockers

None blocking. Two open items, both recorded rather than hidden:

- **Token migration is incomplete.** `components/organisms/cookie-consent.tsx`, `components/organisms/salary-calculator.tsx` and the segment colours in `components/organisms/day-summary.tsx` still carry raw palette utilities (`neutral-*`, `indigo-*`, `blue-*`, `emerald-*`) and raw radii instead of the token set from `app/globals.css`. Pre-migration surface, not a design decision; `design.md` § *System change* names it so no reader mistakes it for intent.
- **`DESIGN.md` §Components names four components at pre-refactor paths** (`molecules/hero-panel.tsx`, `molecules/stat-box.tsx`, `molecules/alert-banner.tsx`, `molecules/collapsible-panel.tsx`) and two field components that no longer exist under those names (`form-field.tsx`, `currency-field.tsx`). The tokens, states and rules in those sections are still correct. For the `release-manager` at G7.

## Decisions log

| When | Agent | Decision |
|---|---|---|
| 2026-09-14 | labor-law-analyst | **The 20% night premium is paid as money** (CLT art. 73, *caput*), computed on the **ficta** minutes so it is cumulative with the reduced hour of §1º, and rendered in the same slot and ink as the overtime tiers. The previous behaviour showed a duration and a blank where the amount belongs — the most serious communication defect the product had. R$ 21,82 per 22:00–05:00 shift at the baseline salary; R$ 436,36 over twenty nights that had never appeared. |
| 2026-09-14 | labor-law-analyst | **Overtime is priced on the gross hour**, `grossSalary / monthlyHours` (CLT art. 59, §1º; CF art. 7º, XVI). The net hour cost and the statutory overtime base were one value under one storage key; they are now two concepts with two homes. The derived key is **deleted** on mount rather than migrated, because a net value cannot be reinterpreted as a gross one. 2h at 50% moved from R$ 37,52 to R$ 40,91. |
| 2026-09-14 | labor-law-analyst | **The DSR is computed, not merely disclaimed** (Lei 605/49 art. 7º, §2º; Súmula 172 do TST), from the unrounded variable pay over the entry month's working days and Sundays. Saturday counts as a working day; holidays are not detected, and the assumption is stated in the UI rather than hidden. |
| 2026-09-14 | labor-law-analyst | **The Súmula 431 divisor mismatch warns; it does not overwrite.** Silently rewriting a number the user typed is the one behaviour a calculator that sells provenance cannot afford. The warning names the coherent divisor and what the mismatch costs. |
| 2026-09-14 | product-manager | **The 100% second tier keeps its default** (`PRODUCT.md` §5, the default is the common case) **and gains a hint** naming the 50% statutory floor and attributing the step to the collective agreement. Changing the default would have been correct in law and wrong for the common case; the hint resolves both. |
| 2026-09-14 | tech-lead | **The fiscal tables are versioned by year in `lib/legal-tables.ts`**, and `lib/payroll.ts` holds no fiscal number at all. Previously the numbers were loose constants **and duplicated in UI prose**, so the January update meant two places, one untested. `WORK_REGIME_INFO[].impact` now interpolates from the table. Deliberately **not** built: dynamic loading, an API fetch, or a year selector — one supported year makes all three speculative. |
| 2026-09-14 | tech-lead | **The overtime limit of art. 59 stays measured on ficta minutes.** `overtimeMinutes` derives from a journey that already credits the night bonus. Defensible — the ficta hour is journey time — but it is an interpretive choice and it is not stated on screen. Recorded as a known imprecision rather than silently kept. |
| 2026-09-14 | product-manager | **The ad interstitial is removed.** An ad surface sat where it could interrupt a calculation. `PRODUCT.md` §8 is explicit: ads never sit between the user and an answer and never occupy the space where a result appears. What remains is one footer slot with a reserved height so it cannot shift the layout. |
| 2026-09-14 | qa-engineer | **Coverage is split by area: 100% in `lib/**` and `hooks/**`, 90% in `app/**` and `components/**`.** The money and the hours keep the full bar. A blanket 100% over a variant/size prop matrix is only reachable by asserting Tailwind class strings, which buys a threshold and no confidence and breaks on every design change. The `lib/` and `hooks/` bar is not to be lowered. |
| 2026-09-14 | qa-engineer | **CSS is not a coverage target.** The bar had been forcing tests of stylesheet files, which produce a number and no defect detection. |
| 2026-09-14 | tech-lead | **Every component sits at its real atomic level.** `alert-banner`, `stat-box`, `collapsible-panel` and `hero-panel` moved to the level they actually occupy. `AGENTS.md` §8 makes the level binding, and a file at the wrong level makes `design.md`'s component table a fiction. `DESIGN.md` still names four of the old paths — reconciliation item for G7. |
| 2026-09-14 | tech-lead | **`buildDayBreakdown` is the only day calculation.** Every worked minute, every segment and the overtime split derive from it; nothing re-derives a minute. It is also why the suggested exit is an iterative fixed point rather than a closed form — crediting the ficta bonus moves the exit that produces it. |
| 2026-09-14 | product-manager | **The footer names every deferred computation.** `legal.md` § *Out of scope* is not an internal note: each excluded item a user could mistake for a promise is written into the footer in plain pt-BR. Silence about an omitted variable is a defect, not a simplification (`PRODUCT.md` §4). |
| 2026-09-14 | labor-law-analyst | **Four known imprecisions accepted by the human** and recorded in `legal.md`: the ficta-minute basis of the art. 59 limit, the year as thirteen monthly nets, `parseCurrency` on a pasted US-format amount, and the whole-minute ficta rounding. A fifth — the Saturday tier and the entry-day keying — is recorded with them. Only the human can accept a known legal imprecision, and the acceptance is written into the spec. |
| 2026-09-14 | labor-law-analyst | **D3, D6, D7, D8 and O4–O12 are deferred, not forgotten.** Each is listed in `legal.md` § *Out of scope* with the reason and with what the user sees instead, so a rebuilder does not think the artifacts lost them. |
