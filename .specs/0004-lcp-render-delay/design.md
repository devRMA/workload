# 0004 — Design

> Owner: product-designer · Gate: `design` · Run 1

**Verdict: pass, with zero visual change requested.**

This spec asks for a ruling, not a screen. The ruling, up front:

1. **The hydration transition on the hero is already correct and must not be treated.** No skeleton,
   no shimmer, no fade, no dim, no "provisional" mark, no `aria-busy`. The current behaviour — one
   in-place value replacement, instantaneous, in an `aria-live="polite"` element — is the behaviour
   this design system already mandates, and every treatment I could add would violate a named rule in
   `DESIGN.md` while buying nothing at a 182–322 ms duration. §A.
2. **`DESIGN.md` constrains the render-delay remedy in eight specific ways**, listed as a frozen
   invariant table with the measured value each one holds today. §B.
3. **Both OG images are correct as images and nothing about them changes.** Finding B is a URL host
   defect only. But **`spec.md` C3's stated mechanism is refuted**: `/custo-da-hora` has its own
   dedicated `opengraph-image.tsx` and `twitter-image.tsx`, committed since `16097c3`. It is not
   inheritance. A fix that edits only `app/`'s pair leaves half the defect shipping. §C.
4. **X2 (`hero-panel.tsx:44` has no accessible name) does not interact with anything I propose**,
   because I propose nothing. It has one constraint from me, and it makes X2's fix easier, not
   harder. §D.
5. **No new tokens. No system change. No blocker.** §System change.

I am also routing **three findings** that the spec does not carry and that I found by measuring
(§Findings). One of them is a reproducible **0.5452 CLS event on `/custo-da-hora` at 390px** that is
not the hero and whose cause I deliberately do not name.

**Every number in this file was measured in this session**, against the deployed head
(`workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app`), real Chromium, 4× CPU
throttling, in **both** themes, with a returning user's inputs seeded in `localStorage`. Probes and
raw output are in `evidence/` (gitignored): `hero-swap-geometry.mjs/.txt`,
`hero-label-swap.mjs/.txt`, `hero-width-sweep.mjs/.txt`, `cls-early-shift.mjs/.txt`.

---

## References

| Site | Technique borrowed | Why it fits this audience |
|---|---|---|
| — | **None.** | This run designs nothing new. The reference is the shipped artifact itself, read at `components/organisms/hero-panel.tsx`, `work-calculator.tsx:213`, `salary-calculator.tsx:222` and `app/globals.css`, and measured in a browser. `DESIGN.md` §Overview's anti-reference — "loud where it should be silent, slow where it should be immediate" — is the only external frame this ruling needs, and it is already in the binding document. |

---

## §A — The transition, ruled

### A.1 What is on screen today, stated as an intended state

At **390** and **1440**, in **dark** and **light**, for a returning user with stored inputs:

1. The server paints the hero panel complete: fill, eyebrow + icon, badge, ring or media, the
   numeral at its final type step, the supporting line, the footer. Nothing is missing, nothing is
   a placeholder, nothing is at `opacity: 0`.
2. Between **182 ms and 322 ms** later (`legal.md` E-L1; my own runs land the swap at 397–671 ms
   from navigation start under 4× throttle), **the numeral's text is replaced in place, in one
   frame.** The label above it is replaced in the same frame when the stored input that produces it
   differs from the module default.
3. Nothing else about the numeral changes: not its colour, not its weight, not its opacity, not its
   position, not its alignment, not its `font-variant-numeric`. Measured identical across the swap
   in all eight theme × viewport × route cells.
4. A screen-reader user hears the new value **once**, politely, with no interruption.

**This is the correct state.** Not "acceptable" — correct. It is what `DESIGN.md` § Motion already
requires, in three separate named rules, and the current code satisfies all three by accident of
being written well:

| `DESIGN.md` rule | What it says | Status on the swap |
|---|---|---|
| § Motion, *What must never animate* | "**The hero's numeral.** It changes as the user types. It must be instantaneous." | ✅ The only transition declared on the panel is `transition-[background-color] duration-(--duration-slow) ease-standard`. The numeral itself carries no transition. |
| § Motion, *Named Rules* → **The Numbers-Don't-Move Rule** | "A value the user is reading does not animate. Ever." | ✅ |
| § Do's and Don'ts → *Don't* | "Don't animate a value the user is reading — the clock, the countdown, **the hero numeral**, a stat tile figure." | ✅ |

### A.2 Measured: what the swap actually costs, geometrically

The one thing that *does* change with the value is the numeral's **type size**, because
`--text-numeral` is container-query sized (`clamp(2.5rem, 20cqi, 6rem)`, overridden per value by
`--hero-value-size` = `clamp(2.5rem, (208 / value.length)cqi, 6rem)` at `hero-panel.tsx:52`). A
longer restored value renders smaller, and the content below it rises.

Measured at 390px, dark and light identical, 3 loads per case, `evidence/hero-swap-geometry.txt`
and `evidence/hero-label-swap.txt`:

| Route | Seeded state | Default → restored | Numeral size | Line box | Content below rises | CLS attributed |
|---|---|---|---|---|---|---|
| `/` | entry 09:00 | `17:48` → `18:48` | 96 → **96px** (no change) | 144 → **144px** | **0 px** | 0.0000 |
| `/` | + `isManualExit` | `17:48` → `19:10`, label `Saída Prevista` → `Saída Real` | 96 → **96px** | 144 → **144px** | **0 px** | 0.0000 |
| `/custo-da-hora` | salary 4200, period `hour` | `R$ 0,00` → `R$ 17,31` | 87.36 → **76.44px** | 131 → **114.7px** | **16.3 px** | **0.0099** (3/3) |
| `/custo-da-hora` | salary 4200, period `month` | `R$ 0,00` → `R$ 3.807,40`, label `Valor por Hora` → `Valor por Mês` | 87.36 → **55.59px** | 131 → **83.4px** | **47.6 px** | **0.0481** (6/6) |
| `/custo-da-hora` | salary 12000, period `year` | `R$ 0,00` → `R$ 115.600,68`, label → `Valor por Ano` | 87.36 → **47.04px** | 131 → **70.6px** | **60.4 px** | **0.0544** (3/3) |

The `0.0481` event's shift sources, read from the `PerformanceObserver` entry, are exactly the four
nodes below the numeral inside and under the hero — `P.mt-4` (the supporting rate),
`DIV.mt-6` (the `PeriodSelector`), `DIV.pt-6…border-t` (the hero footer) and the form column —
each moving up 48 px. That is the numeral's line-box collapse, and nothing else.

### A.3 The ruling, and why every alternative is worse

**Ruling: leave it exactly as it is. The size change is the system working, not a defect.**

`DESIGN.md` § Typography states the intent verbatim: the numeral is *"container-query sized so it
fills its panel at any width instead of being clamped by the viewport."* A long currency value at a
fixed 96px would be ~600 px wide inside a 294 px container. The alternatives, each rejected:

| Alternative | Why rejected |
|---|---|
| **Fix the numeral at one size** | Overflows at 390. `R$ 115.600,68` at 96px needs ~640px of a 294px container. `DESIGN.md` § Layout / `AGENTS.md` §9 both forbid horizontal overflow at 390. Measured: **no horizontal overflow at any of 320, 390, 500, 640, 768, 1024, 1280, 1440, 1920, 2560, 3840** today (`evidence/hero-width-sweep.txt`). The sizing is what buys that. |
| **Reserve the max line box (`min-h`) so nothing moves** | Costs a permanent 131 px line box with a 47 px numeral floating in it on the `year` case — ~60 px of a phone hero spent on nothing, on the one screen `PRODUCT.md` §5 says is the design target. And it removes 1/n of the occurrences: the same resize fires on **every keystroke** in the salary field, where it is excluded from CLS as user input and is expected behaviour. Reserving space to hide a 300 ms event while leaving the same event visible on every subsequent keystroke is decoration, not a fix. |
| **Animate/tween the size change** | Forbidden three times over (A.1 table). A tweened numeral is a numeral mid-lie. |
| **Skeleton / shimmer / `aria-busy` / dim the default** | `legal.md` §3 *What LR5 deliberately does not say* explicitly declines to authorise it; `spec.md` § Non-goals forbids it outright ("Do not add a loading state, a suspense boundary or a skeleton to the hero. It already has its number; a skeleton would remove one"); and it would violate **LR5.1** the moment the skeleton counted as a third rendered value. Arguing it on design merit alone: the window is under a third of a second, the default is not wrong, and a treatment that draws the eye to a correct number for 0.3 s to tell it the number might change costs more attention than it saves. **Rejected on its own merits, independently of the legal gate.** |
| **Cross-fade the numeral over `--duration-fast`** | Same rules. Also: a cross-fade makes the swap *more* perceptible, not less. The user who is not looking never sees the instantaneous swap; they see one number. |

**The 0.0099–0.0544 CLS is accepted as the price of never overflowing**, and it is 2–10× under the
0.1 "good" threshold. It is now a **bound**: see §B, invariant **I7**.

### A.4 Both themes

The hero is **theme-invariant by construction**, and I verified it rather than assumed it. The three
fills and the ink are declared theme-invariant in `app/globals.css` and the dark and light runs
returned byte-identical computed values:

- `--color-positive-deep` → `lab(34.6656 -33.613 20.247)` in both themes.
- `--color-accent` → `lab(42.9928 13.7188 -63.9009)` in both themes.
- `--color-ink-onfill` → `lab(100 0 0)` in both themes.

So the transition looks the same in dark and in light, and there is no second case to rule on. A
remedy that makes the hero's fill or ink theme-dependent is a regression (invariant **I3**).

---

## §B — What `DESIGN.md` freezes, and what must not move

The remedy for the FCP→LCP gap has not been found yet (`spec.md` O3; it is `plan.md`'s first
deliverable at G4). So instead of guessing at it, this section states the **invariants** it must
preserve, each with the token that defines it and the value I measured today. Every one is
falsifiable by re-running the probes in `evidence/`.

`spec.md` § Out of scope already excludes "design, layout, type ramp, colour, elevation or motion
changes beyond what the G4 attribution proves necessary", overridable by me at G3. **I take no
override.** The list below is what that exclusion protects, made checkable.

| # | Invariant | Source | Measured today | How it breaks |
|---|---|---|---|---|
| **I1** | The hero numeral is set in `--text-numeral` — `clamp(2.5rem, 20cqi, 6rem)`, `--font-weight-bold` (700), line-height 1.05, tracking −0.02em — per-value overridden by `--hero-value-size` at `hero-panel.tsx:52`. **The only step allowed above 2rem.** | `DESIGN.md` § Typography → Hierarchy; `app/globals.css:13-16` | 96px/144px on `/` at 390 and 1440; 87.36px/131px default on `/custo-da-hora` at 390 | A remedy that server-renders a fixed `font-size` to avoid a container-query relayout would take the numeral off the ramp and overflow at 390. |
| **I2** | The numeral carries the `numeric` utility — `font-variant-numeric: tabular-nums slashed-zero`. | `DESIGN.md` § Typography → **The Tabular Rule**; `hero-panel.tsx:48` | `computedStyle.fontVariantNumeric === "tabular-nums slashed-zero"` on **both** values of the swap, both routes, both themes, 8/8 cells | Splitting the numeral into per-glyph spans to "stabilise" it, or dropping the class on a server-rendered variant, loses column alignment and the slashed zero — the two properties `0002` bought the whole typeface for (lesson **005**). |
| **I3** | The hero's fill and ink are **theme-invariant**: `--color-positive-deep`, `--color-negative-deep`, `--color-accent` under `--color-ink-onfill`. | `DESIGN.md` § Hero panel; `app/globals.css:126,131,115,109` | identical `lab()` in dark and light, 8/8 cells | Any `dark:` twin on the hero is a sign the token was abandoned (`DESIGN.md` § Don't). |
| **I4** | The `@container` on the hero's value block, and the container-query sizing that depends on an **ancestor's** layout. | `hero-panel.tsx:46`; `DESIGN.md` § Typography | container inline size 294px @390, 418.7px @1440, **285.3px @1024**, 621px @2560 and @3840 | Moving the numeral out of the `@container`, or inlining it into the server response without its ancestor, un-sizes it. **1024 is the tightest hero container in the whole range — tighter than the phone** (285.3 < 294px), because the 7/5 split lands before the container has grown. Any remedy touching the split must re-check 1024, not only 390. |
| **I5** | The panel's only declared transition is `transition-[background-color] duration-(--duration-slow) ease-standard` — the tone cross-fade, 320 ms, `cubic-bezier(0.4, 0, 0.2, 1)`. | `DESIGN.md` § Hero panel ("Tone changes cross-fade over `--duration-slow` (320ms), not 700ms"); `hero-panel.tsx:30` | present, and the numeral inherits **no** transition | Broadening it to `transition-all` would tween the numeral's `font-size` and break three named rules at once. |
| **I6** | The spacing around the numeral: panel `p-8 lg:p-12`, value block `space-y-4`, panel body `space-y-6 lg:space-y-8`, footer `pt-6 lg:pt-8` over a `border-ink-onfill/15` hairline. **All eight-step.** | `DESIGN.md` § Layout → **The Eight Steps Rule**; `hero-panel.tsx:30,33,46,59` | 32/48, 16, 24/32, 24/32 px at a 16px root | `0005` paid for the `--spacing-*` namespace lesson at the cost of a 64px-wide legal footer. **The `--spacing-*` namespace stays empty** (`DESIGN.md` § **The Numeric Scale Rule**); a remedy that adds a named spacing key silently redefines a container-scale entry and the damage surfaces in an unrelated component. |
| **I7** | The hero swap's own layout cost, at 390, per route and seeded state. **This is now a ceiling, not an observation.** | measured, `evidence/cls-early-shift.txt` | `/` **0.0000**; `/custo-da-hora` **0.0099** (`hour`), **0.0481** (`month`, 6/6), **0.0544** (`year`) | A remedy that raises any of these is a regression. A remedy that lowers them by reserving space is judged against §A.3, not automatically better. |
| **I8** | `AlertBanner`'s horizontal chrome spends **≤32 CSS px** of border + padding, and the 18px root cap at 2560 is what keeps it there — 26px at 16px root, **29px at 18px**, a **3px margin**. `0006` wrote this down at cost. | `DESIGN.md` § Layout → *The 18px cap is load-bearing*; § Alerts | not re-measured this run — `tests/e2e/wide-viewport.spec.ts` samples 2560 and 3840 | **No remedy may add a fourth root-size step above 18px.** It would put the alert atom over its budget without anyone editing the atom, and no check in this spec would see it. This is the invariant most likely to be broken by accident, because a performance change that touches `html { font-size }` looks unrelated to an alert banner. |

### B.2 The layout at the four reference widths — what reflows, what never moves

Measured at all eleven widths in `evidence/hero-width-sweep.txt`. **No horizontal overflow and no
control outside the viewport at any of them**, in the restored state, with the longest value the
product can produce.

| | **390** | **1440** | **2560** | **3840** |
|---|---|---|---|---|
| Columns | 1, **hero first in DOM and on screen** (`order-first`) | 12 → 7/5, hero right, sticky at `calc(var(--header-height) + var(--spacing)*8)` | same 7/5 | same 7/5 |
| Root | 16px | 16px | 18px | 18px |
| Container | full width − `px-4` | `--container-app` 80rem = 1280px, gutter `px-8` | `--container-app` 100rem = **1800px**, gutter 36px | **1800px**, gutter 36px, extra width becomes margin |
| Hero `@container` inline size | **294px** | **418.7px** | **621px** | **621px** |
| Numeral, `R$ 0,00` | 87.36px | 96px (clamp ceiling) | 108px (ceiling × 18px root) | 108px |
| Numeral, `R$ 3.807,40` | 55.59px | 79.17px | 108px | 108px |
| Swap reflow | −47.6px | −25.2px | **0px** (both clamp at the ceiling) | **0px** |
| What never moves | the hero's position in DOM order; the numeral's centre alignment; the eyebrow, badge and footer | the sticky offset; the 7/5 ratio | the composition — **scale, don't reflow** | the composition; **no new column, panel or revealed content** |

**The Answer-First Rule holds at every width under 1024** and is not negotiable by any remedy: the
hero is `order-first` at `calculator-layout.tsx:19`. A remedy that defers, streams, or
`Suspense`-wraps the hero to move it later in the document order breaks it, and `spec.md` § Non-goals
already forbids the mechanism.

**Above 1920 the ruling in §A.3 becomes moot**: the numeral clamps at its ceiling on both values, the
swap costs zero pixels, and the whole question is a ≤1440 phenomenon. That is the correct outcome and
is another reason not to spend a treatment on it.

---

## §C — Finding B: the OG images are mine, the URLs are not

### C.1 The images, rendered and looked at

I fetched both PNGs from the deployed head and viewed them, rather than reading `lib/og-image.tsx`
and inferring (lesson **031**):

```
curl -s -o og-root.png        $H1/opengraph-image                 → PNG 1200x630 RGBA
curl -s -o og-custo-da-hora.png $H1/custo-da-hora/opengraph-image → PNG 1200x630 RGBA
```

Both are correct, and **they are two different cards**, each carrying its own route's headline:

| | `/` | `/custo-da-hora` |
|---|---|---|
| Mark | 72px `#2a62d1` tile, `--radius-lg`-equivalent 20px, white `W` | same |
| Wordmark | `WorkLoad`, 40px/600, `#f2f3f6` | same |
| Headline | *"Jornada de trabalho, horas extras e saldo do dia"*, 68px/700, 2 lines | *"Valor da hora e salário líquido CLT"*, 68px/700, 2 lines |
| Subtitle | 32px/400, `#a6abb5`, 2 lines | 32px/400, 1 line |
| Footer | `workload.devrma.com`, 28px/600, `#2a62d1` | same |
| Canvas | `#0f1116` | same |

**Verdict: nothing about the images changes.** Three specific confirmations:

1. **The `salary` branch is live, not dead.** `renderOgImage("salary")` is called from
   `app/custo-da-hora/opengraph-image.tsx:8` and `app/custo-da-hora/twitter-image.tsx:8`. The card I
   rendered proves it reaches the wire.
2. **The `alt` strings are per-route and correct** — the `/custo-da-hora` pair carries
   *"WorkLoad: Calculadora de valor da hora e salário líquido CLT"*, not the root's. So a fix that
   collapses the four files into two would *lose* correct content.
3. **The image already asserts the right origin.** The footer line is the literal string
   `workload.devrma.com`, baked into the PNG. The picture is right; only the `content` attribute of
   the `<meta>` pointing at the picture is wrong. That is the whole of Finding B, and it is a
   metadata defect with **zero visual surface**. `legal.md` §6 binds the fix to changing the host and
   nothing else; I add nothing to that.

### C.2 `spec.md` C3's mechanism is refuted — and this changes the fix

> `spec.md` C3: *"There is no `app/custo-da-hora/opengraph-image.tsx`, but Next's file convention is
> inherited, so `/custo-da-hora` emits its own pair…"*

Both halves of the mechanism are false:

```
$ find app -name '*.tsx' | sort
app/custo-da-hora/opengraph-image.tsx     ← exists
app/custo-da-hora/page.tsx
app/custo-da-hora/twitter-image.tsx       ← exists
app/layout.tsx
app/opengraph-image.tsx
app/page.tsx
app/twitter-image.tsx

$ git log --oneline -3 -- app/custo-da-hora/opengraph-image.tsx
1b86421 fix(product): retire the "banco de horas" claim
16097c3 feat: make the pages shareable and legible to crawlers
```

There are **four files**, committed since `16097c3`. `/custo-da-hora` does not inherit anything.

C3's *conclusion* — four wrong URLs, not two — survives, and AC6's whole-boundary search is the right
criterion. But the mechanism matters to whoever fixes it: **an agent who believes in inheritance
edits `app/opengraph-image.tsx` and `app/twitter-image.tsx`, verifies `/`, and ships with
`/custo-da-hora` still broken.** Routed to `tech-lead` as finding **D3**.

### C.3 Two non-blocking notes on the images, for a future spec

Neither is in this spec's scope, neither changes now, and I am **not** proposing either as work here.
Recorded so they are not rediscovered:

- **The accent as text on the dark canvas measures 3.42:1.** `#2a62d1` on `#0f1116`. It passes AA
  only under the large-text rule (28px ≥ 24px → 3:1 floor) and has no margin. In the app itself this
  role is filled by `--color-accent-ink` (`#91b6f9` in dark) precisely because `--color-accent` is
  too dark to be body text on a dark surface. The OG module uses the wrong role token for its
  canvas. The subtitle `#a6abb5` on `#0f1116` measures **8.26:1** and the headline `#f2f3f6`
  measures **≈16:1**; both are fine.
- **The card is not in the product's type voice.** `lib/og-image.tsx:34` sets
  `fontFamily: "sans-serif"` — Satori cannot read the `next/font` CSS variable, so the card renders
  in the renderer's default face, not Atkinson Hyperlegible Next. Correcting it means shipping the
  woff2 into the `ImageResponse`, which has a cost on a route nobody's LCP depends on. **Not worth
  it inside a performance spec**, and named here so the next person does not read the mismatch as an
  accident.

---

## §D — X2 (`hero-panel.tsx:44`, no accessible name)

**It does not interact with anything I propose, because I propose nothing.** Owner stays
`web-standards-auditor` (`legal.md` §8.2), non-blocking, and I do not claim it.

What I will say, as the owner of the surface, is that the fix is **compatible with and slightly
easier than** the status quo, and that it has exactly one design constraint:

| Question | Answer |
|---|---|
| Would a treatment I propose conflict? | No. Every treatment I considered in §A.3 is rejected. The element keeps its current DOM shape. |
| Does naming the region add an announcement? | No. An accessible name is announced as *context* for the live-region change, not as a second change. **LR5.1's "exactly one announcement per load" is preserved.** A name turns *"18:48"* into *"Saída Prevista, 18:48"* — same count, more meaning. |
| Is there a design constraint on the fix? | **One.** The label the name is drawn from is the `<span class="text-overline uppercase">` at `hero-panel.tsx:37`. On `/` that string **itself changes at hydration** (`Saída Prevista` → `Saída Real`, measured, `evidence/hero-label-swap.txt`). So the association must be `aria-labelledby` pointing at that span's `id` — a **live** reference that re-reads the current label — and **not** a copied `aria-label` string, which would freeze the pre-hydration label and announce *"Saída Prevista, 19:10"* to a manual-exit user. That is a wrong statement about the user's day, made by an accessibility fix. |
| Anything else? | The fix must not add `aria-atomic`, must not change `aria-live="polite"` to `assertive` or `role="status"`, and must not wrap the numeral in a new element inside the `@container` — the last would re-parent the container-query reference and change the numeral's size (invariant **I4**). |

---

## Component tree

Nothing is added, nothing is extended, nothing is removed. Every element in scope already exists at
the right atomic level. The table is the reference a developer checks the diff against.

| Component | Level | Status | Path |
|---|---|---|---|
| `HeroPanel` | **organism** | **reuse, unchanged** | `components/organisms/hero-panel.tsx` |
| `ProgressRing` | atom | reuse, unchanged | `components/atoms/progress-ring.tsx` |
| `PeriodSelector` | molecule | reuse, unchanged | `components/molecules/period-selector.tsx` |
| `CopyButton` | molecule | reuse, unchanged | `components/molecules/copy-button.tsx` |
| `WorkCalculator` (hero call site, `:213`) | organism | reuse, unchanged | `components/organisms/work-calculator.tsx` |
| `SalaryCalculator` (hero call site, `:222`) | organism | reuse, unchanged | `components/organisms/salary-calculator.tsx` |
| `CalculatorLayout` | template | reuse, unchanged | `components/templates/calculator-layout.tsx` |
| `AppHeader` | organism | reuse, unchanged | `components/organisms/app-header.tsx` |
| `DaySummary`, `JourneyForm`, `TaxDetailsPanel` | organisms | reuse, unchanged | `components/organisms/` |
| OG card renderer | — (not a component; a `next/og` `ImageResponse`) | reuse, unchanged | `lib/og-image.tsx` |

**Documentation drift, non-blocking:** `DESIGN.md` § Components names the hero
`components/molecules/hero-panel.tsx`. It ships at `components/organisms/hero-panel.tsx`. The file is
right and the document is stale. Routed as finding **D4** — a one-line `DESIGN.md` correction for
`release-manager` at G7, not a code move. Moving the file to match the document would be a
zero-value rename inside a performance spec.

---

## Tokens

Every value on the surfaces this spec touches, by its **exact token name from `app/globals.css`**, in
both themes. No hex, no arbitrary value, no addition. Where a value is theme-invariant that is stated
and was measured, not assumed.

### Hero panel — `components/organisms/hero-panel.tsx`

| Element | Property | Token | Dark | Light |
|---|---|---|---|---|
| Panel (on track) | background | `--color-positive-deep` | `oklch(0.425 0.108 152)` | **same — theme-invariant** |
| Panel (in debt) | background | `--color-negative-deep` | `oklch(0.445 0.165 25)` | **same — theme-invariant** |
| Panel (salary) | background | `--color-accent` | `oklch(0.525 0.182 262)` | same |
| Panel | radius | `--radius-2xl` (2rem) | same | same |
| Panel | padding | `p-8` → `lg:p-12` (`--spacing`×8 / ×12) | same | same |
| Panel | elevation | `--shadow-accent` | same | same |
| Panel | tone transition | `--duration-slow` + `--ease-standard` | same | same |
| Panel body | vertical rhythm | `space-y-6` → `lg:space-y-8` | same | same |
| Eyebrow icon | size / stroke | 24px / 1.75 (`DESIGN.md` § Iconography) | `currentColor` | `currentColor` |
| Eyebrow icon → label | gap | `gap-3` (`--spacing`×3) | same | same |
| Eyebrow label | type | `--text-overline` (0.6875rem/600/1.25/+0.07em, uppercase) | `--color-ink-onfill` | same |
| Badge (`/`) | background | `--color-ink-onfill` @ 20% | same | same |
| Badge | type / radius / padding | `--text-caption` + `--font-weight-semibold` + `numeric` / `--radius-full` / `px-3 py-1` | `--color-ink-onfill` | same |
| Value block | container | `@container`, `space-y-4`, centred | — | — |
| **Numeral** | type | `--text-numeral`, per-value `--hero-value-size` | `--color-ink-onfill` | **same — theme-invariant** |
| **Numeral** | figures | `numeric` utility → `tabular-nums slashed-zero` | same | same |
| Numeral, statement mode (no digit) | type | `--text-title`, `text-balance`, **no** `numeric` | `--color-ink-onfill` | same |
| Ring track | stroke | `--color-ink-onfill` @ 20% | same | same |
| Ring worked arc | stroke | `--color-ink-onfill` | same | same |
| Ring overtime arc | stroke | `--color-overtime-arc` | `oklch(0.88 0.145 70)` | **same — theme-invariant** |
| Ring sweep | motion | `--duration-data` + `--ease-out` | same | same |
| Ring status overline | type / colour | `--text-overline` / `--color-ink-onfill` @ 90% | same | same |
| Ring status figure | type | `--text-metric` + `numeric` | `--color-ink-onfill` | same |
| Supporting line (`/custo-da-hora`) | type / colour | `--text-body` + `--font-weight-medium` / `--color-ink-onfill` @ 90% | same | same |
| Footer rule | border | `--color-ink-onfill` @ 15%, 1px | same | same |
| Footer | padding-top | `pt-6` → `lg:pt-8` | same | same |
| Footer figures | type | `--text-caption`/`--text-heading` + `--font-weight-semibold` + `numeric` | `--color-ink-onfill` | same |

### `PeriodSelector` — `components/molecules/period-selector.tsx`

| Element | Property | Token | Dark | Light |
|---|---|---|---|---|
| Track | background / radius | `--color-scrim` @ 25% / `--radius-lg` | theme-invariant | theme-invariant |
| Option, rest | type / colour / radius / height | `--text-label` / `--color-ink-onfill` / `--radius-sm` / `min-h-11` (44px) | same | same |
| Option, selected | background / colour / elevation | `--color-surface` / `--color-accent-ink` / `--shadow-press` | `#181b21` / `#91b6f9` | `#ffffff` / `#1f57c7` |
| Option | transition | `--duration-fast` + `--ease-standard`, `transition-colors` only | same | same |

### `CopyButton` — `components/molecules/copy-button.tsx`

| Element | Property | Token | Dark | Light |
|---|---|---|---|---|
| Button | size / radius / background | 44×44 (`h-11 w-11`) / `--radius-full` / `--color-ink-onfill` @ 10% | same | same |
| Icon | size / stroke | 20px / 2 | `currentColor` | `currentColor` |
| Status text | type | `--text-caption` + `--font-weight-semibold` | `--color-ink-onfill` | same |
| Button | transition | `--duration-fast` + `--ease-standard` | same | same |

### OG card — `lib/og-image.tsx` (a separate rendering context)

Satori cannot resolve CSS custom properties, so this module declares literal hexes. **That is
legitimate and is not a token violation** — it is a different renderer with no cascade. The hexes
mirror the dark-theme token values and are recorded here so the mirror can be checked:

| Role | Literal | Token it mirrors |
|---|---|---|
| canvas | `#0f1116` | `--color-canvas` (dark) |
| headline / wordmark | `#f2f3f6` | `--color-ink` (dark) |
| subtitle | `#a6abb5` | `--color-ink-muted` (dark) |
| mark fill, footer text | `#2a62d1` | `--color-accent` — **but see §C.3: as *text* on this canvas the app's role token is `--color-accent-ink`** |

---

## States

Every interactive element on the surfaces in scope, all eight states, focus-visible specified
explicitly. **This table is the frozen reference: a remedy that changes any cell is a regression**,
and it is what a reviewer diffs against.

### Hero numeral — `hero-panel.tsx:44`

Not interactive; listed because the spec's whole question is about its states.

| State | Treatment |
|---|---|
| rest | `--text-numeral` at `--hero-value-size`, `--color-ink-onfill`, `numeric`, `whitespace-nowrap`, centred |
| **live-updating (typing)** | text replaced synchronously on the same frame as the keystroke; size re-derived from the new length; **no transition, no tween, no highlight** |
| **hydration swap** | identical to "live-updating", with no keystroke. One frame. §A |
| empty / no digit | falls to `--text-title`, `text-balance`, up to 2 lines, **without** `numeric` — the statement mode for a legally bound sentence (`0005` legal.md S6) |
| loading | **does not exist and must not be created.** The value is server-rendered; there is no loading state to represent |
| error | **does not exist here.** An unusable input is named by `AlertBanner` in the form column, per `DESIGN.md` **The Error Has Words Rule** — never by degrading the numeral |
| hover / focus-visible / active / disabled | n/a — not focusable, not a control, carries no `tabindex` |

### `PeriodSelector` option (radio in a `<label>`, `/custo-da-hora` hero)

| State | Treatment |
|---|---|
| rest | `--text-label`, `--color-ink-onfill`, transparent, `--radius-sm`, `min-h-11` = 44px |
| hover | `--color-ink-onfill` @ 10% fill, over `--duration-fast`/`--ease-standard` |
| **focus-visible** | `has-focus-visible:outline-2 outline-offset-2` in `--color-ink-onfill` — **≥3:1 against all three hero fills** (white on `--color-positive-deep` 7.92:1, on `--color-negative-deep` 8.28:1, on `--color-accent` 5.57:1). Driven by `:has()` on the wrapping label because the `<input>` is `sr-only`; the ring must never be removed without replacement (`DESIGN.md` **The Ring Is Never Optional Rule**) |
| active (selected) | `--color-surface` fill, `--color-accent-ink` text, `--shadow-press`; hover is suppressed while selected (`has-checked:hover:bg-surface`) so the selection does not flicker under a stationary pointer |
| pressed | no scale transform; colour only |
| disabled | **does not exist** — all five periods are always available |
| loading | **does not exist** — the conversion is synchronous arithmetic in `lib/salary-period.ts` |
| empty | with no salary entered the control still renders and still switches; the numeral reads `R$ 0,00` beside the disclosure named below |
| error | n/a — a radio group with five valid options has no invalid state |

### `CopyButton` (`/` hero footer)

| State | Treatment |
|---|---|
| rest | 44×44, `--radius-full`, `--color-ink-onfill` @ 10%, `IconCopy` 20px |
| hover | fill to `--color-ink-onfill` @ 20% over `--duration-fast`/`--ease-standard` |
| **focus-visible** | `outline-2 outline-offset-2` in `--color-ink-onfill` — same ≥3:1 measurements as above |
| active | `active:scale-[0.97]`, paired with `motion-reduce:active:scale-100` **in the same state**, so the neutralizer wins on specificity (`AGENTS.md` §8) |
| disabled | **does not exist**; a missing Clipboard API resolves to the `failed` state instead, which says so in words |
| loading | the `await navigator.clipboard.writeText` window; **no spinner** — the button is unchanged and the outcome is announced when it arrives |
| error (`failed`) | `role="status"` sibling carries the worded message for 4,000 ms; icon unchanged |
| success (`copied`) | icon swaps to `IconCheck`, worded message for 2,000 ms, then `empty:hidden` collapses the slot |
| empty | `empty:hidden` on the status span — zero reserved space when idle |

### Header clock, hero badge, ring `statusTime` (the three pre-hydration placeholders)

| State | Treatment |
|---|---|
| pre-hydration | `--:--:--`, `aria-hidden`, at their final type step and final box — **the placeholder is the same width as the value it becomes**, which is what keeps `/`'s swap at 0.0000 CLS |
| hydrated | live value, same box |
| all others | n/a — none is interactive |

`legal.md` §4.3 permits a remedy to change when these paint, to server-render them, or to leave them
alone. My constraint is only the one above: **whatever replaces them must occupy the same box.**

---

## Motion

Nothing is added. Every row is the shipped behaviour, frozen. **The spec's central question — the
hydration swap — is the first row, and its answer is "no motion, and none may be added."**

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion behaviour |
|---|---|---|---|---|---|---|
| **Hero numeral** | **hydration swap / keystroke** | **none** | **0 ms** | **none** | **0 ms** | **Identical — there is nothing to reduce.** This is the one row that is already correct under `prefers-reduced-motion` by construction, and the strongest argument against adding a treatment: any fade or shimmer would need a reduced path, and the reduced path would be *exactly the current behaviour*. Building a treatment whose accessible fallback is the status quo is building nothing, twice. |
| Hero panel fill | `tone` prop changes (on track ⇄ in debt) | `background-color` | `--duration-slow` (320 ms) | `--ease-standard` | 0 | Kept. The scoped reset clamps `transition-property` to `opacity, color, background-color, border-color, outline-color` and shortens the duration to `--duration-fast` (160 ms). A colour cross-fade explains that a state changed and carries no vestibular motion (`DESIGN.md` § Motion → *Reduced motion*). |
| Progress ring arc | `progressPercent` / `overtimePercent` change | `stroke-dashoffset` | `--duration-data` (600 ms) | `--ease-out` | 0 | **Jumps straight to its value**, gated by `useReducedMotion` in JS — not by the CSS reset, which a JS-driven attribute never passes through. |
| `PeriodSelector` option | hover / selection | `background-color`, `color` | `--duration-fast` (160 ms) | `--ease-standard` | 0 | Kept — colour only, inside the scoped reset's allow-list. |
| `CopyButton` | hover | `background-color` | `--duration-fast` | `--ease-standard` | 0 | Kept. |
| `CopyButton` | `:active` | `transform: scale(0.97)` | `--duration-fast` | `--ease-standard` | 0 | **`motion-reduce:active:scale-100`** — the neutralizer is bound to the *same state* it fights. A bare `motion-reduce:transform-none` is specificity `0-1-0` and loses to `active:scale-[0.97]` (`0-2-0`) for as long as the finger is down (`AGENTS.md` §8). Already correct at `copy-button.tsx:62`. |
| Header clock, hero badge, ring `statusTime` | per-second tick | **none** | 0 | — | — | Identical. `DESIGN.md` § Motion: "The live clock and the countdown… A transition on a per-second value is a strobe." |
| Hero panel mount | page load | **none** | 0 | — | — | Identical. The mount fade is **gone** — `0002` removed it, and its survival on `origin/main` (`opacity:0;transform:translateY(20px) scale(0.98)`) is `spec.md` C2's explanation for production's numbers. **A remedy that reintroduces any mount animation on the hero makes the numeral a non-LCP-candidate and re-creates the exact defect this spec exists to fix.** This is the single most important motion constraint in the file. |

### The motion prohibition, stated as a rule a reviewer can apply

> **No element on the hero's paint path may acquire an enter animation, a mount transition, an
> `initial`/`animate` pair, an `AnimatePresence` wrapper, or any declared `opacity` or `transform`
> below its resting value — in the server response or after it.**

`spec.md` AC3 already asserts the server-response half (`opacity: 0`, `visibility: hidden`,
`content-visibility: hidden`). This rule extends it to the client half, because a `motion` component
that starts at `opacity: 0` and animates in produces exactly the server HTML AC3 permits and exactly
the LCP defect AC1 forbids.

---

## Accessibility

### Roles and semantics — unchanged

| Element | Role / semantics |
|---|---|
| Hero panel | plain `<div>`; no landmark, no heading — it carries no accessible name of its own and should not gain a `region` role that would add an unnamed landmark |
| Eyebrow label | `<span>`, `--text-overline`, uppercase by CSS (not by the string) |
| **Hero numeral** | `<p aria-live="polite">`; **no accessible name today — this is X2**, owner `web-standards-auditor`, constraint in §D |
| Hero badge (`/`) | `<span aria-hidden="true">` — the wall clock, deliberately not announced (`DESIGN.md` § Accessibility: "A screen reader announcing the time every second is an attack, not a feature") |
| Progress ring | wrapped in `<div aria-hidden="true">`, with `<p class="sr-only" aria-live="polite" aria-atomic="true">` beside it carrying the same figure in words — the pattern `legal.md` §4.2 rules is correct and that discharges LR3 |
| `PeriodSelector` | `<fieldset>` + `sr-only` `<legend>` + five `<input type="radio">` in `<label>`s; the inputs are `sr-only`, the visible chrome is the label |
| `CopyButton` | `<button type="button">` with `aria-label` + `title`; status in a sibling `role="status"` |
| Icons | all `aria-hidden="true"` (`DESIGN.md` § Iconography) |

### Tab order

DOM order, unchanged, and at **390 the hero comes first** (`order-first`), so the answer is also the
first thing a keyboard user reaches:

`/` → skip link → header (logo, theme toggle) → **hero: `CopyButton`** → journey form fields → day
summary controls → tab bar.
`/custo-da-hora` → skip link → header → **hero: `PeriodSelector` (5 radios, one tab stop, arrow keys
within)** → salary fields → regime field → tax details disclosure → tab bar.

A remedy that changes when the hero hydrates must not change when it becomes focusable. A hero that
is present but inert until hydration is a regression of the Answer-First Rule in the keyboard
modality.

### Contrast — every text-on-surface pair on this surface, both themes

Computed in this session from the token values in `app/globals.css` (sRGB relative luminance, WCAG
2.2). The hero fills and `--color-ink-onfill` are **theme-invariant**, so each pair has one ratio,
not two — verified by measurement, not assumed (§A.4).

| Pair | Ratio | AA text (4.5:1) | AA large (3:1) | AA non-text (3:1) |
|---|---|---|---|---|
| `--color-ink-onfill` on `--color-positive-deep` | **7.92:1** | ✅ | ✅ | ✅ |
| `--color-ink-onfill` on `--color-negative-deep` | **8.28:1** | ✅ | ✅ | ✅ |
| `--color-ink-onfill` on `--color-accent` | **5.57:1** | ✅ | ✅ | ✅ |
| `--color-ink-onfill` @ 90% on `--color-accent` (supporting line, ring overline) | **4.85:1** (`DESIGN.md` § Hero panel) | ✅ | ✅ | — |
| `--color-ink-onfill` @ 90% on `--color-positive-deep` | **6.75:1** (`DESIGN.md` § Hero panel) | ✅ | ✅ | — |
| `--color-overtime-arc` on `--color-positive-deep` (graphical) | **5.07:1** (`DESIGN.md` § Progress ring) | — | — | ✅ |
| `--color-overtime-arc` on `--color-negative-deep` (graphical) | **5.31:1** | — | — | ✅ |
| `--color-overtime-arc` on `--color-ink-onfill` @ 20% track | **3.12:1 / 3.55:1** | — | — | ✅ |
| **Focus ring** `--color-ink-onfill` on each of the three fills | **7.92 / 8.28 / 5.57:1** | — | — | ✅ |
| `PeriodSelector` selected: `--color-accent-ink` on `--color-surface`, **dark** | `#91b6f9` on `#181b21` = **8.30:1** | ✅ | ✅ | — |
| `PeriodSelector` selected: `--color-accent-ink` on `--color-surface`, **light** | `#1f57c7` on `#ffffff` = **6.83:1** | ✅ | ✅ | — |

**Both themes clear AA on every pair.** The remedy may not change a colour on this path; if it does,
every ratio above is re-measured before G6.

### Live regions — the behaviour during the swap

This is the accessibility half of §A's ruling, and it is the reason a treatment would be actively
harmful rather than merely useless:

- The numeral's `<p aria-live="polite">` announces **once** per load, when the value changes from
  the default to the restored one. Measured: exactly two distinct values, one transition, 4/4 loads
  per route (`legal.md` E-L1) and 3/3 or 6/6 per case in my own runs. **This satisfies LR5.1.**
- The ring's `sr-only aria-live="polite" aria-atomic="true"` announces the balance/overtime sentence
  in the same render as its visual counterpart — the pattern that discharges LR3 for an
  `aria-hidden` figure (`legal.md` §4.2).
- **Every treatment rejected in §A.3 would add announcements.** A skeleton is a third rendered
  value → LR5.1 fails. A "carregando…" string is a fourth. A dimmed numeral that later brightens is
  two more `aria-live` mutations if implemented by swapping text, or a silent visual-only change —
  which is worse, because it tells the sighted user something the screen-reader user is not told, and
  that is the per-modality failure `0005` LR3 exists to prevent.
- **A remedy must not raise the transition count above two, and must not make any of them
  `assertive`.** That is `legal.md` LR5.1 restated as a design constraint, and I adopt it.

### Targets and zoom

44×44 minimum holds on both hero controls (`min-h-11` on the period options, `h-11 w-11` on the copy
button), with ≥8px between adjacent targets. No horizontal scroll and no clipped control at **320px**
with the longest value the product produces — measured, `evidence/hero-width-sweep.txt`, first row.

---

## Copy slots

**No `content-writer` is running on this spec and no user-visible string changes.** `legal.md` §2
answers O1 `no`; there is no disclosure to word and no caveat to lay out. `spec.md` § Out of scope
forbids changing what either calculator displays.

The table therefore records the **existing** slots on the surfaces in scope, with the character
budget each must stay inside at 390px, so that a future writer does not have to re-derive them and a
developer can reject an over-long string without asking. Budgets are derived from the measured
container inline size of **294px** at 390 (and the tighter **285.3px** at 1024, which is the real
worst case — invariant I4).

| Slot | Role | Type step | Max chars at 390 | Derivation |
|---|---|---|---|---|
| Hero eyebrow (`Saída Prevista` / `Saída Real` / `Valor por <Período>`) | names what the numeral is | `--text-overline` | **24** | shares one row with a 24px icon, a `gap-3` and the badge; measured longest today `Valor por Semana` = 16 |
| **Hero numeral** | the answer | `--text-numeral` | **14 before the numeral drops below 3rem at 390** | `--hero-value-size` = `208/len` cqi × 2.94px; at len 14 → 47.04px ≈ 2.94rem. Longest producible today: `R$ 115.600,68` = 13. **A format change that adds a character shrinks the answer** — this is the budget that actually binds, and it is the one nobody sees in a diff |
| Hero numeral, statement mode | a legally bound sentence in place of a figure | `--text-title` | **44** (2 lines × ~22ch at 24px in 294px) | `text-balance`, wraps to at most 2 lines |
| Hero badge (`/`) | the wall clock | `--text-caption` + `numeric` | **8** | `--:--:--` / `HH:MM:SS`, fixed by format |
| Ring status overline | names the timer | `--text-overline` | **18** | fits the ring's inner diameter |
| Ring status figure | the timer | `--text-metric` + `numeric` | **12** | `+HH:MM:SS` / `+1h 00m` |
| Ring `sr-only` announcement | the same figure in words | n/a (not rendered) | — | must carry the figure, not replace it (`legal.md` §4.2) |
| Supporting line (`/custo-da-hora`) | the rate behind the numeral | `--text-body` + `--font-weight-medium` | **72** (2 lines) | 16px in 294px ≈ 36ch/line |
| Hero footer labels | entry time, gross, extras | `--text-caption` / `--text-overline` | **20** each, 2-up grid | `grid-cols-2 gap-4` inside 294px |
| `PeriodSelector` option | the period | `--text-label` | **7** | **five** options across 294px minus `p-1.5` and 4× `gap-1` → ~53px per cell; longest today `Semana` = 6. **A six-character-plus label added here breaks the row** |
| `CopyButton` `aria-label` / `title` | names the action | n/a | — | not visible; no budget |
| `CopyButton` status | copy outcome | `--text-caption` + `--font-weight-semibold` | **24** | shares the footer row with a 44px button |
| OG headline | the card's claim | 68px in a 1040px content box | **~52** (2 lines) | longest today = 49 |
| OG subtitle | the card's second line | 32px | **~110** (2 lines) | longest today = 74 |

**Rule for whoever fills these next:** the numeral slot's budget is a *type-size* budget, not an
overflow budget. Exceeding it does not break the layout — the numeral silently gets smaller, which is
worse, because nothing fails and the answer just becomes harder to read at arm's length in a badly
lit corridor.

---

## Disclosure placement

`legal.md` **passes** and adds **nothing to any screen** (§3: *"It adds no string, no caveat and no
pixel"*). So there is no new disclosure to place. What this section does instead is prove that every
disclosure already bound to this path keeps its place, because `spec.md` § Disclosure obligations
item 3 makes "no disclosure now renders after the figure it qualifies" a G6 check — and a layout
decision is the easiest way to break it.

| Obligation | Where it sits today | Visible next to its number? | Constraint on the remedy |
|---|---|---|---|
| **LR5** (`legal.md` §3) | nowhere — it is a condition on the state machine, not a string | n/a by design | Four clauses adopted verbatim as design constraints: exactly two values per load, the last one restored, no interaction required, nothing written to `localStorage` before restore. **LR5 explicitly does not authorise** a provisional mark, a dim, or a skeleton, and §A.3 rejects all three on design merit as well |
| **`R$ 0,00` on `/custo-da-hora`** — the zero is the absence of a figure, not a salary | `"Esse zero não é o seu salário, é a falta do dado."` in the **server** response (`legal.md` G2 decisions log, `0006` §2.3 C1) | ✅ in the initial HTML, beside the numeral | Must stay in the **server** response and must not be deferred, streamed, or moved below the fold. A remedy that server-renders the numeral but client-renders its qualifier inverts the whole point |
| **F2 — the table-year citation** (`CURRENT_LEGAL_YEAR`, `calculator-views.tsx:88-95`) | server-rendered today | ✅ | Guard: must not be deferred past the numeral it qualifies. It is below the fold at 390 by design (the answer comes first) — "visible next to its number" is satisfied by being in the same document at first paint, not by being in the hero |
| **The four footer disclosures** (`0005` LR1–LR3) | the legal footer, server-rendered, full-width column | ✅ | `0005` paid for that column's width with the `--spacing-*` namespace defect. **Invariant I6**: the namespace stays empty. A remedy that adds a named spacing key can render a legally required disclosure 64px wide while every check passes |
| **The ring's balance / overtime figures** under `aria-hidden` | discharged by the `sr-only` live announcement at `work-calculator.tsx:234`, same render | ✅ per-modality | Must land in the **same render** as the visual figure. A remedy that splits them across renders creates a window where a number is visible and not announced |

**Nothing in this design hides a disclosure behind a collapse, and nothing — no ad slot — sits where
a result appears.** `AdManager` renders below the fold on both routes and this spec does not move it
(`PRODUCT.md` §8).

---

## Findings routed to `tech-lead`

Four, all found by measuring in this session, none blocking this gate, none fixable by me.

### D1 — A reproducible 0.5452 CLS event on `/custo-da-hora` at 390, which is **not** the hero

**This is the one worth acting on.** Six loads per route, 390×844, dark, 4× CPU throttle, seeded
returning user (`evidence/cls-early-shift.txt`):

| Route | CLS per run | Attributed to |
|---|---|---|
| `/` | 0.0011 × 6/6 | the ring's `statusTime` placeholder resolving — same box, negligible |
| `/custo-da-hora` | **0.0481** × 5/6, **0.5933** × 1/6 | 0.0481 = the hero swap (§A.2, deterministic). The extra **0.5452** is a separate event at t=367 ms |

The 0.5452 event's `PerformanceObserver` sources, verbatim:

```
DIV.lg:col-span-7.space-y-8   prev=84,632  cur=595,249
BUTTON.flex.w-full.items-center prev=419,95  cur=0,0
DIV.relative                   prev=563,56  cur=0,0
svg.tabler-icon-briefcase.w-4  prev=394,16  cur=0,0
```

The form column loses **383px of height** and moves down **511px**; three of its children go to zero
size. The `briefcase` icon places it at `regime-field.tsx`. **I do not name the cause** — `spec.md`
O3 and lesson **032** both say the cause of what happens at this hydration boundary is `plan.md`'s
first deliverable, and a designer guessing at it is how the last three refuted premises got here.

What I assert is only what I measured: **there is a second, intermittent layout event on
`/custo-da-hora`'s critical path, 5× over the 0.1 "good" CLS threshold, in roughly 1 load in 6, on
the same hydration boundary this spec is already investigating.** It is not the hero, it is not in
`spec.md`, and the G4 attribution should look at it in the same pass. Reproduce with
`node .specs/0004-lcp-render-delay/evidence/cls-early-shift.mjs`.

### D2 — LR5's domain test returns more than the two surfaces `legal.md` enumerates

`legal.md` §3 defines the domain as *"every rendered string whose value is seeded from a module
default and later replaced by a value read from `localStorage` on the same page load"*, states that
the HS1/HS2 table is *"the test's output, never its definition"*, and says *"a gate that finds a
third one and does not add it has misread this section."*

I found a third and a fourth, by rendering the states (lesson **031**), not by reading source:

| | Surface | Module default | Restored from | Measured |
|---|---|---|---|---|
| **HS3** | the hero **eyebrow** on `/` — `hero-panel.tsx:37` | `isManualExit = false` → `Saída Prevista` (`use-work-calculator.ts:140`) | `isManualExit` (`:159`) → `Saída Real` | `evidence/hero-label-swap.txt`: `{"v":"17:48","label":"Saída Prevista"} → {"v":"19:10","label":"Saída Real"}`, 3/3 loads |
| **HS4** | the hero **eyebrow** on `/custo-da-hora` | `DEFAULT_PERIOD = "hour"` (`use-salary-calculator.ts:33`) → `Valor por Hora` | `salaryPeriod` (`:89`) → `Valor por Mês` / `Ano` / … | same file: `Valor por Hora → Valor por Mês` and `→ Valor por Ano`, 3/3 each |

HS4 matters more than it looks: when `period` is restored to `month`, the numeral changes **from an
hourly figure to a monthly one** — `R$ 0,00` → `R$ 3.807,40` — so the quantity being named changes at
the same instant as its name. LR5's stated quantity is `textContent` of the numeral only, so the
clauses as written do not read the label.

**This is `labor-law-analyst`'s table to amend, not mine.** Routed to `tech-lead` to decide whether
G2 re-opens. My design position is unchanged either way: the label and the numeral swap in the **same
frame** (measured — one sample, both fields changed together, 0 intermediate states), which is the
correct behaviour, and no treatment applies to it for the same reasons as §A.3.

### D3 — `spec.md` C3's mechanism is refuted; the fix must touch four files

See §C.2. `/custo-da-hora` has its own `opengraph-image.tsx` and `twitter-image.tsx`, committed since
`16097c3`. Not inheritance. A fix written against the inheritance premise verifies `/` and ships
`/custo-da-hora` broken — and AC5/AC6 would catch it, at the cost of a full G6 round.

### D4 — Documentation drift, two lines

- `DESIGN.md` § Components names `components/molecules/hero-panel.tsx`; it ships at
  `components/organisms/hero-panel.tsx`. The file is right; correct the document at G7.
- **The segmented-control track spacing is off the eight-step scale, in three places.**
  `period-selector.tsx:10`, `journey-form.tsx:102` and `calculator-views.tsx:43` all use
  `p-1.5` (6px) + `gap-1` (4px), and `period-selector.tsx:15` adds `px-1`. `DESIGN.md` § Layout →
  **The Eight Steps Rule** sanctions only `0.5, 2, 3, 4, 6, 8, 12, 16`. Three identical occurrences
  is an unwritten idiom, not three mistakes: a segmented track needs a hairline inset that `p-2`
  (8px) would over-spend at 44px option height.

  **I am not proposing a token and not proposing a fix here** — `p-1.5` and `gap-1` are Tailwind
  multiples of the existing `--spacing`, so no new token exists or is needed, and changing them
  changes the geometry of three controls inside a spec whose AC3 reads as zero visual diff. It is
  either a `DESIGN.md` amendment naming the track inset as a sanctioned ninth case, or a
  three-component correction. **Both are human approval points** (`AGENTS.md` §4) and both belong to
  a future spec.

---

## System change

**None.**

No new token. No new type step. No new spacing value. No new curve. No new duration. No change to
`DESIGN.md`'s tokens, ramp, scale, colour roles, elevation model or motion vocabulary. No
`DESIGN_VARIANCE` / `MOTION_INTENSITY` / `VISUAL_DENSITY` dial moves. **This gate raises no human
approval point of its own.**

Two things that would have been system changes, and were rejected rather than deferred:

1. **A `--duration-*` or state token for the hydration swap.** Rejected: the swap has no duration and
   must not acquire one (§A.3, and three named `DESIGN.md` rules).
2. **A spacing key for the segmented-control track inset.** Rejected here on two grounds — it is out
   of this spec's scope, and `DESIGN.md` § **The Numeric Scale Rule** makes any `--spacing-<name>`
   key a container-scale hazard that `0005` already paid for. Recorded as D4 for a future spec, never
   as a quiet addition.

---

## What a G6 reviewer checks against this file

1. `git diff` touches **no** file under `components/`, and **no** colour, type, spacing, radius,
   shadow, duration or easing value anywhere (§System change).
2. The eight invariants in §B hold, each against the measured value in its row.
3. `node .specs/0004-lcp-render-delay/evidence/hero-swap-geometry.mjs` returns two values per load,
   both themes, both routes, with `fontVariantNumeric === "tabular-nums slashed-zero"` on both.
4. `node .specs/0004-lcp-render-delay/evidence/cls-early-shift.mjs` returns a hero-attributed CLS no
   higher than **0.0000 / 0.0099 / 0.0481 / 0.0544** for the four seeded cases (invariant I7).
5. No element on the hero's paint path carries a mount animation, an `initial`/`animate` pair, or a
   resting `opacity`/`transform` below its settled value — in the server response **or** after it
   (§Motion).
6. Both OG cards still render their own route's headline and `alt`, and the only byte that changed
   is the host in four `<meta content>` values and their RSC copies (§C).
