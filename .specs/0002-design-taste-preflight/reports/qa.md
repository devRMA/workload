# 0002 — qa report

> Owner: qa-engineer · Run: 1

**Verdict:** `passed`

## Gate output

All run against the working tree at G6 (commit base `366eab5`, uncommitted diff on `fix/design-taste-preflight`).

| Command | Result |
|---|---|
| `pnpm check` (lint + typecheck + test) | Clean. 56 test files, 493 tests, 0 failures. No biome or tsc errors. |
| `pnpm test:coverage` | Clean, exit 0, no threshold violation printed for any of the four configured globs. |
| `pnpm build` | Clean, exit 0. One Turbopack warning (`Failed to find font override values for font "Atkinson Hyperlegible Next"`), which is the expected, already-measured-and-recorded warning (`evidence/after.md` §7: CLS 0.0011 / 0.000 across 18 runs). Not a defect. |
| `node .agents/tools/docs-check.mjs 0002-design-taste-preflight` | Clean, 0 failures, 0 warnings. |
| `pnpm e2e` (port free, `NEXT_PUBLIC_ENABLE_ADS=true NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000`) | **Not independently re-run** — a `next dev` server owned by another parallel gate agent already held the dev lock in this shared tree (`AGENTS.md` §4 rule 6: I do not kill or disturb another agent's process). Relied on `evidence/after.md` §6 instead, which records both required outcomes (43/43 passed with the port free; a loud `http://localhost:3000 is already used` abort with a foreign server on it) with exact commands and dates, and correctly withdraws the earlier "21 pre-existing failures" finding rather than annotating around it. |

### Coverage, per area (not aggregate)

Computed from `coverage/lcov.info` after `pnpm test:coverage`, and cross-checked against the fact that the run's exit code was 0 against `vitest.config.ts`'s four per-glob thresholds (100/100 on `lib/**` and `hooks/**`, 90/90 on `app/**` and `components/**`):

| Area | Lines | Branches | Functions | Bar | Result |
|---|---|---|---|---|---|
| `lib/**` | 100% | 100% | 100% | 100% | **met** |
| `hooks/**` | 100% | 100% | 100% | 100% | **met** — untouched by any task, as `plan.md` states |
| `app/**` | 100% | 100% | 100% | ≥90% | **met** |
| `components/**` | 100% | 99.6% | 100% | ≥90% | **met** (the one sub-100 file, `ad-manager.tsx` line 12, is pre-existing and untouched by this diff) |

No area hides a gap behind an aggregate; `lib/` and `hooks/` are both genuinely at 100%.

## Acceptance criteria

| # | Status | Evidence |
|---|---|---|
| AC1 | met | `__tests__/copy-guards.test.ts` "no user-visible em-dash or en-dash survives" — walks `app/`, `components/`, `lib/`; green. Manually confirmed 0 remaining `—`/`–` outside comments in the diffed files. |
| AC2 | met | All 11 rewrites verified character-for-character against `copy.md` §2.1–2.11 in `lib/payroll.ts:24`, `lib/compliance.ts:34`, `day-summary.tsx`, `calculator-views.tsx:79`, `salary-calculator.tsx:126,34`, `lib/structured-data.ts:27`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `app/custo-da-hora/{opengraph,twitter}-image.tsx`. |
| AC3 | met (designer's artifact, spot-checked) | `evidence/preflight-matrix.md` present, 63 table rows (header + 62 boxes). Not re-litigated — design gate is closed. |
| AC4 | met | `DESIGN.md` "Design Read and Dials" section present with `DESIGN_VARIANCE: 3 · MOTION_INTENSITY: 2 · VISUAL_DENSITY: 5` and its Section 1.A/1.B justification. |
| AC5 | met (evidence, not re-measured) | `evidence/after.md` §4, screenshots recorded; tabular-nums preserved (`--text-numeral`/`--text-metric`/`--text-input` keep `tnum, zero` feature, only `letterSpacing`/`lineHeight` moved per T2's table — verified in `app/globals.css` diff). |
| AC6 | met (evidence, not re-measured) | `evidence/after.md` §5. |
| AC7 | met, as restated | `spec.md` restates AC7 (run 4) to three relative clauses; `evidence/after.md` §2 computes all six clauses pass. Ruling trail in `STATUS.md` B5/B6 is coherent with `plan.md`'s amendments. |
| AC8 | met | `evidence/baseline.md` §2 / `evidence/after.md` §2, before/after pair with dates and commands. |
| AC9 | met | `rg 'lucide-react'` over `app/`, `components/`, `lib/`, `__tests__/` returns only the guard's own literal string in `copy-guards.test.ts`; absent from `package.json` dependencies. |
| AC10 | met | `.agents/tools/route-js.mjs` created verbatim per plan; `evidence/after.md` §1 records the after figure against the 228,446-byte baseline. |
| AC11 | met | `__tests__/copy-guards.test.ts` "no viewport-unit regression"; `calculator-page.tsx:20` uses `min-h-dvh`. |
| AC12 | met (evidence recorded, not re-run in this session) | `evidence/after.md` §3. |
| AC13 | met | `evidence/after.md` §3 and §6 both state, with the `git diff` hunk range, that no `--color-*` token moved; `DESIGN.md` §Colour is the evidence of record, unchanged. |
| AC14 | met | `evidence/after.md` §6, 13/13 on `responsive.spec.ts`/`wide-viewport.spec.ts`; see gate-output note above on why I did not re-run the full suite myself. |
| AC15 | met | `pnpm test` green, no computed-value assertion changed in any `lib/` test; coverage unchanged at the bars. |
| AC16 | met | see Gate output table above. |
| AC17 | met | `rg 'font-inter'` in `app`, `components`, `DESIGN.md` returns nothing outside what T10 left correctly updated. |
| AC18 | n/a | Superseded — Atkinson Hyperlegible Next shipped, so the "Inter kept as exception" clause does not apply, exactly as `plan.md` T10's done-when states. |
| AC19 | met | `__tests__/copy-guards.test.ts` "no descriptor names a compensation regime..."; `rg -i 'banco de horas'` returns nothing under `app/`, `components/`, `lib/`, `__tests__/`. |
| AC20 | met | All 7 claim locations (C1–C6 + the two `custo-da-hora` alts under S8) verified against `copy.md` §3, one row each; `lib/structured-data.ts:27` correctly not listed as its own row (inherits C6). |
| AC21 | met | `__tests__/copy-guards.test.ts` "every `saldo` in a descriptor is scoped to the day" — verified the regex `/saldo(?!\s+(do dia\|diário\|de hoje))/gi` correctly flags "saldo de horas" (the colloquial synonym `legal.md` S9.1 named), closing the hole the plain grep left. |
| AC22 | met | `__tests__/calculator-page.test.tsx` "emits the same descriptor in the JSON-LD name as in the h1"; `__tests__/opengraph-image.test.ts` "emits the same descriptor as the JSON-LD name on both networks"; `__tests__/copy-guards.test.ts` "the two root alts and the JSON-LD descriptor are the same string". Three independent standing tests, not just a one-time diff. |
| AC23 | met | `lib/payroll.ts:24` rewritten verbatim; `__tests__/payroll.test.ts` new cases assert "teto do salário de contribuição" present and "teto de contribuição em" absent. |
| AC24 | met | `git diff` on `__tests__/**` shows string updates and additions only. The one renamed `it()` in `hero-panel.test.tsx` ("still asks for a finite size…" → "asks for no inline size…") is the exact transformation `plan.md` T5 ordered — test count is preserved, not reduced — not a deletion. |
| AC25 | met | `lib/payroll.ts:32` rewritten verbatim per `copy.md` §3-A.1; `__tests__/payroll.test.ts` "never calls the RPPS federal ceiling the teto do INSS"; `__tests__/copy-guards.test.ts` "`lib/` never calls R$ 8.475,55 the contribution" also asserts `"teto do INSS"` absent. |
| AC26 | met | Both `WORK_REGIME_INFO` impacts now govern R$ 8.475,55 with the same noun phrase, "teto do salário de contribuição" — read directly in `lib/payroll.ts:24,32`. |

## Findings

### minor — duplicate, contradictory T13 row in `STATUS.md`'s Tasks table

- **Where:** `.specs/0002-design-taste-preflight/STATUS.md`, Tasks table (two consecutive rows both keyed `T13`)
- **What is wrong:** T13 appears twice: one row says "**done, run 5**" with the verification detail, the row directly below it says "**open, run 5** — added at B6 triage". A reader who reads only the second row would believe T13 is still open, when it is done and verified (config diff matches, evidence recorded).
- **What correct looks like:** One `T13` row, state `done`. Not a code or test defect — flagging for whoever runs the docs gate next, since `docs-check.mjs`'s "no open blockers on a `done` spec" check does not appear to catch a duplicate-key row.

### minor — pre-existing Tailwind class-string assertion in a file this spec's T5 touched

- **Where:** `__tests__/hero-panel.test.tsx:58` (unchanged by this diff — confirmed against `366eab5`), `expect(document.querySelector(".border-t")).toBeNull()`
- **What is wrong:** `AGENTS.md` §8 forbids asserting a Tailwind class string; this predates 0002 and T5 did not touch this test's body, so it is not a new violation and not a reason to reject this gate. Recording it because T5 edited this same file (added three new tests around it) and a reviewer scanning the diff should not mistake it for new.
- **What correct looks like:** Replace with an observable-behavior assertion (e.g., no bottom-border wrapper element by role/structure) in a future pass — out of this spec's scope.

## Test quality

Read adversarially, task by task. No test asserts a Tailwind class string, a tabler-icon class, or mirrors the implementation. Specifically checked because the icon swap (T3) is exactly the change that tempts a class-string assertion: all three edited icon tests (`hero-panel.test.tsx`, `alert-banner.test.tsx`, `date-time-input.test.tsx`) only pass the new icon component as a prop and assert role/text/attribute (`getByRole("alert")`, `svg[aria-hidden]`), never a rendered icon's class. The new `copy-guards.test.ts` guards string facts about source text only (compensation-term ban, `saldo` scoping, night-premium completeness ban, descriptor equality, `teto do INSS`/`teto de contribuição` ban, em-dash sweep, `lucide-react` ban, viewport-unit ban) — no Tailwind class, no colour, no layout assertion, matching `plan.md` T9's own constraint on itself.

The guard file was proven to fail before it guarded anything: `STATUS.md` records it was built and run first in an isolated `git worktree` at `366eab5` (`AGENTS.md` §4 rule 6, not the shared tree), 6 of 8 cases red, then 8/8 green on the current tree, worktree removed after.

## Code craft

Checked every changed file under `app/`, `components/`, `lib/`, `hooks/`, `__tests__/`, `.agents/tools/`, `playwright.config.ts` against `AGENTS.md` §8:

- **No `any`, no `@ts-ignore`/`@ts-expect-error`, no `!` non-null assertion** introduced anywhere in the diff (checked programmatically over every added line).
- **Comments:** exactly one comment added to application/config code — `playwright.config.ts`'s two-line comment on `reuseExistingServer: false` — and it states a non-obvious hazard (a reused server serves stale `NEXT_PUBLIC_*` values), not what the code does. No other diff line under `app/`, `components/`, `lib/`, `__tests__/` adds a comment. `.agents/tools/route-js.mjs`'s header comment (new file, tooling not application code) documents why the measurement method is what it is, matching `plan.md`'s own verbatim content.
- **English identifiers** throughout; all new identifiers (`IconClock`, `isFigure`, `DESCRIPTOR_SOURCES`, `walkSourceFiles`, etc.) are English and descriptive.
- **Business rules stay in `lib/`.** The two rewritten legal strings (`lib/payroll.ts:24,32`, `lib/compliance.ts:34`) remain display-prose interpolations of existing `lib/legal-tables.ts` constants; no new literal number entered `lib/`, and `lib/legal-tables.ts` itself is untouched (confirmed empty diff), holding the LD7 boundary this plan is explicit about.
- **No raw class-string arbitrary values introduced** beyond what already existed; `calculator-page.tsx` correctly uses the `min-h-dvh` core utility, not an arbitrary `min-h-[100dvh]`.
- **`cn()` used** for `HeroPanel`'s new statement-mode branch, matching the file's existing idiom.
- **No new dependency without justification:** `@tabler/icons-react` and `@axe-core/playwright` both carry written justifications in `plan.md` § Dependency decisions / § Amendment — G5 run 1; `lucide-react` removed one-for-one; `package.json` diff matches exactly (`@tabler/icons-react` in, `lucide-react` out, `@axe-core/playwright` as devDependency).
- **Motion:** `calculator-layout.tsx`'s mount animation was deleted outright (not gated behind `prefers-reduced-motion`), which is correct per T4 — no animation remains to need a reduced path.
- New code is idiomatically indistinguishable from the surrounding file in every case checked.

## Checked and clean

- All 11 travessão rewrites and all 7 "banco de horas" claim-surface rewrites match `copy.md` character for character, including the em-dash → full-stop/colon substitutions and the one structural change (`nem` → `não valem`) that `copy.md` explicitly calls out as deliberate.
- The 30-icon Lucide → Tabler map, including all five non-obvious renames (`RotateCcw→IconRotate`, `Zap→IconBolt`, `CalendarDays→IconCalendarMonth`, `Trash2→IconTrash`, `PlusCircle→IconCirclePlus`) and the three `strokeWidth→stroke` prop renames, matches `plan.md` T3's table exactly. `components/atoms/progress-ring.tsx`'s native SVG `strokeWidth` props were correctly left untouched.
- `app/manifest.ts`, `app/sitemap.ts`, `app/robots.ts`, `README.md`, `lib/legal-tables.ts`, and `calculator-views.tsx:83-99` (the Súmula 60 paragraph) all show an empty diff, exactly as `plan.md` R7/R8 and `spec.md` § Out of scope require.
- `HeroPanel`'s statement-mode branch (`isFigure = /\d/.test(value)`) adds no prop, no new component, no new token, matching T5.
- `DESIGN.md`'s five T10 changes (Design Read/Dials section, typography frontmatter incl. the `fontVariation: "opsz auto"` deletion on `numeral`, the two factual corrections about `opsz` and `slashed-zero`, the iconography section rename, the two hero statement-mode sentences) are all present and match `plan.md` C1–C5.
- `playwright.config.ts`'s one-line change is exactly the three lines the plan specifies, nothing else in the file moved.
- `evidence/after.md` §6 is genuinely rewritten, not annotated: the withdrawn "21 pre-existing failures" paragraph and its worktree-probe conclusion are gone; no other artifact in this session was found still carrying the false finding.
