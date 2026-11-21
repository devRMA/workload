# 0012 — Implementation plan

> Owner: tech-lead · Gate: `plan` · Run 1 · 2026-09-19
>
> Written against `spec.md` (AC5 rewritten at run 2), `legal.md` (G2 `pass`, run 1), `design.md`
> (G3, run 1) and `copy.md` (G3, run 1). **Two blockers are open against G5 and are named with their
> owners in § Blockers** — neither is decided here, because neither is mine to decide.
>
> **The state every measurement below was read in.** Tree: branch `fix/design-taste-preflight`,
> `HEAD` **5c0c6fa**, **working tree dirty** — `git status --porcelain hooks lib components __tests__
> tests app` returns 44 `M` rows and 9 `??` rows from four sibling agents. Every count, line number
> and test total in this document was read in the **working tree**, not at `5c0c6fa`, and where the
> two disagree the document says so. Application state, where one is needed: the § *Reference
> journey* below.

---

## Reference journey — the state every money figure in this plan is read in

From `legal.md` §12.3. Every figure this plan asserts is produced by this state and by nothing else.

| | |
|---|---|
| Entrada | **19/09/2026 08:00** (um sábado) |
| Almoço | 12:00 → 13:00 |
| Saída | 22:00, **manual** |
| Jornada | 528 min (8h48) |
| Salário bruto / carga | R$ 15.000,00 / 220 h |
| Rates | 50 % / 100 % |
| Mês | setembro/2026 — **30 dias, 4 domingos, 26 dias úteis** |

Reproduced in this session, independently of `legal.md` and of `spec.md`'s probe, with
`node -e` over the same arithmetic (`Intl.NumberFormat("pt-BR")`, the formatter `lib/utils.ts`
uses):

| | known-bad (ships today) | known-good (this plan) |
|---|---|---|
| `firstTierPay` | R$ 0,00 | **R$ 204,55** |
| `extraTierPay` | **R$ 572,73** | **R$ 300,00** |
| `restDayPay` | **R$ 88,11** | **R$ 77,62** |

Both directions, both outputs, same session (`AGENTS.md` §5). The seven-day sweep uses a second,
cheaper journey — § T3 — chosen so its corrected Saturday expectation is byte-identical to the
Monday assertion already in the file.

---

## Architecture

### The approach, in one sentence

Delete the weekday operand, move the tier split out of the hook into `lib/` where its constant can
cite its norm, and add one disclosure paragraph to the one surface that renders the money. **Three
figures move; no fourth figure moves; `lib/weekly-rest.ts` is not edited.**

### What changes, and where

```
lib/overtime-tiers.ts            CREATE   DAILY_OVERTIME_LIMIT_MINUTES (cites N4) + splitOvertime()
lib/compliance.ts                EDIT     deletes its duplicate 120, reads the shared constant  [F4]
hooks/use-work-calculator.ts     EDIT     deletes getDay(), deletes its local splitOvertime and
                                          its FIRST_TIER_LIMIT_MINUTES, imports the lib one  [F1,F2]
components/organisms/
  day-summary.tsx                EDIT     one <p id="weekday-tier-disclosure">                 [W1]
lib/weekly-rest.ts               UNTOUCHED — only its input moves                        [AC5(a)]
lib/payroll.ts                   UNTOUCHED — overtimePay's formula is correct          [legal §12]
```

### Why a new `lib/` module, and why not the three that already exist

The ponytail ladder was run and stopped at rung 7, and the three higher rungs are recorded so a
reviewer can check the reasoning rather than the conclusion:

- **`lib/payroll.ts`** already owns `overtimePay`, which consumes exactly these minutes — the
  obvious home. Rejected: `lib/compliance.ts` must read the same constant (**F4**), and
  `lib/payroll.ts` imports `lib/legal-tables.ts`, so routing the constant through it makes a module
  about *journey warnings* depend on the *tax tables* to learn a duration. That is a false
  dependency, and it is the kind a reviewer at G6 correctly rejects.
- **`lib/compliance.ts`** already holds `DAILY_OVERTIME_LIMIT_MINUTES = 120` with the exact
  **N4** citation this ruling needs. Rejected as the home for `splitOvertime`: the module answers
  *"does this journey breach a CLT limit"*, and a payment-tier split imported from `compliance` is
  a name that misleads every future reader. It becomes the **consumer** of the shared constant
  instead.
- **`lib/day-breakdown.ts`** produces `overtimeMinutes`. Rejected: it is a *journey-to-minutes*
  module with no pay concept in it; adding a tier split widens its job for one function.

So: one new file, two exports, no new type beyond the split's own shape. `lib/overtime-tiers.ts`
is the **single cited source** for CLT art. 59 *caput*, read by one hook and one `lib/` module,
which is what `legal.md` **F4** asks for in those words.

### The hook boundary

`hooks/use-work-calculator.ts` keeps `WorkStats` **byte-identical** — same five fields, same order.
The spread `...splitOvertime(breakdown.overtimeMinutes)` type-checks structurally against it, so no
type in the hook and no prop in any component changes. After the edit the hook asserts **no fact
about the weekday at all**, which is what makes `legal.md` §7's contradiction disappear by
construction rather than by reconciliation.

### The component tree

| Element | Atomic level | Status | Path |
|---|---|---|---|
| `WorkCalculator` | organism | **unchanged** | `components/organisms/work-calculator.tsx` |
| `DaySummary` | organism | **extend** — one child added, nothing removed, no prop added | `components/organisms/day-summary.tsx` |
| Variable-pay block `div.space-y-3.border-t` | in-file | reuse, unchanged | `day-summary.tsx:180-254` |
| Night-premium caption `<p>` | in-file | **unchanged** | `day-summary.tsx:232-235` |
| DSR caption `<p>` | in-file | **unchanged** | `day-summary.tsx:237-243` |
| **Weekday-tier disclosure `<p id="weekday-tier-disclosure">`** | in-file element inside an existing organism | **new** | `day-summary.tsx`, between the DSR caption block and the S1 `<Link>` |
| S1 `<Link>` to `/custo-da-hora` | in-file | **unchanged** | `day-summary.tsx:245-253` |
| `AlertBanner` | atom | **not used here** — `design.md` §3 rejected it on three measured grounds | `components/atoms/alert-banner.tsx` |
| `CollapsiblePanel` | atom | **forbidden here** — `design.md` §10.2; a control makes `legal.md` **W8** binding | `components/atoms/collapsible-panel.tsx` |

**No new component at any atomic level.** The slot reuses the pattern one line above it: a
full-width `--text-caption` / `--color-ink-subtle` paragraph qualifying the figures in the same
block. That reuse is what makes `legal.md` **W4** (equal border-box width within 0,50 px) hold by
construction — `design.md` measured Δ = 0,00 px in 16/16 cells.

### Data flow, end to end

```
entry/lunch/exit (localStorage, user)
  → lib/day-breakdown.ts        buildDayBreakdown  → overtimeMinutes  (integer minutes)
  → lib/overtime-tiers.ts       splitOvertime      → { firstTierMinutes, extraTierMinutes }   NEW
  → hooks/use-work-calculator   calculateWorkStats → WorkStats                            (no getDay)
  → components/organisms/work-calculator.tsx       → props
  → components/organisms/day-summary.tsx
       lib/payroll.ts    overtimePay       → firstTierPay, extraTierPay   (unrounded)
       lib/night-shift.ts nightPremiumPay  → nightPay                     (unrounded)
                          variablePay = sum of the three, UNROUNDED
       lib/weekly-rest.ts restDayPayOnOvertime(variablePay, splitMonthDays(entry)) → restDayPay
       lib/utils.ts      formatCurrency    → the only rounding, at the display boundary
```

**The rounding rule, carried verbatim from `legal.md` §12.2 because a task that omits it makes the
developer choose:** exactly **one** rounding, at the display boundary, to **two decimal places,
half away from zero** (ECMA-402 `roundingMode: "halfExpand"`, which `formatCurrency` does not
override). **No intermediate rounding anywhere.** The DSR's base is **R$ 504,545454…**, never the
R$ 504,55 the user reads as the sum of the two displayed rows. Rounding the tier pays before summing
them is **forbidden** and changes the DSR by fractions of a centavo.

### The order of operations, carried verbatim from `legal.md` §12.1

1. journey → `overtimeMinutes` — whole integer minutes.
2. `firstTierMinutes = min(overtimeMinutes, 120)` · `extraTierMinutes = max(0, overtimeMinutes − 120)` — **no weekday operand**.
3. `hourlyRate = grossSalary ÷ monthlyHours` — unrounded.
4. `firstTierPay = (firstTierMinutes ÷ 60) × hourlyRate × (1 + firstTierRate ÷ 100)` — unrounded.
5. `extraTierPay` — same formula, `extraTierMinutes` and `extraTierRate`.
6. `nightPay` — unrounded.
7. `variablePay = firstTierPay + extraTierPay + nightPay` — **the unrounded values**.
8. `restDayPay = variablePay ÷ workingDays × restDays`.
9. display — `formatCurrency`.

Steps 3–9 are already correct in the shipped tree and **no task edits them**.

### The citation rule, and the trap next to it

`AGENTS.md` §8 allows a comment **only** in `lib/`, and only when it cites a Brazilian norm — the
guard is `__tests__/comment-free-code.test.ts`, which matches `/\b(CLT|Lei|Decreto|Portaria|Súmula|OJ|IN RFB|CF)\b/`
against comments in `NORM_CITATION_DIRECTORIES = ["lib"]`. So:

- `DAILY_OVERTIME_LIMIT_MINUTES` in `lib/overtime-tiers.ts` **carries** its comment (CLT art. 59, *caput*).
- `splitOvertime` **carries** its comment (CF art. 7º, XVI; CLT art. 59, §1º).
- **`DEFAULT_EXTRA_TIER_RATE = 100` stays in the hook and may not be given a citation, here or
  anywhere.** `legal.md` §8.1 half 2: no unit of art. 59 or of the CF tiers a rate; the 100 % step
  is a convenção coletiva figure. `legal.md` §13 **Q2** warns that **F2's move puts a neighbouring
  constant next to it, and adjacency is exactly where a false citation gets attached.** A G6
  reviewer who reads a norm comment beside a `100` rejects on that alone. No task below moves,
  renames or annotates it.

### Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Split overtime minutes into two tiers | **No dependency.** `Math.min` / `Math.max` | Rung 3 of the ladder. Two stdlib calls. |
| Read the weekday | **Deleted, not replaced.** No `date-fns` call, no `getDay()` | `legal.md` §5.4 / §6.1 — the operand does not exist in the corrected rule. |
| Hyphenate the disclosure | **CSS, via the `hyphens-auto` Tailwind utility** | Rung 4 — the platform does it. `design.md` §4 measured it against `text-pretty` on four fillers. Gated on **B2**. |
| Render the disclosure | **A `<p>`.** No component, no atom, no `AlertBanner` | Rung 2 — the pattern ships one line above it. |

**No new dependency is added by this plan.** `motion`, `next-themes`, `date-fns`,
`@tabler/icons-react`, `clsx` and `tailwind-merge` are all already installed and none of them gains
a new import here.

### Motion

**None.** `design.md` §7 introduces no animation and gives the reason as a `DESIGN.md` rule, not an
omission: the money beside this paragraph changes on every keystroke, and `DESIGN.md` § Motion
forbids animating anything triggered by a keystroke. The paragraph introduces **no state-bound
transform**, so **no `motion-reduce:` neutralizer is owed** — and a bare `motion-reduce:transform-none`
would be noise at specificity `0-1-0` that loses to anything it might fight (`AGENTS.md` §8). The
card's existing view-change spring is untouched and is already covered by
`MotionConfig reducedMotion="user"` at `components/templates/theme-provider.tsx:10`. **T4's test
asserts the reduced-motion path as an absence** — see its Tests.

---

## Blockers — raised here, decided by their owners, not by me

| Id | Blocks | Owner | What is open |
|---|---|---|---|
| **B1** | **T4** | `product-designer`, with `content-writer` as co-respondent | **`copy.md`'s delivered string is 327 characters; `design.md` §8's budget window is 215–270, inclusive.** Both measured; both correct in their own document; they cannot both bind. Detail below. |
| **B2** | **T4's `hyphens-auto` utility only** | **the human**, via `team-lead` | `design.md` §11 flags one `DESIGN.md` § Typography § Named Rules addition (a disclosure paragraph in a narrow column hyphenates) as a **human approval point** per `AGENTS.md` §4. The code ships `hyphens-auto` on the primary path. If the human declines, the utility comes out and `design.md` §11 states the measured consequence. **I am not ordering that fallback and no task below carries it** — a pre-analysed fallback answers *which option*, never *is this the problem*. |
| **H1** | **all of G5** | **the human** (already open in `STATUS.md`) | `AGENTS.md` §4 rule 8 and `spec.md` **AC8**: the 2026-09-14 acceptance of the *"weekend tier"* imprecision. **No task below may start until H1 is recorded in the decisions log.** |

### B1 in full, because the shape of the conflict decides who answers it

Measured in this session, on the delivered string:

```
$ python3 -c 'print(len(s))'      → 327
$ python3 -c 're.search(r"[—–]", s)' → None      (copy-guards em-dash rule: clean)
sentence-boundary split            → 95 / 231     (copy.md records 96/230; the delta is the space)
```

Against `design.md` §8's own capacity table, read in the same box (390×844, S3, light,
`hyphens-auto`, 12 px / 17,4 px): 320 chars → **7** line boxes; 347 → **8**. 327 therefore renders
**7 or 8** line boxes, against the budget's target of **5–6** and its stated ceiling reason —
*"at 286 the paragraph takes a seventh line for no extra claim."*

**Three things a reviewer should not have to re-derive:**

1. **No W-clause is proven to fail at 327.** W4 (width) is unaffected; W2 (height > 0, opacity 1) is
   unaffected; W7 (order) is unaffected and only gets stronger; LR2b's 40-cpl floor is met with more
   margin at a longer string, not less. What 327 costs is **card height** — one to two extra line
   boxes, 17,39–34,78 px at 390. W5's 45-character floor is decidable only on the delivered string
   (`design.md` §10.1) and is a G6 reading either way.
2. **The 96/230 split does not resolve it.** Two `<p>`s give 95 and 231 characters; **95 is far
   below the 215 floor**, so the first paragraph would be a three-line fragment scored by LR2b on
   its own — and `design.md` §8 states in terms that two `<p>`s *"changes the guard's subject and
   the W5/LR2b accounting, and it is a bounce to this gate, not a decision downstream."*
3. **Which document governs, procedurally.** `design.md` §8 is the later artifact, it measured the
   box, and it reserves this exact disagreement to its own gate. `copy.md`'s § Handoff asks for the
   reverse — *"this count is the thing to reconcile `design.md` against"* — but it was written
   while `design.md` was still the template stub and says so. **So `design.md` governs the
   reconciliation, and `product-designer` answers B1**: either the ceiling moves to ≥ 327 with the
   line-box cost accepted in writing (its own §2.2 already measured the slot at a **301**-char
   filler, 7 line boxes, 121,73 px, card cost +133,74 px — so the geometry of a 7-line paragraph is
   already on its record), or it holds 215–270 and `content-writer` cuts to fit **without dropping
   C1 or the *"esta tela não calcula"* half of C2**, which `legal.md` §10 proves are load-bearing.
   **I am not choosing between those two.**

**Until B1 is discharged, T4 does not start.** The string is the task's verbatim payload; a
developer who starts T4 on the 327-char text and B1 lands on the short one has done the work twice,
and a developer who starts on a guessed short one has written copy.

---

## Corrections to the record, measured here

Two numbers this plan is planned against disagree with numbers already written down. Per
`AGENTS.md` §5, the state that accounts for each delta is named rather than a regression declared.

**C-1 — `legal.md` §11.1's prediction that the suite will read one higher at G5 is not confirmed.**

```
$ git show HEAD:__tests__/use-work-calculator.test.ts | grep -c "  it("   → 33
$ grep -c "  it(" __tests__/use-work-calculator.test.ts                   → 34
$ npx vitest run __tests__/use-work-calculator.test.ts                    → 34 passed (34)
```

`spec.md` R1c reported `1 failed | 33 passed (34)`. That reads as impossible against `HEAD`'s 33
cases — and it is not, because R1c's copy was an `rsync` of the **working tree**, which already
carried the sibling's added case. So R1c's `(34)` **already includes it**, and the file will read
**34** at G5, not 35. T3 changes the count again by its own design, so T3's *Done when* requires the
developer to **record** the count rather than match a number written here.

**C-2 — two of `design.md`'s geometry figures were read before a sibling edit landed, and no clause
breaks.** `design.md` §0 recorded `git status --porcelain components/organisms/day-summary.tsx` as
**empty**; it is now `M`, and the diff **adds a night-premium caption `<p>` at `:232-235`**, above
the DSR caption. Consequence: the disclosure's Δtop vs the extra-tier row (`+176,17 px` @390, S3)
and the card cost (`+133,74 px`) are **stale by that paragraph's height**. W4 (width), W5 (measure),
W2 (space) and LR3.5 are unaffected; W7 requires Δtop strictly *positive* and only gets more so.
**This is not a bounce to G3** — it is one paragraph of additional context above the slot. Recorded
so that no report at G6 quotes `+176,17` as a current reading, and so that the disclosure's
placement instruction in T4 names **three** preceding siblings, not two.

---

## Tasks

**Global preconditions, binding on every task below.**

- **H1 must be recorded in `STATUS.md` before T1 starts** (`spec.md` **AC8**).
- **`pnpm check` must be green after every task.** Baseline measured in this session:
  `npx tsc --noEmit` → exit **0**; `npx vitest run __tests__/use-work-calculator.test.ts` →
  34 passed. The tree is shared and dirty; if `pnpm check` is red *before* the developer's first
  edit, that is a **finding to route to `tech-lead`**, not a task to fix.
- **No comments in shipped code** outside `lib/` norm citations and tooling directives
  (`AGENTS.md` §8, enforced by `__tests__/comment-free-code.test.ts`). No task below asks for one
  and no code sample below contains one.
- **Never assert a Tailwind class string.** Query by accessible role and name.
- **English identifiers, pt-BR only in user-visible strings.**

---

### T1 — Create `lib/overtime-tiers.ts` as the single cited source for the tier split

- **Files:**
  - `lib/overtime-tiers.ts` — **create**
  - `__tests__/overtime-tiers.test.ts` — **create**
- **Depends on:** none
- **Reuse:** nothing to import. `Math.min` / `Math.max`. Do **not** import from `lib/payroll.ts`,
  `lib/compliance.ts` or any hook — this module is a leaf.
- **What to build:**

  Exactly three exports, in this order, with these names and these types:

  ```ts
  // CLT art. 59, caput, com a redação da Lei 13.467/2017: a jornada extra não excede duas horas por dia.
  export const DAILY_OVERTIME_LIMIT_MINUTES = 120;

  export interface OvertimeTierSplit {
    firstTierMinutes: number;
    extraTierMinutes: number;
  }

  // CF art. 7º, XVI e CLT art. 59, §1º: o acréscimo mínimo de 50% incide sobre toda hora extra, sem operando de dia da semana.
  export function splitOvertime(overtimeMinutes: number): OvertimeTierSplit {
    return {
      firstTierMinutes: Math.min(overtimeMinutes, DAILY_OVERTIME_LIMIT_MINUTES),
      extraTierMinutes: Math.max(0, overtimeMinutes - DAILY_OVERTIME_LIMIT_MINUTES),
    };
  }
  ```

  - The two comments are the **only** comments in the file, they are in `lib/`, and each matches
    `__tests__/comment-free-code.test.ts`'s `NORM_CITATION` pattern (`CLT`, `CF`, `Lei`).
  - **`splitOvertime` takes one parameter.** There is no `isWeekend`, no `entry`, no `Date`, no
    second argument, and no optional argument. `legal.md` §5.4 / §6.1: *no weekday operand of any
    kind*.
  - No `export default`. No class. No factory. No options object.
  - Do **not** add a rate constant of any kind to this file. `DEFAULT_FIRST_TIER_RATE` and
    `DEFAULT_EXTRA_TIER_RATE` stay in `hooks/use-work-calculator.ts`, untouched and unmoved
    (`legal.md` §8.1, §13 **Q2**).

- **Tests:** `__tests__/overtime-tiers.test.ts`. The bar for `lib/**` is **100 % statements,
  branches, functions, lines** — these seven cases reach it:

  | Case name (verbatim) | Input | Expected |
  |---|---|---|
  | `puts the whole excess in the first tier below the two-hour ceiling` | `splitOvertime(72)` | `{ firstTierMinutes: 72, extraTierMinutes: 0 }` |
  | `fills the first tier exactly at the two-hour ceiling` | `splitOvertime(120)` | `{ firstTierMinutes: 120, extraTierMinutes: 0 }` |
  | `spills one minute past the ceiling into the second tier` | `splitOvertime(121)` | `{ firstTierMinutes: 120, extraTierMinutes: 1 }` |
  | `caps the first tier and spills the rest over` | `splitOvertime(252)` | `{ firstTierMinutes: 120, extraTierMinutes: 132 }` |
  | `splits nothing on a day with no overtime` | `splitOvertime(0)` | `{ firstTierMinutes: 0, extraTierMinutes: 0 }` |
  | `never returns a negative second tier` | `splitOvertime(-30)` | `{ firstTierMinutes: -30, extraTierMinutes: 0 }` |
  | `sits the ceiling where CLT art. 59 caput puts it` | `DAILY_OVERTIME_LIMIT_MINUTES` | `toBe(120)` |

  Use `toEqual` for the object cases and `toBe` for the constant. No snapshot.

- **Done when:** `pnpm test __tests__/overtime-tiers.test.ts` green (7 passed), `pnpm check` green,
  and `npx vitest run --coverage __tests__/overtime-tiers.test.ts` shows `lib/overtime-tiers.ts` at
  **100/100/100/100**. Advances **AC3** (second half: the `lib/` module that carries the split cites
  its norm) — verify with `grep -cE "CLT|Lei |Súmula|CF" lib/overtime-tiers.ts` → **≥ 1**, which is
  the boundary form `spec.md` **AC3** names.

---

### T2 — Point `lib/compliance.ts` at the shared constant so one norm has one field

- **Files:** `lib/compliance.ts` — **edit**
- **Depends on:** T1
- **Reuse:** `lib/overtime-tiers.ts` — `DAILY_OVERTIME_LIMIT_MINUTES`.
- **What to build:**
  - Delete the local declaration **and its comment** at `lib/compliance.ts:6-7`:
    ```
    // CLT art. 59, caput: a jornada extra não excede duas horas por dia.
    const DAILY_OVERTIME_LIMIT_MINUTES = 120;
    ```
  - Add, as the file's first line, above the `ComplianceWarning` interface:
    ```ts
    import { DAILY_OVERTIME_LIMIT_MINUTES } from "./overtime-tiers";
    ```
    Relative specifier with no extension — the idiom every other `lib/` module uses
    (`lib/payroll.ts:1`, `lib/day-breakdown.ts:2-3`).
  - **Change nothing else.** The five other constants keep their comments and their values; every
    warning string is byte-identical; `findComplianceWarnings`'s logic is untouched. **The value is
    the same 120 on both sides, so no figure and no warning threshold moves** — this task is a
    de-duplication, not a behaviour change.
- **Reuse note:** this discharges `legal.md` **F4** in its own words — *"F2's `lib/` module should
  be the single cited source and `lib/compliance.ts` should read it."*
- **Tests:** none added. `__tests__/compliance.test.ts` is the guard and must stay **green and
  unedited** — a compliance test that needs editing means the value moved, which this task forbids.
- **Done when:** `pnpm test __tests__/compliance.test.ts` green with **zero edits to that file**
  (`git diff --stat __tests__/compliance.test.ts` → no change from this task), `pnpm check` green,
  and `grep -rn "= 120" lib hooks` returns **exactly one** row, in `lib/overtime-tiers.ts`.
  Advances **AC3**, and discharges `legal.md` **F4**.

---

### T3 — Delete the weekday operand from the hook, and correct the two guards that pin it

This is one task and not three because the hook edit alone turns an existing green assertion red,
and because `spec.md` **AC5** requires an assertion on `restDayPay` to be **seen red** before it is
seen green.

- **Files:**
  - `hooks/use-work-calculator.ts` — **edit**
  - `__tests__/use-work-calculator.test.ts` — **edit**
  - `__tests__/work-calculator.test.tsx` — **edit**
- **Depends on:** T1
- **Reuse:** `lib/overtime-tiers.ts` — `splitOvertime`. Do **not** re-implement the split, and do
  not keep a local copy of it (lesson **030**).

#### Step 1 — write the assertions and **see them red**, before touching any source file

**1a. `__tests__/work-calculator.test.tsx`** — one new case, appended inside the existing
`describe("WorkCalculator", …)` block, after the last `it(...)`. This is the only assertion in the
repository that pins all three moving figures end to end, through the real hook and the real
`DaySummary`.

Measured in this session and stated so it is not re-derived:
`grep -rnE "DSR" __tests__ tests | grep -cE 'R\$|[0-9]+,[0-9]{2}'` → **0**, and
`grep -rnE "77,62|88,11|572,73|204,55" __tests__ tests` → **0 rows**. **No test pins the DSR money
value today**, which is exactly why `pnpm test` alone is a vacuous check on the third figure
(`spec.md` **AC5**, `AGENTS.md` §5).

```tsx
it("prices a Saturday's overtime exactly as it prices a weekday's, DSR included", () => {
  vi.setSystemTime(new Date("2026-09-19T23:00:00"));
  localStorage.setItem("entry", "2026-09-19T08:00");
  localStorage.setItem("lunchStart", "2026-09-19T12:00");
  localStorage.setItem("lunchEnd", "2026-09-19T13:00");
  localStorage.setItem("exitOverride", "2026-09-19T22:00");
  localStorage.setItem("isManualExit", "true");
  localStorage.setItem("workMinutes", "528");
  localStorage.setItem("firstTierRate", "50");
  localStorage.setItem("extraTierRate", "100");
  localStorage.setItem("grossSalary", "15000");
  localStorage.setItem("monthlyHours", "220");

  render(<WorkCalculator />);

  expect(screen.getByText("R$ 204,55")).toBeInTheDocument();
  expect(screen.getByText("R$ 300,00")).toBeInTheDocument();
  expect(screen.getByText("R$ 77,62")).toBeInTheDocument();
});
```

Every operand above is fixed for a reason the developer must not second-guess:

- The `beforeEach` in that `describe` already calls `localStorage.clear()`, `vi.useFakeTimers({ toFake: ["Date"] })`
  and `storeJourney()`. The `setItem` calls above **overwrite** `storeJourney()`'s three keys; that
  is intended, and `storeJourney()` is not modified.
- **`vi.setSystemTime` must be `2026-09-19`.** `useWorkCalculator`'s restore shifts a stored journey
  onto today by `differenceInCalendarDays` (`hooks/use-work-calculator.ts:150-155`). Any other
  system date silently moves the entry off the Saturday and the test stops measuring what it names.
  `23:00` is chosen so the clock is past the manual exit and `isManualExit: true` makes
  `countedExit === displayExit` (`:183`) — the journey is closed, not in progress.
- **setembro/2026 = 30 dias, 4 domingos, 26 dias úteis**, reproduced here with `node`. That is what
  makes `R$ 77,62` an exact expected value rather than a month-dependent one.
- `getByText` with the **full formatted string** including `R$ ` and the pt-BR comma. Not a regex,
  not a partial — the point is the centavo.

**Run it now, against the unedited source.** Expected red output, and it is the known-bad state of
§ *Reference journey*: the screen renders `R$ 0,00`, `R$ 572,73` and `R$ 88,11`, so
`getByText("R$ 204,55")` throws `Unable to find an element with the text: R$ 204,55`. **Paste the
red run into the G5 report.** A green run at this step means a precondition above is wrong — stop
and route to `tech-lead`, do not adjust the expected values.

**1b. `__tests__/use-work-calculator.test.ts`** — replace the guard at `:92-103`,
`"pays all weekend overtime at the higher tier"`, with the sweep `legal.md` §11.1 requires as a
legal requirement and not a test-style preference. **Delete** that `it(...)` block entirely; do not
leave it renamed and do not leave it skipped.

Add, inside `describe("calculateWorkStats", …)`, immediately where the deleted block was:

```ts
const WEEKDAY_CLASS_DATES = [
  "2025-01-05",
  MONDAY,
  "2025-01-07",
  "2025-01-08",
  "2025-01-09",
  "2025-01-10",
  SATURDAY,
] as const;

it("sweeps all seven weekday classes exactly once", () => {
  expect(WEEKDAY_CLASS_DATES).toHaveLength(7);
  expect(new Set(WEEKDAY_CLASS_DATES.map((date) => new Date(`${date}T08:00`).getDay()))).toEqual(
    new Set([0, 1, 2, 3, 4, 5, 6]),
  );
});

for (const date of WEEKDAY_CLASS_DATES) {
  it(`splits the same overtime the same way on ${date}`, () => {
    const stats = calculateWorkStats(
      `${date}T08:00`,
      `${date}T12:00`,
      `${date}T13:00`,
      `${date}T20:00`,
      FULL_DAY_MINUTES,
    );

    expect(stats.firstTierMinutes).toBe(120);
    expect(stats.extraTierMinutes).toBe(12);
  });
}
```

- **The set-size assertion comes before the iteration, and zero is never a pass** (`legal.md` §11.1,
  `AGENTS.md` §5). `toHaveLength(7)` alone does not discriminate — a list of seven Mondays passes
  it — which is why the `getDay()` set is asserted too.
- **Every row asserts the same two numbers**, so the test fails if any weekday is special-cased in
  either direction.
- `MONDAY` (`2025-01-06`) and `SATURDAY` (`2025-01-11`) are the file's existing constants and stay
  declared and used; the five literals fill the rest of that week. Verified in this session:
  `getDay()` over the seven reads `0,1,2,3,4,5,6`.
- **The Saturday expectation is `firstTierMinutes === 120`, `extraTierMinutes === 12`** — byte-identical
  to the Monday assertion already in the file at `:84-90` (`"caps the first tier at two hours and
  spills the rest over"`), which `legal.md` §11.1 names as the expectation this fixture must reach.
  Journey 08:00 → 20:00 with a 12:00–13:00 lunch and `FULL_DAY_MINUTES` = 528: 660 worked,
  132 overtime, `min(132,120)=120`, `max(0,132−120)=12`, no night minutes.
- The existing `"caps the first tier…"` case at `:84-90` **stays**. It is not redundant: it is the
  Monday reading this sweep is calibrated against, and deleting it removes the calibration.

**Run it now.** Expected red: **exactly one** failing case, `splits the same overtime the same way
on 2025-01-05` and `… on 2025-01-11` — the two weekend classes — reporting `expected 0 to be 120`.
**Paste the red run.** Record the total case count the runner prints; do not match it against any
number in this document (see § C-1).

#### Step 2 — remove the operand

**`hooks/use-work-calculator.ts`**, four edits and no others:

1. **Delete** line 9, `const FIRST_TIER_LIMIT_MINUTES = 120;`. Leave `MINUTES_PER_HOUR` and
   `EXIT_REFINEMENT_PASSES` untouched — `MINUTES_PER_HOUR` is still read by `DEFAULT_WORK_MINUTES`.
2. **Delete** the whole local `splitOvertime` function, lines 38–50.
3. **Add** to the import block, after the `lib/journey` import and before the `lib/storage` one so
   the specifiers stay alphabetical by path:
   ```ts
   import { splitOvertime } from "@/lib/overtime-tiers";
   ```
4. In `calculateWorkStats`, **delete** line 64 (`const dayOfWeek = new Date(entry).getDay();`) and
   change line 70 to:
   ```ts
   ...splitOvertime(breakdown.overtimeMinutes),
   ```

**What must not change:** the `WorkStats` interface keeps its five fields, their names, their types
and their order — the spread type-checks against it structurally and no component prop moves.
`DEFAULT_FIRST_TIER_RATE`, `DEFAULT_EXTRA_TIER_RATE`, `DEFAULT_WORK_MINUTES`, `STORAGE_KEYS`,
`calculateSuggestedExit` and every `useEffect` are untouched. **No comment is added to this file** —
`hooks/` is outside `comment-free-code.test.ts`'s norm-citation exemption, so a citation here is a
hard failure.

After the edit, `entry` is still a parameter of `calculateWorkStats` and is still used by
`breakdownOf` — the parameter is not removed.

#### Step 3 — see it green

- **Tests:** the three files above. `hooks/**` carries the **100 %** bar; the sweep plus the
  existing 33 cases keep `hooks/use-work-calculator.ts` fully covered, and the branch deleted in
  step 2 removes the only weekday branch there was.
- **Done when:**
  - `pnpm test __tests__/use-work-calculator.test.ts` green, and the developer **records the case
    total the runner prints** in the G5 report, beside the before-count (34, measured in this
    session) and the arithmetic that accounts for the delta (−1 deleted, +1 set-size, +7 sweep).
  - `pnpm test __tests__/work-calculator.test.tsx` green, with the red run from step 1a pasted
    beside it.
  - `grep -rnE "getDay\(\)|dayOfWeek|isWeekend" app components hooks` → **0 rows**. Baseline in this
    session: **4 rows**, all in `hooks/use-work-calculator.ts` (`:40`, `:42`, `:64`, `:70`). The
    search is over the whole directory boundary, so it cannot be satisfied by moving one line.
    `lib/weekly-rest.ts:12`'s `getDay()` is **outside** this search and stays.
  - `npx vitest run --coverage hooks/` shows `hooks/use-work-calculator.ts` at 100/100/100/100.
  - `pnpm check` green.
  - Advances **AC1**, **AC2**, **AC3** (first half), **AC5** clauses (a) and (b).

---

### T4 — Add the weekday-tier disclosure to `DaySummary`

> **Blocked on B1 and B2. Do not start this task until both are discharged in `STATUS.md`.**
> The pt-BR string below is `copy.md`'s delivered text **as written today**; if B1 resolves by
> shortening it, the replacement string comes from an amended `copy.md` and **nothing else in this
> task changes** — not the element, not the id, not the placement, not the condition, not the test
> cases.

- **Files:**
  - `components/organisms/day-summary.tsx` — **edit**
  - `__tests__/day-summary.test.tsx` — **edit**
- **Depends on:** T3 (so the rendered figures the disclosure qualifies are the corrected ones), B1, B2
- **Reuse:**
  - the shipped caption pattern at `day-summary.tsx:232-235` and `:237-243` — same `<p>`, same two
    tokens, same block, no new component (`design.md` §3);
  - `tests/e2e/support/legibility.ts` is **not** used here — it is T5's.
  - Do **not** import `AlertBanner`, `CollapsiblePanel`, any icon, or `cn()` for this element.

- **What to build:**

  One `<p>`, inserted in the variable-pay block `div.space-y-3.border-t border-line-faint pt-6`
  (`day-summary.tsx:180`), **after** the DSR caption block that ends at `:243` and **before** the
  `grossHourlyRate === null ? (<Link …>) : null` block that begins at `:245`. Its three preceding
  siblings in that block are, in order: the money rows `div.space-y-2`, the night-premium caption,
  the DSR caption (see § C-2 — the night-premium caption is newer than `design.md`'s reading).

  ```tsx
  {grossHourlyRate === null ? null : (
    <p id="weekday-tier-disclosure" className="text-caption text-ink-subtle hyphens-auto">
      As horas extras desta tela valem o mesmo em qualquer dia da semana: sábado, domingo ou dia
      útil. Por lei, domingo ou feriado não compensado por folga é pago em dobro (Súmula 146 do TST;
      art. 9º da Lei 605/49), mas esta tela não calcula essa dobra: ela não pergunta se houve folga
      compensatória e não tem calendário de feriados.
    </p>
  )}
  ```

  Binding details, each of which a task that omitted it would leave the developer to invent:

  - **The rendering condition is `grossHourlyRate === null ? null : (…)` and nothing else.** Not
    `restDayPay > 0` (that is the DSR row's narrower condition at `:221` and `:237`), not
    `overtimeMinutes > 0`, not a weekday, not a panel state. `legal.md` **W1** and `design.md` §3.1:
    the gate on the disclosure is the same gate as on the money. Gating it on `restDayPay > 0`
    is `design.md` §10.3's own named way to make **W1** go red, and it silently drops the
    disclosure in **S2**.
  - **The `id` is `weekday-tier-disclosure`**, verbatim. It is the stable selector T5 asserts a set
    size on; a class-based selector would also match the two sibling captions and the four footer
    paragraphs (`design.md` §3).
  - **The classes are exactly `text-caption text-ink-subtle hyphens-auto`.** `text-caption` and
    `text-ink-subtle` are the tokens in `app/globals.css` that both sibling captions already use.
    **`hyphens-auto` and not `text-pretty`** — measured in `design.md` §4/§10.1: `text-wrap: pretty`
    rebalances the tail and *lowers* earlier lines, cancelling hyphenation's gain (47 → 39 on a
    106-char filler), while `hyphens: auto` raises the fill on three of four fillers and removes a
    line box on one. **Gated on B2.** No `text-pretty`, no `max-w-*`, no `px-*`, no `mt-*`, no
    `border`, no `rounded-*`, no `bg-*`, no `opacity-*` — every one of those breaks **W4** or **W2**
    in a way `design.md` §10.3 enumerates.
  - **No `role`, no `aria-label`, no `title`, no `sr-only`, no `tabIndex`.** Its whole accessible
    name is its text (`legal.md` **W6**; `design.md` §9). It is **not** inside any live region, and
    none is added — `TotalRow`'s `aria-live="polite"` belongs to the in-progress total and
    re-announcing statutory text on every keystroke is the failure `design.md` §9 names.
  - **No motion, no transition, no `motion-reduce:` utility.** There is no state-bound transform to
    neutralize (`design.md` §7, `AGENTS.md` §8).
  - **No control of any kind** — no `<details>`, no `<summary>`, no "saiba mais" link, no info
    button, no tooltip, no `CollapsiblePanel`. Adding one makes `legal.md` **W8** binding and is a
    bounce to G3 (`design.md` §10.2).
  - **JSX whitespace.** The string is wrapped across source lines by Biome; JSX collapses the
    newlines to single spaces, so the rendered `textContent` is the one-line 327-character string.
    Do **not** insert `{" "}`, `&nbsp;`, `<br />` or a template literal.
  - **The two existing captions and the footer are not edited.** `day-summary.tsx:232-235`
    (night premium), `:237-243` (DSR) and `components/organisms/calculator-views.tsx:82-87`
    (footer) ship byte-identical (`legal.md` §7, §9.6; `copy.md` § Disclosures). Two different
    sentences about one gap is correct; one sentence printed twice is the lesson-047 failure.
  - **No em dash or en dash.** `__tests__/copy-guards.test.ts:70-79` reads every non-comment line of
    every `.tsx?` under `app`, `components` and `lib`. Verified on the delivered string in this
    session: `re.search(r"[—–]", s)` → `None`.

- **Tests:** `__tests__/day-summary.test.tsx`, five new cases. `components/**` carries the **90 %**
  bar; these cover the new branch in both directions.

  | Case name (verbatim) | Props | Assertion |
  |---|---|---|
  | `states that the weekday does not change what the overtime is worth` | `{ firstTierMinutes: 120, extraTierMinutes: 12, grossHourlyRate: 13.6364 }` (S3) | `screen.getByText(/valem o mesmo em qualquer dia da semana/)` is in the document, and `toHaveTextContent` for each of: `sábado, domingo ou dia útil`, `não compensado por folga é pago em dobro`, `Súmula 146 do TST`, `art. 9º da Lei 605/49`, `esta tela não calcula essa dobra`, `folga compensatória`, `calendário de feriados` — **one assertion per clause of `legal.md` §10's C1/C2/C3**, so a partial rewrite cannot pass |
  | `keeps the weekday disclosure on a day with no overtime at all` | `{ firstTierMinutes: 0, extraTierMinutes: 0, nightMinutes: 0, grossHourlyRate: 20 }` (S2) | the same element is present **and** `screen.queryByText("DSR de extras e noturno")` is `null` — this is the S2 cell, where the disclosure must render and the DSR row must not. This case is what makes a `restDayPay > 0` gate fail |
  | `leaves the weekday disclosure out when no money is on screen` | `{ grossHourlyRate: null }` (S1) | `screen.queryByText(/valem o mesmo em qualquer dia da semana/)` is `null`, and the S1 link `getByRole("link", { name: /Calcule o valor da sua hora/ })` is present |
  | `puts the weekday disclosure after the DSR caption and before the salary link` | `{ firstTierMinutes: 120, grossHourlyRate: 13.6364 }` | read the disclosure's `previousElementSibling` and assert `toHaveTextContent("Feriados não entram")`; assert `nextElementSibling` is `null` in S3. Mirrors the shipped idiom at `day-summary.test.tsx:225-229` and covers `legal.md` **W7** in document order — the geometric half is T5's |
  | `carries no control and no aria override on the weekday disclosure` | `{ firstTierMinutes: 120, grossHourlyRate: 13.6364 }` | on the element: `tagName` is `P`; `querySelector("button, a, details, summary, [role], [aria-label], [title]")` is `null`; `hasAttribute("tabindex")` is `false`. This is **W6** + **W8** as an assertion rather than as a promise, and it is the reduced-motion path too — there is nothing to suppress, asserted as an absence rather than left unstated |

  **Never assert the class string.** `hyphens-auto`'s effect is a cascade question and jsdom cannot
  read it; it is measured in a real browser in **T5** (`AGENTS.md` §8).

- **Done when:** `pnpm test __tests__/day-summary.test.tsx` green, `pnpm check` green,
  `grep -c "weekday-tier-disclosure" components/organisms/day-summary.tsx` → **1**, and
  `git diff components/organisms/calculator-views.tsx` → empty. Advances **AC4** (DOM half) and the
  disclosure obligation in `spec.md` § Disclosure obligations.

---

### T5 — Guard the disclosure in a real browser across its whole state matrix

- **Files:** `tests/e2e/weekday-tier-disclosure.spec.ts` — **create**
- **Depends on:** T4
- **Reuse — named by path, because none of this is written from scratch:**
  - `tests/e2e/support/legibility.ts` — `assertLr1`, `assertLr2b`, `assertLr3Rendering`,
    `lineBoxesAndCharacters`, `driveC5`, `driveUntil`, `waitForStableBoundingBox`;
  - `tests/e2e/divisor-disclosure.spec.ts` — the structural precedent: a `STATES` array, a
    `test("covers exactly the N states…")` asserting its length **before** any iteration, then the
    `state × viewport × theme` loop. Follow it; do not invent a second shape;
  - `lib/storage.ts` — `GROSS_SALARY_KEY`, `MONTHLY_HOURS_KEY`, `DAILY_MINUTES_KEY` for seeding,
    imported by `@/lib/storage` as `divisor-disclosure.spec.ts` already does.

- **What to build:**

  Route `/`. Selector `#weekday-tier-disclosure`. The matrix is `legal.md` §9.5's, which supersedes
  `spec.md` **AC4**'s:

  > **3 states × 2 viewports (390×844, 1440×900) × 2 themes = 12 cells. S1's 4 cells are exempt
  > with their reason. 8 measured + 4 exempt = 12.**

  | State | How to reach it (drive, do not assume) | Expected |
  |---|---|---|
  | **S1** | no `grossSalary` / `monthlyHours` seeded | disclosure `toHaveCount(0)`; the `Calcule o valor da sua hora` link visible. **Counted as `exempt`, printed, never as a silent skip** |
  | **S2** | seed `GROSS_SALARY_KEY=15000`, `MONTHLY_HOURS_KEY=220`, `DAILY_MINUTES_KEY=528`; leave the default journey, which closes on balance | disclosure present; the two tier figures read `R$ 0,00`; `DSR de extras e noturno` absent |
  | **S3** | same seed, then `driveC5(page)` from `support/legibility.ts` — it checks `MANUAL` and fills the exit with `2000` — wrapped in `driveUntil` against a settled predicate, because a controlled input re-renders (lesson **027**) | disclosure present; the DSR row present |

  **The synchronization barrier for S3 is named and is not a timeout:** `driveUntil`'s `settled`
  predicate is *the `DSR de extras e noturno` row is visible*, polled by `driveUntil`'s own
  intervals. Only after it resolves is any geometry read.

  Per measured cell, assert:

  1. **Set size before iterating.** `await expect(page.locator("#weekday-tier-disclosure")).toHaveCount(1)`
     — one, not `>= 1`, and zero is never a pass. Accumulate `measured` and `exempt` and push a
     `test.info().annotations` line reading `measured N + exempt M = 12`, the shape
     `assertLr2bAcrossParagraphs` already uses.
  2. **W2, space.** `getBoundingClientRect()` border box: `height > 0`;
     `getComputedStyle().opacity === "1"`; `left >= 0`; `right <= document.documentElement.scrollWidth`.
  3. **W3, time.** Read **no earlier than 1 400 ms** after `networkidle`, and **again after a full
     `page.reload()`** — the floor is 1 000 ms (`legal.md` **W3**, calibrated on a transient carrier
     that left the DOM at 371–481 ms) and 1 400 ms is `design.md`'s own reading point.
  4. **W4, size.** The disclosure's border-box `width` equals the **extra-tier row's** border-box
     width within **0,50 px**. Locate the row by its accessible text `Extra 100%` and take its
     nearest `div` ancestor in the money block — self-calibrating, so it survives a container
     change and asserts no absolute pixel figure.
  5. **W6, modality.** The element has no `aria-label`, no `title`, no `sr-only` ancestor; its
     `textContent.trim().length` is greater than zero.
  6. **W7, order.** `disclosure.top > extraTierRow.top`, strictly, in the same evaluate.
  7. **Concealment**, the four checks `divisor-disclosure.spec.ts:95-104` already makes:
     no `[hidden]` ancestor, no `[aria-expanded="false"]` ancestor, no `details:not([open])`
     ancestor, and `|rect.height − scrollHeight| <= 1`.
  8. **W5 / LR2b, measure.** `await assertLr2b(disclosure)` — the shipped 40-cpl floor, which
     returns `"exempt"` on a single line box and is therefore already honest about the 1-line cells
     at 2560+. **Record**, in a `test.info()` annotation, the `lineBoxes` and `characters`
     `lineBoxesAndCharacters` returns, plus the minimum non-last line box. **Do not assert
     `legal.md` **W5**'s 45-character floor as a bar in this file:** `design.md` §10.1 measured one
     filler of four at 44 with `hyphens: auto` and routed the gap to G6 as a verdict on the
     delivered string, not as a geometric guarantee. A recorded number that misses 45 is a
     **finding for `tech-lead`**, not a red test and not a reason to shorten, move or shrink the
     disclosure.
  9. **LR1.** `await assertLr1(disclosure)`.

  **No assertion anywhere in this file reads a Tailwind class string**, and every element is located
  by id, by role or by accessible text.

- **Tests:** this file is the test. It must be **seen red** once before it is trusted: run it
  against a variant with the `<p>` gated on `restDayPay > 0` instead of `grossHourlyRate !== null`,
  **in an isolated copy** (`rsync --exclude node_modules --exclude .next` + `cp -al node_modules`,
  `rm -rf .next`, a port confirmed free with `ss -ltn`, never `next dev`, never while a sibling's
  browser run is live). Expected red: **S2 goes from present to absent in 2 of the 8 measured
  cells** — `design.md` §10.3's own row for **W1**. Paste both runs.
- **Done when:** `pnpm e2e tests/e2e/weekday-tier-disclosure.spec.ts` green with the annotation
  reading `measured 8 + exempt 4 = 12`, the red run from the broken variant pasted beside it, and
  `pnpm check` green. Advances **AC4** in full.

---

## Handoffs that are not tasks

| What | Owner | Gate |
|---|---|---|
| **A2** — `.specs/0001-foundation/legal.md` § Out of scope, the row *"Holidays, and weekend tiering keyed on the exit day"*: the second half loses its subject (`legal.md` §8.2, **L8 moot**). The **holiday** half stands and is reinforced | `release-manager` | **G7**, per `spec.md` **AC7** |
| **A3** — `.specs/0001-foundation/legal.md` § Known imprecisions, the *"weekend tier"* row: it records a pricing choice and not that the figure traces to no table. **Gated on H1** | the human, then `release-manager` | **G7** |
| **A4 / A5** — `.specs/0003-citation-registry/legal.md` §16.4's stale TST edition and its amended Sunday cause | `labor-law-analyst`, already recorded in its own run | done |
| `.specs/0003-citation-registry/legal.md` §12's *"§9.0 found none wrong"* line | its owner, `labor-law-analyst` | **G7**, per `spec.md` **AC7** |
| **F6** — `DEFAULT_WORK_MINUTES = 528` is a CF art. 7º XIII-derived threshold sitting uncited in a hook (`legal.md` §11 F6) | **debt, owner `tech-lead`** | **Trigger:** the next spec that opens `hooks/use-work-calculator.ts` for its own reasons. Outside `spec.md`'s In-scope list; **not** bolted onto T3 |

---

## Sequencing with `.specs/0013-assumed-rates-beside-money/`

`0013`'s **AC10** requires its `plan.md` to name both slots and say in one line why they are two
sentences and not one. Half of that is mine to supply, and it is supplied here; the other half is
`0013`'s G4.

**`0012`'s W1 slot, now decided and no longer "undecided" as `0013` § Open questions records it:**
`<p id="weekday-tier-disclosure">` in `components/organisms/day-summary.tsx`, last child of the
variable-pay block, after the DSR caption and before the S1 link, rendering **iff
`grossHourlyRate !== null`**.

**Why the two disclosures are two sentences and not one** (lesson **047**): their **rendering
conditions differ**, so no single element can carry both. `0012`'s subject is *money derived from
the day's overtime*, so it renders only where money renders — S2 and S3, never S1. `0013`'s subject
is *a rate label the user did not type*, and `0013` § Scope item 1 puts it in **ST-C, where no money
renders at all**. A sentence that renders in S1 and a sentence that must not renders in S1 are two
elements. They are also two claims — *the weekday does not change what an hour is worth* versus
*this percentage is not one a norm produces* — and `legal.md` §13 **Q2** warns that `0012` does not
close `0013`'s and **must not appear to**.

**Order: `0012` ships first.** `0013` § Out of scope 1 forbids it from moving any money figure, and
its **ST-B** fixture is written as *"the routing `0012` is correcting"* — `firstTierMinutes = 0`,
`extraTierMinutes = 252`. Landing `0013` first freezes this spec's defect into its fixtures and
guarantees a rework. After `0012`'s T3, `0013` rebases ST-B onto `120 / 132` and loses nothing else.
**`0013`'s G4 is not blocked by this** — it may plan against the slot named above, which is now on
the record.

**`spec.md` **Q1** is discharged:** the spec number for finding **L-2** / debt **D1** is **0013**,
already open on disk and indexed.

---

## Risks

| Risk | Signal it happened |
|---|---|
| **B1 resolves the short way and the developer starts T4 anyway**, shipping a 327-char string an amended `copy.md` has replaced | The string in `day-summary.tsx` and the string in `copy.md` § Strings differ. Check with `python3 -c "print(len(...))"` against both before opening the PR |
| **A norm citation lands beside `DEFAULT_EXTRA_TIER_RATE = 100`** because T3 moved a neighbouring constant and adjacency invites it (`legal.md` §13 **Q2**) | `grep -nE "CLT\|Lei \|Súmula\|CF" hooks/use-work-calculator.ts` returns anything at all. It must return **0 rows** — `hooks/` has no citation exemption |
| **`splitOvertime` is left inlined in the hook as well as extracted** (lesson **030**) | `grep -rn "FIRST_TIER_LIMIT_MINUTES\|Math.min(overtimeMinutes" hooks` returns a row. Both must return nothing after T3 |
| **A sibling agent's in-flight edit to `components/organisms/day-summary.tsx`, `lib/compliance.ts` or `__tests__/day-summary.test.tsx` collides with T2 or T4** — all three are `M` in the shared tree right now | `git diff` on those paths shows hunks nobody on this spec wrote. Re-read the file before editing; **never plan the edit from this document's line numbers alone**, they were read in a dirty tree on 2026-09-19 |
| **The end-to-end test in T3 goes green at step 1**, which would mean a precondition (the system date, the seed, the manual-exit flag) is wrong and the test is not measuring the Saturday | Step 1a's run passes before any source edit. Stop and route; do not adjust the expected values to match |
| **T5 is written and never seen red**, so a passing guard proves only that a selector exists | The G5 report has a green e2e run and no red run from the `restDayPay > 0` variant. `AGENTS.md` §5: a boolean carries no record of its sample |
| **G6 quotes `design.md`'s `+176,17 px` Δtop or `+133,74 px` card cost as a current reading** | Either figure appears in a report without the § C-2 caveat. They were read before the night-premium caption landed above the slot |
| **The DSR is "fixed" by rounding the tier pays before summing them**, because R$ 204,55 + R$ 300,00 looks like it should be the DSR base | `restDayPay` drifts by fractions of a centavo from R$ 77,62 on the reference journey. `legal.md` §12.2 forbids it in terms; the base is R$ 504,545454… |
| **Coverage falls below 100 % in `lib/` or `hooks/`** because the new module's negative-input branch or the deleted weekday branch is miscounted | `pnpm test:coverage` fails on `lib/overtime-tiers.ts` or `hooks/use-work-calculator.ts`. Never lower either bar — that is the money and the hours |
