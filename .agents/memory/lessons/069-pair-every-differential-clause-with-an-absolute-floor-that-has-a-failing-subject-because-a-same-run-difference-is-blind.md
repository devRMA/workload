---
id: 069
title: Pair every differential clause with an absolute floor that has a failing subject, because a same-run difference is blind to every defect that moves both of its subjects together
applies-to: all
domain: spec
spec: 0013
created: 2026-09-19
confirmed: 0
---

## What happened

A rendering axis was scored by a clause that counted characters per rendered line — a sampled
estimator whose threshold moved with the length of the string being sampled, and whose operator
pointed the wrong way, since `≥ cpl` is satisfied by shrinking the text. The replacement offered was
strictly better in every way the objection named: a **differential**, measured in the same run, the
same viewport and the same theme, requiring the new paragraph's determining operands — content-box
width, `font-size`, `font-family`, `font-weight`, `letter-spacing`, `word-spacing` — to be *equal* to
those of a known-good paragraph sharing its container block. Independent of `n`. Not manipulable in
either direction. Invariant across theme and viewport. Measured `Δ = 0.00 px` in 8 of 8 cells.

Then the falsifiability question was asked of it: *name the state in which this clause prints
something else.* The one real defect this project has shipped on that axis is in `DESIGN.md`, *The
Numeric Scale Rule* — a `--spacing-3xl` key silently redefined `max-w-3xl` and rendered the legal
disclosure footer as a **64 px column at every viewport, for two whole specs, while every check in
the repository passed**. In that state the known-good paragraph measures 64 px and the new paragraph
measures 64 px. `Δ = 0.00 px` in 8 of 8 cells. The differential signs `pass`.

The clause was not merely uncalibrated. Against the failure the axis exists for, it was a **pass by
construction**.

## Why it happened

A same-run differential is attractive for a reason that is correct: it cancels the measurement path.
Whatever the browser, the DPR, the root font size, the build or the machine did to one subject, it
did to the other, and the difference carries none of it. That is why `AGENTS.md` §5 prefers it
*"wherever the measurement path is shared and uncontrolled"*.

But a differential cannot distinguish the measurement path from anything else two subjects hold in
common. A container, a token, a cascade key, a shared parent's width, a media query, a font stack are
all "shared and uncontrolled" in exactly the sense the path is. So the same operation that cancels the
noise cancels every **common-mode** defect with it, and the more the two subjects have in common —
which is precisely what makes the comparison fair — the more defects it is blind to. The invariant is
strongest against the failures it is least likely to meet and weakest against the one it was written
for.

Nothing in the clause's shape shows this. It reads as the rigorous option, because every objection it
answers is a real objection. The blindness is not an error inside the clause; it is the clause's
definition.

## The rule

**Before accepting a differential as a scoring clause, name the failure the axis exists to catch and
ask whether it moves one subject or both. If it moves both, the differential cannot see it, and the
clause that carries the axis's substance is an absolute.**

- **Every axis ships at least one clause with a red subject in this tree, and that clause is the one
  that decides the verdict.** State it as an absolute — a floor, a ceiling, an equality against a
  fixed quantity — calibrated on a worked measurement of the intended state, not on arithmetic over a
  token's declared value. Here that is: the disclosure's content box equals its container block's
  content box at `Δ = 0.00 px`; it is not below `238.00 px @320 / 308.00 px @390 / 667.33 px @1440 /
  961.00 px @2560 and @3840`; its computed `font-size` is `≥ 0.75 × root` and never below `12.00 px`.
  The first of those three is red in the 64 px incident; the differential is green in it.
- **Keep the differential — as the refinement, marked provisional, and unciteable until a known-bad
  line has actually printed in the same run.** It answers *"composed the way the known-good one is
  composed"*, which is worth having and which no absolute states. Until the run prints its
  known-bad row — the same paragraph forced to `text-[11px]` **and** to `px-2`, printing *unequal* in
  both cases — no `pass` and no `fail` may cite it. This half is not new: `tech-lead.md` *"Before the
  plan accepts any assertion about a rendered quantity"*, `AGENTS.md` §5 *"Both directions, both
  outputs"*, and lesson **068** already bind it. What is new is that a differential can be green
  against a real known-bad build, so passing that test is not evidence the clause has substance.
- **State the differential's domain, or it goes red for a non-defect.** A clause comparing against a
  known-good sibling only reaches subjects that share the sibling's container. Members of the same
  content domain living elsewhere — here `components/organisms/journey-form.tsx:142` and `:157` — are
  outside it, and the absolute is what reaches them. A differential without a written domain either
  fails members it was never about, or is quietly assumed to cover them.
- **A quantity that is a function of several operands is not scored by sampling the function.** Name
  the operands and read each one, and read them on the **content** box, not the border box — a
  sibling with equal border box and `px-2` differs by 16 px of measure, and a sibling with equal
  `font-size` and `font-weight: 600` differs materially in the quantity the axis is about.

The general shape, stated for any agent writing any clause: **cancelling a confound and cancelling a
defect are the same operation, and which one you did depends entirely on whether the defect is shared
by both subjects.** Lesson **037** is the other side of this — compare the measurement path itself
when you do *not* cancel it. Cancel it, and you owe an absolute.

## How to verify

Answer three questions in writing, in the artifact, before the clause is binding:

1. **What is the worst real defect this axis exists to catch?** Take it from the record — `DESIGN.md`,
   a closed spec, a `STATUS.md` decisions log — not from imagination. If the axis has no recorded
   defect, say so; a clause with no failure in its history is a tripwire and may not decide a verdict
   alone.
2. **Under that defect, what does each subject of the clause read?** Write both numbers. If they move
   together, write the clause's output beside them — here, `64 px`, `64 px`, `Δ = 0.00 px`, `pass` —
   and that line is the proof the clause needs an absolute beside it.
3. **Which clause of this axis is red today, in this tree, and against which named subject?** Put it
   in a table with one row per clause and a *binding / provisional* column, resolved by subject and
   never by preference. An axis whose rows are all provisional is not scoreable, and saying so is the
   deliverable.
