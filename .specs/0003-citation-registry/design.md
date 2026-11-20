# 0003 — Design

> Owner: product-designer · Gate: `design` · Run 2

## 0. What this gate had to decide, and what it measured

This spec ships no new number, no new control and no new screen. It replaces one wrong citation with
several right ones and adds five disclosures (`legal.md` §11 D1–D6) to surfaces that already exist.
So the entire design question is **geometry**: a citation is longer than the thing it replaces, and
every one of these surfaces is bound by `0006 legal.md` §3's corrected **LR2a** (occupancy) and
**LR2b** (measure), plus `0005 legal.md` §3's **LR1** and **LR3**.

Per lesson 050, **every number below was measured, in the state that renders it, on a production
build**, never projected. The method, the isolation and the raw output are in §10. Where a state
could not be reached, the cell says so; there are no estimates in this document.

**Run 2 re-measured every slot with the strings `copy.md` actually delivers**, not with a corpus.
Run 1 was written before `copy.md` closed and sized each slot from a 400-character pt-BR corpus; run 2
put `F-1`, `F-2`, `J-1`, `D-1`, `D-2`, `D-3`, `R-2`, `S-1` and `P-1` into the live DOM in the state
that renders each and read the box. Every run-1 figure that run 2 re-read reproduced to the centésimo
(`M3`'s +86.95, `M5`'s 258.00/35.50, `M8`'s 188.86). **Three run-1 statements did not survive
contact with the delivered strings and are corrected in place**; each correction is marked *(run 2)*
and carries its measurement in §10.2:

- **`D4`'s rendering condition was wrong.** Run 1 gated the night-premium disclosure on
  `nightMinutes > 0`. The row *"Adicional noturno 20%"* is **unconditional** in the balance block —
  measured at a 18:00 exit it renders `0h 0m / R$ 0,00` — so the disclosure of that 20% is
  unconditional too. `copy.md`'s `D-3` had already ruled this from the claim (lesson 047); run 1's
  design contradicted it from the slot. §5.3, §6 and §8 are corrected.
- **The journey panel's padding step is not what makes `J-1` legible.** The delivered `J-1`
  (164 chars) measures **41.00 cpl at the shipped `p-6`** and **41.00 cpl at `px-3`** — identical.
  The padding step survives for LR2a under the panel reading of `surfaceRoot` (§11 Q2), not for
  LR2b. §7's S4 said the opposite.
- **Two strings that changed had no slot at all in run 1** — `S-1`, the *Custo da Hora* subtitle,
  which now carries CLT art. 59 §1º, and `D-2`, the DSR row label. Both are measured and slotted in
  §7 as S12 and S13. `D-2` is the one slot in this spec where the delivered string **does not fit**
  and the named fallback is taken.

The three findings that decided the layout, all measured before anything was drawn:

1. **The obvious shape for the footer's source line — a list, one row per norm — fails LR2b at 390.**
   Rows of 65–77 characters land at **32.5 / 34.5 / 38.5 cpl**, below the floor of 40. The running
   paragraph the footer already uses measures **55.00 cpl** for the same content. The list loses.
2. **The hint column in the journey settings panel is too narrow to carry a sourced sentence.** At
   390 it is **258.00 px** and its measured capacity is **exactly 40.00 cpl**, so only strings whose
   length is an exact multiple of 40 can clear LR2b. Today's string already fails at **35.50**.
3. **The regime field's collapsed summary column is 188.86 px at 390 — capacity 28.57 cpl.** No
   disclosure can live there. D3 therefore gets its own full-width slot below the control, measured
   at **308.00 px / 50.00 cpl**.

## 1. Intent — what the eye does in the first two seconds at 390

Nothing changes in the first two seconds, and that is the design goal (`spec.md` AC10).

- **0–1 s** — the hero. The exit time on `/`, the `Valor por <período>` figure on `/custo-da-hora`.
  Untouched by this spec, except that when — and only when — the user has deliberately chosen
  **Ano**, one 12 px line appears under the period selector. It sits *below* the numeral and below
  the selector, so it never occupies the space the answer appears in (`PRODUCT.md` §8).
- **1–2 s** — the card under the hero: "Sua Jornada" / "Custo da Hora" and its fields. The two new
  disclosure slots on this route (D3, D4) are 12 px captions attached to rows that already exist;
  neither adds a heading, a border, an icon or a colour. **D4 is always there** — it qualifies a row
  that always renders — so it is part of the card's resting shape, not something that appears on a
  keystroke; the eye meets it once and stops noticing it, which is what a floor disclosure should do.
- **Later, on purpose** — the footer. This is the deep-dive reader `spec.md` § Audience names: they
  have their number and have decided to check it. The footer's fourth paragraph is where they land,
  and it is the only place in this spec where the amount of text grows materially: **+86.95 px of
  footer height at 390**, all of it below every result.

The discipline: **no new surface, no new control, no new colour, no new elevation level.** Every
disclosure is a caption at an existing type step, in an existing colour role, attached to the number
it qualifies.

## 2. Layout

### 2.1 What is true at all four reference widths

Measured, not read off the stylesheet (lesson 028). The root font size and the footer's own width at
each width, taken from the running build:

| Viewport | Root font-size | Footer width | Footer height today | Footer height with the candidate source paragraph | Δ | `document.documentElement.scrollWidth` |
|---|---|---|---|---|---|---|
| 390×844 | **16px** | 358.00 px | 302.25 px | **389.20 px** | **+86.95** | 390 — no overflow |
| 1440×900 | **16px** | 768.00 px | 180.52 px | **232.69 px** | **+52.17** | 1440 — no overflow |
| 2560×1440 | **18px** | 864.00 px | 203.06 px | **261.75 px** | **+58.69** | 2560 — no overflow |
| 3840×2160 | **18px** | 864.00 px | 203.06 px | **261.75 px** | **+58.69** | 3840 — no overflow |

2560 and 3840 are **one band, not two** — same root, same container, byte-identical geometry.
Lesson 028's rule applied: the boundary was resolved in the browser, and the two rows of this table
are verified as one row because they *are* one row.

### 2.2 390 — the design target

One column, hero first, as today. Nothing reflows, nothing collapses, nothing moves, and nothing
changes width. **Ten regions grow taller, one is unchanged in height, and one is shortened** — the
`D-2` row label, which is the only place a delivered string was not taken whole (§7 S13):

| Region | What grows | Measured cost at 390 |
|---|---|---|
| `#main-content > footer`, P3 | `(Súmula 60 do TST)` → `(Súmula 60, II, do TST)` | +5 characters, **0.00 px** — P3 stays at 8 line boxes (419 → 424 chars), measured on the delivered `F-2` |
| `#main-content > footer`, P4 | one norm → one fragment per norm, each with its own date and link | **+86.95 px** on the footer as a whole |
| `day-summary`, the variable-pay block | D4, one new caption, **unconditional** *(run 2)* | 122 chars → **3 line boxes, 52.17 px** in a 308.00 px column |
| `day-summary`, the DSR row | the row label grows 19 → 26 chars | **the 26-char label wraps to 2 line boxes and doubles the row, 21.00 → 42.00 px.** The named 23-char fallback holds 1 line box at 21.00 px — see §7 S13 |
| `day-summary`, the DSR caption | `D-1`, 134 → 255 chars | **52.17 → 86.95 px**, 3 → 5 line boxes in a 308.00 px column |
| `salary-calculator`, the regime card | `R-2`, 292 → 463 chars | card body **187.00 → 271.00 px**, 9 → 13 line boxes in a 249.00 px column |
| `salary-calculator`, the regime field | D3, one new caption; **its string is owed — §11 Q3** | budget in a 308.00 px column, §7 S6 |
| `salary-calculator`, the subtitle | `S-1`, 163 → 191 chars | **105.00 → 126.00 px**, 5 → 6 line boxes in a 244.00 px column |
| `salary-calculator`, the hero | D6, one new caption, only when **Ano** is selected | 162 chars → **4 line boxes, 69.56 px** in a 294.00 px column |
| `journey-form`, the settings panel | the panel's horizontal padding drops one step **below `sm` only** | hint column **258.00 → 282.00 px**; panel width unchanged at 308.00 px. **LR2a only — the hint's own measure is 41.00 cpl either way** *(run 2)* |
| `journey-form`, the hint | `J-1`, 142 → 164 chars | **69.56 px, unchanged** — 4 line boxes before and after |
| `day-summary`, the compliance banners | the one reachable banner gains a norm | `daily-overtime-limit` **+0.00 px** — 211 chars still land on 6 line boxes |

**Nothing is pushed off-viewport and nothing overflows.** `scrollWidth == viewport width` at all four
widths with the candidate footer paragraph in the DOM.

### 2.3 1440, 2560, 3840

The Scale-Don't-Reflow Rule holds: no new column, no revealed content, no panel. The 7/5 split, the
sticky hero and the `--container-app` step are untouched. Every new slot inherits the column its
parent already owns:

| Slot | 390 | 1440 | 2560 | 3840 |
|---|---|---|---|---|
| Footer paragraph | 358.00 px | 768.00 px | 864.00 px | 864.00 px |
| D1 — field hint in the settings panel | **282.00 px** (`px-3`) | 296.67 px (`sm:px-6`, unchanged) | 439.00 px | 439.00 px |
| D3 — regime caption | 308.00 px | 667.33 px | 961.00 px | 961.00 px |
| D4 — night-premium caption | 308.00 px | 667.33 px | 961.00 px | 961.00 px |
| D6 — hero caption | 294.00 px | 418.67 px | 621.00 px | 621.00 px |
| DS7 — compliance banner body | 282.00 px | 641.33 px | — | — |
| `R-2` — regime card body | 249.00 px | 608.17 px | 887.30 px | 887.30 px |
| `S-1` — subtitle | 244.00 px | 603.33 px | 892.00 px | 892.00 px |
| `D-2` — DSR row label column | 175.44 px at 26 chars (wraps); **161.06 px at the 23-char fallback** | 181.95 px (1 line box) | — | — |

The DS7 row is measured at the two viewports `0006`'s LR2 names; 2560/3840 were not driven to the
compliance-warning state and the cells are left blank rather than filled with a projection.

## 3. Component tree

Reuse before new (`AGENTS.md` §8). **Ten of the thirteen rows are an existing component rendering a
different string**; the other three are one `<p>` added inside a component that already exists. No
new file, no new atom, no new molecule, no new prop.

| # | Element | Level | Status | Path |
|---|---|---|---|---|
| 1 | Legal footer, P1–P4 | organism | **reuse, extend P4** | `components/organisms/calculator-views.tsx` |
| 2 | Source fragment — label + norm link + effective date | — | **reuse** the existing `<a>` treatment at `calculator-views.tsx:93`, repeated | `components/organisms/calculator-views.tsx` |
| 3 | D1 — hint under *Adicional acima de 2h (%)* | molecule | **reuse** — `Field`'s `hint` prop, already wired to `aria-describedby` | `components/molecules/field.tsx` |
| 4 | D1's container — journey settings panel | organism | **extend** — horizontal padding below `sm` only, **and only if §11 Q2 rules `surfaceRoot` is the panel**; LR2b is satisfied either way (§7 S4) | `components/organisms/journey-form.tsx` |
| 5 | D3 — regime gap caption | molecule | **new slot inside an existing component**: one conditional `<p>` after the disclosure button, inside the existing `<fieldset>` | `components/molecules/regime-field.tsx` |
| 6 | D4 — night-premium floor caption | organism | **new slot inside an existing component**: one conditional `<p>` in the variable-pay block, immediately after the night row group | `components/organisms/day-summary.tsx` |
| 7 | D6 — "Ano" approximation caption | organism | **new slot inside an existing component**: one conditional `<p>` after `PeriodSelector`, inside the hero's children | `components/organisms/salary-calculator.tsx` |
| 8 | D2, D7 — the gap paragraph | organism | **reuse**, text only | `components/organisms/calculator-views.tsx` |
| 9 | DS7 — compliance banners | atom | **reuse**, text only | `components/atoms/alert-banner.tsx` |
| 10 | DS2 — DSR caption (`D-1`) | organism | **reuse**, text only | `components/organisms/day-summary.tsx` |
| 11 | `D-2` — the DSR row label | organism | **reuse**, text only — the existing `<span>` at `day-summary.tsx:225`; **the 23-char fallback ships, not the 26-char candidate** (§7 S13) | `components/organisms/day-summary.tsx` |
| 12 | `R-2` — the Estatutário regime card body | molecule | **reuse**, text only — the `impact` leaf `<span>` inside the regime `<label>` | `components/molecules/regime-field.tsx` |
| 13 | `S-1` — the *Custo da Hora* subtitle | organism | **reuse**, text only | `components/organisms/salary-calculator.tsx` |

**No new component, no new atom, no new variant prop.** D3, D4 and D6 are a `<p>` at
`text-caption text-ink-subtle text-pretty` — the hint style `DESIGN.md` § Fields already defines and
that `regime-field.tsx:81`, `day-summary.tsx:234` and `journey-form.tsx:121` already render. D6 is
the same `<p>` in the hero's own text colour.

## 4. Tokens

Every value is a token from `app/globals.css`. No hex, no arbitrary value, no `dark:` twin — every
pair below resolves through the theme, not through a variant.

| Element | Property | Token | Light value | Dark value |
|---|---|---|---|---|
| Footer P1–P4 | type step | `--text-caption` (0.75rem / 1.45 / +0.012em / 400) | same | same |
| Footer P1–P4 | colour | `--color-ink-subtle` | `#696f79` | `#898e98` |
| Footer P1–P4 | surface behind | `--color-canvas` | `#f9fafc` | `#0f1116` |
| Footer | vertical rhythm between paragraphs | `space-y-2` = `calc(var(--spacing) * 2)` = 8px | same | same |
| Footer | top offset | `mt-12` = `calc(var(--spacing) * 12)` = 48px | same | same |
| Footer | max width | `max-w-3xl` (48rem — the container scale, **not** `--spacing-3xl`, which stays absent per The Numeric Scale Rule) | same | same |
| Source link, rest | colour | inherits `--color-ink-subtle` | `#696f79` | `#898e98` |
| Source link, rest | decoration | `underline underline-offset-2` | same | same |
| Source link, hover | colour | `--color-accent-ink` | `#1f57c7` | `#91b6f9` |
| Source link, hover | transition | `--duration-fast`, `--ease-standard` | same | same |
| Source link, focus-visible | outline | `--color-focus` 2px, offset 2px (base layer `:focus-visible`) | `#2a62d1` | `#91b6f9` |
| D1 hint | type step | `--text-caption` | same | same |
| D1 hint | colour | `--color-ink-subtle` | `#696f79` | `#898e98` |
| D1 hint | surface behind | `--color-surface-sunken` | `#f2f4f7` | `#13161b` |
| D1 hint | offset from its control | `space-y-2` = 8px (`Field`'s wrapper) | same | same |
| Settings panel | horizontal padding | `px-3` below `sm` (= `calc(var(--spacing) * 3)` = 12px), `sm:px-6` (24px) from 640px | same | same |
| Settings panel | vertical padding | `py-6` = 24px, **unchanged** | same | same |
| Settings panel | fill / border / radius | `--color-surface-sunken` / `--color-line` / `--radius-lg` — all unchanged | same | same |
| D3 caption | type step / colour | `--text-caption` / `--color-ink-subtle` | `#696f79` | `#898e98` |
| D3 caption | surface behind | `--color-surface` | `#ffffff` | `#181b21` |
| D3 caption | offset from the regime button | `space-y-2` = 8px (the `<fieldset>`'s existing rhythm) | same | same |
| D4 caption | type step / colour | `--text-caption` / `--color-ink-subtle` | `#696f79` | `#898e98` |
| D4 caption | surface behind | `--color-surface` | `#ffffff` | `#181b21` |
| D4 caption | offset from the pay rows | `space-y-3` = 12px (the block's existing rhythm) | same | same |
| D6 caption | type step | `--text-caption` | same | same |
| D6 caption | colour | `--color-ink-onfill` at 90% (`text-ink-onfill/90` — the hero's secondary-text rule, `DESIGN.md` § Hero panel) | `#ffffff` @ 0.9 | `#ffffff` @ 0.9 |
| D6 caption | surface behind | `--color-accent` (theme-invariant hero fill) | `#2a62d1` | `#2a62d1` |
| D6 caption | offset from the selector | `mt-3` = `calc(var(--spacing) * 3)` = 12px | same | same |
| DS7 banner | fill / text / border | `--color-overtime-soft` / `--color-overtime-ink` / `--color-overtime` @ 30% | `#faf4ea` / `#905e16` | `#3a2f1f` / `#f8b35d` |
| DS7 banner | padding | `px-3 py-4` — **unchanged**, `0006`'s LR2a budget | same | same |

**Spacing values used: 2, 3, 6, 12 — all four are on The Eight Steps Rule's scale.** No `p-5`, no
`p-10`, no arbitrary length, no `rem` literal.

## 5. States

### 5.1 Source link in the footer — the only interactive element this spec adds instances of

Today the footer carries **one** link; after this change it carries **three to five**. The treatment
is the one already shipped at `calculator-views.tsx:93`; it is restated here so it is specified
rather than inherited by accident.

| State | Colour | Decoration | Outline | Transform | Notes |
|---|---|---|---|---|---|
| rest | `--color-ink-subtle` | `underline underline-offset-2` | none | none | Underline carries the affordance, so it is not colour-only (WCAG 1.4.1) |
| hover | `--color-accent-ink` | unchanged | none | none | `transition-colors` over `--duration-fast` with `--ease-standard` |
| focus-visible | `--color-ink-subtle` | unchanged | `2px solid var(--color-focus)`, `outline-offset: 2px` — from the base-layer `:focus-visible`, never removed | none | The 2px transparent gap paints `--color-canvas`, which is ≥3:1 against the ring in both themes |
| active | `--color-accent-ink` | unchanged | ring persists while focused | **none** | An inline text link takes no press scale — The press applies to pressable *controls*; scaling a word inside a paragraph reflows the line |
| disabled | — | — | — | — | **Not applicable.** A citation link is never disabled; a norm with no reachable official URL blocks the spec (`spec.md` § What "primary source" means) rather than shipping a dead link |
| loading | — | — | — | — | **Not applicable.** Nothing is fetched at runtime (`spec.md` § Non-goals) |
| error | — | — | — | — | **Not applicable.** Link validity is a CI concern, never a runtime state |
| empty | — | — | — | — | **Not applicable.** A fragment with no URL does not render as a link; it renders as plain text and the spec blocks before that ships |
| live-updating | — | — | — | — | **Not applicable.** The footer does not change as the user types |

### 5.2 Journey settings panel — the padding change

| State | Behaviour |
|---|---|
| rest | `--color-surface-sunken`, `--radius-lg`, 1px `--color-line`, `px-3 py-6` below `sm`, `sm:px-6` from 640px |
| hover / active / disabled / error | **Not applicable** — the panel is a container, not a control. Its disclosure button (`aria-controls="journey-settings"`) is unchanged and keeps its own rest/hover/focus-visible/active states |
| focus-visible | Not focusable. Focus enters its fields, each of which keeps `components/atoms/input.tsx`'s states unchanged |
| loading | Not applicable |
| empty | Not applicable — the panel always holds three fields |
| live-updating | The two percentage fields already update the summary as the user types; **the hint text below them is static** and does not re-render on a keystroke |

### 5.3 D3, D4, D6 — the three conditional captions

None is interactive. Each has exactly two states, and the condition is its **own** number, never a
sibling's (lesson 049):

| Slot | Present when | Absent when | Rest |
|---|---|---|---|
| D3 | the selected regime is the one whose ladder is federal-only | any other regime is selected | `--text-caption` / `--color-ink-subtle`, full field width |
| D4 | **always, whenever the day's balance block renders** *(run 2)* | the balance block does not render | `--text-caption` / `--color-ink-subtle`, full card width |
| D6 | the **Ano** period is the selected period | any other period is selected | `--text-caption` / `text-ink-onfill/90`, full hero content width |

**Why D4 has no condition, corrected at run 2.** Run 1 gated it on `nightMinutes > 0`. Driven at a
18:00 exit, the row renders *"Adicional noturno 20% · 0h 0m · R$ 0,00"* — the string `20%` is on
screen with nothing qualifying it, which is the exact state the disclosure exists for. The condition
is derived from the claim, not from the slot (lesson 047), and `copy.md`'s `D-3` had already ruled
it. **A developer must not re-introduce the `nightMinutes > 0` guard**; the only guard D4 shares is
the balance block's own.

**Co-presence (LR6.1).** Each caption mounts in the same render as the value it qualifies, from the
same condition, with no fetch and no effect between them: the disclosure can never paint a frame
after its claim. `frameIndex(disclosure) − frameIndex(claim) = 0` by construction, because both are
branches of one conditional in one component.

**Hover, focus-visible, active, disabled, loading, error: not applicable to any of the three** — they
are static text with no control, no `tabindex` and no ARIA role.

## 6. Motion

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion path |
|---|---|---|---|---|---|---|
| Source link | pointer enter / leave | `color` | `--duration-fast` (160ms) | `--ease-standard` | 0 | **Kept.** A colour transition is not vestibular motion, and the scoped reset in `globals.css` already clamps `transition-property` to `opacity, color, background-color, border-color, outline-color` and the duration to `--duration-fast`. No neutralizer needed because no transform is involved |
| D1's container (settings panel) | the disclosure button | `height`, `opacity` | `--duration-base` (220ms) | `--ease-out` | 0 | **Unchanged, and knowingly incomplete.** `CollapsiblePanel` animates `height: 0 → auto` through `motion`, which neither `MotionConfig reducedMotion="user"` nor the CSS reset reaches — the residual `DESIGN.md` § Motion already records, with `product-designer` as owner. **This spec does not open `collapsible-panel.tsx`, so the residual's trigger does not fire here**; it is restated so the next gate does not read silence as absence |
| D3 caption | regime selection | **none** | — | — | — | Nothing to reduce. The caption appears in the same frame as the selection |
| D4 caption | **none — it mounts with the balance block and never toggles** *(run 2)* | **none** | — | — | — | Nothing to reduce |
| D6 caption | period selection | **none** | — | — | — | Nothing to reduce |
| Footer P4 | — | **none** | — | — | — | Static on every paint |

**No new animation is introduced by this spec, and none of the three new captions animates.** That is
deliberate and it follows two rules at once: The Numbers-Don't-Move Rule (a disclosure attached to a
figure the user is reading must not fade in under it) and `DESIGN.md`'s prohibition on anything
triggered by a keystroke. The period selector's own pill keeps its `layoutId` spring; the caption
below it simply is or is not there.

**Pairing check.** This spec adds no state-bound transform, so there is no
`hover:-translate-*` / `motion-reduce:hover:translate-*` pair to declare. Every transform already in
these files (`rotate-90` on the settings gear, `rotate-180` on the regime chevron,
`-translate-x-1/2` on the tab bar) is untouched and keeps its existing handling.

## 7. Copy slots

Slots only. Every pt-BR string is `content-writer`'s. **`copy.md` is closed, so every slot below
except S6 carries its delivered string, rendered in the box, at run 2.**

**How to read the budget.** For each slot run 1 measured the **characters per rendered line box**
that the real column carries at 390, using a 400-character pt-BR corpus in the live DOM. Call it `C`.
LR2b requires `chars / lineBoxes ≥ 40`, and `lineBoxes = ceil(chars / C)`, so a string of `N`
characters clears the floor exactly when `N ∈ [40k, Ck]` for some integer `k ≥ 1`. A string of
`N ≤ C` occupies one line box and takes LR2b's single-line-box exemption. The windows are the
instrument a **future** string is sized against; **the Measured column is the verdict on the string
that ships**, and where the two disagree the measurement wins (lesson 028's second corollary).

**Where LR2b binds.** `0006 legal.md` §3.2: at 1440 it binds on every disclosure surface; at 390 it
binds only where the body text's computed `font-size` ≤ 12px, and above 12px the measured value is a
**reported residual that may not lose ground already held**. The `Binds @390` column states which
regime each slot is in, read from the computed style, never assumed.

| # | Slot | Role | Type step | Column @390 | Binds @390 | `C` @390 | Character budget (the 390 windows) | **Measured, delivered string** |
|---|---|---|---|---|---|---|---|---|
| S1 | Footer P4 — the source paragraph, **whole** | every norm this app's tables rest on, each with its own date and its own link | `--text-caption` | 358.00 px | yes (12px) | 57.14 | `[40,57] ∪ [80,114] ∪ [120,171] ∪ [160,228] ∪ [200,285] ∪ [240,342] ∪ [280,399]` | **398 chars → 7 line boxes → 56.86 cpl** ✓; 1440: 4 boxes → **99.50** ✓; 2560/3840: 4 boxes ✓ |
| S2 | Footer P4 — one source **fragment** | one table's label, its norm name (the link), and that norm's effective date | `--text-caption`, inline | — | — | — | **No individual cpl budget** — LR2b measures the paragraph, not the fragment. The binding constraint is S1's total and the ordering rule in §8 | four fragments, four `<a>`, measured inside S1's paragraph |
| S3 | Footer P3 — the gap sentence | `Súmula 60` gains its item | `--text-caption` | 358.00 px | yes (12px) | 57.14 | `[280,399] ∪ [320,456]` | **424 chars → 8 line boxes → 53.00 cpl** ✓ (was 419 → 52.38); 1440: 4 boxes → **106.00** ✓ |
| S4 | D1 — hint under *Adicional acima de 2h (%)* | the statutory floor, positively stated, with its two norms | `--text-caption` | **282.00 px** (after §2.2's padding step); 258.00 px at the shipped padding | yes (12px) | 44.44 at 282.00; 40.00 at 258.00 | `[40,44] ∪ [80,88] ∪ [120,133] ∪ [160,177] ∪ [200,222]` at 282.00 px | **164 chars → 4 line boxes → 41.00 cpl** ✓ — **identical at 258.00 px and at 282.00 px** *(run 2)*. Today's 142-char string scores **35.50** and fails. 1440: 4 boxes → **41.00** ✓ |
| S5 | D1's sibling — hint under *Adicional até 2h extras (%)* | unchanged text, re-verified | `--text-caption` | 282.00 px | yes (12px) | 44.44 | — | **83 chars → 2 line boxes → 41.50 cpl** ✓, at 390 and at 1440. Unchanged and must not regress |
| S6 | D3 — regime gap caption | this ladder is the federal one; it does not apply to a state or municipal servidor | `--text-caption` | 308.00 px | yes (12px) | 50.00 | `[40,50] ∪ [80,100] ∪ [120,150] ∪ [160,200]` | **string owed — §11 Q3.** A 112-char probe in this exact slot measured **3 line boxes → 37.33 cpl** and **fails**; 112 sits in the gap between the `[80,100]` and `[120,150]` windows, which is why the budget is binding and not advisory |
| S7 | D4 — night-premium floor caption | 20% is the floor, not the rate | `--text-caption` | 308.00 px | yes (12px) | 50.00 | `[40,50] ∪ [80,100] ∪ [120,150] ∪ [160,200]` | **122 chars → 3 line boxes → 40.67 cpl** ✓ — clears by 0.67. 1440: 2 boxes → **61.00** ✓ |
| S8 | D6 — "Ano" caption | thirteen paid months, and the figure is an approximation | `--text-caption` | 294.00 px | yes (12px) | 44.44 | `[40,44] ∪ [80,88] ∪ [120,133] ∪ [160,177] ∪ [200,222]` | **162 chars → 4 line boxes → 40.50 cpl** ✓ — clears by 0.50. 1440: 3 boxes → **54.00** ✓; 2560/3840: 2 boxes → **81.00** ✓ |
| S9 | DS7 — the compliance warning bodies | each gains the norm §9.1 names | `--text-body-sm` | 282.00 px | **no (14px)** — residual | — | LR2b binds at 1440, where `C = 80.00 ≥ 2 × 40`, so every length clears it | `daily-overtime-limit`, the one banner reachable from a single drive: **211 chars → 6 line boxes → 35.17 cpl** at 390 (residual; was 34.50, so ground is **gained**), **70.33** at 1440 ✓. Banner height **+0.00 px** |
| S10 | DS2 — the DSR caption (`D-1`) | gains Lei 605/1949 art. 7º "a" and Súmula 60, I | `--text-caption` | 308.00 px | yes (12px) | 50.00 | `[120,150] ∪ [160,200] ∪ [240,300]` | **255 chars → 5 line boxes → 51.00 cpl** ✓ (was 134 → 44.67). 1440: 3 boxes → **85.00** ✓ |
| S11 | `R-2` — `regime-field`'s `impact` leaf `<span>`, open panel | loses the retired claim, gains EC 103 art. 9º §4º | `--text-body-sm` | **249.00 px** *(run 2 — run 1 measured the parent `<span>`, which also contains `who`)* | **no (14px)** — residual | — | none; LR2b is a residual here | **463 chars → 13 line boxes → 35.62 cpl** at 390 (residual; was 292 → 32.44, so ground is **gained**), **77.17** at 1440 ✓. Card body **187.00 → 271.00 px**. **The full 463-character string fits; `copy.md`'s pre-approved 294-char shortening is not needed and must not be taken** |
| S12 | `S-1` — the *Custo da Hora* subtitle *(new at run 2)* | the norm's own term, *"a hora normal"*, with CLT art. 59 §1º | `--text-body-sm` | 244.00 px | **no (14px)** — residual | — | none; LR2b is a residual here | **191 chars → 6 line boxes → 31.83 cpl** at 390 (residual; was 163 → 32.60 — **0.77 lost, and no ground was held**: the slot has never reached 40 at 390, so `0006 legal.md` §3.2's no-losing-ground clause is not engaged). 1440: 3 boxes → **63.67** ✓; 2560/3840: 2 boxes → **95.50** ✓. Panel grows **+21.00 px** at 390 |
| S13 | `D-2` — the DSR row label *(new at run 2)* | the label must name the base the code passes, which includes the adicional noturno | `--text-body-sm`, inside a `flex` row | **175.44 px at 26 chars / 161.06 px at 23** | n/a — a label, not a body | — | **one line box at 390**, which is the budget | **`DSR sobre extras e noturno` (26) → 2 line boxes, row 21.00 → 42.00 px, and it squeezes the value column 96.00 → 92.56 px.** The named fallback **`DSR de extras e noturno` (23) → 1 line box, row 21.00 px, value column 96.00 px** ✓. At 1440 the 26-char label holds one line box at 181.95 px, so **the wrap is a 390-only defect** |

**S13 is the one slot where the delivered string does not fit, and the fallback `copy.md` named is
taken.** `copy.md`'s `D-2` row states the rule: *"if they do not clear the value column at 390 px …
the fallback is **not** the shipped label — a shorter correct label is (`DSR de extras e noturno`,
23)."* They do not. The 26-character label wraps, doubles the row and takes 3.44 px off the money
column beside it, which is the one column in that row a user is reading. **`DSR de extras e
noturno` ships**, at 23 characters, one line box, with the value column intact. It carries the same
correction — the base is extras **and** noturno — so `AGENTS.md` §5's contradiction with the caption
below it is still removed, and no disclosure is shortened: `D-1`, the caption that cites the three
norms, ships whole at 255 characters.

**S4's padding step is an LR2a fix, not an LR2b one — corrected at run 2.** Run 1 wrote that S4
*"cannot be satisfied without the padding step"*, reasoning from a 40.00 cpl capacity at 258.00 px
under which only exact multiples of 40 clear the floor. The delivered `J-1` is 164 characters and
measures **41.00 cpl in both columns**, so LR2b is satisfied with or without the step. What the step
still buys is LR2a under the **panel** reading of `surfaceRoot` (§11 Q2): the hint's panel-relative
spend is **50.00** at the shipped `p-6`, **34.00** at `px-4` and **26.00** at `px-3`, against a
32 px budget. Only `px-3` clears it, at no measured cost — the capacity reads 44.44 either way and
`J-1` reads 41.00 either way. **If `tech-lead` rules the field is `surfaceRoot`, the padding step
may be dropped without re-measuring any string in this document.**

## 8. Disclosure placement

Every disclosure in `legal.md` §11 has a slot, and each sits next to its own number with no control
between the user and it. The standing constraint is honoured: **none is in a tooltip, a popover, a
`title`, an expandable, or anything the user must operate to reveal.**

| # | Where it renders | Why this is next to its number | LR1 | LR2a | LR2b @390 | LR2b @1440 | LR3 |
|---|---|---|---|---|---|---|---|
| **D1** | The `hint` of the *Adicional acima de 2h (%)* field, `journey-form.tsx` | It qualifies the percentage the user is about to type into the field directly above it, and `Field` already wires it to the input with `aria-describedby="extra-tier-rate-hint"` | column 282.00 px = the whole content box available → `min(320, A)` satisfied | surfaceRoot = the field, bodyText = the hint, **spend 0.00**; panel-relative **26.00** at `px-3` | **41.00** ✓ | **41.00** ✓ | See §11 Q1 |
| **D2** | The *Não entram na conta* paragraph (footer P3), `calculator-views.tsx` | It names a rule the app does **not** compute, among the other rules it does not compute. Item II replaces the bare súmula number | 358.00 px | P3 is the surface; spend **0.00** | **53.00** ✓ (measured on the delivered 424-char `F-2`) | **106.00** ✓ | Rendered on first paint, no interaction |
| **D3** | Two places, both required. **(a)** `R-2`, the Estatutário card body, which is where `legal.md` §11 D3 names it — measured at S11, **35.62 cpl** residual at 390 and **77.17** at 1440 ✓. **(b)** A caption directly below the regime control, inside its `<fieldset>`, `regime-field.tsx` | `R-2` alone is not enough: `regime-field.tsx:23`'s `handleChange` calls `setIsOpen(false)`, so the card that carries `R-2` **unmounts at the moment of selection** and is absent in every state the user afterwards sits in. The caption renders whenever the regime it limits is the selected one, panel open or closed, which is what §11 D3's rendering condition asks for | 308.00 px | spend **0.00** | budget S6 — **string owed, §11 Q3** | 100.00 ✓ | Outside the `CollapsiblePanel`; no `aria-expanded` ancestor |
| **D4** | A caption in the variable-pay block, immediately after the night-premium row, `day-summary.tsx` | Same visual block as the *Adicional noturno* line and its value, above the DSR caption. Not the footer. **Unconditional**, because the row it qualifies is unconditional *(run 2)* | 308.00 px | spend **0.00** | **40.67** ✓ | **61.00** ✓ | Renders with its own row, in every state the block renders |
| **D5** | Footer P4, `calculator-views.tsx` | Each norm carries its own date in its own fragment — see the ordering rule below | 358.00 px | spend **0.00** | **56.86** ✓ (measured on the delivered 398-char `F-1`, four links in the DOM) | **99.50** ✓ | Rendered on first paint |
| **D6** | A caption under `PeriodSelector`, inside the hero, `salary-calculator.tsx` | It qualifies the *Valor por Ano* figure two elements above it and renders only when that figure is the annual one | 294.00 px | spend **0.00** | **40.50** ✓ | **54.00** ✓ | Conditional on a radio the user operated, not on a disclosure control |
| **D7** | Footer P3, unchanged text inside a paragraph whose one changed token is D2's | — | 358.00 px | spend **0.00** | **53.00** ✓ | **106.00** ✓ | Unchanged |

### 8.1 D5's ordering rule — the structural answer to "never pair a norm with a neighbour's date"

P4 is **one centered paragraph**, not a list. The measurements in §0 are why: a list of rows lands at
32.5–38.5 cpl at 390 and fails LR2b; the paragraph lands at 55.00 and passes. The pairing D5 forbids
is prevented structurally instead of typographically:

- Each fragment reads **label → norm name (the link) → that norm's own effective date**, in that
  order, always.
- **A date is always the last token of its own fragment and always follows its own norm.** No date
  ever precedes a norm, so no line break can place a date next to the wrong one — a reader arriving
  at a date has already passed the norm it belongs to.
- Fragments are separated by ` · `, the separator the footer already uses.
- The 2026-01-01 date may appear only inside fragments whose norm took force on that date. The IRRF
  table's fragment carries May 2025 and the dependant deduction's carries April 2015, as `legal.md`
  §6.4 and D5 require.

This is checkable: **no rendered fragment may contain two norm names, and no fragment may contain a
date that `legal.md` §7 does not attach to that fragment's norm.**

### 8.2 What did *not* get a slot, and why that is correct

`legal.md` §11 lists seven disclosures. D7 is unchanged and needs no new slot. Nothing from §11 was
dropped, deferred, or moved to a quieter place to make room. **The footer grows by 86.95 px at 390
and that is the price; no disclosure was shortened to avoid it.**

**One string was shortened at run 2, and it is not a disclosure.** `D-2` is the DSR *row label* — the
name of a line item, not a §11 disclosure — and it is shortened from 26 to 23 characters because the
26-character form wraps and squeezes the money column beside it (§7 S13). Every §11 disclosure ships
at its delivered length: `F-1` at 398, `F-2` at 424, `J-1` at 164, `D-1` at 255, `D-3` at 122, `P-1`
at 162, `R-2` at 463 — **including `R-2`'s optional EC 103 art. 9º §4º clause, whose pre-approved
removal `copy.md` offers and which this design declines**, because the slot holds the whole string.
`F-1`'s RPPS clause is likewise carried whole: the geometry in §7 S1 was measured on the **398-char
string that contains it**, never on a short version. Cutting it would be a `PRODUCT.md` §4 breach and
is `tech-lead`'s to route, not a length problem this design has.

## 9. Accessibility

### 9.1 Contrast — every text-on-surface pair, both themes, against WCAG 2.2 AA

Ratios are `DESIGN.md`'s own measured values for the token pairs; no new pair is introduced.

| Pair | Where | Light | Dark | AA floor | Verdict |
|---|---|---|---|---|---|
| `--color-ink-subtle` on `--color-canvas` | footer P1–P4, including every source link at rest | **4.87:1** | **5.74:1** | 4.5 | pass |
| `--color-accent-ink` on `--color-canvas` | source link, hover | **6.19:1** | **9.23:1** | 4.5 | pass |
| `--color-focus` on `--color-canvas` | the focus ring's 2px offset gap | **5.58:1** | **9.23:1** | 3.0 (non-text) | pass |
| `--color-ink-subtle` on `--color-surface-sunken` | D1's hint, on the settings panel | **4.61:1** | **5.51:1** | 4.5 | pass |
| `--color-ink-subtle` on `--color-surface` | D3 and D4 captions, and DS2 | **5.08:1** | **5.25:1** | 4.5 | pass |
| `--color-ink-onfill` @ 90% on `--color-accent` | D6's caption in the hero | **4.85:1** | **4.85:1** | 4.5 | pass — the fill is theme-invariant, so one number serves both |
| `--color-overtime-ink` on `--color-overtime-soft` | DS7's compliance bodies | **5.05:1** | **7.22:1** | 4.5 | pass |
| `--color-ink` on `--color-surface` | the pay rows D4 sits under, and the `D-2` row label itself | **15.77:1** | **15.54:1** | 4.5 | pass |
| `--color-ink-muted` on `--color-surface` | `S-1`, the *Custo da Hora* subtitle, and `R-2`'s `who` clause | **5.87:1** | **7.49:1** | 4.5 | pass |
| `--color-ink` on `--color-accent-soft` | `R-2`'s `impact` clause on the **selected** Estatutário card | see the note below | see the note below | 4.5 | **not re-measured here — no token changes and the pair already ships**; the card's fill, border and text roles are untouched by this spec |

**The 90% opacity on D6 is load-bearing and is not to be "tidied" to 80%** — `DESIGN.md` records that
80% measures 4.18:1 over `--color-accent`, below the floor. The value was confirmed in the rendered
DOM at run 2: the injected caption computes to `oklab(0.999998 … / 0.9)` over the hero's
`--color-accent` fill, identical in both themes.

**No new token pair is introduced.** Every row above is a pair `DESIGN.md` already records, on a
surface this spec does not change. The three new captions and the four changed strings all land on
`--color-ink-subtle`, `--color-ink-muted`, `--color-ink` or `--color-ink-onfill/90` — four roles,
all already measured, all AA in both themes.

### 9.2 Semantic roles

| Element | Role |
|---|---|
| Footer | `<footer>`, four `<p>` — unchanged |
| Source fragment | `<a href>` with `target="_blank" rel="noreferrer"`, as today. **The accessible name is the norm's name**, which is the link text; no `aria-label` overrides it |
| D1 | `<p id="extra-tier-rate-hint">`, referenced by the input's `aria-describedby` — already wired by `Field` |
| D3 | `<p>` inside the regime `<fieldset>`; when it renders, the `<fieldset>` carries `aria-describedby` pointing at its `id`, so the limitation is announced with the group rather than orphaned after it |
| D4 | `<p>` in the variable-pay block — plain text, adjacent to the row it qualifies |
| D6 | `<p>` after the period `<fieldset>`; when it renders, the `<fieldset>` carries `aria-describedby` pointing at its `id`, so a screen-reader user who selects **Ano** hears the approximation as part of the group's description |
| DS7 | unchanged: `role="status"` for warning, `role="alert"` for danger |
| `D-2` | the existing `<span>` in the DSR row — **no role, no `aria-label`**. It is the row's visible label and the value beside it is read in DOM order |
| `R-2` | the existing `impact` `<span>` inside the regime `<label>` — no role change. It is part of the radio's accessible name, which is why its length is a legibility question and not a naming one |
| `S-1` | the existing `<p>` under the `Custo da Hora` heading — no role change |

### 9.3 Tab order

DOM order, unchanged. On `/`: skip link → header controls → journey form fields → settings button →
(settings fields when open) → day summary's rate link when present → **footer source links, in the
order the paragraph reads** → the floating tab bar's two links. The footer gains two to four tab
stops; none is before any control that existed, and none moves an existing stop.

### 9.4 Targets

Every new link is **inline, inside a sentence**. WCAG 2.2 SC 2.5.8 exempts a target whose size is
constrained by the line-height of the non-target text around it, which is exactly this case. See
§12 — `DESIGN.md`'s Forty-Four Rule needs one sentence of precision here, because as written it
already contradicts the single footer link the product ships today.

### 9.5 Live regions, and what announces as the user types

- **Nothing in this spec is announced on a keystroke.** The footer is static; D1's hint is static;
  D3, D4 and D6 change only on an explicit selection or when a computed quantity crosses zero.
- The hero's value keeps its `aria-live="polite"`. **D6's caption is deliberately *not* inside a live
  region** — it is reached through the `aria-describedby` on the period group the user just operated,
  which announces once, at the moment of the choice, instead of re-announcing on every recalculation.
- The stat-tile grid keeps its `aria-live="polite"`; no new element joins it.
- D4 appears and disappears with the night-premium row inside the day summary. It is not a live
  region of its own; a disclosure that re-announces itself while the user edits a time is noise.

## 10. How every number in this document was measured

Per `AGENTS.md` §4 rule 6: the shared tree was never mutated and the shared `.next` was never used.

```
rsync -a --exclude node_modules --exclude .next --exclude .git ... → scratchpad/iso-0003
cp -al <repo>/node_modules iso-0003/node_modules
rm -rf iso-0003/.next && pnpm build && PORT=3103 pnpm start
```

- **Isolated copy, own `.next`, own port 3103.** `uptime` before the run: load average 5.15 on 16
  cores. `ss -ltnp` showed no other process on 3103.
- **Production build**, not `next dev`.
- **Instrument:** `@playwright/test`'s chromium, `deviceScaleFactor: 1`, `colorScheme` set per run.
- **Quantities**, taken with the repository's own method so that one quantity runs through the whole
  rule set (lesson 023) — the same code `tests/e2e/support/legibility.ts` uses:
  `element.getBoundingClientRect().width` for every width, and line boxes from a `Range` over the
  element's text content via `getClientRects()`, deduplicated by rounded `top`.
- **Candidate markup was applied to the live DOM** and read there, then removed — never computed from
  a character count (lesson 050). The "capacity" figures come from a 400-character pt-BR corpus
  rendered in the real box; the compliance-banner figures come from rendering **today's string and
  the candidate string in the same box, in the same page load**, so the delta is a measurement and
  not a difference between two runs.
- **States were driven, not inferred** (lesson 031): the settings panel was opened, the regime panel
  was opened and Estatutário selected, **Ano** was selected, MANUAL exit was set to produce
  compliance warnings, and the carga horária was cleared to produce the alert banner.

**One state was not reached and is recorded as a blank rather than filled in:** the compliance
warnings at 2560 and 3840. `0006`'s LR2 binds at 390 and 1440 and both were measured; the 2560/3840
cells in §2.3's DS7 row are empty for that reason, and they are reachable by driving the same MANUAL
exit at those viewports if a later gate needs them.

### 10.1 The measurements the design rests on

| # | Claim | Measured value | Where it was read |
|---|---|---|---|
| M1 | The list shape fails LR2b at 390 | rows at **34.50 / 38.50 / 32.50** cpl | footer, 390, both themes |
| M2 | The paragraph shape passes | **55.00** cpl over 7 line boxes, 385 chars | footer, 390, both themes |
| M3 | Footer height cost | **302.25 → 389.20 px** (+86.95) | 390; +52.17 at 1440; +58.69 at 2560 and 3840 |
| M4 | No horizontal overflow with the longer footer | `scrollWidth` = 390 / 1440 / 2560 / 3840 | all four widths, both themes |
| M5 | D1's column is too narrow today | **258.00 px**, capacity **40.00** cpl; today's string **35.50** cpl | settings panel open, 390 |
| M6 | `px-3` fixes it | column **282.00 px**, capacity **44.44** cpl | same state, padding applied to the live DOM |
| M7 | `px-4` is not enough for LR2a's 32px budget | column 274.00 px, same **44.44** capacity, panel-relative spend **34** | same state |
| M8 | The regime summary column cannot carry a disclosure | **188.86 px**, capacity **28.57** cpl | `/custo-da-hora`, 390 |
| M9 | D3's slot below the control can | **308.00 px**, capacity **50.00** cpl | same state |
| M10 | D4's slot | **308.00 px**, capacity **50.00** cpl | day summary, 390 |
| M11 | D6's slot | **294.00 px**, capacity **44.44** cpl at 12px; 40.00 at 14px | hero with **Ano** selected, 390 |
| M11b | *(run 2 correction to M11's companion)* S11's column is the `impact` **leaf** `<span>`, not the parent that also holds `who` | **249.00 px**, not 254.00; the parent's 403 chars are `who` (111) + `impact` (292) | regime panel open, 390 |
| M12 | The longer compliance citations do not break LR2b at 1440 | 69.00→**70.33**, 92.00→**69.00**, 67.67→**84.00**, 60.67→**68.67** | four banner bodies, 1440, both themes |
| M13 | And hold no ground at 390 that they could lose | today **34.50 / 36.80 / 33.83 / 36.40**; candidates **35.17 / 34.50 / 36.00 / 34.33** — none reached 40 before, none is required to now (14px, LR2b unbound) | same, 390 |
| M14 | Three of the four banners grow one line box | **+21.00 px** each at 390; `daily-overtime-limit` **+0.00 px** | same |
| M15 | 2560 and 3840 are one band | root **18px** at both; footer **864.00 px** at both; every slot identical | all slots, both widths |

### 10.2 Run 2 — the delivered strings, measured in the state that renders each

Same isolation discipline as §10, in a **second** isolated copy on port **3113** (`ss -ltn` showed
3110–3119 free before the run; `uptime` load average 8.92 on 16 cores at rsync, the build and the
server its own). Same instrument, same quantities, same `Range`/`getClientRects()` method. Each
string from `copy.md` § *Strings* was written into the element that will carry it, read, and the
original restored in the same page load — so every delta below is a difference between two reads of
one box, never between two runs.

States driven, not inferred (lesson 031): `localStorage` seeded with `grossSalary=5000` and
`monthlyHours=220` so the money columns render; **MANUAL** exit set to **23:30** to produce first-
tier extras, second-tier extras, night minutes and `restDayPay > 0` at once; exit reset to **18:00**
to reach the zero-night-minutes state; the journey settings panel opened; the regime panel opened;
**Ano** selected on `/custo-da-hora`.

| # | Claim | Measured value | State it was read in |
|---|---|---|---|
| M16 | Footer P4 carries the delivered `F-1`, RPPS clause and four links included, and clears LR2b | **398 chars → 7 line boxes → 56.86 cpl** at 390; **4 → 99.50** at 1440; 4 boxes at 2560 and 3840 | footer, both themes, all four widths |
| M17 | Footer P3 carries the delivered `F-2` and clears LR2b | **424 chars → 8 line boxes → 53.00 cpl** at 390 (from 419 → 52.38); **4 → 106.00** at 1440 | same |
| M18 | The footer's height cost reproduces run 1's M3 exactly, with the delivered strings rather than a corpus | **302.25 → 389.20 px (+86.95)** at 390; **+52.17** at 1440; **+58.69** at 2560 and 3840; `scrollWidth` equals the viewport at all four | same |
| M19 | `D-2`'s 26-character label does not fit at 390 | **2 line boxes**, label 175.44 px, row **21.00 → 42.00 px**, value column **96.00 → 92.56 px**. The 23-character fallback: **1 line box**, 161.06 px, row 21.00 px, value column 96.00 px. At 1440 the 26-character form holds **1 line box at 181.95 px** | DSR row present, 23:30 exit, both themes |
| M20 | The night-premium row is unconditional, so D4 is too | at a 18:00 exit the row renders **`Adicional noturno 20% · 0h 0m · R$ 0,00`**; the DSR row is present in the same state | day summary, 390 and 1440, both themes |
| M21 | The delivered `J-1` clears LR2b at the shipped padding **and** at `px-3`, identically | **164 chars → 4 line boxes → 41.00 cpl** in a 258.00 px column and in a 282.00 px column; the shipped 142-char string reads **35.50** in the same box; `J-0` reads **41.50** and does not move | settings panel open, 390, both themes |
| M22 | Every 12px caption slot clears LR2b with its delivered string | `D-1` **255 → 5 → 51.00**; `D-3` **122 → 3 → 40.67**; `P-1` **162 → 4 → 40.50** | day summary and hero, 390, both themes |
| M23 | Every 14px slot gains ground on its 390 residual, except `S-1`, which never held any | `R-2` **32.44 → 35.62**; `C-1` **34.50 → 35.17**; `S-1` **32.60 → 31.83**, and the slot's best-ever reading at 390 is 32.60, below 40 | regime panel, compliance banner, subtitle, 390, both themes |
| M24 | A 112-character candidate in D3's caption slot fails, which is what makes S6's budget binding | **3 line boxes → 37.33 cpl** in the 308.00 px `<fieldset>` column at 390; **1 box → 112.00** at 1440 | regime field, 390 and 1440, both themes |
| M25 | `R-2` fits whole; `copy.md`'s pre-approved 294-char shortening is not needed | full 463 chars: **13 line boxes, card body 187.00 → 271.00 px** at 390 and **6 boxes → 77.17 cpl** at 1440. The 277-char short form reads **34.63** at 390 — *lower* than the full string's 35.62 | regime panel open, both themes |

Both themes produced **identical geometry at every run-2 measurement**, to the centésimo, at all four
widths — 72 records, no divergence. Theme changes colour only.

**What run 2 did not reach, recorded as a blank.** Three of the four compliance banners
(`short-day-break`, `minimum-lunch-break`, `rest-between-shifts`) need journey shapes a single
MANUAL-exit drive does not produce; run 2 read only `daily-overtime-limit`, which reproduced run 1's
M14 cell exactly (**+0.00 px**). Run 1's M12–M14 for the other three stand as the record and are not
re-stated here as if run 2 had confirmed them. The 2560/3840 compliance cells remain blank for the
reason §10 gives.

Both themes produced **identical geometry at every measurement** — the theme changes colour only, as
`DESIGN.md` intends. Where a table above gives one number for a slot, it is because light and dark
measured the same to two decimals.

## 11. Questions routed to `tech-lead`

Neither blocks this artifact, and neither is mine to settle.

**Q1 — Is a field hint inside a closed disclosure panel an LR3 violation?** D1 lives in the
*Adicional acima de 2h (%)* field, and that field sits inside the journey settings panel, which is
closed on first paint behind a button carrying `aria-expanded`. `legal.md` §11 D1 places the
disclosure in "the field's own hint" — naming `journey-form.tsx:157`, which is that exact slot — and
also says "without ... a disclosure triangle". The two readings differ. My position, for
`labor-law-analyst` to accept or reject: **the disclosure is co-present with the claim it qualifies**
— the extra-tier percentage field is behind the same control, so there is no state in which the user
sees the number and not the disclosure, which is the substance LR6.1 carries. If the analyst rules
otherwise, the field and its hint must both leave the panel, and that is a scope change for
`product-manager`, not a re-layout I can perform here.

**Q2 — For a field hint, is `surfaceRoot` the field or the panel?** LR2a reads
`bodyText.width ≥ surfaceRoot.width − 32`. Taking the **field** as the surface root, D1's spend is
**0.00** and it passes at every viewport. Taking the **panel**, the spend is **50.00** today,
**34.00** with `px-4` and **26.00** with `px-3`. I chose `px-3` below `sm` precisely so the design
clears the stricter reading too, at no measured cost in capacity (M6 and M7 both read 44.44). The
ruling is still owed, because it decides whether `sm:px-6` above 640px is acceptable: at 1440 the
panel-relative spend returns to **50.00** while the field-relative spend stays **0.00**.

*Run 2 narrows what turns on this.* The padding step is now known to buy **nothing** for LR2b: the
delivered `J-1` reads **41.00 cpl in both columns** (M21). So Q2 is the step's only remaining
justification, and **a ruling that `surfaceRoot` is the field deletes the step outright** — no string
in §7 needs re-measuring, no other slot depends on it, and `journey-form.tsx` then stays closed. That
is the cheaper build and `tech-lead` should take it if the reading allows.

**Q3 — D3 needs a string that `copy.md` does not carry, and I may not write it.** `legal.md` §11 D3
must be *"visible in the regime helper text at the moment the Estatutário regime is selected"*.
`copy.md` answers with `R-2`, the card's `impact` text — but `regime-field.tsx:23`'s `handleChange`
calls `setIsOpen(false)`, so the card unmounts **at that exact moment** and stays unmounted in every
state the user afterwards sits in. §8 therefore places D3 in two slots: `R-2`, whole, where
`copy.md` puts it, **and** a caption below the collapsed control, which is the only element that
renders in the state D3's rendering condition names. That caption has **no string**. Its slot is
measured and its budget is S6's `[40,50] ∪ [80,100] ∪ [120,150] ∪ [160,200]`; a 112-character
candidate in that box fails at **37.33 cpl** (M24), so the budget is a real constraint and not a
formality. **Words are `content-writer`'s (`AGENTS.md` §4).** This routes to `tech-lead`: either
`content-writer` is re-opened for one string inside S6's budget, or `labor-law-analyst` rules that
`R-2` alone discharges D3 despite the unmount — in which case the caption and S6 are struck and
nothing else in this document changes.

## 12. System change — one, and it is a human approval point

**Proposed clarification to `DESIGN.md` § Components → Named Rules → The Forty-Four Rule.**

The rule currently reads: *"No interactive target is smaller than 44×44px, including the ones that
look like text links. Pad the hit area rather than growing the glyph."*

- **What it replaces:** nothing is removed. One sentence is added.
- **What it must say:** that the 44px floor governs **standalone controls**, and that a link set
  inline within a paragraph of running prose is governed instead by WCAG 2.2 SC 2.5.8's *Inline*
  exception — its size is constrained by the line-height of the non-target text around it, and
  padding it to 44px would break the paragraph it belongs to.
- **Why it is needed now:** the footer already ships exactly one such link (`calculator-views.tsx:93`)
  and has since 0001, so the rule as written is already contradicted by the tree. This spec takes
  that count from one to between three and five, which turns a single unremarked exception into a
  pattern. A rule that the product violates in the one place it applies is a rule the next designer
  will either enforce wrongly or quietly ignore.
- **What it is not:** it is not a licence for a smaller button, a smaller icon target, or a smaller
  tab. Every standalone control keeps the 44px floor unchanged, and that includes anything that
  *looks* like a link but stands on its own line, such as the day summary's rate link, which is
  `min-h-11` today and stays so.

**This is a human approval point** (`AGENTS.md` §4). The pipeline stops here for it before
`frontend-dev` builds. If the human declines, the fallback is that the norm names in P4 are **not**
links and a single link carries the whole source paragraph — which keeps today's one-link shape,
costs AC4 its "each hyperlinked to its own official URL" clause, and therefore bounces to
`labor-law-analyst` rather than being decided by me.

**No other system change.** No new token, no new type step, no new curve, no new duration, no new
colour, no new elevation level, no change to `DESIGN_VARIANCE` / `MOTION_INTENSITY` /
`VISUAL_DENSITY`.

## 13. What a reviewer should check, and what would make this design wrong

- **Every `C` in §7 re-measured in the state that renders it.** If a shipped string's measured cpl
  falls outside its slot's window, the string is wrong, not the window — and if the window itself is
  unreachable for the content `legal.md` mandates, that is a bounce to `tech-lead`, never a quietly
  shortened disclosure.
- **The footer at 390 with the real strings**: the paragraph must land in one of S1's windows and the
  document must not scroll horizontally. The candidate measured 55.00 cpl at 385 characters; a real
  string of 58–79 characters would score 29.0–39.5 and fail, which is the one trap in that slot.
- **D3 reached by selecting the regime with the panel closed**, D6 by selecting **Ano**, D4 by a
  journey with night minutes — never inferred from the source string (lesson 031).
- **Both themes**, because a contrast table is a claim about tokens and a theme is where it is
  spent.
- **`px-3 sm:px-6` seen to fail first**: the D1 hint must be measured at **35.50 cpl on the unfixed
  panel** before the fix is trusted to have done anything (lesson 012's shape — an assertion that has
  never been red proves nothing). Note what run 2 found: the 35.50 belongs to the **shipped
  142-character string**, not to the column. Swap in the delivered `J-1` and the unfixed panel reads
  **41.00** — so an assertion written against the padding will be green before the padding moves, and
  proves nothing about it. The padding's guard must be LR2a's spend (50.00 → 26.00), not the hint's
  cpl.
- **`D-2` measured as a row, not as a label.** The defect is not that 26 characters overflow — they
  do not; it is that they take a second line box and 3.44 px off the money column. The assertion is
  `row.height` and the value `<span>`'s width, at 390, in both themes.
- **D4 reached with `nightMinutes === 0`.** A suite that only ever drives a night-bearing journey
  cannot see the guard run 1 wrote and run 2 removed. Drive an 18:00 exit and assert the caption is
  **present**.
- **`R-2` read on the `impact` leaf `<span>`**, not on its parent — the parent also carries `who`,
  which is why run 1 read 403 characters in a 254.00 px box and run 2 reads 292 in 249.00 px.
