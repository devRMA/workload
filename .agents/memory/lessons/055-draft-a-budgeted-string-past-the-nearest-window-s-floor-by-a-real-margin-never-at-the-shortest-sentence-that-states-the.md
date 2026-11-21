---
id: 055
title: Draft a budgeted string past the nearest window's floor by a real margin, never at the shortest sentence that states the required content, because minimal correct content clusters in the gap between disjoint LR2b windows
applies-to: content-writer
domain: copy
spec: 0003
created: 2026-09-19
confirmed: 0
---

## What happened

`design.md` §7 gave a new disclosure caption a budget of `[40,50] ∪ [80,100] ∪ [120,150] ∪ [160,200]`
characters — the windows LR2b's `≥ 40 cpl` floor allows at that slot's `C = 50.00` — and had already
measured that a 112-character probe in the exact same slot fails at 37.33 cpl, because 112 falls in
the gap between `[80,100]` and `[120,150]`. Writing the string that discharges the disclosure's two
required facts with no filler, five drafts were produced in sequence — 102, 109, 111, 112 and 117
characters — and every one of them landed inside that same forbidden gap. Only the sixth draft, which
added the one optional clause the ruling permitted, reached 136 characters and cleared into
`[120,150]`.

## Why it happened

The instinct when a sentence's content is fixed and non-negotiable is to write it as tightly as
grammar allows — cut the filler, use the shortest correct connector, stop as soon as both required
facts are stated. That instinct optimizes for the wrong quantity. The budget is not "as few characters
as possible under a ceiling"; it is membership in one of several disjoint windows, and the windows are
narrow relative to the gaps between them. A sentence assembled by minimizing length lands, by
construction, near the boundary a probe already failed at — the shortest sufficient sentence and the
already-measured failing length are drawn from the same distribution of "the minimal way to say this
in Portuguese," so they cluster together.

## The rule

Before finalizing a budgeted string, compute its length and check which of the budget's disjoint
windows it falls in — not only whether it is under the ceiling. If it lands in a gap, do not trim
further looking for daylight on the near side; that side is where every other minimal phrasing also
lands. Move to the next window up: add a clause the content already licenses (an optional fact the
legal or product source permits, a fuller connector, the citation in full) until the length clears the
window's floor by a margin at least as large as the gap just crossed — landing at the window's edge
again is landing back in the failure zone with different digits. State in `copy.md`, per string, which
window it lands in and by how many characters it clears both that window's floor and the nearest gap
below it, so a reviewer can see the margin without re-measuring.

## How to verify

Take every rejected draft that was shorter than the shipped string and check its length against the
budget's windows: if more than one of them independently lands in the same gap, that is confirmation
the gap is a real attractor for minimal phrasing, not a coincidence of one draft. The shipped string's
distance from both edges of its own window should be stated and should not be small enough that a
one-word edit — the kind a later gate might request — could push it back out.
