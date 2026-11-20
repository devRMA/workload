# CI execution

`.github/workflows/ci.yml` runs three independent jobs on Ubuntu 24.04:

- `checks`: Biome, TypeScript, Vitest coverage, JUnit and Codecov.
- `playwright`: ads-enabled production build and the complete browser suite.
- `lighthouse`: ads-free production build and Lighthouse's existing assertions.

The final `E2E Tests` check requires all three jobs to succeed. This name is
required by repository ruleset `15370066`; preserve it when restructuring CI.
Failed, skipped or cancelled dependencies must never produce a successful gate.

## Browser setup

Playwright runs in `mcr.microsoft.com/playwright:v1.63.0-noble` with `--ipc=host`.
The image supplies browser binaries and system libraries. There is no runtime
`apt` installation or browser-download cache. Update the image tag and its
compatibility check together whenever the resolved `@playwright/test` version
changes in `pnpm-lock.yaml`. The workflow fails early on a version mismatch.

The JUnit reporter receives a process-local Git `safe.directory` setting for
exactly `github.workspace`. GitHub mounts the host-owned checkout into the
root-owned container; without that scoped exception, the reporter's `git
ls-files` fails with dubious ownership even when the tests pass. No persistent
Git configuration or wildcard directory exception is used.

Lighthouse uses `/usr/bin/google-chrome`, supplied by the Ubuntu 24.04 GitHub
runner. Node 24 and the package manager declared in `package.json` are explicitly
set up in each job.

## Build isolation and limits

Each browser job owns its checkout and `.next`. Only `.next/cache` is cached,
with separate `e2e` and `lighthouse` key prefixes so public environment flags
never cross between profiles. The lockfile scopes restoration; the commit SHA
allows a successful new build to save refreshed compilation data.

Dependency installation is limited to three minutes, builds to five minutes,
Playwright to ten minutes and Lighthouse to eight minutes. Browser jobs have
fifteen-minute limits, checks ten minutes and the final gate one minute.
These are failure bounds, not promised execution times.

Coverage, JUnit, Playwright and Lighthouse reports remain available as artifacts
for fourteen days. Superseded workflow runs are cancelled by concurrency group.
No coverage threshold, browser project, retry, Lighthouse assertion or audit
sample count was reduced.

## Incident and verification

At baseline `b0925eb`, run
[`44775365284`](https://github.com/devRMA/workload/actions/runs/44775365284)
was cancelled before the E2E build or tests started. The browser install step
ran from `16:40:09Z` to `17:04:59Z` on 2026-11-20; its logs show Ubuntu resolute
packages downloading from `azure.archive.ubuntu.com`. The old dependency chain
also serialized checks, E2E and Lighthouse.

The replacement image's OCI manifest was verified against MCR before use.
Actionlint 1.7.7 validates the workflow. The aggregate shell command was checked
against all 64 combinations of success, failure, cancelled and skipped results:
only three successes pass. The image guard was checked with matching `1.63.0`
and mismatched `1.64.0` versions.

Local validation used the `b0925eb` application with this infrastructure diff:

- `pnpm lint`, `pnpm typecheck` and `pnpm test:coverage` passed (536 tests).
- The ads-enabled production build and all 173 E2E tests passed inside the
  specified Playwright image, using its browsers and two workers. Playwright
  reported 1.7 minutes. Local network trust required mounting the host CA bundle;
  this environment-specific mount is not part of GitHub Actions.
- An isolated ads-free build passed Lighthouse collection on both routes, three
  runs per route, followed by `pnpm exec lhci assert` with no assertion failures.
- `node .agents/tools/docs-check.mjs` passed in an isolated copy of tracked files
  plus this document: zero failures and five pre-existing template warnings.
  The original checkout also contains ignored evidence-only directories from
  other branches; these do not exist in a fresh checkout and make its global
  documentation scan report missing specs. They were not deleted by this change.
- Independent read-only review and `git diff --check` passed.

Keep two Playwright workers until hosted timings show browser execution is the
critical path. Shards would duplicate image pulls and builds; the failed run
contains no test-execution timing to justify that cost. Hosted runtime must be
measured after publication; local timings are not a GitHub runner benchmark.

The first hosted run at commit `5157fd5`,
[`44804529870`](https://github.com/devRMA/workload/actions/runs/44804529870),
passed checks in 1m26s and Lighthouse in 2m04s. All 173 E2E tests passed in
2.4 minutes, but the reporter failed with Git exit 128 due to checkout ownership.
The aggregate correctly failed. The scoped reporter exception above was then
reproduced locally: the same `git ls-files` fails with exit 128 without the
exception and succeeds with exit zero when the exact mounted path is trusted.
The reporter fix passed the complete hosted rerun
[`44807517302`](https://github.com/devRMA/workload/actions/runs/44807517302)
at `95bdb92`: checks in 1m27s, Lighthouse in 1m48s, Playwright including its
reporter in 3m45s, and the aggregate check succeeded. That verified the fix on
PR #41, not on its parent PR #40.

The same validated workflow was then promoted to PR #40 in `c73025b`, and PR #41
was rebased onto it. PR #41 now carries only CI documentation. This is necessary
because every PR in the stack must pass its own required checks; a child PR's
workflow changes do not affect its parent. No workflow or application bytes
changed during the promotion. Both updated heads must pass their own hosted
runs before the whole stack is declared ready.
