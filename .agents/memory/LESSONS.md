# Lessons — index

Read before deciding. One line per active lesson; open the file for the full rule.

`Applies to` is the agent that will apply the rule next time — the one whose work was rejected, never the reviewer that caught it. `Confirmed` counts how many times the lesson prevented a repeat. At **3**, promote it into that agent's definition in `.agents/agents/` (or into `AGENTS.md` when it cuts across agents) and archive it.

Rows are generated. Write one with `lesson.mjs new`, bump one with `lesson.mjs confirm <id>`, remove one with `lesson.mjs retire <id> "<reason>"` — never edit the table by hand, because every command rewrites it from the lesson files and a hand-written row is erased without warning.

A row earns its place by being a rule an agent who was not there could apply tomorrow, to a different feature. Incidents, blame, and one-off notes belong in the spec's `STATUS.md` decisions log, not here.

| # | Lesson | Applies to | Spec | Confirmed |
|---|---|---|---|---|
| — | _no lessons yet — the squad has not run_ | — | — | — |

---

**Active: 0 / 30.** At the cap, promote or retire before writing a new one.
