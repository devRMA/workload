# 0006 — Legal basis

> Owner: labor-law-analyst · Gate: `law` (G2) · Run 1

**Verdict: pass.**

This spec computes nothing, changes no table and touches no string. It moves pixels. I pass it, and
I pass it with two rulings that change what the spec means, neither of which widens its scope:

1. **Three of the five banners are disclosure surfaces in the LR domain — C2, C3 and C5 — and two
   are not — C1 and C4.** The `product-manager` recorded this spec as a pure quality defect on the
   strength of my own `0005` G6 ruling over DS3. That ruling stands for DS3 and does not transfer.
   C5 in particular states rights the app's own computation omits, at the moment the user has just
   crossed the limit that creates them: it is `PRODUCT.md` §4's "name the gap", rendered at the
   point of the gap. **This spec is a compliance defect for C2, C3 and C5, and a quality defect for
   C1 and C4.** §2 gives the test that decides it, so the next agent who adds an `AlertBanner`
   applies it without asking me.
2. **The `product-manager`'s calibration is ratified, and LR2 is corrected rather than softened.**
   The 40-characters-per-line floor is unreachable at 390 for these surfaces, and I prove it in §4
   from measurements rather than from the PM's estimate — it is unreachable *even if the banner
   spanned the entire page width*. But 40 was never a floor on the column; it was a floor on the
   measure, and a measure floor stated without a font size is under-specified in exactly the way
   lesson 023 names. §3 restates LR2 as two clauses, LR2a and LR2b, so it stops being re-derived at
   every gate. **I am not lowering 40.** I am ruling where it binds and requiring the shortfall to
   be reported rather than absorbed, and I am referring the only lever that would close it — the
   type ramp — to the human as an open question (§13).

Two findings fall out that this spec must **not** fix and must not lose: a citation divergence at
`lib/salary-period.ts:40` and `salary-calculator.tsx:151` (§10 X1), and the deferral rule the
defect's production history creates (§5).

---

## 0. Scope of this analysis

### Covered

- Whether each of the five `AlertBanner` consumers C1–C5 is a disclosure surface in the LR domain,
  and the test that decides it for surfaces not yet written (§2).
- The correction of LR2, and where its floor binds (§3, §4).
- Whether the norms C2, C3 and C5 quote say what those banners say they say (§6).
- Whether the defect having shipped to production creates an obligation beyond the fix (§5).
- L1–L6 of `spec.md` § Legal dependencies, each answered by name (§11).
- The amendments this gate makes binding on AC3, AC4 and AC7, and the criterion it adds (§10).

### Explicitly not covered

An agent that reads a ruling into this file on any of the following has misread it.

| Not covered | Why |
|---|---|
| Every rate, bracket, ceiling, divisor value and rounding step in `lib/legal-tables.ts`, `payroll.ts`, `night-shift.ts`, `weekly-rest.ts` | Verified digit by digit at `0002` G6 and again by hand at `0005` G9. This spec does not reach them. I opened none of them. |
| CSS mechanics — how the chrome is reclaimed, whether in the atom or its consumers | `tech-lead` at G4. I rule on what must be legible, never on how. |
| `AlertBanner`'s visual identity, its tone colours, its `role`, its icon | `product-designer` at G3, inside `spec.md` § Out of scope. |
| The type ramp and `DESIGN.md`'s scales | Out of this spec's scope and, per §13, a decision for the human rather than for G3. |
| Whether C1 and C4 are worth fixing | They are out of the LR domain, which makes their legibility a quality matter. `product-manager` already scoped them in and I have no objection; I simply do not have a veto over them. |
| The correctness of `lib/compliance.ts`'s trigger conditions — when each warning fires | This spec neither opens that file nor changes when a banner appears. I verified only what the emitted strings *assert* (§6). |

---

## 1. Rules in play

No labour-law rule is *computed* by this change. Four govern whether disclosures the app already
makes are being made at all.

| # | Rule | Why this change depends on it |
|---|---|---|
| R1 | `PRODUCT.md` §4 — "cite or omit", "name the gap", "the year is part of the answer" | C2 and C3 put a divisor on screen and attribute it to a norm; C5 names rights the app does not compute. All three are §4 obligations discharged by a rendered string. |
| R2 | `PRODUCT.md` §5 — "silence is a defect" | The charter's own standard: when the app cannot answer, it says what is wrong and what to do. C4 and C5 are that sentence. §7 answers whether 24 cpl is closer to silence than to speech. |
| R3 | CDC art. 31 — information must be *ostensiva* | The standard, not a liability finding. Carried unchanged from `.specs/0005-…/legal.md` §1 R2; the reasoning there applies here verbatim and I do not restate it. |
| R4 | LR1, LR2, LR3 — `.specs/0005-…/legal.md` §3 | The binding legibility rules. LR2 is corrected here (§3). LR4 does not apply: no surface in this spec records a choice. |

R3's source and verbatim text are in `.specs/0005-tailwind-theme-collision-and-dark-hydration-hotfix/legal.md` §1.
Sources for the norms C2, C3 and C5 quote are in §6 of this file.

---

## 2. L3 — which of the five banners is a disclosure surface

**This is the ruling with the weight, and the answer is: three of five.** I ruled on what each
instance says, not on the component that renders it. A component is never a disclosure surface; a
rendered string is.

### 2.1 — The test

A rendered string is a **disclosure surface in the LR domain** if **any** of these is true of it.
It is not one if none of them is.

| Clause | The string… | Why this clause exists |
|---|---|---|
| **(a) Cite** | states a number, rate, threshold, divisor or year, or attributes one to a norm. | `PRODUCT.md` §4's "cite or omit". A number the user reads is a number they may act on; if it is unreadable, the app made a claim it did not deliver. |
| **(b) Gap** | names a variable, a right or an amount that the user's real situation includes and this app's computation **does not produce**. | `PRODUCT.md` §4's "name the gap". This is the clause that catches C5 and the one the footer's P3 exists for. |
| **(c) Choice** | records, conditions or solicits a decision the app will store and act on. | LGPD art. 5º XII / 8º §4º. Governs DS4. Nothing in this spec triggers it. |

**What is deliberately outside it:** input validation, empty-state explanations, navigation, and
status text that describes only the app's own UI state. Those surfaces may still be worth fixing —
`PRODUCT.md` §5 makes them a product obligation — but they are not mine to veto, and saying so is
what keeps the veto worth having.

**The test is falsifiable.** Applied to the five, it separates them; applied to the four surfaces
`0005` already named, it returns DS1 (a and b), DS2 (a and b), DS4 (c) and **not** DS3 — which is
the `0005` G6 §6 ruling, reproduced by the test rather than assumed by it. A test that could not
reproduce the ruling it descends from would be a new rule wearing an old name.

### 2.2 — The five, ruled individually

Read from the working tree at `ba94c2d`. Line numbers read from the files, not copied (lesson 007).

| # | Where | What it says | (a) | (b) | (c) | Ruling |
|---|---|---|---|---|---|---|
| **C1** | `salary-calculator.tsx:124-126` — *Informe o seu salário bruto* | "Sem ele os valores abaixo continuam em R$ 0,00. Esse zero não é o seu salário, é a falta do dado." | no | no | no | **Not LR domain.** |
| **C2** | `salary-calculator.tsx:130-139` — *Informe a carga horária mensal* | "Sem ela não dá para saber quanto vale a sua hora. Para a jornada de 8h48 por dia o divisor é 220 horas por mês." | **yes** | no | no | **LR domain → DS5.** |
| **C3** | `salary-calculator.tsx:143-155` — *A carga mensal não combina com a jornada diária* | "Pela Súmula 431 do TST, a jornada que você informou corresponde ao divisor *N* horas por mês, e não *M*. Usar um divisor maior do que o devido reduz o valor de cada hora sua." | **yes** | no | no | **LR domain → DS6.** |
| **C4** | `journey-form.tsx:172-182` — *Confira seus horários*, rendering `issue.message` from `lib/journey.ts:19-36` | "A saída precisa vir depois da volta do almoço." / "Informe uma data e uma hora válidas para a entrada." — eight strings, all of this shape | no | no | no | **Not LR domain.** |
| **C5** | `day-summary.tsx:250-254` — the compliance warnings, `detail` from `lib/compliance.ts:31-66` | four strings citing CLT art. 59, art. 66, art. 71 and art. 71 §1º, and Súmula 376 do TST | **yes** | **yes** | no | **LR domain → DS7.** |

### 2.3 — Why C1 is not, and why that is not a technicality

`R$ 0,00` is not a number this app computed. It is the arithmetic identity of an absent input, and
the sentence exists to say exactly that: *esse zero não é o seu salário, é a falta do dado*. It
attributes nothing to a norm, omits no variable a payslip includes, and stores nothing. Clause (a)
asks whether the string puts a **claim about a quantity** in front of the user; this one withdraws
one. 0002's **S5**, which governs what it must say, is satisfied in full — verified again here,
unchanged since `0005` G9.

Confirming rather than repeating my `0005` G6 §6 ruling: it holds, on a test written afterwards
and without it in view.

### 2.4 — Why C4 is not, and a correction to the brief I was given

I was told C4 "carries legal content". **It does not, and I checked before ruling.** Every string it
can render is in `lib/journey.ts:19-36`, and all eight are of the form *"A saída precisa vir depois
da volta do almoço"* or *"Informe uma data e uma hora válidas para a entrada"*. No norm, no number,
no right, no gap. This is form validation for a chronological ordering the user typed wrong.

It is in scope for the remedy anyway, under `PRODUCT.md` §5 and the `product-manager`'s scoping —
and it should be, because a remedy that reached four of five consumers would be the same defect
this spec exists to repair. But it does **not** carry my veto, and an agent under schedule pressure
must be able to tell which criteria are legally binding and which are the product's own bar. §10
marks each one.

### 2.5 — Why C5 is the sharpest of the five

C5 satisfies both (a) and (b), and (b) is what makes it the surface I would block on if this spec
tried to drop it.

Read what those four strings actually do. `lib/compliance.ts:33`: *"Todas as horas trabalhadas
continuam devidas a você (Súmula 376 do TST). A irregularidade está na extrapolação, e a sanção
recai sobre o empregador."* `:47` and `:56`: *"O tempo suprimido é devido com acréscimo de 50%, de
natureza indenizatória."* `:65`: *"O tempo suprimido costuma ser pago como hora extra."*

Each of those names **an amount owed to the user that this app does not compute**. The footer's
gap-list paragraph (DS1 P3) says so explicitly — *valor do intervalo suprimido* is on it. So C5 is
the same `PRODUCT.md` §4 obligation as DS1 P3, discharged a second time, at the moment it becomes
concrete: the user has just entered a journey that crossed art. 71's minimum, and this is the string
that tells them the suppressed time is owed with a 50% acréscimo. It is 195–247 characters, and at
`0005`'s measured geometry it renders at roughly 24–32 characters per line on a phone.

A gap named where the user cannot read it is the defect `PRODUCT.md` §4's word "visibly" was written
against — and it is lesson 018's pattern recurring on a surface the rule never named, because
`0005`'s DS list was built from what the token collision reached rather than from what the app
discloses. **That is my omission and it is corrected here**: DS5, DS6 and DS7 join the domain, and
they join it whether or not they are broken today (lesson 006).

---

## 3. LR2, corrected

**Binding, and it supersedes LR2 as written at `.specs/0005-…/legal.md` §3 for every surface,
including DS1, DS2 and DS4.** LR1 and LR3 stand unchanged, word for word.

### 3.1 — What was wrong with it

LR2 read `chars / lineBoxes >= 40` with no statement of the font size it assumed. It was calibrated
on 12px caption type, where 358px of column carries ~55 characters, and I wrote the constant without
writing the calibration. A characters-per-line floor is a function of column width **and** font
size; stated as a bare constant it is the same defect as a rate quoted without the base it applies
to — the number is defensible and the rule still comes out wrong when applied to a different base.
This is lesson 023 recurring on the rule lesson 023 was written about, which is why I am fixing the
rule and not the criterion that tripped over it.

A second defect, visible only now that the surfaces are longer: for a short string, cpl is
**quantised**. C1's 97 characters render at 48.5 cpl on two line boxes or 32.3 on three; there is
nothing between. A floor of 40 over a quantity that can only take those two values is a floor on the
line-box count wearing a typographic disguise.

### 3.2 — LR2 as it now reads

> **LR2 — the text must occupy the column available to it, and must reach a readable measure
> wherever the column can carry one.** Two clauses. LR2a carries the substance; LR2b is the
> typographic target.
>
> **LR2a — occupancy. Binding on every disclosure surface, at every viewport and in both themes.**
>
> ```
> bodyText.getBoundingClientRect().width  >=  surfaceRoot.getBoundingClientRect().width - 32
> ```
>
> where `surfaceRoot` is the outermost element the surface renders (for a banner, the `AlertBanner`
> root `<div>`) and `bodyText` is the element that directly contains the disclosure's body text.
> Both are `getBoundingClientRect().width`, the same quantity LR1 reads — one quantity across the
> rule set (lesson 023). The 32 CSS px is a **budget for the surface's own border and horizontal
> padding**, not a legal threshold; a surface may spend less and none may spend more.
>
> **LR2b — measure.**
>
> ```
> textContent.trim().length / lineBoxes  >=  40
> ```
>
> counted by the `0005` §3 method — a `Range` over the element's text content, `getClientRects()`
> deduplicated by rounded `top` — with the single-line-box exemption and its bound as ruled at
> `0005` G6 **B3**.
>
> **LR2b binds at 1440×900 for every disclosure surface.**
>
> **At 390×844, LR2b binds for every surface whose body text has a computed `font-size` ≤ 12px** —
> which is DS1 and DS2, and which is the population LR2's 40 was calibrated on. They pass today at
> 52.4–56.7 and 44.7 and must not regress.
>
> **At 390×844, for a surface whose body text is larger than 12px, LR2b does not bind and its
> measured value is reported as a residual** (§3.3). A surface that *does* reach 40 cpl at 390
> without binding must not fall below it — the exemption may not be spent to lose ground already
> held.

### 3.3 — The residual is reported, never absorbed

Wherever LR2b does not bind, the measured cpl is **reported next to LR2a's numbers**, per surface,
per viewport, per theme, in `reports/qa.md` and in my own `reports/legal.md`. This is not
bookkeeping. It is the record that the obligation is discharged as far as geometry can discharge it
and no further, and it is the input to the one question that could close the remainder — the type
ramp — which §13 puts to the human rather than to G3.

A residual that stops being measured is a residual that stops existing, and the next analyst
re-derives this whole argument from scratch. That is what happened between `0005` §13 and this gate.

---

## 4. Why 40 cpl is unreachable at 390 — the proof, from measurements

The `product-manager` argued this from an estimate of the character width at 14px and from a 310px
card content box. **The conclusion is right and the argument does not need either figure.** I derive
it from measurements I took myself, and it turns out not to depend on the card at all.

### 4.1 — Bounding the character width at 14px, from `0005`'s own measurements

Two measured facts about C1's 97-character string, `text-body-sm` (14px), identical in both themes,
confirmed at G6 and again on the deployed preview at G9:

| Measured | Width | Line boxes |
|---|---|---|
| M1 | 601.33 px | 2 |
| M2 | 242.00 px | 4 |

Let `k` be the CSS pixels a character of this string occupies on average, and `cap(w) = w / k` the
characters a full line of width `w` can carry.

From **M1**: the string fits in 2 boxes, so `cap(601.33) ≥ 97/2 = 48.5`; it did not fit in 1, so
`cap(601.33) < 97`.
From **M2**: it needed 4 boxes, so 3 were insufficient: `cap(242.00) < 97/3 = 32.34`, hence
`cap(601.33) < 32.34 × 601.33/242.00 = 80.35`.

So `cap(601.33) ∈ [48.5, 80.35)`, and therefore **`k ∈ (7.48, 12.40]` CSS px per character.**

### 4.2 — The threshold this puts on the column

For a 97-character string, cpl ≥ 40 requires **at most 2 line boxes**, which requires
`cap(w) ≥ 48.5`, which requires

```
w  ≥  48.5 × k  ≥  48.5 × 7.48  =  363 CSS px
```

taking the **most favourable** end of the bound — the narrowest character, the widest capacity. At
the other end it is 601 px.

### 4.3 — What is available at 390

The widest content column this app offers at a 390 px viewport is **358 px** — measured at `0005`
G6 and G9 as the rendered width of DS1's `<footer>`, which spans the full page content box. Every
banner sits inside a card, so every banner has strictly less.

**358 < 363.** The inequality holds at the most favourable end of the character-width bound, with
no card, no padding and no icon — that is, **C1 cannot reach 40 characters per line at 390 even if
the banner spanned the entire page width and spent zero chrome.** No remedy inside this spec's
scope, and no remedy inside any geometry spec, can close it. The only levers are the font size —
the type ramp, out of scope and a decision for the human — and shortening the text, which
`spec.md` § Non-goals correctly forbids and which would re-publish a reviewed string.

**Ratified.** The `product-manager`'s calibration survives, on a stronger basis than the one it was
written with. AC3 and AC4's split by viewport is correct and is **not** a softening — §3.2 is now
the rule it implements, and §3.3 is the price it pays.

### 4.4 — What this does not license

The same arithmetic run over C5's longer strings does **not** settle them. At 247 characters and
`k ∈ (7.48, 12.40]`, a 358 px column yields between 6 and 9 line boxes — cpl between 27.4 and 41.2.
**40 may be attainable at 390 for C5 and may not be**; the bound is too wide to tell, and I will not
write a number I have not measured. LR2b's non-regression clause in §3.2 covers it either way: if a
C5 banner measures ≥ 40 at 390 on the fixed tree, that value is its floor from then on.

This is why §3.2 states the exemption by **font size** and not by "banners". A blanket exemption for
the component would have thrown away ground C5 might already hold.

---

## 5. The defect shipped to production — what that obliges

At `0005` I ruled nothing was owed to users beyond the fix, and the basis was that `main` had never
carried the defect: the population of affected users was empty. **That basis does not exist here.**
`spec.md` § Why now and `0005` `reports/legal.md` §6.1 establish the opposite — the DS3 subtree
measures 242 px in both `geometry-before.json` and `geometry-after.json`, it never resolved through
the token collision, and it is live.

So the question has to be answered on its merits rather than by the same route. **Ruled: nothing is
owed to users, and no notice is published.** Three reasons, in order of weight:

1. **No number was wrong and no record was created.** Every figure the calculator showed traced to
   the 2026 tables it cites, verified at `0002` G6 and re-verified by hand on the deployed preview
   at `0005` G9. No consent was collected through any of these surfaces. There is no user who acted
   on a false quantity and none whose stored decision is in question — which is the pair of harms
   that would make a notice the remedy.
2. **The text was degraded, never absent, never clipped, never truncated.** LR1 passed on every one
   of these surfaces: 242 px is the full width the element was given, the text wraps completely
   inside its box, and every word is on screen and in the accessibility tree. At 1440 the same
   strings pass LR2b outright. This is prose read badly, not prose withheld — materially different
   from a 64 px column and categorically different from a 24 px consent dialog.
3. **A notice about a defect with no identifiable harm spends the credibility this product's
   positioning is made of.** `PRODUCT.md` §4 is a promise the app keeps by being precise. Announcing
   a legibility regression that misinformed nobody teaches users to discount the next notice, which
   may be about a bracket.

### What the production history *does* oblige — and this is the difference from `0005`

**The deferral now has an expiry, and spending it costs a human signature.**

At `0005` G6 and again at G9 I ruled DS3's LR2 failure a finding rather than a blocker, on an
asymmetry that was sound then: blocking would have left a 64 px `PRODUCT.md` §4 disclosure and an
inoperable consent dialog unrepaired. That trade was paid once. It cannot be paid again, for two
reasons that have both changed since: the surfaces are now ruled to be in the LR domain (§2), and
the spec that repairs them is this one — there is no competing repair whose delay would cost more
than the deferral saves.

> **Binding.** If `0006` ships without DS5, DS6 and DS7 satisfying LR2a, that is a **knowing
> deferral of an LR-domain defect that is live in production**, and it requires the human's written
> acceptance recorded in §12 of this file — the surface, the measured value, the reason, and who
> accepted — before `release-manager` closes G8. It is not waivable by design, scope or schedule
> (`AGENTS.md` §4, rule 8).
>
> The LR2b residual at 390 (§3.3) is **not** covered by this clause: it is reported, not deferred,
> because §4 proves no lever in this spec can close it.

That distinction is the whole of what I am asking for. LR2a is reachable and therefore owed. LR2b at
390 is unreachable and therefore reported and escalated, not quietly accepted.

---

## 6. The norms C2, C3 and C5 quote — verified

I do not certify a string as a disclosure without checking that it says what the norm says. Where a
banner is made *more* prominent, a misattribution is made more prominent with it.

### 6.1 — Source availability, stated honestly

**`planalto.gov.br` was unreachable from this environment for the whole session** — `ECONNRESET` on
every attempt, by `WebFetch` and by `curl` alike, on both `del5452.htm` and
`del5452compilado.htm`. I could not read the CLT from its primary host.

What I used instead, and its limits:

| Source | URL | What it is | Limit |
|---|---|---|---|
| Câmara dos Deputados, *Legislação Informatizada* | https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-publicacaooriginal-1-pe.html | Official federal source; the **publicação original** of Decreto-Lei nº 5.452/1943 | Original 1943 wording. Sound for arts. 64, 66 and 71 *caput*, whose wording is unchanged; **not** sound for art. 59 §1º, whose 20% was superseded by CF art. 7º XVI. I relied on it only for the *caput* of art. 59. |
| TST jurisprudence portal and corroborating reproductions | https://jurisprudencia.tst.jus.br/ | Súmulas 376 and 431, with their Resolução and DEJT | Ementa and text corroborated across independent reproductions; the TST PDF consolidation returned unreadable binary. |

**Consequence, recorded rather than smoothed over:** every norm below is corroborated by at least
two independent sources and none is relied on for a figure this spec introduces — this spec
introduces none. **`tech-lead` and `qa-engineer` do not need these to be re-fetched for `0006`.**
The next spec that legitimately opens `lib/salary-period.ts` or `lib/compliance.ts` **must** re-read
them from `planalto.gov.br` from an environment that can reach it, because §6.4 turns on the exact
scope of a súmula's text.

### 6.2 — C5's citations · **all four correct**

| Norm | Effective | What it requires | What `lib/compliance.ts` says | Verdict |
|---|---|---|---|---|
| **CLT art. 59, *caput*** (Decreto-Lei nº 5.452/1943, wording of Lei nº 13.467/2017) | 1943-05-01; current wording 2017-11-11 | A jornada normal may be increased by *horas suplementares, em número não excedente de duas* | `:32-34` — "O art. 59 da CLT limita a jornada extra a 2 horas por dia." | **correct** |
| **Súmula nº 376, I, do TST** (Res. 129/2005, DJ 20/22/25.04.2005) | 2005-04-20 | *"A limitação legal da jornada suplementar a duas horas diárias não exime o empregador de pagar todas as horas trabalhadas."* | `:33` — "Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST)." | **correct** — near-verbatim |
| **CLT art. 71, §1º** | 1943-05-01 | For trabalho contínuo *não excedente de 6 horas*, an interval of **15 minutos** is obligatory when the duration **exceeds 4 horas** | `:46` — "Jornada acima de 4 horas e de até 6 horas exige um intervalo de no mínimo 15 minutos (art. 71, §1º, da CLT)." | **correct** |
| **CLT art. 71, *caput*** | 1943-05-01 | Trabalho contínuo exceeding 6 horas requires an interval of *no mínimo, de uma hora* | `:55` — "Jornada acima de 6 horas exige no mínimo 1 hora de intervalo (art. 71 da CLT)" | **correct** |
| **CLT art. 71, §4º** (wording of Lei nº 13.467/2017) | 2017-11-11 | Non-concession or partial concession of the minimum interval implies payment **of an indemnificatory nature**, **only of the suppressed period**, with an **acréscimo de 50%** over the hora normal | `:47` and `:56` — "O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória." | **correct** — all three elements present: suppressed period only, 50%, indenizatória |
| **CLT art. 66** | 1943-05-01 | *"Entre duas jornadas de trabalho haverá um período mínimo de onze horas consecutivas para descanso."* | `:64-65` — "O art. 66 da CLT garante no mínimo 11 horas seguidas de descanso entre duas jornadas." | **correct** |

One wording note, not a finding: `:55` adds *"que norma coletiva pode reduzir para 30 minutos"*. The
basis is **CLT art. 611-A, XII** (Lei nº 13.467/2017), which lets a convenção or acordo coletivo
prevail over the law on the intrajornada *"respeitado o limite mínimo de trinta minutos para
jornadas superiores a seis horas"*. The statement is substantively right and does not cite the
article. Naming it would be an improvement; it is **not** required, because the sentence asserts a
possibility rather than a figure the app computes, and because `spec.md` forbids reopening the
string and I decline to force it for a gain this small. Recorded so that the next spec touching
`lib/compliance.ts` can take it.

### 6.3 — C2's and C3's divisor · the arithmetic is right

`lib/salary-period.ts:3-6,41-43`: `coherentMonthlyHours = dailyHours × 5 (dias) × 5 (semanas)`, with
a tolerance of 1 hour before the mismatch banner fires.

- 8h48/dia → 8,8 × 5 × 5 = **220** — matches C2's literal text.
- 8h/dia → 8 × 5 × 5 = **200** — matches Súmula 431 exactly.

Both values are right and neither is introduced by this spec.

### 6.4 — Súmula 431's actual scope · **a divergence, and it is not this spec's to fix**

Verified text:

> **Súmula nº 431 — SALÁRIO-HORA. EMPREGADO SUJEITO AO REGIME GERAL DE TRABALHO (ART. 58, CAPUT,
> DA CLT). 40 HORAS SEMANAIS. CÁLCULO. APLICAÇÃO DO DIVISOR 200** (redação alterada na sessão do
> Tribunal Pleno realizada em 14.09.2012) — Res. 185/2012, DEJT divulgado em 25, 26 e 27.09.2012.
> *Para os empregados a que alude o artigo 58, caput, da CLT, quando sujeitos a 40 horas semanais de
> trabalho, aplica-se o divisor 200 (duzentos) para o cálculo do valor do salário-hora.*

Its text covers **one case**: 40 horas semanais → divisor 200. It does not state a general
`semanal × 5` rule and it does not mention 220. The basis usually given for the 220 divisor on a
44-hour week is **CLT art. 64** together with **CF art. 7º, XIII**, and art. 64's own literal
arithmetic (`30 × horas diárias`) yields 240 rather than 220 for an 8-hour day — the 220 figure
comes from a settled practice whose primary derivation I **could not establish from a primary source
in this session** (§6.1).

Two consequences:

- `components/organisms/salary-calculator.tsx:151` opens with *"Pela Súmula 431 do TST"* and then
  states a divisor for **whatever jornada the user typed**. For a 40-hour week that is exact; for
  every other jornada the súmula named does not, by its own text, cover the case.
- `lib/salary-period.ts:40` carries the same over-extension in its source comment: *"Súmula 431 do
  TST: o divisor mensal é a jornada semanal x 5 (44h/semana = 220, 40h/semana = 200)."* Under
  `AGENTS.md` §8, that comment **is** the constant's citation.

**Ruled: a real finding, medium severity, and it does not block `0006`.** The reasoning, stated so
it is not mistaken for indulgence:

1. The **number** is not in question. 220 for 44h and 200 for 40h are correct and universally
   applied; what is imprecise is the **norm cited for the general rule**.
2. Repairing it requires editing a user-visible string and a `lib/` comment. `spec.md` forbids both,
   absolutely and for good reasons (§ Out of scope, "The words" and "`lib/`"). I could override the
   first — I am the only gate that can — and I decline: a width spec that reopens a reviewed
   sentence is a legal change wearing a CSS diff, which is the exact failure `spec.md` L1 protects
   against, and the repair needs a primary source I could not reach today.
3. Making C3 legible does not make the imprecision worse in any way that matters. The substantive
   content — *your divisor is larger than your jornada implies, which understates every hour you
   are paid for* — is correct, useful, and currently rendered at 24–32 characters per line. A
   correct warning read clearly beats a correct warning read badly.

**Owner: `product-manager`, in the next spec that legitimately opens `lib/salary-period.ts`.** It
joins `0005` G9-F2 (the `lib/legal-tables.ts:48` aggregator URL) on the list of citation defects
waiting for a spec with the right scope. Recorded in §10 as **X1**.

---

## 7. L5 — is 24 characters per line closer to silence than to speech?

`spec.md` asks this as the charter half of L3, and it deserves a direct answer rather than a
rhetorical one.

**For C5: yes, and that is the finding.** A 247-character paragraph rendered over 8 or 9 line boxes
in a 242 px column, appearing below a summary panel the user has just scrolled past, on a phone, in
a ten-second first contact, is a paragraph that is skipped. `PRODUCT.md` §5's *"silence is a
defect"* sets the standard as *saying what is wrong and what to do* — and the app's own
justification for C5's existence is that the user should learn the suppressed interval is owed to
them with a 50% acréscimo. Emitted and skipped discharges that no better than not emitted.

**For C1: no.** Four line boxes of a 97-character sentence, sitting directly above the fields
showing the zeros it explains, in a `role="alert"` container with a bold title, is narrow prose in
the right place. It reads badly. It is not silence. This is the same distinction §5 draws between
degraded and withheld, and it is why C1 is a quality defect and C5 is a compliance one.

The honest boundary: I cannot give a cpl number at which speech becomes silence, and I will not
invent one. What decides it is what the string is *for* — which is the test in §2.1 — and the
length over which the reader has to sustain attention. That is why §3.2's floor is stated as
occupancy of the available column rather than as a universal cpl constant: occupancy is the quantity
the product actually controls.

---

## 8. Tables

**None.** This spec introduces, alters, reads and removes no table, bracket, rate, ceiling, parcela
a deduzir or divisor value. `lib/legal-tables.ts` is not opened by this spec and must not be. The
2026 RGPS, RPPS, IRRF and Lei nº 15.270/2025 values stand exactly as settled in
`.specs/0002-design-taste-preflight/legal.md` §§3, 7 and 8, verified digit by digit at `0002` G6 and
by hand on the deployed preview at `0005` G9.

The `AGENTS.md` §5 rebuild contract is discharged for those tables by `0002`'s `legal.md`. Nothing
in this file is needed to reconstruct them.

## 9. Worked examples and rounding

### 9.1 — Worked example E1: the LR2a budget, on the surface that defines the defect

| | |
|---|---|
| Surface | DS3 / C1 — `components/organisms/salary-calculator.tsx:124-126`, at 390×844 |
| Input | `AlertBanner` root rendered width **W**; body `<p>` rendered width **B**; both `getBoundingClientRect().width` |
| Measured today | B = **242.00 px**; the atom spends 2 px border + 32 px `p-4` + 20 px icon + 12 px gap ≈ 66 px, so W ≈ **308 px** — to be **confirmed at G6 by measuring W directly**, never by arithmetic on the class list |
| LR2a requires | B ≥ W − 32 |
| Today | 242.00 ≥ 308 − 32 = 276 → **false. Fails by ~34 px.** |
| After a conforming remedy | B ≥ 276 with W unchanged |
| Residual LR2b at 390 (§3.3) | 97 chars at B = 276 px and k ∈ (7.48, 12.40] → 3 or 4 line boxes → cpl between **24.3 and 32.3**, below 40, **reported not enforced** per §3.2 and §4 |
| Rule | LR2a, LR2b |

W is stated here as a derived figure and marked as such deliberately. **G6 measures it.** Lesson 023:
a threshold calibrated against arithmetic on a token value rather than against a reading of the
intended state is how the last one went wrong.

### 9.2 — Worked example E2: the residual, at the viewport where the floor binds

| | |
|---|---|
| Surface | DS3 / C1, at 1440×900 |
| Measured today | B = **601.33 px**, 97 chars, 2 line boxes, cpl **48.5** |
| LR2b requires | cpl ≥ 40 → **passes today** |
| After the remedy | B increases; line boxes cannot increase; cpl cannot fall below 48.5 |
| Rule | LR2b — this is the non-regression half of AC3 |

### 9.3 — Rounding

| Quantity | Unit | Direction | Applied at | Source |
|---|---|---|---|---|
| Rendered width (LR1, LR2a) | CSS px | **none** — compare the raw float against the floor, so that `275.9 px` fails `≥ 276` | at comparison only | project convention, `.specs/0005-…/legal.md` §8 |
| Line-box `top`, for deduplication | CSS px | round to nearest integer | when deduplicating `getClientRects()` | `.specs/0005-…/legal.md` §3, LR2 method, unchanged |
| Characters per line box (LR2b) | chars | **none** — carry full precision; report to one decimal | at comparison and in the report | project convention |
| Character count | chars | `textContent.trim().length`, no normalisation of whitespace runs | before division | `.specs/0005-…/legal.md` §3, unchanged |

No quantity in this spec is monetary or temporal. Nothing here rounds a centavo.

---

## 10. Divergences from the code, and amendments to the criteria

None of these is an edit by me. Each is an instruction, to the named gate.

### 10.1 — Divergences

| # | File and line | What the code does | What is required | Severity | Owner |
|---|---|---|---|---|---|
| **D1** | `components/atoms/alert-banner.tsx:22-27` via C2 (`salary-calculator.tsx:130`), C3 (`:143`), C5 (`day-summary.tsx:251`) | The atom spends ~66 px of horizontal chrome inside its containing block, collapsing the body text column of three LR-domain disclosure surfaces | **LR2a** (§3.2) on DS5, DS6, DS7 | **high** — LR-domain, live in production, and §5's deferral clause attaches to it | `tech-lead` at G4 |
| **D2** | Same, via C1 and C4 | Same geometry, on two surfaces that are **not** LR domain | `PRODUCT.md` §5 and the `product-manager`'s scoping. **Not a legal requirement and not covered by my veto.** | quality | `product-manager` / `tech-lead` |
| **X1** | `lib/salary-period.ts:40` and `components/organisms/salary-calculator.tsx:151` | Both attribute a general `jornada semanal × 5` divisor rule to Súmula 431 do TST, whose text covers only 40 horas semanais → divisor 200 (§6.4) | The comment and the string name the norm that actually supports the general rule, or restrict the attribution to the 40h case | **medium** — correct number, over-extended citation; `AGENTS.md` §8 | `product-manager`, in the next spec that opens `lib/salary-period.ts`. **Explicitly not `0006`.** |

### 10.2 — Amendments to `spec.md`'s acceptance criteria · **binding, applied before G3 opens**

| # | Criterion | Amendment |
|---|---|---|
| **A1** | **AC3** | Restate its floor as **LR2b** per §3.2, not as "LR2". Unchanged in substance at 1440. Add the non-regression clause: any surface measuring ≥ 40 cpl at **390** on the fixed tree has that value as its floor thereafter (§3.2, §4.4). |
| **A2** | **AC4** | Restate the comparison as LR2a's, on **one quantity**: `bodyText.getBoundingClientRect().width ≥ surfaceRoot.getBoundingClientRect().width − 32`, where `surfaceRoot` is the `AlertBanner` root `<div>`. AC4 currently compares a text column against *"the content-box width of the banner's containing block"* — two different box models in one inequality, which is precisely the defect lesson 023 was written about, and which cost `0005` a routed blocker (B2). Both sides are bounding rects. |
| **A3** | **AC4** | Mark it as **legally binding for C2, C3 and C5** and as a product criterion for C1 and C4 (§2, §10.1 D1/D2). The measurement is identical; the consequence of failing is not, and an agent at G7 must be able to tell them apart. |
| **A4** | **new AC11** | For every consumer C1–C5, at **390×844** in both themes, the measured cpl is **reported** in `reports/qa.md` alongside LR2a's two widths, whether or not LR2b binds there. §3.3. A residual that is not written down is a residual that disappears. |
| **A5** | **AC7** | Extend its "no user-visible string changes" to name `lib/compliance.ts:31-66` and `lib/journey.ts:19-36` as the origins of C5's and C4's text, so the `git diff` check covers the files the strings actually live in rather than only the components that render them. As written it already forbids opening `compliance.ts`; `journey.ts` is not named. |
| **A6** | **AC2** | Unchanged and reinforced: the instrument must be seen **red** on the unfixed tree. Extend the naming requirement from C1 to **at least one of C5's banners**, because C5 is the LR-domain surface and an assertion never seen red over an LR-domain surface proves nothing about it (lesson 012, lesson 016). |

Note on A2 and the `−32` budget: `product-designer` at G3 may spend **less** than 32 px and may not
spend more. Whether that is bought by stacking the icon, shrinking it, or changing the padding is
`product-designer`'s and `tech-lead`'s, and I take no position — §0 says so.

---

## 11. `spec.md` § Legal dependencies, answered by name

| # | Dependency | Ruling |
|---|---|---|
| **L1** | Do LR1, LR2, LR3 bind C1–C5, and under which box model? | **LR1 and LR3 bind all five, unchanged, reading `getBoundingClientRect().width`.** LR2 is **corrected** into LR2a and LR2b (§3.2), both reading `getBoundingClientRect().width`, one quantity across the rule set. LR4 does not apply: no surface here records a choice. |
| **L2** | Does the `0005` G6 ruling on DS3 still hold — quality defect or compliance one? | **It holds for DS3/C1, and it does not transfer.** §2.3 reproduces it from a test written independently of it. **This spec is a compliance defect for C2, C3 and C5** and a quality defect for C1 and C4. The severity moves; the scope does not. |
| **L3** | Is a banner that quotes a norm a disclosure surface in the LR domain? | **Not because it quotes a norm — because of what it says.** The three-clause test is §2.1. It returns **yes for C2, C3 and C5** (now DS5, DS6, DS7) and **no for C1 and C4**. C4 quotes no norm at all, contrary to the framing I was given (§2.4). |
| **L4** | Is rule **S5** untouched, and can a geometry-only change violate it? | **Untouched, and it cannot.** S5 governs what C1 must say — the literal `R$ 0,00`, the negation, the cause, positioned above the fields showing the zeros. Re-checked against the current string (§2.3); satisfied in full, as at `0005` G6 §8 and G9. A change that moves no character cannot violate a rule about characters. AC7 is what keeps that true. |
| **L5** | Is 24 cpl closer to silence than to speech, by `PRODUCT.md` §5's standard? | **For C5, yes. For C1, no.** §7. |
| **L6** | Does the 40 cpl floor transfer to a 14 px surface? | **No, and the floor is not lowered.** It was calibrated on 12 px and stated without its calibration (§3.1). LR2b now names the font size it binds at (§3.2); §4 proves 40 is unreachable at 390 for C1 **even at full page width**, from measurements rather than estimates. The `product-manager`'s calibration is **ratified**. The shortfall is reported (§3.3) and escalated to the human (§13), not absorbed. |

---

## 12. Known imprecisions

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|

Empty. None introduced, none accepted, none outstanding.

**This table is where §5's deferral clause is discharged if it is ever invoked.** If `0006` ships
with DS5, DS6 or DS7 failing LR2a, the row goes here — the surface, the measured LR2a values, the
reason, and the human who accepted it — before G8 closes. `release-manager` reads this table.

---

## 13. Open questions for the human

**Q1 — the 14 px residual, and the only lever that closes it.**

At 390×844, the banner body renders at `text-body-sm` (14 px). §4 proves that no geometry change can
bring a 97-character string to 40 characters per line at that viewport — the requirement is ≥ 363 px
of column and the app's widest content column at 390 is 358 px. The remaining levers are exactly
two, and both are outside every gate downstream of this one:

1. **Reduce the disclosure body type on small viewports** — a `DESIGN.md` type-ramp change, which
   `spec.md` § Out of scope correctly routes to the human before G3, not to `product-designer`.
2. **Accept that disclosure prose on a 390 px phone runs at ~24–32 characters per line** and treat
   LR2a — full occupancy of the available column — as the whole of the obligation at that viewport.

**My recommendation is (2), and I am not neutral about why.** Reducing the type would trade one
legibility defect for another, on the same users, and the residual it would buy is a typographic
target rather than a norm — `.specs/0005-…/legal.md` §13 said so when the number was set and it is
still true. But the choice is the human's, this is the second gate at which it has surfaced, and it
will surface at every gate that measures a disclosure until it is written down. **Deciding it once,
either way, retires the question.**

**Q2 — X1, the Súmula 431 attribution** (§6.4). Not blocking and not `0006`'s. Recorded here so the
human sees it rather than discovering it in a report: the divisor **numbers** are right; the norm
cited for the *general* rule covers only the 40-hour case. It needs a spec with the scope to open
`lib/salary-period.ts` and an environment that can reach `planalto.gov.br` — which this one could
not (§6.1).

---

## 14. Out of scope

Binding on every downstream agent. An agent that rules on something listed here has broken this gate.

| Excluded | Why | What the user sees instead |
|---|---|---|
| Every rate, bracket, ceiling, divisor value and rounding step in `lib/` | Verified at `0002` G6 and `0005` G9; untouched here (§8) | Unchanged figures |
| Every user-visible string, including all four of C5's `detail` texts and all eight of C4's | A width fix that rewords a disclosure is a legal change wearing a CSS diff (`spec.md` L1, AC7, amended by A5) | Unchanged text |
| X1's repair — the Súmula 431 attribution | Requires opening a string and a `lib/` comment, both forbidden here, and a primary source unreachable this session (§6.4, §13 Q2) | Unchanged text |
| CSS mechanics; where the remedy lives | `tech-lead` at G4 | — |
| `AlertBanner`'s visual identity, tone, `role`, icon, radius, elevation | `product-designer` at G3, bounded by `spec.md` | — |
| The type ramp | The human, before G3 (§13 Q1) | — |
| LR4 and the consent surfaces | No surface in this spec records a choice; DS4 is protected by AC6 | — |
