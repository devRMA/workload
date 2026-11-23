# 0007 — Copy

> **Run 2 — narrow amendment. Two strings move and nothing else in this file does.** `legal.md`
> § *Run 3 — addendum A* rules **D4 unconditional**: its subject is the **salário-hora the user acts
> on**, not the divisor the app derives, so it renders in **all five states** of the Salário panel,
> including the silent-agreement state, **exactly once per state**. `D-4` is therefore rewritten
> without the deixis *"o divisor acima"*, which has no referent where no divisor banner renders, and
> it **leaves both banner bodies** (§ *Disclosures*, § *Slots and budgets*). `F-1` is shortened from
> 27 to **16** characters per `STATUS.md` **D-F1**, recommendation (1), keeping the *trabalhados*
> sense the addendum binds. Everything else below — `A-3`, `B-2`, `B-3`, `D-1`, `N-40`/`N-6`/`N-5`,
> `C-1`…`C-4`, the README row and the `PRODUCT.md` §9 proposal — is **unchanged at run 2**.
>
> Owner: content-writer · Gate: `copy` · **Run 1** · Written against `legal.md` § *Run 3*, which
> supersedes `spec.md` § *Disclosure obligations* wherever the two differ (**D5 retired, D6
> restated**). Runs in parallel with `design.md`; § *Slots and budgets* records what is reconciled
> and what is still owed by G3's other half.

**The template deviation, recorded once.** `.specs/templates/copy.md` carries an `en` row per string
and a parity checklist over `locales/en.ts` / `locales/pt-BR.ts`. **This product has no i18n layer
and none is planned** (`AGENTS.md` §1, `PRODUCT.md` §7 — *No English*), and no `locales/` directory
exists in this tree (`ls locales` → `No such file or directory`). The template's bilingual columns
are therefore dropped and replaced by the trace column this project's gates actually check. The
template is stale, not this file; noted in `STATUS.md` § *Decisions log*.

---

## Voice notes

Nothing here departs from the shipped tone, and that is deliberate: the sentences this spec rewrites
sit beside sentences it does not touch, in the same banner, on the same screen.

Three things are specific to this feature and are worth stating because they are easy to lose:

1. **The app is declining, not accusing.** In both refusal states (§ *Refusal states*) the user has
   typed something the app will not price. The sentence says what the numbers add up to, what the
   limit is, and which field to look at. It never says "inválido", "erro", "você errou" or
   "corrija" — the declared week may well be the week the user actually works, and the defect would
   then be their employer's, which is not this screen's to allege (`PRODUCT.md` §7, *no legal
   advice*).
2. **Nothing tells the user what to do about a result.** "Revise a jornada diária" points at a field
   on this screen; it is navigation, not counsel. There is no "procure o seu sindicato", no "cobre a
   diferença", no "você tem direito a".
3. **The entitlement framing is gone.** The shipped sentence *"Usar um divisor maior do que o devido
   reduz o valor de cada hora sua"* is deleted and not replaced by a softer version of itself. On the
   `12h00` state it argued a worker from R$ 13,64 toward R$ 10,00 (`legal.md` § *Worked example E5*),
   and the words *o devido* claim an entitlement the app cannot establish without knowing the user's
   category. What replaces it is a fact about the screen: **`B-3`**, *"Os valores desta tela usam a
   carga que você informou."*

**Em-dash:** none of the strings below contains `—` or `–`. Verified by the destination's own guard
(§ *Guards run against these strings*).

---

## Slots and budgets

`design.md` was still the template stub when this file was written (both halves of G3 run in
parallel). Every count below is **measured in characters**, stated per string, and reconciled
against `design.md` § *Copy constraints* before this gate closes. A message with the slot list, the
control choice for the new field and the divisor's rendered format went to `product-designer` at the
start of this run.

**Two questions are the designer's and are not answered here:**

- The **rendered format of the divisor value** (`220,00` vs `220`). `legal.md` § *Run 3 — rounding*
  binds only the **comma**, caps it at two decimals, and forbids a new formatter — `AMOUNT_FORMATTER`
  at `lib/utils.ts:48` renders `220,00` and `183,33`. Every count below assumes `AMOUNT_FORMATTER`,
  which is the longest of the permitted renderings; a shorter one only buys slack.
- Whether the four sentences of surface **B** are four paragraphs, a list, or one block.

**The measured cost of the two banners, before and after**, because this is the number
`product-designer` needs first and `AC15`/`AC16` are written against it. Bodies only, at the worked
state named, characters:

| Banner | Shipped body | After (**run 2**) | Delta | What the growth is |
|---|---|---|---|---|
| **A** — carga mensal vazia (`:136-139`) | **111** | **277** (`A-2` 49 + `A-3` 108 + `D-1` 120) | +166 | D1, which this surface has never carried and which `legal.md` § *Run 3 — what G6 will check*, item 4, requires on **both** divisor surfaces |
| **B** — divisor incoerente (`:150-154`) | **177** | **309** (`B-2` 136 + `B-3` 53 + `D-1` 120) | +132 | idem |

**Run 1 measured these at 489 and 521**, with `D-4`'s 212 characters inside each body. Under
`legal.md` § *Run 3 — addendum A*, clause 3, D4 renders **exactly once per state** and therefore
leaves both bodies: **−212 characters from each**. The addendum prices the same move at **−42 px**
returned to R3 and R4, against **≈ +95 px** for the permanent slot — `product-designer` re-measures
both against the delivered string, which is still **212** characters and **5** caption lines at
46 cpl, not 3.

**The two never render together.** Surface A fires at `monthlyHours <= 0` (`:129`) and surface B
requires `monthlyHours > 0` (`lib/salary-period.ts:47`), so the worst banner case is one body of
309 characters, not 586 — plus D-4's 212 in the permanent slot, in that state and in every other.

**If a string below overflows its slot, the cut is a gate decision routed through `tech-lead`**, not
a developer's trim and not a designer's ellipsis: every sentence in §§ *Disclosures* and *Refusal
states* carries a clause `legal.md` requires, and § *What is legally irreducible in each string*
names which clause dies first if the budget cannot hold it.

---

## Numbers, units and interpolation

| Quantity | Form in the copy | Rule |
|---|---|---|
| **Jornada diária** | `8h48`, `7h20`, `12h00`, `6h00` — always `{h}h{mm}`, minutes always two digits | The form the shipped sentence at `salary-calculator.tsx:137` already uses. Never `08:48` inside a sentence; the `:` form belongs to the input, not to prose |
| **Dias por semana** | the integer, then `dia` at `1` and `dias` at `2`–`6` | § *Interpolation rules* |
| **Divisor** | pt-BR decimal comma, at most two decimals, through `AMOUNT_FORMATTER` (`lib/utils.ts:48`): `220,00`, `183,33`. **Never `183.33`** | `legal.md` § *Run 3 — rounding*; `legal.md` F2; `spec.md` N3/AC7 |
| **Carga horária mensal declarada** | same formatter as the divisor, so the two numbers in `B-2` read alike | Consistency inside one sentence; the designer confirms |
| **Horas semanais** (refusals only) | pt-BR comma: `52,8 horas semanais`, `60 horas semanais` | Same rule. The refusals state the product of the two operands, which `legal.md` R7 requires the surface to say |
| **Currency** | unchanged — `formatCurrency` | Not touched by this spec |
| **Percentages** | none appear in any string this spec adds or changes | — |

**The year of a table.** No string in this spec derives a number from a table in `LEGAL_YEARS`.
`legal.md` § *Run 3 — the constants* states it explicitly: *"Every value below is norm-fixed and
year-independent — none of them belongs to `LEGAL_YEARS`, because none has ever been changed by a
portaria."* `PRODUCT.md` §4's *the year is part of the answer* is therefore discharged here by the
**norm name** (`art. 64 da CLT`, `Súmula 431 do TST`), which is how every other CLT citation in this
repository is written (`salary-calculator.tsx:86`, `journey-form.tsx:142`, `day-summary.tsx:159`).
No year is added to any string, and no fiscal string that already carries one is touched.

### Interpolation rules — binding on `frontend-dev`

1. **Both operands are always values, never words.** `legal.md` D6: *"the same sentence names both
   operands it was computed from — the jornada diária and the dias por semana — as values, not as
   concepts"*, *"in every state"*. There is no state, defaulted or edited, in which the sentence
   renders a fixed `5`, the word *padrão*, or the day count omitted.
2. **Singular at one day.** `em 1 dia por semana`, `em 2 dias por semana` … `em 6 dias por semana`.
   A template that always writes `dias` ships `em 1 dias por semana`.
3. **The norm clause is selected by the declared operands**, per `legal.md` § *Run 3 — order of
   operations*, step 5. The three variants are `N-40`, `N-6` and `N-5` in § *Strings*.
4. **Never say "5 é um padrão".** `legal.md` § *Run 3 — L11*: *"saying '5 é um padrão' would
   disclose the wrong thing — the user does not need to know the app has defaults; they need to know
   which number produced the figure they are reading."* Rule 1 is what discharges that, and it
   discharges it in every state instead of in one.

---

## Strings

Every line number is read from the working tree at this gate, not copied from an earlier artifact
(`AGENTS.md` §5). `components/organisms/salary-calculator.tsx` is at 253 lines; the coordinates
below were produced by `grep -n` at this run and are listed in § *Guards run against these strings*.

**Interpolated slots are written `{jornada}`, `{dias}`, `{divisor}`, `{carga}`, `{semanais}`.**
Character counts are of the **rendered** string in its worked state, with the state named, because a
template's length is not a length.

### The new field

| Id | Slot | pt-BR | Chars | Replaces | Trace |
|---|---|---|---|---|---|
| **F-1** | `salary-calculator.tsx` → `Field label`, the new control in the input grid (`:91-121`) | `Dias Trabalhados` | **16** | nothing — new. Sits in the grid beside `Carga Horária Mensal` (`:102`, 20 ch) and `Jornada Diária` (`:115`, 14 ch); `product-designer` owns which cell | `spec.md` § *In scope* 1 (H2); `legal.md` R6 § *Domain of the collected operand*; `legal.md` § *Run 3 — addendum A*, § *D-F1* |

**Run 2 — why 16 and not 27, and what the 11 characters cost.** `STATUS.md` **D-F1** measures the
column at **19 characters** per `--text-label` line; `Dias Trabalhados por Semana` (27) wrapped and
pushed its own control 17.5 px below the jornada's, so two controls that are one answer stopped
reading as one row. The addendum leaves the choice of label to this gate and binds one clause only:
the operand is *dias de **trabalho** por semana* (CLT art. 64, parágrafo único), so a label that can
be read as *days the week has* — whose answer is 7 — names a different quantity. **`Dias por Semana`
(15) admits that reading and is rejected for it; `Dias Trabalhados` (16) does not.**

What 16 drops is the **period**, not the *trabalhados* sense, and the period is recovered on the same
screen in two places, neither of them a new string:

- `A-3`/`B-2` render *"em {dias} dias por semana"* directly under the grid, with the prefilled value
  already in them, so the period is read as a value before the user touches the field;
- a monthly answer (`22`, `25`) is **refused, not absorbed** — `C-3` fires above 6 and says
  *"o máximo aqui é 6 dias"*, which names the period's consequence at the moment it is reached.

**No hint is added to recover it** — § *The new field* holds that decision, `design.md` prices a hint
at a line of the scarcest area on the screen, and this run moves two strings.

**No hint, and that is a decision, not an omission.** `Field` supports one (`components/molecules/field.tsx:9`) and the sibling `Jornada Diária` uses it (`:116`, *"A mesma jornada diária usada na aba Jornada."*) because that field is shared with another tab and the user cannot see why. This field has no such hidden behaviour: the label is the whole question, and a worker answers it without knowing what a divisor is, which is the bar `spec.md` § *In scope* 1 sets. A hint would spend a line of the scarcest area this product has (`spec.md` § *What the field costs*; `0010`'s measurement) to restate the label. The three things a hint might have carried are each placed where they are load-bearing instead:

- *what happens above 6 days* → **`C-3`**, at the moment it happens;
- *what the number is used for* → **`A-3`/`B-2`**, which name it as a value in the same sentence as the divisor (D6);
- *that 5 is only a default* → **forbidden** by `legal.md` § *Run 3 — L11*, and discharged by interpolation rule 1.

**Title Case is the shipped convention** for every label in this grid — `Salário Bruto (R$)`, `Regime de Trabalho`, `Carga Horária Mensal`, `Jornada Diária`. `F-1` follows it.

### The divisor sentence — D6, in both surfaces

The norm clause is a suffix selected by the declared operands. It is written as three strings
because it is three claims, each with its own coverage.

| Id | Condition | pt-BR clause | Chars | Trace |
|---|---|---|---|---|
| **N-40** | `horas semanais = 40` | `(Súmula 431 do TST, para a semana de 40 horas)` | **46** | `legal.md` R1; step 5; **D3** — the scope word sits beside the norm name, not in a sibling clause (lesson 004) |
| **N-6** | `dias = 6` | `(art. 64, caput, da CLT)` | **24** | `legal.md` R6; step 5 |
| **N-5** | `dias < 6` and not `N-40` | `(art. 64, parágrafo único, da CLT)` | **34** | `legal.md` R6; step 5 |

### Surface A — the banner shown when the carga mensal is empty

`components/organisms/salary-calculator.tsx:129-141`, `AlertBanner tone="danger"` → `role="alert"`.

| Id | Slot | pt-BR | Chars | Replaces | Trace |
|---|---|---|---|---|---|
| **A-1** | banner `title` | `Informe a carga horária mensal` | **30** | `:133` — **unchanged**, and tested as a claim in § *Strings tested and left unchanged* | — |
| **A-2** | body, first sentence | `Sem ela não dá para saber quanto vale a sua hora.` | **49** | first sentence of `:137` — **unchanged** | — |
| **A-3** | body, second sentence | `Para {jornada} por dia em {dias} dias por semana, o divisor é {divisor} horas por mês {norma}.` | **108** at `8h48 / 5 / 220,00 / N-5` · **120** at `8h00 / 5 / 200,00 / N-40` · **98** at `7h20 / 6 / 220,00 / N-6` | second sentence of `:137-138`, *"Para a jornada de 8h48 por dia o divisor é 220 horas por mês."* — the string `legal.md` § *Run 3 — L11* names as a clause-B assertion with the day count missing and no norm | **D6** (both operands as values), **D2** (satisfied in the same clause, `legal.md` D6 row), **D3** via `N-40`/`N-6`/`N-5`; `legal.md` R6 for the value |
| **A-4** | ~~body, third sentence~~ — **withdrawn at run 2** | **D-4 does not render in this body.** It renders once per state, in the panel's permanent slot | — | — | `legal.md` § *Run 3 — addendum A*, rendering condition clause 3: *"the same 212-character sentence printed twice in one state is the fastest way to train a reader past it"* |
| **A-5** | body, third sentence | see **D-1** below | **120** | new | `legal.md` **D1** |

### Surface B — the mismatch warning

`components/organisms/salary-calculator.tsx:143-156`, `AlertBanner tone="warning"` → `role="status"`.
This is the surface `legal.md` § *W* measured and the one the G2 verdict rests on.

| Id | Slot | pt-BR | Chars | Replaces | Trace |
|---|---|---|---|---|---|
| **B-1** | banner `title` | `A carga mensal não combina com a sua semana` | **43** | `:147`, *"A carga mensal não combina com a jornada diária"* (46) | The comparison now has two declared operands, not one. *Sua semana* is `jornada × dias`, both of them the user's own declaration — `legal.md` § *Run 3 — order of operations*, steps 1 and 4 |
| **B-2** | body, first sentence | `Para {jornada} por dia em {dias} dias por semana, o divisor é {divisor} horas por mês {norma}. Você informou {carga} horas.` | **136** at `7h20 / 5 / 183,33 / N-5 / 220,00` (worked example E4) | `:151-152`, *"Pela Súmula 431 do TST, a jornada que você informou corresponde ao divisor {X} horas por mês, e não {Y}."* | **D6**, **D2**, **D3**; `legal.md` R6; E4 for the value. *"e não"* is dropped: it framed the user's own declaration as the wrong one |
| **B-3** | body, second sentence | `Os valores desta tela usam a carga que você informou.` | **53** | `:152-153`, *"Usar um divisor maior do que o devido reduz o valor de cada hora sua."* | `legal.md` § *Run 3 — order of operations*, **step 6**: *"salário-hora = salário mensal ÷ carga horária mensal declarada… The divisor is a check on the carga the user declared; it is not the denominator of the money on screen."* |
| **B-4** | ~~body, third sentence~~ — **withdrawn at run 2** | **D-4 does not render in this body.** Same ruling as `A-4` | — | — | `legal.md` § *Run 3 — addendum A*, rendering condition clause 3 |
| **B-5** | body, third sentence | see **D-1** below | **120** | new | `legal.md` **D1** |

**Sentence order in both surfaces, as amended at run 2: the divisor sentence, then the screen's own
behaviour (B only), then D1 — and the banner ends there.** D4 leaves both bodies under the
addendum's non-duplication clause and renders once, in the panel's permanent slot, which
`product-designer` places relative to the salário-hora rather than to either banner.

**Run 1's ordering argument is retired with the sentence that needed it.** It read: *"`B-3` must
precede `B-4`, not follow it: after 'o divisor acima não vale para você', a sentence about which
number the screen used reads as a correction of the sentence before it."* Neither the deixis nor the
adjacency exists now — `B-3` and `D-4` no longer sit in the same block — and the run-2 `D-4` says
what the screen's number is *not*, which cannot be read as a correction of a sentence it never
follows.

---

## Disclosures

`legal.md` § *Run 3 — disclosures, final state* is the inherited table. Six rows: **D1–D4 stand,
D5 is retired, D6 is restated as a rule about the sentence.** Each is discharged below, with the
string and the slot.

| # | How it is discharged | String | Where it renders |
|---|---|---|---|
| **D1** | Its own sentence, **D-1** | `Uma convenção ou acordo coletivo pode estabelecer outra jornada (art. 611-A, I, da CLT), e esta tela não tem como saber.` — **120 ch** | `A-5` and `B-5`, last sentence of each banner |
| **D2** | **In D6's clause, by the law gate's own ruling.** `legal.md` D2 row: *"stands, **and D6 satisfies it in the same clause**"*. `A-3`/`B-2` name the day count as a value beside the divisor and cite `art. 64`, which is the article that makes the divisor depend on it | no separate string | `A-3`, `B-2` |
| **D3** | The norm clause carries its coverage adjacent to the norm name: `N-40` = *"Súmula 431 do TST, para a semana de 40 horas"*; `N-6`/`N-5` name the article whose own operands the sentence has just stated | `N-40`, `N-6`, `N-5` | inside `A-3`, `B-2` |
| **D4** | Its own sentence, **D-4**, **rewritten at run 2** | `Bancário, turno ininterrupto de revezamento e escala 12x36 têm divisor próprio, fixado por norma da categoria (Súmula 124 e OJ 396 do TST, art. 59-A da CLT). Se for o seu caso, o valor da hora nesta tela é outro.` — **212 ch** | **One permanent slot in the Salário panel, in the same card as the salário-hora, reachable with no interaction in all five states — and therefore *not* in either banner body.** `legal.md` § *Run 3 — addendum A*, rendering condition clauses 1–3; never in a collapsed panel (lesson 018). `product-designer` owns the slot |
| **D5** | **Retired at G2 run 3.** Nothing written, nothing placed | none | — |
| **D6** | § *Interpolation rules* 1 and 2, binding on every surface that states a divisor | `A-3`, `B-2` | both surfaces |

### D-4, the sentence the whole spec turns on — **rewritten at run 2**

> `Bancário, turno ininterrupto de revezamento e escala 12x36 têm divisor próprio, fixado por norma da categoria (Súmula 124 e OJ 396 do TST, art. 59-A da CLT). Se for o seu caso, o valor da hora nesta tela é outro.`

**212 characters** (`[...s].length`, counted at this gate on the delivered string, accents composed).
At the caption measure `design.md` states — **46 characters per line** — that is `212 ÷ 46 = 4,61` →
**5 rendered lines**, which is the number `product-designer` re-measures against, not 3.

**One string, all five states.** Trace: `legal.md` **D4**, **R8**, § *Run 3 — known imprecisions*
row 1 — the 6 h bancário over 5 days reads **R$ 20,00** here where Súmula 124, I, *a* gives
**R$ 16,67**, +20,0% — and `legal.md` § *Run 3 — addendum A*, which fixes both its rendering
condition and the six clauses below. `legal.md`: *"If D4 does not ship visible, this becomes a defect
and G6 rejects."*

**What run 1's sentence got wrong, and it was grammar before it was law.** It ended *"o divisor acima
não vale para você"* — a deictic reference to a divisor standing above it. In the **Silence** state
no divisor banner renders, so *acima* points at nothing; and under the addendum D4's subject is no
longer the divisor at all but **the money on this screen**. The replacement names that money
directly: *o valor da hora nesta tela*.

**The six binding clauses of § *Run 3 — addendum A*, each discharged by the delivered string:**

| Clause | Where it lands |
|---|---|
| 1 — one string, used in all five states; not a banner variant plus a permanent variant | This is the only D4 string in this file. `A-4` and `B-4` now **point at it** rather than carry a copy |
| 2 — its subject is the money on this screen, with no deixis to a sibling that may not render | *"o valor da hora nesta tela"*. No *acima*, no *abaixo*, no reference to any element |
| 3 — the three categories keep their norms | *Bancário* (Súmula 124), *turno ininterrupto de revezamento* (OJ 396 do TST), *escala 12x36* (art. 59-A da CLT) — unchanged from run 1 |
| 4 — ≤ 220 characters | **212** |
| 5 — *bancário* in the first eight characters; no *"consulte a sua convenção"*; no *"pode estar errado"* | `Bancário` occupies characters 1–8. Neither forbidden shape appears; § *Rejected phrasings* records why each loses |
| 6 — R7's refusal text is not D4 and does not merge into it | `C-1` is unchanged at run 2 and states art. 59-A on R7b's own terms. D4's 12x36 clause sits beside it and neither absorbs the other |

**Habituation, which the addendum names as the price of ruling D4 unconditional.** The mitigation is
in the shape of the sentence, and it is the only mitigation copy can offer: the three nouns come
first, so a reader who is none of the three has finished with the line by the eighth character and
never reaches the norms. The consequence stays **conditional** — *"se for o seu caso"* — so the
sentence that renders on a correct calculation is visibly not about the person reading it. A sentence
that opened *"O valor da hora nesta tela pode não ser o seu"* would spend the same five lines
telling every correct reader their number is suspect, every time they use the app, which is both the
shape D5 was retired for (`legal.md` § *Run 3 — L9*) and the fastest way to train a reader past a
line that now renders always.

Four things it does, and each one is a constraint on any rewrite:

1. **It leads with the nouns, not with the law.** A bank teller scanning a warning on a phone finds
   the word *Bancário* in the first eight characters. A sentence that opens *"Algumas categorias
   profissionais…"* makes them read to the end before they know it is about them.
2. **It does not teach labour law.** It never says what Súmula 124 fixes, what a divisor is, or why
   the sábado decides it. The norms are named as a source, in one parenthesis, in the form this
   repository already uses.
3. **It does not frighten the correct reader.** The subject is three named categories and the
   consequence is conditional — *"se for o seu caso"*. A worker who is none of the three reads one
   sentence that is visibly not about them. The forbidden shape is *"o valor da hora pode estar
   errado"*, which spends the same space telling every reader their number is suspect —
   `PRODUCT.md` §4 obliges the app to **name** gaps, not to manufacture doubt (the reason `legal.md`
   § *Run 3 — L9* retired D5). **Under the addendum this clause carries more weight than it did at
   run 1**, because the sentence now renders on every correct calculation as well as on every wrong
   one.
4. **It stops at the number.** *"o valor da hora nesta tela é outro"* is where the sentence ends. No
   *"consulte a sua convenção"*, no *"procure o sindicato"*, no *"você pode estar recebendo a
   menos"* — `PRODUCT.md` §7, the app computes and cites and does not advise.

### D-1

> `Uma convenção ou acordo coletivo pode estabelecer outra jornada (art. 611-A, I, da CLT), e esta tela não tem como saber.`

**120 characters.** Trace: `legal.md` **D1**, **R5**; `PRODUCT.md` §7, which forbids the convenção
coletiva database that would let the app know.

The clause *"o divisor vem do que você digitou"* is **not** in it, although `legal.md` D1 states it:
`A-3`/`B-2` open with *"Para {jornada} por dia em {dias} dias por semana"*, which is the user's own
two declarations rendered as values one line above. Writing it again in words would spend 35
characters restating what the reader has just read as numbers. Recorded here because a reviewer
reading D1's row alone would look for it.

---

## Refusal states

`legal.md` **R7** — two clauses, both refusals. The surface **does not render the computed divisor
and does not name Súmula 431 or art. 64 beside it**, and it must say three things: what the declared
operands add up to, what the limit is, and which field to check (`legal.md` R7, *"`content-writer`
owns the words; the three things that must be said are legal content, not copy"*).

**D1, D2, D3 and D6 do not render in either refusal state, and that is a ruling, not an omission.**
All four attach to a rendered divisor; there is none.

**D4 does render here — amended at run 2.** `legal.md` § *Run 3 — addendum A* puts D-4 in all five
states, R1 and R2 included, because its subject is the salário-hora and that number renders whether
or not the divisor check does. It renders from the panel's permanent slot, **not** inside `C-1`'s or
`C-2`'s body, and it does **not** replace R7's own text: `C-1`'s third sentence states art. 59-A as
R7b requires, on R7b's terms, and D-4 names the 12x36 escala as one of three categories with a
divisor of its own. The addendum's clause 6 keeps them separate; `legal.md` § *Run 3 — known
imprecisions* records the pair as *"**D4** + R7b's refusal text"*, which is two strings, not one.
**The refusal strings themselves are unchanged at run 2.**

| Id | Condition | Slot | pt-BR | Chars | Trace |
|---|---|---|---|---|---|
| **C-1t** | `jornada diária > 10h` (R7b), at any day count | banner `title` | `Sem divisor acima de 10 horas por dia` | **37** | `legal.md` R7b; `DAILY_HOURS_CAP = 10` |
| **C-1** | same | banner body | `{jornada} por dia em {dias} dias por semana dá {semanais} horas semanais. A jornada diária não passa de 10 horas (art. 59, §2º, da CLT). Acima disso, só a escala 12x36 do art. 59-A, que esta tela não calcula. Revise a jornada diária.` | **216** at `12h00 / 5 / 60` (worked example E5) | `legal.md` R7b, verbatim CLT art. 59 §2º and art. 59-A; § *Run 3 — the constants* |
| **C-2t** | `horas semanais > 44` and `jornada ≤ 10h` (R7a) | banner `title` | `Sem divisor para esta semana` | **28** | `legal.md` R7a; `WEEKLY_NORMAL_HOURS_CAP = 44` |
| **C-2** | same | banner body | `{jornada} por dia em {dias} dias por semana dá {semanais} horas semanais. A jornada normal vai até 44 horas por semana (art. 7º, XIII, da Constituição), e acima disso não há divisor a conferir. Revise a jornada diária ou os dias por semana.` | **224** at `8h48 / 6 / 52,8` | `legal.md` R7a, verbatim CF art. 7º XIII |
| **C-3t** | `dias > 6` | banner `title` | `A semana tem um dia de descanso` | **31** | `legal.md` R6 § *Domain of the collected operand*: *"7 is unlawful and must not produce a divisor"* |
| **C-3** | same | banner body | `A lei garante 24 horas seguidas de descanso por semana (art. 67 da CLT; art. 1º da Lei 605/49), então o máximo aqui é 6 dias.` | **125** | idem — CLT art. 67 and Lei 605/1949 art. 1º, both verbatim at `legal.md` § *Sources fetched at this gate* |
| **C-4t** | `dias` empty or `0` | banner `title` | `Informe os dias trabalhados por semana` | **38** | `legal.md` R6: *"`0` produces no divisor"*; `PRODUCT.md` §5, *silence is a defect* |
| **C-4** | same | banner body | `Sem eles não dá para conferir a sua carga horária mensal.` | **57** | idem. Mirrors `A-2`'s shape, which is the shipped pattern for a missing input |

**What each refusal names as the next action, and why that field:**

| State | Problem named | Next action | Why that field and not the other |
|---|---|---|---|
| `C-1` | the declared day is longer than any lawful normal day | `Revise a jornada diária` | R7b refuses **at every day count**, so changing the days cannot resolve it. Naming both fields here would send the user to a field that cannot help |
| `C-2` | the two declarations multiply to more than a normal week | `Revise a jornada diária ou os dias por semana` | R7a is a product of both operands and either one can resolve it |
| `C-3` | 7 days leaves no weekly rest | the limit itself (`o máximo aqui é 6 dias`) | The field is named in the title; repeating it in the body would be the only sentence on this screen that says the same thing twice |
| `C-4` | nothing to compute the check from | the title is the action | Same shape as `A-1`/`A-2`, shipped |

**Tone check on `C-3`.** It states what the law grants, not what the user got wrong. *"A lei garante
24 horas seguidas de descanso por semana"* is true of the reader whatever they typed; *"então o
máximo aqui é 6 dias"* scopes the consequence to this field (*aqui*), not to their life. It does not
say a seven-day week is illegal for them — the app has one field and no idea what it is describing.

**The word *compensação* is deliberately absent from `C-1`.** CLT art. 59 §2º's own cap is absolute
(*"nem seja ultrapassado o limite máximo de dez horas diárias"*), so the claim needs no compensation
clause to be true and complete, and the exception that does exist is the very next sentence
(art. 59-A). Avoiding the word also keeps the string clear of the banned-term list in
`__tests__/copy-guards.test.ts:37` (`/compensaç|…/`) — which does **not** read this file today, but
which spec `0002` wrote against a claim this product retired, and a string that survives only
because a guard does not yet reach it is a string waiting to trip one (lesson 022).

---

## README

`README.md:58` is the fifth and last hit of the AC6 boundary, and it is a claim about what the
product does (`PRODUCT.md` §9 governs the README as well as the UI).

| | |
|---|---|
| **Before** (`README.md:58`) | `**Limites da CLT** — o teto de 2h extras (art. 59), o intervalo intrajornada (art. 71 e §1º), o interregno de 11h entre jornadas (art. 66) e o divisor incoerente que a Súmula 431 do TST resolve.` |
| **After** | `**Limites da CLT** — o teto de 2h extras (art. 59), o intervalo intrajornada (art. 71 e §1º), o interregno de 11h entre jornadas (art. 66) e a conferência do divisor mensal pelo art. 64 da CLT, com a Súmula 431 do TST na semana de 40 horas.` |
| **Chars** | 194 → **240** (`node -e` over `README.md` line 58 at this gate) |
| **Trace** | `legal.md` R1 (the súmula covers the 40 h week and states no formula), R6 (art. 64 is the norm behind the general rule), **D3** (the scope word beside the norm name), step 5 |

Three things about the rewrite:

- **The citation is narrowed, not deleted.** *"com a Súmula 431 do TST na semana de 40 horas"* keeps
  the súmula where its text reaches and joins it to the article that carries the rest, which
  `legal.md` § *Run 3 — disclosures* calls *"a repair, not a retirement"*. A silent deletion is
  forbidden by lesson 003; softening to *"conforme a legislação"* is forbidden by lesson 004.
- **"o divisor incoerente que … resolve" goes.** A súmula does not resolve an incoherent divisor; it
  fixes one number for one week length. *"a conferência do divisor mensal"* is what the app actually
  does — it checks the carga the user declared and never replaces it (`legal.md` step 6).
- **The em-dash after the bold lead is kept.** It is the shipped structure of all nine bullets in
  that section of `README.md` and the copy guard's dash rule does not reach `.md` files
  (`__tests__/copy-guards.test.ts:26-34` walks `app`, `components`, `lib` for `.tsx?` only). Changing
  one bullet's punctuation would make it the odd one out.

---

## `PRODUCT.md` §9 — proposed, not written

`spec.md` § *In scope* 10 and Q5; `legal.md` § *Run 3 — disclosures*: *"this gate's rulings **do**
change what the product may claim … That is a **human approval point** and is left as such."*
Amending `PRODUCT.md` is `AGENTS.md` §4's human approval point. **This file proposes the wording and
writes nothing.**

Proposed row for the § *Evidence on hand* table:

| Claim | Evidence |
|---|---|
| The monthly divisor is derived from the jornada diária and the dias por semana the user declares, and cited to CLT art. 64 — with Súmula 431 do TST named only for the 40-hour week | `.specs/0007-sumula-431-citation-scope/legal.md` §§ R6, R7 and *The input domain, swept* — fourteen `(jornada, dias)` rows ruled against primary text; `lib/salary-period.ts` computes no divisor above 44 h semanais or 10 h diárias |

No **non-claim** row is proposed: nothing is retired here. The Súmula 431 citation is narrowed and
joined, which `legal.md` rules is a repair, so lesson 003's recorded-non-claim-plus-unlock-sequence
does not apply.

---

## Strings tested and left unchanged

Every string below is a **claim I am making**, not a filter result (`AGENTS.md` §5, *How a rule's
domain is defined*, bullet 5). Each was re-opened at its current line and run against both clauses of
`spec.md` § *The domain is a test, not a list* and against `legal.md`'s D-rules.

| String, at its current line | What it asserts | Ruling |
|---|---|---|
| `salary-calculator.tsx:34` `const MISSING_VALUE = "Sem carga horária"` | that a value is missing | **Out of domain** — empty state, explicitly excluded by the domain test (*"input validation, empty states and navigation"*). Asserts no rule and no divisor |
| `salary-calculator.tsx:244` `"Informe a carga horária mensal para calcular"` | that an input is needed | **Out of domain**, same exclusion. It states no divisor, so D1–D4 and D6 do not attach |
| `salary-calculator.tsx:83-87` heading and lead, *"…A hora extra da aba Jornada é calculada sobre a hora bruta, como manda o art. 59, §1º, da CLT."* | clause A — a rate attributed to a named article | **In domain, correct, unchanged.** Ruled at `legal.md` § *Row rulings* and outside this spec's rows S1/S2/S6/S8. This diff does not reopen it |
| `salary-calculator.tsx:102` `label="Carga Horária Mensal"` · `:115` `label="Jornada Diária"` · `:116` hint | field labels | **Out of domain.** `F-1` is written to sit beside them in the same Title Case and the same register |
| `lib/salary-period.ts:11` `week: "Semana"` and `salary-calculator.tsx:224` `` `Valor por ${…}` `` | a period label | **Out of domain and unchanged, although the number behind it moves** (N1/AC8). `legal.md` § *Run 3 — L8*: the Semana figure *"attaches to **no norm**"* and its only condition is that it is *"never presented under a norm name — no 'pela Súmula', no 'o devido', no 'a que você tem direito'"*. `Semana` and `Valor por Semana` carry none of those, in any period state |
| `calculator-views.tsx:82-86` footer, *"Não entram na conta: … adicionais da sua convenção coletiva …"* | clause A/B — what the calculation omits | **In domain, unchanged, and it does not discharge D1.** It excludes CCT *benefícios e adicionais*; D-1 discloses a CCT *jornada*, a different variable. Lesson 018 requires D1 beside the number, so it could not be delegated to a route footer even if the content matched |
| `calculator-views.tsx:88-90` *"Tabelas de INSS e IRRF de {year}, em vigor desde {date}"* | a fiscal table and its year | **In domain, unchanged.** It is the surface that carries `PRODUCT.md` §4's year rule, and no constant this spec adds belongs to `LEGAL_YEARS` (§ *Numbers, units and interpolation*) |

### The boundary searches, pasted rather than summarised

`grep -rn "431" --include='*.ts' --include='*.tsx' --include='*.md' lib components hooks app __tests__ tests README.md` — run at this gate:

```
lib/salary-period.ts:40:// Súmula 431 do TST: o divisor mensal é a jornada semanal x 5 (44h/semana = 220, 40h/semana = 200).
components/organisms/salary-calculator.tsx:151:                  Pela Súmula 431 do TST, a jornada que você informou corresponde ao divisor {coherentMonthlyHours}{" "}
__tests__/salary-period.test.ts:70:  it("reports the 200 divisor Súmula 431 requires for a 40h week", () => {
__tests__/salary-calculator.test.tsx:188:    expect(screen.getByRole("status")).toHaveTextContent("Súmula 431 do TST");
README.md:58:**Limites da CLT** — o teto de 2h extras (art. 59), o intervalo intrajornada (art. 71 e §1º), o interregno de 11h entre jornadas (art. 66) e o divisor incoerente que a Súmula 431 do TST resolve.
```

Five hits, five files, and **exactly two of them are mine**: `salary-calculator.tsx:151` (replaced by
`B-2`, whose norm clause is `N-40`/`N-6`/`N-5`) and `README.md:58`. The other three are not copy —
`lib/salary-period.ts:40` is a `lib/` norm comment (`AGENTS.md` §8's one exemption) and the two test
lines are assertions; all three belong to `frontend-dev` under `plan.md`, and **all three must move
with the strings**, because `__tests__/salary-calculator.test.tsx:188` currently *requires* the
defective attribution to be on screen.

**The term rename, checked across the same boundary** (lesson 007's second clause). This spec
replaces *"Pela Súmula 431 do TST"* with a norm clause that is `art. 64` in most states. Grep for the
old framing across the shipped surfaces:

```
$ grep -rnE "divisor|Súmula|convenção|acordo coletivo" --include='*.tsx' components/ app/
components/organisms/salary-calculator.tsx:137   (→ A-3)
components/organisms/salary-calculator.tsx:151   (→ B-2)
components/organisms/salary-calculator.tsx:152   (→ B-2, B-3)
components/organisms/journey-form.tsx:157        (adicional noturno; no divisor)
components/organisms/day-summary.tsx:234         (DSR, Súmula 172; no divisor)
components/organisms/calculator-views.tsx:83     (footer; no divisor)
components/organisms/calculator-views.tsx:85     (footer, Súmula 60; no divisor)
```

**Two surfaces emit a divisor and both are in this file** — the same count `legal.md` § *Run 3 — what
G6 will check*, item 4, requires: *"counted against the number of surfaces that can emit a divisor,
which is **two**"*. No sibling string on any of these screens names a divisor, so the rename
manufactures no contradiction.

---

## Guards run against these strings

Lesson 022 — a mandated string is run through every guard that reads its destination, **before** it
is mandated. Destination: `components/organisms/salary-calculator.tsx` and `README.md`.

| Guard, at its source | Reads this destination? | Result on these strings |
|---|---|---|
| `__tests__/copy-guards.test.ts:79` — no `—` or `–` in any `.tsx?` under `app`, `components`, `lib` | **yes** | **Pass.** No string in this file contains either character; checked by the guard's own regex `/[—–]/` over all 21 strings. `README.md` is outside the walk, and its existing dashes stay |
| `__tests__/copy-guards.test.ts:37` — banned compensation/accumulation terms | **no** — it reads only `DESCRIPTOR_SOURCES` (`app/page.tsx`, the two root image routes, `lib/og-image.tsx`, `lib/calculator-view.ts`) | **Pass anyway, deliberately.** The only string that would have tripped it was `C-1`'s *"regime de compensação"*, rewritten out (§ *Refusal states*). `Bancário` does not match `/banco/i` |
| `__tests__/copy-guards.test.ts:45` — every `saldo` scoped to the day | no | **Pass.** No string here uses `saldo` |
| `__tests__/copy-guards.test.ts:53` — night-premium completeness qualifiers | no | **Pass.** No string here qualifies anything as complete |
| `__tests__/copy-guards.test.ts:86` / `:93` — retired icon library, viewport units | yes | **Not applicable** — copy, not markup |
| `__tests__/comment-free-code.test.ts` | yes | **Not applicable.** Nothing in this file is a comment. The `lib/salary-period.ts:40` norm comment is `frontend-dev`'s, under its `NORM_CITATION` exemption, and `spec.md` AC12 forbids widening it |
| `tests/e2e/alert-legibility.spec.ts` consumer **C3** (`0006` LR2a) | yes — it drives **surface B** by filling *Carga Horária Mensal* with `200` | **Needs re-reading at G4/G5, and it is a finding if it is not.** Surface B's body grows from 177 to **309** characters (run 1 said 521; D-4's 212 left the body at run 2), the panel gains D-4's permanent slot in **every** state including this one, and the input set now includes the new field; `spec.md` AC16 already carries this and names the same file |

---

## Rejected phrasings

| Considered | Why it lost |
|---|---|
| `Dias por Semana` (15) | Fits the 19-character column and still loses. *Days the week has* is a reading it admits and the answer to that question is **7** — a quantity the app refuses (`C-3`) and not the operand CLT art. 64, parágrafo único names. `legal.md` § *D-F1* binds the *trabalhados* sense; `Dias Trabalhados` (16) keeps it for one more character |
| `Dias Trabalhados por Semana` (27), **run 1's label** | Correct and unaffordable: it wraps at the 19-character column and pushes its own control 17.5 px below the jornada's, so the two controls that are one answer stop reading as one row (`STATUS.md` **D-F1**). The period it spends 11 characters on is already rendered as a value in `A-3`/`B-2` |
| `Dias Trab. por Semana` (21) | Over budget, and an abbreviation in a grid whose other three labels are written out. It buys back the period by introducing the only shortened word on the screen |
| `Dias Úteis Semanais` (19) | Exactly on budget and **wrong**: *dias úteis* is a calendar quantity, not the user's own. The six dias úteis of the week are six for a worker who works five, so the field would collect the wrong number from a reader who answered it correctly |
| `Quantos dias você trabalha por semana?` (38) as the label | A question mark in a grid where the other three labels are noun phrases. The register belongs to a hint, and the field has no hint |
| A hint: `Conte só os dias em que você trabalha. O sábado entra se for dia de trabalho.` | The sábado is the operand the TST itself uses to pick between divisors (`legal.md` R6), so the temptation is real. It lost because the label already asks exactly that question, and a worker answering *"how many days a week do you work"* counts the sábado correctly without being told. It buys nothing and spends a line of the first screen |
| A hint: `O padrão é 5 dias.` | **Forbidden.** `legal.md` § *Run 3 — L11*: a default is not a norm and disclosing it discloses the wrong thing |
| `Pela Súmula 431 do TST, a jornada que você informou corresponde ao divisor …` (the shipped opening, with the day count added) | Keeps the súmula as the sentence's authority in **every** state, and its text covers only the 40 h week (`legal.md` R1). Step 5 makes the norm a function of the operands, so the norm cannot lead the sentence |
| `… o divisor é {divisor} horas por mês, conforme a legislação.` | **Forbidden** by lesson 004 and by `legal.md` § *Disclosures required*: vagueness is not a citation |
| `… e não {carga}.` (shipped) | *"e não"* rules on the user's own declaration. The app compares; it does not overrule. `B-2` ends *"Você informou {carga} horas."* and lets the two numbers sit beside each other |
| `Usar um divisor maior do que o devido reduz o valor de cada hora sua.` (shipped) | Deleted, not softened. `legal.md` § *Worked example E5* — on `12h00` it argues a worker from R$ 13,64 toward R$ 10,00 — and *"o devido"* asserts an entitlement the app cannot establish |
| `O divisor acima pode estar errado para a sua categoria.` (49) as D4 | Half the length of `D-4` and the reason D5 was retired: it tells every reader their correct number is suspect. `PRODUCT.md` §4 obliges naming the gap, and the gap has three names. Forbidden outright by `legal.md` § *Run 3 — addendum A*, clause 5 |
| `… Se for o seu caso, o divisor acima não vale para você.` — **run 1's `D-4`** (212) | **The bounce.** *Acima* is deixis with no referent in the **Silence** state, where no divisor banner renders, and the addendum moves D4's subject from the divisor to the salário-hora. A sentence that points at a sibling element cannot be one string used in all five states (clauses 1 and 2) |
| `… Se for o seu caso, o valor da hora nesta tela não é o seu.` (216) | Within budget and it says the same thing, but *"o seu caso"* and *"o seu"* land in one short clause and the second *seu* reads for a beat as the salary rather than the rate. *"é outro"* is four characters shorter and unambiguous |
| `… Esta tela não usa esses divisores.` (192) | 20 characters cheaper and it fails clause 2: the subject is the screen's own machinery, not the money the user acts on. It also states a fact about the app where the addendum requires a fact about the reader's number |
| `D-4` without its parenthesis (165 instead of 212) | 47 characters cheaper and it drops the sources for three claims about other categories' divisors. Held in reserve as the **first** cut if design's budget cannot hold 212 — and it is `tech-lead`'s cut to authorise, not a developer's (§ *What is legally irreducible in each string*) |
| `Jornada acima do limite legal` as `C-1t` | Reads as a verdict on the user. The app does not know whether the declared jornada is the user's error or their employer's. `Sem divisor acima de 10 horas por dia` says what the app is doing |
| `Valor inválido` / `Corrija os dias` as `C-3t` | Form-validation voice for a sentence carrying a legal fact. `C-3t` states the right (24 h of rest) and `C-3` states the consequence for this field |

---

## What is legally irreducible in each string

Written so a bounce on space does not become a bounce on law. If `design.md` cannot hold a string,
this is the order in which it gives way, and **`tech-lead` authorises the cut**.

| String | Irreducible | First to go | Dies with it |
|---|---|---|---|
| `A-3` / `B-2` | **both operands as values** and the norm clause | nothing | D6, D2 and D3 all sit in this one sentence; there is no shorter form that keeps them |
| `B-3` | the fact that the money uses the declared carga | the whole sentence | Nothing `legal.md` mandates. It is the honest replacement for a deleted claim, and dropping it leaves the user to guess whether the screen already corrected them |
| `D-4` | the three category names **and** the consequence clause naming **the money on this screen** (*"o valor da hora nesta tela é outro"*) — `legal.md` § *Run 3 — addendum A*, clauses 2 and 3 | the parenthesis with the three norms (−47) | The reader loses the source, keeps the gap. Below that there is nothing left to cut that is not the disclosure itself. **The consequence clause is not a cut**: without it the sentence states three categories and no consequence for the number the reader is looking at |
| `D-1` | that a CCT may set another jornada and the app cannot know | `(art. 611-A, I, da CLT)` (−24) | Same trade: the claim survives, its source does not |
| `C-1` / `C-2` | the three clauses `legal.md` R7 mandates — the sum, the limit with its norm, the field | the restated operands at the head of the sentence | `legal.md` R7 names the sum as one of the three, so this cut needs the law gate, not the design gate |
| `C-3` | the 24 h rest and the 6-day maximum | the second norm (`art. 1º da Lei 605/49`, −22) | One of the two norms is redundant for the reader; both are in `legal.md` R6 |

---

## Handoff

- **`product-designer`** — every count above is a character count, not a measured width. Reconcile
  them against `design.md` § *Copy constraints* at 390 px; where a slot is tighter than a string,
  say so in `design.md` and route the cut, using the table above for the order. **At run 2 three
  numbers are yours to re-measure and they are the delivered ones, not projections:** `D-4` is
  **212** characters in a **permanent slot** rendered in all five states (§ 9.1 Option B), `F-1` is
  **16** characters and fits the 19-character column at cost 0 px, and both banner bodies lose
  **212** characters each (A 489 → **277**, B 521 → **309**).
- **`tech-lead`** — the strings this spec **replaces**, by file and line at this HEAD, so G4 can task
  them without re-deriving: `components/organisms/salary-calculator.tsx:133` (`A-1`, unchanged),
  `:137-138` (`A-2` kept, `A-3` replaces the second sentence, `A-5` added), `:147` (`B-1`),
  `:151-153` (`B-2`, `B-3`, `B-5`), and `README.md:58`. The refusal states `C-1`…`C-4` are new
  surfaces with no line to replace. **`D-4` is a new permanent slot in the Salário panel, in the same
  card as the salário-hora, and it is not inside either banner** — a task that adds it to a banner
  body ships it twice in two states and not at all in the other three. `lib/salary-period.ts:40`,
  `__tests__/salary-period.test.ts:70` and `__tests__/salary-calculator.test.tsx:188` carry the same
  defective attribution and are **not copy** — they move with this change or AC6 fails.
- **The human** — § *`PRODUCT.md` §9 — proposed, not written* holds a proposed claim row. It is not
  written into `PRODUCT.md` by this gate.
