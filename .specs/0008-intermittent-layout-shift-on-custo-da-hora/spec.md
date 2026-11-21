# 0008 — Intermittent layout shift on `/custo-da-hora`

> Owner: product-manager · Gate: `spec`

**Carried out of `0004` at G4.** `product-designer` measured it at `0004`'s G3 and deliberately
named no cause; `tech-lead` ruled it a separate spec and wrote five things it must measure
(`.specs/0004-lcp-render-delay/plan.md` §5, D1). This spec inherits those five, adds the
scope search they did not run, and **names no cause either** — the diagnosis is a deliverable,
not an assumption (lesson **032**).

## Problem

A returning CLT worker opens `/custo-da-hora` on their phone to answer `PRODUCT.md` §1 question 3 —
*"Quanto cai na minha conta?"*. The page paints, they start reaching for the first field, and in a
measured minority of loads the whole form column moves under their thumb before they touch it.

Measured, 390×844, dark, 4× CPU throttle, seeded returning user, on the branch-alias deployment
(`.specs/0004-lcp-render-delay/evidence/cls-early-shift.txt`, 6 loads per route):

| Route | Session CLS | Loads |
|---|---|---|
| `/` | 0.0011 | 6/6 |
| `/custo-da-hora` | 0.0481 | 5/6 |
| `/custo-da-hora` | **0.5933** | 1/6 |

The extra **0.5452** fires at **t = 367 ms** and its shift sources are, verbatim:

```
DIV.lg:col-span-7.space-y-8            prev=84,632   cur=595,249
BUTTON.flex.w-full.items-center        prev=419,95   cur=0,0
DIV.relative                           prev=563,56   cur=0,0
svg.tabler-icon.tabler-icon-briefcase  prev=394,16   cur=0,0
```

Read off the numbers rather than the summary: the form column **loses 383 px of height (632 → 249)
and simultaneously moves 511 px down the page (top 84 → 595)**, while three of its children go to
zero size. The routing brief states the height loss only; the displacement is the larger half and
any diagnosis has to explain both.

0.5452 is **five times** the 0.1 "good" threshold, and it lands on the page that answers the money
question, at the moment the user is aiming at it.

## Why now

Nothing about the *number* on screen is wrong here — `0004` G3 and G2 both measured the hero and
found it correct and bounded. What breaks is the ten-second path to the number (`PRODUCT.md` §10):
the user taps where a field was and hits something else, or loses their place and re-scans the
column. And it is intermittent, which is worse than a constant defect — it survived every gate of
`0005` and `0006` precisely because one load in six is a failure rate that a single-load check
reports as green.

The first cost of leaving it is therefore not the shift. It is that "one in six" is an observation
and not a measurement, and an intermittent defect nobody can reproduce on demand becomes folklore.

## Audience & moment

`PRODUCT.md` §1, question 3 — **"Quanto cai na minha conta?"** — read by a **returning** user, in
the 10-second first contact, on a phone, from a cold load, with their previous inputs restored from
`localStorage`. Every load in the evidence above is that user: the probe seeds `grossSalary` and
`salaryPeriod` before navigating.

Secondary: the same person on `/` answering question 1, because the container that shifted is the
**same file** on both routes (see § Scope, S1) and symmetry between the routes is a thing this spec
measures, never a thing it assumes.

## Outcome

On every load of both routes, in both storage conditions, the form column is where the user saw it
one frame ago. Stated as a rate rather than an anecdote, and measured on a fixed denominator, so
that "it does not happen any more" is a sentence someone can check.

## Scope

### The search this scope came from

Scope is produced by commands run in this session, not from the routing brief's list of nodes
(lesson **034**: a set of source files is produced by listing files, never by reading emitted
output). Commands and their full output are in § Evidence; the file list below is what they printed.

- **S1 — the shifted container is one file, shared by both routes.**
  `grep -rn "col-span" app components` returns five matches; exactly one is `lg:col-span-7`, at
  `components/templates/calculator-layout.tsx:17`. `/` and `/custo-da-hora` render the same
  component. **The two routes therefore share the shifting box and differ only in what fills it** —
  which is why `/` is measured under the identical protocol and not waved through on the strength of
  its 0.0011.
- **S2 — the subtrees that can appear, disappear or animate inside that box.**
  `grep -rln 'AlertBanner\|CollapsiblePanel\|AnimatePresence' app components` returns eight files.
  Both routes carry conditionally-rendered alerts inside the main column, not just
  `/custo-da-hora`: `journey-form.tsx` and `day-summary.tsx` on `/`, `salary-calculator.tsx` on
  `/custo-da-hora`. The asymmetry the brief assumes is not visible in the source.
- **S3 — the route files are listed from disk, not inferred.**
  `find app -name '*.tsx'` returns seven files; the two page entry points are `app/page.tsx` and
  `app/custo-da-hora/page.tsx`, and both render `CalculatorPage` → `CalculatorViews` → the same
  layout. `/custo-da-hora` inherits nothing by convention here; it has its own page module, as it
  has its own `opengraph-image.tsx` and `twitter-image.tsx`.

### In scope

1. **The measurement — a rate with a denominator.** The reproduction rate of any load-shift event
   over a **fixed n = 20 loads per cell**, reported per cell, with every event's value and every
   `layout-shift` source verbatim. Cells: `{/, /custo-da-hora}` × `{storage seeded, storage empty}`
   × `{390×844, 1024×768}` × `{branch-alias deployment, local production build}`, dark; then light
   for every cell in which the dark pass recorded at least one event. `1024` is in because
   `design.md` **I4** records it as the *narrowest* hero container in the whole range, and a
   column-collapse checked only at 390 is a column half-checked.
2. **The trigger condition, isolated.** Seeded storage versus empty, as its own axis of (1), stated
   per route as `n/20` on each side. `0004` §1 records CLS 0 in 12/12 unseeded lab runs against
   0.5933 seeded; if this event is returning-user-only, that single sentence is why six gates
   missed it.
3. **The DOM on both sides of the shift** — the `outerHTML` and the computed box of
   `DIV.lg:col-span-7`, the `BUTTON.flex.w-full`, the `DIV.relative` and the `briefcase` icon,
   sampled in the frame before and the frame after, not only the `PerformanceObserver` source list.
4. **The diagnosis** — one sentence naming the cause, earned by an experiment, with the experiment
   that would have refuted it. It is a deliverable of this spec and **it is not asserted here**.
   `product-designer` was right not to name a cause from a symptom, and so is this document.
5. **The remedy**, bounded to the files S1–S2 enumerate: `components/templates/calculator-layout.tsx`,
   `components/organisms/calculator-views.tsx`, `components/organisms/salary-calculator.tsx`,
   `components/organisms/tax-details-panel.tsx`, `components/organisms/journey-form.tsx`,
   `components/organisms/day-summary.tsx`, `components/molecules/regime-field.tsx`,
   `components/atoms/collapsible-panel.tsx`, `components/atoms/alert-banner.tsx`. A remedy that has
   to touch a file outside this list is a finding, not a licence: it goes back to `tech-lead`, who
   either widens § Scope in writing or opens the next spec.
6. **`hooks/use-salary-calculator.ts` and `hooks/use-work-calculator.ts` are in scope for the
   diagnosis** — they are the restore path item 2 isolates. A remedy may edit them **only where the
   diagnosis names them**, and then under the `hooks/**` 100% coverage bar (`AGENTS.md` §9).
7. **Whether it reaches production.** Measured, not assumed — see AC7 and § Evidence row E5.

## Out of scope

Each exclusion names **the property it protects** and **the gate that may override it**. An
exclusion with no route through it becomes an improvisation at G5; an absolute prohibition with no
named override becomes a contradiction the first time a floor demands one.

- **No change to any rendered number, and no new number.** Protects `PRODUCT.md` §4: every number on
  screen traces to a cited table, and nothing reaches the screen without G2. *Override:* only
  `labor-law-analyst` at G2 or G6, and only with the citation attached.
- **No new user-visible string and no rewording of an existing one.** Protects the falsifiability of
  AC6 — a reviewer diffs the rendered text of both routes and expects an empty set, which is only a
  claim if it can fail. *Override:* `labor-law-analyst` at G2/G6 may mandate a disclosure string, and
  `product-designer`/`web-standards-auditor` may require an accessible name for a control the remedy
  changes; either override is bounded to the string it mandates and is named in AC6's exemption list
  in the same words.
- **No visual redesign of the form column** — no change to the type ramp, color, elevation or the
  `DESIGN.md` spacing scale. Protects the attribution of the diff: every pixel that moves has to be
  a pixel the diagnosis asked for, or nobody can tell a remedy from a restyle. *Override:*
  `product-designer` at G3 may move a geometry value where the diagnosis proves the shift cannot be
  removed without it, bounded to the files § Scope item 5 lists, and recorded as a `DESIGN.md`
  decision.
- **`design.md` I7 is not raised.** `0004` G3 measured and accepted the hero numeral's resize as the
  system working — 0 px / 0.0000 on `/`, and 16.3 px / 0.0099 (`hour`), 47.6 px / 0.0481 (`month`),
  60.4 px / 0.0544 (`year`) on `/custo-da-hora` — and recorded those four numbers as a ceiling.
  Protects a settled ruling from being re-litigated by a spec that arrived later at the same page.
  **AC5 admits that displacement, but as a quantity this spec measures per cell rather than as an
  enumerated number**: the column's top is permitted to travel exactly the distance this spec's own
  two-target probe recorded for that cell on the pre-remedy build (`−47.7 px` at 390 seeded on
  `/custo-da-hora`, `design.md` §A.3), and no other distance — larger **or** smaller. I7's four
  numbers stay the ceiling and are scored separately by **AC8**, against `0004`'s own instrument.
  *Override:* none inside this spec; raising any of the four numbers is a regression and a bounce to
  `tech-lead`. Run-2 amendment (blocker **B1**): the earlier wording of this bullet named the
  exemption as "displacement … bounded at 60.4 px at 390", which AC5 cannot score cell by cell and
  which said nothing about the column's **height** — the side that made AC5 red on a build with no
  defect.
- **The deterministic 0.0481 hero event is not the defect this spec removes.** Protects the scope
  separation `tech-lead` ruled at `0004` G4 — this spec owns the intermittent 0.5452, which is not
  the hero and not on the LCP path. *Override:* if the diagnosis proves both events share one cause,
  `tech-lead` at G4 may fold the hero event in and records the ruling in `STATUS.md`.
- **LCP, FCP and the `performance` budget belong to `0004`.** Protects `0004`'s two findings from
  acquiring a third that they cannot carry, on a gate with a two-bounce ceiling. *Override:* none. A
  remedy that measurably worsens `0004`'s recorded numbers bounces to `tech-lead`.
- **Ad slots and cookie consent** (`components/organisms/ad-manager.tsx`,
  `components/atoms/google-ad.tsx`, `components/organisms/cookie-consent.tsx`) are excluded.
  Protects `PRODUCT.md` §8's reserved-slot commitment from being reopened as a side effect of a
  layout fix. *Override:* AC1's own output — a recorded shift source naming a node inside one of
  those three files pulls that file into § Scope item 5 without a bounce, and the report says which
  source did it.
- **No `localStorage` key, schema or migration change.** Protects `PRODUCT.md` §5 (offline and
  private) and the stored inputs of every existing returning user. *Override:* none inside this
  spec.
- **No new dependency.** *Override:* `tech-lead` at G4 with the written justification `AGENTS.md`
  §8 requires.
- **The `p-1.5` / `gap-1` segmented-track inset** (`period-selector.tsx:10`, `journey-form.tsx:102`,
  `calculator-views.tsx:43`), routed here from `0004` G4's D4, is **not** scoped. Protects the same
  attribution property as the visual-redesign exclusion, and it is a human approval point
  (`AGENTS.md` §4) that no measurement in this spec touches. *Override:* none here; it needs its own
  spec, and `STATUS.md` records it as carried and unscoped so it is not lost.

## Legal dependencies

No number changes, so nothing new is computed. What this change can affect is **when, where and
whether an existing legally-required string renders** — the column that shifts contains disclosures.
Each of these is named, not stated, and `labor-law-analyst` settles each at G2.

| # | The rule this relies on | Why this spec depends on it |
|---|---|---|
| L1 | The disclosure rule governing the alert strings inside the shifting column (`salary-calculator.tsx`'s three `AlertBanner`s; `journey-form.tsx` and `day-summary.tsx`'s on `/`) — the LR-series carried from `0005` and `0006` | A remedy that reserves space for, delays, relocates or server-renders an alert changes the frame in which a disclosure first appears. G2 states whether that is bounded. |
| L2 | `0004` `legal.md` LR5 — the rule about what the hero's swap may do between the default paint and hydration, and whether it reads the label as well as the numeral (`0004` G3 finding D2, carried to that spec's G6) | AC5 exempts the hero displacement. G2 states whether LR5 binds this spec's column too, or only `0004`'s numeral. |
| L3 | The obligation attached to the footer citation line — the table year, its effective date and its source link (`CURRENT_LEGAL_YEAR` in `calculator-views.tsx`'s footer), which sits inside the same `#main-content` subtree | If a remedy reserves or redistributes height, G2 states whether that line has a visibility or position obligation that a reserved-space fix could violate. |
| L4 | The omissions paragraph in the same footer — what the calculation does not include (`PRODUCT.md` §4, "name the gap") | Same subtree, same reason as L3. |
| L5 | Whether a disclosure has an obligation to render in the **pre-hydration** frame at all, not only in the settled one | The whole defect lives in the interval between first paint and hydration. If a disclosure must be present in both frames, that constrains which remedies are legal before anyone draws one. |

**This spec introduces no user input.** There is therefore no new default to state; the defaults that
decide the measured condition are the existing ones (`PRODUCT.md` §5, the common case) — the seeded
condition of AC1 restores a returning user's previously entered values and invents none.

## Acceptance criteria

**The instrument.** Every rate criterion is measured by one Playwright + Chromium probe, driven by a
`layout-shift` `PerformanceObserver` with `buffered: true`, at 4× CPU throttle. That instrument was
run in this tree, in this session, before these criteria were written (`AGENTS.md` §5): see
§ Evidence row **E6**. The probe file itself is built at G5 as the spec's first task; **`n` is fixed
at 20 per cell inside the command**, because a threshold judged against a sample-size-dependent
statistic moves its own bar when `n` grows (lesson **014**). A criterion below is closed only when
its command has been run and its printed output pasted into `evidence/`.

| # | Criterion | How it is verified |
|---|---|---|
| **AC1** | The report states, for **every** cell of `{/, /custo-da-hora}` × `{seeded, empty}` × `{390×844, 1024×768}` × `{branch-alias deployment, local production build}` in dark, and for every one of those cells that recorded ≥1 event repeated in light: the denominator **20**, the count of loads whose session CLS > 0.1, each load's CLS as printed, and every `layout-shift` entry's `sources` verbatim. No cell is reported with a denominator other than 20, and no cell is omitted. | `evidence/shift-rate.md` + the raw stdout it was built from. A reviewer counts the rows: 16 dark cells, each `n/20`. |
| **AC2** | For each route the report contains one sentence of the exact form *"CLS > 0.1 occurred in X/20 seeded loads and Y/20 empty loads at VIEWPORT on ARTIFACT"*, for all four viewport × artifact combinations, with X and Y both present even when zero. | Read the four sentences in `evidence/shift-rate.md`. A sentence with a missing side fails. |
| **AC3** *(rewritten at run 2, blocker B4)* | **The diagnosis carries one verdict per reproducing route, and the set of routes is derived, never enumerated.** Let **R** be the set of routes for which any cell of the **pre-remedy** rate run (T3) recorded `sumCls>0.1` with a numerator ≥ 1 — derived by the command opposite, over the instrument's own stdout, never from a route list written in this spec or in `plan.md`. Three clauses. **(a) One verdict per member of R.** `evidence/diagnosis.md` contains exactly `\|R\|` sentences of the form *"on ROUTE, NODE moves because ARTEFACT does THING under CONDITION"* — NODE named per route, because the artefact that moves on one route is not assumed to be the artefact that moves on another. Each names the experiment that **proves** it **and** the experiment that would have **refuted** it; a cause asserted without a refuting experiment fails, whether or not it is true. **(b) One event or several, said out loud.** If two or more verdicts assert the **same** event, the file names the experiment that **discriminated** them — the run whose output would have differed had they been two events — and the verdicts are then the same sentence with only ROUTE varying. If they assert different events, each stands on its own pair of experiments and the file says the events are distinct. A single verdict is correct if and only if `\|R\| = 1`. **(c) Every route measured and not in R gets a non-reproduction line** carrying the rate that says so (`0/20` per cell), so a reader can tell *did not reproduce* from *was not diagnosed*. If no experiment resolves a member of R, this spec does **not** guess: the file states which experiments were run and what each returned, and `tech-lead` routes that member's impasse to the human — per route, so an unresolved `/` does not hold a resolved `/custo-da-hora`. | **The command, run in this tree at this amendment** over T3's stdout: `grep -h "CELL DONE" evidence/shift-rate-dark.log evidence/shift-rate-light.log \| awk '{split($4,k,"/"); r=(k[3]==""?"/":"/" k[3]); for(i=5;i<=NF;i++) if($i ~ /^sumCls>0\.1=/){split($i,v,"="); split(v[2],n,"/"); if(n[1]+0>0) print r}}' \| sort -u` — **known-bad (the state this spec is about), printed: `/` and `/custo-da-hora`, `\|R\| = 2`**, so a `diagnosis.md` carrying one sentence fails clause (a) unless clause (b)'s discriminating experiment is named; the same run shows `/` at 1/20 and `/custo-da-hora` at 5/20 (`evidence/shift-rate.md`). **Known-good (lesson 040):** the identical command over the same logs with every `sumCls>0.1` numerator forced to 0 — a remedied run — printed **nothing, `\|R\| = 0`**, and clause (c) then covers both routes. The two outputs differ in the direction the criterion asserts. The denominator for clause (c) comes from the same run: `… \| awk '{split($4,k,"/"); print (k[3]==""?"/":"/" k[3])}' \| sort \| uniq -c` → **12 cells each on `/` and `/custo-da-hora`**. Then read the sentences in `evidence/diagnosis.md` and count them against `\|R\|`. |
| **AC4** | After the remedy, the AC1 command re-run unchanged: in **every** cell, **all 20** loads have session CLS ≤ 0.1, and **zero** of the 20 record a `layout-shift` source whose node is `DIV.lg:col-span-7`, the regime `BUTTON.flex.w-full`, `DIV.relative` or `svg.tabler-icon-briefcase` **with a value ≥ 0.1**. | The same command, the same 20-load denominator, output pasted beside the pre-remedy run. |
| **AC5** *(rewritten at run 2, blocker B1)* | The shift is **absent, not concealed**: `DIV.lg:col-span-7`'s box takes only the two values this spec measured for **that cell**, and its travel between them is bounded on **both** sides. Per cell, from this spec's own two-target probe (`plan.md` T4(b), `evidence/two-target-geometry.mjs`), in **document** coordinates (`getBoundingClientRect().top + scrollY`, border box — the one convention every number in this criterion is read in), on the **pre-remedy** build: `T1c = (top1, height1)` is the server paint (`javaScriptEnabled: false`) and `T2c = (top2, height2)` is the settled state at 3500 ms. Three clauses, all required. **(a) The two designed values are pinned.** The post-remedy re-run of the same probe, unmodified, reproduces `T1c` and `T2c` within **±1 px** per component. A cell whose `T1c` or `T2c` moved fails in either direction, and **a smaller `\|T2c − T1c\|` fails exactly as a larger one does** (lesson **016**) — a column that stops moving where the design says it moves is a finding, not a fix. This is also what stops the exemption becoming self-fulfilling: the deltas are fixed by the pre-remedy capture, not re-derived from the remedied build. **(b) No third state at either sample point, per load.** For each of the 20 loads of each cell the rate probe samples the column at first contentful paint and again at 3500 ms: the 3500 ms sample equals `T2c` within ±1 px on both components; the FCP sample satisfies `height ∈ [min(h1,h2) − 1, max(h1,h2) + 1]` and `top ∈ [min(top1,top2) − 13, max(top1,top2) + 13]`. The extra 12 px on `top`, and only on `top`, is `PANEL_TRANSITION`'s `y` (`components/organisms/calculator-views.tsx:20-24` — `initial y: 12`, `exit y: -12`), which translates the box without resizing it. **Both bands are closed on both sides**; a value outside either fails, and the report prints which side it left and by how much. **(c) Twenty pairs per cell, printed.** A cell reporting fewer than 20 rect pairs, or reporting a mean, a max or a range in their place, fails on its reporting regardless of the values (lesson **014**; `AGENTS.md` §5 — a pass is evidence only about the sample it measured). **What AC5 does not gate, stated so it is not over-read:** the frames *between* its two sample points. A transient excursion that both samples miss is caught by AC4's `≥ 0.1` source counter, by `plan.md` D5's zero-box counter and by T7's committed guard — not here. **No mechanism is presupposed**: every quantity above is a measured box or a constant read from the shipped source, and `legal.md` §10 and `design.md` §A.5 still name no cause. | The probe: `evidence/two-target-geometry.mjs` for `T1c`/`T2c` (T4(b)), `evidence/shift-rate.mjs` for the per-load pairs (T3, re-run at T8). **Known-good run (lesson 040, lesson 051):** `evidence/g3-geometry.mjs`, `product-designer`, G3 run 1, branch-alias preview, 32 cells — a build in which the defect is absent. `/custo-da-hora` 390: `T1c = 607.0 / 1200.7`, `T2c` seeded `= 559.3 / 1053.7` → bands `top [546.3, 620.0]`, `height [1052.7, 1201.7]`, both samples inside, `ΔC = (−47.7, −147.0)`; empty storage `T1c == T2c` → the band collapses to ±1 px (±13 on `top`) and `Δ = (0, 0)`. 1440: `112.0 / 889.7 → 112.0 / 763.7`. `/`: `771.4 / 1674.4 → 771.4 / 1534.0` at 390, `112.0 / 1110.8 → 112.0 / 970.4` at 1440. **Green in all 32 cells** — where the run-1 wording was red in every seeded one (−147.0, −126.0 and −140.4 px of height against a ≤ 1 px bound), which is blocker B1. **Known-bad run:** the anomalous frame, `0004` `evidence/cls-early-shift.txt`, `prev = 84,632` — unclipped and therefore a real box, the `cur` rows being the clipped ones at `top + height = 844` (`design.md` §A.4). `top 84` is **462.3 px below** the band floor `546.3`; `height 632` is **420.7 px below** `1052.7`. **Red on both components.** It is the state the FCP sample reads in the loads that carry it: the entries recording the move *away* from it fire at **t = 188–304 ms** (`STATUS.md` § *Handed in from `0004` T1/X6*), so the anomalous box is what the first painted frame is in. **Unmeasured cells stay unmeasured:** 1024, light and the local artifact have no `T1c`/`T2c` yet; T4(b) measures them before T8 scores them, and a value that is neither `design.md` §A.3's prediction nor within a pixel of it is a **finding** raised before T5 starts, never a number quietly promoted into the exemption (lesson **026**). A remedy that reaches AC4 by making a node invisible, zero-opacity, `content-visibility: hidden` or mount-delayed moves `T2c` or the FCP pair and fails. |
| **AC6** | The rendered text of both routes is unchanged by the remedy. `document.body.innerText` of `/` and `/custo-da-hora`, seeded and empty, sampled at 3500 ms, with nodes whose text matches `^\d{2}:\d{2}(:\d{2})?$` masked, `diff`s empty against the pre-remedy capture. Exemptions, and no others: a string `labor-law-analyst` mandates at G2/G6, and an accessible name required by `product-designer` or `web-standards-auditor` — each quoted verbatim in the report with the gate that mandated it. | `diff` exit status 0, or a non-empty diff in which every line is one of the quoted exemptions. |
| **AC7** | The report states whether the defect reproduces on `workload.devrma.com`, **and** establishes which build that host serves by a marker in its own bytes — not by its URL. If that build predates this tree, the host is recorded as **context** and is excluded from every pass/fail arithmetic in AC1–AC5 (lesson **032**). | The `curl` command and its output in `evidence/`, plus the marker count. § Evidence row **E5** is the G1 run of exactly this check. |
| **AC8** | The remedy raises none of `design.md` I7's four numbers — 0 px / 0.0000 on `/`; 16.3 px / 0.0099 (`hour`), 47.6 px / 0.0481 (`month`), 60.4 px / 0.0544 (`year`) on `/custo-da-hora`. | `0004`'s `evidence/hero-swap-geometry.mjs`, re-run unmodified against the remedy build, numbers compared line by line. |
| **AC9** | No horizontal overflow and no control outside the viewport at 320, 390, 1024, 1440, 2560 and 3840, in both themes, after the remedy. | The existing Playwright wide-viewport spec plus 320/1024, run at G6. A reserved-height or min-width fix that overflows a 390 phone fails here. |

## Disclosure obligations

This change computes nothing, so it adds no gap between WorkLoad's number and a real payslip's. What
it can do is make an existing disclosure arrive later, smaller, lower or not at all — the alerts and
the footer citation live inside the subtree that moves.

Binding on every downstream gate, subject to `labor-law-analyst` settling L1–L5:

1. **A remedy may not delay a disclosure.** If the fix changes when a string first renders, the
   report states the frame it rendered in before and after, measured, not argued.
2. **A remedy may not move a disclosure below the fold** at 390 in either theme, where it was above
   it before.
3. **A remedy may not reach AC4 by hiding a disclosure.** CLS ignores shifts of invisible elements,
   so concealment passes the metric while the user still loses the string — which is why AC5 exists
   and why it is written against a box and not against a score.
4. **If the remedy reserves space**, the reserved height is reported at 390 as a fraction of the
   viewport, so the cost in phone height is a number and not an adjective (`PRODUCT.md` §5: every
   field, and every pixel of chrome, costs attention before it earns accuracy).

## Non-goals

What a well-meaning agent downstream might add, and must not:

- **A skeleton, a shimmer, a placeholder or a mount animation.** They convert a visible shift into a
  hidden one and satisfy CLS without helping the user (`AGENTS.md` and `0004` `plan.md` T1 carry the
  same prohibition for the same reason).
- **A blanket `min-height` on the form column.** It spends phone height permanently to pay for a
  defect that fires in a minority of loads, and `0004` G3 already rejected exactly that trade for
  the hero (~60 px of a phone hero, permanently, for a shift 2–10× under the threshold).
- **`overflow-anchor`, `contain`, or any global CSS property applied tree-wide** to suppress the
  symptom. The same objection as the skeleton, with a wider blast radius.
- **Rewriting `calculator-layout.tsx` into a different grid, or "unifying" the two calculators.**
  The container is shared already (S1); a refactor changes both routes and makes the diff
  unattributable.
- **Adding CLS to `0004`'s acceptance criteria**, or any other re-merge of the two specs. `0004` G4
  ruled them separate and why.
- **Fixing the `p-1.5` / `gap-1` inset while in the file.** Out of scope, recorded, and its own spec.
- **Naming a cause in `design.md` or `copy.md`.** The cause is AC3's, earned by an experiment; a
  cause asserted at G3 inherits the unmarked confidence lesson **032** was written about.

## Evidence available

Every row was produced by a command run in this session, in this tree.

| # | Claim | Source |
|---|---|---|
| E1 | The `lg:col-span-7` box is **one** file shared by both routes; `grep -rn "col-span" app components` returns 5 matches, exactly one of them `lg:col-span-7`, at `components/templates/calculator-layout.tsx:17` | command output, § Scope S1 |
| E2 | Eight files carry a conditionally-mounted or animated subtree: `grep -rln 'AlertBanner\|CollapsiblePanel\|AnimatePresence' app components` → `alert-banner.tsx`, `collapsible-panel.tsx`, `regime-field.tsx`, `calculator-views.tsx`, `cookie-consent.tsx`, `day-summary.tsx`, `journey-form.tsx`, `salary-calculator.tsx`. Both routes carry them inside the main column | command output, § Scope S2 |
| E3 | `find app -name '*.tsx'` returns 7 files; `/custo-da-hora` has its own page module and its own OG/Twitter image modules — it inherits nothing by convention (lesson **034**) | command output, § Scope S3 |
| E4 | The measured shift: `/custo-da-hora` 0.0481 in 5/6 and 0.5933 in 1/6; the 0.5452 event at t=367 ms moves `DIV.lg:col-span-7` from `top=84, height=632` to `top=595, height=249` — **511 px down and 383 px shorter** — with three children at `0,0`. `/` 0.0011 in 6/6 | `0004` `evidence/cls-early-shift.txt`, read verbatim this session; produced by `product-designer` at `0004` G3, 6 loads per route, 390×844, dark, 4× throttle, seeded |
| E5 | **`workload.devrma.com` serves a different artifact from this tree.** `curl -s https://workload.devrma.com/custo-da-hora` contains `Informe o seu sal` **0 times**; the branch-alias preview contains it **1 time**. Both hosts return `lg:col-span-7`, `Regime de Trabalho` and `flex w-full items-center justify-between` exactly once. So production is **context, not a control** (lesson **032**) — and the implicated structure exists in its bytes too, which is why AC7 is a measurement and not an assumption | `curl` on both hosts, marker counts, this session |
| E6 | The instrument is operable in this tree: Playwright + Chromium, `layout-shift` observer, 4× CPU throttle, seeded context, 390×844 dark, one load of `/custo-da-hora` printed `playwright chromium ok; CLS=0.0481 [{"t":485,"v":0.0481}]` | `node .specs/0008-intermittent-layout-shift-on-custo-da-hora/evidence/g1-instrument-check.mjs` (evidence is gitignored) |
| E7 | `0004`'s T1/X6 — which would have delivered AC1 and AC2's first pass — **has not run**: `evidence/t1-attribution.md` does not exist and `0004`'s `STATUS.md` still names `frontend-dev` as the next agent for T1. This spec therefore produces the rate itself rather than waiting on it. **Superseded as a fact at run 2, not as a ruling:** `ls .specs/0004-lcp-render-delay/evidence/` this session returns `t1-attribution.md`, `t1-x6-cls-rate.log` and `t1-x6-cls-rate.mjs` — X6 has since run, and its cells merge into AC1's table exactly as this row directed, without replacing the fixed `n = 20` denominator (`STATUS.md` § *Handed in from `0004` T1/X6*) | `ls .specs/0004-lcp-render-delay/evidence/`, `0004` `STATUS.md` header |

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| How many loads per cell? | **20**, fixed inside the command | `tech-lead` set ≥20 at `0004` G4 §5. Fixing `n` in the command is what keeps the threshold from moving when evidence grows (lesson **014**). |
| Light theme in every cell, or only where dark found an event? | **Only where dark found ≥1 event**, at the same `n = 20` | 32 cells × 20 is 640 throttled loads. The two-stage rule keeps the full grid answerable while the theme axis is still tested wherever it can matter. If the dark pass finds **no** event anywhere, the light pass runs the four `/custo-da-hora` cells anyway — a null result needs its control. |
| Which second viewport? | **1024×768** | `design.md` **I4**: 1024 is the narrowest hero container in the whole range (285.3 px, tighter than 390's 294 px). A column-collapse checked only at 390 is half-checked. |
| Is the defect preview-only? | **Undetermined, and AC7 decides it** | E5 shows production is a different build; it also shows the implicated nodes are present there. Framing the urgency before that measurement is exactly the error `0004` paid for. |
| Should `0004`'s D4 inset ride along? | **No** | § Out of scope, last bullet, with the reason and the route out. |
