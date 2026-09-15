# 0006 — Audit report (G9, preview)

> Owner: web-standards-auditor · Run: 1

**Verdict:** `reject`

One finding blocks: **F1 — the deployed preview fails the Core Web Vitals performance budget on both routes, all three runs each**, driven by an LCP of 5.5–6.1s against G6's local 2.5–2.7s and the 0.93 `categories:performance` floor. Per `.agents/agents/web-standards-auditor.md` §G9, `performance`, `accessibility`, LCP, INP and CLS are scored against the budget on every host, preview included — this is not eligible for the `best-practices`/`seo` attribution carve-out. Everything else this gate owns — the five `AlertBanner` consumers' LR2a geometry, accessibility, contrast, reduced motion, CLS, layout integrity at all four widths, and DS1/DS2/DS4 — holds on the deployed artifact and confirms G6's numbers byte-for-byte.

## Environment

- **Preview URL:** `https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app` (PR #39, `mergeStateStatus: CLEAN`).
- **Routes:** `/` and `/custo-da-hora`.
- **Viewports:** 390×844, 1440×900, 2560×1440, 3840×2160.
- **Themes:** light and dark, via Playwright `colorScheme` context option (equivalent to `prefers-color-scheme`).
- **No local build was run for this gate.** Every check below hits the deployed URL directly — `preview.mjs --base-url`, `lhci` with `PLAYWRIGHT_TEST_BASE_URL` pointed at the preview (skips `startServerCommand`), and standalone Playwright scripts that `page.goto(BASE + route)` against the same host. This sidesteps lesson 029's `.next` race entirely: there is nothing shared to build.
- **Tool versions:** `@playwright/test ^1.63.0`, `@axe-core/playwright ^4.13.0`, `@lhci/cli ^0.15.1` (`lighthouseVersion: 12.6.1` in the collected LHRs), chromium (Playwright-managed), run from this tree.
- **Commands run, in order:**
  1. `node .agents/tools/preview.mjs --out .specs/0006-salary-alert-legibility/evidence/g9-preview --base-url <preview>` (route `/`).
  2. `node .agents/tools/preview.mjs --path /custo-da-hora --out .specs/0006-salary-alert-legibility/evidence/g9-preview-salary --base-url <preview>`.
  3. A standalone Playwright script (`evidence/g9-scripts/g9-legibility.mjs`, written to this gate's own gitignored `evidence/`, not committed) reimplementing `tests/e2e/support/legibility.ts`'s `measureSurface`/`assertLr1`/`lineBoxesAndCharacters` against the live URL — 76 cases: the 5 `AlertBanner` consumers (C1–C5) × 4 widths × 2 themes (40), DS1 × 2 routes × {390,1440} × 2 themes (8), DS2 × {390,1440} × 2 themes (4, driven exactly as `plan.md` §"Describe B" step 2–3: gross salary set on `/custo-da-hora` first so it persists to `localStorage`, then C5 driven on `/`), DS4 × 2 routes × {390,1440} × 2 themes (8), and a general overflow/reachability pass × 2 routes × 4 widths × 2 themes (16). Run twice at concurrency 6 and once more at concurrency 3 after the first run's single DS4 anomaly (see Layout, below) — final run: **76/76 pass**, 0 console errors on any consumer page, 0 a11y-structure mismatches.
  4. A second standalone script (`evidence/g9-scripts/contrast-motion.mjs`) resolving `lab()` computed color to sRGB via an offscreen canvas for C1/C3 at 390/1440, both themes, and reading `getComputedStyle` on C1's root under both `prefers-reduced-motion` states.
  5. `rm -rf .lighthouseci && PLAYWRIGHT_TEST_BASE_URL=<preview> pnpm exec lhci autorun --collect.numberOfRuns=3 --upload.target=filesystem` — 3 runs per route, 6 total, against the unmodified `.lighthouserc.js` budget.
  6. `curl` against `<preview>/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and `<preview>/` and `<preview>/custo-da-hora` for OG tags, canonical and structured data.
  7. `grep -rn "x-robots-tag\|noindex" app/ next.config.*` — clean, confirming the header seen on every response is platform-injected, not app code.

## Acceptance criteria (this gate's slice, re-confirmed on the deployed artifact)

| # | Status | Evidence |
|---|---|---|
| AC4 | met | LR2a chrome spend on the preview reads **26px** at 390/1440 and **29px** at 2560/3840 for all five consumers, both themes, both routes — identical to G6's local numbers. Margin against the 32px budget is 6px at 390/1440 and only **3px at 2560/3840** (`961.00 − 932.00 = 29`, budget 32) — the narrowest margin in the spec, confirmed live. |
| AC5 | met | LR1 passes on all 40 consumer measurements; LR3 (visible, not hidden, on-screen) implicit in every successful `root.waitFor({state:'visible'})`/`driveUntil`. |
| AC6 | met | DS1 reads 53.25 cpl at 390 and 94.67 at 1440 (both routes, both themes); DS2 reads 44.67 cpl at 390 and 67 at 1440 — both inside `legal.md` §3.2's cited bands (52.4–56.7, 44.7), unchanged from G6 and from `0005`. |
| AC10 | met, with F1 below | `axe-core` 0 violations at every severity, both routes, both viewports, both themes. Lighthouse `categories:accessibility` **1.00** on all 6 runs (budget 0.98) — pass. `categories:performance` **fails** — see F1. Layout clean at 390/1440/2560/3840, both themes, both routes. |
| AC11 | not this gate's to score | Residual cpl at 390 for C1–C5 (non-binding per `legal.md` §3.2) recorded below for `qa-engineer`/`labor-law-analyst`'s own tables. |

## Accessibility

### axe-core, per theme, per viewport (`preview.mjs --base-url`, steps 1–2)

| Route | Viewport | Theme | Critical | Serious | Moderate | Minor |
|---|---|---|---|---|---|---|
| `/` | mobile (390) | light | 0 | 0 | 0 | 0 |
| `/` | mobile (390) | dark | 0 | 0 | 0 | 0 |
| `/` | desktop (1440) | light | 0 | 0 | 0 | 0 |
| `/` | desktop (1440) | dark | 0 | 0 | 0 | 0 |
| `/custo-da-hora` | mobile (390) | light | 0 | 0 | 0 | 0 |
| `/custo-da-hora` | mobile (390) | dark | 0 | 0 | 0 | 0 |
| `/custo-da-hora` | desktop (1440) | light | 0 | 0 | 0 | 0 |
| `/custo-da-hora` | desktop (1440) | dark | 0 | 0 | 0 | 0 |

Zero violations at every severity, both routes, both viewports, both themes — matches G6. `/` at 390/1440 reports 2–3 `contrastIncomplete` nodes (`.hover\:text-ink...[href$="custo-da-hora"] > span`, `.text-overline...text-ink-onfill\/90`, `.absolute...text-metric.numeric`) — the same pre-existing header-nav-link/hero-overline/hero-metric nodes G6 flagged as outside this spec's diff, not `AlertBanner`-related, and not violations (axe reports them "incomplete", requiring manual review, not failing).

### Manual — reading order, accessible name, role, icon exposure

Read structurally, live, on the deployed page for **all 40 consumer measurements** (C1–C5 × 4 widths × 2 themes), not sampled:

- **Role is unchanged.** Every `AlertBanner` root's `role` attribute matches the consumer's expected `alert`/`status` split (`getByRole(consumer.role)` located the element in all 40 cases; a role mismatch would have made the locator resolve to nothing and the case would have failed to find `root`).
- **Icon exposure to assistive technology is unchanged.** `root.querySelector('svg')` carries `aria-hidden="true"` in all 40 cases (`iconAriaHidden: "true"`, checked programmatically, not sampled).
- **No focusable element was added.** `root.querySelectorAll('a, button, input, select, textarea, [tabindex]')` returns 0 in all 40 cases.
- **The accessible name is unchanged.** Title text matches the expected pt-BR string verbatim in all 40 cases (`titleMatches: true`), and the body/title share the banner's single computed name.
- **Reading order** — confirmed by DOM inspection matching G6's diff read (`git diff -- components/atoms/alert-banner.tsx` was not re-run here; this gate re-confirms the *rendered* consequence — role, name, icon exposure, no new focus stop — on the actual deployed markup, which is what a screen-reader user on this host encounters).
- **Keyboard path** — unaffected: zero focusable elements added means the tab sequence around every banner is the same set of controls in the same order as before, on the live page.

### Reduced motion

`getComputedStyle` read directly in a real browser against the deployed page, both `prefers-reduced-motion` states, on C1's root:

| `prefers-reduced-motion` | `transitionDuration` | `animationName` |
|---|---|---|
| `no-preference` | `0s` | `none` |
| `reduce` | `0.16s` | `none` |

Identical to G6's local numbers (site-wide `--duration-fast` reset in `app/globals.css:303-315`, unmodified). Nothing to reduce, nothing regressed, confirmed on the artifact that ships.

## Contrast

Resolved from the browser's own `lab()` computed-style output to sRGB via an offscreen canvas, against the deployed page (real fonts, real CDN — this is the point of G9):

| Consumer | Tone | Theme | Viewport | Ink `rgb()` | Fill `rgb()` | Ratio | AA (4.5:1) |
|---|---|---|---|---|---|---|---|
| C1 | danger | light | 390 | `191,32,41` | `250,235,236` | **5.26:1** | pass |
| C1 | danger | light | 1440 | `191,32,41` | `250,235,236` | **5.26:1** | pass |
| C1 | danger | dark | 390 | `249,128,120` | `60,29,36` | **6.02:1** | pass |
| C1 | danger | dark | 1440 | `249,128,120` | `60,29,36` | **6.02:1** | pass |
| C3 | warning | light | 390 | `144,94,22` | `250,244,234` | **5.05:1** | pass |
| C3 | warning | light | 1440 | `144,94,22` | `250,244,234` | **5.05:1** | pass |
| C3 | warning | dark | 390 | `248,179,93` | `58,47,31` | **7.22:1** | pass |
| C3 | warning | dark | 1440 | `248,179,93` | `58,47,31` | **7.22:1** | pass |

Byte-for-byte identical to G6's local production-build numbers. WCAG 2.2 **1.4.3 (Contrast, Minimum)** clears at every combination, tightest margin at C3 light (5.05:1). Tones/border/radius are out of this spec's scope per `design.md`/`spec.md` and were not re-litigated.

## Core Web Vitals

`lhci autorun`, 3 runs per route, `PLAYWRIGHT_TEST_BASE_URL` pointed at the preview (no local server started), against `.lighthouserc.js`'s unmodified budget:

| Route | Run | LCP | CLS | TBT (lab proxy for INP) | `performance` | `accessibility` | `best-practices` | `seo` |
|---|---|---|---|---|---|---|---|---|
| `/` | 1 | 5735 ms | 0 | 41 ms | 0.76 | 1.00 | 1.00 | 0.66 |
| `/` | 2 | 5769 ms | 0 | 46 ms | 0.74 | 1.00 | 1.00 | 0.66 |
| `/` | 3 | 6069 ms | 0 | 40 ms | 0.74 | 1.00 | 1.00 | 0.66 |
| `/custo-da-hora` | 1 | 6063 ms | 0 | 18 ms | 0.76 | 1.00 | 1.00 | 0.66 |
| `/custo-da-hora` | 2 | 6069 ms | 0 | 75 ms | 0.76 | 1.00 | 1.00 | 0.66 |
| `/custo-da-hora` | 3 | 5562 ms | 0 | 20 ms | 0.76 | 1.00 | 1.00 | 0.66 |

Budget: `performance ≥ 0.93`, `accessibility ≥ 0.98`, `best-practices ≥ 0.98`, `seo ≥ 0.98` (`.lighthouserc.js`, unchanged). `lhci autorun --assert` exits 1.

- **CLS is 0 on every one of the 6 runs, both routes.** This is the number this gate cares about most for this diff — an element that changed rows (the icon leaving the body's flex row for the title's) is exactly the shape of change that regresses CLS if the new layout isn't stable at first paint, and it is: no shift measured, on the real deployed artifact, matching G6's local 0–0.00032. **The `AlertBanner` remedy did not regress CLS on the preview.**
- **`categories:accessibility` is 1.00 on all 6 runs** (budget 0.98) — pass, corroborating the axe-core and manual findings above.
- **`categories:best-practices` is 1.00 on all 6 runs** (budget 0.98) — pass outright; no attribution exercise needed since nothing scored below 1.
- **`categories:seo` is 0.66 on all 6 runs** (budget 0.98) — **reported, not scored**, under the ruling `.agents/agents/web-standards-auditor.md` §G9 sets for a `*.vercel.app` host. Proof, per audit item, read from `.lighthouseci/lhr-*.json`: the *only* `seo` audit scoring below 1 in every run is `is-crawlable` (score 0), and its `details.items` is exactly one row: `{"source": "X-Robots-Tag: noindex"}`. `curl -sI <preview>/` confirms the header is present on every response (`X-Robots-Tag: noindex`); `grep -rn "x-robots-tag\|noindex" app/ next.config.*` is clean — no match anywhere in this app's own source. `app/robots.ts`'s own served body (`curl <preview>/robots.txt`) reads `Allow: /` and cites the **production** sitemap (`https://workload.devrma.com/sitemap.xml`), confirming the app's own robots directive is correct and it is Vercel's platform header, not this app, blocking indexing on the preview alias. Not a finding.
- **F1 — `categories:performance` fails the budget on both routes, all 6 runs (0.74–0.76 against ≥ 0.93).** Per the same §G9 ruling, `performance`, `accessibility`, LCP, INP and CLS are **always** scored against the budget, on every host — there is no attribution carve-out available for this category the way there is for `best-practices`/`seo`. See Findings below for the full detail; summarized here: LCP is 5562–6069 ms (vs G6's local 2567–2667 ms, same simulated-mobile throttling profile in both runs), driven **89–90% by the "Render Delay" phase** of the `largest-contentful-paint-element` audit's own phase breakdown (TTFB is 610–632 ms, Load Delay and Load Time are both 0 ms in every run — the LCP element has no image and is not lazily loaded). The LCP element is `div.relative > div.relative > div.@container > p.numeric` on both routes — the `HeroPanel`'s live numeric readout, the same element G6 identified locally, **not** any part of `AlertBanner`. `AlertBanner`'s own geometry change cannot be the cause (CLS is 0 and the LCP element sits well above the banner in the DOM, unaffected by row changes inside it), but the deployed artifact fails the budget regardless, and this gate scores what ships.

## SEO and metadata

| Artifact | Check | Result |
|---|---|---|
| `<title>` | Both routes | `Calculadora de Jornada, Horas Extras e Saldo do Dia \| WorkLoad` / `Calculadora de Valor da Hora e Salário Líquido CLT \| WorkLoad` — unchanged, correct. |
| `<meta name="description">`/OG description | `/` | `"Veja a que horas você pode sair, quanto já trabalhou hoje e quanto tem de hora extra."` — present, matches `copy.md`. |
| Canonical | `/` | `<link rel="canonical" href="https://workload.devrma.com"/>` — points at production, not the preview alias. Correct. |
| Open Graph | `/` | `og:title`, `og:description`, `og:url` (production domain), `og:image` (dynamic route, resolves against the current host — expected Next.js behavior, still a valid absolute URL), `og:image:width/height/alt` all present. |
| Structured data | `/` | `@graph` with `WebApplication` and `BreadcrumbList`, `@id`s and `url`s pinned to the production domain — unchanged, correct. |
| `app/sitemap.ts` | `<preview>/sitemap.xml` | Two `<url>` entries (`/`, `/custo-da-hora`), both `<loc>` pointing at `https://workload.devrma.com/...` — correct, unaffected by the deploy host. |
| `app/robots.ts` | `<preview>/robots.txt` | `Allow: /` for all agents, `Sitemap: https://workload.devrma.com/sitemap.xml` — the app's own directive is permissive and correct; the platform's `X-Robots-Tag: noindex` **response header** is what blocks indexing on this host, not the served body. |
| `app/manifest.ts` | `<preview>/manifest.webmanifest` | `name`, `short_name`, `description`, `theme_color`, `background_color`, both icon sizes present and correct. |

Nothing under `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, or the metadata/OG/structured-data exports was touched by this diff, and the deployed artifact confirms every one of them still resolves correctly.

## Console

Zero console errors, both routes, all four theme×viewport combinations captured by `preview.mjs` (8 total), and zero across all 40 `AlertBanner` consumer page loads captured by the standalone legibility script. No React warning observed in any of these 48 page loads.

## Layout

**No horizontal overflow, no control outside the viewport, at 390, 1440, 2560 and 3840, both themes, both routes**, measured live against the deployed artifact:

| Width | Route | light overflow | dark overflow | Unreachable controls |
|---|---|---|---|---|
| 390 | `/` | 0 | 0 | none |
| 390 | `/custo-da-hora` | 0 | 0 | none |
| 1440 | `/` | 0 | 0 | none |
| 1440 | `/custo-da-hora` | 0 | 0 | none |
| 2560 | `/` | 0 | 0 | none |
| 2560 | `/custo-da-hora` | 0 | 0 | none |
| 3840 | `/` | 0 | 0 | none |
| 3840 | `/custo-da-hora` | 0 | 0 | none |

`document.documentElement.scrollWidth − clientWidth` is 0 at all 16 route×width×theme combinations; `main button, main input, main a` has zero elements with `right > innerWidth+1` or `left < -1` in any of them.

**The widest viewport is the deciding one for `AlertBanner`'s chrome budget, as instructed**, since the root is 18px (112.5%) from 2560px upward (`app/globals.css:234-238`, `@media (min-width: 160rem)`) and 106.25% in `[1920, 2559]` per `design.md`'s remedy. Measured chrome spend, all five consumers, both themes, both routes:

| Width | `surfaceRootWidth` | `bodyTextWidth` | chrome spend | LR2a budget (32px) margin |
|---|---|---|---|---|
| 390 | 308.00 | 282.00 | **26** | 6px |
| 1440 | 667.33 | 641.33 | **26** | 6px |
| 2560 | 961.00 | 932.00 | **29** | **3px** |
| 3840 | 961.00 | 932.00 | **29** | **3px** |

Identical across every one of the 40 consumer measurements — one mechanism for five consumers, as `design.md` §3.4 states. This matches G6's local numbers exactly (`bodyTextWidth` 282.00/641.33 at 390/1440, chrome spend 26/29), confirming the T3 remedy is what actually shipped to this preview. The narrowest margin anywhere is **3px at 2560/3840** — passing, but the tightest margin in the spec, as `STATUS.md`'s D4 note already flagged; nothing here narrows it further.

**LR2b** (binding at 1440 only, per `legal.md` §3.2): C1 = 48.5 cpl, C2 = 55.5 cpl, C3 = 87 cpl, C4 = 52 cpl, C5 = 69 cpl — all ≥ 40, pass. **Residual at 390** (not binding for `AlertBanner`, reported only, `legal.md` §3.3): C1 = 32.33, C2 = 37.00, C3 = 34.80, C4 = 26.00, C5 = 34.50 — carried here for `qa-engineer`/`labor-law-analyst`'s own tables, judged by neither of them per AC11's ruling in `spec.md`.

**DS1, DS2, DS4 — the surfaces `0005` repaired — hold on this preview:**

| Surface | 390 cpl | 1440 cpl | LR1 |
|---|---|---|---|
| DS1 (footer, both routes) | 53.25 | 94.67 | pass |
| DS2 (DSR caption, `/`, driven via gross salary + C5) | 44.67 | 67.00 | pass |
| DS4 (consent dialog, both routes) | n/a (hit-box only) | n/a | pass, panel width 358px @390 / 512px @1440 (≥ `min(480, viewport−32)`), all three controls (`Telemetria`, `Salvar Preferências`, `Fechar configurações de privacidade`) visible and fully inside both the viewport and the panel bounds |

DS1's 53.25 and DS2's 44.67 match G6's local numbers and `legal.md` §3.2's cited bands exactly. **One methodological note, not a finding:** the first pooled run (6 concurrent Playwright contexts against the live preview) read DS4's panel width at `/custo-da-hora` 390 dark as 357.06px — 0.94px under the 358px hit-target floor. Isolated re-runs of that exact case (no concurrency, 3 attempts) and a second pooled run at concurrency 3 both settled cleanly to exactly 358.00px every time; the dialog's open transition approaches its final width asymptotically (346.8 → 357.7 → 358.0 px over ~150ms) and the first run's stabilization poll caught a transient plateau under network contention from 6 simultaneous contexts hitting the same preview host, not a real narrowing. Recorded so the next reviewer does not need to re-derive this; the final, reproduced, low-concurrency measurement (358.00px, matching `min(480, 390−32)` exactly) is what is reported in the table above and is what this verdict is based on.

**Ads:** no `adsbygoogle`/ad-slot markers in the served HTML of either route on this preview — ads are off in this environment (consistent with `categories:best-practices` scoring 1.00 with no ad-network requests in the trace). `PRODUCT.md` §8's reserved-slot/no-CLS-shift rule was not exercisable here for that reason, same as it was not locally at G6.

## Findings

### blocker — F1: `categories:performance` fails the Lighthouse CI budget on the deployed preview, both routes

- **Where:** Not attributable to any file this spec touches. The LCP element on both routes is `div.relative > div.relative > div.@container > p.numeric` (`components/organisms/hero-panel.tsx`'s live numeric readout, by selector and by G6's own identification of the same element locally) — well outside `components/atoms/alert-banner.tsx`, the only file in `0006`'s diff.
- **What is wrong:** `.lighthouserc.js` requires `categories:performance ≥ 0.93` on every run. On `https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app`, three runs each on `/` and `/custo-da-hora` score **0.74, 0.74, 0.76** and **0.76, 0.76, 0.76** — every single run fails, by a wide margin. LCP is 5562–6069 ms, roughly double G6's local 2567–2667 ms measured under the identical simulated-mobile-throttling profile (`emulatedFormFactor: mobile`, `throttlingMethod: simulate`, `rttMs: 150`, `cpuSlowdownMultiplier: 4` — read from the same `lhr-*.json`, unchanged between local and preview collection). Per `largest-contentful-paint-element`'s own phase breakdown in every one of the 6 collected LHRs: TTFB 610–632 ms (10–11%), Load Delay 0 ms (0%), Load Time 0 ms (0%), **Render Delay 5124–5432 ms (89–90%)**. TBT stays low (18–75 ms) and CLS is 0, so this is not a long-main-thread-task or a layout-shift problem — it is specifically that the LCP element does not paint until very late in the load, and the gap between TTFB and paint is almost entirely "Render Delay," which Lighthouse attributes to work after the resource finishes loading and before the element paints (JS parse/compile/execute/hydration on the critical path, per `bootup-time`'s per-script breakdown: `02bikni1ronuf.js` alone costs 326 ms total, `42k4qeddn8b9w.js` 124 ms, plus 263 ms "Unattributable").
- **What correct looks like:** `categories:performance ≥ 0.93` on both routes, all runs, on the deployed artifact — the same bar G6 already cleared locally (0.97 both routes). This is **not a regression this gate can attribute to `0006`'s diff**: the LCP element is unrelated to `AlertBanner`, CLS is 0 (so the banner's row change did not destabilize anything), and `AlertBanner` contributes no JS of its own to the bundle that isn't already there locally. It is, however, a real, reproducible failure of the budget this gate is required to score on every host, with no exemption available for `performance`/LCP the way there is for `best-practices`/`seo` on a `*.vercel.app` alias. Recommend `tech-lead` determine whether this is a property of the preview environment generally (cold serverless functions, the `vercel.live` feedback script sitting in the critical path, or a difference in prerendering between the preview build and G6's local `next build && next start`) that would show up on **any** spec's G9 and needs its own investigation outside `0006`, or whether something in this PR's diff changed hydration cost in a way neither `pnpm build`'s bundle-size checks nor G6's local Lighthouse run would have caught. Until it is understood and either fixed or ruled a pre-existing/out-of-scope platform property, this gate cannot pass the artifact that ships.
- **Reproduction:** `PLAYWRIGHT_TEST_BASE_URL=https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app pnpm exec lhci autorun --collect.numberOfRuns=3 --upload.target=filesystem`; read `categories.performance.score` and `audits['largest-contentful-paint-element'].details.items[1].items` (the phase table) from any of the resulting `.lighthouseci/lhr-*.json`.

## Checked and clean

- All 40 `AlertBanner` consumer measurements (C1–C5 × 4 widths × 2 themes) on the deployed preview: LR2a holds everywhere, chrome spend 26px at 390/1440 and 29px at 2560/3840 — identical to G6's local numbers, narrowest margin 3px at 2560/3840, still inside the 32px budget. LR2b holds at 1440 (all ≥ 40 cpl); 390 residuals recorded, not binding.
- Role, accessible name, icon `aria-hidden`, and zero added focusable elements confirmed structurally on all 40 consumer page loads — unchanged from before the diff, on the artifact that ships.
- Zero axe-core violations at any severity, both routes, both viewports (390/1440), both themes.
- Contrast: 8 measured text-on-surface combinations, all ≥ 5.05:1 against WCAG 2.2 1.4.3's 4.5:1 floor — byte-for-byte identical to G6.
- Reduced motion: `transitionDuration`/`animationName` identical to G6 under both `prefers-reduced-motion` states.
- **CLS is 0 on all 6 Lighthouse runs, both routes** — the row-changing `AlertBanner` remedy introduces no layout shift on the real, deployed artifact.
- `categories:accessibility` 1.00 and `categories:best-practices` 1.00 on all 6 runs (budgets 0.98 each) — pass outright.
- `categories:seo` 0.66 on all 6 runs — proven attributable entirely to the platform's `X-Robots-Tag: noindex` header via the single `is-crawlable` audit item, repo grep clean; reported, not scored, per the settled G9 ruling.
- No horizontal overflow and no control outside the viewport at 390, 1440, 2560 and 3840, both themes, both routes.
- DS1 (53.25/94.67 cpl), DS2 (44.67/67.00 cpl), DS4 (358px/512px panel width, all three controls in-panel and in-viewport) — the surfaces `0005` repaired — are unchanged on the deployed artifact.
- `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, canonical, Open Graph and structured data all resolve correctly on the preview and point at the production domain where relevant.
- Zero console errors and zero React warnings across 48 captured page loads.
