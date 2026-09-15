# .specs — the durable record

Every change to WorkLoad is specified before it is built and recorded after. This folder is that record, and it carries a contract strict enough to be tested.

## The rebuild contract

**Delete `app/`, `components/`, `lib/` and `hooks/`. Hand an agent `.specs/` plus `PRODUCT.md` and `DESIGN.md`. It rebuilds a materially equivalent calculator — including every legal table, to the centavo.**

A spec insufficient for that is incomplete, and "incomplete" is not a style note: it means the numbers this project ships exist only in code nobody wrote down. Every bracket, every rate, every ceiling, every rounding rule lives in a `legal.md` with its norm, its article and its source, or it does not exist.

The test is mechanical. Read a spec and ask: could someone who has never seen the repository reproduce this screen, this wording, and this arithmetic from the artifacts alone? If a number appears in the app and not in a `legal.md`, the contract is already broken.

## Layout

```
.specs/
├── README.md              this file
├── INDEX.md               every spec, its state, its holder — the one repo-wide view
├── templates/             the artifact templates; spec.mjs copies from here
│   ├── spec.md
│   ├── legal.md
│   ├── design.md
│   ├── copy.md
│   ├── plan.md
│   ├── report.md
│   └── STATUS.md
└── NNNN-slug/
    ├── spec.md            product-manager — problem, scope, acceptance criteria
    ├── legal.md           labor-law-analyst — the norms, the tables, the rounding
    ├── design.md          product-designer — hierarchy, layout, tokens, states, motion
    ├── copy.md            content-writer — every pt-BR string the change ships
    ├── plan.md            tech-lead — architecture, tasks, dependency decisions
    ├── STATUS.md          where this spec is and who holds it
    ├── reports/
    │   ├── qa.md              qa-engineer
    │   ├── audit.md           web-standards-auditor
    │   ├── audit-preview.md   web-standards-auditor + labor-law-analyst, vs. the Vercel URL
    │   ├── legal.md           labor-law-analyst, the G6 re-check against the built code
    │   ├── ponytail.md        refactor-scout
    │   └── release.md         release-manager
    └── evidence/          screenshots, axe output, report.json — gitignored
```

`legal.md` sits next to `spec.md`, not in `reports/`. It is an input the build is written against, not a finding about the build. The G6 re-check — does the shipped code still match those tables — is the separate `reports/legal.md`.

## Numbering

Four digits, assigned in order, never reused.

- **`0001`–`0099` — baseline.** Specs that document the calculator as it already exists. They are written after the fact and exist so the rebuild contract holds for code that predates the pipeline.
- **`0100`+ — new work.** Everything the squad specifies before building.

```bash
node .agents/tools/spec.mjs new "short change name"
```

The tool takes the highest existing folder number and adds one, scaffolds the folder from `templates/`, and appends the row to `INDEX.md`. It does **not** copy `legal.md` — do that yourself before G2:

```bash
cp .specs/templates/legal.md .specs/<NNNN-slug>/legal.md
```

While the baseline range is still the highest numbering in the repo, the first new-work spec has to be moved into the `0100`+ range by hand: rename the folder and fix its `INDEX.md` row. After that the tool keeps counting from there on its own.

## Where state lives

Two places, and nowhere else:

- **`INDEX.md`** — what is done and pending across the whole repo. One row per spec.
- **`NNNN-slug/STATUS.md`** — where that one spec is, which gate holds it, which agent is next, the bounce counts, the open blockers, and the decisions log.

Every agent updates `STATUS.md` when it finishes: its gate's state, the run number, the next agent, and any decision worth remembering. **An artifact written without its `STATUS.md` update is invisible to the rest of the pipeline** — the orchestrator routes on `STATUS.md`, not on which files happen to exist.

A decision that contradicts a lesson in `.agents/memory/LESSONS.md` goes in the decisions log with its reason. Disagreement is allowed; silence is not.

## Evidence

`.specs/*/evidence/` is gitignored. Screenshots are large, regenerable, and not review material — a report that depends on an image nobody can see is a report that says nothing. Regenerate it:

```bash
node .agents/tools/preview.mjs --out .specs/<NNNN-slug>/evidence
node .agents/tools/preview.mjs --out .specs/<NNNN-slug>/evidence --base-url <vercel-url>
```

## Checking the record

```bash
node .agents/tools/docs-check.mjs [NNNN-slug]
```

Structure only — artifacts complete and in the right folders, `STATUS.md` and `INDEX.md` consistent, gates closed, no open blockers on a `done` spec, no report files loose in the spec root, evidence gitignored. It exits non-zero on any failure and **a failing docs gate blocks the commit.** Fix it; never annotate around it.

Truth is the `release-manager`'s job, and no script can do it: whether `STATUS.md` records the bounces that actually happened, whether the artifacts describe what was built rather than what was intended, and whether a legal table changed without `legal.md` and the code being brought back into agreement.
