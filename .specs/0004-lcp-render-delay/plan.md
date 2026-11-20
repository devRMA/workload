# 0004 — Implementation plan

> Owner: tech-lead · Gate: `plan` · Run 1

**This plan does not know its own remedy yet, and says so.** `spec.md` O3 leaves the FCP→LCP cause
undecided; `spec.md` § Scope item 1 makes the attribution the first deliverable and lesson **010**
makes it a precondition on accepting any lever. §1 below is that attribution, measured in this
session, in this tree. It **narrows the cause to one 64,843-byte artefact and one delivery path**,
and it does not yet name the line. **T1 finishes the diagnosis and edits nothing.** The remedy task
for Finding A is written after T1 returns, by `tech-lead`, as an amendment to this file.

Everything else in this plan is unconditional and fully specified: Finding B (T3, T4), the
accessible name X2 (T5), the LR5.4 check `legal.md` F1 asks for (T6), and the icon-asset lever T2,
whose number is already measured.

Three gates have each refuted a premise they were handed this cycle (`spec.md` C1, C2, C3, and
`design.md` D3 refuting C3 in turn). **Nothing below is asserted from a remembered fact.** Every
number in §1 carries the command that produced it and was produced by this agent, in this tree, in
this session (`AGENTS.md` §5).

---

## 1. Attribution — where the metric actually is

### 1.0 The instrument used for the attribution

`lighthouse` 12.6.1, resolved from this repository's own store, default **mobile** preset,
`throttlingMethod: simulate` (the repo's `.lighthouserc.js` default), `google-chrome`
(`HeadlessChrome/153`) unless a row says otherwise. Invocation form, run in this tree:

```bash
export CHROME_PATH=/usr/bin/google-chrome
node node_modules/.pnpm/lighthouse@12.6.1_supports-color@7.2.0/node_modules/lighthouse/cli/index.js \
  "<url>" --only-categories=performance --output=json --output-path=./lh-<tag>.json \
  --chrome-flags="--headless=new --no-sandbox" --quiet
```

Raw reports and the saved trace are in `evidence/g4-attribution/` (gitignored, regenerable).
This is an **attribution instrument, not the pass/fail instrument.** The pass/fail instrument is
`spec.md` § *The instrument, stated once* and it runs at G6/G9 — see T7.

### 1.1 The measurements

`obs` = the value read from the recorded trace. `sim` = the Lantern-simulated value Lighthouse
scores. All runs against the same branch-alias deployment
(`workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app`, route `/`) unless stated.

| # | Run | sim LCP | sim FCP | sim TTI | **obs FCP** | **obs LCP** | perf |
|---|---|---|---|---|---|---|---|
| **M1** | deployed head, default | 5864 | 1885 | **5864** | 1370 | 1370 | 0.76 |
| **M2** | deployed head, `--throttling-method=provided` | 2340 | 2340 | 2340 | 2340 | 2340 | 0.95 |
| **M3** | deployed head, `--blocked-url-patterns="*favicon.ico*" "*icon-192x192.png*"` | **4247** | 1691 | 4247 | 1414 | 1414 | **0.83** |
| **M4** | deployed head, `--blocked-url-patterns="*.woff2*"` | 5645 | 1883 | 5645 | 1355 | 1355 | — |
| **M5** | deployed head, `--blocked-url-patterns="*.css*"` | **993** | 993 | **3955** | **332** | 332 | — |
| **M6** | deployed head, `--blocked-url-patterns="*_next-live*" "*vercel.live*"` | 5735 | 1604 | 5735 | 1345 | 1345 | 0.78 |
| **M7** | deployed head, `CHROME_PATH` = Playwright chromium 1243 | 6082 | 1739 | 6082 | 2406 | 2406 | 0.74 |
| **M8** | **`localhost:3457`, `next start` on a production build of this tree** | 2207 | 809 | **2990** | **197** | 197 | **0.99** |
| **M9** | `workload.devrma.com` (H3, context only, `origin/main`) | 3045 | 974 | 3298 | 920 | 920 | 0.93 |
| **M10** | `https://example.com` — harness control | 779 | 779 | 779 | 235 | 235 | — |
| **M11** | `https://vercel.com` — harness control | 4389 | 2739 | 14076 | 2865 | 2865 | — |

And from the twelve stored G9 reports (`.specs/0006-…/evidence/g9-control-build-ab/*/lhr-*.json`),
re-read in this session with `audits.metrics.details.items[0]`:

| | value |
|---|---|
| `configSettings.throttlingMethod` | `simulate` in 12/12 |
| `observedFirstContentfulPaint` vs `observedLargestContentfulPaint` | **equal, or within 30 ms, in 12/12**; exactly equal in 9/12 |
| observed LCP across four different builds spanning 45 commits | 1393–2412 ms — **not** 5.7–6.5 s |

And from M1's saved trace (`lh-sim-0.trace.json`):

| Fact | Value |
|---|---|
| `largestContentfulPaint::Candidate` events in the whole load | **exactly one**, at 1369.9 ms, `size: 32226` |
| LCP element | `<p aria-live="polite" class="numeric whitespace-nowrap …">` — the hero numeral |
| First `PaintTimingVisualizer::LayoutObjectPainted` in the entire trace | **1354.7 ms.** Nothing — no text, no box — is painted before it |
| `Layout` | starts 433.5 ms, 56.6 ms long; `UpdateLayoutTree` at 424.7 ms |
| Compositor `Commit` + `RasterTask` | from **403 ms**, repeatedly, through 697 ms |
| `MarkDOMContent` / `MarkLoad` | 424.5 ms / 763.0 ms |
| `diagnostics.totalTaskTime` | **371.8 ms**; `numTasksOver100ms: 0`; `numTasksOver500ms: 0` |
| Last network request finishes | 1202 ms (`icon-192x192.png`) |
| `totalByteWeight` | 781,915 B |
| `favicon.ico` + `icon-192x192.png` | 231,945 + 241,033 = **473,978 B = 61% of the page** |
| `uses-http2` | fails — 19 requests not served over HTTP/2 (`curl -sI` confirms `HTTP/1.1`) |
| `file public/favicon.ico public/icon-192x192.png public/icon-512x512.png` | all three: `JPEG image data … baseline … 1024x1024`, 234.8 KB each — **one JPEG under three names and two wrong extensions** |

### 1.2 What the measurements establish

**A1 — There is no FCP→LCP gap in the page. The 5.7–6.5 s is a simulator output.**
Observed FCP and observed LCP are the same instant in every run on record, on every host. The page
produces **one** paint, of everything at once, and the hero numeral is the largest thing in it. The
`Render Delay 5127 ms` in `spec.md` E3 is a Lantern term, not a phase the browser spent.

**A2 — LCP equals `interactive` to the millisecond because the single paint happens after the last
byte.** Lantern estimates LCP from the dependency graph of everything that completed before the
observed LCP. When the page paints only after the whole graph has loaded, that graph *is* the whole
page, so `simulated LCP` = `simulated everything-is-done` = `simulated TTI`. This is why the
identity holds in 11 of the 12 stored runs, in M1, and in M3/M4/M6/M7, and it is **not** a property
of the hero element.

> **AC1 is satisfied if and only if the first contentful paint lands before the end of the
> resource graph.** Nothing else in this spec's scope moves it.

> **SUPERSEDED at the T1 triage — §7.2.** The derivation is wrong: T1 measured a state that paints at
> **96 ms** and still has `simLCP === simTTI`. The identity tracks the shape of Lantern's graph, not
> the held paint, and AC1 is bounced to `product-manager`.

That is not a theory: **M5 demonstrates it.** Remove one file — the compiled stylesheet — from the
deployed page and the paint moves to 332 ms, `sim LCP` collapses 5864 → **993 ms**, and `sim TTI`
stays at 3955 ms. **LCP stops equalling `interactive`.** M8 demonstrates the same thing from the
other side: the *same build*, served from `localhost`, paints at 197 ms and scores 0.99 with
LCP 2207 ≠ TTI 2990.

**A3 — The dominant term is neither CPU, nor bytes, nor the font, nor the toolbar, nor the runner.**

| Ruled out | By |
|---|---|
| Main-thread work / hydration cost | M2 — with **no** throttling at all the paint is still held (2340 ms), and `totalTaskTime` is 371.8 ms with no task over 100 ms |
| The 474 KB of icon assets | M3 — blocking both leaves the paint at 1414 ms |
| The webfont | M4 — blocking `*.woff2*` leaves the paint at 1355 ms; `font-display: swap` is confirmed in the served CSS |
| The Vercel preview toolbar | M6 — blocking `*_next-live*` and `*vercel.live*` leaves the paint at 1345 ms |
| The Chrome binary / headless mode | M7 — Playwright's chromium 1243 reproduces it (2406 ms) |
| The harness itself | M10 — `example.com` paints at 235 ms and M11 shows a normal, **decoupled** LCP/TTI pair in the same harness, on the same machine, in the same session |
| `useCurrentTime`, the three `--:--:--` placeholders, the hero's client gating | `spec.md` C1, and the trace: the LCP element is the server-rendered `<p>` and it is the *only* candidate |

**What is left, stated as the narrowest true statement I can make:**

> The deployed head's first contentful paint is held ≈1.0–2.2 s beyond what the identical build
> paints from a local `next start` (M8: 197 ms) in the same session, same browser, same harness.
> Layout is complete at ~490 ms and the compositor commits frames from 403 ms, but **not one layout
> object is painted** until 1354.7 ms. Removing the compiled stylesheet from the deployed response
> (M5) moves that paint to 332 ms and breaks the LCP/TTI identity. **The cause therefore lives in
> the interaction between the compiled stylesheet and the deployed delivery** — a 64,843-byte file
> and an HTTP/1.1 origin — and it is not in the hero, not in the hooks, and not in the JavaScript.

**A4 — one lever is already measured, and it is not enough on its own.**
The three icon files are one 1024×1024 JPEG saved under `.ico` and `.png`. The two that load are 61%
of the page. Blocking them (M1→M3) buys **−1,617 ms of simulated LCP and +7 performance points** on
an otherwise unchanged deployment. It does **not** satisfy AC1 (the paint does not move). It is
worth doing anyway, it is cheap, it is risk-free, and it is specified in full as **T2** — but it is
named here as **not the remedy**, so that a green-looking score cannot be mistaken for AC1 passing.
This is lesson **010** applied to this spec's own lever list: `spec.md` § Scope item 2 nominates
`bootup-time`, `mainthread-work-breakdown` and 28 kB of unused JavaScript; **all three are
denominated in a phase that measures 371.8 ms in total.** They are not the cost. Do not spend the
spec on them.

### 1.3 What this does to `spec.md`'s numbers, and what it does not

- **AC1 stands and is the right criterion.** It is falsifiable, it does not move with the runner, and
  M5/M8 prove a state of the world in which it passes.
  **— WRONG, and withdrawn at the T1 triage (§7.2).** M5 and M8 are two cause-absent states that pass
  it; T1's `requestLatencyMs=0` run is a third cause-absent state that **fails** it. A criterion a
  known-good state fails does not discriminate. Bounced to `product-manager`.
- **AC2 stands.** The same-session differential is the only honest reading of an instrument that
  produced 0.93 on `workload.devrma.com` today (M9) and 0.75–0.91 on the same URL on 2026-09-15.
- **AC4 stands as a guard** and is untouched by anything here.
- **The 2,500 ms goal is not abandoned**, and M8 is the first evidence in this spec's record that
  the *shipped build* can score 0.99 with a 2,207 ms simulated LCP when it is delivered differently.
  **The T1 triage names what "delivered differently" was: M8 is loopback, which is the only path on
  this machine that is not routed through a TLS-intercepting proxy** (§7.1). The goal is not
  abandoned and it is not restated either — `spec.md` already parked it on AC4, which passes.

---

## 2. Architecture

### 2.1 What changes, by layer

| Layer | Change | Why here |
|---|---|---|
| `lib/**` | **none** | No business rule, no table, no rounding, no threshold is touched. `legal.md` §5 L1–L4 are unreached; `lib/legal-tables.ts` is `0003`'s and stays shut. |
| `hooks/**` | **none to behaviour**; one new test asserts an existing invariant (T6) | `legal.md` §8.1 F1: the restore guards at `use-work-calculator.ts:164`, `:186` and `use-salary-calculator.ts:137` are correct **by construction and asserted by no test**. LR5.4 is the clause the analyst would reject a build over. |
| `components/**` | one attribute pair on `components/organisms/hero-panel.tsx` (T5) | X2. Bounded to `id` + `aria-labelledby`; no element added, no token, no class, no value. |
| `app/**` | `app/page.tsx`, `app/custo-da-hora/page.tsx` — an `openGraph.images` / `twitter.images` declaration each (T3) | Finding B. Verified mechanism, §2.3. |
| `public/**` | three asset files replaced (T2) | The measured −1,617 ms lever of §1 A4. |
| `__tests__/**` | three test files (T4, T5, T6) | The guards, at the bars in `AGENTS.md` §9. |
| **the LCP remedy** | **not yet known — T1** | §1 A3 |

**No file moves atomic level. No component is created. No hook is created.** `design.md`
§ Component tree lists every component in scope as *reuse, unchanged*, and this plan changes nothing
about that except the two attributes in T5, which `design.md` §D authorises by name.

### 2.2 Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Re-encode three icon assets (T2) | **No dependency.** `/usr/bin/convert` (ImageMagick 6), already on the machine, run once by the developer; the outputs are committed binaries | `AGENTS.md` §8 forbids a new dependency without justification, and `spec.md` § Out of scope protects "nothing at runtime". A one-off CLI that produces a committed file adds nothing to `package.json`, nothing to the bundle and nothing to the build. `sharp` is not installed and must not be added for three files that change once. |
| Emit the four social-image URLs against `metadataBase` (T3) | **No dependency.** Two `metadata` exports already in the tree | §2.3 |
| Diagnose (T1) | **No dependency.** `lighthouse@12.6.1` resolved from the existing store, `@playwright/test` already installed | The commands in T1 are the ones §1 was produced with |

**No new runtime dependency is proposed by this plan.**

### 2.3 Finding B — the mechanism, read from the framework and verified by building it

`spec.md` C3 says the `/custo-da-hora` pair is produced "by inheritance"; `design.md` D3 refutes
that — there are four files. **Both documents still leave the actual cause unstated**, and it is
this, read from `node_modules/next/dist/lib/metadata/resolvers/resolve-url.js` in the installed
Next **16.3.5**:

```js
function getSocialImageMetadataBaseFallback(metadataBase) {
  …
  fallbackMetadataBase = process.env.NODE_ENV === 'production' && previewDeploymentUrl
      && process.env.VERCEL_ENV === 'preview' ? previewDeploymentUrl
    : metadataBase || productionDeploymentUrl || defaultMetadataBase;
}
// previewDeploymentUrl = new URL(`https://${process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL}`)
```

and, in `resolve-opengraph.js`, this fallback **overrides the user's `metadataBase`** whenever
`isStaticMetadataRouteFile` is true — which is exactly what a file-convention
`opengraph-image.tsx` / `twitter-image.tsx` is. So the branch-alias host is **Next's deliberate
preview behaviour**, not a resolution bug and not something `metadataBase` can influence. Three
consequences the plan is built on:

1. **The four `<meta content>` values will never honour `metadataBase` while the images are
   file-convention routes, on any preview deployment.** Editing `app/layout.tsx` cannot fix it.
2. **The same override is why `sitemap`, `robots`, `canonical`, `og:url`, the manifest and the
   JSON-LD are clean** (`spec.md` C3, E10): none of them is a static metadata route file.
3. **On `VERCEL_ENV=production` the override does not fire** and the same four URLs would already
   resolve to `https://workload.devrma.com`. The defect is real, and it is preview-scoped. That is a
   correction `product-manager` must carry (§5, D3) — but it changes **nothing** about the fix, and
   AC5/AC6 are written against H1, a preview, so they remain the right criteria.

`resolve-metadata.js:148` gives the exit:

```js
if (openGraph && !source?.openGraph?.hasOwnProperty('images')) { /* use the file-convention image */ }
```

**A segment that declares `openGraph.images` itself skips the file-convention path entirely** — the
image is *replaced*, not appended — and a relative URL then resolves through `resolveUrl(url,
metadataBase)`, i.e. against `https://workload.devrma.com`. The four route files stay in place and
keep serving the two cards, so `design.md` §C ("nothing about the images changes", two distinct
cards, per-route `alt`) is preserved.

**Verified, not reasoned.** A copy of this tree with the T3 patch applied, built and served with
`VERCEL_ENV=preview VERCEL_BRANCH_URL=branch-alias.example.vercel.app`, in an isolated directory
outside the repository (`AGENTS.md` §4 rule 6, lesson **029**):

```
/                 og:image  https://workload.devrma.com/opengraph-image
                  twitter:image  https://workload.devrma.com/twitter-image
/custo-da-hora    og:image  https://workload.devrma.com/custo-da-hora/opengraph-image
                  twitter:image  https://workload.devrma.com/custo-da-hora/twitter-image
grep -c 'vercel\.app'  →  / 0 · /custo-da-hora 0 · /sitemap.xml 0 · /robots.txt 0 · /manifest.webmanifest 0
curl -sI: /opengraph-image 200 image/png 61207 · /custo-da-hora/opengraph-image 200 image/png 53925
```

Exactly one `og:image` and one `twitter:image` per route (no duplicate from the file convention),
both cards still distinct, all four routes still `200 image/png`.

### 2.4 Data flow — unchanged, and stated so a reviewer can check it

```
lib/legal-tables.ts ─┐
lib/payroll.ts       ├─► hooks/use-work-calculator.ts ──► components/organisms/work-calculator.tsx ──► HeroPanel
lib/night-shift.ts   │   hooks/use-salary-calculator.ts ─► components/organisms/salary-calculator.tsx ┘
lib/journey.ts       ┘        ▲                                    ▲
                              │ lazy useState initialisers          │ server render → same markup
                              └ localStorage restore in an effect  └ hydration replaces text in place
```

**Not one arrow in that diagram moves in T2–T6.** If the T1 remedy needs one to move, it comes back
to `tech-lead` first (§4).

---

## 3. Tasks

Every task names its **owner**, because this plan has three: `frontend-dev` builds, and two tasks
are measurement tasks owned by `web-standards-auditor`. A task with no owner line is
`frontend-dev`'s.

Order: **T1 first and alone.** T2, T3, T5, T6 are mutually independent and may run in any order; T4
depends on T3. `pnpm check` and `pnpm build` are green after each one individually.

---

### T1 — Finish the diagnosis of the held first paint. **Edit no source file.**

- **Owner:** `frontend-dev`
- **Files:** creates `.specs/0004-lcp-render-delay/evidence/t1-attribution.md` (gitignored) and
  nothing else. **No file under `app/`, `components/`, `hooks/`, `lib/`, `public/`, `__tests__/`,
  `tests/` or any config file is edited by this task.**
- **Depends on:** none
- **Reuse:** the instrument in §1.0 verbatim; `.specs/0006-salary-alert-legibility/evidence/g9-control-build-ab/lcp-candidate-probe.mjs`;
  `.specs/0004-lcp-render-delay/evidence/cls-early-shift.mjs` (the designer's probe, for X6).

**Working rule, not negotiable.** Every build, every server and every mutation happens in an
isolated copy of the tree, never in the repository (`AGENTS.md` §4 rule 6, lesson **029**). Create it
with, and only with:

```bash
WT=$(mktemp -d)/probe && mkdir -p "$WT"
tar -c --exclude=.next --exclude=node_modules --exclude=.git --exclude=coverage \
    --exclude=test-results --exclude=playwright-report . | tar -x -C "$WT"
cp -al "$PWD/node_modules" "$WT/node_modules"   # a symlink makes Turbopack panic; a hardlink copy is free
```

Run every local server on **port 3457**, never 3000, and confirm it is free before starting
(lesson **013**). Run no git command that changes state.

**What to establish.** §1 A3 narrowed the cause to *"the interaction between the compiled stylesheet
and the deployed delivery"*. T1 decides which of the two it is, and names it. Run X1–X5 **in order**
and stop at the first one that resolves the question; run X6 regardless.

| # | Experiment | Command | Record |
|---|---|---|---|
| **X1** | Confirm the delta is real and not a one-run artefact | the §1.0 invocation, **3 runs** against the branch-alias deployment and **3 runs** against `http://localhost:3457/` serving `next build && next start` from `$WT` | six `observedFirstContentfulPaint` values and six `sim LCP` / `sim TTI` pairs |
| **X2** | Separate **content** from **delivery**: serve the deployed bytes locally | mirror the deployed `/` and every asset it references to disk (`curl -s <url> -o …` for the document, the one stylesheet, the ten scripts, the woff2), serve the directory with `python3 -m http.server 3457`, run the §1.0 invocation against `http://localhost:3457/` | `observedFirstContentfulPaint`. **Held (≳1 s) ⇒ the cause is in the bytes. Early (≲400 ms) ⇒ the cause is in the delivery.** This single number decides the branch |
| **X3** | *(only if X2 says "bytes")* Bisect the stylesheet | in `$WT`, halve `app/globals.css` — comment out one half, rebuild, re-measure against `localhost:3457` with the network shaped so the stylesheet lands at ≈400 ms (`--throttling-method=devtools --throttling.requestLatencyMs=400`); repeat until one block remains | the surviving block, quoted verbatim, with the `observedFirstContentfulPaint` on either side of the cut |
| **X4** | *(only if X2 says "delivery")* Name the delivery property | compare, between the deployed origin and `localhost:3457`: HTTP version (`curl -sI -o /dev/null -w '%{http_version}'`), `content-encoding`, `cache-control`, `age`, `vary`, `x-vercel-cache`, and the number of distinct TCP origins. Then re-run X2's local mirror **once per differing property**, reproducing that property locally where it can be reproduced | the property whose reproduction reproduces the held paint |
| **X5** | Read what Chrome itself says is blocking | from the X1 deployed run's LHR: `audits["render-blocking-insight"]`, `audits["network-dependency-tree-insight"]`, `audits["lcp-discovery-insight"]`, and from the saved trace (`--save-assets`) every event whose name matches `/Blocking\|RenderBlock\|ParseAuthorStyleSheet\|StartedRenderBlocking/` between 400 ms and the first `PaintTimingVisualizer::LayoutObjectPainted` | the events, verbatim, with timestamps relative to `navigationStart` |
| **X6** | Bound `design.md` **D1** with a denominator (this is the only thing T1 does for D1 — see §5) | `node .specs/0004-lcp-render-delay/evidence/cls-early-shift.mjs`, **20 loads per route**, 390×844, dark, 4× CPU throttle, seeded returning user, and the same 20 with **storage not seeded** | the reproduction **rate** per route per condition (`n/20`), each event's CLS value and its `PerformanceObserver` shift sources verbatim. **Do not name a cause and do not fix anything** |

**What to write.** `evidence/t1-attribution.md`, with exactly these sections and nothing else:

1. **The numbers** — one table per experiment, every value as printed, no rounding, no prose summary
   standing in for a number.
2. **The cause**, in one sentence of the form *"the first contentful paint is held because
   `<artefact>` does `<thing>` under `<condition>`"*, with the experiment number that proves it and
   the experiment number that would have refuted it.
3. **The counterfactual, measured** — the `sim LCP`, `sim TTI` and `observedFirstContentfulPaint` of
   a state in which the cause is absent (X2's mirror, X3's cut, or X4's reproduction). This is the
   number that tells `tech-lead` whether a remedy can satisfy AC1 **before** anyone writes one.
4. **X6's table.**

**Hard stops. Any one of these ends the task; write it down, hand it to `tech-lead`, and stop.**

- The cause is outside the enumerated set, or X1–X5 complete without resolving X2's branch.
- The cause is **not in application code** — a Vercel platform property, a CDN behaviour, a Chrome
  or Lighthouse behaviour. That is a real result and a good one; it is not a defeat and it must not
  be converted into a code change to have something to ship.
- The cause is in application code but the remedy would touch `lib/**` or `hooks/**`, or would
  change any rendered number, string or pixel.
- Any `design.md` §B invariant would have to move.

**Never, under any circumstance, in this task or the one that follows it:** add a mount animation,
an `initial`/`animate` pair, an `AnimatePresence`, or any resting `opacity`/`transform` below the
settled value to anything on the hero's paint path, server-side or client-side (`design.md`
§ Motion — *"the single most important motion constraint in the file"*); add a fourth root-size step
above 18px (`design.md` **I8** — the `AlertBanner` has 3 px of margin in its 32 px budget); add a
skeleton, a spinner, a dim or a provisional mark (`spec.md` § Non-goals, `legal.md` §3); defer,
stream, `Suspense`-wrap or `next/dynamic` the hero (`design.md` § B.2 Answer-First Rule); or empty
the hero numeral from the server response (`spec.md` AC3).

- **Tests:** none. T1 writes no code. Its output is the evidence file.
- **Done when:** `evidence/t1-attribution.md` exists with all four sections filled; `git status`
  shows **no modification to any tracked file** (the evidence directory is gitignored — confirm with
  `git check-ignore .specs/0004-lcp-render-delay/evidence/t1-attribution.md`); and the file has been
  handed to `tech-lead`. **Advances no acceptance criterion by itself. It is the precondition on
  every criterion in the Finding A group** (`spec.md` § Scope item 1, lesson **010**).

---

### T2 — Replace the three mislabelled 234.8 kB JPEGs in `public/` with correctly-typed icons

- **Owner:** `frontend-dev`
- **Files:** `public/favicon.ico` (edit — replace bytes), `public/icon-192x192.png` (edit — replace
  bytes), `public/icon-512x512.png` (edit — replace bytes)
- **Depends on:** none
- **Reuse:** the existing artwork. **No new artwork is designed, commissioned or invented** — every
  output is a resize of the bytes already in `public/icon-512x512.png`, so nothing visual changes
  beyond the removal of 1024×1024 of unused resolution.

**What to build.** `file public/*` reports all three as one and the same `JPEG image data, baseline,
1024x1024`, 234,800 bytes each. Two of them are fetched on every cold load and are **61% of the
page's 781,915 bytes** (§1). Replace them, in place, with the file each one's name and each one's
consumer already promises, using `/usr/bin/convert` (ImageMagick 6, already installed — §2.2). Run
these four commands **from the repository root, exactly as written**, with `SRC` pointing at a copy
of the current `public/icon-512x512.png` taken **before** the first command overwrites anything:

```bash
cp public/icon-512x512.png /tmp/workload-icon-source.jpg
SRC=/tmp/workload-icon-source.jpg
convert "$SRC" -resize 192x192 -strip -define png:compression-level=9 public/icon-192x192.png
convert "$SRC" -resize 512x512 -strip -define png:compression-level=9 public/icon-512x512.png
convert "$SRC" \( -clone 0 -resize 16x16 \) \( -clone 0 -resize 32x32 \) \( -clone 0 -resize 48x48 \) \
        -delete 0 -strip public/favicon.ico
```

Measured in this tree by `tech-lead`, from exactly these commands:

| File | Before | After | `file` output after |
|---|---|---|---|
| `public/favicon.ico` | 234.8 kB JPEG | **14.7 kB** | `MS Windows icon resource - 3 icons, 16x16, 32x32, 48x48` |
| `public/icon-192x192.png` | 234.8 kB JPEG | **22.9 kB** | `PNG image data, 192 x 192, 8-bit/color RGB` |
| `public/icon-512x512.png` | 234.8 kB JPEG | **132.6 kB** | `PNG image data, 512 x 512, 8-bit/color RGB` |

**If any of the three "after" sizes differs from the number above by more than ±15%, that is a
finding, not a decision** — record it in `STATUS.md` under blockers and hand it to `tech-lead`
(lesson **026**). Do not tune the flags to hit the number; the numbers came from these flags.

`app/manifest.ts` already declares both PNGs at `192x192` / `512x512` with `type: "image/png"` and
is **not edited** — it was describing files that were not PNGs, and this task makes the declaration
true. No `<link rel="icon">` exists in the head and none is added: Next serves `public/favicon.ico`
by convention and the browser's default fetch finds it.

**What this task does and does not buy.** Measured on the unchanged deployment by blocking exactly
these two files at the network layer (§1, M1→M3): **simulated LCP 5,864 → 4,247 ms, performance
0.76 → 0.83, `totalByteWeight` 781,915 → 308,829 B.** **The observed first paint does not move
(1,370 → 1,414 ms) and LCP still equals `interactive`.** This task therefore contributes to AC2 and
to the 2,500 ms goal and **does not, on its own, satisfy AC1.** Do not report it as though it does.

- **Tests:** `__tests__/public-assets.test.ts` (create). Node-environment test, no jsdom needed.
  Cases, each asserting observable facts about the bytes on disk — never a file size alone:
  1. `public/favicon.ico` starts with the ICO signature `00 00 01 00` and is **not** a JPEG
     (does not start with `FF D8 FF`).
  2. `public/icon-192x192.png` and `public/icon-512x512.png` each start with the PNG signature
     `89 50 4E 47 0D 0A 1A 0A` and are not JPEGs.
  3. The PNG `IHDR` width/height of `icon-192x192.png` is `192 × 192` and of `icon-512x512.png` is
     `512 × 512` — read bytes 16–23 of the file, big-endian — and each **equals the `sizes` string
     the manifest declares for it**, read from `app/manifest.ts`'s default export rather than
     hardcoded, so the test fails if either side drifts.
  4. Every file under `public/` that is referenced by `app/manifest.ts` or served as
     `favicon.ico` is **at most 150 kB**, with the failure message naming the file and its size.
     This is the guard that makes the defect unrepeatable: it fails on any future 234 kB asset.
- **Done when:** `pnpm test __tests__/public-assets.test.ts` green, `pnpm check` clean,
  `pnpm build` clean — advances **AC2** and the 2,500 ms goal of `spec.md` § *On the absolute
  2,500 ms target*. Advances **no** part of AC1.

---

### T3 — Emit the four social-image URLs against `metadataBase`

- **Owner:** `frontend-dev`
- **Files:** `app/page.tsx` (edit), `app/custo-da-hora/page.tsx` (edit)
- **Depends on:** none
- **Reuse:** the four existing route files — `app/opengraph-image.tsx`, `app/twitter-image.tsx`,
  `app/custo-da-hora/opengraph-image.tsx`, `app/custo-da-hora/twitter-image.tsx`. **All four stay.
  None is edited, moved, merged or deleted.** They keep serving the two cards, and their `alt`
  strings are the source of the strings below. `lib/og-image.tsx` is **not** touched: `legal.md` §6
  authorises this fix to change *"the host of the emitted URL and nothing else"*, and `design.md` §C
  proves both cards are already correct, already distinct, and already carry the literal
  `workload.devrma.com` baked into the artwork.

**Why the edit is where it is.** §2.3. A segment that declares `openGraph.images` itself bypasses
Next's `getSocialImageMetadataBaseFallback` override and resolves against `metadataBase`. **The
declaration must be in the page module of the route it serves** — `app/page.tsx` for `/` and
`app/custo-da-hora/page.tsx` for `/custo-da-hora`. **`app/layout.tsx` is not edited**; putting it
there would set one image for both routes and lose the per-route card `design.md` §C.1 measured.

**What to build.** In `app/page.tsx`, inside the existing `metadata.openGraph` object, after
`url: "/"`, add an `images` array; and add a sibling `twitter` key to `metadata`. In
`app/custo-da-hora/page.tsx`, the same, after `url: "/custo-da-hora"`. The exact objects — the
`alt` strings are copied character for character from the `alt` export of the corresponding route
file and must stay identical to it:

`app/page.tsx`:

```ts
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia",
        type: "image/png",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 630,
        alt: "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia",
      },
    ],
  },
```

`app/custo-da-hora/page.tsx`:

```ts
    images: [
      {
        url: "/custo-da-hora/opengraph-image",
        width: 1200,
        height: 630,
        alt: "WorkLoad: Calculadora de valor da hora e salário líquido CLT",
        type: "image/png",
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "/custo-da-hora/twitter-image",
        width: 1200,
        height: 630,
        alt: "WorkLoad: Calculadora de valor da hora e salário líquido CLT",
      },
    ],
  },
```

Constraints, each of which the verification below would catch:

- The `url` values are **relative and leading-slash**. Never absolute, never
  `https://workload.devrma.com/...` hardcoded, never `process.env.VERCEL_*` — `spec.md` § Non-goals
  forbids hardcoding the production host, and `metadataBase` in `app/layout.tsx:16` is the single
  declaration of the origin and stays the only one.
- `metadataBase` is **not** changed and `app/layout.tsx` is **not** edited (`spec.md` § Non-goals).
- The `twitter` key on the page metadata carries **only** `images`. The card type, creator, title
  and description keep coming from `app/layout.tsx`'s `twitter` block by merge — adding any of them
  here would fork two sources of truth for the same tag.
- The two pt-BR strings are **existing** strings, re-used, not written. `content-writer` did not run
  on this spec and nothing here commissions a string (`STATUS.md` header).

**Verification, run by `tech-lead` in this tree on exactly this patch** (§2.3): with
`VERCEL_ENV=preview VERCEL_BRANCH_URL=branch-alias.example.vercel.app` at build time, all four tags
emit `https://workload.devrma.com/...`, `vercel.app` appears zero times in `/`, `/custo-da-hora`,
`/sitemap.xml`, `/robots.txt` and `/manifest.webmanifest`, exactly one `og:image` and one
`twitter:image` per route, and all four image routes still return `200 image/png` at 61,207 B (`/`)
and 53,925 B (`/custo-da-hora`) — two distinct cards, preserved.

Reproduce it locally before opening the PR, in an **isolated copy** (never in the repository —
`AGENTS.md` §4 rule 6), on port 3457:

```bash
VERCEL_ENV=preview VERCEL_BRANCH_URL=branch-alias.example.vercel.app ./node_modules/.bin/next build
VERCEL_ENV=preview VERCEL_BRANCH_URL=branch-alias.example.vercel.app ./node_modules/.bin/next start -p 3457
for r in / /custo-da-hora; do curl -s "http://localhost:3457$r" \
  | grep -oE '<meta (property|name)="(og:image|twitter:image)"[^>]*>'; done
for r in / /custo-da-hora /sitemap.xml /robots.txt /manifest.webmanifest; do \
  printf '%s ' "$r"; curl -s "http://localhost:3457$r" | grep -c 'vercel\.app'; done
```

Every line of the second loop must print `0`. Without the two environment variables the defect
cannot be reproduced and the check proves nothing (which is why every G6 against `localhost` missed
it — `spec.md` E11).

- **Tests:** covered by T4, which is where the assertions live.
- **Done when:** the two `curl` loops above print the four `workload.devrma.com` URLs and five
  zeroes, `pnpm check` clean, `pnpm build` clean — advances **AC5** and **AC6**.

---

### T4 — Guard the metadata boundary in the suite, so it cannot be verified only on a deployment

> **Amended at the G5 run-1 triage — §7.7 B1.** T4 as shipped is **done and accepted** on the
> domain its own paragraph states (`*.tsx`). The third clause's width is corrected by **T9**, not by
> re-opening this task.

- **Owner:** `frontend-dev`
- **Files:** `__tests__/page.test.tsx` (edit), `__tests__/custo-da-hora-page.test.tsx` (edit),
  `__tests__/metadata-image-host.test.ts` (create)
- **Depends on:** T3
- **Reuse:** the existing metadata assertions in `__tests__/page.test.tsx` § `describe("metadata")`
  and its sibling for `/custo-da-hora`; `__tests__/spacing-guards.test.ts` and
  `__tests__/copy-guards.test.ts` as the idiom for a repository-wide guard that reads source files
  from disk — match their structure, their naming and their failure messages.

**What to build.**

1. In `__tests__/page.test.tsx`, extend the existing `describe("metadata")` block with one case:
   *"points the social card at the declared origin, not at the deployment host"* — asserting that
   `metadata.openGraph.images` and `metadata.twitter.images` each hold exactly one entry, that its
   `url` is the relative `"/opengraph-image"` / `"/twitter-image"`, that `width`/`height` are
   `1200`/`630`, and that its `alt` is **identical to the `alt` export of the matching route
   module** (`await import("@/app/opengraph-image")`), so the two can never drift apart.
2. The same in `__tests__/custo-da-hora-page.test.tsx` against
   `"/custo-da-hora/opengraph-image"` and `"/custo-da-hora/twitter-image"` and
   `@/app/custo-da-hora/opengraph-image`.
3. `__tests__/metadata-image-host.test.ts` (create) — the boundary guard, written as a search over
   the whole class of file the rule governs, never as an assertion about two files
   (`AGENTS.md` §5). Read every `*.tsx` under `app/` from disk and assert:
   - **every route directory that contains an `opengraph-image.tsx` or a `twitter-image.tsx` also
     has a `page.tsx` whose `metadata` export declares `openGraph.images` (and `twitter.images`)**,
     with the failure message naming the directory and quoting §2.3's mechanism in one line. This is
     the assertion that makes a *future* route's image route fail loudly instead of shipping a third
     wrong host;
   - no file under `app/` contains the literal `vercel.app`;
   - no file under `app/` other than `app/layout.tsx` contains the literal
     `https://workload.devrma.com` — the origin is declared once, in `metadataBase`, and every other
     URL is relative to it.

**Seen red before it is trusted — restated at the G6 run-1 triage (§7.8, F5).** `git stash` is
**not** how any of this is done (the tree is shared — `AGENTS.md` §4 rule 6). Do it in the isolated
copy: revert the T3 edit there, run the three tests, paste the failure output into the task's note in
`STATUS.md`, restore. A guard that has never been red is decoration (`legal.md` §3 *How LR5 fails*).

The three clauses do **not** carry the same obligation, and the original text of this paragraph —
*"each of the three must be observed failing"* — was wrong to say they did:

- **Clauses 1 and 3 are red-first clauses.** Both must be observed failing against the pre-T3 state,
  with the output pasted into `STATUS.md`. Clause 1 fails naming both route directories; clause 3
  fails naming `app/layout.tsx`, `app/robots.ts` and `app/sitemap.ts` (the widened domain T9 gives
  it, §7.7 B1).
- **Clause 2 — *no file under `app/` contains the literal `vercel.app`* — is a forward guard, and it
  is unsatisfiable as a red-first clause by construction.** The literal `vercel.app` has never
  appeared in any source file in this repository: the defect `spec.md` C3 describes is Next's
  **runtime** override of `metadataBase` by `getSocialImageMetadataBaseFallback`, and a runtime
  override leaves no string on disk to revert. There is no state of this tree, past or present,
  against which clause 2 goes red, so **no fourth red output is owed and none may be asked for**.
  Its job is prospective: it catches the day someone hardcodes the deployment host as a workaround.
  Its domain limitation is recorded as **F2 debt** in §7.8 — a route that emits the host without any
  source file naming it is invisible to clause 2 too, and that is a property of the mechanism, not a
  defect in this clause.

- **Tests:** the task is the tests. Query nothing by class name; assert no Tailwind string; these
  are module-shape and file-content assertions only.
- **Done when:** `pnpm test __tests__/page.test.tsx __tests__/custo-da-hora-page.test.tsx
  __tests__/metadata-image-host.test.ts` green, the three red-first outputs are recorded in
  `STATUS.md`, `pnpm check` clean, coverage still ≥90% on `app/**` — advances **AC5**, **AC6**
  and **AC7**.

---

### T5 — Give the hero numeral an accessible name that is still true after hydration (X2)

> **DROPPED at the G5 run-1 triage — §7.7 B3.** The mechanism below is refuted: `aria-labelledby`
> on a bare `<p>` (ARIA `role="paragraph"`) cannot carry an accessible name. Nothing is built from
> this task; both files stay at `HEAD`. X2 returns to `web-standards-auditor` as carried debt. The
> text is kept unstruck only because §7.7 B3 quotes it.

- **Owner:** `frontend-dev`
- **Files:** `components/organisms/hero-panel.tsx` (edit), `__tests__/hero-panel.test.tsx` (edit)
- **Depends on:** none
- **Reuse:** the eyebrow `<span className="text-overline uppercase">{label}</span>` already at
  `hero-panel.tsx:37`, and React's `useId`. **No element is added, no wrapper, no `sr-only` twin, no
  new string.**

**Why it is in this plan and not left to G6.** `legal.md` §8.2 records X2 with owner
`web-standards-auditor`; `AGENTS.md` §4 rule 5 forbids a reviewer from editing source. An
unassigned finding on a file this spec already opens becomes an unplanned mid-gate edit. It is one
attribute pair and `design.md` §D specifies it completely, so it is planned here.

**The constraint that decides the implementation** (`design.md` §D, measured 3/3):
the eyebrow's own text **changes at hydration** on `/` — `Saída Prevista` → `Saída Real` — and on
`/custo-da-hora` — `Valor por Hora` → `Valor por Mês` / `Ano`. A copied `aria-label` would freeze
the pre-hydration label and announce *"Saída Prevista, 19:10"* to a manual-exit user: **an
accessibility fix stating something false about the user's day.** The association must be a live
reference.

**What to build.** In `HeroPanel`:

1. `import { useId } from "react"` alongside the existing type-only import, and inside the component
   body, above `const isFigure`, add `const labelId = useId();`. `useId` and not a literal, because
   the id must be stable across server render and hydration and unique if a second panel ever
   mounts.
2. On the existing `<span>` at `:37`, add `id={labelId}`. Change nothing else about it — not the
   class, not the text, not the element.
3. On the existing `<p>` at `:43`, add `aria-labelledby={labelId}`. Change nothing else about it.

**Forbidden on this task, each from `design.md` §D:** do not add `aria-atomic`; do not change
`aria-live="polite"` to `assertive` or to `role="status"`; do not add `aria-label`; do not add a
`role="region"` or any landmark to the panel; **do not wrap the numeral in a new element inside the
`@container`** — that re-parents the container-query reference and changes the numeral's size
(invariant **I4**). Do not touch the `--hero-value-size` calculation, the `numeric` utility, the
tone classes or the transition.

**Reconciliation, recorded so it is not re-litigated.** `design.md` § *What a G6 reviewer checks*
item 1 reads *"`git diff` touches no file under `components/`"*. `design.md` §D authorises this fix
by name, with a constraint, on this exact file. The later, more specific statement governs: the
reviewer check is read as **"no design *value* changes"** — no colour, type step, spacing, radius,
shadow, duration or easing. This diff adds two attributes and one hook call and changes no value.
If `product-designer` reads it otherwise at G6, **T5 is dropped, not defended** (§4).

- **Tests:** `__tests__/hero-panel.test.tsx` (edit) — add to the existing `describe("HeroPanel")`,
  in the file's existing idiom, querying by accessible role and name only:
  1. *"names the value with the label above it"*: render with `label="Saída Prevista"` and
     `value="17:48"`; assert `screen.getByText("17:48")` has an `aria-labelledby` whose value is the
     `id` of the element returned by `screen.getByText("Saída Prevista")`. Assert the value is
     non-empty and that the two match — never assert the generated id string itself.
  2. *"re-reads the label when the label changes, instead of freezing it"*: render, then `rerender`
     with `label="Saída Real"` and `value="19:10"`; assert the numeral's `aria-labelledby` still
     resolves to the element now reading `Saída Real`, and that no `aria-label` attribute exists on
     the numeral. **This is the case that would go red against a copied `aria-label`, and it is why
     it is written.**
  3. *"keeps one polite announcement and adds no second live region"*: assert the numeral still has
     `aria-live="polite"`, has **no** `aria-atomic`, no `role`, and that the container has exactly
     one element with `aria-live` (`container.querySelectorAll("[aria-live]").length === 1`) —
     `legal.md` LR5.1's one-announcement-per-load, held as a component invariant.
  4. The statement-mode case (`value="Sem carga horária"`, no digit) gets the same name — assert
     `aria-labelledby` is present on that branch too.

  Keyboard path: **not applicable and asserted as such** — the numeral is not focusable, carries no
  `tabindex` and is not a control (`design.md` § States). Reduced-motion path: **not applicable** —
  the element has no transition and none may be added (`design.md` § Motion, row 1).
- **Done when:** `pnpm test __tests__/hero-panel.test.tsx` green, `pnpm check` clean, coverage still
  ≥90% on `components/**` — advances **AC8** (zero `critical`/`serious` axe violations) and
  **AC7**. Advances no part of AC1 or AC2.

---

### T6 — Assert LR5.4: no stored key is overwritten before the restore completes

> **Amended at the G5 run-1 triage — §7.7 B2.** Step 1's `regime` `"pj"` is corrected to the
> storage key `workRegime` with the value `"estatutario"`. One line, plus a fresh red-first run.

- **Owner:** `frontend-dev`
- **Files:** `__tests__/use-work-calculator.test.ts` (edit), `__tests__/use-salary-calculator.test.ts` (edit)
- **Depends on:** none
- **Reuse:** the two existing hook test files, their `renderHook` setup, their `localStorage`
  seeding helpers and their naming. **No source file is edited by this task.**

**Why.** `legal.md` §8.1 **F1**: the guards at `hooks/use-work-calculator.ts:164`, `:186` and
`hooks/use-salary-calculator.ts:137` — the `if (!isRestored) return;` on each persistence effect —
are correct **by construction and asserted by no test**. `hooks/**` is already at 100% coverage,
which executes those lines without protecting the invariant, and **they are exactly the lines a
render-timing change moves.** `legal.md` LR5.4 is the clause the analyst says it would reject a
build over: *"if a default were persisted over a stored input, that is not staleness, it is the app
destroying the user's own record and replacing it with a value they never chose."* T1's remedy,
whatever it turns out to be, is a render-timing change. This check goes in **before** it.

**What to build.** In each file, one new case, named *"never writes a default over a stored value
before the restore completes"*:

1. Seed `localStorage` **before** `renderHook`, with values that differ from every module default —
   for `useWorkCalculator`: `entry`/`lunchStart`/`lunchEnd` at a stored timestamp for today,
   `workMinutes` `"480"` (against the `528` default), `firstTierRate` `"60"`, `extraTierRate`
   `"110"`, `isManualExit` `"true"`, `lastExit` at a stored timestamp; for `useSalaryCalculator`:
   `grossSalary` `"4200"` (against `0`), `monthlyHours` `"180"` (against `220`), `dailyMinutes`
   `"480"`, `dependents` `"2"`, `regime` `"pj"`, `period` `"month"` (against `"hour"`).
2. Install a spy on `Storage.prototype.setItem` that records `[key, value]` in order, **before**
   `renderHook` and after the seeding.
3. Render the hook.
4. Assert: for **every** seeded key, either it was never written, or **the first recorded write to
   that key carries the seeded value, never the module default.** Write the assertion as a loop over
   the seeded map so a key added later is covered without editing the test — never as a list of
   individual `expect`s.
5. Assert additionally that `localStorage.getItem(key)` equals the seeded value for every seeded key
   after the render settles (LR5.4's *"byte for byte"*), and that `lastExit` is not overwritten with
   a value derived from the defaults.

**Seen red before it is trusted** (`legal.md` §3 *How LR5 fails*). In the isolated copy only, delete
the `if (!isRestored) return;` line from each persistence effect, run the two tests, confirm both go
red with the first write carrying the default, paste the failure output into `STATUS.md`, restore
the copy. **Do not do this in the repository** (`AGENTS.md` §4 rule 6).

- **Tests:** the task is the tests.
- **Done when:** `pnpm test __tests__/use-work-calculator.test.ts __tests__/use-salary-calculator.test.ts`
  green, both red-first outputs recorded in `STATUS.md`, coverage still **100%** on `hooks/**`,
  `pnpm check` clean — advances **AC7** and closes `legal.md` **F1**.

---

### T7 — The pass/fail measurement (not a build task)

- **Owner:** `web-standards-auditor`, at **G6** (control pair) and **G9** (H1 vs H2 vs H3)
- **Files:** `reports/audit.md`, `reports/audit-preview.md`, evidence under
  `evidence/g9-control-build-ab/` — no source file
- **Depends on:** T2, T3, and the Finding A remedy task, once written
- **Reuse:** `spec.md` § *The instrument, stated once*; the control-build rule in
  `.agents/agents/web-standards-auditor.md` §G9; `evidence/lcp-candidate-probe.mjs` for AC4.

**What to run.** Exactly the instrument `spec.md` names and nothing else: `lighthouse` 12.6.1, the
repository's unmodified `.lighthouserc.js`, one runner, **one continuous session**, three runs per
host, both routes, hosts H1 (this spec's preview, post-fix), H2 (the pre-fix control deployed for
this measurement and not reused from an earlier report) and H3 (`workload.devrma.com`, reported and
**excluded from every pass/fail arithmetic**).

**Three things the attribution in §1 adds to that protocol, all binding:**

1. **Record `observedFirstContentfulPaint` and `observedLargestContentfulPaint` for every run**, from
   `audits.metrics.details.items[0]`, beside the simulated values. §1 A1 shows the simulated number
   alone cannot distinguish a page that paints late from a page that loads a lot, and the whole
   Finding A group turns on that distinction.
2. **Record `environment.benchmarkIndex` and `diagnostics.totalByteWeight` for every run.** The
   instrument moved 26 points on a frozen artifact; `benchmarkIndex` is the runner's own speed and
   is the first thing to read when H1 and H2 disagree implausibly. `totalByteWeight` is how T2 is
   read (expect ≈782 kB on H2 and ≈345 kB on H1).
3. ~~**AC1 is scored on the identity, not on the score.**~~ **Withdrawn at bounce 1 — do not run
   this item.** The identity is retired (`spec.md` § *AC1, replaced at bounce 1*); §7.5 item 1 is
   what T7 scores for AC1. Struck text kept only so a reader of an older report can find it:
   ~~`Math.round(lcp) !== Math.round(tti)` in at
   least 5 of 6 runs on H1, and `=== ` in at least 5 of 6 on H2. A run in which H2 fails to exhibit
   the defect **invalidates the pair** — it is not a pass for H1 — and it comes back to
   `tech-lead`, not into the report as a caveat.~~

**A number this plan does not let anyone report:** performance score improvements alone, or a median
LCP compared against any number from an earlier session (`spec.md` § *The instrument*, `STATUS.md`
§ *Also carried in* item 2). Today's own reading of H3 (§1, M9: perf **0.93**, LCP 3,045 ms) against
the same host's 0.75–0.91 on 2026-09-15 is the standing demonstration of why.

- **Done when:** **superseded at bounce 1 — the binding text is the `Done when` at the end of
  §7.5.** The clause *"AC1's identity is scored per run"* is withdrawn with the identity; everything
  else in it survives inside the §7.5 restatement.

---

### T8+ — The Finding A remedy

**Not written.** It is written by `tech-lead` as an amendment to this file when T1 returns, and not
before. Writing it now would be the failure lesson **010** exists for and the failure `spec.md` C1,
C2 and C3 each recorded once already this cycle.

What is pre-decided, so the amendment is fast and so nobody improvises it under time pressure:

| Pre-decided | Value |
|---|---|
| The criterion the remedy must move | **AC1 only.** T2 already holds the AC2 side and the goal side |
| The shape of any acceptable remedy | It makes the first contentful paint land **before the end of the resource graph** (§1 A2). Nothing else counts, however good the score looks |
| Where it may live | `app/globals.css`, `app/layout.tsx`, `next.config.ts`, or a `public/` asset. **`lib/**` and `hooks/**` are closed**; `components/**` is closed except T5's two attributes |
| What it may never do | every prohibition listed under T1 (mount animation, fourth root step, skeleton, defer/stream/`dynamic` the hero, empty the server text), plus: change a rendered number, a rendered string, a token value, or any of `design.md` §B's eight invariants |
| Who rules if the remedy needs one of those | Not `frontend-dev` and not `tech-lead`. `product-designer` for §B, `labor-law-analyst` for any figure, `product-manager` for scope, the human for a `DESIGN.md` system change (`AGENTS.md` §4) |
| If T1 concludes the cause is outside application code | The remedy task is **never written**. The finding routes to `product-manager` with `tech-lead`'s recommendation, and AC1 is re-decided at G1 — not worked around at G5 |

---

## 4. Conflicts between the four inputs, resolved

A silent conflict becomes improvisation at G5. These are the four I found, each resolved by routing
it to its owner or by recording which clause governs — never by deciding an owner's question.

| # | Conflict | Resolution |
|---|---|---|
| **K1** | `spec.md` C3 says `/custo-da-hora` inherits the root image convention; `design.md` D3 proves four files exist. **Neither states the actual mechanism**, and both are silent on the fact that the override is `VERCEL_ENV=preview`-scoped | `design.md` wins on the file count (it counted them). The mechanism is settled in §2.3 by reading the installed framework and rebuilding it. **Routed to `product-manager` as D3 (§5) with the exact replacement text.** The fix in T3 is correct under both readings, so no task waits on the bounce |
| **K2** | `design.md` § *What a G6 reviewer checks* item 1 — *"`git diff` touches no file under `components/`"* — against `design.md` §D, which authorises X2's fix on `components/organisms/hero-panel.tsx` | Same document, same owner; the specific clause governs the general one. Recorded under T5, with the bounded diff written out. **If `product-designer` reads it otherwise at G6, T5 is dropped, not argued** |
| **K3** | `spec.md` § Out of scope excludes *"a typeface, icon-library or font-loading change"*; T2 changes three icon **assets** | *"Icon library"* is `@tabler/icons-react` — the lever `0002` spent and measured at zero (`STATUS.md` § *Not in this spec*). `public/favicon.ico` and the two PWA icons are neither a library nor a typeface; they are 61% of the bytes fetched on the path `spec.md` § Scope item 2 puts in scope, and §1 A4 is the attribution that item 1 requires before a lever is accepted. **Scope is the `product-manager`'s, so the reading is routed for confirmation in the same round trip as D3 (§5).** T2 is written in full so nothing is lost either way |
| **K4** | `spec.md` § Scope item 2 nominates `bootup-time`, `mainthread-work-breakdown` and 28 kB of unused JavaScript as the lever | §1 A4: all three are denominated in a phase that totals **371.8 ms**, with no task over 100 ms, and M2 shows the paint is held even with throttling off. The scope item is not wrong — it named a candidate and left the choice to G4, which is what this section is. **No bounce.** Recorded so that a later gate does not read "unused JavaScript 51 KiB" in a Lighthouse report and re-open it |

**Not re-opened by me, and named so the silence is not mistaken for oversight:** the scope
(`product-manager`), LR1–LR5 and every figure (`labor-law-analyst`), the eight invariants and the
ruling that the swap is already correct (`product-designer`), and every pt-BR string
(`content-writer`, who did not run — `STATUS.md` header, and nothing in this plan commissions a
string).

---

## 5. Findings triaged — D1, D2, D3, D4, X2

`AGENTS.md` §4 rule 2: every rejection and every routed finding is triaged here and recorded in
`STATUS.md`. Rule 4: they are routed in **one** round trip, not four.

### D1 — the 0.5452 CLS event on `/custo-da-hora` → **a new spec, opened by `product-manager`**

**Ruling: not this spec, and not `0003`.**

- It is **not the hero** (`design.md` D1 attributes it to the form column and the `briefcase` icon at
  `regime-field.tsx`), it is not on the LCP path, and **no acceptance criterion in `spec.md`
  measures CLS.** Folding it in adds a third independently-scored finding to a spec whose two
  existing ones already cannot carry each other, on a gate whose bounce ceiling is two.
- Its remedy is, by construction, a **layout** change — a column that loses 383 px of height and
  three children that go to zero size. `spec.md` § Out of scope excludes layout changes beyond what
  the G4 attribution proves necessary for the LCP path, and §1 proves this one is not on it.
- `0003` is scoped to citations and `lib/legal-tables.ts` and moves no rendering phase. Wrong home,
  for the same reason `0003` was the wrong home for Finding B.

**What the new spec must measure — written here because an intermittent defect that nobody can
reproduce on demand becomes folklore, and `design.md` deliberately and correctly did not name a
cause:**

1. **A rate with a denominator, not an anecdote.** ≥20 loads per route per condition at 390×844,
   4× CPU throttle, dark **and** light, reporting `n/20` and the CLS value of each event. "1 in 6"
   is a sample of six.
2. **The trigger condition, isolated.** The same runs with storage **seeded** and with storage
   **empty**. The lab runs unseeded and reports CLS 0 in 12/12 (§1); `design.md` measured 0.5933
   with a seeded returning user. If the event only fires for a returning user, that is the single
   most important sentence in the spec and it explains why every gate so far has missed it.
3. **The DOM on both sides of the shift**, not only the `PerformanceObserver` sources: the
   `outerHTML` and computed box of `DIV.lg:col-span-7`, the `BUTTON.flex.w-full`, `DIV.relative` and
   the `briefcase` icon, sampled in the frame before and the frame after.
4. **Whether it reproduces at 1024** — `design.md` **I4** records 1024 as the *narrowest* hero
   container in the whole range (285.3 px, tighter than 390's 294 px), and a column-collapse bug
   that is only checked at 390 is a bug half-checked.
5. **Whether it reproduces on `/`** (measured 0.0011 in 6/6, so probably not) and on the deployed
   head vs a local build — §1 M8 is a standing reminder that those two artifacts do not behave alike.

**T1's X6 produces (1) and (2) in the same pass** — the probe already exists and the browser is
already open — and hands the numbers to the new spec. **T1 names no cause and fixes nothing.**
Suggested slug for `product-manager`: `0007-custo-da-hora-hydration-layout-shift`.

### D2 — LR5's domain returns four surfaces → **G2 is not re-opened; it is carried to G6**

**Ruling: `labor-law-analyst` is not recalled at G4, and nothing about its authority is reduced.**

- `legal.md` §3 already states the domain **as a test** and says the HS1/HS2 table is *"the test's
  output, never its definition"*. HS3 and HS4 satisfy that test, so **they are already in the
  domain** — as `legal.md` wrote it, not as an amendment would have to make it. The enumeration
  needs no repair to bind. Lesson **024** is what makes that true, and it is why the rule survived a
  gate finding two more surfaces.
- What is genuinely open is **the quantity clause**, not the domain: LR5 reads
  `textContent.trim()` of `p[aria-live="polite"].numeric` and therefore **does not read the label**,
  while HS4 changes the numeral from an **hourly** figure to a **monthly** one at the same instant
  its name changes. That is the analyst's to settle and only the analyst's.
- It is carried to **G6**, where `labor-law-analyst` already verifies LR5 against the built
  artifact. The amendment lands there at **zero extra round trip**, its G6 rejection power is
  undiminished (`AGENTS.md` §4 rule 8), and this spec alters neither of those two surfaces in the
  meantime — no task touches a label, a period, or the restore order.

**Binding on this plan, so the G6 ruling is made on measurement rather than on recollection:** every
LR5 probe run for this spec — at T1, at T7, and in the remedy verification — **samples the eyebrow
`<span>`'s `textContent` on the same frame as the numeral's**, and reports both series. That
converts a bounce into a sampling requirement. `evidence/hero-label-swap.mjs` already does exactly
this and is reused rather than rewritten.

### D3 — `spec.md` C3 is wrong → **bounced to `product-manager`**

**Ruling: bounce, with the correction written out so the round trip is one edit.** Anyone who trusts
C3 fixes the root pair, verifies `/`, and ships `/custo-da-hora` broken.

Replace `spec.md` § C3's body with, in substance:

> **C3 — Finding B is four emitted tags on two routes, produced by four files, and the cause is
> Next's preview override of `metadataBase`.**
>
> `app/custo-da-hora/opengraph-image.tsx` and `app/custo-da-hora/twitter-image.tsx` **exist**,
> committed since `16097c3`, each calling `renderOgImage("salary")` with its own `alt`. There is no
> inheritance. A fix that edits only `app/`'s pair leaves half the defect shipping.
>
> The cause is not a resolution bug and cannot be reached through `metadataBase`: for a
> file-convention image route, Next 16.3.5 **overrides** the declared `metadataBase` with
> `getSocialImageMetadataBaseFallback()`, which returns `VERCEL_BRANCH_URL || VERCEL_URL` whenever
> `NODE_ENV === "production" && VERCEL_ENV === "preview"`
> (`node_modules/next/dist/lib/metadata/resolvers/resolve-url.js`, quoted in `plan.md` §2.3). The
> other six metadata surfaces are clean because none of them is a static metadata route file.
>
> **Consequently the defect is preview-scoped**: on `workload.devrma.com`, where
> `VERCEL_ENV=production`, the same four URLs already resolve to `metadataBase`. `spec.md` §
> Problem's *"a crawler or a chat client that unfurls a share of either route is sent to a host named
> nowhere in this repository"* is true of every deployment of this PR stack and of every future
> preview, which is where the squad reviews and where `AGENTS.md` §9's metadata bar is checked. AC5
> and AC6 stay exactly as written, against H1.

Also in the same bounce, for one round trip (rule 4): **confirm K3's scope reading** — that
`public/favicon.ico`, `public/icon-192x192.png` and `public/icon-512x512.png` are inside § Scope
item 2 and are not the *"icon-library"* § Out of scope protects. If `product-manager` rules
otherwise, T2 is lifted out of this plan into its own spec unchanged; no other task is affected.

**This is a correction to one section of `spec.md`, not a re-run of G1.** No acceptance criterion
changes. `STATUS.md` records it as a G1 amendment at run 1, not as a bounce count against the spec
gate — and this is the ruling, so a later gate does not re-count it.

### D4 — two documentation lines → **split, because they are two different things**

- **The hero's path in `DESIGN.md` § Components** (`molecules/hero-panel.tsx` on paper,
  `organisms/hero-panel.tsx` on disk): `product-designer` already ruled at G3 that *"the file is
  right and the document is stale"* and directed the correction to `release-manager` at **G7**. It is
  a transcription of a fact the owner has already established, not a design decision. **Routed to
  `release-manager`, G7, one line.** If `release-manager` finds the correction is more than the path
  string, it stops and bounces to `tech-lead`, who routes it to `product-designer`.
- **The `p-1.5` / `gap-1` segmented-track inset** at `period-selector.tsx:10`, `journey-form.tsx:102`
  and `calculator-views.tsx:43`: **not in this spec.** `product-designer` explicitly declined to
  propose either remedy, both remedies are human approval points (`AGENTS.md` §4), and changing three
  controls' geometry inside a spec whose AC3 reads as zero visual diff is exactly the kind of quiet
  scope creep `refactor-scout` exists to catch. **Routed to `product-manager`** to carry as a future
  spec — plausibly the same one as D1, since both are `/custo-da-hora` form-column surfaces, but
  that is the `product-manager`'s call, not mine.

### X2 — `hero-panel.tsx:44` has no accessible name → **planned as T5**

Owner of the *finding* stays `web-standards-auditor` (`legal.md` §8.2); the *edit* is
`frontend-dev`'s, because a reviewer that edits stops being able to see (`AGENTS.md` §4 rule 5). The
design constraint from `design.md` §D is carried into T5 verbatim and the `aria-label` failure mode
is the case the test is written to catch.

---

## 6. Lessons applied at this gate

| Lesson | Where it changed this gate's output |
|---|---|
| **010** — attribute the metric to its phases before accepting a lever | The whole of §1. Applied strictly, it also **nearly misfired**: the phase table it points at (`TTFB / Load Delay / Load Time / Render Delay`) is itself a Lantern output, and `Render Delay 5127 ms` is not time the browser spent. Reading `observedFirstContentfulPaint` beside it is what turned the diagnosis. **Confirmed (→2)**, and the gap is written up as new lesson **033** |
| **032** — reproduce a routed finding's stated mechanism before scoping a lever on it | Applied three times: `spec.md` C3's inheritance mechanism (refuted, §2.3), the icon assets' contribution to the paint (M3 — refuted as an AC1 lever *after* it looked like the answer), and `spec.md` § Scope item 2's JavaScript levers (K4). **Confirmed** |
| **029** — build a claim in a process-isolated copy, never against the shared `.next` | Every build in §2.3 and every command in T1, T3, T4 and T6 that mutates anything runs in a hardlinked copy outside the repository, on port 3457. **Confirmed (→3): now at the promotion threshold, into `AGENTS.md` at G10** |
| **026** — give every unmeasured number the same is-a-finding escape clause as the measured ones | T2's three "after" byte counts carry an explicit ±15% finding clause, so the developer cannot be pushed into tuning flags to hit a number a plan asserted |
| **020** — every clause of a *Done when* is satisfiable by the task's own files | T1's *Done when* is its own evidence file and a clean `git status`; T2's is its own test; T4's and T6's are their own test files plus the red-first output they themselves produce |
| **013** — an isolated worktree isolates the files, not the environment | Port 3457 everywhere, never 3000, and the build-time `VERCEL_ENV`/`VERCEL_BRANCH_URL` pair is stated in T3 because without it the check passes vacuously |
| **011 / 014** (`product-manager`'s, respected not re-derived) | No criterion here is compared against a number from an earlier session, and no additional runs are ordered for a spread-dependent threshold |
| **023** | At **3 confirmations** and due for promotion into `.agents/agents/labor-law-analyst.md`. That is a **G10** action and is recorded in `STATUS.md` so it is not lost |

---

## 7. T1 triage — run 1, ruled

T1 returned the hard stop `plan.md` §T1 anticipated, and it returned it correctly: it stopped, it
edited nothing, it wrote no remedy, and it **flagged that it had gone past the letter of X4's
enumerated property list rather than presenting the result as settled.** That flag is the reason
this section exists and it is the reason the ruling below is not the one the hard stop proposed.

### 7.1 The developer's flag — confirmed, then corrected

**Confirmed on the process.** X4's six-property list (HTTP version, `content-encoding`,
`cache-control`, `age`, `vary`, `x-vercel-cache`) was **my list and it was incomplete.** A task that
enumerates the properties an experiment may compare, and whose enumeration does not contain the
property that turns out to differ, forces the developer either to stop short of the answer or to go
past the plan. T1 went past it, measured the property, and flagged it. That is the right order and
it is not a defect in the build.

**Corrected on the substance.** T1 named the delivery property as *"real round-trip time to the
origin, compounded across 19 same-origin HTTP/1.1 requests against Chrome's 6-connection limit."*
The mechanism is right. **The attribution of that mechanism to the deployed origin is wrong**, and
it is wrong in a way T1's own data contains the tell for: a Vercel edge that serves `HTTP/1.1` is
already an anomaly, and the plan gave no instruction to check it.

**Measured by `tech-lead` in this session, on this machine, before ruling** (`AGENTS.md` §5):

```bash
# ALPN, three unrelated hosts
for h in workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app \
         workload.devrma.com vercel.com example.com; do
  printf '%s ' "$h"
  echo | openssl s_client -connect "$h":443 -servername "$h" -alpn h2,http/1.1 2>/dev/null \
    | grep -E 'ALPN|issuer='
done
```

| Host | ALPN negotiated | Certificate issuer |
|---|---|---|
| `workload-git-…-devrmas-projects.vercel.app` | **none** | `CN = ns-swg.ca.madeiramadeira.goskope.com` |
| `workload.devrma.com` | **none** | `CN = ns-swg.ca.madeiramadeira.goskope.com` |
| `vercel.com` | **none** | `CN = ns-swg.ca.madeiramadeira.goskope.com` |
| `example.com` | **none** | `CN = ns-swg.ca.madeiramadeira.goskope.com` |

```
* ALPN: curl offers h2,http/1.1
* ALPN: server did not agree on a protocol. Uses default.
* using HTTP/1.x
```

**Every HTTPS host reachable from this machine — including `vercel.com` itself and `example.com` —
is terminated and re-signed by a Netskope Secure Web Gateway (`*.goskope.com`) that does not
negotiate ALPN.** This machine therefore *cannot observe HTTP/2 on any origin in the world*. The
observation "19 requests, all `http/1.1`, to the deployed origin" is a property of **the measurement
path**, not of the deployment, and it is reproduced identically against hosts this spec has no
relationship with.

**And the deployment does speak HTTP/2.** Verified from an independent server-side vantage point
outside this machine's network, so the corporate proxy is not in the path:

```bash
curl -sS "https://api.ssllabs.com/api/v3/analyze?host=<host>&all=done"   # poll until status READY
```

| Host | Edge IP | Grade | `details.alpnProtocols` |
|---|---|---|---|
| `workload.devrma.com` | `216.198.79.1` | A+ | **`h2 http/1.1`** |
| `workload.devrma.com` | `64.29.17.1` | A | **`h2 http/1.1`** |
| `workload-git-…-devrmas-projects.vercel.app` | `216.198.79.195` | A+ | **`h2 http/1.1`** |
| `workload-git-…-devrmas-projects.vercel.app` | `64.29.17.195` | A | **`h2 http/1.1`** |

**Ruling: the cause is real, the mechanism is real, and the agent it belongs to is neither Vercel
nor this repository. It is this measurement host's TLS-intercepting egress proxy**, which forces
every one of the 19 requests onto HTTP/1.1 with no multiplexing and adds its own round trip
(`time_starttransfer` 119–159 ms to an edge in `gru1`, which is São Paulo). T1's latency-injection
dose response (0→96, 50→260, 100→1281, 150→2350 ms) is not invalidated by this — it is **explained**
by it: injecting 100–150 ms of per-request latency onto a *loopback* server reproduces exactly what
the proxy does to the deployed one, and the non-linear knee is the 6-connection queue that only
exists because ALPN was stripped.

Three consequences, each of which changes a decision below:

1. **No remedy is authorised anywhere. Not in this repository, not on Vercel.** The hard stop stands
   and hardens: the platform property the finding names is already correct on the platform.
2. **Every Lighthouse number this spec has on record — `plan.md` §1 M1–M9, T1's X1, X4, X5, `0006`'s
   twelve G9 reports, `0002`'s entire after-table — was measured through this proxy.** They are
   internally comparable to each other and they are **not** field-representative. Nothing in them is
   discarded; every one of them is now labelled.
3. **The request count is not a lever.** 19 same-origin requests cost several serialized waves only
   under HTTP/1.1. On the real serving condition they are multiplexed on one connection. No task in
   this plan spends effort reducing request count, and none did.

### 7.2 Are AC1 and AC2 satisfiable by work in this repository?

**AC1 — no, and not because of the platform. AC1 does not discriminate, on any host.** This is
routed to `product-manager`, and it is a bounce.

AC1 scores the identity `Math.round(simLCP) !== Math.round(simTTI)`. §1 A2 derived that identity
from "the single paint happens after the last byte", and §1.3 endorsed it. **T1's own counterfactual
table refutes the derivation**, and T1 said so in one parenthesis that is the most important
sentence in the evidence file:

| State | obsFCP | simLCP | simTTI | `lcp !== tti`? |
|---|---|---|---|---|
| Cause present (X1 deploy-1, deployed origin) | 1382 | 6256 | 6256 | **no** |
| Cause reproduced (X4, `requestLatencyMs=150`) | 2350 | 2350 | 2350 | **no** |
| **Cause absent** (X4, `requestLatencyMs=0`) | **96** | 96 | 96 | **no** |
| Cause absent (X1 local-3, real `next start`) | 94 | 2628 | 3124 | yes |
| Cause absent (X2 mirror-3, deployed bytes, near-zero RTT) | 101 | 6080 | 6286 | yes |

A page that paints at **96 ms** — the best state this spec has ever measured, the state in which the
defect is definitionally absent — **fails AC1**. Two other cause-absent states pass it. The identity
is satisfied and violated by both good and bad states: it is a property of how much of the resource
graph Lantern happens to have in scope, and it tracks the *shape* of the graph, not the *held paint*.
**A criterion that a known-good state fails is not a strict criterion; it is an unverifiable one**
(`AGENTS.md` §5, and this is exactly the failure lesson **011** was written for and that this spec
was opened so as not to repeat — `0002`'s AC7 again, one layer further in).

I do not write the replacement; `product-manager` does. **My recommendation, with the reason:** score
`audits.metrics.details.items[0].observedFirstContentfulPaint`, the instant read from the recorded
trace. It is the quantity every experiment in this spec actually moved (96 → 2350 across X4; 1382–2339
deployed vs 94–207 local in X1/X2), it moves monotonically with the defect, it is a measured elapsed
time rather than a simulator output (lesson **033**), and a known-good state passes it. Whether it is
written absolute, as a same-session H1/H2 differential, or not at all is `product-manager`'s call.

**AC2 — yes, and it survives as written.** AC2 is a same-session differential between H1 and H2, and
both hosts sit behind the same proxy in the same session, so the proxy is a constant that cancels.
Its lever is in this repository and is already measured: **T2 removes 473,978 B, 61% of the page**
(§1 A4, −1,617 ms simulated LCP, +7 performance points). Under the proxied HTTP/1.1 path fewer bytes
also means fewer queue waves, so the measured differential will if anything overstate the field win —
which is a labelling obligation on the report, not a defect in the criterion. **AC2 stands.**

**AC3, AC4, AC5, AC6, AC7, AC8 — all unaffected.** AC4 in particular already holds on the branch head
at **under 2,500 ms** on a real browser probe (`spec.md` E14) and is the criterion that still carries
the absolute target.

**Does the absolute 2,500 ms target survive? It was never written as a lab criterion here and it does
not need restating.** `spec.md` § *On the absolute 2,500 ms target* already ruled it out of the lab
and parked it on AC4's real-browser probe, which passes. What this triage adds is the reason that
ruling was right: the lab instrument on this machine is measuring a corporate proxy. **The absolute
target stays exactly where `spec.md` put it. Nothing about it is re-opened, and no part of it is
handed to another owner.** The only owner named here is `product-manager`, and only for AC1.

### 7.3 What ships from this spec

| | Ruling |
|---|---|
| **T2** (three mislabelled JPEGs) | **Ships, here, unchanged.** See §7.4 |
| **T3, T4** (Finding B) | **Ship, untouched.** Independent of all of the above; mechanism already verified by build (§2.3) |
| **T5** (accessible name), **T6** (LR5.4 guard) | **Ship, untouched** |
| **T7** (the measurement) | **Amended.** See §7.5 |
| **T8+** (the Finding A remedy) | **Never written. Closed.** §7.1 |
| **AC1** | **Bounced to `product-manager`; the bounce is closed.** `spec.md` § *AC1, replaced at bounce 1* replaced it with a per-route, same-session `observedFirstContentfulPaint` differential. It is scored by T7 — §7.5 item 1 |

### 7.4 T2 — what it satisfies, ruled

T2 was recorded at G4 as **not** satisfying AC1. That ruling stands and is now stronger: *nothing*
satisfies AC1 as written. It does not make T2 worthless, and T2 is not held hostage to the AC1
bounce.

**What T2 satisfies, on evidence already measured:** **AC2** (the same-session H1/H2 LCP
differential — its only lever in this plan), **AC7** (its own test file), and the 2,500 ms **goal**
via `totalByteWeight` 781,915 → ≈308,829 B. It also makes `app/manifest.ts`'s `type: "image/png"`
declaration **true**, which it currently is not — a correctness defect independent of every number
in this spec, since the three files are one 1024×1024 JPEG under three names and two wrong
extensions.

**What is new after §7.1, and why it matters that it is new:** T2's justification at G4 leaned partly
on the request/connection story. **That half is withdrawn.** T2's remaining justification is bytes
and file-type correctness, both of which are true on any protocol, on any path, for any user. 61% of
the page is two files that should not exist in that form. **T2 ships on that alone.**

**T2's task text is unchanged** — the four `convert` commands, the ±15% finding clause, the four test
cases in `__tests__/public-assets.test.ts`, the `Done when`. One line of its *What this task does and
does not buy* paragraph is superseded: **do not report T2 as moving the observed first paint.** It
does not, it never did, and §7.1 explains why nothing in this repository can.

### 7.5 T7 — amended, three changes

T7's protocol is otherwise unchanged. `web-standards-auditor` runs it at G6/G9 as written, plus:

1. **AC1 is scored, on the replacement `product-manager` returned at bounce 1.** The bounce has
   landed; `spec.md` § *AC1, replaced at bounce 1* is the binding text. **T7's own item 3 is
   withdrawn with the identity it scored**, and so is the `AC1 — not scored` line this item carried
   at the T1 triage. Neither may appear in a report. What T7 scores now:

   **The field.** `audits.metrics.details.items[0].observedFirstContentfulPaint`, read per run, per
   host, per route — six numbers per route (H1×3, H2×3), in milliseconds exactly as the JSON gives
   them, **not rounded**. Read with the command `spec.md` AC1 names; the `path.resolve` in it is
   load-bearing. H3's numbers are recorded and excluded from this arithmetic (C2).

   **The arithmetic, per route.** `median` over three runs is the middle value of the sorted three.
   **Pass** when `median(H1) − median(H2) ≤ max(H2) − min(H2)`. A negative difference — H1 faster —
   passes and is recorded as such; **no improvement is required**, because nothing in this
   repository moves the observed paint (§7.1, §7.4). T2 is *not* read off this number.

   **Void, not passed — three conditions, any one of which ends the session.** A void session is
   **re-run once**, in full; a second void session is a **finding routed to `tech-lead`**, never a
   pass, never a fail, and never a caveat in the report.
   - **V1 — different sessions.** The H1 and H2 blocks carry different `fetchTime` sessions.
   - **V2 — differing transport.** The two hosts' item-2 transport blocks differ: both must show the
     **same ALPN result** and the **same certificate issuer**. This is why item 2 is now load-bearing
     and not descriptive.
   - **V3 — non-discriminating instrument.** `max(H2) − min(H2)` exceeds **1.000 ms** on either
     route. The spread is the criterion's own margin; a spread that wide makes the comparison
     unreadable.

   **Before the session is accepted**, check the criterion against the known-good states already on
   record (lesson **040**): X4 at `requestLatencyMs=0` (96 ms), X1 local-3 (94 ms), X2 mirror-3
   (101 ms) all pass; the held states (1.281 ms, 2.350 ms against a 96 ms peer) fail. §7.2 and
   `evidence/t1-attribution.md` hold both.

   **What may not be reported for AC1:** the `lcp`/`tti` identity in any form, a Lantern-simulated
   `lcp` or `tti`, a performance score, or any absolute number compared to 2.500 ms (R11 — the
   absolute target is AC4's). The simulated `lcp`/`tti` pair is still **recorded as data**, per T7
   item 1 of §3, and is evidence for nothing here.
2. **Record the transport condition of the session, in `summary.txt`, before the runs. This block is
   load-bearing for AC1's scoring, not descriptive:** it is the only thing that decides **V2**, so a
   session missing it for either host cannot be scored at all. One command, pasted verbatim, per
   host:
   ```bash
   echo | openssl s_client -connect "$HOST":443 -servername "$HOST" -alpn h2,http/1.1 2>/dev/null \
     | grep -E 'ALPN|issuer='
   curl -sS -o /dev/null -w 'http_version=%{http_version} ttfb=%{time_starttransfer}\n' "https://$HOST/"
   ```
   and, from each LHR, the protocol histogram of
   `audits["network-requests"].details.items[].protocol`. **A session in which any host negotiates no
   ALPN, or in which the issuer is not the host's own CA, is a session measured through an
   intercepting proxy and every absolute number in it carries that label.** Differentials measured
   inside one such session stay valid; absolute numbers compared to a Core Web Vitals threshold do
   not.
3. **Report `totalByteWeight` per run** (already item 2 of T7) **and read T2 off it**: ≈782 kB on H2
   against ≈345 kB on H1 is T2 landing. That is the number T2 is scored on, not the paint.

**Are the three void conditions computable from what T7 already captures?** Two of three, yes. **V2**
is item 2's block, unchanged — ALPN and issuer per host are already mandatory, and the per-request
`protocol` histogram stays as corroboration. **V3** is arithmetic over the three
`observedFirstContentfulPaint` values item 1 of §3 already mandates per run; the only addition is
that they are now read **per route** as well as per host, which the protocol's "three runs per host,
both routes" already produces.

**V1 is not computable from what T7 records today, and this is the one extra field.** `fetchTime` is
a top-level LHR field that no item of T7 asks for; AC2 rejects on it and `summary.txt` has never been
required to carry it. **T7 must now record `fetchTime` verbatim for every run, in the `summary.txt`
block for its host**, read with
`node -e 'console.log(require(require("path").resolve(process.argv[1])).fetchTime)' $LHR.json`. No
other field is added.

**T7's `Done when` is amended to match:** `summary.txt` carries an H1 block and an H2 block with the
same `fetchTime` session and that `fetchTime` printed per run; **AC1's per-route medians, H2's
`max − min`, and an explicit V1/V2/V3 verdict are written out**; AC2's margin is compared against
H2's own `max − min`; AC4's probe output is attached; and `node .agents/tools/preview.mjs --out <dir>`
has run against H1 — verifies **AC1, AC2, AC4, AC8**.

### 7.6 The `reports/qa.md` process point — ruled

**The developer is right that `reports/qa.md` is `qa-engineer`'s artifact at G6 (`AGENTS.md` §3), and
it was right not to create it. There is nothing to fix in the plan**, because the plan never asked
for it: `grep -n 'reports/qa\|qa\.md' plan.md spec.md` → **0 matches**. T1's *Done when* names
`evidence/t1-attribution.md` and a clean `git status`, and nothing else. The only `reports/qa.md` in
this spec is the artifact column of `STATUS.md`'s gate table, which is correct.

The instruction the developer most likely read is T4's and T6's *"paste the failure output into
`STATUS.md`"*. **That one stands and is deliberate**: the red-first output of a guard is triage
evidence for `tech-lead`, it lands in `STATUS.md`, and it is not a QA report. Recorded here so the
next agent does not re-litigate it.

---

### 7.7 G5 run 1 — B1, B2 and B3 ruled

Three items came back from the run-1 build without being decided by `frontend-dev`, which is the
correct disposition for all three. **None of them is a bounce.** The rulings below are binding and
they amend §3: where a task body and this section disagree, **this section governs**.

#### B3 — T5 is **dropped**. The mechanism `design.md` §D mandates cannot deliver an accessible name.

**The attribution first, because the fallback does not answer it.** §T5's own last line names the
fallback — *"if `product-designer` reads it otherwise at G6, T5 is dropped, not defended"* — and a
written-down fallback is the path of least argument at a blocker. It answers *which option if this
component is the problem*; it never answers *is this component the problem*. So the component
verdict is established before the fallback is ordered, and it is established by reproduction, not by
reading:

- `frontend-dev` built §T5 **exactly** as written — `useId`, `id={labelId}` on the eyebrow `<span>`,
  `aria-labelledby={labelId}` on the `<p>` — and `biome check` rejected it at
  `lint/a11y/useAriaPropsSupportedByRole`, quoted in `STATUS.md` § Blockers.
- The rule is right on the substance and is not a lint quirk: a bare `<p>` maps to ARIA
  `role="paragraph"`, and `paragraph` **prohibits** `aria-label`/`aria-labelledby`. The attribute is
  not merely un-lintable, it is not guaranteed to reach a screen reader at all.
- **All four of the specified tests passed in jsdom.** That is the finding, and it is bigger than
  this task: a DOM-level assertion proves an attribute is present and can say nothing about whether
  the element's role supports it. Lesson **052** is written for it.

**Two verdicts, kept apart.**

| Verdict | Substance | Owner |
|---|---|---|
| **Component** | The one mechanism `design.md` §D authorises — a live `aria-labelledby` on the numeral's existing `<p>` — **cannot produce an accessible name**. Refuted, not deferred. | `product-designer`, when a spec with scope over `hero-panel.tsx` opens |
| **System** | **X2 is still open**, unchanged from `HEAD`. The numeral has no accessible name, exactly as `legal.md` §8.2 records it. | `web-standards-auditor`, unchanged |

**Why this is not a bounce to `product-designer` now.** Every mechanism left changes something
`design.md` freezes elsewhere in the same file, so each is the designer's call and **none is
available to me**: a `role` on the `<p>` contradicts § Accessibility § *Roles and semantics*, which
fixes the numeral as `<p aria-live="polite">`; a different element does the same; and moving
`aria-live`/`aria-labelledby` up to the existing `@container` wrapper (no new element, so **I4** is
untouched) puts `media` and `children` inside the live region — including the ring's own `sr-only`
`aria-live` — which changes the live-region scope § *Live regions* freezes at one announcement per
load. **I do not choose among them** (`AGENTS.md` §4, and I do not re-open the design).

What makes it a *drop* rather than a bounce is that **§T5's premise is gone**. Its stated
justification was *"an unassigned finding on a file this spec already opens becomes an unplanned
mid-gate edit."* This spec no longer opens `components/organisms/hero-panel.tsx` for any reason:
**T8+ is closed and never written** (§7.1), so T5 was the only remaining task touching the file.
Buying a design round trip to fix a non-blocking finding on a file this spec otherwise does not
touch is scope, not triage.

**What this costs, stated so no gate has to guess.** Nothing legal: `legal.md` §8.2 X2 is *"new,
non-blocking, not a legal finding… not required by this gate and it is not an acceptance criterion I
am asking for."* `design.md` §D: *"Owner stays `web-standards-auditor`… and I do not claim it."*
Nothing on AC7 — T5 added no code, so no coverage moves. **And nothing on AC8**, which is *zero
axe-core violations at `critical` or `serious`*: X2 came from the auditor's own reading, not from an
axe rule — axe has no rule requiring an accessible name on a paragraph — so AC8 is scored on a tree
in which X2 is present and produces no violation. **AC8 passing is not X2 being fixed**, and no
report may read it that way (R14).

**R9 is discharged** — it anticipated a G6 argument about T5's diff, and there is no diff.
`components/organisms/hero-panel.tsx` and `__tests__/hero-panel.test.tsx` are at `HEAD`, byte for
byte, and stay there.

**What `web-standards-auditor` is handed at G6.** X2 returns as carried debt **with the refutation
attached**: the next agent to pick it up starts from a role-and-DOM question, not from an attribute,
because the attribute has been tried and does not work. Record that in `reports/audit.md` when X2 is
restated, so the third cycle does not re-propose `aria-labelledby` on a `<p>`.

#### B2 — the T6 seed uses `workRegime: "estatutario"`. Mechanical, not legal; not routed.

`frontend-dev` was right to omit the key rather than substitute a value of its own, and right that
`"pj"` cannot be held: `lib/payroll.ts:4` types `WorkRegime` as `"clt" | "estatutario"`. **This is
not a legal question and it does not go to `labor-law-analyst`**, because the seed asserts nothing
about any regime. LR5.4 is *"a stored value is not overwritten by a default before the restore
completes"*; the seed's only requirement is therefore **a value the type admits that is not the
module default**, and `hooks/use-salary-calculator.ts:32` sets that default to `"clt"`. Exactly one
value satisfies both conditions, so there is nothing to choose.

`plan.md` §T6 step 1 is corrected on two points at once — the value **and the key**, which the
original also got wrong:

> for `useSalaryCalculator`: … and `workRegime` `"estatutario"` (against the `"clt"` default at
> `hooks/use-salary-calculator.ts:32`).

`hooks/use-salary-calculator.ts:42` maps `regime` to the storage key **`"workRegime"`**, not
`"regime"`; the shipped seed's other five keys are right and stay as they are. One line is added to
the `storedValues` map in `__tests__/use-salary-calculator.test.ts`, inside the existing loop —
no new `expect`, no other change. **T6 must be seen red again with the key in place**, in the
isolated copy, under the same protocol §T6 already specifies: a seeded key whose red-first run was
never observed is the decoration §T6 exists to forbid.

#### B1 — the origin is declared **once, in `lib/structured-data.ts`**, and the guard widens to all of `app/`. New task **T9**.

`frontend-dev` read the clause correctly and shipped the guard on the domain the task's own
paragraph states (`*.tsx`), which is green. The paragraph is the defect — it states the rule
(*"no file under `app/` other than `app/layout.tsx`"*) in one width and the guard's domain
(*"every `*.tsx` under `app/`"*) in another, and a guard whose domain is narrower than its rule is a
guard with an unwritten exemption list. **This is lesson 022 recurring at G4** (run every guard you
rule over a file against the files already there, before the domain is binding); it is recorded as a
recurrence, not confirmed as a prevention.

**The ruling is narrow, not exempt**, and it does not need a new file: `lib/structured-data.ts:3`
**already exports `SITE_URL = "https://workload.devrma.com"`**, so the single declaration exists and
`app/` has three copies of it. Exempting `robots.ts` and `sitemap.ts` would enumerate two files in a
guard `AGENTS.md` §5 requires to be written over a class, and would leave the JSON-LD origin and the
`metadataBase` origin free to drift apart — two sources of truth for one string is the shape of the
defect this spec exists to close.

`app/sitemap.ts` and `app/robots.ts` cannot use `metadataBase`: Next resolves neither route against
it, and the sitemap protocol requires absolute URLs. They import the constant instead.

---

### T9 — Declare the origin once and widen the metadata guard to every file under `app/`

- **Owner:** `frontend-dev`
- **Files:** `app/sitemap.ts` (edit), `app/robots.ts` (edit), `app/layout.tsx` (edit),
  `__tests__/metadata-image-host.test.ts` (edit)
- **Depends on:** T3, T4
- **Reuse:** `SITE_URL` from `lib/structured-data.ts:3` — **the constant already exists, is already
  exported and is already this repository's declared origin.** Do not create `lib/site.ts`, do not
  rename `SITE_URL`, do not move it. `lib/structured-data.ts` imports only `@/lib/calculator-view`,
  so importing it from a route module pulls in no runtime weight.

**What to build.**

1. `app/sitemap.ts` — delete the local `const SITE_URL = "https://workload.devrma.com";` at `:3` and
   `import { SITE_URL } from "@/lib/structured-data";`. Every other line is unchanged: the two
   entries keep their `url`, `lastModified`, `changeFrequency` and `priority` exactly as they are,
   and `LAST_CONTENT_CHANGE` stays where it is. The emitted `/sitemap.xml` is byte-identical.
2. `app/robots.ts` — `import { SITE_URL } from "@/lib/structured-data";` and write
   `` sitemap: `${SITE_URL}/sitemap.xml`, `` at `:9`. The emitted `/robots.txt` is byte-identical.
3. `app/layout.tsx` — `import { SITE_URL } from "@/lib/structured-data";`, then
   `metadataBase: new URL(SITE_URL)` at `:16` and `url: SITE_URL` in `openGraph` at `:36`. **Change
   no other metadata field**, and do not touch `verification`, `alternates` or the font setup. After
   this step the literal `https://workload.devrma.com` appears **nowhere** under `app/`.
4. `__tests__/metadata-image-host.test.ts` — the guard's domain now matches its rule:
   - add `appSourceFiles()` beside the existing `appFiles()`: same `readdirSync` recursion, filtered
     on `.ts` **and** `.tsx`. `appFiles()` stays `.tsx`-only and stays the input to the first case —
     an image route is a `.tsx` file convention and that clause is correctly scoped already.
   - case 2 (*"names no deployment host anywhere under `app/`"*) reads `appSourceFiles()`.
   - case 3 is renamed to **`"declares the origin once, in lib/, and nowhere under app/"`** and
     becomes: **no file returned by `appSourceFiles()` contains `DECLARED_ORIGIN`** — with no
     exemption, so `ORIGIN_DECLARATION_FILE` changes from `join(APP_ROOT, "layout.tsx")` to
     `"lib/structured-data.ts"` and the file-not-equal filter is deleted. The existing positive
     assertion stays and now reads the new declaration file:
     `expect(readSource(ORIGIN_DECLARATION_FILE)).toContain(DECLARED_ORIGIN)`. Without it the case
     passes by the literal having been deleted everywhere, which is not the rule.

**Seen red before it is trusted**, in the isolated copy, same protocol as T4 (`AGENTS.md` §4 rule 6,
lesson **029**): with the widened guard in place and the three source files restored to `HEAD`,
case 3 must fail naming **both** `app/robots.ts` and `app/sitemap.ts`; paste the output into
`STATUS.md`. A widened guard that was never red over the two files that motivated it proves nothing.

- **Tests:** no new test file. `__tests__/robots.test.ts`, `__tests__/sitemap.test.ts` and
  `__tests__/layout.test.tsx` assert the emitted strings and **must pass unchanged** — that is the
  check that this task is a refactor and not a behaviour change. Do not edit them; if one goes red,
  the edit changed output and the task is wrong. Assert no Tailwind class; query nothing by class.
- **Done when:** `pnpm test __tests__/metadata-image-host.test.ts __tests__/robots.test.ts
  __tests__/sitemap.test.ts __tests__/layout.test.tsx` green, the red-first output recorded in
  `STATUS.md`, `pnpm check` and `pnpm build` clean, coverage still ≥90% on `app/**` — advances
  **AC5**, **AC6** and **AC7**. If `pnpm build` emits any warning about importing
  `@/lib/structured-data` from a metadata route, **that is a finding for `tech-lead`, not a licence
  to revert to the literal.**
- **Depends on:** T3, T4.

---

### 7.8 G6 run 1 — F1 through F5 triaged

`reports/qa.md` (run 1) rejects on **F1** and routes **F2**–**F5**. This is **bounce 2 of the spec,
bounce 1 of the qa gate** (`AGENTS.md` §4 rule 2: nothing bounces agent-to-agent). The ceiling on the
qa gate is two; one is now spent. What the gate *passed* — T2, T3, T4, T6, T9 against §3 as amended
by §7, four clean local gates, 609/609, per-area coverage with no threshold lowered, the three
restore guards re-broken individually, R15 discharged by md5 — is **not re-opened by this triage** and
is not to be re-litigated at run 2.

**F1 — blocking. Upheld, and the defect is mine.** `STATUS.md` still carried the retired
*"AC1 — not scored"* instruction in the T7 row and in the blockers list, 242 lines from the line that
states the opposite. §7.5 item 1 retired that instruction at bounce 1; I amended `plan.md` and left
both copies standing in the document the auditor actually reads for task state. **R12's stated signal
fired exactly as written.** Corrected in `STATUS.md` this triage: the T7 row now restates §7.5 item
1's current three changes, and the blocker is closed as discharged. The one surviving occurrence of
the retired string in `STATUS.md` is inside the past-tense record of F1 itself, explicitly marked as
the finding's text and not as an instruction — a record of a retirement is not a re-issue of it.
**No source file is involved and none was edited.** **No new lesson: the rule already exists** as `AGENTS.md` §5 *How a rule's domain is defined*, last bullet — *"when an edit renames a figure, a norm or a term, grep the old name across the same boundary"*. A retirement landing in one of two documents is that rule's shape on an instruction. The ledger stays at **30/30** and the pressure stays where it belongs; see the decisions log.

**F2 — ruled: out of scope for `0004`, recorded as debt with an owner and a trigger.** The ruling,
and the reasoning, because the next reader must not re-derive it:

1. **The finding is real and the QA's attribution is accepted.** `/_not-found` emits
   `og:image`/`twitter:image` on the branch alias under a preview build, in five artifacts, and they
   are the only five `vercel.app` occurrences left in the build output. It is **pre-existing** — true
   before T3, unchanged by this diff — and it is `spec.md` C3's mechanism on the last route it still
   reaches.
2. **It is outside AC6.** AC6 enumerates five paths and `/_not-found` is not one of them. Scoring it
   against AC6 would be scoring the spec against a criterion `product-manager` did not write, which
   is not `tech-lead`'s call to make.
3. **The guard's domain is the real defect, and I am saying so.** `__tests__/metadata-image-host.test.ts`
   bounds case 1 by *directories containing an `opengraph-image.tsx` or `twitter-image.tsx`*. That is
   an **enumerated convention**, not a test on what the rule governs, and it is the exact shape
   `AGENTS.md` §5 *How a rule's domain is defined* forbids: the class the rule actually governs is
   *every route segment that inherits a file-convention image route*, which includes segments Next
   generates with no `page.tsx` at all. `/_not-found` falls outside the guard's domain **by
   construction**, so the guard is green and can never see it. The count was never the thing that was
   wrong.
4. **But the domain is not widened in this spec, and that is deliberate.** A widened domain admits
   `/_not-found`, and `/_not-found` has no remedy available in this spec's file list: with no
   `page.tsx` there is no segment-level `openGraph.images` to declare, and `not-found.tsx` is not a
   metadata-exporting convention. Widening the guard here ships a **red gate with no authorised
   remedy behind it** — `AGENTS.md` §5 again: a clause that can only be met by breaching another
   binding principle is the clause that is wrong, and the correction is not to widen and hope.
   Guard and remedy widen in the same spec or neither does.
5. **The candidate remedy, written down so the next spec starts from here instead of from zero, and
   its risk.** Declaring `openGraph.images` and `twitter.images` in `app/layout.tsx`'s metadata would
   give every segment — `/_not-found` included — an explicitly declared image that resolves against
   `metadataBase`, which is already `SITE_URL` after T9. **It is unverified, and its failure mode is
   that it breaks a criterion that currently passes:** Next's per-field metadata merge between a
   layout and a page is exactly what makes AC5's *"exactly one of each per route"* hold today, and a
   layout-level `images` key sits on the one field the two route modules already set. That has to be
   settled by a `VERCEL_ENV=preview` build with the four tags counted per route on `/`,
   `/custo-da-hora` **and** `/_not-found` — which is a build task with its own red-first evidence,
   not a line added at a G6 re-run on a machine with four concurrent specs holding its ports.

   **Owner:** `product-manager`, to scope it. **Trigger — any one of these opens it:** a spec that
   edits `app/layout.tsx`'s `metadata` export, `app/opengraph-image.tsx` or `app/twitter-image.tsx`;
   a spec that adds a route segment under `app/`; or a change of deploy host. **Carried to G7 and G9
   as debt** in `STATUS.md` § *Carried to later gates*, with the same status X2 has: recorded, not
   fixed, not resolved, not out of scope in the sense that would close it.

   **`frontend-dev` builds nothing against F2 in this spec.** `web-standards-auditor` does not score
   it at G9: it is outside AC6, and a green AC6 is evidence for nothing about `/_not-found`.

**F3 — minor, upheld, mine.** X2 was carried only in the T5 row of the Tasks table and absent from
§ *Carried to later gates*, which is **R14's second clause** verbatim — *"or omits it from carried
debt"*. Fixed in `STATUS.md` this triage: X2 now has its own bullet in that list, naming
`components/organisms/hero-panel.tsx:44`, the §7.7 B3 refutation, and the fact that a green AC8 is
evidence for nothing about it.

**F4 — minor, upheld, routed to `frontend-dev` as T10.** The gap is real and it is the one this squad
keeps paying for: a loop over a collection with no assertion on the collection's size reports an
empty sample and a clean sample identically. The idiom is already in this spec's own diff one file
over. Task text in §7.9.

**F5 — minor, upheld, mine, plan text only.** §T4's *"each of the three must be observed failing"* is
unsatisfiable for clause 2 and always was. The developer claimed no fourth red and owed none; the
plan was wrong, not the build. §T4's *Seen red before it is trusted* paragraph is restated above:
clauses 1 and 3 are red-first, clause 2 is a forward guard, and no red output is owed for it.

**`pnpm e2e` — routing confirmed, not re-ordered.** The QA declared the omission rather than presuming
it, and the reason holds: ports 3000/3917/3920/3941 were held by other agents' `next start` servers
and a Playwright run against a shared port fails indistinguishably from a regression (lesson **029**).
**It stays routed to G9**, where `web-standards-auditor` runs it. AC7 is not scored as passed on
`pnpm e2e` until that run exists; the four local gates are what run 2 owes.

### 7.9 T10 — the positive control F4 asks for

- **Id and title:** T10 — Assert the manifest icon collection is non-empty before looping it.
- **Owner:** `frontend-dev`.
- **Files:** `__tests__/public-assets.test.ts` — **edit**. No other file. No source file.
- **What to build:** in `__tests__/public-assets.test.ts`, the two cases at `:34-41` and `:43-49` both
  iterate `manifestIcons` (`:24`, `manifest().icons ?? []`) with no assertion on its length. Add, as
  the **first statement of each of the two cases** — not once in a shared scope, because a control
  that lives outside the case does not prove *that case* measured anything:

  ```ts
  expect(manifestIcons).toHaveLength(2);
  ```

  `2` is the literal count `app/manifest.ts` declares today — `icon-192x192.png` and
  `icon-512x512.png`. Use the exact count, not `toBeGreaterThan(0)`: this guard's subject is a fixed,
  enumerated set that T2 shipped, and a count that goes to 1 or 3 without the task noticing is the
  same defect as a count that goes to 0. Add no comment. Change no other line, rename nothing, and do
  not touch the loop bodies or the existing assertions.
- **Reuse:** `__tests__/metadata-image-host.test.ts:42` is the sibling idiom this spec already ships;
  T10 is the same rule with a known count instead of a floor. Do not introduce a helper for two
  lines.
- **Tests:** the task is the test. Assert no Tailwind class string; query nothing by class name.
- **Red-first, and it is one command, not a build:** temporarily edit the `manifestIcons` binding in
  the copy to `[]`, run the file, and both cases must go **red on the new assertion** —
  `expected [] to have a length of 2`. Then restore. Paste the output into `STATUS.md`. This is the
  positive control proving the control itself works; without it T10 is one more line that has never
  been red. Do it in the isolated copy, not with `git stash` (`AGENTS.md` §4 rule 6).
- **Done when:** `pnpm test __tests__/public-assets.test.ts` green, the red-first output recorded in
  `STATUS.md`, `pnpm check` clean — advances **AC7**. If the manifest's icon count is not 2 when you
  read it, **that is a finding for `tech-lead`, not a licence to write `toBeGreaterThan(0)` instead**:
  it would mean something changed `app/manifest.ts` after T2.
- **Depends on:** T2.

---

## Risks

| # | Risk | The signal it happened |
|---|---|---|
| **R1** | T1 comes back with "the cause is the platform, not the code", and the squad converts it into a code change anyway so that something ships | A remedy appears in the amendment whose measured effect on `observedFirstContentfulPaint` is smaller than the run-to-run spread of X1's six runs — or with no X1 number attached at all |
| **R2** | *(restated at bounce 1)* T2's −1,617 ms is reported as AC1 passing, because the score moves 7 points and the report reads green | `reports/audit.md` cites `categories:performance`, `totalByteWeight`, a simulated `lcp`/`tti`, or the LCP median for AC1 instead of the per-route `observedFirstContentfulPaint` differential of §7.5 item 1. AC1 is a measured-paint differential; a score, a byte count and a simulated timing are evidence for it in no form |
| **R3** | The remedy reintroduces a mount animation — a `motion` wrapper, an `initial`/`animate` pair, a `@starting-style` opacity — because it *looks* like a paint-timing fix | `curl` on H1 returns any `style="…opacity:0…"` or `opacity-0` on the hero's paint path, or `design.md`'s reviewer check 5 fails. This is the mechanism still live on `origin/main` (`spec.md` C2) and `design.md` calls it *"the single most important motion constraint in the file"* |
| **R4** | The remedy touches `html { font-size }` or the root scale as a layout/paint lever, and the `AlertBanner` silently goes over its 32 px budget at 2560 | `tests/e2e/wide-viewport.spec.ts` still passes while the banner's chrome exceeds 32 px — **the check that would catch it does not exist at 2560 in this spec**. Any diff touching a root-size step is an automatic bounce to `product-designer` (`design.md` **I8**, the 3 px margin `0006` paid to learn) |
| **R5** | T3 is verified without `VERCEL_ENV=preview` / `VERCEL_BRANCH_URL`, passes vacuously on `localhost`, and ships | The developer's pasted `curl` output shows `og:image` already on `workload.devrma.com` **before** the patch. That is the signature of a build without the two environment variables, and it is exactly how this defect survived every G6 (`spec.md` E11) |
| **R6** | A fix edits only `app/opengraph-image.tsx` and `app/twitter-image.tsx` and `/custo-da-hora` ships broken | `curl` on `/` is clean and `curl` on `/custo-da-hora` is not — caught by AC6's whole-boundary search and by T4's guard, but at the cost of a full G6 round if T4 is skipped. This is `design.md` D3's whole point |
| **R7** | D1's 0.5452 CLS is quietly folded into this spec's remedy because T1's browser is already open and the event is right there | Any diff under `components/organisms/regime-field.tsx`, `journey-form.tsx` or the `lg:col-span-7` column. T1's X6 **measures and reports**; it does not fix, and it does not name a cause |
| **R8** | The LR5 probes keep reading only the numeral, so D2's HS4 question reaches G6 with no measurement and `labor-law-analyst` has to re-open the browser | A G6 LR5 report with one text series instead of two. §5 D2 makes the label series mandatory in every probe run this spec performs |
| **R9** | T5's two attributes are read at G6 as a violation of `design.md`'s "no file under `components/`" check and the gate bounces on a fix the designer authorised | A G6 rejection citing reviewer-check item 1 against `hero-panel.tsx`. K2 records the resolution in advance; if the designer disagrees, T5 is dropped without argument and X2 returns to `web-standards-auditor` as carried debt |
| **R11** | *(added at the T1 triage)* A later gate reads an absolute Lighthouse number from a session measured through the intercepting proxy and compares it to the 2,500 ms Core Web Vitals threshold — the whole spec's evidence base has this shape and it reads like a field number | `summary.txt` carries an absolute LCP compared against 2,500 ms with no ALPN/issuer block beside it. T7 item 2 makes the block mandatory; a report without it is not a report, and the absolute comparison in it is not evidence |
| **R12** | *(added at the T1 triage, restated at bounce 1)* T2 ships, the score moves, and the Finding A group is quietly read as closed — while AC1 has never actually been scored on a valid session | `reports/audit.md` shows the Finding A group with no per-route AC1 arithmetic and no V1/V2/V3 verdict, or carries the retired `AC1 — not scored` line, or records a pass on a session that met a void condition. `AGENTS.md` §4 rule 1: a partial pass is a rejection |
| **R13** | *(added at the T1 triage)* The squad concludes "it is the proxy, so nothing here matters" and drops T2 as well | Any note treating the 473,978 B of mislabelled JPEGs, or `app/manifest.ts` declaring `image/png` over JPEG bytes, as a measurement artifact. It is a correctness defect on every protocol and every path (§7.4) |
| **R10** | *(restated at bounce 1)* The session is non-discriminating — H2's own spread swallows the comparison, or the two hosts were not measured alike — and the pair is reported as a pass for H1 anyway | `summary.txt` shows `max(H2) − min(H2)` above 1.000 ms on either route, or two `fetchTime` sessions, or two different ALPN/issuer blocks, beside an AC1 pass. That is **void** (§7.5 item 1, V1–V3): re-run once, and a second occurrence comes back to `tech-lead` — today's M9 reading of H3 at perf 0.93 is the standing evidence that this instrument can decline to reproduce its own conditions |
| **R14** | *(added at the G5 run-1 triage)* T5 is dropped, AC8 comes back green, and X2 is read as closed — the numeral still has no accessible name | `reports/audit.md`, `reports/release.md` or `STATUS.md` records X2 as fixed, resolved or out of scope, or omits it from carried debt. AC8 is scored on a tree that contains X2 and produces no axe violation from it (§7.7 B3); the two are independent and a green AC8 is evidence for nothing about X2 |
| **R15** | *(added at the G5 run-1 triage)* T9 is taken as licence to move or rename `SITE_URL`, and `lib/structured-data.ts`'s JSON-LD origin drifts from `metadataBase` again | Any diff creating `lib/site.ts`, renaming `SITE_URL`, or leaving two origin literals in the tree. T9 is a three-import refactor with byte-identical output; `__tests__/robots.test.ts`, `__tests__/sitemap.test.ts` and `__tests__/layout.test.tsx` going red is the signal it stopped being one |
| **R16** | *(added at the G6 run-1 triage)* F2 is read as **resolved** rather than as recorded debt, because the ruling that put it out of scope is longer than the finding, and `/_not-found` quietly keeps emitting the deployment host into the next deploy-host change | `reports/audit.md`, `reports/release.md` or `STATUS.md` records F2 as fixed, resolved, not-a-defect or out of scope **without** the four trigger conditions of §7.8 item 5 beside it, **or omits it from § Carried to later gates**. This is R14's shape on a second finding: out of scope for *this* spec is not the same claim as closed, and the two read identically in a one-word status column |
| **R17** | *(added at the G6 run-1 triage)* Someone widens `__tests__/metadata-image-host.test.ts`'s case-1 domain to the class §7.8 item 3 names, sees it go red on `/_not-found`, and closes the red by narrowing the domain back — re-creating the enumerated convention that hid the defect, now with a documented reason | Any diff that adds an exclusion, an allow-list entry or a `/_not-found` special case to that guard. `AGENTS.md` §5: correct the clause to express what it was reaching for, never by narrowing the domain back to the members that happened to pass. Guard and remedy widen in the same spec or neither does (§7.8 item 4) |
