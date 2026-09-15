---
id: 024
title: Define a disclosure rule's domain by a test on what each string asserts, never by an enumerated list of surfaces, because the list is built from the defect in view and the next disclosure is written outside it
applies-to: labor-law-analyst
domain: law
spec: 0006
created: 2026-09-15
confirmed: 0
---

## What happened

A binding legibility rule was written with an exhaustive domain: four disclosure surfaces, named by
file and line, "exhaustively and by name, so that the rule is checkable rather than arguable". The
four were the ones a token collision happened to reach. One spec later, a different gate asked
whether five other rendered strings were in the domain, and the rule had nothing to say — the
enumeration was the definition, so anything outside it was outside the rule by construction.

Three of the five turned out to state rights the app's own computation does not produce, quoting the
articles that create them, at the exact moment the user's input triggers them. They had been
carrying a disclosure obligation the whole time, in a component the rule had never looked at, and
the only reason the question got asked at all was that an unrelated quality defect happened to
surface them.

## Why it happened

An enumerated domain feels like rigour. It is checkable, it cannot be argued with, and it closes the
loophole where someone claims a broken surface was never covered. So the author writes the list from
the surfaces in view — which are the surfaces the current defect reaches — and adds the ones that
pass today, feeling thorough for having included them.

But the list answers "which surfaces are broken now", and the rule needs to answer "which surfaces
carry an obligation". Those coincide exactly once, on the day the list is written. Every disclosure
added afterwards is written by someone who has no reason to open the rule, in a component the rule
does not name, and the rule stays green because the surface is not in it. The failure is silent and
it compounds: the longer the list stands, the more authoritative it looks, and the less likely
anyone is to ask whether it is complete.

## The rule

A disclosure rule states its domain as a **test applied to what a rendered string asserts**, and the
enumeration, if any, is an example of the test's output — never its definition.

The test is a short list of clauses, any one of which puts a string in the domain. Write them from
the obligations the product actually carries, not from the surfaces it currently has:

- **Cite** — the string states a number, rate, threshold, divisor or year, or attributes one to a
  norm.
- **Gap** — the string names a variable, a right or an amount the user's real situation includes and
  this app's computation does not produce.
- **Choice** — the string records, conditions or solicits a decision the app will store and act on.

Two sub-rules carry the weight:

- **Rule on the instance, never on the component.** Five call sites of one component can be five
  different answers, and usually are: validation text and a norm-quoting warning render through the
  same atom and belong on opposite sides of the line. A rule about a component is a rule that will
  be right about the wrong things.
- **State what the test deliberately excludes, and why.** Input validation, empty states and
  navigation are not disclosures. Naming them as out keeps the test falsifiable, keeps the veto
  narrow enough to be worth having, and lets an agent under schedule pressure tell a legally binding
  criterion from the product's own bar.

## How to verify

Before the rule leaves the gate, run the test over **every** rendered string the feature can
produce — found by a search over the components and over the modules the strings actually live in,
not over the call sites you were shown. Then run it backwards: apply the test to the surfaces the
previous enumeration named and confirm it reproduces every ruling already on the record. A test that
cannot reproduce the rulings it descends from is a new rule wearing an old name, and it has quietly
reopened everything the old one settled.

If the test returns a surface the enumeration lacks, the enumeration was never the domain — add the
surface, and delete the sentence claiming the list is exhaustive.
