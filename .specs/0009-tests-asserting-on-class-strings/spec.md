# 0009 — Tests asserting on class strings, and the dead guard among them

> Owner: product-manager · Gate: `spec`

## Problem

The user in `PRODUCT.md` §1 never reads a test. They are reached by this spec through one
mechanism only: **a test that cannot fail is a test that lets a defect reach their screen.**

`components/organisms/day-summary.tsx:48-58` renders the day timeline — the coloured bar that
answers *"quanto de hora extra eu já tenho?"* by showing where the hours went. It is guarded by
`if (total === 0) return null;` at line 50, so a day with no worked segments shows no bar. That
guard is the only thing standing between a worker with an empty day and an empty, meaningless
coloured track sitting where their answer should be.

`__tests__/day-summary.test.tsx:96` exists to protect that guard. It does not.

```
expect(container.querySelector(".rounded-full.bg-neutral-100")).toBeNull();
```

`bg-neutral-100` was deleted from the tree by the token migration; the element it was aimed at now
carries `rounded-full bg-surface-sunken` (`day-summary.tsx:54`). The selector matches nothing that
can be rendered, so the assertion returns `null` — and passes — against **every possible markup**,
including the markup it was written to forbid. Measured, not argued: deleting line 50 in an
isolated copy and re-running the file gives **14 passed (14)**. The whole suite is blind to the
defect, and has been for as long as the migration has been in.

Eleven sibling assertions read a Tailwind class string out of rendered markup or out of a source
file. They are not dead today. They are dead the next time a class is renamed — and this repository
has done two such renames already (`lucide-react` → `@tabler`, and the whole `--spacing-*`
namespace). Every one of them becomes `day-summary.test.tsx:96` silently, on a commit that has
nothing to do with them, and reports safety it does not provide.

## Audience & moment

Not a user-facing moment. The reader is **the next agent at G6**, at the moment it reads a green
test run and decides that green means correct. Today, for at least one assertion, it does not.

## Outcome

Every assertion in the test suite that reads a class string is either **shown to fail against the
defect it names**, or replaced by one that does. After this spec, "the suite is green" is a claim
about the code rather than a claim about the suite.

## Scope

### The domain test — what puts an assertion in scope

Per lesson **024** (`applies-to: all`), the domain is a **test on what each assertion does**, not an
enumerated list. The enumeration in § *Inventory* below is the test's output on 2026-09-15, not its
definition. An assertion is in scope when **any** clause holds:

- **C1 — Appearance proxy.** Its verdict depends on a utility class the component under test emits
  for appearance. It mirrors the stylesheet: a design change that keeps the rendering correct turns
  it red, and a rendering defect that keeps the class leaves it green. This is what `AGENTS.md` §8
  forbids, and the reason §8 gives is the clause, not the word "Tailwind".
- **C2 — Unfalsifiable.** Its selector, string or constant does not occur anywhere in the source it
  reads, so it returns the same verdict against every possible markup. It cannot distinguish a
  correct tree from the defect it was written to prevent.
- **C3 — Collidable sentinel.** It proves a `className` prop survives `cn()` by passing a **real
  utility class** as the sentinel. `tailwind-merge` resolves conflicts, so the day the component
  gains a utility in the same group, the caller's class is dropped: the assertion goes red on a
  change that is not a defect, and — in the mirror case — can go green while the prop contract is
  broken.

### What the test deliberately excludes, and why

Naming the exclusions is what keeps the test falsifiable (lesson 024). A class string is **not** in
scope when:

- **It is an input to the function under test.** `__tests__/utils.test.ts:14,22,23` feeds `px-2`,
  `py-1`, `px-4` to `cn()` and asserts the merge result. The subject is `tailwind-merge`'s conflict
  resolution — `cn()`'s published contract — and no rendered markup is read.
- **It is a fixture, not an assertion.** `__tests__/app-header.test.tsx:35,114`
  (`classList.add("dark")`) arranges the environment the component reads.
  `__tests__/extra-entry-list.test.tsx:33` passes `addButtonClassName="text-emerald-600"` into a
  render whose only assertion is `expect(onAdd).toHaveBeenCalledOnce()` at line 43.
- **It is a third-party integration contract.** `ins.adsbygoogle`
  (`__tests__/google-ad.test.tsx:18`, `__tests__/ad-manager.test.tsx:44`,
  `tests/e2e/google-tracking.spec.ts:27,31`). AdSense's own script requires that class name;
  renaming it breaks the ad, not the design. It is an API identifier wearing a class attribute.
- **It is the thing being prohibited, not the thing being asserted correct.**
  `__tests__/copy-guards.test.ts:81-92` asserts no source file contains `lucide-react`, `h-screen`
  or `min-h-screen`. A guard's coupling to the string it bans is the guard's entire purpose, and no
  legitimate design change reintroduces a banned string. **Falsifiability verified, not assumed**:
  adding `h-screen` to one component in an isolated copy turned it red (§ Evidence, E4).
- **It reads a computed or inline value, not a utility class.** `__tests__/hero-panel.test.tsx:52,59`
  read the `--hero-value-size` custom property React sets programmatically;
  `__tests__/modal-dialog.test.tsx:28,43,52,57,61` read `document.body.style.overflow`. These assert
  a value the component computes, which is behaviour.

### Inventory — the test's output, from a re-run search

Scope here comes from the searches recorded in § Evidence (E1), run in this tree on 2026-09-15 over
**both** `__tests__/` and `tests/`, not from the list this spec was opened with. The commands are
the source; the list is their output.

| # | Site | Clause | What it reads |
|---|---|---|---|
| **A1** | `__tests__/day-summary.test.tsx:96` | **C2** | `.rounded-full.bg-neutral-100` — **0** occurrences in `components/`+`app/`. **Dead.** |
| A2 | `__tests__/hero-panel.test.tsx:72` | C1 | `.border-t` — the footer separator at `hero-panel.tsx:62` |
| A3 | `__tests__/layout.test.tsx:21` | C1 | `font-hyperlegible` on `document.body.className` |
| A4 | `__tests__/modal-dialog.test.tsx:96` | C1 | `overscroll-contain` |
| A5 | `__tests__/modal-dialog.test.tsx:97` | C1 | `max-w-lg` |
| A6 | `__tests__/alert-banner.test.tsx:51,54` | **C3** | `mb-6` used as the `className` sentinel |
| A7 | `tests/e2e/disclosure-legibility.spec.ts:60` | C1 | `p.text-caption` — **outside the boundary this spec was handed** |

### The delta against the list this spec was opened with, stated explicitly

The request named **nine assertions across eight files**, all under `__tests__/`. The re-run returns
**seven in scope across six files**, and the two differences both matter:

- **One site the handed list never saw.** `tests/e2e/disclosure-legibility.spec.ts:60` (A7) selects
  the disclosure captions by `p.text-caption`. The handed boundary was `__tests__/`; the rule's
  boundary is every assertion in the repository. A7 is the one whose silent death would be worst:
  `.all()` on a selector that matches nothing returns an empty array, and the `for` loop that runs
  `assertLr2b` over it then runs **zero times and passes** — the same failure mode as A1, in the
  suite `0006` chose as its permanent legibility guard.
- **Three sites the handed list included and this test excludes**, with the reason recorded so a
  later gate can check it rather than re-derive it: `stat-box.test.tsx:31`,
  `duration-field.test.tsx:60` and `regime-field.test.tsx:47` assert
  `className` contains **`my-custom`** — a string that is not a utility, produces no appearance, and
  exists in no stylesheet. They fail clause C1 (no design change can move them), clause C2 (dropping
  the prop turns them red) and clause C3 (no merge group to collide with). They are prop-contract
  assertions whose sentinel was chosen correctly. Excluding them is not softening: including them
  would mean the test is "does the line mention a class", which is the `grep`-shaped rule lesson 024
  exists to forbid.

### Also in scope

- **Whether a permanent guard is warranted, and its reconciliation with the `0006` ruling.** This
  spec does not decide the guard — that is G4 — but it binds the question: any guard proposed must
  be reconciled in writing against `0006`'s recorded refusal (`0006/STATUS.md`, tech-lead,
  2026-09-15) of a source-text guard mirroring a component's class strings. That refusal governs
  guards that mirror **appearance**; a guard over **falsifiability** reads the test suite and goes
  red only when an assertion becomes vacuous, which is never a legitimate state. The two are not the
  same object, and the plan must say so or drop the guard.

## Out of scope

Each exclusion states the property it protects and the gates that may override it.

- **No file under `app/`, `components/`, `lib/` or `hooks/` is modified.** Protects the
  falsifiability of AC6's zero-diff claim: if source moves in the same commits, no reviewer can tell
  a test that was fixed from a test that was made to pass. **Override:** if G5 finds that an
  assertion in § Inventory is green only because the source is wrong, that is a defect in the
  product and it routes to the `tech-lead` as a finding with its own spec — it is never fixed under
  this one. Any such route is named in AC6 itself.
- **`__tests__/copy-guards.test.ts` is not opened.** Protects the legally bound guards it carries —
  the *banco de horas* non-claim from `PRODUCT.md` §9 and the descriptor prohibitions — which were
  settled at cost in `0002` and whose regexes no agent here is competent to revise.
  **Override:** `labor-law-analyst` at G2 or G6 may require a change to this file; that override is
  bounded to the lines the law gate names in `legal.md`, and AC6 exempts exactly those lines and no
  others.
- **`__tests__/stat-box.test.tsx:31`, `duration-field.test.tsx:60`, `regime-field.test.tsx:47` and
  `alert-banner.test.tsx:51,54` are not rewritten into a different way of observing a prop merge.**
  Protects the prop contract the four assertions already cover correctly, and protects `0006`'s
  recorded ruling that `alert-banner.test.tsx:54` belongs to *the next spec that opens `AlertBanner`'s
  prop API* — which this spec is not. **Override:** A6 is in scope under clause **C3** and may have
  its **sentinel** changed to a non-utility string; nothing else about those cases moves — not the
  `it` name, not the assertion shape, not `container.firstElementChild`. AC4 verifies the bound.
- **`container.firstElementChild` is not replaced.** The four prop-merge cases bind to the
  component's root element identity, so a new wrapper would turn them red with no defect. That is
  real structural coupling and it is **not this spec's clause** — none of C1, C2 or C3 reach it.
  Protects the scope from growing into a test-suite refactor. **Override:** none at any gate in this
  spec; it is recorded as a debt with an owner in `STATUS.md`.
- **No new dependency, no new test framework, no new npm script.** Protects the one-file-diff
  maintenance promise in `PRODUCT.md` §3. **Override:** `tech-lead` at G4 with a written
  justification in `plan.md`, per `AGENTS.md` §8.
- **No test is deleted for tidiness.** A deleted test needs a reason as strong as `0006`'s twelve
  e2e cases, and it is proved at G6, not asserted at G5. **Override:** deletion is permitted only
  where AC5 can be satisfied for the deletion itself — i.e. the case's obligation is shown to be
  carried by a named surviving assertion.

## Non-goals

What a well-meaning downstream agent might add, and must not:

- **A repository-wide ban on the substring `class`.** The domain is the three clauses, not a `grep`.
  A ban would take out `cn()`'s own unit tests and the AdSense integration contract, both of which
  this spec rules correct.
- **Rewriting the excluded prop-merge cases "for consistency".** They pass the test. Consistency is
  not a clause.
- **Migrating jsdom assertions to Playwright because `AGENTS.md` §8 mentions the browser.** That
  rule binds assertions whose job is to prove a *CSS override beats another rule*. None of A1–A7 is
  one. Proposing it is a scope change that goes to the human.
- **Raising a coverage threshold, or adding a test to offset a deleted assertion's coverage.**
  Coverage is a floor this spec must not breach (AC7), never a target it pursues.
- **Fixing `day-summary.tsx:50`.** The guard is correct. The test is what is broken.

## Legal dependencies

This change relies on **no rate, bracket, ceiling, divisor, threshold, table or súmula**, and it is
the `labor-law-analyst`'s call at G2 whether that holds. The claim is bounded by two facts, each
with a command in § Evidence:

| Dependency | What G2 must settle |
|---|---|
| **No user-visible number moves.** No file under `lib/` is touched, and `lib/` is where every legal constant lives (`AGENTS.md` §8). | That the seven sites in § Inventory are all under `__tests__/`+`tests/`, and that AC6's zero-diff over `lib/` is the right boundary for "no number moves". |
| **No pt-BR string ships or changes.** Test names and `it` descriptions are English per `AGENTS.md` §8; the only pt-BR in the in-scope files is fixture text (`"Adicionar ganho"`, `"Manhã"`) matching strings `content-writer` already owns. | Whether changing a *fixture* that quotes a shipped pt-BR string is a copy change. This spec asserts it is not, because the shipped string does not move; G2 rules. |
| **`__tests__/copy-guards.test.ts` carries `PRODUCT.md` §9's *banco de horas* non-claim and the descriptor prohibitions.** | Whether this spec's exclusion of that file is sufficient, or whether the law gate requires a named line-range exemption under § Out of scope's second bullet. |
| **A7 sits inside `disclosure-legibility.spec.ts`, the suite that verifies the legal disclosure's legibility floor (LR1/LR2b/LR3, settled in `0005` and `0006`).** | Whether A7's vacuity risk — an empty `.all()` silently skipping every `assertLr2b` — is a live breach of `PRODUCT.md` §4 *name the gap*, and therefore blocking rather than routine. |

If any of the four returns "a number or a shipped string is at stake", this spec's premise is wrong
and it returns to G1 rather than proceeding.

## Disclosure obligations

None **added**. This change computes nothing and renders nothing, so `PRODUCT.md` §4's *name the
gap* creates no new obligation here.

One **protected**: A7 is the selector by which the existing disclosure legibility assertion finds
the captions it measures. If A7 dies the way A1 died, the disclosure keeps its guard in name only —
the `for` loop iterates an empty list and reports green. Whatever replaces A7 must be observably
unable to measure zero elements (AC3).

## Acceptance criteria

| # | Criterion | How it is verified |
|---|---|---|
| **AC1** | Re-running the three commands in § Evidence E1 reproduces the inventory in § Scope exactly — seven in-scope sites, six files, no extra rows and none missing. Where a row has moved line, the row is corrected in this spec before G5 is declared done. | Run E1's three `grep` commands; diff the output against § Inventory row by row. |
| **AC2** | For **each** of A1–A7, a **refuting experiment** is recorded in `reports/qa.md`: the named defect is introduced in an **isolated copy** (never the shared tree — `AGENTS.md` §3 rule 6), the assertion's own test file is run, and the recorded result is **red**. The record names the file, the edit, and the pass/fail count printed. | `reports/qa.md` contains seven rows; each names a command and the counts it printed. |
| **AC3** | AC2's protocol applied to A1 and A7 specifically, at the **pre-fix** state, reproduces the vacuity: A1 green with `day-summary.tsx:50`'s `if (total === 0) return null;` removed (baseline **14 passed (14)**, § Evidence E3), and A7's loop body shown to execute **zero times** when its selector matches nothing. Both are recorded before either is changed. | `reports/qa.md` § pre-fix, with both counts. |
| **AC4** | The diff touches no file outside this set: `__tests__/day-summary.test.tsx`, `__tests__/hero-panel.test.tsx`, `__tests__/layout.test.tsx`, `__tests__/modal-dialog.test.tsx`, `__tests__/alert-banner.test.tsx`, `tests/e2e/disclosure-legibility.spec.ts`, plus files the plan creates. In `alert-banner.test.tsx` the change is confined to the **sentinel string** on lines 51 and 54; the `it` name, the assertion shape and `container.firstElementChild` are byte-identical. | `git diff --name-only <this spec's first commit>^..HEAD`; then `git diff -- __tests__/alert-banner.test.tsx` read line by line. |
| **AC5** | Every assertion removed or replaced has its obligation carried by a **named** surviving assertion, stated in `reports/qa.md` as *"the obligation of `<file>:<line>` is now carried by `<file>:<line>`"*. An assertion whose obligation nothing carries is deleted only with the reason written in `STATUS.md`, and the reason is not "it was redundant" unless the assertion that makes it redundant is named. | `reports/qa.md`; one row per removed assertion. |
| **AC6** | `git diff --name-only <this spec's first commit>^..HEAD -- app/ components/ lib/ hooks/` prints nothing. **Two bounded exemptions and no others:** lines of `__tests__/copy-guards.test.ts` named by `labor-law-analyst` in `legal.md` (§ Out of scope, bullet 2) — which is not in these four directories and so does not affect this command — and a source defect found at G5, which is **routed to the `tech-lead` as a finding and not fixed here** (§ Out of scope, bullet 1). If the command prints a path, the spec is breached. | Run the command; paste the empty output into `reports/qa.md`. |
| **AC7** | `pnpm test:coverage` passes every configured threshold — 100% statements/branches/functions/lines in `lib/**` and `hooks/**`, 90% in `app/**` and `components/**` (`vitest.config.ts:16-21`). The `All files` row is **at or above** the measured baseline of **99.88 / 99.77 / 100 / 100** (§ Evidence E5); a drop is a finding with a written reason, not an accepted cost. | `pnpm test:coverage` in an isolated copy; paste the summary row. |
| **AC8** | `pnpm check` is green and the test count is **≥ 506 across 58 files** (§ Evidence E2), or the shortfall is accounted for assertion by assertion under AC5. | `pnpm check`; paste `Test Files` and `Tests` lines. |
| **AC9** | `pnpm e2e tests/e2e/disclosure-legibility.spec.ts` passes at its recorded case count, **twice**, in an isolated copy that owns its own `.next` and port (`AGENTS.md` §3 rule 6). Two runs because this suite is `0006`'s permanent legibility guard and a flaky pass retires it. | `pnpm exec playwright test --list` for the count, then two `PORT=<free> pnpm e2e` runs. |
| **AC10** | `plan.md` contains a section reconciling any proposed permanent guard with `0006`'s recorded refusal, or states that no guard is proposed and why. A plan silent on this is rejected at G4. | Read `plan.md`; the section names the `0006/STATUS.md` decision it reconciles. |
| **AC11** | `node .agents/tools/docs-check.mjs 0009-tests-asserting-on-class-strings` reports 0 failures. | Run the command. |

No criterion above contains "properly", "correctly", "nicely" or "as expected".

## Inputs and defaults

This spec introduces **no user-facing input**, so `PRODUCT.md` §5's *the default is the common case*
has no field to apply to. The two defaults it does set, for the agents downstream:

| Input | Default | Why |
|---|---|---|
| Isolation for every experiment in AC2/AC3/AC7/AC9 | **Isolated copy** (`rsync --exclude node_modules --exclude .next`, then `cp -al` the `node_modules`) | `AGENTS.md` §3 rule 6. Several agents hold this tree; a mutation another agent observes produces findings against a tree nobody delivered. |
| Disposition of an in-scope assertion when G5 cannot make it fail | **Escalate to the `tech-lead`** | `AGENTS.md` §4 rule 7 — `frontend-dev` makes no decisions. An assertion nobody can refute is either dead or measuring something the spec has not named, and both are decisions. |

## Evidence available

Every command below was run in this tree on 2026-09-15 by `product-manager`, per `AGENTS.md` §5.
Every experiment ran in a session-local isolated copy outside the repository, built with `rsync`
(excluding `node_modules` and `.next`) plus `cp -al` for `node_modules`, per §3 rule 6; the
repository itself was never written to, and no state-changing git command was run.

| # | Claim | Command, and what it printed |
|---|---|---|
| **E1** | The inventory comes from a search over the whole boundary, not from the list handed in. | `grep -rn "toHaveClass\|classList" __tests__/ tests/` → 2 hits, both fixtures. `grep -rnE 'querySelector(All)?\("[^"]*\.[a-zA-Z]' __tests__/ tests/` → 7 hits. `grep -rnE 'className\)?\.?.*(toContain\|toMatch\|toBe\|toEqual)' __tests__/ tests/` → 7 hits. `grep -rnE 'locator\("[^"]*\.[a-z-]+' tests/` → 2 hits. Classified by the three clauses into § Inventory. |
| **E2** | Green baseline. | `pnpm test` → `Test Files 58 passed (58)`, `Tests 506 passed (506)`. |
| **E3** | **A1 is dead.** | `grep -rn "bg-neutral-100" components/ app/` → **0**. In the isolated copy, `if (total === 0) return null;` deleted from `components/organisms/day-summary.tsx:50`, then `pnpm vitest run __tests__/day-summary.test.tsx` → **`14 passed (14)`**. The suite does not see the defect the assertion was written to prevent. Independently, the selector was run in jsdom against four markups including `<div class="rounded-full bg-surface-sunken">` — the live class at `day-summary.tsx:54` — and returned `null` for all four. |
| **E4** | `copy-guards.test.ts:87-92` is **not** dead, so it stays out of scope on evidence. | In the isolated copy, `h-screen` added to one `className` in `components/organisms/hero-panel.tsx`, then `pnpm vitest run __tests__/copy-guards.test.ts` → **`1 failed | 7 passed (8)`**. |
| **E5** | Coverage baseline. | `pnpm test:coverage` in the isolated copy → all thresholds pass; `All files | 99.88 | 99.77 | 100 | 100`. |
| **E6** | The live selectors exist, so C2 is settled for A2–A7. | `grep -rn` over `components/ app/`: `border-t` **4**, `font-hyperlegible` **2**, `overscroll-contain` **1**, `max-w-lg` **1**, `text-caption` **20**, `rounded-full` **12**, `bg-neutral-100` **0**. |
| **E7** | The element A1 was aimed at still exists under a renamed token. | `grep -n "rounded-full" components/organisms/day-summary.tsx` → `:54` `rounded-full bg-surface-sunken`, `:143`, `:156`. |
| **E8** | `0006` refused a class-string guard, and the refusal is about appearance. | `.specs/0006-salary-alert-legibility/STATUS.md`, tech-lead, 2026-09-15: *"A source guard mirroring `px-3` would be the Tailwind-class assertion `AGENTS.md` §8 forbids… and would be blind to the three ways this actually regresses."* And on A6: *"this assertion is not that — it checks that a caller-supplied `className` survives `cn()`'s merge, which is a prop contract."* |

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| Is A6 (`alert-banner.test.tsx:51,54`) this spec's to touch, given `0006` assigned it to *the next spec that opens `AlertBanner`'s prop API*? | **Yes, bounded to the sentinel string only.** | `0006` ruled on clause C1 and was right — it is a prop contract, not an appearance proxy. It did not consider **C3**: `mb-6` is a live utility, so `cn()`'s merge can void it the day the atom gains any `mb-*`. Changing the sentinel is not opening the prop API, and it removes the collision without reopening `0006`'s ruling. If G2 or G4 disagrees, A6 drops out and the § Out of scope override with it. |
| Should a permanent guard against vacuous assertions be built? | **Undecided here — G4's call, bound by AC10.** | `AGENTS.md` §3: architecture is not this gate's. What this gate binds is that the question is answered in writing rather than defaulted to silence. |
| Is A7's vacuity risk blocking or routine? | **Routed to G2** (§ Legal dependencies, row 4). | It guards the legal disclosure's legibility floor. `PRODUCT.md` §4 outranks this spec's own severity judgment, and `labor-law-analyst` is the only agent that may rule on it. |
| Does the coverage floor survive a fix that removes assertions? | **Assume yes; AC7 measures it.** | The seven sites are assertions inside tests that execute the same lines either way, so removal changes assertion strength, not line execution. Assumed, not proved — AC7 is what proves it. |
