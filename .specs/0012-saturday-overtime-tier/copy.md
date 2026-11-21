# 0012 — Copy

> Owner: content-writer · Gate: `copy` · Run 1 · Written against `legal.md` §9–§10 (`labor-law-analyst`,
> `pass`, run 1). `design.md` was still the template stub when this file was written — both halves of
> G3 run in parallel. No budget window exists yet in `design.md` § *Copy constraints*; every count
> below is a **measured character count of the delivered string**, not a fit against a window, and
> is flagged as such rather than guessed at.

**One string ships from this gate.** `legal.md` §9.1 finds exactly one surface —
`components/organisms/day-summary.tsx`, one call site — and exactly one new obligation on it: the
disclosure §9/§10 require and R6 found nowhere in the tree. No other copy in this spec's scope
changes: the footer stays as written (§10 ruling L5, "no edit is owed to it on legal grounds"), the
`Extra {rate}%` labels are untouched (finding L-2, relocated to its own spec), and the DSR caption at
`:233-236` is untouched (its claim about Súmula 172 and the domingo count stays true after the
correction, per `legal.md` §7).

---

## Voice notes

Nothing here departs from the shipped tone, and the reasons are worth stating because the trap this
spec names is a voice trap as much as a content one.

1. **The screen states a fact about itself, never a fact about the reader's employer.** The gap is
   that the app does not know whether *this* domingo or feriado was compensated — it is not a claim
   that the reader's employer failed to grant a folga. Register matches the shipped DSR caption two
   lines below it (`:233-236`), which states what the DSR formula assumes, not what the reader's pay
   stub says.
2. **No deixis to a sibling element** (lesson **049**). `legal.md` §9.2 puts this disclosure in **S2**
   as well as **S3** — the state where both tier rows render `R$ 0,00` and the DSR row is absent
   entirely. A string that said *"o valor abaixo não considera…"* would point at `R$ 0,00` in S2 and
   at nothing at all if a reviewer read it before the DSR row mounted. The subject is named instead:
   *as horas extras desta tela*.
3. **The subject the routing note asked me not to write.** `team-lead`'s brief for this gate is
   explicit: no sentence whose subject is *o fim de semana* or that says weekend work is "no longer
   doubled". After the correction, no figure on this screen reads the weekday at all, so a sentence
   with that subject describes a rule that will not exist. Every sentence below is about *a day's
   overtime, whichever day it falls on* — never about Saturday or Sunday as a class getting or losing
   a rate.
4. **Súmula 146 is cited for what §10 says it is a rule about — the whole day's work — never for the
   tier split.** `legal.md`'s own decisions log amended its earlier reading precisely because the
   súmula's subject is *o trabalho prestado*, not the excess hours. Nothing below attributes the
   50%/100% split, or any part of it, to Súmula 146; the citation appears only beside the dobra
   claim, which is the one thing that súmula actually governs.
5. **No hedge, no detection claim, no advice.** `legal.md` §10's forbidden list is read as a floor, not
   a target: no *aproximadamente*, no *estimativa*, no sentence implying the app tells whether a given
   day *was* a domingo trabalhado or a feriado, no sentence telling the reader what to do about the
   result (`PRODUCT.md` §7).
6. **Register stays impersonal**, matching every disclosure already shipped in this component tree
   (`day-summary.tsx:159`, `:234`; `calculator-views.tsx:79-91`; `salary-calculator.tsx:116`, `:133`,
   `:150`). None of those sentences uses *nós* or *nosso*; the subject is always the screen, the
   calculation, or the law. This string keeps that register — *"esta tela não calcula"*, not *"nós não
   calculamos"*.

---

## Guard checked before this file was written

`__tests__/copy-guards.test.ts:67-75` — **no user-visible em dash or en dash survives** in any
`.tsx?` under `app`, `components`, `lib`. It is not scoped to a descriptor list; it walks every
source line that is not a comment. The first draft of the string below used an em dash
(`— sábado, domingo ou dia útil`) and would have shipped a violation the moment `frontend-dev` pasted
it into `day-summary.tsx`. Rewritten with a colon before this file was closed — see § *Rejected
phrasings*. Verified on the string as delivered: `python3 -c "import re; print(re.search(r'[—–]', s))"`
→ `None`, on both sentences and on the concatenation.

The other three guards in that file (`compensaç…` ban, `saldo` scoping, night-premium completeness)
read only `DESCRIPTOR_SOURCES` (`app/page.tsx`, the two root image routes, `lib/og-image.tsx`,
`lib/calculator-view.ts`) — none of which this spec touches — so they do not apply here. Recorded so
the next reviewer does not have to re-derive that they are inapplicable rather than passing.

---

## Strings

### `day-summary.tsx` — variable-pay block, new disclosure

| | Text | Chars |
|---|---|---|
| pt-BR | As horas extras desta tela valem o mesmo em qualquer dia da semana: sábado, domingo ou dia útil. Por lei, domingo ou feriado não compensado por folga é pago em dobro (Súmula 146 do TST; art. 9º da Lei 605/49), mas esta tela não calcula essa dobra: ela não pergunta se houve folga compensatória e não tem calendário de feriados. | **327** |

- **Constraint:** none in `design.md` yet (still the template stub at this run). Measured, not fit:
  **327 characters total**, split at the sentence boundary into **96** (first sentence) and **230**
  (second and third sentences, joined by *"mas"*). If `product-designer` needs two `<p>` elements
  instead of one, the 96/230 split is the only grammatical break point — see § *Handoff*.
- **Evidence:** `legal.md` §5.4 and §6.1 (the ruling this sentence states), §9.1–§9.2 (the surface and
  the two states it must render in), §10 C1/C2/C3 (the three assertions), §4.2 N16/N17 (the norms
  named).
- **Renders in:** `legal.md` §9.2 states **S2** and **S3** — every state where `grossHourlyRate !==
  null`, i.e. wherever the two tier-pay rows render, whether their value is `R$ 0,00` or a computed
  figure. **Not** gated on `restDayPay > 0` — that is the DSR row's own condition (`:221`, `:232`),
  and this string's subject exists in S2 where that row is absent. Recorded per lesson **049**'s "how
  to verify": the string names *as horas extras desta tela*, which exists in both S2 and S3, and
  contains no reference to any sibling element, row, or figure.
- **Does not render in:** **S1** — `grossHourlyRate === null`, the state where the "Quer ver quanto
  isso vale em reais?" link renders instead of any money. Exempt per `legal.md` §9.2: the sentence's
  subject is money derived from overtime, and none renders.

**Sentence-by-sentence trace, so a reviewer can check each clause against its own line of
`legal.md` without re-deriving the mapping:**

| Clause | What it asserts | Trace |
|---|---|---|
| *"As horas extras desta tela valem o mesmo em qualquer dia da semana: sábado, domingo ou dia útil."* | **C1** — the screen prices every day by the hours typed, no difference between a sábado, a domingo and a dia útil | `legal.md` §5.4 (L1 ruling — no weekday operand), §6.1 (L2/L3 ruling — Sunday takes the identical split), §10 C1 |
| *"Por lei, domingo ou feriado não compensado por folga é pago em dobro"* | **C2**, first half — trabalho em domingo ou feriado não compensado por folga é pago em dobro | `legal.md` §4.2 N17 (Súmula 146 do TST) and N16 (Lei 605/49 art. 9º, feriados only), §10 C2. *"não compensado"* sits directly after *"domingo ou feriado"*, in the same clause, per §10's placement rule |
| *"(Súmula 146 do TST; art. 9º da Lei 605/49)"* | the source of the dobra claim, restricted to the case it covers | `legal.md` §4.2 N16/N17. Format follows the shipped convention — norm name after the fact it supports, "do"/"da" before the body — matching `day-summary.tsx:234` (*"Súmula 172 do TST"*) and `salary-calculator.tsx:116` (*"art. 1º da Lei 605/49"*) |
| *"mas esta tela não calcula essa dobra"* | **C2**, second half — esta tela não calcula essa dobra | `legal.md` §6.1 ruling ("the dobra is not computed and is disclosed"), §10 C2 |
| *"ela não pergunta se houve folga compensatória e não tem calendário de feriados"* | **C3** — the reason: the app does not ask about a folga compensatória and does not carry a calendário de feriados | `legal.md` §6.1 ("a fact the app has never collected and will not collect"; "a fact the product refuses to hold"), `PRODUCT.md` §5 and §7, `legal.md` §10 C3 |

---

## Disclosures

`legal.md` §9/§10 raise one obligation on this spec (**L4**/**L5**, discharged as **W1**/**W9**).
This is its full discharge — content, placement intent, and rendering condition.

| Obligation | Discharged by | Where |
|---|---|---|
| **C1** — no weekday operand, stated as a fact the user cannot infer | first sentence, above | new `<p>` in the variable-pay block |
| **C2** — the dobra rule and its non-computation, in one clause with *"não compensado"* adjacent to *domingo/feriado* | second and third clauses, above | same `<p>` |
| **C3** — the reason: two uncollected facts | fourth clause, above | same `<p>` |
| **W1** (presence, substance) | renders in S2 and S3, per § *Strings* above | — |
| **W6** (modality) | plain rendered text, no `sr-only`, no `aria-label`, no tooltip — the string is written as body copy, not as an attribute value | — |
| **W7** (order) | intended to sit **after** the extra-tier row (`:201-210`) in document order, matching `legal.md`'s measured precedent for the sibling DSR caption. Placement itself is `product-designer`'s call | — |

**Not discharged here, and why not:** **W2**–**W5** (space, time, size, measure) are rendering
geometry — `getBoundingClientRect`, `opacity`, timing, line count — and are `product-designer`'s and
`frontend-dev`'s to satisfy against the string above, not content's to assert. **W8** (operability) is
moot for this string: it carries no control, per its own text, so the clause stays open per
`legal.md`'s own note until a control is added, which nothing here adds.

**What the footer keeps doing, unedited.** `calculator-views.tsx:82-87`'s *"Não entram na conta:
FGTS, … feriados, …"* stays exactly as shipped. `legal.md` §9.6 rules it insufficient **for this
number** but not wrong, and rules that the new sentence must not be *the same sentence* printed
twice. It is not: the footer names *feriados* once in a list of omissions; the string above names the
domingo/feriado dobra rule, states that this screen does not compute it, and states why. Two
different sentences about two overlapping but distinct gaps.

---

## Error and empty states

**This spec adds no new user input and no new error state.** `spec.md` § *Inputs and defaults* states
this explicitly, and it is restated here so the absence is not read as an omission (`PRODUCT.md` §5).
The one state this spec's own disclosure interacts with is **S1** — no salário informado — and that
state is unchanged: it still renders the shipped

> *"Quer ver quanto isso vale em reais? Calcule o valor da sua hora →"*

link (`day-summary.tsx:239-247`), and the new disclosure does not render there, per § *Strings* above
(no money derived from overtime exists to disclose anything about).

No existing error state — the inverted time range, the 11h-interregno violation, or any other input
this app already refuses — is touched by this spec's scope, and none of their strings are rewritten
here.

---

## Numbers and units

- **No currency figure, no percentage, and no hour/minute value appears in the new string.** It
  states a rule and a reason, not a number, so `formatCurrency` and `formatHoursAndMinutes` are
  untouched by this gate.
- **No table year applies.** `legal.md` §12.4 states explicitly that this feature "introduces no
  monetary table and changes no value in `lib/legal-tables.ts`" — every constant behind this string
  is fixed by lei or by súmula, not by a yearly portaria, so it does not belong to `LEGAL_YEARS` and
  carries no year. `PRODUCT.md` §4's *"the year is part of the answer"* is discharged, as it already
  is for every other CLT/TST citation on this screen (`art. 73 da CLT`, `Súmula 172 do TST`), by the
  **norm name**, not by a date. This mirrors the precedent recorded in `.specs/0007-…/copy.md` §
  *Numbers, units and interpolation* for the same class of constant.
- **Norm citation format.** *"Súmula 146 do TST"*, *"art. 9º da Lei 605/49"* — matches the shipped
  convention (no *"nº"*, short year form, article before the law's short name, joined with *"da"*),
  verified against `day-summary.tsx:159`, `:234`, `salary-calculator.tsx:116`, `:133`, `:150`.
- **No figure this spec changes gets a new format.** `firstTierPay`, `extraTierPay` and `restDayPay`
  keep `formatCurrency`'s existing `Intl.NumberFormat("pt-BR", …)` rendering — `legal.md` §12.2 binds
  the rounding, and nothing here proposes a different display rule.

---

## Metadata

**Not touched.** This spec changes no title, description, or manifest string. `app/layout.tsx` and
`app/manifest.ts` are outside its scope and outside R2–R6's search results.

---

## Rejected phrasings

| Considered | Why it lost |
|---|---|
| `As horas extras desta tela valem o mesmo em qualquer dia da semana — sábado, domingo ou dia útil.` (em dash) | **Guard failure.** `__tests__/copy-guards.test.ts` bans `—`/`–` in any `.tsx?` under `app`/`components`/`lib`. Rewritten with a colon before this file closed; see § *Guard checked before this file was written* |
| `Domingos e feriados podem ser pagos em dobro.` | This is `legal.md` §10's own worked example of a **failing** string: every word permitted, and it states neither that the screen ignores the weekday (C1) nor that the dobra is not computed here (the second half of C2). Quoted in `legal.md` as the proof those two clauses are load-bearing |
| `Domingo e feriado são pagos em dobro, exceto se compensados.` | Detaches *"não compensado"* from *domingo/feriado* into a trailing exception clause. `legal.md` §10: *"Detached … the string asserts an unconditional doubling rule that N17 does not state, and it survives every forbidden-word list."* Exactly the trap named |
| `O valor abaixo não considera fins de semana.` | Deixis (*abaixo*) with no reliable referent: in **S2** the figure "below" is `R$ 0,00` and the DSR row has not mounted at all. Lesson **049** — name the subject, do not point at it |
| `Nós não perguntamos se houve folga nem sabemos se é feriado hoje.` | First-person voice. Every shipped disclosure on this screen and its neighbours (`day-summary.tsx:234`, `calculator-views.tsx:79-91`, `salary-calculator.tsx:116`) is impersonal — *"esta tela"*, *"a conta"*, never *"nós"*. Also weaker on C3: it drifts toward "we didn't check today", when the claim is structural — the app never asks and never carries a calendar, not just today |
| `As horas extras deste fim de semana não são mais dobradas.` | **Named as a specific trap by the routing brief.** Its subject is *o fim de semana* and it describes weekend overtime specifically getting or losing a rate. After the correction no figure reads the weekday at all — there is no rule about "o fim de semana" left to describe, doubled or not |
| `Domingo e feriado trabalhados podem valer o dobro, segundo a Súmula 146 do TST.` | Attributes the tier split, or something adjacent to it, to Súmula 146. `legal.md`'s own decisions log amended this exact error: N17's subject is *o trabalho prestado*, the whole day, never the excess hours the tier split works on. This phrasing reads as though 146 is about the rate this screen pays, and it is not |
| `Esta tela usa uma estimativa para domingos e feriados.` | Hedge standing in for naming the gap. `PRODUCT.md` §4 — *cite or omit* — and `legal.md` §10's explicit ban on *estimativa* as a stand-in |
| `Se você não teve folga, procure o RH ou seu sindicato para calcular a diferença.` | Tells the reader what to do about the result. `PRODUCT.md` §7 — no legal advice. The app computes and cites; it does not counsel |
| `sem dobra para nenhum deles` as a clause added to the first sentence (327 → 347 earlier draft) | Redundant with the third clause (*"esta tela não calcula essa dobra"*) and, worse, front-loads a negation of a rule the reader has not been told about yet — a reader meets *"no doubling for any of them"* before meeting the rule it is negating. Cut without losing any of C1/C2/C3 |

---

## Checks

- [x] Every string is pt-BR — there is no i18n layer and the string lives in `day-summary.tsx`, not
      in any `locales/` structure
- [x] It reads as a native original, written for a worker who is not a lawyer — *"folga"*, *"dobro"*,
      *"feriado"* are plain words; the two norm names are provenance in parentheses, not a
      comprehension requirement (`AGENTS.md` §1)
- [x] Every legal claim traces to a passage of `legal.md` — table in § *Strings*, one row per clause
- [x] Every literal a test depends on verbatim is listed, with its `file:line` — **none yet**: this
      string is new and no test in the repository asserts it today. `tech-lead`/`frontend-dev` write
      the assertion at G4/G5 against the exact text above, not a paraphrase
- [x] No em dash / en dash in the delivered string — verified against `__tests__/copy-guards.test.ts`
      before this file closed

---

## Handoff

- **`product-designer`** — one new `<p>` in `day-summary.tsx`'s variable-pay block, sibling to (not
  replacing) the existing DSR caption at `:232-237`. It must render whenever `grossHourlyRate !==
  null` — **not** gated on `restDayPay > 0`, which is a narrower condition than this string's own
  rendering states (S2 **and** S3). Measured length: **327** characters as one sentence group, with a
  natural break at **96 / 230** if two `<p>` elements are needed instead of one. No budget exists yet
  to reconcile against; this count is the thing to reconcile `design.md` § *Copy constraints* against
  once it is written, not the other way around.
- **`tech-lead`** — the string replaces nothing; it is new. The DSR caption at `:233-236` and the
  footer at `calculator-views.tsx:82-87` are both **unchanged** and neither is a candidate for holding
  this text — `legal.md` §9.6 rules a second slot required, and the two existing strings stay exactly
  as shipped.
- **`labor-law-analyst`**, if either half of G3 needs to reopen it — the citation format question
  (§ *Numbers and units*) and the placement of *"não compensado"* (§ *Strings* table) are both settled
  against §10 directly; nothing here reinterprets the ruling.
