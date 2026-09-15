# 0005 — Design

> Owner: product-designer · Gate: `design` · Run 1
> Verdict: **PASS with rulings.** The token decision is ratified; the geometry targets below are
> binding; `DESIGN.md` §§393–559 is replaced by the prose in §6.

## What this gate is deciding

This spec draws nothing. It repairs two defects whose only design content is a **geometry the
system already intended and the compiler silently discarded**, plus one **first-paint condition**
that has never been stated as something a user can see.

So this document is not a screen design. It is four rulings:

1. **§2 — Ratification of the token decision**, with the exhaustive named→numeric mapping table and
   the proof of the 1:1 claim, read out of `app/globals.css` (not out of `DESIGN.md`).
2. **§3 — The intended geometry** of the four collision sites, at 390 and 1440, in both themes,
   measured against `legal.md` LR1–LR4 as a floor rather than as a target.
3. **§6 — The replacement for `DESIGN.md` §§393–559**, which this change makes false.
4. **§7 — What the user must see on first paint** in each theme, so D2 has an observable criterion
   and not merely a silent console.

Everything the template asks for that this spec does not move — hierarchy, references, copy slots,
new components — is answered as *unchanged*, explicitly, so that a downstream agent cannot read the
silence as permission.

**No new token is proposed. No token value changes. No string changes.** Two observations that
argue for a future change are recorded in §9 as notes, deliberately not acted on here.

## References

| Site | Technique borrowed | Why it fits this audience |
|---|---|---|
| — | None. | This spec introduces no new pattern; borrowing one would be the redesign the spec's § Out of scope forbids. |

## Hierarchy

Unchanged on both routes. For the record, so the zero-diff claim in AC6 has a stated baseline:

- **1s** — the hero panel's `--text-numeral` value (`components/molecules/hero-panel.tsx`), which is
  first in DOM order below `lg` per DESIGN.md's Answer-First Rule.
- **5s** — the stat tiles and the day summary beneath it.
- **30s** — the footer gap statement (`calculator-views.tsx:73`). **This is the element D1 destroys.**
  It is the last thing in the reading order by design, and being last is not the same as being
  optional: it is the third of `PRODUCT.md` §4's three promises, and a 64px column removes it from
  the sighted reading order entirely while leaving it in the DOM.

The only hierarchy change this spec produces is that the 30s step becomes reachable again.

---

## 2. Ratification — the named `--spacing-*` scale is deleted

**Ratified.** The named scale `--spacing-hair/xs/sm/md/lg/xl/2xl/3xl` is removed from the `@theme`
block of `app/globals.css`. The bare multiplier `--spacing: 0.25rem` (line 68) **stays**, and every
sanctioned step is expressed through Tailwind's numeric scale, which derives from it.

I am the owner of the design system and this is a change to it, so I record the reasoning rather
than only the verdict:

- The eight names were bought for a readability that turned out to be illusory. `px-md` looks like
  it carries meaning, but the meaning it carries — "the internal padding of a compact control" — is
  a **rhythm rule**, not a value, and the rhythm rule survives the rename intact (§6). What the name
  actually bought was a namespace collision that rendered a legally required disclosure at 64px for
  two specs while every instrument reported green.
- **An empty namespace cannot collide again; a renamed one can.** The spec's open question offers me
  the option of proposing non-colliding semantic names (`--gap-md`, `--step-md`, a `@utility`
  vocabulary). I decline it. Any name I invent has to be defended against every scale Tailwind owns
  now *and every one it adds later* — `--container-*` was not a scale anyone thought about when
  `--spacing-md` was written either. A numeric scale that the framework itself derives is the only
  form of this ramp that cannot be taken away from us by a minor version.
- The cost is real and I am accepting it knowingly: **the eight steps lose their names, so the
  Eight Steps Rule loses its vocabulary and has to be restated in numbers.** That restatement is
  §6, and it keeps the rule's teeth — the sanctioned set is still eight values and everything else
  is still a bug.

### 2.1 The mapping — exhaustive, with the 1:1 proof

Values read from `app/globals.css:68-76`. Root font size is 16px at 390 and 1440 (`html { font-size:
100% }`), so the px column is the value at those two viewports; above 1920 the root steps to 17px
and above 2560 to 18px, and **both columns scale together**, which is what makes the mapping 1:1 at
every viewport and not only at the two the spec measures.

| Deleted token | Declared value | px @16px root | Numeric utility suffix | Compiles to | px @16px root | Identical? |
|---|---|---|---|---|---|---|
| `--spacing-hair` | `0.125rem` | 2px | `0.5` | `calc(0.25rem * 0.5)` = `0.125rem` | 2px | **yes** |
| `--spacing-xs` | `0.5rem` | 8px | `2` | `calc(0.25rem * 2)` = `0.5rem` | 8px | **yes** |
| `--spacing-sm` | `0.75rem` | 12px | `3` | `calc(0.25rem * 3)` = `0.75rem` | 12px | **yes** |
| `--spacing-md` | `1rem` | 16px | `4` | `calc(0.25rem * 4)` = `1rem` | 16px | **yes** |
| `--spacing-lg` | `1.5rem` | 24px | `6` | `calc(0.25rem * 6)` = `1.5rem` | 24px | **yes** |
| `--spacing-xl` | `2rem` | 32px | `8` | `calc(0.25rem * 8)` = `2rem` | 32px | **yes** |
| `--spacing-2xl` | `3rem` | 48px | `12` | `calc(0.25rem * 12)` = `3rem` | 48px | **yes** |
| `--spacing-3xl` | `4rem` | 64px | `16` | `calc(0.25rem * 16)` = `4rem` | 64px | **yes** |

**Every named token has an exact numeric equivalent. There is no residue, no rounding, and no token
that needs a ruling on what happens to it.** The mapping is total and reversible.

**Compiled, not reasoned** (lesson 017 — the same rule that caught the `--container-*` non-remedy
applies to the remedy I am ratifying). Tailwind **4.3.3**, the version in this tree, invoked on a
`@theme` block containing only `--container-app` — i.e. the post-migration state of the file with
respect to this namespace:

```
.p-0\.5 { padding: calc(var(--spacing) * 0.5); }
.p-2    { padding: calc(var(--spacing) * 2); }
.p-3    { padding: calc(var(--spacing) * 3); }
.p-4    { padding: calc(var(--spacing) * 4); }
.p-6    { padding: calc(var(--spacing) * 6); }
.p-8    { padding: calc(var(--spacing) * 8); }
.p-12   { padding: calc(var(--spacing) * 12); }
.p-16   { padding: calc(var(--spacing) * 16); }

.max-w-md  { max-width: var(--container-md); }   /* --container-md:  28rem */
.max-w-lg  { max-width: var(--container-lg); }   /* --container-lg:  32rem */
.max-w-3xl { max-width: var(--container-3xl); }  /* --container-3xl: 48rem */
.max-w-4xl { max-width: var(--container-4xl); }  /* --container-4xl: 56rem */
.max-w-app { max-width: var(--container-app); }  /* ours, 80rem — unaffected */
```

Two things this output establishes that a reading of the docs would not:

1. The fractional suffix `0.5` is a valid numeric key in 4.3.3, so `--spacing-hair` has a genuine
   replacement rather than a near one. (It has **zero** usages today per the spec's Evidence, so it
   is deleted outright and the row above exists so that nobody re-introduces a named 2px step when
   they next need one.)
2. With the named scale absent, the four `max-w-*` sites resolve through `--container-*` **from
   Tailwind's own `theme.css`** (lines 333–345 of `node_modules/tailwindcss/theme.css`), with no
   `--container-*` declaration of ours involved. This is the converse of the tech-lead's finding:
   declaring `--container-*` does not beat a colliding `--spacing-*` key, and removing the
   `--spacing-*` key needs no `--container-*` declaration at all. **`plan.md` must not add one** —
   it would be dead weight that re-opens the question the next time someone reads the file.

### 2.2 The arbitrary values — five sites, one canonical form

The five `var(--spacing-*)` reads inside `calc()`/`max()` (spec § Evidence, command V4) have no
utility to rename, so they need a stated replacement form. The canonical expression is
`calc(var(--spacing) * N)` using the same `N` as the table above — **not** a hard-coded `rem`, which
would freeze the value against a future change to the multiplier and would be a raw value under
`AGENTS.md` §8.

| Site | Today | Intended expression | Value |
|---|---|---|---|
| `components/organisms/cookie-consent.tsx:44` | `bottom-[max(var(--spacing-lg),env(safe-area-inset-bottom))]` | `bottom-[max(calc(var(--spacing)*6),env(safe-area-inset-bottom))]` | 24px |
| `components/organisms/cookie-consent.tsx:160` | `bottom-[max(var(--spacing-md),env(safe-area-inset-bottom))]` | `bottom-[max(calc(var(--spacing)*4),env(safe-area-inset-bottom))]` | 16px |
| `components/organisms/calculator-views.tsx:41` | `bottom-[max(var(--spacing-md),env(safe-area-inset-bottom))]` | `bottom-[max(calc(var(--spacing)*4),env(safe-area-inset-bottom))]` | 16px |
| `components/organisms/calculator-views.tsx:65` | `pt-[calc(var(--header-height)+var(--spacing-xl))]` | `pt-[calc(var(--header-height)+var(--spacing)*8)]` | `--header-height` + 32px |
| `components/templates/calculator-layout.tsx:18` | `lg:top-[calc(var(--header-height)+var(--spacing-xl))]` | `lg:top-[calc(var(--header-height)+var(--spacing)*8)]` | `--header-height` + 32px |

The last two are the sticky-offset pair that DESIGN.md's Navigation section names — header height,
content top padding and sticky aside offset all derive from one value. That derivation is preserved
exactly; only the second addend changes form.

`--header-height`, `--container-app`, `--breakpoint-wide`, the `--radius-*` scale, the `--text-*`
ramp, every `--color-*`, `--shadow-*`, `--blur-*`, `--duration-*` and `--ease-*` are **untouched**.
The `@media` overrides in `@layer base` that reassign `--header-height` (48rem) and `--container-app`
(120rem) are untouched.

### 2.3 What ratification obliges

- **No token value changes.** A migration that also rounds `0.75rem` to `0.5rem`, or collapses two
  near-identical gaps, destroys AC6 and is a rejection at G6, not a tidy-up.
- **No renamed namespace.** Declining the semantic-rename option is a ruling, not a default; §6
  carries the vocabulary the names used to carry.
- **The guard is part of the design decision, not only of the plan.** A design system whose
  invariant is "this namespace is empty" needs the invariant asserted where the system is declared.
  AC4's unit test over `app/globals.css` is the enforcement of a design rule and I am adopting it as
  one: §6's Numeric Scale Rule is meaningless without it.

---

## 3. The intended geometry of the four collision sites

### 3.0 How these numbers were produced

Widths are derived from the shipped containers, not estimated. Character counts per line are derived
from the **advance widths of the actual strings in the font the runtime loads** — the variable
`woff2` `next/font` emits for `Atkinson_Hyperlegible_Next`, read out of `.next/static/media/` with
`fontTools` (lesson 005: measure the served artefact, never the specimen). Measured averages, which
is what makes the per-line counts below trustworthy rather than a "≈0.5em" guess:

| Type step | px @16px root | Measured average advance, pt-BR prose |
|---|---|---|
| `--text-caption` | 12px | **5.35–5.82 px/char** |
| `--text-body-sm` | 14px | **6.27 px/char** |
| `--text-body` | 16px | **7.13–7.43 px/char** |

**Both themes produce identical geometry.** Every token on the width path — `--spacing`,
`--container-*`, `--header-height`, `--container-app` — is declared in `@theme` or `@layer base` and
is **not** among the keys the `.dark` block overrides (`app/globals.css:157-227` declares only
`--color-*` and `--shadow-*`). So every figure below holds in light and in dark without restatement,
and AC6's "in both themes" is a regression check on that invariant rather than two different
targets.

### 3.1 Containing blocks

| Viewport | Page gutter | Content width available to the four sites |
|---|---|---|
| **390** | `px-4` (16px each side) at `calculator-views.tsx:65` | **358px** |
| **1440** | `lg:px-8` (32px each side) | 1376px minus the classic scrollbar; the four sites are all narrower than their own `max-w`, so the scrollbar does not enter any figure below |

Modal panels sit inside `<dialog class="… p-4">` (`modal-dialog.tsx:48`), so their containing block
is **viewport − 32px** — which is exactly the quantity `legal.md` LR4 clause 1 names. That is not a
coincidence and it should not be changed.

### 3.2 DS1 — the legal disclosure footer · `calculator-views.tsx:73`

`mx-auto mt-12 max-w-3xl space-y-2 text-center text-caption text-ink-subtle text-pretty`

| | 390 | 1440 |
|---|---|---|
| `getComputedStyle(el).maxWidth` | **`768px`** (`--container-3xl` = 48rem) | **`768px`** |
| `getBoundingClientRect().width` | **358px** (`max-w` does not bind; the gutter does) | **768px** |
| LR1 floor — `min(320, A)` | 320px → **clears by 38px** | 320px → **clears by 448px** |
| Longest `<p>` (171 chars, 914.2px at 12px) | 3 line boxes → **57 chars/line** | 2 line boxes → **86 chars/line** |
| LR2 floor — 40 chars/line | **clears by 17** | **clears by 46** |
| Today | 64px · ≈9 chars/line | 64px · ≈9 chars/line |

The `<footer>` keeps `text-center`, `text-pretty` and `--text-caption`. Nothing inside it changes —
`className` on the `<footer>` element is the only permitted diff (AC10, `legal.md` §9), and the only
token in that string that changes form is the spacing pair: `mt-2xl` → `mt-12` (48px, identical) and
`space-y-xs` → `space-y-2` (8px, identical).

### 3.3 DS4 — the privacy settings dialog · `cookie-consent.tsx:85`

`w-full max-w-lg rounded-2xl border border-line bg-surface-raised p-8 shadow-raised edge-lit`

| | 390 | 1440 |
|---|---|---|
| `getComputedStyle(el).maxWidth` | **`512px`** (`--container-lg` = 32rem) | **`512px`** |
| `getBoundingClientRect().width` | **358px** (`w-full` against a 358px block) | **512px** |
| LR4 clause 1 floor — `min(480, vw − 32)` | 358px → **attained exactly** (see below) | 480px → **clears by 32px** |
| Panel content box (− `p-8`, − 1px border) | 292px | 446px |
| Toggle row content box (− `p-4`, − 1px border) | 258px | 414px |
| Today | ≈24px | ≈24px |

**On "meets" versus "clears" at 390.** LR4 clause 1 evaluates to `min(480, 390 − 32) = 358`, and
358px is the entire content width of the dialog's containing block. The geometry does not merely
meet the floor by luck — it **takes every pixel the clause can ask for**, and the only way to exceed
it would be to delete the 16px breathing room `modal-dialog.tsx` puts around every modal, which
would put the panel's 28px corner flush against the screen edge. There is no clearance available
above this number and none is required; I record it so that a reviewer reading "358 ≥ 358" does not
mistake an attained maximum for a near miss.

**Measurement basis — a ruling the plan must carry.** LR4 clause 1 says "content-box width of the
dialog element" while LR1 says `getBoundingClientRect().width`, which is a border box. The two
readings give **512px** and **446px** at 1440, and 446 < 480. `legal.md` §4 resolves its own
ambiguity in the same breath — "`max-w-lg` = 32rem = 512px is the intended value and satisfies this"
— so the measured element is the **panel at `cookie-consent.tsx:85`** and the measured quantity is
its `getBoundingClientRect().width`, consistent with LR1. `plan.md` must state this, and
`labor-law-analyst` should confirm it at G6 rather than discover it there. Recorded in `STATUS.md`
§ Decisions and § Blockers.

#### 3.3.1 The toggle rows stack below `sm` — required by LR2, not by taste

Restoring the 512px width fixes the dialog and **does not fix the rows inside it at 390**. The
arithmetic, at a 258px row content box:

| Row | Control cluster | Text block | Caption | Line boxes | chars/line | LR2 |
|---|---|---|---|---|---|---|
| Essential, side-by-side | "Sempre ativo" 69.8 + `gap-3` 12 + 44 pill = **125.8px** | 258 − 16 − 125.8 = **116px** | 41 chars, 224.8px | 2 | **≈20** | **fail** |
| Telemetry, side-by-side | 44px switch | 258 − 16 − 44 = **198px** | 37 chars, 202.7px | 2 | **≈19** | **fail** |
| Essential, **stacked** | below the text | **258px** | 224.8px | **1** | **41** | pass |
| Telemetry, **stacked** | below the text | **258px** | 202.7px | **1** | **37** | see 3.3.2 |

So: **`flex-col items-start` below `sm`, `sm:flex-row sm:items-center` from 640px up.** The label
and its caption take the full row width and the switch sits beneath them, still 44×44 (the
Forty-Four Rule), still `shrink-0`, with the row's existing `gap-4` becoming the vertical gap. At
1440 nothing moves: the table above shows side-by-side already clears at a 414px row (272px and
354px text blocks, both one line).

This is a **pixel change at 390 inside a subtree AC6 explicitly exempts** ("except inside the four
subtrees named in AC2/AC3"), and it is compelled by LR2 rather than chosen. It nevertheless sits
against `spec.md` § Out of scope's "this spec must move zero pixels other than the four collapsed
widths", so it is routed as a scope question in `STATUS.md`, not taken silently. `AGENTS.md` §4
rule 8: a legal floor is not overruled by scope, and the honest move is to name the collision rather
than to quietly leave the granular consent rows at 20 characters per line.

#### 3.3.2 LR2 is unsatisfiable for strings shorter than 40 characters

"Ajuda a entender como o site é usado." is **37 characters long**. LR2 reads
`textContent.trim().length / lineBoxes >= 40`; with `lineBoxes` ≥ 1 the expression cannot exceed 37
for this string, at any width, in any layout, forever. The same ceiling binds any short caption
LR1–LR4 is later applied to.

I am not weakening the rule and I cannot — `content-writer` owns the string and no string changes in
this spec. The reading I propose to `labor-law-analyst`, and which `plan.md` should encode:

> An element whose entire text occupies **one line box** satisfies LR2 by definition; the ratio test
> applies only where `lineBoxes > 1`.

That preserves everything LR2 was written to catch (a paragraph broken one word per line always has
`lineBoxes > 1`) and removes a clause that no implementation can discharge. **The stacked geometry
in 3.3.1 puts both DS4 captions on exactly one line box at both viewports** — the maximum measure
the strings admit — so under either reading this is the best outcome available, which is why it is
recorded as a question and not as a blocker on the build.

### 3.4 The ad slot · `ad-manager.tsx:24`

`mx-auto w-full max-w-3xl px-4 pb-8` — rendered in `app/layout.tsx:68`, **after** `{children}` and
therefore after DS1 in the document flow.

| | 390 | 1440 |
|---|---|---|
| `getComputedStyle(el).maxWidth` | **`768px`** | **`768px`** |
| `getBoundingClientRect().width` | **390px** | **768px** |
| Inner width (− `px-4`) | 358px | 736px |
| Today | 64px box · 32px inner | 64px box · 32px inner |

Two design constraints on this element, both from `PRODUCT.md` §8, neither of which the repair may
relax:

- The slot stays **last in the body flow, below the footer**. An ad above DS1 would push a legal
  disclosure below an advertisement, and no width fix is allowed to reorder them.
- The slot occupies **no part of the region where an answer appears**. It is outside `main`, below
  everything, and it must remain so.

This element already uses numeric utilities (`px-4`, `pb-8`); only its `max-w-3xl` resolution
changes, and it changes by the collision being removed rather than by an edit. **No edit to this
file is required or permitted by this spec** beyond what the token deletion produces on its own.

### 3.5 The reset confirmation dialog · `journey-form.tsx:238`

`w-full max-w-md rounded-2xl border border-line bg-surface-raised p-8 shadow-raised edge-lit`

| | 390 | 1440 |
|---|---|---|
| `getComputedStyle(el).maxWidth` | **`448px`** (`--container-md` = 28rem) | **`448px`** |
| `getBoundingClientRect().width` | **358px** | **448px** |
| Panel content box | 292px | 382px |
| Today | ≈16px | ≈16px |

Not a disclosure surface — it carries no legal obligation — so LR1–LR4 do not bind it. It is bound
instead by the Forty-Four Rule and by the fact that a destructive confirmation whose two buttons
cannot be told apart is worse than no confirmation. At a 292px content box its `--text-display` title
and its `--text-body` explanation both read normally and its action row has room for two 48px
buttons. **No edit beyond the token migration.**

### 3.6 The two disclosure surfaces this spec does not touch — and one finding

`legal.md` §3 puts DS2 and DS3 in the LR domain and records that both "pass today". I measured them
against the same font metrics, because a rule that is only checked where it is known to be broken
ships with an exception (lesson 006), and one of the two does not come out where `legal.md` expects.

**DS2 — `day-summary.tsx:233`, the DSR caption.** `--text-caption`, direct child of the card
(`p-6` at 390, `sm:p-8` above), no icon gutter. 134 chars, 742.8px at 12px.

| | 390 | 1440 |
|---|---|---|
| Text width | 308px | 667px |
| Line boxes | 3 | 2 |
| chars/line | **≈45** | **≈67** |

Clears LR1 and LR2 at both viewports. `legal.md` is right about this one.

**DS3 — `salary-calculator.tsx:125`, the zero warning.** This one sits inside `AlertBanner`
(`components/atoms/alert-banner.tsx`), which adds `p-4`, a 1px border, a 20px icon and a `gap-3`
before the text — **80px of chrome the raw card width does not show.** It renders at
`--text-body-sm` (14px), not caption. 97 chars, 608.2px at 14px.

| | 390 | 1440 |
|---|---|---|
| Card content box | 308px | 667px |
| Banner text width (− `p-4`, − border, − icon, − `gap-3`) | **242px** | **601px** |
| Line boxes | 3 | 2 |
| chars/line | **≈32** | **≈49** |

**≈32 characters per line at 390 is below LR2's floor of 40.** This is a **finding, not a defect this
spec creates**: DS3 has never resolved through the collided namespace, its width is unchanged by the
migration, and nothing in this spec makes it better or worse. I am reporting it because I computed
it and because `legal.md` records a verdict of "passes" that my arithmetic does not reproduce.

Routing: `tech-lead` at G4 records it; `labor-law-analyst` measures it in a real browser at G6 and
rules. If it is confirmed, the remedy is a change to `alert-banner.tsx` — an atom used in several
places — which is a different spec with its own G1, and it must not be smuggled into this one.
Recorded in `STATUS.md` § Blockers as a non-blocking finding.

---

## 4. Layout at the four reference widths

Nothing reflows. This spec changes no breakpoint, no grid, no order and no gutter. What follows is
the **target** the AC6 geometry dump is diffed against, stated at all four widths because the spec's
quality bar (`AGENTS.md` §9) is stated at all four and because the `rem`-based scale means the
numbers above 1920 are not the ones at 1440.

Root font size comes from `@layer base` in `app/globals.css`: 100% below 1920px, 106.25% (17px) from
`120rem`, 112.5% (18px) from `160rem`. **Media-query `rem` is evaluated against the initial 16px**,
so those thresholds are 1920px and 2560px in device pixels regardless of the root scaling they
trigger.

| | 390 | 1440 | 2560 | 3840 |
|---|---|---|---|---|
| Root | 16px | 16px | 18px | 18px |
| `--container-app` | 80rem = 1280px (not binding) | 80rem = **1280px** | 100rem = **1800px** | 100rem = **1800px** |
| Page gutter (`px-4 sm:px-6 lg:px-8`) | 1rem = **16px** | 2rem = **32px** | 2rem = **36px** | 2rem = **36px** |
| `--header-height` | 4rem = **64px** | 5rem = **80px** | 5rem = **90px** | 5rem = **90px** |
| Columns | 1, hero first | 12 → 7/5 | 12 → 7/5 | 12 → 7/5 |
| DS1 footer (`max-w-3xl`) | **358px** (gutter-bound) | **768px** | 48rem = **864px** | **864px** |
| DS4 dialog (`max-w-lg`) | **358px** (`vw − 32`) | **512px** | 32rem = **576px** | **576px** |
| Ad slot (`max-w-3xl`) | **390px** | **768px** | **864px** | **864px** |
| Reset dialog (`max-w-md`) | **358px** | **448px** | 28rem = **504px** | **504px** |

Two consequences worth stating because they are the reason the numeric scale is safe above 1920:

- **The whole system scales together.** `--spacing` is `0.25rem`, so `p-6` is 24px at 1440 and 27px
  at 2560, exactly as `--spacing-lg` was. The migration does not touch root scaling and root scaling
  does not touch the migration.
- **`--container-app` is ours and does not collide.** `app` is not a key in Tailwind's container
  scale (`node_modules/tailwindcss/theme.css:333-345` lists `3xs…7xl` only), which is why
  `max-w-app` measured correctly on the same page where `max-w-3xl` measured 64px. It stays.

No horizontal overflow and no control off-viewport at any of the four, before or after: every
element in §3 is `max-w`-bound and `mx-auto`, and the two dialogs are `w-full` inside a `p-4`
`<dialog>` that is itself `max-w-full`.

---

## 5. Components, tokens, states, motion

### 5.1 Component tree

Every element this spec touches already exists. **Nothing new is introduced at any atomic level**,
and no file moves between levels.

| Component | Level | Status | Path |
|---|---|---|---|
| Disclosure footer | organism (inline in `CalculatorViews`) | **reuse — `className` only** | `components/organisms/calculator-views.tsx` |
| `CookieConsent` settings dialog | organism | **reuse — `className` only, plus the 3.3.1 stack** | `components/organisms/cookie-consent.tsx` |
| `ModalDialog` | atom | **reuse — unchanged** | `components/atoms/modal-dialog.tsx` |
| `AdManager` | organism | **reuse — unchanged** (fixed by the token deletion alone) | `components/organisms/ad-manager.tsx` |
| `JourneyForm` reset dialog | organism | **reuse — unchanged** | `components/organisms/journey-form.tsx` |
| `AppHeader` theme toggle | organism | **reuse — D2 fix only** | `components/organisms/app-header.tsx` |
| `Button` (`size="icon"`) | atom | **reuse — unchanged** | `components/atoms/button.tsx` |
| `CalculatorLayout` | template | **reuse — arbitrary-value form only** | `components/templates/calculator-layout.tsx` |
| `AlertBanner` | atom | **reuse — unchanged; see §3.6 finding, not this spec** | `components/atoms/alert-banner.tsx` |

Every other file in `app/` and `components/` is touched only by the mechanical utility rename of
§2.1, which is a class-string substitution with no structural consequence.

### 5.2 Tokens

The token surface of this spec is deliberately thin: **the only tokens whose *name* changes are the
eight in §2.1, and no token's *value* changes.** For completeness, the tokens that hold the four
repaired surfaces, in both themes — none of them differs between light and dark, which is the point:

| Use | Token | Light | Dark |
|---|---|---|---|
| DS1 footer text | `--color-ink-subtle` | `#696f79` | `#898e98` |
| DS1 footer surface | `--color-canvas` | `#f9fafc` | `#0f1116` |
| DS1 type step | `--text-caption` (0.75rem / 1.45 / 0.012em / 400) | same | same |
| DS1 top margin | `mt-12` — 3rem / 48px | same | same |
| DS1 paragraph gap | `space-y-2` — 0.5rem / 8px | same | same |
| DS1 max width | `--container-3xl` — 48rem | same | same |
| DS4 panel surface | `--color-surface-raised` | `#ffffff` | `#21252b` |
| DS4 panel border | `--color-line` | `#e0e2e6` | `#2b2e35` |
| DS4 panel radius | `--radius-2xl` — 2rem | same | same |
| DS4 panel elevation | `--shadow-raised` + `edge-lit` | two-layer shadow | `0 20px 48px -28px rgb(0 0 0 / 0.6)` + `--color-edge-highlight` |
| DS4 panel padding | `p-8` — 2rem / 32px | same | same |
| DS4 max width | `--container-lg` — 32rem | same | same |
| DS4 row surface | `--color-surface-sunken` | `#f2f4f7` | `#13161b` |
| DS4 row radius / padding / gap | `--radius-lg`, `p-4`, `gap-4` | same | same |
| DS4 row label | `--text-body` @ `--font-weight-semibold`, `--color-ink` | `#1e232c` | `#f2f3f6` |
| DS4 row caption | `--text-caption`, `--color-ink-subtle` | `#696f79` | `#898e98` |
| DS4 switch on / off | `--color-accent` / `--color-line-strong` | `#2a62d1` / `#888c95` | `#2a62d1` / `#6a707a` |
| Reset dialog | identical to DS4 panel, `--container-md` | same | same |
| Ad slot | no colour token; `--container-3xl`, `px-4`, `pb-8` | same | same |
| Focus ring, everywhere below | `--color-focus` | `= --color-accent` `#2a62d1` | `= --color-accent-ink` `#91b6f9` |

**No new token. No new type step. No new curve. No new elevation level.** §9 records the one thing I
would have reached for a token to fix and deliberately did not.

### 5.3 States

Only three interactive elements sit inside the repaired subtrees. All three keep the states
`DESIGN.md` § Components already defines; they are restated in full because "focus-visible is
specified, never inherited by accident" and because a reviewer needs a row to check against.

| Element | rest | hover | focus-visible | active | disabled | loading | empty | error |
|---|---|---|---|---|---|---|---|---|
| **Telemetry switch** `role="switch"` (`cookie-consent.tsx:130`) | 44×44 target; track `h-6 w-11` `--radius-full`, `--color-line-strong` off / `--color-accent` on; knob `--color-ink-onfill` | no fill change — the row is not a button, only the switch is | `ring-focus`: `outline: 2px solid var(--color-focus); outline-offset: 2px` on the 44×44 button, not on the track | knob translates; no scale (it is not a press-and-release control) | n/a — always operable; if it ever were, 40% opacity + `pointer-events: none` | n/a — state is local, resolves synchronously | n/a — always one of two states | n/a |
| **"Salvar Preferências"** (`Button` primary, `w-full h-14`) | `--color-accent` / `--color-ink-onfill`, `--radius-md`, no shadow | `--color-accent-hover` | the ring, `--color-focus`, 2px offset on `--color-surface-raised` | `--color-accent-active` + `scale(0.97)` over `--duration-instant` | 40% opacity, `pointer-events: none` | n/a | n/a | n/a |
| **Close control** (`Button` ghost `size="icon"`, `absolute right-4 top-4`) | transparent, `--color-ink-muted`, 44×44, `--radius-full` | `--color-surface-sunken`, text to `--color-ink` | the ring | `scale(0.97)` | n/a | n/a | n/a | n/a |
| **Theme toggle** (`Button` ghost `size="icon"`, `app-header.tsx:53`) | transparent, `--color-ink-muted`, 44×44 | `--color-surface-sunken`, text to `--color-ink` | the ring — on `--color-chrome`, which resolves opaque under `prefers-reduced-transparency` | `scale(0.97)` | n/a | **§7: there is no loading state. The rest state is correct on first paint.** | n/a | n/a |
| **DS1 footer** | non-interactive; `<footer>` with four `<p>` and one `<a>` | the `<a>` inherits the app link treatment, unchanged | the `<a>` takes the global `:focus-visible` ring from `@layer base` | n/a | n/a | n/a | **never empty — the four paragraphs are static and server-rendered (LR3)** | n/a |
| **Ad slot** | non-interactive container | n/a | n/a | n/a | n/a | **renders `null` when `NEXT_PUBLIC_ENABLE_ADS` is unset — it must not reserve height it may not use** | same as loading | n/a |

### 5.4 Motion

No motion is added, removed or retimed. The table exists so that the reduced-motion path of every
animation inside the repaired subtrees is on the record, per `AGENTS.md` §8.

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion |
|---|---|---|---|---|---|---|
| Consent banner | mount / unmount (`motion` `AnimatePresence`) | `y` 100 → 0, `opacity` 0 → 1 | `motion` default spring | — | 0 | **Today: none, and this is a defect — see §9 N4.** The global `@media (prefers-reduced-motion: reduce)` block in `globals.css` clamps CSS `transition-property`, which does not reach a `motion` animation driven in JS on inline styles. `grep -rn "useReducedMotion" components/` returns **zero** matches. The 100px slide plays under reduced motion. Not this spec's to fix; reported, not silently asserted away. |
| Settings dialog + backdrop | `showModal()` / `close()` | `opacity`, `display`, `overlay` (`allow-discrete`) | `--duration-slow` 320ms | `--ease-out` | 0 | Same global clamp: `opacity` survives, `transform` does not. Declared once in `globals.css`, not per component. |
| Settings dialog panel | same | `transform: scale(0.96) translateY(0.75rem)` → `none` | `--duration-slow` 320ms | `--ease-out` | 0 | `transform` is not in the clamped `transition-property` list, so it **jumps** to its final value — the panel appears at full size with no slide. Correct: the neutralizer is in the same state as the transform, not a bare `transform-none` (`AGENTS.md` §8). |
| Telemetry switch knob | `aria-checked` change | `x` 0 → 20 (`motion.span`) | `motion` default spring | — | 0 | Track colour is a CSS transition (`duration-(--duration-fast)`, `--ease-standard`) and is clamped correctly. The knob's `x` is a JS animation and is **not** clamped — same gap as the banner, §9 N4. The state stays legible regardless, because `aria-checked` and the track colour both carry it; colour never carries the state alone. |
| Theme toggle glyph | theme change | **none — see §7** | — | — | — | None required. A theme swap must not animate; `disableTransitionOnChange` on `ThemeProvider` is load-bearing and stays. |
| DS1 footer | — | none. **A legal disclosure never fades in.** | — | — | — | n/a |

`0.75rem` in the dialog panel's starting transform is a raw value in `globals.css` today and is
**left alone** — rewriting it to `calc(var(--spacing)*3)` would be a value-preserving edit outside
the collided namespace, i.e. exactly the "tidying" AC6 forbids. Noted in §9.

### 5.5 Copy slots

**None.** Not one pt-BR string is added, removed, reworded or re-budgeted by this spec, and no
`content-writer` runs on it. Every slot below already holds a string settled at 0002 and frozen by
`legal.md` §9; the columns state the budget the *repaired* geometry provides, so that a future
rewrite has a number to respect instead of a guess.

| Slot | Role | Type step | Rendered budget at 390 | Today |
|---|---|---|---|---|
| DS1 P1–P4 | the gap statement (`PRODUCT.md` §4) | `--text-caption` | **≈65 chars/line** at 358px; longest paragraph 171 chars → 3 lines | ≈9 chars/line |
| DS4 row labels | consent purpose | `--text-body` | **≈35 chars** on one line at 258px (both labels fit: 18 and 29 chars) | wraps at 116/198px |
| DS4 row captions | consent purpose explanation | `--text-caption` | **≈47 chars** on one line at 258px (both fit: 41 and 37 chars) | 2 lines, ≈20 chars/line |
| DS4 save action | the consent act | `--text-input` | full row width, single line | unchanged |
| Reset dialog title / body | destructive confirmation | `--text-display` / `--text-body` | 292px content box | collapsed at ≈16px |

A string that grows past these budgets stops fitting on one line and re-opens LR2. That is the
constraint a future `content-writer` inherits from this gate.
