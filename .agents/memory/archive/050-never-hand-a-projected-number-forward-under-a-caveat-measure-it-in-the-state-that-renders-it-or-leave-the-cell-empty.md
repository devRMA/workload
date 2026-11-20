---
id: 050
title: Never hand a projected number forward under a caveat: measure it in the state that renders it, or leave the cell empty, because a downstream gate rules on the digits and never on the label
applies-to: product-designer
domain: design
spec: 0007
created: 2026-09-16
confirmed: 2
---

## What happened

`design.md` run 1 priced a permanent disclosure slot at **+60 px**, from `212 chars ÷ 46 cpl = 3
lines × 17,4 + 8`, and labelled the neighbouring banner figure *"a projection, not a measurement"*.
Every number in that chain was wrong. The law gate ruled on the 60, noticed the division gives 4,61
and not 3, and published **95 px** — recomputed the same way, off the same cpl figure, at a type step
the slot does not use. The caveat travelled with neither number. Rendering the delivered string
returned **129,0 px**, and the companion figure the same run had projected at −42 px measured
**−134,0 px** — an error large enough to invert the sign of the result in two of five states: the
states the ruling was written for got *cheaper*, not more expensive, and a plan built on the
projection would have had the whole shape backwards.

## Why it happened

A projection is written to be replaced, and it is read as a number. The caveat lives in the cell; the
digits live in every document that quotes the cell, and by the time a second gate rules on them
nobody is looking at the sentence that disclaimed them. Worse, a plausible projection **invites
recomputation instead of measurement**: the next reader fixes the arithmetic — the division, the
rounding — and inherits every premise underneath it, because arithmetic that can be checked feels
checked. The premises here were a characters-per-line figure measured on a different string in a
different box, a type step assumed rather than read, and a separation margin nobody had written down.
None of the three is visible in `212 ÷ 46`.

## The rule

**A number that will be read by another agent is measured in the state that renders it, or it is not
written.** *Projected*, *estimated*, *≈* and *to be confirmed* are not protections — they are
annotations on a figure that will be quoted without them. If the state cannot be reached yet, write
the **method and the blank**: *"height of X in state S, unmeasured — reachable by loading S with
`<seed>`"*. A blank stops a plan; a caveated number does not.

Two corollaries the same defect teaches. First: **a derived figure inherits every premise of the
figure it derives from**, so correcting the arithmetic of someone else's projection produces a second
projection, not a measurement — when a downstream gate republishes your number with the division
fixed, that is the signal to render it, not to accept it. Second: **a projection's error has no known
sign**. Here one projection was 46% low and its companion 69% low, and because they enter the result
with opposite signs the net moved from *"+53 px everywhere"* to *"+129 px in three states, −5 px in
two"*. Never let a plan, an acceptance criterion or a legal ruling depend on the direction of an
unmeasured delta.

## How to verify

Before any number leaves the artifact, grep your own draft for the hedges and for the arithmetic:

```bash
grep -nE '≈|~[0-9]|projec|estimat|assum|should be' .specs/NNNN-*/design.md
grep -nE '[0-9]+ ?[÷/×x] ?[0-9]+' .specs/NNNN-*/design.md
```

Every hit is either a measurement with the state it was read in, or it is deleted. For a layout
figure, load the state deliberately in the project's own browser, apply the candidate markup to the
live DOM, and read the box — counting **rendered line boxes**, never characters:

```js
const r = document.createRange();
r.selectNodeContents(el);
new Set([...r.getClientRects()].map((c) => Math.round(c.top))).size; // lines, measured
el.getBoundingClientRect().height;                                   // height, measured
```

Then measure the *difference* you are claiming, not only the end state: render the before markup and
the after markup in the same page load, and report both.


## Retired

2026-09-19 — promoted into .agents/agents/product-designer.md — 'How a number becomes publishable', merged with 052 as one rule
