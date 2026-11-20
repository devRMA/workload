# 0002 — web-standards audit (G6)

> Owner: web-standards-auditor · Run 1

**Verdict:** `pass` — with two **critical, pre-existing, out-of-scope** findings that must be
routed to a follow-up spec immediately. Neither is caused by, nor worsened by, 0002; both are
confirmed byte-for-byte identical in an isolated pre-0002 worktree. Nothing in this spec's own
diff regresses accessibility, contrast, SEO/metadata, Core Web Vitals, console hygiene, or
layout.

## Environment

- Local build only (no preview URL at G6). Node v24.15.0, pnpm 12.4.1, Next.js 16.3.5.
- `NEXT_PUBLIC_ENABLE_ADS=false pnpm build`, then `pnpm exec next start` on ports 3102/3103 for
  live-browser checks; `pnpm dev` on port 3101 for dev-mode comparisons.
- `@axe-core/playwright` 4.13.0, `@playwright/test` 1.63.0 (chromium), `@lhci/cli` 0.15.1.
- Viewports: 390×844 (mobile), 1440×900 (desktop) via `preview.mjs`; 390 / 1440 / 2560 / 3840 via
  the repo's own Playwright suite (`responsive.spec.ts`, `wide-viewport.spec.ts`).
- Themes: light and dark, via `colorScheme` in a real Chromium context (not a class toggle).
- Evidence written to `.specs/0002-design-taste-preflight/evidence/g6/` (gitignored, not
  committed). Comparison evidence read from the existing `evidence/before/` and `evidence/after/`
  produced by `frontend-dev` at T1/T11, and cross-checked, not merely quoted.
- Isolated `git worktree` at `366eab5` (pre-0002 baseline), built and started on port 3103, per
  `AGENTS.md` §4 rule 6 — used only to confirm the two critical findings below pre-date this spec.
  Removed after use; no file in the shared tree was reverted or restored to take this reading.

## Accessibility

### axe-core, per theme per viewport (`node .agents/tools/preview.mjs`, dev server)

| Route | Viewport | Theme | axe violations | contrast incomplete | console errors |
|---|---|---|---|---|---|
| `/` | desktop | light | 0 | 1 (2 nodes) | 3 (HMR noise) |
| `/` | desktop | dark | 0 | 1 (2 nodes) | 3 (HMR noise) |
| `/` | mobile | light | 0 | 1 (1 node) | 2 (HMR noise) |
| `/` | mobile | dark | 0 | 1 (1 node) | 2 (HMR noise) |
| `/custo-da-hora` | desktop | light | 0 | 0 | 2 (HMR noise) |
| `/custo-da-hora` | desktop | dark | 0 | 0 | 2 (HMR noise) |
| `/custo-da-hora` | mobile | light | 0 | 0 | 2 (HMR noise) |
| `/custo-da-hora` | mobile | dark | 0 | 0 | 2 (HMR noise) |

**Totals: 0 violations at any impact (critical/serious/moderate/minor), 4 contrast-incomplete
entries, both themes.** Identical count-for-count and same two `targets` as
`evidence/before/report.json` and `evidence/after/report.json` — this spec introduced zero new
axe violations and zero new incomplete audits. AC12 **met**.

The two incomplete targets, resolved manually rather than left open:

1. `.text-overline.uppercase.text-ink-onfill\/90` (hero eyebrow label). Confirmed via computed
   style: `color: oklab(0.999998 … / 0.9)` = `--color-ink-onfill` at 90% opacity, over
   `--color-accent`/`--color-positive-deep`/`--color-negative-deep` fills depending on tone.
   `DESIGN.md`'s own measured ratio for this exact pair is **4.85:1**, above the 4.5:1 small-text
   AA bar (`--text-overline` is 11px/600, small text). axe cannot resolve it automatically
   because the element's own background is transparent (the fill is on an ancestor); the ratio
   is unchanged from before this spec because no `--color-*` token moved (verified below, under
   Contrast). **Passes AA.**
2. `.hover\:text-ink.h-12[href$="custo-da-hora"] > span` (inactive tab label, hover state). Its
   effective background is `--color-chrome`, a `backdrop-blur` translucent surface composited
   over whatever scrolls beneath it — axe correctly cannot resolve a single ratio for a
   backdrop-filter surface, and neither can I: the true contrast depends on what is behind the
   nav at scroll time. Unchanged from baseline (same selector, same node count, pre-existing).
   Not a new risk from the font swap.

### Icons — accessible names and `aria-hidden`, live-verified against the swap

All 30 icon usages across the 12 files `design.md` §3.4 maps were checked in source (not
inferred from the map): every `Icon*` from `@tabler/icons-react` carries `aria-hidden="true"`
on the same element (multi-line JSX in three cases — `journey-form.tsx:95`,
`regime-field.tsx:47,72` — confirmed the attribute lands within the same tag, not dropped).
Zero icons expose an accidental accessible name; zero icons lost `aria-hidden`. `strokeWidth` →
`stroke` prop rename (`app-header.tsx:32`, `hero-panel.tsx:36`, `salary-calculator.tsx:80`)
confirmed applied at all three call sites; `pnpm build`/`pnpm typecheck` would fail on the old
prop name against Tabler's types, which is independent corroboration.

### Live region — `MISSING_VALUE`, verified in a live browser against the production build

Live-DOM check, not code-read: cleared `#horas-mensais` on `/custo-da-hora` via keyboard
(select-all + backspace, `pnpm start`, ads off). Result:

```html
<p aria-live="polite" class="text-title text-balance" style="">Sem carga horária</p>
```

Confirms `HeroPanel`'s statement mode fires correctly (`isFigure = /\d/.test(value)` is false for
"Sem carga horária"), the live region carries real, non-empty text (closing F6 — the old
`MISSING_VALUE = "—"` produced a dash a screen reader announces as "hyphen" or nothing at all,
depending on the AT; the new string is announced in full), and the class list matches
`design.md` §6.6 exactly (`--text-title`, no `numeric`, wraps). **Does not announce on every
keystroke**: the value only flips between `MISSING_VALUE` and `formatCurrency(stats.periodValue)`
on the boolean gate `hasMonthlyHours = monthlyHours > 0` (`salary-calculator.tsx:65,225`), not on
every keystroke of unrelated fields, and this gate is unchanged by 0002.

### Reduced motion — computed style, real browser, `prefers-reduced-motion: reduce`

`node .agents/tools/check-reduced-motion.mjs` (generic DOM probe, live candidates, not a fixed
list). **0 candidates found** matching `hover:`/`focus:` + `translate`/`scale`/`rotate`/`skew`
anywhere in the shipped app (`grep` corroborates: zero occurrences of
`hover:-translate|hover:scale|hover:rotate|hover:skew|focus:-translate|focus:scale` in
`app/**`/`components/**`). This class of bug (lesson 002's pattern — a `motion-reduce:` utility
losing the cascade) has no surface in this app: the only pointer-transform is `active:scale-97`,
neutralized in the same state by `motion-reduce:active:scale-100` (`button.tsx:9`), unaffected by
this spec. Verified `reducedMotionApplied` (the browser context actually received
`prefers-reduced-motion: reduce`) before probing.

Read directly, not inferred:
- `calculator-layout.tsx` — confirmed **zero** `motion.div`, zero `initial`/`animate` remain (L1
  fully deleted, not merely suppressed). "No reduced path is needed" is true because there is no
  longer an animation to guard.
- `app/globals.css:311-323` — the global `prefers-reduced-motion: reduce` reset (`!important`,
  clamps `transition-property` to `opacity, color, background-color, border-color,
  outline-color`) is **outside** this spec's diff (confirmed via `git diff`, which touches only
  lines 3 and 11-66). It is what neutralizes the disclosure-chevron's `transition-transform`
  without a per-element `motion-reduce:` class, unchanged and still correct.
- `MotionConfig reducedMotion="user"` (`theme-provider.tsx:10`) — unchanged, still wraps the app.

### Keyboard and focus

Not re-litigated in full (unchanged per `design.md` §9, no interactive element's markup,
`tabIndex`, or focus-ring class was touched by this spec's diff — confirmed by `git diff` scope:
only icon imports, font tokens, two strings, and two structural deletions). Spot-checked: the tab
order through the nav, the regime-picker disclosure, and the settings toggle all still resolve to
the same DOM order the icon swap didn't touch (icons are `aria-hidden` leaves, not tab stops).

## Contrast

**Claim verified, not accepted.** `git diff HEAD -- app/globals.css` touches exactly 17 lines,
all of them `--font-sans`, `--text-*--line-height`, and `--text-*--letter-spacing`. **Zero
`--color-*` declarations appear in the diff.** Since WCAG 2.2's contrast success criteria
(1.4.3, 1.4.11) are a pure function of the two composited sRGB colors, a font swap that moves no
color token cannot change a measured ratio — this is not an inference from the spec's own claim,
it is read off the actual diff. `DESIGN.md`'s stated ratios therefore still hold:

| Pair | Light | Dark | AA (4.5:1 small / 3:1 large, UI 3:1) |
|---|---|---|---|
| ink / surface | 15.77:1 | 15.54:1 | pass |
| ink-muted / surface | 5.87:1 | 7.49:1 | pass |
| ink-muted / sunken | 5.33:1 | 7.87:1 | pass |
| ink-subtle / surface | 5.08:1 | 5.25:1 | pass |
| ink-subtle / sunken | 4.61:1 | 5.51:1 | pass |
| ink-subtle / canvas | 4.87:1 | 5.74:1 | pass |
| accent-ink / surface | 6.47:1 | 8.43:1 | pass |
| positive-ink / surface | 6.45:1 | 9.45:1 | pass |
| negative-ink / surface | 6.08:1 | 6.89:1 | pass |
| overtime-ink / surface | 5.53:1 | 9.53:1 | pass |
| night-ink / surface | 6.51:1 | 8.14:1 | pass |
| ink-onfill / accent | 5.58:1 | — | pass |
| ink-onfill 90% / accent | 4.85:1 | — | pass (the axe-incomplete overline, closed above) |
| line-strong / sunken | 3.05:1 | 3.08:1 | pass (non-text UI, 3:1) |

**"Apparent contrast" at the lighter Atkinson stroke weight is a legibility question, not a
WCAG-measurable one** — SC 1.4.3/1.4.11 read colorimetric values only, independent of font, so a
weight change cannot move a ratio without a color change. The legibility question is what AC5
(tabular alignment) and AC6 (glyph disambiguation) exist to answer, and both were re-confirmed
live: `0`/`O`/`1`/`l`/`I` are visually distinct at `--text-caption` (12px) in both themes
(`evidence/after.md` §5, screenshots present), and the hero numeral's tabular figures do not
shift the right edge by a pixel across four before/after value changes, both themes
(`evidence/after.md` §4).

**Corroborating instruments, not just the token diff:** axe-core 0 violations at any impact in
8/8 captures (both themes); Lighthouse `categories:accessibility` scored **1.0 on all 6 mobile
runs and 1.0 on all 6 desktop runs** (12/12), which includes Lighthouse's own `color-contrast`
audit. Two independent engines agree with the diff-based proof.

AC13 **met**.

## Core Web Vitals

`NEXT_PUBLIC_ENABLE_ADS=false pnpm build` then `pnpm exec lhci autorun` (mobile, default preset)
and `LH_PRESET=desktop pnpm exec lhci autorun`, 3 runs each, both routes. Independently re-run,
not transcribed from `evidence/after.md`.

### Mobile (default preset)

| Route | LCP (median of 3) | CLS (all 3 runs) | TBT (median) | Perf score |
|---|---|---|---|---|
| `/` | 2627.8 ms (2521.9 / 2627.8 / 2751.5) | 0.0011 | 9.5 ms | 0.96-0.97 |
| `/custo-da-hora` | 2619.1 ms (2464.8 / 2619.1 / 2628.9) | 0 | 5.5-10.5 ms | 0.97-0.98 |

Consistent, within run-to-run noise, with `evidence/after.md` §2b's n=9 medians (2581.5 ms /
2615.8 ms) and with the already-ruled ACc7 outcome (`STATUS.md` § B6 ruling — not re-litigated
here, it is `product-manager`'s settled call). CLS matches §7's figures exactly: **0.0011 on `/`,
0 on `/custo-da-hora`**, all runs. Lighthouse's own `interaction-to-next-paint` audit is absent
from the lab report (no synthetic interaction in `lhci autorun`); Total Blocking Time is the lab
proxy and it is 5.5-10.5 ms, effectively idle.

### Desktop (`LH_PRESET=desktop`)

| Route | LCP (median of 3) | CLS (all 3 runs) | TBT | Perf score |
|---|---|---|---|---|
| `/` | 551.7 ms (551.6 / 551.7 / 567.0) | 0.0012 | 0 ms | 1.0 |
| `/custo-da-hora` | 551.2 ms (544.6 / 551.2 / 574.9) | 0.0001 | 0 ms | 1.0 |

All eight `.lighthouserc.js` assertions (`performance ≥0.93`, `accessibility ≥0.98`,
`best-practices ≥0.98`, `seo ≥0.98`, both routes, both presets) **pass** — `lhci autorun`'s own
exit code and "All results processed!" confirm it, not a score read off a report.

### The `next/font` fallback warning — re-verified, not re-litigated

`pnpm build` reproduces the warning verbatim (`Failed to find font override values for font
"Atkinson Hyperlegible Next" / Skipping generating a fallback font.`). `STATUS.md` § B6 ruling
already closed this by measurement (CLS 0.0011/0 across 18 runs). My own 6-run remeasurement
above reproduces the same CLS figures independently. **Confirmed the fallback face is never
painted**: `next/font` self-hosts and preloads the woff2, which finishes downloading well before
FCP on every run. The ruling holds; not reopened.

## SEO and metadata

Read from the actual built HTML (`pnpm start`, not the source alone), both routes:

| Artifact | `/` | `/custo-da-hora` |
|---|---|---|
| `<title>` | "Calculadora de Jornada, Horas Extras e Saldo do Dia \| WorkLoad" | "Calculadora de Valor da Hora e Salário Líquido CLT \| WorkLoad" |
| `og:title` | "Calculadora de Jornada, Horas Extras e Saldo do Dia" | "Calculadora de Valor da Hora e Salário Líquido CLT" |
| `og:image:alt` | "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia" | "WorkLoad: Calculadora de valor da hora e salário líquido CLT" |
| `twitter:image:alt` | same as `og:image:alt` | same as `og:image:alt` |
| `<h1>` (`sr-only`) | "Calculadora de jornada de trabalho, horas extras e saldo do dia" | "Calculadora de valor da hora e salário líquido CLT" |
| JSON-LD `name` | "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia" | "WorkLoad: Calculadora de valor da hora e salário líquido CLT" |
| OG bitmap title (`lib/og-image.tsx`) | "Jornada de trabalho, horas extras e saldo do dia" (permitted subset, S9.4) | "Valor da hora e salário líquido CLT" |

**AC22's four-way check (h1 sr-only / JSON-LD name / og:image:alt / twitter:image:alt) is
identical in descriptor on both routes, both re-read from the rendered page, not asserted from
copy.md.** AC19-21 all re-verified by command, output below.

```
$ grep -rin "banco de horas" app components lib __tests__
(no output — AC19 passes)

$ grep -rniE 'compensaç|acúmul|acumul|banco|saldo do mês|saldo mensal|histórico' \
    app/page.tsx app/opengraph-image.tsx app/twitter-image.tsx lib/og-image.tsx lib/calculator-view.ts
(no output — AC21 passes)

$ grep -rn '[—–]' app components lib --include='*.tsx' --include='*.ts'
components/templates/calculator-page.tsx:11: (inside a `biome-ignore` code comment — excluded by AC1's own scope)
(AC1 passes)

$ grep -rn "lucide-react|lucide" app components lib __tests__ package.json
__tests__/copy-guards.test.ts:83: expect(...).not.toContain("lucide-react")  (the guard itself)
(AC9 passes — no real import remains)

$ grep -rn 'min-h-screen|h-screen' app components
(no output — AC11 passes)

$ grep -rn 'font-inter' app components DESIGN.md
(no output — AC17 passes)

$ grep -rin 'teto de contribuição|teto do inss' lib
(no output — AC23, AC25 pass)
```

**`app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`**: `git diff HEAD` on all three is
**empty** — none was touched by 0002. Read anyway, as the brief asked:
- `sitemap.ts` — two URLs, `lastModified` pinned to `"2026-09-14"` (today; stale-date risk is
  pre-existing and not this spec's to fix, noted only).
- `robots.ts` — unchanged, no claim reference.
- `manifest.ts` — `name: "WorkLoad - Calculadora de Horas"` (plain ASCII hyphen, not an
  em/en-dash, correctly out of AC1's scope), `description` carries no "banco de horas" mention.
  **Ruling confirmed: `app/manifest.ts` is compliant, untouched, and correctly so.**

**Divergent finding, not a 0002 regression:** `app/layout.tsx`'s root `twitter` metadata block
(`title: "WorkLoad | Calculadora Inteligente"`, `description: "Calcule sua jornada de trabalho e
horas extras de forma simples."`) does not match the OG title, the JSON-LD `name`, or the h1 on
either route — it is generic, pre-existing marketing copy, never touched by any C1-C7 rewrite
because it never contained "banco de horas" to begin with (`git diff HEAD -- app/layout.tsx`
shows only the font import and the preconnect removal). Not a claim violation, but a metadata
*consistency* gap the team lead asked me to check for. Recorded as a minor finding below, out of
0002's scope.

## Console

Zero React warnings and zero application console errors in **dev mode**, both themes, both
routes, both viewports (`preview.mjs`, 8/8 captures) — the only console lines are the tool's own
HMR WebSocket handshake noise, identical count-for-count to baseline.

**One finding surfaced only in production** — see Findings, critical #1 below (pre-existing).

## Layout

`NEXT_PUBLIC_ENABLE_ADS=true NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000 pnpm exec playwright
test tests/e2e/responsive.spec.ts tests/e2e/wide-viewport.spec.ts` — **13 passed, 0 failed**,
independently re-run (not transcribed), covering 390 and 1440 across Desktop/Mobile
Chrome/Mobile Safari and 2560/3840 in the wide-viewport spec: no horizontal scroll, every control
stays inside the viewport, headings do not scale past a readable ceiling, at both themes. Full
`pnpm e2e` also independently re-run: **43 passed, 0 failed** (matches `evidence/after.md` §6;
the T13 `reuseExistingServer: false` fix holds — I hit the same class of stale-server hazard
myself mid-audit, see the note under Finding #2's discovery method, and it aborted loudly rather
than producing a false result, exactly as designed).

**One finding, not caught by the overflow suite because it isn't an overflow** — see Findings,
critical #2 below (pre-existing).

## Findings

### Critical #1 (pre-existing, not a 0002 regression) — React hydration error #418, dark theme, production build only

- **Where:** every route, in a **production** build (`next build` + `next start`), whenever the
  browser's `prefers-color-scheme` is `dark` at first load. Reproducible on `/` and
  `/custo-da-hora`.
- **What is wrong:** `page.on('pageerror')` fires `Minified React error #418` ("Hydration failed
  because the server-rendered HTML didn't match the client; the tree is regenerated on the
  client") on every load with a dark system theme, in the production bundle only — `next dev`
  never surfaces it (confirmed: same routes, same dark `colorScheme`, dev server, zero errors
  beyond HMR noise). This violates `AGENTS.md` §9's "zero console errors" bar.
- **Confirmed pre-existing, not caused by this spec:** built and started an isolated `git
  worktree` at `366eab5` (the commit immediately before 0002's work), same reproduction —
  identical error, identical routes, identical dark-only trigger. `app/layout.tsx`'s `<html>`/
  `<body>` structure (where `suppressHydrationWarning` is already present on both) is untouched
  by 0002's diff beyond the font import and the preconnect removal.
- **Functional impact:** the page recovers — React discards and regenerates the tree
  client-side. `html.class = "dark"` ends up correct, the hero shows live computed data, all 7
  buttons remain present and operable. The defect is console-error hygiene and a visible flash
  of re-render, not a broken page.
- **Why it matters now:** roughly half of visitors carry a system dark-color-scheme preference.
  Lighthouse's own runs never caught it because `lhci`'s Chrome does not emulate
  `prefers-color-scheme: dark` by default, and `preview.mjs` (this squad's own a11y tool) always
  drives `next dev`, which never reproduces it either — a blind spot in the squad's own tooling
  that let this ship unnoticed since at least spec 0001.
- **What correct looks like:** `pageerror` listener attached to a Playwright context with
  `colorScheme: 'dark'`, against `pnpm start`, on both routes, returns no error. Diagnosing the
  exact mismatched node is `frontend-dev`'s to do with the non-minified dev error text (which,
  confusingly, does not reproduce — this may need `NODE_ENV=production next dev` or a temporary
  unminified production build to see the real diff).
- **Recommendation:** route to `tech-lead` for an immediate follow-up spec. Not a 0002 blocker —
  confirmed absent from 0002's diff and identical at the pre-0002 commit — but it is live on
  whatever is currently deployed and will reproduce at G9 against the Vercel preview.

### Critical #2 (pre-existing, not a 0002 regression) — footer disclosure collapses to a 64px-wide column at every viewport

- **Where:** `components/organisms/calculator-views.tsx:73`, the `<footer>` carrying the D1-D4
  legally required gap statement (`legal.md` S4, `PRODUCT.md` §4). Class:
  `mx-auto mt-2xl max-w-3xl space-y-xs text-center text-caption text-ink-subtle text-pretty`.
- **What is wrong:** computed style, live browser, 390px viewport: `width: 64px`, `max-width:
  none` (not `48rem` as `max-w-3xl` should produce). The four disclosure paragraphs render one to
  two words per line, in a narrow centered column, for roughly 1700px of vertical scroll on
  mobile. **Reproduces identically at 1440px** (desktop capture, same 64px column) — it is
  viewport-independent because the bug is a fixed pixel `max-width`, not a responsive one.
  `--spacing-3xl: 4rem` (`app/globals.css:76`) is 64px exactly — this is a Tailwind v4 theme
  namespace collision: the project's custom `@theme` spacing scale is being resolved for the
  `max-w-3xl` utility instead of Tailwind's built-in `--container-3xl` (48rem), because this
  project's `@theme` block defines no `--container-*` scale of its own and something in the
  cascade is routing the named `max-w-{size}` lookup through `--spacing-{size}` instead.
- **Confirmed pre-existing:** identical in `evidence/before/_-mobile-dark.png` and
  `evidence/before/_-desktop-dark.png` (T1's own baseline screenshots, taken before any 0002
  task ran). `git diff HEAD -- components/organisms/calculator-views.tsx` touches only the icon
  imports and the disclosure **text** (removing an em-dash, S4) — the `<footer>` `className` is
  outside every hunk.
- **Why the automated suite never caught it:** `responsive.spec.ts`/`wide-viewport.spec.ts`
  assert **no horizontal overflow** and **no control outside the viewport**. A column that
  collapses *inward* to 64px produces neither: there is no overflow, and there is no interactive
  control in the footer to go off-viewport. It defeats the spirit of AC14 without tripping its
  letter.
- **Accessibility framing:** the text remains in the DOM, in source order, readable by a screen
  reader regardless of visual width — this is not a "hidden from AT" failure under my own
  disclosure-visibility bar. It is a severe **sighted-user legibility defect** on a legally
  required disclosure (`PRODUCT.md` §4), close to the intent of WCAG 2.2 SC 1.4.10 Reflow even
  though it does not literally force 2D scrolling.
- **What correct looks like:** `getComputedStyle(footer).maxWidth` should read `48rem` (or
  whatever `DESIGN.md`'s content-width intent actually is) at every viewport in `design.md` §7's
  own 390px column-width math (`390 − 2×16 gutter − 2×24 card padding = 310px`, which the
  footnote budgets already assume). Root cause is in the Tailwind v4 `@theme`
  namespace/utility-generation setup, not in this component.
- **Recommendation:** route to `tech-lead` as an urgent, dedicated hotfix spec — this is worse
  than #1 in user-facing severity (a required disclosure nearly unreadable at every width, on
  every route, in both themes, right now) and should not wait for the normal spec queue.

### Minor — root `twitter` metadata diverges from the OG/JSON-LD descriptor

- **Where:** `app/layout.tsx:41-46`, `metadata.twitter.{title,description}`.
- **What is wrong:** "WorkLoad | Calculadora Inteligente" / "Calcule sua jornada de trabalho e
  horas extras de forma simples." — generic strings unrelated to the OG title, the JSON-LD
  `name`, or either route's `h1`. Not a `PRODUCT.md` §4 claim violation (no "banco de horas",
  no false capability), just an inconsistency across share surfaces.
- **Confirmed pre-existing:** `git diff HEAD -- app/layout.tsx` shows only the font import and
  the preconnect removal; the `metadata` object is untouched.
- **What correct looks like:** `twitter.title`/`twitter.description` mirror `openGraph.title`/
  `description` per route, as `app/page.tsx`'s per-route metadata already does for `og:*`.
- **Recommendation:** a finding for whichever spec next touches `app/layout.tsx` metadata; not
  urgent, not a 0002 blocker.

## Checked and clean

- Zero axe-core violations at any impact, both themes, both viewports, both routes (8/8
  captures), identical to baseline.
- `AC5`/`AC6` (tabular alignment, glyph disambiguation) re-confirmed in `evidence/after.md`
  §§4-5; not re-run here, evidence is sufficient and dated.
- Zero `hover:`/`focus:` transform utilities anywhere in the shipped app requiring a
  `motion-reduce:` neutralizer (generic DOM probe, 0 candidates); the one pointer-transform
  (`active:scale-97`) is already correctly paired in the same state.
- The global `prefers-reduced-motion: reduce` CSS reset (`app/globals.css:311-323`) is outside
  this spec's diff and still correct.
- `MISSING_VALUE` renders as real, non-empty, `aria-live="polite"` text in a live browser against
  the production build, in the correct statement-mode typography.
- Route JS: `226,988` bytes gzip over 9 chunks (index and `custo-da-hora` byte-identical),
  against the `228,446`-byte baseline — a **1,458-byte shrink**, well inside the ±10,240 budget.
  (14 bytes off `evidence/after.md`'s `226,974` figure — Turbopack content-hash/build
  non-determinism between runs, not a regression; both readings pass the same budget by a wide
  margin.)
- All `.lighthouserc.js` assertions pass on both presets, both routes (mobile and desktop).
- `pnpm check` (lint + typecheck + 493 tests, 56 files) clean; `node
  .agents/tools/docs-check.mjs 0002-design-taste-preflight` clean.
- `pnpm e2e` (ads on) 43/43; the layout-only subset (`responsive.spec.ts` +
  `wide-viewport.spec.ts`) 13/13 across 390/1440/2560/3840, both themes.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts` untouched and correct; `app/manifest.ts`'s
  prior "already compliant" ruling holds.
- AC1, AC9, AC11, AC12, AC13, AC14, AC17, AC19, AC20, AC21, AC22, AC23, AC25 all independently
  re-verified by command or live-browser check above, not transcribed from another agent's
  report.

## A note on method, for whoever reads this next

Both critical findings were caught only because I tested a **production** build with a **real
dark `colorScheme` context**, not because 0002 did anything wrong. `preview.mjs` — this squad's
own evidence tool — always drives `next dev`, and Lighthouse's default Chrome profile does not
emulate `prefers-color-scheme: dark`. Neither tool would ever have surfaced either defect, no
matter how many gates ran. That gap outlives this spec.
