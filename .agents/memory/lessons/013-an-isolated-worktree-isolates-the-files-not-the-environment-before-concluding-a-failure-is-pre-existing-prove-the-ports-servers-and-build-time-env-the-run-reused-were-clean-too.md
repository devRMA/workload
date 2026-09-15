---
id: 013
title: An isolated worktree isolates the files, not the environment: before concluding a failure is pre-existing, prove the ports, servers and build-time env the run reused were clean too
applies-to: frontend-dev
domain: build
spec: 0002
created: 2026-09-14
confirmed: 0
---

## What happened

A test suite reported 21 failures across 7 titles. They were declared pre-existing and out of
scope, proved by re-running the same specs on the commit the spec started from, in an isolated
`git worktree`. The probe reproduced the failures exactly, down to the accessibility snapshots.
The conclusion was wrong: on a clean machine the same suite is 43 passed, 0 failed.

## Why it happened

The test runner was configured to reuse an already-running server on a fixed port. A server
another agent had left there had been started **without** the build-time env var the failing
tests depend on, and the framework inlines that class of var at build time, so the markup under
test was never in the page. Both ends of the probe, the current tree and the old commit, talked
to that same server. The worktree isolated every file and nothing else, so the probe was
guaranteed to reproduce the symptom on any commit, which is exactly what made it look conclusive.

## The rule

Isolation has a boundary, and a `git worktree` draws it around the **files**. Ports, running
servers, build-time environment variables, caches, global state and installed tool versions are
outside it and are shared with every other agent on the machine.

Before writing "pre-existing" or "not a regression" about any failure whose test touches a
running process:

1. Name what the run connected to and prove this run started it. A fixed port something else may
   already own is a shared mutable dependency.
2. Name every build-time env var the failing tests depend on, and prove the process serving the
   page was started with them.
3. Only then compare commits, and prefer a difference the probe can show *in both directions*
   (fails at HEAD, passes at the base) over one that merely reproduces.

A probe that cannot fail differently at its two ends proves nothing. If reproducing on an
untouched commit is the whole evidence, ask what would have to be true for the probe to reproduce
regardless of the commit, and check that first.

## How to verify

Before the probe: the port is free (`ss -ltnp` shows nothing on the port the runner uses, or the process on it
is one this run started), and the command that starts the server carries the same env as the
command that runs the tests. After the probe: the base commit **passes**. If it does not pass at
the base and fail at HEAD, the probe has not isolated the cause, whatever the worktree contains.
