# 0010 — disclosure reachability on mobile

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** in-progress

## PR #42 integration — 2026-11-20

**Current work:** fix the failing PR checks and finish the mobile reachability work already on the
branch. Complete T4′ against the inherited `0100` result ring and retain T5/T6's reachability and
occlusion requirements. Repair the LR4 browser measurement, isolate third-party traffic in the
affected tests, and shard the Playwright CI run. The isolated Chromium baseline at `262c9a0`
reported **36 failed, 2 skipped, 19 passed (34.1 s)**. The completed integration now passes all
local delivery evidence: 872 browser entries across three isolated shards with zero failures,
focused reachability `366/366`, coverage, build, Lighthouse, preview/Axe, lint and typecheck. The
PR integration is ready for hosted CI; 0010 remains in progress because AC15 is still incompatible
with the inherited Glass salary layout. [PR #42 integration record](reports/pr42-integration.md)

**G3 integration addendum (product-designer, run 3):** T4′ fits the inherited Glass result
with the centered ring and the native edit shortcuts. The first-screen predicate uses
the complete estimate paragraph beside the result. AC13 now counts all text-bearing
elements in that result area. LR4.2a measures the consent region and the top-layer
dialog separately. This integration includes F2c's decision area check and uses
equal-width choice tracks from `sm`. The same-document browser measurements are recorded in
`design.md` §18. **AC15 remains open.** The historical first-field ceiling is already
exceeded by Glass and the move adds stacked flow. Route the criterion to `tech-lead`
and `product-manager` with `0008` at the next mobile salary layout pass. Next for this
integration are build and review verification. [G3 addendum](design.md#18-pr-42-integration-with-the-glass-results)

`0015` owns suite-wide egress verification. `0011` still needs the controller's publishable
details. `0014` remains a separately staged removal with its own consent, residue, and notice
requirements. [Egress spec](../0015-test-suite-egress-to-third-party-hosts/spec.md)
[Privacy status](../0011-privacy-policy-and-lgpd-information-duty/STATUS.md)
[Analytics removal plan](../0014-remove-google-analytics/plan.md)

## Prior gate routing

**Next agents:** **`tech-lead`** — record branch **(a)** and route **F5**; then `frontend-dev` resumes
**`T5 → T6 → T4′ → T7 → T8`**. **`legal.md` **Addendum C** (G2 run 4, verdict `pass`) answers
`plan.md` §3E A5.5's **D-5** and closes it on both halves. **LR3.5's subject is the document the
reader's browser renders; where the product can ship more than one, the clause binds in all of them
and is verified in the NARROWEST** — ads-off today, stated generally so it survives the ad slot
moving above a disclosure. **This changes what LR3.5 MEANS: not at all** — the clause is word for
word as §8.1 published it; **only its *Measured at* bullet is restated**, adding the ad-slot
configuration as a **cell axis** beside route, viewport, theme, storage and consent. **D-5 is
SETTLED**: `frontend-dev`'s **T1d** landed mid-session and reads `copyA` ads-off **`maxScroll` 2199,
`ranges` `[]`, `found: false`** on both routes, against `copyB`'s `[2197.1, 2215]` `found: true` —
**branch (a), T3 IS F1's remedy**, `0003`'s footer rewrite alone does not discharge it,
`design.md` §17.3's causal claim is **confirmed with its counterfactual measured**, and **B6.2's
attribution caveat is DISCHARGED**. **F1 stays discharged; A1.7 untouched; T5 stays unblocked;
nothing is blocked by this addendum.** **One finding routed, not a rejection
ground: **F5** (`serious`, `tech-lead`) — the LR3.5 e2e guard has never evaluated the shipped
document, and on the measured `copyA` cell the harness's environment returns the **opposite causal
attribution**. **A second was drafted as `F6` and WITHDRAWN at this gate** — `adsbygoogle.js` loading
with no consent check is already `0011` **F1**, with `0014` **L4** as its open legal question; it was
checked before a fourth ledger entry was opened on a question three specs already carry, and what
survives is a **precondition on the analyst's own `0014` G2**: L4 may not be ruled until LGPD art. 7º
is read from a primary source (planalto.gov.br returned `ECONNRESET` ×4 this session). **Q8** (the Vercel value of `NEXT_PUBLIC_ENABLE_ADS`, unreadable
from this repo because `.env` is gitignored) to the human; **Q9 withdrawn** for the same reason F6 was. **AC5's exemption list stays
EMPTY; no string is mandated.** Previously: **`frontend-dev`, on `T1c` (`plan.md` §3C Amendment 3)** — the third bounce on the
LR3.5 mechanism is **RULED** (2026-09-19, `tech-lead`, under the human's recorded approval to
continue; see the decisions log and `plan.md` §3C). The developer executes T1c as written and makes
no architectural choice: A3.1 fixes the predicate, A3.2 calibrates it against `legal.md` §8.1's own
worked table **before any browser runs**, A3.3 re-takes the baseline against a head with **this
spec's own T3 removed**, and A3.4 is the ceiling — anything outside verdicts (a)–(d) stops the
pipeline at `tech-lead` and goes back to the human. **`product-designer`'s scoped G3 re-run on M-R only is DELIVERED** — `design.md` **§17**, run 2, 2026-09-19: **Q-A…Q-D all four answered, `pass`**, and the A1.2 conditional route to `labor-law-analyst` (**L5**) **does not fire**. **`legal.md` **Addendum B** (G2 run 3, verdict `pass`) settles both questions the T1c ruling routed:
**F1 is DISCHARGED as a breach** (16/16 cells, window `[2197.1, 2215]`, 17,9 px, `maxScroll`-anchored;
instrument re-derived against §8.1 and seen red on the known-red row) **with D-3 and the attribution
open — T3 may not be recorded as F1's remedy until A3.3's `copyA` runs** — and **the L5 route did not
fire**: DS1 P2's election is confirmed clause by clause, no string is mandated, AC5's exemption list
stays EMPTY. **T4′ is WRITTEN** — `plan.md` **§3D Amendment 4** (`tech-lead`, 2026-09-19), from §17.15: the relocated surface is the **atom** `components/atoms/estimate-notice.tsx`, `table-citation.tsx` is struck, **T6 is a geometric precondition of T4′** and its guard is **the comparison, never the literal 6,4**. §17.17's open number is **RULED in A4.3**, against the A3.3 run that has since been taken: the run's `copyA` window `[2213.1, 2331]` is **green at `maxScroll` 2331 and empty at 2199**, so the 132 px **chooses the branch** — (c) as read, **(a)** if the gap comes off `copyA` the way it comes off `copyB`. A3.3's pre-declared expectation of (c) is **STRUCK**; **neither branch is expected.** H1 (viewport) is **refuted by the run's own table**; H2 names `ad-manager.tsx` — `pb-8` 32 + `min-h-25` 100 = **132**, collapsing to 0 on a build-time env guard — as arithmetic, not a finding. **T1c takes one probe, not a re-run:** `scrollHeight`/`viewportHeight`/`maxScroll` unfused at **two settle points**, the tail and its blocks, both copies, in the named reconciliation cell, with `copyA`'s settled window **measured and never derived by subtraction**. **A third reading of this quantity is a fifth mechanism and goes to the human under A3.4.** Order once unblocked: **T1 → T1a → T1b → T2 → T3 → T5 → T6
→ T4′ → T7 → T8** (§3A A1.3, §3B). **`plan.md` T4 is SUPERSEDED
and must not be executed.** Originally: `frontend-dev` (G5), task by task, **T1 → T8 in order**. G4 is **closed** —
`tech-lead` on 2026-09-19 (`plan.md`, run 1). **T3 (M-B) before T5 (M-O) is binding**
(`legal.md` A1.7): if T3 is dropped or deferred, T5 is dropped with it. G3 is **closed** — `product-designer` on 2026-09-19 (`design.md`,
run 1 of that gate), `content-writer` on 2026-09-16 as an **explicit
no-op** (`copy.md`: no string written, changed, shortened or added; AC5's exemption list confirmed
empty). The two ran **in parallel**, as G3 is defined. G2 passed on
2026-09-16 (`legal.md`, run 1 of that gate). Both were bound by `legal.md` §4 (the consent floor and
§4.5's arithmetic), §5 (L4's width floors), §6 (**no split, no new string — AC5's exemption list from
G2 is empty**), §8 (**LR3.5**, binding before anything is drawn) and §11 (**AC13 as corrected**), and
`design.md` answers each by name. **`plan.md` is bound by the same five sections, by Addendum A
(A1.6 LR4.2a, A2.2 LC1, A2.4's prohibition, A5's W9–W13), and by `design.md` §15's three system
changes — S1, S2 and S3, which the human APPROVED on 2026-09-19 (see the decisions log) and which
`plan.md` T7 writes into `DESIGN.md`.**
**Bounces:** **1** — G3 to `product-designer`, scoped to **M-R only**, 2026-09-19 (`plan.md` §3A A1.2). **Answered the same day, `design.md` §17; one left before the ceiling.**

**G2 run 3, 2026-09-19 — an ADDENDUM to a closed gate, not a re-run and not a bounce.**
`labor-law-analyst` answered the two questions `tech-lead` routed at the T1c ruling
(`legal.md` **Addendum B**, verdict **`pass`**):

- **B1/B6.2 — F1 IS DISCHARGED as a breach, on its own subject, on this head — and what discharged
  it is NOT attributed.** `design.md` **§17** landed mid-run and is the fourth body of evidence, the
  first that can discharge an obligation: `F-1` has a non-empty, **`maxScroll`-anchored** clearing
  window in **16 of 16 cells**, tightest **`[2197.1, 2215]`, width 17,9 px**. **The instrument was
  trusted before its greens were read**: §17.17's closed form
  `s ∈ [docTop + h − navTop, min(docTop − headerBottom, maxScroll)]` was re-derived by
  `labor-law-analyst` against `legal.md` §8.1's own rows and **prints the known-red DS1 P4 row red
  (−14,2)**, DS1 P3 at 28,6 and DS2 to 0,1 px — that is the state in which the check prints something
  else, and it is why §17's greens are evidence where the e2e guard's three greens were not.
  **Two clauses stay OPEN: D-3** — DS2 and DS7 art. 59 / art. 71 on `/` were **not** re-swept (owed
  at T1c/G6, **W14**) — **and D-5, the attribution.** Nobody has measured a head with **T3
  reverted**, so §17.3's *"because M-B raised the reserve 64 → 96"* is a **causal claim with no
  counterfactual**: **T3 may not be recorded as F1's remedy until A3.3's `copyA` runs.** `legal.md`
  **A1.7 is undisturbed** — M-B precedes M-O on **LR4.2a's** attainability axis, not on F1's.
  **The discharge is robust to §17.17's open `maxScroll` number**: 2215 → width 17,9; 2347 → width
  149,9; **both non-empty and both anchored**, so F1's verdict does not turn on it (verdict (a)/(c)
  still does — `tech-lead` reconciles it before the run). **New trigger replacing F1's §12
  disposition:** the remedy's whole margin is **17,9 px**, so F1 re-opens automatically if the
  footer's bottom reserve drops below **96**, if the last paragraph grows by **≥ 17,9 px**, if the
  route nav's `766..828` band grows, or if any flow element is appended below the footer — owner: the
  first spec that opens the footer or the route nav.
- **Superseded, kept visible: B1's original answer was *not discharged, unmeasured on this head*.**
  Every green offered so far comes from an instrument with a 0/3 record today, a superseded tree, or
  `plan.md` A3.3's own projection, which A3.3 forbids reporting as a finding. **F1's subject is
  re-identified inline** (B1.2): the 34,8 px / one-`<a>` body is retained as the finding's **origin**,
  not its current state; the subject is *the footer's citation paragraph in whatever body the measured
  head carries*, today `F-1`. **Discharge is defined as five clauses D-1…D-5** (instrument calibrated
  incl. control **C1**; surface **count** asserted per cell before any predicate; the **whole**
  seven/four-row table re-published, not the P4 row; **every** surface in the cell green, because
  moving the failing surface and handing the empty interval to DS1 P3 is a rename and a fresh breach —
  lesson **054**; and `copyA`/`copyB` both read, because *"T3 fixed it"* and *"`0003` had already
  fixed it"* are different findings). **No new instrument is requested and nothing is added to the
  A3.3 run** — B4 and B5 already collect all of it. Ruled from that output in an **Addendum C** and
  nowhere else. **`legal.md` A1.7 untouched: T3 before T5, and T5 stays blocked.**
- **LR3.5a added** — the attainability axis `plan.md` A3.0/B5 routed here. Three tiers
  (endpoint-anchored → attainable at any non-zero width; free interval → **≥ 1 CSS px** of `scrollY`;
  empty → the breach LR3.5 already names), calibrated on §8.1's own narrowest passing interval
  (**28,6 px, endpoint-anchored**). **PROVISIONAL — it has no failing subject, so it decides no
  verdict alone**; the substance stays with LR3.5's non-emptiness. It changes **zero** verdicts in
  §8.1's published table.
- **B2/B6.3 — the L5 route DID NOT FIRE, and L5's ruling stands; only its PREMISE dies.**
  `design.md` §17.3 did exactly what B2.2 requires — re-elected the witness from §6's own table
  rather than concluding R unsatisfiable from `F-1` alone — and **DS1 P2 is confirmed clause by
  clause by `labor-law-analyst`** on §17's published numbers: LR1 `w` **358** ≥ 320; LR2a **0** ≤ 32;
  LR2b **56,67 cpl** ≥ 40 **and non-regression satisfied by identity** (footer and column are the
  same 358 px at 390); LR3 present on load in all five states; LR3.5 **20/20** at 390, Tier 1;
  LR6.1 — it qualifies the **number**, which is the right axis to choose it on; **one rendered
  instance per page**. **No legal objection to the election.** B2.2's routed observation is
  **closed**: `F-1` staying below the fold is lawful, because LR3.5 is satisfied by any reachable
  rest position and `F-1`'s is non-empty in 16/16. **B2.3's five prohibitions were NOT reached and
  none was breached** — retained as the standing rule for any later spec on this branch.
- **B6.4 — new finding, `minor`, routed to `qa-engineer` at G6 (W15), blocks nothing.**
  `evidence/g3r2-p2.mjs`'s 1440 cell reports the relocated DS1 P2's clearing set as ***"310 of 400
  sampled positions"*** — a **sample count, not LR3.5a's quantity**, which is interval width in CSS
  px from the closed form §17.17 itself publishes (lesson **065**; the defect `plan.md` A3.1 deleted
  the 60-sample loop over). It is the rule set's **first Tier-2 subject**, and the cell passes under
  either unit, so **no verdict in §17 changes**. **LR3.5a stays PROVISIONAL** — §17.17 confirms no
  window narrower than **17,9 px**, so it still has no *failing* subject.
- **Superseded, kept visible: B2's original answer assumed the condition would fire.** The 34,8 px witness is retired; **R never named a
  disclosure**, so the witness is re-elected by measurement from the other whole surfaces in the
  domain (DS1 P1, P2, P3, and on `/` DS2 and DS7×2), each tested against six clauses in its
  destination. If **none** qualifies, **R clause 1 is a product-positioning question with three open
  exits — γ shrink the fixed chrome, β amend AC1 down, α a new string via G1 amendment — and NOT a
  legal breach** (§7: clause 1 is the product's bar). **Five things stay forbidden in every branch:**
  shortening any surface (there is **no space argument** against `F-1` at any width — LR2b has no
  upper bound, and 56,86 cpl at 390 sits inside §5.1's `cap(358) ∈ [57.6, 65.7)`); splitting `F-1`
  other than as an independently-in-domain **second surface** via G1 amendment; moving any surface
  into the **354–820** covered band; dropping a disclosure to make room; and relocating `F-1` without
  re-measuring the footer's **new last element**. **AC5's exemption list stays EMPTY and this gate
  still mandates no string.**
- **Added: W14–W17** (G6/G9) and **Q6, Q7** for the human. **No table, no bracket, no rate, no
  rounding rule, no order of operations** — §13 and §14 stay empty.

**G2 run 2, 2026-09-19 — an ADDENDUM to a closed gate, not a re-run and not a bounce.**
`labor-law-analyst` settled the two rulings `product-designer` raised when it closed G3
(`legal.md` **Addendum A**, verdict **`pass`**):

- **A1 — the existential reading is CONFIRMED.** LR4.2's *"fully within the viewport"* is
  **existential over scroll positions**, the quantifier LR3.5 already argued for in writing; the
  universal reading is the `AGENTS.md` §5 inversion — it is satisfiable only by breaching another
  binding principle. Restated as **LR4.2a**, which adds the three axes a bare quantifier leaves
  open: **attainability**, **simultaneity** (`(∃x.A) ∧ (∃x.B)` is not `∃x.(A ∧ B)`) and
  **co-visibility of the binary choice**. **`design.md`'s 32-cell measurement STANDS and is not
  re-taken.** No movement is excluded — **but M-B is promoted from a remedy to a precondition of
  M-O**, and if M-B is dropped, M-O is dropped with it.
- **A2 — F2a is settled as LC1**, a precondition of this spec. The compliant value is the
  **refusing** one, stated over **seven axes** rather than as a default: rendered state, recorded
  value, script count, transmission, cookie residue, the art. 9º § 1º null-record state, and
  **LC1.7 — the revised-decision state, which a one-word fix breaks.** In this tree it resolves to
  `useState(false)` at `components/organisms/cookie-consent.tsx:15` with `:17-26` unchanged.
- **Three corrections to `legal.md`'s own run-1 rulings, made inline** (**C1**, **C2**, **C3**) and
  one instrument correction (**C4**). C3 opens a new finding, **F2c**.

**`plan.md` is now bound by `legal.md` §4, §5, §6, §8, §11 AND by Addendum A: A1.6 (LR4.2a),
A2.2 (LC1), A2.4's prohibition on any immediate-revocation string, and A5's W9–W13.**

**Run 2, 2026-09-16 — amendment, not a bounce.** The human ruled the open question run 1 recorded
(the consent banner covering the answer) **into** this spec rather than into a separate one. The
spec now carries **two findings**: **R**, where a disclosure renders, and **O**, what occludes the
answer. They are scored on separate criteria and **a partial pass is a rejection**. Every number the
amendment depends on was re-measured at run 2 rather than carried forward.

**Opened by human decision, 2026-09-16**, on `.specs/0008-…/legal.md` §8 **Q1** — measured three
times across three specs, never decided, explicitly not a rejection and explicitly a
product-positioning question. The premise (at least one disclosure must be reachable on the first
screen at 390) is settled and not reopened here. What G1 decided is the operational meaning of
"reachable" and, from run 2, of "unoccluded" (`spec.md` § *What "reachable" and "unoccluded" mean
here — R and O*), what they may cost, and what may not be traded for them.

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| spec | product-manager | **closed** | 2 | `spec.md` |
| law | labor-law-analyst | **closed — `pass`** | **4** | `legal.md` (run 2 = **Addendum A**, run 3 = **Addendum B**, run 4 = **Addendum C** — all three addenda to a closed gate) |
| design | product-designer | **closed — `pass`** | **2** | `design.md` (run 2 = **§17**, a scoped re-run on **M-R only**; §§1–16 stand except where §17 supersedes them) |
| copy | content-writer | **closed — no-op** | 1 | `copy.md` |
| plan | tech-lead | **closed — `pass`** | 1 | `plan.md` |
| build | frontend-dev | **T1d done, measured, not decided — 2026-09-19.** `copyA` ads-off, the reconciliation cell: `found: false` on both routes (`/` `maxScroll 2199`, `/custo-da-hora` `maxScroll 1632`), sanity control reproduces `copyB`'s `3059`/`2215` exactly. Awaiting `tech-lead`'s branch credit and `labor-law-analyst`'s D-5 ruling before resuming **T5 → T6 → T4′ → T7 → T8** | 1 | tasks below |
| qa | qa-engineer | pending | 0 | `reports/qa.md` |
| audit | web-standards-auditor | pending | 0 | `reports/audit.md` |
| release | release-manager | pending | 0 | `reports/release.md` |
| preview | web-standards-auditor | pending | 0 | `reports/audit-preview.md` |

## Tasks

`plan.md` §3. Every task leaves `pnpm check` green; `pnpm e2e` is **deliberately red from T1 until
T6 closes**, which is what "seen red first" costs and why nothing is pushed before G8.

| Id | Title | Depends on | State |
|---|---|---|---|
**Order changed by `plan.md` §3A Amendment 1 (2026-09-19), `tech-lead`, ruling the `0003` collision.
New binding order: T1 → T1a → T2 → T3 → T5 → T6 → T4′ → T7 → T8.**
**Amended by §3E Amendment 5 (2026-09-19): `T1d` is inserted and the developer resumes with it —
binding order from here is `T1d` → `T5` → `T6` → `T4′` → `T7` → `T8`.** `legal.md` **A1.7 is preserved**
— **T3 (M-B) still lands before T5 (M-O)**, and if T3 is dropped T5 is dropped with it.

| Id | Title | Depends on | State |
|---|---|---|---|
| **T1** | Write the reachability guards and see them red, before any source file is edited | none | **written; its red run is re-taken under T1a/T1b/A2.3** |
| **T1a** | Re-point T1's two stale bindings at values, and clear T1's own lint failure | none — **runs first** | **steps 1–6 done** (`plan.md` A2.5); its own red-baseline clause moved to T1b per Amendment 2 |
| **T1b** | Make LR3.5 measure the surface, not the link inside it (`plan.md` §3B) | T1a steps 1–6 | **DONE** — §3E A5.1 credits the instrument verdict on its own (the guard discriminates; C1 toggles one operand to turn `legal.md` §8.1's red row green). Its *Done when*'s dependence on a fused (a)/(b)/(c) verdict is superseded: the subject verdict is T1d's and is not this task's to satisfy |
| **T1c** | Compute LR3.5's clearing set in closed form, calibrate it against `legal.md`'s worked table, and re-take the baseline with this spec's own remedy removed (`plan.md` §3C) | T1b's code, which is **not reverted** | **A3.1/A3.2 done** (`clearingScrollRanges` shipped, 11/11 calibration green incl. C1–C4, `pnpm check` clean tree-wide). **A3.3 run taken and D-3/D-5 discharged** (both copies, both routes, all seven surfaces including the full-journey DS2/DS7×2, zero `guard defect:`, every surface `found: true`; `copyA` alone shows F1 discharged with T3's two hunks reverted, answering D-5). **A4.3's reconciliation cell run and the 132 px fully attributed**: `viewportHeight` 844 in both readings (H1 refuted); `scrollHeight` is the whole gap (H2), and it is exactly `AdManager`'s footer ad slot (`min-h-25` 100 + wrapper `pb-8` 32 = 132.0 px), gated on `NEXT_PUBLIC_ENABLE_ADS`, which `playwright.config.ts:66`'s `webServer.env` hardcodes `"true"` for every real run of this suite. A fresh build with that var unset reproduces `design.md` §17.17's `2215`/`3059` to the integer on `/`. **Per A4.3's own rule this is still the stop condition — the reconciliation cell read `2347`, not `2215` — so the branch is reported attributed but NOT self-credited.** Full numbers in `reports/build.md`; routed to `tech-lead`. **RULED 2026-09-19 (§3E Amendment 5): T1c is DONE.** The escalation is discharged (2347 is the second reading, and 2215 is now reproducible on demand, so both follow from one named operand); the instrument verdict is credited alone; the subject verdict is **neither (a) nor (c)** because the only `copyA` cell was measured in the harness's ads-on environment and the product ships ads **off**. Refusing to self-credit was correct |
| **T2** | LC1: the consent switch opens refusing, and the stored record still wins | none | **done** |
| **T3** | M-B and D1: the bottom reserve clears the tab bar, and the phone gets its top step | none | **code done, `pnpm check` green.** A2.4's e2e verification reads green off `copyB` in **both** ad environments. **Whether T3 is F1's *remedy* is a separate question, open with `labor-law-analyst` as D-5** (§3E A5.5) — it gates no source file and T3 stands as delivered |
| **T1d** | Measure the one cell that decides the attribution: `copyA`, ads off (`plan.md` §3E) | T1c | **DONE — measured, not decided.** Fresh `copyA` build, `NEXT_PUBLIC_ENABLE_ADS` unset, reconciliation cell, early settle point (558/656 ms): `/` — `scrollHeight` 3043, `maxScroll` **2199**, `containmentOnly [2135.1, 2199]`, `ranges []`, **`found: false`**; `/custo-da-hora` — `maxScroll` 1632, `ranges []`, **`found: false`**. `2199` was read from the DOM, never derived from `2331 − 132` (a probe bug that would have forced that derivation was caught and fixed before any number was taken — see `reports/build.md`). Sanity control on `copyB`'s existing ads-off build reproduces `3059`/`2215`/`found: true`, integer-exact. Full tables in `reports/build.md`. **Not credited as (a) or (c) here** — handed to `tech-lead`/`labor-law-analyst` |
| **T5** | M-O: the consent surface leaves the overlay, and the privacy shield becomes unconditional | **T3 (binding)**, then T1d | **UNBLOCKED** (§3E A5.6). Expected values unchanged by the ads pin — no absolute `scrollHeight`/`maxScroll` literal, and its subjects sit above the ad slot. Every paste gains the ads-state field |
| **T6** | M-D: the five remaining density steps, every one `sm:`-restored | T5 | pending. **`Done when` amended by §3D A4.2** — T6 is a **geometric precondition of T4′** (without M-D the budget is 34.6 px and the 52.2 px surface fails by 17.6), and **AC13's line count is an expected, named red between T6 and T4′** (8 and 9 against 9 and 10) while `linesOccluded == 0` must be green |
| **T4′** | M-R, re-planned on a re-measurement of the footer as `0003` leaves it. **Its subject is `DS1 P2`, not `DS1 P4`** (`design.md` §17.3) | T6, and `0003` closed | **WRITTEN and ready** — `plan.md` **§3D Amendment 4**, `tech-lead`, 2026-09-19, from `design.md` §17.15. Twelve files, every path, prop, class, literal and expected number stated; its red baseline is T4′ **with T6's `hero-panel.tsx` hunks reverted in the copy** (slack ≈ −17.6), never the locator-not-found red. **`plan.md` T4 stays SUPERSEDED and must not be executed**, and `components/molecules/table-citation.tsx` is **not created** |
| **T7** | S1, S2 and S3 written into `DESIGN.md` | T4′ | pending |
| **T8** | Re-measure everything with one instrument, and write the deltas down | T7 | pending. **AMENDED by §3E A5.6** — the `g1-*` rows run **ads off** (matching their own before-numbers in `evidence/g1-*.txt`), the `pnpm exec playwright test` row runs **ads on** (`playwright.config.ts:66`), each row is labelled with `NEXT_PUBLIC_ENABLE_ADS`, and the two are **not** reconciled against each other. **AC7 and AC1 are the criteria that move with the ads state** |

## L1–L10, resolved at G2

Every one by name, with the section of `legal.md` that settles it.

| # | Verdict |
|---|---|
| **L1** | **CA, CB and CC are all three in the LR domain** — CA on clause (a), CB on (a) and (b), CC on the **new clause (d) Applicability** that `0006` §2.1 lacked (lesson **045**'s pattern on a string). **The set of three is under-counted**: reading `lib/payroll.ts`, the module `regime-field.tsx` renders from, returns two more — **CD** and **CE**, the `WORK_REGIME_INFO` `impact` strings at `regime-field.tsx:78`, which state 7,5%/14%/22%, the RGPS ceiling and the table year, and which no `legal.md` had ever classified. **Five, not three.** `legal.md` §3 |
| **L2** | **No.** All five breach **LR3-as-corrected** (bullets 1 and 3) and **LR6.1** — measured, both themes: each is `ABSENT FROM DOM` on load while the claim it qualifies renders (`Extra 50%`, `Extra 100%`, the regime deduction). LR6.1's left operand is not merely > 0, it is **undefined**. **Not fixable in this spec** — § Non-goals forbids a reveal control and any new string, and unconditional rendering spends `0008`'s flow budget (AC15). Routed as **F4**. `legal.md` §3.4 |
| **L3** | **No norm fixes placement, height, width, display duration or z-order** — all fourteen operative units of LGPD arts. 5º XII, 6º IV/VI, 8º and 9º read one at a time. The floor is content-and-operability, and it resolves to **`getBoundingClientRect().height` ≥ 336 CSS px, border box, at 390**, built in a browser and measured (**LR4.4**, five clauses). **The floor is above what ships today, not below it.** `legal.md` §4 |
| **L4** | Body text `width ≥ 320` CSS px (LR1, page column `A ≈ 358`), chrome `≤ 32` px (LR2a). At 12px, `k ∈ (5.452, 6.217]` re-derived from this gate's own measurements: **< 218.1 px makes 40 cpl impossible; ≥ 248.7 px makes it attainable.** The page content column (358) qualifies; the card interior (308), the field interior (258) and the regime card (254) do **not**. **CC cannot reach 40 cpl at any width this app offers at 390.** `legal.md` §5 |
| **L5** | **Permitted, conditioned, and not needed — so not authorised.** A fragment discharges nothing unless it is independently in the domain. **A 34.8 px whole surface exists (DS1 P4)**, so R is satisfiable with zero new copy. **AC5's exemption list from G2 is EMPTY.** `legal.md` §6 |
| **L6** | **Split.** R clause 2 (non-occlusion) becomes **LR3.5** and is a G2 rejection if regressed. R clauses 1 (the fold) and 3 stay the **product's bar** — a `tech-lead` bounce, per `0008` §5.2 and §5.4. `legal.md` §7 |
| **L7** | **Yes** — the law forbids it too, via **LR3.5**, and the proof is live: **DS1 P4 can never come to rest clear of the fixed route nav**, 4/4 cells. `legal.md` §8.2, finding **F1** |
| **L8** | Discharged by AC4's `diff` + the G6 traceability audit, not by re-verifying `lib/`. **The verification found one number that fails today**: `Extra 100%` traces to no norm and no table. Routed as **F4**. `legal.md` §9 |
| **L9** | **Neither.** LR6.1 keeps its frame-index quantity and gets **no** spatial clause; the hole is in **LR3**, and LR3.5 fills it. Covering a **claim** is a `PRODUCT.md` §1/§8 defect and **not** a legal one today — **zero disclosure surfaces are occluded on the first screen, because none is there.** It becomes legal the instant R's remedy puts one into the covered band, which is why LR3.5 exists before G3 draws. `legal.md` §8.3 |
| **L10** | **An `.sr-only` string is never a disclosure** (LR3 bullet 4), and **occlusion is meaningless for it** — paint order does not reach the accessibility tree. Finding O's harm is **modality-specific**: the sighted user loses *17:48*, the screen-reader user does not. **Count them anyway**, for a stronger reason than the one given: `AGENTS.md` §5 forbids narrowing a set by an appearance attribute. Report `sighted + assistive`. `legal.md` §10 |

## Blockers

- **RESOLVED, 2026-09-19 — `tech-lead`, `plan.md` §3E Amendment 5. The A4.3 stop condition is
  discharged, the branch is split, and the build gate is unblocked.** Recorded above the report that
  raised it, which is kept below unedited.

  - **The escalation is closed on the merits, not only on the owner's delegation.** A3.4's
    fifth-mechanism clause is for a **third, unexplained** value of `maxScroll`. **2347 is the second
    reading** — four page loads, three scripts, all at ~200–250 ms — and the **first** reading is now
    reproducible on demand: a build with `NEXT_PUBLIC_ENABLE_ADS` unset returns `scrollHeight` **3059**
    / `maxScroll` **2215** on `/`, integer-exact against `design.md` §17.17. **Both values now follow
    from one named operand, measured in both directions.** A4.3's stop condition existed because the
    delta was unexplained; it is not. **A3.4 is not invoked.**
  - **The instrument verdict is credited alone: the guard discriminates. T1a, T1b and T1c are DONE.**
    The proof needs no browser — eleven A3.2 cases reproduce `legal.md` §8.1's worked table **including
    the red row**, and C1 toggles exactly one operand to turn it green. **The `scrollY = 0` diagnostic
    at the end of `reports/build.md` is CLOSED, not deferred**: it described the pre-T1c sweep.
    `clearingScrollRanges`'s `from = max(0, docTop + height − viewportHeight)` / `to = min(maxScroll,
    docTop)` **is** the containment conjunct, it is what C1 toggles, and it is why DS1 P4 can be empty.
  - **The subject verdict is credited as NEITHER (a) NOR (c), and the reason is new.** The only `copyA`
    cell in existence was measured with **`NEXT_PUBLIC_ENABLE_ADS=true`** — the **harness's**
    environment, not the product's. `.env` and `.env.example` ship **`false`**, and `ci.yml:140,147`
    turns ads off for Lighthouse with the committed comment *"the e2e build above runs with ads on so
    the suite can assert their behaviour"*. Ads-on → `copyA` `maxScroll` **2331**, window
    `[2213.1, 2331]`, green → shape of **(c)**. Ads-off → the deciding cell **has never been measured**,
    and `2331 − 132 = 2199` is arithmetic that **A4.3 rule 4 still forbids** now that the operand has a
    name. Attributing a delta says *which operand moves the number*; it does not say what the number
    reads. **T1d takes the cell.** This is not a fifth mechanism and not a fourth guess at the guard —
    it is one missing cell of an already-attributed operand, by a procedure the developer has already
    proven to the integer.
  - **The larger finding, recorded as the ceiling on this spec's geometry: the LR3.5 e2e guard runs
    against a strictly more forgiving page than the product's default build ships.** The 132 px sit
    **below** every disclosure, so ads-on **raises `maxScroll` and widens every clearing window**.
    Nothing is red today — `copyB` clears DS1 P4 ads-off too (`[2197.1, 2215]`), so `legal.md`
    Addendum B's **F1 discharged** ruling is robust in **both** environments and is untouched — but the
    instrument is measuring a document the default build does not produce. **Binding from here: the
    product default (ads off) is the binding state for any claim about what a user can reach, and every
    geometric number pasted anywhere in this spec carries `NEXT_PUBLIC_ENABLE_ADS` as the build saw
    it.** `playwright.config.ts` is outside § Scope and is **not** edited; routed with an owner and a
    trigger in `plan.md` §4.
  - **D-5 goes to `labor-law-analyst`, and `tech-lead` records no attribution.** The question is theirs:
    *which document is LR3.5's subject — the page the default build ships, or the page this
    repository's committed test config always measures?* The attribution flips on it. Copied to
    `product-designer` (§17 is one of the two readings). **D-3 is discharged.**
  - **The ad creative's 100 → 390 px growth is TWO findings with TWO owners, and is not folded in.**
    (i) **Measurement determinism — `tech-lead`, binding on this spec now**: every geometric read is
    taken at the **early settle point, before the creative resolves**, elapsed ms printed. Nothing
    already measured is invalidated (the shipped assertions read at ~250 ms). Signal it went wrong: a
    `scrollHeight` ~290 px above the same cell's early reading. (ii) **A test suite reaching
    `pagead2.googlesyndication.com` — `product-manager`, against spec `0014`, trigger immediate.** It
    is a `PRODUCT.md` §8 and privacy question, not architecture, and CI does it too (`ci.yml:82-85`).
  - **T5 is unblocked and its expected values are unchanged.** The attribution gates no source file:
    T3 is in the tree under every branch, nobody proposes removing it, and `legal.md` A1.7's M-B → M-O
    ordering is satisfied. **T5, T6, T4′ and T7 carry no absolute `scrollHeight`/`maxScroll` literal —
    grepped, not assumed — and their guards are viewport-relative, above the ad slot. Only T8 changes**
    (`plan.md` §3E A5.6): its `g1-*` rows run **ads off**, matching the before-numbers in
    `evidence/g1-*.txt`, its `pnpm exec playwright test` row runs **ads on**, each row is labelled, and
    **reconciling the two against each other is a category error**. `g1-scroll.mjs` scrolls to
    `scrollHeight` and `g1-fold.mjs` prints it, so **AC7 and AC1 are the two criteria that move with the
    ads state** — by up to 132 px, five times AC7's whole expected delta.

- **NEW, from G5 T1c / A4.3, 2026-09-19 — the reconciliation cell is run, the 132 px is fully
  attributed, and per A4.3's own rule the branch is reported but not self-credited. Owner:
  `tech-lead`.** `plan.md` §3D A4.3 named one cell (`/`, 390×844, storage `empty`, consent pending,
  dark) and one rule: reproduce `maxScroll` **2215** there or the branch is not credited and T1c
  stops. `copyB` in exactly that cell reads `maxScroll` **2347** (`scrollHeight` 3191, `viewportHeight`
  844) — not 2215. Per A4.3's letter this is the stop condition, but the gap is no longer a mystery:

  - **H1 (viewport differs) is refuted** — `viewportHeight` is **844** in both readings, printed
    explicitly (A4.3's amended B4).
  - **H2 confirmed and fully attributed, not just narrowed.** The whole 132 px is in `scrollHeight`.
    `app/layout.tsx` renders `<AdManager />` **after** `{children}` (after `#main-content`) and
    before `<CookieConsent />`; with `NEXT_PUBLIC_ENABLE_ADS === "true"` it renders a `<div>` whose
    `GoogleAd` child carries `min-h-25` (100 px) inside a wrapper `pb-8` (32 px) = **132.0 px**,
    matching the gap to the tenth. **Verified, not asserted**: a fresh build with
    `NEXT_PUBLIC_ENABLE_ADS` unset reproduces `design.md` §17.17's `scrollHeight` **3059** and
    `maxScroll` **2215** on `/` to the integer (and **2492** / **1648** on `/custo-da-hora`).
    `playwright.config.ts:66`'s `webServer.env` **hardcodes** `NEXT_PUBLIC_ENABLE_ADS: "true"`,
    unconditionally — every real run of this spec's own e2e suite, including CI, therefore reads
    `maxScroll` **2347** on `/`, not 2215. `design.md` §17.0's quoted build command shows no env vars,
    so its session measured the page without the block this repo's committed test config always
    includes.

  **I am not crediting branch (a) or (c) myself.** A4.3 reserves that call for `tech-lead` precisely
  because two agents are on the same geometry; my job under A4.3 was to run the named cell and print
  the disambiguating fields, and I have. Full tables, both copies, both routes, the env-toggled
  control build, and the D-3/D-5 discharge evidence (both now answerable — see below) are in
  `reports/build.md`. **T3 and T2 stand as delivered and are not touched; T5/T6/T4′/T7/T8 stay
  blocked** on this ruling.

  **Two settle points, both copies, `copyA`'s window measured directly (not derived by subtraction),
  as asked.** `copyA` early (253 ms): `maxScroll` **2331**; `copyB` early (240 ms): `maxScroll`
  **2347** — both match every earlier probe from this session at the same elapsed time, four
  independent page loads across three separate scripts, all stable. **A new, distinct finding
  surfaced by the second settle point (~2.2 s): the AdSense slot grows from its CSS floor (`min-h-25`,
  100 px) to 390 px in both copies identically**, moving `scrollHeight` by exactly the same +290 px in
  each — the consent surface also mounts by then (`fixed`, h 466) and contributes **zero** either way,
  confirmed by `footerBottom`/`mainBottom` being unchanged between the two settle points. This implies
  live network access to `pagead2.googlesyndication.com` on this machine, which a network-isolated CI
  runner would very likely not have — an environment-dependent instability distinct from anything this
  plan names, **not chased further, flagged for whoever owns CI/isolation characteristics.** It does
  not touch T1c's own numbers: every actual assertion in `first-screen-reachability.spec.ts` reads
  geometry promptly after `citationParagraph` is visible, well inside the ~250 ms early window and
  nowhere near the ~2 s the ad takes to grow — the **early** reading is what the shipped guard
  actually evaluates against, in production and in CI alike.

  **D-3 and D-5, answered by the same `copyA`/`copyB` run, independent of the maxScroll question.**
  D-5 (attribution): `copyA` (T3's two hunks reverted) still shows DS1 P4 `found: true`
  (`[2213.1, 2331]`), so `0003`'s footer growth alone — not T3 — is what makes DS1 P4 clear; T3 is not
  shown to be F1's remedy by this run. D-3 (DS2/DS7 on `/`, W14): re-swept with the same
  `lr35Surface`/`clearingScrollRanges` implementation via the existing full-journey test, all three
  found `true` in both copies (numbers in `reports/build.md`).

- **RULED, 2026-09-19, `tech-lead` — `plan.md` §3C Amendment 3. The blocker below is answered in
  full and stays on the record as the finding.** Under the human's recorded approval to continue
  (delegated for this batch), and it is the **last** ruling on this guard: A3.4 makes anything
  outside verdicts (a)–(d) a stop-and-hand-to-the-human.

  **A3.0 — this is not `labor-law-analyst`'s.** LR3.5's own text is a **conjunction**: *"there
  exists a scroll position … at which **the surface's whole border box lies inside the viewport**
  and no element whose computed `position` is `fixed` or `sticky` has a border box that intersects
  it."* The guard implements the second conjunct and not the first, which is why a surface ~2 000 px
  below the fold "clears" at `scrollY = 0`. Restoring a conjunct the rule states is a measurement
  fix, not a meaning change. **What would be a meaning change is routed, not decided**: whether a
  clearing range narrower than **1 CSS px** counts as *reachable* is `legal.md` Addendum A1's
  attainability axis and belongs to `labor-law-analyst` — A3.3 B5 reports such ranges and never
  asserts on them.

  **A3.1 — the 60-sample loop goes, replaced by the closed form.** It carries a second, unfired
  defect that would have produced a **false red**: its spacing at `maxScroll ≈ 2490` is **42.2 px**
  while `legal.md` §8.1's own table gives **DS1 P3 a 28.6 px** clearing window. The predicate is an
  interval algebra and is computed as one, in a pure function; the loop, `LR35_SAMPLE_COUNT` and
  `sampledCount` are deleted.

  **A3.2 — the guard is seen red in arithmetic before any browser runs.** The pure function is
  calibrated against `legal.md` §8.1's seven-row worked table — six rows to the digit, DS2 to 0.1 px,
  **and DS1 P4's empty range reproduced exactly** — plus four controls, of which **C1** re-runs
  DS1 P4 with the containment conjunct disabled and must come back **green**, proving that this one
  clause is what makes the known-red row red. A predicate that regenerates the gate's own published
  measurement is the gate's predicate, and it is a permanent regression check no later edit escapes.

  **A3.3 — a SECOND defect, in the run rather than the guard: the A2.3 baseline was taken on a tree
  that already contains T3.** T3 **is** M-B, the bottom reserve that exists to fix F1. A red baseline
  whose purpose is to see the guard fail on the unfixed head cannot be taken on a head where the fix
  has landed — had the guard been correct, that run could have been legitimately green and would
  still have been read as a defect. A1.4's *"on the current head"* was written when no source file
  had been edited and silently stopped meaning *unfixed* when T3 landed. The re-take is **two runs
  from one snapshot** (`copyB` rsynced from `copyA`, never from the worktree — `0003` is active in
  this tree and moved `maxScroll` by 144 px between the two existing probes), with `copyA` carrying a
  revert of **exactly two class strings** (`mb-8`, and the `pt-` phone step) and nothing else.
  `0003`'s footer rewrite is **not** reverted; T2 is **not** reverted.

  **Four verdicts, four destinations, unfused** — (a) guard discriminates and T3 is the fix → T5;
  (b) guard discriminates, T3 undersized → amended task, `tech-lead`; (c) guard discriminates and
  **F1 no longer reproduces on this head** → **`labor-law-analyst`, on F1 and L5**, copied to
  `product-designer` (A1.2's Q-A…Q-D reads the same geometry), and `tech-lead` does **not** rule
  whether F1 is discharged; (d) the calibration fails → fix inside T1c, run no browser at all.
  **(c) is the arithmetically expected outcome and is written first-class for that reason**; the
  projection behind that expectation is explicitly **not a finding** and may not be reported as one.

- **NEW, from G5 T1b / A2.3, 2026-09-19 — stop condition (b) fired: DS1 P4 is still green after the
  climb to the block-level surface. `frontend-dev` stops rather than attempting a fourth
  architectural guess. Owner: `tech-lead`, and `plan.md` §3B A2.3 already names this a third bounce
  that goes to the human, not to another developer-side fix.**

  `plan.md`'s Amendment 2 (§3B, T1b) was applied exactly as written: `surfaceClearsFixedChromeAtSomeScroll`
  now climbs from the matched leaf through `parentElement` to the first non-`contents`/non-`inline*`
  ancestor before measuring, and asserts V1 (identity against `citationParagraph`), V2
  (non-degeneracy) and V3 (the LR3.5 clearance) as three separate `expect`s, in that order, with
  `guard defect:`-prefixed messages, exactly per A2.1/A2.2. No other file touched; `reachability.ts`
  is untouched, as A2.0/T1b require.

  **The re-taken baseline** (isolated copy, `rsync --exclude node_modules --exclude .next` +
  `cp -al node_modules` + fresh `.next`, port **3421** confirmed free with `ss -ltnp` before the run,
  `uptime` 24.57/13.55 → climbing under concurrent sibling builds, production build only —
  `PORT=3421 pnpm exec playwright test tests/e2e/first-screen-reachability.spec.ts --project=chromium --reporter=line`):

  ```
  36 failed, 2 skipped, 19 passed (38.2s)
  ```

  Identical shape to the run T1a produced: **AC1 16/16 red, AC13 16/16 red, LR4.2a 4/4 red,
  LR4.4-clause-2@390 2/2 green, F2c@1440 2/2 `fixme`** — **and all 17 LR3.5 tests still green.** No
  `guard defect:`-prefixed failure fired anywhere, so V1 and V2 both held for every surface; the
  climb changed nothing about the pass/fail verdict.

  **This is stop condition (b), verbatim from `plan.md` §3B A2.3**, not condition (a). Diagnostics
  pulled with a one-off probe reusing T1b's own resolution algorithm unmodified (same server, same
  isolated copy, port 3421, immediately after the suite run — no product code touched, no test file
  edited for this probe):

  | Route | `citationParagraph` `boundingBox()` | resolved `surfaceTag` | `surfaceHeight` | `leafTag` / `leafHeight` | `docTop` | `maxScroll` | `scrollNeededToClear` |
  |---|---|---|---|---|---|---|---|
  | `/` | `{x:16, y:2841.39, w:358, h:121.73}` | `p` | 121.7 | `a` / 34.4 | 2841.4 | 2347 | **0** |
  | `/custo-da-hora` | `{x:16, y:2274.56, w:358, h:121.73}` | `p` | 121.7 | `a` / 34.4 | 2274.6 | 1780 | **0** |

  The resolved surface **is** `citationParagraph`'s own node (V1 holds — same tag, same box, same
  origin), it **is** block-level (V2 holds — `display: block`, height 121.7 ≥ leaf's 34.4), and it
  still clears every fixed element **at the very first sampled scroll position, `scrollY = 0`.**

  **Observed, not adopted as a fix, and offered only because A2.3 asks for the number that made it
  pass.** At `scrollY = 0` the surface's on-screen top equals its `docTop` (2841.4 / 2274.6), which is
  already far below every fixed element's bottom edge (nav bottom 828, banner bottom 820, shield
  bottom 828) — so the "no fixed box intersects the surface" predicate is satisfied *because the
  surface is off-screen below the fold*, independent of whether F1's actual defect (insufficient
  bottom reserve) is present. `surfaceClearsFixedChromeAtSomeScroll`'s loop starts sampling at
  `scrollY = 0` and returns on the **first** clearing sample, so this trivial case is returned before
  the loop ever reaches the scroll range where the surface is actually brought into view and could
  plausibly overlap the tab bar. This reproduces **identically for the `<a>` leaf** (T1a's resolution)
  **and the `<p>` block** (T1b's resolution) — same `docTop`, same `scrollNeededToClear: 0` — which is
  consistent with V1/V2 both holding while V3 stays trivially true either way: **the element being
  wrong (A1's finding) and the sweep's own early-exit-at-scroll-0 property (this finding) are two
  different defects, and Amendment 2 only had authority over the first one.** Whether LR3.5's
  predicate needs a "the surface is within the viewport at that scroll" clause added to it, or a
  different quantifier over the sample range, or something else, is exactly the kind of guard-design
  call `plan.md` §3B A2.0 already reserved for `tech-lead`/`labor-law-analyst`, not for a developer
  reading `legal.md`'s worked numbers and picking one. I have not touched
  `first-screen-reachability.spec.ts`'s loop body beyond what T1b specified, and I have not guessed a
  fourth version of it.

  **Not touched while stopped:** `tests/e2e/support/reachability.ts` (per A2.0's own instruction, and
  per T1b's file list, which names no other file). T2 and T3's code stand as delivered (A2.5); T3's
  e2e verification (`-g "LR3.5"`, A2.4) is blocked on the same mechanism and stays deferred here, not
  reported as either pass or fail — the guard it would read does not currently discriminate the
  quantity T3 exists to fix.

- **SUPERSEDED by the finding above — kept as the record that produced Amendment 2.**

- **NEW, from G5 T1a, 2026-09-19 — LR3.5's DS1 P4 sweep is a false pass; `frontend-dev` stops rather
  than picking which element "the surface" now is. Owner: `tech-lead`.** T1a's step 1 and step 2 are
  both executed exactly as written (`reachability.ts`'s `citationParagraph` now filters on
  `CURRENT_LEGAL_YEAR.sources.rgpsBrackets[0].norm`; `LR35_SURFACE_MARKERS`'s `"DS1 P4"` now holds the
  same value, in both route records). The re-taken red run (isolated copy, port 3419, `uptime`
  4.60/5.37/6.17 on 16 cores, `ss -ltnp` clean before the run — full command and counts in
  `reports/build.md`) comes back **36 failed, 2 skipped, 19 passed** — **AC1 16/16 red, AC13 16/16
  red, LR4.2a 4/4 red, LR4.4-clause-2@390 2/2 green, F2c@1440 2/2 `fixme`, exactly as T1 expects — but
  all 17 LR3.5 tests are green**, and per **T1's own written rule** ("if any of the four describes
  passes on the unfixed head, stop and report it to `tech-lead`: it means the assertion does not
  discriminate") that is reported here rather than accepted.

  **Root cause, measured, not guessed** (`reports/build.md` has the probe script and its output).
  `surfaceClearsFixedChromeAtSomeScroll`'s leaf search — T1's own algorithm, untouched by T1a — finds
  *"the first element, in document order, whose own text contains the marker and whose children's text
  do not."* Under the pre-`0003` footer, the marker (a substring of the paragraph's prose) matched the
  whole `<p>` and not its single `<a>`, so the leaf **was** the `<p>` — the real 34.8 px surface.
  T1a's new marker is **the `<a>`'s own accessible name**, so the identical search now correctly, by
  its own definition, stops at the `<a>` **itself** — a 34.4 px, one-line box sitting near the **top**
  of `0003`'s new seven-line, four-link `F-1` paragraph (measured: `docTop` **2727.2**/**2269.6**,
  `scrollYRangeThatClearsChrome` **[2407.6, 2491]** / **[1950, 2033]**, both **feasible**), while the
  real paragraph — the box `citationParagraph(page)` correctly resolves for AC1/AC13 — sits **over
  120 px lower** (`citationRect.bottom` **2848.95** on `/` empty). **LR3.5's DS1 P4 row is exempt from
  the defect it exists to catch, because it is no longer measuring the same box AC1 and AC13 measure
  under the same name.**

  **Why this is not a value substitution I can make myself.** T1a's own reasoning for the marker
  choice is about **which name uniquely locates the `<p>` through `filter({ has })`** — a mechanism
  immune to this failure because `filter({ has })` matches the ancestor, never the descendant it
  searches for. `LR35_SURFACE_MARKERS` feeds a **different, independently implemented** leaf search
  with no such ancestor-widening step, and T1a did not say to change that algorithm — only the value.
  Whether the fix is (a) re-deriving DS1 P4's LR3.5 surface through `citationParagraph(page)` instead
  of a bespoke marker, (b) climbing the leaf search to the nearest ancestor `<p>`, or (c) something
  `product-designer`'s pending M-R re-measurement (A1.2) changes anyway, is a guard-design decision no
  task text has made, and every other marker (`DS1 P1/P2/P3`, `DS2`, `DS7 art. 59/71`) is unaffected —
  none of them is also, verbatim, a descendant's own full text, checked one by one in `reports/build.md`.
  **T1a is not marked done.** T2 does not depend on this and is unaffected; it is done (below).
  **T3 is also unaffected in its own file (`calculator-views.tsx`'s D1/M-B are plain utility edits,
  `pnpm check` green) but its Playwright verification step (`-g "LR3.5"`) reads this same broken
  guard, so that one command is deferred rather than run and reported as if it meant something.**

- **RULED, 2026-09-19, `tech-lead` — see `plan.md` §3A Amendment 1.** The T1/T4 blocker below is
  **answered in full**; it stays on the record as the finding, and the ruling supersedes it:
  **A1.1** `citationParagraph` is **live code** (six call sites in
  `tests/e2e/first-screen-reachability.spec.ts`), not dead code, and is **not deleted**; the repair
  is **T1a**, in this spec's own two files, by this spec's developer — `0003`'s T2 file list does
  not widen and neither developer edits the other spec's file. **A1.2** T4 is **SUPERSEDED**, and
  the re-measurement is routed to **`product-designer`** as a scoped G3 re-run on **M-R only**
  (**bounce 1 of 2** on this spec's G3), with a conditional onward route to `labor-law-analyst` on
  **L5** if no placement satisfies R with `F-1` whole. **A1.3** the order changes to
  T1 → T1a → T2 → T3 → T5 → T6 → T4′ → T7 → T8, `legal.md` A1.7 preserved. **A1.4** T1's red-run
  baseline is **stale** (the footer grew ~87 px under `0003`) and is **re-taken** under T1a; T8's
  deltas are measured against the re-taken baseline. **A1.5** the `column-stability.spec.ts` lint
  failure is **`0008`'s T7**, real, routed, and is **not** a `0010` or `0003` regression.

- **NEW, from G5 T1 — the codebase this plan was built against no longer exists in the shared
  tree; `frontend-dev` stops rather than inventing the mapping. Owner: `tech-lead`.**
  `plan.md` T1 (`citationParagraph`, `EXPECTED_LINES_ON_FIRST_SCREEN`'s marker text) and T4
  (the entire `TableCitation` component: `CURRENT_LEGAL_YEAR.year`, `.effectiveFrom`, `.source`,
  `.sourceUrl`, and the claim that DS1 P4 is "a `<p>` and an `<a>`", byte-identical, one citation)
  are written against a `LegalYear` shape that a **concurrent, uncommitted** edit in this shared
  working tree has already replaced. `git log -- lib/legal-tables.ts components/organisms/calculator-views.tsx`
  shows no committed change; `git status --short` shows both **currently modified, unstaged**, by
  a sibling spec (`.specs/0007-sumula-431-citation-scope/STATUS.md` and
  `.specs/0008-intermittent-layout-shift-on-custo-da-hora/STATUS.md` are both `in-progress` right
  now, per the team-lead; `.specs/0003-citation-registry/STATUS.md` is `blocked`, so it is not that
  one). Confirmed the break is real, not a stale read, by running `pnpm typecheck` against the
  actual working tree: it fails at `tests/e2e/support/reachability.ts:186` —
  `Property 'source' does not exist on type 'LegalYear'. Did you mean 'sources'?`.

  **What actually changed, read from the files as they stand right now:**
  `lib/legal-tables.ts`'s `LegalYear` no longer has `effectiveFrom`, `source` or `sourceUrl` at
  all — it has `sources: LegalSources`, one `NormSource`/`DerivedSource` **per data set**
  (`rgpsBrackets`, `incomeTaxBrackets`, `rppsFederalBrackets` — two entries — etc.), each with its
  own `norm`/`url`/`effectiveFrom`. `components/organisms/calculator-views.tsx`'s footer P4 (the
  disclosure this whole spec repositions) already reads from that new shape: it is no longer one
  `<p>` with one `<a>` — it is one `<p>` with **four** `<a>` elements (INSS/RGPS, IRRF, RPPS art.,
  RPPS Anexo III), each pointing at a different norm, and the sentence itself is rewritten
  (*"Tabelas usadas nos cálculos: INSS pela … IRRF pela … RPPS federal: …"*, not
  *"Tabelas de INSS e IRRF de {year} …"*).

  **Why this is a blocker and not a one-line adaptation:** every number `design.md`'s 32-cell
  measurement, `legal.md`'s LR2a/LR4.4 clauses and `plan.md`'s citation geometry (`w 358`, `h 34.8`,
  "one line", "the citation's own `<a>`" as a single leaf for AC13's `linesOnFirstScreen`) was taken
  against a **one-link** paragraph. A four-link paragraph is a different LR2b/LR2a/AC13 subject —
  more line boxes, a different width profile, a different accessible name to key
  `citationParagraph` off (there is no longer a single `CURRENT_LEGAL_YEAR.source` name to filter
  by `getByRole("link", { name: … })`). `copy.md`'s "byte-identical move, zero new copy" premise is
  also already false against the tree as it stands — the sentence a sibling spec is shipping is not
  the sentence `copy.md` ruled a no-op on. Deciding which of the four links (if any) is "the"
  citation `TableCitation` moves, or whether `TableCitation` must now carry all four, is a
  `product-designer`/`labor-law-analyst` question this task is not permitted to answer by picking
  one.

  **What I did and did not do about it:** `tests/e2e/support/reachability.ts` and
  `tests/e2e/first-screen-reachability.spec.ts` are written to `plan.md` T1's letter, against the
  shape `plan.md` documents (`CURRENT_LEGAL_YEAR.year/.effectiveFrom/.source/.sourceUrl`, one
  `<a>`). They do not currently typecheck, for the reason above — I have not edited
  `lib/legal-tables.ts` or `components/organisms/calculator-views.tsx` to chase the sibling spec's
  moving target, and I have not guessed a mapping onto `sources.*`. **T1 is red for a reason outside
  this spec's plan, not for the reason the plan intends ("seen red before any source edit" because
  the defect is unfixed) — those are not the same red**, and reporting the first as if it were the
  second would be exactly the vacuous-guard trap `AGENTS.md` §5 warns about.
  **T2 and T3 do not depend on the citation and are unaffected** — proceeding with those while this
  is triaged. **T4 cannot be built until this is resolved**, and T5–T8 depend on T4.

- **AC8 — met.** `legal.md` §3 rules CA, CB and CC by name, and admits CD and CE. G4 is unblocked on
  this criterion; `plan.md` must still carry each in-domain verdict into a task **or** a routed debt
  with an owner and a trigger — all five route out as **F4**.
- **AC10 — met.** `legal.md` §4 is the **L3** ruling, so a banner geometry change is now permitted
  and bounded. **`legal.md` §4.5 is the constraint that matters: no bottom-anchored fixed consent
  surface can satisfy AC13 at 390 at any legally valid size** — the ceiling is 125.9 px on `/` and
  277.0 px on `/custo-da-hora`, the floor is 336.
- **AC13 — corrected, and the correction is binding.** As written the criterion cannot fail: its
  instrument prints `linesOccluded: 0` against an empty collection. It now requires
  `linesOnFirstScreen` asserted against its expected count, split `sighted + assistive`, **then**
  zero. Instruction to `tech-lead`; `labor-law-analyst` does not edit `spec.md`. `legal.md` §11
- **AC14 — met at G3.** `design.md` §13 names the reading in one sentence: **§8 reaches the consent
  gate by substance.** The L3 ruling is carried with LR4.4's five clauses re-measured on the
  relocated surface (body `w` 332, LR2a spend 26, equal button areas 15 936, height 466 ≥ 336,
  clause 4 still unmet as F3).
- **AC15 — unchanged**, and `legal.md` §12 F1 is explicit that F1's remedy is flow height **below the
  footer**, which is not `0008`'s budget and spends none of it.
- **F1 — absorbed and discharged at G3.** `design.md` **M-B** raises the document's bottom reserve
  from 64 px to 96 px against the tab bar's 78 px band. Measured clear in every cell, **including
  consent-answered**, which is the state where relocating DS1 P4 alone had handed the identical
  breach to **DS1 P3** (2529.6 of 2516 on `/`; 1162.8 of 1149 on `/custo-da-hora`). The reserve
  change is **system change S2** and therefore a human approval point.
- **AC14** (run 2) — the same geometry change must also **name the `PRODUCT.md` §8 reading** it
  relies on, in `design.md`. The reading itself is deliberately unsettled (`spec.md` § Out of scope
  8); what blocks is failing to state which one was assumed.
- **AC15** (run 2) — `0008` owns the flow-height ceiling above `#salario-bruto` (< 12 px, and 0 px
  in two of three seed states). A remedy here that needs more is a **blocker routed through
  `tech-lead` to `0008`**, never a trade this spec takes to satisfy AC1 or AC13.

- **New, from G3 — LR4.2 versus `legal.md` §4.6, for `labor-law-analyst` at G6.** LR4.2 requires
  every consent control to be *"fully within the viewport"*; §4.6 expressly permits the consent
  surface to render below the first screen. `design.md` §14 assumes the **existential-over-scroll**
  reading (LR3.5's quantifier) and measures under it — all three controls `inViewport`, `inSurface`,
  unclipped, both themes, 390 and 1440. If the universal reading is the right one, **this family of
  remedy closes and §4.5 has already closed every other one**, which makes it a spec-level blocker
  rather than a detail. `tech-lead` routes it.
- **New, from G3 — F2a is a precondition, not a routed debt.** The design opens
  `components/organisms/cookie-consent.tsx`, so `legal.md` §12's trigger fires. The telemetry
  switch's initial value is `labor-law-analyst`'s ruling; `plan.md` carries it as its own task and
  `product-designer` does not set it.
### Opened at G4, 2026-09-19 — routed, with the owning agent named

- **B1 — `cn()` on `TableCitation`. Owner: `product-designer`. Not blocking; `plan.md` states its
  default.** `design.md` §7.1 mandates composing the citation through `cn()` against a caller's size
  class deleting the colour class. **`TableCitation` takes no class from any caller** — both call
  sites render it bare — so there is no merge to perform and a `className` prop added to enable one
  is config for a value that never changes. **Default T4 builds: no prop, one static class string, no
  `cn()`.** A one-line amendment to T4 if `product-designer` rules otherwise. `plan.md` §2.3.
- **B2 — the consent surface's transition. Owner: `product-designer`. Not blocking; `plan.md` states
  its default.** `design.md` §9 specifies **320 ms `--ease-out`**; the surface inherits
  `MotionConfig`'s `{ type: "spring", bounce: 0, duration: 0.35 }` from `theme-provider.tsx:10`.
  Writing the duration and curve into a `motion` prop means a literal `cubic-bezier` tuple in
  TypeScript where `AGENTS.md` §8 forbids an arbitrary value if a token exists, and the change is
  carried by no movement, no acceptance criterion and none of `design.md`'s 32 cells. **Default T5
  builds: `y: 100 → 12` lands (S3, approved); duration and easing stay inherited.** Reduced motion is
  identical either way — `reducedMotion="user"` drops the `y` and keeps the opacity cross-fade.
  `plan.md` §2.4.
- **B3 — `design.md` §7.2 contradicts §14 on the consent row's padding. Settled at G4 by
  `design.md`'s own tiebreak rule; `product-designer` corrects the document.** §7.2 says
  `p-3 md:p-8`, §14 says `px-3 py-6 md:p-8` and *"the vertical padding is untouched, so the surface
  height stays 466"*. The instrument that produced every number both sections quote,
  `evidence/g3-lr42.mjs`, mutates the row with `calc(var(--spacing)*3)` = **12 px, horizontal only**,
  and `evidence/g3-lr42.txt` reads back `bodyTextWidth 332`, `lr2aSpend 26`, `lr44FloorHeight 466`,
  `Recusar` box `29,615 332x48` — 16 (gutter) + 1 (border) + 12 (padding) = 29, where a 16 px padding
  would give 33 and a body width of 324. **Resolution: `px-3 py-6 md:p-8`.** The measurement wins over
  the prose (`design.md` §0, `legal.md` A1.6). `plan.md` §2.1.
- **B4 — ANSWERED by `product-manager`, 2026-09-19. The ruling is in `spec.md` § Acceptance criteria;
  the promotion to `AGENTS.md` §5 is `tech-lead`'s at G10, with the trigger below. The report is kept
  as the finding that produced it.** `evidence/` is gitignored, so the instruments this spec's criteria name do not ship. Owner:
  `product-manager`. `.gitignore:55`, confirmed with `git check-ignore -v`. AC1, AC2, AC3, AC4,
  AC7, AC13 and AC15 all name an `evidence/*.mjs` command that nobody who clones the repo can run.
  `plan.md` mitigates it by writing the durable form of R, O, LR3.5, LR4.2a and LC1 as Playwright
  specs under `tests/e2e/`, which are committed and run in CI (`.github/workflows/ci.yml:131`).
  **Whether an instrument a spec's criteria depend on belongs under a gitignored path is
  `product-manager`'s call, not `tech-lead`'s.** Trigger: the next spec whose acceptance criteria
  name an `evidence/*.mjs` command.
- **B5 — AC6's instrument exists and has been run, contrary to `spec.md`'s text. Recorded, not
  bounced.** `spec.md` AC6 says the `0008` §7 V1–V5 procedure *"does not exist as a script in this
  tree"*. It does: **`tests/e2e/disclosure-legibility.spec.ts`**, backed by
  `tests/e2e/support/legibility.ts`, implements LR1, LR2b and LR3-as-corrected over DS1 and DS4
  across 2 routes × 2 viewports × 2 themes. `tech-lead` ran it in an isolated copy on port 3410
  (`uptime` 5.72 of 16 cores, `ss -ltnp` clean): **16 passed (10.1s)**, green on the unfixed head.
  LR2a is **not** wired in — `expectLr2a` exists in the support module with no call site — and T4 is
  the task that gives it one.

- **New, from G3 — reported, not absorbed.** At 1440 `area(Recusar)` **4 935** < `area(Aceitar Tudo)`
  **6 296** (pre-existing, outside LR4.4's stated 390 domain, untouched by this design). And the
  aside cell's visual order and tab order diverge, because `order-first` is visual only — fixing it
  means editing `components/templates/calculator-layout.tsx`, which § Out of scope 4 forbids.

## Carried debts touching this spec

| Debt | Source | Re-measured at G1 | State |
|---|---|---|---|
| **DS2** — no e2e assertion for the DSR / Súmula 172 caption; trigger is the first spec that opens `components/organisms/day-summary.tsx`, the caption type, or the `DESIGN.md` scale | `0006` G10 | `grep -rn "Súmula 172\|DSR" __tests__ tests components lib` → **10 rows, 0 under `tests/`** | **still open, and the trigger did NOT fire at G3.** `design.md` does not open `day-summary.tsx`, does not change the caption's type token and does not change `DESIGN.md`'s type scale. Measured rather than asserted: the DSR row's bottom **2369.5** and DS2's top **2381.5** — **12 px, identical to the baseline's 12 px**. **Re-routed intact** with owner and trigger; AC9's second branch, which `plan.md` states. |
| **`0004` F1 / LR5.4** — the clause protecting a returning user's stored inputs has never been asserted by a running check | `0008` §8 Q4 | not re-measured here | **not this spec's** unless a task edits `hooks/use-salary-calculator.ts` or `hooks/use-work-calculator.ts`; `0008` §6 O5 makes it a precondition if one does. `spec.md` § Scope names no hook. |

## Debts opened at G2 — `legal.md` §12, and at G2 run 4 — `legal.md` Addendum C (**F5** opened; **F6** drafted and withdrawn)

Each with an owner and a **trigger, never a date**. None is patched; `labor-law-analyst` never edits
source.

| # | Severity | What | Owner / trigger |
|---|---|---|---|
| **F1** | serious | **DS1 P4 under the fixed route nav at every reachable scroll position**, 4/4 cells — needs `scrollY` 2504.2 against a max of 2490 on `/`, 1228.6 against 1215 on `/custo-da-hora`. Live **LR3.5** breach. | **This spec** — it is occluded height under fixed chrome. If G3/G4 cannot take it: `tech-lead`, trigger **the first spec that opens `components/organisms/calculator-views.tsx`'s footer or `components/organisms/app-header.tsx`'s route nav**. |
| **F2a** | serious | `components/organisms/cookie-consent.tsx:15` — the telemetry switch opens **pre-enabled**; *Salvar Preferências* without touching it records consent. LGPD **art. 8º caput** (*meio que demonstre a manifestação de vontade* — the decisive unit, added at run 2) and **§ 2º** (the controller's burden of proof); art. 5º XII *inequívoca*; art. 8º § 3º makes the resulting processing **vedado**; ANPD guide pp. 32–33. | **PRECONDITION OF THIS SPEC — the trigger fired at G3.** Settled at G2 run 2 as **LC1** (`legal.md` A2.2), seven axes with a state to construct and a quantity to read each. **The value comes from `legal.md`, not from the developer.** `plan.md` carries it as its own task, sequenced before or with the geometry task. |
| **F2b** | moderate | **DS4 fails LR2a by 18 px** (spends 50 of a 32 px budget, `cookie-consent.tsx:47` `p-6`) — declared binding on DS4 at `0006` §3.2 and never measured on it. Same cause as CA/CB/CC. | In scope **if** the remedy touches the banner's box (worth 18 px of height, costs nothing). Else `tech-lead`, same trigger as F2a. |
| **F2c** | moderate | **`area(Recusar)` < `area(Aceitar Tudo)` at 1440×900** — `102.8 × 48 = 4 935` vs `131.2 × 48 = 6 296`, accept **27.6% larger**; cause is `w-full sm:w-auto` at `components/organisms/cookie-consent.tsx:68` and `:71` inside the row at `:60`. Opened at G2 run 2 (`legal.md` **C3**), which **widened LR4.4 clause 2's measurement condition from 390 to 390 AND 1440** because *"at 390×844"* was a calibration point, never the domain — and the ANPD item it implements (*"conferir maior destaque apenas ao botão de aceite"*, p. 33) has no viewport in it. Evidence: `evidence/g3-lr42.txt`, both 1440 blocks. | **Not a rejection** — pre-existing, untouched by all four movements, and `spec.md` § Out of scope 6 forbids a desktop layout change. **This spec, if and only if a task edits the control row at `:60-74`**; otherwise `tech-lead` → the consent spec that takes `0011` F2. **A sibling axis is deliberately left OPEN and recorded**: the same substance in the quantity **fill** — `variant="default"` vs `variant="outline"` — at every viewport including 390. |
| **F3** | serious | **No cookie policy and no privacy page exist** — `grep` over `app/` and `components/` returns one file. Five of LGPD art. 9º's seven information units are presented nowhere; art. 9º §1º makes consent so obtained **null**. | `tech-lead` → the same consent spec, **and** the human (`legal.md` §16 Q1). It **raises** LR4.4's floor by 28 px rather than lowering it. |
| **F4** | serious | **`Extra 100%`** (`components/organisms/day-summary.tsx:203`, from `hooks/use-work-calculator.ts:14`) traces to **no norm and no table**; `Extra 50%` traces to CF art. 7º XVI / CLT art. 59 §1º but lives in a hook, uncited. **CA and CB — the only strings that qualify them — are absent from the DOM on load.** | `tech-lead` → a new spec, **and** the human (`legal.md` §16 Q2, because `PRODUCT.md` §6 calls 50/100 *"the statutory floor"* and CB denies it). Trigger: **the first spec that opens `hooks/use-work-calculator.ts`, `components/organisms/journey-form.tsx`'s settings panel, or `components/organisms/day-summary.tsx`'s rate rows**. |
| **F5** | serious | **The LR3.5 e2e guard has never evaluated the document the product ships.** `playwright.config.ts:66` pins `NEXT_PUBLIC_ENABLE_ADS: "true"` unconditionally — not keyed on `CI`, not read from a `.env`. The ad slot sits **below every disclosure**, so the shipped page carries **132 px less flow** below the footer (`maxScroll` 2215 vs 2347 on `/` at 390) and DS1 P4's whole margin there is **17,9 px**. **Demonstrated, not hypothetical**: on `copyA`/`/` the same cell reads `found: true` ads-on and `found: false` ads-off, which are **opposite causal attributions** for F1. `legal.md` **C4**, worked case replaced at **C11.3**. | **`tech-lead`**, to route — a second ads-off LR3.5 project, or the describe asserting the shipped configuration. **`labor-law-analyst` does not choose between them; that is test design.** Trigger: the next spec that opens `playwright.config.ts` or `tests/e2e/first-screen-reachability.spec.ts`, **or** any spec changing flow height below `calculator-views.tsx`'s footer — it is **F1's own 17,9 px trigger seen from the instrument side**. |
| ~~**F6**~~ | **WITHDRAWN at the gate that drafted it** | **`adsbygoogle.js` loads before the user answers the consent banner** — `analytics-wrapper.tsx:12` gates GA on `readTelemetryConsent() === true`, `ad-manager.tsx:12-19` gates the AdSense script only on `!adClient \|\| !enableAds`, and **`lib/consent.ts` is not imported anywhere in the ad path**. **This is not new: `0011` **F1** already found it and `0014` **L4** is its open legal question.** Checked before opening a duplicate ledger entry — *a finding that recurs is rarely one nobody got around to fixing*. `legal.md` **C7**. | **Owner unchanged: `0011` F1 / `0014` L4 / `tech-lead` on sequencing.** `0010` opens nothing. What `0010` adds is one sentence: **C2 makes `0011` F1's subject non-latent** — the ads-on page is a document the product can ship, so *"breaches anything today"* means *in whichever configuration production ships* (**Q8**). **Precondition on the analyst's own future gate: `0014` L4 may not be ruled until LGPD art. 7º and ANPD's cookie guidance are read from a primary source — planalto.gov.br returned `ECONNRESET` ×4 this session.** |

## Decisions log

| When | Agent | Decision |
|---|---|---|
| 2026-11-20 | product-designer (G3 integration, run 3) | Preserve the approved `0100` ring and edit shortcuts. Move the whole DS1 P2 into the result column. Use the current result census and the native modal's paint order in the guards. The measured first-screen room removes T6's earlier geometry dependency for AC1. The separate AC15 first-field criterion stays open for `0008` and product triage. [Measurements](design.md#18-pr-42-integration-with-the-glass-results) |
| 2026-11-20 | product-designer (G3 integration, F2c) | Include the consent action row in PR #42 to meet LR4.4 clause 2 on desktop. The grid gives refusal and acceptance equal tracks while leaving room for the informing paragraph. Re-enable the rendered area assertion at 1440 once the change is built. Keep the separately routed fill question. [Consent target evidence](design.md#equal-consent-targets) |
| 2026-09-19 | labor-law-analyst (G2 run 4, `legal.md` **Addendum C**) | **LR3.5's subject is the document the reader's browser renders — neither of the two documents D-5 offered.** Both are proxies; where the product can ship more than one, **the clause binds in every one and is verified in the NARROWEST**, which is ads-off today only because the slot sits **below** every disclosure. Stated that way and not as *"ads off"* so it survives `<AdManager />` moving before `{children}` — **that is the state in which this ruling comes out the other way, and a rule with no such state was not ruled.** **Meaning: unchanged, word for word.** **Measurement: the ad-slot configuration is a cell axis**, beside route, viewport, theme, storage and consent, and it was missing from the enumeration — lesson **048**'s defect one level up. |
| 2026-09-19 | labor-law-analyst (C2.3) | **The decisive reason is that the harness document has an operand this repository cannot bound.** `maxScroll = maxScroll_adsOff + 32 + adHeight`, verified against **three** measured points on one formula with no free parameter (0→2215, 100→2347, 390→2637). `adHeight` is chosen by **AdSense** — `data-ad-format="auto"`, `min-h-25` a **floor with no ceiling** — against a **placeholder publisher** (`ca-pub-0000000000000000`, not the product's `ca-pub-8745764662929625`). **A clause whose verdict moves with an ad auction is not falsifiable by anything this squad can run**, and a rule its own reviewer cannot falsify is not a rule. |
| 2026-09-19 | labor-law-analyst (C1) | **Two of `plan.md` §3E A5.2's five premise rows are wrong, and A5.3's mechanism is half-stated — all three corrections strengthen `tech-lead`'s conclusion, and a ruling adopted on a premise is a ruling about the premise.** (1) **`.env` is NOT committed** — `.gitignore:20`, `git ls-files` returns only `.env.example`; **nobody has read the production environment** (**Q8**). (2) The harness's publisher is a placeholder, so **there are three documents, not two**, and the real ads-on page has never been measured. (3) Ads-on is more permissive in **width** and **not monotone in LR3.5a tier**: above `adHeight` **529,4 px** on `/`, DS1 P4 un-anchors from `maxScroll` and becomes **Tier 2**. A mechanism, **not** a finding — unmeasured, and 579,3 px wide at the crossing (lesson **050**). |
| 2026-09-19 | labor-law-analyst (C3) | **The ruling was checked clause by clause, eight rows for eight clauses, with the ads operand moved against each.** Only **LR3.5** and **LR3.5a** see it, and only through `maxScroll`; LR1, LR2a, LR2b, LR3, LR4.2/LR4.4 and LR6.1 are **unaffected**, each for a stated reason. **Saying which clauses the restatement does NOT reach is what keeps it from being read as a widening.** One axis is recorded as **unswept, not clear**: whether `adsbygoogle.js` can inject a `fixed` overlay — if it can, ads-on becomes **more** restrictive, a second direction in which *"strictly more forgiving"* fails. |
| 2026-09-19 | labor-law-analyst (C6.3, C11) | **The expected value of T1d was pre-registered before the run and reproduced to the digit.** Two independent derivations with no shared intermediate — the ad-slot arithmetic (`2331 − 32 − 100`) and **T3's own flow delta** (`2215 − (+32 mb-8, −16 pt)`) — both predicted `maxScroll` **2199** and `I = [2213.1, 2199]`, **empty by 14,1 px**. T1d read **2199**, `ranges` `[]`. **Publishing the expectation before the number is what makes it evidence; publishing it after would make it a gloss**, and the section is left unedited so the order is visible. The reconciliation also cleared an apparent contradiction rather than routing one: `#main-content`'s `padding-bottom` reads **64** in `copyB` because M-B put the extra 32 on the footer's `mb-8`, exactly as `plan.md` T3 says. |
| 2026-09-19 | labor-law-analyst (C11.2 — **D-5 settled**) | **Branch (a): T3 IS F1's remedy.** With T3 the shipped document clears DS1 P4 (`[2197.1, 2215]`, `found: true`); **with T3 reverted it breaches** (`[]`, `found: false`, both routes). **`0003`'s footer rewrite alone does not discharge F1**, `design.md` §17.3's causal claim is **confirmed with its counterfactual measured**, and **B6.2's attribution caveat is DISCHARGED**. D-1 held in the way that counts — the probe printed **red on the predicted-red row and green on the control, in one run**. **F1 stays discharged as a breach; its 17,9 px re-open trigger is now load-bearing rather than precautionary**, because the margin is the whole of the compliance and not a surplus on `0003`'s. |
| 2026-09-19 | labor-law-analyst (C11.3, corrected inline) | **"The ads-on guard has been reporting a pass the product does not earn" is FALSE of the head that ships, and it is corrected at the gate that would have carried it.** `copyA` is **T3 reverted** — a counterfactual head in an isolated copy that no user has been served. The delivered head is `copyB`, and **`copyB` ads-off reads `[2197.1, 2215]`, `found: true`**, measured twice integer-exact (the A4.3 control and T1d's own sanity control). **The product earns its pass in the shipped document and earned it before T1d ran.** What the guard could not do is **attribute** the pass — ads-on it credits `0003`, ads-off it credits T3. **F5 is a finding about an instrument's blind spot in the causal record, not about a live breach**, and the larger claim would send a remedy at a surface that is not failing. **F1 stays discharged.** |
| 2026-09-19 | labor-law-analyst (C11.3 — **F5**) | **The harness's document did not merely widen a margin; it inverted a causal attribution.** Same cell, same surface, same formula: ads-on `found: true` → *"`0003` discharged F1, T3 unnecessary"*; ads-off `found: false` → *"T3 is the remedy"*. Had the subject question not been asked, this spec would have written into the record that the 96 px reserve was **not** load-bearing, and the next spec to open the footer would have read it. **A defect that ships as prose, not as pixels** — `AGENTS.md` §5's *the reason is what travels*. **F5 `serious`, routed to `tech-lead`; not a rejection ground for `0010`** — `playwright.config.ts` is outside the file list and **no reader is unprotected today**. |
| 2026-09-19 | labor-law-analyst (C7 — **a finding drafted, checked, and WITHDRAWN at the gate that drafted it**) | **`adsbygoogle.js` loads with no consent check while GA is gated on the same banner's answer** — one script gated, one not, in the same document, behind the same question. **I drafted it as a new finding and then checked whether it was one. It is not: `0011` **F1** already found *"the ads path reads no consent at all"*, `0014` **L4** is its open legal question, and `0015` § Scope ruling already bounds `0014`'s override to `ad-manager.tsx:10-19` — this exact path.** Three specs hold it; a fourth entry would have been the duplicate ledger my own rule warns about (*a finding that recurs is rarely one nobody got around to fixing*), and lesson **060**'s shape applied to a finding instead of a symbol. **What `0010` adds is one sentence: C2 makes `0011` F1's subject non-latent** — the ads-on page is a document the product can ship, so L4's *"today"* means *in whichever configuration production ships* (**Q8**), not *deferred because one developer's untracked `.env` says `false`*. **Precondition carried to my own `0014` G2: L4 may not be ruled until LGPD art. 7º and ANPD's cookie guidance are read from a primary source — planalto.gov.br returned `ECONNRESET` on `l13709.htm`, `L13709.htm` and `l13709compilado.htm`.** *If you cannot find a primary source, you write the gap.* |
| 2026-09-19 | labor-law-analyst (C11.4) | **T1d printed a third `fixed` box §8.1's band was derived without — `shield 784..828 w44` — and it was checked rather than ignored.** It is **contained within** the route nav's `766..828`, so the binding top edge is still **766** and the unoccluded band is still **`[65, 766]`, 701 px**: every interval in §8.1 and in both addenda is unchanged. Recorded as **verified present and non-binding**, never as *not seen*, and **W14 now requires the FULL `fixed` list per route** rather than the two boxes the band was named after. |
| 2026-09-19 | tech-lead (G4, `plan.md` §3E Amendment 5) | **A4.3's stop condition is discharged on the merits, and A3.4 is not invoked.** The clause is for a **third, unexplained** value of `maxScroll`. **2347 is the second reading** (four page loads, three scripts, all ~200–250 ms) and **2215 is now reproducible on demand** — a build with `NEXT_PUBLIC_ENABLE_ADS` unset returns `scrollHeight` **3059** / `maxScroll` **2215** on `/`, integer-exact against `design.md` §17.17, with `docTop`/`h` unchanged. **Both values follow from one named operand, measured in both directions**, which is the definition of attributed. The owner's delegate ruled the escalation discharged; it is recorded here as correct independently of that delegation, and **no fifth mechanism is live**. |
| 2026-09-19 | tech-lead (A5.1) | **The instrument verdict is credited ALONE, and T1a/T1b/T1c are DONE.** A3.3's (a)/(b)/(c) fuse *"this guard measures the rule"* with *"the product satisfies the rule"* — different findings, different owners. The first is settled without a browser: the eleven A3.2 cases reproduce `legal.md` §8.1's worked table **including the red row**, and **C1 toggles exactly one operand** (`viewportHeight` → `+∞`) to turn that row green, proving the **containment** conjunct is what fails DS1 P4. **The `scrollY = 0` diagnostic closing `reports/build.md` is CLOSED, not deferred**: it described the pre-T1c sweep. `clearingScrollRanges`'s `from = max(0, docTop + height − viewportHeight)` and `to = min(maxScroll, docTop)` **are** the containment conjunct — it is what C1 toggles and why DS1 P4 can return empty at all. Not a fourth architectural guess; the instrument that had the defect was deleted by T1c. |
| 2026-09-19 | tech-lead (A5.2) | **The subject verdict is credited as NEITHER (a) NOR (c) — because the one `copyA` cell that exists was measured in an environment the product does not ship.** `playwright.config.ts:66` pins `NEXT_PUBLIC_ENABLE_ADS: "true"` unconditionally, while `.env` and `.env.example` ship **`false`** and `ci.yml:140,147` turns it off for Lighthouse with the committed comment *"the e2e build above runs with ads on so the suite can assert their behaviour"* — **the repository says in its own words that ads-on is an instrument artefact.** Ads-on: `copyA` `maxScroll` **2331**, needs `s ≥ 2857.4 + 121.7 − 766 = 2213.1`, window `[2213.1, 2331]`, green → shape of **(c)**. Ads-off: **never measured**, and `2331 − 132 = 2199` is arithmetic **A4.3 rule 4 still forbids** — attributing a delta names *which operand moves the number*, it never says what the number reads. **T1d takes the cell.** One missing cell of an already-attributed operand, by a procedure already proven to the integer; not a fifth mechanism. |
| 2026-09-19 | tech-lead (A5.3) | **The binding measurement environment is the product default, ads OFF, and every geometric number carries its ads state.** The 132 px sit **below** every disclosure, so ads-on **raises `maxScroll` and widens every LR3.5 clearing window**: **the guard runs against a strictly more forgiving page than the default build ships**, which is lesson **016**'s shape one level up — a predicate evaluated against the wrong subject. **Nothing is red today**: `copyB` clears DS1 P4 ads-off too (`[2197.1, 2215]`), so `legal.md` Addendum B's **F1 discharged** ruling is robust in both environments and is not re-opened. `playwright.config.ts` is outside § Scope and is **not** edited — the pin has its own reason (the suite asserts ad behaviour) and the finding is routed with an owner and a trigger. |
| 2026-09-19 | tech-lead (A5.4) | **The ad creative's 100 → 390 px growth is two findings with two owners, and neither is folded into this spec.** (i) **Measurement determinism — `tech-lead`, binding now**: every geometric read in this spec is taken at the **early settle point, before the creative resolves**, with elapsed ms printed. Nothing already measured is invalidated — the shipped assertions read at ~250 ms, not near 2 s — so this makes true-by-luck into true-by-intent. It **amends A4.3's *"read settled"***: for cells whose subject is document height, *settled* means after `BANNER_DELAY_MS` and before the creative resolves, and where both cannot be had the early read is of record and the conflict is reported. (ii) **A test suite reaching `pagead2.googlesyndication.com` — `product-manager`, against spec `0014`, trigger immediate**, because CI does it too (`ci.yml:82-85`). It is a `PRODUCT.md` §8 and privacy question and it is not architecture. |
| 2026-09-19 | tech-lead (A5.5) | **D-5 goes to `labor-law-analyst` as numbers, not as a conclusion, and `tech-lead` records no attribution.** `frontend-dev`'s counterfactual came back against the assumption — `copyA` shows all seven surfaces `found: true`, zero `guard defect:` — but it is measured in one environment only, and the question that decides it is legal, not architectural: **which document is LR3.5's subject, the page the default build ships or the page the committed test config always measures?** Ads-on, `0003`'s footer rewrite alone discharges F1 and T3 is not the remedy; ads-off, T1d's cell may say the opposite. Copied to `product-designer` (§17 is one of the two readings). **D-3 is discharged** — DS2 and DS7 art. 59/71 re-swept on both copies, all `found: true`, which is what W14 asked. |
| 2026-09-19 | tech-lead (A5.6) | **T5 is unblocked, and the ads pin changes exactly one task.** The attribution gates no source file — T3 is in the tree under every branch, nobody proposes removing it, and `legal.md` A1.7's M-B → M-O ordering is satisfied by T3 as delivered. **Resume order: `T1d` → `T5` → `T6` → `T4′` → `T7` → `T8`**, T1d first because it is one build, needs no other agent, and no two browser measurements may run at once. **T5, T6, T4′ and T7 are unchanged** — grepped, not assumed: no absolute `scrollHeight`/`maxScroll` literal, and their guards are viewport-relative comparisons above the ad slot. **T8 is amended**: its `g1-*` rows run **ads off** (matching their own before-numbers, taken under `.env`), its `pnpm exec playwright test` row runs **ads on**, each row is labelled, and reconciling the two is a category error. **`g1-scroll.mjs` scrolls to `scrollHeight` and `g1-fold.mjs` prints it, so AC7 and AC1 move with the ads state** — by up to 132 px, five times AC7's entire expected delta, which is the failure this ruling is worth. |
| 2026-09-19 | tech-lead (G10 candidate, deferred — lesson cap is 30/30) | **The lesson this cycle owes and may not yet write**: *name the environment variables the measuring instrument's own build sets, not only the files it reads — a spec that pins its subject by file hashes still measures two different documents when two harnesses set one `NEXT_PUBLIC_*` differently.* Three sessions hashed seven files and compared numbers taken from builds whose env differed. The cap forbids a new lesson until something is promoted or retired, and the pressure is the point; recorded here so G10 writes it rather than re-deriving it. |
| 2026-09-19 | tech-lead (G4, `plan.md` §3D Amendment 4) | **T4′ is written, from `design.md` §17.15, and the developer chooses nothing in it.** The relocated surface is an **atom** — `components/atoms/estimate-notice.tsx`, a single `<p>` with a frozen 170-character text node, no props, no `lib/` data, no link, nothing focusable — because run 1's molecule was justified by composition (text **plus** a `CURRENT_LEGAL_YEAR` link) and that justification left with the surface. **`components/molecules/table-citation.tsx` is struck from every list in the plan and from `spec.md` § Scope**; the three § Scope paths are now `work-calculator.tsx`, `hero-panel.tsx` and `estimate-notice.tsx`. `citationParagraph` is **kept, unchanged, still pointing at the footer's `F-1`**, which stays whole with all four `<a>`. The footer keeps **P1, P3, P4** — Q-D's count (4 → 3) was right and its list of survivors was wrong. |
| 2026-09-19 | tech-lead (A4.1) | **Two small deviations from a binding document, both recorded rather than taken silently.** (i) `design.md` §17.8 mandates composition through `cn()`; its stated subject — a *caller's* size class deleting the colour class — **cannot exist**, because the atom takes no props. §17.8 is binding, the cost is one import, so `cn()` ships; **the developer does not add a `className` prop to give the call a subject**, which would be scaffolding for a caller this spec forbids. (ii) §17.15 item 4 requires AC1's surface to be located by **position** and never by a pt-BR sentence. A positional selector satisfies the letter and breaks on any wrapper; the task uses **`id="estimate-notice"`** — the tree's own idiom (`annual-period-disclosure`, `regime-federal-rpps-gap`) and not a string the copy gate owns — **and asserts the positional claim separately**, as clause 0: the notice's previous element sibling contains the hero value. Both conjuncts checked, neither traded for the other. |
| 2026-09-19 | tech-lead (A4.2) | **T6 becomes a geometric precondition of T4′, and the guard is the comparison, never the literal 6,4.** Without M-D the hero card ends at **723.4**, the budget is **34.6** and the 52.2 px surface fails by **17.6** — so `T3 → T5 → T6 → T4′` binds for a second, independent reason beside `legal.md` A1.7. The guard reads all four operands in the browser in one frame (`heroCardBottom`, the notice's computed `margin-top`, `noticeHeight`, `navTop`) and asserts `heroCardBottom + gap + noticeHeight ≤ navTop` **plus** the adjacency conjunct `heroCardBottom + gap == noticeTop ± 0.5` — without the second, a notice that has drifted out of the cell still satisfies the first. **No measured literal appears in any expected value or threshold**; they appear only as the numbers the developer pastes. T4′'s red baseline is **T4′ applied with T6's three `hero-panel.tsx` hunks reverted in the copy** (slack ≈ −17.6), not the pre-existing locator-not-found red, which proves nothing about geometry and is explicitly not credited. |
| 2026-09-19 | tech-lead (A4.2) | **The A1.3 reorder put T6 in front of the task that makes AC13's count true, and that is named rather than discovered at G5.** `EXPECTED_LINES_ON_FIRST_SCREEN` already carries the **post-move** counts (9 on `/`, 10 on `/custo-da-hora`), and the relocated `<p>` is the leaf that makes them true, so **between T6 and T4′ the AC13 line count is an expected red with a named signature (8 and 9) while `linesOccluded == 0` must be green.** T6's *"`pnpm e2e` fully green"* clause was unsatisfiable through no fault of T6 and is amended. **The inverse is the finding:** a count that goes green at T6 was satisfied by a leaf other than the notice. |
| 2026-09-19 | tech-lead (A4.3) | **§17.17's `maxScroll` 2215 against the run's 2347 decides A3.3's branch, so the pre-declared expectation of (c) is struck.** The A3.3 run's own B4 table reads `copyA` `docTop` **2857.4** (= `copyB` +16, exactly D1's reverted top step), `maxScroll` **2331** (= −16, exactly `+16 − 32`), window `[2213.1, 2331]` — internally consistent, zero `guard defect:`, and `frontend-dev` was right to refuse to certify it as (c). **`copyA` needs `s ≥ 2213.1`; take the same 132 px off it that separates 2347 from 2215 and its cap is 2199 → the set is empty → verdict (a)**, the opposite branch, with a different owner and a different remedy. `copyB` is green on **both** readings (`[2197.1, 2215]` and `[2197.1, 2347]`), which is why `legal.md` Addendum B's ruling that **F1 is discharged** is robust and is not re-opened — **what is not robust is the attribution**, and `frontend-dev`'s reading that *"`0003`'s footer growth alone discharges F1, independent of T3"* (D-5) is precisely the claim that flips. A3.3's *"verdict (c) is the expected one"* paragraph is struck; **neither branch is expected and the settled measurement decides.** |
| 2026-09-19 | tech-lead (A4.3) | **`maxScroll` fuses `scrollHeight` and `innerHeight`, which is why ten printed rows left the gap unattributable — and the fusing is what B4 is amended to undo.** **H1, the viewport, is REFUTED by the run's own table** (`viewportHeight` **844** in 10/10 rows; the exact `3059 − 712 = 2347` arithmetic that made it attractive is a coincidence, recorded as refuted so nobody re-derives it). **H2 names a candidate that accounts for the delta to the pixel:** `ad-manager.tsx` renders in `app/layout.tsx` **after** `{children}`, so it is below the footer and cannot move `docTop` — which is the exact shape of a delta that leaves `docTop` and `h` identical to the decimal — and its box is `pb-8` (32) + `min-h-25` (100) = **132 px**, collapsing to **0** under `if (!adClient || !enableAds) return null` on env read at **build time**. **That is arithmetic on a class string and an env guard, not a finding** (lesson **050**), and a build-time env difference is exactly what an isolated worktree does *not* isolate. **H3** is the settle point: the B4 probe read at `load` with the privacy shield still in the `fixed` list, §17 read settled, and the `<ins>` is the one box whose height is decided after load. **The measurement is one probe, not a re-run** — `scrollHeight`, `viewportHeight` and `maxScroll` as three separate fields at **two** settle points, the tail and its blocks at both, both copies, in the named reconciliation cell (`/`, 390×844, `empty`, consent pending, dark), and `copyA`'s settled window **measured, never derived by subtracting 132**. Non-empty → (c); empty → (a); **a third reading of this quantity is a fifth mechanism and goes to the human under A3.4.** |
| 2026-09-19 | tech-lead (A4.3) | **Two agents are on the same geometry and neither closes the other's question.** `labor-law-analyst` rules whether **M-B discharges F1**; `frontend-dev`'s `copyA` run under T1c is the **only** instrument that answers *does F1 reproduce with this spec's own remedy removed*. **`design.md` §17 measured only the state with T3 in and says so itself (§17.17), so no cell of §17 may be read as verdict (a), (b) or (c)**, and no T1c verdict is a legal ruling on F1. `tech-lead` records both and routes. |
| 2026-09-19 | tech-lead (memory, out of cycle) | **The rule this bounce produced went into `AGENTS.md` §5 as a corollary, not into the ledger, because the ledger was back at 30/30 and the parent rule was already promoted.** §5 already says *"where two correct readings of one quantity disagree, find the state that accounts for the delta"*; what it did not say is **why that was impossible here** — `maxScroll` is `scrollHeight − innerHeight`, and a quantity printed **fused** cannot be reconciled against a second reading at all. The added clause: **a derived quantity is printed with its operands, never alone, whenever a stop condition turns on it** — a ratio with its numerator and denominator, a slack with its budget and its spend — because printed unfused, the one operand that moved **is** the attribution. **No lesson was retired to make room for a new one**; the cap is the pressure and a forced retirement to hit a number is how a live rule disappears. |
| 2026-09-19 | tech-lead (G10 sweep, out of cycle) | **Lesson 032 reached three confirmations (specs `0004`, `0010`) and is now a rule**, promoted into **`AGENTS.md` §5** as *How a finding routed from another gate is inherited* and retired from the ledger (**30 → 29**). It cuts across agents, so it did not go into one agent's definition: a routed note's **numbers** and its **explanation of those numbers** are two claims at two confidences; carry the numbers, earn the explanation again, verify the artifact rather than its name, and when the mechanism does not reproduce, leave the cause open instead of substituting a guess that inherits the same unmarked confidence. **Nothing else was promoted** — 005, 015, 017, 022, 027 and 050 sit at two and a forced merge to hit a number is how a rule arrives without its third case. |
| 2026-09-19 | product-designer (`design.md` §17, G3 run 2) | **M-R relocates `DS1 P2`, not `DS1 P4`, and `0003`'s `F-1` stays in the footer whole.** Re-measured on an isolated production build of the current working tree (rendering inputs pinned by `sha256` in §17.0 — `HEAD` `5c0c6fa` plus uncommitted work, because a bare sha does not identify the bytes; port 3920, confirmed free; `uptime` 13.21 on 16 cores; `pgrep` showed no sibling browser measurement in flight; never `next dev`). `F-1` in the `aside` slot measures **`h` 121.7, 7 line boxes, 56.86 cpl at `w` 358** — reproducing `0003`'s M16 independently, in the destination — and lands **`707.4..829.1`** on `/`, **intersecting the fixed route nav at 766..828**, clearance **−63.1**, in all ten `/` cells. Run 1's `h` 34.8 and +23.8 are dead; the whole **−86.9** delta is the paragraph's own growth and the box's top is unchanged at 707.4. |
| 2026-09-19 | product-designer (`design.md` §17.2) | **Q-B answers no, and the subject of the failure is a container constant, not the paragraph** (lesson **054**). The first screen's budget below the answer on `/` at 390 is **`navTop 766 − heroCardBottom 699.4 − gap 8` = 58.6 px = three line boxes**; `F-1` needs seven. **No ordering fixes it:** {hero card 619.4, `F-1` 121.7} = 741.1 against a 701 px clear band, over by **40.1 px even at a zero gap**. The one arrangement not excluded by that arithmetic — the citation **above** the hero card — was **measured, not argued** (`evidence/g3r2-placement.txt`, 16 cells) and rejected: **AC2** fails by **+121.7** (answer label `vtop` 234.4 against a 112.7 baseline) and the hero card that holds the number is itself intersected by the tab bar, which is finding **O**. |
| 2026-09-19 | product-designer (`design.md` §17.3) | **The A1.2 conditional route to `labor-law-analyst` (L5) does NOT fire, on `legal.md`'s own text.** §6 names **four** candidate whole surfaces — P4 34.8, **P1 52.2, P2 52.2**, P3 139.1 — and rules that relocating *"one of these"* whole satisfies R with zero new copy, *"the placement stays G3's"*. L5's subject is a **split or a shortened string**, and this design is neither: `0003` killed one row of that table, not the table. All three remaining candidates were **measured in the destination**, not picked off the table: P1 and P2 are geometrically identical (`h` 52.2, 3 line boxes, `707.4..759.6`, clearance **+6.4** on `/`); P3 fails at **−80.5**. **P2 is chosen on its claim, which is this gate's call:** it names *holerite* and *registro oficial de ponto* — the outputs of the two routes — so LR6.1 pairs it with the figure in the hero card, where P1 qualifies the storage and not the number. **R passes 20/20 at 390**, both themes, four storage states, consent pending and answered; 8/8 at 2560/3840 with no horizontal overflow. |
| 2026-09-19 | product-designer (`design.md` §17.4) | **F1 is discharged by M-B, not by M-R, and that is measured on the grown footer.** With T3 in source, LR3.5's clearing interval is **non-empty for all four DS1 paragraphs in 8/8 cells**, both consent states, both routes; the tightest headroom is **18.0 = 96 − 78**, the bottom reserve minus the tab bar's band — **the constant is what passes, not the paragraph**. Removing P2 from the footer moves `F-1`'s headroom by **+0.1 px**: the *margin* is invariant while every *absolute* moves, said separately so a downstream gate calibrates on the right one (lesson **061**). The state where a **different** element is last was measured in both directions — consent surface last, footer last — so the remedy was not re-tested against the finding (lesson **054**). |
| 2026-09-19 | product-designer (`design.md` §17.7/§17.9/§17.13) | **`TableCitation` is withdrawn; the component is `EstimateNotice`, an atom at `components/atoms/estimate-notice.tsx`.** One `<p>`, a frozen text node, no child element, no `lib/` data, no link — `components/atoms/alert-banner.tsx` is the precedent for a text-bearing atom, and run 1's molecule was justified by a composition that left with the surface. Two consequences: **M-R adds nothing focusable to the first screen**, so run 1's visual-order/tab-order finding is **withdrawn as a product of this spec** (the pre-existing `order-first` divergence stays routed to `0008`, trigger unchanged); and `components/molecules/table-citation.tsx` **leaves § Scope** while `components/atoms/estimate-notice.tsx` joins it. **No token, type step, spacing value, curve or elevation is added — run 2 carries no new system change, and S1/S2/S3 are untouched.** |
| 2026-09-19 | product-designer (`design.md` §17.11) | **M-D (T6) is a precondition of M-R, in the geometry and not only in the file order.** Without M-D the hero card ends at **723.4**, the budget falls to **34.6 px**, and a 52.2 px surface fails by **17.6**. `T3 → T5 → T6 → T4′` is therefore binding for this reason as well as for `legal.md` A1.7's. The surface's ceiling is stated as the comparison — `heroCardBottom + --spacing*2 + surfaceHeight ≤ navTop`, today `759.6 ≤ 766`, **6.4 px of slack** — and `plan.md` must guard the comparison, **never the literal 6.4**, because the two owners who can spend it are `content-writer`/`0003` (a longer string) and `product-designer` (a taller hero). |
| 2026-09-19 | product-designer (`design.md` §17.5/§17.17) | **Two couplings reconciled, one number handed back without a verdict.** **Amendment 2 is unaffected:** the nearest-non-inline-ancestor walk resolves DS1 P4 to the footer `<p>` — the node `citationParagraph` resolves to, so V1/V2 hold — and resolves DS1 P2 to itself, since it has no element children. **Amendment 3's predicate is the one §17 uses**, the closed-form interval and never a sample loop, and no window reported is narrower than **17.9 px**, so A3.3's **B5** has no subject here. **But §17 measured only the state with T3 IN**, so nothing in it may be read as verdict (a), (b) or (c) — `frontend-dev`'s two-copy A3.3 run is the only instrument for that. And §17 reads `maxScroll` **2215** on `/` at 390 empty where A3.2's projection uses **2347**, giving `[2197.1, 2215]` rather than `[2197.1, 2347]`. The **132 px is not attributed here and no verdict is derived from it** (lesson **050**; `AGENTS.md` §5's *find the state that accounts for the delta*); it is handed to `tech-lead` because branch (c) turns on exactly this quantity. |
| 2026-09-19 | product-designer (`design.md` §17.5) | **Q-D: `DS1_EXPECTED_PARAGRAPHS` 4 → 3 holds, but the survivors change.** Measured `footerParagraphs` = **3** in every variant-C cell. **The footer keeps P1, P3 and P4** — not P1, P2, P3 as A1.2's question assumed — so any guard naming the survivors names those three. The relocated surface is a **fourth DS1 measurement site, not a deleted one**: re-measured in its new container it is `w` **358** (LR1 floor 320 ✓), chrome spend **0** ≤ 32 ✓, **56.67 cpl** ≥ 40 ✓ — identical to its footer values, because the column and the footer are the same 358 px wide at 390, the container `legal.md` **L4** names as the one that qualifies. **AC13's corrected counts are unchanged and re-measured: 9 / 10, split 8+1 and 9+1, `linesOccluded` 0 in 16/16.** |
| 2026-09-19 | product-designer (memory) | **Lesson written before moving on, per `AGENTS.md` §6, as the rule and not the incident:** size a relocated element from its destination container's budget stated as a comparison, and re-measure the element itself in the state the sibling spec in flight will deliver — a placement derived from an element's current height inherits every edit another spec is about to make to that element, and the pixel delta then looks like the finding when the container constant was the finding all along. |
| 2026-09-19 | **human** (delegated to `tech-lead` for this batch, recorded at the third G5 bounce) | **The pipeline continues past the two-bounce ceiling on the LR3.5 mechanism, and `tech-lead` rules rather than parking it.** `AGENTS.md` §4 sends a third bounce on the same gate to the human; the approval to continue was given and the ruling delegated. It covers **`plan.md` §3C Amendment 3 and its run, and nothing beyond it**: A3.4 states that anything outside verdicts (a)–(d) — a fifth mechanism, a new `guard defect:` class, or a disagreement between the calibration and the live run — stops at `tech-lead` and returns to the human with the impasse, the options and a recommendation. **No agent gets a fourth architectural guess at this guard.** |
| 2026-09-19 | tech-lead (§3C A3.0/A3.1/A3.2) | **The LR3.5 guard implemented one conjunct of a two-conjunct rule, and restoring the other is a measurement fix, not a legal one.** `legal.md` §8.1 states the predicate as *whole border box inside the viewport* **and** *no fixed or sticky box intersects it*; the guard shipped only the second, so a surface ~2 000 px below the fold satisfied it at `scrollY = 0` — identically for the `<a>` and for the `<p>`, which is why Amendment 2 changed the element and not the verdict. **Proof that this is `legal.md`'s own reading and not a reconstruction:** the two conjuncts alone regenerate §8.1's seven-row worked table, six rows to the digit, DS2 to 0.1 px, **including DS1 P4's empty range**. The sample loop goes with it — at `maxScroll ≈ 2490` its spacing is **42.2 px** against DS1 P3's **28.6 px** window, a **false red** waiting to fire — replaced by the interval algebra the rule is already written as. **The guard is seen red in arithmetic before any browser runs** (A3.2 control **C1**: the same DS1 P4 row goes green the moment the containment conjunct is disabled), because three live runs have now produced a green LR3.5 for three different wrong reasons and `0003` has already moved every document-height quantity a fourth would read. **What is NOT ruled here and is routed instead:** whether a clearing range narrower than 1 CSS px is a *reachable* scroll position — that is `legal.md` Addendum A1's attainability axis, it is `labor-law-analyst`'s, and A3.3 B5 reports it without asserting on it. |
| 2026-09-19 | tech-lead (§3C A3.3) | **The second defect was in the run, not the guard: a red baseline was taken on a tree that already contained this spec's own remedy.** T3 **is** M-B. A1.4 ordered the re-take *"on the current head"* at a moment when no source file had been edited, and that phrase silently stopped meaning *unfixed* the moment T3 landed — so even a correct guard could have been legitimately green there and would still have been read as a defect. The re-take is **two runs from one snapshot**, `copyB` rsynced from `copyA` and never from the worktree (`0003` is active in this tree and moved `maxScroll` by **144 px** between the two existing probes, which belongs to neither this spec's edits nor its guard), with `copyA` reverting **exactly two class strings** — `mb-8` and the `pt-` phone step — and **not** `0003`'s footer rewrite and **not** T2, which moves no box. **Four verdicts in four branches, because *this guard measures the rule*, *the product satisfies the rule*, *T3 fixed it* and *there was nothing to fix* are four different findings with four different owners.** |
| 2026-09-19 | tech-lead (§3C A3.3 verdict (c)) | **If F1 no longer reproduces on this head, that is `labor-law-analyst`'s to rule and not mine.** `legal.md` §8.1 measured **63.8 px** of document below DS1 P4's bottom; the A2.3 probe measures **~196 px** and a paragraph **121.7 px** tall where L5's premise says **34.8**. If `copyA` comes back green on DS1 P4 with the calibration green, F1's stated mechanism has been discharged by **`0003`'s footer rewrite**, not by this spec, and both **F1** and **L5** rest on numbers that have moved. That is a legal re-measurement: it routes to `labor-law-analyst` with both B4 tables and the calibration output, **copied to `product-designer`** because A1.2's Q-A…Q-D reads the same geometry. `tech-lead` records the route and rules on neither. The arithmetic that makes (c) the expected outcome is written into the plan **as a projection that is explicitly not a finding** (lesson **050**) — it exists so (c) is not mistaken for a fifth guard defect, and it is measured, never reported. |
| 2026-09-19 | tech-lead (memory) | **Two lessons written and one promoted at this bounce, before moving on.** **065** — solve a predicate over a continuous parameter in closed form when the rule states it as an interval, because a finite sweep's start and spacing are thresholds nobody declared (this sweep's 42.2 px spacing against a 28.6 px window was a false red waiting to fire). **066** — take a red baseline from a snapshot with *this spec's own* remedy reverted, named hunk by hunk, and take the verification run from a copy of that same snapshot. **016** reached its third confirmation here — *bound a layout assertion on both sides* is exactly the shape of a guard that forbids overlap and never requires visibility — and is **promoted into `.agents/agents/tech-lead.md`** and retired, widened to *implement the rule's predicate as the whole conjunction its text states* and to *calibrate against the gate's published worked measurement when the tree has moved and a live red run is no longer available*. The lessons ledger was at its 30 cap; the promotion is what made room, which is the pressure working as designed. |
| 2026-09-19 | tech-lead (§3C A3.5) | **`__tests__/zzz-debug.test.tsx` is routed to `0003`, not deleted.** Untracked, failing lint, outside T1–T8's file list, in a tree where four developers are active — exactly the state lesson **060** says never to read as dead code from `grep`. It is carried in the lint accounting with its owner, like `0008`'s `column-stability.spec.ts`, and it does not block T1c. |
| 2026-09-19 | tech-lead | **The `0003` collision ruled for both specs (`plan.md` §3A Amendment 1), and the repair lands in this spec's own files.** `0003`'s T2 deleted `LegalYear.source` / `.sourceUrl` / `.effectiveFrom` and rewrote footer P4 into its 398-character, four-anchor `F-1`. Three facts decided it. (1) **`citationParagraph` is live**: seven hits, one declaration plus **six call sites** in `tests/e2e/first-screen-reachability.spec.ts`, this spec's own T1 output — the dead-code reading was wrong and deletion is off the table. (2) **The break is wider than the field**: `first-screen-reachability.spec.ts:30`/`:36` pin the prose `"Tabelas de INSS e IRRF de"`, which `typecheck` cannot see, so the guard would have mis-located DS1 P4 **silently** while the type error got all the attention. (3) **T4's premise is dead** — it mandates a byte-identical move of a paragraph that no longer exists, placed from a measurement of `h` **34.8** with **23.8 px** of clearance. Every remedy for (3) is a design or a legal call, so T4 is deferred and routed rather than improvised. **The repair is bound to values, not to sentences**: `sources.rgpsBrackets[0].norm` for the locator and for the DS1 P4 marker, `"Súmula 172"` for DS2 — the one fragment common to the shipped caption **and** to the one `0003`'s T5 mandates, so the marker is correct before and after it. `0003` has six tasks left that rewrite pt-BR citation prose; a guard pinned to prose would have bounced twice more. |
| 2026-09-19 | tech-lead | **A dependency this gate wrote itself is removed, and one it did not is kept.** T5's dependency on **T4** was a serialisation of two edits to `calculator-views.tsx` inside one spec — a file-ordering convenience, not a constraint from any input — so it is removed and T5 runs after T3. `legal.md` **A1.7**'s **M-B before M-O** is **not** this gate's and is untouched. Verified against every `Files:` line of `0003`'s `plan.md` that `0003` never opens `calculator-views.tsx` again after T2, so T5 may take that file now. Deferring T4′ to after `0003` closes also dissolves the second collision — `0003`'s **T9** and this spec's **T4** both edit `tests/e2e/support/legibility.ts` and `tests/e2e/disclosure-legibility.spec.ts` — at zero cost, in that order. |
| 2026-09-19 | tech-lead | **T1's red-run baseline is stale and is re-taken, and the two verdicts are kept in separate branches.** `docTop` **2727.2**, `scrollY` **2504.2** of **2490**, **1228.6** of **1215** are all document-height quantities, measured before `0003`'s T2 grew the footer from **302.25** to **389.20 px**. None of that movement is this spec's. Both baselines go into `reports/build.md` labelled, and **T8 measures against the re-taken one**: *"this movement made the quantity worse"* is a `frontend-dev` finding, *"the quantity is over target"* may be `0003`'s footer and is a routing call, and a delta against a stale baseline reports the second as the first. The same separation is written into T1a step 5 for the markers — a marker that matches nothing must fail as a **marker** error, never as an LR3.5 verdict. |
| 2026-09-19 | product-manager | **B4 answered: an acceptance criterion may name a non-shipping instrument only when its verdict is consumed in the session that produced it.** Written into `spec.md` § Acceptance criteria as a **test, not a list of paths** (`AGENTS.md` §5): *can this criterion still be falsified, after the spec closes, by an agent who has only the repository?* Must-be-yes → the instrument ships on a tracked path; no → `evidence/` is fine and the **pasted output is the durable artifact**. Applied: **AC1** and **AC13** score against the committed `tests/e2e/` specs `plan.md` names (the `evidence/*.mjs` paths are their baseline twins); **AC2, AC3, AC7, AC15** are ceilings later specs re-measure, so each pastes its baseline **and** its instrument source into `reports/` or moves under `tests/e2e/` — `plan.md` picks which, per criterion, at G4; **AC4** stays in `evidence/`, being one agent's two dumps minutes apart. `tech-lead`'s mitigation is endorsed, not replaced. Verified against known-bad/known-good this session (lesson **040**): `git check-ignore -v` on `g1-fold.mjs`, `g1-occlusion.mjs`, `g1-firstinput.mjs` → **`.gitignore:55`**, all three ignored; `git ls-files tests/e2e/` → **9 tracked**, including `disclosure-legibility.spec.ts`. **The ruling generalises** — it follows from `evidence/` being gitignored and from nothing about disclosures — so its home is **`AGENTS.md` §5, beside *How a criterion is written***, and **I have not written it there**: promotion is `tech-lead`'s at G10, trigger *the next spec whose acceptance criteria name an `evidence/*.mjs` command*. No other criterion re-opened; scope untouched. |
| 2026-09-19 | tech-lead | **B4's ruling is promoted and the trigger is discharged.** It now lives in **`AGENTS.md` §5 *How a criterion is written*** as its own bullet: a criterion may name a non-shipping instrument only when its verdict is consumed in the session that produced it, tested by *can this criterion still be falsified, after the spec closes, by an agent who has only the repository?* — must-be-yes ships the instrument under `tests/`, no leaves it in `evidence/` with the pasted output as the durable artifact, and `git check-ignore -v` plus `git ls-files` are the check. Promoted without a ledger entry because `product-manager` had already derived and verified it here; the trigger *the next spec whose acceptance criteria name an `evidence/*.mjs` command* no longer fires |
| 2026-09-19 | **human** (delegated to the owner for this batch, recorded by `tech-lead` at G4) | **S1, S2 and S3 are APPROVED.** `design.md` §15's three `DESIGN.md` system changes are human approval points under `AGENTS.md` §4 and the owner approved all three and delegated the calls for this batch. **S1** — the hero panel gains a 24 px phone padding step, resolving a contradiction already inside `DESIGN.md` towards its own density table. **S2** — the 390 row's bottom reserve is redefined from the constant `pb-16` (64) to **96 px**, because the tab bar occupies **78** and 64 < 78 is the mechanism of F1, seen red twice. **S3** — the Same-Path Rule's consent-banner example becomes local (`y: 12`, not `y: 100`). Written into `DESIGN.md` by **T7**. **Not re-opened at G4.** |
| 2026-09-19 | **human** (Q5, recorded by `tech-lead` at G4) | **`0011`'s RV1–RV3 and the replacement of `cookie-consent.tsx:56`'s *"a qualquer momento"* are planned as ONE shippable unit — in `0011`.** `legal.md` A2.4 binds `0010` as a **prohibition, not a task**: no string asserting or implying that a revocation takes effect immediately may be written, reworded, strengthened or newly rendered here. M-O moves that string's container and does not edit its text, which under `0008` §6 O2 and lesson **002** is neither re-endorsement nor rejection. `copy.md` is a no-op and AC5's exemption list is **EMPTY**, so W13 is satisfied **by construction** — and it is recorded so a later task cannot spend it without tripping the clause. **If replacing that string turns out to need words, that reopens `content-writer` — in `0011`, not here.** |
| 2026-09-19 | tech-lead (G4) | **The plan is ordered by a precondition, not by convenience: T3 (M-B) lands before T5 (M-O), and if T3 is dropped T5 is dropped with it.** `legal.md` A1.7 promotes M-B from remedy to precondition on the attainability axis of **LR4.2a**. The evidence is this spec's own near-miss: with M-O and M-R but a 64 px reserve, **DS1 P3 inherits the failure DS1 P4 had** — `scrollY` **2529.6** of **2516** on `/` and **1162.8** of **1149** on `/custo-da-hora`. The cause is that the reserve (64) is smaller than the band the tab bar occupies (78), so *whatever is last* is unreachable; relocating the failing surface hands the breach to its neighbour (lesson **054**). T3's own **Done when** is written to make that visible: after T3, DS1 P4 **still** fails LR3.5 and **no new surface** fails, and that asymmetry is the proof M-B is a precondition and not the remedy. |
| 2026-09-19 | tech-lead (G4) | **LR4.2a is measured as one conjunction at one scroll position, never as two facts at two positions.** `(∃x. A) ∧ (∃x. B)` is not `∃x. (A ∧ B)`, and it is the second the rule requires. T1's LR4.2a describe **asserts the control count — 6 per viewport per theme, 3 per level — before any predicate**, then finds a single `scrollY` satisfying all four clauses at once, and **computes the fixed-box intersection directly** rather than inheriting it from `g3-lr42.mjs`'s `inViewport`, which `legal.md` A4.2 proved has no occlusion term at all. The locator is derived from the obligation — the element carrying the consent controls, and the paragraph carrying `CURRENT_LEGAL_YEAR.source`'s link — never from a pt-BR string or a `marginTop` of `"48px"` this spec itself introduces (A4.3). **The 1440 cell is a sweep, not a probe**: the margin there is **1.7 px**, which `legal.md` calls a margin and not a result (W12). |
| 2026-09-19 | tech-lead (G4) | **LC1 is carried into T2 as the rule, not as the one-word fix it resolves to.** The value comes from `legal.md` A2.2, not from the developer: *a consent-bearing control renders the value carried by a stored record valid for its purpose, and the refusing value in every other case.* In this tree it resolves to `useState(false)` at `cookie-consent.tsx:15` **with `:17-26` untouched**, and T2's **Done when** asserts the diff for that file is **one line**. **LC1.7 is the axis a hasty fix breaks** and it gets its own named test on both layers, because "always open closed" inverts a valid acceptance on every reopen — a second art. 8º *caput* failure in the opposite direction. The seven axes each get a state to construct and a quantity to read, and **the three-state falsifiability control is mandatory**: LC1.3–LC1.5 measured before any consent, after an affirmative consent and after the save-without-touching path, with at least two of the three asserted to differ, or the zeroes mean nothing. The `0011` `version` field is **not** a precondition and LC1 is written so `0011` narrows *valid* inside `lib/consent.ts` without touching this component. |
| 2026-09-19 | tech-lead (G4) | **The numeric criteria are decomposed on the current build before any lever is accepted, and the two verdicts are kept in separate branches.** `plan.md` §1.2 breaks the 844 px first screen into its measured terms (fixed chrome **593**, unoccluded band **701**, answer panel **643.4**, free flow **57.6**, citation cost **42.8**) and states, per lever, which term it reduces and by how much. **D6's term measures near zero against the headline metric** — its 8 px sit on `/custo-da-hora` below the citation's landing point — and it is **kept for a stated reason**: it is what turns AC15's `#salario-bruto` delta from a wash into **−7.0**. A lever kept for a different term than the headline one is written down as such. **"This change made a term worse" (AC2/AC3/AC7/AC15 rising) routes to `frontend-dev` as an amended task; "the metric is over target" with every component term at or better than expected (AC1/AC13 red) routes to `product-designer`**, because the 32 cells were measured sufficient and the artifact disagrees with the document. The case where exactly one fires is what a fused branch gets backwards. **No fallback is pre-ordered**: `legal.md` §4.5 closed every remedy family but M-O's, so there is nothing to reach for, and the attribution comes before any option would. |
| 2026-09-19 | tech-lead (G4) | **The durable guard is Playwright, because `evidence/` is gitignored.** `.gitignore:55` excludes `.specs/*/evidence/`, so every `g1-*.mjs` a criterion names is unrunnable outside this working tree. R, O, LR3.5, LR4.2a and LC1 are therefore written as committed specs under `tests/e2e/` (`first-screen-reachability.spec.ts`, `consent-opening-state.spec.ts`), which CI runs. The `g1-*.mjs` instruments stay the **before/after** measuring device `spec.md` § Scope 5 names, re-pointed at the artifact under test, and their output is evidence for the reports rather than the guard. The underlying question is routed to `product-manager` as **B4**. |
| 2026-09-19 | tech-lead (G4) | **Two guards already in the tree would have gone vacuously wrong, and T4 amends both at the task that breaks them.** `tests/e2e/support/legibility.ts`'s `DS1_EXPECTED_PARAGRAPHS = 4` describes a footer that loses P4 in T4 — left alone it fails loudly, which is correct, but left **un-updated** it is a count nobody intends. And `__tests__/calculator-views.test.tsx`'s *"dates the tax tables and links the norm"* mocks `WorkCalculator`, so after M-R it asserts against markup that component no longer owns; its two halves move to `__tests__/table-citation.test.tsx` and to the two composing organisms. **T4 also adds the assertion that makes the *move* falsifiable from the footer's side** — `queryByText(/Tabelas de INSS e IRRF/)` is null in `calculator-views.test.tsx` — because without it a duplicate copy left behind passes every other test in the repo. |
| 2026-09-19 | tech-lead (G4) | **`design.md`'s line numbers are stale and T6 names elements by content instead.** `hero-panel.tsx:29/33/62` and `salary-calculator.tsx:78/246` do not match the tree as it stands; read directly, D5's `mb-8` is the **card header** block at `salary-calculator.tsx:261` and `journey-form.tsx:79`, and D6's `mt-6` is the `PeriodSelector` wrapper at `salary-calculator.tsx:429`. Three other `mb-8` and one other `mt-6` live in those files — the fields grid and two `CollapsiblePanel`s — and **none is touched**, because editing a collapsible would fire the `collapsible-panel.tsx` reduced-motion debt's trigger. T6 names each target by the element and the heading it wraps, never by a line number, so a stale coordinate cannot become a wrong edit. |
| 2026-09-19 | labor-law-analyst (G2 run 2 — addendum) | **The existential reading is CONFIRMED, and the universal reading is the defect.** LR4.2 and LR3.5 read **the same quantity** — `getBoundingClientRect()`, border box — about **the same predicate**, and LR3.5's own text already argued the quantifier in writing. `AGENTS.md` §5 forbids one rule set reading one quantity two ways without saying why. Executed against a known-good state (lesson **040**): the universal reading is *vacuous* on every `fixed` surface the app ships — which is why run 1 never exercised it, the ambiguity being **created by M-O, the first remedy to leave the overlay model** — and it goes **red** on any second-level dialog at a viewport shorter than its content, firing LR4 clause 3 and forcing a first level with no *Configurar*, which the ANPD guide names twice on p. 33. **A clause satisfiable only by breaching another binding principle is the clause that is wrong** (`AGENTS.md` §5). `design.md`'s 32 cells **stand**; no verdict is re-taken. |
| 2026-09-19 | labor-law-analyst (G2 run 2 — addendum) | **But the bare quantifier is not the ruling — LR4.2a adds the three axes it leaves open** (lesson **048**). **Attainability**: `∃ scroll position` must mean *reachable in the document as rendered*; the failing subject is measured in this spec — without M-B, DS1 P3 needs `scrollY` 2529.6 of 2516. **So M-B is promoted from remedy to PRECONDITION of M-O**, and a consent surface stranded under the tab bar is the ANPD's *"Impossibilitar ou dificultar a rejeição"* produced by geometry. **Simultaneity**: `(∃x.A) ∧ (∃x.B)` is not `∃x.(A ∧ B)` — one scroll position must serve LR4.2a and LR3.5 and every control at once, and **neither instrument asserts it today**. **Co-visibility**: LR4.4 clause 2 is a *comparison*, and a comparison between two controls never in one frame is not one the user can make. |
| 2026-09-19 | labor-law-analyst (G2 run 2 — addendum) | **Re-derived rather than quoted** (`AGENTS.md` §5). `g3-lr42.mjs`'s `inViewport` is `top>=0 && bottom<=innerHeight && …` — **it has no occlusion term at all**, so its `true` is not evidence about chrome. Intersections computed here from `evidence/g3-v4.txt`'s `fixedChrome` (`header 0..65`, `nav 766..828`, `shield 784..828`) against `evidence/g3-lr42.txt`'s boxes, **all at one and the same `scrollY` 2512**: surface `282.0..748.0`, controls `559..603`, `615..663`, `675..723` — **zero intersections, tightest clearance 18.0 px**, both themes. At 1440 (`scrollY` 808) the surface is `641.3..804.3` against a tab bar at **806**: it passes by **1.7 px**, which is a margin and not a result, so G6 sweeps that cell instead of probing one position. |
| 2026-09-19 | labor-law-analyst (G2 run 2 — addendum) | **F2a settled as LC1, and it is NOT `useState(false)` — it is a rule over the stored record.** The decisive unit is **art. 8º caput** (*"outro meio que **demonstre a manifestação de vontade do titular**"*) — neither §12 F2a nor `0011` §20.1 cited it; both argued from inciso XII's *inequívoca*. The caput is stronger because it needs no adjective read: a control nobody touched demonstrates nothing. **art. 8º § 2º** puts the burden of proof on the controller and the record `{telemetry, timestamp}` carries no operand distinguishing an act from a default; **art. 8º § 3º** then makes the processing *vedado*, not merely unsupported. Stated over **seven axes**, because a fix in one is silent in six. **LC1.7 is the row a one-word fix breaks**: a user with a *valid affirmative* record must see the switch **on** when reopening — "always open closed" is a second art. 8º caput failure in the opposite direction. At `HEAD`, `:17-26` already implements LC1.7, so LC1 resolves to `useState(false)` at `:15` **with `:17-26` untouched** — stated as the rule so the effect is not simplified away with it. |
| 2026-09-19 | labor-law-analyst (G2 run 2 — addendum) | **The `version` field is deliberately NOT a precondition of this spec, and LC1 is written so `0011` never has to undo it.** `0011` §7.5 rules every consent record predating the published page **null** under art. 9º § 1º and re-asks via a `version`; but with no page there is no version to be a version *of*. LC1 is therefore stated over *"a stored record **valid for its purpose**"*, so `0011` narrows what *valid* means **inside `lib/consent.ts`** and `components/organisms/cookie-consent.tsx` is unchanged by that narrowing — one file diff. |
| 2026-09-19 | labor-law-analyst (G2 run 2 — addendum) | **`0011` F3 (revocation ineffective until the next document, critical, measured) does not block this spec, and binds it as a PROHIBITION.** M-O makes the privacy shield unconditional, so art. 8º § 5º's *facilitado* strictly improves — **and that is exactly why** this spec may not write, reword, strengthen or newly render any string implying a revocation takes effect immediately. `cookie-consent.tsx:56` already carries one (*"a qualquer momento"*), which `0011` §20.2 rules measurably false and owns; **M-O moves its container, it does not edit its text**, so under `0008` §6 **O2** and lesson **002** that is not re-endorsement and **not a rejection**. Sequencing constraint for `tech-lead`: `0011`'s RV1–RV3 and that string's replacement ship **together**. Raised to the human as `legal.md` **Q5**. |
| 2026-09-19 | labor-law-analyst (G2 run 2 — addendum) | **Three of run 1's own stated causes corrected inline, at the gate that found them** — a verdict can be right for the wrong reason and the reason is what travels. **C1**: §4.6's *Persistence* ruling verified the **offer** of revocation and signed for the **effect**; the *gratuito e facilitado* half survives (and the shield stays load-bearing, removing it is still a G2 rejection), the *a qualquer momento* half is now a measured failure. Lesson **053** on the very ruling that produced it. **C2**: §4.6's *Placement* premise is true of Google Analytics and **false of the host** (`0011` F5) — narrowed to *nothing whose basis is **consent*** is processed first; **the permission itself is unchanged and still granted.** **C3**: LR4.4 clause 2 was calibrated at 390 and **fails at 1440** → finding **F2c**. **C4**: `lr2aSpend: 531.5` at 1440 is the **instrument** being wrong, not the surface — at `md` the subtraction measures siblings, not chrome, so clause 1 stays at 390 **for a stated reason** rather than by omission. |
| 2026-09-19 | labor-law-analyst (G2 run 2 — addendum) | **Instrument audit before signing** (`AGENTS.md` §5). `g3-lr42.mjs` is a **reporter, not a guard**: against an empty collection and against an all-exempt one it prints the identical `"controls": []`, so it cannot discriminate. It also measured **3 of the 6** controls in LR4.2a's domain — it never opens the second-level dialog. **Not a rejection** (the dialog is `fixed`, untouched by all four movements, and §4.7 measured its three controls this gate), but a G6 obligation with an expected count of **6 per viewport per theme**, plus: assert the count before the predicates, compute the intersection directly, and derive the root from the obligation rather than from a pt-BR string and a `marginTop` of `"48px"` that this spec itself introduces. |
| 2026-09-19 | product-designer (G3) | **The first screen at 390 has no free space, and that is the design problem — not the banner.** Measured on an isolated production build (`evidence/g3-baseline.mjs`, own `.next`, port 3910): the unoccluded flow band between the fixed header (0..65) and the fixed tab bar (766..828) is **701 px** and the answer panel on `/` is **643.4** of it in 8/8 cells. Flow height is conserved, so a 34.8 px surface brought onto the first screen is paid for out of what is already there. Every G1 baseline reproduced to the tenth of a pixel before anything was proposed — `fixedSum 593`, panel `96..739.4`, label `133.8`/`133.1`, `linesOccluded` 4/6/5, `#salario-bruto` 880.5/864.1. |
| 2026-09-19 | product-designer (G3) | **Four moves, measured in 32 cells.** **M-O** — the consent surface leaves the `fixed` overlay and becomes the last block in document flow (the only family `legal.md` §4.5 leaves open; §4.6 grants the permission and `analytics-wrapper.tsx:12` proves nothing is processed first). **M-R** — DS1 P4 **moves** (not copies) from the footer into the page column 8 px under the answer panel, `w` 358, `h` 34.8, zero new copy. **M-B** — the document's bottom reserve 64 → 96 px. **M-D** — six offsets step down one place **below `sm` only**, every one `sm:`-restored, so 768/1440/2560/3840 are byte-identical. Result, 16/16 + 4 consent-answered: `linesOccluded` **0**, R satisfied by DS1 P4 with 23.8–272.5 px of clearance, chrome **593 → 171**, label **133.8 → 104.7** / **133.1 → 104.0**, DS1 P1 **−21.3 to −29.2**, `#salario-bruto` **−6.1 / −7.0**. |
| 2026-09-19 | product-designer (G3) | **M-R alone would have moved F1 rather than fixed it, and the consent-answered state is what caught it.** With the banner out of the overlay and DS1 P4 relocated but the reserve still 64 px, **DS1 P3 inherited P4's LR3.5 breach** — 2529.6 of 2516 on `/`, 1162.8 of 1149 on `/custo-da-hora`. The cause is that the reserve (64) is smaller than the band the tab bar occupies (78), so *whatever is last* is unreachable. **M-B fixes the class, not the instance**; verified at 96 px with 18 px of slack, in every cell including consent-answered. Recorded because the plausible design — relocate the failing surface — is the one that hides the defect. |
| 2026-09-19 | product-designer (G3) | **AC13's expected line count is corrected here, at the gate that found it** (`legal.md` §11). The relocated citation is inside the answer panel's own cell, so `g1-occlusion.mjs`'s `host` climb gains its `<a>`: `linesOnFirstScreen` **8 → 9** on `/` and **9 → 10** on `/custo-da-hora`, split `8 + 1` and `9 + 1` sighted/assistive. The assertion is not tuned; the baseline is. Side effect worth naming: the disclosure now sits inside **O**'s universal subject, so from here the same criterion that protects the number protects the sentence that qualifies it. |
| 2026-09-19 | product-designer (G3) | **The `PRODUCT.md` §8 reading named (AC14): §8 reaches the consent gate by substance.** A surface that is not an ad but is the gate that makes ads possible still may not occupy the answer's band. That is the human's existing ruling, written in one sentence in `design.md` §13 so it can be overruled in one place. The **L3 ruling is carried** (AC10): LR4.4's five clauses re-measured on the relocated surface at 390 — body `w` 332, LR2a spend **26** ≤ 32, `area(Recusar)` **15 936** = `area(Aceitar Tudo)`, *Configurar* 103.5 × 44, height **466** ≥ the 336 floor, clause 4 still unmet (**F3**, pre-existing, routed, not worsened). Art. 8º §5º **improves**: the revocation shield goes from conditional to always rendered. **No consent-rate or revenue number is assumed in either direction** (§ Out of scope 9); the plain consequence — a user who never scrolls never answers — is recorded without one. |
| 2026-09-19 | product-designer (G3) | **One conflict inside `legal.md` is stated rather than resolved: LR4.2's *"fully within the viewport"* against §4.6's express permission for the consent surface to render below the first screen.** The reading this design assumes is that LR4.2's viewport clause is **existential over scroll positions** — LR3.5's quantifier — and it is measured under that reading: at the scroll that brings the surface into view, all three controls are `inViewport`, `inSurface`, unclipped, both themes, 390 and 1440. **Routed to `tech-lead` → `labor-law-analyst` for G6.** If the universal reading is right, this family is closed and §4.5 has already closed every other one. Lesson **048**'s corollary: a clause stated in one quantity, met by a surface the same document permits elsewhere. |
| 2026-09-19 | product-designer (G3) | **F2a fires as a precondition and this gate does not set its value.** The design opens `components/organisms/cookie-consent.tsx`, so `legal.md` §12's trigger fires: the telemetry switch's initial state is an LGPD art. 5º XII / art. 8º §4º ruling, not a design decision. `plan.md` carries it as its own task with `labor-law-analyst` stating the value. **F2b is fixed in passing** — `p-6` → `px-3 py-6 md:p-8`, LR2a spend **50 → 26**, horizontal only so the surface height stays 466 and the 336 floor is never approached. |
| 2026-09-19 | product-designer (G3) | **`content-writer`'s one placement constraint is honoured by not moving anything near it, and it is measured rather than asserted.** DS2 may not be separated from the *DSR sobre os extras* row it calls *estes extras*. This design does not open `components/organisms/day-summary.tsx`; measured with a full journey seeded, both themes, the DSR row's bottom is **2369.5** and DS2's top is **2381.5** — **12 px, the same 12 px as the baseline** (2458.9 → 2470.9). The pair moved as one block. **The `0006` DS2 e2e debt's trigger therefore does not fire**, and it is re-routed intact with owner and trigger (AC9's second branch). |
| 2026-09-19 | product-designer (G3) | **Three system changes, each a human approval point, none of them a new token.** **S1** — the hero panel gains a 24 px phone padding step, which resolves a contradiction already inside `DESIGN.md` (its density table says 24 px at 390; its hero section says 32) *towards* the density table. **S2** — the 390 row's bottom reserve is redefined from the constant `pb-16` (64) to **96 px**, because the tab bar occupies **78** and 64 < 78 is the mechanism of F1; seen red twice. **S3** — the Same-Path Rule's consent-banner example becomes local (`y: 12`, not `y: 100`), since the surface is no longer viewport-anchored. No new token, no new type step, no new duration, no new curve, and **no key added to the `--spacing-*` namespace**. |
| 2026-09-19 | product-designer (G3) | **Two pre-existing findings reported with their numbers rather than filtered out.** At 1440 the consent row's `area(Recusar)` **4 935** < `area(Aceitar Tudo)` **6 296** — outside LR4.4's stated 390 domain, untouched by this design, routed to `labor-law-analyst` with the trigger *the first spec that opens `cookie-consent.tsx`'s control row*. And the aside cell's **visual order and tab order diverge** (`order-first` is visual only), which the hero's copy button already shows today; fixing it means editing `components/templates/calculator-layout.tsx`, which § Out of scope 4 forbids — reported to `tech-lead` with its cause and its file. |
| 2026-09-19 | product-designer (G3) | **Lesson 054 written**, from the F1 near-miss rather than from a bounce (`AGENTS.md` §6: an agent that notices mid-work that an earlier decision was wrong writes the lesson). Not the incident — the pattern: *when a geometric rule fails on whatever happens to be last in a container, the subject of the finding is the container's constant, not the element; fix it there and re-measure a state where a different element is last.* Carries the two corollaries: compare the constant to the band it must clear in the same box model (`reserve 64 < band 78`, not "short by 14.2"), and name the state that promotes a different member to that position — a matrix that only varies content **inside** the container cannot see this class at all. |
| 2026-09-19 | product-designer (G3) | **This gate's own contrast probe was wrong on its first pass and that is recorded, not quietly re-run.** Chromium serializes these tokens as `lab()`/`oklch()`, so a naive `getComputedStyle` parse returned ~1.2:1 for **every** pair — a number that looks like a catastrophic failure and is in fact an instrument failure. Re-derived through a 1×1 canvas: the citation reads **5.74:1** dark / **4.84:1** light on `--color-canvas`, its hover link **9.23:1** / **6.19:1**, and all ten measured pairs clear AA in both themes. `AGENTS.md` §5 — an instrument's output is a claim about the instrument until the quantity is reproduced. |
| 2026-09-16 | product-manager | **"Reachable" = the whole border box inside the first viewport at 390×844, on load, with no interaction, unoccluded by any `fixed`/`sticky` element, on a surface LR6.1 pairs with a claim also on the first screen.** The alternative — visibly indicated and one thumb-reach away — was rejected on a measurement, not on taste: the answer panel is `position: relative` and leaves the viewport at the footer (`top` −1742 on `/`, −1245 on `/custo-da-hora`, `answerVisible: false`), so reaching a disclosure by scroll or by tap costs the claim. |
| 2026-09-16 | product-manager | **Occlusion counts as unreachable**, which necessarily puts the consent banner's first-screen footprint in scope. Measured: the banner is `position: fixed`, 354..820, `h` 466 — 55% of the screen — and fixed chrome totals **593 px of 844 (70.3%)**, leaving a 289 px unoccluded flow band that the answer already fills. Excluding the banner would have made AC1 unsatisfiable by construction. Bounded by G2's L3; what it asks and stores is out of scope. |
| 2026-09-16 | product-manager | **Scope was re-derived by search, not taken from the brief.** The handed inventory of six surfaces is **under-counted**: E1–E3 return three further rendered strings citing a norm or a rate (CA `journey-form.tsx:142`, CB `journey-form.tsx:157`, CC `regime-field.tsx:83`), all three **unmounted until a tap** (`collapsible-panel.tsx:15-27`, `{isOpen ? … : null}`), measured `ABSENT FROM DOM` in 10/10 cells. Classification is G2's (L1, L2); the spec names them and states no rule about them. |
| 2026-09-16 | product-manager | **Measured against the deployed preview, not a local build** (`AGENTS.md` §4 rule 6): two sibling agents were active in this tree, and `.next` is shared mutable state during a parallel gate. Every DS1 and DS2 coordinate reproduces `.specs/0008-…/legal.md` §1.4 to the tenth of a pixel; DS5/DS6 differ on seed and marker element, and `spec.md` § Evidence records the reconciliation rather than silently preferring one. |
| 2026-09-16 | **human** (run 2) | **The occlusion is folded into this spec, not opened as its own.** Ruling on the open question run 1 recorded. Reason given: `0010` already measures first-screen reachability at 390×844 and already holds the coordinates, so a separate spec would re-derive the same instrument. **The accepted cost**: this spec now carries two related but distinct questions, and must keep them from blurring — recorded as § Finding O, § Scope 3b and **AC13**, scored apart from R, with a partial pass a rejection. |
| 2026-09-16 | product-manager (run 2) | **O reuses R's intersect predicate and changes the quantifier and the subject.** Shared: *a `fixed`/`sticky` border box intersects this border box*, implemented once in `evidence/g1-occlusion.mjs`. Different: R is **existential** over disclosure surfaces and applies clause 1 (whole box inside the viewport); O is **universal** over the answer panel's rendered leaf lines and **drops clause 1** — the panel is 403–643 px tall and legitimately runs past the fold, so demanding it fit would be a layout mandate this gate may not issue and would fail cells where nothing is covered. |
| 2026-09-16 | product-manager (run 2) | **The `PRODUCT.md` §8 tension is named and left unsettled.** §8 says ads *"never sit between the user and an answer"*; the banner is not an ad but is the gate that makes ads possible, and it covers **17:48** on `/` and **R$ 4.200,00** on `/custo-da-hora` in 16/16 cells. Whether §8 reaches the gate is a `PRODUCT.md` reading, and `PRODUCT.md` outranks this spec — resolving it here would be amending §8 by inference to justify this gate's own finding. **AC14** requires the remedy to state which reading it assumed; § Out of scope 9 forbids any consent-rate or revenue target, in either direction, because nobody in this pipeline has measured one. |
| 2026-09-16 | product-manager (run 2) | **The pixel budget is split with `0008` by kind, not by negotiation.** `0008` owns **flow height** above `#salario-bruto` — reproduced this run under `0008`'s own seed at **832.8** (slack 11.2), and measured at **864.1** under this spec's thinner seed and **880.5** empty, so two of three states have no complete control on the first screen before anything is spent. `0010` owns **occluded height** under the fixed chrome (466 px). Fixed chrome contributes zero flow height, so the compatible remedy costs `0008` nothing; **AC15** makes any other choice a measured, visible one rather than a silent trade. |
| 2026-09-16 | product-manager (run 2) | **Run 1 under-counted the occlusion and is corrected rather than carried.** Re-measured: *17:48* (433.4..577.4) and *é quando sua jornada fecha* (593.4..614.4) reproduce to the tenth of a pixel, and **two more rows** are covered that run 1 did not report — *Entrada às 08:00* (676.7..694.1) and a 1-px assistive row. The answer panel's box also changed, 128..707 → **96..739.4**, because O's subject has to be the outermost non-fixed ancestor, not the label's nearest `div`. Both are recorded in `spec.md` § Evidence. |
| 2026-09-16 | product-manager | **SUPERSEDED at run 2 by the human's ruling above — kept because the reasoning is what produced the ruling.** **The consent banner covering the answer** (banner 354..820 over an answer block ending at 707, with *17:48* and *é quando sua jornada fecha* behind it) is **reported, not fixed here.** It is occlusion of the *answer*, a different defect with a possible `PRODUCT.md` §8 dimension. Recorded as an open question for the human rather than absorbed — widening to it by inference is the improvisation § Out of scope exists to prevent. |
| 2026-09-16 | product-manager | **AC6 names an instrument that does not exist in this tree.** `0008` §7's V1–V5 is a described procedure, not a script; rather than cite a command it never ran, this gate binds `plan.md` to name the implementing file and show it running red once before any task depends on it (`AGENTS.md` §5). |
| 2026-09-16 | product-manager | **Boundary with `0003-citation-registry`: `0003` owns what a disclosure says; `0010` owns where it renders.** They meet only as a merge conflict in `calculator-views.tsx` and `salary-calculator.tsx`, for `tech-lead` to sequence. A remedy here needing a shorter string requests it through `tech-lead` into `0003`. `0003` changing a citation's length moves this spec's baselines, so AC1–AC7 compare against the artifact under test and report the delta from the G1 numbers rather than assuming it away. |
| 2026-09-16 | labor-law-analyst (G2) | **`pass`.** L1–L10 all settled by name. The gate adds **one** clause (**LR3.5**), restates **LR4** clause 2 as **LR4.2**, states **LR4.4** (the 336 px consent floor), and corrects **AC13**, which as written could not fail. `legal.md` §19. |
| 2026-09-16 | labor-law-analyst (G2) | **The handed set of three disclosure candidates was under-counted, and so was the re-derived one.** `AGENTS.md` §5 says to rule on the instance by reading **the module its strings come from**; `regime-field.tsx` renders from `lib/payroll.ts`, whose `WORK_REGIME_INFO` `impact` strings state 7,5%/14%/22%, the RGPS ceiling and the table year. **CD and CE admitted. Five, not three.** The enumeration is the test's output, never its definition. |
| 2026-09-16 | labor-law-analyst (G2) | **`0006` §2.1's test was missing a clause and CC is what found it.** CC states no number and names no gap, yet tells the user **which table governs their case**. Added **clause (d) Applicability**, and run against every string already ruled — C1, C4, the two wiring hints and `selected.summary` all stay out, so the widening does not move a single prior verdict. Lesson **045**'s pattern, arriving on a string instead of a constant. |
| 2026-09-16 | labor-law-analyst (G2) | **The floor was constructed in a browser and measured, never computed from tokens.** `g2-consent-floor-3.mjs` builds the smallest surface meeting all five LR4.4 clauses and reads `getBoundingClientRect().height` off it: **336 px** at 390, identical in both themes. An earlier ladder produced a plausible **206 px** that had three buttons summing 337.5 px of intrinsic width inside a 292 px container — recorded because a height without an overflow check is a number, not a measurement. |
| 2026-09-16 | labor-law-analyst (G2) | **The decisive output for G3 is an impossibility, not a preference.** AC13 sets a **ceiling** on a bottom-anchored surface's height (125.9 px on `/`, 277.0 px on `/custo-da-hora`) and LR4.4 sets a **floor** (336). **No bottom-anchored fixed consent surface can satisfy AC13 at 390 at any legally valid size**, and the band above the answer panel is 31 px. The family *shrink the banner where it is* is removed; every other family stays open, and choosing among them is G3's. |
| 2026-09-16 | labor-law-analyst (G2) | **The consent surface may legally leave the first screen**, because `components/organisms/analytics-wrapper.tsx:12` mounts GA only on an affirmative stored consent — nothing is processed before the user answers. The permission is granted; the consent-rate and revenue trade is **not** priced here, in either direction (`spec.md` § Out of scope 9), and goes to the human as `legal.md` §16 Q3. |
| 2026-09-16 | labor-law-analyst (G2) | **My veto does not attach to finding O today, and saying so is what keeps it worth having.** Every occluded row was run against all four clauses of the test: they are claims, labels and `.sr-only` boxes. **Zero disclosure surfaces are occluded on the first screen — because none of them is on the first screen at all.** O is a `PRODUCT.md` §1/§8 defect, which the human has already ruled. It becomes legal the moment R's remedy puts a disclosure into the covered band, which is why **LR3.5 is written before G3 draws** rather than discovered at G6. |
| 2026-09-16 | labor-law-analyst (G2) | **LR6.1 gets no spatial clause; LR3 gets the fifth bullet.** LR6.1's quantity is a frame index and bolting geometry onto it would compare a value read one way to a threshold derived another (`AGENTS.md` §5). LR3's four surviving bullets are all presence predicates and its last already reads *"or otherwise positioned off-screen"* — the hole and the fix are both geometric, and both are LR3's. |
| 2026-09-16 | labor-law-analyst (G2) | **LR3.5 was seen red before it was trusted.** The sweep across every LR-domain surface found **DS1 P4 — the citation line — cannot come to rest clear of the fixed route nav** on either route in either theme: it needs `scrollY` 2504.2 against a max of 2490, and 1228.6 against 1215. A clause written with a live failing subject is a clause that has been falsified; that is why it is binding rather than advisory. Routed as **F1**, and its remedy is flow height **below the footer**, which is not `0008`'s budget. |
| 2026-09-16 | labor-law-analyst (G2) | **AC13 could not fail as written, and that is this gate's defect to name, not `qa-engineer`'s to raise politely.** `evidence/g1-occlusion.mjs` prints `linesOccluded: 0` against an empty collection and against a fully-exempt one — two of three answers identical, so the deciding clause does not discriminate. AC13 now asserts `linesOnFirstScreen` against its expected count (**8** on `/`, **9** on `/custo-da-hora`), split `sighted + assistive`, **then** zero. Instruction to `tech-lead`; this gate does not edit `spec.md`. |
| 2026-09-16 | labor-law-analyst (G2) | **My own probe reported five surfaces ABSENT for the wrong reason, and it is recorded rather than quietly re-run.** The first pass tapped the controls with the `fixed` consent banner still intercepting pointer events. Lesson **031** cuts both ways: never conclude a surface is absent because your probe did not produce it. The second pass dismissed consent first and rendered all five. Separately, the `INSS` claim marker matched the **footer** on `/`, so the `/` rows prove nothing about CC/CD/CE and the ruling rests only on `/custo-da-hora` — corrected inline in `legal.md` §3.4 rather than left in the numbers. |
| 2026-09-16 | labor-law-analyst (G2) | **Four pre-existing defects found by the sweep, none of them rejected on.** F2a (consent pre-enabled), F2b (DS4 fails LR2a by 18 px — declared binding on DS4 at `0006` and never measured on it), F3 (**no cookie policy or privacy page exists anywhere**; art. 9º §1º nullity), F4 (`Extra 100%` traces to no norm). **None is caused, worsened or touched by a positioning change**, and rejecting this gate over them would bounce a spec that cannot fix them while delaying the one remedy in reach. F3 and F4 go to the human; all four are routed with a trigger. |
| 2026-09-16 | labor-law-analyst (G2) | **Lesson 048 written** — *state every concealment or presence rule in each quantity its substance can be breached in.* Not the incident: the pattern is that LR3 was stated in **time** and breached on **the pair**, LR2 in a bare constant and breached on **font size**, LR3 again in **presence** and breached in **space**. The lesson carries the axis checklist and the two corollaries — put each axis in the rule whose quantity it already is, and trust a new axis clause only once it has a failing subject. |
| 2026-09-16 | content-writer (G3) | **`copy.md` is an explicit no-op, and the reason is written rather than the gate left silent.** Four independent sources close it: `legal.md` §6 mandates **no string** and states AC5's exemption list **EMPTY**; §6 measures a **34.8 px whole surface (DS1 P4)** that satisfies R with **zero new copy**; §0 reserves *what a disclosure says* to `0003`/`0007`; `spec.md` § Out of scope 1–3 and § Non-goals forbid every category of string this gate could produce. `plan.md` budgets **zero copy tasks** and states the exemption list as empty, so a reviewer can tell *nothing exempted* from *nobody looked*. |
| 2026-09-16 | content-writer (G3) | **§8's LR3.5 checked against §6 clause by clause — no conflict, nothing routed back to `labor-law-analyst`.** LR3.5's every operand is `getBoundingClientRect()`, border box; no clause reads a character, a word or a line count, so a surface breaches or satisfies it with its text unchanged. Its one live failing subject, **F1 / DS1 P4**, is short by **14.2 px** (`/`) and **13.6 px** (`/custo-da-hora`) of *scroll*, and `legal.md` §12 names its remedy as **flow height below the footer**. Trimming DS1 P4 to buy those pixels is forbidden twice (`legal.md` §6; `spec.md` § Non-goals, lesson **002**) and it is the line that carries the table year (`PRODUCT.md` §4) — the string least eligible for a trim, not the most. |
| 2026-09-16 | content-writer (G3) | **One placement constraint issued, from lesson 049's deixis test run over all nineteen frozen strings: DS2 may not be separated from the *DSR sobre os extras* row it says *estes extras* about.** A spec whose whole content is *moving surfaces* is the spec that turns a latent deictic reference into a broken one, and this one breaks **silently** — DS2 still renders, still reads as Portuguese, and is simply about a row that is no longer there. Fixing it afterwards would need a rewording § Out of scope 2 forbids, so it is a placement constraint rather than a copy fallback. Every other frozen string names its own subject and relocates freely. |
| 2026-09-16 | content-writer (G3) | **Two conditional triggers recorded before `design.md` closes, neither a blocker today.** **T1** — **LR4.4 clause 4**'s art. 9º / art. 18 information link does **not exist in the app** (finding **F3**), and a link needs a **label**, which is a new pt-BR string § Non-goals forbids by name; F3 is routed out of this spec, so a remedy that adds the link here has created copy work this gate may not do — it is a **G1 amendment**, not a string request. **T2** — a remedy needing a **shorter** string routes through `tech-lead` into `0003` (`spec.md` § Boundaries); this gate shortens nothing, and §6 already named the alternative that fits. |

## PR #42 integration QA — G6 run 1

**Pass for PR #42 integration; reject only 0010 closure.** AC15's measured flow cost exceeds all
three established ceilings and remains routed to `tech-lead` and the spec owners. T4′'s answered
and pending consent budgets, same-frame geometry, in-flow banner intersection and red controls are
now covered. The fixed-descendant overlap gap is closed. The final census contains 872 browser
entries split 291/291/290 with no missing, extra or duplicate descriptors. Isolated execution
passed shard 1 (`291 passed`), shard 2 (`290 passed, 1 informational skip`) and shard 3
(`289 passed, 1 informational skip`) with zero failures; the focused matrix passed `366/366`.
Lighthouse passed at 96–97 performance and 100 in accessibility, best practices and SEO; eight
preview cells had zero Axe violations and zero console errors. `EstimateNotice` contrast measured
5.62:1 light and 8.19:1 dark. Hosted CI is the remaining release confirmation after push. Next
agent for the spec itself is **tech-lead** for AC15 only. [QA review](reports/qa-pr42.md)
