# 0013 — assumed rates beside money

> Owner: product-manager · Gate: `spec`

**Two coordinates for everything measured in this document** (`AGENTS.md` §5, *How a claim about the
tree is measured*):

| | |
|---|---|
| **Tree state — baseline** | `HEAD` **5c0c6fa**, read with `git grep … 5c0c6fa`. Every count labelled *@sha* must reproduce exactly. |
| **Tree state — delivered** | the working tree of branch `fix/design-taste-preflight` as of 2026-09-19 11:05, which is **not** equal to the sha in the very file this spec binds. Every delta is attributed by name in § Evidence **R5**. |
| **Application state** | named `ST-A`…`ST-D` in § The states, by the props that produce them. No screenshot, no adjective. |
| **Instrument** | Vitest + Testing Library (jsdom), run in an isolated copy outside the repository. No port, no server, no browser, no `next dev`. |

---

## Problem

A worker opens the Jornada screen, reads

> `Extra 100% · 4h 12m · R$ 572,73`

and has no way to learn, from that screen, that the **100** is a number **WorkLoad chose for them**.
They never typed it. It sits in the same row as the money it prices, in the typographic position a
label occupies, so it reads as a property of their contract rather than as the app's assumption. The
same is true of the `50` one row above.

This is `PRODUCT.md` §4 *name the gap* failing at the exact place §4 exists to protect: the app
computes something a real payslip would compute from a **convenção coletiva** it does not have, and
says nothing where the number is read.

Recorded by `labor-law-analyst` as finding **L-2**, severity **major**, in
`.specs/0003-citation-registry/legal.md` §16.3. Refused from `0012`'s scope by `product-manager` on
2026-09-19; routed back into `0012` by `tech-lead`; the refusal upheld by the team lead. This spec is
the consequence of that ruling and does not re-open it.

## Audience & moment

The `PRODUCT.md` §1 question is **#2 — *"Quanto de hora extra eu já tenho, e está sendo pago na taxa
certa?"*** The moment is the 10-second first contact: the reader has just typed their times, the
answer panel is on screen, the settings panel is **closed**, and the field hint that explains the
rate is **not in the DOM at all** — measured, `.specs/0003-citation-registry/legal.md` §16.2 state
S-F: `aria-expanded="false"`, `#extra-tier-rate` count **0**, hint **absent**.

## Outcome

In every application state where the app renders a rate it chose on the user's behalf as a money
label, the reader can see, without opening anything and without scrolling to another surface, that
the rate is the app's assumption and where a different one would come from.

---

## The states

Named by the props that produce them. Reproduced by `__tests__/zz-probe-0013.test.tsx` in the
isolated copy (§ Evidence **R5**).

| Id | Application state |
|---|---|
| **ST-A** | `times.entry = 2025-01-06T08:00` (segunda), lunch 12:00–13:00, exit 22:00; `grossHourlyRate = 68.1818`; `firstTierMinutes = 120`, `extraTierMinutes = 132`, `nightMinutes = 0`; `firstTierRate = 50`, `extraTierRate = 100` |
| **ST-B** | ST-A with `times.entry = 2025-01-04T08:00` (sábado) and `firstTierMinutes = 0`, `extraTierMinutes = 252` — the routing `0012` is correcting |
| **ST-C** | ST-A with `grossHourlyRate = null` — **no money renders, the rate labels still do** |
| **ST-D** | ST-A with `nightMinutes = 120`, `breakdown.nightMinutes = 120`, `breakdown.nightBonusMinutes = 17` |

---

## The domain — a test, not a list

A rendered string is a **member of this spec's domain** iff all three clauses hold. The clauses are
read against the module the string's operands come from, never against the component that happens to
render it (`AGENTS.md` §5, *How a rule's domain is defined*).

| Clause | Test |
|---|---|
| **T1 — it states a quantity** | the string states a rate, a multiplier, a divisor, a count or a classification that decides a money figure |
| **T2 — the app chose it** | that quantity reaches the screen from a literal, a `DEFAULT_*` constant, or a derivation from the device calendar — **not** from a control the user filled. A value restored from `localStorage` that the user once typed is **not** a member; a value restored from `localStorage` that was written there by a default the user never saw **is** |
| **T3 — the reader is inside the money row** | the string and a money figure are in the **same row element**, or the string is the accessible label of that money figure — so the reader reads it as the price's basis |

A member is **defective**, and therefore in scope, iff it additionally fails:

| Clause | Test |
|---|---|
| **D — co-presence** | in **every** application state in which the member's string renders, a string co-rendered in that same state names the quantity's source **and** says a different value is lawful. Not gated on a panel, not gated on a gesture, not gated on the money being non-zero |

**D's scope is the string's states, not the money's states.** ST-C renders `Extra 100%` with no money
beside it; the assertion is made there too, so the duty holds there too. This is deliberate and it is
what makes the rule cheap: a disclosure that renders unconditionally in the block satisfies every
state at once.

**Why the domain may not be a grep.** `git grep -c -E '[0-9]+%' 5c0c6fa -- components app` returns
**1** row in `day-summary.tsx` — the night premium. It cannot see `Extra {firstTierRate}%` or
`Extra {extraTierRate}%`, because those percentages are interpolated from a variable. Any
enumeration built from a literal-percent search is built blind to the two sites this spec exists for.

### What the test returns, at both coordinates

| Id | Member | T1 | T2 | T3 | D @sha 5c0c6fa | D @working tree |
|---|---|---|---|---|---|---|
| **M1** | `components/organisms/day-summary.tsx:193` `Extra {firstTierRate}%`, labelling `:197` `formatCurrency(firstTierPay)` | ✓ | ✓ `DEFAULT_FIRST_TIER_RATE = 50`, `hooks/use-work-calculator.ts:13` | ✓ same flex row | **fail** | **fail** |
| **M2** | `components/organisms/day-summary.tsx:203` `Extra {extraTierRate}%`, labelling `:207` `formatCurrency(extraTierPay)` | ✓ | ✓ `DEFAULT_EXTRA_TIER_RATE = 100`, `hooks/use-work-calculator.ts:14` | ✓ same flex row | **fail** | **fail** |
| **M3** | `components/organisms/day-summary.tsx:213` `Adicional noturno 20%`, labelling `:217` `formatCurrency(nightPay)` | ✓ | ✓ `NIGHT_PREMIUM_RATE = 0.2`, `lib/night-shift.ts:8` | ✓ same flex row | **fail** | **pass** |
| **M4** | `components/organisms/day-summary.tsx:224` `DSR de extras e noturno`, labelling `:226` `formatCurrency(restDayPay)` — the label asserts a method and a month operand | ✓ | ✓ `SUNDAY = 0` + `splitMonthDays(new Date(times.entry))`, `lib/weekly-rest.ts:3,11` | ✓ same flex row | **pass** | **pass** |

**M3's delta is attributed by name and is not an argument about whether the baseline count was
wrong.** The disclosure paragraph that makes M3 pass (`day-summary.tsx:232-235` in the working tree)
is **uncommitted work authored by `0003`** — the identical string is in
`.specs/0003-citation-registry/copy.md` and `.specs/0003-citation-registry/plan.md`. At the sha it
does not exist and M3 fails. Delivered set = baseline set; the one member that moved, moved because a
named sibling spec moved it.

**M3 and M4 are this spec's known-good.** They are the same shape as M1/M2, in the same block, in the
same file, and they already satisfy **D**. The remedy M1/M2 need is the move that was already made
twice beside them.

**Every enumeration above is an example of the test's output, not its definition.** A new money row
that asserts an app-chosen rate is a member the day it is written, whether or not it appears here.

---

## Why now

- The number is **live on production** and it is a money figure. `.specs/0003-citation-registry/legal.md` §16.3 measured the rendered row at 390 and 1440: `Extra 100% · 4h 12m · R$ 572,73`, row border box 308,00 px and 667,33 px, settings panel closed.
- `0012` does **not** discharge it. `0012` G2 settled that every day takes `min(ot,120)` / `max(0,ot−120)`; the second tier and its `Extra 100%` label survive the correction intact, priced at a rate no norm produces. A correct split of minutes between two rows does not make either row's rate traceable.
- `0003` does **not** discharge it either. `0003` registers citations for figures a norm produces. M1/M2 assert a quantity **no norm produces**, so there is no citation to register — which is precisely why `labor-law-analyst` routed L-2 out of `0003` rather than absorbing it.
- The field hint that would explain the rate is **unmounted until a tap** on a panel most readers never open, and `0010` has already measured that no disclosure surface in this product is above the fold at 390×844.

---

## Scope

Derived from the searches in § Evidence, run in this session, at both coordinates. Where a handed
list and a run disagreed, the run won and the disagreement is recorded in `STATUS.md`.

1. **The two defective members M1 and M2**, in every application state where their label renders — which includes ST-C, where no money renders at all, and all seven weekday classes, which `0012` never reaches for this purpose.
2. **The operands those two rows assert**, as the content the disclosure must cover: the first-tier rate, the second-tier rate, and **the boundary that decides which row a minute lands in** (`FIRST_TIER_LIMIT_MINUTES = 120`, `hooks/use-work-calculator.ts:9`). A reader told where `100` comes from and not told why the row splits at two hours has been told half of the assumption.
3. **A disclosure slot for M1/M2 in the variable-pay block of `components/organisms/day-summary.tsx`**, rendering under the same condition as the labels themselves. Placement and geometry are `product-designer`'s; wording is `content-writer`'s; the claim is `labor-law-analyst`'s.
4. **A shipped guard** that scores clause **D** over the domain and fails when a member loses its disclosure. It ships on a tracked path because its verdict must be falsifiable after this spec closes (`AGENTS.md` §5).
5. **Reconciliation with `0012`'s `W1` disclosure**, which is a different sentence about a different operand and is still slotless — `0012`'s `design.md` is the unedited template at the time of writing.

## Out of scope

Each exclusion states **the property it protects** and **the gate that may override it**. An
exclusion and the criterion that verifies it may not disagree; if they do, the exclusion is the one
out of date and the prose is fixed here (promoted rule, `0006` G10).

1. **No money figure changes, and no arithmetic changes.** Protects the falsifiability of this spec's whole claim: a disclosure spec that also moves a number cannot prove the disclosure was what fixed the screen, and it would collide head-on with `0012`, which owns every figure the tier split moves. Overridable only by **G2**, and only by blocking to the human — never by an edit inside this spec. Verified by **AC7**, which carries no exemption.
2. **No new user input, no new field, no new toggle.** Protects `PRODUCT.md` §5 *clarity over completeness*: the remedy for an undisclosed assumption is the disclosure, not a fourteenth field. Overridable at **G2** if `labor-law-analyst` rules the gap cannot be named without collecting the operand — in which case the override returns here as a G1 re-run, and the field arrives with its default stated. Verified by **AC8**.
3. **`components/organisms/journey-form.tsx:142` and `:157` — the two field hints — are not edited.** Protects `0010`'s and `0003`'s in-flight work on those exact strings, and protects the reading that the defect is *absence at the money*, not *wrongness in the panel*. Overridable at **G4** only if `tech-lead` finds that this spec's own slot would render the panel hint twice in one state — lesson **047** forbids one sentence in two slots at once, and the resolution is then to change the panel hint's **text**, never to delete the new slot. Verified by **AC9**, which carries exactly that exemption and names it.
4. **M3 and M4 are not re-specified.** Protects them as this spec's known-good: a criterion whose known-good state is also being edited by the same spec proves nothing. Overridable at **G6** if the guard shows a member regressing, which is a finding that adds a row rather than a scope change. Verified by **AC4**, which requires M3/M4 to pass **before and after**.
5. **The divisor, `DEFAULT_MONTHLY_HOURS = 220`, `DEFAULT_WORK_DAYS_PER_WEEK` and the regime label are `0007`'s, not this spec's.** They fail **T3** — none is inside a money row; each is inside a control or an alert — and `0007` is already discharging them (its in-flight `DivisorSentence` cites the norm inline, which is why § Evidence **R1** returns 16 rows at the sha and 18 in the working tree). Overridable by the human only, by ruling the two specs merge.
6. **Silent operands that render nothing — `dependents = 0`, `manualInss`/`manualIrrf` unset — are not covered.** They fail **T1**: nothing is stated on screen, so there is no assertion to qualify. This is a real gap and it is **routed, not dropped**: recorded as finding **F1** in `STATUS.md` with an owner. Overridable by the human.
7. **Nothing is measured in a browser by this spec's own gates.** Protects other developers on this machine, who were running browser instruments as this was written. Overridable at **G6**/**G7**, where a browser run is the auditor's own instrument on their own port.

---

## Legal dependencies

Named, not stated. Every one is open and **blocking at G2**; `labor-law-analyst` owns the substance,
and §16.3 of `.specs/0003-citation-registry/legal.md` is the trigger that opened this spec.

| Id | The rule, table or threshold this change relies on |
|---|---|
| **L1** | The statutory floor for the adicional de hora extra, and the norm that fixes it — whether a floor is a value the app may render as a **default** without qualifying it |
| **L2** | Whether **any** operative unit of any norm in force produces a **second, higher rate** after a given number of extra hours, and if not, which instrument can |
| **L3** | Whether that instrument is one `PRODUCT.md` §7 forbids the app to carry, and what follows for the wording |
| **L4** | The claim the first-tier row's disclosure must assert — stated as what it **must say**, with the scope word's required position in the sentence |
| **L5** | The claim the second-tier row's disclosure must assert, same form |
| **L6** | Whether the **two-hour boundary** between the rows carries a norm at all, and what must be said about it |
| **L7** | Whether one disclosure may cover both rows, or whether each row's assertion requires its own |
| **L8** | Whether the rate label may render at all in **ST-C** — rate asserted, no money — or whether the label itself must change |
| **L9** | Whether `0012`'s weekday correction creates any **additional** disclosure duty on these two rows that `0012`'s `W1` does not already carry |
| **L10** | Whether **M3**'s existing string (`0003`'s in-flight paragraph) satisfies clause **D** on its own terms, so this spec may cite it as its compliant reference |
| **L11** | Whether **M4**'s existing string satisfies clause **D**, same question |
| **L12** | Whether a rate the user **did** type, restored from `localStorage`, still carries a disclosure duty — the **T2** boundary |

---

## Disclosure obligations

Where this change computes something a real payslip would compute differently, and the app must
therefore say so out loud (`PRODUCT.md` §4):

| Id | The gap |
|---|---|
| **DO1** | The first-tier rate is an app default. A real payslip uses the rate in the reader's own contract or convenção coletiva. |
| **DO2** | The second-tier rate is an app default that no norm produces. A real payslip has it only if the reader's convenção coletiva created it. |
| **DO3** | The split at two hours is an app assumption about **which** hours cost which rate. A real payslip splits by whatever instrument the reader is under, or does not split at all. |
| **DO4** | These gaps exist in every state where the rate labels render, including the state where the money is absent and the rate is asserted anyway. |

The **content** of DO1–DO4 is `labor-law-analyst`'s at G2 and `content-writer`'s at G3. This spec
states that they are owed and where they must be visible, and states no rate, no norm and no article.

---

## Acceptance criteria

Every criterion is checkable by a reviewer with only the repository. No criterion contains
"properly", "correctly", "nicely" or "as expected". The scored quantity for AC1–AC4 is **`disclosures`
— the count of co-rendered strings satisfying clause D for a given member in a given state**, which
§ Evidence **R5** has already moved with the defect, in this session, in four runs.

| # | Criterion | How it is verified |
|---|---|---|
| **AC1** | In **ST-A**, **ST-B** and **ST-D**, `disclosures ≥ 1` for **M1** and for **M2**. Known-bad = **0** in all three states, runs A and B. Known-good = **1** in all three states, run D2. | The guard of AC5, run with `npx vitest run <guard path>` |
| **AC2** | In **ST-C** — rate labels rendered, `grossHourlyRate = null`, no money anywhere — `disclosures ≥ 1` for **M1** and for **M2**. Known-bad = **0**, runs A, B and D2 alike; **no run in this session produced a pass here**, which is stated rather than hidden: ST-C is the state the fix must reach and no measured known-good exists for it yet. | Same guard. `plan.md` produces the ST-C known-good at G4 before endorsing this criterion (`AGENTS.md` §5) |
| **AC3** | The disclosure satisfying AC1/AC2 is in the DOM with `getBoundingClientRect().height > 0` on its border box and `getComputedStyle().opacity === "1"`, with **no panel opened and no gesture performed**, and again after a full reload with the rates persisted. | `qa-engineer` at G6, on the production build, in an isolated copy on a confirmed-free port |
| **AC4** | **M3** and **M4** score `disclosures ≥ 1` in every state where their labels render, **both before and after** this spec's build, and no string of theirs is edited. | Same guard, run against the pre-build tree and the post-build tree; plus `git diff` over `day-summary.tsx:213` and `:224` returning no change to those two labels or to the two paragraphs at `:232` and `:238` |
| **AC5** | A guard scoring clause **D** over all four members ships on a **tracked** path under `__tests__/`, and is listed in `plan.md` against this criterion. `__tests__/` is where `vitest.config.ts` collects; `tests/` holds only the Playwright specs it excludes. | `git ls-files __tests__` returns the new file (the directory already returns **58**); `git check-ignore -v <path>` exits **1** |
| **AC6** | The guard asserts the **size of the set it iterates** — expected **4** members — before iterating, and fails on **0**. A run that measures nothing is a failure, not a pass. | Read the guard; delete one member's markup in an isolated copy and confirm the guard reports a count of 3 and fails |
| **AC7** | No money figure changes. For the four `formatCurrency` call sites in `day-summary.tsx`, the rendered strings in ST-A, ST-B and ST-D are byte-identical before and after the build. **No exemption.** | A snapshot of the four rendered money strings per state, captured before the build and re-run after |
| **AC8** | No new user input. `git diff` introduces no `<input>`, no `<select>`, no new `STORAGE_KEYS` entry and no new `DEFAULT_*` constant anywhere in `app/`, `components/`, `hooks/`, `lib/`. | `git diff` filtered on those tokens over those four directories, returning no added line |
| **AC9** | `components/organisms/journey-form.tsx:142` and `:157` are unchanged — **unless** `tech-lead` records at G4 that this spec's slot would render the same sentence twice in one state, in which case the hint's **text** changes and the slot stays, and the ruling is in `STATUS.md`'s decisions log naming the state. | `git diff -- components/organisms/journey-form.tsx`, read beside the decisions log |
| **AC10** | `plan.md` names the slot this spec's disclosure occupies **and** the slot `0012`'s `W1` occupies, and states in one line why the two are two sentences and not one repeated — lesson **047**. If `0012` has not chosen `W1`'s slot by then, `plan.md` says so and names who decides. | Read `plan.md`; cross-read `.specs/0012-saturday-overtime-tier/design.md` |
| **AC11** | `plan.md` reconciles the shipped guard of AC5 with `0006`'s recorded refusal of a permanent guard, in one line, either way. | Read `plan.md` beside `.specs/0006-salary-alert-legibility/STATUS.md` |
| **AC12** | Every string this spec adds is pt-BR, written by `content-writer`, and asserts no rate, no percentage and no article that `legal.md` has not settled at G2. | `legal.md` §-by-§ against `copy.md` at G6 |

**This spec introduces no user input, so there is no default to state.** Recorded explicitly, because
an unstated default is how a spec introduces a form the user has to disarm (`PRODUCT.md` §5).

---

## Evidence available

Every command below was run in this session, by me, in this tree. `R5`'s four runs were executed in
an isolated copy created with `rsync -a --exclude node_modules --exclude .next --exclude .git` plus
`cp -al` of `node_modules`; the repository working tree was not modified by any of them.

| Id | Claim | Command, and what it printed |
|---|---|---|
| **R1** | The money-rendering surface is 4 files @sha, and `0007` added two rows to it | `git grep -c -E 'formatCurrency\(\|formatCurrencySimple\(' 5c0c6fa -- components app` → `currency-input.tsx:2`, `day-summary.tsx:4`, `salary-calculator.tsx:8`, `tax-details-panel.tsx:2` = **16 rows / 4 files**. Same grep on the working tree = **18 rows**; the +2 are `salary-calculator.tsx:74,78`, `0007`'s `DivisorSentence` |
| **R2** | The tier rates reach exactly two rendered-as-text sites, and nothing changed between the coordinates | `git grep -n -E 'firstTierRate\|extraTierRate\|FIRST_TIER\|EXTRA_TIER' 5c0c6fa -- app components hooks lib` → **38 rows**; identical count on the working tree. Of those, rendered as text: `day-summary.tsx:193`, `:203`. Rendered as an `<input value>`: `journey-form.tsx:150`, `:165` |
| **R3** | A literal-percent grep is blind to this spec's two sites | `git grep -c -E '[0-9]+%' 5c0c6fa -- components app` → `app/globals.css:7`, `day-summary.tsx:**1**`, `journey-form.tsx:2` = 10 rows. The single `day-summary` row is `:213`, the night premium. `:193` and `:203` are invisible to it |
| **R4** | The rates are app defaults, not user values | `git grep -n -E 'DEFAULT_[A-Z_]+ = ' 5c0c6fa -- hooks lib` → 6 rows, including `hooks/use-work-calculator.ts:13 DEFAULT_FIRST_TIER_RATE = 50` and `:14 DEFAULT_EXTRA_TIER_RATE = 100` |
| **R5** | Clause **D** discriminates, in both directions, on a named quantity | Four runs of `npx vitest run __tests__/zz-probe-0013.test.tsx`, isolated copy — table below |
| **R6** | The field hint is absent from the DOM in the state the money renders | `.specs/0003-citation-registry/legal.md` §16.2, state **S-F**: `aria-expanded="false"`, `#extra-tier-rate` count **0**, hint **no** |
| **R7** | The guard's destination is tracked and not ignored | `git ls-files __tests__ \| wc -l` → **58**; `git check-ignore -v __tests__/day-summary.test.tsx` → exit **1**. For contrast, `git check-ignore -v .specs/0013-…/evidence/x` → exit **0**, `.gitignore:55` |

### R5 — the four runs

`disclosures` per member, in the money-bearing states ST-A / ST-B / ST-D (identical across the three
in every run). ST-C scores `n/a` in every run because no money renders there — which is the gap
**AC2** exists to close.

| Run | Tree state | M1 | M2 | M3 | M4 |
|---|---|---|---|---|---|
| **A** — known-bad, baseline | `day-summary.tsx` restored from **5c0c6fa** | **0** | **0** | **0** | 1 |
| **B** — known-bad, delivered | working tree, unmodified | **0** | **0** | 1 | 1 |
| **D** — refuted known-good | B + one paragraph asserting the assumption but citing **no** norm | **0** | **0** | 2 | 1 |
| **D2** — known-good | D with the citation added | **1** | **1** | 2 | 1 |

What each cell means, because a green with no reason is an instrument reading and not a fact:

- **A → B, M3 moves 0 → 1.** Attributed by name: `0003`'s uncommitted paragraph at `day-summary.tsx:232-235`, whose identical text is in `.specs/0003-citation-registry/copy.md`. Not a baseline that was wrong.
- **B → D, M1/M2 stay 0.** The injected string asserted the assumption in plain words and carried no norm. The clause bit. This is the run that proves the citation half of **D** is load-bearing and not decoration.
- **D → D2, M1/M2 move 0 → 1.** One paragraph, in the same block, under the same render condition as the labels. The lever is inside § Scope item 3.
- **M3 = 2 in D and D2** because `0003`'s DSR paragraph also names *adicional noturno*. Two covering strings, not a double-count of one — stated so a later gate does not read `2` as a defect.
- **M4 = 1 in every run**, including the baseline. Its paragraph predates all of this work. It is the member that proves the guard does not simply fail everything.

**One correction the measurement forced on me, recorded rather than tuned away.** My first marker set
scored **M4 = 0**, and I had expected 1. Reading the string, M4 **is** disclosed — it says
*"O cálculo supõe …"* and *"Feriados não entram"*, which my marker set did not contain. Per
`AGENTS.md` §5, the disagreement corrected **the artifact that set the expectation**, not the
assertion: the marker set gained the *supõe / não entram / pode prever* family, and M1/M2's subject
marker was narrowed from `/extra/i` — which the DSR paragraph matched by accident — to the terms that
name the tiered rate itself. Both edits were made **before** any known-good run, and the re-run
produced A/B/D/D2 above with M1/M2 still at **0**, so the widening did not manufacture the result.

---

## Non-goals

What a well-meaning agent downstream might add, and must not:

- **Do not fix the rate.** Changing `DEFAULT_EXTRA_TIER_RATE` from `100` to anything is an arithmetic change to a money figure, is `0012`'s and the human's territory, and is barred by § Out of scope 1 and **AC7**.
- **Do not build a convenção coletiva lookup, a picker, or a per-category table.** `PRODUCT.md` §7 refuses it outright: *"it cannot be kept accurate, and an inaccurate one is worse than the disclaimer that replaces it."*
- **Do not solve this by moving the settings panel, opening it by default, or making the hint always-visible.** That trades `PRODUCT.md` §5's *default is the common case* for a form the user must disarm, and it puts the explanation where the number is not.
- **Do not link out to a separate page.** The reader is at a time clock with the answer on screen; a disclosure they must navigate to has not been made.
- **Do not add a hedge in place of naming the gap** — *aproximadamente*, *estimativa*, *pode variar*. `PRODUCT.md` §4 is *cite or omit*.
- **Do not widen the domain to every default in the app.** The test is T1–T3; F1 in `STATUS.md` carries the silent-operand class with an owner.
- **Do not delete `__tests__/zz-probe-0013.test.tsx` from the isolated copy and call it the shipped guard.** It is scaffolding; the pasted output above is the durable artifact. AC5's guard is a new, tracked file.

---

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| Does one disclosure cover both M1 and M2, or does each row need its own? | **One**, covering both rates and the two-hour boundary | `PRODUCT.md` §5, clarity over completeness; two paragraphs in one block is the shape `0003` already rejected for M3/M4. **L7 overrides this at G2** |
| Does the disclosure render when both tier rows show `0h 0m` and `R$ 0,00`? | **Yes** — it renders whenever the labels render | Clause **D**, and lesson **047**: a disclosure gated on a figure being non-zero is unreachable in the state a first-time reader meets. Confirmed by ST-C, where the labels render and the money does not |
| Does the reader need to be told the **120-minute** boundary is an assumption, or only the two rates? | **Both** | § Scope 2. **L6 settles it** |
| Where does this spec's slot sit relative to `0012`'s `W1`? | **Undecided, and named as undecided** | `0012`'s `design.md` is the unedited template. **AC10** forces the reconciliation at G4 rather than letting two specs each assume the other moved |
| Is a rate the user typed and `localStorage` restored still an app assumption? | **No** — T2 excludes it | The user supplied it. **L12 may overturn this**, and it is the one clause of T2 that a later member could turn on |
