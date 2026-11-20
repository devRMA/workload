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
| Icons | `@tabler/icons-react` |
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

   **`.next` is shared mutable state, and no claim that depends on it is evidence until it is produced in a copy that owns its own `.next` and its own port.** An e2e pass/fail count, a Lighthouse category, a preview screenshot, a bundle grep: during a parallel gate, `pnpm build`, `pnpm e2e`, `pnpm dev` and `preview.mjs` all write the one `.next` in the checkout, so a sibling agent's concurrent build races yours and fails indistinguishably from a real regression — and a git worktree does not help, because the racing writer is a live build, not a stale process to kill. The isolated copy is `rsync --exclude node_modules --exclude .next`, then `cp -al` the `node_modules` (same filesystem, seconds, zero extra disk). `rm -rf .next` before the first build in it whenever any `NEXT_PUBLIC_*` flag differs from that tree's last build: Turbopack's persistent cache does not rebuild the affected chunk on a flag change alone, so the second build silently ships the first build's flags. A result that only reproduces in the shared tree is evidence about contention with a sibling agent; a result that reproduces in the isolated copy is evidence about the code. `uptime` and `ss -ltnp` before trusting any red run mid-gate — a load average several times the core count, or a port held by a command that is not yours, means the run proves nothing yet.
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

### How a criterion is written

Promoted from the lesson ledger at 0005's G10, after three confirmations each. Binding on every agent that writes an acceptance criterion, a verification cell, a "Done when", or a guard — `product-manager`, `tech-lead`, and every reviewer that names evidence.

- **State a prohibition as the search over the whole boundary it names, never as a file and a line.** "No `X` in `app/globals.css:69`" ships the rule with an exception; "no `X` anywhere in the tree, asserted by a test" is the rule. The boundary is the whole class of file the rule governs, including the documents — and a criterion satisfiable by editing one line is not a criterion.
- **Never name a verification command that has not been run in this tree, by the agent naming it.** A tool the repo ships is not a tool that works here, and a criterion whose evidence path is inoperable proves nothing in either direction. Run it once, paste what it printed, and write the criterion against that. If it cannot run, the criterion is not written until the reason is fixed or the criterion is replaced by one that can.
- **A criterion may name an instrument that does not ship only when its verdict is consumed in the session that produced it.** The test is a test, not a list of paths: *can this criterion still be falsified, after the spec closes, by an agent who has only the repository?* Must-be-yes — a ceiling a later spec re-measures, a guard another gate re-runs — and the instrument ships on a tracked path, under `tests/`, with `plan.md` naming which criterion gets which at G4. No — one agent's two dumps minutes apart, a baseline nothing downstream re-reads — and `evidence/` is fine, because the **pasted output is the durable artifact** and the script is scaffolding. This follows from `evidence/` being gitignored and from nothing else, so it binds every criterion in every spec: an untracked path in a criterion whose answer is *yes* is a criterion that dies with the session. Check it with `git check-ignore -v` on the path and `git ls-files` on the directory, and paste both. Promoted at 0012's G10 from `product-manager`'s B4 ruling at `.specs/0010-disclosure-reachability-on-mobile/`, which derived it and left the promotion here.

**A numeric criterion is not accepted until it has been shown to discriminate.** Added at 0012's G10 from lessons **011**, **014**, **040** and **051** — four wordings of one rule, each naming a different way a threshold stops separating a good build from a bad one. It binds at **G1** where the criterion is written and again at **G4** where the plan endorses it: endorsing a criterion without running it against a good state is the same defect, one gate later. Four tests, all four in writing:

- **Both directions, both outputs.** Run the criterion's own command against a state where the defect is definitionally absent *and* a state where it is present, in this session, on a named artifact, and paste both outputs into the spec. A criterion a known-good state fails, or a known-bad state passes, does not discriminate and is not a criterion. The known-good state must be **reachable now** — a local build, a blocked resource, an injected condition — and where none can be produced, the spec says so instead of shipping the criterion. The reviewer's form of the same test: *what state would pass this while still being broken, and what state would fail this while being fine?* Unanswered in writing, the criterion has been observed, not validated.
- **A quantity this spec has already moved, with the run cited inside the criterion.** If no experiment in this spec has been observed to move the quantity with the defect, the criterion is a hypothesis. Prefer a measured elapsed time over any value a simulator or a formula derives from it, a same-session differential over an absolute wherever the measurement path is shared and uncontrolled (the path then cancels), and a quantity the defect moves **monotonically** over a relation between two derived quantities — an identity, a ratio or a difference between two numbers a tool computed is satisfied by states with nothing in common. And the criterion carries a **causal sentence naming the defect**: *"in 11 of 12 reports these were equal"* describes an instrument, not a build.
- **A lever inside this spec's own In-scope list, and a margin wider than the instrument's spread.** Name the lever and how much of the number it can move; if every lever reaching the dominant part of the metric sits in Out of scope, the criterion can only pass by breaking its own document. Name the instrument and its run-to-run spread, and require the margin to exceed it — or phrase the criterion *against* the spread (*"the improvement exceeds the max − min of the recorded run set"*), which is checkable from the same table that reports the result and can never be decided inside the noise. A threshold imported from a skill, a framework default or another product's bar carries one line saying why it transfers to this page. When either test fails, the absolute target **moves to a new spec — opened, named and indexed the same day**, carrying the finding and the measurement: a target moved with an owner is relocated, a target deleted with an apology is retired.
- **A threshold that does not move when n does.** Never use range, max or min as a noise threshold unless n is fixed in the criterion's own verification command — prefer a standard deviation or an IQR, which estimate the instrument rather than the sample, or state the claim as a **sign test over the runs** (*"no individual run is above the baseline median"*), which gets stronger as n grows. Ask of every threshold: *if I doubled n with no change to the code, would this number move?* If yes, more evidence argues against the criterion, and the criterion is mis-specified, not the measurement. Where a second run set is ordered, say in the order whether it re-verifies the criterion or is supplementary — two run sets and no stated relationship is a later argument about which one counts.

### How a claim about the tree is measured

Promoted from the lesson ledger at 0001's G10. Not by three confirmations of one lesson but by three agents — `product-manager` on 0004, `tech-lead` on 0002, `product-designer` on 0001 — deriving the same rule independently, in three domains, within hours, each after a defect the rules above did not reach. Binding on every agent that writes down a count, a file list, a carried debt, or a path.

- **Derive every set of files by listing the tree, never from the output the tree produced.** `find`, `ls`, a glob — and cite the command. Emitted output proves a defect exists and shows its shape; it never shows how many sources produced it, because a framework resolving by convention, inheritance, cascade or default emits byte-identical output from one file and from four. A count that appears in a document and in no command's output is itself the defect.
- **Re-measure every carried debt by the search that defines its boundary before handing it forward.** A finding carries coordinates because the developer needs the line; a debt outlives the tree that recorded it — every unrelated edit above it moves the line, and every sibling written since was never in the record. Restate the debt as the search plus the count that search printed *now*, and rule the delta out loud in one of three buckets: *resolved* (paste the command that returns nothing, because a debt quietly paid costs the next reader the same investigation), *still open* (owner and trigger), *wider than recorded* (say by how much — a debt that grew while nobody looked is proof its trigger never fired).
- **Check every "still passing" guard for vacuity.** An assertion whose selector, string or constant no longer exists in the source passes against any markup whatsoever. For each guard a debt or a report calls correct, name the input that would make it fail; if you cannot, the guard is dead, and that is a new finding, not a closed one.
- **Write every file path in full, once per filename.** Never factor a directory out across a list, never name a file without its directory, never let one heading cover files whose paths differ. A prefix stated once and inherited silently by the names after it is invisible to a grep for the filename it is wrong about; an unqualified filename cannot be checked against disk at all, so an audit for wrong paths returns it clean. §8 makes the atomic level binding, so both shapes are instructions to put the next file in the wrong directory.
- **A debt gets a trigger, never a date** — the next spec that opens this file, moves this component, or touches this table. A date passes on its own; an event arrives with the owner attached.
- **Every enumeration and every measured number carries the state it was read in, or it is not yet a fact.** Two coordinates, and a document missing either is unreproducible: the **tree state** — a commit, `git grep` at a named sha, never a bare working-tree count — and the **application state**, named as the inputs that produce it (the seed, the route, the stored values, the branch conditions that hold), never as a screenshot or an adjective. A state is the one part of a measurement that is never in the measurement, so it is the part that gets dropped when the result is copied into a document that then outranks the next agent's judgment. **Where a spec's own plan changes what the command returns, one coordinate is not enough and the fix is never a bigger number: state the quantity twice, against two states, with the delta attributed** — a baseline clause at the named sha that must reproduce exactly, and a delivered clause stating the relation, typically that the delivered set is a superset whose every extra member is attributed by name to the task that created it. An unattributed member is then a finding that adds a row, instead of an argument about whether the original count was wrong. A file list measured at G1 is not aging in the background; it is being falsified on purpose by the tasks written underneath it. **A derived quantity is printed with its operands, never alone, whenever a stop condition turns on it** — `maxScroll` is `scrollHeight − innerHeight`, a ratio is a numerator over a denominator, a slack is a budget minus a spend. Fused into one number it cannot be reconciled against a second reading, and two honest readings then decide the verdict by coin flip; printed unfused, the one operand that moved is the attribution. And where two correct readings of one quantity disagree, **find the state that accounts for the delta before you call anything a regression** — a difference explained to the unit by an element neither document names in that role is the normal outcome, and it is a defect in the document that omitted the state.

Added at 0012's G10 on the same basis as the block it joins: four corrections in one day, in three domains — `product-manager` on 0007's AC17 (15 files enumerated, 16 delivered, the sixteenth created by this spec's own task), `tech-lead` on 0007's T6 (129.0 px and 276.0 px both correct, read in two application states), `product-designer` on 0008 and on 0003's slot sizing. Promoted from lesson **058**.

### How an instrument's reading is trusted

Promoted from the lesson ledger at 0006's G10, on the same basis as the block above: three agents — `tech-lead` on 0004, `labor-law-analyst` on 0009, `product-designer` on 0008 — reaching the same rule in three domains, off a Lighthouse phase breakdown, a green E2E guard and a `layout-shift` source rect. Binding on every agent that quotes a number, a rect or a pass produced by a tool.

- **An instrument's output is a claim about the instrument until you reproduce the quantity yourself.** A tool prints what it computed, in the units it chose, over the sample it selected, and none of those three are in the output. Before a number from a profiler, an observer, a trace, a screenshot diff or a test runner becomes a fact in a document, re-derive it directly — `getBoundingClientRect()` on a state you loaded on purpose, the tool's own *observed* value beside its *reported* one, the guard's source beside its verdict — and write down which of the two every later number is.
- **A pass is evidence only about the sample it measured.** A boolean carries no record of its sample, so an empty selector and a clean run print the same thing. Every guard asserts the size of the set it iterates against an expected count *before* iterating — zero is never a pass, and `>= 1` does not discriminate — and counts each conditional exemption so `measured + exempt = expected` is checkable. The set is derived from the obligation, never from an appearance attribute: a selector filtering by a utility class, a token, a colour or a size narrows the domain by appearance, which is invisible from every artifact downstream and is true the day it is written, not the day the class is renamed. Where a rendered count disagrees with the expected one, it corrects **the artifact** that set the expectation, at the gate that found it — never the assertion, tuned until green.
- **Any observer that fires on change reports only changed frames, and clips what it reports.** The intended state produces no entry and is never in the output, so a geometry derived from shift or mutation logs is a difference between two frames nobody specified, with no target in it. `LayoutShiftAttribution`'s rects are clipped to the viewport: check any quoted rect for `top + height == viewportHeight` (or `left + width == viewportWidth`) before using it — an exact hit is clipping, and two in one file is proof. Load the intended state deliberately, at least twice for a hydrating app: the server bytes with `javaScriptEnabled: false`, and the settled client state.
- **Never let a criterion compare a value read one way to a threshold derived another way.** One quantity across a whole rule set; a sibling clause that reads it differently says in its own text why and what that buys. Two metrics equal to the millisecond, repeatedly, are one computation — find the shared input before explaining the number. And run the criterion against a known-good state first, which is where a unit mismatch surfaces.

- **A configuration the harness pins is a cell axis, not a background.** Where a committed test config sets an operand the product does not ship — an env flag, a fixture, a stored state, an injected third party — the suite measures a **different document** than the build delivers, and a verdict taken there can be not merely imprecise but **causally inverted**: this repository has a measured case where the harness answers *"the remedy was unnecessary"* and the shipped build answers *"the remedy is what fixed it"*, from the same cell. That defect ships as **prose in a report**, never as a failing test. So every geometric or behavioural cell names the operands the harness pins, beside route, viewport and theme; and where the product can deliver more than one document, a clause **binds in all of them and is verified in the narrowest** — stated as *narrowest*, never as the name of today's narrow one, so the rule still selects correctly when the layout moves. A clause whose verdict moves with an operand this repository does not bound — a third party's served height, an auction, a remote config — is not falsifiable by anything the squad can run, and must be bounded or restated before it binds.

### How a finding routed from another gate is inherited

Promoted from lesson **032** at three confirmations (specs `0004`, `0010`). Binding on every agent that scopes work on a finding it did not measure itself.

- **A routed note's numbers and its explanation of those numbers are two claims at two confidences.** The measured rows carry commands, hosts, run counts and timestamps; the causal sentence between them carries none, and nothing in the document's shape says so. The mechanism is also the part that reads as insight, so it is the sentence most likely to be quoted verbatim into the next spec's scope and the least likely to be re-derived. **Carry the numbers forward; earn the explanation again** — reproduce the stated mechanism against the artifact the note names, with a command of your own, run in this session, and record what you got in § Evidence.
- **Verify the artifact, not its name.** Before any host, build, branch or file is used as a control, a baseline or a reference, establish what it actually serves — by a marker in its own bytes, not by its URL or its label. A reference whose build predates the diff under discussion is *context*, and it is excluded from every pass/fail arithmetic that would compare it to something it is not.
- **When the mechanism does not reproduce, say so and leave the cause open.** Do not substitute your own guess in the same sentence: the replacement inherits the same unmarked confidence and the next gate quotes it too. Name the diagnosis as a deliverable of the gate that owns causes, and write criteria that stay falsifiable whatever the cause turns out to be. This is not distrust of the routing gate — the gate that routes is measuring a *symptom* on its way past; the gate that receives is the first one whose job is the *cause*, and the only one that pays for getting it wrong.

### How a rule's domain is defined

Promoted from the lesson ledger at 0006's G10 after four independent derivations — `labor-law-analyst` on 0002 and 0008, `content-writer` on 0002, the whole squad on 0006. Binding on every agent that writes a rule, a prohibition, a disclosure obligation or a scope exclusion.

- **State a domain as a test on what each member asserts, never as an enumeration of the members in view.** A list is built from the defect in front of you, and the next member is written outside it. The enumeration, if any, is an example of the test's output, not its definition — and the sentence claiming the list is exhaustive is deleted the first time the test returns a member the list lacks.
- **Rule on the instance, by reading the module its strings come from — never on the component that renders them.** Five call sites of one component are routinely five different answers. Follow a prop to its source and classify from the full set of strings that source can emit. Write the **reason**, not the label, so a later gate can check it against the string and tell you when it stopped being true. State what the test deliberately excludes and why, so the veto stays narrow enough to be worth having.
- **Bind a replacement by what it must say, not only by what it may not.** A forbidden-word list closes the words it names and never the claim; it is a backstop, never the specification. State the qualifier that makes the string true and **where in the sentence it must sit** — a scope word not adjacent to the noun it limits does not survive how a title, an `alt` or a search result is actually read. Then try to write a string that uses only permitted words and still makes the retired claim; if you can, the rule is incomplete and your string names the missing clause.
- **Widening a domain is a re-execution, not a membership operation.** Confirming the new test reproduces every ruling already on the record answers "did I lose anyone" and is silent on "does every clause still hold for the ones I gained". Run every clause — including, especially, the ones that have never failed — against every newly admitted member, with a command, and name *why* each green one is green: if the answer is a property of the original members you are only now noticing, that assumption is load-bearing and belongs in the rule's text. Then ask, in one recorded line per clause, whether the clause is **satisfiable** against the product's other binding principles. A clause that can only be met by breaching one of them is the **clause** that is wrong — correct it to express what it was reaching for, never by silence and never by narrowing the domain back to the members that happened to pass, and hand the inversion to the human in the same artifact, because the project's default is that the code is wrong when it disagrees with the rule.
- **Every string you mark unchanged or out of scope is a claim.** Run each binding rule's own boundary search over the directory it names and paste the output into your artifact, not into your reasoning. When an edit renames a figure, a norm or a term, grep the old name across the same boundary and check every sibling string on the same screen — a rename landing in one of two adjacent strings manufactures a contradiction the spec itself created.

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

Hard cap: **thirty active lessons.** At the cap, nothing new is written until something is promoted or retired. The pressure is the point — and `lesson.mjs new` refuses at the cap by printing the consolidation that is due: the lessons at three confirmations with the file each belongs in, the agent/domain clusters big enough to be one rule in several wordings, and the oldest never-confirmed entries. Read those before writing yours; the lesson you are about to write is often one of them.

Ids are never recycled. A retired lesson keeps being cited by number — by the agent definition that promoted it and by the lessons that reference it — so the next id comes from the highest in `lessons/` **and** `archive/`.

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
