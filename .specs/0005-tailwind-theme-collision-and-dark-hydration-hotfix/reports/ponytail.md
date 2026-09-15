# 0005 — Ponytail report (refactor-scout)

> Owner: refactor-scout · Gate: `ponytail` (G6) · Run 1

**Verdict:** pass

## Scope

The working-tree diff of spec 0005 (`git diff`, uncommitted, 35 tracked files + 6 new files), and
the modules it touches:

- `app/globals.css` — deletes the `--spacing-*` named scale.
- `components/atoms/*`, `components/molecules/*`, `components/organisms/*`,
  `components/templates/*` — the ~129-occurrence numeric-scale migration; `cookie-consent.tsx` also
  carries T6's row-stacking; `app-header.tsx` carries D2's fix.
- `lib/utils.ts` — 2-line change (a comment, not a logic change; see § Pre-existing note).
- `playwright.config.ts`, `tests/e2e/responsive.spec.ts` — instrumented for production build, a
  dark-colorScheme project, and D3's collapse-inward floor.
- New: `__tests__/spacing-guards.test.ts`, `__tests__/comment-free-code.test.ts`,
  `scripts/geometry-dump.mjs`, `scripts/spacing-migration-proof.mjs`,
  `tests/e2e/dark-hydration.spec.ts`, `tests/e2e/disclosure-legibility.spec.ts`.
- `AGENTS.md`, `DESIGN.md` and the spec's own `spec.md`/`design.md`/`plan.md`/`STATUS.md` — prose,
  read for consistency, not audited for architecture.

`hooks/**` and `lib/**` (besides the one comment line in `utils.ts`) are untouched, matching
`plan.md`'s own constraint. Everything outside this list — including anything on `main` this diff
did not touch — is out of scope for me and is called out separately below where it exists.

## Findings

None. I climbed the ladder on every candidate below and none clears the bar for a finding.

## Dependencies

**None added.** `package.json` carries zero changes in this diff (`git diff --stat -- package.json`
is empty). `plan.md` §4.3/§4.2 states the constraint explicitly — "no new dependency" — and reuses
`@playwright/test`'s own `chromium` export for `geometry-dump.mjs` rather than adding a browser
automation library. Holds.

## Deliberate simplifications

No `ponytail:` comment exists anywhere in this diff (`git diff | grep 'ponytail:'` returns nothing).
Nothing to evaluate here.

## Test and tooling weight — which is load-bearing, which is scaffolding

Going through everything the diff added, by name, against the ladder:

- **`scripts/spacing-migration-proof.mjs` (79 lines) — load-bearing, keep.** It is Proof A of the
  two independent proofs `plan.md` §4.2 designs for AC6, "the hardest criterion in the spec": a
  129-occurrence, 22-file mechanical sweep is not reviewable line-by-line, and this script is what
  turns it into a machine-checked claim — line count equal, forward-substitution byte-identical —
  offline, no browser. It is narrowly hardcoded to the eight sanctioned substitutions this migration
  needed (line 10-22); it does not generalize into a config-driven rewrite engine for hypothetical
  future migrations, which is the correct rung here — a general tool for a problem that occurs once
  a year, if that, would be the over-engineering.
- **`scripts/geometry-dump.mjs` (213 lines) — load-bearing, keep.** Proof B of the same pair: a
  structural-path element dump across 2 routes × 2 viewports × 2 themes, diffed before/after. It is
  the only instrument that can see a cascade effect Proof A cannot (a rewritten class that resolves
  differently), and `plan.md` R3 records why an empty diff alone would be a failed dump rather than a
  pass. Its one spec-specific piece — `isInsideDs1Footer`/`isAncestorOfADs1FooterPath` — hardcodes
  the one exemption this migration actually has (the DS1 footer subtree). That is the ladder's rung
  2-3 answer (reuse what exists, keep what's specific specific), not rung 7 (build a generic
  exemption-rule engine nobody asked for).
- **Neither script is wired into `pnpm check` or CI**, and that is correct, not an oversight: they
  answer a one-time migration claim ("nothing moved"), and the claim does not recur — the thing that
  must recur is guarded permanently by `__tests__/spacing-guards.test.ts` (below), which *is* in
  `pnpm test`. Keeping one-time proof tooling in `scripts/` alongside the permanent guard costs two
  files and zero maintenance burden (they take no config, no flags beyond `--out`/`--diff`/`--ref`);
  deleting them would delete the only artifact that makes T4/T9's evidence in `reports/qa.md`
  reproducible by a human rather than asserted.
- **`__tests__/spacing-guards.test.ts` (111 lines, 5 cases) — the permanent guard, keep, and it is
  not the same job as the two scripts above.** Cases 1-3 assert the *declaration* is gone from
  `app/globals.css` and that no consumer reads or uses the named suffix anywhere under `app/` or
  `components/` — this is what makes the collision "cannot be re-armed" per the tech-lead's own
  framing, and it runs on every `pnpm check`. Cases 4-5 do the same for `DESIGN.md` (B5/B8's
  boundary). A permanent guard against a defect recurring is explicitly not over-engineering by this
  gate's own brief, and this is that guard, not a duplicate of it.
- **`tests/e2e/dark-hydration.spec.ts` (96 lines) — load-bearing, keep.** It encodes `design.md` §7's
  four-clause criterion for D2 (theme-correct first frame, no substitution, no layout shift, no
  console error) across both routes and both system themes, in a production build. The two internal
  probes — `headerLayoutShiftCount` (Layout Instability API) and comparing `toggleRect` between
  `domcontentloaded` and `networkidle` — are not redundant with each other: one detects a shift the
  browser itself flagged, the other detects a shift that never crossed the Layout Instability
  threshold but still moved the toggle. Two cheap reads, two different failure modes; removing
  either narrows what a real hydration regression could be caught by.
- **`tests/e2e/disclosure-legibility.spec.ts` (179 lines) — load-bearing, keep, and out of my
  jurisdiction to shrink regardless.** It is `legal.md` LR1-LR4 turned into assertions on rendered
  geometry, at G2's own instruction (see `STATUS.md` "AC2 and AC3 raised onto rendered geometry").
  This is exactly the disclosure/legal-floor testing this gate is forbidden from simplifying away.
  `waitForStableBoundingBox` (lines 71-89) is a small local polling helper with one call site
  (`openPrivacySettings`); it does not exist elsewhere in `tests/e2e/` to be reused instead
  (`grep` across the other specs found no equivalent), and it takes no configuration beyond the
  three constants it needs. Correct size for one call site.
- **`playwright.config.ts`'s new "Dark production" project and `webServer.env` block — load-bearing,
  keep.** The fourth project is the CI reproduction the tech-lead's triage brief demanded for D2 (a
  `colorScheme: "dark"` context is a browser-context concern Playwright can only express as a
  project, not as an in-test toggle); `testIgnore`/`testMatch` keep it from doubling every other
  spec under a second theme. The three `NEXT_PUBLIC_*` literals in `webServer.env` duplicate the
  same three values already in `.github/workflows/ci.yml` (untouched by this diff, so not mine to
  consolidate into) — necessary duplication to keep local `pnpm e2e` inlining the same build-time
  env CI does (R7), not a config invented for a value that never changes.

## The D2 fix — checked against the G4 ruling

`components/organisms/app-header.tsx:54-70`: both glyphs are server-rendered
(`<IconMoon ... dark:hidden>`, `<IconSun ... hidden dark:block>`), visibility toggled purely by the
`.dark` class Tailwind already generates, and the click handler reads
`document.documentElement.classList.contains("dark")` instead of `resolvedTheme`. This is the small
version of the mechanism G4 decided and compiled — no state machine, no `useEffect`, no mount guard,
no third icon variant, no abstraction over "theme glyph" beyond the two elements the fix needs. The
matching test file (`__tests__/app-header.test.tsx`) drops the `resolvedTheme` mock field it no
longer needs rather than leaving it dead. Nothing to cut here.

## Migration residue — checked, none found

- `grep` for every retired suffix (`spacing-hair|xs|sm|md|lg|xl|2xl|3xl`) across `app/` and
  `components/` returns nothing — the sweep is complete, not partial.
- `app/globals.css` declares no `--container-*` key; the only `--container-app` lines in the file are
  the pre-existing Tailwind container-scale entries the plan explicitly says must not gain a new
  declaration (`plan.md` §3, B-series ruling on D1) — confirmed unchanged by this diff.
- Diffing every organism/molecule/atom file the migration touched, every changed line matches a
  spacing-utility substitution pattern with no structural residue (no leftover `var(--spacing-*)`
  reads, no half-migrated call site, no helper written to wrap one call site).
- No new `interface`, `class`, `Factory` or `Provider` appears anywhere in the diff
  (`git diff -- '*.ts' '*.tsx' | grep -E '^\+.*(interface |class |Factory|Provider)'` is empty) — the
  migration is a value substitution, not an architectural one, exactly as `plan.md` scoped it.
- T6's row-stacking in `cookie-consent.tsx` (`flex-col items-start … sm:flex-row sm:items-center`) is
  the minimal flow-direction change B4 permits — no new component, no new prop, no animation added
  (B7's constraint holds).

## Pre-existing, out of scope

- `components/atoms/google-ad.tsx`'s `catch {}` (was `catch { /* … */ }` with an explanatory
  comment) and the state of `lib/utils.ts`'s `tailwind-merge` comment are both artifacts of a
  comment-stripping process `STATUS.md`'s decisions log already names as concurrent and unresolved
  (G5 T6/T9 entries) — a comment-policy and AC11-conformance question, not an over-engineering one.
  Not mine to rule on; noted only so it is not silently re-discovered as a "finding" by whoever reads
  this report next. No severity, no verdict weight.

## What is correctly simple

- The eight-token → numeric-scale mapping is exhaustive and 1:1 with no residual case, so nobody
  needed a lookup table, a config object or a helper function at any call site — every occurrence is
  a literal Tailwind utility, which is the correct end state for a deletion this total.
- `data-theme-icon="moon"|"sun"` is the whole "stable selector instead of a class assertion"
  mechanism G4 asked for — two attributes, no test-id scheme, no data layer.
- The migration touched 22 files and introduced zero new shared components, zero new hooks, and zero
  new `lib/` functions. For a change this wide, that is the tell that it stayed a value substitution.
