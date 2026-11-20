# 0006 — Build evidence (frontend-dev, G5)

> Owner: frontend-dev · Run: 1
>
> This file is populated task by task as `plan.md` tasks complete. It is raw command evidence for
> `qa-engineer` at G6, not the G6 verdict itself.

## T1 — Extract the legibility helpers into a shared support module

- `pnpm exec playwright test --list tests/e2e/disclosure-legibility.spec.ts` → `PASS (0) FAIL (0) skipped (48)`.
- Port note: PORT 3100 was held by a stale detached `next-server` (v16.3.5) from an earlier session
  in this same tree (etime 4m30s, reparented to `systemd --user`, `cwd` this repo, `PORT=3100` in its
  environ). Not another agent's active terminal — killed per lesson 013's port-ownership check before
  the run, to avoid a false "pre-existing failure" read.
- `PORT=3100 pnpm e2e tests/e2e/disclosure-legibility.spec.ts` → `48 passed (27.2s)`.
- `pnpm exec biome check .` → `Checked 141 files in 108ms. No fixes applied.`
- `pnpm typecheck` (`tsc --noEmit`) → clean, no output.
- `pnpm check` → `Test Files 58 passed (58)`, `Tests 504 passed (504)` — matches the `d8d12a6` baseline.

## T2 — Add the measurement cases, and see them red (AC2)

- `pnpm exec playwright test --list tests/e2e/alert-legibility.spec.ts` → `PASS (0) FAIL (0) skipped (72)`.
- `pnpm exec biome check .` and `pnpm typecheck` → clean.
- `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts` → **red**, as required. Ran twice (see
  `evidence/e2e-red-before-remedy.txt`): run 1, 63 failed / 9 passed; run 2 (fresh, same tree), 66
  failed / 6 passed. Both runs carry a red `C1 /custo-da-hora 390x844 light` line and a red
  `C5 / 390x844 light` line, both at **chrome spend 66** — matches `plan.md`'s stated expectation
  exactly.
- `PORT=3100 pnpm e2e tests/e2e/wide-viewport.spec.ts` → **red** on the two new cases, both runs:
  `C5 / 2560x1440 light` and `C5 / 3840x2160 light` both at **chrome spend 74** — see `STATUS.md`
  § Blockers, Finding 1: `plan.md` expected 70 at 2560, measured 74 at 2560 both times.
- `pnpm check` → still 58 files, 504 tests passed.
- Evidence saved: `evidence/e2e-red-before-remedy.txt` (both commands, both runs), and
  `evidence/measurements-before/` — 80 JSON files copied from `test-results/legibility/` after each
  run (the default Playwright `outputDir` is cleared at the start of every invocation, so each run's
  directory was copied out before the next run started; nothing here overwrote the other run's
  files, since filenames are keyed by `<project>-<surface>-<viewportWidth>-<theme>`).
- Two findings raised to `tech-lead` before starting T3 — full detail in `STATUS.md` § Blockers:
  Finding 1 (the 2560 chrome-spend prediction), Finding 2 (a non-deterministic timeout in the
  DS1/DS2/DS4 recording block, caused by a real render/localStorage race the plan's literal step
  sequence does not guard against).

## T2b — Close the pre-hydration drive race; re-capture a complete before-baseline

Both findings ruled by `tech-lead` (Finding 1 → `design.md` corrected by `product-designer`, G3 run
2; Finding 2 → new task T2b, mechanism specified to the line). Built exactly as `plan.md` T2b states.

- `driveUntil` added to `tests/e2e/support/legibility.ts`: `expect.poll` over an idempotent drive
  plus a non-waiting `isVisible`/`isHidden` predicate, no fixed sleep.
- `tests/e2e/alert-legibility.spec.ts`: `Consumer.drive` made optional, C1 has no drive entry;
  Describe A wraps every drive in `driveUntil`; Describe B rewritten to
  `driveUntil` (gross salary, settled on C1's banner disappearing) →
  `page.waitForFunction(() => localStorage.getItem("grossSalary") > 0)` → `goto("/")` →
  `driveUntil` (overtime, settled on DS2's paragraph appearing).
- `tests/e2e/wide-viewport.spec.ts`: the C5 case's drive wrapped the same way.
- `pnpm exec biome check .` and `pnpm typecheck` → clean.
- `pnpm exec playwright test --list tests/e2e/alert-legibility.spec.ts` → 72 (unchanged).
  `… tests/e2e/wide-viewport.spec.ts` → **6**, not the 4 in the plan's Done-when text — recorded as
  a minor, non-blocking finding in `STATUS.md` (the file's case count is unchanged by T2b; 6 was
  already the count after T2 added its third case).
- `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts`, run twice: **both runs — exactly 60 failed
  (all and only the C1–C5 cases) and 12 passed (all 12 Describe B cases). Zero Describe B failures in
  either run.**
- Merged both runs' `test-results/legibility/` into `evidence/measurements-before/` (copy, never
  delete) → **98 files**, matching the plan's target.
- Both runs appended to `evidence/e2e-red-before-remedy.txt` under `## T2b re-run`; T2's original
  red output is untouched above it.
- `pnpm check` → still 58 files, 504 tests passed.

## T3 — Move the icon out of the body's column and tighten the horizontal padding

- `components/atoms/alert-banner.tsx` rewritten to the exact JSX `plan.md` gives: title-row
  `<div className="flex items-start gap-3">` wraps the icon and the title `<p>`, sibling to
  `{children}`; root padding `p-4` → `px-3 py-4`. Nothing else in the file changed.
- `git diff --stat -- components/organisms/salary-calculator.tsx components/organisms/journey-form.tsx components/organisms/day-summary.tsx`
  → empty. No consumer touched.
- `__tests__/alert-banner.test.tsx`: 6 existing cases kept (case 5 strengthened, case 6 byte-for-byte
  unchanged), 2 new cases added, matching `plan.md`'s list exactly.
- `pnpm exec biome check .` and `pnpm typecheck` → clean.
- `pnpm test __tests__/alert-banner.test.tsx` → **8 passed**.
- `pnpm check` → **506 tests** (504 + 2), 58 files — no sibling regression.
- `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts`, run twice → **72 passed both times**;
  every recorded `chromeSpend` at 390 and 1440 is **26** (checked `chromium-C1-390-light.json`,
  `chromium-C1-1440-light.json`, `chromium-C5-390-light.json`, `chromium-C5-1440-light.json`).
- `PORT=3100 pnpm e2e tests/e2e/wide-viewport.spec.ts` → **6 passed**; `chromium-C5-2560-light.json`
  and `chromium-C5-3840-light.json` both record `surfaceRootWidth: 961`, `bodyTextWidth: 932`,
  `chromeSpend: 29` — matches `design.md`'s G3-run-2-corrected model to the integer.
- `PORT=3100 pnpm e2e tests/e2e/disclosure-legibility.spec.ts` → **48 passed**, unchanged.

## T4 — Full verification pass and evidence capture

- `PORT=3100 pnpm e2e` (whole suite, all projects) → **172 passed**. Tail saved to
  `evidence/e2e-green-after-remedy.txt`.
- `test-results/legibility/` copied to `evidence/measurements-after/` → **98 files**.
- `diff -r` on the 36 `DS1`/`DS2`/`DS4` files present on both `measurements-before/` and
  `measurements-after/` → **identical, zero differences**; saved (empty) to
  `evidence/ac6-untouched-geometry.txt`.
- `pnpm test:coverage` → 99.88% statements, 99.77% branches, 100% functions, 100% lines overall.
  `lib/**` and `hooks/**` at 100%; the one file below 100% (`components/organisms/ad-manager.tsx`,
  93.75%/90%) is pre-existing, untouched by this spec, and still ≥ 90%. Saved to
  `evidence/coverage-after-remedy.txt`.
- `node .agents/tools/preview.mjs --out evidence/` → **0 axe violations** (serious or critical), 4
  screenshots. 8 reported "console errors" are all `next dev` HMR WebSocket handshake failures
  (pre-existing tool artifact, not app code); 4 "contrast incomplete" nodes are on the nav link and a
  badge, neither inside `AlertBanner`'s render tree. Full detail in `evidence/report.json`.
- `git diff --stat main -- lib/` is **not empty** (14 files, pre-existing specs 0002–0005 not yet
  merged to `main`) — the decision-relevant check is the session diff: `git diff --stat -- components/
  app/ lib/` (working tree vs. `HEAD`) shows exactly **one file**, `components/atoms/alert-banner.tsx`,
  structural only, zero pt-BR text nodes added or removed.
- `grep -rln "AlertBanner" app components lib hooks __tests__ tests` → **5 files**, matching
  `spec.md`'s E1 baseline exactly. `plan.md`'s prediction of a 6th match
  (`tests/e2e/alert-legibility.spec.ts`) does not hold — that file queries by role/label/text and
  never contains the literal identifier `AlertBanner`, per `T2`'s own spec and the no-comments rule.

## T5–T6 — G6 remedy

All numbers below are from a process-isolated copy (lesson 029): `rsync --exclude node_modules
--exclude .next --exclude .git` into a scratch directory, `cp -al` the `node_modules` directory, then
`rm -rf .next` before the first build in that copy.

**T5 — `driveC5` moved into `tests/e2e/support/legibility.ts`, called at all three sites.**

- `pnpm check` → clean (`Checked 142 files`, `tsc --noEmit` clean, `506 passed` (58 files)).
- `grep -c "Hora para Saída Real" tests/e2e/alert-legibility.spec.ts tests/e2e/wide-viewport.spec.ts`
  → `0` in both. `grep -c "Hora para Saída Real" tests/e2e/support/legibility.ts` → `1`.
- `pnpm exec playwright test --list tests/e2e/alert-legibility.spec.ts` → `72`;
  `… tests/e2e/wide-viewport.spec.ts` → `6`.
- Isolated copy, `rm -rf .next` then `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts
  tests/e2e/wide-viewport.spec.ts`: first run **77 passed / 1 failed** — `[Mobile Safari] › C5 stays
  legible at / 1440x900 light` on `locator.check: Clicking the checkbox did not change its state` at
  `support/legibility.ts:172` (`driveC5`'s `.check()` on the MANUAL radio). Confirmation run, same
  copy, no code change: **78 passed**. `driveC5`'s body is a byte-for-byte move — the call was never
  edited — and this is the same Mobile Safari radio-check flake lesson 029 already recorded and
  resolved by a same-copy confirmation run (`172/172, then 78/78`). Not a T5 regression.

**T6 — `recordMeasurement` and Describe B (`Untouched disclosure geometry — DS1, DS2, DS4`) removed.**

- `pnpm check` → clean (506 passed, 58 files).
- `pnpm exec playwright test --list`: `tests/e2e/alert-legibility.spec.ts` → `60`;
  `tests/e2e/wide-viewport.spec.ts` → `6`; `tests/e2e/disclosure-legibility.spec.ts` → `48`,
  unchanged.
- `grep -rn "recordMeasurement\|RecordedMeasurement\|test-results/legibility" tests/` → no match.
- `grep -rn "node:fs\|node:path" tests/e2e/support/legibility.ts` → no match.
- Isolated copy, `rm -rf .next` then `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts
  tests/e2e/wide-viewport.spec.ts tests/e2e/disclosure-legibility.spec.ts` → **114 passed**
  (60 + 6 + 48).

**T7 — full suite re-verified in a fresh isolated copy.**

- `pnpm check`, run inside the isolated copy → clean, `Test Files 58 passed (58)`, `Tests 506 passed
  (506)`.
- `rm -rf .next` then `PORT=3100 pnpm e2e` (full suite, all projects), in the isolated copy →
  **160 passed** (172 − 12 Describe B cases). No pre-existing suite
  (`disclosure-legibility`, `dark-hydration`, `responsive`, `google-tracking`, `salary-calculator`,
  `work-calculator`) regressed.
- `.specs/0006-salary-alert-legibility/evidence/measurements-before/` (98 files) and
  `.../measurements-after/` (98 files) are **frozen** — captured under T2/T2b/T4, not regenerated or
  touched by T5/T6/T7. AC6's and AC11's numbers now live permanently in this report's § AC11 and in
  `reports/legal.md` §4.2, not in the JSON on disk.

---

# 0006 — QA verdict (qa-engineer, G6)

> Owner: qa-engineer · Run: 1

## Verdict: **reject**

Every acceptance criterion is met, every legal worked example asserted, AC6's before/after diff is
byte-identical, and the T2b flake mechanism holds across two independent confirmation runs on top of
the developer's own two. The reject is narrow and points at one thing: **the diff reinvents a helper
it already named**, a clean `AGENTS.md` §8 "reuse before writing" violation across three call sites
in the e2e suite (Finding 1, below) — independently confirmed by reading the code, not taken from
`refactor-scout`'s report, which flags the same lines and rejects on the same basis. Two further
findings are minor and non-blocking on their own; they do not need a re-run once Finding 1 is fixed.

**One thing this run corrects before anything else: the shared-tree numbers are not trustworthy
mid-G6, and this is recorded as lesson 029.** A first `PORT=3105 pnpm e2e` in the live repository
(four G6 reviewers on the same checkout) came back **5 failed / 167 passed** — a DS1 cpl of 37.67
against an expected ~52, two DS4 `Configurar` timeouts, a Mobile Safari radio-check flake — with
`uptime` load average at 27+ on 16 cores, and a second attempt failed outright on
`Error: Could not find a production build in the '.next' directory` because a sibling agent's own
`pnpm build` had written over the shared `.next` mid-run. Rebuilt in a process-isolated copy
(`rsync` excluding `node_modules`/`.next`, `node_modules` restored with `cp -al` — same filesystem,
under a second, zero reinstall) with its own `.next` and its own port: **172 passed**, then **78
passed** (`alert-legibility.spec.ts` + `wide-viewport.spec.ts`) on a second confirmation run. Every
number below that cites an e2e result is from the isolated copy or from the developer's own saved
evidence, never from the contended shared-tree run. **The repository itself was never written to by
this review; no git command that changes state was run.**

## Gate output

| Command | Result |
|---|---|
| `pnpm exec biome check .` | `Checked 142 files in 98ms. No fixes applied.` |
| `pnpm typecheck` (`tsc --noEmit`) | clean, no output |
| `pnpm build` | `Compiled successfully`, 10 routes, zero errors (font-fallback warning is pre-existing, unrelated to this diff) |
| `pnpm test` | **58 files, 506 tests passed** (504 baseline + 2 new `alert-banner` cases) |
| `pnpm test:coverage` | exit 0 (thresholds enforced automatically); **99.88% stmts / 99.77% branch / 100% fn / 100% lines** overall — see per-area breakdown below |
| `pnpm test __tests__/comment-free-code.test.ts` | 1 passed — the diff (including `tests/e2e/**`) carries zero disallowed comments |
| `pnpm test __tests__/spacing-guards.test.ts` | 5 passed — the `DESIGN.md` substitute text clears both guards |
| `pnpm e2e` (isolated copy, run 1) | **172 passed** (1.0m) |
| `pnpm e2e tests/e2e/alert-legibility.spec.ts tests/e2e/wide-viewport.spec.ts` (isolated copy, run 2) | **78 passed** (31.3s) |
| `pnpm exec playwright test --list` per file | `disclosure-legibility.spec.ts` → 48, `alert-legibility.spec.ts` → 72, `wide-viewport.spec.ts` → 6 |

### Coverage, per area (never aggregate)

| Area | Bar | Measured | Pass? |
|---|---|---|---|
| `lib/**` | 100% st/br/fn/ln | 100% (unchanged — `lib/` was not opened) | yes |
| `hooks/**` | 100% st/br/fn/ln | 100% (unchanged — `hooks/` was not opened) | yes |
| `app/**` | ≥90% st/br/fn/ln | within the 99.48%/99.35%/100%/100% `components/organisms` figure and the 99.88%/99.77% overall; no `app/` file below 90 | yes |
| `components/**` | ≥90% st/br/fn/ln | 99.48% stmts / 99.35% branch / 100%/100%; only `components/organisms/ad-manager.tsx` sits below 100 at **93.75%/90%/100%/100%**, pre-existing and untouched by this diff, still ≥90 | yes |

`vitest.config.ts`'s `coverage.thresholds` enforces this automatically (exit code 0); nothing here was
lowered or touched.

## Acceptance criteria

| # | Criterion | Code | Test | Status |
|---|---|---|---|---|
| AC1 | E1 search returns no `AlertBanner` consumer absent from § Scope | `components/{salary-calculator,journey-form,day-summary}.tsx` | `grep -rn "AlertBanner" app components lib hooks __tests__ tests` → same 5 files as `spec.md` E1 (`salary-calculator.tsx`, `journey-form.tsx`, `day-summary.tsx`, `alert-banner.tsx`, `__tests__/alert-banner.test.tsx`); re-run here, byte-identical to the developer's T4 result | **pass** |
| AC2 | Instrument seen red pre-remedy, naming C1 and a C5 banner at 390 with their LR2a widths and cpl | n/a (pre-remedy state) | `evidence/e2e-red-before-remedy.txt:89` — `C1 /custo-da-hora 390x844 light — LR2a: bodyText 242 < surfaceRoot 308 − 32; chrome spend 66, 97 chars over 4 line boxes = 24.25 cpl`; `:461` — `C5 / 390x844 light — … chrome spend 66, 207 chars over 7 line boxes = 29.57 cpl`. Confirmed present in the saved evidence, not reconstructed | **pass** |
| AC3 | LR2b at 1440, both themes, both routes, all five consumers; 390 non-regression floor recorded | `assertLr2b` in `tests/e2e/support/legibility.ts:45` | `chromium-{C1..C5}-1440-light.json` in the isolated re-run: C1 48.5, C2 55.5, C3 87, C4 exempt (1 line box), C5 69 — all ≥40; identical to `reports/legal.md` §4.1's independent measurement | **pass** |
| AC4 | LR2a, one box model, both viewports, all five consumers, compliance/product labelled | `expectLr2a` in `tests/e2e/support/legibility.ts:144` | `chromium-{C1..C5}-{390,1440}-light.json`: `surfaceRootWidth 308/667.33`, `bodyTextWidth 282/641.33`, `chromeSpend 26` at both — reproduced independently in the isolated copy and cross-checked against `reports/legal.md` §3 (24/24 cells) | **pass** |
| AC5 | LR1 and LR3, both viewports, both themes | `assertLr1`, `assertLr3`/`assertLr3Rendering` | e2e suite green in both isolated runs (172/172, 78/78); C1's server-marker half confirmed via the same `curl`-equivalent check the plan specifies (`"Sem ele os valores abaixo"` present in `salary-calculator.tsx:125`) | **pass** |
| AC6 | DS1/DS2/DS4 geometry unchanged; 48 existing cases stay green | n/a | `diff -rq evidence/measurements-before evidence/measurements-after` filtered to `DS1`/`DS2`/`DS4` → **0 differences across all 36 files** (re-run here, confirmed independently); `disclosure-legibility.spec.ts --list` → 48, and 48/48 pass inside the 172 | **pass** |
| AC7 | No user-visible string changed; `lib/compliance.ts`, `lib/journey.ts`, `lib/salary-period.ts` untouched | `components/atoms/alert-banner.tsx` diff | `git diff -- components/atoms/alert-banner.tsx` → 5 insertions/3 deletions, purely structural (one `className` split, one wrapper `<div>`), zero string literals; `git diff --stat -- lib/` (working tree vs. `HEAD`) → empty, confirmed | **pass** |
| AC8 | No new numeric literal in a pt-BR string | same diff | same diff read — no numeric literal added; `pnpm test __tests__/compliance.test.ts __tests__/salary-period.test.ts` unchanged and green (15 + 14 tests, inside the 506) | **pass** |
| AC9 | Every measured state reached by typing on shipped controls | `tests/e2e/alert-legibility.spec.ts` `CONSUMERS[].drive` | read in full: every drive is `fill`/`check`/`blur` on `getByLabel`/`getByRole` targets; no injected state, no test-only prop, no route param | **pass** |
| AC10 | `pnpm check` green; coverage bars met; zero axe `serious`/`critical`; no overflow at 390/1440/2560/3840 | n/a | build/lint/typecheck/test/coverage all clean (above); `evidence/report.json` → `axeViolations: []` on all 4 captures; `wide-viewport.spec.ts`'s `never scrolls horizontally` / `keeps every control reachable` pass at 2560 and 3840, `responsive.spec.ts` covers 390/1440, all green in both isolated runs | **pass** |
| AC11 | 390×844 cpl residual reported for all five consumers, both themes, with both LR2a widths, whether or not LR2b binds | `tests/e2e/support/legibility.ts` `recordMeasurement` | **Reported below.** Independently re-measured in the isolated copy and cross-checked to the centésimo against `reports/legal.md` §4.2's own independent measurement | **pass** |

### AC11 — the 390×844 residual, in full

`surfaceRootWidth` and `bodyTextWidth` are identical for every consumer and both themes (the remedy
is one atom, one box model); only `charactersPerLineBox` varies by string length. Light and dark are
identical to two decimals in every row, matching `spec.md`'s stated instrument spread. None of these
values is a judged criterion — LR2b does not bind at 390 for 14px body text (`legal.md` §3.2) — each
is a reported residual per AC11 and D-Q1, and each is now that consumer's floor under AC3's
non-regression clause.

| Consumer | Domain | Theme | `surfaceRootWidth` | `bodyTextWidth` | chars | line boxes | **cpl** | vs. 40 |
|---|---|---|---|---|---|---|---|---|
| C1 | product | light | 308.00 | 282.00 | 97 | 3 | **32.33** | −7.67 |
| C1 | product | dark | 308.00 | 282.00 | 97 | 3 | **32.33** | −7.67 |
| C2 (DS5) | **compliance** | light | 308.00 | 282.00 | 111 | 3 | **37.00** | −3.00 |
| C2 (DS5) | **compliance** | dark | 308.00 | 282.00 | 111 | 3 | **37.00** | −3.00 |
| C3 (DS6) | **compliance** | light | 308.00 | 282.00 | 174 | 5 | **34.80** | −5.20 |
| C3 (DS6) | **compliance** | dark | 308.00 | 282.00 | 174 | 5 | **34.80** | −5.20 |
| C4 | product | light | 308.00 | 282.00 | 52 | 2 | **26.00** | −14.00 |
| C4 | product | dark | 308.00 | 282.00 | 52 | 2 | **26.00** | −14.00 |
| C5 (DS7, `daily-overtime-limit`) | **compliance** | light | 308.00 | 282.00 | 207 | 6 | **34.50** | −5.50 |
| C5 (DS7, `daily-overtime-limit`) | **compliance** | dark | 308.00 | 282.00 | 207 | 6 | **34.50** | −5.50 |

Source: `evidence/measurements-after/chromium-{C1..C5}-390-{light,dark}.json`, re-generated in the
isolated copy this session and diffed against the committed evidence — identical. `reports/legal.md`
§4.2 independently measured the same five rows plus C5's other three warning strings (33.83–36.80),
none reaching 40; no row here contradicts it.

## Findings

Finding 1 is the reject. Findings 2 and 3 are minor and non-blocking on their own.

### Major — a named drive helper exists and is reinvented twice instead of called

- **Where:** `tests/e2e/alert-legibility.spec.ts:168-174` (Describe B's overtime drive) and
  `tests/e2e/wide-viewport.spec.ts:51-57` (the C5 wide-viewport case) each inline the same four-line
  sequence — `page.getByRole("radio", { name: "MANUAL" }).check()`, fill
  `page.getByLabel("Hora para Saída Real")` with `"2000"`, `blur()` — that `driveC5`
  (`tests/e2e/alert-legibility.spec.ts:31-35`) already names, in the same file, eleven lines above the
  first of the two copies.
- **What is wrong:** `AGENTS.md` §8: "Reuse before writing. Check `components/`, `hooks/`, `lib/`
  first… a reinvented existing helper beats nothing." The helper is not in another module that would
  need discovering — it is a named, exported-from-the-same-support-module-precedent function eleven
  lines above the first duplicate and one import away from the second. This is not "three similar
  lines beat a premature abstraction": the abstraction already exists.
- **Which criterion/rule it violates:** `AGENTS.md` §8 code rules, "Reuse before writing" — binding on
  `frontend-dev`, enforced by `qa-engineer` per that section's own header line.
- **How to reproduce:** `diff <(sed -n '31,35p' tests/e2e/alert-legibility.spec.ts) <(sed -n '169,173p' tests/e2e/alert-legibility.spec.ts)` and `diff <(sed -n '31,35p' tests/e2e/alert-legibility.spec.ts) <(sed -n '52,56p' tests/e2e/wide-viewport.spec.ts)` — both diffs are empty apart from the `async (page) =>` vs. inline-arrow wrapper.
- **Independently confirmed against `refactor-scout`'s `reports/ponytail.md` Finding 1**, which names
  the same three sites and the same remedy (export `driveC5` from `tests/e2e/support/legibility.ts`
  alongside `driveUntil`, call it at all three sites) and rejects on it alone. Both reports reached
  this by reading the diff independently; neither took it from the other. Cost of leaving it, in this
  reviewer's own words rather than copied: three call sites carry the same magic literal (`"2000"`)
  and the same two label strings, with no compiler error if a future change to the overtime scenario
  updates one and misses the other two — the third would keep silently driving the old scenario.

### Minor — `__tests__/alert-banner.test.tsx:54` asserts a Tailwind class-string substring, pre-existing (Finding 2)

- **Where:** `__tests__/alert-banner.test.tsx:54` — `expect(container.firstElementChild?.className).toContain("mb-6")`.
- **What is wrong:** `AGENTS.md` §8: "Never assert a Tailwind class string." This line does exactly
  that, checking a literal utility class name reaches `className`.
- **Which rule:** `AGENTS.md` §8, code rules — tests.
- **Reproduce:** `git show d8d12a6:__tests__/alert-banner.test.tsx | sed -n '42,48p'` — the assertion
  predates this spec verbatim; `plan.md` T3 lists it as case 6, "*(existing, unchanged)*", and
  `STATUS.md`'s T3 decision-log line records that the developer noticed the tension with the same
  task's "assert no class string anywhere in this file" instruction and left it alone because both
  readings produce identical file content for that case. Not introduced by this diff, not a
  regression, and the record shows it was noticed rather than missed — but it is still the pattern
  the rule exists to catch, and it is debt the next spec that opens this file should close (e.g. by
  asserting the merged class list some other way, or by dropping the substring check in favour of a
  DOM-observable effect of the custom `className`).

### Minor — the developer's own evidence undercounts axe `contrastIncomplete` nodes (4 reported, 6 measured) (Finding 3)

- **Where:** `STATUS.md` line 261 / `reports/qa.md`'s build-evidence T4 entry, both say "4 'contrast
  incomplete' nodes"; the source is `evidence/report.json`.
- **What is wrong:** `evidence/report.json`'s four page captures record `contrastIncomplete` node
  counts of 2, 2, 1 and 1 — **6** node-instances total across the run, not 4. Both flagged selectors
  (`.hover\:text-ink.h-12[href$="custo-da-hora"] > span`, a nav link, and
  `.text-overline.uppercase.text-ink-onfill/90`, a badge) are confirmed outside `AlertBanner`'s render
  tree either way, so this does not touch AC10 (which gates `serious`/`critical` **violations**, and
  `incomplete` is a distinct, non-blocking axe category) — it is a transcription miscount in the
  developer's own narration of evidence it captured correctly.
- **Which rule:** none binding; recorded because a reviewer's own arithmetic on its own evidence
  should be right, and because a future reader citing "4" from `STATUS.md` would be citing a wrong
  number without re-opening the JSON.
- **Reproduce:** `python3 -c "import json; d=json.load(open('evidence/report.json')); print([p['contrastIncomplete'] for p in d['pages']])"` from `.specs/0006-salary-alert-legibility/` → four objects with `nodes` 2, 2, 1, 1.

## The six things this review was weighted to check

1. **Red-before-remedy (AC2).** Genuine. `evidence/e2e-red-before-remedy.txt` carries T2's original
   run (C1 and C5 both at spend 66, `24.25` and `29.57` cpl) measured against the atom before T3's
   edit — confirmed by reading `git show d8d12a6:tests/e2e/disclosure-legibility.spec.ts` alongside
   the current `alert-banner.tsx` diff: the red run predates the `px-3 py-4`/icon-move change in the
   file's own history. The T2b re-run section (`## T2b re-run`) is **appended**, not a replacement —
   confirmed by its position at line 1747 of a 4811-line file, well after T2's original block. Its two
   runs both print **60 failed / 12 passed**, i.e. still red on every C1–C5 case and green on every
   Describe B case — the baseline was re-captured on the same unfixed atom, not on a partial fix.
   `evidence/measurements-before/` holds **98** files (`/bin/ls | wc -l`), the declared full cross
   product plus the two wide-viewport files, not the 80-file union T2 alone produced.
2. **The T2b flake.** Closed, not merely narrowed. The mechanism (`driveUntil` polling an idempotent
   drive against a non-waiting `isVisible`/`isHidden` predicate, plus `waitForFunction` on the
   persisted `grossSalary` value before the cross-route navigation) is exactly what `plan.md` T2b
   specifies, with the required reasoning for both the visibility wait and the storage wait present in
   `tests/e2e/support/legibility.ts` and `tests/e2e/alert-legibility.spec.ts`. No fixed sleep anywhere
   in the diff (`grep -n "waitForTimeout"` — no matches). Verified beyond the developer's own two runs:
   this review ran the full 172-case suite **twice** in a process-isolated copy (172/172, then a
   focused 78/78 on `alert-legibility.spec.ts` + `wide-viewport.spec.ts`), zero flakes in either.
3. **AC6 — nothing else moved.** `diff -rq` on all 36 `DS1`/`DS2`/`DS4` files, re-run independently
   this session: zero differences. `evidence/ac6-untouched-geometry.txt` is 0 bytes, consistent.
4. **AC11 — reported for all five consumers, both themes.** Written above in full: 10 rows (5
   consumers × 2 themes), each with both LR2a widths and its cpl, cross-checked to the centésimo
   against `reports/legal.md`'s own independent measurement.
5. **`AGENTS.md` §8.** Clean, with the one pre-existing, non-introduced exception noted above.
   `__tests__/comment-free-code.test.ts` (which covers `tests/`) passes; manual `grep` for `//` and
   `/*` across every touched file returns nothing; no `any`, `@ts-ignore`, `@ts-expect-error` or
   non-null `!` assertion anywhere in the diff; no new dependency (`git diff --stat -- package.json
   pnpm-lock.yaml` empty); no motion utility added (`grep -n "motion\|transition\|animate"` on
   `alert-banner.tsx` — no matches), consistent with `design.md` §8's explicit "nothing is added."
6. **The two logged discrepancies, plus the `main`-base caveat.**
   - `wide-viewport.spec.ts` lists **6** cases (`playwright test --list` re-run here), not the 4 named
     in T2b's Done-when text. Confirmed correct: T2 already brought the file to 6 (3 tests × 2
     viewports), and T2b's own file-list clause states "the case count does not move" — the "4" is a
     stale digit in `plan.md`'s prose, not a live discrepancy in the build.
   - The AC1 grep returns 5 files, not the 6 `plan.md` T4 predicted. Confirmed correct:
     `tests/e2e/alert-legibility.spec.ts` queries by `getByRole`/`getByLabel`/`getByText` and imports
     nothing from `@/components/atoms/alert-banner` (verified by reading the file in full), so it
     never contains the literal identifier "AlertBanner" and the no-comments rule forbids adding one
     just to satisfy a grep. The plan's prediction was wrong; the build matches `spec.md`'s own E1.
   - `git diff --stat main -- lib/` is genuinely non-empty (14 files), and `git merge-base main HEAD`
     equals `main`'s own `HEAD` (`4f3a458`) — confirmed by running both commands here — so every one
     of those 14 files is pre-existing history from specs 0002–0005 not yet merged to `main`, not this
     session's work. The decision-relevant check, `git diff --stat -- components/ app/ lib/` (working
     tree vs. `HEAD`), shows exactly one file, matching the developer's claim exactly.

## Test quality — read as an adversary

- **`expectLr2a` (`tests/e2e/support/legibility.ts:144`) would fail if the behavior broke.** It reads
  live `getBoundingClientRect()` widths in a real browser against a production build and compares
  them arithmetically; it is not a class-string mirror. Verified it *did* fail, honestly, on the
  unfixed atom (AC2 evidence above) and passes on the fixed one, twice, in an isolated rebuild.
- **`__tests__/alert-banner.test.tsx` case 7 ("keeps the body text out of the icon's row") is a real
  DOM-containment assertion**, not a class-string mirror: it would fail if the icon moved back into
  the body's row, regardless of what class names carried it there.
- **Case 5 ("keeps the id on the element that carries the role") is now strengthened past a bare
  `toHaveAttribute`**: it also asserts the icon and the body text are both contained by the
  role-carrying element, so an `id` migrating onto the new title row — the exact defect `design.md`
  §5.1 names as load-bearing — would fail it.
- **One test that would not catch a real regression, flagged above as carried debt**: case 6
  (`toContain("mb-6")`) only proves a substring reached the `className` string; it says nothing about
  cascade or computed style, and it is exactly the "buys a threshold, catches no defect" pattern
  `AGENTS.md` §8 warns against. Not introduced here; recorded so it does not get silently re-copied
  into a future banner test.
- **No CSS-override claim in this diff skips the browser check.** LR2a is the CSS-override rule this
  spec exists to guard, and every assertion of it runs in real Chromium/WebKit against a production
  build, seen red first (AC2) — this satisfies `AGENTS.md` §8's "proven in a browser, never in jsdom"
  rule for a chrome-budget override, unlike a `toHaveClass` on `px-3`.
- **The 390 residual would surface a regression, not hide one.** `assertLr2b`'s 390 exemption is keyed
  to font size (≤12px), not to component identity, so a future banner rendered at a larger type step
  is not silently exempted — it would need its own ≤12px body to qualify.

## Code craft — `AGENTS.md` §8, by file and line

- **English identifiers, descriptive names.** `driveUntil`, `measureSurface`, `expectLr2a`,
  `LR2A_CHROME_BUDGET_PX`, `waitForStableBoundingBox` — no abbreviations, no single letters, across
  every touched file.
- **No comments.** `pnpm test __tests__/comment-free-code.test.ts` passes (covers `tests/`); manual
  `grep -n "//\|/\*"` across `tests/e2e/support/legibility.ts`, `tests/e2e/alert-legibility.spec.ts`,
  `tests/e2e/wide-viewport.spec.ts`, `tests/e2e/disclosure-legibility.spec.ts`,
  `__tests__/alert-banner.test.tsx` and `components/atoms/alert-banner.tsx` returns nothing.
- **Atomic design.** `alert-banner.tsx` stays in `components/atoms/`; no new component file, no
  misplacement. `tests/e2e/support/legibility.ts` is a support module under `testDir`, correctly not a
  collected suite (`playwright.config.ts`'s `testMatch: "**/*.spec.ts"`).
- **TypeScript strict.** No `any`, no `@ts-ignore`/`@ts-expect-error`, no non-null `!` assertion in any
  touched file (checked by pattern and by eye).
- **Business rules in `lib/`.** None touched; the fix is a box model, not a number.
  `git diff --stat -- lib/ hooks/` (working tree vs. `HEAD`) is empty.
- **Legal constants carry their source.** No legal constant is introduced or moved by this diff;
  `LR2A_CHROME_BUDGET_PX = 32` in `tests/e2e/support/legibility.ts:5` is a test-instrument budget, not
  a legal constant, and is documented in the same file's exported name and in `legal.md` §3.2 — not a
  `lib/` citation because it governs no payroll number.
- **Tokens, `cn()`, no raw values.** `components/atoms/alert-banner.tsx:23`'s
  `cn("rounded-lg border px-3 py-4", TONE_CLASSES[tone], className)` uses only sanctioned steps
  (`design.md` §6.1/§6.2); no inline style, no raw hex, no arbitrary value.
- **Motion.** None added. `design.md` §8 and `plan.md` § Test strategy both state the absence is a
  decision, not an omission; confirmed no `motion-*`/`transition`/`animate` utility anywhere in the
  diff.
- **Reuse before writing — violated, this is the reject (Finding 1).** T1 moved seven existing
  helpers byte-for-byte (confirmed by diffing against
  `git show d8d12a6:tests/e2e/disclosure-legibility.spec.ts`), and T2/T2b/T3 add no new *measurement*
  primitive — but T2's own `driveC5` is reinvented inline twice more in files T2/T2b/T2's own diff
  touches, instead of being called. See Finding 1.
- **No unjustified dependency.** `git diff --stat -- package.json pnpm-lock.yaml` is empty.
- **Idiom.** The new `tests/e2e/support/legibility.ts` and `tests/e2e/alert-legibility.spec.ts` match
  the surrounding file's style (the same locator patterns, the same `test.describe`/`for` nesting
  already used in `disclosure-legibility.spec.ts` and `wide-viewport.spec.ts`); the new code is not
  identifiable as new by idiom alone.

## What passed (so the next run does not re-litigate it)

- Build, lint, typecheck, unit tests (506/506), coverage (100% `lib/`+`hooks/`, ≥90% `app/`+`components/`)
  all green and independently re-run.
- All 172 e2e cases green, reproduced twice in a process-isolated copy of the tree — see lesson 029
  for why the shared-tree run is not the number to trust mid-G6.
- AC1–AC11 individually verified against code and test, not taken from the developer's narration.
- AC6's before/after diff independently re-run: byte-identical across all 36 DS1/DS2/DS4 files.
- AC11's residual table independently re-measured and cross-checked against `reports/legal.md`'s own
  independent measurement, to the centésimo.
- Zero axe violations at any level across all 4 captures (`evidence/report.json`); the 8 console
  errors are `next dev` HMR handshake artifacts, not application code, confirmed by their
  `ws://…/_next/hmr` URL and their identical shape across all 4 pages.
- Both logged discrepancies (wide-viewport case count, AC1 grep count) confirmed correct as reported;
  the `main`-base `git diff` caveat confirmed accurate.
- `AGENTS.md` §8 clean across the diff except Finding 1 (the reject) and Finding 2, which is
  pre-existing and non-introduced.
- All acceptance criteria (AC1–AC11), behavioral correctness, coverage, the T2b flake mechanism and
  AC6's non-regression proof are unaffected by Finding 1 and need no re-verification once it is fixed
  — the fix (export `driveC5`, call it at the two other sites through `driveUntil`) touches only test
  fixtures, changes no assertion and no measured value.

---

# 0006 — QA verdict, G6 re-review (qa-engineer, run 2)

> Owner: qa-engineer · Run: 2 · Scope: restricted to the three files T5/T6 touched —
> `tests/e2e/support/legibility.ts`, `tests/e2e/alert-legibility.spec.ts`, `tests/e2e/wide-viewport.spec.ts`.
> Everything this reviewer already passed at run 1 (AC1–AC11, coverage, code craft outside Finding 1,
> Finding 2, Finding 3) is not re-litigated here; nothing in that surface was touched by T5–T8.

## Verdict: **pass**

Finding 1 (the triplicated `driveC5` drive) is closed exactly as the ruling required, verified
independently rather than taken from `reports/qa.md`'s own T5–T6 build-evidence section above. No
regression on the way: two independent full-suite runs in a fresh process-isolated copy, built from
`rm -rf .next`, both green.

## Gate output — this run's own commands, isolated copy

Copy built per lesson 029 (`rsync --exclude node_modules --exclude .next --exclude .git`, `cp -al
node_modules`, `rm -rf .next` before the first build), scratch path outside the repository, its own
port (`3141`). `uptime` before starting: load average 7.7–8.5 on 16 cores — noted, not treated as
disqualifying, and every number below is from the isolated copy regardless.

| Command | Result |
|---|---|
| `pnpm exec playwright test --list tests/e2e/alert-legibility.spec.ts` | **60** |
| `pnpm exec playwright test --list tests/e2e/wide-viewport.spec.ts` | **6** |
| `pnpm exec playwright test --list tests/e2e/disclosure-legibility.spec.ts` | **48**, unchanged |
| `grep -c "Hora para Saída Real" tests/e2e/alert-legibility.spec.ts tests/e2e/wide-viewport.spec.ts` | `0` in both |
| `grep -c "Hora para Saída Real" tests/e2e/support/legibility.ts` | `1` |
| `grep -rn "recordMeasurement\|RecordedMeasurement\|test-results/legibility" tests/` | no match |
| `grep -n "node:fs\|node:path\|TestInfo" tests/e2e/support/legibility.ts` | no match |
| `grep -n "^\s*//\|/\*"` across the three files | no match (no comments) |
| `grep -n ": any\|@ts-ignore\|@ts-expect-error\|!\."` across the three files | no match |
| `pnpm check` (isolated copy) | clean — `Test Files 58 passed (58)`, `Tests 506 passed (506)`, biome and `tsc --noEmit` both silent |
| `PORT=3141 pnpm e2e tests/e2e/alert-legibility.spec.ts tests/e2e/wide-viewport.spec.ts` (isolated copy, fresh build) | **66 passed**, 0 failed, first attempt — no Mobile Safari flake this run |
| `PORT=3141 pnpm e2e` full suite (isolated copy, second fresh build) | **160 passed**, 0 failed — matches T7's claimed count exactly, no pre-existing suite regressed |

Coverage is unaffected: `tests/e2e/**` is Playwright, outside `vitest.config.ts`'s `coverage.thresholds`
scope, and no `lib/`, `hooks/`, `app/` or `components/` file is in T5/T6's file list. The run-1 numbers
(100% `lib/`+`hooks/`, 99.48%/99.35%/100%/100% `components/**`) stand unchanged and are not re-measured.

## Acceptance criteria

Unaffected by this remedy and not re-run: `plan.md` T5's own Done-when states "no acceptance criterion
changes state; AC1–AC11 stay as `reports/qa.md` verified them," and this is mechanically true — T5/T6
touch only which function a call site invokes and delete an instrument with zero `expect()` calls. All
eleven criteria stand at **pass**, per run 1's table above.

## Findings — B1 (the run-1 reject), verified closed

| # | What run 1 found | What this run verified | Status |
|---|---|---|---|
| B1 | Four-line C5 drive written three times instead of calling the named `driveC5` | `driveC5` now lives once, at `tests/e2e/support/legibility.ts:161-166`, byte-for-byte the mandated verbatim block (`plan.md` T5 step 1). All three call sites — `alert-legibility.spec.ts`'s `CONSUMERS` table (`drive: driveC5`, line 69), its Describe-B site (deleted by T6, see below — the second inline copy no longer exists at all), and `wide-viewport.spec.ts:46` (`() => driveC5(page)`) — now call it. `grep -c "Hora para Saída Real"` reads `0/0/1` across the three files, confirmed by this reviewer's own grep, not copied from the build-evidence section. **Closed.** |

No new finding opened by T5–T8. Findings B5 (`__tests__/alert-banner.test.tsx:54`'s `"mb-6"` substring)
and B6 (the `contrastIncomplete` transcription) are outside this run's file scope — `__tests__/`,
`STATUS.md` — and were already ruled carried debt / fixed in place at G6 run 1; not re-opened here.

## The two things the tech-lead asked to weigh, not tick

**1. T6 deleted 12 test cases — confirmed to have carried nothing.** Read `plan.md`'s own T2
specification for Describe B (`plan.md:315-317`) before judging the deletion: "**It asserts nothing;
it exists so AC6's before/after comparison has two files to diff.**" That is not this reviewer's
inference — it is the block's own design intent, written before T5/T6 existed. Confirmed against the
code that was live going into T6 (reconstructed from `plan.md`'s verbatim spec and `git show
d8d12a6:tests/e2e/disclosure-legibility.spec.ts` for the surrounding pattern): the block called
`recordMeasurement` five times and zero `expect()`. Deleting `recordMeasurement`'s only caller
necessarily leaves a test body with no assertion, which is a test that cannot fail — worse than no
test, per this role's own standard. AC6's *permanent* instrument is confirmed to be a different file
by direct read: `tests/e2e/disclosure-legibility.spec.ts` asserts DS1 (`assertLr1`, `assertLr2b`,
`assertLr3`, lines 30-32) and DS4 (`assertLr1`, `assertLr3`, the panel/control geometry, lines 57-92)
with real, failing-capable assertions, and its `--list` count is a measured **48**, reproduced
independently in this run. **DS2 has no assertion anywhere in the e2e suite, before or after T6** —
`grep -rn "Súmula 172 do TST" tests/e2e/*.spec.ts` returns nothing outside the now-deleted block — but
this is not a regression T6 introduced: Describe B's own DS2 step never asserted it either, only
recorded its geometry to JSON for a before/after diff already captured in `evidence/` and already
reported to the centésimo in this report's own AC11 table and in `reports/legal.md` §4.2. Nothing the
remaining 160 cases do not carry was lost. The ruling holds.

**2. The Mobile Safari attribution — checked against this reviewer's own independent runs, not
accepted on the developer's word.** The claim: `driveC5`'s body is a byte-for-byte, unedited move, and
a first isolated run hit one Mobile Safari `.check()` failure on the MANUAL radio, gone on a same-copy
confirmation run (78/78), matching a flake lesson 029 already documented from this same gate. Verified
three ways, independently: (a) `driveC5`'s current body (`support/legibility.ts:161-166`) matches
`plan.md` T5 step 1's mandated verbatim block character for character — nothing about the interaction
changed, so a flake in it is a property of WebKit's checkbox handling under load, not of this diff;
(b) lesson 029's own text names "a Mobile Safari radio-check flake" verbatim among the five
shared-tree failures it recorded in this same spec, so the attribution points at a real, previously
logged instrument defect rather than an invented excuse; (c) this reviewer's own two fresh isolated
builds — one scoped to the two touched specs (66/66), one full-suite (160/160) — both passed with
**zero** Mobile Safari failures on the first attempt, at a comparable host load (7.7–8.5 vs. the
flake's own 27+). Two more clean runs on top of the developer's 78/78 confirmation is stronger evidence
than the ceiling this bounce needed. The attribution holds; nothing here waves through a live defect.

## Test quality

- `driveC5` and its call sites are behavior, not assertions — nothing to grade for "would this fail if
  the behavior broke" beyond what run 1 already graded for `expectLr2a`, `assertLr3`, and the
  `alert-banner.test.tsx` DOM-containment cases, unchanged by this diff.
- The deleted Describe B block is confirmed, above, to have contained no assertion at all — it could
  never have failed on a real regression, which is the sharpest version of "worse than no test" this
  role checks for. Removing it is a net gain in signal-to-noise, not a coverage loss.

## Code craft — `AGENTS.md` §8, the three touched files only

- **Reuse before writing** — the violation run 1 rejected on is gone; `driveC5` is called, not
  retyped, at both remaining sites.
- **No comments** — confirmed by direct grep in this run (table above), zero matches.
- **TypeScript strict** — no `any`, `@ts-ignore`, `@ts-expect-error`, non-null `!` in any of the three
  files, confirmed by direct grep in this run.
- **Deletion over addition** — T6 removed `RecordedMeasurement`, `recordMeasurement`, the `node:fs`/
  `node:path` imports and `TestInfo`, and added nothing in their place; confirmed by grep, zero
  matches for any of the four.
- **Idiom** — the surviving code in all three files is unchanged in style from what run 1 already
  passed; T5/T6 are subtractive and call-site edits only.

## What passed (so run 3, if any, does not re-litigate it)

- B1 is closed: one `driveC5`, three callers, verified by this reviewer's own grep and by two fresh
  isolated e2e runs, not by re-reading the developer's report.
- T6's 12-case deletion carries no lost assertion — confirmed against `plan.md`'s own description of
  Describe B and against `disclosure-legibility.spec.ts`'s real assertions for the file AC6's
  permanent record actually lives in.
- The Mobile Safari failure is a flake, not a masked regression — confirmed against `driveC5`'s
  verbatim body, against lesson 029's own text, and against two independent zero-failure isolated runs
  at a comparable load.
- `pnpm check` and the full e2e suite (160/160) are green in a fresh, this-reviewer-built isolated
  copy, matching T7's claimed counts exactly.
