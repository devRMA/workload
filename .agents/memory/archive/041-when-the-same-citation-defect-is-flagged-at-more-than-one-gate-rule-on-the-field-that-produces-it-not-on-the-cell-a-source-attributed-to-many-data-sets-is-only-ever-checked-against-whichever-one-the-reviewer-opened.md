---
id: 041
title: When the same citation defect is flagged at more than one gate, rule on the field that produces it, not on the cell: a source attributed to many data sets is only ever checked against whichever one the reviewer opened
applies-to: labor-law-analyst
domain: law
spec: 0003
created: 2026-09-15
confirmed: 0
---

## What happened

One `source`/`sourceUrl` pair in a year-indexed legal record stood behind nine distinct legal data
sets. Across three separate gates the reviewer checked that pair against the one data set it happened
to be reading — the INSS table — found the *norm* right and only the *host* wrong, and raised the
host each time. The field was correct for one of nine attributions and wrong for eight, including one
that credited a constitutional rule to a ministerial act. Three gates saw the symptom; none saw that
the field was shared.

## Why it happened

A shared attribution field is checked the way it is read: one data set at a time. Each check
confirms "the norm named here sets the thing I am looking at right now", which is a true statement
about one row and says nothing about the other eight. The check passes on the sample the reviewer
drew, so the review reports the only defect visible from that sample — the URL — and the structural
defect survives every gate it passes through, wearing the repaired finding as evidence it was looked
at.

The recurrence is the signal, and it was available the first time. A finding that comes back
unchanged is rarely a finding nobody got around to fixing; it is usually a finding whose report
described a cell when the defect lives in the shape.

## The rule

**When a citation or attribution defect is raised at more than one gate, stop ruling on the cell and
rule on the field that produces it.** Before writing the finding a second time, count how many
distinct values the field is attributed to. If it is more than one, the finding is the sharing, and
each value gets its own attribution — **even where two genuinely share a norm**, because explicit
repetition is what makes the next reviewer check all of them instead of the one they opened.

Two corollaries, both of which fall out of the same count and are the part that is easy to miss:

- **One value may need more than one source.** A table whose rates come from one norm and whose
  money boundaries come from another has two, and a single field cannot hold that.
- **Each attribution carries its own effective date.** A record labelled with one year routinely
  holds values that took force in three different years, and a shared date is the same defect in the
  time dimension.

State the count in the report. "One field, N data sets, M distinct norms" is the finding; the broken
link is one of its symptoms.

## How to verify

Before signing any attribution field, enumerate every value it is attributed to, name the norm each
one actually needs, and count the distinct norms. If the count of attribution fields is lower than
the count of distinct norms, the field is shared and the gate does not pass on it. Re-run the count
at the review gate against the constant, never against a test — a test written from the same shared
field reproduces the sharing.


## Retired

2026-09-19 — promoted — .agents/agents/labor-law-analyst.md, 'What a verdict is measured against', first form: a citation is verified on the field, never on the cell
