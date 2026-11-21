pass-pr-integration / reject-0010-closure

# PR #42 integration QA

Reviewed the integration working diff against `262c9a0`. The PR integration is ready for hosted
CI: the complete local Playwright matrix, focused reachability run, build, coverage, Lighthouse,
accessibility and static gates pass. This does not close 0010's G6 because the inherited Glass
salary layout still exceeds AC15's historical flow ceiling. Return only that criterion to the
tech lead and spec owners. [Integration scope](pr42-integration.md)

## Gate output

| Check | Result |
|---|---|
| Build, lint, and unit tests | Isolated ads-on and ads-off production builds passed. `pnpm lint` passed. Coverage passed with 669 unit tests. |
| TypeScript | `pnpm typecheck` exited 0 in the integration checkout. |
| Vitest coverage | `pnpm test:coverage` passed every enforced area threshold. The checkout HTML report gave the per-area breakdown below. |
| Browser registration | `CI=1 pnpm exec playwright test --list`, and the same command with `--shard=1/3`, `--shard=2/3`, and `--shard=3/3`, registered 872 entries split 291/291/290, with zero missing, extra or duplicated descriptors. |
| Browser execution | Three isolated ads-on production builds and ports: shard 1 `291 passed` in 2.5 min; shard 2 `290 passed, 1 skipped` in 2.4 min; shard 3 `289 passed, 1 skipped` in 5.4 min. The two skips are the same informational divisor-calibration case. Zero failures. The focused five-spec matrix passed `366/366` in 3.3 min. |
| Lighthouse and preview | Isolated ads-off build passed Lighthouse on `/` and `/custo-da-hora`: performance 96–97 and accessibility, best practices and SEO 100. Eight preview cells reported zero Axe violations and zero console errors. |
| EstimateNotice contrast | Direct Chromium/canvas reproduction at 390×844 measured `#5f656f` on `#f9fafc` = 5.62:1 in light and `#a6abb5` on `#0f1116` = 8.19:1 in dark on both routes, above the 4.5:1 floor. |
| Diff whitespace | `git diff --check` exited 0 at review. |

| Area | Statements | Branches | Functions | Lines |
|---|---:|---:|---:|---:|
| `app/**` | 29/29 | 100% (0 branches) | 10/10 | 29/29 |
| `components/**` | 99.52% (412/414) | 99.31% (287/289) | 100% (135/135) | 99.74% (385/386) |
| `hooks/**` | 243/243 | 87/87 | 52/52 | 216/216 |
| `lib/**` | 310/310 | 152/152 | 71/71 | 280/280 |

The area rows sum `abs` covered/total cells from `coverage/index.html`, grouped by the first
segment of `data-value`. App branch coverage follows the reporter's empty-set convention.

## Acceptance review

| Criterion | Code and evidence | Integration status |
|---|---|---|
| AC1 · Reachable disclosure | `components/atoms/estimate-notice.tsx` and the AC1 matrix in `tests/e2e/first-screen-reachability.spec.ts`. The design substitution reads the same statement beside the answer. | Pass for the integration: pending and answered consent states, same-frame geometry and a failing enlarged-gap control are covered. |
| AC2 · Primary value vertical position | Both calculator organisms place the notice after their existing `HeroPanel`. | The integrated value-label readings against the original G1 ceiling belong to T8. |
| AC3 · Fixed chrome height | `components/organisms/cookie-consent.tsx` adds naming semantics to the in-flow banner. | The per-cell chrome sum against the original G1 ceiling belongs to T8. |
| AC4 · Numeric text | `git diff --name-only -- app components lib hooks` listed only organism edits among tracked files. The new atom has static text. The changed calculator hunks leave the existing amount and clock expressions intact. | No new calculation or number delta by source review. The full per-cell text dump belongs to T8. |
| AC5 · Disclosure text | `__tests__/estimate-notice.test.tsx` asserts the full wording. Comparing JSX paragraphs from `git show 262c9a0:components/organisms/calculator-views.tsx` against both current components after whitespace collapse returned `{"equalNotice":true,"characters":170,"equalRemainingFooter":true}`. | Pass for this integration delta. |
| AC6 · Legibility and rendering | `tests/e2e/disclosure-legibility.spec.ts` covers LR1/LR2a/LR2b/LR3 on P2 over both routes, widths and themes. The P2 test requires `measured` and checks a server marker. | The full legal surface census and LR6.1 negative control belong to the full gate. |
| AC7 · Footer scroll cost | Both calculators add in-flow notice height. `components/organisms/calculator-views.tsx` removes the original footer paragraph. | DS1 P1's before and after scroll operands belong to T8. |
| AC8 · CA/CB/CC rulings | `legal.md` §3 and the prior status ruling name CA, CB and CC and route admitted work. | Existing ruling carries forward. |
| AC9 · DSR scope trigger | The source and test edits do not open `components/organisms/day-summary.tsx` or the caption type token. | Follow the recorded trigger if the system scale changes. |
| AC10 · Consent banner intersection | AC1 checks the named in-flow consent region directly and proves it does not intersect the estimate notice in pending cells. | Pass for the integration. The synthetic translated-banner control makes the predicate fail. |
| AC11 · Scope | No `app/`, `lib/`, `hooks/` or calculator layout edits in this integration. CI and network fixtures are part of the PR recovery remit. | Pass for the integration delta. A complete spec closure needs the updated plan and T8 record. |
| AC12 · Reproducible evidence | `design.md` §18 states the measured build and application state. This report supplies isolated build, shard, focused E2E, Lighthouse, preview, contrast and static-gate results. | Pass for PR integration. Hosted CI remains the release confirmation after push. |
| AC13 · Answer occlusion | `tests/e2e/support/reachability.ts` now verifies the answer/notice sibling layout and counts text-bearing elements that also have children. The browser case asserts the count and overlap. | The current implementation also guards all sighted slots against leaving the viewport. See the recorded decision below. |
| AC14 · Consent geometry ruling | `design.md` §18 declares the F2c action-row amendment and carries the prior PRODUCT §8 interpretation and G2 ruling. | Pass for the integration. The desktop equality test is active and passed in the full browser shards. |
| AC15 · Salary input flow budget | `design.md` §18 tested the new placement in the inherited Glass mobile layout. | Fail. See Q1. |

## Remaining for 0010 G6 closure

- **Q1 · High · AC15 exceeds the owned flow budget.** At `components/organisms/salary-calculator.tsx:453`, placing the notice in the stacked aside adds the gap and all three caption lines before the form. In Chromium at 390×844 on `/custo-da-hora`, light theme with consent pending, design's same-build live relocation from the footer measured input bottom `980.77`, `963.50` and `930.55` px for the empty, 0010-seeded and 0008-seeded states. The respective ceilings are `880.50`, `864.10` and `832.80` px. Repeat against the integrated build using `#salario-bruto`'s bounding box and the same seeds. Route the inherited and added height to the tech lead and spec owners for a remedy or approved change to AC15. The edit link serves navigation and the criterion measures vertical flow. [Design measurements](../design.md#open-mobile-form-geometry)
Q2 is resolved: the final guard exercises answered and pending consent, awaits the pending banner,
reads hero/gap/notice/navigation in one evaluation, checks the in-flow banner directly, and carries
a red enlarged-gap control. Q5 is resolved: fixed descendants remain candidates when they can cover
peer controls, and the complete 872-entry browser matrix passed the corrected predicate.

## CI, fixture and code craft

- The workflow has distinct report check names and artifact names per shard, so simultaneous reporters cannot collide on an artifact name. The final, stable `E2E Tests` job reads `needs.playwright.result` and still requires all dependencies to succeed. Separate JUnit reports preserve each shard's failures. The single aggregate check remains the pass/fail gate. Local isolated timings were 2.5, 2.4 and 5.4 minutes; hosted timing remains the post-push release confirmation.
- `tests/e2e/support/fixtures.ts` routes browser HTTP(S) requests by origin. All browser specs use the shared test instance. `tests/e2e/divisor-disclosure.spec.ts` supplies the one manually-created context with the same route and blocked service workers before opening its page. `tests/e2e/external-network.spec.ts` uses a loopback listener, checks a same-origin response and observes both off-origin attempts while expecting zero listener hits. Both response branches are covered. This verifies the browser fixture boundary. Server and build egress remain 0015's work.
- The relocation uses the existing aside and `cn()`. The source hunks add no legal operands, dependencies or CSS override. The estimate atom's tests check exact text, static semantics and the absence of focusable descendants. The calculated fields, progress ring and source links retain the same expressions. The LR3.5 checks still resolve P2 and P4 separately.
- The consent control census now asserts actual rendered role counts by surface. An ordinary extra banner button fails the named region's three-button assertion. The modal separately requires two buttons and one switch. The old hardcoded locator total can be removed because these counts and the named locator assertions already cover the current set.
- The integration keeps the stronger full-viewport coverage for the delivered Glass design in `tests/e2e/first-screen-reachability.spec.ts:375`. The AC13 obligation itself concerns overlap with lines intersecting the first viewport. Treat the all-slot requirement as a separate delivered-design guard if a future layout intentionally extends the answer below the fold. [AC13](../spec.md#acceptance-criteria)
- The F2c grid uses intrinsic settings width and two equal choice tracks from `sm`. The desktop equality test is active for both themes and uses the actual button areas. The design report shows a red desktop baseline and equal tracks in browser substitutions across `sm` and `md`; the integrated browser run will verify the shipped declarations. [F2c design evidence](../design.md#equal-consent-targets)
- Optional cleanup under the extraction lesson. Use the existing `estimateNotice` locator helper in `tests/e2e/disclosure-legibility.spec.ts:38`, or keep one selector constant in `tests/e2e/support/reachability.ts` shared by the helper and the in-browser lookup.
