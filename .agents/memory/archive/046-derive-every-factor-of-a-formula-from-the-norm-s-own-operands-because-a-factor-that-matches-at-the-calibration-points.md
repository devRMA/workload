---
id: 046
title: Derive every factor of a formula from the norm's own operands, because a factor that matches at the calibration points can still encode a false mechanism
applies-to: labor-law-analyst
domain: law
spec: 0007
created: 2026-09-16
confirmed: 1
---

## What happened

A gate ruled that a code constant had a norm behind it, and gave the derivation: `dias de trabalho
por mes = 5 dias x 5 semanas = 25`. The **number** was right and matched the article. The
**mechanism** was invented — a month has no five weeks. The correct derivation of the same 25 is
`dias por semana x (30 / 6)`, where 30 is the paid month the article itself fixes and 6 is the days a
week leaves available after the mandatory weekly rest. Both derivations print 25 for a five-day week,
so nothing downstream caught it; they diverge everywhere else, and the next gate was about to build a
user-facing input whose meaning came from the false one. The same run also carried a second value
with no fetched source, hedged as *"the settled practice"*, which a later run had to withdraw.

## Why it happened

Verification was aimed at the value. The value was checked against the norm, matched, and the
sentence explaining *how* it followed from the norm was written from intuition in the same breath — a
plausible arithmetic that happened to land on the checked number. A factor is not falsifiable by the
output it produces at the point where the code was calibrated: two different mechanisms agree there
by construction, which is why that point was chosen.

## The rule

**Every factor, divisor and multiplier in a formula you certify is itself a quantity with a norm, an
operand and a unit — name all three before you write the formula down.** Write the derivation as a
product of quantities the norm fixes, each with its own citation, never as a number that "comes out
right". Then move at least one operand and confirm the two candidate derivations disagree — if you
cannot construct an input where they disagree, you have not identified the mechanism, only a
coincidence. A hedge (*"settled practice"*, *"usually"*, *"in general"*) around a number with no
fetched source is the same defect wearing a qualifier: withdraw it or source it.

## How to verify

For each constant in the rule you are about to certify, write one line:
`value = operand_a (norm, article) OP operand_b (norm, article)`. Any line whose right-hand side
contains a number without a citation is a false mechanism until proven otherwise. Then enumerate two
inputs — one at the code's calibration point, one away from it — and print both derivations.
Identical outputs at the away point mean the derivations are the same rule; different outputs mean
you have just found which one the norm enacts, and that is the finding.


## Retired

2026-09-19 — promoted — .agents/agents/labor-law-analyst.md, 'What a verdict is measured against', second form: a formula is verified on its mechanism, never on its value
