---
id: 035
title: Re-measure every carried debt by the search that defines its boundary before handing it forward, never by the file and line that first reported it
applies-to: tech-lead
domain: plan
spec: 0002
created: 2026-09-15
confirmed: 0
---

## What happened

Closing `0002` at G10, four debts were carried out of its G6 and had sat unreviewed while four
later specs opened, ran and closed. Each was recorded the way its reviewer found it — as a file and
a line. Re-measuring all four by search instead of by coordinate, every one of them read differently
than the record:

- *"a pre-existing Tailwind class assertion at `__tests__/hero-panel.test.tsx:58`"*. Line 58 now
  holds an inline-style assertion. Read as recorded, the debt looks **fixed**. It is not: the
  offending assertion is untouched at **line 72** — the file grew fourteen lines above it. Worse,
  the boundary the rule actually governs (`AGENTS.md` §8: *never assert a Tailwind class string*)
  contains **nine assertions across eight files**, not one:
  `stat-box.test.tsx:31`, `day-summary.test.tsx:96`, `hero-panel.test.tsx:72`,
  `alert-banner.test.tsx:54`, `duration-field.test.tsx:60`, `regime-field.test.tsx:47`,
  `layout.test.tsx:21`, `modal-dialog.test.tsx:96` and `:97`. The one-line record hid eight
  siblings for four specs.
- One of those eight is worse than a class assertion: `day-summary.test.tsx:96` asserts
  `container.querySelector(".rounded-full.bg-neutral-100")` is `toBeNull()`, and
  `bg-neutral-100` no longer exists anywhere in `components/` or `app/` — the token migration
  removed it. The selector can never match, so the assertion passes **vacuously**, and would pass
  against any markup whatsoever. A green test asserting nothing is not a smaller defect than a
  red one; it is an invisible one.
- The two `qa`-owned halves of F6 and the `product-manager`-owned F5 were still open exactly as
  written — but that was established by re-running their searches, not by trusting the record,
  and two of the three would have read as plausibly-fixed from the surrounding prose alone.

## Why it happened

A reviewer reports what it found, and what it found has coordinates. That is correct for a
*finding* — the developer needs the line. It is wrong for a *debt*, because a debt outlives the
tree that produced it. Between the gate that recorded it and the close that hands it forward, every
unrelated edit above it moves the line, and every sibling instance written since is outside the
record entirely. The coordinate decays in two directions at once: it stops pointing at the defect,
and it never pointed at the defect's class.

`AGENTS.md` §5 already forbids exactly this shape for a *criterion*: state a prohibition as the
search over the whole boundary it names, never as a file and a line. The gap was that nobody had
applied it to carried debt, which is the same object one gate later — and carried debt is the more
dangerous case, because a criterion is checked at the next gate while a debt is checked only when
someone remembers it.

## The rule

At G10, and at every bounce triage that hands something forward:

1. **Re-run the search, do not read the record.** For each carried debt, derive the search from the
   rule it violates (`AGENTS.md` §8's prohibition, the spec's own guard, the norm in `legal.md`) and
   run it over the whole boundary that rule governs. The record is a hypothesis about the tree; the
   search is the tree.
2. **Restate the debt as that search plus its current count.** "Nine class-string assertions in
   eight files under `__tests__/`, found by the command recorded beside it" travels. "`hero-panel.test.tsx:58`" does
   not survive its first unrelated edit.
3. **Rule on the delta explicitly, in three buckets, and say which.** *Resolved* — mark it paid and
   paste the command that returns nothing, because a debt quietly resolved costs the next reader the
   same investigation. *Still open* — hand it forward with the owner and the trigger. *Wider than
   recorded* — say so, and say by how much, because a debt that grew while nobody looked is evidence
   that its trigger never fired.
4. **Check every "still passing" claim for vacuity.** An assertion whose selector, string or
   constant no longer exists in the source passes without testing anything. For each guard the debt
   names, ask what value it would report against the *broken* state; if the answer is "the same
   one", the guard is dead and is a new finding, not a closed one.
5. **A debt gets a trigger, never a date.** The trigger is an event in the work — the next spec that
   opens this file, moves this component, or touches this table — because a date passes on its own
   and an event brings the owner with it.

## How to verify

Before writing any carried debt into a G10 close:

- Every debt line in the close contains a **command**, and you ran it in this session. If a debt
  cites a line number and no command, it is not re-measured.
- The count in the close is the count the command printed, not the count the old record claimed.
  Where they differ, the difference is written down as its own sentence.
- For each guard named as "correct today but unguarded" or "still passing": name the input that
  would make it fail. If you cannot, mark it dead and route it as a finding.
- Cross-check against `AGENTS.md` §5: could this debt be satisfied by editing one line while the
  class of defect survives? Then it is scoped wrong, and you scope it to the boundary before it is
  handed to anyone.


## Retired

2026-09-15 — promovida — AGENTS.md §5 'How a claim about the tree is measured', bullets 2, 3 e 5 (remedir débito por busca, checar guarda vazia, gatilho em vez de data)
