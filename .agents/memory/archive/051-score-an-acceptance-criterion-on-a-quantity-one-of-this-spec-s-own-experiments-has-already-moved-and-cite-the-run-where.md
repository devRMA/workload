---
id: 051
title: Score an acceptance criterion on a quantity one of this spec's own experiments has already moved, and cite the run where it moved, because an identity derived from that quantity can flip without the defect changing
applies-to: product-manager
domain: spec
spec: 0004
created: 2026-09-16
confirmed: 0
---

## What happened

A spec's first acceptance criterion scored a derived identity — "simulated LCP differs from
simulated TTI" — instead of the elapsed time every experiment in the spec had actually moved. A
diagnostic task later measured five states on the same instrument: the best state on record, a page
painting at 96 ms with the defect definitionally absent, **failed** the identity, while two other
cause-absent states passed it. The criterion split good and bad states 2/3 and had to be replaced at
a bounce, one gate after a reviewer had explicitly endorsed it.

## Why it happened

The identity was derived from a plausible mechanism ("the single paint happens after the last
byte") and the derivation was never tested against a measurement. A derived quantity carries the
assumptions of its derivation: this one tracked how much of the resource graph the simulator held in
scope, which moves with the tool's graph and not with the defect. The measured quantity underneath
it — the observed first paint — had already been moved by four separate experiments in the same
spec, and none of those runs was cited in the criterion.

## The rule

Write every acceptance criterion on a quantity that at least one experiment **in this spec** has
already been observed to move with the defect, and cite that run inside the criterion. If no
experiment has moved the quantity, the criterion is a hypothesis, not a criterion: either run the
experiment or score something else. Prefer a measured elapsed time over any value a simulator or a
formula derives from it; prefer a same-session differential over an absolute whenever the
measurement path is shared and uncontrolled, because the path then cancels. See [[040]] for the
known-good-state test this rule feeds, and [[011]] for the lever the quantity still has to have
inside the spec's own scope.

## How to verify

For each criterion, name the run and the numbers: the quantity's value in a state where the defect
is present and in a state where it is absent, both from this spec's evidence. Two values that differ
in the direction the criterion asserts, from runs you can point at, or the criterion does not ship.


## Retired

2026-09-19 — promoted — AGENTS.md §5 'How a criterion is written', clause 'A quantity this spec has already moved'
