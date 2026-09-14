# CLAUDE.md

**Read `AGENTS.md` at the repository root before doing anything.** It is the single source of truth for this project: stack, the ten-agent squad, the pipeline, the spec-driven workflow in `.specs/`, code rules, quality bars, and git conventions.

Nothing project-specific is duplicated here — if it is not in `AGENTS.md`, it is not a rule.

Claude Code specifics:

- Agent definitions in `.claude/agents/` are symlinks into `.agents/agents/`. Edit the target, never the link.
- Skills in `.claude/skills/` are symlinks into `.agents/skills/`. Same rule.
- Slash commands live in `.agents/commands/`, symlinked into `.claude/commands/`. Start a feature with `/feature`.
