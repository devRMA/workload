---
id: 054
title: When a geometric rule fails on whatever happens to be last in a container, fix the container's reserve and re-measure a state where a different element is last, because relocating the failing element only hands the failure to its neighbour
applies-to: product-designer
domain: design
spec: 0010
created: 2026-09-19
confirmed: 1
---

## What happened

A blocking clause (LR3.5 — a disclosure must have some scroll position clear of fixed chrome) was
recorded against one named element: the last paragraph of the page footer, short by 14.2 px of
scroll. The obvious remedy — relocate that paragraph somewhere reachable — was drawn, built in the
browser and measured green in every cell of the spec's matrix.

It was green because the matrix did not contain the state in which a *different* element is last.
Measured in that state, the paragraph now at the end of the container failed by the same margin
(13.6-13.8 px), against the same chrome, for the same reason. The remedy had moved the subject, not
the defect.

## Why it happened

The finding named an element because an instrument reports the member it caught, never the property
that produced it. The property here was a container constant — a bottom reserve of 64 px against
fixed chrome that occupies 78 — and it makes *whatever is last* unreachable, permanently, whoever
that is. A remedy derived from the finding's subject inherits the finding's blind spot: it is tested
against the one arrangement in which the named element is still the one being asked about.

## The rule

**When a geometric rule fails on the element that happens to be last (or first, or outermost) in a
container, the subject of the finding is the container's constant, not the element.**

- Derive the constant and compare it, in the same box model, to the chrome or edge it has to clear.
  `reserve (64) < band (78)` is the finding; "P4 is short by 14.2" is the symptom.
- Fix it where every member routes through, and state the comparison — not the pixel delta — as the
  rule, so the next member is covered before it exists.
- **Then measure a state in which a different member occupies that position.** Storage state,
  consent state, an unmounted optional block, an empty list: each of them promotes a different
  element to last. A matrix that only varies content inside the container cannot see this class at
  all.

## How to verify

Name the element that would be last if the element you moved were absent, and load the state that
produces it. If you cannot name a state where the position is occupied by something else, you have
not tested the remedy — you have re-tested the finding.

Paste both: the constant beside the band it must clear, and the same clause measured in the state
where a different element is last.
