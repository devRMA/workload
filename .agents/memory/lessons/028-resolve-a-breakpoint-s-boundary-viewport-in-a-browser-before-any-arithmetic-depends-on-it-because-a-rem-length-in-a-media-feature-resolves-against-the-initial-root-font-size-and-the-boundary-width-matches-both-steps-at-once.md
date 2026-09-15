---
id: 028
title: Resolve a breakpoint's boundary viewport in a browser before any arithmetic depends on it, because a rem length in a media feature resolves against the initial root font size and the boundary width matches both steps at once
applies-to: product-designer
domain: design
spec: 0006
created: 2026-09-15
confirmed: 0
---

## What happened

`design.md` §4.1 modelled a reference viewport of exactly 2560px as sitting at a 17px root, one step
below the 18px it assigned to 3840, and derived a whole column of geometry from it — a different
`surfaceRoot` width, a different `bodyText` width, a different chrome spend, a different headroom.
The root at 2560 is 18px, identical to 3840. Every number in that row was wrong, the plan carried
two of them into acceptance clauses, and the build stopped at the contradiction between the modelled
number and the measured one.

## Why it happened

The model was derived by reading the stylesheet's two steps and assuming the wider one begins
*after* the width it names. A length in a media **feature** resolves against the browser's *initial*
root font size, never against the cascaded one, so `min-width: 160rem` is exactly 2560px: at a
viewport of exactly 2560 both `min-width: 120rem` and `min-width: 160rem` match, and the later rule
wins. The intermediate band exists only for `[1920, 2559]`, and no reference width in the matrix sat
inside it. The reference widths a design is verified at are chosen to be round numbers, and round
numbers are exactly the ones a breakpoint is declared at — so a design's reference widths are
disproportionately likely to land **on** a boundary rather than safely inside a band.

## The rule

Never derive a breakpoint band's value at its own boundary by reading the query. Resolve the
boundary viewport in a browser first, and only then let arithmetic depend on it. This binds whenever
a design states a per-viewport number — a root size, a container width, a track, a padding in `rem`
measured against a budget in px — at a width that equals, or is one unit from, a declared
breakpoint. Probe the band's floor, the unit below it and the unit above it, not the middle of the
band, because the middle is the only place the reading-based model is guaranteed to be right.

Two corollaries the same defect teaches. First: a per-viewport table's rows are not independent
claims — one wrong root size silently rewrites every derived column of that row, so a row is verified
as a row, not cell by cell. Second: when a measured value from a real build contradicts a modelled
one, the model is wrong until a probe says otherwise; a design gate does not get to keep its
arithmetic because its conclusion happens to survive.

## How to verify

Load the page, or a minimal document carrying the same `@media` steps, in the project's own browser
and print the resolved value at the boundary and at its neighbours:

```js
for (const width of [1919, 1920, 2559, 2560, 2561, 3840]) {
  await page.setViewportSize({ width, height: 900 });
  console.log(width, await page.evaluate(() => getComputedStyle(document.documentElement).fontSize));
}
```

Cross-check against a number the production build already recorded — if two reference widths print
identical geometry, they are in the same band, whatever the stylesheet reads like.
