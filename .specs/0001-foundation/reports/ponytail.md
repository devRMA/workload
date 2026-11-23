# Ponytail — 0001-foundation

**Verdict: n/a**

## Reason

`0001-foundation` has no diff. Its artifacts (`spec.md`, `legal.md`, `plan.md`) were written
*from* the shipped tree — the code came first, the spec documents it after the fact
(`STATUS.md`: "the code shipped before this spec was written"). An over-engineering review reads a
diff and asks whether the change that produced it earned its complexity; there is no change here
to hold to that question, only code that already exists and a set of documentation acceptance
criteria (AC1–AC12 etc. verify that the shipped tree matches `legal.md` and renders what the spec
describes — they are not build criteria a `frontend-dev` run satisfies). Running `ponytail-review`
against nothing produces nothing, and running `ponytail-audit` over the whole shipped tree would be
a different job, with a different scope, that nobody asked for — it would attach a repo-wide verdict
to a spec that changed no code, which is exactly the kind of unrequested scope this role is built to
refuse.

## What stands in for the gate

Nothing needs to. This spec carries no diff, so there is no over-engineering surface to check it
against. If a future spec wants a repo-wide complexity pass over the calculator as it exists today,
that is a new, explicitly-scoped audit for someone to commission — not a substitute for this gate,
and not mine to start unprompted.

## Scope

- Diff audited: none — `0001-foundation` produced no code change.
- Modules the diff touched: none.
