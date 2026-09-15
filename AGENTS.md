# AGENTS.md

Operating contract for every AI agent working on this repository — Claude Code, Antigravity, Codex, Cursor, Copilot, or anything else that reads this file.

Read this before doing anything else.

---

## 1. The project

**WorkLoad** is a Brazilian work-hours and payroll calculator. A CLT worker opens it on their phone, types the time they clocked in, and gets back: what time they can leave, how much overtime they have accrued, the night-shift premium they are owed, and what actually lands in their account after INSS and IRRF.

That framing decides every trade-off in this repo:

- **The numbers are the product.** Everything else is packaging. A beautiful screen showing a wrong INSS bracket is a defect of the highest severity this project has.
- **The user is not a lawyer and not an accountant.** They should never have to know what "hora reduzida noturna" means to benefit from it.
- **Mobile, one-handed, in a hurry.** Probably standing at a time clock.

| | |
|---|---|
| Framework | Next.js (App Router), React 19, TypeScript strict |
| Styling | Tailwind CSS 4 — CSS-first, tokens in `app/globals.css`. There is no `tailwind.config.ts`. |
| Utilities | `clsx` + `tailwind-merge` via `cn()` in `lib/utils.ts` |
| Icons | `lucide-react` |
| Motion | `motion` (Framer Motion v13) |
| Theming | `next-themes` — dark and light both ship |
| Dates | `date-fns` |
| Language | **pt-BR only.** There is no i18n layer and none is planned. |
| Tests | Vitest + Testing Library + jsdom. Coverage is enforced per area: **100% in `lib/**` and `hooks/**`**, **90% in `app/**` and `components/**`** |
| E2E | Playwright across desktop, iPhone and Android; QHD and 4K are covered by a single wide-viewport spec |
| Lint/format | Biome |
| Perf budget | Lighthouse CI |
| Hosting | Vercel — every PR gets a preview deploy |
| Package manager | pnpm |

Four documents hold the truth and outrank any agent's judgment:

- **`PRODUCT.md`** — who this is for, what it promises, what it will never do.
- **`DESIGN.md`** — the design system as actually shipped: tokens, type ramp, spacing, color, elevation, motion.
- **`.specs/`** — every change, specified before it is built and recorded after.
- **`.specs/*/legal.md`** — the labor-law and tax rules a change depends on, with their sources.

### Commands

```bash
pnpm dev                  # dev server
pnpm build                # production build — must pass before any PR
pnpm test                 # vitest run
pnpm test:coverage        # coverage; below the per-area thresholds the run fails
pnpm lint                 # biome check .
pnpm lint:fix             # biome check --write .
pnpm typecheck            # tsc --noEmit
pnpm check                # lint + typecheck + test — the full local gate
pnpm e2e                  # playwright
```

### Agent tooling

```bash
node .agents/tools/spec.mjs new "feature name"    # scaffold a spec from the templates
node .agents/tools/spec.mjs status                # every spec, its state, its holder
node .agents/tools/lesson.mjs new "the rule"      # record a lesson after a failure
node .agents/tools/docs-check.mjs <NNNN-slug>     # documentation gate
node .agents/tools/preview.mjs --out <dir>        # screenshots (desktop+mobile x dark+light), axe-core, console errors
.agents/tools/pr-preview.sh                       # watch PR checks to green, print the Vercel preview URL
```

---

## 2. Where agents live

**`.agents/` is the source of truth.** Everything else points at it.

```
.agents/
├── agents/     the squad (native format for Antigravity; symlinked into .claude/agents/)
├── skills/     installed skills (symlinked into .claude/skills/)
├── memory/     accumulated lessons — read before deciding, written after failing
├── commands/   slash commands that drive the pipeline (symlinked into .claude/commands/)
└── tools/      scripts the agents call
```

| Runtime | How it reads the squad |
|---|---|
| Antigravity | `.agents/agents/` natively |
| Claude Code | `.claude/agents/` → symlinks into `.agents/agents/` |
| Codex / Cursor / Copilot | this file; agent definitions in `.agents/agents/` referenced by name |

Every agent definition is Markdown with YAML frontmatter. `tools` is a comma-separated string. `model` uses Claude tier names (`opus` / `sonnet`); a runtime that does not recognize them maps them to its own tiers rather than editing the files.

**Never edit `.claude/agents/*`, `.claude/skills/*` or `.claude/commands/*` directly — they are symlinks.** Edit the target in `.agents/`.

---

## 3. The squad

Ten agents. Each owns one decision domain and is forbidden from the others' — that separation is what makes the output better than one agent doing everything.

| Agent | Model | Owns | Produces |
|---|---|---|---|
| `product-manager` | opus | The problem, the scope, the acceptance criteria | `spec.md` |
| `labor-law-analyst` | opus | **Brazilian labor law and tax correctness. Blocking.** | `legal.md`, `reports/legal.md` |
| `product-designer` | opus | Hierarchy, layout, type, color, elevation, motion | `design.md` |
| `content-writer` | opus | Every pt-BR word the app ships | `copy.md` |
| `tech-lead` | opus | Architecture, task decomposition, bounce triage | `plan.md` |
| `frontend-dev` | sonnet | Execution only — no decisions | code + tests |
| `qa-engineer` | sonnet | Correctness, tests, coverage, code craft | `reports/qa.md` |
| `web-standards-auditor` | sonnet | a11y, SEO, Core Web Vitals | `reports/audit.md` |
| `refactor-scout` | sonnet | Over-engineering guard rail | `reports/ponytail.md` |
| `release-manager` | sonnet | Docs, commits, stacked PRs, CI, preview URL | `reports/release.md` |

Opus where judgment, taste, or legal interpretation decides the outcome; Sonnet where the work is verification against a written standard.

The `tech-recruiter` from the portfolio squad has no analogue here. Its seat belongs to `labor-law-analyst`, because the question "was this worth building" matters less than "is this number legally correct".

---

## 4. The pipeline

Orchestration is **orchestrator-workers**: the main thread runs `/feature` and calls each agent in turn. Agents do not call each other — they return a verdict and an artifact, and the orchestrator routes. Sub-agents cannot reliably spawn sub-agents across all three runtimes, and a chain that pretends otherwise silently drops work.

```
request
  │
  ├─ G1  spec       product-manager                              → spec.md
  │
  ├─ G2  law        labor-law-analyst                 [blocking] → legal.md
  │
  ├─ G3  design     product-designer  ─┐ parallel
  │      copy       content-writer    ─┘                         → design.md, copy.md
  │
  ├─ G4  plan       tech-lead                                    → plan.md
  │
  ├─ G5  build      frontend-dev      (task by task)             → code + tests
  │
  ├─ G6  review     qa-engineer             ─┐
  │      audit      web-standards-auditor   ─┤ parallel
  │      law-check  labor-law-analyst       ─┤                   → reports/qa.md, audit.md,
  │      ponytail   refactor-scout          ─┘                     legal.md, ponytail.md
  │
  ├─ G7  docs       release-manager (BEFORE the first commit)    → docs reconciled, lessons written
  │
  ├─ G8  release    release-manager (commits → [human approval] → push, PR, CI)
  │                                                              → reports/release.md + preview URL
  │
  ├─ G9  preview    web-standards-auditor + labor-law-analyst (vs. Vercel URL)
  │                                                              → reports/audit-preview.md
  │
  └─ G10 compound   tech-lead — promote lessons, close the spec  → ship
```

**G2 exists because of an asymmetry.** Design and copy can be revised after the fact at the cost of a bounce. A wrong tax bracket that ships is a user making a financial decision on a number this project invented. The law is settled before anyone draws a screen.

### Gate rules

1. A gate **passes** or **rejects**. There is no partial pass.
2. Every rejection goes to the **tech-lead**, who triages the destination and records it in `STATUS.md`. No agent bounces work directly to another agent.
3. **Two bounces per gate is the ceiling.** On the third, the pipeline stops: the tech-lead writes the impasse and the options into `STATUS.md` and hands it to the human. Never loop.
4. Parallel gates all run to completion before routing. Do not abort the others because the first rejected — four reports in one bounce is one round trip instead of four.
5. Reviewing agents (`qa-engineer`, `web-standards-auditor`, `labor-law-analyst`, `refactor-scout`) **never edit source files.** They report; the developer fixes. A reviewer who fixes stops being able to see.
6. **The shared working tree is read-only for diagnosis.** Rule 4 means another agent may be reading and testing the same files right now, so a revert-measure-restore probe — proving a check fails before the fix, measuring a "before" value, bisecting — happens in an isolated copy (`git worktree` or a scratch clone), never in the repository, no matter how fast the file is restored. A mutation another agent can observe produces findings against a tree nobody delivered, and the cost is a whole gate round.
7. `frontend-dev` makes no decisions. Ambiguity goes into `STATUS.md` under `blockers` and back to the tech-lead.
8. `labor-law-analyst` may reject work that passed every other gate, and its rejection cannot be overruled by design, scope, or schedule. Only the human can accept a known legal imprecision, and the acceptance is recorded in the spec.

### Human approval points

The pipeline runs autonomously except here, and these are not negotiable:

- **Before any push, PR, or remote operation.** Ask, wait, do not proceed on silence.
- **When a gate hits its third bounce.**
- **When a change would contradict `PRODUCT.md`, or require a `DESIGN.md` system change** the designer did not already justify.
- **When `labor-law-analyst` reports an imprecision the squad cannot resolve.**
- **Before deleting anything** outside the spec's declared scope.

---

## 5. Spec-driven development

`.specs/` is the durable record, and the contract is strict: **delete `app/`, `components/`, `lib/` and `hooks/`, hand an agent `.specs/` + `PRODUCT.md` + `DESIGN.md`, and it should rebuild a materially equivalent calculator — including every legal table, to the centavo.** A spec insufficient for that is incomplete.

Layout, numbering, and templates: see `.specs/README.md`. State lives in two places and nowhere else — `.specs/INDEX.md` for what is done and pending across the repo, and each spec's `STATUS.md` for where that one is and who holds it.

Every agent updates `STATUS.md` when it finishes: its gate's state, the run number, the next agent, and any decision worth remembering in the decisions log. An artifact written without its `STATUS.md` update is invisible to the rest of the pipeline.

`evidence/` is gitignored — screenshots are large, regenerable, and not review material.

---

## 6. Compound engineering — the squad gets smarter

The squad is not supposed to be as good on its tenth feature as on its first. Every failure it pays for must buy something permanent.

### Read before you decide

**Every agent reads `.agents/memory/LESSONS.md` before making its first decision.** One line per lesson — cheap to scan — with the full rule one click away. Open every lesson tagged for you or for your domain.

This is not optional context. It is the record of what this squad already got wrong. An agent that re-derives a decision the memory already settled has wasted the cost that bought the lesson.

If a lesson applies and you are deliberately doing the opposite, record why in the spec's `STATUS.md` decisions log. Disagreement is allowed; silence is not.

### Write after you fail

A lesson gets written whenever:

- a gate rejects (the agent whose work was rejected writes it, not the reviewer);
- the human corrects, redirects, or expresses dissatisfaction;
- a defect reaches the Vercel preview and should have been caught earlier;
- an agent notices mid-work that an earlier decision was wrong.

```bash
node .agents/tools/lesson.mjs new "the rule, imperative" --agent <agent> --domain <gate> --spec NNNN
```

**Write the pattern, not the incident.** The test: could an agent that was not there apply this rule tomorrow, to a different feature? If not, it is a diary entry and it will rot in the index.

Blame is never the lesson. "The developer was careless" is not actionable; "the plan did not specify the rounding direction, so the developer picked one and the payroll drifted a centavo" is — and it changes what the tech-lead does next time.

### Promote, or drown

- **Confirm.** Each time a lesson prevents a repeat, `lesson.mjs confirm <id>`.
- **Promote at 3.** Three confirmations means it is no longer a lesson, it is a rule. Move it into the relevant agent definition in `.agents/agents/`, or into this file when it cuts across agents, then `lesson.mjs retire <id> "promoted"`.
- **Retire.** A lesson contradicted by a later decision, or made obsolete by a refactor, goes to `archive/` with its reason. A stale rule is worse than no rule.

Hard cap: **thirty active lessons.** At the cap, nothing new is written until something is promoted or retired. The pressure is the point.

---

## 7. Documentation gate — before the first commit

Documentation is reconciled **before anything is committed**, never after the PR is open. The `release-manager` runs it, and it blocks delivery.

```bash
node .agents/tools/docs-check.mjs <NNNN-slug>
```

The script checks structure: artifacts complete and in the right folders, `STATUS.md` and `INDEX.md` consistent with reality, gates closed, no open blockers on a `done` spec, lessons indexed and fully written, symlinks intact, evidence gitignored.

The release-manager checks truth, which no script can: whether `STATUS.md` records the bounces that actually happened, whether the artifacts describe what was *built* rather than what was intended, whether a `DESIGN.md` system change landed, whether a legal table changed and `legal.md` and the README still agree with the code, and whether any lesson has reached promotion.

**A failing docs gate blocks the commit.** Fix it; never annotate around it.

---

## 8. Code rules

Binding on `frontend-dev`, enforced by `qa-engineer`.

- **English only.** Every identifier, file name, type, test name and commit message is in English. User-visible strings are pt-BR — and they are the only Portuguese in the repository.
- **No comments.** Enforced by `__tests__/comment-free-code.test.ts` across `app/`, `components/`, `hooks/`, `lib/`, `scripts/`, `__tests__/`, `tests/` and the root config files, with two exemptions and no others: a tooling directive (`biome-ignore`, `@ts-expect-error`, `v8 ignore`), and — in `lib/` only — a comment citing a Brazilian norm. Never narrate what the code does. Never reference a task, spec, or PR in a comment: the reader of a failing assertion never sees it and the section number drifts. Put the reasoning in the identifier or the test description, or refactor until it needs none.
- **Descriptive names.** No single letters, no abbreviations that are not domain terms. `index`, not `i`. `overtimeMinutes`, not `ot`.
- **Atomic design**: `components/atoms/` → `molecules/` → `organisms/` → `templates/`. Place files at the level the plan names.
- **TypeScript strict.** No `any`. `unknown` only at a trust boundary, immediately narrowed. No `@ts-ignore`, no `!` to silence the compiler.
- **Business rules live in `lib/`.** No tax table, no CLT threshold, no rounding rule inside a component or a hook. Hooks are stateful glue; components render.
- **Every legal constant carries its source** — the norm and the article — in the `lib/` module that defines it, and matches `.specs/*/legal.md`.
- **Tailwind with tokens** from `app/globals.css`. Use `cn()` from `lib/utils`. No inline styles, no raw hex, no arbitrary values where a token exists.
- **Motion** via `motion`, always with a `prefers-reduced-motion` path.
- **A `motion-reduce:` utility must neutralize the state it is fighting, not the resting state.** A bare `motion-reduce:transform-none` is specificity `0-1-0` and loses to `hover:-translate-y-1` (`0-2-0`) for exactly as long as the pointer is on the element. Pair every state-bound transform with its neutralizer in the same state: `hover:-translate-y-1` → `motion-reduce:hover:translate-y-0`.
- **Reuse before writing.** Check `components/`, `hooks/`, `lib/` first. Three similar lines beat a premature abstraction; a reinvented existing helper beats nothing.
- **No new dependencies** without a written justification in `plan.md`.
- **Tests** mirror `__tests__/`: query by accessible role and name, assert observable behavior, cover keyboard and reduced-motion paths. **Never assert a Tailwind class string** — a test that mirrors the CSS breaks on every design change and catches no defect.
- **A CSS override is proven in a browser, never in jsdom.** Any utility whose job is to beat another rule needs a check that reads the *computed* style under the condition it targets, and that check must be seen to fail against the unfixed code first. `toHaveClass` proves a string reached `className` and nothing about the cascade.
- Match the surrounding file's idiom. New code should be unidentifiable as new.

---

## 9. Quality bars

Non-negotiable, checked at G6 and again at G9:

- `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test` all clean.
- Coverage stays at **100% for `lib/**` and `hooks/**`** — the money and the hours, where a missed branch is a wrong number on someone's payslip — and at **90% statements/branches/functions/lines for `app/**` and `components/**`**. The split is deliberate: a blanket 100% over a `variant`/`size` prop matrix can only be reached by asserting Tailwind class strings, which buys a passing threshold and no confidence. Do not lower the `lib/` or `hooks/` bar.
- Zero axe-core violations at `critical` or `serious`; WCAG 2.2 AA in **both** themes.
- Zero console errors or React warnings.
- Metadata, sitemap, robots, manifest and structured data still correct after the change.
- No horizontal overflow and no control outside the viewport at 390, 1440, 2560 and 3840.
- **Every user-visible number is traceable** to a table in `lib/` that cites its norm. Nothing is ever invented — not a bracket, not a rate, not a ceiling, not a year.
- **Where the app cannot be sure, it says so.** A computation that omits a variable the user's real payslip includes carries a visible disclaimer, not silence.
- `node .agents/tools/docs-check.mjs` clean.

---

## 10. Git and delivery

Owned by `release-manager`.

- **Only commit when asked.** Never proactively.
- **Group commits by coherent context** — never one commit per file, never one commit for everything. A reviewer should read one commit and understand one complete idea.
- Every commit builds and passes tests on its own.
- **Stage by name.** Never `git add -A` or `git add .`.
- Never commit `.specs/*/evidence/`, `coverage/`, `.next/`, `test-results/`, `playwright-report/`, `.lighthouseci/`, or anything resembling a secret.
- Conventional Commits; imperative subject under 50 chars; body only when the *why* is not obvious.
- Prefer new commits over `--amend`. If a hook fails, the commit did not happen — fix, re-stage, new commit.
- Never skip hooks (`--no-verify`, `--no-gpg-sign`), never change git config, never force-push to `main`.
- PRs are **stacked and incremental** via the `gh-stack` skill. Each independently reviewable; foundation → tokens → components → composition → content → polish.
- Push and PR creation require explicit human approval, every time.

**Every PR must be green before the preview gate.** A failing check is a blocker that bounces to the tech-lead. Never disable, skip, or work around a check to get past it.

### Attribution — every commit says which AI wrote it

Every commit and PR produced by an agent must disclose it, and must name **the model that actually ran the session** — not a hardcoded default, not the model that wrote this file.

```
Co-Authored-By: <Model Name> <noreply@<provider>.com>
```

Read the running model's name from your own environment before writing the trailer:

| Runtime | Where the name comes from | Example trailer |
|---|---|---|
| Claude Code | the model named in your system prompt | `Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>` |
| Antigravity | the active model in the agent config / session | `Co-Authored-By: Gemini 3 Pro <noreply@google.com>` |
| Codex | the model backing the session | `Co-Authored-By: GPT-5 Codex <noreply@openai.com>` |
| Anything else | that runtime's own model identifier | `Co-Authored-By: <Model> <noreply@<provider>.com>` |

Rules:

- **Never hardcode a model name or version.** A trailer copied from an example credits the wrong model the moment the session runs on something else, which makes the git history actively misleading about who wrote what.
- **Never invent a version you are not sure of.** If you can read the family but not the exact version, write the family alone (`Claude Opus`, `Gemini`, `GPT-5`) rather than guessing a number.
- One trailer per commit — the model that wrote it. Multiple agents sharing one session and one model do not each get a line.
- The trailer is the last line of the commit message, after a blank line.
- A commit authored by the human carries no trailer.

PR descriptions end with the line naming the runtime that produced them:

```
🤖 Generated with [Claude Code](https://claude.com/claude-code)
```

Substitute the actual tool when it is not Claude Code. Same rule: name what really ran.

---

## 11. Working outside the pipeline

Not every request needs ten agents. A typo fix, a dependency bump, a one-line style correction — just do it, following §6, §8 and §10.

The pipeline is for anything that changes what a user sees, reads, or is told about their money. When in doubt, the test is: **could this change the number on someone's screen?** If yes, it gets a spec — and it gets `legal.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
