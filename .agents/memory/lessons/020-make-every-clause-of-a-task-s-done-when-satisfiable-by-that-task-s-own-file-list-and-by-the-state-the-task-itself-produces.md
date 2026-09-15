---
id: 020
title: Make every clause of a task's Done when satisfiable by that task's own file list and by the state the task itself produces
applies-to: tech-lead
domain: plan
spec: 0005
created: 2026-09-15
confirmed: 0
---

## What happened

Two tasks in the same plan were gated on states they could not reach. One task's "Done when"
required a five-case guard suite green, while two of those cases assert over a file the task's own
file list excludes and a later task names exclusively. Another task's "Done when" asked a
substitution-proof script to print OK "against the untouched tree", when the script rewrites every
matched line and therefore cannot print OK until after the migration the *next* task performs.

The developer hit both, could not satisfy either literally, and had to choose between reordering the
plan, reinterpreting the wording, or stopping. It stopped and flagged — the right move, and a round
trip that the plan should never have cost.

## Why it happened

The plan was written by walking the acceptance criteria and attaching each one to the task that
advances it, instead of walking each task and asking what state that task alone leaves behind. A
criterion spanning two tasks then lands on the first one, where it reads as a complete check and is
in fact a prediction about a task not yet written.

## The rule

Every clause of a task's **Done when** must be satisfiable by (a) the files in that task's own
**Files** list and (b) the state the task itself produces on a tree where only its predecessors have
run. A clause that needs a later task's file is that later task's clause. A command whose output
depends on work the task does not do is not a check — it is a forecast, and the developer pays for
it.

Where a criterion genuinely spans tasks, split the check: name the subset each task can close, and
say in both tasks which one closes the rest. "Cases 1-3 green here; 4-5 close at T8" costs one line
and removes the whole class of dilemma.

## How to verify

Before writing `plan.md`'s final section, read each task in isolation with the file list covered up
and ask of every "Done when" clause: *could this go green on the tree this task leaves?* Any clause
that needs a file outside the task's list, or a command whose result the task does not change, moves
or splits. If the answer needs the word "after", it belongs to the task named after it.
