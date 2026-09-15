# 0001 — Implementation plan

> Owner: tech-lead · Gate: `plan`

The order a rebuild follows. Written against the `.specs/README.md` contract: with `app/`, `components/`, `lib/` and `hooks/` deleted, these tasks plus `spec.md`, `legal.md`, `design.md`, `copy.md`, `PRODUCT.md` and `DESIGN.md` reconstruct a materially equivalent calculator.

## Architecture

**The dependency direction is one-way and never violated: `lib/` → `hooks/` → `components/` → `app/`.**

- **`lib/`** is pure TypeScript with no React and no browser globals beyond `localStorage` in the one module that owns it. Every business rule lives here: every table, every threshold, every rounding decision. `lib/legal-tables.ts` is the only module that holds a fiscal number; `lib/payroll.ts` consumes it and holds none. A component that computes is a defect.
- **`hooks/`** is stateful glue: it restores from `localStorage`, holds React state, memoises derived values, and writes back. It makes no legal decision — it calls `lib/`.
- **`components/`** renders. Atoms know a token and a prop; molecules compose atoms into one input concern; organisms own a region of a screen and may call a hook; templates own the grid and the chrome.
- **`app/`** is two routes over one shell. The active view **is** the route — there is no client-side tab state to keep in sync with the URL.

**Data flow, Jornada:** `useWorkCalculator` restores the journey from `localStorage`, shifts stored timestamps forward to today, derives the suggested exit by iterating `buildDayBreakdown` (the ficta night bonus moves the exit that produces it, so the exit is a fixed point, not a closed form), and hands `WorkCalculator` the stats. `WorkCalculator` reads the gross hourly rate through `useGrossHourlyRate`, builds the breakdown and the compliance warnings, and passes both down. `DaySummary` is the only place that turns minutes into money.

**Data flow, Custo da Hora:** `useSalaryCalculator` restores every field, computes INSS and IRRF through `lib/payroll.ts`, lets a manual override win over the computed value, and derives the period figure through `lib/salary-period.ts`.

**The bridge between the two screens is `localStorage`, and it is deliberately narrow:** `grossSalary` and `monthlyHours` are the primary keys, written by the salary screen and read by the journey screen. No derived rate is ever stored — that was the defect that let a net hourly rate price overtime. `useGrossHourlyRate` recomputes from the two primaries on mount and deletes the legacy derived key.

**Component tree:** as specified in `design.md` § *Components*. Atomic level is binding; a file at the wrong level is a review finding.

## Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Framework | Next.js App Router, React 19, TypeScript strict | Two static routes with per-route metadata, a sitemap, a robots file and a manifest, all as first-class file conventions |
| Styling | Tailwind CSS 4, CSS-first, tokens in `app/globals.css` | No `tailwind.config.ts`; the token layer *is* the theme, and both themes resolve through the same names |
| Class composition | `clsx` + `tailwind-merge` via `cn()` in `lib/utils.ts` | Conditional variants must not fight on specificity |
| Date arithmetic | `date-fns` | Overlap windows crossing midnight, calendar-day differences and month boundaries. Writing these by hand is where off-by-one-day defects live |
| Motion | `motion` (Framer Motion v13) | Springs must be interruptible, and `MotionConfig reducedMotion="user"` gives the reduced-motion path globally instead of per component |
| Theming | `next-themes` with `disableTransitionOnChange` | System-following default plus an explicit toggle, with no flash and no animated theme swap |
| Icons | `lucide-react` | Tree-shaken, consistent stroke weight |
| Persistence | `localStorage` only | `PRODUCT.md` §5 — no backend, ever. This is not a placeholder for one |
| Tests | Vitest + Testing Library + jsdom; Playwright for e2e | Coverage enforced per area by `vitest.config.ts` |
| Lint / format | Biome | One tool, one pass |
| **Rejected: a state manager** | React state in two hooks | Two screens, no shared client state beyond two `localStorage` keys |
| **Rejected: a form library** | Controlled inputs | There is no submit, no schema step and no server action. `PRODUCT.md` §5, "real time, not a submit button" |
| **Rejected: a date-picker component** | Native-feeling masked inputs | A mask over `inputMode="numeric"` beats a picker for someone typing a time they already know, standing up |
| **Rejected: dynamic table loading** | A static year registry | `spec.md` § Non-goals |

---

## Tasks

Each task depends only on tasks before it. Nothing in a later phase is needed to finish an earlier one.

### Phase 1 — Tokens and the shell

#### T1 — Token layer

- **Files:** `app/globals.css` (create), `postcss.config.mjs` (create), `lib/utils.ts` (create)
- **Depends on:** none
- **Reuse:** —
- **What to build:** Every token named in `design.md` § *Tokens*, with the values from `DESIGN.md` — colour (both themes, resolved by the same token name), spacing (the eight sanctioned steps and nothing else), radii, elevation, the eleven type steps with their weight/line-height/letter-spacing companions, the five durations, the three curves, `--container-app`, `--header-height`, `--breakpoint-wide`, `--font-sans`. Plus the `numeric` utility (tabular figures), the `ring-focus` utility, and the scoped reduced-motion block from `DESIGN.md` § *Motion* — never the global `0.01ms` blanket. `lib/utils.ts` carries `cn()`, `digitsOnly`, `countDigits`, the three `Intl` formatters (`formatCurrency`, `formatCurrencySimple`, `formatClockTime`), `formatTimeLabel`, `formatIsoDate`, `parseCurrency` and `PLACEHOLDER_CLOCK`.
- **Tests:** `__tests__/utils.test.ts` — currency and amount formatting, `formatTimeLabel` on an invalid timestamp returning `--:--`, `formatIsoDate` reversing an ISO date, `parseCurrency` on a masked string.
- **Done when:** `pnpm lint` clean, `pnpm test __tests__/utils.test.ts` green.

#### T2 — App shell and routing

- **Files:** `app/layout.tsx`, `app/page.tsx`, `app/custo-da-hora/page.tsx`, `app/manifest.ts`, `app/robots.ts`, `app/sitemap.ts`, `lib/calculator-view.ts`, `components/templates/theme-provider.tsx`, `components/templates/calculator-page.tsx` (all create)
- **Depends on:** T1
- **Reuse:** `lib/utils.ts`
- **What to build:** Root layout with Inter (`display: "swap"`, `--font-inter`), `lang="pt-BR"`, `suppressHydrationWarning`, the `viewport.themeColor` pair, preconnects, and every metadata string from `copy.md` § *Metadata*. `ThemeProvider` wraps `next-themes` (`attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`) around `MotionConfig reducedMotion="user"` with the default spring. `CalculatorPage` emits the `WebApplication` JSON-LD, the skip link and the `<main>`. `lib/calculator-view.ts` maps `work → /` and `salary → /custo-da-hora`.
- **Tests:** `__tests__/layout.test.tsx`, `__tests__/page.test.tsx`, `__tests__/custo-da-hora-page.test.tsx`, `__tests__/manifest.test.ts`, `__tests__/robots.test.ts`, `__tests__/sitemap.test.ts`, `__tests__/theme-provider.test.tsx`, `__tests__/calculator-page.test.tsx` — the skip link is reachable by role and name, both routes render their view, metadata objects match `copy.md`.
- **Done when:** `pnpm build` clean; both routes render — advances AC1.

---

### Phase 2 — `lib/`, the rules

Nothing in this phase imports React. Coverage bar is **100%**.

#### T3 — The legal year registry

- **Files:** `lib/legal-tables.ts` (create)
- **Depends on:** none
- **Reuse:** —
- **What to build:** `ProgressiveBracket`, `IncomeTaxRate`, `IncomeTaxBracket`, `TaxReduction` and `LegalYear` as readonly interfaces. `LEGAL_YEAR_2026` carrying, verbatim from `legal.md` § *Tables*: `year: 2026`, `effectiveFrom: "2026-01-01"`, `source`, `sourceUrl`, the four RGPS brackets, `rgpsCeilingDiscount: 988.09`, the RPPS federal ladder built by spreading the RGPS brackets and appending its four (so bracket 5 cannot drift from the RGPS ceiling), the four bounded IRRF brackets plus `topIncomeTaxRate`, `simplifiedDeduction`, `dependentDeduction`, `exemptionCeiling` and `reduction`. Export `LEGAL_YEARS` keyed by year and `CURRENT_LEGAL_YEAR`. **No other module in the repository may hold a fiscal number.** One source comment carrying the norm, per `AGENTS.md` §8.
- **Tests:** `__tests__/legal-tables.test.ts` — ceilings strictly increasing in all three ladders, rates strictly increasing in both social-security ladders, the RPPS ladder starting exactly at the RGPS ceiling, `effectiveFrom` consistent with `year`, `sourceUrl` over https, and **the contribution computed at the RGPS ceiling equal to the published R$ 988,09**.
- **Done when:** `pnpm test __tests__/legal-tables.test.ts` green — advances AC3, AC4.

#### T4 — Payroll

- **Files:** `lib/payroll.ts` (create)
- **Depends on:** T1, T3
- **Reuse:** `lib/legal-tables.ts`, `formatCurrency` from `lib/utils.ts`
- **What to build:** `WorkRegime = "clt" | "estatutario"`; `WORK_REGIME_INFO` with the labels, summaries, `who` and `impact` strings from `copy.md` § *the regime picker*, the CLT `impact` **interpolating** the ceiling, the ceiling discount and the year from `CURRENT_LEGAL_YEAR` through `formatCurrency`; `WORK_REGIMES` derived from it. `isRealAmount` (finite and strictly positive) and `sanitizeAmount`. `grossHourlyRate(grossSalary, monthlyHours)` returning zero when the divisor is not positive. `overtimePay(minutes, hourlyRate, ratePercent)` = `(minutes / 60) × hourlyRate × (1 + ratePercent / 100)`, **unrounded**. A private `roundToCents` using `Number((value * 100).toPrecision(12))` before `Math.round` — the binary-dust defence from `legal.md` § *Rounding*, which must survive any refactor. A private `sumProgressiveBrackets` that accumulates `(min(amount, ceiling) − lowerBound) × rate`, breaks as soon as `amount ≤ lowerBound`, and **rounds only the final sum**. `calculateSocialSecurity(grossSalary, regime = "clt")`. `calculateIncomeTax(grossSalary, socialSecurity, dependents = 0)` implementing, in this exact order: exemption short-circuit at `gross ≤ exemptionCeiling`; `legalDeduction = INSS + dependentDeduction × trunc(dependents)`; `deductible = max(legalDeduction, simplifiedDeduction)`; `base = gross − deductible`; the first bracket whose `ceiling ≥ base`, falling through to `topIncomeTaxRate`; `tax = base × rate − parcela − reduction(gross)`; round once at the end.
- **Tests:** `__tests__/payroll.test.ts` — `legal.md` E1, E2, E3, E4, E5, E6, E7, E9, E10 asserted **to the centavo**; a non-real amount treated as zero; a fractional dependent truncated; the regime `impact` strings containing no hard-coded fiscal literal.
- **Done when:** `pnpm test __tests__/payroll.test.ts` green at 100% coverage — advances AC3, AC4, AC5, AC7.

#### T5 — Night shift

- **Files:** `lib/night-shift.ts` (create)
- **Depends on:** none
- **Reuse:** `date-fns`
- **What to build:** The four constants from `legal.md` § *Night-shift constants*, with one source comment naming CLT art. 73 and its three parts. A private `overlapInMinutes` counting an intersection only where `end > start`. `countNightMinutes(entry, exit, lunchStart, lunchEnd)` sweeping every candidate day **from the day before the entry date** through the exit, adding the worked overlap and subtracting the lunch overlap per window, floored at zero. `nightEquivalentMinutes` = `Math.round(minutes × 60 / 52.5)`. `nightBonusMinutes` = equivalent − worked. `nightPremiumPay(nightMinutes, hourlyRate)` = `(nightMinutes / 60) × hourlyRate × 0.2`, **unrounded**, and called by the caller with the **ficta** minutes so the premium is cumulative with the reduced hour.
- **Tests:** `__tests__/night-shift.test.ts` — a journey wholly outside the window yielding zero; `legal.md` E11; the `[22:00, 05:00)` boundary in both directions; a journey crossing midnight counted once; lunch inside the window subtracted; the premium to the centavo.
- **Done when:** `pnpm test __tests__/night-shift.test.ts` green at 100% — advances AC7, AC8.

#### T6 — Weekly rest

- **Files:** `lib/weekly-rest.ts` (create)
- **Depends on:** none
- **Reuse:** `date-fns`
- **What to build:** `MonthRestSplit`; `splitMonthDays(reference)` counting the Sundays of the reference month as rest days and every other calendar day as a working day; `restDayPayOnOvertime(overtimeAmount, split)` = `amount / workingDays × restDays`, returning zero when there are no working days. One source comment naming Lei 605/49 art. 7º, §2º and Súmula 172 do TST. The caller passes the **unrounded** sum of both overtime tiers and the night premium.
- **Tests:** `__tests__/weekly-rest.test.ts` — March 2026 splitting 26 / 5; `legal.md` E12's DSR figure; the zero-working-days guard.
- **Done when:** `pnpm test __tests__/weekly-rest.test.ts` green at 100% — advances AC9.

#### T7 — Compliance

- **Files:** `lib/compliance.ts` (create)
- **Depends on:** none
- **Reuse:** —
- **What to build:** `ComplianceWarning { id, title, detail }`. `findComplianceWarnings({ overtimeMinutes, workedMinutes, lunchMinutes, minutesSincePreviousShift })` returning, in this order and with the ids `daily-overtime-limit`, `short-day-break`, `minimum-lunch-break`, `rest-between-shifts`, the four warnings of `legal.md` R11–R14 at exactly the comparisons in § *Compliance thresholds*. Titles and details verbatim from `copy.md` § *compliance warnings*. `minutesSincePreviousShift === null` must produce no warning — absence of data is never reported as compliance.
- **Tests:** `__tests__/compliance.test.ts` — `legal.md` E15, both sides of all four boundaries; the null case; an empty result for a lawful day.
- **Done when:** `pnpm test __tests__/compliance.test.ts` green at 100% — advances AC10.

#### T8 — Journey validation, duration and salary period

- **Files:** `lib/journey.ts`, `lib/duration.ts`, `lib/salary-period.ts` (all create)
- **Depends on:** none
- **Reuse:** `date-fns`
- **What to build:** `findJourneyIssue` walking `entry → lunchStart → lunchEnd → exit` in order, returning the **first** field that is either invalid or out of order, with the message from `copy.md` § *Jornada — validation`. Equal adjacent timestamps are valid — a zero-length lunch is a real shift pattern. `lib/duration.ts`: `isRealDuration`, `formatHoursAndMinutes`, `formatSignedHoursAndMinutes`, `formatPaddedDuration`, `parsePaddedDuration`, `formatClock`, `minutesToHours`, `DURATION_GROUP_SIZES`. `lib/salary-period.ts`: the five period labels, `amountForPeriod` (hour, day = hour × daily hours, week = day × 5, month, year = month × 13), and `findDivisorMismatch(monthlyHours, dailyHours)` per `legal.md` R10 and E14 — coherent divisor `dailyHours × 5 × 5` rounded to two decimals, returned only when the absolute difference is one hour or more, with a source comment naming Súmula 431.
- **Tests:** `__tests__/journey.test.ts`, `__tests__/duration.test.ts`, `__tests__/salary-period.test.ts` — each field's invalid and out-of-order message; equal timestamps accepted; `legal.md` E14's three cases; each period formula.
- **Done when:** all three green at 100% — advances AC12.

#### T9 — Day breakdown

- **Files:** `lib/day-breakdown.ts` (create)
- **Depends on:** T5, T8
- **Reuse:** `lib/journey.ts`, `lib/night-shift.ts`, `date-fns`
- **What to build:** The single day calculation every other module reads from — nothing else may re-derive a worked minute. `buildDayBreakdown(input)` returns the empty breakdown whenever `findJourneyIssue` reports anything. Otherwise: the end of work is the typed exit in manual mode and `max(entry, now)` in live mode; morning = entry → min(end, lunchStart); lunch = lunchStart → min(end, lunchEnd); afternoon = lunchEnd → end, each floored at zero. Night minutes come from `countNightMinutes` with the lunch clipped to the end of work. **`workedMinutes = morning + afternoon + nightBonus`** — the ficta bonus is journey time. Overtime is `max(0, worked − expected)`. `nightMinutes` on the returned object is the **equivalent** (ficta) count, because that is the premium's base. Segments are morning / lunch / afternoon-minus-overtime / overtime, filtered to those above zero. `progressPercent` and `overtimePercent` are capped at 100.
- **Tests:** `__tests__/day-breakdown.test.ts` — a plain day; a day in progress; a night journey reproducing `legal.md` E12's credited minutes and overtime; an invalid journey returning the empty breakdown; the segment filter.
- **Done when:** `pnpm test __tests__/day-breakdown.test.ts` green at 100% — advances AC2.

#### T10 — Storage, consent, analytics

- **Files:** `lib/storage.ts`, `lib/consent.ts`, `lib/analytics.ts` (all create)
- **Depends on:** none
- **Reuse:** —
- **What to build:** `lib/storage.ts` owns the key names (`LEGACY_HOURLY_RATE_KEY`, `GROSS_SALARY_KEY`, `MONTHLY_HOURS_KEY`, `DAILY_MINUTES_KEY`) and the typed readers: `readStoredNumber` (falls back on blank, non-finite or negative), `readStoredFlag`, `readStoredOptionalNumber`, `writeStoredOptionalNumber` (removing the key on `null`), and `readStoredList` with a type guard, returning `[]` on malformed JSON. `lib/consent.ts` reads and writes a single JSON record under `workload_cookie_consent` and exports `CONSENT_CHANGED_EVENT`; a malformed record reads as `null`, never as consent. `lib/analytics.ts` exposes `safeGAEvent`, which no-ops on the server, retries at most ten times at 500ms while `dataLayer` is absent, and **never receives a salary or a timestamp** — device metadata only.
- **Tests:** `__tests__/storage.test.ts`, `__tests__/consent.test.ts`, `__tests__/analytics.test.ts` — each fallback path, malformed JSON, the retry ceiling, the server guard.
- **Done when:** all three green at 100% — advances AC14, AC15, AC19.

---

### Phase 3 — `hooks/`

Coverage bar is **100%**.

#### T11 — `useCurrentTime`

- **Files:** `hooks/use-current-time.ts` (create)
- **Depends on:** none
- **What to build:** Returns `null` until the first effect runs, then a `Date` ticking every 1000ms, cleared on unmount. The `null` is load-bearing: it is what keeps the server and the first client render identical, and it is why the hero shows a placeholder rather than a hydration mismatch.
- **Tests:** `__tests__/use-current-time.test.ts` — initial `null`, a tick under fake timers, interval cleared on unmount.
- **Done when:** green at 100%.

#### T12 — `useGrossHourlyRate`

- **Files:** `hooks/use-gross-hourly-rate.ts` (create)
- **Depends on:** T4, T10
- **Reuse:** `grossHourlyRate`, `lib/storage.ts`
- **What to build:** On mount, **remove `LEGACY_HOURLY_RATE_KEY`** — the value stored under it was net-derived and must never be reused as a gross rate — then recompute from `GROSS_SALARY_KEY` and `MONTHLY_HOURS_KEY`. Return `null` when the result is not above zero, so the caller can render the "calculate your hour" invitation instead of R$ 0,00.
- **Tests:** `__tests__/use-gross-hourly-rate.test.ts` — the legacy key deleted; a stored salary and load producing `legal.md` E9; missing data producing `null`.
- **Done when:** green at 100% — advances AC7.

#### T13 — `useSalaryCalculator`

- **Files:** `hooks/use-salary-calculator.ts` (create)
- **Depends on:** T4, T8, T10
- **Reuse:** `lib/payroll.ts`, `lib/salary-period.ts`, `lib/storage.ts`, `lib/duration.ts`
- **What to build:** Defaults: gross 0, monthly hours 220, daily minutes 528, regime `clt`, period `hour`, dependents 0. One restore effect setting every field and then `isRestored`; one persist effect that **returns early until `isRestored`**, so the defaults can never overwrite a real stored value on first paint. `autoInss` and `autoIrrf` memoised from `lib/payroll.ts`, with a manual override winning over each. `stats` derives INSS, IRRF, the extra totals, `netSalary`, `totalValue`, the net `hourlyRate` and `minuteRate` — **this rate is the personal hour cost and is never stored, never exported and never used to price overtime** — and `periodValue` through `amountForPeriod`. `addExtra` / `updateExtra` / `removeExtra` over `crypto.randomUUID()` ids, sanitising every amount.
- **Tests:** `__tests__/use-salary-calculator.test.ts` — restore precedence, the persist guard, a manual override, `legal.md` E8, each extra mutation, period switching.
- **Done when:** green at 100% — advances AC15.

#### T14 — `useWorkCalculator`

- **Files:** `hooks/use-work-calculator.ts` (create)
- **Depends on:** T9, T10, T11
- **Reuse:** `lib/day-breakdown.ts`, `lib/journey.ts`, `lib/storage.ts`, `date-fns`
- **What to build:** Defaults 08:00 / 12:00 / 13:00, 528 minutes, tiers 50 and 100. On restore, compute the calendar-day difference between today and the stored entry and **shift every stored timestamp forward by it**, so yesterday's journey reopens as today's. Store the day's exit under `lastExit`; on restore, expose it as `previousExit` **only when the stored day is earlier than today**, and derive `minutesSincePreviousShift` from it for the art. 66 check. `calculateSuggestedExit` seeds at `lunchEnd + (expected − worked before lunch)` and then refines for at most six passes, each pass moving the candidate by the current surplus and accepting it only if the surplus strictly shrinks — the ficta night bonus makes the credited journey a function of the exit, so the exit is a fixed point. `calculateWorkStats` splits overtime into the two tiers, all of it into the second when the **entry** date falls on a Saturday or Sunday. `countedExit` is the later of the displayed exit and now, so a live journey accrues overtime past the projection.
- **Tests:** `__tests__/use-work-calculator.test.ts` — the day shift; `previousExit` suppressed on the same day; `legal.md` E13 and E12; the tier split on a weekday and at the weekend; the refinement loop converging on a night journey; the persist guard.
- **Done when:** green at 100% — advances AC1, AC2, AC15.

---

### Phase 4 — Atoms

Coverage bar from here is **90%**. Tests query by accessible role and name and assert observable behaviour; **never a Tailwind class string**.

#### T15 — The atom set

- **Files:** `components/atoms/button.tsx`, `input.tsx`, `label.tsx`, `alert-banner.tsx`, `stat-box.tsx`, `progress-ring.tsx`, `collapsible-panel.tsx`, `modal-dialog.tsx`, `google-ad.tsx` (all create)
- **Depends on:** T1
- **Reuse:** `cn()`
- **What to build:** Exactly the states in `design.md` § *States*, with the tokens in § *Tokens*. `button.tsx` exports `buttonClasses` separately from `Button` so a `next/link` can wear the same variants without nesting an anchor in a button. Every press transform pairs `active:scale-[0.97]` with `motion-reduce:active:scale-100` in the same state. `Input` is `h-14`, `autoComplete="off"`, `spellCheck={false}`, `enterKeyHint="done"`, with an `aria-invalid` branch. `AlertBanner` is `role="alert"` for danger and `role="status"` for warning. `ProgressRing` is a 120-unit viewBox rotated −90°, with a track, a progress arc and an overtime arc drawn only above zero, transitioning `stroke-dashoffset` at `--duration-data`; the whole `<svg>` is `aria-hidden`. `CollapsiblePanel` animates height and opacity at 220ms on `--ease-out`. `ModalDialog` is a native `<dialog>` using `showModal()`, closing on a backdrop click, locking body scroll while open, restoring it on cleanup. `GoogleAd` reserves `min-h-25` so it cannot shift the layout, and swallows a rejected `adsbygoogle` push.
- **Tests:** one file per atom under `__tests__/` — role and name, the `aria-invalid` branch, the alert roles, the ring at 0 / 50 / 100 / overtime, the dialog opening, closing and restoring scroll, the ad push guard.
- **Done when:** `pnpm test` green, coverage ≥ 90% for the directory.

---

### Phase 5 — Molecules

#### T16 — Inputs and fields

- **Files:** `components/molecules/masked-input.tsx`, `currency-input.tsx`, `field.tsx`, `duration-field.tsx`, `date-time-input.tsx` (all create)
- **Depends on:** T8, T15
- **Reuse:** `Input`, `Label`, `lib/duration.ts`, `lib/utils.ts`
- **What to build:** `MaskedInput` holds its own text, re-syncs when the incoming value changes, groups digits by `groupSizes` joined with `separator`, commits **only when the digit count is complete and `isValid` passes**, and on blur reverts to the last committed value when it cannot commit. `CurrencyInput` formats through `formatCurrencySimple`, and restores the caret **by digit index** after reformatting — a caret restored by character index jumps every time a thousands separator appears. `Field` renders label, control and an optional hint with a deterministic `${id}-hint`, which the caller binds with `aria-describedby`. `DurationField` and `DateTimeInput` compose `MaskedInput`; `DateTimeInput` splits an ISO timestamp into a `DD/MM/AAAA` part and an `HH:mm` part, gives the time input its own `aria-label`, stacks them below `sm`, and propagates `aria-invalid` plus `aria-describedby` to both halves.
- **Tests:** `__tests__/masked-input.test.tsx`, `currency-input.test.tsx`, `duration-field.test.tsx`, `date-time-input.test.tsx` — typing, the incomplete-then-blur revert, caret position after a thousands separator appears, the hint binding, the error propagation.
- **Done when:** green, ≥ 90%.

#### T17 — Controls and lists

- **Files:** `components/molecules/copy-button.tsx`, `period-selector.tsx`, `regime-field.tsx`, `extra-entry-list.tsx`, `extra-entry-row.tsx` (all create)
- **Depends on:** T4, T8, T15, T16
- **Reuse:** `Button`, `Input`, `CurrencyInput`, `CollapsiblePanel`, `labelClasses`, `WORK_REGIME_INFO`, `SALARY_PERIOD_LABELS`
- **What to build:** `CopyButton` with the three statuses of `copy.md`, announced in a `role="status"` span that is empty and hidden when idle, resetting at 2000ms on success and 4000ms on failure, and failing gracefully where `navigator.clipboard` is absent. `PeriodSelector` and the regime options are **real radio inputs** inside a `<fieldset>` with an `sr-only` `<legend>`, styled with `has-checked:` and `has-focus-visible:` — no JS-driven pill. `RegimeField` shows the selected label and summary on its trigger and reveals the full `who` + `impact` text of both regimes in a `CollapsiblePanel`, closing on selection.
- **Tests:** `__tests__/copy-button.test.tsx`, `period-selector` cases inside the salary tests, `regime-field.test.tsx`, `extra-entry-list.test.tsx`, `extra-entry-row.test.tsx` — the copy success and failure paths, keyboard selection of a radio, the regime panel toggling and closing on selection, add and remove.
- **Done when:** green, ≥ 90%.

---

### Phase 6 — Organisms

#### T18 — Header, view switcher and footer

- **Files:** `components/organisms/app-header.tsx`, `components/organisms/calculator-views.tsx` (create)
- **Depends on:** T2, T10, T11, T15
- **Reuse:** `Button`, `buttonClasses`, `useCurrentTime`, `safeGAEvent`, `CURRENT_LEGAL_YEAR`, `formatIsoDate`
- **What to build:** `AppHeader` — wordmark, tagline (hidden below `sm`), the live clock (hidden below `md`, `aria-hidden`, showing `PLACEHOLDER_CLOCK` until the client clock exists), and the theme toggle. `CalculatorViews` — the floating `<nav aria-label="Calculadoras">` of two `next/link`s with `aria-current="page"` and `scroll={false}`; the `AnimatePresence mode="wait"` panel swap; focus moved to `#main-content` on a view change but **not** on first render; and the four-paragraph footer, whose last line interpolates the year, the effective date through `formatIsoDate` and the source link from `CURRENT_LEGAL_YEAR`. Every string verbatim from `copy.md`.
- **Tests:** `__tests__/app-header.test.tsx`, `__tests__/calculator-views.test.tsx` — the theme toggle by accessible name, the clock placeholder before the tick, `aria-current` on the active tab, focus moving only on a change, and the footer naming the year, the date and the source link.
- **Done when:** green — advances AC6, AC20.

#### T19 — Journey form

- **Files:** `components/organisms/journey-form.tsx` (create)
- **Depends on:** T8, T15, T16
- **Reuse:** `AlertBanner`, `Button`, `CollapsiblePanel`, `Input`, `ModalDialog`, `DateTimeInput`, `DurationField`, `Field`
- **What to build:** A presentational organism — every value and callback is a prop, so the form has no opinion about storage. Title, subtitle, the gear toggle with `aria-expanded`/`aria-controls`, the AUTO/MANUAL fieldset with its `sr-only` legend and its mode hint, the settings panel (daily journey plus the two rate fields, **each rate field carrying its hint bound by `aria-describedby`**), the issue banner, the four `DateTimeInput`s with `hasError` and `errorId` wired from the issue's field, and the reset link behind a confirmation `ModalDialog`. Strings verbatim from `copy.md`.
- **Tests:** `__tests__/journey-form.test.tsx` — the settings panel toggling; both hints present and bound; the exit label switching with the mode; an issue setting `aria-invalid` on the right field only; the reset dialog cancelling and confirming.
- **Done when:** green — advances AC11.

#### T20 — Day summary

- **Files:** `components/organisms/day-summary.tsx` (create)
- **Depends on:** T4, T5, T6, T9, T15
- **Reuse:** `AlertBanner`, `lib/duration.ts`, `overtimePay`, `nightPremiumPay`, `restDayPayOnOvertime`, `splitMonthDays`, `formatCurrency`, `formatTimeLabel`
- **What to build:** The timeline bar (`aria-hidden`) over the breakdown segments; the three stretches with their start → end times, showing `agora` for the running one; the reduced-night-hour row with its article, shown only when the bonus is above zero; the worked / expected / remaining totals; the day balance, positive in the positive ink and negative in the negative ink. Then the money: both overtime tiers priced with `overtimePay` at the **gross** rate, the night premium with `nightPremiumPay` on the **ficta** minutes, and the DSR from the **unrounded** sum of all three, with its assumption paragraph immediately below. When no gross rate is stored, every money slot is omitted and the link to `/custo-da-hora` takes its place. Compliance warnings render last, one `AlertBanner` each.
- **Tests:** `__tests__/day-summary.test.tsx` — the night line rendering **currency**, not a duration; `legal.md` E12's four figures asserted to the centavo; the DSR note appearing only with the DSR; the invitation replacing the money slots when no rate exists; the warnings rendering.
- **Done when:** green — advances AC8, AC9, AC10.

#### T21 — Work calculator

- **Files:** `components/organisms/work-calculator.tsx`, `components/organisms/hero-panel.tsx` (create)
- **Depends on:** T7, T9, T12, T14, T19, T20
- **Reuse:** `CalculatorLayout`, `ProgressRing`, `CopyButton`, `useWorkCalculator`, `useGrossHourlyRate`, `findComplianceWarnings`, `buildDayBreakdown`
- **What to build:** `HeroPanel` — a generic saturated panel taking icon, label, value, tone, badge, media, footer and children, sizing its numeral with a container query so a long value shrinks instead of wrapping. `WorkCalculator` — wires the hook to the form, builds the breakdown and the warnings, derives the timer through an **exported pure** `calculateTimerData` (so the four status states are testable without a clock), flips the hero tone to `rose` only when a manual exit produces a negative balance, and suppresses `DaySummary` entirely while a journey issue is open.
- **Tests:** `__tests__/work-calculator.test.tsx`, `__tests__/hero-panel.test.tsx` — all four timer states; the summary suppressed on an issue; the tone flip; the hero value and copy affordance.
- **Done when:** green — advances AC1, AC2.

#### T22 — Salary calculator

- **Files:** `components/organisms/salary-calculator.tsx`, `components/organisms/tax-details-panel.tsx` (create)
- **Depends on:** T13, T15, T16, T17, T21
- **Reuse:** `CalculatorLayout`, `HeroPanel`, `StatBox`, `AlertBanner`, `CollapsiblePanel`, `CurrencyInput`, `Field`, `DurationField`, `PeriodSelector`, `RegimeField`, `isRealAmount`, `findDivisorMismatch`
- **What to build:** The salary card with its four fields and the regime picker; the three data alerts **above** the disclosure button; the collapsible tax panel; the stat tiles inside `aria-live="polite"`, the "Total Recebido" tile appearing only when there are extra gains; and the hero showing the period value, the supporting rate line (per-minute alone when the period is Hora, per-hour and per-minute otherwise), the `PeriodSelector`, and a two-up gross / extra-gains footer. A missing monthly load renders `—` in the value slot and the "informe a carga" line instead of a rate. Strings verbatim from `copy.md`.
- **Tests:** `__tests__/salary-calculator.test.tsx`, `__tests__/tax-details-panel.test.tsx` — each of the three alerts at its trigger; the Súmula 431 warning naming **200** for an 8h journey on a 220h load; the manual INSS/IRRF override; the gains tile appearing and disappearing; the period switch changing the hero value.
- **Done when:** green — advances AC12, AC13.

#### T23 — Consent, analytics and ads

- **Files:** `components/organisms/cookie-consent.tsx`, `components/organisms/analytics-wrapper.tsx`, `components/organisms/ad-manager.tsx` (create)
- **Depends on:** T10, T15
- **Reuse:** `Button`, `ModalDialog`, `GoogleAd`, `lib/consent.ts`
- **What to build:** `CookieConsent` — the banner after 1500ms **only when no choice is stored**, the settings dialog with a `role="switch"` carrying `aria-checked` and `aria-labelledby`, and a permanent launcher once a choice exists. Saving dispatches `CONSENT_CHANGED_EVENT`. `AnalyticsWrapper` mounts `GoogleAnalytics` **only** while telemetry consent reads `true`, subscribing to that event so a revocation takes effect without a reload. `AdManager` injects the AdSense script once, only when both the client id and the enable flag are set, and renders a single footer slot capped at `max-w-3xl`.
- **Tests:** `__tests__/cookie-consent.test.tsx`, `__tests__/analytics-wrapper.test.tsx`, `__tests__/ad-manager.test.tsx`, `__tests__/google-ad.test.tsx` — the banner suppressed when a choice is stored; accept and reject both persisting; the switch by role; analytics absent without consent and present with it; the ad slot absent without configuration.
- **Done when:** green — advances AC19.

---

### Phase 7 — Templates and pages

#### T24 — Layout template

- **Files:** `components/templates/calculator-layout.tsx` (create)
- **Depends on:** T1, T15
- **What to build:** The 12-column grid splitting 7/5 at `lg`, `gap-xl`, `items-start`, with the aside `order-first` below `lg` and `sticky` at `--header-height + --spacing-xl` from `lg` — the Answer-First Rule expressed in one class list. Both columns mount with the default spring.
- **Tests:** `__tests__/calculator-layout.test.tsx` — both slots render; the aside precedes the main in DOM order.
- **Done when:** green — advances AC17.

#### T25 — Wire the routes

- **Files:** `app/page.tsx`, `app/custo-da-hora/page.tsx` (edit)
- **Depends on:** T2, T18, T21, T22
- **What to build:** Each route renders `CalculatorPage` around `CalculatorViews` with its own `activeView`, and carries the route metadata from `copy.md`.
- **Done when:** `pnpm build` clean; both routes render their view — advances AC1.

---

### Phase 8 — Tests and gates

#### T26 — Coverage configuration

- **Files:** `vitest.config.ts`, `vitest.setup.ts` (create)
- **Depends on:** T1
- **What to build:** jsdom, globals, the `@` alias, e2e excluded, and **per-area thresholds: 100% statements/branches/functions/lines for `lib/**` and `hooks/**`, 90% for `app/**` and `components/**`.** The split is deliberate and documented in `AGENTS.md` §9: a blanket 100% over a variant/size prop matrix is only reachable by asserting Tailwind class strings, which buys a threshold and no confidence. **Do not lower the `lib/` or `hooks/` bar.** CSS is not a coverage target.
- **Done when:** `pnpm test:coverage` fails on a deliberately uncovered `lib/` branch and passes on the real tree — advances AC16.

#### T27 — End-to-end

- **Files:** `playwright.config.ts`, `tests/e2e/responsive.spec.ts`, `tests/e2e/google-tracking.spec.ts` (create)
- **Depends on:** T25
- **What to build:** Projects for desktop, iPhone and Android, plus one wide-viewport spec covering QHD and 4K. `responsive.spec.ts` asserts no horizontal overflow and no control outside the viewport at 390, 1440, 2560 and 3840. `google-tracking.spec.ts` asserts no analytics request before consent and one after.
- **Done when:** `pnpm e2e` green — advances AC17, AC19.

#### T28 — Audit pass

- **Files:** none (verification only)
- **Depends on:** T27
- **What to build:** `node .agents/tools/preview.mjs --out .specs/0001-foundation/evidence` — screenshots at desktop and mobile in both themes, axe-core and console errors. Zero `critical` or `serious`, zero console errors, zero React warnings.
- **Done when:** the run is clean in both themes — advances AC18.

---

## Risks

| Risk | Signal it happened |
|---|---|
| A fiscal number is written as a literal somewhere outside `lib/legal-tables.ts` — most easily inside a UI string | `grep` for a bracket value returns a hit in `components/`, `app/` or a prose string in `lib/`; the January table update leaves the app displaying last year's ceiling in confident text |
| A derived rate is persisted again, and overtime is priced on a net hour | A storage key holds a rate rather than the two primaries; `legal.md` E10 asserts R$ 37,52 instead of R$ 40,91 |
| Rounding creeps into an intermediate step | The RGPS ceiling contribution comes out at R$ 988,08 instead of R$ 988,09, or the DSR shifts by a centavo |
| The binary-dust defence is removed as "unnecessary precision" | A value that is mathematically `.5` at the centavo rounds down; `legal.md` E2 fails intermittently |
| The night premium is applied to real minutes instead of ficta minutes | `legal.md` E11 yields R$ 19,09 instead of R$ 21,82 |
| The suggested-exit refinement loop is replaced with a closed form | A night journey's suggested exit drifts by the ficta bonus, and the balance is never exactly zero |
| A disclosure is moved into a collapsed panel to buy layout room | A `legal.md` disclosure is only reachable after a click; the legal gate rejects |
| Coverage is reached by asserting Tailwind class strings | Tests break on a token rename while catching no defect; `AGENTS.md` §8 forbids it |
| A `motion-reduce:` utility is written bare instead of state-bound | A transform survives under reduced motion for as long as the pointer is on the element; only a computed-style check in a real browser catches it, never `toHaveClass` |
| `useCurrentTime` is made to return a `Date` on first render | Hydration mismatch on every load, because the server's second is not the client's |
| The restore effect stops guarding the persist effect | The defaults overwrite a real stored salary on first paint, silently |
