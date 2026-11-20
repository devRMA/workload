---
description: Show where every spec is, which agent holds it, and what the squad has learned.
---

Give the human a complete picture in one pass. Run:

```bash
node .agents/tools/spec.mjs status
node .agents/tools/lesson.mjs list
node .agents/tools/docs-check.mjs
```

`spec.mjs status` prints one line per spec — folder, state, next agent — and the open gates under it. `lesson.mjs list` prints every active lesson with its agent, domain and confirmation count. `docs-check.mjs` exits non-zero on any structural failure.

Then read `.specs/INDEX.md`, and the `STATUS.md` of anything not `done` — its bounce counts, its blockers, its decisions log.

Report, compactly:

- **In flight** — each spec, which gate holds it, which agent is next, and any bounce count at 2, one away from the ceiling.
- **Blocked on the human** — what is waiting, and precisely what decision is needed. A legal imprecision waiting for acceptance goes first; it blocks everything downstream.
- **Law** — any spec whose `legal.md` is still `pending` while design or build has already started. That is an ordering violation, not a delay.
- **Memory** — how many active lessons out of thirty, and anything at `confirmed: 3` due for promotion.
- **Docs** — any integrity failure from `docs-check.mjs`, stated plainly. It blocks the next commit.

No preamble. If everything is clean and nothing is in flight, say so in one line.
