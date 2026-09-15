# 0006 — Legal verification (G6)

> Owner: labor-law-analyst · Gate: `law-check` (G6) · Run 1

**Verdict: pass.**

**§5's deferral rule was not needed, and I say so plainly.** DS5, DS6 and DS7 — the three surfaces my
G2 analysis ruled into the LR domain — satisfy **LR2a at every viewport and in both themes**, measured
by me in a real browser against a production build. Nothing goes to the human under §5, and
`legal.md` §12 stays empty. `release-manager` reads an empty §12 at G8 and that is the correct state.

The LR2b residual at 390 is **reported below and not absorbed** (§3.3 of `legal.md`): it exists, it is
between 32.33 and 37.00 characters per line across the three LR-domain surfaces, and the question that
would close it — `legal.md` §13 Q1, the type ramp — is still the human's and is still open.

Two things I confirmed rather than re-derived: `lib/` is untouched by this spec, and the build serves
the same figures verified at `0005` G9. One thing I could not verify because it is another agent's
output written in parallel with mine: AC11's residual table in `reports/qa.md` (F1 below, conditional).

---

## 1. How I verified — the instrument is mine, made twice

`legal.md` §9.1 states, in the worked example E1, that the surface root width `W ≈ 308 px` is a
**derived** figure and that **G6 measures it directly, never by arithmetic on the class list**. That
instruction was written against me and I honoured it.

- The repository working tree was **never mutated**. I copied it to the session scratchpad, hardlinked
  `node_modules`, and ran `next build` + `next start -p 3177` there. `git status --porcelain` at the
  end of my run is byte-identical to its state at the start. No git command that changes state was run.
- I did **not** reuse `tests/e2e/support/legibility.ts`, the developer's spec file, or the recorded
  JSON under `evidence/measurements-after/`. I wrote my own probe, which selects the body paragraph by
  **excluding the title's text** rather than by `p.nth(1)` — deliberately, because the fix reordered
  the atom's DOM and an index-based selector is exactly what a structural change silently re-points.
- **40 cells measured**: five banner instances × four viewports (390, 1440, 2560, 3840) × two themes.
  Plus four more cells for a third C5 string. Every cell reads
  `getBoundingClientRect().width` on both sides — one quantity across the rule set, per `legal.md`
  §3.2 and lesson 023.

The developer's figures reproduce **exactly**, to the centésimo, on an independent build and an
independent instrument. That is the strongest form this confirmation takes.

---

## 2. What was verified

| Computation / claim | Against | Result |
|---|---|---|
| LR2a on DS5 (C2), DS6 (C3), DS7 (C5) | `legal.md` §3.2 | **pass**, 4 viewports × 2 themes |
| LR2a on C1 and C4 (quality, not my veto) | `legal.md` §10.1 D2 | pass, recorded for completeness |
| LR2b where it binds (1440, all surfaces) | `legal.md` §3.2 | **pass** |
| LR2b residual at 390 (does not bind, font 14px > 12px) | `legal.md` §3.3 | **reported**, §4 below |
| LR3 rendering on all five | `0005` `legal.md` §3 | pass |
| Citation integrity after the icon moved rows | `legal.md` §6.2, §6.3 | **pass** — no citation orphaned |
| `lib/` untouched; deployed figures unchanged | `legal.md` §8, §0 | pass |
| X1 still carried with an owner | `legal.md` §10.1 X1 | pass |
| §5's deferral rule | `legal.md` §5 | **not invoked** |

---

## 3. LR2a — measured, on the built code

`legal.md` §3.2: `bodyText.getBoundingClientRect().width ≥ surfaceRoot.getBoundingClientRect().width − 32`.

| Viewport | root font | body font | surfaceRoot W | bodyText B | spend | LR2a floor (W−32) | Verdict |
|---|---|---|---|---|---|---|---|
| 390×844 | 16px | 14px | **308.00** | **282.00** | 26.00 | 276.00 | **pass**, +6.00 |
| 1440×900 | 16px | 14px | **667.33** | **641.33** | 26.00 | 635.33 | **pass**, +6.00 |
| 2560×1440 | 18px | 15.75px | **961.00** | **932.00** | 29.00 | 929.00 | **pass**, +3.00 |
| 3840×2160 | 18px | 15.75px | **961.00** | **932.00** | 29.00 | 929.00 | **pass**, +3.00 |

Identical in **light and dark** at every cell — the two themes differ in no geometric quantity, which
is the expected result and is now measured rather than assumed. Identical across **all five banner
instances**, both routes (`/` and `/custo-da-hora`) and both tones (`danger`, `warning`): the spend is
a property of the atom, as `legal.md` §10.1 D1 said it was.

**E1 closed.** `legal.md` §9.1 predicted `W ≈ 308` as derived and required `B ≥ 276` after a
conforming remedy. Measured: `W = 308.00` exactly, `B = 282.00`. The derived figure was right and is
now a reading.

**The chrome budget is respected and is not overspent.** 29 ≤ 32 at the widest root. The atom spends
1px border + 12px `px-3` on each side = 26px at a 16px root, and 29px at an 18px root because the
padding is in `rem` and the budget is in `px` (`design.md` §3.2's mechanism, confirmed here).

### 3.1 — Why the icon no longer costs the body column

Measured directly rather than read off the JSX: the body paragraph's left edge sits **13.00 px** from
the banner root's left edge at every viewport — 1px border + 12px padding, i.e. exactly the root's
content edge. The icon's bounding box no longer intersects the body paragraph's box on either axis
(`iconInsideBodyColumn = false` in all 40 cells; icon right edge 74.00, body left edge 54.00, in
different vertical bands). The icon is a sibling of the title inside the title row, and the body text
starts at the container's own content edge. That is what LR2a is for, and it is what shipped.

---

## 4. LR2b — where it binds, and the residual where it does not

### 4.1 — Where it binds: 1440, every surface. All pass.

| Surface | chars | line boxes | cpl | Floor | Verdict |
|---|---|---|---|---|---|
| **DS5 / C2** — divisor 220 | 111 | 2 | **55.50** | 40 | pass |
| **DS6 / C3** — Súmula 431 mismatch | 174 | 2 | **87.00** | 40 | pass |
| **DS7 / C5a** — art. 59 + Súmula 376 | 207 | 3 | **69.00** | 40 | pass |
| **DS7 / C5b** — art. 71 *caput* + §4º (50%) | 203 | 3 | **67.67** | 40 | pass |
| **DS7 / C5c** — art. 71 §1º + §4º (50%) | 184 | 2 | **92.00** | 40 | pass |
| C1 (quality) | 97 | 2 | 48.50 | 40 | pass |
| C4 (quality) | 52 | 1 | — | exempt, single box | pass |

At 2560 and 3840 every surface is at 87.00 cpl or better, or exempt on a single line box. LR2b does
not bind there by `legal.md` §3.2's text; it passes anyway, everywhere.

### 4.2 — The residual at 390, reported per `legal.md` §3.3

The body text computes to **14px** at 390×844 — verified with `getComputedStyle`, not inferred from
`text-body-sm`. 14 > 12, so **LR2b does not bind at 390** for any of these surfaces, per §3.2. The
measured values, both themes identical:

| Surface | chars | line boxes | **cpl at 390** | Shortfall vs. 40 |
|---|---|---|---|---|
| **DS5 / C2** | 111 | 3 | **37.00** | −3.00 |
| **DS6 / C3** | 174 | 5 | **34.80** | −5.20 |
| **DS7 / C5a** | 207 | 6 | **34.50** | −5.50 |
| **DS7 / C5b** | 203 | 6 | **33.83** | −6.17 |
| **DS7 / C5c** | 184 | 5 | **36.80** | −3.20 |
| C1 (quality) | 97 | 3 | **32.33** | −7.67 |
| C4 (quality) | 52 | 2 | **26.00** | −14.00 |

**The non-regression clause of §3.2 is satisfied vacuously and its floor is now set.** No surface
reaches 40 cpl at 390 on the fixed tree, so none has ground to lose; the values above are each
surface's floor from this point on. That is the fact the clause exists to freeze, and freezing it is
the reason this table is written down rather than summarised.

**§4 of `legal.md` predicted this and predicted it correctly.** E1 forecast C1 at "3 or 4 line boxes,
cpl between 24.3 and 32.3" at `B = 276`; measured `B = 282.00`, 3 boxes, **32.33** — the top of the
predicted band, reached because the remedy bought 6px more than the floor. The proof that 40 is
unreachable at 390 for a 14px surface stands, measured rather than estimated: the widest column this
app offers at 390 is 358px and the requirement is ≥ 363px at the most favourable end of the
character-width bound.

**§4.4 is now settled for C5, and settled negatively.** At G2 I refused to say whether C5 could reach
40 cpl at 390, because the bound `k ∈ (7.48, 12.40]` was too wide to tell and I would not write a
number I had not measured. It is measured now: **34.50, 33.83 and 36.80** for the three C5 strings.
It cannot. That closes the open question §4.4 left, on the side that keeps the residual live.

**The residual is escalated, not accepted.** `legal.md` §13 Q1 remains the human's and remains
unanswered. Nothing in this report accepts it, and no downstream gate may read the pass above as
accepting it.

---

## 5. The four citations in C5, and those in C2/C3, after the icon moved rows

`legal.md` §6 verified what those strings assert against the norms. Here I verify only that the
structural change did not **orphan** a citation from its claim — a real risk, because the fix moved a
node out of the body's flow and an atom that split a paragraph would leave *"(art. 71, §1º, da CLT)"*
in one visual block and *"o tempo suprimido é devido com acréscimo de 50%"* in another.

**It did not, and the reason is structural rather than lucky:** every consumer passes its body as a
single `<p>` child (`salary-calculator.tsx:125,136-139,150-154`; `day-summary.tsx:251-252`), and the
fix moved the **icon** into the title row, never the children. Claim and citation remain in one
paragraph, one flow, one element.

Read verbatim off the rendered production page — these are the strings as the user sees them, not as
the source declares them:

| Surface | Rendered text | Citation intact with its claim |
|---|---|---|
| **DS5 / C2** | *"Sem ela não dá para saber quanto vale a sua hora. Para a jornada de 8h48 por dia o divisor é 220 horas por mês."* | yes — the 220 and its jornada in one sentence |
| **DS6 / C3** | *"Pela Súmula 431 do TST, a jornada que você informou corresponde ao divisor 220 horas por mês, e não 200. Usar um divisor maior do que o devido reduz o valor de cada hora sua."* | yes — norm, both divisors, consequence |
| **DS7 / C5a** | *"O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST). A irregularidade está na extrapolação, e a sanção recai sobre o empregador."* | yes — art. 59 and Súmula 376, each beside its own claim |
| **DS7 / C5b** | *"Jornada acima de 6 horas exige no mínimo 1 hora de intervalo (art. 71 da CLT), que norma coletiva pode reduzir para 30 minutos. O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória."* | yes — art. 71 *caput* and the §4º consequence in one block |
| **DS7 / C5c** | *"Jornada acima de 4 horas e de até 6 horas exige um intervalo de no mínimo 15 minutos (art. 71, §1º, da CLT). O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória."* | yes — art. 71 §1º and the §4º consequence in one block |

**Byte-identical to `lib/compliance.ts:33,47,56` and to the JSX.** AC7 holds on the text I can see:
this spec changed no character of any disclosure.

**C5's fourth string — art. 66, the 11-hour interregno — was not rendered, and I state that as an
inference rather than a measurement.** Reaching it requires a previous journey in state, which my
probe did not construct. What I can say precisely: LR2a is **content-independent** — it compares the
atom's root box against its body column, and I measured that pair identical (26.00 / 26.00 / 29.00 /
29.00) across five instances, two routes, two tones, two themes and four viewports. The art. 66 string
is 176 characters, shorter than all three C5 strings I did measure, so at 1440 it occupies at most 3
line boxes → cpl ≥ 58.67, comfortably over LR2b's floor. Its text is verified unchanged at
`lib/compliance.ts:64-65` and its citation was checked correct at `legal.md` §6.2. I am satisfied; I
am also recording that it is an inference so the next analyst does not read it as a reading.

---

## 6. Traceability audit — every user-visible number

Read off the rendered production build at 1440, `/custo-da-hora`, gross salary R$ 5.000,00.

| Number on screen | Traces to | Verdict |
|---|---|---|
| INSS **R$ 501,51** | `lib/legal-tables.ts` `RGPS_BRACKETS_2026` — 7,5% até 1.621,00 · 9% até 2.902,84 · 12% até 4.354,27 · 14% até 8.475,55. Recomputed by hand: 121,575 + 115,3656 + 174,1716 + 90,4022 = **501,5144 → 501,51** | **pass** |
| IRRF **R$ 0,00** | `exemptionCeiling: 5000` and `reduction` (Lei nº 15.270/2025) — correct: a gross of exactly R$ 5.000,00 is exempt | **pass** |
| Líquido **R$ 4.498,49** | 5.000,00 − 501,51 | **pass** |
| Hora **R$ 20,45** · **R$ 0,34 por minuto** | 4.498,49 / 220 = 20,4477 → 20,45; /60 → 0,34 | **pass** |
| Divisor **220** (C2, C3) | `lib/salary-period.ts:3-6,41-43` — 8,8 × 5 × 5. Number correct; **citation over-extended, see §8 X1** | pass on the number |
| Ano **2026**, *"em vigor desde 01/01/2026"*, *"Portaria Interministerial MPS/MF nº 13, de 09/01/2026"* | `LEGAL_YEAR_2026.year`, `.effectiveFrom`, `.source` | **pass** |

**No user-visible number without a table.** `PRODUCT.md` §4's "the year is part of the answer" is
discharged on screen, in the same viewport as the figures.

**`lib/` is untouched by this spec, verified rather than asserted.** `git status --porcelain` lists
exactly one source file changed in the working tree — `components/atoms/alert-banner.tsx` — and no
file under `lib/`. `legal.md` §8's "this spec introduces, alters, reads and removes no table" holds.
Per my brief, I confirmed the build serves the same numbers; I did not re-verify the tables against
primary sources, which was done digit by digit at `0002` G6 and by hand at `0005` G9.

Also spot-checked unchanged and serving: `lib/night-shift.ts:3-8` — the 20% premium
(`NIGHT_PREMIUM_RATE = 0.2`), the 52min30s hora reduzida (`NIGHT_HOUR_MINUTES = 52.5`) and the
22:00–05:00 window, each carrying its CLT art. 73 citation in the module; `lib/weekly-rest.ts:17` —
the DSR, citing Lei 605/49 art. 7º §2º and Súmula 172 do TST.

---

## 7. Disclosure audit — is each required disclosure visible next to its number?

| Required | Where it must appear | Visible? |
|---|---|---|
| **DS1 P3** — the gap list, naming *"o valor do intervalo suprimido"*, FGTS, 13º, terço de férias, INSS/IRRF sobre extras, Súmula 60 prorrogação, insalubridade/periculosidade, and the RPPS-federal-only caveat | Footer of `/custo-da-hora`, in the same view as the figures | **yes** — read verbatim off the rendered page |
| **The year and the portaria** | Next to the figures | **yes** — *"Tabelas de INSS e IRRF de 2026, em vigor desde 01/01/2026 · Portaria Interministerial MPS/MF nº 13, de 09/01/2026"* |
| **DS7 / C5** — the gap named at the moment it becomes concrete: suppressed interval owed with a 50% acréscimo, indenizatória | Beside the journey that crossed art. 71 | **yes**, and now at 33.83–36.80 cpl on a phone instead of ~24–32 |
| **DS5, DS6** — the divisor and the mismatch | Beside the hourly-rate inputs | **yes** |

None is inside a collapsed panel, a closed `<details>` or an `aria-expanded="false"` region —
asserted directly in my probe on all five surfaces (`insideClosedDetails: false`,
`insideCollapsed: false`, `visibility: visible`, `opacity: 1`, `display: block`).

**`legal.md` §2.5's charge is answered.** The gap was being named where the user could not read it.
It is now named where they can. That is the whole of what this spec owed the LR domain, and it paid it.

---

## 8. Findings

None blocking. Two recorded, one of them conditional on another agent's parallel output.

### F1 — AC11's residual table may not land in `reports/qa.md` · **low** · conditional

- **What `legal.md` requires:** §3.3 and amendment A4 (new AC11) — the measured cpl at 390×844 is
  reported per surface, per theme, in **`reports/qa.md`** *and* in this file.
- **State:** discharged in this file (§4.2). `reports/qa.md` at the time I read it holds the
  `frontend-dev`'s G5 build evidence and contains no per-surface 390 cpl table. `qa-engineer` is
  running in parallel with me and their G6 output is not yet written.
- **Why it is not a rejection:** the obligation is on the artifact at the close of G6, not at the
  moment I read it, and the substance — the residual existing as a written number with a floor — is
  satisfied here regardless.
- **Instruction:** `tech-lead` confirms, before G7 opens, that `reports/qa.md` carries the per-surface
  cpl at 390 in both themes. If it does not, the numbers in §4.2 of this file are the ones to copy;
  they are independently measured and need no re-run. **A residual that is not written down is a
  residual that disappears** — that is the whole of A4.

### F2 — the LR2a margin at an 18px root is 3.00px, and it is the narrowest in the rule set · **low** · carried

- **File:** `components/atoms/alert-banner.tsx:23` — `px-3`.
- **What the code does:** spends 29.00px of the 32px budget at a root font-size of 18px (2560 and
  above), versus 26.00px at 16px. Passes with **3.00px** of headroom.
- **Why it is recorded:** the budget is stated in **CSS px** and the padding is declared in **rem**,
  so the spend scales with the root ramp while the budget does not. `design.md` already rejects
  `px-3.5` for this reason (33.5 > 32 from 2560 up). The consequence nobody has written down yet is
  the general one: **any future step added to the root font ramp above 18px pushes this atom over
  LR2a without anyone touching the atom.**
- **Not this spec's to fix**, and not a defect: 29 ≤ 32. `legal.md` §3.2 says a surface may spend less
  and none may spend more, and this one spends less.
- **Owner:** `product-manager`, in the spec that next opens `app/globals.css`'s root ramp or
  `DESIGN.md`'s type scale — the same spec that will have to answer `legal.md` §13 Q1. It belongs on
  that spec's agenda, not on a standalone one.

### Carried, confirmed still recorded with an owner — **not re-triaged**

- **X1** — `lib/salary-period.ts:40` and `components/organisms/salary-calculator.tsx:151` attribute a
  general `jornada semanal × 5` divisor rule to **Súmula 431 do TST**, whose text covers only
  *40 horas semanais → divisor 200*. The numbers are right; the citation is over-extended.
  **Recorded with an owner in three places** — `legal.md` §10.1 X1 and §13 Q2, `spec.md` § Carried
  debt and § Out of scope, `STATUS.md` decisions log. Owner: `product-manager`, next spec that
  legitimately opens `lib/salary-period.ts`, from an environment that can reach `planalto.gov.br`.
  Its spec is not open and I did not reopen it.
- **`0005` G9-F2** — `lib/legal-tables.ts:48`'s `sourceUrl` names a commercial aggregator
  (`legisweb.com.br`) rather than the primary text of Portaria Interministerial MPS/MF nº 13/2026.
  Confirmed still present and still routed: `.specs/0005-…/reports/release.md:342` sends it to
  `.specs/0003-citation-registry/` with `product-manager` then `labor-law-analyst` as owners. Not
  this spec's, not re-triaged.

---

## 9. Did any acceptance criterion of mine depend on the old 2560 root-font model?

**No.** I checked this deliberately, because `design.md`'s 17px-at-2560 row was wrong at G3 run 1 and
`plan.md` carried it into two acceptance clauses.

`legal.md` §3.2 binds **LR2a at every viewport** — a relation between two measured widths, with no
font size in it — and binds **LR2b at 1440**, with a conditional exemption at **390** keyed to the
body font-size being ≤ 12px. Both worked examples, E1 and E2, are at 390 and 1440. **No number I
wrote at G2 is a function of the root font-size at 2560 or above**, and none moved when the model was
corrected from 17px to 18px.

The corrected model is confirmed by my own measurement, independently of the developer's probe and of
`design.md`: root font-size **16px at 390 and 1440, 18px at both 2560 and 3840**, body
**14px / 14px / 15.75px / 15.75px**. `design.md`'s G3-run-2 figures (961.00 / 932.00 / 29) reproduce
to the integer on my build.

One consequence worth stating for the record, because it is the only place the corrected model
touches my rules: the 390 exemption in §3.2 is keyed to **≤ 12px**, and the measured body font at 390
is **14px**. The exemption applies, as §4 intended. Had the ramp been different at 390 the exemption
would not have applied and three of these surfaces would be failing a binding floor — which is why
§3.2 states the exemption by font size and not by component, and why it was right to.

---

## 10. §5's deferral rule — not invoked

Stated plainly, as instructed, because a near-miss here would have gone to the human and it is worth
being unambiguous that this is not one.

`legal.md` §5 binds: *if `0006` ships without DS5, DS6 and DS7 satisfying LR2a, that is a knowing
deferral of an LR-domain defect live in production, and it requires the human's written acceptance
recorded in §12 before `release-manager` closes G8.*

**DS5, DS6 and DS7 satisfy LR2a at 390, 1440, 2560 and 3840, in light and in dark — 24 of 24 cells,
measured by me, with margins of +6.00px and +3.00px and no cell closer than 3.00px to the floor.**
Spec 0005's deferral was spent once and is not spent again. **No human signature is required, no row
is added to `legal.md` §12, and §12 remains empty.**

The LR2b residual at 390 is expressly **not** covered by that clause — §5 says so — because `legal.md`
§4 proves no lever inside a geometry spec can close it. It is reported in §4.2 above and escalated at
§13 Q1, which is where it was before this spec and where it stays until the human answers it.

---

## 11. Evidence

Produced in an isolated copy of the tree under the session scratchpad; the repository was never
written to and no git command that changes state was run.

- Production build: `next build` on a copy of the working tree at its G6 state, served with
  `next start -p 3177`.
- Probe: an independent Playwright script, body paragraph selected by excluding the title text, both
  sides read as `getBoundingClientRect().width`, line boxes counted by a `Range` over the element's
  text content deduplicated on rounded `top` — `legal.md` §9.3's method, unchanged.
- 40 cells (5 instances × 4 viewports × 2 themes) plus 4 cells for C5c. Every figure in §3 and §4 of
  this report is a reading from that run.
- Cross-check: identical, to the centésimo, to `evidence/measurements-after/chromium-*.json` on every
  cell the developer also recorded.
