# 0005 — Web standards audit (G9, deployed preview)

> Owner: web-standards-auditor · Gate: `preview` (G9) · Run 1

**Verdict: pass.**

Every number `reports/audit.md` (G6) measured on the local production build reproduces on the
actual Vercel deployment, inside noise: zero axe-core violations at any severity across all 8
route × viewport × theme combinations, zero `pageerror`/console error on cold `networkidle` load in
both themes on both routes, `design.md` §7's first-frame criterion holds clause by clause (server
HTML ships both glyphs, the correct one is already `display:block` at `domcontentloaded`, 0
header-attributable layout shift), and the four LR1–LR4 disclosure surfaces measure the same
rendered geometry as G6's local build. Lighthouse performance clears budget on the real network
(LCP 2.29–2.44 s median, well under G6's local 2.6 s) with zero assertion failures on `performance`
or `accessibility`. Best-practices (0.79) and SEO (0.66) miss the 0.98 budget on this preview, and
both misses are **third-party, platform-injected, and not this spec's defect** — see § Core Web
Vitals. One pre-existing, out-of-0005's-scope metadata defect is newly visible only because this is
a real deployment: the `og:image`/`twitter:image` absolute URLs resolve to a different host than
`metadataBase` declares (§ SEO and metadata, Finding 1) — reported for `tech-lead` to route, not
counted against this spec's own verdict since 0005 touches none of the files responsible.

---

## Environment

| | |
|---|---|
| Audited | Deployed Vercel preview, PR #39 — `https://workload-8kqr9212j-devrmas-projects.vercel.app` |
| Routes | `/`, `/custo-da-hora` |
| Node | v24.15.0 |
| Playwright | 1.63.0 (chromium) |
| @axe-core/playwright | 4.13.0 |
| @lhci/cli | 0.15.1, `lighthouserc.js`'s budget, pointed at the real URL via `PLAYWRIGHT_TEST_BASE_URL` (skips `startServerCommand`) |
| Viewports | 390×844, 1440×900 for LR1–LR4/D2/keyboard; 390, 1440, 2560, 3840 (×900 height) for the layout sweep |
| Themes | `light`, `dark` (`colorScheme` emulation) |
| Third-party surfaces on this deployment | No `NEXT_PUBLIC_ENABLE_ADS`/`NEXT_PUBLIC_GA_ID`/AdSense script present in the served HTML (`curl` confirms no `gtag`/`adsbygoogle`/`pagead` string) — the ads/analytics env vars the team-lead brief warned about are **not set on this preview**, so that specific caveat does not apply here. What *is* present and third-party: Vercel's own `vercel.live/_next-live/feedback/feedback.js` toolbar script (see § Core Web Vitals) |
| Prior evidence discarded | `evidence/preview-after/report.json` (left by an interrupted earlier attempt) has `"base": "http://127.0.0.1:3227"` and its `consoleErrors` are `next dev` HMR-websocket failures — **it audited a local dev server, not the deployment**, confirmed by reading the file directly. Discarded per the team-lead's instruction; not cited anywhere below. All evidence in this report is freshly captured against the real Vercel URL, written to `evidence/` (not `evidence/preview-after/`) |
| Evidence command | `node .agents/tools/preview.mjs --out .specs/0005-tailwind-theme-collision-and-dark-hydration-hotfix/evidence --path /,/custo-da-hora --base-url https://workload-8kqr9212j-devrmas-projects.vercel.app` — 8 captures, confirmed hitting the remote origin (`waitForServer` against `--base-url`, no local server spawned) |

---

## Accessibility

### axe-core, per theme, per viewport, per route — deployed preview

Command as above (`preview.mjs`, real origin).

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

Tool output: `violações axe: 0 | contrast incomplete: 4 | erros de console: 0` across all 8
captures. The 4 "contrast incomplete" entries are all on `/` (2 desktop, 2 mobile — none on
`/custo-da-hora`), all axe-unresolvable-background nodes on
`.hover\:text-ink.h-12[href$="custo-da-hora"] > span`, `.text-overline.uppercase.text-ink-onfill\/90`
and `.absolute.gap-1.text-center > .text-metric.numeric` — identical selectors to G6's finding,
none of the four DS1–DS4 surfaces this spec touches. Pre-existing, out of scope, not a finding
against this gate.

### Zero `pageerror`, deployed preview, both themes, both routes (focus #2)

Custom Playwright script against the live URL (`chromium.launch()` + `newContext({ colorScheme,
viewport })`, `page.on('pageerror', …)`, `goto(..., { waitUntil: 'networkidle' })`), 390×844 and
1440×900, both themes, both routes — 8 combinations.

| Route | Viewport | Theme | `pageerror` | `console` `type()==='error'` |
|---|---|---|---|---|
| `/` | 390 | light | 0 | 0 |
| `/` | 390 | dark | 0 | 0 |
| `/` | 1440 | light | 0 | 0 |
| `/` | 1440 | dark | 0 | 0 |
| `/custo-da-hora` | 390 | light | 0 | 0 |
| `/custo-da-hora` | 390 | dark | 0 | 0 |
| `/custo-da-hora` | 1440 | light | 0 | 0 |
| `/custo-da-hora` | 1440 | dark | 0 | 0 |

D2 (React error #418) does not reproduce on the deployed artifact, on the real CDN, on a cold
`networkidle` load, in either theme, on either route. This is the exact regression class that
shipped once already (`spec.md` § Problem, D2) — closed here as measured, not assumed.

### Manual checks — deployed preview

**Keyboard — theme toggle.** `button[aria-label="Alternar tema"]` focused via `.focus()`,
`getComputedStyle` reads `outlineStyle: solid`, `outlineWidth: 2px` (never suppressed). In a
`dark`-context (1440×900), the first `Enter` press flips `document.documentElement.className` from
`dark` to `light` — confirms the click/keyboard handler reads live DOM state rather than a stale
`resolvedTheme`, same as G6, now confirmed against the deployed bundle rather than the local one.

**Keyboard — consent dialog focus management.** Clicking the trigger
(`button[aria-label="Configurações de Privacidade"]`) moves focus inside
`dialog[aria-labelledby="privacy-settings-title"]` (`dialog.contains(document.activeElement) ===
true`). `Escape` closes it (`open` attribute removed) and returns focus to the triggering button —
confirmed by reading `document.activeElement`'s `outerHTML` after `Escape`, which is the same
`aria-label="Configurações de Privacidade"` button, isolated from any theme-toggle side effect that
muddied an earlier combined script run.

**Live regions.** No `aria-live` region exists around the theme toggle or inside the header on the
deployed page (checked via `document.querySelector('header [aria-live]')` → `null`, both themes) —
matches `design.md` §7.1 clause 4.

**Accessible names on the DS4 consent dialog.** The dialog's only three interactive controls all
expose the name LR4 clause 2 requires: the close button (`aria-label="Fechar configurações de
privacidade"`), the telemetry `role="switch"` (name resolved through `aria-labelledby="telemetry-
consent-label"` → **"Telemetria (Google Analytics)"**, confirmed by resolving the referenced
element's `textContent`, not the raw `aria-label` attribute, which is absent on this control by
design), and `Salvar Preferências`. The "Cookies Essenciais" row has no interactive control at all
(a static "Sempre ativo" label) and correctly is not in this count.

**Reduced motion.** Not re-instrumented at G9. `reports/audit.md` (G6) already established, and
`git diff` confirmed, that T6 — the only 0005 change adjacent to the consent dialog — added no
`motion` prop and touched only `flex-col`/`sm:flex-row` on two rows; the CSS-transition and
`motion`-library reduced-motion behavior is unchanged code shipping unchanged, so re-running
`check-reduced-motion.mjs` (whose Radix-specific third phase already does not match this app's
native `<dialog>`, per G6 Finding 2) against the deployed bundle would re-confirm a fact this spec
did not touch, at the cost of the tool's known 30s per-invocation timeout. Scope decision, not an
omission.

---

## D2 — the first-frame criterion (`design.md` §7), deployed preview

Element: `components/organisms/app-header.tsx:53-70`, the theme-toggle `Button`.

| `design.md` §7.1 clause | Verified | How |
|---|---|---|
| 1. Glyph theme-correct at first paint, not corrected later | **Pass** | Raw server HTML (`curl` against the deployment) contains both `data-theme-icon="moon"` and `data-theme-icon="sun"` literally. In a live browser, at `domcontentloaded` (before hydration completes) the correct glyph is already the one with `display:block`: light → moon `block`/sun `none`; dark → sun `block`/moon `none`. Identical reading again at `networkidle`, both routes |
| 2. No substitution at any point | **Pass** | `atDCL` and `atIdle` reads (glyph display, `aria-label`, bounding rect) are **byte-identical** (`JSON.stringify` equality) on all 4 route×theme combinations checked — no swap between first paint and settle |
| 3. No layout shift | **Pass** | `PerformanceObserver({type:'layout-shift'})` filtered to entries whose `sources[].node` is inside `header`: **0** on `/` in dark, both before and after `networkidle`. Total page CLS on `/` in dark is 0.00032 (attributable elsewhere on the page, confirmed by the same filter returning 0 for the header specifically) — the toggle's own contribution is exactly 0, matching `design.md` §7.1 clause 3's "0.000" claim |
| 4. Accessible name never changes; no live region introduced | **Pass** | `aria-label="Alternar tema"` identical at `domcontentloaded` and `networkidle` in every combination; no `[aria-live]` inside `header` |

**Reproduction (dark, `/`, 390×844):**

```
domcontentloaded: { sunDisplay: "block", moonDisplay: "none", ariaLabel: "Alternar tema", rect: {x:330,y:10,width:44,height:44} }
networkidle:       { sunDisplay: "block", moonDisplay: "none", ariaLabel: "Alternar tema", rect: {x:330,y:10,width:44,height:44} }
```

Identical for `/custo-da-hora` and for the light-theme equivalents (moon instead of sun). Confirms
G6's local-build finding reproduces on the real CDN, real fonts, real network.

---

## LR1–LR4 — disclosure surfaces, deployed preview

Measured with a Playwright script against the live URL, at 390×844 and 1440×900, both themes, both
routes — DS1 (footer, `legal.md` LR1–LR3) and DS4 (consent dialog, LR1–LR4). Method mirrors
`legal.md` §3's own definitions: rendered width via `getBoundingClientRect()`, characters-per-line
via a `Range` over each paragraph's text content, deduplicated line boxes from `getClientRects()`.

### DS1 — `calculator-views.tsx:73` footer

| Route | Viewport | Theme | Rendered width | `max-width` | Min chars/line (P3, the gap list) |
|---|---|---|---|---|---|
| `/` | 390 | light | 358px | 768px | 50 (P1); P3 = 52.4 |
| `/` | 390 | dark | 358px | 768px | identical |
| `/` | 1440 | light | 768px | 768px | 75 (P1); P3 = 104.75 |
| `/` | 1440 | dark | 768px | 768px | identical |
| `/custo-da-hora` | 390 | light/dark | 358px | 768px | identical to `/` (shared footer) |
| `/custo-da-hora` | 1440 | light/dark | 768px | 768px | identical to `/` |

LR1 (≥ min(320, A), which is 358px at 390 and 768px at 1440): **pass**, every cell. LR2 (≥40
chars/line): **pass**, every paragraph at every viewport — the lowest value observed anywhere is 50
chars/line (P1 at 390), 10 above the floor. Matches `reports/legal.md`'s G6 (358/768px, 52.4–56.7
cpl) and its own G9 entry (`STATUS.md`) exactly.

### DS4 — `cookie-consent.tsx:85` consent dialog

| Route | Viewport | Theme | Rendered width | `max-width` | LR1 floor (min(480, vw−32)) | Controls in-viewport / in-dialog |
|---|---|---|---|---|---|---|
| `/` | 390 | light | 358px | 512px | 358px | 3/3, 3/3 |
| `/` | 390 | dark | 358px | 512px | 358px | 3/3, 3/3 |
| `/` | 1440 | light | 512px | 512px | 480px | 3/3, 3/3 |
| `/` | 1440 | dark | 512px | 512px | 480px | 3/3, 3/3 |
| `/custo-da-hora` | 390/1440 | both | identical to `/` | 512px | — | 3/3, 3/3 |

LR1: **pass** at every cell — 358 ≥ 358 at 390 (exact match, no margin, as `legal.md` §4 clause 1
predicts for `max-w-lg`/512px at this viewport), 512 ≥ 480 at 1440. LR4 clause 2 (every choice
control fully within the viewport and the dialog, with its accessible label rendered): **pass** —
all three controls (close, telemetry switch, "Salvar Preferências") measured `withinViewport: true`
and `withinDialog: true` at every combination; the switch's accessible name resolves through
`aria-labelledby` to "Telemetria (Google Analytics)" and is visible (not `display:none`,
`visibility:hidden`, or `.sr-only`).

**Both LR1 and LR4 reproduce G6's local-build measurement and `reports/legal.md`'s G9 entry
exactly.**

---

## Contrast

No color token changed by this spec (`spec.md` § Out of scope). Re-measured on the deployed page
anyway, since real fonts and a real CDN are the reason G9 exists — axe-core's own `color-contrast`
rule, `#main-content > footer`, 390×844:

| Pair | Selector | Theme | Ratio | AA (normal text, 4.5:1) |
|---|---|---|---|---|
| `text-caption`/`text-ink-subtle` on page background | `footer > p` (×4) | light | **4.84:1** | Pass |
| `text-caption`/`text-ink-subtle` on page background | `footer > p` (×4) | dark | **5.74:1** | Pass |
| Footer source link, `underline` | `footer a` | light | **4.84:1** | Pass |
| Footer source link, `underline` | `footer a` | dark | **5.74:1** | Pass |

Identical to G6's local-build ratios — expected, since contrast is a function of color tokens, not
network or font-loading, and confirms the deployment ships the same computed colors.

---

## Core Web Vitals

Command: `PLAYWRIGHT_TEST_BASE_URL=https://workload-8kqr9212j-devrmas-projects.vercel.app pnpm exec lhci autorun --config=.lighthouserc.js` — this repo's own `lighthouserc.js` (3 runs/URL, median asserted), `startServerCommand` skipped because `PLAYWRIGHT_TEST_BASE_URL` is set, so Lighthouse hits the real deployment, not a local server.

| URL | Performance | Accessibility | Best Practices | SEO | LCP (median) | CLS (median) | TBT (median) |
|---|---|---|---|---|---|---|---|
| `/` | 0.98 | 1.00 | 0.79 | 0.66 | 2.43 s | 0.0003 | 20 ms |
| `/custo-da-hora` | 0.98 | 1.00 | 0.79 | 0.66 | 2.29 s | 0 | 20 ms |

Budget (`.lighthouserc.js`): performance ≥ 0.93, accessibility/best-practices/SEO ≥ 0.98.

**Performance and accessibility clear on both routes, with margin** (perf +0.05, a11y +0.02). LCP
is *better* than G6's local-build 2.6 s median (2.29–2.44 s here), consistent with the real CDN's
edge cache (`age`/`x-vercel-cache: HIT` headers observed on both routes) rather than a cold origin
render. CLS is 0–0.0003, matching D2's "0.000, before and after" claim and the header-scoped
0-shift reading above.

**Best-practices (0.79) and SEO (0.66) miss budget, and both misses are third-party, not this
spec's or this app's defect** — this is exactly the caveat the team-lead flagged before this gate
ran, confirmed rather than assumed:

- **`categories.best-practices`, both routes, score 0** on two audits: `third-party-cookies` (1
  cookie, `_vcrr_a6f6f6d0a85bc81d`) and `inspector-issues` (1 DevTools Issue, category "Cookie").
  Both point at the exact same script: **`https://vercel.live/_next-live/feedback/feedback.js`**
  — Vercel's own preview-deployment "Live Feedback" toolbar, injected by the platform on every
  `*.vercel.app` preview URL, not by this app's code. Confirmed by reading each audit's `details`
  table directly (`lhr-*.json`'s `audits['third-party-cookies'].details.items` and
  `audits['inspector-issues'].details.items`) — both name only `vercel.live`, nothing from this
  app's own origin. **No `gtag`/`adsbygoogle`/`pagead` script is present in the served HTML at all**
  (`curl` confirms) — the ads/analytics env vars the team-lead brief warned about are not set on
  this deployment, so the AdSense-placeholder caveat does not apply; the only third-party surface
  here is Vercel's own toolbar, which will not exist once this deploys to the production custom
  domain (`workload.devrma.com`) outside the preview-deployment context.
- **`categories.seo`, both routes, score 0** on one audit: `is-crawlable`, because the response
  carries `x-robots-tag: noindex` (confirmed via `curl -I`). This is Vercel's standard header on
  every preview deployment (distinct from the production domain), not a directive this app's code
  sets — `grep` across `app/layout.tsx`, `app/robots.ts` and `next.config.*` finds no `noindex`
  anywhere in this codebase. `app/robots.ts` itself correctly emits `Allow: /` (see § SEO and
  metadata) — the header overriding it is the platform's, applied to the `*.vercel.app` alias only.

Neither finding is inside this spec's file list, neither is inside `AGENTS.md` §9's bar as measured
against the artifact this app controls, and both are structurally incapable of surviving past the
preview-deployment context. Recorded here in full so `tech-lead` does not have to re-derive the
attribution, and so a future gate does not mistake a platform header for a regression in this repo.

INP is not measurable in Lighthouse's lab mode without a synthetic interaction
(`interaction-to-next-paint-insight` reports `scoreDisplayMode: "notApplicable"` on every run, as at
G6); Total Blocking Time (the lab proxy behind the performance score) is 15.5–65 ms across all 6
runs.

---

## SEO and metadata

Not touched by 0005's file list; checked against the real origin per this gate's standing brief and
the team-lead's explicit item 6 — absolute URLs are exactly the class of bug that only surfaces once
deployed.

| Artifact | Route | Result |
|---|---|---|
| `<title>` | `/` | Present, distinct: `Calculadora de Jornada, Horas Extras e Saldo do Dia \| WorkLoad`. **Pass** |
| `<title>` | `/custo-da-hora` | Present, distinct. **Pass** |
| `<meta name="description">` | both | Present, distinct, pt-BR. **Pass** |
| `<link rel="canonical">` | `/` | `https://workload.devrma.com` — absolute, correct host. **Pass** |
| `<link rel="canonical">` | `/custo-da-hora` | `https://workload.devrma.com/custo-da-hora` — absolute, correct host. **Pass** |
| `og:title`/`og:description`/`og:url` | both | Present, absolute, correct host (`workload.devrma.com`). **Pass** |
| `og:image` / `twitter:image` | both | Present, reachable (200, `image/png`), but resolve to a *different* host than `metadataBase` — see Finding 1. **Fail** |
| `application/ld+json` | `/` | Present, `@type: WebApplication` + `BreadcrumbList`, every `@id`/`url`/`item` absolute against `https://workload.devrma.com`. **Pass** |
| `app/sitemap.ts` → `/sitemap.xml` | — | Both routes listed, `<loc>` absolute against `https://workload.devrma.com`, `lastmod`/`changefreq`/`priority` present. **Pass** |
| `app/robots.ts` → `/robots.txt` | — | `Allow: /`, `Sitemap: https://workload.devrma.com/sitemap.xml` — correct; the platform's `x-robots-tag: noindex` response header overrides this at the HTTP layer on this preview host only (§ Core Web Vitals). **Pass** (file); platform header is separate |
| `app/manifest.ts` → `/manifest.webmanifest` | — | Name, short_name, icons (relative, resolve against origin correctly), theme/background color present. **Pass** |

Verified with `curl` against the real deployment for every row above — not inferred from the
source.

### Finding 1 — `og:image`/`twitter:image` resolve to a branch-alias host, not `metadataBase`

- **Where:** `app/opengraph-image.tsx`, `app/twitter-image.tsx` (both routes' generated `<meta>`
  tags; the files themselves are unchanged by 0005 — added earlier in the PR stack, per
  `git diff main HEAD --stat`).
- **What is wrong:** `app/layout.tsx:16` sets `metadataBase: new URL("https://workload.devrma.com")`,
  and every other absolute URL on the page (`canonical`, `og:url`, JSON-LD, sitemap, robots) correctly
  resolves against it. The two file-convention image routes do not: on this deployment they render as
  `https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app/opengraph-image?…`
  (`/`) and `…/custo-da-hora/opengraph-image?…` (`/custo-da-hora`) — a third hostname, distinct from
  both `metadataBase`'s value and the exact preview URL under test in this gate
  (`workload-8kqr9212j-…`). This is Vercel's **git-branch alias** for the PR's branch, not a URL this
  spec or `metadataBase` names anywhere.
- **Reproduction:** `curl -s https://workload-8kqr9212j-devrmas-projects.vercel.app/ | grep -oE '<meta property="og:image"[^>]*>'` on the deployed preview. Same pattern on `/custo-da-hora`. The image itself loads (`curl -I` on the returned URL → `200`, `content-type: image/png`), so this is a metadata-correctness defect, not a broken link — a crawler or a chat client unfurling a share would fetch a working image from a host outside the app's own declared origin.
- **Standard violated:** `AGENTS.md` §9 — "Metadata, sitemap, robots, manifest and structured data still correct after the change" — and the same standard every other metadata field on this page already meets.
- **Severity:** moderate. Not a broken asset, not an a11y or CWV regression, and not inside 0005's own file list — but it is a real, deploy-only-visible defect on the artifact this PR stack is about to ship, and per the team-lead's brief this is exactly what G9 exists to catch. Not counted against **this spec's** verdict (0005 changed no file responsible for it), routed to `tech-lead` for assignment to whichever spec owns `app/opengraph-image.tsx`/`app/twitter-image.tsx`.
- **What correct looks like:** `og:image`/`twitter:image` resolving against the same `metadataBase` host every other absolute URL on the page already uses. (Reported, not patched — `AGENTS.md` §4 rule 5.)

---

## Console

**Zero console errors, zero React warnings, zero `pageerror`** across every capture against the
deployed preview:

- `preview.mjs`'s 8 captures (2 routes × 2 viewports × 2 themes, real origin): `erros de console: 0`.
- The dedicated `pageerror` script's 8 combinations (390/1440 × light/dark × both routes,
  `networkidle`): `pageErrors: []` on every one.
- The D2 first-frame script's 4 combinations (both routes, both themes, `domcontentloaded` and
  `networkidle` reads): `pageErrors: []` on every one.

D2 (React hydration error #418) does not reproduce anywhere on the deployed artifact.

---

## Layout

`document.documentElement.scrollWidth - clientWidth` (overflow) and off-viewport `main
button/input/a` controls (`getBoundingClientRect().left < 0 || right > innerWidth`), both routes,
both themes, all four required widths, against the real deployment:

| Viewport | Route | Overflow (light/dark) | Off-viewport controls (light/dark) |
|---|---|---|---|
| 390×900 | `/` | 0 / 0 | 0 / 0 |
| 390×900 | `/custo-da-hora` | 0 / 0 | 0 / 0 |
| 1440×900 | `/` | 0 / 0 | 0 / 0 |
| 1440×900 | `/custo-da-hora` | 0 / 0 | 0 / 0 |
| 2560×900 | `/` | 0 / 0 | 0 / 0 |
| 2560×900 | `/custo-da-hora` | 0 / 0 | 0 / 0 |
| 3840×900 | `/` | 0 / 0 | 0 / 0 |
| 3840×900 | `/custo-da-hora` | 0 / 0 | 0 / 0 |

16/16 combinations clean, both routes now automated (G6 covered `/custo-da-hora` at 2560/3840
manually; this run covers all 16 with one script against the real deployment).

---

## Findings

None of the following changes this spec's verdict.

1. **[Moderate, metadata, not this spec's file list] `og:image`/`twitter:image` resolve to a
   branch-alias host instead of `metadataBase`.** See § SEO and metadata, Finding 1, for the full
   reproduction. Routed to `tech-lead`.

2. **[Informational, third-party, not an app defect] Lighthouse best-practices (0.79) and SEO
   (0.66) miss the 0.98 budget on this preview URL, entirely because of Vercel's own preview-only
   `vercel.live` toolbar script and `x-robots-tag: noindex` header.** See § Core Web Vitals for the
   full attribution (both audits' `details` tables name only `vercel.live`; `noindex` traced to a
   response header this codebase's own files do not set). Confirmed absent from the app's own served
   HTML (no `gtag`/`adsbygoogle`/`pagead`). Not reproducible against the production custom domain,
   where neither the toolbar script nor the preview `noindex` header exists. Not a regression to
   fix — recorded so a future gate does not mistake this for an app defect, and so `tech-lead` does
   not spend a bounce on it.

3. **[Informational, discarded evidence, corrective] The evidence left in `evidence/preview-after/`
   by an earlier, interrupted G9 attempt audited `http://127.0.0.1:3227` (a local `next dev` server
   with HMR-websocket console errors), not the Vercel deployment.** Confirmed by reading its
   `report.json`'s `base` field and `consoleErrors` directly. Discarded per the team-lead's explicit
   instruction; every measurement in this report is freshly captured against the real preview URL,
   in `evidence/` (not `evidence/preview-after/`). Recorded so the next reader does not accidentally
   cite the stale folder.

4. **[Informational, scope note] Reduced-motion path not re-instrumented at G9.** See § Accessibility,
   Manual checks — `check-reduced-motion.mjs`'s Radix-specific third phase already does not run
   against this app's native `<dialog>` (G6 Finding 2, unchanged), and 0005's only change near the
   consent dialog (T6) added no `motion` prop. Re-running the mismatched tool against the deployed
   bundle would reconfirm unchanged code at the cost of its known 30s-per-invocation timeout; treated
   as already covered by G6, not re-verified independently here.

---

## Checked and clean, not repeated in future gates

- Zero axe-core violations, all 8 route×viewport×theme combinations, deployed preview.
- Zero `pageerror`/console error, both themes, both routes, deployed preview (D2 closed on the real
  artifact, not just locally).
- `design.md` §7's D2 first-frame criterion, all four clauses, deployed preview.
- LR1, LR2 (DS1) and LR1, LR4 (DS4) all pass at 390 and 1440, both themes, both routes, deployed
  preview — geometry matches G6's local build and `reports/legal.md`'s own G9 entry exactly.
- Contrast ratios on the footer (4.84:1 light / 5.74:1 dark) unchanged from G6.
- Core Web Vitals: LCP 2.29–2.44 s median (better than G6's local 2.6 s), CLS 0–0.0003, TBT
  15.5–65 ms — performance and accessibility categories both clear budget with margin.
- Canonical, OG (except image URLs), JSON-LD, sitemap, robots (file content), manifest all resolve
  correctly against the production origin on the real deployment.
- Layout: 0 overflow, 0 off-viewport controls at 390/1440/2560/3840, both routes, both themes (16/16).
