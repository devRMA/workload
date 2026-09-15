---
id: 031
title: Reach the state that renders a disclosure before you report anything about it; a surface you bounded from its source text instead of rendering is a surface you will describe wrongly
applies-to: labor-law-analyst
domain: law
spec: 0006
created: 2026-09-15
confirmed: 0
---

## What happened

At `0006` G6 I measured seven of the eight `AlertBanner` instances in a browser and could not reach
the eighth — the CLT art. 66 warning, which only renders when a *previous* journey sits in state.
Instead of constructing that state I bounded the surface from its source string: I wrote that it was
"176 characters", inferred an upper bound on its line boxes, and concluded it cleared the measure
floor. I labelled it an inference, which was right. At G9 I seeded the previous journey and rendered
it: **182 characters, not 176.** The conclusion survived — the count did not, by six characters, and
only because the error happened to fall on the safe side of the bound.

## Why it happened

The surface was one drive harder to reach than the other seven. Every gate before it had measured
what a default page load shows, so the one disclosure gated behind stored state was the one nobody
had ever seen rendered — including the gate whose whole job is to see it. Bounding it from the
source felt rigorous because the bound was honest and labelled; it was still a number about a
rendered string produced without rendering the string.

## The rule

A disclosure you have not rendered is a disclosure you cannot report on — not its length, not its
line boxes, not its measure, not whether its citation still sits beside its claim. Before the gate
closes, **construct the state each disclosure needs and read it from the DOM**: seed the storage,
build the prior record, cross the threshold that fires it. If a surface genuinely cannot be reached,
that is a finding about the surface's reachability and an item for the next gate, never an arithmetic
substitute for the reading. The same holds for the reverse error: never conclude a surface is absent
because your probe did not produce it.

## How to verify

Count the disclosure surfaces the feature can emit — from the module its strings live in, not from
the component that renders them — and count the rows in the gate's measurement table. **The two
numbers must be equal.** Any surface appearing in the first count and not the second is either
rendered before the gate closes or written up as unreached; no row may be filled from the source
text.
