# 0002 — design taste preflight

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** in-progress
**Next agent:** human — **G8 (release) PARTIAL, run 1, by `release-manager`: committed, push
pending human approval.** Nine commits on `fix/design-taste-preflight`, grouped by coherent idea
(typeface, icons, legal-string rewrites + hero statement mode, banco de horas retirement,
cold-load path, permanent copy-guards test, `DESIGN.md` reconciliation, tooling repairs, spec +
memory artifacts) — each staged by name, each verified independently green (`pnpm typecheck` /
`pnpm test` / `pnpm build` re-run in isolation via `git stash`, not just at HEAD) before the next
was staged. Full detail in `reports/release.md`. **Nothing pushed, no PR opened, no remote
operation of any kind** — `AGENTS.md` §10 requires explicit human approval before that step,
asked for and not yet given. The blocking condition on the PR stack (below, and in
`reports/release.md` §4) still holds unchanged. **Found mid-gate:** lesson **018** and an archive
probe file appeared in the shared tree during this run, both tagged spec `0005` /
`labor-law-analyst`, not `0002` — left untouched, uncommitted, not mine to decide; flagged in
`reports/release.md` and to the human.
**Previous header (G7):** **G7 (docs) PASSED, run 1, by `release-manager`.** Full
reconciliation in `reports/release.md`. Three documentation defects found and fixed before any
commit: a duplicated/contradictory `T13` row in this file's Tasks table (collapsed to one `done`
row); a stale `recruiter | tech-recruiter` row in this file's Gates table and in
`.specs/templates/STATUS.md` (removed from both — `AGENTS.md` §3 gives this squad no
`tech-recruiter` seat); `design.md` §5.3, whose Asap-fallback contingency and `adjustFontFallback`
claim were never closed out after the B5/B6 rulings (added a short "Resolved" addendum pointing at
those rulings, original text untouched). F5 and F6 (`reports/legal.md`) remain open, correctly
recorded as such, owners `product-manager` and `qa-engineer`/`tech-lead`. **Nothing committed —
G8 has not started and requires the human's approval before any push, PR, or merge.**
**Previous header (before G7):** **G6 triage done, run 1: both criticals routed to
`.specs/0005-tailwind-theme-collision-and-dark-hydration-hotfix/`, `0002` proceeds.** Neither
finding is in this spec's diff, both were confirmed at `366eab5`, and all four G6 reviewers passed.
**One condition on G7, and it is binding: `release-manager` may prepare and open this spec's PR,
but the stack (#32-#37 plus this branch) does not merge into `main` until `0005` lands on top of
it.** PR #35 introduced a `@theme` namespace collision that renders the D1-D4 legal disclosure as a
64px column; `main` does not have that defect, so merging is the act that would ship it. Full
reasoning and the compiled proof: § Bounce triage - G6 run 1, below. **Previous header (G6 triage
pending):** **all four G6 reviewers done, run 1: qa PASSED, audit
PASSED, law PASSED, ponytail PASSED.** `web-standards-auditor` verdict: **pass**
(`reports/audit.md`). Zero axe-core violations at any impact in 8/8 captures (both themes, both
viewports, both routes), contrast unchanged and independently proven via `git diff` on
`app/globals.css` (zero `--color-*` lines touched) plus Lighthouse accessibility **1.0 on 12/12
runs**, `MISSING_VALUE` confirmed live in a real browser to render non-empty `aria-live="polite"`
text, reduced-motion probe found zero `hover:`/`focus:` transform utilities needing a
`motion-reduce:` guard anywhere in the app, route JS **226,988 B** (within the ±10,240 B budget
against the 228,446 B baseline), Lighthouse budgets pass on both presets/both routes, layout
clean at 390/1440/2560/3840 (13/13 + full `pnpm e2e` 43/43, independently re-run), SEO/metadata
(title, OG, JSON-LD, `alt`, sitemap, robots, manifest) all consistent and free of "banco de
horas". **Two critical findings, both confirmed pre-existing via an isolated `git worktree` at
`366eab5` (not caused by 0002, not blocking this gate):** (1) a React hydration error (#418) on
every route in a **production** build under a dark system color scheme — invisible to `next dev`
and to `preview.mjs`, which always drives dev mode; (2) the footer disclosure (`legal.md` S4,
`PRODUCT.md` §4) collapses to a **64px-wide column** at every viewport (390 through 3840) because
`max-w-3xl` resolves against the project's custom `--spacing-3xl` (4rem = 64px) instead of
Tailwind's `--container-3xl` — not an overflow, so the Playwright overflow suite never caught it.
Both routed to `tech-lead` for an urgent follow-up spec; lesson **015** records the tooling blind
spot (dev-mode + light-profile tools cannot see a dark-mode production-only hydration defect).
Full report: `reports/audit.md`.

**Previous header, run 1 (qa only, for the record):** `qa-engineer` PASSED. `pnpm check`,
`pnpm build`, `pnpm test:coverage` (100% `lib/**`/`hooks/**`, 100%/99.6%/100% on
`components/**`, 100% on `app/**`) and `node .agents/tools/docs-check.mjs` all clean. All 26
acceptance criteria accounted for, pass. Two minor, non-blocking findings recorded in
`reports/qa.md`: a duplicate/contradictory `T13` row in this file's Tasks table (one says done,
the next says open), and a pre-existing (not introduced by this spec) Tailwind class-string
assertion at `__tests__/hero-panel.test.tsx:58`. Did not independently re-run `pnpm e2e` — a
`next dev` server held by a parallel gate agent already occupied the dev lock in this shared
tree; relied on `evidence/after.md` §6 instead, which is correctly rewritten.

**Previous header, run 5 (for the record):** **T13 done, T11 step 7 done,
§6 rewritten, at run 5.** `playwright.config.ts`'s one-line fix landed exactly as specified
(`reuseExistingServer: false`, same comment); both required checks ran: port free →
**43 passed, 0 failed**; a foreign server (started with `pnpm dev`, no `NEXT_PUBLIC_ENABLE_ADS`)
on the port → Playwright aborted before the first test with `http://localhost:3000 is already
used`, then the foreign server was killed. `evidence/after.md` §6 is rewritten, not annotated: the
withdrawn "21 pre-existing failures" paragraph is gone, replaced by the 43/43 result, the cause
(`reuseExistingServer` + `NEXT_PUBLIC_*` inlining) and the one line on why the worktree probe
reproduced it anyway (same dirty server from both ends — a worktree isolates files, not a shared
port). `evidence/after.md` §7 (new) holds the CLS table read from § 2b's own nine `lhr-*.json`
files: **0.0011 on `/`, 0.000 on `/custo-da-hora`, `font-display` score 1 on all 18 runs**, with
the reading (fallback face never painted, preload finishes at 65 ms against FCP 766 ms) and the
line on when the warning becomes live again. **Every one of the twelve original tasks plus T13 is
done.** `pnpm check`, `pnpm build`, `pnpm e2e` (43/43) and `node .agents/tools/docs-check.mjs` are
all clean. **G5 closes at zero bounces of two.** No application code changed in this run — only
`playwright.config.ts` and the evidence file, per the ruling.

**Previous header, run 5 (for the record):** `frontend-dev` — **B6 is RULED and CLOSED at run 5. AC7 passes. Run T13, then T11 step 7 and the §6 rewrite.**
Three rulings, one of them producing work and none of it in application code. **(1) AC7 is
satisfied** — computed against the run set its own verification cell names (`evidence/after.md`
§2, default `lhci autorun`), six of six clauses pass on both routes. The nine-run §2b set does not
overturn it: clause (b) compares an improvement against **range**, and range grows with sample
size, so it is decidable only at a fixed n — while §2b's clause (c) holds **nine for nine** (p ≈
0.2%), which is the sharper statement about the same improvement. AC7's text is **not** restated
again. **(2) The "21 pre-existing e2e failures" are withdrawn — there is no regression and no
application defect.** The cause was `playwright.config.ts:52` `reuseExistingServer:
!process.env.CI` reusing a foreign dev server started without `NEXT_PUBLIC_ENABLE_ADS`; with the
port free the suite is **43 passed, 0 failed**. Fixed here as **T13** (one line,
`reuseExistingServer: false`), and `evidence/after.md` §6 is rewritten because a false finding
left in the evidence is acted on downstream. **(3) The `next/font` fallback warning is settled by
measurement, not routed to `product-designer`**: CLS is **0.000** on `/custo-da-hora` and
**0.0011** on `/`, all nine runs, on the shipped build — the fallback face is never painted.
Recorded as T11 step 7. Full reasoning: `plan.md § Amendment — G5 run 5 (B6)`. Lessons **013** and
**014** written. **G5 stands at zero bounces of two** — B6 was a blocker escalation under
`AGENTS.md` §4 rule 7, not a gate rejection.

**Previous header, run 4:** **B5 RULED at run 4 by `tech-lead`. Atkinson ships; the font is not swapped.** The 31 ms miss is
not the font and the instrument says so: LCP phases on the median run are **TTFB 454 · Load Delay
0 · Load Time 0 · Render Delay 2076**, and the shipped Atkinson woff2 (34,024 bytes) finishes at
**65 ms**, 2.4 s before the LCP timestamp. `spec.md` R3 triggers only *"if the chosen family
pushes LCP up"* — it went **down** on both routes by more than the run spread — so the §2.6 Asap
fallback was never reachable. The remaining cost is render delay from the client-gated hero
numeral (`design.md` §5.1 cause 2), which §5.2 never put on the "what may change" table and which
`spec.md` puts out of scope. All three design-owned levers (L1, L2, L3) are spent in T4 and bought
156-231 ms. **Ordered:** T11 step 2b (nine-run LCP variance with the phase breakdown, no stop
condition) then steps 3-6 against Atkinson. **Routed to `product-manager`:** AC7 reads a
lab-simulated median against a threshold defined as a field p75, with a tool variance (~106 ms)
over three times the margin judged, and as scoped it is satisfiable only by work the same spec
forbids. Three options and a recommendation are in § "Routed to `product-manager`" below. Full
reasoning: `plan.md § Amendment — G5 run 4 (B5)`. **G5 remains at zero bounces of two** — a
pre-authorised stop under `AGENTS.md` §4 rule 7 is not a rejection.

**Previous header, run 3:** `frontend-dev` — **T11 stopped at step 2 (LCP), the pre-authorised R3 stop
condition.** T1–T10 are all done (see Tasks table); T11 step 1 (route JS) passed with room to
spare. Step 2 measured LCP mobile, ads off, 3 runs, same protocol as T1: `/` median **2531.406 ms**
(runs 2636.296 / 2529.768 / 2531.406), `/custo-da-hora` median **2537.612 ms** (runs 2623.128 /
2529.734 / 2537.612) — both **improved** from the T1 baseline (2687.232 ms and 2769.030 ms) but
both still **over the 2500 ms AC7 target** (by 31.406 ms and 37.612 ms). `plan.md` T11 step 2 and
`design.md` §5.3 name this exact outcome and say plainly it is not mine to resolve: *"Median over
2500 ms → stop and record it: `spec.md` R3 disqualifies the family regardless of the aesthetic
case and `design.md` §2.6 names **Asap** as the pre-analysed replacement, but that reversal is
mine to order."* Recorded in `evidence/after.md` §§1–2. **Did not swap the font, did not re-run
T2's ramp, did not continue T11 steps 3–6** — those are all downstream of whichever family ships
and would be wasted work under a reversal. **Needs from `tech-lead`:** a ruling — accept Atkinson
with the LCP gap open (and say why, e.g. against `spec.md`'s stated LCP target's margin of error),
or order the Asap swap (`design.md` §2.6), which reopens T2 and everything after it that reads the
ramp (T5's fit numbers, T10's `DESIGN.md`, T11 itself). **T12 is also done** (run 3, no dependency
on B5): the B2 clause from `copy.md` §3-A.1 is pasted verbatim into `lib/payroll.ts:32`, `rg 'teto
do INSS' lib` returns nothing, and both the `payroll.test.ts` and `copy-guards.test.ts` guards are
green. Of twelve tasks, **eleven are done; only T11 is open, and only because of B5.**
**Previous header, run 3:** `frontend-dev` — **T1 is done at run 3.** Step 0 repaired the tooling exactly as
amended: `@axe-core/playwright@4.13.0` added as a `devDependency`, the `from 'playwright'` import
fixed to `@playwright/test` in both `preview.mjs` and `check-reduced-motion.mjs`, the vendored
dialog loop and its three aggregation sites deleted from `preview.mjs`, `.agents/tools/route-js.mjs`
created verbatim. Step 1 measured `/` = `custo-da-hora` = **228,446 gzipped bytes over 9 chunks**,
matching `tech-lead`'s figure exactly. Step 2 was already done (LCP, untouched). Step 3 ran the
repaired `preview.mjs`: **0 axe violations at any impact, 4 `color-contrast` incomplete (all on
`/`), 16 console errors** (HMR WebSocket noise from the tool's own `next dev`, not the page).
`evidence/baseline.md` holds all three sections, no `BLOCKED` remains. `git status` still shows
no file under `app/`, `components/`, `lib/` or `hooks/` modified — only `package.json`,
`pnpm-lock.yaml`, `.agents/tools/**` and `.specs/**`. `pnpm check` (lint + typecheck + all 471
tests) is green. **Proceeding to T2.**

**Previous header, run 1 (for the record):** **T1 stopped at run 1**, two tooling blockers found while taking the before-measurements the plan requires ahead of any source edit (B3, B4 below). No source file has been touched; `git status` on `app/`, `components/`, `lib/`, `hooks/` is unchanged. `frontend-dev` did **not** proceed to T2 with T1 red, per `AGENTS.md` §4 rule 7 and the plan's own "no source file may be edited until T1 lands". Once B3 and B4 are resolved, T1 resumes from `evidence/baseline.md`, which already holds the one measurement that did succeed (LCP).
**Blockers open:** **none.** **B3 and B4 CLOSED at run 2 by `tech-lead`** — see § Bounce triage
— G5 run 1. Neither was a rejection of the build: both were plan defects that `frontend-dev`
correctly refused to paper over. **B2 remains CLOSED at run 3.**

**Previous line, run 1:** **B3, B4** (both raised this run, both by `frontend-dev` at T1). **B2 remains CLOSED at run 3** — `product-manager` absorbed `lib/payroll.ts:32` into this spec's scope (`spec.md` § Scope + § F1, **AC25** and **AC26**). **T12 is unblocked and fully specified**: the replacement clause is in `copy.md` §3-A.1, keyed old/new, and `frontend-dev` pastes it without editing a character — but T12 depends on T6, which depends on T1 completing first per task order.
**Bounces:** 1 of 2 on G2, **closed**. **G5: zero bounces.** B3/B4 were a blocker escalation
under `AGENTS.md` §4 rule 7, not a gate rejection: `frontend-dev` produced no rejected artifact
and both defects were in `plan.md`, mine. Recorded so the two-bounce ceiling is not consumed by
work that did not bounce.

**Previous line:** 1 of 2 on G2, **closed**. G1 amended twice (run 2, run 3); neither is a bounce — both were routed corrections, not rejections. Triaged by `tech-lead`, routed G2 -> G1, amended by `product-manager` at run 2, re-passed by `labor-law-analyst` at run 2. No bounce remains open.

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| spec | product-manager | **done** | 4 | `spec.md` (run 2: claim correction + F1; run 3: AC25/AC26; **run 4: AC7 restated, AC10 verification corrected, one out-of-scope line and one non-goal added**) |
| law | labor-law-analyst | **done** | 2 | `legal.md` (run 2: §14 LD10 / S9, §15 LD11 / S10, §16 verdict) |
| design | product-designer | **done** | 1 | `design.md` + `evidence/preflight-matrix.md` + two font specimens in `evidence/` |
| copy | content-writer | **done** | 3 | `copy.md` (onze strings + sete locais da reivindicação, contra S1-S10; run 3: §3-A, a cláusula de `payroll.ts:32` sob S10.3) |
| plan | tech-lead | **done** | 5 | `plan.md` (13 tasks; run 2 amended T1, T3, T11 for B3/B4; run 4 amended T11 for B5; **run 5 added T13 and T11 step 7 for B6**) |
| build | frontend-dev | **done** | 5 | T1-T13 all done. **B5 RULED run 4** (Atkinson ships); **B6 RULED run 5** (AC7 passes; e2e failures withdrawn, fixed as T13; CLS settled, recorded as T11 §7). `pnpm check`, `pnpm build`, `pnpm e2e` (43/43), `docs-check` all clean. G5 closes at zero bounces |
| law (G6) | labor-law-analyst | **done** | 1 | `reports/legal.md` — **pass**. S1-S10 all hold in the shipped source; two findings (F5, F6), neither a wrong number, neither on a user-visible surface |
| qa | qa-engineer | **passed** | 1 | `reports/qa.md` |
| audit | web-standards-auditor | **done** | 1 | `reports/audit.md` — **pass**, with two critical pre-existing (not 0002) findings routed for an urgent follow-up spec |
| ponytail | refactor-scout | **done** | 1 | `reports/ponytail.md` — **pass**, zero findings, dependencies verified against `plan.md` |
| docs (G7) | release-manager | **pass** | 1 | `reports/release.md` — three documentation defects found and fixed (duplicate `T13` row, stale `recruiter` row in this file and the template, `design.md` §5.3 left open); F5/F6 confirmed still open, correctly recorded; nothing committed |
| release | release-manager | **partial** | 1 | `reports/release.md` — nine commits made, push pending human approval |
| preview | web-standards-auditor | pending | 0 | `reports/audit-preview.md` |

## Tasks

Order is binding: it is the order in which the tree stays compiling and `pnpm check` stays
green after every single task. **T1 must complete before any source file is edited** — AC8 is
not measurable retroactively.

| Id | Title | Depends on | State |
|---|---|---|---|
| T1 | Repair the measurement tooling, then record the before-measurements (route JS, LCP, axe) | none | **done** |
| T2 | Swap Inter for Atkinson Hyperlegible Next and re-tune the eleven type steps | T1 | **done** |
| T3 | Replace `lucide-react` with `@tabler/icons-react` in all 15 files | T2 | **done** |
| T4 | Clear the cold-load path: the mount fade, the viewport unit, the two preconnects | T2 | **done** |
| T5 | Give `HeroPanel` its statement mode and replace `MISSING_VALUE` | T2, T3 | **done** |
| T6 | Rewrite the two `lib/` legal strings (S1 + S10, and S2) | none | **done** |
| T7 | Rewrite the three component disclosure strings (S3, S4, S5) | T5 | **done** |
| T8 | Retire the "banco de horas" claim across C1-C7 and fix the four separators | none | **done** |
| T9 | Make the claim guards permanent: one regression test file | T3-T8 | **done** |
| T10 | Reconcile `DESIGN.md` with what now ships (changes C1-C5) | T2, T3, T5 | **done** |
| T11 | Record the after-measurements and the figure evidence | T2-T9 | **done, run 5** — §6 rewritten (43/43, cause, worktree-probe correction), §7 added (CLS 0.0011 / 0.000, `font-display` 1) |
| T12 | `lib/payroll.ts:32` says "teto do INSS", which `legal.md` S10.3 forbids | T6 + `copy.md` §3-A.1 | **done** — no dependency on T11/B5, executed while T11 is blocked |
| T13 | Stop Playwright from reusing a server this run did not start (`reuseExistingServer: false`) | none | **done, run 5** — added at B6 triage, config only, no application code; verified 43/43 with the port free and a loud abort with a foreign server on it |

## Notes

`spec.md` introduces no new user input, so there is no new default to disarm
(`PRODUCT.md` §5). The defaults it sets are for downstream agents and are listed in the
spec's own defaults table.

## Blockers

| # | Raised by | Blocker |
|---|---|---|
| B6 | **CLOSED at run 5 by `tech-lead` — all three items ruled; see § B6 ruling below** — frontend-dev (G5, T11, run 4) | Two things T11's evidence surfaced, neither answerable by `frontend-dev`: **(1)** `spec.md`'s restated AC7, computed against the ordered nine-run set (`evidence/after.md` § 2b), passes all three clauses on `/custo-da-hora` but **fails clause (b) on `/`** — improvement 105.704 ms is 6.97 ms short of the after-set's own 112.678 ms spread. No lever remains (§ B5 ruling: L1-L3 spent, render delay is the only residual cost and this spec forbids touching it). **(2)** `pnpm e2e` (ads on, as named for this spec) has 21 failures across 7 titles — all four `google-tracking.spec.ts` tests, one `salary-calculator.spec.ts` test, two `work-calculator.spec.ts` tests — reproduced identically in three browser projects. Verified **pre-existing**, not a regression: isolated `git worktree` at `366eab5` (`AGENTS.md` §4 rule 6), same env, same specs, same chromium project → identical failures, identical accessibility snapshots. None of the seven titles touches a file any 0002 task edits. AC14's own tests (`responsive.spec.ts`, `wide-viewport.spec.ts`, 13 cases) are fully green. Full data in `evidence/after.md` §§2b and 6. **Blocks:** neither — every task is done and every lever this spec grants is spent. **What it does block:** a clean read of `plan.md § Amendment — G5 run 4 (B5)`'s literal T11 done-when, which names `pnpm e2e` clean as one of four conditions; that condition is not met, for a reason no task here can reach. **Needs from `tech-lead`/`product-manager`:** a ruling on (1) whether AC7 is satisfied spec-wide when one route clears every clause and the other misses one by under 7 ms, and (2) whether T11 (and G5) close with the pre-existing e2e failures recorded as a finding for a follow-up spec, rather than fixed here. |
| B5 | **CLOSED at run 4 by `tech-lead` — ruled, not swapped; AC7's wording routed to `product-manager` (see § B5 ruling below)** — raised by frontend-dev (G5, T11, run 3) | T11 step 2 hit the pre-authorised R3 stop condition, exactly as `plan.md` and `design.md` §5.3 wrote it. LCP mobile, ads off, 3 runs, same protocol as T1: `/` median **2531.406 ms**, `/custo-da-hora` median **2537.612 ms** — both real improvements over the T1 baseline (2687.232 ms, 2769.030 ms; −155.8 ms and −231.4 ms) and both still **over the 2500 ms AC7 target** (by 31.4 ms and 37.6 ms). Full runs and the exact commands are in `evidence/after.md` §§1–2. `plan.md` T11 step 2: *"Median over 2500 ms → stop and record it: `spec.md` R3 disqualifies the family regardless of the aesthetic case and `design.md` §2.6 names **Asap** as the pre-analysed replacement, but that reversal is mine to order."* This is not `frontend-dev`'s call to make either way — not to keep Atkinson with the gap unexplained, and not to swap to Asap unilaterally. **Blocks:** T11 steps 3-6 (each is downstream of whichever family ships) and, transitively, `qa-engineer`/`web-standards-auditor`'s AC5/AC6/AC7/AC8/AC12/AC13 evidence at G6. **Does not block T12**, which has no dependency on the typeface. **Needs from `tech-lead`:** a ruling — accept Atkinson with the gap recorded and reasoned (e.g. against measurement noise, or against the honest 5.3 direction analysis already in `design.md`), or order the Asap swap, which reopens T2 (re-tune against Asap's metrics), T5 (re-check the `--text-title` fit numbers), T10 (`DESIGN.md` §2, §3 rewritten again) and T11 itself. |
| B3 | **CLOSED run 2 by `tech-lead`** — raised by frontend-dev (G5, T1, run 1) | `pnpm build` on Next.js 16.3.5 prints no "First Load JS" figure and no shared-chunk line for any route — confirmed against `node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`: *"Next.js 16 removes the `size` and `First Load JS` metrics from the `next build` output... found these to be inaccurate in server-driven architectures using React Server Components."* T1 step 1 names this exact figure as the AC10 baseline and T11 step 1 names it again as the after-measurement; T3's done-when also cites the same ≤10 kB gzipped budget. There is no command that reproduces the named metric on this Next version, and every substitute (a bundle-analyzer plugin, summing `.next/static/chunks` byte sizes, `next build --profile`, etc.) is a measurement methodology `plan.md` does not specify — inventing one is deciding the acceptance test for a numeric threshold, which is exactly what `frontend-dev` may not do. Raised instead of guessed. See `evidence/baseline.md` § 1 for the full build output. **Blocks:** T1's own done-when (all three recordings), and therefore T2 (`depends on: T1`) and everything after it; also blocks T3's and T11's byte-budget checks, i.e. AC10 as a whole. **Needs from `tech-lead`:** either an alternate, exactly-specified method and threshold for AC10 on this Next version, or a ruling that AC10's route-JS half is unmeasurable and should be dropped/replaced, recorded in an amendment. |
| B4 | **CLOSED run 2 by `tech-lead`** — raised by frontend-dev (G5, T1, run 1) | T1 step 3 requires `node .agents/tools/preview.mjs --out .../evidence/before`, which is the repo's own tool and the one `qa`/`audit`/`recruiter` gates also rely on for axe-core evidence. It fails immediately: `Error [ERR_MODULE_NOT_FOUND]: Cannot find package '@axe-core/playwright'`. That package is absent from `package.json`, absent from `pnpm-lock.yaml`, and absent from `node_modules`; `pnpm install --frozen-lockfile` returns `ok` with no changes, so the lockfile is not merely stale — the dependency was never added. `AGENTS.md` §8 forbids a new dependency without a written justification in `plan.md`, and none exists for `@axe-core/playwright`. This is a pre-existing tooling gap (the script was added in commit `366310b`, "vendor the agent skills the squad depends on" era, without its own dependency), not something any 0002 task introduces. **Blocks:** T1's own done-when and, downstream, T11 step 3 (the after-measurement uses the same tool) and AC12/AC13, which `web-standards-auditor` reads from its output. **Needs from `tech-lead`:** either authorize adding `@axe-core/playwright` (and any peer it needs) as a devDependency with that written in `plan.md`, or name a different axe-core invocation already available in this tree. |

| B1 | **CLOSED run 2 — verified by labor-law-analyst** — labor-law-analyst (G2, run 1) | The four `alt` strings and the JSON-LD `name` claim `"banco de horas"`. The app computes a **single-day** saldo (`day-summary.tsx:113,172`); there is no accumulation, no compensation window, no pactuação — none of what CLT art. 59 §§2º, 5º e 6º makes a banco de horas. `PRODUCT.md` §9 does not back the claim, and the spec's own disclosure obligation (LD5, LD6) says these strings may claim only what §9 backs. The remedy is not punctuation and `content-writer` cannot take it: it reaches four strings the spec does not list (`app/page.tsx:6`, `app/page.tsx:11`, `lib/og-image.tsx:14`, `lib/calculator-view.ts:9`) and `VIEW_HEADINGS.work` is a visible heading and the primary SEO term. **`product-manager` must choose**: drop the claim, rename it to what the code does (saldo diário), build the accumulation, or route to the human to accept the imprecision in writing under `AGENTS.md` §4 rule 8. See `legal.md` §1. |
| F1 | **CLOSED run 2 as LD11 / rule S10 — verified by labor-law-analyst** — labor-law-analyst (G2, run 1) | `lib/payroll.ts:24` calls R$ 8.475,55 the *"teto de contribuição"*. It is the teto do **salário** de contribuição; the teto da contribuição is R$ 988,09, named four words later in the same sentence (Portaria Interministerial MPS/MF nº 13/2026, art. 2º). Not a blocker on its own — the string is already being rewritten under S1/LD8. `tech-lead` folded it into this spec at triage: **`product-manager` names it in the scope table**, `content-writer` writes it at G4 against S1. Changes no number; LD7 and AC15 untouched. |
| F5 | **OPEN** — labor-law-analyst (G6, run 1) | `PRODUCT.md` §9's new Evidence row cites only `components/organisms/day-summary.tsx`, a **render** site that receives `balanceMinutes` as a prop and cannot demonstrate the single-day scope on its own. `legal.md` §14.5 made it **binding** that the cell also cite `hooks/use-work-calculator.ts:67` — `balance: breakdown.workedMinutes - breakdown.expectedMinutes` — which is the line that proves it. §9 is the register that authorises every claim in the UI and the README, and this is the row holding down a claim this spec just retired; an evidence column pointing at a display is one refactor away from pointing at nothing. **One-line edit, `product-manager`, routed via `tech-lead`.** Does not withhold G6: the claim is true and backed, and no user-visible number or string is wrong. Should close before the spec closes. |
| F6 | **OPEN** — labor-law-analyst (G6, run 1) | Two S9 obligations are correct today but unguarded, so they hold *by reading* rather than *by construction*: (a) `__tests__/copy-guards.test.ts:34-41` omits a bare `ponto` from the banned-term regex — `registro/controle/folha/espelho de ponto` are caught, a naked `ponto` in a future descriptor is not, and disclosure D3 makes that the sharpest contradiction available; (b) S9.4's "C5 is a strict subset of C3/C4" is not asserted, so `lib/og-image.tsx:14` could broaden later without failing a test. Both verified by hand at this gate and both passing. **`qa-engineer` / `tech-lead`, follow-up.** Not a reject. |

### B6 — ruling (G5 run 5, `tech-lead`): AC7 passes, the e2e finding is withdrawn, the font warning is measured

Full reasoning and the arithmetic: `plan.md § Amendment — G5 run 5 (B6)`. Three items, three
destinations, one round trip (`AGENTS.md` §4 rule 4).

| # | Item | Destination | Ruling |
|---|---|---|---|
| 1 | AC7 clause (b) misses on `/` at n=9 | **nobody — AC7 passes as written** | Verified against `evidence/after.md` §2, the run set AC7's own verification cell names. 6 of 6 clauses pass on both routes. A **finding** (not a restatement request) goes to `product-manager` for `0004`: clause (b)'s threshold statistic grows with n. |
| 2 | `playwright.config.ts` reuses a foreign server | **frontend-dev — new T13**, this spec | One line, config only. Same class as the B3/B4 tooling repairs this spec already absorbed. `evidence/after.md` §6 is rewritten: the withdrawn finding must not survive into `qa` and `release`. |
| 3 | `next/font` fallback warning | **nobody — settled by measurement**; recorded as T11 step 7 | CLS 0.000 / 0.0011 across all nine runs on the shipped build. Not routed to `product-designer`: the instrument answered the question the design decision would have been asked to answer. |

**1. AC7 — the verdict is pass, and here is why that is not picking the friendly run set.**

AC7's verification cell, written by `product-manager` at run 4 **after** §2b was already ordered,
names `NEXT_PUBLIC_ENABLE_ADS=false pnpm exec lhci autorun` with no `--collect.numberOfRuns` and
points at **`evidence/after.md` §2**. That is the three-run default set, and against it:

| Route | (a) | (b) | (c) |
|---|---|---|---|
| `/` | 2531.406 < 2687.232 **pass** | 155.826 > 106.528 **pass** | 2636.296 < 2687.232 **pass** |
| `/custo-da-hora` | 2537.612 < 2769.030 **pass** | 231.418 > 93.394 **pass** | 2623.128 < 2769.030 **pass** |

Clause (b) compares an improvement against **range** (max − min). The expected range of nine
draws is strictly larger than that of three draws from the same distribution — range is not
comparable across sample sizes. Reading the nine-run range against a clause calibrated on the
three-run default is not a stricter test of the same thing; it is a bar that moved for a reason
unrelated to the change. Clause (b) is decidable only at a fixed n, and the criterion fixes n
in its own command.

The nine-run set is not thereby dismissed — on the clause that is **not** n-fragile it is
stronger: on `/`, **all nine** after-runs sit below the baseline median (clause (c)), which under
a null of no change has probability 2⁻⁹ ≈ 0.2%. §2 and §2b agree the page got faster; they
disagree only about a proxy statistic. §2b was ordered at run 4 explicitly as evidence with no
stop condition and no code change following from it, for the AC7 decision and for `0004` — and
its real payload stands: Load Delay and Load Time are exactly 0 on all 18 runs, render delay is
82–83%, and **0 of 18 runs reach 2,500 ms**. That travels to `.specs/0004-lcp-render-delay/`.

**AC7's text is not touched.** It was restated once this cycle, it passes as restated, and a
second restatement under blocker pressure is how a criterion stops binding anything.

**2. The e2e failures were never real, and the wrong conclusion is the more expensive defect.**

`playwright.config.ts:52` sets `reuseExistingServer: !process.env.CI`. A dev server left running
by another agent — started without `NEXT_PUBLIC_ENABLE_ADS` — was reused by every local run, and
because Next inlines `NEXT_PUBLIC_*`, the ad markup was never in the page. 21 failures across 7
titles, all of them the suite blaming the application for the machine. With the port free and the
env set: **43 passed, 0 failed.**

The worktree probe reproduced the failures at `366eab5` because it hit **the same dirty server
from both ends**. The method was sound and its isolation boundary was not: a `git worktree`
isolates the **files**; a fixed port is shared state no worktree copies. `AGENTS.md` §4 rule 6 is
written about the shared working **tree** and does not name this case — it is the same hazard one
layer out. Lesson **013** records it; if it confirms twice more it belongs in rule 6 itself, which
is a G10 promotion, not a G5 edit.

Fixed here as **T13**, not deferred: one line in a config file, it produced a false finding inside
this spec's own G5 evidence, and it is the same class of tooling repair B3/B4 already put in T1.
The fix is refusal (`reuseExistingServer: false`), not env comparison — Playwright then aborts
before the first test with `http://localhost:3000 is already used`, which names the cause in the
first line of output instead of after a bisect. T13's second check requires reproducing exactly
that abort with a foreign server on the port.

`evidence/after.md` §6 is **rewritten, not annotated**. A withdrawn finding left in an evidence
file is a finding `qa-engineer` and `release-manager` will carry forward.

**3. The `next/font` fallback warning is real and its consequence is measured at 0.0011.**

`next/font` could not compute override metrics for Atkinson Hyperlegible Next, so no `size-adjust`
fallback face is generated — the mechanism that keeps a webfont swap from shifting layout, on a
spec that swapped the webfont. Fair question, already answered by the nine-run set:

| Route | CLS, all 9 runs |
|---|---|
| `/` | 0.0011 |
| `/custo-da-hora` | **0.000** |

The mechanism is absent, not merely small: the face is self-hosted, preloaded by `next/font`,
finishes at 65 ms against FCP 766 ms, and `font-display` scores 1 — the fallback is never painted,
so there is no swap to shift. ~1% of the 0.1 threshold, on the throttled mobile preset, the
adverse case.

**Not routed to `product-designer`.** The family choice and the fallback stack would be theirs if
the measurement showed a cost; it shows none on the shipped artefact, and sending a settled
question back to a closed gate spends a round trip to re-decide what the instrument decided.
What is owed is the record, so the next agent meeting this warning does not re-derive it: **T11
step 7** pastes the warning verbatim, the CLS column and the `font-display` score into
`evidence/after.md` §7, with the line that says when the warning becomes live again — if the font
ever arrives after first paint, this same column is the check.

**Routed to `product-manager` (finding, no action required in `0002`):** clause (b) of AC7 names a
sample-size-dependent statistic. Any spec re-using this criterion — `0004` first — must fix n in
the criterion or use a dispersion statistic that does not grow with n, or state it as a sign test
over the runs, which is what clause (c) already is and the strongest result this instrument gave.

### B5 — ruling (G5 run 4, `tech-lead`): the gap is real in sign, it is not the font, and AC7's wording goes to `product-manager`

Full reasoning and the raw phase figures are in `plan.md § Amendment — G5 run 4 (B5)`. Summary:

**1. Is 31 ms real or noise?** **Real in sign, unresolvable in magnitude, and the distinction does
not change the ruling.** The after-runs on `/` spread 2529.8 / 2531.4 / 2636.3 — a ~106 ms spread,
matched by the T1 baseline's ~109 ms. A 31 ms difference at n=3 with a 106 ms spread is inside the
instrument's own noise and no median at that n resolves it. What *is* outside noise: **all six
after-runs, across both routes, exceed 2500 ms**, minimum observed 2529.7 ms. Direction is
consistent; magnitude is not measurable. AC7 as written therefore fails. What would make it
conclusive: **n = 9 on a quiet machine, reported as median plus min/max plus the count at or under
target** — ordered as T11 step 2b, precisely because a criterion this tight deserves a spread
rather than a point. Note also that the improvement itself (−155.8 ms, −231.4 ms) *is* larger than
the spread, so the work demonstrably moved the number.

**2. Where does the gap come from?** Not the font, and the instrument says so rather than me. From
the median run's own report (`.lighthouseci/lhr-1789425054885.json`), LCP phases on `/`:
**TTFB 454 · Load Delay 0 · Load Time 0 · Render Delay 2076**. `/custo-da-hora`: 455 / 0 / 0 /
2074. **Load Delay and Load Time are zero on all six runs** — no resource of any kind sits between
the LCP candidate and its paint. The shipped Atkinson woff2 is **34,024 bytes, finished at 65 ms**,
2,465 ms before the LCP timestamp; `font-display` scores 1; FCP is 766 ms.

`design.md` §5.3 predicted the font swap's direction could be "downward" or "neutral". The measured
answer is the second one, sharply: the font helped the *page weight* (−38 kB, and route JS shrank
1,472 bytes too) but contributes **zero milliseconds** to the LCP phase breakdown. The remaining
cost is entirely **render delay** — the hero numeral (`hero-panel.tsx:43`,
`<p aria-live="polite" class="numeric …">`) paints `--:--` at FCP and then mutates to the real
value after hydration, re-registering the LCP candidate at the mutation. That is `design.md` §5.1
cause **2**, *"the value itself is client-gated"* — the one cause §5.2 never put on the "what may
change" table.

**3. `spec.md` R3 was never triggered.** R3 reads *"if the chosen family **pushes LCP up**, it is
disqualified"*. LCP went **down** on both routes by more than the run spread. The §2.6 Asap
fallback is therefore **not reachable**, and ordering it would change a resource carrying 0 ms of
the budget while reopening T2, T5, T10 and T11 and re-exposing AC5, AC6, AC13 and AC14. **High
cost, zero predicted benefit, read off the instrument. Rejected. Atkinson ships.** The stop
condition in T11 step 2 was mis-drafted by me: it fused a font verdict (R3) with a page verdict
(AC7) into one branch and so aimed a font remedy at an AC7 miss. Lesson 010.

**4. The options, with cost.**

| | Option | Cost | Predicted LCP effect |
|---|---|---|---|
| O1 | Swap to Asap (`design.md` §2.6) | Reopens T2, T5, T10, T11; re-tunes nine type roles; re-runs AC5, AC6, AC13, AC14 | **~0 ms.** Targets Load Time, which measures 0 ms |
| O2 | Another lever inside the plan's allowance | — | **None exists.** L1, L2 and L3 are all spent in T4 and bought 156–231 ms. Nothing remaining targets render delay |
| O3 | Server-render the hero's first value, or drop the placeholder-to-value mutation | Rendering-architecture change | Would move it — but `spec.md` puts a redesign out of scope, and the value depends on `localStorage` and the current time, so it is a behaviour change, not a refactor. **Follow-up spec** |
| O4 | Drop `aria-live` from the hero | — | Trades AC12 for AC7. **Not available** |
| O5 | Restate AC7 | `product-manager`'s call | **Routed. See below** |

**5. What is ordered.** Nothing in application code. `plan.md` T11 gains **step 2b** (nine-run LCP
variance with the phase breakdown, `lhci autorun --collect.numberOfRuns=9`, **no stop condition and
no code change may follow from it**), and steps 3–6 run immediately after it against Atkinson —
they were blocked only on the family, and the family is settled. T11 closes when `evidence/after.md`
holds §§1, 2, 2b and 3–6 with their dates and commands, and `pnpm check`, `pnpm build`, `pnpm e2e`
and `node .agents/tools/docs-check.mjs 0002-design-taste-preflight` are clean. **G6 may start on
that evidence**; the only AC still open at that point is AC7's *verdict*, which is O5's to settle
and which `release-manager` cannot transcribe until it is.

### Routed to `product-manager` (G5 run 4) — restate AC7, or accept the miss in writing

**RULED at run 4 by `product-manager`: option (b), with the absolute target relocated rather than
retired, and clause (b) of (c) folded in. See § *Ruled by `product-manager` (G5 run 4)* below.**

I am not softening this criterion, so it goes back to its owner with the measurement attached.

**What AC7 says today:** *"LCP on mobile is under 2.5s, **measured**, on the route that answers
question 1 of `PRODUCT.md` §1"*, verified by *"Lighthouse mobile run against the built app"*.

**Why it may be the wrong criterion, on evidence and not on convenience:**

1. It reads a **lab-simulated** number against the 2.5 s threshold, which Core Web Vitals defines
   as a **field p75**. Lighthouse's simulated mobile throttling on a developer machine carries
   run-to-run variance (~106 ms here) that is **more than three times the margin being judged**.
   A criterion cannot be decided at a precision finer than its instrument.
2. It was imported from the `design-taste-frontend` skill, which targets **marketing pages**, where
   the LCP element is server-rendered content and the levers are fonts, images and blocking CSS.
   Here the LCP element is a **client-computed live value**: render delay is 2,076 of 2,530 ms and
   resource load time is **0**. The criterion is aimed at a phase this page does not spend time in.
3. As scoped, AC7 is **only satisfiable by work the same spec forbids.** Every permitted lever is
   spent; what remains is the rendering change `spec.md` puts out of scope and the dependency it
   prohibits. That makes AC7 unverifiable-as-scoped, which is a `product-manager` finding by
   `AGENTS.md` §4 routing, not a bend of the plan.

**The decision I am asking for — one of three, in writing, as a `spec.md` amendment:**

- **(a) Keep AC7 absolute at 2500 ms lab-median.** Then this spec cannot close, and the rendering
  change (O3) must be brought into scope with its own design and legal pass, or the spec ships
  with AC7 failed and recorded.
- **(b) Restate AC7 as relative, and hand the absolute target to a follow-up spec.** *"LCP on
  mobile improves against the AC8 baseline on both routes, and no run regresses"* — met today at
  −155.8 ms and −231.4 ms, with all six runs improved. A new spec then owns the client-gated hero
  and the absolute 2.5 s. **This is my recommendation**: it keeps the criterion measured and
  falsifiable, it matches what this spec's scope can actually move, and it does not retire the
  2.5 s goal, it relocates it to the spec that can reach it.
- **(c) Restate AC7 against a field-realistic instrument**, naming it explicitly — p75 CrUX/field
  data, or a lab median with a stated tolerance band wide enough to exceed the tool's variance.
  If this is chosen, **name the instrument and the command**, per lesson 009.

Whichever is chosen, AC8 is unaffected and already discharged: the before/after pair exists, with
dates and commands, in `evidence/baseline.md` §2 and `evidence/after.md` §2.

**This does not block T11.** Steps 2b and 3–6 run now.

### B2 — `legal.md` S10.3 and `copy.md` §5 disagree about `lib/payroll.ts:32` (raised G4, run 1, tech-lead)

| | |
|---|---|
| **Raised by** | `tech-lead` at G4, re-grepping `lib/` for S10.3 rather than trusting either artefact (lesson 001) |
| **What** | `legal.md` **S10.3** is binding and states that *"teto do INSS"* — "the same collapse in colloquial dress" — must not appear **anywhere in `lib/`**. `copy.md` §5 marks `lib/payroll.ts:31` **inalterada**, "não tem travessão, fora de escopo". The phrase is in fact at **`lib/payroll.ts:32`**, in the `estatutario` `impact`: *"a contribuição não para no **teto do INSS** e as faixas seguem subindo até 22%…"*. It carries no em-dash and no retired claim, so neither `spec.md` scope list reaches it — but S10.3 does. |
| **Why it is not cosmetic** | After T6 the same `RegimeField` disclosure reads *"o teto do salário de contribuição"* for CLT and *"o teto do INSS"* for estatutário: two names, one figure, one screen apart. That is exactly the collapse S10 exists to remove, and a reader who takes the second literally is told their INSS ceiling is a discount. |
| **Why `tech-lead` did not settle it** | The wording is `content-writer`'s and the scope is `product-manager`'s. `AGENTS.md` §4 rule 8 decides which artefact wins — `labor-law-analyst` is not overruled by scope or schedule, so S10.3 stands — but neither the sentence nor the scope row is mine to write. Deciding it here would be re-opening two closed gates. |
| **Routed to** | **`product-manager`** — name `lib/payroll.ts:32` in the scope table and add the AC, exactly as F1 was folded in at run 1; then **`content-writer`** writes the replacement clause against S10.3. One amendment, one round trip (`AGENTS.md` §4 rule 4). No number moves, no interpolation is added, `lib/legal-tables.ts` is untouched: LD7 and AC15 are unaffected, which is the same boundary that let B1 and F1 in and keeps F3/F4 out. |
| **Blocks** | **T12 only.** T1 through T11 are independent of it and G5 starts now. |
| **State** | **CLOSED at run 3 by `product-manager` — absorbed into 0002, not routed to `0003`.** The scope table was wrong, the rule was not. `spec.md` § Scope now names `lib/payroll.ts:32` by path and line, § F1 records the three reasons in full, and **AC25** / **AC26** make it checkable. `content-writer` writes the clause; `frontend-dev` then runs T12 as an ordinary task. |

## Bounce triage — G6 run 1 (tech-lead): two criticals, one destination

All four G6 reviewers passed. This is a routing of findings, not a rejection, and it consumes no
bounce (`AGENTS.md` §4): **G6 closes at zero bounces of two.** All four reports were read together
before routing — one round trip, per rule 4.

| Finding | Confirmed | Destination | Why not here |
|---|---|---|---|
| audit Critical #2 — the 64px legal disclosure (`max-w-3xl` resolving against `--spacing-3xl`) | **Yes, independently.** I compiled Tailwind 4.3.3 against a minimal `@theme`: `--spacing-<name>` beats `--container-<name>` even when the container key is declared | **`0005`** | Introduced by PR **#35** (`feat/design-system`), four branches below this one. Not in this spec's diff, not on `main`, and the remedy touches ~204 utility strings across every component — a scope this spec never had |
| audit Critical #1 — React #418 under a dark system theme, production build only | Auditor's reproduction accepted; cause **not** ruled. Prime suspect `components/organisms/app-header.tsx:66`, identical on `main` | **`0005`** | Same: pre-existing, outside the diff, and its real deliverable is a CI reproduction path, not a one-line edit |
| audit Minor — `twitter` metadata diverges from OG/JSON-LD | Yes | **`0003`** (citation registry, already holds the metadata-consistency findings) | Not urgent, not this spec's |

Both criticals go to **one** spec, not two, because they are the same failure wearing two faces:
every check this squad runs looks at `next dev`, at light mode, or at a screenshot nobody measures.
The fix for each defect is a check that would have caught the other.

### Why `0002` proceeds to G7 rather than waiting

Holding a complete spec hostage to defects it did not cause buys nothing: the work is done, four
gates passed it, and its branch is the base `0005` needs to sit on. What must not happen is the
**merge**, and that is a `release-manager` instruction, not a gate state. Recorded in the header and
in the decisions log so it cannot be read as ordinary.

### The finding underneath both findings

A rendered-width regression is invisible to every check in this repo. `responsive.spec.ts` bounds
layout on one side only — it forbids overflow and says nothing about collapse. Lighthouse scored
this page **1.0 on accessibility, twelve times**, over a legally required disclosure rendering one
word per line. The gap is closed in `0005` with a two-sided bound in the e2e suite; lesson **016**
records the pattern.

### Lessons written before moving on

- **016** — bound a layout assertion on both sides; a suite that only forbids overflow cannot see an
  element that collapses inward.
- **017** — verify a framework's token-resolution order by compiling it, not by reading the docs or
  the defect: the obvious remedy for this collision (declare the missing scale) is the one the
  compiler proves does not work.

## Bounce triage — G2 run 1 (tech-lead)

One destination: **product-manager**, one amendment, one round trip. `labor-law-analyst`
is not overruled on any point (`AGENTS.md` §4 rule 8), and nothing here is a `content-writer`
item: the words are still theirs at G4, the *claims* are not.

| # | From | Destination | Ruling |
|---|---|---|---|
| B1 | `legal.md` §1 | **product-manager** (G1 amendment) | Agreed with the analyst. Scope/claim call, not architecture. |
| F1 | `legal.md` §7 | **product-manager** (same amendment) | Folded into this spec. |
| F2, F3, F4, F5 | `legal.md` §6.2, §7 | **spec 0003** (`.specs/0003-citation-registry/`), holder `product-manager` | Deferred, recorded outside this spec. |

### B1 — who owns it, and why the spec widens

**Owner: `product-manager`.** The analyst is right and the reasoning is not close. B1 asks
whether WorkLoad promises a named legal instrument it does not implement. That is a claim
question — `PRODUCT.md` §9 decides which claims exist, and only its owner may add one or
retire one. `content-writer` writes wording against a claim already permitted; it cannot
grant the permission. `product-designer` does not touch metadata claims. I will not settle
it either: deciding it myself would be re-opening scope, which is exactly what this role is
forbidden from (`AGENTS.md` §4).

**This spec widens, and it has no alternative.** The honest version of the argument:

- **The spec cannot close without it.** AC1 requires zero user-visible em-dashes across
  `app/**`, `components/**` and `lib/**`, and AC2 requires all eleven occurrences resolved.
  Two of the eleven are the root `alt` strings the analyst froze. Leaving B1 out leaves the
  spec unable to pass its own acceptance criteria — the choice is not "widen or ship
  narrow", it is "widen or rewrite the ACs to exempt the two strings", and exempting them
  means the em-dash sweep stops precisely where a false claim sits.
- **A rewrite re-publishes the claim** (lesson 002, written by `product-manager` this very
  cycle, from this very block). Carrying "banco de horas" through a punctuation pass signed
  by four agents is strictly worse than leaving the string alone, because it converts a
  stale defect into a freshly reviewed one.
- **The widening is bounded and mechanical.** One noun phrase, six locations, verifiable by
  one grep — `grep -rni "banco de horas" app components lib` returns nothing (or only what
  a documented §4-rule-8 acceptance permits). A spec that absorbs every finding stops being
  reviewable; this is not that. It adds no file the spec did not already reach except
  `app/page.tsx` and `lib/og-image.tsx`, and it adds no computed value, no legal table and
  no new module.
- **The keyword is the SEO term the `fix/standards` work just built.** That argues for
  fixing it now, not for keeping it: indexing a false claim harder is not a reason to leave
  it indexed.

**Full claim surface — six locations, larger than the four `legal.md` §1 names.** Re-run at
triage rather than trusted from the report (lesson 001):

```
app/page.tsx:6                  title.absolute
app/page.tsx:11                 openGraph.title
app/opengraph-image.tsx:3       alt          (in the eleven)
app/twitter-image.tsx:3         alt          (in the eleven)
lib/og-image.tsx:14             OG_CONTENT.work.title
lib/calculator-view.ts:9        VIEW_HEADINGS.work  (heading + JSON-LD name, in the eleven)
```

**What `product-manager` must do.** Amend `spec.md` — scope table, out-of-scope list and
ACs — to cover the claim surface above, and choose between the analyst's options 1, 2 and 3.
Two constraints on that choice, both structural rather than editorial:

1. **Option 3 (build the accumulation) is not available to spec 0002.** Its own Out of scope
   forbids changing what the calculator computes, and a compensation regime is a feature with
   a period, an accrual and a pactuação — a spec of its own. If the product wants banco de
   horas, open that spec; the claim still comes down in 0002 until the feature ships, because
   a claim cannot be indexed on the promise of a future build.
2. **Name the claim, not the wording.** Decide whether the descriptor is dropped or replaced
   by what the code backs (the app computes a single day's saldo). The pt-BR strings remain
   `content-writer`'s at G4, against the analyst's S7/S8 and whatever §9 then permits. If
   `PRODUCT.md` §9 gains or loses a row, edit §9 in the same amendment — a spec that relies
   on a claim table it did not update leaves the next spec re-deriving this.
3. If the human accepts the imprecision instead (option 3 of `legal.md` §1, `AGENTS.md` §4
   rule 8), it is recorded in `spec.md` with the norm (CLT art. 59 §2º), the gap, who
   accepted and why. Only the human. Not me, not `product-manager`.

### F1 — folded in, not creep

`lib/payroll.ts:24` calls R$ 8.475,55 the *"teto de contribuição"*; it is the teto do
**salário** de contribuição, and R$ 988,09 — four words later in the same sentence — is the
actual teto da contribuição. **Accepted into this spec.**

It costs one clause in a string that S1 already rewrites, under LD8, which this spec itself
raised. The analyst has already written the replacement phrase and the norm
(Portaria Interministerial MPS/MF nº 13/2026, art. 2º), so `content-writer` invents no law.
Deferring it means a G4 agent re-punctuating a sentence that mislabels a legal figure, and
four agents signing it — lesson 002 again, in the direction that says a backed correction is
cheapest exactly while the string is open. `product-manager` names it in the scope table so
it is checkable; it does not change a number, so LD7 and AC15 are untouched.

### F3, F4 — confirmed for the next spec, and recorded so they survive

Confirmed, not overruled. The line is not "how bad is it" — F3 and F4 are major and the
analyst is right that they sit in the one line whose whole job is `PRODUCT.md` §4. The line
is **what the fix touches**: both require `lib/legal-tables.ts`, and 0002's Out of scope bars
that file precisely because it is the guard (LD7) that a typography pass never becomes a
calculation pass. B1 and F1 clear that bar — no table, no computed value, metadata and display
prose only. F3 and F4 do not. That is the principled boundary between the two widenings, and
it is why "fold in what is already open" does not extend to them.

Recorded where it survives this cycle: **`.specs/0003-citation-registry/`** is opened as a
`draft` holding F2, F3, F4 and F5, indexed in `.specs/INDEX.md`, holder `product-manager`.
Per the analyst's §7, it should be scheduled **ahead of any further cosmetic work**. F2 (the
DSR base includes `nightPay` but the caption cites only Súmula 172) and F5 (the `7,5% a 14%`
span is hand-typed and will go stale) were routed to `tech-lead` and go to the same spec:
F2 changes a citation's content, which `content-writer` may not invent at G4, and F5 is the
same one-file-diff concern as F4.

## Amendment — G1 run 2 (product-manager)

`spec.md` re-issued. Two additions, nothing else touched.

**B1 — the claim is dropped.** Of the analyst's three options, option 1 (remove the claim).
Option 2 (rename around it) launders an unbacked claim through a punctuation pass — lesson
002, written from this very block. Option 3 (build it) was closed by `tech-lead` at triage
and is closed twice over by `PRODUCT.md` §7, which refuses the stored month of records a
banco de horas needs. Option 4 (human acceptance) is the human's alone and nobody asked for
it. What replaces it is a **permission, not wording**: the `work` descriptor may name the
day's jornada, horas extras, adicional noturno and the saldo **do dia**; `content-writer`
writes the pt-BR at G4 against S7/S8.

**The surface is seven, not six.** Re-grepped rather than trusted from the triage (lesson
001). The seventh is `__tests__/app-header.test.tsx:12`, `__tests__/page.test.tsx:33,38` and
`__tests__/calculator-page.test.tsx:39`, which hard-code the four strings and fail the build
if the rewrite ignores them. `lib/structured-data.ts:27` is explicitly **not** a location: it
interpolates `VIEW_HEADINGS.work` and inherits the correction; an edit there is a defect.

**`PRODUCT.md` §9 edited in the same amendment**, as `tech-lead` required: one row added for
the single-day computation, and a new "Explicit non-claims" block recording banco de horas
with the §7 collision that keeps it retired. The claim table now answers this without the
next spec reading a rejected `legal.md`.

**SEO cost accepted, not solved.** Five indexed surfaces lose a high-volume keyword and
nothing here recovers it. Recovery is out of scope; improvising it inside a typography pass
is the creep R5 names.

**New acceptance criteria AC19–AC24**, all grep-checkable the way AC1 checks the em-dashes.

## Gate G2 — run 2 verdict (labor-law-analyst)

**pass.** Scope of the re-run was LD10 and LD11 only; §§4, 5 and 6 of `legal.md` were not
re-litigated and did not change. G3 starts.

**LD10 — the removal surface is exactly C1–C7.** Re-grepped repo-wide and case-insensitive from
the working tree rather than trusted from the amendment (lesson 001). Nothing missing, nothing
spurious. Three negative results recorded so they are not re-checked: `app/manifest.ts` does not
carry the claim (its `name` and `description` already sit inside the permission and it must
**not** be edited), and neither do `app/layout.tsx`, `sitemap.ts`, `robots.ts`, `public/**` or
`README.md`. `lib/structured-data.ts:27` confirmed **out** — it interpolates C6.

**LD10 — the replacement descriptor is backed, with two narrowings.** Each of the four permitted
items was checked against the module that computes it: `lib/day-breakdown.ts` (jornada, horas
extras), `lib/night-shift.ts` (adicional noturno), `hooks/use-work-calculator.ts:67` (saldo do
dia). Nothing overstates what ships. The narrowings are **S9.1** and **S9.2** below.

**LD11 — the binding rewrite rule is S10**, and it applies *together with* S1, not instead of it.
R$ 8.475,55 is the **teto do salário de contribuição**; the term must appear in that order,
immediately governing the interpolated figure, and "teto de contribuição" (and "teto do INSS")
must not appear anywhere in `lib/`. Figure and base year kept and interpolated; no number moves.

**Both primary sources were read verbatim in this session**, discharging two run-1 verification
notes. planalto.gov.br answered this time (CLT art. 59 *caput* and §§2º, 5º e 6º). The Portaria
Interministerial MPS/MF nº 13/2026 was read in full from the **DOU permalink**, which is
machine-readable where the gov.br PDF is a scan — arts. 2º and 7º and Anexos II and III match
`lib/legal-tables.ts` bracket by bracket, to the centavo.

### Two narrowings the spec did not make

| # | Rule | Why |
|---|---|---|
| S9.1 | Wherever `saldo` appears in a `work` descriptor it must be **immediately** followed by `do dia`, `diário` or `de hoje`. | AC21's grep bars `saldo do mês`, `acúmulo` and `banco`, but a bare **"saldo de horas"** passes it — and that is the everyday synonym of the claim just retired. A day scope stated earlier in the string does not count: a SERP title is read from its last noun phrase. |
| S9.2 | `adicional noturno` may be named, never qualified as complete (`completo`, `todas as regras da CLT`, …), and a descriptor may not name `Súmula 60` or `prorrogação`. | `lib/night-shift.ts` implements CLT art. 73 *caput*, §1º and §2º but **not** the prorrogação após as 5h (§5º; Súmula 60, II do TST). That gap is disclosed at `calculator-views.tsx:83-88`, which is what makes naming the adicional compliant under `PRODUCT.md` §4 — so the permission is **tied** to that clause surviving, and S4 already freezes it. |

### Two corrections that do not bounce the gate

| # | Correction | Owner |
|---|---|---|
| 1 | `PRODUCT.md` §9, the new Evidence row, cites `day-summary.tsx` — the **render** site. The line that **proves** the single-day scope is `hooks/use-work-calculator.ts:67` (`workedMinutes - expectedMinutes`, no accumulator). Cite both. The row's claim is otherwise accurate and the non-claim row needs nothing. | `product-manager` |
| 2 | AC22 diffs C3, C4 and C6 but omits **C5** (`lib/og-image.tsx:14`), which is rendered into the OG bitmap that C3/C4 describe. Add it as a permitted **subset** of C3/C4 — it may drop an item, never broaden one. If length forces a cut, cut the whole `saldo` item, never the words `do dia`. | `product-manager` / `tech-lead` |

Neither blocks G3. If neither is made, G6 checks both from `legal.md` and the finding lands there.

## Bounce triage — G5 run 1 (tech-lead): B3 and B4

**Not a bounce.** `frontend-dev` rejected nothing and produced nothing to reject: it reached the
first task, found that two of its three steps named a command that cannot run in this repository,
and escalated instead of choosing a substitute. Both defects are in `plan.md`, and both are mine.
The two-bounce ceiling on G5 is untouched. **One destination: `tech-lead`, self-amended, one round
trip.** Nothing was routed to `frontend-dev` as a defect, because there was no implementation to
defect.

| # | Cause | Destination | Ruling |
|---|---|---|---|
| B3 | `plan.md` T1/T3/T11 named the `First Load JS` line that Next 16 removed | **tech-lead** (self, plan amendment) | AC10's *quantity* and *threshold* are intact; only the reading instruction was broken. Replaced with a committed tool. **Not** routed to `product-manager`: restating a criterion that still means exactly what it meant would be re-opening scope for no gain. One **non-blocking** correction routed to `product-manager`: AC10's verification cell still names `pnpm build`. |
| B4 | `.agents/tools/preview.mjs` imports two packages that do not resolve here, and has never run in this repo | **tech-lead** (self, plan amendment) | `@axe-core/playwright@^4.13.0` added as a `devDependency` with the written justification `AGENTS.md` §8 requires; the driver import fixed to `@playwright/test`, already installed; the vendored dialog loop deleted. Also routed: one finding to **`.specs/0003-citation-registry/`** (WorkLoad's two real dialogs need a proper audit) and one to **`product-manager`** (`.specs/0001-foundation` **AC18** was closed on a command that has never executed). |

### B3 — the resolution, in one paragraph

**AC10 stands; the method is now a tool.** What "First Load JS" counted is the gzipped weight of
the script `src` set in the route's pre-rendered HTML, and that is still directly readable from
`.next/`. `.agents/tools/route-js.mjs` (created in T1 step 0, source given verbatim in `plan.md`)
reads `.next/server/app/<route>.html`, de-duplicates the `/_next/static/**.js` tags, **excludes
the one `noModule` tag** (the legacy polyfill bundle, 39,520 gzipped bytes, which no modern
browser fetches and which would inflate the total by 17%), and prints per-chunk and total gzipped
bytes at a pinned `level: 9`. Two candidates were checked and rejected in writing:
`.next/app-build-manifest.json` **does not exist** under Next 16 with Turbopack and
`.next/build-manifest.json` carries only `rootMainFiles`, a subset of what the route requests;
and summing `.next/static/chunks/` counts chunks the route never loads plus the CSS. **Baseline
measured at this gate on commit `366eab5`: `/` = 228,446 gzipped bytes (223.09 kB) over 9
chunks, `custo-da-hora` byte-identical** — this app ships one client graph for both routes, which
also means the icon-library delta lands equally on both. The figure is written into the task so a
broken measurement is distinguishable from a real delta on the first run. AC10's budget is
restated in the same unit as the tool prints: **≤ 10,240 gzipped bytes of growth on `/`**.

### B4 — the resolution, and the three things that were weighed

**Does `spec.md`'s dependency prohibition reach it? No.** That prohibition is written against
fixing LCP with a package; `plan.md` already records that all three LCP terms are deletions.
`@axe-core/playwright` is a `devDependency` with zero production bytes and no presence in any
client graph — it cannot move the very figure B3 just specified how to measure. Reading it
otherwise would disqualify `@playwright/test`, `@lhci/cli` and `vitest`, which this spec's own
acceptance criteria require.

**Is axe genuinely required, or was the plan reaching? Required for AC12, and not for AC13 —
which was my error, not the developer's.** AC12 asks for **zero** violations at `critical` or
`serious` in **both** themes. The already-installed candidate is Lighthouse, whose accessibility
category *is* axe-core, but `.lighthouserc.js` asserts it as `categories:accessibility >= 0.98`:
a weighted score, on the default colour scheme only. One `serious` violation on a low-weight
audit leaves that assertion green, and it says nothing at all about the dark theme. A score
cannot discharge a zero-violation criterion. **AC13 is a different matter and does not need
axe**: it asks for contrast per token pair, and **no task in this spec changes a colour token** —
T2 changes family, leading and tracking; T4 deletes a fade, a viewport unit and two
`preconnect`s. The computed colours axe measures do not move, so an axe contrast pass would prove
nothing about a type swap. AC13's evidence of record is `DESIGN.md` § Colour, whose every pair
carries its measured ratio, plus T11's AC5/AC6 specimens for the one thing a type swap *can*
change and axe *cannot* see: apparent contrast at a lighter stroke weight. `plan.md` T11 step 3
was claiming axe for AC13 and is corrected. The "bespoke contrast probe" was looked for and does
not exist as a runnable artefact — `grep -rni contrast` over `lib`, `components`, `__tests__` and
`tests` returns nothing; what exists is the hand-measured table in `DESIGN.md`. Recorded so
nobody goes looking for a script.

**Must the tool survive the cycle? Yes, and it was broken twice over.** Root cause, grepped
rather than guessed: `preview.mjs` imports `{ chromium } from 'playwright'`, and the bare
`playwright` package **does not resolve from the repo root** (`node -e "import('playwright')"` →
`ERR_MODULE_NOT_FOUND`; `playwright@1.63.0` exists only under `node_modules/.pnpm/node_modules/`).
`.agents/tools/check-reduced-motion.mjs:16` has the **identical** import bug, which means it has
never run here either, and G6 reaches for it. Both are fixed to `@playwright/test`, which
re-exports `chromium` and is already a `devDependency` — verified in this tree, no second driver
package. Fixing one caller of a wrong import and leaving its sibling is half a fix.

**The dialog loop is deleted, not re-pointed.** `preview.mjs` locates dialog triggers at
`#projects article button`, a selector from the project these tools were vendored from. WorkLoad
has no `#projects`, so the loop finds zero triggers and prints "dialogs: 0 violações" — which is
worse than no loop, because it reads as coverage. WorkLoad's two real dialogs
(`components/organisms/cookie-consent.tsx:81`, `components/organisms/journey-form.tsx:225`, both
via `components/atoms/modal-dialog.tsx`) need trigger selectors, an open/close protocol and an
acceptance criterion of their own. **Routed to `.specs/0003-citation-registry/` as a finding** —
not silently dropped, and not improvised inside a typography spec.

**What was deliberately not done.** `preview.mjs` was not rewritten as a Playwright spec under
`tests/e2e/`, which was the tempting larger fix. Five squad-infrastructure files name it by path
(`AGENTS.md`, `.agents/agents/web-standards-auditor.md`, `.agents/commands/gate.md`,
`.agents/commands/feature.md`, `.specs/README.md`), and editing squad infrastructure from inside
a feature spec is exactly the creep this spec has already been narrowed twice to avoid. Two
one-line import fixes and one deletion restore the tool everything already points at.

### One finding larger than this spec, routed to `product-manager`

`.specs/0001-foundation` closed with **AC18** — "zero axe-core violations at `critical` or
`serious`, in both themes" — whose entire verification cell was `node .agents/tools/preview.mjs`.
That command has never executed in this repository, so 0001's accessibility evidence is
unverified. 0002 is not the place to re-open it and this triage does not. Its own spec, after
G10.

### Lessons written before moving on

- **008** (`tech-lead` / `plan`) — before a plan names an evidence command, run it once in this
  tree; a tool the repo ships is not a tool that works here.
- **009** (`tech-lead` / `plan`) — pin a numeric acceptance criterion to a quantity and to a
  command you ran, never to a line a framework prints, because the printout is the vendor's to
  remove.

Active lessons: **9 / 30.**

## Ruled by `product-manager` (G5 run 4)

Three items arrived here from `tech-lead`. All three are settled; none needs the human.

### 1. AC7 — restated, and the 2,500 ms relocated to `.specs/0004-lcp-render-delay/`

**The ruling is option (b) with the missing half added.** `tech-lead` is right that AC7 is
defective, and right not to have softened it himself. I am restating it, and I am naming plainly
which of the two things I am doing: **this is a defective criterion being fixed, not a bar being
lowered.** Three findings, none of which is about convenience:

1. **It was written against a phase this page does not spend time in.** The 2,500 ms came from the
   `design-taste-frontend` skill, which is written for marketing pages — server-rendered LCP
   element, levers of fonts, images and blocking CSS. Here the phases are TTFB 454 · load delay 0 ·
   **load time 0** · render delay 2,076. Every lever that skill assumes finishes 2.4 s before the
   LCP timestamp. That is context and it is also the defect: the criterion was imported, not
   derived.
2. **It was decided finer than its instrument.** A lab-simulated median read against a threshold
   Core Web Vitals defines as a **field p75**, with ~106 ms of spread judging a 31 ms margin.
3. **As scoped it was satisfiable only by work the same spec forbids.** Every authorised lever is
   spent; the remainder is the client-gated hero numeral, which `design.md` §5.2 never put on the
   "what may change" table and `spec.md` § Out of scope keeps out.

**Why a reader in six months should agree.** The test for "restated so it passes" is whether the
new criterion can fail. It can, three ways per route: a median that does not improve, an
improvement smaller than the run set's own spread, or any single run above the baseline median.
Two of those three are strictly harder than what AC7 asked before — the old criterion judged one
median against a fixed number and said nothing about the other five runs. And the restatement
**adds** a rule the old one lacked: the margin must exceed the instrument's spread, which is what
made the 31 ms dispute unresolvable in the first place.

**Why this is not a retirement.** `0004-lcp-render-delay` exists as of this run, indexed, with the
finding, the phase breakdown, the two route medians and the three things it must change: the
client-gated hero numeral, the `PRODUCT.md` §4 decision about what the hero may show before
hydration, and a field instrument instead of a lab median. It is **not** `0003-citation-registry`,
which is scoped to citations and `lib/legal-tables.ts` and moves no rendering phase; folding a
render-delay target into it would be the same import error that produced this bounce. `spec.md`
now also names the hero numeral in § Out of scope and adds the matching non-goal, so nobody
reaches for the relocated lever from inside `0002`.

**What `0002` still owes on AC7:** the numbers. T11 step 2b produces them; AC7 restated is a claim
about three figures per route, and it is not discharged until `evidence/after.md` §2 holds all of
them.

### 2. AC10 — verification cell corrected, non-blocking

Done exactly as routed, and not treated as a scope change (`tech-lead` was right at B3 that the
quantity and the threshold never moved). The cell now names `node .agents/tools/route-js.mjs`,
the `src` set of the `<script>` tags in the pre-rendered HTML under `.next/server/app/`,
de-duplicated, **excluding the `noModule` tag**, gzipped at level 9, with the baseline
**228,446 bytes over 9 chunks** written in. The threshold is spelled in bytes (10,240) so no one
re-derives "10 kB". **R2 carried the same stale `pnpm build` instruction and is corrected with
it** — a correction that fixes the criterion and leaves the risk row still pointing at the removed
printout would have shipped the defect twice (lesson 009's own "How to verify").

### 3. `0001`'s AC18 — recorded, not re-opened, and not for the human

**`0001` is not re-opened, because AC18 never closed.** Its `STATUS.md` has T28 `pending` and the
G6 audit gate `pending`; no criterion was ever recorded as passed on an unrun command. The real
defect is narrower and still worth writing down: `0001` shipped a criterion whose only stated
evidence path was inoperable — `preview.mjs` imported a package absent from the manifest, the
lockfile and `node_modules` — and nobody found out until another spec tried to use it.

**Where it is recorded, so it cannot be missed:** `.specs/0001-foundation/STATUS.md` § Blockers, as
an open item addressed to `release-manager` at G7 and `web-standards-auditor` at G6, plus a row in
that spec's decisions log. **`0002`'s clean `preview.mjs` run is evidence for `0002`, not a
retroactive pass for AC18** — it ran against a different tree and AC18 asks for both themes at
`0001`'s own G6, which has still not happened. A criterion whose command never ran is evidence of
nothing in either direction.

**No human is needed.** `AGENTS.md` §4 rule 8 reserves the human for accepting a known **legal**
imprecision; this is a documentation-integrity correction to a spec document in an open PR, it
changes no shipped code, no number and no claim, and it resolves by making an open item visible
rather than by accepting anything. It consumes no bounce. If `release-manager` disagrees at G7, the
place to say so is there, with the criterion still open and waiting for its run.

### Lessons written before moving on

- **011** (`product-manager` / `spec`) — a numeric acceptance criterion needs a lever inside this
  spec's own scope and a margin wider than its instrument's spread, or it belongs to another spec.
- **012** (`product-manager` / `spec`) — never write an acceptance criterion whose verification
  command has never run in this tree; an inoperable evidence path proves nothing in either
  direction.

Active lessons: **12 / 30.**

## Decisions log

| When | Agent | Decision |
|---|---|---|
| Run 4 | product-manager | **AC7 restated from an absolute 2,500 ms lab median to three relative, instrument-aware clauses per route**, and the absolute target **relocated** to the new `.specs/0004-lcp-render-delay/` rather than retired. The criterion was defective on three counts — imported from a skill written for marketing pages, decided at ~31 ms inside a ~106 ms instrument spread, and satisfiable only by the client-gated hero numeral that the same spec forbids. The restatement is falsifiable three ways and adds a rule the original lacked (the margin must exceed the run set's spread). Lesson **011**. |
| Run 4 | product-manager | **AC10's verification cell corrected to `node .agents/tools/route-js.mjs`** — the gzipped `<script src>` set of the pre-rendered HTML, excluding the `noModule` tag, baseline 228,446 B over 9 chunks — with the threshold spelled in bytes. Quantity and threshold unchanged, so this is a correction and not a scope change. **R2 corrected with it**, because a risk row still naming the removed `pnpm build` printout would have shipped the same defect twice. |
| Run 4 | product-manager | **`.specs/0001-foundation`'s AC18 is recorded as open, not re-opened, and does not go to the human.** It was never closed — T28 and G6 audit are both `pending` there — so nothing false is on the record; the defect is a criterion whose only evidence path was inoperable. Recorded in that spec's § Blockers and decisions log for `release-manager` at G7. `0002`'s clean `preview.mjs` run is not a retroactive pass: different tree, and AC18 asks for both themes at `0001`'s own G6. Lesson **012**. |
| Run 1 | product-manager | G1 closed. Spec written against the `design-taste-frontend` Section 14 pre-flight for a shipping product. |
| Run 1 | product-manager | Declared one inviolable constraint that outranks the skill: any replacement typeface needs real OpenType `tnum` and an unambiguous `0`/`O` and `1`/`l`. The product displays money in columns; a misread digit is a wrong answer. If no allowed family clears it, Inter stays and the box is recorded as a documented exception (AC18). |
| Run 1 | product-manager | Scoped the matrix explicitly. WorkLoad is a tool, not a landing page; every hero, logo-wall, bento, marquee, testimonial, zigzag, scroll-cue and eyebrow box is `n/a` and named in the out-of-scope list, so no downstream agent invents marketing content to tick a box. |
| Run 1 | product-manager | Gated both cosmetic swaps on measurement, not taste. The icon-library swap is conditional on a recorded byte delta under 10 kB gzipped (AC10, R2); the font swap is conditional on LCP not regressing (AC7, AC8, R3). Either may end as a documented exception. |
| Run 1 | product-manager | Was honest in the spec about which boxes serve the user and which are house style, rather than arguing user benefit for all six. LCP, viewport units and figure legibility serve the user; the icon library and the em-dash ban largely do not. |
| Run 1 | product-manager | Sent seven legal dependencies to G2 (LD1-LD7) even though no rate or table changes. Four disclaimer/copy strings lose an em-dash, and restructuring punctuation inside a sentence that names a legal gap can narrow it. LD7 is the guard that a typography pass cannot become a calculation pass. |
| Run 1 | product-manager | Re-ran the em-dash grep instead of trusting the request's list, and found two occurrences it missed: `lib/payroll.ts:24` (RGPS ceiling, table year) and `lib/compliance.ts:34` (CLT art. 59, Súmula 376 TST). Both are in scope and both added a legal dependency (LD8, LD9). Recorded as lesson 001. |
| Run 1 | product-manager | Created the missing `.agents/memory/lessons/_template.md`. `lesson.mjs new` crashed without it, so the memory protocol could not be followed at all. Tooling fix, no behaviour change. |
| Run 1 | product-manager | Excluded CSS comments in `app/globals.css` from the em-dash ban. The ban protects what reaches a screen or a crawler; source comments reach neither. |
| Run 1 | labor-law-analyst | G2 **rejected** on one point (B1). Every other legal question the gate had to settle is settled in `legal.md`: binding rules S1-S8, one per string, plus the `MISSING_VALUE` ruling and both disclaimer rulings. The bounce is narrow — once B1 is answered, G2 re-passes on that point alone and G3 starts against rules already written. |
| Run 1 | labor-law-analyst | Ruled `MISSING_VALUE` a **legally bound placeholder**, not a free copy decision (LD4). It sits in a currency slot, so `PRODUCT.md` §4 "cite or omit" applies: the replacement must read as absence, never as an amount. Explicitly forbade `R$ 0,00`, a bare `R$`, any digit, `N/A`/`n/d`, and the empty string — and required an accessible equivalent, which the current bare em-dash does not have (F6). |
| Run 1 | labor-law-analyst | Verified the DSR holiday assumption at `day-summary.tsx:221` against `lib/weekly-rest.ts:10-21`. Both assumptions in the copy are true of the code, and "feriados não entram" is **material, not stylistic**: Lei nº 605/1949 art. 1º puts feriados in the repouso base, so the figure shown is a floor. A reader who does not know art. 1º cannot infer the gap from "só os domingos", which is why S3 forbids dropping it as redundant. |
| Run 1 | labor-law-analyst | Re-verified the RGPS 2026 brackets and R$ 988,09 against Portaria Interministerial MPS/MF nº 13/2026; `lib/legal-tables.ts` matches to the centavo, and the ceiling discount was re-derived from the brackets rather than trusted. LD7 confirmed: none of the eleven strings participates in a computation. |
| Run 1 | labor-law-analyst | Raised six findings this spec did not cause (`legal.md` §7). **F1** (`payroll.ts:24` calls R$ 8.475,55 the "teto de contribuição" when it is the teto do *salário* de contribuição) is fixed in the same edit, since the string is already being rewritten. **F3** (the footer credits the RGPS Portaria for the IRRF table, which is governed by Lei nº 15.270/2025) and **F4** (`sourceUrl` links legisweb.com.br, a commercial aggregator, where a gov.br primary exists) are `PRODUCT.md` §4 defects on the product's central promise, in the one line whose job is to keep it — routed to a follow-up spec because both require `lib/legal-tables.ts`, which 0002 forbids touching. |
| Run 1 | labor-law-analyst | Declared out of scope and did **not** re-derive: the 2026 IRRF brackets, the simplified and dependent deductions, and the Lei 15.270/2025 redutor coefficients. No string in scope asserts them and the file is untouchable here. Recorded so the next spec on the salário path knows they are unverified rather than cleared. |
| Run 1 | labor-law-analyst | planalto.gov.br refused every connection from this session (ECONNRESET x5; camara.leg.br returned 429). CLT art. 59 caput and Lei 605/1949 art. 1º were verified through agreeing secondary reproductions, with the planalto URLs cited as the record and the gap declared in `legal.md` §13. Re-verify at G6 from a host that can reach it. |
| Run 1 | tech-lead | **Bounce triage, G2 -> G1.** All of B1 and F1 to `product-manager` in one amendment, one round trip (`AGENTS.md` §4 rule 4). Nothing routed to `content-writer`: the wording is theirs at G4, the claim is not. No finding of the analyst overruled. |
| Run 1 | tech-lead | **The spec widens, to the "banco de horas" claim surface and to F1 — and to nothing else.** AC1 and AC2 cannot pass while two of the eleven strings are frozen, so the widening is forced, not elective. Bounded by one grep over six locations. The boundary against F3/F4 is `lib/legal-tables.ts`: this spec's Out of scope bars it as the LD7 guard that a typography pass never becomes a calculation pass, and B1/F1 clear that bar while F3/F4 do not. |
| Run 1 | tech-lead | Re-ran the claim search instead of trusting the report's list (lesson 001) and found the surface is **six** locations, not the four `legal.md` §1 names: `app/page.tsx:6,11`, the two root `alt`, `lib/og-image.tsx:14`, `lib/calculator-view.ts:9`. Recorded so the amendment scopes all six and AC2 counts them. |
| Run 1 | tech-lead | Ruled option 3 of `legal.md` §1 (build the accumulation) unavailable to 0002 — it changes what the calculator computes, which this spec's own Out of scope forbids. If the product wants banco de horas it is its own spec, and the claim still comes down here until that ships. |
| Run 1 | tech-lead | Opened `.specs/0003-citation-registry/` as a draft holding F2, F3, F4 and F5, indexed in `.specs/INDEX.md`, so the findings survive outside 0002's `legal.md`. A finding that lives only in the rejecting report of a closed spec is a finding the squad paid for and lost. |
| Run 2 | product-manager | **B1 answered: the claim is dropped, not reworded.** "banco de horas" is removed from all seven locations. The app computes one day's saldo; CLT art. 59 §§2º, 5º e 6º describe an instrument with an accrual, a window and a pactuação that no line of `lib/` implements, and `PRODUCT.md` §9 backs none of it. A claim a crawler reads is held to the §4 bar exactly like a number a user reads. |
| Run 2 | product-manager | Re-ran the claim grep instead of trusting the triage list (lesson 001) and found a **seventh** location the tech-lead's six missed: three test files hard-coding the strings. In scope, because a build that fails is not a shipped correction. Also ruled `lib/structured-data.ts:27` explicitly **out** — it interpolates C6, and editing it would create two sources of truth for one claim. |
| Run 2 | product-manager | Ruled banco de horas **dropped, not deferred to a roadmap.** It is not blocked on capacity, it is blocked on `PRODUCT.md` §7 ("No timesheet history or ponto eletrônico"), which the accumulation would require breaking. Writing it down as "someday" would have been a softer lie than the claim it replaced. The trail is the §9 non-claim row plus the § Deferral section, and the unlock sequence is named: human amends §7 first, then a spec, then the code, then the words. |
| Run 2 | product-manager | Edited `PRODUCT.md` §9 in the same amendment rather than leaving the spec to carry a permission the claim table did not know about. Added a row for the single-day computation and an "Explicit non-claims" block. A retired claim with no record is a claim the next well-meaning agent restores. |
| Run 2 | product-manager | Stated the SEO loss instead of arguing it away, and **refused to solve it here.** Five surfaces lose a deliberately targeted keyword. Ranking for a query the product cannot answer is worse than not ranking; recovering the traffic is new work with its own trade-offs, and smuggling it into a typography pass is exactly R5. |
| Run 2 | product-manager | Folded F1 in as `tech-lead` ruled: one clause in a string S1 already rewrites, no number moved, both figures still interpolated. Added as LD11 and AC23 so G6 checks it against a dependency rather than a footnote in a rejected report. |
| Run 2 | product-manager | Added AC24 — `pnpm test` green **without** a deleted assertion. Moving a string that four tests pin creates a standing temptation to delete the test instead of updating it, and that failure mode is invisible in a green run. |
| Run 2 | product-manager | Kept F2–F5 out. Referenced `.specs/0003-citation-registry/` and added it to the non-goals so a downstream agent cannot absorb it helpfully. The boundary is `lib/legal-tables.ts`, and it is the same boundary `tech-lead` drew. |
| Run 2 | labor-law-analyst | **G2 passes.** B1 closed by the claim removal and F1 closed as LD11. Binding rules S9 and S10 written so `content-writer` and `product-designer` start at G3 against rules, not against a report. |
| Run 2 | labor-law-analyst | Re-grepped the claim surface a third time rather than trusting either the triage list or the amendment (lesson 001). Confirmed C1–C7 is exact, and recorded the **negative** results — `app/manifest.ts`, `app/layout.tsx`, `sitemap.ts`, `robots.ts`, `public/**`, `README.md` — so the next agent does not re-check them and, more importantly, does not "helpfully" edit `app/manifest.ts`, which is already compliant. |
| Run 2 | labor-law-analyst | Verified the permitted descriptor against the modules that compute it rather than against the spec's prose. `lib/day-breakdown.ts`, `lib/night-shift.ts` and `hooks/use-work-calculator.ts:67` back all four items. A permission granted for a capability nobody opened the code to confirm is the same defect as the claim it replaced, one register quieter. |
| Run 2 | labor-law-analyst | Narrowed the permission twice (S9.1, S9.2). Both narrowings exist because a correct claim table still permits a wrong string: `saldo de horas` passes every AC and means banco de horas in ordinary speech, and `adicional noturno` is backed only because a footer three screens below the descriptor names the Súmula 60 gap. Tied the second permission explicitly to that disclosure so a later spec cannot remove one without re-opening the other. |
| Run 2 | labor-law-analyst | Ruled that S10 applies **together with** S1, not instead of it, and stated the G6 test as four things the reader must get off the rendered sentence — the base, that it *is* the base, the maximum withheld, and the year — rather than as a string comparison. A naming correction that passes a grep and still reads as "your INSS discount is R$ 8.475,55" has not been made. |
| Run 2 | labor-law-analyst | Reached both primary texts this session and discharged two run-1 verification notes. Found the **DOU permalink** for the Portaria, which is machine-readable where the gov.br PDF is a scan, and re-checked the RGPS brackets, the RPPS ladder and the ceiling against it digit by digit. Supplied the URL to `.specs/0003-citation-registry/` for F4 and did **not** edit `lib/legal-tables.ts`: the boundary `tech-lead` drew holds even when the fix is one line and I am holding the right answer. |
| Run 2 | labor-law-analyst | Audited the two new `PRODUCT.md` §9 entries instead of assuming the amendment settled them. The non-claim row is correct, including the instrument (CLT art. 59 §§2º, 5º e 6º, verified verbatim). The Evidence row is true but cites the render site rather than the line that proves it — recorded as a non-blocking correction, because a claim table whose evidence points at a display is one refactor away from pointing at nothing. |
| Run 2 | labor-law-analyst | Kept F2–F5 out, including a live improvement to F4's source URL that I had in hand. Recorded it inside `legal.md` §15.3 as a note *for* spec 0003 rather than acting on it. |
| Run 1 | content-writer | G3 (copy) closed. Every one of the eleven em-dashes was resolved by restructuring the sentence, never by swapping a dash character, and the nine qualifying clauses were kept in the same visible block, none moved to a tooltip, an accordion or an `aria-label`. |
| Run 1 | content-writer | Gave the qualifying clause its own sentence in the four highest-risk strings instead of folding it into the one before it. "Feriados não entram." and "A irregularidade está na extrapolação, e a sanção recai sobre o empregador." now stand alone: a named gap and an allocation of blame read as claims of their own, and a comma would have demoted both to an aside of the sentence that precedes them. |
| Run 1 | content-writer | Rewrote D2 and D3 of the footer disclaimer with a second full negation ("não substituem seu holerite, **não valem** como registro oficial de ponto") rather than keeping the "nem", whose verb sat before the em-dash. D3 is the disclosure with the highest consequence and the lowest attention, and after the cut it needed a verb of its own instead of a parallelism the punctuation change had loosened. |
| Run 1 | content-writer | Chose `MISSING_VALUE = "Sem carga horária"` (17 chars). Non-numeric, non-currency, pt-BR, announced as text by the `aria-live` region that swallowed the bare em-dash (closes F6). Rejected "Informe a carga horária" because it duplicates the `AlertBanner` title already on the same screen, and rejected "Sem valor"/"Sem dados" because in a money slot "sem valor" reads as "vale zero", which is the exact confusion S6 exists to prevent. |
| Run 1 | content-writer | Raised one design dependency rather than shortening the copy to fit: `HeroPanel` sizes its value with `clamp(2.5rem, 208/length cqi, 6rem)` and `whitespace-nowrap`, so a 17-character string renders at the 40px floor, about 370px wide, in a 294px box at 390px. The floor is a type decision for `product-designer`; no shorter string stays compliant with S6. |
| Run 1 | content-writer | Settled the replacement descriptor as "Calculadora de jornada de trabalho, horas extras e saldo do dia", with `saldo` immediately followed by `do dia` in all seven locations (S9.1) and the words "de trabalho" kept so the retirement does not also drop a term the code backs. "adicional noturno" was left out of the descriptors for length only, not by prohibition: `app/page.tsx:8`, out of scope and untouched, already carries it, and no descriptor qualifies it as complete (S9.2). |
| Run 1 | content-writer | Made C3, C4 and the JSON-LD `name` literally identical rather than merely equivalent in descriptor, by capitalising the `alt` descriptor and building both from `"WorkLoad: " + VIEW_HEADINGS[view]`. AC22 then closes by string comparison instead of by a reviewer judging what "same descriptor" means. C5 was written as a strict subset, with the permitted cut named in advance: drop the whole `saldo` item, never the words "do dia" (S9.4). |
| Run 1 | content-writer | Applied S10 inside the S1 rewrite: "O teto do salário de contribuição é R$ 8.475,55: acima disso o desconto trava em R$ 988,09 (tabela de 2026)." The three interpolations stayed interpolations, the year stayed in the same sentence as both figures, and the reader gets the base, that it *is* the base, the maximum withheld and the table year without inference. |
| Run 1 | product-designer | **Declared the dials at `3 / 2 / 5`, not the `8 / 6 / 4` baseline and not a silent inheritance.** Traced to the Section 1.A row "trust-first / accessibility-critical" and the Section 1.B "Public-sector service" preset. Deliberately **did not take** the "redesign - preserve" row's `motion +1`: that row assumes motion is under-served, and here it is capped by the Numbers-Don't-Move Rule, which is a product rule, not neglect. Recorded because it is a knowing deviation from a signal row. |
| Run 1 | product-designer | **Tested every font candidate by downloading the exact `woff2` `fonts.gstatic.com` serves and reading its `GSUB`, `hmtx` and glyph contours**, rather than trusting reputation. That is what produced the finding below; a reputation-based pick would have chosen IBM Plex Sans, which has beautiful shapes and **no `tnum` in the served file**. |
| Run 1 | product-designer | **Finding: Google Fonts strips the `zero` feature from every family it serves.** Its subsetter keeps a fixed default feature set and drops `zero`, `ss*` and `cv*`. Consequence: `slashed-zero` in the `numeric` utility has never done anything in this product, and `DESIGN.md` claims the opposite in two places. This moved the question from "which family has a `zero` feature" to "which family draws a disambiguated zero by default", and it is corrected in `DESIGN.md` as change C3. |
| Run 1 | product-designer | Chose **Atkinson Hyperlegible Next**: real `tnum` (every substituted digit 632/1000 em at weights 400 to 700), a **slashed zero in the default glyph** (3 contours where every other candidate has 2), a `1` with a foot serif against an `l` with a tail, variable via `next/font/google`, and **33 kB latin against Inter's 71 kB**. Asap is recorded as the pre-analysed runner-up so a downstream disqualification does not stop the pipeline. AC18 does not apply: Inter is not kept. |
| Run 1 | product-designer | **Re-tuned the whole ramp from two mechanical rules rather than copying it**, which `spec.md` R1 calls a failure of this gate. Rule A: every leading below 1.21 gets +0.05, because Inter's glyph box is 1.210 em and Atkinson's is 1.300 em. Rule B: negative tracking cut to ~45%, because Atkinson sets 3 to 6% narrower and more openly. **No `font-size` changes**, with one pre-authorised contingency at the two smallest steps if the AC6 specimen fails on a real device. |
| Run 1 | product-designer | Chose **Tabler** over Phosphor on a measured bundle argument, not taste: Phosphor ships six weight variants per icon component and is **not** in Next's default `optimizePackageImports` list, while `@tabler/icons-react` **is** (verified in `node_modules/next/dist/server/config.js`, the same array that holds `lucide-react`), so the root named import is rewritten per icon at build time and the 464 kB barrel never loads. Radix was rejected on design: fixed 15px glyphs cannot express the three-size, two-stroke rule `DESIGN.md` mandates. |
| Run 1 | product-designer | **Took the LCP decision that is actually design-owned and left the rest routed.** `calculator-layout.tsx` mounts both columns at `opacity: 0`, and the aside holds the hero, which holds the LCP element. An element at opacity 0 is not a paint, so the whole client bundle sat between the user and their number for a fade whose only content was "the page appeared". A page-entry fade is not on `DESIGN.md`'s list of what may animate and never was. Deleted. The third-party `preconnect`s go to `tech-lead` under `PRODUCT.md` §8 with the rule that decides them. |
| Run 1 | product-designer | Specified **`min-h-dvh`** rather than the skill's literal `min-h-[100dvh]`. Identical declaration, Tailwind v4 core utility, no arbitrary value, which is what `DESIGN.md` requires. Swept for other viewport units: exactly one occurrence exists. |
| Run 1 | product-designer | **Resolved `copy.md` §8 by moving the type, not the words.** `MISSING_VALUE` is a legally bound sentence (S6) and was being set in the numeral step, where the `clamp()` floor made 17 characters 337px wide against a 294px box. `HeroPanel` gains a statement mode at `--text-title` that wraps to two lines: measured at 202px, with 92px spare, and 262px for `content-writer`'s stated second choice. The copy was never asked to shorten, because S6 is the reason it is long. |
| Run 1 | product-designer | Walked all **62** Section 14 boxes and recorded a verdict and a reason for each in `evidence/preflight-matrix.md`: 32 pass, 8 fail with the fix specified, 21 `n/a` with the reason, 1 deferred to G4/G6. **No marketing content was invented to satisfy a box**, and every landing-page box `spec.md` named is `n/a` with the reason, not silently ticked. |
| Run 1 | product-designer | **Recorded the RGPS disclosure's placement rather than fixing it.** `legal.md` S1/S10's string renders inside the regime picker's collapse. It is a real `aria-expanded` disclosure opened precisely when it is relevant, and pulling it out is a layout change `spec.md` forbids. Routed to `product-manager`, and only if `labor-law-analyst` raises it at G6. A legal rejection is never answered by relocating a disclosure. |
| Run 1 | product-designer | Declared **five `DESIGN.md` changes and argued that none is a human approval point**: none adds a token, a type step, a curve, a colour or an elevation level. C2 is a token-value re-tune `spec.md` R1 commissioned in writing; C3 corrects two claims the shipped build does not back; C5 widens where one existing step may be used. If `tech-lead` reads C2 or C5 otherwise, the disagreement is named here rather than buried. |
| Run 1 (G4) | tech-lead | **G4 closed. Twelve tasks, ordered so the tree compiles and `pnpm check` passes after every one.** T1 is a measurement, not a warm-up: AC8 asks for an LCP *before* the change and there is no way to take it once a file has moved, so it is task one and the plan says no source file may be edited until it lands. |
| Run 1 (G4) | tech-lead | **Corrected the `slashed-zero` documentation defect here rather than routing it to `0003`.** `DESIGN.md` has claimed since 0001 that the `zero` OpenType feature removes the 0/O ambiguity "at no extra byte"; the designer measured that Google's subsetter drops `zero` from every family it serves, so the declaration has been inert on a product whose whole job is showing money. Three reasons to fix it in 0002: `product-designer` already ruled on it as change C3 and G3 is closed, so routing it out would re-open a closed gate; the false sentences sit inside the exact paragraphs T10 rewrites for the family swap, and a claim carried through a rewrite is a claim re-published by everyone who signs it (lesson 002); and `.specs/0003-citation-registry/` is bounded by `lib/legal-tables.ts`, which a typography claim in `DESIGN.md` shares nothing with. The `@utility numeric` declaration keeps `slashed-zero` — it is inert but correct in intent, and Atkinson's zero is slashed in its **default glyph**, which is what survives every subsetter and every fallback. |
| Run 1 (G4) | tech-lead | **Took `design.md` O1/L3: both third-party `preconnect`s are deleted from `app/layout.tsx`, not moved behind consent.** Read the consumers before deciding rather than the tag: `AnalyticsWrapper` renders `GoogleAnalytics` only when `readTelemetryConsent() === true` inside a `useEffect`, and `AdManager` injects the AdSense script only when `NEXT_PUBLIC_ENABLE_ADS === "true"`, also in a `useEffect`. Neither origin can be contacted before hydration, and for a user who declines consent neither is ever contacted at all — so the two handshakes sit in front of the LCP element for connections frequently never opened. `PRODUCT.md` §8: a placement that measurably hurts the path to an answer loses. Moving them behind consent would fire them *after* the script tag they precede and buy nothing. |
| Run 1 (G4) | tech-lead | **Turned AC21 from an auditor's grep into a Vitest file (T9).** `labor-law-analyst` found the grep permeable: it blocks `saldo do mês`, `acumul` and `banco` and lets through **`saldo de horas`**, the everyday name of the instrument being retired (S9.1, lesson 004). A grep run once also expires the moment someone edits a descriptor next quarter. `__tests__/copy-guards.test.ts` expresses S9.1's adjacency rule — `saldo` immediately followed by a day-scoping term, no intervening noun — which is the thing a flat grep cannot say, and folds AC1, AC9, AC11, AC19, AC21, AC22 and AC23 into assertions that run on every `pnpm check`. It is the only new file in the spec, adds no dependency and no production code, and its file lists are literal on purpose: adding a descriptor surface should require editing the guard. |
| Run 1 (G4) | tech-lead | **Raised B2 and refused to settle it.** `legal.md` S10.3 bars "teto do INSS" anywhere in `lib/`; `copy.md` §5 leaves `lib/payroll.ts:32` unchanged, and that is where the phrase is. Two closed gates disagree, and `AGENTS.md` §4 rule 8 decides which wins — but the wording belongs to `content-writer` and the scope row to `product-manager`, so it is routed, not resolved. It blocks **T12 only**; the other eleven tasks are independent and G5 starts now. Recorded as a blocker rather than a footnote because a conflict noticed at G4 and left unwritten becomes improvisation at G5. |
| Run 1 (G4) | tech-lead | Re-grepped every enumerated list this spec inherited instead of trusting it (lesson 001): the eleven em-dashes are exactly eleven plus one in a `biome-ignore` comment that `spec.md` exempts by name; the "banco de horas" surface is exactly C1-C7; the `strokeWidth` call sites are exactly three, and `components/atoms/progress-ring.tsx` is **not** one of them — its three `strokeWidth` props are native SVG attributes on a hand-drawn gauge and the plan says so, because a blind rename would have broken the only instrument on the screen. |
| Run 1 (G4) | tech-lead | Verified `Atkinson_Hyperlegible_Next` against this repo's own `node_modules` rather than against the family's reputation (lesson 005, applied one rung further): `next/font/google`'s bundled `font-data.json` lists it with a `variable` weight and a `wght` 200-800 axis, and the generated `index.d.ts` makes `weight` **optional** for it, so omitting `weight` loads the variable face and typechecks. The plan states that, so the developer never discovers it by a failing build. |
| Run 1 (G4) | tech-lead | **No net dependency change.** `@tabler/icons-react` in, `lucide-react` out, and no `next.config.ts` edit: Tabler is already in Next's built-in `optimizePackageImports` array, so adding it to `experimental.optimizePackageImports` by hand would be redundant. Both pre-authorised contingencies — the deep-import fallback and the two-step caption/overline size bump — are written into the tasks with their exact values, so neither is a decision `frontend-dev` makes. |
| Run 1 (G4) | tech-lead | Kept `hooks/**` out of the change entirely and said so in the plan, so the 100% bar there is held by not moving rather than by new tests. The only new test file is a `.ts` guard with no React, which keeps it out of the `components/**` and `app/**` coverage denominators — no threshold is reached by adding surface the tests do not exercise. |
| Run 3 (G1) | product-manager | **Absorbed B2 into 0002 rather than routing it to `0003-citation-registry`.** Three reasons, in order of weight. (1) **S10.3 is this spec's own rule**, written by this spec's G2 at run 2 about this spec's own correction; closing 0002 with it knowingly unapplied would establish "a scope table drawn before the rule existed beats the rule" as precedent, which `AGENTS.md` §4 rule 8 forbids. (2) **0002 manufactures the harm.** Before T6 both `impact` strings were wrong identically; after T6 the CLT option says *teto do salário de contribuição* and the estatutário option, the next entry in the same `WORK_REGIME_INFO` array on the same screen, still says *teto do INSS* — a divergence that does not exist today and that `0003` cannot own because `0003` did not create it. (3) **It is not a widening**: no new legal dependency (LD11 covers the naming), no new norm, no new claim surface, no new file — `lib/payroll.ts` is already edited by T6, the string carries no figure, so no number moves and LD7/AC15 are untouched. `0003`'s boundary is `lib/legal-tables.ts` and citation accuracy; this is a naming collapse in a disclosure string, which is F1's subject. The counter-argument — 0002 has widened once already — is real and is why the amendment adds one line of code scope and two acceptance criteria, and re-opens nothing else: not `design.md`, not the rest of `copy.md`, not `lib/legal-tables.ts`. |
| Run 3 (G1) | product-manager | **Wrote AC25 as a grep over the whole boundary S10.3 names, and AC26 as a read of both strings side by side.** AC23 pinned the prohibition to a single line number, which is how a rule that says "anywhere in `lib/`" shipped with a documented exception one line away. AC19 got this right for "banco de horas" — repo-wide grep — and AC23 did not. Lesson 006. AC26 exists because a grep for the banned phrase cannot catch the failure that matters: two *different permitted* names for one figure on one screen would pass every `rg` and still be the collapse S10 was written to remove. |
| Run 3 (G4) | content-writer | **Wrote the `lib/payroll.ts:32` clause by reusing the exact noun phrase T6 installs, not by inventing a second permitted name.** "teto do salário de contribuição" now governs R$ 8.475,55 in both `WORK_REGIME_INFO` `impact` strings, which is what AC26 reads for. The alternative that also clears S10.3, dropping the ceiling mention from the estatutário string, was rejected: the sentence's whole point is that the federal RPPS does **not** stop where the CLT stops, and that contrast is unreadable without naming the ceiling it does not have. |
| Run 3 (G4) | content-writer | **Added "que vale para a CLT" to the negated ceiling.** A bare "não para no teto do salário de contribuição" reads, to someone who is not a lawyer, as if the RPPS federal had its own teto that the contribution somehow passes. The qualifier keeps the S10.1 sintagma intact, says whose ceiling it is, and keeps the sentence true: the federal RPPS ladder has no ceiling and the faixas keep climbing to 22%. No figure entered the string: it is still the only `impact` with no currency in it. |
| Run 3 (G4) | content-writer | **Corrected `copy.md` §5 rather than appending around it.** The row said `lib/payroll.ts:31` and "fora de escopo"; both were wrong, and a run-2 artifact that still asserts a false scope is what produced B2 in the first place. The row now carries the real line, the shipped wording and rule S10.3, so §5 remains a truthful checklist of every disclosure this spec touches. |
| Run 1 (G4) | tech-lead | Declined to fix the stale component paths in `DESIGN.md`'s `### Hero panel` and `### Alerts` headings (`molecules/` where the files are `organisms/` and `atoms/`). Real, but a defect in a sentence no task here reopens, and correcting it is scope this gate was not given. Recorded so the next agent finds it already seen. |
| Run 1 (G5) | frontend-dev | **Stopped at T1 and escalated two blockers rather than choosing a substitute measurement.** Correct under `AGENTS.md` §4 rule 7 and the plan's own "no source file may be edited until T1 lands": every candidate replacement for the removed `First Load JS` figure (bundle analyser, summing `.next/static/chunks/`, Lighthouse script weight) answers a different question, and picking one is deciding the acceptance test for a numeric threshold. No source file touched. |
| Run 2 (G5) | tech-lead | **B3 closed by replacing the method, not the criterion.** AC10 asks a question Next 16 did not remove — does the route's JS grow, and by how many gzipped bytes — and its threshold is in the same unit as before. `.agents/tools/route-js.mjs` gzips the script `src` set of the route's pre-rendered HTML, which is what "First Load JS" counted, **excluding the one `noModule` tag** (39,520 bytes of legacy polyfill no modern browser fetches; counting it inflates the total by 17%). Both alternative artefacts were opened and rejected in writing: `.next/app-build-manifest.json` **does not exist** under Next 16 with Turbopack, and `.next/build-manifest.json` holds only `rootMainFiles`, a subset of what the route requests. |
| Run 2 (G5) | tech-lead | **Measured the baseline at this gate instead of leaving the developer to discover it: `/` = 228,446 gzipped bytes over 9 chunks, `custo-da-hora` byte-identical.** The figure is written into T1 so a broken measurement is distinguishable from a real delta on the first run, and the identity of the two routes is recorded because it means the icon-library delta lands equally on both — not something the plan had said. |
| Run 2 (G5) | tech-lead | **Made the measurement a committed tool rather than a pasted one-liner.** `qa-engineer` re-runs it at G6 and `release-manager` transcribes it at G8; a nine-line `node -e` retyped in three places is three chances to measure differently. `{ level: 9 }` is pinned explicitly because Node's zlib default is 6 and a default that moves between runtime releases would silently move the before/after pair. |
| Run 2 (G5) | tech-lead | **Refused to route AC10 to `product-manager` for restatement, and routed one non-blocking cell correction instead.** The quantity and the threshold both survive intact; only the plan's instruction for reading them was broken, and that is this gate's to fix. AC10's verification cell still names `pnpm build` and should name `route-js.mjs` — same class of routed correction as the two `labor-law-analyst` left at G2 run 2. It does not bounce G5 and this plan does not wait on it; unmade, `release-manager` hits it at G8. |
| Run 2 (G5) | tech-lead | **B4 closed by adding `@axe-core/playwright@^4.13.0` as a `devDependency`, and ruled that `spec.md`'s prohibition does not reach it.** That prohibition is written against fixing **LCP** with a package, and all three LCP terms here are deletions. This is test tooling: zero production bytes, absent from every client graph, incapable of moving the figure B3 just specified. Reading it otherwise would disqualify `@playwright/test`, `@lhci/cli` and `vitest`, which this spec's own ACs require. |
| Run 2 (G5) | tech-lead | **Checked whether axe was genuinely needed instead of assuming the plan was right, and found the plan half wrong.** AC12 needs it: Lighthouse's a11y category *is* axe-core, but `.lighthouserc.js` asserts a **weighted score** (`>= 0.98`) on the **default colour scheme only**, and one `serious` violation on a low-weight audit leaves it green. A score cannot discharge a zero-violation criterion in two themes. **AC13 does not need it, and claiming it did was my error at run 1** — no task in this spec changes a colour token, so the computed colours axe measures do not move. AC13's evidence is `DESIGN.md` § Colour plus T11's AC5/AC6 specimens, for the thing a type swap *can* change and axe *cannot* see. T11 step 3 corrected. |
| Run 2 (G5) | tech-lead | **Fixed the root cause in both vendored tools, not the one the blocker named.** `preview.mjs` also imports `{ chromium } from 'playwright'`, which does not resolve from this repo's root (`ERR_MODULE_NOT_FOUND`; the package exists only under `node_modules/.pnpm/node_modules/`), and `.agents/tools/check-reduced-motion.mjs:16` carries the **identical** bug — so it has never run here either, and G6 reaches for it. Both go to `@playwright/test`, already installed and verified in this tree to re-export `chromium`. No second driver package. Patching one caller of a wrong import and leaving its sibling is half a fix. |
| Run 2 (G5) | tech-lead | **Deleted `preview.mjs`'s dialog loop rather than re-pointing it.** It targets `#projects article button`, a selector from the project the tools were vendored from; WorkLoad has none, so the loop finds zero triggers and prints "dialogs: 0 violações", which reads as coverage. WorkLoad's two real `<dialog>` surfaces need trigger selectors, an open/close protocol and an AC of their own — routed to `.specs/0003-citation-registry/` as a finding, not improvised here. |
| Run 2 (G5) | tech-lead | **Declined the larger fix: `preview.mjs` was not rewritten as a Playwright spec under `tests/e2e/`.** Five squad-infrastructure files name it by path, and editing squad infrastructure from inside a feature spec is the creep this spec has already been narrowed twice to avoid. Two one-line imports and one deletion restore the tool everything already points at. |
| Run 2 (G5) | tech-lead | **Recorded that `.specs/0001-foundation`'s AC18 was closed on a command that has never executed in this repository**, so 0001's accessibility evidence is unverified. Routed to `product-manager` as its own spec after G10. Not re-opened here: a finding that lives only in a triage note is a finding the squad paid for and lost, and that is the only reason it is written down at all. |
| Run 2 (G5) | tech-lead | **Recorded that this was not a bounce.** `frontend-dev` produced no artifact to reject and both defects were in `plan.md`. Spending one of G5's two bounces on a plan amendment would have put the gate one escalation from the two-bounce ceiling for a mistake of mine, which would be blame accounting rather than gate accounting. |
| Run 3 (G5) | frontend-dev | **T1 done.** Step 0 repaired both tools and added the one devDependency exactly as amended; step 1 measured `/` = `custo-da-hora` = 228,446 gzipped bytes over 9 chunks, matching the tech-lead's figure to the byte; step 3 measured 0 axe violations, 4 `color-contrast` incomplete on `/`, 16 console errors (the tool's own HMR noise, verified against `report.json` and not a page defect). Nothing under `app/`, `components/`, `lib/`, `hooks/` touched. `pnpm check` green. |
| Run 3 (G5) | frontend-dev | **T9's guard proven to fail before it guards anything.** Built `__tests__/copy-guards.test.ts` in an isolated `git worktree` at commit `366eab5` (pre-T2), never in the shared tree (`AGENTS.md` §4 rule 6): symlinked `node_modules` in, ran the file, got **6 of 8 cases red** (compensation-term ban, alt/JSON-LD equality, `teto de contribuição` ban, em-dash sweep, `lucide-react` ban, viewport-unit ban). The other two ("saldo scoped to the day", "night premium not qualified as complete") pass vacuously on the pre-T8 tree because the old descriptor never mentions `saldo` or the night premium at all — there is nothing yet to violate, which is a property of what those two guard (a forbidden pattern's *future* reappearance), not a defect in the guard. Same file against the current tree: 8/8 green. Worktree removed after the probe. |
| Run 3 (G5) | frontend-dev | **T2 done as specified**, not a decision of mine to flag: `pnpm build` succeeds (exit 0) but prints one Turbopack warning, `Failed to find font override values for font \`Atkinson Hyperlegible Next\`. Skipping generating a fallback font.` `design.md` §2.3/§5.3 states `next/font` "generates an `adjustFontFallback` size-adjust from the real font's metrics… exactly as it did from Inter's" — that claim does not hold for this exact family name in this Next version: Next's own metric-matching table has no entry for it, so no size-adjusted fallback is generated, which is a CLS-relevant fact the design gate's reasoning did not have. **Not raised as a blocker**: T2 names no CLS acceptance criterion and asks only for the swap and the re-tuned ramp, both of which are done and green; the build is not "unclean" by any check the task names. Recorded so `qa-engineer`/`web-standards-auditor` read it against AC7/AC8/AC12 at G6, and so `product-designer`/`tech-lead` can correct the §2.3/§5.3 claim if a future amendment reopens `design.md`. |
| Run 4 (G5) | tech-lead | **Refused the written-down fallback because the instrument disproved it.** `design.md` §5.3 names Asap and `plan.md` T11 named it again, so the swap was the path of least argument. The LCP phase breakdown says Load Delay and Load Time are **0 ms** on all six runs and the shipped woff2 finishes at **65 ms** against a 2,530 ms LCP — a font change cannot move a phase that measures zero. A fallback that is pre-analysed is not a fallback that is *indicated*; the pre-analysis answered "which family if the font is the problem", never "is the font the problem". |
| Run 4 (G5) | tech-lead | **Named my own drafting defect as the cause of B5, not the developer's stop.** T11 step 2 fused `spec.md` R3 (a **font** verdict: "if the family pushes LCP up") with AC7 (a **page** verdict: "under 2500 ms") into a single branch, so a page-level miss routed to a font-level remedy. `frontend-dev` executed the branch exactly as written and refused to resolve it, which is the correct behaviour and the reason the wrong swap did not ship. Lesson 010. |
| Run 4 (G5) | tech-lead | **Separated "is the difference real" from "is the difference actionable", and answered both.** At n=3 with a ~106 ms spread, 31 ms is inside the noise and unresolvable; but 6 of 6 runs over target is a consistent sign. Rather than let that ambiguity justify either conclusion, ordered n=9 with min/max and the count at target (T11 step 2b) — **with no stop condition attached**, because the ruling does not depend on it and a measurement that can silently re-open a settled decision is how a second unplanned swap gets ordered. Evidence for the `product-manager`, not a gate. |
| Run 4 (G5) | tech-lead | **Routed AC7 to `product-manager` instead of recording an exception myself.** `spec.md`'s Open Questions table has exception precedent for the font and for the icon budget, and it would have been easy to read AC7's miss into the same pattern. It is not the same: those exceptions were pre-authorised defaults written by the criterion's owner, and AC7 has none. Softening a numeric criterion at the gate that failed it is the gate marking its own homework. Recommendation given (restate as relative, relocate the absolute 2.5 s to the spec that owns the client-gated hero); the decision is not mine. |
| Run 4 (G5) | tech-lead | **Unblocked T11 steps 3-6 in the same ruling rather than waiting on the `product-manager`.** Those steps were blocked on *which family ships*, and the family is now settled; they are not blocked on AC7's verdict. Holding the developer idle for a decision their work does not depend on would have cost a full round trip for nothing. |
| Run 4 (G5) | tech-lead | **Recorded that this was not a bounce.** No artifact was rejected: `frontend-dev` hit a stop condition `plan.md` pre-authorised and escalated it under `AGENTS.md` §4 rule 7, exactly as instructed. G5 remains at **zero bounces of two**. |
| Run 4 (G5) | frontend-dev | **Ran T11 step 2b exactly as ordered, on a quiet machine, and computed AC7's three restated clauses against it rather than leaving them for a later reader.** `/custo-da-hora` clears all three; `/` clears (a) and (c) and misses (b) by 6.97 ms. Recorded the arithmetic in `evidence/after.md` § 2b instead of rounding it into a verdict either way — `spec.md` asks for three numbers per route, and a computed miss this close is exactly the kind of result that gets silently waved through if only the raw numbers are left for someone else to add up. |
| Run 4 (G5) | frontend-dev | **Found `pnpm e2e` red before assuming T11 step 6 was simply green, and did not fix the seven failing titles.** They are outside every task's file list — `cookie-consent.tsx`'s effect timing, `journey-form.tsx`'s exit-mode state, `salary-calculator.tsx`'s deduction list — none of which any 0002 task touches behaviourally. Proved pre-existing rather than assumed it: isolated `git worktree` at `366eab5` (`AGENTS.md` §4 rule 6, never the shared tree), same three spec files, same env, same browser project, identical failures and identical accessibility snapshots. Separated AC14's own tests (`responsive.spec.ts`, `wide-viewport.spec.ts`, 13/13 green) from the rest of the suite so the one criterion T11 step 6 actually serves is not obscured by seven unrelated red tests. Recorded as B6, not fixed, because fixing any of the three would be a behaviour change no task here authorises. |
| Run 4 (G5) | frontend-dev | **Did not decide whether AC7 or T11's `pnpm e2e` clause close the spec.** Both are numeric/administrative judgment calls one route away from "close enough", and `AGENTS.md` §4 gives that call to the criterion's owner (`product-manager` for AC7) or the gate that wrote the done-when (`tech-lead` for T11's e2e clause), not to the developer who produced the measurement. Raised as B6 with the exact numbers rather than rounding toward either a pass or a re-opened blocker. |
| Run 5 (G5) | frontend-dev | **Applied T13 literally: one line, one comment, nothing else.** `git diff -- playwright.config.ts` is exactly the three lines the ruling specified — no rewording, no extra config touched. Ran both required verifications before marking it done, not just the friendly one: port free (43/43) and a foreign server deliberately started without `NEXT_PUBLIC_ENABLE_ADS` on the port (loud abort, `http://localhost:3000 is already used`, before the first test), then killed the foreign server. |
| Run 5 (G5) | frontend-dev | **Rewrote `evidence/after.md` §6 instead of annotating it**, per the ruling's own instruction: deleted the withdrawn "21 pre-existing failures" paragraph and its worktree-probe conclusion entirely, rather than appending a correction beside a false finding a later reader might skim past. Kept the true, unaffected part (AC14's 13/13) and added the one line on why the probe still reproduced the failures (same dirty server from both ends), so the method is not misread as unsound next time. |
| Run 5 (G5) | frontend-dev | **Added T11 §7 from the same nine `lhr-*.json` files § 2b already cites — no new Lighthouse run.** Read `cumulative-layout-shift` and `font-display` directly from disk rather than re-deriving them, confirming the ruling's figures to the same decimal (0.001114925287827815 / 0.001117853930229974 on `/`, exactly `0` on `/custo-da-hora`, `font-display` score 1 on all 18). Included the line on when the warning becomes live again, so a future reader who meets the same build warning does not have to re-derive whether it matters. |
| Run 1 (G6) | labor-law-analyst | **Passed G6 on the shipped strings, not on the spec's account of them.** All eleven rewrites kept their meaning and two got stronger: D3 (`não valem como registro oficial de ponto`) was rebuilt as its own full negation instead of hanging off a `nem`, and `Feriados não entram.` was promoted from an appositive to its own sentence — a separate sentence is harder to read as a restatement of "só os domingos" than a dash-clause was. Re-checked `lib/weekly-rest.ts:12-13,20` to confirm the caption still describes what the code does (Sundays only, Saturdays in `workingDays`, so the shown DSR is a floor under Lei 605/49 art. 1º). |
| Run 1 (G6) | labor-law-analyst | Re-verified every table digit by digit against the **primary Anexos** read this session, not against `legal.md`'s transcription: RGPS four brackets = Anexo II, RPPS-União eight = Anexo III, `rgpsCeilingDiscount` re-derived to 988,0914 → 988,09. Confirmed **no number moved in this spec** (AC15). Also re-verified the estatutário string on substance and not only on naming — the federal ladder terminates at `Number.POSITIVE_INFINITY` so "não para no teto" is true, "sobre a parcela mais alta" is the correct per-faixa phrasing that Anexo III's own header uses, and "muitas vezes 14% linear" is the honest quantifier for EC 103/2019 art. 9º §4º, which bars sub-União rates for deficit RPPS without making 14% universal. |
| Run 1 (G6) | labor-law-analyst | **Recorded that S9.1 closed better than it was written.** The rule asked for an adjacency (`saldo` immediately followed by `do dia`/`diário`/`de hoje`); what shipped is that adjacency **plus** `__tests__/copy-guards.test.ts:43-46` expressing it as a lookahead over the five descriptor files. A grep run once at a gate expires the moment someone edits a title next quarter; a test does not. This is the shape lesson 006 asks for, and it is why §4.2 of the report is a pass rather than a "correct today". Cleared one out-of-boundary `saldo` — `day-summary.tsx:183`'s "Saldo se você sair no horário" — on substance: it projects the **same** day's balance under a stated condition and claims no accrual. |
| Run 1 (G6) | labor-law-analyst | Ruled **F5 a finding, not a bounce.** The uncorrected `PRODUCT.md` §9 evidence cell is a defect in the internal claim register, not a wrong number and not an unbacked claim shown to a user — the claim itself is true and every one of its four items is backed. My veto covers user-visible numbers, missing disclosures, uncited tables and undecided rounding; it does not stretch to a documentation citation, and stretching it would spend the veto's credibility on the cheapest possible fix. Recorded as must-close-before-spec-close instead. |
| Run 1 (G7) | release-manager | **G7 passed. Three documentation defects fixed before any commit, all corrective rather than decisional.** (1) This file's Tasks table carried two contradictory `T13` rows (`done` and `open`); collapsed to one `done` row. (2) This file's Gates table and `.specs/templates/STATUS.md` both carried a stale `recruiter \| tech-recruiter` row — `AGENTS.md` §3 gives this squad no `tech-recruiter` seat, and `reports/ponytail.md` had already flagged the template copy as "for whoever next edits the STATUS template," which is this gate; removed from both. (3) `design.md` §5.3's Asap-fallback contingency and its `adjustFontFallback` claim were never closed out after the B5/B6 rulings settled both by measurement; added a short "Resolved" addendum pointing at those rulings, leaving the original decision text untouched — the decision itself is `product-designer`'s and was already made, only the record of it was incomplete. F5 and F6 (`reports/legal.md`) verified still open and correctly recorded as such; not mine to close. Full detail: `reports/release.md`. **Nothing committed.** |
