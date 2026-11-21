# 0012 — Design

> Owner: product-designer · Gate: `design` · Run 1 · 2026-09-19 · **Run 2 (B1 reconciliation) · 2026-09-19**
>
> Bound by `DESIGN.md` (tokens, ramp, spacing, elevation, motion), `PRODUCT.md` §4/§5/§8, and
> **`legal.md` §9 in full**. This document places **one** disclosure surface and gives its geometry.
> It writes **no pt-BR string** — every slot below is a slot, and `content-writer` fills it.
>
> **Every number in this file was read off a rendered production build.** Each one names the state,
> the viewport, the theme and the box model it was read in. Nothing is projected (lesson **050**).

---

## 0. How every number here was produced

| | |
|---|---|
| Copy | `rsync -a --exclude node_modules --exclude .next --exclude .git` → scratchpad `g3-0012`; `cp -al` of `node_modules`; `rm -rf .next`. **The repository working tree was never mutated.** |
| Snapshot | working tree of `fix/design-taste-preflight` at 2026-09-19, `HEAD` **5c0c6fa**. `git status --porcelain components/organisms/day-summary.tsx app/globals.css` → **empty**: both files I design against are unmodified by any sibling agent |
| Intended state | the copy was patched to the state this spec ships toward: the weekday operand removed from `hooks/use-work-calculator.ts` (`splitOvertime(overtimeMinutes)`, no `getDay()` anywhere in the hook) **and** the candidate disclosure inserted in `components/organisms/day-summary.tsx`. Calibrating against today's defective build would have measured a screen this spec deletes |
| Build | `pnpm build` → **exit 0**. The first attempt failed type-check on `__tests__/legal-tables.test.ts(28-30)`, a **sibling agent's in-flight edit** to `lib/legal-tables.ts` + its test (`git status` shows both `M`), unrelated to this gate and not in this spec's file set; `__tests__`/`tests` were excluded from the typecheck **in the copy only** to get past it |
| Serve | `next start -p 3751`. Port confirmed free with `ss -ltn` before use and **released and re-confirmed free afterwards**. **Never `next dev`** |
| Machine hygiene | before every browser run, `pgrep -f chrome-headless-shell` was polled until **0** live chromium binaries. Specs 0003/0007/0008/0010 had Playwright runs and `next-server`s on 3142/3417/3422 during this gate; **this gate waited ~13 minutes rather than racing them**, and used a port none of them held |
| Instrument | Playwright chromium headless, `deviceScaleFactor: 1`, seeded `localStorage`, reading taken **1 400 ms after `networkidle`** and taken **again after a full `reload()`** — the W3 floor is 1 000 ms, cleared by 400 ms |
| Journey | entrada **08:00**, almoço **12:00–13:00**, saída **22:00** manual, jornada **8h48**, salário **R$ 15.000,00** / **220 h**. Entry date = the device date, **19/09/2026, um sábado** — deliberately the day the defect fires |
| Box model | every rect is `getBoundingClientRect()`, **border box**, in CSS px. Every colour is the **computed** value converted through a canvas 2D context (the tokens resolve to `lab()`/`oklch()`, which a naive string parse reads as nonsense — the first run of this harness returned a false **1.37:1** that way, and was discarded) |
| Artifacts | `measure.json` (first matrix), `measure3.json` (final matrix, 16 cells), `capacity.json` (length → line count), `hyphen.json` (wrap variants), plus the live-typing and invalid-journey probes — all in the session scratchpad |

### 0.1 Run 2 — the same harness, pointed at the string that ships

Run 1 sized this slot against **fillers**, because `copy.md` had not delivered yet. Run 2 measures
the **delivered 327-character string** (`copy.md` § *Strings*) in the same box, and every figure in
§2, §8, §9 and §10.1 that the delivered string changes is corrected in place below. Where a run-1
cell is superseded, the run-1 value is kept beside it rather than deleted.

| | |
|---|---|
| Copy | `rsync -a --exclude node_modules --exclude .next --exclude .git` → scratchpad `iso`; `cp -al` of `node_modules`. **The repository working tree was never mutated** (`git status --porcelain` on it is unchanged by this gate) |
| Snapshot | working tree of `fix/design-taste-preflight`, 2026-09-19, **after** the sibling night-premium caption landed in `day-summary.tsx` (`git status --porcelain components/organisms/day-summary.tsx` → `M`). That paragraph is the one `plan.md` § C-2 says made two run-1 cells stale; run 2 measures against it, so the stale cells are corrected here and not carried |
| Intended state | weekday operand deleted from `hooks/use-work-calculator.ts` (`splitOvertime(overtimeMinutes)`, no `getDay()`), and the disclosure inserted as the last child of the variable-pay block carrying **`copy.md`'s delivered string verbatim**, `hyphens-auto`, `id="weekday-tier-disclosure"` |
| Build | `next build` → **exit 0**, no typecheck exclusion needed this run |
| Serve | `next start -p 3762`, port confirmed free with `ss -ltn` before use and **released and re-confirmed free after**. **Never `next dev`** |
| Machine hygiene | `pgrep -c -f "chrome-headless-shell --type=render[e]r"` and `pgrep -c -f "@playwright/tes[t]/cli.js test"` polled to **0** before the browser ran — this gate waited through another agent's Playwright run rather than racing it. (The self-matching `pgrep` pattern reads its own shell's command line and reports a phantom **1**; the bracket form is the one that answers the question) |
| Instrument | Playwright chromium headless, `deviceScaleFactor: 1`, seeded `localStorage`, readings **1 400 ms after `networkidle`**, taken again after a full `reload()` **with the journey re-driven** |
| Journey | entrada **08:00**, almoço **12:00–13:00**, jornada **8h48**, salário **R$ 15.000,00** / **220 h**, entry date = device date **19/09/2026 (sábado)**. **S3** = saída manual **22:00**; **S2** = saída manual **17:48** (overtime exactly 0); **S1** = the same journey with `grossSalary` unseeded |
| Box model | `getBoundingClientRect()`, **border box**, CSS px. Line boxes counted as the set of distinct rounded `top` values over a per-character `Range`, which also yields the **character count of every individual line box** — that is what makes W5 decidable rather than estimated |
| Artifacts | `measure.json` (16-cell matrix), `measure2.json` (LR3.5 / money / live-typing / S1), `measure3.json` (LR3.5 scroll sweep at 390), `measure4.json` (length → line-box curve, 230–480 chars, three viewports), `measure5.json` (sibling attribution), in the session scratchpad |

**The intended state renders `legal.md` §5.4's figures.** On the Saturday above, S3, 390×844, light,
1 400 ms after `networkidle`: `["R$ 204,55", "R$ 300,00", "R$ 0,00", "R$ 77,62"]`. Identical in
dark, and at 1440×900, 2560×1440 and 3840×2160. The screen this design is drawn on is the corrected
one, not the R$ 572,73 one.

---

## 1. Intent — what the eye does in the first two seconds at 390

Nothing above the answer changes. This design adds one quiet line **below** the money and moves
nothing else.

- **0–1 s** — the hero: *Saída Real*, `--text-numeral`, the only thing at that size. Untouched here.
- **1–2 s** — inside *Seu Dia*: **Saldo do dia** at `--text-metric`, then the two `Extra …%` rows and
  the DSR row, each ending in a right-aligned `--color-positive-ink` figure. Untouched here.
- **2 s +** — the two captions that qualify those figures, at `--text-caption` in
  `--color-ink-subtle`: the existing DSR sentence, and **the new disclosure**, closing the block.

The disclosure is deliberately the **quietest** thing in the card and the **last** thing in its
block. It has no icon, no tint, no border, no shadow and no control — because everything that would
make it louder would also make it compete with the figure it qualifies, and because a disclosure
that carries a control is a different rule (`legal.md` §9.4 **W8**; see §10.2).

Nothing decorative sits between the user and the answer, and **no ad slot exists in, above or
adjacent to this block** (`PRODUCT.md` §8) — `components/organisms/ad-manager.tsx` is mounted by
`calculator-views.tsx`, outside the card.

---

## 2. Layout

### 2.1 The one structural move

One `<p>` is added inside `components/organisms/day-summary.tsx`, as the **last child of the
variable-pay block** (`div.space-y-3.border-t`), after the existing DSR caption and before the
`grossHourlyRate === null` link. It is a full-width block child: **no icon, no indent, no padding of
its own**, so its border box is exactly the block's content box.

**Why after the DSR caption and not between the rows and that caption:** the DSR caption qualifies
the DSR row 12 px above it, and inserting a six-line paragraph between them would push the caption
**104,34 px** (measured, 390×844, S3) away from the number it explains — trading one adjacency for
another. `legal.md` **W7** only requires the new surface to follow the extra-tier row in document
order and to sit strictly below it; both placements satisfy it, and this one does not damage a
sibling disclosure to do it.

**This placement is not argued from co-presence.** `legal.md` §9.6 measured the footer and the
overtime rows as co-visible in one viewport (706,65 px @390 against 844) and **deliberately left the
co-presence axis non-binding**. That argument is not resurrected here: this slot is justified by
**W1** (it renders in exactly the states the money renders in) and **W7** (document order), never by
being closer to the number than the footer is.

### 2.2 390 × 844 — the design target

**Run 2 — the delivered 327-character string**, 390 × 844, identical in light and dark:

| Quantity | S3 (saída 22:00) | S2 (saída 17:48) |
|---|---|---|
| Disclosure border box | **308,00 × 121,734375 px** (7 line boxes) | **308,00 × 121,734375 px** (7 line boxes) |
| Line-box character counts | **49, 48, 47, 53, 55, 48, 27** | identical |
| Extra-tier row border box width | 308,00 → **Δ = 0,00 px** | 308,00 → **Δ = 0,00 px** |
| Disclosure `top` − extra-tier row `top` | **+275,13 px** | **+147,17 px** |
| `left` / `right` | **41,00 / 349,00** against `scrollWidth` **390** | idem |
| Horizontal overflow | `scrollWidth 390 === clientWidth 390` | idem |
| Card height cost | **+133,734375 px** | **+133,734375 px** |
| Card height with the disclosure | 1 075,83 px | 737,88 px |
| Of which the sibling gap | **12,01 px** — the parent's `space-y-3`; the paragraph declares `margin-top: 0px` (computed) | idem |

**Two run-1 cells are corrected here, and the correction is a sibling's, not this design's**
(`plan.md` § C-2, `STATUS.md` 2026-09-19). Run 1 read **+176,17 px** (S3) and **+83,00 px** (S2)
against a tree that did not yet carry the night-premium caption. Measured on the current tree
(`measure5.json`, 390 × 844, light, border box), the variable-pay block's children before the
disclosure are:

| Sibling | S2 | S3 |
|---|---|---|
| balance row (`div.flex.items-baseline`) | 28,80 px | 28,80 px |
| the four money rows (`div.space-y-2`) | 100,00 px | 129,00 px |
| night-premium caption `<p>` (122 chars) | 52,17 px, 3 line boxes | 52,17 px, 3 line boxes |
| DSR caption `<p>` (255 chars) | **absent** | 86,95 px, 5 line boxes |
| `space-y-3` gaps | 12,01 px each | 12,01 px each |

S2: **83,00 + 64,17** (night caption + its gap) = **147,17** — the delta is exactly that paragraph.
S3 adds the same 64,17 plus **34,78 px**, two line boxes the DSR caption gained as its own text grew
to 255 characters. **The card-cost cell is not stale**: +133,73 px is a function of the line-box
count, and 301 filler characters and 327 delivered characters both render 7 line boxes at 390.
`tech-lead`'s judgement that **no clause breaks** is confirmed by measurement: **W7** requires Δtop
strictly positive and it grows; **W4** is Δ = 0,00 px in 16/16; **W2**, **W5** and **LR3.5** are
re-measured green in §8, §9 and §10.1 on the delivered string. Not a G3 bounce.

The extra-tier row's own `top` moved with the same sibling: **2 274,75 px** @390 (run 1 recorded
2 290,75 on the pre-sibling tree), **1 080,75 px** @1440, unchanged. §2.4's claim is restated
accordingly: nothing **this design** adds moves anything above the answer — the 16 px that did move
belongs to the night-premium caption, which is not in this spec's file set.

### 2.3 1440 × 900, 2560 × 1440, 3840 × 2160

`DESIGN.md`'s Scale-Don't-Reflow rule holds: nothing new appears, nothing collapses, the paragraph
is the same full-width block child of the same 7-column card.

**Run 2, the delivered string**, 16 cells (4 viewports × 2 themes × S2/S3); every row is identical
in light and dark:

| Viewport | root | Disclosure box | Δw vs extra-tier row | Δtop vs extra-tier row (S3 / S2) | line boxes | min non-last line | card cost |
|---|---|---|---|---|---|---|---|
| **390 × 844** | 16px | 308,00 × 121,734375 | **0,00** | +275,13 / +147,17 | 7 | **47** | +133,734375 |
| **1440 × 900** | 16px | 667,328125 × 52,171875 | **0,00** | +201,95 / +108,78 | 3 | **109** | +64,171875 |
| **2560 × 1440** | 18px | 961,00 × 58,6875 | **0,00** | +188,06 / +102,81 | 3 | **140** | +72,1875 |
| **3840 × 2160** | 18px | 961,00 × 58,6875 | **0,00** | +188,06 / +102,81 | 3 | **140** | +72,1875 |

Run 1's Δtop column (+176,17 / +83,00 @390, +137,78 / +62,00 @1440, +135,44 / +69,75 @2560 and
@3840) is superseded by the row above for the sibling reason given in §2.2.

- The root **is 18px at 2560 and at 3840** and the container is the same 1800px — read off the
  measured type step (`font-size: 13.5px` = 0.75rem × 18) and the identical box at both widths, not
  off the stylesheet (lesson **028**).
- The 12 px sibling gap scales with the root: **12,01** @390/1440, **13,50** @2560/3840
  (72,19 − 58,69). It is `space-y-3` in both cases; nothing was redeclared.
- **No horizontal overflow and no control off-viewport at any of the four widths**:
  `scrollWidth === clientWidth` in 16/16 cells.

### 2.4 Nothing above the answer moves

The hero, the timeline, the stretch rows, the totals block and the balance row are byte-identical in
class and geometry: the extra-tier row's own `top` is **2 290,75 px** @390 and **1 080,75 px** @1440
in this build — the same values `legal.md` §9.4 recorded on the unpatched one. The whole cost of
this design is below the last money figure.

---

## 3. Component tree

| Element | Level | Status | Path |
|---|---|---|---|
| `DaySummary` | organism | **extend** — one child added, nothing removed | `components/organisms/day-summary.tsx` |
| Variable-pay block (`div.space-y-3.border-t`) | — (in-file) | **reuse**, unchanged | `day-summary.tsx:180-248` |
| `Extra 50%` / `Extra 100%` / night / DSR rows | — (in-file) | **reuse**, unchanged | `day-summary.tsx:190-230` |
| DSR caption `<p>` | — (in-file) | **reuse**, unchanged | `day-summary.tsx:232-237` |
| **Weekday-tier disclosure `<p id="weekday-tier-disclosure">`** | — (in-file element inside an existing organism) | **new** | `day-summary.tsx`, immediately after the DSR caption block |
| `AlertBanner` | atom | **considered and rejected** — see below | `components/atoms/alert-banner.tsx` |
| `CollapsiblePanel` | atom | **forbidden here** — see §10.2 | `components/atoms/collapsible-panel.tsx` |

**No new component.** The slot already has a shipped pattern one line above it — a full-width
`--text-caption` / `--color-ink-subtle` paragraph qualifying the figures in the same block — and
reusing it is what makes `legal.md` **W4** (equal border-box width, within 0,50 px) hold by
construction instead of by coincidence: measured **Δ = 0,00 px in 16/16 cells**.

**Why not `AlertBanner`.** It is the product's warning surface: `--color-overtime-soft` fill, a 30 %
hue border, a 20 px `IconAlertTriangle`, `role="status"`. Three reasons it is wrong here. (1) Its
subject is *"a CLT limit approached"* or *"an input the app cannot use"* — this is neither; the
number is correct and the app is naming what it does not compute (`PRODUCT.md` §4 *name the gap*).
(2) In S3 with 252 min of overtime a real `AlertBanner` **already renders** in this card (measured:
`warnings = 1`); a second amber block would make the compliance warning and the disclosure
indistinguishable. (3) Its horizontal chrome would break **W4**: it spends border + padding, so its
content box could not equal the extra-tier row's border box.

**Why the element carries an `id`.** `#weekday-tier-disclosure` is a stable selector for the G6
guard, which must assert the size of its set **before** iterating (`legal.md` §9.5). A class-based
selector over `p.text-caption` would also match the DSR caption and the four footer paragraphs, and
a guard that cannot tell them apart is the vacuous guard §9.5 forbids.

### 3.1 The markup, as measured

```tsx
<div className="space-y-3 border-t border-line-faint pt-6">
  <div className="flex items-baseline justify-between gap-4">…</div>
  <div className="space-y-2">…</div>

  {restDayPay > 0 ? (
    <p className="text-caption text-ink-subtle text-pretty">…</p>
  ) : null}

  {grossHourlyRate === null ? null : (
    <p id="weekday-tier-disclosure" className="text-caption text-ink-subtle hyphens-auto">
      {/* copy.md slot disclosure.weekday-tier */}
    </p>
  )}

  {grossHourlyRate === null ? (
    <Link href={VIEW_PATHS.salary} …>…</Link>
  ) : null}
</div>
```

The rendering condition is `grossHourlyRate !== null` — **the same operand that decides whether any
money renders at all**, and nothing else. Not the weekday, not `restDayPay > 0`, not
`overtimeMinutes > 0`, not any panel's open state (`legal.md` **W1**).

---

## 4. Tokens

Every value is a named token from `app/globals.css`. No hex, no arbitrary length, no raw duration.

| Property | Token | Resolves to (light) | Resolves to (dark) |
|---|---|---|---|
| Type step | `--text-caption` | 0.75rem / **12 px** @390–1440, **13.5 px** @2560–3840 | identical |
| Line height | `--text-caption--line-height` (1.45) | **17,4 px** @390–1440, **19,575 px** @2560–3840 | identical |
| Weight | `--text-caption--font-weight` (400) | 400 | 400 |
| Tracking | `--text-caption--letter-spacing` | +0.012em | +0.012em |
| Family | `--font-sans` (Atkinson Hyperlegible Next) | — | — |
| Text colour | `--color-ink-subtle` | `oklch(0.539 0.017 264)` | `oklch(0.645 0.016 264)` |
| Surface behind it | `--color-surface` (the card's own fill, inherited) | `oklch(1 0 264)` | `oklch(0.222 0.012 264)` |
| Sibling gap | parent `space-y-3` = `calc(var(--spacing) * 3)` | **12,01 px** | 12,01 px (13,50 px at an 18px root) |
| Own margin / padding | none | computed `margin-top: 0px` | idem |
| Radius | none | — | — |
| Border | none | — | — |
| Elevation | **none** — `DESIGN.md` Flat-at-Rest Rule | — | — |
| Opacity | none declared; computed **1** in 16/16 cells | 1 | 1 |
| Wrapping | `hyphens-auto` (`hyphens: auto`, resolved against `lang="pt-BR"` on `<html>`, `app/layout.tsx:61`) | — | — |

**Why `hyphens-auto` and not the sibling's `text-pretty`** — measured, not preferred. On four
pt-BR-shaped fillers at 390×844, light, S3, the **minimum non-last line box** was:

| Filler length | plain | `text-pretty` | `hyphens: auto` | both |
|---|---|---|---|---|
| 106 chars | 39 | 39 | **47** | 39 |
| 111 chars | 47 | 47 | 47 | 47 |
| 239 chars | 42 (6 lines) | 42 (6 lines) | **44 (5 lines)** | 44 (5 lines) |
| 266 chars | 44 | 44 | **48** | 48 |

`legal.md` **W5** requires every non-last line box to hold **≥ 45 characters**. `text-wrap: pretty`
rebalances the tail to avoid a short last line, which *lowers* earlier lines and, on the 106-char
filler, **cancels hyphenation's gain entirely** (47 → 39). `hyphens: auto` raises the fill on three
of four fillers and removes a whole line box on one (−17,39 px). So this paragraph takes
`hyphens-auto` **without** `text-pretty`. The fillers' text is not reproduced anywhere in this
document, because every pt-BR string belongs to `content-writer`.

**The one cosmetic consequence, recorded rather than hidden:** the DSR caption directly above keeps
`text-pretty` and no hyphenation, so two adjacent captions rag differently. It is not corrected here
— `spec.md` § Out of scope forbids touching anything beyond the new disclosure's own box, and the
alternative (hyphenating both) would change a string this spec does not own. **Owner:**
`product-designer`. **Trigger:** the next spec that opens the DSR caption's block for its own
reasons.

---

## 5. Disclosure placement — `legal.md` §9, clause by clause

One surface. State-independent. `legal.md` §9.1's domain test — *every surface that renders a money
figure derived from the day's overtime minutes* — returns **one module, one call site**, and this is
it.

| Clause | Axis | How this design satisfies it | Measured |
|---|---|---|---|
| **W1** | presence | Rendering condition is `grossHourlyRate !== null` — identical to the condition on the three money figures. Not gated on the weekday, on `restDayPay > 0`, on a non-zero figure, or on any panel | present in **16/16** measured cells (S2 + S3 × 4 viewports × 2 themes), on the first reading **and** after `reload()` |
| **W2** | space | Full-width block child, no clipping ancestor, no opacity declared | run 2, delivered string: `height` **121,734375 / 52,171875 / 58,6875 px** > 0; `opacity` **"1"**; `left` **41,00 ≥ 0** and `right` **349,00 ≤ scrollWidth 390** @390; `scrollWidth === clientWidth` at all four widths |
| **W3** | time | Server-rendered inside `DaySummary`; nothing defers, animates or unmounts it | present at **1 400 ms** after `networkidle` and again **after a full `reload()`**, in 16/16 cells |
| **W4** | size | Same box as the extra-tier row: both are full-width block children of the same padded card, neither carries horizontal chrome | Δ border-box width = **0,00 px** in 16/16 cells (308,00 / 667,33 / 961,00 / 961,00) |
| **W5** | measure | `--text-caption` in a 308 px box, `hyphens-auto` to raise line fill, plus a character window and a rendered line-box test (§8) | **run 2, on the delivered string: minimum non-last line box = 47 @390, 109 @1440, 140 @2560/3840, against a floor of 45 — pass in 16/16.** §10.1 keeps the rule that a future miss is answered by wording |
| **W6** | modality | Rendered text in a plain `<p>`. No `sr-only`, no `aria-label`, no `title`, no tooltip, no icon carrying meaning | the element has none of those attributes; its whole accessible name is its text |
| **W7** | order | Document order: rows → night-premium caption → DSR caption (S3 only) → **disclosure**. Reading order equals element order; no `order-*`, no `sticky`, no `position` anywhere in this card | run 2: `top` − extra-tier row `top` = **+275,13** (S3) / **+147,17** (S2) @390; **+201,95 / +108,78** @1440; **+188,06 / +102,81** @2560 and @3840 — strictly positive in 16/16 |
| **W8** | operability | **Not triggered, deliberately.** The surface carries no control — no `<details>`, no "saiba mais", no info button, no collapse. See §10.2 | — |
| **W9** | wording | §8 — slot only. `content-writer` owns every word, bound by `legal.md` §10 | — |

### 5.1 The state matrix, and the S1 exemption

`legal.md` §9.5: **3 states × 2 viewports × 2 themes = 12 cells; S1's 4 exempt with its reason;
8 measured + 4 exempt = 12.** This gate measured a **superset**: 3 states × **4** viewports × 2
themes = **24 cells — 16 measured + 8 exempt**.

| State | Condition | Money derived from overtime | Disclosure | Measured |
|---|---|---|---|---|
| **S1** | `grossHourlyRate === null` | none — the *"Quer ver quanto isso vale em reais?"* link renders instead | **absent, by design** | absent in **8/8** cells, both readings. The gate on the disclosure is the gate on the money, so S1 cannot render one without the other |
| **S2** | salary set, overtime = 0 | two figures, both `R$ 0,00` (DSR row and caption absent) | **present** | 8/8 cells; measured money `["R$ 0,00","R$ 0,00","R$ 0,00"]` |
| **S3** | salary set, overtime > 0 | three figures | **present** | 8/8 cells; measured money `["R$ 204,55","R$ 300,00","R$ 0,00","R$ 77,62"]` |

**A fourth state, measured because the matrix does not name it:** an invalid journey (saída before
entrada). `work-calculator.tsx:195` drops the whole `DaySummary`; measured at 390×844, S-invalid:
`summary: false`, money spans **`[]`**, disclosure **absent**, one `role="alert"` banner. The domain
is empty, so W1 is satisfied vacuously **and provably** — not by an assumption about a branch.

### 5.2 The other disclosure obligations in `spec.md`

| Obligation (`spec.md` § Disclosure obligations) | Where it sits |
|---|---|
| 1 — the day was priced by its weekday, and the user never said anything about that day | **the new slot** — assertion **C1** |
| 2 — whether a folga compensou o dia is a fact the app does not collect | **the new slot** — assertions **C2** + **C3** |
| 3 — feriados are not in the calculation | **the new slot** carries the half `legal.md` §9.6 ruled missing (the dobra, and that this screen does not compute it); the footer paragraph in `calculator-views.tsx:85` keeps its own sentence **unchanged**. Two different sentences about one gap — never the same sentence twice (lesson **047**) |
| 4 — the editable rate step (finding **L-2** / debt **D1**) | **out of scope here** (`spec.md` § Out of scope, § Carried forward **D1**). It is *not* folded into this slot: doing so would put a second claim, with a different domain, inside the one string G6 will score |

---

## 6. States

The disclosure is **not interactive**. Every state is stated rather than left undefined
(`DESIGN.md` § Components).

| State | Behaviour | Why |
|---|---|---|
| **rest** | `--text-caption` / `--color-ink-subtle` on `--color-surface`, opacity 1 | the only visual state it has |
| **hover** | **no change** — no colour, no underline, no cursor change (`cursor: auto`) | it is text, not a target. A caption that lights up under the pointer invites a click that does nothing |
| **focus-visible** | **not focusable** — no `tabindex`, no control inside, so it never receives focus and never draws a ring | stated explicitly so nobody adds `tabIndex={0}` to "make it reachable": a screen reader reaches it in reading order, and a keyboard user does not need to stop on static text (`DESIGN.md` The Ring Is Never Optional applies to focusable elements; this is not one) |
| **active** | not applicable — nothing to press | — |
| **disabled** | not applicable — no control | — |
| **loading** | **no skeleton, no placeholder, no fade-in.** The paragraph is server-rendered with the card and is in the first paint | measured present at 1 400 ms and after `reload()`; a disclosure that arrives late is the failure mode `legal.md` **W3** exists to catch (`.specs/0003-…` §16.1 D3.2: a transient carrier left the DOM at 371–481 ms) |
| **error** | not applicable to the element. In the app's error state (invalid journey) the whole card is absent, together with every money figure — measured in §5.1 | the disclosure never renders next to an error it does not qualify |
| **empty** | **there is no empty state.** The string is static; it has no data dependency and can never render blank. S1 is an *absence*, not an empty state, and it is measured as absence | a disclosure whose text comes from data is a disclosure that can render empty |
| **live-updating (as the user types)** | The paragraph **does not remount, does not resize and does not re-announce** while the money recomputes | re-measured in run 2 **with the delivered string**: 390×844, light, S3, typing `19:30` into *Hora para Saída Real*; the money moved `["R$ 204,55","R$ 300,00","R$ 0,00","R$ 77,62"]` → `["R$ 173,86","R$ 0,00","R$ 0,00","R$ 26,75"]`; a `data-marker` set on the element **survived** (`"kept"`), and its border box stayed **308,00 × 121,734375 px** (`sameBox: true`) |

---

## 7. Motion

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion |
|---|---|---|---|---|---|---|
| Weekday-tier disclosure | **none** | **none** | — | — | — | nothing to suppress |
| The paragraph while the user types | keystroke in the journey form | **none — forbidden** | — | — | — | — |
| The card the paragraph lives in | calculator view change (`work` ↔ `salary`) | `opacity` 0→1, `y` 12→0 | spring, `bounce: 0`, **0.32 s** | existing spring | 0 | `MotionConfig reducedMotion="user"` (`components/templates/theme-provider.tsx:10`) already disables the transform half and keeps the opacity cross-fade |

**This design introduces no animation at all**, and that is the decision, not an omission:

- `DESIGN.md` § Motion — *"Anything triggered by a keystroke"* must never animate, and the money
  beside this paragraph changes on every keystroke. A disclosure that fades in each time the split
  changes would be the strobe that rule forbids.
- It introduces **no state-bound transform**, so no `motion-reduce:` neutralizer is owed. The pairing
  rule (`AGENTS.md` §8 — `hover:-translate-y-1` needs `motion-reduce:hover:translate-y-0`) binds
  where a transform exists; adding a bare `motion-reduce:transform-none` here would be noise that
  loses on specificity anyway.
- The known residual in `DESIGN.md` § Motion (the un-suppressed `height: 0 → auto` sweep in
  `collapsible-panel.tsx`) is **not touched and not inherited**: this disclosure is never inside a
  collapsible panel (§10.2).

---

## 8. Copy slots

`content-writer` owns every word, bound by `legal.md` §10 (**C1**, **C2**, **C3**, all three
required; *"não compensado"* adjacent to *domingo/feriado*; no deixis, per lesson **049**).
This gate specifies the slot, never the sentence.

### 8.1 The window was wrong. It is corrected here, and the delivered string ships uncut

Run 1 wrote **215–270 characters, inclusive**. `copy.md` delivered **327**. `tech-lead` ruled at G4
that this document governs (`STATUS.md` **B1**). It governs, so it is this document's job to be
right, and it was not: **the 215–270 window was drawn on fillers and its ceiling priced a line box
as if a line box were a failure.** Measured on the delivered string, in the box that ships:

| What the ceiling was protecting | What 327 characters actually cost, measured |
|---|---|
| a 7th line box at 390 | **+17,39 px** of card height, below the last money figure |
| a 4th line box at 1440 | **none** — 327 renders 3 line boxes at 1440; the 4th arrives at 333 |
| a 3rd line box at 2560 / 3840 | **+19,56 px**; the 3rd arrives at **286**, so the old 270 ceiling bought that line box a margin of 16 characters and nothing else |

**No clause fails at 327, and every clause was re-measured on the delivered string, not inferred:**
W1 present in 16/16 and after `reload()`; W2 height 121,73 px / opacity 1 / box inside the document;
W3 present at 1 400 ms and after reload; W4 **Δ = 0,00 px** in 16/16; **W5 minimum non-last line box
= 47 characters at 390** (109 @1440, 140 @2560/3840) against a floor of 45; W6 rendered text; W7
Δtop strictly positive in 16/16; LR2b **46,7** characters per line box at 390 against a floor of 40;
LR1 satisfied by equality; LR3.5 green with a measured clear scroll position (§10.1, §9).

The four facts the string carries are each independently required by `legal.md` §10 — C1, the dobra
rule for an uncompensated domingo/feriado, *esta tela não calcula*, and the two uncollected facts
that are the reason. The shortest of the four clauses as delivered is **36 characters**
(`len()` over the clause table in `copy.md` § *Strings*), so **291 is the largest length reachable
by deleting a whole clause**: every cut that lands inside the old 215–270 window drops a required
fact, which is a **legal change and not a design one** (`AGENTS.md` §4 rule 8 — it would go to
`labor-law-analyst`, never to this gate). A ceiling that can only be met by an edit this gate is
forbidden to make is not a budget. It is corrected.

**The 95/231 split is not ordered, and not because it fails.** Measured in the same box at 390, as
two boxes: the 96-character head renders 2 line boxes (49, 47 — minimum non-last **47**) and the
231-character tail renders 5 (47, 53, 55, 48, 27 — minimum non-last **47**). Both would pass W5 and
LR2b. It is refused on cost and on subject: it adds a second **12,01 px** `space-y-3` gap for no
claim, it doubles the G6 guard's subject (`legal.md` §9.5 asserts the size of the set before
iterating), and a two-element disclosure invites a future gate to render one half without the other.
**One `<p>`, one string** stands.

### 8.2 The corrected slot

| Slot | Role | Type step | Character window @390 | Binding test | Rendered result |
|---|---|---|---|---|---|
| `disclosure.weekday-tier` | the whole disclosure — one paragraph carrying C1 + C2 + C3 | `--text-caption` | **290–353 characters, inclusive** | **≤ 7 line boxes at 390 × 844** *and* every non-last line box **≥ 45 characters** (W5) | at the delivered **327**: 7 boxes / **121,73 px** @390; 3 / **52,17 px** @1440; 3 / **58,69 px** @2560 and @3840 |

**The window is an anchor; the rendered line count is the rule.** A character count cannot be the
binding test, because the writer never sees the box and the same count wraps differently in a
different wording. So the test is stated as a rendering condition, and the character window is its
measured anchor **for this wording family** — the delivered string extended and truncated in the
live box, `measure4.json`, 390 × 844, light, S3, `hyphens-auto`, 12 px / 17,4 px:

| line boxes @390 | 5 | 6 | 7 | 8 | 9 |
|---|---|---|---|---|---|
| character range | …–252 | 253–302 | **303–353** | 354–399 | 400–451 |
| height | 86,95 | 104,34 | **121,73** | 139,13 | 156,52 |

| viewport | 3 line boxes from | 4 line boxes from |
|---|---|---|
| 1440 × 900 | 2 boxes to 332 → **3 boxes at 333** | 443 |
| 2560 / 3840 | 2 boxes to 285 → **3 boxes at 286** | 427 |

- **Floor 290** — measured, not chosen: **291** is what the delivered string measures after deleting
  its shortest required clause, so any string at or below 290 in this wording family has dropped one
  of C1 / C2 / C3. Below the floor is `labor-law-analyst`'s territory, not a shortening this gate or
  `frontend-dev` may perform (lesson **055**: the floor is not the shortest correct sentence).
- **Ceiling 353** — the last length that still renders **7** line boxes at 390. It gives the writer
  **26 characters** of headroom above the delivered 327 at zero pixel cost. Past it each further
  line box costs **17,39 px** @390 and **17,39 / 19,56 px** at the wide viewports; that is a stated
  price, not a prohibition, and a string that needs 360 characters to carry the four facts gets them
  — the disclosure is never cut to fit the card (`AGENTS.md` §4 rule 8).
- **No gap between two windows.** The window is a single interval containing the delivered string
  with 37 characters of room below and 26 above; there is no second, disjoint band a redraft can
  fall into (lesson **055**'s failure mode, and the one run 1's ceiling created).
- **No link, no abbreviation behind a control, no "saiba mais".** See §10.2.

Run 1's window (215–270) and its capacity table are **superseded**. They were measured correctly on
fillers, and fillers are not the subject (lesson **052**).

Written down as lesson **070** so the next slot is budgeted as a rendering condition with a measured
character anchor, and its ceiling is set only where a clause or a named pixel cost binds.

## 9. Accessibility

- **Semantics.** A plain `<p>` — implicit role `paragraph`. No heading, no `role`, no ARIA. It is not
  `aria-hidden`, not `sr-only`, and carries no `title` (**W6**).
- **Tab order.** Unchanged. The element is not focusable and adds nothing to the tab sequence; the
  card's only focusable descendant remains the S1 link, which is absent whenever the disclosure is
  present.
- **Reading order.** Saldo → the four money rows → DSR caption → **disclosure**. Measured as DOM
  order with strictly increasing `top` (§5, W7), so the screen-reader path and the visual path are
  the same path.
- **Live regions.** The disclosure is **outside every live region** — measured: walking ancestors
  from the element to `<body>` returns **no `aria-live`** (`liveAncestor: null`). This is deliberate:
  `TotalRow` carries `aria-live="polite"` only for the in-progress total, and putting static
  statutory text inside a region that updates on every keystroke would re-announce the whole
  disclosure each time the user types a digit. The values that update as the user types keep exactly
  the announcements they have today; this design adds none and removes none.
- **Contrast, both themes, measured on the rendered build** (canvas-converted computed colours,
  border box, 390×844 and 1440×900, S2 and S3 — identical in all 16 cells):

| Pair | Light | Dark | AA 4.5:1 |
|---|---|---|---|
| `--color-ink-subtle` on `--color-surface` (the disclosure) | **5,06:1** | **5,25:1** | **pass** in both |
| `--color-ink-subtle` on `--color-surface` (the DSR caption, unchanged sibling) | 5,06:1 | 5,25:1 | pass |

Re-measured in run 2 on the delivered string: **5,06:1 light / 5,25:1 dark in 16/16 cells**, colour
`--color-ink-subtle` computed against the card's own `--color-surface` fill, converted through a
canvas 2D context. `liveAncestor: null` in 16/16 — the paragraph is outside every `aria-live`
region, and the S1 absence is measured as absence (`disclosure: false`, the *"Quer ver quanto isso
vale em reais"* link present in the same reading).

- **Targets.** None added; the Forty-Four Rule is not engaged because nothing here is interactive.
- **Zoom / 320px.** The paragraph is a full-width block child with no fixed width and no `min-width`;
  it inherits the card's behaviour. At 390 its box is 308,00 px against an available content width of
  308,00 — `assertLr1`'s `min(320, available)` is satisfied by equality, as it is for every other
  block in this card.
- **Colour is never the only channel.** The disclosure carries no colour coding at all — it is the
  same neutral as every other caption.

---

## 10. Two findings this gate owes the pipeline

### 10.1 **W5 is decided, green, on the string that ships — and the rule that got there stands**

**Run 2 answer, measured before anything else in this section is read.** The delivered
327-character string, 390 × 844, light and dark, S2 and S3, `hyphens-auto`, per-character `Range`:
line boxes **49, 48, 47, 53, 55, 48, 27** → **minimum non-last line box = 47 characters**, two above
**W5**'s floor of 45. At 1440 it is **109** (109, 110, 108); at 2560 and 3840 it is **140**
(140, 144, 43). **W5 passes in 16/16 cells.** LR2b, averaged, is **46,7** at 390 against its floor
of 40. G6 still takes the verdict on what is actually in the tree at that gate, but this gate no
longer hands it an open question: it hands it a measured pass and the exact instrument that produced
it.

The run-1 analysis below stands as written, because the **reason** it gives is what made the delivered
string pass — the margin is `hyphens-auto`'s, and the remedy for a future miss is still wording.

#### Run 1 — why the floor was at risk and what closed it

`legal.md` **W5** requires every non-last line box to hold **≥ 45 characters**, calibrated on the
precedent caption, which measured **52, 52** at 390. That calibration is correct and reproducible —
and it is a property of *those words*, not of the box. Measured in the same box, at the same type
step, on pt-BR-shaped fillers:

| Variant @390, light, S3 | minimum non-last line box, over four fillers |
|---|---|
| plain | **39, 42, 44, 47** |
| `text-pretty` (the sibling's setting) | **39, 42, 44, 47** |
| **`hyphens: auto` (this design)** | **47, 44, 48, 47** |

Hyphenation is the only geometric lever available — the box width is fixed by the card, and
`--text-caption` is already the smallest step in the ramp, so a smaller step would be both a system
change and a legibility regression. With it, **one filler of four still landed at 44**, one character
under the floor.

**What follows, stated so no one resolves it the wrong way:**

- W5 is **decidable only on the delivered string** (lesson **052**). This gate hands the writer a
  budget and the wrapping behaviour; the verdict is taken at G6 on the rendered string.
- If the delivered string misses W5, the remedy is **wording** — rephrasing so the lines fill — and
  never moving the disclosure, never shrinking it, never dropping a claim to fit. A disclosure that
  is relocated to satisfy a measure clause has answered a legibility question with a visibility
  regression.
- Routed to `tech-lead` for `labor-law-analyst`: W5 as written is satisfiable here but **not
  guaranteed by this slot's geometry**, and the gap between the band (39–50) and the floor (45) is
  the wording's, not the layout's. This gate is not asking for the floor to move.

**Closed by run 2.** The routing above asked a question the delivered string answers: 47 ≥ 45, in
every cell. The clause needs no restatement and the floor needs no move — and the reason the string
clears it is the `hyphens-auto` in §4, which is the one thing **B2** governs.

### 10.2 W8 stays untriggered — and what would trigger it

`legal.md` **W8** is *"deliberately left open… if `product-designer` gives it one [a control], this
clause becomes binding and must be restated before G5."*

**This design gives it no control**, and that is the clause's answer: no `<details>`/`<summary>`, no
"saiba mais" link, no info button, no tooltip, no `CollapsiblePanel`. Anything in that list would
(a) make W8 binding, (b) breach `PRODUCT.md` §4's *visibly*, and (c) put a 44×44 target and a focus
ring into a block whose whole job is to be quiet. If a later gate wants the string abbreviated behind
a control, that is a **bounce to this gate**, not a build-time simplification.

### 10.3 W2–W7 have no failing subject today — here is how each one goes red

`legal.md` §9.4 records, honestly, that W2–W7 are calibrated against a precedent and have **no red
subject in this tree**. This design creates the subject, so each clause becomes falsifiable. A G6
reviewer that cites one of them must first have seen it red against a deliberately broken variant:

| Clause | Break it by | Expected red reading (390×844, S3) |
|---|---|---|
| **W1** | gating the `<p>` on `restDayPay > 0` instead of `grossHourlyRate !== null` | **absent in S2** — 2 of 8 measured cells go from present to absent |
| **W2** | `sr-only`, or `opacity-0`, or wrapping it in the card's `overflow-hidden` timeline bar | `height` 0, or `opacity` `"0"`, or `right > scrollWidth` |
| **W3** | mounting it from a `useEffect` behind a 2 s timer | present at 2 400 ms, **absent at the 1 400 ms reading**, and absent again after `reload()` |
| **W4** | giving it `px-3`, an icon + `gap-2`, or `max-w-3xl` | width **284,00** (px-3) or **≤ 64,00** (the `max-w-3xl` failure `DESIGN.md` records) against the row's **308,00** → Δ ≥ 0,50 px |
| **W5** | a string whose wrap leaves a 39-char line — reproduced in §10.1 with `text-pretty` on a 106-char filler | minimum non-last line box **39 < 45** |
| **W6** | moving the text into `aria-label` on a wrapper and leaving the `<p>` empty | rendered text length 0 while the accessible name is non-empty |
| **W7** | moving the `<p>` above the rows, or giving the rows `order-last` | Δtop **negative** (the precedent block has **0** rows of `order-[0-9]`/`sticky` today, so this is reachable only by adding one) |

**LR3.5** (`.specs/0010-…` §8.1 — a disclosure must have a scroll position where its whole border box
is clear of `fixed`/`sticky` chrome) binds this surface too, and is measured green on the delivered
string — **with a correction to how run 1 stated it**. LR3.5 asks whether *a* clear scroll position
exists, and run 1 answered with *the centring one*, which is a narrower claim that happens to be
false at 390 in a state run 1 did not seed: with the privacy banner open, the 390 viewport carries
**three** `fixed` elements — the header (0–65), the view nav (766–828) and the banner itself
(354–820) — and the centred paragraph (360,88–482,61) intersects the banner.

Run 2 swept the scroll range in 8 px steps and measured the answer LR3.5 actually asks for, at
390 × 844, S2 and S3, both themes, **banner open** (the worst case):

| Cell | first clear scroll position | paragraph box at it | intersecting `fixed`/`sticky` |
|---|---|---|---|
| light S2 / dark S2 | **2 192** | top 229,92 → bottom 351,66 | **0** |
| light S3 / dark S3 | **2 320** | top 229,88 → bottom 351,61 | **0** |

At 1440, 2560 and 3840 the centred position is already clear: **0** intersecting elements in 8/8
cells. So LR3.5 is green in **16/16**, and it is green in the state that makes it hardest. It goes red if the paragraph becomes the document's last element with
less bottom reserve than the tab bar's band — it is not: `#main-content`'s last element is the
`<footer>` in every state measured (S1, S2, S3-with-warning, S3-without), so **the element that is
last in the container is never this one** (lesson **054**).

---

## 11. System change

**One, and it is small — flagged as a human approval point per `AGENTS.md` §4. It was taken.**

> **Approved — the human, via `team-lead`, 2026-09-19 (`STATUS.md` **B2**).** The `DESIGN.md`
> § Typography § Named Rules sentence below is approved; **T4 takes `hyphens-auto` on the primary
> path** and the pre-analysed fallback at the end of this section **stays unordered** unless the
> human orders it. `team-lead` holds the owner's delegation for this batch; provenance recorded here
> and in `STATUS.md`'s decisions log. The sentence itself is written into `DESIGN.md` by the agent
> that owns that file at its own gate — this section is its specification, not its patch.

Run 2 measured the property as computed on the shipped element: `hyphens: auto` in **16/16** cells,
resolved against `lang="pt-BR"` on `<html>`, and it is what puts the minimum non-last line box at
**47** rather than in the 39–44 band (§10.1).

| Change | What it is | What it replaces | Justification |
|---|---|---|---|
| A sentence in `DESIGN.md` § Typography § Named Rules recording that **a disclosure paragraph in a narrow column hyphenates** (`hyphens: auto`, resolved against `lang="pt-BR"`), while balanced-rag `text-wrap: pretty` stays the default for captions that are not measured per line | documentation of a property this design uses on one element | nothing — it adds a rule; it deletes no token, no step and no curve | measured in §4 and §10.1: `text-pretty` lowers the minimum non-last line to **39** on a 106-char filler where `hyphens: auto` holds **47**, and removes a line box (−17,39 px) on a 239-char one. `DESIGN.md` is silent on hyphenation today, so the property is used without a record, which is exactly the drift the document exists to prevent |

**No new token, no new type step, no new spacing value, no new curve, no new duration, no new colour
role.** The design is built entirely from `--text-caption`, `--color-ink-subtle`, `--color-surface`
and `space-y-3`.

**If the human declines the DESIGN.md addition**, the design still ships: drop `hyphens-auto` and the
paragraph renders in the same box, at the same width, in the same order, with the same contrast —
the only loss is the W5 margin quantified in §10.1, which moves from *"one filler of four at 44"* to
*"two of four at 39 and 42"*. Nothing else in this document depends on it.

---

## 12. Checklist against this gate's own bar

| Bar | Status |
|---|---|
| Every value is a named token | §4 — no hex, no arbitrary length, no raw duration anywhere |
| Every element from `spec.md` and every disclosure from `legal.md` has a place | §5, §5.2 — four obligations routed, one of them explicitly out of scope with its debt id |
| Every interactive element has eight states, focus-visible included | §6 — the element is non-interactive; all eight are stated, with reasons, rather than left undefined |
| Every animation has property, duration, curve and a reduced-motion path | §7 — **no animation is introduced**, and the reason is a `DESIGN.md` rule, not an omission |
| Both themes specified, every text-on-surface pair with its ratio | §9 — 5,06:1 light / 5,25:1 dark, measured in 16/16 cells |
| No horizontal overflow, no control off-viewport, at 390/1440/2560/3840 | §2.3 — `scrollWidth === clientWidth` in 16/16 cells |
| Nothing decorative between the user and the answer; no ad slot where a result appears | §1 — the disclosure is below the last money figure; the ad manager is outside this card |
| No pt-BR string written | §8 — one slot, a window, a rendering test, and no sentence. Run 2 measured `content-writer`'s delivered string; it is quoted nowhere in this file, only counted |
| The delivered string has a place, uncut | §8.1 — **327 characters ship as written**; the window was the thing that was wrong, and it is corrected to 290–353 with the line-box test that binds |
| No disclosure moved, shrunk or dropped to fit the layout | §8.1 — the only cut reachable inside the old window deletes a required clause, which is `labor-law-analyst`'s call and not this gate's |
| No number projected | §0 — every figure names its state, viewport, theme and box model; the one arithmetic in the document (12 px gap = 133,74 − 121,73) is a subtraction of two measurements |
