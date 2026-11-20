# REJECT — G6 refactor review, run 1

Reviewed the 0016 hunks over `5c0c6fa` in `lib/night-shift.ts`, `hooks/use-work-calculator.ts`, `components/organisms/work-calculator.tsx`, `components/organisms/day-summary.tsx`, `__tests__/night-shift.test.ts`, `__tests__/use-work-calculator.test.ts` and `__tests__/day-summary.test.tsx`.

## Required cut

- `lib/night-shift.ts:18` and `lib/night-shift.ts:90` — reuse rung. The module encodes the night-window boundaries twice, first as calendar intervals and then as an hourly predicate on each worked minute. Share the existing calendar-window traversal and derive one before/after credit interval for each clipped worked night span. A contiguous night span contains only night credits, so its intersections with the two tiers are the same as the sum of intersections of its consecutive subintervals. This removes the per-minute clock classification and the duplicate boundary rule. The discrepancy those two rules produce is reproduced in `.specs/0016-night-overtime-base/reports/qa.md`.

## Dependencies and reuse

The package manifest and lockfile have empty diffs. `nightOvertimePremiumPay` reuses `nightPremiumPay`, and the existing summary and DSR calculation consume the corrected amounts. The two numbers carried by `WorkStats` are used by the corresponding two displayed tiers.

## PASS — G6 refactor review, run 2

`lib/night-shift.ts:11` and `lib/night-shift.ts:18` now provide the worked stretches and clipped night windows used by both the night count and the split. Each clipped interval is allocated with its cumulative night credit before and after the interval. This removes the duplicate hourly predicate and the Date allocation per worked minute. The two call sites share the same window iterator, and the dependency diff is empty. The run 2 timing and conservation evidence is in `.specs/0016-night-overtime-base/reports/qa.md`.
