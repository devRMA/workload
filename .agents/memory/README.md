# Squad memory — compound engineering

The squad is not supposed to be as good on its tenth feature as on its first. It gets better because it writes down what went wrong and reads it before deciding again.

Two rules carry the whole system:

1. **Every agent reads `LESSONS.md` before it decides anything.** One line per lesson, cheap to scan. Open the full file for anything tagged with your agent or your domain.
2. **Every rejection and every human correction produces a lesson.** A gate that bounced, a piece of feedback, a defect that reached the Vercel preview — if it cost a round trip, it gets written down. A cost paid twice is a system that does not learn.

## Layout

```
.agents/memory/
├── README.md        this file
├── LESSONS.md       the index — one line per active lesson. Read this first, always.
├── lessons/NNN-slug.md
└── archive/         promoted or retired lessons, kept for history, never read at runtime
```

`lesson.mjs` owns the index. Never hand-edit the table in `LESSONS.md` — every command rewrites it from the lesson files, and a hand-written row is silently erased.

## Read before you decide

Before choosing an approach, scan the index for anything touching the same gate, the same module, or the same kind of decision. This is not optional context; it is the record of what this squad already got wrong, and re-deriving a decision the memory already settled wastes the cost that bought the lesson.

If a lesson applies and you are deliberately doing the opposite, record why in the spec's `STATUS.md` decisions log. Disagreement is allowed; silence is not.

## Write after you fail

A lesson gets written whenever:

- a gate rejects — **the agent whose work was rejected writes it, not the reviewer**;
- the human corrects, redirects, or expresses dissatisfaction;
- a defect reaches the Vercel preview and should have been caught earlier;
- an agent notices mid-work that an earlier decision was wrong.

```bash
node .agents/tools/lesson.mjs new "the rule, imperative" --agent <agent> --domain <gate> --spec NNNN
```

Then fill `## What happened`, `## Why it happened`, `## The rule`, `## How to verify`. The docs gate fails on an empty section or a leftover placeholder.

### The pattern-not-incident test

Could an agent that was not there apply this rule tomorrow, to a different feature? If not, it is a diary entry and it will rot in the index.

- Incident: "the INSS bracket in the payroll card was off by one tier."
- Pattern: "restate every bracket boundary as an inclusive/exclusive pair in `legal.md`, because a table written as plain ranges gets implemented with the wrong comparison operator."

Blame is never the lesson. "The developer was careless" is not actionable; "the plan did not specify the rounding direction, so the developer picked one and the payroll drifted a centavo" is — and it changes what the tech-lead does next time.

The lessons worth the most here are the ones about money and law. A rule that stops a bracket, a ceiling, or a rounding policy from drifting outranks ten about spacing.

## Confirm, promote, retire

This is the failure mode of every learning system — remembering everything until nothing is readable. Three mechanics keep the index small:

- **Confirm.** Each time a lesson prevents a repeat: `lesson.mjs confirm <id>`. A lesson nobody ever confirms is a lesson nobody ever read.
- **Promote at 3.** Three confirmations means it is no longer a lesson, it is a rule. Move it into the relevant agent definition in `.agents/agents/`, or into `AGENTS.md` when it cuts across agents, then `lesson.mjs retire <id> "promoted"`. The index shrinks as the squad gets better.
- **Retire.** A lesson contradicted by a later decision, or made obsolete by a refactor, goes to `archive/` with its reason. A stale rule is worse than no rule.

## The cap

**Thirty active lessons.** `lesson.mjs new` refuses past it. At the cap, nothing new is written until something is promoted or retired.

The pressure is the point: a memory with no ceiling stops being read, and a memory nobody reads has cost every failure that paid for it and bought nothing.
