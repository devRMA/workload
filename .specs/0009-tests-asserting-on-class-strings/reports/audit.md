# 0009 — G6 audit (web standards)

> Owner: web-standards-auditor · Gate: `audit` · 2026-09-19

**pass**

`0009` changed seven test files and no product source. That makes this gate a **non-regression
statement**, and the statement is established by measurement rather than inferred from the diff's
shape: every bar in `AGENTS.md` §9 was re-measured in a real browser against a **built, started
production server**, in **both** themes, at **four** widths, and against a **clean-`HEAD` control
build** started beside it on a second port. Delivered tree and control return the same numbers on
every axis. No file under `app/`, `components/`, `lib/` or `hooks/` was written by this gate; no
state-changing git command was run.

The two items routed to me by name are answered with numbers, not with a reading:

- **A7** (`tests/e2e/disclosure-legibility.spec.ts:60`) now constrains a property a reader depends
  on, and its domain is measured to be the right one: the DS4 panel renders **5** `<p>`, the
  retired `p.text-caption` selector matches **3** of them. See § *A7*.
- **X-2** (the modal's scroll-chaining promise, unguarded after T4) has **no accessibility
  consequence measurable today**, and the measurement says why. It stays a coverage debt, not a
  finding. See § *X-2*.

---

## Environment

| What | Value |
|---|---|
| Artifact under review | the shared working tree as delivered, built in a session-local **isolated copy** (`rsync --exclude node_modules --exclude .next --exclude .git` + `cp -al node_modules`), per `AGENTS.md` §3 rule 6 |
| Server | `next start -p 4941` — a **production** build, never `next dev` (lesson **015**; the page does not hydrate under `next dev` in this environment) |
| Control | `git archive HEAD` into a second isolated copy, `next start -p 4942`, same runner, same session |
| Ports | 4941 and 4942, both confirmed free with `ss -ltn` before use; both stopped at the end of the gate |
| Load discipline | `pnpm exec lhci collect` was held until `/proc/loadavg[0]` fell to **6.90** (from 11.13 at gate open) |
| Routes | `/` and `/custo-da-hora` |
| Viewports | **390**, **1440**, **2560**, **3840** |
| Themes | `light` and `dark`, set as the browser context's `colorScheme` (an OS-level preference, not the in-page toggle — only this reproduces an SSR/CSR mismatch) |
| Tools | Playwright **1.63.0** · axe-core **4.12.1** via `@axe-core/playwright` · Lighthouse **12.6.1** (Chrome 153, mobile form factor, 4× CPU slowdown, 1638 kbps) · Next **16.3.5** · Node **v24.15.0** |
| Evidence | `.specs/0009-tests-asserting-on-class-strings/evidence/g6/` (screenshots, `report.json`, six LHRs + `manifest.json`). Gitignored at `.gitignore:55`; **not committed** |

**What this environment does not contain, stated so G9 knows what it owes:** `NEXT_PUBLIC_ENABLE_ADS`
is not `true` locally, so `curl / | grep -c adsbygoogle` returns **0** — the ad slot did not render in
any run here. Every CLS number below is therefore measured **without an ad**. The real ad slot, the
real fonts and the real network first exist together on the preview; that is G9's gate, not this one.

---

## Accessibility

### axe-core, per theme per viewport per route

16 scans (2 themes × 4 viewports × 2 routes), tags `wcag2a wcag2aa wcag21a wcag21aa wcag22aa
best-practice`.

| Severity | Delivered tree | Control (`HEAD`) | Bar (`AGENTS.md` §9) |
|---|---|---|---|
| critical | **0** in all 16 | **0** in all 16 | 0 — **met** |
| serious | **0** in all 16 | **0** in all 16 | 0 — **met** |
| moderate | **1** in each of the 16 — `region`, always the same node | **1**, identical | finding + recommendation |
| minor | 0 | 0 | — |

The one moderate is `region` ("All page content should be contained by landmarks"), on `.space-y-1`
at `/` and `.flex-1` at `/custo-da-hora`, identically in both themes and at all four widths. axe-core
classifies `region` under `best-practice` only — it maps to **no** WCAG 2.2 success criterion — and
the control build returns it byte-for-byte, so it is **pre-existing at `HEAD`** and not produced by
this spec or by any sibling in the tree. Recorded as finding **W-1**.

`color-contrast` is a **serious** axe rule and it returned **0** violations in every one of the 16
scans, in both themes. That is this gate's contrast sweep; see § *Contrast*.

### The privacy dialog (DS4), scanned in its open state

The default page scan cannot see a dialog. DS4 was opened and scanned separately, tags `wcag2a
wcag2aa wcag21a wcag21aa wcag22aa`, at 390 and 1440 in both themes:

| Theme | Viewport | axe violations |
|---|---|---|
| light | 390 | **0** |
| light | 1440 | **0** |
| dark | 390 | **0** |
| dark | 1440 | **0** |

### Keyboard

Full sequential walk from the top of `/`, both themes, 390 and 1440. 22 stops at 390, 22–24 at 1440.

| Check | Result |
|---|---|
| Every control reachable | yes — the walk terminates by exhausting the sequence, never by a stop that swallows Tab |
| `focus-visible` never suppressed | **0 of 22–24** stops had neither an outline nor a box-shadow. Measured as computed style at each stop, in both themes |
| Any control off-viewport while focused | **0** |
| Keyboard trap (WCAG 2.1.2) | none |
| Skip link | first stop; when focused it renders **inside** the viewport at `left=16, right=284.36, top=16`, with `outline: 2px solid`. Its at-rest geometry (`left=-1, right=0`) is the `sr-only` clip, not an off-viewport control |

**Tab order vs. visual order (WCAG 2.4.3 Focus Order).** Three stops are reached out of top-to-bottom
visual sequence, at 1440: stops 2–3 are the two nav links at `y=813` (reached before the form at
`y=158`), and stops 14→15→16 run `y=520 → y=444 → y=432` across three different columns
(`x=105 / 113 / 1268`). Neither fails 2.4.3: the criterion binds *meaning and operability*, not
geometric order, and a site-nav landmark reached before main content preserves both, as does a
column-major order over a multi-column row. Recorded as observation **W-4**, not as a violation.

**Target size (WCAG 2.2 AA, 2.5.8 Target Size (Minimum)).** Four footer targets measure 17 px high
(e.g. `Portaria Interministerial MPS/MF nº 13`, `Anexo III da Portaria nº 13/2026`). All four are
links **inline in a sentence of the legal footer**, which is the criterion's own *Inline* exception.
**Not a violation.** Measured, named and dismissed here so a later gate does not re-derive it.

### Modal focus management (DS4)

Measured in both themes at 390 and 1440, all four identical:

| Property | Value |
|---|---|
| `dialog[open]` / `:modal` | `true` / `true` — a native top-layer modal |
| `aria-modal` | `"true"` |
| Focus on open | inside the dialog, on `BUTTON` *Fechar configurações de privacidade* |
| Focus confinement | 25 Tab presses: **6** stops landed on `document.body`, **0** landed on a control behind the dialog. The body stop is Chromium's own once-per-cycle stop in a `:modal` cycle over 3 tabbable controls — it is not a leak to background content, and the next Tab re-enters the dialog. **Not a violation** |
| `Escape` | closes the dialog, restores `document.body.style.overflow` to `""`, and returns focus to the `Configurar` button that opened it |

### Live regions — `PRODUCT.md` §5 (no submit button)

Three live regions on `/`, identical in both themes:

| Region | Attributes | Content at rest |
|---|---|---|
| Day balance | `aria-live="polite" aria-atomic="true"` | `Trabalhado até agora 6h 31m` |
| Remaining | `aria-live="polite"` | `Faltam 2h 17m para o fim da jornada` |
| Suggested exit clock | `aria-live="polite"` | `17:48` |

**Does it announce on every keystroke?** Measured, not assumed: a `MutationObserver` on every
`[aria-live]` node while typing **4** characters into *Hora para Saída Almoço* at 150 ms spacing,
then 2.5 s idle. **4 keystrokes → 2 mutations**, both at the same millisecond (t=2703 ms light,
t=2629 ms dark), one per region, and **zero** further mutations during the idle window. The result
is coalesced, not per-keystroke. **Met.**

### Reduced motion

Read as **computed style in a real browser**, never as a class in the DOM, in both themes, with
`reducedMotion: 'reduce'` and with `no-preference` as the control. `matchMedia('(prefers-reduced-motion:
reduce)').matches` confirmed `true` before reading.

| Context | Elements with a live animation or transition | Hover transform changes over every `button`/`a`/`input`/`[role=switch]` |
|---|---|---|
| `reduce`, light | 295 — all of them the universal reset, `animation-duration: 1e-05s`, `transition-property: opacity, color, background-color, border-color, outline-color` | **0** |
| `reduce`, dark | 295, identical | **0** |
| `no-preference`, light | 27 — `transition-property` includes `transform` on buttons/links, `0.22s` on the theme-toggle `svg` | **0** |
| `no-preference`, dark | 27, identical | **0** |

Under `reduce`, `transform` is **absent** from the computed `transition-property` on every element
while it is present under `no-preference` — the neutraliser at `app/globals.css:303-315` wins the
cascade, measured rather than read. `AGENTS.md` §8's rule is met, and `design.md` § Motion's claim
that nothing moves is confirmed: zero hover transform deltas in any of the four contexts.

The squad's own `check-reduced-motion.mjs` could not complete here; that is a tooling finding, **W-2**.

### A7 — does the replacement still constrain a rendered property?

`tests/e2e/disclosure-legibility.spec.ts:60`'s `p.text-caption` is replaced by
`assertLr2bAcrossParagraphs(panel, DS4_EXPECTED_PARAGRAPHS, …)` (`tests/e2e/support/legibility.ts:49`),
which takes `surface.locator("p")`, asserts the count **before** iterating, and runs `assertLr2b`
over each paragraph. Measured against the running page, in both themes at 390 and 1440:

| Measurement | Value |
|---|---|
| `dialog[…] > div p` | **5** |
| `dialog[…] > div p.text-caption` | **3** |
| Paragraphs the retired selector skipped | `Cookies Essenciais`, `Telemetria (Google Analytics)` |

This independently reproduces `legal.md` F3 and `reports/qa.md` G6-E6: the retired selector narrowed
a legal domain by font size and skipped exactly the two strings that name **which purpose** each
toggle governs. The replacement reads `<p>`, an obligation-derived set, and it can no longer report
green on an empty set — `toHaveLength(5)` fails at zero.

**What it constrains, stated precisely.** Per paragraph, `assertLr2b` reads the **rendered** line
boxes (`Range.getClientRects()`) and the character count and compares characters-per-line-box against
`LR2B_MEASURE_FLOOR_CPL`. That is a rendered property, and no class rename can move it. Measured at
390 and 1440 in both themes, all five DS4 paragraphs render as **one line box each**:

| # | Paragraph | Chars | Line boxes | cpl | Computed `font-size` | `assertLr2b` verdict |
|---|---|---|---|---|---|---|
| 1 | `Cookies Essenciais` | 18 | 1 | 18.0 | 16px | exempt |
| 2 | `Necessários para o funcionamento…` | 41 | 1 | 41.0 | 12px | exempt |
| 3 | `Sempre ativo` | 12 | 1 | 12.0 | 12px | exempt |
| 4 | `Telemetria (Google Analytics)` | 29 | 1 | 29.0 | 16px | exempt |
| 5 | `Ajuda a entender como o site é u…` | 37 | 1 | 37.0 | 12px | exempt |

So on DS4 **today**, the binding clauses are the rendered count (5), LR1, LR3 and the control
geometry; the measure floor itself has no subject, because a one-line paragraph has no measure to
fail. That is LR2b's own settled exemption (`0005`/`0006`), it is **counted and reported** rather than
silent (`measured 0 + exempt 5 = 5`, the annotation `qa-engineer` recorded on all 24 cases), and it is
the correct behaviour — not a second vacuity. Recorded as observation **W-5** with the numbers, so the
first DS4 paragraph that wraps is known to be the first one the floor ever rules on.

### X-2 — does the deleted `overscroll-contain` assertion have an accessibility consequence today?

`__tests__/modal-dialog.test.tsx:96` was deleted, not substituted, and half its obligation is debt.
The question routed to me is whether that debt is measurable as a defect today. It is not, on three
measurements, all taken in both themes at 390 and 1440:

| Measurement | Result |
|---|---|
| Computed `overscroll-behavior` on the dialog's scroll wrapper | **`contain`** — the property the deleted assertion named is present in the **computed style**, which is strictly stronger evidence than the class string was |
| `window.scrollY` after 12 × 400 px of wheel over the panel, dialog open | **0**, unchanged, in all four cases (page is scrollable: `scrollHeight` 3059 at 390, 1678 at 1440) |
| `overscroll-contain` isolated from the body lock — `document.body.style.overflow` reset to `""`, then wheeled again | `scrollY` **0**; and `panel.scrollHeight > panel.clientHeight` is **`false`** at both 390 and 1440 |

The third row is the decisive one and it cuts both ways, so it is stated in full: the DS4 panel's
content **fits** at every viewport in this suite, so there is no state in which a user can reach the
panel's scroll end and chain a scroll to the page behind it. The promise cannot be broken today
because it cannot be reached today. X-2 is therefore a **test-coverage gap with no measurable
accessibility consequence**, and it stays a debt owned by this role with the trigger `STATUS.md`
already records. It is **not** a finding, and the browser form of the check is already written down
there for the spec that next opens the panel's content.

---

## Contrast

`design.md` § Accessibility intent rules that **no text-on-surface pair is created, moved or
recoloured** by this spec, and § Tokens confirms no token changes value in either theme. The table
below is therefore empty **by ruling, not by neglect**, and no ratio from `0005`/`0006` is republished
here — a contrast ratio restated without being re-measured is the caveated number lesson **050**
forbids.

| Pair introduced or changed | Theme | Ratio | AA bar | Verdict |
|---|---|---|---|---|
| — | — | — | — | **None. Zero pairs introduced or changed.** |

What was measured instead, across both themes and all four widths, is the sweep that would catch a
pair moving without anyone saying so: axe-core's `color-contrast` rule (severity **serious**, WCAG
2.2 AA **1.4.3 Contrast (Minimum)**) returned **0 violations in all 16 scans**, and the clean-`HEAD`
control returned the same. Both themes measured; neither used as a proxy for the other.

---

## Core Web Vitals

### Lighthouse against the unmodified `.lighthouserc.js`

`lhci collect` (3 runs per route, mobile, 4× CPU, 1638 kbps) then `lhci assert` — **`assert` exited
`0`**. `collect` and `assert` were run separately rather than via `autorun` so that nothing was
uploaded to `temporary-public-storage`.

| Route | Run | perf | a11y | best-practices | seo | LCP | CLS | TBT | FCP | SI | TTI |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `/` | 1 | 0.97 | 1.00 | 1.00 | 1.00 | 2640 ms | 0.0003 | 18 ms | 766 ms | 882 ms | 2966 ms |
| `/` | 2 | 0.97 | 1.00 | 1.00 | 1.00 | 2626 ms | 0.0003 | 11 ms | 755 ms | 833 ms | 2792 ms |
| `/` | 3 | 0.83 | 1.00 | 1.00 | 1.00 | 2849 ms | 0.0000 | 508 ms | 788 ms | 1510 ms | 3210 ms |
| `/custo-da-hora` | 1 | 0.97 | 1.00 | 1.00 | 1.00 | 2485 ms | 0.0000 | 105 ms | 831 ms | 831 ms | 3138 ms |
| `/custo-da-hora` | 2 | 0.96 | 1.00 | 1.00 | 1.00 | 2712 ms | 0.0000 | 84 ms | 764 ms | 764 ms | 2907 ms |
| `/custo-da-hora` | 3 | 0.89 | 1.00 | 1.00 | 1.00 | 2759 ms | 0.0000 | 301 ms | 779 ms | 1210 ms | 3075 ms |

| Budget assertion | Bar | Median `/` | Median `/custo-da-hora` | Verdict |
|---|---|---|---|---|
| `categories:performance` | ≥ 0.93 | **0.97** | **0.96** | pass |
| `categories:accessibility` | ≥ 0.98 | **1.00** | **1.00** | pass |
| `categories:best-practices` | ≥ 0.98 | **1.00** | **1.00** | pass |
| `categories:seo` | ≥ 0.98 | **1.00** | **1.00** | pass |

Run 3 of each route is the runner's own contention (TBT 508 ms and 301 ms against 11–105 ms on the
other four runs, with several sibling agents building on the same machine). The budget asserts on the
median and the median is clear of it on both routes; no metric is carried by the outlier.

**LCP attributed to its phases.** LCP is **2626–2849 ms** while `interactive` is **2792–3210 ms** —
LCP precedes TTI by 150–350 ms and is not equal to it, so this is not an LCP element gated entirely on
hydration. The LCP element is `P.numeric` — the headline result value.

### Real browser, 390 px, 4× CPU throttling, no network simulation

The lab number is a simulation; this is one reading of what a browser actually reports, via
`PerformanceObserver`, in both themes.

| Theme | Route | LCP | CLS (load) | Worst single `event` duration |
|---|---|---|---|---|
| light | `/` | 180–416 ms | 0.0003 | 32–392 ms |
| light | `/custo-da-hora` | 128–936 ms | 0.0000 | 112–160 ms |
| dark | `/` | 144–156 ms | 0.0003 | 144–248 ms |
| dark | `/custo-da-hora` | 284–448 ms | 0.0000 | 96–408 ms |

CLS was additionally decomposed with shift-source attribution, both themes, 390 and 1440, on
`/custo-da-hora`:

| Phase | 390 | 1440 | Sources |
|---|---|---|---|
| Load only (3 s after `networkidle`) | **0.0000**, 0 shifts | **0.0001**, 1 shift | `DIV.flex items-center gap-4` in the header, width 151.125 → 172.125 px — the theme-toggle row settling |
| Post-interaction (6 controls driven) | **0.0000**, 0 counted shifts | **0.0000**, 0 counted shifts | every interaction-driven shift carried `hadRecentInput=true` (6–17 of them) and is excluded from CLS by definition |

**One unreproduced reading, recorded rather than swallowed.** The first pass of the real-browser probe
reported **CLS 0.5566** on `/custo-da-hora` at 390, identically in both themes. Three subsequent
attempts — the same script re-run verbatim, and twice more with shift-source attribution at the same
pacing — returned **0.0000** with **zero** counted shifts, and all six Lighthouse runs returned
0.0000 on that route. It is recorded as observation **W-3** with the exact conditions so G9 can watch
that route at that width against the real network and the real ad slot, which is where a shift of that
size would actually have somewhere to come from.

### Ad placement — `PRODUCT.md` §8

| Check | Result |
|---|---|
| Slot renders in this environment | **no** — `NEXT_PUBLIC_ENABLE_ADS` is not `true`; `curl / \| grep -c adsbygoogle` → **0** |
| Space reserved | `components/atoms/google-ad.tsx:29` — `min-h-25 w-full overflow-hidden` on the `<ins>`, a reserved box before the network fills it |
| Position | `app/layout.tsx:65` → `ad-manager.tsx:25`, a single `footer_slot` **after** `#main-content`. Never between the user and an answer, never in the space a result renders into |
| CLS attributable to an ad slot | **none measurable here**, because no slot rendered. This check is **owed in full at G9** |

---

## SEO and metadata

Fetched from the running production server, both routes.

| Artifact | `/` | `/custo-da-hora` | Verdict |
|---|---|---|---|
| `<title>` | `Calculadora de Jornada, Horas Extras e Saldo do Dia \| WorkLoad` | `Calculadora de Valor da Hora e Salário Líquido CLT \| WorkLoad` | pass |
| `<meta name="description">` | present, pt-BR, route-specific | present, pt-BR, route-specific | pass |
| `<link rel="canonical">` | `https://workload.devrma.com` | `https://workload.devrma.com/custo-da-hora` | pass |
| Open Graph | `og:title`, `og:description`, `og:url`, `og:image` (+`:type`, `:width` 1200, `:height` 630, `:alt`) | same, route-specific | pass |
| Twitter card | `summary_large_image` + title, description, image, alt, width, height | same, route-specific | pass |
| Structured data | `@graph` with `WebApplication` (+`offers`, `inLanguage: pt-BR`, `isAccessibleForFree`) and `BreadcrumbList` (1 item) | same, `BreadcrumbList` with 2 items | pass |
| `app/robots.ts` → `/robots.txt` | `User-Agent: *` / `Allow: /` / `Sitemap: https://workload.devrma.com/sitemap.xml` | — | pass |
| `app/sitemap.ts` → `/sitemap.xml` | both routes, `lastmod` 2026-09-14, `changefreq weekly`, priority 1.0 / 0.9 | — | pass |
| `app/manifest.ts` → `/manifest.webmanifest` | name, short_name, description, `start_url /`, `display standalone`, theme/background colours, 192 + 512 icons | — | pass |
| `theme-color` | two entries, one per `prefers-color-scheme` | same | pass |
| Lighthouse `categories:seo` | 1.00 on all 3 runs | 1.00 on all 3 runs | pass |

Nothing in this spec's diff reaches a metadata source, and all ten artifacts are present and correct
after it. Note for `content-writer`, already recorded as debt **X-6**: `__tests__/layout.test.tsx:40,44`
pin `metadata.title` and `metadata.description` by exact equality, and both still match what the server
serves.

---

## Console

Captured on every page in every run — the 16 axe scans, the 8 dialog runs, the keyboard walks, the
live-region probes and the vitals probes — listening on `console` (`error` **and** `warning`) and on
`pageerror`.

| Scope | Console errors | React warnings | `pageerror` |
|---|---|---|---|
| Delivered tree, light, 390/1440/2560/3840, both routes | **0** | **0** | **0** |
| Delivered tree, **dark**, 390/1440/2560/3840, both routes | **0** | **0** | **0** |
| DS4 dialog open, both themes, 390 and 1440 | **0** | **0** | **0** |
| Control build (`HEAD`), all 16 scans | **0** | **0** | **0** |

Nothing verbatim to quote — the log is empty. The dark rows are the ones that matter: lesson **015**'s
defect (minified `React error #418` under `prefers-color-scheme: dark`) is only visible in a
**production** build read through a **dark `colorScheme` context**, which is the combination every row
above was taken in. It does not reproduce.

The build itself emits one warning, present identically in the control build and therefore
pre-existing at `HEAD`: `Failed to find font override values for font 'Atkinson Hyperlegible Next'.
Skipping generating a fallback font.` It is a build-time warning, not a console error, and it is the
same subject as debt **X-4**. Recorded as **W-6**.

---

## Layout

Per width, both themes, both routes. `overflow` is `documentElement.scrollWidth − clientWidth`;
`off-viewport` counts interactive elements whose box crosses the viewport edge; `wide` counts **any**
element extending past the right edge.

| Width | Theme | Horizontal overflow | Elements past the right edge | Controls off-viewport |
|---|---|---|---|---|
| 390 | light / dark | **0 px** | **0** | 0 (see note) |
| 1440 | light / dark | **0 px** | **0** | 0 (see note) |
| 2560 | light / dark | **0 px** | **0** | 0 (see note) |
| 3840 | light / dark | **0 px** | **0** | 0 (see note) |

Note: the sweep flags exactly one element at every width in both themes — `A.sr-only
focus:not-sr-only focus:absolute` at `left=-1, right=0`. That is the skip link's `sr-only` clip in its
**unfocused** state, which is the technique working. Measured focused, it sits at `left=16,
right=284.36, top=16` — fully inside the viewport, with a 2 px solid outline. **Not a control outside
the viewport.**

The control build returns the same four rows. `AGENTS.md` §9's bar — no horizontal overflow and no
control outside the viewport at 390, 1440, 2560, 3840 — is **met**, in both themes.

---

## Findings

None blocks this gate. All are routed to `tech-lead`; **none is this spec's** — the control build
proves each is present at clean `HEAD`, and `0009`'s diff over `app/`, `components/`, `lib/` and
`hooks/` is empty. No patch is proposed for any of them.

| # | Severity | Standard or budget | Where | Reproduction | Route |
|---|---|---|---|---|---|
| **W-1** | moderate | axe-core `region` — `best-practice` tag, maps to **no** WCAG 2.2 success criterion. `AGENTS.md` §9 bars `critical` and `serious`; this is neither | `/` → selector `.space-y-1`; `/custo-da-hora` → selector `.flex-1`. Both themes, all four widths | `next build && next start`, then `new AxeBuilder({page}).withTags([…,'best-practice']).analyze()` on either route, any viewport, either `colorScheme`. Returns 1 violation, `impact: "moderate"`, `id: "region"`, help *"All page content should be contained by landmarks"*. Identical against `git archive HEAD` | `tech-lead` — it is landmark structure, owned by whoever next opens the page shell |
| **W-2** | medium | none — squad tooling, not a product standard | `.agents/tools/check-reduced-motion.mjs:28,176` | `node .agents/tools/check-reduced-motion.mjs --base-url http://127.0.0.1:<port>` throws `locator.click: Timeout` on the default `--trigger '#projects article button'`; supplying this app's real trigger and target gets one `ok` line then throws again on the hardcoded `overlay` locator `[data-state="open"].inset-0`, which exists in **no** state of this DOM. The tool cannot complete against this application, and its candidate sweep is itself keyed on Tailwind class strings — the exact coupling this spec exists to remove. This gate's reduced-motion verdict was therefore taken from a computed-style probe written for it, not from the tool | `tech-lead` |
| **W-3** | low (unreproduced) | Core Web Vitals CLS, "good" ≤ 0.1 | `/custo-da-hora` at 390, both themes | One real-browser `PerformanceObserver` pass under 4× CPU throttling reported **CLS 0.5566**, identically in light and dark. Three re-runs (one verbatim, two with `layout-shift` source attribution and identical pacing) returned **0.0000** with zero counted shifts; six Lighthouse runs returned 0.0000. Not reproducible on this host. **Re-check this route at this width at G9**, where the ad slot and the real network exist | `tech-lead`, then G9 |
| **W-4** | info | WCAG 2.2 AA **2.4.3 Focus Order** — checked, **not violated** | `/` at 1440, both themes | Tab stops 2–3 are the nav links at `y=813`, reached before the form at `y=158`; stops 14→15→16 run `y=520 → 444 → 432` at `x=105 / 113 / 1268`. Meaning and operability are preserved in both cases (a nav landmark before main content; column-major order across one row), so 2.4.3 is met. Recorded so a later gate does not re-derive it | — |
| **W-5** | info | LR2b (`0005`/`0006`), as applied by `tests/e2e/support/legibility.ts:41-47` | DS4, both themes, 390 and 1440 | All five DS4 paragraphs render as **one line box each** (18/41/12/29/37 chars), so `assertLr2b` returns `exempt` for all five and the measure floor rules on **zero** paragraphs on that surface today. This is LR2b's own settled exemption and it is **counted**, not silent (`measured 0 + exempt 5 = 5`). Not a vacuity, and not a finding against T6/T7 — recorded with the numbers so the first DS4 paragraph that wraps is known to be the first the floor ever rules on | `tech-lead`, for the record |
| **W-6** | info | none — build-time warning | `pnpm build` | `Turbopack build encountered 1 warning: Failed to find font override values for font 'Atkinson Hyperlegible Next'. Skipping generating a fallback font.` Identical in the clean-`HEAD` control build. Same subject as debt **X-4** (*no test reads the font family that actually renders*): with no fallback metrics generated, a substitution has nothing sizing it, which is the mechanism X-4 says nothing would see | `tech-lead`, folded into X-4's trigger |

### Two things I was asked to raise and am not raising

- **The `All files` coverage movement.** Not re-raised. `qa-engineer` measured coverage per area with
  no threshold lowered and attributed the movement to `components/organisms/salary-calculator.tsx:157`,
  a file this spec does not touch (`STATUS.md` G6-E3). `0009` moves coverage by exactly zero.
- **A "wrong number" in the live region.** An early probe of mine rendered `Balanço do dia:
  +219150h 0m`. Chased to ground before writing it down: my own locator had typed `0830` into an
  unlabelled **date** field, not into *Hora para Entrada*. Re-run against the field by its accessible
  name, the rendered values are `08:00 / 12:00 / 13:00 / 17:48` and the live region reads `Trabalhado
  até agora 6h 31m`. **Probe artifact, not a product defect.** Recorded so nobody re-finds it.

---

## Verdict

**pass.** Every `AGENTS.md` §9 bar this gate owns is met and measured in both themes:

- 0 axe violations at `critical` or `serious`, in 16 page scans and 4 dialog scans — bar met.
- 0 console errors and 0 React warnings, including under a production build read through a dark
  `colorScheme` context — bar met.
- Metadata, sitemap, robots, manifest and structured data all present and correct after the change —
  bar met.
- No horizontal overflow and no control outside the viewport at 390, 1440, 2560 and 3840 — bar met.
- `lhci assert` against the unmodified `.lighthouserc.js` exits `0`; median performance 0.97 / 0.96,
  accessibility 1.00, best-practices 1.00, seo 1.00 — budget met.
- `node .agents/tools/docs-check.mjs 0009-tests-asserting-on-class-strings` → `0 falha(s), 0 aviso(s)`.

A7's replacement constrains a rendered property and is measured red-capable on the real defect; X-2's
debt has no accessibility consequence measurable today, and the measurement says why. Six findings are
routed to `tech-lead`, all six proved pre-existing at clean `HEAD` by a control build taken in the same
session on the same runner, and none of them is attributable to this diff.

**What G9 owes that this gate could not take:** the ad slot did not render here, so every CLS number
above is ad-free. `PRODUCT.md` §8's placement and shift check, and **W-3**'s re-check of
`/custo-da-hora` at 390, both land on the preview.
