---
id: 059
title: When a task's test needs a rule that already exists as a named constant in the tree, name the constant; a plan that paraphrases the rule in prose ships two versions of it and the narrower one wins at the keyboard
applies-to: tech-lead
domain: plan
spec: 0003
created: 2026-09-19
confirmed: 0
---

## What happened

A plan mandated a host allow-list in one task as a named fourteen-entry constant, then, three tasks
later, restated the same rule in a second task's prose as a one-line suffix test. The two disagreed:
the suffix admitted four fewer official hosts than the constant, and it rejected hosts an upstream
gate had already accepted by name. The developer implementing the second task hit the contradiction
at the keyboard, resolved it toward the constant, and flagged it. That resolution was right — but it
was a decision the plan left open, and the next developer could as easily have coded the prose.

## Why it happened

Prose is the cheapest place to write a rule and the most expensive place to keep it true. When a
plan spells out a rule in words, it forks it: one copy lives in the tree as executable code, the
other in the task, and nothing compares them. The paraphrase is always the narrower of the two,
because it is written from the one example in view — the case the author happened to be thinking
about — and the rule's real domain is wider than that example. A plan with two versions of one rule
has not specified the rule; it has specified a coin flip, and the coin is flipped by whoever is
least equipped to call it.

## The rule

If the rule a task's test needs already exists in the tree as a named constant, a shared type or a
helper, **name it by path and symbol and require the task to import it**. Never restate its content
in the task's prose, not even "for readability", not even as a gloss beside the reference. Where no
such constant exists yet, make **one task create it** and have every later task point at it — one
definition, N references.

The corollary is for the reference itself: cite the constant **and** the binding source it
implements (`legal.md` §N, `design.md` §N), so a reader can tell that the constant is the rule
rather than one reading of it. A reference to a constant with no source is a second paraphrase with
extra steps.

## How to verify

Before closing G4, grep your own `plan.md` for every rule you stated in words — a threshold, an
allow-list, a set of permitted values, a regex, a tolerance — and for each one ask: *does this
already exist in the tree, or in an earlier task of this same plan?* If it does and your prose is
not a reference to it, you have forked a rule. Replace the prose with the symbol.

The failure signal: a developer resolves a contradiction between a task's words and a constant's
contents, and is right. That is not a developer being helpful — it is a decision the plan left open,
and the gates downstream check the work against the plan, so the narrower reading would have passed
every one of them.
