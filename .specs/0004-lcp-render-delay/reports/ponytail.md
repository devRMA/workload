# 0004 — Ponytail report (G6)

> Owner: refactor-scout · Gate: `ponytail` (part of G6) · Run 1 · 2026-09-19

## Verdict

**pass**

## Scope

The diff audited is the set `STATUS.md` attributes to this spec's tasks (T2, T3, T4, T6, T9, T10),
cross-checked against `plan.md` §3 as amended by §7 and against `reports/qa.md`'s run-1/run-2 file
lists. `git status --short` shows more paths modified in this shared tree than this spec touched —
each is checked against `STATUS.md`'s attribution before being included or excluded:

- `public/favicon.ico`, `public/icon-192x192.png`, `public/icon-512x512.png` — binary replacement,
  **T2**. In scope.
- `__tests__/public-assets.test.ts` — untracked, created by **T2**, edited by **T10** (the two
  `toHaveLength(2)` lines). Whole file in scope.
- `app/page.tsx`, `app/custo-da-hora/page.tsx` — **T3**. In scope.
- `__tests__/page.test.tsx`, `__tests__/custo-da-hora-page.test.tsx` — the `vi.mock("@/lib/og-image")`
  block and the *"points the social card…"* case in each, **T4**. In scope; each file's diff has no
  other hunk.
- `__tests__/metadata-image-host.test.ts` — untracked, created by **T4**, widened by **T9**
  (`appSourceFiles()`, case 3's rename and body). Whole file in scope.
- `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx` — **T9**. In scope.
- `__tests__/use-salary-calculator.test.ts`, `__tests__/use-work-calculator.test.ts` — **T6 owns
  only** the *"never writes a default over a stored value before the restore completes"* case added
  to each file's end, and B2's one-line seed key correction. **Out of scope, and excluded**: in
  `use-salary-calculator.test.ts`, the four `workDaysPerWeek` cases and the `WORK_DAYS_PER_WEEK_KEY`
  import; in `use-work-calculator.test.ts`, the `WEEKDAY_CLASS_DATES` sweep and the parameterized
  weekday-splitting loop. Both are a sibling spec's — the same diff that moved `splitOvertime` out of
  `hooks/use-work-calculator.ts` into `lib/overtime-tiers.ts` and added `workDaysPerWeek` to
  `hooks/use-salary-calculator.ts`, neither of which appears in `plan.md` §2.1's *"none to `hooks/**`
  behaviour"* row and neither of which `STATUS.md` attributes to `0004`. **Confirmed excluded**:
  `hooks/use-salary-calculator.ts` and `hooks/use-work-calculator.ts` are themselves modified in this
  tree (`git status --short`), and `plan.md` §2.1 states this spec's hooks-layer change as "none to
  behaviour" — a diff that adds a field and moves a function is behaviour, so it cannot be this
  spec's under its own plan.
- `vitest.config.ts`, `tsconfig.json` — one line each (`.claude` added to `exclude`), mtime after T10,
  named in `reports/qa.md` run 2 as **F6**: real, attributed to this spec's tree state, but landed by
  no task and no decision row. In scope for the ladder check below; the documentation gap itself is
  `qa-engineer`'s finding (F6), not mine to re-file.

**Confirmed excluded, not judged here:** `hooks/use-salary-calculator.ts`, `hooks/use-work-calculator.ts`
(sibling — see above), and every other path `git status --short` lists that is not named above
(56 alien paths per `reports/qa.md`'s own shared-tree count). `components/organisms/hero-panel.tsx`
and `__tests__/hero-panel.test.tsx` are untouched — **T5 dropped**, byte-identical to `HEAD`
(`plan.md` §7.7 B3) — so neither is in scope and neither is judged. `lib/**` carries no diff
(`git diff -- lib/` empty); the plan's own "`lib/**`: none" row holds.

## Findings

None.

## Ladder check, task by task

**T2 — three binary replacements + `__tests__/public-assets.test.ts`.** Rung 1: the task needed to
exist (three 234.8 kB JPEGs saved under `.ico`/`.png` were emitted on every load) and rung 5/no-dep:
re-encoded with the ImageMagick already on the machine, nothing added to `package.json`
(`git diff -- package.json` empty). The test file is four `it` blocks over byte signatures and PNG
`IHDR` dimensions read directly off disk — no fixture, no snapshot library, no image-diffing
dependency for what four `Buffer` reads and a `readUInt32BE` already do. `readPngDimensions`'s output
is compared against `icon.sizes` read from `app/manifest.ts`'s own export (`public-assets.test.ts:47`),
not hardcoded — this is rung 2 (reuse the manifest as the source of truth) rather than a second copy
of "192" and "512" that could drift from the manifest silently.

**T3 — the two `images` arrays in `app/page.tsx` / `app/custo-da-hora/page.tsx`.** No abstraction:
each route's `metadata.openGraph`/`.twitter` gets an inline array literal, not a shared
`buildImageMetadata(route)` helper. Two call sites with different `alt` strings and different `url`
paths is exactly `AGENTS.md` §8's "three similar lines beat a premature abstraction" — and it is two
lines, not three. `lib/og-image.tsx` (the thing that actually renders the images) is untouched, as
`plan.md` §2.3 requires.

**T4 — `metadata-image-host.test.ts`.** Rung 2/reuse: its `readdirSync(..., { recursive: true })`
idiom is copied from `__tests__/spacing-guards.test.ts`'s pattern, not reinvented; the type assertion
`as string[]` on the same call is the same cast `spacing-guards.test.ts` already carries for the same
Node typings gap (confirmed by `qa-engineer`, `reports/qa.md` run 1, Code craft). `imageRouteDirectories()`
is eight lines and used by exactly one case — no premature extraction into a shared fixture module for
a guard with one caller. `FALLBACK_MECHANISM`, a single exported string constant, stands in for the
comment `__tests__/comment-free-code.test.ts` would reject outside `lib/**` — the same convention
`0009`'s ponytail report already confirmed correctly-simple for this exact class of constant.

**T6 — the two `"never writes a default…"` cases.** No helper module for a two-file, two-case
pattern: each case seeds `localStorage`, spies on `Storage.prototype.setItem`, and loops the seeded
map with two `expect`s inside it (`AGENTS.md` §5's "search over the whole boundary" — the loop covers
every key a future storage addition brings, without a new line). The two cases are not merged into
one cross-hook helper despite being nearly identical: `useSalaryCalculator` and `useWorkCalculator`
seed different keys against different hooks, and a shared helper here would need a parameter for the
hook itself, the seed map, and the assertion loop — three parameters to save six lines twice, which is
the wrong side of the ladder. Two similar cases, not three; no factoring needed yet.

**T9 — `SITE_URL` declared once, three imports.** This is the task the brief named to check hardest.
Verified directly:
- `git diff -- lib/structured-data.ts` is **empty** — the constant is not touched, only imported.
  No `lib/site.ts` exists (`ls lib/site.ts` → no such file), `SITE_URL` is not renamed (`grep -rn
  "export const SITE_URL"` returns exactly the one, pre-existing line at `lib/structured-data.ts:3`),
  and no second origin literal survives: `grep -rn "workload.devrma.com" app/` after the diff returns
  zero hits in source (the only remaining occurrence in the whole tree outside `lib/structured-data.ts`
  is a rendered artwork label in `lib/og-image.tsx`, which is a string baked into the OG image
  artwork itself, not a second declaration of the origin — `design.md` §C already authorises it and
  it renders no URL).
- The three call sites (`app/sitemap.ts:1`, `app/robots.ts:1`, `app/layout.tsx:6`) are one import
  line each; `app/sitemap.ts` additionally deletes its own local `const SITE_URL = "…"` at the line
  the import replaces. Net diff: `+3 -2` across three files plus a one-line net change in
  `app/sitemap.ts`. This is a refactor, not a feature — `reports/qa.md`'s own md5 check
  (`5078146ee6…`, `2ed2b5c016…`, both files, before and after) already proved the emitted
  `/sitemap.xml` and `/robots.txt` are byte-identical, which is independent confirmation that no
  behaviour and no new surface was added along with the import.
- The guard widening in `metadata-image-host.test.ts` (`appFiles()` → `appSourceFiles()` for cases 2
  and 3) is the minimum change that keeps the guard's domain matching its own stated rule
  (`.ts` and `.tsx`, not `.tsx` alone) — one new eight-line function beside the existing one, not a
  rewrite of the file's structure.

**No speculative abstraction was found anywhere in this scope**: no interface with one implementor, no
factory, no config object standing in for a value that has had, and will have, exactly one value.

**T10 — `expect(manifestIcons).toHaveLength(2)`, twice.** The smallest possible fix for the F4 gap:
one line, duplicated at the top of the two cases that needed it, rather than hoisted into a shared
`beforeEach` or a new helper — correctly so, since a control this small placed outside the case body
would (as `plan.md` §7.9 itself says) stop proving *that case* measured anything. Literal `2`, not
`toBeGreaterThan(0)`: `reports/qa.md` run 2 re-derived that this is load-bearing, not a style
preference — a 1-icon binding is red under the exact count and green under a floor. Nothing to cut.

## Dependencies

None added. `git diff -- package.json` is empty and `plan.md` §2.2 names and closes the two candidate
needs (re-encoding the icons, and diagnosing T1) with "no dependency" in both cases, giving the reason
in the same table. Both hold under direct check: T2's bytes were produced by `/usr/bin/convert`
(already on the machine, run once, only the output is committed) and T9 pulls in `@/lib/structured-data`,
which itself imports only `@/lib/calculator-view` (`plan.md` §2.2, unchallenged by this diff).

## Deliberate simplifications

No `ponytail:`-style comment was added by this diff (`grep -n "ponytail:"` over every touched file
in scope, above, returns nothing). `AGENTS.md` §8 forbids comments outside `lib/` except a
tooling directive or a norm citation, and this diff touches no `lib/` file, so the absence is
consistent with the rule rather than an omission. `__tests__/comment-free-code.test.ts` passing over
the full diff (`reports/qa.md`, both runs) is independent confirmation.

## Pre-existing, out of scope

- **F6's underlying tension** — `vitest.config.ts` and `tsconfig.json` each gained one `exclude`
  entry (`.claude`) with no task or decision row behind it. This diff's *content* is not
  over-engineered — a single narrowing string, matching `biome.json`'s pre-existing exclusion of the
  same directory, touching no coverage `include` glob or `thresholds` block (confirmed:
  `git diff -- vitest.config.ts` shows exactly one changed line, the `exclude` array) — so there is no
  ponytail finding in the change itself. The *provenance* gap is `reports/qa.md`'s F6 and belongs to
  `tech-lead`, not to this report.
- **`tests/e2e/support/legibility.ts`** and the accumulation pattern `0009`'s ponytail report already
  flagged for a future spec are untouched by this diff (`git diff -- tests/e2e/` is empty for this
  spec's file set) — restated here only so a reader of this report does not go looking for it in a
  diff that never opens the file.

## What is correctly simple

- T2's test file: four cases, no fixture, no snapshot, reads bytes directly and checks the manifest's
  own declared sizes rather than hardcoding a second copy of "192"/"512".
- T3: two inline array literals, not a shared metadata-building helper, matching `AGENTS.md` §8's
  bar for when three similar lines beat an abstraction.
- T4 and T9's guards: reuse the codebase's existing `readdirSync`/idiom from `spacing-guards.test.ts`
  rather than inventing a new file-scanning approach; named-constant convention for the comment the
  repository-wide no-comments guard would otherwise reject.
- T6: no cross-hook helper factored out of two cases that differ in their hook, their seed map and
  their storage keys — factoring would have added parameters, not removed lines.
- T9: a three-import refactor that stayed a refactor, verified byte-identical by two independent
  checks (this report's grep-based check and `reports/qa.md`'s md5 check), with none of the three
  named failure shapes (new module, rename, second literal) present.
- T10: the control is two literal lines at the exact place they are needed, no shared `beforeEach`,
  no helper for a two-line assertion — and it is load-bearing, not cosmetic, per the exact-vs-floor
  discriminator `reports/qa.md` re-derived.
