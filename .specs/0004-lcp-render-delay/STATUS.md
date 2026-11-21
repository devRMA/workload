# 0004 — LCP render delay on the deployed build, and deployed-head metadata correctness

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** in-progress
**Next agent:** **`tech-lead`, to triage G6 run 2's single non-blocking finding (F6) and route to G7.** The qa gate is **closed at run 2 — pass** (`reports/qa.md`, § *G6 — `qa-engineer`, run 2* below). **G6 ponytail closed 2026-09-19 `pass`, no finding** (`reports/ponytail.md`). F6 is owed before `release-manager` commits: `vitest.config.ts` and `tsconfig.json` are modified by no task and no decision row.

## G6 run 1 — rejected, triaged. `plan.md` §7.8

`qa-engineer` rejected on **one blocking finding, F1, in this file and not in source.** The triage is
ruled in full at `plan.md` §7.8; the dispositions:

- **F1, blocking — FIXED here, by `tech-lead`.** This file carried, in the T7 row and in the
  blockers list, the instruction `plan.md` §7.5 item 1 retired at bounce 1, while stating the opposite
  242 lines earlier. The retired string is now **absent from this file entirely** — it survives only
  in `plan.md` §7.5 item 1, which is the sentence that retires it, and in `reports/qa.md`, which is
  the finding that caught it.
  **R12's stated signal fired exactly as written.** The T7 row now restates `plan.md` §7.5 item 1's
  current three changes, the blocker is closed as discharged, and the one surviving occurrence of the
  retired string sits inside the past-tense record of F1 itself, marked as the finding's text. **One
  instruction, not two.** **No new lesson** — the binding rule already exists (`AGENTS.md` §5, last bullet) and I did not apply it. See the decisions log.
- **F2 — RULED out of scope for `0004`, recorded as debt** with `product-manager` as owner and four
  trigger conditions, in § *Carried to later gates*. The guard's domain **is** the real defect and the
  ruling says so; it is not widened here because `/_not-found` has no remedy inside this spec's file
  list and a widened guard with no remedy behind it is a red gate (`plan.md` §7.8 item 4, **R17**).
- **F3 — FIXED here.** X2 now has its own bullet in § *Carried to later gates* (**R14**).
- **F4 — UPHELD, routed to `frontend-dev` as T10**, `plan.md` §7.9. One assertion, red-first, no
  source file.
- **F5 — FIXED here.** `plan.md` §T4's red-first paragraph restated: clause 2 is a forward guard and
  no red output is owed for it.

**What G6 passed is not re-opened at run 2** — T2, T3, T4, T6 and T9 against §3 as amended by §7, the
four local gates, 609/609, per-area coverage with no threshold lowered, the three restore guards
re-broken **individually**, `legal.md` F1 closed on measurement, and R15 discharged by md5 with
`/sitemap.xml` and `/robots.txt` byte-identical. Run 2 re-checks **T10 and the two documents**, and
re-runs the four local gates because T10 touches the suite.

**`pnpm e2e` stays routed to G9**, confirmed at this triage, not re-ordered.

---

G5 run 2 closed the build gate: `plan.md` §7.7 ruled all
three run-1 blockers and `frontend-dev` implemented exactly what the ruling specified, nothing more.
**B3 (T5 dropped)** required no build action — both `hero-panel.tsx` and its test stayed at `HEAD`.
**B2** is the one-line seed fix in `__tests__/use-salary-calculator.test.ts` (`workRegime`:
`"estatutario"`), red-first re-confirmed. **B1** is **T9**, done: `SITE_URL` now comes from
`lib/structured-data.ts` alone, imported into `app/sitemap.ts`, `app/robots.ts` and `app/layout.tsx`;
the widened guard in `__tests__/metadata-image-host.test.ts` was seen red against both `app/robots.ts`
and `app/sitemap.ts` before being trusted. `pnpm check`, `pnpm build` and
`__tests__/comment-free-code.test.ts` are all green; coverage holds at 99.88%/99.77% on the
repository as a whole, ≥90% on `app/**` and `components/**`, 100% on `hooks/**`.
**A full unfiltered `vitest run` taken later in this session showed unrelated failures in
`__tests__/salary-calculator.test.tsx` and `__tests__/salary-period.test.ts`** — outside this run's
file list and touching `lib/salary-period.ts`, which `git status` already showed modified before this
task started. That is spec `0007`'s concurrent work in this shared tree (`AGENTS.md` §4 rule 6), not
a regression from T6/T9; the ten test files this run's tasks actually touch were re-run in isolation
immediately after and are green (`80 passed (80)`, listed above).
**The AC1 bounce is answered and the spec gate is closed again at run 2** — `spec.md` § *AC1,
replaced at bounce 1*. `AGENTS.md` §4 rule 1 still holds for the ship: **AC1 is decided, and it is
scored.** The T7 re-issue that followed from it is **done**: `plan.md` §7.5 item 1 landed at bounce 1
and the T7 row in § Tasks below landed at the G6 run-1 triage. **`tech-lead` owned that amendment;
`product-manager` did not touch `plan.md`.**
**Bounces:** **2.** (1) Spec gate, run 1 → run 2, opened at the T1 triage, **answered and closed at
run 2**. (2) **QA gate, run 1 → run 2**, opened at G6 on F1, triaged at `plan.md` §7.8. The ceiling is
**two on the same gate**: the spec gate has spent one of its two, the qa gate has spent one of its
two. A third rejection on either gate stops the pipeline and goes to the human, not around the loop
again. The D3 amendment is still **not** a bounce (`plan.md` §5, D3 ruling).

## AC1 is replaced — spec gate, run 2, bounce 1 answered

**Ruling: `spec.md` § *AC1, replaced at bounce 1*, and the new row in § Acceptance criteria.**
`product-manager`, run 2.

The withdrawn AC1 scored `Math.round(simLCP) !== Math.round(simTTI)`. It is gone, and the reason is
the one `tech-lead` routed: T1 measured a cause-absent state painting at **96 ms** that **fails** it
while two other cause-absent states pass it (`plan.md` §7.2). The replacement takes `tech-lead`'s
recommended field and makes the call that was left open — **differential, not absolute**:

> Per route, in one session: `median(H1 observedFirstContentfulPaint)` does not exceed
> `median(H2 observedFirstContentfulPaint)` by more than `max − min` of H2's own 3-run set. H1 lower
> passes and is recorded; **no improvement is required.** Void — not passed — if the two blocks come
> from different `fetchTime` sessions, if their T7-item-2 transport blocks differ, or if H2's spread
> exceeds 1,000 ms on either route.

**Why differential and not absolute**, both reasons independently sufficient: every absolute number
this spec can measure is taken through the intercepting proxy and is not field-representative
(`plan.md` §7.1 consequence 2, R11), and an absolute paint target has **no lever inside this spec's
scope** now that T8+ is closed — lesson **011**, the exact failure this spec was opened not to
repeat. The differential cancels the proxy (both hosts, one session) and keeps a real lever: AC1 now
fails if any shipped task — T2 through T6 — holds the paint. It is a **non-regression criterion, and
it is written as one on purpose**; a criterion demanding the paint get faster would be a criterion no
authorised work in this repository can satisfy.

**Run against a known-good state before acceptance** (lesson **040**): the three cause-absent states
on record — X4 at `requestLatencyMs=0` (96 ms), X1 local-3 (94 ms), X2 mirror-3 (101 ms) — all pass;
the held states (1281 and 2350 ms against a 96 ms peer) fail by more than any spread this instrument
has produced. The withdrawn identity splits those same five states 2/3.

**Neither of the two facts `tech-lead` fixed is contradicted**: no criterion in `spec.md` now asserts
an FCP→LCP gap (§ Outcome's first bullet is amended in place and says so), and no criterion asks for
a remedy to the delivery property, which belongs to this machine's egress proxy.

**Nothing else was re-opened.** AC2–AC8 are untouched; the absolute 2,500 ms target stays parked on
AC4; `plan.md` and every source file were left alone. The field was verified to exist in a report
this spec already holds before it was written into a criterion (`spec.md` E15), and the verification
command carries a `path.resolve` because `require` on a bare relative path throws.

**Also amended in `spec.md` at run 2**, all in service of the same replacement: § Outcome bullet 1,
§ *On the absolute 2,500 ms target* (AC1 is no longer described as a phase identity), four
§ Non-goals bullets that forbid restoring the identity, re-scoring AC1 as an absolute, and building a
remedy for the proxied paint, and § Evidence row **E15**.

**New lesson 051** (`product-manager` / `spec`): score a criterion on a quantity one of this spec's
own experiments has already moved, and cite the run — a derived identity can flip without the defect
changing. Distinct from **040**, which tests a finished criterion against a known-good state; **051**
governs which quantity is eligible to be written into one at all.

## The T1 triage — ruled, and the cause is not where T1 said it was

**Full ruling: `plan.md` §7.** `tech-lead`, run 1, at the T1 return.

**T1 did its job exactly right**: it stopped at the hard stop, it edited nothing, it wrote no remedy,
and it **flagged** that naming *round-trip time* as the delivery property went past the six
properties `plan.md` §T1's X4 row enumerates, instead of presenting it as settled. **That flag is
confirmed and the flag is the reason this ruling exists.** The enumerated list was `tech-lead`'s and
it was incomplete; that is a defect in the plan, not in the build (new lesson **037**).

**The mechanism T1 measured is real. The agent it belongs to is not the one T1 named.** Measured by
`tech-lead` in this session, before ruling:

- `openssl s_client -alpn h2,http/1.1` against the branch-alias deployment, `workload.devrma.com`,
  **`vercel.com`** and **`example.com`** — all four return `ALPN: server did not agree on a protocol`
  and all four are re-signed by `CN = ns-swg.ca.madeiramadeira.goskope.com`, a **Netskope
  TLS-intercepting secure web gateway on this machine's egress.** This machine cannot observe HTTP/2
  on *any* origin in the world.
- **The deployment does speak HTTP/2.** SSL Labs, queried server-side from outside this network,
  reports `alpnProtocols: h2 http/1.1` on **all four** edge IPs of both hosts
  (`216.198.79.1`/`64.29.17.1` and `216.198.79.195`/`64.29.17.195`, grades A+/A).

**So: "19 requests over HTTP/1.1 to one origin" is a property of the measurement path, not of the
deployment.** T1's latency dose-response (0→96, 50→260, 100→1281, 150→2350 ms) is not invalidated —
it is *explained*: the proxy strips ALPN, the 6-connection queue appears, and the proxy's own round
trip is what the injection reproduced. **No remedy is authorised anywhere — not in this repository,
and not on Vercel, where the property is already correct.** T8+ is **closed, never written.**

**Every Lighthouse number this spec has on record was measured through that proxy** — `plan.md` §1
M1–M9, T1's X1/X4/X5, `0006`'s twelve G9 reports, `0002`'s entire after-table. Nothing is discarded:
they stay internally comparable **as differentials inside one session**, and every **absolute**
number among them is now labelled *not field-representative* and may not be compared to a Core Web
Vitals threshold (T7 item 2 makes the ALPN/issuer block mandatory in every future session).

**AC1 is bounced to `product-manager`, and not because of the platform.** AC1 scores
`simLCP !== simTTI`. T1 measured a state in which the defect is definitionally absent — the page
painting at **96 ms**, the best number this spec ever recorded — and **that state fails AC1**, while
two other cause-absent states pass it. The identity tracks the shape of Lantern's graph, not the held
paint; it is satisfied and violated by both good and bad states. A criterion a known-good state fails
does not discriminate (`AGENTS.md` §5; new lesson **040**). `plan.md` §1.3's *"AC1 stands and is the
right criterion"* is **withdrawn** — that endorsement was `tech-lead`'s and it was wrong.
**Recommendation only, the criterion is `product-manager`'s:** score
`audits.metrics.details.items[0].observedFirstContentfulPaint`, which is a measured elapsed time,
moves monotonically with the defect (96 → 2350 across X4) and which a known-good state passes.

**The absolute 2,500 ms target is not re-opened and is not handed to anyone.** `spec.md` § *On the
absolute 2,500 ms target* already ruled it out of the lab and parked it on **AC4**, a real-browser
probe that **already passes under 2,500 ms** on the branch head. This triage only supplies the reason
that ruling was right. AC2–AC8 are all unaffected; **AC2 stands**, its lever is T2, and the proxy
cancels out of a same-session H1/H2 differential.

**T2 ships, here, unchanged.** It does not satisfy AC1 — nothing does — and that never made it
worthless. It satisfies **AC2** (its only lever in this plan), **AC7**, and the 2,500 ms **goal**:
473,978 B, **61% of the page**, is three 234.8 kB JPEGs saved under `.ico` and `.png`, which also
makes `app/manifest.ts`'s `type: "image/png"` declaration true. Half of T2's G4 justification —
the request/connection story — is **withdrawn**; bytes and file-type correctness are true on every
protocol and every path, and T2 ships on those alone (`plan.md` §7.4). **Do not report T2 as moving
the observed first paint.**

**Finding B (T3, T4) proceeds untouched.** Independent of all of the above.

**The `reports/qa.md` process point: the developer is right and there is nothing to fix.**
`grep -n 'reports/qa\|qa\.md' plan.md spec.md` → **0 matches.** The plan never asked for it; T1's
*Done when* names `evidence/t1-attribution.md` and a clean `git status` only. The artifact stays
`qa-engineer`'s at G6 (`AGENTS.md` §3). T4's and T6's *"paste the red-first output into
`STATUS.md`"* stands and is deliberate: that is triage evidence for `tech-lead`, not a QA report
(`plan.md` §7.6).

**X6 is handed to spec `0008`**, in its `STATUS.md` § *Handed in from `0004` T1/X6* — the 5/20 (25%)
rate on `/custo-da-hora` with seeded storage against 0/20 in all three other cells. No cause named,
no ruling made on `0008`'s scope.

**T1 is done and hit a hard stop.** `frontend-dev`, G5 run 1, `evidence/t1-attribution.md`. Every
build and server ran in an isolated copy outside the repository, port 3457 (lesson **029**, lesson
**013**); no source file was touched. X1 (3 deployed + 3 local Lighthouse runs) confirms the delta is
real: obsFCP 1382–2339 ms deployed vs. 94–165 ms local. **X2 decided the branch**: the deployed
document and all twelve first-party assets, mirrored byte-for-byte to a scratch directory and served
with `python3 -m http.server`, paint at obsFCP 101–207 ms — early, not held — so **the cause is in
delivery, not in the bytes.** X4 named the property: none of the six header/cache properties
`plan.md` enumerates differs in the direction that would explain a *slower* deployed paint (three
differ in the *opposite* direction — the mirror is HTTP/1.0, uncompressed, uncached, and still paints
early); the property that does explain it, measured, is **round-trip time to the origin** (119–159 ms
real, vs. ≈2 ms on loopback) compounding across **19 same-origin HTTP/1.1 requests**, capped at 6
concurrent connections per origin (Chrome's own `uses-http2` audit already estimates ≈1.15 s of
FCP/LCP savings from this, independently). Reproduced directly with `--throttling-method=devtools`
(a real trace, not Lantern) on the local production build, latency only, nothing else throttled:
0 ms → obsFCP 96, 50 ms → 260, 100 ms → 1281, 150 ms → 2350 — landing in the deployed range once
injected latency matches the measured real RTT. X5 (Chrome's own render-blocking bookkeeping) shows
nothing blocking after 422 ms, confirming the hold is a network-transport cost invisible to a
parse-time/dependency-depth audit. **X3 was not run** — X2 resolved the branch to "delivery", not
"bytes". **This is `plan.md` §T1's hard-stop #2: the cause is a Vercel platform property (HTTP
version and round-trip time to the deployed origin), not application code, and it is recorded as a
real result, not a defeat — no T8+ remedy is written against it.** X6 ran regardless, as instructed:
20 loads × 2 routes × 2 storage conditions (80 loads total) against the branch-alias deployment,
naming the D1 rate and trigger condition for the spec `product-manager` opened for it —
**`/custo-da-hora` with seeded (returning-user) storage reproduces a ≥0.1 layout shift in 5/20 loads
(25%); every other cell (both storage conditions on `/`, and empty storage on `/custo-da-hora`) is
0/20**, confirming seeded storage on `/custo-da-hora` specifically as the trigger. No cause is named
for D1 (lesson **032**). Full numbers, the two counterfactual states and the raw X6 log are in
`evidence/t1-attribution.md` and `evidence/t1-x6-cls-rate.log` (both gitignored).

**D3 is closed.** `product-manager` rewrote `spec.md` § C3 in place at run 1: Finding B is four
emitted tags produced by **four files**, not two files plus inheritance, and its cause is Next
16.3.5's preview override of `metadataBase`, which makes the defect **preview-scoped and absent in
production**. § Problem, § Scope item 6 and § Non-goals were corrected in the same pass; **no
acceptance criterion changed** — AC5 and AC6 still stand as written against H1. K3 is **confirmed**:
the three `public/` raster icons are inside § Scope item 2 and are not the *"icon-library"*
§ Out of scope protects, so T2 stays in this plan. Every remaining row of § Evidence is now
classified by how it is known, in `spec.md` § *Verification status of each row*.

**G4/plan is closed** (`tech-lead`, run 1, `plan.md`, verdict **pass**). **The FCP→LCP cause is
narrowed, not yet named, and the plan says so**: `plan.md` §1 is the attribution `spec.md` § Scope
item 1 and lesson **010** require, measured in this session with `lighthouse` 12.6.1 in this tree.
It establishes that **there is no FCP→LCP gap in the page** — observed FCP and observed LCP are the
same instant in every run on record — and that the 5.7–6.5 s figure is a **Lantern simulation
output**. LCP equals `interactive` to the millisecond **because the page's single paint happens
after the last byte**, which puts the whole resource graph into Lantern's LCP graph. Blocking the
compiled stylesheet on the deployed page (M5) moves the paint from 1,370 ms to **332 ms**, collapses
simulated LCP 5,864 → **993 ms** and **breaks the identity AC1 targets** (TTI stays 3,955 ms); the
same build served from `localhost` (M8) paints at **197 ms** and scores **0.99**. CPU (M2), the icon
assets (M3), the webfont (M4), the preview toolbar (M6), the Chrome binary (M7) and the harness
(M10: `example.com` at 235 ms) are each ruled out by measurement. **T1 finishes the diagnosis and
edits nothing; the Finding A remedy task is not written until it returns.** One lever is already
measured — **−1,617 ms simulated LCP and +7 performance points** from replacing three mislabelled
234.8 kB JPEGs (T2) — and is recorded as *not* satisfying AC1. Finding B is fully specified and its
mechanism was read from the installed framework and **verified by building it** (T3). Four findings
triaged (D1–D4) and X2 planned as T5.

**G3/design is closed** (`product-designer`, run 1, `design.md`, verdict **pass**) — **with zero
visual change requested and no system change**. The hydration transition on the hero is ruled
**already correct**: one in-place value replacement, instantaneous, one polite announcement, both
themes identical because the hero's fill and ink are theme-invariant. No skeleton, no shimmer, no
fade, no dim, no `aria-busy` — rejected on design merit independently of `legal.md`, because three
named `DESIGN.md` rules already forbid animating the hero numeral and a treatment's reduced-motion
fallback would be the current behaviour. `design.md` §B freezes **eight invariants** the
render-delay remedy must preserve, each with the value measured today. **Four findings routed**
(D1–D4), one of them a reproducible **0.5452 CLS event on `/custo-da-hora` that is not the hero**.

**G3/copy did not run.** No `content-writer` was dispatched and no user-visible string changes:
`legal.md` §2 answers O1 **no**, `spec.md` § Out of scope forbids changing what either calculator
displays, and `design.md` § Copy slots records the existing slots with their 390px budgets rather
than commissioning new text. Any rewording is a future spec.

**G2 is closed** (`labor-law-analyst`, run 1, `legal.md`, verdict **pass**). **O1 is answered `no`
and the spec's default is overturned** — a server-rendered default that hydration replaces with the
user's own stored value is not a disclosure and no Brazilian norm governs it (`legal.md` §2). One
binding rule is added, **LR5** (`legal.md` §3), and it is a non-regression condition on the
transition, not a disclosure: it adds no string and no pixel. **The brief's premise that the stale
window is 5.7–6.5 s is false** — that is the lab's LCP timestamp; the measured window is
**182–322 ms** (`legal.md` E-L1). Two non-blocking findings (F1, F2) and one new carried debt (X2).

**G1 is closed** (`product-manager`, run 1, `spec.md`). The spec carries both findings as
independent criteria (AC1–AC4 for the LCP coupling, AC5–AC6 for the emitted image host); a run that
satisfies one group and not the other is a rejection. **Three of the facts stated in the findings
below did not survive the re-run search and are corrected in `spec.md` § *What the re-run search
found*** — read C1, C2 and C3 before acting on anything in § F1 or § *Also carried in* below.

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| spec | product-manager | **closed — run 2** | 2 | `spec.md` — **pass. Bounce 1 answered: AC1 replaced** with a same-session H1/H2 `observedFirstContentfulPaint` differential, non-regression direction (§ *AC1, replaced at bounce 1*). Run 1 was also amended in place at D3 (§ C3, § Problem, § Scope 6, § Non-goals, § Evidence status) |
| law | labor-law-analyst | **closed** | 1 | `legal.md` — **pass** |
| design | product-designer | **closed** | 1 | `design.md` — **pass**, zero visual change |
| copy | content-writer | **not run** | 0 | no string changes in scope — see header |
| plan | tech-lead | **closed** | 1 | `plan.md` — **pass**, amended at the T1 triage (§7): the Finding A remedy is **closed, never written**; T2 and T7 re-issued; §1.3's AC1 endorsement withdrawn |
| build | frontend-dev | **closed — run 2** | 2 | T1, T2, T3, T4, T6, T9 **done and green**; **T5 dropped per `plan.md` §7.7 B3**, ruled at the plan gate, no build action. B1 and B2 resolved by ruling and implemented this run. No T8+ remedy exists to build |
| qa | qa-engineer | **closed — run 2** | 2 | `reports/qa.md` — **run 2: pass.** F1 verified discharged: the retired *"AC1 — not scored"* instruction survives nowhere in `STATUS.md` as an instruction (all 13 tree-wide occurrences classified), the T7 row carries §7.5 item 1's three current changes, and the third stale copy (*"tech-lead still owns the T7 re-issue"*) is gone. **T10 verified against `plan.md` §7.9 and its control re-derived three ways** — emptied binding red on the new assertion in both cases, the same emptied binding **green** with T10's two lines removed (F4's defect reproduced), and a 1-icon binding red on the exact count where a `toBeGreaterThan(0)` floor stays green. F3 and F5 verified fixed; F2 accepted as ruled and not re-raised. Four local gates clean, 620/620, coverage per area unchanged with no threshold lowered. **One new non-blocking finding, F6** — `vitest.config.ts` and `tsconfig.json` are modified by no task and no decision row; owner `tech-lead`, owed before G7. Attributable e2e subset green, 46/46 |
| ponytail | refactor-scout | **closed** | 1 | `reports/ponytail.md` — **pass, no finding.** T9 checked directly: `lib/structured-data.ts` carries no diff, no `lib/site.ts` exists, `SITE_URL` is not renamed, no second origin literal survives under `app/` — a three-import refactor and nothing more. T4/T10's guards cost no more than the defect they catch: `expect(manifestIcons).toHaveLength(2)` is two literal lines, not a helper; `__tests__/public-assets.test.ts` reads `icon.sizes` off `app/manifest.ts`'s own export rather than a hardcoded second copy. No new dependency, no `ponytail:` comment in the diff, no speculative abstraction found. `hooks/use-salary-calculator.ts`, `hooks/use-work-calculator.ts` and the `workDaysPerWeek`/`WEEKDAY_CLASS_DATES` test hunks confirmed alien (a sibling spec's) and excluded from scope |
| audit | web-standards-auditor | pending | 0 | `reports/audit.md` |
| release | release-manager | pending | 0 | `reports/release.md` |
| preview | web-standards-auditor | pending | 0 | `reports/audit-preview.md` |

## Tasks

Full text in `plan.md` §3, amended by `plan.md` §7. **T1 through T4, T6 and T9 are done and
accepted, and G6 run 1 re-verified T2, T3, T4, T6 and T9 against the plan — they are not re-opened.
T5 is dropped** (`plan.md` §7.7 B3). **T10 is open**, added at the G6 run-1 triage (`plan.md` §7.9). `pnpm check` and `pnpm build` are green after each
task individually. **No task waits on the AC1 bounce.**

| Id | Title | Owner | State |
|---|---|---|---|
| T1 | Finish the diagnosis of the held first paint — **edits no source file** | frontend-dev | **done — accepted. Hard stop confirmed; cause re-attributed from the deployed origin to this machine's TLS-intercepting egress proxy (`plan.md` §7.1)** |
| T2 | Replace the three mislabelled 234.8 kB JPEGs in `public/` with correctly-typed icons | frontend-dev | **done.** All three "after" sizes landed on the plan's numbers exactly (14.7 kB / 22.9 kB / 132.6 kB), 0% off, no ±15% finding. `__tests__/public-assets.test.ts` created and green |
| T3 | Emit the four social-image URLs against `metadataBase` | frontend-dev | **done.** Both `curl` loops reproduced in an isolated copy under `VERCEL_ENV=preview`: four `workload.devrma.com` URLs, five zeroes, all four image routes still `200 image/png`. **R5 discharged** — the pre-patch build of the same copy emits `branch-alias.example.vercel.app` |
| T4 | Guard the metadata boundary in the suite | frontend-dev | **done and accepted at G5 run 1, no re-edit.** `plan.md` §7.7 B1 corrected the paragraph, not this task; the third clause's width is corrected by **T9** |
| T5 | Give the hero numeral an accessible name that stays true after hydration (X2) | frontend-dev | **DROPPED — `plan.md` §7.7 B3.** The mechanism is refuted, not deferred; no authorised variant remains for `frontend-dev` to build. `components/organisms/hero-panel.tsx` and `__tests__/hero-panel.test.tsx` stay at `HEAD`, byte for byte. X2 returns to `web-standards-auditor` as carried debt with the refutation attached |
| T6 | Assert LR5.4 — no stored key overwritten before restore (`legal.md` F1) | frontend-dev | **done — run 2.** `plan.md` §7.7 B2's one-line correction applied: `__tests__/use-salary-calculator.test.ts`'s seed now carries `workRegime: "estatutario"`. Re-observed red in an isolated copy with the restore guard removed — first failing key `grossSalary`, `'0'` vs seeded `'4200'` (full output below). Green against the restored hooks |
| T7 | The pass/fail measurement, three hosts, one session | web-standards-auditor | **amended — three changes, and `plan.md` §7.5 is the binding text. (1) AC1 is *scored*, on the replacement `product-manager` returned at bounce 1: the per-route same-session `median(observedFirstContentfulPaint)` H1/H2 differential, unrounded, with an explicit **V1/V2/V3 void verdict**; H3 recorded and excluded. T7's own item 3 is withdrawn with the identity it scored. (2) `fetchTime` recorded verbatim per run, and the ALPN result + certificate issuer + per-request protocol histogram recorded per host **before** the runs — this block decides V2, so a session missing it for either host cannot be scored at all. (3) T2 is read off `totalByteWeight`, never off a paint number. Check AC1 against the known-good states first (lesson **040**, `plan.md` §7.5 item 1). Restated at the G6 run-1 triage (`plan.md` §7.8, F1): the wording this row carried before that triage described a state that ended when the bounce returned at spec-gate run 2, and it is **retired — it may not appear in a report** (`plan.md` §7.5 item 1, **R12**). This row is the only live instruction for T7** |
| T8+ | The Finding A remedy | — | **CLOSED. Never written.** The cause is this machine's egress proxy; the deployment already serves `h2` on all four edge IPs. No remedy is authorised in this repository or on Vercel (`plan.md` §7.1) |
| T9 | Declare the origin once and widen the metadata guard to every file under `app/` | frontend-dev | **done — `plan.md` §7.7 B1.** `app/sitemap.ts` and `app/robots.ts` now import `SITE_URL` from `lib/structured-data.ts` instead of declaring their own literal; `app/layout.tsx` imports the same constant for `metadataBase` and `openGraph.url`. `__tests__/metadata-image-host.test.ts` widened to `appSourceFiles()` (`.ts` + `.tsx`) for cases 2 and 3, origin declaration file moved to `lib/structured-data.ts`. Seen red in an isolated copy with the widened guard and the three source files restored to `HEAD`: case 3 failed naming `app/layout.tsx`, `app/robots.ts` and `app/sitemap.ts` (full output below). `__tests__/robots.test.ts`, `__tests__/sitemap.test.ts` and `__tests__/layout.test.tsx` pass **unchanged**, and a served build of the isolated copy confirmed `/sitemap.xml` and `/robots.txt` byte-identical to the pre-refactor output. No `pnpm build` warning on importing `@/lib/structured-data` from a metadata route |
| T10 | Assert the manifest icon collection is non-empty before looping it (G6 F4) | frontend-dev | **done — `plan.md` §7.9.** `expect(manifestIcons).toHaveLength(2)` is the first statement of each of the two cases in `__tests__/public-assets.test.ts`. Edits no source file and no other test file. Red-first against an emptied binding in an isolated copy, both cases failed on the new assertion (`expected [] to have a length of 2 but got +0`), output pasted below; green again with `manifestIcons` restored. `pnpm test __tests__/public-assets.test.ts` and `__tests__/comment-free-code.test.ts` green |

## Red-first evidence — G5 run 1 (T4, T6) and run 2 (T6, T9)

`plan.md` §T4 and §T6 both require the guards to be **observed failing** before they are trusted, and
`plan.md` §7.6 keeps that output here rather than in `reports/qa.md`. Every run below happened in an
isolated copy of the tree outside the repository (`AGENTS.md` §4 rule 6, lesson **029**), built from
a `tar` mirror with a hardlinked `node_modules`, served on **port 3457** after confirming the port
was free (lesson **013**). No git command that changes state was run.

**T4 — the three metadata guards against the pre-T3 state** (both `page.tsx` files restored from
`HEAD` in the copy, the three test files copied in):

```
FAIL __tests__/metadata-image-host.test.ts > gives every route that ships an image route a page that declares its own social images
AssertionError: expected [ …(4) ] to deeply equal []
+   "app declares no openGraph.images: Next's getSocialImageMetadataBaseFallback overrides metadataBase for file-convention image routes, …"
+   "app declares no twitter.images: …"
+   "app/custo-da-hora declares no openGraph.images: …"
+   "app/custo-da-hora declares no twitter.images: …"

FAIL __tests__/page.test.tsx > metadata > points the social card at the declared origin, not at the deployment host
AssertionError: expected undefined to deeply equal [ { url: '/opengraph-image', …(4) } ]

FAIL __tests__/custo-da-hora-page.test.tsx > metadata > points the social card at the declared origin, not at the deployment host
AssertionError: expected undefined to deeply equal [ { url: '/custo-da-hora/opengraph-image', …(4) } ]

Test Files  3 failed (3) · Tests  3 failed | 6 passed (9)
```

The same three are green against the patched tree: `Test Files 3 passed (3) · Tests 9 passed (9)`.

**T3 — R5 discharged, both directions of the same isolated build.** `VERCEL_ENV=preview
VERCEL_BRANCH_URL=branch-alias.example.vercel.app`, `next build` then `next start -p 3457`:

```
pre-T3   og:image      https://branch-alias.example.vercel.app/opengraph-image?2f370e327c49a8d9
         twitter:image https://branch-alias.example.vercel.app/twitter-image?5964a15fb432b5df
         og:image      https://branch-alias.example.vercel.app/custo-da-hora/opengraph-image?b01e727aef8e3258
         twitter:image https://branch-alias.example.vercel.app/custo-da-hora/twitter-image?268478e3264533d3
         grep -c 'vercel\.app'  →  / 1 · /custo-da-hora 1 · /sitemap.xml 0 · /robots.txt 0 · /manifest.webmanifest 0

post-T3  og:image      https://workload.devrma.com/opengraph-image
         twitter:image https://workload.devrma.com/twitter-image
         og:image      https://workload.devrma.com/custo-da-hora/opengraph-image
         twitter:image https://workload.devrma.com/custo-da-hora/twitter-image
         grep -c 'vercel\.app'  →  / 0 · /custo-da-hora 0 · /sitemap.xml 0 · /robots.txt 0 · /manifest.webmanifest 0
         curl -sI  /opengraph-image 200 image/png · /twitter-image 200 image/png
                   /custo-da-hora/opengraph-image 200 image/png · /custo-da-hora/twitter-image 200 image/png
```

Exactly one `og:image` and one `twitter:image` per route in both states — the file-convention image
is replaced, not appended, as `plan.md` §2.3 predicted.

**T6 — both LR5.4 cases against hooks with the restore guard removed** (in the copy only:
`if (!isRestored) return;` deleted from `hooks/use-work-calculator.ts:164` and
`hooks/use-salary-calculator.ts:137`, and the `!isRestored ||` clause removed from
`hooks/use-work-calculator.ts:186`):

```
FAIL __tests__/use-salary-calculator.test.ts > useSalaryCalculator > never writes a default over a stored value before the restore completes
AssertionError: grossSalary was written before the restore completed: expected '0' to be '4200'

FAIL __tests__/use-work-calculator.test.ts > useWorkCalculator > never writes a default over a stored value before the restore completes
AssertionError: workMinutes was written before the restore completed: expected '528' to be '480'

Tests  6 failed | 50 passed (56)
```

Both fail with the **first recorded write carrying the module default**, which is the exact shape
`legal.md` LR5.4 forbids. Worth recording for `labor-law-analyst` at G6: the pre-existing case
`"does not overwrite stored values before restoring them"` in `__tests__/use-salary-calculator.test.ts`
**stayed green** through that same unguarded run — it is the reason `legal.md` §8.1 F1 called the
guards *"correct by construction and asserted by no test"*, and T6 is now the assertion. Both cases
are green against the restored hooks; the copy's hooks were restored from the repository afterwards.

**T6 — run 2, re-observed red with `workRegime` in the seed** (`plan.md` §7.7 B2). Same isolated-copy
protocol, `if (!isRestored) return;` deleted from `hooks/use-salary-calculator.ts:137` only:

```
FAIL __tests__/use-salary-calculator.test.ts > useSalaryCalculator > never writes a default over a stored value before the restore completes
AssertionError: grossSalary was written before the restore completed: expected '0' to be '4200'

Test Files  1 failed (1)
     Tests  1 failed | 21 passed (22)
```

The loop's iteration order over `storedValues` reaches `grossSalary` before `workRegime`, so the
failure still names the first key in the map, exactly as it did before the seed line was added; the
new key is exercised by the same assertion (both the write-order and the byte-for-byte checks run
over every key in the map, including `workRegime`). Green again once the copy's hooks were restored
from the repository.

**T9 — the widened guard, seen red against the two files that motivated it** (`plan.md` §7.7 B1).
Isolated copy, `app/robots.ts`, `app/sitemap.ts` and `app/layout.tsx` restored to `HEAD` (the
hardcoded `https://workload.devrma.com` literal in all three), the widened
`__tests__/metadata-image-host.test.ts` copied in:

```
FAIL __tests__/metadata-image-host.test.ts > metadata image host > declares the origin once, in lib/, and nowhere under app/
AssertionError: expected [ 'app/layout.tsx', …(2) ] to deeply equal []
+   "app/layout.tsx"
+   "app/robots.ts"
+   "app/sitemap.ts"

Test Files  1 failed (1)
     Tests  1 failed | 2 passed (3)
```

Green again against the patched tree: `Test Files 1 passed (1) · Tests 3 passed (3)`. A served
`next build`/`next start -p 3457` of the same isolated copy, patched, confirmed `/sitemap.xml` and
`/robots.txt` byte-identical to the pre-refactor output; the server was stopped and the copy deleted
afterwards.

**T10 — the positive control, `manifestIcons` emptied in an isolated copy** (`plan.md` §7.9), one
command, no build: `const manifestIcons = manifest().icons ?? [];` at `__tests__/public-assets.test.ts:24`
replaced with an empty array in the copy only, the patched test file (this run's two-line diff)
copied in:

```
 ❯ __tests__/public-assets.test.ts (4 tests | 2 failed) 7ms
   × serves every manifest icon as a PNG and not as a JPEG
   × encodes every manifest icon at the size the manifest declares for it

FAIL  __tests__/public-assets.test.ts > public icon assets > serves every manifest icon as a PNG and not as a JPEG
AssertionError: expected [] to have a length of 2 but got +0

FAIL  __tests__/public-assets.test.ts > public icon assets > encodes every manifest icon at the size the manifest declares for it
AssertionError: expected [] to have a length of 2 but got +0

Test Files  1 failed (1)
     Tests  2 failed | 2 passed (4)
```

Both cases fail on the new assertion, first statement of each, exactly as `plan.md` §7.9 requires.
Green again against `manifestIcons` restored: `Test Files 1 passed (1) · Tests 4 passed (4)`. The
copy was deleted afterwards; no git command that changes state was run.

**`pnpm check`'s unfiltered `vitest run` picked up 30 unrelated failing test files this session — all
of them under `.claude/worktrees/agent-ae90673088dc067d0/`, confirmed untracked by `git status
--porcelain` (`?? .claude/worktrees/`) and absent from this task's file list.** That path is another
agent's own git worktree, nested inside this checkout, with its own full copy of `__tests__/` at a
different point in its own edit (`statusAnnouncement`, `bg-rose-700`, the salary-tab link — none of
it this spec's scope); neither `vitest.config.ts`'s `exclude` nor `tsconfig.json`'s `exclude` name
`.claude`, so the root-level `vitest run` and `tsc --noEmit` both walk into it, while `biome check .`
does not (`biome.json` already excludes `.claude`). Proof this is contamination, not a regression:
`pnpm exec tsc --noEmit` is clean; `pnpm exec vitest run --exclude "**/node_modules/**" --exclude
"**/tests/e2e/**" --exclude "**/.claude/**"` is **`Test Files 62 passed (62) · Tests 620 passed
(620)`**, covering every file this task and every prior task in this spec touches. `pnpm run lint`
is clean unscoped. This is `AGENTS.md` §4 rule 6's shared tree, not a T10 regression, and no file
under `.claude/` is touched by this task.

## G6 — `qa-engineer`, run 1

**Verdict: reject.** Full report in `reports/qa.md`. No source file was edited by this gate and no
git command that changes state was run. Every probe ran in a `tar` mirror outside the repository with
a **hardlinked** `node_modules` (a symlinked one makes Turbopack panic — `Symlink [project]/node_modules
is invalid`), deleted afterwards; no port was bound, and ports 3000, 3917, 3920 and 3941 were held by
other agents' `next start` processes throughout.

**Gates.** `pnpm lint` clean (150 files). `pnpm typecheck` clean. `pnpm test:coverage` green —
`61 files / 609 tests`, exit 0. `next build` clean in the isolated copy, and clean again under
`VERCEL_ENV=preview VERCEL_BRANCH_URL=branch-alias.example.vercel.app`.
`__tests__/comment-free-code.test.ts` green on its own. `docs-check.mjs`: 0 failures, 5 warnings, none
naming `0004`.

**Coverage, per area, read from `coverage/lcov.info` and not from the aggregate row:** `lib/**`
100/100/100/100 (258/258 lines, 140/140 branches, 64/64 functions) · `hooks/**` 100/100/100
(203/203, 78/78, 51/51) · `app/**` 100 lines (29/29), 100 functions (10/10), no branches ·
`components/**` 99.74 lines (378/379), 99.25 branches (265/267), 100 functions (133/133) — the two
sub-100 files are sibling-spec files above the 90 bar. **No threshold was lowered:** `vitest.config.ts`
is unmodified in this tree, and its only difference from `main` predates this spec and *tightens* the
config into `AGENTS.md` §9's four per-glob entries.

**The red-first evidence above was not taken on trust.** Each of the three restore guards was removed
**individually** in a fresh isolated copy and the new T6 cases re-run: `use-salary-calculator.ts:142`
→ red (`grossSalary … expected '0' to be '4200'`); `use-work-calculator.ts:164` → red
(`workMinutes … expected '528' to be '480'`); and the `!isRestored ||` clause of
`use-work-calculator.ts:186` **alone** → red (`Tests 1 failed | 33 passed (34)`). The third is the one
`plan.md` §T6 step 5 singles out and it fails on its own, not as collateral. The pre-existing case
*"does not overwrite stored values before restoring them"* was **not** counted as evidence for
anything. `legal.md` **F1** is closed on measurement.

**T9 stayed a refactor, measured rather than asserted.** Two full builds of the same copy, only the
three source files swapped: `/sitemap.xml` and `/robots.txt` are **byte-identical**
(`md5 5078146ee6e9926cd7f53d0437978a4b` and `2ed2b5c016ca00b19d56afd2e2d4e6f7` in both states).
**R15 checked directly:** no `lib/site.ts`; `SITE_URL` not renamed or moved; zero occurrences of
`https://workload.devrma.com` under `app/`, one declaration at `lib/structured-data.ts:3`, and one
rendered artwork label at `lib/og-image.tsx:64` that `design.md` §C authorises. `__tests__/robots.test.ts`
and `__tests__/sitemap.test.ts` unmodified and green. No build warning on the metadata-route import.

**Findings, in full in `reports/qa.md`:**

> **Reading note.** The five bullets below are the **quoted text of `reports/qa.md`'s findings**,
> kept verbatim because a routed finding's original wording is the record a later gate checks the
> ruling against. Each carries its disposition from the G6 run-1 triage (`plan.md` §7.8). **None of
> them is an instruction.** Where a bullet quotes a retired string, it is quoting the defect, not
> re-issuing it — the live instruction for T7 is the Tasks-table row above, and there is only one.

- **F1 — blocking, `tech-lead`. FIXED at the G6 run-1 triage — `plan.md` §7.8, F1.** *As found:*
  `STATUS.md:267` (T7 row) and the *"re-issue T7 with AC1 scored"* blocker both still carried the
  retired instruction that `plan.md` §7.5 item 1 withdrew at bounce 1 — *"Neither may appear in a
  report"* — and **R12** names carrying it as the signal the Finding A group was read as closed
  without ever being scored. `STATUS.md:25` of this same file already stated the correct position, so
  the document contradicted itself and the stale half sat in the row the auditor opens first. **This
  was the whole reject.** *Fixed:* the T7 row now restates §7.5 item 1's current three changes with
  AC1 scored and the V1/V2/V3 verdict mandatory; the blocker is closed as discharged; a tree-wide
  grep for the retired string returns only this record and `plan.md` §7.5's own retirement of it.
  **No source file was involved and none was edited.** **No new lesson: the rule already exists** as `AGENTS.md` §5 *How a rule's domain is defined*, last bullet — *"when an edit renames a figure, a norm or a term, grep the old name across the same boundary"*. A retirement landing in one of two documents is that rule's shape on an instruction. The ledger stays at **30/30** and the pressure stays where it belongs; see the decisions log.
- **F2 — major, pre-existing. RULED at the G6 run-1 triage: out of scope for `0004`, recorded as debt with an owner and a trigger — `plan.md` §7.8 item 5. `product-manager` owns the scoping; carried to G7 and G9 in § *Carried to later gates*. The guard's domain is the real defect and the ruling says so, but the domain is not widened here, because `/_not-found` has no remedy inside this spec's file list and a widened guard with no remedy behind it is a red gate (R17). `frontend-dev` builds nothing against it; `web-standards-auditor` does not score it at G9.** *As found:* On a preview-env build of the
  delivered tree, `/` and `/custo-da-hora` are clean and **`/_not-found` still emits**
  `og:image`/`twitter:image` on `https://branch-alias.example.vercel.app`; the string survives in
  `_not-found.html`, `_not-found.rsc`, two `.segment.rsc` files and `pages/404.html` — the only five
  occurrences left in the build output. Not an AC6 failure (AC6 enumerates five paths and this is not
  one), but it is `spec.md` C3's mechanism on the last route it still reaches, and
  `__tests__/metadata-image-host.test.ts` cannot see it: the guard's domain is *directories containing
  an `opengraph-image.tsx`*, and Next generates the 404 segment without a `page.tsx`. Nothing regressed
  — it was true before T3 and is simply the last one standing. `frontend-dev` builds nothing against it
  until the ruling exists.
- **F3 — minor, `tech-lead`. FIXED at the G6 run-1 triage.** X2 now has its own bullet in § *Carried to later gates* below. *As found:* X2 was recorded as carried debt **only** in the T5 row at `:265`. The
  § *Carried to later gates* list — the one `release-manager` reads at G7 and `web-standards-auditor`
  at G9 — does not mention it. `plan.md` **R14**'s second clause: *"or omits it from carried debt"*.
  It is not recorded as fixed or out of scope anywhere, so that half is clean.
- **F4 — minor, `frontend-dev`. UPHELD and routed as T10** (`plan.md` §7.9): `expect(manifestIcons).toHaveLength(2)` as the first statement of **each** of the two cases, red-first against an emptied binding in an isolated copy. *As found:* `__tests__/public-assets.test.ts:34-49` loops over `manifestIcons`
  with no positive control on its length; an empty `icons` array would pass both cases having measured
  nothing. The correct idiom is already in this spec's own diff at
  `__tests__/metadata-image-host.test.ts:42`.
- **F5 — minor, `tech-lead`, plan text. FIXED at the G6 run-1 triage.** `plan.md` §T4's *Seen red before it is trusted* paragraph is restated: clauses 1 and 3 are red-first clauses, **clause 2 is a forward guard and no red output is owed for it**, because the defect was always a runtime override and a runtime override leaves no string on disk to revert. *As found:* `plan.md` §T4's *"each of the three must be observed failing"*
  is unsatisfiable for case 2: `vercel.app` never existed in any source file, because the defect was
  always Next's runtime override. The developer claimed no fourth red and owed none. Restate the clause
  as a forward guard.

**AC7 note.** `pnpm e2e` was **not** run by this gate. The suite belongs to four concurrent specs and
several `next start` servers were live on this machine; a Playwright run against a shared port would
race and fail indistinguishably from a regression (lesson **029**). Stated rather than assumed, and
routed to G9.

**What the tree gives the auditor for T7:** sufficient — `.lighthouserc.js` unmodified,
`evidence/lcp-candidate-probe.mjs` for AC4, `.agents/tools/preview.mjs` for AC8,
`evidence/t1-attribution.md` X1/X2/X4 for §7.5's lesson-**040** known-good check, and T2's
`totalByteWeight` lever verified on disk — **except for F1**, which tells the auditor the opposite of
what `plan.md` §7.5 item 1 binds.

**Shared-tree attribution** (`AGENTS.md` §4 rule 6, lesson **060**). Nothing red was attributed to this
spec without `git status`. `__tests__/layout.test.tsx` is modified by a sibling (the font variable class
assertion); its `SITE_URL` assertion at `:51` is untouched, which is what makes it a valid T9 control.
`__tests__/lr35-clearing-ranges.test.ts` appeared **during** this gate run and is a sibling's; it is not
in the 609 figure. The `next build` font-override warning reproduces on the pre-T9 build and is alien.
The five `docs-check` warnings name `0005`, `0006`, `0007`, `0008` and `0011`.

## G6 — `qa-engineer`, run 2

**Verdict: pass.** Full report in `reports/qa.md`, appended below run 1's section (the `0006`
convention). **No source file was edited by this gate and no git command that changes state was run.**
Every probe ran in a `tar` mirror outside the repository with a hardlinked `node_modules`, deleted
afterwards.

**Scope.** Only the reject and T10, as `plan.md` §7.8 binds. T2, T3, T4, T6, T9, the four local gates
and per-area coverage were **not** re-litigated — a `find … -newer reports/qa.md` shows **exactly one**
file under `app/`, `components/`, `lib/`, `hooks/`, `public/`, `__tests__/` or `tests/` changed since
run 1: `__tests__/public-assets.test.ts`, 15:14. That is T10 and nothing else.

**Gates.** `pnpm lint` clean (151 files, 71 ms). `pnpm typecheck` clean. `pnpm test:coverage` green —
**62 files / 620 tests**, 14.31 s, exit 0. `next build` clean in the isolated copy, 11/11 static pages,
one alien font warning. `docs-check` 0 failures, 5 warnings, none for `0004`.
`__tests__/comment-free-code.test.ts` green on its own. **Coverage per area, re-derived from
`coverage/lcov.info` after the config change, not carried over:** `lib/**` 100/100/100/100 (140 branches,
64 functions, 258 lines), `hooks/**` 100/100/100/100 (78/51/203), `app/**` 100% statements, 0 branches,
10/10 functions, 29/29 lines, `components/**` 99.06/99.25/100/99.74 (265/267, 133/133, 378/379) — all
above their bars. **No threshold lowered:** `vitest.config.ts`'s four per-glob `thresholds` entries are
untouched and the coverage `include` globs still name all four areas.

**F1 — verified discharged.** Checked by classifying **all 13** tree-wide occurrences of the retired
string, not the two lines run 1 named. Zero live instructions remain: `plan.md:1150` is the sentence
that retires it, `plan.md:1412` and `STATUS.md:647` are past-tense records, `plan.md:1539` is **R12**'s
stated signal (which must name the string to stay checkable), `plan.md:1486` / `STATUS.md:702` / `:940`
are about `pnpm e2e` and a different subject, and six are in run 1's own report. The Tasks-table T7 row
now restates §7.5 item 1's three changes in order and closes *"This row is the only live instruction for
T7"*; the blocker opens *"DISCHARGED"*. **The third copy** — *"tech-lead still owns the T7 re-issue"* —
is gone, and the grep that would have caught it in run 1 was `grep -rn "re-issue"`, not
`grep -n "not scored"`: a retired instruction survives under words the retirement never used.
**R12 stays live** over `reports/audit.md`, correctly — its subject does not exist yet.
**F3 verified fixed** (X2 has its own bullet in § *Carried to later gates*). **F5 verified fixed**
(`plan.md` §7.8). **F2 accepted as ruled and not re-raised.**

**T10 — verified, and its control re-derived rather than accepted.** Built to `plan.md` §7.9 to the
letter: `expect(manifestIcons).toHaveLength(2)` is the first statement of both cases
(`__tests__/public-assets.test.ts:35` and `:45`), the binding at `:24` is unchanged, no loop body and no
pre-existing assertion moved, no comment, no helper, no other file. `app/manifest.ts:12-23` declares
exactly two icons, so §7.9's escape clause is not triggered. Three measurements in the isolated copy:

1. **As delivered:** `Test Files 1 passed (1) · Tests 4 passed (4)`.
2. **Binding emptied, T10 present:** both cases red on the new assertion —
   `AssertionError: expected [] to have a length of 2 but got +0` at `:35:27` and `:45:27`,
   `Tests 2 failed | 2 passed (4)`.
3. **The negative control, which the developer did not run and which is the one that proves F4 was
   real:** the same emptied binding with T10's two lines **deleted** is `Tests 4 passed (4)` — **green on
   an empty collection**.
4. **Floor versus exact, on a 1-icon binding:** the delivered exact count is **red** —
   `expected [ { src: '/icon-192x192.png', …(2) } ] to have a length of 2 but got 1` — while
   `toBeGreaterThan(0)` in its place is **green, 4 passed**. §7.9's "exact count, not a floor" is
   load-bearing in this tree, not a preference.

**`pnpm e2e` — answered, not presumed.** The port objection no longer held: `ss -ltnp` showed only 3917
occupied, by spec `0010`'s server. The full suite was run in the isolated copy on port 3000 and is
**not usable as evidence about `0004`** — 111 failures, **108** of them in the untracked
`tests/e2e/first-screen-reachability.spec.ts`, which is spec `0010`'s in-flight work. The other **3**,
in `google-tracking.spec.ts`, were **my own instrument**: the first run reused a `.next` built without
the `NEXT_PUBLIC_ENABLE_ADS=true` that `playwright.config.ts`'s `webServer.env` injects, which is the
Turbopack flag-cache trap `AGENTS.md` §4 rule 6 names. Re-run with `rm -rf .next` through the canonical
`pnpm build && pnpm start` path, the tracked, sibling-unmodified specs are **46 passed, exit 0**
(`google-tracking`, `responsive`, `salary-calculator`, `work-calculator`, `dark-hydration`), including
*"should never place an ad above the calculator"*. **Nothing in this spec's diff breaks the baseline
e2e, measured.** The full suite stays routed to G9.

**F6 — new, minor, non-blocking, owner `tech-lead`, owed before G7.** `vitest.config.ts:11`
(`exclude` gains `"**/.claude/**"`) and `tsconfig.json:37-40` (`exclude` gains `".claude"`), both mtime
15:19:08, are modified in the delivered tree by **no task** in `plan.md` §3 or §7 and by **no row** in
the decisions log. The only document trace runs the other way: the T10 decisions row records
`frontend-dev` correctly **declining** the edit under `AGENTS.md` §4 rule 7. The escalation was raised
properly; the answer landed in the tree and not in the record — the same shape as F1. It does not block:
the change is narrowing, `biome.json` already excludes `.claude`, no threshold or coverage `include`
glob is touched, and the coverage table above was re-derived after it. What is owed is one decisions-log
row naming the author and the contamination it answers — or a revert, since the orphan directory
`.claude/worktrees/agent-ae90673088dc067d0/` is **gone** (`ls -d .claude/worktrees/*` → no matches) and
the condition that motivated it no longer exists.

**O1 — observation, not a finding.** `__tests__/public-assets.test.ts:52-60`, the fourth case, iterates
`[FAVICON_SOURCE, ...manifestIcons]` with no count assertion. It can never measure nothing, but on an
emptied `icons` it degrades silently from three assets to one and still reports green. §7.9 scoped T10 to
the two cases and told the developer to change no other line; the developer obeyed. Whether the third
loop earns the same control is `tech-lead`'s call.

**Shared-tree attribution** (`AGENTS.md` §4 rule 6). The orphan worktree is gone and appears in no output
of this run. The `next build` font warning is pre-existing and alien. The +11 tests over run 1's 609 are
T10's four re-counted under the new config scope plus siblings' untracked
`__tests__/citation-guards.test.ts` and `__tests__/lr35-clearing-ranges.test.ts`. **Two incidents
disclosed in the report in full:** a `pkill -f next-server` issued against my own orphaned server did
**not** reach the sibling (pid `1467654` on 3917 still listening afterwards, `/proc/…/cwd` in another
session's `w0010r2`; the process I killed by pid had its cwd inside my own copy), and run 1's section of
`reports/qa.md` was briefly overwritten and restored **byte-identical** (27,507 bytes, 355 lines, mtime
15:04) from a sibling session's read-only mirror before run 2 was appended below it.


## Blockers

**T1's routed item is closed.** `tech-lead` ruled at the T1 triage; the ruling is in the header and
in full in `plan.md` §7. T1's transparency flag is **confirmed on process and corrected on
substance**: the delivery property is real, and it belongs to this machine's TLS-intercepting egress
proxy, not to the deployed origin. The incomplete six-property list was `tech-lead`'s (lesson **037**).

**All three run-1 blockers are ruled and closed, at `plan.md` §7.7.** `T2, T3, T4, T6 and T9 are
done and green; T5 is dropped, not blocked.** None of the three rulings below was decided by
`frontend-dev` — each is quoted here as it was raised, with the ruling and the resulting build noted
inline. Kept in full because a routed finding's original text is the record a later gate checks the
ruling against.

- **B3 — RESOLVED, `plan.md` §7.7 B3: T5 is dropped, not deferred.** `tech-lead`. T5 cannot be built as written: the repository's own lint gate rejects it, and
  every escape the task leaves is a thing the task forbids.** Implemented exactly as `plan.md` §T5
  specifies — `useId`, `id={labelId}` on the eyebrow `<span>`, `aria-labelledby={labelId}` on the
  `<p>` — `pnpm check` fails at `biome check`:

  ```
  components/organisms/hero-panel.tsx:46:11 lint/a11y/useAriaPropsSupportedByRole
    × The ARIA attribute 'aria-labelledby' is not supported by this element.
  > 46 │           <p
  > 47 │             aria-live="polite"
    i Ensure that ARIA attributes are valid for the role of the element.
  Found 1 error.
  ```

  The rule is substantively right, not a lint quirk: a bare `<p>` maps to ARIA `role="paragraph"`,
  which does **not** support an accessible name, so `aria-labelledby` on it is not merely un-lintable
  — it is not guaranteed to reach a screen reader at all. **The four tests the task specifies were
  written and all four passed in jsdom**, which is exactly the trap: jsdom asserts the attribute
  reached the DOM and can say nothing about whether the role supports it.

  The three ways out are each closed to `frontend-dev` by the task itself: adding a `role` to the
  `<p>` is forbidden by *"do not add a `role`"* and by the task's own test case 3; wrapping the
  numeral is forbidden by invariant **I4**; and a `biome-ignore` directive would suppress a true
  a11y finding to ship an attribute that may do nothing — a decision, not an implementation.
  **This is an X2 design question, not a build one**: whether the hero numeral gets its name from a
  role that supports one, from `aria-label` (which `design.md` §D rejects for freezing the label),
  or not at all, is `product-designer`'s call under `design.md` §D, routed through `tech-lead`.
  `plan.md` §T5 already names the fallback: *"if `product-designer` reads it otherwise at G6, T5 is
  dropped, not defended"* — the same disposition fits here, with X2 returning to
  `web-standards-auditor` as carried debt. **Nothing is left in the tree**: both T5 files are at
  `HEAD` and `pnpm check` is clean without them.

- **B1 — RESOLVED, `plan.md` §7.7 B1: origin declared once, `T9` built.** `tech-lead`. `app/robots.ts` and `app/sitemap.ts` each hardcode
  `https://workload.devrma.com`, and T4's third clause as written would go red on them.** The clause
  reads *"no file under `app/` other than `app/layout.tsx` contains the literal
  `https://workload.devrma.com`"*, while the same paragraph sets the guard's domain as *"every
  `*.tsx` under `app/`"*. The guard ships on the stated domain (`*.tsx`), which is green; `robots.ts`
  and `sitemap.ts` are `.ts` and sit outside it. Verified, before narrowing the domain:

  ```
  AssertionError: expected [ 'app/robots.ts', 'app/sitemap.ts' ] to deeply equal []
  app/robots.ts:9    sitemap: "https://workload.devrma.com/sitemap.xml",
  app/sitemap.ts:3   const SITE_URL = "https://workload.devrma.com";
  ```

  Both predate this spec and neither is in T3's or T4's file list; `plan.md` §2.1 opens no other file
  under `app/`. **Whether the origin declaration is narrowed to `metadataBase` in those two files, or
  they are exempted deliberately, is `tech-lead`'s call.** The emitted output is correct either way —
  `/robots.txt` and `/sitemap.xml` both print `0` occurrences of `vercel.app` in the preview build.

  **Ruled:** the declaration is narrowed to `lib/structured-data.ts`'s existing `SITE_URL`, imported
  by both files; the guard's domain widens to every `.ts`/`.tsx` under `app/`. Built as **T9**;
  red-first evidence above.

- **B2 — RESOLVED, `plan.md` §7.7 B2: seed corrected to `workRegime: "estatutario"`.** `tech-lead`. T6's salary seed specifies `regime` `"pj"`, and `"pj"` is not a value this
  application can hold.** `lib/payroll.ts:4` types `WorkRegime` as `"clt" | "estatutario"`, so
  `readStoredOption` discards `"pj"` and falls back to the `"clt"` default; the persistence effect
  then writes `"clt"` over the seeded `"pj"` **with the restore guard fully intact**, and the task's
  own loop assertion goes red for a reason that is not LR5.4. The seeded map therefore ships with the
  other five keys the task names (`grossSalary` `"4200"`, `monthlyHours` `"180"`, `dailyMinutes`
  `"480"`, `dependents` `"2"`, `salaryPeriod` `"month"`) and **omits `regime` entirely** rather than
  substituting a value `frontend-dev` chose. `"estatutario"` is the one non-default regime the type
  admits, but naming it is a decision about what a legal regime fixture asserts and it is not
  `frontend-dev`'s. One line restores the clause once `tech-lead` rules.

  **Ruled:** the value is `"estatutario"`, the key is `workRegime` (the seed's original text also had
  the storage key wrong). One line added to `__tests__/use-salary-calculator.test.ts`'s
  `storedValues` map, seen red again with the key in place. Red-first evidence above.

**The AC1 bounce is closed, and so is the item that followed from it.** It blocked the ship, not the
build, and it no longer blocks either — see § *AC1 is replaced* above.

- **`tech-lead` — re-issue T7 with AC1 scored. DISCHARGED at the G6 run-1 triage** (`plan.md` §7.8,
  F1). The amendment itself landed at bounce 1 in `plan.md` §7.5 item 1, which now opens *"AC1 is
  scored, on the replacement `product-manager` returned at bounce 1"* and withdraws T7's item 3
  explicitly. What had **not** landed was this file: the T7 row at `:267` and this bullet still
  carried the retired *"not scored"* instruction, and `STATUS.md` is what the auditor reads for task
  state. Both are corrected this triage. **There is now one instruction in this file, not two**, and
  the T7 row above is it. **R12 stays live as a risk on the report** — a green T2–T6 is still not a
  pass on Finding A, and `reports/audit.md` owes the per-route AC1 arithmetic with a V1/V2/V3 verdict
  — but it is no longer live as an unfixed contradiction in this document.

Also still open from before this task, not blocking anything:

- **`product-manager`** — the D1 spec is **open** as `0008-intermittent-layout-shift-on-custo-da-hora`
  and its G1 is closed. T1's X6 has been recorded into that spec's `STATUS.md` § *Handed in from
  `0004` T1/X6*: **`/custo-da-hora` with seeded storage reproduces the ≥0.1 shift in 5/20 loads
  (25%); every other cell is 0/20.** No cause named; no ruling made on `0008`'s scope.

## Carried to later gates

**This list is the carried-debt list.** `release-manager` reads it at G7 and `web-standards-auditor`
at G9. An item recorded here is **recorded, not fixed and not resolved**; moving it out of this list
requires a measurement, not a status word (`plan.md` **R14**, **R16**).

- **X2 → `web-standards-auditor` at G9, as carried debt. Not fixed, not resolved, not out of scope.**
  `components/organisms/hero-panel.tsx:44` — the hero numeral has **no accessible name**, and T5,
  which was going to give it one, is **dropped and its mechanism refuted**, not deferred:
  `aria-labelledby` on a bare `<p>` (ARIA `role="paragraph"`) cannot carry an accessible name, the
  repository's own `biome` rule `lint/a11y/useAriaPropsSupportedByRole` rejects it, and all four
  jsdom tests passed anyway — which is the trap, not the evidence (`plan.md` §7.7 B3, in full in
  § Blockers above). The three escapes are each closed by T5's own text (`role`, a wrapper against
  invariant **I4**, a `biome-ignore` over a true a11y finding). Whether the numeral gets its name
  from a role that supports one, from `aria-label` (which `design.md` §D rejects for freezing the
  label), or not at all, is **`product-designer`'s call under `design.md` §D, routed through
  `tech-lead`** — it was never `frontend-dev`'s. **`plan.md` R14:** AC8 is scored on a tree that
  contains X2 and produces no axe violation from it; the two are independent and **a green AC8 is
  evidence for nothing about X2.** Recording X2 as fixed, resolved or out of scope — or omitting it
  from this list — is R14's signal. Added here at the G6 run-1 triage: F3 was that omission.
- **F2 (`/_not-found` emits the deployment host) → `product-manager` to scope, carried to G7 and G9.
  Pre-existing, outside AC6's enumeration, recorded debt — not fixed, not resolved, not closed.**
  Under `VERCEL_ENV=preview`, `/_not-found` emits `og:image`/`twitter:image` on the branch alias, in
  `_not-found.html`, `_not-found.rsc`, two `.segment.rsc` files and `pages/404.html` — the only five
  `vercel.app` occurrences left in the build output, and `spec.md` C3's mechanism on the last route it
  still reaches. **The real defect is the guard's domain**, not the count:
  `__tests__/metadata-image-host.test.ts` bounds case 1 by *directories containing an image-route
  file*, an enumerated convention, where the class the rule governs is *every route segment that
  inherits a file-convention image route* — which includes segments Next generates with no
  `page.tsx`. The guard is green and cannot see it, by construction (`AGENTS.md` §5 *How a rule's
  domain is defined*). **Not widened in this spec on purpose:** `/_not-found` has no
  `page.tsx`, so no segment-level `openGraph.images` to declare, and a widened guard with no
  authorised remedy behind it ships a red gate (**R17**). The candidate remedy and the exact risk that
  makes it a build task rather than a line — layout-level `images` versus AC5's *exactly one of each
  per route* — are written out in `plan.md` §7.8 item 5 so the next spec starts from there.
  **Trigger, any one:** a spec editing `app/layout.tsx`'s `metadata` export,
  `app/opengraph-image.tsx` or `app/twitter-image.tsx`; a spec adding a route segment under `app/`;
  or a change of deploy host. **`web-standards-auditor` does not score F2 at G9** — it is outside AC6,
  and a green AC6 is evidence for nothing about `/_not-found` (**R16**).
- **`pnpm e2e` → `web-standards-auditor` at G9.** Not run at G6, **declared rather than presumed**:
  ports 3000/3917/3920/3941 were held by other agents' `next start` servers and a Playwright run
  against a shared port fails indistinguishably from a regression (lesson **029**). **Routing
  confirmed at this triage, not re-ordered.** AC7 is not scored as passed on `pnpm e2e` until that
  run exists; run 2 owes the four local gates only.
- **D2 → `labor-law-analyst` at G6**, not a G2 re-open: LR5's domain is stated as a test and already
  contains HS3/HS4; only the *quantity* clause is open. Every LR5 probe this spec runs must sample
  the eyebrow label on the same frame as the numeral so the ruling is made on measurement.
- **D4 (hero path) → `release-manager` at G7**, one line in `DESIGN.md` § Components.
- **D4 (`p-1.5`/`gap-1` inset) → `product-manager`**, a future spec; two human approval points.
- **023 and 029 are promoted and archived** — done by a sibling gate; the G10 reminder is discharged.
- **010 is promoted and retired at this triage.** It reached **3 confirmations** here (this is the
  second cycle it caught) and is now a rule in `.agents/agents/tech-lead.md` § *Before the plan
  accepts a numeric performance criterion*. Promoted mid-cycle rather than at G10 because the ledger
  was standing at the **30/30 cap**, which blocks the next agent from writing anything.
- **New lesson 037** written at this triage (`tech-lead` / `plan`): compare the measurement path
  itself — TLS interception, proxy, DNS — in any deployed-versus-local experiment, because loopback
  is the one path that bypasses it. This is the one that cost this cycle a whole diagnostic task's
  attribution.
- **New lesson 051** written at the run-2 spec gate (`product-manager` / `spec`): score a criterion
  on a quantity one of this spec's own experiments has already moved, and cite the run where it
  moved. Ledger moved to **27 / 30** by it.
- **New lesson 040** written at this triage (`all` / `spec`): run every acceptance criterion against
  a known-good state before accepting it, because a criterion that state fails does not discriminate.
  Written for `all` because AC1 was authored at G1 **and endorsed at G4** — the same defect, one gate
  apart.
- **New lesson 033** written at the G4 gate (`tech-lead` / `plan`): read a lab metric's observed value
  beside the value the tool reports before attributing it to anything. **Confirmed again here** — it
  is what made T1's one-parenthesis counterfactual readable as the refutation of AC1.
- **032 confirmed (→2)** at this triage: T1's routed causal claim was reproduced against the artifact
  it named, and the reproduction is what moved the attribution off the deployment.
- **034, 035 and 036 are promoted and archived**, with their full bodies, by sibling gates running in
  parallel with this triage. `tech-lead` briefly mis-read the intermediate state as three orphaned
  index rows and restored three stubs; the stubs were superseded by the real files within the same
  window and **no content was lost**. Recorded because the mistake is instructive, not because it had
  an effect: `.agents/memory/` is shared mutable state and a `ls` taken mid-operation is a snapshot
  of a race, not a finding.
- Ledger now at **27 / 30** (26 at the triage, plus **051** at the run-2 spec gate). Three slots —
  the next agent promotes or retires before writing.

Opened by `product-manager` at the G5 run-4 triage of spec 0002, so that the absolute
2,500 ms LCP target has an owner and a place instead of being retired inside a restatement.
`0002`'s AC7 was restated as a relative criterion because it was only satisfiable by work
`0002` forbids; **this spec is where the absolute target lives now.** It is not
`.specs/0003-citation-registry/`, which is scoped to citations and `lib/legal-tables.ts` and
moves no rendering phase.

## The carried finding

`0002` spent every lever its scope authorised (the mount fade, the viewport unit, the two
preconnects, the typeface, the icon library) and bought **−155.8 ms** on `/` and **−231.4 ms**
on `/custo-da-hora`. Both routes still land above 2,500 ms, and the measurement says why:

| Route | Baseline median | After median | Gap to 2,500 ms |
|---|---|---|---|
| `/` | 2,687.232 ms | 2,531.406 ms | +31.4 ms |
| `/custo-da-hora` | 2,769.030 ms | 2,537.612 ms | +37.6 ms |

**Phases on the median run: TTFB 454 · load delay 0 · load time 0 · render delay 2,076.**
82% of the metric is render delay; resource load time is **zero**. The shipped Atkinson woff2
(34,024 bytes) finishes at 65 ms, 2.4 s before the LCP timestamp. No font, image or bundle
lever can reach the remaining cost.

Source of record: `.specs/0002-design-taste-preflight/evidence/after.md` §2,
`.specs/0002-design-taste-preflight/STATUS.md` § *B5 ruling* and § *Routed to `product-manager`*,
`.specs/0002-design-taste-preflight/design.md` §5.1 cause 2 and §5.2.

## What this spec has to change to get there

Named, not decided — G1 writes the scope, G3 the design and G4 the plan:

1. **The client-gated hero numeral** (`design.md` §5.1 cause 2). The LCP element is a value the
   client computes after hydration, from a live clock. `0002` §5.2 deliberately never put it on
   the "what may change" table and `0002` § Out of scope keeps it out. Changing it means deciding
   how the number reaches first paint — server-rendered, placeholder-rendered, or something else.
2. **A `PRODUCT.md` §4 question, not a performance one.** If the hero paints before hydration, it
   paints *something*. What a stale, zeroed or placeholder number may show a user who came to read
   one number off a screen is a product and disclosure decision, and it is the reason this cannot
   be done as a performance tweak inside another spec. It is the gate that makes this spec exist.
3. **A field-realistic instrument.** 2,500 ms is a Core Web Vitals **field p75**, not a lab median.
   `0002`'s lab run-to-run spread (~106 ms) was more than three times the margin it was being asked
   to judge. This spec names its instrument — CrUX/field p75, or a lab median with a tolerance band
   wider than the tool's own spread — and the exact command, per lesson **009**, and attributes the
   metric to its phases before accepting any lever, per lesson **010**.

## Also carried in — `og:image`/`twitter:image` resolve to the wrong host (0005 G9, routed at G10)

Added by `tech-lead` at 0005's G10. A second, **independent** finding, folded in here rather than
given its own spec: it changes no number, so `AGENTS.md` §11 does not demand ten gates for it, but
it is invisible anywhere except a deployment — and this is the only open spec whose subject already
*is* what `app/`'s document head and first paint emit on a real deployment, measured by
`web-standards-auditor` at G9. `0003` is scoped to citations and `lib/legal-tables.ts` and is the
wrong home.

- **Where:** `app/opengraph-image.tsx`, `app/twitter-image.tsx` (the generated `<meta>` tags on both
  routes). Both files entered earlier in the PR stack; `0005` never touched them.
- **What is wrong:** `app/layout.tsx:16` sets `metadataBase: new URL("https://workload.devrma.com")`,
  and `canonical`, `og:url`, the JSON-LD `@id`/`url`, `sitemap.xml` and `robots.txt` all resolve
  against it correctly. The two file-convention image routes do not — on the preview they render as
  `https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app/opengraph-image?…`,
  the git-branch alias, a third host named nowhere in this repo. The image itself returns `200`
  `image/png`, so this is a metadata-correctness defect, not a broken asset: a crawler or a chat
  client unfurling a share fetches from a host outside the app's declared origin.
- **Standard violated:** `AGENTS.md` §9 — "Metadata, sitemap, robots, manifest and structured data
  still correct after the change" — the same bar every other field on the page already meets.
- **Reproduction, run at G9 and quoted here so G1 does not have to invent one:**
  `curl -s <preview-url>/ | grep -oE '<meta property="og:image"[^>]*>'`, and the same on
  `/custo-da-hora`. It cannot be reproduced against `localhost`, which is why it survived every G6.
- **Source of record:** `.specs/0005-…/reports/audit-preview.md` § SEO and metadata, Finding 1.

**Three bindings on `product-manager` at G1, from the G10 ruling:**

1. **Amend this spec's title and its `.specs/INDEX.md` row** to say it carries deployed-head
   correctness as well as LCP. A spec whose index row describes half of it is a spec the next agent
   scopes wrong.
2. **Two separate acceptance criteria, neither able to carry the other.** A partial pass is still a
   rejection (`AGENTS.md` §4 rule 1) — this must not become a spec that ships half and reads green
   because the easy half passed.
3. **Write the metadata criterion against the deployment**, with the `curl` above as its verification
   command (`AGENTS.md` §5, "How a criterion is written": the command has been run, on the artifact
   where the defect exists). A criterion written against a local build is unfalsifiable here.

## Not in this spec, on current evidence

- A runtime dependency added to hit the number (`0002` §3 and its non-goals still bind the app).
- A typeface, icon or bundle change. Those levers are spent and measured at zero load time.
- Anything that changes what the calculator computes.

## Also carried in — the budget failure is live on production, and the instrument drifts (0006 G9, routed at triage)

Added by `tech-lead` at `0006`'s G9 triage. Not a new finding: it is **this spec's own finding,
now measured on deployed artifacts** rather than on `0002`'s local build, and it moves two things
`product-manager` must write into `spec.md` at G1. Full ruling and raw numbers:
`.specs/0006-salary-alert-legibility/plan.md` § *G9 triage — run 1, ruled*, evidence in that spec's
`evidence/g9-control-build-ab/` (gitignored, regenerable; `summary.txt` has the 12-run table).

**What was measured**, one runner, one 6-minute window, `lighthouse 12.6.1`, unmodified
`.lighthouserc.js`, route `/`, 3 runs per host:

| Host | Build | `performance` | LCP (ms) |
|---|---|---|---|
| `workload.devrma.com` | production | 0.91 · 0.76 · 0.75 | 3259 · 5594 · 5613 |
| `workload-gqbii5wdl-…` | `0006` PR head, deployment alias | 0.73 · 0.74 · 0.78 | 6452 · 6338 · 5756 |
| `workload-git-fix-…` | same build, branch alias | 0.75 · 0.75 · 0.76 | 5922 · 6065 · 5711 |
| `workload-8kqr9212j-…` | **`0005`'s G9 deployment, unchanged** | 0.72 · 0.76 · 0.75 | 5770 · 5680 · 6065 |

1. **The target is missed on the production domain, not only in a lab.** `0002` left this spec a
   local-build gap of +31 ms and +38 ms. On the real domain the metric is now 3.3–5.6 s against
   2 500 ms. The gap this spec has to close is larger than the one it was opened with.
2. **The instrument moved 26 points on a frozen artifact.** `0005`'s G9 measured its own deployment
   at `performance` 0.98 / LCP 2.43 s a week ago; that same deployment, unchanged, now measures
   0.72–0.76 / 5.7–6.1 s. Nothing in this repo explains it (script transfer is flat: 239 975 B then
   239 647 B) and the branch/deployment alias question is settled — identical transport, identical
   scores. **No before/after claim in this spec may compare against a number copied from an older
   report.** Every comparison is a difference measured in one session against a control build, per
   `.agents/agents/web-standards-auditor.md` §G9's control-build rule, which this triage added.
3. **The falsifiable criterion is the phase, not the score.** In 11 of those 12 runs
   `largest-contentful-paint` equals `interactive` to the millisecond, while FCP lands at
   1.15–2.27 s. `hooks/use-current-time.ts` returns `null` on the first render, so
   `components/organisms/hero-panel.tsx`'s numeric `<p>` ships with no server-rendered text and
   cannot become an LCP candidate before hydration. Load Delay and Load Time are 0 ms in every run.
   Write the acceptance criterion as **`audits['largest-contentful-paint'].numericValue` must stop
   equalling `audits.interactive.numericValue`** — one lever, inside this spec's scope, on a margin
   that does not move with the runner (lessons **010**, **011**). The 2 500 ms absolute target stays
   as the goal; the phase equality is what a gate can score without re-deriving this triage.
4. **Measure from three hosts** at G6/G9: this spec's preview deployment alias, the pre-fix control
   deployment, and `workload.devrma.com`.
5. **The field is not the lab, and both belong in the evidence.** A real chromium at 4× CPU throttle
   with no network simulation paints that element once, at 448 ms (0005 build) / 560 ms (0006 build)
   — a single LCP candidate, no churn from the 1 s clock tick. The probe is reusable:
   `.specs/0006-salary-alert-legibility/evidence/g9-control-build-ab/lcp-candidate-probe.mjs`.
   It does not excuse the lab number; it bounds what the fix is actually buying a user.

The `PRODUCT.md` §4 gate above is unchanged and still comes first: what the hero may paint before
hydration is a product and disclosure decision, and it is the reason this is not a performance tweak.

---

## Decisions log

| When | Agent | Decision |
|---|---|---|
| G6 run 2 | team-lead (orchestrator) | **F6 discharged — `vitest.config.ts:11` and `tsconfig.json` exclude `.claude`, by my change, recorded here because it reached the artifact before it reached any log.** An orphaned directory `.claude/worktrees/agent-ae90673088dc067d0/` — another agent's failed provisioning, holding an old lineage of this project — was being swept by unfiltered `vitest` and `tsc` runs and read as this spec's regression by two separate agents. `biome.json` already excluded `.claude`; the other two did not. The exclusion is kept rather than reverted: the orphan is gone, but the harness creates that path for any isolated agent and the next one would reproduce the contamination. `tsc --noEmit` clean after the change. **This is F1's shape applied to me** — the decision landed in the file and not in the record, and `qa-engineer` caught it the same way it caught F1. |
| G1 run 1 | product-manager | **F1's stated mechanism is false and the spec does not build on it.** § F1 item 3 says `hero-panel.tsx`'s numeric `<p>` "ships with no server-rendered text". `curl` against the branch-alias deployment returns `<p aria-live="polite" …>17:48</p>` on `/` and the same element containing `R$ 0,00` on `/custo-da-hora`, and the stored G9 LHRs name that `<p>` as the LCP element on all four hosts. `useCurrentTime` gates the header clock, the hero badge and the ring's `statusTime` — all three `aria-hidden`, none the LCP element. Recorded as `spec.md` C1. The FCP→LCP cause is therefore **undetermined at G1 and is the first deliverable of `plan.md`** (lesson **010**). |
| G1 run 1 | product-manager | **`workload.devrma.com` is demoted from control to context.** `git rev-list --count origin/main..HEAD` → 45. Production serves `origin/main`, which predates the whole `0002`/`0005`/`0006` stack: `lucide` icons (42 occurrences, vs 0 on head) and the mount fade `0002` removed (`style="opacity:0;transform:translateY(20px) scale(0.98)"`, vs `opacity:1;transform:none` on head). An `opacity: 0` element is not an LCP candidate, which explains production's own numbers with a cause **already fixed on head**. F1's binding #4 (three hosts) is kept, but production is host **H3**, reported and excluded from every pass/fail arithmetic. The budget failure is still real: the three deployments carrying the stack measure 5.7–6.5 s. Recorded as `spec.md` C2. |
| G1 run 1 | product-manager | **The absolute 2,500 ms target is not written as a Lighthouse-lab acceptance criterion, and it is not moved to another spec.** Lesson **011**'s margin test fails outright: the same frozen `0005` deployment measured 2.43 s a week ago and 5.7–6.1 s in the G9 session — a drift of ≈3,300 ms on an unchanged artifact, larger than the threshold itself. It stays here as the goal, carried by AC1 (a phase identity that does not move with the runner), AC2 (a same-session differential whose margin must exceed the control's own spread) and AC4 (the absolute number held on the one instrument where it is decidable — a real browser, 448 ms on both routes). What the restatement still forbids is written into `spec.md` § *On the absolute 2,500 ms target*. This is the second restatement of this criterion; a third would be a retirement, and the reason is recorded here so the next agent inherits the reasoning rather than the contradiction. |
| G1 run 1 | product-manager | **Finding B is four emitted URLs on two routes, not two files.** Next inherits the root `opengraph-image`/`twitter-image` conventions into `/custo-da-hora`, which emits its own pair on the same wrong host, and every one of them also appears in the RSC flight payload. AC6 is therefore written as a search over the whole boundary — `vercel.app` must appear **nowhere** in the bytes of `/`, `/custo-da-hora`, `/sitemap.xml`, `/robots.txt` or `/manifest.webmanifest` — rather than as an assertion on four `<meta>` tags (`AGENTS.md` §5). The same search confirmed the other six metadata surfaces clean. Recorded as `spec.md` C3. |
| G1 run 1 | product-manager | **AC4's verification command was run before it was written** (`AGENTS.md` §5). The `0006` probe was repointed at the branch head and extended over both routes, saved to `.specs/0004-lcp-render-delay/evidence/lcp-candidate-probe.mjs` (gitignored, confirmed by `git check-ignore`), and run from the repository root: one LCP candidate per load per route, `t=448ms`, element text `17:48` and `R$ 0,00`. AC4 is therefore a **guard, not the work** — it already passes, and exists so the fix cannot win AC1/AC2 by making the real-browser paint later or by splitting the element into several candidates. |
| G1 run 1 | product-manager | **The `PRODUCT.md` §4 gate that justifies this spec is reframed, not dropped.** § F1 framed it as "what a stale, zeroed or placeholder number may show". There is no placeholder on the LCP path — the server paints the real default. The live §4 question is narrower and still binding: a **returning** user whose stored entry is 09:00 reads `17:48` from the defaults until hydration, and shortening that window makes a number that is not theirs *feel* more authoritative. Carried as legal dependency **L5** and open question **O1**, default **disclosure required**, `labor-law-analyst` rules at G2. |
| G1 run 1 | product-manager | **No new user input, so no new default to state** — the spec introduces none. The two defaults already on the first-paint path (the 8 h 48 min journey, the 50%/100% overtime floors) are listed as **L1** and **L2** so nothing on that path reaches the screen without passing G2, per `AGENTS.md` §11's "could this change the number on someone's screen" test. |
| G2 run 1 | labor-law-analyst | **O1 is answered `no`; the `product-manager`'s default of "disclosure required" is overturned** (`legal.md` §2). A server-rendered default that hydration replaces with the user's own stored value is **not a disclosure** under the cite / gap / choice test (`0006` §2.1) and **no Brazilian norm governs it**. The test classifies a string by **what it asserts**, and it has no temporal clause — it returns *(a) only, before and after*, because the numeral's assertion does not change when its value does. The pre-hydration figure is not wrong: `17:48` is `0001` `legal.md` **E13**'s verified worked example over the defaults `PRODUCT.md` §5 mandates, and `R$ 0,00` is `0006` §2.3's C1, accompanied **in the server response** by *"Esse zero não é o seu salário, é a falta do dado."* What is false for a returning user is an unstated premise about a form field, not a legal claim. **CDC art. 31 was read, not recalled** (verbatim in `legal.md` §5.5/§2.5, from Câmara/Legin): its object is the *oferta e apresentação de produtos ou serviços*, *ostensiva* is a **perceptibility** requirement — the axis LR1–LR3 already measure — and there is no temporal clause in it or its parágrafo único. Extending it to render latency would have been the invented obligation this gate exists not to manufacture. |
| G2 run 1 | labor-law-analyst | **The brief's 5.7–6.5 s is not the stale window, and a bound written against it would have been wrong by a factor of twenty** (`legal.md` §2.4, E-L1). That figure is the Lighthouse lab's `largest-contentful-paint` timestamp. The stale window is the interval between the default's paint and hydration's swap. I constructed the state the ruling is about — a returning user's inputs seeded in `localStorage` (lesson **031**) — and measured it on the deployed head, real Chromium, 412×823, 4× CPU throttle, four loads per route: **`/` 182.4 / 273.2 / 311.5 / 321.6 ms**, **`/custo-da-hora` 269.4 / 278.8 / 284.9 / 299.7 ms**, **exactly one text transition per load on both routes**. A rule of *"no more than 2 s"* would have passed by a factor of six on the unfixed build and told every later gate that this gate had looked. **So `legal.md` sets no duration bound** — not because the quantity is unmeasurable, but because it carries no obligation at any magnitude (lesson **023**). Probe and raw output: `evidence/stale-window.mjs`, `evidence/stale-window.txt` (gitignored). |
| G2 run 1 | labor-law-analyst | **LR5 added — the one new binding rule, and it is not a disclosure** (`legal.md` §3). It joins LR1–LR4 as a **non-regression condition on the transition** from default to restored value, with the domain stated as a test (lesson **024**) and the quantity named exactly — `textContent.trim()` of `p[aria-live="polite"].numeric`, sampled per animation frame (lesson **023**). Four clauses: **LR5.1** exactly two distinct values per cold load; **LR5.2** the last value is the restored one and does not revert; **LR5.3** both produced with no interaction beyond scrolling; **LR5.4 — the clause with the substance — no `localStorage` key the calculators read is written before restore completes.** LR5.4 is the one I would reject a build over: if a default were persisted over a stored input, that is not staleness, it is the app destroying the user's own record and replacing it with a value they never chose, and it fires clause (c). It holds today at `use-work-calculator.ts:164`, `:186` and `use-salary-calculator.ts:137` — **by construction, asserted by no test**, which is finding **F1**. LR5 forbids no implementation and **explicitly does not authorise** marking the pre-hydration numeral as provisional, dimmed, caveated or skeletal; a design that does so is not implementing this file. |
| G2 run 1 | labor-law-analyst | **L6's question was put the wrong way round, and answering it as asked would have written a rule right about the wrong things** (`legal.md` §4, lesson **024**). `aria-hidden` is a property of a **node**; the disclosure domain is defined over what a **string asserts**. All three placeholder surfaces are out of the domain — but *because `"--:--:--"` asserts no quantity*, not because they are `aria-hidden`. The counter-example is in the same component: the progress ring's `statusTime` is **not always a placeholder** — two of its four branches render the user's signed day balance and overtime clock, inside `aria-hidden`, and they **are** in the domain. They pass only because `work-calculator.tsx:234` renders the accessible equivalent alongside them. The general rule recorded instead: **`aria-hidden` neither adds a string to the domain nor removes it; it decides only whether the obligation is discharged in every modality.** Written as L6 framed it, the rule would have gone false the moment a lever moved a figure into one of those nodes — which is exactly the kind of lever this spec authorises. |
| G2 run 1 | labor-law-analyst | **L1 settled: `8 h 48 min` is a defensible default and is not a legal constant.** 44 h ÷ 5 = 8,8 h. It exceeds CF art. 7º XIII's eight-hour figure and is lawful anyway — the same inciso *faculta a compensação de horários*, CLT art. 58 caput admits *"outro limite"* expressly, and CLT art. 59 §6º (Lei 13.467/2017, em vigor 2017-11-11) makes the compensation regime lawful by **acordo individual, tácito ou escrito**. All three quoted verbatim in `legal.md` §5.1. It needs **no citation in `lib/` and no disclosure** because it is an **editable input, not a published answer** — `0001` E13 already recorded this by writing `Rule: —` against the exit projection. Extending §4's *cite or omit* to form defaults would require citing a norm for the `0` in the dependants field. The one genuinely open point — that the default presupposes a compensation arrangement the app never names — is recorded as **Q1 for the human**, not as a finding: `PRODUCT.md` §9 already carries *banco de horas* as an explicit non-claim, so silence is consistent rather than evasive, and this spec opens no string. **Nothing blocks on it.** |
| G2 run 1 | labor-law-analyst | **L4 disposed of by arithmetic, not by re-verifying a table.** With `DEFAULT_GROSS_SALARY = 0` (`use-salary-calculator.ts:29`), **no bracket is entered and no table is consulted** — the `R$ 0,00` the server paints is `0 − 0 − 0`. **No tax-derived figure reaches the user before hydration on either route**, which disposes of L4's concern without opening `lib/legal-tables.ts`. The tables were **not** re-verified, deliberately, per the brief: digit by digit at `0002` G6, by hand at `0005` G9 and `0006` G9. L3 likewise unreached — `stats.nightMinutes` is computed in the measured render but reaches no hero numeral, and is zero on the default journey. What **is** on the first-paint path is the table-year citation (`CURRENT_LEGAL_YEAR`, `calculator-views.tsx:88-95`), server-rendered today; that it stays there is guard **F2**. |
| G2 run 1 | labor-law-analyst | **L7 clean, and Finding B's fix is bound by what it may say, not by a word list** (`legal.md` §6, lesson **004**). `lib/og-image.tsx` renders four sentences, read from the module: no rate, bracket, ceiling, divisor, year or currency amount; the two `100%` literals are `width`/`height` at `:29-30` and never render as text. The fix is authorised to change **the host of the emitted URL and nothing else**; any rewrite of those four strings re-endorses them (lesson **002**) and passes back through the cite/gap/choice test first — it may not gain a rate, a year or an amount, and *banco de horas* and its everyday synonyms stay retired. |
| G2 run 1 | labor-law-analyst | **Two findings, one new debt, both non-blocking.** **F1 (low)** — the restore guards at `use-work-calculator.ts:164`, `:186` and `use-salary-calculator.ts:137` are correct but **asserted by no test**; 100% coverage executes the line, it does not protect the invariant, and it is exactly the line a performance refactor moves. LR5.4 needs a check seen red. Owner `qa-engineer` at G6. **F2 (low, guard)** — the table-year disclosure is in the server response today and must not be deferred past the numeral it qualifies (`spec.md` § Disclosure obligations item 3). **X2 (new, not a legal finding)** — `hero-panel.tsx:44`'s `<p aria-live="polite">` has no accessible name, so the swap is announced as a bare *"18:48"* once per load; `hero-panel.tsx` **is** in scope here, so it may be fixed at G6, but this gate does not require it and does not dress it as a legal finding — stretching CDC art. 31 to reach an `aria-labelledby` is the same over-extension declined in §2.5. Owner `web-standards-auditor`. **X1 confirmed still recorded with an owner in five places and not re-triaged**; this spec opens neither `lib/salary-period.ts` nor `salary-calculator.tsx:151` and is still not its place. **This is its fourth carry — a fifth with no scope goes to the human, not to another `legal.md`.** |
| G2 run 1 | labor-law-analyst | **`planalto.gov.br` unreachable for the second consecutive law gate** (`curl` → `000` on three URLs, `WebFetch` → `socket hang up`). Every norm in `legal.md` §5 is therefore verified in this session against **Câmara dos Deputados — Legislação Informatizada** (`…-normaatualizada-…`), an official consolidated text, with the article text reproduced verbatim so a second analyst can check it without refetching. Recorded as **Q2 for the human**, because it is now an infrastructure precondition on this gate rather than a caveat on one spec: **X1's repair has a stated precondition on reaching `planalto.gov.br`**, and if the path stays broken the squad must decide whether Câmara/Legin is an accepted primary source for this repository or whether the network gets fixed. |
| G2 run 1 | labor-law-analyst | **Three lessons confirmed, each with a cited application that changed this gate's output** — not a bulk bump (`0006` G10's warning about inflated counts). **023 → 3, and it is now due for promotion**: it is why no millisecond bound was written before the window was measured, and the measurement is what exposed the brief's quantity error. **Promotion is `tech-lead`'s call at G10**, into `.agents/agents/labor-law-analyst.md`; flagged here so it is not missed. **024 → 1**: it is why L6 was ruled on what each string asserts instead of on the `aria-hidden` property L6 offered, which is what surfaced the ring's balance branch as the counter-example. **031 → 1**: it is why the stale window was measured by seeding `localStorage` and rendering, rather than bounded from the source. **032 deliberately not confirmed** — the `product-manager` already applied it this cycle, and my use of it is the same act 023 already claims. **No new lesson written**: the failure this gate avoided is already covered by 023's rule 3, and a fourth near-duplicate at 24/30 would spend the cap without buying anything. |
| G3 run 1 | product-designer | **The hydration transition is ruled correct and must not be treated — "already correct" is the verdict, stated plainly** (`design.md` §A). Today the numeral's text is replaced in place, in one frame, with no transition declared on it; the panel's only transition is the 320 ms tone cross-fade at `hero-panel.tsx:30`. That is what `DESIGN.md` already requires in **three** named rules — § Motion *What must never animate* ("**The hero's numeral** … must be instantaneous"), **The Numbers-Don't-Move Rule**, and § Don't ("Don't animate a value the user is reading"). Skeleton, shimmer, fade, dim, `aria-busy` and "carregando…" are **rejected on design merit independently of `legal.md`**: the window is 182–322 ms, the default is not wrong, every one of them would be a third rendered value and so fail **LR5.1**, and — the decisive argument — each would need a `prefers-reduced-motion` fallback, and that fallback is **exactly the current behaviour**. A treatment whose accessible path is the status quo is building nothing, twice. |
| G3 run 1 | product-designer | **The numeral's size change at the swap is the system working, not a defect, and it is now a ceiling.** Measured, both themes identical, 390px, 4× CPU throttle: `/` costs **0 px and 0.0000 CLS** (`17:48`→`18:48`, same length, 96px both); `/custo-da-hora` costs **16.3 px / 0.0099** (period `hour`), **47.6 px / 0.0481** (`month`, 6/6 runs) and **60.4 px / 0.0544** (`year`) as the container-query sizing shrinks a longer restored value. All 2–10× under the 0.1 "good" threshold. Fixing the size would overflow at 390 (`R$ 115.600,68` at 96px needs ~640px of a 294px container; **zero horizontal overflow measured at all of 320/390/500/640/768/1024/1280/1440/1920/2560/3840**); reserving the max line box would spend ~60px of a phone hero permanently and would still leave the identical resize firing on every keystroke. Above 1920 both values clamp at the ceiling and the swap costs **0 px** — the whole question is a ≤1440 phenomenon. Recorded as invariant **I7**: a remedy that raises any of those four numbers is a regression. Probes: `evidence/hero-swap-geometry.mjs`, `evidence/hero-label-swap.mjs`, `evidence/hero-width-sweep.mjs` (gitignored). |
| G3 run 1 | product-designer | **Eight invariants frozen for a remedy nobody has found yet** (`design.md` §B), because `spec.md` O3 leaves the FCP→LCP cause to `plan.md` and designing against an unknown cause is how the last three refuted premises got here (lesson **032**). The two most likely to break by accident: **I8** — no fourth root-size step above 18px, because `AlertBanner`'s horizontal chrome has a **3px margin** against its 32px budget at an 18px root and a performance change touching `html { font-size }` looks unrelated to an alert atom (`0006` wrote this down at cost); and **the mount-animation prohibition** — no element on the hero's paint path may acquire an enter animation, an `initial`/`animate` pair or a resting `opacity`/`transform` below its settled value, **in the server response or after it**, because a `motion` component starting at `opacity: 0` produces exactly the HTML AC3 permits and exactly the LCP defect AC1 forbids. That is the mechanism still live on `origin/main` (`spec.md` C2). Also frozen: **I4** — **1024px is the tightest hero container in the range (285.3px, narrower than 390's 294px)**, so any remedy touching the 7/5 split re-checks 1024, not only 390. |
| G3 run 1 | product-designer | **Finding B: both OG cards are correct as images and nothing about them changes — but `spec.md` C3's mechanism is refuted** (`design.md` §C, finding **D3**). C3 states there is no `app/custo-da-hora/opengraph-image.tsx` and that `/custo-da-hora` inherits the root convention. **`find app -name '*.tsx'` returns four files**, and `app/custo-da-hora/{opengraph,twitter}-image.tsx` have been committed since `16097c3`, each calling `renderOgImage("salary")` and each carrying its own `alt`. I fetched and viewed both PNGs rather than reading the module (lesson **031**): two distinct, correct 1200×630 cards, each with its own route's headline, and the footer line already reads the literal `workload.devrma.com`. **The picture is right; only the `content` of the `<meta>` pointing at it is wrong.** C3's conclusion (four wrong URLs) survives; its mechanism does not, and the difference decides the fix — an agent who believes in inheritance edits the root pair, verifies `/`, and ships `/custo-da-hora` broken. Two non-blocking notes for a future spec: the card's footer uses `--color-accent` as text on the dark canvas at **3.42:1** (passes only under the large-text 3:1 rule; the app's role token for that job is `--color-accent-ink`), and `lib/og-image.tsx:34` sets `fontFamily: "sans-serif"` so the card is not in Atkinson. |
| G3 run 1 | product-designer | **X2 does not interact with anything proposed, because nothing is proposed — but the fix has one design constraint, and getting it wrong states something false about the user's day** (`design.md` §D). `hero-panel.tsx:44`'s accessible name must come from **`aria-labelledby`** pointing at the eyebrow `<span>` at `:37`, never from a copied `aria-label` string: that eyebrow **itself changes at hydration** on `/` (`Saída Prevista` → `Saída Real`, measured 3/3), so a frozen `aria-label` would announce *"Saída Prevista, 19:10"* to a manual-exit user — a wrong statement made by an accessibility fix. Naming the region adds **no** announcement (a name is context for the change, not a second change), so **LR5.1's one-announcement-per-load is preserved**. The fix must also not add `aria-atomic`, not switch to `assertive` or `role="status"`, and not wrap the numeral in a new element inside the `@container` — the last re-parents the container-query reference and changes the numeral's size (invariant **I4**). Owner stays `web-standards-auditor`. |
| G3 run 1 | product-designer | **D1 — a second, intermittent layout event on `/custo-da-hora`'s critical path, 5× over the CLS budget, that is not the hero and is not in `spec.md`.** Six loads per route, 390×844, dark, 4× throttle, seeded returning user: `/` is 0.0011 in 6/6; `/custo-da-hora` is **0.0481 in 5/6 and 0.5933 in 1/6**. The 0.0481 is the hero swap, deterministic and accounted for. The extra **0.5452 at t=367 ms** has sources `DIV.lg:col-span-7.space-y-8 prev=84,632 cur=595,249`, `BUTTON.flex.w-full prev=419,95 cur=0,0`, `DIV.relative prev=563,56 cur=0,0`, `svg.tabler-icon-briefcase` — the form column losing 383px of height with three children going to zero size, at the same hydration boundary this spec is already investigating. **I deliberately do not name the cause** (`spec.md` O3, lesson **032**); I assert only what I measured. G4's attribution should cover it in the same pass. Reproduce: `node .specs/0004-lcp-render-delay/evidence/cls-early-shift.mjs`. |
| G3 run 1 | product-designer | **D2 — LR5's domain test returns four surfaces, not the two `legal.md` enumerates, and `legal.md` §3 says the gate that finds a third and does not add it has misread the section.** Found by rendering the states, not by reading source (lesson **031**): **HS3** — the hero eyebrow on `/`, seeded `isManualExit = false` → *Saída Prevista*, restored from `localStorage` at `use-work-calculator.ts:159` → *Saída Real*, measured 3/3. **HS4** — the hero eyebrow on `/custo-da-hora`, seeded `DEFAULT_PERIOD = "hour"` → *Valor por Hora*, restored from `salaryPeriod` at `use-salary-calculator.ts:89` → *Valor por Mês* / *Ano*, measured 3/3 each. HS4 is the substantive one: with `period` restored to `month` the numeral goes from an **hourly** figure to a **monthly** one (`R$ 0,00` → `R$ 3.807,40`), so the quantity changes at the same instant as its name — and LR5's stated quantity reads the numeral's `textContent` only, never the label. **This is `labor-law-analyst`'s table to amend, not mine**; routed to `tech-lead` to decide whether G2 re-opens. The design position is unchanged either way: label and numeral swap in the **same frame**, with no intermediate state, which is correct. |
| G3 run 1 | product-designer | **No new token, no system change, no blocker — and two candidates rejected rather than deferred.** (1) A duration or state token for the swap: rejected, the swap has no duration and must not acquire one. (2) A spacing key for the segmented-control track inset: **`period-selector.tsx:10`, `journey-form.tsx:102` and `calculator-views.tsx:43` all use `p-1.5` (6px) + `gap-1` (4px)**, which is off `DESIGN.md`'s **Eight Steps Rule** — three identical occurrences is an unwritten idiom, not three mistakes. Rejected here on two grounds: no new token exists or is needed (both are Tailwind multiples of the bare `--spacing`), and `DESIGN.md` **The Numeric Scale Rule** makes any `--spacing-<name>` key a container-scale hazard `0005` already paid for by shipping a legally required disclosure 64px wide. Recorded as **D4** for a future spec — as is the stale `DESIGN.md` § Components path for the hero (`molecules/` in the document, `organisms/` on disk; the file is right, correct the document at G7). Both are human approval points and neither is taken quietly. |
| G3 run 1 | product-designer | **Lesson 031 confirmed, twice, with cited applications that changed this gate's output.** It is why both OG cards were **fetched and viewed as PNGs** rather than inferred from `lib/og-image.tsx` — which is how the four-file structure refuting `spec.md` C3 surfaced — and why the LR5 domain was tested by **seeding `localStorage` and rendering** the manual-exit and `period=month`/`year` states, which is how HS3/HS4 surfaced. Both are exactly the failure the lesson describes: a surface bounded from its source text instead of rendered is a surface described wrongly. **Lesson 032 not confirmed** — applying it here (declining to name D1's cause, declining to design a remedy for an unfound cause) is the same act the `product-manager` and `labor-law-analyst` already claimed this cycle, and a third bump would inflate the count without buying anything. **No new lesson written**: this gate was not rejected and nothing it avoided is outside 031's and 032's existing rules, and at 24/30 a near-duplicate spends the cap for nothing. |
| G4 run 1 | tech-lead | **There is no FCP→LCP gap in the page, and the number the spec was opened over is a simulator output.** All twelve stored G9 reports and every run I made carry `throttlingMethod: simulate`; read beside the simulated values, `observedFirstContentfulPaint` and `observedLargestContentfulPaint` are **the same instant in 12/12 stored runs and in all ten of mine** (1,370–2,412 ms across four builds spanning 45 commits), and the trace carries **exactly one** LCP candidate. `Render Delay 5,127 ms` (`spec.md` E3) is a Lantern term, not time a browser spent. The page produces **one** paint, of everything at once; the hero numeral is simply the largest thing in it. Recorded as `plan.md` §1 A1. **Every lever `spec.md` § Scope item 2 nominates — `bootup-time`, `mainthread-work-breakdown`, 28 kB of unused JavaScript — is denominated in a phase that totals `diagnostics.totalTaskTime` 371.8 ms, with no task over 100 ms; M2 shows the paint is held even with throttling switched off entirely.** This is lesson **010** applied and it is also where 010 nearly misfired: the phase table 010 points at is itself a simulator output. |
| G4 run 1 | tech-lead | **AC1 is satisfied if and only if the first contentful paint lands before the end of the resource graph — and that is demonstrated, not argued.** Lantern estimates LCP from the dependency graph of everything completed before the observed LCP; when the page paints only after the last byte, that graph is the whole page, so simulated LCP = simulated everything-done = simulated TTI. Hence the identity in 11/12 stored runs. **M5**: blocking `*.css*` on the unchanged deployment moves the paint to **332 ms**, collapses simulated LCP 5,864 → **993 ms**, leaves TTI at 3,955 ms — **the identity breaks**. **M8**: the same build served from `localhost:3457` paints at **197 ms**, LCP 2,207 ≠ TTI 2,990, performance **0.99**. CPU (M2, unthrottled, still held), the icons (M3), the webfont (M4), the preview toolbar (M6), the Chrome binary (M7) and the harness (M10, `example.com` at 235 ms; M11, `vercel.com` normally decoupled) are each ruled out by a measurement. **The narrowest true statement is that the cause lives in the interaction between the compiled 64,843-byte stylesheet and the deployed delivery — not in the hero, not in the hooks, not in the JavaScript — and T1 names it.** The trace's first `PaintTimingVisualizer::LayoutObjectPainted` in the entire load is at 1,354.7 ms while `Layout` completes at ~490 ms and the compositor commits frames from 403 ms: the page is laid out and composited with nothing painted into it. |
| G4 run 1 | tech-lead | **No remedy task for Finding A is written, and the plan says so in its first paragraph.** `spec.md` O3 left the cause open; three gates have each already refuted a premise they were handed this cycle (C1, C2, C3, and `design.md` D3 refuting C3). Writing T8 now would inherit a fourth premise at full confidence. **T1 is a diagnosis task that edits no source file**, runs six enumerated experiments with the command and the recorded value for each, and carries four hard stops — including *"the cause is not in application code"*, which is explicitly recorded as **a real result and not a defeat**, routed to `product-manager` rather than converted into a code change so that something ships. What the remedy may and may not do is pre-decided in `plan.md` T8+ so the amendment is fast and nobody improvises it under time pressure. |
| G4 run 1 | tech-lead | **One lever is already measured and is recorded as *not* the remedy.** `file public/*` reports `favicon.ico`, `icon-192x192.png` and `icon-512x512.png` as **one and the same 1024×1024 baseline JPEG**, 234.8 kB each, under two wrong extensions; the two that load are **473,978 of the page's 781,915 bytes — 61%**. Blocking exactly those two on the unchanged deployment (M1→M3) buys **−1,617 ms of simulated LCP and +7 performance points**, and **does not move the observed paint (1,370 → 1,414 ms) and does not break the LCP/TTI identity.** T2 replaces them with `/usr/bin/convert` (no new dependency), verified in this tree at **14.7 kB / 22.9 kB / 132.6 kB** with the correct `file` types, and T2's *Done when* states in terms that it advances AC2 and the 2,500 ms goal and **no part of AC1** — so a 7-point score move cannot be reported as AC1 passing (risk **R2**). |
| G4 run 1 | tech-lead | **Finding B's mechanism is neither `spec.md` C3's inheritance nor a resolution bug, and the fix was verified by building it.** Read from the installed Next **16.3.5**: for a file-convention image route (`isStaticMetadataRouteFile`), `getSocialImageMetadataBaseFallback()` **overrides** the declared `metadataBase` with `VERCEL_BRANCH_URL || VERCEL_URL` whenever `NODE_ENV === "production" && VERCEL_ENV === "preview"` (`resolve-url.js`). So `metadataBase` can never reach those four tags on a preview, the other six metadata surfaces are clean because none is a static metadata route file, and **the defect does not fire on `workload.devrma.com`, where `VERCEL_ENV=production`.** `resolve-metadata.js:148` gives the exit: a segment that declares `openGraph.images` itself **replaces** the file-convention image rather than appending to it. T3 declares it in the two page modules; built and served in an isolated copy with `VERCEL_ENV=preview VERCEL_BRANCH_URL=…`, all four tags emit `https://workload.devrma.com/…`, `vercel.app` appears **0** times in all five AC6 surfaces, exactly one `og:image` and one `twitter:image` per route, and all four image routes still return `200 image/png` at 61,207 B and 53,925 B — **two distinct cards preserved**, as `design.md` §C requires. AC5 and AC6 stand unchanged. |
| G4 run 1 | tech-lead | **D3 bounced to `product-manager` with the replacement text written out, bundled with the K3 scope confirmation for one round trip** (`AGENTS.md` §4 rule 4). Anyone who trusts C3 fixes the root pair, verifies `/`, and ships `/custo-da-hora` broken. The correction also carries the mechanism and its preview-scoped consequence, neither of which C3 states. **This is an amendment to one section at run 1, not a re-run of G1 and not a bounce count against the spec gate** — no acceptance criterion changes — and that ruling is recorded here so a later gate does not re-count it. K3: `public/favicon.ico` and the two PWA icons are **not** the *"icon-library"* `spec.md` § Out of scope protects (that is `@tabler/icons-react`, the lever `0002` spent); they are 61% of the bytes on the path § Scope item 2 puts in scope. If `product-manager` rules otherwise, T2 lifts out unchanged into its own spec and no other task is affected. |
| G4 run 1 | tech-lead | **D1 lands in a new spec, not this one and not `0003`.** The 0.5452 CLS event is not the hero, is not on the LCP path, and **no criterion in `spec.md` measures CLS**; its remedy is by construction a layout change, which `spec.md` § Out of scope excludes beyond what the G4 attribution proves necessary — and the attribution proves this is not on that path. Folding it in would add a third independently-scored finding to a spec whose two existing ones already cannot carry each other, on a gate with a two-bounce ceiling. **Five things the new spec must measure are written into `plan.md` §5** so an intermittent defect does not become folklore: a rate with a denominator (≥20 loads per route per condition, not a sample of six); the **trigger condition** isolated by seeded vs empty storage — the lab reports CLS 0 in 12/12 unseeded while `design.md` measured 0.5933 seeded, and if the event is returning-user-only that is the sentence that explains why every gate missed it; the DOM on both sides of the shift; **1024**, which `design.md` **I4** records as the narrowest hero container in the whole range; and deployed vs local, because M8 shows those two artifacts do not behave alike. **T1's X6 produces the first two in the same pass and names no cause** (lesson **032**, and `design.md` was right not to name one). |
| G4 run 1 | tech-lead | **D2 does not re-open G2, and nothing about the analyst's authority is reduced.** `legal.md` §3 states the domain **as a test** and calls the HS1/HS2 table *"the test's output, never its definition"* — so HS3 and HS4 are **already in the domain as written**, and the enumeration needs no repair to bind. That is lesson **024** doing its job. What is genuinely open is the **quantity** clause, not the domain: LR5 reads the numeral's `textContent` and never the label, while HS4 changes the numeral from an hourly to a monthly figure at the same instant its name changes. That is the analyst's alone and it is carried to **G6**, where `labor-law-analyst` already verifies LR5 against the built artifact — zero extra round trip, G6 rejection power undiminished (`AGENTS.md` §4 rule 8), and no task in this plan touches a label, a period or the restore order in the meantime. **Binding in exchange: every LR5 probe this spec runs samples the eyebrow `<span>` on the same frame as the numeral and reports both series**, reusing `evidence/hero-label-swap.mjs`. A bounce converted into a sampling requirement. |
| G4 run 1 | tech-lead | **X2 is planned as T5 rather than left to G6, and the `design.md` clause conflict is resolved in advance.** `legal.md` §8.2 gives the finding to `web-standards-auditor`, which `AGENTS.md` §4 rule 5 forbids from editing source; an unassigned finding on a file this spec already opens becomes an unplanned mid-gate edit. The fix is `useId` + `id` on the existing eyebrow `<span>` + `aria-labelledby` on the existing `<p>` — **no element added**, because wrapping the numeral inside the `@container` would re-parent the container-query reference and change its size (`design.md` **I4**) — and never a copied `aria-label`, which would freeze `Saída Prevista` and announce a false statement about a manual-exit user's day. `design.md` § *What a G6 reviewer checks* item 1 (*"no file under `components/`"*) conflicts with `design.md` §D, which authorises this fix by name; same document, same owner, and the specific clause governs, so item 1 is read as *"no design **value** changes"*. **If `product-designer` reads it otherwise at G6, T5 is dropped, not defended**, and X2 returns to the auditor as carried debt (risk **R9**). |
| G4 run 1 | tech-lead | **`legal.md` F1 becomes a task rather than a G6 note: T6 asserts LR5.4 with a check seen red.** The `if (!isRestored) return;` guards at `use-work-calculator.ts:164`, `:186` and `use-salary-calculator.ts:137` are correct **by construction and asserted by no test**; 100% coverage on `hooks/**` executes those lines without protecting the invariant, and **they are exactly the lines a render-timing change moves.** T1's remedy, whatever it is, is a render-timing change, so the check goes in first. The assertion is written as a loop over a seeded map — for every seeded key, the **first** recorded `setItem` carries the seeded value, never the module default — so a key added later is covered without editing the test, and it is seen red by deleting the guard **in the isolated copy only** (`AGENTS.md` §4 rule 6). `qa-engineer` verifies at G6 as `legal.md` intends; the code is `frontend-dev`'s because a reviewer that edits stops being able to see. |
| G4 run 1 | tech-lead | **Three lessons confirmed, each with a cited application that changed this gate's output, and one new lesson written.** **010 → 2**: it is why §1 exists at all, and the attribution is what disqualified all three levers `spec.md` § Scope item 2 nominated. **032 → 1**: applied three times — C3's inheritance mechanism refuted against the framework source and the wire, the icon lever refuted as an AC1 lever by M3 *after* it looked like the answer, and § Scope item 2's JavaScript levers refuted by `totalTaskTime`. **029 → 3**: every build and every server in this gate and in T1/T3/T4/T6 runs in a hardlinked copy outside the repository on port 3457, never against the shared `.next`. **New lesson 033**: 010 asks a plan to attribute a metric to its phases, but the phase table a lab tool prints can itself be modelled rather than measured — `Render Delay 5,127 ms` here is a Lantern term and reading it as a phase would have sent this spec at the hero for a fourth time. **023 not confirmed** (it is the `labor-law-analyst`'s and already at 3; flagged for promotion at G10 instead). **024 not confirmed**: it is load-bearing in the D2 ruling, but the `labor-law-analyst` already claimed that application at G2 and a second bump would inflate the count. |
| G1 amendment (run 1) | product-manager | **C3 is retracted and replaced: Finding B is four files, not two plus inheritance.** `find app -name 'opengraph-image.tsx' -o -name 'twitter-image.tsx'` returns four paths; `app/custo-da-hora/{opengraph,twitter}-image.tsx` have existed since `16097c3`. C3's *conclusion* (four wrong emitted URLs) always held — its *mechanism* did not, and the difference is the whole bounce: an agent who believes in inheritance fixes `app/`'s pair, verifies `/`, and ships `/custo-da-hora` broken. § Scope item 6 now names all four modules and cites the `find` as its source. **My original C3 searched the emitted output and inferred the source structure from it** — which is the one question output cannot answer, because a convention emits identical tags whether one module or four produced them. Written up as **lesson 034**. |
| G1 amendment (run 1) | product-manager | **Finding B is preview-scoped, and the spec now says so rather than letting it keep urgency it does not have.** Per `plan.md` §2.3, read from the installed Next 16.3.5 and verified by an isolated build: a file-convention image route has `getSocialImageMetadataBaseFallback()` **override** the declared `metadataBase` with `VERCEL_BRANCH_URL` whenever `VERCEL_ENV === "preview"`, so `metadataBase` can never reach those four tags on a preview and **the defect does not fire on `workload.devrma.com` at all** — confirmed at this amendment by E11, which finds production emitting no `og:image`. § Problem now states the reach in one paragraph with both halves bound: a defect that never reaches production is **still worth fixing** (preview is where this squad reviews and where `AGENTS.md` §9 is checked) and is **worth less** than one that does. Two matching non-goals were added so neither half can be quietly dropped. **No acceptance criterion moved**: AC5 and AC6 were already written against H1, the preview host, which is why the correction is a framing change and not a re-scope. |
| G1 amendment (run 1) | product-manager | **K3 confirmed, and the exclusion that caused the ambiguity is repaired rather than merely interpreted.** `public/favicon.ico`, `public/icon-192x192.png` and `public/icon-512x512.png` are **in** § Scope item 2 and are **not** the *"icon-library"* § Out of scope protects — that exclusion protects the rendered icon **components** (`@tabler/icons-react`), the lever `0002` already spent at zero. T2 stays in `plan.md`; no task is lifted out. Per this agent's rule that an exclusion and the criterion verifying it can never disagree, the fix went into the **prose on both sides**: § Scope item 2 now names the three assets and the 61%-of-bytes measurement explicitly, and the exclusion now names what *"icon-library"* means and what it does not reach. Relying on a strained reading of "the work between first paint and interactive" to cover static raster assets would have left the next agent the same question. |
| G1 amendment (run 1) | product-manager | **Every remaining evidence row is now classified by how it is known, because three gates on this spec have each refuted a fact and all three were mine (C1, C2, C3).** Re-verified in this session against the live artifacts and this tree: **E1, E7, E8, E9, E10, E11, E12, E13** — including two details C3 had stated loosely, that each of the four URLs appears **twice** per response (head plus RSC flight payload) and that `useGrossHourlyRate` feeds `DaySummary`'s `grossHourlyRate` at `work-calculator.tsx:206`, not the hero. **Not re-run and marked as such: E2–E5** (stored Lighthouse reports; the evidence directory is not readable from this process, and `tech-lead` independently re-derived them at G4) and **E6, E14** (probe output). E3's `Render Delay 5,127 ms` is additionally flagged in the spec as a Lantern simulator term and not an observed phase, so no lever can be scoped on it as if a browser had spent that time (lesson **033**). **No row remains that rests on inference**; C3's was the last, and it is retracted. |
| G1 amendment (run 1) | product-manager | **Lesson 032 deliberately not confirmed, and no second lesson written.** 032 is about reproducing a *routed* finding's mechanism; what failed here was my own asserted mechanism, which is a different rule and is why **034** is new rather than a bump. The preview-scoping correction is not written as a second lesson either: at **26 / 30** a near-duplicate spends the cap, and the substance — state the environment condition under which a defect fires — is recorded here and in `spec.md` § Problem where the next agent reads it. |
| G5 run 1 (T1) | frontend-dev | **T1 hit `plan.md`'s hard stop #2 and stopped: the cause is not in application code.** X1 (3+3 Lighthouse runs) confirmed the held-paint delta is real (obsFCP 1382–2339 ms deployed vs. 94–165 ms local, three runs each). X2 mirrored the deployed document and all twelve first-party assets byte-for-byte to a scratch directory outside the repository and served them with `python3 -m http.server`: obsFCP 101–207 ms — early — which by `plan.md`'s own decision rule means **the cause is in delivery, not in the bytes**, so X3 (bisecting the stylesheet) was not run. X4's six named header/cache properties (HTTP version, content-encoding, cache-control, age, vary, x-vercel-cache) were compared and **none explains a slower deployed paint — three differ in the opposite direction** (the mirror is HTTP/1.0, uncompressed, uncached, and still paints early); distinct TCP origins is 1 in both cases. The property that does explain it, found by continuing the same measurement past the named list, is **round-trip time to the origin** (119–159 ms real vs. ≈2 ms on loopback, `curl -w time_starttransfer`) compounding across the **19 same-origin HTTP/1.1 requests** the page already makes (`plan.md` §1.1's `uses-http2` audit, re-read here, independently estimates ≈1.15 s of FCP/LCP savings from the same fact) — Chrome caps HTTP/1.1 to 6 concurrent connections per origin, so 19 requests queue into several serialized round trips. **Reproduced directly**, not inferred: `--throttling-method=devtools` (a real CDP-shaped trace, not a Lantern model) on the local production build, latency-only, gives a clean dose-response — 0 ms → obsFCP 96, 50 ms → 260, 100 ms → 1281, 150 ms → 2350 — landing in the deployed range once injected latency matches the measured real RTT. X5 (Chrome's own render-blocking bookkeeping, three fresh deploy runs plus a trace grep) shows nothing blocking after 422 ms, meaning the ~900–1900 ms gap between "critical resources finished" and "paint" is invisible to a parse-time/dependency-depth audit — consistent with a network-transport-layer cause rather than a script or style-processing one. **No file under `app/`, `components/`, `hooks/` or `lib/` determines the HTTP version the deployed origin speaks or the round-trip time to it**, so per `plan.md` §T1 this is recorded as the hard stop, not converted into a code change. **Flagged, not decided**: naming round-trip time as "the delivery property" goes one step past the six properties `plan.md`'s X4 row names by letter; the mechanism itself (one HTTP/1.1 origin, 19 requests) was already on record, but the reading is this agent's, and `tech-lead` should confirm it rather than inherit it silently. X6 ran regardless (lesson **032** — no cause named for D1): 20 loads × 2 routes × 2 storage conditions against the branch-alias deployment, one run hitting a transient 30 s navigation timeout and resumed to complete the full n=20 — **`/custo-da-hora` with seeded storage reproduces the ≥0.1 shift in 5/20 (25%); every other cell (both storage states on `/`, empty storage on `/custo-da-hora`) is 0/20**, naming seeded storage on `/custo-da-hora` as D1's trigger condition, with no cause claimed. Full numbers and every X6 event verbatim: `evidence/t1-attribution.md`, `evidence/t1-x6-cls-rate.log` (gitignored). `git status` shows no tracked file modified by this task. |
| T1 triage | tech-lead | **T1's transparency flag is confirmed on process, and the enumerated list it went past was my defect.** `plan.md` §T1's X4 row named six properties an experiment may compare (HTTP version, `content-encoding`, `cache-control`, `age`, `vary`, `x-vercel-cache`). All six were checked and none explains a slower deployed paint; three differ in the opposite direction. The developer measured round-trip time, reproduced the hold, and **flagged** that it had exceeded the plan rather than presenting the result as settled. That is the right order. **An enumerated property list is an upper bound on what an experiment can find, and the omission belongs to whoever wrote the list.** Every future enumeration in a `plan.md` carries the path — interception, proxy, DNS, egress — as a named row, plus an explicit instruction that a property outside the list is a finding to report, not a boundary to stop at. New lesson **037**. |
| T1 triage | tech-lead | **The delivery property is real and it is this machine's egress proxy, not the deployed origin.** Measured in this session before ruling: `openssl s_client -alpn h2,http/1.1` against the branch alias, `workload.devrma.com`, **`vercel.com`** and **`example.com`** returns `ALPN: server did not agree on a protocol` on all four, each re-signed by `CN = ns-swg.ca.madeiramadeira.goskope.com` — a Netskope TLS-intercepting gateway. **This machine cannot observe HTTP/2 on any origin in the world**, so "19 requests over HTTP/1.1 to one origin" is a property of the measurement path. Queried server-side from outside this network, SSL Labs reports `alpnProtocols: h2 http/1.1` on **all four** edge IPs of both hosts (216.198.79.1 / 64.29.17.1 / 216.198.79.195 / 64.29.17.195, grades A+/A). **The deployment already serves HTTP/2.** T1's latency dose-response is not invalidated, it is explained: strip ALPN and the 6-connection queue appears. **No remedy is authorised in this repository or on Vercel. T8+ is closed, never written.** The control that would have caught it a week earlier costs one command and was not in the plan. |
| T1 triage | tech-lead | **Every Lighthouse number this spec has on record was measured through that proxy, and none of it is discarded.** `plan.md` §1 M1–M9, T1's X1/X4/X5, `0006`'s twelve G9 reports and `0002`'s entire after-table stay valid **as differentials measured inside one session** — the proxy is a constant that cancels. Every **absolute** number among them is labelled *not field-representative* and **may not be compared to a Core Web Vitals threshold**. T7 is amended to make the ALPN + certificate-issuer block and the per-request protocol histogram mandatory in every future session (`plan.md` §7.5). This also retires the "the instrument moved 26 points on a frozen artifact" mystery as a *plausible* consequence of a variable egress path — **plausible, not proven, and it is not claimed as proven.** |
| T1 triage | tech-lead | **AC1 is bounced to `product-manager` — bounce 1 — and my own G4 endorsement of it is withdrawn.** AC1 scores `simLCP !== simTTI`. T1's counterfactual table contains a state in which the defect is definitionally absent — the page painting at **96 ms**, the best number this spec ever recorded — and that state **fails AC1**, while two other cause-absent states pass it. The identity tracks the shape of Lantern's dependency graph, not the held paint. `plan.md` §1.3 said *"AC1 stands and is the right criterion"*; that was wrong and it was mine, one gate after `product-manager` wrote it. **A criterion validated only against instances of the defect is half-validated, and the half nobody runs is the one that catches this.** New lesson **040**, tagged `all` because the criterion was authored at G1 and endorsed at G4 — the same defect, one gate apart. Recommendation recorded, decision not taken: `observedFirstContentfulPaint`. |
| T1 triage | tech-lead | **The absolute 2,500 ms target is not re-opened, not restated and not handed to another owner.** `spec.md` § *On the absolute 2,500 ms target* already ruled it out of the lab — on lesson **011**'s margin test — and parked it on **AC4**, a real-browser probe that already passes under 2,500 ms on the branch head. This triage supplies the reason that ruling was right and changes nothing about it. **Only AC1 is bounced.** Recorded explicitly because this spec exists to stop `0002`'s AC7 restatement from happening again, and a triage that quietly widened the bounce to "the whole performance group" would be that failure wearing different clothes. |
| T1 triage | tech-lead | **T2 ships, on bytes and file-type correctness, and half its G4 justification is withdrawn.** T2's G4 case leaned partly on the request/connection story; that half is gone, because under the real serving condition the 19 requests are multiplexed. What remains is true on every protocol, every path and for every user: **473,978 B — 61% of the page — is three 234.8 kB JPEGs saved under `.ico` and `.png`**, and `app/manifest.ts` declares `type: "image/png"` over JPEG bytes. It satisfies **AC2** (its only lever in this plan), **AC7** and the 2,500 ms goal, and **no part of AC1** — which nothing satisfies. **"The cause is the platform" is not a reason to drop a correctness defect that was never about the platform** (risk R13). Task text unchanged; one reporting line superseded — do not report T2 as moving the observed first paint. |
| T1 triage | tech-lead | **`reports/qa.md`: the developer is right, and the plan needs no fix.** `grep -n 'reports/qa\|qa\.md' plan.md spec.md` → **0 matches**. The plan never asked for it; T1's *Done when* names `evidence/t1-attribution.md` and a clean `git status` only, and the artifact stays `qa-engineer`'s at G6 (`AGENTS.md` §3). The instruction the developer most likely read is T4's and T6's *"paste the red-first output into `STATUS.md`"*, and **that one stands and is deliberate**: a guard's red-first output is triage evidence for `tech-lead`, not a QA report. Recorded so it is not re-litigated. |
| T1 triage | tech-lead | **X6 is handed to `0008` without a ruling on `0008`'s scope**, into that spec's `STATUS.md` § *Handed in from `0004` T1/X6*: 5/20 (25%) on `/custo-da-hora` with seeded storage, 0/20 in all three other cells, `n = 20` per cell, no cause named (lesson **032**). It merges into that spec's AC1 table as additional cells and **does not replace its denominator**, exactly as `0008`'s own G1 decisions log directed. Its limits are stated with it: dark only, deployment only, 390 only, and one cell run as two batches after a navigation timeout. |
| T1 triage | tech-lead | **A "finding" about the lesson ledger was a race with parallel agents, and is recorded as a correction rather than dropped.** `LESSONS.md` showed rows for `034`, `035` and `036` while `ls .agents/memory/lessons/` showed no files, which reads exactly like three rows one regeneration away from silent erasure — so `tech-lead` restored three stub files. It was wrong: sibling gates were mid-promotion, and all three archived with their **full bodies** inside the same window, superseding the stubs. **No content was lost and there is nothing to fix.** The rule the near-miss leaves: `.agents/memory/` is shared mutable state, and a directory listing taken while siblings are running is a snapshot of a race, not evidence. Re-read before concluding, exactly as for any other shared file. |
| T1 triage | tech-lead | **Lesson 010 promoted mid-cycle rather than at G10, because the ledger hit the 30/30 cap.** 010 reached 3 confirmations at this triage and is now a rule in `.agents/agents/tech-lead.md` § *Before the plan accepts a numeric performance criterion*. The cap blocks the **next** agent from writing, so holding the promotion for G10 would have spent someone else's slot. **At the cap, promote the lesson that is ready the moment it is ready** — the cap's pressure is on whoever is standing there, and that was me. |
| G6 run 1 triage | tech-lead | **F1 upheld, and the defect is mine, not the developer's.** I retired an instruction in `plan.md` §7.5 at bounce 1 and left both of its copies standing in `STATUS.md` — the document the next agent actually reads for task state. The amendment binds where it is written, and I wrote it in only one of the two places. **R12's stated signal fired exactly as written**, which is the risk row earning its keep, not a surprise. Fixed by restating the T7 row and discharging the blocker; the retired string is now absent from `STATUS.md` entirely |
| G6 run 1 triage | tech-lead | **No new lesson is written for F1, and the reason is not the cap — it is that the rule already exists and is already binding on me.** `AGENTS.md` §5 *How a rule's domain is defined*, last bullet: *"when an edit renames a figure, a norm or a term, grep the old name across the same boundary and check every sibling string on the same screen — a rename landing in one of two adjacent strings manufactures a contradiction the spec itself created."* Retiring an instruction in `plan.md` and leaving it standing in `STATUS.md` is that rule's shape applied to an instruction instead of a term, and I did not run the grep. **A 31st lesson restating a promoted rule is how a ledger stops being read.** The ledger stays at **30 / 30**; the next agent still promotes or retires before writing |
| G6 run 1 triage | tech-lead | **F4 is a second sighting of lesson 064, not a new lesson — confirmed (→1).** *"An empty sample and a sample with nothing in it read identically downstream"* is verbatim what the QA measured on `manifestIcons`. It is also the clause I owed T2's test spec at G4 and did not write: `plan.md` §T2 named the four cases and never named the count they had to measure over. T10 is the correction, and 064 is why it was findable |
| G6 run 1 triage | tech-lead | **F2 is out of scope for `0004` and is recorded as debt, with `product-manager` as owner and four trigger conditions** (`plan.md` §7.8 item 5). It is pre-existing, outside AC6's enumeration, and not scorable against a criterion `product-manager` did not write. **The guard's domain is the real defect and the ruling says so** — `__tests__/metadata-image-host.test.ts` bounds its case 1 by an enumerated convention where the class the rule governs is *every segment inheriting a file-convention image route*, which is `AGENTS.md` §5's forbidden shape. **The domain is deliberately not widened here:** `/_not-found` has no `page.tsx`, so no remedy exists inside this spec's file list, and a widened guard with no authorised remedy behind it ships a red gate. Guard and remedy widen in the same spec or neither does (**R17**) |
| G6 run 1 triage | tech-lead | **The F2 remedy is not a line, it is a build task, because its failure mode breaks a criterion that currently passes.** Declaring `openGraph.images`/`twitter.images` at `app/layout.tsx` would cover every segment against `metadataBase`, but it sits on the one field both route modules already set, and AC5's *exactly one of each per route* is green today only because of how Next merges those fields. Settling it needs a `VERCEL_ENV=preview` build counting four tags across three routes — not a line added at a G6 re-run on a machine whose ports are held by four concurrent specs. Written into `plan.md` §7.8 item 5 so the next spec starts from the analysis instead of the finding |
| G6 run 1 triage | tech-lead | **F5 upheld: the plan was wrong, not the build.** §T4's *"each of the three must be observed failing"* is unsatisfiable for clause 2 — `vercel.app` never existed in any source file, because the defect is Next's **runtime** override and a runtime override leaves no string on disk to revert. Clause 2 is restated as a **forward guard**; clauses 1 and 3 stay red-first. **No fourth red output is owed and none may be asked for.** The developer claimed none and was right to |
| G6 run 1 triage | tech-lead | **`pnpm e2e`'s routing to G9 is confirmed, not re-ordered.** The QA declared the omission rather than presuming a pass, and the reason still holds — ports held by other agents' servers, and a Playwright race that fails indistinguishably from a regression (lesson **029**). **AC7 is not scored as passed on `pnpm e2e` until that run exists**; recorded in § *Carried to later gates* so it cannot be read as green in passing |
| G6 run 1 triage | tech-lead | **Run 2 does not re-open what run 1 passed.** T2, T3, T4, T6 and T9 verified against §3 as amended by §7; four clean local gates; 609/609; per-area coverage with **no threshold lowered**; the three restore guards re-broken **individually** by the QA rather than on the developer's word; R15 discharged by md5. Recorded explicitly because a second QA run with no boundary on it costs the squad a full re-verification for one added assertion |
| T10 build | frontend-dev | **`pnpm check`'s repo-wide `vitest run`/`tsc --noEmit` are not scoped against `.claude/`, and that is a pre-existing gap in this tree's config, not something to fix under T10.** An unfiltered `pnpm check` this session showed 30 failing test files, every one of them inside `.claude/worktrees/agent-ae90673088dc067d0/` — an untracked (`git status --porcelain` → `?? .claude/worktrees/`), full nested copy of the repo another agent is editing concurrently (`AGENTS.md` §4 rule 6). `biome.json` already excludes `.claude`; `vitest.config.ts` and `tsconfig.json` do not, so the root-level test/typecheck walk into it. I did not edit either config — that is a decision for whoever owns the build tooling, and out of T10's file list (`__tests__/public-assets.test.ts` only). Scoped runs prove T10 clean on its own merits: `pnpm run lint` clean unscoped; `tsc --noEmit` clean unscoped; `vitest run --exclude "**/.claude/**"` (plus the existing `node_modules`/`tests/e2e` excludes) → `62 passed (62)` files, `620 passed (620)` tests. Full evidence in § *Red-first evidence* |
| G6 run 2 | qa-engineer | **The gate passes, and T10's control was re-derived rather than accepted.** A red with the fix present only proves the assertion is wired, so the emptied binding was also run with T10's two lines **deleted** — `Tests 4 passed (4)`, green on an empty collection, which is F4's defect reproduced — and a **1-icon** binding was run against both candidate assertions: the delivered `toHaveLength(2)` goes red (`…to have a length of 2 but got 1`), a `toBeGreaterThan(0)` floor stays green. That pair is what makes `plan.md` §7.9's "exact count, not a floor" load-bearing rather than stylistic, and it is the measurement a future gate should repeat before trusting any count guard |
| G6 run 2 | qa-engineer | **F1 is discharged on a classification of all 13 tree-wide occurrences, not on the two lines run 1 named — and the copy that mattered was invisible to run 1's grep.** The third stale copy said *"tech-lead still owns the T7 re-issue"* and contained none of the retired phrase; `grep -rn "re-issue"` found it, `grep -n "not scored"` never could. A retirement has to be swept over the **claim**, not over the phrase that stated it. Zero live instructions remain; every survivor is a retirement sentence, a past-tense record, **R12**'s stated signal, or a different subject (`pnpm e2e`) |
| G6 run 2 | qa-engineer | **`pnpm e2e` was run rather than deferred, and the first reading was discarded as my own instrument.** Ports were free this time (only 3917 held), so the suite ran in the isolated copy. The full run's 111 failures are not evidence about `0004`: 108 are in spec `0010`'s untracked `first-screen-reachability.spec.ts`, and the 3 in `google-tracking.spec.ts` came from reusing a `.next` built without the `NEXT_PUBLIC_ENABLE_ADS` flag `playwright.config.ts`'s `webServer.env` injects — the Turbopack flag-cache trap `AGENTS.md` §4 rule 6 names. With `rm -rf .next` and the canonical `pnpm build && pnpm start` path, the tracked sibling-unmodified specs are **46 passed, exit 0**. The full suite stays routed to G9 for attribution reasons, not port reasons |
| G6 run 2 | qa-engineer | **F6 is raised but does not block, and the reasoning is recorded so it is not read as leniency.** `vitest.config.ts` and `tsconfig.json` are modified by no task and no decision row — the same shape as F1, a decision that reached the artifact and not the record. It is minor because the change is narrowing, has in-repo precedent in `biome.json`, touches no threshold and no coverage `include` glob, and because the coverage table was re-derived **after** it, so no number in the report depends on trusting it. What is owed before G7 is one decisions-log row or a revert — the orphan directory it answers is already gone |
