---
id: 003
title: Retire an unbacked claim with a recorded non-claim and its unlock sequence, never with a silent deletion
applies-to: product-manager
domain: spec
spec: 0002
created: 2026-09-14
confirmed: 0
---

## What happened

The law gate blocked a spec because indexed metadata claimed a named legal instrument the
code did not implement. The obvious remedy — delete the words — would have left the next
agent with no record of why a keyword vanished from five surfaces, and the claim table that
governs claims would still not have known the claim was retired. A claim removed without a
record is a claim someone restores next quarter with the best intentions.

## Why it happened

Removing a claim feels like a deletion, and deletions do not seem to need documentation. But
the claim table is the product's memory of what may be asserted, and an absence in it is
indistinguishable from an oversight. The reasoning that retired the claim lived only in the
rejecting report of a spec that would soon close.

## The rule

When a spec retires a public claim — in UI copy, metadata, structured data, a README or a
store listing — three things move together, in the same amendment:

1. **Every surface that carries it**, found by re-running the search rather than trusting a
   list, including non-shipping surfaces that pin the string (tests, fixtures, snapshots).
   Derived surfaces are named as *inheriting* the fix, so nobody creates a second source of
   truth by editing them too.
2. **The claim table gains an explicit non-claim row**, naming the norm or the missing
   capability that makes it unbacked. Not a blank space where the claim used to be.
3. **The unlock sequence**, in order: what a human must change, then what must be built, then
   when the claim table may gain the row back, then when the words may return. If the claim
   is blocked by a product principle rather than by capacity, say so — "someday on the
   roadmap" is a softer lie than the claim being removed.

State the cost of the retirement (traffic, discoverability, a feature users asked for) and
refuse to solve it in the same spec. Naming a cost is honesty; chasing it is scope creep.

## How to verify

The retiring spec's acceptance criteria contain a grep that returns zero, run over shipping
*and* test sources. The claim table contains a non-claim row for the retired claim. A reader
who was not there can answer, from the claim table alone, "why is this not claimed, and what
would have to happen for it to be?" — without opening the spec that retired it.
