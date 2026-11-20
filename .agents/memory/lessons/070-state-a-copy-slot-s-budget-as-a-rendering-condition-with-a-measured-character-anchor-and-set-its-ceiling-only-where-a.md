---
id: 070
title: State a copy slot's budget as a rendering condition with a measured character anchor, and set its ceiling only where a clause or a named pixel cost binds, because a window drawn on fillers rejects the delivered string for a cost nobody priced
applies-to: product-designer
domain: design
spec: 0012
created: 2026-09-19
confirmed: 0
---

## What happened

A design gate sized a disclosure slot from fillers, because the copy gate runs in parallel and had
not delivered yet. It wrote a character window whose ceiling was the last length that still rendered
six line boxes on a phone. The delivered string was longer, and the only reason the window rejected
it was a seventh line box — 17 px of card height, below the last number on the screen, with no
clause and no principle failing. The plan gate stopped, two gates argued for a batch, and every cut
that would have fitted the window deleted a fact the legal analysis had proved load-bearing.

## Why it happened

The window was measured honestly and stated as if it were a constraint. A boundary between two line
counts is a **cost**, not a bound: nothing fails when it is crossed, something just gets taller. Once
it is written as an inclusive numeric interval, a downstream gate reads it as a rule with the same
force as a contrast ratio or an overflow bound, and the only remedy it can see is cutting words the
design gate is not allowed to cut.

## The rule

Write a copy slot's budget as **the rendering condition that actually binds** — a line-box count, a
legibility floor, a box that must not overflow — and give the character window as its **measured
anchor for one wording family**, said to be an anchor. Derive the floor from content: the length at
which a required claim has to go, measured by deleting the shortest required clause from a real
candidate. Derive the ceiling from a clause that fails or from a pixel cost you name in the same
sentence, and state that exceeding it buys the pixels rather than breaking the design. When the
delivered string lands outside the window and nothing fails, the window was the error — correct it
and say so; a disclosure is never cut to fit a number a design gate invented.

## How to verify

Take the delivered string, render it in the shipped box at every viewport and theme, and measure:
line boxes, the character count of every individual line box, border-box width against its
reference, top against its reference, card height with and without the element. Then ask of the
window's own ceiling: which clause goes red one character past it? If the answer is *none*, the
ceiling is a price, and the document must say what the price is, in pixels, next to it.
