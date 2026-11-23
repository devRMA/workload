---
id: 048
title: State every concealment or presence rule in each quantity its substance can be breached in, because a clause written in the axis of the defect at hand is silent in every other axis
applies-to: labor-law-analyst
domain: law
spec: 0010
created: 2026-09-16
confirmed: 3
---

## What happened

**LR3** was written to stop a disclosure being concealed. Its bullets name `display`, `visibility`,
`opacity`, `[hidden]`, `details:not([open])`, `aria-expanded="false"` and `.sr-only` — seven
predicates, all asking the same question: *is this box painted at all*. None asks *is something
painted on top of it*.

At `0010` the sweep found **DS1 P4** — the line naming the tax table and its year — resting
permanently under a `position: fixed` route nav, on both routes and in both themes, at every scroll
position the document allows. Fully painted, fully present, unreadable. LR3 said nothing about it.

It was the **third** time the same shape appeared in this rule set:

- **LR3** was stated in the axis of **time** (*present in the server-rendered DOM*) and was breached
  in the axis of **the pair** — a disclosure arriving after its claim. Corrected at `0008` §4.1,
  substance re-expressed as LR6.1.
- **LR2** was stated as a bare `chars / lineBoxes >= 40` and was breached in the axis of **font
  size** — a measure floor is a function of column width *and* type size. Corrected at `0006` §3.1.
- **LR3 again**, stated in the axis of **presence** and breached in the axis of **space**. Corrected
  at `0010` §8.1 by a fifth bullet, LR3.5.
- **0007 addendum A clause 2**, stated in the axis of **DOM containment** (*same card element as the
  figure, in DOM order*) and breached in the axis of **order** — `order-first` and `lg:sticky` make the
  reader's path and the element tree two different sequences, so the clause was unsatisfiable by any
  placement it would have accepted. Corrected at `0007` addendum A correction 1, clause 2b.

Each correction was made after a defect found it. Each time the rule's *substance* had been right
from the start.

## Why it happened

A rule gets written at the gate that found a defect, and the defect arrives in one quantity. The
author states the clause in that quantity, measures it, calibrates it, ships it — and the clause is
correct about everything it can see. What it cannot see is that its substance is a sentence about a
**user's experience** (*they were not shown it*), while its text is a predicate over **one measurable
property**. The gap between the two is invisible from inside the clause, because every test the
author runs is a test of the property they wrote down.

The cost is paid twice: once when the next defect arrives in an axis the clause is silent in, and
again when a reviewer reads a green guard and believes the substance was being watched.

## The rule

**Before a concealment, presence, legibility or co-presence clause is binding, write its substance as
one sentence about what the user gets, then enumerate every measurable quantity in which that
sentence can be made false. State a clause in each one, or record in the rule's own text why an axis
is deliberately left open.**

The axes this rule set has needed so far — a starting checklist, not a closed list:

| Axis | The question | Where it lives |
|---|---|---|
| **presence** | is the box rendered at all | LR3 bullets 1-4 |
| **space** | is something painted over it, or is it off-screen | **LR3.5** |
| **time** | does it arrive no later than the thing it qualifies | LR6.1 |
| **size** | is it wide enough to hold a readable line | LR1 |
| **measure** | does it read as prose at its own font size | LR2a, LR2b |
| **modality** | is it delivered to every user, not only to one assistive tree | LR3 bullet 4 |
| **operability** | can the control it carries be reached and used | LR4.2 |
| **order** | is the reader's path to it the same as the element tree's path | **0007** addendum A correction 1, clause 2b |

Two corollaries that are part of the rule, not commentary:

- **Put each axis in the rule whose quantity it already is.** A spatial hole in a temporal clause is
  not fixed by adding geometry to that clause — one quantity per rule, and a sibling clause that
  reads differently says in its own text why. LR6.1 stayed a frame index; the spatial clause became a
  bullet of LR3, whose other bullets were already geometric.
- **A new axis clause is trusted only once it has a failing subject.** Sweep the whole domain for one
  before calling the clause binding. If the sweep is clean, the clause has never been red and it is
  decoration until something makes it fail.

## How to verify

1. Write the substance as one sentence beginning *"the user was not shown ..."* or *"the user was
   shown X without Y"*.
2. For each axis above, ask: **can I construct a state where that sentence is true and my clause
   still passes?** Construct it in a browser, not on paper.
3. Any axis where you can is either a clause you owe or a line of text saying why it is open.
4. Sweep every member of the rule's domain against the new clause and paste the numbers. Name the
   member that fails. If none does, say so and say what input would.


## Retired

2026-09-19 — promovida para .agents/agents/labor-law-analyst.md
