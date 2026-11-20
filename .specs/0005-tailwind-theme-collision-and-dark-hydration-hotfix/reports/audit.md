# 0005 — Web standards audit (G6)

**Verdict: pass.**

No axe-core violation at any severity, zero `pageerror`/console errors in a real production build
under both `colorScheme: "dark"` and `colorScheme: "light"`, the D2 first-frame criterion
(`design.md` §7) holds as measured, all four repaired D1 surfaces resolve to their intended
container values with correct rendered geometry at 390/1440/2560/3840 in both themes, and the
Lighthouse budget clears on every category with margin. One cross-cutting, non-a11y/non-CWV defect
is confirmed live in the tree (`lib/utils.ts`, AC11) — already caught and correctly dispositioned by
`qa-engineer`'s report (F3); noted here for completeness, not counted against this gate's verdict.

---

## Environment

| | |
|---|---|
| Audited | Local production build (`next build` + `next start`), **not** `next dev` — lesson 015 |
| Node | v24.15.0 |
| Playwright | 1.63.0 (chromium) |
| @axe-core/playwright | 4.13.0 |
| @lhci/cli | 0.15.1 (Lighthouse via `lhci autorun`, this repo's `lighthouserc.js`) |
| Routes | `/`, `/custo-da-hora` |
| Viewports | 390×844, 1440×900, 2560×1440, 3840×2160 |
| Themes | `light`, `dark` (`colorScheme` emulation, not the in-page toggle, for hydration checks) |
| Build env — e2e/dark-hydration/geometry pass | `NEXT_PUBLIC_GA_ID=G-TEST12345`, `NEXT_PUBLIC_ENABLE_ADS=true`, `NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000` (matches CI's e2e job) |
| Build env — axe/Lighthouse/contrast pass | `NEXT_PUBLIC_GA_ID=""`, `NEXT_PUBLIC_ENABLE_ADS="false"`, `NEXT_PUBLIC_ADSENSE_ID=""` (matches CI's Lighthouse job — ads off per team-lead's instruction, avoids the placeholder-AdSense-id console/best-practices noise that is not this spec's defect) |
| Port hygiene | Confirmed no listener on 3000/3100 before every server-dependent run (`ss -ltnp`); one leftover `next-server` from my own earlier manual `pnpm start` was found and killed mid-audit — see § Findings, informational |

All server-dependent commands below were run against a freshly built, freshly started server for
the exact env shown, never against a reused process — `playwright.config.ts`'s own
`reuseExistingServer: false` plus my own manual port checks enforce this (lesson 013).

---

## Accessibility

### axe-core, per theme, per viewport, production build

Command: `node .agents/tools/preview.mjs --out .specs/0005-.../evidence --path /,/custo-da-hora --port 3100`,
pointed at a pre-started production server (ads off) so the tool's `isUp()` check reused it instead
of falling back to `next dev`.

| Route | Viewport | Theme | Critical | Serious | Moderate | Minor | Total |
|---|---|---|---|---|---|---|---|
| `/` | desktop (1440×900) | light | 0 | 0 | 0 | 0 | 0 |
| `/` | desktop (1440×900) | dark | 0 | 0 | 0 | 0 | 0 |
| `/` | mobile (390×844) | light | 0 | 0 | 0 | 0 | 0 |
| `/` | mobile (390×844) | dark | 0 | 0 | 0 | 0 | 0 |
| `/custo-da-hora` | desktop (1440×900) | light | 0 | 0 | 0 | 0 | 0 |
| `/custo-da-hora` | desktop (1440×900) | dark | 0 | 0 | 0 | 0 | 0 |
| `/custo-da-hora` | mobile (390×844) | light | 0 | 0 | 0 | 0 | 0 |
| `/custo-da-hora` | mobile (390×844) | dark | 0 | 0 | 0 | 0 | 0 |

Tool output: `violações axe: 0 | contrast incomplete: 4 | erros de console: 0` across all 8 captures.
The 4 "contrast incomplete" entries (axe could not auto-resolve a background) are all on
`.text-metric.numeric`, `.text-overline.uppercase.text-ink-onfill/90` and a nav-link hover state
inside `hero-panel.tsx`/`stat-box.tsx` — none of the four D1 surfaces or the D2 toggle this spec
touches, confirmed by `grep -rl "text-metric numeric" components/`. Pre-existing, out of this
spec's scope, not a finding against it.

### Zero `pageerror`, production build, both themes, both routes (focus #1)

This is the check lesson 015 exists for: a real production build, a real `colorScheme`, not
`next dev` and not `preview.mjs`'s default fallback.

Command: `NEXT_PUBLIC_GA_ID=G-TEST12345 NEXT_PUBLIC_ENABLE_ADS=true NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000 pnpm exec playwright test tests/e2e/dark-hydration.spec.ts` — `playwright.config.ts`'s "Dark production" project sets `colorScheme: "dark"`; the spec's own light-theme `describe` block calls `page.emulateMedia({ colorScheme: "light" })`.

- 4/4 tests pass: `/` and `/custo-da-hora`, dark and light.
- Each test asserts `pageErrors` (a `page.on("pageerror")` listener) equals `[]` — confirmed empty
  on every run.
- Re-ran the full suite three times across the audit (once isolated, twice inside the full 98-test
  `pnpm e2e`) — 0/98 failures every clean run. See § Findings for one transient run that is not
  reproducible and is not this spec's defect.

### Manual checks

**Keyboard — theme toggle.** `Tab` reaches the toggle (`role=button`, name "Alternar tema");
`getComputedStyle` on focus shows `outline-style: solid`, `outline-width: 2px` (never suppressed).
Pressing `Enter` in a `dark` context flips `document.documentElement.className` from `dark` to
`light` on the **first** keystroke and the icon set (`data-theme-icon`) swaps `sun→none,
moon→block` immediately — confirms the click handler's DOM-class read (not `setTheme`'s updater
form) also drives the keyboard path, closing the exact regression `plan.md`/`STATUS.md` (G4 run 1)
named: "a dark-system visitor's first click would set `dark` again and do nothing."

**Keyboard — consent dialog focus management.** Opening the privacy-settings dialog
(`cookie-consent.tsx:85`) via its trigger moves focus inside the `<dialog>` (confirmed:
`dialog.contains(document.activeElement) === true`, landing on the close button). `Escape` closes
it (`open` attribute removed) and returns focus to the triggering button
(`aria-label="Configurações de Privacidade"`). Native `<dialog>`/`showModal()` semantics, unaffected
by this spec, regression-free.

**Live regions.** `dark-hydration.spec.ts` asserts `ariaLiveInsideHeader === false` on both
DOMContentLoaded and networkidle reads, both themes, both routes — no `aria-live` region exists or
is introduced around the theme toggle, matching `design.md` §7.1 clause 4 ("no live region is
introduced"). There is no submit button and no other value that updates as the user types inside
the surfaces this spec touches (the footer and the toggle are both static once painted), so no
new live-region obligation arises from D1/D2.

**Reduced motion.** `node .agents/tools/check-reduced-motion.mjs --base-url http://localhost:3100 --trigger 'button[aria-label="Resetar Horários"]' --target 'dialog[aria-labelledby="journey-reset-title"]'`
(default `--trigger`/`--target` are this tool's portfolio-squad defaults and do not exist in this
app; overridden to a real dialog in this codebase — see § Findings, informational).

- The generic `hover:`/`focus:` transform-utility probe (`probeCandidates(page, '*')`) found **zero
  candidates** on the whole page. Confirmed independently: `grep -rnE '(hover|focus...):-?(translate|scale|rotate|skew)' app components` returns nothing. The spacing migration (129 occurrences,
  22 files) introduced no `hover:`/`focus:` transform utility, so `AGENTS.md` §8's
  transform-pairing rule has nothing to fail here — this is the specific risk the team-lead brief
  flagged for this tool, and it is clear.
- The `dialog[aria-labelledby="journey-reset-title"]`'s `animationName` under reduced motion is
  `none` — **ok**.
- The tool's third phase (an "overlay" check hardcoded to `[data-state="open"].inset-0`, a
  Radix-UI convention) does not match anything in this codebase, which uses a native `<dialog>` +
  `::backdrop` and CSS-transition-based motion, not `data-state`. It throws a 30s timeout rather
  than reporting a result — a tool/app mismatch, not an app defect (see § Findings).
- Read directly instead: `app/globals.css:270-277` gives `dialog > div` a `transform: scale(0.96)
  translateY(0.75rem)` resting-state transition; the global `@media (prefers-reduced-motion:
  reduce)` block (`app/globals.css:303-315`) restricts `transition-property` (via `!important`) to
  `opacity, color, background-color, border-color, outline-color` — `transform` is excluded from
  the transition, so under reduced motion the scale/translate snaps instantly rather than easing.
  **This CSS-transition path is correctly neutralized.** It is unrelated to and unaffected by this
  spec's changes (T6 touched only `flex-col`/`sm:flex-row` on two consent rows, no `motion` prop,
  confirmed by `git diff` — matches the constraint `plan.md`/`STATUS.md` B7 placed on T6).
- **Not neutralized, and not this spec's to fix**: the cookie-consent banner's
  `motion.div` slide (`initial={{y:100}}`/`animate={{y:0}}`) and the telemetry toggle's
  `motion.span` translate in `cookie-consent.tsx` are driven by the `motion` library's own inline
  styles, which the CSS reduced-motion reset cannot reach (it only touches `transition-property`).
  This is exactly `STATUS.md`'s **B7**, ruled pre-existing, confirmed, and explicitly out of scope
  for this spec (`plan.md` §3/B7: "touches every `motion` call site in the repo... one constraint
  it places here: T6 must not add, remove or retime any animation"). Re-confirmed here rather than
  re-litigated: this spec did not touch it, and did not need to.

---

## D2 — the first-frame criterion (`design.md` §7)

Element: `components/organisms/app-header.tsx:53-70`, the theme-toggle `Button`.

| `design.md` §7.1 clause | Verified | How |
|---|---|---|
| 1. Glyph theme-correct at first paint (light→moon, dark→sun), not corrected later | **Pass** | `dark-hydration.spec.ts` reads the toggle state at `domcontentloaded` (before hydration completes) and again at `networkidle`, both themes, both routes: the correct glyph (`display` not `none`) is already correct at `domcontentloaded` and unchanged at `networkidle` (`networkidleState.sunDisplay === domContentLoadedState.sunDisplay`, same for moon) |
| 2. No substitution at any point (no swap, no placeholder, no empty button, no skeleton/spinner/fade) | **Pass** | Server HTML (`page.request.get(route)`) contains **both** `data-theme-icon="sun"` and `data-theme-icon="moon"` literally — both glyphs are server-rendered; only `display` (via the `dark:`/default Tailwind variant, `app-header.tsx:66-67`) decides which one paints. There is no client-only branch, no `useEffect`, no mount guard — the family `design.md` §7.2 rules out is structurally absent from the diff |
| 3. No layout shift; 44×44 target and header row identical every frame | **Pass** | `dark-hydration.spec.ts`'s `headerLayoutShiftCount` (filters `PerformanceObserver` `layout-shift` entries whose source node is inside `header`) reads **0** on every run, both themes, both routes; `toggleRect` is bit-identical between `domcontentloaded` and `networkidle`. Lighthouse's own CLS for `/` and `/custo-da-hora` is **0.000–0.001** (see § Core Web Vitals), consistent with a 0-contribution toggle |
| 4. Accessible name never changes; no live region introduced | **Pass** | `aria-label="Alternar tema"` read identical at both capture points in both themes; `ariaLiveInsideHeader` is `false` at both points — see § Accessibility |

Both glyphs use `display` (not `opacity`/`visibility`) to toggle, per `design.md` §7.2's own
requirement that the hidden glyph "contributes no box." Confirmed: `getComputedStyle` on the hidden
`<svg>` reads `display: none` in both themes' complementary state, and `data-theme-icon` gives a
stable selector so this was read from computed style rather than `toHaveClass` (`AGENTS.md` §8;
`STATUS.md` G4 run 1 decision).

**The mount-guard family is confirmed absent**, not merely assumed absent: no `useState`,
`useEffect`, or `resolvedTheme` read gates the glyph render in `app-header.tsx`; the branch is pure
CSS (`dark:hidden` / `hidden dark:block`), so there is no code path in which the server and client
first paints could disagree on which glyph is visible.

**The rejected `setTheme` updater-form regression is confirmed not reintroduced.** The click
handler reads `document.documentElement.classList.contains("dark")` (`app-header.tsx:57`), not
`resolvedTheme` or a `setTheme(t => …)` updater — verified by keyboard-activation test above (first
`Enter` press in a dark-system context flips `dark`→`light`, not a no-op).

---

## Contrast

This spec changes no color token and no text/background pair — only `max-width`/spacing utilities
and a `display` toggle on two already-existing, already-approved icons. The only text/background
pairs materially affected by geometry (a wider container can change nothing about contrast, but a
narrower one, pre-fix, still had to pass) are DS1's footer paragraphs, measured via axe-core's own
color-contrast engine (not a hand-rolled one — see note) at 390×844, production build:

| Pair | Selector | Theme | Ratio | AA (normal text, 4.5:1) |
|---|---|---|---|---|
| `text-caption` / `text-ink-subtle` on page background | `#main-content > footer > p` (×4) | light | **4.84:1** | Pass |
| `text-caption` / `text-ink-subtle` on page background | `#main-content > footer > p` (×4) | dark | **5.74:1** | Pass |
| Footer source link, `underline` | `#main-content > footer a` | light | **4.84:1** | Pass |
| Footer source link, `underline` | `#main-content > footer a` | dark | **5.74:1** | Pass |

Source: `AxeBuilder({ page }).include('#main-content > footer').withRules(['color-contrast'])`,
reading `axe.passes[...].nodes[...].any[0].data.contrastRatio` — axe's own sRGB-aware engine. A
hand-rolled contrast script was attempted first and discarded: this codebase's computed colors
report in `lab()`/`oklch()` color space, and a linear-sRGB luminance formula fed `lab()` components
directly produces meaningless ratios (a lesson-worthy trap for a future contrast check — using axe
or a color-space-aware library is not optional here).

No other text/background pair in the four repaired surfaces changed color; DS4's and the ad
slot's and the reset dialog's text/background pairs are unchanged by this spec (only `max-width`
moved), and were already covered by `.specs/0002`'s own contrast audit.

---

## Core Web Vitals

Command: `NEXT_PUBLIC_GA_ID="" NEXT_PUBLIC_ENABLE_ADS="false" NEXT_PUBLIC_ADSENSE_ID="" pnpm exec lhci autorun`, this repo's `lighthouserc.js` (3 runs/URL, median asserted), matching CI's Lighthouse job exactly (ads off, same env keys).

| URL | Performance | Accessibility | Best Practices | SEO | LCP (median) | CLS (median) | TBT (median) |
|---|---|---|---|---|---|---|---|
| `/` | 0.97 | 1.00 | 1.00 | 1.00 | 2.6 s | 0.001 | 10 ms |
| `/custo-da-hora` | 0.97 | 1.00 | 1.00 | 1.00 | 2.6 s | 0 | 20 ms |

Budget (`lighthouserc.js`): performance ≥ 0.93, accessibility/best-practices/SEO ≥ 0.98. **All four
categories clear on both routes, with margin** (perf +0.04, others +0.02). `lhci autorun`'s own
`assertion-results.json` is `[]` — zero assertion failures.

INP is not measurable in Lighthouse's lab mode without a real interaction
(`interaction-to-next-paint-insight` reports `scoreDisplayMode: "notApplicable"` on every run, as
expected); Total Blocking Time — the lab proxy the performance score is actually built on — is
10–80 ms across all 6 runs, effectively idle main-thread.

**No regression against the spec's own baseline.** `STATUS.md`'s cited history (0002: LCP 5.6 s →
2.8 s) and this run's 2.6 s are consistent within Lighthouse's normal run-to-run spread; CLS is
0–0.001 on both routes, matching D2's own "0.000, before and after" claim (`design.md` §7.1 clause
3) exactly. The 129-occurrence spacing-token migration moved no layout cost: every replacement is
an exact 4px-multiple of the value it replaced (`design.md` §2.1), so there is no mechanism by which
it could move LCP/CLS, and the measurement confirms it didn't.

The four repaired D1 surfaces, measured directly (production build, ads **on** — the ad slot only
renders when `NEXT_PUBLIC_ENABLE_ADS=true`, so this pass used the CI-matching e2e env instead of the
ads-off Lighthouse env):

| Surface | Selector | `max-width` (computed) | Rendered width @390 | Rendered width @1440 | Rendered width @2560/3840 |
|---|---|---|---|---|---|
| DS1 footer | `#main-content > footer` | 768px | 358px | 768px | 864px (root steps to 18px, 48rem×18px) |
| Ad slot | `body > div.max-w-3xl` | 768px | 390px* | 768px | — (not separately re-measured at wide, ads off there) |
| DS4 dialog | `dialog[aria-labelledby="privacy-settings-title"] > div` | 512px | (LR1/LR4-passing, see `reports/legal.md` §3) | — | — |
| Reset dialog | `dialog[aria-labelledby="journey-reset-title"] > div` | 448px | 358px | 448px | — |

\* The ad wrapper itself has no side margin below its `max-w-3xl` cap, so at 390 it renders at the
full viewport width (390px, `px-4` is internal padding, not an outer constraint) — consistent with
`ad-manager.tsx:24`'s intended geometry (768px cap, full-bleed below it).

**Methodology note, since it produced one false read during this audit and is worth recording for
whoever measures a `<dialog>` next:** a bounding-box read taken immediately after `showModal()`
without settling the CSS transition catches the resting-state entrance transform mid-flight
(`app/globals.css:270-277`, `scale(0.96)` easing to `none` over `--duration-slow`) and reports a
geometry 4% narrower than the true resting value. `disclosure-legibility.spec.ts`'s own
`waitForStableBoundingBox` helper exists for exactly this reason; any ad-hoc geometry script needs
the same settle-and-poll, not a fixed short timeout.

---

## SEO and metadata

Not touched by this spec's file list; checked anyway per this gate's standing brief. Production
build, ads off, `curl` against `pnpm start`.

| Artifact | Route | Result |
|---|---|---|
| `<title>` | `/` | `Calculadora de Jornada, Horas Extras e Saldo do Dia \| WorkLoad` — present, distinct | Pass |
| `<title>` | `/custo-da-hora` | `Calculadora de Valor da Hora e Salário Líquido CLT \| WorkLoad` — present, distinct | Pass |
| `<meta name="description">` | both | present, distinct, pt-BR | Pass |
| `<link rel="canonical">` | both | `https://workload.devrma.com` / `.../custo-da-hora` — correct, absolute | Pass |
| Open Graph (`og:title`, `og:description`, `og:url`, `og:image` ×4) | `/` | present and consistent with the page | Pass |
| `application/ld+json` structured data | `/` | present, `@type: WebApplication`, populated | Pass |
| `app/sitemap.ts` → `/sitemap.xml` | — | both routes listed, `lastmod`/`changefreq`/`priority` present | Pass |
| `app/robots.ts` → `/robots.txt` | — | `Allow: /`, sitemap URL present | Pass |
| `app/manifest.ts` → `/manifest.webmanifest` | — | name, short_name, icons, theme/background color present | Pass |
| Lighthouse SEO category | both | 1.00 / 0.98 budget | Pass |

No regression: `__tests__/robots.test.ts`, `__tests__/manifest.test.ts`, `__tests__/sitemap.test.ts`
and `__tests__/opengraph-image.test.ts` all pass inside `pnpm check`'s 504/504.

---

## Console

**Zero console errors, zero React warnings, zero `pageerror`** across every capture in this audit:

- `preview.mjs`'s 8 captures (2 routes × 2 viewports × 2 themes, production build, ads off):
  `erros de console: 0`.
- `dark-hydration.spec.ts`'s 4 tests (2 routes × 2 themes, production build, ads on,
  `colorScheme` emulated): each asserts `pageErrors` (`page.on("pageerror")`) equals `[]` — 4/4
  pass.
- `pnpm check` (`pnpm lint`, `pnpm typecheck`, `pnpm test`): clean. 58 test files, 504 tests, all
  green (re-run by me independently of `qa-engineer`'s own run).
- `pnpm build` (both env configurations used in this audit): clean, no warning other than the
  pre-existing, unrelated Turbopack font-fallback notice (`Failed to find font override values for
  font "Atkinson Hyperlegible Next"`), present on `main` and out of this spec's scope.

This closes the specific regression this spec exists to fix: D2 (React hydration error #418) does
not reproduce under any theme, route, or build configuration exercised in this audit.

---

## Layout

`root.scrollWidth - root.clientWidth` (overflow) and off-viewport `main button/input/a` controls,
both routes, both themes, production build:

| Viewport | Route | Overflow | Off-viewport controls |
|---|---|---|---|
| 390×844 | `/` | 0 (via `responsive.spec.ts`, 6/6 chromium+mobile projects) | none |
| 390×844 | `/custo-da-hora` | 0 (manual read, both themes) | none |
| 1440×900 | `/` | 0 | none |
| 1440×900 | `/custo-da-hora` | 0 | none |
| 2560×1440 | `/` | 0 (`wide-viewport.spec.ts`) | none |
| 2560×1440 | `/custo-da-hora` | 0 (manual read, both themes) | none |
| 3840×2160 | `/` | 0 (`wide-viewport.spec.ts`) | none |
| 3840×2160 | `/custo-da-hora` | 0 (manual read, both themes) | none |

`responsive.spec.ts`'s D3 guard (lesson 016's both-sides-bounded check: no `main`/`footer` element
holding >80 characters computes a rendered width <240px) passes at 390 and 1440 — this is the
general-class check that used to fail on the unfixed footer (64px) and now measures 358px/768px.
`wide-viewport.spec.ts` and `responsive.spec.ts` both currently scope their assertions to `/` only;
my own manual reads at `/custo-da-hora` (2560/3840, both themes) confirm the same zero-overflow,
zero-off-viewport result there. Noted as a minor test-coverage gap in § Findings — not a rejection,
since the property holds, only the automated assertion's route coverage is narrower than the
manual confirmation.

---

## Findings

None of the following changes the verdict. Ordered by relevance to this gate.

1. **[Informational, cross-cutting, not mine to fix] `lib/utils.ts` currently violates AC11.**
   `git diff HEAD -- lib/utils.ts` shows a 2-line deletion (the comment "Without this,
   tailwind-merge reads our type steps as colours…", `lib/utils.ts:16-17` on `HEAD`) at the moment
   of this audit (2026-09-15, confirmed by direct `Read` of the file after the diff). This is the
   exact conflict `STATUS.md`'s decisions log already documents at length (G5 T6/T9 entries: a
   concurrent, uncommitted `__tests__/comment-free-code.test.ts` — narrower than `AGENTS.md` §8 —
   keeps stripping this comment; `frontend-dev` restored it once and declined to fight it a second
   time) and `reports/qa.md` already catches as **F3** with the correct disposition (fix at
   commit-time, before G7/G8, not a rejection at G6). I re-confirm the measurement independently
   because "audit what shipped, not what reports claim shipped" applies to my own gate too, and the
   state had in fact drifted since `qa-engineer`'s own read. Not an accessibility, SEO, or
   Core-Web-Vitals defect — `twMerge`'s behavior is unchanged, only a comment is missing — so it
   does not affect this report's verdict, but `tech-lead` should not let it reach a commit.

2. **[Informational] The team's `check-reduced-motion.mjs` tool has a hardcoded, app-specific
   third phase that does not run against this codebase.** Its post-trigger "overlay" check locates
   `[data-state="open"].inset-0` (a Radix-UI convention) and times out after 30s when nothing
   matches, rather than reporting "not applicable." This app's modals are native `<dialog>` +
   `::backdrop`, with no `data-state` attribute anywhere. Lesson 008's rule applies going forward:
   a shared tool is not proven to work in this tree until it has been run here — I worked around it
   by supplying real `--trigger`/`--target` values and reading the CSS by hand for the phase the
   tool cannot express, but the tool itself will hang on this app for the next auditor too unless
   it is generalized or given an app-specific invocation note.

3. **[Informational] A leftover `next-server` process on port 3100, mid-audit, was mine, not a
   pre-existing repo hazard.** While reproducing a transient e2e flake (see #4) I manually started
   `pnpm start` on port 3100 and did not tear it down before a later Playwright invocation tried to
   bind the same port and correctly refused ("already used… set `reuseExistingServer: true`"). This
   is `playwright.config.ts`'s `reuseExistingServer: false` working exactly as this spec intends
   (`STATUS.md` R7) — a stale server was detected and rejected rather than silently reused. No
   finding against the app; recorded so the sequence in this report is legible.

4. **[Informational, not reproducible] One parallel `pnpm exec playwright test` invocation (all
   projects, full worker count, cold cache immediately after `pnpm install`) showed 8 failures, all
   in `disclosure-legibility.spec.ts`'s DS4 (`Configurar` button) tests, all a `locator.click`
   timeout waiting for the consent banner's 1.5s reveal timer.** Re-ran the identical command twice
   more (once as a single isolated test at `--workers=1`, once as the full 98-test suite at default
   parallelism) against a cleanly started server both times: **0/98 failures on both re-runs.** I
   could not reproduce the original failure with a clean server and no other load on the machine,
   and the mechanism (a `setTimeout`-gated UI reveal under heavy concurrent Chromium load
   immediately after a cold `pnpm install`) is consistent with local CPU contention rather than a
   defect this spec introduced — `qa-engineer`'s own report cites the identical 98/98 clean run.
   Recorded rather than silently discarded, since a flake that cannot be reproduced is still a flake
   worth naming if it recurs on CI.

5. **[Minor, layout] `wide-viewport.spec.ts` and `responsive.spec.ts`'s D3 guard scope to `/`
   only.** `/custo-da-hora` shares the same footer, header and layout shell and is therefore
   extremely unlikely to diverge, and my own manual measurement confirms it does not (§ Layout) —
   but the automated, CI-enforced assertion does not cover it. Not a rejection: the property holds
   as measured, and D3's own general-class design (lesson 016) already generalizes across
   elements, just not across routes. A future spec touching layout should widen these two specs'
   route list rather than treat `/` as a proxy for both routes going forward (lesson 015's shape,
   applied to routes instead of themes).

6. **[Minor, pre-existing, already ruled out of scope by `tech-lead`] No `prefers-reduced-motion`
   path for `motion`-library-driven animation.** Confirmed still true and still confined to
   surfaces this spec did not touch (the cookie-consent banner's slide, the telemetry toggle's
   knob translate) — see § Accessibility, Reduced motion. `STATUS.md` **B7** already carries this
   as a named, out-of-scope finding for a future `product-manager` spec; not repeated as a new
   finding here, only re-verified.
