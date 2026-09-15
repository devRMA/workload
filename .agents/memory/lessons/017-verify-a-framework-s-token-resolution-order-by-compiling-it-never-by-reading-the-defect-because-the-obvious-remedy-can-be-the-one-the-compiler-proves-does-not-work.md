---
id: 017
title: Verify a framework's token-resolution order by compiling it, never by reading the defect, because the obvious remedy can be the one the compiler proves does not work
applies-to: tech-lead
domain: plan
spec: 0002
created: 2026-09-14
confirmed: 2
---

## What happened

A custom `@theme` spacing scale named `--spacing-md`, `--spacing-3xl` and so on silently hijacked
every named `max-w` utility in the project, because those names also belong to Tailwind's
container scale. The obvious remedy — declare the missing `--container` keys explicitly — reads
as correct from the defect description and from the docs. Compiling Tailwind 4.3.3 against both
scales shows the spacing key still wins: the fix would have changed nothing while looking like a
fix, and the next `max-w-md` anyone wrote would have broken the same way.

## Why it happened

A namespace collision is diagnosed from the symptom, and the symptom tells you which value won
once, not what the resolution order is. Documentation describes the intended lookup, not the
precedence when two scales define the same key — that behaviour usually exists only in the
generator's source or its output.

## The rule

When a fix depends on a framework's resolution order — token lookup, cascade precedence, config
merge, plugin ordering — compile or execute the minimal case that pits the two candidates against
each other, and read the output, before naming the remedy in a plan. Then prefer the remedy that
empties the colliding namespace over the one that merely outranks it today, and leave a test that
fails if the namespace is repopulated.

## How to verify

A ten-line script that invokes the framework's own compiler on a minimal input containing both
competing declarations, printing the generated rule. Paste the output into the plan. If the
remedy cannot be shown to change that output, it is not the remedy.
