---
id: 021
title: Before ruling a prohibition guard over a whole file, run the guard's own pattern against every text the spec already mandates for that file
applies-to: tech-lead
domain: plan
spec: 0005
created: 2026-09-15
confirmed: 0
---

## What happened

A gate ruled that a test must reject a retired token pattern "anywhere in the file", over a
documentation file. A prior gate had already written, in its own artifact, the exact verbatim
paragraph that same file was required to receive — and that mandated paragraph used the retired
pattern twice, to explain why it was retired.

Both instructions were correct and binding, and satisfying either broke the other. The developer
executed both faithfully, produced one failing test, and stopped. The collision was visible at
ruling time: the mandated text already existed, and the pattern was already written.

## Why it happened

A prohibition is ruled by thinking about the *violations* it must catch, never about the *compliant*
text that must live inside its boundary. When the boundary is a document, the document's duty to
explain the prohibition is exactly the text most likely to contain it — the collision is not an edge
case, it is the first case.

## The rule

When a guard's boundary is a whole file, run the guard's literal pattern against every text this
spec already mandates for that file **before** the ruling is written. If a mandated text trips it,
the ruling is not finished, and it is settled in one of two directions — never by inventing an
exception on the spot:

1. **Reword the mandated text into a form the pattern is blind to** (a generic `--spacing-*`,
   a placeholder, a description), and route that rewording to the agent whose file it is. Prefer
   this: it keeps the guard blunt, and a blunt guard has no carve-out to hide behind.
2. Narrow the guard — only when no compliant wording exists, and only by stating the property that
   distinguishes compliant from violating text, never by excluding a section or a line range.

Before choosing, check whether the mandated artifact already expresses the same idea in a
pattern-clean form somewhere else. It usually does, and that form is the substitute text, written by
the author who already wrote it once.

## How to verify

At the gate that rules the guard: paste the mandated text into the guard's regex and run it. Zero
matches, or the ruling carries a routed rewording with the substitute text spelled out and verified
against the same regex. A ruling that has not been executed against the text it governs is a
hypothesis about a string.
