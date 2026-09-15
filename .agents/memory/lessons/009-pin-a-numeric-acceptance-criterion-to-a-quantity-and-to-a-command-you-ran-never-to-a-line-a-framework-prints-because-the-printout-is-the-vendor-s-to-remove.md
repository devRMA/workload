---
id: 009
title: Pin a numeric acceptance criterion to a quantity and to a command you ran, never to a line a framework prints, because the printout is the vendor's to remove
applies-to: tech-lead
domain: plan
spec: 0002
created: 2026-09-14
confirmed: 0
---

## What happened

An acceptance criterion set a byte budget on a route's JavaScript, and both the criterion's
verification cell and the plan's tasks named the figure the build tool prints. A major version
of the framework removed that printout as inaccurate for its own architecture. The quantity was
still entirely real and still worth a budget, but the only instruction anyone had for reading it
had evaporated. The builder was left choosing between a bundle analyser, the sum of a chunk
directory and a Lighthouse figure — three methods with three different answers — which is
choosing the acceptance test for a number, so it stopped and escalated.

## Why it happened

The criterion had been written as *a line of output* rather than as *a quantity plus a way to
obtain it*. That reads as concrete and is in fact the most fragile form available: the line
belongs to a vendor who may reword, rename or delete it in a minor release, and nothing in the
spec notices until a build runs.

## The rule

**Write every numeric acceptance criterion as three things: the quantity, the threshold with its
unit, and a command in this repository that prints it.** Never as a figure a third-party tool
happens to display. When no such command exists, the plan creates one — a small committed script
that reads a build artefact — and pins whatever would otherwise drift silently, such as a
compression level or a default that changes between runtime releases. Record what the
authoritative artefact is *and* which plausible alternatives were rejected and why, because the
next agent will otherwise re-derive the choice and get a different number.

A method change is not a scope change: if the quantity and the threshold survive, the plan fixes
the measurement and routes the criterion's verification cell to its owner as a non-blocking
correction. Only if the quantity itself has stopped meaning anything does the criterion go back
for restatement.

## How to verify

- Every numeric criterion's verification cell names a command runnable from the repo root, not
  a tool's screen output.
- Run it before writing the task, and record the figure it produced in the plan, so a broken
  measurement is distinguishable from a real delta on the first run.
- Before/after pairs are produced by the *same* command; the artefact of record contains both
  verbatim outputs, not two prose summaries.
- Any implicit default the figure depends on is pinned explicitly in the script.
