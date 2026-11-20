---
description: Run or re-run a single pipeline gate on an existing spec, without the full squad.
argument-hint: <gate> <NNNN-slug>
---

Run one gate from `AGENTS.md` §4 against an existing spec. Use when re-running a gate after a fix, or when picking a stalled pipeline back up.

Arguments: **$ARGUMENTS** — the gate name and the spec folder.

| Gate | Agent | Artifact |
|---|---|---|
| `spec` | `product-manager` | `spec.md` |
| `law` | `labor-law-analyst` | `legal.md` |
| `design` | `product-designer` | `design.md` |
| `copy` | `content-writer` | `copy.md` |
| `plan` | `tech-lead` | `plan.md` |
| `build` | `frontend-dev` | code + tests |
| `qa` | `qa-engineer` | `reports/qa.md` |
| `audit` | `web-standards-auditor` | `reports/audit.md` |
| `law-check` | `labor-law-analyst` | `reports/legal.md` |
| `ponytail` | `refactor-scout` | `reports/ponytail.md` |
| `docs` | `release-manager` | docs reconciled |
| `release` | `release-manager` | `reports/release.md` |
| `preview` | `web-standards-auditor` + `labor-law-analyst` | `reports/audit-preview.md` |
| `compound` | `tech-lead` | lessons promoted, spec closed |

## Steps

1. Read `.specs/<NNNN-slug>/STATUS.md` to see where the pipeline actually is — the gate's run number, the bounce count, the open blockers — and `.agents/memory/LESSONS.md`.
2. Call the agent that owns the gate, giving it the spec folder and every artifact its input contract names. On a re-run, also give it the report that rejected it. Never let it infer its inputs.
3. If the gate needs browser evidence, capture it first:
   ```bash
   node .agents/tools/preview.mjs --out .specs/<NNNN-slug>/evidence
   node .agents/tools/check-reduced-motion.mjs
   ```
4. On rejection, route to the `tech-lead` for triage — never directly to another agent.
5. Confirm the agent updated `STATUS.md`: gate state, run number, next agent, decisions log. An artifact without that update is invisible to the rest of the pipeline.
6. Report the verdict in one or two lines.

Same rules as `/feature`: two bounces per gate, reviewers never edit source, human approval before anything touching the remote. Re-running `law` or `law-check` on a spec whose `legal.md` changed means the downstream gates are stale — say so rather than declaring the spec green.
