# 0006 — release report

> Owner: release-manager · Gates: `docs` (G7), `release` (G8)

## Verdict

**pass** — docs gate clean, four commits made and independently verified (each green on its own),
pushed to `fix/design-taste-preflight` under the human's standing approval for this branch, PR #39
kept its number and place in the stack, CI green, preview loads. Handing to `web-standards-auditor`
and `labor-law-analyst` for G9.

---

## Docs gate (G7)

### `docs-check.mjs`, before any edit

```
ok    AGENTS.md presente
ok    CLAUDE.md presente
ok    PRODUCT.md presente
ok    DESIGN.md presente
ok    README.md presente
ok    10 agents com symlinks íntegros
ok    memória íntegra (26 lições ativas)
ok    6 spec(s) consistentes
aviso spec 0006-salary-alert-legibility/copy.md: ainda contém placeholders do template (file backing any factual claim)
aviso spec 0006-salary-alert-legibility/plan.md: ainda contém placeholders do template (project)

0 falha(s), 2 aviso(s)
```

Zero failures. Both warnings verified rather than dismissed:

- **`copy.md`'s unfilled `Evidence:` field.** Correct: the `copy` gate never ran — `spec.md` and
  `STATUS.md` both record no user-visible string changed, and the Gates table's `copy` row reads
  `n/a — no string changes`. The template stub is this spec's actual, honest state.
- **`plan.md:210`'s `<project>`.** Not a template leftover: it is a filename-pattern placeholder in
  prose (`` `test-results/legibility/<project>-<surface>-<viewportWidth>-<theme>.json` ``), documenting
  a path shape, the same generic-illustration pattern the script's regex has tripped on in prior
  specs (0005's `<non-numeric>`). Grepped and read in context; not an unfilled spec field.

Re-run after the two `STATUS.md`/`INDEX.md` truth fixes below (§ Truth checks, item 1): unchanged,
0 failures, same 2 warnings.

### Truth checks (`AGENTS.md` §7, no script can run these)

1. **`STATUS.md`'s own header had gone stale, and `.specs/INDEX.md`'s holder with it — found and
   fixed, not merely read.** The file's top block still named `qa-engineer`/`refactor-scout`'s **G6
   re-review, run 2** as the pending next step, while the Gates table two lines below it already read
   both **closed — pass, run 2**, and eight decisions-log entries below that recorded the run-2 passes
   in full. The header was never updated when run 2 actually closed. `docs-check.mjs` cannot see this
   — it checks that `STATUS.md` is internally well-formed, not that its two halves agree. Corrected
   the header to name `release-manager` as next agent and summarize G6's actual closure;
   `.specs/INDEX.md`'s 0006 row carried the same staleness (holder: `labor-law-analyst`, from before
   G2 handed off) and is corrected to `release-manager`.
2. **`STATUS.md`'s bounces match what happened, with run numbers.** Three bounces recorded and
   verified against the decisions log: `spec` (G1) run 1 → run 2 (the six `legal.md` §10.2
   amendments and the human's D-Q1 decision); `design` (G3) run 1 → run 2 (the 2560-viewport
   root-font-size correction, `design.md` §§2/3.2/4.1/4.2); `build`/`qa`/`ponytail` (G6) run 1, one
   round trip counted as one bounce because `qa-engineer` and `refactor-scout` rejected the same
   finding and both reports were read to completion before routing (`AGENTS.md` §4 rule 4). All three
   are below their two-bounce ceiling.
3. **Artifacts describe what was built, not what was intended.** Read the Tasks table against the
   actual diff: T3's atom change matches `design.md` §5.1's intended shape exactly (icon into the
   title row, `p-4` → `px-3 py-4`, nothing else moved) — confirmed against `git diff
   components/atoms/alert-banner.tsx`. T1/T5/T6's e2e refactor matches `plan.md`'s and the G6
   ruling's description — confirmed against `git diff tests/e2e/`. Where the build diverged from
   `design.md` with `tech-lead`'s blessing (the 2560 root-model correction), `design.md` itself was
   reopened and corrected at G3 run 2 rather than left silently wrong — verified via `git diff
   DESIGN.md` for the system-doc half and via the spec folder's own run-2 header for the artifact
   half.
4. **No `DESIGN.md` system change landed** — no token, spacing step, type step, curve or duration
   moved (`design.md` §12.1, re-confirmed against `git diff DESIGN.md`: exactly the Alerts entry
   (2 lines) and one new paragraph at the root-ramp declaration point (2 lines), nothing else).
5. **No legal table changed.** `git diff --stat -- lib/` for this session's own commits is empty;
   `legal.md` §8 and `reports/legal.md` §6 both record that `lib/legal-tables.ts` was never opened.
6. **Every claim in `README.md` still sits inside `PRODUCT.md` §9.** `git diff README.md PRODUCT.md`
   is empty for this spec — verified, not assumed, since neither file appears in `git status`.
7. **Lessons.** `LESSONS.md` at 26/30 (was 21/30 before this spec). Five new lessons (026–030), each
   with all four required sections (`What happened`, `Why it happened`, `The rule`, `How to verify`)
   — checked file by file. Four confirmation bumps (016 → 2, 017 → 2, 020 → 1, 022 → 2), each a
   frontmatter-only diff, no rewrite of the rule text. No lesson at 3 confirmations; nothing due for
   promotion at this gate.

**Nothing here was worked around.** The two `docs-check.mjs` warnings are verified false positives
by design of the script's own generic-pattern matching; the `STATUS.md`/`INDEX.md` staleness was a
real gap and is fixed, not annotated past.

---

## Commits (G8)

Four commits on `fix/design-taste-preflight`, each staged by name (no `git add -A`), each verified to
build and pass its own tests before the next was made.

### 1 — `fix(alert-banner): move icon out of the body's text column`

**Files:** `components/atoms/alert-banner.tsx`, `__tests__/alert-banner.test.tsx`

**The idea:** the shipped remedy for LR2a — the icon leaves the flex row it shared with the whole
text block and joins the title row instead; `p-4` tightens to `px-3 py-4`. Chrome spend drops from
66 of 32px budget to 26 (16px root) / 29 (18px root, 2560px and up). Nothing else in the atom moves:
border, icon size, radius, tone, role untouched.

**Verified standalone:** `pnpm check` — 58 files, 506 tests, clean — run in the working tree at this
commit before the next was staged.

### 2 — `test(e2e): bind alert legibility to LR2a/LR2b at all five consumers`

**Files:** `tests/e2e/support/legibility.ts` (new), `tests/e2e/alert-legibility.spec.ts` (new),
`tests/e2e/disclosure-legibility.spec.ts` (refactored onto the shared helpers), `tests/e2e/wide-viewport.spec.ts`
(one new case)

**The idea:** the instrument this spec's outcome depends on. The LR1/LR2/LR3 helpers move out of
`disclosure-legibility.spec.ts` into a shared module (LR2 split into `assertLr2b`; a new `assertLr2a`
and `driveUntil` poller added), and a new spec file drives all five `AlertBanner` consumers through
real user input and measures LR2a/LR2b at 390 and 1440, both themes. `wide-viewport.spec.ts` gains a
chrome-budget sample at 2560/3840, where the root-size ramp makes the spend grow even though the
criteria bind at the two narrower viewports.

**Verified standalone**, in a process-isolated copy (lesson 029 — `rsync` excluding `node_modules`,
`.next`, `.git`; `cp -al node_modules`; `rm -rf .next`; own port; scratch path outside the repository):

- Fresh production build: succeeded.
- `PORT=3151 pnpm e2e` (whole suite): **159 passed, 1 failed** — `[Mobile Safari] › tests/e2e/alert-legibility.spec.ts
  … C5 stays legible at / 390x844 light`, on `driveC5`'s `.check()` of the `MANUAL` radio
  (`locator.check: Clicking the checkbox did not change its state`). This is the same Mobile-Safari
  radio-check flake `reports/qa.md` and lesson 029 already name — not a new defect.
- Re-run of the two touched spec files alone, same isolated copy: **66 passed, 0 failed**, confirming
  the failure above did not reproduce and was the documented flake, not a regression this session
  introduced.
- `pnpm check` in the same copy: 58 files, 506 tests, clean (unaffected — `tests/e2e/**` is outside
  `vitest`'s scope).

### 3 — `docs(design): reconcile Alerts entry, note the LR2a ramp ceiling`

**Files:** `DESIGN.md`

**The idea:** two factual corrections and one new constraint, all confined to the Alerts entry and
the root-ramp declaration — `components/molecules/` → `components/atoms/`; "16px padding" →
16px vertical / 12px horizontal with the icon on the title's line; a new paragraph stating that a
ramp step above 18px would put the atom over its 32px budget without anyone touching it. No token,
spacing step, type step or curve moves — confirmed against `design.md` §12.1 and against the diff
itself (4 lines changed).

**Verified standalone:** `pnpm check` — docs-only change, 58 files, 506 tests, clean.

### 4 — `docs: record spec 0006 and the lessons it paid for`

**Files:** `.specs/0006-salary-alert-legibility/{spec,legal,design,plan,STATUS,copy}.md`,
`.specs/0006-salary-alert-legibility/reports/{qa,audit,legal,ponytail,_template}.md`,
`.specs/INDEX.md`, `.agents/memory/LESSONS.md`, and the nine lesson files (five new, four
confirmation-bumped)

**The idea:** the durable record of the spec — every gate's artifact, the G2 disclosure-domain
ruling and the LR2a/LR2b correction, the G6 bounce and its remedy, the two `STATUS.md`/`INDEX.md`
truth fixes from § Truth checks item 1, and the lessons this build paid for. `evidence/` is
gitignored and was never staged — confirmed via `git status --short` showing no `evidence/` path at
any point in this session.

**Verified standalone:** docs-only, `pnpm check` clean.

**Order and why it is safe:** commit 2 depends on commit 1 (its assertions require the fixed atom's
geometry); commits 3 and 4 are pure documentation with no code dependency on either. Checking out the
branch at any of the four commits, in order, yields a tree that builds and — for commits 1, 3 and 4
— passes `pnpm check`, and — for commit 2 onward — additionally passes `pnpm e2e` modulo the one
named, pre-existing Mobile Safari flake.

---

## Attribution

Every commit ends with:

```
Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
```

Read from this session's own system prompt (`You are powered by the model named Sonnet 5`), not
copied from `AGENTS.md`'s example trailer (which names a different model) and not assumed from a
prior commit in this branch's history (which carries a mix of `Claude Sonnet 5` and `Claude Opus 5`
trailers from earlier sessions).

---

## Human approval

The team lead's task for this session stated explicitly that **the human had already approved the
push and the PR update for this work**, named the branch (`fix/design-taste-preflight`) and the PR
(#39, top of stack #38), and instructed not to ask again, not to open a new PR, and not to renumber
the stack. No new approval prompt was issued; none was needed under that instruction. Push and the
PR-description update both happened under that recorded approval, and both are logged here so the
record does not rely on this session's memory alone.

---

## PRs

Single PR in this round, per the team lead's explicit instruction to keep it at its existing number
and place in the stack rather than open a new stacked PR for this spec's diff:

| PR | Base | Title | State |
|---|---|---|---|
| **#39** | `docs/agent-squad` | fix: close the design pre-flight and the token collision that hid the legal disclosure | `OPEN`, `MERGEABLE`, `mergeStateStatus: CLEAN` |

PR #39 is the top of stack #38 and already carried the 0002/0005 work; this round adds the four
0006 commits above on the same branch. The description was extended with a `0006 — legibilidade dos
alertas` section (what changed, in the PR's own language) and the pre-existing `DS3` debt line under
"Dívida registrada" was struck through with a pointer to the fix, plus three new carried-debt bullets
(X1, D3, DS2/Súmula 172). The existing `0002`/`0005` prose, the verification table and the
`🤖 Generated with [Claude Code](https://claude.com/claude-code)` line were left untouched — not
duplicated, not reworded.

---

## CI

```
E2E Tests                        pass   6m11s
Lint, Type Check & Unit Tests    pass   1m33s
Vercel                           pass   —      Deployment has completed
Vercel Preview Comments          pass   —
```

`gh pr view 39 --json mergeable,mergeStateStatus` → `{"mergeable":"MERGEABLE","mergeStateStatus":"CLEAN"}`.

---

## Preview URL

**https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app**

Fetched and confirmed rendering: title, hero heading, the sample workday breakdown (8h 48m worked,
zero balance), the privacy disclosure and the estimates disclaimer are all present. This is the URL
`web-standards-auditor` and `labor-law-analyst` measure against at G9.

---

## Carried forward, not fixed here

Recorded with their owners so they are inherited rather than rediscovered:

| # | Item | Owner | Where it lives |
|---|---|---|---|
| **X1** | `lib/salary-period.ts:40` and `salary-calculator.tsx:151` attribute a general `weekly × 5` divisor rule to Súmula 431 do TST, whose text covers only the 40h case. The numbers (220/200) are right; the citation is over-extended. | `product-manager`, next spec with scope to open `lib/salary-period.ts` | `spec.md` § Carried debt, `legal.md` §6.4/§10.1 |
| **D3** | `DESIGN.md` § Motion lists `alert` among animating surfaces; the atom has no transition and this spec adds none. | `product-manager`, next spec with scope over `DESIGN.md` § Motion | `design.md` §12.2, `STATUS.md` § Blockers |
| **F2** | The 3px LR2a margin at an 18px root is now a written constraint in `DESIGN.md` (this spec's commit 3), not a code guard — no test can sample a type-ramp band that does not exist yet. | `product-manager`, the spec that next opens the root ramp | `reports/legal.md` §8, `DESIGN.md` § Layout |
| **DS2** | The DSR / Súmula 172 paragraph carries no e2e assertion anywhere in the suite, before or after this spec. Not a regression; not this spec's. | unassigned — flagged so it is not rediscovered from scratch | this report |

## Lessons due for promotion

**None.** No lesson in `LESSONS.md` has reached 3 confirmations. The two closest are 016 and 017
(`tech-lead`, 0002) and 022 and 029 (`all`, cross-cutting), each at 2.
