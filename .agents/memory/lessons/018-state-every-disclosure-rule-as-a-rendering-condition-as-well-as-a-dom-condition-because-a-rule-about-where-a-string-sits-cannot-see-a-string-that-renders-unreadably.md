---
id: 018
title: State every disclosure rule as a rendering condition as well as a DOM condition, because a rule about where a string sits cannot see a string that renders unreadably
applies-to: labor-law-analyst
domain: law
spec: 0005
created: 2026-09-14
confirmed: 0
---

## What happened

A binding rule froze a mandatory disclaimer by naming what it must say and where it must sit: four
disclosures, one paragraph, in the page footer, no interaction required to reveal any of them, and
explicitly not in a modal, an accordion or a `title`. One spec later the same paragraph rendered as
a 64-pixel column — one or two words per line — and the rule passed. Every clause it contained was
satisfied. The string was in the footer, it was in one paragraph, nothing was hidden behind a
control, no verb had been weakened. The disclosure was simply not readable, and a rendered-width
condition was outside the rule's vocabulary.

## Why it happened

A disclosure rule gets written against the failure its author can picture, and what an analyst
pictures is someone *moving* or *softening* the text — hiding it in an accordion, dropping the
sharpest clause, turning "não substituem" into "podem não substituir". Those are all conditions on
the DOM and on the wording, so the rule becomes a set of conditions on the DOM and the wording. The
rendered result is left to layout, which nobody in the law gate believes is theirs.

It is worse than an accordion and it reads as compliant, which is the trap: an accordion at least
ships a control announcing that something is there to open. A collapsed column ships nothing, and
every automated instrument agrees it is fine — the text is in the DOM, the accessibility tree is
complete, contrast passes, a screen reader reads the whole thing. The obligation is discharged for
one modality and silently dropped for the one the promise was written for.

## The rule

Every disclosure rule carries a **rendering condition** alongside its content and position
conditions, and the rendering condition is stated as a measurement with a floor, a viewport list and
a theme list — not as an adjective. "Visible", "legible", "prominent" and "ostensivo" are verdicts,
not criteria; write the quantity a reviewer reads off a real browser and the number it must clear.

Two sub-rules carry the weight:

- **Bound the measurement below, over the class of surface, not over the surface that broke.** Name
  every disclosure the product makes, including the ones rendering correctly today, and apply the
  floor to all of them. A floor written only over the broken one ships the rule with an exception.
- **Measure the text as text, not only the box.** A width floor alone passes an element that is wide
  while its content is clipped, scaled or broken one word per line. Pair it with a measure floor —
  characters per rendered line box — which is the quantity that actually decides whether prose is
  read, and which no layout change can satisfy by accident.

And separate the two kinds of surface: an illegible *informational* disclosure leaves the user
uninformed, but an illegible *consent* surface produces a stored record of a choice the user could
not make. The second needs its own, higher floor and a clause on every control that expresses the
choice.

## How to verify

Take each disclosure rule already in force and ask what a hostile layout could do to the string
while satisfying every clause: collapse its container, clip it, scale it to 2px, break it one word
per line, push it below a 1700px scroll. If any of those passes, the rendering condition is missing,
and what it must assert is whatever your attack exploited. Then read the floor off the unfixed build
in a real browser at every viewport and theme in the list, and require the assertion to be seen red
there before it is trusted anywhere.
