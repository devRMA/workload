# 0002 — G6 legal verification

**pass**

Run 1 of G6. Verified against `legal.md` (S1–S10, §14 S9, §15 S10), reading the **shipped
strings in the source**, not the spec's account of them. Every figure below was re-checked
against a primary source **in this session**, not recalled.

---

## 0. What was verified

| # | Object | Against |
|---|---|---|
| 1 | The eleven em-dash rewrites, meaning by meaning | S1–S8, §4, §6 |
| 2 | `MISSING_VALUE` in every slot it renders in | S6, §5 |
| 3 | The claim retirement C1–C7 and the replacement descriptor | S9.1–S9.5, §14 |
| 4 | R$ 8.475,55 named once across both `WORK_REGIME_INFO` strings | S10.1–S10.6, AC26, §15 |
| 5 | Collateral damage from the font and icon swaps in files carrying legal strings | §14, §6 |

**Not verified here** (out of this spec, already routed): F2 (Súmula 172 under-citation on a
base that includes the adicional noturno), F3, F4 (the `legisweb.com.br` URL at
`lib/legal-tables.ts:47`) → `.specs/0003-citation-registry/`. The rendered-page read in both
themes is G9, not this gate.

---

## 1. Sources read this session

| Norm | What it settled | Read | URL |
|---|---|---|---|
| Portaria Interministerial MPS/MF nº 13, de 09/01/2026 — art. 2º, Anexos II e III | R$ 1.621,00 / **R$ 8.475,55**; the four RGPS brackets; the eight RPPS-União brackets | **Primary text, verbatim.** The DOU permalink hung up at this run; the full art. 2º + Anexo II + Anexo III text was read at `normaslegais.com.br` and agrees verbatim with the transcription `legal.md` §15.1 took from the DOU at run 2. | https://www.normaslegais.com.br/legislacao/portaria-interministerial-mps-mf-13-2026.htm · DOU: https://www.in.gov.br/web/dou/-/portaria-interministerial-mps/mf-n-13-de-9-de-janeiro-de-2026-680382603 |
| Súmula 376, I e II, do TST | *"A limitação legal da jornada suplementar a duas horas diárias **não exime o empregador de pagar todas as horas trabalhadas**."* | Text read this session | https://www.jusbrasil.com.br/jurisprudencia/tst/sumulas/sumula-n-376-do-tst/1431368838 (tst.jus.br sumula index returned 404 at this run) |
| EC nº 103/2019, art. 9º, §4º | States/DF/Municípios may not set a rate below the União's; the 14% floor is the ordinary consequence | Text read this session | https://www.gov.br/previdencia/pt-br/assuntos/rpps/legislacao-dos-rpps/aplicacao-da-emenda-constitucional-no-103-de-2019-aos-rpps |
| CLT art. 59 §§2º/5º/6º, art. 71, art. 66, art. 73 | Unchanged from `legal.md` §14.1 and §3; no shipped string altered their content | Primary, run 2 | https://www.planalto.gov.br/ccivil_03/decreto-lei/del5452.htm |

**Tables, digit by digit against the primary Anexos** — `lib/legal-tables.ts:37-41` RGPS
(`1621.00/7,5%`, `2902.84/9%`, `4354.27/12%`, `8475.55/14%`) **match Anexo II**;
`:50-56` RPPS federal (the four above, then `14514.30/14,5%`, `29028.57/16,5%`,
`56605.73/19%`, `+∞/22%`) **match Anexo III**; `:49` `rgpsCeilingDiscount: 988.09`
**re-derived to the centavo** (121,575 + 115,3656 + 174,1716 + 576,9792 = 988,0914 → 988,09);
`:44-45` `2026` / `2026-01-01` match arts. 2º e 7º. **No divergence. No number moved in this
spec**, which is what AC15 required.

---

## 2. The eleven rewrites — meaning-by-meaning

Read from the diff, not the plan. Verdict on each of the four highest-risk:

### 2.1 `lib/compliance.ts:34` — S2 · **holds**

Shipped: *"...Todas as horas trabalhadas continuam devidas a você (Súmula 376 do TST). **A
irregularidade está na extrapolação, e a sanção recai sobre o empregador.**"*

The appositive became an independent sentence and the allocation survived intact and
**categorical**: `empregador` is still the grammatical recipient of `sanção`, the worker is
still not the subject of `irregularidade`, and no `pode` / `talvez` / `em tese` entered. This
matches Súmula 376, I as read this session — the limit does not *exime o empregador*, so the
duty and the sanction are both his. Norm, limit (2h, = `DAILY_OVERTIME_LIMIT_MINUTES = 120`),
súmula number, payment guarantee and allocation all present in the same `detail`, in the same
visible block as the title *"Você passou de 2h extras hoje"*. **S2 satisfied.**

The three other `compliance.ts` details (arts. 71 §1º, 71, 66) were re-read and are byte-identical
to run 1 — no collateral edit.

### 2.2 `components/organisms/day-summary.tsx:232` — S3 · **holds**

Shipped: *"O DSR (Súmula 172 do TST) supõe que estes extras se repitam em todos os dias úteis
do mês e conta só os domingos. **Feriados não entram.**"*

The em-dash became a full stop, which **strengthens** the clause rather than weakening it: a
separate sentence is harder to read as a restatement of "só os domingos" than an appositive was.
All four S3 rows survive — súmula by number, assumption 1 (repetition on every working day),
assumption 2 (Sundays only), assumption 2's consequence (feriados excluded). Caption still sits
directly below the `DSR sobre os extras` row, still unconditional on interaction, still a
**floor** framing (nothing implies the real DSR could be lower).

**Re-checked against what the code does**, not against the old sentence:
`lib/weekly-rest.ts:12-13` — `restDays` counts `day.getDay() === SUNDAY` only, `workingDays`
is every other day **including Saturdays**; `:20` — `(overtimeAmount / workingDays) * restDays`.
Lei nº 605/1949 art. 1º puts feriados in the repouso base, so excluding them understates
`restDays`: the shown figure is a floor. The sentence still says exactly this. **S3 satisfied.**

### 2.3 `components/organisms/calculator-views.tsx:78-81` — S4 · **holds, all four disclosures**

Shipped: *"Os valores são uma estimativa para você se organizar. **Não substituem seu holerite,
não valem como registro oficial de ponto** e nada aqui é orientação jurídica ou contábil."*

| | Disclosure | Present |
|---|---|---|
| D1 | estimate, for the user's own organisation | yes |
| D2 | does not replace the holerite — `Não substituem`, indicative, not `podem não substituir` | yes |
| **D3** | **not an official ponto record** | **yes — rebuilt as its own full negation** (`não valem como...`) rather than carried by the old `nem`. This is stronger than what S4 required: the highest-consequence disclosure no longer depends on a conjunction the reader must carry across a dash. |
| D4 | not legal or accounting advice — `nada aqui é`, not `pretende ser` | yes |

One paragraph, page footer, no interaction, no modal, no `title` attribute. **S4 satisfied.**

**The "name the gap" paragraph at `:82-88` is intact and untouched** — FGTS, convenção coletiva,
13º, terço de férias, INSS/IRRF sobre extras, **a prorrogação da jornada noturna depois das 5h
(Súmula 60 do TST)**, feriados, intervalo suprimido, insalubridade/periculosidade, RPPS
estadual/municipal. This matters twice: S4 froze it, and **S9.2's permission to name
`adicional noturno` in a SERP descriptor is tied to that Súmula 60 clause staying there.** It
stayed. The permission holds.

### 2.4 `components/organisms/salary-calculator.tsx:126` — S5 · **holds**

Shipped: *"Sem ele os valores abaixo continuam em **R$ 0,00**. **Esse zero não é o seu salário,
é a falta do dado.**"*

The literal `R$ 0,00` survives; the negation survives as an independent sentence; the cause
(the missing input) survives; the remedy is the banner title *"Informe o seu salário bruto"*
immediately above. The sentence still stops `R$ 0,00` reading as an answer, and the banner is
still adjacent to the fields showing the zeroes. **S5 satisfied.**

### 2.5 The other seven

Re-read in the diff. All seven are punctuation-only on strings carrying no legal claim, plus
`lib/structured-data.ts:27` where `WorkLoad — ${VIEW_HEADINGS[view]}` became
`WorkLoad: ${VIEW_HEADINGS[view]}` — **the interpolation was preserved**, so the JSON-LD still
inherits C6 and there is still one source of truth for the claim, exactly as §14.2 required.

`grep -rn "—" lib/ app/ components/` returns only seven `globals.css` colour comments and the
`calculator-page.tsx:11` `biome-ignore` comment that `spec.md` exempts by name. Guarded in
`__tests__/copy-guards.test.ts` for every future edit.

---

## 3. `MISSING_VALUE` — S6 · **holds**

`components/organisms/salary-calculator.tsx:34` — `const MISSING_VALUE = "Sem carga horária"`,
replacing `"—"`. Rendered at **one** slot, `:225`, into `HeroPanel`'s `value`.

| S6 requirement | Verdict |
|---|---|
| No digit, no `0`, no `R$`, no `N/A`/`--`/`...`, not empty | **holds** — checked the constant, not the test |
| Non-numeric and non-currency at a glance | **holds** — and enforced structurally: `hero-panel.tsx:24` `isFigure = /\d/.test(value)` is `false` for this string, so the designer's **statement mode** renders it as `text-title text-balance` prose, not as `text-numeral numeric` in the tabular figure face. It cannot occupy the visual role of a figure. |
| pt-BR | **holds** |
| Accessible equivalent | **holds, and this is the real fix.** The old `—` was a bare glyph announced inconsistently or not at all. `"Sem carga horária"` is text inside an `aria-live="polite"` region, so a screen-reader user now hears that the value is unavailable instead of silence. |
| Visually distinct from every real value in the same column | **holds** — different type role, different size ramp. Both themes are G9's read. |
| Refuses to assert; points at the remedy | **holds**, and the `AlertBanner` at `:132` names the remedy in full. |

The only other slot a reader could confuse is the `Bruto` / `Líquido` footer pair at `:232+`,
which renders `formatCurrency(grossSalary)` — those are S5's territory, not S6's, and S5 holds.

---

## 4. The claim retirement — S9 · **holds**

### 4.1 Completeness — re-grepped, not trusted

`grep -rniE "banco de hora|banco"` over `app/`, `components/`, `lib/`, `__tests__/`, `*.md`,
`*.json` (excluding `.git`, `node_modules`, `coverage/`): **zero hits outside `.specs/` and the
`PRODUCT.md` §9 non-claim row**, both of which are the intentional record. C1–C7 are all closed:

| | Location | Shipped |
|---|---|---|
| C1 | `app/page.tsx:6` | `"Calculadora de Jornada, Horas Extras e Saldo do Dia | WorkLoad"` |
| C2 | `app/page.tsx:11` | `"Calculadora de Jornada, Horas Extras e Saldo do Dia"` |
| C3 | `app/opengraph-image.tsx:3` | `"WorkLoad: Calculadora de jornada de trabalho, horas extras e saldo do dia"` |
| C4 | `app/twitter-image.tsx:3` | identical to C3 |
| C5 | `lib/og-image.tsx:14` | `"Jornada de trabalho, horas extras e saldo do dia"` |
| C6 | `lib/calculator-view.ts:9` | `"Calculadora de jornada de trabalho, horas extras e saldo do dia"` |
| C7 | `__tests__/app-header|page|calculator-page` | assertions **updated, none deleted** — S9.5 holds |

`app/manifest.ts` correctly untouched (§14.2 said it is not a C-location).

### 4.2 S9.1 — the hole I found at G2 is closed

`grep -rnoiE "saldo[^.,:;)\"\`]{0,25}"` over `app/`, `components/`, `lib/`: every occurrence in
a descriptor is `saldo do dia` / `Saldo do Dia`. **`saldo de horas` appears nowhere in the
repository.** The adjacency is `saldo` + `do dia` with no intervening noun, in all six
descriptors.

Better than I asked for: `__tests__/copy-guards.test.ts:43-46` encodes S9.1 as
`/saldo(?!\s+(do dia|diário|de hoje))/gi` over the five descriptor files, so the rule now runs
on every `pnpm check` instead of expiring the moment someone edits a title next quarter. That
is the right shape (lesson 006) and it is the reason this section is a pass rather than a
"correct today".

One occurrence outside the descriptor boundary, checked and **cleared**:
`day-summary.tsx:183` toggles between `"Saldo se você sair no horário"` and `"Saldo do dia"`.
S9.1 binds descriptors (C1–C6); this is a UI label, and on substance it is a projection of the
**same day's** balance under a stated condition — `hooks/use-work-calculator.ts:67` is
`breakdown.workedMinutes - breakdown.expectedMinutes`, one day, no accumulator. It claims no
accrual and no window. No finding.

### 4.3 S9.2 — `adicional noturno` named, never qualified

The descriptors name jornada, horas extras and saldo do dia; the `page.tsx:8` description names
`adicional noturno` and `os limites da CLT`. **No completeness qualifier anywhere** — no
`completo`, `todas as regras da CLT`, `todos os casos`, `qualquer jornada noturna`; no
`Súmula 60`, no `prorrogação`. Guarded at `copy-guards.test.ts:50-57`. The footer clause the
permission is tied to is intact (§2.3 above). **S9.2 holds, and its condition still holds.**

### 4.4 S9.3 / S9.4 / S9.5

S9.3: none of the eighteen banned inflections appears in any descriptor; guarded at
`copy-guards.test.ts:34-41`. *(The guard's regex omits a bare `ponto`; I read all six
descriptors by eye and none contains it. Noted at F6 below, not a defect today.)*

S9.4: C3 = C4 = `WorkLoad: ` + C6, asserted at `copy-guards.test.ts:59-64`. **C5 is a strict
subset of C3/C4** — it drops the leading `Calculadora de` and keeps every item, including
`do dia`. It adds nothing and broadens nothing. Satisfied, though by reading rather than by a
test (F6).

S9.5: no `expect()` was deleted to buy a green suite; the three C7 files assert the new strings.

### 4.5 `PRODUCT.md` §9

The **non-claim row** shipped correct: CLT art. 59 §§2º, 5º e 6º named (verified verbatim at
`legal.md` §14.1), the reason is the right one (no accumulation across days), the §7 collision
is stated, and the unlock sequence is in the right order. It is fit to stop the next agent
restoring the claim.

The **Evidence row** is true — each of jornada, horas extras, adicional noturno and saldo do dia
is backed by the modules audited at §14.3, and `grep -rn "balance" lib/` still returns nothing
at all, so its second clause is if anything understated. **But the binding correction from
`legal.md` §14.5 was not made** — see F5.

---

## 5. R$ 8.475,55 — S10 + AC26 · **holds**

Shipped, `lib/payroll.ts:24` (CLT):

> *"INSS pelo RGPS, com alíquotas progressivas de 7,5% a 14%. **O teto do salário de
> contribuição é** ${formatCurrency(RGPS_CEILING)}: acima disso o desconto trava em
> ${formatCurrency(TABLE.rgpsCeilingDiscount)} (tabela de ${TABLE.year})."*

Shipped, `lib/payroll.ts:32` (estatutário):

> *"Aplicamos a tabela do RPPS federal: a contribuição não para no **teto do salário de
> contribuição** que vale para a CLT e as faixas seguem subindo até 22% sobre a parcela mais
> alta. Servidor estadual ou municipal tem alíquota própria (muitas vezes 14% linear), então
> este número não vale para ele."*

| S10 | Verdict |
|---|---|
| S10.1 — `salário de contribuição` immediately governs the figure | **holds**, art. 2º's own unhyphenated form |
| S10.2 — the `teto` framing still attaches to R$ 8.475,55 | **holds** |
| S10.3 — no `teto de contribuição`, no `teto do INSS` anywhere in `lib/` | **holds**; the old `:32` string said `teto do INSS` and it is gone. Repo-wide grep returns only the two guard assertions. Guarded at `copy-guards.test.ts:66-67` and `payroll.test.ts:61,85-87` — this is AC25's shape, the whole boundary rather than a line number (lesson 006) |
| S10.4 — R$ 988,09 legible as the consequence of crossing the base | **holds** — `: acima disso o desconto trava em...` |
| S10.5 — figure and year interpolated, never literals | **holds** — `RGPS_CEILING` derives from the last RGPS bracket at `:16`, `TABLE.year` from `:44`. No number moved. AC15 holds to the centavo |
| S10.6 — `progressivas` retained | **holds**, matching art. 7º's *"de forma progressiva"* |

**The worked check from §15.3, read off the rendered sentence without inference:** (1) the base
the alíquotas stop at = R$ 8.475,55 ✓; (2) what that base **is** = o salário de contribuição,
not the contribution ✓; (3) the most that can be withheld = R$ 988,09 ✓; (4) the table year =
2026 ✓. **The collapse S10 was written to remove is gone.**

**AC26 — one name across both strings:** both say `teto do salário de contribuição`, verbatim.
This is the failure a grep could never catch — two *different permitted* names for one figure on
one screen — and it does not occur.

**The estatutário string re-verified on substance, not only on naming:**

- *"a contribuição não para no teto do salário de contribuição que vale para a CLT"* — true:
  Anexo III continues past R$ 8.475,55 into four further faixas, and
  `lib/legal-tables.ts:56` terminates at `Number.POSITIVE_INFINITY`. **The federal RPPS ladder
  has no ceiling.** ✓
- *"as faixas seguem subindo até 22% sobre a parcela mais alta"* — true, and correctly
  **per-faixa**: Anexo III's own header is *"alíquota progressiva incidindo sobre a faixa de
  valores"*, and `payroll.ts` applies `rppsFederalBrackets` through the same progressive walk.
  "sobre a parcela mais alta" is the right phrasing; "de 22%" flat would have been wrong. ✓
- *"Servidor estadual ou municipal tem alíquota própria (muitas vezes 14% linear), então este
  número não vale para ele"* — true and correctly hedged. EC nº 103/2019 art. 9º §4º bars
  sub-União rates for deficit RPPS, which makes 14% the ordinary floor but **not** a universal
  rule; `muitas vezes` is the honest quantifier and the disclaimer is categorical. ✓
  Disclosed a second time in the footer at `calculator-views.tsx:87-88`.

---

## 6. Collateral from the font and icon swaps

Read the actual diff of every file carrying a legal string. The `lucide-react` →
`@tabler/icons-react` swap touched `day-summary.tsx`, `calculator-views.tsx`,
`salary-calculator.tsx`, `regime-field.tsx`, `journey-form.tsx` and others. **Every hunk in
those files is an identifier rename or a formatter reflow; no legal string moved with an icon.**
Two semantic icon substitutions (`CalendarDays`→`IconCalendarMonth` on the DSR row,
`DollarSign`→`IconCurrencyDollar` on the Custo da Hora tab) are `aria-hidden="true"` decorations
whose adjacent text is unchanged. No disclosure lost an anchor. Nothing in `lib/legal-tables.ts`
was touched — the boundary the `tech-lead` drew held.

---

## 7. Traceability audit

Every user-visible number, and the table it traces to:

| Number on screen | Traces to | Norm cited in the module |
|---|---|---|
| R$ 8.475,55 (teto do salário de contribuição) | `legal-tables.ts:41` via `payroll.ts:16` | Portaria MPS/MF 13/2026, `:46-47` |
| R$ 988,09 (desconto máximo) | `legal-tables.ts:49` | idem |
| 7,5% / 9% / 12% / 14% (RGPS) | `legal-tables.ts:38-41` | idem |
| 14,5% / 16,5% / 19% / 22% (RPPS federal) | `legal-tables.ts:53-56` | idem |
| IRRF brackets, parcela a deduzir, desconto simplificado, dependente | `legal-tables.ts:59-68` | Lei 15.270/2025 |
| 2026 / 01/01/2026 + source link in the footer | `legal-tables.ts:44-47` rendered at `calculator-views.tsx:90-103` | shown to the user with its URL |
| Adicional noturno 20%, 52min30s, 22:00–05:00 | `lib/night-shift.ts` | CLT art. 73 *caput*, §§1º e 2º |
| Extra 50% / 100%, limite de 2h | `lib/compliance.ts`, `splitOvertime` | CLT art. 59; Súmula 376 TST |
| DSR sobre os extras | `lib/weekly-rest.ts:18` | Lei 605/49 art. 7º §2º + Súmula 172 TST, in the module comment |
| Intervalos 15min / 1h / 30min, 11h interregno | `lib/compliance.ts:47,56,65` | CLT arts. 71 §1º, 71, 66 |
| Saldo do dia, horas extras, tempo decorrido | `lib/day-breakdown.ts`, `hooks/use-work-calculator.ts:67` | durations, not money — no table needed |
| `Sem carga horária` | not a number, by construction | — |

**No user-visible number without a cited table. No estimate, no "aproximadamente".**

---

## 8. Disclosure audit

| Disclosure | Where it must be | Visible? |
|---|---|---|
| D1 estimate / D2 not the holerite / **D3 not a ponto record** / D4 not legal advice | `calculator-views.tsx:78-81`, footer, no interaction | **yes, all four** |
| The omitted-variable list (FGTS, CCT, 13º, terço, INSS/IRRF sobre extras, Súmula 60, feriados, intervalo suprimido, insalubridade/periculosidade, RPPS estadual/municipal) | `:82-88`, same footer | **yes, intact and unshortened** |
| Table year + effective date + source URL | `:90-103` | **yes**, with a live link |
| DSR assumptions + feriados excluded | `day-summary.tsx:230-233`, under the DSR row | **yes**, uncollapsed |
| The zero is absence, not an answer | `salary-calculator.tsx:126` | **yes**, adjacent to the zeroed fields |
| RPPS estadual/municipal does not apply | `payroll.ts:32` **and** the footer | **yes, twice** |
| Local-only storage | `:74-77` | yes |
| Privacy / consent | `cookie-consent.tsx` | untouched |

**None is behind a collapsed panel, a modal or a `title` attribute.** Both themes are G9.

---

## 9. Findings

| # | Severity | Where | What |
|---|---|---|---|
| **F5** | **medium** | `PRODUCT.md` §9, Evidence table, the new row | The evidence cell cites only `components/organisms/day-summary.tsx` — a **render** site that receives `balanceMinutes` as a prop and cannot demonstrate the single-day scope on its own. `legal.md` §14.5 made it **binding** that the cell also cite `hooks/use-work-calculator.ts:67` (`balance: breakdown.workedMinutes - breakdown.expectedMinutes`), which is the line that actually proves the claim. This was not done. §9 is the register that authorises every claim in the UI and the README; a register whose evidence column points at a display is one refactor away from pointing at nothing, and this row is the one holding down a claim we just retired. **One-line edit, owner `product-manager`, routed via `tech-lead`. No patch from me.** Not a reject: the claim is true and backed, and no user-visible number or string is wrong. |
| **F6** | **low** | `__tests__/copy-guards.test.ts:34-41, 59-64` | Two S9 obligations are correct today but unguarded, so they are correct *by reading* rather than *by construction*: (a) S9.3's bare `ponto` is absent from the banned-term regex — `registro/controle/folha/espelho de ponto` are caught, a naked `ponto` in a future descriptor is not, and D3 makes that word the sharpest contradiction available; (b) S9.4's C5-is-a-strict-subset-of-C3/C4 rule is not asserted, so `lib/og-image.tsx:14` could broaden later without failing a test. Both verified by hand at this gate and both passing. **`qa-engineer` / `tech-lead`, as a follow-up.** Not a reject. |

**Still open, already routed, unchanged by this spec — not findings here:** F2 (Súmula 172 cited
alone for a DSR base that includes the adicional noturno; Lei 605/49 art. 7º "a" is the missing
half — the number is defensible, the citation is incomplete); F4 (`lib/legal-tables.ts:47` ships
the user a `legisweb.com.br` URL when the DOU permalink in §1 above is a machine-readable
primary source) → `.specs/0003-citation-registry/`.

---

## 10. Verdict

**pass.**

Every one of S1–S10 holds in the shipped source. The four rewrites I flagged as highest risk at
G2 all kept their meaning, and two of them — D3 rebuilt as its own full negation, and
`Feriados não entram.` promoted to its own sentence — are **stronger** than what I bound. The
claim retirement is complete on a grep I ran myself, `saldo de horas` exists nowhere, and the
S9.1 adjacency rule that a flat grep could not express now runs on every `pnpm check`. R$ 8.475,55
carries one name across both regime strings and the name is the norm's own. `MISSING_VALUE` can
no longer be read as a number, a zero or a currency, and for the first time it says something to
a screen reader.

Two findings, neither of them a wrong number and neither of them on a user-visible surface: F5
is a binding one-line correction to `PRODUCT.md` §9's evidence column that was not made, and F6
is two hand-verified rules that should become guards. **Both should close before this spec
closes; neither withholds the gate.**

Nothing here requires human acceptance of a legal imprecision.
