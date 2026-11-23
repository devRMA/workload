# 0010 — Copy

> Owner: content-writer · Gate: `copy` (G3) · Run 1 · **Verdict: explicit no-op**

**This gate writes no string, changes no string, shortens no string and adds no string.** Not because
nothing was examined — every string the layout change can move is inventoried below, with its
rendered text and its measured length — but because `legal.md` §6 (**L5**) settled that the remedy
needs zero new copy and mandated none, and `spec.md` freezes every word already shipped.

`.specs/templates/copy.md` still carries an `en` column and a `locales/` parity check. **There is no
i18n layer in this project and none is planned** (`AGENTS.md` §1, `PRODUCT.md` §7), so this document
follows the output contract in `.agents/agents/content-writer.md` instead. No string here has a
second language and none is keyed.

---

## 1. Why the gate is a no-op, traced

Four independent sources close it, and each one alone would be enough:

| # | Source | What it says | Effect on this gate |
|---|---|---|---|
| 1 | `legal.md` §6, **L5 settled** | *"This gate mandates no string. `spec.md` AC5's exemption list from G2 is EMPTY, deliberately."* | The only channel through which G2 can hand `content-writer` work at this spec is empty. |
| 2 | `legal.md` §6 | *"**A 34.8 px whole surface exists.** A remedy that relocates one of these whole satisfies R with **zero new copy**, zero rewording and zero `0003` interaction."* | R is satisfiable without a character being written. Writing one anyway would be inventing work. |
| 3 | `legal.md` §0, *Explicitly not covered* | *"**What a disclosure says.** … `0003`'s citation registry and `0007`'s Súmula 431 scope."* | The wording of every in-domain surface belongs to `0003`/`0007`, not to this spec. |
| 4 | `spec.md` § Out of scope 1, 2, 3 and § Non-goals | No rendered number changes · no disclosure string changes · no new disclosure surface · **"Any new pt-BR string — including a 'carregando', a badge, a skeleton label or a caveat next to the hero"** · *"Shortening a disclosure so it fits"* is *"a legal change wearing a layout costume (lesson 002)"* | Every category of string this gate could produce is forbidden by name. |

**This spec is a geometry change.** AC4 and AC5 are `diff`s asserting that the rendered text is
byte-identical before and after. A non-empty diff over any string below is a rejection, and this
gate's whole contribution is to state, in advance and in writing, that **nothing textual is in
flight**, so `plan.md` can budget for zero copy tasks and `qa-engineer` can read any text delta as a
defect rather than as an accepted side effect.

### 1.1 — §8's LR3.5 checked against §6: no conflict, no blocker

The lead flagged that a string forced to change by **LR3.5** would be a conflict with §6 and a
blocker back to `labor-law-analyst`, not a copy decision. **Checked, clause by clause, and it does
not arise.**

LR3.5's predicate (`legal.md` §8.1) is *"there exists a scroll position … at which the surface's
whole border box lies inside the viewport and no element whose computed `position` is `fixed` or
`sticky` has a border box that intersects it"*, and its stated quantity is
*"`getBoundingClientRect()`, border box, on both elements"*. **Every operand is geometric.** No
clause of it reads a character count, a word, a line count or a string's content. A surface satisfies
or breaches it with its text unchanged.

Its one live failing subject is **F1 — DS1 P4**, short by **14.2 px** of scroll on `/` and **13.6 px**
on `/custo-da-hora` (`legal.md` §8.1, §12). `legal.md` §12 names the remedy: *"flow height **below the
footer**"*. That is document height, not copy. **Shortening DS1 P4 to buy those pixels is available
and is forbidden**, twice: `legal.md` §6 (*"Shortening an existing surface to fit remains
forbidden"*) and `spec.md` § Non-goals (lesson **002**). DS1 P4 is also the line that carries the
table year, which `PRODUCT.md` §4 makes part of the answer — so it is the string in the inventory
least eligible for a trim, not the most.

**Conclusion: LR3.5 obliges no textual change. Nothing is routed back to `labor-law-analyst`.**

---

## 2. Strings this spec's layout change may move — frozen, verbatim

Every string below is **already shipped**. The change may relocate it, reorder it, or change the box
it renders in; it may not alter one character of it. Lengths are the rendered pt-BR text, counted in
Unicode code points, so `design.md` can size a slot without re-measuring. Where a string interpolates
a value, the counted instance is named.

**LR1/LR2a/LR2b/L4 are not restated here** — `legal.md` §5 owns the width floors, and `design.md`
owns which container each surface lands in. The lengths are input to that decision, not a claim
about it.

| Slot | File · role | Rendered text | Chars | Trace |
|---|---|---|---|---|
| **DS1 P1** | `components/organisms/calculator-views.tsx` · footer ¶1 | *Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor, e ninguém além de você vê seus horários ou seu salário.* | **150** | `legal.md` §6 table (candidate whole surface, 52.2 px) |
| **DS1 P2** | same · footer ¶2 | *Os valores são uma estimativa para você se organizar. Não substituem seu holerite, não valem como registro oficial de ponto e nada aqui é orientação jurídica ou contábil.* | **170** | `legal.md` §6 table (52.2 px) |
| **DS1 P3** | same · footer ¶3, the gap list | *Não entram na conta: FGTS, benefícios e adicionais da sua convenção coletiva, o 13º salário e o terço de férias, a incidência de INSS e IRRF sobre as horas extras, a prorrogação da jornada noturna depois das 5h (Súmula 60 do TST), feriados, o valor do intervalo suprimido e o adicional de insalubridade ou periculosidade. O regime Estatutário usa a tabela do RPPS federal e não vale para servidor estadual ou municipal.* | **419** | `legal.md` §6 table (139.1 px); `PRODUCT.md` §4 *name the gap* |
| **DS1 P4** | same · citation line, interpolates `CURRENT_LEGAL_YEAR` | *Tabelas de INSS e IRRF de 2026, em vigor desde 01/01/2026 · Portaria Interministerial MPS/MF nº 13, de 09/01/2026* | **113** | `lib/legal-tables.ts:45-48`; `legal.md` §6 table (**34.8 px — the smallest whole surface**), §8.1 F1 |
| **DS2** | `components/organisms/day-summary.tsx:233-235` · DSR caption, renders only when `restDayPay > 0` | *O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês e conta só os domingos. Feriados não entram.* | **134** | `legal.md` §8.1 (passes LR3.5, `/` seeded); `STATUS.md` debt **DS2** |
| **DS7 — art. 59** | `lib/compliance.ts:34` · rendered via `AlertBanner`, `day-summary.tsx:251` | *O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST). A irregularidade está na extrapolação, e a sanção recai sobre o empregador.* | **207** | `legal.md` §2 R6 (CLT art. 59, caput, verbatim); §8.1 (passes LR3.5) |
| **DS7 — art. 71 §1º** | `lib/compliance.ts:47` · same | *Jornada acima de 4 horas e de até 6 horas exige um intervalo de no mínimo 15 minutos (art. 71, §1º, da CLT). O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória.* | **184** | `legal.md` §8.1 (passes LR3.5) |
| **DS7 — art. 71** | `lib/compliance.ts:56` · same | *Jornada acima de 6 horas exige no mínimo 1 hora de intervalo (art. 71 da CLT), que norma coletiva pode reduzir para 30 minutos. O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória.* | **203** | `legal.md` §8.1 (passes LR3.5) |
| **DS4 — heading** | `components/organisms/cookie-consent.tsx` · banner `h2` | *Respeitamos sua privacidade* | **27** | `legal.md` §4.2 (measured: 24px, 2 line boxes, 60 px) |
| **DS4 — body** | same · banner `p` | *Usamos cookies para melhorar sua experiência e entender como você usa o WorkLoad. Você pode optar por desativar a telemetria a qualquer momento.* | **144** | `legal.md` §4.2 (14px, 4 line boxes, 36.0 cpl residual), §4.4 clause 1 |
| **DS4 — controls** | same | *Configurar* (10) · *Recusar* (8) · *Aceitar Tudo* (12) | 10 / 8 / 12 | `legal.md` §4.4 clauses 2–3; **equal prominence, 14 016 px² each** |
| **DS5 — title / body** | `components/organisms/salary-calculator.tsx:133`, body `:136-139` · `monthlyHours=0` | *Informe a carga horária mensal* / *Sem ela não dá para saber quanto vale a sua hora. Para a jornada de 8h48 por dia o divisor é 220 horas por mês.* | **30** / **111** | `spec.md` § Problem (DS5, `vtop` 1233.9) |
| **DS6 — title / body** | `salary-calculator.tsx:147`, body `:150-154` · incoherent state, interpolates both divisors | *A carga mensal não combina com a jornada diária* / *Pela Súmula 431 do TST, a jornada que você informou corresponde ao divisor 220 horas por mês, e não 240. Usar um divisor maior do que o devido reduz o valor de cada hora sua.* | **47** / **174** (at 220 / 240) | `spec.md` § Problem (DS6); `0007` owns the Súmula 431 wording |
| **CA** | `components/organisms/journey-form.tsx:142` · `hint`, unmounted on load | *O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT).* | **83** | `legal.md` §3.2 (LR domain, clause a), §2 R6 |
| **CB** | `journey-form.tsx:157` · same | *Não existe lei que dobre o adicional depois da 2ª hora: o piso continua sendo 50%. Só use 100% se a sua convenção coletiva previr esse degrau.* | **142** | `legal.md` §3.2 (clauses a and b), §2 R6 |
| **CC** | `components/molecules/regime-field.tsx:83` · same | *O regime muda só o cálculo do INSS. O IRRF segue a mesma tabela para os dois.* | **77** | `legal.md` §3.5 (clause **d**, Applicability) |
| **CD** | `lib/payroll.ts:24` → `regime-field.tsx:78` · interpolates the RGPS ceiling, its discount and the table year | *INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. O teto do salário de contribuição é R$ 8.475,55: acima disso o desconto trava em R$ 988,09 (tabela de 2026).* | **166** | `legal.md` §3.2 (clause a); `lib/legal-tables.ts:41,45,50` |
| **CE** | `lib/payroll.ts:32` → `regime-field.tsx:78` | *Aplicamos a tabela do RPPS federal: a contribuição não para no teto do salário de contribuição que vale para a CLT e as faixas seguem subindo até 22% sobre a parcela mais alta. Servidor estadual ou municipal tem alíquota própria (muitas vezes 14% linear), então este número não vale para ele.* | **292** | `legal.md` §3.2 (clauses a and b); `lib/legal-tables.ts:51-57` |

**Nineteen strings, zero edits.** The list is the scope of AC4/AC5's `diff` seen from the copy side:
if the `diff` is non-empty over any row here, a gate downstream changed a string this gate froze.

### 2.1 — Deixis check, run because a relocation is exactly what breaks it

Lesson **049** (`content-writer`, `copy`): *a disclosure must name what it qualifies, never point at
it, because it renders in the states its own number renders in, not in the states its neighbour
does.* A spec whose entire content is **moving surfaces** is the spec that turns a latent deictic
reference into a broken one. So every frozen string was read for deixis to a sibling element:

| String | Deictic reference to a neighbour? |
|---|---|
| DS1 P1–P4, DS4 heading/body, CC, CE | **None.** Each names its own subject (*o que você digita*, *os valores*, *o regime*, *a tabela do RPPS federal*). Relocatable anywhere without a referent breaking. |
| DS2 | ***estes extras*** — points at the *DSR sobre os extras* row above it, in the same block. **Not free to relocate alone.** DS2 already renders only when `restDayPay > 0`, the same condition as the row it points at, so the reference holds **in its current container**; moving DS2 without that row breaks it. |
| DS5, DS6 | ***Sem ela*** → *a carga horária mensal* in its own title; *a jornada que você informou* → the user's input. Both resolve within the banner, which moves whole. |
| DS7 ×3 | Self-contained norm statements. |
| CA, CB, CD | Self-contained; each names its rate and its norm or its table. |

**One constraint for `design.md` and `plan.md`, and it is the only thing this gate constrains:**
**DS2 may not be separated from the *DSR sobre os extras* row it says *estes extras* about.** Moving
the pair together is free; moving DS2 alone would leave *estes* pointing at nothing, and it would do
so silently — the string still renders, still reads like Portuguese, and is simply about a row that
is no longer there. Fixing it afterwards would require rewording DS2, which § Out of scope 2
forbids, so it has to be a placement constraint rather than a copy fallback.

---

## 3. Error and empty states

**This spec introduces no user input** (`spec.md` § What "reachable" … means here) — no field, no
toggle, no setting — so it creates **no new way for the input to be wrong** and therefore no new
error state to word. The failure modes a user can reach are the ones already shipped, and each one
already names the problem and the next action:

| Reachable failure | String | Names the problem | Names the next action |
|---|---|---|---|
| `monthlyHours` absent | **DS5** | *Informe a carga horária mensal* / *Sem ela não dá para saber quanto vale a sua hora.* | *Informe…*, plus the worked reference *Para a jornada de 8h48 por dia o divisor é 220 horas por mês.* |
| `monthlyHours` incoherent with the daily journey | **DS6** | *A carga mensal não combina com a jornada diária* | the divisor the informed journey corresponds to, and what the wrong one costs: *reduz o valor de cada hora sua* |
| Inverted or impossible time range | `lib/journey.ts:19-36` (C4, the eight ordering messages) | unchanged | unchanged |
| Zero salary | `salary-calculator.tsx:124-126` (C1) | unchanged | unchanged |

**None of these is in this spec's remedy path and none is reworded here.** They are listed because
"silence is a defect" (`PRODUCT.md` §5) is checked at every G3, and the check's outcome this run is
that the existing coverage is intact and untouched.

**One state this spec does create, and it is deliberately wordless:** a disclosure that becomes
reachable in some storage states and not others. `spec.md` § Disclosure obligations 4 routes that to
`design.md` and to the G6 report as **a number**, not as a string — there is no "esta informação
aparece em outra tela" caveat to write, and writing one would be a new pt-BR string
(§ Non-goals).

---

## 4. Disclosures — the obligations `legal.md` raised, and their wording

`legal.md` raised **no disclosure whose wording is owed by this gate.** Each obligation it states is
discharged by an already-shipped string, and the wording is the shipped one:

| Obligation | `legal.md` | Discharged by | Wording owed here? |
|---|---|---|---|
| The table and its **year** are named wherever a number derived from it appears | §6, §8.2; `PRODUCT.md` §4 | **DS1 P4** (*…de 2026, em vigor desde 01/01/2026 · Portaria…*) and **CD** (*…(tabela de 2026)*) | **No** — both already name the year. F1 is about DS1 P4 being unreadable at rest, which is geometry. |
| LR6.1 pairs every claim with its disclosure, and **O is discharged by uncovering the claim, never by dropping its disclosure** | §8.3; `spec.md` § Disclosure obligations 5 | the existing pairs | **No** — this is a prohibition on deletion, not a string. |
| A split (short line above the fold + full text in the footer) | §6 **L5** | **not authorised** — the fragment would have to be independently in domain, and a 34.8 px whole surface exists | **No** — and if one is ever wanted, §6 routes it through a **G1 amendment**, not through this gate. |
| **LR4.4 clause 4** — a link to the art. 9º I–VII information with explicit mention of the art. 18 rights | §4.4; finding **F3** | **nothing — it does not exist in the app today** | **No, and this is the one to watch.** See §5. |

---

## 5. Two conditional triggers for `product-designer` and `tech-lead`

Neither is a blocker today. Both would make this gate's no-op wrong the moment a design choice fires
them, so they are written before `design.md` closes rather than discovered at G4.

**T1 — the art. 9º / art. 18 information link (LR4.4 clause 4, finding F3).** LR4.4 is binding and its
clause 4 is **not satisfied today**: there is no cookie policy, no privacy page and no link to one
(`legal.md` §4.1, §4.4, §12 F3). A link needs a **label**, and a label is a new pt-BR string, which
`spec.md` § Non-goals forbids by name. `legal.md` §12 routes F3 **out of this spec**, to a consent
spec, and notes it *"raises the floor rather than lowering it"* (+28 px, step C→D). **So: a remedy
that adds the link at this spec has created copy work this gate is forbidden to do.** If `design.md`
reaches for it, it is a G1 amendment, not a string request to `content-writer`.

**T2 — a request for a shorter string to make something fit.** `spec.md` § Boundaries names the
channel: *"If a remedy here needs a shorter string to fit, that request goes through `tech-lead` into
`0003` — never made here."* This gate will not shorten a shipped disclosure, and `legal.md` §6
forbids it independently. A slot that needs 40 characters fewer than the string it holds is a slot
that is the wrong size, or a surface that is the wrong choice; §6 already named the alternative —
**DS1 P4, 34.8 px, the whole surface that fits.**

---

## 6. Numbers and units

Unchanged, and that is the substance of the entry rather than a formality — AC4 makes any delta a
rejection. Recorded so a reviewer can check the formats without rendering the app:

| Quantity | Format as rendered | Where |
|---|---|---|
| Currency | `R$ 8.475,55` — `R$`, non-breaking-free space, thousands `.`, decimals `,`, always two | CD, CE, the answer rows, `lib/utils.ts` `formatCurrency` |
| Rates | `50%`, `7,5%`, `14%`, `22%`, `100%` — decimal comma, no space before `%` | CA, CB, CD, CE, DS7 |
| Hours and minutes | `8h48` (journey), `17:48` (clock time), `faltam 08:56:23` (elapsed), `220 horas por mês` (divisor) | DS5, the answer, DS6 |
| Dates | `01/01/2026`, `09/01/2026` — `dd/mm/aaaa`, from `formatIsoDate` (`lib/utils.ts:72-74`) | DS1 P4 |
| **The table year** | `2026`, stated in words next to the table it governs — *Tabelas de INSS e IRRF de 2026* and *(tabela de 2026)* | **DS1 P4, CD** |

**The year is part of the answer** (`PRODUCT.md` §4), and it is named in both places a table-derived
number surfaces. This gate changes neither, and flags that **F1 makes the DS1 P4 instance unreadable
at rest today** (`legal.md` §12) — the string is correct; its position is not. That is R's problem
and this spec's, and it is solved without touching the string.

---

## 7. Metadata

**Untouched.** This spec renders nothing new, changes no route and makes no claim a crawler reads.
`app/layout.tsx` (title, description) and `app/manifest.ts` (name, short name, description) are not
in `spec.md` § Scope's file list and are not edited. No `<title>`, no `og:` value, no manifest string
appears in this gate's output.

---

## 8. What `frontend-dev` gets from this gate

**Nothing to paste, and that is the deliverable.** Concretely:

1. **Zero copy tasks** in `plan.md`. AC5's exemption list is **empty** and `plan.md` states it as
   empty, so a reviewer can tell *"nothing exempted"* from *"nobody looked"* (`spec.md` AC5).
2. **Nineteen frozen strings**, §2, with their rendered text and lengths — the scope of the AC4/AC5
   `diff` seen from the copy side.
3. **One placement constraint**: DS2 travels with the *DSR sobre os extras* row it points at (§2.1).
4. **Two conditional triggers** that would create copy work if a design choice fires them, each with
   the channel it must arrive through (§5) — neither of which is this gate.
