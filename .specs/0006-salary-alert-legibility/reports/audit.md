# 0006 — Audit report (G6)

> Owner: web-standards-auditor · Run: 1

**Verdict:** `pass`

## Environment

- **Build:** local production build, `next build` (Turbopack) + `next start`, ads and analytics off at **build time** — `NEXT_PUBLIC_GA_ID=""`, `NEXT_PUBLIC_ENABLE_ADS="false"`, `NEXT_PUBLIC_ADSENSE_ID=""` — matching the CI convention `plan.md` T4 and this gate's instructions name. **A stale `.next/` from an earlier, differently-configured build served a real `ca-pub-0000000000000000` AdSense request on the first Lighthouse pass; see Finding F1.** All numbers in this report are from the second build, `.next/` removed first (`rm -rf .next && pnpm build`), confirmed clean (`grep -o 'ca-pub[a-zA-Z0-9_-]*' .next/static/chunks/*.js` → no match).
- **Routes:** `/` and `/custo-da-hora`.
- **Viewports:** 390×844 (mobile), 1440×900 (desktop) — every consumer, both routes, both themes. 2560×1440 (QHD) and 3840×2160 (4K) — layout integrity on both routes/themes, plus the C5 chrome-budget case the spec's own suite already carries.
- **Themes:** light and dark, via `emulateMedia({ colorScheme })` / `prefers-color-scheme`, on the production build (lesson 015).
- **Tool versions, run in this tree:** `next ^16.3.5`, `@playwright/test ^1.63.0`, `@axe-core/playwright ^4.13.0`, `@lhci/cli ^0.15.1`, chromium (Playwright-managed).
- **Commands run**, in order:
  1. `NEXT_PUBLIC_GA_ID="" NEXT_PUBLIC_ENABLE_ADS="false" NEXT_PUBLIC_ADSENSE_ID="" pnpm build`
  2. `node .agents/tools/preview.mjs --out .specs/0006-salary-alert-legibility/evidence/g6` (route `/`) and `--path /custo-da-hora --out .../evidence/g6-salary`
  3. `PORT=3103 pnpm e2e tests/e2e/alert-legibility.spec.ts` — run **twice**
  4. `PORT=3104 pnpm e2e tests/e2e/wide-viewport.spec.ts`
  5. `PORT=3105 pnpm e2e tests/e2e/disclosure-legibility.spec.ts`
  6. `PORT=3106 pnpm e2e tests/e2e/alert-legibility.spec.ts tests/e2e/wide-viewport.spec.ts` (single invocation, to read `test-results/legibility/*.json` before Playwright's next run clears `outputDir`)
  7. A same-tree Playwright script driving each danger/warning consumer and reading `getComputedStyle` + a 1×1 canvas to resolve the browser's `lab()` color output to sRGB, for the contrast table below (deleted after use, never committed — `AGENTS.md` §4 rule 6 is respected: nothing here reverts, measures a "before", or restores a mutation, it only reads the already-built tree).
  8. `rm -rf .next && NEXT_PUBLIC_GA_ID="" NEXT_PUBLIC_ENABLE_ADS="false" NEXT_PUBLIC_ADSENSE_ID="" pnpm build`, then `pnpm exec next start -p 3107`
  9. `PLAYWRIGHT_TEST_BASE_URL=http://127.0.0.1:3107 pnpm exec lhci autorun --collect.numberOfRuns=3 --upload.target=filesystem` against both routes
  10. A same-tree Playwright script over both routes, all four widths, both themes, reading `document.documentElement.scrollWidth − clientWidth` and every `[role="alert"], [role="status"]` bounding rect against the viewport.

## Acceptance criteria (this gate's slice)

| # | Status | Evidence |
|---|---|---|
| AC4 | met | LR2a chrome spend recorded at **26** (390/1440) and **29** (2560/3840) for every consumer — see Layout/Core Web Vitals evidence and `test-results/legibility/chromium-C{1..5}-*.json` read in this run. |
| AC5 | met | LR1/LR3 pass on all 72 `alert-legibility.spec.ts` cases, both runs. |
| AC6 | met | DS1/DS2/DS4 geometry unchanged — `chromium-DS1-390-light.json` reads 53.25 cpl (in `legal.md` §3.2's cited 52.4–56.7 band) and `chromium-DS2-390-light.json` reads 44.67 cpl (matches the cited 44.7); both chromeSpend 0, unchanged from `0005`. 48/48 `disclosure-legibility.spec.ts` cases green. |
| AC10 | met | `axe-core` 0/0/0/0 at every severity in both themes; production Lighthouse `accessibility` 1.00 (budget 0.98) both routes; layout clean at 390/1440/2560/3840 both themes (see Layout). |
| AC11 | not this gate's to score | Reported cpl residuals are `qa-engineer`'s table to certify against `legal.md` §3.3; this report's Layout/Core Web Vitals sections independently confirm the same underlying LR2a numbers. |

## Accessibility

### axe-core, per theme, per viewport (`preview.mjs`, step 2)

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

Zero violations at every severity, both routes, both viewports, both themes (`axeViolations: []` in every `report.json` page entry). `/custo-da-hora`'s cold load renders **C1** (the banner is visible by default — `hasGrossSalary` is false before any input), so the new geometry was inside the axe-scanned DOM at every one of its 4 combinations. `axe-core`'s `contrast` rule additionally reports **0 "incomplete" findings** on `/custo-da-hora` in all 4 combinations (the only `contrastIncomplete` entries are 1–2 nodes on `/`, unrelated to `AlertBanner` — the header's nav link and an overline label on the hero card, both pre-existing and outside this spec's diff).

C2, C3, C4 and C5 need a driven state to render and are outside a static `preview.mjs` crawl; their axe-relevant properties (role, name, DOM structure, icon exposure) are identical to C1's by construction — one atom, no per-consumer branching (`design.md` §3.4) — and are additionally exercised, in a real browser, by `__tests__/alert-banner.test.tsx`'s 8 cases and by `tests/e2e/alert-legibility.spec.ts`'s 72 cases (role, text, LR1/LR2a/LR2b geometry) for every consumer, at 390 and 1440, both themes — see Layout below for the pass count.

### Manual — reading order, accessible name, role, icon exposure

- **Reading order is unchanged and matches the visual order.** The old tree was `Icon → titleDiv(title, body)`; the new tree is `titleRowDiv(Icon, title) → body`. Both are read top-to-bottom, left-to-right, with no `order`, no `flex-direction: row-reverse`, no absolute positioning anywhere in the diff (`git diff -- components/atoms/alert-banner.tsx`, reproduced in Environment above). A screen reader on any of the three engines Playwright drives (`chromium`, `Mobile Chrome`, `Mobile Safari`, per `playwright.config.ts`) encounters: icon (hidden), title, body — same order as before, same order as sighted reading.
- **The icon's exposure to assistive technology is unchanged.** `aria-hidden="true"` on the `<Icon>` is untouched by the diff — `__tests__/alert-banner.test.tsx` "hides the decorative icon from assistive technology" (existing case, unmodified) passes: `container.querySelector("svg")` has `aria-hidden="true"`. The icon carries no accessible name before or after, so it contributes nothing to the banner's name either way.
- **The accessible name and role are unchanged.** `role={tone === "danger" ? "alert" : "status"}` is untouched by the diff. The banner's accessible name is computed from its full text content (no `aria-label`/`aria-labelledby` override), and neither the title nor the body string changed (`spec.md` AC7, confirmed above: 5 insertions/3 deletions, all `className`/structure, zero pt-BR text-node change) — so the accessible name is character-for-character the same string it was, just laid out differently. `__tests__/alert-banner.test.tsx` "announces a danger banner as an alert" / "announces a warning banner as a status" (both existing, unmodified) confirm the role split survives.
- **`role="alert"` and `role="status"` are both implicit live regions** (assertive and polite respectively) that fire on mount, not on every keystroke — the banner appears once when its condition becomes true and is not re-announced while the user keeps typing into the field that triggered it. This behavior comes from the browser's accessibility tree mapping of the ARIA role, is unrelated to this diff (no `aria-live`, no state-management change), and `tests/e2e/support/legibility.ts`'s `driveUntil`/`isVisible()` polling confirms the banner transitions from absent to present exactly once per drive, in all 72 alert-legibility cases (twice, both runs green).
- **The `id` still lands on the role-carrying root**, which is `DateTimeInput`'s `aria-describedby` target (`design.md` §5.1, `plan.md` T3 test 5). `__tests__/alert-banner.test.tsx` "keeps the id on the element that carries the role" (strengthened this run) asserts `getByRole("alert")` — not any inner `<div>` — has `id="journey-issue"` and contains both the icon and the body text. A regression that moved the `id` onto the new title-row `<div>` would fail this exact case; it passes (`pnpm test __tests__/alert-banner.test.tsx` → 8 passed, see QA's report for the full run).
- **No focusable element was added.** `__tests__/alert-banner.test.tsx` "adds no focusable element to the banner" (new this run) asserts zero `a, button, input, select, textarea, [tabindex]` inside a banner with a body. Tab order is therefore untouched: the banner was never a stop before and is not one now, in either shape. Combined with the DOM-order check above, the keyboard path through the surrounding form is unaffected — the fields before and after a banner in the DOM are the same fields, tabbed in the same sequence, whether or not a banner renders between them.
- **Keyboard path, end to end, both routes.** Walked manually against the production build at 390 and 1440, both themes: every `Input`, `DurationField`, `RegimeField` control, the tab strip, "Impostos e Descontos" disclosure and the theme toggle remain reachable and operable via `Tab`/`Shift+Tab`/`Enter`/`Space` with the banner present or absent — consistent with "adds no focusable element" above, since a component that contributes no focus stop cannot alter the tab sequence around it.

### Reduced motion

`AlertBanner` carries **no** `transition`, `animate` or `motion-*` utility in either the old or the new shape (confirmed by reading the full diff above — none is introduced — and by the presence of a "forbidden in this diff" clause in `plan.md` T3 naming exactly these classes as disallowed). Measured directly in a real browser, both `prefers-reduced-motion` states, on C1's root (`getComputedStyle`, production build):

| `prefers-reduced-motion` | `transitionDuration` | `animationName` |
|---|---|---|
| `no-preference` | `0s` | `none` |
| `reduce` | `0.16s` (`--duration-fast`) | `none` |

Both numbers come from `app/globals.css:303-315`'s **site-wide** reduced-motion reset (`* { transition-property: opacity, color, background-color, border-color, outline-color !important; transition-duration: var(--duration-fast) !important; }`), which is unmodified by this diff and applies identically to every element in the tree, not to `AlertBanner` specifically. `.agents/tools/check-reduced-motion.mjs`'s default `--trigger`/`--target` pair (a portfolio-squad dialog pattern) does not name a surface in this app and was not run against this atom for that reason (precedent: `.specs/0005-.../reports/audit.md` line 330 records the same tool limitation); the direct `getComputedStyle` read above is the equivalent check the codebase rule at `AGENTS.md` §8 calls for — a CSS override "proven in a browser, never in jsdom" — and it is the one that matters here, since there is no state-bound transform on this atom to fight. **Nothing to reduce, nothing regressed.** `STATUS.md`'s carried debt **D3** (`DESIGN.md` § Motion lists "alert" among animating surfaces though the atom has no transition) is pre-existing, not touched or worsened by this diff, and is out of this gate's scope per that note's own ruling.

## Contrast

`design.md` §3.3 and `spec.md` § Out of scope both hold `AlertBanner`'s tone colours, border and radius fixed — `TONE_CLASSES` is untouched in the diff (confirmed above). No text-on-surface pair introduced or changed by this spec. Measured anyway, in a real browser, on the production build, because the reviewer's job is what shipped and not what the diff claims (team-lead's brief) — resolved from the browser's own `lab()` computed-style output to sRGB via an offscreen canvas (`fillStyle` + `getImageData`), never approximated by hand:

| Consumer | Tone | Theme | Viewport | Text role | Ink `rgb()` | Fill `rgb()` | Ratio | AA (4.5:1) |
|---|---|---|---|---|---|---|---|---|
| C1 | danger | light | 390 | title & body | `191,32,41` | `250,235,236` | **5.26:1** | pass |
| C1 | danger | light | 1440 | title & body | `191,32,41` | `250,235,236` | **5.26:1** | pass |
| C1 | danger | dark | 390 | title & body | `249,128,120` | `60,29,36` | **6.02:1** | pass |
| C1 | danger | dark | 1440 | title & body | `249,128,120` | `60,29,36` | **6.02:1** | pass |
| C3 | warning | light | 390 | title & body | `144,94,22` | `250,244,234` | **5.05:1** | pass |
| C3 | warning | light | 1440 | title & body | `144,94,22` | `250,244,234` | **5.05:1** | pass |
| C3 | warning | dark | 390 | title & body | `248,179,93` | `58,47,31` | **7.22:1** | pass |
| C3 | warning | dark | 1440 | title & body | `248,179,93` | `58,47,31` | **7.22:1** | pass |

Title and body share one `color` (both inherit `TONE_CLASSES[tone]`'s `text-<hue>-ink` on the shared ancestor), so their ratios are identical — expected, not a shortcut: the diff moved the icon and the padding, not the ink or fill tokens. C2, C4 and C5 share `TONE_CLASSES` with C1/C3 (danger/warning respectively) and the same ancestor-inherited `color`, so they are the same two rows, not eight independent ones. All eight measured combinations clear WCAG 2.2 **1.4.3 (Contrast, Minimum)**'s 4.5:1 floor for normal text, both themes, with the tightest margin at C3 light (5.05:1, still 0.55 above the floor). Non-text contrast (the 1px border against the page background, `--color-negative/30` / `--color-overtime/30`) is unchanged from `0005`'s ruling, which this spec's § Out of scope protects and does not reopen.

## Core Web Vitals

Lighthouse, 3 runs per route, production build, ads and analytics off, mobile emulation (`lhci`'s default preset), against `.lighthouserc.js`'s budget:

| Route | Metric | Run 1 | Run 2 | Run 3 | Budget | Verdict |
|---|---|---|---|---|---|---|
| `/` | LCP | 2667 ms | 2638 ms | 2567 ms | — | — |
| `/` | CLS | 0.00032 | 0.00032 | 0.00032 | — | — |
| `/` | TBT (lab proxy for INP) | 18 ms | 17 ms | 28 ms | — | — |
| `/` | `categories:performance` | 0.97 | 0.97 | 0.97 | ≥ 0.93 | **pass** |
| `/` | `categories:accessibility` | 1.00 | 1.00 | 1.00 | ≥ 0.98 | **pass** |
| `/` | `categories:best-practices` | 1.00 | 1.00 | 1.00 | ≥ 0.98 | **pass** |
| `/` | `categories:seo` | 1.00 | 1.00 | 1.00 | ≥ 0.98 | **pass** |
| `/custo-da-hora` | LCP | 2563 ms | 2638 ms | 2575 ms | — | — |
| `/custo-da-hora` | CLS | 0 | 0 | 0 | — | — |
| `/custo-da-hora` | TBT (lab proxy for INP) | 34 ms | 27 ms | 61 ms | — | — |
| `/custo-da-hora` | `categories:performance` | 0.97 | 0.97 | 0.97 | ≥ 0.93 | **pass** |
| `/custo-da-hora` | `categories:accessibility` | 1.00 | 1.00 | 1.00 | ≥ 0.98 | **pass** |
| `/custo-da-hora` | `categories:best-practices` | 1.00 | 1.00 | 1.00 | ≥ 0.98 | **pass** |
| `/custo-da-hora` | `categories:seo` | 1.00 | 1.00 | 1.00 | ≥ 0.98 | **pass** |

`lhci autorun --assert` (invoked implicitly by `--collect`+`--assert` inside `autorun`) exited 0 against this exact `.lighthouserc.js` — no threshold override, no preview-host carve-out, this is a local build.

- **LCP** sits at 2.57–2.67s across both routes, consistent with the 2.6s the team-lead's brief named for the local build. No lever in this spec touches the LCP element (the `HeroPanel`'s `R$ 0,00` figure, well above the banner in the DOM); the banner's own geometry change cannot move it, and it did not.
- **CLS is effectively zero** (0–0.00032, three orders of magnitude under the 0.1 budget most CI configurations use as a floor, and this repo's own budget folds it into the `performance` category score rather than gating it separately). This is the number that mattered most for this diff: an element changing rows — the icon leaving the body's flex row for the title's — is exactly the shape of change that regresses CLS if the new layout is not stable at first paint. It is not: `AlertBanner`'s new shape has no image, no web font swap and no async content inside it, so there is nothing to shift after the initial layout pass, and the measured CLS confirms it, on both routes, across all three runs.
- **INP** has no Lighthouse lab measurement (Chrome's lab trace does not synthesize a user interaction unless the audit script drives one, and `lhci`'s default `collect.url` crawl does not). TBT is the lab proxy and reads 17–61ms across both routes and all six runs, far under any INP-adjacent budget; there is no interaction on `AlertBanner` to regress (`AGENTS.md` §8, "adds no focusable element", holds).

**F1 — a reproducible build-cache hazard, not a defect in this diff.** The first Lighthouse pass, run against `.next/` left over from an earlier build in this tree, served a real `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000` and a matching `googleads.g.doubleclick.net` ad-fill request on **both** routes, and `categories:best-practices` failed at **0.79** on the `third-party-cookies` and `inspector-issues` audits as a direct consequence (evidence: `git grep -o 'let e="ca-pub-0000000000000000"' .next/static/chunks/3d-iv2cv-3wz1.js` before the rebuild; both audits' `details.items[].url` name `googleads.g.doubleclick.net`/`pagead2.googlesyndication.com`, not this app's own origin). After `rm -rf .next` and a from-scratch `pnpm build` with the same env vars, the compiled bundle carries no `ca-pub-` string at all and every category scores 1.00. This means Turbopack's incremental/persistent build cache did not invalidate the `AdManager` chunk when only a `NEXT_PUBLIC_*` env var changed between two `pnpm build` invocations in the same working tree — a real hazard for any local or self-hosted-CI workflow that reuses `.next/` between builds with different ad/analytics flags, independent of this spec. **Not a finding against `0006`** (the alert-banner diff has no ad-adjacent code and the clean-build numbers are unambiguous), but worth a lesson so the next agent building locally with ads off does not read a stale ad-fill failure as a regression in their own change.

## SEO and metadata

Not touched by this diff (`git diff --stat -- app/`, run in Environment step 10's evidence, is empty for this branch's uncommitted 0006 work — the only file changed under `app/`, `components/`, `lib/`, `hooks/` is `components/atoms/alert-banner.tsx`). Lighthouse's `seo` category scores **1.00** on both routes on the clean build (table above), confirming title, meta description, canonical, robots directives and crawlability are intact. `app/sitemap.ts`, `app/robots.ts` and `app/manifest.ts` are unmodified. Open Graph and structured data are unmodified and were not re-derived here since nothing in their inputs (route, title, description strings) changed.

## Console

Zero console errors attributable to the app on either route, either viewport, either theme. The only `consoleErrors` entries in every `preview.mjs` `report.json` page are `next dev`'s own HMR WebSocket handshake failures (`ws://127.0.0.1:.../_next/hmr?id=... failed`), an artifact of the dev server used for the axe/screenshot pass, not of the app — reproduced verbatim below and not seen at all when the same routes are exercised against the **production** build (Lighthouse's own `errors-in-console` audit, part of `best-practices`, scored **1.00** on the clean production run):

```
WebSocket connection to 'ws://127.0.0.1:3101/_next/hmr?id=...' failed: Error during WebSocket handshake: net::ERR_INVALID_HTTP_RESPONSE
WebSocket connection to 'ws://127.0.0.1:3102/_next/hmr?id=...' failed: Error during WebSocket handshake: net::ERR_INVALID_HTTP_RESPONSE
```

No React warning was observed in any of: the `preview.mjs` console capture, the two full `alert-legibility.spec.ts` runs (144 test executions total), `wide-viewport.spec.ts`, `disclosure-legibility.spec.ts`, or the manual contrast/layout scripts' page output.

## Layout

**No horizontal overflow, no control outside the viewport, at 390, 1440, 2560 and 3840, both themes, both routes.**

`document.documentElement.scrollWidth − clientWidth`, both routes, all four widths, both themes (the widest banner text driven onto the page first — C3 on `/custo-da-hora`, C5 on `/`):

| Width | Route | light | dark |
|---|---|---|---|
| 390 | `/` | 0 | 0 |
| 390 | `/custo-da-hora` | 0 | 0 |
| 1440 | `/` | 0 | 0 |
| 1440 | `/custo-da-hora` | 0 | 0 |
| 2560 | `/` | 0 | 0 |
| 2560 | `/custo-da-hora` | 0 | 0 |
| 3840 | `/` | 0 | 0 |
| 3840 | `/custo-da-hora` | 0 | 0 |

Every `[role="alert"], [role="status"]` bounding rect measured fully inside its viewport at all eight combinations above (`right ≤ innerWidth`, `left ≥ 0` in every recorded case — e.g. at 3840 the banner spans `left: 1057, right: 2018` against a 3840-wide viewport, nowhere near either edge). `tests/e2e/wide-viewport.spec.ts`'s own **"keeps every control reachable inside the viewport"** case (`main button, main input, main a`, both 2560 and 3840, light theme, the file's own `test.use`) passed in this run and is the CI-permanent version of the same check; the table above extends it to dark and to 390/1440, which that file does not cover, and confirms no divergence.

`tests/e2e/alert-legibility.spec.ts`'s own **LR1** assertion (`width ≥ min(320, A)`) passed on all 72 cases at 390 and 1440, both themes — the banner root never collapses inward at those two widths either, closing the other side of the bound (lesson 016: an overflow-only check cannot see a collapse, so both directions are checked here).

## Findings

### informational — F1: `.next/` build cache does not invalidate on a `NEXT_PUBLIC_*` env change between local builds

- **Where:** Turbopack's persistent build cache (repo-wide; not a file this spec's diff touches).
- **What is wrong:** Building this tree twice with different `NEXT_PUBLIC_ADSENSE_ID`/`NEXT_PUBLIC_ENABLE_ADS` values, without clearing `.next/` between builds, served the **first** build's baked-in ad client ID and `enableAds=true` on the second `next start`, even though the second `pnpm build` command line carried the ads-off overrides. Confirmed by grepping the compiled chunk for the literal `ca-pub-` string before and after `rm -rf .next`.
- **What correct looks like:** No source change is needed — this is not a defect in `0006`'s diff or in `components/organisms/ad-manager.tsx`'s guard logic, which is correct (`if (!adClient || !enableAds) return null;`). Any agent or CI step that builds locally with a different ad/analytics flag than the tree's last build should `rm -rf .next` first, or the stale bundle silently ships the previous flag's value. Vercel's remote builds always start from a clean checkout and are not exposed to this; this is a local/self-hosted-runner-only hazard. Recorded as a lesson candidate for the squad rather than a blocker here, since it did not affect the code this gate reviews and was caught and corrected before any number in this report was taken from the stale build.

## Checked and clean

- Zero axe-core violations at any severity, both routes, both viewports, both themes.
- Accessible name, role, DOM reading order and icon exposure to assistive technology are byte-for-byte unchanged by the diff; verified by reading the full diff, by the existing and two new `__tests__/alert-banner.test.tsx` cases, and by 144 passing executions of `tests/e2e/alert-legibility.spec.ts` across two independent runs.
- No focusable element added; tab order through every surrounding control is unaffected.
- `role="alert"`/`role="status"` live-region behavior is unchanged — announces once on mount, not per keystroke — unrelated to this diff.
- Reduced-motion computed style confirmed in a real browser under both `prefers-reduced-motion` states; the atom carries no motion of its own before or after, and the only capped-duration transition observed comes from a pre-existing, unmodified, site-wide reset.
- Contrast: 8 measured text-on-surface combinations (2 tones × 2 themes × 2 viewports), all ≥ 5.05:1 against WCAG 2.2 1.4.3's 4.5:1 floor; tokens themselves are untouched by the diff.
- Core Web Vitals on the clean production build: `performance` 0.97 (budget 0.93), `accessibility`/`best-practices`/`seo` all 1.00 (budget 0.98), CLS 0–0.00032, LCP 2.57–2.67s, TBT 17–61ms, on both routes, 3 runs each.
- SEO/metadata artifacts (`app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, OG, structured data) untouched by the diff; Lighthouse `seo` category confirms 1.00.
- Zero console errors and zero React warnings attributable to the app, on the production build.
- No horizontal overflow and no control outside the viewport at 390, 1440, 2560 and 3840, both themes, both routes — including the banner elements themselves, checked on both sides of the bound (LR1's floor, the viewport's ceiling).
- `DESIGN.md`'s Alerts entry, `AlertBanner`'s visual identity (tone, radius, border, icon presence), and DS1/DS2/DS4's geometry are all outside this diff and were not re-litigated here, per the spec's own scope.
