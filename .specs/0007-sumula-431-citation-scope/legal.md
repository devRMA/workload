# 0007 — Legal basis

**Verdict: `pass`** — at **run 3**, against the rewritten `spec.md`. The run-1 and run-2 verdicts were
`reject` and both stand as history; they are not amended, because they ruled a different artifact.
**The pass is conditional in the ordinary way: the rules below are binding, and a build that ships a
divisor without them fails G6.**

> Owner: labor-law-analyst · Gate: `law` · **Run 3** (amends runs 1 and 2; their text stands except
> where a § *Run 2* or § *Run 3* block amends it) · **Blocking — design and copy start from § *Run 3*.**

---

## Why this gate rejects, in one paragraph

The spec is built on one premise, stated in its first sentence and carried by every acceptance
criterion: *"This is a provenance defect, not a calculation defect. The numbers are correct."*
**That premise is false, and I am the agent who made it false** — X1 was carried four times as a
citation over-extension because four gates, mine included, bounded the defect from the source text
of `lib/salary-period.ts:40` instead of rendering the warning over its input domain. Rendered in an
isolated copy at this gate (§ *W — worked measurements*), the same warning shows **150** to a
six-hour journey where two norms in force say **180**, **183,33** to the most common 44-hour
arrangement in Brazil where the settled divisor is **220**, and **300** to a 12×36 journey whose
divisor is **220** — telling that last user, in the app's own words, that their hour is worth 27%
less than they think. These are not mis-citations. They are wrong numbers with a money claim
attached, under a norm name the user is being asked to trust.

**Therefore `AC1` is void by its own exemption clause** (`spec.md` AC1 and § Out of scope, both in
the same words: *"G2 only, via Q1… if it does, AC1 is void and the spec returns to G1 rather than
being satisfied by a weaker reading"*). **Q1 is answered: yes, the behaviour must change.** The
spec returns to G1 with a calculation risk profile. Everything G1 needs to rewrite it is settled
below — the norms are verbatim, the covered cases are bounded, the options are costed, and the
precondition three specs carried (**P1**) is **resolved**, not deferred.

---

## Run 2 — what was asked, what changed, and what did not

**The task's premise about run 1 is not what run 1 recorded.** Run 2 was opened on the reading that
*"you rejected at run 1 on P1 — no reachable host returns Súmula 431's verbatim text"*. Run 1
rejected on the **merits**, not on P1: P1 was recorded **resolved** (§ *P1 / Q2*, and `STATUS.md`
blocker P1), Q1 was recorded **answered**, and the rejection rests on § *W*, where the divisor the
app asserts was measured wrong on three of five rendered journeys. Recorded here rather than
silently worked around, because a gate re-run on a mis-stated prior verdict is how a settled
question gets re-litigated and a live one gets missed.

### P1 — re-discharged on the authorised path, independently

The human authorised `WebSearch`/`WebFetch` beyond `curl`. Used. **Súmula 431's verbatim text was
retrieved this session on two independent official hosts, by a retrieval path different from run
1's, and both match run 1 character for character.**

| Host / artifact | Path | Status | Class | What it returned |
|---|---|---|---|---|
| `juslaboris.tst.jus.br/bitstream/handle/20.500.12178/26556/2012_res0185.pdf` | `WebFetch` → 879.1 KB binary → `pdftotext -layout` | `200` | **primary** | Res. 185/2012, **item XIII**, at lines 1510–1520 of the extracted text. Ementa and enunciado verbatim (§ R1). The fetch tool's own summariser could not read the PDF; the text was extracted locally and read directly. |
| `jurisprudencia-backend2.tst.jus.br/rest/documentos/61d1b2abd337f7bc69d4eddf4ac6bf42` | `WebFetch` | `200` | **official** (TST decision transcribing the enunciado) | *"Para os empregados a que alude o artigo 58, caput, da CLT, quando sujeitos a 40 horas semanais de trabalho, aplica-se o divisor 200 (duzentos) para o cálculo do valor do salário-hora."* Identical to the enacting act (the decision writes `artigo` where the act writes `art.`). |
| `tst.jus.br/en/cancelamento-de-sumulas-ojs-e-precedentes-normativos` | `WebFetch` | `200` | **official** | The Res. 225/2025 cancellation list in full. **Súmulas 431, 124, 60, 172 and 376 are not on it.** **OJ 355 da SBDI-I is** — third independent confirmation of F3. |
| `www2.camara.leg.br/legin/…/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html` | `WebFetch` | `200` | official-consolidated | CLT art. 58 caput and **art. 64 caput + parágrafo único** verbatim — the parágrafo único is load-bearing for the § *Run 2* correction to R3 below. |
| `www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm` | `WebFetch` | **`socket hang up`** | — | **Unreachable for the fifth consecutive gate, now from three retrieval paths** (`curl`, and the fetch service on two separate runs). **Q-H1's statute half remains open.** |

**Ruling.** P1 is closed, and closed twice over. `juslaboris.tst.jus.br` (the enacting resolution)
is this repository's **primary** source for a TST súmula; `tst.jus.br`'s cancellation page and
`jurisprudencia-backend2.tst.jus.br` are **official** corroboration for currency and wording. The
precondition three specs carried is discharged and needs no further carry. **Q-H1 narrows to the
statute half only.** The trap `spec.md` named held: every aggregator the search surfaced
(`normaslegais`, `legisweb`, `jusbrasil`, `modeloinicial`, `legjur`, `calculojuridico`,
`meucontadoronline`) was discarded unread as a source, per settled product policy.

**Currency, restated.** Súmula 431 verified against its enacting act (Res. 185/2012), against the
consolidated book (through Res. 220/2017) and against the TST's own live cancellation page for Res.
225/2025 (30.06.2025). Q-H2's residual risk — an *alteration* between July 2018 and today — is
**narrowed but not closed**: the cancellation page enumerates cancellations, not alterations.

### Q1 — re-tested, and the answer is sharper than run 1's

The task restates Q1 as three honest outcomes. **The first one holds, with a correction to run 1:
a norm does support the general rule, and it is not Súmula 431.** See § *Run 2 — correction to R3*.
That does **not** rescue the app's number, because the norm supports the rule under a variable the
app never collects. AC1 stays void; the spec stays at G1.

### What did not change

The working tree is untouched since run 1 (`lib/salary-period.ts` and
`components/organisms/salary-calculator.tsx` re-read at this gate, last touched by `486a2b3`, a
token commit), and **`spec.md` is still run 1** — its founding premise, AC1 and its option-free
framing are exactly what run 1 rejected. **A gate cannot return a different verdict on an unchanged
artifact.** The verdict is `reject` for the same reason, not for a new one.

**Bounce accounting.** This is bounce **2** of the **2** `AGENTS.md` §4 rule 3 allows. A third G2
rejection stops the pipeline and goes to the human. `tech-lead` should route this to a **G1 re-run
that picks an option**, not to a third G2 pass on the same spec.

---

## Scope of this analysis

**Covered.** The monthly divisor the app computes and displays — `coherentMonthlyHours` /
`findDivisorMismatch` in `lib/salary-period.ts`, the warning at
`components/organisms/salary-calculator.tsx:151`, the uncited divisor sentence at `:137`, the
constants `WORK_DAYS_PER_WEEK` / `WEEKS_IN_DIVISOR` / `DEFAULT_MONTHLY_HOURS`, the `README.md:58`
copy of the attribution and the test at `__tests__/salary-calculator.test.tsx:188` that pins it.
This is the Súmula 431 attribution **wherever it appears**, plus the rule it attributes.

**Examined but not owned.** Rows S9–S22 and G are ruled below against the same clause-A/clause-B
test, because `spec.md` AC3 requires a ruling for every row and because the verbatim texts were
already in hand. **Those rulings are advisory input to `.specs/0003-citation-registry/`, which owns
every citation in this repository other than Súmula 431.** Where a row is ruled defective, this
file routes it; it does not order the repair. Two gates ruling on one citation is how they diverge.

**Not covered, and not ruled.** `lib/legal-tables.ts` (RGPS/RPPS/IRRF brackets, the Portaria
source string at `:47`, the aggregator URL at `:48`) and `lib/payroll.ts:32`'s RPPS prose. These
belong to `0003` and to the tax-table norms, which this gate did not fetch. S19 and S20 carry
`deferred` rather than a ruling, and § *Open questions* records the tension with AC3.

**Not covered:** every computation not named above — INSS, IRRF, adicional noturno, DSR arithmetic,
compliance thresholds. They are cited in the row rulings, not re-verified as computations.

---

## P1 / Q2 — the source ruling. **Resolved.**

Three specs carried a precondition naming `planalto.gov.br` as the blocker for repairing a **TST
súmula** citation. `0007`'s G1 already corrected the host; this gate closes the question.

**`juslaboris.tst.jus.br` — the TST's own institutional repository — serves the resolutions of the
Tribunal Pleno as PDFs, including the act that gave Súmula 431 its current wording and the most
recent act cancelling súmulas.** That is a *primary* source: the norm-creating act itself, from its
publisher. It is this repository's accepted primary source for a TST súmula, an OJ or a precedente
normativo, and the ruling stands until a human replaces it.

| Host / artifact | Status | Bytes | Class | What it settled |
|---|---|---|---|---|
| `https://juslaboris.tst.jus.br/bitstream/handle/20.500.12178/26556/2012_res0185.pdf?sequence=1&isAllowed=y` | `200` | 900 238 | **primary** | Res. 185/2012 — the act that altered Súmula 431 to its current wording. Verbatim at its item XIII. |
| `https://juslaboris.tst.jus.br/bitstream/handle/20.500.12178/251919/2025_res0225.pdf?sequence=1&isAllowed=y` | `200` | 119 696 | **primary** | Res. 225/2025, de 30.06.2025 — the most recent Pleno act cancelling súmulas/OJs. **Does not mention 431, 124, 60, 172 or 376.** Does cancel **OJ 355 da SBDI-I** (finding F3). |
| `https://www.tst.jus.br/documents/10157/63003/Livro-Internet.pdf` | `200` | 3 496 811 | **official-consolidated** | The TST's consolidated Súmulas/OJs/PNs. Latest act cited inside: **Res. 220/2017**; PDF `CreationDate 2018-07-16`. Verbatim for Súmulas 60, 124, 172, 264, 376, 431 and OJ 355/396. |
| `https://www.tst.jus.br/documents/10157/2b196ee1-5d44-43ea-b197-51ba0e30da21` | `200` | 122 989 | official-consolidated | TST's before/after table for the 2012 Semana do TST — corroborates 431's and 124's altered wording. |
| `https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html` | `200` | 1 790 529 | official-consolidated | CLT arts. 58, 59, 64, 65, 66, 71, 73, 224, 611-A — verbatim, with each alteration's law named. |
| `https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-publicacaooriginal-1-pl.html` | `200` | 405 504 | official (publicação original) | CF art. 7º, XIII, XV e XVI — verbatim. None of the three has been amended. |
| `https://www2.camara.leg.br/legin/fed/lei/1940-1949/lei-605-5-janeiro-1949-367115-normaatualizada-pl.html` | `200` | 44 511 | official-consolidated | Lei 605/1949 art. 7º, alíneas *a*–*d*, §§1º e 2º — verbatim. |
| `https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm` | `000` (curl, 30 s timeout) / `socket hang up` (WebFetch) | 0 | — | **Unreachable for the fourth consecutive gate, from two different network paths.** |
| `https://www.tst.jus.br/sumulas`, `https://jurisprudencia.tst.jus.br/`, `https://www.tst.jus.br/web/guest/sumulas` | `200` | 1 041 | **not a source** | Client-rendered app shell. `200` is not "the text was read". Its `/rest/pesquisa-textual/` endpoint answered `405`. |

**Currency.** Súmula 431's wording is verified against the primary act (Res. 185/2012) and against
the consolidated book (through Res. 220/2017). Res. 225/2025 — the latest cancellation act located
— leaves it standing. **Residual risk, stated rather than hidden:** an *alteration* (not a
cancellation) of Súmula 431, 124, 60, 172 or 376 between July 2018 and today would not appear in
either artifact, because no official host reachable from this session enumerates súmula alterations
by date. See § *Open questions* Q-H2.

---

## Rules

### R1 — Súmula 431 do TST. Divisor 200, and **only** for the 40-hour week.

| | |
|---|---|
| Norm | Súmula nº 431 do TST |
| Instituted by | Res. 177/2012 (DEJT 13, 14 e 15.02.2012); **wording altered** by Res. 185/2012, sessão do Tribunal Pleno de 14.09.2012 |
| Effective from | 2012-09-25 (DEJT divulgado em 25, 26 e 27.09.2012) |
| Status | In force. Not among the súmulas cancelled by Res. 225/2025, de 30.06.2025. |
| Source | `juslaboris.tst.jus.br/bitstream/handle/20.500.12178/26556/2012_res0185.pdf` (primary, `200`, 900 238 B) · `tst.jus.br/documents/10157/63003/Livro-Internet.pdf` (consolidated, `200`, 3 496 811 B) |

**Verbatim — ementa and text, from Res. 185/2012, item XIII:**

> **SÚMULA N.º 431. SALÁRIO-HORA. EMPREGADO SUJEITO AO REGIME GERAL DE TRABALHO (ART. 58, CAPUT, DA
> CLT). 40 HORAS SEMANAIS. CÁLCULO. APLICAÇÃO DO DIVISOR 200** (redação alterada na sessão do
> Tribunal Pleno realizada em 14.09.2012)
>
> Para os empregados a que alude o art. 58, caput, da CLT, quando sujeitos a 40 horas semanais de
> trabalho, aplica-se o divisor 200 (duzentos) para o cálculo do valor do salário-hora.

**What it requires, precisely.** One divisor, for one class of worker, under one condition: the
worker is an *empregado* under CLT art. 58 caput **and** their **weekly** duration is 40 hours. It
then yields 200. It states nothing about any other weekly duration, nothing about how a weekly
duration is distributed across days, and — decisively for this feature — **it contains no formula.**
There is no "× 5" in it, no "jornada semanal", no rule from which other divisors could be derived.

**How it maps onto this feature.** It covers exactly one point of the app's input domain: a journey
whose *weekly* total is 40 hours. It does not cover the app's rule, and the app's rule is not a
generalisation of it — it is a different rule that happens to agree with it at one point.

### R2 — Divisor 220 for the 44-hour week. Real, settled, and **not** Súmula 431.

| | |
|---|---|
| Norms | CF/88 art. 7º, XIII · CLT art. 64 · Lei 605/1949 art. 7º, §2º |
| Effective from | 1988-10-05 (CF) · 1943-05-01 (CLT art. 64, original wording) · 1949-01-05 (Lei 605) |
| Status | All three in force. CF art. 7º, XIII has never been amended. |
| Source | Câmara/Legin CF (`200`, 405 504 B) · Câmara/Legin CLT (`200`, 1 790 529 B) · Câmara/Legin Lei 605 (`200`, 44 511 B) |

**Verbatim:**

> **CF art. 7º** — São direitos dos trabalhadores urbanos e rurais, além de outros que visem à
> melhoria de sua condição social: […] **XIII** - duração do trabalho normal não superior a oito
> horas diárias e quarenta e quatro semanais, facultada a compensação de horários e a redução da
> jornada, mediante acordo ou convenção coletiva de trabalho;

> **CLT art. 64.** O salário-hora normal, no caso de empregado mensalista, será obtido dividindo-se
> o salário mensal correspondente à duração do trabalho, a que se refere o art. 58, por 30 (trinta)
> vezes o número de horas dessa duração.
> **Parágrafo único.** Sendo o número de dias inferiores a 30 (trinta), adotar-se-á para o cálculo,
> em lugar desse número, o de dias de trabalho por mês.

> **Lei 605/1949, art. 7º, §2º.** Consideram-se já remunerados os dias de repouso semanal do
> empregado mensalista ou quinzenalista, cujo cálculo de salário mensal ou quinzenal, ou cujos
> descontos por faltas sejam efetuados na base do número de dias do mês ou de trinta (30) e quinze
> (15) diárias, respectivamente.

**What the three together require.** The mensalista's salary remunerates **30 days**, repousos
included (Lei 605 art. 7º §2º), and the salário-hora is that salary divided by **30 × the daily
duration** (CLT art. 64). The daily duration of a 44-hour week spread over the six dias úteis is
7h20; 30 × 7,3333… = **220**. The same arithmetic on 40 hours gives 30 × 6,6667 = **200**, which is
why Súmula 431 says 200 and why 220 is the baseline it departs from.

**The load-bearing clause, stated so no downstream agent has to infer it:** the divisor is a
function of the **weekly** duration and of the **number of dias úteis** over which it is spread —
never of the daily journey alone. `divisor = (horas semanais ÷ dias úteis da semana) × 30`.

### R3 — `divisor = jornada diária × 25` is not a formula any norm enacts, and two norms in force fix a different number for the journeys it is applied to.

> **Amended at run 2.** Run 1's heading read *"There is no norm for `divisor = jornada diária × 25`"*.
> **That was too strong and I am correcting it here rather than letting the implementation absorb
> the ambiguity** — see § *Run 2 — correction to R3*, immediately after this rule. The rest of R3
> stands as written.

The rule the app implements is `dailyHours × WORK_DAYS_PER_WEEK(5) × WEEKS_IN_DIVISOR(5)`, i.e.
`dailyHours × 25`. Algebraically that is `(horas semanais ÷ 6) × 30` **only if** the week is exactly
five workdays of equal length — the app's two hidden assumptions, neither of which is in any norm
and neither of which is stated on the screen or asked of the user.

No lei, decreto, súmula, OJ or precedente normativo enacts it. Searched: every occurrence of
"divisor" in the TST's consolidated Súmulas/OJs/PNs (36 hits, all read). What the corpus contains
is a set of **case-specific** divisors, and two of them contradict the app directly:

> **Súmula 124 do TST** — BANCÁRIO. SALÁRIO-HORA. DIVISOR (alterada em razão do julgamento do
> processo TST-IRR 849-83.2013.5.03.0138) - Res. 219/2017, DEJT divulgado em 28, 29 e 30.06.2017 –
> republicada - DEJT divulgado em 12, 13 e 14.07.2017
> **I** - o divisor aplicável para o cálculo das horas extras do bancário será:
> **a) 180**, para os empregados submetidos à jornada de seis horas prevista no caput do art. 224 da
> CLT; **b) 220**, para os empregados submetidos à jornada de oito horas, nos termos do § 2º do art.
> 224 da CLT.

> **OJ 396 da SBDI-I** — TURNOS ININTERRUPTOS DE REVEZAMENTO. ALTERAÇÃO DA JORNADA DE 8 PARA 6 HORAS
> DIÁRIAS. EMPREGADO HORISTA. APLICAÇÃO DO DIVISOR 180. (DEJT divulgado em 09, 10 e 11.06.2010)
> Para o cálculo do salário hora do empregado horista, submetido a turnos ininterruptos de
> revezamento, considerando a alteração da jornada de 8 para 6 horas diárias, aplica-se o divisor
> 180, em observância ao disposto no art. 7º, VI, da Constituição Federal, que assegura a
> irredutibilidade salarial.

A six-hour journey therefore has a divisor of **180** in the two places Brazilian labour law
bothered to fix one. The app computes **150** and names Súmula 431 while doing it. Note the
direction of the harm: 150 < 180 means the app tells that worker their hour is worth **20% more**
than any norm supports.

Also in the corpus, and relevant to how contested this terrain is: **Súmula 343** (bancário, divisor
220 for the 8-hour journey) was **cancelled**, and **Súmula 267** (bancário, divisor 240) was
superseded. The TST has moved this number three times for one profession. It is not a formula.

### Run 2 — correction to R3, and the norm Q1 asked for

| | |
|---|---|
| Norm | **CLT art. 64, parágrafo único** (redação original, Decreto-Lei 5.452, de 01.05.1943) |
| Effective from | 1943-05-01 |
| Status | In force. Not altered by any lei named in the consolidated text. |
| Source | `www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html` — `WebFetch`, `200`, this session |

**Verbatim, re-fetched at run 2:**

> **Art. 64.** O salário-hora normal, no caso de empregado mensalista, será obtido dividindo-se o
> salário mensal correspondente à duração do trabalho, a que se refere o art. 58, por 30 (trinta)
> vezes o número de horas dessa duração.
> **Parágrafo único.** Sendo o número de dias inferiores a 30 (trinta), adotar-se-á para o cálculo,
> em lugar desse número, o de dias de trabalho por mês.

**What run 1 missed.** Run 1 quoted the parágrafo único and then derived only the caput's
`(horas semanais ÷ dias úteis) × 30`. The parágrafo único is a *second* operative rule: where the
paid days are fewer than 30, the multiplier is **o número de dias de trabalho por mês**. Five
workdays a week × five weeks is **25 dias de trabalho por mês**, and

`divisor = jornada diária × 25`

is that rule, executed. **The app's arithmetic is not baseless — it is CLT art. 64, parágrafo único,
under an assumption of a five-day week that the app never states and never asks for.** It is also
why `jornada semanal × 5` (the comment at `lib/salary-period.ts:40`) and `(semanais ÷ 6) × 30` (R2)
are the same number: both are art. 64, read through different day counts.

**Three consequences, and none of them rescues the code.**

1. **The over-extension of Súmula 431 is unchanged, and is now sharper.** The app's rule has a norm,
   and that norm is **CLT art. 64, parágrafo único** — *not* Súmula 431, which states no formula
   (R1). The citation is wrong about which norm, not merely about how far it reaches. Súmula 431
   exists precisely because art. 64 admits **two** readings for a five-day 40-hour week — caput
   gives 30 × 8 = **240**, parágrafo único gives 25 × 8 = **200** — and the TST fixed 200. A rule
   the TST had to settle is not a rule a comment may present as arithmetic.
2. **The rule is conditional on a variable the app does not collect** (R4), so citing it is citing a
   premise the user never supplied. Every § *W* number below is the output of `dias de trabalho por
   mês = 25` asserted on the user's behalf.
3. **For the 12×36 journey the assumed premise is unlawful.** `12 × 25 = 300` presupposes five
   twelve-hour days a week — **60 horas semanais**, against CF art. 7º, XIII's 44-hour cap (R2) and
   CLT art. 59's two-hour ceiling. The app derives a divisor from a week no norm permits and then
   names a súmula while showing it. This row is unambiguous and it is the one that carries the
   verdict on its own.

**Q1, answered at run 2.** Outcome (1) of the three the task names: *a norm does support the general
rule and it must be cited correctly.* It is **CLT art. 64, caput e parágrafo único**, read with
**Lei 605/1949 art. 7º, §2º** for which days are paid, and with **Súmula 431** as the TST's fixed
answer for the one case it covers. **Nothing is retired** — the "banco de horas" route does not
apply. But the correct citation cannot be written onto the current screen, because the norm's
operative term (`dias de trabalho por mês`, or equivalently the weekly duration and the dias úteis)
is not an input. **That is a calculation change, and AC1 stays void.**

### R4 — The week's distribution is a variable the app does not collect.

CF art. 7º, XIII caps the week at 44 hours *and* the day at 8; CLT art. 59 caput allows up to two
extra hours; art. 611-A, I lets a convenção or acordo coletivo pactuar the jornada "observados os
limites constitucionais"; art. 59-A allows 12×36. The same **daily** number therefore maps to
several **weekly** totals, and only the weekly total determines the divisor (R2):

| The user types (jornada diária) | Real arrangements that produce it | Correct divisor | The app says |
|---|---|---|---|
| `08:00` | 40h/week over 5 days | 200 (R1) | 200 ✓ |
| `08:00` | 44h/week: 8h seg–sex + 4h sáb — the most common CLT arrangement | 220 (R2) | **200 ✗** |
| `07:20` | 44h/week over 6 days | 220 (R2) | **183,33 ✗** |
| `06:00` | bancário art. 224 caput; turnos ininterruptos | 180 (R3) | **150 ✗** |
| `12:00` | escala 12×36 (CLT art. 59-A) | 220 in settled practice | **300 ✗** |
| `08:48` | 44h/week over 5 days | 220 (R2) | 220 ✓ (no warning) |

Two of six correct. The two correct ones are the two the app was calibrated on.

### R5 — Convenção coletiva may set the jornada, and therefore the divisor.

> **CLT art. 611-A.** A convenção coletiva e o acordo coletivo de trabalho têm prevalência sobre a
> lei quando, entre outros, dispuserem sobre: **I** - pacto quanto à jornada de trabalho, observados
> os limites constitucionais; […] **III** - intervalo intrajornada, respeitado o limite mínimo de
> trinta minutos para jornadas superiores a seis horas;

(Câmara/Legin, redação da Lei 13.467/2017, em vigor desde 11/11/2017.)

`PRODUCT.md` §7 forbids a convenção-coletiva database outright. The app therefore **cannot** know
the user's jornada pactuada, and any divisor it derives is conditional on what the user typed. This
is a disclosure obligation (D1), not a feature request.

---

## W — Worked measurements

Taken against the **current** build, in an isolated copy (`rsync --exclude node_modules --exclude
.next` + `cp -al node_modules`, own process, no `.next`, no port — `AGENTS.md` §4 rule 6). The
component was **rendered**, not read: `SalaryCalculator` with `grossSalary=3000`,
`monthlyHours=220`, varying `workMinutes`. The probe file was removed from the copy after the run;
the repository was never written to.

Quantity measured: **the full `textContent` of the element with `role="status"`** — i.e. the string
the screen reader announces and the user reads, not the source template.

| `workMinutes` | Rendered `role="status"` text, verbatim | Norm | Verdict |
|---|---|---|---|
| 360 (6h) | `A carga mensal não combina com a jornada diáriaPela Súmula 431 do TST, a jornada que você informou corresponde ao divisor 150 horas por mês, e não 220. Usar um divisor maior do que o devido reduz o valor de cada hora sua.` | Súm. 124 I *a*; OJ 396 SBDI-I → **180** | **wrong number** |
| 440 (7h20) | `…corresponde ao divisor 183.33 horas por mês, e não 220…` | R2 → **220** | **wrong number**, and `183.33` is rendered with a **decimal point in a pt-BR interface** |
| 480 (8h) | `…corresponde ao divisor 200 horas por mês, e não 220…` | R1 → 200 **only if** the week is 40h; R2 → 220 if it is 44h | **unsound** — the app cannot tell which |
| 528 (8h48) | *no warning* | R2 → 220 | ✓ |
| 720 (12h) | `…corresponde ao divisor 300 horas por mês, e não 220…` | 12×36, CLT art. 59-A → 220 in settled practice | **wrong number, and inverted harm** |

**The 12×36 row is the most severe and it is worth spelling out.** The computed divisor (300) is
*larger* than the one the user typed (220). The sentence that follows — "Usar um divisor maior do
que o devido reduz o valor de cada hora sua" — then reads as an instruction to adopt 300, which
would cut that worker's salário-hora from R$ 13,64 to R$ 10,00 on a R$ 3.000 salary: **−26,7%**.
The app's own rationale sentence argues against the app's own number, and the user it argues at is
the one whose divisor the app got most wrong.

### Run 2 — the § W verdicts, re-ruled against CLT art. 64, parágrafo único

The measurements are unchanged — the same strings render from the same unmodified tree. **Two of the
run-1 verdicts were stated too strongly and are corrected here**, at the gate that found the error,
so that no downstream agent has to reconcile the prose with the measurement.

| `workMinutes` | Rendered divisor | Run-1 verdict | **Run-2 verdict** | Why |
|---|---|---|---|---|
| 360 (6h) | `150` | wrong number | **assumption-dependent, and uncitable as shown** | `6 × 25 = 150` is art. 64 par. único on a five-day, 30-hour week. But the two places the law fixes a divisor for a six-hour journey — Súmula 124, I *a* (bancário, art. 224 caput) and OJ 396 da SBDI-I (turnos ininterruptos) — both fix **180**, on a six-day week. The app picks one week for the user, shows the other user's number, and names a third norm. |
| 440 (7h20) | `183.33` | wrong number | **wrong for the arrangement 7h20 denotes** | 7h20 is the *canonical daily figure of the 44-hour, six-day week*, whose divisor is **220** (R2). `183,33` is art. 64 par. único on a five-day 36h40 week — an arrangement nobody contracts in those terms. The non-integer output is itself the signal (§ *Rounding*). The `183.33` decimal point in a pt-BR interface stands as **F2**. |
| 480 (8h) | `200` | unsound | **unsound** (unchanged) | Right under Súmula 431 if the week is 40h; **240** under art. 64 caput and **220** under R2 if it is 44h. Art. 64 admits two readings and the app silently picks one. |
| 528 (8h48) | *no warning* | ✓ | ✓ (unchanged) | — |
| 720 (12h) | `300` | wrong number, inverted harm | **wrong number, inverted harm, and built on an unlawful premise** (unchanged, strengthened) | `12 × 25 = 300` presupposes **60 horas semanais**, above CF art. 7º XIII's 44h cap. The 12×36 divisor is 220. **This row alone carries the verdict.** |

**Which clause carries the substance, stated so a borderline reading of one row cannot decide the
gate:** the verdict rests on the **720 row**, which is wrong under every reading and whose implied
week is unconstitutional. The 360 and 440 rows are *supporting* — they establish that the app
asserts a week on the user's behalf, which is the defect's mechanism, not its proof. Even if a
reader rejected both corrected rows entirely, the 720 row and § *Run 2 — correction to R3* ¶1 (the
citation names the wrong norm) each independently sustain `reject`.

---

## The computation as it must be specified

**Order of operations**, for whatever the re-spec keeps:

1. Read the **weekly** duration. It is not currently an input. Everything downstream is conditional
   on it (R2, R4).
2. Divisor = `(horas semanais ÷ dias úteis da semana) × 30`. Both operands are required. Neither is
   derivable from the daily journey alone.
3. Compare to the carga horária mensal the user declared.
4. Only then, and only when the case is one a norm covers, name the norm.

**Worked example E1 — the only case this app can cite today, end to end.**

| | |
|---|---|
| Input | jornada semanal 40h, spread over 5 dias úteis; empregado do art. 58 caput; salário bruto R$ 3.000,00 |
| Step 1 | weekly duration = 40h → Súmula 431's condition is satisfied |
| Step 2 | divisor = 200 (R1, stated by the súmula itself — not computed) |
| Step 3 | salário-hora = 3000 ÷ 200 = **R$ 15,00** |
| Rule | R1 |

**Worked example E2 — the case the app gets wrong most often.**

| | |
|---|---|
| Input | 8h seg–sex + 4h sáb = 44h semanais over 6 dias úteis; salário bruto R$ 3.000,00; user types jornada diária `08:00`, carga mensal `220` |
| Correct | divisor = (44 ÷ 6) × 30 = 220 (R2) → salário-hora = **R$ 13,64** |
| The app | 8 × 25 = 200 → warns, names Súmula 431, and asserts **R$ 15,00** is the hour they are owed |
| Error | **+10,0% on the salário-hora**, and every hora extra derived from it |

**Rounding — binding, and currently unspecified anywhere.**

| Quantity | Unit | Direction | Applied at | Source |
|---|---|---|---|---|
| Divisor (horas por mês) | hora, 2 decimals | half-up | once, at the end of the divisor computation | project convention — **no norm fixes it**, and it must be stated, not inherited from `Math.round(x*100)/100` |
| Divisor, **as displayed** | hora | — | **pt-BR formatting is mandatory**: `183,33`, never `183.33` | `PRODUCT.md` §1 (pt-BR only). F2 below. |
| Salário-hora | centavo | half-up | only on the final displayed value | project convention |

A divisor that is not an integer is itself a signal that the computation left the covered cases —
every divisor any norm in this analysis fixes (150, 180, 200, 220, 240) is an integer.

---

## Row rulings — S1–S22 and G

Rulings are `covered` / `over-extended` / `uncited` / `not a claim` / `deferred`. Each reason is a
sentence about **what the string asserts** (lesson 024), not a label. Verbatim norm text for every
non-deferred row is in § Rules above or quoted inline.

| # | Ruling | Reason — what the string asserts, and what the norm says |
|---|---|---|
| **S1** `lib/salary-period.ts:40` | **over-extended** *and* **unsound** | It asserts that Súmula 431 states a formula — "o divisor mensal é a jornada semanal x 5" — with 220 and 200 as instances of it. The súmula states one divisor for one weekly duration and contains no formula (R1). The comment also mislabels the code beneath it, which multiplies the **daily** journey, not the weekly one. **Repair is owned here.** |
| **S2** `salary-calculator.tsx:151` | **over-extended** *and* **wrong number** | It tells the user, by norm name, which divisor "a jornada que você informou corresponde a" and that anything larger is "maior do que o devido" — an entitlement claim. Measured over five journeys it is right twice (§ W). **Repair is owned here, and it is not a wording repair.** |
| **S3** `salary-calculator.tsx:137` | **covered — keep, with one correction** | "Para a jornada de 8h48 por dia o divisor é 220 horas por mês" asserts a divisor for a specific journey, and that journey is one R2 covers (44h over 5 days → 220). It is a true worked example presented as one. It must **gain R2's citation** (CF art. 7º XIII + CLT art. 64 + Lei 605 art. 7º §2º) — `PRODUCT.md` §4 forbids the uncited normative claim just as it forbids the wrong cite. |
| **S4** `lib/salary-period.ts:3,5` | **uncited** *(run 1 also said "not derivable" — **corrected at run 2**)* | `WORK_DAYS_PER_WEEK = 5` and `WEEKS_IN_DIVISOR = 5` encode "the week is 5 workdays" and "the month is 5 weeks". **Their product, 25, is derivable: it is `dias de trabalho por mês` under CLT art. 64, parágrafo único** (§ *Run 2 — correction to R3*). What is not derivable is either factor **on its own** — no norm splits the month into "workdays per week" and "weeks per month"; art. 64 names one quantity, the day count. And the value 25 still rests on an assumption about the user's contract that no norm makes and the app never asks (R4). **They do not survive the repair in their present form**: the citable constant is `dias de trabalho por mês`, and it is an input, not a constant. |
| **S5** `hooks/use-salary-calculator.ts:30` | **legal constant** | `DEFAULT_MONTHLY_HOURS = 220` is not a UI preference: 220 is the divisor R2 fixes for the 44-hour week, and it is the number Súmula 431 exists to displace for 40-hour workers. It is a legal constant, it must live in `lib/` carrying R2's source (`AGENTS.md` §8), and **its value does not change** (`spec.md` AC7 stands). Where it lives is G4's call; that it carries a citation is not. |
| **S6** `README.md:58` | **over-extended** | "o divisor incoerente que a Súmula 431 do TST resolve" asserts the súmula resolves the general incoherence the app detects. It resolves the 40-hour case. Third copy of S1/S2. **Repair is owned here.** |
| **S7** `__tests__/salary-period.test.ts:70` | **covered** | The test name — "reports the 200 divisor Súmula 431 requires for a 40h week" — attributes 200 to the súmula for a 40-hour week, which is exactly and only what R1 says. It is the one place in the tree the attribution is correctly bounded. Keep the name; the assertion under it must be re-read against whatever replaces the rule. |
| **S8** `__tests__/salary-calculator.test.tsx:188` | **over-extended** | It asserts `toHaveTextContent("Súmula 431 do TST")` on the rendered warning, making the defective attribution a condition of a green suite. **Repair is owned here**, and per `spec.md` AC8 the replacement assertion must be seen red against the unfixed code. |
| **S9** `lib/weekly-rest.ts:17` | **over-extended (narrow) → route to 0003** | It attributes the formula "DSR = extras do mês / dias úteis x repousos do mês" to Lei 605/49 art. 7º §2º and Súmula 172. §2º says the mensalista's repousos are *already remunerated* in the monthly salary — it is the reason only the *reflexo* of the extras is owed, not the formula. The formula's anchor is art. 7º, **alínea *a*** ("computadas as horas extraordinárias habitualmente prestadas") read with Súmula 172. The cite names the wrong paragraph of the right article. |
| **S10** `day-summary.tsx:234` | **covered** | "O DSR (Súmula 172 do TST)" attributes to Súmula 172 the proposition that habitual overtime enters the repouso. Verbatim: *"Computam-se no cálculo do repouso remunerado as horas extras habitualmente prestadas"*. Exactly the claim. The sentence also discloses its own two simplifications (habituality assumed; feriados excluded) in the same breath, which is what `PRODUCT.md` §4 asks for. |
| **S11** `lib/compliance.ts:34` | **covered** | "O art. 59 da CLT limita a jornada extra a 2 horas por dia" — verbatim: *"em número não excedente de duas"*. "Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST)" — verbatim item I: *"A limitação legal da jornada suplementar a duas horas diárias não exime o empregador de pagar todas as horas trabalhadas"*. Both hold. The trailing "a sanção recai sobre o empregador" names no norm; it is a true but uncited administrative consequence (CLT art. 75) — minor clause-B, routed. |
| **S12** `lib/compliance.ts:47,56` | **covered** | 15 min above 4h — art. 71 §1º verbatim. 1 h above 6h — art. 71 caput verbatim. "O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória" — art. 71 §4º verbatim, **post-reforma**, and correctly *not* the cancelled Súmula 437's "período integral, natureza salarial". "norma coletiva pode reduzir para 30 minutos" is art. 611-A, III — true, uncited, minor clause-B, routed. |
| **S13** `lib/compliance.ts:65` | **uncited, and its basis was cancelled → route to 0003 as F3** | "O art. 66 da CLT garante no mínimo 11 horas seguidas de descanso" is verbatim and correct. But "O tempo suprimido **costuma ser pago como hora extra**" asserts a payment consequence whose only support was **OJ 355 da SBDI-I**, which Res. 225/2025 (30.06.2025) **cancelled**, "por perda de eficácia a partir de 11/11/2017, pela Lei 13.467/2017". The hedge "costuma" does not save a consequence retroactively without effect for eight years. |
| **S14** `lib/night-shift.ts:3` | **covered** | art. 73 caput (*"acréscimo de 20%… sobre a hora diurna"*), §1º (*"52 minutos e 30 segundos"*), §2º (*"entre as 22 horas de um dia e as 5 horas do dia seguinte"*) — all three verbatim, all three in force. |
| **S15** `day-summary.tsx:159` | **covered** | "art. 73 da CLT" labels the hora noturna reduzida figure. §1º is the operative paragraph and the caput-level cite contains it. |
| **S16** `salary-calculator.tsx:86` | **covered** | "A hora extra… é calculada sobre a hora bruta, como manda o art. 59, §1º, da CLT" — §1º verbatim: *"A remuneração da hora extra será, pelo menos, 50% superior à da hora normal"*. Súmula 264 is the sharper anchor for what composes the hora normal, but the cite as written is not over-extended. |
| **S17** `journey-form.tsx:142` | **covered** | "O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT)" — CF XVI verbatim: *"remuneração do serviço extraordinário superior, no mínimo, em cinqüenta por cento à do normal"*. Both cites carry their own half of the claim. |
| **S18** `calculator-views.tsx:85` | **covered** | "a prorrogação da jornada noturna depois das 5h (Súmula 60 do TST)" appears in the **omissions** list. Súmula 60, II verbatim: *"Cumprida integralmente a jornada no período noturno e prorrogada esta, devido é também o adicional quanto às horas prorrogadas."* The string names the norm for something the app deliberately does **not** compute, which is `PRODUCT.md` §4's "name the gap" done correctly. |
| **S19** `lib/legal-tables.ts:47` | **deferred → 0003** | The Portaria Interministerial MPS/MF nº 13/2026 source string sits inside the tax-table module `0003` owns, and this gate did not fetch the previdência norms. Ruling it here would put two gates on one citation. |
| **S20** `lib/payroll.ts:32` | **deferred → 0003** | "as faixas seguem subindo até 22%… muitas vezes 14% linear" asserts RPPS rates with no norm named — a clause-B row on its face. Its norms (EC 103/2019; Lei 10.887/2004) were not fetched here; both Legin URLs tried returned `404`. Same ownership reason as S19. |
| **S21** `README.md:56` | **follows S9 → route to 0003** | Third copy of the DSR attribution. Whatever `0003` rules for S9 must land here in the same words. |
| **S22** test assertions pinning Súmulas 172, 60, 376 | **covered, and they should stay** | Each pins a literal norm name into a suite for a string this gate ruled `covered`. They are load-bearing guards against an unreviewed citation drift, and nothing here asks them to move. |
| **G** `__tests__/comment-free-code.test.ts:12` | **not a legal control, and cannot become one** | `NORM_CITATION` permits a `lib/` comment because it matches a norm *name*. A regex over names cannot see whether the norm says what the comment claims — which is precisely why S1 survived four gates wearing a valid-looking citation. **The control that closes this gap is not a stronger regex: it is that every norm-citing comment in `lib/` has a row in a `legal.md` with the norm's verbatim text.** Designing that guard is G4's call and this gate does not require it; leaving the regex unchanged is correct (`spec.md` AC10) as long as nobody mistakes it for a legal check. |

**AC4 note.** The two `grep` commands in `spec.md` § *The search, re-run* were re-run at this gate
and reproduce the 22 rows plus the guard, with no hit unclassified. The enumeration held.

---

## Divergences from the code

Instructions to `tech-lead`. No file was edited by this gate.

| # | Severity | File:line | What the code does | What the norm requires |
|---|---|---|---|---|
| **F1** | **critical** | `lib/salary-period.ts:41-43` | `dailyHours × 5 × 5` for any journey, presented as the divisor the user is owed | The divisor is `(horas semanais ÷ dias úteis) × 30` (R2). The weekly duration and the number of dias úteis are not inputs, so the number cannot be derived — and is measurably wrong for 6h, 7h20, 12h and for any 8h journey belonging to a 44h week (§ W). |
| **F2** | **serious** | `lib/salary-period.ts:42` → rendered at `salary-calculator.tsx:151` | `Math.round(x*100)/100` interpolated raw: the user reads `183.33 horas` | pt-BR decimal separator is a comma. `PRODUCT.md` §1 — the product is pt-BR only. The repo already ships formatters; this number bypasses them. |
| **F3** | **serious** | `lib/compliance.ts:65` | "O tempo suprimido costuma ser pago como hora extra" for the art. 66 interregno | OJ 355 da SBDI-I was cancelled by Res. 225/2025 for loss of effect since 11/11/2017. **Routed to `0003`**, not repaired here. |
| **F4** | **serious** | `lib/salary-period.ts:40`; `salary-calculator.tsx:151`; `README.md:58`; `__tests__/salary-calculator.test.tsx:188` | Attributes a general formula to Súmula 431 | R1 covers one weekly duration and states no formula. X1, confirmed for the fifth time and closed here. |
| **F5** | **moderate** | `lib/salary-period.ts:3,5` | Two constants with no source | `AGENTS.md` §8. Neither is derivable from a norm (S4). |
| **F6** | **moderate** | `hooks/use-salary-calculator.ts:30` | `DEFAULT_MONTHLY_HOURS = 220` in a hook, uncited | 220 is R2's divisor, a legal constant; `AGENTS.md` §8 puts it in `lib/` with its source. Value unchanged. |
| **F7** | **moderate** | `lib/salary-period.ts:6` | `DIVISOR_TOLERANCE_HOURS = 1` — the warning stays silent within ±1h | No norm sets a tolerance on a divisor. It is a product choice and must be recorded as one; it is currently indistinguishable from a legal threshold. |

**Run 2 — amendments to F1, F4 and F5.** Severities and file:line are unchanged; the *"what the norm
requires"* column is corrected.

- **F1** — the requirement is not only R2's `(horas semanais ÷ dias úteis) × 30`. **CLT art. 64,
  parágrafo único** gives `jornada diária × dias de trabalho por mês` directly, and that is the rule
  the code already computes, with `dias de trabalho por mês` **hard-coded to 25** instead of asked.
  F1 remains **critical**: the operand is asserted on the user's behalf, and for the 12h journey the
  asserted week (60h) is above the constitutional cap.
- **F4** — the defect is not *"attributes a general formula to Súmula 431"* but **"attributes to
  Súmula 431 a rule that CLT art. 64, parágrafo único states"**. Naming the right norm is now a
  reachable repair; it is still not a *sufficient* one, because F1 stands.
- **F5** — the two constants are not sourceless; **their product is `dias de trabalho por mês` under
  art. 64, parágrafo único**. The `AGENTS.md` §8 defect is that neither factor is the norm's
  quantity and the value is an assumption, not a constant. See S4 as amended.

---

## Disclosures required

`PRODUCT.md` §4, "name the gap". `content-writer` writes the words; these state what must be said,
and each must be **visible next to its number**, not inside a collapsed panel (lesson 018: a rule
about where a string sits cannot see a string nobody renders).

| # | Where | What must be said | Why |
|---|---|---|---|
| **D1** | Wherever a divisor is asserted | That the divisor follows from **what the user typed**, and that a convenção or acordo coletivo may pactuar a different jornada (CLT art. 611-A, I) and therefore a different divisor | R5; `PRODUCT.md` §7 forbids the CCT database that would let the app know |
| **D2** | Same surface | That the computation assumes the weekly hours are spread over a given number of dias úteis, and that **the same daily journey belongs to different weekly durations** — 8h/day is 40h in a five-day week and 44h in a six-day one, with different divisors | R4. This is the gap that makes the number wrong, and it is the one the user can actually resolve by looking at their own contract |
| **D3** | Same surface, only where the app still names a norm | That Súmula 431 covers the **40-hour** week. The scope word sits next to the norm name, not in a sibling clause (lesson 004) | R1 |
| **D4** | Same surface | That specific categories have divisors fixed by their own norms — bancários (Súmula 124), turnos ininterruptos de revezamento (OJ 396), 12×36 — and that this screen does not model them | R3. Without it, the app contradicts an in-force súmula to the exact users it contradicts |

**Run 2 — D2 and D3 amended.** **D2 gains a norm to name**: the assumption it discloses is the
operative term of **CLT art. 64, parágrafo único** (`dias de trabalho por mês`), so the disclosure
is not a hedge about a product simplification — it names the variable the law itself makes the
divisor depend on. **D3 gains a second clause**: alongside "Súmula 431 covers the 40-hour week", the
surface must not present the divisor as arithmetic, because art. 64 admits two readings for the same
journey and the TST had to fix one (§ *Run 2 — correction to R3* ¶1). D1 and D4 stand as written.

**A silent deletion of the Súmula 431 citation is forbidden** (lesson 003, and `spec.md` § Non-goals
repeat it): if a claim is retired, it is retired with a recorded non-claim in `PRODUCT.md` §9 and
its unlock sequence. **Softening to "conforme a legislação" is equally forbidden** — it satisfies no
clause of §4 and, under lesson 004, the replacement is bound by what it must **say**, not by the
words it may not use.

---

## What G1 must decide — costed, so the re-spec is cheap

Not this gate's call. Stated because a rejection that does not hand forward the option set buys
another bounce.

| Option | What it does | Legal standing | Cost |
|---|---|---|---|
| **A — cite the covered cases, stay silent elsewhere** | Warn only when the computed divisor is one a norm fixes for the typed journey; otherwise no warning | Clean under "cite or omit" | Still wrong for the 8h/44h worker, because 8h maps to two weekly durations (R4). Does not close F1. |
| **B — ask for the weekly duration** | One input: horas semanais, or dias trabalhados na semana. Divisor becomes `(semanais ÷ dias úteis) × 30` and is citable for every journey | Fully citable (R1 + R2) | One more field. `PRODUCT.md` §5 says every field costs attention before it earns accuracy — but this is the field that makes the number true, and §5 is a principle about *unearned* fields. **This gate's preference.** |
| **C — drop the entitlement claim** | Keep the arithmetic, remove every normative framing ("devido", the norm name, the "reduz o valor de cada hora sua"), state both assumptions on the surface | Weakest that could pass | The heading still reads as "your number is wrong", and D4's cases are still contradicted. Only survives with D1–D4 all visible. |
| **D — retire the warning** | Remove the check; record the non-claim in `PRODUCT.md` §9 with its unlock sequence | Clean, lesson 003-compliant | Loses a protection that is genuinely valuable in the 40h case. |

**Whatever G1 picks, three things are binding on it:** the divisor is a function of the weekly
duration and the dias úteis (R2); no surface may attribute a general rule to Súmula 431 (R1); and
D1–D4 ship with whatever number survives.

### Run 2 — the option set, re-costed

Unchanged in shape. Two amendments, both following from § *Run 2 — correction to R3*:

- **Option B is now fully citable under a norm this gate has verbatim, and is confirmed as this
  gate's preference.** Its input need not be "horas semanais": **CLT art. 64, parágrafo único's own
  operative term is `dias de trabalho por mês`**, and the app already has the jornada diária. One
  field — *quantos dias você trabalha por semana* — yields `dias de trabalho por mês` and makes the
  divisor `jornada diária × dias de trabalho por mês`, citable as **art. 64, parágrafo único**, with
  **Súmula 431** naming the 40h/5-day case and **R2** the 44h/6-day one. This is the cheapest option
  that produces a true number, and the field it adds is the one `PRODUCT.md` §5 exists to permit.
- **Option A is weaker than run 1 costed it.** "Stay silent elsewhere" now means staying silent on
  every journey whose week the app cannot infer — which, after R4, is all of them except 8h48. An
  option that fires on one input is Option D wearing a condition.

**A fourth binding clause is added by run 2:** whatever G1 picks, **no surface may present the
divisor as arithmetic**. Art. 64 admits two readings for the same journey (caput → 240, parágrafo
único → 200 for a five-day 8h day) and the TST had to settle one of them in Súmula 431. A screen
that shows the number without the day count it assumed is asserting the premise for the user.

---

## Known imprecisions

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|
| — | — | — | None accepted. F1 is a defect, not an accepted imprecision, and only the human may convert it (`AGENTS.md` §4, rule 8). |

---

## Open questions for the human

| # | Question | Why it is the human's |
|---|---|---|
| **Q-H1** | **`planalto.gov.br` has been unreachable from this environment for four consecutive law gates**, now confirmed from two independent network paths (`curl` → `000`; the fetch service → `socket hang up`). Every CLT and lei citation in this repository currently rests on Câmara/Legin as an official-consolidated fallback. Is that permanent, and is the fallback accepted as this repository's standing source for federal statute? | Squad infrastructure. `0004` G2 raised it as Q2; `0007` G1 carried it as P1. Its **súmula** half is now **resolved** (JusLaboris); its **statute** half is not. |
| **Q-H2** | No official host reachable from this session enumerates TST súmula **alterations** by date. Currency for Súmulas 431, 124, 60, 172 and 376 is established through Res. 220/2017 (consolidated book) plus Res. 225/2025 (no cancellation). An alteration between those dates would be invisible to this gate. | An unverifiable currency claim is not a passing one, and the remedy — a monitored source for TST jurisprudence changes — is a standing cost, not a spec decision. |
| **Q-H3** | `spec.md` AC3 requires a ruling for **every** row S1–S22; the orchestrator's boundary gives every non-431 citation to `.specs/0003-citation-registry/`. S19 and S20 are `deferred` rather than ruled. Which instruction wins? | The two are in direct conflict and only the human can reconcile a spec's criterion with a scope boundary set after it. |
| **Q-H1 — amended at run 2** | **Narrowed to the statute half.** The **súmula** half is closed: `juslaboris.tst.jus.br` (primary) plus `tst.jus.br` and `jurisprudencia-backend2.tst.jus.br` (official), all `200` this session. `planalto.gov.br` failed a **third** retrieval path (`WebFetch` → `socket hang up`, run 2) and is now unreachable across **five consecutive law gates**. Every CLT and lei citation in this repository — including **CLT art. 64, parágrafo único**, which run 2 makes load-bearing — rests on Câmara/Legin. Is Câmara/Legin this repository's standing source for federal statute? | Squad infrastructure, and now a dependency of the fix, not only of the citation. |
| **Q-H2 — amended at run 2** | **Narrowed, not closed.** The TST's live cancellation page (`200`, this session) confirms Súmulas 431, 124, 60, 172 and 376 are not cancelled by Res. 225/2025. It enumerates **cancellations**, not **alterations**. A change of wording between Res. 220/2017 and today would still be invisible. | Unchanged: the remedy is a monitored source, a standing cost. |
| **Q-H4** | **F3 is a live legal defect outside this spec's scope** — the app asserts a payment consequence for the art. 66 interregno whose only basis was cancelled in June 2025. It is routed to `0003`, which is running now. If `0003` does not take it, it needs its own owner rather than a fifth carry. | This is exactly the failure mode `0007` exists to stop, reappearing on a different row while the squad watched this one. |

---

# Run 3 — the calculation, settled

`spec.md` was rewritten end to end between run 2 and this gate, on the calculation premise, and it
**states no number**. It hands this gate six open rows — **L3, L4, L5, L8, L9, L11** — plus L12 to
state rather than inherit. All seven are settled below, from primary text fetched in **this**
session. Nothing here is recalled.

**What changed the outcome.** Run 2 ruled that the app's rule *has* a norm (CLT art. 64, parágrafo
único) but is conditional on an operand the app never collects. H2 supplies the operand. This gate's
job was therefore not to re-rule the defect but to fix, to the centavo, the number the collected
operand produces — and to sweep the whole input domain rather than the five journeys run 2 rendered.

## Sources fetched at this gate

Every row below was retrieved in this session. **No number in § *Run 3* rests on a source not in this
table**, and no commercial aggregator appears in it (P1, H1).

| Host / artifact | Path | Status | Bytes | Class | What was read |
|---|---|---|---|---|---|
| `www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html` | `curl` → `w3m -dump` → read locally | `200` | 1 790 529 | official-consolidated (H1) | CLT arts. **58**, **58-A**, **59**, **59-A**, **59-B**, **64**, **67**, **224**, **225**, **611-A** — verbatim, each with its altering lei named in the consolidated text |
| `www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-publicacaooriginal-1-pl.html` | `curl` → `w3m -dump` | `200` | 405 504 | official | **CF art. 7º, XIII, XIV, XV, XVI** verbatim |
| `www2.camara.leg.br/legin/fed/lei/1940-1949/lei-605-5-janeiro-1949-367115-normaatualizada-pl.pdf` | `curl` → `pdftotext -layout` | `200` | 66 256 | official-consolidated | **Lei 605/1949 arts. 1º, 6º, 7º (a–d, §1º, §2º), 8º, 9º** verbatim |
| `www.tst.jus.br/documents/10157/63003/Livro-Internet.pdf` | `curl` → `pdftotext -layout` | `200` | 3 496 811 | official-consolidated | **Súmulas 124 (com o histórico integral), 172, 85, 431, 444** and **OJ-SBDI1-396**, verbatim |
| `www2.camara.leg.br/legin/fed/lei/1940-1949/lei-605-5-janeiro-1949-324146-*` | `curl` | `404` | ≤ 280 | — | The Legin id used at run 2 for Lei 605 **does not resolve**. The correct id is **367115**, recorded here so the next gate does not re-spend on it. |
| `legislacao.presidencia.gov.br` | `curl` | `000` | 0 | — | Unreachable, consistent with `planalto.gov.br`. Q-H1 unchanged. |

**The trap named in `spec.md` § Non-goals was avoided again:** the two PDFs were extracted locally
with `pdftotext` and read as text. No summariser stood between this gate and a norm.

**Working tree at this gate:** `lib/salary-period.ts`, `lib/weekly-rest.ts`,
`components/organisms/salary-calculator.tsx` and `hooks/use-salary-calculator.ts` are still at
`486a2b3`, unchanged since run 2. **§ *W*'s measurements therefore still describe this build**, and
are re-ruled below rather than re-rendered.

---

## R6 — L3. The conversion, and the multiplier is exactly **5**, with no rounding.

**Ruling:** `dias de trabalho por mês = dias trabalhados por semana × 5`, and therefore

```
divisor (horas por mês) = jornada diária (h) × dias por semana × 5
                        = horas semanais × 5
```

The factor **5** is `30 ÷ 6`. **It is not "the number of weeks in a month", and the `product-manager`
is right that a month does not have five of them** — the run-2 phrase *"5 dias × 5 semanas"* is
corrected here, at the gate that wrote it. The two operands of `30 ÷ 6` are both fixed by norm:

| Operand | Value | Norm | Verbatim basis |
|---|---|---|---|
| Paid days of the mensalista's month | **30** | **CLT art. 64, caput** ("por 30 (trinta) vezes o número de horas dessa duração") and **Lei 605/1949, art. 7º, §2º** ("cujo cálculo de salário mensal … sejam efetuados na base do número de dias do mês ou de trinta (30)") | § *Sources fetched at this gate* |
| Days of the week available for work | **6** | **Lei 605/1949, art. 1º** ("repouso semanal remunerado, de vinte e quatro horas consecutivas") and **CLT art. 67** ("descanso semanal de 24 (vinte e quatro) horas consecutivas"), read with **CF art. 7º, XV** | idem |

A norm-fixed month of 30 paid days contains exactly **five** norm-fixed weeks of 6 available days.
Both numbers are legal fictions, neither is a calendar reading, and **nothing is rounded at this
step** — which is the whole answer to the `product-manager`'s L3 question about rounding direction:
there is no rounding to direct. The only rounding in the chain is on the *product*, § *Run 3 —
rounding*.

**The two operative units of art. 64 are continuous under this reading, and that is the test that
proves it.** At `dias = 6`, `dias de trabalho por mês = 30`, the parágrafo único's condition
(*"sendo o número de dias inferiores a 30"*) is **not** met, and the caput applies with its own 30 —
the same number. At `dias < 6` the condition is met and the parágrafo único substitutes
`dias × 5 < 30`. The two units never disagree about which one governs.

### The TST states this arithmetic in its own words — and states both readings

The **histórico of Súmula 124** (read verbatim at this gate) is the primary evidence for R6, because
it is the TST doing the same arithmetic on both bases, for the same worker, in one text:

> **Nº 124 Bancário. Hora de salário. Divisor** (redação alterada em 14.09.2012, Res. 185/2012)
> **I** – O divisor aplicável para o cálculo das horas extras do bancário, **se houver ajuste
> individual expresso ou coletivo no sentido de considerar o sábado como dia de descanso
> remunerado**, será: **a) 150**, para os empregados submetidos à jornada de seis horas, prevista no
> caput do art. 224 da CLT; **b) 200**, para os empregados submetidos à jornada de oito horas, nos
> termos do § 2º do art. 224 da CLT.
> **II** – **Nas demais hipóteses**, aplicar-se-á o divisor: **a) 180** […]; **b) 220** […].

Executed: item I is `jornada × 25` (6 × 25 = **150**; 8 × 25 = **200**) — the five-day week, the
parágrafo único's base. Item II is `jornada × 30` (6 × 30 = **180**; 8 × 30 = **220**) — the six-day
week, the caput's base. **Both branches are `jornada × dias por semana × 5`.** The operand that
selects between them is named by the TST itself: **whether the sábado is a repouso remunerado (5
working days) or a dia útil não trabalhado (6)** — which is exactly the quantity H2's field collects.

**Súmula 431 then fixes the general-regime answer at the one point where it mattered.** For a
40-hour week it is **200**, i.e. the 25-day base — *not* the 240 that art. 64's caput would give a
five-day 8-hour day. Run 2's ¶1 stands: the article admits two readings and the Tribunal had to
settle one.

### Why not the calendar, and why `lib/weekly-rest.ts` is not the rival reading

A calendar-derived count (`30 ÷ 7 × dias`, or the actual month's days) would give `21,43` working
days for a five-day week and a divisor of **171,43** for a 40-hour week — contradicting Súmula 431
in force, and producing a divisor that changes every month for a contract that does not. **No norm
fetched at this gate derives a divisor from a calendar month.** Art. 64 and Lei 605 art. 7º §2º both
fix **30** regardless of whether the month has 28, 30 or 31 days. `lib/weekly-rest.ts` reads the real
calendar because its own computation (the DSR reflex) has a different operative quantity — see
§ *Run 3 — L9*.

**Domain of the collected operand.** `dias por semana ∈ {1, 2, 3, 4, 5, 6}`. **7 is unlawful** and
must not produce a divisor: Lei 605 art. 1º and CLT art. 67 grant an inderrogable descanso semanal
of 24 consecutive hours. `0` produces no divisor. This bound is a legal rule, not input validation,
and it belongs to whichever control `product-designer` chooses.

---

## R7 — L4. The ceiling, and what the app does above it. **Two clauses, both refusals.**

The divisor divides the salary corresponding to the **duração normal do trabalho** — art. 64 says so
by referring to art. 58. Hours beyond the normal duration are **horas suplementares** (CLT art. 59),
paid at a **50% minimum** premium (art. 59 §1º; CF art. 7º XVI) and **are not part of the divisor's
base**. So when the declared operands describe a week that cannot be a normal week, the app is not
looking at a divisor that is merely unusual — it is looking at a base that does not exist.

**Clause R7a — the weekly ceiling.** `jornada diária × dias por semana > 44 h` → **the app does not
present a divisor.**

> **CF art. 7º, XIII** — duração do trabalho normal não superior a oito horas diárias e quarenta e
> quatro semanais, facultada a compensação de horários e a redução da jornada, mediante acordo ou
> convenção coletiva de trabalho;

**Clause R7b — the daily ceiling, which is 10 hours and not 8.** `jornada diária > 10 h` → **the app
does not present a divisor**, at any day count.

> **CLT art. 59, caput** — A duração diária do trabalho poderá ser acrescida de horas extras, em
> número não excedente de duas […]
> **§ 2º** […] de maneira que não exceda, no período máximo de um ano, à soma das jornadas semanais
> de trabalho previstas, **nem seja ultrapassado o limite máximo de dez horas diárias**.

**Why the daily ceiling is 10 and not CF XIII's 8, stated so no downstream agent re-derives it
wrongly:** CF art. 7º XIII itself makes the 8-hour day compensable (*"facultada a compensação de
horários […] mediante acordo ou convenção coletiva"*), CLT art. 59 §6 licenses compensation *"por
acordo individual, tácito ou escrito, para a compensação no mesmo mês"*, and **Súmula 85, I–II** (read
verbatim at this gate) holds the individual written agreement valid. **The app's own default, 8h48
over five days, is that arrangement.** A daily ceiling of 8 h would refuse to price the product's
stated common case. The binding limit on the *normal* week is therefore the **44 h weekly** figure,
with 10 h as the absolute daily cap of any compensation regime.

**The one lawful arrangement above 10 h is `12×36`, and no norm fetched at this gate fixes its
divisor.**

> **CLT art. 59-A** — […] é facultado às partes […] estabelecer horário de trabalho de doze horas
> seguidas por trinta e seis horas ininterruptas de descanso […]
> **Parágrafo único.** A remuneração mensal pactuada pelo horário previsto no caput deste artigo
> abrange os pagamentos devidos pelo descanso semanal remunerado e pelo descanso em feriados […]

**Súmula 444** (verbatim at this gate) validates the scale and settles the 11th and 12th hours; it
fixes **no divisor**. **Run 2's statement that the 12×36 divisor is "220 in settled practice" is
withdrawn here — it was recalled, not sourced, and no source fetched at either gate supports it.**
The correct ruling is stronger for the user: the scale's week is not expressible as a constant number
of days (it alternates 3 and 4), its monthly remuneration already absorbs DSR and feriados by the
parágrafo único, and **this app must not price it.** R7b refuses it at every day count, which is why
R7b exists as a separate clause rather than as a consequence of R7a.

**Behaviour above either ceiling — binding, and this is what AC2 is written against.** The surface
must **not** render the computed divisor, must not name Súmula 431 or art. 64 beside it, and must
say (a) what the declared operands add up to, (b) that the limit of the **duração normal** is 44 h
semanais (CF art. 7º XIII) — or, under R7b, that beyond 10 h diárias the only lawful regime is the
12×36 of CLT art. 59-A, which this app does not model — and (c) which field to check.
`content-writer` owns the words; the three things that must be said are legal content, not copy.

**Boundary values, stated so the implementation does not choose them:** `= 44,00 h` prices;
`> 44,00 h` refuses. `= 10,00 h` prices (10 h × 4 dias = 40 h → divisor 200); `> 10,00 h` refuses.
Comparisons are made on the **unrounded** weekly product, in minutes, before any display rounding.

---

## R8 — L5. The categories with their own divisors, and the one confirmed contradiction.

The general rule of R6 is the rule for the **regime geral do art. 58, caput** — which is the class
Súmula 431 names. Three categories have divisors fixed elsewhere, and **the app can detect none of
them**, because detecting them would require the profession, which `PRODUCT.md` §7 forbids the app
to store or look up.

| Category | Norm, verbatim at this gate | What it fixes | What this app will show | Gap |
|---|---|---|---|---|
| **Bancário, jornada de 6 h** | **Súmula 124, I, a** (Res. 219/2017, alterada em razão do IRR-849-83.2013.5.03.0138): *"180, para os empregados submetidos à jornada de seis horas prevista no caput do art. 224 da CLT"*. **CLT art. 224, caput**: *"6 (seis) horas continuas nos dias úteis, com exceção dos sábados, perfazendo um total de 30 (trinta) horas de trabalho por semana"* | **180**, unconditionally since 2017 | `6 h × 5 dias` → **150** | **Confirmed contradiction.** The bancário's week *is* 30 h over 5 days, so R6 yields 150 while the súmula in force yields 180 |
| **Bancário, jornada de 8 h** | **Súmula 124, I, b**: **220**, for those under art. 224, §2º (cargos de confiança, excluded from the 6-hour regime and therefore under the 44 h common regime) | **220** | `8h48 × 5` → 220; `7h20 × 6` → 220 | **No gap** — R6 agrees |
| **Turnos ininterruptos de revezamento** | **OJ-SBDI1-396**: *"Para o cálculo do salário hora do **empregado horista**, submetido a turnos ininterruptos de revezamento […] aplica-se o divisor 180"*. **CF art. 7º, XIV**: jornada de seis horas, salvo negociação coletiva | **180**, **for the horista** | `6 h × 6 dias` → **180**; `6 h × 5 dias` → 150 | **Run 2's use of OJ 396 is narrowed here:** its subject is the **horista**, while CLT art. 64 governs the **mensalista**. It does not contradict R6 for this app's user; it is disclosed because the revezamento's week is not a constant day count |
| **Escala 12×36** | **CLT art. 59-A** + **Súmula 444** | The scale's validity and the 11th/12th hours. **No divisor** | nothing — refused by **R7b** | Refusal, plus D4 |

**Worked, because the bancário case is the one that costs money.** Salário R$ 3.000,00, jornada
`06:00`, dias `5`. R6 → divisor 150 → salário-hora **R$ 20,00**. Súmula 124, I, a → divisor 180 →
**R$ 16,67**. The app overstates that worker's hour by **+20,0%**, and every hora extra derived from
it. **This is the reason D4 is mandatory and must sit next to the number**, not in a panel: it is the
only thing standing between this screen and an in-force súmula. It is also the case `spec.md`'s
prohibition on a per-category table makes permanent — correctly, since a profession lookup is
`PRODUCT.md` §7's CCT database under another name, and the honest remedy for a gap the product
refuses to model is to name it.

---

## The input domain, swept

Run 2 rendered five journeys at one asserted day count. With the operand collected the domain is
two-dimensional, so it is enumerated here — **one row per arrangement a real user has**, with R6's
number beside the norm's own. `jornada` is the declared jornada diária; `divisor` is R6's output.

| jornada | dias | horas semanais | divisor (R6) | The norm's own answer | Verdict |
|---|---|---|---|---|---|
| 04:00 | 5 | 20,00 | **100** | Tempo parcial, **CLT art. 58-A** (≤ 30 h) — salário proporcional (§1º). No fixed divisor; R6 governs | ✓ |
| 06:00 | 5 | 30,00 | **150** | **Súmula 124 histórico, I, a** does this exact arithmetic (6 × 25 = 150). Regime geral / art. 58-A | ✓ — **and run 2's "wrong number" is withdrawn**: it was wrong only because the 5 was asserted |
| 06:00 | 6 | 36,00 | **180** | **Súmula 124 histórico, II, a**; OJ 396 for the horista | ✓ |
| 07:20 | 5 | 36,67 | **183,33** | No norm fixes a divisor for a 36h40 week; R6 governs. A lawful week below the cap | ✓ — **run 2's "wrong for the arrangement 7h20 denotes" is withdrawn**, and with it the claim that a non-integer divisor signals an error. It signals a week no súmula happened to need |
| 07:20 | 6 | 44,00 | **220** | R2: the canonical 44 h week | ✓ |
| 08:00 | 5 | 40,00 | **200** | **Súmula 431**, verbatim, exactly | ✓ |
| 08:00 | 6 | 48,00 | — | Above CF art. 7º XIII | **R7a refuses** |
| 08:48 | 5 | 44,00 | **220** | R2. The product's default and its stated common case | ✓ — AC5 preserved to the centavo |
| 08:48 | 6 | 52,80 | — | Above the cap | **R7a refuses** |
| 10:00 | 4 | 40,00 | **200** | Súmula 431 (40 h semanais, whatever the distribution); art. 59 §2º's 10 h cap respected | ✓ |
| 12:00 | 3 | 36,00 | — | 12×36 or nothing lawful above 10 h | **R7b refuses** |
| 12:00 | 5 | 60,00 | — | Above both ceilings | **R7b (then R7a) refuses** — the row the run-2 verdict rested on |
| any | 7 | — | — | Lei 605 art. 1º; CLT art. 67 | **Out of domain** (R6) |
| 06:00 | 5 | 30,00 | 150 | **bancário: 180** (Súmula 124, I, a, in force) | **Undetectable by the app → D4** |

**Twelve of the fourteen rows are either correct or a refusal this gate specifies.** The two that are
not — the bancário row and the 12×36 row — are refused or disclosed, and neither can be resolved
without an input `spec.md` forbids at every gate.

---

## Run 3 — order of operations

Binding, in this sequence. Step 0 is new and is the whole point of H2.

| # | Step | Base | Source |
|---|---|---|---|
| **0** | Read `dias por semana` from the collected field. Domain `{1…6}`; outside it, stop and render no divisor | the user's declaration | R6, Lei 605 art. 1º / CLT art. 67 |
| **1** | `horas semanais = jornada diária × dias por semana`, computed **in minutes**, unrounded | the two declared operands | R6 |
| **2** | **Ceilings, before any divisor exists.** If `jornada diária > 10 h` → stop (R7b). Else if `horas semanais > 44 h` → stop (R7a). In both cases render the refusal, never the number | the unrounded product of step 1 | CF art. 7º XIII; CLT art. 59 caput e §2º, art. 59-A |
| **3** | `divisor = horas semanais × 5`, rounded **once**, half-up, to 2 decimals | step 1 | R6; CLT art. 64 caput e parágrafo único; Lei 605 art. 7º §2º |
| **4** | Compare the **rounded** divisor of step 3 with the carga horária mensal the user declared. Warn when `|declarada − divisor| ≥ DIVISOR_TOLERANCE_HOURS` | the rounded divisor — so the number compared is the number shown | tolerance is a **product choice** (F7), not a norm |
| **5** | Name a norm **only** where its text covers the declared case: **Súmula 431** only when `horas semanais = 40`; **CLT art. 64** (caput when `dias = 6`, parágrafo único when `dias < 6`) otherwise, with **Lei 605 art. 7º §2º** for why the month is 30 paid days | the declared operands | R1, R6 |
| **6** | Money: `salário-hora = salário mensal ÷ carga horária mensal declarada`. **Every period figure is derived from the unrounded salário-hora**; rounding to the centavo happens only on each displayed value | the declared carga, never the divisor | CLT art. 64; § *Run 3 — rounding* |

**Step 6 is stated because the app already behaves this way and must keep doing so.** The divisor is a
*check* on the carga the user declared; it is not the denominator of the money on screen. Silently
swapping the declared carga for the computed divisor would move every number on the tab and is
forbidden by AC9.

### Worked example E3 — the defaults, to the centavo (AC5)

| | |
|---|---|
| Input | salário R$ 3.000,00 · jornada `08:48` (528 min) · **dias `5`** · carga mensal declarada `220` |
| Step 1 | `528 × 5 = 2 640 min = 44,00 h` semanais |
| Step 2 | `8,80 ≤ 10` and `44,00 ≤ 44` → prices |
| Step 3 | `44,00 × 5 = 220` → **220** (integer; no rounding occurs) |
| Step 4 | `\|220 − 220\| = 0 < 1` → **no warning**, exactly as today |
| Step 6 | hora `3000 ÷ 220 = 13,636363…` → **R$ 13,64** · dia `13,636363… × 8,8 = 120,00` → **R$ 120,00** · semana `13,636363… × 8,8 × 5 = 600,00` → **R$ 600,00** · mês **R$ 3.000,00** · ano `× 13` = **R$ 39.000,00** |

**The chaining trap, proven with the same numbers.** Deriving the Semana row from the *rounded* hora
gives `13,64 × 8,8 × 5 = R$ 600,16` — **16 centavos** that exist nowhere in the user's contract. The
rule in step 6 is what prevents it, and `amountForPeriod` already satisfies it by computing from the
unrounded `hourlyAmount`. **Do not change that when N1 is applied.**

**Identity worth pinning in a test:** whenever the declared carga equals the computed divisor,
`semana = salário mensal ÷ 5`, for **every** day count — `3000 ÷ 5 = 600,00` above, and the same at
`07:20 × 6`. It falls out of `divisor = horas semanais × 5` and is a one-line falsifiable check on
both N1 and R6 at once.

### Worked example E4 — a real mismatch, rendered

| | |
|---|---|
| Input | salário R$ 3.000,00 · jornada `07:20` (440 min) · **dias `5`** · carga declarada `220` |
| Step 1 | `440 × 5 = 2 200 min = 36,6667 h` |
| Step 3 | `36,6667 × 5 = 183,3333…` → half-up, 2 dp → **183,33** |
| Step 4 | `\|220 − 183,33\| = 36,67 ≥ 1` → **warning** |
| Display | **`183,33`** — comma, through the repository's existing pt-BR formatter (F2/L12) |
| Step 5 | `36,67 h` semanais is not 40 → **Súmula 431 may not be named here.** The citable norm is **CLT art. 64, parágrafo único** (`dias de trabalho por mês = 25`) |
| If the user adopts it | hora `3000 ÷ 183,33 = 16,3639…` → **R$ 16,36** |

### Worked example E5 — above the ceiling (AC2)

| | |
|---|---|
| Input | salário R$ 3.000,00 · jornada `12:00` · dias `5` · carga declarada `220` |
| Step 1 | `720 × 5 = 3 600 min = 60,00 h` semanais |
| Step 2 | `12,00 > 10` → **R7b stops it**; `60,00 > 44` → R7a would too |
| Rendered | **no divisor, and no norm name.** The surface says: the declared operands add up to 60 h semanais; the duração normal is capped at 44 h (CF art. 7º XIII) and at 10 h diárias in any compensation regime (CLT art. 59 §2º); above 10 h the only lawful regime is the 12×36 (CLT art. 59-A), which this app does not model (D4); and which field to check |
| What must **not** happen | the current build's `300`, the words *"e não 220"*, the norm name, and the sentence *"Usar um divisor maior do que o devido reduz o valor de cada hora sua"* — which on these operands argues a worker from **R$ 13,64** toward **R$ 10,00** |

---

## Run 3 — rounding (L12), stated so nothing is inherited from `Math.round`

| Quantity | Unit | Direction | Applied | Rendered |
|---|---|---|---|---|
| `horas semanais` (steps 1–2) | minute | **none — never rounded** | the ceiling comparisons read the exact minute product | not rendered |
| Divisor (step 3) | hora, **2 decimals** | **half-up** | **exactly once**, on the final product | **pt-BR, comma**: `183,33`, never `183.33` |
| Tolerance comparison (step 4) | hora | — | on the **rounded** divisor | — |
| Salário-hora and every period figure (step 6) | centavo | **half-up** | **only on each displayed value**, from the unrounded hourly | pt-BR currency |

`Math.round(x)` in JavaScript rounds half **up** for positive values, and every quantity here is
positive, so `Math.round(x * 100) / 100` implements the divisor rule. **What is binding is the rule,
not the expression** — it is written here because run 2 found it nowhere in the repository.

**Formatting.** The repository already ships `AMOUNT_FORMATTER` at `lib/utils.ts:48`
(`Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })`). Using it
renders `220,00` for an integer divisor. **That is acceptable and no new formatter may be added for
it:** every divisor any norm in this analysis fixes is an integer, so a trailing `,00` adds no false
precision, while a decimal point in a pt-BR interface is a defect. The mandatory clause is **the
comma**; the number of decimals is a presentation choice bounded by *never more than two*.

---

## Run 3 — L8. The "Semana" figure uses the collected day count.

**Ruling: yes**, `spec.md` Q3's default holds, and AC8 stands. `amountForPeriod`'s `week` case
(`lib/salary-period.ts:32`) asserts a fact about **this user's contract** — clause C — and after H2
the app has the user's own answer for it. Keeping the literal `5` there would mean asking the
question and ignoring it one row below.

**It is not, however, subject to R7's refusals.** The Semana figure attaches to **no norm**: it is
the user's declared operands multiplied by a rate the user also declared. Above the ceiling the
*divisor* must disappear because it is an entitlement claim under art. 64; the Semana row is
arithmetic on the user's own statement and may keep rendering. **The condition is that it is never
presented under a norm name** — no "pela Súmula", no "o devido", no "a que você tem direito" — which
is clause A of this spec's own domain test applied to a number rather than a sentence.

`__tests__/salary-period.test.ts:36` (*"counts five working days in a week"*) currently pins the
constant. Per AC8 it must assert the **relation** — that the Semana figure follows the collected
count — at a day count other than 5.

---

## Run 3 — L9. `lib/weekly-rest.ts` is **not** a defect, and **D5 is retired**.

`spec.md` Q4 offers two answers, defect or disclosure. **Neither is right, and the option set was
not exhaustive.** The two counts are **different quantities**, each correct for its own norm:

| | Divisor (`lib/salary-period.ts`) | DSR (`lib/weekly-rest.ts`) |
|---|---|---|
| Operative quantity | `dias de trabalho por mês` — how many days **this contract** obliges work | `dias úteis do mês` — how many days of the **calendar** are not repouso |
| Norm | CLT art. 64, parágrafo único | Lei 605/1949 art. 1º e art. 7º, a; Súmula 172 |
| Month | the norm-fixed **30** (art. 64 caput; Lei 605 art. 7º §2º) | the **real** month, 28–31 days |
| Depends on the user's day count? | **Yes** — it *is* the user's day count | **No** |

A worker contracted for five days still has a **sábado that is a dia útil não trabalhado**, not a
repouso, unless a norma coletiva says otherwise — which is the very distinction the TST draws in the
Súmula 124 histórico quoted in R6. So counting every day except the domingos is the correct
denominator for the DSR reflex **whether the user works five days or six**, and it does not
contradict a collected day count. **Running a user's declared 5 into that denominator would be the
defect**, not leaving it out.

**Consequences, all three of them:**

1. **N2 is not a defect.** `spec.md` § Out of scope's exclusion holds on its own terms and the spec
   does **not** return to G1. The override route L9 offered is examined and declined, with a reason.
2. **D5 is retired at this gate**, before anyone words it or places it. As `spec.md` writes it — *"the
   two surfaces may not describe the same week"* — it would tell the user that a correct number is
   suspect, which is a disclosure that creates the doubt it claims to resolve. `PRODUCT.md` §4
   obliges the app to name gaps, not to manufacture them. **`content-writer` and `product-designer`
   have nothing to write or place for D5**, and the first-screen area it would have spent (AC15,
   `0010`) is not spent.
3. **The real disclosure it points at belongs to the DSR surface, not this one**, and is recorded as
   **F8** below with the owner and trigger `spec.md` already assigned to N2. Moving it here would
   widen a spec at its bounce ceiling to word a sentence next to a number this diff does not touch.

---

## Run 3 — L11. A default is not a norm, but a **silent operand** is a citation defect. **D6, restated as a testable rule.**

**No norm sets a default number of working days**, and none could: art. 64's operative term is a fact
about one contract. H2's `5` is therefore a **product choice**, and saying *"5 é um padrão"* would
disclose the wrong thing — the user does not need to know the app has defaults; they need to know
**which number produced the figure they are reading**.

**Binding rule (D6, replacing the spec's wording):** wherever the app renders a divisor, **the same
sentence names both operands it was computed from — the jornada diária and the dias por semana — as
values, not as concepts.** *"…8h48 por dia em 5 dias por semana…"*, with the current value of the
field interpolated, not a fixed word.

This is stronger than a caveat and cheaper in space: a user who never touched the field still reads
the operand the app assumed, so **the silent assertion — the actual defect X1 turned out to be —
cannot exist in any state**, defaulted or edited. It also satisfies D2 in the same clause, and it is
falsifiable: render the surface, read the `role="status"` textContent, and check that the declared
day count appears in it as a number.

**It applies to every surface that states a divisor, not only the mismatch warning.**
`components/organisms/salary-calculator.tsx:136-138` — *"Para a jornada de 8h48 por dia o divisor é
220 horas por mês"* — is a clause-B assertion with the day count missing, in the banner shown when the
carga mensal is empty. It is inside this spec's domain and D6 binds it too.

---

## Run 3 — amendments to § *W* and to the divergences

Stated at the gate that found the error, per this gate's own rule, so no downstream agent reconciles
prose against a measurement.

| § *W* row | Run-2 verdict | **Run-3 verdict** | Why it moved |
|---|---|---|---|
| 360 (6 h) → `150` | assumption-dependent, uncitable as shown | **correct once the operand is collected**, for a declared 5-day week (30 h). Uncitable only while the 5 is asserted | The TST does this exact arithmetic in the Súmula 124 histórico, I, a. The 180 cases are **bancário** (D4) and the **horista** em turnos (OJ 396's own subject) |
| 440 (7h20) → `183.33` | wrong for the arrangement 7h20 denotes | **correct for a declared 5-day week** (36h40). The defect is the **decimal point** (F2), not the value | 7h20 denotes the six-day 44 h week only when six days are declared; with the operand collected the app no longer guesses which |
| 480 (8 h) → `200` | unsound | **correct when `dias = 5`; refused when `dias = 6`** (48 h > 44). No longer unsound, because the app stops inferring the week | R6 + R7a |
| 528 (8h48) → no warning | ✓ | ✓ unchanged — AC5 | — |
| 720 (12 h) → `300` | wrong, inverted harm, unlawful premise | **refused at every day count** (R7b) | 12×36 is the only lawful regime above 10 h and no source fetched at either gate fixes its divisor |

**Run 2's claim that a non-integer divisor "is itself a signal that the computation left the covered
cases" is withdrawn.** It is true only of the divisors the norms happened to fix; a lawful 36h40 week
has a divisor of 183,33 and nothing is wrong with it.

**Divergences from the code — run-3 amendments.** Severities and file:line unchanged unless stated.

- **F1 (critical)** — the repair is now fully specified: R6 for the formula, R7 for the ceilings, R6's
  domain `{1…6}` for the field, and § *Run 3 — order of operations* for the sequence. `lib/salary-period.ts:3,5`
  (`WORK_DAYS_PER_WEEK`, `WEEKS_IN_DIVISOR`) are replaced by **one parameter** (the collected count)
  and **one constant** — `WEEKS_PER_MONTH_DIVISOR = 5`, which is `30 ÷ 6` and carries CLT art. 64
  caput + Lei 605/1949 art. 7º §2º + CLT art. 67 as its source comment (`AGENTS.md` §8).
- **F2 (serious)** — unchanged, and now bounded: the comma is mandatory, `AMOUNT_FORMATTER` at
  `lib/utils.ts:48` is the formatter, no new one may be added.
- **F4 (serious)** — unchanged, plus `components/organisms/salary-calculator.tsx:136-138` is named
  explicitly under D6: the same banner asserts a divisor with no day count and no norm.
- **F5 (moderate)** — resolved by F1's shape: the surviving constant is the norm's own `30 ÷ 6`.
- **F6 (moderate)** — unchanged. `DEFAULT_MONTHLY_HOURS = 220` moves to `lib/` with R2 as its source;
  **the value does not change** (AC9). Its norm line is CF art. 7º XIII + CLT art. 64 + Lei 605 art.
  7º §2º — not Súmula 431, which fixes 200.
- **F7 (moderate)** — unchanged: `DIVISOR_TOLERANCE_HOURS = 1` is a **product choice**. Confirmed at
  this gate against the whole corpus read for R6/R7/R8: **no norm sets a tolerance on a divisor.** It
  must be labelled as a product choice where it is defined.
- **F8 — new, moderate, routed, not in scope.** `lib/weekly-rest.ts:10-14` counts `restDays` as the
  **domingos only**. **Lei 605/1949, art. 1º** (verbatim at this gate) places the *feriados civis e
  religiosos* alongside the domingo as repouso remunerado, and art. 7º, a computes that remuneration
  *"computadas as horas extraordinárias habitualmente prestadas"*. Omitting the feriados understates
  the DSR reflex. **Owner `labor-law-analyst`; trigger: the same one `spec.md` assigns to N2 — the
  next spec that opens `lib/weekly-rest.ts` or the DSR surface.** It is recorded, not repaired: the
  DSR formula was not re-verified as a computation at any run of this gate, and this spec is at its
  bounce ceiling.

---

## Run 3 — the constants, written so `lib/` can be rebuilt from this file alone

`AGENTS.md` §5 rebuild contract. Every value below is norm-fixed and year-independent — none of them
belongs to `LEGAL_YEARS`, because none has ever been changed by a portaria.

| Constant | Value | Unit | Norm | Effective | Source |
|---|---|---|---|---|---|
| `PAID_DAYS_PER_MONTH` | **30** | dia | CLT art. 64, caput; Lei 605/1949 art. 7º, §2º | 1943-05-01 / 1949-01-05 | Câmara/Legin (§ *Sources fetched at this gate*) |
| `WORK_DAYS_AVAILABLE_PER_WEEK` | **6** | dia | CLT art. 67; Lei 605/1949 art. 1º; CF art. 7º, XV | 1943-05-01 / 1949-01-05 / 1988-10-05 | idem |
| `WEEKS_PER_MONTH_DIVISOR` | **5** | — | `30 ÷ 6`, the two rows above. **Not "weeks in a month"** | — | R6 |
| `WEEKLY_NORMAL_HOURS_CAP` | **44** | hora | CF art. 7º, XIII | 1988-10-05 | Câmara/Legin |
| `DAILY_HOURS_CAP` | **10** | hora | CLT art. 59, §2º (com Súmula 85, I–II para o acordo individual) | 1943-05-01, red. MP 2.164-41/2001 | Câmara/Legin; TST Livro |
| `DEFAULT_MONTHLY_HOURS` | **220** | hora/mês | `44 × 5` — CF art. 7º XIII + CLT art. 64 + Lei 605 art. 7º §2º. **Não é a Súmula 431** | — | R2, R6 |
| `DIVISOR_TOLERANCE_HOURS` | 1 | hora | **none — product choice** (F7) | — | — |

**The divisors the norms themselves fix**, for the traceability audit at G6 — any user-visible
divisor equal to one of these must cite the row, and any other divisor must cite R6:

| Divisor | Case | Norm | Source |
|---|---|---|---|
| **150** | 30 h semanais em 5 dias (sábado como descanso) | Súmula 124, **histórico**, I, a — TST's own arithmetic on the 25-day base | TST Livro |
| **180** | bancário, jornada de 6 h do art. 224, caput | **Súmula 124, I, a** (Res. 219/2017, em vigor) | TST Livro |
| **180** | horista em turnos ininterruptos de revezamento | **OJ-SBDI1-396** | TST Livro |
| **200** | 40 horas semanais, regime geral do art. 58, caput | **Súmula 431** (Res. 185/2012, em vigor) | JusLaboris (run 2), TST Livro (run 3) |
| **220** | 44 horas semanais; bancário do art. 224, §2º | R2; **Súmula 124, I, b** | Câmara/Legin; TST Livro |
| **240** | the art. 64 **caput** reading of a five-day 8 h day | CLT art. 64, caput — **superseded by Súmula 431 for the regime geral**; recorded so the reading is not re-derived as new | Câmara/Legin |

---

## Run 3 — disclosures, final state

D1–D4 stand as amended at run 2. **D5 is retired** (L9). **D6 is restated** (L11). This table is the
one `product-designer` and `content-writer` inherit; `spec.md` § *Disclosure obligations* is
superseded by it wherever the two differ, which is D5 and D6.

| # | Status | What must be said, and where |
|---|---|---|
| **D1** | stands | Beside any divisor: it follows from **what the user typed**, and a convenção or acordo coletivo may pactuar a different jornada (CLT art. 611-A, I) and therefore a different divisor — which this app cannot know (`PRODUCT.md` §7) |
| **D2** | stands, **and D6 satisfies it in the same clause** | That the same daily journey belongs to different weekly durations depending on the day count, and that the day count is **the variable the norm itself makes the divisor depend on** (CLT art. 64, parágrafo único) — not a simplification this app invented |
| **D3** | stands | Where a norm is named: **the case it covers**, with the scope word beside the norm name (lesson 004). **Súmula 431 → 40 horas semanais.** Under step 5, it may be named only in that case |
| **D4** | stands, **and is now the most load-bearing of the six** | That bancários (Súmula 124), turnos ininterruptos de revezamento (OJ 396) and the escala 12×36 (CLT art. 59-A) have divisors fixed by their own norms and **this screen does not model them**. Worked in R8: the 6 h bancário reads **R$ 20,00** here against the **R$ 16,67** the súmula gives. Visible next to the number, never in a collapsed panel (lesson 018) |
| **D5** | **retired at G2 run 3** | Nothing to write and nothing to place. Reason and re-routing in § *Run 3 — L9*; the DSR-side disclosure it pointed at travels with **F8** |
| **D6** | **restated, and it is a rule about the sentence, not a caveat** | The divisor sentence **names both operands as values** — the jornada diária and the collected dias por semana — in the same sentence as the number, in every state, on **every** surface that states a divisor (including `salary-calculator.tsx:136-138`). Falsifiable by reading the `role="status"` textContent |

**Unchanged and binding:** a silent deletion of the Súmula 431 citation is forbidden (lesson 003),
and softening to *"conforme a legislação"* is forbidden (lesson 004). Under step 5 the citation is
**not** deleted — it is **narrowed to the 40 h case and joined by CLT art. 64**, which is a repair,
not a retirement, so no `PRODUCT.md` §9 non-claim is required for it.

**`PRODUCT.md` §9 (spec.md Q5):** this gate's rulings **do** change what the product may claim — it
may now claim a divisor derived from declared operands and cited to art. 64, and it must stop
claiming a divisor for weeks above the ceiling. That is a **human approval point** and is left as
such; it is not this gate's to write.

---

## Run 3 — what G6 will check, so the build is not surprised

1. Every table value in `lib/` against § *Run 3 — the constants*, digit by digit, read from the
   constant and not from a test.
2. The fourteen rows of § *The input domain, swept*, rendered, with the `role="status"` textContent
   quoted verbatim beside the row — this is AC3 widened to the collected operand.
3. E3, E4 and E5 to the centavo, including the **R$ 600,00 vs R$ 600,16** chaining check.
4. D1, D2, D3, D4 and D6 **rendered** — each in a state that produces it, counted against the number
   of surfaces that can emit a divisor, which is **two** (`salary-calculator.tsx:136-138` and
   `:144-155`). Two surfaces, two rows in the measurement table. A surface that cannot be reached is
   a finding, never an arithmetic substitute for the reading.
5. Every guard cited for a `pass` read at its **source** first: what its selector matches against the
   markup as rendered, what it prints against an empty collection, and what it prints if every member
   is exempt. Two identical answers mean it does not discriminate and cannot carry a verdict.

---

## Run 3 — open questions

**Q-H1** narrows again but does not close: `planalto.gov.br` and `legislacao.presidencia.gov.br` were
both unreachable at this gate, and **H1 settles the policy** — Câmara/Legin is accepted for federal
statute. The remaining question for the human is whether that acceptance is permanent or provisional;
it blocks nothing here.

**Q-H2** unchanged: no reachable official host enumerates TST súmula *alterations* by date. Mitigated
at this gate for the norms that matter to R6/R8 — Súmula 124's own **histórico** and Súmula 431's
were read in the TST's consolidated book, so both alterations are in hand from the publisher.

**Q-H3** closed by the `product-manager` at G1 run 2, in `0003`'s favour. Not reopened.

**Q-H4** unchanged and still open: **F3** (`lib/compliance.ts:65`, OJ 355 cancelled) is routed to
`0003`. **F8** joins the routed set with its own owner and trigger.

**Nothing else is open.** L1, L2, L6, L7, L10, L12 and L13 were settled at runs 1 and 2; **L3, L4,
L5, L8, L9 and L11 are settled above**. No row of `spec.md` § *Legal dependencies* is unanswered, and
no number this feature can show lacks a rule in this file.

## Run 3 — known imprecisions

| Imprecision | Impact on the number | Disclosure that covers it | Accepted by |
|---|---|---|---|
| The app cannot detect a **bancário** and will show 150 where Súmula 124, I, a fixes 180 | **+20,0%** on the salário-hora of a 6 h/5-day bancário | **D4**, visible next to the number | Not an accepted imprecision — it is a **gap the product refuses to model** (`PRODUCT.md` §7) and discloses. If D4 does not ship visible, this becomes a defect and G6 rejects |
| The app cannot know a **convenção coletiva** | Unbounded — a CCT may pactuar any lawful jornada | **D1** | idem |
| The **12×36** scale is refused rather than priced | No number shown | **D4** + R7b's refusal text | idem |
| `DIVISOR_TOLERANCE_HOURS = 1` suppresses a mismatch up to 1 h | ≤ 1 h on the divisor comparison only; no money moves | Must be labelled a **product choice** where defined (F7) | Product choice, `tech-lead`'s to confirm at G4 |

---

# Run 3 — addendum A: D-B1 settled. **D4 is unconditional.**

> Out-of-band ruling on the single item `product-designer` routed at G3. **G2 is not re-run and its
> `pass` stands.** Nothing in § *Run 3* is rewritten; this section amends **D4's rendering condition
> only**. D5 (retired), D6, R7's refusal clauses and R6's arithmetic are untouched and were not
> reopened.

## The question, restated as the legal one it is

`design.md` § 9.1 asks whether the silent-agreement state — `|carga declarada − divisor| <
DIVISOR_TOLERANCE_HOURS`, no banner at all — may ship without D4. A bancário on `06:00 × 5 dias` who
typed `150` sits in exactly that state, reads **R$ 20,00**, and Súmula 124, I, *a* gives that worker
**R$ 16,67** (R8, worked). The designer is right that this is not a design call.

## Ruling — D4 renders in **every** state of the Salário panel, including silence

**The error is mine and it is a domain error, corrected at the gate that made it.** § *Run 3 — what
G6 will check* item 4 counts D4 against *"the number of surfaces that can emit a divisor, which is
**two**"*. That count is correct for **D1, D3 and D6**, whose subject is the divisor the app derives.
It is **wrong for D4**, and `design.md` § 9.1 is the measurement that exposes it.

**The test that fixes D4's domain, stated so no later gate re-derives it:**

> A disclosure's rendering condition is fixed by **the number the user acts on**, never by the
> surface that emits the app's own derived value. Where the omitted variable changes a figure that
> renders unconditionally, the disclosure renders unconditionally.

Executed on the six rows of § *Run 3 — disclosures, final state*:

| # | Subject of the disclosure | Renders when |
|---|---|---|
| **D1** | the **divisor** the app derived (a CCT may pactuar another jornada, so another divisor) | **only where a divisor is stated** — R3, R4. Unchanged |
| **D2** | satisfied inside D6's clause | with D6. Unchanged |
| **D3** | the **norm name** the app printed | only where a norm is named. Unchanged. In R2 no norm is named at all |
| **D4** | the **salário-hora** the user reads and acts on | **every state of the panel, including the one with no banner** — **this is the change** |
| **D5** | retired at G2 run 3 | nothing |
| **D6** | the **divisor sentence** | with the divisor. Unchanged |

**Why the conditioned form is not merely weaker but inverted.** `PRODUCT.md` §4 *Name the gap* binds
where *"the calculation omits a variable a real payslip includes"*, and obliges the app to say so
*"visibly, next to the number"*. The omitted variable is **the category**, which the app is forbidden
to ask for (`PRODUCT.md` §7) and which `spec.md` forbids modelling. That omission is **state-
independent**: it holds identically when the divisor agrees, when it mismatches, and when the week is
refused. A disclosure that appears only alongside a mismatch therefore teaches the reader the
opposite of what it says — that a silent screen is a screen whose number applies to them. **The
agreement state is the one state where the bancário has no other signal at all**, because a bancário
who typed their real `180` lands in R4 and reads D4 there. Conditioning D4 removes it from precisely
the user it was written for.

**The narrower conditions were enumerated and each is refused, with its reason:**

| Candidate condition | Refused because |
|---|---|
| `jornada ∈ {06:00, 08:00}` — the only two jornadas Súmula 124 fixes a divisor for (art. 224 caput and §2º) | It rests on a closure claim this gate has **not** swept: that no *lei especial* fixes a divisor for another jornada. The 0007 corpus sweep covered the TST consolidated book, not the leis de categoria (telefonistas art. 227, and the professional statutes). **A condition I cannot verify is a condition I may not write.** |
| `divisor computado ≠ 180 e ≠ 220` — fire only where the app contradicts a fixed divisor | Same closure defect, plus it is an exact-equality test on a typed duration: it fires at `06:00` and not at `05:59`, for two workers with the same contract |
| Fire only in the mismatch state (Option A as designed) | The inversion above. It is the condition D4 is *least* useful under |
| Satisfy D4 in the permanent footer (`components/organisms/calculator-views.tsx:~80`, the *"Não entram na conta…"* paragraph — ruled `covered` as **S18**) | **Not accepted, and the reason is the adjacency clause, not the surface's quality.** That paragraph is permanent, uncollapsed and correctly written, but it sits in a different region, below every figure it would qualify. `PRODUCT.md` §4 says *next to the number*, and §4's own instrument for a +20,0% error cannot be a footnote two panels down. It may of course keep its existing content; it does not discharge D4 |

**Therefore: `design.md` § 9.1 Option B.** Option A does not satisfy D4. Option C is refused
independently — see *Placement* below.

## The rendering condition, falsifiable

Not a placement. `product-designer` keeps the position; this is the test G6 will run, and it is
written so it discriminates.

1. **Reachability.** D4's text is present in the rendered DOM of the Salário panel **without any
   interaction** — no click, no expand, no scroll-triggered mount — in each of the five states of
   `design.md` § 4 (R1, R2, R3, R4, **and Silence**). Five states, five rows in the measurement table.
2. **Adjacency.** D4 sits inside the **same card element** as the salário-hora figure, with **no
   interactive control and no panel boundary** between the figure and D4 in DOM order. The footer of
   `calculator-views.tsx` fails this clause; the `Impostos e Descontos` panel fails it twice
   (lesson 018).
3. **Non-duplication.** D4's sentence renders **exactly once** per state. If a permanent slot carries
   it, it comes **out** of the R3 and R4 banner bodies — the same 212-character sentence printed twice
   in one state is the fastest way to train a reader past it, and it is not a second disclosure.
4. **A guard cited for D4 must fail when D4 is absent from any one of the five states.** A selector
   that matches the banner body cannot see the Silence state and does not discriminate; it would print
   a pass against a panel that emits no banner at all.

## What it costs, stated the way the refusal clauses were

- **Habituation is real and it is the price.** D4 will render on every correct calculation, and
  readers learn to skip a line that never changes. The mitigation is clause 3 above (one occurrence,
  never two) and the wording bounce below; it is not avoidance.
- **The +60 px in `design.md` § 9.1 is understated by its own arithmetic and must be re-measured
  before G4 plans against it.** At the caption measure the designer states — **46 characters per
  line** — the delivered `D-4` string of **212 characters** is **212 ÷ 46 = 4,61 → 5 rendered lines**,
  not the 3 the option table assumes. At the same 17,4 px line box that is `5 × 17,4 + 8 ≈ **95 px**`,
  not 60. **This does not change the ruling** — the obligation is not priced — but a plan built on 60
  is built on a projection the string contradicts. `product-designer` re-measures by rendering the
  delivered string in the slot, per its own instrument.
- **Against that, clause 3 gives real pixels back**: D4 leaves both banner bodies, which is the
  **−42 px** `design.md` § 8 added to R3 and R4 for it. Net effect is roughly **+95 px** in the two
  states that render no banner today and **≈ +53 px** in the states that do — not +60 px everywhere.
- **First screen: nothing is spent.** `design.md` § 2.3 measures that no complete control reaches the
  first fold at 390 with the form empty; D4's slot sits below the operand pair, below the fold,
  in every state. `0008`'s ceiling and `0010`'s budget are untouched by this ruling.
- **Option C is refused on its merits, and its stated reason is corrected.** `design.md` § 9.1 cites
  `PRODUCT.md` §8 against putting D4 in the hero; **§8 is Monetization and says nothing about hero
  prose**. The correct reason is clause 2: the hero is not where the omission is legible, and
  adjacency to the *card* already satisfies §4. C buys nothing clause 2 does not, and spends the one
  panel the product keeps free of prose.

## Bounce — `content-writer` re-words D4. One string.

**Yes, it needs different wording, and the reason is grammatical before it is legal.** The delivered
`D-4` is written for a slot with a divisor standing above it and refers to it deictically (*"o divisor
acima não vale para você"*). In the Silence state **there is no divisor above it**, and in a permanent
slot the deixis has no referent. More importantly, D4's subject is no longer the divisor: under this
ruling it qualifies **the salário-hora and every figure derived from it**.

Binding on the rewrite, and nothing beyond it:

1. **One string, used in all five states.** Not a banner variant plus a permanent variant.
2. **Its subject is the money on this screen**, not "o divisor acima". No deictic reference to a
   sibling element that does not render in every state.
3. **The three categories stay, with their norms**: bancário (**Súmula 124**), turnos ininterruptos de
   revezamento (**OJ-SBDI1-396**), escala 12×36 (**CLT art. 59-A**). A clause list that loses a
   category is refused, as it was at G3.
4. **≤ 220 characters** stands — the budget `product-designer` already raised.
5. The G3 decisions hold: *bancário* inside the first eight characters; no *"consulte a sua
   convenção"* (`PRODUCT.md` §7 forbids advising); no softening to *"pode estar errado"*, which is the
   shape D5 was retired for (§ *Run 3 — L9*).
6. **R7's refusal text is not D4 and is not merged into it.** The R2 clause *"acima de 10 h a única
   escala lícita é o 12×36 da CLT art. 59-A, que este app não calcula"* is required by R7 on its own
   terms; D4's 12×36 clause may sit beside it.

## D-F1 — not mine, with one clause that is

The 27 → ≤ 19 character label shortening **weakens nothing this gate requires**: D6 binds the
**sentence** that states the divisor, not the field label, and `A-3`/`B-2` carry the operand as a
value regardless of what the label says. **Recommendation (1) is unobstructed by law.**

The one clause that is mine: the operand is **`dias de trabalho por semana`** — art. 64, parágrafo
único's *"dias de trabalho"* — and a label that reads as *days in a week* names a different quantity,
one whose answer is 7. *Dias por Semana* (15) is open to that reading; *Dias Trabalhados* (16) is not.
**Which ≤ 19-character label is `content-writer`'s call**; that it must keep the *trabalhados* sense is
not.

## F9 — new, routed, not repaired here

**The same gap reaches a second panel and this spec does not touch it.** `useGrossHourlyRate`
(`hooks/use-gross-hourly-rate.ts`) carries the salário-hora derived from the declared carga into the
**Jornada** tab, where `components/organisms/day-summary.tsx` prices every hora extra from it
(`components/organisms/work-calculator.tsx:108,206`). A bancário's **+20,0%** therefore propagates
to that panel's figures, which render **no D4 and no banner of any kind**. Under the domain test
above, D4 binds there too.

**Not repaired in `0007`**: `spec.md` bounds this diff to the Salário panel and the one field it adds,
and widening it here would place a disclosure beside numbers this diff never computes. **Owner
`labor-law-analyst`; trigger: the next spec that opens `day-summary.tsx` or the Jornada tab's money
figures.** Recorded with **F8** in the routed set. The permanent footer of `calculator-views.tsx`
renders on both tabs and is unaffected by this routing — it still does not discharge D4 on either.

## What did not change

R6, R7a, R7b, R8, the order of operations, the rounding table, the constants table, E3/E4/E5, the
fourteen swept rows, D1, D2, D3, D5 (retired) and D6 are exactly as § *Run 3* left them. The G2
verdict remains **`pass`**, at run 3.

---

# Run 3 — addendum A, **correction 1**: clause 2 restated, and the three projections replaced by the measurement

> Owner: labor-law-analyst · Gate: `law` · Narrow correction to **§ *Run 3 — addendum A*** only.
> **G2 is not re-run; the run-3 `pass` stands, and D4's unconditional rendering condition stands
> exactly as ruled.** Nothing else in addendum A is rewritten: clauses 1, 3 and 4, the six wording
> clauses of the bounce, the refusal table, the Option C refusal, D-F1 and F9 are untouched.
> Triggered by `design.md` § 15.1, which measured the inversion instead of quietly resolving it.

## 1. What was wrong, in one sentence

**Clause 2 was stated in the axis of the element tree; its substance lives in the axis of the
reader's path.** It required D4 to sit *"inside the same card element as the salário-hora figure,
with no interactive control and no panel boundary between the figure and D4 in DOM order"* — and the
figure does not render in that card at all. `components/templates/calculator-layout.tsx:16-21`
places `main` (the whole Salário card) **before** `aside`, and the figure renders in the `aside`
(`components/organisms/hero-panel.tsx`, mounted at `components/organisms/salary-calculator.tsx:74-76`,
the supporting rate at `:243-245`). `order-first` moves the hero above the card **visually at 390**
and `lg:sticky` parks it beside the card at `lg`; neither moves a node. So no in-card placement can
satisfy clause 2 literally, the only placement that can is the hero, and the same section refuses the
hero as Option C. `design.md` § 15.1 is right on every step of that, and right that the clause — not
the Option C refusal — is the part that is wrong.

This is the **fourth** appearance of the shape lesson **048** names, in a fourth axis (after time,
font size and space): a concealment-and-presence rule written in the one quantity the defect at hand
arrived in. Lesson 048 is confirmed and its axis table gains the **order** row.

## 2. Clause 2, restated. **This text replaces clause 2 of § *Run 3 — addendum A* in full.**

**Substance, stated first so the quantities can be checked against it:** *a reader who acts on the
salário-hora meets D4 on the way, without hunting for it, without operating anything, and before the
screen offers them anywhere else to go.* Each sub-clause below is one measurable quantity of that
sentence. Where a later gate finds a fifth quantity, it is added here rather than folded into another
clause.

**2a — Concealment (presence).** D4's full text is in the rendered layout and in the accessibility
tree of the loaded page with **no interaction of any kind** — no click, no expand, no hover, no
scroll-triggered mount. D4 has no ancestor that is `components/atoms/collapsible-panel.tsx`, no
`details:not([open])`, no `[aria-expanded="false"]` controlled region, no `[hidden]`, no `.sr-only`,
and its rendered `getBoundingClientRect().height` (border box) equals the sum of its measured line
boxes — it is not clipped by an `overflow: hidden` ancestor. *Falsifier: move D4 into the
`Impostos e Descontos` panel; 2a must go red.*

**2b — Reading order, which is the quantity clause 2 should have named.** The order is the **visual
box order the reader traverses**, obtained by sorting the elements in scope on
`getBoundingClientRect().top`, ties broken on `left` — **never** on DOM position, because `order-first`
and `lg:sticky` make those two orders different at 390 and different again at `lg`. In that visual
order, between the salário-hora figure and D4 the reader crosses **at most one panel boundary** — the
top edge of the Salário card (`components/organisms/salary-calculator.tsx:77`) — and **no control that
must be operated for D4 to exist or to be read**. A control the reader merely scrolls past (an input,
the period selector) does **not** breach 2b; a control that must be operated does, and 2a is the test
of it. The page footer of `components/organisms/calculator-views.tsx` breaches 2b — two panel
boundaries below every figure it would qualify — and that footer's refusal in addendum A stands on
this clause, unchanged in outcome.

**2c — Precedence inside the card (the ordinal clause, exact and needing no calibration).** D4 is the
**immediate next box after the field grid** that carries the operands: no element sits between them in
the visual order of 2b. D4 therefore **precedes every conditional content of the card** — both banners
and the `Impostos e Descontos` button — in all five states.

**2d — The measured calibration of 2c, taken from the state I consider correct.** At 390×844, both
themes, `design.md` § 15.3 and § 15.6: D4's document `top` is **1294.2 in every one of the five
states**, against the divisor banner's `top` of **1423.2** in the states that render one — a margin of
**129.0 px**, and the ordering is strict in all five. This is the worked measurement clause 2c is
calibrated against. Where this prose and that measurement ever disagree, **the measurement wins**.

**Verdict on the delivered placement: the `product-designer`'s slot satisfies 2a–2d and does not
re-place.** A single unconditional `<p>`, immediate sibling of the field grid, inside the Salário
card, above every banner and before the `Impostos e Descontos` button, is what the corrected clause
requires — the same placement both readings converged on, now for the stated reason.

**What 2b deliberately does not require, and why.** It sets **no distance floor and no co-presence
floor** between the figure and D4. At 390 the two cannot share a viewport under any in-card placement
(D4's `top` is 1294.2 against an unoccluded band ending at 766), so a co-presence clause would exclude
every placement except the hero — which is Option C, refused. The axis is **left open on purpose**, per
lesson 048's second corollary: if a later gate wants a bound in it, the bound belongs to whichever
panel holds the figure, not to this one.

**Option C's refusal, with its reason corrected a second time.** Addendum A already corrected the
`PRODUCT.md` §8 miscitation. Its replacement reason read *"adjacency to the card already satisfies
§4"*, which is the wrong quantity in exactly the way this correction is about. **The reason is 2b:**
the hero is refused not because the card is closer to the figure in any tree, but because the reader's
path from the figure into the card is already unbroken by any operable control, so C buys nothing 2b
does not — and it spends the one panel the product keeps free of prose.

## 3. The three projected numbers, replaced

`design.md` § 15.4 measured all three and all three were wrong. The measured figures are binding; the
projections in § *Run 3 — addendum A* § *What it costs* are **withdrawn** and must not be planned
against:

| Withdrawn projection | **Binding measurement** (390, both themes, `design.md` § 15.3–15.5) |
|---|---|
| slot ≈ **95 px** (`5 × 17,4 + 8`) | **129.0 px** — 105.0 of text at `--text-body-sm` + 24.0 of `mb-6`. The 5 measured line boxes confirm the line count; the 95 assumed `--text-caption` and omitted the separation |
| return **−42 px** from the banner bodies | **−134.0 px** at 390 (**−71.0** at 1440), on R3 and R4. R4 banner 419.0 → 285.0, R3 378.0 → 244.0 |
| **≈ +95 px** without a banner, **≈ +53 px** with one | **+129.0 px** on R1, R2 and **Silêncio**; **−5.0 px** on R3 and R4 |

**The ruling does not move, and the measurement strengthens it rather than merely surviving it.** An
obligation under `PRODUCT.md` §4 is not priced, so a larger number could not have changed the verdict.
But the correction also inverts the sign in two states, and a plan built on the projection would have
had it backwards: this is **not** a uniform surcharge. The full 129.0 px is paid in the three states
that carried no D4 before — including **Silêncio**, the common case and the exact state the
unconditional ruling exists for — and R3/R4, which already carried it, are **5.0 px cheaper** than the
run-1 design. The cost falls precisely where the disclosure was previously missing.

**First screen: confirmed by measurement, not merely asserted.** 0.0 px above `#salario-bruto`
(864.1 → 864.1) and the slot's `top` of 1294.2 against an unoccluded band ending at 766, in all five
states. `0008`'s ceiling and `0010`'s budget stand as addendum A said they would.

## 4. `--text-body-sm` over `--text-caption`: nothing of mine depends on it, and it discharges better

The type step is the `product-designer`'s call and is not reopened. Stated for the record, because a
disclosure obligation is discharged only by a string a reader can actually read: the step-up to
`--text-body-sm` / `--color-ink-muted` (**5.87:1** light, **7.49:1** dark, `design.md` § 15.5) puts D4
at the same step as `D-1` and `A-3`, which render beside it in two of the five states, and costs
18 px no gate is counting. **No rule of this analysis sets a type step**, and none moves with it: the
**≤ 220 character** budget is mine and is met at **212**; clauses 1, 3, 4 and 2a–2d are indifferent to
the step. Had the step gone the other way — the unconditional disclosure rendered as the least legible
text on its own screen — that would have been a finding at G6 under lesson 018, not a preference.

## 5. What G6 runs, amended

Item 2 of § *Run 3 — addendum A* § *The rendering condition, falsifiable* is replaced by **2a–2d**
above. Items 1, 3 and 4 stand verbatim — five states, five rows; exactly one occurrence per state; and
**any guard cited for D4 must go red when D4 is absent from any one of the five states**, a selector
that matches only a banner body being no evidence at all, since it cannot see Silêncio. The guard's
source is read before any `pass` cites it: what it matches on the markup as it stands, what it prints
against an empty collection, and what it prints when every member is exempt. Two identical answers
mean it does not discriminate.

---

# Run 3 — addendum A, **correction 2**: clause 2d restated over the quantity that is invariant, and D4's obligation in R3 ruled

> Owner: labor-law-analyst · Gate: `law` · Narrow correction to **clause 2d of § *Run 3 — addendum A,
> correction 1*** only. **G2 is not re-run; the run-3 `pass` stands, D4's unconditional rendering
> condition stands, and `product-designer`'s placement is not moved — see § *Does this correction
> exclude the delivered placement?* below, which answers "no" explicitly.** Clauses 1, 2a, 2b, 2c,
> 3 and 4, the six wording clauses of the bounce, the refusal table, the Option C refusal, D-F1 and
> F9 are untouched. Triggered by **F-G5-3** (`tech-lead`, G5 triage), on the measurements
> `product-designer` produced at design run 2a (`design.md` § 15.12) and `tech-lead` produced at G5
> triage (`STATUS.md`, F-G5-1).

## 1. What was wrong, in one sentence

**Clause 2d calibrated an ordinal rule on two absolute coordinates, and an absolute coordinate is the
one quantity on this screen that no state holds still.** It wrote *"D4's document `top` is 1294.2 in
every one of the five states, against the divisor banner's `top` of 1423.2 … a margin of 129.0 px"*.
Three things are wrong with that sentence and one is right:

- **The tops are not state-invariant.** In **R3** the slot's `top` is **1234.30**, not 1294.16, because
  `monthlyHours ≤ 0` is simultaneously R3's own condition and the condition under which
  `components/organisms/salary-calculator.tsx:409` swaps the hero figure for `MISSING_VALUE` and `:428`
  swaps the supporting rate for the prompt; the `order-first` column loses **59.86 px** and every box
  below it in `main` moves up by exactly that (`design.md` § 15.3).
- **The tops are not seed-invariant either.** Unseeded — which is what a driver that types into the
  form produces — the four figure-bearing states read **1310.53**, because `grossSalary` is 0, the hero
  numeral is 7 characters instead of 8, and `components/organisms/hero-panel.tsx:53` sizes the numeral
  **inversely** to its length (`design.md` § 15.3; `STATUS.md` F-G5-1).
- **The margin to `#divisor-alert` is not invariant, because it is anchored to an id and not to the
  next box.** Unseeded, `isRealAmount(grossSalary)` is false and the *"Informe o seu salário bruto"*
  banner (`components/organisms/salary-calculator.tsx:329-333`) renders **between** D4 and
  `#divisor-alert` — 123.0 of banner plus 24.0 of `mb-6` — so the same correct build returns **276.0**.
  Both readings are correct; they measure different distances.
- **What is right** is the substance: D4's own box, and the strict ordering of 2c. Both reproduced in
  every state and both seed conditions. The clause was calibrated on the wrong side of its own rule.

This is the shape `AGENTS.md` §5 *How a claim about the tree is measured* names — **two coordinates,
a tree state and an application state, or it is not yet a fact** — reaching a legal clause. Lesson
**061** is confirmed by this correction, in the gate that wrote the defect rather than in the one that
found it.

## 2. Clause 2d, restated. **This text replaces clause 2d of § *Run 3 — addendum A, correction 1* in full.**

**Substance, stated first so the quantities can be checked against it:** *clause 2c is an ordinal
rule, so its calibration is the size of D4's own box and the strictness of its ordering — never the
coordinate at which either happens to sit.*

### 2d-0 — The two coordinates every number below is read in

Binding on every number in 2d-i and 2d-ii, and on any number a later gate compares against them.

| Coordinate | Value |
|---|---|
| **Tree — baseline** | `5c0c6fa`, built and served in an isolated copy (`design.md` § 15.12, port 3418) |
| **Tree — delivered** | the working tree after `plan.md` T1–T8, **uncommitted at the time of measurement** (`design.md` § 15.12, port 3417; `git status --porcelain` at that moment shows `components/organisms/salary-calculator.tsx` and eight `lib/` modules modified). **G6 restates this coordinate as the sha that carries T1–T8 once it exists**, and every number in 2d-i and 2d-ii must reproduce at that sha to the hundredth of a pixel. A number that does not is a finding against the code, not against this clause |
| **Application — seeded** | `localStorage` written before first paint: `grossSalary 3000`, `monthlyHours 220`, `workMinutes 528`, `salaryPeriod hour`, `workDaysPerWeek 5`, then the one key each of the five states overrides (`design.md` § 14) |
| **Application — unseeded** | nothing in `localStorage`; the five states driven through the controls. **This is the condition an e2e driver produces by default, and it is the condition that produced F-G5-1** |
| **Viewport / theme / box model** | 390×844, `deviceScaleFactor: 2`, `isMobile: true`; **both** themes, set explicitly per context; **border box**; document `top` = `getBoundingClientRect().top + window.scrollY`, the same quantity clause 2b sorts on, never a DOM-ordered walk |

**A reading that names fewer than four of those five rows is not a reading of this clause.** That
omission, and nothing else, is what made 129.0 and 276.0 look like a contradiction.

### 2d-i — The binding calibration: D4's own box. Invariant, and measured in every state

| Quantity | Value at 390 | Measured across |
|---|---|---|
| D4 measure (content width) | **308.0 px** | 5 states × 2 themes, seeded |
| D4 rendered line boxes | **5** | idem |
| D4 `getBoundingClientRect().height`, border box | **105.0 px** | idem |
| separation below D4 (`mb-6`) | **24.0 px** | idem |
| **D4's slot cost = height + separation** | **129.0 px** | **the binding number** |

Source: `design.md` § 15.3, § 15.4, § 15.5 and the 64-cell matrix of § 15.12 item 2. At the other
three widths the same quantity is **87.0** (1440: 63.0 + 24.0) and **74.25** (2560 and 3840: 47.25 +
24.0), in every state and both themes.

**In the unseeded condition the 129.0 is confirmed rather than re-measured, and it is labelled as
such:** `evidence/clause-2d.txt` records `margin = 276.0` in all four banner states and both themes,
and `design.md` § 15.3 measures the intervening *"Informe o seu salário bruto"* banner at
`123.0 + 24.0 = 147.0`; `276.0 − 147.0 = 129.0`, to the pixel. **This is arithmetic on two measured
quantities, not a third measurement, and G6 measures D4's border-box height directly in the unseeded
condition rather than inheriting this line.** A reading other than 105.0 there is a finding.

### 2d-ii — The state-indexed absolutes. Recorded, **not** a threshold

No verdict is taken on any cell of this table. It exists so a reviewer who reads one of these numbers
knows which state produced it, and does not report a second F-G5-1.

| State | D4 `top`, seeded | D4 `top`, unseeded | `#divisor-alert` `top`, seeded | margin D4→`#divisor-alert`, seeded | margin D4→`#divisor-alert`, unseeded |
|---|---|---|---|---|---|
| **R1** out of domain | 1294.16 | 1310.53 | 1423.16 | 129.0 | **276.0** |
| **R2** app declines | 1294.16 | 1310.53 | 1423.16 | 129.0 | **276.0** |
| **R3** carga missing | **1234.30** | **1234.30** | 1363.30 | 129.0 | **276.0** |
| **R4** mismatch | 1294.16 | 1310.53 | 1423.16 | 129.0 | **276.0** |
| **Silêncio** no banner | 1294.16 | 1310.53 | — (no banner) | — | — |

Sources: `design.md` § 15.3 and § 15.6 (seeded, design run 2a, port 3417); `evidence/clause-2d.txt`
and `STATUS.md` F-G5-1 (unseeded). Both themes identical on every cell. **R3 is the same number in
both seed conditions** — 1234.30 — because in R3 the hero holds no figure whose string length could
size the numeral.

**The two deltas, each attributed to a named element rather than reconciled by arithmetic:**

- **−59.86 px in R3, both seed conditions** — the `order-first` hero column measures 402.73 instead of
  462.59, because `:409` and `:428` render the empty state.
- **+16.37 px unseeded, in the four figure-bearing states** — `R$ 0,00` is one character shorter than
  `R$ 12,51`, and `hero-panel.tsx:53`'s `clamp(2.5rem, 208/value.length cqi, 6rem)` makes a shorter
  string a **larger** numeral.
- **+147.0 px on the id-anchored margin, unseeded, in the four banner states** — the
  *"Informe o seu salário bruto"* banner, 123.0 + 24.0 of `mb-6`.

### 2d-iii — How 2c is verified, and the anchor a reviewer must use

**2c is verified as an ordinal relation, plus 2d-i's box. It is never verified by comparing an
absolute `top` to a number in this file.**

1. **The ordering.** Sort every box in the Salário card on `getBoundingClientRect().top`, ties on
   `left`, per 2b. D4 is the immediate successor of the field grid and the predecessor of every
   conditional box the card can emit — in the delivered tree that is the *"Informe o seu salário
   bruto"* banner (`:329-333`), `DivisorSurface` (`:335`), and the `Impostos e Descontos` control.
   **Strict in all five states and both seed conditions**, measured.
2. **The box.** 2d-i: 105.0 + 24.0 = 129.0 at 390.
3. **The anchor is the next box in that sorted order, never an id.** `#divisor-alert` is the next box
   in the seeded condition and is **not** the next box in the unseeded one. A margin measured to
   `#divisor-alert` and compared against 129.0 will read 276.0 against a correct build, which is
   exactly the false positive F-G5-1 turned out to be.
   **Expected value of the next-box distance: 129.0 px at 390 in all five states and both seed
   conditions.** This number is **derived** from 2d-i and from the intervening banner's measured
   147.0 in the four unseeded banner states, and it is **not yet directly measured** in the Silêncio
   state under either condition, nor in the unseeded banner states. **G6 measures it directly, five
   states × two seed conditions × two themes, ten rows**, and any row that is not 129.0 **without an
   intervening box named by selector** is a finding against the code.
4. **Falsifiability of any guard cited for 2c or 2d.** Before a `pass` is written on this clause, the
   guard's **source** is read and three answers written down: what its selector matches against the
   markup as it stands; what it prints when the set is empty; what it prints when D4 is moved into
   `components/atoms/collapsible-panel.tsx` or into the page footer of
   `components/organisms/calculator-views.tsx`. **The third must be red in all five states** — including
   R3 and Silêncio — or the guard measures the seeded banner states and nothing else.

**Where this prose and the measurements in 2d-i/2d-ii ever disagree, the measurements win**, and the
prose is corrected in this file at the gate that found the disagreement — as it was here, and as it
was at correction 1.

## 3. R3 — what D4 owes in the state where the figure it qualifies does not render

`tech-lead` routed this as the analyst's to weigh, and it is the substantive half of F-G5-3.

**The fact, restated from the code rather than from the report.** In R3, `hasMonthlyHours` is false
(`:247`). `:409` renders `MISSING_VALUE` — *"Sem carga horária"* — in the hero's value slot, and
`:428` renders *"Informe a carga horária mensal para calcular"* in place of `supportingRate`
(`:251-254`), which is the only string on the screen that carries *por hora* and *por minuto*.
Measured in the rendered R3 page at 390: both substrings occur **0 times** in
`document.body.innerText` (`design.md` § 15.3). **No divisor-dependent money renders in R3.** The
figures that do render — *Bruto* and *Ganhos Extras* in the hero footer (`:392-401`), *Salário
Líquido*, *Total Recebido* and *Total Descontos* in the stat grid (`:379-401`) — derive from the
**monthly** salary and from the INSS/IRRF tables, never from the divisor, so **none of them is D4's
subject**. On the facts, the state is exactly as `tech-lead` described it.

**Ruling: D4's obligation in R3 is unchanged, and clauses 2a–2d are binding there, not vacuous.**
Four reasons, in order of weight:

1. **The clause has a failing subject in R3, which is the test that decides whether a clause is
   binding in a state.** Move D4 under `components/atoms/collapsible-panel.tsx` and 2a goes red in R3;
   move it into the page footer of `components/organisms/calculator-views.tsx` and 2b and 2c go red in
   R3 — at R3's own tops, 1234.30 against the footer's, with two panel boundaries crossed. A clause
   that can be made red in a state is a clause that does work in that state. **This is the answer to
   "is 2d decoration in R3": it is not, and the falsifier above is why.**
2. **2b's anchor in R3 is the slot, not the number — and the slot renders.** 2b sorts boxes, and the
   hero's value element is a box in all five states: in four it carries a currency figure, in R3 it
   carries *"Sem carga horária"*. The reader's path from that box into the card is the same path, and
   it is measurable in R3 without reading any figure. **2b is satisfiable and non-vacuous in R3, and
   its text is not re-opened** — this records how it is read there.
3. **R3 is the one state where D4 is prospective rather than corrective, and that is when it does the
   most work.** R3's own banner asks for the operand — *"Informe a carga horária mensal / Sem ela não
   dá para saber quanto vale a sua hora"* (`:161-166`, `:167-188`) — and `:179-185` prints a
   `DivisorSentence` with `declaredMonthlyHours={null}`, i.e. **the app states a divisor in R3 and
   invites the user to adopt it**. The bancário of § *Run 3 — addendum A* is the worked case: reading
   D4 **before** typing, they type the 180 Súmula 124, I, *a* fixes; typing the arithmetically honest
   150 instead lands them in **Silêncio**, where no banner ever fires and the +20,0% is never
   signalled again. **R3 is therefore the last state in which the disclosure can change the operand
   rather than merely qualify a number already wrong.** Removing D4 from R3 would remove it from the
   only moment it is preventive.
4. **The omitted variable is the category, and the category's absence is state-independent.** That is
   the whole basis of the unconditional ruling in addendum A, and R3 does not distinguish itself on
   it: the app cannot ask for the category in R3 any more than in Silêncio.

**What R3 does *not* oblige, said so no later gate reads an obligation into this ruling.** 2d sets no
distance floor and no co-presence floor in R3 any more than elsewhere (correction 1, *What 2b
deliberately does not require*), and R3's lower `top` buys nothing and costs nothing: 1234.30 is
**468.30 px below** the last unoccluded pixel of the first screen (766), so R3 remains the worst case
for that clause and still passes it with room (`design.md` § 15.6).

**The delivered string in R3 — checked, and not a defect.** `HOURLY_RATE_SCOPE_DISCLOSURE`
(`components/organisms/salary-calculator.tsx:48-49`) ends *"Se for o seu caso, **o valor da hora nesta
tela é outro**."* In R3 no valor da hora renders. The sentence is nonetheless true and readable there,
because its subject is **the method this screen uses**, not a sibling element on it — which is exactly
what bounce clause 2 of addendum A required and what lesson **049** names. It reads as prospective in
R3 and as corrective in the other four. **No bounce to `content-writer`, and G6 does not raise it.**
The falsifier, recorded for any later revision: **R3 and Silêncio are the two states that falsify any
deictic form** — *"o divisor acima"*, *"o valor acima"*, *"a tabela ao lado"* — and a revision that
reintroduces one is rejected on that pair of states, not on the word.

## 4. Does this correction exclude the delivered placement?

**No.** Asked explicitly by `tech-lead`, answered explicitly: the single unconditional `<p
id="divisor-disclosure">` at `components/organisms/salary-calculator.tsx:325-327`, immediate sibling
of the field grid, inside the Salário card, above the *"Informe o seu salário bruto"* banner, above
`DivisorSurface` and above the `Impostos e Descontos` control, **satisfies 2a, 2b, 2c and 2d as
corrected, in all five states and both seed conditions.** Nothing in this correction re-places
anything, and `product-designer`'s slot stands. Option C's refusal stands on 2b, as correction 1 left
it.

## 5. Two findings this correction produced, routed and not repaired here

**F-G5-3a — `evidence/clause-2d.txt` does not contain what `STATUS.md` says it contains.**
`STATUS.md` records T10 as *"20 lines, each naming its condition"*, matching `tech-lead`'s table in
both seed conditions. The file holds **10 lines**, all of them the **unseeded** condition (`margin=276`
on every banner row), and **no line names its seed condition** — which is the very omission F-G5-1 was
opened for. The seeded half is absent. Severity: **medium**; it is a record defect, not a code defect,
and no ruling in this file rests on the missing half — 2d-ii's seeded column is sourced from
`design.md` § 15.3/§ 15.6, not from this file. **Owner `tech-lead` to route; `frontend-dev` to
complete the file or `tech-lead` to correct `STATUS.md`'s description of T10.**

**F-G5-3b — `evidence/` is gitignored, so no clause may name it as its instrument.**
`git check-ignore -v .specs/0007-sumula-431-citation-scope/evidence/clause-2d.txt` returns
`.gitignore:55:.specs/*/evidence/`, and `git ls-files .specs/0007-sumula-431-citation-scope/evidence/`
returns **0 files**. Under `AGENTS.md` §5, an instrument whose verdict is consumed after the session
must ship on a tracked path. **Clause 2d is therefore written so it is reproducible from its own
text** — 2d-0 states the coordinates, 2d-i the expected quantities, 2d-iii the procedure — **and cites
`evidence/clause-2d.txt` only as the record of a reading already taken, never as the check.** No
change is required of the file; this line exists so a later gate does not promote it into a criterion.
Severity: **low**, informational.

## 6. What did not change

D4's unconditional rendering condition, clauses 1, 2a, 2b, 2c and 3–4, the bounce's six wording
clauses, the refusal table, the Option C refusal, § 3's replaced cost figures, D-F1, F9, R6, R7a, R7b,
R8, the order of operations, the rounding table, the constants table, E3/E4/E5, the fourteen swept
rows, D1, D2, D3, D5 (retired) and D6 are exactly as § *Run 3* and its addendum left them. The G2
verdict remains **`pass`**, at run 3.
