# PRODUCT.md

What WorkLoad is for, who it serves, and what it may claim. This document outranks any agent's judgment about scope. When a spec and this file disagree, this file wins until a human changes it.

---

## 1. The user

A Brazilian worker under the CLT, on a phone, usually standing.

They are not trying to learn labor law. They have one of three questions, and they want the answer in under ten seconds:

1. **"A que horas eu posso sair?"** — I clocked in at 08:12, took an hour for lunch, my journey is 8h. When am I free?
2. **"Quanto de hora extra eu já tenho?"** — and is it being paid at the right rate, with the night premium I am owed?
3. **"Quanto cai na minha conta?"** — my gross is X. After INSS, IRRF, dependents and deductions, what is left?

Secondary users, same product: the **servidor público** (estatutário, RPPS ladder instead of the RGPS table) and the **empregado público**.

Who this is **not** for: an HR department, a payroll bureau, an accountant closing a folha. Those users need audit trails, per-employee records and integrations. Building for them would make the product worse for the person standing at the time clock.

---

## 2. Positioning

For a Brazilian CLT worker who needs to know their hours and their money **right now**, WorkLoad is a free, offline, phone-first calculator that shows the number *and the law it came from*.

Unlike the overtime calculators that already rank for these searches, it names the table it used, the year that table took effect, and what it deliberately did not compute.

---

## 3. Operating context

- **Where it runs:** a phone browser, often on mobile data, often at the moment the user is clocking out. Cold load matters more than any subsequent interaction.
- **Who maintains it:** one person, with an AI squad. Every yearly table change must be a one-file diff.
- **What it depends on:** nothing at runtime. No API, no database, no auth. `localStorage` is the only persistence.
- **What changes underneath it:** Brazilian tax tables change at least yearly; labor-law interpretation (TST súmulas) changes slowly but does change. The architecture treats the legal tables as versioned data, not as constants.
- **How it is funded:** AdSense, behind consent. See §8.

---

## 4. The promise

**Every number WorkLoad shows can be traced to a Brazilian norm in force, and WorkLoad says so.**

That is the whole positioning. There are dozens of overtime calculators in Portuguese. Almost none of them tell you which table they used, which year it is from, or what they left out. WorkLoad does all three.

Three commitments follow from it:

- **Cite or omit.** A number the app cannot trace to a cited table does not ship. Not as an estimate, not as a "aproximadamente".
- **Name the gap.** Where the calculation omits a variable a real payslip includes — a convenção coletiva with a better overtime rate, a benefit, a judicial deduction — the app says so, visibly, next to the number.
- **The year is part of the answer.** Tax tables change. The app names the table it used and when it took effect.

---

## 5. Product principles

**Clarity over completeness.** Every field added costs the user attention before it earns them accuracy. A calculator that needs fourteen inputs to be right is a calculator nobody finishes.

**The default is the common case.** CLT, 44h weekly, 50% overtime floor, one dependent-free salary. Everything else is a step the user takes deliberately, not a form they have to disarm.

**Real time, not a submit button.** The answer updates as the user types. There is no "Calcular" button to press and no result screen to navigate to.

**The phone is the design target.** Desktop is the phone layout with room to breathe. Nothing is designed at 1440 and then squeezed.

**Offline and private.** Everything the user types stays in `localStorage`. No account, no backend, no upload of anyone's salary. This is not a feature to be traded away later.

**Silence is a defect.** If the app cannot answer — an impossible time range, a journey that violates the 11h interregno, an input it does not understand — it says what is wrong and what to do, in plain Portuguese.

---

## 6. What ships today

- **Jornada** — entry, lunch out/in, exit projection, live elapsed time, overtime accrual.
- **Adicional noturno** — CLT art. 73: the 20% premium and the 52min30s reduced hour, between 22:00 and 05:00.
- **Horas extras** — configurable rates, defaulting to the statutory floor of 50% / 100%.
- **Limites da CLT** — warnings when the journey crosses a legal threshold.
- **Regimes** — CLT, Empregado Público (RGPS with its ceiling) and Estatutário (federal RPPS ladder, 7.5%–22%, uncapped).
- **Salário líquido** — INSS, IRRF, dependents, deductions, extra gains.
- **Qualquer período** — the same pay expressed per hour, day, week, month or year.
- **Dark and light**, both first-class.

---

## 7. What WorkLoad will not do

Recorded so no agent proposes them as improvements:

- **No account, no sync, no cloud.** See "offline and private".
- **No timesheet history or ponto eletrônico.** The moment it stores a month of records it becomes a compliance system with a compliance system's obligations.
- **No employer-side features.** No multi-employee, no export for folha, no integrations.
- **No legal advice.** It computes and cites. It does not tell anyone what to do about a result.
- **No English.** pt-BR only. Brazilian labor law is the entire domain; an English UI serves nobody who needs it.
- **No convenção coletiva database.** It cannot be kept accurate, and an inaccurate one is worse than the disclaimer that replaces it.

---

## 8. Monetization

AdSense, behind cookie consent, in reserved slots that do not shift layout. Ads never sit between the user and an answer, never interrupt a calculation, and never occupy the space where a result appears.

If an ad placement measurably hurts the ten-second path to an answer, the placement loses.

---

## 9. Evidence on hand

What the product can actually back up today, and therefore what it may claim:

| Claim | Evidence |
|---|---|
| The 2026 INSS/RGPS and federal RPPS tables are correct | Portaria Interministerial MPS/MF nº 13, de 09/01/2026 — verified bracket by bracket against `lib/legal-tables.ts` |
| The 2026 IRRF table and the simplified deduction are correct | Lei 15.270/2025; the reduction applies to gross income, which most generic calculators get wrong |
| The night-shift reduced hour is correct | CLT art. 73 §1º — 52min30s, window 22:00–05:00 |
| 100% unit coverage | `vitest.config.ts` fails the run below the threshold; it is enforced, not asserted |
| Works at 390 / 1440 / 2560 / 3840 | Playwright asserts no horizontal overflow and no control off-viewport at each |

Anything not in this table is not a claim the product may make, in the UI or in the README.

---

## 10. How we know it is working

- The three questions in §1 are each answerable in under ten seconds on a phone, from a cold load.
- Every number on screen traces to a cited table, verified at the legal gate.
- 100% unit coverage, zero serious axe violations in both themes, Lighthouse budgets green.
- No horizontal scroll and no control off-viewport at 390, 1440, 2560 and 3840.
