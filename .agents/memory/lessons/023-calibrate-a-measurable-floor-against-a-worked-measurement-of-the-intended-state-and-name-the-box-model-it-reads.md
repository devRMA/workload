---
id: 023
title: Calibrate a measurable floor against a worked measurement of the intended state, and name the box model it reads
applies-to: labor-law-analyst
domain: law
spec: 0005
created: 2026-09-15
confirmed: 0
---

## What happened

At 0005 G2 I turned "the disclosure must be legible" into four measurable rules. LR4 clause 1 said
the consent dialog must render at "≥ min(480, viewport − 32) CSS px, measured as the **content-box
width** of the dialog element", and in the same sentence said "`max-w-lg` = 32rem = 512px is the
intended value and satisfies this".

Those two halves disagree. 512px is the border box. The content box of the same element is 446px,
because the dialog carries 33px of horizontal padding a side. Under the prose the shipped dialog
**fails** the floor at 1440 by 34px; under the worked example it passes with 32px to spare. The
implementation had to pick one, could not, and the question came back to me at G6 as a routed
blocker (B2) — costing the tech-lead a ruling, the developer a flagged assertion, and me a gate.

The surface was legible either way. The argument was entirely about a sentence I wrote.

## Why it happened

I set the threshold from typographic reasoning ("a labelled toggle row needs about 480px") and then
reached for a box-model word to make the rule sound checkable — without ever measuring the element
in the state I was describing as correct. Had I read 512 and 446 off a real dialog before writing
the clause, I would have seen immediately that the two numbers in my own sentence were measuring
different things.

The deeper cause: LR1, written twenty lines earlier in the same file, reads
`getBoundingClientRect().width`. LR4 silently introduced a second quantity for the same kind of
check. A rule set with two box models and no statement of which applies where does not have a
threshold — it has a topic for a meeting.

## The rule

When you write a numeric floor into a `legal.md`:

1. **Name the quantity exactly** — the element, the property, and the box model
   (`getBoundingClientRect().width`, not "width"; "border box", not "the width of the dialog"). A
   geometric floor without a box model is prose.
2. **Use one quantity across the whole rule set.** If LR1 reads the bounding rect, every sibling
   rule reads the bounding rect, unless a rule states in its own text why it differs and what it
   buys.
3. **Calibrate the threshold against a worked measurement of the state you consider correct**,
   taken before the number is written down — not against the state you consider broken, and not
   against arithmetic on a token value. Write that measurement into the rule as its worked example.
4. **If the prose and the worked example ever disagree, the worked example wins** — it is the
   number you actually checked. Then correct the prose at the gate that found it, in your own
   report, rather than asking the implementation to absorb the ambiguity.
5. **State which clause carries the substance.** A coarse floor is a tripwire; the clause that
   actually protects the user (here: every choice control fully rendered with its label) should say
   so, so that a borderline reading of the tripwire never decides the verdict on its own.

This generalises past pixels. It is the same defect as an order-of-operations rule that names a
rate but not the base it applies to: the table can be right to the centavo and the number still
comes out wrong, because the quantity was never pinned.

## How to verify

Before a `legal.md` leaves G2, for every numeric threshold in it:

- Grep your own file for the threshold and read the sentence containing it. Does it name an element,
  a property and a box model? If a second analyst could implement it two ways, it is not written.
- Does the file contain a worked measurement of the intended state next to the threshold, and does
  that measurement satisfy the threshold under the reading the prose states — not under some other
  reading? Compute it, do not eyeball it.
- Do all sibling rules read the same quantity? List them and compare.

At G6, the check that catches a miss: read the implementation's assertion and ask which number it
would report for the *correct* state. If that number is not the one your worked example names, one
of the two is wrong, and it is probably yours.
