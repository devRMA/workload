# 0002 — Implementation plan

> Owner: tech-lead · Gate: `plan` · Run 1, **amended run 2 (G5 blocker triage: B3, B4)**

**Amendment, run 2.** `frontend-dev` escalated two blockers at T1 before touching any source
file. Both are settled in § Amendment — G5 run 1 (B3, B4), and **T1, T3 and T11 are amended**:
AC10's route-JS figure is now taken by `.agents/tools/route-js.mjs`, created in T1 step 0,
because Next 16 removed the `First Load JS` printout this plan named; and `@axe-core/playwright`
is added as a `devDependency` while both never-run browser tools in `.agents/tools/` get their
one-line import fixed. No acceptance criterion changed and no other task moved. Read that
section before T1.

**Twelve tasks. T1 is a measurement and must run before any file changes.** Every task leaves
`pnpm check` green on its own. `frontend-dev` makes no decisions: every string, token value,
prop name, icon name and file path below is literal. Where a contingency exists it is
pre-authorised with its exact values, so no ambiguity reaches `STATUS.md § Blockers` except
the one already recorded there (**B2**, below).

Read order for the developer: this file, then `copy.md` for the verbatim pt-BR of any string
task, then `design.md` §2.4 for the ramp. `legal.md` S1–S10 is the authority behind every
string; this plan carries the rules inline so it is never read as a second opinion.

---

## Architecture

### The shape of the change

Nothing is created. No new module, no new component, no new hook, no new route, no new token.
The change is four independent edits to an existing tree plus one new test file:

1. **The token layer and its loader** — `app/layout.tsx` (the `next/font/google` call),
   `app/globals.css` (`--font-sans` and the eleven `--text-*` steps), `vitest.setup.ts` (the
   font mock). These three move together or the suite fails; they are one task (**T2**).
2. **The icon rendering layer** — 12 components and 3 test files import from `lucide-react`;
   all 15 move to `@tabler/icons-react` and the old package leaves `package.json` (**T3**).
3. **The cold-load path** — `calculator-layout.tsx` (mount animation deleted),
   `calculator-page.tsx` (`min-h-screen` → `min-h-dvh`), `app/layout.tsx` (two `<head>`
   `preconnect`s deleted). All three are deletions on the same path (**T4**).
4. **The strings** — eleven em-dash sites and seven claim locations, split by ownership layer:
   the hero's statement mode plus `MISSING_VALUE` (**T5**), the `lib/` legal prose (**T6**),
   the component disclosures (**T7**), the public descriptor surface (**T8**).

Then the guards and the record: a regression test file (**T9**), `DESIGN.md` (**T10**), the
after-measurements (**T11**), and the one blocked clause (**T12**).

### What lives where — and what does not move

| Layer | Touched? | Why |
|---|---|---|
| `lib/legal-tables.ts` | **No, for any reason.** | `spec.md` § Out of scope. It is the LD7 guard that a typography pass never becomes a calculation pass. F3/F4/F5 live in `.specs/0003-citation-registry/`. |
| `lib/payroll.ts`, `lib/compliance.ts` | Display prose only (`impact`, `ComplianceWarning.detail`) | `legal.md` §8: neither string participates in a computation. Every interpolation stays an interpolation. |
| `lib/calculator-view.ts`, `lib/og-image.tsx`, `lib/structured-data.ts` | String constants only | `VIEW_HEADINGS.work` is the single source of the `work` descriptor; `structured-data.ts` **interpolates** it and gets only a separator change. Editing the descriptor in two places is a declared defect (`spec.md` AC20, `legal.md` §14.2). |
| `hooks/**` | **Not touched at all.** | Nothing in this spec is stateful glue. Coverage there stays at 100% with no new test. |
| `components/atoms/**`, most of `components/molecules/**` | Icons only | They inherit the ramp. No prop, no state, no layout changes. |
| `components/organisms/hero-panel.tsx` | Gains a render branch | `design.md` §6.6. One existing component, one existing token, no new component. |
| `app/manifest.ts`, `app/sitemap.ts`, `app/robots.ts`, `app/layout.tsx` metadata, `README.md`, `public/**` | **Not touched.** | `legal.md` §14.2 recorded these as negative results precisely so nobody "helpfully" edits them. `app/manifest.ts` is already inside the permission; an edit there is a defect. |
| `lib/legal-tables.ts` footer citation (`calculator-views.tsx:90-99`) | **Not touched.** | F3/F4, spec 0003. |
| `calculator-views.tsx:83-88` ("o que não entra na conta") | **Not touched, not shortened, not merged.** | `legal.md` S4 freezes it, and S9.2's permission to name `adicional noturno` is tied to the Súmula 60 clause surviving inside it. |

### Data flow the changes ride on

```
app/layout.tsx  --font-hyperlegible-->  body className  -->  app/globals.css --font-sans
                                                              |
                                                     --text-* steps (11)
                                                              |
                      every component, unchanged: atoms -> molecules -> organisms -> templates

lib/calculator-view.ts VIEW_HEADINGS.work
       |                          |
       |                          +--> lib/structured-data.ts:27  -->  JSON-LD name
       +--> components/templates/calculator-page.tsx:21 --> AppHeader --> the sr-only h1

lib/payroll.ts WORK_REGIME_INFO[].impact --> components/molecules/regime-field.tsx --> CollapsiblePanel
lib/compliance.ts findComplianceWarnings().detail --> journey-form.tsx + day-summary.tsx --> AlertBanner
```

The two flows that matter for review: a change to `VIEW_HEADINGS.work` reaches a visible `h1`
*and* the JSON-LD `name` from one line; a change to `lib/payroll.ts:24` reaches a real user
through `RegimeField` inside an `aria-expanded` disclosure, which is where `labor-law-analyst`
will read it at G6.

### Atomic-design levels — unchanged

No component changes level and none is created. `HeroPanel` stays an **organism**
(`components/organisms/hero-panel.tsx`), notwithstanding the stale path in `DESIGN.md`
§ "Hero panel", which this spec does not correct because that is a different defect in a
different sentence and no task here reopens it.

---

## Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| An icon library on the skill's allowed list (`design-taste-frontend` §9.E) | **Add `@tabler/icons-react@^3.46.0`** | `design.md` §3.1 chose it on a measured argument, not taste: same 24px grid and 2px stroke as Lucide so `DESIGN.md`'s icon rules survive verbatim, one path set per icon (Phosphor ships six weight variants per component), and it is already in Next's built-in `optimizePackageImports` array — verified in `node_modules/next/dist/server/config.js`, the same array that holds `lucide-react`. The 464 kB barrel at `dist/esm/tabler-icons-react.mjs` is therefore never loaded in a production build and **no `next.config.ts` change is needed**. Budget: AC10, ≤ 10 kB gzipped route-JS delta, measured in T11. |
| The same icon capability | **Remove `lucide-react`** | AC9 requires it absent from `package.json` and from every source file. It is replaced one-for-one; nothing else imports it. |
| A typeface meeting `spec.md` § The inviolable constraint | **No new dependency.** `Atkinson_Hyperlegible_Next` ships inside the already-installed `next/font/google`. | Verified in this repo, not assumed: `node_modules/next/dist/compiled/@next/font/dist/google/font-data.json` lists `Atkinson Hyperlegible Next` with a `variable` weight and a `wght` 200–800 axis, and the generated `index.d.ts` makes `weight` **optional** for it. Omitting `weight` loads the variable face and typechecks. |
| Anything to fix LCP | **No new dependency.** All three LCP terms are deletions. | `spec.md` § Out of scope forbids one outright. |
| axe-core evidence for **AC12** in both themes, at `critical`/`serious` granularity (blocker **B4**) | **Add `@axe-core/playwright@^4.13.0` as a `devDependency`.** | Ruled at G5 run 1; full reasoning in § Amendment — G5 run 1 (B4). Three facts, in order of weight. (1) **AC12 names axe-core by name** and asks for *zero* violations at `critical` or `serious` in *both* themes. The already-installed alternative — Lighthouse's accessibility category, asserted at `minScore: 0.98` in `.lighthouserc.js` — is axe-derived but is a *weighted score* on a *single* theme: a 0.98 can and does coexist with one `serious` violation, so it cannot discharge AC12. Rung 5 of the ladder was checked and does not hold. (2) **`spec.md`'s dependency prohibition does not reach it.** That prohibition is scoped to "anything to fix LCP" (row above); this is test tooling in `devDependencies`, zero production bytes, zero effect on the route-JS figure AC10 measures. (3) **It is the dependency the repo's own tool already assumes.** `.agents/tools/preview.mjs` has imported it since it was vendored and has therefore never run once in this repo; the package is the missing half of a tool `AGENTS.md` §, `.agents/agents/web-standards-auditor.md`, `.agents/commands/{gate,feature}.md` and `.specs/README.md` all instruct agents to run. Peer is `playwright-core >= 1.0.0`, satisfied transitively by the installed `@playwright/test@1.63.0`; `.npmrc` sets `strict-peer-dependencies=false`. |
| A browser driver for `.agents/tools/preview.mjs` and `.agents/tools/check-reduced-motion.mjs` | **No new dependency.** Import `chromium` from `@playwright/test`, which is already a `devDependency`. | Both tools import `{ chromium } from 'playwright'`, and the bare `playwright` package does **not** resolve from this repo's root — verified: `import('playwright')` throws `ERR_MODULE_NOT_FOUND`, and `playwright@1.63.0` exists only inside `node_modules/.pnpm/node_modules/`. `@playwright/test` re-exports `chromium` from `playwright-core`; verified in this tree with `node --input-type=module -e "import {chromium} from '@playwright/test'"`. Adding `playwright` as a second driver dependency would be a new package for a capability already installed. |
| A mechanical guard for AC19/AC21/AC23 and `legal.md` S9.1 | **No new dependency.** One Vitest file reading source with `node:fs`. | See T9 and § "Why AC21 becomes a test" below. |

**Net:** one production package in (`@tabler/icons-react`), one out (`lucide-react`), zero net production dependencies, zero production bytes added by tooling, zero `next.config.ts` changes. One `devDependency` added (`@axe-core/playwright`), for the evidence the review gates consume.

---

## Two routing decisions this gate owns

### 1. The `slashed-zero` documentation defect is corrected **here**, not in `0003`

`design.md` §2.2 measured that Google Fonts' subsetter drops the `zero` feature from every
family it serves, so `DESIGN.md` line 331 ("its slashed zero (`zero`) removes the 0/O
ambiguity, at no extra byte") and the four "tabular + slashed zero" ramp bullets have asserted
something the shipped build never did. **It is fixed in this spec, in T10.** Three reasons, in
order of weight:

1. **The designer already ruled on it and G3 is closed.** `design.md` §11 C3 specifies the
   correction. Routing it elsewhere would be re-opening a closed design gate, which this role
   is forbidden from.
2. **The false sentences are inside the paragraphs T10 is rewriting anyway.** C2 replaces the
   family, the variable name and eleven step values in those exact bullets. Carrying a claim
   through a rewrite re-publishes it, freshly signed — lesson 002, in the design-system
   register. A claim is cheapest to retire exactly while its sentence is open.
3. **`0003` is bounded by a different file.** `.specs/0003-citation-registry/` exists to hold
   F2–F5, every one of which requires `lib/legal-tables.ts`. A `DESIGN.md` typography claim
   shares nothing with that boundary; adding it would widen `0003` for no reason and delay a
   correction that costs two sentences here.

The `@utility numeric` declaration itself **keeps `slashed-zero`** (`design.md` §11 C3): the
declaration is inert but correct, and Atkinson's zero is slashed in its *default glyph*, which
is what actually disambiguates it. No CSS change, only the prose that described it.

### 2. The two third-party `preconnect`s are removed — `design.md` O1 / L3, routed to me

`app/layout.tsx:58-59` opens TLS connections to `googletagmanager.com` and
`pagead2.googlesyndication.com` from `<head>`, unconditionally, on every cold load. Read the
consumers before deciding: `AnalyticsWrapper` renders `GoogleAnalytics` only when
`readTelemetryConsent() === true` *inside a `useEffect`*, and `AdManager` injects the AdSense
script only when `NEXT_PUBLIC_ENABLE_ADS === "true"`, also in a `useEffect`. **Neither origin
can be contacted before hydration, and for a user who declines consent neither is ever
contacted at all.** The `preconnect`s are therefore two handshakes of mobile-data contention
in front of the LCP element, for connections that are frequently never used.

`PRODUCT.md` §8: *"If an ad placement measurably hurts the ten-second path to an answer, the
placement loses."* Both tags are deleted in **T4**, not moved behind consent — a
consent-gated `preconnect` would fire after hydration, which is after the third-party script
tag itself, so it would buy nothing. The before/after LCP pair (T1/T11) is the evidence.

---

## Why AC21 becomes a test, not a grep

`labor-law-analyst` found AC21's grep permeable: it blocks `saldo do mês`, `acumul` and
`banco` and lets through **`saldo de horas`**, the everyday name of the instrument being
retired (`legal.md` S9.1, lesson 004). A grep run once by an auditor also expires the moment
someone edits a descriptor next quarter.

**T9 turns S9.1, S9.3, AC19, AC21, AC23, AC9 and AC11 into one Vitest file** that runs on
every `pnpm check`, in CI, forever. It reads source files with `node:fs` and asserts on their
text. It adds no dependency and no production code. It is deliberately the only new file in
this spec.

The adjacency rule is expressed exactly as `legal.md` S9.1 states it — `saldo` must be
*immediately* followed by a day-scoping term, with no intervening noun — which is the thing
the auditor's grep could not express.

---

## Amendment — G5 run 1 (tech-lead): blockers B3 and B4

`frontend-dev` stopped at T1 and raised two blockers without touching a source file, which is
the correct behaviour: both asked it to choose a measurement method for a numeric acceptance
criterion, and that is this gate's decision, not the builder's. Both are settled here. T1
resumes; `evidence/baseline.md` keeps the LCP numbers it already holds and gains the two
recordings that were blocked.

### B3 — the route-JS baseline: how AC10 is measured on Next 16

**The criterion stands; only the method changes.** AC10 asks a question that is still perfectly
answerable — *does the JS the browser has to fetch to render the main route grow, and if so by
how many gzipped bytes* — and its threshold (**≤ 10 kB gzipped delta**) is in the same unit as
before. Next 16 removed the *printout*, not the quantity. Restating AC10 in different terms and
routing it to `product-manager` was the alternative and I rejected it: the criterion is not
broken, the plan's instruction for reading it was.

**What is authoritative: the `src` set of the `script` tags in the route's pre-rendered HTML,
gzipped, excluding `noModule`.** That is what "First Load JS" counted, and in this build it is directly
readable from `.next/`:

- `.next/server/app/index.html` and `.next/server/app/custo-da-hora.html` are the emitted
  documents for the two routes AC10 and AC7 care about. Every chunk the browser fetches on a
  cold load is a a `script` tag with `src="/_next/static/…"` in that file — verified in this tree: ten
  tags on `/`.
- **`.next/app-build-manifest.json` does not exist** under Next 16 with Turbopack, and
  `.next/build-manifest.json` carries only `rootMainFiles` (five chunks), which is a *subset* of
  what the route actually requests. Neither manifest is authoritative. Checked, not assumed.
- **One tag is `noModule`** — `static/chunks/0cz1d0mv5g_q7.js`, the legacy polyfill bundle,
  39,520 gzipped bytes. No modern browser fetches it. Counting it inflates the total by 17% and
  is not "JS transferred". It is excluded, and the exclusion is in the tool, not in the
  developer's head.
- Summing every file in `.next/static/chunks/` was the other candidate and is **wrong**: that
  directory holds chunks for routes and boundaries the main route never loads, and the CSS file.

**Baseline already established at this gate** (commit `366eab5`, the same tree
`evidence/baseline.md` records): **`/` = 228,446 gzipped bytes (223.09 kB) over 9 chunks**, and
`/custo-da-hora` is byte-identical, because this app ships one client graph for both routes.
That is stated here so the developer can tell a broken measurement from a real delta on the
first run, and so a number that drifts is visible immediately. It is **not** a substitute for
running the command: T1 re-runs it and records its own output.

**The method becomes a tool, not a pasted one-liner.** `qa-engineer` re-runs it at G6 and
`release-manager` transcribes it at G8; a nine-line inline `node -e` retyped in three places is
three chances to measure differently. It is created in T1 step 0, with its content given
verbatim, and it lands in `.agents/tools/` so the next spec inherits the measurement rather
than re-deciding it.

**Non-blocking correction routed to `product-manager`.** AC10's *verification* cell still reads
"`pnpm build` output for the route", which names a command that no longer prints the figure.
The criterion and the 10 kB threshold need no change; the cell should name
`node .agents/tools/route-js.mjs index custo-da-hora`. Same class of correction as the two
`labor-law-analyst` routed at G2 run 2: it does not bounce G5, and if it is not made,
`release-manager` will hit it at G8 and the finding lands there. **AC10's substance is not
re-opened and this plan does not wait on it.**

### B4 — the axe evidence: `@axe-core/playwright` is added, and both vendored tools are fixed

Three things were weighed, in the order the escalation named them.

**1. Does `spec.md`'s dependency prohibition reach it? No.** The prohibition is written against
*fixing LCP with a package*, and `plan.md` § Dependency decisions already records that all three
LCP terms are deletions. `@axe-core/playwright` is a `devDependency`: it adds zero production
bytes, it is not in any client graph, and it cannot move the very figure B3 just specified how
to measure. Reading the prohibition as reaching test tooling would also disqualify
`@playwright/test`, `@lhci/cli` and `vitest`, which the spec's own acceptance criteria require.

**2. Is axe genuinely required, or was the plan reaching? Required — for AC12 only, not AC13.**
This is the part I checked instead of assuming:

- **AC12 needs it.** AC12 asks for *zero* violations at `critical` or `serious`, in *both*
  themes. The already-installed candidate is Lighthouse, whose accessibility category **is**
  axe-core — but `.lighthouserc.js` asserts it as `categories:accessibility >= 0.98`, a
  *weighted score*, collected on the default colour scheme only. A single `serious` violation on
  a low-weight audit leaves that score above 0.98 and the assertion green. A score cannot
  discharge a zero-violation criterion, and it says nothing at all about the dark theme.
- **AC13 does not need it, and never did.** AC13 asks for WCAG 2.2 AA contrast *per token pair*.
  No task in this spec changes a colour token — T2 changes family, leading and tracking; T4
  deletes a fade, a viewport unit and two `preconnect`s. The computed colours axe measures do
  not move, so an axe contrast pass would prove nothing about the type swap. The evidence of
  record for AC13 is `DESIGN.md` § Colour, whose every pair carries its measured ratio, plus
  T11's AC5/AC6 specimens for the thing a type swap *can* change and axe *cannot* see —
  apparent contrast at a lighter stroke weight. **T11 step 3 is corrected accordingly**: it was
  claiming axe as the AC13 evidence, and that was my error at run 1, not the developer's.
- The "bespoke contrast probe" the escalation mentions was looked for and **does not exist as a
  runnable artefact**: `grep -rni contrast` over `lib`, `components`, `__tests__` and `tests`
  returns nothing. What exists is `DESIGN.md`'s hand-measured token table, which is the AC13
  evidence named above. Recorded so the next agent does not go looking for a script.

**3. The tool must not be left broken for the next cycle — and it is broken twice over.** Root
cause, grepped rather than guessed:

| Fact | Verified how |
|---|---|
| `@axe-core/playwright` is absent from `package.json`, `pnpm-lock.yaml` and `node_modules` | `frontend-dev` at T1; `pnpm install --frozen-lockfile` returns `ok` |
| `preview.mjs` **also** imports `{ chromium } from 'playwright'`, and the bare `playwright` package does not resolve from the repo root | `node -e "import('playwright')"` → `ERR_MODULE_NOT_FOUND`; `playwright@1.63.0` exists only under `node_modules/.pnpm/node_modules/` |
| `.agents/tools/check-reduced-motion.mjs:16` has the **identical** import bug | `grep -n "from 'playwright'" .agents/tools/*.mjs` — two hits, two files |
| `preview.mjs`'s dialog loop targets `#projects article button` | Read the file; that is a portfolio selector from the project these tools were vendored from. WorkLoad has no `#projects`, so `count()` is 0 and the loop silently reports "dialogs: 0 violações" |

So the fix is the root-cause fix, in both files, because both callers of the same wrong import
are broken and patching only the one T1 names leaves the sibling broken for G6. `chromium` is
re-exported by `@playwright/test`, already installed — no second driver dependency.

**The dialog loop is deleted, not re-pointed.** A loop that finds zero triggers and prints
"dialogs: 0 violações" is worse than no loop: it reads as coverage. WorkLoad *does* have two
native `<dialog>` surfaces (`components/organisms/cookie-consent.tsx:81`,
`components/organisms/journey-form.tsx:225`, both through
`components/atoms/modal-dialog.tsx`), and auditing them properly needs trigger selectors, an
open/close protocol and an acceptance criterion of its own. **Recorded as a finding for
`.specs/0003-citation-registry/`** — not silently dropped, and not improvised inside a
typography spec.

**What this does not do.** It does not rewrite `preview.mjs` into a Playwright spec under
`tests/e2e/`, which was the tempting larger fix. Everything in the repo that instructs an agent
to capture evidence names `preview.mjs` by path — `AGENTS.md`, `.agents/agents/web-standards-auditor.md`,
`.agents/commands/gate.md`, `.agents/commands/feature.md`, `.specs/README.md` — and moving the
tool means editing five squad-infrastructure files from inside a feature spec. Two one-line
import fixes and one deletion restore the tool everything already points at.

**One finding recorded for G10, because it is larger than this spec.** `.specs/0001-foundation`
closed with **AC18** — "zero axe-core violations at `critical` or `serious`, in both themes" —
whose entire verification cell was `node .agents/tools/preview.mjs`. That command has never
executed in this repository. 0001's a11y evidence is therefore unverified, and `0002` is not the
place to re-open it. Routed to `product-manager` as a spec of its own after G10.

## Tasks

### T1 — Repair the measurement tooling, then record the before-measurements on the unmodified tree

**Amended at G5 run 1** to settle blockers **B3** and **B4**. Step 0 is new; step 1 replaces a
metric Next 16 no longer prints; step 3's command is unchanged but now runs.

- **Files:**
  - `.agents/tools/route-js.mjs` (**create**) — the AC10 measurement, content given verbatim below.
  - `.agents/tools/preview.mjs` (**edit**) — two changes, both named below.
  - `.agents/tools/check-reduced-motion.mjs` (**edit**) — one line, line 16.
  - `package.json` (**edit**) — one `devDependency`.
  - `pnpm-lock.yaml` (**edit**) — by `pnpm add`, never by hand.
  - `.specs/0002-design-taste-preflight/evidence/baseline.md` (**edit** — it already exists and
    already holds the LCP recording; keep § 2 exactly as it is, replace § 1 and § 3).
- **Depends on:** none. **This task must complete before T2, and no file under `app/`,
  `components/`, `lib/` or `hooks/` may be edited until it has.** AC8 is unmeasurable
  retroactively. Step 0 touches `package.json`, `pnpm-lock.yaml` and `.agents/tools/` only —
  **none of which is an input to the client bundle**, so it cannot invalidate the baseline the
  same task then takes. Do not fear it; do run step 0 before step 1 so `pnpm build` runs once.
- **Reuse:** `.lighthouserc.js` and the `lhci` script already in `package.json`; `@playwright/test`,
  already a `devDependency`, for `chromium`; `node:zlib`'s `gzipSync` for the byte figure — no
  gzip dependency, no bundle analyzer.

#### Step 0 — repair the tooling (B4)

**0a.** `pnpm add -D @axe-core/playwright@^4.13.0`. Nothing else. Do not add `playwright`, do not
add `axe-core` (it arrives as a dependency of the above, pinned `~4.13.0`), do not touch any
other line of `package.json`. The justification is written in § Dependency decisions and in
§ Amendment — G5 run 1 (B4); you are not deciding it.

**0b.** In **`.agents/tools/preview.mjs`**, change exactly one import line:

```diff
-import { chromium } from 'playwright'
+import { chromium } from '@playwright/test'
```

**0c.** In **`.agents/tools/preview.mjs`**, delete the dialog loop and its report field. Remove
the whole `const dialogs = []` … `}` block (the `triggers` locator, the `dialogCount` loop and
everything inside it) and remove the `dialogs,` line from the `report.pages.push({ … })` object.
Then remove `dialogs` from the three places the summary aggregates it at the bottom of the
file: the `violations` flat-map, the `incomplete` flat-map and the `report.pages.reduce(...)`
inside the second `console.log` template — the log line becomes
`` `violações axe: ${violations.length} | contrast incomplete: ${incomplete.length} | erros de console: ${errors.length}` ``.
Reason, so you do not "helpfully" re-point it instead: `#projects article button` is a selector
from the project these tools were vendored from, WorkLoad has no `#projects`, and a loop that
finds zero triggers prints "dialogs: 0 violações" and reads as coverage. WorkLoad's two real
dialogs are recorded as a finding for `.specs/0003-citation-registry/`. **Do not write a
replacement dialog audit in this spec.**

**0d.** In **`.agents/tools/check-reduced-motion.mjs`**, line 16, the identical one-line fix:

```diff
-import { chromium } from 'playwright'
+import { chromium } from '@playwright/test'
```

It is not used by this spec, it has the same never-run bug from the same vendoring, and `G6`
will reach for it. Fixing one caller of a wrong import and leaving the sibling is half a fix.

**0e.** Create **`.agents/tools/route-js.mjs`** with exactly this content. It is tab-indented and
single-quoted to match the other files in `.agents/tools/`, which `biome` does not format
(`.agents/` is outside the checked globs — if `pnpm lint` disagrees, run `pnpm lint:fix` on that
file alone and keep the behaviour identical):

```js
#!/usr/bin/env node
/**
 * Mede o JS inicial de uma rota a partir do build já gerado em `.next/`.
 * Substitui a métrica "First Load JS" que o `next build` deixou de imprimir a partir do Next 16
 * (`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`).
 *
 * Autoridade: os `script src` que o HTML pré-renderizado da rota pede, menos os `noModule`
 * (o bundle de polyfills legado, que nenhum browser moderno baixa). Não use
 * `.next/build-manifest.json` (só traz `rootMainFiles`, um subconjunto) nem a soma de
 * `.next/static/chunks/` (traz chunks que a rota não carrega, e o CSS).
 *
 * node .agents/tools/route-js.mjs index custo-da-hora
 */
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const routes = process.argv.slice(2)
if (routes.length === 0) {
	console.error('uso: node .agents/tools/route-js.mjs nome-do-html-sem-extensao ...')
	process.exit(2)
}

for (const route of routes) {
	const html = readFileSync(`.next/server/app/${route}.html`, 'utf8')
	const chunks = [
		...new Set(
			[...html.matchAll(/<script\b[^>]*?\bsrc="\/_next\/(static\/[^"]+\.js)"[^>]*>/g)]
				.filter((m) => !/\bnoModule\b/i.test(m[0]))
				.map((m) => m[1]),
		),
	].sort()

	let total = 0
	for (const file of chunks) {
		const bytes = gzipSync(readFileSync(`.next/${file}`), { level: 9 }).length
		total += bytes
		console.log(`${String(bytes).padStart(8)}  ${file}`)
	}
	console.log(
		`ROUTE_JS_GZIP ${route} ${total} bytes (${(total / 1024).toFixed(2)} kB) over ${chunks.length} chunks`,
	)
}
```

`{ level: 9 }` is pinned on purpose: Node's zlib default is level 6 and a default that changes
between Node releases would silently move the before/after pair. T11 re-runs the same file, so
both sides are compressed identically.

#### Step 1 — route JS, before (AC10, B3)

```
pnpm build
node .agents/tools/route-js.mjs index custo-da-hora
```

Record the **full output** of the second command — the per-chunk lines and both
`ROUTE_JS_GZIP` lines — into `evidence/baseline.md` § 1, replacing the `BLOCKED` block, together
with the commit SHA. **Expected: `/` = 228,446 bytes (223.09 kB) over 9 chunks, and
`custo-da-hora` byte-identical**, because this app ships one client graph for both routes. That
figure was measured at this gate on commit `366eab5`; if your run differs by more than a few
hundred bytes on an unmodified tree, the measurement is wrong, not the tree — stop and raise it
rather than recording it. Also paste the verbatim `Route (app)` table `pnpm build` does print,
and the one-sentence note that Next 16 removed `First Load JS`, so the record shows why the
method is what it is.

**The AC10 budget, unchanged:** `/` must not grow by more than **10,240 gzipped bytes** over the
baseline, measured by this command, as read in T11 step 1.

#### Step 2 — LCP, before (AC7, AC8) — **already done, do not re-run**

`evidence/baseline.md` § 2 already holds it: ads off (`NEXT_PUBLIC_ENABLE_ADS=false`), `lhci`
starting `pnpm start` itself, default mobile preset (**do not** set `LH_PRESET`), three runs.
**`/` median 2687.232 ms; `/custo-da-hora` median 2769.030 ms.** Both above the 2500 ms AC7
target, which is the headroom T4's three deletions have to close. Keep § 2 byte-for-byte and add
nothing to it — re-running it on a different machine load would replace a valid baseline with a
noisier one.

#### Step 3 — axe + console, before (AC12, B4)

```
node .agents/tools/preview.mjs --out .specs/0002-design-taste-preflight/evidence/before --path /,/custo-da-hora
```

Both themes at 390 and 1440, which the tool walks itself. Record into
`evidence/baseline.md` § 3, replacing the `BLOCKED` block: the violation count by `impact`, the
`color-contrast` incomplete count, the console-error count, and the path to `report.json`. **A
non-zero `critical`/`serious` count here is a pre-existing defect, not a T1 failure** — record
it and carry on; it is the comparison T11 step 3 needs, and `web-standards-auditor` owns
whether it blocks at G6. The tool exits non-zero when it finds a `critical` or `serious`
violation, so run it as the last command and read the output rather than treating the exit code
as T1's verdict.

- **Tests:** none — no application code changes. `pnpm check` must be green after this task,
  which it is by construction: nothing under `app/`, `components/`, `lib/` or `hooks/` moved,
  and `.agents/tools/**` is not in the `tsconfig` or `vitest` include set.
- **Done when:** `pnpm check` green; `git status` shows no modified file under `app/`,
  `components/`, `lib/` or `hooks/`; `node .agents/tools/route-js.mjs index custo-da-hora` and
  `node .agents/tools/preview.mjs --out …/evidence/before --path /,/custo-da-hora` both run to a
  printed result; `evidence/baseline.md` holds all three sections with the commit SHA, the date
  and the exact commands, and **no section still says `BLOCKED`** — advances **AC8**, and makes
  **AC7**, **AC10** and **AC12** measurable.

---

### T2 — Swap Inter for Atkinson Hyperlegible Next and re-tune the eleven type steps

- **Files:**
  - `app/layout.tsx` (edit)
  - `app/globals.css` (edit)
  - `vitest.setup.ts` (edit)
- **Depends on:** T1
- **Reuse:** `next/font/google` (already a dependency via `next`). No new package.
- **What to build:**

  **1. `app/layout.tsx`.** Replace line 2 and line 9:

  ```ts
  import { Atkinson_Hyperlegible_Next } from "next/font/google";
  ```
  ```ts
  const hyperlegible = Atkinson_Hyperlegible_Next({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-hyperlegible",
  });
  ```

  and line 61 `<body className={inter.variable} …>` → `<body className={hyperlegible.variable} …>`.
  **Omit `weight` and `style`.** Verified against this repo's own
  `node_modules/next/dist/compiled/@next/font/dist/google/index.d.ts`: for this family
  `weight` is optional, and omitting it loads the variable face (`wght` 200–800, covering the
  four sanctioned weights 400/500/600/700). The product uses no italic. Do not add
  `preload`, `fallback` or `adjustFontFallback` — `next/font` derives the size-adjust fallback
  from the real metrics automatically, which is what protects CLS (`design.md` §5.3).

  **2. `app/globals.css` line 6.** The variable is renamed, the fallback stack is byte-identical:

  ```css
  --font-sans: var(--font-hyperlegible), system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  ```

  **3. `app/globals.css` lines 13–66 — the re-tuned ramp.** Copy these values exactly from
  `design.md` §2.4. **Every `font-size` and every `font-weight` is unchanged**; only
  `--line-height` and `--letter-spacing` move.

  | Token | `--line-height` | `--letter-spacing` |
  |---|---|---|
  | `--text-numeral` | `1.05` | `-0.02em` |
  | `--text-display` | `1.15` | `-0.014em` |
  | `--text-title` | `1.25` | `-0.01em` |
  | `--text-metric` | `1.2` | `-0.008em` |
  | `--text-heading` | `1.3` (unchanged) | `-0.005em` |
  | `--text-input` | `1.25` | `0em` |
  | `--text-body` | `1.55` (unchanged) | `0em` (unchanged) |
  | `--text-body-sm` | `1.5` (unchanged) | `0.005em` |
  | `--text-label` | `1.25` | `0.005em` (unchanged) |
  | `--text-caption` | `1.45` (unchanged) | `0.012em` |
  | `--text-overline` | `1.25` | `0.07em` |

  Do **not** touch `@utility numeric` (line 198) or `font-optical-sizing: auto` (line 252).
  The first keeps `slashed-zero` by the designer's ruling; the second is inert with Atkinson
  and correct again the moment a family with an `opsz` axis returns.

  **4. `vitest.setup.ts`.** The mock must name the function the code now imports, or every
  test that renders `RootLayout` throws:

  ```ts
  vi.mock("next/font/google", () => ({
    Atkinson_Hyperlegible_Next: () => ({ className: "font-hyperlegible", variable: "font-hyperlegible" }),
  }));
  ```

  Nothing else in that file changes.

  **Pre-authorised contingency, `design.md` §2.5 — use only if the T11 AC6 specimen read on a
  real 390px device shows `--text-caption` failing.** Then, and only then:
  `--text-caption: 0.8125rem` and `--text-overline: 0.75rem`. Nothing else moves, AC14 is
  re-run, and the use is recorded in `STATUS.md`. This is pre-authorised by `product-designer`
  and is not a decision the developer makes — it is a measurement the developer reads.
- **Tests:** `__tests__/layout.test.tsx` — no assertion changes, but it must stay green, which
  is the proof the mock and the import agree. Add **one** case to it:
  `it("loads the hyperlegible family on the body", …)` — render `RootLayout` and assert
  `document.body.className` contains the mocked variable class. Do **not** assert any
  `--text-*` value, any Tailwind class string, or any tracking number: a test that mirrors the
  CSS breaks on every design change and catches no defect (`AGENTS.md` §8). The ramp is proven
  by the AC5/AC6 specimens in T11, in a real browser.
- **Done when:** `pnpm test __tests__/layout.test.tsx` green, `pnpm build` clean,
  `pnpm check` clean, and `rg 'font-inter|Inter\(' app components DESIGN.md` returns only the
  `DESIGN.md` lines that T10 will fix — advances **AC17**, and enables **AC5**, **AC6**.

---

### T3 — Replace `lucide-react` with `@tabler/icons-react` in all 15 files

- **Files:** 12 sources + 3 tests + the manifest, all in one task because the build is red
  between the first and the last, and AC9 fails while the package remains installed.
  - `package.json` (edit)
  - `components/organisms/app-header.tsx`, `work-calculator.tsx`, `journey-form.tsx`,
    `day-summary.tsx`, `salary-calculator.tsx`, `calculator-views.tsx`, `tax-details-panel.tsx`,
    `cookie-consent.tsx`, `hero-panel.tsx` (edit)
  - `components/molecules/copy-button.tsx`, `regime-field.tsx`, `extra-entry-row.tsx`,
    `extra-entry-list.tsx` (edit)
  - `__tests__/hero-panel.test.tsx`, `__tests__/alert-banner.test.tsx`,
    `__tests__/date-time-input.test.tsx` (edit)
- **Depends on:** T2
- **Reuse:** the existing icon call sites, `aria-hidden="true"` attributes, `size` props and
  `className` tokens, all unchanged.
- **What to build:**

  **1. `pnpm remove lucide-react && pnpm add @tabler/icons-react`.** Root named imports only:
  `import { IconClock, IconLogin } from "@tabler/icons-react";`. **Do not** add the package to
  `experimental.optimizePackageImports` — it is already in Next's built-in list and the entry
  would be redundant. **Do not** use deep imports; that is the fallback below.

  **2. The map — 30 icons, one for one, from `design.md` §3.4. Copy it; do not choose.**

  | File | Lucide | Tabler |
  |---|---|---|
  | `organisms/app-header.tsx` | `Clock`, `Moon`, `Sun`, `Wallet` | `IconClock`, `IconMoon`, `IconSun`, `IconWallet` |
  | `organisms/work-calculator.tsx` | `Clock`, `LogIn` | `IconClock`, `IconLogin` |
  | `organisms/journey-form.tsx` | `AlertTriangle`, `Coffee`, `LogIn`, `LogOut`, `Percent`, `RotateCcw`, `Settings`, `Zap` | `IconAlertTriangle`, `IconCoffee`, `IconLogin`, `IconLogout`, `IconPercentage`, **`IconRotate`**, `IconSettings`, **`IconBolt`** |
  | `organisms/day-summary.tsx` | `AlertTriangle`, `CalendarDays`, `Coffee`, `MoonStar`, `Sunrise`, `Sunset`, `Zap` | `IconAlertTriangle`, **`IconCalendarMonth`**, `IconCoffee`, `IconMoonStars`, `IconSunrise`, `IconSunset`, `IconBolt` |
  | `organisms/salary-calculator.tsx` | `AlertTriangle`, `Calculator`, `ChevronDown`, `ChevronUp`, `Clock`, `Sun`, `TrendingDown`, `TrendingUp`, `Wallet` | `IconAlertTriangle`, `IconCalculator`, `IconChevronDown`, `IconChevronUp`, `IconClock`, `IconSun`, `IconTrendingDown`, `IconTrendingUp`, `IconWallet` |
  | `organisms/calculator-views.tsx` | `Clock`, `DollarSign` | `IconClock`, **`IconCurrencyDollar`** |
  | `organisms/tax-details-panel.tsx` | `Users` | `IconUsers` |
  | `organisms/cookie-consent.tsx` | `Cookie`, `Shield`, `X` | `IconCookie`, `IconShield`, `IconX` |
  | `molecules/copy-button.tsx` | `Copy`, `Check` | `IconCopy`, `IconCheck` |
  | `molecules/regime-field.tsx` | `Briefcase`, `Check`, `ChevronDown` | `IconBriefcase`, `IconCheck`, `IconChevronDown` |
  | `molecules/extra-entry-row.tsx` | `Trash2` | **`IconTrash`** |
  | `molecules/extra-entry-list.tsx` | `PlusCircle` | **`IconCirclePlus`** |
  | `__tests__/hero-panel.test.tsx` | `Clock` | `IconClock` |
  | `__tests__/alert-banner.test.tsx` | `AlertTriangle` | `IconAlertTriangle` |
  | `__tests__/date-time-input.test.tsx` | `LogIn` | `IconLogin` |

  Four of these are **not** the name a search would guess and the designer named the reason:
  `RotateCcw → IconRotate` (counter-clockwise; `IconRotateClockwise` reverses the meaning),
  `Zap → IconBolt`, `CalendarDays → IconCalendarMonth` (`IconCalendarEvent` is a single marked
  date and narrows the meaning), `Trash2 → IconTrash`, `PlusCircle → IconCirclePlus`.

  **3. The one prop rename.** Tabler calls it `stroke`, not `strokeWidth`, and the default is
  2. Exactly three call sites, verified in the working tree:
  `components/organisms/app-header.tsx:32`, `components/organisms/hero-panel.tsx:34`,
  `components/organisms/salary-calculator.tsx:80` — each `strokeWidth={1.75}` becomes
  `stroke={1.75}`. **Do not touch `components/atoms/progress-ring.tsx`**: its three
  `strokeWidth` props are native SVG attributes on a hand-drawn gauge, not icon props.

  **4. Nothing else changes.** Not a `size`, not a `className`, not an `aria-hidden`, not a
  colour token, not the order of props. Tabler spreads arbitrary props onto the `<svg>` and
  merges `className` after its own `tabler-icon` classes, so `w-4 h-4` and `text-*-ink` still
  win. `IconCurrencyReal` exists and would be more truthful on a Brazilian salary tab; it is a
  meaning change and `design.md` O2 defers it. Do not take it.

  **Pre-authorised fallback, `design.md` §3.2 — use only if T11 step 1 measures the route JS
  growing past AC10's budget of 10,240 gzipped bytes over T1's baseline, as reported by
  `node .agents/tools/route-js.mjs index custo-da-hora` (§ Amendment — G5 run 1, B3).** Switch
  the imports to explicit per-icon deep imports,
  `import IconClock from "@tabler/icons-react/dist/esm/icons/IconClock.mjs";`, re-measure, and
  record it in `STATUS.md`. If the delta is *still* over budget after the fallback, stop and
  raise it in `STATUS.md § Blockers`: `spec.md` § Open questions pre-decides that outcome as
  "keep `lucide-react`, record the exception", and that reversal is mine to order, not yours.
- **Tests:** the three edited test files keep every existing assertion; only the import and
  the identifier change. No new test: an icon swap that renders is proven by the 15 suites
  already covering these components, and asserting an icon's class string is banned.
- **Done when:** `pnpm test` fully green, `pnpm build` clean,
  `rg 'lucide-react' --glob '!pnpm-lock.yaml'` returns nothing, and `grep lucide package.json`
  returns nothing — advances **AC9**, feeds **AC10**.

  **Amended at G5 run 1 (B3).** Do **not** look for a "First Load JS" line in `pnpm build`;
  Next 16 does not print one. The byte budget this task feeds is read once, in T11 step 1, by
  `node .agents/tools/route-js.mjs index custo-da-hora`, against T1's recorded baseline of
  **228,446 gzipped bytes** for `/`. You may run that command here as a sanity check after the
  swap — it needs only a completed `pnpm build` — but T11 is where the figure of record is
  taken. Nothing in this task's done-when depends on the number.

---

### T4 — Clear the cold-load path: the mount fade, the viewport unit, the two preconnects

- **Files:**
  - `components/templates/calculator-layout.tsx` (edit)
  - `components/templates/calculator-page.tsx` (edit)
  - `app/layout.tsx` (edit)
- **Depends on:** T2
- **Reuse:** the existing `cn()` from `lib/utils` and the existing class strings, unchanged.
- **What to build:**

  **1. `calculator-layout.tsx` — delete the mount animation (`design.md` §5.2, L1).** Both
  `motion.div` elements become plain `<div>`. Remove `initial`, `animate` and `transition`
  from both, remove `import { motion } from "motion/react";`, and keep the file's `"use client"`
  directive, its props interface, its `cn()` call and **both `className` strings byte-for-byte**
  — including `order-first lg:order-none lg:col-span-5 lg:sticky lg:top-[calc(var(--header-height)+var(--spacing-xl))]`.
  No reduced-motion path is needed because no animation remains. The `PANEL_TRANSITION` in
  `calculator-views.tsx` is a **different thing and stays**: it fires on a tab change, which is
  a user-triggered state transition off the cold-load path.

  **2. `calculator-page.tsx:20` — `min-h-screen` → `min-h-dvh`.** `min-h-dvh` is a Tailwind v4
  core utility compiling to `min-height: 100dvh`; use it rather than the skill's literal
  `min-h-[100dvh]`, because `DESIGN.md` forbids an arbitrary value where a utility exists. The
  full line becomes `<main className="min-h-dvh bg-canvas text-ink">`. This is the only
  viewport-unit occurrence in the repository (`design.md` §4, sweep result).

  **3. `app/layout.tsx` — delete lines 57–60**, the entire `<head>` element with its two
  `<link rel="preconnect">` tags. Reasoning is in § "Two routing decisions" above and is
  recorded in `STATUS.md`; both origins are contacted only from a `useEffect` after consent,
  so the handshakes sit in front of the LCP element for connections often never opened.
  Nothing else in `layout.tsx` moves — not the metadata, not the viewport export, not the
  provider tree.
- **Tests:**
  - `__tests__/calculator-layout.test.tsx` — keep both existing assertions; they pass
    unchanged and are the proof the deletion did not drop a region. Add one case:
    `it("renders its columns without a mount animation", …)` asserting, by accessible role and
    name, that both regions are present **and** that the rendered container has no inline
    `opacity` style. Do not assert a class string.
  - `__tests__/calculator-page.test.tsx` — existing assertions unchanged. Do not add a
    `min-h-dvh` class assertion; the viewport unit is proven by the Playwright suite (AC14)
    and, if a reviewer wants certainty, by a computed-style read in a real browser. `jsdom`
    cannot evaluate `dvh` and `toHaveClass` proves only that a string reached `className`.
  - `__tests__/layout.test.tsx` — add one case asserting the rendered head contains no
    `link[rel="preconnect"]` to `googletagmanager.com` or `pagead2.googlesyndication.com`.
- **Done when:** `pnpm test __tests__/calculator-layout.test.tsx __tests__/calculator-page.test.tsx __tests__/layout.test.tsx`
  green, `pnpm check` clean, `rg 'min-h-screen|h-screen' app components` returns nothing —
  advances **AC11**, feeds **AC7**.

---

### T5 — Give `HeroPanel` its statement mode and replace `MISSING_VALUE`

- **Files:**
  - `components/organisms/hero-panel.tsx` (edit)
  - `components/organisms/salary-calculator.tsx` (edit — line 34 only in this task)
  - `__tests__/hero-panel.test.tsx` (edit)
  - `__tests__/salary-calculator.test.tsx` (edit)
- **Depends on:** T2, T3
- **Reuse:** `HeroPanel` itself, `--text-title` (existing token), `cn()` from `lib/utils`. **No
  new component, no new token, no new type step, no new prop.**
- **What to build:**

  **1. `salary-calculator.tsx:34`** — `legal.md` S6, the verbatim string from `copy.md` §2.6:

  ```ts
  const MISSING_VALUE = "Sem carga horária";
  ```

  Seventeen characters, pt-BR, no digit, no `R$`. It replaces a bare `"—"` that a screen
  reader announced inconsistently or not at all, which closes `legal.md` F6. The `aria-live`
  region that wraps it is unchanged, so it is now announced as words. Line 222 —
  `value={hasMonthlyHours ? formatCurrency(stats.periodValue) : MISSING_VALUE}` — is **not
  edited**.

  **2. `hero-panel.tsx` — the statement mode (`design.md` §6.6).** The mode is decided by the
  value itself, not by a prop: `HeroPanelProps` gains **nothing**.

  ```tsx
  const isFigure = /\d/.test(value);
  ```

  When `isFigure` is true the `<p>` renders exactly as it does today: `text-numeral numeric
  whitespace-nowrap text-[length:var(--hero-value-size)]` with the inline
  `clamp(2.5rem, ${VALUE_INLINE_SIZE_CQI / Math.max(1, value.length)}cqi, 6rem)` style.

  When `isFigure` is false the `<p>` renders `text-title text-balance` with **no `numeric`
  utility** (tabular figures on a sentence with no figures are meaningless), **no
  `whitespace-nowrap`** (it must wrap to at most two lines) and **no inline `style`** — the
  token's own 1.5rem governs. Everything else is byte-identical: the same single
  `<p aria-live="polite">`, the same `--color-ink-onfill` inherited from the panel, the same
  alignment, the same container, the same spacing. The announcement does not change.

  Compose the two class sets with `cn()`, in the file's existing idiom. Measured fit at 390px
  against the 294px content box: "Sem carga horária" is **202px** at 24px/600 (92px spare);
  `copy.md`'s stated second choice "Informe a carga horária" is **262px** and also fits.

  **3. Nothing else in `salary-calculator.tsx` is touched in this task.** Its body copy at
  line 126 is T7; its icons were T3.
- **Tests:**
  - `__tests__/hero-panel.test.tsx` — keep all five existing cases (they all pass a value
    containing a digit and therefore exercise figure mode unchanged, which is the regression
    proof). **Two new cases:**
    (a) `it("sets a sentence value in the statement step instead of the numeral step", …)` —
    render with `value="Sem carga horária"` and assert the element found by its text has **no**
    `--hero-value-size` inline custom property, using the file's existing
    `element.style.getPropertyValue` idiom. That is an observable API surface, not a Tailwind
    class string.
    (b) `it("still announces a sentence value politely", …)` — assert the element carrying
    "Sem carga horária" has `aria-live="polite"`, so the S6 accessible-equivalent requirement
    is pinned by a test rather than by prose.
    The existing empty-value case (`value=""`) must keep passing; `""` contains no digit, so it
    now takes the statement branch — update that case's expectation from "asks for a finite
    size" to "asks for no inline size", **without deleting the `it()`** (AC24).
  - `__tests__/salary-calculator.test.tsx:162` — `expect(screen.getByText("—"))` becomes
    `expect(screen.getByText("Sem carga horária"))`. The surrounding `it()` name and its other
    two assertions are unchanged. No assertion is removed.
- **Done when:** `pnpm test __tests__/hero-panel.test.tsx __tests__/salary-calculator.test.tsx`
  green, `pnpm check` clean, coverage on `components/**` still ≥ 90% — advances **AC1**,
  **AC2**, and removes the AC14 overflow risk `copy.md` §8 raised.

---

### T6 — Rewrite the two `lib/` legal strings (S1 + S10, and S2)

- **Files:**
  - `lib/payroll.ts` (edit — line 24 only)
  - `lib/compliance.ts` (edit — line 34 only)
  - `__tests__/payroll.test.ts` (edit)
  - `__tests__/compliance.test.ts` (edit)
- **Depends on:** none (independent of T2–T5; sequenced here so the string tasks land together)
- **Reuse:** `formatCurrency` from `lib/utils`, `RGPS_CEILING`, `TABLE.rgpsCeilingDiscount`,
  `TABLE.year` — all three already in scope in the file. **Do not import anything new.**
- **What to build:**

  **1. `lib/payroll.ts:24`, the CLT `impact` — `legal.md` S1 *and* S10, together. Verbatim from
  `copy.md` §2.1, template literal, three interpolations preserved:**

  ```ts
  impact: `INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. O teto do salário de contribuição é ${formatCurrency(RGPS_CEILING)}: acima disso o desconto trava em ${formatCurrency(TABLE.rgpsCeilingDiscount)} (tabela de ${TABLE.year}).`,
  ```

  What each clause is doing, so nothing is "improved":

  | Rule | Where it is satisfied |
  |---|---|
  | S1 — ceiling interpolated from `RGPS_CEILING`, **never a literal** | `${formatCurrency(RGPS_CEILING)}` |
  | S1 — discount interpolated from `TABLE.rgpsCeilingDiscount`, never a literal | `${formatCurrency(TABLE.rgpsCeilingDiscount)}` |
  | S1 — the year interpolated from `TABLE.year`, **in the same sentence as both figures** | `(tabela de ${TABLE.year})` closes the second sentence, which holds both figures |
  | S1 — the causal link survives | the colon plus "acima disso" ties R$ 988,09 to crossing R$ 8.475,55 |
  | S1 — progressivity survives | "alíquotas progressivas de 7,5% a 14%" kept whole |
  | S10.1 — "salário de contribuição", in that order, **immediately governing** the figure | "O teto do salário de contribuição é ${…}" |
  | S10.2 — "teto" still attached to R$ 8.475,55 | same clause |
  | S10.3 — "teto de contribuição" eliminated, not written around | the phrase is gone (AC23) |
  | S10.4 — R$ 988,09 legible as the consequence | "acima disso o desconto trava em" |
  | S10.5 / S10.6 — no number moves, "progressivas" stays | nothing numeric edited |

  **No number changes. No interpolation becomes a literal.** The moment one does, the
  year-indexed registry stops being a one-file diff and LD7 is broken — not by a changed
  number, but by a number that will fail to change (`legal.md` §8).
  The source of the correction, for the reviewer: Portaria Interministerial MPS/MF nº 13, de
  09/01/2026, art. 2º (the base) and art. 7º + Anexo II (the contribution). **Do not add a
  comment citing it** — `AGENTS.md` §8 forbids narrating; the norm already lives in
  `lib/legal-tables.ts`, and this string is display prose, not a constant.

  **2. `lib/compliance.ts:34`, `daily-overtime-limit.detail` — `legal.md` S2. Verbatim from
  `copy.md` §2.2. One character changes: the em-dash becomes a full stop, and nothing else:**

  ```ts
  detail:
    "O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST). A irregularidade está na extrapolação, e a sanção recai sobre o empregador.",
  ```

  A full stop, **not a comma**: the allocation of the irregularity to the employer is an
  assertion of its own and it is the clause that takes the blame off the worker. A comma after
  "(Súmula 376 do TST)" would demote it to an apposition of the citation. Do not soften
  "continuam devidas"; do not introduce "pode", "talvez" or "em tese"; do not make the worker
  the subject of the irregularity; do not move either clause out of the `detail`, which renders
  in the same visible `AlertBanner` block as the title "Você passou de 2h extras hoje".

  **3. `lib/payroll.ts:32` is NOT edited in this task.** It carries "teto do INSS", which
  `legal.md` S10.3 forbids anywhere in `lib/`, but `copy.md` §5 marks it unchanged. That
  conflict is **blocker B2**, recorded in `STATUS.md`, and it is **T12**.
- **Tests:**
  - `__tests__/payroll.test.ts` — the three existing assertions at lines 50–52
    (`toContain("8.475,55")`, `"988,09"`, `"2026"`) are **kept exactly as they are**; they are
    the AC15 proof that no figure moved. Add two cases, both asserting observable content:
    (a) `it("names R$ 8.475,55 as the salário de contribuição, not the contribution", …)` —
    `expect(clt?.impact).toContain("teto do salário de contribuição")` **and**
    `expect(clt?.impact).not.toContain("teto de contribuição em")`;
    (b) `it("keeps the ceiling, the capped discount and the table year in one sentence", …)` —
    assert the substring running from "O teto do salário de contribuição" to
    `(tabela de ${CURRENT_LEGAL_YEAR.year})` exists as one sentence, i.e. that the rendered
    `impact` contains no `.` between the two figures. This is `legal.md` S1's "same sentence"
    row made mechanical, and it is the one thing a future edit is most likely to break.
    Build the expected year from `CURRENT_LEGAL_YEAR`, never from the literal `2026`.
  - `__tests__/compliance.test.ts` — keep `expect(overtime.detail).toContain("art. 59")`. Add
    one case asserting the detail contains `"Súmula 376 do TST"` **and**
    `"a sanção recai sobre o empregador"`, and contains no `"—"`.
- **Done when:** `pnpm test __tests__/payroll.test.ts __tests__/compliance.test.ts` green,
  `pnpm test:coverage` still 100% on `lib/**`, `rg 'teto de contribuição' lib` returns nothing
  — advances **AC1**, **AC2**, **AC23**, holds **AC15**.

---

### T7 — Rewrite the three component disclosure strings (S3, S4, S5)

- **Files:**
  - `components/organisms/day-summary.tsx` (edit — the DSR caption at ~221)
  - `components/organisms/calculator-views.tsx` (edit — the footer paragraph at ~79)
  - `components/organisms/salary-calculator.tsx` (edit — the danger banner body at ~126)
  - `__tests__/day-summary.test.tsx`, `__tests__/calculator-views.test.tsx`,
    `__tests__/salary-calculator.test.tsx` (edit)
- **Depends on:** T5 (same file as `salary-calculator.tsx`; keeps the two edits from colliding)
- **Reuse:** the existing JSX structure, the existing `text-caption text-ink-subtle text-pretty`
  and `AlertBanner` wrappers. **No element moves, no wrapper is added, no paragraph is merged
  or split into a new block.**
- **What to build — three strings, verbatim from `copy.md`, inside the JSX text nodes they
  already occupy:**

  **1. `day-summary.tsx` — the DSR caption (S3, `copy.md` §2.3):**

  > O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis do mês e conta só os domingos. Feriados não entram.

  "Feriados não entram." gets its own sentence. It is **not** redundant with "só os domingos":
  Lei nº 605/1949 art. 1º puts feriados in the repouso base, so the figure on screen is a
  **floor**, and a reader who does not know art. 1º cannot infer the gap. Do not weaken
  "se repitam" to "podem se repetir"; do not reverse the direction of the gap; do not move the
  caption away from the `DSR sobre os extras` row or behind any interaction. It stays inside
  the same `restDayPay > 0` branch.

  **2. `calculator-views.tsx` — the general footer disclaimer (S4, `copy.md` §2.4):**

  > Os valores são uma estimativa para você se organizar. Não substituem seu holerite, não valem como registro oficial de ponto e nada aqui é orientação jurídica ou contábil.

  The "nem" becomes a **second full negation** ("não valem"), deliberately: D3 — *not an
  official ponto record*, CLT art. 74 §2º and Portaria MTP nº 671/2021 — is the disclosure with
  the highest consequence and the lowest reader attention, and after the dash is cut it needs
  its own verb rather than a parallelism the punctuation change loosened. All four disclosures
  stay in the **same visible `<p>`**, in the footer, with no interaction to reveal any of them.
  Do not use parentheses (they demote D2–D4 to an aside). Do not weaken "não substituem" into
  "podem não substituir".

  **The next paragraph, `calculator-views.tsx:83-88` ("Não entram na conta: FGTS, …, a
  prorrogação da jornada noturna depois das 5h (Súmula 60 do TST), …"), is NOT touched, NOT
  shortened and NOT merged into this one.** `legal.md` S4 freezes it, and S9.2's permission to
  name `adicional noturno` in a descriptor is tied to that Súmula 60 clause surviving. The
  paragraph after it (`:90-99`, the table year and its norm) is also untouched: its defects are
  F3/F4 and they live in `.specs/0003-citation-registry/`.

  **3. `salary-calculator.tsx` — the zero warning (S5, `copy.md` §2.5):**

  > Sem ele os valores abaixo continuam em R$ 0,00. Esse zero não é o seu salário, é a falta do dado.

  The literal `R$ 0,00` stays, because it is the exact string on the screen the reader is
  looking at. Neither half survives alone: the first describes what the screen shows, the
  second says that it is not an answer. The banner stays a `tone="danger"` `AlertBanner`
  directly above the zeroed fields.
- **Tests:** three case-sensitive regexes now fail and must be updated — they are **string
  updates, never deletions** (AC24):
  - `__tests__/day-summary.test.tsx:181` — `/feriados não entram/` → `/Feriados não entram/`.
  - `__tests__/calculator-views.test.tsx:69` — `/não substituem seu holerite/` →
    `/Não substituem seu holerite/`.
  - `__tests__/salary-calculator.test.tsx:170` — `/esse zero não é o seu salário/` →
    `/Esse zero não é o seu salário/`.

  Then add one case per file, querying by accessible role and name, asserting the disclosure
  survives as a whole rather than as a fragment:
  - `day-summary.test.tsx`: the caption text contains both `"Súmula 172 do TST"` and
    `"Feriados não entram"` **in one element**, so a future split into two elements is caught.
  - `calculator-views.test.tsx`: one element contains all four of `"estimativa"`,
    `"Não substituem seu holerite"`, `"não valem como registro oficial de ponto"` and
    `"orientação jurídica ou contábil"`; and a separate assertion that the
    `"prorrogação da jornada noturna depois das 5h (Súmula 60 do TST)"` clause is still on the
    page — that clause is the condition of the S9.2 permission and nothing else pins it.
  - `salary-calculator.test.tsx`: the `role="alert"` banner contains both `"R$ 0,00"` and
    `"Esse zero não é o seu salário"`.
- **Done when:** `pnpm test __tests__/day-summary.test.tsx __tests__/calculator-views.test.tsx __tests__/salary-calculator.test.tsx`
  green, `pnpm check` clean, `git diff __tests__/` shows no removed `it()`, no removed
  `expect()` and no `.skip` — advances **AC1**, **AC2**, **AC24**.

---

### T8 — Retire the "banco de horas" claim across C1–C7 and fix the four separators

- **Files:**
  - `lib/calculator-view.ts` (edit — C6)
  - `lib/og-image.tsx` (edit — C5)
  - `lib/structured-data.ts` (edit — separator only, S7)
  - `app/page.tsx` (edit — C1, C2)
  - `app/opengraph-image.tsx`, `app/twitter-image.tsx` (edit — C3, C4)
  - `app/custo-da-hora/opengraph-image.tsx`, `app/custo-da-hora/twitter-image.tsx` (edit — S8)
  - `__tests__/app-header.test.tsx`, `__tests__/page.test.tsx`,
    `__tests__/calculator-page.test.tsx` (edit — C7)
- **Depends on:** none
- **Reuse:** `VIEW_HEADINGS` from `lib/calculator-view` — it is the **single source** of the
  `work` descriptor and it already feeds both the `h1` and the JSON-LD `name`.
- **What to build — every string verbatim from `copy.md` §2.7–2.11 and §3:**

  | # | File · line | New value |
  |---|---|---|
  | C6 | `lib/calculator-view.ts:9` | `work: "Calculadora de jornada de trabalho, horas extras e saldo do dia",` |
  | — | `lib/structured-data.ts:27` | `` name: `WorkLoad: ${VIEW_HEADINGS[view]}`, `` |
  | C3 | `app/opengraph-image.tsx:3` | `export const alt = "WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia";` |
  | C4 | `app/twitter-image.tsx:3` | identical to C3, character for character |
  | — | `app/custo-da-hora/opengraph-image.tsx:3` | `export const alt = "WorkLoad: Calculadora de valor da hora e salário líquido CLT";` |
  | — | `app/custo-da-hora/twitter-image.tsx:3` | identical to the line above, character for character |
  | C1 | `app/page.tsx:6` | `title: { absolute: "Calculadora de Jornada, Horas Extras e Saldo do Dia | WorkLoad" },` |
  | C2 | `app/page.tsx:11` | `title: "Calculadora de Jornada, Horas Extras e Saldo do Dia",` |
  | C5 | `lib/og-image.tsx:14` | `title: "Jornada de trabalho, horas extras e saldo do dia",` |

  Five rules the developer must not have to infer:

  1. **`lib/structured-data.ts:27` changes the separator and nothing else.** The
     `${VIEW_HEADINGS[view]}` interpolation is untouched. It inherits C6. Editing the
     descriptor there would create two sources of truth for one claim and is a declared defect
     (`spec.md` AC20, `legal.md` §14.2).
  2. **C3 and C4 must be byte-identical to each other, and both must equal
     `"WorkLoad: " + VIEW_HEADINGS.work`.** That is what closes AC22 by string comparison
     instead of by a reviewer judging what "same descriptor" means. Same for the two
     `custo-da-hora` alts.
  3. **`saldo` is always immediately followed by `do dia` / `do Dia`** (`legal.md` S9.1).
     "saldo de horas" is the colloquial name of the instrument being retired and passes AC21's
     grep; it is forbidden. No noun may sit between `saldo` and the day scope.
  4. **C5 is a strict subset of C3/C4** (S9.4): same items, minus the brand and minus the word
     "Calculadora", which the bitmap already carries in its identity. If a future revision must
     shorten it, the permitted cut is the **whole `saldo` item** — never the words "do dia".
  5. **Do not touch** `app/page.tsx:8` (`description`), `app/page.tsx:12`
     (`openGraph.description`), `OG_CONTENT.work.subtitle`, `app/manifest.ts`,
     `app/layout.tsx` metadata, `app/sitemap.ts`, `app/robots.ts`, `README.md` or `public/**`.
     `legal.md` §14.2 recorded each as a verified negative result. `app/manifest.ts` in
     particular is already inside the permission and an edit there is a defect.
  6. **Do not invent a compensating keyword anywhere.** Five indexed surfaces lose a
     high-volume term and `spec.md` accepts that cost explicitly. Recovering it is out of scope
     and improvising it is the creep `spec.md` R5 names.
- **Tests — C7, four assertions, updated in place, none deleted (AC24):**
  - `__tests__/app-header.test.tsx:12` — the `HEADING` const becomes
    `"Calculadora de jornada de trabalho, horas extras e saldo do dia"`.
  - `__tests__/page.test.tsx:33` — `"Calculadora de Jornada, Horas Extras e Saldo do Dia | WorkLoad"`.
  - `__tests__/page.test.tsx:38` — `"Calculadora de Jornada, Horas Extras e Saldo do Dia"`.
  - `__tests__/calculator-page.test.tsx:39` — the `getByRole("heading", { level: 1, name: … })`
    query becomes `"Calculadora de jornada de trabalho, horas extras e saldo do dia"`.

  Then add one case to `__tests__/calculator-page.test.tsx`:
  `it("emits the same descriptor in the JSON-LD name as in the h1", …)` — parse the rendered
  `application/ld+json` payload and assert its `WebApplication.name` equals
  `` `WorkLoad: ${VIEW_HEADINGS.work}` ``, built from the import, not from a literal. That is
  AC22's four-way diff turned into a standing test, and it is what makes an edit to
  `structured-data.ts` visibly wrong.

  `__tests__/opengraph-image.test.ts` — add an assertion that the root `alt` export equals
  `` `WorkLoad: ${VIEW_HEADINGS.work}` `` and that the `opengraph` and `twitter` alts are equal
  to each other.
- **Done when:** `pnpm test` fully green, `rg -i 'banco de horas' app components lib __tests__`
  returns nothing, `pnpm build` clean — advances **AC1**, **AC2**, **AC19**, **AC20**,
  **AC22**, **AC24**.

---

### T9 — Make the claim guards permanent: one regression test file

- **Files:** `__tests__/copy-guards.test.ts` (**create** — the only new file in this spec)
- **Depends on:** T3, T4, T5, T6, T7, T8. Every assertion below fails against the tree before
  those tasks land, which is exactly the property that makes it a guard.
- **Reuse:** `node:fs` `readFileSync`, and `VIEW_HEADINGS` from `@/lib/calculator-view`. **No
  new dependency, no glob library — the file lists are literal, because the point of the guard
  is that adding a descriptor surface should require touching this file.**
- **What to build:** one `describe` block per acceptance criterion, each reading source text
  from disk relative to `process.cwd()`:

  ```ts
  const DESCRIPTOR_SOURCES = [
    "app/page.tsx",
    "app/opengraph-image.tsx",
    "app/twitter-image.tsx",
    "lib/og-image.tsx",
    "lib/calculator-view.ts",
  ];
  ```

  | Case | Assertion | Guards |
  |---|---|---|
  | "no descriptor names a compensation regime or an accumulation" | for each of `DESCRIPTOR_SOURCES`, the text does not match `/compensaç|compensar|acúmul|acumul|banco|crédito de horas|débito de horas|horas a compensar|saldo do mês|saldo mensal|histórico|registro de ponto|controle de ponto|folha de ponto|espelho de ponto/i` | AC19, AC21, `legal.md` S9.3 |
  | "every `saldo` in a descriptor is scoped to the day" | for each of `DESCRIPTOR_SOURCES`, `text.match(/saldo(?!\s+(do dia\|diário\|de hoje))/gi)` is `null` | **`legal.md` S9.1** — the hole the auditor's grep cannot express |
  | "no descriptor qualifies the night premium as complete" | none of `DESCRIPTOR_SOURCES` matches `/completo|todas as regras da CLT|todos os casos|qualquer jornada noturna|Súmula 60|prorrogaç/i` | `legal.md` S9.2 |
  | "the two root alts and the JSON-LD descriptor are the same string" | the `alt` exports of `app/opengraph-image.tsx` and `app/twitter-image.tsx` are equal to each other and to `` `WorkLoad: ${VIEW_HEADINGS.work}` `` | AC22, `legal.md` S9.4 |
  | "`lib/` never calls R$ 8.475,55 the contribution" | `lib/payroll.ts` does not contain `"teto de contribuição"` | AC23, `legal.md` S10.3 (the `teto do INSS` half is **T12**) |
  | "no user-visible em-dash or en-dash survives" | for each file under `app/`, `components/` and `lib/` with a `.ts`/`.tsx` extension, no line matches `/[—–]/` **unless** the line's first non-whitespace characters are `//` or `*`. The one legitimate survivor is the `biome-ignore` comment at `components/templates/calculator-page.tsx:11`, which `spec.md` § Out of scope exempts by name. Walk the tree with `fs.readdirSync(…, { recursive: true })`; no dependency. | AC1 |
  | "no icon comes from the retired library" | the same file walk finds no `lucide-react` | AC9 |
  | "no viewport-unit regression" | the same file walk finds no `min-h-screen` and no `h-screen` | AC11 |

  Keep it to those eight cases. Do not assert a Tailwind class, a colour, a tracking value or
  a rendered layout — this file guards **claims and bans**, and every one of them is a string
  fact about source text. It is a `.ts` file with no React, so it adds nothing to the
  `components/**` or `app/**` coverage denominators.
- **Tests:** this task *is* the test. Prove it guards something: before writing the
  assertions, run the file against `git stash`ed sources and confirm each case **fails**; a
  guard never seen red is a guard nobody knows works. Do that in an isolated `git worktree`,
  never in the shared tree (`AGENTS.md` §4 rule 6).
- **Done when:** `pnpm test __tests__/copy-guards.test.ts` green, `pnpm check` clean, and the
  file has been seen to fail against the pre-T2 tree — locks **AC1**, **AC9**, **AC11**,
  **AC19**, **AC21**, **AC22**, **AC23**.

---

### T10 — Reconcile `DESIGN.md` with what now ships (changes C1–C5)

- **Files:** `DESIGN.md` (edit)
- **Depends on:** T2, T3, T5
- **Reuse:** the document's existing section order and frontmatter shape. Add no new section
  beyond C1, no new token, no new type step, no new curve, no new colour, no new elevation
  level. `design.md` §11 argues, and this gate agrees, that none of the five is a human
  approval point under `AGENTS.md` §4.
- **What to build — five changes, exactly the ones `design.md` §11 specifies:**

  **C1.** Insert a new `## Design Read and Dials` section **immediately after `## Overview`
  and immediately before `## Colors`**. Copy the markdown block in `design.md` §1.3
  verbatim — it is already written as insertable text, including the Design Read sentence, the
  three dial values `DESIGN_VARIANCE: 3 · MOTION_INTENSITY: 2 · VISUAL_DENSITY: 5`, the
  Section 1.A / 1.B rows they are traced to, and the closing line making a change to any of the
  three a human approval point. Do not paraphrase it.

  **C2.** Typography frontmatter, lines 60–128: every one of the eleven
  `fontFamily: "var(--font-inter), system-ui, sans-serif"` values becomes
  `"var(--font-hyperlegible), system-ui, sans-serif"`, and each step's `lineHeight` and
  `letterSpacing` take the re-tuned values in T2's table. `fontSize` and `fontWeight` do not
  move on any step. Delete `fontVariation: "opsz auto"` from `numeral` — Atkinson has only a
  `wght` axis, so the line is now false. Leave the four `fontFeature: "tnum, zero"` lines'
  `tnum` and adjust per C3 below.
  Then line 327: the family sentence becomes **Atkinson Hyperlegible Next Variable
  (`next/font/google`)** with the same fallback stack. Then the eleven bullets under
  `### Hierarchy` (lines 337–348): each bullet's stated leading and tracking is updated to the
  re-tuned value.

  **C3 — the two factual corrections, and the reason this spec makes them rather than deferring
  them.** Both sentences are inside paragraphs C2 is already rewriting, and carrying a false
  claim through a rewrite re-publishes it (lesson 002):
  - Line 329's claim that Inter's variable `opsz` axis "lets the same family be a 11px overline
    and a 96px clock" is replaced by a statement that the optical work is done by the
    **per-step tracking** in the ramp, because Atkinson exposes only a `wght` axis.
    `font-optical-sizing: auto` stays in the CSS and is described as inert-but-correct.
  - Line 331's claim that "its slashed zero (`zero`) removes the 0/O ambiguity, at no extra
    byte", and every "tabular + slashed zero" phrasing that leans on it (lines 337, 340, 342,
    481, 594), is replaced by the measured fact: **Google Fonts' subsetter keeps a fixed
    default feature set (`calt ccmp dnom frac liga locl numr pnum tnum rvrn`) and drops `zero`
    from every family it serves**, so `slashed-zero` has been inert in this product since 0001;
    the disambiguation now comes from Atkinson's **default zero glyph**, which carries the slash
    in its outline (3 contours against every other candidate's 2) and therefore survives the
    subsetter and every fallback. The `@utility numeric` declaration is unchanged and is now
    correct in intent for the first time.
  - Line 608's "Inter's tabular figures are the numeric face" becomes Atkinson's.
  - Line 351's "The 700 Ceiling … Weight above 700 in Inter" — the family name only.

  **C4.** `### Iconography — lucide-react` (line 524) becomes
  `### Iconography — @tabler/icons-react`; in the stroke rule (line 527) `strokeWidth` becomes
  `stroke`; in the data-icon rule (line 528) the five Lucide names become
  `IconBolt` = overtime, `IconMoonStars` = night, `IconTrendingUp` = positive,
  `IconTrendingDown` = negative, `IconAlertTriangle` = the tone of its banner. **The five
  rules themselves are unchanged** — three sizes, two stroke weights, `currentColor`,
  `aria-hidden`, gap to adjacent text, one idea one icon — because Tabler shares Lucide's 24px
  grid and 2px stroke.

  **C5.** Two one-line prose amendments for the hero's statement mode: in `## Typography`, the
  **Title** bullet gains "and the hero's statement mode, where the value is a sentence rather
  than a figure"; in `### Hero panel`, a sentence stating that a value with no digit renders at
  `--text-title`, wrapping to at most two lines, without the `numeric` utility.

  **Do not** fix the stale component paths in the `### Hero panel` and `### Alerts` headings.
  They are a separate defect in a sentence no task here reopens, and correcting them is scope
  this gate was not given.
- **Tests:** none — `DESIGN.md` is documentation. It is verified by
  `node .agents/tools/docs-check.mjs 0002-design-taste-preflight` at G7 and by AC17's grep.
- **Done when:** `rg 'font-inter|lucide' DESIGN.md` returns nothing,
  `rg 'slashed zero.*ambiguity|opsz' DESIGN.md` returns nothing that asserts a capability the
  served font lacks, and `node .agents/tools/docs-check.mjs 0002-design-taste-preflight` is
  clean — advances **AC4**, **AC17**, **AC18**'s replacement (`design.md` §2.6 records the
  rejected candidates; Inter is not kept, so AC18 itself does not apply).

---

### T11 — Record the after-measurements and the figure evidence

- **Files:**
  - `.specs/0002-design-taste-preflight/evidence/after.md` (create)
  - `.specs/0002-design-taste-preflight/evidence/` — screenshots (create)
  - `.specs/0002-design-taste-preflight/evidence/preflight-matrix.md` — **already exists**,
    written by `product-designer`. Verify it is present and that its box count is 62. Do not
    rewrite it.
- **Depends on:** T2, T3, T4, T5, T6, T7, T8, T9
- **Reuse:** `.lighthouserc.js`, `.agents/tools/route-js.mjs` and `.agents/tools/preview.mjs`
  (both created/repaired in T1), the Playwright suite. All exist by the time this task runs.
- **What to build:** five measurements, each with the command, the number and the date. Who
  reads them: `release-manager` transcribes the LCP pair and the byte delta into
  `reports/release.md` (AC7, AC8, AC10); `web-standards-auditor` reads the axe and contrast
  output into `reports/audit.md` (AC12, AC13); `qa-engineer` reads the suite results.
  1. **Route JS (AC10) — amended at G5 run 1 (B3).**

     ```
     pnpm build
     node .agents/tools/route-js.mjs index custo-da-hora
     ```

     Same two routes as T1, same command, same `{ level: 9 }` gzip, so the pair is comparable by
     construction. Record the full output and compute the delta in **bytes** against
     `evidence/baseline.md` § 1 (`/` = 228,446). No estimate and no unit conversion: both sides
     are already gzipped bytes. **Delta on `/` above 10,240 bytes → do not proceed; apply T3's
     pre-authorised deep-import fallback, re-run both commands, and if it is still over, stop and
     record it in `STATUS.md § Blockers`.** A *negative* delta is the expected outcome and is
     recorded with the same precision — AC10 is "does not grow", and a shrink is the evidence it
     did not.
  2. **LCP (AC7, AC8).** Identical protocol to T1 step 2 (the one T1 recording that was never
     blocked; its numbers are in `evidence/baseline.md` § 2) — ads off
     (`NEXT_PUBLIC_ENABLE_ADS=false`), `pnpm start`, `pnpm exec lhci autorun`, default mobile
     preset, three runs, same machine. Record all three runs, the median and the date, next to
     T1's numbers. ~~**Median over 2500 ms → stop and record it**: `spec.md` R3 disqualifies the
     family regardless of the aesthetic case and `design.md` §2.6 names **Asap** as the
     pre-analysed replacement, but that reversal is mine to order.~~ **DONE at run 3; stop
     condition raised as B5 and RULED at G5 run 4 — see § Amendment — G5 run 4 (B5). Atkinson
     ships. Do not swap the family. Step 2 is closed; step 2b below replaces the stop
     condition.**
  2b. **LCP variance, nine runs (AC7, AC8) — added at G5 run 4 (B5).** Exactly the protocol of
     step 2, with the run count raised on the command line so no config file changes:

     ```
     NEXT_PUBLIC_ENABLE_ADS=false pnpm build
     NEXT_PUBLIC_ENABLE_ADS=false pnpm exec lhci autorun --collect.numberOfRuns=9
     ```

     Close every other application on the machine first and record that you did. For **each**
     route record: all nine LCP values, the **median**, the **min**, the **max**, and the
     **count of runs at or under 2500 ms**. Then, from the median run's `lhr-*.json` in
     `.lighthouseci/`, record the four LCP phases verbatim
     (`audits["largest-contentful-paint-element"].details.items[1].items`): TTFB, Load Delay,
     Load Time, Render Delay, plus the LCP element's `snippet`.

     **There is no stop condition on this step and no code change may follow from it.** It is
     evidence for a `product-manager` decision on AC7 that is already routed and running in
     parallel. Record it in `evidence/after.md` § 2b and continue straight to step 3 whatever
     the numbers say.
  3. **axe + console, both themes (AC12) — amended at G5 run 1 (B4).**
     `node .agents/tools/preview.mjs --out .specs/0002-design-taste-preflight/evidence/after --path /,/custo-da-hora`
     — zero violations at `critical` or `serious`, zero console errors, in light and dark, at
     390 and 1440. Compare count-for-count against `evidence/baseline.md` § 3: a violation that
     was already there is `web-standards-auditor`'s call at G6, a violation this spec introduced
     is yours to fix before T11 closes, and the before/after pair is what tells the two apart.

     **This is evidence for AC12 only. AC13 is not discharged here** — that was an error in this
     plan at run 1, corrected in § Amendment — G5 run 1 (B4). No task in this spec changes a
     colour token, so the computed colours axe measures do not move and an axe contrast pass
     proves nothing about a type swap. AC13's evidence of record is `DESIGN.md` § Colour, whose
     every token pair carries its measured ratio and which T10 keeps in agreement with what
     ships, plus steps 4 and 5 below for the one thing a type swap *can* change and axe *cannot*
     see: apparent contrast at a lighter stroke weight. Record in `evidence/after.md`, in one
     sentence, that no colour token moved, and name the `git diff app/globals.css` hunk range
     that proves it — `web-standards-auditor` reads that sentence into `reports/audit.md` for
     AC13.
  4. **Tabular alignment (AC5).** At 390px on `/` and on `/custo-da-hora`, type into the
     entrada field and watch the hero numeral and the stat-tile figures: **no character to the
     right of a changing digit moves by one pixel.** Screenshot both, both themes, into
     `evidence/`.
  5. **Figure disambiguation (AC6).** A specimen of `0O1lI` and `R$ 1.087,10` at **0.75rem /
     12px** (`--text-caption`, the smallest step that carries a figure), both themes, rendered
     in a real browser with the shipped stack, screenshot into `evidence/`. **If the caption
     specimen is unreadable on a real 390px device, apply T2's pre-authorised size
     contingency, then re-run AC14.**
  6. **Overflow (AC14).** `pnpm e2e` — the existing suite at 390 / 1440 / 2560 / 3840, both
     themes. Expected green without change, because every pt-BR string narrows by 3–6% under
     Atkinson.
- **Tests:** `pnpm test:coverage` — 100% on `lib/**` and `hooks/**`, ≥ 90% on `app/**` and
  `components/**`. `hooks/**` was not touched by any task and must not have moved.
- **Done when:** `evidence/after.md` holds all six results with their dates and commands;
  `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test` and
  `node .agents/tools/docs-check.mjs 0002-design-taste-preflight` are all clean — advances
  **AC3**, **AC5**, **AC6**, **AC7**, **AC8**, **AC10**, **AC12**, **AC13**, **AC14**,
  **AC15**, **AC16**.

---

### T12 — BLOCKED · `lib/payroll.ts:32` says "teto do INSS", which `legal.md` S10.3 forbids

- **Files:** `lib/payroll.ts` (edit — the `estatutario` `impact`, line 32),
  `__tests__/payroll.test.ts` (edit)
- **Depends on:** T6, **and on blocker B2 being resolved** (see `STATUS.md`). Do not start it.
- **The conflict, stated plainly.** `legal.md` **S10.3** is binding and says the phrase
  *"teto do INSS"* — "the same collapse in colloquial dress" — must not appear **anywhere in
  `lib/`**. `copy.md` §5 marks `lib/payroll.ts:31` *"inalterada (não tem travessão), fora de
  escopo"*. Re-grepped at this gate rather than trusted from either document (lesson 001): the
  phrase is at **`lib/payroll.ts:32`**, inside the `estatutario` `impact`:

  > "Aplicamos a tabela do RPPS federal: a contribuição não para no **teto do INSS** e as faixas
  > seguem subindo até 22% sobre a parcela mais alta. …"

  Two closed gates disagree, and `AGENTS.md` §4 rule 8 settles which wins: `labor-law-analyst`
  cannot be overruled by scope or schedule, so S10.3 stands and the clause must change. But the
  **wording** is `content-writer`'s and the **scope** is `product-manager`'s, and this role may
  decide neither. It is routed, not resolved here.

  It also matters on its own terms, not only as a rule violation: after T6, the same
  `RegimeField` disclosure will say *"o teto do salário de contribuição"* for CLT and *"o teto
  do INSS"* for estatutário, two names for one figure, one screen apart — which is precisely
  the collapse S10 exists to remove.
- **What to build:** nothing until B2 returns a string. When it does: replace the clause
  verbatim, change **no number**, keep "RPPS federal", keep "22%", keep the estadual/municipal
  scope limit, and keep the whole `impact` a single string with no interpolation added.
- **Tests:** keep `__tests__/payroll.test.ts:58-59`
  (`toContain("RPPS federal")`, `toContain("estadual ou municipal")`) unchanged. Add one case
  asserting no `impact` in `WORK_REGIME_INFO` contains `"teto do INSS"`, and move the
  corresponding assertion into `__tests__/copy-guards.test.ts` so the ban is guarded for `lib/`
  as a whole, completing T9's fifth case.
- **Done when:** `rg 'teto do INSS' lib` returns nothing, `pnpm test:coverage` still 100% on
  `lib/**` — completes **AC23**'s intent and `legal.md` **S10.3**.

---

## Risks

| # | Risk | Signal it happened |
|---|---|---|
| R1 | **The ramp is copied rather than re-tuned.** `spec.md` R1 calls this a failure of the design gate, and it is invisible in a green suite because no test asserts a tracking value. | `git diff app/globals.css` shows `--text-*--letter-spacing` values identical to the pre-change file, or shows a `font-size` that moved. Diff the file against T2's table, row by row. |
| R2 | **The font swap pushes LCP up instead of down.** `display: "swap"` means the LCP text often paints in the metric-adjusted fallback before the webfont lands, so the 38 kB saving may not show in the LCP number at all. | T11's median LCP for `/` is at or above T1's. `spec.md` R3 then disqualifies Atkinson regardless of the aesthetic case; `design.md` §2.6 names **Asap** as the pre-analysed replacement. Route it to me — do not swap families on your own. |
| R3 | **The icon swap costs bundle size.** `@tabler/icons-react` has no `sideEffects: false`, so the whole thing rests on Next rewriting the root named imports. A Next upgrade, a config change or a stray deep import breaks it silently. | T11 step 1's `ROUTE_JS_GZIP index` figure exceeds T1's 228,446 bytes by more than 10,240. Apply T3's deep-import fallback, re-run `pnpm build && node .agents/tools/route-js.mjs index custo-da-hora`, then stop. |
| R4 | **A rewritten disclaimer quietly narrows.** The highest-consequence failure in this spec and the only one no command catches: a sentence that reads better and discloses less. | `labor-law-analyst` reads the rendered screen at G6 against S1–S10, not the diff. The specific things to look at: does "Feriados não entram." still read as a named gap rather than a flourish on "só os domingos"; does D3 still have its own verb; does the RGPS sentence still let a reader get all four of the base, that it *is* the base, the maximum withheld, and the year, without inference. |
| R5 | **A test is deleted to make the suite green.** Four assertions pin strings that are moving, and three more are case-sensitive regexes that will fail on a capitalised first word. Deleting one is invisible in a green run. | `git diff __tests__/` shows a removed `it()`, a removed `expect()` or a `.skip`. AC24. Check the diff, not the result. |
| R6 | **The claim comes back through a surface nobody re-grepped.** Lesson 001, three times over in this spec already. | `rg -i 'banco de horas'` over the **whole working tree** returns anything outside `.specs/` and `PRODUCT.md`'s non-claim row. T9's guard covers the five descriptor files permanently; a sixth surface added later would not be in its list, which is deliberate — adding a descriptor surface must require editing the guard. |
| R7 | **`app/manifest.ts` gets "helpfully" edited.** It is metadata, it is near the claim surface, it is already compliant, and `legal.md` §14.2 recorded it as a verified negative result precisely because it is the thing an agent tidies. | `git diff app/manifest.ts` is non-empty. Same for `app/layout.tsx` metadata, `app/sitemap.ts`, `app/robots.ts`, `README.md` and `calculator-views.tsx:83-99`. |
| R8 | **Scope creep into `lib/legal-tables.ts`.** F3, F4 and F5 are real, major, and sitting right next to strings this spec is editing. Fixing one here is a single tempting line. | `git diff lib/legal-tables.ts` is non-empty. It belongs to `.specs/0003-citation-registry/`, and the boundary is what guarantees a typography pass never became a calculation pass (LD7). |
| R9 | **B2 is forgotten.** T12 is the only task that does not run in sequence, and a blocked task with no owner is a task that never happens. | The spec reaches G7 with `rg 'teto do INSS' lib` still returning a line. `release-manager` must not close the docs gate while `STATUS.md § Blockers` holds an open B2. |
| R10 | **The route-JS figure is taken by a different method on one side of the pair.** `route-js.mjs` is new, the metric it replaces was removed by the framework, and a developer or reviewer who does not read § Amendment — G5 run 1 will reach for a bundle analyser, the sum of `.next/static/chunks/`, or Lighthouse's script weight. Any of those makes the delta meaningless while both numbers look plausible. | `evidence/after.md` § 1 does not contain a line starting `ROUTE_JS_GZIP`, or contains one whose chunk count differs from the baseline's **9** without T3's deep-import fallback having been applied, or states the figure in kB only. Both sides must be the verbatim output of the same command. |
| R11 | **A tool is trusted because it is in the repo, not because it ran.** B4's root cause, and it is not one tool: two of the three browser tools in `.agents/tools/` were vendored with an unresolvable import and neither had ever executed here, while `AGENTS.md`, the auditor's definition, two slash commands and `.specs/README.md` all instruct agents to run them — and `.specs/0001-foundation`'s **AC18** was closed on `preview.mjs`'s output. | Any gate reports a tool's result without a pasted stdout, an artefact path or an exit code. The standing check: an evidence command named in a plan must have produced a file in `evidence/` with a timestamp from this run. |

---

## Amendment — G5 run 4 (B5): the LCP gap is not the font, and the font does not move

`frontend-dev` hit T11 step 2's pre-authorised stop condition and refused to resolve it, which
was correct. This is the ruling. It changes no task's behaviour except T11's, and it orders no
application code.

### 1. The stop condition was mis-drafted. R3's trigger never fired.

`spec.md` R3 reads: *"If the chosen family pushes LCP up, it is disqualified by AC7 regardless
of the aesthetic case."* The measured direction is **down**, on both routes, by more than the
run-to-run spread: `/` −155.8 ms, `/custo-da-hora` −231.4 ms. **R3 is not triggered and the
§2.6 Asap fallback is not reachable.** T11 step 2 as I wrote it collapsed two different
conditions — "the font made LCP worse" (R3, a font verdict) and "LCP is over 2500 ms" (AC7, a
page verdict) — into one branch, and so it pointed a font remedy at an AC7 miss. That is my
drafting defect, not the developer's, and it is the subject of lesson 010.

### 2. The remaining 31 ms is not on any resource. It is render delay.

Read from the median run's own report, `.lighthouseci/lhr-1789425054885.json`, LCP phases on
`/`:

| phase | ms |
|---|---|
| TTFB | 454 |
| Load Delay | **0** |
| Load Time | **0** |
| Render Delay | **2076** |
| **LCP** | **2530** |

`/custo-da-hora` is the same shape (455 / 0 / 0 / 2074). **Load Delay and Load Time are zero on
every one of the six runs**: no resource — no font, no image, no stylesheet — sits between the
LCP candidate and its paint. Corroborating, from the same report's `network-requests`: the
shipped Atkinson `847c6af3f14ca2aa.p.2dv7oiayrgfo5.woff2` is **34,024 bytes and finishes at
65 ms**, i.e. 2,465 ms before the LCP timestamp. `font-display` scores 1. FCP is 766 ms.

The LCP element is the hero numeral, `hero-panel.tsx:43`
(`<p aria-live="polite" class="numeric …">`). It paints its `--:--` placeholder at FCP and then
**mutates to the real value after hydration**, which re-registers the LCP candidate at the
mutation. That mutation is `design.md` §5.1 cause **2** — *"the value itself is client-gated"* —
the one cause §5.2 never put on the "what may change" table. The remaining cost is the client
bundle's download-plus-execute under simulated throttling (bootup 409 ms, main-thread 1,118 ms,
route JS 226,974 gzipped bytes), not typography.

**Therefore swapping to Asap would change a resource that carries 0 ms of the LCP budget and
completes 2.4 s before the metric lands. Predicted effect: none.** It would also reopen T2, T5,
T10 and T11 and re-expose AC5, AC6, AC13 and AC14. Cost high, expected benefit zero, and the
expectation is read off the instrument rather than argued. **Rejected.**

### 3. Is 31 ms real? Real in sign, unresolvable in magnitude — and that is enough either way.

Within-condition spread is ~106 ms on the after-runs (2529.8 / 2531.4 / 2636.3) and ~109 ms on
the T1 baseline. A 31 ms difference at n=3 with a ~106 ms spread is **inside the tool's own
noise** and no median at n=3 resolves it. What *is* outside noise: **all six after-runs, on both
routes, are above 2500 ms** (min observed 2529.7). Direction is consistent even though magnitude
is not measurable. AC7 as written therefore fails, and it fails for a cause no permitted change
can move. Step 2b raises n to 9 so the `product-manager` decides against a spread, not a guess —
but it cannot change this ruling, which is why step 2b carries no stop condition.

### 4. What is left inside the plan's allowance: nothing that targets render delay.

All three design-owned levers are already spent in T4 and they bought 156–231 ms: L1 (mount fade
deleted), L2 (font swap), L3 (both third-party `preconnect`s deleted). What would move render
delay — server-rendering the hero's first value, or removing the placeholder-to-value mutation —
is a rendering-architecture change; `spec.md` puts a redesign out of scope and forbids a
dependency for LCP. Dropping `aria-live` would trade AC12 for AC7 and is not available.
**No task is added. There is no lever left that this spec permits.**

### 5. AC7 is routed to `product-manager`. It is not softened here.

See `STATUS.md § B5` for the exact question. Nothing in this plan waits on it: T11 steps 2b and
3–6 run now, because the family is settled and every one of those steps was blocked only on the
family.

## Amendment — G5 run 5 (B6): AC7's verdict, the e2e config defect, the font-fallback warning

Three rulings. Only one of them produces work, and it touches no application code.

### 1. AC7 — verified against the run set its own verification cell names. It passes.

I am not restating AC7. I am applying it, including the command written in its verification
cell, which is the part of a criterion that says *which numbers it is about*:

> `NEXT_PUBLIC_ENABLE_ADS=false pnpm build` then `NEXT_PUBLIC_ENABLE_ADS=false pnpm exec lhci
> autorun` (default mobile preset, no `LH_PRESET`), same machine as the AC8 baseline. Every
> run's LCP, both medians and both spreads recorded in **`evidence/after.md` §2**.

That is the three-run default set in §2, designated by `product-manager` at run 4 — after §2b
had already been ordered and while it was known to be coming. Computed against §2:

| Route | (a) median < baseline median | (b) improvement > set spread | (c) no run above baseline median |
|---|---|---|---|
| `/` | 2531.406 < 2687.232 → **pass** | 155.826 > 106.528 → **pass** | 2636.296 < 2687.232 → **pass** |
| `/custo-da-hora` | 2537.612 < 2769.030 → **pass** | 231.418 > 93.394 → **pass** | 2623.128 < 2769.030 → **pass** |

**Six of six clauses pass. AC7 is satisfied.**

**Why §2b does not overturn it, and why this is not choosing the run set that passes.** Clause
(b) compares an improvement against **range** (max − min). Range is not an estimator of an
instrument's noise that is comparable across sample sizes: the expected range of nine draws from
a distribution is strictly larger than the expected range of three, with no change in the
underlying instrument. Clause (b) is therefore only decidable **at a fixed n**, and AC7's
verification cell fixes n at the `lhci autorun` default. Reading a nine-run range against a
clause calibrated on a three-run range is not a stricter test — it is a different test, with a
bar that moved for a reason that has nothing to do with the change being measured.

**And §2b does not weaken the finding it is evidence for — it strengthens it, on the clause that
is not n-fragile.** On `/`, clause (c) holds across **all nine** after-runs: every one of them is
below the baseline median. Under a null of "the change did nothing", that has probability
2⁻⁹ ≈ 0.2%. Nine-for-nine is a sharper statement about a real improvement than the range proxy
it fails by 6.97 ms. The two are not in conflict about whether the page got faster; they disagree
only about a threshold statistic that grows with the sample.

**§2b was ordered as evidence, not as verification.** The B5 ruling wrote it with no stop
condition and "no code change may follow from it", for `product-manager`'s AC7 decision and for
`0004`. It did its job: it is the record that the residual cost is render delay (Load Delay and
Load Time are exactly 0 on all 18 runs) and that no run reaches 2,500 ms. That finding travels to
`.specs/0004-lcp-render-delay/` intact.

**Routed to `product-manager` as a finding, not as a request to restate AC7 again:** clause (b)
names a sample-size-dependent statistic, so any spec that re-uses this criterion (starting with
`0004`) must either fix n in the criterion itself or use a dispersion statistic that does not
grow with n (standard deviation, IQR) — or state the improvement as a sign test over the runs,
which is what clause (c) already is and is the strongest thing this instrument produced.
**AC7's text in `0002` is not to be touched.** It has been restated once and it passes as
restated; a second pass under blocker pressure is how a criterion becomes decoration.

### 2. `playwright.config.ts` — the fix is in this spec, as T13

`reuseExistingServer: !process.env.CI` makes a local e2e result depend on a server this run did
not start and cannot inspect. Next inlines `NEXT_PUBLIC_*` at build/start, so a server started
without `NEXT_PUBLIC_ENABLE_ADS` serves a page with no ad markup to a run that believes it asked
for one — and the suite reports 21 application failures for a machine-state cause. It also
defeats `AGENTS.md` §4 rule 6: an isolated `git worktree` isolates the **files**, and a fixed
port is shared state that no worktree copies.

**This spec, not a follow-up.** It is a one-line change to a config file, it produced a false
finding inside this spec's own G5 evidence, and it is the same class of tooling repair this spec
already absorbed at B3/B4 (T1 step 0: the axe dependency and the two broken imports). Deferring
it leaves the next agent to pay the same bisect. It touches no application code and no AC.

**The fix is refusal, not detection.** Comparing a reused server's env against the run's env
means reading another process's environment, which is neither portable nor reliable; and a
warning that a run may be invalid is a warning agents will read after the wrong conclusion, not
before. Setting `reuseExistingServer: false` makes Playwright fail before the first test with
`http://localhost:3000 is already used`, which names the cause in the first line of output. The
cost is that a deliberately pre-started dev server is no longer reused locally. That is the right
trade at the price of two agents and one bisect.

### 3. The `next/font` fallback warning — settled by measurement, no owner needed

`next/font` could not compute font-override metrics for Atkinson Hyperlegible Next, so no
`size-adjust` fallback face is generated. The mechanism that warning threatens is layout shift on
the webfont swap, and this spec swapped the webfont, so the question is fair. It is also already
measured, on the shipped build, by the nine-run set §2b produced:

| Route | CLS, all 9 runs |
|---|---|
| `/` | 0.0011 (0.001114925 / 0.001117854) |
| `/custo-da-hora` | **0.000**, all nine |

The mechanism is absent rather than merely small: the font is self-hosted and preloaded by
`next/font`, finishes at 65 ms against an FCP of 766 ms, and `font-display` scores 1 — the
fallback face is never painted, so there is no swap to shift. 0.0011 is ~1% of the 0.1 CLS
threshold, on Lighthouse's throttled mobile preset, which is the adverse case.

**This does not go back to `product-designer`.** Routing it there would be asking for a design
decision to a question the instrument has already answered on the shipped artefact; the family
choice and the fallback stack are only re-openable if the measurement showed a cost, and it shows
0.000 on one route and 0.0011 on the other. What is owed is the **record**, so the next agent to
meet this warning does not re-derive it — T11 gains a step 7 to paste the table above into
`evidence/after.md`. If a future change makes the font arrive after first paint (a CDN move, a
non-preloaded face, an `@font-face` written by hand), this warning becomes live again and the
same CLS column is the check.

### T13 — Stop Playwright from reusing a server this run did not start

**Files**
- `playwright.config.ts` — *edit*

**What to build**

One line. In the `webServer` block, replace:

```ts
    reuseExistingServer: !process.env.CI,
```

with:

```ts
    // A reused server carries the NEXT_PUBLIC_* values of whoever started it; a mismatched
    // one silently serves a different page and the suite blames the application.
    reuseExistingServer: false,
```

Nothing else in the file changes: `command`, `url`, `timeout`, the three projects, `storageState`
and every `process.env.CI` branch outside `webServer` stay exactly as they are.

**Reuse** — none. No new dependency, no new file, no helper.

**Tests** — no test file. Playwright's own startup is the check, and it is run twice:

1. With port 3000 free:
   `NEXT_PUBLIC_ENABLE_ADS=true NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000 pnpm e2e`
   → **43 passed, 0 failed.** Paste the summary line into `evidence/after.md` §6.
2. With a foreign server occupying the port — start `pnpm dev` **without** `NEXT_PUBLIC_ENABLE_ADS`
   in a second shell, then run the same command → Playwright must **abort before the first test**
   with `http://localhost:3000 is already used`. Paste that line too. Kill the server afterwards.
   This is the whole point of the change: the second run must fail loudly, not report application
   failures.

**Done when** — both outputs are in `evidence/after.md` §6, `pnpm check` is green, and
`git diff -- playwright.config.ts` is the three lines above and nothing else.
**Advances:** AC14 and AC16 — it is what makes their evidence trustworthy rather than
machine-dependent.

**Depends on** — none. It can run before or after T11's step 7.

### T11 — amended: step 7, and §6 rewritten

**Step 7 (new).** Paste the CLS table from §3 of this amendment into `evidence/after.md` as a new
**§7 — CLS and the `next/font` fallback warning**, with: the warning text verbatim from
`pnpm build`, the per-route CLS figures read from the same nine `lhr-*.json` files §2b used
(`audits["cumulative-layout-shift"].numericValue`), the `font-display` score, and the one-line
reading — *the fallback face is never painted, so the missing `size-adjust` costs nothing here;
this column is the check if the font ever arrives after first paint.* No new Lighthouse run: the
numbers are in the reports §2b already cites.

**§6 is rewritten, not amended.** The "21 pre-existing failures across 7 titles" paragraph and its
worktree-probe conclusion are **withdrawn — the conclusion was wrong** and leaving it in the
evidence file leaves a false finding for `qa-engineer` and `release-manager` to act on. Replace it
with: the correct result (43 passed, 0 failed, both env vars set, port 3000 free), the cause
(`reuseExistingServer` + `NEXT_PUBLIC_*` inlining), and one line recording that the worktree probe
reproduced the failures **because it hit the same dirty server from both ends** — the method was
right, its isolation boundary was not. Keep AC14's own 13-of-13 result; it was correct and is
unaffected.

**T11's done-when is unchanged and now reachable**: `pnpm check`, `pnpm build`, `pnpm e2e` and
`node .agents/tools/docs-check.mjs 0002-design-taste-preflight` all clean, with `pnpm e2e` clean
meaning the 43/43 of T13's check 1.
