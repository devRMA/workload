# QA — 0001-foundation

**Verdict: n/a**

## Reason

`0001-foundation` has no diff to review. Verified independently before recording this — not
taken on `tech-lead`'s word (`AGENTS.md` §4 rule 5; the reviewer writes its own verdict):

- `git log --oneline --follow -- .specs/0001-foundation/spec.md` shows one commit,
  `366310b docs: give the repo an operating contract for its AI squad` — the commit that
  introduced the spec pipeline itself, not a build commit.
- `git log --oneline --diff-filter=A -- lib/payroll.ts` shows `85c3671
  fix(payroll): use the 2026 tax tables and round money correctly` as the file's own history,
  predating the squad's contract commit. Checked against the full reverse log
  (`git log --oneline --reverse`): `85c3671` sits at line 68, `366310b` at line 125 — the code
  existed roughly sixty commits before the spec pipeline did.
- `git log --oneline 366310b.. -- app components lib hooks` lists five commits after the
  pipeline began (`4b9572d`, `1b86421`, `7d3697d`, `724bb48`, `cfdfc6e`). Read each commit
  message in full: all five are LCP, product-claim, legal-wording, icon-library and font-swap
  work that names its own spec context (`design-taste-preflight`, an LCP fix) — none names
  `0001` or `foundation`, and none is plan-tracked under `.specs/0001-foundation/plan.md`.
  No commit in the repository's history is attributable to this spec.

`spec.md`'s acceptance criteria (AC1–AC20) confirm the same thing from the artifact side: every
row's "How it is verified" column names a test file or a grep that already exists and already
passes against the shipped tree (`__tests__/work-calculator.test.tsx`,
`__tests__/legal-tables.test.ts`, `vitest.config.ts` thresholds, and so on) — these are
verification criteria written *against* delivered code, not build criteria a `frontend-dev` task
list satisfies going forward. `plan.md`'s 27 tasks are all marked `done` in `STATUS.md` with no
task carrying an open state, and the plan's own preamble says it is "written against the
`.specs/README.md` contract" for a rebuild, not a forward build order.

A correctness review, a test-suite read, and a coverage check all need a diff to read. There is
none: `qa-engineer`'s three input surfaces — "the diff and the touched files" — are both empty
for this spec.

## What stands in for the gate

- **Coverage bars (§9):** already enforced continuously by `vitest.config.ts`'s per-area
  thresholds (100% `lib/**`/`hooks/**`, 90% `app/**`/`components/**`), which fail the run on any
  regression regardless of which spec touched the code last. AC16 names this explicitly. Nothing
  in this spec's absence of a diff weakens that enforcement.
- **The worked legal examples (§9's other duty of this role — checking `legal.md`'s examples are
  asserted to the centavo):** covered by `reports/legal.md` in this same spec folder, `passed`,
  written by `labor-law-analyst` at G6 law-check (the one G6 gate here that *did* run, because it
  reviews the numbers against the norm rather than a diff against a plan).
- **A future correctness/coverage/craft review of this code**, if anyone wants one: that is a
  new, explicitly scoped QA pass over the calculator as it stands — not a substitute for this
  gate, and not started here unprompted.

## If this spec is ever reopened with a diff

Reviewed in full, per `AGENTS.md` §8/§9: every acceptance criterion (AC1–AC20) walked against its
named test, coverage read per area (never aggregated), the CSS-override rule applied to any
utility fighting another rule, every legal constant checked for its source comment, `plan.md`'s
tasks checked against the tokens/strings/constants actually built, and the code-craft checklist
(naming, comments, atomic placement, strict TypeScript, `lib/` boundary, `cn()`, reuse, motion's
reduced path) applied file by file.

## Scope

- Diff reviewed: none — `0001-foundation` produced no code change; verified against `git log`,
  not asserted.
- Files touched by this report: this file only.
