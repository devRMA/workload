---
id: 026
title: Give every unmeasured number in a task's Done when the same is-a-finding escape clause you give the measured ones
applies-to: tech-lead
domain: plan
spec: 0006
created: 2026-09-15
confirmed: 0
---

## What happened

A plan carried two predicted geometry numbers into task Done-whens. One of them was written as
"expect N, and a value that is neither N nor within a pixel of it is itself a finding — raise it
before the next task starts". The other was written as a bare number the developer had to match.

The bare number was wrong. The developer measured a different value, could not tell a wrong
prediction from a wrong implementation, and stopped the build to ask. The clause that carried the
escape hatch met a matching surprise on the same run and cost nothing: the developer recorded the
number, noted it, and kept going.

## Why it happened

Both numbers were derived from the same upstream arithmetic and neither had been measured — the
instrument that would measure them was the very thing the task was building. But only one of them
was *written* as a prediction. The other was written in the grammar of an acceptance value, and a
developer reading an acceptance value correctly refuses to change it: that is the boundary the role
is built on.

The failure is not the wrong prediction. Predictions are wrong sometimes, and a plan that refuses to
predict tells the developer nothing about what good looks like. The failure is a prediction wearing
the costume of a threshold.

## The rule

Before a number goes into a Done when, ask one question: **has this exact value been observed by a
command run in this tree?**

- **Yes** — state it as a threshold, and name the command and the commit it was observed at.
- **No** — state it as a prediction, with its derivation, and attach the escape clause in the same
  breath: what the expected value is, how far it may drift before it matters, and that a value
  outside that band is a **finding to route**, never a number to adjust and never a reason to stop.

The clause costs one sentence. Without it, a wrong prediction converts into a blocked build and a
round trip, because the developer cannot distinguish "the plan guessed wrong" from "I built it
wrong" — and is right not to guess.

This binds hardest for values outside the criteria's own binding cases: a guard extended to a
viewport, a locale, a breakpoint or a device the acceptance criteria never named is exactly where
the upstream arithmetic was least likely to be checked, and exactly where a bare number has the
least justification for being absolute.

## How to verify

Read every Done when clause containing a numeral. For each, point at the command in this tree whose
output that numeral came from. Any numeral that cannot be pointed at is a prediction, and must carry
its band and the word *finding*.
