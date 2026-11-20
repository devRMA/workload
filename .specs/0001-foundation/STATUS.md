# 0001 — Status

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** done
**Next agent:** none — closed at G10 by `tech-lead` on 2026-09-15.
**Not `release-manager`:** G7 and G8 have nothing to reconcile or ship here —
this spec introduced no diff, and its code was committed before the squad existed.
**Bounces:** none

**Closed at G10 on 2026-09-15**, run 2, after both blockers raised at run 1 were resolved by their
owners and verified here — see § *G10 close*. `node .agents/tools/docs-check.mjs 0001-foundation`
is **0 failures, 0 warnings** on the `done` state, which is the check B-1 existed to satisfy.

**What `done` asserts here, and what it does not.** This spec documents the calculator as it
already existed. Closing it asserts that **the documentation is accurate against the tree** — that
`spec.md`, `legal.md`, `design.md`, `copy.md` and `plan.md` describe what shipped, that the legal
numbers were checked against the norm by `labor-law-analyst` at G6, and that the three review gates
that cannot read a diff were ruled and reported rather than left pending. It does **not** assert
that the app is finished, that its Core Web Vitals budget is met (it is not — `F1`, tracked on
`.specs/0004-lcp-render-delay/`), or that nothing in the tree needs work. Three debts leave this
spec open with owners and triggers, recorded in § *Carried forward*. **A baseline spec closes on the
accuracy of its record, not on the completeness of its subject.**

Baseline spec. It documents the calculator as it already exists, so its gates did not run forward in the usual order — the code came first and the artifacts were written against it. Each gate below records the state it is **actually** in, not the state the template starts in.

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| G1 spec | product-manager | done | 1 | `spec.md` |
| G2 law | labor-law-analyst | done | 1 | `legal.md` |
| G3 design | product-designer | done | 1 | `design.md` |
| G3 copy | content-writer | done | 1 | `copy.md` |
| G4 plan | tech-lead | done | 1 | `plan.md` |
| G5 build | frontend-dev | done | 1 | shipped code — this spec is written against it |
| G6 qa | qa-engineer | **n/a** | 1 | `reports/qa.md` |
| G6 audit | web-standards-auditor | **n/a** | 1 | `reports/audit.md` — no diff to review; AC18 and this spec's a11y/CWV claims cited from `.specs/0005-…` and `.specs/0006-…`'s deployed-preview audits, F1 (Core Web Vitals budget) pointed at `0004-lcp-render-delay` |
| G6 law-check | labor-law-analyst | done | 1 | `reports/legal.md` |
| G6 ponytail | refactor-scout | **n/a** | 1 | `reports/ponytail.md` — no diff to review, spec carries none |
| G7 docs | release-manager | **n/a** | 0 | nothing to reconcile before a commit that predates the squad; no artifact |
| G8 release | release-manager | **n/a** | 0 | the code shipped before this spec was written; no artifact |
| G9 preview | web-standards-auditor + labor-law-analyst | **covered** | 0 | no artifact of its own — `.specs/0006-salary-alert-legibility/reports/audit-preview.md` and `.specs/0005-…/reports/legal.md` §8 measure this spec's criteria on the deployment (§ *G10 triage*, item 1) |
| G10 compound | tech-lead | done | 2 | § *G10 close*, below — run 1 was the triage that named **B-1** and **B-2**; run 2 verified both closed and closed the spec |

The G6 law-check passed: `reports/legal.md`, verdict `passed`, with four minor findings all accepted by the human and recorded in `legal.md` § *Known imprecisions*.

**The three remaining G6 gates are ruled `n/a`, not `pending`** — a review gate reads a diff, and
this spec has none: its artifacts were written *from* the shipped tree, so `qa-engineer`,
`web-standards-auditor` and `refactor-scout` would be reviewing their own input. `n/a` is a verdict
this squad already recognises (`.specs/0002-…/spec.md` AC3 mandates `pass`/`fail`/`n/a` with a
one-line reason for every box). What `n/a` does **not** do is excuse the artifact: each of the three
owes one short report recording the ruling and what stands in for it, because
`docs-check.mjs` requires all four G6 reports to exist before any spec is `done`, and because a gate
verdict nobody wrote down is a gate nobody can audit. That is blocker **B-1**.

**G7 and G8 are `n/a` with no artifact owed.** They exist to reconcile documentation before a commit
and to ship it; this spec's code was committed before the squad existed and there is nothing to
stage. `release-manager` is off this spec.

**G9 is covered, not owed.** See § *G10 triage*, item 1.

Stack review follow-up to R14: an automatic projection was persisted as `lastExit` and later mistaken for an actual exit. The correction requires explicit valid past input and retains that prior exit across reloads. The 660-minute boundary (CLT art. 66) is unchanged; the new evidence concerns which inputs qualify. See `__tests__/use-work-calculator.test.ts` and `__tests__/work-calculator.test.tsx`.

## Tasks

The build order the artifacts describe. Every task is already reflected in the shipped tree; the ids exist so a rebuild has a dependency order and so a future bounce has something to name.

| Id | Title | State |
|---|---|---|
| T1 | Token layer and `lib/utils.ts` | done |
| T2 | App shell, routing, metadata | done |
| T3 | `lib/legal-tables.ts` — the year registry | done |
| T4 | `lib/payroll.ts` — INSS, IRRF, the gross hour, rounding | done |
| T5 | `lib/night-shift.ts` — window, ficta hour, premium | done |
| T6 | `lib/weekly-rest.ts` — the DSR | done |
| T7 | `lib/compliance.ts` — the four warnings | done |
| T8 | `lib/journey.ts`, `lib/duration.ts`, `lib/salary-period.ts` | done |
| T9 | `lib/day-breakdown.ts` — the single day calculation | done |
| T10 | `lib/storage.ts`, `lib/consent.ts`, `lib/analytics.ts` | done |
| T11 | `hooks/use-current-time.ts` | done |
| T12 | `hooks/use-gross-hourly-rate.ts` | done |
| T13 | `hooks/use-salary-calculator.ts` | done |
| T14 | `hooks/use-work-calculator.ts` | done |
| T15 | The atom set | done |
| T16 | Input and field molecules | done |
| T17 | Control and list molecules | done |
| T18 | Header, view switcher, footer | done |
| T19 | `JourneyForm` | done |
| T20 | `DaySummary` | done |
| T21 | `WorkCalculator` and `HeroPanel` | done |
| T22 | `SalaryCalculator` and `TaxDetailsPanel` | done |
| T23 | Consent, analytics, ads | done |
| T24 | `CalculatorLayout` | done |
| T25 | Wire the routes | done |
| T26 | Coverage configuration | done |
| T27 | End-to-end specs | done |
| T28 | Audit pass | n/a — folded into B-1, closed with it by `reports/audit.md` |

## G10 close

`tech-lead`, run 2, 2026-09-15. Run 1 (the triage recorded below) closed two items on evidence and
named two blockers. Both are now resolved by their owners. **Nothing below was taken on anyone's
word** — each verdict names the file read or the command run, per `AGENTS.md` §5 *How a claim about
the tree is measured*, the rule promoted out of this cycle's memory.

### B-1 — closed. Three independent `n/a` reports exist, and each verified the ruling rather than inheriting it.

The point of B-1 was never the files; it was that a gate verdict ruled by `tech-lead` and written by
nobody is a gate nobody can audit (`AGENTS.md` §4 rule 5). All three reviewers wrote their own, and
all three re-derived the `n/a` instead of citing mine:

- **`reports/qa.md`** — went furthest, and its method is the one worth keeping. Rather than reading
  `STATUS.md`'s claim that this spec has no diff, it proved it from history:
  `git log --follow` on `spec.md` resolves to the single commit `366310b`, the one that introduced
  the spec pipeline itself; `lib/payroll.ts` was added at `85c3671`, **line 68 of the reverse log
  against `366310b`'s line 125** — roughly sixty commits earlier; and all five code commits after
  `366310b` were read in full, none naming `0001` or `foundation`. That is the claim measured by its
  boundary (the whole history) rather than by the coordinate that asserted it.
- **`reports/audit.md`** — states the AC18 citation **in its own voice**, which is what the criterion
  needed, since `web-standards-auditor` owns AC18 and I do not. It also states plainly, unprompted,
  that the Core Web Vitals budget is **not** met, and routes to `F1` on `0004` without restating
  numbers it did not measure (lesson 032's rule, applied correctly).
- **`reports/ponytail.md`** — ruled `n/a` and, correctly, refused to substitute a repo-wide
  `ponytail-audit` for the gate: a whole-tree complexity verdict attached to a spec that changed no
  code would be a different job nobody commissioned.

`node .agents/tools/docs-check.mjs 0001-foundation` on the `done` state: **0 failures, 0 warnings.**
Run, not assumed — B-1 existed precisely because that script requires all four G6 reports.

### B-2 — closed, and the triage's own count was wrong by three.

`product-designer` corrected `DESIGN.md` § Components by re-enumerating every path claim from
`find components -name "*.tsx"` rather than from run 1's table, and found **8 of 13 headings wrong,
not 5 of 6**. The three extra defects were a shape my table could not express: a directory prefix
stated once and silently inherited by the bare filenames after it (`masked-input.tsx`,
`currency-input.tsx` — both molecules, both riding an `components/atoms/` prefix), and six files
named with no directory at all under Cards, Segmented controls and Navigation. Under §8 an
unqualified path is the same defect as a wrong one.

**That miss is mine, and it is the lesson this cycle bought.** My triage table was built from what my
search could express — "path stated and wrong" — so it returned a count that was a property of my
search, not of the tree. The generalisation is now `AGENTS.md` §5, promoted below.

### The three carried debts

Re-measured by their own searches in this session, not read off the record. See § *Carried forward*.

## G10 triage — run 1, what closed and what did not

`tech-lead`, run 1, 2026-09-15. Four open items were inspected against the tree as it stands on
`5c0c6fa`. **Two close on evidence, one is still true, and one is new.** Nothing here re-opens a
gate, and nothing here was decided by reading a document — every ruling below names the command or
the report it rests on.

### 1 — AC18 is satisfied. It is not retired, and it does not belong to another spec.

AC18: *"Zero axe-core violations at `critical` or `serious`, in both themes"*, verified by
`node .agents/tools/preview.mjs`.

The defect recorded here was never the criterion — it was that the criterion's **only** stated
evidence path had never executed in this repository (`@axe-core/playwright` absent from
`package.json`, `pnpm-lock.yaml` and `node_modules`; the driver imported from `playwright` instead
of `@playwright/test`). That is fixed, and the criterion has since been measured three times:

| Where | What it measured | Result |
|---|---|---|
| `.specs/0002-…/reports/audit.md` (G6) | local production build, 8 captures — 2 routes × 2 viewports × 2 themes | 0 violations at **any** impact |
| `.specs/0005-…/reports/audit-preview.md` (G9) | **deployed** Vercel preview, all 8 route × viewport × theme combinations | 0 violations at any severity; Lighthouse `accessibility` clears budget |
| `.specs/0006-…/reports/audit-preview.md` (G9) | **deployed** Vercel preview, PR #39, `mergeStateStatus: CLEAN` | 0 violations at every severity, both routes, both viewports, both themes; Lighthouse `accessibility` **1.00 on 6/6 runs** |

The third row is AC18's exact claim, taken on a real deployment, by the agent that owns AC18
(`web-standards-auditor`), against a tree that strictly **contains** the one this spec documents.
Re-running this spec's own G6 audit would measure today's tree — which is what 0006's G9 already
measured, on the deployed artifact rather than on localhost. **Citing it is the honest close;
re-running it is ceremony.** AC18 is closed, and the `n/a` report owed under B-1 is where
`web-standards-auditor` records that citation in its own voice.

The generalisation was already promoted out of the lesson ledger: `AGENTS.md` §5 *How a criterion is
written* now forbids naming a verification command that has not been run in this tree by the agent
naming it. The rule outlived the incident, which is the outcome §6 is for.

### 2 — The token migration is resolved.

Recorded here as three files carrying raw palette utilities and raw radii. Checked:

```
grep -rnoE "(neutral|indigo|emerald|slate|zinc|gray)-[0-9]{2,3}" components app
```

returns **nothing** — not in `components/organisms/cookie-consent.tsx`, not in
`components/organisms/salary-calculator.tsx`, not in `day-summary.tsx`'s segment colours, not
anywhere else in the two trees. Resolved by the design-system work in `0002` and `0005`. **A debt
that was quietly paid is marked paid**, because carrying it forward costs the next reader the same
grep.

### 3 — `DESIGN.md` § Components is still wrong, in five of six places. → blocker **B-2**.

Still true, and worse than recorded: only `alert-banner` was fixed (at `0002` T10). Read off disk
against `DESIGN.md`:

| `DESIGN.md` says | On disk | Line |
|---|---|---|
| `components/molecules/hero-panel.tsx` | `components/organisms/hero-panel.tsx` | `DESIGN.md:507` |
| `components/molecules/stat-box.tsx` | `components/atoms/stat-box.tsx` | `DESIGN.md:536` |
| `components/molecules/collapsible-panel.tsx` | `components/atoms/collapsible-panel.tsx` | `DESIGN.md:553` |
| `form-field.tsx` | `components/molecules/field.tsx` | `DESIGN.md:494` |
| `currency-field.tsx` | `components/molecules/currency-input.tsx` | `DESIGN.md:494` |
| `components/atoms/alert-banner.tsx` | `components/atoms/alert-banner.tsx` — **correct** | `DESIGN.md:540` |

This is not cosmetic. `AGENTS.md` §8 makes the atomic level **binding** and says a file goes at the
level the plan names; the plan reads `DESIGN.md`. A wrong path in `DESIGN.md` is therefore an
instruction to place the next component at the wrong level, and two specs in flight
(`0004` and the CLS spec) both read `hero-panel.tsx`. The tokens, states and rules in those sections
are still correct — only the paths are wrong.

### 4 — Three G6 reports do not exist. → blocker **B-1**.

New, and found by running the gate rather than reading it:
`node .agents/tools/docs-check.mjs 0001-foundation` is **0 failures, 0 warnings** today, but it only
enforces the `done`-spec rules against a spec that claims `done`. Marking this one `done` would fail
on `spec 0001-foundation: marcada done sem reports/qa.md` (and `audit.md`, and `ponytail.md`). The
three `n/a` verdicts in the Gates table are mine to rule; the three reports are not mine to write
(`AGENTS.md` §4 rule 5 — a reviewer who does not report has not reviewed, and a tech-lead who writes
a reviewer's report destroys the only independent read the gate buys).

### The close condition, stated as a trigger rather than a date

**`0001` is `done` the moment four files are right:** `reports/qa.md`, `reports/audit.md`,
`reports/ponytail.md` — one short `n/a` report each, naming what stands in for the gate — and
`DESIGN.md` § Components with its five paths corrected. Then `docs-check.mjs` passes on `done`, this
file's state flips, and `.specs/INDEX.md`'s row follows. No gate re-runs and no code changes.

## Blockers

none

## Decisions log

| When | Agent | Decision |
|---|---|---|
| 2026-09-15 | tech-lead | **`0001` is closed, and the close states what it does and does not assert.** A baseline spec closes on **the accuracy of its record**, not on the completeness of its subject: the artifacts describe the shipped tree, the numbers were checked against the norm at G6, and the three gates that cannot read a diff were ruled *and reported*. It does **not** assert the app is finished or that the CWV budget is met — it is not, and `F1` on `0004` owns it. **AC18 is satisfied by citation, not by a re-run**, and the citation now exists in `web-standards-auditor`'s own voice in `reports/audit.md`, which is the part that mattered: I could rule the verdict, but I could not make the criterion's owner's claim for it. **Both blockers closed by their owners, and both closed wider than I scoped them.** B-1's `reports/qa.md` did not take my "no diff" ruling — it proved it from `git log --follow` and the reverse log, sixty commits of separation, all five later code commits read in full. B-2's `product-designer` re-enumerated from `find` and found **8 of 13** headings wrong where my table said 5 of 6. **That miss is the cycle's lesson and it is mine**: my triage table was built from what my search could express — "path stated and wrong" — so its count was a property of my search, not of the tree, and it was blind to a prefix inherited silently and to a filename with no directory at all. **Three debts leave with owners and triggers** (F5 → `product-manager`; F6a, F6b → `qa-engineer`), each re-measured here by its own command rather than read off the record; F6a is recorded as *prospective*, since nothing violates it today. The nine class-string assertions are **not** carried — they have a spec of their own being opened, and a debt with two owners has none. |
| 2026-09-15 | tech-lead | **Three lessons written in the same afternoon by three different agents are one rule, and it was promoted rather than merged.** 034 (`product-manager`, 0004: a file set inferred from emitted output), 035 (`tech-lead`, 0002: a carried debt read by its original coordinate), 036 (`product-designer`, 0001: a path claim hidden behind a shared prefix) are three wordings of one failure — **measuring a claim by the artifact that reported it instead of by the boundary the rule names.** `AGENTS.md` §6 promotes at three confirmations; none of these had any, because each was written once and immediately obeyed by the next agent. But the promotion test §6 actually encodes is *"no longer a lesson, it is a rule"*, and three agents deriving the same rule independently, in three domains, within hours, is stronger evidence of that than one agent confirming one lesson three times — a confirmation count measures how often a rule was *remembered*, not how widely it *applies*. It cuts across `product-manager`, `tech-lead` and `product-designer`, so it went into **`AGENTS.md` §5, *How a claim about the tree is measured*** — beside *How a criterion is written*, which already forbade this exact shape for criteria and was the rule nobody had extended to findings, debts and documents. Five bullets replace three lessons; all three retired as `promovida`. Ledger **26 → 23 of 30**, and the room was bought rather than made. |
| 2026-09-15 | tech-lead | **Two memory items left open deliberately, both because another agent is holding the file.** (1) **A write race on `.agents/memory/` during this close, resolved without data loss, and it is a real defect in the tooling.** Seconds after I retired 034/035/036, the `tech-lead` triaging `0004` T1 read `LESSONS.md`, found three rows whose backing files were gone, correctly diagnosed the known `lesson.mjs new` failure mode — index row written, file not — and recreated all three as recovery stubs to stop the next regeneration erasing them. Its reasoning was right and its premise was stale by under a minute: the bodies were not lost, they were promoted into `AGENTS.md` §5 and archived. I re-retired the stubs and restored the full bodies from a backup taken first; `archive/` holds 2.6K/5.6K/3.1K, the real texts, not the 1.3K stubs. **The durable finding is that `lesson.mjs` has no locking and its two failure modes — a half-written `new` and a concurrent `retire` — are indistinguishable from the index alone.** A recovering agent cannot tell them apart without looking in `archive/`, and nothing tells it to. Not fixed here: it is tooling, it needs its own scope, and I am not opening one inside a close. (2) **Lesson 031 stands at three confirmations and is due for promotion into `.agents/agents/labor-law-analyst.md` — I did not promote it.** Three law gates (`0003`, `0007`, `0008`) are mid-decision in that file and it is already modified in the working tree; editing an agent definition under an agent that is executing it is the same class of race as the one above, and I had just spent a correction on that lesson. Handed to the human with the close instead. The ledger moved four times during this close as parallel specs wrote and promoted — it sat at 26, 29 and 27 within the hour and ended at **26 / 30**. Any figure written here is stale on arrival; **read it with `lesson.mjs list`, never from this row.** The point that is not stale: the three slots the promotion bought were spent within the hour, so the cap will bind on the next writer. |
| 2026-09-15 | product-designer | **B-2 closed, and the triage's count was low by three because it was a count of a report, not of the directory.** I re-enumerated every path claim in `DESIGN.md` § Components from `find components -name "*.tsx"` before touching anything (lesson 034: enumerate what a claim binds by listing it; lesson 035: re-measure carried debt by the search that defines its boundary, never by the coordinate that reported it). The triage named five wrong of six; the real figure is **eight headings changed of thirteen**. The three the triage missed are the ones its table could not see: `masked-input.tsx` and `currency-input.tsx` sit bare after a `components/atoms/` prefix in the Inputs heading and are molecules — the wrong level is carried by a prefix stated once and inherited silently by the filenames after it — and Cards, Segmented controls and Navigation name six files with **no path at all**, which under `AGENTS.md` §8 is the same defect as a wrong one: a reader who must guess the level will guess, and `hero-panel` is proof that the guess goes wrong. Those six are now fully qualified. **Headings only**: I checked whether any body sentence asserts a level and exactly one does — `AlertBanner` called an atom at `DESIGN.md:411`, which is correct on disk — so no prose changed. The spacing scale (settled at cost in `0005`), the alert-chrome constraint (`0006`), the type ramp and § Motion's `alert` entry (**D3**, owned) are untouched. `__tests__/spacing-guards.test.ts` re-run after the edits, **5/5 green** — the guard is cheap and a mandated text that violated its own guard already cost `0005` a bounce at B8. |
| 2026-09-15 | tech-lead | **G10 triage: this spec does not close today, and the two things that looked like the hard blockers are the two that closed.** **AC18 is satisfied, by citation, not by a re-run** — `.specs/0006-…/reports/audit-preview.md` (G9) measures zero axe-core violations at every severity on both routes, both viewports and **both themes** on the deployed preview, with Lighthouse `accessibility` 1.00 on 6/6 runs, taken by the agent that owns AC18 against a tree that strictly contains the one this spec documents. A criterion whose evidence path was inoperable is not a criterion that can never be evidenced; it was repaired at `0002` T1 and has run three times since, and the generalisation is already a rule in `AGENTS.md` §5. **The token migration is resolved** — `grep -rnoE "(neutral\|indigo\|emerald\|slate\|zinc\|gray)-[0-9]{2,3}" components app` returns nothing, so the debt is marked paid rather than carried; a debt that was quietly resolved costs the next reader the same grep. **Two blockers remain and neither is mine:** B-1, the three `n/a` G6 reports that `docs-check.mjs` requires before `done` — I rule the verdicts, the reviewers write the reports, because a tech-lead who writes a reviewer's report destroys the only independent read the gate buys (`AGENTS.md` §4 rule 5); and B-2, `DESIGN.md` § Components, wrong in **five of six** paths, not the four originally recorded — only `alert-banner` was fixed at `0002` T10, and `hero-panel` is an **organism**, not a molecule. B-2 is not cosmetic: §8 makes the atomic level binding and the plan reads these paths, so the defect propagates into where the next component lands, and two specs in flight read `hero-panel.tsx`. **`G7`/`G8` are ruled `n/a` with no artifact owed and `release-manager` is off this spec** — there is no diff to reconcile and nothing to ship; the code was committed before the squad existed. The close condition is stated as a trigger, not a date: four files right, then `done`. |
| 2026-09-15 | tech-lead | **The three G6 review gates are `n/a`, not `pending`, and the distinction is the point.** A review gate reads a diff. This spec has none — its artifacts were written *from* the shipped tree, so `qa-engineer`, `web-standards-auditor` and `refactor-scout` would be reviewing their own input, and a `pass` written on that basis would be worth less than an honest `n/a`. Leaving them `pending` for eleven months was the actual defect: it read as work queued when it was work that cannot exist, and it is why this spec sat `in-progress` while four later specs opened, ran and closed around it. **A gate that cannot run is closed with a reason, never left pending** — pending is a promise, and a promise nothing can keep is worse than a recorded `n/a`. |
| 2026-09-14 | labor-law-analyst | **The 20% night premium is paid as money** (CLT art. 73, *caput*), computed on the **ficta** minutes so it is cumulative with the reduced hour of §1º, and rendered in the same slot and ink as the overtime tiers. The previous behaviour showed a duration and a blank where the amount belongs — the most serious communication defect the product had. R$ 21,82 per 22:00–05:00 shift at the baseline salary; R$ 436,36 over twenty nights that had never appeared. |
| 2026-09-14 | labor-law-analyst | **Overtime is priced on the gross hour**, `grossSalary / monthlyHours` (CLT art. 59, §1º; CF art. 7º, XVI). The net hour cost and the statutory overtime base were one value under one storage key; they are now two concepts with two homes. The derived key is **deleted** on mount rather than migrated, because a net value cannot be reinterpreted as a gross one. 2h at 50% moved from R$ 37,52 to R$ 40,91. |
| 2026-09-14 | labor-law-analyst | **The DSR is computed, not merely disclaimed** (Lei 605/49 art. 7º, §2º; Súmula 172 do TST), from the unrounded variable pay over the entry month's working days and Sundays. Saturday counts as a working day; holidays are not detected, and the assumption is stated in the UI rather than hidden. |
| 2026-09-14 | labor-law-analyst | **The Súmula 431 divisor mismatch warns; it does not overwrite.** Silently rewriting a number the user typed is the one behaviour a calculator that sells provenance cannot afford. The warning names the coherent divisor and what the mismatch costs. |
| 2026-09-14 | product-manager | **The 100% second tier keeps its default** (`PRODUCT.md` §5, the default is the common case) **and gains a hint** naming the 50% statutory floor and attributing the step to the collective agreement. Changing the default would have been correct in law and wrong for the common case; the hint resolves both. |
| 2026-09-14 | tech-lead | **The fiscal tables are versioned by year in `lib/legal-tables.ts`**, and `lib/payroll.ts` holds no fiscal number at all. Previously the numbers were loose constants **and duplicated in UI prose**, so the January update meant two places, one untested. `WORK_REGIME_INFO[].impact` now interpolates from the table. Deliberately **not** built: dynamic loading, an API fetch, or a year selector — one supported year makes all three speculative. |
| 2026-09-14 | tech-lead | **The overtime limit of art. 59 stays measured on ficta minutes.** `overtimeMinutes` derives from a journey that already credits the night bonus. Defensible — the ficta hour is journey time — but it is an interpretive choice and it is not stated on screen. Recorded as a known imprecision rather than silently kept. |
| 2026-09-14 | product-manager | **The ad interstitial is removed.** An ad surface sat where it could interrupt a calculation. `PRODUCT.md` §8 is explicit: ads never sit between the user and an answer and never occupy the space where a result appears. What remains is one footer slot with a reserved height so it cannot shift the layout. |
| 2026-09-14 | qa-engineer | **Coverage is split by area: 100% in `lib/**` and `hooks/**`, 90% in `app/**` and `components/**`.** The money and the hours keep the full bar. A blanket 100% over a variant/size prop matrix is only reachable by asserting Tailwind class strings, which buys a threshold and no confidence and breaks on every design change. The `lib/` and `hooks/` bar is not to be lowered. |
| 2026-09-14 | qa-engineer | **CSS is not a coverage target.** The bar had been forcing tests of stylesheet files, which produce a number and no defect detection. |
| 2026-09-14 | tech-lead | **Every component sits at its real atomic level.** `alert-banner`, `stat-box`, `collapsible-panel` and `hero-panel` moved to the level they actually occupy. `AGENTS.md` §8 makes the level binding, and a file at the wrong level makes `design.md`'s component table a fiction. `DESIGN.md` still names four of the old paths — reconciliation item for G7. |
| 2026-09-14 | tech-lead | **`buildDayBreakdown` is the only day calculation.** Every worked minute, every segment and the overtime split derive from it; nothing re-derives a minute. It is also why the suggested exit is an iterative fixed point rather than a closed form — crediting the ficta bonus moves the exit that produces it. |
| 2026-09-14 | product-manager | **The footer names every deferred computation.** `legal.md` § *Out of scope* is not an internal note: each excluded item a user could mistake for a promise is written into the footer in plain pt-BR. Silence about an omitted variable is a defect, not a simplification (`PRODUCT.md` §4). |
| 2026-09-14 | labor-law-analyst | **Four known imprecisions accepted by the human** and recorded in `legal.md`: the ficta-minute basis of the art. 59 limit, the year as thirteen monthly nets, `parseCurrency` on a pasted US-format amount, and the whole-minute ficta rounding. A fifth — the Saturday tier and the entry-day keying — is recorded with them. Only the human can accept a known legal imprecision, and the acceptance is written into the spec. |
| 2026-09-14 | product-manager | **AC18 stays open and this spec is not re-opened for it.** Found from spec 0002: AC18's only verification method (`node .agents/tools/preview.mjs`) had never executed in this repo. Nothing false is recorded — T28 and G6 audit are `pending`, so no criterion was closed on an unrun command — and the correction is documentation-only, so it does not need the human and does not consume a bounce. Recorded in § Blockers instead, where `release-manager` reads it at G7 and `web-standards-auditor` reads it at G6. The lesson (**012**) generalises it: a criterion's verification method is unverified until it has run once in this tree, and a criterion whose command has never run is not evidence of anything, in either direction. |
| 2026-09-14 | labor-law-analyst | **D3, D6, D7, D8 and O4–O12 are deferred, not forgotten.** Each is listed in `legal.md` § *Out of scope* with the reason and with what the user sees instead, so a rebuilder does not think the artifacts lost them. |


---

## Carried forward

`0001` carried three debts that were never its own defects and now have nowhere else to live, since
the spec that recorded them (`0002`) is closed. **Each was re-measured in this session by the search
that defines its boundary, not read off the record** (`AGENTS.md` §5). Each has an owner and a
**trigger** — an event in the work, never a date, because a date passes on its own and an event
arrives with the owner attached.

| Debt | Owner | Re-measured — the command and what it printed | Trigger |
|---|---|---|---|
| **F5** — `PRODUCT.md` §9's Evidence cell cites only `components/organisms/day-summary.tsx`, a render site that receives `balanceMinutes` as a prop. `.specs/0002-…/legal.md` §14.5 made it **binding** that it also cite `hooks/use-work-calculator.ts:67` — `balance: breakdown.workedMinutes - breakdown.expectedMinutes` — the line that actually proves the single-day scope | `product-manager` | **still open.** `grep -n "use-work-calculator" PRODUCT.md` → **0 matches**; `PRODUCT.md:116` still names the render site alone. One-line edit. Ruled a finding, not a bounce, by `labor-law-analyst` at `0002` G6: the claim is true and backed, only its citation is incomplete | the next spec that touches §9's claim register, **or** the next spec that opens `day-summary.tsx`. An evidence column pointing at a display is one refactor from pointing at nothing |
| **F6a** — `__tests__/copy-guards.test.ts`'s banned-term regex does not catch a bare `ponto` | `qa-engineer` | **still open, and prospective rather than live.** The regex at `copy-guards.test.ts:36-37` catches `registro/controle/folha/espelho de ponto` but not the naked word. `grep -nio "ponto" lib/og-image.tsx lib/calculator-view.ts` → **0 matches**, so nothing violates it today; the gap is that the next descriptor written can. **The guard is not vacuous** — it reads real source text through `DESCRIPTOR_SOURCES` (5 files) and would fail on insertion | the next spec that adds or edits a descriptor string in any of the five `DESCRIPTOR_SOURCES` (`app/page.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`, `lib/og-image.tsx`, `lib/calculator-view.ts`) |
| **F6b** — S9.4's *"C5 is a strict subset of C3/C4"* is asserted by no test, so `lib/og-image.tsx`'s titles can broaden without failing anything | `qa-engineer`, routed by `tech-lead` | **still open.** `copy-guards.test.ts:58` pins the two root `alt` exports to `` `WorkLoad: ${VIEW_HEADINGS.work}` ``; `grep -rn "og-image" __tests__/` returns only that file and `opengraph-image.test.ts`, which **mocks** `@/lib/og-image` rather than constraining it. Nothing reads `OG_CONTENT`'s titles against C3/C4 | the next spec that edits `lib/og-image.tsx` or `lib/calculator-view.ts` |

**Not carried here:** the nine Tailwind class-string assertions across eight `__tests__/` files,
including the dead guard at `__tests__/day-summary.test.tsx:96` whose `.rounded-full.bg-neutral-100`
selector can never match since the token migration. **They are `.specs/0009-tests-asserting-on-class-strings/`**, open and at G2. A debt with a spec of its own is not a debt, and
duplicating it here would give it two owners and therefore none. Worth recording that `0009`'s own G1
re-measured that set again and got **seven assertions in six files**, not the nine in eight I handed
over — it searched `tests/` as well as `__tests__/` and excluded three on a written domain test. The
rule promoted this cycle survives its own first application: my count was a property of my search too.

### The blockers this spec closed — history, not debt

Both were raised at run 1 of this spec's own G10 and closed before run 2. Preserved rather than
deleted, because how a blocker closed is worth more than a blank.

- **B-1 — the three `n/a` G6 reports did not exist, and `docs-check.mjs` blocks `done` without
  them.** Owner: `qa-engineer` (`reports/qa.md`), `web-standards-auditor` (`reports/audit.md`),
  `refactor-scout` (`reports/ponytail.md`), one each, independently. Each is one short report that
  states the `n/a` verdict, the reason (this spec carries no diff to review), and what stands in for
  it — for `web-standards-auditor`, specifically, the AC18 citation in § *G10 triage* item 1, in its
  own voice, since AC18 is its criterion. T28 ("Audit pass") folds into this and is not separate
  work. **Trigger:** immediately; nothing blocks it and it needs no code.
  **Closed 2026-09-15** — all three written, each verifying the ruling independently rather than
  inheriting it; see § *G10 close*, B-1.
- ~~**B-2 — `DESIGN.md` § Components names five component paths that do not exist**, listed with
  their real paths in § *G10 triage* item 3. Owner: `product-designer` (`DESIGN.md` is its
  document). **Trigger:** immediately, and at the latest before the next spec places or moves a
  component — `AGENTS.md` §8 makes the level binding and the plan reads these paths, so the defect
  propagates into a file location. `0004` and the CLS spec both read `hero-panel.tsx`.~~
  **Closed 2026-09-15 by `product-designer`.** All thirteen path claims in § Components were
  re-enumerated from `find components -name "*.tsx"` rather than from the triage table, and every
  heading now carries a full path verified on disk. Eight headings changed: the five the triage
  named (`hero-panel` → `organisms/`, `stat-box` → `atoms/`, `collapsible-panel` → `atoms/`,
  `form-field.tsx` → `molecules/field.tsx`, `currency-field.tsx` → `molecules/currency-input.tsx`)
  plus three the triage did not, found by listing rather than by reading the report:
  `masked-input.tsx` and `currency-input.tsx` were written bare under an
  `components/atoms/` prefix and are molecules, and Cards, Segmented controls and Navigation named
  six files with no path at all — unqualified, so unusable as the binding §8 makes them.
  `button.tsx`, `input.tsx`, `progress-ring.tsx`, `alert-banner.tsx` and `modal-dialog.tsx` were
  already right. No prose outside the headings became false: the only atomic level asserted in body
  text is `AlertBanner` as an atom at `DESIGN.md:411`, which is correct. Nothing else in `DESIGN.md`
  was touched — not the spacing scale, not the type ramp, not § Motion's `alert` entry (**D3**).
  `__tests__/spacing-guards.test.ts` re-run after the edits: **5/5 passed**.

### Closed at the G10 triage — history, not blockers

<details>
<summary>The three items as they were recorded before 2026-09-15 (two now closed, one now B-2)</summary>

- **AC18 has never been verified, and its verification cell named a command that could not run**
  (recorded 2026-09-14 by `product-manager`, from the G5 run-4 triage of spec 0002). AC18's whole
  verification cell is `node .agents/tools/preview.mjs`. That script imported `@axe-core/playwright`,
  which was absent from `package.json`, from `pnpm-lock.yaml` and from `node_modules`, and imported
  its driver from `playwright` instead of `@playwright/test` — so it had **never executed once in
  this repository**. T28 and G6 audit are both `pending` above, so nothing was recorded as passed on
  a command that did not run; the defect is that this spec shipped a criterion whose only stated
  evidence path was inoperable, and no one found that out until another spec tried to use it.
  **The tool is now repaired** (spec 0002, T1 step 0: the dependency added with the `AGENTS.md` §8
  justification, both imports fixed, the vendored dialog loop deleted) and it runs: at 0002 run 3 it
  reported **0 axe violations at any impact** on the pre-0002 tree, with 4 `color-contrast`
  *incomplete* on `/`. That is evidence for 0002, **not** a retroactive pass for AC18 —
  `web-standards-auditor` owns AC18 and runs it at this spec's own G6, against both themes, which is
  what the criterion asks for and what has still not happened. **For `release-manager` at G7: AC18
  is open, not closed.** No gate is re-opened by this note, because none of them ever closed it.

- **Token migration is incomplete.** `components/organisms/cookie-consent.tsx`, `components/organisms/salary-calculator.tsx` and the segment colours in `components/organisms/day-summary.tsx` still carry raw palette utilities (`neutral-*`, `indigo-*`, `blue-*`, `emerald-*`) and raw radii instead of the token set from `app/globals.css`. Pre-migration surface, not a design decision; `design.md` § *System change* names it so no reader mistakes it for intent.
- **`DESIGN.md` §Components names four components at pre-refactor paths** (`molecules/hero-panel.tsx`, `molecules/stat-box.tsx`, `molecules/alert-banner.tsx`, `molecules/collapsible-panel.tsx`) and two field components that no longer exist under those names (`form-field.tsx`, `currency-field.tsx`). The tokens, states and rules in those sections are still correct. For the `release-manager` at G7.

</details>
