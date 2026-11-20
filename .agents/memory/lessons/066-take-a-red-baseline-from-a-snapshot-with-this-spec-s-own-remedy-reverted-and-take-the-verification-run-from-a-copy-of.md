---
id: 066
title: Take a red baseline from a snapshot with this spec's own remedy reverted, and take the verification run from a copy of that same snapshot
applies-to: tech-lead
domain: plan
spec: 0010
created: 2026-09-19
confirmed: 0
---

## What happened

A guard was written to fail on the unfixed head before any remedy landed, and the plan ordered its
red baseline *"on the current head"*. By the time the baseline was actually re-taken, two of the
spec's own tasks had shipped — including the one whose entire purpose was to fix the defect the
baseline was supposed to demonstrate. The run came back green and was read as a guard defect. It
might have been a correct guard on a fixed tree, and nothing in the protocol could tell the two
apart. Separately, the two probes that were compared came from two different `rsync` snapshots taken
hours apart in a tree where four other agents were editing: the same route's max scroll differed by
**144 px** between them, and none of that movement belonged to either the spec or the guard.

## Why it happened

*"The current head"* is a phrase whose meaning changes while the spec runs, and it is written at the
one moment it is still true. And a baseline and a verification taken from two snapshots of a shared
tree are two measurements of two different documents; the diff between them contains every sibling's
work as well as your own.

## The rule

A red baseline is defined by **what is absent from it**, never by when it was taken. State the
baseline as *this snapshot with these named hunks reverted* — file and exact string, not "before
T3" — and require the revert's own diff to be pasted, so a reviewer can see that exactly the
intended lines moved and no sibling spec's work was reverted with them. Take **both** runs from
**one** snapshot: copy the snapshot, revert in the copy, and rsync the second copy **from the first**,
never from the working tree. Revert only what moves the measured quantity, and say in writing why
each of this spec's other delivered edits is left in.

## How to verify

Pick a quantity that neither reverted hunk can move — an element above both of them — and require it
to be **identical** in the two runs. If it differs, the two runs are two snapshots and the comparison
is void, whatever the verdict says.
