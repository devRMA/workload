# 0003 — Copy

> Owner: content-writer · Gate: `copy` · Run 1 · Written against `legal.md` Run 1 (**pass**), whose
> §7 (the registry, one row per data set), §9.1 (the per-row ruling), §11 (the seven disclosures) and
> §12 (the non-claim) bind every string below. Runs in parallel with `design.md`, which was still
> absent when this file was written (`ls .specs/0003-citation-registry/` → `STATUS.md`, `legal.md`,
> `spec.md`). § *Slots and budgets* states what is measured here and what is still owed by G3's other
> half.

> **Addendum — run 2.** `legal.md` §16.1 rules that `R-2` alone does not discharge D3 and reopens
> this gate for **one string**: the caption `design.md` §8 calls **S6**, a new `<p>` sibling to the
> regime control's `CollapsiblePanel`, inside `regime-field.tsx`'s `<fieldset>`. Everything above this
> note is unchanged from run 1 and stands; the new string is `R-3`, added to § *Regime helper text*
> below, with its own row in every table that lists strings. Nothing else in this file is re-opened.

**The template deviation, recorded once.** `.specs/templates/copy.md` carries an `en` row per string
and a parity checklist over `locales/en.ts` / `locales/pt-BR.ts`. **This product has no i18n layer
and none is planned** (`AGENTS.md` §1; `PRODUCT.md` §7, *No English*), and no `locales/` directory
exists in this tree. The bilingual columns are dropped and replaced by the trace column this
project's gates check. Same deviation as 0002 and 0007; the template is stale, not this file.

---

## Voice notes

Nothing here departs from the shipped tone. That is the point: every sentence below sits next to a
sentence this spec does not touch, in the same paragraph, on the same screen.

Four things are specific to this feature and easy to lose:

1. **A citation is part of the sentence, not an appendix to it.** The shipped voice puts the norm in
   parentheses after the fact it backs (`"(art. 71, §1º, da CLT)"`), never in a separate line of
   legalese. Every added norm below follows that shape, so a reader who does not care about norms
   still reads a whole Portuguese sentence.
2. **The app names norms; it never explains them.** No string tells the reader what a súmula is, what
   an Orientação Jurisprudencial is, or what to do about any of it (`PRODUCT.md` §7, *no legal
   advice*). Where the identifier itself is jargon — `OJ-SDI1` — it is written out as
   *Orientação Jurisprudencial nº 355 da SBDI-1 do TST* rather than abbreviated, because the
   abbreviation is the only form a worker would have to look up.
3. **Positive statements only, about what the law says.** `legal.md` §9.1 C15 retires a universal
   negative. Its replacement (`J-1`) is bound by what it must assert, not by the words it avoids, and
   no string in this file says what the law does *not* contain. The single exception is the one
   `legal.md` §11 D1 mandates verbatim in substance: that the 100% step comes from a convenção
   coletiva and not from the law — a statement about the *origin* of a rate the user can type, not a
   claim that no norm anywhere doubles anything.
4. **Repetition is the feature.** `legal.md` §7 rules that each data set carries its own source
   "even where two genuinely share a norm, because explicit repetition is what makes the next
   reviewer check all of them". `F-1` therefore names the Portaria twice, once per Anexo, and `J-0`
   and `J-1` each carry the same pair of norms. Neither is an editing slip; collapsing either
   reintroduces the shared-field defect that is this whole spec (lesson 041).

**Em-dash:** no string below contains `—` or `–`. Run against the destination's own guard; see
§ *Guards run against these strings*.

---

## Slots and budgets

`design.md` did not exist when this file was written. Every count below is **measured in
characters**, per string, with the shipped string it replaces measured the same way, so the delta is
the number `product-designer` needs. Counts are `[...string].length` (code points, so `º`, `§` and
accented vowels each count once), produced by a script over the exact texts in § *Strings*.

**What is measured here and what is owed by the other half of G3:**

| Question | Owner | State |
|---|---|---|
| Characters per string, and the delta against the shipped string | content-writer | **measured below** |
| Characters per line box at 390 px in each slot, and therefore whether a string wraps under the ≥ 40 cpl floor | product-designer | **owed** — no browser measurement is made in this file |
| Where `D-3` and `P-1` sit (both are new paragraphs in existing blocks) | product-designer | **owed**; `legal.md` §11 fixes the block, not the position inside it |
| Whether `D-2`'s longer row label wraps beside its value column | product-designer | **owed** |

**The measured deltas.** Bodies only, characters:

| String | Shipped | This run | Delta | What the growth is |
|---|---|---|---|---|
| `F-1` footer citation line | 113 | **398** | +285 | One norm became three, each with its own effective date (`legal.md` §7 rows 1, 3, 4, 5; §11 D5) |
| `F-2` footer gap paragraph | 419 | **424** | +5 | `Súmula 60` → `Súmula 60, II` (D-19) |
| `R-1` regime CLT | 166 | **166** | 0 | Derivation only; the rendered characters do not move (AC8) |
| `R-2` regime Estatutário | 292 | **463** | +171 | The retired non-claim replaced by what EC 103 art. 9º §4º actually says (§12) |
| `R-3` regime gap legend | — | **136** | +136 | New string, addendum run 2 (`legal.md` §16.1 — `R-2` alone does not discharge D3) |
| `J-1` hint acima de 2h | 142 | **164** | +22 | The negative form replaced by the sourced positive one (§11 D1) |
| `D-1` DSR caption | 134 | **255** | +121 | One norm became three; F2's missing citation (§9.1 C4) |
| `D-2` DSR row label | 19 | **26** | +7 | The label described a base narrower than the one the code passes |
| `D-3` night-premium floor | — | **122** | +122 | New disclosure (§11 D4) |
| `P-1` "Ano" approximation | — | **162** | +162 | New disclosure (§11 D6) |
| `S-1` Custo da Hora subtitle | 163 | **191** | +28 | The norm's own term restored (§9.1 C13) |
| `C-1` compliance, 2h extras | 207 | **211** | +4 | `Súmula 376` → `Súmula 376, I` (D-13) |
| `C-2` compliance, 15 min | 184 | **207** | +23 | `art. 71, §4º` added (D-11) |
| `C-3` compliance, 1 hora | 203 | **252** | +49 | `art. 611-A, III` and `art. 71, §4º` added (D-10, D-11) |
| `C-4` compliance, interjornada | 182 | **249** | +67 | The OJ named (D-12) |

**Two slots carry a legibility guard that already runs in this tree, and both are loosened rather
than tightened by these strings:**

- **The footer** (`tests/e2e/disclosure-legibility.spec.ts`, `DS1_FOOTER_SELECTOR`) asserts
  `assertLr2b` on the footer **and on every `<p>` inside it**: a paragraph that wraps must average
  ≥ 40 characters per line box. This is a *minimum* on density, so a longer paragraph is safer than a
  short one, and it is the reason **`F-1` is one paragraph and not three**. Three citation
  paragraphs of ~100–130 characters each would each wrap to two or three line boxes with a short
  trailing line, which is exactly the shape that fails the floor. One 398-character paragraph has one
  short trailing line among many full ones. **The designer may not split `F-1` into one paragraph per
  norm without re-measuring this guard.**
- **The compliance alert** (`tests/e2e/alert-legibility.spec.ts`, consumer `C5`) measures the body
  paragraph of *"Você passou de 2h extras hoje"* under the same floor. `C-1` grows by 4 characters.

**If a string below overflows its slot, the cut is a gate decision routed through `tech-lead`**, not
a developer's trim. § *What is legally irreducible in each string* names which clause dies first in
each, and the only string with a pre-approved shorter form is `R-2` (see its row).

---

## Numbers, units and interpolation

| Quantity | Form in the copy | Rule |
|---|---|---|
| **Datas de vigência** | `01/01/2026`, `01/05/2025` — `DD/MM/AAAA`, through the shipped `formatIsoDate` | The form the footer already renders at `calculator-views.tsx:91`. Never `2026-01-01` in prose |
| **Ano da tabela** | the four digits, from `TABLE.year`: `tabela de 2026`, `faixas de 2026` | `PRODUCT.md` §4, third commitment. Never hand-typed where the record holds it |
| **Datas das normas** | `de 09/01/2026` inside the norm's own name; `Lei nº 4.090/1962`, `EC nº 103/2019` where the year is part of how the norm is cited | `legal.md` §5, §7 — the identifier is quoted as `legal.md` gives it |
| **Alíquotas e percentuais** | pt-BR decimal comma, `%` glued to the digits: `7,5% a 14%`, `até 22%`, `50%`, `100%`, `20%` | The shipped form at `lib/payroll.ts:24`. **`7,5% a 14%` and `até 22%` are derived from `rgpsBrackets` / `rppsFederalBrackets` and must render character-identical** (AC8) |
| **Moeda** | unchanged: `formatCurrency` → `R$ 8.475,55` | Not touched by this spec |
| **Artigos, parágrafos, incisos e alíneas** | `art. 71, §1º, da CLT` · `art. 7º, XVI, da CF` · `art. 4º, III, alínea "i"` · `art. 611-A, III, da CLT` | The shipped form at `lib/compliance.ts:47`. Incisos in Roman numerals, alíneas named as *alínea* and quoted, never bare |
| **Súmulas e OJs** | `Súmula 172 do TST` · `Súmula 60, I, do TST` · `Súmula 376, I, do TST` · `Orientação Jurisprudencial nº 355 da SBDI-1 do TST` | `legal.md` §9.1 C8 and C16 require the **item**; the item is written after the number, before `do TST` |

**The year is part of the answer, and this is where it appears.** Every number the registry produces
is rendered beside its table's year in exactly three places: `F-1` (INSS 2026, IRRF in force since
01/05/2025, RPPS faixas 2026), `R-1` (`tabela de 2026`) and `R-2` (`faixas de 2026`). Before this
run, `R-2` named no year at all while its sibling `R-1` did.

**Two values in the registry never reach a string, and that is checked rather than assumed.**
`dependentDeduction` (R$ 189,59, in force since **2015-04-01**) and `simplifiedDeduction`
(R$ 607,20) are used in the arithmetic and are named by no copy anywhere, so §11 D5's warning — do
not attach 2026-01-01 to them — is satisfied by there being no string to attach it to:

```
$ grep -rn "ependente\|189,59\|607,20\|simplificado" components/ lib/ app/ | grep -v "\.test\."
components/organisms/salary-calculator.tsx:167:  ...>INSS, IRRF, dependentes, descontos e ganhos extras</span>
components/organisms/tax-details-panel.tsx:51:   <Field id="dependentes" label="Dependentes">
components/organisms/tax-details-panel.tsx:53:   id="dependentes"
lib/og-image.tsx:19:    subtitle: "Quanto vale a sua hora, já com INSS, IRRF e dependentes.",
lib/structured-data.ts:8:    "...com INSS, IRRF, dependentes, descontos e ganhos extras.",
app/custo-da-hora/page.tsx:8,12:  "...com INSS, IRRF, dependentes, ..."
```

Every hit names the **input** *dependentes*; none names the deduction's value, its norm or a date.
No string is owed, and none is written. **If a later spec renders R$ 189,59, it renders with
01/04/2015 beside it, not with the record's year.**

---

## Strings

One row per string. **Slot** is the component and the role; **trace** is the passage of `legal.md`
that authorises every factual claim in it. A string with a legal claim and no trace is an automatic
rejection, so the column is exhaustive rather than illustrative.

### Footer — `components/organisms/calculator-views.tsx`

#### `F-1` — the citation line (replaces `:90-99`)

| | |
|---|---|
| Text | `Tabelas usadas nos cálculos: INSS pela Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II, em vigor desde 01/01/2026. IRRF pela Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025, em vigor desde 01/05/2025. RPPS federal: as alíquotas vêm da Emenda Constitucional nº 103/2019, art. 11, e as faixas de 2026, do Anexo III da Portaria nº 13/2026, em vigor desde 01/01/2026.` |
| Chars | **398** (shipped: 113) |
| Renders in | every state of both routes, `/` and `/custo-da-hora` — the footer is unconditional |
| Trace | `legal.md` §7 rows 1, 3, 4, 5 (the norm per data set); §5 R1, R2, R6 (what each norm sets); §6.1, §6.3, §6.2 (the effective dates); §11 **D5** (each norm renders with its own date); `spec.md` **AC4** |

**Four link targets, and the anchor text of each.** Each URL is the one `legal.md` §7 records as
returning `200` on 2026-09-15; none is invented here, and none may be shortened to a bare "fonte".

| # | Anchor text | Chars | `href` | Trace |
|---|---|---|---|---|
| `F-1a` | `Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II` | 63 | `https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf` | §7 row 1 |
| `F-1b` | `Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025` | 66 | `https://www2.camara.leg.br/legin/fed/lei/2025/lei-15191-11-agosto-2025-797839-publicacaooriginal-176105-pl.html` | §7 row 5 |
| `F-1c` | `Emenda Constitucional nº 103/2019, art. 11` | 42 | `https://www2.camara.leg.br/legin/fed/emecon/2019/emendaconstitucional-103-12-novembro-2019-789412-publicacaooriginal-159409-pl.html` | §7 row 3 |
| `F-1d` | `Anexo III da Portaria nº 13/2026` | 32 | same PDF as `F-1a` | §7 row 4 |

**Why `F-1d` repeats a URL `F-1a` already carries, and why its anchor text is different.** They are
two distinct attributions to two distinct Anexos of one document (`legal.md` §6.2: the rates are the
EC's, the faixas are the Portaria's). Merging them is the shared-field defect this spec exists to
remove. The anchor text differs so a link list read out of context still distinguishes them, and so
that neither anchor is deixis to the other (lesson 049).

**The RPPS clause is an addition, and it is flagged as one.** `spec.md` AC4 requires the footer to
name the INSS and IRRF tables with different norms and says nothing about the RPPS. But the
Estatutário ladder produces the whole salário screen for a user category `PRODUCT.md` §1 names as a
secondary user, and today **no string anywhere on screen cites it** — the shipped footer names only
*"Tabelas de INSS e IRRF"*. Carrying the line without it would leave a rendered number uncited under
a spec that claims to have closed exactly that defect (`PRODUCT.md` §4, *cite or omit*). If
`tech-lead` or `product-designer` cuts the clause for length, the cut is a §4 breach that must be
routed, not absorbed.

#### `F-2` — the gap paragraph (`:81-88`)

| | |
|---|---|
| Text | `Não entram na conta: FGTS, benefícios e adicionais da sua convenção coletiva, o 13º salário e o terço de férias, a incidência de INSS e IRRF sobre as horas extras, a prorrogação da jornada noturna depois das 5h (Súmula 60, II, do TST), feriados, o valor do intervalo suprimido e o adicional de insalubridade ou periculosidade. O regime Estatutário usa a tabela do RPPS federal e não vale para servidor estadual ou municipal.` |
| Chars | **424** (shipped: 419) |
| Change | `(Súmula 60 do TST)` → `(Súmula 60, II, do TST)`. **Nothing else in the paragraph moves.** |
| Renders in | every state of both routes |
| Trace | `legal.md` §5 R14 (item II is the prorrogação; item I is the integration rule used elsewhere in the same app); §9.1 C16; §11 **D2** |

**Two claims this paragraph makes that were re-read rather than carried.** Per lesson 002, a string
reopened is a string re-published, so both were checked against `legal.md` at this run:

- *"o 13º salário ... não entram na conta"* — still true of the **jornada** figures, and it is now
  qualified where it stops being true: the "Ano" figure **does** include the 13º, which is what `P-1`
  discloses (`legal.md` §11 D6, §9.1 C18). The two strings are on different screens and do not
  contradict: this one is about what the day's and month's numbers omit; `P-1` is about what the Ano
  number contains.
- *"O regime Estatutário usa a tabela do RPPS federal e não vale para servidor estadual ou
  municipal"* — this is **permitted content under `legal.md` §12 verbatim**: it says the ladder is
  the federal one and that it does not apply to a state or municipal servidor, and it says nothing
  about what their rate typically is. It survives the non-claim unchanged.

### Regime helper text — `lib/payroll.ts` → `components/molecules/regime-field.tsx:59`

#### `R-1` — CLT (`lib/payroll.ts:24`)

| | |
|---|---|
| Text | `INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. O teto do salário de contribuição é R$ 8.475,55: acima disso o desconto trava em R$ 988,09 (tabela de 2026).` |
| Chars | **166** — **identical to the shipped string, character for character** |
| Renders in | the regime panel, both regime cards visible once the panel is open, on `/custo-da-hora` |
| Trace | `legal.md` §6.1 (the table, the ceiling, the derived R$ 988,09); §9.1 **C6** |

**This row exists to say that no copy changes here.** `legal.md` §9.1 C6 rules the span *correct for
2026 but derive it*: `7,5% a 14%` is `rgpsBrackets[0].rate` and `[3].rate`, and the ceiling and the
R$ 988,09 are already interpolated. **The copy decision is that the rendered characters do not
move** — `AC8` is satisfiable only against this exact string. How the span is produced is
`tech-lead`'s at G4 and `frontend-dev`'s at G5; what it must read is this file's.

**The reading of AC8 this file commits to, because it is ambiguous and a developer will hit it.**
AC8 says *"the regime strings render character-identical to what ships today"* and then quotes two
fragments, `"7,5% a 14%"` and `"até 22%"`. It cannot mean the whole of `R-2`, because `legal.md` §11
D3 **requires** `R-2` to change. It means **the derived fragments**: after the refactor those two
substrings still render exactly as quoted. `legal.md` D-16 says the same thing (*"output string
unchanged (AC8)"*). Recorded so nobody resolves the contradiction by keeping the non-claim.

#### `R-2` — Estatutário (`lib/payroll.ts:32`)

| | |
|---|---|
| Text | `Aplicamos a tabela do RPPS federal: a contribuição não para no teto do salário de contribuição que vale para a CLT e as faixas seguem subindo até 22% sobre a parcela mais alta (faixas de 2026). Servidor estadual ou municipal não entra nesta tabela: a alíquota é a do regime próprio do seu ente, que pela EC nº 103/2019, art. 9º, §4º, não pode ser menor que a da União, salvo se esse regime não tiver déficit atuarial, caso em que não pode ser menor que a do INSS.` |
| Chars | **463** (shipped: 292) |
| Renders in | the regime panel; the Estatutário card is in the DOM whenever the panel is open, selected or not |
| Trace | `legal.md` §6.2 (the ladder, `até 22%` = EC 103 art. 11 §1º VIII, the 2026 faixas, the absent ceiling); §5 **R7** (EC 103, art. 9º, §4º, quoted verbatim there); §9.1 **C7**; §11 **D3**; §12 (the non-claim and its binding note) |

**What was retired and what replaced it.** The shipped sentence ends *"Servidor estadual ou
municipal tem alíquota própria (muitas vezes 14% linear), então este número não vale para ele."*
`legal.md` §12 retires *"muitas vezes 14% linear"* as a claim about 27 states and 5.570
municipalities that no norm makes and none could.

Per lesson 004 and `legal.md` §12's binding note, the replacement is bound by **what it must
assert**, not by avoiding the string `14%`:

| §12's permitted content | Where it lands in `R-2` |
|---|---|
| this ladder is the **federal** one | *"Aplicamos a tabela do RPPS federal"* (shipped, unchanged) |
| it **does not apply** to a state or municipal servidor | *"Servidor estadual ou municipal não entra nesta tabela"* |
| *(optional)* your ente sets your rate | *"a alíquota é a do regime próprio do seu ente"* |
| *(optional)* by EC 103 art. 9º §4º it may not be below the União's, save where the regime has no actuarial deficit, in which case not below the RGPS | *"que pela EC nº 103/2019, art. 9º, §4º, não pode ser menor que a da União, salvo se esse regime não tiver déficit atuarial, caso em que não pode ser menor que a do INSS"* |

**I tried to write a string that uses only permitted words and still makes the retired claim**, as
§12's note demands. It is writable: *"a alíquota do seu ente costuma ficar na faixa da União"* uses
no forbidden word and reproduces the non-claim exactly. The clause that makes `R-2` safe is
therefore not its vocabulary but that **every sentence about a state or municipal rate is a
statement about a legal floor and names the norm that sets it**. Any sentence describing what such a
rate *is*, *tends to be* or *usually is* — at any percentage, with any hedge — fails §12, and that
is the test a reviewer should apply to this string, not a word list.

**The only pre-approved shortening, if the slot cannot hold 463 characters.** Drop the EC clause
**whole**, ending at *"...do seu ente."* → **294 characters**. It is permitted because §12 marks that
clause optional. **Truncating it instead — stopping at "não pode ser menor que a da União" — is
forbidden**: that sentence without its exception is a stronger claim than EC 103 art. 9º §4º makes,
and it is false for an ente with no actuarial deficit.

**`não entra nesta tabela` replaces `este número não vale para ele`.** The shipped clause is deixis
to a number that does not render in this card at all (the card is helper text; the contribution is
computed elsewhere on the screen). Lesson 049: name the thing, do not point at it.

#### `R-3` — regime gap legend, outside the panel (`regime-field.tsx`, new `<p>`) — **addendum, run 2**

| | |
|---|---|
| Text | `A tabela do RPPS federal não se aplica a servidor estadual ou municipal, cujo ente fixa a própria tabela (EC nº 103/2019, art. 9º, §4º).` |
| Chars | **136** — new string, no shipped predecessor |
| Slot | `design.md` §8 **S6** / §7 table row **S6**: a `<p>` that is a **sibling** of the `<button>` and the `CollapsiblePanel`, inside the same `<fieldset>` — **not** inside the collapsible region, so it does not unmount with it. Column 308,00 px @390, 667,33 px @1440, both themes |
| Renders in | every state in which `value === "estatutario"`: panel closed on first paint, panel open with Estatutário selected, the 371–481 ms window after the selection gesture, the settled state ≥ 1 000 ms after, and after a full reload with the regime persisted. Absent when the selected regime is CLT. Its condition is `value`, never `isOpen` |
| Trace | `legal.md` §5 **R6** (`rppsFederalBrackets`, the figure this legend qualifies) and **R7** (EC nº 103/2019, art. 9º, §4º, quoted verbatim there — the sole source for the ente-sets-its-own-rate clause); §11 **D3**, restated at §16.1 as **D3.1** (domain) and **D3.4** (content); §12 (the non-claim and its binding note) |

**What D3.1 and D3.4 require, clause by clause, and where each lands:**

| D3.4 requires | Where |
|---|---|
| name the ladder — no *"a tabela acima"*, no *"este número"* (lesson 049) | *"A tabela do RPPS federal"*, stated as the sentence's subject, not pointed at |
| it does not apply to a state or municipal servidor | *"não se aplica a servidor estadual ou municipal"* |
| *(optional, and the only thing it may add)* your ente sets your rate, per EC 103 art. 9º §4º | *"cujo ente fixa a própria tabela (EC nº 103/2019, art. 9º, §4º)"* — this is a strict subset of R7's licensed content: it says the ente sets the rate and cites the article; it says nothing about a floor, a percentage, or what any ente's rate is or tends to be |

**Why this is a different sentence from `R-2`, not the same one shortened.** `legal.md` §16.1 forbids
shipping the same sentence in both surfaces when both can be on screen at once (the open-panel
state). `R-2` opens *"Aplicamos a tabela do RPPS federal"* and ends on the EC 103 exception clause in
full, with the actuarial-deficit branch; `R-3` opens on the ladder as its subject and states only that
it does not apply, plus the bare fact that the ente sets its own rate. No clause of `R-3` repeats a
clause of `R-2` word for word. Two sentences, two surfaces, the same gap.

**Why it does not point at `R-2` or at the previdência figure.** Per lesson 049, the caption's subject
(*a tabela do RPPS federal*) is named in full inside its own sentence rather than referred to as
*"esta tabela"*, *"a de cima"* or *"o valor ao lado"*. Read alone, with the panel closed and no other
regime string on screen, every word in it still resolves: the ladder it names is the one the day
summary is currently pricing from, whether or not the reader ever opens the panel to see `R-2`.

**States checked against the string, per lesson 049.** Its subject is *a tabela do RPPS federal*, and
the number it qualifies is the previdência desconto derived from `rppsFederalBrackets` — at salário
bruto R$ 15.000,00, **R$ 4.625,56**, against R$ 3.932,64 under CLT (`legal.md` §16.1, S-D/S-E). That
number renders in exactly two of the five states `legal.md` §16.1 measured — S-D (settled) and S-E
(after reload) — and in the two more `design.md` §8 adds to the domain (panel open, and the ≥ 1 000 ms
window after the gesture): every one of them has `value === "estatutario"`, which is `R-3`'s own
condition. There is no state in which the previdência figure is on screen from the federal ladder and
`R-3` is not, and no state in which `R-3` renders and that figure does not — same condition, same
frame, by construction (`design.md` §5.3's co-presence rule, extended to this slot).

**Rejected forms that land in the character gap `design.md` §7 S6 names.** `design.md` measured that a
112-character probe in this exact slot scores 37,33 cpl and fails, because 112 sits between the
`[80,100]` and `[120,150]` windows. Every short draft that stated only the two required facts, with no
citation, landed in that same gap — 102, 109, 111, 112 and 117 characters were all tried and all
discarded for the same reason, listed in § *Rejected phrasings*. Adding the EC 103 citation both
completes D3.4's optional clause and moves the string to 136 characters, inside `[120,150]` with
14 characters of headroom below the ceiling and 16 above the gap.

### Jornada settings — `components/organisms/journey-form.tsx`

#### `J-0` — hint, *Adicional até 2h extras (%)* (`:142`) — **unchanged**

| | |
|---|---|
| Text | `O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT).` |
| Chars | 83 |
| Trace | `legal.md` §5 **R13** (both norms quoted verbatim, both load-bearing, the base named correctly); §9.1 **C14**: *"CORRECT. Carry it through unchanged."* |

Listed because `AGENTS.md` §5 makes every string marked unchanged a claim, and because `J-1`
directly below it is being rewritten: a rename landing in one of two adjacent strings manufactures a
contradiction. Both now say *piso*, both name the same pair of norms, and the repetition is
deliberate — the two fields are read independently by a user who opens the panel to change one rate.

#### `J-1` — hint, *Adicional acima de 2h (%)* (`:157`)

| | |
|---|---|
| Text | `O piso de 50% vale para toda hora extra, inclusive depois da 2ª (art. 7º, XVI, da CF; art. 59, §1º, da CLT). O degrau de 100% vem de convenção coletiva, não da lei.` |
| Chars | **164** (shipped: 142) |
| Renders in | the settings panel, in every state in which the field renders; associated to the input by `aria-describedby="extra-tier-rate-hint"`, which already ships |
| Trace | `legal.md` §5 **R13**, clause 2 (*"The floor is uniform. Neither norm tiers the rate, and art. 59 caput's two-hour limit attaches a ceiling on the quantity, never a higher rate on the excess"*); §9.1 **C15**; §11 **D1** |

**What `D1` requires, clause by clause, and where each lands:**

| D1 requires | Where |
|---|---|
| the statutory floor is **50% for every extra hour, including after the second** | *"O piso de 50% vale para toda hora extra, inclusive depois da 2ª"* |
| naming **CF art. 7º, XVI** and **CLT art. 59, §1º** | the parenthesis, in the form `J-0` already uses |
| 100% is a **convenção coletiva** matter, not a statutory one | *"O degrau de 100% vem de convenção coletiva, não da lei."* |
| it must **not** assert that no law doubles the adicional | the sentence is absent; see below |

**The negative is gone and no synonym of it survives.** Discarded during drafting, each for the same
reason: *"A lei não escalona o adicional"*, *"Nenhuma norma dobra o piso depois da 2ª hora"*,
*"O piso continua sendo 50%"*. All three are the retired universal negative in other words, and
`legal.md` §5 R13 shows why it is unsafe at its own width: **Lei nº 605/1949, art. 9º** does double
the pay, on a feriado trigger. What ships is a statement about where the 100% step comes from, which
is checkable and which `D1` mandates.

### Resumo do dia — `components/organisms/day-summary.tsx`

#### `D-1` — the DSR caption (`:234`)

| | |
|---|---|
| Text | `O DSR sobre os extras e sobre o adicional noturno vem da Lei nº 605/1949, art. 7º, alínea "a", da Súmula 172 e da Súmula 60, I, do TST. O cálculo supõe que estes valores se repitam em todos os dias úteis do mês e conta só os domingos. Feriados não entram.` |
| Chars | **255** (shipped: 134) |
| Renders in | the day's balance block, **when `restDayPay > 0`** — unchanged from the shipped condition |
| Trace | `legal.md` §5 **R8** (Lei 605 art. 7º "a" + Súmula 172 reach the overtime terms); §5 **R9** (Súmula 60, I reaches `nightPay`: *"integra o salário do empregado para todos os efeitos"*); §9.1 **C4**; §8.1 and §8.7 (the base is `firstTierPay + extraTierPay + nightPay`, the divisor is dias úteis, the multiplier is the Sundays) |

**This is F2's fix and the one citation no other agent was permitted to invent.** The shipped caption
names Súmula 172 alone over a base that includes the night premium. Three norms in, three terms
covered, and the sentence names which parcelas it is talking about instead of saying *"estes
extras"* over a base that is wider than the extras (lesson 049: name the subject).

The two clauses the shipped string already carried — the monthly repetition assumption and *"conta
só os domingos. Feriados não entram."* — are preserved verbatim in substance and remain traced to
`legal.md` §8.1 (DSR) step 2 and §8.7.

#### `D-2` — the DSR row label (`:225`)

| | |
|---|---|
| Text | `DSR sobre extras e noturno` |
| Chars | **26** (shipped: `DSR sobre os extras`, 19) |
| Renders in | the same condition as `D-1`, `restDayPay > 0` |
| Trace | `legal.md` §8.1 DSR step 1 (the base is three parcelas); §9.1 **C4** |

**Why a label change is in scope.** The label describes the base, and the base includes `nightPay`.
Leaving it at *"sobre os extras"* while the caption below it cites Súmula 60, I puts two adjacent
strings in contradiction over the same number, which `AGENTS.md` §5 names as the defect a rename
manufactures. `product-designer` owns whether 26 characters clear the value column at 390 px; if
they do not, the routing is `tech-lead`'s, and the fallback is **not** the shipped label — a shorter
correct label is (`DSR de extras e noturno`, 23).

#### `D-3` — the night-premium floor (new paragraph in the balance block)

| | |
|---|---|
| Text | `Os 20% do adicional noturno são o mínimo da CLT (art. 73, caput). A sua convenção coletiva pode prever um adicional maior.` |
| Chars | **122** |
| Renders in | **every state in which the row `Adicional noturno 20%` renders — which is unconditional in the day's balance block, including when the night minutes are zero** |
| Trace | `legal.md` §5 **R15** (the caput says *"pelo menos"*, so 20% is a floor); §11 **D4**; `PRODUCT.md` §9 (the night-shift row) |

**The rendering condition is derived from the claim, not from the slot** (lesson 047). The string
`Adicional noturno 20%` is in the DOM whenever the balance block renders, zero minutes or not, so the
qualification of that 20% renders there too. A disclosure gated on `nightMinutes > 0` would be absent
in exactly the state where the unqualified `20%` is the only thing on screen.

**No deixis** (lesson 049): the subject is *"os 20% do adicional noturno"*, which exists wherever this
paragraph does; the string contains no *acima*, *ao lado* or *este valor* and survives any placement
`product-designer` chooses inside the block. `legal.md` §11 fixes the block — *"Adjacent to the
night-premium line, in the same visual block, not in the footer"* — and forbids moving it into a
tooltip, a popover, an expandable or a `title`.

### Custo da Hora — `components/organisms/salary-calculator.tsx`

#### `S-1` — the panel subtitle (`:85-88`)

| | |
|---|---|
| Text | `Descubra quanto vale cada hora do seu trabalho, já com os descontos. A hora extra da aba Jornada é calculada sobre a hora normal (art. 59, §1º, da CLT), que é a sua hora bruta, sem descontos.` |
| Chars | **191** (shipped: 163) |
| Renders in | every state of `/custo-da-hora` and of the Salário view on `/` |
| Trace | `legal.md` §5 **R13**, clause 3 (*"The base named by both norms is 'a hora normal' ... Neither norm uses the words 'hora bruta'"*); §9.1 **C13** |

The shipped string says the overtime is computed *"sobre a hora bruta, como manda o art. 59, §1º"* —
the substance is right and the norm does not use that word. The fix quotes the norm's term, then
explains it in the same breath for a reader who has never met it, which is the only way a domain term
is allowed into this app's copy. *"como manda"* is dropped because the norm mandates the **hora
normal**, not the app's rendering of it.

#### `P-1` — the "Ano" approximation (new, in the hero panel)

| | |
|---|---|
| Text | `O valor do Ano soma 12 meses mais o 13º salário (art. 7º, VIII, da CF; Lei nº 4.090/1962). É uma aproximação: o 13º tem INSS e IRRF próprios, descontados à parte.` |
| Chars | **162** |
| Renders in | **only when `Ano` is the selected period** in `components/molecules/period-selector.tsx`; the subject — the Ano value in `HeroPanel` — exists in no other state |
| Trace | `legal.md` §5 **R16** (CF art. 7º, VIII; Lei nº 4.090/1962, art. 1º and §1º); §9.1 **C18**; §11 **D6**; §12 (the 13º's own INSS and IRRF are not computed); §13 (the imprecision is *not accepted — disclosed instead*) |

**Both halves of D6 are here and neither is optional.** `PAID_MONTHS_PER_YEAR = 13` asserts a legal
entitlement *and* an arithmetic simplification: the entitlement is cited, and the simplification is
named as one. *"descontados à parte"* is the plainest true statement of §12's *"the 13º has its own
INSS and its own IRRF, withheld separately"* — it says the year figure is approximate without telling
the reader what to do about it (`PRODUCT.md` §7).

`legal.md` §11 D6 requires it *visible when "Ano" is the selected period*, and forbids a tooltip or a
control the user must operate. The hero panel renders `text-ink-onfill` on a filled surface;
**whether a caption at that contrast and size clears AA in both themes is `product-designer`'s**, and
it is the one open question this string carries into G4.

### Avisos de limite da CLT — `lib/compliance.ts`

All four are the `detail` of a `ComplianceWarning`; the `title` of each is **unchanged** (they carry
no norm and no figure derived from a table, so A1–A4 does not reach them — `spec.md` § *The domain
test*). `C-1`'s body is under the `alert-legibility` guard as consumer `C5`.

| # | `id` | Text | Chars | Change | Trace |
|---|---|---|---|---|---|
| `C-1` | `daily-overtime-limit` | `O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376, I, do TST). A irregularidade está na extrapolação, e a sanção recai sobre o empregador.` | **211** (207) | `Súmula 376` → `Súmula 376, I` | `legal.md` §5 **R10** (item I is *"não exime o empregador de pagar todas as horas trabalhadas"*; item II is a different rule); §9.1 **C8**; D-13 |
| `C-2` | `short-day-break` | `Jornada acima de 4 horas e de até 6 horas exige um intervalo de no mínimo 15 minutos (art. 71, §1º, da CLT). O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória (art. 71, §4º, da CLT).` | **207** (184) | `art. 71, §4º` added | `legal.md` §5 **R11** (§1º sets the interval; §4º is the only source of the 50% and of the word *indenizatória*); §9.1 **C9**; D-11 |
| `C-3` | `minimum-lunch-break` | `Jornada acima de 6 horas exige no mínimo 1 hora de intervalo (art. 71 da CLT), que norma coletiva pode reduzir para 30 minutos (art. 611-A, III, da CLT). O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória (art. 71, §4º, da CLT).` | **252** (203) | `art. 611-A, III` and `art. 71, §4º` added | `legal.md` §5 **R11** (the 30-minute collective reduction is art. 611-A, III; art. 71's own §3º is a ministerial act on refeitório grounds and a reader following the citation to art. 71 will not find the rule); §9.1 **C10**; D-10, D-11 |
| `C-4` | `rest-between-shifts` | `O art. 66 da CLT garante no mínimo 11 horas seguidas de descanso entre duas jornadas. O tempo suprimido costuma ser pago como hora extra, por analogia (Orientação Jurisprudencial nº 355 da SBDI-1 do TST), e a irregularidade recai sobre o empregador.` | **249** (182) | the OJ named; `por analogia` added | `legal.md` §5 **R12** (the OJ's holding is that the art. 66 breach draws, *por analogia*, the effects of art. 71 §4º); §9.1 **C11**; D-12 |

**`por analogia` is not a hedge, it is the OJ's own mechanism.** `legal.md` §5 R12 notes the shipped
*"costuma"* is honest but that *"a hedge is not a citation"*. The word stays — the OJ is not a lei
and the sentence should not pretend otherwise — and it is now accompanied by the source and by the
reason the effect is borrowed rather than written in art. 66.

### The registry's `source` strings — `lib/legal-tables.ts`

`legal.md` §7 rules that *"`source` stays a human-readable norm name, in pt-BR, as it is today ...
Its wording at the gate is `content-writer`'s at G3; the norm it names is this table's and is not
negotiable."* One string per data set, in `legal.md` §7's row order. **The shape of the record is
`tech-lead`'s at G4** — these are the texts, not a schema.

| # | Data set | `source` text | Chars | `effectiveFrom` | Trace |
|---|---|---|---|---|---|
| `N-1` | `rgpsBrackets` | `Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II` | 63 | `2026-01-01` | §7 row 1; §5 R1 |
| `N-2` | `rgpsCeilingDiscount` | `Calculado sobre a tabela do INSS de 2026 (Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II)` | 106 | `2026-01-01` | §7 row 2; §6.1 — *derived; no norm contains the figure*, so the string says so instead of naming one |
| `N-3` | `rppsFederalBrackets` (alíquotas) | `Emenda Constitucional nº 103/2019, art. 11` | 42 | `2020-03-01` | §7 row 3; §5 R6 (art. 11 §7º: rates since 2020-03-01) |
| `N-4` | `rppsFederalBrackets` (faixas) | `Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo III` | 64 | `2026-01-01` | §7 row 4; §5 R6 |
| `N-5` | `incomeTaxBrackets` | `Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025` | 66 | `2025-05-01` | §7 row 5; §6.3 |
| `N-6` | `topIncomeTaxRate` | `Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025` | 66 | `2025-05-01` | §7 row 6 — *"it is that table's fifth row"*; repeated in full, never referenced |
| `N-7` | `simplifiedDeduction` (regra) | `Lei nº 9.250/1995, art. 4º, §2º` | 31 | `2023-08-28` | §7 row 7; §5 R3 |
| `N-7b` | `simplifiedDeduction` (operando) | `25% do teto da faixa isenta da tabela do IRRF de 2026` | 53 | `2025-05-01` | §6.4 — the value is `0,25 × 2.428,80` and moves the year the IRRF table moves |
| `N-8` | `dependentDeduction` | `Lei nº 9.250/1995, art. 4º, III, alínea "i"` | 43 | **`2015-04-01`** | §7 row 8; §5 R5 — *"this value is not a 2026 value and must not be attributed to a 2026 norm"* |
| `N-9` | `exemptionCeiling` | `Lei nº 9.250/1995, art. 3º-A, acrescido pela Lei nº 15.270/2025` | 63 | `2026-01-01` | §7 row 9; §5 R4 |
| `N-10` | `reduction` | `Lei nº 9.250/1995, art. 3º-A, acrescido pela Lei nº 15.270/2025` | 63 | `2026-01-01` | §7 row 10 |

**`N-2` and `N-7b` are the two derived values, and they read differently on purpose.** `legal.md`
§6.4 rules that each carries *"the norm of the rule and a note naming the operand it is derived
from, so the year the operand moves, the derived value is visibly stale."* `N-2` has no rule-norm at
all (the figure is the table's own total at the ceiling), so its string names the arithmetic and the
table. `N-7` has a rule-norm and `N-7b` names the operand beside it.

**Only `N-1`, `N-5`, `N-3` and `N-4` reach a screen today**, through `F-1`. The rest are read by the
next person to open the file — which is the audience `AGENTS.md` §8 writes the rule for. If a later
spec renders any of them, it renders the string in this table, with the `effectiveFrom` in this
table, and `N-8`'s is **2015**.

---

## Error and empty states

**This spec introduces no input, so it introduces no new way for input to be wrong** (`spec.md`
§ *Inputs and defaults*). The failure states reachable on these screens all belong to strings
outside this spec's domain (`spec.md` § *The domain test* excludes `lib/journey.ts`'s
`FIELD_MESSAGES` and the salário refusal banners: no norm, no number, no right).

They are listed because `PRODUCT.md` §5 makes silence a defect and because every one of them shares a
screen with a string this spec rewrites — the check is that none of them now contradicts a citation
it sits beside:

| State | Shipped string | Names the problem | Names the next action | Touched here? |
|---|---|---|---|---|
| Salário bruto vazio | *"Sem ele os valores abaixo continuam em R$ 0,00. Esse zero não é o seu salário, é a falta do dado."* | yes | yes — the field named in the title | no |
| Carga horária mensal vazia | *"Sem ela não dá para saber quanto vale a sua hora. Para a jornada de 8h48 por dia o divisor é 220 horas por mês."* | yes | yes | no — **0007 owns this surface** |
| Divisor incoerente | *"Pela Súmula 431 do TST, a jornada que você informou corresponde ao divisor ... horas por mês"* | yes | yes | no — **0007 owns the Súmula 431 attribution**, `spec.md` § *Boundary*, AC13 |
| Horários fora de ordem | `lib/journey.ts` `FIELD_MESSAGES` | yes | yes | no — out of the domain by construction |
| Avisos de limite da CLT | `C-1` … `C-4` above | yes | **deliberately not** | **yes** |

**Why the four compliance warnings name no next action, and why that is not a defect of the kind
`PRODUCT.md` §5 forbids.** §5's rule is about the app failing to answer — an impossible range, an
input it cannot parse. These four are the app answering: the journey crossed a legal threshold and
the number on screen is correct. The next action would be advice about the user's employment
relationship, which `PRODUCT.md` §7 forbids outright. What each does carry instead is **where the
irregularity sits** — *"a sanção recai sobre o empregador"*, *"o tempo suprimido é devido"* — which
is a fact about the norm, traced above, and not counsel.

---

## Disclosures

One row per obligation in `legal.md` §11, with the string that discharges it and the slot
`design.md` will place it in. **The wording is mine; whether the disclosure appears is not**
(`legal.md` §1: *"if any string listed in §11 ships without its disclosure ... G6 rejects"*).

| # | Obligation | String | Slot | Rendering condition, as the string requires it |
|---|---|---|---|---|
| **D1** | 50% is the floor for every extra hour, naming CF art. 7º XVI and CLT art. 59 §1º; 100% is collective, not statutory; and no assertion that no law doubles the adicional | `J-1` | hint of *Adicional acima de 2h (%)*, `journey-form.tsx:157`, associated by the shipped `aria-describedby` | visible in the field's own hint at 390 px in both themes, without truncation and not behind a disclosure control |
| **D2** | the post-05:00 prorrogação is **not** computed, naming Súmula 60, **II** | `F-2` | inside the *"Não entram na conta"* paragraph, where it already sits | rendered text in the footer paragraph; never a tooltip; never moved into a list of what the app applies |
| **D3** | the ladder is federal and does not apply to a state or municipal servidor; nothing about what their rate typically is — restated at `legal.md` §16.1 as **D3.1** (domain) and **D3.4** (content), because `R-2` alone was ruled not to discharge it | `R-3`, new caption. `R-2` still carries an equivalent sentence but is **released from D3** and bound only by §12 (`legal.md` §16.1) | `R-3`: new `<p>`, sibling to the `CollapsiblePanel`, inside `regime-field.tsx`'s `<fieldset>` (`design.md` §8 slot **S6**). `R-2`: unchanged, `regime-field.tsx:59` | `R-3`: present in every state where `value === "estatutario"` — first paint, panel open or closed, ≥ 1 000 ms after the selection gesture, and after `reload()` with the regime persisted (`legal.md` §16.1 **D3.2**). `R-2`: unchanged, visible only while the panel is open |
| **D4** | 20% is the floor, not the rate, and a convenção coletiva may set more | `D-3` | new paragraph in the day's balance block, beside the night-premium line | renders in every state the string `Adicional noturno 20%` renders in, which is unconditional in that block |
| **D5** | each norm renders with its own effective date; no date is attached to a neighbour's norm | `F-1` | the footer's citation paragraph | each norm name and its date sit in the same clause, separated from the next citation by a full stop, so no line break can pair a norm with a neighbour's date |
| **D6** | the Ano figure is 12 months plus the 13º, cited, and is an approximation because the 13º is withheld separately | `P-1` | hero panel, beside the period selector | visible when `Ano` is the selected period — reached by selecting it, not inferred |
| **D7** | the convenção coletiva gap survives every rewording | `F-2`, unchanged clause | the same paragraph | unchanged from today; re-read at this run and carried verbatim |

**The standing constraint on all seven** (`legal.md` §11): none may be moved into a tooltip, a
popover, an expandable, a `title` attribute or any control the user must operate — including the two
that are new. A gap the user has to click to discover has not been named.

**Two of the seven did not previously exist on any surface** (`D-3`, `P-1`), and both land in slots
that are currently full. That is the reconciliation `product-designer` is owed and the reason the
message at the top of this run went out before this file was finished.

---

## What is legally irreducible in each string

Which clause dies first if a budget cannot hold a string — so that a trim is a decision with a named
cost rather than a developer's judgement. **Every row's last column is a clause `legal.md` requires;
cutting it is a G6 rejection, not a copy edit.**

| String | Cut first | Cut second | Never cut |
|---|---|---|---|
| `F-1` | `Tabelas usadas nos cálculos:` (the lead-in) | nothing | any norm name, any effective date, the pairing of each date with its own norm (D5) |
| `F-2` | nothing | nothing | `, II,` (D2) |
| `R-2` | the whole EC 103 art. 9º §4º clause, ending at *"do seu ente."* (294 chars) | nothing | *"Servidor estadual ou municipal não entra nesta tabela"*; `até 22%` (AC8). **No longer bound by D3** (`legal.md` §16.1) — only by §12 |
| `R-3` | the citation `(EC nº 103/2019, art. 9º, §4º)` and the clause it supports, *"cujo ente fixa a própria tabela"* — both optional under D3.4 | nothing | *"A tabela do RPPS federal"* named as the subject, and *"não se aplica a servidor estadual ou municipal"* (D3.1, D3.4) |
| `J-1` | nothing | nothing | the pair of norms, `inclusive depois da 2ª`, and the collective origin of the 100% (D1) |
| `D-1` | *"Feriados não entram."* | the monthly-repetition clause | the three norms and the naming of both parcelas (C4, F2) |
| `D-3` | *"A sua"* → *"Sua"* (2 chars; a real trim, and the only one available) | nothing | `mínimo`, `art. 73, caput`, and the convenção coletiva clause (D4) |
| `P-1` | nothing | nothing | the citation, `É uma aproximação`, and the separate withholding (D6) |
| `S-1` | *"sem descontos"* | nothing | `hora normal` and `art. 59, §1º, da CLT` (C13) |
| `C-1`…`C-4` | nothing | nothing | every norm added at this run; they are the findings |

---

## Guards run against these strings

Per lesson 022, mandated text is a payload with a destination: every automated check that reads the
destination file was executed against these strings, not reasoned about. Commands and output:

**1. `__tests__/copy-guards.test.ts` — "no user-visible em-dash or en-dash survives"**, over every
`.ts`/`.tsx` in `app/`, `components/`, `lib/`, excluding comment lines. Regex `/[—–]/` executed
against all 31 strings, `R-3` included: **zero matches.**

**2. `__tests__/copy-guards.test.ts` — "no descriptor qualifies the night premium as complete"**,
regex `/completo|todas as regras da CLT|todos os casos|qualquer jornada noturna|Súmula 60|prorrogaç/i`
over `DESCRIPTOR_SOURCES` = `app/page.tsx`, `app/opengraph-image.tsx`, `app/twitter-image.tsx`,
`lib/og-image.tsx`, `lib/calculator-view.ts`. **Two strings match the regex — `F-2` (`Súmula 60`,
`prorrogação`) and `D-1` (`Súmula 60`) — and neither is a violation, because neither destination is
in that list**: `F-2` goes to `components/organisms/calculator-views.tsx` and `D-1` to
`components/organisms/day-summary.tsx`. The proof that the guard does not reach them is that `F-2`
**ships today** with both words in it and the suite is green. **No string in this file lands in any
of the five descriptor sources**, which is what keeps that true.

**3. `__tests__/copy-guards.test.ts` — "`lib/` never calls R$ 8.475,55 the contribution"**:
`lib/payroll.ts` must not contain `teto de contribuição` or `teto do INSS`. `R-1` and `R-2` are the
two strings that go into that file; `includes()` for both literals against both strings returns
`false` for all four combinations. (`R-1` and `R-2` say *teto do salário de contribuição*, which is
the correct term and does not contain either banned literal.)

**4. `__tests__/copy-guards.test.ts` — descriptor compensation/accumulation ban and the `saldo`
scope rule**: no string matches, and none lands in a descriptor source regardless.

**5. `tests/e2e/disclosure-legibility.spec.ts` — `assertLr2b` on the footer and on every `<p>`
inside it.** Not executed here: it needs a browser, and per `AGENTS.md` §4 rule 6 a build during a
parallel gate belongs in an isolated copy. **This is stated as owed, not as passed.** The shape
decision that keeps it satisfiable — one citation paragraph rather than three — is argued in
§ *Slots and budgets* and is the thing `product-designer` re-measures.

**6. Assertions in the suite that pin a string this file changes.** They inherit the change; per
`legal.md` §9.1 C19, none of them becomes a second source of truth and none is repaired by restoring
the old copy:

```
$ grep -rn "DSR sobre os extras|Súmula 172|Súmula 376|Súmula 60|Não existe lei|Tabelas de INSS e IRRF" __tests__/ tests/
__tests__/day-summary.test.tsx:179   expect(screen.getByText("DSR sobre os extras"))        → D-2
__tests__/day-summary.test.tsx:195   expect(screen.queryByText("DSR sobre os extras"))      → D-2
__tests__/day-summary.test.tsx:180   getByText(/Súmula 172 do TST/)                         → D-1
__tests__/day-summary.test.tsx:187-188  caption toHaveTextContent("Súmula 172 do TST")      → D-1
__tests__/compliance.test.ts:61      overtime.detail toContain("Súmula 376 do TST")         → C-1
__tests__/calculator-views.test.tsx:82,93  toHaveTextContent("Súmula 60 do TST")            → F-2
__tests__/journey-form.test.tsx:216  getByText(/Não existe lei que dobre o adicional .../)  → J-1
__tests__/calculator-views.test.tsx:100  /Tabelas de INSS e IRRF de 2026, em vigor desde .../ → F-1
__tests__/calculator-views.test.tsx:103  "https://www.legisweb.com.br/legislacao/?id=489284"  → F-1a..d, AC1
```

`__tests__/journey-form.test.tsx:216` is the one worth naming twice: it asserts the **retired
non-claim** as expected behaviour. Like `calculator-views.test.tsx:103` for the aggregator URL
(C19), it is a non-shipping surface carrying the claim, and it is in scope.

**7. Addendum, run 2 — `R-3` is not yet in the tree, so its checks are the guard files' own regexes
run against the string directly, not the suite.** `R-3` does not touch `lib/payroll.ts`, so guard 3
does not apply to it; guards 1, 2 and 4's patterns were run against the exact 136-character string:

```
$ node -e '
const s = "A tabela do RPPS federal não se aplica a servidor estadual ou municipal, cujo ente fixa a própria tabela (EC nº 103/2019, art. 9º, §4º).";
console.log(/[—–]/.test(s));                                             // guard 1
console.log(/completo|todas as regras da CLT|todos os casos|qualquer jornada noturna|Súmula 60|prorrogaç/i.test(s)); // guard 2
console.log(/compensaç|compensar|acúmul|acumul|banco|crédito de horas|débito de horas|horas a compensar|saldo do mês|saldo mensal|histórico|registro de ponto|controle de ponto|folha de ponto|espelho de ponto/i.test(s)); // guard 4
console.log(/saldo(?!\s+(do dia|diário|de hoje))/gi.test(s));            // guard 4
'
false
false
false
false
```

Also checked and absent: `14%`, `muitas vezes`, and every deictic lesson 049 forbids (`acima`,
`abaixo`, `ao lado`, `este valor`, `o número acima`). **Whichever component `frontend-dev` writes
`R-3` into, re-run the real suite once it lands** — this is a pre-check against the string, not a
substitute for guard 3 if `R-3`'s file ever imports anything from `lib/payroll.ts`.

---

## Metadata

**Not touched by this spec.** `app/layout.tsx`, `app/manifest.ts`, `app/page.tsx`,
`app/custo-da-hora/page.tsx`, `lib/structured-data.ts` and `lib/og-image.tsx` carry no norm as an
authority for a number; `spec.md` § *The domain test* excludes them by construction (`"CLT"` used as
a search term, not as an authority), and `legal.md` §3 re-tested the exclusion at G2 and confirmed it
holds. No metadata string is written, changed or re-published here.

The one constraint this spec puts on them is negative and is already enforced: the copy guard in
§ *Guards*, item 2, forbids `Súmula 60` and `prorrogaç` in exactly those files, so the D2 citation
must not migrate into a description or an `alt` while the footer is being edited.

---

## Rejected phrasings

| Considered | For | Why it lost |
|---|---|---|
| *"A lei não escalona o adicional depois da 2ª hora"* | `J-1` | The retired universal negative in other words. `legal.md` §12's binding note closes the claim, not the vocabulary |
| *"o piso continua sendo 50%"* | `J-1` | Same. *Continua* asserts that nothing changes after the second hour, which is the negative restated as a verb |
| *"a alíquota do seu ente costuma ficar na faixa da União"* | `R-2` | Uses no forbidden word and reproduces the non-claim exactly. Written down deliberately, per §12's instruction to try it, as proof the rule's test is about what the sentence asserts |
| *"não pode ser menor que a da União"*, stopping there | `R-2` | A truncation of EC 103 art. 9º §4º that is **stronger than the norm** and false for an ente with no actuarial deficit. If the clause will not fit, it is cut whole |
| Three separate `<p>` in the footer, one per table | `F-1` | Each would wrap to 2–3 line boxes with a short trailing line and fail the ≥ 40 cpl floor the footer already enforces |
| *"faixas de 2026 da mesma Portaria"* as link text | `F-1d` | Deixis in an anchor: a link list read out of context resolves to nothing (lesson 049) |
| *"(fonte)"* / *"ver norma"* as anchor text | `F-1a`…`F-1d` | `PRODUCT.md` §4 is *cite or omit*; an anchor that does not name the norm cites nothing, and `spec.md` § *Non-goals* forbids softening a citation |
| *"O DSR (Súmula 172 do TST) supõe que estes extras..."*, adding the two norms in the parenthesis | `D-1` | Leaves *"estes extras"* describing a base that includes the night premium. The sentence had to name the parcelas, not only the norms |
| *"OJ-SDI1 nº 355 do TST"* | `C-4` | The identifier `legal.md` §4 uses in its own table, and pure jargon on a phone. `legal.md` §5 R12 gives the written-out form, which is what ships |
| *"Adicional noturno 20% (piso)"* as the row label | `D-3` | Compact and it fits, but it discharges only half of D4: it never says a convenção coletiva may set more |
| A *"ver todas as fontes"* link under `F-1` | `F-1` | `spec.md` § *Non-goals*, first item |
| *"A tabela do RPPS federal é só para o servidor federal; não se aplica a servidor estadual ou municipal."* (102 chars) | `R-3` | Correct content, but 102 sits in the gap `design.md` §7 S6 names between `[80,100]` and `[120,150]` — 2 chars short of the lower window, into the zone the 112-char probe already failed |
| *"A tabela do RPPS federal não se aplica ao servidor estadual ou municipal, que segue a tabela do próprio ente."* (109 chars) | `R-3` | Same gap, 109 chars |
| *"A tabela do RPPS federal vale só para o servidor federal. Estadual ou municipal segue a tabela do próprio ente."* (111 chars) | `R-3` | Same gap, 111 chars — drops *"servidor"* before *estadual ou municipal* to save two characters and still lands short |
| *"A tabela do RPPS federal não se aplica a servidor estadual ou municipal: cada um segue a tabela do próprio ente."* (112 chars) | `R-3` | The exact length `design.md` §7 S6 measured and rejected at 37,33 cpl |
| *"A tabela do RPPS federal não vale para servidor estadual ou municipal: cada ente fixa a tabela do seu próprio regime."* (117 chars) | `R-3` | Same gap, 117 chars |
| *"Esta tela mostra a tabela do RPPS federal, que não se aplica..."* | `R-3` | Opens on *"esta tela"*, a deictic reference to the surface rather than to the ladder itself — lesson 049 asks for the noun the disclosure qualifies, not the screen it sits on |

---

## What this file does not decide

- **The shape of the registry record** in `lib/legal-tables.ts` — a list of sources per data set,
  each with its own `effectiveFrom` (`legal.md` §7). `tech-lead`'s at G4. This file gives the texts.
- **Where `D-3` and `P-1` sit** inside the blocks `legal.md` §11 fixes, and whether `P-1` clears AA
  on the filled hero surface. `product-designer`'s.
- **Whether `D-2`'s 26-character label clears the value column at 390 px.** `product-designer`'s;
  the fallback is a shorter correct label, never the shipped one.
- **How `7,5% a 14%` and `até 22%` are derived.** `tech-lead`'s at G4; this file fixes only that they
  render character-identical (AC8, and the reading of AC8 recorded under `R-1`).
