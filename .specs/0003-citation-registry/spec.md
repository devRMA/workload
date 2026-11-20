# 0003 — Citation registry

> Owner: product-manager · Gate: `spec`

## Problem

A CLT worker opens WorkLoad, reads `R$ 1.234,56` de INSS, and scrolls to the one line whose entire
job is to tell them where that number came from. That line says the table is the
**Portaria Interministerial MPS/MF nº 13, de 09/01/2026**, and it hyperlinks the norm to
`legisweb.com.br` — a commercial legislation aggregator.

Two things are wrong at once, in the same sentence:

- The Portaria sets the **RGPS (INSS)** table. It does not set the 2026 IRRF table, which comes
  from **Lei nº 15.270/2025**. The footer credits it for both. A user who clicks through to check
  their IRRF finds a document that does not contain their number.
- The link is not the norm. It is a third party's reproduction of the norm, on a host that can
  paywall it, renumber the query string, or disappear, with no obligation to anyone.

`PRODUCT.md` §4 is the promise this breaks: *every number WorkLoad shows can be traced to a
Brazilian norm in force, and WorkLoad says so*. No arithmetic is wrong here. The promise is still
broken, and it is broken in the one line the product exists to be trusted for — which is the worse
kind of defect, because everything else on the screen is right and looks it.

`lib/legal-tables.ts:48`'s aggregator URL has now been flagged **three separate times** by
`labor-law-analyst`: at 0002's G2, at 0005's G6 against the production build, and at 0005's G9
against the deployed Vercel artifact, where the link is what a user actually clicks. It has been out
of reach each time because each of those specs forbade touching `lib/`.

## Audience & moment

The **deep-dive** reader, at the moment of doubt. Not the ten-second path — this reader has their
number and has decided to check it. `PRODUCT.md` §2 says this reader is the entire positioning:
dozens of Portuguese overtime calculators show the number; almost none survive being checked.

The ten-second path is unaffected and must stay unaffected. That is an acceptance criterion, not a
hope (AC10).

## Outcome

Every norm WorkLoad names on screen or in `lib/` is the norm that actually produces the number
attributed to it, and every link behind such a name resolves to an official Brazilian government
host. A reader who clicks any citation lands on a document that contains the figure they were
looking at.

## Scope

### How this scope was produced

Per `AGENTS.md` §5 and lesson 034, the scope below is the output of searches run in this tree at
G1, not the findings list inherited from 0002. Where the run and the carried findings disagree, the
run wins and it is said so explicitly.

| # | Command | Result |
|---|---|---|
| S1 | `grep -rn --include='*.ts' -E "source" lib/` | 4 lines — `lib/legal-tables.ts:24,25` (the interface fields) and `:47,48` (the single `source`/`sourceUrl` pair for the whole year record) |
| S2 | `grep -rn --include='*.ts' --include='*.tsx' -E "S[úu]mula\|Lei n\|Portaria\|Decreto\|\bart\.\|§\|Constitui\|TST\|RFB\|CF\b" app/ components/ lib/ hooks/` | **14 lines**, zero false positives. Listed in full in § Citation inventory. |
| S3 | `grep -rn --include='*.ts' --include='*.tsx' -E "[0-9]+([,.][0-9]+)?%" lib/ components/ app/ hooks/` | 10 lines, of which 2 are CSS (`lib/og-image.tsx:29,30`) and 8 are rate literals written by hand into pt-BR prose |

**The run disagrees with the carried findings in four places.** F2–F5 name four cells. S1–S3 return
citation-bearing or rate-restating sites in **nine** modules. Specifically:

- F5 names `lib/payroll.ts:24` as the only hand-restated rate span. S3 returns
  `lib/payroll.ts:32` as well — *"as faixas seguem subindo até 22%"* hand-restates
  `rppsFederalBrackets`'s top rate, and the same line asserts *"muitas vezes 14% linear"* about
  state and municipal RPPS with no source anywhere in the tree. Same defect class, never named.
- F3 names the footer's INSS/IRRF conflation. S1 shows the cause is structural and wider than two
  tables: **one** `source`/`sourceUrl` pair at `lib/legal-tables.ts:47-48` stands behind **eight**
  distinct legal data sets in that record — `rgpsBrackets`, `rgpsCeilingDiscount`,
  `rppsFederalBrackets`, `incomeTaxBrackets`, `topIncomeTaxRate`, `simplifiedDeduction`,
  `dependentDeduction`, `exemptionCeiling` and `reduction`. The RPPS federal ladder in particular is
  attributed to a Portaria that does not create it.
- The findings list names no rendered citation outside `day-summary.tsx` and `calculator-views.tsx`.
  S2 returns five more: `journey-form.tsx:142`, `salary-calculator.tsx:86`, and four norm-quoting
  compliance warnings whose text lives in `lib/compliance.ts:34,47,56,65`.
- F4 names `lib/legal-tables.ts:48` alone. AC1's grep, run at G1 over `__tests__/` as well, returns
  **two** lines: the aggregator URL is also pinned as an expected value at
  `__tests__/calculator-views.test.tsx:103`. A fix to the shipping file alone turns that test red;
  a developer under time pressure "fixes" the test back to the aggregator and the defect survives
  its own repair.

A downstream agent that had built to the four-cell list would have satisfied every criterion on the
half it was shown and shipped the rest untouched.

### The domain test — what is in scope

Per lesson 024 (`applies-to: all`), the domain is a **test on what a string asserts**, not the list
below. The inventory is the test's output at G1; it is an example, never the definition.

A string is in this spec's domain if **any one** clause holds:

- **A1 — Attribution.** The string names a Brazilian norm (lei, portaria, decreto, artigo, súmula,
  inciso, parágrafo, or a constitutional article) as the authority for a number, rate, threshold,
  divisor, window or right that WorkLoad shows or applies.
- **A2 — Link.** The string is, or produces, a URL a user can follow to the text of a norm named
  under A1.
- **A3 — Restatement.** The string states in prose a rate, ceiling, span or threshold that exists as
  a value in `lib/legal-tables.ts` or as a constant in a `lib/` module, rather than deriving it from
  that value.
- **A4 — Silent constant.** A value in `lib/` that produces a number or a threshold on screen and
  carries **no** norm citation in the module that defines it (`AGENTS.md` §8).

The test **deliberately excludes**, and these are out of the domain by construction: input
validation messages (`lib/journey.ts`'s `FIELD_MESSAGES` — chronological form errors, no norm, no
number, no right), navigation and empty-state copy, SEO metadata and structured data that merely use
"CLT" as a search term rather than as an authority (`app/layout.tsx:25,26,35`, `app/page.tsx:8`,
`lib/structured-data.ts:6`, `lib/calculator-view.ts:10`, `lib/og-image.tsx:18`,
`app/custo-da-hora/*`), and unit-conversion constants with no legal content (`lib/duration.ts`).
Naming these as out keeps the test falsifiable.

Applying A1–A4 to the searches yields the inventory below. If `labor-law-analyst` applies the test
at G2 and it returns a site this table lacks, **the table was never the domain** — the site is added
and this sentence is what authorises it.

### Citation inventory

Classification per lesson 024: the reason is written, not the label, and each row names the
**module the strings come from**, not only the component that renders them.

| # | Site | Clause | What it asserts | Status |
|---|---|---|---|---|
| C1 | `lib/legal-tables.ts:47` (`source`), rendered at `components/organisms/calculator-views.tsx:90-99` | A1 | One norm name stands behind nine legal data sets in `LEGAL_YEAR_2026`, and the footer credits it for the IRRF table as well as the INSS one | **Wrong** — F3. The Portaria does not set the IRRF table |
| C2 | `lib/legal-tables.ts:48` (`sourceUrl`), rendered as the `href` at `calculator-views.tsx:93` | A2 | The link a user clicks under the norm name | **Wrong** — F4. Commercial aggregator. Flagged 3× |
| C3 | `lib/legal-tables.ts:50-68` — `rppsFederalBrackets`, `incomeTaxBrackets`, `topIncomeTaxRate`, `simplifiedDeduction`, `dependentDeduction`, `exemptionCeiling`, `reduction` | A4 | Seven data sets that each produce a number on the salário screen and carry no citation of their own | **Uncited** — inherits C1's single wrong source |
| C4 | `components/organisms/day-summary.tsx:234` | A1 | *"O DSR (Súmula 172 do TST)"*, over a base that at `:118` includes `nightPay` | **Incomplete** — F2. Súmula 172 covers horas extras; the night premium's reflection rests elsewhere |
| C5 | `lib/weekly-rest.ts:17` | A1 | *"Lei 605/49 art. 7º, §2º e Súmula 172 do TST"* — the source comment behind C4's computation | **To settle at G2** — the comment and the rendered caption cite differently; both describe the same function |
| C6 | `lib/payroll.ts:24`, rendered at `components/molecules/regime-field.tsx:59` | A3 | *"alíquotas progressivas de 7,5% a 14%"* hand-restates `rgpsBrackets[0].rate` and `[3].rate` | **Drift risk** — F5. Goes stale silently the year a rate moves |
| C7 | `lib/payroll.ts:32`, rendered at `regime-field.tsx:59` | A3, A4 | *"as faixas seguem subindo até 22%"* hand-restates `rppsFederalBrackets`'s top rate; *"muitas vezes 14% linear"* asserts a fact about state/municipal RPPS with no source in the tree | **Not in F2–F5.** Found by S3 |
| C8 | `lib/compliance.ts:34` | A1 | art. 59 da CLT (2h limit) + Súmula 376 do TST, and it states hours remain **devidas a você** | **To verify at G2** |
| C9 | `lib/compliance.ts:47` | A1, A3 | art. 71, §1º da CLT (15 min) + *"acréscimo de 50%, de natureza indenizatória"* | **To verify at G2** |
| C10 | `lib/compliance.ts:56` | A1, A3 | art. 71 da CLT (1h, reducible to 30 min by norma coletiva) + the 50% acréscimo | **To verify at G2** |
| C11 | `lib/compliance.ts:65` | A1 | art. 66 da CLT (11h interregno) | **To verify at G2** |
| C12 | `lib/compliance.ts:7-12` | A4 | Six statutory thresholds (`120`, `240`, `360`, `15`, `60`, `660` minutes) defined as bare constants; the norms live only inside the pt-BR strings | **Uncited at the constant** |
| C13 | `components/organisms/salary-calculator.tsx:86` | A1 | *"como manda o art. 59, §1º, da CLT"* for the overtime base | **Not in F2–F5.** Found by S2 |
| C14 | `components/organisms/journey-form.tsx:142` | A1, A3 | *"art. 7º, XVI, da CF; art. 59, §1º, da CLT"* for the 50% floor | **Not in F2–F5.** Found by S2 |
| C15 | `components/organisms/journey-form.tsx:157` | A3 | *"Não existe lei que dobre o adicional depois da 2ª hora"* — a **negative** legal assertion, with no norm named | **Not in F2–F5.** Found by S3 |
| C16 | `components/organisms/calculator-views.tsx:85` | A1 | *"(Súmula 60 do TST)"* for the night-shift prorogation this app omits | **To verify at G2** |
| C17 | `components/organisms/day-summary.tsx:159` and `:213`; `lib/night-shift.ts:3` | A1, A3 | *"art. 73 da CLT"* rendered beside the reduced hour; *"Adicional noturno 20%"* restating `NIGHT_PREMIUM_RATE`; the module comment cites caput, §1º and §2º | **To verify at G2** — `PRODUCT.md` §9 already backs the rule |
| C18 | `lib/salary-period.ts:3-6` — `WORK_DAYS_PER_WEEK`, `PAID_MONTHS_PER_YEAR = 13`, `WEEKS_IN_DIVISOR` | A4 | `PAID_MONTHS_PER_YEAR = 13` folds the 13º salário into the "Ano" figure with no norm cited anywhere | **Uncited.** See § Boundary — this spec owns it, 0007 does not |
| C19 | `__tests__/calculator-views.test.tsx:103` | A2 | Pins the aggregator URL as the expected `href`, so the defect is asserted as correct behaviour by the suite | **Non-shipping surface carrying the claim.** Found by AC1's grep, not by F2–F5 |

### In scope

1. **Split `lib/legal-tables.ts`'s single `source`/`sourceUrl` into a source per legal data set**, so
   that C1 and C3 each carry the norm that actually creates them. The shape of the registry is
   `tech-lead`'s at G4; that it must carry one citation per table is this spec's.
2. **Replace every aggregator URL with an official government source**, per the definition in
   § What "primary source" means.
3. **Correct the rendered footer** (`calculator-views.tsx:90-99`) so each table named there is
   attributed to the norm that sets it. This is a user-visible string change: `content-writer` runs
   at G3.
4. **Complete C4's DSR citation** so the caption covers the base the code actually passes
   (`day-summary.tsx:118`), and reconcile it with C5's module comment. `labor-law-analyst` writes
   the citation; **no other agent may invent it.**
5. **Derive C6 and C7's rate spans from the table** rather than restating them, or accept the
   restatement and record the acceptance with its trigger.
6. **Give every A4 site a citation in the module that defines it** — C3, C12, C18 — per
   `AGENTS.md` §8, "every legal constant carries its source".
7. **Re-verify, at G2, the cells 0002 declared out of scope and never cleared**: the 2026 IRRF
   brackets, `simplifiedDeduction`, `dependentDeduction`, `exemptionCeiling` and the
   Lei 15.270/2025 `reduction` coefficients. They are *unverified, not cleared*
   (`0002 legal.md` §0). This spec is the first to reopen the salário path since, and it cannot
   attach a corrected citation to a value nobody has checked.
8. **Verify, do not assume, every citation in the inventory.** Per lesson 002, a citation this spec
   reopens is a citation this spec re-publishes. C8–C11, C13, C14, C16 and C17 are re-endorsed by
   being carried through, so each is checked at G2 whether or not a finding named it.

## Boundary with `0007-sumula-431-citation-scope`

Spec **0007** is being opened for the Súmula 431 attribution: `lib/salary-period.ts:40` and
`components/organisms/salary-calculator.tsx:151` attribute a general *weekly × 5* divisor rule to a
súmula whose text reaches only the 40h case.

**The boundary is drawn by citation, not by file.**

- **0007 owns the Súmula 431 attribution**, wherever it appears — today
  `lib/salary-period.ts:40` and `salary-calculator.tsx:151`, and any further site a search finds.
  This spec claims neither line and states no view on whether the attribution is correct.
- **This spec owns every other citation in the tree**, including citations in the same two files at
  other lines. `lib/salary-period.ts:3-6` (C18) is this spec's: `PAID_MONTHS_PER_YEAR = 13` is a 13º
  salário assertion, not a divisor assertion, and excluding the whole file would leave it owned by
  nobody. `salary-calculator.tsx:86` (C13) is this spec's for the same reason.
- **Neither spec claims a line the other claims.** The two intersect at the file level in
  `lib/salary-period.ts` and `components/organisms/salary-calculator.tsx`, and nowhere at the line
  level. Sequencing those two files between the specs is `tech-lead`'s at G4; it is a merge-order
  question, not a scope question.
- **If 0007's G2 concludes the divisor rule needs a source WorkLoad does not yet
  cite**, and that source is one this spec's registry must carry, the registry entry is **this
  spec's** and the attribution string is **theirs**. Recorded here so neither spec waits for the
  other to notice.

## What "primary source" means, operationally

This is a product question, so it is settled here rather than discovered at G2.

`planalto.gov.br` refused every connection during 0002's G2 run and was unreachable again at a
second consecutive law gate. This spec is entirely about sources, so the reachability of the source
host is a **precondition with an owner**, not a risk to be found mid-gate.

**The rule.** A citation satisfies `PRODUCT.md` §4 when its URL resolves to a host **operated by a
Brazilian public body** that publishes either the norm's text or its official publication. That
includes `planalto.gov.br`, `in.gov.br` (Diário Oficial da União), any `gov.br` domain of the
issuing ministry or agency, `camara.leg.br` (including Legin), `senado.leg.br`, and `tst.jus.br` for
súmulas. It excludes every commercial aggregator, every law-firm reproduction, and every
content site, regardless of accuracy.

**An official-but-secondary host satisfies the promise.** The property §4 protects is that *a
Brazilian public body vouches for this text and is obliged to keep it available* — not that the link
points at any one domain. Câmara/Legin, which `labor-law-analyst` has already used successfully,
qualifies. Where both are reachable, prefer the host that publishes the norm's own text over one that
consolidates it; where only one is reachable, use it and record which.

**Precondition, owner, and what happens if it fails.**

| | |
|---|---|
| Owner | `labor-law-analyst`, at G2, before writing any row of `legal.md` |
| What is owed | For every norm in the inventory, a reachable official URL, recorded in `legal.md` with the host actually used and the date it was reached |
| If `planalto.gov.br` is unreachable | Use an official alternative from the list above. This is not a degradation and needs no waiver. |
| If **no** official host serves a given norm | The spec is **blocked** and goes to the human. It does not fall back to an aggregator, and it does not ship the norm uncited. A third failure mode — shipping the old aggregator link for that one norm while fixing the others — is explicitly forbidden, because it would leave the defect in place under a spec that claims to have closed it. |

## Does any number change?

**No number on screen changes as a result of this spec's own work.** Every item in § In scope is a
citation, a link, a source field, or a prose restatement replaced by a derivation of a value that
already exists. Item 5's derivation must produce the identical string for the 2026 table — that is
AC7.

**One exception, and it is a stop, not a scope extension.** Item 7 re-verifies values nobody has
checked. If G2 finds any of them wrong, **this spec blocks and goes to the human** rather than
correcting the number itself. The reason is lesson 002 in its sharpest form: attaching a freshly
verified, correctly-sourced citation to a wrong number is worse than the aggregator link, because it
converts an unverified number into one four agents have signed. The number is corrected by a spec
whose acceptance criteria are arithmetic, opened by `tech-lead` at that moment — not by this one,
whose criteria are all provenance and would read green over the defect.

## Inputs and defaults

**This spec introduces no user input.** No field, no toggle, no setting. Nothing about the ten-second
path in `PRODUCT.md` §1 changes, and there is no default to state because there is nothing to
default. Recorded explicitly so that a downstream agent does not read the silence as an omission
and add a "ver fonte" control nobody asked for (see § Non-goals).

## Out of scope

Each exclusion states the property it protects and the gates that may override it.

- **No change to any computed value.** Protects the falsifiability of this spec's central claim —
  that provenance can be fixed without touching arithmetic — which is checkable only if
  `pnpm test` passes unchanged (AC9). **Override:** `labor-law-analyst` at G2 may find a value
  wrong; the route is then the block in § Does any number change?, not a quiet correction here.
- **No change to the Súmula 431 attribution** at `lib/salary-period.ts:40` or
  `components/organisms/salary-calculator.tsx:151`. Protects the sibling spec's ability to own one
  question end to end, and protects both specs from two agents editing one claim. **Override:**
  `tech-lead` at G4, and only to sequence the two files — never to move the claim.
- **No layout, type, color, spacing or motion change.** Protects the reviewability of a
  citation-only diff: a visual change mixed into it makes "nothing moved that should not have
  moved" unfalsifiable. **Override:** `product-designer` at G3, bounded to whatever the corrected
  footer text needs in order to stay legible at 390 under the floor in `0006`'s LR2 — and the
  override must be named in the criterion that verifies it (AC10). An accessibility or legibility
  floor overrides this exclusion without a waiver.
- **No new citation for a rule WorkLoad does not compute.** Protects `PRODUCT.md` §5's "clarity over
  completeness": the footer is already a dense paragraph, and a citation for something the app does
  not calculate costs attention and buys nothing. **Override:** `labor-law-analyst` at G2, where a
  **gap** disclosure (§4, "name the gap") requires naming the norm the app is omitting — that is not
  a new citation, it is an existing obligation, and it wins.
- **No version history, no "vigente desde / até" timeline, no second legal year.** Protects
  `PRODUCT.md` §3's one-file-diff constraint for a yearly table change: a registry that models
  supersession is a registry one person cannot maintain. `LEGAL_YEARS` already keys by year and
  that is the whole mechanism. **Override:** none at any gate in this spec; it requires a new spec.
- **No convenção coletiva sourcing.** `PRODUCT.md` §7 forbids the database outright. Protects a
  refusal a human already made. **Override:** a human amending §7, and nothing else.
- **No re-derivation of 0002's or 0005's cosmetic findings.** Protects this spec from becoming the
  second design pass `tech-lead` refused at Run 0. **Override:** none.

## Legal dependencies

Every rule this change relies on, named and not stated. `labor-law-analyst` settles each at G2, with
an official URL per the precondition above.

| # | Dependency | Why this spec needs it | Inventory rows |
|---|---|---|---|
| L1 | The norm that sets the **2026 RGPS (INSS) contribution table** and its ceiling | The footer names one norm for it today; the registry needs it as that table's own source | C1, C3 |
| L2 | The norm that sets the **2026 IRRF table**, its brackets and deductions | Currently credited to L1's norm, which does not set it | C1, C3 |
| L3 | The norm behind the **simplified deduction** and the **reduction coefficients** in `reduction` | Uncited values feeding the salário screen; also item 7's re-verification | C3 |
| L4 | The norm behind the **dependent deduction** and the **exemption ceiling** | Same | C3 |
| L5 | The norm that creates the **federal RPPS contribution ladder** (7,5%–22%, uncapped) | Attributed today to a Portaria that does not create it | C3, C7 |
| L6 | The norm behind the **DSR reflection of horas extras** | The base at `day-summary.tsx:118` is wider than what the cited súmula covers | C4, C5 |
| L7 | The norm behind the **DSR reflection of the adicional noturno** specifically | F2's missing citation. This spec does not name it; G2 does | C4, C5 |
| L8 | The norms behind the **daily overtime limit**, the **intervalos intrajornada** (both thresholds and the collective reduction), the **interjornada rest**, and the **50% indemnity on a suppressed interval** | Six bare constants at `lib/compliance.ts:7-12` and four warning strings that quote them | C8–C12 |
| L9 | The norms behind the **50% overtime floor** and the assertion that **no norm doubles it after the 2nd hour** | C15 is a negative legal assertion with no source; a negative claim needs a source as much as a positive one | C13, C14, C15 |
| L10 | The norm behind the **night-shift prorogation after 05:00** that WorkLoad omits | Named in a gap disclosure, so it must be right | C16 |
| L11 | The norms behind the **20% night premium**, the **52min30s reduced hour** and the **22:00–05:00 window** | `PRODUCT.md` §9 already backs these; the citation is re-published by being carried | C17 |
| L12 | The norm that creates the **13º salário** | `PAID_MONTHS_PER_YEAR = 13` puts it in the "Ano" figure with no citation anywhere | C18 |
| L13 | Which **official host** serves each of L1–L12, and whether it was reachable | The precondition above | all |

## Acceptance criteria

| # | Criterion | How it is verified |
|---|---|---|
| AC1 | `grep -rn --include='*.ts' --include='*.tsx' -iE "legisweb\|jusbrasil\|normaslegais\|guiatrabalhista\|contabeis\.com" app/ components/ lib/ hooks/ __tests__/ tests/` returns **zero lines**. The boundary is the whole tree including tests and fixtures, not the one line F4 names. **Run at G1 it returns two:** `lib/legal-tables.ts:48` and `__tests__/calculator-views.test.tsx:103`, which pins the aggregator URL as an expected value. Per lesson 003, the test is a non-shipping surface carrying the claim and it is in scope; it inherits the fix rather than becoming a second source of truth | Run the command; output is empty |
| AC2 | Every URL reachable from a `source`-bearing field in `lib/` has a host in the allow-list in § What "primary source" means. A unit test asserts the host of every such URL against that list and fails on any other host | `pnpm test` |
| AC3 | No two distinct legal data sets in `LEGAL_YEAR_2026` share one `source` unless one norm genuinely sets both, and where they share one, `legal.md` says which norm and why | Read `lib/legal-tables.ts` against `legal.md`'s tables; the count of distinct sources in the file equals the count of distinct norms in `legal.md` |
| AC4 | The footer rendered at `/` and at `/custo-da-hora` names the INSS table and the IRRF table with **different** norms, each hyperlinked to its own official URL | Load both routes in a browser; read the footer; click each link and confirm it resolves to a `gov.br` / `leg.br` / `jus.br` host serving the named norm |
| AC5 | Every `lib/` constant and data set listed as A4 in the inventory (C3, C12, C18) carries a norm citation in the module that defines it, matching `legal.md` | `grep` each module for its citation comment and diff the norms against `legal.md`'s § Sources |
| AC6 | The DSR caption at `components/organisms/day-summary.tsx` and the source comment at `lib/weekly-rest.ts` cite the **same** set of norms, and that set covers every component of the base passed at `day-summary.tsx:118` | Read both against `legal.md` L6 and L7 |
| AC7 | `grep -rn --include='*.ts' -E "[0-9]+([,.][0-9]+)?%" lib/payroll.ts` — run at G1 it returns lines **24 and 32**, carrying `7,5% a 14%`, `até 22%` and `muitas vezes 14% linear`. After the change, **every line it still returns is one `legal.md` records as not derivable from `lib/legal-tables.ts`**, with the norm that backs it and the trigger that would invalidate it. A literal that *is* derivable and still present fails this criterion. (The state/municipal `14% linear` is expected to remain: no table in `lib/` holds it, which is why it needs a source rather than a derivation) | Run the command; for each remaining line, find its row in `legal.md` |
| AC8 | With the 2026 table in place, the regime strings render **character-identical** to what ships today — `"7,5% a 14%"` and `"até 22%"` — proving the derivation is a refactor and not a content change | A unit test asserting the full rendered string, run before and after |
| AC9 | `pnpm test` passes with **no assertion changed for a numeric expectation**. Any test diff is a citation string, a source URL, or a new test | `pnpm check`; inspect the test diff for changed numeric literals |
| AC10 | At 390 px in both themes, the footer shows no horizontal overflow and every alert reaching the ~40-character floor from `0006`'s LR2 still meets it after the longer norm names land. Any layout adjustment made to satisfy this is the bounded override named in § Out of scope and is listed in `design.md` | `node .agents/tools/preview.mjs --out <dir>` at 390 in dark and light; Playwright's existing overflow spec |
| AC11 | `legal.md` records, for each of L1–L12, the official URL, the host, and the date it was reached. No row is blank and no row cites a host outside the allow-list | Read `legal.md`; re-request each URL |
| AC12 | `legal.md` states, for each of the five values in item 7, whether it was re-verified against its norm and what the norm says. A row reading "unverified" blocks the gate | Read `legal.md` § Tables |
| AC13 | No line in `lib/salary-period.ts:40` or `components/organisms/salary-calculator.tsx:151` is modified by this spec's commits | `git diff` over the two files for this spec's range shows no hunk touching those lines |
| AC14 | Re-running S1, S2 and S3 from § How this scope was produced reproduces the inventory exactly — no site in the output that the inventory lacks | Run the three commands; compare line by line against § Citation inventory |

## Disclosure obligations

Where this change computes or shows something a real payslip would treat differently, the app says
so out loud (`PRODUCT.md` §4, "name the gap").

| Obligation | Why it arises here | Who settles it |
|---|---|---|
| **The year is part of the answer.** The footer already names the competence year and the effective date; splitting one source into several must not drop either from any of them | `PRODUCT.md` §4, third commitment | `content-writer` at G3, over text `labor-law-analyst` settles at G2 |
| **A norm that WorkLoad names only to say it is *not* computed** (C16's Súmula 60 for the post-05:00 prorogation) stays a gap disclosure and does not become a claim | §4, "name the gap". The registry must not read as though the app applies every norm it cites | `labor-law-analyst` at G2 |
| **The RPPS strings assert a limit on their own applicability** — *"não vale para servidor estadual ou municipal"* (C7). That sentence is itself a gap disclosure and its accuracy is in the domain | §4 | `labor-law-analyst` at G2 |
| **If any inventory citation turns out to be unsupportable**, it is retired with a recorded non-claim and its unlock sequence, never by silently deleting the words (lesson 003). `PRODUCT.md` §9's non-claim table gains the row in the same amendment | §9 | `product-manager`, on the bounce |
| **A negative legal assertion carries a source** (C15: *"não existe lei que dobre o adicional"*). If none can be given, the sentence is rewritten to state what the app does rather than what the law does not | §4, "cite or omit" | `labor-law-analyst` at G2, `content-writer` at G3 |

## Non-goals

What a well-meaning agent downstream might add, and must not:

- **A "ver todas as fontes" page, drawer, modal or expandable.** The registry is data; its only
  surface is the citations already on screen. A new surface is a new spec.
- **A tooltip or popover on each citation.** `PRODUCT.md` §5: every element added costs attention.
- **Fetching, validating or link-checking a norm URL at runtime.** `PRODUCT.md` §3 — nothing at
  runtime. A link check belongs in a test or in CI, never in the app.
- **Quoting the text of a norm in the UI.** WorkLoad cites and computes; it does not reproduce law,
  and `PRODUCT.md` §7 forbids legal advice.
- **Adding a second legal year "while the registry is open."** See § Out of scope.
- **Softening a wrong citation into a vaguer one** ("com base na legislação vigente") to make it
  defensible. `PRODUCT.md` §4 is *cite or omit*; a vague citation is neither.
- **Rewording a citation to be friendlier.** The norm's name is the norm's name; only
  `content-writer` touches the prose around it, at G3, over text G2 settled.

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| Does an official-but-secondary host (Câmara/Legin) satisfy §4, or must it be the issuing body? | **Yes, it satisfies it.** Prefer the issuing body where reachable; record which was used | §4 protects the guarantee that a public body vouches for the text and must keep it available, not any one domain. `labor-law-analyst` has already used Câmara/Legin successfully |
| Does every data set need its own source, or only those whose norms differ? | **Every data set carries a source field**, even when two share a norm | A shared source written once is how C1 became wrong; explicit repetition is what makes a yearly diff one file and one review |
| Should the 50%/100% overtime rate defaults be re-cited, given they are user-configurable? | **Yes** — C14 is in the domain | The floor is a statutory claim regardless of what the user then types over it |
| Does this spec fix a number found wrong at G2? | **No — it blocks** | See § Does any number change? |
