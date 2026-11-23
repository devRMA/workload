---
id: 043
title: Before citing a guard's green run as evidence a legal rule holds, assert it measured the expected count of the rule's subject, because a loop over an appearance-filtered or empty collection reports green having measured nothing
applies-to: labor-law-analyst
domain: law
spec: 0009
created: 2026-09-16
confirmed: 0
---

## What happened

A four-clause legibility rule was settled at one gate, and a permanent end-to-end guard was chosen
at the next to keep it true. The gate that chose it wrote down why it preferred that guard to a
cheaper one. Two specs later, reading the guard's **source** rather than its output showed that one
of its two loops selected the elements it measured by a **type-ramp token** — it iterated the
paragraphs that happened to be small, three of the five the surface renders, and skipped the two
that named the very thing the rule exists to protect. Neither loop asserted how many elements it
had found, so a selector matching nothing would have run zero iterations and reported green.

Three gates had signed a pass citing this guard's output. None of them had looked at what it
selected.

## Why it happened

A guard is read as an oracle. Its output is a boolean, and a boolean carries no record of the
sample it was computed over, so a reviewer who reads "green" has no way to tell a measurement from
an empty loop. Nothing in the run announces the difference, and nothing ever will.

The selector is where the domain is silently redefined, and it is the one line nobody re-reads
after the guard first passes. It is written by whoever implements the test, at the moment the markup
happens to make one class a convenient handle — and a class is *always* the convenient handle. The
narrowing that results is not a decision anyone made; it is a decision the stylesheet made on the
author's behalf, and it is invisible from every artifact downstream.

The compounding factor is that conditional assertions inside the loop — an exemption for a case the
rule deliberately does not bind — make the vacuous run and the fully-exempt run print the same
nothing. The more carefully a rule is written, the better it hides its own blindness.

## The rule

**A guard's green run is evidence only about the sample it measured. Before citing it, establish
what that sample was, and require the guard to establish it on every run.**

Three demands, in the order they bind:

- **The set the guard iterates is derived from the obligation, never from an appearance attribute.**
  A selector that filters by a utility class, a token, a colour or a size narrows a legal domain by
  appearance — a narrowing no norm authorises, that nobody can see from the outside, and that is
  true the day it is written, not merely the day the class is renamed. Where sibling clauses of the
  same rule iterate the same kind of thing, they take the **same** quantity, and any one that
  differs says in its own text why and what that buys.
- **The size of the set is asserted against an expected count, before the iteration.** Zero is never
  a pass, and neither is "fewer than expected". A floor of `>= 1` does not discriminate: it passes
  every partially-blind guard, which is the case that actually occurs. The expected count is written
  into the artifact that settled the rule, together with the markup it was measured on, and a
  rendered count that disagrees corrects **the artifact**, at the gate that found it — never the
  assertion, tuned until the run is green.
- **Every conditional exemption inside the loop is counted, so `measured + exempt = expected` is
  checkable.** An exemption that prints nothing is indistinguishable from an element that was never
  selected.

State which of these carries the verdict. The first two each reject on their own; the third is
corroborating, so a borderline reading of a bookkeeping clause never decides a gate by itself.

The general form, and the reason this belongs to the law gate rather than to whoever maintains the
suite: **the verification instrument for a legal rule is part of the legal rule.** An instrument
that can report a pass while measuring zero instances of the rule's subject is not evidence, and a
gate that signs against it has signed nothing. Falsifiability of the guard is not the test author's
quality concern to be raised politely — it is the rule's own correctness, and it is refused at the
gate that owns the rule.

## How to verify

Open the guard's **source**, not its output, and answer three questions in writing before any
`pass` cites it:

- **What does its selector select, on the markup as it stands?** Enumerate the elements the surface
  renders and the elements the guard matches, side by side, and subtract. A non-empty difference is
  the finding, and it is a finding about today, not about a future rename.
- **What would it print against an empty collection?** If the answer is "the same thing it prints
  now", the guard has no count assertion and does not yet discriminate.
- **What would it print if every member were exempt?** If that is also the same thing, add the
  counts before trusting either.

Then ask the satisfiability question for each demand against the file set the current spec is
permitted to touch (lesson **038**). A demand that cannot be met inside that boundary is routed with
an owner, not asserted as a requirement nobody can discharge.


## Retired

2026-09-16 — promovida — AGENTS.md §5 'How an instrument's reading is trusted' bullet 2, e labor-law-analyst.md §Exhaust before you rule bullet 4 (o instrumento de verificação faz parte da regra legal)
