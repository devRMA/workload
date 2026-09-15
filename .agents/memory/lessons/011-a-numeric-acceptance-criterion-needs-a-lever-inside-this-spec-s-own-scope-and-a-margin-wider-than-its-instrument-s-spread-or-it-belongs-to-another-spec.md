---
id: 011
title: A numeric acceptance criterion needs a lever inside this spec's own scope and a margin wider than its instrument's spread, or it belongs to another spec
applies-to: product-manager
domain: spec
spec: 0002
created: 2026-09-14
confirmed: 2
---

## What happened

A spec imported a performance threshold from a skill and wrote it as an absolute acceptance
criterion. Everything the spec's own scope authorised was built and measured, and the number
improved on both routes by more than any single change was expected to buy — and still missed the
threshold by about 31 ms. Two facts surfaced only at build time. The instrument's run-to-run
spread was roughly 106 ms, over three times the margin being judged, so the criterion was being
decided inside its own noise. And the phase that dominated the metric — 82% of it — could only be
moved by a change the same spec's out-of-scope list forbade. The criterion could not be passed by
anyone obeying the document that contained it.

## Why it happened

The threshold was imported rather than derived. It came from a skill written for a different kind
of page, where the metric is dominated by a phase that page spends time in and the levers are the
ones that skill names. Nobody checked, at spec time, either that this product's version of the
metric was made of the same phases, or that any lever capable of moving it was inside the scope
being written. An absolute number reads as rigour, so it went unexamined until it was the only
thing standing between a finished build and a closed gate.

## The rule

**Before writing a numeric acceptance criterion, apply two tests, and if either fails the
criterion belongs to a different spec.**

1. **The lever test.** Name the lever inside *this* spec's In-scope list that moves the number,
   and how much of the number it can move. If every lever that reaches the dominant part of the
   metric sits in the Out-of-scope list, you have written a criterion that can only pass by
   breaking your own document. Move the absolute target to a new spec — opened, named and indexed
   at the same moment, with the finding and the measurement carried — and keep a criterion here
   that judges what this spec can actually change.
2. **The margin test.** Name the instrument and its run-to-run spread, and require the margin to
   exceed the spread. Where the spread is unknown at spec time, state the criterion *relative to
   it*: "the improvement is greater than the max − min of the recorded run set" is checkable from
   the same table that reports the result, and can never be decided inside the noise.

Restating a criterion this way is not softening it, and the difference has to be written down or
nobody can tell later: record which of the two tests failed, what the restated criterion still
forbids, and **which spec now holds the absolute target and what it must change to reach it**. A
target moved with an owner is relocated; a target deleted with an apology is retired.

## How to verify

- Every numeric criterion in the spec names a lever from that spec's own In-scope list.
- Every threshold names its instrument, and the margin it asks for is larger than that
  instrument's spread — or the criterion is phrased against the spread itself.
- A threshold imported from a skill, a framework default or another product's bar carries one
  line saying why it transfers to this page.
- When a criterion is restated, `.specs/INDEX.md` gained a row the same day, or the restatement
  is a retirement pretending otherwise.
