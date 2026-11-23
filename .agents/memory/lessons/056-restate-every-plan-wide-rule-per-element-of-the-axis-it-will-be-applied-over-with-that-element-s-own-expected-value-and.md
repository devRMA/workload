---
id: 056
title: Restate every plan-wide rule per element of the axis it will be applied over, with that element's own expected value and its own premise re-derived
applies-to: tech-lead
domain: plan
spec: 0008
created: 2026-09-19
confirmed: 0
---

## What happened

Two tasks of one plan stopped mid-build on rules that were correct in the cell they were written
for and unsatisfiable everywhere else.

A guard task asserted "these four nodes resolve to exactly 4 elements, for each route", with the
four selectors copied from the one route where the defect had been observed. Three of the four nodes
only exist on that route; on the sibling route the set is always 1, so 16 of 96 cases were red for
a structural reason, and the developer stopped rather than invent a per-route exemption.

An artifact task stopped on "if the working tree is dirty under `app/`, `components/`, `hooks/` or
`lib/`, do not build the local artifact" — while the artifact was built by `git archive HEAD`, which
reads committed objects only and cannot see an uncommitted edit. Sibling specs dirtied the tree, the
stop condition fired, and the blocked build was one whose bytes the condition could not affect.

## Why it happened

Both rules were generalised from the single cell that produced them. The selector set came from the
route the defect was measured on and was then applied "for each route" without re-listing the source
for the other route. The stop condition came from the general worry "the measured artifact must be
identifiable" and was then written as a test on the working tree, which is only one of the
mechanisms that could make it unidentifiable — and not the one this recipe used.

A rule written as a blanket reads as rigour at the gate it is written in. Its cost lands at the gate
that applies it, where the agent is not allowed to narrow it.

## The rule

Before a rule in `plan.md` is applied across an axis — routes, viewports, artifacts, themes,
storage states — restate it once per element of that axis, and for each element write down:

1. **its own expected value** (the set size, the count, the threshold), derived by listing the source
   for that element, with the command cited; and
2. **its own premise**, re-derived for that element — for a stop condition, the mechanism by which
   the condition could actually reach that element's artifact.

An element for which the rule's premise does not hold gets its own clause in writing, never a
per-element exemption invented at build time and never a silently weakened assertion. In particular,
identify an artifact by **what it was built from** — a pinned commit or tree hash — so the rule that
guards its identity is a test on that identifier, not on the environment around it.

## How to verify

Take any plan rule containing "for each", "every route", "all cells" or "any artifact" and read it
against the element of that axis *least* like the one the rule was derived in. Ask the two
questions: what is the expected value here, and by what mechanism could this rule's condition be
true here? If either answer requires listing a file the plan never listed, the rule is not written
yet. A guard whose expected value is the same literal on every element of a heterogeneous axis is
the tell.
