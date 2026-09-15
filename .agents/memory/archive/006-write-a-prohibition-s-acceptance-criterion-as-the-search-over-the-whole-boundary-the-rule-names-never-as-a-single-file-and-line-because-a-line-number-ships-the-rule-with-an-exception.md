---
id: 006
title: Write a prohibition's acceptance criterion as the search over the whole boundary the rule names, never as a single file and line, because a line number ships the rule with an exception
applies-to: product-manager
domain: spec
spec: 0002
created: 2026-09-14
confirmed: 3
---

## What happened

The law gate wrote a rule banning a phrase **anywhere in a directory**. The spec turned it into
an acceptance criterion pinned to the one file and line the analyst had quoted as the example.
A second occurrence of the same banned phrase lived four lines below, in a sibling entry of the
same array, on the same screen. Nothing in the spec, the copy artefact or the plan reached it,
because all three had been written from the example rather than from the rule. It surfaced at
the build gate, as a blocker, after four gates had closed over it.

## Why it happened

The analyst quotes one location because that is where the defect was found; the location is
evidence, not the extent. A criterion copied from the quote inherits the evidence and drops the
extent. The failure is invisible at review: the criterion is specific, checkable and passes —
it just checks a smaller thing than the rule forbids.

## The rule

When a rule forbids a phrase, a claim or a pattern **within a stated boundary** — a directory,
a layer, the whole tree — write the acceptance criterion as the search over that boundary, and
quote the rule's boundary verbatim in the criterion. The example location goes in the scope
table as a location; it never becomes the criterion.

Add a second criterion whenever the prohibition exists to enforce **consistency** rather than
absence. A search for the banned wording cannot catch two different *permitted* names for one
thing on one screen, which is usually the failure the rule was written to prevent. That one is
checked by reading both renderings side by side, not by a command.

## How to verify

Before closing the gate, run the rule's own search over the rule's own boundary — not over the
scope table — and confirm every hit is either in the scope table or explicitly excused in
writing. If the count of hits exceeds the count of scope rows, the scope is wrong, not the rule.


## Retired

2026-09-15 — promoted to AGENTS.md §5 'How a criterion is written' at 0005 G10 (3 confirmations)
