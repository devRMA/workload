# 0006 — Salary alert legibility

> Owner: product-manager · Gate: `spec` · Run 2
>
> **Run 2 amends run 1 against `legal.md` (G2, pass).** Six binding amendments from `legal.md` §10.2
> are applied (A1–A6, marked at each criterion), the disclosure-surface test of §2.1 replaces the
> enumeration that run 1 reasoned from, two scope corrections the analyst made are carried (C4 holds
> no legal content; C5 is in the LR domain by *gap*, not by citation), and the human's decision on
> `legal.md` §13 **Q1** is recorded as settled in § Decisions carried in. Nothing in this run widens
> the scope of run 1: the five surfaces, the one remedy and the instrument are unchanged.

## Problem

A CLT worker opens `/custo-da-hora` on a 390px phone with the question *"Quanto cai na minha
conta?"*. Before they type anything, every figure on the card reads `R$ 0,00`, and the app explains
why in an alert banner:

> *"Sem ele os valores abaixo continuam em R$ 0,00. Esse zero não é o seu salário, é a falta do
> dado."*

That sentence — 97 characters — renders over **4 line boxes in a 242px column**, about **24
characters per line**, inside a viewport that gives the card beside it a 310px text column. The
`labor-law-analyst` measured it at `0005` G6 and named it **DS3**
(`components/organisms/salary-calculator.tsx:125`): 242.00px and 24.3 cpl at 390 in both themes,
601.33px and 48.5 cpl at 1440.

The cause is not the sentence and not the card. It is the banner: `components/atoms/alert-banner.tsx`
spends roughly **68 CSS px** of horizontal chrome (border, `p-4`, the 20px icon and its 12px gap)
*inside* a card that has already spent its own padding, and the card's width does not reveal that
the text column has collapsed. Every consumer of that atom inherits the shape — including the four
compliance warnings, which are three to five times longer than DS3's text and quote CLT art. 59,
art. 66, art. 71 §1º, Súmula 376 and Súmula 431 do TST.

**The severity is split, and G2 settled the split** (`legal.md` §2, §11 L2/L3). Run 1 recorded the
whole spec as a quality defect on the strength of the `0005` G6 ruling over DS3. That ruling holds
for DS3 and **does not transfer**: applying the §2.1 disclosure-surface test to each rendered string
puts **C2, C3 and C5 in the LR domain — now DS5, DS6 and DS7 — and leaves C1 and C4 out**. So:

- **C2, C3, C5 — a compliance defect.** Each discharges a `PRODUCT.md` §4 obligation on screen; C5
  the most sharply, because it names an amount owed to the user that this app does not compute
  (*"o tempo suprimido é devido com acréscimo de 50%"*, `lib/compliance.ts:47,56`) — the same
  obligation as the footer's gap list, DS1 P3, discharged at the moment the gap becomes concrete.
- **C1, C4 — a quality defect.** C1 withdraws a claim rather than making one (`R$ 0,00` is the
  arithmetic identity of an absent input), and rule **S5** from `0002`, which governs what it must
  *say*, is satisfied in full. C4 carries **no legal content at all** — all eight strings it can
  render are chronological validation (`lib/journey.ts:19-36`), correcting run 1, which listed it as
  a legal surface. Both stay in scope under `PRODUCT.md` §5; neither carries the `labor-law-analyst`'s
  veto.

What fails on all five is the same geometry, and the rule it fails is **LR2a** (`legal.md` §3.2).

## Why now

- It is pre-existing and it survived `0005` untouched: the DS3 subtree measures 242px in both
  `geometry-before.json` and `geometry-after.json` of that spec. Nothing fixed it and nothing will,
  because it never resolved through the token collision `0005` repaired.
- The `labor-law-analyst` recorded it as debt **with this gate's name on it** and stated it "does
  not expire with this spec and is not closed by 0005 shipping".
- The instrument that would catch it already exists —
  `tests/e2e/disclosure-legibility.spec.ts` covers DS1 and DS4 and knows how to count line boxes —
  so the marginal cost of binding the banner surfaces is a test file, not a test framework.
- The surface it degrades most is the one the user meets *first*: at 390, before any input, on the
  route that answers §1's third question.

## Audience & moment

10-second first contact, 390px, one hand, both themes. The reader has typed nothing yet and is
reading the only sentence on the screen that explains why every number is zero — or has typed a
journey that crossed a CLT limit and is reading why.

## Outcome

Every alert the app raises reads as prose at 390, not as a column of two-word lines — at the same
measure as the text beside it, with the same words, the same numbers and the same norms it names
today.

## Scope

**The boundary is a search, not a list** (lesson 006): *every consumer of
`components/atoms/alert-banner.tsx`*, found by

```
grep -rn "AlertBanner" app components lib hooks __tests__ tests
```

run in this tree at `ba94c2d` (§ Evidence, E1). The consumers it returns today:

| # | Consumer | Route | Renders when | Text length | LR domain? |
|---|---|---|---|---|---|
| C1 | `salary-calculator.tsx:124` — *Informe o seu salário bruto* (**DS3**) | `/custo-da-hora` | gross salary is empty — **the default state on a cold load** | 97 chars | **no** — quality |
| C2 | `salary-calculator.tsx:130` — *Informe a carga horária mensal* (**DS5**) | `/custo-da-hora` | the monthly-hours field is cleared | 118 chars | **yes** — *cite* (divisor 220) |
| C3 | `salary-calculator.tsx:144` — *A carga mensal não combina com a jornada diária* (**DS6**) | `/custo-da-hora` | monthly hours contradict the daily journey (Súmula 431) | ~215 chars | **yes** — *cite* |
| C4 | `journey-form.tsx:173` — *Confira seus horários* | `/` | an entered time range is invalid | varies with `issue.message` (`lib/journey.ts:19-36`) | **no** — quality |
| C5 | `day-summary.tsx:251` — the compliance warnings, one banner per warning (**DS7**) | `/` | a journey crosses a CLT threshold; `lib/compliance.ts` emits 1–4 | 195–247 chars each | **yes** — *cite* **and** *gap* |

**The LR-domain column is the output of a test, not a list** (`legal.md` §2.1, lesson 024). A
rendered string is in the LR domain if it **cites** (states a number, rate, threshold, divisor or
year, or attributes one to a norm), names a **gap** (a variable, right or amount the user's real
situation includes and this app does not compute), or records a **choice**. Input validation,
empty-state explanations and navigation are outside it by construction. **Any surface this spec adds
to, or any string a downstream gate changes, is ruled by running the test — never by reading the
table.** A surface that turns out to satisfy the test and is missing from the table means the table
is out of date, not that the surface is exempt.

In scope:

1. The **rendered measure** of the body text of every consumer above, at 390×844 and 1440×900, on
   both routes, in both themes.
2. The **shared cause**: the horizontal chrome `alert-banner.tsx` spends between its own root
   element and its text column — the quantity AC4 measures, both sides as bounding rects
   (`legal.md` §3.2 LR2a). Whether the remedy lives in the atom or in its
   consumers is `tech-lead`'s call at G4, but it must be **one remedy that reaches every consumer
   in the table** — a fix applied at C1 only would leave C2–C5 broken in exactly the same way.
3. **Binding the surfaces to the instrument**: extending
   `tests/e2e/disclosure-legibility.spec.ts` (or a sibling file — `tech-lead`'s call) to measure
   C1–C5, including driving the UI into the states that make C2–C5 render, through the same typing
   a user does.

## Out of scope

Each exclusion is stated as the property it protects, and names the gate that may override it
(lesson 019). Nothing here may be overridden silently.

- **The words.** No banner string is reworded, shortened, split or re-punctuated, and no new
  user-visible string is introduced. *Protects:* every claim these sentences make stands exactly as
  reviewed at `0002` (S5) and `0005` G6; a string reopened is a string re-published (lesson 002).
  *Override:* only `labor-law-analyst` at G2, in `legal.md`, and only by naming the string and the
  rule that forces it; `content-writer` may not initiate one at G3. **G2 has run and forced none**
  (`legal.md` §6 verified every norm C2, C3 and C5 quote and §14 excludes every user-visible string);
  the exclusion is now absolute for the rest of this spec.
- **The numbers.** No new figure, rate, threshold, divisor or year reaches the screen. *Protects:*
  every user-visible number stays traceable to `lib/`. *Override:* none. A remedy that needs a new
  number is the wrong remedy.
- **`AlertBanner`'s visual identity** — its tone colours, its `role`, the presence of the icon, its
  corner radius and its elevation. *Protects:* the alert still reads as an alert, and `0005`'s
  freshly settled surface treatment is not reopened. *Override:* `product-designer` at G3 may change
  the banner's **geometry** — horizontal padding, icon size, icon placement, flow direction, and
  their breakpoint behaviour — where AC4 cannot be met otherwise; any such change is named in
  `design.md` and is bounded by AC6.
- **`DESIGN.md`'s spacing scale and type ramp.** *Protects:* the migration settled at `0005` at
  real cost, and the ramp every other surface is measured against. *Override:* **none — the human
  has decided.** The type ramp was the only lever that could close the 390 measure residual, and it
  was put to the human at G2 (`legal.md` §13 Q1) and declined; see § Decisions carried in, D-Q1.
  `DESIGN.md` is not opened by this spec, and a downstream agent proposing a ramp change to satisfy
  a measure criterion is re-opening a settled decision.
- **DS1, DS2 and DS4** — the legal footer, the DSR caption and the consent dialog. Measured passing
  against LR1–LR4 at `0005` G6 and G9. *Protects:* the instrument's existing green stays meaningful.
  *Override:* none; if a remedy here moves them, the remedy is wrong (AC7).
- **Any surface the E1 search does not return.** *Protects:* this spec from becoming a repository-wide
  measure audit. *Override:* `labor-law-analyst` at G2 may add a surface by name if it holds a
  disclosure; anyone else who finds one opens a spec for it. **G2 has run and added none** — it
  ruled the five, individually, by the §2.1 test. The exclusion is now closed for this spec.
- **`lib/`.** No compliance rule, threshold or warning text is touched — including
  `lib/compliance.ts:31-66` and `lib/journey.ts:19-36`, where C5's and C4's strings actually live.
  *Override:* none.
- **X1 — the Súmula 431 attribution** at `lib/salary-period.ts:40` and `salary-calculator.tsx:151`
  (`legal.md` §10.1 X1, §6.4). *Protects:* the two exclusions above, both of which repairing it would
  breach. It is carried debt with a named owner, recorded in § Carried debt; it is **not** this
  spec's work and not a reason to open `lib/salary-period.ts`. *Override:* none here — it needs its
  own spec.

## Legal dependencies

Named, not stated. **All six are settled — G2 passed at run 1** (`legal.md` §11). The rulings are
recorded here so a downstream agent reads the answer without re-deriving the question; the binding
text is `legal.md`'s, not this table's.

| # | Dependency | Settled at G2 |
|---|---|---|
| L1 | **LR1, LR2, LR3** — `.specs/0005-…/legal.md` §3, and the measurement conditions attached to them | **LR1 and LR3 bind all five unchanged**, reading `getBoundingClientRect().width`. **LR2 is corrected into LR2a and LR2b** (`legal.md` §3.2), both reading the same quantity — one box model across the rule set (lesson 023). LR4 does not apply: no surface here records a choice. |
| L2 | The **G6 ruling on DS3** — `.specs/0005-…/reports/legal.md` §6 | **It holds for DS3/C1 and does not transfer.** The severity of this spec is split: compliance for C2, C3, C5; quality for C1, C4. Scope unchanged. |
| L3 | **C3, C4 and C5's norm citations**, and the 8h48/220 divisor named in C2 | **Answered by a test, not by the citation.** `legal.md` §2.1: cite / gap / choice, applied per rendered string. Returns **C2, C3, C5 in** (DS5, DS6, DS7) and **C1, C4 out**. C4 quotes no norm at all. C5 is in by *gap* as well as by *cite*: `lib/compliance.ts:47,56` states suppressed rest time is owed with a 50% acréscimo — an amount this app does not compute, and the same obligation as DS1 P3. |
| L4 | **Rule S5** — `.specs/0002-…/legal.md`, the content rule over C1 | **Untouched, and a geometry-only change cannot violate it.** Re-checked against the current string. AC7 is what keeps that true. |
| L5 | **`PRODUCT.md` §5, "silence is a defect"** | **For C5, yes — 24 cpl over 247 characters on a phone is closer to silence. For C1, no** — degraded prose in the right place is not withheld prose (`legal.md` §7). No cpl number separates speech from silence; what decides it is what the string is for, which is the §2.1 test. |
| L6 | The **40-characters-per-line floor itself** — a project convention set at `0005` G2 §13, explicitly "not a norm" | **It does not transfer to 14px, and it is not lowered.** It was calibrated on 12px and stated without its calibration. LR2b now names the font size it binds at; `legal.md` §4 proves 40 cpl needs ≥363px of column against the 358px the app's widest column offers at 390 — unreachable even at full page width. The residual is **reported, never absorbed** (AC11). |

No table, bracket, rate, ceiling or rounding step is introduced, altered or read by this change
(`legal.md` §8).

## Acceptance criteria

Every geometric criterion is asserted at **390×844 and 1440×900**, on **both** `/` and
`/custo-da-hora`, in **both** themes, against the **production build** — the elevation `0005`
already required of DS1 and DS4. A computed `max-width` is not evidence; every criterion below
reads rendered geometry from a real browser.

| # | Criterion | How it is verified |
|---|---|---|
| AC1 | The E1 search, re-run at build time, returns no `AlertBanner` consumer that is absent from the § Scope table. If it returns one, the scope is wrong and the gate bounces to G1. | `grep -rn "AlertBanner" app components lib hooks __tests__ tests`, output pasted into `reports/qa.md`, compared row by row with the § Scope table. |
| AC2 *(amended — `legal.md` §10.2 A6)* | The instrument is seen **red** before any remedy lands: on the unfixed tree it reports a failure naming **C1** *and* **at least one of C5's banners** at 390, each with its measured LR2a widths and its measured characters-per-line-box value, and those numbers appear in the report. C5 is the LR-domain surface, and an assertion never seen red over an LR-domain surface proves nothing about it. | `pnpm e2e tests/e2e/disclosure-legibility.spec.ts` (command listed in this tree, E2) run on `HEAD` before the remedy commit; failure output pasted into `evidence/` and the numbers into `reports/qa.md`. |
| AC3 *(amended — A1)* | At **1440×900**, both themes, both routes: every consumer C1–C5 satisfies **LR2b** (`legal.md` §3.2) — `textContent.trim().length / lineBoxes ≥ 40`, counted by the `0005` §3 method (a `Range` over the element's text content, `getClientRects()` deduplicated by rounded `top`), with single-line-box text exempt per the G6 B3 ruling. **Non-regression clause:** any consumer that measures ≥ 40 cpl at **390** on the fixed tree has that measured value as its floor from then on — the 390 exemption may not be spent to lose ground already held. | The e2e measurement, one case per consumer per viewport per theme; values tabulated in `reports/qa.md`, and the 390 floors recorded there by consumer. |
| AC4 *(amended — A2, A3)* | At **both viewports**, both themes: every consumer C1–C5 satisfies **LR2a** (`legal.md` §3.2), on **one box model** — `bodyText.getBoundingClientRect().width ≥ surfaceRoot.getBoundingClientRect().width − 32`, where `surfaceRoot` is the `AlertBanner` root `<div>` and `bodyText` is the element that directly contains the banner's body text. Both sides are bounding rects; neither is a content box. Today C1 fails by ~34px at 390 (242.00 against a root to be measured at ≈308). The 32px is a budget for the surface's own border and padding: a remedy may spend **less** and none may spend more. **Failing this is a compliance blocker for C2, C3 and C5 (DS5, DS6, DS7) and a product failure for C1 and C4** — the measurement is identical, the consequence is not (`legal.md` §10.1 D1/D2). | Same run; `surfaceRoot`'s and `bodyText`'s widths and their difference reported per consumer, per viewport, per theme, each row labelled compliance or product. |
| AC5 | At both viewports, both themes: every consumer C1–C5 satisfies **LR1** — `getBoundingClientRect().width ≥ min(320, A)`, `A` being the content-box width available in its containing block — and **LR3** as written at `0005` §3. C1 attains LR1 today at 242px; this is a non-regression criterion. | Same run, reusing the existing `assertLr1` / `assertLr3` helpers. |
| AC6 | The rendered geometry of **DS1, DS2 and DS4** is unchanged by this spec, and the 48 existing disclosure-legibility cases stay green. | `pnpm e2e tests/e2e/disclosure-legibility.spec.ts` on the fixed tree; plus a before/after geometry comparison of those three subtrees at 390 and 1440. |
| AC7 *(amended — A5)* | No user-visible string changes, checked in the files the strings actually live in and not only in the components that render them: `git diff main -- components/ app/ lib/` contains no added or removed pt-BR text node, and **none of `lib/compliance.ts:31-66` (C5's `detail` texts), `lib/journey.ts:19-36` (C4's eight validation strings) or `lib/salary-period.ts` is opened at all**. | Read the diff; `git diff --stat main -- lib/` shows no `compliance.ts`, `journey.ts` or `salary-period.ts` row. |
| AC8 | No new user-visible number. The diff introduces no numeric literal inside any pt-BR string. | Same diff read, plus the existing unit tests over `lib/compliance.ts` and `lib/salary-period.ts` unchanged and green. |
| AC9 | Each state the new cases measure is reachable by the actions a user performs — typing into the fields, nothing else. No test-only prop, no injected state, no route parameter added to make a banner render. | Read the new test file: every consumer's state is produced by `getByRole` interactions on shipped controls. |
| AC10 | `pnpm check` green, coverage thresholds unchanged and met (100% `lib/**` and `hooks/**`, 90% `app/**` and `components/**`), zero axe-core violations at `serious` or `critical` in both themes on both routes, no horizontal overflow and no control off-viewport at 390, 1440, 2560 and 3840. | `pnpm check`, `pnpm e2e`, `node .agents/tools/preview.mjs --out .specs/0006-salary-alert-legibility/evidence/`. |
| AC11 *(new — A4)* | For every consumer C1–C5, at **390×844** in both themes, the measured characters-per-line-box value is **reported** in `reports/qa.md` next to LR2a's two widths, **whether or not LR2b binds there** — including every value below 40. The report states, per row, that the value is a reported residual rather than a judged criterion. A missing row is a failed criterion: a residual that is not written down is a residual that disappears (`legal.md` §3.3). | Read `reports/qa.md`: 5 consumers × 2 themes of cpl rows at 390, each carrying `surfaceRoot` width, `bodyText` width and cpl. |

**Note on AC3, AC4 and AC11 — why the measure floor is split by viewport, and why that is not a
softening** (lesson 011, the lever test; ratified at G2, `legal.md` §4). The 40-cpl floor was
calibrated at `0005` G2 on 12px caption type. The banner body is `text-body-sm` (14px), and the
analyst proved the unreachability from measurements rather than from run 1's estimate: `0005`'s own
readings of C1 (601.33px over 2 line boxes, 242.00px over 4) bound a character of that string to
7.48–12.40 CSS px, so 40 cpl on a 97-character string needs **≥363px of column**, while the app's
widest content column at 390 — the footer, spanning the full page content box — measures **358px**.
**C1 cannot reach 40 cpl at 390 even if the banner spanned the entire page and spent zero chrome.**

So the floor was not lowered; it was placed where a lever exists. **AC3 (LR2b)** holds it at 1440,
where every surface can clear it, plus a non-regression clause at 390 for any surface that already
does — the exemption is by *font size*, not by component, precisely so that ground C5 may already
hold is not thrown away. **AC4 (LR2a)** binds the lever that is in scope at both viewports: the
banner's own chrome. **AC11** reports the 390 residual so it does not quietly cease to exist, which
is what happened between `0005` §13 and G2 here. The 32px in AC4 is a budget for the surface's own
border and padding, not a legal or design threshold; `product-designer` may spend less and none may
spend more.

**Note on the instrument's spread.** These are layout measurements, not timings: `0005`'s runs
reported identical values across themes to two decimals (242.00 / 601.33), so there is no run-to-run
spread for the margins above to clear. If any measurement in this spec varies between runs, that
variance is itself a finding and is reported before the criterion is judged.

## Evidence available

| # | Claim | Source |
|---|---|---|
| E1 | The consumers of `AlertBanner` are exactly C1–C5 | `grep -rn "AlertBanner" app components lib hooks __tests__ tests`, run in this tree on branch `fix/design-taste-preflight` at `ba94c2d`; returns `salary-calculator.tsx` ×3, `journey-form.tsx` ×1, `day-summary.tsx` ×1, plus the atom and its unit test |
| E2 | The verification command runs in this tree | `pnpm exec playwright test --list tests/e2e/disclosure-legibility.spec.ts` → 48 cases enumerated across `chromium`, `Mobile Chrome`, `Mobile Safari` |
| E3 | DS3 measures 242.00px / 97 chars / 4 line boxes / 24.3 cpl at 390 and 601.33px / 48.5 cpl at 1440, identical in both themes | `.specs/0005-…/reports/legal.md` §2, G6, measured in a real browser |
| E4 | The defect is pre-existing and untouched by `0005` | `.specs/0005-…/reports/legal.md` §6.1 — identical structural path, `width = 242` in both `geometry-before.json` and `geometry-after.json` |
| E5 | DS3 discharges no `PRODUCT.md` §4 obligation | `.specs/0005-…/reports/legal.md` §6.4 |
| E6 | The 40 cpl floor is a project convention, not a norm | `.specs/0005-…/legal.md` §13 |
| E7 | The chrome is ~68px: 2px border + 32px `p-4` + 20px icon + 12px gap | `components/atoms/alert-banner.tsx:18-22`, read at `ba94c2d`; the arithmetic is confirmed against E3's 242px only at G6, in a browser |

## Disclosure obligations

**No new string, and three obligations that were already being carried unread.** This change computes
nothing, so there is nothing a real payslip would compute differently and nothing new to name. What
it does is make *existing* disclosures readable.

G2 ruled under L3 that three of the five banners discharge a `PRODUCT.md` §4 obligation on screen,
and they are now named surfaces:

| Surface | Consumer | What it discharges |
|---|---|---|
| **DS5** | C2 | "cite or omit" — it puts the 220-hour divisor for an 8h48 journey in front of the user. |
| **DS6** | C3 | "cite or omit" — it names Súmula 431 do TST and the divisor the user's journey actually implies, against the one they entered. |
| **DS7** | C5 | "cite or omit" **and** "name the gap" — CLT arts. 59, 66, 71 and §1º, Súmula 376 do TST, and the statement that suppressed rest time is owed with a 50% acréscimo (`lib/compliance.ts:47,56`), an amount this app does not compute. It is the same obligation as the footer's gap list, DS1 P3, discharged a second time at the moment the gap becomes concrete. |

The obligation that attaches to DS5, DS6 and DS7 is **LR1, LR2a, LR2b and LR3 on those surfaces** —
verified by AC3, AC4 and AC5 — **not a new string**. DS1, DS2 and DS4 remain out of scope and
protected by AC6. C1 and C4 discharge no obligation and are in scope under `PRODUCT.md` §5 only.

**The gap this spec cannot close, and must therefore say out loud:** at 390 the disclosure prose
still renders at roughly 24–32 characters per line, below the 40-cpl target, and no lever in this
spec's scope closes it (§ Decisions carried in, D-Q1). That shortfall is discharged by **reporting**
it, per surface, per theme, in `reports/qa.md` (AC11) — never by absorbing it into a passing row.

## Non-goals

What a well-meaning agent downstream might add, and must not:

- **Restyling `AlertBanner`.** Tone colours, icon set, radius, shadow, animation. Not this spec.
- **Making banners dismissible, collapsible, or moving them into a toast, a tooltip or an
  accordion.** Every one of those would make the text *less* present than it is today, which is the
  opposite of the outcome, and LR3 forbids it for any surface G2 rules a disclosure.
- **Adding a banner**, a new warning, a new compliance rule, or a new field. This spec introduces no
  user input, so there is no default to state; the § Scope table is the set of surfaces this spec
  remedies and it may only shrink. If a banner is nonetheless added by some later spec, it is ruled
  by the §2.1 cite/gap/choice test, not by its absence from that table.
- **Shrinking the disclosure type at 390 to buy characters per line.** It is the one lever that would
  close the residual, it was put to the human and declined, and it would trade one legibility defect
  for another on the same users (§ Decisions carried in, D-Q1).
- **Rewording a banner because it is now wider.** The measure is the defect; the words are not.
- **Fixing the measure by shortening the text.** Same reason, in the other direction — it would
  re-publish strings this spec deliberately leaves closed, and for C5 it would edit `lib/`.
- **Generalising the fix into a layout primitive, a `<Prose>` wrapper or a measure token.** The
  remedy is whatever reaches C1–C5; `refactor-scout` will read the diff at G6.
- **Extending the measure audit to surfaces the E1 search does not return.** If one is found, it
  gets its own row in `.specs/INDEX.md`, not a quiet addition to this build.

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| ~~Does LR2's 40 cpl floor bind C2–C5, whose text quotes norms?~~ **Closed at G2, run 1.** | **Not by the citation — by the §2.1 test.** C2, C3 and C5 are in the LR domain (DS5, DS6, DS7); C1 and C4 are not. LR2a binds all five as a criterion; failing it is a *compliance* failure for the first three. | `legal.md` §2, §11 L3. See § Legal dependencies, L3. |
| Does the remedy belong in the atom or in its consumers? | **Undecided — `tech-lead`'s call at G4.** | Architecture is not this gate's. The spec binds only that one remedy must reach all five consumers. |
| Do the new measurements live in `disclosure-legibility.spec.ts` or a sibling file? | **Undecided — `tech-lead`'s call at G4.** | The constraint is AC2 and AC6: the new cases must be able to fail red on the unfixed tree, and the existing 48 must stay green. |

## Decisions carried in

Settled elsewhere, binding here. None of these is reopened by a downstream gate; an agent that
disagrees routes it to the human through `tech-lead`, it does not re-decide it.

### D-Q1 — disclosure prose at 390 runs at ~24–32 characters per line, and that is accepted

**Decided by the human at G2 run 1, on the `labor-law-analyst`'s recommendation** (`legal.md` §13
Q1). At 390 the banner body renders at 14px, and 40 characters per line requires ≥363px of column
against the 358px the app's widest content column offers — so no geometry change reaches it. The two
levers were:

1. shrink the disclosure type on small viewports — a `DESIGN.md` type-ramp change; or
2. accept ~24–32 characters per line at that viewport and treat **full occupancy of the available
   column (LR2a)** as the whole of the obligation there.

**The human chose (2).** The reasoning, recorded so it is inherited rather than re-derived: shrinking
the type would trade one legibility defect for another on the same users, and 40 is a typographic
target set by this project, not a norm. The obligation at 390 is therefore discharged by LR2a and by
**reporting** the residual (AC11) — it is reported, not deferred, because the analyst proved no lever
inside this spec can close it.

**Consequences, binding:** the type ramp and `DESIGN.md` stay out of scope with no override left
(§ Out of scope); a measure value below 40 at 390 is never, on its own, a failed criterion; and the
question is closed — it does not return at G3, G6, G7 or G8.

### D-DEF — the `0005` deferral cannot be spent twice

`legal.md` §5, binding. The defect is live in production, and C2, C3 and C5 are now LR-domain
surfaces. If this spec ships with **DS5, DS6 or DS7 failing LR2a** (AC4), that is a knowing deferral
of an LR-domain defect in production and it requires the **human's written acceptance recorded in
`legal.md` §12** — the surface, the measured values, the reason and who accepted — before
`release-manager` closes G8. Not waivable by design, scope or schedule. The LR2b residual at 390 is
**not** covered by this clause (see D-Q1).

## Carried debt

Recorded here so it is inherited rather than rediscovered. **Not this spec's work**, and not a reason
to widen any gate below.

| # | Debt | Why not here | Owner |
|---|---|---|---|
| **X1** | `lib/salary-period.ts:40` and `components/organisms/salary-calculator.tsx:151` attribute a general *jornada semanal × 5* divisor rule to **Súmula 431 do TST**, whose text covers only the 40h → divisor 200 case. The divisor **numbers are correct** (220 for 44h, 200 for 40h); the citation is over-extended, which `AGENTS.md` §8 makes a defect. | Repairing it means opening a reviewed user-visible string and a `lib/` comment — both excluded here, and G2 declined to override this spec's own protection for it. The primary source was also unreachable at G2 (`legal.md` §6.1). | `product-manager`, in the next spec with scope to open `lib/salary-period.ts`. Recorded at `legal.md` §10.1 X1 and §13 Q2. |
