# 0010 — disclosure reachability on mobile

> Owner: product-manager · Gate: `spec` · Run 2

**Run 2, 2026-09-16 — amended by human decision, before G2 ran.** Run 1 recorded the consent
banner's occlusion of *the answer* as an open question, reported and not absorbed. The human decided
it rather than absorbing it: **it is folded into this spec.** The reason given is that this spec
already measures first-screen reachability at 390×844 and already holds the coordinates, so a
separate spec would re-derive the same instrument.

The cost the human accepted, and that this document is therefore responsible for keeping visible:
**this spec now carries two related but distinct questions** — *where a disclosure renders* (**R**)
and *what occludes the answer* (**O**). They are not one question in two words. The cheap remedy for
one is the opposite of the cheap remedy for the other: moving a disclosure up and shrinking the
fixed chrome compete for the same pixels. § Acceptance criteria therefore keeps them on separate
criteria, and **a partial pass is a rejection** — a run that satisfies R and leaves O failing, or the
reverse, is a bounce to `tech-lead`, not a shipped half.

Every number below was **re-measured this run**, not carried forward from run 1. Where run 2 and
run 1 disagree, run 2 is what the spec records and § Evidence says so.

**Opened by human decision, 2026-09-16.** `labor-law-analyst` measured, for the third time across
three specs, that no disclosure surface in this product is above the fold at 390×844 — every
surface, every state — and recorded it as `.specs/0008-…/legal.md` §8 **Q1**, explicitly *not* a
rejection and explicitly not its to decide: *"It is a product-positioning question, not a norm
question."* It was put to the human, who chose to treat it as a product defect and open a spec.

**The premise is therefore settled and is not reopened here:** at least one disclosure must be
reachable on the first screen on a phone. What this spec decides is **what "reachable" means
operationally**, **what it may cost**, and **what may not be traded to get it**. Which surface
moves, and how it looks, is G3.

---

## Problem

A CLT worker opens WorkLoad on a phone, standing at a time clock. `PRODUCT.md` §1 gives them ten
seconds and one of three questions. The first screen — 390×844 — holds the answer.

It does not hold anything that tells them what the answer left out.

Measured this session on the deployed artifact, 390×844, both routes, four storage states, both
themes (`evidence/g1-fold.mjs`, `evidence/g1-ds56.mjs`):

| What is on the first screen | Where | What it is |
|---|---|---|
| The header | `top` 0 → `bottom` 65, `position: fixed` | brand and tagline |
| The answer | `top` 128 → `bottom` 707 (label at 133.8), `position: relative` | *Saída Prevista 07:43:32 · faltam 10:04:27 · 17:48 é quando sua jornada fecha* |
| The route nav | `top` 766 → `bottom` 828, `position: fixed` | *Jornada · Custo da Hora* |
| The cookie banner | `top` 354 → `bottom` 820, `h` 466, `position: fixed` | *Respeitamos sua privacidade* |

**The only disclosure on the first screen is the cookie banner**, and it is the one surface that
says nothing about the number. It is `position: fixed` and it **covers the answer from 354 down**.
Fixed chrome occupies **593 px of 844 — 70.3%** of the first screen; the unoccluded flow band is
**65..354 plus 828..844 — 305 px, 36.1%**. Re-measured this run in all sixteen cells
(`evidence/g1-chrome.mjs`, `evidence/g1-occlusion.mjs`): `header fixed 0..65`, `nav fixed 766..828`,
`div fixed 354..820 h=466`, `fixedSum 593`, identical in **16/16**.

That occlusion is the **second finding this spec carries**, and § Finding O states it.

Every surface that qualifies the number is below the fold, in every cell:

| Surface | Cell | `vtop` | `h` | `w` |
|---|---|---|---|---|
| DS5 — *Informe a carga horária mensal* | `/custo-da-hora`, `monthlyHours=0` | **1233.9** | 21 | 223.8 |
| DS6 — *A carga mensal não combina…* | `/custo-da-hora`, incoherent | **1293.8** | 42 | 250 |
| DS1 P1–P4 — the footer | `/custo-da-hora`, seeded | **1692.3 → 1959.8** | 52.2 / 52.2 / 139.1 / 34.8 | 358 |
| DS1 P1–P4 | `/custo-da-hora`, empty | 1855.7 → 2123.2 | same | 358 |
| DS1 P1–P4 | `/`, empty | 2353.4 → 2620.8 | same | 358 |
| DS2 — the DSR / Súmula 172 caption | `/`, seeded | **2402.8** | 52.2 | 308 |
| DS7 — art. 59 / art. 71 warnings | `/`, seeded | 2521.9 / 2705.9 | 126 / 42 | 282 / 250 |
| DS1 P1–P4 | `/`, seeded | 2967.9 → **3235.4** | same | 358 |
| DS4 — the consent notice | every cell | 523 (banner box 354..820) | 84 | 292 |

The nearest one is **389.9 px below the fold**; the furthest is **2,391.4 px** below it, on a page
whose total height is 2,059–3,334 px. Reaching the footer costs `scrollY` **1876** on `/` and
**1378** on `/custo-da-hora` — 2.2 and 1.6 screen-heights.

**And the scroll does not buy co-presence.** The answer panel is `position: relative` and scrolls
away with the page: measured at the footer, the answer's `top` is **−1742** on `/` and **−1245** on
`/custo-da-hora`, `answerVisible: false` in both (`evidence/g1-scroll.mjs`). The user can see the
number, or the sentence that says what the number omits. Never both.

That is the defect. `PRODUCT.md` §4 promises the app will *name the gap* — *"visibly, next to the
number"* — and on the device this product is designed for, it names it 1.5 to 3.8 screens away from
the number, under a banner, or not at all.

### Three more surfaces the handed brief did not contain

The re-run search (§ Evidence, E1–E3) returns three rendered strings that cite a norm or a rate and
that **no `.specs/*/legal.md` has ever classified**. All three are inside a `CollapsiblePanel`,
which renders `{isOpen ? … : null}` (`components/atoms/collapsible-panel.tsx:15-27`) — so they are
**not in the DOM at all** until the user taps a control that is `aria-expanded="false"` on load:

| # | Where | What it says | Gate |
|---|---|---|---|
| **CA** | `components/organisms/journey-form.tsx:142` | *O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT).* | `journey-form.tsx:74` `useState(false)`, `aria-expanded` at `:91` |
| **CB** | `components/organisms/journey-form.tsx:157` | *Não existe lei que dobre o adicional depois da 2ª hora: o piso continua sendo 50%. Só use 100% se a sua convenção coletiva previr esse degrau.* | same |
| **CC** | `components/molecules/regime-field.tsx:83` | *O regime muda só o cálculo do INSS. O IRRF segue a mesma tabela para os dois.* | `regime-field.tsx:19` `useState(false)`, `aria-expanded` at `:37` |

Confirmed absent from the rendered DOM in all ten measured cells (`ABSENT FROM DOM`,
`evidence/g1-fold.txt`). **Classifying them is L1 and L2 — G2's, not mine.** They are named here so
the gate has them; this spec states no rule about them.

---

## Finding O — the fixed chrome covers the answer, in every cell

Folded in at run 2 by human decision. **This is a different defect from the one above**, and the two
are kept apart everywhere in this document: R is about a sentence the user cannot *find*; O is about
the number the user came for being *painted over*.

Measured this run, 390×844, cold load with consent pending, **all 16 cells**
(`node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-occlusion.mjs` →
`evidence/g1-occlusion.txt`). The consent banner (`div fixed 354..820`, `h` 466) intersects the
answer panel in **16 of 16 cells**. Nothing else does: the header sits above the panel's top and the
route nav below the panel's bottom in every cell.

| Route · state | Answer panel box | Lines on the first screen | Occluded |
|---|---|---|---|
| `/` · empty, seeded, `monthlyHours=0` (6 cells) | 96..739.4 | 8 | **4** — *Faltam 8h 56m para o fim da jornada* (432.4..433.4), ***17:48*** (433.4..577.4), *é quando sua jornada fecha* (593.4..614.4), *Entrada às 08:00* (676.7..694.1) |
| `/` · incoherent (2 cells) | 96..739.4 | 8 | **4** — same boxes, values *8h 8m* and *17:00* |
| `/custo-da-hora` · empty (2 cells) | 96..575 | 9 | **6** — *Visualizar o valor por período* (376.8..377.8), *Resumo Financeiro* (476.8..497.8), *Bruto* + ***R$ 0,00*** (505.8..543), *Ganhos Extras* + ***+R$ 0,00*** (505.8..543) |
| `/custo-da-hora` · seeded, incoherent (4 cells) | 96..558.6 | 9 | **6** — same rows, ***R$ 4.200,00*** at 503.2..526.6 |
| `/custo-da-hora` · `monthlyHours=0` (2 cells) | 96..498.7 | 9 | **5** — *Resumo Financeiro* (400.6..421.6), *Bruto* + ***R$ 4.200,00***, *Ganhos Extras* + ***+R$ 0,00*** |

**Two of those rows are 1 px tall** — *Faltam 8h 56m para o fim da jornada* and *Visualizar o valor
por período* are assistive-only boxes, not lines a sighted user reads. Stated rather than quietly
counted: the sighted loss is **3 lines on `/`** and **5 on `/custo-da-hora`**, and the criterion that
verifies O counts every intersected box because a box the instrument cannot see it is 1 px is a box
the instrument will get wrong the day it is 20 px.

What this costs, in `PRODUCT.md` §1's own terms: on `/`, question 1 is *"a que horas eu posso ir
embora?"* and the answer to it — **17:48** — is behind the banner on a cold load. On
`/custo-da-hora`, question 3 is *"quanto cai na minha conta?"* and **R$ 4.200,00** is behind it. The
user does see *Saída Prevista 08:51:36* and *faltam 08:56:23* above 354, so the screen is not blank;
it is the resolved answer, the one the ten seconds are spent on, that is covered.

### The monetisation tension, named and not settled here

The consent banner exists because the app serves ads and analytics — `PRODUCT.md` §8. That section
also says, in its own words, that ads **"never sit between the user and an answer"** and **"never
occupy the space where a result appears"**, and that a placement which measurably hurts the
ten-second path **loses**.

The banner is not an ad. It is the gate that makes ads possible, and it is doing to the answer
exactly what §8 forbids an ad to do. **This spec does not resolve that.** Stating it is this gate's
job; deciding it is not, for three reasons, each of which points at a different owner:

1. Whether §8's rule reaches the consent gate by substance, or only the ad slots it names, is a
   **`PRODUCT.md` reading**, and `PRODUCT.md` outranks this spec. If the human reads §8 as covering
   the gate, O is already decided against the banner and only the legal floor remains. If not, the
   trade is a product call with revenue on one side.
2. Whether the banner's geometry may change at all, and by how much, is **L3** — `labor-law-analyst`
   at G2. A remedy that shrinks something LGPD fixes is not a remedy.
3. Whether a **shrunk or repositioned** banner measurably lowers consent, and what that costs, is a
   number **nobody in this pipeline has**. No agent here may assume it either way, and this spec
   states no consent-rate target.

**What this spec does do** is refuse to let the tension be settled silently. Any remedy that changes
the banner's footprint carries its L3 ruling in `legal.md` (AC10) and names the §8 reading it relies
on in `design.md` (AC14). A remedy that changes the footprint with neither is a G4 rejection.

---

## Audience & moment

`PRODUCT.md` §1, ten-second first contact, phone, one-handed, cold load. Both routes: the user may
land on `/custo-da-hora` from search without ever seeing `/`.

## Outcome

Two outcomes, both required. Either one alone is a rejection.

- **R** — on the first screen, at 390×844, the user can read at least one sentence that qualifies the
  number they came for, without scrolling, without tapping, and without a fixed element over it — and
  the number itself has not moved down to make room.
- **O** — on the same screen, on a cold load with consent pending, **no part of the answer is painted
  over by fixed or sticky chrome**.

---

## What "reachable" and "unoccluded" mean here — R and O

These are the two product decisions this spec exists to make, and every downstream gate is bound by
both. They share one predicate and nothing else; the sub-section on **O** states exactly what is
shared and what is not.

> **R — reachability.** A disclosure surface is *reachable on the first screen* when, at **390×844**,
> on load, with **no interaction of any kind including scrolling**:
>
> 1. its complete border box lies inside the first viewport — `getBoundingClientRect().top ≥ 0`
>    **and** `.bottom ≤ window.innerHeight`; **and**
> 2. no element with computed `position: fixed` or `position: sticky` has a border box that
>    intersects it; **and**
> 3. it is one of the surfaces the `.specs/0006-…/legal.md` §2.1 test returns, **paired** with a
>    claim that is itself inside the first viewport in the same frame, per LR6.1
>    (`.specs/0008-…/legal.md` §4.2).

**Why the whole box and not the top edge.** A sentence whose last line is under the fold is a
sentence the user did not read. The measured surfaces are 21–139 px tall, so the distinction is
between 21 px and a paragraph, and the criterion must be able to tell them apart.

**Why occlusion counts.** A disclosure under a `position: fixed` banner is unread for the same
reason `display: none` is: LR3's last bullet already reaches concealment by substance rather than by
enumeration (`.specs/0008-…/legal.md` §5.3). Admitting a box the user cannot see would make the
criterion green on the exact screen the defect lives on.

**Why not "indicated and one thumb-reach away".** It was the other candidate and it is rejected on a
measurement, not on taste: the answer panel is not sticky, so a control that takes the user to a
disclosure takes the number off the screen (`evidence/g1-scroll.mjs`: `answerVisible: false`,
`top` −1742 / −1245). A tap-to-reveal also puts the surface behind an `aria-expanded="false"`
control, which is the shape CA/CB/CC already have and which L2 asks G2 to rule on. Reachability that
costs the claim is not reachability.

**This spec introduces no user input** — no field, no toggle, no setting, no preference — so it
states no default. That is deliberate and it is a constraint on G3 as well: `PRODUCT.md` §5's "the
default is the common case" has nothing to bind here only because nothing is being added for the
user to disarm, and a remedy that introduces a control the user must dismiss has changed that and
owes a default and a G1 bounce.

### O — non-occlusion of the answer

The amendment asked whether O can simply reuse R's clause 2, or whether occluding *the answer* needs
a different test from occluding *a disclosure*. **It reuses the predicate and changes the quantifier
and the subject** — and that difference is the whole reason the two criteria cannot be merged.

> **O — non-occlusion.** The route's answer is *unoccluded on the first screen* when, at **390×844**,
> on load, **with consent pending** and with no interaction of any kind including scrolling:
>
> 1. for **every** element inside the answer panel that renders text, has no element children, and
>    whose border box intersects the first viewport,
> 2. **no** element with computed `position: fixed` or `position: sticky` has a border box that
>    intersects it.
>
> The *answer panel* is the outermost non-fixed ancestor of the route's answer label that is not
> taller than 1.2 viewports — `Saída Prevista` / `Saída Real` on `/`, `Valor por Hora` on
> `/custo-da-hora`. Measured this run as 96..739.4 on `/` and 96..498.7–575 on `/custo-da-hora`,
> depending on state.

**What is shared.** Clause 2 is character-for-character R's clause 2. The predicate — *a `fixed` or
`sticky` border box intersects this border box* — is one test, implemented once, in one instrument.
That is deliberate: two implementations of "covered" would eventually disagree, and the gate that
caught the disagreement would be G9, not G3.

**What differs, and why it must.** Three things, and each one would be wrong if carried across:

| | R, on a disclosure | O, on the answer |
|---|---|---|
| **Quantifier** | **Existential** — *at least one* qualifying surface passes. Sixteen other surfaces may stay below the fold; R is satisfied. | **Universal** — *every* rendered line of the answer panel inside the viewport passes. One covered line is a fail. |
| **Subject** | A whole surface, as one border box. | Each rendered leaf line, separately. |
| **Clause 1 (whole box inside the viewport)** | **Applies.** A sentence whose last line is under the fold is unread. | **Does not apply, and must not.** The answer panel is 403–643 px tall and legitimately runs past the fold in some states; demanding the whole panel fit would be a layout mandate this gate has no business issuing, and would fail cells where nothing is covered at all. O is scoped to the part already on the first screen. |

**Why universal and not existential.** A disclosure is a sentence: reading one of them discharges the
obligation. The answer is a single composed statement — *Saída Prevista 08:51:36 · faltam 08:56:23 ·
**17:48** é quando sua jornada fecha* — and covering its last clause does not leave the user with a
smaller answer, it leaves them with the wrong one. Measured: the uncovered part of `/` reads *faltam
08:56:23*, which is a duration; the covered part is the clock time the user is standing at the time
clock to learn.

**Why consent pending and not both states.** O is a cold-load property. Once consent is answered the
banner unmounts and the occlusion is gone; that state is measured and **reported** (AC13), because a
future ad slot could reintroduce it, but it carries no baseline this gate invented.

**What O deliberately does not say.** It does not say the banner must shrink, move, become
`sticky`, render at the bottom, or render at all differently. Making the answer panel shorter,
reordering the column, moving the banner out of the answer's band, or something none of those
describe — all satisfy O if the measurement passes. That choice is `product-designer`'s at G3,
bounded by L3, AC2 and § The shared pixel budget.

**What R deliberately does not say.** It names no surface, no wording, no position on the screen, no
component and no mechanism. Relocating a surface, reordering the column, making the answer panel
sticky, changing the consent banner's footprint, or something none of those describe — all satisfy R
if the measurement passes. That choice is `product-designer`'s at G3.

---

## The shared pixel budget — the boundary with `0008`

`product-designer` closed `0008`'s G3 this session and measured the same screen from the other side
(`.specs/0008-intermittent-layout-shift-on-custo-da-hora/design.md` §C.3, §Hierarchy). Both specs
are now spending pixels on one 844-px viewport. **The boundary is stated here so G3 and G4 cannot
receive two budgets that contradict each other.**

`0008` §C.3, reproduced under its own seed this run (`evidence/g1-firstinput.mjs` →
`evidence/g1-firstinput.txt`, `/custo-da-hora`, 390×844):

| Storage state | `#salario-bruto` | Slack to the fold |
|---|---|---|
| `empty` | top 824.5, **bottom 880.5** | **−36.5 px** |
| `seeded` as **this spec** seeds it (§ Scope 1) | top 808.1, **bottom 864.1** | **−20.1 px** |
| `seeded` as **`0008` §C.3** seeds it | top 776.8, **bottom 832.8** | **+11.2 px** |

`0008`'s two published numbers reproduce exactly — 880.5 empty, 832.8 seeded. Its ruling stands
unchanged: **any reservation of ≥ 12 px removes the only complete input control from the first
mobile screen**, and it said no. This spec adds one measurement `0008` did not have: under the
thinner `seeded` state this spec's matrix uses, the slack is **already −20.1 px** — so *in two of
three seeded variants there is no complete control on the first screen before anything is spent*.
That strengthens `0008`'s ruling; it does not soften it.

**The two budgets are different budgets, and conflating them is the failure mode this section
exists to prevent:**

- **Flow height** — pixels in the document above `#salario-bruto`. `0008` owns this. Its ceiling is
  **< 12 px in the best state and 0 px in the other two**, and this spec inherits it whole: a remedy
  that inserts, grows or reserves flow height above the first input is spending `0008`'s budget and
  is capped by `0008`'s ruling, not by this spec's needs. **AC2** already forbids moving the answer
  label down; **AC15** extends the same floor to the first input, so the ceiling is measured rather
  than remembered.
- **Occluded height** — the 466 px of first screen the banner paints over, and the 289-px unoccluded
  band between the header and the banner. This spec owns this. Recovering a pixel here costs
  `0008` nothing, because the banner is `position: fixed` and contributes **zero** flow height: its
  box does not sit above `#salario-bruto` in the document, it sits over it on the screen.

**Which is to say the compatible direction is already determined by measurement, without either
gate having to concede anything.** A remedy that takes pixels from the fixed chrome serves R, serves
O, and leaves `0008`'s 11.2 px untouched. A remedy that takes them from the flow serves R at O's and
`0008`'s expense and has < 12 px to work with. G3 may still choose the second — the budget is a
ceiling, not a prohibition — but it chooses it explicitly, with AC15's number in `design.md`.

---

## Scope

1. **The reachability property R**, satisfied in every cell of the matrix: **2 routes × 4 storage
   states × 2 themes = 16 cells**, at 390×844. Storage states, each reached and measured this
   session: `empty`, `seeded`, `monthlyHours=0`, `incoherent` (`monthlyHours=240` vs
   `workMinutes=480`).
2. **Where each LR-domain disclosure surface renders** — its position, its order, its container.
   Position only: § Out of scope 2 keeps every word of every one of them frozen.
3. **The first-screen footprint of the fixed chrome that stands between the user and a reachable
   disclosure**, measured this session: `components/organisms/cookie-consent.tsx:44` (354..820,
   `h` 466), the fixed header (0..65) and the fixed route nav (766..828).

   **3b — the non-occlusion property O.** Folded in at run 2, satisfied in every cell of the same
   16-cell matrix, on a cold load with consent pending. Scoped to *geometry*: which boxes are
   painted over which. It is **not** the same item as 3 — item 3 puts the chrome's footprint in
   scope because a disclosure has nowhere to go; item 3b puts it in scope because the answer is
   underneath it. A remedy may satisfy one and not the other, which is why they are counted
   separately and scored separately.

4. **The mount condition of CA, CB and CC** — `components/organisms/journey-form.tsx:142`,
   `journey-form.tsx:157`, `components/molecules/regime-field.tsx:83`, and the
   `{isOpen ? … : null}` at `components/atoms/collapsible-panel.tsx:15-27` that unmounts them —
   **conditional on G2's L1 ruling**. If L1 rules them outside the LR domain, item 4 falls away
   entirely and `plan.md` says so.
5. **The G1 instrument** — `evidence/g1-fold.mjs` and `evidence/g1-occlusion.mjs` — as the shared
   measuring device for G3, G5, G6 and G9, re-pointed at the artifact under test, so before and
   after are read with one tool and one box model. The intersect predicate is implemented **once**,
   in `g1-occlusion.mjs`, and both R's clause 2 and O's clause 2 read it from there.

### Files this scope binds, derived from E1–E3, each path in full

`components/organisms/calculator-views.tsx` (DS1 P1–P4) ·
`components/organisms/day-summary.tsx` (DS2, DS7) ·
`components/organisms/salary-calculator.tsx` (DS3, DS5, DS6) ·
`components/organisms/journey-form.tsx` (CA, CB) ·
`components/molecules/regime-field.tsx` (CC) ·
`components/atoms/collapsible-panel.tsx` (the mount condition) ·
`components/organisms/cookie-consent.tsx` (DS4's first-screen footprint).

`components/organisms/calculator-layout.tsx` is **not** in this list — it is the box `0008` is
measuring, and § Out of scope 4 explains what protects that.

---

## Out of scope

Each exclusion states the property it protects and the gates that may override it. An exclusion and
the criterion that verifies it can only disagree by the exclusion being out of date; when that
happens the prose here is what gets fixed.

1. **No rendered number changes** — not a value, not a rate, not a year, not a currency string.
   *Protects:* the falsifiability of the claim that this is a positioning change, so any number
   delta seen at review is a defect rather than an accepted side effect. *Override:* only
   `labor-law-analyst`, and only by finding an existing number wrong; per `AGENTS.md` §4 rule 8 that
   stops this spec and goes to the human rather than being fixed here.
2. **No disclosure string changes** — no rewording, no shortening, no punctuation. *Protects:*
   `0003-citation-registry`'s ownership of what disclosures say; the two specs must never edit the
   same sentence. *Override:* G2 may mandate a string at **L5**. Any such mandate is written
   verbatim into AC5's exemption list, and `content-writer` owns its wording at G3. The list is
   **empty unless G2 writes into it**, and AC5 is checkable only because it is.
3. **No new disclosure surface.** *Protects:* `PRODUCT.md` §5 — a spec about reachability that adds
   a sixth paragraph to a 390-px screen has made the first screen worse than it found it.
   *Override:* G2 at **L5**. Relocating an existing surface, or rendering one already in the DOM
   somewhere it can be read, is not a new surface and needs no override.
4. **No change to `0008`'s shifting box, `0004`'s LCP budget, or `0007`'s Súmula 431 citation**,
   and **no flow height added above `#salario-bruto`** beyond `0008` §C.3's ceiling. *Protects:*
   three in-progress specs' ability to measure their own before/after against a tree that did not
   move under them mid-gate; and, for the flow-height half, the last complete input control on the
   first mobile screen — measured this run at 832.8 / 864.1 / 880.5, § The shared pixel budget.
   *Override:* `tech-lead` may sequence this spec behind any of them; and if a remedy here provably
   cannot be measured until one of them lands, that is a blocker in `STATUS.md`, not a scope
   extension. The flow-height ceiling is **`0008`'s to move, not this spec's** — a remedy that needs
   more than it allows goes through `tech-lead` to `0008`, and AC15 is what makes the request
   visible instead of silent.
5. **No change under `lib/`.** *Protects:* the legal tables' verified state — a positioning change
   has no occasion to touch a rate, and a diff that does is asking for a re-verification nobody
   scheduled. *Override:* a G2 finding, which routes to the human under rule 8.
6. **Nothing at 1440, 2560 or 3840 is a target.** *Protects:* `PRODUCT.md` §5, "the phone is the
   design target" — a criterion written for a wide viewport would let a desktop-first remedy pass.
   *Override:* `AGENTS.md` §9's floor still binds — no horizontal overflow and no control
   off-viewport at 390 / 1440 / 2560 / 3840, and LR2b's 40 cpl on DS1 at 1440 — so the change must
   not regress them even though it is not aimed at them.
7. **No consent *decision* logic changes** — what is stored, what is asked, what telemetry runs,
   **and when the banner appears**. *Protects:* LGPD correctness settled at LR4, which this spec has
   no competence to touch. Only DS4's **geometry on the first screen** is in scope, per § Scope 3
   and § Scope 3b. Delaying the banner, deferring it until after a scroll, auto-dismissing it, or
   letting it be closed without a choice are **decision** changes wearing a geometry costume, and
   they are the obvious cheap fixes for O — named in § Non-goals so nobody reaches for one.
   *Override:* G2 at **L3**, which may find that even the geometry has a floor.
8. **The `PRODUCT.md` §8 reading is not settled here** — whether §8's *"ads never sit between the
   user and an answer"* reaches the consent gate, or only the ad slots §8 names. *Protects:*
   `PRODUCT.md`'s rank over any spec: a product-manager who reads §8 broadly to justify their own
   finding has amended `PRODUCT.md` by inference. *Override:* the human, and only the human. Until
   then AC14 requires the remedy to **name** which reading it relies on, which is checkable without
   the question being answered.
9. **No consent-rate, revenue or ad-viewability target.** *Protects:* the honesty of every claim in
   this spec — nobody in this pipeline has measured what a smaller banner does to consent, and a
   number invented at G1 becomes a constraint at G5 that no evidence ever supported. *Override:* the
   human, with a measurement. A remedy may not be rejected downstream on a revenue ground that is
   not written here either.

---

## Legal dependencies

Every rule this change relies on, named and **not stated**. `labor-law-analyst` settles each at G2.

| # | The dependency | Why this spec needs it |
|---|---|---|
| **L1** | Which of **CA** (`journey-form.tsx:142`), **CB** (`journey-form.tsx:157`) and **CC** (`regime-field.tsx:83`) the `0006` §2.1 domain test returns. | § Scope 4 exists or falls away on this answer, and R's clause 3 is defined by the test's output. |
| **L2** | Whether a surface that is **unmounted until a control is activated** satisfies LR3 as corrected at `0008` §4.1 — and, if L1 rules any of CA/CB/CC in domain, what that obliges. | Three norm-citing strings are behind `aria-expanded="false"`, measured `ABSENT FROM DOM` in 10/10 cells. |
| **L3** | Whether the LGPD consent notice (**DS4**) carries any floor on **placement, size, persistence or prominence** that constrains changing its 466-px first-screen footprint. | § Scope 3 and § Scope 3b both put that footprint in scope; without L3 a remedy could shrink something the law fixes. Run 2 raises the stakes rather than the question: the same footprint is now the subject of two findings. |
| **L4** | The narrowest container in which a relocated surface still clears **LR1** and **LR2b**. The footer runs at `w` 358 and 12 px; the in-column banners at `w` 250–308 and 14 px, measured this session. | A surface moved above the fold lands in a narrower box, and R must not be reachable at the price of unreadable. |
| **L5** | Whether a **short line above the fold plus the full text in the footer** is permitted, forbidden, or requires a string this gate must mandate. | This is the one shape that fits the measured space, and it is the one shape that could split a disclosure in two. If it needs a string, AC5's exemption list is where it goes. |
| **L6** | Whether **R** itself must become a binding LR clause, or stays a product bar the way `0008` §5.4 ruled item 4. | Decides whether a later regression is a G2 rejection or a `tech-lead` bounce. |
| **L7** | Whether a disclosure intersected by the **fixed header or the fixed route nav** counts as concealed under LR3's last bullet. | R clause 2 forbids it as a product rule; whether the law also forbids it changes who can overrule it. |
| **L8** | Whether the **50 %** rate, the **52min30s** reduced hour, the **220 h** divisor, the **RPPS/RGPS** tables and the **table year** — every number reachable on either route — are unchanged by a positioning-only change, verified rather than assumed. | `AGENTS.md` §9: every user-visible number traces to a cited table. AC4 asserts none moved; G2 is what makes that assertion worth something. |

| **L9** | Whether concealing a **claim** — not a disclosure — under fixed chrome engages **LR3 as corrected** (`0008` §4.1) or **LR6.1** (`0008` §4.2). Measured this run: *17:48*, *R$ 4.200,00*, *R$ 0,00* and *+R$ 0,00* are painted over in 16/16 cells. | Folded in at run 2 with finding **O**. LR3 reaches concealment of a *disclosure*; LR6.1 pairs a claim with its disclosure **in the same frame**. If a covered claim breaks that pairing, O is a legal failure and not only a product one — which changes who may overrule it, exactly as **L7** does for the mirror case. |
| **L10** | Whether the **1-px assistive-only rows** — *Faltam 8h 56m para o fim da jornada* (432.4..433.4) and *Visualizar o valor por período* (376.8..377.8) — are inside any LR domain, and whether an assistive row being intersected by fixed chrome means anything the law reaches. | § Finding O counts them and says it counts them. If G2 rules they are outside every domain, AC13 still counts them as geometry and says why; if inside, AC13's universal quantifier already covers them and nothing changes. Either answer is cheap — an unstated one is not. |

**No number appears in this spec that is not geometric or temporal.** Every legal quantity the two
routes display is covered by L8 and by § Out of scope 1.

---

## Acceptance criteria

The **matrix** referred to below is 16 cells: routes `/` and `/custo-da-hora` × storage `empty`,
`seeded`, `monthlyHours=0`, `incoherent` × themes `dark` and `light`, at 390×844, against the
artifact under test. Every G1 baseline below was produced this session by the command named in
§ Evidence and is reproducible from `evidence/g1-fold.txt` or `evidence/g1-occlusion.txt`.

**The two findings are scored separately and a partial pass is a rejection.** **AC1** and **AC10**
carry **R**; **AC13** carries **O**; **AC2**, **AC3** and **AC15** are the floors neither may buy
itself out of. A run that turns AC1 green and leaves AC13 red — or the reverse — is a **bounce to
`tech-lead`**, reported with both numbers, never a shipped half. The reason is measured, not
procedural: the two remedies compete for the same pixels (§ The shared pixel budget), so a partial
pass is the specific shape a wrong trade takes.

### Whether a criterion may name an instrument that does not ship — the G1 ruling on blocker B4

**Answer: yes, but only for a criterion whose verdict is consumed in the session that produced it.**
The test is on **what the criterion's verdict is for**, not on which directory the script sits in
(`AGENTS.md` §5, *How a rule's domain is defined* — a domain is a test, never a list of the files in
view):

> **Can this criterion still be falsified, after this spec closes, by an agent who has only the
> repository?** If the answer must be yes, the instrument ships on a tracked path. If the answer is
> no — because the criterion's whole job is to capture a baseline or to compare two runs made
> minutes apart by one agent — the instrument may live under `evidence/`, and then the **pasted
> output is the durable artifact** and the script is regenerable.

Two obligations follow, and they are what a reviewer checks:

1. **A criterion whose verdict outlives this spec must name a tracked instrument.** That covers
   every criterion carrying **R** or **O**, every floor another spec will re-measure, and every
   debt this spec re-routes. `plan.md` discharges this for R, O, LR3.5, LR4.2a and LC1 by writing
   them as committed Playwright specs under `tests/e2e/`; those are the paths the criteria below
   are scored against, and an `evidence/*.mjs` path in the same criterion is the **non-durable
   twin** used to produce the G1 baseline, not the scoring path.
2. **A criterion that keeps an `evidence/*.mjs` path pastes the instrument's output *and* its
   source into a committed artifact** — `spec.md`, `plan.md` or a file under `reports/` — before
   the gate that scores it closes. An un-pasted output is a verdict nobody can re-derive, which is
   the defect B4 actually names; the gitignore is only how it arrives.

Applied to the seven criteria B4 lists, with no other criterion re-opened:

| Criterion | Verdict outlives this spec? | Scoring path |
|---|---|---|
| **AC1** (R), **AC13** (O) | **yes** — R and O are this spec's product and every later spec inherits them | the committed `tests/e2e/` specs `plan.md` names; `evidence/g1-fold.mjs` and `evidence/g1-occlusion.mjs` are the baseline twins |
| **AC2**, **AC3**, **AC7**, **AC15** | **yes** — each is a numeric ceiling a later spec re-measures, and **AC15**'s belongs to `0008` outright | obligation 2: the G1 baseline **and** the instrument source pasted into `reports/`, or the check written under `tests/e2e/`; `plan.md` (G4) picks which, per criterion, and says so |
| **AC4** | **no** — it is a before/after `diff` of two dumps taken by one agent in one session | `evidence/g1-text.mjs` stands, with `g1-text.txt` pasted into `reports/qa.md` |

**This ruling generalises beyond this spec** — it is a property of `evidence/` being gitignored
(`AGENTS.md` §5) and of nothing specific to disclosures — so its home is `AGENTS.md` §5 beside
*How a criterion is written*, not seven words in one `spec.md`. **I am not writing it there**: that
file is the squad's contract and the promotion is `tech-lead`'s at G10, on the evidence of this
bounce. Recorded in `STATUS.md` with that owner and that trigger.

Verified against a known-bad and a known-good state, run in this tree at this amendment
(lesson **040**): `git check-ignore -v .specs/0010-disclosure-reachability-on-mobile/evidence/g1-fold.mjs`
→ **`.gitignore:55:.specs/*/evidence/`**, exit 0, the instrument does not ship — same for
`g1-occlusion.mjs` and `g1-firstinput.mjs`; `git ls-files tests/e2e/` → **9 tracked files** including
`disclosure-legibility.spec.ts` and `support/legibility.ts`, exit 0 with output, the instrument
ships. The two states are separated by the criterion in the direction it asserts.

| # | Criterion | How it is verified |
|---|---|---|
| **AC1** | In **every** one of the 16 cells, **at least one** surface the `0006` §2.1 test returns satisfies **R** in full — all three clauses, measured, not argued. | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-fold.mjs` re-pointed at the artifact under test; the surface name, `vtop`, `bottom`, `h`, `w` and the intersect check pasted per cell. A cell that passes clauses 1–2 but not 3 is a fail. |
| **AC2** | The route's primary computed value does **not** move down. Per cell, the label's `vtop` is **≤** its G1 baseline: `/` empty **133.8** (*Saída Prevista*), `/` seeded **134** (*Saída Real*), `/custo-da-hora` empty and seeded **133.1** (*Valor por Hora*). | `evidence/g1-answer.mjs` re-run; delta reported per cell. **An increase in any cell is a finding that bounces to `tech-lead`, never a licence** — the report states the number and stops. |
| **AC3** | Fixed and sticky chrome intersecting the first screen does not grow. Sum of border-box heights, consent pending, G1 baseline **593 px** (header 65 + nav 62 + banner 466). | `evidence/g1-chrome.mjs` re-run per cell; the list and the sum pasted. The consent-answered state's sum is **reported, not bounded** — no baseline exists for it, and inventing one would be a threshold nobody measured. |
| **AC4** | No rendered number changes. The rendered text of both routes, in all 16 cells, is **identical** before and after over every `R$`, `%`, `h`/`m`, divisor, year and table figure. | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-text.mjs` (run at G1 against the artifact; 16 cells, `evidence/g1-text.txt`), re-run against the head with `HOST` re-pointed, then `diff` the two dumps. The G1 dump is the baseline and contains, among others, `R$ 17,31`, `R$ 3.807,40`, `50%`, `220`, `art. 59`, `Súmula 60`, `Súmula 431`. A non-empty numeric diff is a rejection under § Out of scope 1. |
| **AC5** | No disclosure string changes. The rendered text of every surface the `0006` §2.1 test returns is identical before and after, except for entries in the **G2 exemption list**, which is reproduced verbatim in `plan.md`. | The same `diff` of `g1-text.txt` as AC4, restricted to those surfaces. **The exemption list is empty unless `labor-law-analyst` writes into it at L5**; `plan.md` states the list, empty or not, so a reviewer can tell "nothing exempted" from "nobody looked". |
| **AC6** | **LR1**, **LR2a**, **LR2b**, **LR3 as corrected** (`0008` §4.1) and **LR6.1** (`0008` §4.2) are re-measured on **every** surface the test returns, in **every** cell, after the change, and each passes. LR6.1's negative control is run and its output pasted. | The G6 instrument named at `0008` §7, V1–V5. **That instrument does not exist as a script in this tree — `product-manager` did not run it and does not name a command for it here.** `plan.md` must name the file that implements it and show it running once, on the unfixed head, before any task depends on it; a criterion whose evidence path is inoperable proves nothing in either direction (`AGENTS.md` §5). **No criterion in this spec is satisfied by a value below those floors**, and R is never traded against them: a surface that becomes reachable and drops below 40 cpl fails AC6, and AC6 wins. |
| **AC7** | The scroll cost of the footer does not grow. `scrollY` required to bring DS1 P1's `top` into the viewport, per cell; G1 baseline **1876** (`/` empty) and **1378** (`/custo-da-hora` empty). | `evidence/g1-scroll.mjs` re-run. An increase in any cell is a finding reported with its number; it bounces to `tech-lead` rather than being absorbed. |
| **AC8** | **CA, CB and CC are ruled.** `legal.md` records G2's L1 verdict for each of the three by name. For each one ruled **in domain**, `plan.md` either brings it into a task in this spec or `tech-lead` routes it forward **with a named owner and a trigger event, never a date**. | Read `legal.md` §L1 and `plan.md`; three names, three verdicts, and for each in-domain verdict either a task id or a routed debt. A verdict left unstated blocks G4. |
| **AC9** | **The `0006` DS2 debt is discharged or explicitly re-routed.** Its trigger is the first spec that opens `components/organisms/day-summary.tsx`, the caption type token, or the `DESIGN.md` scale. Re-measured at G1: `grep -rn "Súmula 172\|DSR" __tests__ tests components lib` returns **10 rows, 0 of them under `tests/`** — **still open, unchanged in shape**. If any task in `plan.md` edits any of the three, this spec adds an e2e assertion for the DSR caption under `tests/`, **seen red first** against the unfixed state. | Re-run the grep after the change and paste it: rows under `tests/` go from 0 to ≥ 1, and the red run is pasted. If no task touches the three, `plan.md` states that the trigger did not fire and re-routes the debt with its owner and trigger intact. |
| **AC10** | On a cold load with consent pending, the surface satisfying AC1 is **not intersected** by the consent banner's border box, in all 16 cells. | The intersect check inside AC1's run, reported separately for the banner. Any change to the banner's geometry is bounded by G2's **L3** ruling and specified in `design.md`; a geometry change made without an L3 ruling in `legal.md` is a G4 rejection. |
| **AC11** | The **files actually edited** are a subset of § Scope's list, plus whatever G3 and G4 add **with their path written in full in `plan.md` before the edit**. `components/organisms/calculator-layout.tsx`, anything under `lib/`, and anything under another spec's scope are absent from the diff. | `git diff --name-only main...HEAD` (run at G1 in this tree: 413 rows on the current branch), compared to `plan.md`'s file list. |
| **AC12** | Every claim this spec's reports make about the tree is backed by a command pasted with its output, run in this tree. No count, no file list and no carried debt appears without one. | Read the reports at G6. `AGENTS.md` §5, *How a claim about the tree is measured*. |
| **AC13** | **Finding O is discharged.** In **every** one of the 16 cells, on a cold load with consent pending, **`linesOccluded` is 0** — no rendered leaf line of the answer panel that intersects the first viewport is intersected by any `fixed` or `sticky` border box. G1 baseline, re-measured this run: **4 occluded of 8 lines** in all 8 `/` cells, **6 of 9** in the six `/custo-da-hora` cells with a period control and **5 of 9** in the two `monthlyHours=0` cells; **16/16 cells fail today**. | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-occlusion.mjs` re-pointed at the artifact under test; the per-cell `linesOccluded`, the `lines` array and the occluder's tag pasted. Sixteen zeroes, or it is a fail. The **consent-answered** state is measured by the same run and **reported, not bounded** — no baseline exists for it and none is invented here. **A cell that passes AC13 by removing a line from the answer panel fails AC4.** |
| **AC14** | Any change to the consent banner's geometry **names the `PRODUCT.md` §8 reading it relies on**, in one sentence in `design.md`, and carries its **L3** ruling from `legal.md`. No geometry change, no obligation. | Read `design.md` and `legal.md`. § Out of scope 8 leaves the reading unsettled on purpose; this criterion checks that the remedy **stated** which one it assumed, so the human can overrule it in one place instead of reconstructing it from a diff. A geometry change with neither is a G4 rejection. |
| **AC15** | **`0008`'s flow-height ceiling holds.** `#salario-bruto`'s `bottom` on `/custo-da-hora` is **≤** its G1 baseline in each state, re-measured this run: `empty` **880.5**, this spec's `seeded` **864.1**, `0008` §C.3's `seeded` **832.8**. | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-firstinput.mjs` re-pointed at the artifact under test; three numbers and three deltas pasted. **An increase in any state is a finding that bounces to `tech-lead`** — the ceiling belongs to `0008`, and moving it is `0008`'s decision, not a trade this spec may make to satisfy AC1 or AC13. |

---

## Disclosure obligations

Where this change touches what the app says out loud (`PRODUCT.md` §4, *name the gap*):

1. **This change computes nothing**, so it creates no new gap to name. Its whole obligation is that
   the gaps already named stay named, in the same words — AC4 and AC5.
2. **Reachability must not be bought by saying less.** If the remedy puts a shortened form on the
   first screen, the **full text stays rendered and reachable**, and the short form never becomes
   the only place a gap is named. Whether that split is permitted at all is **L5**; until G2 rules,
   no such split is designed.
3. **A disclosure moved out of the footer is not thereby removed from the other route.** DS1 renders
   on both routes because a user can land on either; that is one obligation discharged twice, not
   redundancy (`0008` §6, O4).
4. **If a surface becomes reachable only in some storage states**, `design.md` says which, and the
   states where it does not is a number in the G6 report, not a silence.
5. **Added at run 2 with finding O.** A claim the user cannot see is a claim the app has not made.
   Covering *17:48* or *R$ 4.200,00* does not reduce what the app owes the user about them — every
   disclosure paired with a covered claim under LR6.1 stays owed, and O is discharged by uncovering
   the claim, never by dropping the claim's disclosure along with it. **L9** decides whether that is
   also a legal obligation or only this one.

---

## Non-goals

What a well-meaning downstream agent might add, and must not:

- **A "Saiba mais", "Ver detalhes", "Entenda o cálculo" or any control that replaces a rendered
  disclosure with a tap.** That is the shape CA/CB/CC already have and the shape R clause 3 exists
  to refuse.
- **A tooltip, popover, `title` attribute, drawer, accordion or dialog holding a disclosure.**
  `0008` §6, O3.
- **Any new pt-BR string** — including a "carregando", a badge, a skeleton label or a caveat next to
  the hero. `0008` §6, O1. If G2 mandates one at L5 it arrives through AC5's exemption list, and
  `content-writer` writes it.
- **A blanket `min-height` or a reserved band on the first screen** to make room. `0008` § Non-goals
  already rejected it, for `PRODUCT.md` §5's reason.
- **Shortening a disclosure so it fits.** A legal change wearing a layout costume (lesson **002**).
- **Removing DS1 from the footer**, or from one of the two routes.
- **Fixing the `0008` shift, the `0004` LCP budget or the `0007` citation** on the way past.
- **A desktop layout change.** § Out of scope 6.
- **Making the banner appear later, disappear on scroll, auto-dismiss, close without a choice, or
  render only after the first interaction.** These are the cheap fixes for O and every one of them is
  a consent *decision* change, § Out of scope 7 — LGPD correctness settled at LR4, which this gate
  has no competence over. If G2 rules at L3 that some of them are permitted, they arrive as a ruling
  in `legal.md`, not as a layout idea.
- **Shrinking the banner's text to shrink its box.** That is a `0003` string change wearing a
  geometry costume; § Out of scope 2 and the `0003` boundary row.
- **Moving the answer down, or shortening the answer panel by removing a line from it**, to get
  `linesOccluded` to zero. AC13 read alone would go green; AC2 and AC4 are what stop it, and they
  outrank it.
- **Buying AC13 with flow height above `#salario-bruto`.** AC15, and § The shared pixel budget.
- **Assuming what a smaller banner does to consent or revenue, in either direction.**
  § Out of scope 9.

**Explicitly *not* a non-goal, so nobody rules it out by analogy:** making the answer panel sticky,
reordering the mobile column, or reducing the consent banner's footprint are all legitimate remedies
for G3 to consider, bounded by AC2, AC3, AC6 and L3.

---

## Evidence available

Every row is a command run in this tree, this session, by `product-manager`. **Where a run and the
brief that opened this spec disagree, the run is what the spec records.**

| # | Claim | Command / source |
|---|---|---|
| **E1** | 19 files under `app/`, `components/`, `lib/` contain a norm, table or rate marker | `grep -rnE "(CLT\|Súmula\|Portaria\|Lei [0-9]\|art\.\|INSS\|IRRF\|RPPS\|RGPS\|Tabelas)" app components lib --include="*.tsx" --include="*.ts" -l` |
| **E2** | 4 rendered strings name a gap the computation omits | `grep -rnE "não entram\|não considera\|não inclui\|estimativ\|aproximad\|pode variar\|consulte\|convenção\|acordo coletivo\|não substitui" app components lib --include="*.tsx" --include="*.ts"` |
| **E3** | 4 literal `hint` strings exist; 2 of them (CA, CB) cite a norm and a rate | `grep -rn "hint=" components --include="*.tsx" \| grep -v "hint={"` |
| **E4** | CA/CB/CC are unmounted until a control is activated | `components/atoms/collapsible-panel.tsx:15-27` (`{isOpen ? … : null}`), `journey-form.tsx:74`/`:91`, `regime-field.tsx:19`/`:37`, read this session |
| **E5** | Position of every surface, 8 cells, 390×844, both themes, both routes | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-fold.mjs` → `evidence/g1-fold.txt` |
| **E6** | DS5 and DS6 reached and measured in their own storage states (lesson **031**) | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-ds56.mjs` |
| **E7** | The answer's anchor and the consent banner's box and `position` | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-answer.mjs` |
| **E8** | The answer is not sticky and leaves the viewport at the footer | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-scroll.mjs` |
| **E9** | Fixed/sticky chrome on the first screen: 65 + 62 + 466 = 593 px of 844 | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-chrome.mjs` |
| **E10** | The DS2 debt is **still open**, unchanged in shape | `grep -rn "Súmula 172\|DSR" __tests__ tests components lib` → 10 rows, **0 under `tests/`** |
| **E10b** | The rendered text of both routes, all 16 cells, as the AC4/AC5 baseline | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-text.mjs` → `evidence/g1-text.txt`, 16 cells |
| **E13** | **Finding O**, 16 cells: the answer panel's box, every rendered leaf line on the first screen, and the `fixed`/`sticky` boxes intersecting each. 16/16 occluded; `fixedSum` **593** in all 16 | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-occlusion.mjs` → `evidence/g1-occlusion.txt` (**run 2**) |
| **E14** | `#salario-bruto`'s box in three seed states, reproducing `0008` §C.3 under `0008`'s own seed | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-firstinput.mjs` → `evidence/g1-firstinput.txt` (**run 2**) |
| **E15** | The fixed chrome re-measured at run 2, unchanged from run 1: `header 0..65`, `nav 766..828`, `div 354..820 h=466`, `innerHeight` 844 | `node .specs/0010-disclosure-reachability-on-mobile/evidence/g1-chrome.mjs` (**re-run at run 2**) |
| **E16** | `0008`'s first-screen budget at 390 and its ≥ 12 px ruling | `.specs/0008-intermittent-layout-shift-on-custo-da-hora/design.md` §C.3, § Hierarchy |
| **E11** | The premise, and that it is not being reopened | `.specs/0008-intermittent-layout-shift-on-custo-da-hora/legal.md` §5.2, §8 Q1 |
| **E12** | LR1, LR2a, LR2b, LR3 corrected, LR6.1, O1–O5 | `.specs/0005-…/legal.md` §3, `.specs/0006-…/legal.md` §2.1, §3, `.specs/0008-…/legal.md` §4, §6 |

**Artifact:** `https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app`, branch
`fix/design-taste-preflight`, both routes `200`. Measured against the deployed preview rather than a
local build, deliberately: `AGENTS.md` §4 rule 6 makes `.next` shared mutable state during a
parallel gate, and two sibling agents were active in this tree while these runs executed.

**Reconciliation with `0008` §1.4.** DS1's `vtop` reproduces to the tenth of a pixel (1855.7,
2967.9, 3235.4) and so does DS2 (2402.8). DS5 and DS6 differ — **1233.9** and **1293.8** here
against 1363.9 and 1245.5 there — because the two runs seed different values and resolve the marker
to a different element (title vs. banner box). The delta changes nothing either document rules on:
both runs put every surface between 1,233 and 3,236 px, against a fold at 844. This spec cites its
own numbers; where the two disagree, the E5–E6 runs are the baseline AC1–AC7 compare against.

**Reconciliation with this spec's own run 1.** Everything the amendment depends on was re-measured
rather than carried forward, and two numbers moved:

- **The answer panel's box on `/`.** Run 1 recorded **128..707**; run 2 records **96..739.4**. Both
  are correct measurements of different boxes — run 1 resolved the panel as the answer label's
  nearest `section, article, div`, run 2 climbs to the outermost non-fixed ancestor under 1.2
  viewports, which is what O's subject has to be. **Run 2's box is the one AC13 binds**, and the
  occlusion conclusion is unchanged either way: the intersect is with the banner at 354, inside both.
- **The occluded strings on `/`.** Run 1 named *17:48* (433..577) and *é quando sua jornada fecha*
  (593..614). Run 2 reproduces both to the tenth of a pixel — 433.4..577.4 and 593.4..614.4 — and
  finds **two more** run 1 did not report: *Entrada às 08:00* (676.7..694.1) and the 1-px assistive
  row at 432.4..433.4. Run 1 under-counted; § Finding O records run 2's count.
- **`#salario-bruto` seeded.** `0008` §C.3's **832.8** reproduces exactly **under `0008`'s seed**
  and not under this spec's thinner one, which gives **864.1**. § The shared pixel budget states
  both rather than picking the convenient one.

Unchanged at run 2: the fixed chrome (65 / 62 / 466, sum **593**, 16/16), the answer label anchors
AC2 binds, and the DS1–DS7 coordinates in § Problem.

---

## Boundaries with the specs in flight

| Spec | Overlap | Who owns what |
|---|---|---|
| **`0003-citation-registry`** (G2, `in-progress`) | It rewrites citation strings across nine modules, including surfaces this spec may move. | **`0003` owns what a disclosure says; `0010` owns where it renders and whether it can be read.** They collide only as a merge conflict in `components/organisms/calculator-views.tsx` and `components/organisms/salary-calculator.tsx`, which `tech-lead` sequences. If a remedy here needs a **shorter** string to fit, that request goes through `tech-lead` into `0003` — never made here (§ Out of scope 2). Conversely, `0003` changing a citation's length **moves this spec's baselines**: AC1–AC7 compare against the artifact under test, and any delta from the E5–E9 numbers is reported, not assumed away. |
| **`0008-intermittent-layout-shift`** (G2 closed, `in-progress`) | `components/organisms/calculator-layout.tsx` is its measured box; its LR6, LR3-corrected and O1–O5 bind here. | `0008` owns that file and the CLS diagnosis. This spec does not edit it (§ Out of scope 4) and inherits its rules unmodified (AC6). **Added at run 2:** `0008`'s G3 closed this session and the two specs now spend the same 844 px. § The shared pixel budget draws the line — `0008` owns **flow height** above `#salario-bruto` (ceiling < 12 px, reproduced this run at 832.8 / 864.1 / 880.5, AC15); `0010` owns **occluded height** under the fixed chrome (466 px, AC13). Fixed chrome contributes zero flow height, so the compatible remedy costs `0008` nothing. A remedy needing more flow height than `0008` allows goes through `tech-lead` to `0008`; it is never taken here. |
| **`0006-salary-alert-legibility`** (`done`) | Debt **DS2** — no e2e assertion for the DSR / Súmula 172 caption; trigger is the first spec that opens `components/organisms/day-summary.tsx`, the caption type, or the `DESIGN.md` scale. | **The trigger may fire here**, since DS2 is one of the surfaces G3 could move. AC9 makes the debt land on this spec if it does, and re-routes it intact if it does not. Re-measured at G1 (E10): still open. |
| **`0004`, `0007`, `0009`** | None in file scope. | § Out of scope 4 keeps this spec out of their measurements. |

---

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| May the consent banner's **first-screen footprint** change to make a disclosure reachable? | **Yes, bounded.** It may change only as far as AC1 and AC10 require, only within whatever floor G2 sets at **L3**, and never in what it asks or stores (§ Out of scope 7). | It occupies 466 of 844 px — 55% of the screen this spec is about — and no remedy that leaves it untouched has anywhere to put a disclosure on a cold `/` load, where the unoccluded flow band is 289 px and the answer already fills it. Ruling it out would make AC1 unsatisfiable by construction. |
| If G2 rules **CA/CB/CC** in domain, does this spec fix them or route them? | **Fix only those whose claim is on the first screen; route the rest** with an owner and a trigger. | The spec's subject is the first screen. A surface whose claim the user reaches by scrolling is a real finding and a different one, and widening to it would be the improvisation § Out of scope exists to prevent. AC8 makes either answer explicit. |
| Does R become a **binding legal clause** or stay a product bar? | **Product bar**, unless G2 rules otherwise at **L6**. | `0008` §5.4 set the precedent: `labor-law-analyst` declined to attach its veto to a `PRODUCT.md` §5 criterion, on the ground that a veto covering everything covers nothing. R is stated here so a reviewer can fail it either way. |
| ~~Is the consent banner **covering the answer** part of this spec?~~ | **Closed at run 2 — the human ruled it in.** | Run 1 recorded it as open rather than absorbing it. The human decided it: fold it in, because this spec already measures the screen and holds the coordinates. It is now § Finding O, § Scope 3b and **AC13**, scored separately from R, with a partial pass as a rejection. |

Still open, and each one has a default so nothing downstream stalls on it:

| Question | Default chosen | Why |
|---|---|---|
| Does `PRODUCT.md` §8's *"ads never sit between the user and an answer"* reach the **consent gate**, or only the ad slots §8 names? | **Unresolved on purpose. The remedy names which reading it assumed (AC14); the human overrules it in one place.** | It is a `PRODUCT.md` reading and `PRODUCT.md` outranks this spec. Reading it broadly would let this gate amend §8 by inference to justify its own finding; reading it narrowly would let the banner do to the answer exactly what §8 forbids an ad to do. Neither is mine. **For the human:** if §8 covers the gate, O is decided against the banner and only L3's floor remains. |
| What does a smaller or repositioned banner do to **consent, and therefore to revenue**? | **Unmeasured, and stated as unmeasured.** § Out of scope 9 forbids a target in either direction. | Nobody in this pipeline has the number. A figure invented at G1 becomes a constraint at G5 that no evidence supports; equally, a remedy may not be rejected downstream on a revenue ground that is not written here. **For the human:** this is the one input that would settle the trade, and it has to come from outside the squad. |
| Does covering a **claim** — *17:48*, *R$ 4.200,00* — engage LR3 or LR6.1, or is O purely a product bar? | **Product bar**, unless G2 rules otherwise at **L9**. | Mirrors L6 and L7, and `0008` §5.4's precedent. Decides whether a future regression is a G2 rejection or a `tech-lead` bounce, which is a real difference and not a formality. |
