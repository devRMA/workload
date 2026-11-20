---
id: 024
title: Define a disclosure rule's domain by a test on what each string asserts, and classify each surface by reading the module its strings come from — never by an enumerated list of surfaces, and never by the component that renders them
applies-to: all
domain: law
spec: 0006
created: 2026-09-15
confirmed: 0
---

## What happened

Two halves of one failure, found at the same gate, one cycle apart.

**The domain.** A binding legibility rule was written with an exhaustive domain: four disclosure
surfaces, named by file and line, "exhaustively and by name, so that the rule is checkable rather
than arguable". The four were the ones a token collision happened to reach. One spec later, a
different gate asked whether five other rendered strings were in the domain, and the rule had
nothing to say — the enumeration was the definition, so anything outside it was outside the rule by
construction. Three of the five turned out to state rights the app's own computation does not
produce, quoting the articles that create them, at the exact moment the user's input triggers them.
They had been carrying a disclosure obligation the whole time, in a component the rule had never
looked at, and the only reason the question got asked at all was that an unrelated quality defect
happened to surface them.

**The classification.** The spec that reopened the question then scoped five call sites of one
banner component and, for each, wrote down what it carried. Two of the five were described from the
call site alone. One — a validation banner rendering `issue.message` — was recorded as carrying
legal content, on nothing stronger than the fact that it sat on the same route as the compliance
warnings and rendered through the same atom. The law gate opened the module the strings actually
come from and found all eight possible messages were chronological form validation: *"A saída
precisa vir depois da volta do almoço"*. No norm, no number, no right. The same spec had the mirror
error in the other direction: a surface scoped correctly but for the wrong reason — listed as legal
because it quotes articles, when what actually puts it in the domain is one clause naming an amount
owed to the user that the app does not compute. Right surface, wrong reason, and a reason that would
not have survived the strings being reworded.

Neither error changed what got built. Both changed what every downstream gate believed it was
building, and correcting them cost a bounce.

## Why it happened

An enumerated domain feels like rigour. It is checkable, it cannot be argued with, and it closes the
loophole where someone claims a broken surface was never covered. So the author writes the list from
the surfaces in view — which are the surfaces the current defect reaches — and adds the ones that
pass today, feeling thorough for having included them. But the list answers "which surfaces are
broken now", and the rule needs to answer "which surfaces carry an obligation". Those coincide
exactly once, on the day the list is written. Every disclosure added afterwards is written by
someone who has no reason to open the rule, in a component the rule does not name, and the rule
stays green because the surface is not in it. The failure is silent and it compounds: the longer the
list stands, the more authoritative it looks, and the less likely anyone is to ask whether it is
complete.

The classification half has the same shape one level down. A call site is what a spec author is
looking at. It has a title prop, a tone, a route, a component name — everything except the sentence
the user reads, which arrives at runtime from somewhere else. So the author classifies the surface
from its neighbourhood: what else is on this screen, what this component is called, what the other
call sites do. That inference is right often enough to feel reliable and it is never evidence. It is
worst exactly where it matters most: a component built to render arbitrary text is the one whose
instances differ most from each other, and the ones carrying an obligation are the ones whose text
came from a module the author never opened.

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

Four sub-rules carry the weight:

- **Rule on the instance, never on the component.** Five call sites of one component can be five
  different answers, and usually are: validation text and a norm-quoting warning render through the
  same atom and belong on opposite sides of the line. A rule about a component is a rule that will
  be right about the wrong things.
- **Read the module the strings come from.** Before anything — a spec, a legal rule, a report —
  records what a surface carries, open the module its strings come from and read **every** string it
  can render. Not the call site, not the prop name, not the component. If the text arrives as a prop,
  follow the prop to its source and enumerate the full set — eight validation messages, four warning
  details, whatever the set is — and classify from that set.
- **Write the reason, not the label.** "Legal content" is a label. "It states an amount owed to the
  user that this app does not compute" is a reason, and a later gate can check it against the string
  and tell you when it stops being true. A surface scoped with the right label and the wrong reason
  is a surface that will be rescoped the first time the text changes.
- **State what the test deliberately excludes, and why.** Input validation, empty states and
  navigation are not disclosures. Naming them as out keeps the test falsifiable, keeps the veto
  narrow enough to be worth having, and lets an agent under schedule pressure tell a legally binding
  criterion from the product's own bar.

When the source cannot be reached — a string assembled at runtime, a module outside this spec's
reading — say so and name it as a question for the gate that can open it. An unverified
classification handed downstream as fact is worse than an open question, because nobody downstream
knows to check it.

## How to verify

Before the rule leaves the gate, run the test over **every** rendered string the feature can
produce — found by a search over the components and over the modules the strings actually live in,
not over the call sites you were shown. Then run it backwards: apply the test to the surfaces the
previous enumeration named and confirm it reproduces every ruling already on the record. A test that
cannot reproduce the rulings it descends from is a new rule wearing an old name, and it has quietly
reopened everything the old one settled. If the test returns a surface the enumeration lacks, the
enumeration was never the domain — add the surface, and delete the sentence claiming the list is
exhaustive.

For the classification, two checks on the same table. For every surface in scope, the document names
the **file and line range the strings come from**, not only the component that renders them; then,
for each one, can a reader who opens that range reproduce the classification from the strings alone,
without knowing which route or component it belongs to? If the classification only makes sense given
the surface's neighbours, it was inferred, not read. And run it backwards here too: for each surface
recorded as carrying nothing, name the strongest string in its set and state why it still carries
nothing. The surfaces that get misclassified are never the ones an author paused over.
