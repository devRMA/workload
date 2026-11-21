# 0009 — tests asserting on class strings

> Owner: tech-lead · Gate: `plan` · Run 1 · 2026-09-16

## Architecture

### The approach

This spec writes no source. `app/`, `components/`, `lib/` and `hooks/` are byte-identical after it
(AC6), so there is no component tree, no data flow and no atomic level to place anything at. What is
architected here is **the test suite's falsifiability**, and the architecture has exactly two shapes:

1. **A jsdom assertion over a class string is replaced by an assertion over the structure that
   produced the class** — the element that exists or does not, the inline value the component
   computed, the identity of a caller-supplied sentinel. Five sites (A1–A6), five files, no new file.
2. **An e2e guard over a legal rule asserts the size of the set it iterates before it iterates it**,
   and the set is selected by what carries the obligation. Two loops (F3/F4/A7), and the counting is
   factored into the helper both loops already share, so the rule lands in one place rather than
   twice.

No new module, no new test file, no new npm script, no new dependency. The whole change is seven
files, six of them edits of two to eight lines.

### Which modules change, and why each one

| File | Change | Why here and not elsewhere |
|---|---|---|
| `__tests__/day-summary.test.tsx` | edit | A1 is dead (`spec.md` E3). The property of record (`design.md` §2) is *no proportional track when no minute was worked*; the timeline's only observable in jsdom is the inline `width` percentage at `day-summary.tsx:56` and the boundary clock labels at `:60-61`. Both are structural, neither is a class. |
| `__tests__/hero-panel.test.tsx` | edit | A2 reads `.border-t`. The property is *no separator block when there is nothing to separate*, which is the presence of a third child in the panel's content wrapper. |
| `__tests__/layout.test.tsx` | edit | A3 copies the mock's own literal (**D1**). The jsdom-honest form compares against the font object's `variable`, which is what `app/layout.tsx:61` actually renders. |
| `__tests__/modal-dialog.test.tsx` | edit | A4 (`overscroll-contain`) has **no correct jsdom form** — `design.md` §2 says so outright, and jsdom has no scroll chaining. It is deleted, with its carrier and its debt named. A5's identity half takes a non-utility sentinel. |
| `__tests__/alert-banner.test.tsx` | edit | A6's sentinel `mb-6` is a live utility in a `cn()` merge group (clause C3). Sentinel only; `legal.md` §5 and `spec.md` § Out of scope bound everything else in the file. |
| `tests/e2e/support/legibility.ts` | edit | **AC4's file set is widened here — justification below.** The LG1.2 count and the LG1.3 exemption tally belong beside `assertLr2b`, not duplicated into two call sites. Closes **F2** and **F5**. |
| `tests/e2e/disclosure-legibility.spec.ts` | edit | **F3** and **F4**, the two blocking findings. Both loops call the counting helper; DS4's selector stops filtering by a type token. |

### The hook boundary, the component tree, the atomic levels

**None of the three exists in this spec.** No hook is read or written, no component is rendered
differently, no file is placed at an atomic level. Stated rather than skipped, because a plan silent
on them reads as an omission: `design.md` § Components lists seven components as **unchanged** and
this plan changes none of them.

### Data flow

The only data flow this spec creates is inside the e2e helper:
`surface locator → paragraphs[] → length assertion → per-paragraph LR2b verdict → measured/exempt
tally → test annotation`. It flows in one direction, produces no state, and is consumed by the
Playwright report.

## Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Measure a rendered font family, a scroll chain, a width cap | **No new dependency.** Two are deferred as debts, one is carried by an existing e2e assertion. | `AGENTS.md` §8 and `spec.md` § Out of scope, bullet 5. Playwright is already installed and is the instrument for all three; what is missing is scope, not a package. Nothing here needs a library. |
| Count paragraphs and tally exemptions in the e2e guard | **No new dependency.** `@playwright/test`'s `expect` and `test.info().annotations`, both already imported in the file's own module graph. | Ladder rung 5. `test.info()` is Playwright's own per-test reporting channel; a custom reporter or a logging package for four numbers would be the scaffolding `PRODUCT.md` §3 forbids. |

## AC4's file set — the two widenings, and the one I refused

`spec.md` AC4 lists six files "plus files the plan creates". This plan creates none and widens the
set by **one** file. Both widening decisions are recorded here because AC4 is verified by a
`git diff --name-only` that fails on any path outside the list.

| File | Verdict | Justification |
|---|---|---|
| `tests/e2e/support/legibility.ts` | **Widened in.** | `legal.md` §7 **F2** routes this decision to me in writing: *"Touching this file requires widening AC4's permitted set; that is the tech-lead's decision and it needs a written line in plan.md."* I take it, and I take **F2 and F5 with it**. The alternative legal.md names — per-call bookkeeping inside the spec file — duplicates the tally across two loops, which is the shape that produced this spec: a rule fixed at a coordinate instead of at the rule. Bound by `legal.md` § Out of scope: **`LR2A_CHROME_BUDGET_PX = 32` and the LR2b floor `40` keep their values byte-identical**; `40` only stops being anonymous. `openPrivacySettings`, `driveC5`, `measureSurface`, `assertLr1`, `assertLr3` and every pt-BR literal in the file are untouched. |
| `vitest.setup.ts` | **Refused — routed to `product-manager` as B3.** | The stronger form of D1's fix needs the mock at `vitest.setup.ts:11` to return **different** strings for `className` and `variable`, so the assertion can discriminate `hyperlegible.variable` from `hyperlegible.className`. Measured at G4: with the mock as shipped, both are `"font-hyperlegible"`, so `expect(...).not.toContain(hyperlegible.className)` is **unsatisfiable** — it fails against correct code (evidence G4-E5). Widening AC4 to a file no upstream gate named is a scope decision, not an architecture one. T3 ships the half that fits inside AC4 today; the other half is B3 in `STATUS.md`. |
| `app/`, `components/`, `lib/`, `hooks/` | **Never.** | AC6. Any source defect found at G5 is routed to me as a finding with its own spec and is not fixed here (`spec.md` § Out of scope, bullet 1). |

## AC10 — the permanent guard question, reconciled against `0006`

**No permanent anti-vacuity guard is proposed, and this is the reconciliation AC10 requires.**

`0006/STATUS.md` (tech-lead, 2026-09-15) refused a source-text guard mirroring `px-3`, on the ground
that it *"would be the Tailwind-class assertion `AGENTS.md` §8 forbids… and would be blind to the
three ways this actually regresses."* `spec.md`'s G1 decision correctly separates the two objects: a
guard over **appearance** mirrors the stylesheet, while a guard over **falsifiability** would read
the test suite and go red only when an assertion becomes vacuous, which is never a legitimate state.
The two are not the same object, and `0006`'s refusal does not reach the second one. So the question
is genuinely open, and it is answered on its own merits:

**Vacuity is not a property a static guard can read.** A1's death is not visible in
`day-summary.test.tsx` — the file is syntactically perfect. It is visible only by comparing the
assertion against the tree: `bg-neutral-100` occurs zero times in `components/`+`app/`. A guard
general enough to catch the next A1 would have to know, for every selector in every test, which
strings the source can emit — which is mutation testing, not a `grep`. Every cheaper approximation
is the shape `spec.md` § Non-goals forbids outright ("a repository-wide ban on the substring
`class`"): it would take out `cn()`'s own unit tests and the AdSense integration contract, both of
which this spec rules correct.

**What replaces it is strictly stronger and is being built by this plan.** LG1.2 puts the
anti-vacuity check **inside each guard that iterates a set** (T6, T7): a count asserted before the
loop cannot report green over an empty collection, and it fails at the guard rather than in a
scanner that has to guess which assertions are guards. `AGENTS.md` §5 *How an instrument's reading
is trusted* already binds this on every agent that quotes a pass. The distributed form is what
`legal.md` §2 asks for — *"LG1 is a property of whatever exists, never an instruction to build a
guard"* — and it needs no new file, no new script and no maintenance.

**`legal.md` Q2 (sweep or correct-as-opened) is answered with a measurement, not a preference.**
`grep -rn "\.all()" tests/ __tests__/` returns **2 hits**, both in `disclosure-legibility.spec.ts`
and both fixed by T7. There is no third LR guard to sweep. `alert-legibility.spec.ts:117` calls
`assertLr2b` on a single locator, not over a set, so LG1.2 has no set to size. The sweep and the
correct-as-opened policy have the same output today; the choice between them stays the human's, and
nothing in this plan depends on it.

## The inventory, re-confirmed at G4 (AC1)

Every row's coordinate was read in this tree on 2026-09-16 before any task was written. **No line has
moved**, so `spec.md` § Inventory needs no correction before G5:

| # | Site | Confirmed content |
|---|---|---|
| A1 | `__tests__/day-summary.test.tsx:96` | `expect(container.querySelector(".rounded-full.bg-neutral-100")).toBeNull();` |
| A2 | `__tests__/hero-panel.test.tsx:72` | `expect(document.querySelector(".border-t")).toBeNull();` |
| A3 | `__tests__/layout.test.tsx:21` | `expect(document.body.className).toContain("font-hyperlegible");` |
| A4 | `__tests__/modal-dialog.test.tsx:96` | `expect(wrapper.className).toContain("overscroll-contain");` |
| A5 | `__tests__/modal-dialog.test.tsx:97` | `expect(wrapper.className).toContain("max-w-lg");` |
| A6 | `__tests__/alert-banner.test.tsx:51,54` | `className="mb-6"` / `.toContain("mb-6")` |
| A7 | `tests/e2e/disclosure-legibility.spec.ts:60` | `const captions = await panel.locator("p.text-caption").all();` |

## Evidence produced at this gate

Every command below was run by `tech-lead` on 2026-09-16 in a **session-local isolated copy** outside
the repository (`rsync --exclude node_modules --exclude .next --exclude .git`, then `cp -al` for
`node_modules`), per `AGENTS.md` §3 rule 6. The repository was never written to and no state-changing
git command was run. No e2e run and no `pnpm build` was performed at this gate: `.next` is shared
mutable state and sibling agents hold this tree.

| # | Claim | Command, and what it printed |
|---|---|---|
| **G4-E1** | The baseline in this tree is **wider** than `spec.md` E2 recorded. | `vitest run` → `Test Files 60 passed (60)`, `Tests 517 passed (517)`. `spec.md` AC8 says `≥ 506 across 58 files`, which this satisfies; the tree has grown since E2 and carries other specs' in-flight work. **G5/G6 re-measure their own baseline; do not treat 517/60 as fixed.** |
| **G4-E2** | Every replacement in T1–T5 **passes against correct code**. | The five edits applied, then `vitest run __tests__/{day-summary,hero-panel,modal-dialog,alert-banner,layout}.test.tsx` → `Tests 43 passed (43)`; full `vitest run` → `Test Files 60 passed (60)`, `Tests 517 passed (517)`. |
| **G4-E3** | Every replacement in T1–T5 **goes red against the defect it names** (lesson **040**, AC2's protocol run early). Five defects injected at once: `if (total === 0) return null;` deleted from `day-summary.tsx:50`; `hero-panel.tsx:62`'s footer wrapper rendered unconditionally; `layout.tsx:61` switched to `hyperlegible.className`; `className` dropped from the `cn()` call in `modal-dialog.tsx:53` and in `alert-banner.tsx:23`. | `vitest run` over the five files → `Tests 5 failed | 38 passed (43)` — **one failure per replacement, no collateral**. Each failing name is the `it` the task rewrites. |
| **G4-E4** | The exact code in T1–T7 is lint-, format- and type-clean. | `tsc --noEmit` → no output. `biome check __tests__` → `Checked 60 files… No fixes applied`, 0 errors. `biome check tests/` → `Checked 9 files… No fixes applied`, 0 errors. **Two Biome findings were hit and fixed while drafting T2** — `lint/correctness/noUnsafeOptionalChaining` on a chained `?.` inside a cast, and a line over the formatter's width — and the task carries the corrected form. |
| **G4-E5** | D1's stronger form is **unsatisfiable inside AC4's current file set**. | With `vitest.setup.ts` as shipped, `expect(document.body.className).not.toContain(hyperlegible.className)` → `1 failed | 59 passed (60)` **against correct code**, because the mock returns `"font-hyperlegible"` for both fields. This is why T3 ships the single-clause form and B3 routes the rest. |
| **G4-E6** | The corrected e2e file type-checks, lints, and keeps its case count. | `tsc --noEmit` → no output; `biome check tests/` → 0 errors; `playwright test --list tests/e2e/disclosure-legibility.spec.ts` → **`Total: 48 tests in 1 file`** (16 cases × 3 projects). **AC9's recorded case count is 48.** `--list` starts no web server and builds nothing. |
| **G4-E7** | There is no third LR guard to sweep (`legal.md` Q2). | `grep -rn "\.all()" tests/ __tests__/` → **2 hits**, `disclosure-legibility.spec.ts:34` and `:60`. |

---

## Tasks

### T1 — Give `day-summary.test.tsx` an assertion the empty timeline can fail

- **Files:** `__tests__/day-summary.test.tsx` (edit)
- **Depends on:** none
- **Reuse:** the file's existing `renderSummary()` helper and `FINISHED_DAY` fixture. Add no fixture,
  no helper and no `it` block.
- **What to build:**

  Two edits, and nothing else in the file moves.

  **(a)** In `it("lists every stretch of a finished day")` (line 56), capture the container and assert
  the track is painted in the state that has something to paint. Replace the first two lines of the
  body with:

  ```tsx
    const { container } = renderSummary();

    expect(container.querySelectorAll("[style*='width']")).toHaveLength(3);
    expect(screen.getByRole("heading", { name: "Seu Dia" })).toBeInTheDocument();
  ```

  `3` is the length of `FINISHED_DAY.segments` (lines 30–34: `morning`, `lunch`, `afternoon`), and
  `[style*='width']` selects exactly the segment bars, because `style={{ width: … }}` at
  `day-summary.tsx:56` is the **only** inline style in the whole component (verified:
  `grep -n "style=" components/organisms/day-summary.tsx` → 1 match). *If the rendered count is
  neither 3 nor explainable from `FINISHED_DAY.segments`, that is a finding — record it and route it
  to `tech-lead` before continuing, do not tune the number.*

  **(b)** Replace line 96 — `expect(container.querySelector(".rounded-full.bg-neutral-100")).toBeNull();`
  — with three assertions, keeping line 97 (`queryByText("Manhã")`) exactly as it is:

  ```tsx
    expect(container.querySelectorAll("[style*='width']")).toHaveLength(0);
    expect(screen.queryByText("08:00")).toBeNull();
    expect(screen.queryByText("17:48")).toBeNull();
  ```

  `08:00` and `17:48` are the timeline's boundary clock labels (`day-summary.tsx:60-61`, rendered from
  `times.entry` and `times.exit` through `formatTimeLabel`), and they are **whole text nodes** — the
  stretch rows render `08:00 → 12:00` as one node, which Testing Library's default normalizer does not
  match against `"08:00"`. Both queries therefore reach the timeline and nothing else.

  The `it` name at line 84 (`"drops the timeline when nothing has been worked"`) stays byte-identical:
  it was already the right sentence; only the assertion was wrong.

- **Tests:** this task *is* the test. `__tests__/day-summary.test.tsx`, 14 cases, unchanged in count.
  The refuting experiment AC2 requires for A1 (**in an isolated copy, never this tree**): delete
  `if (total === 0) return null;` from `components/organisms/day-summary.tsx:50`, re-run the file, and
  record the printed counts. Measured at G4: **pre-fix `14 passed (14)`** (`spec.md` E3), **post-fix
  `1 failed | 13 passed (14)`** (G4-E3), the failure being
  `drops the timeline when nothing has been worked`.
- **Done when:** `pnpm test __tests__/day-summary.test.tsx` green, `pnpm lint` clean — advances
  **AC1, AC2, AC3** (A1's row), **AC5** (nothing is removed whose obligation is not carried: the
  obligation of `:96` moves to the three assertions above, in the same `it`).

### T2 — Make `hero-panel.test.tsx` assert the missing block, not the missing class

- **Files:** `__tests__/hero-panel.test.tsx` (edit)
- **Depends on:** none
- **Reuse:** the file's existing `IconClock` import and `screen`; both are already imported at lines
  1–2. Add no import.
- **What to build:**

  Replace the whole last `it` block (lines 69–73) with:

  ```tsx
    it("adds no separated block to the panel when there is no footer", () => {
      const { container, rerender } = render(
        <HeroPanel icon={IconClock} label="HORA EXTRA" value="00:10:00" tone="rose" />,
      );
      const content = container.firstElementChild?.firstElementChild as HTMLElement;

      expect(content.children).toHaveLength(2);

      rerender(
        <HeroPanel icon={IconClock} label="HORA EXTRA" value="00:10:00" tone="rose" footer={<p>Resumo Financeiro</p>} />,
      );

      expect(content.children).toHaveLength(3);
      expect(content.lastElementChild).toContainElement(screen.getByText("Resumo Financeiro"));
    });
  ```

  `content` is the panel's content wrapper (`hero-panel.tsx:33`), whose children are the header row
  (`:34`), the `@container` value group (`:41`) and — only when `footer` is given — the separated block
  at `:62`. The property of record (`design.md` §2, A2) is *no separator when there is nothing to
  separate*; the observable is that third child. The `rerender` half is what makes the first count
  falsifiable: without it, `2` is a number nobody has seen fail.

  **Do not** write `container.firstElementChild?.firstElementChild` inline inside the arrow function —
  Biome's `lint/correctness/noUnsafeOptionalChaining` rejects a chained `?.` feeding a cast, and the
  single-line `render(...)` call exceeds the formatter's width. The form above is the one that passed
  both (G4-E4).

- **Tests:** this task *is* the test. `__tests__/hero-panel.test.tsx`, 7 cases, unchanged in count.
  AC2's refuting experiment for A2, in an isolated copy: make the footer wrapper at
  `components/organisms/hero-panel.tsx:62` unconditional
  (`<div className="pt-6 lg:pt-8 border-t border-ink-onfill/15">{footer}</div>`), re-run the file.
  Measured at G4: **`1 failed | 6 passed (7)`**, the failure being
  `adds no separated block to the panel when there is no footer`.
- **Done when:** `pnpm test __tests__/hero-panel.test.tsx` green, `pnpm lint` clean — advances
  **AC1, AC2** (A2's row), **AC5** (the obligation of `:72` is carried by the two `toHaveLength`
  assertions above).

### T3 — Bind `layout.test.tsx` to the font object instead of a copied literal

- **Files:** `__tests__/layout.test.tsx` (edit)
- **Depends on:** none
- **Reuse:** `next/font/google`'s `Atkinson_Hyperlegible_Next`, the same factory `app/layout.tsx:9`
  calls. Do not read `vitest.setup.ts`'s literal and do not edit that file — it is outside AC4's set
  (see § AC4's file set; the stronger form is **B3**, `product-manager`'s).
- **What to build:**

  Add the import immediately after line 1, in Biome's import order (it sorts after
  `@testing-library/react`):

  ```tsx
  import { Atkinson_Hyperlegible_Next } from "next/font/google";
  ```

  Replace the whole `it` block at lines 15–22 with:

  ```tsx
    it("puts the font object's own variable class on the body", () => {
      const hyperlegible = Atkinson_Hyperlegible_Next({ subsets: ["latin"], variable: "--font-hyperlegible" });

      render(
        <RootLayout>
          <div>layout child</div>
        </RootLayout>,
      );

      expect(document.body.className).toContain(hyperlegible.variable);
    });
  ```

  The options object is the one `app/layout.tsx:9-13` passes, minus `display`, and it is required for
  the type: `next/font/google`'s overload only returns a `variable` field when `variable` is in the
  options. Exactly **one** `expect` — the second clause D1 suggests (`not.toContain(hyperlegible.className)`)
  is unsatisfiable against correct code with the mock as shipped, measured at **G4-E5**. Do not write
  it; if you believe it should exist, that is **B3** and it is not yours.

- **Tests:** this task *is* the test. `__tests__/layout.test.tsx`, 6 cases, unchanged in count.
  AC2's refuting experiment for A3, in an isolated copy: change `app/layout.tsx:61` to
  `className={hyperlegible.className}` **and** make the mock's two fields distinct, or simply delete
  the `className` prop from `<body>`. Measured at G4 with the first variant: **`1 failed | 5 passed (6)`**.
  Record which variant you ran and its counts, because with the mock unchanged the first variant does
  **not** discriminate — that limitation is the content of debt **X-4**.
- **Done when:** `pnpm test __tests__/layout.test.tsx` green, `pnpm lint` clean — advances **AC1, AC2**
  (A3's row), **AC5** (the obligation of `:21` is carried by the assertion above, on the same body
  `className`, with the literal replaced by its source).

### T4 — Delete the assertion jsdom cannot make, and de-collide the sentinel beside it

- **Files:** `__tests__/modal-dialog.test.tsx` (edit)
- **Depends on:** none
- **Reuse:** the `my-custom` sentinel convention this repository already has in three sibling tests —
  `__tests__/stat-box.test.tsx:30-31`, `__tests__/duration-field.test.tsx:50,60`,
  `__tests__/regime-field.test.tsx:45,47`. **Do not invent a fourth spelling** (`design.md` §2, A5/A6).
- **What to build:**

  Two edits in the last `it` block (lines 88–98), and nothing else in the file moves.

  **(a)** Line 90 — change the sentinel passed to the component:

  ```tsx
        <ModalDialog isOpen={true} onClose={mockOnClose} labelledBy="dialog-title" className="my-custom">
  ```

  **(b)** Replace both assertion lines 96–97 with one:

  ```tsx
      expect(wrapper.className).toContain("my-custom");
  ```

  `overscroll-contain` (A4) is **deleted, not replaced**. `design.md` §2 rules that it has no correct
  jsdom form: jsdom implements no scroll chaining, so the class is the only observable, and asserting
  it is the stylesheet mirror `AGENTS.md` §8 forbids. Its debt is **X-2** in `STATUS.md`; do not write
  a substitute, do not add an e2e file for it, and do not "keep it just in case".

  The `it` name at line 88 (`"merges the caller className into the scrollable content wrapper"`),
  `const wrapper = container.querySelector("dialog > div") as HTMLElement;` at line 95 and every other
  case in the file stay byte-identical.

- **Tests:** this task *is* the test. `__tests__/modal-dialog.test.tsx`, 8 cases, unchanged in count.
  AC2's refuting experiment for A5, in an isolated copy: drop `className` from the `cn()` call at
  `components/atoms/modal-dialog.tsx:53`. Measured at G4: **`1 failed | 7 passed (8)`**, the failure
  being `merges the caller className into the scrollable content wrapper`. **A4 has no refuting
  experiment** — that is the finding, and AC5 is discharged by the carriers named next, not by a
  replacement assertion.
- **Done when:** `pnpm test __tests__/modal-dialog.test.tsx` green, `pnpm lint` clean — advances
  **AC1, AC2** (A5's row), **AC5**, for which `reports/qa.md` records, in AC5's own words:
  - the obligation of `modal-dialog.test.tsx:96` (*the modal traps the scroll chain*) is **carried by
    nothing in jsdom**; its sibling half — *the page behind does not scroll* — is carried by
    `__tests__/modal-dialog.test.tsx:28,43,52,57,61`, and the chaining half is debt **X-2**;
  - the obligation of `modal-dialog.test.tsx:97`'s **constraint** half (*the caller's width cap is the
    one that renders*) is carried by `tests/e2e/disclosure-legibility.spec.ts:65-66`, which measures
    the DS4 panel's rendered width in a browser — and DS4 is the live caller that passes
    `max-w-lg` (`components/organisms/cookie-consent.tsx:84`). Its **identity** half is carried by
    line 97 as rewritten.

### T5 — Replace `alert-banner.test.tsx`'s collidable sentinel

- **Files:** `__tests__/alert-banner.test.tsx` (edit)
- **Depends on:** none
- **Reuse:** the same `my-custom` convention as T4, from the same three sibling tests.
- **What to build:**

  Exactly two strings change, on lines 51 and 54. Line 51:

  ```tsx
        <AlertBanner icon={IconAlertTriangle} tone="danger" title="Confira seus horários" className="my-custom" />,
  ```

  Line 54:

  ```tsx
      expect(container.firstElementChild?.className).toContain("my-custom");
  ```

  **AC4 verifies this bound by reading the diff line by line.** The `it` name at line 49
  (`"merges custom className"`), the assertion shape, `container.firstElementChild`, the pt-BR fixture
  `"Confira seus horários"` and every other case in the file are **byte-identical**
  (`spec.md` § Out of scope, bullet 3; `legal.md` §5). `my-custom` satisfies `legal.md` §5's three
  bounds: not a utility, not pt-BR, not a token name.

- **Tests:** this task *is* the test. `__tests__/alert-banner.test.tsx`, 8 cases, unchanged in count.
  AC2's refuting experiment for A6, in an isolated copy: drop `className` from the `cn()` call at
  `components/atoms/alert-banner.tsx:23`. Measured at G4: **`1 failed | 7 passed (8)`**, the failure
  being `merges custom className`.
- **Done when:** `pnpm test __tests__/alert-banner.test.tsx` green, `pnpm lint` clean — advances
  **AC1, AC2** (A6's row), **AC4** (the sentinel-only bound), **AC5** (the obligation of `:54` is
  carried by `:54` itself, with a sentinel `tailwind-merge` cannot eat).

### T6 — Put LG1's count and exemption tally in the helper both loops share

- **Files:** `tests/e2e/support/legibility.ts` (edit — **AC4 widened, justified above**)
- **Depends on:** none
- **Reuse:** the file's own `lineBoxesAndCharacters`, `expect` and the `@playwright/test` import.
  Add no import beyond `test`.
- **What to build:**

  **(a)** Widen the import on line 1 and add three constants beside `LR2A_CHROME_BUDGET_PX`:

  ```ts
  import { expect, type Locator, type Page, test } from "@playwright/test";

  export const LR2A_CHROME_BUDGET_PX = 32;
  export const LR2B_MEASURE_FLOOR_CPL = 40;
  export const DS1_EXPECTED_PARAGRAPHS = 4;
  export const DS4_EXPECTED_PARAGRAPHS = 5;
  ```

  `LR2A_CHROME_BUDGET_PX` keeps the value `32` and `LR2B_MEASURE_FLOOR_CPL` takes the bare `40` that
  is inline at line 38 today — **the values do not change** (`legal.md` § Out of scope). This is
  **F2**: the rule is named in the identifier because `AGENTS.md` §8 permits a norm-citing comment in
  `lib/` **only**, and a comment here would be rejected by `__tests__/comment-free-code.test.ts`.

  `4` and `5` are `legal.md` §3.4's counts for DS1 (`calculator-views.tsx:74,78,82,89`) and DS4
  (`cookie-consent.tsx:110,111,114,122,126`). They are read from source, which means **nobody has
  rendered them yet**: if the running page disagrees, `legal.md` §3.4 clause 1 binds you — **stop,
  route it to `tech-lead`, and say which element the source reading missed. Do not write the number
  that makes the run green.** A mismatch corrects `legal.md`, at the gate that found it.

  **(b)** Replace `assertLr2b` (lines 35–40) with a version that reports its verdict, and add the
  counting helper directly below it:

  ```ts
  export async function assertLr2b(locator: Locator): Promise<"measured" | "exempt"> {
    const { lineBoxes, characters } = await lineBoxesAndCharacters(locator);
    if (lineBoxes === 1) return "exempt";

    expect(characters / lineBoxes).toBeGreaterThanOrEqual(LR2B_MEASURE_FLOOR_CPL);
    return "measured";
  }

  export async function assertLr2bAcrossParagraphs(surface: Locator, expectedParagraphs: number, label: string) {
    const paragraphs = await surface.locator("p").all();
    expect(
      paragraphs,
      `${label} — LG1.2: the surface rendered ${paragraphs.length} paragraphs, expected ${expectedParagraphs}`,
    ).toHaveLength(expectedParagraphs);

    let measured = 0;
    let exempt = 0;
    for (const paragraph of paragraphs) {
      if ((await assertLr2b(paragraph)) === "measured") {
        measured += 1;
      } else {
        exempt += 1;
      }
    }

    test.info().annotations.push({
      type: "lr2b-coverage",
      description: `${label} — measured ${measured} + exempt ${exempt} = ${expectedParagraphs}`,
    });
  }
  ```

  Three things are deliberate and none is optional:
  - The branch inverts to `lineBoxes === 1` so the exemption is **named and returned**, not an implicit
    fall-through. The `0005` G6 **B3** single-line exemption is unchanged in substance — a single line
    box is still exempt, and `legal.md` § Out of scope forbids reopening it. **LG1.3.**
  - `surface.locator("p")` is obligation-derived: *the paragraphs the surface renders*. No class, no
    token, no size. **LG1.1.**
  - The length assertion runs **before** the loop and carries the rendered count in its own message,
    so a failing run prints what it saw against what it expected. **LG1.2** — and `AGENTS.md` §5
    *a pass is evidence only about the sample it measured*.

  Everything else in the file — `openPrivacySettings` and its `"Configurar"` click, `assertLr1`,
  `assertLr3`, `assertLr3Rendering`, `measureSurface`, `expectLr2a`, `waitForStableBoundingBox`,
  `driveC5`, `driveUntil`, `roundedToTwoDecimals` and every pt-BR literal — is **byte-identical**.

  The return-type change is backwards compatible: `tests/e2e/alert-legibility.spec.ts:117` and
  `disclosure-legibility.spec.ts:31` call `assertLr2b` and discard the result. Do not touch either.

- **Tests:** no unit test covers `tests/e2e/` (`vitest.config.ts:11` excludes it); the helper is
  exercised by T7's file. This task's own check is that it compiles and lints, and that it breaks no
  caller.
- **Done when:** `pnpm typecheck` clean, `pnpm lint` clean, and `pnpm test` still at its baseline
  count — all three satisfiable on this task's own file list, with no e2e run required here (the e2e
  claim closes at **T7**) — advances **AC8**, and prepares **AC2/AC3** for A7. F2 and F5 close here.

### T7 — Give both disclosure loops an obligation-derived set and a count

- **Files:** `tests/e2e/disclosure-legibility.spec.ts` (edit)
- **Depends on:** **T6**
- **Reuse:** `assertLr2bAcrossParagraphs`, `DS1_EXPECTED_PARAGRAPHS` and `DS4_EXPECTED_PARAGRAPHS`
  from T6. Write no loop, no selector and no count in this file.
- **What to build:**

  **(a)** The import block (lines 2–9) gains three names, in Biome's alphabetical order:

  ```ts
  import {
    assertLr1,
    assertLr2b,
    assertLr2bAcrossParagraphs,
    assertLr3,
    DS1_EXPECTED_PARAGRAPHS,
    DS1_FOOTER_SELECTOR,
    DS4_EXPECTED_PARAGRAPHS,
    DS4_PANEL_SELECTOR,
    openPrivacySettings,
  } from "./support/legibility";
  ```

  `assertLr2b` stays imported — line 31 still calls it on the footer as a whole.

  **(b)** **F4.** Replace lines 34–37 (DS1's loop) with:

  ```ts
            await assertLr2bAcrossParagraphs(
              footer,
              DS1_EXPECTED_PARAGRAPHS,
              `DS1 ${route} ${viewport.width}x${viewport.height} ${theme}`,
            );
  ```

  **(c)** **F3 / A7.** Replace lines 60–63 (DS4's loop) with:

  ```ts
            await assertLr2bAcrossParagraphs(
              panel,
              DS4_EXPECTED_PARAGRAPHS,
              `DS4 ${route} ${viewport.width}x${viewport.height} ${theme}`,
            );
  ```

  `p.text-caption` is gone: it narrowed a legal domain by a type-ramp token and measured **3 of the 5**
  paragraphs DS4 renders, skipping `Cookies Essenciais` and `Telemetria (Google Analytics)` — the two
  that name **which purpose** each toggle governs, the subject of LGPD art. 8º §4º (`legal.md` §3.1).
  `design.md` **D2** reinforces this from the design side and **does not** change the remedy.

  Lines 32 (the `assertLr3` marker `"Tudo o que você digita fica salvo apenas neste navegador"`) and
  72–74 (the three accessible names) are **byte-identical** — `legal.md` §10 and `copy.md` §1 bind the
  marker, and `copy.md` §3 records that the three names already select by role and name, which is the
  obligation-derived form LG1.1 asks for. The panel-width assertion at 65–66 and the control-bounds
  loop at 77–92 do not move.

  **If a run reports a paragraph count other than 4 or 5**, or if a paragraph newly admitted by the
  corrected DS4 selector **fails** LR2b where LR2b binds: **stop and route it to `tech-lead`.**
  `legal.md` §3.5 forbids narrowing the selector until the suite is green, and a count mismatch
  corrects `legal.md` §3.4, never the assertion. `legal.md` §3.5's analysis expects **two reported
  residuals and zero new failures** at 390×844 — that is an expectation, not a measurement, and this
  task is the instrument that settles it.

- **Tests:** this task *is* the test. `tests/e2e/disclosure-legibility.spec.ts` — **48 cases**
  (16 × 3 projects), unchanged in count; measured at G4 by
  `pnpm exec playwright test --list tests/e2e/disclosure-legibility.spec.ts` → `Total: 48 tests in 1 file`
  (G4-E6). AC2/AC3's experiments for A7, both in an **isolated copy that owns its own `.next` and its
  own port** (`AGENTS.md` §3 rule 6 — never the shared tree, and check `uptime` and `ss -ltnp` before
  trusting a red run):
  - **pre-fix, AC3:** against the file as shipped, show DS4's loop body executing **zero times** when
    the selector matches nothing, and record that it reports green.
  - **post-fix, AC2:** point the DS4 selector at a surface that renders no paragraph, or otherwise
    reduce the rendered set, and record the **printed counts** — `legal.md` §10 requires the counts,
    not only red/green.
- **Done when:** `pnpm typecheck` clean, `pnpm lint` clean, and
  `PORT=<free> pnpm e2e tests/e2e/disclosure-legibility.spec.ts` green **twice** in the isolated copy,
  at 48 cases each run, with the `lr2b-coverage` annotations showing `measured + exempt = 4` for DS1
  and `= 5` for DS4 — advances **AC1, AC2, AC3** (A7's row), **AC5** (the obligation of `:60` is
  carried by `assertLr2bAcrossParagraphs`'s per-paragraph `assertLr2b`, over a **superset** of the
  paragraphs `:60` reached), **AC9**.

---

## Order, and why it is this one

`pnpm check` (lint + typecheck + test) is green after **every** task, and no task depends on a file
another task owns:

1. **T1–T5 are independent of each other and of T6/T7.** Each edits one `__tests__/` file and each
   leaves the suite green on its own. They may run in any order, or all five before T6.
2. **T6 before T7**, and only this pair is ordered: T7 imports three names T6 exports. Reversing them
   leaves the tree red at `pnpm typecheck`.
3. **T6 alone leaves the build green** — the return-type widening breaks no caller, and no e2e run is
   required to close it. The e2e claim closes at T7, which is the task that produces it (lesson **020**).

## Risks

| Risk | Signal it happened |
|---|---|
| The rendered DS4 paragraph count is not 5 (or DS1's not 4), and the developer edits the constant to match instead of routing it. | `tests/e2e/support/legibility.ts` shows `DS4_EXPECTED_PARAGRAPHS` at a value other than `5` with no corresponding correction in `legal.md` §3.4 and no blocker in `STATUS.md`. **This is the single most likely way this spec fails**, because the number that turns the run green is one keystroke away. |
| A newly admitted DS4 paragraph fails LR2b at 390×844 and the selector is narrowed back to make it pass. | `panel.locator("p")` acquires any filter — a class, a `:not()`, a `.slice()`, a `.first()`. `legal.md` §3.5 forbids all four; the route is `0006` §3.3, report the residual. |
| The e2e run is red for a reason that is not the code — a sibling agent's concurrent build racing on `.next`, or a held port. | A red run that does not reproduce in an isolated copy with its own `.next` and port. `AGENTS.md` §3 rule 6: check `uptime` and `ss -ltnp` before trusting it, and never conclude from the shared tree. |
| T1's `[style*='width']` count changes because a later spec adds an inline style elsewhere in `DaySummary`. | `grep -n "style=" components/organisms/day-summary.tsx` returns more than 1 match. Today it returns exactly one (`:56`), which is what makes the selector equivalent to "a segment bar". |
| A4's deletion is read at G6 as a test made to pass rather than a test repaired. | `reports/qa.md` lacks the AC5 row naming `modal-dialog.test.tsx:28,43,52,57,61` and debt **X-2** as the disposition of `:96`'s obligation. The deletion is only defensible **with** that row. |
| The diff touches `vitest.setup.ts` because T3's single-clause form felt weak. | `git diff --name-only` lists it. That widening is **B3** and is `product-manager`'s; taking it at G5 breaches AC4. |
| `pnpm test`'s count drifts below `spec.md` AC8's `≥ 506 / 58` because another spec's in-flight work lands or reverts. | The count moves without any `it` block being added or removed by these seven tasks. The baseline measured at G4 is **517 / 60** (G4-E1), already above AC8's floor; G5 and G6 re-measure their own. |
