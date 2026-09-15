# 0005 — Legal verification (G6)

> Owner: labor-law-analyst · Gate: `law` (G6) · Run 1

**Verdict: pass.**

LR1–LR4, the binding rules I set at G2, are satisfied over DS1, DS2 and DS4 — at 390 and 1440, on
both routes, in **both themes**, against the production build. I did not accept the developer's
table for this: I measured all four surfaces myself, in a real browser, against a running
production server, and I read the compiled CSS artifact rather than the source that generates it.
The numbers are in §2 and §3.

Three rulings were queued for me — **B2**, **B3** and **B9**. All three are settled in §5, all three
in favour of the implementation as shipped, and one of them (**B2**) required me to correct a defect
in my own G2 text rather than in the code.

One rule of mine **fails** on one surface: **DS3 (`salary-calculator.tsx:125`) measures 24.3
characters per line at 390, against LR2's floor of 40.** This is blocker **B6**, and my G4-assigned
job was to measure it on the fixed tree and rule whether it blocks. **It does not block.** §6 gives
the reasoning and the number the next spec starts from. I am not waving it away — it is confirmed,
it is a real LR2 failure, and it now has a measurement attached to it.

Nothing is owed to users beyond the fix. The merge block stands, unchanged and unwaivable.

---

## 0. What this report covers, and what it does not

### Covered

- LR1, LR2, LR3 over DS1, DS2, DS3 — measured, both themes, both viewports (§2).
- LR1, LR2, LR3, LR4 over DS4, the granular consent dialog — measured, both themes (§3).
- The traceability of the footer's citation paragraph and the integrity of the gap list (§4).
- Rulings on **B2**, **B3**, **B9** (§5).
- The **B6 / DS3** ruling (§6).
- Whether AC6's substituted dark-theme evidence establishes legibility in dark (§7).
- Whether 0002's rules **S3**, **S4**, **S5** are satisfied in substance now (§8).
- Whether anything is owed to users beyond the fix (§9).
- L1 (disclosure text byte-identical), L3 (`lib/` untouched) (§4, §10).

### Not covered

| Not covered | Why |
|---|---|
| Every rate, bracket, ceiling, divisor and rounding step in `lib/legal-tables.ts`, `payroll.ts`, `night-shift.ts`, `weekly-rest.ts` | Verified digit by digit at `0002` G6. This spec does not reach them, and re-verifying them is work this spec did not create. I confirmed only that the files are **untouched** (§10). |
| The `@theme` token mechanism, the migration's 129 substitutions, `DESIGN.md` | Architecture and design. `tech-lead` and `product-designer`. |
| D2's hydration mechanism, `app-header.tsx`, the `dark:` cascade | Changes no number and no disclosure. Same position I took at G2, unchanged. |
| AC6's *mechanics* — whether the geometry diff proves "zero pixels moved" | `qa-engineer`'s. My narrower question about dark is answered in §7. |
| The `comment-free-code.test.ts` dispute | `tech-lead` / `refactor-scout`. See §10 F1 for the one part of it that touches a criterion I own. |

### How I measured

Read-only throughout. I ran no command that changes repository state and opened no isolated
worktree, because none was needed: the production build on disk (`.next`, BUILD ID
`kqUAz5_SXlfk66v9luOsX`) is current against every source file except `lib/utils.ts` (a comment, §10
F1), and three production servers were already serving it. I drove a headless chromium against
`http://localhost:3225` from a script in the session scratchpad — never inside the repository — and
verified that server serves the current artifact by fetching the built stylesheet chunk by name.

---

## 1. The compiled artifact — the collision is gone at the source of truth

`design.md` and `plan.md` both settled this by compiling Tailwind. I checked the thing the browser
actually downloads (lesson 005: measure the artefact the runtime loads), not the `@theme` block that
produces it.

`.next/static/chunks/0sxkru2w137k7.css`:

```
.max-w-3xl{max-width:var(--container-3xl)}      --container-3xl:48rem   → 768px
.max-w-lg{max-width:var(--container-lg)}        --container-lg:32rem    → 512px
.max-w-md{max-width:var(--container-md)}        --container-md:28rem    → 448px
.max-w-4xl{max-width:var(--container-4xl)}      --container-4xl:56rem   → 896px
```

And the only `--spacing` key that survives anywhere in the shipped stylesheet:

```
--spacing:.25rem
```

The named namespace is empty in the compiled output, not merely in the source. `max-w-4xl` at
`cookie-consent.tsx:44` — the site that resolved correctly *by luck* at G2, because no
`--spacing-4xl` happened to exist — now resolves correctly by construction. That luck is no longer
load-bearing, which is what LR1/LR2 were extended over it to guarantee.

---

## 2. LR1, LR2, LR3 over DS1, DS2, DS3 — measured

Production build, chromium, frozen only by page load order; both themes read in separate browser
contexts with `colorScheme` emulated, not by toggling a class.

### DS1 — `calculator-views.tsx:73`, the `PRODUCT.md` §4 footer

| Viewport | Theme | Rendered width | Available `A` | LR1 floor `min(320, A)` | LR1 | Whole-footer chars/line | LR2 |
|---|---|---|---|---|---|---|---|
| 390×844 | light | **358.00** | 358 | 320 | **pass** | 53.3 | **pass** |
| 390×844 | dark | **358.00** | 358 | 320 | **pass** | 53.3 | **pass** |
| 1440×900 | light | **768.00** | — | 320 | **pass** | 94.7 | **pass** |
| 1440×900 | dark | **768.00** | — | 320 | **pass** | 94.7 | **pass** |

Per paragraph, which is the granularity my §3 domain table requires ("the `<footer>` **and each of
its four `<p>`**"):

| ¶ | What it discloses | 390: chars / lineBoxes = cpl | 1440: cpl | LR2 |
|---|---|---|---|---|
| P1 | The privacy claim (nothing leaves the browser) | 150 / 3 = **50.0** | 75.0 | pass |
| P2 | D1–D4: estimate, not a holerite, not a ponto record, not advice | 170 / 3 = **56.7** | 85.0 | pass |
| P3 | **The gap list** — FGTS, CCT, 13º, terço, INSS/IRRF sobre extras, Súmula 60, feriados, intervalo suprimido, insalubridade/periculosidade, RPPS federal only | 419 / 8 = **52.4** | 104.8 | pass |
| P4 | **The table citation** — year, effective date, source link | 113 / 2 = **56.5** | 113.0 | pass |

Identical to the centavo-equivalent in dark: the same 358/768, the same line-box counts, the same
ratios. Corroborated independently by `evidence/geometry-after.json`, where the footer subtree's
`x/y/width/height` is byte-identical between the light and dark dumps at both viewports and on both
routes.

At G2 P3 measured **≈9** characters per line and the footer measured **64px**. It now measures
**52.4** and **358**. LR1 cleared by 38px at 390 and 448px at 1440; LR2 cleared by 12.4 characters
at its tightest point.

**LR3, DS1.** The four paragraphs are in the raw server-rendered HTML — I fetched `/` and grepped
the response body, not the hydrated DOM:

```
"Tudo o que você digita fica salvo apenas neste navegador"   → 1
"Não entram na conta: FGTS"                                  → 1
"Tabelas de INSS e IRRF de"                                  → 1
"Portaria Interministerial"                                  → 1
<footer class="mx-auto mt-12 max-w-3xl space-y-2 text-center text-caption text-ink-subtle text-pretty"
```

No `hidden`, no closed `details`, no `aria-expanded="false"` ancestor, `visibility: visible`,
`opacity: 1`, `display: block`, not `.sr-only`. **LR3 pass.**

### DS2 — `day-summary.tsx:233`, the DSR caption (Súmula 172 TST)

This surface only renders when `restDayPay > 0`, so it does not appear in a default page load and is
absent from the geometry dumps. I seeded the calculator's own `localStorage` keys (an 8h–20h journey
with a 1h intervalo, `grossSalary` 3000, `monthlyHours` 220) to bring it on screen and measured it.

| Viewport | Theme | Width | Available | LR1 floor | LR1 | chars/lineBoxes = cpl | LR2 |
|---|---|---|---|---|---|---|---|
| 390×844 | light | **308.00** | 308 | 308 | **pass** (attained) | 134 / 3 = **44.7** | pass |
| 390×844 | dark | **308.00** | 308 | 308 | **pass** (attained) | 134 / 3 = **44.7** | pass |
| 1440×900 | light | **667.33** | 667 | 320 | pass | 134 / 2 = **67.0** | pass |
| 1440×900 | dark | **667.33** | 667 | 320 | pass | 134 / 2 = **67.0** | pass |

At 390 the floor is `min(320, 308) = 308` and the surface attains it exactly, because 308px is the
whole content width its containing panel leaves. That is the clause working as written, not a near
miss — LR1 was deliberately expressed as `min(320, A)` so that a surface already occupying all the
width available to it cannot fail a floor it has no way to reach. **LR3**: `visibility: visible`,
`opacity: 1`, `display: block`, no collapsed ancestor.

Content intact: the text names **Súmula 172 do TST** by number, carries both assumptions, and ends
with **"Feriados não entram."** in the same visible caption. 0002's **S3** holds in substance (§8).

### DS3 — `salary-calculator.tsx:125`, the zero warning · **LR2 FAILS at 390**

| Viewport | Theme | Width | LR1 | chars/lineBoxes = cpl | LR2 |
|---|---|---|---|---|---|
| 390×844 | light | **242.00** | pass (`min(320, 242) = 242`) | 97 / 4 = **24.3** | **FAIL** (floor 40) |
| 390×844 | dark | **242.00** | pass | 97 / 4 = **24.3** | **FAIL** |
| 1440×900 | light | **601.33** | pass | 97 / 2 = **48.5** | pass |
| 1440×900 | dark | **601.33** | pass | 97 / 2 = **48.5** | pass |

Confirmed. Ruled in §6.

---

## 3. LR4 over DS4 — the granular consent dialog

Opened through the `Configurar` control, geometry read after the panel's entry transition settled.

| Viewport | Theme | Panel border-box width | LR4 cl. 1 floor `min(480, vw−32)` | LR4 cl. 1 |
|---|---|---|---|---|
| 390×844 | light | **358.00** | 358 | **pass** (attained) |
| 390×844 | dark | **358.00** | 358 | **pass** (attained) |
| 1440×900 | light | **512.00** | 480 | **pass** |
| 1440×900 | dark | **512.00** | 480 | **pass** |

512px is `--container-lg` = 32rem exactly — the value `max-w-lg` was always meant to produce, and the
value my own G2 §4 named as satisfying the clause. At 390 the panel attains 358px, the entire width
the `<dialog>`'s 16px inset leaves, which `design.md` §3.3.1 predicted as an attained maximum rather
than a near miss. At G2 this surface measured **≈24px**.

**LR2, per explanatory caption** — the granularity the tech-lead confirmed at G5 triage and which I
ratify here, grounded in my own §3 domain wording ("the privacy settings dialog, **and its
explanatory paragraphs**", plural):

| Caption | Chars | Line boxes | cpl | LR2 under B3's ruling |
|---|---|---|---|---|
| "Necessários para o funcionamento do site." | 41 | **1** | 41.0 | pass |
| "Sempre ativo" | 12 | **1** | 12.0 | pass (exempt) |
| "Ajuda a entender como o site é usado." | 37 | **1** | 37.0 | pass (exempt) |

Identical in dark at both viewports. Every caption renders on a single line box after T6's stack —
which is the outcome the stack was authorised for. See §5/B3 for why single-line-box text satisfies
LR2 and why that is not a loophole.

**LR4 clause 2 — every control that expresses a choice, fully rendered with its label.** Asserted in
`disclosure-legibility.spec.ts` over the telemetry `switch` (by accessible name, resolved through
`aria-labelledby`), `Salvar Preferências` and `Fechar configurações de privacidade`: each fully
inside the viewport and fully inside the panel's own bounds, at both viewports, in both themes, on
both routes — 16 cases, all green. I read the assertions rather than the summary line; they compare
control boxes against the panel box on all four edges with a 0.5px tolerance, which is the right
test for "inside its own bounds".

**LR4 clause 3** — the fallback ruling that a granular surface which cannot meet clauses 1 and 2
must not be offered — never fires. Clauses 1 and 2 are met. The `Configurar` entry point stands.

**The dialog's substance is unchanged.** I read the diff line by line: the only edits inside
`cookie-consent.tsx` are the sweep's spacing substitutions plus `flex-col items-start` /
`sm:flex-row sm:items-center` on exactly the two granular-consent rows. No control added, none
removed, no string changed, no token value changed, and **no `motion` prop added, removed or
retimed** — which was B7's one binding constraint on T6. The amendment's bound ("two rows, one flow
direction and alignment, below `sm`") is honoured literally.

---

## 4. Traceability and disclosure audit

Every user-visible number on these screens traces to a table in `lib/` that cites its norm, and the
citation renders.

| User-visible number | Traces to | Cited where the user can see it |
|---|---|---|
| INSS / RGPS deduction | `lib/legal-tables.ts` `RGPS_BRACKETS_2026`, `rgpsCeilingDiscount` | DS1 P4 |
| RPPS federal ladder | `lib/legal-tables.ts` `rppsFederalBrackets` | DS1 P4, and P3 names the federal-only limitation |
| IRRF brackets, parcela a deduzir, top rate | `lib/legal-tables.ts` `incomeTaxBrackets`, `topIncomeTaxRate` | DS1 P4 |
| Simplified / dependent deduction, exemption ceiling, the reduction | `lib/legal-tables.ts` `simplifiedDeduction`, `dependentDeduction`, `exemptionCeiling`, `reduction` | DS1 P4 |
| Table year and effective date | `CURRENT_LEGAL_YEAR.year`, `.effectiveFrom` | DS1 P4, rendered literally |
| The source | `CURRENT_LEGAL_YEAR.source` / `.sourceUrl` | DS1 P4, as a live link |

`lib/legal-tables.ts` is year-indexed (`LEGAL_YEARS`, `CURRENT_LEGAL_YEAR`), carries `year`,
`effectiveFrom`, `source` and `sourceUrl` as first-class fields, and is **not modified by this
spec** — `git status` lists no file under `lib/` except `utils.ts` (§10 F1). No number on these
screens is an estimate without a table behind it.

**Disclosure audit — every obligation my G2 §9 imposed, and whether it is visible:**

| Obligation | Rule | State |
|---|---|---|
| DS1 P1–P4 text byte-identical | L1, AC10, 0002 S4 | **met** — `git diff` over `calculator-views.tsx` shows **4 changed lines, all `className`**; not one character inside any `<p>` moved |
| D1–D4 in one paragraph, in the footer, no interaction | S4 + LR1/LR2/LR3 | **met** — P2, 56.7 cpl at 390, server-rendered |
| The gap list entire and unshortened | `PRODUCT.md` §4 + LR1/LR2/LR3 | **met** — P3, all ten items present, 52.4 cpl at 390 |
| Table year, effective date, source link reachable | `PRODUCT.md` §4 + LR1/LR2/LR3 | **met** — P4, 56.5 cpl at 390, link rendered with its `href` |
| DSR assumptions and "Feriados não entram" | S3 + LR1/LR2/LR3 | **met** — §2, DS2 |
| The literal `R$ 0,00`, the negation, the cause | S5 + LR1/LR2/LR3 | **text met**, LR2 fails at 390 — §6 |
| The purpose-specific choice offered and operable | LGPD art. 5º XII, 8º §4º, 9º — LR4 | **met** — §3 |

No disclosure is buried in a collapsed panel, behind an accordion, or present only to assistive
technology. Every one of them is in the server-rendered HTML.

---

## 5. Rulings on B2, B3 and B9

### B2 — LR4 clause 1's measurement basis · **ratified as implemented, and my own text was wrong**

The implementation measures `getBoundingClientRect().width` on the panel at `cookie-consent.tsx:85`.
At 1440 that reads **512.00**; the content box of the same element reads **446.00**. Under a
content-box reading DS4 would fail LR4 clause 1 at 1440 by 34px.

**Ruled: the bounding rect is correct. `legal.md` §4 clause 1's phrase "content-box width" is a
defect in my own G2 text and is corrected to the element's border-box bounding rect.**

Three reasons, in order of weight:

1. **My own worked example fixes my intent.** The same clause says "`max-w-lg` = 32rem = 512px is
   the intended value and satisfies this". 512 *is* the border box. When a rule's threshold and its
   worked example disagree, the worked example is the calibration — it is the number I actually
   checked when I set the floor. The prose was careless; the example was not.
2. **LR1 already measures the bounding rect.** A rule set where LR1 measures one box and LR4
   measures another is a rule set that generates this argument at every gate. One quantity, one
   reading.
3. **A content-box reading would reject a surface that demonstrably meets the clause's purpose.**
   The stated purpose is that "labelled toggle rows, whose label and control must sit legibly on the
   same line" have room. At 446px of content they do: both rows sit side by side, both captions
   render on one line box, and every choice control is fully inside the panel with its accessible
   name. A floor that rejects a legible, operable surface is a floor doing the opposite of its job.

And the part that matters more than the number: **clause 1 is the coarse floor, clause 2 is the
substantive protection.** What actually guarantees the LGPD art. 8º §4º choice is operable at 1440 is
clause 2 plus LR2 per caption, and both are asserted and both are green. The remedy `plan.md` held
in reserve — "one number in one assertion" — is not needed.

**Lesson to write:** state a geometric floor as a named box model, and validate the threshold against
a worked measurement of the intended state before writing it down. A floor whose prose and whose
worked example disagree is a floor that will be argued at the gate that has the least time for it.

### B3 — LR2 is unsatisfiable for strings shorter than 40 characters · **ratified, with a bound**

The implementation applies the ratio only where `lineBoxes > 1`; an element whose whole text occupies
one line box satisfies LR2 by definition.

**Ruled: correct, and it is not a loophole.** LR2 is a measurement of *wrapping quality* — its
purpose, stated at G2, is to catch text that reads as prose being broken into a narrow column. A
string that does not wrap has not been broken into anything. The "Sempre ativo" caption is the proof
by construction: 12 characters can never reach 40 characters per line at any width, so the literal
reading makes the rule unsatisfiable by the *content*, not by the layout — a defect in the rule, not
a finding about the app.

**The bound, stated so the exemption cannot grow:** the single-line-box exemption holds only where
the element's text renders **entirely within its own layout box** — no clipping, no
`text-overflow: ellipsis`, no `white-space: nowrap` overflow. A 200-character string forced onto one
line box and visually truncated would satisfy the ratio vacuously while being exactly the defect LR2
exists to catch. I verified the current surfaces are nowhere near that: DS4's three captions render
at 246.06, 80.61 and 234.09 px inside a 292px content box, fully visible. This bound is a refinement
of LR2's text for future specs and is **not** a new assertion demanded of this one — nothing here
comes close to the boundary.

### B9 — LR3's server-rendered clause applied to DS4's dialog host · **ratified, and here is what LR3 means for a consent surface**

The `tech-lead` routed this to me because it is the meaning of a legal rule. It is, and the reading
the `frontend-dev` implemented is right — but the reason given for it ("the literal clause is
unsatisfiable") is the weaker half of the answer. The stronger half is that **the literal clause was
never about DS4's panel in the first place.**

I verified the structure myself rather than take the description: `ModalDialog` renders its
`<dialog aria-modal="true" aria-labelledby={labelledBy}>` host **unconditionally**
(`components/atoms/modal-dialog.tsx:44`), gating only the inner `<div>` on `isOpen`. So the host is
genuinely in the SSR payload and the panel genuinely cannot be, in any tree, before or after this
spec. Both facts hold.

**Ruled:**

> **LR3's "present at first paint, with no interaction" clause applies to a consent surface's
> *entry point*, not to its opened panel.** For an informational disclosure — DS1, DS2, DS3 — the
> clause is literal and binding: the text must be on screen without the user doing anything, because
> a disclosure the user must go looking for is a disclosure made to the users who happen to look.
> For a granular consent surface the interaction **is** the mechanism by which the choice is
> exercised; LGPD art. 9º requires *acesso facilitado*, not a permanently open panel. Reading the
> clause literally against DS4's panel would demand the privacy dialog be pinned open on every page
> load, which no norm requires and which would degrade the very surface the rule protects.
>
> What LR3 therefore requires of DS4, and what I hold it to:
>
> 1. **The entry point to the granular choice is server-rendered and not lazy** — the path to the
>    choice must not depend on a client-only bundle that may never arrive.
> 2. **The dialog itself is server-rendered, not a client-only lazy modal** — which is what the
>    `aria-labelledby="privacy-settings-title"` marker proves.
> 3. **Every remaining LR3 clause — visible, non-zero opacity, not `display: none`, not `[hidden]`,
>    not inside a closed `details` or an `aria-expanded="false"` subtree, not off-screen — is
>    asserted on the live node after the single permitted click.**

Clause 2 is what the implementation checks, and it is correct. Clause 1 the implementation does not
check, so **I verified it myself**, in the raw server response from `/`:

```
aria-labelledby="privacy-settings-title"            → 1   (the dialog host, clause 2)
aria-label="Configurações de Privacidade"           → 1   (the persistent entry point, clause 1)
```

The persistent shield control at `cookie-consent.tsx:186` is rendered when `isVisible` is `false`,
which is the server's state on every render, so the route to the granular choice is in the first
byte of HTML the user receives. Clause 1 holds as a fact about what shipped.

**No change to any assertion is required.** I am recording clause 1 as part of LR3's meaning so that
the next consent surface this squad builds is held to it deliberately rather than by luck, the same
way `max-w-4xl` was correct by luck at G2.

---

## 6. B6 / DS3 — confirmed, and ruled a finding rather than a blocker

**Step 1 of B6 was mine: measure DS3 in a real browser at G6, on the fixed tree, and rule.** Done,
above. **Confirmed: DS3 renders 97 characters over 4 line boxes at 390 — 24.3 characters per line,
against LR2's floor of 40.** It clears LR1 (242px, the full width available to it) and LR2 at 1440
(48.5).

The three tests the `product-designer` proposed at G3 and the `tech-lead` ruled on at G4, each of
which I checked rather than accepted:

1. **Causation — this spec did not cause it.** Verified directly against the two geometry dumps:
   the DS3 subtree appears at the **identical structural path** with `width = 242` in
   `geometry-before.json` and `width = 242` in `geometry-after.json`. DS3 never resolved through the
   collided namespace. The collision neither created nor worsened it.
2. **Remedy location — outside this spec's reach.** The width is set by `alert-banner.tsx`, a shared
   atom with other consumers. Repairing it moves pixels in subtrees AC6 needs stable.
3. **Falsifiability — repairing it here would damage the instrument.** A fifth, differently-motivated
   diff inside AC6's exemption list turns AC6 from a binary criterion into an argument. AC6 is the
   only proof that D1's migration moved nothing, and it is the instrument this spec exists to build.

To those three I add the one that is mine and that decides it:

4. **DS3 is not a surface where a legal obligation is discharged.** DS1 P3 is `PRODUCT.md` §4's gap
   list; DS1 P4 is its table citation; DS4 is where an LGPD art. 8º §4º consent is recorded. Each of
   those, rendered illegibly, produces a specific harm: a user who believes the líquido is complete,
   a figure with no traceable source, a stored record of a choice the user could not make. **DS3
   discharges no obligation.** It explains why the fields below read `R$ 0,00` — a data-entry
   warning about an input the user has not yet given. Its text omits no variable a payslip includes
   and cites no table. 0002's **S5**, which governs what it must say, is satisfied in full: the
   literal `R$ 0,00` survives, the negation survives, the cause survives, and it sits above the
   fields showing the zeroes. What fails is my own typographic floor, applied — correctly, by
   design — to a surface that is in the LR domain because a rule naming only what is broken today
   ships with an exception (lesson 006).

**Ruled: a confirmed finding, not blocking.** And the decisive consideration is the asymmetry, which
I want on the record because it is the reason a "no partial pass" analyst passes here. Blocking at
G6 holds the entire PR stack, which means the 64px `PRODUCT.md` §4 disclosure and the 24px consent
dialog stay unfixed — not in production, but unfixed — while a pre-existing, non-obligatory, narrow
but readable caption is repaired inside a shared atom that has no geometry baseline and no
acceptance criterion. That trade makes the product's legal position worse, not better. A veto that
costs more legibility than it buys is a veto used wrongly.

**What is owed, and it is not optional:** `product-manager` opens a spec for `alert-banner.tsx`,
with DS3's measured numbers as its starting point — **242px, 97 characters, 4 line boxes, 24.3
characters per line at 390; 601.33px and 48.5 at 1440; identical in both themes** — and with the
requirement that any remedy be checked against `alert-banner.tsx`'s other consumers, since the
widened measure will reach them too. This finding does not expire with this spec and is not closed
by 0005 shipping.

---

## 7. AC6's dark-theme evidence — my narrower question, answered

The `frontend-dev` reports dark's literal before/after geometry diff is contaminated by D2's own
pre-existing hydration crash (the `before` dark tree for `/` has 212 elements and no
`main:nth-child(5)` path at all), and substituted an after-dump light-vs-dark cross-check. The
`qa-engineer` is examining whether that substitution is sound for AC6. My question was different:
**does the substituted evidence still establish that the disclosures are legible in dark?**

**It does not need to — and the answer is yes anyway, by a stronger route than the substitute.**

The distinction is the whole of my answer, and it is worth stating plainly because it is easy to
conflate the two criteria:

- **AC6 is a regression criterion.** "Zero pixels moved" is a *relative* claim about two states, and
  it needs a clean `before`. That is where the contamination bites, and that is `qa-engineer`'s
  question.
- **LR1–LR4 are absolute properties of the shipped state.** They ask what the disclosure measures
  *now*, in dark, on the production build. They make no reference to a `before` at all. A
  contaminated `before` cannot weaken them, because they never depended on one.

So the dark-theme question reduces to: was LR1–LR4 measured in dark? It was, three times over:

1. **By me, directly**, in a dark browser context: DS1 358/768 with 53.3/94.7 cpl; DS2 308/667.33
   with 44.7/67.0; DS3 242/601.33 with 24.3/48.5; DS4 358/512 with captions at 41/12/37 — every
   figure identical to its light-theme counterpart.
2. **By `evidence/geometry-after.json`**, whose dark dumps are clean on both sides and give the
   footer subtree byte-identical `x/y/width/height` to the light dumps at both viewports on both
   routes.
3. **By `disclosure-legibility.spec.ts`**, 16 cases, half of them dark, all green — and, crucially,
   those same 16 cases were **seen red** against the unfixed tree at T2, naming DS1 and DS4 at both
   viewports in both themes. An assertion that has been red is an assertion that measures something
   (lesson 012, lesson 016).

**Conclusion: LR1–LR4 are verified in dark on their own evidence, and the AC6 contamination does not
reach them.** I take no position on whether the substituted cross-check is sufficient for AC6 — that
is `qa-engineer`'s gate, and if AC6 fails there it fails on regression grounds, not on legibility
grounds.

One observation offered to `qa-engineer` rather than asserted at them: the fact that the `before`
dark tree is *structurally* different is itself the cleanest available evidence that the dark
before/after pair was never a geometry comparison. It compares a crashed-and-rebuilt tree to a clean
one. Nothing about D1's migration is measurable in that pair in either direction.

---

## 8. S3, S4 and S5 of `.specs/0002` — satisfied in substance now

My G2 §2.5 answered this against the *broken* tree and left it to be re-answered against the
container that actually renders. Re-answered, with the container rendering:

| Rule | Surface | G2 verdict | G6 verdict |
|---|---|---|---|
| **S3** | DS2, the DSR caption | satisfied in substance | **satisfied.** Súmula 172 named by number, both assumptions present, "Feriados não entram." in the same visible caption directly below the row it qualifies. Now additionally clearing LR1 (attained) and LR2 (44.7 at 390). |
| **S4** | DS1 P2, the D1–D4 disclaimer | passed on its own terms while the disclosure was **not being made** | **satisfied, and now actually made.** All six of S4's prohibitions still hold — four disclosures, one paragraph, in the footer, no interaction, no weakened verb — and LR1/LR2/LR3 now hold over the same string: 56.7 cpl at 390, server-rendered, visible. The hole I identified at G2, that S4 regulated the DOM position of the string and never its rendered condition, is closed by LR1–LR4 attaching to it as a rendering condition. |
| **S5** | DS3, the zero warning | satisfied in substance | **satisfied as to content** — the literal `R$ 0,00`, the negation and the cause all survive, above the fields showing the zeroes. **Its LR2 rendering condition fails at 390** (§6), which is a finding against LR2, not against S5. |

S3, S4, S5, S6, S9 and S10 stand unchanged. LR1–LR4 remain additive to them.

---

## 9. Does the defect require anything beyond the fix? — No, unchanged

Re-verified at this gate rather than carried forward on my G2 note, because the branch has moved:

```
$ git show main:app/globals.css | grep -cE '^\s*--spacing-'
0

$ git show main:components/organisms/calculator-views.tsx | grep -n '<footer'
71:  <footer className="mx-auto mt-12 max-w-3xl space-y-2 … text-neutral-600 dark:text-neutral-400 …">

$ git show main:components/organisms/cookie-consent.tsx
ABSENT
```

Unchanged from G2 in every respect. `main` declares no named spacing key, so its footer resolves
against stock `--container-3xl` = 768px and always has. The consent dialog does not exist on `main`
at all. **No user was ever shown a 64px disclosure; no consent was ever collected through a 24px
dialog.** The affected population is empty. Nothing is owed to users: fix it, ship it, say nothing.

A detail worth noting because it is the cleanest possible confirmation that the migration restored
rather than redesigned: the footer's shipped `className` is now
`mx-auto mt-12 max-w-3xl space-y-2 …` — **the same spacing utilities `main` carries today**. The
repair returns the element to the geometry production has always had.

**The merge block stands, restated in my own terms and unchanged:**

> **The PR stack #32→#37 does not merge until DS1 and DS4 satisfy LR1–LR4.** They now do, on my own
> measurement. The block is therefore **discharged as to its legal condition** — but it is
> discharged by this spec *shipping*, not by this report existing. If 0005 does not land, the block
> is live and merging the stack ships a 64px `PRODUCT.md` §4 disclosure and an inoperable LGPD
> art. 8º §4º consent surface.

This remains binding on `release-manager` at G8 and is not waivable by design, scope or schedule
(`AGENTS.md` §4, rule 8).

---

## 10. Findings

Never a patch. Each one is an instruction to `tech-lead` to route.

| # | Severity | File / line | What the code or the evidence does | What is required | Owner |
|---|---|---|---|---|---|
| **F1** | medium — **not** a legal defect | `lib/utils.ts:16-17` | Two comment lines documenting a `tailwind-merge` configuration hazard are **removed in the working tree right now**. `reports/qa.md` §T9 states `git diff --stat -- lib/` is empty and AC11 is met; at the time I read the tree it is not — `git status --porcelain lib/` returns `M lib/utils.ts`. The `frontend-dev` restored it once and a concurrent process removed it again (`STATUS.md` § Decisions, "G5 T6"/"G5 T9, escalated"). | **L3 and AC11 hold in substance and I do not reject on this**: no table, rate, bracket, ceiling or rounding step is touched — `lib/legal-tables.ts`, `payroll.ts`, `night-shift.ts`, `weekly-rest.ts` and `compliance.ts` are all unmodified, and the spacing migration never reached `lib/`. But AC11's *evidence as written is stale*, and a G7 reviewer running `git diff --stat` sees `lib/` touched. Reconcile the evidence or the tree before G7. | `tech-lead`, with `qa-engineer` and `refactor-scout` — the `comment-free-code.test.ts` dispute is theirs, not mine |
| **F2** | low — carried forward, **out of 0005's reach** | `lib/legal-tables.ts:48` | `sourceUrl` is `https://www.legisweb.com.br/legislacao/?id=489284` — a commercial legislation aggregator. It is the URL DS1 P4 renders as the app's one traceability link. | My own bar is "prefer the primary text over any commentary": a `PRODUCT.md` §4 citation should resolve to the DOU, gov.br or planalto text of Portaria Interministerial MPS/MF nº 13/2026, not to a mirror that may move, paywall or drift. **Explicitly not a rejection of 0005**: the value was settled at 0002 G6, this spec cannot touch `lib/` (AC11/L3), and the `source` string itself names the portaria correctly by number and date, so the citation is traceable by a reader even if the link rots. | `product-manager` — fold into the next spec that legitimately opens `lib/legal-tables.ts`; I will re-verify the primary URL against the DOU at that gate |
| **F3** | rule defect — **mine**, corrected in this report | `legal.md` §4, LR4 clause 1 | The clause says "content-box width" and its own worked example says 512px, which is the border box. The two readings differ by 66px at 1440 and disagree on the verdict. | Corrected to the border-box bounding rect, consistent with LR1 (§5/B2). No code change. A lesson is written. | me |

**No finding is a rejection.** There is no user-visible number without a table, no table without its
norm and effective date, no missing disclosure, and no rounding or order-of-operations decision left
to the implementation — this spec introduces none.

---

## 11. Verification summary

| Rule | DS1 footer | DS2 DSR caption | DS3 zero warning | DS4 consent dialog |
|---|---|---|---|---|
| LR1 — rendered width ≥ min(320, A) | **pass** 358 / 768 | **pass** 308 (attained) / 667.33 | **pass** 242 (attained) / 601.33 | **pass** 358 / 512 |
| LR2 — ≥ 40 chars per line box | **pass** 52.4–56.7 / 75–113 | **pass** 44.7 / 67.0 | **FAIL 24.3** @390 · pass 48.5 @1440 | **pass** (B3: single line box) |
| LR3 — first paint, visible, no interaction | **pass** (SSR verified) | **pass** | **pass** | **pass** (B9 reading, both clauses verified) |
| LR4 — consent clauses 1–3 | n/a | n/a | n/a | **pass** (B2 reading) |
| Both themes | **identical** | **identical** | **identical** | **identical** |

Every cell above is a number I read myself, at 390×844 and 1440×900, in `light` and `dark`, against
the production build.

**Verdict: pass.** The disclosure this product's entire positioning rests on is being made again,
and the granular consent choice is offered in a form a person can operate. Both were measured, in
both themes, against the page that ships.
