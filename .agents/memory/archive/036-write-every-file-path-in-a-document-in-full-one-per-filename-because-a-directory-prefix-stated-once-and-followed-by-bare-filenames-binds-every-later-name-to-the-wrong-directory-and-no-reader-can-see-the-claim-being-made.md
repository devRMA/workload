---
id: 036
title: Write every file path in a document in full, one per filename, because a directory prefix stated once and followed by bare filenames binds every later name to the wrong directory and no reader can see the claim being made
applies-to: product-designer
domain: design
spec: 0001
created: 2026-09-15
confirmed: 0
---

## What happened

`DESIGN.md` § Components documents each component with a heading of the form
`### Name — path`. A G10 triage read those headings against disk and reported five wrong of six.
Listing `components/**/*.tsx` before editing found **eight wrong of thirteen**. The three the triage
could not see were of one shape it had no row for:

- `### Inputs — components/atoms/input.tsx, masked-input.tsx, currency-input.tsx` — one prefix,
  then two bare filenames. `input.tsx` is an atom; the other two are molecules. The heading asserts
  `components/atoms/` for all three and nothing in it marks that as a claim.
- Cards, Segmented controls and Navigation named six files with **no directory at all**, so they
  read as correct while asserting nothing a reader can act on.

`AGENTS.md` §8 makes the atomic level binding, so a plan or a design that reads these headings puts
the next file in the wrong directory. Two specs in flight were reading `hero-panel.tsx` — documented
as a molecule, shipped as an organism — while the defect sat open.

## Why it happened

A shared prefix is a compression, and compression in a normative document hides where the assertion
stops. When a component moves between levels, the heading that names it directly gets found by a
grep for its filename; the filenames riding on someone else's prefix do not, because the string that
is wrong about them is three names away. The same blindness applies to a path that was never
written: an unqualified filename cannot be checked against disk, so an audit that greps for wrong
paths returns it as clean. A triage table is built from what its author's search could express, and
this one could express "path stated and wrong", not "path implied" or "path absent".

## The rule

In any document that binds a file's location, write each path in full, once per filename. Never
factor a directory out across a list, never name a file without its directory, and never let a
heading cover more than one file whose paths differ. Before publishing or repairing such a
document, enumerate the real paths with a directory listing and check **every** claim in the
section, not the ones a report named — a report's count is a property of the search that produced
it.

## How to verify

List the tree, then check the document against the list rather than the reverse:

```
find components -name "*.tsx" | sort
grep -nE '^### ' DESIGN.md
```

Every filename in every heading must appear with its own directory, and every one of those paths
must exist in the `find` output. A filename in the document with no `components/<level>/` in front
of it is a defect even when the level it implies happens to be right.


## Retired

2026-09-15 — promovida — AGENTS.md §5 'How a claim about the tree is measured', bullet 4 (todo caminho escrito por inteiro, um por nome de arquivo)
