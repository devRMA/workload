# 0005 — release report

> Owner: release-manager · Gates: `docs` (G7), `release` (G8, commits only — push/PR pending human approval)

## Verdict

**pass** — docs gate clean, six commits staged and independently verified, each green on its own
(build + lint + typecheck + unit tests; the fourth also carries the full 98/98 e2e suite). No push,
PR or remote operation has happened. Human approval is requested before any of that (see § Human
approval).

---

## Docs gate (G7)

### `docs-check.mjs`

First run, before any fix:

```
ok    AGENTS.md presente
ok    CLAUDE.md presente
ok    PRODUCT.md presente
ok    DESIGN.md presente
ok    README.md presente
ok    10 agents com symlinks íntegros
ok    memória íntegra (23 lições ativas)
ok    5 spec(s) consistentes
aviso spec 0005.../design.md: ainda contém placeholders do template (non-numeric)
aviso spec 0005.../copy.md: ainda contém placeholders do template (file backing any factual claim)
aviso spec 0005.../plan.md: ainda contém placeholders do template (non-numeric)
FALHA lição 021-...md: placeholders do template não preenchidos

1 falha(s), 3 aviso(s)
```

**The one failure, diagnosed rather than annotated around:** the script's leftover-template regex
(`/<[a-z ]+>/`, applied to everything after lesson 021's `## What happened` heading) matched the
*illustrative* `--spacing-<name>` inside a sentence the lesson uses to explain its own rule — not
an unfilled placeholder. Confirmed with a one-line `node -e` extracting the exact match: `['<name>']`.
This is the same defect class lesson 021 itself describes (a guard's boundary colliding with
legitimate compliant text), so its own rule 1 applies: reword the mandated text into a form the
pattern is blind to. Changed `--spacing-<name>` → `--spacing-*` in lesson 021's body only (meaning
unchanged — both are generic-form illustrations). Re-ran:

```
ok    ... (all eight `ok` lines unchanged)
aviso spec 0005.../design.md: ainda contém placeholders do template (non-numeric)
aviso spec 0005.../copy.md: ainda contém placeholders do template (file backing any factual claim)
aviso spec 0005.../plan.md: ainda contém placeholders do template (non-numeric)

0 falha(s), 3 aviso(s)
```

**The three remaining warnings, verified rather than dismissed:**

- `design.md` and `plan.md`'s `<non-numeric>`: all six occurrences (`design.md` ×3, `plan.md` ×3)
  are the guard-test boundary's own generic-form illustration — `` --spacing-<non-numeric> `` —
  describing what the guard rejects, in prose that explains a shipped rule. Grepped and read each
  occurrence in context (`design.md:654,853,886`; `plan.md:158,745,747`); none is a leftover spec
  template field.
- `copy.md`'s `<file backing any factual claim>`: this is the template's own unfilled `Evidence:`
  field, left blank because the `copy` gate was correctly never invoked — `spec.md` and `STATUS.md`
  both record "no user-visible string changes," and the gate table's `copy` row reads `not required`.
  Confirmed against the gate table rather than assumed from the filename.

Both categories are warnings, not failures, by the script's own design, and both are now recorded
as verified rather than left as noise for the next release-manager to re-derive.

### Truth checks (`AGENTS.md` §7, no script can run these)

1. **`STATUS.md`'s bounces match what happened, with run numbers.** Two bounces recorded: `spec` (G1)
   run 1 → run 2 (the B4 amendment), `design` (G3) run 1 → run 2 (B8, one sentence). Both confirmed
   against the gate table and the decisions log — neither is a paraphrase, both cite the run number.
2. **Artifacts describe what was built, not what was intended.** Read every task's line in the Tasks
   table against the actual diff: T5's migration count (204 utility occurrences, not the triage
   brief's ~204 estimate treated as exact — `spec.md` deliberately binds the boundary, not a count,
   per lesson 006), T6's DS4 stacking, T7's dual-icon D2 fix, T8's `DESIGN.md` rewrite, T9's evidence
   — all match the diff inspected commit by commit below. Where the build diverged from `plan.md`
   with `tech-lead`'s blessing (T8 reordered ahead of T6/T7; the DS4 stacking pixel-move that
   `spec.md`'s original "zero pixels" prohibited), the spec itself was amended (run 2) rather than
   the memory of the divergence living only in `STATUS.md` — confirmed by reading `spec.md`'s current
   § Out of scope against AC3/AC6, per lesson 019's own verification method.
3. **No `DESIGN.md` system change landed without `DESIGN.md` saying so.** The named `--spacing-*`
   scale is gone from the shipped system; `DESIGN.md`'s Layout section names the Numeric Scale Rule
   and the frontmatter `spacing:` block is numeric-keyed. Confirmed by grep: zero surviving
   `--spacing-[a-z]` references anywhere in `DESIGN.md`, frontmatter included.
4. **No legal table changed, so the `legal.md`/`README.md`/`lib/legal-tables.ts` three-way agreement
   check does not apply here** — `legal.md` §7 and `reports/legal.md` both confirm zero number, rate,
   bracket or table changes; `lib/legal-tables.ts` is untouched in every commit (verified per-commit
   below).
5. **Every README claim still sits inside `PRODUCT.md` §9.** README's coverage figures (100%
   `lib/`/`hooks/`, 90% `app/`/`components/`), E2E claim, and Lighthouse budget line are unchanged by
   this spec and still match `PRODUCT.md` §9's table verbatim. No new claim was added.
6. **`.specs/INDEX.md`'s 0005 row.** Was stale (`product-designer`, the G3 holder, left over from
   before G6 closed). Corrected to `release-manager`; state stays `in-progress` (G9/G10 remain).

### Lessons

18 through 23 (six lessons, five agents, written concurrently across G2/G3/G4/G5 of this spec) all
carry the four required sections, are all indexed in `LESSONS.md`, and none duplicates another —
each names a distinct failure mode (rendering-condition-blind rules, an absolute scope exclusion,
a task gated on another task's file, a guard colliding with its own mandated text, a floor
calibrated without a worked measurement, and a prohibition guard never run against compliant text).
Active count: 23/30, well under the cap. **No lesson has reached 3 confirmations** — the highest in
the whole index is 1 (001, 006, 012) — so nothing is due for promotion at G10.

### Stray file found, not committed

`.agents/memory/archive/019-probe.md` is untracked: a near-empty, all-sections-blank lesson file
titled `__probe__`, `spec: 0000`, whose id (019) collides with the real, indexed lesson 019. It is
not a deliverable of any gate in this spec, is not referenced by `LESSONS.md` or any report, and
reads as leftover output from testing `lesson.mjs`'s retire path. Left untracked rather than deleted
— `AGENTS.md` §4 requires human approval before deleting anything outside the spec's declared scope,
and this file is outside it either way. Flagging it here for that approval; not staged into any
commit.

---

## Commits

Six commits, each one coherent idea, each verified to build, lint, typecheck and pass its unit tests
**in an isolated `git worktree`** (never the shared tree, per `AGENTS.md` §4 rule 6) checked out at
that exact commit — not inferred from the final tree. Two files (`components/organisms/app-header.tsx`,
`components/organisms/cookie-consent.tsx`) carry two unrelated ideas on overlapping lines; both were
split by hand into an intermediate, migration-only version for the tokens commit and the full
behavioural change for their own commit, with each intermediate state independently test-run before
being trusted. `playwright.config.ts` similarly carries both this spec's T1 changes and one
pre-existing comment; the comment was temporarily restored for the instrumentation commit and
removed again in the `chore(comments)` commit, so the comment-removal commit's diff for this file is
exactly two lines.

### 1. `09dfaab` — `test(e2e): target a production build and add dark-theme, legibility and inward-collapse coverage`

**Files:** `playwright.config.ts`, `tests/e2e/dark-hydration.spec.ts` (new), `tests/e2e/disclosure-legibility.spec.ts` (new), `tests/e2e/responsive.spec.ts`, `scripts/geometry-dump.mjs` (new), `scripts/spacing-migration-proof.mjs` (new).

**Idea:** the instruments this hotfix needs, landed first and seen red against the unfixed tree
(T1, T2, T4 — AC1, AC6, AC8, AC9). `playwright.config.ts` now serves from `pnpm build && pnpm start`
locally (matching CI) with a configurable `PORT`, and a fourth project runs the suite under
`colorScheme: "dark"`.

**Verified:** `pnpm typecheck` clean on the working tree before commit. `pnpm e2e` is expected red
at this commit (the new specs assert against code not yet fixed) — by design, this is AC1/AC8's
deliverable; `pnpm build`/`pnpm check` (which does not run e2e) are unaffected by this commit alone
and were reverified green at commit 4 below, once the fixes land.

### 2. `486a2b3` — `fix(tokens): empty the colliding --spacing-* namespace, migrate to the numeric scale`

**Files:** `app/globals.css`, `DESIGN.md`, `__tests__/spacing-guards.test.ts` (new), and 22
migration-only component files: `components/atoms/{alert-banner,label,modal-dialog,progress-ring,
stat-box}.tsx`, `components/molecules/{copy-button,date-time-input,extra-entry-list,extra-entry-row,
field,regime-field}.tsx`, `components/organisms/{app-header,calculator-views,cookie-consent,
day-summary,hero-panel,journey-form,salary-calculator,tax-details-panel,work-calculator}.tsx`,
`components/templates/{calculator-layout,calculator-page}.tsx`. (`app-header.tsx` and
`cookie-consent.tsx` here carry migration-only intermediate content; their behavioural changes are
commits 3 and 4.)

**Idea:** the D1 root fix — delete the named `--spacing-*` scale so it can never again shadow
Tailwind's container scale, migrate every consumer to the numeric scale (zero rendered pixels move),
add the guard test that fails the build if the namespace is ever repopulated, and reconcile
`DESIGN.md` in the same commit because the guard's own cases 4-5 read `DESIGN.md` — deferring that
reconciliation to a later commit would have left this commit's own new test red.

**Verified in an isolated worktree at this exact commit:** `pnpm install` (fresh, real node_modules —
a first attempt with a symlinked `node_modules` failed Turbopack's build with an unrelated "symlink
points out of filesystem root" error, a verification-method artifact, not a code defect), `pnpm
typecheck` clean, `pnpm lint` clean (139 files), `pnpm vitest run` — **57 files, 498 tests, all
green** (`spacing-guards.test.ts` included, all 5 cases), `pnpm build` — compiled, all 10 routes
generated.

### 3. `7a3da2b` — `fix(a11y): stack the granular-consent rows below sm for legible captions`

**Files:** `components/organisms/cookie-consent.tsx` (the remaining 2-line diff: `flex-col
items-start ... sm:flex-row sm:items-center` on the two consent rows).

**Idea:** T6 — the LR2/LR4 fix `legal.md` compelled at 390px for the two granular-consent rows,
isolated from the token migration that shares the file. Zero delta at 1440 and up; no control,
string, token or animation added (`spec.md`'s B4 amendment, B7's constraint honored).

**Verified:** diffed in isolation against the migration-only baseline to confirm it is exactly the
two `className` changes and nothing else; `pnpm typecheck` clean.

### 4. `0df070a` — `fix(a11y): render both theme icons server-side and toggle by class (D2)`

**Files:** `components/organisms/app-header.tsx` (the remaining diff: drop `resolvedTheme`, render
both `IconMoon`/`IconSun` with `dark:hidden`/`dark:block`, read `.dark` from the DOM in the click
handler), `__tests__/app-header.test.tsx` (full rewrite — the intermediate migration commit
intentionally left this file untouched, since the original test already passed against the
migration-only component).

**Idea:** T7 — the confirmed root cause of D2 (`app-header.tsx:66`, `resolvedTheme` undefined on the
server, resolved client-side only on first render, mismatching under a dark system scheme). CSS
decides which glyph shows; nothing is left for client state to correct post-hydration.

**Verified in the same isolated worktree, at this commit:** `pnpm vitest run` — **58 files, 504
tests, all green**. `pnpm lint` clean. `pnpm build` clean. **Full `pnpm e2e` — 98/98 passed**,
closing AC1, AC7, AC8 and AC9 for good (first attempt showed 6 unrelated `google-tracking.spec.ts`
failures from a stale pre-build missing the ad-enabling env vars `playwright.config.ts`'s own
`webServer.env` sets; rebuilding with those same vars cleared it — a artifact of my own manual
pre-build step, not a defect in the commit).

### 5. `0290a26` — `chore(comments): remove narrative comments and enforce the rule with a test`

**Files:** `lib/utils.ts`, `components/atoms/google-ad.tsx`, `playwright.config.ts` (the 2-line
comment only), `__tests__/comment-free-code.test.ts` (new), `AGENTS.md` (the §8 rewrite hunk only —
the icons-row correction in the same file is a separate, unrelated fact fix and lands in commit 6).

**Idea:** the user's cross-cutting, mid-pipeline instruction that every comment come out of the
codebase, enforced by a test. **Not part of 0005** — three reviewers (`qa-engineer` F3, `labor-law-
analyst` F1, `web-standards-auditor`) each flagged the `lib/utils.ts`/`google-ad.tsx` comment removal
as an AC11 "unrelated file" risk if it landed inside 0005's own commits. It does not: every 0005
commit above (`git diff --stat` against each) shows `lib/` untouched.

**Verified:** `pnpm vitest run __tests__/comment-free-code.test.ts` green (parses every file in
`app/`, `components/`, `hooks/`, `lib/`, `scripts/`, `__tests__/`, `tests/` and the root config files
with the TypeScript compiler; zero offenders).

### 6. `af302e6` — `docs: record spec 0005, its lessons, and reconcile stale references`

**Files:** `.agents/memory/LESSONS.md`, six new lesson files (018-023), `.specs/0005.../{STATUS,
design,plan,spec}.md`, `.specs/0005.../reports/{audit,legal,ponytail,qa}.md`, `.specs/INDEX.md`,
`AGENTS.md` (the icons-row hunk only).

**Idea:** the durable record — every G1-G6 artifact and report, the lessons this cycle wrote, and two
stale-doc corrections found while closing this gate (AGENTS.md's Icons row still said `lucide-react`
after the swap to `@tabler/icons-react`; `.specs/INDEX.md`'s 0005 holder still said `product-designer`
after G6 closed). Matches the shape of the 0002 precedent commit (`804144b`).

**Verified:** `node .agents/tools/docs-check.mjs 0005-...` — 0 failures, 3 verified-false-positive
warnings (above).

### Final, whole-tree verification

`HEAD` (`af302e6`) checked out in a fresh isolated worktree: `pnpm check` — **58 files, 504 tests,
all green**; `pnpm build` — clean; `pnpm e2e` (production build, both `NEXT_PUBLIC_*` configs CI
uses) — **98/98 passed**. Matches `reports/qa.md`'s own G6 baseline exactly (58 files/504 tests,
98 e2e).

---

## Attribution

Every commit's trailer:

```
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

Read from this session's own system prompt (`You are powered by the model named Sonnet 5`), not
copied from `AGENTS.md`'s example (`Claude Opus 5`) or hardcoded — the two are different models.

---

## Human approval

**Not yet requested for push/PR/CI** at the time this report was written. Per `AGENTS.md` §10 and
this agent's own charter: no push, PR, or remote git operation happens without an explicit, freshly-
given yes — the six commits above exist only in the local branch `fix/design-taste-preflight`.
Requesting that approval now, alongside this report, before any `git push` or `gh pr create` runs.

---

## PRs

**Not created — pending the approval above.** Once approved, the plan is a single PR for this branch
(the stack ordering §10 asks for — foundation → tokens → components → composition → copy → docs —
is already expressed as the six commits above; 0005 itself is one unit of work sitting **on top of**
the existing open stack, per `STATUS.md`'s own merge ruling: authored on 0002's branch, not folded
back into #35). Numbers and dependency will be recorded here once opened.

---

## CI

**Not yet run** — no PR exists yet for CI to attach to. Every check will be driven to green with
`.agents/tools/pr-preview.sh` once the PR is opened, per `AGENTS.md` §10 ("every PR must be green
before the preview gate").

---

## Preview URL

**Not yet available** — depends on the PR existing. Will be recorded here once `pr-preview.sh`
reports it, ahead of G9.

---

## Merge-block condition (carried from the G6 triage brief)

**Lifted, as of this commit stack existing locally.** The G6 triage brief (`STATUS.md` § Tech-lead
triage brief of 0002) held the entire open PR stack (#32→#37, plus 0002's branch) from merging,
because PR #35's `--spacing-*` collision would have shipped a 64px `PRODUCT.md` §4 legal disclosure.
Verified directly, not inferred: `main`'s footer resolves against stock `--container-3xl` (768px,
confirmed by `labor-law-analyst` at G6 and independently by every worktree build above), and this
spec's four commits (2-4) reproduce that same resolution through the numeric scale rather than the
collided one. **The condition is lifted once these commits merge** — it is not lifted by this report
existing, and remains binding on this agent until the branch is actually merged.

---

## Carried findings (not fixed here, named owners)

- **DS3** (`components/organisms/salary-calculator.tsx:125`, ≈24.3 characters per rendered line at
  390px) — a real LR2 failure, ruled **non-blocking** by `labor-law-analyst` at G6 (`reports/legal.md`
  §6): causation, remedy location (`alert-banner.tsx`, a shared atom with other consumers) and
  falsifiability all point away from fixing it inside this spec. **Owner: `product-manager`**, to
  open a new spec starting from these numbers, checked against the atom's other consumers.
- **0002's B6** — `legal-tables.ts:48`'s `sourceUrl` names a commercial aggregator rather than the
  DOU/gov.br text of Portaria Interministerial MPS/MF nº 13/2026. Not a rejection of 0005 (`lib/` is
  out of reach under AC11/L3, and the `source` string itself correctly names the norm). **Owner:**
  the next spec that legitimately opens `legal-tables.ts` (already tracked at `.specs/0003-citation-
  registry`).

Neither finding has a fix in any commit above, on purpose.

---

## G10 — close-out (`tech-lead`, appended after this report was written)

Two corrections to the record above, and the disposition of everything it carried forward. The
sections § Human approval, § PRs, § CI and § Preview URL were written before G8 completed and are
stale as printed: approval was given, **seven** commits landed on `fix/design-taste-preflight`
(the six listed above plus `ba94c2d docs: add the G7/G8 release report for spec 0005`), **PR #39**
is open with CI green, and G9 ran against the preview at
`https://workload-8kqr9212j-devrmas-projects.vercel.app/`. The commit-by-commit verification above
stands unchanged; only the delivery status moved.

**The merge-block condition is discharged.** § Merge-block condition above lifted it "once these
commits merge"; they now exist as PR #39 on top of the stack, and G9 reproduced the repaired
geometry on the deployed artifact itself — footer 358/768px, dialog 358/512px, the `PRODUCT.md` §4
paragraph at 52.4-56.7 characters per line, both themes, both routes, 390 and 1440, with LR3
verified against the raw HTTP response body. **One condition survives: the stack merges whole, with
PR #39 at its tip.** Merging #35-#37 without 0005's commits re-arms the 64px disclosure exactly.
The merge itself is still a human-approval point (`AGENTS.md` §10).

**Carried findings, now with landing places** (full reasoning in `STATUS.md` § G10):

| Finding | Lands in | Owner |
|---|---|---|
| `og:image`/`twitter:image` resolving to the Vercel branch-alias host instead of `metadataBase` (`app/opengraph-image.tsx`, `app/twitter-image.tsx`) | `.specs/0004-lcp-render-delay/`, as a second and independently falsifiable criterion, with 0004's title and scope amended at G1 | `product-manager` |
| Lighthouse `best-practices`/`seo` below budget on `*.vercel.app` | no budget change; the G9 procedure in `.agents/agents/web-standards-auditor.md` now states when those two categories are reported-not-scored and requires the attribution proved per failing audit | `web-standards-auditor` |
| `lib/legal-tables.ts:48` aggregator `sourceUrl` (0002's B6 / 0003's F4, flagged a third time at G9) | `.specs/0003-citation-registry/`, where its STATUS now records the G9 sighting | `product-manager`, then `labor-law-analyst` |
| DS3, `AlertBanner` at ~24.3 characters per line at 390 | `.specs/0006-salary-alert-legibility/`, open and at G2 | `labor-law-analyst` |

**Lessons.** § Lessons above reported 23 active and none due for promotion; both moved after it was
written. 006 and 012 reached three confirmations during this cycle and are promoted into
`AGENTS.md` §5 ("How a criterion is written"); 008 was merged into 012 and 021 into 022 before
promotion. Active ledger: **20 / 30**.

**`.agents/memory/archive/019-probe.md`** — no longer present at G10. It was untracked and never
committed, so its disappearance leaves no trace in git and nothing in the ledger referenced it; the
archive now holds exactly the four lessons retired at this gate. Not deleted by `tech-lead`, and no
approval was owed either way. Recorded so a reader of § Stray file above is not left looking for it.
