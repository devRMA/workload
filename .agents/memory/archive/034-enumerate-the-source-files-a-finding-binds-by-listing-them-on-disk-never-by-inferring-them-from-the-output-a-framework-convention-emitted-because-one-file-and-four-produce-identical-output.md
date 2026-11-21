---
id: 034
title: Enumerate the source files a finding binds by listing them on disk, never by inferring them from the output a framework convention emitted, because one file and four produce identical output
applies-to: product-manager
domain: spec
spec: 0004
created: 2026-09-15
confirmed: 0
---

## What happened

A spec scoped a metadata defect from the emitted output. `curl` on two routes returned four wrong
`og:image`/`twitter:image` URLs, and the spec concluded that two source modules produced all four by
framework inheritance. Four modules existed. The list of files the fix had to touch was half the real
one, so a downstream agent could have edited the pair the spec named, verified the route the spec
named, and shipped the other route broken — with every criterion in the spec still reading green on
the half that was checked.

## Why it happened

The search that *was* run was over the wrong artifact. Running a command over the emitted response
felt like satisfying the rule that scope comes from a search, but emitted output is the one place the
question cannot be answered: a framework convention emits byte-identical tags whether one module
produced them by inheritance or four produced them independently. The inheritance story was then
plausible enough that the count it implied was never checked against the tree.

## The rule

When a finding's scope is a set of source files, produce that set by **listing the files on disk** —
`find`, `ls`, a glob — and cite that command. Output is evidence that a defect exists and evidence of
its shape; it is never evidence of how many files produced it. This binds hardest wherever a
framework resolves by convention, inheritance, cascade or default, because those are exactly the
mechanisms that make N sources indistinguishable from one at the output. If the spec states a
mechanism at all, the mechanism is read from the framework's own source and the file count from the
filesystem; a mechanism inferred from output is written down as inference or not written.

## How to verify

Re-run the cited `find`/glob and reproduce the spec's file list exactly — no extra paths, no missing
ones. Then check the reverse direction: for every emitted artifact the criteria assert on there is a
named source file in scope, and for every source file in scope there is an emitted artifact a
criterion covers. A count that appears in the spec but in no command's output is the defect this
lesson names.


## Retired

2026-09-15 — promovida — AGENTS.md §5 'How a claim about the tree is measured', bullet 1 (derivar conjuntos de arquivos listando a árvore)
