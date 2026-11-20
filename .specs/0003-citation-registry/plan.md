# 0003 — Implementation plan

> Owner: tech-lead · Gate: `plan` · Run 1 · Date: **2026-09-19**

---

## 0. What binds this plan, and what it is not allowed to re-open

| Input | What it settles here |
|---|---|
| `spec.md` | the domain test A1–A4, the nineteen inventory rows C1–C19, AC1–AC14, and the § Out of scope exclusions |
| `legal.md` §§1–15 | every norm, every URL, the divergence table §10 (D-1…D-21), the seven disclosures §11, the non-claim §12 |
| `legal.md` §16 (addendum, run 2) | **D3 restated as D3.1–D3.4** (§16.1). Where §16 and §11 D3 disagree, §16 wins. `R-2` is released from D3 and bound only by §12. Findings L-1 and L-2 are routed, not absorbed |
| `design.md` run 2 | the slots S1–S13, the budgets, the tokens, the placement table §8, the ordering rule §8.1, the a11y table §9 |
| `copy.md` run 1 + addendum run 2 | every pt-BR string, including `R-3`. **No string is shortened, re-worded, or "made to fit" by this plan or by the developer.** |

**Numbers.** `legal.md` §9.0 verified all five of item 7's cells; the wrong-number block in `spec.md` is **not** triggered. No arithmetic changes anywhere in this plan. `legal.md` §8's worked examples are what a G6 run must still reproduce to the centavo, and no task touches a function that produces them.

**No numeric performance criterion exists in this spec**, so the decomposition-and-attribution rule in `.agents/agents/tech-lead.md` (promoted lesson 010) has nothing to bind: there is no metric, no lever and no before-number to take. The only measured quantities are geometric (line boxes, cpl, border-box widths) and every one of them was measured by `product-designer` and `labor-law-analyst` on isolated production builds; this plan re-uses those readings and does not project any new one.

---

## 1. Architecture

### 1.1 The registry — the shape `legal.md` §7 imposed, and the shape this gate chose

`legal.md` §7 imposes exactly three constraints and leaves the rest to G4:

1. each data set carries **its own** source field, even where two share a norm;
2. a data set may need **more than one** source, so the shape must admit a **list**;
3. each source carries **its own** `effectiveFrom`.

The chosen shape keeps every value exactly where it is today and adds one sibling record. Nothing that computes a number is re-typed, so `lib/payroll.ts` and every consumer of `rgpsBrackets`, `incomeTaxBrackets` and the rest compile unchanged — which is what makes AC9 (`pnpm test` with no numeric expectation altered) checkable rather than hopeful.

```ts
export interface NormSource {
  readonly norm: string;
  readonly url: string;
  readonly effectiveFrom: string;
}

export interface DerivedSource {
  readonly derivedFrom: string;
  readonly effectiveFrom: string;
}

export type DataSetSource = NormSource | DerivedSource;

export interface LegalSources {
  readonly rgpsBrackets: readonly [NormSource];
  readonly rgpsCeilingDiscount: readonly [DerivedSource];
  readonly rppsFederalBrackets: readonly [NormSource, NormSource];
  readonly incomeTaxBrackets: readonly [NormSource];
  readonly topIncomeTaxRate: readonly [NormSource];
  readonly simplifiedDeduction: readonly [NormSource, DerivedSource];
  readonly dependentDeduction: readonly [NormSource];
  readonly exemptionCeiling: readonly [NormSource];
  readonly reduction: readonly [NormSource];
}
```

Why these decisions, so no gate downstream has to reconstruct them:

- **A tuple per key, not `readonly DataSetSource[]`.** The arity is the ruling: `rppsFederalBrackets` has two sources because a constitutional rule sets the rates and a Portaria reajusts the faixas (`legal.md` §7 rows 3–4); `simplifiedDeduction` has a rule-norm and an operand (row 7). A tuple makes the count a compile error to get wrong, and makes `sources.rppsFederalBrackets[1]` safe to index.
- **A discriminated pair of interfaces, not one interface with optional fields.** `rgpsCeilingDiscount` and the `simplifiedDeduction` operand are **derived**; no norm contains the figure (`legal.md` §7 row 2, §6.4). Giving them a `norm` field would re-create exactly the defect this spec exists to remove — a data set attributed to a norm that does not contain its number. They carry `derivedFrom` and no URL. Narrow with `"norm" in source`.
- **The record-level `source`, `sourceUrl` and `effectiveFrom` are deleted, not kept.** `legal.md` D-1, D-2 and D-7 are the three defects; a field kept "for compatibility" is the field the next reader trusts. Their only consumer is the footer, which T2 rewrites in the same task that removes them.
- **Each entry is written out as its own object literal, with its URL as a literal string, even where two entries carry the same norm** (`incomeTaxBrackets` / `topIncomeTaxRate`, `exemptionCeiling` / `reduction`). `legal.md` §7 and `copy.md` N-6 both require repetition rather than reference: *"repeated in full, never referenced"*. Nine norm entries, **seven distinct norm strings** — which is the number AC3 is scored against.

### 1.2 Where each rule lives

No business rule moves and none is added. What moves is provenance:

| Concern | Module | Change |
|---|---|---|
| the tables, and the norm behind each | `lib/legal-tables.ts` | gains `sources`; loses `source`, `sourceUrl`, `effectiveFrom` |
| the regime helper strings | `lib/payroll.ts` | the two rate spans stop being literals and are derived from the tables |
| pt-BR percent rendering | `lib/utils.ts` | one new formatter, `formatPercent` |
| the DSR reflex | `lib/weekly-rest.ts` | the source comment gains the two missing norms and loses the wrong paragraph |
| the CLT thresholds | `lib/compliance.ts` | six constants gain their norm; four warning bodies gain the norms they assert |
| the 13º in the "Ano" figure | `lib/salary-period.ts` | `PAID_MONTHS_PER_YEAR` gains its norm |
| rendering | `components/**` | strings and three new `<p>` captions, no new file, no new atom |
| hooks | — | **untouched.** No hook is opened by this spec |

**No hook changes and no arithmetic changes.** Everything in `hooks/` that `legal.md` §16.3–§16.4 flags (L-1, L-2) is routed in §1.4 and belongs to another spec.

### 1.3 Component tree — atomic levels

Every row is `design.md` §3, re-read against the tree on 2026-09-19. No new file at any level.

| Element | Level | File | Change |
|---|---|---|---|
| legal footer P3 / P4 | organism | `components/organisms/calculator-views.tsx` | text (P3), rebuilt paragraph with four `<a>` (P4) |
| D1 hint | molecule (existing `Field.hint`) | `components/organisms/journey-form.tsx` | string only |
| D3 / `R-3` caption | molecule | `components/molecules/regime-field.tsx` | one conditional `<p>` inside the existing `<fieldset>` |
| D4 / `D-3` caption | organism | `components/organisms/day-summary.tsx` | one unconditional `<p>` in the variable-pay block |
| D6 / `P-1` caption | organism | `components/organisms/salary-calculator.tsx` | one conditional `<p>` after `PeriodSelector`, inside the hero |
| period group description | molecule | `components/molecules/period-selector.tsx` | one optional prop, `describedById` |
| `D-1`, `D-2` | organism | `components/organisms/day-summary.tsx` | text only |
| `R-1`, `R-2` | — | `lib/payroll.ts` | text, derived |
| `S-1` | organism | `components/organisms/salary-calculator.tsx` | text only |
| `C-1`…`C-4` | — | `lib/compliance.ts` | text only |

**Data flow.** `lib/legal-tables.ts` → `lib/payroll.ts` (`WORK_REGIME_INFO`, unchanged consumers) → `components/molecules/regime-field.tsx`; and `lib/legal-tables.ts` → `components/organisms/calculator-views.tsx` (the footer, the only surface that renders a `sources` entry). `lib/compliance.ts` → `hooks/use-work-calculator.ts` → `components/organisms/day-summary.tsx` (strings only, no shape change).

### 1.4 The rulings this gate owes — each is a decision, not a question

**Q2 — for a field hint, `surfaceRoot` is the field, not the panel. The padding step is dropped.**
LR2a reads `bodyText.width ≥ surfaceRoot.width − 32`, and the 32 px is a budget for **one surface's own chrome**. A panel holding a two-column grid of three fields is not one hint's surface: under that reading, every multi-column layout fails by construction, and `design.md` §11 Q2 measures exactly that — the panel-relative spend returns to 50.00 at 1440 whatever the padding does below `sm`. `design.md` §11 Q2 also records that the step buys **nothing** for LR2b (M21: the delivered `J-1` reads 41.00 cpl in a 258.00 px column and 41.00 in a 282.00 px column) and that a field ruling *"deletes the step outright — no string in §7 needs re-measuring, no other slot depends on it, and `journey-form.tsx` then stays closed"*. Ruled: **the field**. `journey-form.tsx`'s panel container keeps `p-6` exactly as it ships; T7 changes one string and nothing else. `design.md` §7 S4's 258.00 px column is the one that binds, and the delivered `J-1` clears it at 41.00.

**`R-3`'s position inside the `<fieldset>`: last child, after `CollapsiblePanel`.**
`copy.md` requires it to be a sibling of the `<button>` and of `CollapsiblePanel`, inside the same `<fieldset>`, and `design.md` §8 asks for it *directly below the regime control*. Both placements are byte-identical in every closed state, which is the state D3.1 and D3.2 are about. Placing it **after** the panel keeps the disclosure button adjacent to the region its `aria-controls` names, and never inserts text between a control and the region it opens. The `<fieldset>`'s existing `space-y-2` gives the 8 px offset `design.md` §4 specifies.

**The footer's anchor text: three come from the registry, one is a literal, and that is deliberate.**
`copy.md` `F-1a`, `F-1b` and `F-1c` are character-identical to `N-1`, `N-5` and `N-3`, so those three anchors render `source.norm` and inherit the yearly diff. `F-1d`'s anchor is *"Anexo III da Portaria nº 13/2026"*, which is a shorter display form of `N-4` — deliberately different so the two Anexos of one document do not read as one attribution (`copy.md`, *Why `F-1d` repeats a URL*). That one anchor's text is a literal; its `href` and its date still come from `sources.rppsFederalBrackets[1]`, so D5's pairing stays structural: **every rendered date is `formatIsoDate` of the `effectiveFrom` of the very entry whose `href` precedes it.**

**The source link keeps its shipped treatment and gains the transition `design.md` §5.1/§6 specify.**
Class, for all four links: `underline underline-offset-2 transition-colors duration-(--duration-fast) ease-standard hover:text-accent-ink`. No transform is involved, so §6's reduced-motion row is *kept* and no `motion-reduce:` neutralizer is owed.

**`F-1`'s RPPS clause ships whole. Nothing is routed to `product-manager` on it.**
`design.md` §10.2 M16 measured the footer on the **398-character string that contains the clause** — 7 line boxes, 56.86 cpl at 390, 4 → 99.50 at 1440, footer 302.25 → 389.20 px, `scrollWidth` equal to the viewport at all four widths. There is no space argument against it, and a `PRODUCT.md` §4 ruling would only be owed if something were being **cut**. Nothing is. Carrying the delivered string is the default and it needs no decision.

**The Forty-Four Rule clarification is approved and its provenance is recorded.** The human delegated this batch's approval points to `tech-lead` (see `STATUS.md`). The footer therefore ships three to five inline links. Landing the sentence in `DESIGN.md` is **T10**, at G7, and it is `release-manager`'s.

**L-1 (critical) and L-2 (major) are routed out of this spec, and neither blocks it.**
- **L-1** is spec `0012`; `product-manager` already ruled it non-blocking for 0003 (`STATUS.md`, run 2). Nothing in this plan touches `hooks/use-work-calculator.ts`.
- **L-2** — `Extra {rate}%` rendering as a money label outside the panel — is **recorded with an owner and a trigger rather than given a spec of its own.** Owner: `product-manager`. Trigger: **already fired** — `0012` owns `hooks/use-work-calculator.ts`'s tier arithmetic and the very lines L-2 names, so L-2 is folded into `0012`'s scope at its G1; if `0012` refuses it, `product-manager` opens `0013`. Opening a second spec over the same two files while `0012` is in flight buys a merge conflict and no coverage. Recorded in `STATUS.md` § Blockers with that owner and that trigger.

### 1.5 Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| pt-BR percent rendering (`0.075 → "7,5%"`) | **`Intl.NumberFormat`**, a new `formatPercent` in `lib/utils.ts` beside the existing `CURRENCY_FORMATTER` / `AMOUNT_FORMATTER` | Platform. Verified in this tree on 2026-09-19: `new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 2 })` prints `7,5%`, `14%`, `22%`, `16,5%` — no space before `%`, comma decimal, no trailing zero. AC8's character-identity holds without a single hand-written rule |
| link opening, date formatting, class merging | `formatIsoDate`, `formatCurrency`, `cn` — all already in `lib/utils.ts` | reuse |
| **New dependency** | **none** | Nothing here needs one |

### 1.6 Test strategy

Coverage bars are unchanged: **100 % statements/branches/functions/lines in `lib/**` and `hooks/**`**, **90 % in `app/**` and `components/**`**.

- `lib/legal-tables.ts` gains **data and types only** — no branch. The new `formatPercent` in `lib/utils.ts` is one line and gets its own cases.
- Every new component branch is a binary conditional (`R-3` present/absent, `P-1` present/absent) and **both** sides are asserted, in the component's own test file, by accessible role and name. `D-3` has no branch and is asserted in a state where the night minutes are **zero**, which is the state it exists for.
- **Never assert a Tailwind class string.** The two geometry facts this spec depends on — the `<fieldset>` border box and the footer's measure — are asserted in a **real browser** (T9), never in jsdom.
- Three cross-tree guards live in one new file, `__tests__/citation-guards.test.ts`, because they belong to the spec rather than to a module: the aggregator boundary (AC1), the host allow-list (AC2), the absence of derivable rate literals in `lib/payroll.ts` (AC7), and the norm comment on every A4 constant (AC5).
- Every guard **asserts the size of the set it iterates before iterating**, and counts its one exemption, so `measured + exempt = expected` is checkable (`AGENTS.md` §5).

### 1.7 The strings, verbatim — measured, not transcribed

Every string below was rendered from its interpolations in this tree on 2026-09-19 and its character count compared with `copy.md`'s. **All fifteen match**, including the three that are built by interpolation:

| id | Chars | Rendered from | Verified |
|---|---|---|---|
| `F-1` | **398** | three `effectiveFrom` dates + `year` + three `norm` strings | identical, character for character, to `copy.md`'s `F-1` |
| `R-1` | **166** | `formatPercent` of `rgpsBrackets[0].rate` and `[3].rate`, `formatCurrency` of the ceiling and the capped discount, `TABLE.year` | identical to the string that ships today |
| `R-2` | **463** | `formatPercent` of `rppsFederalBrackets` last rate, `TABLE.year` | matches `copy.md` |
| `R-3` 136 · `F-2` 424 · `J-1` 164 · `D-1` 255 · `D-2` 23 · `D-3` 122 · `P-1` 162 · `S-1` 191 · `C-1` 211 · `C-2` 207 · `C-3` 252 · `C-4` 249 | | literals | each matches `copy.md`'s count |

The texts themselves are in `copy.md` § *Strings* and are quoted in the task that ships each. **A task that cannot reproduce its character count exactly is a finding: stop and raise it, do not adjust the string.**

---

## 2. Tasks

Ordering rule: the tree compiles and `pnpm check` passes after **every** task.

---

### T1 — Add the source registry to `lib/legal-tables.ts`

- **Files:** `lib/legal-tables.ts` (edit), `__tests__/legal-tables.test.ts` (edit), `__tests__/citation-guards.test.ts` (create)
- **Depends on:** none
- **Reuse:** nothing to reuse; this is the new record. Do **not** add a helper module.
- **What to build:**
  1. Add `NormSource`, `DerivedSource`, `DataSetSource` and `LegalSources` exactly as typed in §1.1 of this plan, above `LegalYear`.
  2. Add `readonly sources: LegalSources;` as the **last** field of `LegalYear`. **Leave `source`, `sourceUrl` and `effectiveFrom` in place for now** — T2 removes them together with their only consumer.
  3. Add `sources: LEGAL_SOURCES_2026` to `LEGAL_YEAR_2026`, with `LEGAL_SOURCES_2026` declared above it. Each entry is its own object literal, URL included as a literal string — no shared constant, no reference to a sibling entry:

  | key | entry | `norm` / `derivedFrom` | `url` | `effectiveFrom` |
  |---|---|---|---|---|
  | `rgpsBrackets` | `[0]` | `Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II` | `https://www.gov.br/previdencia/pt-br/assuntos/rpps/documentos/PortariaInterministerialMPSMF13de9dejaneirode2026.pdf` | `2026-01-01` |
  | `rgpsCeilingDiscount` | `[0]` *(derived)* | `Calculado sobre a tabela do INSS de 2026 (Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II)` | — | `2026-01-01` |
  | `rppsFederalBrackets` | `[0]` | `Emenda Constitucional nº 103/2019, art. 11` | `https://www2.camara.leg.br/legin/fed/emecon/2019/emendaconstitucional-103-12-novembro-2019-789412-publicacaooriginal-159409-pl.html` | `2020-03-01` |
  | `rppsFederalBrackets` | `[1]` | `Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo III` | same PDF URL as `rgpsBrackets[0]`, written out again | `2026-01-01` |
  | `incomeTaxBrackets` | `[0]` | `Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025` | `https://www2.camara.leg.br/legin/fed/lei/2025/lei-15191-11-agosto-2025-797839-publicacaooriginal-176105-pl.html` | `2025-05-01` |
  | `topIncomeTaxRate` | `[0]` | same norm and URL as `incomeTaxBrackets[0]`, **written out in full again** | same | `2025-05-01` |
  | `simplifiedDeduction` | `[0]` | `Lei nº 9.250/1995, art. 4º, §2º` | `https://www2.camara.leg.br/legin/fed/lei/1995/lei-9250-26-dezembro-1995-362566-normaatualizada-pl.html` | `2023-08-28` |
  | `simplifiedDeduction` | `[1]` *(derived)* | `25% do teto da faixa isenta da tabela do IRRF de 2026` | — | `2025-05-01` |
  | `dependentDeduction` | `[0]` | `Lei nº 9.250/1995, art. 4º, III, alínea "i"` | same `lei-9250 … normaatualizada` URL, written out again | **`2015-04-01`** |
  | `exemptionCeiling` | `[0]` | `Lei nº 9.250/1995, art. 3º-A, acrescido pela Lei nº 15.270/2025` | `https://www2.camara.leg.br/legin/fed/lei/2025/lei-15270-26-novembro-2025-798354-publicacaooriginal-177117-pl.html` | `2026-01-01` |
  | `reduction` | `[0]` | same norm and URL as `exemptionCeiling[0]`, **written out in full again** | same | `2026-01-01` |

  The `norm` strings are `copy.md` `N-1`…`N-10` verbatim; the URLs are `legal.md` §7, each of which returned `200` on 2026-09-15. **No URL may be replaced with a `planalto.gov.br` equivalent** (`legal.md` §2, ruling on the registry's URLs). `dependentDeduction`'s `2015-04-01` is not a typo and is not a 2026 date.
  4. **No comment anywhere in this file.** The norm is the data.
- **Tests:**
  - `__tests__/legal-tables.test.ts` — add, keeping every existing case untouched in this task:
    - *"gives every legal data set at least one source"* — iterate `Object.entries(table.sources)`; assert the key count is **9** before iterating, and each value has length ≥ 1.
    - *"attributes the RPPS ladder to two norms, the rates and the faixas"* — `sources.rppsFederalBrackets` has length 2, `[0].norm` contains `Emenda Constitucional nº 103/2019`, `[1].norm` contains `Anexo III`.
    - *"marks a derived value as derived instead of attributing it to a norm"* — `sources.rgpsCeilingDiscount[0]` and `sources.simplifiedDeduction[1]` have no `norm` property (`expect("norm" in entry).toBe(false)`) and carry a non-empty `derivedFrom`.
    - *"dates each source by the norm that sets it, not by the record's year"* — `sources.incomeTaxBrackets[0].effectiveFrom === "2025-05-01"`, `sources.dependentDeduction[0].effectiveFrom === "2015-04-01"`, `sources.rppsFederalBrackets[0].effectiveFrom === "2020-03-01"`.
    - *"names seven distinct norms across nine attributions"* (AC3) — flatten every entry, keep those with `norm`, assert the array length is **9** and `new Set(norms).size` is **7**.
  - `__tests__/citation-guards.test.ts` — create, with the host guard only (the other three guards land in T2, T3 and T4):
    - `ALLOWED_HOSTS` is the fourteen-host list in `legal.md` §2 *The allow-list, restated as a test*, as a `Set<string>`.
    - *"every source URL resolves to an official Brazilian public host"* (AC2) — collect every `NormSource` from `CURRENT_LEGAL_YEAR.sources`; assert the collected count is **9** before iterating; for each, `expect(ALLOWED_HOSTS.has(new URL(entry.url).hostname)).toBe(true)`. **Compare the parsed `hostname`, never `includes()`** — `legal.md` §2 requires a string like `legisweb.com.br/gov.br/...` to fail, and only a `hostname` comparison makes it fail. Add one case asserting exactly that: `new URL("https://legisweb.com.br/gov.br/x").hostname` is not in the set.
- **Done when:** `pnpm test __tests__/legal-tables.test.ts __tests__/citation-guards.test.ts` green, `pnpm check` clean. Advances AC2, AC3, AC5.

---

### T2 — Rewrite the footer's citation paragraph and retire the shared `source` fields

- **Files:** `components/organisms/calculator-views.tsx` (edit), `lib/legal-tables.ts` (edit), `__tests__/calculator-views.test.tsx` (edit), `__tests__/legal-tables.test.ts` (edit), `__tests__/citation-guards.test.ts` (edit)
- **Depends on:** T1
- **Reuse:** `formatIsoDate` from `lib/utils`, the existing `<a>` treatment, the existing four-paragraph `<footer>` (`design.md` §3 rows 1, 2, 8).
- **What to build:**
  1. In `lib/legal-tables.ts`, **delete** `source`, `sourceUrl` and `effectiveFrom` from both `LegalYear` and `LEGAL_YEAR_2026`. Nothing else in the file changes.
  2. In `calculator-views.tsx`, declare one module-level constant beside `VIEW_TABS`:
     `const SOURCE_LINK_CLASSES = "underline underline-offset-2 transition-colors duration-(--duration-fast) ease-standard hover:text-accent-ink";`
  3. **P3** — replace `(Súmula 60 do TST)` with `(Súmula 60, II, do TST)`. Nothing else in that paragraph moves; its delivered text is `copy.md` `F-2`, 424 characters.
  4. **P4** — replace the whole paragraph. The rendered text, whitespace-normalised, must be `copy.md` `F-1`, **398 characters**:
     `Tabelas usadas nos cálculos: INSS pela Portaria Interministerial MPS/MF nº 13, de 09/01/2026, Anexo II, em vigor desde 01/01/2026. IRRF pela Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025, em vigor desde 01/05/2025. RPPS federal: as alíquotas vêm da Emenda Constitucional nº 103/2019, art. 11, e as faixas de 2026, do Anexo III da Portaria nº 13/2026, em vigor desde 01/01/2026.`
     Built as **four** `<a target="_blank" rel="noreferrer" className={SOURCE_LINK_CLASSES}>` inside one `<p>`, in this order, each with its `href` and its date read from the **same** registry entry:

     | # | anchor text | `href` | date rendered after it |
     |---|---|---|---|
     | 1 | `{sources.rgpsBrackets[0].norm}` | `sources.rgpsBrackets[0].url` | `formatIsoDate(sources.rgpsBrackets[0].effectiveFrom)` |
     | 2 | `{sources.incomeTaxBrackets[0].norm}` | `sources.incomeTaxBrackets[0].url` | `formatIsoDate(sources.incomeTaxBrackets[0].effectiveFrom)` |
     | 3 | `{sources.rppsFederalBrackets[0].norm}` | `sources.rppsFederalBrackets[0].url` | none — this fragment carries no date |
     | 4 | the literal `Anexo III da Portaria nº 13/2026` | `sources.rppsFederalBrackets[1].url` | `formatIsoDate(sources.rppsFederalBrackets[1].effectiveFrom)` |

     `as faixas de {CURRENT_LEGAL_YEAR.year}` is interpolated. The whole paragraph stays **one centered `<p>`** — never a list, never three paragraphs (`design.md` §0 finding 1: rows of 65–77 characters land at 32.5–38.5 cpl and fail LR2b; `copy.md` § *Rejected phrasings* records the same).
     **No date may precede its own norm and no fragment may carry two norm names** (`design.md` §8.1). The footer keeps exactly **four** `<p>` — `tests/e2e/support/legibility.ts`'s `DS1_EXPECTED_PARAGRAPHS = 4` reads this and must not be edited.
  5. Write the JSX so that the rendered `textContent` collapses to single spaces; use `{" "}` at every line break inside the paragraph, as the shipped code already does.
- **Tests:**
  - `__tests__/calculator-views.test.tsx` — amend the two cases that pin the old strings (`:82`, `:93` → `Súmula 60, II, do TST`; `:100`/`:103` → the new paragraph):
    - *"names the norm behind each table and links it to an official host"* — `getAllByRole("link")` inside the footer has length **4**; the four accessible names are the four anchor texts above; each `href` equals the registry entry's `url`; and **`ALLOWED_HOSTS.has(new URL(href).hostname)`**, importing the **same fourteen-host set** `__tests__/citation-guards.test.ts` and `legal.md` §2 use. *(**Corrected by `tech-lead` on 2026-09-19.** This clause originally read* "`new URL(href).hostname` ends with `gov.br`" *— that was **wrong**, and the developer who caught it and wrote the assertion against `ALLOWED_HOSTS` was right. `legal.md` §2's allow-list is the binding rule and it admits `www2.camara.leg.br`, `www12.senado.leg.br`, `normas.leg.br` and `www.tst.jus.br`, all of which a `gov.br` suffix test rejects; the owner settled Câmara/Legin as a primary host in `spec.md` § What "primary source" means. A task may not restate a binding rule in its own narrower words when the rule already exists as a named constant — **name the constant**.)*
    - *"never credits one norm with both tables"* — the INSS link's name contains `Portaria Interministerial`, the IRRF link's name contains `Lei nº 11.482/2007`, and the two `href`s differ (AC4).
    - *"pairs every date with the norm that took force on it"* — the paragraph's text contains `Anexo II, em vigor desde 01/01/2026`, `Lei nº 15.191/2025, em vigor desde 01/05/2025` and `Portaria nº 13/2026, em vigor desde 01/01/2026`, and does **not** contain `Lei nº 11.482/2007, art. 1º, XII, na redação da Lei nº 15.191/2025, em vigor desde 01/01/2026`.
    - *"carries the whole citation line"* — `paragraph.textContent.replace(/\s+/g, " ").trim()` equals the 398-character `F-1` above, and its `.length` is **398**. *(Measured in this tree on 2026-09-19 from the interpolations; a different number is a finding — raise it before continuing, do not edit the string.)*
    - keep the existing *"names what the calculation leaves out"* case and change its `Súmula 60 do TST` expectation to `Súmula 60, II, do TST`.
  - `__tests__/legal-tables.test.ts` — delete the two assertions on `table.source` / `table.sourceUrl` / `table.effectiveFrom` at `:22-24` (their subject no longer exists) and leave the rest untouched. **No numeric expectation changes** (AC9).
  - `__tests__/citation-guards.test.ts` — add *"no citation anywhere in the tree points at a commercial aggregator"* (AC1): walk `app`, `components`, `lib`, `hooks`, `__tests__`, `tests` for `.ts`/`.tsx`; assert the file list has length **≥ 130** and that every one of the six roots contributed at least one file; exempt **exactly one** path, `__tests__/citation-guards.test.ts` itself, because it carries the pattern as its own subject, and assert `measured + 1 === total`; for every other file assert it does not match `/legisweb|jusbrasil|normaslegais|guiatrabalhista|contabeis\.com/i`.
- **Done when:** `pnpm test __tests__/calculator-views.test.tsx __tests__/legal-tables.test.ts __tests__/citation-guards.test.ts` green; `pnpm check` clean **except for failures in files this task does not own** — see the escape clause below; and `grep -rn --include='*.ts' --include='*.tsx' -iE "legisweb|jusbrasil|normaslegais|guiatrabalhista|contabeis\.com" app/ components/ lib/ hooks/ __tests__/ tests/` prints **nothing** — it printed `lib/legal-tables.ts:48` and `__tests__/calculator-views.test.tsx:103` when run in this tree on 2026-09-19. Advances AC1, AC3, AC4, AC11.

  **Escape clause on `pnpm check`, added by `tech-lead` on 2026-09-19 (lesson 026's shape).** Three
  developers are building in this shared tree and `pnpm check` is tree-wide, so this task cannot
  reach a clean run on its own diff alone. T2 is **done** when the only failures are the two named
  below, each verified **not attributable to T2's five files**:

  | Failure | Owner | Disposition |
  |---|---|---|
  | `tests/e2e/support/reachability.ts:186` — `TS2551: Property 'source' does not exist on type 'LegalYear'` | **`0010`, T1** | **Ruled.** Repaired by `0010`'s **T1a** (`.specs/0010-…/plan.md` §3A A1.1). **`0003`'s developer does not touch this file.** |
  | `tests/e2e/first-screen-reachability.spec.ts:3:1` and `tests/e2e/column-stability.spec.ts:1:1` — `assist/source/organizeImports` | **`0010` T1** and **`0008` T7** | Real, both **FIXABLE**, both in untracked sibling-spec files. Routed to their owners. Neither is a `0003` regression. |

  **Any other failure is T2's and blocks it.** A failure outside T2's five files that is *not* in
  this table is a **finding**: record it and raise it to `tech-lead` before continuing — it is never
  a licence to assume a sibling caused it.

---

### T3 — Derive the two rate spans in `lib/payroll.ts` and retire the 14%-linear claim

- **Files:** `lib/utils.ts` (edit), `lib/payroll.ts` (edit), `__tests__/utils.test.ts` (edit), `__tests__/payroll.test.ts` (edit), `__tests__/citation-guards.test.ts` (edit)
- **Depends on:** T1
- **Reuse:** the `Intl.NumberFormat` constants already at the top of `lib/utils.ts`; `formatCurrency`; `TABLE` and `RGPS_CEILING` already in `lib/payroll.ts`.
- **What to build:**
  1. `lib/utils.ts` — beside `HOURS_FORMATTER`:
     ```ts
     const PERCENT_FORMATTER = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 2 });

     export function formatPercent(rate: number): string {
       return PERCENT_FORMATTER.format(rate);
     }
     ```
     The operand is a **fraction** (`0.075`), not a percentage point. No rounding of our own: `maximumFractionDigits: 2` with no minimum is what makes `0.14` print `14%` and `0.075` print `7,5%`.
  2. `lib/payroll.ts` — add `const RPPS_TOP_RATE = TABLE.rppsFederalBrackets[TABLE.rppsFederalBrackets.length - 1].rate;` beside `RGPS_CEILING`, import `formatPercent`, and rewrite the two `impact` strings as templates:
     - **`R-1` (clt)** — `INSS pelo RGPS, com alíquotas progressivas de ${formatPercent(TABLE.rgpsBrackets[0].rate)} a ${formatPercent(TABLE.rgpsBrackets[TABLE.rgpsBrackets.length - 1].rate)}. O teto do salário de contribuição é ${formatCurrency(RGPS_CEILING)}: acima disso o desconto trava em ${formatCurrency(TABLE.rgpsCeilingDiscount)} (tabela de ${TABLE.year}).` — renders **166 characters**, character-identical to what ships today (verified in this tree on 2026-09-19).
     - **`R-2` (estatutario)** — renders **463 characters**:
       `Aplicamos a tabela do RPPS federal: a contribuição não para no teto do salário de contribuição que vale para a CLT e as faixas seguem subindo até {formatPercent(RPPS_TOP_RATE)} sobre a parcela mais alta (faixas de {TABLE.year}). Servidor estadual ou municipal não entra nesta tabela: a alíquota é a do regime próprio do seu ente, que pela EC nº 103/2019, art. 9º, §4º, não pode ser menor que a da União, salvo se esse regime não tiver déficit atuarial, caso em que não pode ser menor que a do INSS.`
       **The words `muitas vezes 14% linear` do not ship, and neither does any sentence saying what a state or municipal rate *is*, *tends to be* or *usually is*, at any percentage, with any hedge** (`legal.md` §12). **The EC 103 clause is never truncated at *"não pode ser menor que a da União"*** — without its actuarial-deficit exception it is a stronger claim than the norm makes and is false for an ente with no deficit (`copy.md`, `R-2`, *The only pre-approved shortening*). The clause ships whole: `design.md` §7 S11 measured the full 463-character string at 35.62 cpl, **above** the shipped string's 32.44, and declines `copy.md`'s pre-approved 294-character cut.
  3. No comment is added to `lib/payroll.ts`.
- **Tests:**
  - `__tests__/utils.test.ts` — *"writes a rate the way a Brazilian payslip does"*: `formatPercent(0.075)` is `"7,5%"`, `formatPercent(0.14)` is `"14%"`, `formatPercent(0.22)` is `"22%"`, `formatPercent(0.165)` is `"16,5%"`.
  - `__tests__/payroll.test.ts` — keep every existing case; add:
    - *"derives the RGPS span from the table it ships"* (AC8) — the CLT `impact` contains `` `de ${formatPercent(CURRENT_LEGAL_YEAR.rgpsBrackets[0].rate)} a ${formatPercent(CURRENT_LEGAL_YEAR.rgpsBrackets.at(-1).rate)}` `` **and** the literal `de 7,5% a 14%`, and its `.length` is **166**.
    - *"derives the RPPS top rate from the ladder"* (AC8) — the estatutário `impact` contains `até 22%` and `` `até ${formatPercent(CURRENT_LEGAL_YEAR.rppsFederalBrackets.at(-1).rate)}` ``, and its `.length` is **463**.
    - *"states the ente's floor instead of guessing its rate"* — the estatutário `impact` contains `não entra nesta tabela`, `EC nº 103/2019, art. 9º, §4º` and `déficit atuarial`, and does **not** contain `14% linear`, `muitas vezes` or `este número não vale para ele`.
  - `__tests__/citation-guards.test.ts` — add *"`lib/payroll.ts` states no rate as a literal"* (AC7): read the file, assert it is non-empty, and assert `/[0-9]+([,.][0-9]+)?%/` finds **no** match. Run in this tree on 2026-09-19 the same pattern returns lines **24** and **32**, which is what this guard is written against.
- **Done when:** `pnpm test __tests__/payroll.test.ts __tests__/utils.test.ts __tests__/citation-guards.test.ts` green; `pnpm check` clean; `grep -rn --include='*.ts' -E "[0-9]+([,.][0-9]+)?%" lib/payroll.ts` prints nothing. Advances AC7, AC8.

---

### T4 — Give `lib/compliance.ts` its norms, at the constant and in the warning

- **Files:** `lib/compliance.ts` (edit), `__tests__/compliance.test.ts` (edit), `__tests__/citation-guards.test.ts` (edit)
- **Depends on:** none
- **Reuse:** the `ComplianceWarning` shape and the four existing branches; no new warning, no new id, no title change.
- **What to build:**
  1. One single-line `//` comment **immediately above each of the six constants**, in pt-BR, matching the surrounding idiom in `lib/night-shift.ts:3` and `lib/salary-period.ts`. Each line must contain a norm token, because `__tests__/comment-free-code.test.ts` allows a comment in `lib/` only when it cites one:

     | constant | comment |
     |---|---|
     | `DAILY_OVERTIME_LIMIT_MINUTES = 120` | `// CLT art. 59, caput: a jornada extra não excede duas horas por dia.` |
     | `SHORT_DAY_MINUTES = 240` | `// CLT art. 71, caput e §1º: acima de 4 horas de jornada o intervalo mínimo é de 15 minutos.` |
     | `LONG_DAY_MINUTES = 360` | `// CLT art. 71, caput e §1º: acima de 6 horas de jornada o intervalo mínimo passa a 1 hora.` |
     | `MINIMUM_SHORT_BREAK_MINUTES = 15` | `// CLT art. 71, §1º: intervalo de 15 minutos na jornada de mais de 4 e até 6 horas.` |
     | `MINIMUM_LUNCH_MINUTES = 60` | `// CLT art. 71, caput: intervalo mínimo de 1 hora na jornada acima de 6 horas.` |
     | `MINIMUM_REST_BETWEEN_SHIFTS_MINUTES = 660` | `// CLT art. 66: mínimo de 11 horas consecutivas de descanso entre duas jornadas.` |

     **One line per comment.** A second `//` line without a norm token fails the comment guard.
  2. Replace the four `detail` strings with `copy.md` `C-1`…`C-4`, verbatim. Titles, ids, thresholds and branch conditions are untouched:
     - `C-1` (211): `O art. 59 da CLT limita a jornada extra a 2 horas por dia. Todas as horas trabalhadas continuam devidas a você (Súmula 376, I, do TST). A irregularidade está na extrapolação, e a sanção recai sobre o empregador.`
     - `C-2` (207): `Jornada acima de 4 horas e de até 6 horas exige um intervalo de no mínimo 15 minutos (art. 71, §1º, da CLT). O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória (art. 71, §4º, da CLT).`
     - `C-3` (252): `Jornada acima de 6 horas exige no mínimo 1 hora de intervalo (art. 71 da CLT), que norma coletiva pode reduzir para 30 minutos (art. 611-A, III, da CLT). O tempo suprimido é devido com acréscimo de 50%, de natureza indenizatória (art. 71, §4º, da CLT).`
     - `C-4` (249): `O art. 66 da CLT garante no mínimo 11 horas seguidas de descanso entre duas jornadas. O tempo suprimido costuma ser pago como hora extra, por analogia (Orientação Jurisprudencial nº 355 da SBDI-1 do TST), e a irregularidade recai sobre o empregador.`
       `por analogia` and the written-out OJ name are deliberate and are not to be compressed to `OJ-SDI1 nº 355` (`copy.md` § *Rejected phrasings*).
- **Tests:** `__tests__/compliance.test.ts` — amend `:61` to `Súmula 376, I, do TST` and add, keeping every existing branch case:
  - *"names the norm that lets a norma coletiva cut the interval to 30 minutes"* — `minimum-lunch-break`'s detail contains `art. 611-A, III, da CLT`.
  - *"cites the paragraph the 50% indemnity comes from"* — both `short-day-break` and `minimum-lunch-break` details contain `art. 71, §4º, da CLT`.
  - *"sources the interjornada payment instead of hedging it"* — `rest-between-shifts`'s detail contains `Orientação Jurisprudencial nº 355 da SBDI-1 do TST` and `por analogia`.
  - each of the four details still contains no em-dash (the existing case at `:63` covers `C-1`; extend it to all four).
  - `__tests__/citation-guards.test.ts` — add *"every statutory constant carries its norm in the module that defines it"* (AC5): a table of **seven** rows — the six above plus `lib/salary-period.ts`'s `PAID_MONTHS_PER_YEAR` (which T6 writes, so this case lands in T6; in T4 assert the six and state the expected count as 6). Assert the row count before iterating; for each row read the file, find the line declaring the constant, and assert the line immediately above it starts with `//` and contains the expected norm fragment (`CLT art. 59`, `CLT art. 71`, `CLT art. 66`).
- **Done when:** `pnpm test __tests__/compliance.test.ts __tests__/citation-guards.test.ts __tests__/comment-free-code.test.ts` green; `pnpm check` clean. Advances AC5.

---

### T5 — Complete the DSR citation, in `lib/weekly-rest.ts` and on the screen

- **Files:** `lib/weekly-rest.ts` (edit), `components/organisms/day-summary.tsx` (edit), `__tests__/weekly-rest.test.ts` (edit if it asserts the comment — it does not today), `__tests__/day-summary.test.tsx` (edit)
- **Depends on:** none
- **Reuse:** the existing DSR row `<span>` at `day-summary.tsx:224`, the existing caption `<p>` at `:233`, the existing `text-caption text-ink-subtle text-pretty` treatment. No new component, no new prop.
- **What to build:**
  1. `lib/weekly-rest.ts:17` — replace the comment with **one line**:
     `// Lei 605/1949, art. 7º, "a", Súmula 172 e Súmula 60, I, do TST: DSR = remuneração variável do mês / dias úteis x repousos do mês; o §2º já remunera o repouso do mensalista, por isso só o reflexo é calculado.`
     The wrong paragraph (`art. 7º, §2º` as the *rule applied*) is gone; §2º survives only as the reason the function computes the reflex alone (`legal.md` §9.1 C5). The function body is **not** touched — no number moves.
  2. `day-summary.tsx` — the DSR row label at `:224`: `DSR sobre os extras` → **`DSR de extras e noturno`** (23 characters, `copy.md` `D-2`'s named fallback, which `design.md` §7 S13 takes: the 26-character form wraps at 390 and takes 3.44 px off the money column).
  3. `day-summary.tsx` — the caption at `:233-236`: replace with `copy.md` `D-1`, **255 characters**, keeping the existing `restDayPay > 0` guard and the existing classes:
     `O DSR sobre os extras e sobre o adicional noturno vem da Lei nº 605/1949, art. 7º, alínea "a", da Súmula 172 e da Súmula 60, I, do TST. O cálculo supõe que estes valores se repitam em todos os dias úteis do mês e conta só os domingos. Feriados não entram.`
  4. `day-summary.tsx` — add **D4**, `copy.md` `D-3`, **122 characters**, as a new `<p className="text-caption text-ink-subtle text-pretty">` that is a **sibling immediately after** the `<div className="space-y-2">` rows group (the block holding the two `Extra` rows, the night row and the DSR row) and **before** the `restDayPay > 0` caption, inside the `space-y-3` block that starts at `:180`:
     `Os 20% do adicional noturno são o mínimo da CLT (art. 73, caput). A sua convenção coletiva pode prever um adicional maior.`
     **It is unconditional.** No `nightMinutes > 0` guard, no `grossHourlyRate !== null` guard — the row it qualifies renders whenever the block renders (`design.md` §5.3 *(run 2)*, `copy.md` `D-3`, `legal.md` §11 D4). A developer must not re-introduce a guard here.
- **Tests:** `__tests__/day-summary.test.tsx` — amend `:182`, `:190-191`, `:198` and add:
  - *"names both parcelas the DSR base carries"* — with `firstTierMinutes: 120, grossHourlyRate: 13.6364`, `getByText("DSR de extras e noturno")` is in the document and the caption contains `Lei nº 605/1949`, `Súmula 172` and `Súmula 60, I`.
  - *"leaves the DSR out of a day without variable pay"* — `queryByText("DSR de extras e noturno")` is null (amend the existing case's string).
  - *"qualifies the night premium even on a day with no night minutes"* (D4, both the zero and the non-zero state) — render with `nightMinutes: 0` and assert `getByText(/Os 20% do adicional noturno são o mínimo da CLT/)` is present **and** `getByText("Adicional noturno 20%")` is present; render with `nightMinutes: 480` and assert the caption is still present.
  - *"keeps the floor disclosure out of the footer and beside its own row"* — the caption's `previousElementSibling` contains the text `Adicional noturno 20%`.
- **Done when:** `pnpm test __tests__/day-summary.test.tsx __tests__/weekly-rest.test.ts` green; `pnpm check` clean; the caption and the comment cite the same three norms (AC6). Advances AC5, AC6.

---

### T6 — Cite the 13º, disclose the "Ano" approximation, and quote the norm's own term

- **Files:** `lib/salary-period.ts` (edit), `components/molecules/period-selector.tsx` (edit), `components/organisms/salary-calculator.tsx` (edit), `__tests__/salary-calculator.test.tsx` (edit), `__tests__/citation-guards.test.ts` (edit)
- **Depends on:** none
- **Reuse:** `PeriodSelector`, `HeroPanel`, the hero's existing `text-ink-onfill/90` treatment (`salary-calculator.tsx:426`).
- **What to build:**
  1. `lib/salary-period.ts` — one line above `const PAID_MONTHS_PER_YEAR = 13;`:
     `// CF art. 7º, VIII e Lei nº 4.090/1962, art. 1º: gratificação natalina, um salário a mais por ano.`
     **Nothing else in this file is touched.** `SUMULA_431_WEEKLY_HOURS` and its comment belong to spec `0007` (AC13) — the added line shifts them down, which is a context move in the diff and not a modification; do not re-wrap, re-order or reformat anything below it.
  2. `components/molecules/period-selector.tsx` — add one optional prop:
     `describedById?: string;` and put `aria-describedby={describedById}` on the existing `<fieldset>`. No other change, no default value.
     *(This is a deliberate, recorded deviation from `design.md` §3's "no new prop" sentence, taken because `design.md` §9.2 requires the period `<fieldset>` to carry `aria-describedby` pointing at the caption's id when it renders. The a11y clause is the specification; §3's sentence is a count. Recorded in `STATUS.md` for `product-designer` to confirm at G6.)*
  3. `components/organisms/salary-calculator.tsx`:
     - the subtitle at `:267-270` becomes `copy.md` `S-1`, **191 characters**:
       `Descubra quanto vale cada hora do seu trabalho, já com os descontos. A hora extra da aba Jornada é calculada sobre a hora normal (art. 59, §1º, da CLT), que é a sua hora bruta, sem descontos.`
     - add `const ANNUAL_PERIOD_DISCLOSURE_ID = "annual-period-disclosure";` beside `DETAILS_PANEL_ID`.
     - in the hero's children, pass `describedById={period === "year" ? ANNUAL_PERIOD_DISCLOSURE_ID : undefined}` to `PeriodSelector`, and render, **after** the `<div className="mt-6">` that wraps it:
       ```tsx
       {period === "year" ? (
         <p id={ANNUAL_PERIOD_DISCLOSURE_ID} className="mt-3 text-caption text-ink-onfill/90 text-pretty">
           …P-1…
         </p>
       ) : null}
       ```
       `P-1`, **162 characters**: `O valor do Ano soma 12 meses mais o 13º salário (art. 7º, VIII, da CF; Lei nº 4.090/1962). É uma aproximação: o 13º tem INSS e IRRF próprios, descontados à parte.`
       **`text-ink-onfill/90` is load-bearing and is not to be "tidied" to `/80`** — `design.md` §9.1 measures 4.85:1 at 90 % and 4.18:1 at 80 %, below the AA floor. `mt-3` is `design.md` §4's specified offset. No animation: the caption is or is not there (`design.md` §6).
- **Tests:** `__tests__/salary-calculator.test.tsx` — amend `:428` and add:
  - *"quotes the norm's own term for the overtime base"* — `getByText(/calculada sobre a hora normal \(art\. 59, §1º, da CLT\)/)` is present and `queryByText(/como manda o art\. 59/)` is null.
  - *"discloses the thirteenth month only when the year is the chosen period"* — on first render (`Mês`), `queryByText(/O valor do Ano soma 12 meses/)` is null; after `await user.click(screen.getByRole("radio", { name: "Ano" }))` it is present, cites `art. 7º, VIII, da CF` and `Lei nº 4.090/1962`, and says `É uma aproximação`.
  - *"describes the period group by the approximation while Ano is selected"* — the `group` accessible by the name `Visualizar o valor por período` has `aria-describedby` equal to `annual-period-disclosure` after selecting **Ano**, and no `aria-describedby` before it.
  - the keyboard path: reach the **Ano** radio with `user.tab()` from the previous control and select it with `user.keyboard("{ArrowRight}")` or `{Space}`, asserting the caption appears — the disclosure must not depend on a pointer.
  - `__tests__/citation-guards.test.ts` — extend the AC5 table from six rows to **seven**, adding `lib/salary-period.ts` / `PAID_MONTHS_PER_YEAR` / `Lei nº 4.090/1962`, and update the asserted row count to 7.
- **Done when:** `pnpm test __tests__/salary-calculator.test.tsx __tests__/citation-guards.test.ts __tests__/comment-free-code.test.ts` green; `pnpm check` clean; `git diff lib/salary-period.ts` shows no hunk touching the Súmula 431 lines (AC13). Advances AC5, AC13.

---

### T7 — Replace the unsourceable negative in the journey settings hint

- **Files:** `components/organisms/journey-form.tsx` (edit), `__tests__/journey-form.test.tsx` (edit)
- **Depends on:** none
- **Reuse:** `Field`'s `hint` prop and the `aria-describedby="extra-tier-rate-hint"` wiring that already ships.
- **What to build:** the `hint` of the `extra-tier-rate` field at `:157` becomes `copy.md` `J-1`, **164 characters**:
  `O piso de 50% vale para toda hora extra, inclusive depois da 2ª (art. 7º, XVI, da CF; art. 59, §1º, da CLT). O degrau de 100% vem de convenção coletiva, não da lei.`
  **Nothing else in this file changes.** In particular the settings panel keeps `p-6` — Q2 is ruled in §1.4 of this plan and the `px-3 sm:px-6` step `design.md` §2.2 offered is **not** taken. `J-0`'s hint at `:142` is unchanged and must stay unchanged (`legal.md` §9.1 C14: *"CORRECT. Carry it through unchanged."*).
  **No synonym of the retired negative may appear** — not *"a lei não escalona"*, not *"nenhuma norma dobra"*, not *"o piso continua sendo 50%"* (`copy.md` § *Rejected phrasings*; `legal.md` §5 R13: Lei nº 605/1949 art. 9º **does** double the pay, on a feriado trigger, so the universal negative is false at its own width).
- **Tests:** `__tests__/journey-form.test.tsx` — rewrite the case at `:210-221`, which today asserts the retired non-claim as expected behaviour:
  - *"says the 100% step comes from the convenção coletiva, not from the law"* — after opening the settings panel, `getByLabelText("Adicional acima de 2h (%)")` has an accessible description matching `/O piso de 50% vale para toda hora extra, inclusive depois da 2ª/` and `/O degrau de 100% vem de convenção coletiva, não da lei/`.
  - *"never claims that no law doubles the adicional"* — `queryByText(/Não existe lei/)` is null and the hint does not match `/não escalona|continua sendo 50%|nenhuma norma dobra/i`.
  - the keyboard path: the panel is opened with `{Enter}` on the settings button and the hint is reachable as the field's description.
- **Done when:** `pnpm test __tests__/journey-form.test.tsx` green; `pnpm check` clean. Advances AC5, AC10.

---

### T8 — Add the federal-RPPS gap legend to `regime-field.tsx`

- **Files:** `components/molecules/regime-field.tsx` (edit), `__tests__/regime-field.test.tsx` (edit)
- **Depends on:** T3 (so `R-2` and `R-3` land in the tree in the order that never ships the retired claim beside the new legend)
- **Reuse:** the existing `<fieldset className={cn("space-y-2", className)}>`, the `selected` lookup at `:20`, the `text-caption text-ink-subtle text-pretty` treatment already used at `:43` and `:82`.
- **What to build:**
  1. `const REGIME_GAP_LEGEND_ID = "regime-federal-rpps-gap";` beside `OPTIONS_PANEL_ID`.
  2. `const isFederalRppsRegime = selected.value === "estatutario";` — the condition is **`selected.value`**, never `isOpen`. Using `selected` rather than the raw `value` prop keeps the unknown-regime fallback at `:20` from rendering the legend.
  3. Render, as the **last child of the `<fieldset>`, after `</CollapsiblePanel>`**:
     ```tsx
     {isFederalRppsRegime ? (
       <p id={REGIME_GAP_LEGEND_ID} className="text-caption text-ink-subtle text-pretty">
         …R-3…
       </p>
     ) : null}
     ```
     `R-3`, **136 characters**: `A tabela do RPPS federal não se aplica a servidor estadual ou municipal, cujo ente fixa a própria tabela (EC nº 103/2019, art. 9º, §4º).`
  4. On the `<fieldset>`: `aria-describedby={isFederalRppsRegime ? REGIME_GAP_LEGEND_ID : undefined}` (`design.md` §9.2 — the limitation is announced with the group, not orphaned after it).
  5. **It is outside `CollapsiblePanel`, by construction.** Putting it inside is the defect `legal.md` §16.1 ruled on: the gesture that selects Estatutário calls `setIsOpen(false)` at `:24` and destroys everything inside the panel 371–481 ms later, so a legend in there is absent in every state the user afterwards sits in. No animation, no `motion` wrapper, no fade: it appears in the same frame as the selection (`design.md` §6).
  6. **`R-3` is not `R-2` shortened.** Both may be on screen at once when the panel is open, and `legal.md` §16.1 forbids one sentence rendering twice; the two strings are already different and neither may be edited to match the other. `R-3`'s string is **136 characters and must not be shortened** — `design.md` §7 S6's windows are `[40,50] ∪ [80,100] ∪ [120,150] ∪ [160,200]` and `copy.md` records five drafts of 102–117 characters that all fall in the disjoint gap, where a 112-character probe measured 37.33 cpl and failed.
- **Tests:** `__tests__/regime-field.test.tsx` — keep every existing case and add:
  - *"names the ladder's limit whenever the estatutário regime is the selected one, panel closed"* — render with `value="estatutario"` and no interaction; `getByText(/A tabela do RPPS federal não se aplica a servidor estadual ou municipal/)` is present while `queryByRole("radio")` is null (the panel is closed), and the text contains `EC nº 103/2019, art. 9º, §4º`.
  - *"keeps the legend out of the CLT state"* — render with `value="clt"`: the legend is absent, and absent again with `value={"empregado-publico" as never}` (the fallback path).
  - *"survives the selection gesture that closes the panel"* — render a controlled harness whose `value` follows `onChange`; open the panel, click the `Estatutário` radio, assert `aria-expanded` is `false` **and** the legend is still in the document. This is the state `legal.md` §16.1's S-D names and the one the old placement lost.
  - *"describes the regime group by the legend while it renders"* — the `group` accessible by the name `Regime de Trabalho` has `aria-describedby` equal to `regime-federal-rpps-gap` when Estatutário is selected, and no `aria-describedby` when CLT is.
  - *"says something different from the card"* — with the panel open and Estatutário selected, the legend's text is not a substring of the Estatutário card's `impact` text, and the card's text is not a substring of the legend's.
  - keyboard path: the panel opens with `{Enter}` on the *Alterar* button and the radio is chosen with the keyboard; the legend is present afterwards.
- **Done when:** `pnpm test __tests__/regime-field.test.tsx` green; `pnpm check` clean. Advances AC5; discharges `legal.md` §16.1 D3.1 and D3.4 in the DOM (D3.2 and D3.3 are T9's).

---

### T9 — Prove the three new captions in a browser

- **Files:** `tests/e2e/disclosure-legibility.spec.ts` (edit), `tests/e2e/support/legibility.ts` (edit)
- **Depends on:** T5, T6, T8
- **Reuse:** `assertLr1`, `assertLr2b`, `assertLr3Rendering`, `waitForStableBoundingBox`, `driveUntil` — all already in `tests/e2e/support/legibility.ts`. Do not write a new helper where one exists.
- **What to build:** a new `test.describe("Disclosure legibility — the three captions added by 0003")`, across `390×844` and `1440×900`, in **both** themes. Every step names its synchronization barrier; no bare `waitForTimeout` except the one D3.2 requires by its own definition.
  - **D3 (`R-3`), on `/custo-da-hora`:**
    1. `goto`, then `getByRole("button", { name: /Alterar/ })` — barrier: `await expect(button).toBeVisible()`.
    2. Click it — barrier: `await expect(button).toHaveAttribute("aria-expanded", "true")`.
    3. `getByRole("radio", { name: /Estatutário/ }).check()` — barrier: `await expect(button).toHaveAttribute("aria-expanded", "false")`.
    4. **D3.2 — persistence:** `await page.waitForTimeout(1000)` measured **from the check**, then assert the legend's border-box `height > 0` and `getComputedStyle().opacity === "1"`. The 1 000 ms is `legal.md` §16.1's calibration: the carrier's observed removal spans 371–481 ms and 1 000 ms clears the maximum by 4,7× the instrument's 110 ms spread. Do not lower it.
    5. `page.reload()` — barrier: `await expect(legend).toBeVisible()` — and assert the same two facts again, with the regime still `Estatutário`.
    6. **D3.3 — geometry tripwire:** the **`<fieldset>`**'s border-box width, in the **closed** state, is **308.00 px at 390** and **667.33 px at 1440**, both themes, root font size 16 px. Assert within ±0.5 px. *(Both figures were measured twice, independently, by `product-designer` and by `labor-law-analyst`. A value outside the tolerance is a finding — record it and raise it before the next task; do not retune the assertion.)*
    7. `assertLr2b(legend)` and `assertLr3Rendering(legend)`.
  - **D4 (`D-3`), on `/`:** drive a MANUAL exit of **18:00** so the night minutes are zero — barrier: `driveUntil` on the exit field until the day summary shows `Adicional noturno 20%` with `0h 0m`. Then assert the caption is **present**, `assertLr2b` it, and `assertLr3Rendering` it. A suite that only drives a night-bearing journey cannot see the guard that must not exist (`design.md` §13).
  - **D6 (`P-1`), on `/custo-da-hora`:** seed `grossSalary` and `monthlyHours` through the page's own inputs; `getByRole("radio", { name: "Ano" }).check()` — barrier: `await expect(page.getByRole("radio", { name: "Ano" })).toBeChecked()`. Assert the caption is present, `assertLr2b` it, `assertLr3Rendering` it, and assert it is absent again after selecting `Mês`.
  - **No new assertion on the footer** beyond what the existing DS1 block already runs: it re-measures the paragraph with the delivered strings automatically, and `DS1_EXPECTED_PARAGRAPHS` stays **4**.
  - In `support/legibility.ts`, add only what is missing: exported selectors/ids for the three captions. No new assertion helper.
- **Done when:** `pnpm e2e tests/e2e/disclosure-legibility.spec.ts` green in an **isolated copy with its own `.next` and its own confirmed-free port** (`AGENTS.md` §4 rule 6 — never under `next dev`, never against the shared `.next` while a sibling gate is building); `pnpm check` clean. Advances AC10, and discharges `legal.md` §16.1 D3.2 and D3.3.

---

### T10 — (G7, `release-manager`) land the approved `DESIGN.md` clarification

- **Files:** `DESIGN.md` (edit)
- **Depends on:** T2
- **What to build:** one sentence added to § Components → Named Rules → **The Forty-Four Rule**. Nothing is removed. Required content, from `design.md` §12: the 44 px floor governs **standalone controls**; a link set inline within a paragraph of running prose is governed instead by **WCAG 2.2 SC 2.5.8's *Inline* exception**, because its size is constrained by the line-height of the surrounding non-target text, and padding it to 44 px would break the paragraph. It is **not** a licence for a smaller button, icon target or tab, and anything that looks like a link but stands on its own line — the day summary's rate link, `min-h-11` — keeps the floor. The wording is `product-designer`'s if `release-manager` wants it authored rather than composed from that bullet; the **content** above is binding and was approved by the human for this batch.
- **Done when:** `node .agents/tools/docs-check.mjs 0003-citation-registry` clean and the rule no longer contradicts the tree it governs.

---

## 3. Sequencing with the specs in flight

- **`0007-sumula-431-citation-scope`** — intersects at file level in `lib/salary-period.ts` and `components/organisms/salary-calculator.tsx`, and **nowhere at line level**. 0003 touches `salary-period.ts`'s `PAID_MONTHS_PER_YEAR` (T6) and `salary-calculator.tsx`'s subtitle and hero (T6); 0007 owns `SUMULA_431_WEEKLY_HOURS`'s attribution and `DIVISOR_NORMS["sumula-431"]`. Whichever lands second rebases; every conflict is line-local. **Neither spec may edit the other's line to resolve a conflict** — that is a bounce to `tech-lead`.
- **`0012`** — owns `hooks/use-work-calculator.ts`. No task here opens that file. L-2 is routed into `0012`'s scope (§1.4).
- **`0008`** — a developer is measuring in a browser on this branch. T9 is the only task that needs one; it runs in an isolated copy on a confirmed-free port and must not start while `0008`'s measurement is in flight.

---

## 4. Risks

| Risk | Signal it happened |
|---|---|
| The footer's rendered text does not collapse to the 398-character string, because a JSX line break leaves double whitespace | T2's character-count assertion fails, or the e2e cpl for P4 reads materially above 56.86 while the line-box count is unchanged |
| A developer "fixes" a red test by restoring an old string — the aggregator URL at `__tests__/calculator-views.test.tsx:103`, or the retired negative at `__tests__/journey-form.test.tsx:216` | AC1's grep returns a line again, or `queryByText(/Não existe lei/)` starts passing. Both files are **non-shipping surfaces carrying the claim** (`legal.md` §9.1 C19) and inherit the fix; neither is a source of truth |
| `R-3` is placed inside `CollapsiblePanel`, or conditioned on `isOpen` | T8's *"survives the selection gesture"* case fails, or T9's D3.2 reload assertion fails. This is the exact defect `legal.md` §16.1 ruled on |
| The `nightMinutes > 0` guard is re-introduced on D4 because it "looks conditional" | T5's zero-night-minutes case fails; `design.md` §5.3 *(run 2)* and `copy.md` `D-3` both forbid it |
| A string is shortened to make a slot fit | Any character count in §1.7 comes out different. The fallback is **never** a shortened disclosure: `copy.md` names the only two permitted trims (`D-2`'s 23-character label, already taken; `R-2`'s EC clause, declined), and everything else bounces to `tech-lead` |
| `formatPercent` prints `7,50%` or `7,5 %` on another ICU build | T3's `utils` cases fail. They were verified on this tree's Node on 2026-09-19; a different reading is a finding about the runtime, not a licence to hand-write the string |
| The `sources` tuple is loosened to `DataSetSource[]` "for flexibility", and a derived value gains a `norm` | T1's *"marks a derived value as derived"* case fails. That field is the defect `legal.md` §7 row 2 names |
| `lib/salary-period.ts`'s added comment line is read as a modification of 0007's lines | AC13's `git diff` shows a hunk touching the Súmula 431 declaration. Only the one comment line above `PAID_MONTHS_PER_YEAR` is added; nothing below is reformatted |
| The e2e run is red because a sibling agent's build raced the shared `.next` | `uptime` shows a load average several times the core count, or `ss -ltnp` shows a port held by a command that is not yours. Re-run in the isolated copy before reporting anything (`AGENTS.md` §4 rule 6) |
