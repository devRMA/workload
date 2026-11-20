pass

Revisão óptica subsequente: build, lint, 536 Vitest e `CI=true PORT=3197 pnpm e2e --workers=4 --retries=0` (170 casos) passaram. O teste de deformação distingue scroll e preferência por movimento reduzido; a camada usa CSS, sem listener de scroll nem dependência nova.

## Gate output

Run 2 reviewed the `feat/workload-glass` working tree over `61ae049`. The orchestrator reported a clean isolated production build, lint, typecheck, docs check and coverage run with 536/536 Vitest tests. `git diff --check 61ae049` exited 0. The isolated full Playwright run passed 164/167. Its three failures were the same settings expectation, which expected `0deg` for the neutral computed rotation returned as `none`. The test now compares against the resting rotation and still requires `90deg` with normal motion. The three affected projects passed on the same application build in a targeted rerun. The full run and targeted rerun provide complementary results.

Coverage counts are from the current Vitest HTML output. The four component directories were summed from their separate reports.

| Area | Statements | Branches | Functions | Lines |
| --- | --- | --- | --- | --- |
| `app/**` | 100% (30/30) | 100% (0/0) | 100% (10/10) | 100% (30/30) |
| `components/**` | 99.74% (390/391) | 99.62% (260/261) | 100% (129/129) | 100% (363/363) |
| `hooks/**` | 100% (245/245) | 100% (91/91) | 100% (53/53) | 100% (218/218) |
| `lib/**` | 100% (281/281) | 100% (136/136) | 100% (68/68) | 100% (254/254) |

## Acceptance criteria

| Criterion | Implementation | Proof | Result |
| --- | --- | --- | --- |
| Jornada prioritizes the exit time over progress | `components/organisms/hero-panel.tsx:53`, `components/organisms/work-calculator.tsx:224` | `tests/e2e/work-calculator.spec.ts:24` requires the default exit value and ring to be visible at 390 × 844 and the value’s bottom above the ring’s top. | Pass |
| Both stacked result links focus their respective form headings below the header | `components/organisms/hero-panel.tsx:78`, `components/organisms/journey-form.tsx:83`, `components/organisms/salary-calculator.tsx:83`, `components/templates/calculator-layout.tsx:16` | `tests/e2e/work-calculator.spec.ts:32` verifies sequential focus through the Jornada result and checks the destination focus and header geometry on both routes. An independent keyboard run reached the salary link via Tab. | Pass |
| Dock labels and current state remain, with an immediate calculator swap | `components/organisms/calculator-views.tsx:35`, `components/organisms/calculator-views.tsx:67` | `__tests__/calculator-views.test.tsx:41` checks labels, hrefs and active state. At line 50 it checks the incoming and removed panels synchronously. The Playwright path exercises actual dock navigation. | Pass |
| Both themes and solid chrome fallback work, with calculator behavior preserved | `app/globals.css:209`, `components/organisms/app-header.tsx:28`, `components/organisms/calculator-views.tsx:39` | `tests/e2e/work-calculator.spec.ts:57` requires two chrome surfaces and checks computed filter and fill before and after higher contrast. `.specs/0100-glass-interface/reports/audit.md` records the final-build matrix for both themes and routes, including reduced transparency. Existing calculator regression suites passed. | Pass |

## Findings and resolution

- Run 1 rejected because focus order on narrow screens bypassed the edit shortcut until after the form, the tests allowed the old route exit wait and reversed visual hierarchy, and preference overrides lacked computed browser evidence. The source order now matches the stacked layout, the transition and geometry assertions cover those changes, and the preference checks read computed CSS. The mobile Safari route case initially failed with legacy `scroll={false}` after fragment navigation. The dock now uses Next’s default route scrolling, and the corrected route-and-fragment check passed in all three browser projects.
- At 1440 × 900 on the isolated production build at port 3193, the first Tab after the final dock link reached “Configurações da Jornada” in Chromium, which supports `reading-flow: grid-rows`. In WebKit it reached “Copiar horário de saída”, consistent with the documented result-first fallback. At 390 × 844 both engines tabbed through the salary period control to “Editar salário” and Enter focused “Custo da Hora”. These checks used default calculator data and accepted consent. Dock route navigation uses native Next focus behavior. Fragment focus is asserted against the actual target.

## Test quality and code craft

The no-wait check fails if the old panel remains after render. The geometry check fails if the ring returns above the exit. With reduced motion and Jornada settings expanded on port 3193, removing the rotation override only in the live DOM produced `90deg` in Chromium and WebKit. Restoring the override produced `none` in both. The audit records the edit link’s computed active scale changing from `0.97` to `1` under reduced motion. The edited settings classes use `cn()`.

## What passed

Calculation modules, dependencies, legal references and route paths match the baseline. The ring keeps its existing percentage math, and the timer keeps its separate announcement. Both native fragment links and the new media-query behavior have browser evidence on the delivered application code.
