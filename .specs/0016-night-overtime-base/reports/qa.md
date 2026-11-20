# REJECT — G6 QA, run 1

Reviewed the delivered 0016 working-tree diff over `5c0c6fa` in `workload-stack-review-local`.

## Required changes

1. **Correctness — `lib/night-shift.ts:91`.** In `TZ=America/Sao_Paulo`, enter 31/12/1913 13:00, leave and return from the break at 21:00 and 22:00, and enter manual exit 01/01/1914 06:00, with an expected 480 min. The date parser accepts both dates and `findJourneyIssue` returns `null`. The canonical overlap counts 413 real night minutes, which gives 472 credited night minutes. All night work follows the 480 diurnal minutes, so the tier split should be 120 + 352 = 472. The scanner returns 120 + 353 = 473 because the local offset jumps by 6 min 28 s, leaving the minute starting at 04:59:28 straddling 05:00. This violates AC6 and the conservation rule in `.specs/0016-night-overtime-base/legal.md`. Share canonical clipped night-window semantics and add a permanent conservation regression.
2. **Responsiveness — `lib/night-shift.ts:90`, called synchronously by `hooks/use-work-calculator.ts:219`.** The date field accepts real four-digit years and validation checks date order (`components/molecules/date-time-input.tsx:28` and `lib/journey.ts:38`). In manual mode, keep entry at 20/11/2026 08:00 and lunch 12:00–13:00 with an expected 480 min, then commit an exit at 23:45 on one of the dates below. The new loop constructs one Date for each complete worked minute, including for years accidentally typed into the field. Iterate the existing night windows and allocate the before/after credit interval of each contiguous worked overlap. Preserve rounding across the whole shift and the existing valid dates.
3. **Regression coverage — `__tests__/use-work-calculator.test.ts:137`, `__tests__/day-summary.test.tsx:182`, and `__tests__/night-shift.test.ts:126`.** AC2–AC4 ask for derived A/B operands and a comparison of their exact amounts before DSR. The hook test checks the operands and the summary test independently supplies fabricated totals. AC5 asks for exactly the three 119/120/121 cases with minutes and cents in each tier. The table asserts 13 rows across several obligations, and no cents assertions use the 119/120/121 inputs. Wire the derived stats into the monetary assertions and assert the three-case boundary population.

## Evidence

`pnpm exec vitest run __tests__/night-shift.test.ts __tests__/day-breakdown.test.ts __tests__/day-summary.test.tsx __tests__/use-work-calculator.test.ts` returned 4 files and 88 tests passing. G5's recorded build, lint, typecheck and coverage results are in `.specs/0016-night-overtime-base/STATUS.md`. The coordinating run owns the independent full-suite check.

Node 24.15.0 in `America/Sao_Paulo`. These runs timed the actual `buildDayBreakdown` and `calculateWorkStats` functions in the same process, with the entry, break and expected minutes above. The baseline column is the canonical breakdown function alone in the delivered tree. Every date parsed successfully and produced `findJourneyIssue(...) === null`.

| Exit at 23:45 | Worked minutes before + after break | Breakdown ms, three runs | Stats ms, three runs |
|---|---:|---|---|
| 20/11/2026 | 240 + 645 | 0.6, 0.1, 0.0 | 0.4, 0.2, 0.2 |
| 20/11/2027 | 240 + 526245 | 0.5, 0.3, 0.3 | 40.1, 25.4, 24.7 |
| 20/11/2036 | 240 + 5260965 | 2.4, 2.1, 1.7 | 224.7, 220.8, 233.1 |
| 20/11/2126 | 240 + 52595205 | 19.5, 17.3, 18.6 | 2389.5, 2280.7, 2299.8 |

The elapsed times are evidence of a synchronous regression on accepted inputs. The operation count follows directly from the two stretch durations. The clock ticks each second while the memoized calculation receives a minute-resolution timestamp.

## Acceptance review

| Criterion | Result | Evidence |
|---|---|---|
| AC1 | Pass | G2 decision in `.specs/0016-night-overtime-base/legal.md` and `.specs/0016-night-overtime-base/STATUS.md`. |
| AC2–AC4 | Verification gap | `__tests__/use-work-calculator.test.ts:137` derives equal totals and distinct intersections. `__tests__/day-summary.test.tsx:182` verifies the expected lines and DSR from manually provided props. |
| AC5 | Verification gap | `__tests__/night-shift.test.ts:126` covers 119/120/121 min, and `__tests__/day-summary.test.tsx:199` checks different rates on a 120/30 case. |
| AC6 | Fail | `__tests__/night-shift.test.ts:126` covers the regular boundaries, a break and midnight. The 1914 reproduction overcounts night overtime across the end of a shortened night window. |
| AC7 | Pass | `__tests__/use-work-calculator.test.ts:416` compares the full automatic/manual stats and the rendered money at the same instant. |
| AC8 | Pass | `__tests__/day-summary.test.tsx:182` proves R$ 10,07 versus R$ 10,67 DSR. `__tests__/day-summary.test.tsx:216` exercises rounding and `__tests__/day-summary.test.tsx:224` covers the daytime control. The diff for `lib/weekly-rest.ts` is empty. |
| AC9 | Pass | Directed suite, 88/88. The 05:00 cutoff case rejects daytime night credit with ordinary minute-aligned dates. The 0016 diff preserves the registry architecture, hourly rate and tier policy. |

## PASS — G6 QA, run 2

Reviewed the revised 0016 working-tree diff over `5c0c6fa`.

- The 1913–1914 São Paulo reproduction now returns 413 actual night minutes, 472 credited night minutes and 120 + 352 = 472 allocated. `__tests__/night-shift.test.ts:229` guards a minute that straddles 05:00.
- The same accepted manual date inputs in the Node 24.15.0 probe now take 6.2, 8.9 and 10.6 ms for the 2036 exit, and 52.3, 56.9 and 59.5 ms for the 2126 exit. The shared traversal runs once per night window in each worked stretch. Cost still scales with the calendar days examined.
- The deterministic probe with seed 15807 compared the canonical night count to `5c0c6fa` across 5,999 ordered minute-resolution inputs in São Paulo, Manaus and Noronha. It compared modern tier allocations to the original minute scan and checked the allocation bounds for every input. No differences or bound failures occurred.
- `__tests__/day-summary.test.tsx:194` derives both journeys, asserts their matching totals and different night overtime allocations, then verifies the exact visible amounts. The lines add to R$ 68,00 and R$ 72,00 before DSR. `__tests__/day-summary.test.tsx:238` asserts all three cases and cents in both tiers. Removing one row fails the length guard. The three pairs are R$ 63,47 / R$ 0,00, R$ 64,00 / R$ 0,00 and R$ 64,00 / R$ 0,73.
- The directed Vitest command above passed 90 tests across 4 files with the final three-case guard. AC2–AC6 pass. The unchanged cases for AC1 and AC7–AC9 passed in run 1 and retain their evidence. Independent full local checks are coordinated separately.
