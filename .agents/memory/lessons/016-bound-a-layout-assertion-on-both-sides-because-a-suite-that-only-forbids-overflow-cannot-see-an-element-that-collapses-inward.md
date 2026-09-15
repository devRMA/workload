---
id: 016
title: Bound a layout assertion on both sides, because a suite that only forbids overflow cannot see an element that collapses inward
applies-to: tech-lead
domain: plan
spec: 0002
created: 2026-09-14
confirmed: 0
---

## What happened

A footer carrying a legally required disclosure rendered as a 64px column at every viewport, on
every route, in both themes, for two whole specs. The e2e suite ran across four viewports and
passed. Lighthouse scored accessibility 1.0 twelve times. A screenshot tool photographed it eight
times. Nothing failed, because the suite's layout assertions were `scrollWidth - clientWidth <= 0`
and "no control outside the viewport" — an element that shrinks inward produces neither overflow
nor an off-screen control.

## Why it happened

Layout tests get written against the failure everyone has seen — content spilling past the right
edge — so they assert an upper bound and stop. The opposite failure is just as common and far
quieter: a collapsed column, a zero-height panel, a flex child squeezed to nothing. It degrades
sighted reading badly while leaving the DOM, the accessibility tree and the byte budget perfect,
which is why every automated instrument reports success.

## The rule

Any layout criterion in a plan must bound the measured quantity on **both** sides. "No horizontal
overflow" is half a test; pair it with a floor — a minimum rendered width for text blocks, a
minimum height for panels — expressed over the class of element, not over the sites known to be
broken today. Write the floor as a computed-style read in a real browser, never as a class-string
assertion, and state the threshold and the viewports in the task itself.

## How to verify

`getComputedStyle(el).width` in a Playwright test at the plan's own viewport list, over a selector
that matches every element of the class (for example: block elements holding more than 80
characters of text), asserting a minimum. The check earns its place only if it fails against the
build that shipped the defect — run it there first.
