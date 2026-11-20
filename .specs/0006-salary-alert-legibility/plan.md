# 0006 — salary alert legibility

> Owner: tech-lead · Gate: `plan` · Run 2 — bounce triage on T2's two findings
>
> Binding inputs: `spec.md` run 2, `legal.md` (G2 **pass**), `design.md` (G3 **pass**), `STATUS.md`
> § Blockers, `AGENTS.md` §§4, 5, 8, 9, `.agents/memory/LESSONS.md`.
>
> **Nothing in this plan re-decides anything above it.** The geometry is `design.md`'s, the rule is
> `legal.md`'s LR2a, the criteria are `spec.md`'s. What this gate decides is: where the code goes,
> in what order, what guards it permanently, and what each test asserts.

---

## Architecture

### The shape of the change

One atom changes its internal box structure. Nothing else in `app/`, `components/`, `hooks/` or
`lib/` is opened.

| Layer | Touched? | Why |
|---|---|---|
| `lib/**` | **no** | `spec.md` AC7 forbids it by name (`compliance.ts`, `journey.ts`, `salary-period.ts`). There is no business rule here: the defect is a box model, not a number. `git diff --stat main -- lib/` must stay empty. |
| `hooks/**` | **no** | No state changes. Every banner's condition is already computed synchronously by its organism. |
| `components/organisms/**`, `templates/**` | **no** | `design.md` §3.4: all five consumers are block children of character-for-character identical cards, so one atom-level change reaches all five with **no call-site edit**. C1–C4 keep `className="mb-6"`; C5 keeps passing none. |
| `components/atoms/alert-banner.tsx` | **edit** | Where the 66px is spent (`design.md` §0.1). |
| `__tests__/alert-banner.test.tsx` | **edit** | The structural half of the remedy — that the icon left the body's column, and that the `id` stayed on the root — is a DOM fact, provable in jsdom. |
| `tests/e2e/**` | **create + edit** | The geometric half is only provable in a real browser against a production build (`AGENTS.md` §8; `spec.md` AC3–AC5). |
| `app/globals.css`, `DESIGN.md` | **no** | `design.md` §12.1: no token, no step, no curve. `DESIGN.md` is routed, not edited — see § The blocker, ruled. |

**The remedy lives in the atom, not in the consumers** — `spec.md` § Open questions left this to G4
and this is the answer. Five call-site treatments of one defect is how this defect returns; the
atom owns every pixel being moved; and a per-consumer fix would need five `className` overrides
that `cn()` would merge into the node that also carries `text-body-sm`, which `design.md` §5.1
names as a live hazard.

### The intended atom

`design.md` §5.1, transcribed as the exact tree the build must produce:

```
div[role]  rounded-lg border px-3 py-4  + TONE_CLASSES[tone] + className   ← surfaceRoot, id here
└── div    space-y-1 text-body-sm
    ├── div  flex items-start gap-3                                        ← the title row, new node
    │   ├── Icon  mt-0.5 h-5 w-5 shrink-0  aria-hidden="true"
    │   └── p     font-semibold      {title}
    └──      {children} → the consumer's <p>                               ← bodyText, full width
```

Three properties of that tree are load-bearing and are asserted, not assumed:

1. **`id` stays on the root.** It is `DateTimeInput`'s `aria-describedby` target at C4
   (`design.md` §7.2). Moving it to the title row breaks the field's error description while every
   visual check passes.
2. **The inner `space-y-1 text-body-sm` wrapper is kept.** Collapsing it into the root would put a
   font-size utility into the node `cn()` merges the consumer's `className` into — `DESIGN.md`'s
   *Type-Step-Is-Not-a-Colour Rule*, which has already produced a real 3.77:1 failure.
3. **The body is a sibling of the title row, not a descendant of it.** That is the +32px, and it is
   the one thing jsdom can see.

No value below is a choice: `px-3`, `py-4`, `gap-3`, `h-5 w-5`, `mt-0.5`, `space-y-1`, `rounded-lg`,
`border`, `font-semibold`, `text-body-sm` are all `design.md` §6.1/§6.2 verbatim, all existing
sanctioned steps. **No `sm:` variant of the horizontal padding is added at any breakpoint**
(`design.md` §3.2); a `sm:px-4` reintroduces the failure at every width ≥ 640.

### What permanently guards the chrome budget

The 32px budget is arithmetic a future padding change breaks silently and invisibly: the card still
looks right, the DOM is unchanged, axe is clean, nothing overflows. Lesson 016 is exactly this
failure mode, and `0005` shipped its guard test for exactly this reason.

**The guard is `assertLr2a` in `tests/e2e/`, run by `pnpm e2e` in CI on every PR**
(`.github/workflows/ci.yml`, job `e2e-tests`), at 390 and 1440 over all five consumers and at 2560
and 3840 over C5. It reads `getBoundingClientRect()` on both sides in a real browser against a
production build.

**A source-text guard over the atom's class string is deliberately refused.** `AGENTS.md` §8:
*never assert a Tailwind class string* — a guard that mirrors `px-3` breaks on every legitimate
design change and cannot see the case that actually matters (a `sm:` variant, a wrapper added by a
consumer, a root-font-size interaction at 3840). The computed-geometry assertion catches all three
and is the form `AGENTS.md` §8 mandates for a CSS override anyway.

**Why 2560 and 3840 are guarded even though the criteria bind at 390 and 1440.** `design.md` §4.4
proves the LR2a spend *grows* with the root font size — 26 at 390/1440, 27.5 at 2560, **29 at
3840** — because the budget is in CSS px and the padding is in `rem`. The binding case is the
widest viewport, and `design.md` § Risks names "green at 390, 1440 and 2560; red at 3840, where
nobody looks" as a live failure mode. A guard that cannot see its own binding case is not a guard.
Cost: two chromium-only cases in a file that already runs at those widths.

### Test strategy

| Level | File | What it proves | Bar |
|---|---|---|---|
| unit (jsdom) | `__tests__/alert-banner.test.tsx` | structure: the body is outside the icon's row; the `id` and the `role` stay on the same element; the icon is still hidden from AT; no focusable node is introduced | `components/**` ≥ 90% st/br/fn/ln — the atom is already at 100% and stays there |
| e2e (real browser, production build) | `tests/e2e/alert-legibility.spec.ts` | LR1, LR2a, LR2b, LR3 over C1–C5 at 390 and 1440, both themes, both routes; the AC11 residual recorded | every case red on the unfixed tree, green after |
| e2e (chromium, wide) | `tests/e2e/wide-viewport.spec.ts` | LR2a over C5 at 2560 and 3840 | same |
| e2e (unchanged assertions) | `tests/e2e/disclosure-legibility.spec.ts` | DS1 and DS4 still pass LR1/LR2b/LR3 — **48 cases, count unchanged** | AC6 |

**There is no reduced-motion case on this surface, and its absence is a decision.** `design.md` §8:
the atom has no transition, none is added, and every one of these five banners is triggered by a
keystroke — which `DESIGN.md` § Motion forbids animating. `AGENTS.md` §8's neutralizer-pairing rule
therefore has **no instance here**. A reviewer at G6 should read the absence as specified, not as
missing; a `motion-reduce:` utility appearing in the diff is a defect, not a fix.

**LR2b is not weakened for DS1 and DS4.** `legal.md` §3.2 exempts type > 12px at 390 only; DS1's
footer and DS4's captions are `text-caption` (12px) and keep the 40-cpl assertion at both
viewports, exactly as today. The rename of `assertLr2` → `assertLr2b` changes the name and nothing
else.

### Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Measure rendered geometry in a real browser | **`@playwright/test`, already installed** | It is the instrument `0005` established and `spec.md` AC2–AC5 name. No new dependency. |
| Share helpers between two e2e specs | **A plain module under `tests/e2e/support/`** | `playwright.config.ts` sets `testMatch: "**/*.spec.ts"`, so a non-`.spec.ts` file inside `testDir` is not collected as a suite. No config change, no new tool. |
| Everything else | — | **No dependency is added by this spec.** |

---

## Tasks

Five tasks, in order. `pnpm check` is green after every one of them. **T2b was added at run 2** —
see § The two T2 findings, ruled — and is ordered before T3 because the baseline it repairs has to
be measured on the unfixed atom, which T3 fixes.

**Read this before starting T2:** T2 is required to end **red**. `spec.md` AC2 makes an instrument
that was never seen failing worthless over an LR-domain surface, and `AGENTS.md` §8 requires a CSS
override to be *seen to fail against the unfixed code first*. The remedy lands in T3 and not before.

---

### T1 — Extract the legibility helpers into a shared support module

- **Files:**
  - `tests/e2e/support/legibility.ts` — **create**
  - `tests/e2e/disclosure-legibility.spec.ts` — **edit** (imports and one rename; **no assertion
    changes, no case added, no case removed**)
- **Depends on:** none
- **Reuse:** every helper already in `tests/e2e/disclosure-legibility.spec.ts` — move them, do not
  rewrite them. `availableContentWidth`, `lineBoxesAndCharacters`, `assertLr1`, `assertLr3`,
  `waitForStableBoundingBox`, `openPrivacySettings` move **byte-for-byte**; `assertLr2` moves and is
  renamed `assertLr2b`, body unchanged.

- **What to build:**

  `tests/e2e/support/legibility.ts` exports, in this order:

  ```ts
  export const LR2A_CHROME_BUDGET_PX = 32;

  export interface SurfaceMeasurement {
    surfaceRootWidth: number;
    bodyTextWidth: number;
    chromeSpend: number;
    characters: number;
    lineBoxes: number;
    charactersPerLineBox: number;
  }

  export interface RecordedMeasurement extends SurfaceMeasurement {
    surface: string;
    route: string;
    viewportWidth: number;
    theme: string;
    project: string;
  }
  ```

  plus these functions:

  | Export | Signature | Body |
  |---|---|---|
  | `availableContentWidth` | `(locator: Locator) => Promise<number>` | moved verbatim |
  | `lineBoxesAndCharacters` | `(locator: Locator) => Promise<{ lineBoxes: number; characters: number }>` | moved verbatim |
  | `assertLr1` | `(locator: Locator) => Promise<void>` | moved verbatim |
  | `assertLr2b` | `(locator: Locator) => Promise<void>` | moved verbatim from `assertLr2`, renamed only |
  | `assertLr3Rendering` | `(locator: Locator) => Promise<void>` | **split out** of `assertLr3`: the whole `locator.evaluate` block and the seven `expect`s over `visibility`, `opacity`, `display`, `hidden`, `insideClosedDetails`, `insideCollapsedRegion` and `onScreen`, moved unchanged |
  | `assertLr3` | `(page: Page, route: string, locator: Locator, serverRenderedMarker: string) => Promise<void>` | the two remaining lines (`page.request.get(route)` and `expect(serverHtml).toContain(...)`), then `await assertLr3Rendering(locator)`. **Behaviour for existing callers is identical** — same assertions, same order. |
  | `waitForStableBoundingBox` | `(locator: Locator) => Promise<void>` | moved verbatim |
  | `openPrivacySettings` | `(page: Page, route: string) => Promise<void>` | moved verbatim, plus `export const DS4_PANEL_SELECTOR` and `export const DS1_FOOTER_SELECTOR` moved with it |

  and three new functions:

  ```ts
  export async function measureSurface(surfaceRoot: Locator, bodyText: Locator): Promise<SurfaceMeasurement>
  ```
  Reads `surfaceRoot.boundingBox()` and `bodyText.boundingBox()` — **both bounding rects, neither a
  content box** (`spec.md` AC4, amendment A2; lesson 023). Calls `lineBoxesAndCharacters(bodyText)`.
  Returns every field rounded to two decimals via `Number(value.toFixed(2))`;
  `chromeSpend = surfaceRootWidth − bodyTextWidth`;
  `charactersPerLineBox = characters / lineBoxes` (and `0` when `lineBoxes === 0`). Throws
  `new Error("surface has no bounding box")` if either `boundingBox()` returns `null`.

  ```ts
  export function expectLr2a(measurement: SurfaceMeasurement, label: string): void
  ```
  ```ts
  expect(
    measurement.bodyTextWidth,
    `${label} — LR2a: bodyText ${measurement.bodyTextWidth} < surfaceRoot ${measurement.surfaceRootWidth} − ${LR2A_CHROME_BUDGET_PX}; chrome spend ${measurement.chromeSpend}, ${measurement.characters} chars over ${measurement.lineBoxes} line boxes = ${measurement.charactersPerLineBox} cpl`,
  ).toBeGreaterThanOrEqual(measurement.surfaceRootWidth - LR2A_CHROME_BUDGET_PX);
  ```
  The message carries the two widths, the spend and the cpl **because AC2 requires those numbers to
  appear in the failure output**. Do not shorten it.

  ```ts
  export function recordMeasurement(testInfo: TestInfo, measurement: RecordedMeasurement): void
  ```
  Writes `JSON.stringify(measurement, null, 2)` to
  `test-results/legibility/<project>-<surface>-<viewportWidth>-<theme>.json`, where `<project>` is
  `testInfo.project.name.toLowerCase().replaceAll(" ", "-")`. Creates the directory with
  `mkdirSync(directory, { recursive: true })` from `node:fs`. Path is built from `process.cwd()`.

  `tests/e2e/disclosure-legibility.spec.ts` after the edit: keeps `ROUTES`, `VIEWPORTS`, `THEMES`
  and both `test.describe` blocks exactly as they are, imports everything else from
  `./support/legibility`, and calls `assertLr2b` wherever it called `assertLr2`. **No other change.
  The file must still enumerate 48 cases.**

  No comments in either file (`AGENTS.md` §8, enforced by `__tests__/comment-free-code.test.ts`,
  which covers `tests/`). English identifiers.

- **Tests:** none added. This task's correctness *is* the unchanged green of the 48 existing cases.

- **Done when:**
  - `pnpm exec playwright test --list tests/e2e/disclosure-legibility.spec.ts` prints **48** cases
    (run at `d8d12a6` in this tree: `PASS (0) FAIL (0) skipped (48)`).
  - `PORT=3100 pnpm e2e tests/e2e/disclosure-legibility.spec.ts` → **48 passed** (run at `d8d12a6`
    in this tree: `48 passed (28.4s)`). Use the `PORT` override: `playwright.config.ts` sets
    `reuseExistingServer: false`, so a dev server on 3000 makes the run fail for a reason that has
    nothing to do with the code (lesson 013).
  - `pnpm check` green (baseline in this tree at `d8d12a6`: 58 files, 504 tests passed).
  - Advances **AC6**.

---

### T2 — Add the measurement cases, and see them red

- **Files:**
  - `tests/e2e/alert-legibility.spec.ts` — **create**
  - `tests/e2e/wide-viewport.spec.ts` — **edit** (two cases added; the two existing cases untouched)
- **Depends on:** T1
- **Reuse:** everything from `tests/e2e/support/legibility.ts`. Write no new measurement primitive.

- **What to build:**

  **The consumer table.** Declare it once, at the top of `alert-legibility.spec.ts`, and drive every
  case from it. Every string below is the shipped string, frozen by `spec.md` § Out of scope:

  | id | route | role | title (used to pick the root) | how the state is reached — typing only (AC9) |
  |---|---|---|---|---|
  | `C1` | `/custo-da-hora` | `alert` | `Informe o seu salário bruto` | none — it is the cold-load default state |
  | `C2` | `/custo-da-hora` | `alert` | `Informe a carga horária mensal` | `await page.getByLabel("Carga Horária Mensal").fill("")` |
  | `C3` | `/custo-da-hora` | `status` | `A carga mensal não combina com a jornada diária` | `await page.getByLabel("Carga Horária Mensal").fill("200")` — the daily journey defaults to 8h48, whose coherent divisor is 220 (`lib/salary-period.ts`), so 200 mismatches |
  | `C4` | `/` | `alert` | `Confira seus horários` | `const lunchStart = page.getByLabel("Hora para Saída Almoço"); await lunchStart.fill("0700"); await lunchStart.blur();` — 07:00 precedes the 08:00 entry default, so `lib/journey.ts` returns the `lunchStart` order issue |
  | `C5` | `/` | `status` | `Você passou de 2h extras hoje` | `await page.getByRole("radio", { name: "MANUAL" }).check();` then `const exit = page.getByLabel("Hora para Saída Real"); await exit.fill("2000"); await exit.blur();` |

  **Why C5 is driven in MANUAL mode and why that exact time.** In AUTO the exit is recomputed
  against the wall clock (`hooks/use-work-calculator.ts`, `latestOf(displayExit, currentTime)`), so
  the measurement would depend on when CI runs. MANUAL pins it. With the defaults — entry 08:00,
  lunch 12:00→13:00, 8h48 expected — a 20:00 exit gives 660 worked minutes against 528 expected,
  i.e. 132 minutes of overtime, over the 120 of `lib/compliance.ts`'s
  `DAILY_OVERTIME_LIMIT_MINUTES`. Exactly **one** warning renders: the lunch is 60 minutes so
  neither break warning fires, and `minutesSincePreviousShift` is `null` on a first visit so the
  rest-between-shifts warning cannot. Its `detail` is the 207-character string
  `lib/compliance.ts:31-34` — the longest C5 carries, and the one `design.md` §4.3 predicts against.
  Assert `await expect(root).toHaveCount(1)` before measuring, so a second banner appearing is a
  failure and not a silently-wrong measurement.

  **Locators, identical for all five:**
  ```ts
  const root = page.getByRole(consumer.role).filter({ hasText: consumer.title });
  const title = root.locator("p").nth(0);
  const bodyText = root.locator("p").nth(1);
  ```
  `nth(0)`/`nth(1)` are stable across the remedy: the root contains exactly two `<p>` elements
  before and after, in the same order. Before measuring, assert **both**
  `await expect(root).toHaveCount(1)` and `await expect(title).toHaveText(consumer.title)`, for
  every consumer and not only for C5 — C1 stays on screen while C2's and C3's states are driven, so
  `/custo-da-hora` legitimately holds two banners at once and the filter is what separates them. A
  mis-picked node must fail loudly instead of measuring the wrong box.

  **Describe A — `Alert banner legibility — C1 to C5`.** For each consumer × each viewport of
  `[{ width: 390, height: 844 }, { width: 1440, height: 900 }]` × each theme of
  `["light", "dark"]`, one case titled
  `` `${id} stays legible at ${route} ${width}x${height} ${theme}` ``. Each case, in this order:

  1. `await page.setViewportSize(viewport)`; `await page.emulateMedia({ colorScheme: theme })`;
     `await page.goto(consumer.route)`.
  2. Run the consumer's drive steps from the table.
  3. `await expect(root).toBeVisible()`; the count and title assertions above;
     `await waitForStableBoundingBox(root)`.
  4. `const measurement = await measureSurface(root, bodyText)`.
  5. **`recordMeasurement(testInfo, { ...measurement, surface: id, route, viewportWidth, theme,
     project: testInfo.project.name })` — before any assertion**, so the red run of this task still
     produces the numbers AC2 and AC11 need.
  6. `await assertLr1(root)`.
  7. `expectLr2a(measurement, label)` where
     `` label = `${id} ${route} ${width}x${height} ${theme}` ``.
  8. LR3, in the form each surface can carry:
     - **C1 only:** `await assertLr3(page, "/custo-da-hora", root, "Sem ele os valores abaixo")` —
       the full rule, server marker included. C1 is the cold-load default state and **is** in the
       server HTML: `curl -s http://localhost:3100/custo-da-hora | grep -c "Sem ele os valores
       abaixo"` printed `1` in this tree against the production build, which is why this marker and
       not the title is the one named.
     - **C2–C5:** `await assertLr3Rendering(root)` — the same seven visibility, opacity, display,
       `hidden`, closed-`details`, collapsed-region and on-screen assertions. The server-marker half
       is **not** asserted for them and must not be faked: their condition is a client state the
       user creates by typing, so it is absent from the server HTML by construction, not by a
       defect. This split is the plan's decision; do not add the marker check to C2–C5, and do not
       drop the rendering check from any of them.
  9. At 1440 only: `await assertLr2b(bodyText)`.
     **At 390: no cpl assertion of any kind** — `spec.md` D-Q1 and AC11. The value is recorded in
     step 5 and judged by nobody.

  **Describe B — `Untouched disclosure geometry — DS1, DS2, DS4`.** One case per viewport × theme
  (4 per project), titled `` `records DS1, DS2 and DS4 geometry at ${width}x${height} ${theme}` ``.
  It asserts nothing; it exists so AC6's before/after comparison has two files to diff.

  1. `await page.setViewportSize(viewport)`; `await page.emulateMedia({ colorScheme: theme })`.
  2. `await page.goto("/custo-da-hora")`;
     `await page.getByLabel("Salário Bruto (R$)").fill("500000")` — this persists to `localStorage`
     (`hooks/use-salary-calculator.ts`), which is what makes DS2 reachable on the other route.
  3. `await page.goto("/")`; drive C5's two steps (MANUAL, exit `2000`) so overtime exists; DS2 then
     renders because `restDayPay > 0` (`components/organisms/day-summary.tsx:132`).
  4. Record DS1: root = body = `page.locator(DS1_FOOTER_SELECTOR)`.
  5. Record DS2: root = body = `page.getByText("O DSR (Súmula 172 do TST)")`.
  6. `await openPrivacySettings(page, "/")` — it reloads with the consent key removed; the salary
     and journey state survive in `localStorage`. Record DS4: root = body =
     `page.locator(DS4_PANEL_SELECTOR)`. Record it **last**, because the open dialog can lock the
     scrollbar and shift the page's own widths.

  **`tests/e2e/wide-viewport.spec.ts`** — inside the existing
  `for (const { name, width, height } of WIDE_VIEWPORTS)` loop, after the two existing cases, add:

  ```
  test("keeps the alert banner's chrome inside its budget", …)
  ```
  which drives C5 exactly as above on `/`, measures with `measureSurface`, calls
  `recordMeasurement` with `surface: "C5"` and `theme: "light"`, then `expectLr2a`. This file is
  already chromium-only and already at 2560/3840 (`playwright.config.ts` ignores it for both mobile
  projects), so no config change is needed and no case multiplies. Leave the two existing cases and
  the file's `test.use`/`beforeEach` untouched.

  No comments. English identifiers. pt-BR only inside the quoted UI strings above, which are
  reproduced character for character from the source — `lib/compliance.ts:32`,
  `components/organisms/salary-calculator.tsx:124,130,144`,
  `components/organisms/journey-form.tsx:176`. Do not retype them from this document by hand; copy
  them from the source files.

- **Tests:** this task *is* the test. It adds no unit test.

- **Done when — read this clause twice:**

  - `pnpm exec playwright test --list tests/e2e/alert-legibility.spec.ts` enumerates
    **(5 consumers × 2 viewports × 2 themes + 4 DS cases) × 3 projects = 72** cases.
  - `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts` **fails**, and the failure output
    contains a red `C1 … 390x844 light` line and a red `C5 … 390x844 light` line, each printing its
    `surfaceRoot` width, its `bodyText` width, the chrome spend and the cpl. **A green run here
    means this task failed**: it means the assertion cannot see the defect that is live in
    production, and the fix that follows would prove nothing. Expected spend on the unfixed tree:
    **66** at 390 and 1440, per `design.md` §4.1 — a spend that is neither 66 nor within a pixel of
    it is itself a finding and goes to `STATUS.md` before T3 starts.
  - `PORT=3100 pnpm e2e tests/e2e/wide-viewport.spec.ts` **fails** on the two new cases with a spend
    of **74** (2560) and **74** (3840); the two pre-existing cases still pass.

    **Corrected at run 2 — this clause originally read 70 at 2560 and it was wrong** (§ Finding 1,
    ruled). The root font-size is **18px at a viewport of exactly 2560**, not 17px: `160rem` in a
    media feature resolves against the browser's *initial* root size, i.e. 2560px exactly, so both
    `min-width: 120rem` and `min-width: 160rem` match at 2560 and the later rule wins. Measured in
    this tree, in chromium: `1919 → 16px · 1920 → 17px · 2559 → 17px · 2560 → 18px · 3840 → 18px`.
    The 17px band is `[1920, 2559]` and **no reference viewport in this matrix sits in it**.
    T2's run satisfied this clause as corrected: `surfaceRootWidth 961`, `bodyTextWidth 887`,
    `chromeSpend 74` at both 2560 and 3840, recorded in `evidence/measurements-before/`.
    **T2 is not re-run for this.**
  - The failing output of both commands is saved to
    `.specs/0006-salary-alert-legibility/evidence/e2e-red-before-remedy.txt`, and
    `test-results/legibility/` is copied to
    `.specs/0006-salary-alert-legibility/evidence/measurements-before/`.
  - `pnpm check` green — it does not run Playwright, so the red e2e does not block it.
  - Advances **AC2**, and puts **AC4**, **AC11** and the AC6 baseline in place.

---

### T2b — Close the pre-hydration drive race and re-capture a complete before-baseline

> Added at run 2 (§ Finding 2, ruled). It is ordered **before T3** because the baseline it repairs
> must be measured on the **unfixed** atom, and T3 fixes the atom.

- **Files:**
  - `tests/e2e/support/legibility.ts` — **edit** (one export added; nothing existing changes)
  - `tests/e2e/alert-legibility.spec.ts` — **edit** (drive steps wrapped; Describe B gains one wait)
  - `tests/e2e/wide-viewport.spec.ts` — **edit** (only the C5 case T2 added; the two pre-existing
    cases and the file's `test.use`/`beforeEach` stay untouched)
- **Depends on:** T2
- **Reuse:** `expect` from `@playwright/test`, and the drive steps already written in T2 — they are
  not rewritten, they are wrapped. Add no library, no fixture, no custom retry loop, and **no
  `page.waitForTimeout`**.

- **The root cause, so the remedy is not mistaken for a patch on Describe B:**

  Every banner in this suite renders from React state, and every drive step writes to a **controlled**
  input — `components/molecules/currency-input.tsx` binds `value={displayValue}`, and
  `Carga Horária Mensal` binds `value={monthlyHours || ""}`
  (`components/organisms/salary-calculator.tsx:109`). A `fill()` that lands before hydration writes
  the DOM node and is then **reverted by React's first controlled render**. The banner never appears,
  `toBeVisible()` times out, and `measureSurface` is never reached — so the case records no JSON at
  all.

  That is one defect with several symptoms, and the evidence carries more of them than Finding 2
  reported. Across T2's two runs the **union** of `evidence/measurements-before/` is 80 files where
  96 were due, and the holes are not only in Describe B: `chromium-C2` ×1, `chromium-C3` ×1,
  `mobile-safari-C3` ×2 and `mobile-safari-C4` ×2 are missing as well — precisely the four drive-fed
  consumers, and never `C1`, which is the one surface with no drive at all. Describe B's
  `localStorage` race is the same failure one route earlier. **Fix it once, at the point every drive
  routes through**, rather than putting a wait in front of the two cases that were noticed.

- **What to build:**

  Add to `tests/e2e/support/legibility.ts`, exported after `expectLr2a`:

  ```ts
  export async function driveUntil(
    drive: () => Promise<void>,
    settled: () => Promise<boolean>,
    label: string,
  ): Promise<void> {
    await expect
      .poll(
        async () => {
          await drive();
          return settled();
        },
        {
          message: `${label} — the drive never took effect; a controlled re-render is reverting it`,
          timeout: 20_000,
          intervals: [250, 500, 1000, 2000, 2000],
        },
      )
      .toBe(true);
  }
  ```

  **Every drive passed to it must be idempotent** — re-running it must be a no-op once it has taken.
  All five drives in T2's consumer table already are (`fill("")`, `fill("200")`,
  `fill("0700") + blur()`, `check()` on a radio, `fill("2000") + blur()`). Never pass a drive that
  appends, toggles, increments or clicks *Adicionar*.

  **`settled` must be a non-waiting predicate.** Use `locator.isVisible()` / `locator.isHidden()`,
  which return the current state immediately. Do **not** put `await expect(root).toBeVisible()`
  inside the poll: it brings its own 5s wait per iteration, which turns five retries into a timeout
  and hides the retry that was supposed to fix the race.

  **Describe A** — replace T2's step 2 and the bare `toBeVisible()` of step 3 with:

  ```ts
  if (consumer.drive) {
    await driveUntil(() => consumer.drive(page), () => root.isVisible(), label);
  } else {
    await expect(root).toBeVisible();
  }
  ```

  C1 keeps the `else` branch: it is the cold-load default state, it has no drive, and it is the one
  consumer that never went missing. **Steps 3 through 9 are unchanged** — the `toHaveCount(1)` and
  title assertions, `waitForStableBoundingBox`, `measureSurface`, `recordMeasurement` **before** any
  assertion, `assertLr1`, `expectLr2a`, the `assertLr3`/`assertLr3Rendering` split, and the
  1440-only `assertLr2b`. `driveUntil` is inserted; nothing is removed or reordered.

  **Describe B** — steps 2 and 3 become:

  ```ts
  await page.goto("/custo-da-hora");
  const salary = page.getByLabel("Salário Bruto (R$)");
  const missingSalary = page.getByRole("alert").filter({ hasText: "Informe o seu salário bruto" });
  await driveUntil(() => salary.fill("500000"), () => missingSalary.isHidden(), `${label} — gross salary`);
  await page.waitForFunction(
    () => Number(window.localStorage.getItem("grossSalary") ?? "0") > 0,
    null,
    { timeout: 20_000 },
  );
  await page.goto("/");
  await driveUntil(
    async () => {
      await page.getByRole("radio", { name: "MANUAL" }).check();
      const exit = page.getByLabel("Hora para Saída Real");
      await exit.fill("2000");
      await exit.blur();
    },
    () => page.getByText("O DSR (Súmula 172 do TST)").isVisible(),
    `${label} — overtime`,
  );
  ```

  **Two waits on the first route, and both are load-bearing — do not drop either:**

  1. `driveUntil` on C1's banner **disappearing** proves React received the value. `hasGrossSalary`
     is exactly what renders C1 (`components/organisms/salary-calculator.tsx:123`), so C1 going away
     is the app's own confirmation that the controlled state committed. A `toHaveValue("500000")`
     check cannot do this job: `CurrencyInput` displays `formatCurrencySimple(value)`, so the input
     never holds the typed string.
  2. `waitForFunction` on the persisted key proves the `useEffect` at
     `hooks/use-salary-calculator.ts:135-148` **flushed**. React committing state and
     `localStorage.setItem` running are two different moments, and it is the second one that `/`
     reads back — which is the race Finding 2 named. The key is `grossSalary` (`lib/storage.ts:2`).
     Poll the **value**, not the key's presence: the effect writes `grossSalary.toString()`, so a
     stored `"0"` is a real value that means the fill was lost.

  Steps 4, 5 and 6 (DS1, DS2, then `openPrivacySettings` and DS4 **last**) are unchanged.

  **`tests/e2e/wide-viewport.spec.ts`** — the C5 case T2 added drives through `driveUntil`, settled
  on `() => root.isVisible()`. Nothing else in the file is opened.

  No fixed sleep anywhere. `0005` settled this class of problem by polling the real state until it
  stopped changing rather than sleeping a duration that drifts from the thing it waits on
  (`waitForStableBoundingBox` in `tests/e2e/disclosure-legibility.spec.ts`); this is that rule
  applied to a state that is *committed and persisted* rather than laid out.

  No comments. English identifiers.

- **Tests:** none added. This task is the instrument repairing itself; the case count does not move.

- **Done when:**

  - `pnpm exec playwright test --list tests/e2e/alert-legibility.spec.ts` still prints **72**, and
    `… tests/e2e/wide-viewport.spec.ts` still prints **4**.
  - `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts`, run **twice in a row**. In **both**
    runs: the C1–C5 cases are still **red** (AC2 is not weakened — the remedy is still not in the
    tree, and a green C-case here would mean the assertion stopped seeing the live defect), and
    **every one of the 12 Describe B cases passes**. One Describe B failure in either run means the
    race is not closed: do not proceed to T3, and do not average two runs into a verdict
    (lesson 014).
  - After each of the two runs, merge the measurements into the existing baseline **without deleting
    it**: `cp -r test-results/legibility/. .specs/0006-salary-alert-legibility/evidence/measurements-before/`.
    Playwright clears its `outputDir` at the start of every invocation, and
    `chromium-C5-2560-light.json` / `chromium-C5-3840-light.json` come from `wide-viewport.spec.ts`,
    which this task does not re-run — a `rm -rf` of the baseline loses them.
  - `ls .specs/0006-salary-alert-legibility/evidence/measurements-before/ | wc -l` → **98**: the full
    cross product {`chromium`, `mobile-chrome`, `mobile-safari`} × {`C1`…`C5`, `DS1`, `DS2`, `DS4`} ×
    {390, 1440} × {light, dark} = **96**, plus the two wide-viewport files. **The 98 is the point of
    this task.** T2's union across two runs was 80, and AC6's before/after diff cannot be judged
    against a baseline with holes in exactly the cases the flake hits.
  - Both runs' output is **appended** to `evidence/e2e-red-before-remedy.txt` under a
    `## T2b re-run` heading. Append, never overwrite — T2's original red output is AC2's proof and is
    not replaced by a later run.
  - `pnpm check` green (58 files, 504 tests).
  - Advances **AC2**, **AC6** and **AC9** — every state still comes from a shipped control, because
    `driveUntil` re-runs the same `getByRole`/`getByLabel` interactions and injects nothing.

---

### T3 — Move the icon out of the body's column and tighten the horizontal padding

- **Files:**
  - `components/atoms/alert-banner.tsx` — **edit**
  - `__tests__/alert-banner.test.tsx` — **edit** (four cases kept, two added, one strengthened)
- **Depends on:** T2b
- **Reuse:** `cn()` from `lib/utils`, `TONE_CLASSES` as it stands, `IconAlertTriangle` passed by
  every consumer. Nothing is imported, added or installed.

- **What to build:**

  Replace the returned JSX of `AlertBanner` with exactly this, changing nothing else in the file —
  not the props interface, not `TONE_CLASSES`, not the `role` expression, not the `id` binding:

  ```tsx
  return (
    <div
      id={id}
      role={tone === "danger" ? "alert" : "status"}
      className={cn("rounded-lg border px-3 py-4", TONE_CLASSES[tone], className)}
    >
      <div className="space-y-1 text-body-sm">
        <div className="flex items-start gap-3">
          <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p className="font-semibold">{title}</p>
        </div>
        {children}
      </div>
    </div>
  );
  ```

  What changed, and nothing else may: `flex items-start gap-3` leaves the root and becomes the new
  title-row `<div>`; `p-4` becomes `px-3 py-4`; the `<Icon>` moves inside the title row, next to the
  title `<p>`. **Forbidden in this diff:** any `sm:`/`md:`/`lg:` padding variant, `px-3.5`, an
  `items-center` on the title row, an icon size other than `h-5 w-5`, a `transition`/`animate`/
  `motion-*` utility, a heading element in place of the title `<p>`, a dismiss control, a `tabIndex`,
  and any change to `role`, `id`, radius, border, tone classes or `space-y-1`.

  Do not touch any consumer. `components/organisms/salary-calculator.tsx`,
  `journey-form.tsx` and `day-summary.tsx` must not appear in `git diff --stat`.

- **Tests** — `__tests__/alert-banner.test.tsx`:

  Keep the six existing cases as they are, except the `id` case, which is strengthened, and add two.
  Query by accessible role and name. **Assert no class string anywhere in this file.**

  1. *(existing, unchanged)* announces a danger banner as an alert.
  2. *(existing, unchanged)* announces a warning banner as a status.
  3. *(existing, unchanged)* renders the supporting content below the title.
  4. *(existing, unchanged)* hides the decorative icon from assistive technology.
  5. *(strengthened)* **"keeps the id on the element that carries the role"** — render with
     `id="journey-issue"` and a body `<p>`; assert `screen.getByRole("alert")` has the attribute
     `id="journey-issue"` **and** that the same element contains the icon and the body text. This is
     `DateTimeInput`'s `aria-describedby` target; a bare `toHaveAttribute` cannot see the `id`
     migrating onto the title row.
  6. *(existing, unchanged)* merges custom className.
  7. **(new) "keeps the body text out of the icon's row"**:
     ```tsx
     const { container } = render(
       <AlertBanner icon={IconAlertTriangle} tone="danger" title="Confira seus horários">
         <p>A saída precisa vir depois da volta do almoço.</p>
       </AlertBanner>,
     );
     const iconRow = container.querySelector("svg")?.parentElement;
     expect(iconRow?.contains(screen.getByText("Confira seus horários"))).toBe(true);
     expect(iconRow?.contains(screen.getByText("A saída precisa vir depois da volta do almoço."))).toBe(false);
     ```
     This is the +32px stated as a DOM fact. It is the only half of the remedy jsdom can see; the
     geometry itself is proved by T2's assertions in a browser, per `AGENTS.md` §8.
  8. **(new) "adds no focusable element to the banner"** — render with a body and assert
     `container.querySelectorAll("a, button, input, select, textarea, [tabindex]")` has length `0`.
     Guards `spec.md` § Non-goals (no dismiss, no collapse, no focus stop) and `design.md` §7.1.

  **No reduced-motion case is added, on purpose** — see § Test strategy. If a `motion-*` utility
  ever appears on this atom, it needs a paired neutralizer *and* a new spec, because `design.md` §8
  forbids the animation itself.

- **Done when:**
  - `pnpm test __tests__/alert-banner.test.tsx` → 8 passed.
  - `pnpm check` green, with **504 + 2 = 506** tests passing (baseline measured in this tree at
    `d8d12a6`: 58 files, 504 tests). A drop anywhere else means a sibling test was reading the old
    DOM shape — fix the sibling test's structure assertion, never the atom.
  - `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts` → **72 passed**, and every
    `chromeSpend` recorded at 390 and 1440 is **26** (`design.md` §4.1). A spend of 34 means the
    padding did not change; a spend of 58 means the icon did not move.

    Run it **twice**, and require 72 passed in both. T2b closed a real flake in this instrument, and
    a suite that reports a pass non-deterministically is worse than one that fails: this is the
    permanent CI guard chosen over a class-string assertion, and a single flaky pass here would
    retire the only thing that can see this defect come back. One failure in either run is a finding
    for `STATUS.md`, not a re-run until green.
  - `PORT=3100 pnpm e2e tests/e2e/wide-viewport.spec.ts` → all cases pass, with a recorded
    `chromeSpend` of **29** at 2560 **and 29** at 3840, and in both files
    `surfaceRootWidth 961` and `bodyTextWidth 932`.

    **Corrected at run 2 — this clause originally read 27.5 at 2560** (§ Finding 1, ruled). Both
    widths sit at an 18px root, so both spend `2 + 2 × 13.5 = 29` of the 32, with 3px of headroom.
    A recorded `27.5` here now means the root resolved to 17px and something moved in
    `app/globals.css`'s breakpoints — which this spec does not open, so it is a finding, not a pass.
  - `PORT=3100 pnpm e2e tests/e2e/disclosure-legibility.spec.ts` → **48 passed**, unchanged.
  - Advances **AC3**, **AC4**, **AC5**, **AC6**, **AC7**, **AC8**.

---

### T4 — Full verification pass and evidence capture

- **Files:** none in `app/`, `components/`, `hooks/` or `lib/`. Writes only into
  `.specs/0006-salary-alert-legibility/evidence/` (gitignored) and `STATUS.md`.
- **Depends on:** T3
- **Reuse:** `node .agents/tools/preview.mjs`, the existing suites. Write no new script.

- **What to build:** nothing. Run, capture, and hand over.

  1. `PORT=3100 pnpm e2e` — the whole suite, all projects. Save the tail to
     `evidence/e2e-green-after-remedy.txt`.
  2. Copy `test-results/legibility/` to `evidence/measurements-after/`. `PORT=3100 pnpm e2e` runs
     `wide-viewport.spec.ts` too, so this single run produces all **98** files with no merge step —
     confirm the count before moving on.
  3. `diff -r evidence/measurements-before/ evidence/measurements-after/` — filtered to the `DS1`,
     `DS2` and `DS4` files, **all 36 of them must be present on both sides and every field must be
     identical**. A file missing on either side is the same failure as a field that moved: it means
     the comparison was never made for that case. Save the diff output to
     `evidence/ac6-untouched-geometry.txt`. Any difference in a DS file is a finding for
     `STATUS.md`, not something to explain in prose.
  4. `pnpm test:coverage` — `lib/**` and `hooks/**` at 100%, `app/**` and `components/**` at ≥ 90%.
     Neither threshold is touched by this spec; `vitest.config.ts` is not edited.
  5. `node .agents/tools/preview.mjs --out .specs/0006-salary-alert-legibility/evidence/` —
     screenshots in both themes at both viewports, axe-core, console errors. Zero violations at
     `serious` or `critical`; zero console errors.
  6. `git diff --stat main -- lib/` → **empty**. `git diff main -- components/ app/ lib/` contains
     no added or removed pt-BR text node. Paste both into `STATUS.md`'s decisions log line for this
     task.
  7. `grep -rn "AlertBanner" app components lib hooks __tests__ tests` — the AC1 search. It now
     returns one more file than `spec.md` § Scope's E1 run: `tests/e2e/alert-legibility.spec.ts`.
     That is a test file, not a consumer; note it in the hand-off so QA does not read it as a sixth
     surface.

- **Done when:** every command above has run and its output is in `evidence/`; `STATUS.md` carries
  the build gate as closed with the run number. Advances **AC1**, **AC6**, **AC10**, **AC11**.

---

## The blocker, ruled

`STATUS.md` § Blockers carried one item to the human: `design.md` §12.2's three factual drifts in
`DESIGN.md`'s *Alerts* entry, with the designer recommending all three be carried as debt.

**Ruling: D1 and D2 are corrected now, by `product-designer`, at G3 run 2. D3 is carried as debt.**

| # | What | Ruling | Why |
|---|---|---|---|
| **D2** | "16px padding" becomes false the moment this ships | **Correct it** | `AGENTS.md` §7 makes `release-manager` certify at G7 that a `DESIGN.md` system change landed and that the docs describe what was *built*. Carrying D2 means shipping a sentence the docs gate must certify as true and which this spec makes false. `spec.md` closes `DESIGN.md` to protect **the spacing scale and the type ramp** (lesson 019 — the exclusion is stated as the property it protects); a padding value in one component entry is neither. No new token, no new step, no scale change: `design.md` §12.1 is explicit. |
| **D1** | The entry names `components/molecules/alert-banner.tsx`; the file is in `atoms/` | **Correct it** | It is the heading of the very line D2 rewrites. Fixing a one-word path while the sentence is already open is cheaper than a second spec, and leaving it makes the corrected entry point at a file that does not exist. |
| **D3** | § Motion lists "alert" among animating surfaces; the atom has no transition | **Carry as debt.** Owner: `product-manager`, in the next spec with scope over `DESIGN.md` § Motion. Record in `spec.md` § Carried debt alongside X1. | It is pre-existing, it is in a different section, and closing it is a *system decision* — it either removes alerts from the animating set or obliges a future banner to animate — while `DESIGN.md` § Motion's own rule forbids animating anything a keystroke queues (`design.md` §8). That is a design-system question with a human in it, not a factual typo. It also does not become newly wrong when this ships. |

**This is a bounce to G3, not an edit made here.** `DESIGN.md` is `product-designer`'s file
(`AGENTS.md` §3); a tech-lead editing it is exactly the boundary violation the squad is built to
prevent. The exact substitute text is below so the designer applies it rather than re-derives it.

### Verbatim substitute for `DESIGN.md` lines 538–540

```markdown
### Alerts — `components/atoms/alert-banner.tsx`

`--radius-lg`, 16px vertical and 12px horizontal padding, 1px border in the data hue at 30%, fill in the hue's `-soft`, text in its `-ink`, icon 20px in its `-ink` sharing the title's line, with the body text running the full width of the banner beneath it. The horizontal padding is one step tighter than the vertical on purpose: the body text column is measured against the banner's own root, and a banner may spend no more than 32 CSS px of border and horizontal padding between the two. Two tones: **warning** uses Overtime Amber (a CLT limit approached), **danger** uses Debit Red (an input the app cannot use). `role="alert"` for danger, `role="status"` for warning, as already implemented.
```

**Run against the guard before mandating it** (lesson 022, and the B8 bounce `0005` paid for this
exact move). `__tests__/spacing-guards.test.ts` is the only test that reads `DESIGN.md`, and it
asserts two things about it: no `--spacing-<non-numeric>` occurrence anywhere in the file, and every
key under the frontmatter `spacing:` block parses as a number. The text above contains **no**
`--spacing-` token of any kind and touches no frontmatter — checked with the guard's own two regexes
against the replacement text, which returned `named --spacing occurrences: [] | named spacing
utilities: []`. It also names no spacing utility (`px-3`, `py-4`), deliberately: it states the
measurements in px so a later scale rename cannot make the sentence lie.

`product-designer` may refine the prose, on one condition: the facts — `atoms/`, 16px vertical, 12px
horizontal, the icon on the title line, the body full width, the 32px budget — must all survive, and
the replacement must be re-run against `pnpm test __tests__/spacing-guards.test.ts` before it is
handed back.

---

## The two T2 findings, ruled — run 2

`STATUS.md` § Blockers carried two findings from T2. Both are ruled here; neither is handed to the
human; the build resumes at **T2b** with no decision left in front of it.

### Finding 1 — the 2560 row. **Bounce to G3, run 2. The conclusion holds; the arithmetic does not.**

**Verified by compiling and by measuring, not by reading the CSS** (lesson 017; `AGENTS.md` §5, which
is lesson 012 promoted). Two independent checks were run in this tree:

1. A chromium probe over `app/globals.css`'s two root-size steps:
   `1919 → 16px · 1920 → 17px · 2559 → 17px · **2560 → 18px** · 2561 → 18px · 3839 → 18px · 3840 → 18px`.
   A length in a media **feature** resolves against the browser's *initial* root font-size, so
   `160rem` is exactly 2560px; at 2560 both `min-width: 120rem` and `min-width: 160rem` match and
   the later rule wins. The 17px band is `[1920, 2559]`, and **no reference width in this matrix
   sits in it**.
2. T2's own recorded measurements against the production build:
   `chromium-C5-2560-light.json` and `chromium-C5-3840-light.json` both read
   `surfaceRootWidth 961`, `bodyTextWidth 887`, `chromeSpend 74` — identical apart from
   `viewportWidth`.

**Does the conclusion survive, or only the arithmetic behind it?** Only the arithmetic moved. The
designer's ruling was that the deciding viewport is the widest, *because the budget is in px and the
padding is in `rem`* — and that mechanism is untouched. What changes is which viewports sit at which
root, not what a root costs: the spend is still **26** at 16px, **27.5** at 17px and **29** at 18px.
`px-3` still clears everywhere (29 ≤ 32, 3px of headroom) and `px-3.5` still fails (2 + 2 × 15.75 =
**33.5**). The correction *widens* the band in which `px-3.5` is red — from `{3840}` to *every width
from 2560 up* — so it strengthens the §3.2 rejection rather than reopening it. **The remedy does not
change: `px-3 py-4`, icon out of the body's column, exactly as T3 already specifies.**

**This is a bounce to G3 — `design.md` is `product-designer`'s file** (`AGENTS.md` §3), and unlike the
`DESIGN.md` D1/D2 item it is a wrong number *in the gate artifact itself*, one this plan carried into
two acceptance clauses and one that stopped the build. It is recorded as **design bounce 1 of 2**,
not as a documentation change. Calling it anything else would be laundering a bounce count.

**It does not block T2b or T3.** The corrected numbers are already in T2's and T3's Done-when above;
`product-designer` corrects `design.md` in parallel with G5, exactly as the `DESIGN.md` fix was.

**Verbatim substitutes.** Six edits, all confined to the root-size model. No token, step, curve or
remedy moves; `design.md` §§0, 5, 6, 7, 8 and 12 are not opened.

1. `design.md` §4.1, the **2560** and **3840** table rows, replacing both:

   ```markdown
   | **2560** | **18px** | 36px (`sm:p-8`) | **961.00** | 887.00 | **74** ✗ | **932.00** | **29** ✔ | 3px |
   | **3840** | 18px | 36px (`sm:p-8`) | **961.00** | 887.00 | **74** ✗ | **932.00** | **29** ✔ | 3px |
   ```

2. `design.md` §4.1, the derivation paragraph beginning *"Derivations for 2560 and 3840"*, replacing
   it whole:

   ```markdown
   **Derivations for 2560 and 3840 — they are the same row.** `app/globals.css` steps the root at
   `@media (min-width: 120rem)` → 106.25% and `@media (min-width: 160rem)` → 112.5%, and a length in a
   media *feature* resolves against the browser's **initial** root font-size (16px), never against the
   cascaded one — so `160rem` is exactly **2560px**. At a viewport of exactly 2560 both queries match
   and the later rule wins: the root is **18px**, identical to 3840. Measured in chromium in this tree:
   `1919 → 16px · 1920 → 17px · 2559 → 17px · 2560 → 18px · 2561 → 18px · 3840 → 18px`. The 17px band is
   `[1920, 2559]`, and **no reference width in this matrix sits in it**. From there the chain of §0.2 is
   identical at both widths: `--container-app` = 100rem = **1800**; gutter and card padding `px-8` /
   `sm:p-8` = 2rem = **36**; `grid-cols-12 gap-8` gives a track of **117**, so the `lg:col-span-7` main
   column is **1035.00** and the card's content box is **961.00**. The banner's intended chrome is
   2 (border) + 2 × `px-3` = 2 + 2 × 13.5 = **29**. Both rows are confirmed against the production build:
   `evidence/measurements-before/chromium-C5-2560-light.json` and `…-3840-light.json` record
   `surfaceRootWidth 961`, `bodyTextWidth 887`, `chromeSpend 74`, identical apart from `viewportWidth`.
   ```

3. `design.md` §4.1, the paragraph beginning *"**Note the direction of the headroom.**"*, replacing
   it whole:

   ```markdown
   **Note the direction of the headroom.** The spend *grows* with the root size because the padding is
   in `rem` and the budget is in px: **26** at a 16px root, **27.5** at 17px, **29** at 18px. The binding
   case is therefore **every viewport at an 18px root — every width from 2560 up** — at 29 of 32, and not
   390. This is why `px-3.5` is rejected in §3.2 even setting the eight-step rule aside: it measures
   2 + 2 × 15.75 = **33.5** at an 18px root and fails the rule it was chosen to satisfy on every screen
   from 2560 up. Correcting the 2560 row *widens* that failing band; it does not rescue the half-step.
   ```

4. `design.md` §4.2, the `LR2a @ 2560` column: **`27.5 ✔` → `29 ✔` for all five consumers**, C1
   through C5. Nothing else in that table moves.

5. `design.md` §3.2, consequence 1, replacing its second and third sentences:

   ```markdown
   It does not grow with the root font size, so a padding expressed in `rem` eats a larger share of it at
   2560 and 3840 — both an 18px root — than at 390 and 1440, which are both 16px. Any remedy has to clear
   the budget at an **18px root**, that is at every width from 2560 up, not at 390 (§4.4).
   ```

   and consequence 3's closing clause: *"…and spends **26 of the 32**, leaving 6px of headroom at 390
   and 1440, and 3px from 2560 up."*

6. `design.md` §3.2, the candidate table's `px-3.5` row verdict cell, and the matching § Risks row:

   ```markdown
   | `px-3.5` — 14px | 28 | 30 | **no** — 3.5 is not one of `0.5, 2, 3, 4, 6, 8, 12, 16` | **Forbidden.** Also fails from 2560 up (§4.4): 2 + 2×15.75 = **33.5** |
   ```

   ```markdown
   | `px-3.5` is chosen as a compromise | Green at 390 and 1440; **red at 2560 and 3840** (spend 33.5) — a band twice as wide as §4.4 first modelled, and still where nobody looks |
   ```

`product-designer` may refine the prose on one condition: the facts — an 18px root from 2560 up, the
17px band confined to `[1920, 2559]`, `961.00`/`887.00`/`74` now and `932.00`/`29` intended at both
wide widths, `px-3` clearing at 29 of 32, `px-3.5` red from 2560 up — must all survive. No guard reads
`design.md`, so there is no destination test to re-run (lesson 022's check applied and answered).

### Finding 2 — the Describe B race. **Ruled here, as T2b above. No bounce.**

It is a defect in the instrument this plan chose, so it is this gate's to fix, and the developer was
right to refuse to invent a synchronization strategy. The strategy is `driveUntil` + a
`waitForFunction` on the persisted key, both specified to the line in T2b, with the reasoning for
each and the reason a `toHaveValue` check cannot substitute for either.

Two things the finding under-reported, and they are why the remedy is not a wait in front of
Describe B: the same race also cost **six Describe A measurements** (`chromium-C2`, `chromium-C3`,
`mobile-safari-C3` ×2, `mobile-safari-C4` ×2), and it never once cost `C1` — the only consumer with
no drive. One root cause, one fix, at the point every drive routes through.

---

## Risks

| Risk | Signal it happened |
|---|---|
| T2 is run after T3, or T2 comes back green | `evidence/e2e-red-before-remedy.txt` shows passes. AC2 is then unsatisfiable for this cycle without reverting, and the tree is read-only for revert-measure probes (`AGENTS.md` §4, rule 6) — the measurement would have to be re-taken in an isolated worktree, at the cost of a round trip. |
| The `id` migrates onto the new title row | Every visual check passes; `DateTimeInput`'s `aria-describedby` at C4 resolves to nothing; unit case 5 fails, and if it were weakened to a bare `toHaveAttribute`, only axe at G6 would catch it. |
| `text-body-sm` gets collapsed onto the root "to simplify" | The 390 measurements move without any spacing change explaining it, and a consumer passing a size class in `className` silently deletes the banner's type step (`DESIGN.md` *Type-Step-Is-Not-a-Colour Rule*). |
| A `sm:px-4` is added back for desktop breathing room | `chromeSpend` returns to 34 at every width ≥ 640: AC4 red at 1440 and 2560 and 3840, green at 390 — the exact inverse of today's signature. |
| `px-3.5` is chosen as a compromise | Green at 390, 1440 and 2560; **red at 3840** at a spend of 33.5. Only the two wide-viewport cases added in T2 can see it. |
| The 390 cpl residual is read as a failed criterion | A type-ramp change, a `text-caption` on the body, or a shortened string appears in the diff. D-Q1 is settled by the human and closed; a cpl below 40 at 390 is never on its own a failure. Reported under AC11, never absorbed. |
| C5's drive produces two banners instead of one | `toHaveCount(1)` fails in T2 before any measurement. If the assertion were omitted, `getByRole().filter()` would resolve to a strict-mode violation or to the wrong box, and the recorded numbers would be silently about a different string. |
| The C5 or C4 drive is replaced by an injected state or a test-only prop to make it deterministic | AC9 fails on reading the test file. Every state must come from `getByRole`/`getByLabel` interactions on shipped controls. |
| A measurement varies between runs | `spec.md` § Note on the instrument's spread: layout values were identical to two decimals across themes at `0005`. Any variance is itself a finding and is reported **before** the criterion is judged, not averaged away (lesson 014). |
| The existing 48 cases change count or behaviour during the T1 extraction | `--list` prints anything other than 48, or a DS1/DS4 case fails. LR2b's 40-cpl floor still binds DS1 and DS4 at both viewports — they are 12px type and are **not** covered by the 390 exemption. |
| T2b's race is "fixed" with a `page.waitForTimeout` | A sleep appears in `tests/e2e/`. It passes locally and returns on a loaded CI runner, because a fixed duration drifts from the thing it waits on — the defect `0005` already paid for once. The signal is a suite that is green on a laptop and red on a PR, or worse, green on both while measuring a state that had not committed. |
| `driveUntil` is given a non-idempotent drive, or a waiting predicate | A drive that appends or toggles produces two banners and `toHaveCount(1)` goes red; an `expect(...).toBeVisible()` inside the poll makes every retry cost 5s, so the poll times out and the flake looks unfixed rather than mis-wired. |
| The baseline is re-captured with `rm -rf` before the copy | `measurements-before/` comes back at 96 instead of 98: `chromium-C5-2560-light.json` and `chromium-C5-3840-light.json` are gone, and AC6's wide-viewport half has nothing to diff against. |
| A `27.5` is recorded at 2560 after T3, or a `70` before it | The 17px root reappeared at 2560, which means `app/globals.css`'s breakpoints moved — a file this spec does not open. It is a finding, never a pass, and never a reason to edit the expected number back. |

---

## G6 triage — run 1, ruled

Four reviewers ran in parallel; all four reports are complete before any routing (`AGENTS.md` §4,
rule 4). **Two passes** (`web-standards-auditor`, `labor-law-analyst`), **two rejections**
(`qa-engineer`, `refactor-scout`) — and the two rejections are the *same* finding, reached
independently, with the same remedy. One bounce, one destination.

| # | Source | Finding | Ruling | Destination |
|---|---|---|---|---|
| **B1** | `reports/qa.md` Major + `reports/ponytail.md` F1 | The four-line C5 drive is written three times: `driveC5` at `alert-legibility.spec.ts:31-35`, inline at `:168-174`, inline at `wide-viewport.spec.ts:51-57`. | **Upheld.** `AGENTS.md` §8 "Reuse before writing". The three-similar-lines allowance does not apply: the abstraction exists, named, eleven lines above the first copy, and `tests/e2e/support/legibility.ts` is already the shared home T1 created for exactly this. Mechanical, no judgement left. | **`frontend-dev` — T5.** |
| **B2** | `reports/ponytail.md` F2 (non-blocking, routed here for a ruling) | `recordMeasurement` and its five call sites are permanent, unconditional JSON instrumentation with no consumer once AC6/AC11 evidence is captured. | **Remove, not document.** The evidence is captured and the *numbers* — not the files — are the durable record: AC11's ten rows are in `reports/qa.md` § AC11, re-measured independently in `reports/legal.md` §4.2, and `.specs/*/evidence/` is gitignored, so nothing downstream ever reads the JSON back. Removing the five calls leaves Describe B (`"Untouched disclosure geometry — DS1, DS2, DS4"`, 12 cases across three projects) driving, measuring and asserting **nothing** — so the block goes with them. AC6's permanent half is `disclosure-legibility.spec.ts`'s 48 cases, in a different file, untouched. | **`frontend-dev` — T6.** |
| **B3** | `reports/legal.md` F1 (conditional) | AC11's residual table may not have landed in `reports/qa.md`; `labor-law-analyst` wrote §4.2 in parallel and could not see it. | **Discharged — confirmed, nothing to do.** `reports/qa.md:188-212` carries all ten rows (5 consumers × 2 themes) with `surfaceRootWidth`, `bodyTextWidth`, chars, line boxes and cpl, each marked a reported residual rather than a judged criterion. The compliance rows read 37.00 (C2/DS5), 34.80 (C3/DS6) and 34.50 (C5/DS7) — identical to `reports/legal.md` §4.2, which additionally covers C5's other three warning strings at 33.83–36.80. **AC11 is met.** | **None.** Recorded in `STATUS.md`. |
| **B4** | `reports/legal.md` F2 (carried) | `px-3` spends 29.00 of the 32px budget at an 18px root; the budget is in CSS px and the padding is in `rem`, so any new root-ramp step above 18px breaks LR2a with nobody touching the atom. | **Carried by a written constraint at the edit site, not by a new guard.** A guard already exists and already runs: `expectLr2a` in `wide-viewport.spec.ts` measures the *highest* ramp band (18px, sampled at 2560 **and** 3840), and chrome spend is monotonic in root size, so sampling the top band bounds every band below it. The only thing a new step would slip past is the *sampling* — nobody adds a case for a band that did not exist when the case was written. That gap is closed by a sentence where the ramp is edited, not by code. | **`product-designer` — D4**, one verbatim sentence into `DESIGN.md`; **not a gate bounce** (`design` stays closed at run 2), same class as D1/D2. Long-term owner stays `product-manager` per `reports/legal.md` F2. |
| **B5** | `reports/qa.md` Minor 2 | `__tests__/alert-banner.test.tsx:54` asserts the Tailwind substring `"mb-6"`, against `AGENTS.md` §8. | **Carried debt, recorded with an owner.** Pre-existing verbatim (`git show d8d12a6:__tests__/alert-banner.test.tsx`), flagged non-blocking by the reviewer that found it, and the assertion is about a **pass-through prop reaching `className`** via `cn()`, not about rendered appearance — it is the letter of the rule, not the defect the rule exists to catch. Replacing it means choosing a new assertion strategy for behaviour this spec's defect never touches. | **None this spec.** Owner: the next spec that opens `AlertBanner`'s prop API. |
| **B6** | `reports/qa.md` Minor 3 | `STATUS.md` narrates "4 `contrastIncomplete` nodes"; `evidence/report.json` records 2+2+1+1 = **6**. | **Upheld and corrected in place.** A transcription error in this spec's own record, in a file `tech-lead` owns. No source change, no AC touched (`incomplete` is not a violation; AC10 gates `serious`/`critical` violations). | **Fixed in `STATUS.md` by `tech-lead`.** |
| **B7** | `reports/audit.md` F1 (informational) + lesson 029 | A stale `.next/` from an ads-on build scored best-practices **0.79** on the first Lighthouse pass; separately, a sibling agent's concurrent `pnpm build` overwrote `.next` mid-run and produced 5 false e2e failures. | **One hazard class, one rule, and it changes how G6 is measured from now on.** Every number this bounce produces must come from a process-isolated copy that owns its `.next` and its port. Lesson 029 is broadened from `qa-engineer` to **all** and extended to cover any claim derived from `.next` — e2e counts *and* Lighthouse categories. | **Procedure, baked into T5–T7's Done when.** |

### The measurement environment — binding on T5, T6 and T7

Every count and every number below is taken **only** in a process-isolated copy. In the shared tree
they prove nothing, because a sibling agent's `pnpm build` writes the same `.next`:

```bash
REPO="$(git rev-parse --show-toplevel)"
COPY="$(mktemp -d)/workload"
mkdir -p "$COPY"
rsync -a --exclude node_modules --exclude .next --exclude .git "$REPO"/ "$COPY"/
cp -al "$REPO"/node_modules "$COPY"/node_modules   # same filesystem, seconds, no reinstall
cd "$COPY" && rm -rf .next && PORT=3100 pnpm e2e [files]
```

`rm -rf .next` before the first build in the copy is not optional: Turbopack's persistent cache does
not invalidate the `AdManager` chunk when only a `NEXT_PUBLIC_*` flag changes between builds
(`reports/audit.md` F1). A run in the shared tree that disagrees with the copy is evidence about
contention, never about the code (lesson 029).

### T5 — Call `driveC5` instead of writing it twice more

**Files**

- `tests/e2e/support/legibility.ts` — edit
- `tests/e2e/alert-legibility.spec.ts` — edit
- `tests/e2e/wide-viewport.spec.ts` — edit

**What to build**

1. In `tests/e2e/support/legibility.ts`, append this function **immediately after `driveUntil`**, at
   the end of the file, verbatim — the body is a byte-for-byte move of
   `alert-legibility.spec.ts:31-35`, not a rewrite:

   ```ts
   export async function driveC5(page: Page): Promise<void> {
     await page.getByRole("radio", { name: "MANUAL" }).check();
     const exit = page.getByLabel("Hora para Saída Real");
     await exit.fill("2000");
     await exit.blur();
   }
   ```

   `Page` is already in the file's type import (`import { expect, type Locator, type Page, type TestInfo } from "@playwright/test"`) — add no import.
2. In `tests/e2e/alert-legibility.spec.ts`, delete the local `async function driveC5` (lines 31-35)
   and add `driveC5` to the existing named import from `./support/legibility`, positioned between
   `DS4_PANEL_SELECTOR` and `driveUntil` so Biome's import sorting is a no-op. `import { expect, type Page, test }` **stays**: `Page` is still used by the `Consumer` interface's `drive?: (page: Page) => Promise<void>`. The `C5` row's `drive: driveC5` is unchanged — it now resolves to the imported function.
3. In the same file, replace the inline arrow at lines 168-174 (Describe B's overtime drive) with
   `() => driveC5(page)`, leaving the `settled` predicate
   (`() => page.getByText("O DSR (Súmula 172 do TST)").isVisible()`) and the
   `` `${label} — overtime` `` label exactly as they are. **If T6 is done first this site no longer
   exists — do T5 first, in this order.**
4. In `tests/e2e/wide-viewport.spec.ts`, add `driveC5` to the named import from
   `./support/legibility` (between the opening brace and `driveUntil`) and replace the inline arrow
   at lines 51-57 with `() => driveC5(page)`, leaving `() => root.isVisible()` and `label` as they are.

Change nothing else: no rename, no signature change, no new export, no `settled` predicate edit.

**Reuse**

- `tests/e2e/support/legibility.ts` — the module T1 created as the shared home for cross-file e2e
  steps; `driveUntil` is already there and is the precedent this task follows.
- The existing `driveUntil(drive, settled, label)` contract: `driveC5` stays the **non-waiting,
  idempotent** drive and never becomes the predicate.

**Tests**

No new test case; this is a call-site change to existing cases. The check is the three-way identity
being gone:

- `grep -c "Hora para Saída Real" tests/e2e/alert-legibility.spec.ts tests/e2e/wide-viewport.spec.ts` → **0** in both.
- `grep -c "Hora para Saída Real" tests/e2e/support/legibility.ts` → **1**.
- `npx playwright test --list tests/e2e/alert-legibility.spec.ts` → **72**; `… tests/e2e/wide-viewport.spec.ts` → **6**. A different count means a case was lost in the edit and is a finding, not a number to adopt.

**Done when**

- `pnpm check` green.
- In the isolated copy: `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts tests/e2e/wide-viewport.spec.ts` → **78 passed**. If it is not 78, or a case fails, report it before starting T6 — do not adjust the expected number (lesson 026: an unmeasured count that comes back different is a finding).
- Advances: no acceptance criterion changes state; AC1–AC11 stay as `reports/qa.md` verified them. This closes `AGENTS.md` §8's reuse rule, which is what both reviewers rejected on.

**Depends on** none.

### T6 — Delete `recordMeasurement` and the describe block that only fed it

**Files**

- `tests/e2e/alert-legibility.spec.ts` — edit
- `tests/e2e/wide-viewport.spec.ts` — edit
- `tests/e2e/support/legibility.ts` — edit

**What to build**

1. In `tests/e2e/alert-legibility.spec.ts`, delete the **entire** `test.describe("Untouched disclosure geometry — DS1, DS2, DS4", …)` block (from `test.describe(` through its closing `});`, currently lines 142-215). After T5 it drives, measures and asserts nothing; its only consumer was `recordMeasurement`.
2. In the same file, delete the `recordMeasurement({ … })` call inside Describe A's case and drop
   `, testInfo` from that test's signature — `async ({ page }, testInfo) => {` becomes `async ({ page }) => {`. Keep `const measurement = await measureSurface(root, bodyText);`: `expectLr2a(measurement, label)` consumes it.
3. In the same file, remove from the `./support/legibility` import every specifier that is now
   unused: `DS1_FOOTER_SELECTOR`, `DS4_PANEL_SELECTOR`, `openPrivacySettings`, `recordMeasurement`.
   Keep `assertLr1`, `assertLr2b`, `assertLr3`, `assertLr3Rendering`, `driveC5`, `driveUntil`,
   `expectLr2a`, `measureSurface`, `waitForStableBoundingBox`.
4. In `tests/e2e/wide-viewport.spec.ts`, delete the `recordMeasurement({ … })` call (lines 65-73),
   drop `recordMeasurement` from the import, and change `async ({ page }, testInfo) => {` to
   `async ({ page }) => {` on that one test. `measureSurface`, `waitForStableBoundingBox`,
   `expectLr2a` and every assertion stay.
5. In `tests/e2e/support/legibility.ts`, delete `recordMeasurement`, the `RecordedMeasurement`
   interface, the `import { mkdirSync, writeFileSync } from "node:fs";` line, the
   `import path from "node:path";` line, and `type TestInfo` from the `@playwright/test` type import
   (leaving `import { expect, type Locator, type Page } from "@playwright/test";`).
   **Keep** `LR2A_CHROME_BUDGET_PX`, `SurfaceMeasurement`, `DS1_FOOTER_SELECTOR`,
   `DS4_PANEL_SELECTOR`, `openPrivacySettings` and every assert helper — `disclosure-legibility.spec.ts` still imports the DS selectors and `openPrivacySettings`, and deleting them breaks 48 passing cases.

Delete nothing under `evidence/`. The captured before/after JSON stays on disk exactly as it is;
this task removes the instrument that wrote it, never its output.

**Reuse**

Nothing to add. This task only removes code — `AGENTS.md` §8's "deletion over addition", ladder rung 1.

**Tests**

- `npx playwright test --list tests/e2e/alert-legibility.spec.ts` → **60** (72 − Describe B's 4 cases × 3 projects). `… tests/e2e/wide-viewport.spec.ts` → **6**. `… tests/e2e/disclosure-legibility.spec.ts` → **48**, unchanged — if that one moves, step 5 deleted something it should not have.
- `grep -rn "recordMeasurement\|RecordedMeasurement\|test-results/legibility" tests/` → no match.
- `grep -rn "node:fs\|node:path" tests/e2e/support/legibility.ts` → no match.

**Done when**

- `pnpm check` green.
- In the isolated copy: `PORT=3100 pnpm e2e tests/e2e/alert-legibility.spec.ts tests/e2e/wide-viewport.spec.ts tests/e2e/disclosure-legibility.spec.ts` → **114 passed** (60 + 6 + 48). Any other count is a finding to report before T7, not a number to adopt.
- Advances: **AC6** keeps its permanent half (`disclosure-legibility.spec.ts`, 48 green) and loses only the one-time before/after instrument, whose output is already recorded in `reports/qa.md` and `reports/legal.md` §4.2. **AC11**'s rows are unaffected — they live in `reports/qa.md`, not in the JSON.

**Depends on** T5.

### T7 — Re-verify the whole suite in the isolated copy and re-state the counts

**Files**

- `.specs/0006-salary-alert-legibility/reports/qa.md` — edit (the G5 build-evidence half only, at the top; do not touch the G6 verdict written by `qa-engineer` below it)

**What to build**

Append a `## T5–T6 — G6 remedy` section to the build-evidence half of `reports/qa.md` carrying, as
pasted command output rather than prose:

- `pnpm check` result.
- `PORT=3100 pnpm e2e` full-suite result, run in the isolated copy: expected **160 passed**
  (172 − 12 Describe B cases). State the copy's path and that `.next` was removed before the build.
- The three `--list` counts from T5 and T6 (60 / 6 / 48).
- One sentence recording that `evidence/measurements-before/` (98 files) and
  `evidence/measurements-after/` are **frozen** — captured under T2/T2b/T4, never regenerated after
  T6, and that AC6's and AC11's numbers now live in `reports/qa.md` § AC11 and `reports/legal.md` §4.2.

If the full suite comes back at anything other than 160 passed, or if any pre-existing case
(`disclosure-legibility`, `dark-hydration`, `responsive`, `google-tracking`, `salary-calculator`,
`work-calculator`) fails, **stop and report it** — a failure here is either a real regression from
T5/T6 or contention, and the isolated copy is what tells the two apart.

**Reuse**

The isolated-copy recipe above, verbatim. Do not invent a different isolation scheme.

**Tests**

None — this task produces evidence, not code.

**Done when**

`reports/qa.md` carries the new section with the pasted 160-passed run and the `pnpm check` result,
and no source file changed in this task. Advances **AC10** (`pnpm check` green, suite green) on the
post-remedy tree.

**Depends on** T6.

### T8 — Write the lesson this bounce bought

**Files**

- `.agents/memory/lessons/030-*.md` — create, via the tool only

**What to build**

`frontend-dev` owns this one, because `frontend-dev` is the agent that was rejected
(`AGENTS.md` §4): a named helper was written and then re-typed at the very next call site.

```bash
node .agents/tools/lesson.mjs new "<the rule, imperative>" --agent frontend-dev --domain build --spec 0006
```

The rule must be the pattern, not the incident, and must be applicable by an agent who was not here,
to a different feature. Fill all four sections (`## What happened`, `## Why it happened`,
`## The rule`, `## How to verify`) — `docs-check.mjs` fails on an empty one and on a leftover
a template placeholder in angle brackets. `## How to verify` must name a check that is runnable before opening a review, not
a description of the mistake. Do not write about `driveC5`'s specifics alone; the class is "a helper
extracted in task N and re-typed inline in task N+1, in the same file".

Active lessons are at **25 / 30**, so there is room for exactly this one.

**Reuse**

`.agents/tools/lesson.mjs`. Never hand-edit `LESSONS.md` — every command rewrites that table from the
lesson files and a hand-written row is erased without warning.

**Tests**

`node .agents/tools/docs-check.mjs 0006-salary-alert-legibility` → 0 failures, and the new row is
present in `.agents/memory/LESSONS.md`.

**Done when** the lesson file exists with four filled sections, `docs-check.mjs` passes, and the
count line in `LESSONS.md` reads 26 / 30. Advances no AC; it is the condition on closing the cycle at
G10.

**Depends on** none (may run in parallel with T5).

### D4 — the constraint that carries `reports/legal.md` F2 (`product-designer`, documentation, not a bounce)

**File:** `DESIGN.md` — edit, one insertion.

**Where:** immediately after the line "Root scaling is the mechanism: `html` is 16px, 17px from
1920px, 18px from 2560px. Nothing else in the system knows this happened." in § *Density at the five
reference widths*, as a new paragraph. Insert only; change no existing sentence, no table row, no
frontmatter.

**Verbatim text:**

> **The 18px cap is load-bearing, and one component knows.** `AlertBanner`'s horizontal chrome is declared in `rem` (`px-3` plus a 1px border) while the legibility budget that bounds it is stated in CSS px — 32px — so the spend scales with the root ramp and the budget does not: 26px at a 16px root, 29px at 18px. A fourth step above 18px puts that atom over its budget without anyone editing the atom. Any change that adds one must, in the same change, measure the alert banner at a viewport inside the new step's band — `tests/e2e/wide-viewport.spec.ts` already does exactly this at 2560 and 3840, and today's top band is the only one it needs to sample.

**Done when** `git diff --stat -- DESIGN.md` shows one file changed with insertions only, and
`node .agents/tools/docs-check.mjs` passes.

### Risks this bounce adds

| Risk | Signal |
|---|---|
| `driveC5` is "improved" during the move — a wait added, the selector changed, `blur()` dropped | The C5 cases change timing or count; a `settled` predicate starts passing on the first poll where it used to take two. The move is byte-for-byte; any diff inside the function body is the defect. |
| Describe B is deleted but its imports are left behind | `pnpm check` fails on unused imports, or worse passes while `disclosure-legibility.spec.ts` lost `openPrivacySettings` — the signal is its count moving off 48. |
| The new counts are taken in the shared tree | A number that disagrees with the isolated copy, in either direction. Neither number is reportable until the copy is run (lesson 029). |
| `evidence/measurements-*` is regenerated "to be consistent" after T6 | The directories lose files or change timestamps; the before-baseline's 98 files are unreproducible once the instrument is gone, and AC6's one-time diff cannot be re-derived. They are frozen artefacts, not build output. |
| The 3px LR2a margin is treated as closed because D4 is written | A future ramp step lands with no wide-viewport case inside its band. The sentence is a pointer, not a guard — `reports/legal.md` F2 keeps `product-manager` as owner for the spec that opens the ramp. |

---

## G9 triage — run 1, ruled

`web-standards-auditor` rejected on **F1** (`categories:performance` 0.74–0.76 against the ≥ 0.93
budget, both routes, all 6 runs, LCP 5.5–6.1 s at 89–90 % Render Delay) and asked the question it
correctly refused to answer alone: **is this the preview environment, or a regression in this
diff?** `labor-law-analyst` passed the same gate at run 1.

**It is neither.** Measured, not reasoned about (`AGENTS.md` §5, lesson 012): the metric is not a
function of the artifact under review, and it is not a function of the preview host either. Every
number below was collected in one 6-minute window on this machine, with one `@lhci/cli 0.15.1` /
`lighthouse 12.6.1` / `HeadlessChrome 153` runner, against the **unmodified** `.lighthouserc.js`
budget. Raw LHRs and the summary table:
`.specs/0006-salary-alert-legibility/evidence/g9-control-build-ab/` (gitignored, regenerable).

### The four measurements

**1 — The alias hypothesis is dead.** The branch alias and the deployment alias for the *same*
build (`72795dc9`) serve identical transport: HTTP 200, no redirect hop, `X-Vercel-Cache: HIT`,
TTFB 0.16–0.29 s on both (`evidence/.../transport-headers.txt`). Lighthouse against both, 3 runs
each, route `/`:

| Host | Build | `performance` | LCP (ms) |
|---|---|---|---|
| `workload-gqbii5wdl-…` (deployment alias) | `72795dc9` = this PR head | 0.73 · 0.74 · 0.78 | 6452 · 6338 · 5756 |
| `workload-git-fix-design-taste-preflight-…` (branch alias) | same build | 0.75 · 0.75 · 0.76 | 5922 · 6065 · 5711 |

Same build, two aliases, same numbers inside the run-to-run spread. **The alias is not the cause**,
and the `og:image` branch-alias finding carried into `0004` is unrelated to it.

**2 — The control build is the decisive one.** `0005`'s G9 deployment — `workload-8kqr9212j-…`,
an artifact frozen a week ago that **this diff cannot have touched**, and which that gate measured
at `performance` 0.98 / LCP 2.43 s — re-measured now, in the same window, on the same runner:

| Host | Build | `performance` | LCP (ms) | measured at 0005's G9 |
|---|---|---|---|---|
| `workload-8kqr9212j-…` | `0005`'s G9 deployment, unchanged | **0.72 · 0.76 · 0.75** | **5770 · 5680 · 6065** | **0.98 / 2430** |

An unchanged artifact moved from 0.98 to 0.72–0.76 with no commit between the two readings.
**Whatever moved is outside every build in this PR stack.** This single row disposes of the
"regression in this diff" branch: a defect `0006` introduced cannot appear in a deployment that
predates `0006`.

**3 — It is not a preview-host property either.** Production, the custom domain, a different build,
no `*.vercel.app` alias, no platform toolbar (neither alias serves `vercel.live/…/feedback.js` any
more — that too has changed since `0005`):

| Host | `performance` | LCP (ms) | Render Delay share |
|---|---|---|---|
| `workload.devrma.com` | 0.91 · 0.76 · 0.75 | 3259 · 5594 · 5613 | 75 % · 89 % · 89 % |

Production fails the same budget with the same shape. Extending the `*.vercel.app` carve-out to
`performance` would therefore have been **wrong**, and would have hidden a real failure on the
domain users actually load.

**4 — The shape is architectural, and it has a name already.** In 11 of the 12 runs,
`largest-contentful-paint` equals `interactive` **to the millisecond** (e.g. 6452 = 6452,
5711 = 5711). FCP lands at 1.15–2.27 s — the shell paints on time — and the LCP element then waits
for TTI. The reason is in the source, not in the network: `hooks/use-current-time.ts` returns `null`
on the first render, so `components/organisms/hero-panel.tsx`'s numeric `<p>` has **no
server-rendered text**; it cannot become an LCP candidate until hydration finishes. Load Delay and
Load Time are 0 ms in every run because there is nothing to load — the pixel is gated on JS, not on
bytes. Script transfer is flat across the stack (0005: 239 975 B · 0006: **239 647 B**, 328 bytes
*smaller*), so no bundle growth is available as an explanation either.

And the user-visible reality is fine: a real chromium at 4× CPU throttle with no network simulation
paints that element once, at **448 ms** (0005 build) and **560 ms** (0006 build), a single LCP
candidate with no churn from the 1 s clock tick
(`evidence/.../real-browser-lcp.txt`). The 5–6 s figure is Lighthouse's *simulated* mobile profile
applied to an LCP element that is structurally bound to TTI — which is precisely, word for word,
`0004`'s carried finding (`.specs/0004-lcp-render-delay/STATUS.md`, "the client-gated hero
numeral", "82 % of the metric is render delay; resource load time is zero").

### The ruling

1. **F1 is upheld as a real finding and is *not* attributable to `0006`.** The auditor was right to
   reject what it could not attribute, right to refuse the `seo` carve-out for `performance`, and
   right to route instead of bounce. Nothing about the report needs correcting; it measured
   accurately and named the limit of what it could conclude.
2. **F1 does not bounce to `frontend-dev`, and no task is added to this spec.** There is no lever
   for it inside `0006`'s scope — the diff is one `className` on one atom — and lesson **011** is
   exactly this rule: *a numeric acceptance criterion needs a lever inside this spec's own scope and
   a margin wider than its instrument's spread, or it belongs to another spec.* Here the instrument's
   own spread on a **fixed artifact** is 0.72 → 0.98, twenty-six points, against a margin of
   nineteen. Lesson **010** is confirmed a second way: the phase attribution (Render Delay ≡ TTI gap)
   points at a file this spec does not open.
3. **`0006` closes G9 and proceeds.** Both halves of the gate now have a verdict a `tech-lead` can
   sign: `labor-law-analyst` **pass**, and `web-standards-auditor`'s own report records that every
   check that gate owns — LR2a geometry at 40/40 consumer measurements, axe 0 violations, contrast
   5.05–7.22:1, reduced motion, **CLS 0 on all 6 runs**, no overflow at four widths, DS1/DS2/DS4 —
   holds on the deployed artifact and reproduces G6 byte for byte. The fix this spec shipped is
   verified live. A budget failure that reproduces on a week-old build and on production is not a
   reason the legibility fix does not land (`AGENTS.md` §4 rule 1 is about *this spec's* criteria;
   F1 is inside none of AC4, AC5, AC6, AC10 or AC11 — AC10's own Lighthouse clause,
   `categories:accessibility`, reads 1.00 on all 6 runs).
4. **The bounce counts as one, and `preview` stands at 1 of 2.** It is recorded as *routed, not
   re-worked*: nothing goes back to `frontend-dev`, `product-designer` or `content-writer`, so no
   re-review of `0006` is required and G9 is not re-run.
5. **F1 is carried to `0004`** with the instrument it needs, below. `0004` is already the spec whose
   subject is this element and this phase; opening a seventh spec for it would split one finding
   across two.
6. **The rule that stops this being re-litigated at every G9** — a control-build run — is written
   into `.agents/agents/web-standards-auditor.md` §G9, below. It does not lower the budget and it
   does not exempt `performance`.

### What `0004` must now measure, and from where

Appended to `.specs/0004-lcp-render-delay/STATUS.md` so `product-manager` has it at G1:

- **A control build in the same session is mandatory before any before/after claim.** `0004`'s whole
  subject is a number whose instrument moved 26 points on a frozen artifact in one week. Any
  "improved by X ms" claim must be a *difference measured in one window* against the pre-fix
  deployment, never against a figure copied out of an older report.
- **Three hosts, not one:** the spec's own preview deployment alias, the pre-fix control deployment,
  and `workload.devrma.com`. Production is now known to fail the same budget — it is the host the
  target actually exists for, and it is where the fix has to show.
- **The acceptance criterion is the phase, not the score.** The provable, lever-bound statement is
  *`largest-contentful-paint` must stop equalling `interactive`* — i.e. the hero `<p>` must carry
  server-rendered text and become an LCP candidate at FCP. That is falsifiable on a single LHR
  (`audits.interactive.numericValue` vs `audits['largest-contentful-paint'].numericValue`) and it is
  immune to the runner drift that makes the 0.93 score unstable. The 2 500 ms absolute target stays
  as `0004`'s goal; the phase equality is what a gate can score without re-deriving this triage.
- **The real-browser probe is part of the evidence, not a substitute for it.**
  `evidence/g9-control-build-ab/lcp-candidate-probe.mjs` enumerates LCP candidates under CDP CPU
  throttling and is what proves the field experience (448–560 ms) differs from the lab number; both
  belong in `0004`'s before/after.
- **`PRODUCT.md` §4 gate is unchanged and still comes first** — what the hero may paint before
  hydration is a product and disclosure decision, per `0004`'s own second binding.

### Lighthouse output — where it belongs

Ruled, and nothing needs to be gitignored. `lhci` writes `lhr-*.report.html`, `lhr-*.report.json`
and `manifest.json` into **`.lighthouseci/`**, which `.gitignore:16` already covers
(`git check-ignore -v .lighthouseci/manifest.json` confirms). No `*.report.*` or `manifest.json`
exists at the repository root in this tree and `git status` is clean of them — the files the auditor
saw were the `.lighthouseci/` contents, already ignored. Two standing rules, added to §G9:

- **Never pass `--upload.outputDir` pointing anywhere but `.lighthouseci/` or the spec's own
  `.specs/NNNN-*/evidence/`** (also gitignored, `.gitignore:55`). Both are safe; the repository root
  is not, and `manifest.json` at the root would collide with nothing but would be committed by the
  next `git add`.
- **Copy the LHRs you cite into the spec's `evidence/` before the next `lhci` run**, because `lhci
  collect` wipes `.lighthouseci/` on start. This triage learned it the hard way: collecting the
  control runs destroyed G9's own six LHRs. They are regenerable, gitignored, and every number they
  carried is quoted in `reports/audit-preview.md` and reproduced by the runs above — no evidence of
  record was lost — but the next gate should not have to rely on that.
