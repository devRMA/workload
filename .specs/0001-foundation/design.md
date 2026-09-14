# 0001 — Design

> Owner: product-designer · Gate: `design`

The shipped design, written as a spec. Token **values** are not restated here — `DESIGN.md` is the source for every colour, step, radius, shadow, duration and curve. This file names which token goes where, what each element's states are, and how the two views are laid out.

## References

| Site | Technique borrowed | Why it fits this audience |
|---|---|---|
| iOS control centre / system sheets | Translucent chrome over a saturated backdrop (`bg-chrome`, `backdrop-blur-chrome`, `backdrop-saturate`) for the header and the bottom tab bar | The chrome has to stay legible over a scrolling page on a phone held at arm's length, without stealing contrast from the answer |
| Activity rings | A single ring carrying two arcs — day consumed and overtime accrued | One glance says both "how far am I" and "am I past it", with no legend to read |
| Banking apps' balance card | A saturated hero panel that owns the answer and changes hue when the answer's meaning changes | The answer must be identifiable before any text is read |
| Native form controls | `has-checked:` styling over real radio inputs rather than JS-driven pills | Keyboard, screen reader and autofill behaviour come free, and nothing breaks with JS disabled mid-hydration |

## Hierarchy

- **1s** — the hero panel. On Jornada it is the exit time in the largest numeral on the page; on Custo da Hora it is the value of the selected period. Saturated fill, white ink, nothing else competing at that size.
- **5s** — the supporting line under the numeral (what the exit means / the per-hour and per-minute rate), the progress ring's status label and countdown, and the day balance in the summary.
- **30s** — the journey form and its settings, the day's stretch-by-stretch breakdown, the priced overtime tiers, the night premium, the DSR, the compliance warnings, the tax detail panel, and the footer's provenance line.

**The Answer-First Rule holds.** Below `lg`, the hero is first in DOM order and first on screen; the inputs that produce it come after (`components/templates/calculator-layout.tsx` puts the aside in `order-first`).

## Layout

### Desktop (1440)

- Fixed header, height `--header-height`, translucent, hairline `border-line` at the bottom. Content constrained to `max-w-app`, gutter `--spacing-xl`.
- Page content starts at `--header-height + --spacing-xl` and ends with `--spacing-3xl` of clearance so the floating tab bar never covers the footer.
- A 12-column grid, `gap-xl`, `items-start`: **7 columns** for the form and the summary, **5 columns** for the hero. The hero is `sticky` at `--header-height + --spacing-xl` while the left column scrolls.
- The tab bar floats centred at `bottom-xl`, a pill of two links on translucent chrome.

### Mobile (390)

- One column. **Hero first**, then the form, then the summary.
- Gutter `--spacing-md`. Card padding `--spacing-lg`, rising to `--spacing-xl` from `sm`.
- The tab bar floats at `max(--spacing-md, env(safe-area-inset-bottom))`, centred.
- Date and time inputs stack vertically inside each journey field; they go side by side from `sm`, the time input fixed at `w-32`.
- Paired form fields are single-column, going two-up from `sm`.
- The header's live clock is hidden below `md`; the tagline under the wordmark is hidden below `sm`.

### Reflow

| Breakpoint | What changes |
|---|---|
| `sm` 640px | Paired fields go two-up; card padding steps to `--spacing-xl`; the date/time pair goes side by side; the AUTO/MANUAL switch shrinks to its content and right-aligns |
| `md` 768px | The header's live clock appears |
| `lg` 1024px | The single column becomes 7/5; the hero moves right and becomes sticky; the tab bar moves from the safe-area offset to `bottom-xl`; gutter steps to `--spacing-xl` |
| `wide` 1920px | `--container-app` and the root font size step up. **Nothing reflows** — the whole system scales (`DESIGN.md`, The Scale-Don't-Reflow Rule) |

At 2560 and 3840 the layout is identical to 1440; only the root size and the container width differ. `tests/e2e/responsive.spec.ts` asserts no horizontal overflow and no control off-viewport at all four reference widths.

## Components

The atomic level here is the level the file actually sits at, after the levelling refactor recorded in `STATUS.md`.

| Component | Level | Status | Path |
|---|---|---|---|
| AlertBanner | atom | ships | `components/atoms/alert-banner.tsx` |
| Button | atom | ships | `components/atoms/button.tsx` |
| CollapsiblePanel | atom | ships | `components/atoms/collapsible-panel.tsx` |
| GoogleAd | atom | ships | `components/atoms/google-ad.tsx` |
| Input | atom | ships | `components/atoms/input.tsx` |
| Label | atom | ships | `components/atoms/label.tsx` |
| ModalDialog | atom | ships | `components/atoms/modal-dialog.tsx` |
| ProgressRing | atom | ships | `components/atoms/progress-ring.tsx` |
| StatBox | atom | ships | `components/atoms/stat-box.tsx` |
| CopyButton | molecule | ships | `components/molecules/copy-button.tsx` |
| CurrencyInput | molecule | ships | `components/molecules/currency-input.tsx` |
| DateTimeInput | molecule | ships | `components/molecules/date-time-input.tsx` |
| DurationField | molecule | ships | `components/molecules/duration-field.tsx` |
| ExtraEntryList | molecule | ships | `components/molecules/extra-entry-list.tsx` |
| ExtraEntryRow | molecule | ships | `components/molecules/extra-entry-row.tsx` |
| Field | molecule | ships | `components/molecules/field.tsx` |
| MaskedInput | molecule | ships | `components/molecules/masked-input.tsx` |
| PeriodSelector | molecule | ships | `components/molecules/period-selector.tsx` |
| RegimeField | molecule | ships | `components/molecules/regime-field.tsx` |
| AdManager | organism | ships | `components/organisms/ad-manager.tsx` |
| AnalyticsWrapper | organism | ships | `components/organisms/analytics-wrapper.tsx` |
| AppHeader | organism | ships | `components/organisms/app-header.tsx` |
| CalculatorViews | organism | ships | `components/organisms/calculator-views.tsx` |
| CookieConsent | organism | ships | `components/organisms/cookie-consent.tsx` |
| DaySummary | organism | ships | `components/organisms/day-summary.tsx` |
| HeroPanel | organism | ships | `components/organisms/hero-panel.tsx` |
| JourneyForm | organism | ships | `components/organisms/journey-form.tsx` |
| SalaryCalculator | organism | ships | `components/organisms/salary-calculator.tsx` |
| TaxDetailsPanel | organism | ships | `components/organisms/tax-details-panel.tsx` |
| WorkCalculator | organism | ships | `components/organisms/work-calculator.tsx` |
| CalculatorLayout | template | ships | `components/templates/calculator-layout.tsx` |
| CalculatorPage | template | ships | `components/templates/calculator-page.tsx` |
| ThemeProvider | template | ships | `components/templates/theme-provider.tsx` |

### Composition per view

```
CalculatorPage (template)
├── script[type=application/ld+json]   WebApplication structured data
├── a[href="#main-content"]            skip link, visible on focus
└── main
    ├── AppHeader (organism)           wordmark · tagline · live clock (md+) · theme toggle
    └── CalculatorViews (organism)
        ├── nav                        floating tab bar, two Links, aria-current="page"
        ├── #main-content [tabIndex=-1] focus target on view change
        │   └── AnimatePresence mode="wait"
        │       └── WorkCalculator | SalaryCalculator (organism)
        │           └── CalculatorLayout (template)
        │               ├── main   7 cols
        │               └── aside  5 cols, sticky, order-first below lg
        └── footer                     privacy · estimate · omissions · table provenance
```

**Jornada — `main`:** `JourneyForm` then `DaySummary` (the summary is suppressed entirely while a journey issue is open, so a broken time range never produces numbers). **`aside`:** `HeroPanel` with the `ProgressRing` as its media, the exit time as its numeral, the entry time and a `CopyButton` as its footer.

**Custo da Hora — `main`:** the salary card (`Field` × 4, `RegimeField`, the three data alerts, the disclosure button, `CollapsiblePanel` → `TaxDetailsPanel`) then a responsive row of `StatBox` tiles inside `aria-live="polite"`. **`aside`:** `HeroPanel` with the period value as its numeral, the supporting rate line, the `PeriodSelector`, and a two-up gross / extra-gains footer.

## Tokens

Values live in `DESIGN.md`. Both themes are resolved by the same token name; only `app/globals.css` knows the difference.

| Use | Token |
|---|---|
| Page ground | `--color-canvas` |
| Card surface | `--color-surface` |
| Recessed surface (settings block, stat tile, header clock) | `--color-surface-sunken` |
| Floating surface (modal) | `--color-surface-raised` |
| Translucent chrome (header, tab bar) | `--color-chrome` + `--blur-chrome` + `--saturate-chrome` |
| Modal backdrop | `--color-scrim` + `--blur-scrim` |
| Body ink | `--color-ink` |
| Secondary ink | `--color-ink-muted` |
| Tertiary ink (captions, hints, placeholders) | `--color-ink-subtle` |
| Ink on a saturated fill | `--color-ink-onfill` |
| Hairline / strong hairline / faintest | `--color-line` · `--color-line-strong` · `--color-line-faint` |
| Primary fill and its states | `--color-accent` · `--color-accent-hover` · `--color-accent-active` |
| Accent ink and accent wash | `--color-accent-ink` · `--color-accent-soft` |
| Focus ring | `--color-focus` |
| Positive (credit, gain, on-time) | `--color-positive` · `--color-positive-ink` · `--color-positive-soft` · `--color-positive-deep` |
| Negative (debt, deduction, error) | `--color-negative` · `--color-negative-ink` · `--color-negative-soft` · `--color-negative-deep` |
| Overtime (the amber family) | `--color-overtime` · `--color-overtime-ink` · `--color-overtime-soft` · `--color-overtime-arc` |
| Night (the indigo family) | `--color-night` · `--color-night-ink` · `--color-night-soft` |
| Edge highlight on raised surfaces | `--color-edge-highlight` |
| Selection | `--color-selection` |
| Spacing | `--spacing-hair` · `-xs` · `-sm` · `-md` · `-lg` · `-xl` · `-2xl` · `-3xl` |
| Radii | `--radius-xs` · `-sm` · `-md` · `-lg` · `-xl` · `-2xl` · `-full` |
| Elevation | `--shadow-press` · `--shadow-card` · `--shadow-raised` · `--shadow-accent` |
| Type steps | `--text-overline` · `-caption` · `-label` · `-body-sm` · `-body` · `-input` · `-title` · `-heading` · `-display` · `-metric` · `-numeral` |
| Weights | `--font-weight-normal` · `-medium` · `-semibold` · `-bold` |
| Durations | `--duration-instant` · `-fast` · `-base` · `-slow` · `-data` |
| Curves | `--ease-out` · `--ease-in-out` · `--ease-standard` |
| Layout | `--container-app` · `--header-height` · `--breakpoint-wide` |
| Typeface | `--font-sans` (Inter, `display: swap`, `--font-inter`) |

**Type assignment.** `--text-numeral` is the hero value only, sized by a container query so a long currency string never wraps: `clamp(2.5rem, (208 / length)cqi, 6rem)`. `--text-metric` is the stat tile figure. `--text-display` is a modal title. `--text-title` is the wordmark and each card's `h2`. `--text-heading` and `--text-body` carry prose. `--text-label` is every field label and control. `--text-overline` is the uppercase eyebrow on the hero and the stat tiles. `--text-caption` is every hint, disclosure and footer line. `--text-input` plus the `numeric` utility is every input.

**The `numeric` utility** (tabular figures) is on every input, every duration, every currency amount and the live clock. A number the user is comparing must not shift its digit positions between renders.

## States

| Element | default | hover | focus-visible | active | disabled | loading | empty | error |
|---|---|---|---|---|---|---|---|---|
| `Button` default | `bg-accent` / `text-ink-onfill` | `bg-accent-hover` | `ring-focus` (2px `--color-focus`, offset 2) | `bg-accent-active` + `scale-[0.97]` at `--duration-instant` | `opacity-40`, pointer-events off | n/a | n/a | n/a |
| `Button` outline | `border-line-strong`, transparent | `bg-surface-sunken`, `border-ink-subtle` | `ring-focus` | `scale-[0.97]` | as above | n/a | n/a | n/a |
| `Button` ghost | transparent | `bg-surface-sunken` | `ring-focus` | `scale-[0.97]` | as above | n/a | n/a | n/a |
| `Button` danger | negative fill | negative hover | `ring-focus` | `scale-[0.97]` | as above | n/a | n/a | n/a |
| `Input` | `bg-surface`, `border-line-strong`, h-14 | `border-ink-subtle` | `border-accent` + `ring-focus` | — | `bg-surface-sunken`, `border-line`, `opacity-60`, `cursor-not-allowed` | n/a | `placeholder:text-ink-subtle` | `aria-invalid` → `border-negative` + `bg-negative-soft` |
| `MaskedInput` | inherits `Input` | inherits | inherits | — | inherits | n/a | shows the mask placeholder (`DD/MM/AAAA`, `HH:mm`, `08:48`) | reverts to the last committed value on blur when incomplete or invalid |
| `CurrencyInput` | inherits `Input`, value formatted `0,00` | inherits | inherits, caret restored by digit index | — | inherits | n/a | empty string when the bound value is `null` | inherits |
| Radio pill (AUTO/MANUAL, period) | `text-ink-muted` on `bg-surface-sunken` | `bg-surface` | `has-focus-visible:outline-2 outline-focus`, offset 2 | — | n/a | n/a | n/a | n/a |
| Radio pill, selected | `bg-surface`, `text-accent-ink`, `shadow-press` | stays | as above | — | n/a | n/a | n/a | n/a |
| `RegimeField` trigger | `border-line-strong` on `bg-surface`, trailing "Alterar" | `border-ink-subtle` | `ring-focus` | — | n/a | n/a | n/a | n/a |
| `RegimeField` option | `border-line-strong` card | `border-accent` | `has-focus-visible:outline-2 outline-focus` | — | n/a | n/a | n/a | n/a |
| `RegimeField` option, checked | `border-accent`, `bg-accent-soft`, check mark at full opacity | stays | as above | — | n/a | n/a | n/a | n/a |
| `CopyButton` | `bg-ink-onfill/10`, copy glyph | `bg-ink-onfill/20` | `outline-2 outline-ink-onfill`, offset 2 | `scale-[0.97]` | n/a | n/a | n/a | announces "Não foi possível copiar" in a `role="status"`, clearing after 4s |
| `CopyButton`, copied | check glyph, `role="status"` reads "Copiado!" | — | — | — | — | — | — | clears after 2s |
| Settings toggle (gear) | `text-ink-muted` | `bg-surface-sunken` | `ring-focus` | — | n/a | n/a | n/a | n/a |
| Settings toggle, open | `bg-accent-soft`, `text-accent-ink`, glyph rotated 90° | stays | as above | — | n/a | n/a | n/a | n/a |
| `AlertBanner` danger | `border-negative/30`, `bg-negative-soft`, `text-negative-ink`, `role="alert"` | — | — | — | — | — | not rendered when there is nothing to say | this *is* the error state |
| `AlertBanner` warning | `border-overtime/30`, `bg-overtime-soft`, `text-overtime-ink`, `role="status"` | — | — | — | — | — | not rendered | — |
| `HeroPanel` | fill by tone: `bg-positive-deep` / `bg-negative-deep` / `bg-accent`, `shadow-accent` | — | — | — | — | numeral shows `--:--` and the ring shows `--:--:--` until the client clock exists | value falls back to `—` when the monthly load is missing | tone flips to `rose` when the manual balance is negative |
| `ProgressRing` | track `stroke-ink-onfill/20`, progress `stroke-ink-onfill` | — | — | — | — | offset at full circumference before hydration | — | overtime arc in `stroke-overtime-arc`, drawn only above 0% |
| `StatBox` | `bg-surface-sunken`, `border-line`, figure in `--color-ink` | — | — | — | — | — | renders R$ 0,00; the missing-input alert above carries the explanation | success → `text-positive-ink`, danger → `text-negative-ink` |
| Tab link | ghost button | `bg-surface-sunken` | `ring-focus` | `scale-[0.97]` | n/a | n/a | n/a | n/a |
| Tab link, current | default button fill, `aria-current="page"` | `bg-accent-hover` | `ring-focus` | `bg-accent-active` | n/a | n/a | n/a | n/a |
| Skip link | `sr-only` | — | `focus:not-sr-only`, `bg-surface-raised`, `shadow-raised`, `z-100` | — | — | — | — | — |
| `ModalDialog` | native `<dialog>`, `showModal()`, backdrop `--color-scrim` + blur, body scroll locked | — | focus enters the dialog | — | — | — | — | — |

**Disclosure placement.** Every disclosure from `legal.md` sits in the open. The footer runs under the calculator on both routes with no collapse. The DSR assumption is a paragraph directly under the DSR line, not a tooltip. The two rate hints are `<p>` elements inside their `Field`, bound to the input with `aria-describedby`. The three Custo da Hora alerts sit **above** the disclosure button, so they are visible without expanding anything. The regime caveat appears both in the option's own body text and in the footer.

**Nothing occupies the answer's space.** The only ad slot is `AdManager`, rendered after the calculator inside `app/layout.tsx`, capped at `max-w-3xl`, with a reserved `min-h-25` so it cannot shift the layout when it fills. `PRODUCT.md` §8 holds.

## Motion

| Element | Trigger | Property | Duration | Easing | Reduced-motion fallback |
|---|---|---|---|---|---|
| View panel (Jornada ↔ Custo da Hora) | route change | opacity + `y` 12px → 0 → −12px, `AnimatePresence mode="wait"` | 320ms | spring, `bounce: 0` | `MotionConfig reducedMotion="user"` drops the transform; the cross-fade remains |
| `CalculatorLayout` main column | mount | opacity + `y` 20px | 350ms | spring, `bounce: 0` | as above |
| `CalculatorLayout` aside | mount | opacity + `x` 20px | 350ms | spring, `bounce: 0` | as above |
| `CollapsiblePanel` | disclosure toggle | `height` 0 ↔ auto + opacity | 220ms | `cubic-bezier(0.23, 1, 0.32, 1)` (`--ease-out`) | as above; the panel still appears and disappears |
| `ModalDialog` | open / close | opacity + `scale` 0.96 + `y` 12px | 320ms | spring, `bounce: 0` | as above |
| Cookie banner | 1500ms after load, when no choice is stored | `y` 100px + opacity, entering and leaving from the bottom | default spring | spring, `bounce: 0` | as above |
| Telemetry switch knob | toggle | `x` 0 ↔ 20px | default spring | spring, `bounce: 0` | as above |
| `ProgressRing` arcs | value change | `stroke-dashoffset` | `--duration-data` (600ms) | `ease-out` | jumps to the value |
| `HeroPanel` fill | tone change (balance turns negative) | `background-color` | `--duration-slow` | `--ease-standard` | colour transitions are kept — they are not vestibular |
| Every button | press | `scale(0.97)` | `--duration-instant` | `--ease-standard` | `motion-reduce:active:scale-100` — the neutraliser is bound to the same state it fights |
| `CopyButton` | press | `scale(0.97)` + background | `--duration-fast` | `--ease-standard` | `motion-reduce:active:scale-100` |
| Settings gear | panel opens | `rotate(90deg)` | `--duration-base` | `--ease-standard` | transform dropped by the reduced-motion preference |
| `RegimeField` chevron | panel opens | `rotate(180deg)` | `--duration-base` | `--ease-standard` | as above |
| `RegimeField` check mark | selection | `opacity` | `--duration-fast` | `--ease-standard` | kept — opacity explains that something changed |
| Inputs, buttons, pills | hover / focus | `border-color`, `background-color`, `color` | `--duration-fast` | `--ease-standard` | kept |

**What must never animate, and does not:** the live clock and the countdown (both change every second), the hero numeral (it changes as the user types), any figure in the day summary or a stat tile, and the theme change (`disableTransitionOnChange` on `next-themes`).

**Reduced motion is global and correct by construction.** `ThemeProvider` wraps the tree in `MotionConfig reducedMotion="user"`, so every `motion` component honours the preference without a per-component branch. CSS-driven transforms carry their own state-bound neutraliser (`motion-reduce:active:scale-100` paired with `active:scale-[0.97]`), never a bare `motion-reduce:transform-none`, which would lose on specificity for exactly as long as the state is active.

## Accessibility intent

- **Contrast.** Every ink/surface pair resolves through the token pairs in `DESIGN.md`, which are specified to WCAG 2.2 AA in both themes. Ink on a saturated fill is always `--color-ink-onfill`. The verification of record is axe-core run in both themes via `node .agents/tools/preview.mjs`, at zero `critical` and zero `serious`.
- **Focus order.** Skip link → header (theme toggle) → tab bar → main content → the view's fields in visual order → the footer's source link. On a view change, focus moves programmatically to `#main-content` (`tabIndex={-1}`), so a keyboard user lands on the new panel instead of the top of the document.
- **Touch targets.** Every interactive element is at least 44px: `min-h-11` on the radio pills, the reset link, the consent buttons and the privacy launcher; `h-11 w-11` on the copy and telemetry buttons; `h-14` on every input; `p-3` on the settings gear.
- **Semantics.** Grouped radios are real `<fieldset>`/`<legend>` pairs with an `sr-only` legend (`Modo de cálculo da saída`, `Visualizar o valor por período`, `Regime de Trabalho`). The tab bar is a `<nav aria-label="Calculadoras">` of `<ul>`/`<li>` links with `aria-current="page"`. The modal is a native `<dialog>` with `aria-modal` and `aria-labelledby`. Every disclosure button carries `aria-expanded` and `aria-controls`.
- **Screen reader announces.** A journey error is an `AlertBanner` with `role="alert"`, and the offending field carries `aria-invalid` plus `aria-describedby` pointing at that banner. Compliance warnings are `role="status"` so they do not interrupt. The stat-tile row is `aria-live="polite"`. The copy result is a `role="status"` span that is empty (and `empty:hidden`) when idle.
- **Decoration is hidden.** Every `lucide-react` glyph, the timeline bar, the progress ring's `<svg>`, and the header's live clock carry `aria-hidden="true"` — the clock because a per-second live region is unusable, and its information is not load-bearing.

## Copy constraints

| Slot | Max length | Lines at 1440 / 390 |
|---|---|---|
| Wordmark | 12 | 1 / 1 |
| Header tagline | 48 | 1 / hidden below `sm` |
| Card title (`h2`) | 22 | 1 / 1 |
| Card subtitle | 160 | 2 / 4 |
| Field label | 32 | 1 / 1 |
| Field hint | 180 | 2 / 4 |
| Hero eyebrow | 24 | 1 / 1 |
| Hero numeral | 10 | 1 / 1 — the container query shrinks the step rather than wrapping |
| Hero supporting line | 64 | 1 / 2 |
| Ring status label | 22 | 1 / 1 |
| Stat tile label | 20 | 1 / 1 |
| Stat tile sub-value | 28 | 1 / 1 |
| Summary row label | 32 | 1 / 1 |
| Alert title | 52 | 1 / 2 |
| Alert body | 260 | 3 / 6 |
| Tab label | 16 | 1 / 1 |
| Footer paragraph | 420 | 3 / 8 |
| Button | 18 | 1 / 1 |

## System change

**None.** This spec documents the system as it is; it adds nothing to `DESIGN.md`.

Two reconciliation notes for the `release-manager`, neither of them a change to the system itself:

1. `DESIGN.md` §Components still names three components at their pre-refactor paths — `molecules/hero-panel.tsx`, `molecules/stat-box.tsx`, `molecules/alert-banner.tsx`, `molecules/collapsible-panel.tsx`, and `form-field.tsx` / `currency-field.tsx`. The shipped paths are the ones in the component table above. The tokens, states and rules those sections describe are unchanged and still correct.
2. `components/organisms/cookie-consent.tsx` and `components/organisms/salary-calculator.tsx` still carry raw palette utilities (`neutral-*`, `indigo-*`, `blue-*`, `emerald-*`) and raw radii instead of the token set, along with `day-summary.tsx`'s segment colours. This is pre-token-migration surface, not a design decision; it is recorded as an open item in `STATUS.md` rather than described here as if it were intended.
