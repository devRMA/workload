# 0012 — Legal analysis (G2)

**pass**

> Owner: labor-law-analyst · Gate: `law` · Run 1 · 2026-09-19
>
> Every norm below was fetched from a primary source **in this session**. Nothing is recalled.
> `.specs/0003-citation-registry/legal.md` §16.4 is my own earlier finding and is treated here as a
> claim to be re-executed, not as a settled fact — §3 records where this run confirms it, where it
> goes further, and the one place where it cited a superseded edition.

---

## 1. Verdict, and what it binds

**`pass`** — the eight legal dependencies **L1**–**L8** are settled below, and none of them requires
a fact the app does not already collect. Specifically:

- **H2 is not triggered.** My ruling does **not** require the folga compensatória as an operand. It
  requires the exact opposite: the app must stop assuming it, in both directions. **No new field.**
  The bounce to G1 that `spec.md` § Inputs and defaults holds in reserve does not fire.
- **H1 does not change the arithmetic ruling either way.** §12 states, in one row per possible human
  answer, what changes.
- The pipeline proceeds to **G3** (`product-designer` + `content-writer`, parallel), bound by §9
  (the disclosure clauses) and §10 (what the string must say).

This verdict is a `pass` on the **analysis**, not on the code. The code is wrong today and §11 lists
every divergence, by file and line, as instructions to `tech-lead`.

---

## 2. Scope of this analysis

**Covered.** The split of a single day's overtime minutes into the app's two priced tiers; every
money figure derived from that split; the norms that do and do not attach a consequence to the day
of the week; and the disclosure obligation that survives the correction.

**Explicitly not covered**, each with the reason and who owns it:

| Not covered | Why | Owner |
|---|---|---|
| The **value** of the second-tier rate (`DEFAULT_EXTRA_TIER_RATE = 100`) | Finding **L-2** / debt **D1**, already routed with an owner and a trigger. §11 **F5** restates it so nobody reads its absence here as closure, and §13 **Q2** keeps it open | `product-manager`, per `spec.md` Q1 |
| The DSR formula itself (`lib/weekly-rest.ts`) | Its input changes; its rule does not. §7 **L6** writes the row `spec.md` **AC6** requires and nothing more | debt **D2**, this file's §7 |
| `DEFAULT_WORK_MINUTES = 528` in `hooks/` | The same `AGENTS.md` §8 breach as the tier constant, on a different operand. Outside `spec.md` § In scope. §11 **F4** records it as a finding for routing, not as a mandate here | `tech-lead` |
| Night-shift minute counting, the ficta hour, INSS/IRRF | Untouched by this change. Measured unchanged in §5 | — |
| Súmula 60, II; holiday calendars; convenção coletiva lookup | `PRODUCT.md` §7 and `.specs/0001-foundation/legal.md` § Out of scope. §10 turns the first two into a **disclosure**, never into a computation | — |

---

## 3. How this was measured

| | |
|---|---|
| Copy | `rsync -a --exclude node_modules --exclude .next --exclude .git` → scratchpad; `cp -al` of `node_modules`; `rm -rf .next` |
| Snapshot | working tree of `fix/design-taste-preflight` at 2026-09-19 10:30. `git status --porcelain hooks lib components` shows **`hooks/use-work-calculator.ts`, `lib/weekly-rest.ts`, `lib/payroll.ts` and `components/organisms/day-summary.tsx` unmodified**; the `M` rows are sibling agents' in-flight work on other files (`lib/utils.ts`, `lib/duration.ts`, `lib/storage.ts`, `lib/salary-period.ts`, `hooks/use-salary-calculator.ts`, `components/organisms/salary-calculator.tsx`), each verified additive and none touching `formatCurrency` or the tier split |
| Arithmetic probe | `npx vitest run` in the copy, importing the **shipped** `calculateWorkStats`, `overtimePay`, `splitMonthDays`, `restDayPayOnOvertime` and `formatCurrency`. Not a re-derivation |
| Rendered probe | `pnpm build` (exit 0) + `next start -p 3733` in the copy, port confirmed free with `ss -ltn` before use. Playwright chromium, 390×844 and 1440×900, light and dark, `deviceScaleFactor: 1`, reading taken **1 400 ms** after `networkidle`. **Never `next dev`** |
| Machine hygiene | `uptime` before the browser run: load **3.91**, down from 6.62; `ss -ltn` showed **no** listener on any 3xxx port — spec 0008's `next-server` on 3411 had exited. Port 3733 released afterwards and confirmed |
| Repository | **not mutated.** Every probe, every edit and every build happened outside it |

### 3.1 A citation correction I owe to my own earlier run

`.specs/0003-citation-registry/legal.md` §16.4 cited the TST súmulas from
`…/LivroInternet+(6).pdf…?t=1691685168350` — the **2023** edition of the book, which **predates
Resolução nº 225, de 30.06.2025**, the largest single cancellation of súmulas since the Reforma.
That citation was not *wrong* about Súmulas 146 and 172 (§4 proves both survived), but it was a
citation to a superseded edition, and a reader checking it would have been checking the wrong file.
**Every TST citation in this document is to the 2025-07-17 edition**, and §4 prints the cancellation
list that edition reflects. §16.4 also cited the CLT and Lei 605 from `camara.leg.br/legin`; this
run re-fetched both from planalto and confirms the operative texts agree word for word.

---

## 4. Rules — every norm, fetched, with the unit executed

### 4.1 Effective-text hygiene

Three of the articles below were rewritten by **MP nº 905, de 11.11.2019** and the rewrites
**never became law**: MP 905 was revoked by **MP nº 955, de 20.04.2020**, and planalto marks each
one *"Vigência encerrada"*. **The text in force is the older one in every case.** This matters
enormously here, because MP 905's art. 70 said *"O trabalho aos domingos e aos feriados será
remunerado em dobro, exceto se o empregador determinar outro dia de folga compensatória"* — a clean
statutory doubling rule that an analyst working from memory could easily cite. **It is not law.**
Whoever reads this file next: do not reinstate it.

### 4.2 The rules

| # | Norm and unit | What it requires, precisely | Effective | Source |
|---|---|---|---|---|
| **N1** | **CF/88, art. 7º, XIII** | *"duração do trabalho normal não superior a oito horas diárias e quarenta e quatro semanais, facultada a compensação de horários e a redução da jornada, mediante acordo ou convenção coletiva de trabalho"* | 1988-10-05 | [planalto — CF](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) |
| **N2** | **CF/88, art. 7º, XV** | *"repouso semanal remunerado, preferencialmente aos domingos"* — a **preference**, not an assignment. It names no other day and attaches no rate to any day | 1988-10-05 | as above |
| **N3** | **CF/88, art. 7º, XVI** | *"remuneração do serviço extraordinário superior, no mínimo, em cinqüenta por cento à do normal"* — a floor over **every** extra hour, with no tier, no ceiling and **no weekday operand** | 1988-10-05 | as above |
| **N4** | **CLT art. 59, caput** (red. Lei 13.467/2017) | *"A duração diária do trabalho poderá ser acrescida de horas extras, em número não excedente de duas, por acordo individual, convenção coletiva ou acordo coletivo de trabalho."* A ceiling on the **quantity**. It fixes **where 120 minutes sits**; it fixes no rate | 2017-11-11 | [planalto — CLT](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm) |
| **N5** | **CLT art. 59, §1º** (red. Lei 13.467/2017) | *"A remuneração da hora extra será, pelo menos, 50% (cinquenta por cento) superior à da hora normal."* | 2017-11-11 | as above |
| **N6** | **CLT art. 59, §2º** (red. MP 2.164-41/2001) | acréscimo **dispensado** where the excess is compensated by a matching reduction, by acordo ou convenção **coletiva**, within one year, never past 10h/day | 2001-08-27 | as above |
| **N7** | **CLT art. 59, §3º** (red. Lei 13.467/2017) | uncompensated hours paid on rescisão at the rescisão-date remuneration | 2017-11-11 | as above |
| **N8** | **CLT art. 59, §4º** | **revogado** pela Lei 13.467/2017 | — | as above |
| **N9** | **CLT art. 59, §5º** (Lei 13.467/2017) | banco de horas by **acordo individual escrito**, compensation within six months | 2017-11-11 | as above |
| **N10** | **CLT art. 59, §6º** (Lei 13.467/2017) | *"É lícito o regime de compensação de jornada estabelecido por acordo individual, tácito ou escrito, para a compensação no mesmo mês."* **This is the unit a Saturday in a 44h week normally falls under** — the Saturday's hours are compensated by the longer Monday–Friday days | 2017-11-11 | as above |
| **N11** | **CLT art. 59-A e parágrafo único** (Lei 13.467/2017) | 12×36 by acordo individual escrito/CCT; the monthly remuneration **already covers** the DSR and the feriados, and the feriados *"serão considerados compensados"* | 2017-11-11 | as above |
| **N12** | **CLT art. 67, caput e parágrafo único** (original; MP 905's rewrite has *vigência encerrada*) | *"Será assegurado a todo empregado um descanso semanal de 24 (vinte e quatro) horas consecutivas, o qual, salvo motivo de conveniência pública ou necessidade imperiosa do serviço, deverá coincidir com o domingo, no todo ou em parte."* Parágrafo único: where Sunday work is required, an **escala de revezamento** is established — so the repouso lawfully falls on another day | 1943-05-01 | as above |
| **N13** | **CLT art. 70** (original, red. DL 229/1967; MP 905's rewrite has *vigência encerrada*) | *"Salvo o disposto nos artigos 68 e 69, é vedado o trabalho em dias feriados nacionais e feriados religiosos, nos têrmos da legislação própria."* A **prohibition**, not a rate | 1967-02-28 | as above |
| **N14** | **Lei nº 605/1949, art. 1º** (original; MP 905's rewrite has *vigência encerrada*) | *"Todo empregado tem direito ao repouso semanal remunerado de vinte e quatro horas consecutivas, **preferentemente aos domingos** e, nos limites das exigências técnicas das empresas, nos feriados civis e religiosos, de acordo com a tradição local."* | 1949-01-05 | [planalto — Lei 605/49](https://www.planalto.gov.br/ccivil_03/leis/l0605.htm) |
| **N15** | **Lei nº 605/1949, art. 7º, "a"** (red. Lei 7.415/1985) | the repouso is remunerated at one day of service, *"computadas as horas extraordinárias habitualmente prestadas"* — the statutory half of the DSR-over-overtime rule | 1985-12-09 | as above |
| **N16** | **Lei nº 605/1949, art. 9º** (original; MP 905's rewrite has *vigência encerrada*) | *"Nas atividades em que não for possível, em virtude das exigências técnicas das empresas, a suspensão do trabalho, nos dias **feriados** civis e religiosos, a remuneração será paga em dobro, **salvo se o empregador determinar outro dia de folga**."* Trigger: **feriado**, not a weekday. Defeated by a folga | 1949-01-05 | as above |
| **N17** | **Súmula nº 146 do TST** (incorporada a OJ nº 93 da SBDI-I) — Res. 121/2003, DJ 19, 20 e 21.11.2003; redação original RA 102/1982 | *"O trabalho prestado em **domingos e feriados, não compensado**, deve ser pago **em dobro**, sem prejuízo da remuneração relativa ao repouso semanal."* The subject is **o trabalho prestado** — the day's work, all of it — not the excess over the journey. Historical note in the same entry: *"é pago em dobro e não em triplo"* | 2003-11-19 | [TST — Livro de Jurisprudência, ed. 2025-07-17, SUM-146](https://www.tst.jus.br/documents/10157/63003/LivroInternet(11)pdf.pdf/814fe229-718f-541f-f73c-7a8b03ce47bc?t=1752769398191) |
| **N18** | **Súmula nº 172 do TST** — *(mantida)*, Res. 121/2003 | *"Computam-se no cálculo do repouso remunerado as horas extras habitualmente prestadas."* | 2003-11-19 | as above, SUM-172 |
| **N19** | **Resolução nº 225 do TST, de 30.06.2025** | cancels Súmulas 6 (itens), 90, 114, 152, 219, 228, 268, 277, 294, 307, 311, 320, 329, 331 (I), 366, 372 (I), 375, 377, 423, 426, 429, 437, 439, 444, 449, 450, 452 and several OJs/PN 100. **Neither 146 nor 172 is on the list**, and the 2025-07-17 edition prints 146 as *"(incorporada a OJ 93)"* and 172 as *"(mantida)"* — not as *"(cancelada)"*, the marker it uses for 145 and 147 on the facing lines | 2025-06-30 | [TST/JusLaboris — Res. 225/2025](https://juslaboris.tst.jus.br/bitstream/handle/20.500.12178/251919/2025_res0225.pdf?sequence=1&isAllowed=y) |

### 4.3 What no norm does

Swept for **the rule the code implements**, not only for the norms the code names: a search of the
CLT, Lei 605/49 and the CF for any unit attaching a **rate**, a **tier**, a **multiplier** or a
**premium** to *sábado* returns **nothing**. Saturday appears in Brazilian labour law only as the
day a 44-hour week is typically compensated away (**N10**, **N6**) — which is the *opposite* of a
premium day. The doubling norms (**N16**, **N17**) name **domingos e feriados**, and both are
defeated by compensation.

---

## 5. L1 — Saturday. Every operative unit, with a number beside it

Reference journey, chosen because it is `spec.md`'s and §16.4's, so the three runs are comparable:
entrada **08:00**, almoço **12:00–13:00**, saída **22:00**, jornada **8h48** (528 min), salário
bruto **R$ 15.000,00**, jornada mensal **220 h**. Worked **780 min**; overtime **252 min** (4h12);
hora bruta **R$ 68,18181818…** (15000 ÷ 220, unrounded).

| Operative unit | What it enacts here | Number it yields for this Saturday |
|---|---|---|
| **N4** — art. 59 *caput* | 252 min exceeds the 120-min ceiling → a **compliance warning**, which `lib/compliance.ts` already raises, identically on every weekday | **R$ 0,00.** Fixes a quantity, never a price |
| **N5** — art. 59 §1º | every extra hour at ≥ 150% of the normal hour | **R$ 429,55** (4,2 × 68,181818… × 1,5 = 429,545454…) |
| **N3** — CF art. 7º, XVI | the same floor, constitutionally | **R$ 429,55** — identical, by construction |
| **N6** — art. 59 §2º | compensated by acordo/convenção coletiva, ≤ 1 ano, ≤ 10h/dia. This day is 13h, so §2º's own 10h limit is breached and the dispensa does not apply | **R$ 0,00** of acréscimo where it does apply; here, no number |
| **N7** — art. 59 §3º | rescisão | not this screen |
| **N8** — art. 59 §4º | revogado | no number |
| **N9** — art. 59 §5º | banco de horas, 6 meses | **R$ 0,00** of acréscimo, if compensated |
| **N10** — art. 59 §6º | compensação no mesmo mês, acordo individual **tácito** — the ordinary 44h-week Saturday | **R$ 0,00** of acréscimo, if compensated |
| **N11** — art. 59-A | 12×36; the app has no regime field | not reachable |
| **N12** — art. 67 | the repouso *deve coincidir com o domingo* | Saturday is **not** the repouso. No number |
| **N14** — Lei 605 art. 1º | repouso *preferentemente aos domingos* | Saturday is **not** the repouso. No number |
| **N16** — Lei 605 art. 9º | dobra on **feriados** | a Saturday is not a feriado. **R$ 0,00** |
| **N13** — art. 70 | vedado o trabalho em feriados | a prohibition. No number |
| **N17** — Súmula 146 | dobra on **domingos e feriados** não compensados | Saturday is in **neither** class. Does not apply |
| **N2** — CF art. 7º, XV | *preferencialmente aos domingos* | no number |

**Fourteen units. Not one produces R$ 572,73.** The set of numbers the corpus yields for this
Saturday is `{R$ 0,00 ; R$ 429,55}`. The app renders **R$ 572,73** — **133,3 %** of the only floor
any unit states.

### 5.1 Reproduced, on the shipped code, across the whole week

`npx vitest run`, shipped modules, entry dates 19/09/2026 → 26/09/2026:

| Entry date | `getDay()` | first / extra min | first pay | extra pay | sum | DSR row |
|---|---|---|---|---|---|---|
| **19/09 sáb** | 6 | **0 / 252** | R$ 0,00 | **R$ 572,73** | R$ 572,73 | **R$ 88,11** |
| **20/09 dom** | 0 | **0 / 252** | R$ 0,00 | **R$ 572,73** | R$ 572,73 | **R$ 88,11** |
| 21/09 seg | 1 | 120 / 132 | R$ 204,55 | R$ 300,00 | R$ 504,55 | R$ 77,62 |
| 22/09 ter | 2 | 120 / 132 | R$ 204,55 | R$ 300,00 | R$ 504,55 | R$ 77,62 |
| 23/09 qua | 3 | 120 / 132 | R$ 204,55 | R$ 300,00 | R$ 504,55 | R$ 77,62 |
| 24/09 qui | 4 | 120 / 132 | R$ 204,55 | R$ 300,00 | R$ 504,55 | R$ 77,62 |
| 25/09 sex | 5 | 120 / 132 | R$ 204,55 | R$ 300,00 | R$ 504,55 | R$ 77,62 |
| **26/09 sáb** | 6 | **0 / 252** | R$ 0,00 | **R$ 572,73** | R$ 572,73 | **R$ 88,11** |

`spec.md`'s **R1** and §16.4's three rows are reproduced exactly, on a third independent instrument.

### 5.2 The third figure nobody counted — measured on the rendered screen

`components/organisms/day-summary.tsx:132-133` computes `variablePay` from **both** tier pays and
feeds it to `restDayPayOnOvertime`. **The weekday predicate therefore moves the DSR row too.**

Production build, `next start -p 3733`, seeded `localStorage`, entry **19/09/2026 (sábado)**, read
1 400 ms after `networkidle`, the money spans actually on screen:

```
390×844  light  →  ['R$ 0,00', 'R$ 572,73', 'R$ 0,00', 'R$ 88,11']
390×844  dark   →  ['R$ 0,00', 'R$ 572,73', 'R$ 0,00', 'R$ 88,11']
1440×900 light  →  ['R$ 0,00', 'R$ 572,73', 'R$ 0,00', 'R$ 88,11']
1440×900 dark   →  ['R$ 0,00', 'R$ 572,73', 'R$ 0,00', 'R$ 88,11']
```

An identical Monday renders **R$ 77,62** in that last position. The defect is worth
**R$ 68,18 + R$ 10,49 = R$ 78,67** a day on this journey, across **three** user-visible figures,
not two. See §11 **F3** and §14 **A1**.

### 5.3 Known-good state, measured

Lesson **040**. In the isolated copy, with the weekday branch definitionally absent
(`splitOvertime(overtimeMinutes)`, no `getDay()` read anywhere in the hook):

| Entry date | first / extra min | first pay | extra pay | sum | DSR row |
|---|---|---|---|---|---|
| **all seven weekday classes, 19/09 → 26/09** | **120 / 132** | R$ 204,55 | R$ 300,00 | **R$ 504,55** | **R$ 77,62** |

### 5.4 Ruling — L1

> **A Saturday's overtime takes exactly the split every other day takes.** `firstTierMinutes =
> min(overtimeMinutes, 120)`, `extraTierMinutes = max(0, overtimeMinutes − 120)`, with **no weekday
> operand of any kind**. For the reference journey: **120 / 132 min → R$ 204,55 + R$ 300,00 =
> R$ 504,55**, DSR **R$ 77,62**.
>
> The norms behind the split are **N4** (where the 120-minute boundary sits) and **N5** / **N3**
> (the 50 % floor over every extra hour). **Nothing else.** The 100 % second rate is not in this
> ruling and is not made lawful by it — see §13 **Q2**.

---

## 6. L2 and L3 — Sunday. The finer verdict, now decided

§16.4 drew Sunday as *"an ambiguity to be named and a field to be collected or disclosed, not an
arithmetic to be condemned"*, and deferred. It is decided here. Executing the units against the
same journey, entry **20/09/2026 (domingo)**:

| Operative unit | Reading | Number it yields |
|---|---|---|
| **N17** — Súmula 146, day **not compensated** | *o trabalho prestado* — the whole day — paid **em dobro**, *sem prejuízo* da remuneração do repouso. Simple value of 780 min at R$ 68,181818…/h = **R$ 886,36**; *em dobro* = **R$ 1.772,73**; the increment over what the monthly salary already pays = **R$ 886,36** | **R$ 1.772,73** gross / **R$ 886,36** increment |
| **N17** — Súmula 146, day **compensated** by a folga | the dobra does not attach. The day is an ordinary working day | **R$ 429,55** (the **N5** floor) / **R$ 504,55** at the app's own rates |
| **N12** parágrafo único — escala de revezamento | the repouso lawfully falls on another day; then this Sunday is an ordinary working day and no dobra is owed at all | **R$ 429,55** / **R$ 504,55** |
| **N16** — Lei 605 art. 9º | feriado trigger. 20/09/2026 is not a feriado nacional | **R$ 0,00** |
| **N11** — art. 59-A parágrafo único | in a 12×36 the monthly remuneration already covers the DSR and the feriados | **R$ 0,00** of dobra |
| **N6 / N9 / N10** | the compensation operand, three different windows | **R$ 0,00** of acréscimo where they apply |
| **N2 / N14** | *preferentemente/preferencialmente aos domingos* | no number |

**The app renders R$ 572,73. That is `ot only doubled` — 252 min × 2 — and it is not any of them.**
Measured, same probe: `whole day doubled = R$ 1.772,73`, `whole day simple = R$ 886,36`,
`art. 59 §1º floor = R$ 429,55`, `ot only doubled = R$ 572,73`.

**This is the sharper finding, and it is new.** §16.4 said the Sunday branch rested on an assumed
operand. It does — but it is also **not Súmula 146 at all**. The súmula's subject is *o trabalho
prestado*; the code doubles only the **excess over the journey**. The TST's own reasoning, in the
decisions applying 146, is that the dobra and the hora extra have *fatos geradores diversos* — the
work performed on a day destined for rest, versus the hours exceeding the weekly load. The code
applies the *rate* of one to the *base* of the other. There is no reading of N17 under which
R$ 572,73 is its output.

### 6.1 Ruling — L2 and L3

> **A Sunday's overtime takes the same split as every other day: 120 / 132 → R$ 504,55, DSR
> R$ 77,62.** Identical to §5.4.
>
> The reason is an operand, and it is stated as an operand and not as a silence. The dobra of
> **N17** and **N16** fires only on a day *não compensado*. Whether a folga compensatória was
> granted is a fact **the app has never collected and will not collect** (`PRODUCT.md` §5, and
> `spec.md` **H2** answered *no* here). Whether the day is a feriado is a fact **the product
> refuses** to hold (`PRODUCT.md` §7, 5.570 municípios). And **N12** parágrafo único makes a Sunday
> an ordinary working day for anyone on an escala de revezamento — a class the app cannot detect
> either.
>
> **Three unknowns, and the app must not resolve any of them on the user's behalf.** Of the
> candidate numbers, exactly one requires no uncollected operand: the art. 59 §1º floor and the
> user's own two rates over it. That is the number the app renders. **The dobra is not computed and
> is disclosed** — §9 and §10.
>
> Stated as the trade the human should be able to check: for a worker whose Sunday genuinely was
> não compensado, the app under-states this day by **R$ 886,36** of increment on this journey, and
> **says so on the screen**. Under the shipped behaviour it over-states by R$ 68,18 and says
> nothing. `PRODUCT.md` §4 — *cite or omit* — decides between those two, and it decides for the
> first.

---

## 7. L6 — the rest-day fact, and the contradiction the app ships today

`spec.md` **AC6** asks for one row. Here it is, with a measurement rather than an argument.

`lib/weekly-rest.ts:12` counts **only Sundays** as the repouso of the month
(`day.getDay() === SUNDAY`), resting on **N14** / **N2** / **N12**. On the very same Saturday, the
same render simultaneously:

- counts that Saturday as one of the month's **26 working days** (`work/rest = 26/4`, measured), and
- prices its overtime as a repouso-grade day.

> **Ruling — L6.** The two modules assert **contradictory** facts about the same week today, and
> the contradiction is measurable in one screenshot: `26/4` and a doubled Saturday cannot both be
> true. `lib/weekly-rest.ts` is the one that is **right** — **N14**, **N12** and **N2** all name
> Sunday and none names Saturday. After the correction in §5.4, `hooks/use-work-calculator.ts`
> asserts **no** fact about the weekday at all, only one module makes a rest-day claim, and the
> contradiction is gone by construction rather than by reconciliation.
>
> **No change to `lib/weekly-rest.ts` and no change to its rest-day count is required or
> authorised.** Debt **D2** stays open under its own trigger. The DSR *figure* moves because its
> input moves — that is §11 **F3** and §14 **A1**, and it is not a change to the DSR rule.

The caption at `components/organisms/day-summary.tsx:235` — *"…conta só os domingos. Feriados não
entram."* — is **true today and stays true**, and after the correction it stops sitting beside a
money figure that contradicts it. No edit owed to it on legal grounds.

---

## 8. L7 and L8

### 8.1 L7 — the two-hour boundary and the rate step

Lesson **046**: every factor gets its operand, its unit and its norm, or it is a false mechanism.

```
FIRST_TIER_LIMIT_MINUTES = 120
  = 2 horas               (CLT art. 59, caput — "em número não excedente de duas" — N4)
  × 60 min/hora
```

> **Ruling — L7, and it has two halves that must not be merged.**
>
> 1. **The position of the boundary is statutory.** 120 minutes is exactly where **N4**'s ceiling
>    sits. A `lib/` module may carry that constant with `N4` cited, and the citation is true.
> 2. **The existence of a second, higher rate above the boundary is not statutory.** No unit of
>    art. 59 — caput, §1º, §2º, §3º, §5º, §6º — and no unit of the CF tiers a rate. **N5** and
>    **N3** state one floor over *every* extra hour. A step to 100 % above the second hour is a
>    **convenção coletiva** feature, and `PRODUCT.md` §7 refuses to carry CCTs.
>
> Therefore: when the constant moves to `lib/`, **`FIRST_TIER_LIMIT_MINUTES` and
> `DEFAULT_FIRST_TIER_RATE` carry citations; `DEFAULT_EXTRA_TIER_RATE` carries none, and may not be
> given one.** Moving it into `lib/` does **not** discharge `AGENTS.md` §9 for it. The only thing
> that discharges §9 for the 100 % default is the disclosure of finding **L-2** — debt **D1**,
> §13 **Q2**. A G6 reviewer who reads a norm comment beside a `100` rejects on that alone.

### 8.2 L8 — a night journey that crosses the weekday boundary

Measured, shipped code, journey 20:00 → 06:00 with 00:00–01:00 lunch, 591 min worked, 411 night min,
63 min of overtime:

| Case | entry `getDay()` | exit `getDay()` | first / extra | rendered |
|---|---|---|---|---|
| Fri → Sat | 5 | 6 | 63 / 0 | R$ 107,39 + R$ 0,00 · DSR R$ 16,52 |
| **Sat → Sun** | **6** | **0** | **0 / 63** | **R$ 0,00 + R$ 143,18 · DSR R$ 22,03** |
| Mon → Tue | 1 | 2 | 63 / 0 | R$ 107,39 + R$ 0,00 · DSR R$ 16,52 |

Same hours, **R$ 35,79** apart, plus R$ 5,51 of DSR. With the branch absent, all three rows read
**63 / 0 → R$ 107,39, DSR R$ 16,52**.

> **Ruling — L8.** The question *"is such a day one weekday class or two"* **has no monetary
> consequence once §5.4 and §6.1 are in force**, because no money figure reads a weekday at all.
> It is therefore **moot, not deferred** — and moot is a stronger result than the exclusion it
> replaces.
>
> Consequence for the record: `.specs/0001-foundation/legal.md` § Out of scope's row *"Holidays,
> **and weekend tiering keyed on the exit day**"* must lose its second half — there is no weekend
> tiering to key on any day. The **holiday** half stands and is reinforced by §10. See §14 **A2**.

---

## 9. The disclosure — L4 and L5

### 9.1 The domain, stated as a test

Per `AGENTS.md` §5 *How a rule's domain is defined*, the domain is a test, and the enumeration is
the test's **output**:

> **Every surface that renders a money figure derived from the day's overtime minutes.**

Run over the tree, not read off a screen:

```
$ grep -rn "overtimePay" app components hooks lib
components/organisms/day-summary.tsx:16   (import)
components/organisms/day-summary.tsx:128  firstTierPay
components/organisms/day-summary.tsx:129  extraTierPay
lib/payroll.ts:51                         (definition)

$ grep -rn "DaySummary" app components | grep -v "day-summary.tsx:"
components/organisms/work-calculator.tsx:16   (import)
components/organisms/work-calculator.tsx:197  (the single call site)
```

**One module, one call site, one surface.** Three money figures on it derive from the split:
`firstTierPay`, `extraTierPay`, and `restDayPay` (via `variablePay`, `day-summary.tsx:131-133`).

### 9.2 The states of that surface, all of them, enumerated from its own branch conditions

| # | State | Branch | Money derived from overtime on screen | Disclosure |
|---|---|---|---|---|
| **S1** | no salário informado | `grossHourlyRate === null` (`:128-130`) → the *"Quer ver quanto isso vale em reais?"* link renders instead | **none** | **exempt** — the sentence's subject is a money figure and there is none. Recorded as an exemption with its reason, never as a silence |
| **S2** | salário informado, overtime = 0 | `grossHourlyRate !== null`, `restDayPay === 0` → both tier rows render **R$ 0,00**, the DSR row and its caption are absent | **yes** — two R$ 0,00 figures. And the gap is at its widest here: a Sunday worked exactly on schedule and *não compensado* owes the **whole day** in dobro (§6, R$ 886,36 of increment) while this state renders R$ 0,00 | **required** |
| **S3** | salário informado, overtime > 0 | `restDayPay > 0` → both tier rows, the DSR row and the DSR caption render | **yes** — three figures | **required** |

**Three states. Three rows. The two counts are equal.** `spec.md` **AC4**'s cell matrix is
superseded by §9.5.

### 9.3 Substance, in one sentence

> *The user was shown the money value of a day's overtime computed with no doubling for a domingo
> or a feriado, because the app does not know — and never asks — whether the day was a repouso or a
> feriado worked without a folga compensatória.*

### 9.4 The clauses, one axis each

`W1` and `W9` **carry the substance**. `W2`–`W7` are tripwires and **no borderline reading of one of
them decides the verdict alone**.

| Clause | Axis | What it requires | Worked measurement of the intended state |
|---|---|---|---|
| **W1** — domain *(substance)* | **presence** | The disclosure element is in the DOM in **every** state of §9.2 in which the app renders a money figure derived from the day's overtime minutes — that is **S2 and S3**. Not gated on the weekday, not gated on `restDayPay > 0`, not gated on any panel being open, not gated on a non-zero figure | today: **absent in 2 of 2 required states**, at both viewports, both themes (`R6` returns zero strings about this rule anywhere in `app/` or `components/`) |
| **W2** | **space** | `getBoundingClientRect().height > 0` on its **border box** and `getComputedStyle().opacity === "1"`; and the rect lies inside the document: `left >= 0` and `right <= document.documentElement.scrollWidth` | precedent slot in the same block: height **52,17 px** @390, **34,78 px** @1440, opacity `1`, at both themes |
| **W3** | **time** | Present at a reading taken **no earlier than 1 000 ms** after load, and again after a full `reload()` | calibrated in `.specs/0003-…/legal.md` §16.1: a transient carrier in this codebase left the DOM at **371–481 ms**; 1 000 ms clears the maximum by 519 ms, **4,7× the 110 ms spread**. This run's readings were taken at **1 400 ms** and are stable |
| **W4** | **size** | Border-box `getBoundingClientRect().width` equal to the **extra-tier row's** border-box width, within **0,50 px**. Self-calibrating, so it survives a container change | measured, same render: row **308,00** / precedent caption **308,00** @390; row **667,33** / caption **667,33** @1440. Δ = **0,00 px** in all four cells |
| **W5** | **measure** | Every rendered line box **except the last** holds **≥ 45 characters** | measured on the precedent caption in the same slot, font-size **12 px**, line-height **17,4 px**: **52, 52** chars @390 (last line 30, exempt); **104** chars @1440 (last line 30, exempt). Floor 45 sits **7 characters** below the tightest measured full line |
| **W6** | **modality** | Delivered as rendered text to every user. Not `sr-only`, not an `aria-label`, not a `title`, not a tooltip | the block contains **0** occurrences of `sr-only` or `aria-label` today (`grep`, `day-summary.tsx`), so the precedent is already compliant |
| **W7** | **order** | The reader's path equals the element tree's path: the disclosure follows the extra-tier row in document order **and** its `getBoundingClientRect().top` is strictly greater | precedent: extra-tier row top **2 290,75**, caption top **2 402,75** @390 (Δ **112,00**); **1 080,75** → **1 171,75** @1440 (Δ **91,00**). `grep -rnE "order-[0-9]\|sticky"` over `day-summary.tsx`, `work-calculator.tsx`, `calculator-views.tsx` and `app/globals.css` returns **0 rows**, so the two paths cannot diverge here today |
| **W8** | **operability** | **Deliberately left open.** The disclosure carries no control, so there is nothing to reach or operate. **If `product-designer` gives it one** — a details/summary, a "saiba mais", an info button — this clause becomes binding and must be restated before G5, because a disclosure behind a control is a different rule (`AGENTS.md` §9, `PRODUCT.md` §4 *visibly*) | — |
| **W9** — content *(substance)* | **wording** | §10 | — |

**Falsifiability of the clauses, stated honestly.** Sweeping the domain for a failing subject:
**W1** has one — every required state, today. **W9** has one — no string in the tree makes the
claim. **W2–W7 have no failing subject in this tree today**, because the element does not exist
yet; they are calibrated against the precedent that occupies the same slot and they become
falsifiable the moment the element lands. That is recorded rather than dressed up: a G6 reviewer
must see each of W2–W7 go red against a deliberately broken variant before citing any of them as
evidence.

### 9.5 How AC4 is verified — the cell matrix, superseded

`spec.md` **AC4** proposed 8 cells as *2 viewports × 2 themes × 2 entry dates*. **The date dimension
is dead**: under §5.4 and §6.1 no money figure reads the weekday, so a weekend and a weekday entry
are the same cell. It is replaced by the state dimension of §9.2:

> **3 states × 2 viewports (390×844, 1440×900) × 2 themes = 12 cells. S1's 4 cells are exempt with
> the reason in §9.2. 8 measured + 4 exempt = 12.**
>
> The guard asserts the size of the set **before** iterating, and prints `measured + exempt`. A
> guard that reports a pass while measuring zero elements is not evidence (`AGENTS.md` §5). The
> three questions every citing report must answer in writing, from the guard's **source**: what its
> selector matches against the markup as rendered; what it prints against an empty collection; what
> it prints if every member is exempt. Two identical answers mean it does not discriminate.

### 9.6 L5 — does the footer discharge this? **No.** And not for the reason I expected

I measured the co-presence argument before making it, and **it does not hold**:

| Viewport | extra-tier row `top` | footer paragraph naming *feriados* `top` / `height` | span from row top to paragraph bottom | viewport height |
|---|---|---|---|---|
| 390×844 | 2 290,75 | 2 858,27 / 139,13 | **706,65 px** | 844 |
| 1440×900 | 1 080,75 | 1 520,09 / 69,56 | **508,90 px** | 900 |

**Both fit in one viewport at both sizes.** A refusal resting on distance would have been a verdict
that is right for the wrong reason, and the wrong reason is what travels. **The co-presence /
spatial-proximity axis is therefore deliberately not made binding**, because the measurement shows
it does not discriminate between the footer and a new slot.

> **Ruling — L5, on content.** The footer paragraph
> (`components/organisms/calculator-views.tsx:85`) reads *"Não entram na conta: FGTS, … feriados, …"*
> — the word **feriados**, in a list of omissions. Against §9.3's substance it carries **one third
> of one clause**. It does not name **domingos** at all; it does not state that a domingo or feriado
> *não compensado* is paid **em dobro**; and it does not say that the overtime figures on this
> screen are computed **without regard to the day of the week**. A reader who reads it in full
> learns that feriados are missing from *some* calculation, and learns nothing about the rule that
> priced the number in front of them.
>
> **A second slot is required**, in the variable-pay block, structurally the same move `design.md`
> §8 already made for **D4**. The footer's sentence stays as it is — no edit is owed to it on legal
> grounds — and per lesson **047** the new slot must not be the **same sentence**: two different
> sentences about one gap is correct; one sentence printed twice is not.

---

## 10. L4 — what the disclosure must say (clause W9)

`content-writer` owns every word. This section states the **claim**, never the sentence, and binds
by what the string **must say**, not only by what it may not (`AGENTS.md` §5).

**Three assertions, all three required:**

| | The string must assert | Norm behind it |
|---|---|---|
| **C1** | that this screen prices **every day by the hours typed**, with **no difference between a sábado, a domingo and a dia útil** | §5.4, §6.1 — the absence of a weekday operand is itself the claim, and it is the one the user cannot infer |
| **C2** | that **trabalho em domingo ou feriado não compensado por folga é pago em dobro**, and that **esta tela não calcula essa dobra** | **N17** (Súmula 146 do TST) and **N16** (Lei 605/49, art. 9º) for the feriado |
| **C3** | that the reason is that the app **does not ask** whether a folga compensatória was granted, and **does not carry** a calendário de feriados | `PRODUCT.md` §5 and §7 — the gap is named, not apologised for |

**Where the scope words must sit.** *"não compensado"* must be adjacent to *domingo/feriado*, in the
same clause. Detached — *"domingos e feriados são pagos em dobro"* with the condition in a following
sentence — the string asserts an unconditional doubling rule that N17 does not state, and it
survives every forbidden-word list.

**The string must name its subject, never point at it** (lesson **049**): *as horas extras desta
tela*, *o valor desta tela* — **no** *acima*, *abaixo*, *este valor*, *o número ao lado*. **W1**
puts it in S2, where the figures beside it are `R$ 0,00`, and deixis there points at nothing
meaningful.

**Forbidden, as a backstop and not as the specification:**

- any hedge standing in for naming the gap — *aproximadamente*, *estimativa*, *pode variar*
  (`PRODUCT.md` §4, *cite or omit*);
- any sentence saying what the dobra *is worth*, *tends to be* or *usually is*, at any percentage,
  with any hedge — the app does not compute it and must not price it in prose;
- any sentence implying the app **detects** domingos or feriados;
- any sentence implying the user should do something about the result (`PRODUCT.md` §7, no legal
  advice).

**The test on the rule itself.** Try to write a string using only permitted words that still makes
the retired claim. *"Domingos e feriados podem ser pagos em dobro."* — every word permitted, and it
fails **C1** and the second half of **C2**: it neither says the screen ignores the weekday nor that
the dobra is not computed here. That string is the proof **C1** and the *"esta tela não calcula"*
half of **C2** are both load-bearing, and neither may be dropped to fit a budget.

---

## 11. Divergences from the code

Every row is an instruction to `tech-lead`. **No edit was made by me, anywhere.**

| Id | Sev | File and line | What the code does | What the norm requires | Worked case |
|---|---|---|---|---|---|
| **F1** | **critical** | `hooks/use-work-calculator.ts:64` and `:70` | reads `new Date(entry).getDay()` and passes `dayOfWeek === 0 \|\| dayOfWeek === 6` as `isWeekend` | **N3**, **N5**: one floor over every extra hour, with no weekday operand. §5 executed 14 units; none produces the result. §6 shows the Sunday branch is not **N17** either, because N17's subject is *o trabalho prestado*, not the excess | Saturday 19/09/2026, reference journey: renders **R$ 572,73**; the corpus yields `{R$ 0,00 ; R$ 429,55}`; the correct app figure is **R$ 504,55** |
| **F2** | **critical** | `hooks/use-work-calculator.ts:38-49` (`splitOvertime`) and `:9` (`FIRST_TIER_LIMIT_MINUTES = 120`) | a CLT threshold and the rule built on it live in a hook | `AGENTS.md` §8 — *business rules live in `lib/`* — and §9 — *every user-visible number traces to a table in `lib/` that cites its norm*. `grep -rcE "CLT\|Lei \|Súmula" hooks/*.ts` → **0** in all four hooks, and by §8 they may not carry the citation, because the norm-comment exemption is `lib/`-only | after F1 the predicate is gone and `spec.md` **AC3**'s first grep returns 0 rows by deletion alone; **AC3's second half has no subject unless the split moves.** Move `splitOvertime` and the 120 to a `lib/` module citing **N4** (boundary) and **N5**/**N3** (floor) |
| **F3** | **major** | `components/organisms/day-summary.tsx:131-133` | `variablePay` (both tier pays) feeds `restDayPayOnOvertime`, so the weekday predicate moves the DSR row as well | **N18** / **N15** are correct; their **input** is not | rendered, Saturday: DSR **R$ 88,11**; Monday, same hours: **R$ 77,62**. A third user-visible figure, moved by the defect. This falsifies `spec.md` **AC5** as written — §14 **A1** |
| **F4** | **minor** | `lib/compliance.ts:7` `DAILY_OVERTIME_LIMIT_MINUTES = 120` **and** `hooks/use-work-calculator.ts:9` `FIRST_TIER_LIMIT_MINUTES = 120` | **one norm (N4), two constants, two modules**, neither carrying a norm comment | lesson **041**'s shape in reverse: one norm split across two fields is checked against whichever one the reviewer opened, and they can drift apart silently. `AGENTS.md` §8 | both are art. 59 *caput*. F2's `lib/` module should be the single cited source and `lib/compliance.ts` should read it |
| **F5** | **major** — *carried, not re-opened* | `hooks/use-work-calculator.ts:14` `DEFAULT_EXTRA_TIER_RATE = 100`; rendered at `components/organisms/day-summary.tsx:193` and `:203` | the app asserts a 100 % adicional the user never typed and prices money at it | §8.1 half 2: **no** unit of art. 59 or of the CF tiers a rate. This is a convenção coletiva figure, and `PRODUCT.md` §7 refuses CCTs | **out of scope here** (debt **D1**). Recorded so that F2's move does not smuggle a citation onto it. §13 **Q2** |
| **F6** | **minor** | `hooks/use-work-calculator.ts:12` `DEFAULT_WORK_MINUTES = 528` | a CF art. 7º XIII-derived threshold in a hook, uncited. `528 = 44 h × 60 ÷ 5 dias`, where the 5 is an operand the app asserts (a `workDaysPerWeek` key exists in `lib/storage.ts`) | same `AGENTS.md` §8 breach as F2, different operand | **outside `spec.md`'s In-scope list.** Routed to `tech-lead` for its own trigger, not mandated here |

### 11.1 The guard that pins the defect

`__tests__/use-work-calculator.test.ts:92-101`, *"pays all weekend overtime at the higher tier"*,
asserts `firstTierMinutes === 0` and `extraTierMinutes === 132` for a Saturday. Checked for vacuity
rather than assumed: it **discriminates** — it goes red the moment the branch is absent, which is
`spec.md`'s **R1c** and is consistent with §5.3.

> **What must replace it, as a legal requirement and not a test-style preference.** The assertion
> must make the **absence of a weekday operand** falsifiable, so it must sweep the operand's whole
> domain rather than sample one value of it:
>
> - one case per **weekday class**, **seven** of them, with the set size asserted **before**
>   iterating — `measured === 7`, and zero is never a pass;
> - every row asserting the **same** `firstTierMinutes` / `extraTierMinutes`, so the test fails if
>   any weekday is special-cased in either direction;
> - for the existing SATURDAY fixture at 20:00 (660 min worked, 132 min overtime) the corrected
>   expectation is **`firstTierMinutes === 120`, `extraTierMinutes === 12`** — byte-identical to the
>   Monday assertion four cases above it at `:83-88`.
>
> Deleting the assertion instead of correcting it makes **AC2** unfalsifiable and is a rejection at
> G6. `__tests__/use-work-calculator.test.ts` has **gained one assertion** from a sibling agent's
> in-flight work since R1c was taken, so the `(34)` in R1c's `1 failed | 33 passed (34)` will read
> one higher at G5 — re-measure it there rather than quoting R1c.

---

## 12. Order of operations, and rounding

Unchanged by this ruling, and stated in full because `spec.md` correctly refuses to let the
implementation pick (`AGENTS.md` §4 rule 8 and this gate's bar).

### 12.1 The sequence, with the base for each step

| # | Step | Base | Where |
|---|---|---|---|
| 1 | journey → `overtimeMinutes` | whole **integer minutes** | `lib/day-breakdown.ts` |
| 2 | `firstTierMinutes = min(overtimeMinutes, 120)` · `extraTierMinutes = max(0, overtimeMinutes − 120)` | integer minutes. **No weekday operand** (§5.4, §6.1) | today `hooks/use-work-calculator.ts:38-49`; after **F2**, `lib/` |
| 3 | `hourlyRate = grossSalary ÷ monthlyHours` | **unrounded** float | `lib/payroll.ts:55` |
| 4 | `firstTierPay = (firstTierMinutes ÷ 60) × hourlyRate × (1 + firstTierRate ÷ 100)` | **unrounded** | `lib/payroll.ts:51` |
| 5 | `extraTierPay`, same formula with `extraTierMinutes` and `extraTierRate` | **unrounded** | as above |
| 6 | `nightPay` | **unrounded** | `lib/night-shift.ts` |
| 7 | `variablePay = firstTierPay + extraTierPay + nightPay` | **the unrounded values**, never the displayed ones | `day-summary.tsx:131` |
| 8 | `restDayPay = variablePay ÷ workingDays × restDays` | **unrounded** `variablePay`; **N18** / **N15** | `lib/weekly-rest.ts:18` |
| 9 | display | `formatCurrency` → `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })` | `lib/utils.ts:57` |

### 12.2 Rounding

> **Exactly one rounding, at step 9, at the display boundary, to two decimal places, half away from
> zero** (ECMA-402's default `roundingMode: "halfExpand"`, which `formatCurrency` does not
> override). **No intermediate rounding anywhere in steps 1–8.**

This has a consequence someone will eventually try to "fix", so it is written down: the DSR's base
at step 8 is **R$ 504,545454…**, *not* the R$ 504,55 the user reads as the sum of the two displayed
rows. Rounding the tier pays before summing them changes the DSR by fractions of a centavo and is
**forbidden**.

### 12.3 Worked case, to the centavo — the corrected Saturday

Entrada 19/09/2026 08:00 · almoço 12:00–13:00 · saída 22:00 · jornada 528 min · bruto R$ 15.000,00 ·
220 h/mês · rates 50 % / 100 % · setembro/2026 = 30 dias, **4** domingos.

```
worked            = 780 min
overtime          = 780 − 528                       = 252 min
firstTierMinutes  = min(252, 120)                   = 120 min
extraTierMinutes  = max(0, 252 − 120)               = 132 min
hourlyRate        = 15000 / 220                     = 68,181818181818…
firstTierPay      = (120/60) × 68,181818… × 1,50    = 204,545454545454…  → R$ 204,55
extraTierPay      = (132/60) × 68,181818… × 2,00    = 300,000000000000…  → R$ 300,00
nightPay                                            =   0,00
variablePay       = 204,545454… + 300,00 + 0        = 504,545454545454…
workingDays/restDays = 30 − 4 / 4                   = 26 / 4
restDayPay        = 504,545454… / 26 × 4            =  77,622377622377… → R$  77,62
```

**Expected on screen: `Extra 50%` R$ 204,55 · `Extra 100%` R$ 300,00 · `DSR sobre os extras`
R$ 77,62.** Every one of those four figures was measured in the known-good state (§5.3). The
identical journey on 20/09 (domingo), 21/09 (segunda) and 26/09 (sábado) must print the identical
four figures.

### 12.4 Tables

**This feature introduces no monetary table and changes no value in `lib/legal-tables.ts`.** Stated
explicitly so the absence is not read as an omission: `legal-tables.ts` is year-indexed because tax
tables are set yearly by portaria; the constants here are set by **lei** and change only when the
lei changes, so year-indexing them would be a false mechanism. The complete, reconstructible rule
set this feature depends on:

| Constant | Value | Norm | Effective | Source |
|---|---|---|---|---|
| Daily overtime ceiling | **120 min** (2 h) | CLT art. 59, *caput*, red. Lei 13.467/2017 (**N4**) | 2017-11-11 | [planalto — CLT](https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm) |
| Overtime rate floor | **50 %** over the hora normal | CF art. 7º, XVI (**N3**) · CLT art. 59, §1º, red. Lei 13.467/2017 (**N5**) | 1988-10-05 · 2017-11-11 | [planalto — CF](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm) · CLT, above |
| Second-tier rate default | **100 %** | **none.** Contractual (convenção coletiva). May not carry a citation | — | — (§8.1, §13 **Q2**) |
| Weekday multiplier | **none exists** | swept: no unit of the CLT, Lei 605/49 or the CF attaches a rate to *sábado* (§4.3) | — | — |
| Repouso semanal | 24 h consecutivas, **preferentemente aos domingos** | Lei 605/49 art. 1º (**N14**) · CLT art. 67 (**N12**) · CF art. 7º, XV (**N2**) | 1949-01-05 · 1943-05-01 · 1988-10-05 | [planalto — Lei 605/49](https://www.planalto.gov.br/ccivil_03/leis/l0605.htm) · CLT · CF |
| Dobra — domingos e feriados **não compensados** | 100 % over, on **the day's work**, *sem prejuízo* do repouso. **Not computed by this app** | Súmula 146 do TST (**N17**) · Lei 605/49 art. 9º, for feriados (**N16**) | 2003-11-19 · 1949-01-05 | [TST — Livro de Jurisprudência, ed. 2025-07-17](https://www.tst.jus.br/documents/10157/63003/LivroInternet(11)pdf.pdf/814fe229-718f-541f-f73c-7a8b03ce47bc?t=1752769398191) · Lei 605/49 |
| DSR over habitual overtime | extras ÷ dias úteis × repousos | Súmula 172 do TST (**N18**) · Lei 605/49 art. 7º, "a", red. Lei 7.415/1985 (**N15**) | 2003-11-19 · 1985-12-09 | TST, above · Lei 605/49 |

Per `AGENTS.md` §5, a second analyst holding only this table and the primary sources reaches
R$ 204,55 / R$ 300,00 / R$ 77,62 for §12.3's journey, to the centavo, without opening the
repository.

---

## 13. Open questions

| Id | Question | Who decides | What changes under each answer |
|---|---|---|---|
| **H1** | Does the human's 2026-09-14 acceptance of the *"weekend tier"* imprecision cover the rendered **R$ 572,73**? *(the human's, already in `spec.md`; not answered here)* | **human only** (`AGENTS.md` §4 rule 8) | **Either way, §5 and §6 are unchanged: no unit of any norm produces R$ 572,73 on a Saturday, and none produces it on a Sunday.** What moves is what ships. **(a) The acceptance does not cover it** — the spec's default: the correction in §5.4/§6.1 ships, and the disclosure of §9/§10 ships with it. **(b) The acceptance stands** — then the app keeps a money figure with no norm behind it, and §9's obligation becomes **stricter**, not looser: the disclosure must then additionally assert that *esta tela paga as horas extras de sábado e de domingo integralmente na faixa mais alta e nenhuma norma exige isso*, rendered under the same W1–W7 clauses. Finding **F1** stays open at **critical** in the record under either answer, and `.specs/0001-foundation/legal.md`'s imprecision row is rewritten to say that the figure traces to no table, which it does not say today |
| **H2** | If G2 rules the correct Sunday number requires the folga compensatória, does WorkLoad add that field? | human | **Not triggered.** §6.1 rules the opposite: the app must **not** resolve the operand, in either direction. No field, no G1 bounce. The gap is discharged by **C2**/**C3** |
| **Q2** | `DEFAULT_EXTRA_TIER_RATE = 100` has **no** statutory source (§8.1). Debt **D1** / finding **L-2** owns it and `spec.md` **Q1** asks `tech-lead` for a spec number | `tech-lead` | Flagged again here because **F2** moves a neighbouring constant into `lib/`, and the adjacency is exactly where a false citation gets attached. **Until D1 lands, the 100 % default is a user-visible number with no table behind it** — an `AGENTS.md` §9 breach that 0012 does not close and must not appear to close |

---

## 14. Amendments this gate owes to documents already on the record

Written here, at the gate that found them, rather than left for the implementation to absorb.

| Id | Document | What is falsified | Who corrects it |
|---|---|---|---|
| **A1** | `spec.md` **AC5** and the § Out of scope bullet *"No change to the DSR figure…"* | **Falsified by measurement.** The DSR row is derived from `variablePay` (**F3**), so the correction necessarily moves it from **R$ 88,11** to **R$ 77,62** on a Saturday. AC5 as written cannot pass. The **protected property survives**: `lib/weekly-rest.ts` is untouched, its rest-day count is untouched, and debt **D2** stays with its owner — only the *input* moves. This is therefore an amendment, **not** the block-to-human route that bullet reserves for a sibling figure being *wrong*. AC5 must read: *unchanged except the three figures derived from the tier split — `firstTierPay`, `extraTierPay`, `restDayPay`* | `product-manager`, routed by `tech-lead` |
| **A2** | `.specs/0001-foundation/legal.md` § Out of scope, row *"Holidays, **and weekend tiering keyed on the exit day**"* | the second half has no subject after §5.4/§6.1 — there is no weekend tiering to key on any day (§8.2). The **holiday** half stands and is reinforced | `release-manager` at G7, per `spec.md` **AC7** |
| **A3** | `.specs/0001-foundation/legal.md` § Known imprecisions, the *"weekend tier"* row | it describes a **pricing choice** and does not record that the figure traces to no table in `lib/`, which is what makes it an `AGENTS.md` §9 breach rather than an imprecision. Rewrite is gated on **H1** | the human, then `release-manager` |
| **A4** | `.specs/0003-citation-registry/legal.md` §16.4 | its TST citation is to the **2023** edition of the Livro de Jurisprudência, superseded by the 2025-07-17 edition and predating **Res. 225/2025** (§3.1). The *substance* about Súmulas 146 and 172 is confirmed correct by this run; only the edition is stale. Its §12 line *"§9.0 found none wrong"* is already marked inline and is handled by `spec.md` **AC7** | `labor-law-analyst` — **recorded here**, in this run's own report |
| **A5** | `.specs/0003-citation-registry/legal.md` §16.4, the Sunday paragraph | it said the Sunday branch *"does double — but only não compensado"*, which reads as though the code implements **N17** conditionally. §6 shows it does **not** implement N17 at all: N17 doubles *o trabalho prestado*, the code doubles the excess over the journey, and the two have different bases. **The verdict was right; the stated cause was not, and the cause is what travels.** Amended here | `labor-law-analyst` — this run |

---

## 15. Checklist against this gate's own bar

| Bar | Result |
|---|---|
| Every user-visible number traceable to a cited table in `lib/` | **after F1+F2**, yes for the tier split. **No** for `DEFAULT_EXTRA_TIER_RATE = 100` — §13 **Q2**, debt **D1**, not closed by this spec and not claimed to be |
| Every missing disclaimer named | §9, §10 — three assertions, nine clauses, one surface, three states, 8 measured + 4 exempt cells |
| Every table with its norm, effective date and source | §12.4 |
| No rounding or order-of-operations decision left to the implementation | §12.1–§12.3, to the centavo |
| Every number verified against a primary source fetched in this session | §4, all nineteen; §3.1 records the one superseded edition I had cited before |
| No source file edited by me | `git status --porcelain hooks lib components` prints only sibling agents' unrelated in-flight files (§3) |
