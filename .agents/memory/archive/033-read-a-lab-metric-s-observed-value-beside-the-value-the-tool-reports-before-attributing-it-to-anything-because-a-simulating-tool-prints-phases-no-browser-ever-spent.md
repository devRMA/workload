---
id: 033
title: Read a lab metric's observed value beside the value the tool reports, before attributing it to anything, because a simulating tool prints phases no browser ever spent
applies-to: tech-lead
domain: plan
spec: 0004
created: 2026-09-15
confirmed: 0
---

## What happened

A spec was opened because a page's Largest Contentful Paint measured 5.7-6.5 s on three deployed
artifacts while a real browser painted the same element at 448 ms. The reports carried a phase
breakdown -- `TTFB 643 / Load Delay 0 / Load Time 0 / Render Delay 5127` -- and three gates in a row
built on it: the brief named the render delay as the unexplained term, the spec put "diagnose the
gap between FCP and LCP" in scope, and the design gate froze eight invariants against a remedy for
it. A previous lesson had already made "attribute the metric to its phases before accepting a lever"
binding on the plan, and every agent had done exactly that.

The phase table was not a measurement. The tool was running with `throttlingMethod: simulate`: it
records a trace with no network throttling, then models what the metric *would* be over a slow link.
The same report object carried the recorded values a few keys away, under
`audits.metrics.details.items[0].observedFirstContentfulPaint` and
`observedLargestContentfulPaint`. Read there, the two were **the same instant** in twelve of twelve
stored runs, across four builds spanning forty-five commits. There was no FCP-to-LCP gap at all --
the page produced one paint, of everything at once, and the element in question was simply the
largest thing in it. `Render Delay 5127 ms` was a modelled term and not time any browser spent.

The defect was real and the budget really was failing, but the mechanism was the reverse of the one
everyone had: because the single paint landed after the last byte, the simulator's dependency graph
for the metric contained the entire page, so the modelled metric equalled the modelled
time-to-interactive. Every lever the spec had nominated -- script bootup, main-thread work, unused
JavaScript -- was denominated in a phase whose *measured* total was 372 ms, with no task over
100 ms, and the held paint reproduced with CPU throttling switched off entirely.

## Why it happened

A lab tool prints modelled and measured numbers in the same report, in the same units, with no
visual distinction, and the modelled ones are the ones it scores. An attribution built only from the
scored numbers is an attribution of the model, and it will name whatever the model's graph is
dominated by -- which is often the thing a plan can least change. The earlier lesson asked for the
phases and got them; it did not ask whether the tool had watched them happen.

The tell was present the whole time and cost nothing to read: a metric that equals another metric
**to the millisecond**, run after run, is almost never two things that happened at the same instant.
It is one computation reported twice.

## The rule

**Before attributing a lab metric to any phase, cause or lever, print the tool's own observed value
beside the value it reports, and say in the plan which of the two every subsequent number is.**

- If the tool has a simulate/model mode, name it explicitly in the plan (`throttlingMethod`,
  `preset`, or the equivalent) and treat every derived breakdown it prints as model output until the
  recorded trace confirms it.
- **Two metrics equal to the millisecond, repeatedly, are one computation, not a coincidence.** Find
  the shared input before explaining the number.
- A phase whose *measured* total is small cannot be the cause of a large metric, whatever the model
  attributes to it. Check the measured total first and disqualify the levers denominated in it,
  in writing, so a later gate does not re-open them off the same report.
- The counterfactual belongs in the same session: block one candidate input at the network layer and
  re-measure. One blocked file is cheaper than one deployed remedy, and it tells you whether a lever
  moves the metric **and** whether it moves the criterion, which are not the same question.

## How to verify

In the plan's attribution section, every metric row carries both numbers and the run that produced
them; no criterion, lever or task is justified by a modelled number alone; and at least one
counterfactual run is recorded for the lever the plan actually selects. A reviewer checks it by
asking, of any number in the plan: did a browser measure this, or did a tool compute it? If the
document cannot answer for a row, that row is not an attribution.


## Retired

2026-09-16 — promovida — AGENTS.md §5 'How an instrument's reading is trusted', bullets 1 e 4 (valor observado ao lado do reportado; duas métricas iguais ao milissegundo são uma só computação)
