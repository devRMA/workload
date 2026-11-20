---
id: 029
title: Build an e2e claim in a process-isolated copy during a parallel G6, never against the shared .next output, because sibling reviewers' concurrent builds race on it and fail indistinguishably from a real regression
applies-to: all
domain: review
spec: 0006
created: 2026-09-15
confirmed: 2
---

## What happened

Verifying spec 0006's developer-reported `172 passed`, `PORT=3100 pnpm e2e` was re-run directly in
the shared working tree while `web-standards-auditor`, `labor-law-analyst` and `refactor-scout` ran
in parallel on the same tree (G6). It came back **5 failed / 167 passed**: a DS1 footer cpl of 37.67
against an expected ~52, two DS4 dialog timeouts waiting on a button that never appeared, and a
Mobile Safari radio-check flake. `uptime` showed a load average of 27+ on a 16-core machine, and a
second attempt at a fresh port failed outright with `next start`'s `Error: Could not find a
production build in the '.next' directory` — a sibling agent's own concurrent `pnpm build` had
overwritten the `.next` directory mid-run. Rebuilding and re-running the identical suite in a
process-isolated copy (rsync minus `node_modules`/`.next`, a hardlinked `node_modules` via `cp -al`,
its own `.next`, its own port) reproduced the developer's exact claim — 172/172, then 78/78 on a
second confirmation run — with the same source tree, unmodified.

In the same gate, independently, `web-standards-auditor`'s first Lighthouse pass ran against a
`.next/` left over from an earlier build of the same tree that had ads enabled. The bundle still
carried `ca-pub-0000000000000000`, Lighthouse served real `pagead2.googlesyndication.com` and
`googleads.g.doubleclick.net` requests, and `categories:best-practices` failed at **0.79** on
`third-party-cookies` and `inspector-issues`. After `rm -rf .next && pnpm build` with the same env
vars, no `ca-pub-` string is in the bundle at all and every category scores 1.00.

## Why it happened

`playwright.config.ts`'s `webServer` runs `pnpm build && pnpm start` (or `pnpm start` alone in CI)
against the repository root's own `.next`. That directory is shared by every process that runs `pnpm build`, `pnpm e2e`,
`pnpm dev` or `node .agents/tools/preview.mjs` (which also builds) in the same checkout. G6 puts four
review agents in that one checkout at once, several of whose jobs build the app. A build racing
another build's write to `.next`, or a CPU-starved machine turning a font load or a 15s Playwright
timeout into a false negative, produces a failure that reads exactly like a real regression: a wrong
number, a missing element, a flaky interaction. Lesson 013 already named this failure mode for ports,
processes and build-time env inherited by an *isolated worktree*; this is the same hazard the other
way around — the *shared* tree during a *parallel* gate, where a git worktree would not even help,
because the racing writer is another agent's live `pnpm build`, not a stale process to kill.

## The rule

Before treating **any claim that depends on `.next`** — an e2e pass/fail count, a Lighthouse
category, a preview screenshot, a bundle grep — as evidence during a gate that runs in parallel with
other agents in the same checkout, produce it in a filesystem copy that owns its own `.next` and its
own port, and `rm -rf .next` before the first build in that copy whenever any `NEXT_PUBLIC_*` flag
differs from the tree's last build. To reproduce a failure specifically, use the same copy —
`rsync --exclude node_modules --exclude .next`, then `cp -al` the `node_modules` directory (same
filesystem, seconds, zero extra disk) rather than reinstalling. A result that only reproduces in the
shared tree is evidence about resource contention with a sibling agent, not about the code. A result
that reproduces in the isolated copy is evidence about the code. Never report the shared-tree number
without running this check first, and never skip the isolated re-run because the shared-tree run
"looked" like a real regression — that is exactly the failure mode lesson 013 already describes, one
layer up.

Two mechanisms, one hazard: a *concurrent* writer races the directory, and a *stale* directory
survives a change that should have invalidated it. Turbopack's persistent cache does not rebuild the
`AdManager` chunk when only a `NEXT_PUBLIC_*` value changes between two `pnpm build` invocations in
the same tree, so the second build silently ships the first build's flags. Vercel's remote builds
start from a clean checkout and never see either; every local and self-hosted run sees both. The
common property is that `.next` is shared, mutable state that nothing in the toolchain treats as
belonging to your run.

## How to verify

`uptime` and `ss -ltnp` before trusting a red e2e run mid-gate: a load average several times the core
count, or a `next-server`/port collision from a command that is not yours, means the run proves
nothing yet. Re-run in the isolated copy described above and compare pass/fail counts before writing
either a finding or a pass into the report.
