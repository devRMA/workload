---
name: WorkLoad
description: An instrument for a CLT worker standing at a time clock — honest numbers, one decisive voice, nothing decorative in the way.
colors:
  canvas: "#f9fafc"
  canvas-dark: "#0f1116"
  surface: "#ffffff"
  surface-dark: "#181b21"
  surface-sunken: "#f2f4f7"
  surface-sunken-dark: "#13161b"
  surface-raised: "#ffffff"
  surface-raised-dark: "#21252b"
  ink: "#1e232c"
  ink-dark: "#f2f3f6"
  ink-muted: "#5f656f"
  ink-muted-dark: "#a6abb5"
  ink-subtle: "#696f79"
  ink-subtle-dark: "#898e98"
  ink-onfill: "#ffffff"
  line: "#e0e2e6"
  line-dark: "#2b2e35"
  line-faint: "#ebedf0"
  line-faint-dark: "#23262c"
  line-strong: "#888c95"
  line-strong-dark: "#6a707a"
  accent: "#2a62d1"
  accent-hover: "#184fbb"
  accent-active: "#1245a8"
  accent-ink: "#1f57c7"
  accent-ink-dark: "#91b6f9"
  accent-soft: "#ecf1fb"
  accent-soft-dark: "#1c2944"
  positive: "#188646"
  positive-dark: "#46b86e"
  positive-ink: "#0a6d37"
  positive-ink-dark: "#6ad58b"
  positive-soft: "#eaf4ee"
  positive-soft-dark: "#183028"
  positive-deep: "#085e2f"
  negative: "#ca262e"
  negative-dark: "#ee5955"
  negative-ink: "#bf2029"
  negative-ink-dark: "#f98078"
  negative-soft: "#faebec"
  negative-soft-dark: "#3c1d24"
  negative-deep: "#9b171f"
  overtime: "#c48019"
  overtime-dark: "#eb9f37"
  overtime-ink: "#905e16"
  overtime-ink-dark: "#f8b35d"
  overtime-soft: "#faf4ea"
  overtime-soft-dark: "#3a2f1f"
  overtime-arc: "#ffc563"
  night: "#8a4ada"
  night-dark: "#a87eeb"
  night-ink: "#793bc3"
  night-ink-dark: "#c2a3fa"
  night-soft: "#f4effc"
  night-soft-dark: "#2f2446"
typography:
  numeral:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 20cqi, 6rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
    fontVariation: "opsz auto"
    fontFeature: "tnum, zero"
  display:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.024em"
  title:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.018em"
  metric:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.016em"
    fontFeature: "tnum, zero"
  heading:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.011em"
  input:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.005em"
    fontFeature: "tnum, zero"
  body:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  body-sm:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.003em"
  label:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.005em"
  caption:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: "0.01em"
  overline:
    fontFamily: "var(--font-inter), system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "28px"
  2xl: "32px"
  full: "9999px"
spacing:
  hair: "2px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink-onfill}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.ink-onfill}"
  button-primary-active:
    backgroundColor: "{colors.accent-active}"
    textColor: "{colors.ink-onfill}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 24px"
    height: "48px"
  button-outline-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
  button-danger:
    backgroundColor: "{colors.negative-soft}"
    textColor: "{colors.negative-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    height: "48px"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.input}"
    rounded: "{rounded.md}"
    padding: "0 16px"
    height: "56px"
  input-field-error:
    backgroundColor: "{colors.negative-soft}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  panel-sunken:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  hero:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink-onfill}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  segment-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    height: "44px"
  segment-option-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.accent-ink}"
    rounded: "{rounded.sm}"
  stat-tile:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  alert-warning:
    backgroundColor: "{colors.overtime-soft}"
    textColor: "{colors.overtime-ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  alert-danger:
    backgroundColor: "{colors.negative-soft}"
    textColor: "{colors.negative-ink}"
    rounded: "{rounded.lg}"
    padding: "16px"
  nav-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    height: "48px"
  nav-tab-active:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.ink-onfill}"
    rounded: "{rounded.sm}"
---

# Design System: WorkLoad

## Overview

**Creative North Star: "The Honest Instrument"**

WorkLoad is not an app about work; it is a gauge you glance at. The person holding it is standing at a time clock with one thumb free, possibly in a badly lit corridor, and they want a single number: *when can I go home?* Everything in this system is built to deliver that number faster and more truthfully than anything else on their screen, and then get out of the way. The reference object is not a fintech dashboard — it is a well-made measuring tool: a caliper, an altimeter, a Braun stopwatch. Tools like that have exactly one colored mark on them, and the mark means something.

The system is therefore **quiet everywhere except where a number lives**. Chrome is neutral, near-achromatic, and translucent so content passes under it. Cards are flat planes separated by tone and a hairline, not by drop shadows competing for depth. There is one accent — a deep cobalt — and it is reserved for the things the user acts on: the primary button, the active tab, the focus ring, the mark in the logo. Every other color on screen is not decoration but *data*: green means you are in credit, red means you owe time, amber means overtime, violet means the night premium. If a color appears, it is saying something measurable. That is the whole discipline.

The predecessor system had six competing accent hues, two different reds, and no tokens at all — every color was typed inline twice, once for light and once for dark. That is the anti-reference. So is the blurred gradient field behind the page, the `font-black` headline weight, and the 700ms color crossfade on the hero. Loud where it should be silent, slow where it should be immediate.

**Key Characteristics:**

- One accent. Everything else is neutral or a data color with a defined meaning.
- Numbers are typographically first-class: tabular figures, slashed zero, tight optical tracking, and the largest type in the product.
- Depth by tone and hairline, not by shadow stacks. Shadows respond to state; they are not applied at rest.
- Motion is spring-based, interruptible, and under 320ms. Live numbers never animate.
- Both themes are authored, not derived. Every pair is contrast-verified.
- Type, spacing and radius all scale from `rem`, so the whole product grows with the user's text size and with the display.

## Colors

The palette is a cool near-achromatic neutral ramp (hue 264, chroma ≤ 0.018) carrying a single saturated cobalt accent and four data hues that are never used as chrome. All values are authored in OKLCH for perceptual evenness and shipped as hex for portability; the frontmatter is normative.

### Primary

- **Cobalt Signal** (`--color-accent`, `#2a62d1`): The only accent in the product, and it is theme-invariant — the same fill in light and dark, so the primary action is the same object in both worlds. It fills the primary button, the active calculator tab, the logo mark, and the salary hero. Against white it measures **5.58:1**; against the dark surface `#181b21` it measures **3.09:1**, clearing the 3:1 floor for a control boundary. White label text on it measures **5.58:1**.
- **Cobalt Signal Pressed** (`--color-accent-hover` `#184fbb`, `--color-accent-active` `#1245a8`): The fill darkens on hover and darkens again on press, in both themes. White on hover is **7.30:1**; white on active is **8.60:1**. Darkening rather than lightening in dark mode is deliberate: any lighter cobalt drops white-on-fill below 4.5:1.
- **Cobalt Ink** (`--color-accent-ink`, light `#1f57c7` / dark `#91b6f9`): Cobalt as *text or icon*, never as a fill. Light on surface **6.47:1**, on canvas **6.19:1**, on sunken **5.87:1**. Dark on surface **8.43:1**, on canvas **9.23:1**, on raised **7.52:1**.
- **Cobalt Wash** (`--color-accent-soft`, light `#ecf1fb` / dark `#1c2944`): A tinted plane behind an accent icon or a selected option. `--color-accent-ink` on it measures **5.71:1** light and **7.08:1** dark.

### Secondary

There is no secondary accent. The product has one voice; a second would have to mean something, and nothing in the product needs it.

### Tertiary — the data hues

These four are the exception to the one-accent rule, and each is licensed because it encodes a fact a user must read at a glance. They never appear in chrome, never fill a button, and never tint a page.

- **Credit Green** (`--color-positive` light `#188646` / dark `#46b86e`; `--color-positive-ink` light `#0a6d37` / dark `#6ad58b`; `--color-positive-soft` light `#eaf4ee` / dark `#183028`; `--color-positive-deep` `#085e2f`): A positive day balance, hours you are owed, the on-track hero. Ink on surface **6.45:1** light, **9.45:1** dark. Ink on its own soft plane **5.74:1** / **7.71:1**. `--color-positive-deep` is the hero fill only; white on it is **7.92:1**.
- **Debit Red** (`--color-negative` light `#ca262e` / dark `#ee5955`; `--color-negative-ink` light `#bf2029` / dark `#f98078`; `--color-negative-soft` light `#faebec` / dark `#3c1d24`; `--color-negative-deep` `#9b171f`): A negative balance, total deductions, a destructive action, an input the app cannot parse. One red, hue 25 — the predecessor's split between `rose-*` and `red-*` is abolished. Ink on surface **6.08:1** light, **6.89:1** dark; on its own soft plane **5.26:1** / **6.02:1**. White on `--color-negative-deep` is **8.28:1**.
- **Overtime Amber** (`--color-overtime` light `#c48019` / dark `#eb9f37`; `--color-overtime-ink` light `#905e16` / dark `#f8b35d`; `--color-overtime-soft` light `#faf4ea` / dark `#3a2f1f`; `--color-overtime-arc` `#ffc563`): The overtime arc of the progress ring, the overtime segment of the day timeline, the extra-hours rows, and every compliance warning. Ink on surface **5.53:1** light, **9.53:1** dark. Ink on its own soft plane **5.05:1** / **7.22:1**. The non-text `--color-overtime` on surface is **3.26:1** light, **7.84:1** dark, clearing the 3:1 graphical floor. Amber is the one hue the predecessor got closest to right and the one most often used below contrast; the light value is deliberately darker than a stock `amber-500`. `--color-overtime-arc` is a fifth, theme-invariant token licensed for one use only: against the hero fills the progress ring sits on, `--color-overtime` drops to **2.43:1** (`positive-deep`) and **2.54:1** (`negative-deep`) — below the 3:1 graphical floor, and a regression against the predecessor's `amber-300` (3.80:1, passing). `--color-overtime-arc` measures **5.07:1** against `--color-positive-deep`, **5.31:1** against `--color-negative-deep`, and **3.12:1** / **3.55:1** against the `--color-ink-onfill/20` ring track it overlays.
- **Night Violet** (`--color-night` light `#8a4ada` / dark `#a87eeb`; `--color-night-ink` light `#793bc3` / dark `#c2a3fa`; `--color-night-soft` light `#f4effc` / dark `#2f2446`): The art. 73 night premium and the reduced night hour, and nothing else. It sits 38° of hue from the accent and is never placed adjacent to a cobalt fill. Ink on surface **6.51:1** light, **8.14:1** dark. Ink on its own soft plane **5.76:1** / **6.78:1**.

### Neutral

- **Paper** (`--color-canvas`, light `#f9fafc` / dark `#0f1116`): The page. Never white in light mode — a hair of cool grey so that `--color-surface` white cards read as lifted planes without a shadow.
- **Card** (`--color-surface`, light `#ffffff` / dark `#181b21`): Every calculator card, every modal body.
- **Inset** (`--color-surface-sunken`, light `#f2f4f7` / dark `#13161b`): Panels recessed into a card — the journey settings drawer, the tax details panel, stat tiles. In light mode it is *darker* than the card; in dark mode it is *darker* than the card too. Recession always reads as darker, in both themes, so the mental model never inverts.
- **Raised** (`--color-surface-raised`, light `#ffffff` / dark `#21252b`): Floating chrome and modals. In light mode it equals the card and is separated by shadow; in dark mode it is lighter than the card and separated by tone, because shadows do not exist on near-black.
- **Ink** (`--color-ink`, light `#1e232c` / dark `#f2f3f6`): Body and heading text, and every number. **15.77:1** on light surface, **15.54:1** on dark surface.
- **Ink Muted** (`--color-ink-muted`, light `#5f656f` / dark `#a6abb5`): Field labels, supporting sentences, inactive tabs. **5.87:1** / **7.49:1** on surface; **5.33:1** / **7.87:1** on sunken; **5.62:1** / **8.20:1** on canvas.
- **Ink Subtle** (`--color-ink-subtle`, light `#696f79` / dark `#898e98`): Hints, placeholders, the legal footnote. The floor of the text ramp and still AA on every surface it may touch: **5.08:1** / **5.25:1** on surface, **4.61:1** / **5.51:1** on sunken, **4.87:1** / **5.74:1** on canvas. Nothing lighter than this may carry text. The light value was corrected from a planned `#6b707a`, which measured **4.4966:1** on `--color-surface-sunken` — below the 4.5 floor, on the exact panels (journey settings, tax details) where hints and placeholders sit.
- **Ink on Fill** (`--color-ink-onfill`, `#ffffff` in both themes): Text over the accent, the hero, and any saturated fill. Theme-invariant because the fills it sits on are theme-invariant.
- **Hairline** (`--color-line`, light `#e0e2e6` / dark `#2b2e35`): The default border of a card or a non-interactive container. Structural only.
- **Hairline Faint** (`--color-line-faint`, light `#ebedf0` / dark `#23262c`): Internal dividers between sections of one card.
- **Control Edge** (`--color-line-strong`, light `#888c95` / dark `#6a707a`): The border of anything the user can type into or click. Light: **3.36:1** on surface, **3.05:1** on sunken, **3.22:1** on canvas. Dark: **3.45:1** on surface, **3.08:1** on raised, **3.63:1** on sunken, **3.78:1** on canvas — it exists specifically to satisfy WCAG 1.4.11, which the predecessor's `border-neutral-200` (**1.24:1**) failed. Both values were corrected from a planned `#8c919a` (2.88:1 on sunken) and `#666b76` (2.89:1 on raised), each below the 3:1 floor on the sunken panels and raised modals that inputs and outline buttons actually sit on.
- **Chrome** (`--color-chrome`, light `rgb(255 255 255 / 0.72)` / dark `rgb(24 27 33 / 0.72)`): The translucent base of the header and the floating tab bar, always paired with `--blur-chrome`.
- **Scrim** (`--color-scrim`, `rgb(15 17 22 / 0.6)` in both themes): The modal backdrop. Theme-invariant — a dimming layer is a dimming layer.
- **Edge Highlight** (`--color-edge-highlight`, light `rgb(255 255 255 / 0)` / dark `rgb(255 255 255 / 0.06)`): A 1px inner top border on raised dark surfaces — the light catching the edge of a real material. Zero in light mode, where shadow does the same job.
- **Focus** (`--color-focus`, light `#2a62d1` / dark `#91b6f9`): The focus ring. It is cobalt in light and the lighter Cobalt Ink in dark, so it clears 3:1 against every surface in both themes.
- **Selection** (`--color-selection`, `--color-accent-soft`): Text selection. One value for the whole product; the predecessor changed selection colour per tab, which told the user nothing.

### Named Rules

**The One Mark Rule.** Cobalt appears on at most **three** elements in any viewport, and each of them is something the user can act on. If a fourth cobalt thing appears, one of them was decoration — delete it.

**The Colour-Means-a-Number Rule.** Green, red, amber and violet are reserved for values. A green button, an amber card background, a red heading with no red number under it — all forbidden. If you cannot name the quantity the colour encodes, use a neutral.

**The One Red Rule.** There is exactly one red (hue 25). `rose`, `red`, `crimson` and any second failure hue do not exist in this system.

**The Recession Rule.** Sunken is always darker than its parent, in both themes. Never invert the depth model between light and dark.

## Typography

**Display, Body, Numeral and Label Font:** Inter Variable (`next/font/google`), with `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` as the fallback stack.

**Character:** One family, four weights, eleven steps. Inter is here because it was drawn for exactly this problem — small text read quickly on a phone at a bad angle — and because its variable `opsz` axis lets the same family be a 11px overline and a 96px clock without either looking like a scaled-up version of the other. It is loaded as a variable face with `font-optical-sizing: auto`, so the letterforms genuinely change shape with size rather than merely stretching.

**There is no second family, and in particular no monospace.** The predecessor set every input and every figure in `font-mono` — an *undefined* fallback stack that resolves to Courier or DejaVu Sans Mono on most Android devices, which is the worst possible face for the one thing this product exists to show. Inter's tabular figures (`tnum`) give perfect column alignment, and its slashed zero (`zero`) removes the 0/O ambiguity, at no extra byte. A numbers product does not need a typewriter; it needs figures that line up. The `numeric` utility (`@utility numeric { font-variant-numeric: tabular-nums slashed-zero }`) is applied to every element that renders a quantity.

### Hierarchy

Weights are limited to four: `--font-weight-normal` 400, `--font-weight-medium` 500, `--font-weight-semibold` 600, `--font-weight-bold` 700. Tracking is size-specific in every step — never a single value across the ramp.

- **Numeral** (`--text-numeral`, 700, `clamp(2.5rem, 20cqi, 6rem)`, leading 1, tracking −0.035em, tabular + slashed zero): The one number the user came for. The exit time in the work hero, the period value in the salary hero. Container-query sized so it fills its panel at any width instead of being clamped by the viewport. This is the only step allowed above 2rem.
- **Display** (`--text-display`, 700, 2rem/32px, leading 1.1, tracking −0.024em): Modal titles only — the reset confirmation, the privacy dialog, the weekly-video prompt.
- **Title** (`--text-title`, 600, 1.5rem/24px, leading 1.2, tracking −0.018em): The one `h2` at the top of each calculator card: "Sua Jornada", "Custo da Hora".
- **Metric** (`--text-metric`, 600, 1.5rem/24px, leading 1.15, tracking −0.016em, tabular + slashed zero): A secondary figure that still deserves weight — the day balance, a stat tile value, the ring's centre timer. Same size as Title but tighter and tabular, so a number and a heading at the same optical size never read as the same kind of thing.
- **Heading** (`--text-heading`, 600, 1.125rem/18px, leading 1.3, tracking −0.011em): Section heads inside a card — "Seu Dia", "Resumo Financeiro".
- **Input** (`--text-input`, 500, 1.125rem/18px, leading 1.2, tracking +0.005em, tabular + slashed zero): Every text field. 18px is above the iOS zoom-on-focus threshold and is the smallest size at which a mistyped digit is caught without effort.
- **Body** (`--text-body`, 400, 1rem/16px, leading 1.55, tracking 0): Explanatory prose. Capped at 68ch.
- **Body Small** (`--text-body-sm`, 400, 0.875rem/14px, leading 1.5, tracking +0.003em): Row text in the day summary, regime descriptions, list items. The workhorse of the product.
- **Label** (`--text-label`, 500, 0.875rem/14px, leading 1.2, tracking +0.005em): Field labels, button labels, tab labels. Shares its size with Body Small and separates by weight and leading, not size — hierarchy from weight is the Apple move and it costs no vertical space.
- **Caption** (`--text-caption`, 400, 0.75rem/12px, leading 1.45, tracking +0.01em): Hints under a field, the privacy and disclaimer footnotes, ad labels.
- **Overline** (`--text-overline`, 600, 0.6875rem/11px, leading 1.2, tracking +0.08em, uppercase): The eyebrow above a hero value and above a stat tile. The only uppercase in the product, and the only step with tracking above +0.01em — uppercase without added tracking is unreadable at 11px.

### Named Rules

**The 700 Ceiling.** Nothing is heavier than 700. `font-black` (900) and `font-extrabold` (800) do not exist here. Weight above 700 in Inter stops adding emphasis and starts adding noise.

**The Tracking-Follows-Size Rule.** Tracking is negative above 1.125rem, zero at body, and positive below 0.875rem. A single `letter-spacing` applied across the ramp is wrong somewhere by definition.

**The Tabular Rule.** Every digit that represents a quantity, a time, or money carries the `numeric` utility. A column of times that shifts horizontally as the seconds tick is a defect, not a rendering artifact.

**The One Voice per Card Rule.** A card has exactly one Title. Everything below it is Heading or smaller. Two 24px headings in one card means the card should have been two cards.

**The Type-Step-Is-Not-a-Colour Rule.** `text-label`, `text-input`, `text-caption` and the rest of the eleven type steps are Tailwind font-size utilities, but their names are indistinguishable from colour utilities to `tailwind-merge`'s default config. `lib/utils.ts`'s `cn()` therefore calls `extendTailwindMerge` with all eleven steps registered as `font-size`; without it, a caller's size class silently deletes the component's own colour class. This is not theoretical — it produced a real **3.77:1** failure on "Salvar Preferências" (black text on `--color-accent`) before the merge config carried the fix. Every consumer of this ramp goes through `cn()`.

## Layout

The spatial model is a single column that earns a second one only when there is genuinely room for both.

**Spacing scale.** Base unit 4px (`--spacing: 0.25rem`), but only eight steps are sanctioned and everything else is a bug: **2, 8, 12, 16, 24, 32, 48, 64** (`--spacing-hair`, `-xs`, `-sm`, `-md`, `-lg`, `-xl`, `-2xl`, `-3xl`). The rhythm they express: 8px binds a label to its field, 12px separates sibling rows, 16px is the internal padding of a compact control, 24px is a card's padding on a phone and the gap between cards, 32px is a card's padding from `sm` up, 48px separates major regions, 64px is the page's top and bottom breathing room.

**Container.** `--container-app` is `80rem` (1280px) up to 1919px and `100rem` (1600px) from 1920px. The page gutter is `--spacing-md` (16px) below `sm`, `--spacing-lg` (24px) from `sm`, `--spacing-xl` (32px) from `lg`.

**The two-column split.** Below `lg` (1024px) everything is one column and **the hero comes first** — the person on a phone must see the answer before the inputs that produced it. At `lg` and above, a 12-column grid splits 7 (form and summary) / 5 (hero), the hero moves to the right, and it sticks at `--header-height + --spacing-xl` while the form scrolls.

**Density at the five reference widths.**

| Width | Columns | Root size | Gutter | Card padding | Notes |
|---|---|---|---|---|---|
| **390** (phone) | 1, hero first | 16px | 16px | 24px | Bottom tab bar floats above `env(safe-area-inset-bottom)`; content reserves `--spacing-3xl` below. Form fields are full width; date and time stack. |
| **768** (tablet) | 1, hero first | 16px | 24px | 32px | Paired fields go two-up at `sm` (640px). Header shows the live clock. |
| **1440** (laptop) | 12 → 7/5 | 16px | 32px | 32px | Container 1280px. Hero sticky. This is the width the system is drawn at. |
| **2560** (QHD) | 12 → 7/5 | 18px | 32px | 32px | Container 1600px. **The layout does not change — the whole system scales**, because every value is in `rem`. The card that was 1280px of content is now physically the same size on a larger panel instead of a postage stamp in a field of margin. |
| **3840** (4K) | 12 → 7/5 | 18px | 32px | 32px | Container stays 1600px and the root size stays 18px. Beyond QHD the viewer is further away, not closer; adding a third column or more scale would break the one-glance reading. Extra width becomes margin, deliberately. |

Root scaling is the mechanism: `html` is 16px, 17px from 1920px, 18px from 2560px. Nothing else in the system knows this happened.

**Breakpoints.** `sm` 640px (fields go two-up), `md` 768px (header clock appears), `lg` 1024px (the two-column split), `xl` 1280px, `2xl` 1536px, and `wide` 1920px (container and root-size step). The predecessor's arbitrary `min-[1980px]` for side ads becomes `wide`.

### Named Rules

**The Answer-First Rule.** On any viewport under 1024px, the hero panel is the first thing in the DOM order and the first thing on screen. Inputs come after the answer they produce.

**The Eight Steps Rule.** If a gap is not one of 2, 8, 12, 16, 24, 32, 48, 64, it is wrong. There is no 20px and no 40px.

**The Scale-Don't-Reflow Rule.** Above 1920px the product gets bigger, not busier. New columns, new panels and revealed-on-wide content are forbidden.

## Elevation & Depth

**Depth is tonal first, translucent second, and shadowed last.** Three layers exist and they are distinguished by surface lightness and a hairline before any shadow is considered: canvas → surface → raised, with sunken recessed below surface. In dark mode this is the *only* mechanism, because a shadow on `#0f1116` is invisible and the predecessor's `dark:shadow-none` was the correct instinct written by hand in one place.

Shadows are a **response to state**, not a property of an object. A card at rest has none. A floating layer — the header, the tab bar, a modal — has one because it genuinely overlaps content. A control that the user is pressing or dragging gets one because it left the plane.

### Shadow Vocabulary

- **`--shadow-card`** (`0 1px 2px rgb(15 17 22 / 0.04), 0 8px 24px -16px rgb(15 17 22 / 0.12)`): The ambient contact shadow of a card in light mode. In dark mode this token resolves to `none` and `--color-line` carries the separation.
- **`--shadow-raised`** (`0 2px 6px rgb(15 17 22 / 0.06), 0 20px 48px -24px rgb(15 17 22 / 0.22)`): Floating chrome and modals in light mode. In dark mode it collapses to `0 20px 48px -28px rgb(0 0 0 / 0.6)` — enough to hold a modal off the page without haloing.
- **`--shadow-press`** (`0 1px 1px rgb(15 17 22 / 0.06)`): The shadow a pressed control drops to, paired with `scale(0.97)`.
- **`--shadow-accent`** (`0 8px 24px -12px color-mix(in oklab, var(--color-accent) 45%, transparent)`): Reserved for the hero panel alone. It is the one place the product is allowed a coloured glow, because the hero *is* the answer.

### Materials

- **`--blur-chrome`** `20px` and **`--saturate-chrome`** `180%`: The header and the floating tab bar are `--color-chrome` + `backdrop-filter: blur(var(--blur-chrome)) saturate(var(--saturate-chrome))`. Content scrolls under them; they never own an opaque strip.
- **`--blur-scrim`** `8px`: Applied to the modal backdrop together with `--color-scrim`.
- Under `prefers-reduced-transparency: reduce`, `--color-chrome` becomes fully opaque and both blurs become `0px`. Under `prefers-contrast: more`, `--color-line` resolves to `--color-line-strong` and chrome becomes opaque.

### Named Rules

**The Flat-at-Rest Rule.** No element carries a shadow in its resting state except the four floating layers: header, tab bar, modal, hero. Everything else earns a shadow by being pressed or dragged, or does without.

**The No-Stacked-Glass Rule.** A translucent surface never sits on another translucent surface. The tab bar over the page is fine; a translucent card under the translucent tab bar is not.

**The Dark-Has-No-Shadows Rule.** In dark mode, separation comes from `--color-surface-*` steps, `--color-line`, and `--color-edge-highlight`. If a dark-mode design reads as flat, the fix is a lighter surface step, never a bigger shadow.

## Shapes

Corners are generous and consistent, and they nest correctly. The scale is `--radius-xs` 8px (pills and chips inside a field), `--radius-sm` 12px (compact rows, segmented options, tab buttons), `--radius-md` 16px (buttons, inputs, list items — the default), `--radius-lg` 20px (inner panels, alert banners, stat tiles), `--radius-xl` 28px (cards), `--radius-2xl` 32px (hero and modals), `--radius-full` (icon buttons, status dots, the progress ring).

The reason the scale is coarse and large rather than fine and small is that a 28px corner on a 24px-padded card reads as *continuous* — the curve occupies enough of the edge that the eye stops seeing a rectangle with its corners cut off and starts seeing a single soft form. That is the closest an ordinary `border-radius` gets to a squircle without shipping a clip-path, and it is worth the extra 12px over the predecessor's `rounded-2xl`.

**Borders are always 1px.** There is no 2px border anywhere except the focus ring. Border colour carries the meaning: `--color-line` for structure, `--color-line-faint` for an internal divider, `--color-line-strong` for anything interactive, a data colour at full strength for an errored or selected control.

### Named Rules

**The Concentric Rule.** A child flush against its parent's inner edge takes `parent radius − inset`. A child floating with at least 16px of clearance on every side takes the next step *down* the scale from its parent. A card (`xl`, 28px) with 24px padding therefore holds panels at `lg` (20px), which hold fields at `md` (16px), which hold chips at `xs` (8px). Corners never nest upward.

**The Hairline Rule.** One pixel, always. A heavier border is a request for a different surface colour, not a thicker line.

## Components

Every interactive component in the product answers for six states: **rest, hover, focus-visible, active, disabled, error**. Where a state is not applicable it is stated as such rather than left undefined.

Two mechanisms apply to all of them:

**The focus ring.** `outline: 2px solid var(--color-focus); outline-offset: 2px`, drawn only on `:focus-visible`. The 2px offset gap is transparent, so it always paints the surface behind the control — which is what makes the ring legible even on an accent-filled button on a neutral card: ring and button are both cobalt, but the surface-coloured gap between them measures at least 3:1 against both. This needs no token of its own and must not be faked with a `box-shadow` ring, which would paint the gap instead of the surface. It does not hold inside the accent hero: there the gap paints the hero fill, so ring, gap and fill are all cobalt and the ring disappears — `period-selector` and `copy-button`, the only two controls that live on a hero, use an explicit `outline-ink-onfill` there instead. Never remove the ring.

**The press.** Any pressable element scales to `0.97` on `:active` over `--duration-instant` with `--ease-out`, and the change fires on pointer-down, not on release.

### Buttons — `components/atoms/button.tsx`

- **Shape:** `--radius-md` (16px). Sizes: `sm` 44px tall / 16px padding / `--text-label`; `default` 48px / 24px / `--text-label`; `lg` 56px / 32px / `--text-input`; `icon` 44×44 with `--radius-full`. 44px is the floor — no button in this product is smaller than a fingertip.
- **Primary** — rest `--color-accent` fill with `--color-ink-onfill`, no shadow. Hover `--color-accent-hover`. Focus-visible draws the ring. Active `--color-accent-active` + `scale(0.97)`. Disabled 40% opacity, `pointer-events: none`, cursor unchanged. Error: not applicable.
- **Outline** — rest transparent with a 1px `--color-line-strong` border and `--color-ink`. Hover fills `--color-surface-sunken` and the border goes `--color-ink-subtle`. Active adds the press. Disabled 40%.
- **Ghost** — rest transparent, `--color-ink-muted`, no border. Hover `--color-surface-sunken` and the text resolves to `--color-ink`. Used for the theme toggle, modal close, and the inactive calculator tab.
- **Danger** — rest `--color-negative-soft` with `--color-negative-ink`. Hover deepens the tint to 18%. Active adds the press. It is a tinted button, never a solid red one: a solid red destructive button on a screen full of red *numbers* would be indistinguishable from data.

### Inputs — `components/atoms/input.tsx`, `masked-input.tsx`, `currency-input.tsx`

- **Shape:** `--radius-md` (16px), 56px tall, 16px horizontal padding (48px when an icon is present), `--text-input`.
- **Rest:** `--color-surface` background, 1px `--color-line-strong` border, `--color-ink` text, `--color-ink-subtle` placeholder, icon in `--color-ink-muted`.
- **Hover:** border to `--color-ink-subtle`. No fill change — a field that lights up under the pointer competes with the answer.
- **Focus-visible:** border to `--color-accent`, plus the ring. The ring is cobalt everywhere; the predecessor's mix of blue, indigo and emerald focus rings depending on which card you were in is abolished.
- **Active:** not applicable — a text field has no press state.
- **Disabled:** `--color-surface-sunken` fill, `--color-line` border, 60% opacity, `cursor: not-allowed`.
- **Error:** border `--color-negative`, fill `--color-negative-soft`, focus ring becomes `--color-negative`, `aria-invalid="true"` and `aria-describedby` pointing at the banner that explains it. The colour never carries the error alone.

### Fields — `form-field.tsx`, `currency-field.tsx`, `duration-field.tsx`, `date-time-input.tsx`

Label (`--text-label`, `--color-ink-muted`) sits `--spacing-xs` (8px) above its control; an optional hint (`text-caption text-ink-subtle`, the 8px offset coming from the wrapper's `space-y-xs`) sits below: **4.75:1** on surface, **4.61:1** on sunken (light); **5.23:1** / **5.50:1** (dark). One hint style, defined once, used by `Field`, `DurationField`, the journey settings and the salary calculator. Fields in a group are separated by `--spacing-lg` (24px). A label icon is 16px in `--color-ink-muted` unless it is a data icon, in which case it takes that data hue's `-ink` token.

`date-time-input` is two controls under one label: the date field flexes, the time field is a fixed 8rem, and they stack below `sm` with a 12px gap. Both carry the same error state together — a date and a time are one answer.

The journey settings panel is one `grid grid-cols-1 sm:grid-cols-2 gap-lg`: the two percentage fields are the pair that goes two-up at `sm`, and "Tempo de Trabalho Diário" — which has no pair of its own — spans both columns with `sm:col-span-2`, staying full width. This matches how `salary-calculator.tsx` already treats its own full-width salary field, and gives all three fields one 24px rhythm from a single grid instead of two nested containers with two gap sources.

### Cards — `journey-form.tsx`, `day-summary.tsx`, `salary-calculator.tsx`

- **Corner:** `--radius-xl` (28px). **Background:** `--color-surface`. **Border:** 1px `--color-line`. **Shadow:** `--shadow-card` in light, none in dark. **Padding:** 24px below `sm`, 32px from `sm`.
- Internal sections are separated by a 1px `--color-line-faint` rule with `--spacing-lg` above and below. Recessed sub-panels (journey settings, tax details) are `--color-surface-sunken` at `--radius-lg`.

### Hero panel — `components/molecules/hero-panel.tsx`

The signature component: a saturated plane carrying the single number the user came for.

- **Corner** `--radius-2xl` (32px). **Padding** 32px, 48px from `lg`. **Shadow** `--shadow-accent`. **Text** `--color-ink-onfill` throughout, with secondary text at 90% opacity — corrected from a planned 80%, which measured **4.18:1** over `--color-accent`, below 4.5:1; at 90% it is **4.85:1** on accent and **6.75:1** on `--color-positive-deep`. Applied to the exit description and the ring's status overline in `work-calculator.tsx`, and the supporting rate line in `salary-calculator.tsx`.
- **Fill** is semantic, not decorative: `--color-positive-deep` when the journey is on track, `--color-negative-deep` when the user is in time debt, `--color-accent` on the salary view. Three fills, three meanings.
- The value is `--text-numeral`, container-query sized against the panel, tabular and slashed-zero.
- The two decorative blurred circles the predecessor layered inside it are removed. A gauge does not have bokeh.
- Tone changes cross-fade over `--duration-slow` (320ms), not 700ms.

### Progress ring — `components/atoms/progress-ring.tsx`

Track `--color-ink-onfill` at 20%; the worked arc `--color-ink-onfill` solid; the overtime arc `--color-overtime-arc`, not `--color-overtime` — against the hero fills the ring sits on, `--color-overtime` drops to **2.43:1** / **2.54:1**, below the 3:1 graphical floor, so a dedicated theme-invariant token (`#ffc563`) carries the arc instead: **5.07:1** against `--color-positive-deep`, **5.31:1** against `--color-negative-deep`, **3.12:1** / **3.55:1** against the `--color-ink-onfill/20` track. The dash offset animates over `--duration-data` (600ms) with `--ease-out`, and under reduced motion it jumps to its value.

### Segmented controls — `period-selector.tsx`, the AUTO/MANUAL switch in `journey-form.tsx`

- **Track:** `--color-surface-sunken`, `--radius-lg`, 6px padding, on a neutral card (the AUTO/MANUAL switch). Over a hero (`period-selector`), the track is `bg-scrim/25` (`--color-scrim`, theme-invariant, effective alpha 0.15) instead of a lightened surface — a lightened `--color-ink-onfill` track was tried and rejected: at 15% it measures **4.16:1** at rest over `--color-accent`, below 4.5:1, before any hover tint drops it further, and a lightened recessed plane also contradicts the Recession Rule (sunken must read darker, never lighter, in either theme). **Option:** `--radius-sm`, 44px minimum height, `--text-label`, `--color-ink-muted`.
- **Selected:** `--color-surface` fill, `--color-accent-ink` text, `--shadow-press`. **Hover** on an unselected option tints the track 6% on a neutral card, or `--color-ink-onfill` at 10% over a hero. Over a hero the rest/hover pair measures:

  | Hero fill | rest | hover |
  |---|---|---|
  | `--color-accent` | **6.92:1** | 5.52:1 |
  | `--color-positive-deep` | 9.38:1 | 7.20:1 |
  | `--color-negative-deep` | 9.88:1 | 7.99:1 |

  **Focus-visible** draws the ring on the option, not the track — on a neutral card that is the default `--color-focus` ring; over a hero the ring's transparent offset would paint the hero fill instead of a neutral surface and vanish, so `period-selector` uses an explicit `outline-ink-onfill` there: **5.57:1** against `--color-accent`, higher against the other two fills. **Disabled** 40%. **Error** not applicable.
- Built from real radio inputs with a `legend`, as it already is. The selected pill moves with a `layoutId` spring rather than a colour swap.

### Stat tiles — `components/molecules/stat-box.tsx`

`--color-surface-sunken` at `--radius-lg`, 16px padding, 1px `--color-line`. Overline label in `--color-ink-muted`, value in `--text-metric`. The *value* takes the data hue's `-ink` token (`--color-positive-ink` for gains, `--color-negative-ink` for deductions, `--color-ink` for the neutral default) — the tile background stays neutral. The predecessor tinted the whole tile; a wall of tinted boxes makes every number look equally urgent.

### Alerts — `components/molecules/alert-banner.tsx`

`--radius-lg`, 16px padding, 1px border in the data hue at 30%, fill in the hue's `-soft`, text in its `-ink`, icon 20px in its `-ink`. Two tones: **warning** uses Overtime Amber (a CLT limit approached), **danger** uses Debit Red (an input the app cannot use). `role="alert"` for danger, `role="status"` for warning, as already implemented.

### Navigation — `app-header.tsx`, the tab bar in `calculator-views.tsx`

- **Header:** `--header-height` tall — the token itself steps from 4rem (64px) to 5rem (80px) at `md` (48rem) in the base layer, so the header's own height, the content's top padding, and the sticky aside offset (`--header-height + --spacing-xl`) all derive from that one value instead of drifting independently — `--color-chrome` + `--blur-chrome`, bottom edge is a `--color-line` hairline that fades in only once the page has scrolled — a scroll edge effect, not a permanent rule. The logo mark is a 40px `--radius-md` `--color-accent` tile. The live clock is `--text-label` tabular in `--color-ink-muted`.
- **Tab bar:** floats at the bottom, `--color-chrome` + `--blur-chrome`, `--radius-lg` track, `--shadow-raised`, sitting above `env(safe-area-inset-bottom)`. Active tab is the Primary button; inactive is Ghost. `aria-current="page"` on the active one.

### Modals — `components/atoms/modal-dialog.tsx`

Native `<dialog>` with `showModal()`, wrapped in a plain `<div>` — not `AnimatePresence`. Inside a native `<dialog>`, `dialog.close()` is synchronous: the element goes `display: none` immediately, so a JS `exit` animation would play inside an already-hidden box while its children stayed mounted. Enter and exit are instead both handled by `@starting-style` plus `transition-behavior: allow-discrete`, declared once in `globals.css` for `dialog`, `dialog > div` and `dialog::backdrop` — no JS runs the transition, and the reduced-motion `transition-property` clamp already reduces it to a plain opacity fade. Backdrop `--color-scrim` + `--blur-scrim`. Surface `--color-surface-raised` at `--radius-2xl`, 32px padding, `--shadow-raised`. **Modals keep `transform-origin: center`** — they are not anchored to a trigger. Enter and exit both animate at `--duration-slow` with `--ease-out`, the panel scaling from `0.96` and translating 12px, never from `scale(0)`.

### Collapsible panels — `components/molecules/collapsible-panel.tsx`

Height and opacity animate together over `--duration-base` with `--ease-out`. The disclosure button carries `aria-expanded` and `aria-controls`, and its chevron rotates 180° over the same duration. The panel is always `overflow: hidden` during the transition and releases it on settle so a focus ring inside is never clipped.

### Iconography — `lucide-react`

- **Three sizes only:** 16px beside `--text-body-sm` and `--text-label`, 20px in buttons and fields, 24px in the header and hero. Nothing else.
- **Stroke width 2** at 16 and 20; **1.75** at 24 and above, so the weight stays optically constant as the icon grows.
- **Colour is `currentColor`** by default. The only icons with an independent colour are the data icons, which take their hue's `-ink` token: `Zap` = overtime, `MoonStar` = night, `TrendingUp` = positive, `TrendingDown` = negative, `AlertTriangle` = the tone of its banner.
- **Every icon is `aria-hidden="true"`.** The accessible name comes from adjacent text or the control's `aria-label`. An icon-only control without an `aria-label` does not ship.
- **Gap to adjacent text** is `--spacing-xs` (8px) at 16px, `--spacing-sm` (12px) at 20 and 24px, with `items-center`.
- One idea, one icon. No icon is used for two meanings and no meaning gets two icons.

### Named Rules

**The Forty-Four Rule.** No interactive target is smaller than 44×44px, including the ones that look like text links. Pad the hit area rather than growing the glyph.

**The Ring Is Never Optional Rule.** `:focus-visible` always draws the focus ring. A component that removes the outline without replacing it with an equally contrasting indicator is broken, not clean.

**The Error Has Words Rule.** An error state changes a border colour *and* names the problem in pt-BR in a banner the field points at with `aria-describedby`. Colour alone is never the message.

## Motion

Motion in WorkLoad exists to preserve continuity, never to decorate. The user opens this app for eight seconds; anything that delays the answer is a defect.

**Durations.** `--duration-instant` 100ms (press feedback), `--duration-fast` 160ms (hover, colour, border), `--duration-base` 220ms (collapse, tab change, segment slide), `--duration-slow` 320ms (modal, sheet, hero tone change), `--duration-data` 600ms (the progress ring sweep — the one long animation, because it represents the passage of a working day).

**Easing.** `--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)` for anything entering or responding to a press; `--ease-in-out` `cubic-bezier(0.77, 0, 0.175, 1)` for something moving across the screen; `--ease-standard` `cubic-bezier(0.4, 0, 0.2, 1)` for colour and opacity. **`ease-in` is never used** — it withholds movement at exactly the moment the user is watching.

**Springs** (for `motion` components, which must be interruptible): the default UI spring is `{ type: "spring", bounce: 0, duration: 0.35 }` — critically damped, no overshoot. Bounce is permitted only where a gesture carried momentum: `{ bounce: 0.2, duration: 0.4 }`. The segmented control's selection pill, the view transition between calculators, and the tab bar all use the default spring with a shared `layoutId` so an interrupted change reverses from its current position rather than snapping.

**What animates:** entering and exiting surfaces (modal, cookie banner, alert, collapsible panel), the selected pill in a segmented control, the disclosure chevron, press feedback on every control, the progress ring's dash offset, and the hero's fill when its meaning changes.

**What must never animate:**

- **The live clock and the countdown.** They change every second. A transition on a per-second value is a strobe.
- **Any figure in the day summary or a stat tile.** The user is comparing numbers; a number that is mid-tween is a number they cannot trust. Numbers cross-fade at most, and only when the whole panel does.
- **The hero's numeral.** It changes as the user types. It must be instantaneous.
- **Theme changes.** `next-themes` already runs with `disableTransitionOnChange`; the predecessor's 500ms background transition on `main` fights it.
- **Page or card background gradients.** There are none.
- **Anything triggered by a keystroke.** Typing into a field must never queue an animation.

**Reduced motion.** `prefers-reduced-motion: reduce` does not mean *no feedback* — it means no vestibular motion. The CSS reset does **not** apply a universal `transform: none`: a blanket transform reset cannot distinguish *motion* from *layout*, and this product uses `transform` for both — `-translate-x-1/2` on the floating tab bar, `-translate-y-1/2` on the input icon, `-rotate-90` on the progress ring, `rotate-180` on every chevron. A universal reset would snap the tab bar to the wrong half of the viewport for exactly the users who asked for less motion, so **it is forbidden**. Instead, vestibular motion is suppressed per state, with the neutralizer bound to the same state — `active:scale-[0.97]` becomes `motion-reduce:active:scale-100` on `button.tsx` and `copy-button.tsx` — plus a scoped reset that zeroes `animation-duration` and `animation-iteration-count`, clamps every `transition-property` to `opacity, color, background-color, border-color, outline-color`, and shortens `transition-duration` to `--duration-fast`. That scoped reset is CSS-only, so it never reaches an animation driven by `motion`: `MotionConfig reducedMotion="user"` disables spring layout animations for those components, and each Motion-driven animation that still needs a fallback — the progress ring jumping straight to its value instead of sweeping over `--duration-data` — is gated directly by the `useReducedMotion` hook rather than by the CSS reset, which the JS-driven transform never passes through. Opacity cross-fades are kept because they explain that something changed. The global `0.01ms` blanket reset the predecessor ships is replaced by this scoped version, which keeps comprehension aids alive.

### Named Rules

**The Under-320 Rule.** No interaction animation exceeds 320ms. The single exception is `--duration-data`, and it is exempt only because it is data, not chrome.

**The Numbers-Don't-Move Rule.** A value the user is reading does not animate. Ever.

**The Interruptible Rule.** Anything the user can trigger twice in a second is a spring or a CSS transition, never a keyframe. It must reverse from where it is, not from where it started.

**The Same-Path Rule.** What enters from a direction exits to that direction. The tab bar, the cookie banner and the ad-block notice enter from the bottom and leave to the bottom.

## Accessibility

This is the floor, not the target. A number nobody can read is a number that does not exist.

- **Contrast.** Every text token/surface pair in this document is stated with its measured ratio and every one clears **4.5:1**. Graphical and control boundaries clear **3:1** — that is why `--color-line-strong` exists as a separate token from `--color-line`.
- **Targets.** 44×44px minimum for every interactive element, in both themes and at every breakpoint, with at least 8px between adjacent targets.
- **Focus.** Visible on every focusable element via `--color-focus` at 2px with a 2px transparent offset, which measures ≥3:1 against both the control and the surface behind it. Focus order follows DOM order. The skip link stays.
- **Live regions.** The result surfaces announce politely: the hero's value, the day summary totals, and the stat tile grid each carry `aria-live="polite"`. The live clock does **not** — a screen reader announcing the time every second is an attack, not a feature.
- **Colour is never the only channel.** A positive balance carries a `+`, a negative one a `−`. The day timeline's coloured segments are `aria-hidden` and the same data is listed textually beneath. An errored field changes its border *and* its `aria-invalid` *and* points at a worded banner.
- **Motion, transparency, contrast.** `prefers-reduced-motion`, `prefers-reduced-transparency` and `prefers-contrast: more` are all honoured with defined token overrides, none of which are the only definition of any token.
- **Zoom.** 200% browser zoom and 320px CSS width produce no horizontal scroll and no clipped control. Because the ramp is in `rem`, the user's own font-size setting scales the layout with the text.
- **Language.** `lang="pt-BR"` on the document. Every user-visible string is pt-BR; every token, class and identifier is English.
- **Both themes are tested.** Zero serious axe violations in light *and* dark is the gate, not light only.

## Do's and Don'ts

### Do:

- **Do** use exactly one accent. `--color-accent` on the primary action, the active tab, the focus ring, the logo mark — and nowhere else.
- **Do** give every colour a quantity. If it is not the accent and not a neutral, it is green, red, amber or violet and it is describing a number.
- **Do** set every figure with the `numeric` utility (`tabular-nums slashed-zero`).
- **Do** put the answer before the inputs on anything narrower than 1024px.
- **Do** separate layers with `--color-surface-*` steps and a `--color-line` hairline first; reach for a shadow only for the four floating layers.
- **Do** give interactive borders `--color-line-strong` (≥3:1) and structural borders `--color-line`.
- **Do** nest radii concentrically: `xl` card → `lg` panel → `md` field → `xs` chip.
- **Do** keep interaction animation under 320ms, spring-based, and interruptible.
- **Do** state the measured contrast ratio when introducing any new colour pair.
- **Do** scale the root font size above 1920px and leave the composition alone.

### Don't:

- **Don't** introduce a second accent hue, a second red, or a gradient. `indigo`, `blue`, `rose`, `emerald`, `sky` and `orange` as raw utilities do not exist in this codebase any more.
- **Don't** write a colour, radius, shadow, duration or type value inline. Every one of them is a token in `app/globals.css`, and a `dark:` twin on a colour utility is a sign the token is missing.
- **Don't** use `font-black` or `font-extrabold`. 700 is the ceiling.
- **Don't** use `font-mono`. Inter's tabular figures are the numeric face.
- **Don't** apply a single `letter-spacing` across sizes. Tracking is negative above 1.125rem and positive below 0.875rem.
- **Don't** animate a value the user is reading — the clock, the countdown, the hero numeral, a stat tile figure.
- **Don't** animate from `scale(0)`, and don't ship an enter animation without its exit.
- **Don't** put a shadow on a resting card, and don't try to fix flat dark mode with a bigger shadow — use a lighter surface step.
- **Don't** stack a translucent surface on another translucent surface.
- **Don't** let a target fall under 44×44px or remove a focus outline without replacing it.
- **Don't** add decorative blur, bokeh, or a full-viewport gradient field behind the page. This is an instrument.
- **Don't** add a new column, panel or revealed content above 1920px. Scale, don't reflow.
