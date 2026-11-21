# 0008 — intermittent layout shift on custo da hora

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** in-progress
**Next agent:** `frontend-dev`, on **T5b only** — `plan.md` §5. **The §6.1 checkpoint ran and
bounced the build gate once (bounce 1 of 2).** The ruling is `plan.md` **§6.1.1**, decisions
**D16–D19**, and it is summarised in this file under *§6.1 checkpoint — the ruling* below.

**Neither a remedy nor an impasse.** T5's `diagnosis.md` reports that experiment A's frame sampler
never captured the anomalous geometry; the raw log shows the sampler **recorded no frame at all** in
every reproducing load, so that null is a fact about the instrument and not about the state
(**D16**), and experiment B does not repair it (**D17**). §6.1's row 3 — the impasse to the human —
fires only over experiments whose own logs show they observed something, and a **fourth row was
added to §6.1's table** to say so durably. **T5b** re-runs A, F.A and D with the sampler's coverage
printed and a positive control in front of them; it edits no source file and names no cause.

T1–T7 are **done**, `pnpm check` green (lint, typecheck, 609 tests, 61 files); see each task's
section below. **T8 stays blocked** until §6's remedy tasks exist and B1 returns.

**Below this line is the prior routing note, left standing as the record of what unblocked T1–T7.**
**Next agent (superseded):** `frontend-dev` (G5), on **T1–T7 only**. **B2 and B3 are ruled and discharged
(`tech-lead`, G5 run 2 — `plan.md` §1.4, D9–D15):** T4(a), T3's local cells and **T7** are unblocked,
T7's census is now stated per route (`/custo-da-hora` = 4, `/` = 10) and the local artifact is a
pinned commit, `local@5c0c6fa (tree 93b626c)`. **T5 gains experiment F** — the `/` replication —
because `/` reproduces. In parallel and blocking nothing the developer is running:
**`product-manager` owns B1; B4 is DISCHARGED (G5 run 2 — AC3 rewritten, scope unchanged)**; **B5 is DISCHARGED (`product-designer`, 2026-09-19 — `design.md` §A.3.1/§A.3.2/§A.3.3 written from a fresh measurement in an isolated production build; the `/` seeded delta is `0 / +440.00` at 390, `0 / +336.00` at 1024 and **`0 / +294.00`** at 1440, and the empty cell is `0 / −34.00` at every viewport)**. `plan.md` is written and **contains no
remedy task**: the cause is AC3's deliverable, so the plan builds instruments and measurements, in
order, and stops at a checkpoint (`plan.md` §6) where `tech-lead` writes the remedy against the
diagnosis. `frontend-dev` reads `plan.md` §1 and §5's two standing rules before T1, and **T5's stop
condition before it runs a single experiment**.

In parallel: **`product-manager` owns blocker B1** — AC5 as written is red on a build with no defect
(`design.md` §A.4, lesson **040**). It blocks **T8 only**; nothing in T1–T7 reads AC5's threshold.

G3 is closed: `design.md` is written, and `content-writer` did not run because `legal.md` §6 O1
mandates no string and `spec.md` § Out of scope forbids adding or rewording one — so `copy.md` has
no work and AC6's exemption list stays empty from both G2 and G3.
**Bounces:** **1** — build gate, run 1 → `frontend-dev` (T5b), at the `plan.md` §6.1 checkpoint. **Ceiling is two per gate**; on a third the pipeline stops and goes to the human.

**Carried out of `0004` at G4.** `product-designer` measured the defect at `0004` G3 and named no
cause; `tech-lead` ruled it a separate spec and wrote five things it must measure
(`.specs/0004-lcp-render-delay/plan.md` §5, D1). All five are in `spec.md` § Scope items 1–3, 7 and
AC1/AC2/AC7. **No cause is named at G1** (lesson **032**): the diagnosis is AC3, a deliverable.

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| spec | product-manager | **closed — run 2** | 2 | `spec.md` — **blocker B1 discharged**: AC5 rewritten at run 2, bounded on both sides, scored per cell off this spec's own two-target probe; green in all 32 known-good cells and red on the anomalous frame |
| law | labor-law-analyst | **closed — `pass`** | 1 | `legal.md` |
| design | product-designer | **closed** — corrected in place at G5 run 2 for **B5**: §A.3's `/` row replaced by **§A.3.1** (journey seed `0 / +440.00` at 390, `0 / +336.00` at 1024, **`0 / +294.00`** at 1440; empty `0 / −34.00` at every viewport; column `top` delta `0` in all twelve `/` cells), the protocol and artifact in **§A.3.2**, the hand-forward in **§A.3.3**, §A.2's two settled `/` cells struck, and §D.2's K1/K2/K3 re-run over the admitted cells. **No target, invariant verdict, token, state, motion or surface changes, and no `/custo-da-hora` row is touched.** | 1 | `design.md` |
| copy | content-writer | **n/a — no string mandated** (`legal.md` §6 O1) | 0 | `copy.md` (template, unfilled) |
| plan | tech-lead | **re-opened at the §6 checkpoint — run 3** | 3 | `plan.md` — T1–T8; **no remedy task, by ruling**; reopens at the §6 checkpoint. **Run 2 (mid-G5, no source file touched):** §1.4 **D9–D15** — B2 ruled (pinned artifact), B3 ruled (per-route census), §2's decomposition replaced because `/` reproduces, T5 gains experiment **F**, T7 and T2(a) and T8 amended. **Run 3 (the §6.1 checkpoint, no source file touched):** **§6.1.1 D16–D19**, a fourth row on §6.1's triage table, task **T5b**, three new § Risks rows, lesson **064** |
| build | frontend-dev | **bounced once — T5b open; T1–T7 done; T8 blocked** | 2 | tasks below — T1–T7 done, `pnpm check` green. **T5b** is issued by the §6.1 checkpoint (`plan.md` §6.1.1) and is the only open task; T8 returns after the checkpoint re-opens and needs B1 |
| qa | qa-engineer | pending | 0 | `reports/qa.md` |
| audit | web-standards-auditor | pending | 0 | `reports/audit.md` |
| release | release-manager | pending | 0 | `reports/release.md` |
| preview | web-standards-auditor | pending | 0 | `reports/audit-preview.md` |

## Tasks

Full text in `plan.md` §5. **No source file is edited by T1–T6 or T8; T7 is the only task that adds
a file to the tree.** `pnpm check` is green after every one of them.

| Id | Title | Owner | State |
|---|---|---|---|
| T1 | The rate probe, calibrated against the one cell known to reproduce | frontend-dev | **done** — see below |
| T2 | The two artifacts, established and provenanced (AC7) | frontend-dev | **done, run 2.** Pin `5c0c6fa`, tree `93b626c` (verified this session), tarball `sha256` recorded, porcelain pasted as context. `artifacts.md` §7 |
| T3 | The baseline rate — 16 dark cells, then the light stage (AC1, AC2) | frontend-dev | **done — all 32 cells** (deploy 8+8, `local@5c0c6fa` 8+8). One OOM incident on the local server, recovered (corrupted cells discarded and re-run clean). `evidence/shift-rate.md` |
| T4 | The pre-remedy baselines that cannot be taken later (AC6, AC8, the two-target geometry) | frontend-dev | **all of (a)/(b)/(c) done.** (a) `evidence/pre-remedy/innertext-{root,custo-da-hora}-{seeded,empty}.txt`, `local@5c0c6fa`, dark 390, 3500 ms, times masked; `/`'s (b) rows are routed to `product-designer` as B5 |
| T5 | The diagnosis (AC3) — edits no source file, names no remedy | frontend-dev | **done, and partly superseded at the §6.1 checkpoint (`plan.md` §6.1.1 D16–D18).** Stop condition fired. A–F all ran to completion (D was resumed this session after an instrument crash, see below); no cause discriminated (item 1/2); item 6 verdict is **one event, both routes**. `evidence/diagnosis.md`. **Voided:** A's null, §3's card sentence, §4's A/B rows, D's mutation/restore marks. **Stands:** E (10/10), the T1/T3/B/C rates, F's `top=84` signature on both routes |
| T6 | The LR6.1 co-presence sampler and its negative control (`legal.md` V1) | frontend-dev | **done, deploy artifact, 16 cells** — see below |
| T7 | The committed guard: no node in this subtree has a zero box (AC9) | frontend-dev | **done.** `tests/e2e/column-stability.spec.ts` — 96/96 green (twice), both routes' seen-red proofs recorded, per-route census (`/custo-da-hora` = 4, `/` = 10) holds |
| **T5b** | **The frame record experiment A was specified to produce, and did not** | frontend-dev | **open — this is the bounce.** `plan.md` §5 T5b (a)–(g). Edits no source file; `frame-stream.mjs` only, which is gitignored evidence. Stop condition in (a): if `framesLength=0`, (b) is the whole task |
| T8 | Post-remedy re-measurement (AC4, AC5, AC6, AC8, AC9) | frontend-dev | **blocked** — needs §6's remedy tasks, and AC5 needs B1 |
| — | **The remedy** | — | **not written, and the checkpoint did not write one.** `plan.md` §6.1.1: neither of §6.1's first two rows fired, and row 3 (the impasse) does not fire over an experiment that produced no observation. The checkpoint re-opens on T5b's output, still bound by §6.2's R1–R12 — **R3 forbids touching `cur`** |

## T1 — calibration result

`evidence/shift-rate.mjs` built (reuses `0004`'s observer/seed/formatter verbatim, plus a derived
`zeroBox` field per D5 and a node census per load, added rather than substituted). Calibration
command run this session, full stdout in `evidence/t1-calibration.log`:

```
node evidence/shift-rate.mjs --route /custo-da-hora --storage seeded --viewport 390x844 \
  --theme dark --runs 20 --log evidence/t1-calibration.log
```

**Result: `anyEntry>=0.1 = 2/20`, `sumCls>0.1 = 2/20`, `zeroBox = 2/20`, `flags = 0`.** The two
reproducing loads (run 2, run 17) both show the `prev=84,632` anomalous frame with `zeroBox=true`,
matching `design.md` §A.4's `prev` frame exactly. This is **not** the ≈5/20 X6 predicted — it is
neither 0/20 nor 20/20 (plan.md's own stop conditions), so per plan.md T1 it is recorded and the
build proceeds rather than treated as an instrument defect. Binomial noise at `n=20` on a
measured-elsewhere rate of 25% easily produces 10%; T3's larger sample (and any repeat of this
exact cell inside it) is what decides whether the rate itself moved. 20 load lines, 1 `CELL DONE`
line, `nodes=` on every load, 0 `COLUMN_COUNT` flags — done-when clauses satisfied.

## T3 — dark pass, deploy artifact, 8 cells, done; local artifact blocked by B2; light stage in progress

`evidence/shift-rate-dark.log`, full stdout, 160 loads:

| Cell (`artifact/route/storage/viewport/theme`) | `sumCls>0.1` | `anyEntry>=0.1` | `zeroBox` | entries of any value |
|---|---|---|---|---|
| `deploy/│/seeded/390x844/dark` | 1/20 | 1/20 | 0/20 | 21 |
| `deploy/│/seeded/1024x768/dark` | 0/20 | 0/20 | 0/20 | 20 |
| `deploy/│/empty/390x844/dark` | 0/20 | 0/20 | 0/20 | 21 |
| `deploy/│/empty/1024x768/dark` | 0/20 | 0/20 | 0/20 | 20 |
| `deploy/custo-da-hora/seeded/390x844/dark` | 5/20 | 5/20 | 5/20 | 25 |
| `deploy/custo-da-hora/seeded/1024x768/dark` | 0/20 | 0/20 | 0/20 | 21 |
| `deploy/custo-da-hora/empty/390x844/dark` | 0/20 | 0/20 | 0/20 | **0** |
| `deploy/custo-da-hora/empty/1024x768/dark` | 0/20 | 0/20 | 0/20 | 20 |

(`│` stands for the route `/`, kept literal above only to avoid a stray Markdown list marker; the
raw log's cell key is the literal double-slash `deploy///seeded/…` produced by
`${artifact}/${route}/...` when `route` is itself `"/"` — cosmetic, unambiguous, not worth a second
edit to the instrument mid-measurement.)

**`/custo-da-hora` seeded 390 dark reproduces at 5/20 (25%)**, matching `0004` X6's own number on
this exact host/viewport/theme/seed **exactly**. Confirms the instrument (T1's stop condition:
neither 0/20 nor 20/20, and here it lands on the number X6 predicted).

**New finding, not in any prior record: `/` seeded 390 dark reproduces at 1/20 (5%), under D1's
journey seed** (X6 never measured this — its `/` cells used the salary seed, which `design.md` §A.2
showed is `partial seed`, D2). The one reproducing load (run 12) prints:

```
t=796 v=0.7206 :: DIV.lg:col-span-7.space-y-8 prev=84,760 cur=759,85 | DIV.relative prev=610,56 cur=0,0
  | DIV.relative prev=542,56 cur=0,0 | DIV.relative prev=437,56 cur=0,0 | DIV.relative prev=369,56 cur=0,0
```

**`top=84` is the identical anomalous-frame signature `design.md` §A.4 named for `/custo-da-hora`**
(`prev=84,632` there), on a different route, with four `DIV.relative` children collapsing instead of
one regime button + one wrapper + one icon. My `zeroBox` counter reads **0/20** for this cell because
it is wired to AC4's four `/custo-da-hora`-specific selectors (`plan.md` D5); it does not see this
cell's own collapsing children, which are different elements entirely (journey-form fields, not
`RegimeField`/`#horas-mensais`). **I name no cause** (lesson 032) — this is T5's diagnosis to make,
and it now has a second, independent occurrence of the same top-84 shape to explain, on the route
`spec.md` said "share[s] the shifting box." Flagged here so T5 does not start experimenting only on
`/custo-da-hora`.

`/custo-da-hora` empty 390 dark: **0 layout-shift entries of any value** across all 20 loads —
matches `spec.md`'s prior record exactly (`CLS = 0`, not merely under threshold).

**D3's light-stage rule, applied:** 7 of 8 dark cells recorded ≥1 entry of any value (only
`/custo-da-hora` empty 390 recorded zero); the fallback ("no cell anywhere" → repeat all eight
`/custo-da-hora` cells) does not apply. Running the light pass over **all eight cells** anyway — a
superset of "repeat the 7" cannot under-measure (the same tolerance `plan.md` D3 states for its own
fallback) and keeps one script invocation instead of a hand-picked subset. In progress in the
background at the time of this write; result appended once it lands.

**Light stage (`evidence/shift-rate-light.log`), all 8 cells, deploy:** `/custo-da-hora` seeded 390
reproduces at the **same 5/20 (25%)** in light as in dark — consistent with `design.md` **K2**. `/`
seeded 390 light: 0/20 (against 1/20 dark) — ordinary binomial spread at a ~5% rate, not read as a
theme effect. Full report: `evidence/shift-rate.md`, which also carries AC2's eight required
sentences (four stated, four blocked by B2) and the merged X6 rows. T3's stop-condition table fired
its first row: the deploy×390×seeded×`/custo-da-hora` cell reproduces (5/20) → proceed to T5 on that
cell, unchanged from what T1's calibration and X6 already pointed to.

## T4 — pre-remedy baselines, deploy portion

**(a) AC6 innerText baseline: fully blocked by B2** — `plan.md` names it explicitly "on the local
artifact," and the local artifact is not rebuilt while B2 is open.

**(b) Two-target geometry** (`evidence/two-target-geometry.mjs`, `pre-remedy/two-target-geometry.log`
and `.md`), 24 cells × 2 sub-loads, deploy only. `/custo-da-hora` matches `design.md` §A.3 to the
tenth of a pixel at 390 and 1440, and 1024 (unmeasured before) lands on the same `−126.0` height
delta as 1440, consistent with **K3**. **`/` does not match `design.md`'s stated `0/−140.4`
prediction, and this is `plan.md` T4(b)'s own named finding, not a defect I introduced**: `design.md`
§A.3's `/` number was taken under the old salary seed, which `plan.md` D1 ruled `partial seed` for
`/`; under D1's journey seed, `/`'s seeded column **grows** (+440.0 px at 390, +336.0 at 1024/1440)
and its **empty** cell does not equal Target 1 either (−34.0 px at every viewport — unlike
`/custo-da-hora`, whose empty cells equal Target 1 exactly, `Δ=0/0`, in every measurement this spec
has taken). Flagged for `product-designer`/`tech-lead`: `design.md` §A.3's `/` row is stale relative
to D1's seed change, and this does not block AC5 (whose amended wording, once B1 lands, scores each
cell against its own measured delta, not an enumerated one) but a reviewer diffing this table against
`design.md` verbatim will see a mismatch that is not a regression.

**(c) `hero-swap-geometry.mjs` re-run, unmodified, deploy** (`pre-remedy/hero-swap-geometry.txt`).
Seven of eight cells match `design.md` **I7**'s accepted numbers closely (`/custo-da-hora` dark 390 =
0.0099, matching the `hour`-period prediction exactly; `/` dark 390/1440 ≈ 0). **One cell does not:
`/`, light theme, 390px prints `CLS: 0.5076`, with a `t=239 value=0.5072521736582174` entry** — an
order of magnitude above I7's accepted `0/0.0000` ceiling for `/`, in an **unmodified `0004` script**
that has nothing to do with this spec's own seed or instrument. This is a **third, independent
occurrence of the reproducing shape** (large, single-entry, ≥0.5 CLS event), on route `/`, under yet
a different seed (`hero-swap-geometry.mjs`'s own: `entry`/`lunchStart`/`lunchEnd`/`grossSalary`,
`isManualExit=false` — not T1's journey seed). Consistent with T3's own 1/20 rate on `/` seeded 390
(a ~5% event can appear in a single `n=1` sample by design) — **I do not conclude that it is the same
event, and I name no cause** (lesson 032); recorded verbatim for T5, which now has three independent
sightings of a `≥0.5` CLS event on two routes to explain, not one.

## Run 2 — T2 redo, local artifact, T3's local cells, T7 fixed

**T2 redone under D9/D10.** `git rev-parse 5c0c6fa^{tree}` → `93b626cd85295d0749f800c1654b6de2f4bd6d72`,
matching D9 exactly — stop condition does not fire. Tarball `sha256`:
`29158ce1349aa851490449149cb0d01bfa627eabc59cff43309382e4974dc0ab`. Built and served on
`http://127.0.0.1:3100`; marker counts byte-identical to run 1. `artifacts.md` §7 carries the full
provenance. Every sentence below names this artifact **`local@5c0c6fa (tree 93b626c)`**.

**Incident: the local server was killed mid-measurement (OOM, exit 137), and the affected cells were
discarded and re-run, not salvaged.** `uptime` during the incident: load average **11.91** on 16
cores, `free -h` showed 5.0Gi free of 31Gi — consistent with sibling agents' concurrent builds
(`AGENTS.md` §5 — load several times the core count means a run proves nothing yet). Six of the
light-theme local cells came back with `flags=11` or `flags=20` (every load a `TIMEOUT` after the
server died) between the point of failure and the end of that invocation; **these six `CELL DONE`
lines were deleted from `shift-rate-light.log` before re-running**, because `--skip-completed` reads
whatever `CELL DONE` line is on record and a corrupted one would have been read as valid. The two
cells that completed before the crash (`local//​/seeded/390x844/light`,
`local//​/seeded/1024x768/light`) were verified clean (`flags=0`) and kept. Server restarted, health
re-confirmed, six cells re-run clean.

**T3 — local artifact, dark + light, 16 cells, done. `evidence/shift-rate.mjs`, `--artifact local
--host http://127.0.0.1:3100`.**

| Cell | `sumCls>0.1` | `anyEntry>=0.1` | `zeroBox` |
|---|---|---|---|
| `local//​/seeded/390x844/dark` | 1/20 | 1/20 | 0/20 |
| `local//​/seeded/1024x768/dark` | 0/20 | 0/20 | 0/20 |
| `local//​/empty/390x844/dark` | 0/20 | 0/20 | 0/20 |
| `local//​/empty/1024x768/dark` | 0/20 | 0/20 | 0/20 |
| `local/custo-da-hora/seeded/390x844/dark` | **0/20** | **0/20** | 0/20 |
| `local/custo-da-hora/seeded/1024x768/dark` | 0/20 | 0/20 | 0/20 |
| `local/custo-da-hora/empty/390x844/dark` | 0/20 | 0/20 | 0/20 |
| `local/custo-da-hora/empty/1024x768/dark` | 0/20 | 0/20 | 0/20 |
| `local//​/seeded/390x844/light` | 2/20 | 2/20 | 0/20 |
| `local//​/seeded/1024x768/light` | 0/20 | 0/20 | 0/20 |
| `local//​/empty/390x844/light` | 0/20 | 0/20 | 0/20 |
| `local//​/empty/1024x768/light` | 0/20 | 0/20 | 0/20 |
| `local/custo-da-hora/seeded/390x844/light` | 0/20 | 0/20 | 0/20 |
| `local/custo-da-hora/seeded/1024x768/light` | 0/20 | 0/20 | 0/20 |
| `local/custo-da-hora/empty/390x844/light` | 0/20 | 0/20 | 0/20 |
| `local/custo-da-hora/empty/1024x768/light` | 0/20 | 0/20 | 0/20 |

**Major artifact discrepancy, recorded plainly, not interpreted (lesson 032): `local@5c0c6fa`'s
`/custo-da-hora` seeded 390 dark measures 0/20, against deploy's 5/20 for the identical cell.** `/`
seeded 390 reproduces on **both** artifacts at a consistent low rate (dark: 1/20 both; light: 0/20
deploy vs 2/20 local — both inside binomial spread of a small rate at `n=20`). `plan.md` T2(d)'s
sentence is the one this defers to: *"deployment and local differ in bytes and in path; a delta
between them is not attributable to source."* Both are genuine builds of the same pinned commit —
this is not a build error — but the rate the whole spec is built around (`/custo-da-hora` seeded 390)
is an order of magnitude apart between the two artifacts measured this session, and I do not
speculate why (Vercel's edge/runtime environment vs local `next start`, timing differences under load
from sibling agents' concurrent work, or something else). Flagged for `tech-lead`: **T5's diagnosis
below is built entirely on the `deploy` artifact**, where the defect is measured most reliably; a
diagnosis that generalizes to `local@5c0c6fa` without re-running experiments there would be
overreaching (`AGENTS.md` §5).

**T7 rewritten per D11**, census per route: `/custo-da-hora` exactly 4 (unchanged), `/` exactly 10 —
the column, 8 journey-textbox wrappers (`column.getByRole("textbox")` asserted `=== 8` before
deriving wrappers, per D11), and the `svg.tabler-icon-login` icon, all three counts and their source
lines checked against `journey-form.tsx`, `date-time-input.tsx`, `masked-input.tsx` and `input.tsx`
this session. Isolated-copy run and both seen-red proofs are below, in T7's own section.

## T7 — the committed guard, done, isolated copy, pin `5c0c6fa` (tree `93b626c`)

**`tests/e2e/column-stability.spec.ts` built and run in an isolated copy** — `git archive 5c0c6fa`,
tarball extracted to the scratchpad, `node_modules` hard-linked, own `.next`, a free port
(`ss -ltnp` confirmed), `--project=chromium` only, the spec file copied in after extraction (it is
not in the pinned commit). Confirmed this session that the extracted copy's `hooks/use-salary-calculator.ts`
is byte-identical to `git show 5c0c6fa:hooks/use-salary-calculator.ts` and differs from the working
tree exactly where `0004`/`0007`'s uncommitted edits do — the copy is the pin, not the tree.

**Green, twice, 96/96 both times**: first pass after the D11 census fix (`t7-run2.log`), and again
after the seen-red proofs below with the throwaway init script removed (`t7-final-green.log`) —
`96 passed` in both, no case skipped, no `flags`.

**The seen-red proof, one per route, both required by D11/B3:**

- **`/custo-da-hora`**: sanity pass with no injection, 16/16 green (`t7-redproof-custo.log`, the
  16 cells of that route's own test 3). With a throwaway `page.addInitScript` injecting
  `svg.tabler-icon-briefcase { display: none }`, **16/16 red**, every failure
  `"gives the regime briefcase icon a non-zero box"` (`t7-redproof-custo-2.log`).
- **`/`**: one wrong attempt recorded rather than hidden — the first CSS selector used to hide the
  login icon was over-broad and also hid `/custo-da-hora`'s briefcase icon, so **all 32 cells failed**
  (`t7-redproof-root-2.log`; `/custo-da-hora`'s own count dropped to `3`, `"expected exactly 4 nodes
  for route /custo-da-hora"`). Fixed to the exact class `svg.tabler-icon-login`, matching the
  selector `spec.md`/this file's own census table names, and re-run: **`/`'s 16 cells red**, every
  failure `"gives the entrada label icon a non-zero box"`, **`/custo-da-hora`'s 16 cells stay green**
  (`t7-redproof-root-3.log`) — the injection is isolated to the route it targets, which is what a
  per-route census is supposed to prove.

**Init script removed** after both proofs; `t7-final-green.log` is the confirmation.

**Done-when, checked:** 96/96 green (twice) · both routes seen red once, each on the node its own
selector names · `pnpm check` green · `pnpm test __tests__/comment-free-code.test.ts` green (below).
Advances **AC9**.

**One lint defect found and fixed this session, unrelated to the isolated-copy run**:
`tests/e2e/column-stability.spec.ts:1:1` had an unsorted import (`organizeImports`), caught by
`pnpm exec biome check` on the committed file in the working tree. Fixed with
`biome check --write` (import order only, no other change — confirmed by
`git status --porcelain -- tests/e2e/column-stability.spec.ts`, still `??`, untracked, single file).
`pnpm check` is green on it now.

## T5 — the diagnosis, done (stop condition)

`evidence/diagnosis.md`. **No cause discriminated**, item 1/2: every one of the 5 reproductions this
task captured (4 on `/custo-da-hora`, 1 on `/`, experiment **F**) shows the RAF-based frame sampler
never recording a frame at the anomalous `top≈84` geometry — `frameIndex=-1`, `outerHTML NOT FOUND`,
5/5. Experiment B confirms the sampler itself does not perturb the rate (4/20 vs T3's 5/20 on the
identical cell), so this is a real limit of the instrument, not noise from adding it. **Item 6, the
two-route verdict: one event, both routes** — `top=84` to the pixel on both, and the collapsing
children are structurally analogous (an icon-bearing control + input wrapper(s) near the top of the
shared column) rather than identical, fully explained by what each route mounts inside
`DIV.lg:col-span-7`. Experiment **C** independently split D4's confound: warm-unseeded (prior nav, no
stored values) reproduces at 4/20, cold-seeded (stored values, no prior nav) at 2/20 — **neither
factor alone is necessary or sufficient**, and neither is zero. Handed to `tech-lead` for the impasse
write-up (`plan.md` §6.1 row 3). The task's own before/after tree-hash check (added at the run-2
amendment, after this task had already started) could not be satisfied as a true start/end pair — see
`diagnosis.md` §7 for the gap, recorded rather than hidden: the two hashes taken around finalizing the
report do not match, and the porcelain file list (identical both times) attributes the mismatch to
sibling specs' continuing edits inside already-dirty files, not to this task.

**Correction made this session, before trusting the file: Experiment D had crashed at run 13/20 and
the diagnosis was built on a 2-of-12 partial sample without saying so.** `frame-stream.mjs`'s
per-load navigation had no retry around a transient `page.goto` timeout, unlike `shift-rate.mjs`'s
`runLoad`, which retries twice and flags a non-reproduction rather than crashing the process — a
single 30 s timeout on run 13's seeding navigation raised uncaught and killed `node` after runs 1–12
(two reproductions, runs 8/9). Fixed by adding the identical retry pattern (`loadWithRetry`, two
attempts, flagged skip on double failure) around every experiment that shares `loadOnce` (A, B, C,
D) — no experiment's semantics changed, only its resilience to a network blip. Machine was at
`load1 ≈ 29` when this was found; re-ran D only after `load1` dropped under `8` and no sibling
Chromium process was running (`pgrep -f chrome-headless-shell` empty), per the standing rule. **Clean
`n=20`: 1/20 reproduced** (run 11, `shiftT=628 < FCP=856`, both marks `MISSING`) — inside binomial
spread of the ~20–25% rate and consistent with, not contradicting, the crashed run's own two
observations (both also pre-FCP). `diagnosis.md`'s D row and §7 are corrected in place; the crashed
run's raw output stays in `diagnosis-raw.log` rather than deleted. A second before/after tree-hash
pair, taken around this correction alone, **matches**: `0a89ff8c…`, both times, 20 files, none of
them touched by this task.

## T6 — LR6.1 co-presence, done, deploy artifact

`evidence/lr6-baseline.log`, `evidence/lr6-negative-control.log`, 16 cells (2 viewport × 2 theme × 2
route × 2 storage). **One correction made before trusting the result**: the reuse instruction (`plan.md`
T6, "`g2-copresence.mjs`'s marker table … copied verbatim") was violated on the first pass — I paired
`DS7_art59`/`DS7_art71` against an invented `/\d+h ?\d+m/` regex instead of `legal.md` §1.3's calibrated
proxy, `NUM_dsrRow` (`Domingos|Descanso|DSR`), which is what `legal.md`'s own worked measurement uses
for **both** DS2 and DS7. The first run printed deltas of `321`–`1326` ms — a large false LR6.1
violation caused entirely by the wrong claim marker, not by the app. Fixed by reusing `CLAIM_DSR_ROW`
for DS7 as well (matching the calibrated pairing exactly) and `CLAIM_ANY_CURRENCY` for DS5/DS6 (no
calibrated precedent exists for those two; the hourly value they qualify is currency-formatted, same
as DS1's proxy). Re-run clean: **every measured delta is `0` or `1` ms** — the same sub-frame jitter
`legal.md` §1.3 already calibrated as "not separate frames," never a real ordering violation.
`measured + unreached = 6` holds in all 16 cells. **Most pairs are `UNREACHED` today, and that is a
calendar fact, not a defect**: `/`'s `CLAIM_ANY_CURRENCY` never fires because the journey calculator
under this seed shows no currency at all, and `DS2`/`DS7`'s `CLAIM_DSR_ROW` proxy depends on the DSR
row rendering, which is date-dependent (Súmula 172 concerns a weekly rest day) — `legal.md`'s own
calibration was taken on a different calendar day. **Negative control**: 4 of 16 cells (all on
`/custo-da-hora`, where the currency claim fires) show `delta > 0` — `1355`, `1362`, `1277`,
`2112` ms — proving the sampler can report a positive delta and is not decoration.

## §6.1 checkpoint — the ruling (`tech-lead`, run 1, 2026-09-19)

Full text and the decisions **D16–D19** are in `plan.md` **§6.1.1**. **No source file was edited,
and no browser measurement was taken, to reach it.** Summary, and the evidence each line rests on:

**The verdict: bounce to `frontend-dev` (T5b). Not a remedy, and not yet an impasse.**

### What is known, and with what evidence

| Known | Evidence | Confidence |
|---|---|---|
| The defect is real and reproduces | `/custo-da-hora` seeded 390 dark **5/20** on deploy, matching `0004` X6 exactly; `/` seeded 390 dark **1/20**, same `top=84` signature | high — two independent instruments, three sightings on `/` under three different seeds |
| The intended geometry is fully determined by the server bytes | Experiment **E**, **10/10 loads**: `607 / 1200.7` on `/custo-da-hora` and `771.4 / 1674.4` on `/`, every load, scripting off. No anomaly ever | high — `design.md` **K1** confirmed, not refuted |
| *Seeded* is two factors and they split | **C(i)** warm-unseeded **4/20**, **C(ii)** cold-seeded **2/20**, true-empty **0/20**, full seeded 5/20. **Prior navigation carries most of the effect; stored values carry some.** Neither is necessary, neither is sufficient | medium-high — rates at `n=20`, so the ordering is readable and the exact ratios are not |
| The anomalous frame's `top` is invariant and its `height` is not | Six sightings: `84,632` ×3, `84,383`, `84,438`, `84,760`. `top = 84` in all six, `height` takes four values | high — machine-produced, unclipped rects (`84+632 ≠ 844`) |
| The shift fires before FCP | **D**, 3/3 reproducing loads across both attempts: `628 < 856`, `294 < 326`, `338 < 462` | **medium, and weaker than it reads.** Two of D's five specified marks; the other three are `MISSING` from an instrument §6.1.1 D17 shows was not fully alive, and D prints nothing for the 19 non-reproducing loads, so there is no FCP distribution to read it against |

### What is not known, and this is the part the checkpoint would not paper over

**No cause.** No artefact, no mechanism, no condition — `diagnosis.md` asserts none, and it is right
not to.

**And the one observation that was supposed to discriminate a cause was never made.** `plan.md` T5
experiment **A** ordered the 15 frames either side of the shift plus the column's `outerHTML` at the
anomalous frame. `grep -c 'frame\[' evidence/diagnosis-raw.log` returns **0**. Given the emit loop
(`frame-stream.mjs:203-206`, `windowStart = max(0, -1-15) = 0`, `windowEnd = min(frames.length, 15)`),
zero emitted lines forces `frames.length === 0`: **the sampler recorded no frame at all in any of the
five reproducing loads.** `frameIndex = -1` is `findIndex(f => f.t >= shift.t)` over an empty array —
it is not, and was read as, *no frame at `top ≈ 84`*. Corroborated by D's marks: a `MutationObserver`
on `document.documentElement` with `subtree/childList/characterData/attributes` returned
`FIRST_MUTATION_MAIN_CONTENT=MISSING` on a hydrating Next.js page in 3/3 loads, and
`RESTORE_VISIBLE_IN_ARIA_LIVE` — marked only from inside the `requestAnimationFrame` loop — is
`MISSING` in the same 3, while the two `PerformanceObserver`s in the same init script returned
`layout-shift` entries and `FCP` normally.

### The competing explanations, and which experiment separates them

1. **The anomalous box is never painted** — it is a layout state computed and superseded between
   presented frames, so a `requestAnimationFrame` sampler cannot be scheduled into it.
2. **The anomalous box is painted and the sampler simply was not running**, for a reason internal to
   `frame-stream.mjs`, in which case the frames are there to be read and nobody has looked.
3. **The sampler runs but its cadence under 4× throttle straddles the event** — the shift lands at
   205–941 ms and a long frame either side of it would leave a hole.

**The record today cannot distinguish any of the three**, because non-reproducing loads print no
frame information at all and no load anywhere prints a frame count. **T5b (a)–(c) separates them in
one pass**: a coverage line on every load (`framesLength`, `firstFrameT`, `lastFrameT`, `maxGapMs`),
an `initScriptCompleted` flag that separates *the loop never ticked* from *the init script never
reached it*, a deliberately-failed run proving the new `SAMPLER_EMPTY` flag fires, and then A and
F.A re-run unchanged in every other respect.

**Why it was not run:** it was specified and not delivered, and the report's summary did not read as
a non-delivery. The cost of settling it is ~40 throttled loads on an idle machine — an hour, against
a human's attention on a question that would have come back as *"re-run the experiment."*

### The recommendation, if T5b's null holds

If (c) runs with a demonstrably live sampler — non-zero `framesLength` on every load, `maxGapMs`
printed — and **still** captures no frame at `top ≈ 84`, then explanation 1 is the standing reading,
the null is supported, and **§6.1 row 3 fires for real**: `tech-lead` writes the impasse to the human
with the bracketing frames beside it. The recommendation attached to it now, so it is not invented
under pressure later: **do not remedy against an unattributed 568.7 px.** `design.md` §A.5 already
refutes the only written account by 401.9 px, §6.2 **R1/R2/R4** forbid every shape of symptom
suppression, and **AC9's committed guard (T7, 96/96 green) already ships** — the squad holds a
durable non-regression check on exactly the invariant that fails, with no cause named. That is a
defensible place to pause a spec, and it is a better one than a lever aimed at a term nobody has
measured.

**Two bounces is the ceiling on this gate. This is one.** A second T5b returning the same
unsupported shape goes to the human as an impasse, not to a third experiment.

## Blockers

**B2 — RULED AND DISCHARGED** (`tech-lead`, G5 run 2). **The artifact is pinned, and the stop
condition now tests the pin instead of the working tree.** `plan.md` §1.4 **D9/D10**, T2(a) rewritten.
The developer's reading of the plan was correct and the stop condition was mine, written
unconditionally over a mechanism that cannot reach a `git archive` artifact: committed objects do not
see an uncommitted edit, so the condition blocked a build whose bytes it could not affect. Ruling:

- The local artifact is **commit `5c0c6fa99f15f7c46e1bfb668006550981d0dc03`**, tree
  **`93b626cd85295d0749f800c1654b6de2f4bd6d72`** — both read this session with `git log -1 --format=%H`
  and `git rev-parse 5c0c6fa^{tree}`, read-only. It is named **`local@5c0c6fa (tree 93b626c)`** in
  every report sentence, never "the local build" and never by a build date. **Identifiable by what it
  was built from, which is what the team lead's instruction required and what the old condition was
  reaching for by the wrong route.**
- The **only** stop condition left on T2(a): `git rev-parse $LOCAL_PIN^{tree}` not printing
  `93b626cd…` — history rewritten under the artifact. The porcelain snapshot is still pasted, as
  **context**, under the sentence *"the local artifact is commit 5c0c6fa and is deliberately not the
  working tree; the uncommitted work of specs 0004 and 0007 is outside it."*
- **T4(a) is unblocked**, as are T3's local cells and every `artifact=local` cell of T5. T2(a) is
  re-run only to record the three provenance lines; the bytes are identical to run 1, which archived
  the same commit.
- **Not weakened:** the artifact is still a clean, isolated, committed-bytes build, and what it is
  evidence for is unchanged — it is evidence about commit `5c0c6fa`, and now says so. **T8 inherits a
  new rule:** the post-remedy local artifact is the same pin plus the remedy patch applied inside the
  copy, patch `sha256` recorded; a before/after pair on two different bases is invalid and both runs
  are redone.
- Lesson **056** written against my own plan, not the developer's execution.

**B3 — RULED AND DISCHARGED** (`tech-lead`, G5 run 2). **The census is per route; the exact-size
assertion stays.** `plan.md` §1.4 **D11**, T7 rewritten. The developer stopped correctly: a
per-route exemption is not theirs to invent. The defect is mine — AC4's four selectors were read off
`/custo-da-hora`'s evidence and then applied "for each route" without listing `/`'s own source.

| Route | Expected size | Nodes |
|---|---|---|
| `/custo-da-hora` | **exactly 4** | unchanged: `.lg\:col-span-7`, `button[aria-controls="regime-options"]`, `#horas-mensais`'s `parentElement`, `svg.tabler-icon-briefcase` |
| `/` | **exactly 10** | the column (1) + **8** `input.parentElement` wrappers (`components/atoms/input.tsx:10`) for the 8 textboxes inside the column + `svg.tabler-icon-login` (1) |

Derived by listing the source, commands and line numbers in `plan.md` T7: four `DateTimeInput`s
(`journey-form.tsx:184-219`) × two `MaskedInput`s each (`date-time-input.tsx:73-87`) = 8 wrappers;
`day-summary.tsx` renders no input; `CollapsiblePanel` **unmounts** closed children
(`collapsible-panel.tsx:15`) and the settings panel starts closed, so no closed-panel exemption is
needed; `IconLogin` appears once inside the column and `@tabler/icons-react` emits
`tabler-icon-login` (`createReactComponent.mjs:20`). `/` also asserts `getByRole("textbox")` resolves
to **exactly 8** before the wrappers are derived, so the set can fail loudly in both of the ways it
can shrink. The **seen-red proof is now one per route** — briefcase hidden on `/custo-da-hora`,
`tabler-icon-login` hidden on `/`. `/`'s node list is derived from source under `design.md` **K1**,
which is route-independent; if `product-designer` wants a different set for `/`, it arrives through
B5 and `plan.md` is amended.

**B4 — DISCHARGED, `product-manager`, G5 run 2. `spec.md` AC3 is rewritten: `|R|` verdicts, R derived
from the rate run's own stdout by a command, per-route impasse routing. The report below is kept as
the finding that produced it.** AC3's "one sentence" form presumed one event, and a second route
now reproduces. `/` reproduces at **1/20** (deploy, seeded under D1's journey seed, 390, dark) with
the **identical `top=84` anomalous-frame signature**, and an unmodified `0004` `hero-swap-geometry.mjs`
printed **`CLS 0.5076`** on `/` light 390 under a third seed — three independent sightings on the
route the plan's own decomposition called `none`. **Scope is not re-opened and `product-manager` is
not being asked to widen it** (`plan.md` D13): `spec.md` AC1/AC2/AC4/AC5/AC9 are already written over
`{/, /custo-da-hora}`, and G1 ruled `/` measured under the identical protocol. The one thing that is
`product-manager`'s: **if the experiments land on two distinct events, AC3's single sentence cannot
carry the diagnosis.** The amendment recommended, for one edit: *one sentence per reproducing route,
each with its own proving and its own refuting experiment, plus the experiment that discriminated the
two events — and if they are one event, one sentence, unchanged.* **Scope of the block: the scoring
of AC3 only.** T5's experiments A–F run either way and `diagnosis.md` is written in whichever form
the experiments land in (`plan.md` T5, item 6).

**B5 — DISCHARGED, `product-designer`, design gate, 2026-09-19. `design.md` §A.3's `/` row is
corrected by re-measurement in this agent's own isolated production build, and §A.2's two settled `/`
cells are struck with it. One figure in the routing note did not survive the re-measure.** The
report below is kept as the finding that produced it.

**Ruling, and the numbers it rests on.** Re-measured rather than transcribed (`AGENTS.md` §5, lesson
**050**): `rsync` of the working tree minus `node_modules`/`.next`/`.git` into this session's
scratchpad, `node_modules` hard-linked with `cp -al`, `rm -rf .next`, `pnpm build` with
`playwright.config.ts`'s three `NEXT_PUBLIC_*` values, `next start` on **port 3417** confirmed free
with `ss -ltn` — never `next dev`, and never the shared `.next`. A sibling session's `next-server`
held **3100** and was left alone; `uptime` **4.00–6.05** on 16 cores; no other browser process at
launch. Chromium 1.63.0, border box, `getBoundingClientRect().top + window.scrollY`, Target 1 at
`javaScriptEnabled: false`, Target 2 settled at 3500 ms, `colorScheme` explicit, **72 rows**, the
`.lg\:col-span-7` census asserted at **exactly 1** on every one of them.

| `/` cell | §A.3 predicted | Routed to me | **Measured, and now in §A.3.1** |
|---|---|---|---|
| journey seed, 390 | `Δ = 0 / −140.4` | `+440.0` | **`0 / +440.00`** — confirmed |
| journey seed, 1024 | `Δ = 0 / −140.4` | `+336.0` | **`0 / +336.00`** — confirmed |
| journey seed, 1440 | `Δ = 0 / −140.4` | `+336.0` | **`0 / +294.00`** — **the routed figure is one viewport's number applied to two** |
| empty, every viewport | `= Target 1` | `−34.0` | **`0 / −34.00`** at 390, 1024 and 1440, both themes — confirmed |
| partial (salary) seed | — | — | **identical to `empty` in all six cells**, which confirms `plan.md` D1 on the geometry and not only on the key list |
| column `top`, every `/` cell | `0` | — | **`0`** — `771.39` at 390, `112.00` at 1024 and 1440, in **all 36 measured `/` rows** (3 seeds × 3 viewports × 2 themes × 2 targets). **K3 holds** |

**Why 1024 and 1440 differ, measured and not inferred:** the column's own width is **546.66** at 1024
against **733.33** at 1440, so the restored day's content wraps to fewer line boxes at the wider
column. Target 1 cannot show this — with scripting off the column holds no restored content and
measures **1110.75** at both. `n = 3` per viewport per theme, 18 loads, identical to the hundredth.

**Two things the re-measure found that the routing note did not carry.** First, **§A.2's settled `/`
cells are stale too, not only §A.3's derived Δ**: `1534.0` and `970.4` are struck and replaced by the
measured `1640.36` and `1076.75`. `/`'s **first-paint** cells reproduce exactly and stand. Second,
**`/`'s empty cell is not `(0, 0)`** — it settles 34.00 px shorter than its own server paint, which is
neither of the two changes §A.3 permits. That is handed to `tech-lead` in **§A.3.3** as a quantity
with the experiment that would discriminate it; **no cause is named at this gate** (`spec.md`
§ Non-goals, lesson **032**).

**This changes nothing in flight.** The correction scores nothing — AC5 run 2 exempts per cell from
this spec's own pre-remedy capture — and it touches no `/custo-da-hora` row, no invariant's verdict,
no target, no token and no surface. **K1, K2 and K3 were re-run over the cells the journey seed and
the 1024 viewport admitted** rather than assumed to carry, and each green one is green for a reason
stated in §D.2. **§A.4's defect frame is untouched**: every number in it is a `/custo-da-hora` reading
against `/custo-da-hora`'s Target 1.

**One artifact note every later gate needs.** §A.2's `/custo-da-hora` rows were read on the
**pre-`0007`** artifact. On the tree the developer is running, `/custo-da-hora`'s column measures
**1347.13** at 390 against §A.2's **1200.7** — `+146.43`, which is `0007`'s D4 slot plus its field,
not a defect and not a `/` phenomenon. `/`'s Target 1 reproduces §A.2 to the hundredth on the same
build, which is the evidence that **`0007` moves nothing on `/`**.

---

**The finding, as it arrived. B5 — `product-designer`, design gate. `design.md` §A.3's `/` row is stale against `plan.md` D1's
seed change, with both numbers side by side.** Measured by T4(b) on the deployed preview, `n = 2`
sub-loads per cell, journey seed:

| Cell | `design.md` §A.3 predicts | T4(b) measured |
|---|---|---|
| `/` seeded, 390 | `771.4 / 1674.4 → 771.4 / 1534.0` — `Δ = 0 / −140.4` (column shrinks) | the seeded column **grows**: **+440.0 px** at 390 |
| `/` seeded, 1024 / 1440 | `112.0 / 1110.8 → 112.0 / 970.4` — `Δ = 0 / −140.4` | **+336.0 px** at both |
| `/` empty, every viewport | equals Target 1 (`Δ = 0/0`, as `/custo-da-hora`'s empty cells do in every measurement this spec has taken) | **−34.0 px** from Target 1 at every viewport |

§A.3's `/` numbers were taken under the **salary** seed, which `plan.md` D1/D2 label `partial seed`
for `/` — no key `hooks/use-work-calculator.ts` reads is in it. Asked of `product-designer`: restate
§A.3's `/` row (and **K2**/**K3** if either moves) against D1's journey seed, and rule on the −34.0 px
empty-state delta, which is a change with no stored data behind it. **`tech-lead` does not correct a
`design.md` number** (lesson **050**). **Scope of the block: nothing the developer is running.** AC5
as rewritten at run 2 exempts per cell from **this spec's own pre-remedy capture**, never from an
enumerated number, so no criterion scores against §A.3's `/` row; the block binds T8's `/` rows and
any reviewer diffing T4(b) against `design.md` verbatim.

**B2 — original report from `frontend-dev`, kept for the record.** `tech-lead`, build gate. `plan.md` T2's own stop condition has fired: the shared tree is no
longer the tree T2 measured, and rebuilding the local artifact is not this agent's call.**
`git status --porcelain -- app components hooks lib`, re-run at the start of this run, no longer
matches the delta `STATUS.md` recorded at G4 run 1 (`app/page.tsx`, `app/custo-da-hora/page.tsx`,
metadata-only). It now also shows `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`,
`components/organisms/salary-calculator.tsx`, `hooks/use-salary-calculator.ts`, `lib/duration.ts`,
`lib/salary-period.ts`, `lib/storage.ts`, `lib/utils.ts` modified — uncommitted, in place, growing
between two checks taken minutes apart in this same session (`salary-calculator.tsx` and
`use-salary-calculator.ts` appeared on the second check). These are sibling specs' (`0004`, `0007`)
live edits to the divisor/salary-period logic, not this spec's. `plan.md` T2(a)'s literal rule:
*"If any hunk touches `components/`, `hooks/`, `lib/`, or a rendered element anywhere, stop and
report: the measured artifact would not be the tree, and which of the two gets measured is not a
decision this plan delegates."* That condition is now met, so **T2's local-production-build cell is
not rebuilt by this agent.**

**What this does and does not block.** `git archive HEAD` reads only committed objects and is
provably unaffected by an uncommitted working-tree edit elsewhere — `HEAD` is unchanged
(`5c0c6fa`) since the previous run's `artifacts.md` was written, so the *bytes* of a freshly
archived local artifact would be identical to before. But the plan's stop condition is written
unconditionally, without a carve-out for "unaffected by this specific mechanism," and ruling on
that carve-out is exactly the kind of architecture/process judgment `frontend-dev` does not make
(`AGENTS.md` §4 rule 7). **Scope of the block:** the `--artifact local` cells of T3, T4(a)'s AC6
baseline (explicitly "on the local artifact"), T4(b)'s local sub-cells, and any T5/T6/T8 cell
naming `artifact=local`. **Not blocked:** every `--artifact deploy` cell (T1 is deploy-only and
already done), T4(c) (`hero-swap-geometry.mjs` always ran against the deployed host in `0004`), and
**T7**, whose isolated copy is built the same way (`git archive HEAD`, hard-linked `node_modules`)
for a different reason — it is a non-regression guard for this spec's own committed file, not a
measurement of "is the local build the tree," so T2's stop condition does not extend to it; recorded
here so a reviewer does not read T7's isolated build as a quiet workaround of B2.

**Recommendation, not a ruling:** the archived bytes are unaffected by the dirty tree, so the
gate-safe path is likely to re-run T2(a)'s exact recipe (same `git archive HEAD`), record the new
porcelain snapshot beside the old one in `artifacts.md`, and note the two are still the same
artifact by hash of the tarball — but that comparison, and whether it satisfies the plan's "stop and
report," is `tech-lead`'s call, not this agent's.

**B3 — original report from `frontend-dev`, kept for the record.** `tech-lead`, build gate. `plan.md` T7's four-node census, applied "for each route," contradicts
the codebase: three of the four AC4 nodes do not exist on `/`.** `tests/e2e/column-stability.spec.ts`
built exactly to spec — nested `describe`s per `{viewport} × {theme} × {route} × {storage}`, three
tests each, the third asserting the four AC4 node selectors resolve to exactly 4 elements before
checking any box. Run in an isolated copy (`git archive HEAD`, hard-linked `node_modules`, `PORT=3101`,
`--project=chromium` only): **80 passed, 16 failed**, full log at
`<scratch>/t7-run.log` (session scratchpad, not committed). Every failure is the same assertion,
`expected exactly one instance of each of the four AC4 nodes / Received: 1`, and every failure is on
route `/` — all 4 viewports × 2 themes × 2 storage states, 16/16. Every `/custo-da-hora` cell passes.
This is structural, not flaky: `design.md`'s own subtree diagram (`plan.md` §3) puts `RegimeField`
(the regime button and its briefcase `<legend>` icon) and the `#horas-mensais` input wrapper inside
`SalaryCalculator` only; `/` renders `WorkCalculator`, which has neither. Only `DIV.lg:col-span-7`
(the column itself) is shared, so `/`'s count is always 1, never 4. `spec.md` AC4's four selectors
are read verbatim from `0004`'s `/custo-da-hora`-only shift evidence and were never claimed to exist
on `/`; AC4 itself survives this because a shift criterion is vacuously satisfied by an absent node,
but T7's test 3 asserts **positive existence**, which cannot be vacuous. **I did not invent a
per-route exemption or a second selector set for `/` — that is a call about what `/`'s own
non-zero-box invariant should be, and `design.md` never named one.** `tests/e2e/column-stability.spec.ts`
is left in the tree, uncommitted, exactly as built; `pnpm check` is unaffected (vitest does not run
`tests/e2e/**`, and the file typechecks and lints clean — confirmed this session). **T7 is not
"done": `pnpm e2e` is red on 16/96 cases for a reason `plan.md` did not anticipate**, and the fix is
either (a) scope test 3 to `/custo-da-hora` only, with `/`'s equivalent invariant named separately by
whoever owns that decision, or (b) name `/`'s own four (or fewer) analogous nodes. Both are decisions
this agent does not make.

**B1 — `product-manager`, spec gate, run 2. AC5 does not discriminate and must be amended.**
Routed from `design.md` §A.4, measured: AC5 demands `top` and `height` differ by ≤ 1 px between FCP
and 3500 ms and exempts only the hero displacement, but the **correct** build moves `height` by
**−147.0 px** at 390 and **−126.0 px** at 1440 on `/custo-da-hora`, and **−140.4 px** at both
viewports on `/`. No exemption covers the height side, so AC5 is red on a build with no defect
(lesson **040**). `tech-lead` does not rewrite an acceptance criterion; the wording recommended —
per-cell, measured by this spec's own two-target geometry probe rather than enumerated, and bounded
on **both** sides — is in `plan.md` §1.2.

**Scope of the block: T8 only.** T1–T7 sample the rects and never read AC5's threshold, so the build
gate starts now and does not wait.

## Handed in from `0004` T1/X6 — the rate and the trigger condition, measured

Recorded by `tech-lead` at `0004`'s T1 triage. **This is evidence handed over, not a ruling on this
spec's scope**, which is `product-manager`'s and is already closed at G1.

`0004`'s T1 ran X6 regardless of its own branch and produced exactly the two things this spec's G1
decisions log said it would merge if it landed first: a rate with a denominator, at the same fixed
`n = 20`, and the trigger condition isolated. Source of record:
`.specs/0004-lcp-render-delay/evidence/t1-attribution.md` §4 and
`.specs/0004-lcp-render-delay/evidence/t1-x6-cls-rate.log` (both gitignored, regenerable with
`.specs/0004-lcp-render-delay/evidence/t1-x6-cls-rate.mjs`, a parameterised copy of the designer's
`cls-early-shift.mjs`). 80 loads: 20 per route per storage condition, branch-alias deployment,
390×844, dark, 4× CPU throttle, reproduction counted as any single layout-shift entry with
`value >= 0.1`.

| Condition | Route | n | Reproductions (`value ≥ 0.1`) | Rate |
|---|---|---|---|---|
| `localStorage` seeded (`grossSalary=4200`, `salaryPeriod=month`) | `/` | 20 | 0 | **0/20** |
| `localStorage` seeded | `/custo-da-hora` | 20 | 5 | **5/20 (25%)** |
| `localStorage` empty (first-time visitor) | `/` | 20 | 0 | **0/20** |
| `localStorage` empty | `/custo-da-hora` | 20 | 0 | **0/20** |

- **The trigger condition is seeded storage on `/custo-da-hora` specifically.** The three other cells
  are 0/20. The 20 empty-storage loads of `/custo-da-hora` measured `CLS = 0` exactly — no
  layout-shift entry at all, not merely under the threshold.
- The five reproductions are four at `value=0.5452` (runs 5, 13, 14, 15) and one at `value=0.3173`
  (run 16), at `t=188`–`t=304` ms, all with the same shape: `DIV.lg:col-span-7.space-y-8` losing its
  previous height while `BUTTON.flex.w-full.items-center`, one or two `DIV.relative` and an SVG icon
  (`tabler-icon-briefcase`, once `tabler-icon-alert-triangle`) each collapse entirely
  (`prev=…,H cur=0,0`).
- The other 15 seeded loads show the deterministic `CLS=0.0481` hero-swap shift only.
- **No cause is named** (lesson **032**), and none may be read into the table.
- **This does not replace this spec's own measurement**, per this spec's own G1 ruling: it is dark
  only, deployment only, 390 only, and it carries neither the light-theme axis, the 1024 axis, nor
  the before/after DOM boxes that `spec.md` § Scope items 1–3 require. It merges into AC1's table as
  additional cells and bounds the expected rate before the run.
- One caveat to carry: one `seeded=false` `/custo-da-hora` load hit a 30 s navigation timeout
  mid-batch and was resumed as runs 11–20 with `t1-x6-cls-rate-resume.mjs`. All 80 loads are
  accounted for, but that cell is two batches, not one.

## Decisions log

| When | Agent | Decision |
|---|---|---|
| G5 §6.1 checkpoint | tech-lead | **Experiment A recorded zero frames, so the diagnosis' central null is a fact about the instrument, not about the state** (`plan.md` §6.1.1 **D16**). `frameIndex` is `frames.findIndex(f => f.t >= shift.t)` — the first frame at or after the shift, **not** the frame at `top ≈ 84`, which is a separate code path. With `windowStart = max(0, -1-15) = 0` and `windowEnd = min(frames.length, 15)`, the **0** `frame[` lines in `diagnosis-raw.log` against **5** `frameIndex=-1` lines force `frames.length === 0` in all five reproducing loads. `diagnosis.md` §4's *"frame dumps … lines 1–38"* describes data the cited artifact does not contain. **Ruled on the raw log, not on the report's summary of it** |
| G5 §6.1 checkpoint | tech-lead | **Experiment B does not repair A, and one of its two branches voids B as well** (**D17**). B compared rates; its premise is that the sampler was running, and non-reproducing loads print no frame information, so the record cannot say. Either the sampler failed **only** on the loads it exists to observe — a finding that outranks A's null — or it recorded nothing anywhere, and B measured whether a dead sampler perturbs the defect. Corroborated by D: a `MutationObserver` on `document.documentElement` with `subtree/childList/characterData/attributes` returned `MISSING` in 3/3 loads on a hydrating Next.js page, and `RESTORE_VISIBLE_IN_ARIA_LIVE` (marked only inside the RAF loop) in the same 3, while both `PerformanceObserver`s returned data |
| G5 §6.1 checkpoint | tech-lead | **What survives is recorded, because voiding one experiment is not voiding the record** (**D18**). **Stands:** E 10/10 (`design.md` **K1** confirmed), the T1/T3/B/C rates — **warm-unseeded 4/20 against cold-seeded 2/20 against true-empty 0/20, so prior navigation carries most of the effect and stored values carry some** — and F's `top = 84` on both routes. **Voided:** A's null, §3's card sentence, §4's A/B rows, D's mutation and restore marks. **Weakened:** D's *shift-before-FCP*, which is 2 of 5 specified marks with no FCP distribution from the 19 non-reproducing loads to read it against |
| G5 §6.1 checkpoint | tech-lead | **The component verdict and the system verdict are separated, and they route differently** (**D19**). *"The instrument that produced the null did not run"* is a component verdict and belongs to `frontend-dev`; *"no cause is known"* is a system verdict and belongs to the human. §6.1 row 3 says no remedy is improvised — it does not license an impasse built on an unrun experiment. **A fourth row is added to §6.1's triage table** so the distinction is durable: an experiment that did not produce the observation it was specified to produce is a bounce, not an impasse. **Bounce 1 of 2 on the build gate; a second T5b returning the same shape goes to the human** |
| G5 §6.1 checkpoint | tech-lead | **The partial-sample audit the checkpoint ordered is complete and clean.** Every other experiment ran to full `n` — A 20, B 20, C(i) 20, C(ii) 20, F.A 20, E 5 ×2, D (clean) 20 — counted in `diagnosis-raw.log`. **No other conclusion in `diagnosis.md` rests on a partial sample**, and the defect found here predates the crash: it was present in A's first run. The developer's handling of the crash — finding the `page.goto` retry gap rather than writing around it, waiting for the machine to clear, correcting in place, keeping the crashed raw output — is the handling T5b repeats |
| G5 §6.1 checkpoint | tech-lead | **The defect is in my plan before it is in the execution, and lesson 064 is written against it.** T5's *Done when* checked that the experiments ran and that stdout existed; it never checked that the frame record inside it was non-empty. T1 carries a census vacuity guard and T6 carries a negative control called *not optional* — **T5, the one task whose deliverable is a null result, carried neither.** T5b makes `SAMPLER_EMPTY` a permanent flag and (e) also collects the `/` empty node census `design.md` §A.3.3 routed into F and F did not print |
| G5 run 2 | product-designer | **B5 discharged: `design.md` §A.3's `/` row is replaced by §A.3.1, measured in my own isolated production build, and §A.2's two settled `/` cells are struck with it.** Re-measured, not transcribed (`AGENTS.md` §5, lesson **050**): `rsync` + `cp -al node_modules` + `rm -rf .next` + `pnpm build` with `playwright.config.ts`'s three `NEXT_PUBLIC_*` values + `next start` on **3417** confirmed free, never `next dev` and never the shared `.next`; a sibling's server on 3100 left alone; 72 rows with the `.lg\:col-span-7` census asserted at exactly 1 on each. **Journey seed: `0 / +440.00` at 390, `0 / +336.00` at 1024, `0 / +294.00` at 1440.** The routed `+336.0 at 1024/1440` was one viewport's number applied to two: the column is **546.66** wide at 1024 and **733.33** at 1440, so the restored content wraps to fewer line boxes at the wider column, and Target 1 cannot show it because with scripting off the column holds no restored content and measures 1110.75 at both. `n = 3` per viewport per theme, identical to the hundredth. **Empty: `0 / −34.00` at all three viewports, both themes** — confirmed. **The salary seed returns the empty column box in all six cells**, which confirms `plan.md` D1 on the geometry and not only on the key list. Column `top` is `0` delta in all 36 measured `/` rows, so **K3 holds** |
| G5 run 2 | product-designer | **`/`'s empty cell is not `(0, 0)` and I do not say why.** It settles **34.00 px** shorter than its own server paint at every viewport, in both themes — neither of the two changes §A.3 permits. It is handed to `tech-lead` in §A.3.3 as a quantity plus the experiment that would discriminate it (diff the node census between the JS-off paint and the 3500 ms state on `/` empty at 390; a node missing at 3500 ms makes it a mount difference, a matching census makes it a reflow). **No cause is named at this gate** (`spec.md` § Non-goals, lesson **032**), and AC5's empty-cell clause cannot be written as *equals Target 1* on `/` without failing a build with no defect (lesson **040**) |
| G5 run 2 | product-designer | **K1, K2 and K3 were re-run over the cells the widened domain admitted, not assumed to carry** (`AGENTS.md` §5 — widening a domain is a re-execution). K3's sample grows from sixteen `lg:` cells to **forty-eight** and returns 112.00 on every one; K2 is compared dark-against-light row by row across all 72 rows rather than asserted; K1 is green because `addInitScript` cannot reach a scripting-disabled context, which is the premise the invariant was resting on and is now written down. Recorded with each green clause's reason, so a later gate can tell when one stops being true |
| G5 run 2 | product-designer | **Artifact discipline, recorded because two specs are reading these tables.** §A.2's `/custo-da-hora` rows are readings of the **pre-`0007`** artifact; on the delivered tree that column measures **1347.13** at 390 against §A.2's **1200.7**, a `+146.43` that is `0007`'s D4 slot plus its field and not a defect. `/`'s Target 1 reproduces §A.2 to the hundredth on the same build, which is the evidence that `0007` moves nothing on `/` — and is why the `/` correction could be taken on the working tree rather than on the pin |
| G5 run 2 | product-manager | **B4 discharged: AC3's form decided, scope not widened.** No route, cell, file or criterion is added — AC1/AC2/AC4/AC5/AC9 already run over `{/, /custo-da-hora}` and `tech-lead`'s absorption stands. AC3 now derives its route set **R** from the pre-remedy rate run's own stdout by a command, instead of presuming one event: `|R|` verdicts, each with its proving **and** its refuting experiment; if two verdicts assert the same event the file names the **discriminating** experiment; every measured route not in R gets a non-reproduction line with the rate that says so. **Derived, never enumerated** (`AGENTS.md` §5 — a domain is a test), so a third reproducing route is covered without another G1. NODE is named per route, because the artefact that moves on `/custo-da-hora` is not assumed to be the one that moves on `/`. Scored on a count, run this session: **known-bad** `|R| = 2` (`/` 1/20, `/custo-da-hora` 5/20, from `evidence/shift-rate-dark.log` + `shift-rate-light.log`) and **known-good** `|R| = 0` (the same command over the same logs with every numerator forced to 0 — a remedied run), both pasted into the criterion (lessons **040**, **051**). Impasse routing is now **per member of R**, so an unresolved `/` does not hold a resolved `/custo-da-hora`. |
| G5 run 2 | tech-lead | **B2: the local artifact is identified by what it was built from — pin `5c0c6fa`, tree `93b626c` — and the stop condition tests the pin, not the working tree** (`plan.md` §1.4 D9/D10, T2(a)). My run-1 condition was written unconditionally over a mechanism that cannot reach a `git archive` artifact, and it blocked a build whose bytes an uncommitted sibling edit cannot touch. What the artifact is evidence for is unchanged and now stated: **evidence about commit `5c0c6fa`**, named `local@5c0c6fa (tree 93b626c)` in every sentence, never by a build date. T4(a), T3's local cells and every `artifact=local` cell are unblocked. **T8 inherits the pairing rule:** the post-remedy local artifact is the same pin plus the remedy patch applied in the copy, patch `sha256` recorded; a before/after pair on two different bases is invalid and both runs are redone. |
| G5 run 2 | tech-lead | **B3: the census is per route, with each route's expected size derived by listing that route's source — `/custo-da-hora` exactly 4, `/` exactly 10** (`plan.md` §1.4 D11, T7). The exact-size-before-iterating assertion is **kept**, because it is the clause that turns a renamed class into a red test; what was wrong was asserting one route's four nodes "for each route". `/`'s ten are the column, the eight `input.parentElement` wrappers of the four `DateTimeInput`s, and `svg.tabler-icon-login`, each traced to a file and a line in `plan.md` T7; `/` also asserts `getByRole("textbox") === 8` before deriving the wrappers. The seen-red proof becomes one per route — a route whose census was never seen red is how the run-1 wording shipped an unrun `/` clause. `design.md` **K1** is route-independent, so this is test strategy derived from source, not a design change; a different `/` set comes back through B5. |
| G5 run 2 | tech-lead | **`/` reproduces, so §2's decomposition is replaced rather than defended, and version 1 is left standing beside version 2** (`plan.md` §2, D12). Three sightings, none in the record §2 was written from: `/ seeded 390 dark` at **1/20** with the identical `top=84` signature, its light twin at 0/20, and an unmodified `0004` `hero-swap-geometry.mjs` at **`CLS 0.5076`** on `/` light 390 under a third seed. The old `/ × seeded = 0/20` row was measured under the **salary** seed, which D1/D2 already labelled `partial seed` for `/`. **Consequence: `/` leaves §2 consequence 1's strike list** — a remedy that fixes `/custo-da-hora` and leaves `/` at 1/20 has reduced the metric without closing it, and T8 reports the two cells separately. **No cause is named** (lesson **032**). |
| G5 run 2 | tech-lead | **The `/` reproduction does not re-open scope, and the one thing that is `product-manager`'s is raised as B4** (`plan.md` D13). `spec.md` AC1/AC2/AC4/AC5/AC9 already run over `{/, /custo-da-hora}` and G1 ruled `/` measured under the identical protocol — no new route, cell, file or criterion is needed, and none is added here. What is not mine: **AC3's "one sentence" form presumes one event.** B4 asks for one edit — one sentence per reproducing route, each with its proving and refuting experiment, plus the experiment that discriminated them, and the single-sentence form unchanged if the experiments land on one event. It blocks **the scoring of AC3 only**; A–F run either way (`plan.md` T5 item 6). |
| G5 run 2 | tech-lead | **T5 gains experiment F — the `/` replication — and it is read qualitatively, never as a rate** (`plan.md` D14, T5). F is A repeated on `/ seeded 390 dark` under D1's journey seed, `n = 20`, plus E on `/` at `n = 5`; it asks whether a frame with the column at `top ≈ 84` occurs and which boxes are `0,0` in it. At a 1/20 rate, `n = 20` has no power to detect the sampler's perturbation, so **B is not run on `/`** and no `/` rate is compared to anything; a null F is recorded as *did not reproduce in this sample*, never as *unaffected*. |
| G5 run 2 | tech-lead | **`design.md` §A.3's `/` row is stale against D1's seed and is routed to `product-designer` as B5, not corrected here** (`plan.md` D15). §A.3 predicts `Δ = 0 / −140.4` on `/`; T4(b) measured the seeded column **growing** +440.0 px at 390 and +336.0 at 1024/1440, and the **empty** cell sitting −34.0 px from Target 1 at every viewport. §A.3's numbers were taken under the salary seed. It scores nothing — AC5 run 2 exempts per cell from this spec's own pre-remedy capture — so it blocks nothing the developer is running, and it is a `design.md` correction, which `tech-lead` does not write (lesson **050**). |
| G5 run 2 | tech-lead | **Lesson 056 written against my own plan: restate every plan-wide rule per element of the axis it will be applied over, with that element's own expected value and its own premise re-derived.** B2 and B3 are one defect with two faces — a stop condition generalised past the mechanism that could make it true, and a set size generalised past the route it was derived in. Both surfaced at G5, where the agent that meets them is not allowed to narrow them, which is why both cost a stop. The ledger was at 29/30 and this takes the last slot; the next lesson anywhere in the squad requires a promotion or a retirement first. |
| G1 run 1 | product-manager | **Scope came from a search re-run in this session, not from the routing brief's node list.** `grep -rn "col-span" app components` returns 5 matches and exactly one `lg:col-span-7`, at `components/templates/calculator-layout.tsx:17` — **the shifting box is one file and both routes render it.** `grep -rln 'AlertBanner\|CollapsiblePanel\|AnimatePresence' app components` returns 8 files, and both routes carry conditionally-mounted subtrees inside the main column (`journey-form.tsx`, `day-summary.tsx` on `/`; `salary-calculator.tsx` on `/custo-da-hora`). The brief's asymmetry between the routes is **not visible in the source**, so `/` is measured under the identical protocol rather than waved through on its 0.0011 (lesson **034**). |
| G1 run 1 | product-manager | **The brief's "the form column losing 383px" is half the event.** Read off `0004` `evidence/cls-early-shift.txt` verbatim: `DIV.lg:col-span-7` goes `prev=84,632 cur=595,249` — it loses 383 px of height **and moves 511 px down the page**. The displacement is the larger half and every criterion is written so that a diagnosis has to explain both. Recorded because a spec that quotes only the height would accept a remedy that fixes only the height. |
| G1 run 1 | product-manager | **No cause is named at G1, and `design.md` and `copy.md` are forbidden from naming one** (`spec.md` § Non-goals). AC3 requires the cause to be one sentence with the experiment that proves it **and** the experiment that would have refuted it; if no experiment resolves it, the spec escalates rather than guesses. This follows lesson **032** and `product-designer`'s deliberate silence at `0004` G3. |
| G1 run 1 | product-manager | **Production is context, not a control, and the defect is not declared preview-only.** `curl` on both hosts this session: `workload.devrma.com/custo-da-hora` contains `Informe o seu sal` **0 times**, the branch-alias preview **1 time** — different artifacts. But both contain `lg:col-span-7`, `Regime de Trabalho` and `flex w-full items-center justify-between` exactly once, so the implicated structure exists on production too. **AC7 decides reproduction by measurement**, and the urgency is not framed before it (lesson **032** obligation 1). |
| G1 run 1 | product-manager | **`0004`'s T1/X6 has not run**, so this spec produces the rate itself instead of waiting on it: `evidence/t1-attribution.md` does not exist and `0004` `STATUS.md` still names `frontend-dev` as next for T1. If X6 lands before this spec's G5, its output is merged into AC1's table as additional cells — it does **not** replace the fixed `n = 20` denominator. |
| G1 run 1 | product-manager | **`n = 20` is fixed inside the verification command, and no criterion uses a range, max or min as a threshold** (lesson **014**). AC4's bar is the fixed CWV boundary 0.1 applied to **all 20** loads of every cell, which cannot move when evidence grows. The light-theme axis is two-stage (dark first, light wherever dark found ≥1 event, plus the four `/custo-da-hora` cells if dark found none) to keep 640 throttled loads from becoming the reason the measurement is skipped; the rule is written into `spec.md` § Open questions so a later gate does not read the prune as an omission. |
| G1 run 1 | product-manager | **The numeric criteria pass lesson 011's lever test.** AC4's lever — the remedy on the nine files `spec.md` § Scope item 5 enumerates — is inside this spec's own In-scope list, and the quantity it moves (a shift of the `lg:col-span-7` box) is the quantity the criterion judges. The instrument was run in this tree before the criteria were written (`AGENTS.md` §5): `evidence/g1-instrument-check.mjs` printed `playwright chromium ok; CLS=0.0481`. |
| G1 run 1 | product-manager | **AC5 exists because CLS cannot see concealment.** A skeleton, a zero-opacity mount or a delayed render satisfies AC4 while the user still loses the field, so AC5 is written against `DIV.lg:col-span-7`'s measured box rather than against a score — and it carries the `design.md` **I7** exemption (hero displacement, bounded at 60.4 px at 390) in the same words as the § Out of scope bullet that protects I7. |
| G1 run 1 | product-manager | **`0004` G4's D4 — the `p-1.5` / `gap-1` segmented-track inset at `period-selector.tsx:10`, `journey-form.tsx:102`, `calculator-views.tsx:43` — is carried and explicitly not scoped here.** `tech-lead` routed it to `product-manager` as "plausibly the same spec". Ruling: no. It is a visual geometry change and a human approval point that no measurement in this spec touches, and folding it in makes this spec's zero-visual-diff claim unfalsifiable. It needs its own spec; recorded here so it is not lost. |
| G1 run 1 | product-manager | **Ad slots and cookie consent are excluded with a self-executing override:** a recorded shift source naming a node in `ad-manager.tsx`, `google-ad.tsx` or `cookie-consent.tsx` pulls that file into scope from AC1's own output, without a bounce. `PRODUCT.md` §8's reserved-slot commitment stays closed unless the measurement opens it. |
| `0004` T1 triage | tech-lead | **`0004`'s X6 landed and is recorded above, in § *Handed in from `0004` T1/X6*.** The G1 row that said X6 had not run is superseded as a fact, not as a ruling: `evidence/t1-attribution.md` now exists and its §4 carries `5/20 (25%)` on `/custo-da-hora` with seeded storage and `0/20` in all three other cells, at the same fixed `n = 20`. It merges into AC1's table as additional cells and does **not** replace this spec's own denominator, exactly as that G1 row directed. **No cause is named and this changes nothing about this spec's scope, which is `product-manager`'s.** `Next agent` is untouched. |
| G2 run 1 | labor-law-analyst | **`pass`. CLS is a quality metric here and carries no legal dimension; no stability clause was written.** Measured on the deployed preview this session: at the time the shift fires (t = 209–547 ms in my runs, t = 367 ms in `spec.md`'s), DS2/DS5/DS6/DS7 are **not in the DOM** (they first appear at 419–1589 ms) and DS1/DS3 sit at `vtop` 1216–2123 with the fold at 844. No disclosure a user could be reading is displaced. The `tech-lead`'s framing was tested, not accepted, and the counter-evidence is in `legal.md` §2.2: on the **healthiest** load in the set — `/` seeded, **CLS 0.0013** — DS1 moves **+474.2 px**, thirty-three times further than on the worst-scoring cell. Any floor calibrated to catch 511 px would condemn the correct build. |
| G2 run 1 | labor-law-analyst | **LR3's first bullet has been false for three gates and is corrected** (`legal.md` §4.1). *"Present in the server-rendered DOM"* is refuted by `curl` on the deployed head: `Súmula 172`, `Súmula 431` and `art. 59 da CLT` return **0** on both routes, as does the entire `DaySummary` that contains the numbers they qualify. It is also **unmeetable** — those surfaces are conditional on `localStorage`, and satisfying the clause literally means sending the user's salary to a server, against `PRODUCT.md` §5. I wrote that clause at `0005` over an enumerated domain and did not re-run it backwards when `0006` widened the domain by a test (lesson **024**). `AGENTS.md` §8's default is that the code is wrong when it disagrees with `legal.md`; here I rule the inverse, so it is flagged to the human as **Q2**. |
| G2 run 1 | labor-law-analyst | **One new binding clause: LR6.1, co-presence** (`legal.md` §4.2). A claim is never rendered without the disclosure that qualifies it — `frameIndex(disclosure) − frameIndex(its claim) ≤ 0`, sampled per `requestAnimationFrame` over `document.body.innerText`. Calibrated on a worked measurement of the intended state taken **before** the clause was written: frame delta **0 in 6/6** observations (`NUM_anyDuration` vs DS1 at 575/575, 149/150, 129/129 ms; `NUM_dsrRow` vs DS2/DS7 at 1588/1589, 445/445, 419/419). It requires a **negative control** before it is trusted, since it passes today and an assertion never seen red proves nothing. This settles **L5**: a disclosure has no obligation to render pre-hydration, because its claim does not either. |
| G2 run 1 | labor-law-analyst | **`spec.md` § Disclosure obligations item 2 is struck as measured vacuous** (`legal.md` §5.2). *"May not move a disclosure below the fold at 390 where it was above it before"* — measured, **no disclosure surface on either route in any storage state is above the fold at 390** in the correct build; the smallest `vtop` anywhere is **1245.5** against a fold at 844. The premise is never satisfied, so the clause can never fail. Items 1 and 3 are upheld (item 1 becomes LR6.1; item 3 is LR3 verbatim); item 4 is upheld as the product's bar, explicitly **not** carrying my veto (lesson **024**). |
| Q2 answered | labor-law-analyst | **The human confirmed the inversion on 2026-09-16: the rule is wrong, the code is right, and `legal.md` §4.1 takes effect.** The ground accepted is the one this gate gave — satisfying LR3's old bullet literally would send the user's salary to a server, against `PRODUCT.md` §5. Recorded because the ruling runs against `AGENTS.md` §8's default direction and the next agent to read it must see a human's signature, not an agent's. **The correction is retroactive and is recorded in place**, not silently: `.specs/0005-…/legal.md` §3 carries a supersession box above the refuted bullet with the original text left standing, and `.specs/0006-…/legal.md` §3 carries the matching note at the sentence — *"LR1 and LR3 stand unchanged, word for word"* — that widened the domain without re-running the clause. LR3 was false for **DS2, DS5, DS6 and DS7** at every gate from `0006` onward. No closed spec's verdict changes and `0008`'s G2 `pass` stands. Lesson **038**. |
| G2 run 1 | labor-law-analyst | **Two corrections to `spec.md`'s premises, both from source read this session.** (1) § Legal dependencies says "the column that shifts contains disclosures" — **DS1 is not in the column**; the `<footer>` at `calculator-views.tsx:73` is a *sibling* of the calculators, below `CalculatorLayout`'s grid, so a remedy bounded to § Scope item 5's nine files can move it hundreds of pixels without editing the file it lives in. (2) L1 says "`salary-calculator.tsx`'s three `AlertBanner`s" — only **two** are disclosure surfaces; DS3 (*Informe o seu salário bruto*) fails all three clauses of the `0006` §2.1 test and carries no veto, though `PRODUCT.md` §5 still makes it worth fixing. |
| G2 run 1 | labor-law-analyst | **This gate mandates no string, and says so to keep AC6 falsifiable** (`legal.md` §6, **O1**). `spec.md` § Out of scope grants G2 an override to mandate a disclosure; I decline it. O2–O4 forbid rewording any of the six surfaces, moving one out of `#main-content`, or deduplicating DS1 across the routes. **O5** is a routing instruction: if the remedy touches `use-salary-calculator.ts` or `use-work-calculator.ts` — which § Scope item 6 permits — **LR5.4 becomes a precondition** and `0004`'s open **F1** check must exist and be seen red before the remedy lands. |
| G2 run 1 | labor-law-analyst | **Deliberately not ruled on:** the cause (AC3's, and no clause here becomes unverifiable whichever way it lands — lesson **032**); `lib/` (four prior verifications, untouched by this spec); whether the defect reaches production (AC7's, measured not assumed); X1 (its own spec); `design.md` I7 and the `p-1.5` inset. The **art. 66 warning could not be rendered** and is recorded as unreached rather than bounded from its source text (lesson **031**) — `legal.md` §8 **Q3**, a G6 item for `qa-engineer`. |
| G2 run 1 | labor-law-analyst | **`0004`'s X6 hand-in landed in this file mid-gate and was folded into the ruling, not deferred** (`legal.md` §2.1). Its five reproductions at **t = 188–304 ms** and its isolation of the trigger to **seeded storage on `/custo-da-hora` (5/20)** narrow the window rather than widen it: in that exact cell the only LR-domain surface in the DOM before 304 ms is **DS1**, at `vtop` 1855.7–2123.2 with the fold at 844, and DS3 at 1216.9 carries no obligation (`0006` §2.3). **The set of disclosure surfaces both mounted and in the viewport when the defect fires is empty.** Recorded because a routed number that arrives mid-gate and goes unread is a number the next gate assumes was read. |
| G3 run 1 | product-designer | **The intended geometry is measured, not modelled, and it is stated as two targets** (`design.md` §A). `evidence/g3-geometry.mjs`, 32 cells — `{/custo-da-hora, /}` × `{390×844, 1440×900}` × `{dark, light}` × `{seeded, empty}` — each loaded twice, once with `javaScriptEnabled: false` (the server bytes = **Target 1**, first paint) and once settled at 3500 ms (**Target 2**). At 390 on `/custo-da-hora` the column is `607.0 / 1200.7` at first paint and `559.3 / 1053.7` settled+seeded. **Only two changes are permitted between the targets:** the column's top moves **−47.7 px** (the accepted `0004` I7 hero resize, recorded there as 47.6 for `month` — independently reproduced, unraised) and its height shrinks **−147.0 px** (the DS3 `AlertBanner` at 123 px plus its `mb-6`). Anything else is outside the design, and that sentence is what AC3's diagnosis and AC4/AC5's re-measurement are scored against. |
| G3 run 1 | product-designer | **`spec.md`'s "loses 383 px of height (632 → 249)" is an instrument artifact, and the correction changes what a diagnosis must explain.** `layout-shift` source rects are clipped to the viewport; `getBoundingClientRect()` is not. Three rows of `0004` `evidence/cls-early-shift.txt` have `top + height = 844` **exactly** — `cur=595,249`, `cur=547,297`, `prev=595,249`. So `595,249` is the **correct** column (Target 1 minus `PANEL_TRANSITION`'s 12 px `y`), clipped at the fold, and `84,632` (bottom 716, unclipped) is the anomalous frame. Restated against Target 1 at 390: the column is **523 px too high** and **568.7 px too short**, and it ends 128 px *above* the fold when it should run past it. **The diagnosis owes the `prev` frame, not the `cur` frame.** |
| G3 run 1 | product-designer | **AC5 needs a height-side exemption or it fails on a build with no defect** (lesson **040**). AC5 samples `getBoundingClientRect()` and demands `top` and `height` differ by ≤ 1 px between FCP and 3500 ms, exempting only the hero displacement. On the **correct** build at 390 seeded, `top` moves 47.7 px (covered by the existing I7 exemption) and **`height` moves 147.0 px, which no exemption covers**. AC5 as written is red on a known-good state. Routed to `tech-lead` at G4 with the numbers: the permitted height deltas are −147.0 px at 390 and −126.0 px at 1440 on `/custo-da-hora`, −140.4 px at both viewports on `/`. A reviewer will also read `height 1200.7`, not `249`, and must not read that as a regression. |
| G3 run 1 | product-designer | **The three zero-size elements have no legitimate zero state, at any paint, in any cell** (`design.md` §B). All three render at full size in the server bytes with scripting disabled, both viewports, both themes, both storage states: briefcase `svg` **16.0 × 16.0** (`w-4 h-4`), regime `button` **94.8 × 308.0** at 390 and **77.4 × 667.3** at 1440 (the 17.4 px difference is the summary wrapping to two lines at 308 px, content-driven, not a breakpoint), `DIV.relative` = the `#horas-mensais` `Input` wrapper at **56.0 px tall in every cell** (`h-14`). A remedy that makes a zero box *stable* rather than *absent* has fixed nothing. |
| G3 run 1 | product-designer | **Free refutation, handed to AC3: "the three children collapsed" cannot be the whole account.** Target 1 height 1200.7 minus the anomalous 632 is **568.7 px**, while the three reported zero boxes sum to `16.0 + 94.8 + 56.0 = 166.8` — **at most 29 %**, short by 401.9 px, and they are nested inside a card whose own box is not among the sources. The anomalous frame also matches neither target (568.7 px short of Target 1, 421.7 px short of Target 2), so a diagnosis that explains only the settled seeded state does not explain it. **No cause is named** (lesson **032**): `design.md` §A.5 lists the arithmetic identities as candidates an experiment can discriminate, explicitly flagged as not a diagnosis. |
| G3 run 1 | product-designer | **Reserving space is the wrong shape of answer, and the budget for it at 390 is 11.2 px** (`design.md` §C). Three grounds. (1) **Nothing to reserve** — the intended geometry is fully determined by the server bytes; the box is correct *first* and becomes wrong later, so a reservation adds a second wrong box on top of a right one. (2) **The displacement is not the column's to reserve** — 523 px of the error sit *above* the column, where the `order-first` aside stacks at 390; a `min-height` on `lg:col-span-7` cannot hold the column's top, and only an aside-side reservation could, which re-opens `0004`'s I1/I3/I5/I7 for a box that was never wrong. At 1440 there is nothing to reserve at all (**K3**). (3) **The price**, measured (`evidence/g3-firstscreen.mjs`): header + hero already occupy **71.9 %** of the 844 px first screen empty / **66.3 %** seeded; the column shows **237.0 px / 284.7 px**; `#salario-bruto` ends at **832.8** seeded — **11.2 px of slack** — and at **880.5** empty, i.e. **no complete control is on the first screen at all** in the empty state. Any reservation ≥ 12 px removes the only complete input control from the first mobile screen of the page that answers `PRODUCT.md` §1 question 3, and pushes every disclosure — nearest at `vtop` 1245.5, already 401 px past the fold (`legal.md` §5.2) — further away. `0004` G3 rejected a ~60 px hero reservation for a deterministic event 2–10× *under* threshold; this would be a larger reservation for an event in 5/20 loads of one cell. **`legal.md` §5.4 handed the pixel budget to the product; this is the product's answer, and it is no.** |
| G3 run 1 | product-designer | **Six new invariants, namespace `K1–K6`, deliberately not renumbering `0004`'s I1–I8** (`design.md` §D.2). **K1** the intended geometry is the server-paint geometry and no element in this subtree has a legitimate zero box; **K2** theme is geometrically inert — all 32 cells identical in dark and light, which also makes AC1's light axis a check on the *remedy* rather than on the layout; **K3** at ≥1024 the column's top is `112.0` in all sixteen cells and never moves, so all displacement lives at 390; **K4** no reserved height on the column **or the aside**, at any viewport (extending `spec.md` § Non-goals, which covers only the column); **K5** no skeleton, shimmer, placeholder, `aria-busy`, opacity ramp or mount animation anywhere in `#main-content`'s paint path, extending `0004` A.3's hero ruling to the column; **K6** every `motion` subtree stays inside `MotionConfig reducedMotion="user"` at `theme-provider.tsx:10`, because the CSS reset at `app/globals.css:303-315` overrides `transition-*` only and never reaches `motion`'s per-frame inline styles. Of `0004`'s eight, **I4, I6, I7 and I8 bind directly**; I1/I2/I3/I5 bind only if a remedy touches the aside, which §C.2 argues against. |
| G3 run 1 | product-designer | **No system change and no new token** (`design.md` § System change). `DESIGN.md` is untouched and no human approval point is raised by this gate. Recorded with the two rules a remedy is most likely to break by accident: the `--spacing-*` namespace stays empty (**I6**) and there is no fourth root-size step above 18 px (**I8**) — and, per lesson **028**, **2560 and 3840 resolve the same `160rem` step** (a length in a media feature resolves against the initial root size, so `160rem = 2560px` exactly and the later rule wins at that width), so the two widest reference viewports are one band and not two. |
| G3 run 1 | product-designer | **Two source-read corrections to my own draft, both caught before the gate closed.** (1) `AlertBanner` already carries `role="alert"` for `tone="danger"` (`components/atoms/alert-banner.tsx:22`), so **DS3, DS5 and DS6 are assertive live regions today** — the invariant is that the role stays as it is, not that they never become live regions. (2) `rounded-xl` on the card resolves to `--radius-xl` (1.75rem), not `--radius-lg`. Recorded because both were written from memory of the system and corrected by reading the atom, which is the habit lesson **031** is about. |
| G3 run 1 | product-designer | **Contrast measured, not assumed, in both themes** (`evidence/g3-contrast.mjs`, deployed preview, 390×844, computed styles read through a canvas because Chrome returns `lab()` and a naive `rgb` parse silently scores it wrong — the first run of this probe printed 1.1–1.5:1 for every pair). Seven pairs on the implicated elements, dark / light: `text-ink` on `bg-surface` **15.54 / 15.77**; `text-ink-subtle` **5.25 / 5.06**; `text-accent-ink` **8.43 / 6.47**; `labelClasses` + briefcase on `bg-canvas` **8.20 / 5.62**; input value **15.54 / 15.77**; `line-strong` borders **3.46 / 3.37** against the 3.0 non-text bar. **All pass AA in both themes today**, and the invariant is that all fourteen numbers are unchanged after the remedy. |
| G3 run 1 | product-designer | **One pre-existing reduced-motion residual, routed and not fixed here.** `MotionConfig reducedMotion="user"` suppresses transform and layout animations, but `CollapsiblePanel` animates `height: 0 → auto` as an explicit value (`components/atoms/collapsible-panel.tsx:18-20`), which that setting does not suppress. Outside this spec's defect and outside `spec.md` § Scope; recorded so a later gate does not discover it as new. |
| G3 run 1 | product-designer | **Lesson 044 written, and the ledger is now at its cap.** *Never read an element's box off a `layout-shift` source rect: those rects are clipped to the viewport, so derive every intended geometry from `getBoundingClientRect()` on a state you loaded yourself.* It is the pattern behind §A.4 — the `632 → 249` reading survived G1 and a blocking G2 because it arrived machine-produced, and the tell (`top + height = 844` exactly, three times in one file) was in the evidence the whole time. **`.agents/memory/LESSONS.md` now reads `Active: 30 / 30`** — three lessons landed from parallel specs during this gate. The next agent that needs to write one must promote or retire first; lesson **031** is at 3 confirmations and is due for promotion. Flagged for `tech-lead`, not a blocker for G4. |
| G4 run 1 | tech-lead | **The plan contains no remedy task, and that is the ruling.** `spec.md` § Scope item 4 makes the cause a deliverable, `legal.md` §10 and `design.md` §A.5 both decline to name one, and §A.5 refutes for free the only account written down — the three zero-size children sum to `166.8 px` against `568.7 px` of missing height, **at most 29 %**. Writing a lever now would aim it at a term nobody has measured (the rule promoted into `.agents/agents/tech-lead.md` from lesson **010**; lesson **032**). T1–T7 build instruments and take measurements; `plan.md` §6.1 is the checkpoint where `tech-lead` writes the remedy against T5's diagnosis, bound by §6.2's **R1–R12** — every constraint the closed gates already fixed, written **before** the cause is known so the amendment is a mechanism and a file list, never a re-derivation. |
| G4 run 1 | tech-lead | **The metric decomposes to one cell, and that is what makes a lever checkable** (`plan.md` §2). On the only artifact measured, the whole rate is `/custo-da-hora` × seeded × 390 × deployment at **5/20**; the other three cells are **0/20**, and the empty-storage cell measured `CLS = 0` exactly — no entry at all. 1024, light and the local build are **unmeasured, not zero**, which is why T3 fills them before T5 chooses where to experiment. Any remedy aimed at `/`, at the empty state or at ≥1024 must name the measured term it reduces or be struck (`design.md` **K3** already records that the column's top never moves at ≥1024, in sixteen cells). |
| G4 run 1 | tech-lead | **AC5 is routed to `product-manager` as blocker B1, not patched here.** `design.md` §A.4 measured that AC5 is red on a build with no defect: the correct build moves the column's `height` by −147.0 px at 390, −126.0 at 1440 and −140.4 on `/`, and no exemption covers the height side (lesson **040**). `tech-lead` may not rewrite an acceptance criterion, so the recommended wording sits in `plan.md` §1.2 for one edit: `(Δtop, Δheight)` must equal `(0, 0)` **or** that cell's own two-target delta, each within ±1 px, **and a third value that is smaller than both fails too** (lesson **016** — a column that stops moving where the design says it moves is as much a finding as one that moves further). The exemption is then measured per cell by this spec's own probe instead of enumerated, which also covers the `/` cells whose seed this gate changes. **It blocks T8 only.** |
| G4 run 1 | tech-lead | **The `/` storage axis was a comparison of a state with itself, and the seed is now per route.** `design.md` §A.2 measured `/` settled as **identical in both storage states** — because the salary seed (`grossSalary`, `salaryPeriod`) contains no key `hooks/use-work-calculator.ts` reads. `/custo-da-hora` keeps X6's seed **exactly**, so AC1's cells stay comparable with the numbers `0004` handed in; `/` gets the journey seed `legal.md` §1.4 used to render DS2 and DS7 (`workMinutes`, `entry`, `lunchStart`, `lunchEnd`, `exitOverride`, `isManualExit`, the tier rates), written out key by key in `plan.md` T1. **X6's `/` cells merge as a third, labelled condition — `partial seed` — and never overwrite the `/ seeded` cells** (lesson **032**). `lastExit` is deliberately omitted: with a same-day `entry` the hook computes `dayShift = 0` and discards it. |
| G4 run 1 | tech-lead | **"Seeded" is two changes reported as one, and T5 splits it.** Every reproduction on the record was produced by a prior navigation to the origin **and** stored values; the empty condition has neither, and no experiment separates them. T3 keeps the confounded condition verbatim, for comparability; T5 experiment **C** adds *warm, unseeded* and *cold, seeded*, 20 loads each. Recorded because the confound is invisible in every artifact upstream and a diagnosis written on the unsplit axis would be unfalsifiable in exactly one direction. |
| G4 run 1 | tech-lead | **Three counters per cell, one fixed denominator.** `sumCLS > 0.1`; any single entry `≥ 0.1`; and a **zero-box counter** — loads recording a source that names one of the four implicated nodes with `cur=0,0` **at any value**. AC1's threshold is untouched and `n` stays fixed at 20 inside the command (lesson **014**). The third counter exists because `legal.md` §1.5 printed `svg 830,14->0,0` at `v=0.0342`: the same shape, below the threshold AC1 can see (lesson **016**). A cell that clears AC4 while its zero-box counter stays positive is a **finding**, and T8 says so in writing. |
| G4 run 1 | tech-lead | **Deployment and local production build are two artifacts and never a control for each other**, in bytes **and** in measurement path: this machine's egress is TLS-intercepted and loopback is the one path that bypasses it (lesson **037**, `0004` §7.1). T2 records the certificate issuer per host and writes the sentence T3 cites whenever the two disagree. The local artifact is built in an **isolated copy** — `git archive HEAD` into the scratchpad, `node_modules` symlinked, served on port 3100 — because a `pnpm build` in the working tree shares one `.next` with every other agent in this session and fails indistinguishably from a regression (lesson **029**, **013**). If `git status --porcelain -- app components hooks lib` is not empty, the task **stops**: which of the two trees gets measured is not a decision the plan delegates. |
| G4 run 1 | tech-lead | **The light stage runs eight `/custo-da-hora` cells, not four, if the dark pass finds nothing.** `spec.md` § Open questions says "the four `/custo-da-hora` cells" and this spec has eight (2 storage × 2 viewport × 2 artifact). The superset satisfies every reading of the sentence and cannot under-measure; the report names which of the two rules fired. Resolved here rather than bounced, because the alternative is a plan choosing which half of a criterion to run. |
| G4 run 1 | tech-lead | **One durable file enters the tree: `tests/e2e/column-stability.spec.ts` (T7).** It is the committed half of `design.md` §B and **K1** — *no element in this subtree has a legitimate zero box, in any state, at any paint* — asserted at 320/390/1024/1440, both themes, both routes, **both storage states**, with the set size asserted as exactly 4 **before** iterating, so a renamed class turns the guard red instead of quietly passing (`AGENTS.md` §5). It is cause-independent, which is why it is written now, and it must be **seen red** once (briefcase icon hidden by a throwaway init script) before it is trusted. Every probe stays in `evidence/`, gitignored and regenerable, as `0004`'s and this spec's already are. |
| G4 run 1 | tech-lead | **Two carried items ruled, neither folded in.** (1) `legal.md` §6 **O5**: if the remedy edits either calculator hook, LR5.4 becomes a precondition and `0004`'s **T6** — written, re-issued and **unbuilt** — is issued here first, **copied verbatim** rather than rewritten, at the `hooks/**` 100 % bar (`plan.md` §6.2 **R8**). (2) `design.md` §D.2's residual: `CollapsiblePanel` animates `height: 0 → auto` as an explicit value, which `reducedMotion="user"` does not suppress. Pre-existing, outside this defect, **not scoped**; its trigger is *the next spec that opens `components/atoms/collapsible-panel.tsx`* — a trigger, not a date (`AGENTS.md` §5). It is flagged to T5 because the panel sits inside the shifting column and an experiment may well record it. |
| G4 run 1 | tech-lead | **The working tree is not at `HEAD`, and the delta is named rather than left to the developer.** `git status --porcelain -- app components hooks lib tests` this session returns two files: `app/page.tsx` and `app/custo-da-hora/page.tsx`, each with `0004`'s **T3** — `openGraph.images` and `twitter.images` added to the `metadata` export, 19 lines, nothing else. T2 builds the local artifact from `git archive HEAD`, so this delta would have fired its stop rule on day one. Ruled: a hunk inside a `metadata` export emits `<head>` and reaches no box in `#main-content`, so T2 **records the porcelain output and the diff in `artifacts.md` and proceeds**; a hunk touching `components/`, `hooks/`, `lib/` or any rendered element still **stops**. Recorded because the next agent to build a local artifact here will meet the same two files, and because the local cells of AC1 are then measuring `HEAD` plus a metadata-only delta, in writing (`AGENTS.md` §5 — a claim about the tree is measured by listing it). |
