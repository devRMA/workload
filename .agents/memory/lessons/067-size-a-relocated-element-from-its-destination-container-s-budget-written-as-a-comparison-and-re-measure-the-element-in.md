---
id: 067
title: Size a relocated element from its destination container's budget, written as a comparison, and re-measure the element in the state the sibling spec in flight will deliver
applies-to: product-designer
domain: design
spec: 0010
created: 2026-09-19
confirmed: 0
---

## What happened

A design placed a disclosure under the answer on a phone and priced the placement from the
disclosure's **own height**: 34.8 px of box with 23.8 px of clearance to the fixed route nav. Both
numbers were real readings. While the plan that consumed them was being written, a **sibling spec
already in the same tree** rewrote that paragraph — a citation gaining three sources and four links
— and it became 121.7 px, seven line boxes. The clearance went from **+23.8** to **−63.1**, the
placement became an overlap with fixed chrome, and the task that was to build it was superseded
before a line of it ran.

The re-measurement then found the real constraint, and it was never the paragraph: the first screen
below the answer has **58.6 px** of room — `navTop − heroCardBottom − gap` — and no ordering of the
answer card and a 121.7 px paragraph fits in the band at all. The remedy was a **different whole
paragraph of the same footer**, 52.2 px, which the legal analysis had already listed as an
equivalent candidate on the first pass.

## Why it happened

Two failures with one shape, and the second is the one that costs a gate.

**A placement expressed as a pixel delta hides its own premise.** *"23.8 px of clearance"* reads
like a property of the design; it is the residue of a subtraction whose other two terms — the
container's budget and the element's height — are never written down, so neither can be re-checked
when one of them moves. The number survives the premise that produced it, and the next reader
inherits it as a fact.

**An element in a shared tree is not a constant.** A geometric cell carries the state it was read
in; what it does not carry is whether **another spec is holding a pen over the same element**. A
sibling's `plan.md` is not a background risk — it is a scheduled edit to the input of your
measurement, and it is readable before you measure.

## The rule

**Express every placement as the comparison the container imposes, and re-measure the element in
the state the sibling spec in flight will deliver.**

- **The budget, not the delta.** Write `containerLimit − precedingContent − gap ≥ elementHeight`
  with all four terms measured and named, and quote the **slack** as its consequence, never as the
  rule. A spec, a plan or a guard that carries the delta ships a constant that silently stops being
  true; one that carries the comparison fails loudly, in the term that moved.
- **State the budget in the unit the element grows in.** Pixels are the measurement; **line boxes**
  are the thing a string buys. *"58.6 px = three line boxes at this type step; a fourth is 69.6 and
  fails by 11"* is checkable by the writer who never sees the layout.
- **Before measuring any element another spec can touch, read that spec's `plan.md` `Files:` lines
  and its `STATUS.md` task table.** If a task that has not landed names the file your element lives
  in, you have measured a state nobody will ship. Name the tasks still open and say, per task, why
  it cannot move your box — a settings panel that is absent from the DOM, a test-only file — or
  wait for it.
- **When the element you were handed no longer fits, re-open the set of candidates, do not shrink
  the element.** The rule that admitted it usually admitted several — a legal analysis that lists
  four qualifying surfaces has authorised any of them. Measure **every** remaining candidate in the
  destination and choose on the property the rule actually cares about, which for a disclosure is
  the claim it makes and not its height.
- **Distinguish the invariant from the absolute out loud.** Here the *margin* between the container's
  limit and its content was the design's subject while every *absolute* position moved by hundreds
  of pixels; a downstream gate calibrates on whichever number it is handed.

## How to verify

Before any placement leaves the artifact:

```bash
# every file your measurement depends on, against every sibling spec's open tasks
grep -rn "Files:" .specs/*/plan.md | grep -F "<the file your element renders from>"
grep -n "pending\|in-progress" .specs/*/STATUS.md
```

A hit on a task that is not `done` is a blocker on your measurement, not a footnote.

Then grep your own draft for placements stated as a bare distance:

```bash
grep -nE 'clearance|slack|[0-9]+(\.[0-9])? px (of|to) ' .specs/NNNN-*/design.md
```

Every hit needs the comparison beside it — limit, preceding content, gap, element — each a reading,
with the state it was read in. If you cannot write the comparison, you measured a coincidence.

Last, take the negative measurement: name the element that would occupy the position if yours were
absent, and load the state that produces it. A remedy tested only in the arrangement where your
element is the subject has been re-tested, not tested.
