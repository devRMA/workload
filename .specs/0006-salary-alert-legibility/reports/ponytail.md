# 0006 — Ponytail report (refactor-scout, G6)

## Verdict

**reject**

One finding is a clean, mechanical, in-scope duplication of an already-named helper across two
files this diff touched — exactly the class of thing this gate exists to catch, and exactly what
`AGENTS.md` §8 names ("a reinvented existing helper beats nothing"). Fix it and this passes; nothing
else in the diff needs to change.

## Scope

**Diff audited** (working tree against `HEAD`, since this spec's work is uncommitted):

- `components/atoms/alert-banner.tsx` — edit
- `__tests__/alert-banner.test.tsx` — edit
- `tests/e2e/support/legibility.ts` — new
- `tests/e2e/alert-legibility.spec.ts` — new
- `tests/e2e/disclosure-legibility.spec.ts` — edit (helpers extracted to `support/legibility.ts`)
- `tests/e2e/wide-viewport.spec.ts` — edit (one case added)
- `DESIGN.md` — doc line, not code; not in scope for this report

**Modules the diff touched, read for context:** `lib/utils.ts` (`cn()`, unchanged, reused
correctly), `hooks/use-salary-calculator.ts` and `lib/storage.ts` (read to verify `driveUntil`'s
synchronization claim, not modified), `playwright.config.ts` (read to verify the project matrix is
pre-existing and untouched by this diff).

Everything else — `app/`, `hooks/**`, `lib/**` beyond the read above, and every consumer
(`salary-calculator.tsx`, `journey-form.tsx`, `day-summary.tsx`) — is untouched by this diff
(confirmed: `git diff --stat -- lib/ app/` is empty for this spec's changes) and is out of scope.

## Findings

Ranked by what to delete first.

1. **`tests/e2e/alert-legibility.spec.ts:31-35` / `tests/e2e/alert-legibility.spec.ts:170-173` /
   `tests/e2e/wide-viewport.spec.ts:53-56` — the four-line C5 drive (`check("MANUAL")`, fill
   `"Hora para Saída Real"` with `"2000"`, `blur()`) is written out three times, once as the named
   function `driveC5` and twice more inline, byte-identical apart from the `settled` predicate and
   `label` already passed to `driveUntil`.**
   Cut the two inline copies. Move `driveC5` into `tests/e2e/support/legibility.ts` (export it
   alongside `driveUntil`, which is already the shared home for cross-file e2e steps — that is the
   precedent T1 set for exactly this problem), and call
   `driveUntil(() => driveC5(page), settledPredicate, label)` at all three sites.
   **Ladder rung 2 — already in this codebase.** This is not a case for "three similar lines beat a
   premature abstraction" (`AGENTS.md` §8): the abstraction already exists, named, in the same file,
   and was not reused at the very next call site eleven lines below it, nor at the third call site in
   the sibling spec `driveUntil` was written to be shared with. Nothing here needed inventing; it
   needed calling.
   Cost of leaving it: three independent places carry the same magic literals (`"2000"`, the exact
   label strings for the two roles). A future change to the overtime scenario — a different exit
   time, a different field label — has three call sites to find and no compiler error if one is
   missed; the third would silently keep driving the old scenario while the other two moved on.
   This is the one-file-diff property `PRODUCT.md` §3 and this gate both exist to protect, applied
   to test fixtures rather than a legal table.

2. **`tests/e2e/support/legibility.ts:171-180` (`recordMeasurement`), called from
   `tests/e2e/alert-legibility.spec.ts:116,181,192,204` and `tests/e2e/wide-viewport.spec.ts:65` —
   permanent, unconditional JSON-dump instrumentation with no consumer once this spec's evidence
   capture (T2/T2b/T4) is done.**
   `grep -rn "test-results/legibility"` outside `.specs/0006-*` finds only the five call sites
   themselves — no CI step, no script, no `docs-check.mjs` rule and nothing in `evidence/` (which is
   gitignored by rule) reads these files back automatically. The permanent CI guard this spec adds
   is `expectLr2a`'s in-process assertion, which does not need the file on disk — its failure message
   already carries `surfaceRootWidth`, `bodyTextWidth`, `chromeSpend` and `charactersPerLineBox`
   (`plan.md` T1: "the message carries the two widths, the spend and the cpl because AC2 requires
   those numbers to appear in the failure output"). `recordMeasurement` exists to give T2/T2b/T4's
   one-time before/after diff (AC6, AC11) something to `diff -r`; once that diff is made and pasted
   into `STATUS.md`/`reports/qa.md`, every later `pnpm e2e` run pays the `mkdirSync`/`writeFileSync`
   cost for 98 files with nothing downstream reading them.
   **Ladder rung 1 — does this need to exist, going forward?** Not as a permanent, unconditional
   side effect of every future CI run. It needed to exist for exactly as long as it took to produce
   `evidence/measurements-before/` and `evidence/measurements-after/` for this spec's own AC6/AC11
   proof, which is already done.
   **Not blocking on its own** — it is cheap (small synchronous writes to a directory nothing else
   reads, already excluded from the repo the same way `evidence/` is), it adds no branching logic,
   and it does not risk a wrong number reaching a user. Two honest paths forward, either is fine:
   delete the five call sites and the function once this spec's evidence is captured, or keep it and
   say so — a one-line note in `plan.md`'s Test strategy naming it as a standing regression log a
   future spec touching this surface can diff against, which is the missing half of a deliberate
   simplification (`AGENTS.md`'s `ponytail:` convention would apply if this file allowed comments;
   here the equivalent is a line in the spec doc, since `tests/e2e/**` is comment-free by
   `__tests__/comment-free-code.test.ts`). Left silent, it reads as scaffolding that outlived the
   migration it proved.

## Dependencies

**None added.** `git diff -- package.json pnpm-lock.yaml` is empty for this spec's changes.
`plan.md`'s dependency table names two decisions and both hold:

| Need | Decision | Holds? |
|---|---|---|
| Measure rendered geometry in a real browser | `@playwright/test`, already installed | Yes — `expect.poll` (`driveUntil`), `boundingBox()`, `getClientRects()` are all base Playwright/DOM API, nothing new imported. |
| Share helpers between two e2e specs | A plain module under `tests/e2e/support/`, not collected as a suite because `playwright.config.ts`'s `testMatch` is `**/*.spec.ts` | Yes — confirmed `playwright.config.ts` is untouched by this diff and the pattern is exactly as described. |

## Deliberate simplifications

**None found, correctly.** No `ponytail:` comment appears anywhere in the diff. That is the right
outcome here, not an omission: every file this diff touches (`components/atoms/`, `__tests__/`,
`tests/e2e/**`) is covered by `__tests__/comment-free-code.test.ts`, and none of them is `lib/`, the
one exemption for a citation comment. A `ponytail:` comment in any of these files would itself be a
finding.

The one place a "named ceiling and upgrade path" statement was needed in prose rather than a code
comment — the `recordMeasurement` scaffolding above — is missing it. See Finding 2.

## Pre-existing, out of scope

No severity, no verdict weight — for `tech-lead` to route if it ever becomes worth a spec of its
own.

- `playwright.config.ts`'s three-project matrix (`chromium`, `Mobile Chrome`, `Mobile Safari`) runs
  `alert-legibility.spec.ts` and `disclosure-legibility.spec.ts` under all three even though both
  files call `page.setViewportSize()` explicitly, overriding each project's own device viewport.
  This is not new complexity from this diff — the project list predates it and this diff adds no
  project — and it is not free complexity either: it genuinely exercises three rendering engines
  (chromium and webkit have measurably different text-layout metrics, which is exactly what LR2b's
  cpl assertion is sensitive to), so it is doing real work, not padding a count. Noted only because
  it is the reason the case count is 72 rather than 24 and a future reviewer should not re-derive
  that from scratch.

## What is correctly simple

- **The production change** (`components/atoms/alert-banner.tsx`) is the minimum the defect needs:
  one new wrapper `div` for the title row, one class-string edit (`p-4` → `px-3 py-4`). No new prop,
  no new component, no consumer touched — matches `plan.md`'s architecture table exactly
  (`lib/`, `hooks/`, `components/organisms/`, `templates/`, `app/globals.css` all report zero
  touches, verified).
- **`assertLr3` / `assertLr3Rendering` split** is earned by two real, distinct callers with
  different requirements: `disclosure-legibility.spec.ts` (via `assertLr3`) needs the SSR-marker
  check because DS1/DS4 are server-rendered by default; `alert-legibility.spec.ts` calls
  `assertLr3Rendering` directly for C2–C5 because those states are client-only by construction and
  asserting a server marker for them would be asserting something that cannot be true. Not a
  speculative abstraction — it removes one, since the pre-split `assertLr3` forced every caller
  through the SSR check whether or not it applied.
- **`driveUntil`** is the smallest fix for the race `plan.md` T2b names: it reuses `expect.poll`
  (already in the installed dependency, ladder rung 5) rather than a hand-rolled retry loop, takes a
  non-waiting `settled` predicate as the plan requires (no `toBeVisible()`'s own 5s wait hidden
  inside the poll), and adds no new state. The two synchronization barriers in Describe B
  (`root.isVisible()` after the drive, `waitForFunction` on the persisted `grossSalary` value) are
  two different moments — state commit vs. storage flush — not two guards for one thing.
  Load-bearing, not speculative.
- **The `Consumer`/five-row table** in `alert-legibility.spec.ts` is data, not an abstraction: five
  real, distinct call sites (`spec.md` AC9 requires each state be reachable by the shipped controls),
  driven from one array so the 390×1440×light/dark cross product isn't hand-written five times. The
  two-viewport, two-theme axes are exactly what AC3/AC4/AC5/AC11 bind at — no axis was added beyond
  what the acceptance criteria already require, and the wide-viewport cases (2560/3840) are
  chromium-only, in the one file already scoped that way, adding no new case shape.
- **The DS1/DS2/DS4 recording block** in Describe B repeats a six-line pattern three times with a
  different locator query per surface (`page.locator(...)`, `page.getByText(...)`,
  `page.locator(...)` again after a reload) and a hard ordering requirement (DS4 last, because the
  dialog can lock the scrollbar). A loop here would hide the ordering dependency and the
  per-surface query difference behind an array of tuples for a three-iteration saving — the
  three-similar-lines allowance (`AGENTS.md` §8) is the right call, unlike Finding 1's triplication,
  where the abstraction already existed and simply went uncalled.

---

## Run 2 — G6 re-review (bounce close-out)

### Verdict

**pass**

### Scope

Restricted to the three files T5/T6 touched, per the team lead's routing — not a re-audit of what
run 1 already passed:

- `tests/e2e/support/legibility.ts` — edit (T5 added `driveC5`; T6 removed `recordMeasurement`,
  `RecordedMeasurement`, and the `node:fs`/`node:path`/`TestInfo` imports)
- `tests/e2e/alert-legibility.spec.ts` — edit (T5 call-site change; T6 deleted Describe B and the
  now-unused import specifiers)
- `tests/e2e/wide-viewport.spec.ts` — edit (T5 call-site change; T6 deleted the one
  `recordMeasurement` call and the `testInfo` param)

Everything else this spec touched (`components/atoms/alert-banner.tsx`, `__tests__/alert-banner.test.tsx`,
`DESIGN.md`, `disclosure-legibility.spec.ts`) already passed at run 1 and is not reopened here.

### Checked

1. **Duplication — gone, all three sites, no residue.**
   `grep -rn "recordMeasurement\|RecordedMeasurement\|test-results/legibility" tests/` → no match.
   `grep -n "node:fs\|node:path\|TestInfo" tests/e2e/support/legibility.ts` → no match.
   `grep -rn "Hora para Saída Real" tests/e2e/*.spec.ts` → zero hits in both spec files; the string
   lives once, inside `driveC5`'s body in `tests/e2e/support/legibility.ts:163`. Both spec files now
   call `() => driveC5(page)` at their one remaining C5 site (`alert-legibility.spec.ts:69`,
   `wide-viewport.spec.ts:46`) — the inline copy at the old `:168-174` overtime site is gone because
   T6 deleted the describe block it lived in, exactly as `plan.md` T5 warned ("if T6 is done first
   this site no longer exists — do T5 first"); the order was followed and both sites still resolved.
   No orphaned import: `alert-legibility.spec.ts`'s named import list carries only what step 3 of T6
   named (`assertLr1`, `assertLr2b`, `assertLr3`, `assertLr3Rendering`, `driveC5`, `driveUntil`,
   `expectLr2a`, `measureSurface`, `waitForStableBoundingBox`) — `DS1_FOOTER_SELECTOR`,
   `DS4_PANEL_SELECTOR`, `openPrivacySettings` and `recordMeasurement` are gone from it, and
   `disclosure-legibility.spec.ts` (untouched this round, out of scope) is confirmed still importing
   the selector constants and `openPrivacySettings` itself, so nothing is orphaned by their removal
   from the sibling file. `--list` confirms the three counts T6 named: 60 / 6 / 48
   (`alert-legibility.spec.ts` / `wide-viewport.spec.ts` / `disclosure-legibility.spec.ts`), and
   `pnpm check` is green (58 files, 506 tests, no lint/typecheck failure) — a stray unused import
   would have failed lint, not just my grep.

2. **`legibility.ts` is still one file, not a grab bag.** `driveC5` sits immediately after
   `driveUntil` at the end of the file, exactly where `plan.md` T5 step 1 placed it. Every remaining
   export is one of two kinds the file already held before this bounce: a legibility assertion
   (`assertLr1`, `assertLr2b`, `assertLr3`, `assertLr3Rendering`, `expectLr2a`) or an e2e drive/measure
   step (`measureSurface`, `waitForStableBoundingBox`, `openPrivacySettings`, `driveUntil`, now
   `driveC5`). `driveC5` is the second kind — a named drive, the same shape as `openPrivacySettings` —
   so it extends the file along its existing axis rather than adding a new one. The file dropped three
   things this round (`recordMeasurement`, `RecordedMeasurement`, the two Node imports) and added one
   four-line function whose body already existed elsewhere; net line count went down. Still the shared
   home T1 built it to be.

3. **Nothing new was added under bounce pressure.** `driveC5`'s body is unchanged from the version
   run 1 already reviewed as the named original (`page.getByRole("radio",{name:"MANUAL"}).check()`,
   fill, `blur()` — four lines, byte-for-byte); no wait was added, no try/catch, no defensive
   re-check, no new parameter. Both call sites reduce to the same one-liner
   (`() => driveC5(page)`) rather than each growing a wrapper of its own. No new export appears in
   `legibility.ts` beyond `driveC5` itself, and no new file was created to hold it. This is the
   deletion-shaped remedy `plan.md` T5/T6 specified, not a "so it does not happen again" guard.

### Findings

None. Both findings from run 1 are closed exactly as `tech-lead` ruled:

- **F1 (duplication)** — closed. See "Checked" #1.
- **F2 (`recordMeasurement`, non-blocking)** — closed by deletion, which is the stronger of the two
  honest paths the run-1 report offered, and correctly took Describe B with it (its only consumer).
  `evidence/measurements-before/` and `evidence/measurements-after/` are untouched — this bounce
  removed the instrument, not its already-captured output, matching `plan.md`'s own warning against
  regenerating them.

### Dependencies

No change from run 1. `git diff -- package.json pnpm-lock.yaml` is still empty for this spec.

### Deliberate simplifications

None added this round. No `ponytail:` comment appears in any of the three files (still correct —
`tests/e2e/**` is comment-free by `__tests__/comment-free-code.test.ts`).

### Pre-existing, out of scope

None new. Run 1's note on `playwright.config.ts`'s three-project matrix stands, untouched by this
round, and is not reopened.

### What is correctly simple

`driveC5` as a plain exported async function beside `driveUntil`, called identically from both spec
files — no factory, no options object, no class. The bounce's remedy is exactly as large as the
defect it fixes.
