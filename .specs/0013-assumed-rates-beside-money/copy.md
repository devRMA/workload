# 0013 — assumed rates beside money

> Owner: content-writer · Gate: `copy`

**`design.md` is still the unedited template** (read before writing: 59 lines, every heading a
placeholder) — the budget row in *Copy constraints* does not exist yet. Per this gate's brief, every
count below is a **measured** character count against `legal.md`'s content requirement, not a fit
against a stated window. `product-designer` sizes the slot to this string; this string does not shrink
to a slot that has not been drawn.

## Voice notes

- This spec adds exactly **one** new string. Everything else on the two rows it disclosures (`Extra
  {firstTierRate}%`, `Extra {extraTierRate}%`) is unchanged code (`spec.md` § Out of scope 1).
- Matched to the two nearest neighbors in the same block, `day-summary.tsx:232–235` (M3) and `:238–241`
  (M4): short declarative sentences, closed by a period, no em dash, no colon used for contrast. My
  first two drafts used an em dash and a colon — neither punctuation mark appears anywhere in
  `components/organisms/*.tsx`'s shipped strings (checked: `grep -rn "—" components/organisms/*.tsx
  components/molecules/*.tsx` → **0 rows**) — so the shipped draft below replaces both with periods.
  Same reason M3/M4 read as one voice and a dash-heavy paragraph next to them would not.
- Reused verbatim, for the same reason: the citation format `(art. 7º, XVI, da CF; art. 59, §1º, da
  CLT)` is `journey-form.tsx:142`'s own phrasing, already shipped in this file's sibling panel. The
  duration idiom `"2h extras"` is `journey-form.tsx:141`'s own label text, `"Adicional até 2h extras
  (%)"`. New vocabulary was avoided everywhere an exact match already existed in this codebase.
- **The length is a consequence of `legal.md` §4 and §6 **L7**, not a drafting miss.** L7 requires one
  paragraph to carry **three separate attributions**, never one norm at the end covering all three
  claims. M3 carries one attribution in 122 characters; M4 carries two (a norm plus two named
  assumptions) in 255. This string carries three and measures **589** — about 1.6× M4 alone, and
  longer than M3+M4 combined (377). Flagged here so `product-designer` sizes the slot against 589, not
  against the two neighbors' example.
- **Placement, stated as a recommendation and not a ruling** — geometry is `product-designer`'s domain
  (`spec.md` § Scope 3): insert this paragraph **before** the existing M3 paragraph, not after. It
  explains rows 1–2 (`Extra {firstTierRate}%`, `Extra {extraTierRate}%`); M3 explains row 3. Reading
  order then matches row order top to bottom. Non-binding.

## Strings

### `day-summary.assumed-rate-disclosure`

New `<p>` in the variable-pay block of `components/organisms/day-summary.tsx`, rendering under the
**same condition** as `Extra {firstTierRate}%` and `Extra {extraTierRate}%` themselves — never gated
on `grossHourlyRate !== null`, never on `restDayPay > 0`, never on a panel or a gesture (`legal.md` §7,
§8.2 *presença*; `spec.md` clause **D**). It renders once per state; it does not duplicate
`journey-form.tsx:142`/`:157`, which stay untouched (`spec.md` § Out of scope 3).

| | Text | Chars |
|---|---|---|
| pt-BR | Assumimos 50% até 2h extras e 100% depois. Nenhuma das duas é necessariamente a taxa do seu contrato. Os 50% são o mínimo que a lei garante a toda hora extra, inclusive depois da 2ª (art. 7º, XVI, da CF; art. 59, §1º, da CLT). Usamos esse mínimo por não saber a taxa da sua convenção coletiva, que pode ser maior. Depois da 2ª hora, nenhuma lei fixa um valor maior para o empregado em geral. O degrau até 100% que o app aplica só existe onde há convenção ou acordo coletivo (art. 7º, XXVI, da CF; art. 611-A, I, da CLT). O corte em 2 horas também é uma escolha do app, não uma regra geral. | **589** |

Measured with `printf '%s' "<text>" \| wc -m` in this session, against `HEAD` `5c0c6fa` /
`fix/design-taste-preflight`, 2026-09-19. Reproduces to 589 on re-run.

- **Constraint:** none stated in `design.md` (template, unedited). Measured count above stands in its
  place.
- **Evidence:** every clause below traces to `legal.md`; see **Traces**.

Sentence-by-sentence, so a later gate can check each clause against the norm that authorizes it:

| Sentence | Carries | `legal.md` clause |
|---|---|---|
| "Assumimos 50% até 2h extras e 100% depois." | names the two app-chosen rates and the boundary, no norm attached — this is the topic sentence, not an assertion of fact | § Scope 2 |
| "Nenhuma das duas é necessariamente a taxa do seu contrato." | **T2** stated in plain words: the app chose both, the reader's contract might not match either. *"Necessariamente"* is load-bearing — without it the sentence is false for the reader whose CLT contract carries no CCT, where the 50% floor **is** their actual rate (`legal.md` §2.1) | `spec.md` T2; `legal.md` §2.1 |
| "Os 50% são o mínimo que a lei garante a toda hora extra, inclusive depois da 2ª (art. 7º, XVI, da CF; art. 59, §1º, da CLT)." | **C1** — the qualifier *mínimo* sits immediately after "50%", not at the end of the paragraph (`legal.md` §6 **L4**'s required position); *"inclusive depois da 2ª"* is L5(c) | `legal.md` §6 **L1**, **L4**; §2.1 N1/N2; §8.1 **C1** |
| "Usamos esse mínimo por não saber a taxa da sua convenção coletiva, que pode ser maior." | **L4(b)** — why the app defaults here; **L4(c)** — the reader's contract/CCT may fix more | `legal.md` §6 **L4** |
| "Depois da 2ª hora, nenhuma lei fixa um valor maior para o empregado em geral." | **C2**'s negative half, scoped exactly as `legal.md` §6 **L5(a)** states it — *"para o empregado em geral"* is the qualifier that keeps this true against Lei 8.906/1994 art. 20 §2º (the advogado empregado exception), and this clause names no percentage, so it cannot be misread as the forbidden broad form of **C5** | `legal.md` §6 **L2**, **L3**, **L5(a)**; §8.1 **C2**, **C5** |
| "O degrau até 100% que o app aplica só existe onde há convenção ou acordo coletivo (art. 7º, XXVI, da CF; art. 611-A, I, da CLT)." | **C2**'s positive half — names the instrument, never a specific CCT's content (`PRODUCT.md` §7) | `legal.md` §6 **L5(b)**; §2.4 N12/N13; §8.1 **C2** |
| "O corte em 2 horas também é uma escolha do app, não uma regra geral." | **C3** — the boundary is the app's own choice; no citation, because none exists, and CLT art. 59 *caput* is not named here or anywhere near a rate (`legal.md` §2.2, §6 **L6**) | `legal.md` §6 **L6**; §2.2; §8.1 **C3** |

## Traces

Every legal or numeric claim in the string above, mapped to where `legal.md` settles it:

| Claim in the string | `legal.md` section |
|---|---|
| 50% is a legal minimum for every extra hour, including past the 2nd | §6 L1, L4; §2.1 N1, N2; §8.1 C1 |
| The app applies 50%/100% by default because it does not have the reader's own rate | §6 L4(b); §12 DO1 |
| The reader's contract or convenção coletiva can fix a higher value than 50% | §6 L4(c) |
| No law fixes a rate above 50% after the 2nd hour, for the employee in general | §6 L2, L3, L5(a); §2.4; §8.1 C2, C5 |
| The value the app applies past the 2nd hour depends on a convenção or acordo coletivo | §6 L5(b); §2.4 N12, N13; §8.1 C2; §12 DO2 |
| The 2-hour split is the app's own assumption, not a general rule | §6 L6; §2.2; §8.1 C3; §12 DO3 |
| CLT art. 59, *caput*, is never cited as the boundary's source | §2.2; §6 L6; §8.1 C3 (a negative constraint, not a claim — checked by absence, not presence) |
| No weekday is named or made the subject of a sentence | §6 L9; §8.1 C4 |
| No claim that "100% doesn't come from any law" in the unscoped form | §6 L2, L3; §8.1 C5 |
| Renders in every state the rate labels render in, including where no money renders (ST-C) | §6 L8; §7; §8.2 *presença*; §12 DO4 |
| One paragraph covers both M1 and M2, carrying three distinct attributions | §6 L7; §4 |

## Error and empty states

**This spec adds none, and says why rather than leaving the section blank.** `spec.md` § Out of scope
2 forbids a new field, control or toggle, so there is no new input for the reader to get wrong. The one
existing error surface this screen has — the range/order problem on entry, lunch and exit times,
surfaced through `issue.message` in `journey-form.tsx`'s `AlertBanner` (`id="journey-issue"`) — is not
touched by this spec and is not re-specified here.

The one state that could look like an "empty" case for the new string is **ST-C**
(`grossHourlyRate = null`, no money renders anywhere in the block): the disclosure still renders there,
unchanged, because it is not gated on money being present (`legal.md` §6 **L8**; `spec.md` clause
**D**). There is no shorter or different wording for that state — one string, one condition, per
**L7**.

## Disclosures

Maps `spec.md`'s **DO1–DO4** to the sentences that discharge them, all inside the single string above:

| DO | Discharged by |
|---|---|
| **DO1** — first-tier rate is an app default; a real payslip uses the reader's own contract/CCT rate | Sentences 2–4 |
| **DO2** — second-tier rate is an app default no norm produces for the general employee; only a CCT/ACT creates it | Sentences 5–6 |
| **DO3** — the two-hour split is an app assumption about which hours cost which rate | Sentence 7 |
| **DO4** — these gaps hold in every state the rate labels render in, including where money is absent | Rendering condition, stated above the string, not a sentence inside it |

## Numbers and units

- **Percentages** render bare, no decimal, matching the two labels they sit beside: `50%`, `100%` —
  same digit style as `Extra {firstTierRate}%` / `Extra {extraTierRate}%` already on screen. No new
  percentage formatting introduced.
- **Duration in prose** — `"2h extras"`, reusing `journey-form.tsx:141`'s exact idiom, not
  `formatHoursAndMinutes`'s `"Xh Ym"` output (that formatter is for a measured duration; `2h` here
  names a fixed threshold, not something computed for this render).
- **Currency** — untouched. `formatCurrency` (`lib/utils.ts:59`, `Intl.NumberFormat('pt-BR')`, 2
  decimals) is not called by anything this spec adds (`spec.md` § Out of scope 1, **AC7**).
- **No table year applies here.** The norms this string cites — CF art. 7º, CLT art. 59 §1º, CLT art.
  611-A, I — are constitutional and consolidated-law articles with a *vigência* date (`legal.md`
  §0.1), not an annually-versioned bracket table like INSS/IRRF. `PRODUCT.md` §4's "the year is part of
  the answer" binds a table's year where a table produces the number; no table produces either 50% or
  100% here, only two articles with no yearly edition to name.

## Metadata

None. This spec does not touch `app/layout.tsx` or `app/manifest.ts`, and introduces no new route or
title.

## Rejected phrasings

| Considered | Why it lost |
|---|---|
| "O degrau para 100% depois da 2ª hora não vem de lei para o empregado em geral — só existe se a sua convenção ou acordo coletivo o prever (…)." | "100%" sits immediately next to the negation "não vem de lei." Even with the scope qualifier present, this reproduces the exact ambiguous shape `legal.md` **DV-3** flags in `journey-form.tsx:157` — a reader (or a grep) cannot tell whether the subject of the negation is "the step" or "the 100%." Rewritten so the negative clause never mentions a percentage at all; the clause naming "100%" is entirely affirmative. |
| "Os 100% do segundo degrau não vêm da lei, só da sua convenção coletiva." | "Os 100%" as the grammatical subject of "não vêm da lei" is precisely the unscoped form `legal.md` §8 **C5** forbids — Lei 8.906/1994, art. 20, §2º fixes ≥100% by law for the empregado advogado, so the sentence is false for that reader and the app has no way to rule the category out. |
| A version using an em dash ("—") and a colon (":") for the two contrasts | Neither mark appears in any shipped string in `components/organisms/*.tsx` or `components/molecules/*.tsx` (`grep -rn "—" …` → 0 rows). Replaced with periods to read as the same voice as its neighbors, M3 and M4. |
| Dropping "necessariamente" from the opening sentence | Makes "nenhuma das duas é a taxa do seu contrato" a flat claim — false for the CLT reader with no CCT, whose first-tier 50% *is* their actual statutory rate (`legal.md` §2.1). |
| Two shorter paragraphs, one per row, instead of one covering both | `legal.md` §6 **L7** rules this settled: one paragraph, under one shared render condition, carrying three attributions. Reopening it here would relitigate a G2 ruling, which is not this gate's authority. |

## Checks

- [x] Every string is pt-BR — there is no i18n layer and the string lives in the component
- [x] It reads as a native original, written for a worker who is not a lawyer — no undefined jargon;
      "convenção coletiva," "acordo coletivo" and "adicional" are load-bearing domain terms already used
      in the shipped panel hints this string sits beside
- [x] Every legal claim traces to a passage of `legal.md` — see **Strings** (sentence-by-sentence) and
      **Traces**
- [x] Every literal a test depends on verbatim is listed, with its `file:line` — the string's target
      location is `components/organisms/day-summary.tsx`, new `<p>` in the variable-pay block,
      immediately preceding `:232` in the current file (see **Voice notes**, placement); no other file
      is touched by this spec's copy
- [x] Ran the guard greps this gate's rejections are checked against, against the shipped string, in
      this session: weekday terms (`sábado|domingo|fim de semana|final de semana`) — 0 matches; hedge
      words (`aproximadamente|estimativa|em média|pode variar`) — 0 matches; "100%" adjacent to a
      negation (`100% não|não .{0,15}100%`) — 0 matches; CLT art. 59 *caput* cited near the boundary — 0
      matches; deixis to a sibling element (`acima|abaixo|ao lado|este valor|essa taxa|nesta linha`) — 0
      matches
