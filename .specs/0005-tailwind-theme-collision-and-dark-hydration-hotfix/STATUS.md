# 0005 — tailwind theme collision and dark hydration hotfix

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** done
**Next agent:** none — closed at **G10** by `tech-lead` on 2026-09-15. Every gate ran and every gate
passed: G1 spec (run 2, amended), G2 law, G3 design (run 2, after B8), G4 plan, G5 build (T1-T9),
G6 all four reviewers in parallel, G7 docs, G8 seven commits on `fix/design-taste-preflight` with
PR #39 open and CI green, G9 both preview gates against the deployed Vercel artifact. Nothing in
this spec is open; the three findings it surfaced and does not own have owners and landing places
in § G10 below.
**What shipped:** the named `--spacing-*` namespace is deleted and its consumers migrated to the
numeric scale, so the four collapsed surfaces resolve against `--container-*` again (footer
358/768px, consent dialog 358/512px, both themes, both routes, verified on the deployment); the
granular-consent rows stack below `sm`; both theme glyphs are server-rendered and toggled by the
`.dark` class, so React #418 no longer fires on a cold dark load. Three permanent guards keep it
shut — the `--spacing-<non-numeric>` namespace test, the two-sided layout floor in
`responsive.spec.ts`, and the dark-theme e2e project. `pnpm check` (58 files, 504 tests), `pnpm
build`, `pnpm e2e` (98 tests, 4 projects) and `pnpm test:coverage` (lib/hooks 100%, app/components
>= 99.59%) green on the shipped tree.
**Bounces:** 2, on two different gates, neither at its ceiling. `spec` (G1) 1 of 2 — run 1 -> run 2,
prose only, lesson **019** written. `design` (G3) 1 of 2 — **B8**, one sentence in §6.1, prose only,
no geometry, no token, no re-run of G2; resolved at run 2, lesson **022** written. No criterion
relaxed, no scope widened.
**Merge block:** **lifted** — the condition imposed at the 0002 G6 triage (merging #32->#37 would
ship a 64px `PRODUCT.md` §4 legal disclosure) is discharged. The evidence, and the one condition
that survives it, are in § G10.
**Historical note:** the in-flight narrative that stood here (the AC6 dark-theme contamination
reading, the `comment-free-code.test.ts` exception, the deliberate T2->T7 red `pnpm e2e`) is
preserved in the gate table below, in § Decisions log and in `reports/qa.md`.

## G7/G8 — docs gate and release (`release-manager`)

**G7 verdict: pass.** `node .agents/tools/docs-check.mjs` ran clean after one fix: lesson 021's own
body tripped the script's leftover-template-placeholder regex (`<[a-z ]+>` matched the illustrative
`--spacing-<name>` inside its own prose) — reworded to `--spacing-*` per the lesson's own rule 1
("reword the mandated text into a form the pattern is blind to"), re-ran, zero failures. The three
remaining warnings (`design.md`, `plan.md`'s `<non-numeric>`, `copy.md`'s `<file backing any factual
claim>`) are verified false positives, not unfilled templates: the first two are the guard's own
generic-pattern illustrations, already run through `docs-check`'s regex here and confirmed benign;
`copy.md` is the untouched template stub because the `copy` gate was correctly never invoked (no
user-visible string changed). Full truth-check, lessons and commit-by-commit detail in
`reports/release.md`.

**G8 status: five commits staged and independently verified, human approval pending before push.**
Each commit was checked out in an isolated `git worktree` (never the shared tree) and run through
`pnpm typecheck`/`pnpm lint`/`pnpm test`/`pnpm build`; the fourth (D2's fix) additionally ran the
full `pnpm e2e` (98/98 green, closing AC1/AC7/AC8/AC9 for good). See `reports/release.md` for the
subject, file list and verification of each. **The merge-block condition from the G6 triage brief
is lifted as of this commit stack**: `main`'s footer resolves against stock `--container-3xl`
(768px) and 0005's own footer now resolves the same way, so the PR stack no longer ships a 64px
`PRODUCT.md` §4 disclosure once these commits land and merge.

Two items carried forward, not fixed here (deliberately, per the brief): the `lib/utils.ts`
comment removal is its own commit (`chore(comments): ...`), separate from every 0005 commit, so
AC11 ("no unrelated file changed") holds against the 0005 commits themselves. DS3
(`components/organisms/salary-calculator.tsx:125`, ≈24.3 chars/line at 390) and 0002's B6 remain
open, owned by `product-manager` — see `reports/release.md` § Carried findings.

## G10 — compound gate (`tech-lead`)

**Verdict: pass. Spec closed.** Read `AGENTS.md` §6 and the whole ledger before touching it; the
three parts below are the lessons, the triage of what G9 handed over, and the merge-block ruling.

### 1. The ledger

Seven lessons were written during this spec by five agents (017-023, several concurrently). Each
was checked against what actually happened in this tree, not against its own account of it.

**Promoted — into `AGENTS.md` §5, "How a criterion is written", and archived:**

| # | Rule | Why it promoted |
|---|---|---|
| 006 | State a prohibition as the search over the whole boundary it names, never as a file and a line | 3rd confirmation here: B5's ruling at G4 restated AC12 over the whole of `DESIGN.md` and moved it from a `grep` into `__tests__/spacing-guards.test.ts` cases 4-5, which is the only reason B8 was found at all. Applied this cycle by `product-manager` (G1), `tech-lead` (G4) and `release-manager` (G7) — it stopped being one agent's lesson |
| 012 | Never name a verification command that has not been run in this tree, by the agent naming it | 3rd confirmation here: `product-manager` refused to write criteria against the unrunnable `pnpm e2e` (B1) at G1, and `tech-lead` landed the instruments and required them seen red before the fix at G4. **Lesson 008** (`tech-lead`: "a tool the repo ships is not a tool that works here") is the same rule from the plan's side and was merged into it before promotion — `check-reduced-motion.mjs`'s Radix-only phase at G6 is 008's case and 012's rule |

**Merged:** **021** (`tech-lead`: run a guard's pattern against the texts already mandated for its
file) into **022** (`product-designer`: run mandated text through the guards that read its
destination). B8 is one boundary with two authors, and two lessons that each see one side of it
teach the next agent to check only the side it happens to be standing on. 022 now carries both
directions, applies to `all`, and keeps the confirmation B8 earned when `docs-check.mjs`'s own
placeholder regex tripped on lesson 021's body at G7 and the fix was a rewording, not an exception.

**Confirmed, not yet promoted:** 005 (+2 — the designer measured advance widths out of the `woff2`
`next/font` actually emits, and the law gate read the compiled CSS artifact rather than the `@theme`
block that generates it), 013 (+1 — B1 ruled environmental and fixed at T1 rather than worked
around; the auditor proved no listener on 3000/3100 before each run), 015 (+1 — G6 audited the
production build under an emulated dark `colorScheme`, which is the only configuration D2 was ever
visible in), 016 (+1 — the two-sided floor it asked for shipped in `responsive.spec.ts` and was seen
red first), 017 (+1 — D2's cascade was compiled against Tailwind 4.3.3 with this repo's own
`@custom-variant` before the remedy was named), 019 (+1 — `release-manager` ran its own verification
method over the amended § Out of scope at G7).

**Retired for staleness: none.** No ruling this cycle contradicted a standing lesson, and none was
made obsolete by the refactor. Checked, not assumed: B2's ruling (`getBoundingClientRect().width`)
is what 023 itself now prescribes, and 018's rendering condition is what `legal.md` LR1-LR4 became.

**Kept, deliberately, though they are adjacent:** 018 and 023 are both `labor-law-analyst`/law and
both about writing a rule that a browser can answer — but one decides *that* a disclosure carries a
measurable rendering condition and the other pins the *units* it is written in. Merging them would
lose the half that is not being applied at the moment someone reaches for the file. 020 stays too:
nothing in `AGENTS.md` or in the `tech-lead` definition already mandates that a task's "Done when"
be satisfiable from that task's own file list, which is the clause this spec's own `plan.md` broke
twice (T4, T5) and paid for in two developer round trips.

**Every bounce has its lesson.** G1's bounce → 019 (`product-manager`). G3's bounce (B8) → 022
(`product-designer`). The two plan defects the developer found in its own proof and could not
satisfy → 020 and 021 (`tech-lead`, mine). The law gate's own two → 018 and 023. `frontend-dev`
owes none: it was never rejected — it flagged and stopped, which is what rule 7 asks for.

**Active ledger: 20 / 30**, down from 23, with one (024) written concurrently at 0006's G2 and not
part of this cycle.

### 2. Triage of what G9 handed over

| Finding | Severity | Lands in | Owner | Why there |
|---|---|---|---|---|
| `og:image`/`twitter:image` resolve to the Vercel git-branch-alias host instead of `metadataBase` (`app/opengraph-image.tsx`, `app/twitter-image.tsx`; `app/layout.tsx:16` sets the base every other absolute URL on the page honours) | moderate | **`.specs/0004-lcp-render-delay/`**, as a second, independently falsifiable criterion — not its own spec | `product-manager` (G1) | 0004 is unbuilt, is the only open spec whose subject is what `app/`'s document head and first paint emit **on a real deployment**, and already runs the instrument and the gate that can see this (`web-standards-auditor` at G9). A new spec costs ten gates, a legal analysis and a design pass for a metadata base URL that changes no number. Bounded so it cannot dilute 0004: the LCP criterion and the metadata criterion are separate criteria, a partial pass is still a rejection (`AGENTS.md` §4 rule 1), and 0004's title and scope sentence are amended at G1 so the INDEX row does not lie about what the spec contains |
| Lighthouse `best-practices` 0.79 and `seo` 0.66 below the 0.98 budget on the preview, caused solely by Vercel's `vercel.live` feedback script and the platform's `x-robots-tag: noindex` header | informational | **the measurement procedure, not the budget** — written into `.agents/agents/web-standards-auditor.md` § Workflow — G9 | `web-standards-auditor`, from its next run | Lowering the budget to fit a preview host would hide a real regression in production, where neither cause exists. `.lighthouserc.js` is unchanged. What changes is what G9 is allowed to conclude: on a `*.vercel.app` host these two categories are measured and reported but not scored against the budget, **and only after the attribution is proved per failing audit** — every `details.items` entry naming a platform origin or a platform response header, and the repo grepped clean of the directive. If one item names the app's own origin, it is a finding again |
| `lib/legal-tables.ts:48` `sourceUrl` points at a commercial aggregator rather than the primary text | major | **`.specs/0003-citation-registry/`**, already tracked there as F4 | `product-manager` (G1), then `labor-law-analyst` | The finding is not new — it is 0002's B6/F4, now flagged a third time (0002 G2, 0005 G6, 0005 G9) by the gate that owns it. 0003 exists for exactly this file and this class of defect; the only thing missing was the record that the law gate has now seen it on the deployed artifact, which is in 0003's STATUS |
| DS3 — `AlertBanner`'s chrome leaves ~24.3 characters per line at 390, below `legal.md` LR2's floor of 40 | major, pre-existing | **`.specs/0006-salary-alert-legibility/`**, already open and at G2 | `labor-law-analyst` | Carried out of G6, re-measured on the deployment at G9 (242.00px, 97 chars / 4 line boxes), and `reports/legal.md` §G9.7 states its acceptance baseline. Nothing further owed by this spec |

### 3. The merge block

**Discharged.** The block was imposed at the 0002 G6 triage for one reason and one reason only:
PR #35 introduced the `--spacing-*` collision, and merging the stack as it stood would have put a
64-pixel `PRODUCT.md` §4 legal disclosure into production. That condition is now false, on evidence
rather than inference:

- `main` never had the defect — it declares no `--spacing-<name>` key and its footer resolves
  against stock `--container-3xl` (768px), re-verified by `labor-law-analyst` at G6.
- The shipped branch resolves the same way through the numeric scale: footer 358/768px and dialog
  358/512px, measured by the law gate at G6 on a production build and **reproduced at G9 on the
  deployed artifact**, both routes, both themes, 390 and 1440. The `PRODUCT.md` §4 paragraph reads
  at 52.4-56.7 characters per line, above LR2's floor of 40, and LR3 holds against the raw HTTP
  response body rather than the hydrated DOM.
- Repopulating the namespace now fails `__tests__/spacing-guards.test.ts` on every PR, so the block
  does not have to be re-imposed by memory.

**The one condition that survives:** the block is lifted for the stack **with PR #39 at its tip**.
Merging any subset that excludes 0005's commits — #35 through #37 on their own — re-arms the exact
defect the block existed to stop. Merge the stack whole, or not at all.

Nothing else raised since is of blocking severity: the `og:image` host and DS3 both ship with the
stack, both are pre-existing, both are routed above, and neither touches a number or a disclosure's
legibility. The merge itself remains a human-approval point (`AGENTS.md` §10); G10 lifts the
engineering condition, it does not authorise the remote operation.

---

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| spec | product-manager | **done** | 2 | `spec.md` — run 2 is the **B4 amendment, accepted**: § Out of scope now permits the granular-consent rows to stack below `sm` and bounds that permission to a flow-direction change on two rows; AC2 and AC3 are raised onto LR1/LR2/LR4 rendered geometry (the law gate's own instruction); AC6's exemption names the stack; L4 added to § Legal dependencies; two non-goals fence the dialog and DS3. No scope widened, no criterion relaxed, G2 and G3 not re-run |
| law | labor-law-analyst | **pass** | 1 | `legal.md` — no number, no rate, no string changes, and the gate ran anyway: the collision collapses the `PRODUCT.md` §4 disclosure (`calculator-views.tsx:73`) and the granular consent dialog (`cookie-consent.tsx:85`). Sets binding rules **LR1-LR4**; asks AC2/AC3 to assert rendered geometry, not computed `max-width` |
| design | product-designer | **pass** | 2 | `design.md` — run 1 was **ratification, not redesign**: token deletion ratified, mapping exhaustive and 1:1 (§2.1); geometry of the four surfaces at four viewports in both themes (§3-§4); `DESIGN.md` §§393-559 replacement text (§6); D2 given an observable first-paint criterion (§7); no new token; one 390-only pixel change compelled by LR2 (§3.3.1); Q1-Q5 routed. **Run 2 is B8 and nothing else**: §6.1's mandated blockquote gives up its two retired-token literals — "a key in that namespace", "declaring one named `3xl`" — and keeps the teaching clause byte for byte. Validated against case 4's regex (→ `[]`) before landing. No geometry, no token, no other subsection |
| copy | content-writer | **not required** | — | No user-visible string changes |
| plan | tech-lead | **pass** | 1 | `plan.md` — nine tasks, T1-T9, each one seam with its files, its acceptance criterion and its verification command. Migration ruled a **single mechanical sweep with a closed prefix list** (§4.1), proved by a **line-wise substitution proof** plus a **structural-path geometry diff** (§4.2); D2 ruled **CSS `dark:` on `display`**, compiled (§4.3). Rulings on **B1-B7** in §3. No new dependency, no `--container-*` declaration, `lib/` and `hooks/` untouched |
| build | frontend-dev | **done** | 1 | T1-T9 all done. `reports/qa.md` carries every task's evidence. One named, out-of-scope red (`comment-free-code.test.ts`) — see § Decisions |
| qa | qa-engineer | **pass** | 1 | `reports/qa.md` — full gate re-run myself, not taken on the developer's word: `pnpm lint`/`typecheck`/`test` (58 files, 504 tests)/`build`/`pnpm e2e` (98 tests, 4 projects) all green; coverage confirmed **per area** from `coverage/lcov.info` (lib/hooks 100%, app/components ≥99.59%), not the aggregate line. **AC1/AC4/AC5/AC7/AC8 independently reproduced in an isolated worktree off HEAD** (pre-fix: guard test 5/5 red, V1/V2/V4 = 13/4/5, disclosure-legibility 16 red + responsive floor 1 red, dark-hydration 4 red naming React #418; post-fix: all green). **AC6 re-derived from the raw JSON dumps, not the printed summary**: 96 permitted/1416 rejections confirmed, 100% of rejections in dark combos and 100% "one-side-only" (0 real deltas on a matched path) confirming D2's before-dump contamination is structural, not geometric (pre-fix dark `/` dump: 212 elements, no `main:nth-child(5)` path at all); after-dump light-vs-dark cross-check recomputed independently: exactly 5 diffs per combination, all in the two theme-toggle glyphs. **Ruling: the dark-theme substitution is accepted for AC6** — see reports/qa.md's own section, agrees with `labor-law-analyst`'s framing (LR1-LR4 are absolute and already measured directly in dark; AC6 is the relative claim the substitution stands in for). Four findings, none blocking: F1/F2 two sets of narrating comments under the now-settled §8 rule (`scripts/*.mjs`, and a pre-existing one in `playwright.config.ts` not counted against this build); F3 `lib/utils.ts`'s comment-removal must be kept out of 0005's own commit at G7/G8 for AC11 to hold (corroborates `labor-law-analyst`'s own F1) — routed to `tech-lead`/`release-manager`, not a rejection; F4 a Tailwind-class locator (`p.text-caption`) in `disclosure-legibility.spec.ts:142` that would not fail if a future type-step rename regressed DS4's captions. Lesson not written — no gate was rejected. |
| law (G6) | labor-law-analyst | **pass** | 1 | `reports/legal.md` — **LR1–LR4 verified by my own measurement**, not by reading the developer's table: DS1 358/768px at 52.4–56.7 cpl, DS2 308/667px at 44.7 cpl, DS4 358/512px with every caption on one line box and every choice control inside the panel — **identical in light and dark**, both routes, both viewports, production build. Compiled CSS artifact read directly: all four `max-w-*` now resolve to `--container-*`, `--spacing:.25rem` is the only surviving spacing key. **B2, B3, B9 all ratified as implemented** (§5). **B6/DS3 confirmed and ruled non-blocking** (§6) — 24.3 cpl at 390, a real LR2 failure, carried to `product-manager` with its numbers. Three findings, none a rejection: F1 `lib/utils.ts` modified in the tree (AC11 evidence stale, no number touched), F2 the `sourceUrl` aggregator (carried, out of reach), F3 a defect in my own LR4 text, corrected here. Lesson **023** written |
| audit | web-standards-auditor | **pass** | 1 | `reports/audit.md` — production build (not `next dev`), `colorScheme` emulated dark/light, both routes, 390/1440/2560/3840. **Zero `pageerror`/console error** confirmed independently via `dark-hydration.spec.ts` (4/4) and `preview.mjs` against a pre-started production server (0 axe violations at any severity, 8/8 captures). **D2's `design.md` §7 first-frame criterion verified clause-by-clause**: both glyphs server-rendered, `display`-only toggle, 0 layout-shift entries, static accessible name, no live region, mount-guard family structurally absent, `setTheme`-updater regression confirmed not reintroduced (keyboard `Enter` flips theme on the first press). **Four repaired D1 surfaces** measured directly (footer 768px/358/768/864px at the four widths; ad slot 768px; DS4 512px per `reports/legal.md`; reset dialog 448px/358/448px) — all match `design.md`/`legal.md`. **Lighthouse**: perf 0.97/0.97, a11y/BP/SEO 1.00/1.00 on both routes (budget 0.93/0.98/0.98/0.98), LCP 2.6s, CLS 0–0.001, zero assertion failures — no regression against 0002's baseline. Metadata/sitemap/robots/manifest/structured-data all correct. Layout clean at all four widths, both routes (390/1440 automated, 2560/3840 automated on `/` + manual on `/custo-da-hora`). Reduced-motion: no `hover:`/`focus:` transform utilities exist in the migrated classes (nothing to fail); the CSS-transition dialog path is correctly neutralized; B7's `motion`-library gap re-confirmed pre-existing and untouched by T6. Six informational/minor findings, none blocking: AC11 (`lib/utils.ts`) confirmed still live in the tree, already tracked as F3/F1 by qa/law — not this gate's to fix; `check-reduced-motion.mjs`'s Radix-specific overlay phase does not run against this app's native `<dialog>`; a transient, non-reproducible 8-test e2e flake under cold-cache full parallelism (0/98 on clean re-run); the D3 layout guard's route scope (`/` only, manually confirmed equivalent on `/custo-da-hora`) |
| ponytail | refactor-scout | **pass** | 1 | `reports/ponytail.md` — no findings. Both `scripts/geometry-dump.mjs` and `scripts/spacing-migration-proof.mjs` (AC6's two required proofs) ruled load-bearing, not scaffolding, and correctly not wired into `pnpm check` (the recurring guard is `__tests__/spacing-guards.test.ts`, which is). D2's fix confirmed as the small CSS version the G4 ruling specified — no state machine, no mount guard. Migration checked complete with no residue: no retired suffix survives, no `--container-*` reintroduced, no new interface/class/Factory in the diff. No new dependency. One pre-existing, no-severity note on a concurrent comment-stripping artifact in `lib/utils.ts`/`google-ad.tsx`, already named in this file's own decisions log and not an over-engineering question |
| release | release-manager | **pass (G7); commits staged, awaiting human approval for push (G8)** | 1 | `reports/release.md` — `docs-check.mjs` clean after fixing lesson 021's own false-positive placeholder trigger; five commits, each verified in an isolated worktree (`pnpm build`/`check` green on every one, `pnpm e2e` 98/98 at the fourth); `.specs/INDEX.md`'s holder corrected; `.agents/memory/archive/019-probe.md` flagged, not committed |
| law (G9) | labor-law-analyst | **pass** | 1 | `reports/legal.md` § "G9 — verification against the deployed preview" — measured against `https://workload-8kqr9212j-devrmas-projects.vercel.app/`, both routes, both viewports, both themes, in a real browser. **Every LR1–LR4 number from G6 reproduced exactly on the deployed page**: DS1 358/768px at 52.4–56.7 cpl (P3, the gap list, 419 chars / 8 line boxes at 390); DS2 308/667.33px at 44.7/67.0 cpl; DS4 358/512px with all three choice controls inside the panel on all four edges and the telemetry `switch` exposing "Telemetria (Google Analytics)" through `aria-labelledby`. LR3 verified against the **raw HTTP response body** of both routes, not the hydrated DOM — all four footer paragraphs, the citation and the source link present before any script runs. **No number changed**: the deployed calculator re-derived by hand from `LEGAL_YEAR_2026` — INSS R$ 248,60 on R$ 3.000,00 (7,5/9/12 % progressivo), líquido R$ 2.751,40, hora R$ 12,51 (divisor 220, Súmula 431), hora noturna reduzida +0h13m (52min30s, art. 73 §1º), adicional noturno 20 % R$ 4,68, extra 50 % R$ 14,66 (art. 59 §1º), DSR R$ 2,98 (Súmula 172) — all to the centavo. **DS3 re-measured on the preview: 242.00px, 97 chars / 4 line boxes = 24.3 cpl at 390; 601.33px and 48.5 cpl at 1440, identical in both themes** — confirmed LR2 failure, pre-existing, ruled non-blocking again, and §G9.7 states the acceptance baseline for the `alert-banner.tsx` spec. Two findings, both carried from G6, neither a rejection: G9-F1 (DS3) and G9-F2 (`lib/legal-tables.ts:48` aggregator `sourceUrl`). No lesson — no gate rejected |
| preview | web-standards-auditor | **pass** | 1 | `reports/audit-preview.md` — measured against `https://workload-8kqr9212j-devrmas-projects.vercel.app`, both routes, both themes, 390/1440/2560/3840. **Every G6 number reproduces on the deployed artifact**: 0 axe violations (8/8 combinations), 0 `pageerror`/console error (8/8 pageerror combinations + 4/4 D2 first-frame reads), `design.md` §7's first-frame criterion holds clause by clause (both glyphs server-rendered, correct glyph already `display:block` at `domcontentloaded`, 0 header-attributable layout shift), LR1/LR2 (DS1) and LR1/LR4 (DS4) all pass at 390/1440 both themes both routes (358/768px footer, 358/512px dialog, all three DS4 controls in-viewport/in-dialog with the telemetry switch's `aria-labelledby` name resolved), contrast unchanged (4.84/5.74:1), layout clean 16/16 (390/1440/2560/3840 × both routes × both themes, now fully automated rather than partly manual). Lighthouse on the real network: perf 0.98/0.98, a11y 1.00/1.00 (both clear budget with margin), LCP 2.29–2.44s (better than G6's local 2.6s), CLS 0–0.0003. Best-practices 0.79 and SEO 0.66 miss the 0.98 budget, both traced to platform-injected causes (Vercel's `vercel.live` preview toolbar script, and the preview-only `x-robots-tag: noindex` header) confirmed absent from the app's own code and from what production will serve — not counted against this spec. One moderate, out-of-0005's-scope finding newly visible only on a real deployment: `og:image`/`twitter:image` resolve to a Vercel git-branch-alias host instead of `metadataBase`, routed to `tech-lead` (files predate 0005, added earlier in the PR stack). Discarded the interrupted prior attempt's `evidence/preview-after/` — it audited `localhost:3227`, not the deployment. No lesson — no gate rejected |
| compound | tech-lead | **pass** | 1 | this file § G10 — lessons promoted and merged, triage of everything G9 handed over, spec closed. `docs-check.mjs` clean |
| recruiter | tech-recruiter | not required | — | `AGENTS.md` §3: this squad has no `tech-recruiter`; the seat belongs to `labor-law-analyst`, which ran at G2, G6 and G9 |

---

## Tech-lead triage brief (G6 of 0002, run 1)

Source: `.specs/0002-design-taste-preflight/reports/audit.md`, Critical #1 and #2. Both confirmed
pre-existing relative to 0002. Both verified independently by me before this ruling.

### D1 — the `@theme` spacing scale shadows Tailwind's container scale

**Confirmed, and the auditor's stated mechanism is confirmed with one correction that changes the
remedy.** I compiled Tailwind 4.3.3 (the installed version) against a minimal `@theme` and read the
generated CSS:

```
--spacing-3xl: 4rem;  --container-3xl: 48rem;   →  .max-w-3xl { max-width: var(--spacing-3xl) }
--spacing-md:  1rem;  --container-md:  28rem;   →  .max-w-md  { max-width: var(--spacing-md) }
(no --spacing-4xl)                              →  .max-w-4xl { max-width: var(--container-4xl) }
```

**`--spacing-<name>` wins over `--container-<name>` even when the container key is explicitly
declared.** So "declare the container scale explicitly" — the obvious fix — **does not work**. It
is the option that would have left the trap armed *and* looked fixed. Anyone re-deriving this
without compiling would have picked it.

`app/globals.css:69-76` declares `--spacing-hair|xs|sm|md|lg|xl|2xl|3xl`. Seven of those eight names
collide with Tailwind's container scale (`3xs 2xs xs sm md lg xl 2xl 3xl 4xl 5xl 6xl 7xl`), so
**every `max-w-<name>`, `w-<name>`, `min-w-<name>`, `basis-<name>` and `size-<name>` in this repo
silently resolves to a spacing value**. Four sites are live today; the trap fires for the next one
written, too.

**Not in production.** `git show main:app/globals.css` has no `--spacing-3xl`; `main`'s footer is
`max-w-3xl` against stock Tailwind and measures 768px. The defect entered with **PR #35
`feat/design-system`** and lives only inside the unmerged stack. Nothing is shipping a 64px legal
disclosure right now — **merging the stack is what would ship it.**

**Root fix (mine to set; the mechanism, not the symptom): delete the named `--spacing-*` keys and
use the numeric spacing scale Tailwind already derives from `--spacing: 0.25rem`.** Every value is
an exact multiple of the 4px base, so the mapping is one-to-one and **no rendered pixel changes**:

| token | value | replacement | usages |
|---|---|---|---|
| `--spacing-hair` | 0.125rem | `0.5` (`p-0.5`) | — |
| `--spacing-xs` | 0.5rem | `2` | 28 |
| `--spacing-sm` | 0.75rem | `3` | 22 |
| `--spacing-md` | 1rem | `4` | 44 |
| `--spacing-lg` | 1.5rem | `6` | 40 |
| `--spacing-xl` | 2rem | `8` | 25 |
| `--spacing-2xl` | 3rem | `12` | 3 |
| `--spacing-3xl` | 4rem | `16` | 2 |

~204 utility occurrences across `app/` and `components/`, plus five arbitrary values that read
`var(--spacing-lg|md|xl)` inside `calc()`/`max()` (`cookie-consent.tsx:44,160`,
`calculator-views.tsx:41,65`, `calculator-layout.tsx:18`) which become
`calc(var(--spacing)*6)` etc. Mechanical, one commit, zero visual diff — which is exactly what
makes it verifiable: the preflight screenshots must be pixel-identical except the four broken
widths.

Why this over renaming to non-colliding semantic names (`--spacing-s1..s8`, `--spacing-gutter`…):
the named scale was duplicating a platform feature that was already there (`--spacing` multiplier),
and a replacement namespace is a namespace that can collide again tomorrow. Deleting it empties the
namespace, so **the collision cannot be re-armed** — and the guard below makes re-arming a test
failure rather than a discovery.

**This is not a design change and does not re-open `design.md`.** `product-designer` ratifies the
naming and rewrites `DESIGN.md`'s spacing section (§393-395, §397, §403, §492, §501, §542, §559
reference the old token names) so the doc matches what ships — the same shape as 0002's T10. If
`product-designer` wants different names, that is theirs to say at their gate, provided the names
cannot collide with `--container-*`.

**The guard that makes it impossible, not merely absent:** a unit test over `app/globals.css` that
fails if the `@theme` block declares any `--spacing-` key whose suffix is not numeric. Nine lines,
no browser, runs in `pnpm check`. Without the guard this is a fix; with it, it is a rule.

### D2 — React #418, production build, dark system theme

**Not verified by me at the DOM level, but there is a prime suspect and the diagnosis task must
falsify it before writing any fix.** `components/organisms/app-header.tsx:66` branches its icon on
`resolvedTheme` with no mounted guard:

```tsx
{resolvedTheme === "dark" ? <IconSun/> : <IconMoon/>}
```

Server renders `resolvedTheme === undefined` → `IconMoon`. `next-themes` 0.4.6 resolves the theme
during the **first client render**, so with a dark system scheme the client's first tree is
`IconSun` — a mismatch that exists **only when the system theme is dark**, which is precisely the
reported trigger. `suppressHydrationWarning` on `<html>`/`<body>` does not reach a child element.
`app-header.tsx` is identical on `main`, so **D2 is live in production today** — unlike D1.

Owner: `frontend-dev`, with the diagnosis step written as its own task and its own evidence, ahead
of any edit. If the falsification confirms line 66, the fix climbs the ladder to CSS: render both
icons and toggle with `dark:` / `not-dark:` utilities — no state, no mount flash, no `useEffect`,
and it keeps working with `attribute="class"`. The `onClick` handler must stop reading
`resolvedTheme` too (`setTheme(t => ...)` / read from the DOM class), or the first click after
hydration flips the wrong way. If the falsification clears line 66, the finding comes back to me
before anyone edits `layout.tsx`.

**CI reproduction, which is the real deliverable:** `playwright.config.ts` already runs
`pnpm start` under `CI`, so a fourth project with `colorScheme: "dark"` and a `page.on("pageerror")`
listener over both routes reproduces it on every PR. Locally the same config runs `pnpm dev`, which
is exactly the mode that hid this for two specs — so the local `webServer.command` becomes the
production build as well. A spec that only fixes the icon and leaves `pnpm e2e` looking at `next dev`
has fixed the incident and left the blind spot.

### D3 — the blind spot (the finding that outlives both defects)

Nothing in this repo can see an element that collapses **inward**. `responsive.spec.ts` asserts no
overflow and no control off-viewport; Lighthouse scores colour and weight; `preview.mjs` photographs
the page and compares nothing. A layout assertion bounded on one side only is half an assertion.

Closes it, in `tests/e2e/responsive.spec.ts` (the only candidate that runs on every PR —
`evidence/preflight-matrix.md` is a document and documents do not fail builds): at 390 and 1440, no
block-level element in `main`/`footer` holding more than 80 characters of text may compute a width
below 240px. General over the class of defect, not pinned to the four known sites, and it fails
today on the footer that carries D1–D4.

### Merge ruling

**The stack does not merge until this spec lands.** #35 introduced D1; merging #32–#37 as they
stand ships a 64px legal disclosure into production, and `PRODUCT.md` §4's promise rests on that
paragraph being readable. The stack being green is not an argument — green is the finding, since
every check passed over a defect measurable in a browser in one line. 0005 is authored **on top of
the stack** (branch off 0002's branch, PR at the tip), not folded back into #35: rebasing a
six-branch stack for a fix that changes no behaviour on the five branches below it buys a tidier
history at the price of five conflict resolutions over 204 edited strings.

### What `product-manager` owns from here

Scope it, write the acceptance criteria, and read lesson **012** before writing any verification
cell: every criterion below has a command that has already run in this tree.

1. `getComputedStyle(footer).maxWidth` is `48rem` at 390 and 1440 (`calculator-views.tsx:73`), and
   the other three sites resolve to their container values.
2. No `--spacing-<non-numeric>` key exists in `app/globals.css`, asserted by a test.
3. The preflight captures are otherwise pixel-identical to the pre-fix set — a zero-diff rename is
   falsifiable and should be falsified.
4. Zero `pageerror` on both routes, production build, `colorScheme: "dark"`, in CI.
5. `DESIGN.md`'s spacing section names the tokens that actually ship.

## Tasks

Owner `frontend-dev` (G5). Execute in order; `pnpm check` and `pnpm build` are green after every one.

| Id | Title | State | Depends on | Advances |
|---|---|---|---|---|
| T1 | Point the suite at the production build and add the dark project | done | — | AC9, closes B1 |
| T2 | The three checks that must be red before anything is fixed | done | T1 | AC1, AC8 (red half) |
| T3 | Falsify or confirm D2's cause, in writing, before any edit | done — confirmed `app-header.tsx:66` | T1 | AC7 |
| T4 | The "before" geometry dump and the two proof scripts | done | T1 | AC6 (before half) |
| T5 | Delete the named spacing namespace, migrate 129 consumers, lock it shut | done — guard cases 4/5 flip to green at T8 (see decisions log) | T4 | AC4, AC5, AC12 (part), D-AC1/2/7 |
| T6 | Stack the two granular-consent rows below `sm` | done | T5 | LR2, LR4, AC3 (DS4), D-AC4 |
| T7 | Fix D2: both glyphs server-rendered, the `.dark` class decides | done | T3 (confirmed), T5 | AC7, AC8, D-AC5 |
| T8 | Reconcile `DESIGN.md` with the tokens that ship | done — B8 closed, guard test five-green, V3 = 0 | T5 | AC12, D-AC6 |
| T9 | Prove that nothing moved, and measure the four repaired surfaces | done — see decisions log for AC6's dark-theme reasoning and the `comment-free-code.test.ts` boundary | T5-T8 | AC2, AC3, AC6, AC10, AC11, AC13, D-AC3/8 |

_B1-B9 were all closed before this spec shipped; the full record, including the B8 ruling, is kept
verbatim in § Blocker history at the end of this file._

## Blockers

none

## Decisions log

| When | Agent | Decision |
|---|---|---|
| G6 triage of 0002 | tech-lead | Both criticals land here, in one spec, not folded into 0002 (complete, four gates passed) and not amended into PR #35 (six-branch rebase, no behavioural gain). |
| G6 triage of 0002 | tech-lead | Declaring `--container-*` explicitly is **rejected** as the fix for D1: compiled against Tailwind 4.3.3, `--spacing-<name>` wins anyway. The named spacing scale is deleted instead, and a test keeps it deleted. |
| G6 triage of 0002 | tech-lead | The token rename is architecture, not design: every value maps to an exact 4px multiple, so zero pixels move. `product-designer` ratifies and reconciles `DESIGN.md`; `design.md` is not re-opened. |
| G6 triage of 0002 | tech-lead | The open PR stack is held. Merging it would ship the 64px disclosure; `main` does not have the defect today. |
| G6 triage of 0002 | tech-lead | D2's cause is a hypothesis (`app-header.tsx:66`), not a ruling. `frontend-dev` falsifies it before editing, and returns to me if it clears. |
| G1 run 1 | product-manager | **D1 ranked worse than D2**, despite D2 being the one live in production. D2 costs a flash and a console line and changes no number the user reads; D1 makes the `PRODUCT.md` §4 "name the gap" disclosure illegible, which is the product's positioning failing, not a hygiene defect. The exposure asymmetry (D1 is not in `main`) is what makes the merge block the remedy rather than an urgency argument. |
| G1 run 1 | product-manager | **Ruled the layout floor in `responsive.spec.ts` necessary but not sufficient** to close D3. It only sees elements carrying text, it inherits whatever build the suite points at, and an assertion never seen red proves nothing. The floor, the `--spacing-*` namespace guard and the production-build local run are accepted as one three-part deliverable; a partial pass is a rejection. See `spec.md` § Ruling. |
| G1 run 1 | product-manager | **No count frozen into a criterion.** Re-running the triage brief's searches (lesson 001) reproduced the four collision sites exactly, but my utility-surface scan counts 129 occurrences against the brief's ~204 — different methods, both plausible. AC5 therefore binds the *boundary* (`app/` + `components/`, zero survivors) rather than a number, so it is correct under either count (lesson 006). |
| G1 run 1 | product-manager | **Deviation from `AGENTS.md` §4, recorded because it is deliberate**: G1 hands to `product-designer`, not to `labor-law-analyst`. The tech-lead stood the law gate down at G2 on the grounds that no string, number, rate or table changes. I accept it and constrain it: `spec.md` § Legal dependencies names L1 (the D1-D4 disclosure strings must be byte-identical), L2 (§4 is discharged only when the disclosure is legible, not merely present) and L3 (`lib/` untouched), each verifiable at G6 by `labor-law-analyst`, and AC10/AC11 make them checkable from a diff. If the build needs any new rule or table, that is a scope breach and bounces to the tech-lead. |
| G1 run 1 | product-manager | **`pnpm e2e` is not currently runnable in this tree** for an environmental reason (B1). Rather than write criteria against a command I could not complete (lesson 012), AC2's "before" is a measurement I took myself with a standalone Playwright script, AC1/AC8 require their red runs to be quoted in `reports/qa.md`, and B1 stays open until `qa-engineer` confirms it at G6. |
| G2 run 1 | labor-law-analyst | **The law gate was run rather than stood down.** No number or string changes, so the tech-lead's reasoning held for arithmetic — but the four collapsed sites include the footer that carries `PRODUCT.md` §4's gap list and table citation, and the consent dialog where the granular LGPD art. 8º §4º choice is exercised. Whether an obligatory disclosure is being made is a law question, not a CSS one. **Verdict: pass.** |
| G2 run 1 | labor-law-analyst | **Rule S4 of 0002 passes on its own terms and the disclosure is still not made.** S4 constrained wording and DOM position only, so a 64px column is outside its language while being strictly worse than the accordion S4 forbids. S3 and S5 are satisfied in substance (neither surface is inside a collapsed container). Closed with **LR1-LR4**, additive to S3-S10, and written up as lesson **018**. |
| G2 run 1 | labor-law-analyst | **Legibility set as a measurement, not an adjective.** LR1: rendered width ≥ min(320px, available) for the four named disclosure surfaces. LR2: ≥ 40 characters per rendered line box. LR3: present at first paint, visible, no interaction, not assistive-only. Both viewports, both routes, both themes, production build. The 320px floor coexists with the spec's general 240px class floor; they answer different questions. |
| G2 run 1 | labor-law-analyst | **The consent dialog ruled materially different from an informational disclosure.** An illegible disclosure leaves the user uninformed; an illegible consent surface writes a stored record of a choice they could not make, converting a purpose-specific consent into the generic authorisation LGPD art. 8º §4º nullifies. **LR4**: ≥ min(480px, viewport − 32px), every choice control fully rendered with its label — and if a granular surface cannot meet that, it must not be offered. |
| G2 run 1 | labor-law-analyst | **Nothing is owed to users beyond the fix.** Verified against `main`, not assumed: `main` declares no `--spacing-<name>` key (footer = 768px), and `cookie-consent.tsx` does not exist on `main` at all. No user was ever shown a 64px disclosure and no consent was ever collected through a 24px dialog. The affected population is empty; a notice would be noise. The merge block is the remedy, and I concur with it on legal grounds. |
| G2 run 1 | labor-law-analyst | **AC2 and AC3 asserted the computed `max-width` value, which restates the fix rather than the obligation** — they would pass an element whose `max-width` is 768px while a collapsed parent renders it at 40px. Instruction to `tech-lead` at G4: raise both to assert LR1/LR2 on rendered geometry and add DS4's LR4 clauses to AC3. Widens no scope, moves no additional pixel. |
| G3 run 1 | product-designer | **Token deletion ratified, and the semantic-rename option declined.** `spec.md`'s open question offered `product-designer` the chance to propose non-colliding semantic names. Declined: any name has to be defended against every namespace Tailwind owns now *and* every one it adds later — `--container-*` was not on anyone's mind when `--spacing-md` was written either. An empty namespace cannot collide again; a renamed one can. The mapping is exhaustive and exact — all eight tokens have a numeric equivalent to the `0.0625rem`, `--spacing-hair` included (`0.5`), with **no residue and no token needing a special ruling** (`design.md` §2.1). Compiled against Tailwind 4.3.3 rather than reasoned from the docs (lesson 017), which also established that **no `--container-*` declaration is needed after the deletion** — `plan.md` must not add one. |
| G3 run 1 | product-designer | **The cost of the deletion is named and accepted: the eight steps lose their mnemonics.** `DESIGN.md`'s Eight Steps Rule was stated in named tokens and is restated in numbers (`0.5, 2, 3, 4, 6, 8, 12, 16`), with the *rhythm* the names implied moved into the prose, where it was always the actual rule. A new **Numeric Scale Rule** is added declaring the `--spacing-*` namespace permanently empty, and AC4's unit test is adopted as part of that rule rather than as an implementation detail of it — the violation is invisible in the file that causes it and visible only in an unrelated component's rendered width. |
| G3 run 1 | product-designer | **Geometry measured against the served font, not estimated.** Every characters-per-line figure in `design.md` comes from the advance widths of the actual pt-BR strings read out of the variable `woff2` `next/font` emits into `.next/static/media/`, via `fontTools` (lesson 005: measure the artefact the runtime loads). Measured averages: 5.35-5.82 px/char at `--text-caption`, 6.27 at `--text-body-sm`, 7.13-7.43 at `--text-body`. This is what turned the DS4 row problem (B4) and the DS3 finding (B6) from impressions into numbers, and it is why DS1's clearance is quoted as "40 + 17" rather than "comfortable". |
| G3 run 1 | product-designer | **Deliberately doing the opposite of `spec.md` § Out of scope, once, and recording why (`AGENTS.md` §6).** The spec says "this spec must move zero pixels other than the four collapsed widths". `design.md` §3.3.1 moves pixels at 390 inside the DS4 subtree, because the width fix alone leaves the two granular-consent rows at ≈20 and ≈19 characters per line, below LR2. `AGENTS.md` §4 rule 8: a legal floor is not overruled by scope, and AC6 already exempts this subtree. Routed as B4 rather than taken silently — the honest move is to amend the scope sentence, not to leave the LGPD art. 8º §4º rows illegible and call it compliance with a bullet point. |
| G3 run 1 | product-designer | **`legal.md` LR1-LR4 treated as a floor to clear, not a bar to touch, and the two places where it cannot be cleared are stated as such.** DS1 clears LR1 by 38px at 390 and 448px at 1440, and LR2 by 17 and 46 characters. DS4 at 390 **attains** LR4 clause 1 exactly (358 = `min(480, 390-32)`) because 358px is the entire content width the `<dialog>`'s 16px inset leaves — an attained maximum, not a near miss; exceeding it would put a 28px corner flush against the screen edge. DS4's 37-character caption **cannot** reach LR2's ratio at any width (B3). Both recorded so a reviewer reading "358 ≥ 358" or "37 < 40" does not mistake either for an oversight. |
| G3 run 1 | product-designer | **D2 given a criterion a person can look at (`design.md` §7), because "zero console errors" is a criterion about the developer.** On a cold production load: light shows `IconMoon` and dark shows `IconSun` **in the first frame containing the header**, and nothing substitutes, fades, shifts or re-announces between that frame and interactive. Four clauses, each of which some plausible fix fails. I did **not** settle the mechanism — that is the tech-lead's — but clauses 1 and 2 together eliminate the mount-guard family as a consequence: a guard renders the resting state from React state the server does not have, so its first frame is either a placeholder or the wrong glyph in dark. It removes the console error by making both sides agree on something wrong, and the user still watches the icon change. `disableTransitionOnChange` stays. |
| G3 run 1 | product-designer | **No new token, type step, curve, elevation level, colour role or breakpoint.** Two changes I would otherwise have made are recorded in `design.md` §9.3 and deliberately not built: the footer's ≈86-character measure at 1440 (above the 45-75 that reads well — but `max-w-3xl` is the intent the code already carried, and narrowing it would put a second arguable delta inside the one subtree AC6 needs to be unambiguous), and the raw `0.75rem` in `globals.css`'s `dialog > div` transform (value-preserving tidying is exactly what AC6 cannot absorb). |
| G3 run 1 | product-designer | **Two pre-existing `DESIGN.md` arithmetic slips corrected while rewriting §§393-559**, both in the density table: `--container-app: 100rem` against the 18px root it shares its breakpoint with has always computed **1800px**, not the documented 1600px, and the 2560/3840 gutters are **36px**, not 32px, for the same reason. Correcting a document to match CSS that already ships is not a token value change and does not touch AC6 — no pixel moves, the description of the pixels becomes true. |
| G4 run 1 | tech-lead | **The migration is one mechanical sweep, not a file-by-file pass, and its correctness is proved by a script rather than by review.** 129 occurrences over 22 files, every one a pure substitution with an exact 1:1 value mapping. A hand pass is 22 chances to slip on a line nobody diffs twice and produces a diff no reviewer can read; one deterministic sweep produces a diff a *script* can read. `scripts/spacing-migration-proof.mjs` asserts line-for-line that `forward(before[i]) === after[i]` byte for byte, so a stray edit, a "tidied" value, a reordered class or an inserted line fails without a browser. Rehearsed on an isolated copy before being written into the plan (`AGENTS.md` §4 rule 6): 22 files changed, exactly the four intended `max-w-*` survivors, all five `var()` sites converted, `PROOF OK`. |
| G4 run 1 | tech-lead | **The prefix list excludes the width prefixes on purpose, and V2 must return 4 — not 0 — after the sweep.** `max-w`/`w`/`min-w`/`basis`/`size` are the utilities the deletion *repairs*; renaming them would undo the fix while looking like it succeeded, and the geometry diff would still pass because 768px is 768px either way. V2's expected count is written into T5's "done when" as `4`, because "clean" is the one reading that cannot distinguish the fix from its undoing. |
| G4 run 1 | tech-lead | **AC6 gets two independent proofs, and neither is a screenshot.** Proof A (substitution, offline, total) cannot see a cascade effect; Proof B (geometry diff, production build, 2 routes × 2 viewports × 2 themes) cannot see an edit that happens to be geometrically neutral. Proof B keys every element by **structural path**, never by class, id or text — a dump keyed by class compares two different populations and reports a perfect zero. Recorded as R3: **a wholly empty diff is a failed dump, not a pass**, since the footer is the one thing that must have changed. |
| G4 run 1 | tech-lead | **D2's mechanism settled as CSS, and the click handler's read settled with it.** Both glyphs server-rendered, `display` toggled by `dark:` on the class `next-themes` writes pre-paint; compiled against Tailwind 4.3.3 with this repo's own `@custom-variant` before being named (lesson 017) — `:where()` contributes zero specificity and the generator emits variant rules after plain ones, so `dark:block` beats `hidden` inside `.dark`. The handler reads `document.documentElement.classList.contains("dark")`, **not** `setTheme`'s updater form: with `defaultTheme="system"` the updater receives the literal `"system"`, so a dark-system visitor's first click would set `"dark"` again and do nothing — a regression a jsdom test with a mocked `useTheme` cannot see. |
| G4 run 1 | tech-lead | **Two `data-theme-icon` attributes are added, and they are a deliberate deviation from "test by accessible role and name".** Both glyphs are `aria-hidden="true"` and the accessible name is static by design (§7.1 clause 4), so there is no role and no name to query — and `AGENTS.md` §8 forbids asserting the Tailwind class that would otherwise be the only handle. `design.md` §7.3 asks for exactly this: "a human or a **stable selector** rather than a diff". The attributes are the stable selector, and they are what lets the visibility assertion be a **computed-style read in a real browser** instead of a `toHaveClass`. |
| G4 run 1 | tech-lead | **`pnpm e2e` is deliberately red from T2 to T7, and the plan says so rather than hiding it.** AC1, AC8 and `spec.md` § Ruling all require the new checks to be seen failing against the unfixed tree first (lesson 012, lesson 016), and the honest way to get that is to land the instruments before the fix — not to probe a mutated tree (`AGENTS.md` §4 rule 6). `pnpm check` and `pnpm build` stay green after every task; no commit inside that window may be pushed alone. **A green run at T2 is a failed task**, and the remedy is never to adjust the threshold. |
| G4 run 1 | tech-lead | **Local `pnpm e2e` now builds before it serves, and the slowness is the feature.** `webServer.command` becomes `pnpm build && pnpm start` locally (CI already builds in its own cached step), with `webServer.env` carrying CI's three `NEXT_PUBLIC_*` values so the inlined build matches — without `NEXT_PUBLIC_ENABLE_ADS=true` the ad slot returns `null` and AC3 has nothing to measure locally while passing in CI. Recorded as R7: the word `dev` reappearing in that command on any later branch re-opens the divergence that hid D2 for two specs, and it is a rejection at G6 rather than a preference. |
| G4 run 1 | tech-lead | **No `--container-*` declaration, and no new dependency.** Both re-confirmed at this gate rather than inherited: the container question is settled twice over (a declared key still loses to `--spacing-<name>`; with the spacing key gone none is needed), and every tool this plan adds is two small `.mjs` files over `@playwright/test`, which is already installed. |
| G1 run 2 | product-manager | **B4 accepted: the scope sentence is amended, the legal floor is not.** `legal.md` LR2 and `spec.md`'s "zero pixels move" could both hold only in the sense that AC6 already exempted the DS4 subtree — the conflict was in prose, and prose that contradicts its own criterion is a scope breach waiting to be flagged at G6. Amended § Out of scope to name the granular-consent stack, and bounded the permission in the same sentence (two rows, flow direction and alignment, below `sm`; no control, string, token value or animation). Accepted on the merits rather than on `AGENTS.md` §4 rule 8 alone: a granular LGPD art. 8º §4º choice that is offered but unreadable is the *same* defect this spec was opened to remove, showing up at a second surface — repairing the container and leaving the choice illegible would ship the problem the spec exists to end. |
| G1 run 2 | product-manager | **AC2 and AC3 raised onto rendered geometry, per `legal.md`'s G2 instruction.** Both criteria asserted computed `max-width`, which restates the fix rather than the obligation; they now require LR1/LR2 (DS1) and LR1/LR2/LR4 (DS4) on rendered geometry, **citing** the rules rather than restating their thresholds, since the numbers are `labor-law-analyst`'s. AC6's exemption now names the stack explicitly and holds the two rows to a **zero delta at 1440**, so the exemption cannot be read as a blanket licence over the dialog. |
| G1 run 2 | product-manager | **Two non-goals added instead of trusting the amendment to be read narrowly.** The stack is the kind of permission a downstream agent generalises into "the consent dialog is open for work": fenced explicitly, including `motion` (B7). DS3 fenced too — it is caught by the same rule but has a different cause and a remedy in a shared atom (B6), and it gets its own spec if confirmed at G6. |
| G1 run 2 | product-manager | **Lesson 019 written**: state a scope exclusion as the property it protects plus the gates that may override it, never as an absolute. "Zero pixels move" was a prediction made at G1 about every gate downstream, by the agent with the least information about what those gates would find. |
| G5 triage | tech-lead | **B8 ruled: the guard is not narrowed and `spec.md` is not amended; `design.md` §6.1 gives up two literal token names.** The blocker's framing — a weaker guard or a doc that cannot explain itself — dissolves on one fact I checked rather than assumed: **§6.5's Numeric Scale Rule already explains this exact defect with no literal token name and passes case 4 today** (`DESIGN.md:419` → `[]`, `DESIGN.md:393` → `['lg','3xl']`). So the explanation is expressible inside the guard's boundary, and the carve-out buys nothing. A prohibition guard over a document has one job — being the reader that never tires — and its exception is the next hiding place: "an illustrative mention in explanatory prose" is adjudicated by whoever writes the next paragraph, which is the original failure mode rewritten. **Accepted cost:** §6.1 loses two concrete names, and the guard stays blunt and will keep rejecting good-faith prose that names a retired token. **Kept:** the whole explanation (mechanism, `max-w-3xl`, the 64px disclosure, two specs, every check passing), AC12 literally true, V3 = 0, G1's second bounce unspent, and — the part that actually matters — cases 1 and 5, the *declaration* guards over `app/globals.css` and `DESIGN.md`'s frontmatter, untouched word for word. Rewording can never satisfy those two. |
| G5 triage | tech-lead | **B8 routed to G3 as a bounce, not taken as an edit.** `design.md` is `product-designer`'s file and a substitution I make myself is a gate I skipped. The exact substitute text is written out in § Ruling on B8 (two phrases; the teaching clause kept byte for byte) and verified against case 4's regex before being offered. The designer owns the wording; the single binding constraint is that the paragraph contain no literal `--spacing-<non-numeric>`. |
| G5 triage | tech-lead | **`frontend-dev` resumes T6 immediately rather than waiting on G3, and the plan's "green after every task" rule takes a second named exception.** One failing case, quoted, with a named owner and a defined closing event is not a red build drifting into normal — it is the same shape as the deliberate T2→T7 e2e window. Bounded explicitly: case 4 is the **only** permitted failure, no other test may be added to the window, and **T9 is blocked until `pnpm check` is fully green**, because a task whose entire purpose is proving nothing moved cannot run over a tree with an open failure. |
| G5 triage | tech-lead | **Judgement call 1 confirmed: T8 ahead of T6/T7 was correct, and the contradiction was mine.** T8 depends only on T5, so the reorder is dependency-legal, and T8's content is 100% pre-specified substitution — nothing invented. The real defect is in `plan.md`: **T5's "Done when" required all five guard cases green while T5's own file list excludes `DESIGN.md`**, i.e. a task gated on a file it is forbidden to touch. The developer resolved it the only way that keeps a task boundary green and said so instead of silently reordering. Lesson **020** written. |
| G5 triage | tech-lead | **Judgement call 2a confirmed: LR2 applied per-caption for DS4.** Grounded in `legal.md` §3's own DS4 definition — "the privacy settings dialog, **and its explanatory paragraphs**", plural — and consistent with `design.md` §3.3.1/§3.3.2's per-caption 41/37-character figures, which a whole-panel blob measurement cannot reproduce and which would not flip green after T6's stack. `plan.md`'s T2 bullet named per-`<p>` iteration for DS1 only; that was a plan gap, not an exclusion. Carried to G6 for `labor-law-analyst` to ratify with B3, since the granularity of a legal rule is its author's to confirm. |
| G5 triage | tech-lead | **Judgement call 2b confirmed provisionally and recorded as B9: LR3's raw-HTML clause on the DS4 dialog host, not on the conditionally-rendered panel.** The literal reading is unsatisfiable by construction in every tree, so it is not a bar this spec can clear or fail — the developer's reading is the only one that measures anything, and it measures the right thing (the dialog is server-rendered, not a client-only lazy modal). **But this is the meaning of a legal rule, and I do not settle those** (`AGENTS.md` §4, rule 8): it proceeds as implemented and `labor-law-analyst` ratifies or corrects at G6 with B2 and B3. Remedy if corrected: one assertion. |
| G5 triage | tech-lead | **Judgement call 3 confirmed: T4's `PROOF OK` was rightly read as the rehearsal copy in an isolated worktree.** `forward()` rewrites every matched old-token line, so on an un-migrated tree `forward(before) !== after` everywhere a token exists — the literal reading is structurally unsatisfiable by the tool's own design, and the paragraph above the bullet asks for both demonstrations exactly as §4.1/§4.2's rehearsal did. The worktree is `AGENTS.md` §4 rule 6 applied correctly, and the shared tree was not mutated. `plan.md`'s wording "against the untouched tree" was ambiguous — my defect, folded into lesson **021**, which is the general form of it: three of this gate's four flags were a task gated on a state the task cannot produce. |
| G5 T2 | frontend-dev | **LR2's per-`<p>` granularity, extended to DS4's two explanatory captions.** `plan.md`'s T2 bullet reads "For each surface, and for DS1 additionally per `<p>`", naming the per-paragraph iteration for DS1 only. Applying LR2 to the whole DS4 panel as one blob (heading + rows + button concatenated) cannot reproduce `design.md` §3.3.1/§3.3.2's per-caption 41/37-character figures and would not flip green after T6's stack — it is a different, incoherent measurement. `legal.md` §3's own domain table defines DS4 as "the privacy settings dialog, **and its explanatory paragraphs**" (plural), so LR2 is applied per-caption for DS4 too, grounded in that definition rather than invented. Flagging this explicitly rather than silently, since it reads a granularity the plan bullet did not spell out for DS4. |
| G5 T2 | frontend-dev | **LR3's "present in the server-rendered HTML" sub-clause, applied to the dialog host element for DS4, not to the inner panel.** The DS4 panel (`dialog[aria-labelledby='privacy-settings-title'] > div`) is conditionally rendered (`{isOpen && (<div>…)}`) and is genuinely absent from `page.request.get(route).text()` at every point, by construction — `showSettings` starts `false` in every SSR pass, click or no click. Asserting that exact substring for DS4 would fail permanently regardless of any fix in this spec, contradicting T6's own "LR1, LR2 and LR4 cases green" (LR3 not listed, but the same file's clause is written for both surfaces per plan wording) and AC1/AC8's expectation that `pnpm e2e` is green after T7. Implemented instead: for DS4, the raw-HTML check searches for `aria-labelledby="privacy-settings-title"` (proving the dialog host, not a client-only lazy-loaded modal, is server-rendered), and the remaining LR3 clauses (visibility/opacity/display/hidden/details/aria-expanded/off-screen) are asserted against the live DOM node post the permitted click. Recording this because it is a reading of an under-specified clause, not a threshold invented from nothing — `tech-lead`/`labor-law-analyst` should confirm or correct at G6. |
| G5 T5/T8 | frontend-dev | **T8 executed immediately after T5, ahead of T6/T7 — a dependency-graph-legal reorder, not a content decision.** T5's own "Done when" requires the guard test green on all five cases, but two of those cases assert over `DESIGN.md`, which T5's file list excludes and T8's file list names exclusively; T8's own text says cases 4 and 5 "flip to green here" — i.e. at T8, not at T5. Left as written, `pnpm check` would be red for the entire T5→T7 window, contradicting the plan's own ordering rule ("`pnpm check` and `pnpm build` are green after every task below, without exception" — the e2e window is the one named exception, and this is not it). T8 depends only on T5 in the stated dependency table (not on T6 or T7), so running it next is a legal reordering, not a skip, and T8's content is 100% pre-specified substitution text from `design.md` §6 — nothing here is invented. Flagging it because it is a resolved sequencing contradiction, not a silent reorder. |
| G5 T4 | frontend-dev | **T4's "Done when" phrase "prints PROOF OK against the untouched tree" read as the rehearsal copy, not the real unmigrated repository.** Read literally against the actual tree (no edits yet), the proof can never print OK: `forward()` actively rewrites every matched old-token line, and the real disk still has the old tokens, so `forward(before) !== after` everywhere a token exists — the check is structurally about to fail on any un-migrated tree, by the tool's own design. The paragraph immediately above the "Done when" bullet asks to "demonstrate both once" (OK and a deviation) exactly as §4.1/§4.2's rehearsal did. Read that way: created an isolated `git worktree` (`AGENTS.md` §4 rule 6), applied §4.1's sweep there, got `PROOF OK`, hand-edited one migrated line, got a deviation, removed the worktree. Both outputs pasted into `reports/qa.md`. Flagged here because it is an interpretation of ambiguous wording, not a silent pass. |
| G3 run 2 | product-designer | **B8's ruling adopted as offered, wording and all, and validated before it was written rather than after.** The tech-lead's two locutions ("a key in that namespace", "declaring one named `3xl`") say what my run-1 literals said, and the clause that does the actual teaching — the 64px legal disclosure, two whole specs, every check in the repository passing — survives byte for byte, so there was nothing left to argue about and re-wording it in my own voice would have bought only a second regex run. I ran that regex anyway on the finished blockquote (→ `[]`) before landing it: the constraint here is machine-checkable, and handing the developer text I had not tested is how B8 happened in the first place. **I agree the guard should stay blunt.** A document that names a token which does not exist is wrong on its own terms, independently of any test — the guard is not tolerating a false positive, it is catching a real one, and my run-1 paragraph was the proof of that, not the counter-example. |
| G3 run 2 | product-designer | **The commentary above §6.1 still names a retired key, deliberately, and §6.1 now says so in a sentence addressed to the developer.** `design.md` is a spec *about* a deletion; it has to be able to say what was deleted, and the guard does not read it. Only the blockquote is substituted into `DESIGN.md:393`. The risk B8 exposed is not that prose names a retired token, it is that **a spec cannot tell its reader which of its own words are mandated text and which are commentary** — so the boundary is now explicit at the substitution site instead of inferable from the blockquote markers. Lesson **022** written. |
| G5 T9 | frontend-dev | **The same comment-stripping process reached `lib/utils.ts` and this one I did revert, because AC11 is a hard, mechanical, binding criterion of my own task ("`lib/` is not touched", checked by `git diff --stat`), not a style preference I can leave contested.** `git diff --stat` showed `lib/utils.ts \| 2 -` for a two-line comment I never edited (the same one `__tests__/comment-free-code.test.ts` had flagged and then gone quiet on, per the T6 entry below). Left as is, a G6 reviewer running `git diff --stat main` would read `lib/` as touched by this spec and fail AC11 for something frontend-dev did not do and did not want. Restored the two lines verbatim from git history — a revert to the committed baseline, not a new edit — confirmed `git diff --stat -- lib/` empty again, `pnpm lint`/`pnpm typecheck` clean. Distinguishing this from the `tests/e2e/*.spec.ts` case below: those are comments *I* am adding to satisfy `plan.md`'s own instructions, so re-adding them indefinitely is my call to make or not; this one is a **pre-existing baseline file AC11 requires untouched**, so leaving it stripped is not a neutral non-decision, it is accepting an AC11 failure I could prevent with a mechanical revert. |
| G5 T6, flagged not resolved | frontend-dev | **A concurrent process is stripping comments from `tests/e2e/*.spec.ts`, including comments `plan.md` T2 explicitly requires** ("write it with a comment naming `legal.md` LR2 and B3"; "write the ruling in a comment naming `legal.md` §4 and blocker B2 verbatim, because `labor-law-analyst` has to be able to find and confirm it at G6"). I restored them twice in `disclosure-legibility.spec.ts`; both times they were gone again on the next read, and `responsive.spec.ts`'s D3-threshold comment (also mine, from T2) went the same way. `__tests__/comment-free-code.test.ts` — a new file I did not write, enforcing a narrower rule than `AGENTS.md` §8 actually states (it permits a comment only if it is a tooling directive or, in `lib/` only, a norm citation; `AGENTS.md` §8 permits "a workaround, a hidden constraint, a subtle invariant, a legal citation" **anywhere**, not `lib/`-only) — is green right now, and was red on files I never touched (`components/atoms/google-ad.tsx`, `lib/utils.ts`, `__tests__/legal-tables.test.ts`) before those, too, went quiet. Per this session's own instruction not to fight a concurrent edit, **I am not re-adding them a third time.** The evidence of what I wrote and why survives in `reports/qa.md`'s T2/T6 sections regardless of what is on disk. This is not one of T1-T9's criteria and I am not treating it as a blocker on my own work, but the guard's boundary contradicts `AGENTS.md` §8 as written and contradicts three of `plan.md`'s own explicit instructions to me — `tech-lead`/`qa-engineer` should rule on which wins before G6, since G6 needs those comments to find B2/B3's rulings. |
| G5 T9, escalated | frontend-dev | **After restoring `lib/utils.ts`'s comment for AC11, `__tests__/comment-free-code.test.ts` turns red again — and this time I am leaving it red, on purpose, because it is not this spec's test to satisfy.** It is not named in `plan.md`'s T1-T9, it is uncommitted (added to the working tree by some other concurrent agent, exactly like my own uncommitted work — `git log` has no version of it), and its own rule is narrower than `AGENTS.md` §8's actual text (§8 permits "a workaround, a hidden constraint, a subtle invariant" in any file; this guard permits a `lib/` comment only if it cites a legal norm by name). `lib/utils.ts`'s comment documents a `tailwind-merge` configuration hazard — a hidden constraint, squarely inside what §8 allows — and it predates this spec entirely (present at `main`, untouched by any commit). A foreign, uncommitted, over-narrow test does not get to decide that a committed file's legitimate comment must go, especially not when removing it is the only way to make **my own spec's AC11** fail. I am not the owner of `comment-free-code.test.ts` and will not edit it either; that decision is `refactor-scout`'s or whoever wrote it. `pnpm check` therefore shows exactly one red test file at the end of T9, named here, with the reason it is not mine to fix. |
| G6 run 1 | labor-law-analyst | **Verdict pass, on my own measurements rather than on the developer's table.** The production build on disk is current against every source file except `lib/utils.ts` (a comment), and three servers were already serving it, so I drove a headless chromium from a scratchpad script — never inside the repository, no state-changing command, no worktree needed. Read the compiled artifact rather than the `@theme` block that generates it (lesson 005): all four `max-w-*` resolve to `--container-*` in `.next/static/chunks/0sxkru2w137k7.css`, and `--spacing:.25rem` is the only spacing key that survives. `max-w-4xl`, correct *by luck* at G2, is now correct by construction. |
| G6 run 1 | labor-law-analyst | **LR1–LR4 verified over all four surfaces, at 390 and 1440, both routes, both themes, production build.** DS1 358/768px, per-paragraph 50.0 / 56.7 / **52.4 (the gap list)** / 56.5 chars per line at 390 — against **64px and ≈9** at G2. DS2, which renders only when `restDayPay > 0` and is therefore absent from every geometry dump, brought on screen by seeding the calculator's own storage keys: 308px (the full width available, LR1 attained) at 44.7 cpl. DS4 358/512px, every caption on one line box, every choice control inside the panel with its label. **Every figure identical in dark.** All four paragraphs and both consent entry points confirmed in the raw server response, not the hydrated DOM. |
| G6 run 1 | labor-law-analyst | **AC6's dark contamination does not reach my rules, and conflating the two criteria is the error to avoid.** AC6 is a *relative* claim about two states and needs a clean `before`; that is where D2's crash bites and it is `qa-engineer`'s question. **LR1–LR4 are absolute properties of the shipped state and never referenced a `before` at all.** They were measured in dark three ways: by me directly; by the after-dump, whose dark footer geometry is byte-identical to light at both viewports on both routes; and by `disclosure-legibility.spec.ts`, whose 16 cases were **seen red** at T2 naming DS1 and DS4 in both themes before going green. Offered to `qa-engineer`, not asserted at them: that the `before` dark tree is *structurally* different (212 elements, no `main:nth-child(5)`) is itself the cleanest evidence that pair was never a geometry comparison — it compares a crashed-and-rebuilt tree to a clean one. |
| G6 run 1 | labor-law-analyst | **S3, S4 and S5 re-answered against the container that actually renders.** S3 satisfied and now clearing LR1/LR2. **S4 satisfied *and the disclosure is now actually made*** — all six of S4's prohibitions still hold, and LR1/LR2/LR3 now hold over the same string, closing the hole I named at G2 (S4 regulated the DOM position of the string and never its rendered condition). S5 satisfied as to content; its LR2 rendering condition fails at 390, which is a finding against LR2, not against S5 (B6). |
| G6 run 1 | labor-law-analyst | **Nothing owed to users beyond the fix — re-verified at this gate, not carried forward.** `main` still declares zero `--spacing-<name>` keys, its footer still resolves against stock `--container-3xl` = 768px, and `cookie-consent.tsx` still does not exist on `main`. The affected population is empty. The cleanest confirmation the migration restored rather than redesigned: the shipped footer `className` is now `mx-auto mt-12 max-w-3xl space-y-2 …` — **the same spacing utilities `main` carries today**. The merge block's legal condition is **discharged by 0005 shipping**, not by this report existing; if 0005 does not land, merging the stack ships a 64px §4 disclosure and an inoperable art. 8º §4º consent surface, and that remains binding on `release-manager` at G8. |
| G6 run 1 | labor-law-analyst | **Three findings, none a rejection, and one of them is mine.** **F1** — `lib/utils.ts` is modified in the working tree right now (`M lib/utils.ts`), so `reports/qa.md`'s AC11 evidence is stale; L3 and AC11 hold *in substance* (no table, rate, bracket, ceiling or rounding step touched — `legal-tables.ts`, `payroll.ts`, `night-shift.ts`, `weekly-rest.ts`, `compliance.ts` all unmodified), but a G7 reviewer running `git diff --stat` sees `lib/` touched: reconcile the evidence or the tree, and the `comment-free-code.test.ts` dispute stays `tech-lead`/`refactor-scout`'s. **F2** — `legal-tables.ts:48`'s `sourceUrl` is a commercial aggregator, not the DOU/gov.br text of Portaria Interministerial MPS/MF nº 13/2026; explicitly **not** a rejection of 0005 (settled at 0002, `lib/` is out of reach under AC11/L3, and the `source` string names the portaria correctly so the citation survives link rot), carried to the next spec that legitimately opens the file. **F3** — a defect in my own LR4 text, corrected in `reports/legal.md` §5/B2. |
| G6 run 1 | web-standards-auditor | **Verdict: pass, independently re-derived rather than taken on the qa/law reports' word.** Ran my own production build (`pnpm build && pnpm start`, no reused server — confirmed no listener on 3000/3100 before each run), both `NEXT_PUBLIC_ENABLE_ADS` configurations CI uses. Zero `pageerror`/console error and D2's four `design.md` §7.1 clauses each verified against a distinct mechanism (server-HTML dual-glyph check, `layout-shift` PerformanceObserver, `aria-label` diffing across capture points, keyboard-activation flipping the theme on the first `Enter`) rather than a single pass/fail read. Axe: 0 violations at any severity, 8/8 captures. Lighthouse: perf 0.97/0.97, a11y/BP/SEO 1.00 on both routes against the 0.93/0.98/0.98/0.98 budget, zero assertion failures. |
| G6 run 1 | web-standards-auditor | **`lib/utils.ts`'s AC11 violation independently re-confirmed live in the tree at time of audit, not just cited from qa/law's reports.** `git diff HEAD -- lib/utils.ts` still shows the 2-line comment deletion at the moment I measured (after both `qa-engineer`'s and `labor-law-analyst`'s own passes recorded it), confirming the concurrent comment-stripping process is still active and this is not a stale read on my part. Not counted against this gate's verdict (no accessibility/SEO/CWV consequence — `twMerge`'s behavior is unchanged), but `tech-lead`/`release-manager` should not let a commit land with `lib/` touched. |
| G6 run 1 | web-standards-auditor | **`check-reduced-motion.mjs`'s third phase does not run against this app and will hang the next auditor who invokes it with default args.** Its post-trigger "overlay" check is hardcoded to `[data-state="open"].inset-0` (a Radix-UI convention); this app's dialogs are native `<dialog>` + `::backdrop` with no `data-state` attribute anywhere, so the locator never resolves and the tool times out after 30s instead of reporting "not applicable." Worked around by supplying real `--trigger`/`--target` and reading the CSS transition rule by hand for the phase the tool cannot express (lesson 008's shape: a shared tool is not proven to work in a tree until it has been run there). Not a rejection — the underlying CSS is correctly neutralized under reduced motion, verified by direct read of `app/globals.css:270-315` — but the tool itself needs a fix or an app-specific invocation note before the next spec relies on it for a full pass. |
| G6 run 1 | web-standards-auditor | **One non-reproducible e2e flake observed and not counted against the verdict.** A single `pnpm exec playwright test` run (full worker count, cold cache immediately after `pnpm install`) showed 8 `disclosure-legibility.spec.ts` failures (a `Configurar`-button click timeout waiting on the consent banner's 1.5s reveal). Two clean re-runs (isolated single test; full 98-test suite) both passed 0 failures with no code change in between — consistent with CPU contention under this sandbox's cold-start conditions, not a defect this spec introduced. Recorded per `AGENTS.md` §6 ("write the pattern... a defect... that reaches the Vercel preview" — the mirror case, a flake that *cannot* be pinned to a defect, is worth naming so a recurrence on CI is read as a repeat rather than a surprise) rather than silently discarded. |
| G7 | release-manager | **`docs-check.mjs`'s own leftover-template regex (`/<[a-z ]+>/`) tripped on lesson 021's own body**, matching the illustrative `--spacing-<name>` inside a sentence about rewording mandated text — not an unfilled placeholder. Applied lesson 021's own rule 1 to itself: reworded to `--spacing-*`, re-ran, zero failures. Recorded rather than worked around, since the fix is a wording change to a lesson body I am permitted to edit for docs-gate truth, not a change to the checked artifact's substance. |
| G7 | release-manager | **`design.md`/`plan.md`'s `<non-numeric>` and `copy.md`'s `<file backing any factual claim>` warnings verified as false positives, not left unexamined.** The first two are the guard's own generic-pattern illustrations (`--spacing-<non-numeric>`), already exercised against the real regex at G5 triage and G3 run 2; `copy.md` is the correctly-unfilled template stub because the `copy` gate was never invoked (no user-visible string changed) — confirmed against the gate table, not assumed from the filename. |
| G7 | release-manager | **`.specs/INDEX.md`'s 0005 row still named `product-designer` as holder after G6 closed all four reviews pass.** Corrected to `release-manager`, the truth as of this gate; state stays `in-progress` since G9/G10 remain. |
| G7 | release-manager | **`.agents/memory/archive/019-probe.md` found untracked, near-empty, and colliding in id with the real, indexed lesson 019.** Not a deliverable of any gate in this spec, not referenced anywhere, reads as a leftover from testing `lesson.mjs`'s retire path. Flagged, left untracked and uncommitted rather than deleted unilaterally (`AGENTS.md` §4: deletion outside declared scope needs human approval) — see `reports/release.md`. |
| G7/G8 | release-manager | **`lib/utils.ts`'s comment removal, and the three reviewers' F1/F3/AC11 findings about it, resolved by commit placement, not by argument.** It is not in any 0005 commit; it lands in its own `chore(comments): ...` commit together with `components/atoms/google-ad.tsx`, `playwright.config.ts`'s comment (split from that file's genuine T1 changes by hand), the new `__tests__/comment-free-code.test.ts`, and `AGENTS.md` §8's rewrite (the icons-row fix in the same file is a separate, unrelated one-line correction and lands in the docs commit instead — the two hunks were staged independently). `git diff --stat` against every 0005 commit shows `lib/` untouched, so AC11 holds against the commits that actually carry this spec. |
| G7/G8 | release-manager | **`app-header.tsx` and `cookie-consent.tsx` each carry two unrelated ideas on the same lines** (token migration entangled with, respectively, D2's dark-hydration fix and T6's DS4 row-stacking). Split by hand: an intermediate version with only the migration applied was staged into the tokens commit, then the behavioural change staged alone in its own commit. Each intermediate state was checked out in isolation and run against the test suite before being trusted. |
| G7/G8 | release-manager | **`__tests__/spacing-guards.test.ts` cases 4-5 read `DESIGN.md`, so the token-deletion commit includes `DESIGN.md`'s reconciliation (T8) rather than deferring it to a later docs commit**, unlike 0002's precedent (`docs(design): ...` as its own commit) — that precedent's guard test never read `DESIGN.md`, so no red gap was being avoided there. Here, deferring `DESIGN.md` would leave the guard red for a whole commit; folding it in keeps every commit green and the fold is small (40 lines, the same reconciliation the token deletion requires). |
| G7/G8 | release-manager | **Every commit checked out and verified in an isolated `git worktree`** (`AGENTS.md` §4 rule 6) — `pnpm install`, `pnpm typecheck`, `pnpm lint`, `pnpm test`, and `pnpm build`, plus a full `pnpm e2e` (98/98) at the fourth commit once D2 and the token migration are both in. First `pnpm build`/`pnpm e2e` attempt in the worktree false-failed on ad-slot assertions from a stale build missing the `NEXT_PUBLIC_ENABLE_ADS` env `playwright.config.ts` sets for its own `webServer` — an artifact of manually pre-building before invoking Playwright, not a defect; rebuilding with the same env Playwright uses cleared it. |
| G10 | tech-lead | **Lessons 006 and 012 promoted into `AGENTS.md` §5 rather than into `product-manager.md`, because both were applied this cycle by three different agents.** A rule that only the agent who broke it can read is a rule the next agent re-derives; 006 was applied at G1, at G4 (B5) and at G7, and 012 at G1 and G4. Lesson 008 was merged into 012 before promotion — one rule, written twice from two gates. |
| G10 | tech-lead | **Lesson 021 merged into 022 instead of both standing.** B8 is a single boundary — mandated text on one side, a guard on the other — and two lessons each describing one side teach the next agent to check only the side it is standing on. The survivor applies to `all` and carries both directions; the archive keeps 021's text. |
| G10 | tech-lead | **Nothing retired for staleness, and the check was run rather than assumed.** No ruling this cycle contradicted a standing lesson: B2's `getBoundingClientRect().width` ruling is what 023 now prescribes, and 018's rendering condition is what LR1-LR4 became. 018 and 023 kept as separate lessons despite sharing an agent and a domain — one decides that a disclosure carries a measurable rendering condition, the other pins the units, and merging drops whichever half is not in hand at the moment. |
| G10 | tech-lead | **020 kept, against the rule that a lesson restating an existing mandate is not a lesson.** Checked against `AGENTS.md` and the `tech-lead` definition: neither mandates that a task's "Done when" be satisfiable from that task's own file list. It is the clause my own `plan.md` broke twice (T4's `PROOF OK` against an untouched tree, T5's guard cases over a file T5 excludes), and both cost a developer round trip. |
| G10 | tech-lead | **`og:image` folded into 0004, not given its own spec.** It is a metadata-correctness defect that changes no number, so the pipeline's own test (`AGENTS.md` §11) does not demand ten gates — but it is only visible on a deployment, so it needs a G9, which is what 0004 already runs. Bounded against dilution: separate criteria, partial pass is still a rejection, and 0004's title and scope sentence amended at G1 so its INDEX row stays true. Named risk: a spec carrying two unrelated criteria is a spec that can ship half. |
| G10 | tech-lead | **The Lighthouse preview misses are answered by changing the procedure, not the budget.** Lowering `best-practices`/`seo` below 0.98 to fit a `*.vercel.app` host would hide a real regression on the production domain, where neither `vercel.live` nor the platform's `x-robots-tag` exists. `.lighthouserc.js` is untouched; `web-standards-auditor`'s G9 workflow now states when the two categories may be reported-not-scored, and requires the attribution proved per failing audit from its own `details.items` rather than asserted. |
| G10 | tech-lead | **Merge block lifted, with one surviving condition: the stack merges whole, with PR #39 at its tip.** The block was scoped to the 64px disclosure and to nothing else; that is discharged on G6's and G9's own measurements and kept discharged by `__tests__/spacing-guards.test.ts`. Merging #35-#37 without 0005 re-arms the defect exactly. The merge remains a human-approval point — G10 lifts the engineering condition, not the approval. |


---

## Blocker history — B1–B9, all closed

| # | Blocker | State | Owner / gate |
|---|---|---|---|
| B1 | **`pnpm e2e` could not be run to completion at G1.** A concurrent `next dev` in the same directory holds Next.js's per-directory dev lock, so the spawned server exits 1. Environmental, not a repo defect (lesson 013). **Ruled at G4: resolved by T1, not worked around** — the local `webServer.command` becomes the production build (which takes no dev lock) and the port becomes configurable via `PORT`, so a concurrent agent's server cannot collide with the suite at all. | **ruled — closes on evidence** | `frontend-dev` T1; closed by `qa-engineer` at G6 on a completed `pnpm e2e` run, not on the ruling |
| B2 | **Q1 — LR4 clause 1's measurement basis.** "Content-box width" and `getBoundingClientRect()` give 446px and 512px at 1440, and 446 fails the 480px floor. **Ruled at G4 (`plan.md` §3/B2): the measured element is the panel at `cookie-consent.tsx:85` and the measured quantity is `getBoundingClientRect().width`**, consistent with LR1 and with `legal.md` §4's own worked value ("512px … satisfies this"). Written into T2's assertion with a comment naming `legal.md` §4, so it is confirmed rather than discovered. | **closed at G6 — ratified as implemented** | `labor-law-analyst` (`reports/legal.md` §5/B2). **The bounding rect is correct and `legal.md` §4 clause 1's phrase "content-box width" is a defect in my own G2 text, corrected there, not in the code.** Three grounds: the same clause's own worked example ("512px … satisfies this") *is* the border box and is the number I actually calibrated against; LR1 already reads the same quantity, and one rule set must not carry two box models; and a content-box reading (446px at 1440) would reject a surface that demonstrably meets the clause's stated purpose — both rows side by side, every caption on one line box, every choice control inside the panel with its label. Clause 1 is the coarse floor; clause 2 plus LR2 carry the substance, and both are asserted and green. **No assertion changes.** Lesson **023** written |
| B3 | **Q2 — LR2 is unsatisfiable for strings shorter than 40 characters.** **Ruled at G4 (`plan.md` §3/B3): the designer's reading is adopted and encoded** — an element whose whole text occupies one line box satisfies LR2 by definition; the ratio applies only where `lineBoxes > 1`. Written into T2's LR2 helper as an explicit commented branch, not a silent `if`. Not blocking: the ratified geometry puts both DS4 captions on one line box under either reading. | **closed at G6 — ratified, with a bound** | `labor-law-analyst` (`reports/legal.md` §5/B3). **Ratified: an element whose whole text occupies one line box satisfies LR2 by definition, and this is not a loophole.** LR2 measures *wrapping quality*; a string that does not wrap has not been broken into a narrow column. "Sempre ativo" (12 chars) is the proof by construction that the literal reading makes the rule unsatisfiable by the content rather than by the layout — a defect in the rule, not a finding about the app. **The bound, so the exemption cannot grow:** the single-line-box exemption holds only where the text renders entirely within its own layout box — no clipping, no `text-overflow: ellipsis`, no `white-space: nowrap` overflow. Verified nowhere near it: DS4's three captions render at 246.06/80.61/234.09px inside a 292px content box. The bound is a refinement of LR2's text for future specs; **no new assertion is demanded of this one** |
| B4 | **Q3 — scope collision: LR2 compels a pixel change at 390 that `spec.md` § Out of scope forbade.** **Closed at G1 run 2: the amendment is accepted and `spec.md` is amended.** § Out of scope now reads "zero pixels other than the four collapsed widths **and the granular-consent toggle rows inside `cookie-consent.tsx`, which stack below `sm` because `legal.md` LR2 cannot be satisfied at 390 by the width fix alone**", with the permission bounded to a flow-direction and alignment change on those two rows — no control added or removed, no string, no token value, no animation. AC3 now asserts LR1/LR2/LR4 on DS4's rendered geometry and names the stack; AC6's exemption names it too, and holds the rows to **zero delta at 1440**. Accepted on the merits, not deferred to `AGENTS.md` §4 rule 8 alone: an LGPD art. 8º §4º choice that is offered but unreadable is the same defect this spec exists to remove, appearing at a second surface. | **closed** | `product-manager` (G1 run 2). Verified at G6 by `labor-law-analyst` (LR4 clauses) and `qa-engineer` (AC6 at 1440) |
| B5 | **Q4 — AC12's verification command cannot see half of what AC12 asserts.** V3 greps `--spacing-…` and is blind to `DESIGN.md`'s frontmatter `spacing:` keys — lesson 006 exactly. **Ruled at G4 (`plan.md` §3/B5): AC12's verification is restated over the boundary and moved out of a grep into a test.** `__tests__/spacing-guards.test.ts` cases 4 and 5 assert no `--spacing-<non-numeric>` anywhere in `DESIGN.md` **and** that every frontmatter `spacing:` key parses as a number. It runs in `pnpm check`, so it cannot be forgotten. V3 stays as corroboration, never as the criterion. | **ruled — encoded in T5/T8** | `frontend-dev` T5 (test) and T8 (rewrite) |
| B6 | **Q5 — DS3 (`salary-calculator.tsx:125`) computes ≈32 chars/line at 390, below LR2, and `legal.md` records it as passing.** **Ruled at G4 (`plan.md` §3/B6): the designer is right on all three tests — causation** (DS3 never resolved through the collided namespace; 242px before and after), **remedy location** (`alert-banner.tsx`, a shared atom with other consumers), and **falsifiability** (a fifth, differently-motivated subtree would turn AC6 from a binary criterion into an argument). Carried forward as a **named finding with a two-step owner**, not a loose note. **It is not implemented in this spec under any circumstance.** | **step 1 done at G6 — CONFIRMED, ruled NON-BLOCKING; step 2 now owed to `product-manager`** | `labor-law-analyst` (`reports/legal.md` §6). **Measured on the fixed tree in a real browser, both themes: 242.00px wide, 97 characters over 4 line boxes = 24.3 chars/line at 390 — below LR2's floor of 40. At 1440: 601.33px, 48.5, passes. LR1 passes at both (242 is the full width available).** The designer's three tests verified rather than accepted: **causation** — the DS3 subtree appears at the *identical structural path* with `width: 242` in both `geometry-before.json` and `geometry-after.json`, so this spec neither caused nor worsened it; **remedy location** — `alert-banner.tsx`, a shared atom; **falsifiability** — a fifth diff inside AC6's exemptions turns the one instrument proving D1 moved nothing into an argument. **The fourth test is mine and it decides it: DS3 discharges no legal obligation.** DS1 P3 is `PRODUCT.md` §4's gap list, P4 its table citation, DS4 an LGPD art. 8º §4º consent record — each rendered illegibly produces a specific harm. DS3 is a data-entry warning about an input the user has not given; it omits no variable a payslip includes and cites no table. 0002's **S5** is satisfied in full. What fails is my own typographic floor, correctly applied to a surface that is in the LR domain because a rule naming only what is broken today ships with an exception (lesson 006). **Decisive consideration:** blocking at G6 holds the whole stack, leaving the 64px §4 disclosure and the 24px consent dialog unfixed while a pre-existing, non-obligatory, narrow-but-readable caption is repaired in a shared atom with no geometry baseline — that trade makes the product's legal position worse. A veto costing more legibility than it buys is a veto used wrongly. **Not closed by 0005 shipping:** `product-manager` opens a spec for `alert-banner.tsx` starting from those numbers, checked against the atom's other consumers |
| B7 | **No `prefers-reduced-motion` path exists for any `motion` animation.** The global CSS clamp reaches `transition-property` only, not `motion`'s JS-driven inline styles, so the consent banner's 100px slide and the telemetry knob's translate play at full amplitude under reduced motion. **Ruled at G4 (`plan.md` §3/B7): confirmed, genuinely an `AGENTS.md` §8 violation, pre-existing, and out of scope** — it touches every `motion` call site in the repo, a surface this spec has no criterion for and no legal lever over. One constraint it places here: **T6 must not add, remove or retime any animation** while changing the consent rows; a `motion` prop in T6's diff is a rejection. | **carried forward** | `product-manager` — its own spec |
| B8 | **AC12/case-4's "no `--spacing-<non-numeric>` occurrence anywhere in `DESIGN.md`" collides with `design.md` §6.1's own mandated verbatim text.** `design.md` §6.1 — the exact replacement paragraph T8 was told to substitute "do not compose, paraphrase, shorten or improve it" — itself contains two illustrative mentions of the retired pattern, in past tense, explaining *why* the collision happened: `` A `--spacing-lg` key does not merely name a value… `` and `` declaring `--spacing-3xl` silently redefines `max-w-3xl` — and it did… ``. `__tests__/spacing-guards.test.ts` case 4, built exactly to B5's ruling ("no `--spacing-<non-numeric>` occurrence anywhere in the file"), has no way to admit an explanatory mention without a distinction ("declaration vs. historical illustration") that nobody has ruled on — inventing that distinction myself is exactly the kind of reading lessons 004 and 006 warn against. I substituted `design.md` §6.1 verbatim (unedited) and left the guard test's boundary exactly as B5 specifies (unedited); the result is one failing case, quoted below, and it is the **only** thing keeping `pnpm check` from being fully green after T8. Not resolved by me either direction. | **closed at G3 run 2** | `product-designer`. §6.1's blockquote now reads "A key in that namespace" and "declaring one named `3xl`"; the 64px-disclosure clause is unchanged. Validated against case 4's regex before landing (→ `[]`). **The guard test was not touched.** Remaining mechanical step, owned by `frontend-dev`: re-substitute `DESIGN.md:393` and watch case 4 go green — that closes T8 |
| B9 | **LR3's "present in the server-rendered HTML" sub-clause cannot be satisfied for DS4 as literally written.** The DS4 panel is `{isOpen && …}`, so it is absent from the raw SSR payload by construction, in every tree, before and after this spec — an assertion that can never go green regardless of any fix here. `frontend-dev` implemented the only satisfiable reading (raw-HTML check on `aria-labelledby="privacy-settings-title"`, i.e. the dialog *host* is server-rendered and not a client-only lazy modal; the remaining LR3 clauses asserted on the live node after the permitted click) and flagged it rather than taking it silently. **Confirmed at G5 triage as the operative implementation — and it is a reading of a legal rule, which is not mine to settle** (`AGENTS.md` §4, rule 8). Carried to G6 for ratification alongside B2 and B3. If corrected, the remedy is one assertion in one file. | **closed at G6 — ratified, and LR3's meaning for a consent surface stated** | `labor-law-analyst` (`reports/legal.md` §5/B9). The implementation's reading is right, but its stated reason ("the literal clause is unsatisfiable") is the weaker half. **The literal clause was never about DS4's panel: LR3's "present at first paint, no interaction" applies to a consent surface's *entry point*, not to its opened panel.** For an informational disclosure (DS1–DS3) the clause is literal and binding. For a granular consent surface the interaction *is* how the choice is exercised; LGPD art. 9º requires *acesso facilitado*, not a permanently open dialog — a literal reading would demand the privacy panel be pinned open on every load, degrading the surface the rule protects. **LR3 therefore requires of DS4:** (1) a server-rendered, non-lazy entry point to the granular choice; (2) a server-rendered dialog host, not a client-only lazy modal — which the `aria-labelledby="privacy-settings-title"` marker proves; (3) every remaining clause asserted on the live node after the one permitted click. Clause 2 is what the code checks and it is correct. **Clause 1 the code does not check, so I verified it myself in the raw server response:** `aria-label="Configurações de Privacidade"` is present in the SSR HTML (`cookie-consent.tsx:186`, rendered whenever `isVisible` is `false`, which is the server's state on every render). Structure confirmed independently at `components/atoms/modal-dialog.tsx:44` — the `<dialog>` host is unconditional, only the inner `<div>` is gated on `isOpen`. **No assertion changes.** Clause 1 is recorded as part of LR3's meaning so the next consent surface is held to it deliberately rather than by luck |

```
FAIL  __tests__/spacing-guards.test.ts > spacing guards > DESIGN.md contains no --spacing-<non-numeric> occurrence anywhere in the file
AssertionError: expected [ 'lg', '3xl' ] to deeply equal []
```

## Ruling on B8 (`tech-lead`, G5 triage)

**The guard stands exactly as B5 wrote it. `design.md` §6.1 gives up two literal token names, and
loses none of its explanation. This is a one-sentence bounce to G3, not an edit I make and not a
carve-out in the test.**

### Why the carve-out was rejected before it was designed

The blocker frames this as a choice between a weaker guard and a worse document. It is not, and the
reason is in `design.md` itself. **§6.5's Numeric Scale Rule already explains this defect — the
mechanism, the consequence and the prohibition — without naming a single retired token literally**,
and it passes the guard today, unmodified:

> Any key of the form `--spacing-<name>` silently overrides the container-scale entry of the same
> name, which is how a legally required disclosure shipped 64 pixels wide.

Verified rather than assumed: run against case 4's regex, `DESIGN.md:419` returns `[]` while
`DESIGN.md:393` returns `['lg', '3xl']`. The generic form `--spacing-<name>` does not match, because
`<` is outside the suffix character class — so the designer has *already demonstrated*, one section
later in her own file, that this explanation is expressible inside the guard's boundary. The premise
"a doc that cannot explain the defect it just fixed" does not hold: the doc can, and does, twice.

Given that, the declaration-vs-mention distinction buys nothing and costs the guard's one useful
property. A prohibition guard over a document has exactly one job — it is the reader that never gets
tired — and **its carve-out is the next hiding place**. Any exception phrased as "an illustrative
mention inside explanatory prose" is decided by whoever writes the next paragraph, which is the same
failure mode as the original defect: a rule whose violation is invisible at the site that causes it.
`frontend-dev` was right that inventing that distinction was not its call. It was not mine to invent
either — it was mine to make unnecessary.

### The tradeoff, named

**What is given up:** §6.1 loses two concrete token names in one sentence, and with them a little
vividness — `` `--spacing-lg` `` reads more sharply than "a key in that namespace". I also accept
that the guard stays **blunt**: it cannot tell a mention from a declaration, will never be taught to,
and will therefore keep rejecting any future prose that names a retired token, including prose
written in good faith. That is the intended cost — a blunt guard over a document is answerable by
rewording the document, and rewording *is* the remedy, because the document has no business naming
a token that does not exist.

**What is kept:** the explanation, in full — the namespace mechanism, the `max-w-3xl` consequence,
the 64px legal disclosure, the two-spec duration and the "every check passed" sting all survive
verbatim. And the recurrence guard is untouched: the defect this spec exists to prevent is a
**declaration**, and declarations are caught by case 1 (`app/globals.css`) and case 5 (`DESIGN.md`'s
frontmatter `spacing:` block, which is the doc's only machine-readable declaration site). Both keep
their boundaries word for word. **A reworded doc cannot satisfy case 1 or case 5** — that is where
the "a guard satisfiable by rewording is not a guard" constraint lands, and it lands untouched.

### Why this does not amend `spec.md`

AC12 reads "no occurrence of a retired token name survives in `DESIGN.md`, stated over the whole
file", with V3 = 0 as corroboration. Narrowing case 4 would have contradicted AC12 literally and
forced a second G1 amendment — the last one this gate is allowed. The ruling as written leaves AC12
true as printed and V3 at 0. **No spec bounce, no criterion relaxed, and G1's remaining bounce stays
in the bank.**

### The substitute text — `product-designer`'s to accept or replace

`design.md` §6.1, one sentence. Everything else in §6.1 is unchanged, and no other §6 subsection is
touched. Today:

> A `--spacing-lg` key does not merely name a value: in Tailwind 4 the `--spacing-*` namespace also
> feeds the container scale, so declaring `--spacing-3xl` silently redefines `max-w-3xl` — and it
> did, …

Substitute:

> A key in that namespace does not merely name a value: in Tailwind 4 the `--spacing-*` namespace
> also feeds the container scale, so declaring one named `3xl` silently redefines `max-w-3xl` — and
> it did, …

Two phrases. `` `--spacing-lg` key `` → `` a key in that namespace ``; `` declaring `--spacing-3xl` ``
→ `` declaring one named `3xl` ``. The rest of the sentence — "rendering the legal disclosure footer
as a 64px column at every viewport for two whole specs while every check in the repository passed" —
is kept byte for byte, because that clause is the part that does the teaching.

Checked, not assumed: the full paragraph with this substitution returns `[]` under case 4's regex.
`max-w-3xl`, `--spacing-*`, `--spacing: 0.25rem` and `calc(var(--spacing) * 6)` all survive — none of
them matches a non-numeric suffix.

**The one binding constraint on the designer**, if she prefers different words: the paragraph must
contain no literal `--spacing-<non-numeric>`. Generic forms (`--spacing-*`, `--spacing-<name>`) and
container-utility names (`max-w-3xl`) are guard-clean and are how §6.5 already says it. The
*content* of the sentence — what it explains, how forcefully — is hers, and I am not ruling on it.

### What `frontend-dev` does with it

1. **Resume T6 now.** Do not wait for G3. The one red case is named here, owned by
   `product-designer`, and closes on a two-phrase edit.
2. When `design.md` run 2 lands, re-substitute **`DESIGN.md:393` only** — the §6.1 blockquote,
   verbatim, same rule as before: substitute, do not compose. Nothing else in `DESIGN.md` moves.
3. Re-run `pnpm test __tests__/spacing-guards.test.ts` (five green) and V3 (= 0). That closes T8 and
   B8 together.
4. **T9 does not start until `pnpm check` is fully green.**
