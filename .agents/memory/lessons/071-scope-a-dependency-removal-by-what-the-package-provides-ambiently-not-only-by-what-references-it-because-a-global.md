---
id: 071
title: Scope a dependency removal by what the package provides ambiently, not only by what references it, because a global augmentation has no importers and no symbol search can see its consumers
applies-to: tech-lead
domain: plan
spec: 0014
created: 2026-09-19
confirmed: 0
---

## What happened

A plan scoped the removal of a dependency from a search for what named it — the import specifier,
the exported symbols, the environment flag. The search was thorough, it was pasted into the spec as
evidence, and it returned a file union the whole pipeline then treated as the boundary. The package
also shipped a `declare global` that widened a platform interface. Deleting the single importer
removed that augmentation from the program, and three files that had been silently consuming it
stopped compiling. **None of them referenced the package in any way**, so no search in the spec, the
plan or the developer's own re-run could have listed them. The task that carried the removal had a
`Done when` requiring a clean build, and its own file list could not produce one.

## Why it happened

A reference search answers *who calls this*. Removal asks the different question *what stops being
true*, and the two have the same answer only for things that must be imported to be used. Ambient
declarations, global type augmentations, side-effecting module initialisation, polyfills, registered
plugins and CSS a package injects are all **consumed without being named**, so their consumers are
invisible to grep by construction — not because the search was careless, but because there is no
token in those files to match. The compiler, the bundler and the runtime are the only instruments
that can see the edge.

## The rule

Before a plan scopes a dependency removal, list what the package **provides** as well as what
references it: open its `package.json` `exports`, `types`, `sideEffects` and any `postinstall`, and
grep its own shipped `.d.ts` for `declare global` and `declare module`. Each one is a consumer set
no reference search will return.

Then do not trust the list: **delete the last importer in an isolated copy and run the toolchain —
compiler, bundler, test suite — before the task is written.** Every file that breaks is a file the
task's `Done when` depends on, so it goes into the task's file list, and if it sits outside the
spec's declared boundary the boundary grows **by name**, recorded, never absorbed by the developer
at the keyboard.

Write the whole-program commands into the plan with the reading they get, too: `tsc --noEmit` and a
bundler compile every file their config reaches, including a sibling spec's untracked work-in-progress
in a shared directory, so "it is clean" is never on its own a property of *this* change. Say which
rows this spec owns, and make ownership a lookup rather than a judgement.

## How to verify

In a copy: remove the dependency's last import, run the compiler and the bundler, and paste the
failing rows into the plan as the task's known-bad. The task is finished when every path in those
rows appears in a file list. If the answer is "no rows", say which command produced it and what it
would have printed had there been one — a removal that unmasks nothing and a removal nobody
compiled read identically.
