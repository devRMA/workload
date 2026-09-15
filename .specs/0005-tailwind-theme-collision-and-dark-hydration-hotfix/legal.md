# 0005 — Legal basis

> Owner: labor-law-analyst · Gate: `law` (G2) · Run 1

**Verdict: pass.**

This spec changes no number, no rate, no bracket, no ceiling, no divisor, no rounding step and no
user-visible string. I verified nothing arithmetic here; the tables were verified digit by digit at
0002 G6 and this spec does not reach `lib/`. What I ruled on is narrower and is the only legal
question the defect raises: **whether a disclosure the product is obliged to make is actually being
made when it renders as a 64-pixel column.**

It is not. The obligation in `PRODUCT.md` §4 is discharged by a disclosure being *read*, not by it
being present in the DOM. §3 below turns "visibly" into a rule a reviewer can measure instead of
judge, and the acceptance criteria of this spec are to be written against it.

The pass is not "nothing to see here". It is: the spec's scope, as written, is sufficient to
discharge the obligation, provided AC2/AC3 are raised to meet rules **LR1–LR4**. No new rule, table
or threshold is required, and I am not asking for one.

---

## 0. Scope of this analysis

### Covered

- The four disclosure surfaces the collision reaches or could reach, and what each one discloses
  (§2).
- Whether rules **S3**, **S4** and **S5** from `.specs/0002-design-taste-preflight/legal.md` are
  satisfied *in substance* when their text renders at 64px (§2.5).
- The binding legibility rule — what "visibly" must mean, measurably, for a disclosure (§3).
- The consent dialog at `components/organisms/cookie-consent.tsx:85`, and whether it is materially
  different from an informational disclosure (§4).
- Whether the defect's history in the repository creates any obligation beyond fixing it (§5).

### Explicitly not covered

State this as a boundary, not as a courtesy: an agent that reads a ruling into this file on any of
the following has misread it.

| Not covered | Why |
|---|---|
| The Tailwind `--spacing-*` / `--container-*` token resolution mechanism | Settled by `tech-lead` by compiling Tailwind 4.3.3 (`STATUS.md` § D1, lesson 017). I do not rule on CSS. |
| The choice between deleting the named scale and renaming it | Architecture. `tech-lead`'s call; ratified by `product-designer` at G3. |
| The spacing-scale migration itself, its 204-odd edit sites, and `DESIGN.md` §§393-559 | Same. |
| D2, the React #418 hydration mismatch | It changes no number and no disclosure. A re-render flash is a hygiene defect, not a legal one. I take no position on `app-header.tsx:66`. |
| Any implementation of the legibility rule | I state what must be legible. Where the assertion lives, and how, is `tech-lead`'s at G4. |
| Every rate, bracket, ceiling and rounding step in `lib/` | Verified at 0002 G6; untouched here (spec L3, AC11). Re-verifying them would be work this spec did not create. |

---

## 1. Rules in play

No labour-law rule is *computed* by this change. Three norms govern whether the disclosures this
app already makes are being made at all, and they are what §3 and §4 are built on.

| # | Rule | Why this change depends on it |
|---|---|---|
| R1 | `PRODUCT.md` §4 — "cite or omit" / "name the gap" | The product's own binding promise: where the computation omits a variable a real payslip includes, the app says so *visibly*. The footer is where it says so. |
| R2 | CDC art. 31 and art. 54 §4º — information must be *ostensiva*, and a clause limiting the consumer's rights must be written *com destaque, permitindo sua imediata e fácil compreensão* | The disclaimer at `calculator-views.tsx:76-79` is exactly such a limitation: it tells the user the figures do not bind, do not replace the holerite and are not a ponto record. "Destaque" is the statutory word for what a 64px column is the opposite of. |
| R3 | LGPD art. 5º XII, art. 6º VI, art. 8º §4º and art. 9º | The consent dialog is where the user gives or withholds consent for telemetry. Consent must be *informada*, referred to *finalidades determinadas*, and the information supporting it must be *clara, adequada e ostensiva*. |

### R1 — `PRODUCT.md` §4

| | |
|---|---|
| Norm | Project charter, `PRODUCT.md` §4 |
| Effective from | 2026-09-14 (current revision) |
| Source | `PRODUCT.md` §4, in this repository |

Every number the app shows traces to a norm in force and the app says which; where the computation
omits a variable the user's real payslip includes, the app names the gap. Both halves of this are
discharged by the footer of `calculator-views.tsx` and nowhere else — the gap list is in it, and so
is the table-year-and-source citation. A footer nobody can read discharges neither half.

### R2 — Código de Defesa do Consumidor

| | |
|---|---|
| Norm | Lei nº 8.078, de 11 de setembro de 1990 |
| Article | art. 31, *caput*; art. 46; art. 54 §4º |
| Effective from | 1991-03-11 (art. 118); these articles in force, original wording |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm |

Verbatim, from the compiled text:

> **Art. 31.** A oferta e apresentação de produtos ou serviços devem assegurar informações
> corretas, claras, precisas, **ostensivas** e em língua portuguesa sobre suas características […]

> **Art. 46.** Os contratos que regulam as relações de consumo não obrigarão os consumidores, se
> não lhes for dada a oportunidade de tomar conhecimento prévio de seu conteúdo, ou se os
> respectivos instrumentos forem **redigidos de modo a dificultar a compreensão** de seu sentido e
> alcance.

> **Art. 54 § 4°** As cláusulas que implicarem limitação de direito do consumidor deverão ser
> redigidas **com destaque, permitindo sua imediata e fácil compreensão**.

I am not claiming WorkLoad is a contrato de adesão, and this analysis does not need it to be — the
app is free, stores nothing on a server and creates no obligation on the user. The relevance is the
**standard**: Brazilian law, where it regulates a disclaimer at all, regulates it by whether it can
be apprehended, not by whether it was emitted. That is the same standard `PRODUCT.md` §4 sets for
itself, and it is the standard §3 makes measurable. Treat R2 as the analogy that fixes the bar, not
as a liability finding.

### R3 — LGPD

| | |
|---|---|
| Norm | Lei nº 13.709, de 14 de agosto de 2018 (LGPD) |
| Article | art. 5º, XII; art. 6º, VI; art. 8º, §3º e §4º; art. 9º, *caput* |
| Effective from | 2020-09-18 (vigência geral, Lei nº 14.058/2020); sanções administrativas desde 2021-08-01 |
| Superseded by | in force |
| Source | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm |

Verbatim:

> **Art. 5º XII** - consentimento: manifestação **livre, informada e inequívoca** pela qual o
> titular concorda com o tratamento de seus dados pessoais para uma **finalidade determinada**;

> **Art. 6º VI** - transparência: garantia, aos titulares, de informações **claras, precisas e
> facilmente acessíveis** sobre a realização do tratamento e os respectivos agentes de tratamento
> […]

> **Art. 8º § 3º** É vedado o tratamento de dados pessoais mediante **vício de consentimento**.
> **§ 4º** O consentimento deverá referir-se a **finalidades determinadas**, e as autorizações
> genéricas para o tratamento de dados pessoais **serão nulas**.

> **Art. 9º** O titular tem direito ao acesso facilitado às informações sobre o tratamento de seus
> dados, que deverão ser disponibilizadas de forma **clara, adequada e ostensiva** […]

Mapping onto this feature: the banner at `cookie-consent.tsx:44` offers the binary choice and is
**not** affected by the collision (`max-w-4xl`, no `--spacing-4xl` exists — spec § Out of scope
already flags it so nobody "fixes" it). The **granular** choice — the per-purpose toggles, which is
what art. 8º §4º is about — lives behind *Configurar*, in the dialog at `cookie-consent.tsx:85`,
which the collision reduces to `--spacing-lg` = 1.5rem = **24px**. See §4.

---

## 2. The disclosure surfaces

Four surfaces, read from the working tree at commit `366eab5`, with their current line numbers read
from the file (lesson 007 — a line copied from an earlier artifact is a string never opened).

### 2.1 — `components/organisms/calculator-views.tsx:73` — the footer · **AFFECTED, 64px**

`<footer className="mx-auto mt-2xl max-w-3xl …">`, resolving `max-w-3xl` → `--spacing-3xl` =
4rem = **64px**. Four paragraphs, all four load-bearing:

| ¶ | Line | What the user is told | What they would wrongly conclude if they never read it |
|---|---|---|---|
| P1 | 74-77 | Everything typed stays in this browser; nothing is sent to any server. | That their salary and their horários were uploaded somewhere. This is the only place the app makes the privacy claim outside the consent banner. |
| P2 | 78-81 | The figures are an **estimate** (D1); they **do not replace the holerite** (D2); they are **not an official ponto record** (D3); nothing here is **legal or accounting advice** (D4). | That the number is their payslip. D3 is the sharpest: a user who believes this is a registro de ponto may rely on it in a dispute, against an employer whose art. 74 §2º record is the one that counts. |
| P3 | 82-88 | The gap list: FGTS, benefícios e adicionais da convenção coletiva, 13º, terço de férias, INSS/IRRF sobre as horas extras, prorrogação noturna após as 5h (Súmula 60 TST), feriados, valor do intervalo suprimido, insalubridade, periculosidade, and that Estatutário uses the **federal** RPPS table only. | That the app computed a complete líquido. Every item on this list moves the real figure, most of them upward. This paragraph **is** `PRODUCT.md` §4's "name the gap"; there is no second copy of it. |
| P4 | 89-100 | The INSS and IRRF tables are those of `CURRENT_LEGAL_YEAR.year`, in force since `effectiveFrom`, with a link to the official source. | That the figures come from an unstated year. This paragraph **is** `PRODUCT.md` §4's "cite the table" — the traceability the whole product rests on, rendered at 64px alongside everything else. |

P3 and P4 are the ones that make this a legal defect rather than a typographic one. P2 can be
guessed at by a sceptical reader; **a gap list and a source citation cannot be guessed at at all.**

### 2.2 — `components/organisms/day-summary.tsx:233-236` — the DSR caption · **not affected**

> *"O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês e
> conta só os domingos. Feriados não entram."*

Renders inside the day-summary panel, which carries no colliding utility. Rule **S3** is satisfied:
the súmula is named by number, both assumptions survive, and "Feriados não entram" sits in the same
visible caption directly below the `DSR sobre os extras` row it qualifies. The em-dash became a full
stop at 0002 G4, which S3 permits. **No action.**

### 2.3 — `components/organisms/salary-calculator.tsx:125` — the zero warning · **not affected**

> *"Sem ele os valores abaixo continuam em R$ 0,00. Esse zero não é o seu salário, é a falta do
> dado."*

Renders inside `AlertBanner`, no colliding utility. Rule **S5** is satisfied: the literal `R$ 0,00`
survives, the negation survives, the cause survives, and it sits above the fields showing the
zeroes. **No action.**

### 2.4 — `components/organisms/cookie-consent.tsx:85` — the privacy settings dialog · **AFFECTED, ~24px**

`max-w-lg` → `--spacing-lg` = 1.5rem = **24px**. Ruled on separately in §4.

Also noted, and **not** a disclosure: `components/organisms/journey-form.tsx:238`, the *Resetar os
horários?* confirmation, `max-w-md` → `--spacing-md` = 1rem = **16px**. It destroys user-entered
data on confirm. That is a safety defect and `product-designer`'s and `qa-engineer`'s to weigh; it
carries no legal claim and I make no ruling on it beyond noting that it is inside AC3 already.

### 2.5 — Are S3, S4 and S5 satisfied *in substance* at 64px?

This is the question I was asked and it deserves a direct answer.

**S3 and S5: yes.** Neither surface is inside a collapsed container. I opened both and re-ran the
S3 and S5 checklists over the current text; every element each rule requires to survive is present,
in the required position.

**S4: no.** And the reason is worth stating precisely, because it exposes a hole in how S4 was
written, which is mine.

S4 forbade six things: dropping D3, weakening "não substituem", splitting D1–D4 across paragraphs,
and moving any of the four into a modal, an accordion or a `title`. Every one of those is a
prohibition on **where the text is** and **what it says**. The text today satisfies all six — the
four disclosures are in one paragraph, in the footer, no interaction required, no weakened verb.
S4 passes on its own terms and the disclosure is still not being made.

The hole: **S4 regulated the DOM position of the string and never the rendered condition of it.**
"In the footer, with no interaction required to reveal any of them" was written against the failure
I could imagine — a designer hiding the disclaimer in an accordion. A column 64 pixels wide is
outside the language of the rule while being a strictly worse outcome than the accordion, because
the accordion at least has a control that says there is something to open.

Rules **LR1–LR4** in §3 close that hole. They are additive: S3, S4, S5, S6, S9 and S10 stand
unchanged, and LR1–LR4 attach to them as a rendering condition. A string that satisfies S4 and
fails LR1 has not discharged the §4 promise.

This is lesson 004's pattern recurring in a new register — a rule written as a list of forbidden
moves closes the moves it names and not the obligation. I have written it up as a lesson.

---

## 3. LR1–LR4 — the legibility rule

**Binding.** The acceptance criteria of this spec are to be written against these; `qa-engineer`
verifies them at G6 and I verify them at G6 and G9.

### Domain

"**Disclosure surface**" means, exhaustively and by name, so that the rule is checkable rather than
arguable:

| # | Selector / location | Rule |
|---|---|---|
| DS1 | `components/organisms/calculator-views.tsx:73` — the `<footer>` and each of its four `<p>` | LR1, LR2, LR3 |
| DS2 | `components/organisms/day-summary.tsx:233` — the DSR caption | LR1, LR2, LR3 |
| DS3 | `components/organisms/salary-calculator.tsx:125` — the zero warning `<p>` | LR1, LR2, LR3 |
| DS4 | `components/organisms/cookie-consent.tsx:85` — the privacy settings dialog, and its explanatory paragraphs | LR1, LR2, LR3, **LR4** |

DS2 and DS3 pass today. They are in the domain anyway: a rule that names only what is broken today
ships with an exception (lesson 006).

### Measurement conditions

Every clause below is asserted at **390×844** and **1440×900**, on **both** `/` and
`/custo-da-hora`, in **both** themes (`light` and `dark`), against the **production build**. Not
`next dev` — spec scope item 5 exists precisely so that this sentence is true locally as well as in
CI.

### LR1 — floor on rendered width

For every disclosure surface:

```
el.getBoundingClientRect().width  >=  min(320, A)
```

where `A` is the content-box width available to the element in its containing block (at 390px with
the page's horizontal padding, `A ≈ 358`; at 1440px, `A` is far larger). So in practice: **≥ 320
CSS px at both viewports.**

Why 320 and not the spec's general 240: 240px is the right floor for the *class* check in
`responsive.spec.ts`, which must not false-positive over every panel and control row in the app.
320px is the floor for these four named surfaces, because a paragraph of 12px caption text at 320px
renders ~55 characters per line — the low end of a readable measure — and at 240px it is ~41, which
is where a four-sentence gap list stops being read and starts being skipped. Both floors coexist:
the general one catches the unknown next defect, the specific one binds the disclosures.

Today DS1 measures **64px** at both viewports, and DS4 **~24px**. Both fail LR1 by a factor of five
and thirteen.

### LR2 — floor on measure

LR1 alone can be satisfied by an element that is wide and whose text is clipped, scaled, or broken
onto one word per line by an inherited `word-break`. So, additionally, for every disclosure surface:

```
textContent.trim().length / lineBoxes  >=  40
```

where `lineBoxes` is the number of distinct line boxes the element's text occupies — obtained from
a `Range` over the element's text content via `getClientRects()`, deduplicated by rounded `top`, so
that an inline `<a>` inside a line counts once.

Forty characters per line is the floor, not the target. DS1's P3 today scores roughly **9**.

LR1 is the cheap check and the one that fails loudly. LR2 is the substantive one: it is a direct
measurement of whether the paragraph reads as prose, and it is expressed in a quantity no token
migration can accidentally satisfy.

### LR3 — no interaction, no assistive-only presence

For every disclosure surface, on first paint, with no user interaction beyond scrolling:

- present in the server-rendered DOM (not injected on an event);
- `visibility` is `visible`, `opacity` is not `0`, `display` is not `none`;
- not inside a `[hidden]`, a `details:not([open])`, or a subtree whose owner has
  `aria-expanded="false"`;
- not `.sr-only` or otherwise positioned off-screen.

This is S4's "no interaction required" restated so that it survives being checked by a machine, and
extended to DS2–DS4. It is the clause that formalises the thing this defect taught: a disclosure
that only a screen reader can apprehend is a disclosure made to some users and not to others.
`PRODUCT.md` §4's promise is not satisfied per-modality.

### LR4 — consent surfaces

See §4. LR4 is LR1–LR3 plus two additional clauses, and it applies only to DS4.

### How LR1–LR4 fail

An assertion that has never been red proves nothing (lesson 012, lesson 016). **LR1 and LR2 must be
seen to fail against the unfixed tree, at 390 and at 1440, naming DS1 and DS4, before the migration
commit lands** — which is AC1's requirement already; I am extending it from the general floor to
these two clauses and to DS4, which AC1 does not currently name.

---

## 4. The consent dialog — and why it is materially different

**Yes, it is materially different, and the difference is not one of degree.**

An informational disclosure that renders illegibly leaves the user **uninformed**. That is bad, and
it is what DS1 does. A consent surface that renders illegibly leaves the user **recorded as having
chosen** — the app writes a consent decision to storage and thereafter behaves as though the choice
was made. The artifact produced is not an absence; it is a positive record of a decision the user
could not have made, and every subsequent processing operation cites it.

LGPD art. 5º XII requires consent to be *livre, **informada** e inequívoca*. Art. 8º §3º voids
consent obtained *mediante vício*. Art. 8º §4º requires it to refer to *finalidades determinadas*
and makes *autorizações genéricas* **nulas** — not merely irregular, null.

Applied to `cookie-consent.tsx`:

| Surface | State | Ruling |
|---|---|---|
| The banner, `cookie-consent.tsx:44` (`max-w-4xl`, resolves correctly) | Legible. Offers *Aceitar Tudo* / *Recusar* / *Configurar*. | Not affected. **Do not touch it** — spec § Out of scope is right, and the reason it resolves correctly is that no `--spacing-4xl` happens to exist, which is luck, not design. LR1/LR2 apply to it from now on so that the luck is no longer load-bearing. |
| The settings dialog, `cookie-consent.tsx:85` (`max-w-lg` → ~24px) | The **granular, per-purpose** choice — the one art. 8º §4º is about — is rendered at 24px. | **Fails LR1 and LR4.** |

At 24px the user who clicks *Configurar* is offered the per-purpose toggles in a column narrower
than one of the toggles, with the explanatory text at one or two characters per line. The choice is
formally offered and practically unavailable, and the path of least resistance from that screen is
back to the banner's *Aceitar Tudo*. A granular control that cannot be operated does not merely
fail to add anything — it converts a specific consent into the generic authorisation art. 8º §4º
nullifies, while displaying the interface of a specific one.

**LR4 — binding, for DS4 only, in addition to LR1–LR3:**

1. **The dialog renders at ≥ min(480, viewport width − 32) CSS px** at both viewports, measured as
   the content-box width of the dialog element. 480 rather than 320 because the dialog is not a
   paragraph: it carries labelled toggle rows whose label and control must sit legibly on the same
   line. `max-w-lg` = 32rem = 512px is the intended value and satisfies this; at 390px viewport the
   clause resolves to 358px, which is the full available width.
2. **Every control that expresses a choice — each toggle, *Salvar*, *Recusar*, *Aceitar Tudo*, and
   the close control — is fully within the viewport and fully within the dialog's own bounds**, with
   its accessible label rendered, at both viewports, in both themes. A control whose label is
   clipped is a choice offered without its subject.

And one ruling that is not a measurement, recorded because it is the substantive point:

3. **If a granular consent surface cannot satisfy clauses 1 and 2, it must not be offered.** The
   honest fallback is a banner with a binary choice and no *Configurar* entry point — worse
   product, defensible consent. This is not an instruction to remove anything: the fix restores the
   width and clause 3 never fires. It is here so that nobody, under schedule pressure at G7, ships
   a *Configurar* button into a dialog that is still collapsed on the grounds that "the choice is
   still technically there".

---

## 5. Does the defect require anything beyond the fix?

**No. Fix it, ship it, say nothing to users.** Plainly, and here is the basis, verified rather than
assumed.

I checked `main` directly rather than take the triage brief's word for it:

```
$ git show main:app/globals.css | grep -E '^\s*--spacing'
(no output — main declares no --spacing-* key at all)

$ git show main:components/organisms/calculator-views.tsx | grep -n footer
71:  <footer className="mx-auto mt-12 max-w-3xl space-y-2 text-xs …">

$ git show main:components/organisms/cookie-consent.tsx
fatal: path … exists on disk, but not in 'main'
```

Three things follow, and they decide the question:

1. `main` has **no** `--spacing-<name>` keys, so `max-w-3xl` resolves against stock Tailwind's
   `--container-3xl` = 48rem = **768px**. The footer in production is and always has been a full
   text column.
2. The collision entered with **PR #35**, which is unmerged. **No user has ever been shown a 64px
   disclosure.**
3. The consent dialog **does not exist on `main` at all**. No consent has ever been collected
   through a 24px surface, so there is no consent record whose validity is in question and nothing
   to re-collect.

So the population of affected users is empty, and a notice about a defect nobody experienced is
noise that costs credibility. I am not inflating this.

What the history *does* require is the merge block, and it is already ruled and recorded
(`STATUS.md` § Merge ruling, `spec.md` § Blocking condition). I concur with it on legal grounds and
restate it in my own terms so that it is not solely an engineering ruling:

> **The PR stack #32→#37 does not merge until DS1 and DS4 satisfy LR1–LR4.** Merging it is the act
> that would ship an illegible `PRODUCT.md` §4 disclosure and an inoperable consent surface. That
> the stack is green is not a counter-argument; the green is the finding.

This block is binding on `release-manager` at G8 and is not waivable by design, scope or schedule
(`AGENTS.md` §4, rule 8). The only thing that can accept it is the human, in writing, in §9 of this
file.

D2, the hydration mismatch, is live in production today and I have nothing to say about it. It
changes no number and no disclosure. A re-render flash is not a legal defect.

---

## 6. Tables

**None.** This spec introduces, alters and removes no table, bracket, rate, ceiling, parcela a
deduzir or divisor. `lib/legal-tables.ts` is not opened by this spec and must not be
(`spec.md` L3, AC11). The 2026 RGPS, RPPS, IRRF and Lei 15.270/2025 values stand exactly as settled
and verified digit by digit in `.specs/0002-design-taste-preflight/legal.md` §§3, 7 and 8.

## 7. Worked examples

None to compute. The three measurements that stand in their place, each of which is a "before"
value a reviewer can reproduce in a browser:

| # | Surface | Expected (LR1/LR4) | Measured today | Verdict |
|---|---|---|---|---|
| E1 | DS1 — `calculator-views.tsx:73` `<footer>` | `getComputedStyle(el).maxWidth === "768px"`, rendered width ≥ 320px at 390 and 1440 | **64px** at both (`STATUS.md` B1's standalone Playwright measurement) | fail |
| E2 | DS1 — paragraph P3, the gap list | ≥ 40 characters per line box | **≈ 9** | fail |
| E3 | DS4 — `cookie-consent.tsx:85` dialog | rendered width ≥ min(480, viewport − 32) | **≈ 24px** | fail |

## 8. Rounding

Not applicable. No quantity in this spec is monetary or temporal. The pixel floors in §3 are
compared as CSS pixels with no rounding applied on either side; where a sub-pixel value is read,
compare the raw float against the floor rather than a rounded value, so that `319.6px` fails.

---

## 9. Disclaimers the app must show

No new disclaimer, and **no change to any existing one**. The spec is right that this is a width
defect and not a copy defect. Restating the obligation as it now binds, since the whole point of
this gate is that it was not fully stated before:

| Where | What must be true | Rule |
|---|---|---|
| `calculator-views.tsx:73` footer, P1–P4 | Text **byte-identical** to today; the `className` is the only permitted diff inside the `<footer>`. | `spec.md` L1, AC10 — I verify it at G6 with `git diff main -- components/organisms/calculator-views.tsx`. |
| Same, P2 | D1–D4 survive in one paragraph, in the footer, no interaction | S4 (0002), **plus LR1, LR2, LR3** |
| Same, P3 | The gap list survives entire and unshortened | `PRODUCT.md` §4, S4's closing paragraph, **plus LR1, LR2, LR3** |
| Same, P4 | The table year, its effective date and the source link survive and remain reachable | `PRODUCT.md` §4, **plus LR1, LR2, LR3** |
| `day-summary.tsx:233` | Both DSR assumptions and "Feriados não entram" survive | S3 (0002), **plus LR1, LR2, LR3** |
| `salary-calculator.tsx:125` | The literal `R$ 0,00`, the negation and the cause survive | S5 (0002), **plus LR1, LR2, LR3** |
| `cookie-consent.tsx:85` | The purpose-specific choice is offered and operable | LGPD art. 5º XII, 8º §4º, 9º — **LR4** |

## 10. Divergences from the code

Two, both already inside the spec's scope. Neither is an edit by me; both are instructions to
`tech-lead` at G4.

| # | File and line | What the code does | What is required | Severity |
|---|---|---|---|---|
| X1 | `components/organisms/calculator-views.tsx:73` | `max-w-3xl` resolves to `--spacing-3xl` = 64px, collapsing the `PRODUCT.md` §4 disclosure, the gap list and the table citation | LR1, LR2, LR3 | **critical** — this is the gate's whole subject |
| X2 | `components/organisms/cookie-consent.tsx:85` | `max-w-lg` resolves to `--spacing-lg` = ~24px, collapsing the granular consent dialog | LR4 | **critical** |

And one instruction on the criteria themselves, which is the only thing I am asking the spec to
change:

> **AC2 and AC3 currently assert the computed `max-width` value.** That is necessary and not
> sufficient — it re-states the fix rather than the obligation, and it would pass over an element
> whose `max-width` is 768px while its rendered width is 40px because a parent collapsed.
> **Raise AC2 and AC3 to assert LR1 and LR2 on rendered geometry, and add DS4's LR4 clauses to AC3.**
> This widens no scope and moves no pixel that the existing criteria do not already move.

## 11. Out of scope

| Excluded | Why | What the user sees instead |
|---|---|---|
| Every rate, bracket, ceiling, divisor and rounding step | Verified at 0002 G6; untouched here | Unchanged figures |
| Every user-visible string, including all four footer paragraphs | A width fix that re-words a disclosure is a legal change wearing a CSS diff (`spec.md` L1) | Unchanged text |
| D2, the hydration mismatch | No number, no disclosure | — |
| The token mechanism, the migration, `DESIGN.md` | `tech-lead` and `product-designer` | — |
| `journey-form.tsx:238`, the reset confirmation at 16px | Real defect, no legal claim; inside AC3 already | — |

## 12. Known imprecisions

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|

Empty. None introduced, none accepted, none outstanding.

## 13. Open questions for the human

None blocking. One judgement recorded so it is visible rather than buried:

- **The 320px / 40-characters-per-line floors in LR1 and LR2 are a project convention, not a norm.**
  No Brazilian norm states a pixel width or a character count for a disclosure; CDC art. 54 §3º's
  "corpo doze" is the closest thing and it governs printed contratos de adesão, not web layout. I
  set the numbers from typographic practice and from what the 12px caption type at these widths
  actually renders. They are deliberately low — a floor below which the disclosure is certainly not
  being read, not a target. If the human wants a different number, that is a free choice and
  nothing else in this analysis moves with it; the *existence* of a measurable floor is what is not
  negotiable.
