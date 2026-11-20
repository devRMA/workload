# 0014 — Design

> Owner: product-designer · Gate: `design` (G3) · Run 1 · **Verdict: `pass`**
>
> **Tree state every number in this file was read in: `5c0c6fa`** — the commit `spec.md` and `legal.md`
> both declare. Measured in an isolated copy (`git archive 5c0c6fa | tar -x`, `node_modules`
> hard-linked, its **own** `.next`, its **own** port **3941** confirmed free before binding), never in
> the repository. `NEXT_PUBLIC_GA_ID=""`, `NEXT_PUBLIC_ENABLE_ADS="false"`, `next build` + `next start`,
> **never `next dev`**. Nothing in the repository was mutated; §0.3 records the one run that was
> discarded and why.
>
> **This document states no pt-BR string** — `content-writer` runs in parallel and owns every word.
> §8 specifies slots, roles, type steps and character budgets, and nothing else.
>
> **This document states no norm, no article and no period.** Every obligation below is cited to
> `legal.md`'s own clause number (**RR1–RR4**, **RR1-m**, **RR2-g**, **AC11**, **AC13**, §15.5's nine
> axes). Where design and a legal clause meet, the clause wins and §11 records the one place I am
> asking G2 to confirm rather than assuming in my own favour (`AGENTS.md` §4 rule 8).

---

## 0. What this gate had to decide, and the evidence it decided on

### 0.1 — The three questions

1. **What does the first screen become** when two `position: fixed` containers leave it? (`spec.md`
   **Q1**, § Out of scope 8, **AC11**; `legal.md` §17.1.)
2. **Where does `legal.md`'s new surface go** — **RR4**, the change notice, which this gate is the
   first document to place, and whose nine axes `legal.md` §15.5 states as quantities with a warning:
   *"RR4's notice is the same class of surface \[as the banner] and would fail the same axis in the
   same way if it is placed the same way."*
3. **What happens to the footer paragraph** **RR2** reopens, given RR2(d)'s adjacency quantity.

### 0.2 — What was measured, in which states

Two artifacts, one probe each. Their readings are pasted in §3.1, §3.2, §3.4, §5.2, §5.3, §5.4 and §9:

| Artifact | What it is | Probe | Raw |
|---|---|---|---|
| **A — `baseline-5c0c6fa`** | `5c0c6fa` unmodified | `evidence/design-baseline-probe.mjs` | `evidence/design-baseline.json` |
| **B — `change-v2`** | `5c0c6fa` with `<CookieConsent />` unmounted, `lib/consent.ts` consumers removed, and the RR4 notice prototype of `evidence/design-notice-prototype.tsx.txt` mounted | `evidence/design-change-probe.mjs` | `evidence/design-change.json` |

**The matrix is 16 cells per artifact** and every cell names its five coordinates (lesson **061**):
**state** ∈ {`fresh` — empty storage, no cookies; `legacy` — `workload_cookie_consent` =
`{"telemetry":true,"timestamp":0}` **and** cookies `_ga`, `_ga_TEST12345`} × **theme** ∈ {light, dark}
× **viewport** ∈ {390×844, 1440×900, 2560×900, 3840×900} × **artifact** ∈ {A, B}. Route `/` for the
matrix; `/custo-da-hora` cross-checked separately in §5.4.

`evidence/` is gitignored (`git check-ignore -v` → `.gitignore:55`), so **the pasted output in this
file is the durable artifact** and the scripts are scaffolding (`AGENTS.md` §5).

### 0.3 — One negative result, recorded so no number in this file is read as coming from it

A first build of artifact B put the RR4 residue-read script inside a hand-written `<head>` element in
`app/layout.tsx`. In the App Router that **suppresses Next's own head injection**, so the stylesheet
never loaded. The run returned `fixed=0`, `shield=1` in the *fresh* state, a footer **3824 px** wide at
3840 and a root that never stepped to 18px — four observations all false about the product, in the
shape of plausible geometry. **No figure in this document comes from that run.** It is also a design
constraint now and it is written into §5.5: the residue script is the **first child of `<body>`**,
never a manual `<head>`.

---

## 1. Intent — what the eye does in the first two seconds, on a phone

**Today, at 390×844, on a device with no stored choice, in both themes** (artifact A, `fresh`): the
eye lands on a translucent header, then falls to a 466 px raised card that covers the bottom
**55.2 %** of the viewport and asks a question about cookies. The answer the user came for — the
hero's numeral — is *behind* it: the hero occupies document `96 … 739.4` and the banner covers
`354 … 820`, so **385.4 px of the hero's 643.4 px, 59.9 %, are occluded on first paint**.

**After this change** (artifact B, `fresh`): header, then the hero, then nothing between them. The
eye's first stop is the numeral, and the second is the ring around it. There is no third object
competing for the first two seconds, because **nothing replaces the vacated region** — see §3.

The order is: **the answer → the countdown inside it → the entry time under it → the tab bar**. That
is the order `PRODUCT.md` §1 asks for and it is the order the removal restores by subtraction, not by
addition.

---

## 2. References

| Site | Technique borrowed | Why it fits this audience |
|---|---|---|
| **This product's own `journey-form` / `day-summary` cards** | The card recipe of `DESIGN.md` § Components → Cards, verbatim: `--radius-xl`, `--color-surface`, 1px `--color-line`, `--shadow-card` in light and none in dark, 24 px padding below `sm` and 32 px from `sm` | The RR4 notice is the only new surface this spec ships. Giving it a *new* visual language would make a legal notice look like an interstitial. Making it the product's own card makes it read as one more thing the app is telling you, in the voice it already uses. |
| **This product's own legal footer** (`calculator-views.tsx`, the `mx-auto max-w-3xl` column) | The measure and the horizontal alignment: the notice takes the **same `max-w-3xl` column**, measured left `336 / width 768` at 1440 and left `16 / width 358` at 390 — **identical to the footer's own box in the same run** | The notice and the disclosures below it are one column of things the product is obliged to say. Two different measures would read as two unrelated voices. |
| **`components/atoms/alert-banner.tsx`** | Considered and **rejected**, recorded so the rejection is on the record | Its only tones are `danger` and `warning`, which are data hues. `DESIGN.md` § Colors → *The Colour-Means-a-Number Rule* forbids a data hue where no quantity is encoded, and a privacy notice encodes none. A third tone would have been a `DESIGN.md` frontmatter addition bought for nothing; the `card` recipe already in the frontmatter does the job. |
| **`components/atoms/modal-dialog.tsx`** | Considered and **rejected** | A modal for RR4 is the banner defect in a new wrapper: it covers the answer and it demands an act before the user reads their number. `legal.md` §15.5 warns about exactly this class. |

---

## 3. Layout

### 3.1 — The governing decision: **nothing replaces the vacated region**

`spec.md` **Q1**'s default, `spec.md` § Out of scope 8's bound, and `AC11`'s deliberate absence of a
target. The reason is now a measurement rather than a preference:

> **Both deleted containers are `position: fixed`. Neither occupied one pixel of flow.** The in-flow
> geometry of the page is **byte-identical before and after** in every `fresh` cell of the matrix:

| Cell (state `fresh`, both themes) | A `scrollHeight` | B `scrollHeight` | A footer `top` | B footer `top` | A hero box | B hero box |
|---|---|---|---|---|---|---|
| 390×844 | 2892 | **2892** | 2525.8 | **2525.8** | `96 … 739.4` (h 643.4, w 358) | **identical** |
| 1440×900 | 1547 | **1547** | 1302.8 | **1302.8** | `112 … 811.4` (h 699.4, w 514.7) | **identical** |
| 2560×900 | 1722 | **1722** | 1446.4 | **1446.4** | `126 … 912.7` (h 786.7, w 729) | **identical** |
| 3840×900 | 1722 | **1722** | 1446.4 | **1446.4** | `126 … 912.7` (h 786.7, w 729) | **identical** |

**There is no vacated *flow* region to fill.** What the removal returns is **occlusion**, and
occlusion is returned to the element that was under it — the hero. A designer filling it would be
re-occluding, by hand, the thing the spec exists to uncover.

### 3.2 — The occlusion ledger, measured, both states

Fixed-chrome band = the union of the viewport-space intervals of every element whose computed
`position` is `fixed`, at `scrollY = 0`, 390×844. Closed `<dialog>` elements compute to `fixed` with
height 0 and contribute nothing; they are listed so the count is auditable.

| Cell | Artifact | Fixed elements | Union of bands | Band total | % of 844 |
|---|---|---|---|---|---|
| `fresh`, light **and** dark, 390×844 | **A** | header `0…65`, banner `354…820` (z 60), tab bar `766…828`, 2 closed `<dialog>` (h 0) | `[0,65] ∪ [354,828]` | **539 px** | **63.9 %** |
| `fresh`, light **and** dark, 390×844 | **B** | header `0…65`, tab bar `766…828`, 1 closed `<dialog>` (h 0) | `[0,65] ∪ [766,828]` | **127 px** | **15.0 %** |
| `legacy`, light **and** dark, 390×844 | **A** | header `0…65`, tab bar `766…828`, shield `784…828` (z 40), 2 closed `<dialog>` | `[0,65] ∪ [766,828]` | **127 px** | **15.0 %** |
| `legacy`, light **and** dark, 390×844 | **B** | header `0…65`, tab bar `766…828`, 1 closed `<dialog>` | `[0,65] ∪ [766,828]` | **127 px** | **15.0 %** |

Two findings, and the second is the one a single-state reading would have missed (lesson **061**):

- **On a device with no stored choice the change frees 412 px — 48.9 percentage points — of the first
  screen**, in both themes, and returns 385.4 px of the hero.
- **On a device carrying a legacy record the change frees 0 px.** The shield sat *inside* the tab
  bar's band (`784…828` ⊂ `766…828`). What the legacy device loses is an **affordance**, not a band —
  which is exactly what `legal.md` §14 ruled it was, and it is why `spec.md` **AC7** scores *"exactly
  one of the two"* rather than a height.

**`0010`'s figures are not re-derived here** (`spec.md` **R3**). The banner's **466 px** reproduces to
the pixel in my own run; `0010`'s *"593 of 844 fixed chrome"* is a different union in a state this
matrix does not contain, and re-deriving the occlusion budget is `0010`'s, routed via `tech-lead`.

### 3.3 — Does any number here depend on `0010` landing? **No.**

Asked because `0010` is re-measuring this same first screen right now. Every cell above was read in an
isolated copy of **`5c0c6fa`**, from which `0010`'s in-flight work is absent by construction: at the
moment of this gate the shared checkout carries **40 modified and 8 untracked** files under
`app components lib hooks __tests__ tests`, including `tests/e2e/consent-opening-state.spec.ts` and a
`cookie-consent.tsx:15` edit — none of which is in my artifact. My numbers are a property of
`5c0c6fa` + this spec's own change, and they neither depend on `0010`'s work landing nor predict it.

**One consequence runs the other way and is stated so `0010` is not handed a surprise:** `0010`'s
`LC1` domain test — *every rendered control whose activation contributes to a consent record* —
returns **one** member at `5c0c6fa` and **zero** in artifact B. `legal.md` §17.1 already routes it.

### 3.4 — The bottom reserve, and the defect this change does **not** touch (lesson **054**)

The container constant, measured, not inferred: `#main-content` carries `pb-16` → computed
`padding-bottom: 64px` at 390 (`72px` at the 18px root). The bottom fixed chrome at 390 is the tab
bar, whose top edge sits **78 px** above the viewport bottom (`844 − 766`). **`reserve (64) < band
(78)`** — the container makes *whatever is last* short by 14 px, permanently, whoever that is.

Measured at maximum scroll, 390×844, both themes:

| Artifact | State | `scrollHeight` | max `scrollY` | last element bottom (doc) | in viewport | tab-bar top | shortfall |
|---|---|---|---|---|---|---|---|
| **A** | `fresh` | 2892 | 2048 | 2828 (footer ¶4) | 780.0 | 766 | **14.0 px** |
| **B** | `fresh` | 2892 | 2048 | 2828 (footer ¶4) | 780.0 | 766 | **14.0 px** |
| **B** | `legacy` | 3322 | 2478 | 3258.1 (footer ¶4) | 780.1 | 766 | **14.1 px** |

> **`0014` neither fixes nor worsens it, and the RR4 notice does not become its new subject.** The
> last element is the same footer paragraph in all three rows; the notice is inserted **above** the
> footer and clears the band by the whole footer's height. Fixing the reserve is `0010`'s, and lesson
> **054** is why this row is measured in the state where the notice is present rather than assumed
> from the `fresh` one.

### 3.5 — Structure at the four reference widths

Nothing about the grid, the split, the container or the root ramp changes. Recorded because a table
that says *"unchanged"* without the reading is not a measurement (`AGENTS.md` §5).

| Width | Root (measured, artifact B) | Columns | Container | What this spec changes | What never moves |
|---|---|---|---|---|---|
| **390** | `16px` | 1, hero first (`order-first`) | gutter `px-4` | banner and shield gone; notice appears above the footer in the `legacy` state only | header, tab bar, hero, form, footer column |
| **1440** | `16px` | 12 → 7/5, hero sticky right | `--container-app` 80rem | same | same |
| **2560** | `18px` | 12 → 7/5 | `--container-app` 100rem | same | same |
| **3840** | `18px` | 12 → 7/5 | 100rem, extra width is margin | same | same |

The root steps were **read at the boundary, not derived from the query** (lesson **028**): `16px` at
1440, `18px` at **both** 2560 and 3840 — the intermediate 17px band is `[1920, 2559]` and no reference
width sits in it, so 2560 and 3840 are one row of this table, not two.

**No horizontal overflow and no control off-viewport** at any of the four, in either theme, in either
state: every measured box's `left ≥ 8` and `left + width ≤ viewport width` across all 32 cells; the
widest notice box is `848 + 864 = 1712 ≤ 2560` and `1488 + 864 = 2352 ≤ 3840`.

### 3.6 — Reflow

`DESIGN.md`'s *Scale-Don't-Reflow Rule* holds untouched: the notice is one column at every width and
gains no second column above 1920 px. Its only width-dependent behaviours are the card's own
`p-6 sm:p-8` step at `sm` (640 px) and the prose cap of §4.3, both measured in §5.2.

---

## 4. Component tree

| Component | Level | Status | Path |
|---|---|---|---|
| `CookieConsent` | organism | **deleted** | `components/organisms/cookie-consent.tsx` |
| `AnalyticsWrapper` | organism | **deleted.** It renders no visible box in any state — its only output is `<GoogleAnalytics>`, a script mount with no layout. Verified, not argued: the `fresh` flow geometry of §3.1 is identical across artifacts A and B in all 8 cells | `components/organisms/analytics-wrapper.tsx` |
| `PrivacyChangeNotice` | **organism** | **new** — the RR4 surface | `components/organisms/privacy-change-notice.tsx` |
| `Button` (`variant="ghost"`, `size="icon"`) | atom | **reuse, unchanged** — the notice's dismiss control | `components/atoms/button.tsx` |
| `IconShieldCheck`, `IconX` | — | reuse from `@tabler/icons-react` | — |
| `CalculatorViews` | organism | **edit** — mounts `PrivacyChangeNotice`; drops the `safeGAEvent` import and its `switch_tab` call; its footer ¶1 is rewritten in place per **RR2** | `components/organisms/calculator-views.tsx` |
| `RootLayout` | — | **edit** — drops the `CookieConsent` and `AnalyticsWrapper` mounts; gains the residue script of §5.5 as the **first child of `<body>`** | `app/layout.tsx` |
| `AppHeader` | organism | **edit, no visual change** — GA call sites only | `components/organisms/app-header.tsx` |
| `TaxDetailsPanel` | organism | **edit, no visual change** — GA call sites only | `components/organisms/tax-details-panel.tsx` |
| `WorkCalculator` | organism | **edit, no visual change** — GA call sites only | `components/organisms/work-calculator.tsx` |
| `SalaryCalculator` | organism | **unchanged** — inspected; carries no GA call site and no consent read | `components/organisms/salary-calculator.tsx` |
| `DaySummary`, `JourneyForm` | organisms | **unchanged** — inspected; no GA call site, no consent read | `components/organisms/day-summary.tsx`, `components/organisms/journey-form.tsx` |
| `CalculatorLayout` | template | **unchanged, and deliberately not touched** — §5.1 explains why the notice must sit outside it | `components/templates/calculator-layout.tsx` |
| `ModalDialog` | atom | **unchanged** — it keeps one consumer, the journey-reset dialog; the closed `<dialog>` count in §3.2 drops from 2 to 1 as a consequence | `components/atoms/modal-dialog.tsx` |
| `AlertBanner` | atom | **unchanged** — considered and rejected for RR4 in §2 | `components/atoms/alert-banner.tsx` |

**`components/organisms/ad-manager.tsx` and `components/atoms/google-ad.tsx` are untouched by this
gate.** `legal.md` §8.3 fires AC12's bounded override against the *injection*, and `legal.md` §8.3
states in its own words that **no ad markup, slot, layout reserve or `PRODUCT.md` §8 wording changes
under it**. There is therefore no design consequence and this gate specifies none. The future ads
surface is `0011`'s and `0010`'s and is not designed here.

---

## 5. The RR4 notice — `components/organisms/privacy-change-notice.tsx`

### 5.1 — Placement, and the rule that decided it

**It sits in the flow of `#main-content`, after the calculator and immediately before the `<footer>`.**
Four constraints, each of which eliminates a candidate:

| Candidate placement | Eliminated by |
|---|---|
| Fixed, bottom, where the banner was | `legal.md` §15.5's *space* axis and its explicit warning. It would re-occlude the hero — the defect this spec removes. |
| Modal | Same, plus it demands an act before the answer. §2. |
| First child of `#main-content`, above the hero | `DESIGN.md` § Layout → *The Answer-First Rule* (*"the hero panel is the first thing in the DOM order and the first thing on screen"* below 1024 px) and `PRODUCT.md` §5/§8 (*never sit between the user and an answer*, *do not shift layout*). It would push the hero down by the notice's full height on the one cohort that already had the worst first screen. |
| Inside `CalculatorLayout`'s `main` column | `legal.md` §15.5's ***order*** axis. The aside carries `order-first` below `lg`, so anything in `main` is **after** the hero in DOM and **before** it… no: it is *before* in DOM and *after* visually. **DOM order ≠ visual order**, which the axis forbids outright. |
| **Before `<footer>`, inside `#main-content`** | **Chosen.** No `order-*` and no `sticky` between the reader and it; DOM order equals visual order; nothing fixed covers it (measured, §5.3); it displaces only content that is already below the fold (measured, §5.4). |

**What this placement buys and what it costs, stated rather than implied.** It buys: zero occlusion of
the answer, zero layout shift above the fold, and one reading column shared with the disclosures it
belongs beside. It costs: the notice is **not** in the first viewport. §11 is where I hand that cost
to `labor-law-analyst` rather than declare it discharged, because *how* a notice is made prominent is
mine and *whether it is prominent enough* is not.

### 5.2 — Geometry, measured, every cell

Artifact B, state `legacy` (the only state it renders in), route `/`. **Eight cells, eight readings** —
the height claim below is a claim about eight measurements, not one measurement and an argument
(lesson **061**).

| Theme | Width | Notice box (doc) | Height | Card padding | Radius | `margin-top` | Title | Prose column |
|---|---|---|---|---|---|---|---|---|
| light | 390 | `top 2525.8 · bottom 2907.8 · left 16 · w 358` | **382.0** | 24 px | 28 px | 48 px | 18 px / 1 line / w 224 | **308 px** |
| dark | 390 | `top 2525.8 · bottom 2907.8 · left 16 · w 358` | **382.0** | 24 px | 28 px | 48 px | 18 px / 1 line / w 224 | **308 px** |
| light | 1440 | `top 1302.8 · bottom 1616.8 · left 336 · w 768` | **314.0** | 32 px | 28 px | 48 px | 18 px / 1 line / w 618 | **520.5 px** |
| dark | 1440 | `top 1302.8 · bottom 1616.8 · left 336 · w 768` | **314.0** | 32 px | 28 px | 48 px | 18 px / 1 line / w 618 | **520.5 px** |
| light | 2560 | `top 1446.4 · bottom 1799.4 · left 848 · w 864` | **353.0** | 36 px | 31.5 px | 54 px | 20.25 px / 1 line / w 698 | **585.6 px** |
| dark | 2560 | `top 1446.4 · bottom 1799.4 · left 848 · w 864` | **353.0** | 36 px | 31.5 px | 54 px | 20.25 px / 1 line / w 698 | **585.6 px** |
| light | 3840 | `top 1446.4 · bottom 1799.4 · left 1488 · w 864` | **353.0** | 36 px | 31.5 px | 54 px | 20.25 px / 1 line / w 698 | **585.6 px** |
| dark | 3840 | `top 1446.4 · bottom 1799.4 · left 1488 · w 864` | **353.0** | 36 px | 31.5 px | 54 px | 20.25 px / 1 line / w 698 | **585.6 px** |

**Separate the invariant from the state-dependent, out loud** (lesson **061**): the **height, the box
and the type steps are identical across the two themes at every width** — eight readings, four
distinct values, and the theme axis contributes none of the variation. The **absolute `top` is
width-dependent and state-dependent** and must never be quoted without its cell. The 24 → 32 → 36 px
padding and 28 → 31.5 px radius steps are the card recipe at `sm` and the 18px root, **not** three
declared values: `p-6 sm:p-8` and `--radius-xl` resolving at two root sizes.

### 5.3 — The nine axes of `legal.md` §15.5, each with its reading

| Axis | Clause | Reading | Verdict |
|---|---|---|---|
| **Presence** | count 1 in the residue state, 0 in the clean state | `legacy` → **1** in all 8 cells; `fresh` → **0** in all 8 cells | ✅ |
| **Rendering** | LR3 as coded: `visibility: visible`, `opacity ≠ 0`, `display ≠ none`, not `hidden`, not in a closed `<details>`, not in `[aria-expanded="false"]`, `rect.right > 0 && rect.bottom > 0` | rendered, opaque, no ancestor of any excluded kind; `right = 374 … 2352`, `bottom = 2907.8 … 1799.4`, all `> 0` | ✅ |
| **Space** | border box not covered by any `position: fixed` element — `document.elementFromPoint` at its centre returns it or a descendant | scrolled to centre, hit test in all 8 cells returns a descendant `<p>`: `{"contains": true, "hitTag": "p"}` | ✅ |
| **Time** | present on the **first paint of the surface that carries it**, not after a tap | **no delay, no gate, no tap.** The deleted banner used `BANNER_DELAY_MS = 1500`; the notice uses none. Measured after a 1800–2200 ms settle with no interaction of any kind. | ✅ |
| **Size** | rendered `width ≥ min(320, available content width)` | available content width at 390 is `390 − 2 × 16 = 358`; rendered **358**. At 1440/2560/3840: 768 / 864 / 864, all `≥ 320` | ✅ |
| **Measure** | where it wraps past one line box and body text is ≤ 12 px, ≥ 40 characters per line box | **the clause does not bind**: body text is `--text-body-sm`, measured **14 px** at 390/1440 and **15.75 px** at 2560/3840. Reported anyway: mean characters per line box 31.7 – 47.5 at 390, 47.5 – 62.0 at 1440 and above. | ✅ (not binding, reported) |
| **Modality** | in the accessibility tree **and** the visual tree | `<section aria-labelledby>` — a named `region`; no `aria-hidden`, no visually-hidden class | ✅ |
| **Operability** | a dismissal control reachable by keyboard whose accessible name states what it does | `<button type="button">` with `aria-label`; measured **44 × 44** at root 16 and **49.5 × 49.5** at root 18 — `DESIGN.md`'s *Forty-Four Rule* met in both bands; name is slot **S6**, `content-writer`'s | ✅ |
| **Order** | DOM order equals visual order — no `order-*`, no `sticky` between the reader and it | the notice is a direct child of `#main-content`, after `<AnimatePresence>` and before `<footer>`; the only `order-*` in the tree is `CalculatorLayout`'s aside, which is entirely **above** it in both orders, and the only `sticky` is the same aside at `lg` and above | ✅ |

**Calibration status, as `legal.md` §15.5 requires it be stated rather than implied.** All nine are
read here against a **prototype** carrying filler at the budgets of §8, not against the shipped
string. They are re-calibrated at **G5** against the built surface and **re-measured at G6 by the law
gate**. Where a worked measurement and this section ever disagree, **the measurement wins and this
section is corrected** (lesson **052**).

### 5.4 — Layout shift: the insertion is below the fold in every cell

The notice is mounted by client code, so it is inserted after the server HTML has painted. Whether
that is a defect is a question about *where* the insertion point is:

| Cell | First element that moves | Its document `top` | Viewport height | Above the fold? | Document growth |
|---|---|---|---|---|---|
| 390×844 | `<footer>` | **2525.8** | 844 | **no**, by 1681.8 px | +430 (2892 → 3322) |
| 1440×900 | `<footer>` | **1302.8** | 900 | **no**, by 402.8 px | +362 (1547 → 1909) |
| 2560×900 | `<footer>` | **1446.4** | 900 | **no**, by 546.4 px | +407 (1722 → 2129) |
| 3840×900 | `<footer>` | **1446.4** | 900 | **no**, by 546.4 px | +407 (1722 → 2129) |

**No element visible at first paint moves.** This is the measurement that eliminated the
above-the-hero placement of §5.1 and it is the reason the placement is not merely a preference.

**Both routes carry the surface, once per device, not once per route** — `CalculatorViews` is shared,
so the notice is one component with one condition. Measured at 390×844, light:

```
/               seeded=true  {"count":1,"notice":{"top":2525.8,"h":382},"footer":{"top":2955.8},"scrollH":3322}
/               seeded=false {"count":0,"notice":null,              "footer":{"top":2525.8},"scrollH":2892}
/custo-da-hora  seeded=true  {"count":1,"notice":{"top":1855.7,"h":382},"footer":{"top":2285.7},"scrollH":2652}
/custo-da-hora  seeded=false {"count":0,"notice":null,              "footer":{"top":1855.7},"scrollH":2222}
```

The notice's **height is route-invariant (382 px)** and its **`top` is not** — quoted together so the
next reader cannot carry one without the other.

### 5.5 — The one mechanism constraint this gate imposes, and why it is a design constraint

`legal.md` §6.6 asks that RR1's clearing and RR4's condition be *"one code path and one measurement"*,
and §15.5's **time** axis requires first paint. Both are satisfied only if the residue is read
**before** it is cleared and **before** the surface decides. The design constraint, therefore:

> **The residue read, the `RR1` clearing and the flag that gates the notice happen in one blocking
> script that is the first child of `<body>`.** Never a manual `<head>` element (§0.3 measured what
> that costs), never a `setTimeout`, never a post-hydration effect that reads storage a second time.

The mechanism — where the script lives, how it is authored, how it is tested — is `tech-lead`'s at G4.
What is binding here is the ordering and the prohibition, because both are rendering conditions.

---

## 6. Tokens

Every value below is a **named token declared in `app/globals.css`**, read from that file at
`5c0c6fa`. No raw hex, no arbitrary value, and no token this file invents. The dark column is the same
token name resolving under `.dark`; where a token is theme-invariant the row says so.

### 6.1 — `PrivacyChangeNotice`

| Element | Property | Token | Light resolves to | Dark resolves to |
|---|---|---|---|---|
| Notice container | background | `--color-surface` | `#ffffff` | `#181b21` |
| Notice container | border (1px) | `--color-line` | `#e0e2e6` | `#2b2e35` |
| Notice container | radius | `--radius-xl` | 1.75rem → 28 px @16, 31.5 px @18 | same |
| Notice container | shadow | `--shadow-card` | `0 1px 2px …, 0 8px 24px -16px …` | **`none`** (the token itself resolves to `none` under `.dark`) |
| Notice container | padding | `p-6` below `sm`, `p-8` from `sm` — `calc(var(--spacing) * 6)` and `calc(var(--spacing) * 8)` | 24 px at 390; 32 px at 1440; 36 px at 2560/3840 (the 18px root) | same |
| Notice container | space above | `mt-12` = `calc(var(--spacing) * 12)` | 48 px @16, 54 px @18 | same |
| Notice container | max width | `max-w-3xl` | 768 px (measured 768 at 1440, 864 at the 18px root) | same |
| Icon | colour | `--color-ink-muted` | `#5f656f` | `#a6abb5` |
| Icon | size / stroke | 20 px / `stroke={2}` — `DESIGN.md` § Iconography, the 20 px step | same | same |
| Icon → title gap | `gap-3` | 12 px @16, 13.5 px @18 | same |
| Title (`h2`) | type step | `--text-heading` (1.125rem / 600 / lh 1.3 / tracking −0.005em) | measured 18 px / 23.4 px | same |
| Title | colour | `--color-ink` | `#1e232c` | `#f2f3f6` |
| Body stack | space between cells | `space-y-2` = `calc(var(--spacing) * 2)` | 8 px @16, 9 px @18 | same |
| Body stack | space below title row | `mt-4` = `calc(var(--spacing) * 4)` | 16 px @16, 18 px @18 | same |
| Body stack | measure cap | `max-w-prose` → Tailwind's own `--container-prose` (65ch) — see §10 | measured 520.5 px @1440, 585.6 px @2560 | same |
| Body cells (`p`) | type step | `--text-body-sm` (0.875rem / 400 / lh 1.5 / tracking +0.005em) | measured 14 px / 21 px | same |
| Body cells | colour | `--color-ink-muted` | `#5f656f` | `#a6abb5` |
| Dismiss button | recipe | `buttonClasses("ghost", "icon")` — `components/atoms/button.tsx`, unchanged | — | — |
| Dismiss button | rest colour | `--color-ink-muted` on `--color-surface` | `#5f656f` on `#ffffff` | `#a6abb5` on `#181b21` |
| Dismiss button | hover fill | `--color-surface-sunken` | `#f2f4f7` | `#13161b` |
| Dismiss button | hover ink | `--color-ink` | `#1e232c` | `#f2f3f6` |
| Dismiss button | radius / size | `--radius-full` / `h-11 w-11` | 44 px @16, 49.5 px @18 | same |
| Dismiss button | focus ring | `ring-focus` utility → `2px solid var(--color-focus)`, offset 2 px | `--color-focus` = `--color-accent` `#2a62d1` | `--color-focus` = `--color-accent-ink` `#91b6f9` |
| Dismiss button | press | `active:scale-[0.97]` + `--duration-instant` | theme-invariant | theme-invariant |

**The hover state was a defect in this gate's own first prototype and is recorded so it is not
reintroduced.** The notice was first drawn on `--color-surface-sunken`; the dismiss button's `ghost`
hover fill **is** `--color-surface-sunken`, so hover was invisible — measured `lab(96.04 …)` on
`lab(96.04 …)`, a null delta. Moving the notice to the `card` recipe (`--color-surface`) is what makes
the control's hover legible, and it is why the notice is a card rather than a sunken panel.

### 6.2 — `calculator-views.tsx` footer ¶1 (the **RR2** paragraph)

**No token changes.** It stays the first child of the existing `<footer className="mx-auto mt-12
max-w-3xl space-y-2 text-center text-caption text-ink-subtle text-pretty">`: `--text-caption`
(0.75rem / 400 / lh 1.45 / tracking +0.012em, measured **12 px / 17.4 px**), colour
`--color-ink-subtle`, measured border-box width **358 px at 390** and **768 px at 1440**.

**RR2(d)'s adjacency quantity is satisfied by construction and the constant was verified, not
assumed.** The rule permits ≤ 8 CSS px between the claim's border box and its qualifier's. The
footer's own inter-paragraph gap, measured at 390 in artifact A, is `2585.9 − 2577.9 = ` **8.0 px** —
exactly the `space-y-2` step, and exactly the figure `legal.md` §7.4(d) derives from `0011` §20.2.

> **The design instruction is therefore the narrowest one available: `content-writer` rewrites inside
> the existing single `<p>`.** Same border box ⇒ adjacency holds at 0 px, at every width, in every
> state, with no geometry to re-measure and **no file outside AC5's 28-file union touched** — which is
> what keeps `tests/e2e/disclosure-legibility.spec.ts:32` matching and `legal.md` §4.3's collision
> closed.

### 6.3 — Removed, with their tokens, so nothing is deleted silently

| Element | Tokens it held | Where it went |
|---|---|---|
| Banner container | `--color-surface-raised`, `--color-line`, `--radius-2xl`, `--shadow-raised`, `edge-lit` (`--color-edge-highlight`), `z-60`, `--blur-chrome` not used | deleted |
| Banner icon plate | `--color-accent-soft` + `--color-accent-ink`, `--radius-md`, `IconCookie` 32 px | deleted — `IconCookie` leaves the product entirely |
| Banner title | `--text-title`, `--color-ink` | deleted |
| Banner body | `--text-body-sm`, `--color-ink-muted` | deleted |
| *Configurar* | bespoke ghost: `--text-label`, `--color-ink-muted` → `--color-ink`, `min-h-11`, `ring-focus` | deleted |
| *Recusar* / *Aceitar Tudo* | `Button` `outline` / `default` | deleted |
| Privacy dialog | `ModalDialog` + `--color-surface-raised`, `--radius-2xl`, `--shadow-raised`, `edge-lit`, `--text-display` title | deleted. **`--text-display` then has two consumers left, not three** — see §10 |
| Telemetry switch | `--color-accent` / `--color-line-strong` track, `--color-ink-onfill` knob, `motion` `x: 0 → 20` | deleted |
| Shield control | `--color-chrome` + `--blur-chrome`, `--color-line`, `--shadow-card`, `--radius-full`, `--color-ink-muted` → `--color-accent-ink`, `z-40`, `IconShield` 18 px | deleted — `IconShield` leaves the product entirely |

**The One Mark Rule is improved, not breached.** Cobalt on the `fresh` first screen at 390 drops from
**three** marks (logo, active tab, *Aceitar Tudo*) to **two** (logo, active tab). The notice introduces
**no** cobalt at rest — its only accent is the focus ring, which is a state and not a resting mark.

---

## 7. States

Focus-visible is specified on every row and inherited by accident nowhere.

### 7.1 — Dismiss control (`Button`, `variant="ghost"`, `size="icon"`) — the only new interactive element

| State | Specification |
|---|---|
| **rest** | transparent fill, `--color-ink-muted` glyph, `--radius-full`, 44 × 44 (49.5 × 49.5 at the 18px root), no shadow (*Flat-at-Rest Rule*) |
| **hover** | fill `--color-surface-sunken`, glyph `--color-ink`, over `--duration-fast` with `--ease-standard`. Legible because the notice is `--color-surface`, not `--color-surface-sunken` (§6.1) |
| **focus-visible** | `outline: 2px solid var(--color-focus)`, `outline-offset: 2px`, via the `ring-focus` utility. The 2 px gap paints `--color-surface`, which measures **5.58:1** against the ring in light and **8.43:1** in dark — the ring is legible on this card in both themes and **must not** be replaced by a `box-shadow` ring |
| **active** | `scale(0.97)` over `--duration-instant` with `--ease-out`, fired on pointer-down; `motion-reduce:active:scale-100` already ships on `buttonClasses` |
| **disabled** | **not applicable, and this is a specification, not an omission.** The control has exactly one action and it is always available. It never renders disabled. |
| **loading** | **not applicable.** Dismissal is synchronous and local; there is no request to wait on |
| **error** | **not applicable.** There is no failure mode: dismissal unmounts a surface |
| **empty** | **not applicable to the control; the organism carries it** — see 7.2 |
| **live-updating as the user types** | **not applicable.** The notice carries no value and is not in the answer path; it does not re-render on input. This is deliberate: `DESIGN.md`'s *Numbers-Don't-Move Rule* and `PRODUCT.md` §5's *real time, not a submit button* both concern the answer, and the notice must never compete with it |

### 7.2 — `PrivacyChangeNotice` as a surface

| State | Specification | Measured |
|---|---|---|
| **rest / present** | rendered, one instance | `legacy`, 8/8 cells, count **1** |
| **empty** | **renders nothing at all** — not a hidden node, not an empty box. `legal.md` **AC13** requires the DOM count to be 0 on a clean device | `fresh`, 8/8 cells, count **0**; `legacy` second load, 8/8 cells, count **0** |
| **dismissed** | unmounts; does not return on any later load, because the residue that gated it no longer exists | `legacy` reload, count **0** |
| **hover / active** | **none.** The surface is not interactive; only its dismiss control is. A hover affordance on a non-interactive card is a false affordance | — |
| **focus-visible** | the section itself is not focusable (no `tabindex`). Its dismiss control is the only tab stop it contributes | — |
| **loading / error** | not applicable — no async work, no failure mode | — |

### 7.3 — Interactive elements this change **removes** — recorded so their loss is auditable

*Configurar*, *Recusar*, *Aceitar Tudo*, *Salvar Preferências*, *Fechar configurações de privacidade*,
the `role="switch"` telemetry toggle and the *Configurações de Privacidade* shield. **Seven interactive
elements and all of their eight states leave the product.** After the change the `fresh` first screen
at 390 contains **four** tab stops (skip link, theme toggle, two calculator tabs) where it contained
**seven**, and the `legacy` first screen contains four where it contained five.

### 7.4 — Elements this change re-opens but does not restyle

The footer's source links (`SOURCE_LINK_CLASSES`) and the tab bar keep every state they have today.
They are listed because **RR2** rewrites a paragraph in the same container, and a rewrite that silently
altered a sibling's states would be a change nobody specified. The measured footer column — `left 16 /
w 358` at 390, `left 336 / w 768` at 1440 — is identical in artifacts A and B.

---

## 8. Copy slots

`content-writer` owns every string. This table owns the slot, its role, its type step and its budget.

**How the budgets were derived, and what they are not.** Each is a **capacity figure** read from the
rendered prototype at 390×844 — the narrowest cell, measured with filler, counting **rendered line
boxes** and never characters (lesson **050**). The prose column at 390 is **308 px** at
`--text-body-sm` 14 px. The longest filler cell measured **124 characters over 3 line boxes**, so a
4th line box is the first thing a longer string buys. **The budget sizes a
window; the delivered string is the verdict** (lesson **052**) — every slot is re-measured at G5
against the string that ships, and a slot that overruns is a bounce to this gate, not a smaller font.

| Slot | Role | Level | Type step | Colour | Budget at 390 | Measured with filler at 390 | Ceiling |
|---|---|---|---|---|---|---|---|
| **S1** | The notice's title — names the change, not the product | `h2`, `id="privacy-change-title"` | `--text-heading` | `--color-ink` | **≤ 26 chars** for one line box | 22 chars → **1 line**, box `w 224` | 2 line boxes (≤ 52 chars) |
| **S2** | `legal.md` §15.4 cell 1 — *what changed* | `p` | `--text-body-sm` | `--color-ink-muted` | **≤ 130 chars** | 102 chars → **3 lines**, `h 63` | 4 line boxes |
| **S3** | §15.4 cell 2 — *what was deleted on this device* | `p` | `--text-body-sm` | `--color-ink-muted` | **≤ 130 chars** | 124 chars → **3 lines**, `h 63` | 4 line boxes |
| **S4** | §15.4 cell 3 — *what this does not reach at Google*. **Two variants**, per §15.4's two columns (H3 done / not done); the budget is the longer one | `p` | `--text-body-sm` | `--color-ink-muted` | **≤ 140 chars** | 121 chars → **3 lines**, `h 63` | 4 line boxes |
| **S5** | §15.4 cell 4 — *where to ask*, carrying the controller's channel itself (`legal.md` §14.2.2: no link to a page that does not exist yet) | `p` | `--text-body-sm` | `--color-ink-muted` | **≤ 130 chars** | 95 chars → **3 lines**, `h 63` | 4 line boxes |
| **S6** | The dismiss control's accessible name — must state what it does, per §15.5's *operability* axis | `aria-label` | — (no visible text) | — | **≤ 30 chars** | 17 chars | — |
| **S7** | `calculator-views.tsx:75-76` ¶1 — **RR2**. Sentence 1 ships **verbatim, character for character** (RR2(a)); the retired proposition is absent (RR2(b)); the narrow claim is asserted with its scope word adjacent to the noun it limits (RR2(c)) | `p`, existing | `--text-caption` | `--color-ink-subtle` | **rewritten inside the existing `<p>`** — see §6.2 | 3 line boxes at 390 (`h 52.2`), 2 at 1440 (`h 34.8`) today | a 4th line box at 390 costs +17.4 px, entirely below the fold |

**At the budgets above the notice measures 382 px at 390.** If every one of S2–S5 reaches its 4-line
ceiling the notice reaches **466 px** at 390 — and every pixel of the growth is below the fold (§5.4),
so the ceiling is a typographic question and not a layout risk. That figure is a **ceiling computed
from measured line-box heights (21 px) and measured gaps (8 px)**, not a rendered reading, and it is
labelled as such: the rendered reading is taken at G5.

**Slots this gate deliberately does not open:** `README.md:8` (`legal.md` §7.6 ruled it **unchanged**;
`content-writer` must not fix it by symmetry), and footer ¶2–¶4.

---

## 9. Disclosure placement

Every obligation in `legal.md`, with the element that carries it and the proof it is visible beside
its subject rather than behind a collapse. **Nothing in this design is inside a `<details>`, an
`aria-expanded="false"` container, a tab, a modal or a hover target.**

`legal.md`'s header announces **DR1–DR6**; the six are `spec.md` § Disclosure obligations 1–6 as ruled
at G2 (`legal.md` §15.3 cites *"RR2, DR2"* against `spec.md`'s obligation 2). They are mapped by
number below.

| Obligation | Where it sits | Visible beside its subject? |
|---|---|---|
| **RR1** — elimination of device residue | **no surface.** It is code running before first paint (§5.5) | n/a — an operation, not a claim. Its *announcement* is RR4 |
| **RR1-m** — every cookie on this origin gone, record `null`, after one load | measured, not designed: `{"record":null,"cookies":[]}` in **8/8** `legacy` cells of artifact B. Known-bad, `spec.md` E6: `{"record":"{\"telemetry\":true,\"timestamp\":0}","ga":["_ga","_ga_TEST12345"]}` | ✅ both directions printed |
| **RR2(a)** — sentence 1 verbatim | `calculator-views.tsx:75-76` ¶1, unchanged box, `--text-caption`, permanent, every state | ✅ |
| **RR2(b)** — the retired proposition absent | same `<p>`; **RR2-g** asserts its absence in the rendered footer and by `git grep` | ✅ |
| **RR2(c)** — the narrow true claim asserted | same `<p>`, `content-writer`'s S7 | ✅ |
| **RR2(d)** — qualifier adjacent | **same border box, 0 px** — the strongest form of the clause; the permitted alternative is ≤ 8 px and the footer's own measured gap is exactly 8.0 px (§6.2) | ✅ |
| **RR4** — the change notice | `PrivacyChangeNotice`, in flow, `--color-surface` card before the `<footer>`; nine axes read in §5.3 | ✅ — `elementFromPoint` returns a descendant in 8/8 cells |
| **DR1** — the removal does not make the app serverless | **not a new surface.** Carried by S7's narrow claim (RR2(c)) and by `0011`'s page. This design adds no string that could be read as *"nothing leaves your device"* | ✅ by construction |
| **DR2** — the true half of the footer survives the correction of the false half | RR2(a): the box is not deleted, the sentence is not deleted, and the paragraph is rewritten **in place** | ✅ |
| **DR3** — the standing privacy affordance is deleted | `legal.md` §14.2: **no legal floor** conditions its removal, and its consequence — the notice must carry the controller's channel itself — lands in slot **S5** | ✅ |
| **DR4** — the user is told the record was deleted | slot **S3**, `legal.md` §6.6 + §15 | ✅ |
| **DR5** — what Google still holds is not reached | slot **S4**, both variants of `legal.md` §15.4 | ✅ |
| **DR6** — recorded non-claims for the retired claims | **`PRODUCT.md` §9, not a screen.** `legal.md` **H4**, a human approval point, landing at **G7**. No design consequence and this gate invents none | n/a |
| **AC7** — banner and shield counts are 0 | measured **0 / 0** in 16/16 cells of artifact B; known-bad, artifact A: `fresh` `banner=1 shield=0`, `legacy` `banner=0 shield=1` — exactly one of the two in every cell | ✅ |
| **AC11** — consent-surface `position: fixed` count is 0 | measured: artifact A carries 2 (the banner `div` z-60 or the shield `button` z-40, **plus** the privacy `<dialog>`); artifact B carries **0** — the three remaining fixed elements are the header, the tab bar and the journey-reset `<dialog>`, none of which is a consent surface | ✅ |
| **AC13** — 1 on the seeded first load, 0 on the second, 0 on a fresh device, both themes, 390×844 | measured **1 / 0 / 0** in every cell | ✅ |

> **Nothing decorative sits between the user and the answer, and nothing occupies the space where a
> result appears** (`PRODUCT.md` §8). The hero's occluded 385.4 px at 390 are returned and nothing
> takes them: §3.1 measures the flow geometry identical and §3.2 measures the band shrinking from
> 539 px to 127 px. **No ad slot, no reserve and no placeholder is specified anywhere in this
> document.**

---

## 10. Motion

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion path |
|---|---|---|---|---|---|---|
| `PrivacyChangeNotice` | mount | **none** | — | — | **0 ms, and the 0 is the specification** | n/a. The banner it replaces used `BANNER_DELAY_MS = 1500` and a `y: 100 → 0` slide; `legal.md` §15.5's *time* axis forbids both |
| `PrivacyChangeNotice` | dismiss | `opacity` 1 → 0, via `AnimatePresence` + `motion.section` | `--duration-base` (**220 ms**) | `--ease-standard` | 0 ms | **the same animation.** `DESIGN.md` § Motion → *Reduced motion*: *"Opacity cross-fades are kept because they explain that something changed."* There is no transform and no vestibular component, so nothing needs neutralising. **No `height` is animated**, which is what keeps this clear of `DESIGN.md`'s open *Known residual* on `height: 0 → auto` |
| Dismiss control | `:active` | `transform: scale(0.97)` | `--duration-instant` (**100 ms**) | `--ease-out` | 0 ms | **`motion-reduce:active:scale-100`** — the neutralizer bound to the *same state*, already shipping in `buttonClasses`. A bare `motion-reduce:transform-none` is `0-1-0` and loses to `active:scale-[0.97]` at `0-2-0` (`AGENTS.md` §8) |
| Dismiss control | `:hover` | `background-color`, `color` | `--duration-fast` (**160 ms**) | `--ease-standard` | 0 ms | kept — the scoped reset in `app/globals.css` clamps `transition-property` to `opacity, color, background-color, border-color, outline-color` and shortens the duration to `--duration-fast`; both properties survive by design |
| **Removed** — banner enter/exit | mount / consent act | `y: 100 → 0 → 100`, `opacity` | Motion default spring | — | 1500 ms on enter | deleted |
| **Removed** — telemetry knob | switch toggle | `x: 0 → 20` | Motion default spring | — | 0 | deleted |
| **Removed** — privacy dialog | open / close | `opacity` + `scale(0.96) translateY(0.75rem)` | `--duration-slow` | `--ease-out` | 0 | the **base rules in `app/globals.css` stay** — they serve the journey-reset dialog, which is not in scope. Only this consumer leaves |

*The Same-Path Rule* (`DESIGN.md`: *"the tab bar, the cookie banner and the ad-block notice enter from
the bottom and leave to the bottom"*) loses one of its three named subjects. It is not weakened: the
notice never enters, so it owes no exit path, and its dismissal is a fade rather than a direction.
**The sentence in `DESIGN.md` naming the cookie banner is stale after this change** — §11.

---

## 11. Accessibility

### 11.1 — Semantic roles

| Element | Role |
|---|---|
| `PrivacyChangeNotice` | `<section aria-labelledby="privacy-change-title">` → a named **region** landmark. **Not** `role="alert"` and **not** `aria-live` — the notice is present at first paint, so a live region would announce nothing on mount and, if it did fire, would interrupt a screen-reader user mid-sentence for a statement that is not urgent |
| Title | `<h2>`, the region's accessible name. `h2` and not `h1`: `AppHeader` owns the page `h1` and each calculator card owns an `h2`, so the notice is a sibling of the cards, not their parent |
| Body cells | four `<p>` |
| Icon | `<IconShieldCheck aria-hidden="true">` — `DESIGN.md`: *"Every icon is `aria-hidden="true"`"* |
| Dismiss | `<button type="button" aria-label={S6}>` — an icon-only control, so the name is on the control (`DESIGN.md`: *"An icon-only control without an `aria-label` does not ship"*) |

### 11.2 — Tab order

DOM order, and DOM order equals visual order throughout (`legal.md` §15.5 *order*):

**skip link → theme toggle (header) → *Jornada* tab → *Custo da Hora* tab → every calculator control
in the card, in order → dismiss (notice) → the four footer source links.**

**Three losses and one gain**, stated so the delta is auditable: the banner's *Configurar*, *Recusar*
and *Aceitar Tudo* — which, being `z-60` fixed content late in the DOM, put three tab stops **after**
the whole calculator while appearing **over** it — leave; the notice's single dismiss stop arrives in
the position it visually occupies. The shield's stop leaves on the `legacy` device.

### 11.3 — Contrast, both themes, every text-on-surface pair this design introduces

Computed from the hex values the `DESIGN.md` frontmatter declares as normative, WCAG 2.2 relative
luminance. **Every text pair clears 4.5:1 in both themes; every non-text pair that needs 3:1 clears
3:1.**

| Pair | Light | Dark | Floor | Verdict |
|---|---|---|---|---|
| Title — `--color-ink` on `--color-surface` | **15.77:1** | **15.54:1** | 4.5 | ✅ |
| Body S2–S5 — `--color-ink-muted` on `--color-surface` | **5.87:1** | **7.49:1** | 4.5 | ✅ |
| Icon — `--color-ink-muted` on `--color-surface` (non-text) | **5.87:1** | **7.49:1** | 3.0 | ✅ |
| Dismiss, rest — `--color-ink-muted` on `--color-surface` | **5.87:1** | **7.49:1** | 4.5 (treated as text) | ✅ |
| Dismiss, hover — `--color-ink` on `--color-surface-sunken` | **14.31:1** | **16.34:1** | 4.5 | ✅ |
| Dismiss, hover fill — `--color-surface-sunken` on `--color-surface` | 1.10:1 | 1.15:1 | none — a hover tint is not a boundary; the glyph carries the state change and its own ratio is above | ✅ |
| Focus ring — `--color-focus` on `--color-surface` (the 2 px gap paints the card) | **5.58:1** | **8.43:1** | 3.0 | ✅ |
| Focus ring — `--color-focus` on `--color-canvas` | **5.34:1** | **9.23:1** | 3.0 | ✅ |
| Card border — `--color-line` on `--color-surface` | 1.30:1 | 1.27:1 | **none** — `DESIGN.md`: `--color-line` is *"Structural only"*. Separation is carried by `--shadow-card` in light and by the `--color-canvas`→`--color-surface` step in dark, per *The Dark-Has-No-Shadows Rule*. It is not a control edge and `--color-line-strong` is not owed | ✅ |
| S7 footer ¶1 — `--color-ink-subtle` on `--color-canvas` (unchanged) | **4.84:1** | **5.74:1** | 4.5 | ✅ |

### 11.4 — Targets, zoom, live regions

- **Targets.** The dismiss control measures **44 × 44** at the 16px root and **49.5 × 49.5** at 18px —
  read, not asserted. It is the only target in the notice, so the 8 px adjacent-target rule has no
  subject here. Seven targets leave the product (§7.3).
- **Zoom / 320 px.** The notice is `max-w-3xl mx-auto` inside `#main-content`'s `px-4` gutter, so at
  320 px CSS width it resolves to 288 px with no fixed minimum anywhere in its box; nothing in it is
  `whitespace-nowrap`. `legal.md` §15.5's *size* axis floor is `min(320, available content width)`,
  which at 320 px is the available width, and the notice takes all of it.
- **Live regions.** **This design adds none and removes none.** The hero's value, the day summary
  totals and the stat grid keep their `aria-live="polite"`; the live clock keeps its silence. **The
  notice is not a live region** (§11.1), and no value in the product updates as a result of this
  change — the answer's real-time behaviour under typing is untouched, which is the point.
- **Both themes are first-class.** All 16 cells of artifact B were read in `colorScheme: "light"` and
  `colorScheme: "dark"` and the theme axis contributes **zero** geometric variation (§5.2).

---

## 12. System change

### 12.1 — Tokens, type steps, curves, elevation levels: **none added, none changed, none removed.**

Every value in §6 is a token already declared in `app/globals.css` at `5c0c6fa`. No new colour, no new
type step, no new radius, no new duration, no new easing curve, no new shadow.

### 12.2 — One item that needs a human, and it is a documentation amendment, not a token

> **`max-w-prose` (Tailwind's own `--container-prose`, 65ch) is used for the first time in this
> repository, and `DESIGN.md` does not name it.**
>
> - **It is not a new token.** It comes from Tailwind v4's default theme and is not declared in
>   `app/globals.css`. **It was verified to resolve by measurement, not by reading**: the body column
>   renders **520.5 px at 1440** and **585.6 px at 2560/3840**, which is 65ch at the measured 14 px and
>   15.75 px steps. It is a *container*-scale key, not a `--spacing-*` key, so it is clear of
>   `DESIGN.md`'s *Numeric Scale Rule* and of the `max-w-3xl` defect that rule exists to prevent.
> - **What it replaces:** nothing. It **implements** a rule `DESIGN.md` already states without naming
>   a mechanism — § Typography → *Body*: *"Explanatory prose. Capped at 68ch."* Measured without it,
>   the notice's prose ran **102 characters per line box at 1440**; with it, **47.5 – 62.0**.
> - **What is asked of the human:** one sentence added to `DESIGN.md` § Typography recording that the
>   prose cap ships as `max-w-prose`. **Human approval point** under `AGENTS.md` §4; no build depends
>   on the amendment landing first.

### 12.3 — Three sentences in `DESIGN.md` name a component that stops existing

Not a system change — a documentation reconciliation, owned by `release-manager` at **G7**
(`AGENTS.md` §7: *"whether a `DESIGN.md` system change landed"*). Recorded here because this gate is
what makes them false:

| `DESIGN.md` location | The sentence | After `0014` |
|---|---|---|
| § Typography → **Display** | *"Modal titles only — the reset confirmation, **the privacy dialog**, the weekly-video prompt."* | `--text-display` loses the privacy dialog as a consumer |
| § Motion → **What animates** | *"entering and exiting surfaces (modal, **cookie banner**, alert, collapsible panel)"* | the cookie banner is gone |
| § Motion → **The Same-Path Rule** | *"The tab bar, **the cookie banner** and the ad-block notice enter from the bottom and leave to the bottom."* | one of three named subjects is gone; the rule itself is unchanged and still binds the other two |

### 12.4 — Dials

`DESIGN_VARIANCE: 3` · `MOTION_INTENSITY: 2` · `VISUAL_DENSITY: 5` — **unchanged.** This change removes
one surface and adds one card in the existing language; it moves no dial, and moving one would itself
be a human approval point.

---

## 13. Open to the law gate — one item, and I am not resolving it by design

> **`legal.md` PR4 / art. 8º § 6º requires the change be communicated *com destaque*. This design
> discharges prominence typographically and by isolation, not by position: the notice is a
> `--color-surface` card with a `--text-heading` title and `--text-body-sm` prose, sitting alone
> between the calculator and a footer that is entirely 12 px `--color-ink-subtle` caption — but it is
> **not in the first viewport**, measured at document `top` 2525.8 (390), 1302.8 (1440), 1446.4
> (2560/3840).**
>
> **Why it is placed there and not higher**, with the rule that forced it: every placement inside the
> first viewport either re-occludes the hero (`legal.md` §15.5's own warning, and the 385.4 px this
> spec exists to return), breaks `DESIGN.md`'s *Answer-First Rule*, breaks `PRODUCT.md` §5/§8, or
> breaks `legal.md` §15.5's *order* axis via `CalculatorLayout`'s `order-first` (§5.1's table).
>
> **What I am asking, and why I am asking rather than assuming.** `AGENTS.md` §4 rule 8: a legal
> ruling cannot be overruled by design, and *"never resolve a legal rejection by moving the disclosure
> somewhere quieter"* is precisely the failure mode this paragraph could be. So the question goes
> **up**, in the artifact, with its numbers: **does prominence-by-treatment discharge *com destaque*
> at this document position, or does the clause require the first viewport?** `legal.md` §15.5 already
> schedules a re-measurement of all nine axes by the law gate at **G6** — this is the tenth question
> to answer in that pass. **If the answer is the first viewport, this gate bounces and redraws;** it
> does not argue.

---

## 14. Verdict

`pass`. Every element of `spec.md` and every clause of `legal.md` that touches a surface has a place,
at a stated atomic level, reusing a named existing component wherever one fits. One new organism, no
new token, no new type step, no new curve. One documentation amendment and one question, both raised
rather than absorbed.
