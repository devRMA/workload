# 0009 — Copy

> Owner: content-writer · Gate: `copy`

## Verdict — explicit no-op

**No string changes under this spec, and none may.** Zero new strings, zero edits, zero deletions.

The reason is structural, not a judgment call: `spec.md` § Out of scope forbids modifying any file
under `app/`, `components/`, `lib/` or `hooks/`, and AC6 proves it with an empty
`git diff --name-only … -- app/ components/ lib/ hooks/`. Every pt-BR string this product renders
lives in exactly those four directories. A spec that cannot write to them cannot change copy.

`legal.md` §9 confirms it from the other side: **none added, one protected** — DS1 and DS4 keep their
text byte-identical, and what this spec moves is only whether anyone is still checking that the user
can read it.

So there is no string table below, no character budget to meet, no error state to write, no
disclosure to word. What this gate owes instead is the **dependency list**: which shipped strings the
test suite currently pins verbatim, so `tech-lead` plans around them rather than into them.

## 1. The one prohibition from `legal.md` §10 — confirmed against the file

`legal.md` §10 binds this gate to exactly one thing, and it is **confirmed true today**:

| Checked | Result |
|---|---|
| `tests/e2e/disclosure-legibility.spec.ts:32` still passes a pt-BR literal to `assertLr3` | **Yes.** `await assertLr3(page, route, footer, "Tudo o que você digita fica salvo apenas neste navegador");` |
| The literal is a **verbatim substring** of DS1's shipped text | **Yes**, byte-for-byte against `components/organisms/calculator-views.tsx:73-100`, whose first `<p>` opens `Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor…`. The substring ends one character before the shipped full stop and crosses no JSX line break, so the rendered text node contains it contiguously. |
| It survives server rendering unmodified | **Yes.** `assertLr3` reads raw server HTML (`legibility.ts:73-74`) and searches with `toContain`. The substring holds no `&`, `<`, `>` or quote, so React escapes nothing inside it; the accented characters ship as UTF-8. |

**Binding, restated for `frontend-dev` and `qa-engineer`:** 56 characters, unchanged. It does not move
under `0009`. If DS1's first paragraph is ever rewritten, this marker is rewritten **in the same
commit** — a marker updated one commit late is a guard that measures the old page.

Note the failure mode is the **safe** one, which is why it is not an LG1 defect (`legal.md` §4 row 2):
a stale marker fails loudly at `toContain`, it does not silently pass. That is the opposite of A7 and
A1, and the distinction is what keeps this row a prohibition rather than a finding.

## 2. Every shipped string a test currently depends on verbatim

Scope of this sweep: the six files AC4 permits, plus `tests/e2e/support/legibility.ts` — the file
`legal.md` F2/F5 may route into if `tech-lead` widens AC4. **"Load-bearing"** means the test reads the
string out of rendered output or shipped metadata, so editing the shipped string turns the test red.
A literal passed **into** a render as a prop is a **fixture**: it is a test-local value that happens to
read like product copy, and changing the product's copy does not touch it.

### 2.1 Load-bearing — the shipped string and the test move together

| Test site | Literal | Chars | Shipped at | How it binds |
|---|---|---|---|---|
| `tests/e2e/disclosure-legibility.spec.ts:32` | `Tudo o que você digita fica salvo apenas neste navegador` | 56 | `components/organisms/calculator-views.tsx:75-76` (DS1 ¶1) | `assertLr3` → `toContain` over server HTML. **`legal.md` §10's prohibition.** |
| `tests/e2e/disclosure-legibility.spec.ts:72` | `Telemetria (Google Analytics)` | 29 | `components/organisms/cookie-consent.tsx:123-125` | Accessible name of the `switch`. Also the DS4 paragraph that names **which purpose** the consent governs (`legal.md` §9, LGPD art. 8º §4º). |
| `tests/e2e/disclosure-legibility.spec.ts:73` | `Salvar Preferências` | 19 | `cookie-consent.tsx:152` | Accessible name of the save `button`. |
| `tests/e2e/disclosure-legibility.spec.ts:74` | `Fechar configurações de privacidade` | 35 | `cookie-consent.tsx:91` (`aria-label`) | Accessible name of the close `button`. |
| `tests/e2e/support/legibility.ts:102` | `Configurar` | 10 | `cookie-consent.tsx:66` (consent banner action) | `openPrivacySettings` clicks it. **Every DS4 case in the suite is gated on this one word** — rename it and all eight DS4 cases fail at the click, before any legibility assertion runs. |
| `__tests__/layout.test.tsx:40` | `WorkLoad \| Calculadora Inteligente de Horas e Salário` | 53 | `app/layout.tsx:21` | `toEqual` on `metadata.title` — **exact equality**, not `toContain`. |
| `__tests__/layout.test.tsx:44` | `Calcule sua jornada de trabalho, horas extras, adicional noturno e salário CLT de forma simples, rápida e precisa.` | 114 | `app/layout.tsx:25` | `toBe` on `metadata.description` — **exact equality**. |
| `__tests__/day-summary.test.tsx` (21 sites) | `Seu Dia` :59 · `Manhã` :60,79,97 · `Almoço` :62,80 · `Tarde` :63,81 · `Trabalhado no dia` :65 · `Trabalhado até agora` :118 · `Hora noturna reduzida` :123,127 · `Ainda falta` :133,138 · `Saldo do dia` :134 · `Saldo se você sair no horário` :139 · `Extra 50%` :160 · `Extra 100%` :162 · `Adicional noturno 20%` :171 · `DSR sobre os extras` :179,195 · `/Súmula 172 do TST/` :180,187 · `/Feriados não entram/` :181 | — | `components/organisms/day-summary.tsx` | `getByText` / `queryByText` / `getByRole({name})` over rendered output. **This is the file `0009` edits most**, and every one of these is untouched by A1's fix at `:96`. |
| `__tests__/day-summary.test.tsx:153` | `/Calcule o valor da sua hora/` | — | `day-summary.tsx` (link to `/custo-da-hora`) | `getByRole("link", { name: … })`, regex — tolerates surrounding text, not a rewording. |

`__tests__/hero-panel.test.tsx`, `__tests__/modal-dialog.test.tsx` and `__tests__/alert-banner.test.tsx`
— three of AC4's six files — contain **no load-bearing shipped string at all**. Everything pt-BR in
them is §2.2.

### 2.2 Fixtures — pt-BR that looks load-bearing and is not

Listed because the resemblance is the trap. Each is a prop value the test supplies; the identical
shipped string can be rewritten without touching the test, and vice versa.

| Test site | Literal | Why it is a fixture |
|---|---|---|
| `__tests__/alert-banner.test.tsx:8,10,14,16,22,27,31,38,46,51,59,65,66,71` | `Confira seus horários`, `Atenção`, `A saída precisa vir depois da volta do almoço.` | Passed as `title` / children into `<AlertBanner>`. The first two ship in `journey-form.tsx`, the third in `lib/journey.ts`; the coincidence is realism in the fixture, not a dependency. **A6's edit is confined to the `mb-6` sentinel on lines 51 and 54 (AC4) and reaches none of these.** |
| `__tests__/hero-panel.test.tsx:56,63` | `Valor por mês`, `Sem carga horária` | Props into `<HeroPanel>`. `Sem carga horária` also ships in `salary-calculator.tsx`; `Valor por mês` ships nowhere. |
| `__tests__/modal-dialog.test.tsx:27,38,83` | `Título`, `Ação` | Props. Ship nowhere — placeholder fixtures. |
| `__tests__/day-summary.test.tsx:201,206` | `Você passou de 2h extras hoje` | Supplied inside the `warnings` array the test builds. The real string lives in `lib/compliance.ts`; the test proves `DaySummary` renders **whatever warning it is handed**, which is the better assertion. |
| `__tests__/day-summary.test.tsx:60-64,116-117,128,144,147,161,163,164,172,173` | `08:00 → 12:00`, `+0h 51m`, `-0h 30m`, `/30,00/`, `/21,82/` … | Formatter output over fixture inputs. Not copy — `product-designer` and `lib/` own the format. |

### 2.3 Outside AC4's file set

`tests/e2e/support/legibility.ts:163` reads `Hora para Saída Real` (20 chars), composed at
`components/molecules/date-time-input.tsx:90` as `` `Hora para ${label}` `` over the shipped label
`Saída Real` — a **two-file** dependency, and the only one in this sweep where the test literal exists
verbatim in no single source file. `:162` pins `MANUAL` (`journey-form.tsx`). Both belong to
`driveC5`, which `disclosure-legibility.spec.ts` never calls; they matter only if `tech-lead` widens
AC4 for F2/F5, and neither moves under `0009` either way (`legal.md` § Out of scope).

The rest of `__tests__/` and `tests/` pins shipped pt-BR far more widely — `journey-form.test.tsx`,
`work-calculator.test.tsx`, `journey.test.ts`, `calculator-views.test.tsx`, `extra-entry-*`,
`copy-guards.test.ts`, `opengraph-image.test.ts`. None is in AC4's set, none is touched here, and
enumerating them would hand the plan a list it cannot act on. Command, if a later gate needs it:
`grep -rnoP '"[^"]*[À-ÿ][^"]*"' __tests__/ tests/`.

## 3. What this means for the plan

1. **No copy task exists.** Nothing in `plan.md` needs a `content-writer` step, and `frontend-dev`
   needs no string from this gate.
2. **`disclosure-legibility.spec.ts:32` and `:72-74` are byte-identical after the fix.** F3's remedy
   changes the DS4 **selector** at `:60`, not the accessible names at `:72-74` — those already select
   by role and name, which is the obligation-derived form `legal.md` LG1.1 asks for.
3. **The DS4 count of 5 and the DS1 count of 4 are counts of `<p>` elements, not of strings.** Do not
   derive them from this document. `legal.md` §3.4 binds the rendered count to overrule both, and
   `legal.md` §10 tells `frontend-dev` to stop and route a mismatch rather than write the number that
   turns the run green.
4. **If any gate downstream finds a shipped string wrong**, it is a finding routed to `tech-lead` with
   its own spec (`spec.md` § Out of scope, bullet 1). It is never fixed here — AC6 is what makes the
   difference between a test that was repaired and a test that was made to pass legible in the diff.

## 4. Voice notes

None. No string ships, so there is no tone to set.

## 5. Error and empty states

None. This spec renders nothing and introduces no user-facing input (`spec.md` § Inputs and defaults),
so there is no way for a user to reach a state that needs wording. The failure states `0009` does
create are **test failures**, read by an agent at G5/G6, and their wording is English per
`AGENTS.md` §8 — `tech-lead`'s and `frontend-dev`'s, not this gate's.

## 6. Disclosures

**None added** (`legal.md` §9). Two protected, both unchanged in text:

| Disclosure | Text | This gate's obligation |
|---|---|---|
| **DS1** — the legal footer's four paragraphs | `calculator-views.tsx:73-100`, byte-identical | The marker at `:32` tracks ¶1. §1. |
| **DS4** — the privacy panel's five paragraphs | `cookie-consent.tsx:110-126`, byte-identical | Two of them name the consent purposes; `Telemetria (Google Analytics)` is both a DS4 paragraph and a pinned accessible name. §2.1. |

## 7. Numbers and units

No number is formatted, rendered or moved by this spec. The competence year keeps its existing
placement in DS1 ¶4 — `Tabelas de INSS e IRRF de {CURRENT_LEGAL_YEAR.year}, em vigor desde …` — read
from `lib/` at render time and untouched by AC6's empty diff.

## 8. Metadata

Unchanged: `app/layout.tsx` and `app/manifest.ts` are both outside AC4's permitted file set and inside
AC6's zero-diff. Recorded here only because `__tests__/layout.test.tsx` — which **is** in AC4's set —
pins the title and description by exact equality (§2.1), so the plan should know that an incidental
metadata edit would surface there as a red test rather than as a copy review.

> `legal.md` §7 **F1** is a live coverage gap on this gate's territory and is **not** fixed here: the
> descriptor prohibitions in `__tests__/copy-guards.test.ts:6-12` guard five enumerated files and miss
> `app/custo-da-hora/page.tsx`, `app/layout.tsx` and `app/manifest.ts`. No shipped descriptor violates
> a non-claim today (measured, `legal.md` §7). The next `content-writer` who edits any descriptor on
> those three surfaces is editing **unguarded** text — the *banco de horas* non-claim (`PRODUCT.md` §9)
> will not stop them. Routed as Q1 to the human.

## Rejected phrasings

None — no phrasing was written.

## Parity check

The template's three checkboxes assume a `locales/en.ts` + `locales/pt-BR.ts` pair. **This project
has no i18n layer and none is planned** (`AGENTS.md` §1, `PRODUCT.md` §7); strings are written
directly into the components. The section is answered in the form that applies here:

- [x] **pt-BR only, fully accented.** Nothing new is written; every literal quoted above is reproduced
      byte-for-byte from the file that ships it, accents included.
- [x] **Every factual claim traced.** §1 → `legal.md` §4 row 2 and §10. §6 → `legal.md` §9. The
      *banco de horas* note in §8 → `legal.md` §7 F1. **No claim is made outside `PRODUCT.md` §9**,
      because no claim is made at all.
- [x] **No string changes, so no claim is re-endorsed** (lesson **002**'s test: a rewrite re-endorses
      every claim it preserves — there is no rewrite).
