# 0007 — Súmula 431 citation scope

> Owner: product-manager · Gate: `spec` · **Run 2** (rewrites run 1; nothing of run 1 survives
> except the search method and the row table it produced)

**This is a calculation defect.** Run 1 opened this spec on the premise *"the numbers are correct;
only the citation over-reaches"*. G2 refuted that premise by rendering the warning over its input
domain: `.specs/0007-sumula-431-citation-scope/legal.md` § *W*. **AC1 of run 1 is void by its own
exemption clause and does not return in any form.** The spec below is written on the calculation
premise, and its risk profile is the highest this project has (`AGENTS.md` §1: *a beautiful screen
showing a wrong bracket is the highest-severity defect here*).

**Two human decisions arrived before this run and both are settled** — § *The decisions this run is
written on*. They are not open questions and no downstream gate may reopen them.

---

## Problem

A CLT worker opens the salário tab, types their gross salary and their jornada diária, and the app
tells them — by name, under a norm — what each of their hours is worth. The app does not ask how
many days a week they work. It asserts **five**, silently, and derives the divisor from that
assertion.

Measured on the rendered screen at G2 (`legal.md` § *W*, `role="status"` textContent, five
journeys):

| The user types | The app renders | What `legal.md` rules |
|---|---|---|
| `06:00` | `…corresponde ao divisor 150 horas por mês…` | `150` is the five-day reading; the two places the law fixes a divisor for a six-hour journey both fix **180** (R3) |
| `07:20` | `…corresponde ao divisor 183.33 horas por mês…` | `7h20` is the canonical day of the 44h six-day week, whose divisor is **220** (R2). Also rendered with a **decimal point in a pt-BR interface** |
| `08:00` | `…corresponde ao divisor 200 horas por mês…` | Right if the week is 40h, wrong if it is 44h — **the app cannot tell which, because it never asks** |
| `12:00` | `…corresponde ao divisor 300 horas por mês, e não 220…` | `300` presupposes **60 horas semanais**, above the ceiling `legal.md` R2 records. **Wrong under every reading** |

The `12:00` row is the one the law gate's verdict rests on, and it is the worst one for the user:
the sentence that follows the number — *"Usar um divisor maior do que o devido reduz o valor de cada
hora sua"* — argues that worker **toward** the larger divisor, which on a R$ 3.000 salary moves
their hora from R$ 13,64 to R$ 10,00.

This is question 3 of `PRODUCT.md` §1 — *"Quanto cai na minha conta?"* — answered with a number the
app invented from a premise the user never supplied, under a norm name the user is being asked to
trust. `PRODUCT.md` §4: **cite or omit**. Today the app does neither.

## Why now

**X1 has been raised five times across four specs and never had scope** — `0005` G9, `0006` G6 §8,
`0006` G9, `0004` G2, and `0007` G2 twice. `0004`'s law gate ruled that a fifth carry with no scope
is a process failure, not a finding. Run 1 was the scope; it was scoped on the wrong defect, and the
gate that had carried X1 four times as *provenance* is the gate that found the calculation error —
by running the function with a different argument instead of reading the comment above it.

Nothing degraded. The defect is stable, on production, and read at the exact moment the user is
deciding whether their employer is underpaying their hour.

## Audience & moment

The **10-second first contact** on `/custo-da-hora`, for a user whose week is not five days of equal
length — retail, escala 12×36, bancário, turnos ininterruptos, and the most common CLT arrangement
in Brazil, 44h over six days. Nothing on this screen may take longer to read after this spec than
before it, and the field this spec adds is the only thing added to it.

## Outcome

Every divisor the app shows is derived from operands **the user supplied**, and every norm it names
covers the case it is named for. Where the operands describe a week the app cannot price, the app
says so instead of showing a number.

---

## The decisions this run is written on

Both were made by the human, both are recorded here because the next three specs will otherwise
inherit what the last three did.

**H1 — `camara.leg.br/legin` is this repository's accepted source for CLT article text.**
`planalto.gov.br` has now failed a third retrieval path and is unreachable for the sixth consecutive
gate (re-measured at this gate: `curl` → `000`, 0 bytes; Câmara → `200`, 1 790 529 bytes — § *Evidence
available*). Câmara/Legin is an official Brazilian government host serving the verbatim consolidated
text with each alteration's law named. **A commercial aggregator remains forbidden as a source**, at
any gate, for any norm. This closes the statute half of `Q-H1`; the súmula half was closed at G2 run 1
by `juslaboris.tst.jus.br`.

**H2 — the app will ask the user how many days a week they work.** One new field, **default 5**.
The reason recorded by the human: *the app currently asserts five days a week on the user's behalf,
which is wrong for anyone working six, and six is common in retail.* This is the human's choice
between adding one input and leaving the silent assertion in place, and it selects **Option B** from
`legal.md` § *What G1 must decide* — the option the law gate states as its preference, because CLT
art. 64, parágrafo único's operative term is exactly that quantity.

---

## Scope

### The domain is a test, not a list

Unchanged from run 1 and still binding (lesson **024**, `applies-to: all`). A string or `lib/`
comment is in this spec's domain if either clause holds:

- **Clause A — named attribution.** It names a Brazilian norm and states a rule, rate, threshold,
  divisor, window or number as following from it.
- **Clause B — unattributed normative rule.** It states a rule, threshold or divisor as a fact about
  the user's entitlement **without** naming any norm.

Excluded, and the exclusions are what keep the test falsifiable: a norm name used as a **category
label** asserting no rule (`lib/payroll.ts:21` `label: "CLT"`, every SEO string of the form *"salário
líquido CLT"*); **input validation, empty states and navigation**; **numbers carrying no normative
claim** (`BANNER_DELAY_MS`, viewport widths, OG dimensions).

**Run 2 adds a third clause, because the defect turned out to be an operand and not a string:**

- **Clause C — asserted operand.** Any constant the code uses as a fact about *this user's contract*
  — how many days they work, how many weeks are paid, how many days are rest — whether or not a
  string ever renders it. `lib/salary-period.ts:3,5` are clause-C sites; so is `lib/weekly-rest.ts`'s
  calendar-derived dias úteis. Clause C is what run 1's two-clause test could not see, and it is
  where the wrong number lives.

### The searches, re-run at this HEAD

Scope comes from a search run in this tree, by me, at `5c0c6fa`, never from the request's list
(`product-manager` § *How a scope section is written*). All three commands below were run this
session; their output is in § *Evidence available*. **Where a handed list and these runs disagree,
these runs win.**

Command 1 — named attributions in shipped source (clause A):

```bash
grep -rnE "\b(CLT|Lei|Decreto|Portaria|Súmula|OJ|IN RFB|CF/88)\b" \
  --include='*.ts' --include='*.tsx' lib/ components/ hooks/ app/
```

Command 2 — the divisor rule wherever it is stated, including tests and docs (clauses A and B):

```bash
grep -rniE "s[úu]mula|divisor|WEEKS_IN_DIVISOR|WORK_DAYS_PER_WEEK|MONTHLY_HOURS" \
  --include='*.ts' --include='*.tsx' --include='*.md' \
  lib/ components/ hooks/ app/ __tests__/ tests/ README.md
```

Command 3 — **new at run 2** — every file a persisted input on the salário tab touches (clause C and
the state it lives in):

```bash
grep -rl "monthlyHours\|MONTHLY_HOURS_KEY\|DAILY_MINUTES_KEY\|useSalaryCalculator\|SalaryCalculator\|WORK_DAYS_PER_WEEK" \
  --include='*.ts' --include='*.tsx' --include='*.md' \
  lib components hooks app __tests__ tests README.md | sort
```

Commands 1 and 2 reproduce run 1's table exactly: **22 rows across 12 shipped files and 6 test files,
plus 1 guard**, re-verified independently at G2 (`legal.md` § *AC4 note*). Command 3 returns **15
files** and is the reason a new input is not a citation change.

### What command 3 returned, and the three findings inside it

```
components/organisms/calculator-views.tsx   __tests__/calculator-views.test.tsx
components/organisms/salary-calculator.tsx  __tests__/custo-da-hora-page.test.tsx
hooks/use-gross-hourly-rate.ts              __tests__/page.test.tsx
hooks/use-salary-calculator.ts              __tests__/salary-calculator.test.tsx
hooks/use-work-calculator.ts                __tests__/use-gross-hourly-rate.test.ts
lib/payroll.ts                              __tests__/use-salary-calculator.test.ts
lib/salary-period.ts                        __tests__/work-calculator.test.tsx
lib/storage.ts
```

| # | Finding | Why it is in this spec and not the next one |
|---|---|---|
| **N1** | **The same asserted operand prices the "Semana" row.** `lib/salary-period.ts:32` — `amountForPeriod`'s `week` case is `hourlyAmount × dailyHours × WORK_DAYS_PER_WEEK`, the identical hard-coded 5, producing a **number the user reads** on the período selector. Pinned by `__tests__/salary-period.test.ts:36` (*"counts five working days in a week"*). | It is the same constant, in the same module, asserting the same fact about the same user. Collecting the day count for the divisor and leaving the Semana row on the constant would ship a screen that asks a question and then ignores the answer. |
| **N2** | **The app already asserts a *different* week elsewhere.** `lib/weekly-rest.ts:10-14` derives dias úteis from the calendar by removing only Sundays — a **six-day** week — while the salário tab asserts five. The two surfaces contradict each other today, silently; after H2 the contradiction becomes visible, because the user will have declared a number that one surface honours and the other ignores. | Named, disclosed and routed here — **not changed** (§ *Out of scope*). Its norms (Lei 605/49, Súmula 172) were not re-verified for this purpose at G2. |
| **N3** | **The divisor is rendered unformatted.** `lib/salary-period.ts:42` returns `Math.round(x*100)/100` and `salary-calculator.tsx:151` interpolates it raw, so the user reads `183.33` in a pt-BR interface (`legal.md` F2). Non-integer divisors remain reachable after the change — a 7h30 journey over 5 days is one. | Lesson **002**: *any string you reopen, you re-publish.* This spec rewrites that exact sentence; carrying the defect through it would mean four agents re-approving it. |

### In scope, stated as work

1. **Collect the day count.** One new input on `/custo-da-hora`: how many days a week the user
   works. **Default 5** (H2). It persists like every other input on this tab, and the answer updates
   as the user types — `PRODUCT.md` §5, *no submit button*. **What it must accomplish**, since its
   drawing and its words are not mine: the user must be able to answer it without knowing what a
   divisor is, and changing it must visibly change the divisor. `product-designer` owns its
   placement, its control type and its relation to the two fields beside it (G3); `content-writer`
   owns its label, its hint and every string on this surface (G3).
2. **Derive the divisor from the collected operands**, at `lib/salary-period.ts`, replacing the
   two clause-C constants. The conversion from a weekly day count to the monthly quantity CLT art.
   64, parágrafo único names is **L3, and `labor-law-analyst` settles it at G2 — this spec does not
   state it.**
3. **Define what the app does when the collected operands describe a week above the legal ceiling**
   (AC2). This is the clause the G2 verdict turned on and it cannot be left to the developer.
4. **Repair the Súmula 431 attribution** at **S1, S2, S6, S8** — the `lib/` comment, the
   user-visible sentence, the README sentence and the test that pins the string — so each names a
   norm whose text covers what it is cited for, or restricts itself to the case that text covers.
5. **Apply N1** — the Semana row reads the collected day count.
6. **Apply N3** — the divisor renders through the repo's existing pt-BR formatter.
7. **Record `DIVISOR_TOLERANCE_HOURS = 1` as a product choice** (`legal.md` F7): no norm sets a
   tolerance on a divisor, and a threshold indistinguishable from a legal one is a citation defect
   in clause-B form. Whether the value stays 1 is G4's call; that it is labelled is not.
8. **Move `DEFAULT_MONTHLY_HOURS = 220` into `lib/` with its source** (`legal.md` S5/F6,
   `AGENTS.md` §8). **The value does not change** (AC9).
9. **Ship D1–D6** (§ *Disclosure obligations*) on the surface that shows the divisor.
10. **Record the outcome in `PRODUCT.md` §9** if — and only if — G2's rulings change what the
    product may claim. Amending `PRODUCT.md` is a human approval point.

### What the field costs, stated rather than absorbed

`.specs/0010-disclosure-reachability-on-mobile/` is open right now and has measured that **no
disclosure surface in this product is above the fold at 390×844**, with the nearest 389.9 px below
it. First-screen area is this product's scarcest resource, and a new form field spends some of it —
above the disclosures, because it sits in the input grid that precedes them.

**This spec does not place the field and does not set a budget for it.** It requires the cost to be
measured and reported (AC15), so that `0010` inherits a number rather than a new unknown, and it
leaves the placement to `product-designer` at G3, who owns the trade-off between the input grid and
the fold. `PRODUCT.md` §5 — *every field added costs the user attention before it earns them
accuracy* — is satisfied here by H2's reasoning, not by mine: this is the field that makes the
number true.

---

## Preconditions

**P1 — resolved, twice, and it does not carry forward.**

| Half | Ruling | Source |
|---|---|---|
| TST súmula | **`juslaboris.tst.jus.br`** — the TST's own repository, serving the Tribunal Pleno's enacting resolutions — is this repository's **primary** source for a súmula, OJ or precedente normativo | `legal.md` § *P1 / Q2*, re-discharged on a second independent path at run 2 |
| Federal statute | **`camara.leg.br/legin`** is the accepted source while `planalto.gov.br` is unreachable — **H1 above, ruled by the human** | Re-measured at this gate: `200`, 1 790 529 bytes |

**A commercial aggregator is not a source, at any gate, for any norm.** `legal.md` records that
every aggregator the run-2 search surfaced was discarded unread; that policy is unchanged and
binding.

**What remains open and is not this spec's to close:** `Q-H2` — no reachable official host
enumerates TST súmula *alterations* by date, so currency is established through Res. 220/2017 plus
Res. 225/2025 and an alteration between those dates would be invisible. Owner: the human. It does
not block this spec, because the norms this spec relies on are also verified against their enacting
acts.

---

## Legal dependencies

Named, not stated. `labor-law-analyst` settles every row at **G2, blocking**. Rows marked *settled at
run 2* are already answered in `legal.md` and are listed so that nothing reaches the screen without a
row; the rest are open and this spec cannot close without them.

| # | The rule, table or threshold this change relies on | Why this spec needs it |
|---|---|---|
| **L1** | **Súmula 431 do TST** — verbatim text and the exact case it covers | *Settled at run 2 (R1).* Bounds every surviving mention of it |
| **L2** | **CLT art. 64, caput e parágrafo único** — and which of the two is operative for a given declared week | *Settled at run 2 (§ Run 2 — correction to R3).* This is the norm the new field's operand belongs to |
| **L3** | **The conversion from "dias por semana" to the monthly quantity art. 64, parágrafo único names** — whether it is `× 5`, the month's actual working days, or something else, and the rounding direction and unit | **Open, and load-bearing.** Every divisor the app shows is this conversion applied. A spec that stated it would be inventing the number this spec exists to stop inventing |
| **L4** | **The weekly ceiling** above which a declared jornada × dias combination describes a week no norm permits, and whether the app must refuse to price it or price it with a disclosure | **Open.** AC2 is written against this row and the G2 verdict turned on it (`12h × 5 = 60h`) |
| **L5** | **The categories with their own fixed divisors** — bancário (Súmula 124), turnos ininterruptos (OJ 396), escala 12×36 — and whether the app must say it does not model them | *Named at run 2 (R3, D4).* Open as a disclosure obligation |
| **L6** | Whether **220** is a legal constant, and the source it must carry in `lib/` | *Settled at run 2 (S5): yes, R2.* Drives work item 8 |
| **L7** | Whether any norm sets a **tolerance** on a divisor before a mismatch is worth telling the user about | *Settled at run 2 (F7): none does.* Drives work item 7 |
| **L8** | Whether the **"Semana"** figure (N1) must use the collected day count, or is a presentation choice independent of the divisor | **Open.** It is a number on screen derived from the same operand |
| **L9** | Whether shipping a **collected** day count while `lib/weekly-rest.ts` keeps a **calendar-derived** one (N2) is a defect or a disclosure | **Open.** Decides whether N2 stays routed or bounces this spec wider |
| **L10** | Whether a **convenção coletiva** may set a jornada or a divisor that makes the app's computed divisor wrong for a real user | *Settled at run 2 (R5, CLT art. 611-A, I).* Drives D1 |
| **L11** | Whether a **default** day count is itself a normative assertion, and what must be said about it while the user has not changed it | **Open.** H2 fixes the default at 5; it does not settle what the app must disclose about defaulting |
| **L12** | The **rounding and the pt-BR formatting** of the displayed divisor (N3) | *Named at run 2 (F2, § Rounding).* The direction is a project convention and must be stated, not inherited from `Math.round` |
| **L13** | The **accepted source** for a TST súmula and for a federal statute | *Settled — P1 and H1.* No citation here may be settled from a source the gate did not fetch |

**Every number this change will show is in this table.** The divisor, the Semana figure, 220, 200,
and the ceiling AC2 is written against: none can reach the screen without passing G2.

---

## Out of scope

Each exclusion names the property it protects and the gates that may override it. An exclusion with
no override route becomes an improvisation the first time a downstream agent needs to move.

- **Changing `lib/weekly-rest.ts`'s dias úteis (N2).** *Protects:* the reviewability of one diff and
  the DSR's own norms, which G2 verified for the DSR formula and **not** for a collected day count.
  *Override:* **G2 only**, via **L9**; if the gate rules the divergence a defect rather than a
  disclosure, it comes back to G1 rather than being absorbed at G4. AC6 carries the same exemption
  in the same words. *Otherwise:* it is a debt with an owner (`labor-law-analyst`) and a trigger
  (**the next spec that opens `lib/weekly-rest.ts` or the DSR surface**).
- **Repairing S9–S22.** They are **ruled already** in `legal.md` and **routed to
  `.specs/0003-citation-registry/`**, which owns every citation in this repository other than
  Súmula 431. *Protects:* the two-bounce ceiling, and the rule that two gates never rule one
  citation. *Override:* **none at this spec's gates**; only the human may move a row back.
- **`lib/legal-tables.ts:48`** — the commercial-aggregator `sourceUrl`. *Protects:* `0003`'s scope,
  where `0005` G9-F2 routed it. *Override:* none here; only the human may merge `0003` into this
  spec.
- **Any second new input.** One field, and only the one H2 names. *Protects:* `PRODUCT.md` §5 and
  the ten-second path — a spec that answers "the app assumes too much" by asking four questions has
  traded one defect for a form nobody finishes. *Override:* **none at any gate.** A second field is
  a new spec with its own G1.
- **A convenção-coletiva lookup, a jornada preset list or a per-category divisor table.**
  *Protects:* `PRODUCT.md` §7, which forbids a CCT database outright, and §5. *Override:* **none at
  any gate** — §7 requires a human amendment to `PRODUCT.md` first. The categories are **disclosed**
  (D4), never modelled.
- **The journey tab.** `hooks/use-work-calculator.ts` appears in command 3's output only because it
  shares the `workMinutes` storage key. No jornada, exit projection, overtime or adicional noturno
  computation changes. *Protects:* the attribution of any G6 finding to this diff. *Override:*
  **G4 only**, and bounded to whatever the shared storage key requires so that the two tabs do not
  disagree about the jornada diária; any such change is verified by AC9 and moves no number on the
  journey tab.
- **`DESIGN.md` § Motion (debt D3) and the root type ramp (debt F2).** *Protects:* the landing places
  `0006` G10 gave them. *Override:* none here; this spec opens neither document.
- **Layout, hierarchy, tokens and component structure beyond the new field.** *Protects:* the
  ability to attribute a G6/G9 visual or performance finding to something other than this diff.
  *Override:* **G3 (`product-designer`)**, bounded to the new field's placement and to whatever the
  warning's changed text length requires, and bounded by `0006`'s LR2a legibility floor. AC15 and
  AC16 carry the same bound in the same words.

---

## Acceptance criteria

Every command named below was run **in this tree, in this session**, by me; what it printed is in
§ *Evidence available* (`AGENTS.md` §5). Every prohibition is stated as a search over the whole
boundary it names.

| # | Criterion | How it is verified |
|---|---|---|
| **AC1** | **No divisor shown to the user is derived from a day count the user did not supply.** Stated over the whole boundary: no module under `lib/`, `hooks/` or `components/` computes a divisor from a literal or a module-level constant standing for how many days a week this user works — the quantity arrives as a parameter carrying the collected value. | `grep -rnE "WORK_DAYS_PER_WEEK\|WEEKS_IN_DIVISOR\|\* 25\b" --include='*.ts' --include='*.tsx' lib components hooks app` — every surviving hit read in full; plus the rendered readings of AC3 |
| **AC2** | **The app states, on the screen, what it does when the collected operands describe a week above the ceiling `legal.md` settles at L4.** In that state the surface does **not** present the computed divisor as the one the user is owed, and it says what is wrong and what to check (`PRODUCT.md` §5, *silence is a defect*). The two states reachable from the defaults by changing one field each are `jornada 12:00 / dias 5` and `jornada 08:48 / dias 6`. | browser at 390 and 1440, both themes; the full `role="status"` (or `role="alert"`) textContent of each state quoted verbatim into `reports/legal.md`, and read against `legal.md` L4 |
| **AC3** | **Each of the five journeys `legal.md` § *W* measured renders either the divisor that file rules for the declared `(jornada, dias)` pair, or no divisor at all.** No cell is decided by this spec; `legal.md` is the source of truth for every one. | the five states driven in a browser, `role="status"` textContent quoted verbatim into `reports/legal.md` beside the `legal.md` row it is read against |
| **AC4** | **The field exists, defaults to 5, persists, and updates the answer as the user types.** It is reachable and operable by keyboard and by screen reader — labelled, with the label programmatically associated. | `pnpm vitest run __tests__/salary-calculator.test.tsx __tests__/use-salary-calculator.test.ts` green, with a test that queries the field by accessible role and name, changes it, and asserts the rendered divisor changes; reload with a changed value restores it |
| **AC5** | **The defaults reproduce today's numbers.** With the untouched defaults — jornada `08:48`, dias `5`, carga horária mensal `220` — the divisor is 220 and no mismatch warning renders, which is `PRODUCT.md` §5's stated common case (44h semanais). | the default state in a browser: no element with `role="status"` carrying the mismatch title; plus `pnpm vitest run __tests__/salary-period.test.ts` green on its existing `findDivisorMismatch(220, 8.8) === null` expectation, unedited |
| **AC6** | **Nowhere in the tree does a string attribute a rule to Súmula 431 beyond the case `legal.md` R1 records its text as covering.** Every hit of the search below appears in `legal.md` with a ruling, and every hit that survives restricts itself, in its own sentence, to the covered case. *Exemption, in the same words as § Out of scope:* rows **S9–S22 are ruled already and routed to `0003`** and this diff does not touch them; and for `lib/weekly-rest.ts` (N2) the override is **G2 only, via L9 — if the gate rules the divergence a defect rather than a disclosure, it comes back to G1 rather than being absorbed at G4.** | `grep -rn "431" --include='*.ts' --include='*.tsx' --include='*.md' lib components hooks app __tests__ tests README.md` — every line cross-read against `legal.md`; plus `git diff --name-only 4f3a458` — the merge base of this branch with `main`, resolved at G1 by `git merge-base HEAD main` — containing no S9–S22 file |
| **AC7** | **The divisor renders with a pt-BR decimal separator, through a formatter the repository already ships** (N3). Checked in a state whose divisor is not an integer. | the rendered sentence at jornada `07:30`, dias `5`, quoted verbatim into `reports/qa.md`; `grep -rn "Intl\." lib/` naming the formatter used — run at G1: `lib/utils.ts:43` `CURRENCY_FORMATTER`, `:48` `AMOUNT_FORMATTER`, both `Intl.NumberFormat("pt-BR", …)`, so no new formatter is needed |
| **AC8** | **The "Semana" figure uses the collected day count** (N1), or `legal.md` L8 rules it independent and the ruling is quoted in `plan.md`. `__tests__/salary-period.test.ts:36` — *"counts five working days in a week"* — no longer passes by asserting a constant. | `pnpm vitest run __tests__/salary-period.test.ts` green with a case at a day count other than 5 |
| **AC9** | **No other default and no other input moves.** `DEFAULT_MONTHLY_HOURS` is still `220` and the default jornada is still 528 minutes, whatever module each ends up in; the journey tab's rendered numbers are unchanged. *Exemption, in the same words as § Out of scope:* the override is **G4 only, and bounded to whatever the shared storage key requires so that the two tabs do not disagree about the jornada diária; any such change moves no number on the journey tab.** | `grep -rn "DEFAULT_MONTHLY_HOURS\|528" hooks/ lib/`; `pnpm vitest run __tests__/use-salary-calculator.test.ts __tests__/use-work-calculator.test.ts __tests__/work-calculator.test.tsx` green with their existing numeric expectations unedited |
| **AC10** | **A test fails if the defective attribution returns**, and **it was seen red against the unfixed tree before it was seen green** — both outputs pasted into `reports/qa.md`. | `pnpm vitest run __tests__/salary-calculator.test.tsx` red on the pre-fix tree, green after |
| **AC11** | **Every user-visible string this spec changes or adds is listed in `copy.md` with its before and after text**, and every after-string passes the copy guards. | `pnpm vitest run __tests__/copy-guards.test.ts` green; `copy.md` read against the diff |
| **AC12** | **Every comment left in `lib/` that cites a norm has a ruling row in `legal.md`**, and the comment guard passes with no new exemption added to it. | `pnpm vitest run __tests__/comment-free-code.test.ts` green (run at G1: **1 test passed**), and its `TOOLING_DIRECTIVE` / `NORM_CITATION` unchanged in the diff |
| **AC13** | **No citation in `legal.md` is settled from a source the gate did not fetch in this session.** Each names host, artifact, HTTP status and byte size, and is classified primary / official-consolidated / fallback. A commercial aggregator appears as a source nowhere. Where no source returns the text, `legal.md` says so and the spec stops at `tech-lead` for the human. | `legal.md` § sources read; each URL re-fetched by the reviewer and the status reproduced |
| **AC14** | **The full local gate is green and the coverage thresholds are unmoved** — 100% in `lib/**` and `hooks/**`, including every branch the new operand introduces. | `pnpm check` and `pnpm test:coverage`; `vitest.config.ts` thresholds unchanged in the diff |
| **AC15** | **The first-screen cost of the new field is measured and reported, not estimated.** At 390×844, the distance from the top of the document to the divisor warning is recorded before and after this diff in `reports/audit.md`, and the delta is attributed to the field. The number is handed to `.specs/0010-disclosure-reachability-on-mobile/`. *Exemption, in the same words as § Out of scope:* the override is **G3 (`product-designer`), bounded to the new field's placement and to whatever the warning's changed text length requires, and bounded by `0006`'s LR2a legibility floor.** | `node .agents/tools/preview.mjs --out <dir>` at 390×844 on both artifacts, with the two `getBoundingClientRect().top` readings quoted |
| **AC16** | **After the field and the new text, every disclosure surface on this route still satisfies `0006`'s LR2a occupancy floor at 390 and 1440 in both themes.** *Exemption, in the same words as § Out of scope:* the override is **G3 (`product-designer`), bounded to the new field's placement and to whatever the warning's changed text length requires, and bounded by `0006`'s LR2a legibility floor.** | `pnpm e2e tests/e2e/alert-legibility.spec.ts` green — noting that its consumer **C3** drives the divisor warning by filling the carga horária mensal and must be re-read against the new input set |
| **AC17** *(rewritten at run 2, finding F-G5-4)* | **The scope is reproduced, not inherited — and the enumeration is scored against a named state of the tree.** An enumeration with no state beside it is not reproducible, because this spec's own tasks import the symbols the searches match. Two clauses, both required. **(a) Baseline state — commit `5c0c6fa`**, the commit § *Evidence available* names, read without a checkout. Commands 1 and 2 reproduce run 1's table exactly — **22 rows across 12 shipped files and 6 test files, plus 1 guard** — and command 3 reproduces the **15-file list** in § *What command 3 returned* exactly: no extra row, no missing one. **(b) Delivered state — the working tree at the gate doing the scoring.** Command 3's output is a **superset** of clause (a)'s 15, and every file in the delta is attributed **by name** to the `plan.md` task that ordered the import. A file in the delta that no task ordered, a baseline file that disappeared, or a hit either run leaves unclassified means the enumeration was never the domain, and the table gains a row. Neither clause is scored against the other's state, and a count quoted without its clause letter fails. | Clause (a), run at this amendment in this tree: `git grep -l -e "monthlyHours" -e "MONTHLY_HOURS_KEY" -e "DAILY_MINUTES_KEY" -e "useSalaryCalculator" -e "SalaryCalculator" -e "WORK_DAYS_PER_WEEK" 5c0c6fa -- lib components hooks app __tests__ tests README.md \| sed 's/^5c0c6fa://' \| sort` → **15 files**, reproducing § *What command 3 returned* line for line. Clause (b): the same pattern as command 3 over the working tree → **16 files** — the 15 plus `__tests__/salary-period.test.ts`, which matches because **T2, ordered by § In scope 2 and 3 of this spec**, made that file import the two day ceilings; it was **0 matches at `5c0c6fa`**. Delta 1, attributed, clause (b) passes. **Known-bad (lesson 040):** scoring the working tree against clause (a)'s 15 — it returns 16 and is exactly what F-G5-4 reported. **Known-good:** clause (a) against `5c0c6fa`, where the delta is definitionally zero and the output is 15. The two outputs differ in the direction the criterion asserts, from runs a reviewer can re-execute. |

No criterion above contains "properly", "correctly", "nicely" or "as expected", and each is checkable
by a reviewer who has never read the request.

---

## Evidence available

| Claim | Source — the command, run by me in this tree at `5c0c6fa`, and what it printed |
|---|---|
| The divisor is computed from two hard-coded constants | `sed -n '3,6p;40,49p' lib/salary-period.ts` → `const WORK_DAYS_PER_WEEK = 5;`, `const WEEKS_IN_DIVISOR = 5;`, `const DIVISOR_TOLERANCE_HOURS = 1;`, and `Math.round(dailyHours * WORK_DAYS_PER_WEEK * WEEKS_IN_DIVISOR * 100) / 100` with no branch on any declared week |
| The same constant prices the Semana row (**N1**) | `sed -n '31,32p' lib/salary-period.ts` → `case "week": return hourlyAmount * dailyHours * WORK_DAYS_PER_WEEK;`, pinned by `__tests__/salary-period.test.ts:36` *"counts five working days in a week"* |
| The app asserts a six-day week elsewhere (**N2**) | `sed -n '10,15p' lib/weekly-rest.ts` → dias úteis = every day of the month minus the Sundays |
| The divisor is interpolated unformatted (**N3**) | `sed -n '151,153p' components/organisms/salary-calculator.tsx` → `…corresponde ao divisor {coherentMonthlyHours}{" "}horas por mês, e não {monthlyHours}…` |
| A green suite currently **requires** the defective string | `sed -n '188p' __tests__/salary-calculator.test.tsx` → `expect(screen.getByRole("status")).toHaveTextContent("Súmula 431 do TST");` |
| The 431 boundary is 5 lines in 5 files | `grep -rn "431" --include='*.ts' --include='*.tsx' --include='*.md' lib components hooks app __tests__ tests README.md` → `lib/salary-period.ts:40`, `components/organisms/salary-calculator.tsx:151`, `__tests__/salary-period.test.ts:70`, `__tests__/salary-calculator.test.tsx:188`, `README.md:58` |
| A new input touches 15 files **at `5c0c6fa`**, and 16 in the delivered tree | command 3 of § *The searches, re-run*, output listed verbatim in that section; re-run at run 2 over the working tree → the same 15 plus `__tests__/salary-period.test.ts`, imported by T2. AC17 scores each count against its own clause. |
| The rendered divisor is wrong on the journeys the app was not calibrated on | `legal.md` § *W* and § *Run 2 — the § W verdicts* — rendered `role="status"` textContent in an isolated copy, five journeys |
| `planalto.gov.br` is unreachable for the sixth consecutive gate; Câmara/Legin answers | `curl -s -o /dev/null -w "%{http_code} %{size_download}" --max-time 40 <camara>` → **`200 1790529`**; the same against `planalto.gov.br/ccivil_03/decreto-lei/del5452.htm` → **`000 0`** (timeout) |
| The verification path for AC5, AC9, AC10 and AC12 is operable | `pnpm vitest run __tests__/salary-period.test.ts __tests__/use-salary-calculator.test.ts __tests__/salary-calculator.test.tsx __tests__/comment-free-code.test.ts` → **4 files, 60 tests, all passed, 2.06 s** |
| The e2e consumer that drives this warning exists and how it drives it | `sed -n '44,52p' tests/e2e/alert-legibility.spec.ts` → consumer **C3**, route `/custo-da-hora`, `role: "status"`, driven by filling *Carga Horária Mensal* with `200` |
| What the product may claim, and what it will not do | `PRODUCT.md` §4 (*cite or omit* / *name the gap*), §5 (every field costs attention; the default is the common case), §7 (no CCT database), §9 (evidence table) |
| First-screen area is the scarcest resource on this route | `.specs/INDEX.md` row `0010` — no disclosure surface above the fold at 390×844; nearest 389.9 px below it |

---

## Disclosure obligations

`PRODUCT.md` §4's second commitment — **name the gap**. D1–D4 are `legal.md`'s, restated as this
spec's obligations; D5 and D6 follow from the field H2 adds. Each must be **visible next to its
number**, never inside a collapsed panel (lesson **018**). `content-writer` owns the words;
`product-designer` owns where they sit.

| # | What must be said | Source |
|---|---|---|
| **D1** | That the divisor follows from **what the user typed**, and that a convenção or acordo coletivo may pactuar a different jornada and therefore a different divisor — which this app can never know, because `PRODUCT.md` §7 forbids the database that would tell it | `legal.md` D1, R5 |
| **D2** | That the same daily journey belongs to **different weekly durations** depending on how many days it is spread over — and that the day count is the variable the norm itself makes the divisor depend on, not a simplification this app invented | `legal.md` D2 as amended at run 2 |
| **D3** | Where a norm is still named: **which case it covers**, with the scope word beside the norm name and not in a sibling clause (lesson **004**) | `legal.md` D3 |
| **D4** | That specific categories have divisors fixed by their own norms — bancários, turnos ininterruptos de revezamento, escala 12×36 — and that **this screen does not model them** | `legal.md` D4, R3, L5 |
| **D5** | **New.** That the divisor's day count is the one the user declared, while the DSR shown on the jornada tab counts its own days from the calendar (**N2**) — so the two surfaces may not describe the same week | N2; **G2 settles at L9 whether this is a disclosure or a defect** |
| **D6** | **New.** That **5 is a default, not a finding about this user** — the app is assuming it until the user says otherwise | H2; **G2 settles at L11 whether this is a legal necessity or a product courtesy** |

**A silent deletion of the Súmula 431 citation is forbidden** (lesson **003**): a retired claim is
retired with a recorded non-claim in `PRODUCT.md` §9 and its unlock sequence. **Softening to
"conforme a legislação" is equally forbidden** — it satisfies no clause of §4, and under lesson
**004** the replacement is bound by what it must **say**, not by the words it may not use.

---

## Non-goals

What a well-meaning agent downstream might add, and must not:

- **Do not add a second field.** Not horas semanais *and* dias por semana; not a jornada preset
  list; not a "qual é o meu divisor?" flow. One field, the one H2 names. § Out of scope.
- **Do not model the categories.** Bancário, turnos ininterruptos and 12×36 are **disclosed** (D4).
  A divisor lookup table by profession is a CCT database wearing a different name.
- **Do not fix the DSR while you are in there.** N2 is named, disclosed and routed, with an owner
  and a trigger. `AGENTS.md` §4 rule 3 exists because a spec that grows on each bounce never closes.
- **Do not delete the citation to make the problem go away**, and do not soften it into vagueness.
  Lessons **003** and **004**.
- **Do not add a `biome-ignore`, a guard exemption or a `NORM_CITATION` carve-out** to make a
  comment pass. AC12 forbids changing the guard.
- **Do not state L3's conversion, L4's ceiling or L11's disclosure rule from memory.** They are G2's,
  and a number settled from memory reproduces the exact failure this spec exists to repair.
- **Do not treat "the host returned 200" as "the text was read"**, and do not treat "the tool
  returned content" as "the text was read" — `legal.md` recorded both traps, one on `tst.jus.br` and
  one on a PDF summariser.
- **Do not widen this spec to absorb `0003` or `0010`.** The aggregator URL is `0003`'s; the fold is
  `0010`'s; AC15 hands `0010` a number and takes none of its scope.

---

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| **Q1 — What is the conversion from "dias por semana" to the monthly quantity CLT art. 64, parágrafo único names?** | **None. G2 states it (L3).** | `legal.md` § *Run 2 — correction to R3* reads `5 dias × 5 semanas = 25 dias de trabalho por mês`; a month is not exactly five weeks, and `lib/weekly-rest.ts` derives a different count from the calendar for a different purpose. Choosing between them is a legal reading with a number attached, and this spec states no number. **Blocking.** |
| **Q2 — What does the app do when the declared week exceeds the legal ceiling?** | **Default: it does not present the computed divisor as the one the user is owed, and it says what is wrong** (`PRODUCT.md` §5, *silence is a defect*). | The 12×36 row is what the G2 verdict rests on, and showing `300` as "o devido" is the harm. The **ceiling itself, and whether the right behaviour is to refuse the number or to price it with a disclosure, is L4 and blocking.** AC2 is written against whatever L4 says. |
| **Q3 — Does the "Semana" figure follow the collected day count?** | **Default: yes** (AC8). | It is the same operand asserting the same fact about the same user, in the same module. Asking the question and then ignoring the answer on the row below is worse than never asking. **G2 may rule otherwise at L8**, and AC8 carries that route. |
| **Q4 — Is the DSR's calendar-derived day count (N2) a defect or a disclosure?** | **Default: a disclosure (D5), routed with an owner and a trigger.** | Its norms were verified for the DSR formula, not for a collected day count, and re-verifying them is a second law question inside a spec at its bounce ceiling. **G2 rules at L9;** if it rules defect, § Out of scope sends the spec back to G1 rather than absorbing it. |
| **Q5 — Does `PRODUCT.md` §9 need a row or an amendment?** | **Default: yes if G2's rulings change what the product may claim about its divisor**, no otherwise. | §9 is the list of what the product may claim. Amending `PRODUCT.md` is a **human approval point** (`AGENTS.md` §4). |
| **Q6 — Does this spec contradict `PRODUCT.md` §7?** | **No.** | Checked end to end at this run. One field, held in `localStorage` like every other input: no account, no history, no employer feature, no legal advice, no English, **no convenção-coletiva database** — §7's nearest boundary, and § Non-goals forbids the lookup table that would cross it. |
| **Q7 — Is `Q-H3` (AC3-of-run-1 versus the `0003` boundary) still open?** | **Closed here, as a scope decision, in `0003`'s favour.** | Run 1's AC3 demanded a ruling on all 22 rows; the orchestrator gave every non-431 citation to `0003`. That conflict was mine to create and is mine to remove: run 2 owns **S1–S8 and G**, and S9–S22 are ruled-and-routed. Recorded rather than carried, and **the human may reverse it** — it is a scope call, not a legal one. |

---

## Carried debt

| Id | What | Why it lands here | What this spec does with it |
|---|---|---|---|
| **X1** | The Súmula 431 over-extension, now known to be a wrong norm named over a wrong number | Its trigger was *"the first spec with scope over `lib/salary-period.ts`"* | **Closed here**, on the calculation premise: S1, S2, S6, S8 plus the operand underneath them |
| **`0004` G2 Q2 / P1** | `planalto.gov.br` unreachable | Precondition on X1's repair | **Resolved.** Súmula half at G2 run 1 (JusLaboris); statute half by **H1** (Câmara/Legin). No further carry |
| **N2** | `lib/weekly-rest.ts` counts a six-day week while the salário tab asserts five | Found by command 3 at this run | **Disclosed (D5), routed.** Owner `labor-law-analyst`; trigger: **the next spec that opens `lib/weekly-rest.ts` or the DSR surface**. G2 may pull it in at L9 |
| **`legal.md` F3 / Q-H4** | `lib/compliance.ts:65` asserts a payment consequence whose only basis (OJ 355 da SBDI-I) was cancelled in June 2025 | Found at G2, outside this spec's rows | **Not here.** Routed to `0003`; if `0003` declines, it is the human's, per `legal.md` Q-H4. It is not carried silently |
| **Q-H2** | No reachable host enumerates TST súmula alterations by date | Currency risk on every súmula this repo cites | **Not here.** The human's; a monitored source is a standing cost, not a spec decision |
| **D3, F2 (`0006`)** | `DESIGN.md` § Motion; the root type ramp | `0006` G10 gave both `product-manager` as owner | **Not here.** Their landing places stand |
| **`0005` G9-F2** | `lib/legal-tables.ts:48`'s aggregator `sourceUrl` | Sits one line from S19 | **Not here.** `0003`'s; only the human may merge them |

---

## Tooling defect, re-measured before being forwarded

G2 run 2 reported that `node .agents/tools/lesson.mjs new "<title>"` builds the filename from the
**full title** and exceeded the filesystem's 255-byte limit, breaking the atomic write.
**Re-measured at this gate rather than carried:** the repair is already in the tree —
`.agents/tools/lesson.mjs:46` carries `const MAX_SLUG = 120` and cuts the slug at the last whole
word that fits, keeping the full title in the frontmatter the index reads. Confirmed by use, not by
reading: `lesson.mjs new` with a 172-character title wrote lesson **045** with a truncated slug.
`git status --porcelain .agents/tools/` → ` M .agents/tools/lesson.mjs` — **the fix is
uncommitted.** What `tech-lead` owes is a commit, not an investigation. Recorded in `STATUS.md` as
**T1**.
