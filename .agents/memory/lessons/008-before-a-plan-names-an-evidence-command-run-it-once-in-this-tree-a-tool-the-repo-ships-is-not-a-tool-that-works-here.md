---
id: 008
title: Before a plan names an evidence command, run it once in this tree; a tool the repo ships is not a tool that works here
applies-to: tech-lead
domain: plan
spec: 0002
created: 2026-09-14
confirmed: 0
---

## What happened

A plan made a review gate's evidence depend on a script that lives in the repository and had
never executed in it. The script imported a package that was in no manifest and a driver that
did not resolve from the repo root, so it failed on its first line — and a sibling script in the
same directory failed on the identical import. Both had been vendored from another project
together with the directory around them. Four squad documents instruct agents to run them, and a
previously closed spec had signed off an accessibility criterion whose entire verification cell
was one of those commands. The gate stopped at its first task and the plan had to be amended
before any file could be edited.

## Why it happened

A path that exists reads as a capability that exists. The plan cited the command by path,
matched it against the documents that recommend it, and never executed it, so "the repo ships
this tool" silently became "this tool works here". Vendored tooling is the highest-risk case: it
carries the previous project's dependency list and the previous project's DOM selectors, and
neither travels with the file.

## The rule

**Before a plan names a command as the source of any gate's evidence, run that command in this
tree and paste something it printed into the plan.** If it cannot run, the plan's job is to say
what makes it run — the package, the version, the import — or to name a different command.
Extend the check to every sibling that shares the broken import: one wrong dependency is
normally a directory-wide fact, not a file-wide one.

A tool also arrives with assumptions about the app it was written for. Read what it queries, not
only what it imports: a selector from another product makes a tool report zero findings, and
zero findings read as a pass.

## How to verify

For each evidence command a plan names:

- Execute it. A non-zero exit for a *missing module* is a plan defect; a non-zero exit for a
  *finding* is the tool working.
- `grep -n "from '"` over the whole tool directory, and resolve every bare import it finds with
  `node -e "import('the-package-name')"`. A package present under `node_modules/.pnpm/` but
  absent from the root is **not** resolvable.
- Confirm the tool wrote a file into `evidence/` with a timestamp from this run. A gate that
  reports a tool's result with no artefact, no stdout and no exit code has not run it.
