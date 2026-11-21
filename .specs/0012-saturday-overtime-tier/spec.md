# 0012 — Saturday and Sunday overtime are routed to the second tier by a predicate no norm backs

> Owner: product-manager · Gate: `spec` · Run 1
>
> **This spec states no norm, no article, no rate and no threshold.** Every legal question it
> depends on is listed in § Legal dependencies, open and blocking at G2. Where this document
> mentions a norm it is quoting `labor-law-analyst`'s own finding by reference, never asserting it.

---

## Problem

A CLT worker opens WorkLoad on a Saturday, types the hours they actually worked, and reads a money
figure. The same worker, typing the *identical* hours on a Monday, reads a different, smaller
figure. Nothing the user did changed — only the date in the **Entrada** field, which the app fills
from the device clock and which most users never look at.

This is `PRODUCT.md` §1 question 2 — *"Quanto de hora extra eu já tenho, e é a taxa certa?"* — and
today the answer depends on a branch that `labor-law-analyst` executed **every operative unit of the
governing article against**, with a number beside each, and none of them produces the figure the app
shows (`.specs/0003-citation-registry/legal.md` **§16.4**, severity **critical**).

It also breaches the project's own non-negotiable bar. `AGENTS.md` §9: *every user-visible number is
traceable to a table in `lib/` that cites its norm.* This one traces to a boolean expression in a
hook, and to nothing else. `AGENTS.md` §1: *a beautiful screen showing a wrong bracket is a defect of
the highest severity this project has.*

### Why now

Three things changed since the day this was written down and set aside.

1. **It was measured on a rendered screen with money on it.** `.specs/0001-foundation/legal.md`
   recorded it on 2026-09-14 as a **known imprecision**, accepted by the human, described as a
   pricing choice. §16.4 rendered it: **R$ 572,73** on a Saturday against **R$ 504,55** on a Monday,
   same hours, same salary. An accepted description and a rendered untraceable money figure are not
   the same object, and only the human can decide whether the first still covers the second — see
   **H1**.
2. **It falsifies a live artifact.** `.specs/0003-citation-registry/legal.md` §12's line *"Any change
   to a computed value — §9.0 found none wrong"* is false. The analyst marked the correction at
   §16.4 and declined to rewrite §12; the route that section prescribes for a wrong number is *"a
   spec whose acceptance criteria are arithmetic, opened by `tech-lead` at that moment"*. **This is
   that spec.** See § Relationship to 0003.
3. **It is live.** Nothing gates it behind a setting. The default journey plus a date the app filled
   in is enough.

## Audience & moment

Ten-second first contact, phone, standing at the time clock, on a Saturday or a Sunday — the two days
on which someone is most likely to be checking exactly this. They read one row of the day summary and
take the number at face value, because the product's whole promise is that they can.

## Outcome

Every tier split the app produces is a split G2 ruled on, traceable to a cited table, and identical
for two days the law treats identically. Where the app prices a day using a fact about the worker's
situation it never asked for, it says so on the screen that shows the money.

---

## Evidence — what was measured, in this session

Every number below is from **run R1**, executed by `product-manager` on an isolated copy per
`AGENTS.md` §4 rule 6. Nothing in the repository working tree was modified; `git status --porcelain`
lists `hooks/use-work-calculator.ts`, `components/organisms/day-summary.tsx`, `lib/weekly-rest.ts`
and `lib/payroll.ts` as **unmodified** (the `M` rows it does show are sibling agents' in-flight work
on this branch, none of them in this spec's file set — except `__tests__/use-work-calculator.test.ts`,
noted in § Scope).

| | |
|---|---|
| Copy | `rsync -a --exclude node_modules --exclude .next --exclude .git` → scratchpad; `cp -al` of `node_modules` |
| Snapshot | `HEAD` **5c0c6fa**, branch `fix/design-taste-preflight` |
| Instrument | `npx vitest run` on a throwaway probe importing the **shipped** `calculateWorkStats` and the **shipped** `overtimePay` — not a re-derivation |
| Journey | entrada `08:00`, almoço `12:00`–`13:00`, saída `22:00`, jornada **8h48** (`DEFAULT_WORK_MINUTES`), hora bruta R$ 15.000,00 / 220 |

### R1 — the shipped build, swept across a whole week

| Entry date | Weekday | first-tier min | second-tier min | first-tier pay | second-tier pay | day total |
|---|---|---|---|---|---|---|
| **19/09/2026** | **sábado** | **0** | **252** | R$ 0,00 | **R$ 572,73** | **R$ 572,73** |
| **20/09/2026** | **domingo** | **0** | **252** | R$ 0,00 | **R$ 572,73** | **R$ 572,73** |
| 21/09/2026 | segunda | 120 | 132 | R$ 204,55 | R$ 300,00 | R$ 504,55 |
| 22/09 – 25/09 | ter – sex | 120 | 132 | R$ 204,55 | R$ 300,00 | R$ 504,55 |
| **26/09/2026** | **sábado** | **0** | **252** | R$ 0,00 | **R$ 572,73** | **R$ 572,73** |

§16.4's three measured rows are reproduced **exactly**. The sweep adds what §16.4 did not measure:
the split is a pure function of the weekday class, it is stable across two different Saturdays, and
**five of seven weekday classes agree while two do not**.

### R1b — the same probe with the day-of-week branch absent

The known-good state required by lesson **040**. Produced in the same isolated copy by deleting the
branch — *this is a measurement of the defect's definitional absence, not a proposed remedy; the
remedy is G2's ruling and G4's architecture.*

| Entry date | Weekday | first-tier min | second-tier min | day total |
|---|---|---|---|---|
| 19/09 – 26/09 | **all seven classes** | 120 | 132 | R$ 504,55 |

**The quantity this spec scores is `firstTierMinutes` for a Saturday entry with overtime > 0.** It
was observed to move with the defect in this spec's own run R1: **0** with the defect present,
**120** with it absent (lesson **051**). It is an exact integer with no instrument spread, so the
margin test of lesson **011** is trivially met, and its lever — the day-of-week predicate — is inside
this spec's In-scope list.

### R1c — the existing suite pins the defect

With the branch absent, `npx vitest run __tests__/use-work-calculator.test.ts` returns
**`1 failed | 33 passed (34)`**, the failure being `pays all weekend overtime at the higher tier`.
The guard is **live, not vacuous** — and it is a guard asserting the defect as the expected result.
Any correction that does not also own this assertion bounces at G5.

### R1d — the third figure, added at run 2 after G2's finding F3

Run by `product-manager` in a fresh isolated copy (`rsync --exclude node_modules --exclude .next` +
`cp -al node_modules`), **no port and no server**: `uptime` 7.70 of 16 cores, `ss -ltnp` showing the
three sibling `next-server`s on 3100/3142/3417, none of them touched. The probe extends R1 with the
shipped `nightPremiumPay`, `splitMonthDays` and `restDayPayOnOvertime`, reproducing the DSR exactly as
`components/organisms/day-summary.tsx:131-133` composes it.

| Entry date | Weekday | first-tier pay | second-tier pay | night pay | **DSR row** |
|---|---|---|---|---|---|
| **19/09/2026** | **sábado** | R$ 0,00 | **R$ 572,73** | R$ 0,00 | **R$ 88,11** |
| **20/09/2026** | **domingo** | R$ 0,00 | **R$ 572,73** | R$ 0,00 | **R$ 88,11** |
| 21/09/2026 | segunda | R$ 204,55 | R$ 300,00 | R$ 0,00 | R$ 77,62 |
| **26/09/2026** | **sábado** | R$ 0,00 | **R$ 572,73** | R$ 0,00 | **R$ 88,11** |

With the weekday branch deleted in the same copy, all four dates return `first=120, extra=132`,
**R$ 204,55 + R$ 300,00** and DSR **R$ 77,62** — one value each. This reproduces `legal.md` §11 **F3**
from the shipped modules rather than inheriting it, and it is the run AC5's two clauses are scored
against. **The defect is worth R$ 78,67/dia across three figures, not two.**

`grep -rnE "DSR" __tests__ tests | grep -E "R\$|[0-9]+,[0-9]{2}"` returns **0 rows**: the DSR money
value is pinned by **no test today**, which is why AC5 does not accept `pnpm test` alone for it.


### Boundary searches — R2 to R6, run in this session, over the whole boundary each rule names

| Id | Command | Output now |
|---|---|---|
| **R2** | `grep -rnE "getDay\(\)\|dayOfWeek\|isWeekend" app components hooks` | **4 rows, 1 file** — `hooks/use-work-calculator.ts:40`, `:42`, `:64`, `:70` |
| **R3** | `grep -rn "SATURDAY\|SUNDAY" __tests__ tests` | **5 rows, 1 file** — `__tests__/use-work-calculator.test.ts:8`, `:94`, `:95`, `:96`, `:97` |
| **R4** | `grep -rnE "getDay\(\)" lib` | **1 row** — `lib/weekly-rest.ts:12`, a sibling assertion about which day is the rest day, in the module that *does* cite its norm |
| **R5** | `grep -rncE "CLT\|Lei \|Súmula" hooks/*.ts` | **0** in all four hooks — the predicate carries no citation, and per `AGENTS.md` §8 it may not, because the norm-comment exemption is `lib/`-only |
| **R6** | `grep -rniE "sábado\|domingo\|fim de semana\|feriado" app components` | **2 rows** — `components/organisms/day-summary.tsx:235` (the DSR caption) and `components/organisms/calculator-views.tsx:85` (the footer). **Neither is about the overtime tier.** No string anywhere tells the user the app prices their day by its weekday |

**R2 and R6 together are the finding the routing note did not carry:** the app applies a weekday rule
to the user's money in **one** place and discloses it in **zero**.

---

## Scope

Derived from R2–R6, run in this session. Where a search and the routing note disagree, the search
wins and this section says so.

### In scope

1. **The day-of-week predicate and the tier split it feeds** — the 4 rows R2 returns. This is the
   whole of R2's output; there is no second site.
2. **The Sunday branch, folded in deliberately — and here is why.** `labor-law-analyst` drew it as a
   finer verdict resting on an **assumed operand** rather than an arithmetic to condemn, and asked
   that folding it in be explicit. It is folded in, on a measured reason the note did not have:
   R2 shows Saturday and Sunday are **the same expression on the same line** (`:70`), and R1 shows
   they produce **byte-identical output**. There is no edit that settles Saturday and leaves Sunday
   untouched. Excluding it would not protect Sunday; it would hand a developer at G5 an expression
   they must rewrite and a document that refuses to say what it should become — which is precisely
   the improvisation the out-of-scope list exists to prevent. **What Sunday should yield is G2's, not
   this spec's** (**L2**, **L3**), and if G2's answer needs a fact the app does not collect, the
   route is the disclosure in AC4 and the bounce in § Inputs and defaults — never a silent guess.
3. **The assertion that pins the defect** — R3's 5 rows in `__tests__/use-work-calculator.test.ts`,
   proven live by R1c. In scope because it is the guard that decides whether any correction can land.
4. **Where the weekday-derived money is disclosed.** R6 returns zero disclosures of this rule. The
   obligation is AC4; the *content* is G2's (**L5**); the *placement and wording* are G3's.
5. **Reconciling the record this spec falsifies** — the known-imprecision row in
   `.specs/0001-foundation/legal.md` and `.specs/0003-citation-registry/legal.md` §12's line. A
   correction that ships while the documents still describe the old behaviour is a new defect.

### Out of scope

Each exclusion states the property it protects and the gate that may override it.

- **No change to the numeric value of any figure outside the two overtime rows.** Protects the
  falsifiability of AC7 — "only the tier split moved" is checkable only if every other expected value
  in the suite is unchanged. **Override:** `labor-law-analyst` at G2 may rule that a sibling figure
  is wrong; the route is then a block to the human and a new spec, not a quiet correction here, and
  any such override is named in AC7 itself.
- **No new user input, no new field, no new toggle.** Protects `PRODUCT.md` §5 — *every field added
  costs the user attention before it earns them accuracy* — and protects the ten-second path.
  **Override:** `labor-law-analyst` at G2 only, and only by ruling that a correct number is
  unreachable without collecting a fact the app lacks. That override does **not** authorise adding
  the field: it bounces to G1 for a new scope, per § Inputs and defaults.
- **No holiday calendar.** Protects `PRODUCT.md` §7's refusal of data that cannot be kept accurate
  (5.570 municipalities), which `.specs/0001-foundation/legal.md` already records as an exclusion.
  **Override:** none at any gate. A ruling that the right number needs a holiday goes to the human
  as a `PRODUCT.md` §7 conflict, and is answered by a disclosure under AC4, never by a calendar.
- **No edit to `lib/weekly-rest.ts`** — its rest-day count (R4), its divisor and its Súmula 172
  formula ship exactly as they are. *Protects:* a sibling spec's ability to own that module end to
  end, and both specs from two agents editing one claim.
  **What this bullet does not exclude, corrected at run 2 after G2 measured it** (`legal.md` §11
  **F3**, §14 **A1**): **the DSR figure moves** — R$ 88,11 → R$ 77,62 on the reference Saturday —
  because `components/organisms/day-summary.tsx:131-133` feeds `variablePay` into
  `restDayPayOnOvertime`, so **only the input changes**. Run 1's wording excluded the *figure* as
  well as the *module*; measurement falsified the first half, and **the exclusion is the half that
  was out of date**, not the criterion. **AC5 clause (a) carries this boundary in the same words.**
  **Override:** `labor-law-analyst` at G2, bounded to **L6** — writing down whether the two modules
  assert the same fact about which day is the repouso, or why they differ. An edit to
  `lib/weekly-rest.ts` itself is still a block to the human and a new spec; a figure that moves
  because its input moved is not.
- **No change to the `Extra {rate}%` labels' disclosure placement — finding L-2.** Protects both
  findings' verifiability: L-2's domain is *wherever a rate the user did not type renders as a money
  label*, which includes weekday states this spec never reaches, and its remedy is a disclosure slot
  decided by design and copy. Folding a placement problem into a routing fix makes neither one
  scorable. **Override:** `tech-lead` at G4, bounded to sequencing if the two touch the same rows.
  **Relocated with an owner, not retired** — see § Carried forward.
- **No layout, type, colour, spacing or motion change**, beyond whatever AC4's disclosure needs to
  render at all. Protects the reviewability of an arithmetic diff. **Override:** `product-designer`
  at G3, bounded to the new disclosure's own box and named in AC4, which is the criterion that
  verifies it. A legibility or accessibility floor overrides this bullet, and the override is stated
  in AC4 rather than assumed.
- **No pt-BR string written in this document.** `content-writer` owns every word; G2 owns every
  claim. This spec names the obligation and not one syllable of the sentence.

---

## Inputs and defaults

**This spec introduces no user input, so there is no new default to state.** Recorded explicitly so
that silence is not read as an omission (lesson: an input without a default becomes a form the user
has to disarm).

Two existing inputs decide this feature's output, and both keep their current defaults:

| Input | Where it comes from | Default today | Changes here |
|---|---|---|---|
| The **date** in **Entrada** | collected — a `DD/MM/AAAA` masked field (`components/molecules/date-time-input.tsx:75-85`) | the device's current date | **no** |
| The two **rate** fields | collected — settings panel, persisted | the statutory floor / the common-case step | **no** |

**The asserted operands** (lesson **045**: a claim about the user's contract can live in a constant
that renders nothing). Each is a fact about *this* user that the code supplies on their behalf:

| Asserted operand | Where | Status |
|---|---|---|
| "a Saturday is a day whose overtime is all second-tier" | the predicate, R2 `:70` | **the defect.** In scope, ruled at G2 |
| "a Sunday is the same" | same expression, same line | in scope, ruled at G2 (**L2**, **L3**) |
| "this day was not compensated by a folga" | nowhere — never collected, never asked | **not collected.** AC4's disclosure, content at **L4** |
| "this day was not a feriado" | nowhere — never collected | **not collected.** Already disclosed in the footer (R6, `calculator-views.tsx:85`); G2 rules at **L4** whether that placement discharges the obligation for *this* number |
| the two-hour tier boundary | `hooks/use-work-calculator.ts:9` | in scope for **traceability only** (AC3). Its *value* does not change here |

**If G2 rules that a correct number is unreachable without collecting the folga compensatória or a
holiday flag, that is a new field and it bounces to G1 for a new scope.** It is not improvised at G4
or G5, and it is not added silently under this spec's authority.

---

## Legal dependencies

Open and blocking at G2. **This spec states none of them.** §16.4 already settled much of L1 and L7;
`labor-law-analyst` runs blocking after this gate regardless, and restates each in its own voice.

| Id | What must be settled | Why this spec needs it |
|---|---|---|
| **L1** | What tier split a **Saturday**'s overtime takes, and the norm and effective date behind it | AC1 has no expected value without it |
| **L2** | What tier split a **Sunday**'s overtime takes | folded in at § Scope item 2; AC1 covers both |
| **L3** | Whether the Sunday answer is conditional on a fact the app does not collect, and what the app must yield in that condition — the arithmetic, not the disclosure | decides whether AC1's Sunday row is a value or a value-plus-condition |
| **L4** | What the app must disclose wherever it prices a day by its weekday, and in which states that disclosure must render | AC4's content and rendering condition |
| **L5** | Whether the footer's existing "what is not in the calculation" sentence discharges L4 for the overtime rows, or whether the obligation needs a second slot beside the money | decides AC4's placement domain |
| **L6** | Whether the rest-day fact asserted by `lib/weekly-rest.ts` (R4) and the one this spec settles are the same fact, and one row saying why if they differ | prevents the 0007-shaped contradiction: two modules asserting different facts about the same week |
| **L7** | Whether the two-hour tier boundary and the resulting rate step are statutory or contractual, restated for the `lib/` module that will carry them | AC3 requires each to carry its own source; a constant may not be moved into `lib/` uncited |
| **L8** | Whether a night-shift day whose entry falls on a Friday and whose exit falls on a Saturday is one weekday class or two | R1 swept entry dates only; the existing record notes exit-day keying is excluded, and G2 must confirm that survives L1's ruling |

**Every number this feature will show is in this table.** Nothing reaches the screen without passing
G2.

---

## Acceptance criteria

Each criterion names a quantity, the command that reads it, the output that command gives **today**
(defect present), and the output it gives in a state where the defect is **definitionally absent** —
both produced in this session, per lessons **040** and **051**.

`PROBE` = the run R1 probe: the shipped `calculateWorkStats` + `overtimePay`, over entry dates
2026-09-19 … 2026-09-26, on the reference journey in § Evidence.

| # | Criterion | How it is verified | Known-bad (today, run R1) | Known-good |
|---|---|---|---|---|
| **AC1** | For each of the seven weekday classes, the tier split `PROBE` returns is the split G2 ruled at **L1**/**L2**/**L3**, and the two Saturdays in the sweep are identical to each other | Re-run `PROBE`; read each row against `legal.md`'s ruling table | Sat/Sun `first=0, extra=252` → R$ 0,00 + **R$ 572,73**; Mon–Fri `first=120, extra=132` → R$ 204,55 + R$ 300,00. **Fails: no ruling produces the Saturday row** | R1b: all seven classes `first=120, extra=132` → R$ 504,55. Passes *iff* that is what G2 rules — which is why AC1 scores against the ruling and not against a number this spec invented |
| **AC2** | The quantity this spec moves — `firstTierMinutes` for a Saturday entry with overtime > 0 — equals G2's ruled value, and a unit assertion in `__tests__/` fails when the day-of-week logic is removed | `PROBE`, plus deleting the routing in an isolated copy and running the suite | **0.** R1c: the suite today returns `1 failed` / `33 passed (34)` on removal — the live guard asserts *the defect* | **120.** After the change the same removal must still produce a failure, and the failing assertion must be the one asserting G2's ruling |
| **AC3** | No expression deciding money by the day of the week survives outside `lib/`, and the module that carries it cites its norm | `grep -rnE "getDay\(\)\|dayOfWeek\|isWeekend" app components hooks` → **0 rows**; then `grep -rncE "CLT\|Lei \|Súmula"` over the `lib/` module that gained it → **≥ 1** | R2: **4 rows in `hooks/`**. R5: **0** citations in all four hooks. Fails both halves | 0 rows from the first search; a non-zero count from the second. The searches are over the whole directory boundary, not a file and a line, so the rule cannot be satisfied by moving one line |
| **AC4** | Wherever the app renders money derived from the weekday, the disclosure G2 specifies at **L4** is in the DOM with `getBoundingClientRect().height > 0` on its border box and `getComputedStyle().opacity === "1"`, in **every** state that renders that money — including with every collapsible panel closed, and again after a full `reload()` — measured no earlier than 1 000 ms after load | Playwright, 390 × 844 and 1440 × 900, both themes, both a weekday and a weekend entry date: **8 cells, all 8 must pass.** Count asserted before iterating; zero is not a pass | R6: **0 disclosure strings about the weekday rule anywhere in `app/` or `components/`.** The measured set is empty in 8/8 cells | The disclosure present in 8/8. The 1 000 ms floor and the border-box/opacity reading are taken from `.specs/0003-…/legal.md` §16.1 D3.2, where a transient carrier was measured leaving the DOM at 371–481 ms |
| **AC5** *(rewritten at run 2, blocker A1)* | **Exactly three figures move, and after the correction no figure reads the weekday.** Two clauses, both required. **(a) The moving set is closed at three.** The only figures whose value changes are the three derived from the tier split: `firstTierPay`, `extraTierPay` and `restDayPay` — the DSR row, which `components/organisms/day-summary.tsx:131-133` computes from `variablePay = firstTierPay + extraTierPay + nightPay`. Every other figure a user can reach is byte-identical to `5c0c6fa`. **`lib/weekly-rest.ts` is not edited**: its rest-day count, its divisor and its Súmula 172 formula are unchanged and only its **input** moves — which is why this is an amendment and not the block-to-human route § Out of scope reserves. **(b) Each of the three takes exactly one distinct value across the seven weekday classes.** Scored as a **count of distinct values**, never as a per-day table: G2 ruled **L8 moot**, so there is no weekday table left to score against, and *the figure does not read the weekday* is the whole claim. A fourth figure that moves, or any of the three taking two values, fails. **This criterion rests on no W2–W7 clause** — G2 recorded those as having no failing subject in this tree, and a criterion resting on one of them is unscorable today, so a later gate may not bolt one on to strengthen this row. | The run R1 probe extended to print `restDayPay`, in an isolated copy (`rsync --exclude node_modules --exclude .next` + `cp -al node_modules`; **no port and no server** — the three sibling `next-server`s on 3100/3142/3417 untouched, load 7.70 of 16 at the run): `npx vitest run __tests__/zz-a1-probe.test.ts` over entry dates **2026-09-19 (sáb), -20 (dom), -21 (seg), -26 (sáb)** on the § Evidence reference journey, hora bruta 15.000/220. Plus `pnpm test` for clause (a)'s byte-identity. **Measured this session, and it is why `pnpm test` alone is not enough:** `grep -rnE "DSR" __tests__ tests \| grep -E "R\$\|[0-9]+,[0-9]{2}"` returns **0 rows** — no test pins the DSR money value today, so the suite is a **vacuous** check on the third figure (`AGENTS.md` §5). The criterion therefore requires an assertion on `restDayPay` **seen red** against the pre-correction code before it is seen green. | Run R1 extended, shipped code at `5c0c6fa`: `firstTierPay {R$ 0,00 ; R$ 204,55}`, `extraTierPay {R$ 572,73 ; R$ 300,00}`, `restDayPay {R$ 88,11 sáb/dom ; R$ 77,62 seg–sex}` — **2 distinct values each, clause (b) fails 3/3**. Reproduces `legal.md` §11 **F3** independently, from the shipped `calculateWorkStats`, `overtimePay`, `nightPremiumPay`, `splitMonthDays` and `restDayPayOnOvertime`. | The same probe in the same copy with the weekday branch deleted — the defect definitionally absent: all four dates `first=120, extra=132`, `firstTierPay R$ 204,55`, `extraTierPay R$ 300,00`, `restDayPay R$ 77,62` — **1 distinct value each, clause (b) passes 3/3**, and the three agree with G2's corrected figures. The same copy's `npx vitest run __tests__/use-work-calculator.test.ts` → **1 failed / 33 passed (34)**, the failure being `pays all weekend overtime at the higher tier`, so the guard R1c named is live here too. The two states differ in the direction clause (b) asserts (lessons **040**, **051**). |
| **AC6** | `legal.md` carries one row answering **L6**: the rest-day fact asserted by `lib/weekly-rest.ts` (R4) and the one settled here are the same, or they differ for a written reason | Read the two modules side by side against `legal.md` | The hook prices Saturday as a doubled day; `lib/weekly-rest.ts:12` counts **only** Sundays as the repouso. Two modules, two different facts about one week, neither aware of the other | One row, either way. A missing row fails the criterion |
| **AC7** | Every document this correction falsifies is corrected in the same delivery | `grep -n "weekend tier" .specs/0001-foundation/legal.md` → the row's text describes what ships; `.specs/0003-citation-registry/legal.md` §12's *"§9.0 found none wrong"* line is corrected or struck by its owner | 0001's row (1 match) describes the defect as accepted; 0003 §12's line is **false** and marked only inline at §16.4 | Both read true against the shipped tree. Verified by re-running the same grep and reading the two lines |
| **AC8** | The human's decision on **H1** is recorded in `STATUS.md` before G5 opens | Read `STATUS.md` § Decisions log | Not recorded | Recorded, with the date and the ruling, whichever way it goes |

No criterion in this table contains "properly", "correctly", "nicely" or "as expected". AC1, AC2, AC6
and AC7 are checkable by a reviewer with a terminal; AC3 by two greps; AC4 by a browser; AC5 by the
test run; AC8 by reading one file.

---

## Disclosure obligations

`PRODUCT.md` §4 — *name the gap.* Where this change computes something a real payslip would compute
differently, the app says so out loud. Content is **L4**/**L5**; this section states only the
obligation.

1. **The day was priced by its weekday, and the user never told the app anything about that day
   beyond its date.** R6 proves nothing on screen says this today.
2. **Whether the day was compensated by a folga is a fact the app does not collect**, and the answer
   changes the number a real payslip shows.
3. **Feriados are not in the calculation.** The footer already says this once (R6,
   `calculator-views.tsx:85`); whether that discharges the obligation *for this number* is **L5**,
   not an assumption this spec makes.
4. The rate step above the first tier is a figure the user can edit and the app fills in by default —
   which is finding **L-2**, out of scope here and relocated in § Carried forward. Named so a
   downstream agent does not conclude from its absence that the gap is closed.

---

## Relationship to `0003`, and the record this corrects

**My reading, stated so `tech-lead` can overrule it with a reason rather than a silence:**

- **L-1 does not block `0003`'s delivery.** `0003`'s stop is scoped by its own § *Does any number
  change?* to **item 7's five values** in `lib/legal-tables.ts`. The Saturday predicate is in
  `hooks/`, in none of `0003`'s 19 citation sites, and `0003`'s AC9 — arithmetic untouched, `pnpm
  test` unchanged — stays true.
- **Opening this spec *is* how `0003`'s stop is discharged, not a way around it.** That section
  prescribes, verbatim, *"the number is corrected by a spec whose acceptance criteria are arithmetic,
  opened by `tech-lead` at that moment — not by this one, whose criteria are all provenance and would
  read green over the defect."* This spec's criteria are arithmetic. `0003`'s stay provenance.
- **One correction is owed inside `0003` regardless**, and its owner is `0003`'s, not this spec's:
  §12's line *"§9.0 found none wrong"* is false, marked inline at §16.4 and not yet reflected where a
  reader meets it. Recorded in `0003`'s `STATUS.md` decisions log by `product-manager`, as a note and
  **not** as a blocker, because I am ruling it non-blocking.

If `tech-lead` or the human reads it as blocking, the route is `0003`'s `STATUS.md` blockers and its
own owner — that decision is not made here.

---

## Open questions

| Id | Question | Who decides | Default chosen | Why |
|---|---|---|---|---|
| **H1** | `.specs/0001-foundation/legal.md` records this behaviour as a **known imprecision accepted by the human on 2026-09-14**. Does that acceptance still stand now that §16.4 has rendered it as **R$ 572,73** on screen and named it an `AGENTS.md` §9 traceability breach? | **human only** (`AGENTS.md` §4 rule 8) | **It does not cover the rendered number.** The spec proceeds toward a correction | An acceptance is scoped by what it described. The 2026-09-14 row describes a *pricing choice*; it does not record that the figure traces to no table in `lib/`, which §9 makes a non-negotiable bar rather than a thing an imprecision row can waive. Proceeding on that reading, and putting the reading in front of the human as **AC8** |
| **H2** | If G2 rules the correct Sunday number requires the folga compensatória, does WorkLoad add that field? | **human**, on `PRODUCT.md` §5 and §7 | **No field in this spec.** Disclose the gap, bounce to G1 for a new scope if a field is wanted | §5 — every field costs attention before it earns accuracy. The ten-second path is the product |
| **Q1** | Does finding **L-2** get its own spec number? | `tech-lead` | **Yes, its own spec.** Not folded in here | Different domain test, different remedy, different gates. Folding it in makes neither scorable. **Flagged to `tech-lead`: `0013` needs opening, or L-2 rots** |

---

## Carried forward

A debt gets a trigger, never a date (`AGENTS.md` §5).

| Id | Debt | Owner | Trigger |
|---|---|---|---|
| **D1** | Finding **L-2** — `components/organisms/day-summary.tsx:193` and `:203` render `Extra {rate}%` in the unconditional block while the hint that qualifies the rate lives inside a collapsed panel and is absent from the DOM. `100` is the app's own default, not a figure the user typed. Severity **major** per §16.3 | `product-manager` | the next spec that opens `components/organisms/day-summary.tsx`'s variable-pay block, or `tech-lead`'s ruling on **Q1** — whichever comes first |
| **D2** | R4 — `lib/weekly-rest.ts:12` counts only Sundays as the repouso, while the hook prices Saturday as a doubled day. **L6** obliges G2 to write the row; it does not oblige anyone to reconcile the two modules | `labor-law-analyst` | **the trigger FIRED on this spec at G2 run 1** — the DSR figure moves (R1d, `legal.md` §11 **F3**). Discharged here by **AC6** and `legal.md` §7, which write the row; the two modules are *not* reconciled, and that half keeps its owner and a new trigger: **the next spec that opens `lib/weekly-rest.ts` itself** |

---

## Non-goals

What a well-meaning agent downstream might add, and must not.

- **A holiday calendar**, a *feriado* toggle, or any heuristic that guesses one. `PRODUCT.md` §7.
- **A convenção coletiva lookup** for the real tier step. `PRODUCT.md` §7, explicitly.
- **Any cross-day accumulation** — a compensation window, a banco de horas, a month of records. The
  app is a single-day model and `PRODUCT.md` §9 records banco de horas as a retired non-claim with
  its own unlock sequence. A "compensated?" checkbox is that claim wearing a checkbox.
- **Making the tier split configurable** to avoid ruling on it. A field that lets the user pick the
  law is the product declining to answer its own second question.
- **Softening the disclosure into a hedge** — an "aproximadamente", an "estimativa" — in place of
  naming which fact was assumed. `PRODUCT.md` §4: *cite or omit.*
- **Deleting the assertion R3 pins instead of correcting it.** The guard is live (R1c); replacing a
  failing expectation with its absence makes AC2 unfalsifiable.
- **Widening the diff to "clean up while we are in here."** AC5 is checkable only if nothing else
  moved.
