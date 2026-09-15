# 0002 — Legal basis

> Owner: labor-law-analyst · Gate: `law` · **Blocking — no design, copy, or code starts before this passes.**

**Verdict: pass.** (Run 2. Run 1 was `reject`; see §1.)

B1 is answered. `product-manager` dropped the "banco de horas" claim rather than rewording it,
and F1 was folded in as LD11. Both are settled below — **§14 (LD10)** and **§15 (LD11)** — with
two new binding rules, **S9** and **S10**, that join S1–S8 as what `content-writer` writes
against at G3/G4 and what I check at G6.

§1 (the blocker) is kept verbatim as the run-1 record. It is **resolved**, not live. Nothing in
§§2–13 was re-litigated at run 2 and nothing in them changed, except the three verification
notes discharged in §13 and the new rows in §11 and §12.

Nothing in this spec changes a rate, a bracket, a ceiling, a divisor or a rounding step.
This analysis therefore settles **meaning of strings**, not arithmetic — with one exception:
every figure a string *asserts* was re-verified against the primary norm, and four of them
came back defective (§7).

---

## 0. Scope of this analysis

### Covered

- The legal and factual work done by each of the **eleven user-visible strings** the spec
  enumerates, and the binding rule each rewrite must satisfy (§4).
- `MISSING_VALUE` as a legal object: what it must and must not communicate (§5).
- The two disclaimers (`calculator-views.tsx:79`, `day-summary.tsx:221`) — what each one
  currently discloses, and what the rewritten version must still disclose (§6).
- Verification that the DSR holiday assumption in `day-summary.tsx:221` matches what
  `lib/weekly-rest.ts` actually computes (§6.2).
- The four public claims (`alt`) and the JSON-LD `name`, against `PRODUCT.md` §9 (§4, B1).
- Re-verification of the RGPS 2026 brackets and the ceiling discount that `lib/payroll.ts:24`
  puts in prose (§2, §3).
- LD7: confirmation that no number rendered by the touched files is altered (§8).

**Added at run 2:**

- **LD10** — the completeness of the "banco de horas" removal surface, and whether the
  replacement `work` descriptor names only capabilities the code has (§14, rule **S9**).
- **LD11 / F1** — the correct name for R$ 8.475,55 at `lib/payroll.ts:24` (§15, rule **S10**).
- An audit of the two new `PRODUCT.md` §9 entries — the Evidence row and the explicit
  non-claim (§14.5).
- Re-verification of the RGPS brackets, the RPPS federal ladder and the ceiling against the
  **primary DOU text**, which was unreachable at run 1 (§15.1).

### Explicitly not covered

| Not covered | Why |
|---|---|
| The IRRF 2026 brackets, `simplifiedDeduction`, `dependentDeduction`, `exemptionCeiling` and the `reduction` coefficients in `lib/legal-tables.ts` | No string in scope asserts any of them, and the spec forbids touching that file. They were **not** re-derived here. The next spec that touches the salário path must re-verify them against Lei 15.270/2025. |
| The RPPS federal ladder above the RGPS ceiling | Same reason. `lib/payroll.ts:31` states it in prose but carries no em-dash and is not in scope. |
| The night-shift reduced hour, art. 66 interregno, art. 71 intervalo, the Súmula 431 divisor | Untouched by this spec. |
| Typography, the icon library, `100dvh`, LCP, bundle size, the design system, any dial value | Not a legal question. I rule on meaning, not on type. A font that renders `0` as `O` is an AC5/AC6 failure for `product-designer` and `web-standards-auditor`, not a finding of mine. |

---

## 1. Blocker

### B1 — The four `alt` strings and the JSON-LD `name` claim a feature the app does not have

> **RESOLVED at run 2** by `product-manager` (option 1: the claim is dropped). Kept verbatim
> below as the run-1 record. The ruling that replaces it is §14.

**Severity at run 1: blocking.** Raised under LD5 and LD6, which the spec wrote precisely to catch this.

| | |
|---|---|
| Strings | `app/opengraph-image.tsx:3`, `app/twitter-image.tsx:3` (`alt`); `lib/structured-data.ts:27` (`name`, via `VIEW_HEADINGS.work` at `lib/calculator-view.ts:9`) |
| Claim | `"WorkLoad — calculadora de jornada, horas extras e banco de horas"` |
| Norm | CLT art. 59, §§2º, 5º e 6º (banco de horas / regime de compensação), redação da Lei nº 13.467/2017, em vigor desde 11/11/2017 |
| What the app does | `components/organisms/day-summary.tsx:113,172` renders `balanceMinutes` — the saldo **of one day**, from `stats.balance`. There is no accumulation across days, no compensation window, no pactuação, no expiry. Nothing in `lib/` carries a multi-day balance. |

A **banco de horas** is a named legal instrument: a compensation regime, pactuado, with a
statutory settlement window (six months by individual written accord, one year by norma
coletiva). A single day's ±HH:MM saldo is not one. A user who arrives from a search for
"calculadora de banco de horas" is told the product does something it does not do, about an
instrument whose whole content is the accumulation the app never performs.

`PRODUCT.md` §9 backs five claims. None of them is "banco de horas". Under §9's own closing
sentence — *"Anything not in this table is not a claim the product may make, in the UI or in
the README"* — the string is not permitted, and the spec's own disclosure obligation says the
post-change strings "may claim only what `PRODUCT.md` §9 backs".

**Why this blocks rather than becoming a copy note.** The remedy is not a punctuation
decision and `content-writer` cannot take it. Removing "banco de horas" reaches four strings
the spec does **not** list — `app/page.tsx:6`, `app/page.tsx:11`, `lib/og-image.tsx:14`,
`lib/calculator-view.ts:9` — and `VIEW_HEADINGS.work` is a user-visible heading and the site's
primary SEO term. Choosing between *dropping the claim*, *renaming what the app shows*, or
*building the accumulation* is a product decision.

**What would have to change for this gate to pass.** One of:

1. `product-manager` removes "banco de horas" from every claim surface, and this spec's scope
   grows by the four unlisted strings, recorded in `STATUS.md`; or
2. `product-manager` replaces it with a term the code backs — the app computes a **saldo
   diário de horas**, and "saldo de horas do dia" claims exactly that; or
3. The human accepts the imprecision in writing, under `AGENTS.md` §4 rule 8, naming the norm
   (CLT art. 59 §2º), the gap, who accepted and why, recorded in `spec.md`. Only the human
   can do this.

Until one of the three, the eleven-string rewrite must proceed **without** touching the
"banco de horas" segment, because a rewrite that preserves it launders an unbacked claim
through a punctuation pass.

---

## 2. Rules in play

| # | Rule | Why this change depends on it |
|---|---|---|
| R1 | RGPS contribution table 2026 — progressive brackets and the salário-de-contribuição ceiling | `lib/payroll.ts:24` states the ceiling, the rate span and the table year in prose the user reads. The rewrite must keep the figure and the year. |
| R2 | CLT art. 59 *caput* — two hours of horas suplementares per day | `lib/compliance.ts:34` names the limit and raises a warning against it. |
| R3 | Súmula 376, I, do TST — the legal cap does not excuse paying every hour worked | Same string. It is the half of the sentence that turns a scary warning into a right. |
| R4 | Súmula 172 do TST + Lei nº 605/1949 — habitual overtime reflects into the repouso semanal remunerado | `lib/weekly-rest.ts` computes it; `day-summary.tsx:221` discloses the two assumptions it makes. |
| R5 | Lei nº 605/1949, art. 1º — the repouso covers domingos **and** feriados | The reason `day-summary.tsx:221` must keep naming feriados: the app counts only Sundays, so the figure it shows is a floor. |
| R6 | Lei nº 15.270/2025 — IRRF from the 2026 calendar year | Not restated by any string in scope, but it is the norm the footer at `calculator-views.tsx:90-99` *fails* to cite. Finding F3. |

---

## 3. Sources

### R1 — RGPS contribution table, competence 2026

| | |
|---|---|
| Norm | Portaria Interministerial MPS/MF nº 13, de 9 de janeiro de 2026 |
| Article | art. 2º (mínimo e máximo do salário-de-contribuição); tabela de contribuição do segurado empregado, empregado doméstico e trabalhador avulso |
| Effective from | 2026-01-01 (published DOU 2026-01-12) |
| Superseded by | in force |
| Primary source | https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf |
| Text consulted | The primary PDF above is a scanned image and yielded no extractable text in this session (`pdftotext` returned 4 bytes). The bracket values were read from https://www.legisweb.com.br/legislacao/?id=489284 and cross-checked arithmetically against `lib/legal-tables.ts` (see the R$ 988,09 derivation below), which closes to the centavo. |

The salário-de-benefício and the salário-de-contribuição, from 2026-01-01, may not be lower
than **R$ 1.621,00** nor higher than **R$ 8.475,55**. The employee's contribution is computed
progressively: each bracket's rate applies only to the portion of the salário-de-contribuição
that falls inside it, so above the ceiling the discount is a constant.

#### RGPS — segurado empregado, empregado doméstico e trabalhador avulso — 2026

| Bracket | From (R$) | To (R$) | Rate |
|---|---|---|---|
| 1 | 0,00 | 1.621,00 | 7,5% |
| 2 | 1.621,01 | 2.902,84 | 9% |
| 3 | 2.902,85 | 4.354,27 | 12% |
| 4 | 4.354,28 | 8.475,55 | 14% |

- **Boundaries:** every upper bound is **inclusive**; the next bracket opens one centavo above it.
- **Ceiling:** R$ 8.475,55 of salário-de-contribuição. There is no bracket above it.
- **Maximum discount:** R$ 988,09, derived, not decreed —
  `1.621,00 × 7,5% = 121,5750` +
  `(2.902,84 − 1.621,00) × 9% = 115,3656` +
  `(4.354,27 − 2.902,84) × 12% = 174,1716` +
  `(8.475,55 − 4.354,27) × 14% = 576,9792` = **988,0914 → R$ 988,09** (half-up to the centavo).
- **Agreement with the code:** `lib/legal-tables.ts:36-41` and `:49` match this table and this
  ceiling discount exactly, bracket by bracket, to the centavo. No divergence.

### R2 — CLT art. 59, *caput*

| | |
|---|---|
| Norm | Decreto-Lei nº 5.452/1943 (CLT), art. 59, *caput*, redação da Lei nº 13.467/2017, art. 1º |
| Effective from | 2017-11-11 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

*"A duração diária do trabalho poderá ser acrescida de horas extras, em número não excedente
de duas, por acordo individual, convenção coletiva ou acordo coletivo de trabalho."*

The ceiling is **two hours per day**, matching `DAILY_OVERTIME_LIMIT_MINUTES = 120` at
`lib/compliance.ts:7`. The provision binds the *employer's* power to demand the hours; it is
not a condition on the worker's right to be paid for them (that is R3).

> **Verification note.** planalto.gov.br refused every connection from this session
> (`ECONNRESET` on five attempts, both http and https, WebFetch and curl; www2.camara.leg.br
> returned HTTP 429). The *caput* text above was verified through secondary reproductions that
> agree verbatim with each other and name the Lei 13.467/2017 redaction and its 2017-11-11
> vigência. The planalto URL remains the citation of record. Re-verify at G6, when the host
> may be reachable.

### R3 — Súmula 376, I, do TST

| | |
|---|---|
| Norm | Súmula nº 376 do TST — "HORAS EXTRAS. LIMITAÇÃO. ART. 59 DA CLT. REFLEXOS" |
| Origin | Conversão das OJs nºs 89 e 117 da SBDI-1 — Res. 129/2005, DJ 20, 22 e 25.04.2005 |
| Effective from | 2005-04-25 |
| Superseded by | in force |
| Source | https://www.tst.jus.br/web/guest/livro-de-jurisprudencia-indice |

*"I - A limitação legal da jornada suplementar a duas horas diárias não exime o empregador de
pagar todas as horas trabalhadas."*

*"II - O valor das horas extras habitualmente prestadas integra o cálculo dos haveres
trabalhistas, independentemente da limitação prevista no 'caput' do art. 59 da CLT."*

Item I is the one `lib/compliance.ts:34` invokes, and it is the load-bearing half of that
sentence: exceeding the cap is an **irregularity attributable to the employer**, never a
forfeiture by the worker. Item II is what makes the DSR reflection (R4) survive the same cap.

### R4 — Súmula 172 do TST

| | |
|---|---|
| Norm | Súmula nº 172 do TST — "REPOUSO REMUNERADO. HORAS EXTRAS. CÁLCULO" |
| Status | Mantida pelo Pleno do TST — Res. 121/2003, DJ 19, 20 e 21.11.2003 |
| Effective from | 2003-11-21 (original: Res. 10/1983) |
| Superseded by | in force |
| Source | https://www.tst.jus.br/web/guest/livro-de-jurisprudencia-indice |

*"Computam-se no cálculo do repouso remunerado as horas extras habitualmente prestadas."*

Two conditions carry the rule: the overtime must be **habitual**, and the reflection lands on
the **repouso remunerado**, whose base is set by Lei nº 605/1949 (R5).

### R5 — Lei nº 605/1949, arts. 1º e 7º

| | |
|---|---|
| Norm | Lei nº 605, de 5 de janeiro de 1949 |
| Article | art. 1º (which days the repouso covers); art. 7º, §2º (mensalista já remunerado) |
| Effective from | 1949-01-05 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/leis/l0605.htm |

*"Art. 1º Todo empregado tem direito ao repouso semanal remunerado de vinte e quatro horas
consecutivas, preferentemente aos domingos e, nos limites das exigências técnicas das
empresas, nos feriados civis e religiosos, de acordo com a tradição local."*

**Feriados are part of the repouso base.** This is the entire reason the disclaimer at
`day-summary.tsx:221` exists and the entire reason it may not lose the word.

> **Verification note.** Same planalto unreachability as R2. Art. 1º was verified verbatim
> through a search reproduction; the planalto URL is the citation of record.

### R6 — Lei nº 15.270/2025

| | |
|---|---|
| Norm | Lei nº 15.270, de 26 de novembro de 2025 |
| Effective from | 2026-01-01 (ano-calendário de 2026) |
| Superseded by | in force |
| Source | https://www2.camara.leg.br/legin/fed/lei/2025/lei-15270-26-novembro-2025-798354-publicacaooriginal-177117-pl.html |

Full exemption up to R$ 5.000,00 of monthly rendimentos tributáveis from the 2026
calendar year, with a redutor phasing out to R$ 7.350,00. This is the norm that governs the
app's IRRF path — **not** the Portaria the footer currently credits for it (finding F3).

---

## 4. The eleven strings — verbatim, work done, binding rule

Read from the working tree at run 2. Every string is quoted exactly as it stands, pt-BR
untouched. `content-writer` writes against the **Binding rule**; the G6 reviewer checks
against it.

A general rule governs all eleven, and it is the point of this section:

> **G0 — the em-dash in these sentences is not decoration.** In nine of the eleven it is
> doing the work of *"what follows qualifies the number or the claim before it"*. A rewrite
> may change the connector — to a full stop, a colon, parentheses, a comma, a new sentence,
> a list item — but the **qualifying relationship must remain legible as a qualification**.
> Concretely, forbidden in all eleven: dropping the clause after the dash; demoting it to a
> tooltip, a `title` attribute, a collapsed panel, an `aria-label`, or any surface the user
> must act to open; or moving it away from the number it qualifies.

### 4.1 — `lib/payroll.ts:24` · the RGPS ceiling and the table year (LD8)

```
impact: `INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14% e teto de contribuição em ${formatCurrency(RGPS_CEILING)} — acima disso o desconto trava em ${formatCurrency(TABLE.rgpsCeilingDiscount)} (tabela de ${TABLE.year}).`
```

Renders today as: *"INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14% e teto de
contribuição em R$ 8.475,55 — acima disso o desconto trava em R$ 988,09 (tabela de 2026)."*

**Work the sentence does.** It is the only place the app explains *why* a high salary's INSS
line stops growing. Everything after the dash is the consequence clause: the value the user
will actually see on the screen once their salary crosses the ceiling. Without it the reader
concludes that 14% applies to the whole salary above R$ 8.475,55 — the single most common
error about the RGPS, and one that overstates the discount without bound.

**Binding rule — S1.**

| Must survive | Detail |
|---|---|
| The ceiling figure | R$ 8.475,55, **interpolated from `RGPS_CEILING`**, never typed as a literal. |
| The capped discount | R$ 988,09, **interpolated from `TABLE.rgpsCeilingDiscount`**, never typed as a literal. |
| The year | `2026`, **interpolated from `TABLE.year`**, and it must stay in the same sentence as the two figures (`PRODUCT.md` §4: "the year is part of the answer"). |
| The causal link | The reader must still be able to tell that R$ 988,09 is the consequence of crossing R$ 8.475,55, not an unrelated second number. |
| Progressivity | The word "progressivas" (or an equivalent that says the rate applies per bracket, not to the whole salary) stays. Drop it and the sentence reads as a flat 14%. |

**A rewrite may not:** convert any of the three interpolations into a literal; separate the
year from the figures into a different sentence or a different element; state or imply that
7,5%–14% applies to the whole salary; or drop the ceiling clause on the grounds that the
sentence reads long without it.

**Correction required before or with the rewrite — see F1.** The phrase **"teto de
contribuição"** is wrong for R$ 8.475,55. That figure is the **teto do salário de
contribuição** (the base). The **teto da contribuição** is R$ 988,09 — the other number in
the same sentence. As written, the sentence labels the base as the contribution and then
names the real contribution four words later. The rewrite must say *"teto do salário de
contribuição"* (or *"teto do salário-de-contribuição"*), per Portaria Interministerial
MPS/MF nº 13/2026, art. 2º.

### 4.2 — `lib/compliance.ts:34` · CLT art. 59 and Súmula 376 TST (LD9)

```
"O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST) — a irregularidade está na extrapolação, e a sanção recai sobre o empregador."
```

**Work the sentence does.** It is the app's only defence against the inference a worker
actually draws from "you went over the legal limit": *that the hours past the second are
unpaid, and that the violation is mine*. The clause after the dash allocates the
irregularity and the sanction to the **employer**. Súmula 376, I is what makes that
allocation correct.

**Binding rule — S2.**

| Must survive | Detail |
|---|---|
| The norm, by number | "art. 59 da CLT". |
| The limit | 2 horas por dia, matching `DAILY_OVERTIME_LIMIT_MINUTES = 120`. |
| The súmula, by number | "Súmula 376 do TST". |
| The payment guarantee | **Every** hour worked remains owed. Not "may be owed", not "generally", not "consulte um advogado". Súmula 376, I is categorical and the copy must be too. |
| The allocation | The irregularity and the sanction fall on the **employer**. Not on the worker, not on "the situation", not left unsaid. |

**A rewrite may not:** move the payment guarantee or the allocation clause into a second
paragraph, a tooltip or a collapsed region — both must sit in the same visible block as the
warning title; soften "continuam devidas" into a conditional; make the worker the subject of
the irregularity; or introduce "pode", "talvez", "em tese" anywhere in the guarantee.

**Note for `content-writer`:** this string is the `detail` of a `ComplianceWarning` whose
`title` is *"Você passou de 2h extras hoje"*. The title states the problem; the detail is
the entire mitigation. Their proximity is part of the disclosure.

### 4.3 — `components/organisms/day-summary.tsx:221` · the DSR (LD1)

```
O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês e conta só os
domingos — feriados não entram.
```

See §6.2 for the full ruling. Binding rule **S3**.

### 4.4 — `components/organisms/calculator-views.tsx:79` · the general disclaimer (LD2)

```
Os valores são uma estimativa para você se organizar — não substituem seu holerite nem valem como registro
oficial de ponto, e nada aqui é orientação jurídica ou contábil.
```

See §6.1 for the full ruling. Binding rule **S4**.

### 4.5 — `components/organisms/salary-calculator.tsx:126` · the zero warning (LD3)

```
Sem ele os valores abaixo continuam em R$ 0,00 — e esse zero não é o seu salário, é a falta do dado.
```

**Work the sentence does.** This is not a legal claim; it is a **numeric-integrity
disclosure**, and it is the single most valuable sentence in the salary path. Without a gross
salary the app renders `R$ 0,00` in every downstream field. `R$ 0,00` is a well-formed
currency value that looks exactly like an answer. The clause after the dash is the whole
sentence: it tells the reader that the zero is **absence, not a result**.

This is `PRODUCT.md` §4 "cite or omit" applied to the degenerate case. It is the prose twin
of `MISSING_VALUE` (§5) and it must be read as one obligation with it.

**Binding rule — S5.**

| Must survive | Detail |
|---|---|
| The literal `R$ 0,00` | The user is looking at that exact string on screen; naming it is how they connect the warning to what they see. |
| The negation | The zero **is not** the user's salary. |
| The cause | The zero is the **missing input**, and the remedy is to supply the gross salary. |

**A rewrite may not:** keep only the first half ("Sem ele os valores abaixo continuam em
R$ 0,00.") — that sentence, alone, still lets the reader treat the zero as a computed
result; replace the negation with a positive instruction ("Informe o salário bruto") without
also saying the zero is not an answer; or move the warning away from the fields showing the
zeroes.

### 4.6 — `components/organisms/salary-calculator.tsx:34` · `MISSING_VALUE` (LD4)

```
const MISSING_VALUE = "—";
```

See §5. Binding rule **S6**.

### 4.7 — `lib/structured-data.ts:27` · JSON-LD `name` (LD5)

```
name: `WorkLoad — ${VIEW_HEADINGS[view]}`,
```

Emits, for the `work` view, *"WorkLoad — Calculadora de jornada de trabalho, horas extras e
banco de horas"*; for `salary`, *"WorkLoad — Calculadora de valor da hora e salário líquido
CLT"*.

**Work the string does.** It is a `schema.org/WebApplication` `name` inside the JSON-LD graph
— machine-read by crawlers, surfaced in search results, and therefore a **public product
claim** in exactly the sense of `PRODUCT.md` §9, not a decoration.

**Binding rule — S7.** The em-dash here is a **brand-plus-descriptor separator**, not a
qualifier. It carries no legal work, and replacing it with any separator that keeps brand and
descriptor distinguishable (a colon, a pipe, a comma) is a free copy decision.

Two constraints, both independent of the punctuation:

1. The descriptor may claim only what §9 backs. For `work` it currently does not — **B1**.
2. The `salary` descriptor, *"Calculadora de valor da hora e salário líquido CLT"*, is
   **cleared**: the app computes the hourly rate (`grossHourlyRate`) and a net salary from
   the RGPS and IRRF tables of `lib/legal-tables.ts`, and "CLT" correctly scopes it away from
   the estatutário path, which is disclaimed separately at `calculator-views.tsx:86-87`.

### 4.8–4.11 — the four `alt` exports (LD6)

```
app/opengraph-image.tsx:3        export const alt = "WorkLoad — calculadora de jornada, horas extras e banco de horas";
app/twitter-image.tsx:3          export const alt = "WorkLoad — calculadora de jornada, horas extras e banco de horas";
app/custo-da-hora/opengraph-image.tsx:3   export const alt = "WorkLoad — calculadora de valor da hora e salário líquido CLT";
app/custo-da-hora/twitter-image.tsx:3     export const alt = "WorkLoad — calculadora de valor da hora e salário líquido CLT";
```

**Binding rule — S8.** Identical to S7 and for the same reason: `alt` is read by assistive
technology and indexed by crawlers, so it is a public claim; the dash is a separator carrying
no legal work; the descriptor is bound by §9.

- The two `custo-da-hora` strings are **cleared** for rewrite, punctuation only.
- The two root strings are **blocked by B1** until the "banco de horas" claim is ruled on.
- The two pairs must stay **identical to each other** after the rewrite (`opengraph` and
  `twitter` are the same image with the same alt); a rewrite that diverges them is a defect.

---

## 5. `MISSING_VALUE` — the ruling (LD4)

**It is not a legal statement. It is a legally load-bearing UI placeholder, and it is bound.**

`MISSING_VALUE` is rendered at `components/organisms/salary-calculator.tsx:222`:

```
value={hasMonthlyHours ? formatCurrency(stats.periodValue) : MISSING_VALUE}
```

It occupies the slot where a **currency amount** would otherwise appear, in a numeric field,
in the same visual role as a real figure. The question LD4 asks — copy decision or legally
bound string — has a clear answer: **bound**, because what it must communicate is
`PRODUCT.md` §4 "cite or omit" in its purest form. There is no traceable number here, so the
app must show **no number**, and must show it in a way that cannot be mistaken for one.

**Binding rule — S6. What the replacement must communicate:**

> **There is no computable value here** — because an input is missing, not because the value
> is zero, and not because the value is small.

**Hard prohibitions.** The replacement may not:

| Forbidden | Why |
|---|---|
| `R$ 0,00`, `0`, `0,00`, `-` used as a minus sign, or any digit | A zero in a money slot is read as an amount. This is the exact failure §4.5 exists to warn about. |
| A currency symbol with nothing after it (`R$`, `R$ —`) | Reads as an amount the renderer failed to print, which invites the reader to supply one. |
| `N/A`, `n/d`, `null`, `undefined`, `NaN`, `--`, `...` | Either English (violates `PRODUCT.md` §7) or developer artefacts. |
| Any *estimate*, *approximation*, or "cerca de" | `PRODUCT.md` §4: cite or omit. |
| An empty string | An empty numeric cell reads as a rendering bug and gives the screen-reader user nothing at all. |

**Requirements.** The replacement must:

1. Be **non-numeric and non-currency** at a glance, at the smallest size the app renders a figure.
2. Be **pt-BR** if it contains words.
3. Carry an **accessible equivalent**. A bare glyph (`—`, `–`, `•`, `∅`) is announced
   inconsistently or not at all by screen readers, so the current `—` already fails here.
   The replacement must expose a text alternative that says the value is unavailable —
   the simplest compliant form is a short pt-BR word or phrase rather than a glyph.
4. Remain **visually distinct** from every real value in the same column, in both themes.

**Recommended form, for `content-writer` and `product-designer` to settle at G3/G4:** a short
pt-BR phrase in the field's own voice, e.g. *"informe a carga horária"* or *"sem carga
horária"*, which satisfies 1–4 at once and points at the remedy. A typographic glyph
satisfies 1 and 4 only, and needs an explicit accessible name bolted on.

**Not a legal disclosure in itself:** `MISSING_VALUE` does not have to *cite* anything.
It has to refuse to assert. That is the whole obligation.

---

## 6. The two disclaimers

### 6.1 — `calculator-views.tsx:79` — the general disclaimer (LD2, rule S4)

**Verbatim today:**

> *"Os valores são uma estimativa para você se organizar — não substituem seu holerite nem
> valem como registro oficial de ponto, e nada aqui é orientação jurídica ou contábil."*

**What it discloses — four distinct things, all load-bearing:**

| # | Disclosure | Why it is there |
|---|---|---|
| D1 | The figures are an **estimate**, for the user's own organisation | The computation omits variables a real payslip includes — the very list the next paragraph enumerates. |
| D2 | They **do not replace the holerite** | The employer's payslip governs; a discrepancy is not evidence the app is right. |
| D3 | They **are not an official ponto record** | The app is not a registro de ponto under CLT art. 74 §2º and Portaria MTP nº 671/2021. A user who believes otherwise may rely on it in a dispute. This is the sharpest of the four. |
| D4 | Nothing here is **legal or accounting advice** | The app names norms and súmulas by number; without D4 that reads as counsel. |

**Binding rule — S4.** All four survive, in the same visible paragraph, in the page footer,
with no interaction required to reveal any of them. The em-dash separates D1 from D2–D4; a
full stop, a colon or a split into two sentences is fine. What is not fine:

- Dropping D3 because "não valem como registro oficial de ponto" reads long without the dash.
  D3 is the disclosure with the highest consequence and the lowest reader attention.
- Weakening "não substituem" into "podem não substituir", or "nada aqui é" into "nada aqui
  pretende ser".
- Splitting D1–D4 across paragraphs in a way that separates the estimate framing (D1) from
  the three things it is not.
- Moving any of the four out of the footer into a modal, an accordion, or a `title`.

**The paragraph immediately below (`calculator-views.tsx:83-88`) is not in scope** — it
carries no em-dash — but it is the `PRODUCT.md` §4 "name the gap" list (FGTS, convenção
coletiva, 13º, terço de férias, INSS/IRRF sobre extras, prorrogação noturna / Súmula 60,
feriados, intervalo suprimido, insalubridade, periculosidade, RPPS estadual/municipal). **It
may not be touched, shortened, or merged into the rewritten D1–D4 paragraph.** If a type swap
makes the footer feel heavy, the layout yields, not the list.

### 6.2 — `day-summary.tsx:221` — the DSR disclosure (LD1, rule S3)

**Verbatim today:**

> *"O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês
> e conta só os domingos — feriados não entram."*

**What the code actually does.** Verified line by line:

- `day-summary.tsx:118` → `restDayPayOnOvertime(variablePay, splitMonthDays(new Date(times.entry)))`
- `lib/weekly-rest.ts:10-15` → `splitMonthDays` walks every day of the reference month and
  counts `restDays` as the days where `getDay() === 0`, i.e. **Sundays only**. `workingDays`
  is every other day, **Saturdays included**.
- `lib/weekly-rest.ts:18-21` → `(overtimeAmount / workingDays) * restDays`.

**Ruling on the two assumptions the sentence names:**

| Claim in the copy | Verified? |
|---|---|
| "conta só os domingos" | **Correct and material.** Lei nº 605/1949, art. 1º puts feriados in the repouso base alongside domingos. Counting only Sundays understates `restDays`, so the figure shown is a **floor**: the user's real DSR is this or more, never less. Súmula 172 requires the reflection; it does not authorise dropping feriados from the base. |
| "supõe que estes extras se repitam em todos os dias úteis do mês" | **Correct.** The panel is a single day. Dividing that day's `variablePay` by the month's `workingDays` and multiplying by `restDays` yields the DSR *attributable to this one day* only under the assumption that the day is representative of every working day in the month. Stated plainly, the assumption matches the formula. |
| "habitualidade" (implied) | **Adequately covered** by "se repitam em todos os dias úteis do mês", which is a stronger statement than Súmula 172's "habitualmente prestadas". A rewrite may not weaken it to "podem se repetir": the number on screen is only defensible under the strong reading. |

**Binding rule — S3.** Both assumptions survive, both in the same visible caption, directly
below the `DSR sobre os extras` row it qualifies. Specifically:

| Must survive | Detail |
|---|---|
| The súmula, by number | "Súmula 172 do TST". |
| Assumption 1 | The extras are assumed to repeat on **every working day of the month**. |
| Assumption 2 | The count includes **only Sundays**. |
| Assumption 2's consequence | **Feriados are not counted.** This is the clause after the em-dash and the one at risk. It is not a stylistic flourish on "só os domingos" — it is the named gap, and a reader who does not know Lei 605/1949 art. 1º cannot infer it from "só os domingos". |

**A rewrite may not:** drop "feriados não entram" as redundant with "só os domingos"; make the
caption conditional on user interaction; move it away from the DSR row; or reverse the
direction of the gap (the shown value is a **floor**, never a ceiling — copy that implies the
real DSR could be lower is wrong).

**Finding attached — F2.** The base passed to `restDayPayOnOvertime` at `day-summary.tsx:118`
is `firstTierPay + extraTierPay + nightPay` — it includes the **adicional noturno**, not only
horas extras. Súmula 172 speaks only of horas extras; the night premium's reflection into the
repouso rests on Lei nº 605/1949, art. 7º, "a" and settled case law, not on Súmula 172.
Citing Súmula 172 alone for a base that includes the adicional noturno is an under-citation.
The *number* is defensible; the *citation* is incomplete. Not caused by this spec, and fixing
it changes the sentence's content rather than its punctuation — routed to `tech-lead` as a
follow-up, **not** a G2 blocker and **not** something `content-writer` should invent at G4.

---

## 7. Findings this spec did not cause

Raised because I was reading these strings closely, as instructed. Each is an instruction to
`tech-lead`, never an edit by me.

| # | Severity | Where | What is wrong | What the norm requires | Routing |
|---|---|---|---|---|---|
| F1 | **major** | `lib/payroll.ts:24` | Calls R$ 8.475,55 the *"teto de contribuição"*. It is the **teto do salário de contribuição** (the base). The teto da contribuição is R$ 988,09, named four words later in the same sentence. | Portaria Interministerial MPS/MF nº 13/2026, art. 2º distinguishes salário-de-contribuição from contribuição. | Fix **with** the S1 rewrite. The string is already being edited; this costs nothing extra. |
| F2 | major | `day-summary.tsx:118` + `:219-222` | The DSR base includes `nightPay`; the caption cites only Súmula 172, which covers horas extras. | Lei nº 605/1949, art. 7º, "a" is the basis for the adicional noturno's reflection into the repouso. | `tech-lead`, follow-up spec. Content change, not punctuation. Do **not** let G4 improvise a citation. |
| F3 | **major** | `calculator-views.tsx:90-99` | The footer reads *"Tabelas de INSS e IRRF de 2026, em vigor desde 01/01/2026 · Portaria Interministerial MPS/MF nº 13, de 09/01/2026"*, crediting **one** norm for **two** tables. The Portaria sets the RGPS table only. The 2026 IRRF rules come from **Lei nº 15.270/2025** (R6). The app names the wrong norm for half of what it cites. | `PRODUCT.md` §4: the app names *the* table it used. `AGENTS.md` §8: every legal constant carries its source. | `tech-lead`, follow-up spec. Requires `lib/legal-tables.ts` to carry a source per table, which this spec forbids touching. |
| F4 | major | `lib/legal-tables.ts:47` | `sourceUrl` is `https://www.legisweb.com.br/legislacao/?id=489284` — a commercial aggregator — and `calculator-views.tsx:92` renders it to the user as **the** link behind the norm's name. | `AGENTS.md` §8 and this role's bar: primary source, preferring planalto / in.gov.br / gov.br. A primary URL exists: `https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf`. | `tech-lead`, same follow-up spec as F3. Both live in the one-file-diff registry. |
| F5 | minor | `lib/payroll.ts:24` | `"alíquotas progressivas de 7,5% a 14%"` is a hand-typed restatement of `rgpsBrackets[0].rate` and `rgpsBrackets[3].rate`. It is correct for 2026, and it will silently go stale the year a rate moves — the exact drift the year-indexed registry exists to prevent. | `PRODUCT.md` §3: a yearly change must be a one-file diff. | `tech-lead`. Derive the span from `TABLE.rgpsBrackets` or accept and record. Not a blocker: the figures are right today. |
| F6 | minor | `salary-calculator.tsx:34` | The current `MISSING_VALUE = "—"` has no accessible name. A screen reader announces a bare em-dash inconsistently or silently, so a blind user gets **nothing** where a sighted user gets "no value". | Independent of the em-dash ban; §5 requirement 3 fixes it as a side effect. | Closed by S6 at G4/G5. |

**F3 and F4 together are a `PRODUCT.md` §4 defect on the product's central promise**: the one
line in the whole app whose job is to say *which table, which year, which norm, here is the
link* names the wrong norm for the IRRF and links a paywalled reseller for the INSS. They do
not block this spec — neither string carries an em-dash and both require the forbidden file —
but they should be the next spec, ahead of any further cosmetic work.

---

## 8. LD7 — no number changes

Confirmed by construction, and the constraint is stated here so G6 can check it mechanically.

Of the eleven strings, **none participates in a computation**:

| String | Role |
|---|---|
| `payroll.ts:24` | `WORK_REGIMEINFO[].impact` — display prose. Read by `RegimeField`; never by `contributionFor` or any bracket walk. |
| `compliance.ts:34` | `ComplianceWarning.detail` — display prose. The threshold is `DAILY_OVERTIME_LIMIT_MINUTES = 120` at `:7`, a separate constant the spec does not touch. |
| `day-summary.tsx:221`, `calculator-views.tsx:79`, `salary-calculator.tsx:126` | Static JSX text nodes. |
| `salary-calculator.tsx:34` | A render-time placeholder on the **false** branch of `hasMonthlyHours`. When a value exists it is never reached. |
| `structured-data.ts:27`, the four `alt` exports | Metadata. Not rendered into any calculator surface. |

**Binding constraint for G5 and G6:** every interpolation in `payroll.ts:24`
(`formatCurrency(RGPS_CEILING)`, `formatCurrency(TABLE.rgpsCeilingDiscount)`, `TABLE.year`)
stays an interpolation. The moment one becomes a literal, the year-indexed registry stops
being a one-file diff and LD7 is broken — not by a changed number, but by a number that will
fail to change.

**Test G6 will run:** `pnpm test` green with coverage unchanged, and no snapshot of a computed
value different from run 1 (AC15). If any table-derived figure moved, this gate was violated.

---

## 9. Disclaimers the app must show

Unchanged in substance by this spec. Restated so G6 has a checklist, and so a rewrite that
quietly drops one is visible.

| Where | What the user is told | Why |
|---|---|---|
| `calculator-views.tsx:79` (footer) | D1–D4 of §6.1, verbatim in meaning | Estimate / not the holerite / not a ponto record (CLT art. 74 §2º) / not legal or accounting advice |
| `calculator-views.tsx:83-88` (footer) | The full "name the gap" list — **not in scope, not to be touched** | `PRODUCT.md` §4 |
| `calculator-views.tsx:90-99` (footer) | The table year, its vigência and its norm | `PRODUCT.md` §4 "the year is part of the answer" — currently defective, F3 + F4 |
| `day-summary.tsx:219-222` (DSR row caption) | Both assumptions of §6.2, including "feriados não entram" | Lei nº 605/1949, art. 1º; Súmula 172 do TST |
| `salary-calculator.tsx:126` (banner) | `R$ 0,00` is absence, not a result | `PRODUCT.md` §4 "cite or omit" |
| `salary-calculator.tsx:222` (`MISSING_VALUE`) | No computable value, non-numeric, with an accessible equivalent | Same |
| `lib/payroll.ts:24` / `:31` (regime helper) | The RGPS ceiling and its capped discount with the table year; the RPPS scope limit | Portaria Interministerial MPS/MF nº 13/2026 |
| `lib/compliance.ts:34` (warning) | Every hour is owed; the irregularity is the employer's | CLT art. 59; Súmula 376, I, do TST |

**Every one of these must be visible without interaction.** A disclosure behind a disclosure
toggle is not a disclosure. This is the specific thing G6 will check on the rendered screen,
and G9 on the deployed preview, in both themes.

---

## 10. Out of scope

Binding on every downstream agent. An agent that computes or restates something listed here
has broken this gate.

| Excluded | Why | What the user sees instead |
|---|---|---|
| Any rate, bracket, ceiling, divisor, reduced hour or rounding step | The spec forbids it and no string in scope depends on one changing | Identical numbers to run 1 (AC15) |
| `lib/legal-tables.ts` | Spec § Out of scope, explicitly | Unchanged citation, defects F3/F4 carried to a follow-up spec |
| Re-deriving the 2026 IRRF table, the simplified deduction, the dependent deduction or the Lei 15.270/2025 redutor coefficients | No string in scope asserts them; the file is untouchable here | Unchanged |
| Inventing a new citation, súmula or article in any rewritten string | `content-writer` writes wording, never law. F2's missing citation is a `tech-lead` item. | Only the norms already cited |
| Adding, removing or relocating a disclaimer | §9 | All eight disclosures, in place |
| Typography, icons, `100dvh`, LCP, bundle size, contrast, the dials | Not a legal question | — |

---

## 11. Known imprecisions

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|
| The DSR counts only domingos, not feriados (Lei nº 605/1949, art. 1º) | The DSR shown is a **floor**; the real amount is equal or higher | Not formally accepted — **disclosed** at `day-summary.tsx:221`, which is why S3 is binding | Pre-existing, run 1 |
| The DSR base includes the adicional noturno but cites only Súmula 172 (F2) | None on the number; the citation is incomplete | Pending — `tech-lead` follow-up | Raised run 2 |
| The footer credits the RGPS Portaria for the IRRF table (F3) and links a commercial aggregator (F4) | None on the number; the citation is wrong and non-primary | Pending — `tech-lead` follow-up, ahead of further cosmetic work | Raised run 2 |
| "banco de horas" claimed in seven locations (C1–C7), with no accumulation in the code | Not a number — a feature claim (CLT art. 59 §§2º, 5º e 6º) | **RESOLVED, not accepted: the claim is dropped** (`product-manager`, run 2). Recorded as an explicit non-claim in `PRODUCT.md` §9. See §14. | Raised run 1, closed run 2 |
| `lib/night-shift.ts` omits the prorrogação da jornada noturna após as 5h (CLT art. 73 §5º; Súmula 60, II do TST) | The adicional noturno shown is a **floor** when the journey crosses 05:00 | Not formally accepted — **disclosed** at `calculator-views.tsx:83-88`. S9.2 ties the descriptor permission to that disclosure. | Pre-existing, recorded run 2 |

---

## 12. Legal-dependency coverage

| LD | Settled in | Verdict |
|---|---|---|
| LD1 — `day-summary.tsx:221` | §6.2, rule S3 | settled; assumptions verified against `lib/weekly-rest.ts` |
| LD2 — `calculator-views.tsx:79` | §6.1, rule S4 | settled; four disclosures D1–D4 named |
| LD3 — `salary-calculator.tsx:126` | §4.5, rule S5 | settled; numeric-integrity disclosure, not a legal claim |
| LD4 — `MISSING_VALUE` | §5, rule S6 | settled; **legally bound placeholder**, not a free copy decision |
| LD5 — JSON-LD `name` | §4.7, rule S7 | `salary` cleared; `work` **blocked by B1** |
| LD6 — the four `alt` | §4.8, rule S8 | the two `custo-da-hora` cleared; the two root **blocked by B1** |
| LD7 — no number changes | §8 | confirmed, with the interpolation constraint |
| LD8 — `payroll.ts:24` | §4.1, rule S1 | settled, with correction F1 required in the same edit |
| LD9 — `compliance.ts:34` | §4.2, rule S2 | settled; Súmula 376, I verified verbatim |
| LD10 — the "banco de horas" claim (run 2) | §14, rule S9 | settled; surface = C1–C7 exactly, descriptor backed with two narrowings |
| LD11 — `payroll.ts:24` naming (run 2) | §15, rule S10 | settled; "teto do salário de contribuição", figure and year re-verified against the DOU text |

---

## 13. Open questions for the human

1. ~~**B1.** Does WorkLoad claim "banco de horas"?~~ **ANSWERED at run 2** by
   `product-manager`: the claim is dropped from all seven locations and recorded as an explicit
   non-claim in `PRODUCT.md` §9. No question remains for the human. See §14.
2. **F3 + F4.** These are defects on the product's central promise, in the one line that
   exists to keep it. Should the next spec fix the citation registry before any further
   cosmetic pass? That is a scheduling call and therefore not mine.
3. ~~**planalto.gov.br was unreachable from this session**~~ **DISCHARGED at run 2.**
   planalto.gov.br answered (HTTP 200) and CLT art. 59 *caput* and §§2º, 5º e 6º were read
   verbatim from the primary text (§14.1) — the *caput* confirms the two-hour limit behind
   `DAILY_OVERTIME_LIMIT_MINUTES = 120`, unchanged. The Portaria Interministerial MPS/MF nº
   13/2026 was also read in full from the **DOU permalink** (§15.1), which is machine-readable
   where the gov.br PDF is a scan; arts. 2º and 7º and Anexos II and III match
   `lib/legal-tables.ts` to the centavo. **Still outstanding:** Lei nº 605/1949, art. 1º was
   not re-fetched at run 2 and remains verified through agreeing secondary reproductions. It
   governs S3 ("feriados não entram") and its text has not changed since 1949; re-read it at
   G6 from `https://www.planalto.gov.br/ccivil_03/leis/l0605.htm`, which is now reachable.

---

## 14. LD10 — the "banco de horas" claim: removal surface and replacement descriptor (run 2)

**Settled. Binding rule S9.** This section closes B1.

### 14.1 The norm, read from the primary text this session

| | |
|---|---|
| Norm | Decreto-Lei nº 5.452/1943 (CLT), art. 59, §§ 2º, 5º e 6º |
| Redaction | §2º: Medida Provisória nº 2.164-41/2001. §§5º e 6º: Lei nº 13.467/2017, art. 1º |
| Effective from | §2º: 2001-08-27. §§5º e 6º: 2017-11-11 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |
| Read | **Primary, verbatim, in this session.** planalto.gov.br answered at run 2 (HTTP 200, 3.53 MB), discharging the run-1 unreachability note. |

Verbatim:

> **§ 2º** *"Poderá ser dispensado o acréscimo de salário se, por força de acordo ou convenção
> coletiva de trabalho, o excesso de horas em um dia for compensado pela correspondente
> diminuição em outro dia, de maneira que não exceda, no período máximo de um ano, à soma das
> jornadas semanais de trabalho previstas, nem seja ultrapassado o limite máximo de dez horas
> diárias."*
>
> **§ 5º** *"O banco de horas de que trata o § 2º deste artigo poderá ser pactuado por acordo
> individual escrito, desde que a compensação ocorra no período máximo de seis meses."*
>
> **§ 6º** *"É lícito o regime de compensação de jornada estabelecido por acordo individual,
> tácito ou escrito, para a compensação no mesmo mês."*

**§5º is the paragraph that names the instrument literally.** The three together give it its
whole content: an **accrual** across days, a **settlement window** (one year by norma coletiva,
six months by acordo individual escrito, the same month by acordo individual tácito), and a
**pactuação**. WorkLoad implements none of the three. `hooks/use-work-calculator.ts:67` computes
`balance = breakdown.workedMinutes - breakdown.expectedMinutes` — one day, subtracted, never
stored. There is no second day anywhere in the data flow.

The citation `PRODUCT.md` §9 uses for the non-claim — **CLT art. 59 §§2º, 5º e 6º** — is
**correct and complete**. It names the paragraph that creates the instrument (§5º), the one it
refers back to (§2º) and the lighter regime that would otherwise be confused with it (§6º).
Verified against the text above. No correction required.

### 14.2 The removal surface — re-grepped, not taken on trust

Re-run at run 2 from the working tree (lesson 001), repo-wide and case-insensitive, excluding
`.git`, `node_modules`, `coverage/` (build artefact, regenerates) and `.specs/`:

```
app/page.tsx:6                        title.absolute                      (C1)
app/page.tsx:11                       openGraph.title                     (C2)
app/opengraph-image.tsx:3             alt                                 (C3)
app/twitter-image.tsx:3               alt                                 (C4)
lib/og-image.tsx:14                   OG_CONTENT.work.title               (C5)
lib/calculator-view.ts:9              VIEW_HEADINGS.work                  (C6)
__tests__/app-header.test.tsx:12      HEADING const                       (C7)
__tests__/page.test.tsx:33            title.absolute assertion            (C7)
__tests__/page.test.tsx:38            openGraph.title assertion           (C7)
__tests__/calculator-page.test.tsx:39 JSON-LD name assertion              (C7)
PRODUCT.md:124                        the non-claim row itself            (not a location)
```

**The spec's C1–C7 is the full surface. Confirmed — nothing is missing and nothing is spurious.**

Three negative results worth recording, because they are the places a reviewer would expect a
miss and there is none:

| Checked | Result |
|---|---|
| `app/manifest.ts` | Does not carry the claim. Its `name` is *"WorkLoad - Calculadora de Horas"* and its `description` *"Calcule sua jornada de trabalho de forma simples e intuitiva."* — both already within the permission. **Not a C-location. Do not edit it.** |
| `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `public/**` | No occurrence. |
| `README.md` | No occurrence. |

**`lib/structured-data.ts:27` is confirmed out.** Read at run 2: it is
`name: \`WorkLoad — ${VIEW_HEADINGS[view]}\``. It interpolates C6 and inherits the correction
whole. The spec is right that an edit there is a defect — it would create two sources of truth
for one claim. (Its own em-dash is still in scope under S7; that is a separate, punctuation-only
edit and it must not touch the interpolation.)

### 14.3 The replacement descriptor, checked against the code

The permission the `product-manager` granted — *"the day's jornada (entrada, saída projetada,
tempo decorrido), horas extras, adicional noturno, and the **saldo do dia** — each stated as
belonging to a single day"* — was verified item by item against the modules that compute it.

| Descriptor item | Computed by | Verdict |
|---|---|---|
| jornada do dia (entrada, saída projetada, tempo decorrido) | `lib/day-breakdown.ts:74-113` — `buildDayBreakdown` returns `workedMinutes`, `expectedMinutes`, `remainingMinutes`, `isInProgress`; rendered at `day-summary.tsx:155-170` | **Backed.** |
| horas extras | `lib/day-breakdown.ts:104` — `overtimeMinutes = max(0, workedMinutes − expectedMinutes)`; split into two tiers and rendered at `day-summary.tsx:176-196` | **Backed.** |
| adicional noturno | `lib/night-shift.ts` — 22:00–05:00 window, 52min30s hora ficta, 20%; rendered unconditionally at `day-summary.tsx:198-208` | **Backed, with one narrowing — see 14.4.** |
| saldo do dia | `hooks/use-work-calculator.ts:67`, rendered at `day-summary.tsx:172` under the literal label *"Saldo do dia"* | **Backed, with one narrowing — see 14.4.** |

Nothing in the permission overstates what ships. The two narrowings below tighten *how* two of
the four may be worded; neither removes an item.

### 14.4 Binding rule — S9

**S9.1 — the day scope must be lexically attached to "saldo", not merely implied.**

The permission says "each stated as belonging to a single day", and AC21's grep forbids
`saldo do mês`, `saldo mensal`, `acúmulo`, `acumul` and `banco`. It does **not** catch a bare
**"saldo de horas"** — and "saldo de horas" is the ordinary colloquial name for the banco de
horas. A descriptor reading *"Calculadora de jornada, horas extras e saldo de horas"* passes
every AC as written and re-makes the claim in a softer register.

> Therefore: wherever the word **saldo** appears in a `work` descriptor (C1–C6), it must be
> **immediately followed by a day-scoping term** — `do dia`, `diário`, `de hoje`. No
> intervening noun. A day scope stated earlier in the string, or in a sibling item, does not
> satisfy this: the reader who skims a SERP title reads the last noun phrase.

Mechanically checkable, in the same shape as AC21, and G6 will run it:
`grep -rniE 'saldo(?! (do dia|diário|de hoje))'` over the five descriptor files must return
nothing.

**S9.2 — "adicional noturno" may be named, but never qualified as complete.**

`lib/night-shift.ts` implements CLT art. 73 *caput* (20%), §1º (52min30s) and §2º (22:00–05:00).
It does **not** implement §5º / **Súmula 60, II do TST** — the prorrogação of the night journey
past 05:00, which keeps the adicional. `countNightMinutes` computes pure overlap with the
window and stops at 05:00. That gap is **already disclosed**, verbatim, in the "name the gap"
paragraph at `components/organisms/calculator-views.tsx:83-88`:

> *"...a prorrogação da jornada noturna depois das 5h (Súmula 60 do TST)..."*

Under `PRODUCT.md` §4 a named gap is compliant, so naming "adicional noturno" in a descriptor
is **permitted**. But the permission is **tied to that disclosure**, and the tie must be on the
record, because the descriptor sits in a SERP title and the disclosure sits in a footer three
screens below it. Therefore:

| | |
|---|---|
| Permitted | Naming `adicional noturno`, with or without the `20%`, with or without `art. 73 da CLT`. |
| Forbidden | Any completeness qualifier on it — `completo`, `com todos os adicionais`, `todas as regras da CLT`, `todos os casos`, `qualquer jornada noturna`. |
| Forbidden | Naming `Súmula 60`, `prorrogação` or `prorrogação noturna` in a descriptor. The app does not compute it; a descriptor that names it claims it. |
| Conditional | If a later spec removes or weakens the Súmula 60 clause at `calculator-views.tsx:83-88`, this permission lapses and the descriptor must be re-settled. §6.1 already freezes that paragraph under S4; this records *why* the descriptor depends on it. |

**S9.3 — no substitute for the retired claim.** The descriptor may not name, in any inflection:
`banco de horas`, `banco`, `compensação`, `compensar`, `horas a compensar`, `acúmulo`,
`acumulado`, `crédito de horas`, `débito de horas`, `saldo do mês`, `saldo mensal`, `histórico`,
`ponto`, `registro de ponto`, `controle de ponto`, `folha de ponto`, `espelho de ponto`.

The first group names CLT art. 59 §§2º/5º/6º by synonym. The `ponto` group is barred by two
things at once: `PRODUCT.md` §7 refuses the feature, and disclosure **D3** (§6.1 of this
document) states outright that the app *"não vale como registro oficial de ponto"* under
CLT art. 74 §2º and Portaria MTP nº 671/2021. A descriptor that says `ponto` and a footer that
says `não é ponto` is a contradiction the crawler reads first.

**S9.4 — the four public descriptors must not diverge, and C5 may only narrow.**

AC22 already requires C3, C4 and C6 to be identical in descriptor. **C5 (`lib/og-image.tsx:14`)
is not in that four-way diff and must be**, with one relaxation: it is rendered *into* the OG
bitmap and is shorter by design, so it may be a **strict subset** of C3/C4 — it may drop an
item, never add or broaden one. A user with images disabled, and every crawler, gets C3/C4 as
the alternative text for the very bitmap C5 renders; if C5 claims more than its own `alt`, the
`alt` stops being an equivalent.

If length forces a cut in C5, **cut the whole `saldo` item — never the words `do dia`.**
`"Jornada, horas extras e adicional noturno"` is compliant. `"Jornada, horas extras e saldo"`
is not.

**S9.5 — C7 moves with C1–C6, and no assertion is deleted.** Not a legal rule; recorded because
AC24 exists and because a green suite bought by a deleted `expect()` is how a claim quietly
survives its own removal.

### 14.5 `PRODUCT.md` §9 — the new rows, audited

**The Evidence row: accurate in substance, imprecise in citation.**

> *"The app computes a **single day's** jornada: horas extras, adicional noturno and the saldo
> of that day | `components/organisms/day-summary.tsx` renders `stats.balance` for one day;
> nothing in `lib/` carries a balance across days"*

The claim is **true** and each of its three items is backed (14.3). The evidence cell, however,
cites the **render** site and not the site that **proves** the claim. `day-summary.tsx` receives
`balanceMinutes` as a prop; it cannot demonstrate the single-day scope on its own. The line that
does is `hooks/use-work-calculator.ts:67`:

```
balance: breakdown.workedMinutes - breakdown.expectedMinutes,
```

— one day's worked minutes minus that same day's expected minutes, with no accumulator on
either side. **Binding: the evidence cell must cite `hooks/use-work-calculator.ts:67` as well as
the render site.** `PRODUCT.md` §9 is the claim table, and a claim table whose evidence column
points at a display is one refactor away from pointing at nothing. This is a one-line edit to
`PRODUCT.md`, owned by `product-manager`; it does not bounce the gate.

(The cell's second clause, *"nothing in `lib/` carries a balance across days"*, is true and in
fact understated: `grep -rn "balance" lib/` returns **nothing at all**. No correction needed.)

**The non-claim row: accurate. No correction.** The legal instrument is stated correctly
(CLT art. 59 §§2º, 5º e 6º — verified verbatim at 14.1), the reason is the right one (no
accumulation), the `PRODUCT.md` §7 collision is real, and the unlock sequence is named in the
right order (human amends §7 → spec → code → words). This is the record that stops the next
well-meaning agent restoring the claim, and it is fit for that purpose.

---

## 15. LD11 / F1 — `teto de contribuição` is the wrong name for R$ 8.475,55 (run 2)

**Settled. Binding rule S10.** S10 governs the same string as S1 (`lib/payroll.ts:24`) and does
not replace it: **both apply to the one rewrite.** S1 says what must survive; S10 says what must
change.

### 15.1 The norm, read from the primary text this session

| | |
|---|---|
| Norm | Portaria Interministerial MPS/MF nº 13, de 9 de janeiro de 2026 |
| Articles | art. 2º (limites do salário de contribuição); art. 7º + **Anexo II** (tabela progressiva do segurado empregado, doméstico e avulso); **Anexo III** (RPPS da União) |
| Effective from | 2026-01-01 |
| Published | DOU de 2026-01-12, Seção 1 |
| Superseded by | in force |
| Primary source | https://www.in.gov.br/web/dou/-/portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603 |
| Read | **Primary, verbatim, in this session.** The DOU permalink returned the full machine-readable text (HTTP 200). The gov.br PDF is still a scanned image (`pdftotext` → 4 bytes), which is why run 1 had to fall back to an aggregator. |

**Art. 2º, verbatim:**

> *"O salário de benefício e o salário de contribuição, a partir de 1º de janeiro de 2026, não
> poderão ser inferiores a R$ 1.621,00 (mil seiscentos e vinte e um reais) nem superiores a
> R$ 8.475,55 (oito mil quatrocentos e setenta e cinco reais e cinquenta e cinco centavos)."*

**Art. 7º, verbatim:**

> *"A contribuição dos segurados empregados, inclusive do doméstico e do trabalhador avulso,
> relativamente aos fatos geradores que ocorrerem a partir da competência janeiro de 2026, será
> calculada mediante a aplicação da correspondente alíquota sobre o salário de contribuição
> mensal, de forma progressiva, de acordo com a tabela constante do Anexo II, desta Portaria."*

**Anexo II, verbatim** — *"TABELA DE CONTRIBUIÇÃO DOS SEGURADOS EMPREGADO, EMPREGADO DOMÉSTICO E
TRABALHADOR AVULSO, PARA PAGAMENTO DE REMUNERAÇÃO A PARTIR DE 1º DE JANEIRO DE 2026 —
SALÁRIO-DE-CONTRIBUIÇÃO (R$) / ALÍQUOTA PROGRESSIVA PARA FINS DE RECOLHIMENTO AO INSS"*:

| Salário-de-contribuição (R$) | Alíquota |
|---|---|
| até 1.621,00 | 7,5% |
| de 1.621,01 até 2.902,84 | 9% |
| de 2.902,85 até 4.354,27 | 12% |
| de 4.354,28 até 8.475,55 | 14% |

**Anexo III, verbatim** (RPPS da União — *"BASE DE CONTRIBUIÇÃO (R$) / ALÍQUOTA PROGRESSIVA
INCIDINDO SOBRE A FAIXA DE VALORES"*): the four brackets above, then
`de 8.475,56 até 14.514,30 — 14,5%`, `de 14.514,31 até 29.028,57 — 16,5%`,
`de 29.028,58 até 56.605,73 — 19%`, `acima de 56.605,73 — 22%`.

**Agreement with the code — re-checked digit by digit at run 2, against the primary text this
time rather than against an aggregator:**

| `lib/legal-tables.ts` | Value | Anexo | Verdict |
|---|---|---|---|
| `RGPS_BRACKETS_2026` `:36-41` | `1621.0/.075`, `2902.84/.09`, `4354.27/.12`, `8475.55/.14` | II | **match** |
| `rppsFederalBrackets` `:50-56` | RGPS four, then `14514.3/.145`, `29028.57/.165`, `56605.73/.19`, `+∞/.22` | III | **match** |
| `rgpsCeilingDiscount` `:49` | `988.09` | derived, §3 of this document | **match** (re-derived, closes to the centavo) |
| `year` `:44` / `effectiveFrom` `:45` | `2026` / `"2026-01-01"` | art. 2º, art. 7º | **match** |

No divergence. §3 of this document stands, now on a primary reading.

### 15.2 Why the current string is wrong

`lib/payroll.ts:24`, verbatim today:

```
impact: `INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14% e teto de contribuição em ${formatCurrency(RGPS_CEILING)} — acima disso o desconto trava em ${formatCurrency(TABLE.rgpsCeilingDiscount)} (tabela de ${TABLE.year}).`
```

It renders: *"...e teto de **contribuição** em R$ 8.475,55 — acima disso o desconto trava em
R$ 988,09..."*

The Portaria distinguishes two things and the string collapses them:

| The norm's term | The figure | What it is |
|---|---|---|
| **salário de contribuição** (art. 2º; Anexo II header: *salário-de-contribuição*) | **R$ 8.475,55** | The **base** — the maximum remuneration the alíquotas may be applied to. |
| **contribuição** (art. 7º — the result of applying the alíquota to the base) | **R$ 988,09** | The **amount withheld** — the maximum the worker can be discounted. |

So the string labels the **base** as the *contribuição*, and then, nine words later, states the
actual *contribuição* without naming it. A reader who takes the first label literally is told
their maximum INSS discount is R$ 8.475,55 — a figure 8.6× the truth, on a screen whose entire
job is to say what comes off the payslip. The two figures are already adjacent; the sentence
does not lack the information, it misnames it.

### 15.3 Binding rule — S10

**S10 applies together with S1 (§4.1). S1's five "must survive" rows are unchanged and still
binding.** S10 adds:

| # | Requirement |
|---|---|
| S10.1 | The term **"salário de contribuição"** must appear, in that order, immediately governing `${formatCurrency(RGPS_CEILING)}`. The hyphenated form *"salário-de-contribuição"* is equally correct — the Portaria uses the unhyphenated form in art. 2º and the hyphenated one in the Anexo II header. Either is the norm's own word. |
| S10.2 | The word **"teto"** (or `limite máximo`, the art. 2º phrasing) must still attach to R$ 8.475,55. The correction is to *what* the teto is a teto **of** — it is not a licence to drop the ceiling framing, which is what makes the following clause make sense. |
| S10.3 | The bare phrase **"teto de contribuição"** must not appear anywhere in `lib/` — matching AC23. Nor may **"teto do INSS"**, which is the same collapse in colloquial dress. |
| S10.4 | R$ 988,09 must remain legible as **the consequence of crossing** R$ 8.475,55, per S1's "causal link" row. If the rewrite chooses to name it, the correct name is **"teto da contribuição"** or **"desconto máximo"** — naming it is *permitted and encouraged*, not required. |
| S10.5 | The figure **R$ 8.475,55** and the base year **2026** are kept, both **interpolated** (`RGPS_CEILING`, `TABLE.year`), never literals — S1's interpolation constraint and §8 are untouched. No number moves: this is a naming correction, and AC15 must still hold to the centavo. |
| S10.6 | "progressivas" (or an equivalent that says the rate applies **per faixa**, not to the whole salary) stays — S1, restated because art. 7º is explicit that the alíquota applies *"de forma progressiva"*. |

**Worked check for G6.** With the correction applied, the sentence must render so that all four
of these are read off it without inference:

| # | What the reader must get | Value |
|---|---|---|
| 1 | The base the alíquotas stop at | R$ 8.475,55 |
| 2 | What that base **is** | o salário de contribuição — not the contribution |
| 3 | The most that can be withheld | R$ 988,09 |
| 4 | Which year's table produced both | 2026 |

A rendering in which 1 and 3 are both readable as "the contribution" fails S10 regardless of
punctuation. That is the test, not a string comparison.

**A form that satisfies S1 + S10** — offered as a **compliance reference, not as copy**;
`content-writer` owns the pt-BR at G4:

> *"INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. O teto do salário de contribuição
> é R$ 8.475,55: acima disso o desconto trava em R$ 988,09 (tabela de 2026)."*

**One note for spec `0003`, not a finding here.** The DOU permalink above is a machine-readable
primary source for this Portaria and is strictly better than both the scanned gov.br PDF and the
`legisweb.com.br` URL that `lib/legal-tables.ts:47` currently ships to the user. That is **F4**,
which is already routed to `.specs/0003-citation-registry/`; the URL is supplied here so 0003
does not have to re-find it. **It is not an edit to make in 0002** — `lib/legal-tables.ts` is out
of scope, and the boundary the `tech-lead` drew holds.

---

## 16. Run-2 verdict

**pass.**

| LD | Settled in | Rule | Verdict |
|---|---|---|---|
| LD10 | §14 | S9.1–S9.5 | settled; removal surface confirmed as exactly C1–C7; descriptor backed, with two narrowings |
| LD11 | §15 | S10.1–S10.6 | settled; term fixed, figure and year re-verified against the primary text |

**What `content-writer` and `product-designer` are bound by at G3/G4:** S1–S8 (run 1, unchanged)
plus **S9** and **S10**. Nothing in this analysis is implied — every obligation either names a
string, names a forbidden word, or names a grep.

**Two things this gate narrowed that the spec did not:**

1. **S9.1** — `saldo` must carry `do dia` / `diário` / `de hoje` as its immediately following
   term. AC21's grep bars `saldo do mês` and `acumul`, but a bare **"saldo de horas"** passes it
   and is the everyday synonym of the claim just retired.
2. **S9.2** — `adicional noturno` may be named but never qualified as complete, because
   `lib/night-shift.ts` omits the prorrogação (Súmula 60, II do TST). The permission is tied to
   the Súmula 60 clause staying in the footer gap list, which S4 already freezes.

**Two corrections that do not bounce the gate,** both one-liners for their owners:

- `PRODUCT.md` §9, new Evidence row: cite `hooks/use-work-calculator.ts:67` alongside the render
  site (§14.5). `product-manager`.
- AC22 should include **C5** in the descriptor diff, as a permitted **subset** of C3/C4 (§S9.4).
  `product-manager` or `tech-lead` at G5, whoever holds the AC table.

If neither is made, G6 checks them from this document anyway, and the finding lands there.
