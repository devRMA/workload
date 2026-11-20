---
id: 038
title: When a rule's domain widens, re-execute every existing clause against the newly admitted members and confirm each clause is satisfiable without breaking another binding principle
applies-to: labor-law-analyst
domain: law
spec: 0008
created: 2026-09-15
confirmed: 0
---

## What happened

A four-clause legibility rule was written over an enumerated domain of four disclosure surfaces.
One clause required every surface to be "present in the server-rendered DOM (not injected on an
event)" — true of all four, checked, correct.

One spec later the same gate replaced the enumeration with a three-clause test, because an
enumerated domain is the set of surfaces in view rather than the set that carries an obligation.
The test admitted three more surfaces. The gate ran the test backwards to confirm it reproduced
every ruling already on the record, which it did, and stopped there.

Two specs later, a `curl` on the deployed bytes showed the three new members return **zero**
occurrences of their own text in the server-rendered HTML. The clause had been false for three
gates, on builds that passed this gate three times. Worse: the three new members are conditional on
data the product keeps on the device by principle, so the clause was not merely unmet, it was
**unsatisfiable without breaching that principle**. A developer sent to satisfy it literally had
two moves, and one of them was to upload the user's salary.

## Why it happened

Widening a domain feels like the safe direction. Nothing is removed, the old members keep passing,
the old rulings reproduce, and the verification the author does run — "does the new test return
everything the old list contained?" — is a check on **membership**, not on **clauses**. It answers
"did I lose anyone" and is silent on "does everything each clause says still hold for the ones I
gained".

The clause that breaks is predictably the one nobody re-reads: the clause that was trivially true
of every original member. It was true for a reason nobody wrote down — here, that the original four
happened to be unconditional page furniture — and the unwritten reason, not the clause, is what the
new members fail.

The second half is satisfiability. A compliance clause is written as a demand and read as a demand;
nobody asks whether the demand can be met at all. A rule that can only be met by violating another
binding principle does not announce itself. It sits there looking strict, and the first agent who
takes it seriously does the damage, in good faith, citing the rule.

## The rule

Widening a rule's domain is not a membership operation. It is a **re-execution**: for every clause
already in the rule, and every member the widened domain newly admits, run the clause and record
the result. Not the clauses this spec is touching — **all of them**, including the ones that have
never failed, especially the ones that have never failed.

Then, for each clause that fails against a new member, do not reach for the remedy first. Ask
whether the clause is **satisfiable** at all, by testing it against the product's other binding
principles — the privacy commitment, the offline commitment, the no-new-input commitment, whatever
they are. Three outcomes, and they route differently:

- **The clause holds and the member fails it.** A finding against the build. Route it.
- **The clause is unmet but meetable.** A finding, with the cost stated.
- **The clause is unmeetable without breaching another principle.** The **clause** is wrong.
  Correct it, and say what it was reaching for, because a clause that stood false for several gates
  was usually protecting something real in a form that could not express it. Replace it with a
  clause that expresses the substance and can be measured — never with silence, and never by
  narrowing the domain back to the members that happened to pass.

The third outcome inverts the project's default that the code is wrong when it disagrees with the
rule. That inversion is not the reviewing agent's to make quietly: state it, and hand it to the
human as an open question in the same artifact.

## How to verify

Two counts and one execution, and they cost minutes.

- **Before** the widened domain is written down: list the members it newly admits and the clauses
  already in force. The number of checks you owe is their product. Run all of them — against the
  artifact, with a command, not against your reading of the source. A cell you reasoned about is a
  cell you have not checked.
- For every clause that comes back green on every new member, name **why** it is green. If the
  answer is a property of the original members you are only now noticing, the clause is load-bearing
  on an assumption nobody wrote down, and that assumption belongs in the rule's text.
- For every clause, ask the satisfiability question explicitly and record the answer in one line,
  even when it is obviously yes. The unsatisfiable clause is never the one you suspect; it is the
  one that reads as uncontroversial.


## Retired

2026-09-16 — promovida — AGENTS.md §5 'How a rule's domain is defined', bullet 4 (alargar um domínio é reexecutar todas as cláusulas, mais a pergunta de satisfatibilidade)
