# 0009 — QA report (G6)

> Owner: qa-engineer · Gate: `qa` · Run 1 · 2026-09-19

## Verdict

**pass**

Every replacement this spec ships was re-derived here, independently of G4 and of G5, against the
**delivered** tree — not against `git archive HEAD`. Five jsdom replacements were each seen green
against correct code and **red against the defect they name, one at a time, one failure each, zero
collateral**. A7's vacuity was reproduced in a browser at the pre-fix state (loop body **0**
iterations, reports green) and the corrected guard was seen red against the real product defect
(a DS4 paragraph removed → all 8 DS4 cases fail with the LG1.2 message). A1's pre-fix death was
reproduced at `14 passed (14)`. Nothing in this spec's seven files is an assertion that cannot fail
against the property it names, with the one low-severity exception named in **Q-3**, which rides
inside an `it` that *is* red.

Seven findings follow. **None of them is a defect in `0009`'s work**: five are alien (sibling specs'
uncommitted work in the shared tree), one is a verification gap created by the shared tree having no
commit boundary for this spec, and one is a craft observation. All are routed to `tech-lead`.

---

## Isolation and the state of the shared tree

`AGENTS.md` §3 rule 6. **No file in the repository was written by this gate.** Every command that
could mutate anything ran in one of four session-local isolated copies under the session scratchpad,
built with `rsync --exclude node_modules --exclude .next --exclude .git` plus `cp -al` for
`node_modules`. No state-changing git command was run.

| Copy | Substrate | Used for |
|---|---|---|
| `qa-work` | the **delivered** working tree, verbatim | build, lint, typecheck, test, coverage, all e2e |
| `qa-head` | `git archive HEAD` | the HEAD baseline, and A1's pre-fix vacuity |
| `qa-head-plus9` | `git archive HEAD` + `0009`'s six solely-owned files | AC6/AC7 attribution |
| `qa-refute` | `qa-head-plus9` + T1's two hunks applied by hand | the five refuting experiments |

`git status --porcelain` at the start and at the end of this gate: **162 entries both times**, and
`md5sum` on `__tests__/day-summary.test.tsx`, `components/organisms/cookie-consent.tsx` and
`components/organisms/calculator-views.tsx` unchanged across the gate. The three source files I
mutated for refuting experiments were mutated **in `qa-work` and `qa-refute` only**, and restored
from a byte-compare backup in the same command.

**The shared tree carries five specs' uncommitted work at once** — `0003`, `0007`, `0008`, `0010`,
`0011` — and two of `0009`'s seven files are **co-edited** by a sibling:

- `__tests__/day-summary.test.tsx` — `0009` owns two hunks (`[style*='width']`); the DSR/Súmula
  string renames and the four new `it` blocks at `:201-229` are a sibling's.
- `tests/e2e/disclosure-legibility.spec.ts` — `0009` owns the two `assertLr2bAcrossParagraphs`
  replacements and the import; the whole `"the three captions added by 0003"` describe at `:110-229`
  is `0003`'s.
- `tests/e2e/support/legibility.ts` — `0009` owns the import widening, the three constants and
  `assertLr2b`/`assertLr2bAcrossParagraphs`; `D3_LEGEND_SELECTOR`, `D4_CAPTION_TEXT` and
  `D6_CAPTION_SELECTOR` are `0003`'s.

Attribution was done per hunk, not per file, and every number below says which.

**Two sibling `next-server` processes were listening on `:3100` and `:3917`** when this gate opened,
with `load average 24.17`. No Playwright browser was running (`ps` showed only the operator's own
Chrome). I waited until `load average` fell to `14.21` before any browser measurement, ran on
port **4931** (`ss -ltn` confirmed free), with `--workers=4`, and never used `next dev`.

---

## Gate output

All five commands ran in `qa-work` — the delivered tree, isolated.

| Gate | Command | Result |
|---|---|---|
| **build** | `PORT=4931 next build` | **exit 0.** 10 routes, all `○ (Static)` prerendered. |
| **lint** | `biome check .` | **`Checked 150 files in 51ms. No fixes applied.`** 0 errors, 0 warnings — repo-wide, not by file name. The two sibling Biome findings G5 recorded (`column-stability.spec.ts`, `salary-calculator.tsx`) have since been resolved by their owners. |
| **typecheck** | `tsc --noEmit` | **exit 0**, no output. |
| **test** | `vitest run` | **`Test Files 61 passed (61)`, `Tests 609 passed (609)`.** |
| **coverage** | `vitest run --coverage` | **exit 0** — every configured threshold passed. Per area below. |
| **comment guard** | `vitest run __tests__/comment-free-code.test.ts` | **`Tests 1 passed (1)`.** The guard's `SOURCE_DIRECTORIES` covers `__tests__` and `tests`, so all seven files are in its scope. |
| **docs** | `node .agents/tools/docs-check.mjs 0009-tests-asserting-on-class-strings` | **`0 falha(s), 0 aviso(s)`** (AC11). |
| **e2e** | `PORT=4931 playwright test tests/e2e/disclosure-legibility.spec.ts --grep "Disclosure legibility — DS"` | **`48 passed`**, twice. |

### Coverage per area — never as an aggregate

Computed from `coverage-summary.json`, aggregated by directory. **No threshold in
`vitest.config.ts:16-21` was lowered** — the file is unmodified against HEAD (`git status` does not
list it).

| Area | Bar | Statements | Branches | Functions | Lines | Files | Verdict |
|---|---|---|---|---|---|---|---|
| `lib/**` | 100 / 100 / 100 / 100 | **100.00** | **100.00** | **100.00** | **100.00** | 15 | **pass** |
| `hooks/**` | 100 / 100 / 100 / 100 | **100.00** | **100.00** | **100.00** | **100.00** | 4 | **pass** |
| `app/**` | 90 / 90 / 90 / 90 | **100.00** | n/a (no branch) | **100.00** | **100.00** | 10 | **pass** |
| `components/**` | 90 / 90 / 90 / 90 | **99.51** | **99.25** | **100.00** | **99.74** | 33 | **pass** |
| `All files` | — | 99.78 | 99.58 | 100 | 99.88 | 62 | see **Q-2** |

The only two files under 100% are `components/organisms/ad-manager.tsx` (93.75 / 90, line 12) and
`components/organisms/salary-calculator.tsx` (96.87 / 97.22 / — / 96.87, line 157). **Neither is one
of this spec's seven files, and neither is touched by any assertion this spec writes.**

---

## AC2 / AC3 — the refuting experiments, re-derived

Per AC2 each site gets its **own** run with its **own** defect, so "one failure per substitution,
zero collateral" is a measurement rather than an inference from a five-at-once aggregate. Substrate:
`qa-refute` (HEAD + `0009`'s edits), so the failures cannot be a sibling's.

**Green against correct code first:**
`vitest run __tests__/{day-summary,hero-panel,layout,modal-dialog,alert-banner}.test.tsx`
→ **`Test Files 5 passed (5)`, `Tests 43 passed (43)`** — matches `plan.md` G4-E2 and `STATUS.md`
G5-E1 to the count.

| # | Site | Defect injected (isolated copy) | Command | Printed | Failing `it` |
|---|---|---|---|---|---|
| **A1** | `day-summary.test.tsx:85-99` | `if (total === 0) return null;` deleted from `components/organisms/day-summary.tsx:50` | `vitest run __tests__/day-summary.test.tsx` | **`1 failed \| 13 passed (14)`** | `drops the timeline when nothing has been worked` |
| **A2** | `hero-panel.test.tsx:69-82` | `hero-panel.tsx:62`'s footer wrapper made unconditional | `vitest run __tests__/hero-panel.test.tsx` | **`1 failed \| 6 passed (7)`** | `adds no separated block to the panel when there is no footer` |
| **A3** | `layout.test.tsx:16-26` | `className` prop deleted from `<body>` at `app/layout.tsx:61` | `vitest run __tests__/layout.test.tsx` | **`1 failed \| 5 passed (6)`** | `puts the font object's own variable class on the body` |
| **A3′** | same | `app/layout.tsx:61` switched to `hyperlegible.className`, mock as shipped | `vitest run __tests__/layout.test.tsx` | **`6 passed (6)` — GREEN** | none. **This is X-4/B3, confirmed a third time.** See **Q-4**. |
| **A4** | `modal-dialog.test.tsx:96` (deleted) | — | — | **no experiment, by design.** See AC5 below. | — |
| **A5** | `modal-dialog.test.tsx:88-97` | `className` dropped from the `cn()` call at `components/atoms/modal-dialog.tsx:53` | `vitest run __tests__/modal-dialog.test.tsx` | **`1 failed \| 7 passed (8)`** | `merges the caller className into the scrollable content wrapper` |
| **A6** | `alert-banner.test.tsx:49-55` | `className` dropped from the `cn()` call at `components/atoms/alert-banner.tsx:23` | `vitest run __tests__/alert-banner.test.tsx` | **`1 failed \| 7 passed (8)`** | `merges custom className` |
| **A7** | `disclosure-legibility.spec.ts:58-105` | `<p className="text-caption font-semibold text-accent-ink">Sempre ativo</p>` removed from `components/organisms/cookie-consent.tsx` (a real DS4 paragraph, not a selector edit) | `PORT=4931 playwright test … --grep "DS4, the privacy settings dialog" --project=chromium` | **`8 failed`** — every DS4 case, with `Error: DS4 / 390x844 light — LG1.2: the surface rendered 4 paragraphs, expected 5` | all 8 |
| **F4** | `disclosure-legibility.spec.ts:31-48` | one `<p>` removed from DS1's footer at `components/organisms/calculator-views.tsx:86-92` | `PORT=4931 playwright test … --grep "DS1, the legal footer" --project=chromium` | **red**, with `Error: DS1 / 390x844 light — LG1.2: the surface rendered 3 paragraphs, expected 4` | all 8 |

Every defect was restored from a byte-compare backup in the same command; `diff -q` confirmed
restoration before the next run.

### AC3 — the two pre-fix vacuity reproductions

| Claim | How it was reproduced | Printed |
|---|---|---|
| **A1 is dead pre-fix.** | In `qa-head` (`git archive HEAD`, i.e. `day-summary.test.tsx:96` still reading `.rounded-full.bg-neutral-100`), `if (total === 0) return null;` deleted from `day-summary.tsx:50`, then `vitest run __tests__/day-summary.test.tsx`. | **`Test Files 1 passed (1)`, `Tests 14 passed (14)`** — reproduces `spec.md` E3 exactly. The suite is blind to the defect the assertion was written to prevent. |
| **A7's loop body executes zero times and reports green.** | In `qa-work`, a throwaway probe spec replicating the **pre-fix** DS4 loop verbatim with the selector renamed to `p.text-caption-renamed-by-a-token-migration`, run in a browser at 390×844. | **`PROBE vacuous-selector: matched=0 loopBodyRuns=0`** — and the test **passed**. The same failure mode as A1, in `0006`'s permanent legibility guard. |
| **A7 is a live defect, not a future risk.** | Same probe, with the shipped pre-fix selector. | **`PROBE prefix-selector: p.text-caption=3 p=5`**; `PROBE skipped by p.text-caption: ["Cookies Essenciais","Telemetria (Google Analytics)"]`. Reproduces `legal.md`'s F3 to the string: the two paragraphs that name **which purpose** each toggle governs were the two the guard skipped. |

Both probe files were deleted from the isolated copy after the run; neither exists in the repository.

---

## Acceptance criteria

| # | Criterion | Code that satisfies it | Test / evidence that proves it | Verdict |
|---|---|---|---|---|
| **AC1** | Inventory reproduces | `spec.md` § Inventory, re-confirmed at G4 | `grep -rn "bg-neutral-100" components/ app/ __tests__/ tests/` → **0 occurrences** (the dead selector is gone repo-wide); `grep '"my-custom"' __tests__/` → the five prop-contract sites; `mb-6` → **0** in `alert-banner.test.tsx`. All seven rows disposed of. | **pass** |
| **AC2** | Seven refuting experiments recorded with counts | § AC2/AC3 above | Six runs with printed counts; A4 has none **by design** (`plan.md` T4), discharged under AC5. | **pass** |
| **AC3** | A1 and A7 pre-fix vacuity reproduced | § AC3 above | `14 passed (14)`; `loopBodyRuns=0` with a green verdict. | **pass** |
| **AC4** | Diff confined to the six files plus `legibility.ts`; `alert-banner.test.tsx` change confined to the sentinel | all seven files are under `__tests__/` and `tests/` | `git diff -- __tests__/alert-banner.test.tsx` read line by line: **exactly two lines change**, both the sentinel string `mb-6` → `my-custom`; the `it` name `"merges custom className"`, the assertion shape and `container.firstElementChild` are byte-identical. | **pass** for `0009`'s own hunks — see **Q-1** for why the stated command cannot be run |
| **AC5** | Every removed assertion's obligation named | § AC5 below | one row per removed assertion | **pass** |
| **AC6** | Zero diff over `app/ components/ lib/ hooks/` | no hunk attributable to `0009` touches those directories | `qa-head-plus9` = `git archive HEAD` + `0009`'s six solely-owned files, **source completely untouched** → `Test Files 58 passed (58)`, `Tests 506 passed (506)`, coverage `99.88 / 99.77 / 100 / 100`. `0009`'s tests pass against unmodified HEAD source, which is strictly stronger than the stated command. | **pass by substitute evidence** — see **Q-1** |
| **AC7** | Every configured threshold passes; `All files` at or above `99.88 / 99.77 / 100 / 100` | — | Thresholds: **all pass** (exit 0), per-area table above. `All files` in the delivered tree is **99.78 / 99.58 / 100 / 99.88** — *below* the baseline. **Attributed by measurement to a sibling**, not to `0009`: see **Q-2**. | **pass**, with Q-2 routed |
| **AC8** | `pnpm check` green, `Tests ≥ 506 across ≥ 58 files` | — | lint + typecheck + test all clean; **`Test Files 61 passed (61)`, `Tests 609 passed (609)`**. The floor is met. The total is above `plan.md`'s measured-today `517/60` because sibling work landed — **not a regression**, exactly as `plan.md` § Risks anticipated. Attribution: `0009` adds and removes **zero** cases (`qa-head-plus9` prints `506/58`, identical to HEAD). | **pass** |
| **AC9** | `disclosure-legibility.spec.ts` green twice at its recorded case count, own `.next` and port | — | `playwright test --list` → **`Total: 84 tests in 1 file`**, of which **48** are `0009`'s two describes and **36** are `0003`'s. Both runs of the 48: **`48 passed (45.0s)`** and **`48 passed (58.2s)`**, port 4931, own `.next`. `lr2b-coverage` annotations, all 48 of each run: **DS1 `measured 4 + exempt 0 = 4`** (×24), **DS4 `measured 0 + exempt 5 = 5`** (×24). Every sum holds. | **pass** — see **Q-7** on the count and **Obs-1** on DS4's exemptions |
| **AC10** | `plan.md` reconciles any permanent guard with `0006`'s refusal | `plan.md` § *AC10 — the permanent guard question, reconciled against `0006`* | The section names `0006/STATUS.md` (tech-lead, 2026-09-15), separates the appearance guard from the falsifiability guard, and answers **no** on its own merits with the mutation-testing argument. | **pass** |
| **AC11** | `docs-check.mjs` reports 0 failures | — | `0 falha(s), 0 aviso(s)` | **pass** |

### AC5 — the disposition of every removed assertion

Stated in AC5's own words.

| Removed | Obligation | Carried by |
|---|---|---|
| `day-summary.test.tsx:96` (pre-fix) `.rounded-full.bg-neutral-100` | *no proportional track when no minute was worked* | the obligation of `day-summary.test.tsx:96` is now carried by `day-summary.test.tsx:96,97,98` — `querySelectorAll("[style*='width']")` at 0, and `queryByText("08:00")` / `queryByText("17:48")` — in the same `it`. **Measured:** the assertion that actually fires against the defect is `:98` (`AssertionError: expected <span>08:00</span> to be null`). See **Q-3** for `:96`. The **positive control** is `day-summary.test.tsx:60`, `toHaveLength(3)`, which was **seen red** when `style={{ width: … }}` was removed from `day-summary.tsx:56` → `1 failed \| 13 passed (14)`. |
| `hero-panel.test.tsx:72` (pre-fix) `.border-t` | *no separator block when there is nothing to separate* | the obligation of `hero-panel.test.tsx:72` is now carried by `hero-panel.test.tsx:75` and `:81` — `content.children` at 2 without a footer and 3 with one, across a `rerender`. Both halves falsifiable: the `rerender` is the positive control for the `2`. |
| `layout.test.tsx:21` (pre-fix) `"font-hyperlegible"` literal | *the body carries the font object's variable class* | the obligation of `layout.test.tsx:21` is now carried by `layout.test.tsx:24`, on the same body `className`, with the copied literal replaced by its source. **Strength unchanged, honestly recorded as debt X-4** — see **Q-4**. |
| **`modal-dialog.test.tsx:96`** (pre-fix) `overscroll-contain` — **deleted, not replaced** | *the modal traps the scroll chain* | **split, and both halves named.** The sibling half — *the page behind does not scroll* — is carried by `__tests__/modal-dialog.test.tsx:28,43,52,57,61` (**verified today**: `grep -n 'document.body.style.overflow'` returns exactly `20, 28, 43, 52, 57, 61`, the five assertions plus the `beforeEach` reset). The chaining half is **carried by nothing in jsdom** and is debt **X-2** in `STATUS.md`, owner `web-standards-auditor`. **`overscroll-contain` is still in the source** (`components/atoms/modal-dialog.tsx:53`) — the class was not deleted, only the assertion on it. **No substitute assertion was invented**, as the brief required: the delivered `it` has exactly one `expect`. |
| `modal-dialog.test.tsx:97` (pre-fix) `max-w-lg` | **identity** half: *the caller's class survives `cn()`* · **constraint** half: *the caller's width cap is the one that renders* | identity → `modal-dialog.test.tsx:96` as rewritten, with a non-utility sentinel; constraint → `tests/e2e/disclosure-legibility.spec.ts:76-77`, which measures the DS4 panel's rendered width in a browser, DS4 being the live caller passing `max-w-lg` (`cookie-consent.tsx:85` — **note the line has drifted from X-3's recorded `:84`**, see **Q-6**). Recorded as debt **X-3**. |
| `alert-banner.test.tsx:54` sentinel `mb-6` | *a caller-supplied `className` survives `cn()`* | carried by `:54` itself, with a sentinel `tailwind-merge` cannot eat — **measured**, see § Sentinel probe. |
| `disclosure-legibility.spec.ts:60` (pre-fix) `p.text-caption` | *every paragraph the consent panel renders reads as prose at its own size* | carried by `assertLr2bAcrossParagraphs`'s per-paragraph `assertLr2b` over `surface.locator("p")` — a **superset**: 5 paragraphs where `:60` reached 3, measured (`PROBE prefix-selector: p.text-caption=3 p=5`). |

---

## The two traps the brief named, checked directly

### A6's sentinel — `my-custom` reuses the repo convention and does not collide

The repository already had `my-custom` in three sibling tests. `0009` reuses it in
`alert-banner.test.tsx:51,54` and `modal-dialog.test.tsx:90,96`. **No fourth spelling was
invented** — `grep -rn '"my-custom"' __tests__/` returns exactly five files and ten lines, all the
same string.

Clause C3 says the sentinel must be a string `cn()`'s merge cannot void. **Measured, not argued** — a
throwaway probe calling the repo's own `cn()` from `lib/utils.ts` (which extends `tailwind-merge`
with the eleven type steps):

```
cn("my-6", "my-custom")                        = my-6 my-custom
cn("my-custom", "my-6")                        = my-custom my-6
cn("mb-6", "my-custom")                        = mb-6 my-custom
cn("rounded-lg border px-3 py-4", "my-custom") = rounded-lg border px-3 py-4 my-custom
cn("my-[3px]", "my-custom")                    = my-[3px] my-custom
```

`tailwind-merge` places `my-custom` in **no class group** — `my-` requires a recognized value
(number, fraction, arbitrary, `px`, `auto`, `full`) and `custom` is none of them. The component's own
class list (`alert-banner.tsx:23`) survives alongside it in every direction. **C3 cannot reach the
new sentinel**, which is exactly the property `design.md` §2 A6 and `legal.md` §5 asked for.
Contrast `mb-6`, which *is* a live utility and which `cn()` would have voided the day `AlertBanner`
gained any `mb-*`.

*(Residual, recorded not raised: `my-` is Tailwind v4's margin-block namespace, so a future
`--spacing-custom` theme token would give `my-custom` a rendered margin. It would still not collide —
`tailwind-merge` does not group it either way — so the C3 mechanism stays closed. This is the
repository's existing convention, blessed by `spec.md` § *The delta*, `design.md` §2 and `legal.md`
§5, and changing it is outside this spec.)*

### A4 was deleted, not substituted

`__tests__/modal-dialog.test.tsx:88-97` as delivered:

```tsx
it("merges the caller className into the scrollable content wrapper", () => {
  …className="my-custom"…
  const wrapper = container.querySelector("dialog > div") as HTMLElement;
  expect(wrapper.className).toContain("my-custom");
});
```

**One `expect`.** No e2e file was added for `overscroll-contain`, no `getComputedStyle` check was
written, nothing was "kept just in case". `grep -rn "overscroll-contain" components/ app/` returns
one hit — the source, untouched. `git diff` on the file is **+2 / −3**: the sentinel changed and two
assertion lines became one. The AC5 row naming `modal-dialog.test.tsx:28,43,52,57,61` and debt
**X-2** is above, which is the condition `plan.md` § Risks set for the deletion being defensible.

### `copy.md` §2's frozen literals

Every load-bearing literal checked in the delivered file, by `grep`:

| Literal | Expected at | Found at | Verdict |
|---|---|---|---|
| `Tudo o que você digita fica salvo apenas neste navegador` | `disclosure-legibility.spec.ts:32` | `:41` | **byte-identical**, line drifted by T7's import block |
| `Telemetria (Google Analytics)` | `:72` | `:83` | byte-identical |
| `Salvar Preferências` | `:73` | `:84` | byte-identical |
| `Fechar configurações de privacidade` | `:74` | `:85` | byte-identical |
| **`Configurar`** | `legibility.ts:102` | `:132` | **byte-identical** — `await page.getByRole("button", { name: "Configurar" }).click();`. All eight DS4 cases still reach their assertions; the two green 48-case runs are the proof, since a rename would have failed them at the click. |
| `WorkLoad \| Calculadora Inteligente de Horas e Salário` | `layout.test.tsx:40` | `:44` | byte-identical |
| `Calcule sua jornada de trabalho, …` | `layout.test.tsx:44` | `:48` | byte-identical |
| 19 `day-summary.test.tsx` literals | various | `:60-228` | **17 byte-identical.** Two moved — see **Q-5**, alien. |

---

## Findings

Severity: **blocking** stops the gate · **medium** must be tasked before release · **low/info**
recorded. None of the seven is blocking, and none belongs to `0009`'s own work.

### Q-1 — AC4 and AC6 cannot be run as written: `0009` has no commit boundary · **medium** · routed to `tech-lead`

- **Where:** the repository as a whole; `spec.md` AC4 and AC6.
- **What is wrong:** both criteria are verified by
  `git diff --name-only <this spec's first commit>^..HEAD`. **There is no such commit.** `0009`'s
  seven files are uncommitted working-tree modifications, interleaved in the same `git status` with
  `0003`, `0007`, `0008`, `0010` and `0011`'s uncommitted work — including in two of `0009`'s own
  seven files. `git diff --name-only -- app/ components/ lib/ hooks/` prints **22 paths** today, none
  of them `0009`'s, and no git command can prove that from the tree alone.
- **Rule:** `spec.md` AC4, AC6 — and the property AC6 exists to protect: *"if source moves in the
  same commits, no reviewer can tell a test that was fixed from a test that was made to pass."*
- **Reproduce:** `git log --oneline -1` → `5c0c6fa docs(release): record the G10 push…`, a docs
  commit for `0006`. `git status --porcelain | wc -l` → `162`.
- **What I substituted, and why it is stronger:** `qa-head-plus9` = `git archive HEAD` with
  **source completely untouched**, plus only `0009`'s six solely-owned files. Result:
  `Test Files 58 passed (58)`, `Tests 506 passed (506)`, coverage `99.88 / 99.77 / 100 / 100` —
  byte-identical to the HEAD baseline. `0009`'s replacements pass against unmodified HEAD source, so
  no test was "made to pass" by moving source. That is the claim AC6 wanted.
- **What must still happen:** `release-manager` at G7 re-runs AC4 and AC6 **verbatim** once `0009`'s
  seven files are committed in isolation from the five sibling specs. This gate cannot discharge the
  commands themselves.

### Q-2 — the delivered tree's `All files` coverage row is below AC7's baseline, and it is a sibling's · **medium** · routed to `tech-lead`

- **Where:** `components/organisms/salary-calculator.tsx:157` (uncovered), and
  `components/organisms/ad-manager.tsx:12`.
- **What is wrong:** `All files` reads **99.78 / 99.58 / 100 / 99.88** against AC7's recorded
  `99.88 / 99.77 / 100 / 100`. AC7 says *"a drop is a finding with a written reason, not an accepted
  cost"*.
- **Rule:** `spec.md` AC7.
- **Attribution — measured, not asserted:** `git archive HEAD` alone → `99.88 / 99.77 / 100 / 100`.
  `git archive HEAD` + `0009`'s six solely-owned files → **`99.88 / 99.77 / 100 / 100`, identical.**
  The delivered tree → `99.78 / 99.58 / 100 / 99.88`. **`0009` moves coverage by exactly zero.** The
  drop arrives with the sibling's in-flight `salary-calculator.tsx`.
- **Reproduce:** `vitest run --coverage --coverage.reporter=json-summary` in each of the three copies.
- **Note:** every *configured* threshold still passes, and `components/**` is at 99.51 against a bar
  of 90, so nothing is breached. The owner of `salary-calculator.tsx`'s spec covers line 157 before
  its own G6, or writes the reason.

### Q-3 — `day-summary.test.tsx:96` cannot go red against the defect A1 names · **low** · `0009`

- **Where:** `__tests__/day-summary.test.tsx:96` —
  `expect(container.querySelectorAll("[style*='width']")).toHaveLength(0);`
- **What is wrong:** in the empty-day fixture, `segments: []`, so `DayTimeline`'s `.map` emits zero
  bars **whether or not** the `total === 0` guard exists. The assertion returns 0 against both the
  correct tree and the defect. **Measured:** with the guard deleted, the failure is at
  **`day-summary.test.tsx:98`** — `AssertionError: expected <span>08:00</span> to be null` — not at
  `:96`.
- **Rule:** `AGENTS.md` §8 *assert observable behavior*; `spec.md` clause C2 in spirit.
- **Why it is low and not a reject:** the three assertions express the conjunction `design.md` §2 A1
  states as the property of record (*neither the clock labels nor any inline-percentage child
  exists*), the `it` **is** red against the defect, and the selector is **not** dead — its positive
  control at `:60` was seen red when `style={{ width: … }}` was removed from `day-summary.tsx:56`
  (`1 failed | 13 passed (14)`). So it is not an A1 in the making; it is an assertion riding along
  with two that carry.
- **Reproduce:** in an isolated copy, delete `if (total === 0) return null;` from
  `components/organisms/day-summary.tsx:50` and run `vitest run __tests__/day-summary.test.tsx`;
  read the reported line number.
- **Disposition suggested:** none required by any criterion. If `tech-lead` wants the line to earn its
  place, the falsifiable form is the one at `:60` — a non-empty fixture with the guard's boundary
  crossed — and that is `B2`/`D4` territory (the proportionality criterion `product-manager` has not
  written), not a correction to `0009`.

### Q-4 — X-4/B3 is still recorded and still honest · **info** · no action

- **Where:** `__tests__/layout.test.tsx:24`, `vitest.setup.ts:11`.
- **Confirmed independently, a third time:** switching `app/layout.tsx:61` to
  `hyperlegible.className` alone, with the mock as shipped, leaves `layout.test.tsx` **`6 passed
  (6)`**. `vitest.setup.ts:11` returns the literal `"font-hyperlegible"` for **both** `className` and
  `variable`, so the two are indistinguishable under test.
- **The honest statement of what T3 bought:** under the mock, `toContain(hyperlegible.variable)` is
  behaviourally identical to the literal it replaced. It is falsifiable against exactly one defect —
  the `className` prop being dropped from `<body>` (`1 failed | 5 passed (6)`, measured) — which is
  the same one defect the pre-fix assertion caught. What changed is that the literal is no longer
  **copied**: a rename of the CSS variable now moves the expectation with the source. **Strength
  unchanged, coupling removed.**
- **`STATUS.md` states this correctly** in `X-4` (*"in a real build that is a generated
  `__variable_*` class, and nothing anywhere checks `getComputedStyle(document.body).fontFamily`"*),
  in `B3`, and in `G5-E3`. **Nothing is marked fixed that is not.** No action; the debt's owner is
  `web-standards-auditor` and its trigger is the next spec touching `app/layout.tsx`'s font setup.

### Q-5 — two `copy.md` §2 literals moved, with their source · **info** · alien, routed to `tech-lead`

- **Where:** `__tests__/day-summary.test.tsx`; `components/organisms/day-summary.tsx:224,239`.
- **What moved:** `DSR sobre os extras` → `DSR de extras e noturno`, and `Súmula 172 do TST` →
  `Súmula 172`. `copy.md` §2.1 lists both as frozen.
- **Why it is not a breach by `0009`:** the **shipped** string moved first —
  `day-summary.tsx:224` now renders `DSR de extras e noturno` — and the test was updated in the same
  sibling hunk, which is `copy.md` §2.1's own definition of a load-bearing literal behaving
  correctly. `0009`'s two hunks in this file are the `[style*='width']` assertions and the container
  capture; neither touches a string.
- **Reproduce:** `git diff -- __tests__/day-summary.test.tsx components/organisms/day-summary.tsx`.
- **Disposition:** `copy.md` §2.1's `day-summary.test.tsx` row is stale as of the sibling's landing.
  `tech-lead` routes the correction to whichever spec owns the DSR caption.

### Q-6 — `STATUS.md` X-3 cites a line that has drifted · **info** · `0009`

- **Where:** `.specs/0009-…/STATUS.md`, debt **X-3**, and `plan.md` T4, both citing
  `cookie-consent.tsx:84` as the live caller passing `max-w-lg`.
- **What is wrong:** it is **`:85`** in the delivered tree. `grep -n "max-w-lg"
  components/organisms/cookie-consent.tsx` → `85:`.
- **Rule:** the debt-recording convention this spec's own `STATUS.md` opens with — a debt recorded as
  a coordinate rots, which is the lesson `0009` exists because of.
- **Disposition:** one-character correction in `STATUS.md` and `plan.md`, or better, re-record X-3 by
  its rule rather than its line. Not blocking; the carrier assertion itself was verified green.

### Q-7 — G5's e2e evidence was produced against `git archive HEAD`, not the delivered tree · **info** · no action

- **What:** `STATUS.md` G5-E6 records DS1's annotation as *"`measured 3 + exempt 1 = 4` at 1440
  wide"*. **In the delivered tree it is `measured 4 + exempt 0 = 4` in all 24 DS1 cases, both runs.**
- **Why:** G5 built its copy from `git archive HEAD` + `0009`'s seven edits, so its DS1 paragraphs
  were HEAD's; the delivered tree carries a sibling's edits to
  `components/organisms/calculator-views.tsx`, which changes how DS1's paragraphs wrap.
- **Why it is not a finding:** the LG1.3 invariant — `measured + exempt = expected` — holds in both,
  and G5's substrate choice was correct at the time (the shared working tree would not build). This
  gate's runs are against the delivered tree and are the binding evidence for AC9.
- **`playwright test --list` reports `Total: 84 tests in 1 file`, not 48.** 36 of them are `0003`'s
  `"the three captions added by 0003"` describe, added to the same file after G4 measured 48.
  `0009`'s two describes still list and pass at exactly **48**. AC9's recorded count is intact; the
  file's total is not `0009`'s number.

---

## Test quality — read as an adversary

**Would each of these fail if the behaviour broke?** Answered by running it, not by reading it.

| Assertion | Verdict |
|---|---|
| `day-summary.test.tsx:60` `toHaveLength(3)` | **Yes.** Seen red: `style={{ width: … }}` removed from `day-summary.tsx:56` → `1 failed \| 13 passed (14)`. The plan's risk (a second inline style appearing in the component) has **not** fired: `grep -c 'style=' components/organisms/day-summary.tsx` → **1**, in the delivered tree. |
| `day-summary.test.tsx:97,98` clock labels | **Yes.** These are the two that fire against A1's defect. |
| `day-summary.test.tsx:96` `toHaveLength(0)` | **No, not against A1's named defect.** **Q-3.** The only one in the seven files. |
| `hero-panel.test.tsx:75,81` `content.children` | **Yes, both.** The `rerender` is a genuine positive control — the `2` is a number that has been seen to become a `3`, and the whole `it` goes red when the footer wrapper is unconditional. |
| `layout.test.tsx:24` | **Yes, against one defect** — the prop being dropped. **Not** against a `variable`→`className` swap. Recorded as X-4, not claimed as fixed. **Q-4.** |
| `modal-dialog.test.tsx:96` | **Yes.** Red when `cn()` drops `className`. Sentinel measured non-collidable. |
| `alert-banner.test.tsx:54` | **Yes.** Same. |
| `legibility.ts:50-54` the LG1.2 count | **Yes, in both surfaces and against a real product defect** — one DS4 paragraph removed → 8 red; one DS1 paragraph removed → 8 red. Both with the rendered count in the message. |
| `legibility.ts:43` the LR2b floor | **Structurally improved beyond the plan.** Pre-fix, `if (lineBoxes > 1)` meant a locator measuring **zero** line boxes passed silently — a third vacuity vector nobody named. Post-fix, `if (lineBoxes === 1) return "exempt"` sends `lineBoxes === 0` into `expect(characters / 0)` → `NaN >= 40` → **red**. The inversion closes a hole rather than merely renaming a branch. |
| `legibility.ts:66-69` the annotation | **Reports, does not assert.** `test.info().annotations.push` cannot fail a run. It is evidence for a reader, and the plan calls it that; the verdict is carried by the `toHaveLength` above it. Correctly scoped, worth knowing. |

**Obs-1 — DS4's LR2b measure floor binds on zero paragraphs.** All 24 DS4 cases annotate
`measured 0 + exempt 5 = 5`: every one of DS4's five paragraphs is a single line box at both 390 and
1440. Verified against the source rather than inferred — the five are `Cookies Essenciais`,
`Necessários para o funcionamento do site.`, `Sempre ativo`, `Telemetria (Google Analytics)` and
`Ajuda a entender como o site é usado.`, all short labels (`cookie-consent.tsx:110-126`). So the
corrected guard's teeth on DS4 are **LG1.2's count**, not LR2b's 40-CPL floor, and the count was seen
red. This is honest under LG1.3 (the exemption is counted and the sum checked) and it is **not** a
regression — pre-fix, the three paragraphs `p.text-caption` reached were exempt too. Recorded so the
next reader does not mistake `48 passed` for *"every DS4 paragraph met the measure floor"*.

**No test in the seven files asserts a Tailwind class string.** The only `className` assertions left
are the two `my-custom` sentinels, which `AGENTS.md` §8's rule does not reach: they are prop-contract
identity checks on a string that is in no stylesheet and in no `tailwind-merge` group — measured.

**No CSS-override claim is made in jsdom** (`AGENTS.md` §8). A4 was deleted precisely because its
claim needed a computed style and jsdom has none, and A5's constraint half was routed to the browser
assertion at `disclosure-legibility.spec.ts:76-77`. Nothing here buys a threshold with a
`toHaveClass`.

---

## Code craft — `AGENTS.md` §8

Checked file by file across the seven.

| Rule | Result |
|---|---|
| **English only** | **Pass** for `0009`. Every `it`/`describe`/`test` name in the seven files is English; the only non-ASCII is the em-dash in three e2e describe titles. pt-BR appears only as fixtures and as accessible names being queried. *Alien:* `day-summary.test.tsx:201` — `it("names both parcelas the DSR base carries")` — carries a pt-BR word in an English test name; it is a sibling's hunk, recorded for `tech-lead` to route, not a `0009` finding. |
| **No comments** | **Pass.** `__tests__/comment-free-code.test.ts` → `Tests 1 passed (1)`, and its `SOURCE_DIRECTORIES` covers `__tests__` and `tests`. The single `//` a naive grep finds (`layout.test.tsx:51`) is inside the URL string `https://workload.devrma.com`; the guard parses with the TypeScript AST and correctly ignores it. No narrating comment, no spec or task reference. |
| **Descriptive names** | **Pass.** `assertLr2bAcrossParagraphs`, `expectedParagraphs`, `LR2B_MEASURE_FLOOR_CPL`, `DS1_EXPECTED_PARAGRAPHS`, `measured`/`exempt`, `paragraph`, `content`. No single letters, no invented abbreviations — `LR2b`, `LG1`, `DS1`, `DS4` are this project's own domain terms, defined in `0005`/`legal.md`. |
| **Atomic placement** | **N/A, correctly.** No source file is placed or moved. |
| **Strict TypeScript** | **Pass.** `grep` over the seven files for `: any`, `@ts-ignore`, `@ts-expect-error` and non-null assertions → **none**. `tsc --noEmit` exit 0. Two `as HTMLElement` casts (`hero-panel.test.tsx:73`, `modal-dialog.test.tsx:95`) — the second is pre-existing and byte-identical to HEAD, the first matches it; `hero-panel.test.tsx:73` is written on its own statement precisely to avoid Biome's `noUnsafeOptionalChaining`, as `plan.md` T2 instructed. |
| **Business rules in `lib/`** | **Pass.** No rate, threshold or rounding rule enters a test. `LR2B_MEASURE_FLOOR_CPL = 40` and `LR2A_CHROME_BUDGET_PX = 32` are **legibility measurement thresholds from `0005`'s LR rules**, not legal constants, and they live where their two callers are. Their values are **byte-identical** to the anonymous `40` and the existing `32` — verified in the diff, as `legal.md` § Out of scope required. |
| **Legal constants carry their source** | **Pass, and the §8 trap was navigated correctly.** `DS1_EXPECTED_PARAGRAPHS = 4` / `DS4_EXPECTED_PARAGRAPHS = 5` come from `legal.md` §3.4. A norm-citing comment is permitted in `lib/` **only**, so the rule is carried by the identifier and by the assertion's failure message (`— LG1.2: the surface rendered N paragraphs, expected M`) instead. A comment here would have been rejected by the comment guard. **The values were rendered, not just read from source** — the two green runs annotate `= 4` and `= 5`, which discharges `legal.md` §3.4's instruction that the rendered count overrules the source reading, and the `plan.md` § Risks scenario *"the developer edits the constant to match"* did **not** occur: `4` and `5` are `legal.md`'s numbers and the browser agrees. |
| **Tokens, not raw values; `cn()`** | **N/A.** No styling is written. No inline style, no hex, no arbitrary value is introduced. |
| **Motion with a reduced path** | **N/A.** No motion is written. |
| **Reuse before new code** | **Pass, and this is where the build is strongest.** `renderSummary()` and `FINISHED_DAY` reused, no fixture added; `IconClock` and `screen` reused, no import added in T2; the `my-custom` convention reused from three sibling tests rather than a fourth spelling invented; `lineBoxesAndCharacters` and the existing `expect` reused in T6; T7 writes **no** loop, **no** selector and **no** count of its own. **No new file, no new test file, no new npm script.** |
| **No unjustified dependency** | **Pass.** `git diff -- package.json pnpm-lock.yaml` → empty. The only new import is `test` from `@playwright/test`, already in the file's module graph, and `Atkinson_Hyperlegible_Next` from `next/font/google`, already a dependency and already the factory `app/layout.tsx:9` calls. |
| **Match the surrounding idiom** | **Pass.** The rewritten blocks are indistinguishable from their neighbours: same `render`/`container.firstElementChild` shape in `alert-banner.test.tsx`, same `querySelector … as HTMLElement` in `modal-dialog.test.tsx`, same `label` template-literal convention in the e2e file. |

---

## Escalation trail — `AGENTS.md` §4 rule 7

Checked for quiet decisions. **None found.**

- `plan.md` handed T1–T7 as literal code blocks. Every delivered hunk matches its block —
  including the two Biome forms T2 warned about, and including T3's **single** `expect` where D1
  suggested two.
- The one place `frontend-dev` had a genuine choice — which defect variant to inject for A3 — was
  **recorded rather than resolved silently** (`STATUS.md` G5-E3 and the 2026-09-19 decision entry),
  naming both variants and saying which discriminates. I reproduced both and confirm the record.
- The build's own blockers are in `STATUS.md` with owners: B1–B5, X-1–X-6. `B1` (does C3 reach A5),
  `B2` (the proportionality criterion), `B3` (the mock) and `B4` (F1) are all
  `product-manager`'s or the human's and none changed an instruction.
- The two alien failures `frontend-dev` hit during G5 — `salary-period.test.ts`'s transient
  `TypeError` and the `column-stability.spec.ts`/`salary-calculator.tsx` Biome findings — were
  recorded with the `git status` check that ruled them out. **Both are now resolved by their
  owners:** `biome check .` is clean repo-wide today and `vitest run` is `609 passed (609)`.

---

## What passed — so the next run does not re-litigate it

- **Build, lint, typecheck, test, coverage, comment guard, docs-check**: all clean, on the delivered
  tree, in isolation.
- **Coverage per area**: `lib/**` and `hooks/**` at 100 across all four metrics; `app/**` at 100;
  `components/**` at 99.51 / 99.25 / 100 / 99.74 against a bar of 90. **No threshold in
  `vitest.config.ts` was touched** — the file is unmodified against HEAD.
- **All eleven acceptance criteria** accounted for: nine pass outright, AC4 passes for `0009`'s own
  hunks and AC6 passes on substitute evidence, both with the commit-boundary gap routed as Q-1.
- **A6's sentinel** reuses `my-custom`, the repository's own convention, and is measured
  non-collidable through the repo's actual `cn()`.
- **A4 was deleted, not substituted**; its two carriers are named and the line numbers verified
  today.
- **A3's hole is still recorded and still honest** — X-4 and B3 say what the test does and does not
  prove, and I confirmed the mechanism independently.
- **The nineteen `copy.md` §2 literals**: seventeen byte-identical, including `"Configurar"`, whose
  survival the two green 48-case runs prove at the click. Two moved with their shipped source, by a
  sibling.
- **AC8's floor** `≥ 506 / 58` is met at `609 / 61`; `0009`'s own contribution to the count is
  **zero**, measured.
- **The nine refuting experiments** — five jsdom, two e2e count defects, two pre-fix vacuity
  reproductions — all re-derived here, none accepted secondhand.
