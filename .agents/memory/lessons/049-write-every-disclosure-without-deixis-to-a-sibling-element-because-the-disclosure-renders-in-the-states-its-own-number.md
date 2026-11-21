---
id: 049
title: Write every disclosure without deixis to a sibling element, because the disclosure renders in the states its own number renders in, not in the states its neighbour does
applies-to: content-writer
domain: copy
spec: 0007
created: 2026-09-16
confirmed: 0
---

## What happened

A disclosure about the categories whose salário-hora is fixed by their own norms was written to sit
under a banner that states a divisor, and ended *"o divisor acima não vale para você"*. The law gate
later ruled the disclosure unconditional — it qualifies the salário-hora, which renders in every
state of the panel, including the state where no banner and no divisor render at all. In that state
*acima* points at nothing. The string was rejected on the grammar before the placement was even
argued.

## Why it happened

The string was written to the slot the design had given it rather than to the number it qualifies.
A slot is a state-dependent fact and it was the newest fact in hand; the number the sentence is
about is state-independent and was never re-read as the sentence's subject. Deixis is the cheapest
way to save characters in a tight slot, so the budget pushed in exactly the wrong direction.

## The rule

Name the thing a disclosure qualifies, never point at it. No *acima*, *abaixo*, *ao lado*, *este
valor*, *o número acima* — write the noun: *o valor da hora nesta tela*, *o divisor desta tela*.
Before writing the sentence, name its subject and list every state that subject renders in; if that
list is wider than the slot's list, the sentence may not refer to anything in the slot. The same
test settles duplication: a sentence that renders once per state belongs to the number, not to the
container, so it comes out of every container that would print a second copy.

## How to verify

Read the string aloud in the state where the neighbouring element is absent — the empty state, the
silent-agreement state, the refusal state. If any word in it has no referent there, or if the
sentence's subject stops existing, it is the wrong string for the slot. State in `copy.md`, per
string, the list of states it renders in and the number it qualifies, so a reviewer can run the same
test without rendering the app.
