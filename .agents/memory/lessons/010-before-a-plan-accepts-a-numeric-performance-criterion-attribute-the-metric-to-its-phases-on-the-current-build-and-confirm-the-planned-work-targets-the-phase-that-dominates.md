---
id: 010
title: Before a plan accepts a numeric performance criterion, attribute the metric to its phases on the current build and confirm the planned work targets the phase that dominates
applies-to: tech-lead
domain: plan
spec: 0002
created: 2026-09-14
confirmed: 1
---

## What happened

A spec carried an LCP criterion of 2500 ms on mobile. The design gate named three causes and
ordered three fixes; the plan accepted all three, wrote them into one task, and wrote a stop
condition that read "median over 2500 ms -> the typeface is disqualified, swap to the
pre-analysed second choice". All three fixes landed and moved LCP down by 156-231 ms. The
median came in 31 ms over target, the stop condition fired, and the build stopped one order
away from swapping a typeface and re-tuning nine type roles.

The measurement had been in the tool's own report the whole time. LCP decomposes into four
phases; on this build they read TTFB 454, Load Delay 0, Load Time 0, Render Delay 2076. Two
of the three ordered fixes (a smaller webfont, two removed preconnects) target the network
phases, which carried **zero milliseconds**. The shipped font finished downloading at 65 ms,
2.4 s before the metric landed. The whole remaining cost was render delay from a value
computed on the client after hydration -- a cause the design gate had listed and then left
off its own "what may change" table. The plan had bought its lever analysis wholesale without
ever asking which phase each lever was denominated in.

## Why it happened

A performance criterion looks verified the moment a command and a threshold are attached to
it, and lesson 009 asks for exactly that -- so a plan can satisfy the letter of "pin it to a
command you ran" while never asking the prior question: does the work in this plan touch the
part of the number that is large? Aggregate metrics invite this. LCP, TTI and bundle size are
each sums, and a sum hides which term dominates. The fix list arrived from the design gate
already reasoned and already costed, and a plan that treats a costed list as settled inherits
its blind spots at full confidence.

The second half was a drafting shortcut. Two different rules -- "if the font makes the metric
worse, the font is disqualified" and "the metric must be under N" -- were collapsed into one
branch because in the plan's imagination they would fail together. They did not: the font
improved the metric and the page still missed the target, which is the one combination the
fused branch answers wrongly.

## The rule

**Before a plan accepts a numeric performance criterion, decompose the metric on the current
build, record the breakdown in `plan.md`, and state for each planned lever which term of that
breakdown it reduces and by how much you expect. A lever whose term measures near zero is not
a lever -- strike it from the plan or say in writing why you are keeping it.** The
decomposition is a baseline measurement like any other: it belongs in the same task that takes
the before-numbers, before any source file is edited.

**And keep a component verdict and a system verdict in separate branches.** "This change made
the metric worse" and "the metric is over target" are different findings with different owners
and different remedies. Write each as its own stop condition with its own destination, because
the case where one fires and the other does not is the case a fused branch gets backwards --
and it is not a rare case, it is what happens every time a real improvement lands short.

The corollary is about fallbacks. A fallback that an upstream gate pre-analysed answers *which
option if this component is the problem*. It never answers *is this component the problem*. A
written-down fallback is the path of least argument at a blocker, so require the attribution
before ordering it, every time.

## How to verify

In the task that takes the before-measurements, the plan names the decomposition command, and
the plan's lever table has a column for the term each lever reduces:

```
node -e 'const a=require("./.lighthouseci/<median-run>.json").audits;
  const el=a["largest-contentful-paint-element"].details.items;
  console.log(el[0].items[0].node.snippet);
  console.log(el[1].items.map(i=>i.phase+"="+Math.round(i.timing)).join(" "))'
```

Then read the plan's own lever table. If any row's predicted effect is written as a resource
size ("-38 kB") rather than as milliseconds off a named phase, that row has not been attributed
and the plan is not finished. And grep the plan's stop conditions: any one whose trigger names
a component ("the family", "the library") while its threshold names the page ("under 2500 ms")
is a fused branch -- split it.
