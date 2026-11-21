# PR #42 integration

The request is to fix PR #42's failing checks and finish the reachability work already on the
branch. The snapshot commit `262c9a0` brought in the reachability guards, the consent switch fix,
and the bottom reserve. The existing plan leaves T5, T6, T4′, T7, and T8 open. The current result
panel also inherits `0100`'s ring and answer layout, which postdate this spec's geometry baseline.
[Build status](../STATUS.md) · [Build plan](../plan.md) · [Ring design status](../../0100-glass-interface/STATUS.md)

## Failing baseline

The focused Chromium run for `tests/e2e/first-screen-reachability.spec.ts` reported **36 failed,
2 skipped, 19 passed (34.1 s)** at `262c9a0`. The isolated checkout at
`/tmp/workload-pr42-rebase.QNJgvb` served the build on port `3025` with
`NEXT_PUBLIC_ENABLE_ADS=true` and `NEXT_PUBLIC_GA_ID=G-TEST12345`. The main matrix covered `/` and
`/custo-da-hora` at 390×844 with four storage states (`empty`, `seeded`, `monthlyHours=0`,
`incoherent`) and two themes. The LR4 controls also ran at 1440×900. These counts describe the
focused browser run. The CI job timeout remains a separate delivery failure.
[Reachability criteria](../spec.md#acceptance-criteria)

## Integration and verification

1. Complete T4′ by moving the existing estimate disclosure beside the result on both routes and
   preserving the `0100` ring. Apply the remaining T5/T6 layout requirements to the inherited
   interface and verify first-screen disclosure reachability and answer occlusion independently.
   Check the disclosure's actual geometry, including its adjacency to the result, clearance from
   fixed controls, and the expected visible answer lines. Report any mismatch against the old
   calibration with the current route, viewport, storage, theme, consent, and ads state. Keep the
   existing disclosure text and calculation behavior. [T4′ plan](../plan.md#t4--m-r-ds1-p2-leaves-the-footer-and-renders-under-the-answer-as-estimatenotice)

2. Repair LR4 instrumentation against the consent surfaces as rendered. For each consent level,
   verify the complete control census and find one scroll position where all its controls are
   fully visible, unoccluded, and unclipped. Retain the refusal and acceptance size check. F2c is
   resolved in this integration: the desktop equality assertion is active and the delivered
   intrinsic grid gives both decision buttons equal areas. Verify LR3.5 in the narrowest product document, with ads
   off under the current configuration. Record the ads-on run separately because the ad slot can
   change the scroll range. [Consent and scroll requirements](../legal.md)

3. Make the affected browser checks deterministic by controlling third-party responses. Preserve
   a real ad-slot subject in the ad-placement check and the consent states the tracking tests
   exercise. This integration addresses the test dependency found by `0015`. The full-suite
   external-request census, positive control, and CI enforcement remain that spec's acceptance
   work. [Test-suite egress criteria](../../0015-test-suite-egress-to-third-party-hosts/spec.md#acceptance-criteria)

4. Shard Playwright in CI to address the job timeout. Verify the affected specs and the full
   browser matrix against isolated production builds, then record shard results for the updated
   head. Reconcile the design record against the delivered layout and add the T8 measurements to
   the build report. The gitignored `evidence/` directory contains the historical measurement
   scripts in this checkout. The tracked report should carry the evidence consumed at the gate.
   [Build evidence](build.md)

## Related work

- **0009** added its seven test files to the PR branch in `7a9380c` and `8f8246a`. At the
  `262c9a0` audit,
  `git diff --name-only 00cc57e..8f8246a` listed those seven files, and the same command scoped to
  `app`, `components`, `lib`, and `hooks` returned no paths. The `0009` docs check reported
  `0 falha(s), 0 aviso(s)`. Use the two-commit range as evidence for QA finding Q-1. Complete the
  focused legal read and release evidence at their gates.
  [Class-string QA report](../../0009-tests-asserting-on-class-strings/reports/qa.md)

- **0011** requires the owner's publishable controller name and monitored contact, plus verified
  retention and transfer facts for the processing that remains. Its policy copy and plan are still
  pending. **0014** has a separate staged removal plan that follows `0010` at merge and covers
  analytics removal, legacy residue, and the privacy-change notice.
  [Privacy status](../../0011-privacy-policy-and-lgpd-information-duty/STATUS.md) · [Analytics removal plan](../../0014-remove-google-analytics/plan.md)

- **0007** has a remaining legal calibration review. **0008** still needs the diagnostic follow-up
  before prescribing a layout-shift remedy. **0012** is built and needs its review evidence.
  **0013** has ready build tasks and a separate copy and file-ownership dependency for T3.
  [Divisor status](../../0007-sumula-431-citation-scope/STATUS.md) · [Layout shift status](../../0008-intermittent-layout-shift-on-custo-da-hora/STATUS.md) · [Weekend overtime status](../../0012-saturday-overtime-tier/STATUS.md) · [Assumed rates status](../../0013-assumed-rates-beside-money/STATUS.md)
