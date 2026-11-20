---
id: 025
title: Classify a surface by reading the module its strings come from, never by the component that renders them, because a component that renders a prop tells you nothing about what it asserts
applies-to: product-manager
domain: spec
spec: 0006
created: 2026-09-15
confirmed: 0
---

## What happened

A spec scoped five call sites of one banner component and, for each, wrote down what it carried. Two
of the five were described from the call site alone. One — a validation banner rendering
`issue.message` — was recorded as carrying legal content, on nothing stronger than the fact that it
sat on the same route as the compliance warnings and rendered through the same atom. The law gate
opened the module the strings actually come from and found all eight possible messages were
chronological form validation: *"A saída precisa vir depois da volta do almoço"*. No norm, no number,
no right.

The same spec had the mirror error in the other direction. A second surface was scoped correctly, but
for the wrong reason — it was listed as legal because it quotes articles, when what actually puts it
in the disclosure domain is one clause naming an amount owed to the user that the app does not
compute. Right surface, wrong reason, and a reason that would not have survived the strings being
reworded.

Neither error changed what got built. Both changed what every downstream gate believed it was
building, and correcting them cost a bounce.

## Why it happened

A call site is what a spec author is looking at. It has a title prop, a tone, a route, a component
name — everything except the sentence the user reads, which arrives at runtime from somewhere else.
So the author classifies the surface from its neighbourhood: what else is on this screen, what this
component is called, what the other call sites do. That inference is right often enough to feel
reliable and it is never evidence.

It is worst exactly where it matters most. A component built to render arbitrary text is the one
whose instances differ most from each other, and the ones carrying an obligation are the ones whose
text came from a module the author never opened.

## The rule

**Before a spec records what a surface carries, open the module its strings come from and read every
string it can render.** Not the call site, not the prop name, not the component. If the text arrives
as a prop, follow the prop to its source and enumerate the full set — eight validation messages, four
warning details, whatever the set is — and classify from that set.

Two clauses carry the weight:

- **Rule on the instance, never on the component.** Five call sites of one atom are five
  classifications, and usually not the same one. A sentence in a spec of the form "this component
  carries X" is a sentence about the wrong subject.
- **Write the reason, not the label.** "Legal content" is a label. "It states an amount owed to the
  user that this app does not compute" is a reason, and a later gate can check it against the string
  and tell you when it stops being true. A surface scoped with the right label and the wrong reason
  is a surface that will be rescoped the first time the text changes.

When the source cannot be reached — a string assembled at runtime, a module outside this spec's
reading — say so in the spec and name it as a question for the gate that can open it. An unverified
classification handed downstream as fact is worse than an open question, because nobody downstream
knows to check it.

## How to verify

For every surface in the spec's scope table, the spec names the **file and line range the strings
come from**, not only the component that renders them. Then, for each one: can a reader who opens
that range reproduce the classification from the strings alone, without knowing which route or
component it belongs to? If the classification only makes sense given the surface's neighbours, it
was inferred, not read.

And run it backwards: for each surface recorded as carrying nothing, name the strongest string in its
set and state why it still carries nothing. The surfaces that get misclassified are never the ones an
author paused over.


## Retired

2026-09-15 — merged into 024 — the same boundary from the spec side (classify by reading the module, write the reason not the label); 024 now carries both halves and applies to all
