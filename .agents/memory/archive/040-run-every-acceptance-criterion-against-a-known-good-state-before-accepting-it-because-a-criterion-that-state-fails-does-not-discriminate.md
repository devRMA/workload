---
id: 040
title: Run every acceptance criterion against a known-good state before accepting it, because a criterion that state fails does not discriminate
applies-to: all
domain: spec
created: 2026-09-15
spec: 0004
confirmed: 0
---

## What happened

A performance spec could not use its absolute threshold as a criterion: the lab instrument had drifted
further on a frozen artifact than the threshold itself. So the criterion was restated as a **phase
identity** — a defect signature observed in eleven of twelve stored reports, where one simulated
metric equalled another to the millisecond. The criterion read: on the fixed build the two must
*differ*; on the control build they must still be *equal*. It looked like the ideal criterion. It was
falsifiable, it was cheap to score, it did not move with the runner, and two separately measured
states in which the defect was absent both passed it. The plan endorsed it in writing.

The diagnostic task then measured a third state in which the defect was absent — the same build,
painting at **96 ms**, the fastest number the spec ever recorded — and in that state the two metrics
were **equal again**. The criterion failed on the best page anyone had produced. The identity was not
tracking the defect at all; it was tracking the *shape* of the simulator's dependency graph, which
happens to collapse whenever the whole graph is small as readily as whenever the whole graph is late.

The criterion was checked against three bad states and two good ones and passed every check that was
run. Nobody had run it against the one good state that would have refuted it, because that state did
not exist yet — it was produced by the very task the criterion was written to gate.

## Why it happened

A criterion derived from a defect signature is validated, by construction, against instances of the
defect. Every confirmation it collects comes from the failing side, and the failing side cannot
distinguish "this measures the defect" from "this measures something the defect happens to co-occur
with". Checking that a criterion **fails on the broken build** is half the test and it is the half
everyone runs.

A derived relation between two metrics — an equality, a ratio, a difference — is especially exposed,
because it can be satisfied by an unbounded set of states that share nothing with the defect. The
tell was in plain sight: the relation had no causal account that named the defect, only an account
that named the *tool's model*.

## The rule

**Before a criterion is accepted, run it against a state in which the defect is definitionally
absent, and record the output. A criterion that a known-good state fails, or that a known-bad state
passes, does not discriminate and is not a criterion.**

- Write both directions into the spec: the command, the known-bad output, **and the known-good
  output.** A criterion with only the failing output beside it is half-verified.
- The known-good state must be **reachable now** — a local build, a blocked resource, a competitor's
  page, an injected condition. If no such state can be produced, the criterion cannot be validated
  and the spec says so instead of shipping it.
- **Prefer a quantity the defect moves monotonically over a relation between two derived quantities.**
  An identity, a ratio or a difference between two numbers a tool computed is satisfied by states
  that have nothing in common; a measured elapsed time is not.
- **A criterion needs a causal sentence naming the defect**, not just a correlation across stored
  reports. "In 11 of 12 reports these were equal" is a description of an instrument, not of a build.
- This applies at G1 when the criterion is written **and at G4 when the plan endorses it.** Endorsing
  a criterion without running it against a good state is the same defect, one gate later.

## How to verify

Every acceptance criterion in `spec.md` carries two outputs of its own verification command: one from
a state that exhibits the defect and one from a state that does not, both produced in this session on
a named artifact. A reviewer checks it by asking of any criterion: what state would pass this while
still being broken, and what state would fail this while being fine? If the spec has not answered
both in writing, the criterion has not been validated — only observed.


## Retired

2026-09-19 — promoted — AGENTS.md §5 'How a criterion is written', clause 'Both directions, both outputs'
