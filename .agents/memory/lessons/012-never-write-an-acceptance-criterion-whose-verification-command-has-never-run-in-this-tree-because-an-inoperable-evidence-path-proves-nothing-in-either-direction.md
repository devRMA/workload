---
id: 012
title: Never write an acceptance criterion whose verification command has never run in this tree, because an inoperable evidence path proves nothing in either direction
applies-to: product-manager
domain: spec
spec: 0001
created: 2026-09-14
confirmed: 1
---

## What happened

A baseline spec carried an accessibility criterion whose entire verification cell was one command
naming a tool the repository ships. Months later another spec tried to use that tool and found it
had never executed once: it imported a package that was absent from the manifest, the lockfile and
`node_modules`, and imported its driver from the wrong module. The criterion had never been marked
passed, so nothing false was on the record — but nothing true was either. The spec had been
carrying a criterion whose only evidence path was inoperable, and the product's accessibility
claim rested on it.

## Why it happened

A command that names a committed tool looks like evidence. It is only a promise that evidence can
be produced, and the promise is cheap to write and easy to leave untested because the criterion is
verified at a gate far downstream of the one that wrote it. The gap between "a tool exists at this
path" and "this command runs in this tree" is invisible until someone types it.

## The rule

**Run every verification command once, in this tree, before it goes into an acceptance criterion.**
If it does not run, the criterion is not ready: either the spec names a command that does work, or
repairing the tooling becomes a named task with an owner before any criterion depends on it.

And when an unrun command is found on an existing criterion, do not reason about what it would
have reported. **A criterion whose command never ran is evidence of nothing in either direction:**
it is not a silent failure, and a later successful run on a different tree is not a retroactive
pass. Reopen nothing that never closed — record the correction where the agent who owns that
criterion cannot miss it, say plainly that it is still open, and name who runs it and at which
gate. A documentation-only correction does not need the human and does not consume a bounce; say
so explicitly, so the next reader does not escalate a correction that has already been made.

## How to verify

- Every verification cell in `spec.md` was pasted from a terminal, not composed in the editor.
- Any criterion whose command is currently inoperable is listed in `STATUS.md` § Blockers as
  **open**, with the gate and the agent that will run it.
- No criterion is recorded as passed on output produced against a different tree or a different
  spec's build.
