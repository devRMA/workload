---
id: 014
title: Before ordering more runs of an instrument, check that the criterion's threshold is not a sample-size-dependent statistic, because a range or a max moves the bar when n grows and the extra evidence then argues against itself
applies-to: tech-lead
domain: plan
spec: 0002
created: 2026-09-14
confirmed: 1
---

## What happened

A numeric acceptance criterion required that a measured improvement exceed the **spread
(max − min)** of the post-change run set, written that way precisely so the criterion could never
be decided inside the instrument's noise. Judging it on a 3-run set felt thin, so a 9-run set was
ordered to make the evidence stronger. The 9-run set passed every other clause more convincingly
and **failed the spread clause by 6.97 ms**, because the range of nine draws is wider than the
range of three from the same distribution. More evidence, same instrument, same change, and the
criterion moved against it.

## Why it happened

The criterion's threshold was a **statistic of the sample, not of the instrument**. Range (and
max, and min) grow with n by construction: their expectation is a function of sample size. A
criterion built on one is comparable only at a fixed n, so ordering more runs silently raises its
own bar.

## The rule

When a criterion compares a measured quantity against a dispersion threshold, check which side of
the comparison depends on n **before** ordering more runs:

- **Never use range, max or min as a noise threshold** unless n is fixed in the criterion's own
  verification command. Prefer standard deviation or IQR, which estimate the instrument rather
  than the sample size.
- Better still where it applies, state the claim as a **sign test over the runs** — "no individual
  run is above the baseline median" — which gets *stronger* as n grows (2⁻ⁿ under a null of no
  change) and is exactly the property you wanted more evidence for.
- If you order a larger run set against an existing criterion, say in the order whether the
  criterion is re-verified against it or whether it is supplementary evidence. Two run sets and no
  stated relationship is a later argument about which one counts.

More data must be able to make a criterion easier to satisfy, or harder for reasons about the
thing being measured. If it moves the bar for reasons about the sample, the criterion is
mis-specified, not the measurement.

## How to verify

Read the criterion's threshold and ask: if I doubled n with no change to the code, would this
number move? If yes, either fix n in the verification command or replace the statistic. Both run
sets' full numbers go in the evidence file, with one line naming which one verifies the criterion
and why.
