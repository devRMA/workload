# 0008 — Implementation plan

> Owner: tech-lead · Gate: `plan`

**No remedy task exists in this plan, and that is the plan's central ruling.** `spec.md` § Scope
item 4 makes the cause a **deliverable** (AC3), `legal.md` §10 and `design.md` §A.5 both refuse to
name one, and `design.md` §A.5 refutes for free the only account anyone has written down — the three
zero-size children sum to `166.8 px` against `568.7 px` of missing height, **at most 29 %**. A lever
written before the attribution lands is a lever aimed at a term nobody has measured (the rule
promoted into `.agents/agents/tech-lead.md` from lesson **010**, and lesson **032**).

So this gate builds **instruments and measurements**, in a fixed order, and stops at a named
checkpoint (§6) where `tech-lead` writes the remedy tasks against the diagnosis. Every constraint a
remedy will have to satisfy is already written down here, in §6.2, so that the amendment is a
mechanism and a file list, never a re-derivation of the rules.

---

## 1. What this gate rules before anything is built

### 1.1 The two corrections `design.md` §A.4 routed here

| # | The correction | What it changes in this plan |
|---|---|---|
| **C1** | **The diagnosis owes the `prev` frame, not the `cur` frame.** `595,249` is the *correct* column clipped at the fold (`top + height = 844` exactly, three rows); `84,632` is the anomalous one. Restated against Target 1 at 390: the column is **523 px too high** and **568.7 px too short**. | **T5** is written against `prev`. Every experiment there asks what produced a column at `top 84, height 632`, never what produced `595,249`. A remedy that changes `cur` changes the correct state, and §6.2 **R3** forbids it. |
| **C2** | **AC5 fails on a build with no defect.** It demands `top` and `height` differ by ≤ 1 px between FCP and 3500 ms and exempts only the hero displacement; the correct build moves `height` by **−147.0 px** at 390 and **−126.0 px** at 1440 on `/custo-da-hora`, and **−140.4 px** at both viewports on `/`. No exemption covers the height side (lesson **040**). | **This is a spec defect, not a plan decision. Routed to `product-manager`, bounce-free amendment, recorded as blocker B1 in `STATUS.md`,** with the wording I recommend in §1.2. It blocks **T8** only; T1–T7 sample the rects either way and do not read AC5's threshold. |

### 1.2 The AC5 wording this gate recommends to `product-manager` (it does not adopt it)

`tech-lead` may not rewrite an acceptance criterion (`AGENTS.md` §4, and this gate does not own
`spec.md`). The recommendation is written here so the round trip is one edit:

> **AC5.** For each cell the probe samples `DIV.lg:col-span-7`'s `getBoundingClientRect()` at first
> contentful paint and again at 3500 ms. Let `(ΔtopC, ΔheightC)` be **that same cell's two-target
> delta** — the difference between the server-paint geometry (`javaScriptEnabled: false`) and the
> settled geometry, measured by the geometry probe on the same artifact, in the same cell, in the
> same run. The sampled `(Δtop, Δheight)` must equal either `(0, 0)` or `(ΔtopC, ΔheightC)`, each
> component within ±1 px. Any third value is a failure, **including one smaller than both** — a
> column that stops moving where the design says it moves is as much a finding as one that moves
> further (lesson **016**).

Three properties it has and the current wording does not: it is green on the known-good build; it is
red on the anomalous frame (`523 / 568.7` is neither pair); and its exemption is **measured per cell
by this spec's own instrument** rather than enumerated, so the `/` cells — whose seed this plan
changes, §1.3 — do not need a number nobody has taken (lesson **026**, lesson **050**). It also
keeps the `design.md` **I7** ceiling intact: `ΔtopC` at 390 on `/custo-da-hora` **is** the hero
resize, and AC8 scores it separately against I7's four numbers.

### 1.3 Decisions this gate takes and records

| # | Decision | Ground |
|---|---|---|
| **D1** | **The seed is defined per route, and `/`'s seed changes.** `/custo-da-hora` keeps `t1-x6-cls-rate.mjs`'s seed exactly (`grossSalary=4200`, `salaryPeriod=month`) so AC1's cells stay comparable with the X6 numbers `STATUS.md` hands in. `/` gets the **journey** seed `legal.md` §1.4 used to render DS2 and DS7, because neither key `/`'s calculator reads is in the salary seed: `design.md` §A.2 measured `/` settled **identical in both storage states**, which makes the storage axis on `/` a comparison of a state with itself. An axis whose two sides are the same state cannot discriminate and must not be reported as though it could. | `design.md` §A.2 `/` row; `AGENTS.md` §5 *a pass is evidence only about the sample it measured* |
| **D2** | **X6's `/` cells merge as a third, labelled condition — `partial seed` — never overwriting the `/ seeded` cells.** They were taken under the salary seed on the journey route, which D1 has just shown is the empty state under another name. | lesson **032**: a routed number travels at the confidence of what it measured |
| **D3** | **If the dark pass records no event anywhere, the light pass repeats all eight `/custo-da-hora` cells**, not four. `spec.md` § Open questions says "the four `/custo-da-hora` cells" and this spec has eight (2 storage × 2 viewport × 2 artifact). The superset satisfies every reading of the sentence and cannot under-measure; the report says which rule fired. | `AGENTS.md` §5; resolving it downward would be a plan choosing which half of a criterion to run |
| **D4** | **The seeded condition is a confound and T5 splits it.** "Seeded" as every prior run defined it is **two** changes at once: stored values **and** a prior navigation to the same origin. The empty condition has neither. No experiment on the record separates them. | `AGENTS.md` §5 *never let a criterion compare a value read one way to a threshold derived another way* |
| **D5** | **Three counters per cell, one denominator.** `sumCLS > 0.1`; any single entry `≥ 0.1`; and a **zero-box counter** — loads recording ≥1 `layout-shift` source naming one of the four implicated nodes with `cur=0,0` **at any value**. AC1's own threshold is untouched and fixed at `n = 20` (lesson **014**); the third counter exists because `legal.md` §1.5 printed `svg 830,14->0,0` at `v=0.0342`, a sub-threshold instance of the same shape that AC1's ≥ 0.1 definition cannot see. | lesson **016** — bound the quantity on both sides; `legal.md` §1.5 |
| **D6** | **`sumCLS` is the sum of every non-`hadRecentInput` entry in the 3500 ms window** — `t1-x6-cls-rate.mjs`'s quantity, not the windowed CWV session sum. One quantity across every criterion in this plan, stated because the two differ and every number already on this spec's record is the first. | `AGENTS.md` §5 |
| **D7** | **The deployed preview and the local production build are two artifacts, never a control for each other.** They differ in the *measurement path* as well as the bytes: this machine's egress is TLS-intercepted and loopback is the one path that bypasses it (lesson **037**, `0004` §7.1). A deployed-versus-local delta in AC1 is reported as a delta between artifacts-plus-paths and is never attributed to source. | lesson **037**, lesson **032** |
| **D8** | **No probe file is committed.** `.specs/*/evidence/` is gitignored by `AGENTS.md` §5 and every instrument this spec has used lives there. The one durable artifact this gate adds to the tree is **T7**'s committed guard, which is a non-regression check and not a measurement. | `AGENTS.md` §5, §10 |

### 1.4 Rulings taken mid-G5, run 2 — B2, B3, and the `/` reproduction

Three things arrived from the build gate: T2's stop condition fired on a dirty tree it cannot be
contaminated by (**B2**), T7's four-node census turned out to be a `/custo-da-hora`-shaped rule
applied "for each route" (**B3**), and **`/` reproduces** — which the decomposition in §2 said it did
not. All three are the same defect in this plan, and it is recorded as lesson **056**: a rule
generalised across an axis without restating it per element of that axis. The rulings below replace
the blanket forms. **No source file is edited by any of them, and no remedy is written here.**

| # | Decision | Ground |
|---|---|---|
| **D9** | **The local artifact is a pinned commit, and it is identified by what it was built from.** `LOCAL_PIN = 5c0c6fa99f15f7c46e1bfb668006550981d0dc03`, tree `93b626cd85295d0749f800c1654b6de2f4bd6d72` (both read this session with `git log -1 --format=%H` and `git rev-parse 5c0c6fa^{tree}`, in the repository, read-only). Every local cell in T3, T4, T5 and T8 is built from that pin, and every sentence in every report names it **`local@5c0c6fa (tree 93b626c)`** — never "the local build", never "the tree", never a build date. An artifact named by when it was built is not identifiable; an artifact named by its tree hash is. | `AGENTS.md` §5 — a claim about the tree is measured by listing it; lesson **056** |
| **D10** | **T2(a)'s stop condition is rewritten as a test on the pin, not on the working tree.** `git archive <pin>` reads committed objects only, so an uncommitted edit anywhere in the checkout cannot reach the artifact's bytes — the old condition blocked a build it could not affect. The new condition is: `git rev-parse <pin>^{tree}` must equal **`93b626cd…`**, and the extracted copy's tarball `sha256` must be recorded. The porcelain snapshot is still pasted into `artifacts.md`, demoted from a gate to **context**, under the sentence *"the local artifact is commit 5c0c6fa and is deliberately not the working tree; the uncommitted work of specs 0004 and 0007 is outside it."* **B2 is discharged and T4(a) is unblocked.** | lesson **029**, lesson **013** (why the copy is isolated at all); lesson **056** (why the condition was wrong) |
| **D11** | **The census T7 asserts is per route, and each route's expected size is a number derived from the source.** The assertion that the set size is exact **stays** — it is what turns a renamed class into a red test — and it is now stated once per route: **`/custo-da-hora` = exactly 4**, **`/` = exactly 10**. The node lists and the commands that produced them are in T7. `/`'s list is derived by listing the components the route renders, not by relaxing `/custo-da-hora`'s. **B3 is discharged and T7 is unblocked.** | `design.md` **K1** (*no element in this subtree has a legitimate zero box*) is route-independent; `AGENTS.md` §5; lesson **056** |
| **D12** | **`/` reproduces, so the metric no longer lives in one cell, and §2's decomposition is corrected rather than defended.** Three independent sightings on `/`, none of them in the record §2 was written from: T3's `deploy / seeded / 390 / dark` at **1/20** with the identical `top=84` anomalous-frame signature, its light twin at 0/20, and an unmodified `0004` `hero-swap-geometry.mjs` printing **`CLS 0.5076`** on `/` light 390. §2's line *"`/` × seeded → none"* was measured under the **salary** seed, which D1/D2 already labelled `partial seed` for `/`; under D1's journey seed the cell is not zero. **A lever aimed at `/` now has a measured term and is no longer struck by §2 consequence 1.** No cause is named here (lesson **032**). | `STATUS.md` T3 and T4(c) findings, this run |
| **D13** | **`/`'s reproduction does not re-open scope, and the reason is written so a later gate does not re-litigate it.** `spec.md` AC1, AC2, AC4, AC5 and AC9 are already written over `{/, /custo-da-hora}`, and G1's own decisions log ruled `/` measured *"under the identical protocol rather than waved through"*. Nothing here needs a new cell, a new route or a new file. **One acceptance criterion is affected and it is `product-manager`'s: AC3's "one sentence" form presumes one event.** Raised as **B4**, scoped to `diagnosis.md`'s reporting form only, blocking **no experiment**. | `spec.md` AC1/AC4 domain; `AGENTS.md` §4 rule 2 |
| **D14** | **T5 experiments on `/` as well, and the two routes' frames are compared before either is explained.** The new experiment **F** (T5) replicates A on `/ seeded 390 dark` under D1's journey seed. Its output is read **qualitatively** — does a frame with the column at `top ≈ 84` occur, and which boxes are `0,0` in it — and **never as a rate**: at 1/20 an `n = 20` sample has no power to compare rates, so B's perturbation test is not run on `/` and no rate conclusion about `/` is drawn from F. `design.md` **K1** and §A.5's 401.9 px residual apply to `/`'s frame too, against `/`'s own Target 1. | §2 consequence 3 (*unmeasured is not zero* — and 1/20 is not 0/20 either); lesson **026** |
| **D15** | **`design.md` §A.3's `/` row is stale against D1's seed and is routed back to `product-designer` as B5, not corrected here.** T4(b) measured, on deploy: `/` seeded **grows** (+440.0 px at 390, +336.0 at 1024/1440) where §A.3 predicts `0 / −140.4`, and `/` **empty** sits −34.0 px from Target 1 at every viewport where `/custo-da-hora`'s empty cells match Target 1 exactly (`Δ = 0/0`). A stale prediction is a `design.md` correction and `tech-lead` does not write one (lesson **050**). It scores nothing: AC5 run 2 exempts per cell from **this spec's own pre-remedy capture**, never from an enumerated number. | `AGENTS.md` §4 — the four inputs' owners; lesson **050** |

---

## 2. Metric decomposition — required before any numeric criterion is accepted

The rule promoted into `.agents/agents/tech-lead.md` (lesson **010**, three confirmations) applies:
decompose the metric on the current build, record the breakdown, and state for each planned lever
which term it reduces. **The decomposition already exists and it is unusually clean.**

The metric is the per-cell reproduction rate `n/20`. Its terms are the four axes of AC1.

**Version 1, written at G4 from `STATUS.md` § *Handed in from `0004` T1/X6*** (80 loads, deployment,
390, dark, 4× throttle). Left standing, because a decomposition that gets replaced is a measurement
like any other and the replacement is only readable beside it:

| Term | Measured | Share of the metric |
|---|---|---|
| `/custo-da-hora` × seeded | **5/20 (25 %)** | **all of it** |
| `/custo-da-hora` × empty | 0/20 — and CLS `0` exactly, no entry at all | none |
| `/` × seeded (**salary seed** — `partial seed`, D2) | 0/20 | none |
| `/` × empty | 0/20 | none |
| 1024, light, local artifact | **unmeasured** | unknown — T3 measures them |

**Version 2, measured by T3 and T4(c) this run, and it is the binding one** (deployment, 390, 4×
throttle, `n = 20` per cell, D1's per-route seeds):

| Term | Measured | Share of the metric |
|---|---|---|
| `/custo-da-hora` × seeded × dark | **5/20 (25 %)** | the dominant term, and X6's number reproduced exactly |
| `/custo-da-hora` × seeded × light | **5/20 (25 %)** | equal to dark — consistent with `design.md` **K2** |
| **`/` × seeded × dark (journey seed, D1)** | **1/20 (5 %)** | **small, non-zero, and the same `top=84` signature** |
| `/` × seeded × light | 0/20 | inside the binomial spread of a ~5 % rate; not read as a theme effect |
| `/custo-da-hora` × empty, `/` × empty, every 1024 cell | 0/20 | none |
| `/` light 390, `hero-swap-geometry.mjs`, `n = 1` | **`CLS 0.5076`**, single entry at `t = 239` | a third sighting of the ≥0.5 shape, on `/`, under a third seed — **not** a rate |
| the local artifact, every cell | **unmeasured** — blocked until D10 unblocked it | unknown — T3's local pass fills it |

**Consequences, binding on §6:**

1. A lever whose term measures near zero is not a lever. Any remedy aimed at the empty state or at
   ≥1024 must say in writing which measured term it reduces, or be struck (`design.md` **K3** records
   that the column's top never moves at ≥1024, in sixteen cells). **`/` is no longer in that
   sentence** (D12): its term is 1/20, not zero, so a remedy that fixes `/custo-da-hora` and leaves
   `/` at 1/20 has reduced the metric without closing it, and T8 reports the two cells separately.
2. **The component verdict and the system verdict stay in separate branches** (same promoted rule).
   "This change made a cell worse" and "a cell is still over threshold" are different findings with
   different destinations, and §6.1 gives each its own stop condition.
3. The unmeasured cells are unmeasured, not zero. T3 fills them **before** T5 chooses where to
   experiment, which is why T5 depends on T3 and not the reverse.

---

## 3. Architecture

**No source module changes in T1–T6 and T8.** The only file this plan adds to the tree is one e2e
spec (T7). That is the architecture, and the reason is §1 and §2: the remedy's shape is AC3's
output, `design.md` § Components records **`new`: none**, and `design.md` §C rules out the one shape
a plan could have chosen in advance (reserved space, on the column and on the aside, at every
viewport, with an 11.2 px budget at 390 to prove it).

**Where the business rules sit, and why nothing moves.** `AGENTS.md` §8 puts every legal constant in
`lib/`. This spec computes nothing (`legal.md` §9), so `lib/` is untouched in every task here, and
`spec.md` § Out of scope's first bullet stands with no override taken. The hooks
(`hooks/use-salary-calculator.ts`, `hooks/use-work-calculator.ts`) are in scope **for the diagnosis
only** and an edit to either fires `legal.md` §6 **O5** — see §6.2 **R8**.

**The subtree, at its atomic levels, all reuse-unmodified** (`design.md` § Components is the full
table; the four nodes AC4 names are marked):

```
app/page.tsx · app/custo-da-hora/page.tsx        (route entries)
└── CalculatorViews                               organism  components/organisms/calculator-views.tsx
    ├── #main-content                             ← AnimatePresence + PANEL_TRANSITION (y: 12)
    │   └── SalaryCalculator | WorkCalculator     organism
    │       └── CalculatorLayout                  template  components/templates/calculator-layout.tsx
    │           ├── DIV.lg:col-span-7  ★1         ← the shifting box, one file, both routes
    │           │   ├── card (bg-surface rounded-xl)
    │           │   │   ├── Field → CurrencyInput → Input · DIV.relative  ★3
    │           │   │   ├── RegimeField           molecule  components/molecules/regime-field.tsx
    │           │   │   │   ├── legend → svg.tabler-icon-briefcase  ★4
    │           │   │   │   ├── button[aria-controls="regime-options"]  ★2
    │           │   │   │   └── CollapsiblePanel  atom (height 0 ⇄ auto)
    │           │   │   ├── AlertBanner ×3        atom (DS3, DS5, DS6 — mount/unmount, no animation)
    │           │   │   └── CollapsiblePanel → TaxDetailsPanel
    │           │   └── StatBox grid              atom, aria-live="polite"
    │           └── aside (order-first at 390)    → HeroPanel  organism  ← DO NOT TOUCH (design §C.2)
    └── footer → DS1 P1–P4                        ← OUTSIDE the column, sibling of AnimatePresence
```

**The one structural fact a remedy will get wrong if it is not written down:** DS1 lives in the
`<footer>` at `calculator-views.tsx:73`, a **sibling** of `CalculatorLayout`'s grid. A remedy bounded
to the nine files `spec.md` § Scope item 5 lists can move DS1 by hundreds of pixels **without
appearing in the diff of the file DS1 lives in** (`legal.md` §1.1, correcting `spec.md` § Legal
dependencies). Every post-remedy measurement therefore re-measures DS1 by position, not by diff.

**Where the instruments live.** `.specs/0008-intermittent-layout-shift-on-custo-da-hora/evidence/`,
as `.mjs` run by `node`, matching every probe this spec and `0004` already produced. They are
gitignored, regenerable and outside `biome` (`biome.json` excludes `**/.specs`) and outside
`tsconfig`'s `include` (`**/*.ts` only). **They still carry no comments** (`AGENTS.md` §8): the
squad's rule is about code, not about which directory the code sits in.

---

## 4. Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Drive a real Chromium, throttle the CPU, observe `layout-shift` | **`@playwright/test` — already a devDependency (`^1.63.0`)** | `spec.md` § Evidence E6 ran it in this tree this session; `chromium` is imported directly in six probes already in `evidence/`. No new dependency. |
| CDP CPU throttling | **`page.context().newCDPSession(page)` → `Emulation.setCPUThrottlingRate`** | Already the mechanism in `t1-x6-cls-rate.mjs`. Platform feature, no wrapper. |
| Per-frame sampling | **`requestAnimationFrame` inside `page.addInitScript`** | Already the mechanism in `g2-copresence.mjs`, and the quantity `legal.md` §4.2 names by hand. |
| Serve a local production artifact | **`pnpm build && PORT=3100 pnpm start` inside an isolated copy** | Next's own commands. §5 T2 gives the isolation recipe. |
| Diff the rendered text for AC6 | **`diff`(1) over two text files** | Nothing to install. |

**New dependencies added by this plan: none.** `spec.md` § Out of scope's *no new dependency* bullet
stands with its override untaken. A remedy proposing one comes back here for a written
justification (`AGENTS.md` §8); it does not get one at G5.

---

## 5. Tasks

Every task below leaves the tree compiling and `pnpm check` green, because only **T7** writes a
file inside the tree at all.

**Two standing rules for the whole build gate, and they are not negotiable inside a task:**

- **Never run two measurements at once on this machine.** Two Chromium fleets, or a probe and a
  `pnpm build`, or two Next servers, contend for the same CPU that the 4× throttle is calibrated
  against, and a rate measured under contention is indistinguishable from a real regression
  (lesson **013**, lesson **029**). One probe in flight at a time, and the e2e suite (T7) never
  while a probe runs.
- **Every load is accounted for.** A navigation timeout is logged as `TIMEOUT` and retried **once**,
  logged again, and counted in the cell's denominator as a **non-reproduction with a flag**; a cell
  containing a flag says so in the report. X6 lost a cell to a 30 s timeout and had to resume it as
  two batches (`STATUS.md`); the probe here is resumable by construction so that never becomes a
  silent hole.

---

### T1 — The rate probe, and its calibration against the one cell that is known to reproduce

- **Files:** `.specs/0008-intermittent-layout-shift-on-custo-da-hora/evidence/shift-rate.mjs`
  (create) · `.specs/0008-intermittent-layout-shift-on-custo-da-hora/evidence/t1-calibration.log`
  (create)
- **Depends on:** none
- **Reuse:** `.specs/0004-lcp-render-delay/evidence/t1-x6-cls-rate.mjs` — **the observer block,
  the seeding navigation and the source-formatting function are copied verbatim**, because every
  number already on this spec's record was produced by them and a reformatted source string is a
  different instrument. `.specs/0008-…/evidence/g3-geometry.mjs` — the `box()` helper and the
  `.lg\\:col-span-7` selector escape.
- **What to build:**

  A single ES-module script run as `node evidence/shift-rate.mjs [flags]`. No comments anywhere in
  the file.

  **Flags, all of them required to have a default so the driver loop is one invocation:**

  | Flag | Values | Default |
  |---|---|---|
  | `--host` | a URL | `https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app` |
  | `--artifact` | `deploy` \| `local` | `deploy` |
  | `--route` | `/` \| `/custo-da-hora` \| `all` | `all` |
  | `--storage` | `seeded` \| `empty` \| `all` | `all` |
  | `--viewport` | `390x844` \| `1024x768` \| `all` | `all` |
  | `--theme` | `dark` \| `light` | `dark` |
  | `--runs` | integer | `20` |
  | `--log` | a path | required, no default |
  | `--skip-completed` | present/absent | absent |

  **The cell key** is `artifact/route/storage/viewport/theme`, printed once as
  `=== CELL BEGIN <key> n=<runs>` and once as
  `=== CELL DONE <key> sumCls>0.1=<a>/<n> anyEntry>=0.1=<b>/<n> zeroBox=<c>/<n> flags=<d>`.
  With `--skip-completed`, a cell whose `CELL DONE` line is already in `--log` is skipped and
  re-printed from the log. This is what makes an interrupted run resumable without re-measuring.

  **Per load, in this exact order:**

  1. `browser.newContext({ viewport, colorScheme: theme })`.
  2. If `storage === "seeded"`: open a **separate page**, `goto(host + "/", { waitUntil: "load" })`,
     `evaluate` the route's seed (below), `close()`. **The prior navigation is part of the seeded
     condition and is not optimised away into `addInitScript`** — it is how every reproduction on
     the record was produced, and D4 makes splitting it T5's job, not T1's.
  3. `addInitScript` installing the `layout-shift` observer, verbatim from `t1-x6-cls-rate.mjs`
     (`buffered: true`, skip `hadRecentInput`, push `{t, v, src}` with `prev=top,height` and
     `cur=top,height`).
  4. `newCDPSession` → `Emulation.setCPUThrottlingRate { rate: 4 }`.
  5. `goto(host + route, { waitUntil: "load", timeout: 45000 })`.
  6. `waitForTimeout(3500)`.
  7. Evaluate the **node census** (below) and the shift list.
  8. Print one load line, then one indented line per `layout-shift` entry, verbatim in
     `t1-x6-cls-rate.mjs`'s format. Close page and context.

  **The seeds, exact and final (D1).** Written in the page, so timestamps come from the browser's
  own clock in `yyyy-MM-dd'T'HH:mm`:

  | Route | Keys written |
  |---|---|
  | `/custo-da-hora` | `grossSalary` = `"4200"`, `salaryPeriod` = `"month"` |
  | `/` | `workMinutes` = `"528"`, `firstTierRate` = `"50"`, `extraTierRate` = `"100"`, `entry` = today `08:00`, `lunchStart` = today `12:00`, `lunchEnd` = today `12:30`, `exitOverride` = today `19:30`, `isManualExit` = `"true"` |

  The `/` set is `evidence/g2-ds-stability2.mjs`'s journey block, which `legal.md` §1.4 measured as
  the state that renders DS2 and DS7. `lastExit` is deliberately omitted: with a same-day `entry`,
  `hooks/use-work-calculator.ts:158-159` computes `dayShift = 0` and discards it, so it changes
  nothing and a key that changes nothing is a key a later reader will mis-attribute.

  **The node census, evaluated at 3500 ms, printed on every load line.** This is the vacuity guard
  (`AGENTS.md` §5 — *zero is never a pass*, and the expected size of the set is asserted before it
  is iterated):

  - `document.querySelectorAll(".lg\\:col-span-7").length` — **expected exactly `1`**. Any other
    value prints `COLUMN_COUNT=<n>` and the load is flagged; a cell with any such flag is a finding
    and stops the run.
  - For each of the four AC4 nodes — the column, `button[aria-controls="regime-options"]`,
    `document.querySelector("#horas-mensais").parentElement`, `svg.tabler-icon-briefcase` — print
    `w×h` rounded to 0.1 px. A node that is absent prints `MISSING`, which is never the same token
    as `0x0`.
  - Print `nodes=<k>/4` where `k` counts nodes with a non-zero box.

  **The three counters (D5)**, computed per load from the entry list and the census:
  `sumCls` = Σ of every entry's `value`; `anyEntry` = `true` if any single entry has
  `value >= 0.1`; `zeroBox` = `true` if any entry has a source whose node is one of the four and
  whose `currentRect` is `0,0`, **at any value**.

  **The calibration run, and the only thing T1 measures:**

  ```
  node evidence/shift-rate.mjs --route /custo-da-hora --storage seeded \
    --viewport 390x844 --theme dark --runs 20 --log evidence/t1-calibration.log
  ```

  **Expected: `anyEntry>=0.1` at or near `5/20`** — the rate X6 measured on the same host, viewport,
  theme, throttle and seed. **This is a prediction, not a threshold** (lesson **026**): `0/20` or
  `20/20` is a **finding**, not a licence to tune the probe. Record the number, stop, and report it
  before starting T3 — an instrument that cannot reproduce the only reproduction on the record is
  measuring something else, and 320 more loads of it are 320 loads of nothing.

- **Tests:** none in `__tests__/` — this task creates no source file and changes no rendered
  behaviour. Its check is `evidence/t1-calibration.log`: 20 load lines, one `CELL DONE` line, a
  `nodes=` token on every load, and no `COLUMN_COUNT` flag.
- **Done when:** the command above has run to completion and its stdout is in
  `evidence/t1-calibration.log`; the log contains exactly 20 load lines for the cell; the reproduction
  count is recorded in `STATUS.md` whatever it is. `pnpm check` green (unchanged — no tree file was
  touched). Advances **AC1** and **AC2** by making them measurable.

---

### T2 — The two artifacts, established and provenanced

- **Files:** `.specs/0008-…/evidence/artifacts.md` (create) ·
  `.specs/0008-…/evidence/artifacts-raw.log` (create)
- **Depends on:** none (may run before or after T1; never at the same time — §5's first standing rule)
- **Reuse:** the marker set `spec.md` § Evidence **E5** already used — no new markers are invented.
- **What to build:**

  **(a) The local production artifact, in an isolated copy.** Building in the working tree shares
  one `.next` with every other agent in this session and produces failures indistinguishable from a
  real regression (lesson **029**, lesson **013**):

  **Amended at run 2 by D9/D10 — the artifact is a pinned commit and the stop condition tests the
  pin, not the working tree.** The old rule ("stop if the tree is dirty under `components/`,
  `hooks/`, `lib/`") fired on specs `0004`/`0007`'s uncommitted work and blocked a build whose bytes
  it cannot reach — `git archive <commit>` reads committed objects only (**B2**, lesson **056**).

  ```
  LOCAL_PIN=5c0c6fa99f15f7c46e1bfb668006550981d0dc03
  git -C <repo> rev-parse $LOCAL_PIN^{tree}          # must print 93b626cd85295d0749f800c1654b6de2f4bd6d72
  git -C <repo> archive $LOCAL_PIN | sha256sum       # record this line in artifacts.md
  mkdir -p <scratch>/0008-local-build
  git -C <repo> archive $LOCAL_PIN | tar -x -C <scratch>/0008-local-build
  ln -s <repo>/node_modules <scratch>/0008-local-build/node_modules
  rm -rf <scratch>/0008-local-build/.next
  cd <scratch>/0008-local-build && pnpm build && PORT=3100 pnpm start
  git -C <repo> status --porcelain -- app components hooks lib   # recorded as context, never a gate
  ```

  **The stop condition, in full, and it is the only one:** stop if `git rev-parse $LOCAL_PIN^{tree}`
  does not print `93b626cd85295d0749f800c1654b6de2f4bd6d72` — that is history having been rewritten
  under the artifact, which is the one event that can make it a different build. **Nothing about the
  working tree stops this task.** Paste the porcelain output into `artifacts.md` anyway, under this
  sentence, verbatim:

  > *The local artifact is commit `5c0c6fa` (tree `93b626c`) and is deliberately **not** the working
  > tree. The uncommitted work of specs `0004` and `0007` under `app/`, `components/`, `hooks/` and
  > `lib/` is outside it, and no measurement on this artifact says anything about that work.*

  **Naming.** Every report sentence that refers to this artifact calls it **`local@5c0c6fa (tree
  93b626c)`**. Never "the local build", never "the tree", never a build date — an artifact named by
  when it was built is not identifiable, and identifiability is the whole of what T2 delivers (D9).

  `<scratch>` is the session scratchpad; `<repo>` is the absolute repository path. The server runs on
  `http://127.0.0.1:3100` and is the `--artifact local` host for T3, T4, T5 and T8. **No `git`
  command that writes to the repository is used** — `archive`, `rev-parse` and `status` all read.

  **(b) Provenance, both hosts, recorded as counts** (AC7). For each of
  `https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app`,
  `https://workload.devrma.com` and `http://127.0.0.1:3100`, on `/` and `/custo-da-hora`, record the
  occurrence count of each marker:

  | Marker | Why it is in the set |
  |---|---|
  | `Informe o seu sal` | E5's discriminator: `0` on production, `1` on the preview |
  | `lg:col-span-7` | the shifting box exists in the bytes |
  | `Regime de Trabalho` | the implicated `<legend>` is server-rendered |
  | `flex w-full items-center justify-between` | the implicated `BUTTON` is server-rendered |

  **(c) The verdict sentence AC7 requires**, in `artifacts.md`: which build each host serves,
  established **by the marker counts and not by the URL**. If `workload.devrma.com` does not match
  the local build's counts, it is recorded as **context** and is excluded from every pass/fail
  arithmetic in AC1–AC5, in those words (lesson **032**).

  **(d) The measurement path, per host, one line each** (lesson **037**, D7): whether the request
  traverses this machine's TLS-intercepting egress proxy. Record the certificate issuer returned by
  `curl -vI <host>` for the two remote hosts and note that `127.0.0.1` bypasses it. The sentence to
  write is *"deployment and local differ in bytes **and** in path; a delta between them is not
  attributable to source"*, and it is the sentence T3's report cites when the two artifacts disagree.

- **Tests:** none — no source file. The check is `artifacts.md`: three hosts × two routes × four
  markers = **24 counts**, none missing, each traceable to a line in `artifacts-raw.log`.
- **Done when:** `artifacts.md` carries the 24 counts, the per-host build verdict, the path sentence,
  **and the three provenance lines D9/D10 require — the pin SHA, the tree hash as printed by
  `git rev-parse`, and the `sha256` of `git archive $LOCAL_PIN`** — plus the porcelain snapshot under
  its context sentence; `http://127.0.0.1:3100/custo-da-hora` returns 200 with `lg:col-span-7`
  present. `pnpm check` green (unchanged). Advances **AC7**.

---

### T3 — The baseline rate: sixteen dark cells, then the light stage

- **Files:** `.specs/0008-…/evidence/shift-rate.md` (create) ·
  `.specs/0008-…/evidence/shift-rate-dark.log` (create) ·
  `.specs/0008-…/evidence/shift-rate-light.log` (create)
- **Depends on:** T1, T2
- **Reuse:** `evidence/shift-rate.mjs` from T1, **unmodified**. If this task needs a probe change,
  that change invalidates T1's calibration and the calibration cell is re-run.
- **What to build:**

  **(a) The dark pass — 16 cells, `n = 20`, 320 loads.**

  ```
  node evidence/shift-rate.mjs --artifact deploy --host <preview> --theme dark \
    --runs 20 --log evidence/shift-rate-dark.log --skip-completed
  node evidence/shift-rate.mjs --artifact local --host http://127.0.0.1:3100 --theme dark \
    --runs 20 --log evidence/shift-rate-dark.log --skip-completed
  ```

  Expect roughly an hour per artifact under 4× throttle. `--skip-completed` means an interruption
  costs the current cell and nothing else. **Do not reduce `n`, do not parallelise the loads, and do
  not run anything else on the machine while it runs** — `n` is fixed at 20 inside the criterion
  (lesson **014**) and the throttle is calibrated against an idle CPU.

  **(b) The light stage, by the rule and by D3.** Repeat, with `--theme light`, every cell in which
  the dark pass recorded ≥1 `layout-shift` entry of any value. **If the dark pass recorded no entry
  anywhere, repeat all eight `/custo-da-hora` cells instead.** The report names which of the two
  rules fired and lists the cells the rule selected, before the numbers.

  **(c) `shift-rate.md`.** Required contents, and a missing one is not a formatting defect but an
  unmet criterion:

  - One row per cell: the cell key, the denominator **20**, and D5's three counters.
    **16 dark rows, plus the light rows, plus the X6 rows from `STATUS.md` marked `merged from 0004
    T1/X6`**, and the `/` X6 rows labelled **`partial seed`** (D2). No cell with a denominator other
    than 20, no cell omitted.
  - Every load's `sumCls` as printed, and every `layout-shift` entry's `sources` **verbatim**.
  - **AC2's four sentences per route**, in the exact form *"CLS > 0.1 occurred in X/20 seeded loads
    and Y/20 empty loads at VIEWPORT on ARTIFACT"*, for all four viewport × artifact combinations,
    with X and Y present **even when zero**. Eight sentences in total. A sentence with a missing
    side is a failure of AC2 and not a typo.
  - The **zero-box counter** per cell, reported beside the other two and never merged into them.
  - Every `TIMEOUT` or `COLUMN_COUNT` flag, with its cell.
  - The sentence from T2(d) wherever a deployment cell and its local twin disagree.

  **Stop conditions, each with its own destination** (§2 consequence 2):

  | What the run shows | What the task does |
  |---|---|
  | The deployment × 390 × seeded × `/custo-da-hora` cell reproduces | proceed to T5 |
  | That cell is `0/20` but another cell reproduces | proceed to T5, which experiments on **that** cell; record the change of subject in `STATUS.md` |
  | **No cell reproduces anywhere, in either theme, on either artifact** | **stop.** Do not experiment, do not remedy. Report to `tech-lead`: a defect that will not reproduce in 320 + 160 loads is a `STATUS.md` impasse for the human, not a bug to guess at. It is also a finding about X6, whose 5/20 it would contradict |
  | A source names a node inside `ad-manager.tsx`, `google-ad.tsx` or `cookie-consent.tsx` | that file enters § Scope item 5 **by `spec.md`'s own override, without a bounce**. Name the source line that did it, in `shift-rate.md` |

- **Tests:** none — no source file. The check is the report's own row count: a reviewer counts 16
  dark rows at `n/20`.
- **Done when:** `shift-rate.md` carries every item of (c); both logs are complete; every cell in the
  dark table has three counters and a denominator of 20. `pnpm check` green (unchanged).
  Advances **AC1**, **AC2**.

---

### T4 — The pre-remedy baselines that cannot be taken after the remedy

- **Files:** `.specs/0008-…/evidence/pre-remedy/innertext-<route>-<storage>.txt` (create, 4 files) ·
  `.specs/0008-…/evidence/pre-remedy/two-target-geometry.log` (create) ·
  `.specs/0008-…/evidence/pre-remedy/hero-swap-geometry.txt` (create) ·
  `.specs/0008-…/evidence/two-target-geometry.mjs` (create)
- **Depends on:** T2
- **Reuse:** `.specs/0008-…/evidence/g3-geometry.mjs` — **`two-target-geometry.mjs` is that file with
  two changes and no others**: the viewport list becomes `390x844`, `1024x768`, `1440x900`, and the
  host and seed come from flags matching T1's. `.specs/0004-lcp-render-delay/evidence/hero-swap-geometry.mjs`
  — run **unmodified**, as AC8 requires.
- **What to build:**

  **(a) The AC6 baseline.** `document.body.innerText` of `/` and `/custo-da-hora`, seeded and empty
  (T1's per-route seeds), sampled at 3500 ms, dark, 390×844, on the **local** artifact, with every
  node whose text matches `^\d{2}:\d{2}(:\d{2})?$` replaced by `<TIME>` before writing. Four files.
  These are the left-hand side of AC6's `diff` and **they cannot be reconstructed after the
  remedy** — that is why this task runs before any source file is edited.

  **(b) The two-target geometry, per cell.** For each of `{/, /custo-da-hora}` × `{390x844,
  1024x768, 1440x900}` × `{dark, light}` × `{seeded, empty}` × `{deploy, local}`, load twice:
  `javaScriptEnabled: false` (the server paint, **Target 1**) and settled at 3500 ms (**Target 2**),
  and print the `docTop`/`h`/`w` of: the column, the aside, the regime button, the hours-input
  wrapper, the briefcase icon, `#main-content`, and `document.documentElement.scrollHeight`.

  This produces `(ΔtopC, ΔheightC)` **per cell**, which is the exemption §1.2 recommends to AC5 and
  the number T8 scores against. Expected, from `design.md` §A.3: `−47.7 / −147.0` at 390 on
  `/custo-da-hora`, `0 / −126.0` at 1440, `0 / −140.4` on `/` at both. **These are predictions**
  (lesson **026**): the 1024 column and every `/` cell under D1's new journey seed are **unmeasured**,
  and a value that is neither the prediction nor within a pixel of it is a **finding** to record and
  raise before T5 starts — not a number to make agree.

  **(c) The AC8 baseline.** `node .specs/0004-lcp-render-delay/evidence/hero-swap-geometry.mjs`, run
  **unmodified** against the same host, output captured verbatim. AC8 compares this line by line with
  the post-remedy run, against `design.md` **I7**'s four numbers — `0 px / 0.0000` on `/`;
  `16.3 / 0.0099` (`hour`), `47.6 / 0.0481` (`month`), `60.4 / 0.0544` (`year`) on `/custo-da-hora`.

- **Tests:** none — no source file. The check is file count and completeness: 4 `innertext-*.txt`
  files, 48 two-target cells with both sub-loads, and a `hero-swap-geometry.txt` with I7's four rows.
- **Done when:** the four files exist and every cell of (b) printed both sub-loads; every predicted
  delta is recorded beside its measured one with any discrepancy flagged. `pnpm check` green
  (unchanged). Advances **AC5**, **AC6**, **AC8**.

---

### T5 — The diagnosis (AC3). This task edits no source file and names no remedy

- **Files:** `.specs/0008-…/evidence/frame-stream.mjs` (create) ·
  `.specs/0008-…/evidence/diagnosis.md` (create) ·
  `.specs/0008-…/evidence/diagnosis-raw.log` (create)
- **Depends on:** T3 (which cell to experiment in is T3's output, never an assumption), T2
- **Reuse:** `evidence/shift-rate.mjs`'s context/seed/throttle/observer setup — `frame-stream.mjs`
  adds a per-frame sampler to it and changes nothing else. `evidence/g2-copresence.mjs`'s
  `requestAnimationFrame` pattern.
- **What to build:**

  `frame-stream.mjs` takes the same flags as `shift-rate.mjs` plus `--experiment <A|B|C|D|E>`, and
  installs, via `addInitScript`, a `requestAnimationFrame` loop that records **every frame** until
  4000 ms: `Math.round(performance.now())` and, for each of the column, **the column's
  `firstElementChild` (the card — its box is not among the recorded shift sources and `design.md`
  §A.5 is 401.9 px short without it)**, the aside, the regime button, the hours-input wrapper, the
  briefcase icon and `#main-content`: `top`, `height`, or the token `MISSING`. Plus, per frame, the
  column's `childElementCount` and `textContent.length`. Keep it in a plain array in the page and
  read it out once at the end; **do not serialise per frame**.

  **The five experiments. Each one is an observation; none of them is a cause, and this task's report
  may not contain a cause that no experiment here discriminates.**

  | # | Experiment | The question it answers |
  |---|---|---|
  | **A** | The reproducing cell, `n = 20`, frame sampler on. For every reproducing load, dump the 15 frames either side of the shift's `t`, plus the `outerHTML` of the column at the first frame whose column `top` is within 1 px of **84** and at the frame after it | **What is actually in the anomalous frame?** The full set of boxes that changed between frame `k−1` and `k`, including the elements the `layout-shift` sources do **not** name |
  | **B** | The same cell, `n = 20`, sampler on, **counters compared with T3's for the identical cell** | **Does the instrument perturb the defect?** If the rate collapses with the sampler on, the sampler is not measuring this defect and A's frames describe something else. This is a finding, and the diagnosis may not proceed on a perturbed instrument (`AGENTS.md` §5) |
  | **C** | Two new conditions, `n = 20` each: **(i) warm, unseeded** — perform the prior navigation to `/`, then `localStorage.clear()` in that same page before closing it; **(ii) cold, seeded** — no prior navigation, values injected with `addInitScript` | **Splits D4's confound.** "Seeded" has always meant *stored values* **and** *a prior navigation*. Two conditions, two rates, and the axis stops being two changes reported as one |
  | **D** | On every reproducing load of A, record `performance.now()` at: `navigationStart`, FCP (`PerformanceObserver` on `paint`), the first mutation inside `#main-content` (`MutationObserver`, `subtree: true`), the first frame in which `p[aria-live="polite"]`'s text equals the restored value, and the shift's own `t` | **Where in the load does the anomalous frame sit** relative to first paint and to the restore? Five timestamps, one quantity (`performance.now()`), no inference |
  | **E** | The same cell with `javaScriptEnabled: false`, `n = 5` | **The server-paint control.** `design.md` **K1** says the intended geometry is fully determined by the server bytes; an event here would refute that and is a finding that outranks every other row |
  | **F** *(added at run 2, D12/D14)* | **A, repeated on `/`**: `--route / --storage seeded --viewport 390x844 --theme dark`, D1's **journey** seed, `n = 20`, sampler on, plus **E on `/`** at `n = 5`. Dump the same frames and the same `outerHTML` pair for every load whose column reaches `top` within 1 px of **84** | **Is the `/` occurrence the same event?** `/` reproduced at **1/20** with the identical `top=84` signature, and `hero-swap-geometry.mjs` printed `CLS 0.5076` on `/` light 390 under a third seed. Two routes, one shared `DIV.lg:col-span-7` (`components/templates/calculator-layout.tsx:17`), different collapsing children — four `DIV.relative` input wrappers on `/`, the regime button + wrapper + icon on `/custo-da-hora` |

  **How F is read, and it is narrower than A** (D14). F's output is **qualitative**: whether an
  anomalous frame occurs, and which boxes are `0,0` in it, against `/`'s own Target 1
  (`771.4 / 1674.4` at 390 — with the caveat that `design.md` §A.3's `/` row is under **B5** as stale
  against D1's seed, so F records `/`'s own JS-off paint from E rather than quoting §A.3). **No rate
  is compared on `/`**: at 1/20, `n = 20` has no power to detect the sampler's perturbation, so
  **B is not run on `/`** and no sentence in `diagnosis.md` compares a `/` rate before and after
  anything. If F produces no anomalous frame in 20 loads, that is recorded as *did not reproduce in
  this sample* and **not** as evidence that `/` is unaffected (`AGENTS.md` §5).

  **`diagnosis.md` must contain:**

  1. **AC3's sentence**, in the exact form *"the form column shifts because ARTEFACT does THING under
     CONDITION"*, **explaining the `prev` frame — `top 84, height 632`, 523 px too high and 568.7 px
     too short (C1)** — and not the `cur` frame.
  2. **The experiment that proves it** and **the experiment that would have refuted it**, each named
     from A–E with the numbers it printed. A cause with no refuting experiment named fails AC3
     "whether or not it is true".
  3. The account of the missing height: `568.7 px`, of which the three zero-size children are at most
     `166.8`. A diagnosis that does not reach the remaining `401.9 px` is incomplete on its face
     (`design.md` §A.5).
  4. Every experiment that was run and what each returned, **including the ones that discriminated
     nothing.**
  5. **No remedy, no file to edit, no fix.** That is §6's, and a diagnosis that arrives with a patch
     attached has stopped being falsifiable.
  6. **A verdict on the two routes, in one of exactly two forms** (D13, D14), because three sightings
     on `/` now have to be accounted for:
     - *"one event, both routes"* — then AC3's single sentence covers both, and the sentence must
       name the shared artefact and explain why the collapsing children differ per route; **or**
     - *"two events"* — then `diagnosis.md` carries **one sentence per reproducing route**, each with
       its own proving and refuting experiment, **and names the experiment that discriminated them**.
       A claim that they are different events with no experiment separating them fails item 2.

     Whether AC3's *"one sentence"* wording admits the second form is `product-manager`'s and is open
     as **B4**. **It blocks no experiment**: A–F run either way, and `diagnosis.md` is written in
     whichever form the experiments land in, with B4 deciding only how AC3 scores it.

  **Stop condition.** If no experiment discriminates, **say so and stop**: list the experiments, their
  outputs, and hand it to `tech-lead`, who writes the impasse into `STATUS.md` for the human. This is
  `spec.md` AC3's own instruction and it is the expected outcome in a real fraction of cases; it is
  not a failed task.

- **Tests:** none — no source file. The check is `diagnosis.md`'s six required contents.
- **Done when:** `diagnosis.md` carries items 1–6 **or** the stop condition's write-up; **A–F** have
  all run and their stdout is in `diagnosis-raw.log`; **the before/after snapshot of the tree is
  byte-identical** — run `git status --porcelain -- app components hooks lib && git diff -- app
  components hooks lib | sha256sum` **at the start of the task and again at the end**, paste both,
  and they must match. An empty porcelain is no longer the check, because specs `0004` and `0007`
  hold uncommitted edits in those directories that are not this task's and never will be
  (**B2**, D10; amended at run 2). `pnpm check` green (unchanged). Advances **AC3**, and is the gate
  on every task in §6.

---

### T5b — The frame record experiment A was specified to produce, and did not. Edits no source file, names no remedy

> Issued at the §6.1 checkpoint, run 1 (**§6.1.1**, D16–D19). It is the **bounce, 1 of 2**, on the
> build gate. It re-runs two experiments with a working instrument; it does **not** re-open the
> diagnosis' scope, add a route, a cell or a criterion, and it **names no cause** (lesson **032**).

- **Files:** `.specs/0008-…/evidence/frame-stream.mjs` (edit) ·
  `.specs/0008-…/evidence/frame-coverage.log` (create) ·
  `.specs/0008-…/evidence/diagnosis-raw.log` (edit — **append only**, nothing deleted) ·
  `.specs/0008-…/evidence/diagnosis.md` (edit — corrected **in place**, the way T5's own D
  correction was made)
- **Depends on:** T5
- **Reuse:** `evidence/frame-stream.mjs` as it stands — `loadWithRetry`, the seeds, the CDP throttle,
  the two `PerformanceObserver`s and the `SEED_BY_ROUTE` table are all **unchanged**;
  `evidence/shift-rate.mjs`'s `nodes=k/4` census line is the shape (b)'s vacuity guard is copied
  from, not re-invented. **No new instrument file, no new dependency** (§4, **R12**).
- **Standing rules that bind this task:** §5's two — one measurement in flight on this machine at a
  time, and every load accounted for. Before any measurement, `uptime`'s `load1` under **8** and
  `pgrep -f chrome-headless-shell` empty, as T5's own D re-run did. **No source file under `app/`,
  `components/`, `hooks/` or `lib/` is opened or edited**, and **R3** stands: nothing here touches
  `cur`, because nothing here touches the product at all.
- **What to build:**

  **(a) The positive control for the frame sampler, and it runs before anything is re-run.** One
  load, `--route /custo-da-hora --storage seeded --viewport 390x844 --theme dark`, deploy artifact,
  sampler on, printed to `frame-coverage.log`. Print, on one line each and with these exact tokens:

  - `framesLength=<n>`
  - `firstFrameT=<ms|NONE>` · `lastFrameT=<ms|NONE>` · `maxGapMs=<ms|NONE>` — the largest difference
    between consecutive `frame.t`
  - `marks=<JSON of window.__marks, in full>`
  - `mainContentAtInit=<true|false>` — whether `document.querySelector("#main-content")` was non-null
    at the moment the `MutationObserver` was installed (`frame-stream.mjs:78`), printed from a new
    `window.__mainContentAtInit` boolean set on that same line and read back with the marks
  - `initScriptCompleted=<true|false>` — a `window.__initDone = true` written as the **last**
    statement of `FRAME_SAMPLER_INIT`, read back the same way. This is the one line that separates
    *the RAF loop never ticked* from *the init script never reached `requestAnimationFrame(tick)`*,
    and the two have different fixes

  **Stop condition, and it is the whole of (a)'s gate:** if `framesLength=0`, **do not run (c) or
  (d)**. (b) is the entire task until this line prints a non-zero `framesLength` on a load that also
  prints `marks` containing `FCP`.

  **(b) Fix the instrument, with a red run and a green run pasted.** Permitted change: the
  installation and read-back of the frame sampler, its marks and the new vacuity tokens **only**. No
  experiment's semantics, no seed, no throttle, no `n`, no selector, no threshold changes — the same
  discipline T5 applied to the `loadWithRetry` fix. Then:

  - **Green:** one load printing `framesLength >= 60` (≈4000 ms of frames at any plausible cadence
    under 4× throttle — a floor, not a target: a number between 1 and 59 is a **finding** about
    cadence, printed with its `maxGapMs`, never rounded up to "it works"),
    `FIRST_MUTATION_MAIN_CONTENT` a number rather than `MISSING`, and `FCP` present in the same load.
  - **Red, and it is not optional** (the shape `plan.md` T6's negative control already sets): run the
    same load once with the RAF loop deliberately prevented from ticking, in a throwaway edit, and
    confirm the load prints `SAMPLER_EMPTY` and is **flagged**, not silently counted. Remove the
    throwaway edit and paste both outputs.

  **The vacuity guard added by (b) is permanent**, on every experiment that reads frames: a load with
  `framesLength === 0` prints `SAMPLER_EMPTY`, is flagged, and a cell carrying any such flag says so
  in the report. This is the guard `plan.md` T5 should have carried and did not (§6.1.1).

  **(c) Re-run A and F.A, `n = 20` each, unchanged in every other respect.** Same cells as T5:
  A on `/custo-da-hora / seeded / 390x844 / dark`, F.A on `/ / seeded / 390x844 / dark` under D1's
  journey seed. Appended to `diagnosis-raw.log` under `=== EXPERIMENT A RERUN (T5b) BEGIN n=20` and
  `=== EXPERIMENT F.A RERUN (T5b) BEGIN n=20`. Per load, **reproducing or not**, one coverage line
  carrying `framesLength`, `firstFrameT`, `lastFrameT`, `maxGapMs`. Per **reproducing** load, and
  this is the deliverable T5 was specified to produce:

  - the **15 frames either side** of the shift, `frame[i] <JSON>` per line, exactly the emit loop
    already at `frame-stream.mjs:205-206`;
  - `frameIndex`, **renamed in the output to `firstFrameAtOrAfterShift`**, because the name
    `frameIndex` is what was read at T5 as *the frame at `top ≈ 84`* and it is not that;
  - `anomalyFrameFound=<true|false>` with, when true, the frame's `t` and the `outerHTML` pair, and
    when false, the **two frames bracketing the shift's `t`** printed in full, so that *"no frame at
    `top ≈ 84`"* is a statement with the neighbouring frames beside it rather than a bare `-1`.

  **(d) Re-run D, `n = 20`, printing all five marks on every load.** `navigationStart` is
  `performance.now()`'s own time origin and prints as the literal `0` with that said in the report —
  a mark that is zero by definition is recorded as such, never omitted. The four others print their
  value or `MISSING`. **Every load prints its line, reproducing or not**, so the 19 non-reproducing
  loads' `FCP` values exist and *"the shift fires before FCP"* has a distribution to be read against
  instead of three isolated loads. A load with `framesLength > 0` that still prints
  `FIRST_MUTATION_MAIN_CONTENT=MISSING` is a **finding** reported as such, not a datum.

  **(e) The `/` empty node census `design.md` §A.3.3 routed into experiment F, which F did not
  print.** §A.3.3 names it verbatim: *"load `/` empty at 390 twice — `javaScriptEnabled: false`, then
  settled — and diff the node census, not the CLS log."* Two loads, `/`, 390×844, dark, **empty**
  storage, deploy artifact. Print for each load, per node, `tag#id.class w×h docTop` or `MISSING`:
  the column (`.lg\:col-span-7`), **every `input`'s `parentElement` inside the column**, the count of
  `column.getByRole("textbox")`-equivalent `input`s, `svg.tabler-icon-login`, the aside and
  `#main-content`. Diff the two lists and state, in `diagnosis.md`, **which nodes differ and whether
  any node present in the server paint is absent at 3500 ms** — §A.3.3 says a mount difference and a
  reflow are the two readings and that **neither is named as a cause here** (`spec.md` § Non-goals,
  lesson **032**). The quantity this discriminates is `/`'s empty-cell `Δ = 0 / −34.00`.

  **(f) Correct `diagnosis.md` in place.** The sections that change, and nothing else: §1–2 (A's
  null), §3's sentence about the card's box, §4's **A**, **B** and **D** rows, §6's verdict re-stated
  against the new record, and the sentence citing *"frame dumps … lines 1–38"*. The superseded text
  is replaced, the superseded **raw output is kept** — the T5 handling, unchanged. Add one line
  naming §6.1.1 as the ruling that ordered the re-run.

  **(g) One row `diagnosis.md` does not currently carry, and an account of the anomaly needs it: the
  anomalous frame's `top` is invariant and its `height` is not.** Six sightings on the record —
  `84,632`, `84,632`, `84,632`, `84,383` (A, `/custo-da-hora`), `84,438` (F.A, `/`), `84,760`
  (T3, `/`). `top = 84` in all six; `height` takes four distinct values. §6's two-route verdict
  reasons from the invariant half only. State both halves as measured quantities. **Name no cause**
  — whether the varying height is content mounted at different instants or something else is exactly
  what (c)'s frame record is being re-run to show.

  **What this task may not do**, restated because a developer with a working sampler and a
  reproducing load is one step from it: **name a cause, name a file to edit, or propose a fix.**
  That is §6's, at the next checkpoint, and it is `tech-lead`'s. A `diagnosis.md` that arrives with a
  patch attached has stopped being falsifiable (T5, unchanged).

- **Tests:** none in `__tests__/` — this task creates and changes no source file, and
  `frame-stream.mjs` is gitignored evidence (D8). Its checks are the logs below.
- **Done when:**
  1. `frame-coverage.log` carries (a)'s six tokens and (b)'s green **and** red runs;
  2. every reproducing load of (c) carries at least one `frame[...]` line, **or** an explicit
     `SAMPLER_EMPTY` flag — never neither;
  3. every load of (c) and (d) carries its coverage line and its marks line, reproducing or not;
  4. (e)'s two censuses and their diff are in `diagnosis.md`;
  5. `diagnosis.md` is corrected in place per (f) and carries (g)'s row;
  6. `git status --porcelain -- app components hooks lib && git diff -- app components hooks lib | sha256sum`
     taken **at the start of the task and again at the end**, both pasted, and **matching** — the
     valid pair T5 §7 could not form, and if a sibling spec's edit lands in the interval the
     mismatch is recorded with both porcelain listings exactly as T5 recorded its own;
  7. `pnpm check` green (unchanged — no tree file is touched).

  Advances **AC3**, and is the gate on the §6.1 checkpoint, which re-opens on this task's output.

- **The stop condition, and it is the outcome the checkpoint expects in a real fraction of cases:**
  if (c) runs with a demonstrably live sampler — `framesLength` non-zero on every load, `maxGapMs`
  printed — and **still** captures no frame at `top ≈ 84`, then say exactly that and stop. **That is
  the null result §6.1 row 3 needs and T5 could not supply**, and it is handed to `tech-lead` with
  the bracketing frames beside it, not re-experimented at the keyboard.

---

### T6 — The LR6.1 co-presence sampler and its negative control

- **Files:** `.specs/0008-…/evidence/lr6-copresence.mjs` (create) ·
  `.specs/0008-…/evidence/lr6-baseline.log` (create) ·
  `.specs/0008-…/evidence/lr6-negative-control.log` (create)
- **Depends on:** T2
- **Reuse:** `.specs/0008-…/evidence/g2-copresence.mjs` — its marker table and its
  `requestAnimationFrame` sampler are the calibrated ones (`legal.md` §4.2's worked measurement was
  taken with them) and are copied verbatim. `legal.md` §1.4 for the state that renders each surface.
- **What to build:**

  `legal.md` §4.2 makes LR6.1 binding and §7 **V1** makes it a G6 verification; `qa-engineer` runs
  it, and this task is what stops it from being built twice. The quantity is
  `Math.round(performance.now())` at the **animation frame** in which `document.body.innerText`
  first contains the string, sampled from navigation commit to 4000 ms after `load`. One quantity,
  both sides.

  **The six pairs, and the state that renders each** (`legal.md` §4.2's table and §1.4's states):

  | Pair | Disclosure marker | Claim marker | State |
  |---|---|---|---|
  | DS1 P1–P4 | `Tudo o que você digita`, `Os valores são uma estimativa`, `Não entram na conta`, `Tabelas de INSS e IRRF` | `/R\$ ?[0-9]/` — any computed currency | any |
  | DS2 | `/DSR \(Súmula 172/` | `/Domingos\|Descanso\|DSR/` row value | `/`, journey seed (T1's `/` seed) |
  | DS5 | `Informe a carga horária mensal` | the hourly value its absence blocks | `/custo-da-hora`, `monthlyHours="0"` |
  | DS6 | `A carga mensal não combina` | the hourly value under the disputed divisor | `/custo-da-hora`, `monthlyHours="240"`, `workMinutes="480"` |
  | DS7 art. 59 | `Você passou de 2h extras hoje`, `O art. 59 da CLT limita` | the journey figures in `day-summary` | `/`, journey seed |
  | DS7 art. 71 | `Seu intervalo ficou abaixo de 1 hora` | same | `/`, journey seed (lunch 30 min) |

  Cells: 390×844 and 1024×768, **both themes**, **both routes**, **both storage conditions**, on the
  artifact T3 measured. Print, per pair per cell, `frameIndex(disclosure) − frameIndex(claim)` and
  assert **`≤ 0`**. **Assert the set size before iterating**: six pairs expected; a pair whose
  disclosure never appears prints `UNREACHED` and is counted separately, so that
  `measured + unreached = 6` is checkable (`AGENTS.md` §5). `legal.md` §8 **Q3**'s art. 66 warning is
  already on the record as unreached and stays a `qa-engineer` item — do **not** substitute an
  arithmetic bound for a reading (lesson **031**).

  **The negative control, and it is not optional.** `legal.md` §4.2: *"a sampler that cannot report a
  positive delta cannot fail LR6.1, and an LR6.1 that cannot fail is decoration."* Run the same
  sampler with the disclosure marker replaced by the header clock's text, which changes every second,
  and **paste the output showing a delta greater than 0**. Without that log the instrument is not
  trusted and V1 cannot close.

- **Tests:** none — no source file. The checks are the two logs and the `measured + unreached = 6`
  arithmetic in each cell.
- **Done when:** `lr6-baseline.log` carries every pair in every cell with its delta and its
  set-size line, and `lr6-negative-control.log` shows a delta `> 0`. `pnpm check` green (unchanged).
  Advances `legal.md` §7 **V1**; carries no AC of its own.

---

### T7 — The committed guard: no node in this subtree has a zero box, at any viewport, in either theme

- **Files:** `tests/e2e/column-stability.spec.ts` (create)
- **Depends on:** none
- **Reuse:** `tests/e2e/responsive.spec.ts` — the overflow and off-viewport evaluations are copied
  from it rather than re-derived. `tests/e2e/support/legibility.ts` — `availableContentWidth` for the
  width floor. `tests/e2e/wide-viewport.spec.ts` — the `test.use({ viewport })` per-describe idiom.
- **What to build:**

  This is the durable half of `design.md` §B and **K1** — *no element in this subtree has a
  legitimate zero box in any state, at any paint, ever* — and it is the instrument AC9 names. It is
  cause-independent, which is why it is written now and not after the diagnosis.

  A spec file, **no comments**, English identifiers, exporting nothing. Structure:

  ```ts
  const VIEWPORTS = [
    { name: "320", width: 320, height: 568 },
    { name: "390", width: 390, height: 844 },
    { name: "1024", width: 1024, height: 768 },
    { name: "1440", width: 1440, height: 900 },
  ] as const;
  const THEMES = ["light", "dark"] as const;
  const ROUTES = ["/", "/custo-da-hora"] as const;
  ```

  For each `viewport × theme` (`test.use({ viewport, colorScheme })` inside nested
  `test.describe`), for each route, three tests:

  1. **`never scrolls horizontally`** — `documentElement.scrollWidth - clientWidth <= 0`, copied
     from `responsive.spec.ts`.
  2. **`keeps every control reachable inside the viewport`** — copied from `responsive.spec.ts`.
  3. **`gives every element of the form column a non-zero box`** — the both-sided half
     (lesson **016**). Query that route's census (below), assert the set size is **exactly that
     route's number, before iterating**, and assert for each node that `width > 0 && height > 0`.
     Then assert the column's own width is `>= Math.min(320, availableContentWidth(column))` — the
     same floor shape `assertLr1` uses, so the rule and the existing legibility guards read one
     quantity.

  **The census is per route, and each route's expected size is a literal in the file** (D11, **B3**).
  The run-1 wording asserted `/custo-da-hora`'s four nodes "for each route" and was red on 16/96
  cases because three of the four do not exist on `/` — a structural fact, not a flake. **The exact
  set-size assertion stays; it is the thing that turns a renamed class into a red test.** What
  changes is that it is stated once per route:

  | Route | Expected size | The nodes, and how each is located |
  |---|---|---|
  | `/custo-da-hora` | **exactly 4** | unchanged, `spec.md` AC4's four: the column by `.lg\:col-span-7`; the regime control by `button[aria-controls="regime-options"]`; the hours wrapper by `#horas-mensais`'s `parentElement`; the icon by `svg.tabler-icon-briefcase` |
  | `/` | **exactly 10** | the column by `.lg\:col-span-7` (**1**); **every `input`'s `parentElement`** — the `div.relative` of `components/atoms/input.tsx:10` — for each `textbox` inside the column (**8**); the "Entrada" label icon by `svg.tabler-icon-login`, scoped to the column (**1**) |

  **Where `/`'s ten come from, derived by listing the source and not by relaxing `/custo-da-hora`'s**
  (`AGENTS.md` §5; commands run this session in the repository, read-only):

  - `components/organisms/work-calculator.tsx:173-210` puts exactly `JourneyForm` and `DaySummary`
    in `CalculatorLayout`'s `main`.
  - `components/organisms/journey-form.tsx:184-219` renders **four** `DateTimeInput`s outside any
    panel; `components/molecules/date-time-input.tsx:73-87` renders **two** `MaskedInput`s each, and
    `components/molecules/masked-input.tsx` renders one `Input` each → **8 `div.relative` wrappers**,
    present in both storage states.
  - `components/organisms/day-summary.tsx` renders **no** input (`grep -n "Input" day-summary.tsx` →
    only `AlertBanner` imports), so no textbox outside those eight is inside the column.
  - `CollapsiblePanel` **unmounts** its children when closed (`components/atoms/collapsible-panel.tsx:15`
    — `isOpen ? … : null`), and the journey settings panel starts closed
    (`journey-form.tsx:72` — `useState(false)`), so the panel's three fields are not in the DOM and
    the census has no closed-panel exemption to carry. A test that opens a panel is out of this
    task's scope.
  - `IconLogin` is used **once** inside the column (`journey-form.tsx:187`, the "Entrada" label) and
    nowhere in `day-summary.tsx`; `@tabler/icons-react` emits
    `className="tabler-icon tabler-icon-login …"` (`node_modules/@tabler/icons-react/dist/esm/createReactComponent.mjs:20`,
    `icons/IconLogin.mjs` → icon name `login`). `IconRotate` is used twice on `/` and is deliberately
    not the one chosen.

  **Assert the textbox count on `/` separately, before deriving the wrappers**: `column.getByRole("textbox")`
  must resolve to **exactly 8**, and each wrapper is that input's `parentElement`. A census that
  silently shrinks is the failure mode this whole clause exists to catch, and on `/` it can shrink in
  two independent ways (a field removed, or a wrapper element dropped from `Input`).

  **`/`'s census is a test-strategy decision derived from source, not a design change.** `design.md`
  **K1** — *no element in this subtree has a legitimate zero box* — is written route-independently,
  and `design.md` never enumerated `/`'s nodes. If `product-designer` wants a different set for `/`,
  it arrives through **B5** and this table is amended; it is not widened at build time.

  Run each route **twice**, once with storage empty and once with T1's per-route seed applied through
  `page.addInitScript` before the first `goto` — the defect condition is the seeded one and a guard
  that only ever sees the empty state is a guard that would have missed this spec entirely.

  **On `/custo-da-hora`, locate each node by the selector `spec.md` AC4 names**, because the
  criterion is written about those four nodes and a test that resolves a different element is not
  measuring AC4: the column by `.lg\:col-span-7`, the regime control by
  `button[aria-controls="regime-options"]`, the hours wrapper by `#horas-mensais`'s `parentElement`,
  the icon by `svg.tabler-icon-briefcase`. Everything
  the tests *drive* is queried by accessible role and name, per `AGENTS.md` §8. Each reason goes in
  the test's **name**, never in a comment — `"gives the regime disclosure button a non-zero box"`.
  **Never assert a Tailwind class string** (`AGENTS.md` §8): the column is located
  by `.lg\:col-span-7` because that is the identifier `spec.md` AC4 and `design.md` §A.2 both name,
  and the assertion is on its **box**, never on its class list. The set-size assertion is what turns
  a renamed class into a red test instead of a silent pass.

  **The seen-red proof, required before the task is done, and it is now one per route**
  (`AGENTS.md` §5 — *name the input that would make it fail*; D11): run the suite once with a
  throwaway `page.addInitScript` injecting `svg.tabler-icon-briefcase { display: none }` and confirm
  test 3 fails **on `/custo-da-hora`**; run it once with `svg.tabler-icon-login { display: none }`
  and confirm it fails **on `/`**. A route whose census was never seen red is a route whose guard is
  unproven, which is exactly how the run-1 wording shipped a `/` clause nobody had run. **Remove the
  init script**, and paste all four outputs (two red, two green) into the task's report.

  **Where the suite runs** (D9): the isolated copy stays, and it is built from the same pin —
  `git archive 5c0c6fa` (tree `93b626c`), `node_modules` hard-linked or symlinked, its own `.next`,
  a port confirmed free with `ss -ltnp`, `--project=chromium`. The new spec file is copied into the
  extracted tree after extraction, since it is not in the pinned commit. Never while a probe is in
  flight (§5's first standing rule).

- **Tests:** this task **is** the test. `tests/e2e/column-stability.spec.ts` — 4 viewports × 2 themes
  × 2 routes × 2 storage states × 3 assertions = **96 cases**, every case named for the state it
  measures.
- **Done when:** `pnpm e2e tests/e2e/column-stability.spec.ts` green on all **96** cases in the
  isolated copy; both seen-red runs recorded, one per route; `pnpm check` green — **and
  `pnpm test __tests__/comment-free-code.test.ts` green**, which is the file's own guard against a
  comment. Advances **AC9**.

---

### T8 — Post-remedy re-measurement · **blocked until §6's remedy tasks exist and are built**

- **Files:** `.specs/0008-…/evidence/post-remedy/` (create — mirrors T3's and T4's outputs) ·
  `.specs/0008-…/evidence/remedy-verdict.md` (create)
- **Depends on:** the remedy tasks §6 issues; T3, T4, T6, T7
- **Reuse:** every instrument, **unmodified**: `shift-rate.mjs`, `two-target-geometry.mjs`,
  `lr6-copresence.mjs`, `hero-swap-geometry.mjs`, `tests/e2e/column-stability.spec.ts`. **A probe
  edited between the before-run and the after-run invalidates both**; if one must change, both runs
  are redone.
- **What to build:** the same commands as T3, T4(a)(c) and T6 against the remedied build, with the
  before/after pairs printed side by side, plus:

  | Criterion | What `remedy-verdict.md` must show |
  |---|---|
  | **AC4** | Every cell: **all 20** loads with `sumCls ≤ 0.1`, and **zero** loads recording a source naming one of the four nodes at `value ≥ 0.1`. The **zero-box counter (D5)** is reported beside it: a cell that clears AC4 while the zero-box counter stays positive is a **finding**, because the shape survived below the threshold |
  | **AC5** | The FCP/3500 ms rect pair per load against **that cell's** `(ΔtopC, ΔheightC)` from T4(b), under §1.2's wording once `product-manager` has ruled on B1. Until B1 returns, the numbers are recorded and **not scored** |
  | **AC6** | `diff` against T4(a)'s four captures, exit status 0. `legal.md` §6 **O1** makes this gate's exemption list **empty**, so any non-empty diff is a failure — there is nothing it could be excused by |
  | **AC8** | `hero-swap-geometry.mjs` line by line against T4(c) and against I7's four numbers. Any one of them raised is a regression and a bounce |
  | **AC9** | `pnpm e2e tests/e2e/column-stability.spec.ts` + `tests/e2e/responsive.spec.ts` + `tests/e2e/wide-viewport.spec.ts`, all green, plus 2560 and 3840 already covered by the wide spec |
  | **V1** | `lr6-copresence.mjs` re-run, all six pairs `≤ 0`, with the negative control's log |
  | **Coverage** | Whatever the remedy touched, at its bar: **100 % `hooks/**`**, **90 % `components/**`** (`AGENTS.md` §9) |

  **Two separate verdicts, two separate destinations** (§2 consequence 2, and the promoted rule):

  - *"the remedy made cell X worse than T3 measured it"* → **component verdict** → back to
    `frontend-dev` with the cell.
  - *"cell X is still over threshold"* → **system verdict** → back to `tech-lead`, who re-triages
    against the diagnosis; it is not automatically an implementation defect and it must not be
    reported as one.

  A run where one fires and the other does not is the run a fused verdict gets backwards.

  **The before/after local pair must differ by the remedy and by nothing else** (D9, added at run 2).
  T3's and T4's local numbers were taken on `local@5c0c6fa (tree 93b626c)`. The post-remedy local
  artifact is therefore built as `git archive 5c0c6fa` into a fresh copy, **then the remedy diff
  applied inside that copy** (`git diff 5c0c6fa -- <the remedy's files> > remedy.patch`, `sha256sum
  remedy.patch` recorded in `remedy-verdict.md`, `patch -p1 < remedy.patch` in the copy). If by T8
  the remedy sits on a base other than `5c0c6fa` — because sibling specs' work has landed — then the
  pair is invalid and **both** runs are redone against a new pin, named the same way. A before-run
  and an after-run on two different bases measure the siblings' work as well as the remedy, and
  nothing in the report could separate the two afterwards.

  **`/` is reported as its own cell, never folded into a total** (D12): its pre-remedy term is
  **1/20** on `deploy / seeded / 390 / dark`, not 0, so *"the metric dropped"* is not a verdict on
  `/` unless `/`'s own row says so.

- **Tests:** the suites above, plus whatever the remedy tasks carry.
- **Done when:** `remedy-verdict.md` carries every row, with before and after side by side, and each
  verdict labelled *component* or *system*. `pnpm check` and `pnpm build` green.
  Advances **AC4**, **AC5**, **AC6**, **AC8**, **AC9**.

---

## 6. The checkpoint — what happens when T5 lands

### 6.1 The triage `tech-lead` runs, and the three outcomes

T5's `diagnosis.md` comes back to **`tech-lead`**, never to `frontend-dev` as a licence to fix.
Three outcomes, each with its destination written now so the checkpoint is not a negotiation:

| T5 returned | Destination |
|---|---|
| A cause, with its proving and its refuting experiment, whose remedy lives in the nine files of `spec.md` § Scope item 5 | `tech-lead` amends this plan with the remedy tasks (§6.2 binds them), then `frontend-dev` builds |
| A cause whose remedy needs a file **outside** that list (and outside AC1's ad/consent self-override) | **not a licence.** `tech-lead` either widens § Scope in writing in `STATUS.md` or opens the next spec — `spec.md` § Scope item 5 says so in those words |
| No experiment discriminated | `tech-lead` writes the impasse, the options and a recommendation into `STATUS.md` and hands it to the human. **No remedy is improvised** |
| **An experiment that was specified did not produce the observation it was specified to produce** *(row added at the run-1 checkpoint, §6.1.1)* | **Not an impasse.** `tech-lead` bounces it to `frontend-dev` as a task that re-runs that experiment with the instrument's coverage printed, and the checkpoint re-opens on its output. Row 3 fires only over experiments whose own logs show they observed something. **Before ruling any of these three rows, read the raw log, not the report's summary of it** |

**The bounce ceiling is two per gate.** On a third rejection of the same gate the pipeline stops and
goes to the human (`AGENTS.md` §4).

#### 6.1.1 The checkpoint ruling, run 1 — `tech-lead`, 2026-09-19

**Verdict: none of §6.1's three rows fires yet, and the build gate is bounced once — bounce 1 of 2
(`AGENTS.md` §4).** No remedy is written. The impasse is **not** handed to the human either, and the
reason is not that the impasse looks unlikely: it is that **the finding the human would be handed is
not in the record.** Four decisions, D16–D19, and one new task, **T5b**.

| # | Decision | Ground |
|---|---|---|
| **D16** | **Experiment A recorded zero frames in every reproducing load, so its null result is not a fact about the state.** `frame-stream.mjs:201` computes `frameIndex = frames.findIndex(f => f.t >= shift.t)` — **the first sampled frame at or after the shift's timestamp**, not the frame at `top ≈ 84`, which is a separate code path (`window.__anomalyOuterHtml`, `frame-stream.mjs:113-120`). `frameIndex = -1` therefore means *no sampled frame exists at or after the shift*, and the emit loop that follows (`windowStart = max(0, -1-15) = 0`, `windowEnd = min(frames.length, 15)`) emits `frames.length` lines when `frames.length < 15`. `grep -c 'frame\[' diagnosis-raw.log` → **0**, against `grep -c 'frameIndex=' ` → **5**. Zero lines emitted with `windowStart = 0` forces `windowEnd ≤ 0`, so **`frames.length === 0`** in all five reproducing loads (A ×4, F.A ×1). The sampler did not miss the anomalous frame; **it recorded no frame at all.** `diagnosis.md` §4's *"frame dumps (15 either side) are in `diagnosis-raw.log` lines 1–38"* and *"every recorded frame shows the column at its correct geometry … between frames 118–631 ms"* describe data the cited artifact does not contain | `AGENTS.md` §5 — *zero is never a pass*, and the size of a set is asserted before it is iterated; lesson **032** |
| **D17** | **Experiment B does not repair D16, and one of its two branches voids B as well.** B compared rates (4/20 against T3's 5/20) and its premise is that the sampler was running. Two branches, and the record cannot distinguish them, because non-reproducing loads print no frame information at all (`frame-stream.mjs:211`). **(i)** The sampler ran in non-reproducing loads and died only in reproducing ones — then the instrument fails selectively on exactly the loads it exists to observe, which is a finding that outranks A's null. **(ii)** It recorded nothing in any load — then B measured whether a dead sampler perturbs the defect, and its null carries no information about the real one. **Both branches void the central claim of `diagnosis.md` §1–2**, and the corroborating evidence is the same file: the `MutationObserver` installed on `document.querySelector("#main-content") ?? document.documentElement` with `subtree, childList, characterData, attributes` (`frame-stream.mjs:78-81`) — an observer that cannot fail to fire on a hydrating Next.js page — returned `FIRST_MUTATION_MAIN_CONTENT=MISSING` in **3 of 3** reproducing loads of D, and `RESTORE_VISIBLE_IN_ARIA_LIVE` (marked only inside the `requestAnimationFrame` loop) is `MISSING` in the same 3, while the two `PerformanceObserver`s in the same init script returned `layout-shift` entries and `FCP` normally | `AGENTS.md` §5; `plan.md` §5's second standing rule — *every load is accounted for* |
| **D18** | **What survives D16/D17 is recorded, because voiding one experiment is not voiding the record.** **Stands:** **E**, 10/10 (`607 / 1200.7` on `/custo-da-hora`, `771.4 / 1674.4` on `/`, every load, JS off) — `design.md` **K1** is confirmed, not refuted. **T3/T1/B/C's rates**, which read the `layout-shift` observer and never the frame array: `/custo-da-hora` seeded 390 dark 5/20, warm-unseeded **4/20**, cold-seeded **2/20**, true-empty **0/20** — D4's confound is genuinely split and **prior navigation carries most of the effect, not stored values**. **F's signature**: `top = 84` on both routes. **Voided:** `diagnosis.md` §1–2 (A's null), §3's sentence that the card's box *"never appears in a captured frame"*, §4's A and B rows, and D's mutation/restore marks. **Weakened, not voided:** D's *"the shift fires before FCP"* — `shiftT` and `FCP` come from the two observers that demonstrably worked, and it holds in 3/3 reproducing loads across both D attempts, but it is a 2-of-5-marks claim from an instrument whose other 3 marks are unexplained, and D prints nothing for the 19 non-reproducing loads, so no FCP distribution exists to compare it against | `AGENTS.md` §5 — a pass is evidence only about the sample it measured |
| **D19** | **The component verdict and the system verdict are separated here, and they route differently.** *"The instrument that produced the null did not run"* is a **component** verdict: it belongs to `frontend-dev`, it is cheap to settle, and it is settled before anything is escalated. *"No cause is known"* is a **system** verdict: it belongs to the human, and it is handed over **only once the instrument that would have discriminated has demonstrably run**. §6.1 row 3 says *no remedy is improvised*; it does not license an impasse write-up built on an unrun experiment. A fused verdict here would have spent a human's attention on a `frame-stream.mjs` defect | the rule promoted into `.agents/agents/tech-lead.md` from lesson **010**; `AGENTS.md` §4 rule 2 |

**The partial-sample audit the checkpoint ordered, complete.** Every other experiment ran to its full
`n` and no other conclusion in `diagnosis.md` rests on a partial sample: A `n=20`, B `n=20`, C(i)
`n=20`, C(ii) `n=20`, F.A `n=20`, E `n=5` ×2, D (clean) `n=20`, each with its run lines counted in
`diagnosis-raw.log`. The crashed D at 12/20 is labelled, superseded and left in the raw log rather
than deleted, which is the right handling. **The defect found at this checkpoint is orthogonal to the
partial sample and was not caused by it** — it was present in A's very first run, before the crash.

**What the developer got right, recorded because it is the behaviour the next bounce should repeat:**
the `page.goto` retry gap was found rather than written around, the machine was allowed to clear
before the re-run, `diagnosis.md` was corrected **in place**, and the crashed run's raw output was
kept. T5b's corrections are made the same way.

**This defect is mine before it is anyone's.** `plan.md` T5's *Done when* required *"A–F have all run
and their stdout is in `diagnosis-raw.log`"* — a check on the file existing, never on the frame
record inside it being non-empty. T1's census carries a vacuity guard (`COLUMN_COUNT`, `nodes=k/4`,
*zero is never a pass*) and T6 carries a negative control that is *"not optional"*; **T5, the one
task whose deliverable is a null result, carries neither.** Recorded as lesson **064**.

### 6.2 Constraints binding on any remedy task, written before the cause is known

These come from gates that are already closed. They are **not** a menu of remedies — naming a
candidate remedy here would be exactly the pre-analysed fallback that answers *which option* without
ever answering *is this the problem*.

| # | Constraint | Source |
|---|---|---|
| **R1** | **No reserved height, on the column or on the aside, at any viewport.** No `min-h-*`, no fixed `height`, no `aspect-ratio` as a spacer, no invisible placeholder in flow. The budget at 390 is **11.2 px** seeded and **negative** empty | `design.md` **K4**, §C.3; `spec.md` § Non-goals |
| **R2** | **No skeleton, shimmer, placeholder, `aria-busy`, opacity ramp or mount animation anywhere in `#main-content`'s paint path**, and no animation added on `opacity`, `transform`, `height`, `clip-path`, `filter` or `content-visibility` between `#main-content` and the fields | `design.md` **K5**, § Motion; `spec.md` § Non-goals |
| **R3** | **The target is `design.md` §A.3's two states and nothing else.** Target 1 at every frame until the restore, Target 2 from the restore on; the only permitted changes are `−47.7 px` of top (390, the accepted I7 hero resize) and the `AlertBanner` unmount's height. A remedy that changes the `cur` frame is changing the correct state | `design.md` §A.3, §A.4 C1 |
| **R4** | **No `overflow-anchor`, no `contain`, no tree-wide CSS property** applied to suppress the symptom | `spec.md` § Non-goals |
| **R5** | **No new token, no new type step, no new curve, no new colour role.** The `--spacing-*` namespace stays empty (**I6**) and there is no fourth root-size step above 18 px (**I8**). Every gap in the subtree is eight-step; a remedy reaching its number with an off-scale value breaks the ramp | `design.md` § System change, **I6**, **I8** |
| **R6** | **No new user-visible string and no rewording of one.** AC6's exemption list from G2 and G3 is **empty**, deliberately, so the `diff` stays falsifiable. No disclosure leaves `#main-content`; none is deduplicated across the routes; none is moved into a dialog, popover, `title` or tooltip | `legal.md` §6 **O1–O4** |
| **R7** | **No `aria-hidden`, `role="presentation"` or `[hidden]` introduced to stabilise layout**, and `AlertBanner`'s `role="alert"` / `role="status"` stays exactly as it is. Tab order is DOM order and no remedy reorders the DOM — **including a CSS `order` change** | `legal.md` LR3; `design.md` § Accessibility intent |
| **R8** | **If the remedy edits `hooks/use-salary-calculator.ts` or `hooks/use-work-calculator.ts`, LR5.4 becomes a precondition.** `0004`'s **T6** — assert that no stored key is overwritten before restore, seen red by deleting the guard **in an isolated copy only** — is **written, re-issued and unbuilt** (`0004` `STATUS.md`). It is issued here **before** the remedy task, copied from `0004` `plan.md` §3 T6 **verbatim**, not rewritten. The `hooks/**` bar is **100 %** | `legal.md` §6 **O5**, §3.2; `0004` `plan.md` §7; `AGENTS.md` §9 |
| **R9** | **Every `motion` element stays inside `MotionConfig reducedMotion="user"`** at `components/templates/theme-provider.tsx:10`; a portal or a mount above the provider loses the reduced path silently and no jsdom test sees it. Any state-bound transform utility ships its neutralizer in the same state | `design.md` **K6**; `AGENTS.md` §8 |
| **R10** | **Every remedy task carries a check that fails against the pre-remedy tree**, and its red run is pasted into the task's report. A CSS override is proven by **computed style in a real browser**, never in jsdom | `AGENTS.md` §8, §5 |
| **R11** | **The `p-1.5` / `gap-1` segmented-track inset is not fixed while in the file** (`period-selector.tsx:10`, `journey-form.tsx:102`, `calculator-views.tsx:43`). It is `0004` D4, carried and unscoped, and it is a human approval point | `spec.md` § Out of scope |
| **R12** | **No new dependency**, and no lowering of any coverage bar | `AGENTS.md` §8, §9 |

### 6.3 The residual this gate accepts, records, and does not fix

`CollapsiblePanel` animates `height: 0 → auto` as an explicit value
(`components/atoms/collapsible-panel.tsx:18-20`), which `reducedMotion="user"` does **not** suppress
— it suppresses transforms and layout animations, not value animations. Routed here by
`design.md` §D.2 as pre-existing and outside this spec's defect. **Ruling: not scoped here.** Its
trigger, not a date (`AGENTS.md` §5): *the next spec that opens `components/atoms/collapsible-panel.tsx`*.
Recorded so a later gate does not discover it as new — and noted for T5, because the panel is inside
the shifting column and an experiment may well record it.

---

## 7. Risks

| Risk | Signal it happened |
|---|---|
| **The defect will not reproduce in 480 loads.** It is 5/20 in exactly one cell on one artifact, and T3's local-build cells have never been measured | T3's stop-condition row fires: every cell `0/20`. The reflex is to lower the bar or add runs — `n` is fixed at 20 (lesson **014**) and the destination is the human, not a bigger sample |
| **The frame sampler suppresses the defect it is measuring.** A `requestAnimationFrame` loop reading seven `getBoundingClientRect()`s per frame forces layout every frame, under a 4× throttle | T5 experiment **B** disagrees with T3's rate for the identical cell. B exists for exactly this and it runs before A is interpreted |
| **A number gets read off a `layout-shift` source rect again.** It survived G1 and a blocking G2 because it arrived machine-produced | Any quoted rect with `top + height == 844` (or `== viewport height`). Lesson **044** and `AGENTS.md` §5; `design.md` §A.4 is the correction it already cost this squad |
| **The deployment-versus-local delta is attributed to source.** Loopback is the one path that bypasses this machine's TLS interception | A sentence in `shift-rate.md` comparing the two artifacts without T2(d)'s path line beside it (lesson **037**) |
| **A remedy arrives attached to the diagnosis.** The developer's browser is open, the event is right there, and `0004` R7 recorded the same pull | A new hunk under `components/` between T5's start and end snapshots, or a `diagnosis.md` naming a file to edit. T5's *Done when* compares a `sha256` of `git diff -- app components hooks lib` taken at both ends; the bare porcelain cannot serve, because siblings hold edits there |
| **The `/` sighting gets dropped because it is only 1/20.** Three sightings, one route, two of them outside this spec's own instrument, against a cell the plan originally called `none` | A `diagnosis.md` or a `remedy-verdict.md` whose `/` row is absent, merged into a total, or explained as noise without F's frames beside it (D12, D14) |
| **`/`'s reproduction is treated as a licence to widen scope.** It is the same routes, the same cells and the same files the spec already names | A new route, a new file or a new criterion appearing without `product-manager` having ruled. D13 is the record that nothing here needs one; only AC3's reporting form is open, as **B4** |
| **A local artifact is compared against a local artifact built from a different base.** Sibling specs are landing work in `lib/` and `hooks/` throughout this spec's run | A before/after pair in `remedy-verdict.md` without both pins printed, or a pin that is not `5c0c6fa` on the before side (D9, T8) |
| **A stale `design.md` number is read as a regression, or quietly promoted into an exemption.** `/`'s §A.3 row is under **B5** and the measured cell grows where the prediction shrinks | A report diffing T4(b)'s `/` rows against `design.md` verbatim and calling the mismatch a defect, or an AC5 exemption on `/` citing `−140.4` instead of that cell's own pre-remedy capture (lesson **026**, lesson **050**) |
| **The remedy fixes `cur` instead of `prev`.** `spec.md` § Problem's `632 → 249` reading is the one most people will have in their head | A remedy whose stated effect is to keep the column at `595,249`, or a report treating `height 1200.7` as a regression against `249` (`design.md` §A.4 consequence 2) |
| **AC5 is scored before B1 returns**, condemning a correct build on a criterion `design.md` proved non-discriminating | A T8 line marking AC5 pass or fail while `STATUS.md`'s B1 is still open. T8 says *recorded and not scored* until then |
| **The light stage is pruned to nothing** because "dark found no event" is read as "so there is nothing to check" | A light table with fewer than eight `/custo-da-hora` rows when the dark pass was empty (D3) |
| **A cell is reported at a denominator other than 20**, or a resumed run double-counts a cell | `shift-rate.md` carrying a row whose denominator is not 20, or two `CELL DONE` lines with the same key and different counters. `--skip-completed` reads the log; it does not re-run |
| **DS1 moves and nobody sees it**, because it is outside the nine scoped files and outside the diff | T8's V1/V2 rows missing DS1's position, or a report inferring DS1 is unmoved from a clean diff (`legal.md` §1.1) |
| **A null result is read as a finding when the instrument that produced it never ran.** It happened once already, at T5 experiment A, and it is the cheapest error in this spec to repeat: an empty array and an array with nothing in the window print the same `-1` | A report asserting *"the sampler never captured X"* without, on the same load, a non-zero `framesLength`, a `maxGapMs` and the frames bracketing the event. T5b (b) makes `SAMPLER_EMPTY` a permanent flag for exactly this (§6.1.1 **D16**) |
| **A rate comparison is read as an instrument-perturbation test when the instrument was inert.** Experiment B's 4/20-against-5/20 only excludes a *collapse*, and only if the sampler was running | A sentence citing B to license A's frames, with no coverage line from a non-reproducing load anywhere in the log (§6.1.1 **D17**) |
| **The impasse is escalated before the discriminating experiment has run.** A written impasse is the path of least argument at a blocker, and §6.1 row 3 is pre-analysed and sitting right there | A `STATUS.md` hand-off to the human naming an experiment that the raw log shows produced no observation. The rule is the promoted one: a pre-analysed fallback answers *which option*, never *is this the problem* |
| **A guard passes against an empty selector.** A remedy renames `lg:col-span-7` and every probe and every test quietly measures nothing | A `nodes=0/4`, a `MISSING` token, or a `COLUMN_COUNT` flag anywhere — each is wired as a stop, never as a skip (`AGENTS.md` §5) |
