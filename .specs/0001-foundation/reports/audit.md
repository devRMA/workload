# 0001-foundation — G6 audit report

## Verdict: n/a

No diff. `0001-foundation` is a baseline spec: `spec.md`, `legal.md`, `design.md`, `copy.md` and
`plan.md` were all written *from* the calculator as it already shipped, before this squad or its
gates existed (`STATUS.md`, Gates table and the note under it). A G6 audit reads a diff against a
prior state and reports on what changed. There is no prior state here and no change to read — the
artifacts and the code agree by construction, because the artifacts were transcribed from the code.
Running axe, Lighthouse or a layout sweep against this tree would not be a review; it would be
`web-standards-auditor` grading its own transcription, which is exactly the failure mode this gate
exists to prevent for every other spec.

## Verification performed before ruling n/a

Read `STATUS.md` and `spec.md` in full before writing anything below, per the brief.

- `spec.md`'s acceptance criteria (AC1–AC20) are stated as **what the shipped app already does**
  and **how to check it against the existing tree** — e.g. AC18 "Zero axe-core violations at
  `critical` or `serious`, in both themes," verified by `node .agents/tools/preview.mjs`; AC17,
  layout at four widths, verified by `tests/e2e/responsive.spec.ts`. These are documentation and
  verification criteria against pre-existing behavior, not build criteria this spec commissioned.
  Nothing in `spec.md` describes a UI, copy or performance change for this spec to have introduced.
- `STATUS.md`'s Gates table confirms this directly: G5 build reads "shipped code — this spec is
  written against it," and the G10 triage (2026-09-15) rules the three outstanding G6 gates `n/a`
  rather than `pending` for the same reason stated above, in `tech-lead`'s own words: *"A review
  gate reads a diff. This spec has none... `qa-engineer`, `web-standards-auditor` and
  `refactor-scout` would be reviewing their own input."*
- I did not run `preview.mjs`, Lighthouse, or any axe pass against this tree. Manufacturing a
  finding here would misattribute a defect (or a false clean bill) to a spec that shipped nothing,
  and would duplicate work already done, correctly, elsewhere — see below.

## Where this spec's subject matter has actually been audited

`0001` documents the app that `.specs/0005-…` and `.specs/0006-…` later shipped changes on top of.
Both of those specs' G9 gates measured the **deployed** app — a strictly later, strictly larger
tree than the one `0001` describes — against exactly the criteria `0001` states. A reader who wants
to know whether this baseline's a11y, contrast and layout claims hold should go there, not here:

- **`.specs/0005-design-taste-preflight/reports/audit-preview.md`** — deployed Vercel preview, axe-core
  4.13.0, 8 route×viewport×theme combinations. Zero violations at any severity. Contrast measured
  at 4.84:1 (light) / 5.74:1 (dark) on the footer. Layout clean at the audited widths.
- **`.specs/0006-salary-alert-legibility/reports/audit-preview.md`** — deployed Vercel preview, PR #39.
  Zero axe-core violations at every severity, both routes, both viewports, both themes. Eight
  measured text-on-surface pairs, both themes, **5.05:1–7.22:1** against WCAG 2.2 1.4.3/1.4.11 —
  all pass. CLS **0** on all 6 Lighthouse runs, both routes.

`STATUS.md`'s own G10 triage already reached this conclusion for AC18 by name (§ *G10 triage*,
item 1): the criterion is closed by citing the 0006 measurement taken by the agent that owns it,
against a tree that strictly contains this one, rather than by re-running it here to produce the
same number a second time. This report is that citation, in my own voice, for the record this
spec's own gate owes.

## Core Web Vitals — the one thing worth stating plainly

The performance budget is **not currently met** by this app. That defect is not invisible or
undocumented: it is tracked as **F1** on `.specs/0004-lcp-render-delay/`, where a diagnosis has
already established the dominant cost is delivery (network/hydration-gated LCP), not application
code this spec would need to re-litigate. I am not restating F1's numbers here — `0001` did not
measure them, and copying a number without re-measuring it is exactly the kind of unearned claim
this squad's memory (lesson 032) warns against. Read `.specs/0004-lcp-render-delay/` for the figures
and the routing.

## What this report does not contain, and why

No axe run, no Lighthouse run, no contrast table, no console log, no layout sweep of its own. All
four are either not applicable (no diff to measure) or already measured, correctly attributed, on a
later tree, and cited above. Producing local numbers here would not corroborate anything — this
tree is a strict subset of the ones already audited — and would risk a stale figure sitting beside
the current one without anyone noticing the duplication.
