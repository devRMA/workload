---
id: 058
title: Pin every enumeration and every measured number to the state it was read in, because a spec's own tasks change the tree and the app state the next reader reproduces it against
applies-to: product-manager
domain: spec
spec: 0007
created: 2026-09-19
confirmed: 0
---

## What happened

Four corrections in one day, in three domains, all the same shape:

- An acceptance criterion enumerated **15 files** from a search run over the tree at spec time. At G5
  the same search returned **16**. The sixteenth was real, in the domain, and created by **a task this
  same spec ordered** — `git grep` at the baseline commit returned 0 matches for it, the working tree
  returned 1. The count was right; the criterion had named no state, so it expired the moment its own
  plan executed.
- A task clause named a viewport, two themes and a target of **129.0 px**, and never named the
  application state the 129.0 had been read in. The developer drove the app's first-run state and
  measured **276.0** — also correct, differing by one banner that renders only where `grossSalary` is
  0. Reported as a regression; it was two states.
- A design document claimed a slot's `document top` was *"identical in all five states"*. In one state
  it is 59.86 px higher, because an element above the card collapses.
- A predicted value was carried forward from a run in a state nobody re-entered.

## Why it happened

A number and a list both look like facts, and a fact does not visibly need a coordinate. The state it
was read in is the one part of a measurement that is never in the measurement, so it is the part that
gets dropped when the result is copied into a document — and the document then outranks the next
agent's judgment.

The tree case is worse than an ordinary staleness, because the thing that invalidates the enumeration
is **the spec's own plan**. A file list measured at G1 is a claim about a tree the spec exists to
change: it is not aging in the background, it is being falsified on purpose, by the tasks written
underneath it. The application-state case is the same mechanism one level up — the spec's own tasks
change which states the app can be in.

## The rule

**Every enumeration and every measured number carries the state it was read in, named precisely enough
to be re-entered, or it is not yet a fact.** Two coordinates, and a document that omits either is
unreproducible:

- **The tree state** — the commit. `git grep` at a named sha, never a bare working-tree count.
- **The application state** — the seed, the route, the stored values, the branch conditions that hold.
  Named as the inputs that produce it, never as a screenshot or an adjective.

For anything a spec's own plan will change, one coordinate is not enough, and the fix is never a
bigger number. **State the quantity twice, against two states, with the delta attributed:** a baseline
clause at the named sha that must reproduce exactly, and a delivered clause stating the relation —
typically that the delivered set is a **superset** whose every extra member is attributed by name to
the task that created it. An unattributed member is then a finding that adds a row, instead of an
argument about whether the original count was wrong. Both clauses score the same quantity, from the
same command, with the known-bad and known-good outputs pasted in.

Where two correct readings of the same quantity disagree, **the first move is to find the state that
accounts for the delta, not to subtract**. A delta explained to the unit by an element neither
document names is the normal outcome, and it is a defect in the document that omitted the state — not
a regression in the build.

## How to verify

Take every number and every list in the artifact and ask of each: *what would I have to type to read
this again?* If the answer does not include a commit or a set of inputs, the coordinate is missing.
Then ask the second question, which is the one this lesson costs: *does any task in this same spec
change what that command returns?* If yes, the single-state form is already wrong, and the criterion
needs its baseline clause and its delta clause before it ships.


## Retired

2026-09-19 — promoted — AGENTS.md §5 'How a claim about the tree is measured', final bullet: every enumeration and every measured number carries its tree state and its application state, and a quantity this spec's own plan changes is stated twice with the delta attributed
