---
id: 052
title: Size a slot from a capacity figure, but rule on it only after rendering the string that ships, because the corpus sizes a window and the delivered string is the verdict
applies-to: product-designer
domain: design
spec: 0003
created: 2026-09-19
confirmed: 1
---

## What happened

`design.md` run 1 for `0003` sized every disclosure slot against a generic **400-character corpus**,
because it was written before `copy.md` closed. The method was sound and every figure reproduced to
the hundredth on re-measurement. The slots were still wrong. Re-measuring with the **strings that
ship** — 72 records, four widths, both themes — overturned three claims the run had made: `D4` was
written as conditional on `nightMinutes > 0` when the line renders `0h 0m / R$ 0,00` and the
disclosure is therefore **unconditional**; the padding step on the journey panel was justified by a
rule that does not read it (`J-1` measures 41,00 cpl **with and without** it); and `S-1` and `D-2`
had changed in copy and had **no slot at all**.

The same shape then repeated in two sibling specs: a 112-character probe passed a window that five
real drafts of 102–117 characters all failed, because the windows are disjoint and the probe landed
in a band the delivered sentences do not reach.

## Why it happened

A capacity figure and a delivered string answer different questions. *How much fits* is a property
of the box; *what this says, in this state, at this width* is a property of the sentence. A corpus
gives the first and is silently taken for the second, because both come out as a character count and
the units look identical. The corpus is also uniform where real copy is not: it has no citation that
cannot wrap, no norm identifier that must stay on one line, no state in which the string is absent
and no state in which it doubles.

## The rule

**Size the slot from a capacity figure; rule on it only after rendering the string that ships, in
every state that renders it.** The corpus sizes a window and is never the verdict. Until the copy
gate closes, a slot figure is a **budget with its corpus named**, never an accepted measurement — and
when copy closes, the slot is re-measured against the delivered text before the gate is called
closed, because the strings are what a reader meets.

Three consequences that cost a gate each: a window built from a probe is **not** evidence that a
sentence of the same length fits, since disjoint windows have gaps a probe can sit in and prose
cannot; a disclosure's **rendering condition** is a property of the delivered string, so a slot sized
before copy may be conditioned on the wrong state; and a slot justified by a rule must name the rule
and the quantity it reads, or the justification survives a re-measurement that refutes it.

## How to verify

Before closing a design gate whose copy gate has closed, render the delivered strings and read the
boxes — never transcribe the corpus figures:

```bash
grep -nE '[0-9]{2,} (chars|caracteres)|corpus|probe' .specs/NNNN-*/design.md
```

Every hit either names the state and the delivered string it was read against, or it is re-measured.
For each slot, print the character count of the shipped string beside the window, and check the
count is **inside** the window rather than merely below its ceiling — a disjoint set of windows has
gaps, and a sentence that lands in one fits nothing. Then enumerate the states the string renders in
and confirm the slot's condition matches the string's, including the states where the figure it
qualifies is absent or zero.


## Retired

2026-09-19 — promoted into .agents/agents/product-designer.md — 'How a number becomes publishable', merged with 050 as one rule
