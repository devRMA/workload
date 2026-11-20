# 0003 — citation registry

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** draft
**Next agent:** product-manager (G1 — write `spec.md` against the findings below)
**Bounces:** 0

Opened by `tech-lead` at the G2 triage of spec 0002, so that four findings raised there
survive outside a closed spec's rejecting report. None of them was caused by 0002; all four
require `lib/legal-tables.ts` or a content change to a citation, both of which 0002 forbids.

`labor-law-analyst` asked for this spec to be scheduled **ahead of any further cosmetic
work** (`.specs/0002-design-taste-preflight/legal.md` §7): F3 and F4 together are a
`PRODUCT.md` §4 defect on the product's central promise, in the one line whose job is to
keep it.

## Carried findings

| # | Severity | Where | What is wrong | Source of record |
|---|---|---|---|---|
| F2 | major | `components/organisms/day-summary.tsx:118`, `:219-222` | The DSR base passed to `restDayPayOnOvertime` is `firstTierPay + extraTierPay + nightPay`, so it includes the adicional noturno — but the caption cites only Súmula 172 do TST, which covers horas extras. The night premium's reflection rests on Lei nº 605/1949, art. 7º, "a". The number is defensible; the citation is incomplete. **No agent may invent the missing citation** — `labor-law-analyst` writes it. | 0002 `legal.md` §6.2 |
| F3 | major | `components/organisms/calculator-views.tsx:90-99` | The footer credits Portaria Interministerial MPS/MF nº 13/2026 for **both** the INSS and the IRRF tables. The Portaria sets the RGPS table only; the 2026 IRRF rules come from Lei nº 15.270/2025. Requires `lib/legal-tables.ts` to carry a source **per table**. | 0002 `legal.md` §7 |
| F4 | major | `lib/legal-tables.ts:47` | `sourceUrl` is `https://www.legisweb.com.br/legislacao/?id=489284`, a commercial aggregator, rendered to the user at `calculator-views.tsx:92` as **the** link behind the norm. A primary source exists: `https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf`. | 0002 `legal.md` §7 |
| F5 | minor | `lib/payroll.ts:24` | `"alíquotas progressivas de 7,5% a 14%"` hand-restates `rgpsBrackets[0].rate` and `rgpsBrackets[3].rate`. Correct for 2026; it goes stale silently the year a rate moves, which is the drift the year-indexed registry exists to prevent (`PRODUCT.md` §3: a yearly change is a one-file diff). Derive the span from `TABLE.rgpsBrackets`, or accept and record. | 0002 `legal.md` §7 |

## Also carried, not a finding

`labor-law-analyst` declared out of scope at 0002 and did **not** re-derive: the 2026 IRRF
brackets, `simplifiedDeduction`, `dependentDeduction`, `exemptionCeiling` and the
Lei 15.270/2025 `reduction` coefficients in `lib/legal-tables.ts`. They are **unverified,
not cleared**. Any spec touching the salário path must re-verify them against
Lei nº 15.270/2025 (0002 `legal.md` §0).

planalto.gov.br refused every connection during the 0002 G2 run. CLT art. 59 *caput* and
Lei nº 605/1949 art. 1º rest on agreeing secondary reproductions there; re-verify from a
host that can reach planalto.

## Decisions log

| When | Agent | Decision |
|---|---|---|
| 0005 G10 | tech-lead | **F4 re-confirmed on the deployed artifact and stays here.** `labor-law-analyst` flagged `lib/legal-tables.ts`'s aggregator `sourceUrl` a third time during 0005 — at G6 against the production build (`reports/legal.md` F2) and again at G9 against the Vercel preview (G9-F2), where the link is what a user actually clicks under the norm. It was out of reach both times: 0005's AC11 forbids touching `lib/`. Nothing about it changed except the count of gates that have now seen it, and the line number drifted from `:47` to `:48`. **Do not re-triage it — it is F4 above; the only thing G10 adds is that the primary source has already been located and is written into F4, so no search is owed.** |
| Run 0 | tech-lead | Opened this spec at 0002's G2 triage. A finding that lives only in the rejecting report of a spec that then closes is a finding the squad paid for and lost. Scope is the four findings above and the citation registry they share; it is not a second cosmetic pass. |
