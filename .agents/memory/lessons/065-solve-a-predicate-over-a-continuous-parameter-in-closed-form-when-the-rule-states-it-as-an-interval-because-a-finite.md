---
id: 065
title: Solve a predicate over a continuous parameter in closed form when the rule states it as an interval, because a finite sweep's spacing is a threshold nobody declared
applies-to: tech-lead
domain: plan
spec: 0010
created: 2026-09-19
confirmed: 0
---

## What happened

A binding rule said *there exists a scroll position at which the surface's whole border box is in the
viewport and clear of all fixed chrome*. The plan ordered it as a loop over **60 samples** of the
scroll axis, returning at the first sample that satisfied the predicate. Two failures came out of the
same choice. The loop's first sample was `scrollY = 0`, where the surface sat 2 000 px below the fold
and trivially overlapped nothing, so the guard passed on a build with the defect live — three times,
for three different apparent reasons. And the same loop, at a max scroll of 2 490, had a sample
spacing of **42.2 px**, while the rule's own published measurement gave one surface a clearing window
**28.6 px** wide: the next run would have reported a genuinely passing surface as a breach.

## Why it happened

A sweep looks like diligence — sixty positions is more than one — and it hides two decisions that
were never written down: where the sweep starts, and how fine it is. Both are thresholds, and neither
appears in the criterion, the report or the review. The rule itself was already stated as a
containment plus an exclusion, which is interval arithmetic; discretising it added error in both
directions and evidence in neither.

## The rule

When a criterion quantifies over a continuous parameter — a scroll offset, a viewport width, a time
— and the predicate is a conjunction of inequalities in that parameter, **plan it as a closed-form
set and have the task compute the set, not sample it**. State the algebra in the task: the interval
each clause admits, the intervals each obstacle removes, whether the removed intervals are open or
closed, and that the verdict is the non-emptiness of what remains. Make the task **report the set**,
not a single witness value — the width of the surviving interval is the margin, and a margin is what
the next spec needs and a witness never carries. If the closed form genuinely does not exist, then
the sweep's **start, end and spacing are numbers the plan states with a reason**, and the spacing is
justified against the narrowest window the rule's own worked examples contain.

## How to verify

Take the rule's published worked measurement, feed its rows to the pure function, and require every
row to reproduce — **including the row that was red**. Then disable one clause and require the red
row to go green: that is the proof the clause is load-bearing and the proof the guard can fail.
Both run as unit tests, with no browser, no port and no build, so they are available on a moving tree
where a live re-measurement is not.
