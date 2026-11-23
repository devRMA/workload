---
id: 039
title: Evaluate a cited rule across its whole input domain, rendered, before classifying the defect as provenance
applies-to: labor-law-analyst
domain: law
spec: 0007
created: 2026-09-15
confirmed: 0
---

## What happened

A law gate found a norm cited for more than its text covers and classified it as a provenance
defect: the numbers were right, the attribution over-reached. The finding was carried, with an
owner and a trigger, through four gates and two specs, and a whole spec was eventually written on
that classification — its premise, its acceptance criteria and its risk profile all resting on
"nothing here is expected to move a number".

The first time anyone fed the rule inputs other than the two it had been built against, it returned
a wrong number on three of five, contradicted two norms in force, and on one input argued the user
into a salário-hora 27% below what they were owed. The citation had never been the defect. It was
the visible end of a rule that was only ever correct where it had been calibrated.

## Why it happened

A rule is written against the case its author had in mind and checked against the case the reviewer
has in mind, and those are usually the same one or two. Agreement at the calibration points is
guaranteed by construction, not by correctness, and a plausible-looking citation attached to the
output makes the agreement look derived rather than fitted.

The classification then locks the investigation. Once a finding is labelled "provenance", every
later reader — including the gate that wrote the label — inspects strings, because that is what the
label says the defect is made of. Four gates read the same comment and none of them ran the
function underneath it with a different argument.

## The rule

Before classifying any defect in a cited rule as provenance, **evaluate the rule over its whole
input domain and read the result the way the user reads it — rendered.** Enumerate the inputs a
real user actually has, not the inputs the rule was written for: for a labour computation, the
distinct contractual arrangements in force, one input per arrangement, including the ones that are
legally special-cased. Compute the norm's own answer independently for each, and put the two
columns side by side.

Three consequences, and they are the whole rule:

- **A rule that is right at its calibration points and cited wrongly is, until measured, a rule of
  unknown correctness everywhere else.** "The numbers are correct" is a claim about a domain, and a
  claim about a domain cannot be verified at two points.
- **Search the corpus for the rule the code implements, not only for the norm the code names.** The
  norms that contradict a general formula are rarely near the norm that was mis-cited; they sit
  under the categories the formula forgot.
- **Take the reading from the rendered surface, in the state that produces it.** A wrong decimal
  separator, an inverted comparison, or a sentence whose rationale contradicts its own number are
  invisible in the expression and obvious in the string the user sees.

Where the measurement contradicts the classification, the classification loses, and the finding is
re-routed with its new severity **before** any scope is written on the old one.

## How to verify

The analysis names the input domain it swept, one row per arrangement, each with the rendered
output verbatim beside the norm's own answer. A ruling that quotes the norm's text but shows no
sweep has checked the citation and not the rule. If a downstream spec's premise is "no number
moves", that premise is the sweep's conclusion or it is not written.


## Retired

2026-09-16 — promovida — .agents/agents/labor-law-analyst.md §Exhaust before you rule, bullet 2 (varrer todo o domínio de entrada da regra, renderizado)
