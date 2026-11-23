# 0007 — Design

> Owner: product-designer · Gate: `design` · **Run 1**
>
> Binding inputs, in the order they were read: `AGENTS.md` (§3, §4, §5's three promoted subsections,
> §8, §9), `.agents/memory/LESSONS.md` (005, 018, 023, 028 opened in full), `spec.md` **run 2**,
> **`legal.md` § *Run 3*** — which supersedes `spec.md` § *Disclosure obligations* wherever the two
> differ, i.e. **D5 (retired)** and **D6 (restated)** — and `DESIGN.md` as shipped.
>
> **No new token.** Every value below is a token already declared in `app/globals.css`.
> **System change: none.** § *System change* states the one place I came close and why I did not.

---

## 0. Where every number in this document came from

Two classes of number appear here, and `AGENTS.md` §5 (*How an instrument's reading is trusted*)
requires each to say which it is.

**Measured by me, in a real browser, against the deployed preview** —
`https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app/custo-da-hora`, the
`fix/design-taste-preflight` branch alias, PR #39, Chromium 1.63.0, `deviceScaleFactor: 2`,
`isMobile` at 390, `colorScheme` set explicitly per run, `networkidle` + 900 ms settle, values read
with `getBoundingClientRect()` on a state I loaded on purpose by seeding `localStorage`
(`grossSalary`, `monthlyHours`, `workMinutes` — the real keys, read from `lib/storage.ts:2-4`).
**No geometry here is read off a `layout-shift` source rect** (`AGENTS.md` §5; those rects are
clipped to the viewport and carry no target). Line counts are `Range.getClientRects()` de-duplicated
by rounded `top`, the `0005` §3 method.

**Computed by me** — every contrast ratio in § 8 is computed from the two hex values in
`DESIGN.md`'s frontmatter by the WCAG 2.x relative-luminance formula, not copied from prose. Where
my result and `DESIGN.md`'s prose disagree, the disagreement is named there (one cell does).

The candidate layouts in § 2 were probed by mutating the **live deployed page in the browser**, never
the working tree — `AGENTS.md` §4 rule 6, and several agents are live in this checkout.

---

## 1. Intent — what the eye does in the first two seconds at 390

The screen this spec touches is `/custo-da-hora`. Its answer is already first in the DOM and first on
screen (`DESIGN.md` § *The Answer-First Rule*), and **this design moves nothing above the first
input** — spec `0008` owns that budget and spends none of it here.

- **1s** — the hero numeral: *quanto vale a minha hora*. Untouched by this spec, still
  `--text-numeral`, still the only thing above 2rem.
- **5s** — the form, and inside it the one new thing: **two fields that now read as one sentence** —
  *Jornada Diária* beside *Dias por Semana*, on one row, at every viewport. The eye that lands on
  `08:48` lands on `5` in the same fixation. That adjacency **is** the disclosure D6 is reaching for:
  the operand the app used to assert silently is now a control the user can see holding a value.
- **30s** — the divisor surface: one banner, in one of four mutually exclusive states (§ 4), carrying
  the number, both its operands **as values**, the norm restricted to the case its text covers, and
  the two disclosures that must sit beside it — D1 and D4.

**Nothing decorative is added, and nothing at all is added between the user and the answer**
(`PRODUCT.md` §8). The new field sits *below* the answer and *below* the first input, in the row that
already existed for the jornada.

---

## 2. Layout

### 2.1 The problem, stated as measured

First-screen area at 390×844 on the deployed preview, empty form, light:

| Element | top | bottom | height |
|---|---|---|---|
| `header` (fixed chrome) | 0 | 65.0 | 65.0 |
| `HeroPanel` | 96.0 | 575.0 | 479.0 |
| card (`Custo da Hora`) | 607.0 | 1560.7 | 953.8 |
| `#salario-bruto` — the first control | 824.5 | **880.5** | 56.0 |
| tab bar (fixed chrome, viewport coords) | 766.0 | 828.0 | 62.0 |

The unoccluded band of the first screen is **65 → 766 px**. The first control ends at **880.5**
empty, **880.5 − 766 = 114.5 px below** the last unoccluded pixel. **No complete control is on the
first screen at all today**, and no placement of a new field can change that — the lever on the fold
belongs to `0008` (flow height above the first input) and `0010` (occluded height), not to me.

What *is* mine: **the new field must not push the divisor disclosure further down than it has to**,
and the number must be handed to `0010` rather than estimated (AC15).

### 2.2 The decision: the field costs one row of nobody's, because it shares a row that exists

The two operands of the divisor become **one grid item containing a two-column grid**, at every
viewport:

```
grid grid-cols-1 sm:grid-cols-2 gap-6          ← unchanged, components/organisms/salary-calculator.tsx:91
├── Salário Bruto            col-span-2 (sm:)  ← unchanged
├── Regime de Trabalho       col-span-2 (sm:)  ← unchanged
├── Carga Horária Mensal     1 col             ← unchanged
└── ▸ operand pair           1 col             ← NEW WRAPPER: grid grid-cols-2 gap-3
    ├── Jornada Diária                         ← moved into the wrapper, otherwise unchanged
    └── Dias por Semana                        ← the new field
```

Because the pair is **one item of the existing grid**, the outer grid keeps exactly four items at
every width — no new row appears at 390 (one column), and no orphan third item appears at `sm` and
above (two columns). The nesting is identical at all four reference widths, so there is one structure
to reason about, not two.

### 2.3 What it costs — measured on the deployed preview, not estimated

Probe: the deployed page, seeded to the mismatch state (`grossSalary 3000`, `monthlyHours 200`,
`workMinutes 528`), measured before and after the pair is applied to the live DOM in the same
session, same page load. The quantity is **the document-coordinate `top` of the divisor surface**
(`[role="status"]`), which is exactly AC15's quantity.

| Viewport | theme | warning `top` before | after | **Δ** | jornada input width after | horizontal overflow |
|---|---|---|---|---|---|---|
| 390×844 | light | 1276.8 | 1294.2 | **+17.4** | 148.0 | 0 |
| 390×844 | dark | 1276.8 | 1294.2 | **+17.4** | 148.0 | 0 |
| 1440×900 | light | 620.3 | 637.7 | **+17.4** | 154.8 | 0 |
| 2560×1440 | dark | 697.4 | 717.0 | **+19.6** | 227.5 | 0 |
| 3840×2160 | dark | 697.4 | 717.0 | **+19.6** | 227.5 | 0 |

**+17.4 px at 390 and 1440; +19.6 px at 2560 and 3840.** The two figures are the same quantity: one
`--text-caption` line box, at a 16px root (17.4) and at an 18px root (19.6). 2560 and 3840 are
identical because both sit at the 18px root step — resolved in the browser, not read off the media
query (lesson **028**).

**Where the 17.4 comes from, and how it goes to zero.** It is *not* the field. The field itself is
free: the new control occupies the half of the row the jornada no longer needs. The 17.4 is the
**jornada hint wrapping from one line to two** at the narrower column — measured: 44 chars, 1 line at
308 px, 2 lines at 148 px. If `content-writer` returns a jornada hint of **≤ 19 characters** (§ 7,
slot `hint.jornada`), the cost is **0.0 px**. I am not asking them to; the hint's job is worth a line.
**The number handed to `0010` is +17.4 px at 390×844**, and the second number it should hold is that
this spec adds **0.0 px above the first input**, so `0008`'s ceiling is untouched.

### 2.4 The alternative I rejected, with its measured price

A six-option segmented control (`1 2 3 4 5 6`) full width is the better instrument in the abstract:
one tap, no keyboard, and **7 is unrepresentable**, which is the legal domain expressed as geometry
(R6: `dias ∈ {1…6}`; 7 is unlawful under Lei 605 art. 1º and CLT art. 67). Probed on the deployed
page with the real track geometry (`bg-surface-sunken`, `p-1.5`, `gap-1`, options `min-h-11`):

- It **fits**: options measure **46.0 × 44.0** at 390, clearing `DESIGN.md`'s Forty-Four Rule on both
  axes.
- It **costs +105.5 px** at 390 (warning `top` 1276.8 → 1382.3) — six times the pair, because it
  needs a full row of its own and cannot share one.

**Rejected on cost**, and the rejection is recorded rather than silent: the field this spec adds is
not the field the user came for, and spending 105.5 px of a screen where nothing fits already to save
one keystroke is the trade `PRODUCT.md` §5 tells me not to make. The consolation is that the number
input keeps the unlawful answer *reachable* — a worker who really does work seven days types `7` and
is told, in words, that the law grants them a 24-hour repouso (§ 4, state **R1**). A control that
cannot express their week cannot tell them that.

### 2.5 The four reference widths

| Width | Root | Card padding | Operand pair | What moves |
|---|---|---|---|---|
| **390** | 16px | 24px (`p-6`) | 2 columns × **148.0 px**, `gap-3` | Outer grid is one column; carga is a full-width row, the pair is the next full-width row split in two. Jornada hint wraps to 2 lines. |
| **1440** | 16px | 32px (`sm:p-8`) | 2 columns × **154.8 px**, `gap-3` | Outer grid is two columns; carga and the pair share one row, exactly as carga and jornada do today. Row height 106.9 → 124.3. |
| **2560** | 18px | 36px | 2 columns × **227.5 px** | Nothing reflows. The whole system scales with the root (`DESIGN.md` § *The Scale-Don't-Reflow Rule*). |
| **3840** | 18px | 36px | 2 columns × **227.5 px** | Identical to 2560 — same root band, container still 1800px, extra width is margin. |

**Horizontal overflow measured 0 at all four widths, both themes** (`scrollWidth − clientWidth` on
`documentElement`), and the jornada input's own `scrollWidth − clientWidth` is **0** at 148 px — the
masked value `08:48` does not clip. Measured budget inside the 148 px field: **8 characters** at
`--text-input` with a leading icon (`pl-12` + `px-4`). `08:48` is 5; `5` and `6` are 1.

Nothing is off-viewport at any of the four widths, and no control shrinks below 44 px on either axis:
the field height is `h-14` (56 px), the width floor is 148 px.

---

## 3. Component tree

Every element at its atomic level, with the shipped component named where one is reused
(`AGENTS.md` §8, *Reuse before writing*). **Full paths, once per filename** (`AGENTS.md` §5).

| # | Element | Level | Status | Path |
|---|---|---|---|---|
| 1 | Operand pair wrapper (`grid grid-cols-2 gap-3`) | — (markup inside the organism) | **new markup, no new file** | `components/organisms/salary-calculator.tsx` |
| 2 | *Dias por Semana* field | molecule | **reuse** | `components/molecules/field.tsx` |
| 3 | its control | atom | **reuse** | `components/atoms/input.tsx` (`type="number"`, `inputMode="numeric"`, `min={1}`, `max={6}`, `step={1}`) |
| 4 | its leading icon | atom | **reuse** (library) | `IconCalendarWeek` from `@tabler/icons-react`, 20 px, `stroke={2}`, `aria-hidden="true"` — unused elsewhere in the tree, so the One-Idea-One-Icon rule holds |
| 5 | *Jornada Diária* field | molecule | **reuse, unchanged** | `components/molecules/duration-field.tsx` |
| 6 | *Carga Horária Mensal* field | molecule | **reuse, unchanged** | `components/molecules/field.tsx` + `components/atoms/input.tsx` |
| 7 | Divisor surface — all four states | atom | **reuse** | `components/atoms/alert-banner.tsx` (no change to the atom) |
| 8 | Multi-paragraph body inside the banner | — (markup at the call site) | **new markup, no new file** | `components/organisms/salary-calculator.tsx` — a `div.space-y-2` wrapping the `<p>`s passed as `children` |
| 9 | Hero, period selector, stat tiles, tax panel | organism / molecule / atom | **untouched** | `components/organisms/hero-panel.tsx`, `components/molecules/period-selector.tsx`, `components/atoms/stat-box.tsx`, `components/organisms/tax-details-panel.tsx` |
| 10 | Page shell | template | **untouched** | `components/templates/calculator-layout.tsx` |

**No new component file, no new atom, no new molecule.** The two new things are a wrapper `div` and a
body wrapper `div`, both at the call site inside one organism.

**Why `AlertBanner` is not extended.** Its geometry is calibrated against `0006`'s LR2a budget (32 CSS
px of border + horizontal padding, spent at 26 px today). Adding a paragraph rhythm *inside the atom*
would change it for all five consumers; wrapping the children I pass at the call site changes it for
none, and leaves LR2a reading the same elements it reads today.

---

## 4. The divisor surface — one slot, four mutually exclusive states

`legal.md` § *Run 3 — what G6 will check* item 4 counts the disclosures against **the number of
surfaces that can emit a divisor, which is two**: `components/organisms/salary-calculator.tsx:136-138`
(carga mensal empty) and `:144-155` (mismatch). This design keeps that number at **two**, and adds
**no new surface** — it adds two more *states* of the same slot, which is where R7's refusals go.

**The slot** is the existing banner region between the field grid and the *Impostos e Descontos*
disclosure button (`components/organisms/salary-calculator.tsx:123-156`). **At most one** of the four
states below ever renders, in this precedence. The `Informe o seu salário bruto` danger banner
(`:124-127`) is independent of all four, unchanged, and states no divisor.

| # | State | Condition | Tone | `role` | States a divisor? |
|---|---|---|---|---|---|
| **R1** | **Operand out of domain** | `dias` empty, `0`, or `≥ 7` (R6: the domain is `{1…6}`; 7 is unlawful — Lei 605 art. 1º, CLT art. 67), or the jornada is not a real duration | `danger` | `alert` | **No** |
| **R2** | **The app declines to price the week** | `jornada > 10,00 h` (R7b) **or** `jornada × dias > 44,00 h` (R7a), compared on the **unrounded minute product** | `warning` | `status` | **No — and no norm is named** |
| **R3** | **Carga mensal not yet given** | `monthlyHours ≤ 0`, and neither R1 nor R2 holds | `danger` | `alert` | **Yes** |
| **R4** | **Mismatch** | `\|carga declarada − divisor\| ≥ DIVISOR_TOLERANCE_HOURS`, and none of R1–R3 holds | `warning` | `status` | **Yes** |
| — | **Silence** | none of the above — including the product's stated common case, `08:48 × 5 = 220` | — | — | No banner. **AC5 preserved: the default state renders exactly what it renders today.** |

**Why the tones split there, in the system's own words.** `DESIGN.md` § *Alerts* defines the two
tones by what they mean, not by severity: **danger = Debit Red = an input the app cannot use**;
**warning = Overtime Amber = a CLT limit approached**. R1 is an input the app cannot use. R2 is a CLT
limit exceeded — the user typed something complete and legible, and what is wrong is the *week*, not
the typing. R3 is a missing input. R4 is the shipped warning, unchanged in tone.

**Why R2 is polite and not assertive.** `role` follows tone in the shipped atom, and that is the right
answer here for a second reason: this surface updates **as the user types** (`PRODUCT.md` §5, no
submit button). An `alert` crossing the 10-hour boundary on every keystroke would interrupt a screen
reader mid-word. R1 and R3 keep `alert` because they are the shipped behaviour of the two danger
banners already on this screen and changing them is outside this spec's bound.

**R2 is the state the G2 verdict rests on.** Today, `jornada 12:00` renders `300` as *o devido* and
argues the worker from **R$ 13,64 toward R$ 10,00**. After this spec that state renders **no number
and no norm name at all** — a refusal, not an error message about a form. What it must *say* is legal
content (`legal.md` R7, three clauses: what the operands add up to, which ceiling was passed, which
field to check); the words are `content-writer`'s, the slots are in § 7.

### 4.1 Inside the banner — the body's shape

```
AlertBanner  (rounded-lg, border, px-3 py-4, space-y-1)
├── row: icon 20px + title            ← unchanged atom markup
└── children:  div.space-y-2          ← NEW wrapper at the call site
    ├── <p> the divisor sentence      ← the number + both operands as values (D6) + the norm restricted to its case (D3)
    ├── <p> what this screen used     ← R4 only; copy.md B-3. Omitted in R3, which has no declared carga to have used
    ├── <p> D4                        ← bancários, turnos ininterruptos, 12×36 have their own divisors; this screen does not model them
    └── <p> D1                        ← convenção/acordo coletivo may fix another jornada, and therefore another divisor
```

**One `<p>` per sentence, and D4 sits above D1.** The order is `content-writer`'s, argued from
`legal.md`'s own ranking (*D4 … now the most load-bearing of the six*) and accepted here: the
disclosure that can change a number the reader might act on is the one closest to the number. Four
paragraph slots in R3 and R4 (R3 drops the second), answering `copy.md` § *Slots and budgets*'
open question — **four paragraphs, not a list and not one block**: a list would add a marker column
and cost width LR2a measures, and one block would put D4 mid-paragraph where no reader stops.

Every paragraph is a **block-level `<p>` at the banner's full inner width** — the same element class
LR2a reads. Measured on the deployed preview: body `<p>` width **282.0** against a banner root of
**308.0** at 390 (budget `308 − 32 = 276`; **282 ≥ 276, passes**), and **641.3** against **667.3** at
1440 (budget 635.3; passes). Those widths do not change, because nothing about the banner's box
changes — only how many paragraphs sit in it.

**Every quantity inside the prose carries the `numeric` utility** (`DESIGN.md` § *The Tabular Rule*):
the divisor, the jornada, and the day count each sit in a `<span className="numeric">`. The divisor
renders through `AMOUNT_FORMATTER` (`lib/utils.ts:48`) — **`183,33`, never `183.33`** (N3, F2/L12);
`220,00` for an integer divisor is acceptable and no new formatter may be added.

**Nothing in this slot is collapsible, and nothing in it is behind a control** (lesson **018**,
`legal.md` D4). The *Impostos e Descontos* panel below stays collapsible; no disclosure moves into it.

---

## 5. Tokens

Exact token names from `app/globals.css`. A cell reading *both* means the token resolves per theme and
the utility is written once — a `dark:` twin here would mean a missing token (`DESIGN.md` § *Don't*).
**No raw hex, no arbitrary value, no new token.**

### 5.1 The operand pair and the new field

| Element | Property | Token / utility | Light | Dark |
|---|---|---|---|---|
| Pair wrapper | display | `grid grid-cols-2` | both | both |
| Pair wrapper | column gap | `gap-3` → `calc(var(--spacing) * 3)` = **12 px** | both | both |
| Pair wrapper | placement | one item of the existing `gap-6` grid; `sm:col-span-1` (the default) | both | both |
| Field wrapper | label↔control gap | `space-y-2` = **8 px** (`components/molecules/field.tsx:16`) | both | both |
| Label *Dias por Semana* | type step | `--text-label` (0.875rem / 500 / 1.25 / +0.005em) | both | both |
| Label | colour | `--color-ink-muted` | `#5f656f` | `#a6abb5` |
| Input | height | `h-14` = **56 px** | both | both |
| Input | radius | `--radius-md` (1rem) | both | both |
| Input | fill | `--color-surface` | `#ffffff` | `#181b21` |
| Input | border | 1px `--color-line-strong` | `#888c95` | `#6a707a` |
| Input | text | `--text-input` + `numeric`, `--color-ink` | `#1e232c` | `#f2f3f6` |
| Input | placeholder | `--color-ink-subtle` | `#696f79` | `#898e98` |
| Input | horizontal padding | `px-4` + `pl-12` with the icon (16 / 48 px) | both | both |
| Leading icon | size / stroke / colour | 20 px, `stroke={2}`, `--color-ink-muted` | both | both |
| Hint (jornada only) | type / colour | `--text-caption`, `--color-ink-subtle` | `#696f79` | `#898e98` |

### 5.2 The divisor surface

`components/atoms/alert-banner.tsx` is used as shipped; these are the tokens it already resolves, restated
because a reviewer must be able to check them without opening a second file.

| Element | Property | Token | Light | Dark |
|---|---|---|---|---|
| Banner (R2, R4 — warning) | fill | `--color-overtime-soft` | `#faf4ea` | `#3a2f1f` |
| Banner (R2, R4) | border | 1px `--color-overtime` at 30% | `#c48019` | `#eb9f37` |
| Banner (R2, R4) | text + icon | `--color-overtime-ink` | `#905e16` | `#f8b35d` |
| Banner (R1, R3 — danger) | fill | `--color-negative-soft` | `#faebec` | `#3c1d24` |
| Banner (R1, R3) | border | 1px `--color-negative` at 30% | `#ca262e` | `#ee5955` |
| Banner (R1, R3) | text + icon | `--color-negative-ink` | `#bf2029` | `#f98078` |
| Banner (all) | radius / padding | `--radius-lg` / `px-3 py-4` (12 / 16 px) | both | both |
| Banner (all) | body type | `--text-body-sm` (0.875rem / 400 / 1.5) | both | both |
| Banner (all) | title weight | `font-semibold` = `--font-weight-semibold` | both | both |
| Body wrapper | paragraph rhythm | `space-y-2` = **8 px** | both | both |
| Banner → next element | margin | `mb-6` = 24 px (as shipped) | both | both |
| Quantities in prose | figures | `numeric` utility (`tabular-nums slashed-zero`) | both | both |
| Field in error (R1) | fill / border | `aria-invalid:bg-negative-soft` / `aria-invalid:border-negative` — already in `components/atoms/input.tsx:18` | `#faebec` / `#ca262e` | `#3c1d24` / `#ee5955` |
| Focus ring (every control) | outline | `ring-focus` utility → `2px solid var(--color-focus)`, `outline-offset: 2px` | `#2a62d1` | `#91b6f9` |

**Elevation:** none added. The banner is flat, the card keeps `--shadow-card` (light) / `none` (dark),
and nothing in this change earns a shadow (`DESIGN.md` § *The Flat-at-Rest Rule*).

**The One Mark Rule holds:** cobalt on this screen is still the focus ring, the active tab and the
hero fill. The new field introduces no fourth cobalt object — its icon is `--color-ink-muted`, not an
accent, because it is not a data icon and it is not actionable.

---

## 6. States

Every interactive element, all eight states. Focus-visible is specified, never inherited by accident.

### 6.1 `#dias-semana` — the new control

| State | Specification |
|---|---|
| **rest** | `--color-surface` fill, 1px `--color-line-strong` border, `--color-ink` value, `numeric`. Default value **5**, from the collected/persisted state — never a placeholder standing in for a value. |
| **hover** | border → `--color-ink-subtle`. No fill change (`DESIGN.md` § *Inputs*: a field that lights up under the pointer competes with the answer). `transition-[border-color] --duration-fast --ease-standard`. |
| **focus-visible** | border → `--color-accent` **and** the ring: `outline: 2px solid var(--color-focus); outline-offset: 2px`. Both, not either. |
| **active** | not applicable — a text field has no press state. Stated, not omitted. |
| **disabled** | not applicable — this field is never disabled. The domain bound is expressed by `min`/`max` and by state R1, never by disabling the control, because a disabled control cannot tell the user why. |
| **loading** | not applicable — the value is local state read from `localStorage`; there is no asynchronous fetch on this screen. |
| **error** | `aria-invalid="true"` (already wired in `components/atoms/input.tsx:18`) → border `--color-negative`, fill `--color-negative-soft`, **plus** `aria-describedby` pointing at the R1 banner's `id`. Colour is never the message (`DESIGN.md` § *The Error Has Words Rule*). Triggered by: empty, `0`, `≥ 7`, non-integer. |
| **empty** | the field can be cleared. It **does not fall back to 5** — a silent fallback re-creates the exact defect X1 turned out to be (`legal.md` L11). Empty ⇒ error state ⇒ **R1** ⇒ no divisor anywhere. |
| **live-updating** | the divisor, the banner state and the *Semana* figure all recompute on `change`, with no submit and no debounce-induced stale number. Nothing animates on a keystroke (§ 7). |

### 6.2 `#jornada-diaria` — unchanged, restated because its column changed

| State | Specification |
|---|---|
| rest / hover / focus-visible / disabled / loading | exactly as shipped (`components/molecules/duration-field.tsx` → `components/molecules/masked-input.tsx`); only the column width changes, 308 → 148 px at 390. |
| active | not applicable. |
| error | as shipped for an unparseable duration; **additionally**, a parseable jornada above 10,00 h is *not* a field error — it is **R2**, a refusal at the divisor surface. The field stays valid, because the value is a true statement about the user's week. |
| empty | as shipped; an empty jornada produces no week, hence **R1**. |
| live-updating | as shipped. |

### 6.3 The divisor banner — the four states

| State | rest | hover | focus-visible | active | disabled | loading | empty | error |
|---|---|---|---|---|---|---|---|---|
| **R1** danger | red tint, `role="alert"`, referenced by the field's `aria-describedby` | n/a — not interactive | n/a — contains no control | n/a | n/a | n/a | n/a — it *is* the empty-operand state | n/a |
| **R2** warning | amber tint, `role="status"`, no number, no norm name | n/a | n/a | n/a | n/a | n/a | n/a | n/a |
| **R3** danger | red tint, `role="alert"`, states the divisor with both operands | n/a | n/a | n/a | n/a | n/a | n/a | n/a |
| **R4** warning | amber tint, `role="status"`, states the divisor with both operands, D1 and D4 | n/a | n/a | n/a | n/a | n/a | n/a | n/a |

No banner contains a focusable element, in any state. Nothing inside a banner is a link, a button or a
disclosure trigger — which is the same sentence as "no disclosure on this screen requires an
interaction to be read".

---

## 7. Motion

**Nothing new animates, and that is a decision, not an omission.** Every state in § 6.3 is driven by
the user typing, and `DESIGN.md` § *What must never animate* closes that door in two clauses at once:
*the hero's numeral… changes as the user types; it must be instantaneous*, and *anything triggered by
a keystroke must never queue an animation*.

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion path |
|---|---|---|---|---|---|---|
| `#dias-semana` border | hover | `border-color` | `--duration-fast` (160 ms) | `--ease-standard` | 0 | **Unchanged** — the global reduced-motion reset keeps `border-color` in its allow-list and clamps duration to `--duration-fast`, which is already the value (`app/globals.css:303-315`). A colour change is comprehension, not vestibular motion. |
| `#dias-semana` ring | `:focus-visible` | `outline` | none — paints on the frame it appears | — | 0 | identical; an instant ring is already the reduced-motion ideal. |
| Divisor banner (R1–R4) | value change | **none** | — | — | — | identical in both modes. A banner that faded in on each keystroke would animate a number the user is reading. |
| Divisor banner | state swap R2↔R4 | **none** | — | — | — | identical. |

**No `transform` is introduced anywhere in this change**, so there is no state-bound transform needing
a neutralizer — the `hover:-translate-y-1` / `motion-reduce:hover:translate-y-0` pairing rule
(`AGENTS.md` §8, `DESIGN.md` § *Reduced motion*) has nothing to bind to here. If a later gate adds one,
the neutralizer is bound to the **same state**, never as a bare `motion-reduce:transform-none`, which
is specificity `0-1-0` and loses.

**`motion` (Framer Motion v13) is not used by anything this spec adds.** The one Motion-driven element
on this screen, `components/atoms/collapsible-panel.tsx`, is untouched — including its recorded
reduced-motion residual in `DESIGN.md` § *Motion*, which this spec neither triggers nor inherits,
because **no disclosure this spec places sits inside a collapsible panel**.

---

## 8. Copy slots

Slots only. Every pt-BR string is `content-writer`'s, and every legal obligation inside a slot is
`labor-law-analyst`'s — the *role* column says what the slot must accomplish, never what it says.

**The measured basis for every budget below**, taken in the served font (Atkinson Hyperlegible Next,
as the CDN delivers it — lesson **005**: measured in the browser that loads it, not from a specimen):

| Context at 390 | width | step | **chars per line** | line box |
|---|---|---|---|---|
| Label in a pair column | 148.0 | `--text-label` 14px/500 | **19** | 17.5 px |
| Hint in a pair column | 148.0 | `--text-caption` 12px/400 | **22** | 17.4 px |
| Banner title (beside the 20px icon) | 250.0 | `--text-body-sm` 14px/600 | **~30** | 21 px |
| Banner body paragraph | 282.0 | `--text-body-sm` 14px/400 | **36** (verified: the shipped 174-char body renders 5 lines ⇒ 34.8 cpl) | 21 px |
| Field value | 84.0 (inside `pl-12 px-4`) | `--text-input` 18px/500 | **8** | — |

| Slot | Role | Step | Budget at 390 | Notes |
|---|---|---|---|---|
| `label.dias` | Names the quantity the user must answer without knowing what a divisor is | `--text-label` | **≤ 19 chars, 1 line** | *Dias por Semana* is 15; `copy.md` run 1 delivered 27. **The one open item of G3 — § 8.1.** A second line pushes this field's control 17.5 px below the jornada's, and two controls that are one answer stop reading as one row. |
| `placeholder.dias` | Shows the shape of the answer when the field is cleared | `--text-input` | **≤ 2 chars** | Follows the shipped idiom: *Carga Horária Mensal* placeholders `220`, its own default. |
| `hint.jornada` | Unchanged in role: ties this field to the Jornada tab | `--text-caption` | **≤ 44 chars, ≤ 2 lines** | Today 44 chars / 2 lines at 148 px. **At ≤ 19 chars it is 1 line and this spec's first-screen cost falls to 0.0 px** (§ 2.3). Not a requirement — a stated lever. |
| `hint.dias` | **Deliberately empty.** | — | **0** | The field is self-explanatory at 15 characters and the answer appears in the banner as the user types. A hint here costs a caption line and buys nothing. If `content-writer` needs one, it is ≤ 22 chars / 1 line, and it adds 25.4 px. |
| `title.R1` | The operand cannot be used | `--text-body-sm` 600 | **≤ 48 chars, ≤ 2 lines** | |
| `body.R1` | What the domain is, why (Lei 605 art. 1º / CLT art. 67 grant the repouso), and which field to fix | `--text-body-sm` | **≤ 150 chars, ≤ 5 lines** | The only state where the app tells a seven-day worker something they may not know they are owed. |
| `title.R2` | The app will not price this week | `--text-body-sm` 600 | **≤ 48 chars, ≤ 2 lines** | Not *"erro"*. It is a refusal, not a form validation failure. |
| `body.R2` | R7's three obligations: what the declared operands add up to; which ceiling that passes (44 h semanais, CF art. 7º XIII — or, above 10 h diárias, that the only lawful regime is the 12×36 of CLT art. 59-A, which this app does not model); which field to check | `--text-body-sm` | **≤ 230 chars, ≤ 7 lines** | **No divisor and no norm-as-authority-for-a-number may appear in this state** (`legal.md` R7). |
| `title.R3` | The carga mensal is missing | `--text-body-sm` 600 | **≤ 48 chars, ≤ 2 lines** | Shipped title, may stay. |
| `body.R3` | **Rewritten.** The divisor the declared operands produce, **naming both as values** (D6), with the norm restricted to the case its text covers (D3) | `--text-body-sm` | **≤ 180 chars, ≤ 5 lines** | This is `salary-calculator.tsx:136-138`, which today says *"para a jornada de 8h48 por dia o divisor é 220"* — a divisor with no day count and no norm. It is in scope and D6 binds it. |
| `body.R3.d4` | D4 — third paragraph | `--text-body-sm` | **≤ 220 chars, ≤ 6 lines** (raised in § 8.1) | |
| `body.R3.d1` | D1 — fourth paragraph | `--text-body-sm` | **≤ 140 chars, ≤ 4 lines** | |
| `title.R4` | The declared carga and the computed divisor disagree | `--text-body-sm` 600 | **≤ 48 chars, ≤ 2 lines** | Shipped title is 46 chars / 2 lines. |
| `body.R4` | **Rewritten.** The divisor, **both operands as values** (D6), the norm restricted to its case (D3) — *Súmula 431 only where `horas semanais = 40`*; otherwise CLT art. 64 (caput at `dias = 6`, parágrafo único below it) | `--text-body-sm` | **≤ 180 chars, ≤ 5 lines** | The sentence *"Usar um divisor maior do que o devido reduz o valor de cada hora sua"* does not survive into any state: on the 12 h operands it argued a worker from R$ 13,64 toward R$ 10,00. |
| `body.R4.behaviour` | Which number this screen actually used — **second paragraph, R4 only** | `--text-body-sm` | **≤ 80 chars, ≤ 2 lines** | `copy.md` `B-3`. It must sit **above** D4: after *"o divisor acima não vale para você"* a sentence about which number the screen used reads as a correction of the one before it |
| `body.R4.d4` | D4 — third paragraph | `--text-body-sm` | **≤ 220 chars, ≤ 6 lines** (raised in § 8.1) | |
| `body.R4.d1` | D1 — fourth paragraph | `--text-body-sm` | **≤ 140 chars, ≤ 4 lines** | |

The budgets are **ceilings, not targets**: every character `content-writer` does not spend is 21 px of
somebody's screen. But a ceiling is not a licence to cut a legal clause — where a disclosure's own
text needs more room, **the room is found, never the clause dropped** (`AGENTS.md` §4 rule 8). § 8.1
is where that happened.

### 8.1 Reconciliation with `copy.md` run 1

Both halves of G3 ran in parallel and `copy.md` closed its run first, against the template stub.
Every delivered string is checked against the slot it lands in, at 390, with the measured 36 cpl /
21 px line box:

| `copy.md` id | Chars | Slot here | Budget | Lines at 390 | Verdict |
|---|---|---|---|---|---|
| **F-1** *Dias Trabalhados por Semana* | 27 | `label.dias` | **≤ 19, 1 line** | **2** | **Does not fit — the one open item.** See below |
| **A-1** / **B-1** titles | 30 / 43 | `title.R3` / `title.R4` | ≤ 48, ≤ 2 lines | 1 / 2 | fits |
| **A-3** divisor sentence | 108–120 | `body.R3` | ≤ 180 | 3–4 | fits |
| **B-2** divisor sentence | 136 | `body.R4` | ≤ 180 | 4 | fits |
| **B-3** *Os valores desta tela usam a carga que você informou.* | 53 | second paragraph, R4 only | ≤ 80 | 2 | fits |
| **D-1** | 120 | `body.*.d1` | ≤ 140 | 4 | fits |
| **D-4** | 212 | `body.*.d4` | ≤ 160 | 6 | **over the budget — the budget moves, to ≤ 220.** D4 is the disclosure `legal.md` makes blocking, and its clause list (Súmula 124, OJ 396, art. 59-A) is not compressible by 52 characters without dropping a category. Design does not get to shorten it (`AGENTS.md` §4 rule 8); the banner grows by 42 px and that is the correct outcome |

**F-1 — the only thing G3 still owes.** At 148 px a `--text-label` line holds **19 characters**;
*Dias Trabalhados por Semana* is 27 and wraps to two lines. That is not a typographic nicety: the
pair is a two-column grid, so a second label line pushes this field's input **17.5 px below** the
jornada's, and two controls that are one answer stop reading as one row. Two ways out, both measured:

1. **A label of ≤ 19 characters** — *Dias por Semana* is 15, and every word `F-1` adds beyond it is
   already carried by `A-3`/`B-2`, which name the operand in the sentence that uses it. **Cost 0 px.**
   *(Recommended, and it is `content-writer`'s call which ≤ 19-character label is right.)*
2. **Keep 27 characters and accept a two-line label**, aligning the pair's controls with `items-end`
   so the two inputs still share a baseline. **Cost +17.5 px** on top of § 2.3's +17.4, and the two
   labels then sit at different heights — the misalignment moves rather than disappears.

**Projected height of the largest state (R4) at 390**, computed from the delivered strings and the
measured line box — a projection, not a measurement: title 2×21 + `space-y-1` 4 + `B-2` 4 lines +
`B-3` 2 + `D-4` 6 + `D-1` 4 = 16 body lines × 21 = 336 + three `space-y-2` gaps 24 + `py-4` 32 +
borders 2 ⇒ **≈ 440 px**, against the **185 px** the shipped warning measures today. R3 projects to
**≈ 398 px**. Both are entirely below the fold at 390 in every state, and both are the price of D1 and
D4 being visible beside the number instead of behind a control.

---

## 9. Disclosure placement — where each row of `legal.md` § *Run 3 — disclosures, final state* sits

| # | Placement | Proof it is beside its number and not behind a control |
|---|---|---|
| **D1** | **Last paragraph** of the banner body, in **R3 and R4** — the two surfaces that state a divisor | Same box as the divisor, `--text-body-sm` at full banner width (282 px at 390), LR2a **282 ≥ 276**, no control between it and the number |
| **D2** | **Satisfied by D6 in the same clause**, per `legal.md` D2's own amended text — no separate slot, no separate pixels | The day count appears as a value in the same sentence as the divisor, in every state that states one |
| **D3** | Inside the divisor sentence itself (`body.R3`, `body.R4`), with the scope word **adjacent to the norm name** (lesson **004**) | A norm may be named only where its text covers the declared case; in **R2 no norm is named at all** |
| **D4** | **Third paragraph of the banner body, in R3 and R4 — above D1, closest of the two to the number**, and its 12×36 clause inside `body.R2` | The most load-bearing row in this spec: a 6 h × 5 d bancário reads **R$ 20,00** where Súmula 124, I, a gives **R$ 16,67**, +20,0%. It sits in the same box as the number, never in the `Impostos e Descontos` panel, never in a `title`, never in the footer |
| **D5** | **Nothing placed. Retired at G2 run 3** (`legal.md` § *Run 3 — L9*) | Recorded so a later reader does not look for it. Its first-screen cost is not spent and its DSR-side successor travels with **F8**, which is routed, not placed |
| **D6** | A rule about the sentence, not a surface: **every state that states a divisor interpolates the jornada and the collected day count as values** — `body.R3` and `body.R4` | Falsifiable exactly as `legal.md` writes it: render the state, read the `role="status"` / `role="alert"` `textContent`, and check that the declared day count appears in it as a number |

### 9.1 The one state D4 does not reach, named rather than left for G6 to find

`legal.md` counts D4 against the surfaces that **emit a divisor** — two — and this design puts it in
both, plus the refusal. There remains one state that shows the user a **salário-hora** while emitting
no divisor at all: when the declared carga mensal already agrees with the computed divisor
(`|declarada − divisor| < DIVISOR_TOLERANCE_HOURS`), no banner renders. A bancário on 6 h × 5 dias who
has typed `150` is in exactly that state, reads **R$ 20,00**, and sees no D4.

I am not resolving that by moving D4 somewhere quieter and I am not resolving it by inventing a
surface the spec forbids (*"the field this spec adds is the only thing added to it"*). I am recording
it with its cost, for `labor-law-analyst` at G6 and for the human if it goes that far:

| Option | What it costs, measured or computed | Who may take it |
|---|---|---|
| **A — as designed.** D4 in R2, R3, R4. The silent-agreement state carries no D4 | **0 px** beyond § 2.3's +17.4 | shipped by this design |
| **B — a permanent D4 line** under the operand pair, `--text-caption`, full card width (308 px, 46 chars/line) | ≈ 3 lines × 17.4 + 8 = **+60 px** on every state, on a screen where no control reaches the first fold | **G2 only.** It is a disclosure obligation, not a layout preference |
| **C — D4 inside the hero**, beside the hora it actually qualifies | ≈ **+35 px inside the first screen**, against `PRODUCT.md` §8 | **G2 + human.** It puts prose in the one panel the product keeps clear |

**Recommendation: A, with B named as the remedy if G6 rules the gap material.** Option A is what
`legal.md`'s own verification counts; B is what its imprecision table implies. The difference between
those two readings is a legal question, not a design one, and it is recorded in `STATUS.md` as
**D-B1** rather than decided here.

---

## 10. Accessibility

- **Semantics.** `#dias-semana` is a real `<input type="number" inputMode="numeric" min={1} max={6}
  step={1}>` with a `<label for>` rendered by `components/molecules/field.tsx` — the label is
  programmatically associated, not adjacent-and-hoping (AC4). The pair wrapper is a plain `div`: it
  carries no `role`, no `fieldset` and no `legend`, because it groups nothing the user must understand
  as a unit beyond what the two labels already say, and a `legend` would cost a line box on the first
  screen for a word neither field needs.
- **Tab order** follows DOM order, unchanged in kind: `#salario-bruto` → *Regime de Trabalho*
  (disclosure button, then its radios when open) → `#horas-mensais` → `#jornada-diaria` →
  **`#dias-semana`** → *Impostos e Descontos* (disclosure button) → the stat grid. The new field is
  the fifth stop and sits immediately after the jornada, which is the order the eye reads the pair.
- **Touch targets.** Every control is `h-14` (56 px) tall and ≥ 148 px wide at the narrowest viewport;
  adjacent targets are 12 px apart horizontally (`gap-3`) and 24 px vertically (`gap-6`).
  `DESIGN.md` § *The Forty-Four Rule* holds with margin on both axes.
- **Live regions.** No new live region. The banner's `role="status"` / `role="alert"` is the announcement
  channel and it already exists; the hero keeps its `aria-live="polite"`. In state **R1** the field
  carries `aria-invalid="true"` **and** `aria-describedby` pointing at the banner's `id`, so the reason
  is read with the field and not only when the user reaches the banner.
- **As the user types**, the divisor sentence changes inside a polite live region — announced on
  settle, interruptible, and never accompanied by an animation. `role="alert"` is used only by the two
  danger states, which are the shipped behaviour of this screen.
- **Zoom / text size.** Measured at **320×844** on the deployed preview with the pair applied: columns
  fall to **113.0 px**, the jornada input's `scrollWidth − clientWidth` is **0** (the `08:48` mask does
  not clip), document `scrollWidth − clientWidth` is **0**, and the cost is the same **+17.4 px**
  (1347.2 → 1364.6). `DESIGN.md` § *Accessibility*'s 320 px clause holds.

### 10.1 Contrast — computed by me from `DESIGN.md`'s frontmatter, both themes

WCAG 2.2 AA: 4.5:1 for text, 3:1 for control boundaries and graphical objects.

| Pair | Light | Dark | Floor | Verdict |
|---|---|---|---|---|
| Label `--color-ink-muted` on `--color-surface` | **5.87:1** | **7.49:1** | 4.5 | pass |
| Field value `--color-ink` on `--color-surface` | **15.77:1** | **15.54:1** | 4.5 | pass |
| Placeholder / hint `--color-ink-subtle` on `--color-surface` | **5.06:1** | **5.25:1** | 4.5 | pass |
| Control border `--color-line-strong` on `--color-surface` | **3.37:1** | **3.46:1** | 3.0 | pass |
| Focus ring `--color-focus` on `--color-surface` | **5.58:1** | **8.43:1** | 3.0 | pass |
| Warning body `--color-overtime-ink` on `--color-overtime-soft` (R2, R4) | **5.05:1** | **7.22:1** | 4.5 | pass |
| Danger body `--color-negative-ink` on `--color-negative-soft` (R1, R3) | **5.26:1** | **6.02:1** | 4.5 | pass |
| Errored field border `--color-negative` on `--color-surface` | **5.49:1** | **5.09:1** | 3.0 | pass |
| Errored field value `--color-ink` on `--color-negative-soft` | **13.63:1** | **13.58:1** | 4.5 | pass |

Two notes a reviewer should not have to re-derive:

- My computed **5.06:1** for `--color-ink-subtle` on `--color-surface` (light) agrees with
  `DESIGN.md` § *Neutral* (5.08:1, rounding) and **disagrees with `DESIGN.md` § *Fields***, which
  still prints **4.75:1** for the same pair — a figure that predates the `#6b707a → #696f79`
  correction recorded in § *Neutral*. The pair passes either way; the stale cell is flagged for
  `release-manager` at G7 and is **not** this spec's to edit.
- The warning banner's 1px border is `--color-overtime` at 30 % over `--color-overtime-soft`, which
  computes **2.98:1** at full strength in light. It is the decorative edge of a non-interactive
  container whose meaning is carried by its text, not a control boundary or a graphical object
  conveying information, so 1.4.11 does not bind it. **Shipped as-is by `0006`; unchanged here**, and
  named so no one reads its absence from the table as an omission.

---

## 11. References

| Source | Technique borrowed | Why it fits this audience |
|---|---|---|
| `components/organisms/journey-form.tsx` (the AUTO/MANUAL switch) | The neutral segmented-control pattern on a card | Read, costed, **not used** — § 2.4. Recorded because the next designer will reach for it first, and the reason it lost is a measurement, not a taste |
| `components/organisms/salary-calculator.tsx:102-112` (*Carga Horária Mensal*) | `Field` + `Input type="number"` with a leading icon and a placeholder equal to the default | The new field is the same kind of question as the one directly above it; making it look different would say something untrue |
| `components/molecules/date-time-input.tsx` | Two controls that are one answer, side by side under one rhythm | The jornada and the day count are one answer — the week — and the pair's 12 px gap is the same *"these belong together"* signal |

---

## 12. System change

**None.** No new token, no new type step, no new curve, no new duration, no change to any `DESIGN.md`
rule, no change to `DESIGN_VARIANCE`, `MOTION_INTENSITY` or `VISUAL_DENSITY`.

The one place I came close: a third paragraph rhythm inside `components/atoms/alert-banner.tsx`. It is
**not** a system change and **not** an atom change, because it is a `div.space-y-2` wrapper around the
children passed at the call site — an existing step of the sanctioned eight (`DESIGN.md` § *The Eight
Steps Rule*), applied in one organism, leaving the atom's box, its LR2a budget and its four other
consumers untouched.

`DESIGN.md`'s recorded debts are not opened by this spec: § *Motion*'s `collapsible-panel` residual
(no disclosure here is in a panel), the root type ramp (F2, `0006` → `product-manager`), and the 18px
cap's `AlertBanner` clause (no new viewport band).

---

## 13. What this design hands forward

| To | What | Value |
|---|---|---|
| **`.specs/0010-disclosure-reachability-on-mobile/`** (AC15) | The first-screen cost of the new field, measured on the deployed preview at 390×844, as the change in the document-coordinate `top` of the divisor surface | **+17.4 px** (1276.8 → 1294.2), both themes. Second number, because it is the one `0010` will actually want: the **absolute** `top` of the divisor surface is **1294.2**, against an unoccluded first-screen band of **65 → 766**. No threshold is set here; the lever was placement and it has been spent. |
| **`.specs/0008-…`** (flow height above the first input) | The height this spec adds above `#salario-bruto` | **0.0 px.** Everything this design touches is below the first control. `0008`'s ceiling is untouched and needs no renegotiation. |
| **`tech-lead` (G4)** | The e2e consumer **C3** in `tests/e2e/alert-legibility.spec.ts:44-52` drives this surface by filling *Carga Horária Mensal* with `200` | **Still reaches the state** after this change: the defaults are `08:48 × 5 dias ⇒ divisor 220`, and `\|200 − 220\| = 20 ≥ 1`, so R4 renders. **Its `title` string will no longer match** once `content-writer` rewrites `title.R4`, so the consumer's expected title must be updated in the same task, not discovered at G6. |
| **`tech-lead` (G4)** | The *Semana* figure (N1 / `legal.md` L8) | It takes the collected day count and **is never rendered under a norm name** — not in `SALARY_PERIOD_LABELS`, not in the hero label *"Valor por Semana"*, not in the supporting rate line. No visual change; the constraint is on what may be written beside it, and it is a copy/plan constraint, not a layout one. |
| **`qa-engineer` / `web-standards-auditor` (G6)** | The reading to reproduce | The four rows of § 2.3 and the 320 px row in § 10, on the deployed artifact, with `getBoundingClientRect()` on a state loaded on purpose — **never off a `layout-shift` source rect** (`AGENTS.md` §5). A rect whose `top + height` equals the viewport height is clipped, not measured. |
| **`labor-law-analyst` (G6)** | § 9.1 — the one state D4 does not reach, with its three costed options | Recorded as **D-B1** in `STATUS.md`. Option A ships; B and C are priced and are the gate's to choose. |

---

# Run 2 — the re-measure, against the delivered strings

> Owner: product-designer · Gate: `design` · **Run 2 — narrow re-measure. Run 1 above stands except
> where this section names a number it replaces.**
>
> Binding new inputs: **`legal.md` § *Run 3 — addendum A*** (D4 unconditional, five states, four
> falsifiable clauses), **`copy.md` run 2** (`D-4` rewritten, 212 ch, out of both banner bodies;
> `F-1` = `Dias Trabalhados`, 16 ch), and `STATUS.md` **D-B1** / **D-F1**.
>
> **What run 1 keeps:** §§ 1–7, § 8's slot table except the four rows amended in § 15.7, §§ 10–12.
> **What run 2 replaces:** § 8.1's projected banner heights, § 9's D4 row, **all of § 9.1**, and the
> `0010` row of § 13.
>
> **No new token. No `DESIGN.md` change. No new component file.** The one thing added is a `<p>`.

## 14. Where run 2's numbers came from

Same instrument as run 1, same rule (`AGENTS.md` §5, *How an instrument's reading is trusted*):
**every number below is measured, none is computed from a character count.** That is the correction
`legal.md` § *Run 3 — addendum A* asks for by name, and it is the one that moved the answer furthest.

- Deployed preview `https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app/custo-da-hora`,
  `fix/design-taste-preflight`, PR #39. Chromium 1.63.0, `deviceScaleFactor: 2`, `isMobile` at 390,
  `colorScheme` set explicitly per context, `networkidle` + 900 ms settle.
- State loaded on purpose by seeding `localStorage` (`grossSalary 3000`, `monthlyHours 220`,
  `workMinutes 528`, `salaryPeriod hour` — the real keys, `lib/storage.ts:2-4`), then the candidate
  markup applied **to the live deployed DOM in the browser**, never to the working tree
  (`AGENTS.md` §4 rule 6; several agents are live in this checkout).
- Heights and tops by `getBoundingClientRect()`; **line counts by `Range.getClientRects()`
  de-duplicated on rounded `top`** — the `0005` §3 method, so *"5 lines"* below is five measured line
  boxes, not `212 ÷ 46`.
- Each of the five states was rendered with the **delivered run-2 strings**, character for character
  from `copy.md` § *Strings* and § *Refusal states* (`C-3` for R1, `C-1` for R2 — the tallest body of
  each refusal class), at four widths × two themes.
- Both probe scripts were run from the repository root and **deleted after the run**; no file in
  `app/`, `components/`, `lib/` or `hooks/` was touched, and no git command that changes state was run.

**Every geometry in § 15 is byte-identical between `light` and `dark`.** Both themes were measured on
every row; the tables state one number because the measurement returned one number, not because dark
was skipped. Colour and contrast are stated per theme in § 15.9.

## 15. D4's permanent slot

### 15.1 The placement, and the clause it cannot literally satisfy

**The slot: a single `<p>`, the immediate next sibling of the field grid, inside the Salário card.**

```
div.bg-surface.rounded-xl                        ← components/organisms/salary-calculator.tsx:77 — the Salário card
├── div.flex.items-center.gap-4.mb-8             ← card header, untouched
├── div.grid.grid-cols-1.sm:grid-cols-2.gap-6.mb-8   ← the field grid, with the operand pair (run 1 § 2.2)
├── p  ▸ D4 ◂                                    ← NEW. Unconditional. Renders in all five states
├── [AlertBanner]  salário bruto ausente         ← unchanged, conditional
├── [AlertBanner]  R1 | R2 | R3 | R4             ← one of four, or none (Silence)
├── button  Impostos e Descontos                 ← the first interactive control after D4
└── CollapsiblePanel  Impostos e Descontos       ← no disclosure has ever been in here, and none is now
```

This is `legal.md` § *Run 3 — addendum A*'s chosen remedy — run 1 § 9.1 **Option B** — placed. It is
**not** the footer of `components/organisms/calculator-views.tsx` (refused there on adjacency), not in
`components/organisms/tax-details-panel.tsx`, not in either banner body, and not in the hero.

**The clause that does not survive a literal reading, recorded rather than quietly satisfied.**
Addendum A clause 2 requires D4 to sit *"inside the same card element as the salário-hora figure, with
no interactive control and no panel boundary between the figure and D4 in DOM order."* On this tree:

- the salário-hora figure renders in `components/organisms/hero-panel.tsx`, mounted through the
  `aside` slot of `components/templates/calculator-layout.tsx`, and its supporting line is supplied at
  `components/organisms/salary-calculator.tsx:243-245`;
- in **DOM order** the `main` column — the whole Salário card — **precedes** the `aside`. `order-first`
  puts the hero visually first at 390 and to the side at `lg`, in CSS, not in the DOM.

So **no element inside the Salário card is in the same card element as the figure**, and every in-card
placement has the entire card between itself and the figure in DOM order. The only placement that
satisfies clause 2 literally is inside the hero — which the same section refuses as **Option C**.
Clause 2 and the Option C refusal cannot both hold; the clause is the one that is wrong, and it is
wrong in its **quantity** (DOM-order adjacency to a figure) rather than in what it was reaching for
(`PRODUCT.md` §4, *visibly, next to the number*). Per `AGENTS.md` §5 *How a rule's domain is defined*,
the inversion is handed over in this artifact rather than resolved by silence or by narrowing, and it
changes **no pixel** of the placement: both readings converge on Option B once C is refused.

**The satisfiable form of clause 2, which is what G6 should run:** D4 is inside the Salário card
(`salary-calculator.tsx:77`); **no interactive control and no panel boundary sits between D4 and the
operands that produce the salário-hora**; D4 **precedes** the `Impostos e Descontos` disclosure button
and is never inside `components/atoms/collapsible-panel.tsx`; and at 390 the reader's path from the
figure to D4 crosses exactly one card boundary and no control.

### 15.2 Why the slot goes below the operand pair and not above the grid

Above the grid — between the card header and the first field — would put **zero** interactive controls
between the hero figure and D4, the strongest possible reading of clause 2. It is refused on a number:
it would add its full height **above `#salario-bruto`**, which is `0008`'s budget and the one quantity
run 1 § 13 promised to spend **0.0 px** of. Below the pair, the slot costs that budget nothing
(§ 15.6), and it still reads as a note about the money the two operands price rather than as a second
paragraph of the card's introduction.

### 15.3 The re-measured geometry — five states, five rows

`D-4`, 212 characters, rendered in the slot at `--text-body-sm`. Lines are measured line boxes.

| D4 slot | 390 | 1440 | 2560 | 3840 |
|---|---|---|---|---|
| measure (px) | 308.0 | 667.3 | 961.0 | 961.0 |
| root / computed size | 16px / 14px | 16px / 14px | 18px / 15.75px | 18px / 15.75px |
| **lines** | **5** | **3** | **2** | **2** |
| **height (px)** | **105.0** | **63.0** | **47.3** | **47.3** |
| document `top` — R1, R2, R4, Silence | 1294.16 | 637.67 | 717.00 | 717.00 |
| document `top` — **R3** | **1234.30** | 637.67 | 717.00 | 717.00 |

> **Corrected at G5 triage (F-G5-2), run 2a.** The single `document top` row this table carried —
> *1294.2 at 390 in every state* — was read in one state and written as though it were five. It is
> right in four of them and wrong in R3 by **59.86 px**. Everything else in this section reproduced
> to the hundredth of a pixel and is unchanged, including the **129.0 px** margin of § 15.4 and the
> placement of § 15.1.

**The slot's height is identical in all five states, in both themes and at all four widths. Its
`top` is not: at 390 it is state-dependent, because the hero is the `order-first` column.**

- **In R3 the salário-hora figure does not render at all.** `monthlyHours ≤ 0` is R3's own condition,
  and it is also the condition under which `components/organisms/salary-calculator.tsx:408` swaps the
  hero value for the *"Sem carga horária"* string and `:427` swaps the supporting rate line for the
  *"Informe a carga horária mensal"* prompt. Measured in the rendered R3 page at 390: the hero reads
  `Sem carga horária`, and `por hora` and `por minuto` occur **0 times** in `document.body.innerText`.
  The hero's `<p>` therefore renders at `--text-title` instead of `--text-numeral`, the `order-first`
  column measures **402.73** instead of **462.59** — a loss of **59.86 px** — and every box in the
  `main` column below it, D4 included, moves up by exactly that amount: `1294.16 − 59.86 = 1234.30`.
- **At 1440, 2560 and 3840 the `top` is state-invariant**, measured, because at `lg` the hero is a
  side column and its height cannot move `main` (`components/templates/calculator-layout.tsx:16-20`).
- **`top` is also seed-dependent at 390, and by a different quantity** — see the two seed conditions
  named below the state table.

The five rows below are therefore the five *banners*, measured with D4 **out** of both bodies, plus
the card each state produces:

| State | banner height 390 / 1440 / 2560 / 3840 | body `<p>` lines at 390 | card height 390 / 1440 / 2560 / 3840 | Δ vs run 1 at 390 | overflow |
|---|---|---|---|---|---|
| **R1** out of domain (`C-3t` + `C-3`) | 144.0 / 102.0 / 90.9 / 90.9 | 4 | 1121.1 / 849.9 / 907.8 / 907.8 | **+129.0** | 0 |
| **R2** app declines (`C-1t` + `C-1`) | 206.0 / 123.0 / 114.5 / 114.5 | 6 | 1183.1 / 870.9 / 931.5 / 931.5 | **+129.0** | 0 |
| **R3** carga missing (`A-1` + `A-2`,`A-3`,`A-5`) | 244.0 / 181.0 / 156.1 / 156.1 | 2, 3, 3 | 1221.1 / 928.9 / 973.1 / 973.1 | **−5.0** | 0 |
| **R4** mismatch (`B-1` + `B-2`,`B-3`,`B-5`) | 285.0 / 181.0 / 179.8 / 179.8 | 4, 2, 3 | 1262.1 / 928.9 / 996.7 / 996.7 | **−5.0** | 0 |
| **Silence** — no banner | — | — | 953.1 / 723.9 / 790.0 / 790.0 | **+129.0** | 0 |

**R1 and R2 are classes of two banner kinds each, and their cells are the tallest member, not an
invariant** — recorded at run 2a so the next reader does not rediscover it. Measured at 390:
`too-many-week-days` **144.0** and `no-week-days` **122.0** for R1; `daily-cap-exceeded` **206.0** and
`weekly-cap-exceeded` **186.0** for R2. The taller of each pair is the right number for a worst-case
table and is what § 14 says it measured; it is a **maximum over the class**, and a guard that asserts
it as an equality will be red on the shorter sibling.

Both themes: identical to the tenth of a pixel on every cell. Horizontal overflow
(`scrollWidth − clientWidth` on `documentElement`) is **0** on all forty measured rows, and no control
is off-viewport at any of the four widths.

**Which state and which seed every cell above is read in — added at run 2a, because not naming it is
what produced F-G5-2.** Two storage conditions reach this screen and they are different application
states, not two readings of one:

| Condition | How it is reached | D4 `top` at 390 — R1, R2, R4, Silence | D4 `top` at 390 — R3 | Margin D4 → `#divisor-alert` at 390 |
|---|---|---|---|---|
| **seeded**, as § 14 seeds it (`grossSalary 3000`, `monthlyHours 220`, `workMinutes 528`, `salaryPeriod hour`, `workDaysPerWeek 5`, then the one key each state overrides) | `localStorage` written in an init script before the first paint | **1294.16** | **1234.30** | **129.0** |
| **unseeded**, which is what an e2e driver that types into the form produces | nothing in `localStorage`; the state is driven through the controls | **1310.53** | **1234.30** | **276.0** |

Both conditions are correct readings, of different states, and the two differences have two different
causes, each measured rather than inferred:

- **`+16.37` on the four figure-bearing states** — unseeded, `grossSalary` is 0, so the hero numeral
  is `R$ 0,00` (7 characters) instead of `R$ 12,51` / `R$ 13,76` (8). `components/organisms/hero-panel.tsx:53` sizes the
  numeral by `clamp(2.5rem, 208/value.length cqi, 6rem)`, so a shorter string is a **larger** numeral
  and a taller `order-first` column: **478.97** against **462.59**. **R3 is identical in both
  conditions at 1234.30**, because in R3 the hero holds no figure for the string length to size.
- **`+147.0` on the margin** — unseeded, `isRealAmount(grossSalary)` is false, so the *"Informe o seu
  salário bruto"* `AlertBanner` renders **between** D4 and `#divisor-alert`: **123.0** of banner plus
  **24.0** of `mb-6`. `129.0 + 147.0 = 276.0`, measured in all four banner states and both themes.

**The 129.0 px margin and clause 2c's ordering are the state-invariant quantities here, and the
absolute `top` values are not.** The margin is 129.0 at 390 in every banner state under the seeded
condition and 276.0 in every banner state under the unseeded one; at 1440 it is **87.0** and at 2560
and 3840 **74.25**, in every state, both themes. Nothing in § 15.1's placement or in § 15.4's
accounting moves.

**Against the shipped page** (Silence, the product's common case): card **806.8 → 953.1** at 390
(**+146.3**), **619.5 → 723.9** at 1440 (**+104.4**), **696.1 → 790.0** at 2560 and 3840 (**+93.9**).
At 390 that is 17.4 px of field (run 1 § 2.3) and **129.0 px of D4**.

### 15.4 The three numbers addendum A projected, corrected by measurement

`legal.md` § *Run 3 — addendum A* § *What it costs* is right that run 1's +60 px does not survive its
own arithmetic, and its own replacement numbers do not either. All three are replaced here, and the
direction of the correction is the same in each case — **the obligation costs more than projected, and
the return is larger than projected**:

| Projected in addendum A | Measured here | Why they differ |
|---|---|---|
| `5 × 17,4 + 8 ≈ **95 px**` for the permanent slot | **129.0 px** at 390 (105.0 of text + 24.0 of `mb-6`) | The 95 assumes `--text-caption`. The slot ships at `--text-body-sm` (§ 15.5), whose line box is 21 px, and the projection omitted the separation from whatever renders next. The **5 lines** it derives are confirmed by measurement at 390 — that half of the arithmetic was right |
| `−42 px` returned by removing D4 from the banner bodies | **−134.0 px** at 390, **−71.0 px** at 1440, on **R3 and R4** | The 42 came from run 1 § 8.1, where it priced only *raising D4's budget* from 160 to 220 characters. The whole sentence is what leaves: inside the banner, at the 282 px body measure, `D-4` renders **6** lines — 126 px — plus one 8 px `space-y-2` gap. Measured: R4 banner **419.0 → 285.0**, R3 **378.0 → 244.0** |
| `≈ +95 px` where no banner renders, `≈ +53 px` where one does | **+129.0 px** on R1, R2 and Silence; **−5.0 px** on R3 and R4 | Both corrections compound. R3 and R4 end up **cheaper than run 1's design**: the slot costs 129.0 and the banner gives back 134.0 |

**The shape of the result is worth stating plainly, because a plan built on the projection would get
it backwards.** Making D4 unconditional is **not** a uniform surcharge. It is paid in full in the
three states that carried no D4 before — including Silence, the common case — and it is very slightly
*refunded* in the two states that already carried it, because one paragraph at the card's full measure
is shorter than the same paragraph indented inside a banner.

### 15.5 `--text-body-sm`, not `--text-caption` — priced, not assumed

Run 1 § 9.1's Option B specified `--text-caption`. Measured, both at 390:

| Step | lines at 390 | slot height | cost with `mb-6` | ratio, light | ratio, dark |
|---|---|---|---|---|---|
| `--text-caption` + `--color-ink-subtle` | 5 | 87.0 | **111.0 px** | 5.06:1 | 5.25:1 |
| **`--text-body-sm` + `--color-ink-muted`** ← **ships** | 5 | **105.0** | **129.0 px** | **5.87:1** | **7.49:1** |

**18 px buys the most load-bearing disclosure in this spec the same type step every other disclosure
on this screen already has.** Three reasons, in order:

1. **Lesson 018.** A disclosure rule is a rendering condition as well as a DOM condition, and a rule
   about where a string sits cannot see a string that renders unreadably. D4 now renders on **every
   correct calculation**; setting it one step below `D-1` and `A-3`, which render beside it in the same
   card in two of the five states, would mark the unconditional disclosure as the least important one
   on the surface.
2. **It costs nothing anybody is counting.** The whole 129 px is below the fold at 390 in every state
   (§ 15.6), and `0008`'s above-the-first-input budget stays at 0.0 px either way.
3. **Both are the same five lines at 390.** The step change costs 18 px, not a line count.

`--text-caption` remains the right step for the page footer in `components/organisms/calculator-views.tsx`,
which is page-level and not panel-level. This slot is neither a footnote nor a hint.

### 15.6 First screen, and the number `0010` gets (AC15)

**Verified, not accepted, and at run 2a re-verified per state.** Addendum A states there is no
first-screen cost. Every pair below is a *shipped* reading and a *with-this-spec* reading of **the
same application state**, at 390×844, both themes, under § 14's seed — `shipped` is commit
**`5c0c6fa`** built and served in an isolated copy, `with this spec` is the delivered working tree
built and served beside it, identical flags, identical ports policy (§ 15.12).

| Quantity | State | Shipped `5c0c6fa` | With this spec | Δ |
|---|---|---|---|---|
| bottom of `#salario-bruto`, the first control | R1, R2, R4, Silence | 864.09 | **864.09** | **0.0** |
| bottom of `#salario-bruto`, the first control | **R3** | 804.23 | **804.23** | **0.0** |
| document `top` of the D4 slot | R1, R2, R4, Silence | — | **1294.16** | — |
| document `top` of the D4 slot | **R3** | — | **1234.30** | — |
| document `top` of the divisor banner | R4 (mismatch) | 1276.77 | **1423.16** | **+146.39** |
| document `top` of the divisor banner | **R3** | 1216.91 | **1363.30** | **+146.39** |
| unoccluded first-screen band (header 65 → tab bar 766) | all five | 65 → 766 | 65 → 766 | — |

> **Corrected at G5 triage (F-G5-2), run 2a.** The sentence this section carried — *"the D4 slot's
> `top` is 1294.2 in every one of the five states"* — was false in R3, and the `864.1` and `1276.8`
> cells beside it were single-state readings printed without their state. The **conclusion is
> unchanged and is now measured in all five**: the first-input delta is **0.0 px in every state**,
> and the `+146.39` the divisor banner moves by is **state-invariant**. What is state-dependent is
> every *absolute*, by exactly the **59.86 px** the `order-first` hero loses in R3 (§ 15.3).

The D4 slot's `top` is **1294.16 in four of the five states and 1234.30 in R3**. The worst case of
the two for this clause is R3, and **1234.30 is still 468.30 px below the last unoccluded pixel**
(766) of the first screen. **Nothing this spec adds is on the first screen in any state, and nothing
it adds is above the first input in any state.** `0008`'s ceiling is untouched; run 1 § 13's 0.0 px
stands, and it now stands on five measured states rather than one.

**The +17.4 px handed to `0010` is unchanged, and the reason it is unchanged is now measured.** Run 1
attributed it entirely to the *Jornada Diária* hint wrapping from one line to two as its column
narrows from 308 px to 148 px, and not to the label. With `F-1` = `Dias Trabalhados`:

- **the label is 16 characters and renders on 1 line** at the 148 px column (measured `labelLines = 1`
  at all four widths, both themes) — **D-F1 is resolved at 0.0 px**, exactly as `STATUS.md`
  recommendation (1) predicted, and the `items-end` workaround of run 1 § 8.1 option (2) is not needed
  and is withdrawn;
- **the 44-character `hint.jornada` still renders 2 lines** at 148 px (measured `hintLines = 2`), so
  the 17.4 px is still being spent, and still by the hint.

**So the lever run 1 named still holds and is still unspent:** a `hint.jornada` of **≤ 19 characters**
takes this spec's below-the-grid cost to **0.0 px**. `copy.md` run 2 moved two strings and
`hint.jornada` was not one of them, so it is unchanged at 44 characters. This is a statement of the
lever, not a request — the hint ties a field to another tab and that job is worth a line.

`0010`'s row of run 1 § 13 is replaced by § 15.11.

### 15.7 LR2a, re-verified on the surfaces whose strings changed

`0006`'s LR2a budget is `body width ≥ banner root width − 32`. Both banner bodies lost 212 characters
(`A` 489 → 277, `B` 521 → 309), so both were re-measured rather than inherited:

| Width | banner root | body `<p>` | budget (root − 32) | margin | verdict |
|---|---|---|---|---|---|
| 390 | 308.0 | **282.0** | 276.0 | +6.0 | **pass** |
| 1440 | 667.3 | **641.3** | 635.3 | +6.0 | **pass** |
| 2560 | 961.0 | **932.0** | 929.0 | +3.0 | **pass** |
| 3840 | 961.0 | **932.0** | 929.0 | +3.0 | **pass** |

Identical in both themes, and identical in **all four banner states** — R1, R2, R3 and R4 return the
same widths, because the banner's box does not depend on how many paragraphs sit in it. The six
pixels run 1 measured at 390 are **still six pixels**: removing a paragraph changes the body's height,
never its width, so the margin could not move. The 2560/3840 margin is **+3.0**, not +6.0, because the
banner's `px-3` scales with the 18 px root while LR2a's 32 is a fixed CSS-pixel ceiling; that is a
property of the shipped budget, not of this change, and it passes.

**The D4 slot is not an LR2a subject** and must not be added to its set: it is not inside an
`AlertBanner`, it has no border and no horizontal padding of its own, and it renders at the card's
full inner measure — 308.0 at 390 against a card content width of 308.0, i.e. zero chrome.

### 15.8 States, motion and live regions for the new slot

| Element | rest | hover | focus-visible | active | disabled | loading | error | empty | live-updating |
|---|---|---|---|---|---|---|---|---|---|
| D4 slot (`<p>`) | the only state it has | — | — | — | — | — | — | **impossible** — the string is a constant, never interpolated | **never updates** |

It is static text with no interactive descendant, no `tabindex`, and no state. That is the point of
it: a disclosure that can be in only one state cannot fail to render in one.

**Motion: none, and that is specified rather than omitted.** The slot never mounts, unmounts or
changes, so nothing may be attached to it — no `motion` element, no `AnimatePresence` child, no
transition utility. Consequently it needs **no `prefers-reduced-motion` path**, because there is no
animation to neutralise. Run 1 § 7's motion table is unchanged and still covers everything on this
surface that does move — the banners.

**It is outside every live region, deliberately.** `aria-live` announces *changes*; this string never
changes, so a live wrapper would re-announce a constant every time a sibling re-renders, on a surface
that already updates as the user types (`PRODUCT.md` §5). The banners keep the `role="alert"` /
`role="status"` run 1 § 4 assigns them. **Tab order is unchanged** — the slot adds no tab stop, so the
order stays `#salario-bruto` → *Regime de Trabalho* → `#horas-mensais` → `#jornada-diaria` →
`#dias-semana` → `Impostos e Descontos`.

### 15.9 Tokens for the slot — both themes, no new token

| Property | Token / utility | Light | Dark |
|---|---|---|---|
| element | `<p>` at the card's full inner measure | both | both |
| type step | `--text-body-sm` (0.875rem / 400 / 1.5) | both | both |
| colour | `--color-ink-muted` | `#5f656f` | `#a6abb5` |
| surface behind it | `--color-surface` (the card) | `#ffffff` | `#181b21` |
| **contrast** | measured pair, WCAG 2.2 AA needs 4.5:1 | **5.87:1 — pass** | **7.49:1 — pass** |
| space above | inherited from the field grid's `mb-8` = **32 px** | both | both |
| space below | `mb-6` = **24 px** | both | both |
| wrapping | `text-pretty` — the shipped idiom for prose on this screen | both | both |

Ratios computed by me from `DESIGN.md`'s frontmatter hexes by the WCAG 2.x relative-luminance formula,
as run 1 § 0 requires. No raw hex, no arbitrary value, **no new token, and no `DESIGN.md` change** —
the section titled *System change* in run 1 still reads *none*.

### 15.10 Copy slots amended at run 2

Four rows of run 1 § 8 move; everything else in that table stands.

| Slot | Run 1 | Run 2 |
|---|---|---|
| `label.dias` | ≤ 19 chars, 1 line — **open, D-F1** | **closed.** `Dias Trabalhados`, 16 chars, **1 line measured** at 148 px, all four widths |
| `body.R3.d4` | D4 as the banner's third paragraph, ≤ 220 chars | **deleted.** D4 does not render in this body |
| `body.R4.d4` | D4 as the banner's third paragraph, ≤ 220 chars | **deleted.** Same |
| `d4.permanent` | — | **new.** Role: names the categories whose salário-hora this screen cannot price, and says the consequence conditionally. `--text-body-sm`, **≤ 220 chars**, **≤ 6 lines at 390** (delivered: 212 chars, **5 lines**, 105.0 px). Renders in all five states, exactly once |
| `body.R3.d1` / `body.R4.d1` | fourth paragraph | **third paragraph** (`A-5` / `B-5`). Budget unchanged at ≤ 140 chars; delivered `D-1` is 120 and measures **3 lines** at 390 |
| `hint.jornada` | ≤ 44 chars, ≤ 2 lines | unchanged. Still 44, still 2 lines, still the whole of the +17.4 px |

Run 1 § 8.1's projected banner heights — *R4 ≈ 440 px, R3 ≈ 398 px* — are **replaced by measurement**:
**R4 = 285.0** and **R3 = 244.0** at 390. Both projections were high even before D4 left, which is the
same lesson the +60 px taught: a projection from a character count and a projection from a measured
render are not the same quantity, and only one of them is allowed to enter a plan.

### 15.11 What run 2 hands forward

| To | What | Value |
|---|---|---|
| **`.specs/0010-…`** (AC15) | The first-screen cost, re-measured with the delivered strings | **+17.4 px** at 390×844, **unchanged from run 1**, and still entirely the `hint.jornada` wrap at 148 px. `F-1` at 16 characters costs **0.0 px**. **Corrected at run 2a:** the divisor banner's absolute `top` moves **1276.77 → 1423.16** in **R4** and **1216.91 → 1363.30** in **R3** — the **+146.39** is state-invariant, the absolutes are not. The D4 slot's `top` is **1294.16** in R1, R2, R4 and Silence and **1234.30** in **R3**, against an unoccluded band of **65 → 766**. Nothing is on the first screen **in any of the five states**; the worst case is R3's 1234.30, which clears 766 by **468.30 px**. |
| **`.specs/0008-…`** | Height added above `#salario-bruto` | **0.0 px**, re-measured per state at run 2a: **864.09 → 864.09** in R1, R2, R4 and Silence, **804.23 → 804.23** in R3. The delta is 0.0 in every state; the absolute is state-dependent by the 59.86 px the `order-first` hero loses in R3. Unchanged and unnegotiated. |
| **`tech-lead` (G4)** | The number to plan against, in place of addendum A's projection | **+129.0 px** at 390 on R1, R2 and **Silence**; **−5.0 px** on R3 and R4. Card, common case: **806.8 → 953.1** at 390. Not +60, not +95, not +53. |
| **`tech-lead` (G4)** | The D4 slot as a build instruction | One unconditional `<p>` in `components/organisms/salary-calculator.tsx`, next sibling after the field grid, `text-body-sm text-ink-muted text-pretty mb-6`. Not inside `AlertBanner`, not inside `CollapsiblePanel`, not in any conditional. **No new component file, no change to `components/atoms/alert-banner.tsx`.** |
| **`qa-engineer` / `web-standards-auditor` (G6)** | The guard addendum A clause 4 demands | Assert D4's text in the card in **each of the five states** and count the set **before** iterating: expected **5**, measured 5, no exemptions (`AGENTS.md` §5 — a boolean carries no record of its sample). A selector scoped to `[role="status"]` or `[role="alert"]` **cannot see Silence** and does not discriminate. Assert **exactly one** occurrence per state for the non-duplication clause. |
| **`labor-law-analyst` (G6)** | § 15.1's inversion | Addendum A clause 2 is unsatisfiable as written given the same section's refusal of Option C, because the salário-hora figure renders in the `aside`. Placement is unaffected; the **clause's text** needs correcting, and it is not `product-designer`'s to correct. |
| **`labor-law-analyst`** | **F9** | Noted, **not designed for**. `hooks/use-gross-hourly-rate.ts` → `components/organisms/day-summary.tsx` is outside this spec's bound; nothing in run 2 places, sizes or anticipates a disclosure there. |

---

## 15.12 Run 2a — the correction, and the instrument that produced it

> **Scope: two cells and one sentence.** `F-G5-2` routed § 15.3's `document top` row and § 15.6's
> *"1294.2 in every one of the five states"* as wrong in R3. Both are corrected above. **No
> placement, no token, no state, no motion, no copy slot and no disclosure moves**, and § 15.4's
> **129.0 px** accounting is re-measured unchanged. This is not a run 3 and it re-opens nothing.

**The artifact.** `AGENTS.md` §4 rule 6: not the shared checkout and not the shared `.next`. Two
isolated copies, each with its own `.next` and its own confirmed-free port, both built with
`playwright.config.ts`'s three `NEXT_PUBLIC_*` values (`NEXT_PUBLIC_GA_ID=G-TEST12345`,
`NEXT_PUBLIC_ENABLE_ADS=true`, `NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000`), `rm -rf .next`
before the first build in each, `pnpm build` then `next start`:

| Copy | Built from | Port |
|---|---|---|
| `delivered` | the working tree as `frontend-dev` left it after T1–T8, `rsync` of the checkout minus `node_modules`/`.next`/`.git`, `node_modules` hard-linked with `cp -al` | **3417**, confirmed free with `ss -ltn` before binding |
| `shipped` | `git archive 5c0c6fa`, the commit `design.md` run 2 calls *the shipped page*, same `cp -al` | **3418**, confirmed free the same way |

A sibling agent's `next-server` was already holding **3100** from another session's copy; it was left
alone, and no measurement in this section ran against it. `uptime` before the runs: load average
**4.00–6.05** on **16** cores. No other browser process was running (`ps` for
`chrome|chromium|playwright|firefox` returned nothing) at launch.

**The quantities, and how each was read.** Chromium 1.63.0, `deviceScaleFactor: 2`, `isMobile: true`
and `hasTouch: true` at 390, `colorScheme` set explicitly per context, `networkidle` + 900 ms settle.
**Border box**, `box-sizing: border-box` read from `#divisor-disclosure`'s computed style on every
row; root font size read per row (**16 px** at 390 and 1440, **18 px** at 2560 and 3840) and the
slot's computed size with it (**14 px** / **15.75 px**). Document `top` is
`getBoundingClientRect().top + window.scrollY` — the same quantity clause 2b sorts on — never a
DOM-ordered walk. Line counts are `Range.getClientRects()` de-duplicated on rounded `top`.

**What was measured, and what it returned.** 64 cells for the state matrix — 2 themes × 4 widths ×
7 divisor kinds plus the unseeded Silence cell — and 10 more for the unseeded driven condition at
390. Findings:

1. **R1's and R2's rows in § 15.3 name a *class*, and the class has two members each.** Measured at
   390: `too-many-week-days` **144.0** and `no-week-days` **122.0** for R1; `daily-cap-exceeded`
   **206.0** and `weekly-cap-exceeded` **186.0** for R2. § 15.3's 144.0 and 206.0 are the **tallest
   member of each class**, which is what § 14 says it measured, and they are the right numbers for a
   worst-case table. The shorter sibling of each class is recorded here so the next reader does not
   have to rediscover that the cell is a maximum rather than an invariant.
2. **Every other cell of § 15.3 reproduced to the hundredth of a pixel**, in both themes: banner
   heights 144.0 / 206.0 / 244.0 / 285.0 at 390, card 1121.14 / 1183.14 / 1221.14 / 1262.14 / 953.14,
   1440 card 849.86 / 870.86 / 928.86 / 928.86 / 723.86, and 2560 = 3840 at 907.83 / 931.45 / 973.08
   / 996.70 / 789.95. D4 is **105.0 px over 5 measured line boxes at a 308.0 measure** at 390,
   **63.0 over 3 at 667.33**, **47.25 over 2 at 961.0**.
3. **Horizontal overflow is 0 on all 74 rows**, at every width, in both themes, in every state and
   in both seed conditions.
4. **Both themes are byte-identical on every geometric cell**, checked by comparing the dark and
   light objects row by row rather than by asserting it.
5. **The shipped/delivered pairs of § 15.6 were read on the two copies in the same state**, which is
   what makes them a delta rather than two numbers: card **806.75 → 953.14** in Silence, divisor
   banner **1276.77 → 1423.16** in R4 and **1216.91 → 1363.30** in R3, `#salario-bruto` bottom
   **864.09 → 864.09** in the figure-bearing states and **804.23 → 804.23** in R3.

**The lesson this correction is written against.** *Every geometric cell names the application state
it was read in, or it is not a cell.* An invariance claim — *"identical in all five states"* — is a
claim about five measurements and must be produced by five, not by one measurement and an argument
about the markup. The argument was even correct about the markup: the `<p>` is unconditional and its
**height** never moves. What it could not see is that the element's **position** is downstream of a
sibling column whose content the same condition changes, and `order-first` puts that column above it
at 390 in CSS while leaving it after it in the DOM.
