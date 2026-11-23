# 0003 — Legal basis

**pass**

> Owner: labor-law-analyst · Gate: `law` · Run 1 · Date of analysis: **2026-09-15**

---

## 0. The four questions the gate was asked, answered first

**1. Is `PRODUCT.md` §4 currently being kept?**

**No.** Plainly: the app today shows numbers it cannot trace to the norm that produces them, and
links the only citation a user can click to a commercial host. Of the **nine** legal data sets in
`LEGAL_YEAR_2026`, exactly **one** — `rgpsBrackets` — is attributed to the norm that actually sets
it. The other eight are attributed to a Portaria that does not create them. Seven distinct citations
elsewhere in the tree name a norm that does not say the thing the string says, and two assert facts
with no norm anywhere in the tree.

The arithmetic is a different story, and the good news is unambiguous: **every number checked in
this gate is correct to the centavo**, including all five values `0002` left *unverified, not
cleared*. §4 is broken on provenance alone. That is the whole defect, and it is the whole spec.

**2. Is the cited norm, in each case, the norm that says the thing?**
For 8 of the 19 inventory rows, no. See §9, which rules on every row.

**3. The two unsourced assertions.**
- `lib/payroll.ts:32`, *"muitas vezes 14% linear"* → **RETIRE.** No Brazilian norm states it. It is an
  empirical generalisation about 5.570 municipal and 27 state RPPS regimes. §9 C7 gives the sourced
  replacement (EC 103/2019, art. 9º, §4º) and the non-claim row.
- `components/organisms/journey-form.tsx:157`, *"Não existe lei que dobre o adicional depois da 2ª
  hora"* → **RETIRE THE NEGATIVE FORM.** The substance is right and sourceable as a positive
  statement; the universal negative is both unprovable and, read at its own width, **false** — Lei
  nº 605/1949, art. 9º does double the pay, for a different trigger. §9 C15.

**4. The structural fix for `lib/legal-tables.ts`.**
Nine data sets need **six** distinct norms, plus two values that are derived and carry no norm of
their own. The full registry, one row per data set, is §7. It is the shape of the whole spec and it
is not negotiable downstream: `AGENTS.md` §8 requires each constant to carry *its* source, and a
shared `source` field is exactly how C1 became wrong.

---

## 1. Verdict and what it means

**pass.**

This gate settles every dependency L1–L13 in `spec.md` against an official Brazilian host reached in
this session. No number changes and none needs to: the block in `spec.md` § Does any number change?
is **not triggered** — see §6.

The verdict is `pass`, not `reject`, because G2's question is *"is the law settled well enough for
the squad to build the fix"*, not *"is the code correct today"*. The code is not correct today. Every
way in which it is not is written in §10 as an instruction to `tech-lead`, with file and line.

**The veto that survives this pass:** if any string listed in §11 ships without its disclosure, or
any registry row in §7 ships attributed to a norm other than the one named there, G6 rejects. This
section is the standing notice, per `AGENTS.md` §4 rule 8.

---

## 2. The precondition — host reachability, measured in this session

`spec.md` § What "primary source" means makes this the first thing owed, before any row below.
Every host was probed on **2026-09-15** from this tree. Nothing here is recalled; each `200` is a
request made in this session.

| Host | Probe | Result on 2026-09-15 | Used for |
|---|---|---|---|
| `planalto.gov.br` | `GET /ccivil_03/decreto-lei/del5452.htm` | **UNREACHABLE** — connection timed out after 25 s, twice, over `curl` and over `WebFetch` (`socket hang up`) | nothing |
| `www2.camara.leg.br` (Legin) | deep links, see below | **200** | CLT, CF/88, EC 103/2019, Lei 605/1949, Lei 9.250/1995, Lei 15.191/2025, Lei 15.270/2025, Lei 14.848/2024, Lei 4.090/1962 |
| `www.gov.br/previdencia` | `GET /pt-br` and the Portaria PDF | **200** | Portaria Interministerial MPS/MF nº 13/2026 |
| `www.gov.br/receitafederal` | `GET /pt-br/assuntos/meu-imposto-de-renda/tabelas/2026` | **200** | the 2026 IRPF monthly table as the Receita publishes it |
| `www.tst.jus.br` | `GET /sumulas` (302 → SPA) and the Livro PDF | **200** | Súmulas 60, 172, 376; OJ-SDI1 nº 355 |
| `normas.leg.br`, `legis.senado.leg.br` | `GET /` | **200**, but both are JavaScript apps that serve no text to a fetcher | not used — reachable is not the same as citable |
| `www.in.gov.br` | `GET /` | HTTP/2 `PROTOCOL_ERROR` | not used |
| `bibliotecadigital.gestao.gov.br` | the Portaria mirror | **403** | not used |

**Ruling on `planalto.gov.br`.** This is its **third consecutive** failure at a law gate (0002 G2,
0005, and now). `spec.md` settled that an official-but-secondary Brazilian public host satisfies
`PRODUCT.md` §4 and that this needs no waiver. It is applied: **every citation in this file resolves
to `camara.leg.br`, `gov.br` or `tst.jus.br`.** No norm in L1–L12 was left unreachable, so the
human-block in `spec.md` § What "primary source" means is **not triggered**.

**Ruling on the registry's URLs.** Because Planalto has now failed three times in a row, the
registry must **not** be built on `planalto.gov.br` URLs "because they are canonical". The URL a
`sourceUrl` field carries is the URL a user clicks, and a link that times out fails §4 exactly as an
aggregator does — for a different reason, with the same result. **Every `sourceUrl` in
`lib/legal-tables.ts` carries the URL written in §7 of this file**, each of which returned `200` in
this session. If a later gate finds Planalto healthy again, swapping a URL is a one-line change and
needs a new decision in the spec's log, not a silent edit.

**A caveat that belongs to the reader, not to the fix.** Câmara's Legin *norma atualizada* is a
consolidation maintained by the Câmara's Centro de Documentação e Informação. It is official and it
is vouched for by a public body, which is what §4 protects. It is not the *ato* itself. Where this
file quotes a consolidated text, the quoted passage was cross-read against the amending norm's own
publicação original on the same host — for CLT arts. 59, 71 and 73 against Lei nº 13.467/2017's
annotations carried inline, for the IRPF table against Lei nº 15.191/2025's publicação original, and
for the reduction against Lei nº 15.270/2025's publicação original.

### The allow-list, restated as a test

A `sourceUrl` satisfies this analysis when its host matches, exactly:

`planalto.gov.br` · `www.planalto.gov.br` · `in.gov.br` · `www.in.gov.br` · `gov.br` ·
`www.gov.br` · `camara.leg.br` · `www2.camara.leg.br` · `senado.leg.br` · `www12.senado.leg.br` ·
`legis.senado.leg.br` · `normas.leg.br` · `tst.jus.br` · `www.tst.jus.br`

Any other host fails, including any host merely *containing* one of these as a substring — AC2's
test compares the parsed `URL.hostname`, never `includes()`. A string like
`legisweb.com.br/gov.br/...` must fail, and a `hostname` comparison is what makes it fail.

---

## 3. Scope of this analysis

**Covered:** every citation, source field, rate restatement and uncited legal constant in the tree
except the one exclusion below — that is, inventory rows **C1–C19** and dependencies **L1–L13**,
plus any site the A1–A4 test returns that the inventory lacked. Applying the test at this gate
returned **no site the inventory lacks**; `spec.md`'s table is confirmed complete as of Run 1.

Also covered, because a citation this spec re-publishes is a citation this spec signs (lesson 002):
the arithmetic behind every value whose citation is being corrected. That is wider than `spec.md`
item 7 asked for, and it is why §6 can say what it says.

**Not covered, and stated so the silence is not read as clearance:**

- **The Súmula 431 attribution**, at `lib/salary-period.ts:40` and
  `components/organisms/salary-calculator.tsx:151`. Spec **0007** owns it wherever it appears. This
  gate states **no view** on whether the attribution is correct, and a reader must not infer one from
  the fact that `lib/salary-period.ts:3-6` is ruled on here. Two gates ruling on one citation is how
  they diverge.
- **`WEEKS_IN_DIVISOR = 5` and `WORK_DAYS_PER_WEEK = 5`** at `lib/salary-period.ts:3,5`. Both are
  operands of the divisor rule 0007 owns. `PAID_MONTHS_PER_YEAR = 13` is *not* — it is a 13º salário
  assertion, it is ruled on here as C18, and `spec.md` § Boundary is what authorises the split.
- **Anything the A1–A4 test excludes by construction** — `FIELD_MESSAGES`, navigation copy, SEO
  metadata using "CLT" as a search term, `lib/duration.ts`. Re-tested at this gate; the exclusions
  hold.
- **Convenção coletiva rates.** `PRODUCT.md` §7 refuses the database. The app's obligation is the
  disclosure, and §11 states it.

---

## 4. Rules in play

One row per dependency in `spec.md` § Legal dependencies. Every norm below was read **in this
session**, in the text linked, not recalled.

| # | Dep | Rule | Norm that actually says it | Reached |
|---|---|---|---|---|
| R1 | L1 | 2026 RGPS contribution table and its ceiling | Portaria Interministerial MPS/MF nº 13, de 9/1/2026, **Anexo II** | gov.br/previdencia |
| R2 | L2 | 2026 IRPF monthly progressive table — brackets and parcela a deduzir | Lei nº 11.482/2007, **art. 1º, XII**, na redação da **Lei nº 15.191/2025** | camara.leg.br |
| R3 | L3 | Desconto simplificado mensal | Lei nº 9.250/1995, **art. 4º, §2º** (acrescido pela Lei nº 14.663/2023) | camara.leg.br |
| R4 | L3 | The 2026 IRPF reduction and its phase-out | Lei nº 9.250/1995, **art. 3º-A** (acrescido pela Lei nº 15.270/2025, art. 2º) | camara.leg.br |
| R5 | L4 | Dedução por dependente | Lei nº 9.250/1995, **art. 4º, III, "i"** (MP 670/2015 → Lei nº 13.149/2015) | camara.leg.br |
| R6 | L5 | Federal RPPS ladder — the eight rates, 7,5% to 22%, progressive, uncapped | **EC nº 103/2019, art. 11, caput e §§1º e 2º**; faixas de 2026 pela Portaria MPS/MF nº 13/2026, **Anexo III**, na forma do seu art. 10, §§1º e 2º | camara.leg.br + gov.br |
| R7 | L5 | State/municipal RPPS rates are their own, with a floor | **EC nº 103/2019, art. 9º, §4º** | camara.leg.br |
| R8 | L6 | DSR reflects habitual overtime | **Lei nº 605/1949, art. 7º, "a"** + **Súmula 172 do TST** | camara.leg.br + tst.jus.br |
| R9 | L7 | The habitual adicional noturno integrates the salary for every effect, DSR included | **Súmula 60, I, do TST** | tst.jus.br |
| R10 | L8 | Daily overtime ceiling; all hours remain due | **CLT, art. 59, caput** + **Súmula 376, I, do TST** | camara.leg.br + tst.jus.br |
| R11 | L8 | Intervalo intrajornada — 15 min, 1 h, the collective reduction to 30 min, and the 50% indemnity | **CLT, art. 71, caput e §1º**; **art. 71, §4º**; **CLT, art. 611-A, III** | camara.leg.br |
| R12 | L8 | Interjornada of 11 h, and what a shortfall is worth | **CLT, art. 66** + **OJ-SDI1 nº 355 do TST** | camara.leg.br + tst.jus.br |
| R13 | L9 | The 50% overtime floor, uniform across every extra hour | **CF/88, art. 7º, XVI** + **CLT, art. 59, §1º** | camara.leg.br |
| R14 | L10 | Adicional noturno on the prorrogação past 05:00 — **omitted by this app** | **Súmula 60, II, do TST**, exegese do **CLT, art. 73, §5º** | tst.jus.br |
| R15 | L11 | 20% night premium, 52min30s reduced hour, 22:00–05:00 window | **CLT, art. 73, caput, §1º e §2º** | camara.leg.br |
| R16 | L12 | 13º salário | **CF/88, art. 7º, VIII** + **Lei nº 4.090/1962, art. 1º** | camara.leg.br |

---

## 5. Sources

Each entry gives the norm, the article, when it took force, the URL reached on 2026-09-15, and the
rule in the terms the calculator needs. Where the norm's own words decide a downstream comparison
operator or a base, they are quoted.

### R1 — 2026 RGPS contribution table

| | |
|---|---|
| Norm | Portaria Interministerial MPS/MF nº 13, de 9 de janeiro de 2026 |
| Article | Anexo II (empregado, empregado doméstico e trabalhador avulso); art. 12 (vigência); art. 13 (revoga a Portaria MPS/MF nº 6/2025) |
| Effective from | 2026-01-01 for the values; the Portaria itself entered force on publication |
| Superseded by | in force |
| Source | https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf |
| Host | `www.gov.br` — Ministério da Previdência Social |

The Anexo II table is a **progressive** one: each rate applies only to the slice of the
salário-de-contribuição inside its own faixa, and the last faixa closes at R$ 8.475,55, above which
nothing further is contributed. The PDF the Ministry serves is a **scanned image with no text
layer** — it was read at 150 dpi, page 4, rendered from the file linked above. The table is
reproduced digit for digit in §6.

### R2 — 2026 IRPF monthly progressive table

| | |
|---|---|
| Norm | Lei nº 11.482, de 31 de maio de 2007, art. 1º, inciso XII, na redação dada pela Lei nº 15.191, de 11 de agosto de 2025 |
| Article | art. 1º, XII |
| Effective from | **2025-05-01** ("a partir do mês de maio do ano-calendário de 2025"); Lei 15.191 published and in force 2025-08-11 |
| Superseded by | in force for 2026 — Lei nº 15.270/2025 did **not** touch the table; it added a separate reduction |
| Source | https://www2.camara.leg.br/legin/fed/lei/2025/lei-15191-11-agosto-2025-797839-publicacaooriginal-176105-pl.html |
| Cross-check | https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/tabelas/2026 — the Receita's own 2026 page, same five rows, same parcelas |

Lei nº 15.191/2025 also revoked MP nº 1.294/2025. **This is the norm behind the IRRF numbers, and it
is not the Portaria the footer names today.** That single sentence is finding F3.

### R3 — Desconto simplificado mensal

| | |
|---|---|
| Norm | Lei nº 9.250, de 26 de dezembro de 1995, art. 4º, §2º, acrescido pela Lei nº 14.663, de 28 de agosto de 2023 |
| Article | art. 4º, §2º |
| Effective from | 2023-08-28 |
| Superseded by | in force |
| Source | https://www2.camara.leg.br/legin/fed/lei/1995/lei-9250-26-dezembro-1995-362566-normaatualizada-pl.html |

Verbatim: *"Alternativamente às deduções de que trata o caput deste artigo, poderá ser utilizado
desconto simplificado mensal, correspondente a 25% (vinte e cinco por cento) do valor máximo da
faixa com alíquota zero da tabela progressiva mensal, caso seja mais benéfico ao contribuinte,
dispensadas a comprovação da despesa e a indicação de sua espécie."*

Three consequences the implementation must carry, and one trap:

1. The R$ 607,20 in `lib/legal-tables.ts:65` is **not a figure any norm states.** It is
   `0,25 × 2.428,80`, where 2.428,80 is R2's zero-rate ceiling. It therefore needs **two** citations —
   this article for the rule, R2 for the operand — and it changes automatically the year R2 changes.
2. "Alternativamente às deduções de que trata o **caput**" means the comparison is against the whole
   of the caput, which includes both the previdência contribution (inciso IV) and the dependants
   (inciso III). A `max()` against INSS alone would be wrong. The code takes the max against the sum;
   that reading is correct.
3. "caso seja mais benéfico" is the taxpayer's option, exercised monthly by the fonte pagadora on the
   taxpayer's behalf — so taking the larger deduction unconditionally is the right default.
4. The trap: this is the **monthly** simplified discount. It is a different instrument from the
   annual 20% simplified discount in art. 10 of the same Lei, which this app does not compute and
   must not cite here.

### R4 — The 2026 IRPF reduction

| | |
|---|---|
| Norm | Lei nº 9.250/1995, art. 3º-A, acrescido pelo art. 2º da Lei nº 15.270, de 26 de novembro de 2025 |
| Article | art. 3º-A, caput, §§1º, 2º e 3º |
| Effective from | **2026-01-01** ("a partir do mês de janeiro do ano-calendário de 2026") |
| Superseded by | in force |
| Source | https://www2.camara.leg.br/legin/fed/lei/2025/lei-15270-26-novembro-2025-798354-publicacaooriginal-177117-pl.html |

The caput's table, verbatim:

> RENDIMENTOS TRIBUTÁVEIS SUJEITOS AO AJUSTE MENSAL · REDUÇÃO DO IMPOSTO DE RENDA
> **até R$ 5.000,00** · até R$ 312,89 (de modo que o imposto devido seja zero)
> **de R$ 5.000,01 até R$ 7.350,00** · R$ 978,62 − (0,133145 × rendimentos tributáveis sujeitos à
> incidência mensal) (de modo que a redução do imposto seja decrescente linearmente até zerar para
> rendimentos a partir de R$ 7.350,00)

**The base is the gross taxable income, not the IRRF base.** "rendimentos tributáveis sujeitos à
incidência mensal" is the income before the art. 4º deductions, not after. This is the single detail
most generic calculators get wrong, it is the detail `PRODUCT.md` §9 already claims WorkLoad gets
right, and §8 of this file states it as a step with a worked number so it cannot drift.

**§1º** caps the reduction at the tax itself: *"O valor da redução ... fica limitado ao valor do
imposto determinado de acordo com a tabela progressiva mensal e com o disposto no art. 4º desta
Lei."* The reduction can zero the tax; it can never turn it negative.

**§2º** states the hard stop above R$ 7.350,00 — no reduction at all, which is the same thing the
linear formula produces at that point, but stated independently so it is not left to rounding.

**§3º** extends the reduction to the 13º salário's exclusive-at-source withholding. **WorkLoad does
not compute the 13º's tax** — see §11, disclosure D6.

### R5 — Dedução por dependente

| | |
|---|---|
| Norm | Lei nº 9.250/1995, art. 4º, III, alínea "i", acrescida pela MP nº 670, de 10/3/2015, convertida na Lei nº 13.149, de 21/7/2015 |
| Article | art. 4º, III, "i" |
| Effective from | **2015-04-01** ("a partir do mês de abril do ano-calendário de 2015") |
| Superseded by | in force — no norm has raised it since |
| Source | https://www2.camara.leg.br/legin/fed/lei/1995/lei-9250-26-dezembro-1995-362566-normaatualizada-pl.html |

Verbatim: *"i) R$ 189,59 (cento e oitenta e nove reais e cinquenta e nove centavos), a partir do mês
de abril do ano-calendário de 2015"*. Note the effective date: this value is **not** a 2026 value and
must not be attributed to a 2026 norm. It sits in a year-indexed record because the record is
year-indexed, not because the norm is.

### R6 — Federal RPPS ladder

| | |
|---|---|
| Norm (the rates) | Emenda Constitucional nº 103, de 12 de novembro de 2019, art. 11, caput e §§1º e 2º |
| Norm (the 2026 faixas) | Portaria Interministerial MPS/MF nº 13/2026, **Anexo III**, na forma do seu art. 10, §§1º e 2º |
| Effective from | EC 103: 2019-11-13, alíquotas desde 2020-03-01 (art. 11, §7º). Faixas de 2026: 2026-01-01 |
| Superseded by | EC 103 art. 11 is expressly provisional — *"Até que entre em vigor lei que altere a alíquota ... de que tratam os arts. 4º, 5º e 6º da Lei nº 10.887/2004"*. No such lei is in force. |
| Source (EC 103) | https://www2.camara.leg.br/legin/fed/emecon/2019/emendaconstitucional-103-12-novembro-2019-789412-publicacaooriginal-159409-pl.html |
| Source (Anexo III) | https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf |

**This is the finding the spec called structural, and it is worth stating as a mechanism rather than
as a correction.** EC 103, art. 11, *caput* sets a single rate of 14%. §1º, incisos I a VIII then
reduce or increase it by a fixed number of percentage points per faixa — −6,5, −5, −2, 0, +0,5,
+2,5, +5, +8 — which yields, in order, **7,5 · 9 · 12 · 14 · 14,5 · 16,5 · 19 · 22**. §2º orders that
the resulting rate apply *"de forma progressiva sobre a base de contribuição do servidor ativo,
incidindo cada alíquota sobre a faixa de valores compreendida nos respectivos limites"* — which is
the order of operations, stated by the constituent, and it is the same shape as R1.

§3º then orders the money boundaries reajusted on the same date and by the same index as the RGPS
benefits. **The Portaria does that arithmetic; it does not create the ladder.** Its own art. 10, §1º
says so in as many words: *"a alíquota de 14% ... estabelecida no art. 11, caput, da Emenda
Constitucional nº 103, de 2019, será reduzida ou majorada ... de acordo com os parâmetros previstos
no Anexo III desta Portaria."*

So `rppsFederalBrackets` needs **two** sources and always will: one for the rates, one for the
faixas. A registry that gives it one field cannot express that, and giving it the Portaria alone —
which is what ships today — attributes a constitutional rule to a ministerial act.

### R7 — State and municipal RPPS

| | |
|---|---|
| Norm | EC nº 103/2019, art. 9º, §4º |
| Effective from | 2019-11-13 |
| Source | https://www2.camara.leg.br/legin/fed/emecon/2019/emendaconstitucional-103-12-novembro-2019-789412-publicacaooriginal-159409-pl.html |

Verbatim: *"Os Estados, o Distrito Federal e os Municípios não poderão estabelecer alíquota inferior
à da contribuição dos servidores da União, exceto se demonstrado que o respectivo regime próprio de
previdência social não possui deficit atuarial a ser equacionado, hipótese em que a alíquota não
poderá ser inferior às alíquotas aplicáveis ao Regime Geral de Previdência Social."*

**What this norm does and does not license.** It licenses: *this app's federal ladder does not apply
to a state or municipal servidor, whose rate is set by their own ente, subject to a floor.* It does
**not** license "muitas vezes 14% linear". The norm sets a floor, not a common practice; the claim
that the practice converges on 14% linear is an empirical statement about 27 states and 5.570
municipalities, and no norm — this one or any other — asserts it. §9 C7 rules on it.

### R8 — DSR over habitual overtime

| | |
|---|---|
| Norm | Lei nº 605, de 5 de janeiro de 1949, art. 7º, alínea "a", na redação da Lei nº 7.415, de 9/12/1985 |
| Also | Súmula nº 172 do TST (mantida — Res. 121/2003, DJ 19, 20 e 21.11.2003) |
| Effective from | Lei 605: 1949-01-05; alínea "a" na redação vigente desde 1985-12-09. Súmula 172: redação original RA 102/1982 |
| Source (lei) | https://www2.camara.leg.br/legin/fed/lei/1940-1949/lei-605-5-janeiro-1949-367115-normaatualizada-pl.pdf |
| Source (súmula) | https://www.tst.jus.br/documents/10157/63003/LivroInternet+(6).pdf/778cc371-66ec-6b88-8310-fabd1504f0a5 |

Art. 7º, "a", verbatim: *"para os que trabalham por dia, semana, quinzena ou mês, à de um dia de
serviço, **computadas as horas extraordinárias habitualmente prestadas**"*.

Súmula 172, verbatim: *"Computam-se no cálculo do repouso remunerado as horas extras habitualmente
prestadas."*

**The code cites `art. 7º, §2º`. That is the wrong paragraph** and it is a real defect, not a
typo-class nit, because §2º says something close to the opposite: *"Consideram-se **já remunerados**
os dias de repouso semanal do empregado mensalista ..."*. §2º is the reason the app computes only
the *reflexo* of the variable pay and not a whole extra day's wage — it is genuinely relevant and
should stay — but the norm that puts the horas extras **into** the repouso is alínea **"a"**, and
that is the one the computation rests on. §9 C5.

### R9 — DSR over the adicional noturno

| | |
|---|---|
| Norm | Súmula nº 60, I, do TST (Res. 129/2005, DJ 20, 22 e 25.04.2005; ex-Súmula nº 60, RA 105/1974) |
| Effective from | 1974-10-24 in its original wording; current numbering since Res. 129/2005 |
| Source | https://www.tst.jus.br/documents/10157/63003/LivroInternet+(6).pdf/778cc371-66ec-6b88-8310-fabd1504f0a5 |

Verbatim: *"I - O adicional noturno, pago com habitualidade, integra o salário do empregado **para
todos os efeitos**."*

This is F2's missing citation, and it is the one no other agent was permitted to invent. The base
passed at `components/organisms/day-summary.tsx:132` is
`firstTierPay + extraTierPay + nightPay`. Súmula 172 and Lei 605 art. 7º "a" reach the first two
terms. **Only Súmula 60, I reaches the third**: "para todos os efeitos" is what carries the habitual
night premium into the repouso remunerado alongside the overtime.

The number the app computes is right. The caption names one of the three norms it rests on.

### R10 — Overtime ceiling, and all hours still owed

| | |
|---|---|
| Norm | CLT, art. 59, caput, na redação da Lei nº 13.467/2017 |
| Also | Súmula nº 376, **I**, do TST (conversão das OJs 89 e 117 da SBDI-I — Res. 129/2005) |
| Effective from | art. 59 caput: 2017-11-11 (120 dias após 14/7/2017). Súmula 376: 2005 |
| Source (CLT) | https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html |
| Source (súmula) | https://www.tst.jus.br/documents/10157/63003/LivroInternet+(6).pdf/778cc371-66ec-6b88-8310-fabd1504f0a5 |

art. 59, caput: *"A duração diária do trabalho poderá ser acrescida de horas extras, em número não
excedente de duas, por acordo individual, convenção coletiva ou acordo coletivo de trabalho."*

Súmula 376, **I**: *"A limitação legal da jornada suplementar a duas horas diárias não exime o
empregador de pagar todas as horas trabalhadas."* Item **II** is a different rule — that the value of
habitual overtime integrates the calculation of haveres trabalhistas. The warning at
`lib/compliance.ts:34` asserts item I only, and must cite item I only.

### R11 — Intervalo intrajornada

| | |
|---|---|
| Norm | CLT, art. 71, caput e §1º (redação originária, 1943); art. 71, §4º (Lei nº 8.923/1994, na redação da Lei nº 13.467/2017); **CLT, art. 611-A, III** (acrescido pela Lei nº 13.467/2017) |
| Effective from | caput e §1º: 1943-11-10. §4º e art. 611-A: 2017-11-11 |
| Source | https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html |

- **caput**: *"Em qualquer trabalho contínuo, cuja duração exceda de 6 (seis) horas, é obrigatória a
  concessão de um intervalo ... no mínimo, de 1 (uma) hora"*. The threshold is **strictly greater
  than** 360 minutes.
- **§1º**: *"Não excedendo de 6 (seis) horas o trabalho, será, entretanto, obrigatório um intervalo
  de 15 (quinze) minutos quando a duração ultrapassar 4 (quatro) horas."* Strictly greater than 240,
  less than or equal to 360. The code's `workedMinutes > 240 && workedMinutes <= 360` is exactly this.
- **§4º**: *"A não concessão ou a concessão parcial do intervalo intrajornada mínimo ... implica o
  pagamento, de natureza indenizatória, **apenas do período suprimido**, com acréscimo de 50% ...
  sobre o valor da remuneração da hora normal de trabalho."* This is the norm behind *both* warnings'
  "acréscimo de 50%, de natureza indenizatória", and **neither warning cites it**.
- **art. 611-A, III**: *"A convenção coletiva e o acordo coletivo de trabalho têm prevalência sobre a
  lei quando ... dispuserem sobre: III - intervalo intrajornada, respeitado o limite mínimo de trinta
  minutos para jornadas superiores a seis horas."*

**The 30-minute collective reduction is art. 611-A, III. It is not art. 71.** The warning at
`lib/compliance.ts:56` attributes it to art. 71, and art. 71's own reduction power — §3º — is a
different instrument entirely: a reduction *"por ato do Ministro do Trabalho, Indústria e Comércio"*,
conditioned on refeitório standards and on the employee not working prorrogação. A reader who follows
the app's citation to art. 71 will not find the 30-minute rule there. §9 C10.

### R12 — Interjornada

| | |
|---|---|
| Norm | CLT, art. 66 |
| Also | Orientação Jurisprudencial nº 355 da SBDI-1 do TST (DJ 14.03.2008) |
| Effective from | art. 66: 1943-11-10. OJ 355: 2008-03-14 |
| Source (CLT) | https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html |
| Source (OJ) | https://www.tst.jus.br/documents/10157/63003/LivroInternet+(6).pdf/778cc371-66ec-6b88-8310-fabd1504f0a5 |

art. 66: *"Entre 2 (duas) jornadas de trabalho haverá um período mínimo de 11 (onze) horas
consecutivas para descanso."* — the whole article, verbatim; 660 minutes, strictly less than.

OJ-SDI1 nº 355: *"O desrespeito ao intervalo mínimo interjornadas previsto no art. 66 da CLT acarreta,
por analogia, os mesmos efeitos previstos no § 4º do art. 71 da CLT e na Súmula nº 110 do TST,
devendo-se pagar a integralidade das horas que foram subtraídas do intervalo, acrescidas do
respectivo adicional."*

The warning at `lib/compliance.ts:65` says *"O tempo suprimido costuma ser pago como hora extra"*.
That sentence is **exactly** OJ 355's holding, and it cites nothing. The hedge "costuma" is honest —
an OJ is not a lei — but `PRODUCT.md` §4 is *cite or omit*, and a hedge is not a citation. §9 C11.

### R13 — The 50% overtime floor

| | |
|---|---|
| Norm | CF/88, art. 7º, XVI; CLT, art. 59, §1º (redação da Lei nº 13.467/2017) |
| Effective from | CF: 1988-10-05. art. 59 §1º na redação vigente: 2017-11-11 |
| Source (CF) | https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-publicacaooriginal-1-pl.html |
| Source (CLT) | https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html |

CF art. 7º, XVI: *"remuneração do serviço extraordinário superior, no mínimo, em cinqüenta por cento
à do normal"*.
CLT art. 59, §1º: *"A remuneração da hora extra será, pelo menos, 50% (cinquenta por cento) superior
à da hora normal."*

Three things follow, and the third is the one the app gets wrong:

1. The floor is **50%**, and the pair of citations at `journey-form.tsx:142` is correct — both norms
   say it, neither is redundant (the CF fixes the floor constitutionally; the CLT is the operative
   rule the employer applies).
2. The floor is **uniform**. Neither norm tiers the rate, and art. 59 *caput*'s two-hour limit
   attaches a ceiling on the **quantity**, never a higher rate on the **excess**. That is the honest,
   positive form of what `journey-form.tsx:157` is trying to say.
3. The base named by both norms is *"a hora normal"* / *"o normal"* — the ordinary hour's
   **remuneração**. Neither norm uses the words "hora bruta". `salary-calculator.tsx:86` says the
   overtime is computed on the hora bruta *"como manda o art. 59, §1º, da CLT"*. The substance is
   right — the hora normal is a gross figure, and computing the adicional over a net hour would be
   wrong — but the string puts a word in the norm's mouth. §9 C13.

**And the reason the negative assertion must go.** *"Não existe lei que dobre o adicional"*, read at
its own width, is false: **Lei nº 605/1949, art. 9º** — *"Nas atividades em que não for possível ...
a suspensão do trabalho, nos dias feriados civis e religiosos, a remuneração será paga **em dôbro**,
salvo se o empregador determinar outro dia de folga"* — is a lei that doubles it. Its trigger is a
feriado or the repouso, not the third extra hour, so it does not contradict the point the sentence
is actually making. It does make the sentence, as written, a claim this app cannot defend.

### R14 — Night-shift prorrogação — the rule WorkLoad does NOT compute

| | |
|---|---|
| Norm | Súmula nº 60, **II**, do TST (incorporou a OJ nº 6 da SBDI-I — Res. 129/2005) |
| Underlying | CLT, art. 73, §5º |
| Effective from | OJ 6 inserida em 25.11.1996; incorporada à Súmula 60 em 2005 |
| Source | https://www.tst.jus.br/documents/10157/63003/LivroInternet+(6).pdf/778cc371-66ec-6b88-8310-fabd1504f0a5 |

Verbatim: *"II - Cumprida integralmente a jornada no período noturno e prorrogada esta, devido é
também o adicional quanto às horas prorrogadas. Exegese do art. 73, § 5º, da CLT."*

CLT art. 73, §5º: *"Às prorrogações do trabalho noturno aplica-se o disposto neste capítulo."*

The footer at `calculator-views.tsx:85` names this correctly in substance — the app does not compute
it, and says so. Two precisions are owed: it is **item II**, not the súmula at large (item I is a
different rule, and it is the one R9 uses), and the citation must stay inside the *gap* sentence and
never migrate into a list of things the app applies. §11, disclosure D2.

### R15 — Adicional noturno

| | |
|---|---|
| Norm | CLT, art. 73, caput, §1º e §2º, na redação do Decreto-Lei nº 9.666, de 28/8/1946 |
| Effective from | 1946-08-28 |
| Source | https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html |

- **caput**: *"... sua remuneração terá um acréscimo de 20% (vinte por cento), pelo menos, sobre a
  hora diurna."* Note *"pelo menos"* — 20% is a floor, exactly as 50% is for overtime.
- **§1º**: *"A hora do trabalho noturno será computada como de 52 (cinqüenta e dois) minutos e 30
  (trinta) segundos."*
- **§2º**: *"Considera-se noturno ... o trabalho executado entre as 22 (vinte duas) horas de um dia e
  as 5 (cinco) horas do dia seguinte."*

`lib/night-shift.ts:3` cites caput, §1º and §2º and maps each to the constant beneath it. **This is
the only citation in the tree that is already exactly right, and it is the model the registry should
copy.** `PRODUCT.md` §9 already backs it; carrying it through re-publishes it, and it survives.

One nuance the app currently leaves silent: the caput's *"pelo menos"* means a convenção coletiva may
set more than 20%. §11, disclosure D4.

### R16 — 13º salário

| | |
|---|---|
| Norm | CF/88, art. 7º, VIII; Lei nº 4.090, de 13 de julho de 1962, art. 1º |
| Effective from | Lei 4.090: 1962-07-13. CF: 1988-10-05 |
| Source (CF) | https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-publicacaooriginal-1-pl.html |
| Source (lei) | https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4090-13-julho-1962-353863-normaatualizada-pl.html |

CF art. 7º, VIII: *"décimo terceiro salário com base na remuneração integral ou no valor da
aposentadoria"*.
Lei 4.090, art. 1º: *"No mês de dezembro de cada ano, a todo empregado será paga, pelo empregador,
uma gratificação salarial, independentemente da remuneração a que fizer jus."* §1º: *"A gratificação
corresponderá a 1/12 avos da remuneração devida em dezembro, por mês de serviço, do ano
correspondente."*

`PAID_MONTHS_PER_YEAR = 13` at `lib/salary-period.ts:4` is this right, and nothing in the tree says
so. It is the clearest A4 site in the inventory: a legal entitlement, folded silently into a number
on screen, with no norm anywhere. §9 C18 — and a disclosure is owed with it, because 13 × a monthly
figure is an **approximation** of the year, not the year. §11, disclosure D6.

---

## 6. Tables — reproduced in full

This section is the `AGENTS.md` §5 rebuild contract for the part nobody can re-derive.
`lib/legal-tables.ts` must be reconstructible from this section alone, to the centavo, without
opening the repository.

Every value below was compared **digit by digit** against `lib/legal-tables.ts` at this gate.
**No divergence was found in any numeric value.** The divergences are all in the `source` and
`sourceUrl` fields and are listed in §10.

> **AC12 — item 7's five cells.** Their per-cell re-verification verdicts are in **§9.0**, kept
> together in one table so a reader checking AC12 reads one block rather than five scattered rows.
> Every one reads **verified — correct**; none reads "unverified". §6.3 and §6.4 carry their values.

### 6.1 RGPS — tabela de contribuição do segurado empregado, 2026

Norm: **Portaria Interministerial MPS/MF nº 13, de 9/1/2026, Anexo II**. Effective **2026-01-01**.
Source: https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf

| Faixa | De (R$) | Até (R$) | Alíquota |
|---|---|---|---|
| 1 | 0,00 | 1.621,00 | 7,5% |
| 2 | 1.621,01 | 2.902,84 | 9% |
| 3 | 2.902,85 | 4.354,27 | 12% |
| 4 | 4.354,28 | 8.475,55 | 14% |

- **Boundaries:** every "Até" is **inclusive**; every "De" is the previous ceiling plus one centavo,
  i.e. **exclusive** of the previous ceiling. A salary of exactly R$ 1.621,00 is entirely in faixa 1.
- **Progressivity:** each alíquota applies **only to the slice** of the salário-de-contribuição
  inside its own faixa, never to the whole amount.
- **Ceiling:** **R$ 8.475,55.** Above it, nothing further is contributed.
- **`rgpsCeilingDiscount` = R$ 988,09** is **derived, not stated by any norm.** It is the total
  contribution at the ceiling: `1.621,00×0,075 + 1.281,84×0,09 + 1.451,43×0,12 + 4.121,28×0,14 =
  121,575 + 115,3656 + 174,1716 + 576,9792 = 988,0914`, rounded to the centavo → **988,09**. Its
  provenance is *this table plus arithmetic*, and the registry must say exactly that rather than
  attribute the figure to the Portaria, which does not contain it.

### 6.2 RPPS da União — tabela de contribuição, 2026

Norms: **EC nº 103/2019, art. 11, caput e §§1º e 2º** (the rates) and **Portaria Interministerial
MPS/MF nº 13/2026, Anexo III** (the 2026 faixas, per its art. 10, §§1º e 2º).
Effective **2026-01-01** for the faixas; the rates since 2020-03-01.

| Faixa | De (R$) | Até (R$) | Alíquota | Como a EC 103 a produz |
|---|---|---|---|---|
| 1 | 0,00 | 1.621,00 | 7,5% | 14% − 6,5 p.p. (art. 11, §1º, I) |
| 2 | 1.621,01 | 2.902,84 | 9% | 14% − 5 p.p. (II) |
| 3 | 2.902,85 | 4.354,27 | 12% | 14% − 2 p.p. (III) |
| 4 | 4.354,28 | 8.475,55 | 14% | 14% sem redução nem acréscimo (IV) |
| 5 | 8.475,56 | 14.514,30 | 14,5% | 14% + 0,5 p.p. (V) |
| 6 | 14.514,31 | 29.028,57 | 16,5% | 14% + 2,5 p.p. (VI) |
| 7 | 29.028,58 | 56.605,73 | 19% | 14% + 5 p.p. (VII) |
| 8 | 56.605,74 | — | 22% | 14% + 8 p.p. (VIII) |

- **Boundaries:** same convention as 6.1. Faixa 8 is **open-ended**; the Anexo III row reads
  *"acima de 56.605,73"*.
- **Ceiling:** **none.** The RPPS contribution does not stop at the RGPS teto, and that is the single
  fact the Estatutário regime string exists to convey.
- **Faixas 1–4 are numerically identical to 6.1's**, which is why `lib/legal-tables.ts:52` spreads
  `RGPS_BRACKETS_2026` into `rppsFederalBrackets`. That reuse is **arithmetically correct and
  legally coincidental** — the two tables coincide in 2026 because EC 103 §3º reajusts the RPPS
  boundaries by the RGPS index, but they are set by different norms and could in principle diverge.
  The code reuse is fine; **the citation must not be reused with it.**

### 6.3 IRPF — tabela progressiva mensal, vigente desde maio/2025 e aplicável a 2026

Norm: **Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025**. Effective **2025-05-01**.
Source: https://www2.camara.leg.br/legin/fed/lei/2025/lei-15191-11-agosto-2025-797839-publicacaooriginal-176105-pl.html

| Faixa | Base de cálculo de (R$) | Até (R$) | Alíquota | Parcela a deduzir (R$) |
|---|---|---|---|---|
| 1 | 0,00 | 2.428,80 | 0% | 0,00 |
| 2 | 2.428,81 | 2.826,65 | 7,5% | 182,16 |
| 3 | 2.826,66 | 3.751,05 | 15% | 394,16 |
| 4 | 3.751,06 | 4.664,68 | 22,5% | 675,49 |
| 5 | 4.664,69 | — | 27,5% | 908,73 |

- **Boundaries:** every "Até" is **inclusive**. The code's `base <= ceiling` lookup is the right
  comparison.
- **This table is not progressive-by-slice.** Unlike 6.1 and 6.2, a single alíquota applies to the
  whole base and the *parcela a deduzir* is what restores progressivity. Implementing it like the
  INSS table would produce a different number. The two shapes sit in one file and must not be
  confused.
- **Ceiling:** none. Faixa 5 is open-ended.

### 6.4 Deduções e redução — 2026

| Valor | R$ | Norma | Vigente desde | Derivado? |
|---|---|---|---|---|
| `dependentDeduction` | **189,59** | Lei nº 9.250/1995, art. 4º, III, "i" | **2015-04-01** | não — o valor está no texto |
| `simplifiedDeduction` | **607,20** | Lei nº 9.250/1995, art. 4º, §2º | 2023-08-28 (a regra) | **sim** — 25% × 2.428,80, o teto da faixa zero de 6.3 |
| `exemptionCeiling` | **5.000,00** | Lei nº 9.250/1995, art. 3º-A, caput | **2026-01-01** | não |
| `reduction.intercept` | **978,62** | Lei nº 9.250/1995, art. 3º-A, caput | 2026-01-01 | não |
| `reduction.slope` | **0,133145** | Lei nº 9.250/1995, art. 3º-A, caput | 2026-01-01 | não |
| `reduction.phaseOutCeiling` | **7.350,00** | Lei nº 9.250/1995, art. 3º-A, caput e §2º | 2026-01-01 | não |

- **`effectiveFrom: "2026-01-01"` on the record as a whole is a simplification**, and it is a benign
  one that must nevertheless be disclosed: the IRPF *table* took force in **May 2025** and the
  dependant deduction in **April 2015**. What took force on 2026-01-01 is the RGPS/RPPS faixas and the
  reduction. A user who reads "em vigor desde 01/01/2026" beside a line about the IRRF table is being
  told something that is not quite true. §11, disclosure D5.
- **The two derived values** — `rgpsCeilingDiscount` and `simplifiedDeduction` — are the registry's
  hardest rows, because "cite the norm" has no clean answer for a number no norm states. The
  registry's answer, ruled here: each carries **the norm of the rule** and **a note naming the
  operand it is derived from**, so the year the operand moves, the derived value is visibly stale.

---

## 7. The source registry — one row per data set

This is the structural answer the team lead asked for, and it determines the shape of the whole
spec. `lib/legal-tables.ts:47-48` has **one** `source`/`sourceUrl` pair standing behind **nine** data
sets. Nine data sets need **six distinct norms**, one of them doubled.

**AC3 is satisfiable against this table and only against it.** The count of distinct norms below is
**7** (counting the doubled RPPS attribution as two).

| # | Data set | Norm — the one that actually sets it | URL for `sourceUrl` | Today's attribution |
|---|---|---|---|---|
| 1 | `rgpsBrackets` | Portaria Interministerial MPS/MF nº 13, de 09/01/2026, **Anexo II** | `https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf` | **correct in norm, wrong in host** |
| 2 | `rgpsCeilingDiscount` | *derived* — total da tabela do item 1 no teto de R$ 8.475,55 | same as item 1 | **wrong** — attributed to a norm that does not contain the figure |
| 3 | `rppsFederalBrackets` — rates | **EC nº 103/2019, art. 11, caput e §§1º e 2º** | `https://www2.camara.leg.br/legin/fed/emecon/2019/emendaconstitucional-103-12-novembro-2019-789412-publicacaooriginal-159409-pl.html` | **wrong** — a constitutional rule credited to a Portaria |
| 4 | `rppsFederalBrackets` — 2026 faixas | Portaria MPS/MF nº 13/2026, **Anexo III** (art. 10, §§1º e 2º) | same as item 1 | partially right, by accident |
| 5 | `incomeTaxBrackets` | **Lei nº 11.482/2007, art. 1º, XII** (redação da Lei nº 15.191/2025) | `https://www2.camara.leg.br/legin/fed/lei/2025/lei-15191-11-agosto-2025-797839-publicacaooriginal-176105-pl.html` | **wrong** — this is F3 |
| 6 | `topIncomeTaxRate` | same as item 5 — it is that table's fifth row | same as item 5 | **wrong** |
| 7 | `simplifiedDeduction` | **Lei nº 9.250/1995, art. 4º, §2º**; operand from item 5 | `https://www2.camara.leg.br/legin/fed/lei/1995/lei-9250-26-dezembro-1995-362566-normaatualizada-pl.html` | **wrong** |
| 8 | `dependentDeduction` | **Lei nº 9.250/1995, art. 4º, III, "i"** | same as item 7 | **wrong** |
| 9 | `exemptionCeiling` | **Lei nº 9.250/1995, art. 3º-A, caput** (Lei nº 15.270/2025) | `https://www2.camara.leg.br/legin/fed/lei/2025/lei-15270-26-novembro-2025-798354-publicacaooriginal-177117-pl.html` | **wrong** |
| 10 | `reduction` | same as item 9 | same as item 9 | **wrong** |

**Ruled here, because `tech-lead` will otherwise have to guess:**

- **Each data set carries its own source field, even where two share a norm** (items 5/6, 9/10).
  `spec.md` settled this as a product question and this gate endorses it on a legal ground: a shared
  field is how C1 became wrong, and explicit repetition is what makes the yearly diff reviewable.
- **A data set may need more than one source.** Items 3 and 4 are one array with two norms; item 7 is
  one number with a rule-norm and an operand. The registry's shape must admit **a list**, not a
  single pair. This is the one structural constraint this gate imposes on G4; everything else about
  the shape is `tech-lead`'s.
- **Each source carries its own `effectiveFrom`.** §6.4 shows three different effective dates inside
  one "2026" record. One date on the record cannot describe them, and `PRODUCT.md` §4's third
  commitment — *the year is part of the answer* — is what makes that a defect rather than a detail.
- **`source` stays a human-readable norm name, in pt-BR, as it is today.** It is rendered to the user
  at `calculator-views.tsx:90-99`. Its wording at the gate is `content-writer`'s at G3; the norm it
  names is this table's and is not negotiable.

---

## 8. Order of operations, worked examples, and rounding

This spec changes no number, so this section's job is **to pin the numbers that must not move.**
Every value below was computed at this gate from the tables in §6 and matches what `lib/payroll.ts`
produces today. A G6 run that reproduces these to the centavo has proved the refactor was a
refactor.

### 8.1 The sequence, with the base for each step

**INSS / RPPS** — one step, progressive by slice:

1. Walk the faixas of §6.1 (CLT) or §6.2 (estatutário) in order.
2. For each, add `(min(salário, teto da faixa) − teto da faixa anterior) × alíquota`.
3. Stop when the salary is exhausted, or when the faixas are (RGPS only — the RPPS ladder does not
   end).
4. **Round once, at the end**, to the centavo. Not per faixa.
   *Norm for the shape:* EC 103/2019, art. 11, §2º for the RPPS; Portaria nº 13/2026, Anexo II's
   *"alíquota progressiva"* heading for the RGPS.

**IRRF** — five steps, and **the order is where a correct table still produces a wrong number**:

1. **If the gross is at or below R$ 5.000,00, the tax is zero.** Lei 9.250/1995, art. 3º-A, caput,
   first row. This is a shortcut, not a separate rule: §8.3 proves it is arithmetically identical to
   running the full chain at the boundary.
2. **Deduções legais** = INSS already computed (art. 4º, IV) **+** `189,59 × dependentes`
   (art. 4º, III, "i"). Dependants are truncated to an integer.
3. **Deduction actually applied** = `max(deduções legais, 607,20)`. Art. 4º, §2º — the simplified
   discount is an **alternative to the caput as a whole**, so the comparison is against the sum of
   step 2, never against the INSS alone.
4. **Base de cálculo** = gross − step 3. Find its faixa in §6.3 by `base ≤ teto`.
   **Imposto pela tabela** = `base × alíquota − parcela a deduzir`.
5. **Redução** = `978,62 − 0,133145 × gross` when the **gross** is at or below R$ 7.350,00, else zero.
   **The base of this step is the gross, not the base de cálculo of step 4.** Lei 9.250/1995,
   art. 3º-A: *"rendimentos tributáveis sujeitos à incidência mensal"*. Subtracting it from step 4's
   result, floored at zero (art. 3º-A, §1º).
6. **Round once, at the end**, to the centavo.

**DSR sobre a remuneração variável** — Lei 605/1949, art. 7º, "a" + Súmula 172 + Súmula 60, I:

1. Base = `firstTierPay + extraTierPay + nightPay` — the day's variable pay, all three terms.
2. `restDayPay = base ÷ dias úteis do mês × repousos do mês`, where repousos are the **Sundays** of
   the current month and dias úteis are the remaining days.
3. **No rounding in `lib/`.** The value carries full precision and is rounded once by
   `formatCurrency` at the moment of display.

### 8.2 E1 — INSS, CLT, salário bruto R$ 6.000,00

| | |
|---|---|
| Input | gross R$ 6.000,00, regime `clt` |
| Faixa 1 | `1.621,00 × 7,5%` = **121,575** |
| Faixa 2 | `(2.902,84 − 1.621,00) × 9%` = `1.281,84 × 9%` = **115,3656** |
| Faixa 3 | `(4.354,27 − 2.902,84) × 12%` = `1.451,43 × 12%` = **174,1716** |
| Faixa 4 | `(6.000,00 − 4.354,27) × 14%` = `1.645,73 × 14%` = **230,4022** |
| Soma | 641,5144 |
| **Result** | **R$ 641,51** |
| Rule | R1 |

### 8.3 E2 — the R$ 5.000,00 boundary, and why the shortcut is legitimate

| | |
|---|---|
| Input | gross R$ 5.000,00, 0 dependentes |
| INSS | `121,575 + 115,3656 + 174,1716 + (645,73 × 14% = 90,4022)` = 501,5144 → **501,51** |
| Dedução | `max(501,51 + 0 ; 607,20)` = **607,20** — o desconto simplificado vence |
| Base | `5.000,00 − 607,20` = **4.392,80** → faixa 4 (≤ 4.664,68), 22,5%, parcela 675,49 |
| Imposto pela tabela | `4.392,80 × 22,5% − 675,49` = `988,38 − 675,49` = **312,89** |
| Redução | `978,62 − 0,133145 × 5.000,00` = `978,62 − 665,725` = **312,895** |
| Imposto | `312,89 − 312,895` = **−0,005**, limitado a zero pelo art. 3º-A, §1º |
| **Result** | **R$ 0,00** |
| Rule | R2, R3, R4 |

This is the boundary case that proves the whole chain. The law's own words —
*"até R$ 312,89 (de modo que o imposto devido seja zero)"* — are reproduced by the arithmetic to
half a centavo, and the floor in §1º is what closes the gap. **The `gross <= 5000 → 0` shortcut in
`lib/payroll.ts:88` is therefore correct**, not a convenient approximation: below the boundary the
tax falls and the reduction rises, so the clamp binds everywhere in `(0, 5.000,00]`.

It is also the case that would expose a wrong order of operations most cheaply. Applying the
reduction to the **base de cálculo** instead of the gross would give
`978,62 − 0,133145 × 4.392,80 = 393,69`, and the tax would still be zero here — but at R$ 6.000,00 it
would give `978,62 − 0,133145 × 5.358,49 = 265,20` against the correct 179,75, an error of
**R$ 85,45 per month** in the user's favour, invisible at the boundary. **A test at R$ 5.000,00 alone
does not protect this rule.** E3 is the one that does, and `qa-engineer` is owed both.

### 8.4 E3 — IRRF, gross R$ 6.000,00, 0 dependentes

| | |
|---|---|
| Input | gross R$ 6.000,00, 0 dependentes, regime `clt` |
| INSS | **641,51** (E1) |
| Dedução | `max(641,51 ; 607,20)` = **641,51** — aqui a legal vence |
| Base | `6.000,00 − 641,51` = **5.358,49** → faixa 5 (> 4.664,68), 27,5%, parcela 908,73 |
| Imposto pela tabela | `5.358,49 × 27,5% − 908,73` = `1.473,58475 − 908,73` = **564,85475** |
| Redução | `978,62 − 0,133145 × 6.000,00` = `978,62 − 798,87` = **179,75** — **sobre o bruto** |
| Imposto | `564,85475 − 179,75` = 385,10475 |
| **Result** | **R$ 385,10** |
| Rule | R2, R3, R4 |

### 8.5 E4 — IRRF com dependentes, gross R$ 6.000,00, 2 dependentes

| | |
|---|---|
| Dedução legal | `641,51 + 2 × 189,59` = `641,51 + 379,18` = **1.020,69** |
| Dedução aplicada | `max(1.020,69 ; 607,20)` = **1.020,69** |
| Base | `6.000,00 − 1.020,69` = **4.979,31** → faixa 5, 27,5%, parcela 908,73 |
| Imposto pela tabela | `4.979,31 × 27,5% − 908,73` = `1.369,31025 − 908,73` = **460,58025** |
| Redução | **179,75** — inalterada, porque o bruto não mudou |
| **Result** | **R$ 280,83** |
| Rule | R2, R3, R4, R5 |

The reduction is **identical** to E3's. That is the whole point of step 5 reading the gross: a
dependant changes the base de cálculo and must not change the reduction. A test that varies only the
dependants and asserts the reduction is constant is the cheapest guard against the order drifting.

### 8.6 E5 — RPPS, estatutário, base R$ 20.000,00

| | |
|---|---|
| Faixas 1–4 | 121,575 + 115,3656 + 174,1716 + `(8.475,55 − 4.354,27) × 14% = 576,9792` = **988,0914** |
| Faixa 5 | `(14.514,30 − 8.475,55) × 14,5%` = `6.038,75 × 14,5%` = **875,61875** |
| Faixa 6 | `(20.000,00 − 14.514,30) × 16,5%` = `5.485,70 × 16,5%` = **905,1405** |
| Soma | 2.768,85065 |
| **Result** | **R$ 2.768,85** |
| Rule | R6 |

Note that the first four faixas sum to **988,0914** — the same figure as §6.1's
`rgpsCeilingDiscount`. Identical arithmetic, two different legal sources. A single `source` field
cannot tell those apart, and the fact that this number is right in both places is exactly why nobody
noticed the citation was wrong in one of them.

### 8.7 E6 — DSR sobre a remuneração variável do dia

| | |
|---|---|
| Input | `firstTierPay` R$ 45,00 · `extraTierPay` R$ 0,00 · `nightPay` R$ 12,00 · mês de referência setembro/2026 |
| Base | `45,00 + 0,00 + 12,00` = **R$ 57,00** — três parcelas, três normas (§5 R8 e R9) |
| Mês | setembro/2026 tem 30 dias e **4 domingos** → 26 dias úteis, 4 repousos |
| Cálculo | `57,00 ÷ 26 × 4` = 8,769230769… |
| **Result** | **R$ 8,77** na tela |
| Rule | R8, R9 |

### 8.8 Rounding

| Quantity | Unit | Direction | Applied at | Source |
|---|---|---|---|---|
| Contribuição INSS / RPPS | centavo | half-up (`Math.round` sobre o valor em centavos) | **uma vez**, no fim de `sumProgressiveBrackets` — nunca por faixa | convenção do projeto; nenhuma norma fixa o arredondamento |
| IRRF | centavo | half-up | **uma vez**, no fim de `calculateIncomeTax`, após a redução | convenção do projeto |
| Redução da Lei 15.270 | — | **não arredonda** | carrega precisão total até a subtração final | art. 3º-A não manda arredondar; arredondá-la antes moveria E2 de 0,00 para −0,01 → 0,00, que por acaso coincide, e moveria E3 em um centavo, que não coincide |
| Base de cálculo do IRRF | centavo | herda o arredondamento do INSS | o INSS já vem arredondado quando entra na dedução | — |
| Pagamento de hora extra, adicional noturno, DSR | — | **não arredonda em `lib/`** | arredondado uma única vez na exibição, por `formatCurrency` | — |
| Exibição monetária | centavo | `Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" })`, half-expand | na renderização | — |

- **`roundToCents` neutralises binary dust before rounding** — `Number((value * 100).toPrecision(12))`
  — so `2,675` rounds to `2,68` rather than to `2,67`. That is the intended direction and it must not
  be "simplified away" by a later refactor. `refactor-scout` is put on notice here: this is not
  redundant defensiveness, it is the difference of a centavo on a payslip.
- **Nothing in this spec may change any of the above.** A registry refactor that moves a rounding
  point is no longer a registry refactor. AC9 is the guard; this table is what AC9 means.

---

## 9. Rulings

### 9.0 — Item 7: the five cells `0002` left *unverified, not cleared*

`spec.md` § In scope item 7 and AC12. Each was re-derived at this gate from the norm named, on the
host named, on 2026-09-15. **A row reading "unverified" would block the gate. None does.**

| Cell | Value in `lib/legal-tables.ts` | Norm | What the norm says | Verdict |
|---|---|---|---|---|
| `incomeTaxBrackets` | 2.428,80/0/0 · 2.826,65/7,5/182,16 · 3.751,05/15/394,16 · 4.664,68/22,5/675,49 | Lei nº 11.482/2007, art. 1º, XII (Lei nº 15.191/2025) | the five rows reproduced in §6.3, identical | **verified — correct** |
| `topIncomeTaxRate` | 27,5% / 908,73 | same | *"Acima de 4.664,68 · 27,5 · 908,73"* | **verified — correct** |
| `simplifiedDeduction` | 607,20 | Lei nº 9.250/1995, art. 4º, §2º | *"25% ... do valor máximo da faixa com alíquota zero"* → `0,25 × 2.428,80 = 607,20` | **verified — correct, and derived** |
| `dependentDeduction` | 189,59 | Lei nº 9.250/1995, art. 4º, III, "i" | *"R$ 189,59 ... a partir do mês de abril do ano-calendário de 2015"* | **verified — correct** |
| `exemptionCeiling` | 5.000,00 | Lei nº 9.250/1995, art. 3º-A, caput | *"até R$ 5.000,00 · até R$ 312,89 (de modo que o imposto devido seja zero)"* | **verified — correct** |
| `reduction.intercept` | 978,62 | same | *"R$ 978,62 − (0,133145 × rendimentos ...)"* | **verified — correct** |
| `reduction.slope` | 0,133145 | same | same | **verified — correct** |
| `reduction.phaseOutCeiling` | 7.350,00 | same, caput e §2º | *"decrescente linearmente até zerar para rendimentos a partir de R$ 7.350,00"*; §2º repete o corte | **verified — correct** |

**Consequence: the block in `spec.md` § Does any number change? is not triggered.** No value in the
salário path is wrong, so the spec proceeds as a provenance spec, which is what it was scoped to be.
Recorded emphatically because the standing instruction was *surface it, do not fix it* — there is
nothing to surface.

**Two things that were re-derived beyond item 7's list, and also hold:** `rgpsBrackets` and
`rgpsCeilingDiscount` against Anexo II (§6.1, §8.2), and `rppsFederalBrackets` against EC 103 art. 11
§1º and Anexo III (§6.2, §8.6). Lesson 002 in its sharpest form: this spec re-publishes those
citations, so this spec signs their numbers.

### 9.1 — Row by row

The inventory's own status column is quoted where it already reached the right conclusion, and
overruled where it did not.

| # | Site | Ruling | Why |
|---|---|---|---|
| **C1** | `lib/legal-tables.ts:47` → `calculator-views.tsx:90-99` | **WRONG.** Replace per §7. | One norm behind nine data sets; correct for one of them. The footer credits the Portaria for the IRRF table, which Lei nº 11.482/2007 art. 1º XII sets. F3 confirmed. |
| **C2** | `lib/legal-tables.ts:48` → `href` at `:93` | **WRONG.** Replace per §7, one URL per data set. | Commercial aggregator. Flagged 3×. Every replacement URL in §7 returned `200` on 2026-09-15. |
| **C3** | `lib/legal-tables.ts:50-68`, seven data sets | **UNCITED.** Each gets its own source per §7. | `AGENTS.md` §8. The two **derived** values also get the operand they derive from, per §6.4. |
| **C4** | `day-summary.tsx:234` — *"O DSR (Súmula 172 do TST)"* | **INCOMPLETE.** Must name **Lei nº 605/1949, art. 7º, "a"**, **Súmula 172 do TST** and **Súmula 60, I, do TST**. | The base at `:132` is `firstTierPay + extraTierPay + nightPay`. Súmula 172 reaches the first two terms only. F2 confirmed, and R9 is the citation no other agent was allowed to invent. |
| **C5** | `lib/weekly-rest.ts:17` | **WRONG PARAGRAPH.** `art. 7º, §2º` → **`art. 7º, "a"`**, plus Súmula 172 **and** Súmula 60, I. §2º may stay, as the reason only the reflexo is computed. | §2º says the mensalista's repouso is *already remunerated* — close to the opposite of the rule the function applies. See R8. |
| **C6** | `lib/payroll.ts:24` — *"de 7,5% a 14%"* | **CORRECT for 2026, but DERIVE it.** | Both endpoints are `rgpsBrackets[0].rate` and `[3].rate`. Verified against §6.1. Deriving is a refactor; AC8 requires the string to stay character-identical. |
| **C7** | `lib/payroll.ts:32` | **SPLIT.** *"até 22%"* → **derive** from `rppsFederalBrackets`'s last rate; it is correct (§6.2) and sourced (EC 103, art. 11, §1º, VIII). *"muitas vezes 14% linear"* → **RETIRE**. | No norm states the 14%-linear practice. EC 103 art. 9º §4º sets a **floor**, not a practice. §11 D3 gives the replacement and §12 the non-claim row. |
| **C8** | `lib/compliance.ts:34` | **NARROW THE SÚMULA.** `art. 59 da CLT` is correct; `Súmula 376 do TST` → **`Súmula 376, I, do TST`**. | Item I is *"não exime o empregador de pagar todas as horas trabalhadas"* — exactly the claim. Item II is a different rule. R10. |
| **C9** | `lib/compliance.ts:47` | **ADD THE MISSING NORM.** `art. 71, §1º` is correct for the 15 minutes; the *"acréscimo de 50%, de natureza indenizatória"* needs **`art. 71, §4º`**, which is not cited. | §1º sets the interval. §4º is the only place the 50% and the word *indenizatória* come from. R11. |
| **C10** | `lib/compliance.ts:56` | **WRONG.** `art. 71 da CLT` is correct for the 1 hour; *"que norma coletiva pode reduzir para 30 minutos"* must cite **`art. 611-A, III, da CLT`**; the 50% must cite **`art. 71, §4º`**. | art. 71's own reduction power (§3º) is a **ministerial** act on refeitório grounds, not a collective one. A reader following the citation to art. 71 will not find the 30-minute rule. R11. |
| **C11** | `lib/compliance.ts:65` | **ADD.** `art. 66 da CLT` is correct; *"costuma ser pago como hora extra"* must cite **OJ-SDI1 nº 355 do TST**. | That sentence is the OJ's holding, verbatim in substance, with no source. A hedge is not a citation (`PRODUCT.md` §4). R12. |
| **C12** | `lib/compliance.ts:7-12` | **UNCITED — six constants get their norms.** `120` → art. 59, caput · `240` and `360` → art. 71, caput e §1º · `15` → art. 71, §1º · `60` → art. 71, caput · `660` → art. 66. | `AGENTS.md` §8. The norms currently live only inside the pt-BR strings, so a developer changing a constant never meets them. |
| **C13** | `salary-calculator.tsx:86` | **REWORD TO THE NORM'S OWN TERM.** *"sobre a hora bruta, como manda o art. 59, §1º"* → the norm says **"a hora normal"**. | Substance correct; the string puts a word in the norm's mouth. Same overreach class as the Súmula 431 finding. R13. |
| **C14** | `journey-form.tsx:142` | **CORRECT. Carry it through unchanged.** | *"O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT)"* — both norms verified verbatim, both load-bearing, base named correctly. R13. |
| **C15** | `journey-form.tsx:157` | **RETIRE THE NEGATIVE FORM.** Rewrite as the positive, sourced statement. §11 D1. | A universal negative cannot be sourced, and this one is over-broad: **Lei nº 605/1949, art. 9º** does double the pay, on a different trigger. R13. |
| **C16** | `calculator-views.tsx:85` | **NARROW THE SÚMULA.** `(Súmula 60 do TST)` → **`(Súmula 60, II, do TST)`**. Stays a gap disclosure. | Item II is the prorrogação; item I is the integration rule R9 uses elsewhere in the same app. §11 D2. |
| **C17** | `day-summary.tsx:159`, `:213`; `lib/night-shift.ts:3` | **CORRECT. Carry through.** One addition: `PRODUCT.md` §9 backs 20% as the **floor**. | caput, §1º and §2º verified verbatim (R15). This is the model the registry should copy. §11 D4 adds the *"pelo menos"* disclosure. |
| **C18** | `lib/salary-period.ts:3-6` — `PAID_MONTHS_PER_YEAR = 13` | **UNCITED.** Cite **CF/88, art. 7º, VIII** and **Lei nº 4.090/1962, art. 1º**, and disclose the approximation. | A legal entitlement folded into a number on screen with no norm anywhere. `WORK_DAYS_PER_WEEK` and `WEEKS_IN_DIVISOR` are **0007's** — see §3. §11 D6. |
| **C19** | `__tests__/calculator-views.test.tsx:103` | **IN SCOPE. Inherits the fix; never becomes a second source of truth.** | It pins the aggregator URL as expected behaviour, so a `lib/`-only fix turns the suite red and invites a developer to repair the defect back into place. AC1's boundary is the whole tree. |

**The A1–A4 test, re-run at this gate, returned no site the inventory lacks.** `spec.md`'s sentence
authorising additions is therefore unused, and that is recorded so a later gate knows the test was
actually run rather than assumed.

---

## 10. Divergences from the code

Every place `lib/` and `components/` disagree with this analysis. **Each is an instruction to
`tech-lead`, not an edit by me** (`AGENTS.md` §4, rule 5). Line numbers are as read on 2026-09-15;
several will drift and the instruction survives the drift.

| # | Severity | File:line | What the code does | What the norm requires | Source |
|---|---|---|---|---|---|
| D-1 | **major** | `lib/legal-tables.ts:47` | one `source` for nine data sets | one source per data set, six distinct norms, §7 | §7 |
| D-2 | **major** | `lib/legal-tables.ts:48` | `https://www.legisweb.com.br/legislacao/?id=489284` | an official host per §2's allow-list | §2, §7 |
| D-3 | **major** | `lib/legal-tables.ts:58-64` | `incomeTaxBrackets` and `topIncomeTaxRate` inherit the Portaria | Lei nº 11.482/2007, art. 1º, XII (Lei nº 15.191/2025) | §5 R2 |
| D-4 | **major** | `lib/legal-tables.ts:51-57` | `rppsFederalBrackets` inherits the Portaria | EC nº 103/2019, art. 11, caput e §§1º e 2º **plus** Anexo III | §5 R6 |
| D-5 | **major** | `lib/legal-tables.ts:65-68` | four IRPF deduction values inherit the Portaria | Lei nº 9.250/1995, arts. 3º-A e 4º — three different articles, two different effective dates | §5 R3–R5, §6.4 |
| D-6 | minor | `lib/legal-tables.ts:50` | `rgpsCeilingDiscount` is a bare literal | derived from Anexo II; must say so rather than cite a norm that lacks the figure | §6.1 |
| D-7 | minor | `lib/legal-tables.ts:46` | one `effectiveFrom` for the whole record | three distinct effective dates inside it: 2026-01-01, 2025-05-01, 2015-04-01 | §6.4 |
| D-8 | **major** | `lib/weekly-rest.ts:17` | cites `Lei 605/49 art. 7º, §2º e Súmula 172` | `art. 7º, "a"`; §2º is close to the opposite rule; and Súmula 60, I is missing | §5 R8, R9 |
| D-9 | **major** | `components/organisms/day-summary.tsx:234` | *"O DSR (Súmula 172 do TST)"* over a base including `nightPay` | must also name Lei nº 605/1949, art. 7º, "a" and Súmula 60, I | §5 R9 |
| D-10 | **major** | `lib/compliance.ts:56` | attributes the 30-min collective reduction to art. 71 | CLT, art. 611-A, III | §5 R11 |
| D-11 | major | `lib/compliance.ts:47` and `:56` | the 50% indenizatório is stated with no norm | CLT, art. 71, §4º | §5 R11 |
| D-12 | major | `lib/compliance.ts:65` | *"costuma ser pago como hora extra"* with no norm | OJ-SDI1 nº 355 do TST | §5 R12 |
| D-13 | minor | `lib/compliance.ts:34` | cites Súmula 376 without its item | Súmula 376, **I** | §5 R10 |
| D-14 | minor | `lib/compliance.ts:7-12` | six statutory thresholds as bare constants | each carries its norm in the module | §9.1 C12 |
| D-15 | **major** | `lib/payroll.ts:32` | *"muitas vezes 14% linear"* — no norm, anywhere in the tree | retire; replace per §11 D3 | §5 R7 |
| D-16 | minor | `lib/payroll.ts:24` and `:32` | rate spans hand-restated | derive from `rgpsBrackets` / `rppsFederalBrackets`; output string unchanged (AC8) | §6.1, §6.2 |
| D-17 | **major** | `components/organisms/journey-form.tsx:157` | a universal negative legal assertion, unsourced and over-broad | rewrite positive per §11 D1 | §5 R13 |
| D-18 | minor | `components/organisms/salary-calculator.tsx:86` | *"sobre a hora bruta, como manda o art. 59, §1º"* | the norm says *"a hora normal"* | §5 R13 |
| D-19 | minor | `components/organisms/calculator-views.tsx:85` | `(Súmula 60 do TST)` | `(Súmula 60, II, do TST)` | §5 R14 |
| D-20 | **major** | `lib/salary-period.ts:4` | `PAID_MONTHS_PER_YEAR = 13`, uncited | CF/88, art. 7º, VIII; Lei nº 4.090/1962, art. 1º — plus the disclosure in §11 D6 | §5 R16 |
| D-21 | major | `__tests__/calculator-views.test.tsx:103` | asserts the aggregator URL as expected | inherits D-2's fix | §9.1 C19 |

**Nothing in this table changes a number.** Every row is a citation, a source field, a URL, or a
prose restatement replaced by a derivation of a value that already exists. If implementing any row
moves a figure in §8, the implementation is wrong and G6 rejects.

---

## 11. Disclosures the app must show

`PRODUCT.md` §4, *name the gap*. I state **what must be said and where it must be legible**;
`content-writer` words it at G3. Per lesson 018, each is stated as a rendering condition as well as a
DOM condition — a disclosure that is in the DOM and unreadable has not been made.

| # | Where | What the user must be told | Why it arises | Rendering condition |
|---|---|---|---|---|
| **D1** | `journey-form.tsx:157`, the hint under *"Adicional acima de 2h (%)"* | That the statutory floor is **50% for every extra hour, including after the second**, naming **CF art. 7º, XVI** and **CLT art. 59, §1º**; and that 100% is a **convenção coletiva** matter, not a statutory one. It must **not** assert that no law doubles the adicional. | R13. The negative form is unsourceable and over-broad (Lei nº 605/1949, art. 9º). | Visible in the field's own hint, associated by `aria-describedby`, at 390 px in both themes, without truncation or a disclosure triangle. |
| **D2** | `calculator-views.tsx:85`, inside the *"Não entram na conta"* paragraph | That the prorrogação da jornada noturna depois das 05:00 is **not computed**, naming **Súmula 60, II, do TST**. It stays in the sentence of things the app omits and must never move into a list of what it applies. | R14, and `spec.md`'s override: naming the norm the app omits is an existing §4 obligation, not a new citation. | Rendered text in the footer paragraph, not a tooltip, not behind a disclosure control. |
| **D3** | `lib/payroll.ts:32` → `regime-field.tsx:59` | That the ladder shown is the **federal** RPPS and **does not apply to a state or municipal servidor**, whose rate is set by their own ente. If the app says anything further about that rate, it may say only what **EC nº 103/2019, art. 9º, §4º** says: it may not be lower than the União's, save where the regime has no actuarial deficit, in which case not lower than the RGPS rates. **The words "muitas vezes 14% linear" do not ship.** | R7. The existing limiting sentence is itself a gap disclosure, so its accuracy is in the domain. | Visible in the regime helper text at the moment the Estatutário regime is selected — reach that state before reporting on it (lesson 031). |
| **D4** | `day-summary.tsx:213` / `:159` | That **20% is the floor**, not the rate — *"pelo menos"*, CLT art. 73, caput — and that a convenção coletiva may set more. | R15. The app renders *"Adicional noturno 20%"* as though 20% were the figure. | Adjacent to the night-premium line, in the same visual block, not in the footer. |
| **D5** | `calculator-views.tsx:90-99`, the year line | That the effective date shown belongs to the table it sits beside. Splitting one source into several must not drop the competence year or the effective date from **any** of them, and must not attach 2026-01-01 to the IRPF table, which took force in **May 2025**, or to the dependant deduction, which took force in **April 2015**. | `PRODUCT.md` §4, third commitment. §6.4. | Each norm name and its date render together, never split across a line break in a way that pairs a norm with a neighbour's date, at 390 px in both themes. |
| **D6** | wherever the **"Ano"** period is shown (`lib/salary-period.ts` → the period selector) | That the annual figure is **twelve months plus the 13º salário** (CF art. 7º, VIII; Lei nº 4.090/1962), and that it is an **approximation**: the 13º has its own INSS and its own IRRF, withheld separately, so thirteen times a monthly net is not the year's net. | R16. `PAID_MONTHS_PER_YEAR = 13` silently asserts an entitlement *and* an arithmetic simplification. | Visible when "Ano" is the selected period — again, reach that state before reporting on it. |
| **D7** | the footer's *"Não entram na conta"* paragraph | The convenção coletiva gap, which already ships and must survive every rewording. | `PRODUCT.md` §7 refuses the database, so the disclosure is the entire remedy. | unchanged from today |

**A standing constraint on all seven.** None may be moved into a tooltip, a popover, an
expandable, a `title` attribute, or any control the user must operate. `spec.md` § Non-goals already
forbids adding such a surface; this gate adds that an existing disclosure may not be *relocated* into
one either. A gap the user has to click to discover has not been named.

---

## 12. Out of scope, and the non-claim

| Excluded | Why | What the user sees instead |
|---|---|---|
| The Súmula 431 divisor attribution | Spec **0007** owns it, end to end, wherever it appears | unchanged by this spec |
| Any change to a computed value | §9.0 found none wrong; `spec.md`'s block is untriggered | the same numbers, correctly attributed |
| The 13º's own INSS and IRRF | `PRODUCT.md` §6 — the app does not compute it | disclosure D6 |
| Tributação mínima de altas rendas (Lei nº 15.270/2025, art. 6º-A) | Not a payroll rule; no wage earner's folha carries it | nothing — it is outside the domain, not a gap in it |
| IRRF and INSS incidence **over** the horas extras | already disclosed in the footer; unchanged here | unchanged |
| A second legal year, or any supersession model | `PRODUCT.md` §3's one-file-diff constraint | `LEGAL_YEARS` keyed by year, as today |

### The non-claim this gate creates

Per lesson 003 and 004, an unbacked claim is retired **with a recorded non-claim and its unlock
sequence**, never by deleting the words — and the replacement is bound by **what it must say**, not
by a list of forbidden words. `PRODUCT.md` §9's non-claim table gains this row, and
`product-manager` makes the amendment:

| Non-claim | Why it may not be made | Unlock sequence |
|---|---|---|
| **That state and municipal RPPS rates are "often 14% linear"** | It is an empirical claim about 27 states and 5.570 municipalities. No Brazilian norm states it, and none could — each ente sets its own rate by its own lei. **EC nº 103/2019, art. 9º, §4º** sets only a floor. A claim the product cannot source is a claim the product must not make. | It returns only if WorkLoad acquires a citable source that surveys those rates and commits to maintaining it — which `PRODUCT.md` §7 refuses for convenções coletivas on exactly the same reasoning — **and** §9 gains a row for it. Until then the app says what EC 103 art. 9º §4º says, or says nothing. |

A **binding note for `content-writer` at G3**, per lesson 004: the replacement is bound by what it
must assert, not by avoiding the string `14%`. Any sentence that tells the reader what a state or
municipal servidor's rate *typically is* — in any wording, with any hedge, at any percentage —
reproduces this non-claim and fails this gate. The permitted content is exhaustively: *this ladder is
the federal one*, *it does not apply to you if you are a state or municipal servidor*, and
optionally *your ente sets your rate, and by EC 103/2019 art. 9º §4º it may not be below the União's,
save where the regime has no actuarial deficit.*

---

## 13. Known imprecisions

Only the human accepts one, and the acceptance is recorded here.

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|
| `PAID_MONTHS_PER_YEAR = 13` treats the 13º as one more month of the same net pay | The "Ano" figure is an approximation; the 13º's INSS and IRRF are withheld separately, so the real annual net differs | **not accepted — disclosed instead**, D6 | — |
| `effectiveFrom` is one date for a record holding three | No number moves; the date shown beside the IRPF table is 2026-01-01 when the table took force in May 2025 | **not accepted — fixed**, D-7 and D5 | — |

Nothing on this list is accepted. Both are being closed by this spec, which is why the gate can
pass without a human decision.

---

## 14. Open questions for the human

| # | Question | What I did in the meantime |
|---|---|---|
| Q1 | `planalto.gov.br` has now failed at **three consecutive** law gates. Is it blocked at the network boundary rather than down? Every citation in this file, and every `sourceUrl` this spec will ship, routes around it. | Used `camara.leg.br`, `gov.br` and `tst.jus.br`, all reached on 2026-09-15 and recorded in §2. No norm went unverified. Nothing is blocked on an answer. |
| Q2 | The Ministry serves the Portaria nº 13/2026 as a **scanned image PDF with no text layer**, and its own page carries the red line *"Este conteúdo não substitui o publicado na versão certificada."* `in.gov.br`, which serves the certified version, returned a protocol error here. | Read the scan at 150 dpi and transcribed §6.1 and §6.2 digit by digit; cross-checked the ceiling against the Ministry's own news page and the IRPF figures against the Receita's 2026 table page. If a human can reach `in.gov.br`, a one-time confirmation of Anexos II and III against the certified DOU text would close the last gap in the rebuild contract. **This does not block the gate**; it is the weakest link in it, and it is named rather than hidden. |

---

## 15. What G6 will check

So the bar is known before anything is built, not discovered at the review.

1. Every table value in §6, digit by digit, **against the constant** — not against a test that
   asserts it.
2. Every worked example in §8 reproduced to the centavo, including **E3 and E5**, which are the two
   that catch a reduction applied to the wrong base or to the wrong sign.
3. Every row of §7 present in `lib/legal-tables.ts`, with the norm this file names and a URL whose
   parsed `hostname` is in §2's allow-list.
4. Every row of §10 closed, or bounced with a reason.
5. Every disclosure in §11 **rendered**, in the state that renders it, at 390 px, in both themes —
   reached by driving the app to that state, never inferred from the source string (lesson 031).
6. `PRODUCT.md` §9's non-claim table carrying §12's row.

---

## 16. Addendum — run 2. Two rulings owed to `design.md` §11, and two findings the measurement produced

**Status — this is an addendum to a closed G2, not a re-run.** §1's verdict stands. Nothing in
§§2–15 is re-opened. This section answers `design.md` §11 **Q3** and **Q1**, corrects **one clause I
wrote myself in §11 D3**, and records two findings that the measurement required to answer Q1
produced. The scope call on both findings is `tech-lead`'s; the severity is mine.

### 16.0 How everything below was measured

Isolated copy outside the repository, per `AGENTS.md` §4 rule 6 and §5 *How an instrument's reading
is trusted*.

| | |
|---|---|
| Copy | `rsync -a --exclude node_modules --exclude .next --exclude .git` → scratchpad; `cp -al` of `node_modules`; `rm -rf .next` |
| Build | `pnpm build`, exit **0**, own `.next` |
| Server | `pnpm start -p 3711`. Port confirmed free with `ss -ltn` before use. Siblings held **3141**, **3457**, **3910**; none was touched, none was killed |
| Driver | Playwright chromium, viewports **390×900** and **1440×900**, `colorScheme` light and dark |
| Repository | untouched. No file in the working tree was modified, reverted or restored — every source file's mtime predates the copy (10:08), and the `rsync` ran one-way, out of the repository |
| Snapshot | `HEAD` **5c0c6fa**, working tree as of **2026-09-19 10:08**. Every file this addendum rules on was last written on 2026-09-14 and is untouched by the sibling work in flight on this branch: `components/molecules/regime-field.tsx`, `components/organisms/day-summary.tsx`, `components/organisms/journey-form.tsx`, `components/atoms/collapsible-panel.tsx`, `lib/payroll.ts`, `hooks/use-work-calculator.ts` |

**One instrument was discarded and no number below comes from it.** A first pass used `pnpm dev` in
the same copy. In that build the regime control did not respond to a click — the panel never opened
and no `input[name=work-regime]` ever entered the DOM — while the HMR websocket failed its handshake
in this sandbox. Every figure in §16.1–§16.4 is from the **production build**. Recording this because
a reading taken there would have said "the card never renders at all", which is a true statement
about the instrument and a false one about the code.

### 16.1 Q3 — does `R-2` alone discharge D3?

#### The states, all of them, rendered

The regime control has **five** distinguishable states from its own branch conditions
(`regime-field.tsx:19` `isOpen`, `:21` `selected`, `collapsible-panel.tsx:17` the conditional
render, plus the persisted reload). Five states, five rows — the two counts are equal.

Salário bruto **R$ 15.000,00** typed into `#salario-bruto`, so the figure the disclosure qualifies is
a real number and not `R$ 0,00`.

| # | State | How it was reached | `R-2` in the DOM | Painted height / opacity | Previdência figure on screen |
|---|---|---|---|---|---|
| S-A | first paint, CLT, panel closed | `goto /custo-da-hora` | **no** | — | `TOTAL DESCONTOS R$ 3.932,64` |
| S-B | panel open, CLT still selected | click *Alterar* | yes | 187,00 px @390 · 82,00 px @1440 · opacity `1` | — |
| S-C | +80 ms after the selection gesture | click the Estatutário card | yes | unchanged | — |
| S-D | **settled**, ≥1 200 ms after the gesture | — | **no** | — | `TOTAL DESCONTOS R$ 4.625,56` |
| S-E | after `reload()`, regime persisted | — | **no** | — | `TOTAL DESCONTOS R$ 4.625,56` |

Identical at 390 and 1440. The regime control in S-D and S-E reads, in full:
*"Regime de Trabalho · Estatutário · Servidor público efetivo, com regime próprio · Alterar"* — no
mention of *federal*, and nothing about a servidor estadual or municipal.

**The figure is regime-derived, and that is the decisive number.** At the same salário bruto the
desconto is **R$ 3.932,64** under CLT and **R$ 4.625,56** under Estatutário — a difference of
**R$ 692,92 por mês** produced entirely by `rppsFederalBrackets`. That figure renders in S-D and S-E.
`R-2` does not.

**When the carrier leaves the DOM**, sampled every 25 ms from the click:

| Viewport | Theme | `R-2` removed at |
|---|---|---|
| 390 | light | **481 ms** |
| 390 | dark | **467 ms** |
| 1440 | light | **371 ms** |
| 1440 | dark | **373 ms** |

`collapsible-panel.tsx:23` declares a 220 ms exit; the observed removal is 371–481 ms, spread 110 ms.

#### Ruling

> **`R-2` alone does not discharge D3.** The legend slot in `design.md` §8 **stands**, and
> `content-writer` is re-opened for one string inside S6's budget.

The reason is not that `R-2` is too short or badly placed. It is that **D3's subject is a variable
the product is unable to collect** — which ente the servidor belongs to — so by lesson **047** the
omission is state-independent and the disclosure is too. `R-2` renders only while the user is
choosing and is gone in every state they afterwards sit in, including the reload state, while the
figure it qualifies renders permanently. A disclosure the reader can only meet before the number
exists, and never while it is on screen, has not been made.

#### Correction to my own §11 D3 — and it is the same mistake lesson 048 names

§11 D3's rendering condition reads *"Visible in the regime helper text at the moment the Estatutário
regime is selected."* **That clause is wrong, and I wrote it.** It is stated in the axis of *the
instant of the gesture* — and the element that carries it is destroyed by that very gesture, so the
clause is **unsatisfiable by any placement inside the panel**. This is the exact shape of `0007`
addendum A clause 2 in lesson 048's table: a clause whose substance is about the user's experience,
written as a predicate over the one quantity the author had in hand.

**D3 is restated below. Where this text and §11 D3 disagree, this text wins.** Lesson **048**
confirmed rather than re-written, because this is an instance of it and not a new rule.

**Substance, in one sentence:** *the user was shown a previdência figure computed from the federal
RPPS ladder without being told that the ladder is the federal one and does not apply to a state or
municipal servidor.*

| Clause | What it requires | Quantity it is breached in |
|---|---|---|
| **D3.1 — domain** *(carries the substance)* | D3 renders in **every state in which the app renders a figure derived from `rppsFederalBrackets`** — that is, whenever the selected regime is `estatutario`. Not gated on the panel being open, not gated on the selection gesture, not gated on a non-zero salário. | presence |
| **D3.2 — persistence** *(tripwire)* | The element carrying D3 is in the DOM with `getBoundingClientRect().height > 0` on its **border box** and `getComputedStyle().opacity === "1"`, measured **no earlier than 1 000 ms** after the selection gesture, and again after a full `reload()` with the regime persisted. | time / lifetime |
| **D3.3 — geometry** *(tripwire)* | LR1 and LR2b are measured against the **`<fieldset>` border box in the closed state**, via `getBoundingClientRect().width`. | size / measure |
| **D3.4 — content** *(carries the substance)* | It must assert that the ladder this screen applies is the **federal** RPPS one and that it does not apply to a state or municipal servidor. It may add only what **EC nº 103/2019, art. 9º, §4º** says (§5 **R7**). §12's non-claim binds it in full — any sentence saying what such a rate *is*, *tends to be* or *usually is*, at any percentage, with any hedge, fails. Per lesson **049**, name the ladder; no *"a tabela acima"*, no *"este número"*. | wording |

**Worked measurement of the intended state** — taken on the state I consider correct (regime control
closed), not on the broken one, and not derived from a token:

| Viewport | Theme | `<fieldset>` border-box width | Closed control border-box width | Root font size |
|---|---|---|---|---|
| 390 | light | **308,00 px** | 308,00 px | 16 px |
| 390 | dark | **308,00 px** | 308,00 px | 16 px |
| 1440 | light | **667,33 px** | 667,33 px | 16 px |
| 1440 | dark | **667,33 px** | 667,33 px | 16 px |

`design.md` §8's **308,00 px** for this slot is independently reproduced by this instrument, so that
figure is now a measurement twice over and `content-writer` may size against it. The 1440 figure is
**667,33 px**, which `design.md` §8 does not state — it states LR2b's 100,00 cpl for the same slot.

**Calibration of D3.2's 1 000 ms.** The carrier's observed removal spans 371–481 ms across the four
cells. 1 000 ms clears the maximum by 519 ms, which is **4,7× the 110 ms spread** of the instrument.
A threshold at 500 ms would sit inside the spread and is refused.

**Which clause decides a borderline case.** D3.1 and D3.4. D3.2 and D3.3 are tripwires; neither
decides the verdict alone.

#### What this ruling does and does not do to `R-2`

- `R-2` is **still bound by §12** — the retired non-claim may not ship, whatever else `R-2` says.
  That obligation never depended on D3 and is untouched.
- Nothing here **requires** `R-2` to carry D3's content. `design.md` §8's refusal of `copy.md`'s
  pre-approved 294-character shortening was justified by D3; it no longer is. Whether the EC 103
  clause stays in `R-2` is now `product-designer`'s and `product-manager`'s call on `PRODUCT.md` §4,
  not a legal requirement of this gate.
- **If `R-2` keeps a D3-equivalent sentence, it may not be the same sentence as the legend's.** In
  the open-panel state both are on screen at once, and lesson 047 is explicit that a disclosure
  renders exactly once per state — never the same sentence in a permanent slot and in a transient one
  simultaneously. Two different sentences about the same gap is fine; one sentence twice is not.

### 16.2 Q1 — is a field hint inside a closed panel an LR3 violation?

#### The states, rendered

| # | State | `aria-expanded` on the settings control | `#extra-tier-rate` in the DOM | D-1 hint in the DOM | Hint border box |
|---|---|---|---|---|---|
| S-F | first paint, panel closed | `false` | **0** | **no** | — |
| S-G | panel open | `true` | **1** — 258,00 × 56,00 @390 · 296,67 × 56,00 @1440 | **yes**, opacity `1` | 258,00 × 69,56 @390 · 296,67 × 52,17 @1440 |
| S-H | panel closed again | `false` | **0** | **no** | — |

Identical in both themes.

#### Ruling

> **No. The hint's placement inside the closed panel is not an LR3 violation, and
> `product-designer`'s position in Q1 is accepted.** The field and its hint have **identical
> lifetimes**: there is no state in which `#extra-tier-rate` is in the DOM and the hint is not. The
> substance LR6.1 carries — the reader meets the disclosure no later than the claim it qualifies — is
> satisfied by construction, because the same control governs both. The field and its hint do **not**
> leave the panel, and no scope change is owed to `product-manager` on this account.

This ruling is independent of **Q2**: it holds whether `surfaceRoot` is the field or the panel.

**But this discharges D1 only as to the field.** Reaching S-F and S-H produced a state the Q1
question does not cover, and it is a finding rather than a footnote — see §16.3.

### 16.3 Finding **L-2** — the rate the app asserts renders outside the panel, unqualified

| | |
|---|---|
| Severity | **major** |
| File | `components/organisms/day-summary.tsx:193` and `:203`; default at `hooks/use-work-calculator.ts:13-14` |
| Routed to | `tech-lead` → `product-manager` for the scope call |

**What the code does.** `day-summary.tsx:193` and `:203` render `Extra {firstTierRate}%` and
`Extra {extraTierRate}%` as row labels in the variable-pay block, with the money beside them. That
block is **unconditional** — `design.md` §8 already establishes this for D4's sibling row. Measured
with the settings panel closed (`aria-expanded="false"`) and the D-1 hint **absent from the DOM**:

| Viewport | Rendered row | Row border-box width |
|---|---|---|
| 390 | `Extra 50% · 0h 0m · R$ 0,00` / `Extra 100% · 4h 12m · R$ 572,73` | 308,00 px |
| 1440 | same | 667,33 px |

`100` is **not a number the user typed**. `hooks/use-work-calculator.ts:14` sets
`DEFAULT_EXTRA_TIER_RATE = 100`, so on first paint the app itself asserts a 100% adicional and prices
money at it.

**What the norms require.** Executed unit by unit against the code's own arithmetic, on the measured
weekday case — 4h12m extras, hora bruta R$ 15.000,00 / 220 = R$ 68,1818:

| Operative unit of CLT art. 59 | What it enacts | Number it yields here |
|---|---|---|
| **caput** (red. Lei 13.467/2017) | *"acrescida de horas extras, em número não excedente de duas, por acordo individual, convenção coletiva ou acordo coletivo"* — a ceiling on the **quantity**, and the source of `FIRST_TIER_LIMIT_MINUTES = 120` | **no rate at all.** It fixes how many hours, never what the excess costs |
| **§1º** | *"A remuneração da hora extra será, pelo menos, 50% superior à da hora normal"* | 4,2 × 68,1818 × 1,5 = **R$ 429,55** — the statutory minimum for the whole day |
| **§2º** | the acréscimo may be **dispensed** where compensated by acordo/convenção, within a year and 10h/day | **R$ 0,00** of adicional, for a compensated day |
| **§3º** | uncompensated hours paid on rescisão at the rescisão-date remuneration | not this screen |
| **§4º** | revogado pela Lei 13.467/2017 | no number |
| **§5º** | banco de horas by individual written agreement, up to six months | same operand as §2º |
| **§6º** | compensation in the same month by individual agreement, tacit or written | same operand as §2º |

**No unit of art. 59 tiers the rate**, which is §5 **R13** clause 2 already on the record. The app
renders R$ 504,55 for that weekday (204,55 + 300,00), which is **117,5% of the §1º floor**.

**The finding is therefore not "the arithmetic is wrong" — it is "the app assumed an operand on the
user's behalf and does not say so."** The tier boundary at two hours and the 100% second rate are a
**convenção coletiva** feature. `PRODUCT.md` §7 refuses to carry CCTs, so the remedy is not a
database — it is the disclosure D1 already specifies, rendered where the assumed rate renders. Today
D1 is specified only for the field, and the field is not where most users meet the number.

**What is owed.** A ruling from `tech-lead`/`product-manager` on whether D1 gains a second slot in
the variable-pay block — structurally the same move `design.md` §8 already made for **D4**, in the
same block, for the same reason. I specify the content, not the placement: wherever an overtime rate
above the §1º floor renders as a money label, the reader must be able to see that **50% is the
statutory floor for every extra hour** (CF art. 7º, XVI; CLT art. 59, §1º) and that anything above it
comes from a **convenção coletiva**, not from a lei. I do not decide whether that is in 0003's scope.

### 16.4 Finding **L-1** — Saturday overtime is routed to the 100% tier, and no norm puts it there

| | |
|---|---|
| Severity | **critical** — a user-visible money figure with no norm behind it |
| File | `hooks/use-work-calculator.ts:70` (the predicate) and `:38-49` (`splitOvertime`) |
| Routed to | `tech-lead`. **Not a patch. Not an edit by me.** |

**What the code does.** `hooks/use-work-calculator.ts:70` computes
`dayOfWeek === 0 || dayOfWeek === 6` from the entry date and passes it as `isWeekend`; `:42-44` then
returns `{ firstTierMinutes: 0, extraTierMinutes: overtimeMinutes }` — **all** overtime into the tier
the app prices at 100% by default, and **zero** minutes into the 50% tier.

**Measured, production build, salário bruto R$ 15.000,00, entrada 08:00, almoço 12:00–13:00, saída
manual 22:00, settings panel closed, 390 px:**

| Entry date | Weekday | `Extra 50%` | `Extra 100%` | Day total |
|---|---|---|---|---|
| **19/09/2026** | **sábado** | 0h 0m · R$ 0,00 | 4h 12m · **R$ 572,73** | R$ 572,73 |
| 20/09/2026 | domingo | 0h 0m · R$ 0,00 | 4h 12m · R$ 572,73 | R$ 572,73 |
| 21/09/2026 | segunda | 2h 0m · R$ 204,55 | 2h 12m · R$ 300,00 | R$ 504,55 |

The three rows differ only in the day of the week. Arithmetic reproduced independently:
4,2 × 68,1818 × 2 = 572,7273 → R$ 572,73; 2 × 68,1818 × 1,5 = 204,5455 → R$ 204,55;
2,2 × 68,1818 × 2 = 300,00. **Saturday is priced exactly as Sunday**, and R$ 68,18 per day above the
same hours on a Monday.

**What the norms say, unit by unit.**

| Norm | Operative text | Effective date | Source | What it yields for a Saturday |
|---|---|---|---|---|
| Lei nº 605/1949, **art. 1º** | *"Todo empregado tem direito ao repouso semanal remunerado, de vinte e quatro horas consecutivas, **preferentemente aos domingos** e, nos limites das exigências técnicas das empresas, nos feriados civis e religiosos, de acordo com a tradição local."* | 1949-01-05 | https://www2.camara.leg.br/legin/fed/lei/1940-1949/lei-605-5-janeiro-1949-367115-normaatualizada-pl.pdf | Saturday is **not** the repouso. The norm names domingos and feriados |
| **Súmula nº 146 do TST** (incorporou a OJ nº 93 da SBDI-I) | *"O trabalho prestado em domingos e feriados, não compensado, deve ser pago em dobro, sem prejuízo da remuneração relativa ao repouso semanal."* | Res. 121/2003, DJ 19, 20 e 21.11.2003 (redação original RA 102/1982) | https://www.tst.jus.br/documents/10157/63003/LivroInternet+(6).pdf/778cc371-66ec-6b88-8310-fabd1504f0a5 | **Saturday is absent.** The doubling attaches to domingos and feriados |
| Lei nº 605/1949, **art. 9º** | doubling on feriados não compensados (quoted in full at §5 **R13**) | 1949-01-05 | as above | feriado trigger, not a weekday trigger |
| CLT, **art. 59, §1º** | *"A remuneração da hora extra será, pelo menos, 50% superior à da hora normal."* | 2017-11-11 (red. Lei 13.467/2017) | https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html | **R$ 429,55** — the floor, and the only number a norm produces for that Saturday |
| CLT, **art. 59, §6º** | *"É lícito o regime de compensação de jornada estabelecido por acordo individual, tácito ou escrito, para a compensação no mesmo mês."* | 2017-11-11 | as above | this is the unit Saturday usually falls under for a 44h week — it makes Saturday a **compensated** day, the opposite of a doubled one |

**No operative unit of any norm this app cites, or of any norm found this session, produces
R$ 572,73 for a Saturday.** Every unit was executed and every one has a number beside it. The floor
is R$ 429,55; the app renders 133,3% of it, and it does so because of a day-of-week predicate that
carries no citation anywhere in the tree.

**The Sunday branch is a different verdict, and it is the sharper one.** Súmula 146 does double —
but only *não compensado*. The app collects neither the folga compensatória (CLT art. 59, §§2º, 5º,
6º) nor the feriado calendar, so even on a Sunday it assumes an operand the user never supplied, and
it can never fire on a feriado that falls on a weekday. That is an **ambiguity to be named and a
field to be collected or disclosed**, not an arithmetic to be condemned. The Saturday branch has no
such defence: there is no reading of any unit under which it is right.

**Two structural breaches, independent of the number.**

1. `FIRST_TIER_LIMIT_MINUTES = 120` (art. 59 *caput*) and the `dayOfWeek === 0 || dayOfWeek === 6`
   predicate are **CLT thresholds living in `hooks/`**, which `AGENTS.md` §8 forbids — *"Business
   rules live in `lib/`. No tax table, no CLT threshold, no rounding rule inside a component or a
   hook."* By that same rule they can carry **no norm comment at all**, since the norm-citing comment
   exemption is `lib/`-only. Confirmed: neither carries one.
2. `AGENTS.md` §9 — *every user-visible number is traceable to a table in `lib/` that cites its
   norm.* R$ 572,73 traces to a predicate in a hook and to nothing else. **By my own bar in this
   file, a user-visible number with no table is an automatic reject.**

**Amendment to §12, marked here at the gate that found it.** §12's row *"Any change to a computed
value — §9.0 found none wrong"* is **falsified by measurement** for this case. §9.0 swept the nine
legal data sets in `LEGAL_YEAR_2026` and the strings in the inventory; it did not sweep a day-of-week
routing in `hooks/` that renders money and cites nothing. I am not rewriting §9.0 or §12 — the
classification loses to the measurement, the finding is routed with its new severity, and the scope
call is `tech-lead`'s. **`spec.md`'s wrong-number block is a question for `tech-lead` and the human,
and this addendum is the trigger for it.** Lesson **045** confirmed: the claim this spec is retiring
in prose is still being made by a constant that renders a number.

### 16.5 Summary of what this addendum changes

| | |
|---|---|
| **Q3** | **`R-2` alone does not discharge D3.** The legend slot stands; `content-writer` is re-opened for one string inside `design.md` S6's budget, bound by D3.4. |
| **§11 D3** | Its rendering condition is **corrected** by §16.1's D3.1–D3.4. Where the two disagree, §16.1 wins. Lesson 048 confirmed. |
| **`R-2`** | Bound by §12 only. No longer required to carry D3. If it keeps a D3-equivalent sentence it must not be the **same** sentence as the legend's. |
| **Q1** | **Not an LR3 violation.** The designer's position is accepted; field and hint stay in the panel; independent of Q2. |
| **L-2** | **major**, routed. D1's slot covers the field; the rate also renders unqualified in the always-visible variable-pay block. |
| **L-1** | **critical**, routed. Saturday overtime routed to the 100% tier with no norm behind it; §12's "no computed value is wrong" corrected here. |
| **Not touched** | §§1–10, §13, §14, §15, every table, every rate, every other disclosure. |
