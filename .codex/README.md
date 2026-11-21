# WorkLoad Codex integration

- The root `AGENTS.md` remains the shared project contract.
- Existing skills in `.agents/skills/` are shared with Codex without conversion.
- Claude squad roles in `.agents/agents/*.md` have Codex-native definitions in `.codex/agents/*.toml`.
- Claude slash commands in `.agents/commands/` have Codex skill equivalents: `$workload-feature`, `$workload-gate`, `$workload-learn`, and `$workload-squad-status`.
- Project agent concurrency is capped at four to match the pipeline's largest parallel gate. No model, sandbox, or approval defaults are imposed here.
