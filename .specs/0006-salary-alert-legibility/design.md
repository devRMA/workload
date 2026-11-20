# 0006 — Salary alert legibility

> Owner: product-designer · Gate: `design` · Run 2 — the root-font-size model at 2560 corrected
>
> **What run 2 changed, and nothing else:** six numbers and the sentences that state the `rem` model.
> The root is **18px from a viewport of exactly 2560 upward**, not 17px — `160rem` in a media
> *feature* resolves against the browser's initial 16px root, so the 17px band is `[1920, 2559]` and
> no reference width in this matrix sits in it. Verified twice in this tree before it was written
> down: a chromium probe over `app/globals.css:214-238`
> (`1919 → 16px · 1920 → 17px · 2559 → 17px · 2560 → 18px · 3840 → 18px`) and the production-build
> measurements in `evidence/measurements-before/` (`961 / 887 / 74` at **both** 2560 and 3840).
> The mechanism §2 and §4.1 argue — the budget is in px, the padding is in `rem`, so the widest root
> binds — is untouched, and the per-root cost is unchanged at 26 / 27.5 / 29. **The remedy does not
> change:** `px-3 py-4`, icon out of the body's column. `px-3.5` is now red from 2560 up rather than
> at 3840 alone, which widens §3.2's rejection rather than reopening it. §§0, 5, 6, 7, 8 and 12 were
> not opened.
>

> **Geometry only.** No string, no number, no colour, no radius, no shadow, no motion and no `role`
> changes. No new token, no new type step, no new curve, no new spacing step. The whole remedy is
> two horizontal measurements inside `components/atoms/alert-banner.tsx`, and both are already on
> `DESIGN.md`'s eight-step scale.
>
> Binding inputs: `spec.md` run 2 (six amendments applied), `legal.md` §§3–5 (G2 **pass**),
> `DESIGN.md`, `PRODUCT.md` §5, `app/globals.css` read at `ba94c2d`.

---

## 0. The measurement this gate was asked for

`spec.md` E7 estimates the banner's horizontal chrome at "~68px" and marks the arithmetic as
unconfirmed until a browser sees it. It is **66 px**, and it is confirmable without a browser
because the whole chain is static and it reproduces `0005`'s two measured numbers exactly.

### 0.1 — Where the 66px goes

Read from `components/atoms/alert-banner.tsx:23-27` at `ba94c2d`, with Tailwind's preflight
`box-sizing: border-box` in force and `--spacing: 0.25rem` from `app/globals.css`:

| Part | Class | Cost (both sides) | What it buys |
|---|---|---|---|
| Border | `border` + `border-<hue>/30` | **2 px** | The alert's outline. `DESIGN.md` § Shapes, *The Hairline Rule* — 1px, always. |
| Horizontal padding | `p-4` | **32 px** | Breathing room inside the fill. |
| Icon | `h-5 w-5` on `IconAlertTriangle` | **20 px** | `DESIGN.md` § Iconography — 20px is the sanctioned size beside a field-scale element. |
| Icon→text gap | `gap-3` on the root flex row | **12 px** | `DESIGN.md` § Iconography — `gap-3` is the sanctioned gap *at 20px*. |
| Dismiss control | — | **0 px** | **There is none.** The atom has no dismiss affordance and reserves no space for one. There is nothing to reclaim here, and `spec.md` § Non-goals forbids adding one. |
| **Total** | | **66 px** | |

### 0.2 — The chain that proves it

Every step below is a static class, so the arithmetic is deterministic.

**At 390 × 844** (no scrollbar under device emulation):

```
viewport                                                       390.00
− page gutter  px-4  (calculator-views.tsx:64)      2 × 16  =   358.00   ← the 358px in legal.md §4.3
  max-w-app (1280) not binding; grid is one column below lg
card outer width (salary-calculator.tsx:77,
                  journey-form.tsx:78, day-summary.tsx:135)      358.00
− card border 1px × 2                                            356.00
− card padding p-6                                  2 × 24  =   308.00   ← AlertBanner root, all five
− banner chrome (§0.1)                                      =   242.00   ← bodyText  ✔ matches E3
```

**At 1440 × 900:**

```
container max-w-app = 80rem @ 16px root                       1280.00
grid-cols-12, gap-8 (32px): track = (1280 − 11×32)/12      =    77.33
main column lg:col-span-7 = 7 tracks + 6 gaps              =   733.33
− card border 1px × 2, − card padding sm:p-8 (2 × 32)      =   667.33   ← AlertBanner root
− banner chrome (§0.1)                                     =   601.33   ← bodyText  ✔ matches E3
```

Both fall out at **242.00** and **601.33**, the two values `0005` G6 and G9 measured in a real
browser and `legal.md` §4.1 derives its character-width bound from. The box model is confirmed; E7's
68 is an arithmetic slip of 2px in the spec's prose and the correct figure is **66**.

### 0.3 — The same container holds all five

C1, C2 and C3 (`salary-calculator.tsx`), C4 (`journey-form.tsx`) and C5 (`day-summary.tsx`) each sit
as a block-level child of a card whose classes are character-for-character identical —
`bg-surface rounded-xl p-6 sm:p-8 shadow-card border border-line` — inside `CalculatorLayout`'s
`main` slot. Every banner in this spec therefore has **the same root width and the same 66px of
chrome at every viewport**. There is one geometry, so there is one remedy, and no consumer needs an
exception (§3.4).

---

## 1. Intent — what the eye does in the first two seconds at 390

The banner is not the answer; it is the reason the answer is missing or the reason the answer is
not the whole story. On `/custo-da-hora` cold, it is the only sentence on the screen carrying
meaning, and it must be read, not scanned.

- **0–1 s** — the hue. A field of `--color-negative-soft` or `--color-overtime-soft` behind the card's
  white, with the triangle at its top-left corner. The reader knows *something is wrong here* before
  reading a word. Unchanged by this spec.
- **1–2 s** — the **title**, `font-semibold` on the icon's baseline. Six words, one clause, one line
  or two. Unchanged by this spec.
- **2 s onward** — the **body**, which is where this spec acts. Today the eye drops from the title
  into a 242px trench indented 32px under the icon and reads four to nine two-to-four-word lines.
  After the remedy it drops into a paragraph that starts at the banner's own left edge and runs the
  full width of the card. **That left edge, and the 40 px of measure it recovers, is the entire
  design change.**

The order does not change. What changes is that the third step stops being work.

---

## 2. The rule that decides everything below

`legal.md` §3.2, **LR2a**, binding at every viewport in both themes:

```
bodyText.getBoundingClientRect().width  ≥  surfaceRoot.getBoundingClientRect().width − 32
```

`surfaceRoot` is the `AlertBanner` root `<div>`; `bodyText` is the `<p>` the consumer passes as
`children`. The 32 CSS px is a **budget for the surface's own border and horizontal padding**. A
surface may spend less; none may spend more.

Today the banner spends **66**. That is the defect, stated as one number.

Three consequences the design is built around:

1. **The budget is in CSS px, not in ems.** It does not grow with the root font size, so a padding
   expressed in `rem` eats a larger share of it at 2560 and 3840 — both an 18px root — than at 390
   and 1440, which are both 16px. Any remedy has to clear the budget at an **18px root**, that is at
   every width from 2560 up, not at 390 (§4.1).
2. **The budget cannot pay for an icon that sits in the body's flow.** 2 (border) + 20 (icon) +
   12 (gap) = 34px before a single pixel of padding. With the icon inline, LR2a is unsatisfiable at
   *any* padding, including zero. The icon must leave the body's column — that is not a preference,
   it is arithmetic.
3. **It cannot be paid by deleting the chrome either.** LR2a is trivially satisfied by a bare `<p>`,
   and `spec.md` § Non-goals protects the banner's visual identity. The design keeps the border, the
   fill, the ink, the radius, the role and the 20px icon, and spends **26 of the 32**, leaving 6px
   of headroom at 390 and 1440, and 3px from 2560 up.

---

## 3. The remedy — what yields, by how much, at which breakpoint

Two changes. Both are geometric, both live in the atom, both reach all five consumers, and neither
introduces a value that is not already a sanctioned step of `DESIGN.md`'s spacing scale.

### 3.1 — Change A: the icon leaves the body's column (+32 px, every viewport)

**Today** the root is `flex items-start gap-3` and the icon is its first flex child, so the icon and
its gap are subtracted from **the whole text block — title and body together**, at every viewport.

**The change:** the icon moves into the **title row**. The root stops being a flex row and becomes a
plain block; the icon and the title form the flex row; the body becomes a full-width sibling
beneath it.

What the reader sees is unchanged in every respect a person could name: the same triangle, at the
same 20px, in the same colour, at the same optical position — top-left, on the title's first line,
12px from it. What changes is that the **body prose no longer hangs indented under the icon**.

> **Why this is a geometry change and not a restyle.** `spec.md` § Out of scope protects
> `AlertBanner`'s "tone colours, its `role`, the presence of the icon, its corner radius and its
> elevation", and explicitly grants `product-designer` at G3 the right to change "horizontal
> padding, icon size, icon placement, flow direction, and their breakpoint behaviour" where AC4
> cannot be met otherwise. This change spends exactly two of those four — **icon placement** and
> **flow direction** — and spends **no** icon-size change. AC4 cannot be met otherwise: §2,
> consequence 2 shows the inline icon alone overspends the budget by 2px before any padding.

### 3.2 — Change B: horizontal padding `p-4` → `px-3 py-4` (+8 px, every viewport)

16px of horizontal padding costs 32, and 2 (border) + 32 = **34 > 32**. With the icon already moved,
`p-4` still fails LR2a — by 2px, at every viewport and in both themes. So the padding must yield.

| Candidate | Horizontal cost | LR2a spend at 16px root | On `DESIGN.md`'s eight steps? | Verdict |
|---|---|---|---|---|
| `p-4` — 16px | 32 | **34** | yes | **Fails** by 2px, everywhere |
| `px-3.5` — 14px | 28 | 30 | **no** — 3.5 is not one of `0.5, 2, 3, 4, 6, 8, 12, 16` | **Forbidden.** Also fails from 2560 up (§4.1): 2 + 2×15.75 = **33.5** |
| **`px-3` — 12px** | **24** | **26** | **yes** | **Chosen.** Clears at every one of the four reference widths |
| `px-2` — 8px | 16 | 18 | yes | Rejected — buys 8px the design does not need and reads as a chip, not an alert |

**Vertical padding stays `py-4` (16px).** The banner's vertical presence is what makes it read as a
panel rather than a rule, LR2a is a horizontal rule and buys nothing from vertical padding, and
`DESIGN.md` § Layout reads 16 as "the internal padding of a compact control" — which is what `py-4`
keeps it. The 12/16 asymmetry is deliberate and is the price of the 32px budget.

**No breakpoint variation.** `px-3` applies at 390, 1440, 2560 and 3840 alike. LR2a's budget is an
absolute px count, so padding may not grow with the viewport even though the card's does; a
`sm:px-4` would reintroduce the exact failure at every width above 640. The banner's side gutters
are therefore tighter than the card's at every size, by design — the card pads the page, the banner
pads the sentence.

### 3.3 — What does not yield

| Part | Stays | Why |
|---|---|---|
| Border 1px | `border` + `border-<hue>/30` | `DESIGN.md` *The Hairline Rule*. 2px is 6% of the budget and 100% of the alert's edge. |
| Icon size 20px | `h-5 w-5` | `DESIGN.md` § Iconography sanctions **three sizes only**; 16px would be the size used beside `--text-body-sm`, but the icon here labels the *banner*, not a row, and shrinking it is a restyle the budget does not require. It now costs the body nothing. |
| Icon→title gap 12px | `gap-3` | `DESIGN.md` § Iconography — `gap-3` is the sanctioned gap at 20px. It now sits outside `bodyText`, so it is free. |
| Radius, fill, ink, shadow, `role`, `aria-hidden` on the icon | all | `spec.md` § Non-goals. None of them is horizontal. |
| Vertical padding, `space-y-1` between title and body | `py-4`, `space-y-1` | Not horizontal; changing either would be a restyle with no LR2a return. |

### 3.4 — One mechanism, five consumers, no exception

All five banners are block children of the same card at the same width (§0.3), and both changes live
in `components/atoms/alert-banner.tsx`. Every consumer inherits both with **no call-site change**:
C1–C3 and C4 keep their `className="mb-6"`, C5 keeps passing none.

**No consumer needs an exception, and none is granted.** If a build produces a different result at
one call site, the cause is a `className` collision at that call site, not a property of the
surface — see the build constraint in §9.

Whether the remedy is implemented in the atom or in its consumers is `tech-lead`'s call at G4
(`spec.md` § Open questions). This gate's output is the **geometry** in §4; any implementation that
produces those numbers at all five call sites satisfies it. The atom is named here because it is
where the 66px is spent, and because a per-consumer implementation would be five treatments of one
defect — which is how this defect returns.

---

## 4. Layout — the intended geometry the build is measured against

**Both themes produce identical numbers.** Nothing in the chain of §0.2 is theme-dependent: no
spacing, radius, border width or font metric differs between `:root` and `.dark` in
`app/globals.css`. Every row below is therefore the value in **light and dark alike**, and a
divergence between themes is itself a finding.

**The layout does not reflow.** No banner collapses, stacks, hides, truncates, scrolls or moves to
another container at any width. The only thing that moves is the body paragraph's left edge, and it
moves 32px left at every viewport at once. `DESIGN.md`'s *Scale-Don't-Reflow Rule* is not touched:
above 1920 the whole system keeps scaling with the root, and this design adds no breakpoint.

### 4.1 — All five consumers, all four reference widths

Chrome is the LR2a spend: `surfaceRoot.width − bodyText.width`. Budget is **32**.

| Width | Root size | Card padding | `surfaceRoot` (= card content box) | `bodyText` **now** | spend **now** | `bodyText` **intended** | spend **intended** | Headroom |
|---|---|---|---|---|---|---|---|---|
| **390** | 16px | 24px (`p-6`) | **308.00** | 242.00 | **66** ✗ | **282.00** | **26** ✔ | 6px |
| **1440** | 16px | 32px (`sm:p-8`) | **667.33** | 601.33 | **66** ✗ | **641.33** | **26** ✔ | 6px |
| **2560** | **18px** | 36px (`sm:p-8`) | **961.00** | 887.00 | **74** ✗ | **932.00** | **29** ✔ | 3px |
| **3840** | 18px | 36px (`sm:p-8`) | **961.00** | 887.00 | **74** ✗ | **932.00** | **29** ✔ | 3px |

**Derivations for 2560 and 3840 — they are the same row.** `app/globals.css` steps the root at
`@media (min-width: 120rem)` → 106.25% and `@media (min-width: 160rem)` → 112.5%, and a length in a
media *feature* resolves against the browser's **initial** root font-size (16px), never against the
cascaded one — so `160rem` is exactly **2560px**. At a viewport of exactly 2560 both queries match
and the later rule wins: the root is **18px**, identical to 3840. Measured in chromium in this tree:
`1919 → 16px · 1920 → 17px · 2559 → 17px · 2560 → 18px · 2561 → 18px · 3840 → 18px`. The 17px band is
`[1920, 2559]`, and **no reference width in this matrix sits in it**. From there the chain of §0.2 is
identical at both widths: `--container-app` = 100rem = **1800**; gutter and card padding `px-8` /
`sm:p-8` = 2rem = **36**; `grid-cols-12 gap-8` gives a track of **117**, so the `lg:col-span-7` main
column is **1035.00** and the card's content box is **961.00**. The banner's intended chrome is
2 (border) + 2 × `px-3` = 2 + 2 × 13.5 = **29**. Both rows are confirmed against the production build:
`evidence/measurements-before/chromium-C5-2560-light.json` and `…-3840-light.json` record
`surfaceRootWidth 961`, `bodyTextWidth 887`, `chromeSpend 74`, identical apart from `viewportWidth`.

**Note the direction of the headroom.** The spend *grows* with the root size because the padding is
in `rem` and the budget is in px: **26** at a 16px root, **27.5** at 17px, **29** at 18px. The binding
case is therefore **every viewport at an 18px root — every width from 2560 up** — at 29 of 32, and not
390. This is why `px-3.5` is rejected in §3.2 even setting the eight-step rule aside: it measures
2 + 2 × 15.75 = **33.5** at an 18px root and fails the rule it was chosen to satisfy on every screen
from 2560 up. Correcting the 2560 row *widens* that failing band; it does not rescue the half-step.

### 4.2 — Verdict against the criteria, per consumer

| # | Consumer | Domain | LR2a @ 390 | LR2a @ 1440 | LR2a @ 2560 | LR2a @ 3840 | Consequence if it fails |
|---|---|---|---|---|---|---|---|
| C1 | `salary-calculator.tsx:124` (DS3) | product | 26 ✔ | 26 ✔ | 29 ✔ | 29 ✔ | product failure |
| C2 | `salary-calculator.tsx:130` (DS5) | **LR** | 26 ✔ | 26 ✔ | 29 ✔ | 29 ✔ | **compliance blocker** + D-DEF |
| C3 | `salary-calculator.tsx:144` (DS6) | **LR** | 26 ✔ | 26 ✔ | 29 ✔ | 29 ✔ | **compliance blocker** + D-DEF |
| C4 | `journey-form.tsx:173` | product | 26 ✔ | 26 ✔ | 29 ✔ | 29 ✔ | product failure |
| C5 | `day-summary.tsx:251`, ×1–4 | **LR** | 26 ✔ | 26 ✔ | 29 ✔ | 29 ✔ | **compliance blocker** + D-DEF |

**LR1** (`width ≥ min(320, A)`): `A` is the card's content box — 308.00 at 390 — so the bar is 308.
The banner root is a block-level child at exactly 308.00 and is unchanged by this design; LR1 passes
at every width, as it does today. **LR3** is untouched: nothing here hides, clips, collapses or
defers a banner.

`legal.md` sets the floor at 32. This design clears it by 6px at the two viewports the criteria are
asserted at, and by 3px at the worst of the four. It does not merely meet it.

### 4.3 — The 390 measure residual, predicted and reported

**Not a criterion.** `spec.md` D-Q1 is settled by the human: at 390, LR2a is the whole obligation and
the characters-per-line value is **reported** under AC11, never judged. The table below is the
design's *prediction* so that a surprise at QA is legible as a surprise; it is not a promise and no
row of it is an acceptance criterion.

Method: `legal.md` §4.1's bound tightened with C1's own second measurement. C1's 97 characters occupy
exactly 4 line boxes at 242.00px, so a full line there carries `cap ∈ [24.25, 32.33)`, giving
**`k ∈ (7.48, 9.98]`** CSS px per character at `--text-body-sm`. Applying one string's `k` to another
is an approximation — `legal.md` §4.4 declines to promise a number it has not measured, and so does
this table.

| Consumer | chars | **390 today** (242px) | **390 intended** (282px) | **1440 today** (601.33px) | **1440 intended** (641.33px) | LR2b @ 1440 |
|---|---|---|---|---|---|---|
| C1 | 97 | 4–5 boxes · cpl 19.4–24.3 | 3–4 · **24.3–32.3** | 2 · 48.5 | 2 · **48.5** | ✔ |
| C2 | 111 | 4–5 · 22.2–27.8 | 3–4 · **27.8–37.0** | 2 · 55.5 | 2 · **55.5** | ✔ |
| C3 | ~174 | 6–8 · 21.8–29.0 | 5–7 · **24.9–34.8** | 3 · 58.0 | 3 · **58.0** | ✔ |
| C4 (longest of the 8) | 60 | 2–3 · 20.0–30.0 | 2–3 · **20.0–30.0** | 1 · 60.0 | 1 · **60.0** | exempt — single line box |
| C5 `daily-overtime-limit` | 207 | 7–9 · 23.0–29.6 | 6–8 · **25.9–34.5** | 3–4 · 51.8–69.0 | 3–4 · **51.8–69.0** | ✔ |
| C5 `short-day-break` | 184 | 6–8 · 23.0–30.7 | 5–7 · **26.3–36.8** | 3–4 · 46.0–61.3 | 3 · **61.3** | ✔ |
| C5 `minimum-lunch-break` | 203 | 7–9 · 22.6–29.0 | 6–8 · **25.4–33.8** | 3–4 · 50.8–67.7 | 3–4 · **50.8–67.7** | ✔ |
| C5 `rest-between-shifts` | 182 | 6–8 · 22.8–30.3 | 5–7 · **26.0–36.4** | 3–4 · 45.5–60.7 | 3 · **60.7** | ✔ |

Three things this table is for:

1. **LR2b at 1440 is predicted to pass for all five, with margin** — the worst lower bound is 45.5.
   C4's single line box is exempt under the `0005` G6 **B3** ruling.
2. **No consumer is predicted to reach 40 cpl at 390** — the highest upper bound is 36.8. AC3's
   non-regression clause therefore has nothing to bind at 390 on the fixed tree. If a measurement
   contradicts this, the *measurement* wins and that consumer's value becomes its floor.
3. **C1's cpl may not move at 390.** It is 4 boxes today and is predicted at 3 *or* 4. C1's LR2a
   spend drops from 66 to 26 either way. **A flat cpl on C1 is not a failed remedy** — it is D-Q1
   being exactly what the human accepted it to be, and AC11 is where it gets written down rather
   than explained away.

---

## 5. Component tree

Nothing is created. One atom changes shape internally; four organisms and one template are read and
left alone.

| Component | Level | Status | Path |
|---|---|---|---|
| `AlertBanner` | **atom** | **edit — internal geometry only** | `components/atoms/alert-banner.tsx` |
| `IconAlertTriangle` (`@tabler/icons-react`) | atom | reuse, unchanged | — |
| `SalaryCalculator` (C1, C2, C3) | organism | reuse, **unchanged** | `components/organisms/salary-calculator.tsx` |
| `JourneyForm` (C4) | organism | reuse, **unchanged** | `components/organisms/journey-form.tsx` |
| `DaySummary` (C5) | organism | reuse, **unchanged** | `components/organisms/day-summary.tsx` |
| `CalculatorLayout` | template | reuse, **unchanged** | `components/templates/calculator-layout.tsx` |
| `CalculatorViews` (page gutter `px-4`) | organism | reuse, **unchanged** | `components/organisms/calculator-views.tsx` |

**No new component, no wrapper, no layout primitive.** `spec.md` § Non-goals forbids generalising
this into a `<Prose>` or a measure token, and the remedy does not need one: the atom already owns
every pixel being moved.

### 5.1 — The intended shape of the atom

Two nodes change relationship; no node is added or removed.

**Today** (`alert-banner.tsx:20-30`) — root is the flex row, so the icon indents *both* rows of text:

```
div[role]  flex items-start gap-3  rounded-lg border p-4          ← surfaceRoot, 308.00 @ 390
├── Icon   mt-0.5 h-5 w-5 shrink-0                                ← 20px, inside the text's flow
└── div    space-y-1 text-body-sm                                 ← 242.00
    ├── p  font-semibold            {title}                       ← 242.00
    └──    {children} → p           {body}                        ← 242.00  bodyText  ✗ spend 66
```

**Intended** — the root is a block; the icon indents only the title:

```
div[role]  rounded-lg border px-3 py-4                            ← surfaceRoot, 308.00 @ 390
└── div    space-y-1 text-body-sm                                 ← 282.00
    ├── div  flex items-start gap-3                               ← 282.00   the title row
    │   ├── Icon  mt-0.5 h-5 w-5 shrink-0                         ← 20px
    │   └── p     font-semibold      {title}                      ← 250.00
    └──      {children} → p          {body}                       ← 282.00  bodyText  ✔ spend 26
```

Four notes on the shape, each of which is a decision and not an accident:

- **The inner `space-y-1 text-body-sm` wrapper is kept.** It could be collapsed into the root, and
  it must not be: the root is the node `cn()` merges the consumer's `className` into, and
  `--text-body-sm` is registered with `tailwind-merge` as a font-size (`DESIGN.md`
  *The Type-Step-Is-Not-a-Colour Rule*). Moving `text-body-sm` onto the root would put the banner's
  own type step one `className` prop away from silent deletion — the same class of defect that
  produced a real 3.77:1 failure on "Salvar Preferências". Keeping the wrapper also keeps the
  title↔body rhythm at `space-y-1` untouched.
- **`items-start` + `mt-0.5` are kept, not switched to `items-center`.** `DESIGN.md` § Iconography
  says `items-center` for an icon beside text; that is right for a one-line label and wrong here,
  because C3's and C5's titles run to 47 and 57 characters and wrap to two or three lines at 390
  (§4.3). Centring the icon against a three-line title would float it into the middle of the
  sentence. `mt-0.5` (2px — a sanctioned step) is the existing optical correction for a 20px glyph
  on a 21px line box, and it is preserved exactly. **This is a deliberate departure from a
  `DESIGN.md` line, it is pre-existing, and this spec preserves rather than introduces it.**
- **The title's own column narrows to 250.00px at 390** (282 − 20 − 12). LR2a binds `bodyText`, not
  the title; the longest title is 57 characters and wraps to two or three lines there, as it does
  today at 242px. The title gains 8px and the body gains 40px — the asymmetry is the point.
- **The icon stays a flex item with `shrink-0`**, so a long title never squeezes it.

---

## 6. Tokens

Every value below is an existing token or an existing sanctioned step. **Nothing on this page is a
hex, a raw px, a `rem` literal or an arbitrary value.** No token is added, removed, renamed or
re-valued.

### 6.1 — Geometry

| Element | Property | Token / step | Value @ 16px root | Changed? |
|---|---|---|---|---|
| Banner root | corner | `--radius-lg` (`rounded-lg`) | 20px | no |
| Banner root | border width | 1px (`border`) — *The Hairline Rule* | 1px | no |
| Banner root | horizontal padding | `--spacing` × 3 (`px-3`) | 12px | **yes** — was `--spacing` × 4 |
| Banner root | vertical padding | `--spacing` × 4 (`py-4`) | 16px | no |
| Inner text block | title↔body gap | `--spacing` × 1 (`space-y-1`) | 4px | no |
| Title row | icon↔title gap | `--spacing` × 3 (`gap-3`) | 12px | no — *but it now sits outside `bodyText`* |
| Icon | box | `--spacing` × 5 (`h-5 w-5`) | 20px | no |
| Icon | optical offset | `--spacing` × 0.5 (`mt-0.5`) | 2px | no |
| Consumer margin (C1–C4) | `--spacing` × 6 (`mb-6`) | 24px | no |

`px-3` is one of `DESIGN.md`'s eight sanctioned steps (`0.5, 2, 3, 4, 6, 8, 12, 16`) and reads in
that rhythm as "separates sibling rows" — one step below "the internal padding of a compact control".
**No `--spacing-*` key is declared**, so *The Numeric Scale Rule* and its unit test over
`app/globals.css` are untouched.

### 6.2 — Type

| Slot | Token | Size / weight / leading / tracking | Changed? |
|---|---|---|---|
| Title | `--text-body-sm` + `--font-weight-semibold` (`font-semibold`) | 14px / 600 / 1.5 / +0.005em | no |
| Body | `--text-body-sm` | 14px / 400 / 1.5 / +0.005em | no |

The type ramp is **out of scope with no override left** (`spec.md` § Out of scope, D-Q1). This design
proposes no step, no size, no weight and no tracking change, and does not reopen the question at any
viewport.

### 6.3 — Colour, both themes

Unchanged in every cell. Reproduced in full because AC4's rows are labelled per theme and a gate
downstream must be able to check the pairs without reopening the atom.

| Role | Tone `danger` | Tone `warning` |
|---|---|---|
| Fill | `--color-negative-soft` — light `#faebec`, dark `#3c1d24` | `--color-overtime-soft` — light `#faf4ea`, dark `#3a2f1f` |
| Border | `--color-negative` @ 30% (`border-negative/30`) | `--color-overtime` @ 30% (`border-overtime/30`) |
| Title, body and icon ink | `--color-negative-ink` — light `#bf2029`, dark `#f98078` | `--color-overtime-ink` — light `#905e16`, dark `#f8b35d` |
| Surface behind | `--color-surface` — light `#ffffff`, dark `#181b21` | same |
| Shadow | none — *The Flat-at-Rest Rule*; the banner is not one of the four floating layers | same |

The icon takes `currentColor`, i.e. the tone's `-ink` token, as `DESIGN.md` § Iconography requires of
`IconAlertTriangle`. Ratios in §11.2.

---

## 7. States

### 7.1 — `AlertBanner` root (`components/atoms/alert-banner.tsx`)

**The banner is not an interactive element.** It has no `tabindex`, no handler, no control and — per
§0.1 — no dismiss affordance, and `spec.md` § Non-goals forbids giving it one. The states below are
therefore stated as *applicable* or *not applicable with a reason*, as `DESIGN.md` § Components
requires, rather than left undefined.

| State | Specification |
|---|---|
| **rest** | The only visual state. Fill, border and ink per §6.3; geometry per §4.1. `bodyText` = `surfaceRoot − 26`. Identical in both themes. |
| **hover** | **N/A** — nothing here is actionable, and a hover response on a non-actionable surface reads as an affordance that does not exist. No cursor change, no tint. |
| **focus-visible** | **N/A on the banner itself** — it is not focusable and must not become focusable; a `tabindex="0"` on a static region adds a stop to the tab order that announces nothing new (its text is already read in DOM order, and `role="alert"`/`"status"` announces it on appearance). **Specified, not inherited:** the banner declares no outline rule of its own, so the global `:focus-visible` in `app/globals.css` remains the only source of a ring on this subtree, and it applies to nothing inside it because the banner contains only `<p>` elements. If a future banner ever carries a link, it takes the global `--color-focus` ring at 2px with a 2px transparent offset, painted against the tone's `-soft` fill. |
| **active** | **N/A** — same reason as hover. No `active:scale`, therefore no `motion-reduce:active:scale-100` neutralizer is owed (§8). |
| **disabled** | **N/A** — a disclosure has no disabled state. A banner that should not apply is not dimmed; it is not rendered. |
| **loading** | **N/A** — every banner's condition is computed synchronously from local state in `lib/` on the same render. There is no async boundary, therefore no skeleton and no spinner. A skeleton where a disclosure will be is a disclosure that is absent while it loads, which LR3 forbids. |
| **error** | **This surface *is* the error presentation.** There is no error-of-the-error state. The tone carries the severity — `danger` for an input the app cannot use, `warning` for a CLT limit crossed — per `DESIGN.md` § Alerts and `spec.md`'s protection of the tones. |
| **empty** | The banner **is not rendered at all**. Every consumer is behind a conditional (`hasGrossSalary ? null : …`, `issue ? … : null`, `warnings.map`). Nothing is reserved, no placeholder height is held, and the layout closes up. This is correct and is *not* the "silence is a defect" case: the empty state of C1 is a filled salary field, i.e. the condition the banner exists to report is gone. |
| **live-updating (as the user types)** | The state that matters on this surface. Each banner mounts and unmounts as the user types into the field that governs it — `grossSalary`, `monthlyHours`, `dailyMinutes`, the four journey times. Geometry is invariant across the transition: the root is a block child of a fixed-width card, so `surfaceRoot` is 308.00 at 390 the instant it mounts and never reflows afterwards. **There is no transition** (§8). Announcement behaviour in §11.3. |

### 7.2 — The one interactive element coupled to a banner

`DateTimeInput` (`components/molecules/date-time-input.tsx`) points at C4's banner with
`errorId={ISSUE_BANNER_ID}` → `aria-describedby`, and `hasError={issue?.field === "entry"}`.

| State | Specification |
|---|---|
| all eight | **Unchanged by this spec** and owned by `DESIGN.md` § Inputs. The only coupling is the `id` on C4's banner root, which this design preserves byte-for-byte: the `id` prop still lands on `surfaceRoot`, so `aria-describedby` keeps resolving and the field's error state keeps pointing at worded text (`DESIGN.md` *The Error Has Words Rule*). |

**A build constraint that follows:** the `id` prop must stay on the **root**, not migrate to the new
inner title row. Moving it would silently break `aria-describedby` while every visual check passed.

---

## 8. Motion

**This design adds, removes and changes no animation.** `spec.md` § Non-goals names "animation"
inside the protected visual identity of `AlertBanner`, so the gate has nothing to spend here.

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion behaviour |
|---|---|---|---|---|---|---|
| `AlertBanner` root | mount / unmount as the user types | **none** — the element appears and disappears in one frame | — | — | — | Identical. Nothing to suppress. |
| Icon, title, body | any | **none** | — | — | — | Identical. |
| Enclosing view (`calculator-views.tsx`) | route change between calculators | `opacity`, `y` (±12px) | spring, `bounce: 0, duration: 0.32` | — | 0 | Existing, untouched. Handled by `MotionConfig`/`useReducedMotion` per `DESIGN.md` § Motion, not by this surface. |

Three things this table asserts, not merely records:

- **No state-bound transform is introduced**, at any state, on any node. `AGENTS.md` §8's pairing
  obligation — `hover:-translate-y-1` needs `motion-reduce:hover:translate-y-0`, because a bare
  `motion-reduce:transform-none` loses on specificity — therefore has **no instance on this
  surface**, and none may be added as a flourish while the file is open. The neutralizers that do
  exist in the product (`button.tsx`, `copy-button.tsx`) are not touched.
- **A mount transition is deliberately not added.** `DESIGN.md` § Motion lists "alert" among the
  entering and exiting surfaces that animate, and this atom does not — a documented drift (§12.2).
  Closing it here would violate two rules at once: `spec.md` § Non-goals (animation on this atom),
  and `DESIGN.md`'s own *"Anything triggered by a keystroke must never queue an animation"* — every
  one of these five banners is triggered by a keystroke. **The drift should be closed in the
  documentation, not in the component.**
- **Nothing that moves is a number.** *The Numbers-Don't-Move Rule* is unaffected; no figure in a
  banner animates, and none did.

---

## 9. Copy slots

**No string is written, rewritten, shortened, split or re-punctuated by this spec**, and no
`content-writer` runs on it (`spec.md` § Out of scope, absolute — G2 has run and forced no string
change). The slots are specified anyway, with their budgets, because a budget that is never written
down is a budget the next writer cannot honour: the writer never sees the rendered layout and the
developer will not shorten a string on their own.

Capacities below are **measured slot widths** (§4.1) divided by the character-width bound
`k ∈ (7.48, 9.98]` from §4.3, at `--text-body-sm`. They are the width of one full line, not a
maximum for the slot: these slots hold wrapping prose, and a string that runs to several lines is
correct.

| Slot | Role | Type step | Column @ 390 | Chars per full line @ 390 | Chars per full line @ 1440 | Shipped length | Hard limit |
|---|---|---|---|---|---|---|---|
| `title` | The problem, named. One clause, no terminal period. | `--text-body-sm` + `font-semibold` | **250.00px** (282 − icon 20 − gap 12) | **25–33** | 64–85 | 21–57 chars (C4 → C5) | **≤ 66** — beyond that the title runs past three lines at 390 and the icon stops reading as its marker |
| `children` (body) | Why it matters, and what the reader should do or know. Prose, full sentences. | `--text-body-sm` | **282.00px** | **28–37** | 64–85 | 60–207 chars | **none** — this is a disclosure slot; a legally required sentence is never trimmed to fit a layout (`legal.md` §3.3, `spec.md` § Non-goals) |

Two constraints that bind any future writer of these slots, and one that binds the builder:

- **The title is not a place for a number.** C3's body carries `{coherentMonthlyHours}` and
  `{monthlyHours}` as interpolations; both are two-to-three digits and both live in the **body**.
  A title is the one slot in this atom whose width is reduced by the icon, so a growing
  interpolation there costs measure twice.
- **The body slot has no character ceiling and must not acquire one.** If a body string ever grows
  past C5's 207 characters, the correct response is more line boxes, not a shorter sentence.
- **Builder:** `shrink-0` on the icon is load-bearing for the title budget above. Without it a
  57-character title compresses the glyph instead of wrapping.

---

## 10. Disclosure placement

Every disclosure `legal.md` requires is already on screen. This spec's obligation is that each one
is **visible next to its number, at the measure of the text beside it** — and the design discharges
it by widening, never by moving, hiding, deferring or collapsing anything.

| Surface | Disclosure | Where it sits — after this design | Next to its number? | Behind a collapse? |
|---|---|---|---|---|
| **DS5** (C2) | The 220-hour divisor for an 8h48 journey — *cite* | In the `main` column of `/custo-da-hora`, immediately under the **Carga Horária Mensal** field whose emptiness triggered it and immediately above the stat grid reading `R$ 0,00`. Root 308.00 @ 390, body **282.00**. | **Yes** — it is between the empty input and the zeroed figures it explains. | **No.** Rendered inline, unconditionally, whenever its condition holds. |
| **DS6** (C3) | Súmula 431 do TST and the divisor the entered journey implies — *cite* | Same column, directly beneath DS5's position, above the "Impostos e Descontos" disclosure button. Carries both interpolated divisors in its body. Body **282.00**. | **Yes** — the two numbers it compares are in its own sentence, and the field holding one of them is directly above. | **No.** |
| **DS7** (C5) | CLT arts. 59, 66, 71 and §1º, Súmula 376 do TST, and the 50% acréscimo the app does not compute — *cite* **and** *gap* | Inside the **Seu Dia** card on `/`, as the last children of that card, immediately after the totals rows — including the overtime figures the warnings are about. One banner per warning, 1–4 of them, each at root 308.00 / body **282.00** @ 390. | **Yes** — the warning sits in the same card as the overtime minutes and the pay figures that triggered it. | **No.** Not inside the `CollapsiblePanel`, not gated on a disclosure button, not summarised behind a "ver mais". |
| DS3 (C1) | Not an LR-domain disclosure (`legal.md` §2.3) | Under the **Salário Bruto** field, above the zeroed stats. Body **282.00**. | Yes | No |
| C4 | Not an LR-domain disclosure (`legal.md` §2.4) — chronological validation | Between the settings panel and the four time fields, referenced by `aria-describedby` from the errored field. Body **282.00**. | n/a | No |
| DS1, DS2, DS4 | The legal footer, the DSR caption, the consent dialog | **Untouched.** None of them is an `AlertBanner` consumer; none is reached by any change in §3. Protected by AC6. | — | — |

**Nothing occupies the space where a result appears** (`PRODUCT.md` §8). The banners sit *between*
the inputs and the results on `/custo-da-hora` and *after* the results on `/`; the hero panel — the
answer — is first in DOM order below `lg` and is not displaced by a single pixel, because every
change in §3 is interior to the banner's own root. No ad slot, and no element of any kind, is
introduced.

**The one disclosure this spec cannot discharge, stated where it is visible:** at 390 the prose still
runs at roughly 24–37 characters per line (§4.3), below the 40-cpl target. The human decided this at
G2 (D-Q1); the design does not re-litigate it, does not shrink the type to buy it, and does not hide
it. It is **reported** per surface and per theme under AC11.

---

## 11. Accessibility

### 11.1 — Semantics and tab order

| Node | Role / semantics | Changed? |
|---|---|---|
| Banner root | `role="alert"` when `tone === "danger"`, `role="status"` when `tone === "warning"` | **no** — protected by `spec.md` § Out of scope |
| Banner root | `id` from the `id` prop, when given (C4 only) — the `aria-describedby` target of `DateTimeInput` | **no**, and §7.2 makes keeping it on the root a build constraint |
| Icon | `aria-hidden="true"` — `DESIGN.md` § Iconography, every icon | **no** |
| Title | `<p class="font-semibold">` — deliberately **not** a heading | **no**. It is not a section head; promoting it to `<h4>` would inject five to eight headings into the page outline that name transient conditions, and `role="alert"` already reads the whole subtree as one announcement. |
| Body | `<p>`, passed by the consumer as `children` | **no** |
| Title row wrapper | plain `<div>`, no role | **new node, no semantics.** A presentational flex container; it adds nothing to the accessibility tree. |

**Tab order is unchanged and unchangeable by this design.** No banner is focusable, so none appears
in the tab order at any viewport. On `/custo-da-hora` the order remains: skip link → header → tab bar
links → Salário Bruto → período → regime → Carga Horária Mensal → Jornada Diária → "Impostos e
Descontos" disclosure button → … . The banners sit *between* those stops visually and are read in
DOM order by a screen reader, exactly where they appear on screen. **Focus order follows DOM order**
(`DESIGN.md` § Accessibility), and the new inner `<div>` is inserted inside the banner subtree, so
no stop moves.

**Targets.** *The Forty-Four Rule* is not engaged: the banner contains no interactive target. The
nearest targets — the fields above and the disclosure button below — keep their 44px minimum and are
not moved horizontally by this change; `mb-6` (24px) still separates the banner from them, which is
above the 8px minimum spacing between adjacent targets.

### 11.2 — Contrast, both themes, WCAG 2.2 AA

Computed from the sRGB values declared in `app/globals.css` / `DESIGN.md` frontmatter. **No pair
changes** — the design moves no colour — and all four text pairs clear 4.5:1 with margin.

| Pair | Theme | Ratio | AA text (4.5:1) | AA non-text (3:1) |
|---|---|---|---|---|
| `--color-negative-ink` `#bf2029` on `--color-negative-soft` `#faebec` | light | **5.26:1** | ✔ | ✔ |
| `--color-overtime-ink` `#905e16` on `--color-overtime-soft` `#faf4ea` | light | **5.05:1** | ✔ | ✔ |
| `--color-negative-ink` `#f98078` on `--color-negative-soft` `#3c1d24` | dark | **6.02:1** | ✔ | ✔ |
| `--color-overtime-ink` `#f8b35d` on `--color-overtime-soft` `#3a2f1f` | dark | **7.22:1** | ✔ | ✔ |

Both the title (600) and the body (400) are 14px, below the 18.66px large-text threshold, so **4.5:1
is the applicable bar for both** and both clear it in both themes and both tones. The icon takes
`currentColor` = the same `-ink` token, so it clears the 3:1 graphical bar at the same four ratios.

**Stated rather than glossed:** the banner's *boundary* against the card does not reach 3:1 — the
`-soft` fill measures 1.09–1.32:1 against `--color-surface`, and the 30%-alpha border composites to
1.35–1.84:1 against its own fill. That is **pre-existing, unchanged by this spec, and not a 1.4.11
failure**: the banner is not a user-interface component and not a graphical object required to
understand the content, because the content is the sentence itself. `DESIGN.md`'s *"Colour is never
the only channel"* is satisfied — the tone is a second channel on a message that is already words.
Repairing the boundary would mean changing a tone colour, which `spec.md` § Non-goals forbids. If a
later spec wants it, it is a `DESIGN.md` colour question, not a geometry one.

### 11.3 — Live-region behaviour as the user types

This is the behaviour that changes most for a screen-reader user even though no attribute moves,
because the banner's announced text is its whole subtree.

| Surface | Announcement | Politeness | Notes |
|---|---|---|---|
| C1, C2 (`danger`) | Title + body, on mount, as the user clears or fills the field | `role="alert"` → **assertive** | Interrupts. Pre-existing and protected by § Out of scope. Worth recording as an observation, not a change: an assertive interrupt fired by a keystroke is the kind of thing a later spec may want to re-rule. |
| C3 (`warning`) | Title + body, on mount | `role="status"` → **polite** | Queued behind the live regions on the stat grid. |
| C4 (`danger`) | Title + body, on mount; also read as the field's description via `aria-describedby` | assertive **and** descriptive | The double path is intentional and unchanged: `DESIGN.md` *The Error Has Words Rule*. |
| C5 (`warning`), ×1–4 | Title + body per banner, on mount | `role="status"` → **polite** | Up to four polite regions can mount in one render. Unchanged. |
| The values the banners are about | hero value, day-summary totals, stat tiles | `aria-live="polite"` | Unchanged and not touched by this design. |

**The new inner `<div>` is inside every `role` container**, so an announcement still carries title
and body as one utterance, in the same order, with the same words. Nothing is split across two live
regions.

**Zoom.** At 200% zoom and at a 320px CSS width the banner keeps the same proportions — every value
in §6.1 is `rem`-derived except the 1px border — and the body column simply narrows with the card.
No horizontal scroll and no clipped control is introduced at any of the four reference widths, which
AC10 asserts independently.

---

## 12. System changes

### 12.1 — Additions to the design system: **none**

No new token. No new type step. No new spacing step. No new radius, shadow, duration or easing
curve. No `--spacing-*` key. The one value that changes — the banner's horizontal padding — moves
from one sanctioned step of `DESIGN.md`'s eight (`4` → `3`) to another, and `app/globals.css` is not
opened.

**No blocker is raised on this point.** The gate was told a new token would be a blocker for
`STATUS.md` rather than a decision; the design does not need one, and §3.2 records the two
alternatives that would have (a half-step `px-3.5`, and a smaller type step) together with the rules
that forbid each.

### 12.2 — Three factual drifts in `DESIGN.md`, routed rather than fixed

`spec.md` § Out of scope states that **`DESIGN.md` is not opened by this spec**, with no override
left. The exclusion protects the spacing scale and the type ramp, and none of the three items below
touches either — they are factual corrections to one component entry. The gate therefore **records
them and does not apply them**.

| # | Where | `DESIGN.md` says | The tree says | Caused by this spec? |
|---|---|---|---|---|
| D1 | § Components → Alerts, heading | `components/molecules/alert-banner.tsx` | `components/atoms/alert-banner.tsx` | **No** — pre-existing |
| D2 | § Components → Alerts, first line | "`--radius-lg`, **16px padding**, 1px border…" | will read 16px vertical, **12px horizontal** | **Yes** — §3.2 |
| D3 | § Motion, *What animates* | lists "alert" among entering and exiting surfaces | the atom has no enter or exit transition | **No** — pre-existing, and §8 argues it should be closed in the documentation rather than in the component, because every one of these banners is triggered by a keystroke |

> **Human approval point.** Two options, and the gate recommends the second.
>
> 1. Amend `DESIGN.md`'s Alerts entry (and the Motion list) in this spec — reopens a file the spec
>    closed absolutely, for three lines of prose.
> 2. **Recommended — carry them as debt** with a named owner, the way `spec.md` § Carried debt
>    already carries X1. Owner: `product-manager`, in the next spec with scope to open `DESIGN.md`.
>    D2 is the only one this spec creates, and it is the only one that will be *newly* wrong when
>    this ships.
>
> Either way it is the human's call, not this gate's, and it is recorded in `STATUS.md` § Blockers
> as a decision awaiting them rather than as a blocker on G4 — nothing downstream is blocked by it.

---

## 13. References

| Source | Technique borrowed | Why it fits this audience |
|---|---|---|
| GitHub's Markdown callouts (`> [!WARNING]`) | Icon and label share the first line; the body runs the full width of the block beneath | The pattern this design converges on. It survives long prose precisely because the icon does not indent the paragraph — which is the defect being removed. |
| GOV.UK Design System, *Warning text* and *Inset text* | The alert's identity is carried by fill, rule and icon, never by indenting the sentence | Same audience problem: statutory prose on a phone, read once, by someone who did not come to read it. |
| `DESIGN.md` § Components → Alerts | Everything else — tone, radius, border, ink, icon size, roles | Reuse before new. The only line of it that changes is the padding. |

## 14. Risks

| Risk | Signal it happened |
|---|---|
| The `id` prop migrates off the root onto the new title row | C4's banner still looks right; `aria-describedby` on `DateTimeInput` resolves to nothing, and the axe check for a dangling `aria-describedby` goes red |
| `text-body-sm` is collapsed onto the root "to simplify" | A consumer that passes a size class in `className` silently deletes the banner's type step; the 390 measurements move without any spacing change explaining it |
| A `sm:px-4` is added back for "desktop breathing room" | LR2a spend returns to 34 at every width ≥ 640, AC4 goes red at 1440 and stays green at 390 — the inverse of today's signature |
| `px-3.5` is chosen as a compromise | Green at 390 and 1440; **red at 2560 and 3840** (spend 33.5) — a band twice as wide as §4.1 first modelled, and still where nobody looks |
| The icon is shrunk to 16px "since it is beside `--text-body-sm`" | A restyle the budget never asked for; `DESIGN.md` § Iconography's three-size rule still permits it, so only a reviewer catches it |
| A mount animation is added because `DESIGN.md` lists alerts as animating | An animation queued by a keystroke on five surfaces, against `DESIGN.md` § Motion's own prohibition (§8) |
| The 390 cpl residual is read as a failure and someone reaches for the type ramp | A ramp change appears in G4's plan or G5's diff; D-Q1 is settled and closed, and reopening it is the one move `spec.md` names as re-opening a settled decision |
