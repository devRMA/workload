---
id: 044
title: Never read an element's box off a layout-shift source rect: those rects are clipped to the viewport, so derive every intended geometry from getBoundingClientRect on a state you loaded yourself
applies-to: product-designer
domain: design
spec: 0008
created: 2026-09-16
confirmed: 0
---

## What happened

A `PerformanceObserver` on `layout-shift` printed a source list, and the shift was written down from
it: *"the form column loses 383 px of height (632 -> 249) and moves 511 px down"*. That reading
travelled into a spec's Problem statement, into its acceptance criteria, into a routing brief and
through a blocking legal gate, unchallenged, because it came with a timestamp, a node name and four
numbers.

Half of it was an artifact. `LayoutShiftAttribution`'s `previousRect` and `currentRect` are **clipped
to the viewport**. The `249` was not a 249 px column; it was a 1,200 px column whose visible part
began at 595 in an 844 px viewport. Three rows of the same output had `top + height = 844`
**exactly** — the tell was in the file the whole time. Re-measured with `getBoundingClientRect()`
against states loaded on purpose, the column was not 383 px shorter than intended but **568.7 px**
shorter, and it ended *above* the fold where it should have run past it. An acceptance criterion had
also been written to compare unclipped rects against those clipped numbers, so it would have gone red
on a build with no defect at all.

## Why it happened

A shift observer answers "what moved", and it is the only instrument in the room when an intermittent
layout defect is caught. Its output looks like geometry: it names a node, it prints a before and an
after, it is machine-produced. Nothing in it is labelled as a *visible* rect rather than a
*border-box* rect, and the clipping is invisible whenever the element happens to fit on screen —
which is most elements, most of the time, which is exactly what teaches the wrong habit.

The deeper error is the shape of the evidence. A shift observer reports only the frames the browser
chose to shift on. It never reports the state the design intends, because that state produces no
entry. So a geometry derived purely from shift output is a difference between two frames nobody
specified, with no target anywhere in it.

## The rule

**A diagnostic instrument's output tells you that something moved and roughly where; it never tells
you what a box is.** Before any number from a `layout-shift` entry, a mutation log, a screenshot diff
or a trace becomes a box in a document, re-measure that box with `getBoundingClientRect()` in a state
you loaded deliberately, and write the intended geometry down beside the defective one.

- **Load the intended state on purpose, at least twice.** For a hydrating app that is (a) the server
  bytes, with `javaScriptEnabled: false` — the geometry the first paint is supposed to have, and the
  one no observer will ever hand you — and (b) the settled client state. The defect is the difference
  between those and what was observed; without both there is no target to score a diagnosis against.
- **Check any reported rect for `top + height == viewportHeight` (or `left + width == viewportWidth`)
  before quoting it.** An exact hit is clipping, not a measurement. Two exact hits in one file is
  proof.
- **Never let a criterion compare an unclipped measurement to a clipped one.** If the criterion
  samples `getBoundingClientRect()`, its thresholds must be derived from `getBoundingClientRect()` on
  the same states — and run against a known-good state first, which is where the mismatch surfaces
  (lesson 040).
- Generalise past this one API: **any observer that fires on change reports only changed frames.**
  The unchanged, intended state is never in its output, and it is the half that decides what a remedy
  must preserve.

## How to verify

For every box a document states, there is a command run in that session which loaded a named state
and printed `getBoundingClientRect()` for that selector — not a line copied out of an observer's log.
If a document quotes an observer's rect at all, it says so in the same sentence and says whether the
rect could have been clipped.

```js
await page.goto(url); // and again in a context with javaScriptEnabled: false
const box = await page.evaluate((selector) => {
  const rect = document.querySelector(selector).getBoundingClientRect();
  return { docTop: rect.top + window.scrollY, height: rect.height, width: rect.width };
}, ".lg\\:col-span-7");
```


## Retired

2026-09-16 — promovida — AGENTS.md §5 'How an instrument's reading is trusted', bullets 1 e 3 (rects de layout-shift são clipados ao viewport; remedir com getBoundingClientRect num estado carregado de propósito)
