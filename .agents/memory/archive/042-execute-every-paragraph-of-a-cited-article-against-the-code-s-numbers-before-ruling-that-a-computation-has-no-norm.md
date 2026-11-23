---
id: 042
title: Execute every paragraph of a cited article against the code's numbers before ruling that a computation has no norm
applies-to: labor-law-analyst
domain: law
spec: 0007
created: 2026-09-16
confirmed: 0
---

## What happened

A gate ruled that a shipped computation — `divisor = jornada diária × 25` — had **no norm at all**,
and wrote its repair instructions on that basis. The article the same ruling quoted verbatim, one
section earlier, contained the rule: the **caput** gives one multiplier and the **parágrafo único**
gives another (`o de dias de trabalho por mês`), and the code was executing the second one. Five
workdays × five weeks *is* `dias de trabalho por mês = 25`. The verdict — reject — was right; its
stated reason was wrong, and so was everything that followed from it: "these constants have no
source", "no norm enacts this formula", and the direction the repair was pointed in.

## Why it happened

The caput answered the question that was asked. Once an article's opening sentence yields a formula
that contradicts the code, the reading stops — the contradiction feels like the finding. The
parágrafo único was quoted for completeness and never executed against the numbers, so it sat in the
report as evidence *for* a conclusion it refuted. The same shape recurs with a `§` that carves out a
category, with a "salvo" clause, and with the parágrafo that turns a general rule into an option the
implementation happens to have taken.

## The rule

**Never write "no norm supports this" until you have executed every paragraph of every article you
cite, against the actual numbers, one at a time.** An article is not a sentence: the caput, each
parágrafo, each inciso and each alínea is a separate operative rule, and a computation that
contradicts the caput may be exactly what a parágrafo enacts. Quoting a paragraph is not executing
it — run the code's arithmetic through each one and record the number each produces.

Where more than one operative unit yields a defensible number for the same input, **that ambiguity
is the finding**. Say which readings exist, which one the code took, and which operand it assumed on
the user's behalf. It is sharper and more actionable than "no norm", because it names the missing
input instead of condemning the arithmetic — and it usually converts a "retire the claim" verdict
into a "collect one more field" one.

When a later run corrects an earlier verdict's reason, **amend the report at the gate that found the
error and mark the correction inline**. A downstream agent reconciling a report's prose against its
own worked measurements is an agent doing the gate's job.

## How to verify

For every article cited in a `legal.md`: count its operative units (caput + parágrafos + incisos +
alíneas) and confirm the file shows the code's inputs run through each unit that could apply, with
the number each produces. A rule asserted as **unsupported** must name the units it checked. If any
operative unit appears only as a quotation, with no number beside it, the ruling is not finished.


## Retired

2026-09-16 — promovida — .agents/agents/labor-law-analyst.md §Exhaust before you rule, bullet 1 (executar cada unidade operativa do artigo citado contra os números do código)
