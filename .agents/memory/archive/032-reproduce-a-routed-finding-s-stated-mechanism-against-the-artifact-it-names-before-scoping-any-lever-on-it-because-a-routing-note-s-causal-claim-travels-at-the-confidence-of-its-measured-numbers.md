---
id: 032
title: Reproduce a routed finding's stated mechanism against the artifact it names before scoping any lever on it, because a routing note's causal claim travels at the confidence of its measured numbers
applies-to: all
domain: spec
spec: 0004
created: 2026-09-15
confirmed: 3
---

## What happened

A gate measured a performance miss on four deployed hosts, ruled it out of its own spec, and routed
it to the spec that owned the metric. The routing note was excellent where it was measured: twelve
Lighthouse runs, a control build, phase attribution, a real-browser probe, and an acceptance
criterion derived from the one invariant that did not move with the runner. Between those measured
facts it also stated a **cause**, in a single sentence, naming a hook and a component: the element
"ships with no server-rendered text and cannot become an LCP candidate before hydration".

The next gate re-ran the search before freezing scope, and fetched the deployed HTML. The element
shipped its final text in the server response on both routes. The hook named gated three other
surfaces, all of them `aria-hidden` and none of them the element that had been measured. The same
fetch showed that the reference host in the routing note was serving a build forty-five commits
behind, still carrying a defect an earlier spec had already fixed — so the numbers attributed to
"production" described an artifact nobody in the pipeline had built.

Every measured number in the note was correct. The causal sentence between them was not, and it was
the only part a downstream spec would have turned into a lever.

## Why it happened

A routing note is read as one artifact with one confidence level. Its measured rows carry commands,
hosts, run counts and timestamps; its causal sentence carries none, and nothing in the document's
shape distinguishes them. The mechanism is also the part that reads as insight — it is what makes a
hand-off feel finished rather than merely observed — so it is the sentence most likely to be quoted
verbatim into the next spec's scope, and the least likely to be re-derived.

The second half is the reference artifact. "Production" reads as the authoritative build by name
alone. Nobody checks which commit a domain is serving, because a domain is not a commit and asking
feels like a category error — right up until the deployment pipeline has not run for a month.

## The rule

**Before scoping any lever on a finding routed from another gate, reproduce the finding's stated
mechanism against the artifact it names, with a command of your own, and record what you got.** A
routed note's numbers and its explanation of those numbers are separate claims at separate
confidences. Carry the numbers forward; earn the explanation again.

Two obligations follow:

1. **Verify the artifact, not its name.** Before any host is used as a control, a baseline or a
   reference, establish which commit it serves — by a marker in its own bytes, not by its URL. A
   host whose build predates the diff under discussion is *context*, and it is excluded from every
   pass/fail arithmetic that would compare it to something it is not.
2. **When the mechanism does not reproduce, say so in the artifact and leave the cause open.** Do
   not substitute your own guess in the same sentence, because the replacement inherits the same
   unmarked confidence and the next gate will quote it too. Name the diagnosis as a deliverable of
   the gate that owns causes, and write acceptance criteria that stay falsifiable whatever the cause
   turns out to be — a phase identity, a same-session differential, an unchanged-output guard.

This is not distrust of the routing gate. The gate that routes is measuring a *symptom* on its way
past; the gate that receives is the first one whose job is the *cause*, and it is the only one that
will pay for getting it wrong.

## How to verify

- For every finding a spec inherits from another gate, § Evidence has a row whose command was run in
  **this** session, against the named artifact, reproducing or refuting the stated mechanism.
- Every host named as a control or a baseline has a row establishing the build it serves — a commit
  count, a dependency marker, a distinguishing string in its own response.
- Where a mechanism failed to reproduce, the spec says which claim failed and against what output,
  and its § Scope names the diagnosis as a deliverable rather than asserting a replacement cause.
- No acceptance criterion in the receiving spec is phrased so that it becomes unverifiable if the
  stated cause turns out to be wrong.


## Retired

2026-09-19 — promoted into AGENTS.md §5, 'How a finding routed from another gate is inherited'
