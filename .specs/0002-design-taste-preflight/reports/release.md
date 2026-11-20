# 0002 — G7 documentation gate

> Owner: release-manager · Run 1

**Verdict: pass.** No commit has been made. This report closes G7 only; G8 (staging, commits,
push, PR) has not started and requires the human's go-ahead at each remote step.

---

## 1. `docs-check.mjs`

```
node .agents/tools/docs-check.mjs 0002-design-taste-preflight
```

```
  ok    AGENTS.md presente
  ok    CLAUDE.md presente
  ok    PRODUCT.md presente
  ok    DESIGN.md presente
  ok    README.md presente
  ok    10 agents com symlinks íntegros
  ok    memória íntegra (17 lições ativas)
  ok    5 spec(s) consistentes

0 falha(s), 0 aviso(s)
```

Clean before and after the truth-level corrections below (re-run after each edit).

## 2. Truth checks (`AGENTS.md` §7) — what a script cannot see

| # | Check | Result |
|---|---|---|
| 1 | Does `STATUS.md` record the cycle that actually happened? | **Yes.** Read start to finish (929 lines). G2 rejected once on B1 and re-passed at run 2; blockers B2 (scope conflict, closed run 3), B3/B4 (tooling gaps, closed run 2 — correctly recorded as *not* bounces, `AGENTS.md` §4 rule 7), B5 (font/LCP stop condition, ruled run 4), B6 (AC7 miss + false e2e finding + font-fallback question, ruled run 5); three triages recorded in full with their reasoning (G2 run 1, G5 run 1, G6 run 1); AC7 restated once by `product-manager` with the restated wording and the reason it is not a bar-lowering; AC10's verification method replaced when Next 16 removed "First Load JS", with both rejected alternatives named. Bounce ledger is explicit everywhere a reader could mistake an escalation for a bounce, and both gates close at their true count (G2: 1 of 2; G5, G6: 0 of 2). |
| 2 | Do artifacts describe what was **built**, not what was intended? | **`plan.md`** — five amendments, each with its own dated section; matches the task table's final state. **`design.md`** — §5.3's Asap-fallback contingency was written before the build and never closed out; it still read as pending. **Fixed**: added a short "Resolved" addendum after §5.3 pointing at `STATUS.md` § B5/B6 rulings — Asap was considered and rejected, Atkinson ships, and the `adjustFontFallback` claim in the same section did not hold for this exact family (measured CLS 0.0011/0.000, cited). Original text left untouched; correction is additive, not a rewrite of the design decision itself (not mine to make). |
| 3 | Did `evidence/after.md` §6's withdrawn e2e finding survive anywhere? | **No.** `evidence/after.md` §6 is genuinely rewritten (confirmed by reading it, not by trusting `qa.md`'s claim): the false "21 pre-existing failures" paragraph is gone, replaced by 43/43, the real cause (`reuseExistingServer` reusing a foreign server with different env), and the one line on why the worktree probe reproduced it anyway. Every other mention of "21 failures" in the repo (`STATUS.md`, `plan.md`, `qa.md`) is explicitly historical — describing what was raised and then withdrawn — never asserted as a live finding. `reports/qa.md` correctly relied on the rewritten §6 and did not inherit the false finding. |
| 4 | Does `DESIGN.md` describe what shipped? | **Yes**, on both counts named. Typeface: §Typography states Google's subsetter drops the `zero` OpenType feature from every family it serves, that `slashed-zero` has been inert since spec `0001`, and that the 0/O disambiguation actually comes from Atkinson's default zero glyph (3 contours) — corrected in two places (the family paragraph and, implicitly, the `numeral` step annotations), no claim of a working OpenType feature remains. Icon library, colors, and the Design Read/Dials section all match `plan.md` T10 and the shipped diff. No token, ratio or claim in `DESIGN.md` contradicts `app/globals.css` (`git diff` touches 17 lines, all `--font-sans`/`--text-*` line-height/letter-spacing; zero `--color-*`). |
| 5 | `PRODUCT.md` §9 — Evidence row and non-claims table | **F5 remains open, correctly recorded as open.** `legal.md` §14.5 made it binding that the Evidence row cite `hooks/use-work-calculator.ts:67` in addition to the render site; `PRODUCT.md` §9's row still cites only `day-summary.tsx`. `reports/legal.md` §9 and `STATUS.md`'s Blockers table both already carry F5 as **OPEN**, routed to `product-manager` via `tech-lead`. I did not close it myself — the claim register is `product-manager`'s decision domain, not mine, and the finding does not withhold this gate (the underlying claim is true and backed; only the evidence citation is incomplete). **Recorded here as open, owner `product-manager`.** The non-claim row (banco de horas) is accurate and cites the correct CLT articles. |
| 6 | Lessons this cycle owed | **17 lessons (001–017), all fully written** — spot-checked several full files against the four-section template (`What happened` / `Why it happened` / `The rule` / `How to verify`); none is a stub. Index (`LESSONS.md`) matches the 17 files on disk (`docs-check.mjs` confirms). **Every lesson is at `confirmed: 0`** — none has reached the 3-confirmation promotion threshold. Nothing to flag for `tech-lead` at G10 on this axis. |
| 7 | Known open findings survive, not quietly dropped | **F5, F6** (`reports/legal.md`) — both present, F5 open (owner `product-manager`, above), F6 open (two unguarded S9 rules, owner `qa-engineer`/`tech-lead`, follow-up). **Two `qa.md` minor findings** — the duplicated/contradictory `T13` row and the pre-existing `hero-panel.test.tsx:58` class-string assertion — both present in `qa.md`; the **T13 duplication was a real STATUS.md defect and I fixed it** (collapsed to one `done` row; see § 3). The class-string assertion is correctly recorded as pre-existing, out of scope, not touched. **Stale `tech-recruiter` row** — found in `.specs/templates/STATUS.md` and in this spec's own `STATUS.md` Gates table; `AGENTS.md` §3 states this squad has no `tech-recruiter` seat. **Fixed in both** (see § 3). **`0001-foundation` AC18 defect** — addressed to me at this gate per the decisions log; found correctly recorded in `.specs/0001-foundation/STATUS.md` § Blockers and its decisions log (AC18's only verification command, `preview.mjs`, never ran in this repo; not re-opened, not re-litigated here, exactly as `product-manager` ruled). No action required of me beyond acknowledging it — it is `0001`'s own open item, not `0002`'s. |
| 8 | Specs `0003`, `0004`, `0005` opened and indexed | **All three exist**, all three indexed in `.specs/INDEX.md` with an accurate one-line description, and none is an empty placeholder: `0003-citation-registry` carries F2–F5 with severity, location and source of record; `0004-lcp-render-delay` carries the full phase breakdown and the relocated absolute 2,500 ms target; `0005-tailwind-theme-collision-and-dark-hydration-hotfix` carries both critical findings, a compiled proof of the `@theme` namespace collision, and the merge ruling (below). |

## 3. Documentation fixes made at this gate (before any commit)

Three corrections, all additive or corrective, none a design/legal/scope decision:

1. **`.specs/0002-design-taste-preflight/STATUS.md`** — Tasks table had two contradictory `T13`
   rows (one `done`, one `open`, same id). Collapsed into one `done` row carrying both facts.
2. **`.specs/templates/STATUS.md`** and **`.specs/0002-design-taste-preflight/STATUS.md`** —
   removed the stale `recruiter | tech-recruiter` row from the Gates table in both files.
   `AGENTS.md` §3 is explicit that this squad has no `tech-recruiter` seat (`labor-law-analyst`
   fills that seat's role). Flagged by `refactor-scout` (`reports/ponytail.md`) as a template
   defect for "whoever next edits the STATUS template" — that is this gate.
3. **`.specs/0002-design-taste-preflight/design.md`** §5.3 — added a short "Resolved" note
   pointing at `STATUS.md`'s B5/B6 rulings, so the section no longer reads as an open contingency
   (Asap fallback: considered and rejected) and no longer carries an uncorrected
   `adjustFontFallback` claim next to the measured CLS figures that contradict it. Original text
   preserved; nothing in the design decision itself was touched — that is `product-designer`'s
   domain and the decision was already made and recorded elsewhere.

`docs-check.mjs` re-run clean after all three edits.

## 4. The blocking condition on the PR stack — read this before merging anything

**The open PR stack (#32 → #33 → #34 → #35 → #36 → #37, plus this spec's branch on top) must not
be merged into `main` until spec `0005` lands on top of it.**

Why: PR #35 introduced a Tailwind v4 `@theme` namespace collision — the project's custom
`--spacing-3xl` (4rem = 64px) shadows Tailwind's built-in `--container-3xl` (48rem), so every
`max-w-3xl` in the app, including the footer that carries the legally required disclosure
(`PRODUCT.md` §4), resolves to **64 px wide** instead of 48rem. This is on `main` today only in
the sense that it is **not yet on `main`** — the defect lives in the still-open PR stack, and
`main` currently renders the disclosure correctly. **Merging the stack is the act that would ship
a 64px-wide legal notice to production.** No automated check in this repository catches it: the
Playwright layout suite bounds overflow only, never collapse, so a column narrowing inward trips
nothing (`reports/audit.md` Critical #2; lesson **016**). `.specs/0005-.../STATUS.md` § Merge
ruling records the compiled proof and the reasoning; `0005` is deliberately authored as a new
branch stacked on top of the existing six rather than folded back into #35, to avoid re-resolving
conflicts across ~204 already-reviewed edited strings.

This is not something a green CI run overrides — the stack's checks were green over exactly this
defect, which is itself the finding underneath it.

## 5. Commits

**None made.** `git status` at the start and end of this gate shows the same uncommitted working
tree (`git log -1` still at `366eab5`). G7 is reconciliation only, per this role's own
instructions and per the human's standing rule that commits happen only when explicitly asked.
Commit grouping, staging by name, and message drafting are G8 work and have not started.

## 6. Attribution

No commit exists yet, so no trailer has been written. When G8 runs, the trailer will read
`Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` — read from this session's own system
prompt (model: Sonnet 5), not copied from any example or default.

## 7. Human approval

**Not requested and not needed at this gate** — G7 performs no remote or destructive operation.
Push, PR creation, and merge each require their own explicit human yes at G8/G9, asked at the
time, not assumed from any prior approval.

## 8. PRs / CI / Preview URL

Not applicable yet — G8 has not started.

## 9. Lessons due for promotion

None. All 17 active lessons are at `confirmed: 0` (verified against `.agents/memory/LESSONS.md`
and spot-checked against the files on disk). Nothing to flag for `tech-lead` at G10.

---

**Handing to:** `tech-lead`/human for the go-ahead into G8. The two truth-level findings left
genuinely open (`PRODUCT.md` §9 evidence citation — F5, owner `product-manager`; the two unguarded
S9 rules — F6, owner `qa-engineer`/`tech-lead`) do not block this gate and are recorded, not
silently dropped.

---

# G8 — release (commit half), run 1

> Owner: release-manager

**Verdict: pass (partial).** Nine commits made on `fix/design-taste-preflight`. **Nothing pushed,
no PR opened, no remote operation of any kind** — push requires its own explicit human approval,
asked for and not yet given (§ Human approval, below).

## 1. Grouping

52 files (13 tasks) group into nine coherent commits, ordered so every one builds and tests green
without the ones after it. Splitting five files whose diff mixed two tasks in the same lines or
hunks (`app/layout.tsx`, `hero-panel.tsx`, `hero-panel.test.tsx`, `day-summary.tsx`,
`calculator-views.tsx`, `salary-calculator.tsx`, `package.json`, `pnpm-lock.yaml`) required
constructing each commit's intermediate file content by hand rather than relying on `git add -p`
hunk boundaries, because an icon import rename and a legal-string rewrite, or a font rename and a
`<head>` removal, sometimes landed on adjacent lines with no hunk boundary between them.

## 2. Commits

| # | Subject | Files (by name) | Idea | Verified |
|---|---|---|---|---|
| 1 | `feat(design): swap Inter for Atkinson Hyperlegible Next` | `app/globals.css`, `vitest.setup.ts`, `app/layout.tsx` (font hunk only — `<head>` preconnect deferred to #5), `__tests__/layout.test.tsx` (font test only) | T2 | `pnpm typecheck` + `pnpm test` (472/472) in isolation via `git stash push --keep-index`, rest of the cycle stashed out |
| 2 | `feat(design): replace lucide-react with @tabler/icons-react` | 9 organisms/molecules (pure icon swap), `hero-panel.tsx` (icon hunk only), `day-summary.tsx`/`calculator-views.tsx`/`salary-calculator.tsx` (icon hunks only, legal-string text held at its pre-change wording), 3 test files, `package.json` + `pnpm-lock.yaml` (tabler add + lucide removal only, axe-core deferred to #8) | T3 | `pnpm typecheck` + `pnpm test` (474/480, 6 failures all in the not-yet-committed `copy-guards.test.ts`, which is expected — deleted it for this one isolation run, restored after) + `pnpm build` clean |
| 3 | `fix(legal): correct the INSS ceiling wording and give the hero a statement mode` | `lib/payroll.ts`, `lib/compliance.ts`, 6 test files, `hero-panel.tsx`/`day-summary.tsx`/`calculator-views.tsx`/`salary-calculator.tsx` (remaining hunks) | T5, T6, T7, T12 | `pnpm typecheck` + `pnpm test` (481/481) isolated |
| 4 | `fix(product): retire the "banco de horas" claim` | `lib/calculator-view.ts`, `lib/og-image.tsx`, `lib/structured-data.ts`, `app/page.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, both `app/custo-da-hora/*-image.tsx`, 4 test files, `PRODUCT.md` | T8 | `pnpm typecheck` + `pnpm test` (483/483) isolated |
| 5 | `perf: clear the cold-load path ahead of LCP` | `components/templates/calculator-layout.tsx`, `calculator-page.tsx`, `app/layout.tsx` (remaining `<head>` removal), `__tests__/calculator-layout.test.tsx`, `__tests__/layout.test.tsx` (remaining preconnect test) | T4 | `pnpm typecheck` + `pnpm test` (485/485) isolated |
| 6 | `test: guard the retired claims and swapped libraries permanently` | `__tests__/copy-guards.test.ts` (new) | T9 | Ran standalone against the tree built by #1-#5: 8/8 pass |
| 7 | `docs(design): reconcile DESIGN.md with the shipped design system` | `DESIGN.md` | T10 | Docs-only; no build/test surface |
| 8 | `chore(tooling): repair the axe-core wiring and stop reusing a foreign dev server` | `package.json` + `pnpm-lock.yaml` (axe-core add), `.agents/tools/check-reduced-motion.mjs`, `.agents/tools/preview.mjs`, `.agents/tools/route-js.mjs` (new), `playwright.config.ts`, `next-env.d.ts` | T1, T13 | `pnpm typecheck` + `pnpm test` (493/493) isolated, `node --check` on all three `.mjs` files, `biome check .` clean |
| 9 | `docs: record spec 0002 and its cross-cutting findings` | `.agents/memory/LESSONS.md` (17 lessons), 17 lesson files + `_template.md`, `.specs/0002-design-taste-preflight/**`, `.specs/0003-citation-registry/**`, `.specs/0004-lcp-render-delay/**`, `.specs/0005-tailwind-theme-collision-and-dark-hydration-hotfix/**`, `.specs/INDEX.md`, `.specs/0001-foundation/STATUS.md`, `.specs/templates/STATUS.md` | spec + memory record | `pnpm build` + `pnpm test` (493/493) on the full stack, isolated from any later uncommitted change |

Every isolation run used `git stash push --keep-index` to remove everything not yet staged
(reproducing `AGENTS.md` §4 rule 6's isolated-copy discipline without a second worktree, since the
stash is popped immediately after each measurement), followed by `pnpm install` so `node_modules`
matched the commit's own `package.json`/`pnpm-lock.yaml`, then popped back. No commit was made
without first seeing its own tree green.

## 3. A note on the shared tree

Lesson **018** (`labor-law-analyst`, spec `0005`) and an archive probe file
(`.agents/memory/archive/019-probe.md`) appeared uncommitted in this working tree partway through
this gate — after this spec's own G7 had already verified 17 active lessons. Neither belongs to
`0002`. Per `AGENTS.md` §4 rule 6 (shared-tree hazard) and because the claim register and the
lesson ledger are not this role's decision domain outside its own spec, both were left untouched,
uncommitted, in the working tree — not deleted, not folded into this spec's commit. `LESSONS.md`
is committed here at exactly 17 entries (rows 001-017, `Active: 17/30`), matching what G7 verified;
row 018's insertion and the resulting count bump remain as an uncommitted diff on top, for whoever
runs spec `0005`'s own release. Re-running `node .agents/tools/docs-check.mjs` against the current
working tree (not this commit) now reports one failure for exactly this reason — it is not a defect
in the commit above, and is not this gate's to close.

A second, sharper instance of the same hazard: `.specs/0005-.../design.md` was actively being
written by a concurrent agent while this commit was staged, and isolating the last commit's staging
area with `git stash push --keep-index` raced that write — the pop came back as an `AA` conflict
(`git status`) on that one file. Resolved by comparing the two sides directly (`git show :2:<path>`
vs `:3:<path>`): the "ours" side was a strict prefix of the "theirs"/stashed side (375 of 521 lines,
confirmed with `diff`, zero conflicting lines), so `git checkout --theirs` recovered the concurrent
agent's fullest version with no data loss on either side. Nothing was destructively resolved by
guesswork. This is the isolated-copy rule (`AGENTS.md` §4 rule 6) failing to protect a file outside
the current spec's own directory when a stash — not a worktree — is the isolation mechanism; a
lesson is warranted if this recurs.

## 4. Attribution

Every commit ends with `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>` — read from this
session's own system prompt (`You are powered by the model named Sonnet 5`), not copied from any
example or default.

## 5. Human approval

**Push, PR creation, and merge were not requested and have not happened.** Nothing was pushed to
any remote, no PR was opened, no branch was force-pushed, no git config was touched. This report
is the point at which that approval is asked for — the human's decision is expected before any of
`git push`, `gh pr create`, or a merge runs.

## 6. PRs / CI / Preview URL

Not applicable yet — nothing has been pushed.

## 7. The blocking condition, unchanged

**The open PR stack (#32 → #37, plus this branch on top) must not merge into `main` until spec
`0005` lands on top of it** — PR #35's `@theme` namespace collision collapses the legal disclosure
footer to 64px, and that defect is not on `main` today only because the stack has not merged yet.
See § 4 above (G7 half of this report) for the full reasoning and the compiled proof.

## 8. Lessons due for promotion

None among this spec's 17. Lesson 018 (spec `0005`) is not this gate's to evaluate.
