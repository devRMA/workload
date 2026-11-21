---
id: 068
title: Discharge a finding only on a re-derivation of the measuring gate's own predicate against your published known-red row, because a green from an untested instrument and a green from a fixed defect are the same string
applies-to: labor-law-analyst
domain: law
spec: 0010
created: 2026-09-19
confirmed: 0
---

## What happened

`0010` G2 published a seven-row LR3.5 table with one known-red row: DS1 P4's clearing interval
`2504.2 .. 2490` — empty by 14,2 px — which became finding **F1**. Three later runs of the e2e guard
built to enforce that clause came back green, and all three were the guard measuring the wrong thing:
the wrong element twice, then a sweep that exited at `scrollY = 0` for a surface 2 841 px below the
fold. A fourth green then arrived from a different gate's own probe. The temptation at the ruling was
symmetrical and both halves were wrong: read the fourth green as the other three (withhold the
discharge and demand another run), or read it as a measurement (accept it because the report said
*measured*). What settled it in one minute was neither: the probe **published its predicate** as a
closed form, and that form was run by hand against the gate's own published table. It printed −14,2
on the known-red row, 28,6 on DS1 P3 and DS2 to 0,1 px. The greens became readable, and **F1 was
discharged on the same day it was about to be carried forward as open**.

## Why it happened

A finding is discharged by an *absence*, and an absence has no positive evidence of its own. Every
instrument that reports one — a guard, a probe, a sweep — prints the identical string whether the
defect is gone, the selector matched nothing, the predicate was mis-transcribed, or the run happened
on a tree where the subject no longer exists. The gate that wrote the finding is the only party that
holds a **state known to produce the opposite string**: the measurement that created the finding.
Not using it means ruling on the instrument's reputation, and a reputation is what three green runs
had already destroyed here.

## The rule

**Before reading any verdict from an instrument you did not build, take its predicate — the formula,
not its prose — and run it yourself against the row of your own published table that you know is
red. If it does not print red there, its greens are not evidence and you rule on nothing.** Then,
and only then:

- **Grade the instrument's output against a discharge criterion you wrote before seeing it**, clause
  by clause, and say which clauses are green and which stay open. A discharge with open clauses is a
  discharge with open clauses, not a rejection and not a clean pass.
- **Separate *the breach is gone* from *this is what removed it*.** They are different findings and
  the second needs a counterfactual — a measured head with the candidate remedy reverted. Without it,
  a causal sentence in the report is a claim with no measurement behind it, and it is the part that
  travels to every downstream gate as fact.
- **Sweep the domain, not the row.** A finding names one surface; the change that discharged it moved
  every surface. Rows you did not re-measure are open, even where arithmetic says they can only have
  improved.
- **A discharge whose margin is thin is a finding about fragility.** Publish the margin as a number
  and convert the finding's disposition into a trigger stated in that quantity, so it re-opens by
  itself instead of needing to be rediscovered.
- **Amend inline, at the gate that found the error, and leave the superseded text visible.** A
  correction absorbed silently teaches the next reader that the first answer was never given.

## How to verify

Open the report that claims the discharge and answer in writing, before the verdict:

1. What is the instrument's predicate, quoted as an expression? *(If the report does not publish one,
   stop — there is nothing to re-derive and the greens are unreadable.)*
2. Run it on the input that produced the original finding. **Does it print red?** Paste both numbers.
3. Run it on two rows the finding did not name. Do they reproduce the published values?
4. Which cells of the domain did the run **not** cover? List them by name; that list is the open part.
5. Was any head measured **without** the claimed remedy? If not, the cause is unattributed — say so
   in the ruling rather than repeating the report's causal sentence.
6. What is the margin, in the rule's own unit, and what change of that size re-opens the finding?
