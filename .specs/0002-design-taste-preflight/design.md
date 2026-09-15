# 0002 — design taste preflight

> Owner: product-designer · Gate: `design` · Run 1

**What this gate decides.** Six things, and nothing else: the Design Read, the three dial
values, the replacement typeface with its re-tuned ramp, the replacement icon library with a
one-for-one map, the viewport-unit fix, and the design-owned half of the LCP debt. Plus a
verdict on every box of the `design-taste-frontend` Section 14 matrix.

**What this gate does not touch.** No layout, no hierarchy, no colour, no spacing, no new
component, no new state, no new animation, no string. `spec.md` § Out of scope forbids a
redesign, and everything below either changes a token's *value*, swaps a rendering library
for an equivalent one, or deletes something that sits between the user and the answer.

Every pt-BR string named here is a **slot**. `content-writer` fills it at G4 against
`legal.md` S1 to S10. This document never writes one.

---

## 0. Intent — what the eye does in the first two seconds at 390px

Unchanged by this spec, and restated because every decision below is measured against it:

1. **0 to 0.5s** — the cobalt/green/red hero plane, and inside it the one number in
   `--text-numeral`. On `/` that is the exit time or the countdown. Nothing else on the
   screen is that large, that saturated, or that high.
2. **0.5s to 1.2s** — the `--text-overline` eyebrow above the number, which says what the
   number *is*, and the progress ring beside it, which says how far through the day it is.
3. **1.2s to 2s** — the first card below the fold edge: the journey form, starting at the
   entrada field.

The three changes in this spec are judged by whether step 1 arrives sooner (the font swap
and the entry-animation removal) and whether the digits inside it can be misread (the
figure constraint). Nothing else is allowed to move.

---

## 1. Design Read and dials (Section 0.B and Section 1)

Both boxes were never declared. They are declared here and recorded in `DESIGN.md`. This is
the **documentation half** of the spec: it serves the next design gate, not the user, and
`spec.md` says so in its own honesty table.

### 1.1 The Design Read

> **Reading this as:** a single-purpose pt-BR calculator for a CLT worker holding a phone
> one-handed at a time clock, with a trust-first instrument language, leaning toward
> Tailwind v4 CSS-first tokens, a hyperlegible sans with real tabular figures, and motion
> that only ever confirms a state change.

Derived from the Section 0.A signals, each named so the next agent can check the derivation
instead of re-running it:

| 0.A signal | What this product answers with | Source |
|---|---|---|
| Page kind | Not a landing page. A **tool**, redesigned once (spec 0001) and now in preserve mode. | `PRODUCT.md` §1, §6 |
| Vibe words | "Honest instrument", "gauge you glance at", "caliper, altimeter, Braun stopwatch". | `DESIGN.md` Overview |
| Reference signals | None external. The stated anti-reference is the predecessor system: six accent hues, blurred gradient field, `font-black`, 700ms crossfade. | `DESIGN.md` Overview |
| Audience | A worker standing at a time clock, on mobile data, wanting an answer in under ten seconds. Not a design-conscious consumer, not a procurement panel. | `PRODUCT.md` §1, §3 |
| Brand assets | Already exist and are binding: the cobalt mark, the four data hues, the eleven-step ramp, the eight-step spacing scale. | `DESIGN.md` frontmatter |
| Quiet constraints | Accessibility-critical (WCAG 2.2 AA in both themes, enforced by axe and Playwright), legally bound copy, pt-BR only, offline. These **override aesthetic preference**, which is exactly what Section 0.A.6 says. | `PRODUCT.md` §7, §10; `AGENTS.md` |

### 1.2 The dials

**Declared values: `DESIGN_VARIANCE: 3` · `MOTION_INTENSITY: 2` · `VISUAL_DENSITY: 5`.**

The baseline is `8 / 6 / 4`. Taking it silently would have been wrong on all three counts.
The Section 1.A row that produces these is **"trust-first / public-sector / regulated /
accessibility-critical" → 3-4 / 2-3 / 4-5**, and the Section 1.B preset that corroborates it
is **"Public-sector service" → 3 / 2 / 5**. The second applicable row is **"redesign -
preserve" → match existing, motion +1, match existing**.

| Dial | Value | Reasoned from |
|---|---|---|
| `DESIGN_VARIANCE` | **3** | Section 1.A row "trust-first / accessibility-critical" (3-4), floored at 3 rather than 4 because the product has exactly one asymmetry and it is functional: the 7/5 grid split at `lg`, which exists so the hero can stick while the form scrolls. Everything narrower than 1024px is a single column in a fixed order. Not 1, because the hero is deliberately a different object from the cards: different radius (`--radius-2xl` vs `--radius-xl`), different fill, different shadow. That difference is the whole hierarchy. |
| `MOTION_INTENSITY` | **2** | Section 1.A row "trust-first" (2-3), taken at the floor. `DESIGN.md`'s **Numbers-Don't-Move Rule** removes from the motion budget every element a user actually looks at: the clock, the countdown, the hero numeral, every stat tile figure. What remains is press feedback, a segment pill, a chevron, surfaces entering and leaving, and one 600ms data sweep. That is a 2. **The "redesign - preserve" row says motion +1 and I am deliberately not taking it** (see § 9, decisions log): that row assumes motion is under-served, and here it is capped by a product rule, not by neglect. At 2 the Section 14 boxes "Motion claimed = motion shown" (`> 4`) and "Reduced motion wrapped" (`> 3`) are both below their trigger, and the product honours reduced motion anyway. |
| `VISUAL_DENSITY` | **5** | Section 1.B "Public-sector service" (5). The day summary shows entrada, saída, intervalo, horas trabalhadas, extras, adicional noturno and saldo on one card, plus a stat-tile grid: that is instrument density, not landing-page density. It is not 7 or above, because the **Eight Steps Rule** keeps 12px between sibling rows and 24px between cards, and because Section 4.4 bans generic card containers above 7 while this product's cards carry real hierarchy. |

### 1.3 Where this goes in `DESIGN.md`, and in what words

A new `## Design Read and Dials` section, inserted **immediately after `## Overview` and
immediately before `## Colors`**. It is the first thing after the north star because every
section below it is gated by these three numbers.

The exact text to insert:

```markdown
## Design Read and Dials

**Design Read.** Reading this as: a single-purpose pt-BR calculator for a CLT worker holding
a phone one-handed at a time clock, with a trust-first instrument language, leaning toward
Tailwind v4 CSS-first tokens, a hyperlegible sans with real tabular figures, and motion that
only ever confirms a state change.

**Dials.** `DESIGN_VARIANCE: 3` · `MOTION_INTENSITY: 2` · `VISUAL_DENSITY: 5`.

These are not the `8 / 6 / 4` baseline and they are not inherited. They come from the
`design-taste-frontend` Section 1.A row **"trust-first / public-sector / regulated /
accessibility-critical"** (3-4 / 2-3 / 4-5) and the Section 1.B preset **"Public-sector
service"** (3 / 2 / 5), because the quiet constraints in Section 0.A.6 outrank aesthetic
preference here: WCAG 2.2 AA in both themes is a gate, the copy is legally bound, and the
user is standing up.

- **VARIANCE 3.** One column below 1024px in a fixed order, one functional asymmetry above it
  (the 7/5 split that lets the hero stick while the form scrolls). Not 1: the hero is a
  different object from the cards, and that difference is the hierarchy.
- **MOTION 2.** The Numbers-Don't-Move Rule takes every element the user reads out of the
  motion budget. What is left is press feedback, the segment pill, the chevron, surfaces
  entering and leaving, and the 600ms ring sweep. The "redesign - preserve" row's `+1` is
  deliberately not taken: motion here is capped by a product rule, not by neglect.
- **DENSITY 5.** Instrument density, not landing-page density, held at 5 by the Eight Steps
  Rule rather than by removing information.

A change to any of these three is a change to this document, and therefore a human approval
point.
```

---

## 2. The typeface

### 2.1 The constraint, and how it was actually tested

`spec.md` § The inviolable constraint disqualifies any family lacking real `tnum`, an
unambiguous `0` versus `O`, and an unambiguous `1` versus `l`, **regardless of taste**. It
also allows the honest outcome: keep Inter and document the exception.

Reputation was not used. Every candidate was tested by downloading **the exact `woff2` file
`fonts.gstatic.com` serves for the `latin` subset** (the same file `next/font/google`
self-hosts) and reading it with `fontTools`:

- the `GSUB` feature list, for `tnum` and `zero`;
- the `hmtx` advance width of every digit, at the default instance and after applying the
  `tnum` substitution, at weights 400, 500, 600 and 700;
- the contour count of `zero` (a slashed or dotted zero has one contour more than a plain
  one), and the advance-width ratio of `0` to `O`;
- the bounding box of `1` against its own advance (a foot serif fills the advance; a bare
  flag does not) and of `l` against `I`.

Specimens were rendered at 110px, 44px, 24px, 18px and 12px and read.

### 2.2 The finding that changes the question

**Google Fonts does not serve the `zero` feature. In any family.** Its subsetter keeps a
fixed default set of layout features (`calt ccmp dnom frac liga locl numr pnum tnum rvrn`)
and drops `zero`, `ss01..ssNN` and `cv01..cvNN`. Measured on the served Inter file:

```
Inter (latin, opsz 14..32 + wght 100..900, 71 kB woff2)
  GSUB features: calt ccmp dnom frac locl numr pnum tnum
  zero: ABSENT
```

**Consequence: `slashed-zero` in the `numeric` utility has never done anything in this
product.** `@utility numeric { font-variant-numeric: tabular-nums slashed-zero }` asks for a
feature the shipped file does not contain, so `0` and `O` have been separated only by width
(ratio 0.79) since 0001. `DESIGN.md` states the opposite in two places. That is a
documentation defect this gate corrects, and it moves the choice from *"which family has a
`zero` feature"* to *"which family draws a disambiguated zero by default"*.

A second measured correction: Inter's `opsz` axis **is** present (14 to 32), but it is the
reason the file is 71 kB rather than roughly 40 kB. It is paid for on every cold load.

### 2.3 The decision

**`Atkinson Hyperlegible Next`**, via `next/font/google`, variable, `display: "swap"`,
`subsets: ["latin"]`.

It is the only tested family that satisfies all three legs of the constraint without relying
on a feature the CDN strips.

| Constraint leg | Measured result |
|---|---|
| Real OpenType `tnum` | **Present.** `tnum` maps `zero..nine` to `zero.tf..nine.tf`, and every substituted glyph has an advance of **632/1000 em at wght 400, 500, 600 and 700**. Default (proportional) advances range 430 to 656, so the feature is doing real work, not decorating an already-monospaced set. |
| `0` versus `O` | **Slashed zero in the default glyph.** `zero` has 3 contours (outer, counter, slash) where every other tested family has 2. It needs no feature, survives the subsetter, and renders in the fallback-free case. Width ratio `0`/`O` is 0.843. |
| `1` versus `l` | **A `1` with a full foot serif and an `l` with a tail**, plus an `I` with top and bottom crossbars, so all three of `1`, `l`, `I` are distinct from each other. Verified on a 110px specimen and again at 12px. |

Why this family and not a prettier one: it was drawn by the Braille Institute for exactly
the failure mode `spec.md` names, character-by-character disambiguation for readers in bad
conditions. The brief is a worker reading money off a phone in a badly lit corridor. The
aesthetic argument and the figure argument point the same way for once, and Section 4.1's
own override path ("Inter is acceptable when the brief is a public-sector /
accessibility-first site") means an accessibility-first family is squarely in the design
read rather than a compromise against it.

It is not Inter, not a banned serif, not `Geist`/`Satoshi`/`Outfit`, and not on any AI-tell
list.

**Loading, exactly:**

| Property | Value |
|---|---|
| Import | `Atkinson_Hyperlegible_Next` from `next/font/google` |
| `subsets` | `["latin"]` (unchanged) |
| `display` | `"swap"` (unchanged) |
| `variable` | `"--font-hyperlegible"` |
| `weight` | omitted, so the variable face loads (axis `wght` 200 to 800, covering the four sanctioned weights 400/500/600/700) |
| `style` | omitted; the product uses no italic |
| Served size | **33 kB** latin woff2, against Inter's **71 kB** |

**The CSS variable is renamed `--font-inter` to `--font-hyperlegible`.** AC17 requires that
no token name a family the app no longer loads. The name states the *reason* the family was
chosen rather than the vendor, so if a future spec abandons hyperlegibility the token has to
be renamed and the grep will say so out loud.

`--font-sans` keeps its shape and its fallback stack:
`var(--font-hyperlegible), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

`font-optical-sizing: auto` on `body` **stays as declared** and becomes inert: Atkinson has
only a `wght` axis. It is kept because it costs nothing and is correct the moment a family
with `opsz` returns. **`DESIGN.md` must stop claiming optical sizing is doing work**, and
must say what replaces it: the per-step tracking in § 2.4, which was always the larger term.

### 2.4 What the swap disturbs, and the re-tuned ramp

`spec.md` R1 is right: the ramp was hand-tuned to Inter's metrics and does not transfer.
Measured difference between the two served files:

| Metric | Inter | Atkinson Hyperlegible Next | Effect |
|---|---|---|---|
| x-height | 0.546 em | 0.496 em | Lowercase reads **9.2% smaller** at the same px size |
| Cap height | 0.728 em | 0.668 em | Caps read **8.2% smaller** |
| `hhea` ascent + descent | 1.210 em | 1.300 em | The glyph box is **7.4% taller**; any leading below 1.21 was relying on Inter's compact box |
| Set width, pt-BR strings at 100px/400 | baseline | "Sua Jornada" -5.6%, "Resumo Financeiro" -5.1%, "Tempo de Trabalho Diário" -3.9%, "Cálculo com base na tabela de 2026 do INSS" -2.9%, "R$ 1.087,10" -0.6% | Every line gets **narrower**, so line counts can only stay or fall. Overflow risk at 390px is **down**, not up |

Two mechanical rules produce the re-tune. No value below is a taste call.

**Rule A (leading).** Every step whose leading was below **1.21** was sized against Inter's
1.210 em glyph box and gets **+0.05**. Steps at or above 1.21 already clear Atkinson's 1.300
em box and are untouched.

**Rule B (tracking).** `DESIGN.md`'s Tracking-Follows-Size Rule is unchanged: negative above
1.125rem, zero at body, positive below 0.875rem. The **magnitudes** shrink, because Atkinson
is already narrower and more openly spaced than Inter, and because tabular figures are fixed
width, which makes tracking the only lever left on a number. Negative tracking is cut to
roughly 45% of its Inter value; positive micro-tracking is nudged up at the two smallest
steps and cut at the single widest one.

**The ramp, as it must be written into `app/globals.css` and the `DESIGN.md` frontmatter:**

| Step | Size (unchanged) | Weight (unchanged) | Line height: old → **new** | Tracking: old → **new** | Rule |
|---|---|---|---|---|---|
| `--text-numeral` | `clamp(2.5rem, 20cqi, 6rem)` | 700 | 1 → **1.05** | −0.035em → **−0.02em** | A, B |
| `--text-display` | 2rem | 700 | 1.1 → **1.15** | −0.024em → **−0.014em** | A, B |
| `--text-title` | 1.5rem | 600 | 1.2 → **1.25** | −0.018em → **−0.01em** | A, B |
| `--text-metric` | 1.5rem | 600 | 1.15 → **1.2** | −0.016em → **−0.008em** | A, B |
| `--text-heading` | 1.125rem | 600 | 1.3 → **1.3** | −0.011em → **−0.005em** | B |
| `--text-input` | 1.125rem | 500 | 1.2 → **1.25** | +0.005em → **0em** | A, B |
| `--text-body` | 1rem | 400 | 1.55 → **1.55** | 0em → **0em** | none |
| `--text-body-sm` | 0.875rem | 400 | 1.5 → **1.5** | +0.003em → **+0.005em** | B |
| `--text-label` | 0.875rem | 500 | 1.2 → **1.25** | +0.005em → **+0.005em** | A |
| `--text-caption` | 0.75rem | 400 | 1.45 → **1.45** | +0.01em → **+0.012em** | B |
| `--text-overline` | 0.6875rem | 600 | 1.2 → **1.25** | +0.08em → **+0.07em** | A, B |

Notes the developer needs and must not have to infer:

- **No size changes.** Every `font-size` is byte-identical to what ships. See § 2.5 for the
  one pre-authorised contingency.
- **`--text-input` drops to 0 tracking.** It is a tabular step at 1.125rem; +0.005em on a
  money string set in fixed-width figures loosens a column that is already wide enough.
- **`--text-overline` drops from +0.08em to +0.07em.** It is the only uppercase in the
  product and the only step above +0.01em. Atkinson's caps are set wider than Inter's, and
  +0.08em at 11px starts reading as separated letters rather than a word.
- **`--text-numeral` gains leading.** Digits have no descenders, but the comma in
  `R$ 1.087,10` and the `-` in a negative balance do sit against the box edge inside
  `hero-panel`'s `overflow-hidden` container. 1.05 is the cheapest possible insurance and
  costs ~2px at the 40px clamp floor.

### 2.5 The acceptance tests, and the one contingency

| What must be measured | How | Advances |
|---|---|---|
| Tabular alignment is real | At 390px on `/` and `/custo-da-hora`, type into the entrada field and watch the hero numeral and the stat-tile figures. No character to the right of a changing digit moves by one pixel. Screenshot to `evidence/`. | AC5 |
| `0O1l` is unambiguous at the smallest numeric size | Specimen of `0O1lI` and `R$ 1.087,10` at **0.75rem / 12px**, which is `--text-caption`, the smallest step that carries a figure. Both themes. Screenshot to `evidence/`. | AC6 |
| Nothing overflows after the re-tune | The existing Playwright suite at 390 / 1440 / 2560 / 3840, both themes. Expected green without change, because every string gets narrower. | AC14 |
| Contrast did not move | Colour tokens are untouched, so no ratio changes. What changes is apparent stroke weight. Re-run the axe suite in **both** themes and re-state the DESIGN.md pairs in `reports/audit.md`. **Every text pair in `DESIGN.md` already clears 4.5:1**, the small-text bar, so no size or weight shift can reclassify a pair into failure. | AC12, AC13 |
| The ramp was actually re-tuned and not copied | Diff `app/globals.css` against this table. A copied ramp is an R1 failure of this gate. | R1 |

**Pre-authorised contingency, so the developer needs no decision.** The 9.2% x-height loss
lands hardest at the two smallest steps. If the AC6 specimen read on a real 390px device
shows `--text-caption` failing at 12px, then **and only then**: `--text-caption` goes
`0.75rem → 0.8125rem` and `--text-overline` goes `0.6875rem → 0.75rem`, nothing else moves,
and AC14 is re-run. This is pre-authorised by this gate; it changes two token values, adds
no token, and is recorded in `STATUS.md` if used.

### 2.6 Candidates rejected, with the figure that failed

Recorded because AC18 asks for it if Inter is kept, and because the next spec should not
re-run these downloads.

| Family | Verdict | The measurement that decided it |
|---|---|---|
| **Inter** (incumbent) | Rejected | `tnum` present, but `zero` absent from the served file and **no disambiguation in the default glyphs**: `1` fills only 0.67 of its advance (flag, no foot serif) and `l`/`I` are the same stem (width ratio 0.95). This is the `1`/`l` leg of the constraint failing outright, independent of the AI-tell box. |
| **IBM Plex Sans** | Rejected | Excellent shapes (`1` fill 0.83, `l`/`I` ratio 0.56, digits monospaced by default) but **`tnum` is absent from the served `GSUB`**. The constraint says real `tnum`, not absent. |
| **Source Sans 3** | Rejected | Same failure: no `tnum` in the served file. |
| **Asap** | Runner-up, rejected | Clears everything: `tnum` present and equalising, `1` fill 0.86, `l`/`I` ratio 2.21, digits tabular by default. Rejected only on the zero: 2 contours, plain oval, `0`/`O` ratio 0.739. Width alone separates `0` from `O`; nothing inside the glyph does. **If Atkinson is ever disqualified downstream, Asap is the replacement and needs no new analysis.** |
| **Golos Text**, **Work Sans** | Rejected | Both clear `tnum` and `1`/`l`. Both have a plain 2-contour zero. Same reason as Asap, with a weaker `1`. |
| **Manrope**, **Plus Jakarta Sans**, **Epilogue**, **Overpass**, **Figtree**, **Onest**, **Schibsted Grotesk**, **Archivo**, **Red Hat Text**, **Barlow**, **Noto Sans** | Rejected | `l`/`I` width ratio at or near 1.0 (identical stems) and/or a `1` below 0.6 advance fill. The `1`/`l` leg fails. |
| **Recursive**, **Hanken Grotesk**, **Commissioner**, **Wix Madefor Text**, **Lexend**, **Roboto Flex** | Rejected | No `tnum` in the served file. |

**AC18 does not apply**, because Inter is not kept. The exception paragraph it asks for is
replaced by § 2.2, which records the `zero`-feature finding that AC18 exists to surface.

---

## 3. The icon library

### 3.1 The decision

**`@tabler/icons-react`**, replacing `lucide-react` in all 12 files.

Allowed set is Phosphor / HugeIcons / Radix / Tabler. Reasoned against the constraints
`DESIGN.md` already imposes and against AC10's byte budget:

| Candidate | Verdict |
|---|---|
| **Tabler** | **Chosen.** Same 24px grid and same 2px stroke as Lucide, so every glyph swaps at visual parity and `DESIGN.md`'s "stroke width 2 at 16 and 20, 1.75 at 24 and above" rule survives unchanged. One path set per icon. |
| Phosphor | Rejected. Each component carries **six weight variants** (thin, light, regular, bold, fill, duotone) in one module, so 30 icons cost roughly six times the path data of a single-weight set. It is also **not** in Next's default `optimizePackageImports` list, so its barrel is not rewritten for free. Against a 10 kB gzipped budget that is an unnecessary risk for a change no user can see. |
| HugeIcons | Rejected. Same barrel problem, no entry in Next's optimisation list. |
| Radix Icons | Rejected on design, not on bundle. They are fixed 15×15 glyphs with **no stroke-width control and no size system**. `DESIGN.md` mandates three sizes (16 / 20 / 24) and two stroke weights. Radix cannot express the system. |

### 3.2 The import path that actually tree-shakes

```ts
import { IconClock, IconLogin } from "@tabler/icons-react";
```

The root named import is correct **and sufficient**, because `@tabler/icons-react` is in
Next's built-in `optimizePackageImports` list (verified in
`node_modules/next/dist/server/config.js`, in the same array that contains `lucide-react`).
Next rewrites each named import to its own module at compile time, so the 464 kB barrel at
`dist/esm/tabler-icons-react.mjs` is never loaded in a production build. No `next.config.ts`
change is required, and adding the package to `experimental.optimizePackageImports` by hand
would be redundant.

**Fallback, if `pnpm build` shows the route JS growing past AC10's 10 kB gzipped:** switch to
explicit per-icon deep imports, `import IconClock from "@tabler/icons-react/dist/esm/icons/IconClock.mjs"`.
This is only a fallback; the package has no `sideEffects: false`, which is why the barrel
must never be relied on without the Next rewrite.

### 3.3 Component API differences the developer must not discover by trial

Verified by reading `dist/esm/createReactComponent.mjs` at v3.46.0:

| Concern | Lucide | Tabler |
|---|---|---|
| Size | `size={24}` | `size={24}` — identical, default 24 |
| Stroke weight | `strokeWidth={1.75}` | **`stroke={1.75}`** — the prop is renamed, default 2 |
| Colour | `currentColor` | `currentColor`, same default |
| `className` | passed through | merged after `tabler-icon tabler-icon-{name}`, so `w-4 h-4` and `text-*-ink` still win |
| Arbitrary props | spread onto `<svg>` | spread onto `<svg>`, so **every `aria-hidden="true"` keeps working unchanged** |

There are three `strokeWidth={1.75}` call sites today (`app-header.tsx:32`,
`hero-panel.tsx:34`, `salary-calculator.tsx:80`). All three become `stroke={1.75}`.

### 3.4 The map, one for one

Semantic meaning is preserved exactly. No icon changes what it means, no `aria-hidden`
changes, no accessible name changes, no icon is added or removed.

| File | Lucide | **Tabler** | Meaning (unchanged) |
|---|---|---|---|
| `organisms/app-header.tsx` | `Clock` | `IconClock` | The live clock |
| | `Moon` | `IconMoon` | Switch to dark |
| | `Sun` | `IconSun` | Switch to light |
| | `Wallet` | `IconWallet` | The logo mark |
| `organisms/work-calculator.tsx` | `Clock` | `IconClock` | Hero eyebrow, time |
| | `LogIn` | `IconLogin` | Entrada |
| `organisms/journey-form.tsx` | `AlertTriangle` | `IconAlertTriangle` | Compliance warning banner |
| | `Coffee` | `IconCoffee` | Intervalo |
| | `LogIn` | `IconLogin` | Entrada |
| | `LogOut` | `IconLogout` | Saída |
| | `Percent` | `IconPercentage` | Overtime rate field |
| | `RotateCcw` | `IconRotate` | Reset to defaults (counter-clockwise; **not** `IconRotateClockwise`, which reverses the meaning) |
| | `Settings` | `IconSettings` | Journey settings disclosure |
| | `Zap` | `IconBolt` | Hora extra (data icon, `--color-overtime-ink`) |
| `organisms/day-summary.tsx` | `AlertTriangle` | `IconAlertTriangle` | Warning banner |
| | `CalendarDays` | `IconCalendarMonth` | The day being summarised (day-grid calendar, the closest Tabler form; `IconCalendarEvent` is a single marked date and would narrow the meaning) |
| | `Coffee` | `IconCoffee` | Intervalo |
| | `MoonStar` | `IconMoonStars` | Adicional noturno (data icon, `--color-night-ink`) |
| | `Sunrise` | `IconSunrise` | Start of the journey |
| | `Sunset` | `IconSunset` | End of the journey |
| | `Zap` | `IconBolt` | Hora extra (data icon) |
| `organisms/salary-calculator.tsx` | `AlertTriangle` | `IconAlertTriangle` | Danger alert banner |
| | `Calculator` | `IconCalculator` | Hero mark |
| | `ChevronDown` | `IconChevronDown` | Details panel closed |
| | `ChevronUp` | `IconChevronUp` | Details panel open |
| | `Clock` | `IconClock` | Monthly hours field |
| | `Sun` | `IconSun` | Extra gains field |
| | `TrendingDown` | `IconTrendingDown` | Deductions (data icon, `--color-negative-ink`) |
| | `TrendingUp` | `IconTrendingUp` | Gains (data icon, `--color-positive-ink`) |
| | `Wallet` | `IconWallet` | Gross salary field |
| `organisms/calculator-views.tsx` | `Clock` | `IconClock` | Jornada tab |
| | `DollarSign` | `IconCurrencyDollar` | Custo da Hora tab |
| `organisms/tax-details-panel.tsx` | `Users` | `IconUsers` | Dependents field |
| `organisms/cookie-consent.tsx` | `Cookie` | `IconCookie` | Consent banner |
| | `Shield` | `IconShield` | Privacy settings |
| | `X` | `IconX` | Close |
| `molecules/copy-button.tsx` | `Copy` | `IconCopy` | Copy the value |
| | `Check` | `IconCheck` | Copied confirmation |
| `molecules/regime-field.tsx` | `Briefcase` | `IconBriefcase` | Regime de trabalho |
| | `Check` | `IconCheck` | Selected option |
| | `ChevronDown` | `IconChevronDown` | Options disclosure |
| `molecules/extra-entry-row.tsx` | `Trash2` | `IconTrash` | Remove an entry |
| `molecules/extra-entry-list.tsx` | `PlusCircle` | `IconCirclePlus` | Add an entry |

Every name above was verified to exist in `@tabler/icons-react@3.46.0`'s export list. 30
unique icons, 12 files.

**One observation, deliberately not acted on.** `IconCurrencyReal` exists and would be more
truthful than a dollar sign on a Brazilian salary tab. Changing it is a meaning change, and
`spec.md`'s own default says the mapping is one for one. It is recorded here as a candidate
for a future spec, not taken in a compliance pass.

**`DESIGN.md`'s `### Iconography` heading changes from `lucide-react` to
`@tabler/icons-react`.** Its five rules (three sizes, two stroke weights, `currentColor`,
`aria-hidden`, gap to adjacent text, one idea one icon) are unchanged and all still hold,
with `strokeWidth` renamed to `stroke` in the second one.

---

## 4. Viewport units

`components/templates/calculator-page.tsx:20` — `min-h-screen` becomes **`min-h-dvh`**.

`min-h-dvh` is a Tailwind v4 core utility that compiles to `min-height: 100dvh`. It is the
in-system form of the skill's `min-h-[100dvh]`, produces the identical declaration, and
avoids an arbitrary value, which `DESIGN.md` forbids where a utility exists. It satisfies
AC11 (`rg 'min-h-screen|h-screen'` returns nothing).

**Sweep result.** `rg` over `app/**` and `components/**` for `h-screen`, `min-h-screen`,
`100vh`, `vh]`, `dvh`, `svh`, `lvh` returns **exactly one match**, the line above. There is
no second viewport-unit usage to fix.

**Why it is a real bug and not only a rule.** On mobile Safari and Chrome Android, `100vh`
is the viewport with the browser chrome *retracted*. The element is therefore taller than
what the user can see, by the height of the URL bar, on the exact device this product is
designed for. `100dvh` is the viewport that actually exists right now. The floating tab bar
already sits above `env(safe-area-inset-bottom)`, so with `dvh` the page bottom and the tab
bar finally agree on where the screen ends.

---

## 5. LCP: 2.8s against a 2.5s target

### 5.1 What in the design is responsible

Three things, in descending order of design ownership.

**1. The hero starts at `opacity: 0`.** `components/templates/calculator-layout.tsx:18-30`
mounts both columns as `motion.div` with `initial={{ opacity: 0, y: 12 }}`. The aside column
holds the hero, and the hero holds the LCP element: the `--text-numeral` paragraph in
`hero-panel.tsx:40`, the largest painted text on a 390px screen by a wide margin.

An element rendered at opacity 0 is not a paint. The LCP candidate therefore cannot be
recorded until React has hydrated *and* Motion has run its first frame. Every byte of the
client bundle sits between the user and their number, by design, for an animation whose only
content is "the page appeared".

**2. The value itself is client-gated.** The whole tree under `CalculatorViews` is
`"use client"`, and the hero's string comes from `useWorkCalculator`, which reads
`localStorage` and the current time. The server paints the `--:--` placeholder; the real
number replaces it after hydration. The shape of the answer is server-rendered, which is
correct, but the number is not.

**3. Two `preconnect`s open before consent exists.** `app/layout.tsx:56-57` opens TLS
connections to `googletagmanager.com` and `pagead2.googlesyndication.com` in `<head>`, on the
critical path, on mobile data, before the user has agreed to anything. `PRODUCT.md` §8 is
explicit that a placement which measurably hurts the path to an answer loses.

### 5.2 What may change

| # | Change | Owner | Effect | Adds a dependency? |
|---|---|---|---|---|
| **L1** | **Delete `initial` and `animate` from both `motion.div`s in `calculator-layout.tsx`.** The columns render at their final opacity and position. | **This gate. Decided.** | The LCP candidate becomes paintable at first paint instead of after hydration plus a frame. This is the largest design-owned term. | No. It removes code. |
| **L2** | Font family swap, Inter to Atkinson. | This gate. Decided. | **-38 kB** on a `<link rel="preload">`ed, self-hosted font on the critical path. See § 5.3 for the honest read of the direction. | No. Same package. |
| **L3** | Remove the two third-party `preconnect`s, or move them behind consent. | `tech-lead` at G5, under `PRODUCT.md` §8. | Frees two TLS handshakes of mobile-data contention before first paint. Measure with and without; if removing them improves LCP, §8 says the placement loses. | No. It removes tags. |

**L1 is a design decision and I am taking it.** Justification, on the record: `PRODUCT.md`
§5 says nothing decorative sits between the user and the answer, `MOTION_INTENSITY` is 2, and
`DESIGN.md`'s motion section lists what may animate. A **page-entry fade is not on that
list** and never was; it was inherited. Under `prefers-reduced-motion` the animation is
already suppressed, so deleting it gives every user the experience those users already have.
It is a deletion, not a redesign, and it changes no layout, no token and no state.

The view-transition animation in `calculator-views.tsx` (`PANEL_TRANSITION`) is a **different
thing and stays**: it fires on a tab change, which is a user-triggered state transition with
a continuity job to do, and it is not on the cold-load path.

### 5.3 The expected effect of the font swap, stated honestly

The team lead is right that the swap moves the number in one direction or the other, and the
direction is not obvious:

- **Downward pressure (helps):** 33 kB replaces 71 kB on a preloaded, render-adjacent
  resource. On a throttled mobile connection that is real time back, and it is the whole
  reason the `opsz` axis was worth losing.
- **Neutral-to-upward pressure (may not help):** `display: "swap"` means the LCP text can
  paint in the metric-adjusted fallback before the webfont arrives, so the font is often not
  the term that gates the LCP timestamp at all. If it is not, the 38 kB shows up in bandwidth
  contention and in the swap reflow, not in the LCP number directly.
- **CLS is protected either way:** `next/font` generates an `adjustFontFallback` size-adjust
  from the real font's metrics, and it will do so from Atkinson's (x-height 0.496, ascent
  0.984, descent -0.316) exactly as it did from Inter's.

**The measurement that settles it, and nothing else does:** AC8 records Lighthouse mobile LCP
on `/` **before** any change; AC7 records it after, same route, same machine, three runs, with
the date. Both numbers go in `reports/release.md`. If the swap pushes LCP up, `spec.md` R3
disqualifies the family regardless of the aesthetic case, and § 2.6 already names Asap as the
replacement so the pipeline does not have to stop.

**Not available to fix this:** a dependency (`spec.md` § Out of scope), and any reduction in a
disclosure to save bytes.

**Resolved (recorded here so this section does not read as still open).** The LCP phase
breakdown (`STATUS.md` § B5 ruling, G5 run 4) shows Load Delay and Load Time at **0 ms** on all
runs — the font swap could not have moved LCP either direction, up or down, because the resource
it changes finishes 2.4s before the LCP timestamp. `spec.md` R3 was never triggered (LCP fell, it
did not rise), so **the Asap fallback named above was considered and rejected**: Atkinson ships,
Asap does not. Separately, the `adjustFontFallback` claim two paragraphs above **did not hold**
for this exact family — `next/font` has no metrics-table entry for "Atkinson Hyperlegible Next" in
this Next version, so no size-adjusted fallback face is generated (`pnpm build` warns accordingly).
Measured consequence: CLS 0.0011 on `/`, 0.000 on `/custo-da-hora`, all runs — the shipped,
preloaded woff2 finishes before FCP, so there is no fallback face to shift. Full arithmetic:
`STATUS.md` § B6 ruling and `evidence/after.md` §7.

---

## 6. Layout, components, tokens, states, motion

The spec changes no layout. What follows is the record a developer needs to build against,
with the changed values marked. Anything unmarked ships today and must not move.

### 6.1 Layout at the four reference widths

Unchanged from `DESIGN.md` § Layout, restated so this gate can be checked without a second
document open.

| Width | Structure | Gutter | Card padding | What moves |
|---|---|---|---|---|
| **390** | One column. **Hero first in DOM order and on screen**, then the journey form, then the day summary. Floating tab bar above `env(safe-area-inset-bottom)`; content reserves `--spacing-3xl` below it. Fields full width; date and time stack. | `--spacing-md` | `--spacing-lg` | Nothing. |
| **1440** | 12 columns splitting **7 (form and summary) / 5 (hero)**. Hero moves right and sticks at `calc(var(--header-height) + var(--spacing-xl))`. Container `--container-app` 80rem. | `--spacing-xl` | `--spacing-xl` | Nothing. |
| **2560** | Identical composition. Root font size steps to 18px, container to 100rem. **The system scales, it does not reflow.** | `--spacing-xl` | `--spacing-xl` | Nothing. |
| **3840** | Identical to 2560. Extra width becomes margin, deliberately. | `--spacing-xl` | `--spacing-xl` | Nothing. |

No horizontal overflow and no control off-viewport at any of the four, in both themes,
asserted by the existing Playwright suite (AC14). The type swap narrows every string, so the
risk moves down rather than up.

### 6.2 Component tree

Every element is an existing component. **Nothing new is created by this spec.**

| Element | Level | Status | Path | What changes |
|---|---|---|---|---|
| `CalculatorPage` | template | **edit** | `components/templates/calculator-page.tsx` | `min-h-screen` → `min-h-dvh` (line 20) |
| `CalculatorLayout` | template | **edit** | `components/templates/calculator-layout.tsx` | L1: `initial`/`animate` removed from both columns |
| `AppHeader` | organism | edit | `components/organisms/app-header.tsx` | 4 icons; `strokeWidth` → `stroke` |
| `CalculatorViews` | organism | edit | `components/organisms/calculator-views.tsx` | 2 icons; the D1-D4 disclaimer strings (copy) |
| `WorkCalculator` | organism | edit | `components/organisms/work-calculator.tsx` | 2 icons |
| `SalaryCalculator` | organism | edit | `components/organisms/salary-calculator.tsx` | 9 icons; `strokeWidth` → `stroke`; `MISSING_VALUE`; body copy |
| `DaySummary` | organism | edit | `components/organisms/day-summary.tsx` | 7 icons; the DSR disclosure string (copy) |
| `JourneyForm` | organism | edit | `components/organisms/journey-form.tsx` | 8 icons |
| `TaxDetailsPanel` | organism | edit | `components/organisms/tax-details-panel.tsx` | 1 icon |
| `CookieConsent` | organism | edit | `components/organisms/cookie-consent.tsx` | 3 icons |
| `HeroPanel` | organism | edit | `components/organisms/hero-panel.tsx` | `strokeWidth` → `stroke`; inherits the new `--text-numeral`; **gains the statement mode in § 6.6** |
| `RegimeField` | molecule | edit | `components/molecules/regime-field.tsx` | 3 icons; renders the S1/S10 `impact` string |
| `CopyButton` | molecule | edit | `components/molecules/copy-button.tsx` | 2 icons |
| `ExtraEntryRow` | molecule | edit | `components/molecules/extra-entry-row.tsx` | 1 icon |
| `ExtraEntryList` | molecule | edit | `components/molecules/extra-entry-list.tsx` | 1 icon |
| `Button`, `Input`, `StatBox`, `AlertBanner`, `ProgressRing`, `ModalDialog`, `CollapsiblePanel`, `Field`, `CurrencyInput`, `DurationField`, `DateTimeInput`, `PeriodSelector` | atom / molecule | **reuse, untouched** | `components/atoms/`, `components/molecules/` | Inherit the ramp. No edit. |

### 6.3 Tokens

Colour, spacing, radius, elevation and duration tokens are **untouched in both themes**. The
only token changes this spec makes are the eleven type steps in § 2.4 and the font-family
variable rename in § 2.3.

| Use | Token | Light | Dark | Changed? |
|---|---|---|---|---|
| Font family | `--font-sans` → `var(--font-hyperlegible), system-ui, …` | same | same | **renamed source var** |
| Hero plane, on track | `--color-positive-deep` | `#085e2f` | `#085e2f` (theme-invariant) | no |
| Hero plane, time debt | `--color-negative-deep` | `#9b171f` | `#9b171f` (theme-invariant) | no |
| Hero plane, salary | `--color-accent` | `#2a62d1` | `#2a62d1` (theme-invariant) | no |
| Hero text | `--color-ink-onfill` | `#ffffff` | `#ffffff` | no |
| Hero numeral | `--text-numeral` + `numeric` | — | — | **leading, tracking** |
| Hero eyebrow | `--text-overline` | — | — | **leading, tracking** |
| Hero elevation | `--shadow-accent` | as tokenised | as tokenised | no |
| Card | `--color-surface` / `--color-line` / `--radius-xl` / `--shadow-card` | `#ffffff` / `#e0e2e6` / 28px / card | `#181b21` / `#2b2e35` / 28px / `none` | no |
| Card heading | `--text-title`, `--color-ink` | `#1e232c` | `#f2f3f6` | **leading, tracking** |
| Sunken panel | `--color-surface-sunken` / `--radius-lg` | `#f2f4f7` | `#13161b` | no |
| Stat tile value | `--text-metric` + `numeric`, `--color-*-ink` | per hue | per hue | **leading, tracking** |
| Field control | `--color-line-strong`, `--radius-md`, `--text-input` | `#888c95` | `#6a707a` | **leading, tracking** |
| Field label | `--text-label`, `--color-ink-muted` | `#5f656f` | `#a6abb5` | **leading** |
| Field hint | `--text-caption`, `--color-ink-subtle` | `#696f79` | `#898e98` | **tracking** |
| Row text / disclosure | `--text-body-sm`, `--color-ink-muted` | `#5f656f` | `#a6abb5` | **tracking** |
| Footnote / disclaimer | `--text-caption`, `--color-ink-subtle` | `#696f79` | `#898e98` | **tracking** |
| Warning banner | `--color-overtime-soft` / `-ink`, `--radius-lg` | `#faf4ea` / `#905e16` | `#3a2f1f` / `#f8b35d` | no |
| Danger banner | `--color-negative-soft` / `-ink`, `--radius-lg` | `#faebec` / `#bf2029` | `#3c1d24` / `#f98078` | no |
| Focus ring | `--color-focus`, 2px, offset 2px | `#2a62d1` | `#91b6f9` | no |
| Icon, default | `currentColor` at 16 / 20 / 24, `stroke` 2 / 2 / 1.75 | — | — | **prop name only** |
| Icon, data | `--color-overtime-ink`, `--color-night-ink`, `--color-positive-ink`, `--color-negative-ink` | per hue | per hue | no |

### 6.4 States

No interactive element changes behaviour. The table is the binding record, because a swap of
the icon library and the ramp touches every one of them and none may regress. Focus-visible
is stated explicitly on every row, never inherited.

| Element | rest | hover | focus-visible | active | disabled | loading | error | empty |
|---|---|---|---|---|---|---|---|---|
| **Button, primary** (`atoms/button.tsx`) | `--color-accent` fill, `--color-ink-onfill`, `--radius-md`, 48px, no shadow | `--color-accent-hover` | `outline: 2px solid var(--color-focus)`, offset 2px | `--color-accent-active` + `scale(0.97)` + `--shadow-press` | 40% opacity, `pointer-events: none` | n/a, no async action in this product | n/a | n/a |
| **Button, outline** | transparent, 1px `--color-line-strong`, `--color-ink` | fill `--color-surface-sunken`, border `--color-ink-subtle` | same ring | `scale(0.97)` | 40% opacity | n/a | n/a | n/a |
| **Button, ghost** | transparent, `--color-ink-muted` | `--color-surface-sunken`, text to `--color-ink` | same ring | `scale(0.97)` | 40% opacity | n/a | n/a | n/a |
| **Button, danger** | `--color-negative-soft`, `--color-negative-ink` | tint to 18% | same ring | `scale(0.97)` | 40% opacity | n/a | n/a | n/a |
| **Input / masked / currency** (`atoms/input.tsx`) | `--color-surface`, 1px `--color-line-strong`, `--color-ink`, placeholder `--color-ink-subtle`, 56px, `--text-input` | border to `--color-ink-subtle`, **no fill change** | border `--color-accent` **plus** the ring | n/a, a text field has no press | `--color-surface-sunken`, `--color-line` border, 60% opacity, `cursor: not-allowed` | n/a | border `--color-negative`, fill `--color-negative-soft`, ring becomes `--color-negative`, `aria-invalid="true"`, `aria-describedby` → the worded banner | placeholder visible; the dependent figure renders `MISSING_VALUE`, never `R$ 0,00` |
| **Hero value** (`hero-panel.tsx`) | figure mode: `--text-numeral`, `numeric`, `whitespace-nowrap`, `aria-live="polite"` | n/a | n/a, not focusable | n/a | n/a | server placeholder `--:--` until the client value exists | n/a | **statement mode** (§ 6.6): `--text-title`, wraps to 2 lines, no `numeric`, same `aria-live`. Carries `MISSING_VALUE` per `legal.md` S6 |
| **Segmented option** (`period-selector.tsx`) | `--color-ink-muted` on the track, `--radius-sm`, 44px min | track tint 6% on a card, `--color-ink-onfill`/10 over a hero | ring on the **option**, `outline-ink-onfill` when over a hero | pill moves with `layoutId` | 40% opacity | n/a | n/a | n/a |
| **Collapsible disclosure** (`collapsible-panel.tsx`, `regime-field.tsx`) | `aria-expanded="false"`, chevron at 0° | border to `--color-ink-subtle` | the ring, never clipped by the panel's `overflow: hidden` | `scale(0.97)` | 40% opacity | n/a | n/a | n/a |
| **Tab link** (`calculator-views.tsx`) | active = primary button, inactive = ghost, `aria-current="page"` on the active one | per button variant | the ring | `scale(0.97)` | n/a | n/a | n/a | n/a |
| **Copy button** (`copy-button.tsx`) | `IconCopy` | per ghost | `outline-ink-onfill`, because it sits on a hero | `scale(0.97)`, `motion-reduce:active:scale-100` | n/a | n/a | n/a | n/a |
| | after copy | swaps to `IconCheck` with a polite announcement | | | | | | |
| **Alert banner** (`alert-banner.tsx`) | `--radius-lg`, hue `-soft` fill, hue `-ink` text, 1px hue at 30%, 20px icon | n/a, not interactive | n/a | n/a | n/a | n/a | `role="alert"` for danger, `role="status"` for warning | the banner is itself the empty-state channel for a missing input |

**The live-updating state, which is the one this product actually lives in.** As the user
types, the hero numeral, the day summary totals and the stat tile grid re-render. The tabular
figures mean the characters to the right of a changing digit do not move (AC5). Nothing
tweens: `DESIGN.md`'s Numbers-Don't-Move Rule. The three result surfaces carry
`aria-live="polite"`; the live clock does not.

### 6.5 Motion

| Element | Trigger | Property | Duration | Easing | Delay | Reduced motion |
|---|---|---|---|---|---|---|
| **Layout columns** (`calculator-layout.tsx`) | ~~mount~~ | ~~opacity, y~~ | ~~350ms~~ | ~~spring bounce 0~~ | ~~0~~ | **REMOVED (L1).** No animation, so no reduced path is needed. |
| View panel (`calculator-views.tsx`) | tab change | `opacity`, `y` 12px | 320ms | spring `{ bounce: 0, duration: 0.32 }` | 0 | `MotionConfig reducedMotion="user"` disables the layout spring; the opacity cross-fade survives, which is the comprehension aid |
| Any pressable | pointer-down | `transform: scale(0.97)` | `--duration-instant` 100ms | `--ease-out` | 0 | `motion-reduce:active:scale-100`, bound to the same state. A bare `motion-reduce:transform-none` loses on specificity and is forbidden |
| Button / input colour and border | hover, focus | `background-color`, `border-color` | `--duration-fast` 160ms | `--ease-standard` | 0 | Kept. The CSS reset explicitly allows `opacity, color, background-color, border-color, outline-color` |
| Segment pill | selection | `layoutId` transform | 350ms | spring `{ bounce: 0 }` | 0 | Disabled by `MotionConfig reducedMotion="user"`; the pill jumps |
| Disclosure chevron | toggle | `transform: rotate(180deg)` | `--duration-base` 220ms | `--ease-standard` | 0 | Suppressed per state; the rotation lands instantly. **Never** via a universal `transform: none`, which would move the tab bar's `-translate-x-1/2` |
| Collapsible panel | toggle | `height`, `opacity` | `--duration-base` 220ms | `--ease-out` | 0 | Opacity only |
| Hero fill | the day's meaning changes | `background-color` | `--duration-slow` 320ms | `--ease-standard` | 0 | Kept; it is a colour transition |
| Progress ring arc | value change | `stroke-dashoffset` | `--duration-data` 600ms | `--ease-out` | 0 | `useReducedMotion()` gates it directly; the arc jumps to its value. The CSS reset cannot reach a Motion-driven value |
| Modal / backdrop | open, close | `opacity`, `transform` scale 0.96 + 12px | `--duration-slow` 320ms | `--ease-out` | 0 | `@starting-style` + `allow-discrete` in CSS; the reset clamps it to a plain opacity fade |
| **Hero numeral, live clock, countdown, every stat figure** | value change | **none** | — | — | — | n/a. They never animate, for anyone |

No new animation is introduced. One is removed.

### 6.6 The hero's statement mode — resolving `content-writer`'s open dependency

`copy.md` §8 raises the one design dependency of this spec and it is correctly raised.
`legal.md` S6 rules that `MISSING_VALUE` is a **legally bound statement, not a glyph**: it must
say in words which datum is missing, and it may not be an em-dash with an `aria-label` bolted
on. The string `content-writer` wrote is `Sem carga horária`, 17 characters. `HeroPanel`
renders it through `clamp(2.5rem, 208/len cqi, 6rem)` with `whitespace-nowrap`, and the
**2.5rem floor wins**: 17 characters at 40px is 337px against a 294px content box at 390px
(390 − 32 gutter − 64 hero padding). It overflows and threatens AC14.

**`content-writer` is right that the copy does not shorten. This is a type decision and it is
mine.** The diagnosis underneath it is that a sentence was being set in the numeral step.
`DESIGN.md` says `--text-numeral` is "the one number the user came for"; a sentence explaining
why there is no number is a different kind of object and needs a different step, not a
shrunken numeral.

**The fix: `HeroPanel` gets a second value mode, decided by whether the value contains a
digit.** One existing component, one existing token, no new component and no new type step.

| | **Figure mode** (today, unchanged) | **Statement mode** (new) |
|---|---|---|
| Condition | the value contains at least one digit | the value contains no digit |
| Type step | `--text-numeral`, weight 700 | **`--text-title`**, weight 600 |
| Size | inline `clamp(2.5rem, 208/len cqi, 6rem)` | the token's own 1.5rem; **no inline clamp** |
| Figures | `numeric` utility applied | **`numeric` not applied.** Tabular figures on a sentence with no figures is meaningless |
| Wrapping | `whitespace-nowrap` | **wraps, `text-balance`, up to 2 lines** |
| Colour | `--color-ink-onfill` | `--color-ink-onfill`, unchanged, **5.58:1** on `--color-accent` |
| Element and semantics | `<p aria-live="polite">` | identical `<p aria-live="polite">`. The announcement is unchanged |
| Alignment, spacing, container | unchanged | unchanged |

**Measured fit at 390px**, Atkinson at weight 600, against the 294px content box:

| String | 40px (the old floor) | **24px (`--text-title`)** |
|---|---|---|
| `Sem carga horária` (17) | 337px — **overflows** | **202px, fits with 92px spare** |
| `Informe a carga horária` (23), `copy.md`'s stated second choice | 436px — overflows | **262px, fits** |

Wrapping is allowed rather than merely tolerated, so the slot also survives 200% zoom and the
18px root size above 1920px, where a single line would eventually run out of box.

**Why not the alternatives:**

- *Lower the `clamp` floor for the non-numeric case*, as `copy.md` suggests. It works
  arithmetically but keeps a sentence in a 700-weight tabular numeral step with an inline
  arbitrary size, which is the type error rather than the fix.
- *Let it wrap at `--text-numeral`.* Two lines of 40px bold in the hero reads as an alarm.
  The empty state is not the answer and must not look like one.
- *Shorten the copy.* Barred by S6, and `content-writer` already refused it for the right
  reason: every shorter option is either a glyph or a vague phrase that in a currency slot
  reads as "the value is zero".

This is recorded as system change **C5** in § 11, because `--text-title` is used outside the
"one `h2` per card" restriction `DESIGN.md` currently states for it. No token is added.

---

## 7. Copy slots

`content-writer` owns every string. This gate owns the slot: its role, its type step, and its
character budget at 390px. Budgets are computed from Atkinson's measured set width
(0.512 em per character averaged over the product's own pt-BR strings) against the real
content box at 390px, which is `390 − 2×16` gutter `− 2×24` card padding = **310px**.

Derived line capacity at 390px: **~43 characters** at `--text-body-sm` (14px), **~50** at
`--text-caption` (12px), **~37** at `--text-input` (18px).

| # | Slot | File | Role | Type step | Budget at 390px | Binding rule |
|---|---|---|---|---|---|---|
| S-1 | RGPS ceiling `impact` | `lib/payroll.ts:24` | Regime explanation carrying three interpolated figures and a year | `--text-body-sm` | ≤ 260 chars, ≤ 6 lines | `legal.md` S1 + S10 |
| S-2 | CLT art. 59 / Súmula 376 warning | `lib/compliance.ts:34` | Alert banner body | `--text-body-sm` | ≤ 215 chars, ≤ 5 lines | S2 |
| S-3 | DSR disclosure | `components/organisms/day-summary.tsx:221` | Footnote under the DSR figure | `--text-caption` | ≤ 150 chars, ≤ 3 lines | S3 |
| S-4 | Footer disclaimer, D1 to D4 | `components/organisms/calculator-views.tsx:79-88` | Four-paragraph gap statement | `--text-caption` | ≤ 200 chars per paragraph, ≤ 4 lines each | S4 |
| S-5 | Salary numeric-integrity line | `components/organisms/salary-calculator.tsx:126` | Danger banner body | `--text-body-sm` | ≤ 120 chars, ≤ 3 lines | S5 |
| S-6 | `MISSING_VALUE` | `components/organisms/salary-calculator.tsx:34` | The sentence shown where a figure cannot be computed | **`--text-title`** in the hero's statement mode, per § 6.6 | **≤ 24 chars on one line, ≤ 40 chars over two.** Measured: "Sem carga horária" is 202px and "Informe a carga horária" is 262px at 24px/600, against a 294px content box at 390px | S6. **Legally bound placeholder, not free copy.** See § 6.6 |
| S-7 | JSON-LD `name` and page `h1` | `lib/calculator-view.ts:9` | `sr-only` inside the `h1`, and the `schema.org` name | not visually rendered | ≤ 90 chars, one spoken breath | S7, S9 |
| S-8 | Root `alt` exports | `app/opengraph-image.tsx:3`, `app/twitter-image.tsx:3` | Accessible name of the share bitmap | not rendered | ≤ 125 chars; the two must be **identical to each other** | S8, S9.4, AC22 |
| S-9 | `custo-da-hora` `alt` exports | `app/custo-da-hora/{opengraph,twitter}-image.tsx` | Same | not rendered | ≤ 125 chars, identical to each other | S8 |
| S-10 | Tab title | `app/page.tsx:6` | Browser tab, SERP title | not rendered | ≤ 60 chars before the SERP truncates | S9 |
| S-11 | OG title | `app/page.tsx:11` | Link preview | not rendered | ≤ 60 chars | S9 |
| S-12 | OG bitmap title | `lib/og-image.tsx:14` | Rendered into a 1200×630 PNG at 80px padding | bitmap, not the app ramp | ≤ 48 chars so it holds 2 lines in the bitmap; a **permitted subset** of S-8 | S9.4 |

Three budget rules that are this gate's, not the writer's:

1. **No slot may be met by dropping a disclosure.** If a rewritten string exceeds its budget,
   the layout yields: the paragraph wraps to another line. It does not get shortened by
   removing a figure, a year, or a named gap. `spec.md` § Non-goals and `AGENTS.md` §4 rule 8.
2. **`MISSING_VALUE` no longer sits in the numeral slot.** § 6.6 gives the hero a statement
   mode, so the budget above is a real budget and not a one-glyph ceiling. The copy does not
   shorten to fit a type decision.
3. **S-8 and S-9 are pairwise identical by construction**, and S-12 may only narrow S-8, never
   diverge from it (AC22, `legal.md` S9.4).

---

## 8. Disclosure placement

Every disclosure `legal.md` requires, where it sits, and the proof it is visible beside its
number rather than hidden.

| Disclosure | Where it renders | Beside which number | Behind a collapse? | Verdict |
|---|---|---|---|---|
| **D1 to D4**, footer gap statement (S4): localStorage-only, not a holerite, not a ponto record, not legal advice, and the list of what is left out (FGTS, convenção coletiva, 13º, terço de férias, INSS/IRRF on overtime, the Súmula 60 prorrogação) | `calculator-views.tsx:79-88`, `--text-caption text-ink-subtle`, directly under the calculator, above the reserved ad slot | Every figure on the page | **No.** Plain paragraphs in the normal flow | **pass** |
| **DSR / Súmula 172 assumption** (S3) | `day-summary.tsx:221`, `--text-caption text-ink-subtle`, rendered `restDayPay > 0`, immediately after the DSR row | The DSR value, one row above | **No** | **pass** |
| **CLT art. 59 / Súmula 376 warning** (S2) | `AlertBanner` tone `warning`, `role="status"`, inside `journey-form.tsx` and `day-summary.tsx` | The overtime total that triggered it | **No.** It is a banner in flow | **pass** |
| **Salary numeric-integrity line** (S5) | `AlertBanner` tone `danger`, `role="alert"`, `salary-calculator.tsx:126`, rendered when the gross salary is absent | Directly above the `R$ 0,00` figures it explains | **No** | **pass** |
| **`MISSING_VALUE`** (S6) | The hero value slot, `salary-calculator.tsx:222` | It **is** the number's place | **No** | **pass** |
| **RGPS ceiling, R$ 8.475,55 / R$ 988,09 / 2026** (S1, S10) | `regime-field.tsx:78`, inside the `CollapsiblePanel` at `OPTIONS_PANEL_ID` | The regime the user is choosing; no figure is on screen beside it | **Yes** | **pass with a finding, below** |
| **Night premium is a floor** (S9.2, Súmula 60 II) | Part of the footer gap list at `calculator-views.tsx:83-88` | The adicional noturno row in the day summary, one card above | **No** | **pass** |

**The one finding, routed rather than solved.** S1/S10's string sits inside the regime
picker's collapsed panel. It is not a disclosure attached to a displayed figure: it is the
explanation of an option the user is actively opening in order to read it, and the panel is a
real `aria-expanded`/`aria-controls` disclosure, not a hidden div. It discloses correctly at
the moment it is relevant.

It is recorded here because a later reviewer will ask, and because pulling it out of the
collapse would be a layout change that `spec.md` § Out of scope forbids ("no layout, spacing,
hierarchy or colour change beyond what a type swap mechanically forces"). **This gate does not
move it and does not quieten it.** If `labor-law-analyst` rules at G6 that the string must be
visible without a click, that is a scope question for `product-manager`, not something this
gate may resolve by moving a disclosure somewhere quieter.

---

## 9. Accessibility

| Concern | Specification |
|---|---|
| **Roles** | `header > h1` with the visible wordmark `aria-hidden` and the `sr-only` view heading carrying the real name; `main#main-content`; `nav[aria-label="Calculadoras"]` for the tab bar with `aria-current="page"`; `fieldset`/`legend` for every segmented control and the regime picker; `role="alert"` on danger banners, `role="status"` on warnings; native `<dialog>` for modals. **Unchanged.** |
| **Tab order** | Skip link → theme toggle → the form fields in DOM order → the disclosure buttons → the tab bar links. Follows DOM order; the hero is not focusable and does not enter it. The `lg` two-column split reorders visually via `order-first` on the aside, which **does not** change DOM order, so the answer-first reading and the tab order stay consistent. **Unchanged.** |
| **Focus** | `outline: 2px solid var(--color-focus)`, offset 2px, `:focus-visible` only. `--color-focus` is `#2a62d1` in light and `#91b6f9` in dark, each ≥ 3:1 against every surface. On the two controls that live on a hero (`period-selector`, `copy-button`) the ring is explicitly `outline-ink-onfill`, **5.57:1** against `--color-accent`. **Unchanged, and re-verified after the swap.** |
| **Targets** | 44×44px minimum, 8px minimum between adjacent targets. The type swap does not change any control height: buttons stay 44/48/56, inputs stay 56, segment options stay 44. |
| **Live regions** | `aria-live="polite"` on the hero value, the day summary totals and the stat tile grid. The live clock stays silent. **Unchanged, and this is the behaviour for values that update as the user types.** |
| **Colour is never the only channel** | `+` and `−` on balances, textual duplicates of the coloured timeline segments, `aria-invalid` plus a worded banner on an errored field. **Unchanged.** |
| **Contrast, both themes** | No colour token changes, so no ratio changes. Every text-on-surface pair in `DESIGN.md` is already stated with its measurement and every one clears **4.5:1**, the small-text threshold, which means no size or weight change in § 2.4 can reclassify a pair into failure. The pairs to re-state in `reports/audit.md` (AC13): ink/surface **15.77:1** light · **15.54:1** dark; ink-muted/surface **5.87:1** · **7.49:1**; ink-muted/sunken **5.33:1** · **7.87:1**; ink-subtle/surface **5.08:1** · **5.25:1**; ink-subtle/sunken **4.61:1** · **5.51:1**; ink-subtle/canvas **4.87:1** · **5.74:1**; accent-ink/surface **6.47:1** · **8.43:1**; positive-ink/surface **6.45:1** · **9.45:1**; negative-ink/surface **6.08:1** · **6.89:1**; overtime-ink/surface **5.53:1** · **9.53:1**; night-ink/surface **6.51:1** · **8.14:1**; ink-onfill/accent **5.58:1**; ink-onfill at 90% over accent **4.85:1**; line-strong/sunken **3.05:1** light, **3.08:1** on raised dark; overtime-arc/positive-deep **5.07:1**. |
| **The measurement this change requires** | Because the typeface changes, AC12 (axe, both themes, zero critical or serious) and AC13 (every pair re-stated) are **re-run, not assumed**. A weight or optical change that lowers apparent contrast is caught there. AC5 and AC6 cover the figure legibility the ratios cannot express. |
| **Zoom** | 200% zoom and 320px CSS width produce no horizontal scroll. The ramp is in `rem`, so the user's own font-size setting scales the layout. Atkinson's narrower set width improves this margin. |

---

## 10. The Section 14 pre-flight matrix

Every box in the skill's checklist, in the skill's order, with a verdict and a one-line
reason. **AC3 requires this recorded as `evidence/preflight-matrix.md`**; this section is the
source of truth that file copies. No box is blank.

WorkLoad is a tool, not a landing page. `spec.md` § Out of scope names the landing-page boxes
one by one and forbids inventing content to satisfy one. Those are `n/a` with the reason
stated, not silently ticked.

| # | Box | Verdict | Reason |
|---|---|---|---|
| 1 | Brief inference declared (0.B) | **fail → fixed** | Was never declared. § 1.1 declares it and § 1.3 places it in `DESIGN.md`. |
| 2 | Dial values explicit and reasoned | **fail → fixed** | Were never declared. § 1.2: 3 / 2 / 5, each traced to a Section 1.A row. Not the baseline. |
| 3 | Design system chosen or aesthetic labelled honestly | **pass** | Tailwind v4 CSS-first utilities with an owned token layer, no third-party component system. Labelled as such in `DESIGN.md` Overview. |
| 4 | Redesign mode detected, audit performed | **pass** | "Redesign - preserve". The audit is spec 0001, and this spec is explicitly a compliance pass over it. |
| 5 | Zero em-dashes anywhere user-visible | **fail → fixed by `content-writer`** | Eleven occurrences enumerated in `spec.md`. Not this gate's to write; the slots are specified in § 7. AC1 is the check. |
| 6 | Page Theme Lock | **pass** | One theme for the whole page, `next-themes` with `disableTransitionOnChange`. No section inverts. |
| 7 | Colour Consistency Lock | **pass** | One accent, `--color-accent`, theme-invariant. The One Mark Rule caps it at three elements per viewport. The four data hues are licensed by the Colour-Means-a-Number Rule, not decoration. |
| 8 | Shape Consistency Lock | **pass** | One documented radius scale, `xs` 8 → `2xl` 32, with the Concentric Rule stating how it nests. |
| 9 | Button Contrast Check | **pass** | White on `--color-accent` **5.58:1**, on hover **7.30:1**, on active **8.60:1**. Danger is tinted, `--color-negative-ink` on `--color-negative-soft` **5.26:1** / **6.02:1**. |
| 10 | CTA Button Wrap | **pass** | The only persistent labels are the two tab labels ("Jornada", the salary view). Both single-line at every width. Re-verified after the swap, where every string narrows. |
| 11 | Form Contrast Check | **pass** | Input text `--color-ink` 15.77:1 / 15.54:1; placeholder `--color-ink-subtle` 5.08:1 / 5.25:1; label `--color-ink-muted` 5.87:1 / 7.49:1; hint on sunken 4.61:1 / 5.50:1; border `--color-line-strong` 3.05:1 minimum; focus ring ≥ 3:1. |
| 12 | Serif discipline | **n/a** | No serif. `spec.md` § Non-goals bans one outright: this is a tool that displays money. |
| 13 | Premium-consumer palette check | **n/a** | Not a premium-consumer brief. The palette is a cool near-achromatic ramp at hue 264 with a cobalt accent, nowhere near the beige/brass family. |
| 14 | Italic descender clearance | **n/a** | No italic anywhere in the product. The Atkinson italic face is deliberately not loaded. |
| 15 | Hero fits the viewport | **n/a** | `spec.md` rules it out by name. The "hero" here is a data panel carrying one number, not a marketing hero. It does fit, at all four widths, asserted by Playwright. |
| 16 | Hero top padding cap | **n/a** | Same. Padding is `--spacing-xl` / `--spacing-2xl`, from the spacing scale. |
| 17 | Hero stack discipline | **n/a** | Same. The panel holds an eyebrow, a value, a ring and an optional footer, all of them data. |
| 18 | Eyebrow count ≤ ceil(sections / 3) | **n/a** | Landing-page mechanic. The product's `--text-overline` is a **data label** above a value or a stat tile, not a section eyebrow, and removing it would remove the name of the number. `spec.md` names this box out of scope. |
| 19 | Split-Header Ban | **n/a** | No section headers of that shape exist. |
| 20 | Zigzag Alternation Cap | **n/a** | No image-plus-text splits. |
| 21 | No Duplicate CTA Intent | **pass** | There is no CTA. The two tabs are navigation between two calculators and carry distinct intents. |
| 22 | Logo wall = logo only | **n/a** | No logo wall. Out of scope by name. |
| 23 | Bento Background Diversity | **n/a** | No bento grid. Out of scope by name. |
| 24 | "Used by / Trusted by" placement | **n/a** | No social proof anywhere. |
| 25 | Copy Self-Audit | **deferred to G4/G6** | Every visible string is pt-BR and legally bound. `content-writer` re-reads at G4, `labor-law-analyst` re-checks at G6 against S1 to S10. Not this gate's. |
| 26 | Motion motivated, one sentence each | **fail → fixed** | Every animation in § 6.5 has a justification except the layout column mount fade, which had none. **L1 removes it.** After L1 every remaining animation is press feedback, a state transition, or the data sweep. |
| 27 | Marquee max one per page | **n/a** | No marquee. |
| 28 | Navigation on one line, ≤ 80px | **pass** | Header is `--header-height`, 64px below `md` and 80px from `md`. One line at every width. The tab bar is two items. |
| 29 | Section-Layout-Repetition | **n/a** | Not a sectioned page. One calculator per route. |
| 30 | Bento rhythm and exact cell count | **n/a** | No bento. The stat grid renders exactly as many tiles as there are figures, with no blank cell, which satisfies the spirit anyway. |
| 31 | Long lists use the right component | **pass** | The day summary is 7 rows at most and uses labelled rows with a single hairline rule between sections, not a `divide-y` over a long list. |
| 32 | Real images, no div-based fake screenshots | **pass** | The product ships **no images at all**, which is the honest answer for an instrument. The progress ring is real data drawn as SVG, not decoration. |
| 33 | No pills or labels overlaid on images | **n/a** | No images. |
| 34 | No photo-credit captions | **n/a** | No images. |
| 35 | No version footers | **n/a** | None present. Out of scope by name. |
| 36 | No micro-meta-sentences under eyebrows | **pass** | The text under a data label is the value it labels. |
| 37 | No decoration text strip at hero bottom | **pass** | The hero footer, when present, carries a real figure, not a strip. |
| 38 | No floating top-right sub-text | **pass** | None. The header's right side holds the live clock and the theme toggle, both functional. |
| 39 | No scoring bars with filled tracks | **pass** | The progress ring has a track because it is a **gauge showing elapsed against expected**, which is a real quantity, not a landing-page comparison visual. The box bans decorative comparison bars; this is the instrument. |
| 40 | No locale / city / time / weather strips | **pass** | The header clock is the **subject matter** of a journey calculator, not atmosphere, and it is `aria-hidden` with no locale or weather attached. |
| 41 | No scroll cues | **pass** | None. Out of scope by name. |
| 42 | No version labels in hero | **pass** | None. |
| 43 | No section-numbering eyebrows | **pass** | None. |
| 44 | No decorative dots | **pass** | None. The only coloured marks are data hues carrying a value. |
| 45 | No `border-t` + `border-b` on every row | **pass** | Internal separation is a single `--color-line-faint` rule between card sections, never per row. |
| 46 | Content density sane | **pass** | `VISUAL_DENSITY: 5`. No 20-row table. Every figure is a real computed value; the "fake-precise specs" the box guards against do not exist here because `PRODUCT.md` §4 forbids an untraceable number. |
| 47 | Quotes ≤ 3 lines, clean attribution | **n/a** | No quotes or testimonials. Out of scope by name. |
| 48 | Motion claimed = motion shown | **n/a** | Triggers only at `MOTION_INTENSITY > 4`. Declared value is **2**, so the box does not apply. The product does animate what it says it animates. |
| 49 | GSAP sticky-stack / horizontal-pan skeleton | **n/a** | No GSAP, no scroll hijack, and none wanted. Out of scope by name. |
| 50 | No `window.addEventListener('scroll')` | **pass** | Verified: no scroll listener in `app/**` or `components/**`. Scroll-linked chrome is CSS. |
| 51 | Reduced motion wrapped for `MOTION_INTENSITY > 3` | **pass** | Below the trigger at 2, and honoured anyway: a scoped CSS reset, per-state neutralisers such as `motion-reduce:active:scale-100`, `MotionConfig reducedMotion="user"`, and `useReducedMotion()` on the ring. The universal `transform: none` reset is explicitly forbidden because the product uses `transform` for layout. |
| 52 | Dark mode tokens defined and tested in both modes | **pass** | Both themes authored, not derived. Axe runs in both (AC12), Playwright runs in both (AC14). |
| 53 | Mobile collapse explicit | **pass** | Every multi-column layout declares its fallback in the same component: `grid-cols-1 lg:grid-cols-12`, `grid-cols-1 sm:grid-cols-2`, `order-first lg:order-none`. |
| 54 | Viewport stability, `min-h-[100dvh]` never `h-screen` | **fail → fixed** | One occurrence, `calculator-page.tsx:20`. § 4: `min-h-dvh`. |
| 55 | `useEffect` animations have cleanup | **pass** | No `useEffect` drives an animation. The timer hooks (`use-current-time`) clear their interval; verified at 0001 and re-checked here. |
| 56 | Empty / loading / error states provided | **pass** | Empty: `MISSING_VALUE` plus a worded banner naming the missing input. Error: border, `aria-invalid`, and a worded banner (`The Error Has Words Rule`). Loading: the server placeholder `--:--` until the client value exists. All three in § 6.4. |
| 57 | Cards omitted in favour of spacing where possible | **pass** | Three cards on a route, each carrying real elevation hierarchy. Sub-panels are tonal (`--color-surface-sunken`), not nested cards. |
| 58 | Icons from an allowed library, no hand-rolled SVG | **fail → fixed** | `lucide-react` in 12 files. § 3: `@tabler/icons-react`, mapped one for one. No hand-rolled icon SVG exists; the progress ring is data. |
| 59 | Motion isolated in client leaves with `'use client'`, memoised | **pass** | `motion` is used in `calculator-layout.tsx` (both usages removed by L1) and `calculator-views.tsx`, both `"use client"` leaves. |
| 60 | No AI Tells from Section 9 | **fail → fixed** | The only Section 9 tell present was **Inter as default** (9.B). § 2 replaces it. No AI-purple, no three-equal cards, no Jane Doe, no Acme, no "Quietly in use at": the product has no marketing copy at all. |
| 61 | Core Web Vitals plausible (LCP < 2.5s, INP < 200ms, CLS < 0.1) | **fail → fixed, pending measurement** | LCP 2.8s. § 5: L1 and L2 are decided here, L3 is routed to `tech-lead`. Settled by AC7 and AC8, not by this document. |
| 62 | One design system per project | **pass** | One token layer in `app/globals.css`, no mixed component systems. |

**Count: 62 boxes. 32 pass, 8 fail with the fix specified, 21 n/a with the reason, 1 deferred
to a later gate.** The eight failures are boxes **1, 2, 5, 26, 54, 58, 60 and 61**. Box 5 is
fixed by `content-writer`, not here. Box 61 is fixed here in design and settled by a
measurement at G7, not by this document.

---

## 11. System changes to `DESIGN.md`

Five changes. **None of them adds a token, a type step, a curve, a colour or an elevation
level**, so none is a human approval point under `AGENTS.md` §4. One fills a documented
absence, one changes the *value* of existing tokens (which `spec.md` R1 explicitly requires),
one corrects two factual claims, one renames a library, and one widens where an existing type
step may be used.

| # | Change | What it replaces | Justification |
|---|---|---|---|
| **C1** | New `## Design Read and Dials` section after `## Overview`. Exact text in § 1.3. | Nothing. It fills an absence. | AC4. The skill's Sections 0.B and 1 require both to be declared; the next design gate inherits them instead of re-deriving them. |
| **C2** | Typography: the family becomes `Atkinson Hyperlegible Next`, the variable becomes `--font-hyperlegible`, and the eleven steps take the re-tuned leading and tracking in § 2.4. Frontmatter `typography.*.fontFamily` and `app/globals.css` `--text-*` move together. | Inter, and the ramp tuned to Inter's metrics. | `spec.md` § The inviolable constraint and AC17. Values are re-measured, not copied; a copied ramp is an R1 failure. **No new step, no size change.** |
| **C3** | Typography prose corrections: (a) the paragraph claiming Inter's `opsz` axis does the optical work is replaced by a statement that per-step tracking does it, because Atkinson has only a `wght` axis; (b) the two claims that `zero` / slashed-zero removes the 0/O ambiguity are replaced by the measured fact in § 2.2, that Google's subsetter drops `zero` and the disambiguation now comes from the default glyph. The `numeric` utility keeps `slashed-zero` and is correct for the first time. | Two statements that were false about the shipped build. | `PRODUCT.md` §4's own standard applied to the design system: a claim the artefact cannot back does not ship. |
| **C4** | `### Iconography` heading: `lucide-react` → `@tabler/icons-react`; `strokeWidth` → `stroke` in the stroke rule. The five named rules are unchanged. | The library name only. | AC9. The rules survive because Tabler shares Lucide's 24px grid and 2px stroke. |
| **C5** | Two one-line prose amendments for the hero's statement mode (§ 6.6): in `## Typography`, the **Title** bullet gains "and the hero's statement mode, where the value is a sentence rather than a figure"; in `### Hero panel`, a sentence stating that a value with no digit renders at `--text-title`, wrapping to at most two lines, without the `numeric` utility. | The implicit assumption that the hero value is always a number, which produced an overflow at 390px the moment `legal.md` S6 required a worded placeholder. | Forced by S6 and by `copy.md` §8, measured in § 6.6. **No new token, no new type step, no new component**: an existing step used in one more place, with the place named so the Type-Step-Is-Not-a-Colour discipline still holds. |

**One addition that is not a `DESIGN.md` change but must not be lost:** `calculator-layout.tsx`
loses its mount animation (L1). `DESIGN.md`'s motion section already lists what may animate,
and a page-entry fade was never on that list, so the document needs no edit. The deletion is
recorded in `STATUS.md`.

**Nothing here requires a human approval point.** If `tech-lead` or `qa-engineer` disagrees on
that reading, the disagreement is about C2, and the answer is that `spec.md` R1 commissioned
the re-tune in writing.

---

## 12. Open items routed elsewhere

| # | Item | Routed to | Why not decided here |
|---|---|---|---|
| O1 | The two third-party `preconnect`s in `app/layout.tsx` | `tech-lead` at G5, under `PRODUCT.md` §8 | It is a third-party loading decision with a measurement attached, not a design token. § 5.2 L3 states the rule that decides it. |
| O2 | `IconCurrencyDollar` on a Brazilian salary tab | a future spec | Changing it changes a meaning; `spec.md`'s mapping default is one for one. |
| O3 | S1/S10's RGPS disclosure living inside the regime collapse | `product-manager`, only if `labor-law-analyst` raises it at G6 | Moving it is a layout change this spec forbids. A legal rejection is never answered by relocating a disclosure. |
| O4 | The `--text-caption` / `--text-overline` size contingency | `frontend-dev`, pre-authorised | Specified with exact values in § 2.5 so no one has to ask. |
