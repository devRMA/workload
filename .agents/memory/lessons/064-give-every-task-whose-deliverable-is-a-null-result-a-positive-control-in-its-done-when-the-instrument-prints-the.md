---
id: 064
title: Give every task whose deliverable is a null result a positive control in its Done when: the instrument prints the coverage that proves it could have recorded the opposite, because an empty sample and a sample with nothing in it read identically downstream
applies-to: tech-lead
domain: plan
spec: 0008
created: 2026-09-19
confirmed: 1
---

## What happened

A plan made a diagnosis the deliverable of one task, and that task's central finding was a **null**:
"the frame sampler never captured the anomalous geometry." The task's `Done when` required the
experiments to have run and their stdout to be in the raw log. Both were true. The raw log also
showed, arithmetically, that the sampler's frame array was **empty in every reproducing load** — the
`-1` the report read as *not found in the window* is the same `-1` a `findIndex` over an empty array
returns. Three more of that instrument's five marks came back `MISSING` from an observer that cannot
fail to fire. The null was a dead instrument, and it had travelled to a checkpoint as a finding and
was one step from being escalated to a human as an impasse.

## Why it happened

Every other task in the same plan carried a vacuity guard — a census asserted to be exactly 1 before
it was iterated, a `nodes=k/4` token on every load, a negative control called *not optional*. The
one task whose output was a negative statement carried none, because the plan's attention was on
whether the experiment **ran**, not on whether it **observed**. Those are different questions and
only the second one is evidence. A positive result carries its own proof of life: there is a number
in it. A null carries none, and is therefore the one result that has to be issued with a control.

## The rule

When a task's deliverable is, or may be, a null result — *X did not occur*, *the instrument never
saw Y*, *no cell reproduced* — the `Done when` states the **positive control** in the same breath as
the null: the tokens the instrument must print on every sample that prove it was capable of
recording the opposite. Coverage (how many samples, first, last, largest gap), the set size before
it is iterated, and a run in which the guard is deliberately made to fire. Name the tokens
literally; "report the coverage" is a decision left to the developer and it will come back as prose.
And when the null arrives, **read the raw log the report cites, not the report's description of
it** — an empty sample and a sample with nothing of interest in it read identically in a summary,
and only the artifact separates them.

## How to verify

Take any task in the plan whose result could be *nothing happened*, and ask what its report would
look like if the instrument had been unplugged. If that report is indistinguishable from the one the
task is expected to produce, the `Done when` is not finished. The check on the other side: every
sentence of the form "never", "no", "zero" in a delivered report must be traceable to a printed
number that is not zero — a sample count, a frame count, a delta — sitting on the same line.
