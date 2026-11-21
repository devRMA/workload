---
id: 045
title: When a spec's domain test covers only strings, add a clause for the operands those strings describe, because a claim about the user's contract can live in a constant that renders nothing
applies-to: product-manager
domain: spec
spec: 0007
created: 2026-09-16
confirmed: 1
---

## What happened

A spec was opened to repair a citation: a user-visible sentence named a norm for a rule that norm
does not state. The scope was written as a **two-clause test on what each string asserts** — clause
A, a named attribution; clause B, the same normative claim with no norm named — deliberately
stated as a test rather than a list, and the test was correct. Run against the tree it returned
twenty-two rows across eighteen files, including three the defect report had never named.

The law gate then rendered the screen instead of reading it, over the whole range of journeys a
user can type, and the **numbers** were wrong: the sentence was not over-citing a correct rule, it
was citing the wrong norm for an arithmetic built on a premise nobody had supplied. The premise was
two module-level constants — how many days a week the user works, how many weeks are paid — neither
of which renders a string, neither of which names a norm, and neither of which any clause of the
domain test could see. The spec's own scope table listed them, but as *"the constants the rule is
made of"*, following the string, rather than as the thing asserting the claim.

Both bounces of a two-bounce ceiling were spent before the operand was named as the defect.

## Why it happened

A disclosure defect presents as a sentence, so the domain gets written in the vocabulary of
sentences. That vocabulary is the right one for deciding *which surfaces carry an obligation*, and
it is exactly the wrong one for deciding *what produced the number the surface shows*. A constant
asserts to nobody: it has no reader, no rendering, no norm name, so every test built on "what does
this string say" classifies it as infrastructure and moves on.

The framing then hardens. Once the spec's first sentence says *provenance, not calculation*, every
downstream agent is told, in the document that outranks their judgment, that the numbers are
settled — and the constants become the least-read lines in the scope.

## The rule

**A domain test written over strings needs a third clause over operands, and the operand clause is
the one that finds wrong numbers.**

Whenever a spec's domain is a test on what strings assert, add: *any constant the code uses as a
fact about **this user's** situation — their contract, their schedule, their category, their
household — whether or not a string ever renders it.* Write the clause into the spec's domain
section, not into a note, because the enumeration that follows is the clause's output.

Two consequences for the scope that follows:

- **A constant admitted by the operand clause is a legal dependency, not a `lib/` detail.** It gets
  a row in § Legal dependencies and it passes the law gate before anything is drawn.
- **Search for the operand's siblings, not only its call site.** The same asserted fact is usually
  hard-coded in more than one place, in more than one value: the spec above found the identical
  five-day constant pricing a second user-visible figure, and a *sixth*-day count asserted by a
  different module for a different number on the same product.

Corollary, and it is the cheap half: **before a spec's framing sentence declares that no number
moves, execute the function that produces the number over the inputs a user can reach.** That claim
is a legal claim, it costs one render to test, and every gate after G1 inherits it.

## How to verify

Take the spec's § Scope. For every number the feature shows, name the expression that computes it
and list its operands. Each operand is one of three things, out loud: **collected** from the user,
**derived** from something collected, or **asserted** by the code. Every asserted operand must
appear either in the domain test's output or in § Out of scope with the property its exclusion
protects — and if it stands for a fact about the user, it must also have a row in § Legal
dependencies. An asserted operand that appears in none of the three is the defect the spec is about
to ship.
