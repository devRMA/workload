---
id: 030
title: After extracting a helper into a shared module, grep for every inline copy of its body and replace each with a call before the task is done
applies-to: frontend-dev
domain: build
spec: 0006
created: 2026-09-15
confirmed: 0
---

## What happened

Spec 0006's T2 wrote a four-line C5 drive (`check("MANUAL")`, fill `Hora para Saída Real`, `blur()`)
as a locally-scoped `driveC5` function in `tests/e2e/alert-legibility.spec.ts`. Eleven lines below it,
the same task re-typed the identical four lines inline as an anonymous arrow passed to `driveUntil`,
instead of calling `driveC5`. T2 also added a third, byte-identical inline copy in the sibling file
`tests/e2e/wide-viewport.spec.ts`, which imports from the very module (`tests/e2e/support/legibility.ts`)
that already held the shared home for cross-file e2e steps (`driveUntil` itself). `qa-engineer` and
`refactor-scout` caught the same triplication independently at G6, and it cost the build gate a bounce.

## Why it happened

The helper was named and written, but the task never re-checked its own diff for other places the
same literal steps were needed — the second call site was eleven lines below the definition in the
same file, and the third was in a file already importing from the helper's own module. Writing a
named function once is not the same discipline as calling it everywhere its body would otherwise be
retyped; the two were treated as separate concerns instead of one task.

## The rule

The moment a helper is extracted or named inside a task's diff, grep the whole diff — the file it
lives in and every sibling file the task also touches — for the literal steps or strings that helper
now encapsulates, before marking the task done. Every match that is not the helper's own definition
must become a call to it, not a second (or third) copy of its body. This holds whether the duplicate
is eleven lines below the definition in the same file or in a different file that already imports
from the same shared module — proximity to the definition is not the test; the test is whether the
same literal steps appear anywhere else in scope.

## How to verify

Before calling a task done that introduces or moves a named helper, run
`grep -rn "<a literal string unique to the helper's body>" <every file the task's diff touches>` and
confirm the only match is inside the helper's own definition. Any second match is the defect this
lesson exists to catch, not a "three similar lines" case — the abstraction already exists and is
being skipped, not invented.
