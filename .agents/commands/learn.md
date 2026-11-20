---
description: Record, confirm, promote or retire a lesson in the squad memory.
argument-hint: <what went wrong, or the feedback given>
---

Compound engineering step — see `AGENTS.md` §6 and `.agents/memory/README.md`.

Input: **$ARGUMENTS**

## 1. Read the index first

```bash
node .agents/tools/lesson.mjs list
```

If an existing lesson already covers this, **do not write a new one** — confirm it:

```bash
node .agents/tools/lesson.mjs confirm <id>
```

A second lesson saying the same thing is how the index becomes unreadable. Confirming is also the only thing that ever promotes a lesson out of the index.

## 2. Otherwise write it

```bash
node .agents/tools/lesson.mjs new "the rule, imperative" --agent <agent> --domain <gate> --spec <NNNN|human-feedback>
```

`--agent` is the agent that will *apply* the rule next time — usually the one whose work was rejected, never the reviewer that caught it. `--domain` is the gate: `spec`, `law`, `design`, `copy`, `plan`, `build`, `qa`, `audit`, `ponytail`, `docs`, `release`, `preview`.

Then fill the four sections in the generated file — `## What happened`, `## Why it happened`, `## The rule`, `## How to verify`. The docs gate fails on an unfilled section and on a leftover template placeholder.

**Write the pattern, not the incident.** The test: could an agent that was not there apply this tomorrow, to a different feature? Blame is never the lesson — find the structural cause. "The developer picked a rounding direction" is blame; "the plan did not state the rounding direction, so it was decided at build time and the payroll drifted a centavo" is the cause, and it changes what the tech-lead writes next time.

Money and law lessons are the valuable ones. A lesson that keeps a bracket, a ceiling, or a rounding rule from drifting is worth more than ten about spacing.

## 3. Promote anything at three

`confirm` prints a reminder when a lesson reaches 3. That lesson is no longer a lesson, it is a rule:

1. Move the rule into `.agents/agents/<agent>.md`, or into `AGENTS.md` when it cuts across agents.
2. Archive it:
   ```bash
   node .agents/tools/lesson.mjs retire <id> "promoted"
   ```

## 4. Retire what is dead

A lesson contradicted by a later decision, or made obsolete by a refactor, goes to `archive/` with its reason. A stale rule is worse than no rule.

```bash
node .agents/tools/lesson.mjs retire <id> "<reason>"
```

## 5. At the cap

Thirty active lessons is a hard ceiling — `lesson.mjs new` refuses past it. At the cap, promote or retire before writing anything new. The pressure is the point.

## 6. Verify

```bash
node .agents/tools/docs-check.mjs
```

Report in two lines: what was written or confirmed, and what was promoted or retired.
