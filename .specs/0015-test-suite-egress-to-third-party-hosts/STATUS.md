# 0015 — Status

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** in-progress
**Next agent:** labor-law-analyst (G2, blocking)
**Bounces:** none

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| spec | product-manager | pass | 1 | `spec.md` |
| law | labor-law-analyst | pending | 0 | `legal.md` |
| design | product-designer | pending | 0 | `design.md` |
| copy | content-writer | pending | 0 | `copy.md` |
| plan | tech-lead | pending | 0 | `plan.md` |
| build | frontend-dev | pending | 0 | tasks below |
| qa | qa-engineer | pending | 0 | `reports/qa.md` |
| audit | web-standards-auditor | pending | 0 | `reports/audit.md` |
| release | release-manager | pending | 0 | `reports/release.md` |
| preview | web-standards-auditor | pending | 0 | `reports/audit-preview.md` |

**Note on `design` and `copy`.** `spec.md` § Disclosure obligations records that the count of
user-visible strings this spec creates, changes or deletes is **zero**, and AC4 makes that
falsifiable by a zero-diff over `app/`, `components/`, `lib/` and `hooks/`. Whether G3 therefore
runs as `n/a` is `tech-lead`'s routing call at G4, not this gate's — a gate is never marked `n/a`
by the agent that would benefit from skipping it.

## Tasks

| Id | Title | State |
|---|---|---|

## Blockers

None. **L1–L5 are open and blocking at G2** — no norm, article, period or rate is asserted anywhere
in `spec.md`, by design.

## Routed items — owned by `tech-lead`, not resolved here

| # | Item | Why it is routed |
|---|---|---|
| **R1** | **Sequencing against `0014`.** Both specs edit `playwright.config.ts` and `.github/workflows/ci.yml`, at **disjoint lines**: `0014` at `playwright.config.ts:65` and `:22-35`, `ci.yml:83`, `:139`, `:146`; `0015` at `playwright.config.ts:66-67` and `ci.yml:84-85`. `0014`'s **AC5** subtracts the AdSense symbols **by symbol, not by path**, so the two are compatible as written — but only if they land in a known order. | Merge order and task decomposition are `tech-lead`'s. |
| **R2** | **`0010`'s late-settle geometry.** Blocking the creative removes the 100 → 390 px growth that `0010` A5.4(i) already accounted for by binding every read to the early settle point. Whether `0010` re-measures anything is `0010`'s, via `tech-lead`. | `spec.md` § Out of scope 6 forbids this spec from touching `0010`. |
| **R3** | **`0011` F1 / `0014` L4 — the production consent gate on ads.** Named in `spec.md` § Disclosure obligations and excluded by § Out of scope 1. If G2 wants to rule on it, the ruling lands in `0014`, not here. | Two specs asking one question is how a ruling gets two answers. |
| **R4** | **The suite-level red baseline was not measured at G1.** `uptime` read load average **21.98 on 16 cores** with four sibling `next-server` processes live (ports 3100, 3424, 3917, 4941), and `AGENTS.md` §4 rule 6 forbids a build or browser run under those conditions. **AC2 is written to take it before the remedy exists**, in an isolated copy. | It is a G4/G5 ordering constraint, and it is the one number this gate could not produce. |

## Decisions log

| When | Agent | Decision |
|---|---|---|
| 2026-09-19 | product-manager | **`0014` is not widened; `0015` is opened.** `0014` § Out of scope 1 already excludes the AdSense boundary in all ten of its files, naming `playwright.config.ts:66-67` and `ci.yml:84-85` explicitly, with an override **bounded** to `ad-manager.tsx:10-19` and verified by its AC12. Test-time egress is neither that path nor that file range, so folding it in would contradict `0014`'s own exclusion and interact with its AC5's by-symbol subtraction. |
| 2026-09-19 | product-manager | **The routed note's line references were corrected by re-running the search** (`spec.md` E2). The note named `playwright.config.ts:66` and `ci.yml:82-85`; the run returns a **pair** in each place — `:66-67` and `:84-85` — because `NEXT_PUBLIC_ADSENSE_ID` is as load-bearing as `NEXT_PUBLIC_ENABLE_ADS` (`ad-manager.tsx:8,21` requires both). A remedy written against one line would leave the other half of the condition standing. |
| 2026-09-19 | product-manager | **The mechanism was re-derived, not inherited** (`AGENTS.md` §5, *How a finding routed from another gate is inherited*). `0010` measured a 100 → 390 px slot growth and **inferred** outbound access; this gate measured the access directly — the exact URL `ad-manager.tsx:15` builds returns **HTTP 200, 206,623 bytes** from this environment (E5) and **connect failure, 0 bytes** with the host unreachable (E6). The carried number is `0010`'s; the causal sentence is now this spec's own. |
| 2026-09-19 | product-manager | **The domain is a test over hosts, not the enumeration `{pagead2}`** (`AGENTS.md` §5, *How a rule's domain is defined*). Stated as *every request whose host is not the application's own origin*, because a URL grep alone cannot define it: Google Analytics has **no literal URL** in the tree — it arrives through `@next/third-parties` — so a list built from `grep` would have missed one of the two members that exist today (E4). |
| 2026-09-19 | product-manager | **Turning ads off in the test build is recorded as a non-goal, not as the remedy.** `NEXT_PUBLIC_ENABLE_ADS="false"` would satisfy AC1 and break AC3: `ad-manager.tsx:21` returns `null`, the `<ins>` never renders, and the guard protecting `PRODUCT.md` §8's *"ads never sit between the user and an answer"* would pass against a page with no ad in it — the vacuous-pass shape `AGENTS.md` §5 names. The mechanism is left to `tech-lead`; the constraint is written down. |
| 2026-09-19 | product-manager | **Lesson 002 applied to a comment rather than a pt-BR string.** `ci.yml:133-136` asserts *the suite asserts ad behaviour* and *the third-party cookie costs five points of best-practices*; this spec reopens the conditions both describe, so **AC6** requires each clause to be either still true of the delivered tree or rewritten. Recorded because the lesson's usual subject is a user-visible string and this one is not. |
