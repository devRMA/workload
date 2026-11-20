---
id: 061
title: State the application state, the seed and the viewport for every geometric cell, and produce an invariance claim over N states with N measurements
applies-to: product-designer
domain: design
spec: 0007
created: 2026-09-19
confirmed: 1
---

## What happened

Two specs, two gates, one defect.

In `0007`, `design.md` published a disclosure slot's document `top` as **one number per viewport** —
`1294.2` at 390 — under the sentence *"the slot's height and `top` are identical in all five states
and in both themes, because it is unconditional markup."* The height claim was right. The `top` claim
was false in one of the five states by **59.86 px**: that state's own condition (`monthlyHours ≤ 0`)
also swaps the hero figure for a short string, the `order-first` column above it shrinks, and every
box below it moves up. The same section's *shipped → with this spec* deltas were single-state
readings printed as though they held everywhere, and a legal clause downstream had already been
calibrated on the two absolute values.

In `0008`, `design.md` published `/`'s settled column as `771.4 / 1534.0` with the parenthetical
*"both storage states"*, and derived a permitted change of `−140.4 px` from it. The two storage
states measured were `empty` and a seed containing **no key that route's calculator reads** — the
same state twice. Under the route's real seed the column does not shrink by 140.4; it **grows** by
440.0 at 390, 336.0 at 1024 and 294.0 at 1440, and the empty cell is 34.0 px away from the target it
was said to equal.

## Why it happened

A geometric cell looks like a property of the markup, so it gets written like one. It is not: it is a
sample, and its sample has at least four coordinates — the application state, the storage seed, the
viewport and the artifact. Two of those are invisible in a `getBoundingClientRect()` result, so a
number measured once carries no record of which state produced it and reads identically to a number
measured five times.

The argument that licenses the generalisation is usually *correct about the thing it names*. The `<p>`
really is unconditional. The storage axis really does have two values. What the argument cannot see is
the coupling: an element's **position** is downstream of every sibling whose content the same
condition changes, and `order-first` puts such a sibling visually above while leaving it after in the
DOM — so a DOM-order reading of the component says, truthfully, that nothing above the element
changed. The routed figure inherits the same blind spot one hop later: *"+336 at 1024/1440"* was one
viewport's number applied to two, because the column's width differs and the restored content wraps
differently, and the first-paint cell — where the column holds no restored content — is identical at
both and hides it.

## The rule

**Every geometric cell names the state, the seed, the viewport, the theme and the artifact it was
read in. A cell without those five is not a cell.**

- **An invariance claim over N states is produced by N measurements.** *"Identical in all five
  states"* is a claim about five readings. Never derive it from one reading plus an argument about
  the markup, however sound the argument: the markup argument answers *does this element change*,
  and the quantity is *does this element move*, which is a question about everything the same
  condition changes elsewhere in the layout.
- **Enumerate the conditions that co-vary with the state's own trigger.** Before publishing, ask what
  else the state's condition switches — a hero string, an empty-value banner, a collapsed panel, a
  list with no rows. Each of them is a sibling that can move your element without touching it.
- **A seed is a state, and a seed that sets no key the surface reads is the empty state under another
  name.** Two storage conditions are an axis only if the surface's own source reads a key that
  differs between them; check that by reading the hook, not by reading the seed. An axis whose two
  sides are the same state cannot discriminate and must never be reported as though it could.
- **Publish the per-state table even when the number repeats.** Four identical cells and one
  different cell is the finding; four identical cells alone is a coincidence nobody can audit.
- **Separate the invariant quantity from the state-dependent one, out loud.** Here the *margin*
  between two elements and their *ordering* were invariant across all five states and both seeds,
  while every *absolute* moved. Downstream gates calibrate clauses on whichever number they are
  handed, so say which is which in the same sentence.

## How to verify

Before any geometry leaves the artifact, grep your own draft for cells that claim more states than
they measured:

```bash
grep -nE 'in (all|every) (five|four|three|both|sixteen)|identical in|state-invariant|in every state' .specs/NNNN-*/design.md
```

Every hit needs a table with one row per state, not a sentence. Then run the matrix:

```js
const documentTop = (element) => element.getBoundingClientRect().top + window.scrollY;
```

over `states × seeds × viewports × themes`, print the state label on every row, and diff the rows
against each other rather than eyeballing one. Assert the size of the set before iterating it — a
matrix that silently produced one row prints the same as an invariant.

When you receive a number second-hand, re-measure it before writing it down: reproduce the state,
read the quantity yourself, and if your reading and the routed one disagree, say which viewport, seed
and artifact each was read in. Here that step is what found a routed *"+336 at 1024/1440"* to be
+336 at one of them and +294 at the other.
