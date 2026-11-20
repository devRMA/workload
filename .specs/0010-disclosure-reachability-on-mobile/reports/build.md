# 0010 — build report (G5, frontend-dev)

> Owner: frontend-dev · Run: 1

## T1 / T1a — the reachability guards, red run, re-taken under `0003`'s footer growth

**Isolated copy.** `rsync -a --exclude node_modules --exclude .next`, `cp -al node_modules`,
`rm -rf .next` (none existed), port **3419** confirmed free with `ss -ltnp` before the run,
`uptime` load 4.60/5.37/6.17 on 16 cores. `PORT=3419 pnpm exec playwright test
tests/e2e/first-screen-reachability.spec.ts --project=chromium --reporter=list`, webServer env
`NEXT_PUBLIC_GA_ID=G-TEST12345 NEXT_PUBLIC_ENABLE_ADS=true
NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000` (from `playwright.config.ts`, unchanged).

```
36 failed, 2 skipped, 19 passed (24.0s)
```

- **AC1 / R** — **16/16 red**, as intended. Example: `the table citation is reachable at / empty dark`
  fails clause 1, `citationRect.bottom` **2848.95** > 844 (was **2727.2**-referencing docTop under the
  pre-`0003` tree; the citation paragraph is now the multi-link `F-1` paragraph and is far taller and
  lower in the footer).
- **AC13 / O** — **16/16 red**, unchanged in kind from T1's original run (the answer's line count and
  occlusion still fail against the fixed chrome; not re-derived here because AC13 is unaffected by
  which paragraph DS1 P4 is — it counts the **answer panel's own** lines, not the footer's).
- **LR4.2a** — **4/4 red**, clause 3 (the surface and all three first-level controls intersect fixed
  chrome), same mechanism T1 predicted: the banner is still `fixed` and overlaps the route nav.
  Both `LR4.4 clause 2` tests at 390 **pass** (areas equal); both at 1440 are **`fixme`**, carrying
  **F2c** in the title, per T1's own instruction — **2 skipped**, matches.
- **LR3.5 — NEW FINDING, not a pass to trust.** All **17** LR3.5 tests (16 sweep cells + the
  full-journey `/` case) came back **green**. Per T1's own rule ("if any of the four describes passes
  on the unfixed head, stop and report it to `tech-lead`: it means the assertion does not
  discriminate"), **this is reported, not accepted, and T1a is not marked done.** See the finding
  below.

## NEW — the LR3.5 guard no longer measures DS1 P4's surface; it measures one `<a>` inside it

- **Where:** `tests/e2e/first-screen-reachability.spec.ts`, `surfaceClearsFixedChromeAtSomeScroll`
  (the leaf-finding `page.evaluate`, using the exact algorithm T1 specified and T1a left untouched),
  fed by `LR35_SURFACE_MARKERS["/"]["DS1 P4"]` / `["/custo-da-hora"]["DS1 P4"]`, which **T1a step 2**
  repointed at `CURRENT_LEGAL_YEAR.sources.rgpsBrackets[0].norm`.
- **What is wrong.** The leaf search is *"the first element, in document order, whose own
  `textContent` contains the marker and whose children's `textContent` do not."* Under the **old**
  footer, the marker (`"Tabelas de INSS e IRRF de"`) was a substring of the **paragraph's** aggregate
  text but **not** of its one `<a>`'s text, so the leaf resolved to the whole `<p>` — a ~34.8 px,
  one-line surface. Under **`0003`'s F-1** the marker T1a chose is the **`<a>`'s own accessible
  name**, so the same search now finds — correctly, per its own definition — the smallest element
  containing it with no smaller-still match: the `<a>` itself. Measured directly (isolated copy,
  port 3419, `node probe-lr35.mjs`, script pasted below):

  ```
  ### /              docTop 2727.2  h 34.4  maxScroll 2491  scrollYRangeThatClearsChrome [2407.6, 2491]  feasible: true
  ### /custo-da-hora  docTop 2269.6  h 34.4  maxScroll 2033  scrollYRangeThatClearsChrome [1950, 2033]    feasible: true
  ```

  That is the **first anchor link's** box (34.4 px tall, positioned near the **top** of the seven-line
  `F-1` paragraph), not the paragraph's box — `citationParagraph(page)` (used correctly by the AC1 and
  AC13 describes) measures the real surface at **2848.95** on `/` empty, over **120 px** taller and
  lower. The LR3.5 sweep is discriminating against the wrong element: it is silently exempt from the
  very defect it exists to catch.
- **Why this is not this developer's call to fix.** T1a's own text says the `<p>` (not any one `<a>`
  inside it) is "the paragraph" for `citationParagraph`'s purposes, and picks
  `sources.rgpsBrackets[0].norm` **only** because it is the unique accessible name for **locating** the
  `<p>` through `filter({ has })` — a mechanism that does not have this failure mode, because
  `filter({ has })` matches the **ancestor**, never the descendant it searches for. `LR35_SURFACE_MARKERS`
  feeds a **different**, independently-implemented leaf search that has no such ancestor-widening step.
  Whether DS1 P4's LR3.5 surface should be re-derived through `citationParagraph(page)` instead of a
  bespoke marker+leaf search, or whether the leaf search itself should climb to the nearest `<p>`
  ancestor, is a guard-design decision this spec's plan did not make and this developer is not making
  by picking one silently.
- **What correct looks like, stated as a question, not an answer:** the LR3.5 surface for DS1 P4 must
  resolve to the same element `citationParagraph(page)` resolves to (or to whatever element
  `product-designer`'s upcoming M-R re-measurement (A1.2) calls "the surface"), so that LR3.5's DS1 P4
  row and AC1/AC13's DS1 P4 row are never two different boxes with the same name.

**Every other marker checked clean.** `DS1 P1`/`P2`/`P3` (unchanged prose, still the full-paragraph
leaf), `DS2` (`"Súmula 172"`, unique in the full-journey caption, resolves to the caption `<p>`, no
nested `<a>`), `DS7 art. 59` / `DS7 art. 71` (`lib/compliance.ts` titles, no nested elements) — none of
these have a marker that is also a descendant's own full text, so none of them has this failure mode.
It is specific to DS1 P4, and specific to this task's re-pointing of that one marker onto an `<a>`'s
name.

## Noted, not mine — a flaky test outside this spec's file list

`pnpm test` failed once on `__tests__/salary-calculator.test.tsx > … reaches the Ano disclosure from
the keyboard, not only the pointer` (radio not checked), then passed on an immediate re-run, and
passes every time run alone. `git status --short` shows both `__tests__/salary-calculator.test.tsx`
and `components/molecules/period-selector.tsx` **modified, not by this spec** (neither is in T1–T8's
file list; `0003`'s `plan.md` T7 opens `period-selector.tsx`). Order-dependent flake in a sibling's
in-flight file, not a regression this build introduced — recorded so it is not read as one.

## State

- **T1 (guards written, red run seen): done**, red run pasted above, re-taken per A1.4.
- **T1a (re-point the two stale bindings, clear the lint failure): NOT done.** `pnpm typecheck` is
  clean tree-wide, `pnpm lint` returns exactly the two failures A1.5 named (both pre-existing, both
  routed to their owners — `column-stability.spec.ts` to `0008`, and — new since A1.5 was written —
  `calculator-views.tsx` / `calculator-views.test.tsx` format-only findings that are `0003`'s own
  in-flight files, confirmed by `git status --short`, not touched here). **But T1a's own *Done when*
  ("the guards still discriminate … if AC1 goes green here, stop and report") is not met**, because
  LR3.5 — one of "the four describes" the same rule governs — is green for the reason above. Routed
  to `tech-lead` in `STATUS.md` blockers.

## T1b (`plan.md` §3B Amendment 2) — the climb to the block-level surface, and A2.3's re-taken baseline

Applied exactly per §3B: `surfaceClearsFixedChromeAtSomeScroll` now climbs from the matched leaf
through `parentElement` to the first ancestor-or-self whose `display` is neither `contents` nor
`inline*`, returns `matchesExpectedSurface` / `surfaceDisplay` / `surfaceHeight` / `leafTag` /
`leafHeight` / `docTop` / `maxScroll` / `scrollNeededToClear` alongside `found`, and the three LR3.5
`test` bodies now call it with `citationParagraph(page).elementHandle()` as the expected surface for
`"DS1 P4"` and assert **V1 (identity)**, **V2 (non-degeneracy)**, then **V3 (the sweep)**, in that
order, each its own `expect` with a `guard defect:`-prefixed message for V1/V2. No other file edited —
`tests/e2e/support/reachability.ts` untouched, as A2.0 requires. `pnpm typecheck` clean tree-wide;
`pnpm lint .` returns the same two pre-existing failures as A1.5 (`tests/e2e/column-stability.spec.ts`,
`0008`'s) plus one foreign, untracked, in-flight file (`__tests__/zzz-debug.test.tsx`, not in this
spec's file list, not touched — see `STATUS.md` blockers for the full accounting).

**Isolated copy, re-taken per A2.3.** `rsync -a --exclude node_modules --exclude .next`,
`cp -al node_modules`, fresh `.next` via the webServer's own `pnpm build`. Port **3421** confirmed
free with `ss -ltnp` before the run, `uptime` 24.57/13.55/7.89 on 16 cores (climbing — several sibling
builds active concurrently, none listening on 3421). Production build only, via
`playwright.config.ts`'s own `webServer` (`next build && next start`), never `next dev`.

```
$ PORT=3421 pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts --project=chromium --reporter=line
36 failed, 2 skipped, 19 passed (38.2s)
```

Same shape as the A1.4 run: **AC1 16/16 red, AC13 16/16 red, LR4.2a 4/4 red,
LR4.4-clause-2@390 2/2 green, F2c@1440 2/2 `fixme`** — and **all 17 LR3.5 tests still green, with no
`guard defect:` failure anywhere** (so V1 and V2 held for every one of the seven surfaces in every
cell; only V3, the actual clearance sweep, stayed trivially satisfied). This is **stop condition (b)**
of `plan.md` §3B A2.3, not condition (a): *"DS1 P4 still green after the climb… Stop. Edit no source
file. Report to `tech-lead`."*

## T1c (`plan.md` §3C Amendment 3) — closed-form clearing ranges, calibrated before any browser

`clearingScrollRanges` added to `tests/e2e/support/reachability.ts` exactly per A3.1; the sample loop,
`LR35_SAMPLE_COUNT` and `sampledCount` are deleted, never touched by `answerPanelLines`,
`citationParagraph`, `fixedBoxes`, `intersects` or `EXPECTED_LR35_SURFACE_COUNT`, which keep their
current bodies to the character.

**A3.2 calibration, seen red before any browser ran** —
`pnpm exec vitest run __tests__/lr35-clearing-ranges.test.ts --reporter=verbose`:

```
✓ DS2 clears at 1688.9 .. 2337.8
✓ DS7 art. 59 clears at 1881.9 .. 2456.9
✓ DS7 art. 71 clears at 1981.9 .. 2490
✓ DS1 P1 clears at 2254.1 .. 2490
✓ DS1 P2 clears at 2314.3 .. 2490
✓ DS1 P3 clears at 2461.4 .. 2490
✓ DS1 P4 has no clearing range — the empty set legal.md prints as 2504.2 .. 2490, empty
✓ C1 — the containment conjunct is what makes DS1 P4 red
✓ C2 — the fixed-chrome conjunct is what bounds DS1 P3's range
✓ C3 — horizontal disjointness is respected
✓ C4 — the sample loop would have missed DS1 P3's window

Test Files  1 passed (1)
     Tests  11 passed (11)
```

**DS1 P4 and C1, side by side — the red/green pair A3.2 requires as evidence.** Same inputs
(`docTop 3235.4`, `height 34.8`, `left 16`, `right 374`, `maxScroll 2490`, `fixed` = header
`{0,65,0,390}` + nav `{766,828,0,390}`), one field toggled:

| | `viewportHeight` | `clearingScrollRanges` result |
|---|---|---|
| **DS1 P4 (red)** | `844` | `[]` — empty, matches `legal.md` §8.1's own `2504.2 .. 2490 — empty` |
| **C1 (control)** | `Number.POSITIVE_INFINITY` | `[{ from: 0, to: 2407.4 }]` — non-empty, `from` exactly `0` |

Toggling only the containment operand turns the red row green, which is the arithmetic proof that
the containment conjunct — not the fixed-chrome one — is what made DS1 P4 fail; C2/C3/C4 (also green
above) are the matching proofs for the other operand and for the deleted sample loop.

`pnpm typecheck` clean tree-wide; `pnpm exec biome check .` — **fully clean, 151 files, 0
errors/warnings** (both pre-existing failures A1.5 named are gone: `__tests__/zzz-debug.test.tsx` was
removed by `0003`'s developer, `tests/e2e/column-stability.spec.ts` was fixed by `0008`'s — neither
touched here). `pnpm exec vitest run` — **62 files, 620 tests, all green** (the single-run
`salary-calculator.test.tsx` flake noted earlier did not reproduce this run either; still not this
spec's file).

## A3.3 — the two-copy run, and a number that disagrees with `design.md` §17.17 before I could reconcile it

**B1/B2.** One `rsync -a --exclude node_modules --exclude .next` of the worktree into `copyA`, then
`copyA` rsynced into `copyB` (never from the worktree). `cp -al node_modules` into each. In `copyA`
only, reverted exactly T3's two hunks in `components/organisms/calculator-views.tsx`:

```
- className="pt-[calc(var(--header-height)+var(--spacing)*4)] sm:pt-[calc(var(--header-height)+var(--spacing)*8)] pb-16 px-4 sm:px-6 lg:px-8 outline-none"
+ className="pt-[calc(var(--header-height)+var(--spacing)*8)] pb-16 px-4 sm:px-6 lg:px-8 outline-none"
- <footer className="mx-auto mt-12 mb-8 max-w-3xl space-y-2 text-center text-caption text-ink-subtle text-pretty">
+ <footer className="mx-auto mt-12 max-w-3xl space-y-2 text-center text-caption text-ink-subtle text-pretty">
```

`git diff -- components/organisms/calculator-views.tsx` shows exactly these two hunks changed
between `copyA` and `copyB`. `0003`'s footer rewrite and T2 are untouched in both copies (they are
already the same bytes in both, rsynced from the same snapshot).

**B3.** Ports 3422 (`copyA`) and 3423 (`copyB`) confirmed free with `ss -ltnp`; `uptime` 14.19 on 16
cores; `pgrep`/`ps aux` showed no other browser measurement in flight before each run; production
build only (`playwright.config.ts`'s own `pnpm build && pnpm start`), never `next dev`; runs taken
serially, `copyA` fully torn down (server killed, port confirmed stopped) before `copyB` started.

```
$ PORT=3422 pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts --project=chromium --reporter=line   # copyA — "unfixed head, 0003 T2 in, this spec's T3 out"
36 failed, 2 skipped, 19 passed (35.4s)

$ PORT=3423 pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts --project=chromium --reporter=line   # copyB — "as delivered, this spec's baseline"
36 failed, 2 skipped, 19 passed (41.1s)
```

Identical failure sets in both: **AC1 16/16, AC13 16/16, LR4.2a 4/4** (all pre-existing, all expected
red until T5/T6). **Zero `guard defect:` failures in either run — all 17 LR3.5 tests green in both
copies, including with T3's remedy reverted.**

**B4 — per-surface diagnostics, both copies, both routes**, pulled with a one-off probe that reuses
`clearingScrollRanges` verbatim (empty storage, dark theme, consent pending, route "/", "/custo-da-hora"):

| Copy | Route | Surface | tag | h | leaf | docTop | viewport | maxScroll | containment | ranges | found |
|---|---|---|---|---|---|---|---|---|---|---|---|
| A (T3 out) | `/` | DS1 P1 | p | 52.2 | p/52.2 | 2557.9 | 844 | 2299.0 | `[1766.1, 2299]` | `[1844.1, 2299]` | true |
| A | `/` | DS1 P2 | p | 52.2 | p/52.2 | 2650.1 | 844 | 2331.0 | `[1858.3, 2331]` | `[1936.3, 2331]` | true |
| A | `/` | DS1 P3 | p | 139.1 | p/139.1 | 2710.3 | 844 | 2331.0 | `[2005.4, 2331]` | `[2083.4, 2331]` | true |
| A | `/` | **DS1 P4** | p | 121.7 | a/34.4 | 2857.4 | 844 | 2331.0 | `[2135.1, 2331]` | `[2213.1, 2331]` | **true** |
| A | `/custo-da-hora` | DS1 P4 | p | 121.7 | a/34.4 | 2290.6 | 844 | 1764.0 | `[1568.3, 1764]` | `[1646.3, 1764]` | true |
| B (as delivered) | `/` | DS1 P1 | p | 52.2 | p/52.2 | 2541.9 | 844 | 2315.0 | `[1750.1, 2315]` | `[1828.1, 2315]` | true |
| B | `/` | DS1 P2 | p | 52.2 | p/52.2 | 2634.1 | 844 | 2347.0 | `[1842.3, 2347]` | `[1920.3, 2347]` | true |
| B | `/` | DS1 P3 | p | 139.1 | p/139.1 | 2694.3 | 844 | 2347.0 | `[1989.4, 2347]` | `[2067.4, 2347]` | true |
| B | `/` | **DS1 P4** | p | 121.7 | a/34.4 | 2841.4 | 844 | 2347.0 | `[2119.1, 2347]` | `[2197.1, 2347]` | **true** |
| B | `/custo-da-hora` | DS1 P4 | p | 121.7 | a/34.4 | 2274.6 | 844 | 1780.0 | `[1552.3, 1780]` | `[1630.3, 1780]` | true |

`/custo-da-hora` DS1 P1–P3 (both copies) and the full `fixed` list per cell (header `0..65`, nav
`766..828`/`w 308.1`, shield `784..828`/`w 44` — the shield renders because the probe reads geometry
before `BANNER_DELAY_MS` elapses, not after T5) are in the raw probe JSON, omitted here for length —
available on request. **Every surface, every route, both copies: `found: true`, zero `guard defect:`
failures, `docTop`/`h` for DS1 P4 identical between the two copies to the tenth of a pixel.**

**This is the shape `plan.md` §3A A3.3 calls verdict (c) — but I am not certifying it as (c), and here
is why, found before I wrote it up.** `design.md` §17.17 pins seven file hashes for the state its own
M-R re-measurement read the DS1 P4 geometry in, and reads `docTop 2841.4`, `h 121.7` — identical to my
`copyB` row above — but `maxScroll` **2215**, not **2347**, an unattributed 132 px gap the document
explicitly leaves for `tech-lead` to reconcile **"before the run rather than after"**, because
**branch (c) turns on the sign of exactly this quantity**.

I ran `sha256sum` on the same seven files, in the real worktree, before touching anything for A3.3:

```
components/organisms/calculator-views.tsx   104c06ab36bf20c5390e0a1cac9081b2ff950ad1f7ca50d1246cd33b574ad3ef  (matches §17.0)
components/organisms/hero-panel.tsx         956a0e7b5cb5a958d645262de24293cf5b13e86467c20ecfaf4c04e8cfbb7c29  (matches)
components/organisms/cookie-consent.tsx     89be99dd1954bfc543565cf82cd80bf32ffa63fe92a3683b9e9455255dc2fe1a  (matches)
components/templates/calculator-layout.tsx  efd3ba5c969e8b669a5ae49a366121969887fedc5942a519ac1000019bbb6971  (matches)
components/organisms/day-summary.tsx        ed924c4f76b716ff4c906e41545f83d4b5a695f66138994822b1de6fe5b3849a  (matches)
lib/legal-tables.ts                         c4a1045fc116e462c2bdd51c4f12a5f6f30c1cc07839b5872164d00b3299cd74  (matches)
app/globals.css                             1f715efcebc3f87fffbd01acc4c8a65b113a17b2c24a9c680a0c75e25b635caf  (matches)
```

**All seven bit-identical.** So the gap is not `0003` (or anyone) having moved the footer, the hero,
the consent surface, the layout, day-summary, the legal tables, or the stylesheet between the two
measurements — those are the files most likely to move `docTop`/`h`, and they didn't, which is
consistent with `docTop`/`h` matching exactly. `maxScroll = scrollHeight − innerHeight` reads the
**whole document**, though, and I have **not** hashed every file that can move it (`app/layout.tsx`,
`work-calculator.tsx`, `journey-form.tsx`, `app-header.tsx`, `ad-manager.tsx`,
`analytics-wrapper.tsx` are not in §17.0's pinned list). **One methodological difference I can name
and did not control for:** this B4 probe reads geometry immediately after `page.goto({ waitUntil:
"load" })`, with no `waitForStableBoundingBox`-equivalent settle — visible in the `fixed` list above,
where the privacy shield renders (meaning the probe ran before `BANNER_DELAY_MS` fired), which the
real assertions in this same test file do not exhibit because `citationParagraph`'s visibility check
runs first and gives the page more time to settle. I do not know whether that accounts for 132 px of
`scrollHeight`, and I am not guessing rather than measuring it (`AGENTS.md` §5, lesson **050**).

**Two things this run answers, read while `STATUS.md` was mid-edit under me: `legal.md` Addendum B
(G2 run 3) already ruled F1 discharged on `maxScroll 2215`, leaving two clauses open — D-3 (DS2 and
DS7 art. 59/71 on `/` "not re-swept", owed at T1c/G6, W14) and D-5, the attribution ("T3 may not be
recorded as F1's remedy until A3.3's `copyA` runs").**

**D-5 — the attribution.** `copyA` (T3's two hunks reverted, `0003`'s footer rewrite left in) now
exists: DS1 P4 is `found: true` there too, window `[2213.1, 2331]`, 117.9 px. **D-5 is therefore
answerable, not still open: `0003`'s footer growth alone discharges F1 for DS1 P4, independent of
T3.** T3 is not shown to be F1's remedy by this run — it may still matter elsewhere (the original
A1.7 finding was about DS1 P3 in the consent-answered state once M-O relocates the banner into flow,
which this run does not touch, T5 not being in either copy), but that is a different claim from "T3
discharges F1," and this run does not support the latter.

**D-3 — DS2 and DS7 art. 59/71 on `/`.** `design.md` §17 measured only the DS1 P1–P4 matrix; the
existing full-journey test in this spec's own suite already sweeps DS2 and both DS7 markers with the
same `lr35Surface`/`clearingScrollRanges` implementation, and it passed with zero `guard defect:`
failures in both copies (`[chromium] › … sweeps every surface across a full journey on / …`, test
49/57, not in either copy's failure list). Pulled the actual ranges with the same probe technique,
full-journey seed, both copies, empty consent:

| Copy | Surface | h | docTop | maxScroll | range | found |
|---|---|---|---|---|---|---|
| A (T3 out) | DS2 | 87.0 | 2466.9 | 2829 | `[1787.9, 2401.9]` | true |
| A | DS7 art. 59 | 126.0 | 2620.9 | 2829 | `[1980.9, 2555.9]` | true |
| A | DS7 art. 71 | 42.0 | 2804.9 | 2829 | `[2080.9, 2739.9]` | true |
| B (as delivered) | DS2 | 87.0 | 2450.9 | 2845 | `[1771.9, 2385.9]` | true |
| B | DS7 art. 59 | 126.0 | 2604.9 | 2845 | `[1964.9, 2539.9]` | true |
| B | DS7 art. 71 | 42.0 | 2788.9 | 2845 | `[2064.9, 2723.9]` | true |

**D-3 is discharged too, on the same two copies, with the same instrument** — the re-sweep W14 asked
for, both surfaces, non-empty in both the T3-in and T3-out state.

## A4.3's reconciliation cell, run — the 132 px is now fully attributed, and the stop condition fires anyway

Read `plan.md` §3D A4.3 only after the runs above were already taken. It names one **reconciliation
cell** — `/`, 390×844, storage `empty`, consent pending, dark — and a hard rule: reproduce `maxScroll`
**2215** there, or the discrepancy stays unattributed, **no branch is credited, and T1c stops and
reports to `tech-lead`.**

**`copyB` in exactly that cell, with the fields A4.3's amended B4 asks for**
(`scrollHeight`, `viewportHeight` printed unfused, `maxScroll == scrollHeight − viewportHeight`
verified, `tailBelowSurface`, and the tail's own boxes):

| Field | `/` | `/custo-da-hora` |
|---|---|---|
| `docTop` | 2841.4 | 2274.6 |
| `surfaceHeight` | 121.7 | 121.7 |
| `scrollHeight` | **3191** | 2624 |
| `viewportHeight` | **844** | 844 |
| `maxScroll` (`= scrollHeight − viewportHeight`, verified) | **2347** | 1780 |
| `tailBelowSurface` (`scrollHeight − (docTop + surfaceHeight)`) | 227.9 | 227.7 |
| footer computed `margin-bottom` | 32px | 32px |
| footer `getBoundingClientRect().bottom` (doc-relative) | 2963.1 | 2396.3 |
| `#main-content` computed `padding-bottom` | 64px | 64px |
| `#main-content` `getBoundingClientRect().bottom` (doc-relative) | **3059.1** | — |
| consent surface (banner) | not mounted (`BANNER_DELAY_MS` had not elapsed — measured 192 ms after load, confirmed by a direct DOM check for its `<h2>`) | — |

**`viewportHeight` is 844 in both readings — H1 (the viewport differs) is refuted.** The entire 132 px
is in `scrollHeight`, confirming **H2**, and `#main-content`'s own bottom (`3059.1`) is design.md
§17.17's implied `scrollHeight` (`2215 + 844 = 3059`) to 0.1 px. **The tail is fully attributed, not
just narrowed:** `app/layout.tsx` renders `<AdManager />` as a sibling **after** `{children}` (so
after `#main-content`) and before `<CookieConsent />`; with `NEXT_PUBLIC_ENABLE_ADS === "true"` it
renders `<div className="mx-auto w-full max-w-3xl px-4 pb-8"><GoogleAd slot="footer_slot" /></div>`,
and `GoogleAd`'s root carries `min-h-25` (100 px) inside a wrapper with `pb-8` (32 px) —
**100 + 32 = 132.0 px, exactly the gap**. Verified with a third, fresh isolated copy
(`rsync -a --exclude node_modules --exclude .next` off `copyB`, `cp -al node_modules`, `rm -rf .next`,
port **3424** confirmed free): `NEXT_PUBLIC_GA_ID=G-TEST12345 next build` with
**`NEXT_PUBLIC_ENABLE_ADS` unset** (Next.js inlines `NEXT_PUBLIC_*` at build time, so this had to be a
fresh build, not a `next start` with a different env), then the same reconciliation-cell probe:
`scrollHeight` **3059** (integer-exact, was 3191), `maxScroll` **2215** (integer-exact) on `/`, and
`scrollHeight` **2492** / `maxScroll` **1648** on `/custo-da-hora` — **`design.md` §17.17's number
reproduced exactly by toggling the one env var and nothing else.** `docTop`/`surfaceHeight` unchanged
(2841.4/121.7), confirming the toggle touched only the tail. **`playwright.config.ts`'s own
`webServer.env` hardcodes `NEXT_PUBLIC_ENABLE_ADS: "true"`** (`playwright.config.ts:66`, unconditional,
not read from a `.env` file) — every real run of this spec's own e2e suite, including CI, renders the ad slot;
`design.md` §17.0's quoted build command (`pnpm build` / `pnpm start -p 3920`, no env vars shown) did
not set it, so its session measured the page **without** the block this repo's own committed test
config always includes.

**Per A4.3's own rule, this is still the stop condition, not a resolution I get to apply myself: the
reconciliation cell did not read 2215, so the discrepancy is *reported attributed*, but the branch is
*not credited* by me.** I fully believe the attribution above — it is reproduced to 0.1 px by toggling
one env var, and the CI-config fact is verifiable in `playwright.config.ts` by anyone — but A4.3
explicitly reserves *which of A3.3's branches this cell selects* for `tech-lead`, precisely because
two agents (`labor-law-analyst` and this developer) are working the same geometry and neither closes
the other's question. Handing over: **root cause is `NEXT_PUBLIC_ENABLE_ADS`, this spec's own
committed e2e config always sets it `true`, and every number this report and `reports/build.md`'s
earlier A3.3 tables already pasted (`2331`/`2347`/`1764`/`1780`) was taken under that config, matching
how the shipped guard actually runs.** All raw probe JSON (this cell, both routes, the env-toggled
control run) is in the scratch workspace and pasted in full on request.

## Two settle points, both copies, `/` — stability confirmed, and one new finding surfaced by looking

Per the "Next agents" note asking for `scrollHeight`/`viewportHeight`/`maxScroll` unfused **at two
settle points**, both copies, with `copyA`'s own window measured directly rather than derived by
subtraction:

| Copy | Settle point | elapsed | `scrollHeight` | `viewportHeight` | `maxScroll` | ad slot height | consent surface |
|---|---|---|---|---|---|---|---|
| A (T3 out) | early | 253 ms | 3175 | 844 | **2331** | 100 | not mounted |
| A | late | 2262 ms | 3465 | 844 | 2621 | **390** | fixed, h 466 |
| B (as delivered) | early | 240 ms | 3191 | 844 | **2347** | 100 | not mounted |
| B | late | 2256 ms | 3481 | 844 | 2637 | **390** | fixed, h 466 |

**The early reading is the stable, reproducible one — four independent page loads across three
separate probe scripts (this session's T1b probe, the B4 probe, the A4.3-cell probe, and this one)
all read `2347` on `copyB`'s `/` at ~200–250 ms.** The late reading moves for a reason that has
nothing to do with F1, T3, or `0003`: the AdSense `<ins class="adsbygoogle">` grows from its CSS
`min-h-25` (100 px) to **390 px** roughly two seconds after load, in both copies identically
(`scrollHeight`'s +290 px between early and late matches the ad slot's +290 px exactly; `footerBottom`
and `mainBottom` are unchanged between the two settle points in both copies, so none of it is layout
this spec touches). The consent surface mounts by the late point too (`fixed`, height 466, as
expected) and contributes **zero** to `scrollHeight` either way — confirmed by the same identical
`footerBottom`/`mainBottom` — consistent with `design.md` §9's "nothing below it moves" argument.

**Not chased further, flagged instead.** A 100 → 390 px resize of a real ad creative implies this
sandbox has outbound network access to `pagead2.googlesyndication.com`; a network-isolated CI runner
would very likely keep the slot at its CSS floor (100 px) indefinitely, since `adsbygoogle.js`
(fetched by `AdManager`'s own `useEffect`, `components/organisms/ad-manager.tsx:14-18`) would fail to
load. That would make `scrollHeight`/`maxScroll` **environment-dependent** for any cell measured after
ads settle — a nondeterminism source distinct from anything this spec's plan names, and one this
developer is not scoped to resolve. It does not change T1c's own numbers: the actual e2e assertions in
`first-screen-reachability.spec.ts` read geometry promptly after `citationParagraph` becomes visible
(well inside the ~250 ms early window, never near the ~2 s the ad takes to grow), so every `found`
verdict this report and the actual test runs report is the **early** number, unaffected by this. Named
here because `AGENTS.md` §5 asks that an instrument's behavior be reported once noticed, not folded
silently into "matches on retry."

**Diagnostics A2.3(b) asks for**, pulled with a one-off Node probe in the same isolated copy against
the same running server (port 3421), reusing `surfaceClearsFixedChromeAtSomeScroll`'s algorithm
verbatim (no product file touched, this probe ships nowhere and is not part of the diff):

| Route | `citationParagraph` `boundingBox()` | resolved tag | `surfaceHeight` | leaf tag / `leafHeight` | `docTop` | `maxScroll` | `scrollNeededToClear` |
|---|---|---|---|---|---|---|---|
| `/` | `{x:16, y:2841.39, w:358, h:121.73}` | `p` | 121.7 | `a` / 34.4 | 2841.4 | 2347 | **0** |
| `/custo-da-hora` | `{x:16, y:2274.56, w:358, h:121.73}` | `p` | 121.7 | `a` / 34.4 | 2274.6 | 1780 | **0** |

The resolved surface is `citationParagraph`'s own node (V1), is block-level with height ≥ the leaf's
(V2), and clears every fixed element at the **first sampled scroll position, `scrollY = 0`** — before
the sweep ever reaches the range where the surface is actually brought into view. Contrast with the
`probe-lr35.mjs` numbers pasted above for the same `<a>` leaf under T1a alone
(`scrollYRangeThatClearsChrome [2407.6, 2491]` on `/`, `[1950, 2033]` on `/custo-da-hora`, both
reported `feasible: true`, **not including 0**): that earlier, ad hoc probe evidently used a stricter
definition than the one `surfaceClearsFixedChromeAtSomeScroll` (T1's own algorithm, unmodified in its
sweep logic by T1a or T1b) implements — the shipped guard has no clause requiring the surface to be
at least partially inside the viewport at the scroll position being credited, so it is satisfied
trivially whenever `docTop` exceeds every fixed element's bottom edge, independent of route, theme,
storage state, and independent of which of the two candidate elements (`<a>` or `<p>`) is measured.
**This reproduces identically for both tags**, which is why the V1/V2 fix changed nothing about the
verdict: the element being wrong (A1's finding, now corrected) and the sweep's own early-exit-at-`scrollY=0`
property (this finding) are two different defects, and Amendment 2 only had authority over the first.
Not fixed here — a fourth guess at the predicate is exactly what `plan.md` §3B A2.3's "third bounce"
clause reserves for `tech-lead`/the human. Full detail and the STATUS.md blocker entry cross-reference
each other.

## T1d (`plan.md` §3E, T1d) — the one cell that decides the attribution: `copyA`, ads off

**No source file edited, in the worktree or in any copy, beyond A3.3 B2's two already-made `copyA`
hunks (unchanged, reused as-is).** Only `reports/build.md` is touched by this task.

**Build.** Fresh `rsync -a --exclude node_modules --exclude .next` off **`copyA`** (never off the
worktree, never off `copyB`) into a new directory; `cp -al node_modules`; `rm -rf .next`; fresh
`next build` with **`NEXT_PUBLIC_ENABLE_ADS` unset** and `NEXT_PUBLIC_GA_ID=G-TEST12345` — the same
procedure that reproduced `3059`/`2215` on `copyB` in the A4.3 control run. Port **3425** confirmed
free with `ss -ltnp`; `uptime` load 23.45/12.87/14.27 on 16 cores; no other browser measurement in
flight (`ps aux` checked before start). Same probe script as the A4.3 reconciliation cell, same
`clearingScrollRanges` import shape, unmodified logic; the field-name mismatch caught while writing
the script (`height` vs `surfaceHeight` in the local re-implementation) was fixed **before** any
number below was taken — the broken run's output was discarded, not reported.

**Reconciliation cell, `copyA`, ads off, early settle point:**

| Field | `/` | `/custo-da-hora` |
|---|---|---|
| `elapsedMs` | 558 | 656 |
| `NEXT_PUBLIC_ENABLE_ADS` (as the build saw it) | unset | unset |
| `NEXT_PUBLIC_ADSENSE_ID` (as the build saw it) | unset | unset |
| `docTop` | 2857.4 | 2290.6 |
| `surfaceTag` / `surfaceHeight` | p / 121.7 | p / 121.7 |
| `leafTag` / `leafHeight` | a / 34.4 | a / 34.4 |
| `left` / `right` | 16 / 374 | 16 / 374 |
| `scrollHeight` | **3043** | 2476 |
| `viewportHeight` | 844 | 844 |
| `maxScroll` (`= scrollHeight − viewportHeight`, verified) | **2199** | 1632 |
| ad wrapper `div` present | **false** | false |
| `ins.adsbygoogle` present | **false** | false |
| `fixed` list | header `0..65 w390`, nav `766..828 w308.1`, shield `784..828 w44` | header `0..65 w390`, nav `766..828 w308.1`, shield `784..828 w44` |
| `containmentOnly` | `[2135.1, 2199]` | `[1568.3, 1632]` |
| `ranges` | **`[]`** | **`[]`** |
| `found` | **false** | **false** |

**`copyA` ads-off DS1 P4 window on `/` is `[]` (empty), `found: false`; on `/custo-da-hora` it is `[]`
(empty), `found: false`.** Stated as measurements, not as a branch. **`2199` was read from
`document.documentElement.scrollHeight − innerHeight` inside the running page — it was never computed
as `2331 − 132`; the coincidence with that subtraction is exactly that, a coincidence to report** (the
containment bound `2135.1`/`1568.3` also matches `A5.2`'s arithmetic, `docTop + h − navTop = 2213.1` on
`/`, to the tenth — the nav's own blocked interval `(2029.4, 2213.1)` fully contains the containment
window `[2135.1, 2199]`, which is why it comes back empty rather than merely narrow).

**Sanity control (required, item 6) — `copyB`'s existing ads-off build, re-read with the same
corrected probe, not rebuilt:**

| Field | `/` | `/custo-da-hora` |
|---|---|---|
| `scrollHeight` | **3059** | 2492 |
| `maxScroll` | **2215** | 1648 |
| `ranges` | `[2197.1, 2215]` | `[1630.3, 1648]` |
| `found` | **true** | true |

**Reproduces `design.md` §17.17 and the A4.3 control run's `3059`/`2215` on `/`, integer-exact.** The
copy that produced T1d's `copyA` numbers is the same one this spec has been reading throughout; the
instrument is trusted.

`pnpm check`: unchanged from the last run in this report (nothing was edited in the worktree). All raw
probe JSON (both copies, both routes, the pre-fix broken run kept in the scratch workspace as a record
of the bug and its fix, never pasted as a finding) is available on request.

**Not decided here.** `frontend-dev` does not credit branch (a) or (c) — `plan.md` §3E A5.2/A5.5
reserves that for `tech-lead` (the instrument's branch) and `labor-law-analyst` (the attribution/D-5).
Handing over exactly the four numbers A5.2's table was missing: `copyA` ads-off, `/`:
`maxScroll 2199`, `found: false`; `/custo-da-hora`: `maxScroll 1632`, `found: false`.
