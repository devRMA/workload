---
id: 019
title: State a scope exclusion as the property it protects and name the later gates that may override it, never as an absolute, because a binding rule from a downstream gate turns an absolute into prose the spec's own criteria contradict
applies-to: product-manager
domain: spec
spec: 0005
created: 2026-09-15
confirmed: 0
---

## What happened

A defect-removal spec excluded visual change with an absolute: "this spec must move zero pixels
other than the four collapsed widths". Two gates later, the law gate produced a binding rule on
*rendered* legibility, and satisfying it required a flow-direction change on two rows at one
breakpoint. The acceptance criterion that verifies the exclusion already exempted that subtree, so
the build was never actually blocked — but the scope prose said one thing and the criterion said
another, and closing the gap cost a bounce back to G1.

## Why it happened

The exclusion was written at the first gate, before the gates that can impose a floor had run. An
absolute stated at G1 is a prediction about every gate downstream, and the spec author is the one
agent in the pipeline with the least information about what those gates will find.

## The rule

Write every scope exclusion as the **property it protects**, plus the **gates that may override
it**, never as an absolute count or an unqualified prohibition. "Zero pixels move" protects
falsifiability of a zero-diff claim; state that, note that a legal or accessibility floor overrides
it and that any such override is bounded and named in the criterion that verifies it. Then a
downstream agent who has to move a pixel has a route inside the spec instead of a contradiction.

Corollary: whenever an exclusion and the criterion that verifies it disagree, the exclusion is the
one that is out of date — fix the prose, and fix it in the spec, not in the plan.

## How to verify

Read each bullet of § Out of scope beside the acceptance criterion that checks it. Every exemption
the criterion carries must appear in the bullet, in the same words. A reader who holds "except X"
in their head after reading only the scope section means the amendment is not done.
