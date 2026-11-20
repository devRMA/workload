# 0009 — Ponytail report (G6)

> Owner: refactor-scout · Gate: `ponytail` (part of G6) · Run 1 · 2026-09-19

## Verdict

**pass**

## Scope

The diff audited is this spec's seven files, scoped by `git diff -- <path>` per file and cross-checked
against `plan.md`'s task table and `STATUS.md`'s per-hunk attribution (`STATUS.md:150-168`), because
the shared tree carries five sibling specs' uncommitted work and two of these seven files are
co-edited (`STATUS.md:127-134`, `Q-1`):

- `__tests__/day-summary.test.tsx` — **0009 owns only** the `[style*='width']` assertions and the
  `container` capture (T1, lines 57-65, 96-99). The DSR/Súmula renames and the four new `it` blocks
  at `:201-229` are a sibling's (`STATUS.md:155-158`) and are out of scope for this report.
- `__tests__/hero-panel.test.tsx` — whole diff hunk is T2. In scope.
- `__tests__/layout.test.tsx` — whole diff hunk is T3. In scope.
- `__tests__/modal-dialog.test.tsx` — whole diff hunk is T4. In scope.
- `__tests__/alert-banner.test.tsx` — whole diff hunk is T5. In scope.
- `tests/e2e/support/legibility.ts` — **0009 owns** `LR2B_MEASURE_FLOOR_CPL`,
  `DS1_EXPECTED_PARAGRAPHS`, `DS4_EXPECTED_PARAGRAPHS`, `assertLr2b`'s return type, and
  `assertLr2bAcrossParagraphs` (T6). `D3_LEGEND_SELECTOR`, `D4_CAPTION_TEXT`, `D6_CAPTION_SELECTOR`
  are a sibling's (`STATUS.md:161-162`), out of scope.
- `tests/e2e/disclosure-legibility.spec.ts` — **0009 owns** the two loop replacements in the DS1 and
  DS4 `describe` blocks (T7), and the import lines those two call sites need. The whole
  `"the three captions added by 0003"` describe at `:110-229` is a sibling's (`STATUS.md:159-160`),
  out of scope; its imports (`assertLr3Rendering`, `driveUntil`, `waitForStableBoundingBox`,
  `D3_LEGEND_SELECTOR`, `D4_CAPTION_TEXT`, `D6_CAPTION_SELECTOR`) ride in the same import block and
  are not judged here.

No file under `app/`, `components/`, `lib/` or `hooks/` is touched. No new file, no new npm script, no
new dependency. Everything else in the repository — including the alien hunks named above — is out of
scope and is not re-litigated here.

## Findings

None. Every one of T1–T7's own hunks is inside AC4's set, matches `plan.md`'s task description
exactly, and adds no machinery beyond what the replaced assertion needed.

## The two items the brief asked to look at with fresh eyes

**T6's `assertLr2bAcrossParagraphs` (`tests/e2e/support/legibility.ts:49-70`), two call sites
(`disclosure-legibility.spec.ts` DS1 and DS4 loops) — earns its place, ladder rung 2.**

Inlined, each of the two loops would repeat the identical 8-line shape: locate `p`, assert the count
against a named constant with an LG1.2 message, loop `assertLr2b` and tally `measured`/`exempt`, push
a `test.info().annotations` entry with the tally. That is not "two tests that read better apart" — DS1
and DS4 are the same legal obligation (`legal.md` LG1.1–LG1.3) applied to two different surfaces, and
`plan.md`'s own architecture section requires exactly this: *"the counting is factored into the helper
both loops already share, so the rule lands in one place rather than twice"* (`plan.md`, § The
approach, point 2), a decision `legal.md` §7 routed to `tech-lead` in writing as F2/F5. The function
lives in the file that is already the shared home for every cross-file e2e assertion this suite has
(`assertLr1`, `assertLr2b`, `assertLr3`, `openPrivacySettings`, `driveC5`, `measureSurface` all
predate this diff at that same path) — rung 2 of the ladder, reusing the codebase's own established
extraction point rather than inventing a new one. A third call site is not required to justify this:
the object being kept in one place is a legal-compliance invariant (AC10, LG1), not incidental test
code, and duplicating it would be the exact defect lesson **030** exists to catch the moment a third
call site appears. Two rungs work here (inline vs. shared helper); the shared helper is the one that
does not let LG1's count-before-iterate rule drift between DS1 and DS4 independently.

**A4's deletion and A6's sentinel reuse — confirmed not findings, per the brief.** `A4`
(`__tests__/modal-dialog.test.tsx:96`, `overscroll-contain`) is deleted outright rather than given a
weaker substitute; `STATUS.md` X-2 records the carried-forward obligation and its five surviving
carriers (`modal-dialog.test.tsx:20,28,43,52,57,61`) rather than inventing a jsdom stand-in for
something jsdom cannot measure — that is rung 1 of the ladder (this assertion did not need to exist in
a form jsdom cannot honestly make). A6's sentinel (`alert-banner.test.tsx:51,54`, `modal-dialog.test.tsx:90,96`)
reuses the string `my-custom`, the same spelling already used by three other prop-sentinel tests in
this repository (`stat-box.test.tsx`, `duration-field.test.tsx`, `regime-field.test.tsx` per
`STATUS.md` G6-E8's `grep`) rather than inventing a fourth spelling — rung 2 of the ladder, and
measured (not assumed) to sit in no `tailwind-merge` group, so no future utility class can collide
with it the way `mb-6` did.

## Dependencies

None added. `plan.md` § Dependency decisions names two candidate needs (measuring a rendered font
family / scroll chain / width cap, and counting+tallying inside the e2e guard) and resolves both to
"no new dependency" — the first two are deferred as debts (X-4, X-2) or already carried by an existing
assertion (X-3), the third uses `@playwright/test`'s own `expect` and `test.info().annotations`, both
already imported in the file's module graph before this diff. Both justifications hold: nothing in
T1–T7 needed a package, and none was added (`git diff -- package.json` is empty).

## Deliberate simplifications

No `ponytail:`-style comment was added by this diff. `AGENTS.md` §8 forbids comments outside `lib/`
except for norm citations, and `plan.md`'s own reasoning for `LR2B_MEASURE_FLOOR_CPL` names this
explicitly: the constant *is* the substitute for a comment the guard would reject (`STATUS.md`
decisions log, 2026-09-16, `labor-law-analyst`, "the comment-free guard would reject" a norm-citing
comment outside `lib/`). Confirmed by `__tests__/comment-free-code.test.ts` passing over the shipped
diff (`STATUS.md` G5-E5). Nothing to evaluate here beyond that this constraint was respected.

## Pre-existing, out of scope

- `assertLr2b`'s pre-existing sibling `assertLr3Rendering` (`tests/e2e/support/legibility.ts:78-100`)
  duplicates seven `expect` lines' worth of "is this element actually visible" logic that overlaps
  conceptually with a possible shared "visible and on-screen" predicate. This diff did not touch that
  function's body (it is called by the alien D3/D4 tests, not by T6/T7), so no finding — noted for a
  future spec that opens `legibility.ts` again.
- The file `tests/e2e/support/legibility.ts` is accumulating exported members from at least three
  specs (`0005`, `0006`, `0003`, now `0009`) with no barrel structure or grouping comment (comments are
  restricted anyway). Not a defect of this diff — every addition here is minimal and correctly placed
  — but worth a `tech-lead` note if the file keeps growing one flat export list per spec.

## What is correctly simple

- T1–T5 are each a two-to-eight-line edit that replaces one class-string assertion with the structural
  fact the plan named, with no new helper, sentinel, or fixture introduced anywhere in the five files.
- `__tests__/hero-panel.test.tsx`'s T2 reuses RTL's own `rerender` to cover both the absent-footer and
  present-footer states in one `it`, instead of a second test or a parameterized-test abstraction —
  the smaller of the two working shapes.
- `__tests__/day-summary.test.tsx`'s T1 asserts three things in one `it` (`toHaveLength(0)` on
  `[style*='width']`, and `queryByText` on both boundary clocks) because `plan.md` explicitly named
  both the track and the boundary labels as the only two jsdom-observable facts for the "no minute
  worked" state (`plan.md` § Which modules change: *"Both are structural, neither is a class"*) — not
  three properties standing in for one, but the two the plan asked for, plus the pre-existing heading
  assertion.
- `LR2A_CHROME_BUDGET_PX`, `LR2B_MEASURE_FLOOR_CPL`, `DS1_EXPECTED_PARAGRAPHS` and
  `DS4_EXPECTED_PARAGRAPHS` follow one existing convention (a named, exported constant standing in for
  the comment the file's own comment-free guard forbids) rather than four different ones.
