---
id: 060
title: Never call code pre-existing or dead from grep alone in a shared tree: check whether the file is untracked and whether a sibling spec created it minutes ago, because the git index is the only thing that tells the age of a symbol
applies-to: all
domain: plan
spec: 0003
created: 2026-09-19
confirmed: 0
---

## What happened

A task deleted three fields from a shared type. A type error pointed at one consumer, in an e2e
support module. `grep` for that consumer's exported function found only its own declaration, so it
was reported as dead code and the question routed upward was *keep it or delete it*. Both answers
were wrong. The file was **untracked**, created minutes earlier by a sibling spec building in the
same working tree, and by the time the question was asked its function had six call sites in a spec
file that had not existed when the grep ran. Worse, the same sibling's later task mandated a
component reading the very fields being deleted, and two pt-BR string literals beside them had gone
stale silently — invisible to the compiler that had raised the alarm in the first place.

## Why it happened

"Pre-existing" and "dead" are claims about **time**, and `grep` answers a question about **text**,
in one instant, over a tree that several agents are writing to concurrently. In a single-writer
repository the two coincide closely enough that the substitution is never punished. In a shared
tree they come apart within minutes, and they come apart in the most expensive direction: the code
that looks unused is the code that was just written.

The second half is worse than the first. The compiler finds the collisions that cross a type. It
finds none of the collisions that cross a **string** — a marker, a fixture, an expected label, a
selector built from copy — and those are exactly what a citation or copy spec rewrites. A clean
`typecheck` after a type-level fix reads as *resolved* and is not.

## The rule

Before writing "pre-existing", "dead code", "unused" or "stale" about anything, run
`git status --short -- <path>` and `git log -1 -- <path>`. **Untracked, or modified and unstaged, means
a sibling owns it and it is live until that sibling says otherwise.** Find the owning spec, read its
`plan.md`, and route the question there — never resolve it by deleting or by editing another spec's
file.

Then widen the search past the compiler: when a shape or a string changes, grep the whole tree for
**every literal that named the old state**, not only for the symbols that reference it. The type
error is the collision you get to see; the stale literal beside it is the one that ships.

The corollary for anyone planning a guard in a tree with concurrent specs: bind it to a **value**
imported from `lib/`, never to a sentence. Sentences are owned by other specs and change without
telling you.

## How to verify

Two commands, before the claim, not after: `git status --short -- <path>` (untracked or unstaged →
it is somebody's live work) and a re-run of the grep **at the moment you write the claim**, not the
one you ran earlier in the session. If the counts differ, the tree moved under you and your reading
of it is already stale.

The failure signal: a routing note whose premise is *this is old code nobody uses*, on a file whose
`git status` line begins with `??`.
