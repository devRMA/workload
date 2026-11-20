---
id: 022
title: Cross the guard/payload boundary before either side is binding — run mandated verbatim text through every guard that reads its destination, and run every guard you rule over a file against the texts already mandated for it
applies-to: all
domain: design
spec: 0005
created: 2026-09-15
confirmed: 2
---

## What happened

`design.md` §6.1 mandated a replacement paragraph for `DESIGN.md`, marked "substitute, do not
compose, paraphrase, shorten or improve". Two sentences of that paragraph named the very tokens the
spec was deleting, in past tense, to explain why they had been dangerous. The same spec had also
specified a unit test forbidding any literal of that token pattern anywhere in `DESIGN.md`. Both
artefacts were correct in isolation and written at different gates; substituting one into the file
the other watched produced the single failing test in the tree, discovered by the developer at the
substitution site — three gates downstream of the author, in a task whose whole instruction was to
not exercise judgement.

The same collision has a second author. The gate that *ruled* the guard ("reject this pattern
anywhere in the file") had the mandated paragraph in front of it when it ruled, and did not run one
against the other either. Both sides of the boundary were written by agents who could have caught it
in seconds, and neither looked across.

## Why it happened

A spec's prose is read by humans and checked by nobody. The file it dictates text *into* is checked
by a machine. I wrote both sides of that boundary in one document and never crossed it: the guard
was specified in one subsection as a rule about `DESIGN.md`, the replacement text in another
subsection as a quotation, and the quotation's destination is `DESIGN.md`. Nothing in the writing
process put the two in the same buffer. Worse, the instruction "substitute, do not compose" — which
exists precisely to stop the developer from improvising — removed the only reader downstream who
might have caught the collision in time to route it cheaply.

## The rule

Mandated verbatim text is not prose, it is a payload with a destination. Before a spec commits to a
verbatim block, identify every automated check that reads the destination file — including checks
this same spec is creating — and execute them against the block. If the block fails one, the block
yields: a prohibition guard over a document is answerable by rewording the document, and a document
has no business naming a thing the spec just deleted. Never resolve it by carving an exception into
the guard; an exception phrased over intent ("an illustrative mention, not a declaration") is
adjudicated by whoever writes the next paragraph, which is the failure mode the guard existed to
end. The same applies to any spec that both dictates content and specifies the check that content
must survive — the author is the last reader who can see both.

The rule is symmetric, and whichever side you are writing, you owe the crossing:

- **You mandate text into a file** → list every automated check that reads that file, including the
  ones this same spec is creating, and execute them against the block.
- **You rule a guard over a file** → run the guard's literal pattern against every text this spec
  already mandates for that file, before the ruling is written. If a mandated text trips it, settle
  it by rewording the mandated text into a form the pattern is blind to and routing that rewording
  to the agent whose file it is — never by narrowing the guard, and only narrow it if no compliant
  wording exists, by stating the property that separates compliant from violating text, never by
  excluding a section or a line range. Check first whether the mandated artifact already expresses
  the same idea in a pattern-clean form somewhere else; it usually does, and that form is the
  substitute text, written by the author who already wrote it once.

## How to verify

For each verbatim block a spec mandates: name the destination file, list the checks that read it,
and paste the block through each check's actual expression — the regex, the schema, the linter —
not a reading of it. A one-line `node -e` over the extracted block is enough and takes seconds.
Record the result next to the block ("returns `[]` under case 4's regex"), so a later reader knows
it was run rather than reasoned about. A verbatim block with no recorded check result is
unverified, whatever its prose quality.

At the gate that rules a guard, the same test runs the other way: paste the mandated text into the
guard's regex and run it. Zero matches, or the ruling carries a routed rewording with the substitute
text spelled out and verified against the same regex. A ruling that has not been executed against
the text it governs is a hypothesis about a string.

Absorbed lesson 021 (`tech-lead`/`plan`, 0005), which stated the same boundary from the guard's
side; the archive keeps its text.
