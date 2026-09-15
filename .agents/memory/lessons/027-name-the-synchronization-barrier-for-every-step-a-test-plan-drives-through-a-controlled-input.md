---
id: 027
title: Name the synchronization barrier for every step a test plan drives through a controlled input
applies-to: tech-lead
domain: plan
spec: 0006
created: 2026-09-15
confirmed: 0
---

## What happened

A plan specified an end-to-end suite by listing its drive steps as a sequence: navigate, fill a
field, navigate again, read the surface the field was supposed to produce. Every step was named
exactly; no step said when the previous one was finished.

The suite timed out non-deterministically — three cases in one run, ten in the next on the same
tree and the same build. The developer refused to invent a wait, which was correct, and the build
stopped. Reading the recorded measurements rather than the report showed the same race had also
silently dropped six cases in a different block, and had never once touched the one surface that
required no drive at all.

## Why it happened

The inputs were **controlled** components: the framework owns the value and re-renders it from its
own state. A write that lands before hydration reaches the DOM node and is then reverted by the
first controlled render. Nothing throws. The state the write was supposed to create never exists,
and the failure surfaces much later as a timeout on an unrelated assertion — or, worse, as a
measurement of a surface that was never in the state the case is named after.

A plan that lists steps in order implies that each one has taken effect before the next begins.
For a controlled input, hydration, state commit and persistence effect are three separate moments,
and the plan named none of them.

## The rule

Every step a test plan asks an agent to drive through a controlled input gets its barrier written
into the task, in the same clause as the step:

- **State what the drive must be waited on.** Not a duration — the app's own observable reaction:
  the element that appears, the element that disappears, the value the app persists. Poll the real
  state until it settles; never sleep a fixed time, which drifts from the thing it waits on.
- **Make the drive idempotent and say so**, because the barrier will re-run it. A drive that
  appends, toggles or increments cannot be retried.
- **Distinguish commit from flush.** State committing and an effect writing to storage are two
  moments. If a later step reads the second one, wait on the second one.
- **Do not accept the rendered value as proof of the state.** A formatted or masked field never
  holds the string that was typed, so an assertion on the field's own value proves nothing about
  what the app received.
- **Fix it at the point every drive routes through**, not in front of the case that was noticed.
  A race reported at one call site is a race at every sibling call site with the same shape, and
  the siblings fail as missing data rather than as red assertions — which is quieter and worse.

A flaky measurement instrument that reports a pass is worse than one that fails: it retires the
only guard that can see the defect return.

## How to verify

Read the task's step list and, at each step, name the observable condition that proves it took
effect. Any step where the answer is "the next line runs" is unsynchronized. Then check the
evidence by count, not by verdict: compare the artifacts the run should have produced against the
full cross product it was specified over. A hole is a lost case, and a lost case does not appear in
a pass/fail line.
