# 0010 — disclosure reachability on mobile

> Owner: tech-lead · Gate: `plan` · Run 1

---

## 0. What binds this plan, and what it is forbidden to re-open

`plan.md` is bound by `legal.md` **§4, §5, §6, §8, §11** and by **Addendum A**: **A1.6 (LR4.2a)**,
**A2.2 (LC1)**, **A2.4**'s prohibition on any immediate-revocation string, and **A5**'s **W9–W13**.
It is bound by `design.md`'s four movements **M-O / M-R / M-B / M-D**, its 32-cell measurement, its
§15 system changes **S1 / S2 / S3**, and its §16 nine-item carry list. `copy.md` is an explicit
no-op: **AC5's exemption list is EMPTY**, and this plan budgets **zero copy tasks**.

Three facts settled today and treated as given, never re-derived:

1. **The existential reading of LR4.2 is confirmed** (`legal.md` A1.6). `design.md`'s 32 cells stand.
   No movement is excluded and nothing is re-measured at G4.
2. **M-B is a precondition of M-O, not a remedy.** Without it the red subject is the one this spec
   measured: DS1 P3 needing `scrollY` **2529.6** against a document max of **2516** on `/`, and
   **1162.8** against **1149** on `/custo-da-hora`. **T3 lands before T5, and if T3 is dropped T5 is
   dropped with it.** That pairing is binding and it is why the task order below is not negotiable.
3. **F2a is settled as LC1**, and it resolves in this tree to `useState(false)` at
   `components/organisms/cookie-consent.tsx:15` with `:17-26` **untouched**. LC1.7 is the axis a
   one-word fix breaks. `0011`'s `version` field is **not** a precondition here.

**Human approval, recorded with its provenance.** `design.md` §15's **S1**, **S2** and **S3** are
`DESIGN.md` system changes and therefore human approval points under `AGENTS.md` §4. The owner
**approved all three** for this batch and delegated the calls; the approval is recorded in
`STATUS.md`'s decisions log with that provenance. They are **not** re-opened here, and **T7** writes
them into `DESIGN.md`.

**`0011` sequencing, approved by the human (Q5).** `cookie-consent.tsx:56` already carries
*"Você pode optar por desativar a telemetria a qualquer momento"*, which `0011` §20.2 rules
measurably false. **M-O moves its container and does not edit its text**, so under `0008` §6 O2 and
lesson **002** that is neither re-endorsement nor rejection. The human approved planning
**`0011`'s RV1–RV3 and the replacement of that string as one shippable unit**, in `0011`. **No task
in this plan writes, rewords, strengthens or newly renders any string implying immediate
revocation** (`legal.md` A2.4 / W13). If replacing that string turns out to need words, that reopens
`content-writer` — **in `0011`, not here** — and this plan says so.

---

## 1. Architecture

### 1.1 The structural picture, traced in this tree

Read before planning, with the call chain that carries each change:

```
app/layout.tsx
  └─ ThemeProvider  (components/templates/theme-provider.tsx — MotionConfig reducedMotion="user")
       ├─ {children}  →  app/page.tsx | app/custo-da-hora/page.tsx
       │                   └─ CalculatorPage (components/templates/calculator-page.tsx)
       │                        └─ <main>  ├─ AppHeader  (fixed, 0..65)
       │                                   └─ CalculatorViews (components/organisms/calculator-views.tsx)
       │                                        ├─ <nav>  (fixed route nav, 766..828)
       │                                        └─ #main-content
       │                                             ├─ motion.div → WorkCalculator | SalaryCalculator
       │                                             │    └─ CalculatorLayout (templates/ — NOT EDITED)
       │                                             │         ├─ main:  JourneyForm | salary card + DaySummary
       │                                             │         └─ aside: HeroPanel
       │                                             └─ <footer>  DS1 P1, P2, P3, P4
       ├─ AdManager
       └─ CookieConsent (components/organisms/cookie-consent.tsx)   ← today: a sibling of {children}
```

Both routes render `CalculatorViews`, and `CalculatorViews` is the only owner of `#main-content`.
That is why M-O's destination is `calculator-views.tsx` and not a template: moving `<CookieConsent />`
there reaches every route the app has, and `app/` has exactly two pages
(`find app -type f` → `app/page.tsx`, `app/custo-da-hora/page.tsx` plus metadata routes).

**`components/templates/calculator-layout.tsx` is not edited** (`spec.md` § Out of scope 4, AC11).
The citation reaches the answer's column through the existing `aside` slot, which is why
`work-calculator.tsx` and `salary-calculator.tsx` are the two files that compose it.

**Nothing under `lib/` changes** (`spec.md` § Out of scope 5). `TableCitation` reads
`CURRENT_LEGAL_YEAR` from `lib/legal-tables.ts` exactly as the footer paragraph does today, through
`formatIsoDate` from `lib/utils.ts`. No rate, no bracket, no year, no rounding rule is touched. There
is no hook boundary in this spec: **no file under `hooks/` is opened**, which is also what keeps
`0004` F1 / LR5.4 out of scope (`STATUS.md`, carried debts).

### 1.2 The metric, decomposed on the current build, and what each lever moves

This spec's acceptance criteria are numeric and geometric, so the decomposition comes first and it is
a measurement, not an estimate. Every number below is `design.md` §0/§2's, read off an isolated
production build (`evidence/g3-baseline.txt`, 16 cells, reproduced to the tenth of a pixel).

**The quantity: the 390×844 first screen, 844 px, decomposed.**

| Term | Today | Instrument |
|---|---|---|
| fixed header | 65 | `g1-chrome.mjs` |
| fixed route nav | 62 (`766..828`) | `g1-chrome.mjs` |
| fixed consent banner | **466** (`354..820`) | `g1-chrome.mjs` |
| **fixed chrome, summed** | **593 of 844 (70.3%)** | `g1-chrome.mjs` |
| unoccluded flow band between header and tab bar | **701** | `g3-baseline.txt` |
| answer panel on `/` inside that band | **643.4** (`96..739.4`), 8/8 cells | `g1-answer.mjs` |
| free flow height on the first screen | **57.6** | 701 − 643.4 |
| what a relocated DS1 P4 needs | **42.8** (34.8 surface + 8 gap) | `g3-baseline.txt` |

**Each lever, against the term it reduces and by how much:**

| Lever | Term it reduces | Expected | Measured by `design.md` |
|---|---|---|---|
| **M-O** | fixed consent banner, 466 → 0 | **−466** of fixed chrome; `linesOccluded` 4/6/5 → 0 | chrome **593 → 171**; `linesOccluded` **0** in 16/16 |
| **M-R** | spends 42.8 of flow height, buys the AC1 surface | +42.8 flow, R satisfied | citation `707.4..742.2`, clearance **23.8** |
| **M-B** | the bottom reserve, 64 → 96, against a 78 px tab bar band | LR3.5 attainability for *whatever is last* | reserve **95.8 / 96.2**, 18 px slack |
| **M-D** (D1–D6) | flow height above the citation | **−64** at 390 (16+16+16+8+8+8), of which 48–64 is realised | answer label `vtop` **133.8 → 104.7**, i.e. **−29.1** |

**The lever with a near-zero term, struck and stated.** D4 (`pt-6 → pt-4` on the hero footer rule)
and D6 (`mt-6 → mt-4` on the period control) each buy **8 px**, and D6's 8 px sit on
`/custo-da-hora` only, below the citation's landing point — it does **not** reduce the term that
gates AC1 on `/`. It is kept, deliberately, for a reason stated in writing: **AC15** scores
`#salario-bruto`'s bottom on `/custo-da-hora`, and D5 + D6 are what turn that number from a wash
into a measured **−6.1 / −7.0**. A lever kept for a different term than the headline one is
recorded as such rather than left to look like padding.

**The two verdicts are kept in separate branches, with separate destinations.** A run may produce
either of these and they are not the same finding:

- **Component verdict — "this change made a term worse."** Any cell where the answer label's `vtop`
  rises (AC2), `scrollY` to DS1 P1 rises (AC7), `#salario-bruto`'s bottom rises (AC15), or the fixed
  chrome sum rises (AC3). **Destination: `tech-lead`, as an amended task for `frontend-dev`** — the
  lever regressed the term it was supposed to reduce, and the plan is what is wrong.
- **System verdict — "the metric is over target."** `linesOccluded` non-zero in any cell (AC13), or
  no surface satisfying all three clauses of R in any cell (AC1), **with every component term at or
  better than its expected value**. **Destination: `tech-lead` → `product-designer`**, because the
  four movements were measured to be sufficient and the built artifact disagrees with the
  measurement; per `design.md` §16.1 the artifact corrects the document at the gate that found it.

The case where exactly one of the two fires is the case a fused branch gets backwards, and it is the
normal outcome of a real improvement landing short. **A partial pass — AC1 green and AC13 red, or the
reverse — is a rejection** (`spec.md` § Acceptance criteria) and it is reported with **both** numbers.

**No fallback is pre-ordered here.** `legal.md` §4.5 closed every remedy family except M-O's, so
there is no second option to reach for; if M-O's family fails against the built artifact, the
attribution comes first and the finding goes to the human, not to an alternative nobody measured.

### 1.3 Component tree, with atomic levels

| Component | Level | Change | Path |
|---|---|---|---|
| `TableCitation` | **molecule** | **create** — a *move*: the `<p>` it replaces is deleted from the footer in the same task | `components/molecules/table-citation.tsx` |
| `CalculatorViews` | organism | edit — D1, M-B, footer loses P4, `<CookieConsent />` becomes the last block of `#main-content` | `components/organisms/calculator-views.tsx` |
| `WorkCalculator` | organism | edit — `aside` becomes `<>{hero}{citation}</>` | `components/organisms/work-calculator.tsx` |
| `SalaryCalculator` | organism | edit — same, plus D5 and D6 | `components/organisms/salary-calculator.tsx` |
| `HeroPanel` | organism | edit — D2, D3, D4, all `sm:`-restored | `components/organisms/hero-panel.tsx` |
| `JourneyForm` | organism | edit — D5 | `components/organisms/journey-form.tsx` |
| `CookieConsent` | organism | edit — LC1, M-O, F2b, unconditional shield | `components/organisms/cookie-consent.tsx` |
| `RootLayout` | app | edit — `<CookieConsent />` is removed from here | `app/layout.tsx` |
| `CalculatorLayout` | template | **reuse, unmodified** | `components/templates/calculator-layout.tsx` |
| `ThemeProvider` | template | **reuse, unmodified** — it is the `MotionConfig reducedMotion="user"` boundary, and it still wraps the consent surface after M-O because the surface stays inside `{children}` | `components/templates/theme-provider.tsx` |
| `Button`, `ModalDialog` | atoms | **reuse, unmodified** | `components/atoms/button.tsx`, `components/atoms/modal-dialog.tsx` |
| `DaySummary`, `RegimeField`, `CollapsiblePanel` | organism / molecule / atom | **not opened** — which is what keeps the `0006` DS2 debt's trigger and the `collapsible-panel.tsx` reduced-motion debt's trigger from firing | `components/organisms/day-summary.tsx`, `components/molecules/regime-field.tsx`, `components/atoms/collapsible-panel.tsx` |

**Why `TableCitation` is a molecule and not two inline copies.** Two call sites need byte-identical
markup around a sentence AC4 and AC5 assert is unchanged. Three similar lines would be fine; two
copies of a legally frozen sentence would not, because a later edit to one of them manufactures the
contradiction `AGENTS.md` §5 warns about. It is a molecule and not an atom because it composes a
`<p>` and an `<a>` around data imported from `lib/`.

**No `"use client"` directive on `TableCitation`.** It has no hook, no handler and no state. It is
rendered only from client components, so it lands in the client bundle either way; adding the
directive would be noise, and `hero-panel.tsx` — its nearest sibling in the same slot — has none.

### 1.4 Files this plan adds to `spec.md` § Scope, each path in full (AC11)

> **AMENDED by §3D Amendment 4 (A4.1), 2026-09-19.** `components/molecules/table-citation.tsx` is
> **struck** — it is not created. Its row is replaced by **`components/atoms/estimate-notice.tsx`**,
> M-R's destination as `design.md` §17.7 rules it. Every other row stands.

Written here **before any edit**, as AC11 requires. `design.md` §16.7 names three; this plan adds two
more and says why.

| Path | Why it is added | Marked |
|---|---|---|
| ~~`components/molecules/table-citation.tsx`~~ | **struck — not created** (A4.1) | ~~create~~ |
| `components/atoms/estimate-notice.tsx` | M-R's destination — the relocated `DS1 P2` | create |
| `components/organisms/work-calculator.tsx` | composes the `aside` slot on `/` | edit |
| `components/organisms/hero-panel.tsx` | D2, D3, D4 | edit |
| `app/layout.tsx` | **added by `tech-lead`.** M-O requires the consent surface to be the last block of `#main-content`; `#main-content` lives in `calculator-views.tsx`, so the mount point must leave `app/layout.tsx`. There is no other way to satisfy M-O without editing `calculator-layout.tsx`, which § Out of scope 4 forbids | edit |
| `DESIGN.md` | **added by `tech-lead`.** S1, S2 and S3 are `DESIGN.md` edits; `DESIGN.md` is "the design system as actually shipped", so it lands with the code, not after it | edit |

Plus the test files each task names, and `tests/e2e/support/legibility.ts`.

**Absent from the diff, and asserted as absent at G6:** `components/templates/calculator-layout.tsx`,
everything under `lib/`, everything under `hooks/`, `components/organisms/day-summary.tsx`,
`components/molecules/regime-field.tsx`, `components/atoms/collapsible-panel.tsx`,
`components/organisms/analytics-wrapper.tsx`, `lib/analytics.ts`, `lib/consent.ts`,
`components/organisms/ad-manager.tsx`.

### 1.5 Test strategy

**The bars.** `lib/**` and `hooks/**` stay at **100%** — untouched here, and no task may lower them.
`app/**` and `components/**` stay at **90%** statements / branches / functions / lines. The one new
file, `components/molecules/table-citation.tsx`, is a single branchless function and reaches 100% from
its own test; the edited organisms keep their existing suites, amended where an assertion becomes
vacuous.

**Three layers, and each answers a different question.**

1. **jsdom (`__tests__/`, Vitest)** — behaviour and accessible structure: the citation renders once
   per route with its link and its accessible name, the consent switch opens refusing, the banner
   still saves and announces. **Never a Tailwind class string** (`AGENTS.md` §8) and never a
   geometry claim: jsdom has no layout.
2. **Playwright (`tests/e2e/`)** — every geometric and computed-style claim, against a **production**
   build (`playwright.config.ts`'s `webServer` runs `pnpm build && pnpm start`). This is where R, O,
   LR3.5, LR4.2a and LC1's effect axes are asserted, because all of them read
   `getBoundingClientRect()` or a network request.
3. **The `evidence/g1-*.mjs` instruments** — the shared before/after measuring device `spec.md`
   § Scope 5 names, re-pointed at the artifact under test at G5's close and again at G6.

**`evidence/` is gitignored** (`.gitignore:55`, `git check-ignore -v` confirms it), so the `g1-*.mjs`
instruments **do not ship**. That is why every criterion this spec must still be able to fail in six
months is written as a Playwright spec under `tests/e2e/`, which is committed and runs in CI
(`.github/workflows/ci.yml:131`, `pnpm e2e`). The `g1-*.mjs` runs are evidence for the reports, not
the durable guard.

**Every guard asserts the size of the set it iterates before it iterates** (`AGENTS.md` §5, and
`legal.md` A4 on this very spec's instruments). Zero is never a pass; `>= 1` does not discriminate.
The expected counts are written into each task.

**The instrument AC6 names, run in this tree by `tech-lead`, on the unfixed head.** `spec.md` AC6
says the `0008` §7 V1–V5 procedure "does not exist as a script in this tree" and binds `plan.md` to
name the implementing file and show it running. It does exist: **`tests/e2e/disclosure-legibility.spec.ts`**,
backed by `tests/e2e/support/legibility.ts`, implements LR1, LR2b and LR3-as-corrected over DS1 and
DS4 across 2 routes × 2 viewports × 2 themes. Run just now, in an isolated copy
(`rsync --exclude node_modules --exclude .next`, `cp -al node_modules`, `rm -rf .next`, port **3410**,
`uptime` load 5.72 on 16 cores, `ss -ltnp` clean on 3410):

```
$ PORT=3410 pnpm exec playwright test tests/e2e/disclosure-legibility.spec.ts --project=chromium --reporter=line
[WebServer] $ next build
[WebServer] $ next start
Running 16 tests using 8 workers
...
  16 passed (10.1s)
```

**It is green on the unfixed head, and that is the point:** it measures legibility, which is not what
this spec breaks. The criterion that is **red today** is R and O, and no guard implements them — so
**T1 writes that guard and sees it red before any source file is edited.** LR2a is not implemented by
it either (`expectLr2a` exists in the support module and no spec calls it); **T1 wires it in.**

**`pnpm check` after every task.** `pnpm check` is `lint + typecheck + vitest run`, and
`vitest.config.ts` excludes `tests/e2e/**`. So a deliberately-red Playwright guard between T1 and T6
leaves `pnpm check` green, which is what makes "seen red first" compatible with rule 7's build order.
`pnpm e2e` is red from T1 until T6 closes, by design, and **T8 is the task that proves it green
again**. Nothing is pushed before T8 (G8 is after G6).

### 1.6 Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Render the relocated citation | **No dependency.** `components/molecules/table-citation.tsx`, a `<p>` and an `<a>` | Rung 1 of the ladder — the markup already exists in `calculator-views.tsx`; this is a move |
| The date in the citation | **`formatIsoDate` from `lib/utils.ts`**, already used by the footer paragraph | Already installed and already the call site's helper |
| The tables' year, source and URL | **`CURRENT_LEGAL_YEAR` from `lib/legal-tables.ts`** | Single source of truth; no value is duplicated into a component |
| The consent surface's enter/exit | **`motion`**, already imported in `cookie-consent.tsx` | Installed; `MotionConfig reducedMotion="user"` in `theme-provider.tsx` already covers it |
| The density steps | **Tailwind `sm:` variants** on existing numeric utilities | CSS over JS; no new token, no new `--spacing-*` key (`__tests__/spacing-guards.test.ts` enforces it) |
| The geometry guards | **`@playwright/test`**, already installed and already the e2e runner | Installed |

**No new dependency is added by this plan.**

---

## 2. Conflicts found across the four inputs, and how each is resolved

Reconciled before decomposition, as G4 requires. Two are settled here on `design.md`'s own tiebreak
rule; two are routed to their owner with a stated default so G5 is never blocked.

### 2.1 Settled — `design.md` §7.2 vs §14, the consent row's padding

§7.2's table says `p-3 md:p-8`; §14's F2b row says `px-3 py-6 md:p-8` and adds *"horizontal only —
the vertical padding is untouched, so the surface height stays 466."* They disagree about the
vertical axis. `design.md` §0 and `legal.md` A1.6 both rule that **where prose and measurement
disagree, the measurement wins**, so this is settled by reading the instrument that produced the
quoted numbers:

- `evidence/g3-lr42.mjs` mutates the row with `calc(var(--spacing)*3)` = **12 px**, horizontal only.
- `evidence/g3-lr42.txt`, 390×844 dark: `surface w 358`, `bodyTextWidth 332`, `lr2aSpend 26`,
  `lr44FloorHeight 466`, `Recusar` box `29,615 332x48`. Surface left edge is 16 (the `px-4` page
  gutter); 16 + 1 (border) + 12 (padding) = **29** ✓. A 16 px padding would put it at 33 and
  `bodyTextWidth` at 324.

**Resolution: `px-3 py-6 md:p-8`.** It is the state that was measured, it keeps the surface at 466
against LR4.4's 336 floor, and it produces the LR2a spend of 26 that `design.md` §13 signs for.
§7.2's cell is a shorthand typo; **`product-designer` corrects the document, `plan.md` does not.**

### 2.2 Settled — AC13's expected line count

`spec.md` AC13 carries the G1 baseline (8 on `/`, 9 on `/custo-da-hora`). `design.md` §5.1 corrects it
to **9** and **10** because the relocated citation's `<a>` becomes a leaf of the host the instrument
climbs to. `legal.md` §11 is explicit that a disagreement **corrects the baseline at the gate that
found it, never the assertion**. `design.md` is that gate. **The guard uses 9 and 10**, split
`8 + 1` and `9 + 1` sighted/assistive, and `measured + exempt = expected` is checkable.

### 2.3 Routed to `product-designer`, with a stated default — `cn()` on `TableCitation`

`design.md` §7.1 says the citation *"must be composed through `cn()`"* because "without the extended
merge config a caller's size class silently deletes the colour class". **`TableCitation` takes no
class from any caller** — both call sites render `<TableCitation />` bare — so there is no merge to
perform, and a `className` prop added to enable one would be config for a value that never changes.

**Default this plan builds: no `className` prop, one static class string, no `cn()` call.** If
`product-designer` wants the prop, it is a one-line amendment to T4. Recorded in `STATUS.md` blockers
with `product-designer` named.

### 2.4 Routed to `product-designer`, with a stated default — the consent surface's transition

`design.md` §9 specifies the consent enter/exit at **320 ms `--ease-out`**. The surface today inherits
`MotionConfig`'s `{ type: "spring", bounce: 0, duration: 0.35 }` from `theme-provider.tsx:10`. Writing
320 ms + `cubic-bezier(0.23, 1, 0.32, 1)` into a `motion` prop means a literal tuple in TypeScript
where `AGENTS.md` §8 forbids "arbitrary values where a token exists", and the change is not carried by
any movement, any acceptance criterion or any measurement in `design.md`'s 32 cells.

**Default this plan builds: the `y: 100 → 12` change (S3, human-approved) lands; the duration and
easing stay inherited from `MotionConfig`.** Reduced motion is unaffected either way — `reducedMotion="user"`
drops the `y` transform and keeps the opacity cross-fade, which is the path `design.md` §9 mandates.
Recorded in `STATUS.md` blockers with `product-designer` named.

### 2.5 Checked and clean — the guards already in the tree, run over this plan's destinations

Lesson **022**: run every guard that reads a destination over the texts and utilities mandated for it.

| Guard | Read over this plan | Verdict |
|---|---|---|
| `__tests__/spacing-guards.test.ts` | every utility mandated below (`p-6`, `sm:p-8`, `space-y-4`, `pt-4`, `mb-6`, `mt-4`, `mt-12`, `mb-8`, `px-3`, `py-6`, `pb-16`, `mt-2`) | **clean** — every suffix is numeric; no `--spacing-<name>` key is added |
| `__tests__/copy-guards.test.ts` — no em/en dash | the citation string is moved byte-identical and uses `·`, not `—` | **clean** |
| `__tests__/copy-guards.test.ts` — no `h-screen` / `min-h-screen` | none mandated | **clean** |
| `__tests__/comment-free-code.test.ts` | **no task below instructs a comment, and no code sample carries one** | **clean by construction** |
| `tests/e2e/disclosure-legibility.spec.ts` | `DS1_EXPECTED_PARAGRAPHS = 4` goes vacuously wrong the moment P4 leaves the footer | **T4 amends it to 3 and adds the citation as its own measured surface** — this is exactly the dead-guard case `AGENTS.md` §5 names |
| `tests/e2e/google-tracking.spec.ts` | clicks `Aceitar Tudo` with no scroll | **survives** — Playwright auto-scrolls before a click and `toBeVisible` does not require the viewport. Named in § Risks because it is a survival by tooling, not by design |
| `__tests__/calculator-views.test.tsx` — "dates the tax tables and links the norm" | mocks `WorkCalculator`, so it goes red when P4 leaves the footer | **T4 moves those two assertions to the citation's own suite and to the two composing organisms' suites** |

---

## 3. Tasks

Ordered so the tree compiles and `pnpm check` passes after **every** one.

---

### T1 — Write the reachability guards and see them red, before any source file is edited

- **Files:**
  - `tests/e2e/support/reachability.ts` (create)
  - `tests/e2e/first-screen-reachability.spec.ts` (create)
- **Depends on:** none
- **Reuse:**
  - `tests/e2e/support/legibility.ts` — `waitForStableBoundingBox`, `expectLr2a`, `measureSurface`,
    `LR2A_CHROME_BUDGET_PX`. Do **not** re-implement any of them.
  - `lib/legal-tables.ts` — `CURRENT_LEGAL_YEAR`, imported as
    `import { CURRENT_LEGAL_YEAR } from "../../lib/legal-tables";`, so the citation's link is located
    by the norm it cites rather than by a hard-coded pt-BR literal (`legal.md` A4.3).
  - `playwright.config.ts` — unchanged; the new spec runs in the existing `chromium`,
    `Mobile Chrome` and `Mobile Safari` projects with no config edit.
- **What to build:**

  **`tests/e2e/support/reachability.ts`** exports, in English, with these exact names and types:

  ```ts
  export interface Box { top: number; bottom: number; left: number; right: number; width: number; height: number; }
  export interface FixedBox extends Box { tag: string; position: string; label: string; }

  export const REACHABILITY_VIEWPORT = { width: 390, height: 844 } as const;
  export const LR42A_VIEWPORTS = [{ width: 390, height: 844 }, { width: 1440, height: 900 }] as const;
  export const ROUTES = ["/", "/custo-da-hora"] as const;
  export const THEMES = ["dark", "light"] as const;
  export const STORAGE_STATES = ["empty", "seeded", "monthlyHours=0", "incoherent"] as const;

  export const STORAGE_SEEDS: Record<(typeof STORAGE_STATES)[number], Record<string, string>>;
  export const EXPECTED_LINES_ON_FIRST_SCREEN: Record<(typeof ROUTES)[number], { sighted: number; assistive: number }>;
  export const EXPECTED_LR42A_CONTROL_COUNT: number;
  export const EXPECTED_LR35_SURFACE_COUNT: Record<(typeof ROUTES)[number], number>;

  export async function seedStorage(page: Page, route: string, state: (typeof STORAGE_STATES)[number]): Promise<void>;
  export async function clearConsent(page: Page): Promise<void>;
  export async function fixedBoxes(page: Page): Promise<FixedBox[]>;
  export function intersects(a: Box, b: Box): boolean;
  export async function answerPanelLines(page: Page, route: string): Promise<{ text: string; top: number; bottom: number; occludedBy: string[]; assistiveOnly: boolean }[]>;
  export function citationParagraph(page: Page): Locator;
  ```

  Exact values:

  - `STORAGE_SEEDS` — copied from `evidence/g1-occlusion.mjs`, verbatim, no re-derivation:
    `empty: {}`,
    `seeded: { grossSalary: "4200", monthlyHours: "220", workMinutes: "528" }`,
    `"monthlyHours=0": { grossSalary: "4200", monthlyHours: "0", workMinutes: "528" }`,
    `incoherent: { grossSalary: "4200", monthlyHours: "240", workMinutes: "480" }`.
  - `EXPECTED_LINES_ON_FIRST_SCREEN` — `"/": { sighted: 8, assistive: 1 }`,
    `"/custo-da-hora": { sighted: 9, assistive: 1 }` (`design.md` §5.1). The guard asserts
    `sighted + assistive === lines.length` **before** it asserts `occluded === 0`.
  - `EXPECTED_LR42A_CONTROL_COUNT = 6` — 3 at the first level (*Configurar*, *Recusar*,
    *Aceitar Tudo*) and 3 at the second (*Fechar configurações de privacidade*, the telemetry
    `role="switch"`, *Salvar Preferências*) (`legal.md` A4.1, A1.6).
  - `EXPECTED_LR35_SURFACE_COUNT` — `"/": 4`, `"/custo-da-hora": 4` in the minimal seeds
    (`design.md` §16.3). The full-journey `/` count of **7** is asserted in its own test, seeded
    explicitly, never inferred.
  - `intersects(a, b)` is the **single** implementation of the intersect predicate for this spec
    (`spec.md` § Scope 5): `!(b.bottom <= a.top || b.top >= a.bottom || b.right <= a.left || b.left >= a.right)`.
    R's clause 2 and O's clause 2 both call it; it is written once.
  - `fixedBoxes` returns every element whose computed `position` is `fixed` or `sticky` with
    `getBoundingClientRect().height > 0`, with its `tagName.toLowerCase()`, its computed position and
    the first 30 characters of its trimmed `textContent` — the same set `evidence/g1-occlusion.mjs`
    builds, so the two instruments read one quantity.
  - `answerPanelLines` climbs from the route's anchor leaf (`"Saída Prevista"` or `"Saída Real"` on
    `/`, `"Valor por Hora"` on `/custo-da-hora`) to the outermost non-`fixed`/non-`sticky` ancestor
    whose height is `<= innerHeight * 1.2`, then returns every childless descendant with non-empty
    trimmed text whose box intersects the first viewport. `assistiveOnly` is `true` when the element
    or an ancestor inside the host carries the `sr-only` class **as resolved by computed style**
    (`width <= 1 && height <= 1`), never by a class-name match.
  - `citationParagraph(page)` = `page.locator("p").filter({ has: page.getByRole("link", { name: CURRENT_LEGAL_YEAR.source }) })`.
    Derived from the obligation — the paragraph that carries the norm's own link — not from a copy
    string and not from a spacing token.
  - `seedStorage` writes the seed through a first page visit and `localStorage.setItem`, then reloads,
    exactly as `evidence/g1-occlusion.mjs` does. **Synchronization barrier**, stated because a plan
    that omits it makes the developer choose (lesson **027**): after `page.goto(route, { waitUntil: "load" })`,
    await `expect(page.getByRole("link", { name: CURRENT_LEGAL_YEAR.source })).toBeVisible()` and
    `waitForStableBoundingBox` on the answer panel, then — for any test that reads the consent
    surface — `await expect(page.getByRole("heading", { level: 2, name: "Respeitamos sua privacidade" })).toBeVisible()`,
    which is the barrier for `BANNER_DELAY_MS = 1500`. **Never a bare `waitForTimeout`.**

  **`tests/e2e/first-screen-reachability.spec.ts`** — four `describe` blocks:

  1. **`AC1 / R — a disclosure surface is reachable on the first screen`**, 16 cells
     (2 routes × 4 storage states × 2 themes) at 390×844, consent pending. Per cell:
     assert `citationParagraph` resolves to exactly **1** element; read its box; assert
     **clause 1** `top >= 0 && bottom <= 844 && left >= 0 && right <= 390`; **clause 2**
     `fixedBoxes.filter(box => intersects(citation, box))` has length **0**, with the offending
     `tag`/`label` in the failure message; **clause 3** the claim it pairs with — the hero value `<p>`
     — is itself inside the first viewport.
  2. **`AC13 / O — no rendered line of the answer is occluded`**, the same 16 cells. Assert
     `lines.length === sighted + assistive` for the route **first**, with both halves counted and
     reported, **then** `lines.filter(l => l.occludedBy.length).length === 0`.
  3. **`LR3.5 — every disclosure surface has a scroll position clear of the fixed chrome`**. Assert
     the surface count against `EXPECTED_LR35_SURFACE_COUNT` **before** sweeping. Then, per surface,
     sweep `scrollY` from 0 to `document.documentElement.scrollHeight - innerHeight` in 60 samples and
     assert **at least one** position where no `fixedBoxes` entry intersects the surface, excluding
     the surface's own ancestors and descendants. Run in two storage states per route **and in the
     consent-answered state** (`localStorage` pre-seeded with `{"telemetry":true,"timestamp":0}`),
     because consent-answered is where M-R alone was seen red (`design.md` §16.3). Add one
     full-journey `/` case with an explicit expected surface count of **7**.
  4. **`LR4.2a — one scroll position serves every consent control at once`**, at 390×844 and
     1440×900, both themes. Assert the control count is **exactly `EXPECTED_LR42A_CONTROL_COUNT`**
     across both levels **before** any predicate. Then find a **single** `scrollY` at which, for the
     first-level surface: every one of its 3 controls has its whole border box inside the viewport
     **and** inside the surface (clause 1); each control's `scrollWidth <= Math.ceil(width)`
     (clause 2); `intersects` returns false against every `fixedBoxes` entry for the surface **and**
     for each control, with the intersection **computed here, never inherited from an `inViewport`
     flag** (`legal.md` A4.2); and *Recusar* and *Aceitar Tudo* are both in that same frame (clause 4).
     Repeat the four clauses for the second-level dialog's 3 controls after opening it.
     **At 1440 this is a sweep over scroll positions, not a single probe** — `legal.md` A5 W12: the
     measured margin there is **1.7 px**, which is a margin and not a result.
     Also assert LR4.4 clause 2 at **both** viewports: `area(Recusar)` vs `area(Aceitar Tudo)`, with
     the numbers printed. At 1440 this is **expected to fail today and after this spec** — see
     `Tests` below.

  **Both files are comment-free** (`AGENTS.md` §8). Every explanation goes in the test name or the
  assertion message.

- **Tests:** this task *is* the tests. Its own verification is the **red run**:
  - `PORT=3410 pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts --project=chromium --reporter=line`
    (3410 is the port `tech-lead` used; **confirm it free with `ss -ltnp` and take another if it is not** —
    sibling agents build concurrently), run in an **isolated copy** (`rsync --exclude node_modules --exclude .next`, `cp -al node_modules`,
    `rm -rf .next`), on a port confirmed free with `ss -ltnp`, after `uptime`. **Never `next dev`** —
    the page does not hydrate under it in this environment and the banner never appears.
  - Expected red, and the failures are pasted verbatim into `reports/build.md`:
    **AC1** fails 16/16 (no citation on the first screen — `citationParagraph` resolves, but its box
    is at `docTop` 2727.2 on `/`); **AC13** fails 16/16 (`linesOccluded` 4 on `/`, 6 and 5 on
    `/custo-da-hora`); **LR3.5** fails on DS1 P4, 4/4 (needs `scrollY` 2504.2 of a max 2490 on `/`,
    1228.6 of 1215 on `/custo-da-hora`); **LR4.2a** fails clause 3 at 390 (the `fixed` banner
    `354..820` intersects the route nav `766..828`).
  - **A guard that is green here is a defect in the guard, not good news.** If any of the four
    describes passes on the unfixed head, stop and report it to `tech-lead`: it means the assertion
    does not discriminate, which is the exact defect `legal.md` §11 found in AC13's original
    instrument.
  - **LR4.4 clause 2 at 1440 is expected red in both directions** — `area(Recusar)` **4 935** vs
    `area(Aceitar Tudo)` **6 296**. That is **F2c**, pre-existing, moderate, **routed, not fixed
    here** (§ 4). Mark that one assertion `test.fixme` with the finding id **F2c** in its title, so it
    is a recorded, visible, non-green obligation rather than an assertion nobody wrote. Every other
    assertion in the block stays live.
- **Done when:**
  - `pnpm lint` and `pnpm typecheck` clean, `pnpm test` green (Vitest excludes `tests/e2e/**`), i.e.
    **`pnpm check` green**.
  - The red Playwright output for all four describes is pasted into
    `.specs/0010-disclosure-reachability-on-mobile/reports/build.md`, with the isolated-copy setup
    commands, the port, and the `uptime`/`ss -ltnp` readings above it.
  - Advances **AC6** (the instrument now exists and has been seen run), **AC1**, **AC13**, **AC12**.

---

### T2 — LC1: the consent switch opens refusing, and the stored record still wins

- **Files:**
  - `components/organisms/cookie-consent.tsx` (edit)
  - `__tests__/cookie-consent.test.tsx` (edit)
  - `tests/e2e/consent-opening-state.spec.ts` (create)
- **Depends on:** none
- **Reuse:** `lib/consent.ts` — `readTelemetryConsent`, `writeTelemetryConsent`,
  `CONSENT_CHANGED_EVENT`. **`lib/consent.ts` is not edited** (`0011` narrows what *valid* means
  inside it later; `legal.md` A2.3.1 requires this component to be unchanged by that narrowing).
- **What to build:**

  **One line changes.** At `components/organisms/cookie-consent.tsx:15`:

  ```tsx
  const [telemetryEnabled, setTelemetryEnabled] = useState(false);
  ```

  **`:17-26` is untouched.** The `useEffect` that reads `readTelemetryConsent()` and calls
  `setTelemetryEnabled(storedConsent)` when a record exists is **LC1.7's implementation** and is what
  makes this a rule rather than a default. Deleting, inlining or "simplifying" it flips a user's valid
  acceptance to a refusal on every reopen, which is a second LGPD art. 8º *caput* failure in the
  opposite direction (`legal.md` A2.2).

  The rule this line implements, written so the guards below can be read against it and not against
  the line:

  > **A consent-bearing control renders the value carried by a stored record that is valid for its
  > purpose, and renders the refusing value in every other case — including when no record exists,
  > when the record is unparseable, and when the record is null under art. 9º § 1º.**

  Source: LGPD art. 8º *caput* (*"outro meio que demonstre a manifestação de vontade do titular"*),
  art. 8º § 2º (the controller's burden of proof), art. 8º § 3º (*vedado*), art. 5º XII
  (*inequívoca*), ANPD *Guia Orientativo — Cookies* pp. 32–33. **No comment carries this in the
  source** (`AGENTS.md` §8) — it lives here and in the test names.

- **Tests:**

  `__tests__/cookie-consent.test.tsx` (edit) — query by accessible role and name throughout:
  - **Amend** *"toggles telemetry off, saves the toggled value and closes the dialog"*: with
    `localStorage` cleared, the switch's `aria-checked` on first open is **`"false"`**, not `"true"`.
    Rename it to *"opens the telemetry switch refusing when no consent is stored"* and split the
    toggle-and-save path into its own case that starts from `"false"`, clicks once to `"true"`, saves,
    and asserts `{ telemetry: true }` reaches storage and the `CONSENT_CHANGED_EVENT`.
  - **Add** *"saves a refusal when Salvar Preferências is pressed without touching the switch"* —
    clear storage, open settings, press *Salvar Preferências* immediately,
    assert `JSON.parse(localStorage["workload_cookie_consent"]).telemetry === false` and the event
    detail is `{ telemetry: false }`. **This is LC1.2 and it is the case the defect shipped.**
  - **Add** *"renders the switch on again for a stored affirmative consent"* — seed
    `{"telemetry":true}`, open settings, assert `aria-checked === "true"`. **This is LC1.7**, and it
    is the assertion that fails if `:17-26` is removed.
  - **Keep** the existing *"toggles telemetry back on from a stored disabled consent"* case
    unchanged — it already covers the stored-`false` branch.
  - Keyboard path: the switch is reached by `Tab` and toggled by `Enter` and by `Space`
    (`userEvent.tab()` then `userEvent.keyboard("{Enter}")`), with `aria-checked` asserted after each.

  `tests/e2e/consent-opening-state.spec.ts` (create) — LC1's seven axes, each with the state
  constructed and the quantity read, at 390×844, **both themes**:

  | # | Test name | State | Quantity | Expected |
  |---|---|---|---|---|
  | LC1.1 | `renders the telemetry switch refusing with no stored record` | `localStorage` cleared, settings opened | `getAttribute("aria-checked")` on `[role="switch"]` | `"false"` |
  | LC1.2 | `records a refusal when the user saves without touching the switch` | LC1.1 then *Salvar Preferências* | `JSON.parse(localStorage["workload_cookie_consent"]).telemetry` | `false` |
  | LC1.3 | `loads no Google tag after a save-without-touching` | after LC1.2 | `document.querySelectorAll('script[src*="googletagmanager.com"]').length` | `0` |
  | LC1.4 | `sends no request to Google after a save-without-touching` | after LC1.2, then one instrumented interaction (click the *Custo da Hora* tab, which fires `switch_tab`) | requests whose URL host matches `(^\|\.)google-analytics\.com$`, `(^\|\.)analytics\.google\.com$`, `(^\|\.)googletagmanager\.com$`, captured with `page.on("request")` | `0` |
  | LC1.5 | `leaves no _ga cookie after a save-without-touching` | 1 000 ms after LC1.2 | `document.cookie` entries matching `^_ga` | `0` |
  | LC1.6 | `treats an unparseable record as absent` | `localStorage["workload_cookie_consent"] = "{"` | the banner renders; LC1.1–LC1.5 hold | identical to the no-record state |
  | LC1.7 | `renders the switch on for a stored affirmative consent` | `{"telemetry":true,"timestamp":0}` seeded | `aria-checked` | `"true"` |

  **The falsifiability control, and no pass may be reported without it** (`legal.md` A2.2): LC1.3–LC1.5
  are measured in **three** states and **all three counts printed** into the test annotation —
  *before any consent exists*, *after an affirmative consent (`Aceitar Tudo`)*, and *after the
  save-without-touching path*. **At least two of the three must differ**, asserted, or the instrument
  is blind and the zeroes mean nothing. The discriminating pair is already on the record
  (`0011` §7.3: **0** with no consent, **2** after *Aceitar Tudo*, **+1** per instrumented
  interaction), so the expected shape is `0 / ≥2 / 0`.

  `test.use({ storageState: { cookies: [], origins: [] } })` at the top of the file, as
  `tests/e2e/google-tracking.spec.ts` does, because `playwright.config.ts` seeds an affirmative
  consent globally and every LC1 row but LC1.7 needs it absent.

  The spec sets `NEXT_PUBLIC_GA_ID` through the existing `webServer.env` (`G-TEST12345`) — no config
  change; if the tag id were absent the zeroes would be vacuous, which is what the three-state control
  is there to catch.

- **Done when:**
  - `pnpm test __tests__/cookie-consent.test.tsx` green and `pnpm check` green.
  - `pnpm exec playwright test tests/e2e/consent-opening-state.spec.ts` green in the isolated copy,
    with the three-state control's three counts pasted into `reports/build.md`.
  - The `git diff` for `components/organisms/cookie-consent.tsx` in this task is **one line**, and
    `:17-26` is untouched. If it is more than one line, that is a finding for `tech-lead`.
  - Advances **LC1 / F2a** (the precondition) and **AC12**.

---

### T3 — M-B and D1: the bottom reserve clears the tab bar, and the phone gets its top step

- **Files:** `components/organisms/calculator-views.tsx` (edit)
- **Depends on:** none. **T5 depends on this one, and that pairing is binding** (`legal.md` A1.7).
- **Reuse:** nothing new; both changes are utility edits on elements already in the file.
- **What to build:**

  **D1** — on the `#main-content` `<div>` (`calculator-views.tsx`, the element with
  `id="main-content"`), replace

  ```
  pt-[calc(var(--header-height)+var(--spacing)*8)]
  ```

  with

  ```
  pt-[calc(var(--header-height)+var(--spacing)*4)] sm:pt-[calc(var(--header-height)+var(--spacing)*8)]
  ```

  96 → 80 below `sm`; 640 px and above is byte-identical. `pb-16 px-4 sm:px-6 lg:px-8 outline-none`
  and `tabIndex={-1}` are unchanged.

  **M-B** — on the `<footer>` in the same file, add `mb-8` to its existing
  `mx-auto mt-12 max-w-3xl space-y-2 text-center text-caption text-ink-subtle text-pretty`.

  **Why `mb-8` on the footer and not a bigger `pb-*`.** The reserve must be **96 px** and `pb-16` is
  64: `64 + 32 = 96`, against a tab bar band of **78** (`844 − 766`), leaving 18 px of slack. The
  extra 32 goes on **whichever block is last**, so when T5 appends the consent surface after the
  footer the surface carries its own `mb-8` and adjacent-sibling margin collapsing between the
  footer's `mb-8` (32) and the surface's `mt-12` (48) resolves to **48** — the gap `design.md` §7.2
  specifies. `#main-content` has `padding-bottom`, so the last child's bottom margin does not collapse
  through it and the reserve is exactly `32 + 64 = 96`.

  This is **S2**, the written form of M-B, and it is F1's root cause fixed at the cause: the reserve
  (64) was smaller than the band the tab bar occupies (78), so *whatever is last* was unreachable.
  Relocating the failing surface alone hands the identical breach to its neighbour — measured, DS1 P3
  at 2529.6 of 2516 (lesson **054**).

- **Tests:** no new jsdom test — **a reserve is geometry and jsdom has no layout**, so an assertion
  here would be either a class-string check (`AGENTS.md` §8 forbids it) or vacuous. The reserve is
  asserted by **T1's LR3.5 describe**, which sweeps every surface including the one that is last, and
  by **T8**'s re-measurement (`reserve after DS1 P3` ≥ 96 against the tab bar's 78). The existing
  `__tests__/calculator-views.test.tsx` must stay green unchanged.
- **Done when:**
  - `pnpm test __tests__/calculator-views.test.tsx` green, `pnpm check` green.
  - `pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts -g "LR3.5"` in the isolated
    copy: **DS1 P4 still fails** (it is still in the footer; M-R has not landed) and **no new surface
    fails**. That asymmetry is the evidence M-B is a precondition and not the remedy — paste it.
  - Advances **AC7**, **AC2**, and **LR3.5 / F1**.

---

### T4 — M-R: `TableCitation`, moved out of the footer and under the answer

> **SUPERSEDED by §3A Amendment 1 (A1.2), 2026-09-19, and REPLACED IN FULL by `T4′` in §3D
> Amendment 4. DO NOT EXECUTE.** Its premise — that footer
> P4 is a ~103-character `<p>` with one `<a>` reading `CURRENT_LEGAL_YEAR.source` / `.sourceUrl` /
> `.effectiveFrom`, measured at `h` **34.8** with **23.8 px** of clearance — was falsified by
> `0003`'s T2, which landed in this tree. Those three fields no longer exist and that paragraph is
> now `0003`'s 398-character `F-1` with four `<a>`. The re-measurement is routed to
> `product-designer` (A1.2, Q-A…Q-D); `tech-lead` then rewrites this task as **T4′**. Everything
> below is kept **only** as the record of what was measured and why, and as the source of the
> token list, the a11y clauses and the test cases that survive a re-measurement unchanged.

- **Files:**
  - `components/molecules/table-citation.tsx` (create)
  - `components/organisms/calculator-views.tsx` (edit — the footer loses P4)
  - `components/organisms/work-calculator.tsx` (edit)
  - `components/organisms/salary-calculator.tsx` (edit)
  - `__tests__/table-citation.test.tsx` (create)
  - `__tests__/calculator-views.test.tsx` (edit)
  - `__tests__/work-calculator.test.tsx` (edit)
  - `__tests__/salary-calculator.test.tsx` (edit)
  - `tests/e2e/support/legibility.ts` (edit)
  - `tests/e2e/disclosure-legibility.spec.ts` (edit)
- **Depends on:** **T3**
- **Reuse:** `lib/legal-tables.ts` (`CURRENT_LEGAL_YEAR`), `lib/utils.ts` (`formatIsoDate`),
  `components/templates/calculator-layout.tsx`'s existing `aside` slot — **unmodified**.
- **What to build:**

  **`components/molecules/table-citation.tsx`** — exactly this, no `"use client"`, no props, no
  comments:

  ```tsx
  import { CURRENT_LEGAL_YEAR } from "@/lib/legal-tables";
  import { formatIsoDate } from "@/lib/utils";

  export function TableCitation() {
    return (
      <p className="mt-2 text-caption text-ink-subtle text-pretty">
        Tabelas de INSS e IRRF de {CURRENT_LEGAL_YEAR.year}, em vigor desde{" "}
        {formatIsoDate(CURRENT_LEGAL_YEAR.effectiveFrom)} ·{" "}
        <a
          href={CURRENT_LEGAL_YEAR.sourceUrl}
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 transition-colors duration-(--duration-fast) ease-standard hover:text-accent-ink"
        >
          {CURRENT_LEGAL_YEAR.source}
        </a>
      </p>
    );
  }
  ```

  **Every token in that string, from `design.md` §7.1, and why each is there:**
  `mt-2` = `--spacing*2` = the **8 px** gap to the hero card. `text-caption` = `--text-caption`
  (0.75rem, line-height 1.45, letter-spacing 0.012em, weight 400). `text-ink-subtle` on the inherited
  `--color-canvas` — measured **5.74:1** dark / **4.84:1** light, both AA. `text-pretty`, as the
  footer's paragraphs carry. `underline-offset-2` = `--spacing*0.5` = 2 px. `hover:text-accent-ink` —
  measured **9.23:1** dark / **6.19:1** light. **No `text-center`** (the footer's alignment stays
  with the footer). **No radius, no border, no shadow** — it is text in the column, not a card. The
  focus ring is `globals.css`'s `:focus-visible` base rule (2 px `--color-focus`, offset 2), inherited,
  not restated. `transition-colors duration-(--duration-fast) ease-standard` is `design.md` §9's
  160 ms colour transition; `globals.css:310`'s reduced-motion clamp keeps `color` in its
  `transition-property` list, so the reduced-motion path is *kept*, not suppressed, and needs no
  `motion-reduce:` utility.

  **The text node is moved, not edited.** It is byte-identical to `calculator-views.tsx`'s fourth
  footer paragraph, including the `{" "}` separators and the `·`. AC4 and AC5 are satisfied by a
  `diff` returning nothing, and `copy.md`'s no-op holds. **AC5's exemption list is EMPTY.**

  **`components/organisms/calculator-views.tsx`** — delete the fourth `<p>` of the `<footer>`
  (the one beginning `Tabelas de INSS e IRRF de`) in full, with its `<a>`. The footer keeps **three**
  paragraphs: P1 (storage), P2 (estimate), P3 (gap list). Remove the now-unused
  `CURRENT_LEGAL_YEAR` and `formatIsoDate` imports. Do **not** render `TableCitation` here.

  **`components/organisms/work-calculator.tsx`** — `import { TableCitation } from "../molecules/table-citation";`
  (the file's own idiom is relative imports for components: `../atoms/progress-ring`,
  `../molecules/copy-button`). The `aside` prop becomes:

  ```tsx
  aside={
    <>
      <HeroPanel /* every existing prop and child unchanged */ />
      <TableCitation />
    </>
  }
  ```

  **`components/organisms/salary-calculator.tsx`** — the same change, same import style
  (`../molecules/table-citation`), wrapping the existing `<HeroPanel>` and `<TableCitation />` in a
  fragment.

  **One rendered instance per page.** The citation renders once on `/` and once on `/custo-da-hora`,
  because exactly one of `WorkCalculator` / `SalaryCalculator` mounts per route
  (`calculator-views.tsx`'s `activeView === "work" ? … : …`). T1's AC1 describe asserts the locator
  resolves to exactly **1** element, which is the guard against a copy.

  **Where it lands, measured** (`design.md` §3, §5): `/` at `707.4..742.2`, `w` **358**, `h` **34.8**,
  **23.8 px** of clearance to the tab bar; `/custo-da-hora` at `542.1..576.9` / `524.8..559.6` /
  `458.7..493.5`, clearance **189.1 / 206.4 / 272.5**. At 1440 it rides inside the `lg:sticky` aside
  under the hero at `w` **514.7**; at 2560/3840, `w` **729** at 13.5 px.

- **Tests:**

  `__tests__/table-citation.test.tsx` (create) — query by role and name:
  - `renders the tables' year and the date they took effect` — `getByText` over the rendered
    sentence, asserting `2026` and `01/01/2026` come from `CURRENT_LEGAL_YEAR`, imported in the test
    rather than hard-coded, so the assertion tracks `lib/` and cannot go stale silently.
  - `links the norm that published the tables` —
    `getByRole("link", { name: CURRENT_LEGAL_YEAR.source })` has
    `href === CURRENT_LEGAL_YEAR.sourceUrl`, `target === "_blank"` and `rel === "noreferrer"`.
  - `keeps the citation out of any live region` — the rendered `<p>` has no `aria-live` and no
    ancestor with one in the component's own output (`design.md` §8.1: a citation inside a live
    region speaks the Portaria number on every keystroke).
  - **Never** asserts a Tailwind class string.

  `__tests__/calculator-views.test.tsx` (edit):
  - **Delete** `dates the tax tables and links the norm that published them` — it mocks
    `WorkCalculator`, so after M-R it asserts against markup this component no longer owns. It moves
    to `__tests__/table-citation.test.tsx` (the string and the link) and to the two organism suites
    (the fact that each route renders it once).
  - **Add** `keeps the three surviving footer disclaimers and no table citation` — the three
    `getByText` assertions for P1, P2 and P3 stay; add
    `expect(screen.queryByText(/Tabelas de INSS e IRRF/)).toBeNull()`. **This is the assertion that
    makes "the citation moved" falsifiable from this side**; without it a duplicate copy left in the
    footer would pass every other test in the repo.

  `__tests__/work-calculator.test.tsx` and `__tests__/salary-calculator.test.tsx` (edit) — one case
  each: `renders exactly one table citation beside the answer` —
  `getAllByRole("link", { name: CURRENT_LEGAL_YEAR.source })` has length **1**.

  `tests/e2e/support/legibility.ts` (edit):
  - `DS1_EXPECTED_PARAGRAPHS` **4 → 3**. Leaving it at 4 makes
    `assertLr2bAcrossParagraphs` fail loudly, which is correct; leaving it un-updated after the move
    would be a guard asserting a count nobody intends.
  - Add `export const DS1_CITATION_EXPECTED_PARAGRAPHS = 1;` and re-export `citationParagraph` from
    `./reachability` so one locator serves both specs.

  `tests/e2e/disclosure-legibility.spec.ts` (edit) — add a third `describe`,
  **`Disclosure legibility — DS1 P4, the relocated table citation`**, over the same
  2 routes × 2 viewports × 2 themes matrix:
  - `assertLr1(citation)` — `w` ≥ min(320, available); measured **358** at 390.
  - `expectLr2a(await measureSurface(citation, citation), label)` — **this is the first call site of
    `expectLr2a` in the suite**; the citation is a direct child of the column with no chrome, so the
    spend is 0 ≤ 32.
  - `assertLr2bAcrossParagraphs(citationHost, DS1_CITATION_EXPECTED_PARAGRAPHS, label)` — one
    paragraph, and `assertLr2b` exempts a single line box; at 390 it is **2** line boxes, so it is
    **measured**, not exempt, at ~55 cpl against the 40 floor.
  - `assertLr3(page, route, citation, "Tabelas de INSS e IRRF de")` — proves it is in the **server**
    HTML, not injected on the client.
  - Also amend the DS1 footer `describe`'s `assertLr3` marker: it already uses
    *"Tudo o que você digita fica salvo apenas neste navegador"* (P1), which survives. No change.

- **Done when:**
  - `pnpm test __tests__/table-citation.test.tsx __tests__/calculator-views.test.tsx __tests__/work-calculator.test.tsx __tests__/salary-calculator.test.tsx` green.
  - `pnpm check` green.
  - `pnpm exec playwright test tests/e2e/disclosure-legibility.spec.ts` green in the isolated copy —
    **24 tests**, up from 16, and the two new counts (3 footer paragraphs, 1 citation paragraph)
    printed in the `lr2b-coverage` annotations.
  - `pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts -g "AC1"` — **green in
    16/16**. `-g "AC13"` is **still red** (the banner is still `fixed`); that split is the expected
    intermediate state and it is pasted, because a run where **both** go green here would mean AC13
    was satisfied by something other than M-O and is a finding for `tech-lead`.
  - Advances **AC1**, **AC6**, **AC7**, **AC4**, **AC5**.

---

### T5 — M-O: the consent surface leaves the overlay, and the privacy shield becomes unconditional

- **Files:**
  - `components/organisms/cookie-consent.tsx` (edit)
  - `app/layout.tsx` (edit)
  - `components/organisms/calculator-views.tsx` (edit)
  - `__tests__/cookie-consent.test.tsx` (edit)
  - `__tests__/layout.test.tsx` (edit)
  - `__tests__/calculator-views.test.tsx` (edit)
- **Depends on:** **T3** (binding — `legal.md` A1.7: if M-B is dropped or deferred, M-O is dropped
  with it). **~~T4~~ — removed by §3A A1.3**: that dependency was this gate's own serialisation of
  two edits to `calculator-views.tsx`, never a legal or design constraint. **T3 before T5 stands.**
- **Reuse:** `components/atoms/button.tsx`, `components/atoms/modal-dialog.tsx`,
  `components/templates/theme-provider.tsx`'s `MotionConfig` — all unmodified. The surface stays
  inside `{children}`, so `reducedMotion="user"` still reaches it.
- **What to build:**

  **1. `app/layout.tsx`** — remove `<CookieConsent />` and its import. `<AdManager />`,
  `<AnalyticsWrapper />` and `<ThemeProvider>` are untouched.

  **2. `components/organisms/calculator-views.tsx`** — import `CookieConsent` and render it as the
  **last child of `#main-content`, after the `</footer>`**:

  ```tsx
  <CookieConsent />
  ```

  Nothing else in the file changes in this task.

  **3. `components/organisms/cookie-consent.tsx`** — three edits:

  **(a) the first-level surface leaves `fixed`.** On the `motion.div`, replace

  ```
  fixed bottom-[max(calc(var(--spacing)*6),env(safe-area-inset-bottom))] left-6 right-6 z-60 mx-auto max-w-4xl
  ```

  with

  ```
  mx-auto mt-12 mb-8 max-w-4xl
  ```

  `mt-12` = `--spacing*12` = **48 px**, the "separates major regions" step. `mb-8` = **32 px**, M-B's
  share on the last block. `mx-auto max-w-4xl` is unchanged — 358 at 390, 896 at 1440. No
  `position`, no `z-index`, no inset: it is a block in the flow.

  **(b) the motion values become local** (**S3**, human-approved). On the same `motion.div`:
  `initial={{ y: 12, opacity: 0 }}`, `animate={{ y: 0, opacity: 1 }}`, `exit={{ y: 12, opacity: 0 }}`
  — **`y: 100` → `y: 12`, all three**. In flow there is no viewport edge to come from; `y: 100` on a
  static block drags 100 px of page under it. The Same-Path Rule holds: same direction, now local.
  **The `transition` prop is not added** — the surface keeps `MotionConfig`'s
  `{ type: "spring", bounce: 0, duration: 0.35 }` (see § 2.4). **Reduced motion:**
  `reducedMotion="user"` drops the `y` transform and keeps the opacity cross-fade, which is
  `design.md` §9's specified reduced-motion path; **no `motion-reduce:` utility is owed**, because no
  `transform` utility is added anywhere in this task.

  **(c) F2b — the row's horizontal chrome.** On the inner row
  `flex flex-col md:flex-row items-center gap-6 p-6 md:p-8`, replace `p-6 md:p-8` with
  **`px-3 py-6 md:p-8`**. Horizontal only: the vertical padding is untouched, so the surface height
  stays **466** against LR4.4's **336** floor, and the LR2a spend goes **50 → 26** (root 358, body
  text 332, measured; § 2.1 shows the derivation and the instrument). **Do not write `p-3`** — it
  would change the vertical axis and invalidate the measured 466.

  **(d) the privacy shield renders unconditionally.** Remove the `{!isVisible && (` … `)}` wrapper
  around the shield `<button>`; render it always. Everything else about it is unchanged — `h-11 w-11`
  (44 × 44), `bottom-[max(calc(var(--spacing)*4),env(safe-area-inset-bottom))] right-4`, `z-40`,
  `bg-chrome backdrop-blur-chrome`, `IconShield size={18}`,
  `aria-label="Configurações de Privacidade"`. This is what makes LGPD art. 8º § 5º's *facilitado*
  strictly improve: the revocation control is present in every state instead of only while the banner
  is hidden.

  **Not changed, and each for a stated reason:**
  - The inner card keeps `overflow-hidden rounded-2xl border border-line bg-surface-raised shadow-raised edge-lit`.
    The elevation stays `--shadow-raised` on a surface that no longer floats because it is still a
    distinct plane asking for a decision, sitting on `--color-canvas` below a text footer
    (`design.md` §7.2).
  - **Every string in this file is untouched**, including `:55-56`'s
    *"Você pode optar por desativar a telemetria a qualquer momento"*. M-O moves its container; it
    does not edit its text (`legal.md` A2.4 / W13). **Do not reword it, do not shorten it, do not add
    a qualifier.** Its replacement ships with `0011`'s RV1–RV3.
  - The control row at `flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto` and the two
    `Button`s' `w-full sm:w-auto` are **not** edited. That is what keeps **F2c** routed rather than
    half-fixed (§ 4).
  - `BANNER_DELAY_MS = 1500`, `saveConsent`, the `ModalDialog` and `role="switch"` block, and
    `:17-26` — untouched.

- **Tests:**

  `__tests__/cookie-consent.test.tsx` (edit):
  - **Add** `keeps the privacy shortcut reachable while the banner is showing` — clear storage,
    advance past `BANNER_DELAY_MS`, assert **both**
    `getByRole("heading", { level: 2, name: "Respeitamos sua privacidade" })` and
    `getByRole("button", { name: "Configurações de Privacidade" })` are present. Today the second is
    absent in that state; this is the assertion that fails if the `!isVisible` wrapper is restored.
  - **Amend** `keeps the privacy shortcut readable and focusable` to run with storage **cleared**, so
    it exercises the unconditional path rather than the stored-consent one.
  - The existing dialog, save, refuse and accept cases stay green unchanged.

  `__tests__/layout.test.tsx` (edit):
  - **Add** `does not mount the consent surface itself` —
    `expect(screen.queryByRole("button", { name: "Configurações de Privacidade" })).toBeNull()` when
    `RootLayout` renders a plain child. This is what makes the move falsifiable from the layout side;
    without it, a `<CookieConsent />` left behind would render twice and no test would say so.

  `__tests__/calculator-views.test.tsx` (edit):
  - **Add** `mounts the consent surface after the footer inside the main content` — assert
    `getByRole("button", { name: "Configurações de Privacidade" })` is present, and that the
    consent element's position relative to the footer is
    `DOCUMENT_POSITION_FOLLOWING` via `footer.compareDocumentPosition(consentRoot)`. Order, not
    geometry — jsdom can answer that one and it is the property M-O actually asserts.

  `tests/e2e/first-screen-reachability.spec.ts` — no edit; it was written in T1 and **this is the task
  that turns AC13 and LR4.2a green.**

- **Done when:**
  - `pnpm check` green.
  - `pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts` in the isolated copy:
    **AC1 16/16 green, AC13 16/16 green with `lines.length` equal to 9 on `/` and 10 on
    `/custo-da-hora` before the zero-occlusion clause, LR3.5 green in every cell including
    consent-answered, LR4.2a green over 6 controls per viewport per theme.** The single `fixme` is
    F2c's 1440 area comparison.
  - `pnpm exec playwright test tests/e2e/google-tracking.spec.ts` green — the four consent tests still
    pass with the surface in flow.
  - **Escape clause, and it is not optional** (lesson **026**): any of the numbers above that the
    built artifact disagrees with is **a finding reported with its number**, routed per § 1.2's two
    branches — never a threshold tuned until green, and never a `-g` filter narrowing the matrix.
  - Advances **AC1**, **AC3**, **AC10**, **AC13**, **AC14**, **LR4.2a**, **LR4.4**, **F2b**.

---

### T6 — M-D: the five remaining density steps, every one `sm:`-restored

> **`Done when` AMENDED by §3D Amendment 4 (A4.2), 2026-09-19** — T6 is a **geometric
> precondition of T4′**, and the AC13 line-count assertion is an expected, named red between T6 and
> T4′. The amended clauses are written out under *T6 — amended by A4.2* in §3D; everything else in
> this task stands.

- **Files:**
  - `components/organisms/hero-panel.tsx` (edit)
  - `components/organisms/salary-calculator.tsx` (edit)
  - `components/organisms/journey-form.tsx` (edit)
- **Depends on:** **T5**
- **Reuse:** nothing new — five utility edits on elements already in those files.
- **What to build:** exactly five replacements, each restoring the current value at `sm` so **no width
  above 639 px changes at all** (`spec.md` § Out of scope 6 holds by construction).

  | # | File | Element | Today | Becomes |
  |---|---|---|---|---|
  | **D2** | `components/organisms/hero-panel.tsx` | the root `<div>`, inside `cn(...)` | `p-8 lg:p-12` | `p-6 sm:p-8 lg:p-12` |
  | **D3** | `components/organisms/hero-panel.tsx` | the `relative z-10` stack | `space-y-6 lg:space-y-8` | `space-y-4 sm:space-y-6 lg:space-y-8` |
  | **D4** | `components/organisms/hero-panel.tsx` | the `footer ? <div …>` rule | `pt-6 lg:pt-8 border-t border-ink-onfill/15` | `pt-4 sm:pt-6 lg:pt-8 border-t border-ink-onfill/15` |
  | **D5a** | `components/organisms/salary-calculator.tsx` | the **card header** block, `flex items-center gap-4 mb-8` — the one wrapping the `IconCalculator` and the `Custo da Hora` heading | `mb-8` | `mb-6 sm:mb-8` |
  | **D5b** | `components/organisms/journey-form.tsx` | the **card header** block, `flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8` — the one wrapping the `Sua Jornada` heading | `mb-8` | `mb-6 sm:mb-8` |
  | **D6** | `components/organisms/salary-calculator.tsx` | the `<div className="mt-6">` wrapping `<PeriodSelector …>` **inside the `HeroPanel` children** | `mt-6` | `mt-4 sm:mt-6` |

  **Three `mb-8` and one `mt-6` in these files are deliberately NOT touched**, because `design.md`'s
  D5/D6 rows name the *card header block* and the *period control*, and a stale line number in that
  document is not a licence to guess:
  - `salary-calculator.tsx`'s `<div id="salary-fields" className="grid … gap-6 mb-8">` — the fields
    grid, not a header.
  - `salary-calculator.tsx`'s `<CollapsiblePanel id={DETAILS_PANEL_ID} … className="mt-6">` — a
    collapsible panel; **opening the density of a collapsible is out of scope** and would fire the
    `collapsible-panel.tsx` reduced-motion debt's trigger.
  - `journey-form.tsx`'s `<CollapsiblePanel id={SETTINGS_PANEL_ID} … className="mb-8">` — same.

  `DESIGN.md`'s Numeric Scale Rule holds: every suffix used is numeric, so
  `__tests__/spacing-guards.test.ts` stays green and **no key is added to the `--spacing-*`
  namespace**.

- **Tests:** no new jsdom test — these are six utility changes whose only observable effect is
  geometry, and `AGENTS.md` §8 forbids asserting a Tailwind class string. They are measured by
  **T8**'s re-run of `evidence/g1-answer.mjs` (AC2: the answer label's `vtop` falls from **133.8** to
  **104.7** on `/` and **133.1** to **104.0** on `/custo-da-hora`), `g1-scroll.mjs` (AC7: **−21.3 to
  −29.2** in every cell) and `g1-firstinput.mjs` (AC15: **880.5 → 874.4** empty, **864.1 → 857.1**
  seeded, `monthlyHours=0` **791.0**). The existing `__tests__/hero-panel.test.tsx`,
  `__tests__/salary-calculator.test.tsx` and `__tests__/journey-form.test.tsx` must stay green
  **unchanged** — a suite that needs editing for a padding change was asserting a class string and
  that is itself a finding.
- **Done when:**
  - `pnpm check` green with **no edit to any existing test file**.
  - `pnpm exec playwright test tests/e2e` **fully green in the isolated copy**, F2c's single `fixme`
    aside. This is the first task after which the whole e2e suite is green again, and that is the
    contract T1's red run opened.
  - Advances **AC2**, **AC7**, **AC15**, **AC1**.

---

### T7 — S1, S2 and S3 written into `DESIGN.md`

- **Files:** `DESIGN.md` (edit)
- **Depends on:** **T6**
- **Reuse:** `design.md` §15's three replacement texts, verbatim.
- **What to build:** three replacements. **The human approved all three** (`STATUS.md`, decisions
  log, 2026-09-19, delegated for this batch); this task is the writing, not the decision.

  **S1** — `DESIGN.md` § Hero panel, the first bullet. Replace

  > **Padding** 32px, 48px from `lg`.

  with

  > **Padding** 24px below `sm`, 32px from `sm`, 48px from `lg`.

  (Resolves a contradiction already inside `DESIGN.md`: its density table says 24 px at 390 and its
  hero section says 32. It resolves **towards** the density table.)

  **S2** — `DESIGN.md` § Density at the five reference widths, the **390** row's Notes cell. Replace

  > content reserves `pb-16` (64px) below

  with

  > content reserves **96px** below — `pb-16` plus `mb-8` on the last block — because the floating tab
  > bar occupies **78 CSS px** of the viewport's bottom (`766..828` plus its `--spacing*4` inset at
  > 390×844) and a reserve smaller than that band leaves **whatever is last in the document
  > unreachable at every scroll position**.

  **S3** — `DESIGN.md` § Motion, The Same-Path Rule. The cookie banner's entry now refers to its own
  resting position (`y: 12`), not the viewport edge (`y: 100`). Replace

  > The tab bar, the cookie banner and the ad-block notice enter from the bottom and leave to the
  > bottom.

  with

  > The tab bar and the ad-block notice enter from the bottom of the **viewport** and leave to the
  > bottom. The cookie banner sits in document flow and enters from **12px below its own resting
  > position**, leaving the same way — the same direction, in the frame the element actually has.

- **Tests:** `__tests__/spacing-guards.test.ts` reads `DESIGN.md` directly — it must stay green, and
  it is the guard that catches a `--spacing-<name>` key sneaking in with this text. **No new key is
  introduced**; every length above is a number or an existing numeric utility.
- **Done when:**
  - `pnpm test __tests__/spacing-guards.test.ts` green; `pnpm check` green.
  - `node .agents/tools/docs-check.mjs 0010-disclosure-reachability-on-mobile` clean.
  - `grep -n "pb-16" DESIGN.md` returns the new sentence and no stale 64-only claim; paste it.
  - Advances **AC14** and `design.md` §16.9.

---

### T8 — Re-measure everything with one instrument, and write the deltas down

- **Files:** `.specs/0010-disclosure-reachability-on-mobile/reports/build.md` (create)
- **Depends on:** **T7**
- **Reuse:** the `evidence/g1-*.mjs` instruments, **unmodified**, with `HOST` re-pointed at the
  artifact under test — the shared before/after measuring device `spec.md` § Scope 5 names. Do not
  write a new probe for anything one of them already reads.
- **What to build:** a measurement report, not code. In an **isolated copy** (`rsync --exclude
  node_modules --exclude .next`, `cp -al node_modules`, `rm -rf .next`, `pnpm build`, `pnpm start -p 3410 or another port confirmed free`, with `uptime` and `ss -ltnp` pasted above the numbers), run and paste **every**
  command with its output:

  | Command | Criterion | Expected |
  |---|---|---|
  | `HOST=… node …/evidence/g1-fold.mjs` | **AC1** | the surface name, `vtop`, `bottom`, `h`, `w` and the intersect check, per cell, 16/16 |
  | `HOST=… node …/evidence/g1-answer.mjs` | **AC2** | `/` **133.8 → 104.7**, `/custo-da-hora` **133.1 → 104.0**; **an increase in any cell is a finding, not a licence** |
  | `HOST=… node …/evidence/g1-chrome.mjs` | **AC3** | **593 → 171** (header 65 + nav 62 + shield 44); the consent-answered sum is **reported, not bounded** |
  | `HOST=… node …/evidence/g1-text.mjs` then `diff evidence/g1-text.txt the new dump` | **AC4, AC5** | **empty diff.** A non-empty numeric diff is a rejection under § Out of scope 1 |
  | `HOST=… node …/evidence/g1-scroll.mjs` | **AC7** | **−21.3 to −29.2** in every cell |
  | `HOST=… node …/evidence/g1-occlusion.mjs` | **AC13** | `linesOnFirstScreen` **9** on `/` and **10** on `/custo-da-hora`, split **8+1** and **9+1**, **then** `linesOccluded: 0`, 16/16 |
  | `HOST=… node …/evidence/g1-firstinput.mjs` | **AC15** | **874.4** (−6.1), **857.1** (−7.0), `monthlyHours=0` **791.0** |
  | `PORT=… pnpm exec playwright test tests/e2e` | AC1, AC6, AC13, LR3.5, LR4.2a, LC1 | fully green but F2c's `fixme` |
  | `pnpm test:coverage` | `AGENTS.md` §9 | `lib/**` and `hooks/**` **100%**, `app/**` and `components/**` **≥ 90%** |
  | `git diff --name-only main...HEAD` | **AC11** | a subset of § 1.4's list; `components/templates/calculator-layout.tsx`, `lib/**` and `hooks/**` **absent** |
  | `grep -rn "Súmula 172\|DSR" __tests__ tests components lib` | **AC9** | re-measured and pasted; the trigger did **not** fire (no task opens `components/organisms/day-summary.tsx`), so the debt is re-routed intact |

  **One number G6 must take that no instrument here reads: CLS.** The consent surface mounts
  1 500 ms after load as the **last** child of `#main-content`, so nothing below it moves — that is a
  structural argument, not a measurement (`design.md` §9). **`web-standards-auditor` measures CLS on
  both routes against `0004`'s budget, and the comparison is against the *current* number, not
  against zero**, because today's `fixed` banner is CLS-exempt for a different reason. Named here so
  it is an obligation with an owner and not a claim nobody checked.

  **Every unmeasured number in this table carries the same escape clause as the measured ones**
  (lesson **026**): a disagreement is **a finding reported with its number**, routed per § 1.2's two
  branches, never absorbed and never rounded towards the expectation.

- **Tests:** none — this task runs them.
- **Done when:**
  - `reports/build.md` exists with every command above and its **pasted output**, and no claim in it
    lacks one (**AC12**).
  - `pnpm check` green and `pnpm build` clean.
  - Advances **AC2, AC3, AC4, AC5, AC7, AC9, AC11, AC12, AC13, AC15**.

---

---

## 3A. Amendment 1 — the `0003` collision, ruled by `tech-lead` on 2026-09-19

**Trigger.** `0003`'s **T2** landed in this shared tree while T1 was in flight. It deleted
`LegalYear.source`, `LegalYear.sourceUrl` and `LegalYear.effectiveFrom` and rewrote footer P4. Both
specs filed the same blocker. This amendment rules it **for both**, and nothing here re-opens
`legal.md`, `design.md`, `copy.md` or `spec.md`.

**Three facts, read from the tree and not from either plan:**

1. **`citationParagraph` is live code, not dead code.** `grep -n citationParagraph tests/` returns
   **seven** hits: its declaration at `tests/e2e/support/reachability.ts:185` and **six call sites**
   in `tests/e2e/first-screen-reachability.spec.ts` (`:6`, `:210`, `:256`, `:285`, `:307`, `:328`).
   The earlier reading that it was pre-existing dead code is **wrong** — the spec file is T1's own
   output, created in this tree minutes earlier. **It is not deleted.**
2. **The break is wider than the locator.** `first-screen-reachability.spec.ts:30` and `:36` pin
   `"DS1 P4": "Tabelas de INSS e IRRF de"`. That sentence no longer exists: footer P4 is now
   `copy.md` `F-1` of `0003` — *"Tabelas usadas nos cálculos: INSS pela … IRRF pela … RPPS
   federal: …"*, **398 characters, four `<a>`**. This one fails silently under `typecheck`, which is
   worse than the field deletion, not better.
3. **T4's premise is dead.** T4 mandates a verbatim `TableCitation` reading `.source`, `.sourceUrl`
   and `.effectiveFrom`, mandates the move be **byte-identical**, and places the result from a
   measurement of the **old** paragraph (`/` at `707.4..742.2`, `h` **34.8**, **23.8 px** of
   clearance to the fixed route nav at `766..828`). The paragraph it was measured on has been
   replaced by one `0003`'s `design.md` §10.2 M16 measures at **7 line boxes** at 390 (footer
   `302.25 → 389.20 px`). T4 cannot be executed as written, and it may not be executed as
   improvised.

### A1.1 — Ruling 1: the repair lands **here**, in this spec's own files, as **T1a**

`0003`'s **T2 is complete and its file list does not widen.** `tests/e2e/support/reachability.ts`
and `tests/e2e/first-screen-reachability.spec.ts` are **this** spec's files, created by **this**
spec's T1; they are repaired by **this** spec's developer, under this amendment. Neither developer
edits the other spec's file.

### T1a — Re-point T1's two stale bindings at values, and clear T1's own lint failure

- **Files:**
  - `tests/e2e/support/reachability.ts` (edit)
  - `tests/e2e/first-screen-reachability.spec.ts` (edit)
- **Depends on:** none. **It runs first, ahead of T2**, because `pnpm typecheck` is red tree-wide
  until it lands and `0003`'s developer is stopped on it.
- **Reuse:** `lib/legal-tables.ts` — `CURRENT_LEGAL_YEAR`, already imported at
  `tests/e2e/support/reachability.ts:2`. No new import, no new helper, no new constant.
- **What to build:**

  1. **`reachability.ts:185-187`** — replace the locator body with exactly:

     ```ts
     export function citationParagraph(page: Page): Locator {
       return page
         .locator("p")
         .filter({ has: page.getByRole("link", { name: CURRENT_LEGAL_YEAR.sources.rgpsBrackets[0].norm }) });
     }
     ```

     **Why this entry and no other.** T1's own stated rationale — *locate the paragraph by the norm
     it cites, never by a pt-BR literal* — is preserved exactly; only the field moves.
     `sources.rgpsBrackets[0].norm` is *"Portaria Interministerial MPS/MF nº 13, de 09/01/2026,
     Anexo II"*, the INSS/RGPS attribution, and it is the **only** one of the paragraph's four
     anchor texts that is unique as an accessible name: anchor 4's text is the **literal**
     `Anexo III da Portaria nº 13/2026` (`0003` `plan.md` T2 row 4) and would collide on a substring
     match. The `<p>` carries four `<a>`; `filter({ has })` still resolves **exactly one** `<p>`,
     which is what AC1's `toHaveCount(1)` already asserts.
     **Do not** anchor on `sources.rppsFederalBrackets`, on prose, or on a class.

  2. **`first-screen-reachability.spec.ts:30` and `:36`** — `LR35_SURFACE_MARKERS`'s `"DS1 P4"`
     value becomes, in **both** route records:

     ```ts
     "DS1 P4": CURRENT_LEGAL_YEAR.sources.rgpsBrackets[0].norm,
     ```

     with `CURRENT_LEGAL_YEAR` imported from `"../../lib/legal-tables"`. A **value**, not a
     sentence: this is the binding that just cost a round trip, and `0003` has six more tasks that
     rewrite pt-BR citation prose.

  3. **`FULL_JOURNEY_SURFACE_MARKERS`'s `"DS2"`** becomes `"Súmula 172"`, from
     `"O DSR (Súmula 172"`. `0003`'s **T5** rewrites that caption to *"O DSR sobre os extras e sobre
     o adicional noturno vem da Lei nº 605/1949, art. 7º, alínea \"a\", da Súmula 172 e da Súmula
     60, I, do TST. …"* (`0003` `plan.md` T5). `Súmula 172` is the **only** fragment present in both
     the shipped caption and the one `0003` mandates, and it appears in no other string on either
     route. Changing it now makes this marker correct **before and after** `0003`'s T5, so T5 does
     not cost a third round trip.

  4. **`"DS7 art. 59"` (`"O art. 59 da CLT limita"`) and `"DS7 art. 71"`
     (`"Seu intervalo ficou abaixo"`) are left exactly as they are.** Checked against `0003` `plan.md`
     T4: its `C-1` opens with that same clause verbatim, and T4 states *"no new warning, no new id,
     **no title change**"* — `"Seu intervalo ficou abaixo"` is `lib/compliance.ts:54`'s `title`.
     Recorded so nobody "fixes" a marker that is not broken.

  5. **Every marker must resolve to exactly one element before it is used as a surface.** Add, in
     the LR3.5 block, ahead of the sweep and ahead of the `EXPECTED_LR35_SURFACE_COUNT` assertion:
     `await expect(page.getByText(marker)).toHaveCount(1)`, with the marker key in the failure
     message. **This is a separate verdict from LR3.5's.** A stale marker and an unreachable surface
     are different findings with different owners — a marker that resolves to 0 must fail as
     *"marker DS2 no longer matches any element"*, never as *"DS2 has no clear scroll position"*.
     A fused branch reports the second when the first is true, which is exactly how this collision
     stayed invisible until `typecheck` caught an unrelated field.

  6. **`pnpm lint` on `tests/e2e/first-screen-reachability.spec.ts:3:1`
     (`assist/source/organizeImports`) is T1's own, and T1's *Done when* required `pnpm lint` clean.**
     Fix it (`pnpm exec biome check --write` on that file only). The **second** lint failure in the
     tree, `tests/e2e/column-stability.spec.ts:1:1`, is **`0008`'s T7 and is not touched here** —
     see A1.5.

- **Tests:** this task edits guards; it adds no product behaviour. Its verification is that the
  guards still discriminate:
  - `pnpm typecheck` clean tree-wide — the error
    `tests/e2e/support/reachability.ts(186,92): error TS2551: Property 'source' does not exist on
    type 'LegalYear'` is gone.
  - `pnpm lint` reports **exactly one** remaining failure, `tests/e2e/column-stability.spec.ts:1:1`,
    and it is `0008`'s.
  - The T1 red run is **re-taken** — see A1.4. `citationParagraph` must still resolve to **1** on
    both routes and AC1 must still fail 16/16. **If AC1 goes green here, that is a defect in the
    guard, not good news** — T1's own rule, unchanged: stop and report.
- **Done when:** `pnpm check` green except the single `0008`-owned lint failure named above, that
  failure recorded verbatim in `reports/build.md` with its owner; the re-taken red run pasted into
  `reports/build.md` per A1.4. Advances **AC6**.

### A1.2 — Ruling 2: **T4 is deferred and re-planned**, and it is routed to `product-designer`

T4 is **not** executed on any premise this gate can supply, because every option is a design call
this gate is forbidden to make:

- moving `F-1` whole is projected — *projected, on `0003`'s measured footer growth of `302.25 →
  389.20 px`, not measured here, and it must be measured before it is believed* — to add roughly
  **87 px** to a box that has **23.8 px** of clearance to the fixed route nav at `766..828`. If that
  projection holds, M-R fails **R clause 1** (whole box inside `844`) and **R clause 2**
  (no intersection with fixed chrome) at the moment it lands;
- keeping `F-1` in the footer and putting a shorter citation under the answer is a **new string**,
  and this spec's `copy.md` is an explicit no-op with **AC5's exemption list EMPTY**;
- choosing a different surface for M-R is `design.md` §3/§5's call, not a task's.

**Routed to `product-designer`, as a scoped G3 re-run on M-R only — bounce 1 of 2 on this spec's
G3.** `legal.md`, `spec.md` and `copy.md` are untouched by it; §15's S1/S2/S3 and M-O/M-B/M-D are
untouched by it; the 32-cell measurement stands. Four questions, in order, each with the artifact
it must be answered on:

- **Q-A.** Re-measure **DS1 P4 as it now stands** — `F-1`, 398 chars, four `<a>` — in the `aside`
  slot, at 390×844 and 1440×900, both themes, on an isolated production build. Re-state M-R's
  placement numbers. `0003`'s M16 (7 line boxes, 56.86 cpl at 390) is **its** measurement of the
  paragraph **in the footer**; it is evidence for the size, never a substitute for measuring the
  destination.
- **Q-B.** Do **R clause 1** and **R clause 2** hold for that box at 390×844, in all four storage
  states, consent pending and consent answered? If not, say which placement does, **without any new
  or shortened string**.
- **Q-C.** Answer Q-A **with M-B and M-O already applied** (i.e. measure M-R *after* T3 and T5), so
  T4 can be ordered last. T4's run-1 geometry assumed T3 and **preceded** T5; that ordering was a
  file-serialisation choice of this plan, not a legal or design constraint, and A1.3 reverses it.
  One measurement answers both questions; taking it in the old order buys a second one.
- **Q-D.** Confirm `DS1_EXPECTED_PARAGRAPHS` **4 → 3** still holds — the footer keeps P1, P2, P3
  after P4 leaves — and that `0003`'s **T9**, which also edits `tests/e2e/support/legibility.ts` and
  `tests/e2e/disclosure-legibility.spec.ts`, lands **before** the re-planned T4. It does, under
  A1.3.

**Conditional route, stated now so nobody improvises at G5.** If Q-B answers *no placement satisfies
R with `F-1` whole*, the next stop is **`labor-law-analyst`**, on **L5** — *"a 34.8 px whole surface
exists (DS1 P4), so R is satisfiable with zero new copy; AC5's exemption list is EMPTY"* — whose
stated premise is the 34.8 px surface that no longer exists. Only if `labor-law-analyst` then
authorises a fragment or a new string does `content-writer` open. **The developer never chooses,
and `tech-lead` never rules on L5.**

When `product-designer` answers, `tech-lead` rewrites T4 as **T4′** with the re-measured numbers and
the new `TableCitation` body, whose data must come from `CURRENT_LEGAL_YEAR.sources` — the
`.source` / `.sourceUrl` / `.effectiveFrom` fields are gone and are **not** to be restored. Until
T4′ is written, **T4 is not executable and a developer who reaches it stops.**

> **ANSWERED and PARTLY SUPERSEDED, 2026-09-19.** `product-designer` delivered Q-A…Q-D as
> `design.md` **§17**. Three corrections to the paragraph above, each ruled in **§3D Amendment 4**:
> **(i)** the conditional route to **L5 does NOT fire** — `legal.md` §6 authorises relocating *one of*
> four named whole surfaces in advance and L5's subject is a split or a shortened string (§17.3);
> **(ii)** M-R's subject is **`DS1 P2`**, not `DS1 P4`, so there is **no `TableCitation` body** and
> the `CURRENT_LEGAL_YEAR.sources` sentence above has no subject — the relocated surface reads no
> `lib/` data at all; **(iii)** Q-D's premise that *"the footer keeps P1, P2, P3 after P4 leaves"* is
> **wrong in its survivors and right in its count**: the footer keeps **P1, P3, P4**, and
> `DS1_EXPECTED_PARAGRAPHS` is still 4 → 3 (§17.5). **T4′ is written in §3D and is executable.**

### A1.3 — Ruling 3: the task order changes, and `legal.md` A1.7 is preserved

New binding order: **T1 → T1a → T2 → T3 → T5 → T6 → T4′ → T7 → T8.**

- **T5's `Depends on` becomes `T3` (binding) only.** Its dependency on **T4** was a serialisation of
  two edits to `components/organisms/calculator-views.tsx` inside one spec, written by this gate at
  run 1; it was never a legal or design constraint. `legal.md` **A1.7** binds **M-B before M-O** —
  **T3 before T5 — and that is untouched and still binding.**
- **`0003` is finished with `components/organisms/calculator-views.tsx`.** Its remaining tasks
  T3–T9 open `lib/utils.ts`, `lib/payroll.ts`, `lib/compliance.ts`, `lib/weekly-rest.ts`,
  `components/organisms/day-summary.tsx`, `lib/salary-period.ts`,
  `components/molecules/period-selector.tsx`, `components/organisms/journey-form.tsx`,
  `components/molecules/regime-field.tsx` and the two e2e legibility files — **never
  `calculator-views.tsx` again**. Checked against every `Files:` line of `0003`'s `plan.md`. So T5
  may open that file now without waiting.
- **T4′ lands after `0003` closes**, which also removes the `tests/e2e/support/legibility.ts` /
  `tests/e2e/disclosure-legibility.spec.ts` collision with `0003`'s T9 at zero cost: T9 adds a
  describe and three exported selectors, T4′ moves `DS1_EXPECTED_PARAGRAPHS` to 3, and in that order
  neither overwrites the other.
- **T6 and T7 are unchanged**; T7 still depends on T6, T8 still depends on T7, and **T8 is still the
  task that proves `pnpm e2e` green.**

### A1.4 — Ruling 4: T1's red-run baseline is **stale** and is re-taken

T1's recorded red numbers — `docTop` **2727.2** on `/`; LR3.5 needing `scrollY` **2504.2** of a max
**2490** on `/` and **1228.6** of **1215** on `/custo-da-hora` — were taken on a tree whose footer
was **87 px shorter**. Every one of them is a document-height quantity, so every one of them has
moved, and **none of that movement belongs to this spec.**

**Re-take the T1 red run under T1a**, on the current head, in an isolated copy with its own `.next`
and a port confirmed free with `ss -ltnp` after `uptime`, and paste both sets into
`reports/build.md` side by side, labelled *"before `0003` T2"* and *"after `0003` T2, this spec's
baseline"*.

**T8 measures its deltas against the re-taken baseline, never against the run-1 numbers.** Two
verdicts, two branches, and they are not fused: *"this movement made the quantity worse"* is this
spec's and is a `frontend-dev` finding; *"the quantity is over target"* may be `0003`'s footer and
is a `tech-lead` routing call. A single delta against a stale baseline reports the second as the
first, every time.

### A1.5 — The second lint failure is `0008`'s, and it is real

`pnpm lint` on the current tree returns **exactly two** failures, both
`assist/source/organizeImports`, both **FIXABLE**, both in **untracked** files:

| Path | Owner | Disposition |
|---|---|---|
| `tests/e2e/first-screen-reachability.spec.ts:3:1` | **this spec, T1** | fixed by **T1a** step 6 |
| `tests/e2e/column-stability.spec.ts:1:1` | **`0008`, T7** | **routed to `0008`.** Real, not a false positive, and **not** a `0003` or `0010` regression |

Neither is attributable to `0003`. Recorded here and in both specs' `STATUS.md` so that no gate
downstream reads a red `pnpm lint` as a `0003` defect.

## 3B. Amendment 2 — what LR3.5 *measures*, ruled by `tech-lead` on 2026-09-19

**Trigger.** T1a's step 2 was applied exactly as written and the LR3.5 sweep went **17/17 green on
an unfixed head** (`reports/build.md`, run 1, isolated copy, port 3419). The developer stopped, per
T1's own rule, and did not pick a surface. The cause is measured, not inferred: the marker
`CURRENT_LEGAL_YEAR.sources.rgpsBrackets[0].norm` is now the **full accessible name of one `<a>`**
inside `0003`'s `F-1` paragraph, so `surfaceClearsFixedChromeAtSomeScroll`'s leaf search — *"the
first element whose own `textContent` contains the marker and whose children's do not"* — terminates
on the `<a>` (**34.4 px**, near the paragraph's top) instead of the `<p>` (`citationParagraph`
measures **2848.95** bottom on `/` empty, ~120 px taller and lower). A1's own repair blinded the
guard it repaired. **A guard green with the defect still live is worth less than no guard**
(`legal.md` §11; this plan's §5 risk row *"A guard passes on the unfixed head at T1"*).

**This amendment rules only *which element LR3.5 measures* and *how the test reaches it*. It does
not touch `legal.md`, `spec.md`, `design.md` or `copy.md`, and it changes no product behaviour.**

### A2.0 — Why this is `tech-lead`'s and not `labor-law-analyst`'s

Routing this to G2 was considered and rejected, on the document's own words:

- `legal.md` §8.1 names the subject of LR3.5 as *"every disclosure surface the `0006` §2.1 test
  returns"*, and its **worked measurement table measures DS1 P4 as one box of height 34.8** — the
  whole one-line citation paragraph of the pre-`0003` tree, not any element inside it. §9 states it
  in words: **"DS1 P4 is the citation line."** Paragraph-level is `legal.md`'s own reading, already
  written down. Nothing below re-decides it.
- The one place the law could be read otherwise is §6's *"a fragment that does carry the norm or the
  gap is not a split at all — it is a second surface."* Under that reading the `<a>` would be a
  surface **in addition to** the paragraph, never instead of it. **And the addition is already
  discharged by measuring the paragraph:** the `<a>`'s border box is geometrically contained in the
  `<p>`'s, so *the `<p>` clears all fixed chrome at scroll s* implies *the `<a>` clears it at s*.
  Measuring the containing block is the **strictly stronger** test in both readings, which is why
  this ruling is safe without re-opening G2.
- What `0003`'s rewrite *did* change legally — DS1 P4 is no longer a **34.8 px** surface, which is
  the stated premise of **L5** — is already routed, unchanged, by **A1.2's conditional route**. This
  amendment does not pre-empt it and does not touch L5.

### A2.1 — Ruling 1: the LR3.5 surface is the **nearest non-inline ancestor-or-self** of the matched leaf

> **The surface LR3.5 measures is the first element, walking up from the matched leaf through
> `parentElement` (leaf included), whose computed `display` is neither `contents` nor a value
> beginning with `inline`.**

The marker keeps doing what T1a made it do — **locate** the text, from a value and never from a
pt-BR sentence. It stops deciding **what gets measured**. Rationale, in one line each:

- **It is the box the defect lives in.** LR3.5's failure mode is *a multi-line run of disclosure text
  whose bottom cannot clear the route nav*. Line boxes are laid out by the nearest block container;
  an inline `<a>` has no such geometry to fail on, which is exactly why it could not fail.
- **It is string-free.** It reads `getComputedStyle().display` and the DOM tree, and nothing in
  pt-BR. The re-coupling T1a paid a round trip to remove does not come back.
- **It cannot over-climb.** The walk stops at the first block-level box, which for DS1 P1/P2/P3, DS2
  and both DS7 titles **is the element already being measured today** (all six are `<p>`); it moves
  exactly one element, DS1 P4's, from the `<a>` to its `<p>`.
- **It cannot weaken the assertion.** Every candidate it can climb to *contains* the leaf, so the
  box it measures is never smaller than the box measured today. A guard-design error in this rule
  can only make LR3.5 stricter, never vacuous — the asymmetry that makes it the right default.
- **`inline-block` / `inline-flex` are climbed past on purpose.** A shrink-to-fit inline-level box is
  a fragment of a text run, not the run; climbing to its block parent keeps the containment argument
  in A2.0 intact.

**Why not the two alternatives the developer named.** Re-deriving DS1 P4 through
`citationParagraph(page)` special-cases one surface with a bespoke locator and leaves the other six
on the leaf search — two mechanisms, one rule, and the next marker that lands on a descendant fails
silently the same way. Climbing "to the nearest `<p>`" hard-codes a tag list that DS7's banner or any
future `<li>`/`<figcaption>` surface falls outside of; `display` is the property the layout actually
uses and the one LR3.5's own quantity (`getBoundingClientRect`, border box) is taken from.

### A2.2 — Ruling 2: the choice is falsifiable by **three separate verdicts**, none of them fused

A rule about *which box* is only as good as the assertion that the test is still looking at that box.
Three checks, **three `expect`s, three messages, three owners** — never one combined boolean. The
case where one fires and another does not is precisely the case this amendment exists for:

| # | Assertion | Fires when | Owner of the failure |
|---|---|---|---|
| **V1 — identity** | for `DS1 P4`, the resolved surface **is the same DOM node** `citationParagraph(page)` resolves to | the leaf search drifts into a descendant (today's defect) or the locator and the sweep diverge again | **`tech-lead`** — guard defect, never a product finding |
| **V2 — non-degeneracy** | for **every** surface, the resolved element's `display` is neither `contents` nor `inline*`, **and** its border-box height is ≥ the matched leaf's | the climb is skipped, mis-implemented, or a surface is an inline box with no block ancestor | **`tech-lead`** — guard defect |
| **V3 — LR3.5 itself** | the resolved surface has a scroll position clear of all fixed chrome | the real legal breach | **the spec** — this is F1, and it is the only one of the three that is a finding about the product |

V1 and V2 are asserted **before** V3 in each test, so a guard defect can never be reported as a
clean LR3.5 sweep and an LR3.5 breach can never be reported as a stale marker. This is A1's step-5
rule (*"a stale marker and an unreachable surface are different findings with different owners"*)
extended to the third failure mode A1 did not see.

### T1b — Make LR3.5 measure the surface, not the link inside it

- **Files:**
  - `tests/e2e/first-screen-reachability.spec.ts` (edit) — `surfaceClearsFixedChromeAtSomeScroll` and
    the three LR3.5 `test` bodies at `:309`, `:331` and `:359`.
  - **No other file.** `tests/e2e/support/reachability.ts` is **not** edited: `citationParagraph`
    stays exactly as T1a left it, and `EXPECTED_LR35_SURFACE_COUNT` (4 / 4) is unchanged.
- **Depends on:** T1a steps 1–6, which are **applied and correct** (`reports/build.md`). T1b runs
  before T5; see A2.4.
- **Reuse:** `citationParagraph` from `./support/reachability` — already imported at `:6` and already
  called in all three LR3.5 tests. No new helper module, no new constant, no second copy of the
  resolution algorithm (lesson **030**: one body, one call site shape).
- **What to build:**

  1. **One resolution algorithm, in one place.** Widen the existing in-page function; do **not** add
     a second `page.evaluate` that re-implements the leaf search. Replace the body of
     `surfaceClearsFixedChromeAtSomeScroll` with, exactly:

     ```ts
     async function surfaceClearsFixedChromeAtSomeScroll(
       page: Page,
       marker: string,
       expectedSurface: ElementHandle<Element> | null = null,
     ): Promise<{
       found: boolean;
       sampledCount: number;
       matchesExpectedSurface: boolean;
       surfaceTag: string;
       surfaceDisplay: string;
       surfaceHeight: number;
       leafTag: string;
       leafHeight: number;
       docTop: number;
       maxScroll: number;
       scrollNeededToClear: number | null;
     }> {
       return page.evaluate(
         ({ markerText, sampleCount, expected }) => {
           const all = [...document.querySelectorAll("body *")];
           const leaf = all.find(
             (element) =>
               (element.textContent ?? "").includes(markerText) &&
               ![...element.children].some((child) => (child.textContent ?? "").includes(markerText)),
           );
           if (!leaf) throw new Error(`surface not rendered: ${markerText}`);

           const isInlineLevel = (element: Element) => {
             const display = getComputedStyle(element).display;
             return display === "contents" || display.startsWith("inline");
           };
           let surface: Element = leaf;
           while (isInlineLevel(surface) && surface.parentElement) surface = surface.parentElement;

           const fixed = all.filter((element) => {
             const style = getComputedStyle(element);
             return (
               (style.position === "fixed" || style.position === "sticky") && element.getBoundingClientRect().height > 0
             );
           });

           const rect = surface.getBoundingClientRect();
           const docTop = rect.top + scrollY;
           const height = rect.height;
           const maxScroll = document.documentElement.scrollHeight - innerHeight;

           let found = false;
           let scrollNeededToClear: number | null = null;
           for (let sample = 0; sample < sampleCount; sample += 1) {
             const scrollSample = sampleCount === 1 ? 0 : (maxScroll * sample) / (sampleCount - 1);
             const surfaceTop = docTop - scrollSample;
             const surfaceBottom = docTop + height - scrollSample;
             const clearOfEveryFixedElement = fixed.every((fixedElement) => {
               if (fixedElement.contains(surface) || surface.contains(fixedElement)) return true;
               const fixedRect = fixedElement.getBoundingClientRect();
               return (
                 fixedRect.bottom <= surfaceTop ||
                 fixedRect.top >= surfaceBottom ||
                 fixedRect.right <= rect.left ||
                 fixedRect.left >= rect.right
               );
             });
             if (clearOfEveryFixedElement) {
               found = true;
               scrollNeededToClear = Math.round(scrollSample * 10) / 10;
               break;
             }
           }

           return {
             found,
             sampledCount: sampleCount,
             matchesExpectedSurface: expected === null || surface === expected,
             surfaceTag: surface.tagName.toLowerCase(),
             surfaceDisplay: getComputedStyle(surface).display,
             surfaceHeight: Math.round(height * 10) / 10,
             leafTag: leaf.tagName.toLowerCase(),
             leafHeight: Math.round(leaf.getBoundingClientRect().height * 10) / 10,
             docTop: Math.round(docTop * 10) / 10,
             maxScroll: Math.round(maxScroll * 10) / 10,
             scrollNeededToClear,
           };
         },
         { markerText: marker, sampleCount: LR35_SAMPLE_COUNT, expected: expectedSurface },
       );
     }
     ```

     Three points that are decisions, not style: the **self-and-ancestor exemption now keys on
     `surface`, not `leaf`** (a fixed ancestor of the paragraph must still exempt itself); the climb
     guards on `surface.parentElement` so `<html>` terminates it; and `expected` is passed as an
     `ElementHandle`, which Playwright hands to the page as the live `Element`, so the identity check
     needs **no second copy** of the resolution. Import `type ElementHandle` from `@playwright/test`
     alongside the existing type imports at `:1`, and re-run `pnpm exec biome check --write` on this
     file only (T1a step 6's ordering rule still applies).

  2. **Call it with the expected surface for `DS1 P4`, in all three LR3.5 tests** (`:309`, `:331`,
     `:359`), inside the existing sweep loop, replacing the current call:

     ```ts
     const expectedSurface = surfaceName === "DS1 P4" ? await citationParagraph(page).elementHandle() : null;
     const result = await surfaceClearsFixedChromeAtSomeScroll(page, marker, expectedSurface);
     ```

     `citationParagraph(page)` is already awaited to `toHaveCount(1)` at the top of each of the three
     tests, so the handle is resolved, single and stable by the time this line runs — that
     `toHaveCount(1)` **is** this step's synchronization barrier (lesson **027**), and it stays where
     it is. `DS1 P4` is a key of `FULL_JOURNEY_SURFACE_MARKERS` too, via its spread of
     `LR35_SURFACE_MARKERS["/"]`, so the same two lines serve the full-journey test unchanged.

  3. **The three verdicts, in this order, immediately after the call and before the `found` assert**
     — three `expect`s, never `&&`-ed:

     ```ts
     expect(
       result.matchesExpectedSurface,
       `guard defect: LR3.5's ${surfaceName} surface at ${route} resolved to <${result.surfaceTag}> (h ${result.surfaceHeight}), not the element citationParagraph resolves to`,
     ).toBe(true);
     expect(
       result.surfaceDisplay === "contents" || result.surfaceDisplay.startsWith("inline"),
       `guard defect: LR3.5's ${surfaceName} surface is inline-level (<${result.surfaceTag}>, display ${result.surfaceDisplay}); it measures a fragment, not the disclosure`,
     ).toBe(false);
     expect(
       result.surfaceHeight >= result.leafHeight,
       `guard defect: LR3.5's ${surfaceName} surface (<${result.surfaceTag}>, h ${result.surfaceHeight}) is smaller than its matched leaf (<${result.leafTag}>, h ${result.leafHeight})`,
     ).toBe(true);
     ```

     Then the **existing** `found` assertion, unchanged in shape, with the range numbers appended to
     its message so a red run pastes its own evidence:
     `` `${surfaceName} at ${route} ${state} ${theme} never clears fixed chrome across ${result.sampledCount} sampled scroll positions (docTop ${result.docTop}, h ${result.surfaceHeight}, maxScroll ${result.maxScroll})` ``.
     In the full-journey test keep its own existing message text and append the same three numbers.
     Every one of the three guard-defect messages starts with the literal `guard defect:` **because
     that prefix is what tells the next reader the failure is `tech-lead`'s and not the product's.**

  4. **Nothing else changes.** Not `EXPECTED_LR35_SURFACE_COUNT`, not the markers, not
     `citationParagraph`, not AC1, not AC13, not LR4.2a, and **no source file under `app/`,
     `components/`, `hooks/` or `lib/`.** T1b is a guard-only task.

- **Tests:** this task *is* a test change; its verification is the re-taken red baseline in A2.3.
- **Done when:**
  - `pnpm typecheck` clean tree-wide; `pnpm lint` reports **exactly one** remaining failure,
    `tests/e2e/column-stability.spec.ts:1:1`, `0008`'s (A1.5) — plus any `0003`-owned in-flight
    finding, recorded verbatim with its owner, never fixed here.
  - The A2.3 run is pasted into `reports/build.md` and its verdict is **(a)**.
  - Together with T1a steps 1–6, this discharges **T1a's own *Done when*** — which A2.5 moves here,
    because T1a's file list could not produce a discriminating guard without this ruling
    (lesson **020**). Advances **AC6**.

### A2.3 — Ruling 3: the red baseline is re-taken **again**, and the earlier red run is not accepted

The run in `reports/build.md` measured AC1, AC13 and LR4.2a against the current tree but measured
**LR3.5 against the wrong box**. A baseline is one artifact: a run in which one describe measured a
surface that does not exist as a subject is not a baseline for any of them, because T8 diffs the
whole file against it.

**Re-take the full run after T1b**, same protocol as A1.4 and no weaker: isolated copy
(`rsync -a --exclude node_modules --exclude .next`, `cp -al node_modules`, fresh `.next`), `uptime`
and `ss -ltnp` recorded before the run, a port confirmed free, **production build only — never under
`next dev`**, and **not while another agent's browser measurement is running.** Paste the counts and,
per surface and per route, a table of `surfaceTag` / `surfaceHeight` / `leafTag` / `leafHeight` /
`docTop` / `maxScroll` / `scrollNeededToClear`. **This run, and not the earlier one, is the baseline
T8 diffs against**; label it *"after `0003` T2 + Amendment 2, this spec's baseline"* and keep the two
earlier runs beside it, labelled, per A1.4.

**Three stop conditions, separated, each with its own destination.** They are separate because the
case where one holds and another does not is the case a fused reading gets backwards:

- **(a) Expected — DS1 P4 red, everything else as before.** `DS1 P4` fails V3 in **16/16** sweep
  cells and in the full-journey test (17 red), with V1 and V2 green everywhere; `surfaceTag` is `p`
  for all seven surfaces; the other six surfaces' verdicts are **identical to the run-1 verdicts**.
  → T1b and T1a are **done**, the pipeline moves to A2.4.
- **(b) DS1 P4 still green after the climb.** Then the surface is not the problem and this
  amendment's premise is wrong. **Stop. Edit no source file. Report to `tech-lead`** with the
  resolved `surfaceTag`/`surfaceHeight`/`docTop`/`maxScroll` and the `scrollNeededToClear` that made
  it pass, and with `citationParagraph`'s own `boundingBox()` beside them for comparison. This is a
  third bounce on the same mechanism: under `AGENTS.md` §4 the pipeline **stops and goes to the
  human**, and `tech-lead` writes the impasse — it does not get a third architectural guess.
- **(c) A surface other than `DS1 P4` changes.** Any of the other six flipping verdict, changing
  `surfaceTag`, or failing V1/V2 is a **finding, not a fix**: record it, route it to `tech-lead`, and
  **do not re-point its marker** (A1 step 4's rule against "fixing" a marker that is not broken
  stands). Most likely cause is `0003`'s footer growth moving `docTop`, which is `0003`'s quantity
  and this spec's baseline — not a regression this spec introduced. This is A1.4's two-verdict rule
  applied one level down.

### A2.4 — T3's deferred e2e verification: **confirmed**, and given a trigger

`frontend-dev` deferred T3's `-g "LR3.5"` run pending this ruling. **Correct, and confirmed** — a
verification read off a guard known not to discriminate is not a verification. The deferral now gets
the trigger it was missing, because a deferral without one is a silence:

**T3's e2e verification runs as part of the A2.3 baseline run, in the same isolated copy, and before
T5 opens.** It is not deferred to T8. Two reasons it cannot wait: `legal.md` **A1.7** binds M-B
before M-O, and this plan's §5 names the signature of M-O-without-M-B as *LR3.5 red on **DS1 P3**,
`scrollY` 2529.6 against a max of 2516 on `/`* — a signal that can only be read on a discriminating
LR3.5 sweep. Read it under **(a)**, with T3 in the tree and T5 not yet written.

**And it is read with A2.3's verdicts, not against run 1's.** If DS1 P3 is red in the A2.3 run, the
two candidate causes are *T3's reserve is wrong* (this spec's, `frontend-dev`'s) and *`0003`'s footer
growth moved `docTop` past the max* (`0003`'s, a routing call). Do not report one as the other:
paste `docTop`, `surfaceHeight` and `maxScroll` for DS1 P3 and let the arithmetic name the owner.

### A2.5 — T1a's state, and the two smaller items

- **T1a steps 1–6 are correct and stay.** Only its *Done when*'s red-baseline clause moves, to T1b.
  Nothing about the value-based marker is reverted: the failure was never that the marker is a value,
  it is that a locator and a measurement read the same value to different depths.
- **T2 (`useState(false)` at `cookie-consent.tsx:15`, `:17-26` untouched, 20 unit tests + the
  LC1.1–LC1.7 e2e with its falsifiability control) and T3 (M-B + D1) stand as delivered.** Nothing in
  this amendment reopens either. T3's e2e verification is A2.4's.
- **The `salary-calculator.test.tsx` / `period-selector.tsx` observation is recorded as an
  observation, not filed as a flake.** One failure in one full-suite run, one pass on re-run, and an
  unstated number of single-file runs is **not** evidence of intermittency — flakiness is a claim
  about a distribution, and it needs one. It is **routed to `0003` as an observation** (both files
  are `0003`'s, in flight, and outside T1–T8's list), with the evidence it must carry before anyone
  calls it a flake or a regression: **10 consecutive full-suite `pnpm test` runs in the same order,
  with the failure count and the seed/order recorded**, plus the same count for the file run alone.
  `0010`'s developer does not run them and does not open either file. If the rate is 0/10, the single
  failure belongs to `0003`'s in-flight edit and is not a flake at all.
- **T5, T6, T4′, T7 and T8 stay blocked** — T5 on A2.3 verdict (a) and on T3's A2.4 reading, T4′ on
  `product-designer`'s A1.2 answer, which is unchanged and still outstanding.
## 3C. Amendment 3 — what LR3.5's sweep may *count* as a scroll position, ruled by `tech-lead` on 2026-09-19

**Trigger.** A2.3 fired stop condition **(b)**: Amendment 2 was applied exactly, V1 and V2 hold on
every surface in every cell, `surfaceTag` is `p` everywhere — and all 17 LR3.5 tests are still green
(`reports/build.md`, isolated copy, port 3421, `36 failed, 2 skipped, 19 passed`). The developer
stopped and measured rather than guessing: on both routes the sweep returns at its **first** sample,
`scrollY = 0`, with `scrollNeededToClear = 0`, because at `scrollY = 0` the surface sits ~2 000 px
**below the fold** and therefore intersects nothing. **This is the third bounce on this mechanism.**
Under `AGENTS.md` §4 the pipeline stops and goes to the human; **the human gave the approval to
continue and delegated the ruling to `tech-lead` for this batch** (see `STATUS.md` decisions log,
2026-09-19). This amendment is made under that delegation, and **it is the last one: a fourth
architectural guess at this guard is not authorised for anybody.**

**This amendment rules only *which scroll positions the sweep may credit*. It does not touch
`legal.md`, `spec.md`, `design.md` or `copy.md`, it changes no product behaviour, and it moves no
legal number.**

### A3.0 — Why this is `tech-lead`'s and not `labor-law-analyst`'s

Because the clause the guard is missing is **already in LR3.5's own text**, word for word. `legal.md`
§8.1 states the predicate as a **conjunction of two clauses**:

> *"there exists a scroll position, reachable in the document as rendered, at which **the surface's
> whole border box lies inside the viewport** and no element whose computed `position` is `fixed` or
> `sticky` has a border box that intersects it."*

The shipped guard implements the **second** conjunct and not the first. There is no reading of
that sentence under which a surface 2 000 px below the fold has its whole border box inside the
viewport. **Restoring a conjunct the rule states is not a change of meaning, and settling it here
does not overrule G2** — it stops the guard from having silently narrowed G2's rule to half of
itself. `legal.md` **Addendum A1** already named **attainability** as an axis of these existential
clauses; this is that axis, on LR3.5 instead of LR4.2.

Proof that this reading is `legal.md`'s own, and not a reconstruction: **A3.2's unit calibration
reproduces `legal.md` §8.1's seven-row worked table from these two conjuncts alone**, six rows to the
digit and one to 0.1 px, including the empty range that made DS1 P4 red. A predicate that regenerates
the gate's own published measurement is the gate's predicate.

**What is *not* ruled here, and is routed if it arises:** whether a clearing range narrower than
1 CSS px is a *reachable* scroll position at all. That is `legal.md` Addendum A1's attainability
axis and it is **`labor-law-analyst`'s**. A3.3 orders it **reported, never asserted** — the guard
passes such a range and the run records it as a routed observation with its width.

### A3.1 — Ruling 1: the sweep is replaced by the closed form, and stops being a sample loop

> **LR3.5's verdict for a surface is the set of scroll positions that satisfy both conjuncts,
> computed in closed form as an interval algebra — never a finite sample of the scroll axis.**

The 60-sample loop has a **second**, independent defect that has not yet fired and would have fired
as a **false red**: at `maxScroll ≈ 2 490` its sample spacing is `2490 / 59 ≈ 42.2 px`, while
`legal.md` §8.1's own worked table gives **DS1 P3 a clearing window 28.6 px wide** (`2461.4 .. 2490`).
A window narrower than the spacing is missed with probability ~1, and the guard would then report a
real, passing surface as an LR3.5 breach — the same class of defect in the opposite direction, and
`plan.md` §5's risk row *"a version of T1 that probes one scroll position at 1440 is wrong even while
green"* is the same rule stated for LR4.2a. **Sampling a continuous parameter is the wrong instrument
for a predicate the rule states as an interval.** The closed form also deletes the loop, the
`LR35_SAMPLE_COUNT` constant and the `sampledCount` field: it is less code, not more.

**The algebra, stated once so the implementation is transcription and not derivation.** With the page
scrolled by `s`, a surface at document offset `docTop` of height `h` occupies viewport rows
`[docTop − s, docTop + h − s]`. Then:

- **Conjunct 1 — whole border box inside the viewport:** `docTop − s ≥ 0` and `docTop + h − s ≤ H`
  ⟹ `s ∈ [docTop + h − H, docTop]`.
- **Attainability — reachable in the document as rendered:** `s ∈ [0, maxScroll]`.
- **Conjunct 2 — no fixed or sticky box intersects it:** a fixed box `F` that overlaps the surface
  horizontally (`!(F.right ≤ left || F.left ≥ right)`) intersects it exactly when
  `s ∈ (docTop − F.bottom, docTop + h − F.top)` — an **open** interval, so its endpoints are
  clearing positions and are kept. A box that does not overlap horizontally constrains nothing.
- **The verdict** is the intersection of the first two, minus the union of the open intervals of the
  third; **LR3.5 passes iff the remaining set is non-empty.** The exemption for the surface's own
  ancestors and descendants (`legal.md` §8.1, bullet 2) is applied when the boxes are collected, by
  node identity, before any arithmetic.

### A3.2 — Ruling 2: the predicate is calibrated against `legal.md`'s worked table, in a unit test, before any browser runs

The constraint the human set is that **the guard is seen red against an unfixed state before it is
trusted green**, and three live runs have now produced a green LR3.5 for three different wrong
reasons. A fourth live run is not the strongest available evidence, and it is not even available
on demand: `0003`'s footer rewrite has already moved every document-height quantity this rule reads.

**The stronger evidence is arithmetic, and it is free.** `legal.md` §8.1 published a seven-row worked
measurement of the intended state — six surfaces with their clearing ranges and **DS1 P4 with an
empty one**. A pure function fed those seven rows must reproduce all seven, *including the red one*,
and must turn the red one green when the containment conjunct is removed. That is the guard **seen
red, for the stated reason, against the published state the rule was written on**, with no browser,
no port and no build — and it is a permanent regression check that every later change to this
predicate has to survive. This is lesson **023**'s rule (calibrate against a worked measurement of
the intended state) applied to a predicate instead of a floor.

**A3.2 is a precondition of A3.3: no e2e run is credited until the calibration is green.**

### T1c — Compute LR3.5's clearing set in closed form, calibrate it against `legal.md`'s worked table, and re-take the baseline against a head with this spec's own remedy removed

- **Files:**
  - `tests/e2e/support/reachability.ts` (**edit**) — add the pure function and its two types.
    **A2.0's "`reachability.ts` is not edited" instruction is lifted for this addition only**, and
    for nothing else: `citationParagraph`, `fixedBoxes`, `intersects`, `answerPanelLines`,
    `EXPECTED_LR35_SURFACE_COUNT` (4 / 4) and every existing export keep their current bodies, to the
    character. The function goes here and not in the spec file because A3.2 has to import it from a
    `vitest` test, and `vitest.config.ts` excludes `**/tests/e2e/**` from **collection** only, never
    from import.
  - `__tests__/lr35-clearing-ranges.test.ts` (**create**) — the calibration.
  - `tests/e2e/first-screen-reachability.spec.ts` (**edit**) — `surfaceClearsFixedChromeAtSomeScroll`
    and the three LR3.5 `test` bodies at `:309`, `:331`, `:359`.
  - **No other file, and no file under `app/`, `components/`, `hooks/` or `lib/`.** T1c is a
    guard-only task, exactly as T1b was.
- **Depends on:** T1b's code, which is **applied and correct and is not reverted** — V1, V2 and the
  block-level climb all stand. T1c replaces only the sweep.
- **Reuse:** `Box` and `FixedBox` from `./support/reachability` (already exported, already imported
  by this spec file) — **no new box type**. `citationParagraph` for V1, unchanged. The in-page leaf
  search and the `display`-based climb from T1b, unchanged.
- **What to build:**

  1. **The pure function, in `tests/e2e/support/reachability.ts`**, appended after `intersects` and
     before `answerPanelLines`. Exactly this, no extra options and no defaults:

     ```ts
     export interface ScrollRange {
       from: number;
       to: number;
     }

     export interface ClearingRangeInput {
       docTop: number;
       height: number;
       left: number;
       right: number;
       viewportHeight: number;
       maxScroll: number;
       fixed: readonly Box[];
     }

     const round1 = (value: number) => Math.round(value * 10) / 10;

     export function clearingScrollRanges(input: ClearingRangeInput): ScrollRange[] {
       const { docTop, height, left, right, viewportHeight, maxScroll, fixed } = input;
       const from = Math.max(0, docTop + height - viewportHeight);
       const to = Math.min(maxScroll, docTop);
       if (to < from) return [];

       let ranges: ScrollRange[] = [{ from, to }];
       for (const box of fixed) {
         if (box.right <= left || box.left >= right) continue;
         const blockedFrom = docTop - box.bottom;
         const blockedTo = docTop + height - box.top;
         ranges = ranges.flatMap((range) => {
           if (blockedTo <= range.from || blockedFrom >= range.to) return [range];
           const kept: ScrollRange[] = [];
           if (range.from < blockedFrom) kept.push({ from: range.from, to: Math.min(range.to, blockedFrom) });
           if (range.to > blockedTo) kept.push({ from: Math.max(range.from, blockedTo), to: range.to });
           return kept;
         });
       }
       return ranges.map((range) => ({ from: round1(range.from), to: round1(range.to) }));
     }
     ```

     Four points that are decisions, not style, and none of them is the developer's to revisit:
     **`viewportHeight` is a parameter and never `innerHeight`** — A3.2's control case passes
     `Number.POSITIVE_INFINITY` through it to disable the containment conjunct; **the blocked
     interval is open**, so `<` / `>` at the split and endpoints are kept; **a zero-width range
     (`from === to`) is a pass**, because narrowing that is `labor-law-analyst`'s call and A3.3
     reports it instead (see A3.0); **rounding happens once, on output**, to the 0.1 px `legal.md`
     §14 fixes as this rule set's precision.

  2. **The calibration, `__tests__/lr35-clearing-ranges.test.ts`.** The fixture is `legal.md` §8.1's
     own cell — `/` seeded, consent answered, 390×844 — whose fixed chrome is the header at
     `0 .. 65` and the route nav at `766 .. 828`, both full width, with `maxScroll = 2490` and a
     surface column of `left 16, right 374`:

     ```ts
     const VIEWPORT_HEIGHT = 844;
     const MAX_SCROLL = 2490;
     const SURFACE = { left: 16, right: 374 };
     const CHROME = [
       { top: 0, bottom: 65, left: 0, right: 390, width: 390, height: 65 },
       { top: 766, bottom: 828, left: 0, right: 390, width: 390, height: 62 },
     ];
     ```

     Seven cases, one per row of `legal.md` §8.1's worked table, named for the surface, each
     asserting the **number of ranges** and then each endpoint to within **0.15 px** (`legal.md`'s
     published values were derived from unrounded inputs; DS2 is the one row that lands 0.1 away):

     | case | `docTop` | `height` | expected |
     |---|---|---|---|
     | `DS2` | 2402.8 | 52.2 | one range, `1688.9 .. 2337.8` |
     | `DS7 art. 59` | 2521.9 | 126.0 | one range, `1881.9 .. 2456.9` |
     | `DS7 art. 71` | 2705.9 | 42.0 | one range, `1981.9 .. 2490` |
     | `DS1 P1` | 2967.9 | 52.2 | one range, `2254.1 .. 2490` |
     | `DS1 P2` | 3028.1 | 52.2 | one range, `2314.3 .. 2490` |
     | `DS1 P3` | 3088.3 | 139.1 | one range, `2461.4 .. 2490` |
     | **`DS1 P4`** | **3235.4** | **34.8** | **zero ranges — the empty set `legal.md` prints as `2504.2 .. 2490 — empty`** |

     Plus **three control cases**, which are the falsifiability of the whole amendment and are not
     optional:

     - **`C1 — the containment conjunct is what makes DS1 P4 red`:** the same DS1 P4 inputs with
       `viewportHeight: Number.POSITIVE_INFINITY` return a **non-empty** set beginning at `0`. This
       is the shipped guard's behaviour and the reason all 17 tests were green; it must be
       reproducible on demand, so that nobody can restore it by accident without a red test.
     - **`C2 — the fixed-chrome conjunct is what bounds the range`:** DS1 P3's inputs with
       `fixed: []` return the full containment interval `2383.4 .. 2490`, wider than the 2 461.4
       bound the nav imposes. A guard that collects no fixed boxes is a vacuous guard
       (`legal.md` §11, lesson **043**), and this is the arithmetic proof that the operand matters.
     - **`C3 — horizontal disjointness is respected`:** DS1 P3's inputs with a single fixed box at
       `left 380, right 390` (to the right of the surface column) return the same set as `fixed: []`.
     - **`C4 — the sample loop would have missed DS1 P3`:** assert the width of DS1 P3's range is
       `28.6 ± 0.15` and that `28.6 < 2490 / 59`. One line, and it is the standing record of why
       this predicate is not allowed to go back to being sampled.

     `pnpm test __tests__/lr35-clearing-ranges.test.ts`. This file is under `__tests__/` and imports
     from `tests/e2e/support/`, which `vitest.config.ts` excludes from **collection**, not from
     import; the new source lives under `tests/`, which `coverage.include` does not list, so **no
     coverage threshold moves and none is lowered**.

  3. **The e2e guard, in `tests/e2e/first-screen-reachability.spec.ts`.** Rename
     `surfaceClearsFixedChromeAtSomeScroll` to **`lr35Surface`** — the old name asserts the answer
     the old body assumed — and split it in two: an in-page `evaluate` that only **measures**, and a
     Node-side body that only **computes**, through `clearingScrollRanges`. Delete
     `LR35_SAMPLE_COUNT` and the `sampledCount` field; nothing else imports them.

     ```ts
     async function lr35Surface(
       page: Page,
       marker: string,
       expectedSurface: ElementHandle<Element> | null = null,
     ): Promise<{
       found: boolean;
       ranges: ScrollRange[];
       containmentOnly: ScrollRange[];
       chromeExcludedSomething: boolean;
       widestRange: number;
       matchesExpectedSurface: boolean;
       surfaceTag: string;
       surfaceDisplay: string;
       surfaceHeight: number;
       leafTag: string;
       leafHeight: number;
       docTop: number;
       height: number;
       left: number;
       right: number;
       viewportHeight: number;
       maxScroll: number;
       fixed: FixedBox[];
       stickyCount: number;
       lowFixedCount: number;
     }> {
       const geometry = await page.evaluate(
         ({ markerText, expected }) => {
           const all = [...document.querySelectorAll("body *")];
           const leaf = all.find(
             (element) =>
               (element.textContent ?? "").includes(markerText) &&
               ![...element.children].some((child) => (child.textContent ?? "").includes(markerText)),
           );
           if (!leaf) throw new Error(`surface not rendered: ${markerText}`);

           const isInlineLevel = (element: Element) => {
             const display = getComputedStyle(element).display;
             return display === "contents" || display.startsWith("inline");
           };
           let surface: Element = leaf;
           while (isInlineLevel(surface) && surface.parentElement) surface = surface.parentElement;

           const round = (value: number) => Math.round(value * 10) / 10;
           const rect = surface.getBoundingClientRect();

           const fixed = all
             .filter((element) => {
               const style = getComputedStyle(element);
               return (
                 (style.position === "fixed" || style.position === "sticky") &&
                 element.getBoundingClientRect().height > 0 &&
                 !element.contains(surface) &&
                 !surface.contains(element)
               );
             })
             .map((element) => {
               const box = element.getBoundingClientRect();
               return {
                 tag: element.tagName.toLowerCase(),
                 position: getComputedStyle(element).position,
                 label: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 30),
                 top: round(box.top),
                 bottom: round(box.bottom),
                 left: round(box.left),
                 right: round(box.right),
                 width: round(box.width),
                 height: round(box.height),
               };
             });

           return {
             matchesExpectedSurface: expected === null || surface === expected,
             surfaceTag: surface.tagName.toLowerCase(),
             surfaceDisplay: getComputedStyle(surface).display,
             surfaceHeight: round(rect.height),
             leafTag: leaf.tagName.toLowerCase(),
             leafHeight: round(leaf.getBoundingClientRect().height),
             docTop: round(rect.top + scrollY),
             height: round(rect.height),
             left: round(rect.left),
             right: round(rect.right),
             viewportHeight: innerHeight,
             maxScroll: round(document.documentElement.scrollHeight - innerHeight),
             fixed,
           };
         },
         { markerText: marker, expected: expectedSurface },
       );

       const ranges = clearingScrollRanges({ ...geometry, fixed: geometry.fixed });
       const containmentOnly = clearingScrollRanges({ ...geometry, fixed: [] });
       return {
         ...geometry,
         ranges,
         containmentOnly,
         found: ranges.length > 0,
         chromeExcludedSomething: JSON.stringify(ranges) !== JSON.stringify(containmentOnly),
         widestRange: ranges.reduce((widest, range) => Math.max(widest, range.to - range.from), 0),
         stickyCount: geometry.fixed.filter((box) => box.position === "sticky").length,
         lowFixedCount: geometry.fixed.filter((box) => box.top >= geometry.viewportHeight / 2).length,
       };
     }
     ```

     **Why the fixed boxes are collected here and not through the existing `fixedBoxes(page)`**
     (this is the one place T1c does not reuse, and the reason is not preference): LR3.5's second
     bullet exempts *the surface's own ancestors and descendants*, which needs **node identity**
     against the resolved surface, and `fixedBoxes` returns plain boxes with the node already gone.
     Same filter, same shape, one extra predicate — it is the collection that is already in this
     function today, kept, not a new copy of an existing helper.

     Import `clearingScrollRanges`, `type ScrollRange` and `type FixedBox` from
     `./support/reachability` alongside the existing imports at `:4-21`, then
     `pnpm exec biome check --write` on the two edited files only.

  4. **The verdicts in the three LR3.5 `test` bodies, in this order, never `&&`-ed, each with its own
     message.** V1 and V2 are T1b's and their text is unchanged. V2c, V2d and V2e are new and are all
     **guard defects**, not product findings — every one of them keeps the literal `guard defect:`
     prefix, which is what tells the next reader the failure is `tech-lead`'s:

     ```ts
     const result = await lr35Surface(page, marker, expectedSurface);
     // V1, V2 — exactly as T1b wrote them, unchanged.
     expect(
       result.stickyCount,
       `guard defect: ${result.stickyCount} sticky element(s) in the fixed set at ${route}; a sticky box's viewport rect is only valid at the scroll it was read at, and this predicate assumes viewport-anchored boxes`,
     ).toBe(0);
     expect(
       result.lowFixedCount,
       `guard defect: no fixed element in the bottom half of the viewport at ${route} ${state} ${theme}; LR3.5 is vacuous in a cell with no bottom chrome (fixed set: ${JSON.stringify(result.fixed)})`,
     ).toBeGreaterThan(0);
     expect(
       result.chromeExcludedSomething || result.ranges.length === 0,
       `guard defect: fixed chrome excluded no scroll position for ${surfaceName} at ${route} ${state} ${theme}; the clearing set equals the bare containment interval ${JSON.stringify(result.containmentOnly)}`,
     ).toBe(true);
     // V3 — LR3.5 itself, and the only one of these that is a finding about the product.
     expect(
       result.found,
       `${surfaceName} at ${route} ${state} ${theme} has no scroll position where its whole border box is in the viewport and clear of fixed chrome (docTop ${result.docTop}, h ${result.surfaceHeight}, viewport ${result.viewportHeight}, maxScroll ${result.maxScroll}, containment ${JSON.stringify(result.containmentOnly)}, after chrome ${JSON.stringify(result.ranges)})`,
     ).toBe(true);
     ```

     **V2e is deliberately `chromeExcludedSomething || ranges.length === 0`** and not
     `chromeExcludedSomething` alone: a surface whose containment interval is already empty (it is
     taller than the viewport, or it cannot be brought fully into view at any attainable scroll) is a
     **real LR3.5 failure** and must be reported by V3 as such, never re-labelled a guard defect.
     That is A2.2's rule — a guard defect and a product finding are different owners — applied to the
     branch this amendment adds.

     In the full-journey test, keep its own existing message text and append the same three
     bracketed quantities. **Nothing else changes:** not `EXPECTED_LR35_SURFACE_COUNT`, not the
     markers, not `citationParagraph`, not AC1, not AC13, not LR4.2a.

- **Tests:** `pnpm test __tests__/lr35-clearing-ranges.test.ts` — all eleven cases green, **and
  the developer pastes the `DS1 P4` and `C1` results into `reports/build.md` side by side**, because
  that pair *is* the "seen red" evidence for this guard (A3.2). Then the A3.3 run.
- **Done when:** `pnpm check` green except the pre-existing failures A1.5 names, each recorded
  verbatim with its owner; the calibration green and its red/green pair pasted; the A3.3 protocol
  executed and its verdict recorded. Advances **AC6**.

### A3.3 — Ruling 3: the baseline is re-taken against a head with **this spec's own remedy removed**, from one snapshot

**A second defect in the A2.3 run, which no stop condition caught and which this ruling does catch:
the baseline was taken on a tree that already contains T3.** T3 *is* M-B — the bottom reserve that
exists to fix F1 — and T2 and T3 are both delivered. A red baseline whose purpose is to see the guard
fail on the unfixed head cannot be taken on a head where the fix has landed; if the guard had been
correct, that run could have been legitimately green and would still have been read as a defect.
`plan.md` A1.4 ordered the re-take *"on the current head"* at a moment when no source file had been
edited yet, and that phrase silently stopped being the unfixed head when T3 landed. **Both defects
are now on the record: the guard measured the wrong predicate, and the run measured the wrong tree.**

**And the two runs must come from one snapshot.** `0003`'s developer is active in this tree: the
T1a probe read `maxScroll 2491` and the T1b probe read `2347` on the same route, a 144 px move that
belongs to neither this spec's edits nor this spec's guard. Two runs taken from two rsyncs are two
different documents.

**Protocol. It is not weakened at any step, and no step is a judgement call:**

- **B1.** One `rsync -a --exclude node_modules --exclude .next` of the worktree into **`copyA`**,
  then `rsync -a --exclude node_modules --exclude .next copyA/ copyB/`. **`copyB` is copied from
  `copyA`, never from the worktree** — that is what makes the two runs one snapshot. `cp -al
  node_modules` into each.
- **B2.** In **`copyA` only**, revert **this spec's two geometric hunks** in
  `components/organisms/calculator-views.tsx`, and nothing else:
  - `pt-[calc(var(--header-height)+var(--spacing)*4)] sm:pt-[calc(var(--header-height)+var(--spacing)*8)]`
    → `pt-[calc(var(--header-height)+var(--spacing)*8)]` (T3's D1 top step);
  - `mx-auto mt-12 mb-8 max-w-3xl` → `mx-auto mt-12 max-w-3xl` (T3's M-B bottom reserve).

  Paste `git -C copyA diff --stat` — or a `diff -u` against `copyB`'s copy of that one file if the
  copy carries no git metadata — into `reports/build.md`, to prove exactly two class strings moved.
  **`0003`'s footer rewrite in the same file is NOT reverted**: it is the tree this spec's baseline
  is defined against (A1.4), it is not this spec's, and reverting the whole file would silently
  re-measure `0003`'s work. **`components/organisms/cookie-consent.tsx` is NOT reverted either**:
  T2 changes one `useState` boolean and moves no box, and reverting it would change which cell is
  being measured rather than which remedy.
- **B3.** Two ports confirmed free with `ss -ltnp`, `uptime` recorded, production build only via
  `playwright.config.ts`'s own `webServer`, **never `next dev`**, **runs serial — never two browser
  measurements at once, and not while another agent's is running**. Same command on both copies:
  `PORT=<free> pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts --project=chromium --reporter=line`.
- **B4.** **EXTENDED by §3D Amendment 4 (A4.3): add `scrollHeight` as its own field, the identity
  `maxScroll == scrollHeight − viewportHeight`, the tail below the surface and its blocks, the full
  application state per cell, and the named reconciliation cell.** Paste, per route and per surface,
  for **both** copies: `surfaceTag`, `surfaceHeight`,
  `leafTag`, `leafHeight`, `docTop`, `viewportHeight`, `maxScroll`, `containmentOnly`, `ranges`, and
  the full `fixed` list for one cell per route (so the chrome's own geometry is on the record and not
  assumed). `copyA` is labelled ***"unfixed head — `0003` T2 in, this spec's T3 out"***; `copyB` is
  labelled ***"as delivered — this spec's baseline, the one T8 diffs against"***.
- **B5.** Any surface whose widest range is **< 1 CSS px** is recorded as a **routed observation**
  with its width and the surface name — *passes V3, attainability queried* — and routed to
  `labor-law-analyst` (A3.0). It is **not** asserted on and it does not block.

**Four verdicts, four destinations, and they are not fused.** *"This guard measures the rule"* and
*"the product satisfies the rule"* are different findings, and so are *"T3 fixed it"* and *"there was
nothing to fix":

- **(a) The guard discriminates and T3 is the fix.** `copyA` red on DS1 P4 in **16/16** sweep cells
  plus the full-journey test, `copyB` green on DS1 P4, no `guard defect:` failure in either, and the
  other six surfaces identical between the two copies. → **T1a, T1b, T1c are done**, F1 is reproduced
  and remedied, T3's A2.4 verification is **read off `copyB` and passes**, and the pipeline moves to
  **T5**.
- **(b) The guard discriminates and T3 is not enough.** `copyA` red **and** `copyB` red on DS1 P4.
  → The guard is trusted; the remedy is undersized. **Stop, edit no source file, report to
  `tech-lead`** with `docTop`, `surfaceHeight`, `viewportHeight`, `maxScroll` and `containmentOnly`
  for that cell — the shortfall is `min(ranges needed) − maxScroll` and it sizes the reserve. This is
  a **task amendment**, not a new bounce: `legal.md` A1.7 still binds M-B before M-O, so T5 stays
  blocked until it lands.
- **(c) The guard discriminates and F1 no longer reproduces.** `copyA` **green** on DS1 P4 with the
  A3.2 calibration green and no `guard defect:` failure. Then the premise of **F1** — *"DS1 P4 can
  never come to rest clear of the fixed route nav, 4/4 cells"* — has been **discharged by `0003`'s
  footer rewrite**, not by this spec, and the numbers will say so: `legal.md` §8.1 measured only
  **63.8 px** of document below DS1 P4's bottom, while the A2.3 probe measures **~196 px**.
  **That is a legal re-measurement and it is not `tech-lead`'s and not `frontend-dev`'s.** Stop,
  edit no source file, and route it — **to `labor-law-analyst`, on F1 and on L5**, with `copyA`'s and
  `copyB`'s full B4 tables, the A3.2 calibration output, and one question: *does LR3.5 still have a
  failing subject on this head, and does L5's premise (a whole 34.8 px surface exists) survive a
  121.7 px one?* — **copied to `product-designer`, because A1.2's Q-A…Q-D re-measurement of M-R is
  answered on the same geometry**. `tech-lead` records the route; **nobody edits `legal.md`, and
  `tech-lead` does not rule on whether F1 is discharged.**
- **(d) The calibration fails.** Any of the eleven A3.2 cases red. → The predicate is mis-transcribed;
  **fix it inside T1c and do not run a browser at all** until it is green. A live run against an
  uncalibrated predicate is the exact move that produced this bounce three times.

> **STRUCK by §3D Amendment 4 (A4.3), 2026-09-19.** The paragraph below was written on the T1b
> probe's `maxScroll` **2347** alone, before `design.md` §17 existed. §17.17 reads **2215** for the
> same `docTop` and the same `h`, and on that reading the same arithmetic gives `copyA` an **empty**
> clearing set — verdict **(a)**, not (c). **Neither branch is expected; A4.3 carries both
> computations side by side and the run decides.** The paragraph is kept, struck, because it is the
> reasoning A4.3 corrects.

~~**Verdict (c) is the expected one on the arithmetic available today, and it is written first-class
for that reason**~~ — the T1b probe's `docTop 2841.4`, `h 121.7`, `maxScroll 2347` on `/` give a
containment interval of `[2119.1, 2347]` before chrome, and the route nav at `766 .. 828` excludes
only up to `2841.4 + 121.7 − 766 = 2197.1`, leaving `[2197.1, 2347]` non-empty **even with T3
reverted**. **That projection is not a finding and no one may report it as one**: it is arithmetic on
two probe numbers taken in a different cell of a moving tree, it is exactly the kind of number
lesson **050** forbids handing forward, and it exists here only so that (c) is not mistaken for
another guard defect when it happens. **Measure it.**

### A3.4 — The ceiling, and what happens if this does not settle it

This is the **third** bounce on G5's LR3.5 mechanism and the human's approval covers **this ruling
and its run**. If the A3.3 run produces anything outside (a)–(d) — a fifth mechanism, a new
`guard defect:` class, a disagreement between the calibration and the live run — **the pipeline
stops at `tech-lead` and goes back to the human with the impasse, the options and a recommendation.
No agent gets a fourth architectural guess at this guard.**

### A3.5 — The two smaller items, routed

- **`__tests__/zzz-debug.test.tsx` — untracked, failing lint, not this spec's.** It is not in T1–T8's
  file list, `0010`'s developer does not open it and **does not delete it**: it is untracked and a
  sibling developer is active in this tree right now, which is precisely the state lesson **060**
  says never to read as dead code from `grep`. **Routed to `0003`** as its owner-by-proximity, with
  the question *is this scratch, and may it be deleted?* — recorded in `STATUS.md`, carried in
  `reports/build.md`'s lint accounting with its owner, exactly as `0008`'s
  `column-stability.spec.ts` finding is (A1.5). It does not block T1c.
- **T2 and T3 stand as delivered** and are not reverted in the worktree — B2's revert happens in
  `copyA` only and is thrown away with it. **T5, T6, T4′, T7 and T8 stay blocked**, T5 on verdict
  (a) or on (b)'s amended T3, T4′ on `product-designer`'s A1.2 answer, which is unchanged and still
  outstanding.

## 3D. Amendment 4 — T4′ is written, T6 becomes a geometric precondition, and §17.17's 132 px is ruled, by `tech-lead` on 2026-09-19

**Trigger.** `product-designer` delivered the scoped G3 re-run A1.2 routed — `design.md` **§17**,
run 2, M-R only — and answered Q-A…Q-D. This amendment does three things and nothing else:

1. it writes **T4′** from §17.15, on the design gate's ruling that **M-R relocates `DS1 P2`** and
   that **`F-1` (DS1 P4) stays in the footer whole**;
2. it makes **T6 a geometric precondition of T4′** and states T4′'s guard as **a comparison**;
3. it rules the one number §17.17 handed over **without** a verdict — `maxScroll` **2215** against
   A3.2's projected **2347** — because **A3.3's branch (c) turns on exactly that quantity**.

**Nothing here re-opens `legal.md`, `spec.md`, `copy.md` or `design.md`.** §17 is binding as written,
including its two negative rulings: **L5 does not fire** (`legal.md` §6 authorises relocating *one of*
four named whole surfaces in advance and leaves the placement to G3; L5's subject is a split or a
shortened string, and this design produces neither), and **`F-1` cannot be put on the first screen at
390** (the budget below the answer is 58.6 px and `F-1` is 121.7 — §17.2). `tech-lead` does not rule
on either; it records them and routes anything that wants them re-opened.

### A4.0 — What T4′ is bound by, restated so the task does not have to be read against §17

| # | Binding | Source |
|---|---|---|
| B1 | The relocated surface is **`DS1 P2`**, the estimate disclaimer, **170 characters**, moved **whole and unedited** from the footer to the `aside` cell, on both routes, at every width | `design.md` §17.3 |
| B2 | **`DS1 P4` (`0003`'s `F-1`), `DS1 P1` and `DS1 P3` stay in the footer, whole.** `citationParagraph` keeps pointing at the footer's `F-1` and is not re-pointed | §17.3, §17.12 |
| B3 | **One rendered instance per page.** No string is written, shortened, reworded, split or added. **AC5's exemption list stays EMPTY** | §17.3, §17.11 |
| B4 | The surface is an **atom** at `components/atoms/estimate-notice.tsx`. **`components/molecules/table-citation.tsx` is not created**, and no task restores `LegalYear.source` / `.sourceUrl` / `.effectiveFrom` | §17.7, §17.15 item 2 |
| B5 | **`DS1_EXPECTED_PARAGRAPHS` 4 → 3**, and the three survivors are **P1, P3, P4** — not P1, P2, P3 as A1.2's Q-D assumed | §17.5, §17.15 item 3 |
| B6 | **AC13's expected counts are unchanged** — 9 on `/`, 10 on `/custo-da-hora`, split `8 + 1` and `9 + 1`. `EXPECTED_LINES_ON_FIRST_SCREEN` in the tree **already carries the post-move value** and T4′ does not touch it | §17.4, §16 item 2 |
| B7 | **Amendment 2 is unchanged.** T1b's resolution rule, V1/V2/V3 and `EXPECTED_LR35_SURFACE_COUNT` (4 on both routes) are correct for the footer `F-1` **and** for the relocated `<p>`, which has no element children, so the climb is a no-op | §17.5, §17.15 item 8 |
| B8 | **T4′ runs after T6.** Without M-D the hero card ends at 723.4, the budget is 34.6 px and a 52.2 px surface fails by 17.6 | §17.11 |

### A4.1 — Ruling 1: the relocated surface is an **atom**, and `table-citation.tsx` leaves this spec

**`components/molecules/table-citation.tsx` is struck from every list in this plan.** It is not
created, not imported and not tested. T4 stays **SUPERSEDED** and is replaced in full by **T4′**;
nothing survives from it but the reasoning, which §17 has now re-measured.

**Atom, and the reason is a property of the element, not a preference.** `EstimateNotice` is a single
`<p>` with a frozen text node: no child element, no data from `lib/`, no link, no props, nothing
focusable. `components/atoms/alert-banner.tsx` is the existing precedent for a text-bearing atom.
Run 1's molecule was justified by composition — text **plus** a `CURRENT_LEGAL_YEAR` link — and that
justification left with the surface (§17.7).

**A component at all, rather than two inline copies**, because two call sites need byte-identical
markup around a string AC4 and AC5 assert is unchanged, and a later edit to one of two copies
manufactures the contradiction `AGENTS.md` §5 warns about (lesson **030**).

**`cn()` is mandated by `design.md` §17.8 and its subject does not exist today — kept anyway, and
recorded rather than silently dropped.** The Type-Step-Is-Not-a-Colour Rule protects a component
whose *caller* can pass a size class that deletes its colour class; `EstimateNotice` takes **no
props**, so no caller can. §17.8 is binding and the cost is one import, so the class string is
composed through `cn()` as written. **The developer does not add a `className` prop to give the call
a subject** — that would be scaffolding for a caller this spec forbids.

**Files this plan adds to `spec.md` § Scope, each path in full (AC11), replacing §1.4's list:**
`components/organisms/work-calculator.tsx`,
`components/organisms/hero-panel.tsx`,
`components/atoms/estimate-notice.tsx`.
`components/organisms/hero-panel.tsx` stays on the list for **S1 / D2–D4**, which are M-D's and
unchanged. **`components/molecules/table-citation.tsx` is removed from the list.**

**The locator is an `id`, not a sentence and not an nth-child path.** §17.15 item 4 requires AC1's R
surface to be located by position and **never** by a pt-BR sentence. A positional selector
(`div > div:nth-child(2) > p`) satisfies the letter and breaks on any wrapper anyone adds; an `id` is
a stable handle, is neither a string the copy gate owns nor a role/label the a11y table rules on
(§17.13 forbids a `role` and an `aria-label`, and says nothing about an `id`), and the tree already
uses exactly this idiom — `annual-period-disclosure`, `regime-federal-rpps-gap`, `salary-fields`.
**`id="estimate-notice"`**, and the **positional** claim is asserted separately, as its own clause, so
both are checked: the notice's previous element sibling is the hero card.

### A4.2 — Ruling 2: **T6 is a geometric precondition of T4′**, and the guard is the comparison

**The order `T3 → T5 → T6 → T4′` is binding in two independent directions.** A1.3 established
`legal.md` A1.7's M-B-before-M-O. §17.11 adds the second: **M-D (T6) buys the 24 px the relocated
surface needs.** Without T6 the hero card bottom is **723.4**, the budget is `766 − 723.4 − 8` =
**34.6**, and the surface is **52.2** — it fails by **17.6 px**. T4′'s `Depends on` is **T6**, and
that dependency is geometric, not a file serialisation.

**The guard asserts the comparison and never the measured delta.** §17.14's third row and §17.11's
budget box both say it, and this spec has already produced three guards that passed for the wrong
reason:

> `heroCardBottom + gap + noticeHeight ≤ navTop`, every term read in the browser in the same frame.

- **`gap` is read, not written.** It is the notice's computed `margin-top`, which is what `mt-2`
  resolves `--spacing*2` to. A guard that writes `8` asserts a token value it did not read.
- **The literals `6.4`, `52.2`, `58.6`, `699.4`, `723.4` and `766` appear in no assertion**, in no
  expected value and in no threshold. They appear only in this task's prose and in the numbers the
  developer **pastes**, as the values the run is expected to reproduce. A guard that hard-codes the
  measured slack passes when the geometry changes underneath it, which is the defect this spec has
  paid for three times.
- **It is a conjunction and it is written as two assertions** (lesson **016**): the budget
  comparison **and** the adjacency claim `heroCardBottom + gap == noticeTop` to within 0.5 px.
  Without the second, a notice that has drifted away from the hero card — into a different cell, past
  another sibling — still satisfies the first, and the first is then measuring a relationship that no
  longer exists.
- **The failure message prints all four terms and the slack**, so the reader sees which operand spent
  the budget rather than that the budget was spent.

**T6's `Done when` is amended, because the A1.3 reorder put it in front of the task that completes
AC13's count.** `EXPECTED_LINES_ON_FIRST_SCREEN` already carries the **post-move** numbers (`/`:
8 sighted + 1 assistive = 9; `/custo-da-hora`: 9 + 1 = 10, `design.md` §5.1). The relocated `<p>` is
the leaf that makes those counts true. So **between T6 and T4′, AC13 is red on the line count and
green on `linesOccluded`**, and T6's original *"`pnpm exec playwright test tests/e2e` fully green"*
is unsatisfiable through no fault of T6. The amended clause is in T6 below. **This is an expected
intermediate red with a named signature; a run where AC13's count goes green at T6 means the count
was satisfied by something other than the relocation and is a finding for `tech-lead`, not a pass.**

### A4.3 — Ruling 3: §17.17's `maxScroll` **2215** against A3.2's **2347** — it decides A3.3's branch, and it is not attributed yet

`design.md` §17.17 handed this over correctly: it read the **same** `docTop` **2841.4** and the
**same** `h` **121.7** on `/` at 390 with T3 in, and a **different** `maxScroll` — **2215**, against
the **2347** the T1b probe printed (`reports/build.md`, the A2.3 diagnostics table) and which A3.3's
closing paragraph computes on. The design gate declined to attribute the 132 px or derive a verdict
from it, which is right (lesson **050**), and it flagged that branch **(c)** turns on it.

**It does, and the A3.3 run that has since been taken proves it rather than projects it.**
`reports/build.md`'s B4 table reads, on `/` at 390×844, empty storage, dark, consent pending:

| Copy | `docTop` | `h` | `viewportHeight` | `maxScroll` | containment | ranges | verdict |
|---|---|---|---|---|---|---|---|
| **A — T3 out** | 2857.4 | 121.7 | **844** | **2331** | `[2135.1, 2331]` | `[2213.1, 2331]` | green |
| **B — as delivered** | 2841.4 | 121.7 | **844** | **2347** | `[2119.1, 2347]` | `[2197.1, 2347]` | green |

`copyA`'s `docTop` is `copyB`'s **+16**, exactly the D1 top step B2 reverts, and `maxScroll` is
**−16**, exactly `+16 − 32`. **The two copies are internally consistent and the run is clean**: zero
`guard defect:` failures, `docTop`/`h` identical to the tenth between copies, every surface
`found: true`. `frontend-dev` refused to certify it as **(c)** on the open 132 px, and that refusal
was right — here is why, in one line of arithmetic:

> **`copyA` is green at `maxScroll` 2331 and empty at 2199.** Its clearing set needs
> `s ≥ docTop + h − navTop` = `2857.4 + 121.7 − 766` = **2213.1**. Take the 132 px off the reading
> the same way it comes off `copyB`'s (2347 → 2215) and `copyA`'s cap is **2199 < 2213.1** → the set
> is **empty** → DS1 P4 red on the unfixed head → **verdict (a)**, which is the opposite of the
> branch the run has the shape of.

**So the run's verdict turns on the 132 px and nothing else.** Both readings leave `copyB` green —
`[2197.1, 2215]` at 2215, `[2197.1, 2347]` at 2347, which is why `labor-law-analyst`'s Addendum B
could rule **F1 discharged** robustly on either, and that ruling is untouched here. **What is not
robust is the attribution**: (a) says T3 is the fix and the pipeline moves to T5; (c) says `0003`'s
footer rewrite had already discharged it and the finding goes back to `labor-law-analyst`. Different
owners, different remedies, one unattributed number between them.

**A3.3's closing paragraph is amended.** The sentence *"Verdict (c) is the expected one on the
arithmetic available today"* is **struck** — it was written on the 2347 reading alone, before §17
existed, and a pre-declared expectation at a blocker is the path of least argument. **Neither branch
is expected. The measurement below decides, and until it is taken the run is credited as neither.**

**What attributes the 132 px — and one hypothesis is already dead.** `maxScroll` is not a
measurement, it is `document.documentElement.scrollHeight − innerHeight`: **two independent
quantities fused into one number**, which is why B4 could print it in ten rows and leave the
discrepancy unattributable. `docTop` and `h` agree to the decimal between §17 and the run, so
everything above the surface is identical and the delta lives entirely in that difference.

- **H1 — the viewport differed. REFUTED, by the run's own table.** `viewportHeight` reads **844** in
  10 of 10 rows, the same height §17.0 measured at. The arithmetic that made H1 attractive
  (`3059 − 844 = 2215`, `3059 − 712 = 2347`, exact) is a coincidence, and it is recorded as refuted
  so nobody re-derives it.
- **H2 — the document tail differs, and one candidate accounts for the delta exactly.**
  `scrollHeight` differs by 132, so 132 px of content or reserve sits *below* DS1 P4's bottom in one
  state and not the other. The tail is enumerable, and **`components/organisms/ad-manager.tsx` is the
  only member of it whose contribution is all-or-nothing**: it renders in `app/layout.tsx` **after**
  `{children}`, so it is below the footer and cannot move `docTop` — which is exactly the shape of a
  delta that leaves `docTop` and `h` identical to the decimal. Its box is
  `div.max-w-3xl.px-4.pb-8` wrapping `ins.adsbygoogle.min-h-25`:
  **`pb-8` (32) + `min-h-25` (100) = 132 px**, and `if (!adClient || !enableAds) return null` makes it
  **0** when either env var is unset. `NEXT_PUBLIC_ENABLE_ADS` and `NEXT_PUBLIC_ADSENSE_ID` are read
  at **build time**, and the two readings came from two different builds. **That is arithmetic on a
  class string and an env guard — it is not a finding and no one may report it as one**
  (lesson **050**); it is written down because it is the first thing to look at and because a
  build-time env difference is exactly what an isolated worktree does *not* isolate.
- **H3 — the two instruments read at different settle points.** The B4 probe reads *"immediately
  after `page.goto({ waitUntil: 'load' })`, with no settle"*, and the privacy shield appears in its
  `fixed` list, which `frontend-dev` reads as proof it ran before `BANNER_DELAY_MS` (1500 ms) fired.
  §17's instrument read a settled page. The `<ins>` is also the one element here whose height is
  decided *after* load, by AdSense, so H2 and H3 are two ways the same box can differ and the same
  probe separates them: H2 shows it absent in one build, H3 shows it present in both and a different
  height at the two times.

**The measurement, and it is one probe, not a re-run.** T1c takes this before any verdict is
credited, in **`copyA` and `copyB` both**, on **`/` at 390×844, storage `empty`, consent pending,
dark** — the cell `design.md` §17.17 names for its own numbers, so the two are comparable by
construction:

1. **Read `scrollHeight` twice in the same page load**: once at `load`, the probe's current timing,
   and once **settled** — after `BANNER_DELAY_MS` has fired (the privacy shield is gone from the
   `fixed` list) and `waitForStableBoundingBox` reports stable. Print `scrollHeight`,
   `viewportHeight` and `maxScroll` **as three separate fields** at each of the two times, with the
   identity `maxScroll == scrollHeight − viewportHeight` printed so a later reader can re-derive it.
2. **Print the tail at both times** — `tailBelowSurface = scrollHeight − (docTop + surfaceHeight)` —
   and the box of every block in it: the footer's computed `margin-bottom`, `#main-content`'s
   computed `padding-bottom`, the consent surface's computed `position` and border-box height, and
   **`ad-manager.tsx`'s wrapper `div` and its `ins.adsbygoogle` — presence, `display` and border-box
   height, plus `NEXT_PUBLIC_ENABLE_ADS` and `NEXT_PUBLIC_ADSENSE_ID` as the build that served the
   page saw them**. **The block that differs between the two reads, or between the two builds, is the
   attribution**; name it in one line.
3. **Recompute both copies' DS1 P4 windows from the settled numbers**, with `clearingScrollRanges`
   unmodified, and report the verdict off those. `copyA` settled is the whole question: **non-empty
   → (c); empty → (a).**
4. **Do not subtract 132 from anything.** `copyA`'s settled `maxScroll` is measured, never derived
   from `copyB`'s delta — the 2199 above is this gate's arithmetic and it is not a finding
   (lesson **050**).
5. **Print the application state beside every number** — route, viewport, theme, storage seed,
   consent state, settle point (`AGENTS.md` §5).

**If the settled read reproduces §17.17's `maxScroll` 2215 on `copyB`**, the discrepancy is
attributed to the settle point, `copyA`'s settled window decides the branch, and the pipeline moves
on that verdict. **If it reads a third value**, that is a fifth mechanism on this guard: **stop, edit
no source file, and hand the impasse to the human — `A3.4`.** No agent gets a fourth architectural
guess.

**What is settled and must not be re-litigated by this probe:** `legal.md` Addendum B's ruling that
**F1 is discharged as a breach** is robust to both readings (`copyB` non-empty at 2215 and at 2347)
and is not re-opened. **D-5, the attribution, is what this measures** — `frontend-dev`'s reading that
*"`0003`'s footer growth alone discharges F1, independent of T3"* is exactly the claim that flips if
`copyA` settled comes back empty, so it stands as a reported observation and **not** as a closed
clause until the settled numbers are in.

**Two notes on ownership, because two agents are working on the same geometry and neither may assume
the other settled it.** `labor-law-analyst` is ruling whether M-B discharges **F1** on the geometry
`design.md` §17 measured; `frontend-dev` is rebuilding the LR3.5 instrument under **T1c** and its
`copyA` run is the **only** instrument that answers *does F1 still reproduce with this spec's own
remedy removed*. §17 measured only the state **with T3 in** and says so itself (§17.17), so **no cell
of §17 may be read as verdict (a), (b) or (c)**, and no T1c verdict may be read as a legal ruling on
F1. `tech-lead` records both and routes; neither agent closes the other's question.

---

### T4′ — M-R: `DS1 P2` leaves the footer and renders under the answer as `EstimateNotice`

> **Replaces T4, which is SUPERSEDED and must not be executed.** Written from `design.md` §17.15,
> §17.7, §17.8, §17.11, §17.13. The developer makes no choice in this task: every path, prop, class,
> literal, assertion and expected number is below.

- **Files:**
  - `components/atoms/estimate-notice.tsx` (**create**)
  - `components/organisms/calculator-views.tsx` (**edit** — the footer loses its **second** `<p>`)
  - `components/organisms/work-calculator.tsx` (**edit**)
  - `components/organisms/salary-calculator.tsx` (**edit**)
  - `__tests__/estimate-notice.test.tsx` (**create**)
  - `__tests__/calculator-views.test.tsx` (**edit**)
  - `__tests__/work-calculator.test.tsx` (**edit**)
  - `__tests__/salary-calculator.test.tsx` (**edit**)
  - `tests/e2e/support/legibility.ts` (**edit**)
  - `tests/e2e/support/reachability.ts` (**edit**)
  - `tests/e2e/first-screen-reachability.spec.ts` (**edit**)
  - `tests/e2e/disclosure-legibility.spec.ts` (**edit**)

  **No other file is opened.** In particular: not `components/templates/calculator-layout.tsx`
  (§ Out of scope 4), not `components/organisms/hero-panel.tsx` (T6 owns it), not `lib/`, not
  `hooks/`, not `app/`.

- **Depends on:** **T6** (geometric — A4.2), and `0003`'s **T9** landed (A1.3).

- **Reuse, by path, instead of writing new code:**
  - `lib/utils.ts` → `cn()`, the only way this ramp is composed (`DESIGN.md`, Type-Step rule).
  - `components/templates/calculator-layout.tsx`'s existing `aside` slot — **unmodified**. The slot
    is a plain `div` with no `gap` and no `space-y`, which is why the 8 px comes from the notice's own
    `mt-2`.
  - `tests/e2e/support/legibility.ts` → `assertLr1`, `assertLr2b`, `assertLr3`, `measureSurface`,
    `expectLr2a`, `waitForStableBoundingBox`. **No new measurement helper is written.**
  - `tests/e2e/support/reachability.ts` → `fixedBoxes`, `intersects`, `seedStorage`, `clearConsent`,
    `REACHABILITY_VIEWPORT`, `ROUTES`, `THEMES`, `STORAGE_STATES`. `citationParagraph` is **kept and
    unchanged** — it still resolves the footer's `F-1`.
  - `__tests__/calculator-views.test.tsx`'s existing render idiom and its `vi.mock` of
    `WorkCalculator` / `SalaryCalculator` — unchanged.

- **What to build:**

  **1. `components/atoms/estimate-notice.tsx` (create) — exactly this, no `"use client"`, no props,
  no comments** (`__tests__/comment-free-code.test.ts` reads this directory):

  ```tsx
  import { cn } from "@/lib/utils";

  export const ESTIMATE_NOTICE_ID = "estimate-notice";

  export function EstimateNotice() {
    return (
      <p id={ESTIMATE_NOTICE_ID} className={cn("mt-2 text-caption text-ink-subtle text-pretty")}>
        Os valores são uma estimativa para você se organizar. Não substituem seu holerite, não valem como registro
        oficial de ponto e nada aqui é orientação jurídica ou contábil.
      </p>
    );
  }
  ```

  **The text node is moved, never retyped.** Copy it out of `components/organisms/calculator-views.tsx`'s
  second footer `<p>` and paste it. The JSX line break stays **between `registro` and `oficial`**,
  which is where it is today and which is a single space in the rendered text node, so the collapsed
  string is byte-identical. **170 characters**, asserted below. AC4 and AC5 are satisfied by
  construction and re-verified at G6 by `evidence/g1-text.mjs` + `diff`; **AC5's exemption list stays
  EMPTY.**

  **Every token, from `design.md` §17.8, and why it is there:** `mt-2` = `--spacing*2` = the **8 px**
  gap to the hero card, and the only source of that gap — the `aside` cell has no `gap` and no
  `space-y`. `text-caption` = `--text-caption` (0.75rem, line-height 1.45, letter-spacing 0.012em,
  weight 400). `text-ink-subtle` on the inherited `--color-canvas` — **5.74:1** dark, **4.84:1**
  light, both AA, the identical pair it renders on in the footer today. `text-pretty`, as the
  footer's paragraphs carry. **No `text-center`** — the footer's centring stays with the footer.
  **No radius, no border, no shadow, no background** — it is text in the column, not a card.
  **No `role`, no `aria-label`, no `aria-live`, no `tabindex`, no link, no `hover:` and no
  transition** (§17.9, §17.13): the element is not interactive, its text never changes, and it must
  **not** be put in a live region — an `aria-live` here announces nothing on every keystroke while
  stealing the queue from the hero value's own `aria-live="polite"`.
  **No motion** (§17.10): it inherits `CalculatorViews`' existing `PANEL_TRANSITION` on the route
  change and adds no transform, so there is no reduced-motion pair to write.

  **2. `components/organisms/calculator-views.tsx` (edit)** — delete the **second** `<p>` of the
  `<footer>` in full, the one beginning `Os valores são uma estimativa`. The footer keeps **three**
  paragraphs in this order: **P1** (storage, *"Tudo o que você digita fica salvo…"*), **P3** (the gap
  list, *"Não entram na conta: FGTS…"*), **P4** (`0003`'s `F-1`, *"Tabelas usadas nos cálculos:…"*,
  with all four `<a>` intact). **Nothing else in this file changes** — not the footer's class string,
  not `SOURCE_LINK_CLASSES`, not the `CURRENT_LEGAL_YEAR` / `formatIsoDate` imports, which P4 still
  uses. `EstimateNotice` is **not** rendered here.

  **3. `components/organisms/work-calculator.tsx` (edit)** — add
  `import { EstimateNotice } from "../atoms/estimate-notice";` (the file's own idiom is relative
  imports for components: `../atoms/progress-ring`, `../molecules/copy-button`). The `aside` prop
  becomes:

  ```tsx
  aside={
    <>
      <HeroPanel /* every existing prop and child unchanged */ />
      <EstimateNotice />
    </>
  }
  ```

  **4. `components/organisms/salary-calculator.tsx` (edit)** — the same change, the same import style
  (`../atoms/estimate-notice`), wrapping the existing `<HeroPanel>…</HeroPanel>` and
  `<EstimateNotice />` in a fragment. **No prop of `HeroPanel` changes in either file.**

  **One rendered instance per page**, because exactly one of `WorkCalculator` / `SalaryCalculator`
  mounts per route (`calculator-views.tsx`'s `activeView === "work" ? … : …`).

  **5. `tests/e2e/support/legibility.ts` (edit)** — `DS1_EXPECTED_PARAGRAPHS` **4 → 3**. That is the
  only change to this file. The survivors are **P1, P3, P4**; the DS1 footer describe's `assertLr3`
  marker is P1's sentence, which survives, so it is **not** touched.

  **6. `tests/e2e/support/reachability.ts` (edit)** — add, beside `citationParagraph` and in the same
  idiom:

  ```ts
  export const ESTIMATE_NOTICE_SELECTOR = "#estimate-notice";

  export function estimateNotice(page: Page): Locator {
    return page.locator(ESTIMATE_NOTICE_SELECTOR);
  }
  ```

  `citationParagraph` is **not** changed, **not** re-pointed and **not** deleted. The `id` literal
  lives in two files on purpose and cannot drift silently: every e2e use asserts
  `toHaveCount(1)` first, so a rename in the component turns the suite red rather than green on an
  empty set.

  **7. `tests/e2e/first-screen-reachability.spec.ts` (edit)** — four changes, no more:

  - **AC1's subject changes.** In the `AC1 / R` describe, replace `citationParagraph(page)` with
    `estimateNotice(page)` and retitle the test
    `` `the estimate notice is reachable at ${route} ${state} ${theme}` ``. Clauses 1, 2 and 3 keep
    their current bodies and their current failure messages, with *citation* → *estimate notice*.
    AC1's `toHaveCount(1)` stays and is the guard against a copy.
  - **Add clause 0 — the positional claim** (§17.15 item 4), before clause 1: the notice's
    `previousElementSibling` is non-null and **contains** the hero value
    (`p[aria-live="polite"]:not(.sr-only)`), read in one `evaluate` over the two handles. Failure
    message: `clause 0 — the estimate notice is not the hero card's next sibling`.
  - **Add the budget guard as its own test in the same describe**, over the same 16 cells plus the
    consent-answered state, titled
    `` `the first screen has room for the notice under the answer at ${route} ${state} ${theme}` ``.
    It reads, in one `page.evaluate`, four numbers in the same frame: `heroCardBottom` (the notice's
    previous element sibling's `getBoundingClientRect().bottom`), `gap`
    (`parseFloat(getComputedStyle(notice).marginTop)`), `noticeHeight`
    (`notice.getBoundingClientRect().height`) and `navTop` (the smallest `top` among `fixedBoxes`
    whose box lies below the hero card — the route nav). Then **two** assertions:

    ```
    expect(heroCardBottom + gap + noticeHeight,
      `budget — heroCardBottom ${…} + gap ${…} + noticeHeight ${…} = ${…} against navTop ${…}, slack ${navTop - (…)}`)
      .toBeLessThanOrEqual(navTop);

    expect(Math.abs(heroCardBottom + gap - noticeTop),
      `adjacency — the notice is not ${gap}px under the hero card: heroCardBottom ${…}, noticeTop ${…}`)
      .toBeLessThanOrEqual(0.5);
    ```

    **No literal 6.4, 52.2, 58.6, 699.4, 723.4 or 766 appears in either assertion, in any expected
    value or in any threshold.** Every operand is read; the only constant is the 0.5 px adjacency
    tolerance.
  - **The LR3.5 sweep gains DS1 P2's `guard defect:` check.** In all three places the sweep resolves
    `expectedSurface` (consent pending, consent answered, full journey), extend the existing
    conditional so `DS1 P2` resolves to `await estimateNotice(page).elementHandle()` exactly as
    `DS1 P4` resolves to `citationParagraph`, with the same
    `` `guard defect: LR3.5's ${surfaceName} surface at ${route} resolved to <${…}>` `` message. This
    is what proves the sweep is measuring the relocated `<p>` and not some ancestor it collapsed into.
  - **Unchanged, and named so nobody edits them:** `LR35_SURFACE_MARKERS`' DS1 P2 sentence (it is the
    sweep's server-side resolution marker, not a locator; §17.14 records it as an observation),
    `EXPECTED_LR35_SURFACE_COUNT` (**4** on both routes — P2 moved, it did not leave the page),
    `EXPECTED_LINES_ON_FIRST_SCREEN` (**already** the post-move value), and every AC13 body.

  **8. `tests/e2e/disclosure-legibility.spec.ts` (edit)** — add a third describe,
  **`Disclosure legibility — DS1 P2, the relocated estimate notice`**, over the same
  2 routes × 2 viewports × 2 themes matrix (8 tests), importing `estimateNotice` from
  `./support/reachability`:

  - `await expect(notice).toHaveCount(1)` and `await waitForStableBoundingBox(notice)` first.
  - `assertLr1(notice)` — `w` ≥ min(320, available); expected **358** at 390.
  - `expectLr2a(await measureSurface(notice, notice), label)` — the notice is a direct child of the
    column with no padding, so the chrome spend is **0** ≤ 32.
  - `expect(await assertLr2b(notice)).toBe("measured")` — **the return value is asserted**, because
    `"exempt"` is what a single-line-box surface returns and a silent exemption is a pass on an empty
    sample. Expected **3** line boxes at 390 (56.67 cpl) and **2** at 1440 (85.0 cpl), both ≥ 40.
  - `assertLr3(page, route, notice, "Os valores são uma estimativa para você se organizar")` — proves
    the sentence is in the **server** HTML, not injected on the client. This marker is a server-bytes
    check, which is the existing idiom of this helper, and is not a locator.
  - The DS1 footer describe is otherwise untouched; it now reads `DS1_EXPECTED_PARAGRAPHS` = 3.

- **Tests (jsdom):**

  `__tests__/estimate-notice.test.tsx` (**create**) — three cases, no Tailwind class string asserted
  anywhere:
  - `renders the estimate disclosure as one paragraph, unedited` — render `<EstimateNotice />`;
    `container.querySelectorAll("p")` has length **1**; its `id` is `ESTIMATE_NOTICE_ID`, imported
    from the component; its `textContent.replace(/\s+/g, " ").trim()` **equals** the literal
    `"Os valores são uma estimativa para você se organizar. Não substituem seu holerite, não valem como registro oficial de ponto e nada aqui é orientação jurídica ou contábil."`
    written verbatim in the test, **and** that literal's `.length` is **170**. The length assertion is
    what makes a silent one-character edit fail rather than a rewrite of both sides.
  - `adds nothing focusable to the first screen` —
    `container.querySelectorAll('a, button, input, select, textarea, [tabindex], [contenteditable]')`
    has length **0**, and the `<p>` has no `tabindex` attribute. §17.9 and §17.13's tab-order claim
    rest on this and nothing else asserts it.
  - `stays out of every live region and carries no role` — the `<p>` has no `aria-live`, no `role`,
    no `aria-label`, and no ancestor in the component's own output has an `aria-live`.

  `__tests__/calculator-views.test.tsx` (**edit**) — the two tests that assert P2 against a component
  that no longer owns it must move, or they assert markup that is gone:
  - **Amend** `promises that nothing leaves the browser and that the numbers are an estimate` →
    retitle `promises that nothing leaves the browser`, keep the
    `/fica salvo apenas neste navegador/` assertion, **delete** the two P2 assertions
    (`/Não substituem seu holerite/`, `/orientação jurídica ou contábil/`), and **add**
    `expect(screen.queryByText(/Não substituem seu holerite/)).toBeNull()`. **This is the assertion
    that makes "moved, not copied" falsifiable from this side** — without it a duplicate left in the
    footer passes every other test in the repo.
  - **Delete** `keeps every disclaimer clause in the same footer paragraph`; its four clause
    assertions are now `estimate-notice.test.tsx`'s first case. Its **last line** — the
    `/prorrogação da jornada noturna depois das 5h/` → `Súmula 60, II, do TST` assertion, which is
    **P3** and stays in the footer — moves into `names what the calculation leaves out`, unchanged.
  - **Add** `keeps three footer paragraphs, P1, P3 and P4` —
    `screen.getByText(/fica salvo apenas neste navegador/).closest("footer")` (the file's existing
    idiom at its `Tabelas usadas nos cálculos` case), then `querySelectorAll("p")` has length **3**,
    and the three texts match `/fica salvo apenas neste navegador/`, `/Não entram na conta/` and
    `/Tabelas usadas nos cálculos/` in that DOM order. **This is `DS1_EXPECTED_PARAGRAPHS` = 3 made
    checkable without a browser**, and it names the survivors rather than counting them.

  `__tests__/work-calculator.test.tsx` and `__tests__/salary-calculator.test.tsx` (**edit**) — one
  case each, titled `renders exactly one estimate notice beside the answer`:
  `container.querySelectorAll("p#estimate-notice")` has length **1**, and its text contains
  `"Não substituem seu holerite"`. No other case in either file changes.

  **Coverage:** `components/**` is at **90%** statements/branches/functions/lines (`AGENTS.md` §9).
  `EstimateNotice` has one branch-free return and is covered to 100% by its own file; no `lib/` or
  `hooks/` file is opened, so the 100% bar has no new subject.

- **Done when — every clause is checkable by the developer, and the unmeasured ones carry their
  escape (lesson 026):**

  1. `pnpm test __tests__/estimate-notice.test.tsx __tests__/calculator-views.test.tsx __tests__/work-calculator.test.tsx __tests__/salary-calculator.test.tsx` — green.
  2. `pnpm check` — green.
  3. `pnpm exec playwright test tests/e2e/disclosure-legibility.spec.ts` in the isolated copy —
     **24 tests**, up from 16, and the `lr2b-coverage` annotations pasted, showing
     `measured + exempt = 3` for the footer and `measured 1 + exempt 0 = 1` for the notice.
  4. **The budget guard is seen red for its stated reason, then green**, in one isolated copy, and
     both runs pasted:
     - **red:** with T4′ applied and **T6's three `hero-panel.tsx` hunks (D2, D3, D4) reverted in the
       copy only**, the guard fails on `/` at 390 with a **negative slack of about −17.6** —
       `heroCardBottom ≈ 723.4`, budget 34.6, notice 52.2. This is the red that carries the defect;
       it toggles **one** operand and it is the state §17.11 computed.
     - **green:** with T6 restored in the same copy, the guard passes on `/` with a slack of about
       **+6.4**, in all four storage states **and** the consent-answered state.
     - The pre-T4′ failure — the locator resolving **0** elements — is pasted as context and is
       **explicitly not credited as the red baseline**: a guard that cannot find its subject has said
       nothing about geometry.
     - **If either number departs from its expectation by more than 1 px, that is a finding, not a
       tuning target:** paste it, stop, and report to `tech-lead` with the four terms. Do not adjust
       the guard, the token or the expectation.
  5. `pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts` in the isolated copy —
     `-g "AC1"` green **16/16** plus the consent-answered cells, `-g "AC13"` green **16/16** (both
     `linesOccluded == 0` and the count, which only becomes true with this task in), and the LR3.5
     describe green with **no `guard defect:` failure** for DS1 P2 or DS1 P4.
  6. `pnpm exec playwright test tests/e2e` fully green in the isolated copy, F2c's single `fixme`
     aside. **If any suite outside this task's file list goes red, it is a finding for `tech-lead`**,
     not a file to open.
  7. `git status --short` shows **exactly** the twelve files above and no thirteenth — in particular
     no `components/templates/calculator-layout.tsx`, no `components/molecules/table-citation.tsx`,
     no `lib/`, no `hooks/`.
  8. Advances **AC1**, **AC4**, **AC5**, **AC6**, **AC7**, **AC13**.

---

### T6 — amended by A4.2: the two clauses that change

> T6's **Files**, **Reuse**, **What to build** (the six density steps and the three deliberately
> untouched `mb-8`/`mt-6`) and **Tests** are **unchanged**. Only `Done when` and the task's role in
> the order are amended.

- **T6 is a geometric precondition of T4′**, not only a serialisation: without D2/D3/D4 the hero card
  ends at **723.4**, the first-screen budget is **34.6 px**, and T4′'s 52.2 px surface fails by
  **17.6**. A plan that reordered T4′ before T6 would ship a guaranteed red.
- **`Done when`, amended:**
  - `pnpm check` green with **no edit to any existing test file** — unchanged.
  - `pnpm exec playwright test tests/e2e` green in the isolated copy, F2c's `fixme` aside, **with one
    named exception: the AC13 line-count assertion is expected red on both routes until T4′ lands.**
    `EXPECTED_LINES_ON_FIRST_SCREEN` already carries the post-move counts (9 on `/`, 10 on
    `/custo-da-hora`, `design.md` §5.1) and the relocated `<p>` is the leaf that makes them true, so
    at T6 the suite measures **8** and **9** and fails the count. **`linesOccluded == 0` must be green
    at T6** — that clause is M-O's and M-D's, and it is the half of AC13 this task does own.
  - **Paste both numbers.** A run where the AC13 **count** goes green at T6 means the count was
    satisfied by a leaf other than the relocated notice; **stop and report to `tech-lead`**, because
    the expectation and the tree then disagree about what is on the first screen.
  - Advances **AC2**, **AC7**, **AC15**, **AC1** — unchanged.

## 3E. Amendment 5 — the 132 px is attributed, the branch is split in two, and the measuring environment is named, by `tech-lead` on 2026-09-19

**Trigger.** `frontend-dev` delivered T1c in full and ran A4.3's reconciliation cell. The cell read
`maxScroll` **2347**, not 2215, which is A4.3's literal stop condition — and it also produced the
attribution A4.3 was written to obtain. The owner's delegate has ruled the third-reading escalation
discharged and returned the branch decision here. This amendment does five things and nothing else.

### A5.0 — The escalation is discharged, and on the merits, not only on the delegation

A4.3's fifth-mechanism clause (A3.4) exists for a **third, unexplained value of `maxScroll`**. That is
not what came back. **2347 is the second reading, not a third** — four independent page loads across
three probe scripts, all at ~200–250 ms, all `2347` on `copyB`'s `/`. And the **first** reading has now
been reproduced on demand: a fresh build with `NEXT_PUBLIC_ENABLE_ADS` unset reads `scrollHeight`
**3059** and `maxScroll` **2215** on `/`, integer-exact against `design.md` §17.17, and **2492**/**1648**
on `/custo-da-hora`, with `docTop`/`surfaceHeight` unchanged at 2841.4/121.7. **Both readings are now
derived from one named operand, measured in both directions.** A quantity that can be driven to either
value by toggling a single declared input is attributed, not unexplained. **No fifth mechanism is live;
the escalation is closed and A3.4 is not invoked.**

The attribution itself: `app/layout.tsx` renders `<AdManager />` as a sibling **after** `{children}`,
below `#main-content`, so it cannot move `docTop` — the exact shape of a delta that leaves `docTop` and
`h` identical to the decimal. Its box is `pb-8` (32) + `min-h-25` (100) = **132.0 px**, and
`components/organisms/ad-manager.tsx:21` collapses it to **0** under `if (!adClient || !enableAds)`.
H1 (the viewport differed) stays **refuted**; H3 (the settle point) is **not** the cause of the 132 px
and is a separate finding — see A5.4.

### A5.1 — Ruling 1: the instrument verdict is credited, and it is credited **alone**

*"This guard measures the rule"* and *"the product satisfies the rule"* are different findings with
different owners, and A3.3's (a)/(b)/(c) fuse them. They are split here, and only the first is settled.

**The guard discriminates. T1a, T1b and T1c are DONE.** The evidence is arithmetic and needs no browser:
the eleven A3.2 cases reproduce `legal.md` §8.1's worked table row for row, **including the red row** —
DS1 P4's empty set, printed as `2504.2 .. 2490` — and **C1 toggles exactly one operand** (`viewportHeight`
→ `+∞`) to turn that red row green, which is the proof that the **containment** conjunct and not the
fixed-chrome conjunct is what fails it. C2, C3 and C4 are the matching proofs for the other operand,
for horizontal disjointness, and for the deleted sample loop.

**This also closes, rather than defers, the diagnostic `reports/build.md` raises last** — *"the shipped
guard has no clause requiring the surface to be at least partially inside the viewport, so it is
satisfied trivially at `scrollY = 0`"*. That was true of the **pre-T1c sweep** and it is **not** true of
the closed form that replaced it: `tests/e2e/support/reachability.ts`'s `clearingScrollRanges` opens with
`from = Math.max(0, docTop + height − viewportHeight)` and `to = Math.min(maxScroll, docTop)`, and
returns `[]` when `to < from`. **That pair of lines *is* the containment conjunct**, it is what C1
toggles, and it is why DS1 P4 can come back empty at all. The `scrollY = 0` property belonged to the
instrument T1c deleted. **It is not a fourth architectural guess and it is not open.**

### A5.2 — Ruling 2: the subject verdict is credited as **neither (a) nor (c)**, and the reason is new

The single `copyA` cell that exists was measured with **`NEXT_PUBLIC_ENABLE_ADS=true`**. That is the
**test harness's** environment and it is **not the product's**:

| Where | `NEXT_PUBLIC_ENABLE_ADS` | What it is |
|---|---|---|
| `.env` (committed) | **`false`** | the default build of this product |
| `.env.example` (committed) | **`false`** | what a new clone is told to run |
| `playwright.config.ts:66` `webServer.env` | **`"true"`** | unconditional, every e2e run including CI |
| `.github/workflows/ci.yml:84` (e2e job) | **`"true"`** | same |
| `.github/workflows/ci.yml:140,147` (Lighthouse job) | **`"false"`** | with the comment *"Lighthouse measures this application, not AdSense. The e2e build above runs with ads on so the suite can assert their behaviour"* |

**The repository says in its own comment that ads-on is an instrument artefact.** So the branch stands as:

| `copyA` (T3 reverted), DS1 P4 on `/` | `maxScroll` | needs `s ≥ docTop + h − navTop` | window | verdict |
|---|---|---|---|---|
| ads **on** — measured, 2331 | 2331 | `2857.4 + 121.7 − 766` = **2213.1** | `[2213.1, 2331]` non-empty | shape of **(c)** |
| ads **off** — **NEVER MEASURED** | *(2199 is `2331 − 132`, arithmetic)* | **2213.1** | *(empty)* | shape of **(a)** |

**A4.3 rule 4 forbids crediting the second row, and it is still forbidden now that the 132 px has a
name.** Attributing a delta tells you *which operand* moves the number; it does not tell you what the
number reads. `copyB` was measured in both environments; `copyA` was measured in one. **The branch turns
on the cell nobody has taken.** This is not a fifth mechanism and not a new guess at the guard — it is
one missing cell of an already-named, already-attributed operand, and the developer has already proven
the procedure that takes it to the integer.

**Neither (a) nor (c) is credited. T1d takes the cell.**

### A5.3 — Ruling 3: the binding measurement environment is **ads off**, and every cell carries its ads state

For any claim about **what a user can reach**, the binding state is the product's default,
`NEXT_PUBLIC_ENABLE_ADS=false`. The suite's `true` is the state **the guard runs in** and must be
**recorded beside every e2e number, never substituted for it**.

**Why this outranks the branch.** The 132 px sits **below** every disclosure, so ads-on **raises**
`maxScroll` and **widens every clearing window** by 132 px. **The LR3.5 e2e guard therefore runs against
a strictly more forgiving page than the product's default build ships** — it is green partly for a
reason that is not in the product. That is the shape lesson **016** names, one level up: a predicate
evaluated against a subject that is not the one the rule is about. It is recorded here as the ceiling on
this spec's geometry work, and `copyB`'s own ads-off cell is the reassurance — `[2197.1, 2215]`,
non-empty, so the **shipped** page clears DS1 P4 too, and `legal.md` Addendum B's ruling that **F1 is
discharged as a breach** is robust in **both** environments and stays untouched.

**Binding on every task from here:** every geometric number pasted into `reports/build.md` carries
`NEXT_PUBLIC_ENABLE_ADS` **as the build that served the page saw it**, beside the route, viewport, theme,
storage seed, consent state and settle point that `AGENTS.md` §5 already requires. A number without it is
a number in an unnamed document.

**Not fixed here.** Changing `playwright.config.ts`'s `webServer.env` is outside this spec's file list,
and ads-on has its own reason (the suite asserts ad behaviour). Routed in §4 with an owner and a trigger.

### A5.4 — Ruling 4: the ad creative's 100 → 390 px growth is **two** findings with **two** owners

`frontend-dev` found that the `<ins class="adsbygoogle">` grows from its CSS floor (100 px) to **390 px**
roughly 2 s after load, identically in both copies (`scrollHeight` +290 = the slot's +290), which implies
live outbound access to `pagead2.googlesyndication.com` from inside the test run. These are two findings
and fusing them would give one of them the wrong owner.

**(i) Measurement determinism — `tech-lead`, and it binds this spec now.** Every geometric read in this
spec is taken at the **early settle point, before the ad creative resolves**, with the **elapsed ms
printed beside it**. This is already how the shipped assertions behave (they read promptly after
`citationParagraph` becomes visible, ~250 ms, never near 2 s), so nothing already measured is invalidated
— it is written down so it stays true by intent rather than by luck. **Signal it went wrong:** any
`scrollHeight` in a paste that exceeds the early reading for the same cell by ~290. **A4.3's instruction
to read at a settled point is amended by this**: for cells whose subject is document height, *settled*
now means *after `BANNER_DELAY_MS`, before the creative resolves*, and when the two cannot both be had,
the early read is the one of record and the conflict is reported.

**(ii) A test suite reaching a third-party ad server — `product-manager`, against spec `0014`.** Whether
CI and every local `pnpm e2e` should load `adsbygoogle.js` from Google is a `PRODUCT.md` §8 and privacy
question. It is **not** architecture, it is **not** this spec's, and it is **not** folded in. **Trigger:
immediate** — it is a live fact about what CI does today, not a conditional. Routed in §4.

### A5.5 — Ruling 5: D-5 goes to `labor-law-analyst` with both environments, and `tech-lead` records no attribution

`frontend-dev`'s finding — *"`copyA` shows all seven surfaces `found: true` with zero `guard defect:`;
`0003` alone discharges F1; T3 is not the remedy"* — is handed to `labor-law-analyst` **as measured
numbers, not as a conclusion**, with the whole of A5.2's table and this question, which is theirs and not
mine:

> **Which document is LR3.5's subject — the page the product's default build ships (`ads off`), or the
> page this repository's committed test config always measures (`ads on`)?** The attribution flips on it:
> ads-on, `copyA` is green and `0003`'s footer rewrite alone discharges F1; ads-off, `copyA`'s window is
> the one T1d is taking and the answer may be the opposite.

**`tech-lead` does not record the attribution, does not rule on whether F1 is discharged, and does not
rule which environment is the legal subject.** D-3 is **discharged** — DS2 and DS7 art. 59/71 re-swept on
both copies, all `found: true`, which is what W14 asked for. **D-5 stays open** with `labor-law-analyst`.
Copied to `product-designer`, because §17's cell is one of the two readings.

---

### T1d — Measure the one cell that decides the attribution: `copyA`, ads off

> One cell. **No source file is edited, in the worktree or in any copy, beyond A3.3 B2's two already-made
> `copyA` hunks.** The developer chooses nothing below.

- **Files:** `.specs/0010-disclosure-reachability-on-mobile/reports/build.md` (edit — append one section)
- **Depends on:** T1c (done)
- **Reuse:** the **same** isolated-copy procedure already proven in the A4.3 control run —
  `rsync -a --exclude node_modules --exclude .next` off **`copyA`** (never off the worktree, never off
  `copyB`), `cp -al node_modules`, `rm -rf .next`, a port confirmed free with `ss -ltnp`, `uptime`
  pasted. And the **same probe script** used for the A4.3 reconciliation cell, unmodified, and
  `clearingScrollRanges` from `tests/e2e/support/reachability.ts`, **unmodified**.
- **What to build:**
  1. Build that copy with **`NEXT_PUBLIC_ENABLE_ADS` unset** and `NEXT_PUBLIC_GA_ID=G-TEST12345`
     (`NEXT_PUBLIC_*` is inlined at build time — this must be a fresh `next build`, never a `next start`
     with a different env), exactly as the control build that reproduced 3059/2215 on `copyB`.
  2. Probe the **reconciliation cell**: `/`, **390×844**, storage `empty`, consent **pending**, **dark**,
     read at the **early settle point**, elapsed ms printed (A5.4(i)).
  3. Print, unfused: `scrollHeight`, `viewportHeight`, `maxScroll`, with the identity
     `maxScroll == scrollHeight − viewportHeight` shown; `docTop`, `surfaceTag`, `surfaceHeight`,
     `leafTag`, `leafHeight`, `left`, `right`; the full `fixed` list; `containmentOnly`; `ranges`;
     `found`. Plus `NEXT_PUBLIC_ENABLE_ADS` and `NEXT_PUBLIC_ADSENSE_ID` **as the build saw them**, and
     the presence/`display`/border-box height of `ad-manager.tsx`'s wrapper `div` and its
     `ins.adsbygoogle` (expected: **absent**).
  4. Repeat for **`/custo-da-hora`**, same cell parameters. Two routes, nothing else.
  5. **Do not subtract, add or scale anything.** `2199` does not appear as a measured value anywhere in
     the paste. If the probe's `maxScroll` on `copyA` ads-off lands within 1 px of `2331 − 132`, that is a
     **coincidence to report**, not a derivation to confirm.
  6. **Sanity control, one line, and it is required** (lesson **064**): the same build, same probe,
     `copyB`'s ads-off numbers re-read — `scrollHeight` **3059**, `maxScroll` **2215** on `/`. If they do
     not reproduce, the copy is not the one that produced them and nothing in this task is trusted. *(The
     `copyB` ads-off build already exists from the A4.3 control run; re-use it rather than rebuilding.)*
- **Tests:** none — this task measures. **No product file, no test file, no config file is edited.**
- **Done when:**
  - `reports/build.md` carries the section with every field above **pasted from the probe**, both routes,
    and the control row of item 6 reproducing 3059/2215.
  - One line naming the verdict **as a measurement, not as a branch**: *"`copyA` ads-off DS1 P4 window is
    `[…]`, `found: <bool>`"*. **`frontend-dev` does not credit (a) or (c)** — `tech-lead` records the
    branch, and `labor-law-analyst` rules the attribution (A5.5).
  - `pnpm check` green (it must be — nothing was edited).
  - **Any disagreement is a finding reported with its number** (lesson **026**), never absorbed and never
    rounded towards 2199 or towards 2331.
- **Advances:** D-5's attribution; A3.3's subject verdict.

### A5.6 — What resumes, in what order, and what the ads pin changes for each

**The attribution question gates no source file.** T3 is in the tree under every branch, nobody proposes
removing it, and `legal.md` Addendum B's ruling that F1 is discharged as a breach is robust in both
environments. **T5 is therefore UNBLOCKED** — `legal.md` A1.7's M-B → M-O ordering is satisfied by T3 as
delivered.

**Order: `T1d` → `T5` → `T6` → `T4′` → `T7` → `T8`.** T1d first because it is one build, it needs no
other agent, and it closes the only open operand; and because **no two browser measurements run at once**,
it must not overlap anything else.

**What the `NEXT_PUBLIC_ENABLE_ADS` pin changes, task by task — checked, not assumed:**

| Task | Changed? | Why |
|---|---|---|
| **T5** | **No change to any expected value.** | Carries no absolute `scrollHeight`/`maxScroll` literal (grepped). Its subjects — the consent surface's box, `lr44FloorHeight` **466**, the three controls' in-viewport checks — are viewport-relative and sit **above** the ad slot, which renders after `{children}`. Add the ads-state field to every paste (A5.3). |
| **T6** | **No change.** | Same: six density steps, all box heights and widths above the fold. |
| **T4′** | **No change.** | A4.2 already made its guard a **comparison** of four operands read in one frame (`heroCardBottom + gap + noticeHeight ≤ navTop`, plus the adjacency conjunct). A tail 132 px below the footer cannot move any of the four. |
| **T7** | **No change.** | Documentation only. |
| **T8** | **CHANGED — two clauses, below.** | Its two instruments run in **two different documents**. |

**T8 is amended, and this is the one that would have gone wrong silently:**

- **T8's `evidence/g1-*.mjs` rows run ads OFF and must say so.** They are started with
  `pnpm build && pnpm start -p <port>`, which reads the committed `.env` → **ads off** — which is also the
  state the **before**-numbers in `evidence/g1-*.txt` were taken in. **That is correct and must stay
  correct**: an after-run of `g1-scroll.mjs` or `g1-fold.mjs` taken with ads on is not comparable to its
  own before-number. `g1-scroll.mjs` scrolls to `document.documentElement.scrollHeight` and `g1-fold.mjs`
  prints it, so **AC7 (`−21.3 to −29.2`) and AC1 are the two criteria that move with the ads state** — by
  up to 132 px, which is five times AC7's whole expected delta.
- **T8's `pnpm exec playwright test tests/e2e` row runs ads ON**, because `playwright.config.ts:66` pins
  it. **Both rows keep their own label**, and T8's table gains a column stating
  `NEXT_PUBLIC_ENABLE_ADS` per row. **Reconciling the two rows' document heights against each other is a
  category error, not a finding** — they are two documents by design, and the 132 px between them is
  already attributed here.
- **T8's settle point is the early one** (A5.4(i)), with elapsed ms printed.

---

## 4. Debts and findings routed out of this spec — owner and trigger, never a date

Every one of these is stated here so `STATUS.md` can carry it forward and so a reviewer can tell
*nothing exempted* from *nobody looked*.

| # | What | Owner | Trigger |
|---|---|---|---|
| **The LR3.5 e2e guard runs in an environment the product does not ship** | `playwright.config.ts:66`'s `webServer.env` pins `NEXT_PUBLIC_ENABLE_ADS: "true"` unconditionally, while `.env` and `.env.example` ship **`false`** and `ci.yml:140,147` turns it off for Lighthouse with the comment *"the e2e build above runs with ads on so the suite can assert their behaviour"*. The ad slot adds **132 px of tail below every disclosure**, which **raises `maxScroll` and widens every LR3.5 clearing window** — the guard is measured against a strictly **more forgiving** page than the default build. `copyB` clears DS1 P4 in **both** environments (`[2197.1, 2215]` ads-off, `[2197.1, 2347]` ads-on), so nothing is currently red; what is unsound is the **instrument**, not today's verdict. **Not fixable here**: `playwright.config.ts` is outside § Scope and the pin has its own reason | `tech-lead` | the first spec that edits `playwright.config.ts`'s `webServer.env`, or that adds a geometric assertion under `tests/e2e/` |
| **The e2e suite loads `adsbygoogle.js` from `pagead2.googlesyndication.com`** | Observed directly: the creative resolves and the slot grows **100 → 390 px** ~2 s after load, in CI's configuration as well (`ci.yml:82-85`). Two separable consequences — geometry measured after that moment reads a different page (owned as **A5.4(i)**, binding on this spec's own reads), and **a test run reaching a third-party ad server is a `PRODUCT.md` §8 and privacy question**. The second is not architecture and is **not folded into this spec** | `product-manager`, against spec **`0014`** | **immediate** — it is a fact about what CI does today, not a conditional |
| **AC8 / F4 — CA, CB, CC, CD, CE** | All five are **in the LR domain** (`legal.md` §3; CD and CE are `WORK_REGIME_INFO`'s `impact` strings, admitted at G2). All five breach LR3-as-corrected and LR6.1 — `ABSENT FROM DOM` on load. **Not fixable in this spec**: § Non-goals forbids a reveal control and any new string, and unconditional rendering spends `0008`'s flow budget (AC15). **No task above opens `journey-form.tsx`'s settings panel or `regime-field.tsx`.** | `tech-lead` → a new spec, **and the human** (`legal.md` §16 Q2) | the first spec that opens `hooks/use-work-calculator.ts`, `components/organisms/journey-form.tsx`'s settings panel, or `components/organisms/day-summary.tsx`'s rate rows |
| **F4 — `Extra 100%`** | `components/organisms/day-summary.tsx:203`, from `hooks/use-work-calculator.ts:14` — traces to **no norm and no table**; `PRODUCT.md` §6 calls 50/100 *"the statutory floor"* and CB denies it | `tech-lead` → the same new spec, **and the human** | same |
| **F3 — no cookie policy, no privacy page** | Five of LGPD art. 9º's seven information units are presented nowhere; art. 9º § 1º makes consent so obtained **null**. It **raises** LR4.4's floor by 28 px rather than lowering it. Adding the link needs a **label**, which is a new pt-BR string § Non-goals forbids — `content-writer`'s **T1** already ruled that a **G1 amendment**, not a string request | `tech-lead` → the consent spec that takes `0011` F2, **and the human** (`legal.md` §16 Q1) | unchanged |
| **F2c — `area(Recusar)` < `area(Aceitar Tudo)` at 1440** | **4 935** vs **6 296**, accept **27.6%** larger; cause is `w-full sm:w-auto` at `cookie-consent.tsx:68` and `:71` inside the row at `:60`. **No task above edits `:60-74`**, which is the exact condition `legal.md` C3 set for it to be in scope, and `spec.md` § Out of scope 6 forbids a desktop layout change. **Moderate, routed, not a rejection.** It is asserted-and-`fixme`d in T1 so it is a visible obligation rather than a silence | `tech-lead` → the consent spec that takes `0011` F2 | the first spec that opens `components/organisms/cookie-consent.tsx`'s control row at `:60-74` |
| **F2c's sibling axis, deliberately left open** | The same substance in the quantity **fill** — `variant="default"` on *Aceitar Tudo* vs `variant="outline"` on *Recusar* — at **every** viewport including 390 | `labor-law-analyst` | the same trigger |
| **`0011` F3 — revocation ineffective until the next document** | `lib/analytics.ts` and `components/organisms/analytics-wrapper.tsx` are outside this spec and it cannot fix this. M-O makes the revocation control **more** reachable, which strictly improves art. 8º § 5º's *facilitado* and strictly increases exposure to F3. **Human-approved (Q5): `0011`'s RV1–RV3 and the replacement of `cookie-consent.tsx:56`'s *"a qualquer momento"* ship as one unit, in `0011`.** This spec writes, rewords and re-renders **nothing** about revocation timing | `tech-lead` → `0011` | `0011`'s RV1–RV3 |
| **`0006` DS2 / Súmula 172 e2e debt** | `grep -rn "Súmula 172\|DSR" __tests__ tests components lib` → **10 rows, 0 under `tests/`**. **The trigger did NOT fire**: no task opens `components/organisms/day-summary.tsx`, the caption's type token, or the `DESIGN.md` type scale. Measured rather than asserted — the DSR row's bottom **2369.5** and DS2's top **2381.5**, **12 px**, identical to the baseline's 12 px. **Re-routed intact.** T8 re-runs the grep and pastes it (AC9's second branch) | `product-designer` | unchanged — the first spec that opens `components/organisms/day-summary.tsx`, the caption type, or the `DESIGN.md` scale |
| **`collapsible-panel.tsx` reduced-motion residual** | `height: 0 → auto` is not suppressed under reduced motion. **Trigger does not fire** — no task opens a collapsible panel or animates a non-transform property. **Re-routed intact** | `product-designer` | unchanged |
| **`0004` F1 / LR5.4** | The clause protecting a returning user's stored inputs has never been asserted by a running check. **Not this spec's**: `0008` §6 O5 makes it a precondition only if a task edits `hooks/use-salary-calculator.ts` or `hooks/use-work-calculator.ts`, and **no task above opens `hooks/`** | `tech-lead` | the first spec that edits either hook |
| **Visual order vs tab order in the `aside` cell** | The citation is visually second on a phone and seventh in the tab order, because `CalculatorLayout`'s aside is `order-first` **visually only**. Pre-existing — the hero's copy button has the same relationship today. Fixing it means editing `components/templates/calculator-layout.tsx`, which § Out of scope 4 forbids | `product-designer` → `0008` | the first spec that opens `components/templates/calculator-layout.tsx` |
| **`evidence/` is gitignored** | `.gitignore:55` (`git check-ignore -v` confirms). The `g1-*.mjs` instruments **do not ship**, so every criterion `spec.md` writes against them is unrunnable by anyone who clones the repo. This plan mitigates it by writing the durable form as Playwright specs under `tests/e2e/`; **the underlying question — whether an instrument a spec's criteria depend on belongs in `evidence/` — is `product-manager`'s** | `tech-lead` → `product-manager` | the next spec whose acceptance criteria name an `evidence/*.mjs` command |

**AC5's exemption list: EMPTY.** Stated as empty, not left silent. `copy.md` is an explicit no-op, no
task writes, shortens, rewords or adds a pt-BR string, and `legal.md` §6 confirms the list is empty.

---

## 5. Risks

| Risk | The signal it happened |
|---|---|
| **M-O lands without M-B**, or T3 is reverted while T5 stands | T1's LR3.5 describe goes red on **DS1 P3** (not P4) in the **consent-answered** state — `scrollY` 2529.6 against a max of 2516 on `/`. That specific pair of numbers *is* the signature. `legal.md` A1.7 makes the pairing binding: M-B out means M-O out |
| **`DS1 P2` is copied rather than moved**, leaving a second instance in the footer | T4′'s `expect(screen.queryByText(/Não substituem seu holerite/)).toBeNull()` in `calculator-views.test.tsx`, its `keeps three footer paragraphs` case, and AC1's `toHaveCount(1)` on `#estimate-notice`. Three independent guards, because the duplicate is invisible to every geometric assertion |
| **The budget guard hard-codes the measured slack** — `6.4`, `52.2`, `58.6`, `699.4` or `766` appearing as an expected value or a threshold | `grep -nE "6\.4|52\.2|58\.6|699\.4|723\.4|\b766\b" tests/e2e/first-screen-reachability.spec.ts` returns anything outside a failure-message template. The guard then passes on a tree whose geometry has moved, which is the defect this spec has already paid for three times |
| **T4′ lands before T6**, or T6's `hero-panel.tsx` hunks are reverted under it | The budget guard fails on `/` at 390 with a slack of about **−17.6** and `heroCardBottom ≈ 723.4`. That pair of numbers *is* the signature, and it is the same red T4′'s `Done when` 4 requires the developer to produce on purpose |
| **The AC13 count is read as a T6 defect** instead of the named intermediate red | T6's e2e run shows `linesOnFirstScreen` **8** on `/` and **9** on `/custo-da-hora` against expectations of 9 and 10, with `linesOccluded` **0**. That is A4.2's expected state. The *inverse* — the count green at T6 — is the finding, because the leaf that makes it true has not been built yet |
| **A geometric number is pasted without its ads state, and someone reconciles two documents** | Any cell in `reports/build.md` from T1d onwards lacking `NEXT_PUBLIC_ENABLE_ADS` as the build saw it — or any claim that T8's `g1-*` row and its `pnpm exec playwright test` row disagree. They run ads-off and ads-on respectively, by design; the 132 px between them is attributed (§3E A5.0) and re-deriving it is the fourth time this spec pays for the same number |
| **T8's after-run is taken with ads on** | An `evidence/g1-scroll.mjs` AC7 delta outside `−21.3 … −29.2` by roughly a hundred pixels, or a `g1-fold.mjs` `scrollHeight` 132 px above `evidence/g1-fold.txt`'s. The before-numbers were taken under `.env` (ads **off**); an after-run under `playwright.config.ts`'s env is not comparable to them, and AC7's whole expected delta is smaller than the error |
| **A geometric read is taken after the ad creative resolves** | Any `scrollHeight` exceeding the same cell's early reading by ~290 px, or a paste with no elapsed-ms field. Every read in this spec is taken at the early settle point (§3E A5.4(i)) |
| **`copyA`'s ads-off `maxScroll` is reported as 2199** | The literal `2199` appearing in T1d's paste as a measured value, or any number arrived at by subtracting 132. It is this gate's arithmetic on two readings in two states (A4.3 rule 4, lesson **050**), and the branch turns on it, which is precisely why it must be measured |
| **The 132 px `maxScroll` discrepancy is left unattributed and a branch is credited anyway** | T1c's paste has no `scrollHeight` field, or no second settle point, or the reconciliation cell (`/`, 390×844, empty, consent pending, dark) reads neither 2215 nor a value whose difference from it is named block by block. A verdict taken on a fused quantity is a coin flip between (a) and (c), and those two have different owners |
| **`copyA`'s settled `maxScroll` is derived by subtracting 132 instead of measured** | Any number in the T1c paste that equals `2331 − 132` without a probe line behind it. The 2199 in A4.3 is **this gate's arithmetic on two readings in two states**, which is the exact shape lesson **050** forbids handing forward, and a branch decided on it is decided on nothing |
| **`design.md` §17's numbers are read as an answer to A3.3** | Any report citing §17 as evidence that F1 is or is not discharged. §17 measured **only** the state with T3 in and says so itself (§17.17); `copyA` is the only instrument that answers that question |
| **The citation is copied rather than moved**, leaving a second instance in the footer | T4's `expect(screen.queryByText(/Tabelas de INSS e IRRF/)).toBeNull()` in `calculator-views.test.tsx`, and T1's AC1 assertion that `citationParagraph` resolves to exactly **1** element |
| **`p-3` is written instead of `px-3`** on the consent row | The surface height falls from **466** to ~442 and `lr44FloorHeight` in T1's LR4.2a output drops with it. Still above the 336 floor, so **nothing goes red** — this one is invisible to every guard and is caught only by reading the measured height in T8's paste. Named for that reason |
| **`cookie-consent.tsx:17-26` is "simplified" while `:15` is changed** | T2's LC1.7 case — `renders the switch on again for a stored affirmative consent` — goes red. That is the whole reason it is written as a rule and not as a one-word instruction |
| **The `sm:` restoration is forgotten on one of the six density steps** | `evidence/g3-v4.txt`'s wide cells stop reproducing: the 1440 citation `w` is no longer **514.7**, or `column-stability.spec.ts` / `wide-viewport.spec.ts` shift. § Out of scope 6 is breached silently otherwise, because nothing else in the suite looks above 639 px |
| **A guard passes on the unfixed head at T1** | Any of AC1 / AC13 / LR3.5 / LR4.2a green before a source edit. That is not good news, it is a non-discriminating assertion — the exact defect `legal.md` §11 found in AC13's original instrument. Stop and route to `tech-lead` |
| **The consent surface's 1 500 ms mount is a CLS regression** | `0004`'s CLS budget at G6, measured on **both** routes against the **current** number rather than against zero. `design.md` §9's "nothing below it moves" is an argument, not a measurement, and it is treated as unverified until the auditor's run |
| **`tests/e2e/google-tracking.spec.ts` starts failing** | `page.click('button:has-text("Aceitar Tudo")')` now needs an auto-scroll. It survives by tooling, not by design; if Playwright's actionability check times out there, the finding is real and belongs to `tech-lead`, not to a `scrollIntoViewIfNeeded` patch dropped into the spec |
| **The e2e suite is red between T1 and T6** and someone pushes | CI's `pnpm e2e` job goes red on a branch push. **Nothing is pushed before G8**, which is after G6; T1's red run is the point, not an accident. If a push is proposed earlier, it is a `tech-lead` decision, not `frontend-dev`'s |
| **`design.md`'s line numbers are stale** (`hero-panel.tsx:29/33/62`, `salary-calculator.tsx:78/246`) | The developer edits the wrong `mb-8` — the fields grid or a `CollapsiblePanel` instead of a card header. T6 names the element by its **content**, not its line, for exactly this reason; the signal is a collapsible panel appearing in `git diff` |
| **`copyA`'s revert goes wider than A3.3 B2's two class strings** | `git -C copyA diff --stat` on `components/organisms/calculator-views.tsx` shows more than the two hunks, or `0003`'s four `<a>` source links are missing from `copyA`'s footer. Then the run is measuring `0003`'s absence, not this spec's remedy's absence, and every `docTop` in it is meaningless |
| **`copyB` is rsynced from the worktree instead of from `copyA`** | `docTop` differs between the two copies for **DS1 P1, P2 or P3** — surfaces that sit *above* both reverted hunks and cannot move because of them. Any difference there is a second snapshot, and the two runs are not comparable |
| **The A3.2 calibration is made green by editing its expected numbers** | Any cell of T1c's seven-row table differs from `legal.md` §8.1's published worked table. The table is the fixture and the implementation is the subject; a calibration adjusted to its subject measures nothing, and this is the single worst outcome available in T1c |
| **The 1440 LR4.2a cell passes by 1.7 px and a later change eats it** | `legal.md` A5 W12: that cell is a **sweep**, never a single probe. A version of T1 that probes one scroll position at 1440 is wrong even while green |
