# 0007 — Implementation plan

> Owner: tech-lead · Gate: `plan` · **Run 1**
>
> Binding inputs, in the order they were read: `AGENTS.md` (§4, §5, §8, §9), `.agents/memory/LESSONS.md`
> (**014, 016, 017, 020, 022, 026, 027, 030, 032, 040, 046** opened in full), `STATUS.md`,
> **`legal.md` § *Run 3*, § *Run 3 — addendum A* and § *Run 3 — addendum A, correction 1***,
> **`design.md` run 1 §§ 1–13 and run 2 §§ 14–15**, **`copy.md` run 2**, `spec.md` run 2, and the
> working tree at `5c0c6fa` + the uncommitted `.agents/` changes.
>
> **The numbers this plan is built on are `design.md` § 15.3–15.6's measurements.** Addendum A's three
> projections (slot ≈ 95 px, return −42 px, +95/+53) are **withdrawn** by § *Run 3 — addendum A,
> correction 1* § 3 and appear nowhere below. Binding: slot **129.0 px** at 390, banner return
> **−134.0 px** at 390 / **−71.0** at 1440, net **+129.0 px** on R1, R2 and Silêncio and **−5.0 px** on
> R3 and R4. **Two states change sign; this is not a uniform surcharge.**
>
> **Clause 2 of addendum A is replaced in full by 2a–2d.** Reading order is the **visual box order
> sorted on `getBoundingClientRect().top`, ties broken on `left` — never DOM position.** That quantity
> is unreadable in jsdom, so it is asserted in a real browser (**T6**), never in a vitest file.
>
> **No comment is written into any file this plan touches except the norm citations in
> `lib/salary-period.ts`**, which are the one exemption `AGENTS.md` §8 and
> `__tests__/comment-free-code.test.ts` allow, and every one of them is given verbatim below.

---

## Architecture

### The shape of the change, in one paragraph

The defect is an **operand**, not a string. `lib/salary-period.ts` asserts `WORK_DAYS_PER_WEEK = 5`
about every user and multiplies it by `WEEKS_IN_DIVISOR = 5`, then a component attributes the result
to Súmula 431. The repair collects the operand (H2), moves the whole rule into one `lib/` function
that returns a **discriminated union naming the surface to render**, and leaves the component doing
nothing but choosing a banner and interpolating three values. Every threshold, every rounding step,
every norm-selection branch lives in `lib/salary-period.ts` behind the 100% bar; every pt-BR word
lives in `components/organisms/salary-calculator.tsx`, where `__tests__/copy-guards.test.ts` reads it.

### Data flow

```
localStorage("workDaysPerWeek")                       lib/storage.ts        (new key)
        │
        ▼
hooks/use-salary-calculator.ts                        workDaysPerWeek: number, setWorkDaysPerWeek
        │  (0 means "cleared", exactly the monthlyHours idiom at :109-110)
        ├──────────────► lib/salary-period.ts  amountForPeriod(..., workDaysPerWeek)   ← N1 / AC8
        │
        ▼
components/organisms/salary-calculator.tsx
        │
        ├── checkDivisor({ dailyMinutes, workDaysPerWeek, declaredMonthlyHours })  ← lib/salary-period.ts
        │        returns DivisorCheck — eight kinds, mutually exclusive, precedence fixed in lib
        │
        ├── <DivisorSurface check={...} />   one AlertBanner or null   (design.md § 4, four states + silence)
        └── <p id="divisor-disclosure">      D4, unconditional          (design.md § 15.1)
```

**Nothing about the money changes.** `legal.md` step 6 is already satisfied by `amountForPeriod`:
the salário-hora is `monthlyAmount ÷ declared monthlyHours` and every period figure is derived from
the **unrounded** hourly. The divisor is a *check* on the declared carga and is never its denominator.
The only edit to `amountForPeriod` is the `week` case's day count.

### Which `lib/` module changes, and why

| Module | Change | Why here and not elsewhere |
|---|---|---|
| `lib/salary-period.ts` | Replace `WORK_DAYS_PER_WEEK` / `WEEKS_IN_DIVISOR` / `findDivisorMismatch` / the Súmula 431 comment with the norm-cited constants of `legal.md` § *Run 3 — the constants* and one `checkDivisor` function returning `DivisorCheck`. `DEFAULT_MONTHLY_HOURS` lands here. `amountForPeriod` gains the day count | `AGENTS.md` §8 — every CLT threshold and every rounding rule lives in `lib/`. It is already the module that owns the divisor and the period arithmetic |
| `lib/duration.ts` | Add `formatCompactDuration(minutes)` → `8h48`, `12h00` | `copy.md` § *Numbers* mandates `{h}h{mm}` inside prose and forbids the `08:48` input form there. `formatHoursAndMinutes` renders `8h 48m` and `formatPaddedDuration` renders `08:48`; neither is the mandated form. It is a duration renderer and `lib/duration.ts` owns those |
| `lib/utils.ts` | Add `formatHours(value)` → `60`, `52,8`, `36,67` | `{semanais}` renders **without trailing zeros** in the delivered strings — see § *Dependency and formatter decisions* |
| `lib/storage.ts` | Add `WORK_DAYS_PER_WEEK_KEY = "workDaysPerWeek"` | Every persisted key on this tab is declared there |
| `lib/weekly-rest.ts` | **Untouched.** N2/F8 are routed, not repaired (`spec.md` § *Out of scope*; `legal.md` § *Run 3 — L9*) | — |
| `lib/compliance.ts` | **Untouched.** F3 belongs to `0003` | — |

### The hook boundary

`hooks/use-salary-calculator.ts` gains exactly one piece of state, persisted and restored like every
other input on this tab. **It computes nothing**: it does not call `checkDivisor`, does not know what
a divisor is, and does not clamp the day count. Clamping in the hook would make the out-of-domain
banners unreachable, which is the defect `legal.md` R6 exists to surface.

### Component tree — atomic levels

| # | Element | Level | Status | Path |
|---|---|---|---|---|
| 1 | Operand pair wrapper (`grid grid-cols-2 gap-3`) | markup inside the organism | **new markup, no new file** | `components/organisms/salary-calculator.tsx` |
| 2 | *Dias Trabalhados* field | molecule | **reuse** | `components/molecules/field.tsx` |
| 3 | its control | atom | **reuse** | `components/atoms/input.tsx` |
| 4 | its leading icon | atom | **reuse (library)** | `IconCalendarWeek` from `@tabler/icons-react` |
| 5 | *Jornada Diária* field | molecule | **reuse, unchanged** | `components/molecules/duration-field.tsx` |
| 6 | Divisor surface, all four states | atom | **reuse, no change to the atom** | `components/atoms/alert-banner.tsx` |
| 7 | `DivisorSurface`, `DivisorSentence`, `DailyJourney`, `WeekDays` | functions inside the organism | **new, no new file** | `components/organisms/salary-calculator.tsx` |
| 8 | D4 slot | a `<p>` inside the organism | **new markup, no new file** | `components/organisms/salary-calculator.tsx` |
| 9 | Hero, period selector, stat tiles, tax panel, page shell | organism / molecule / atom / template | **untouched** | `hero-panel.tsx`, `period-selector.tsx`, `stat-box.tsx`, `tax-details-panel.tsx`, `calculator-layout.tsx` |

**No new component file, no new atom, no new molecule, no new token, no `DESIGN.md` change**
(`design.md` §§ 3, 12, 15.9).

### Three DOM ids are added, and they are load-bearing

`AGENTS.md` §8 forbids asserting a Tailwind class string, and clause 2b/2c must be measured on real
boxes. Ids are the class-free handle that makes both possible, and one of them is required by
`design.md` § 10 anyway.

| Id | On | Needed by |
|---|---|---|
| `salary-panel` | the Salário card `div` (`salary-calculator.tsx:77`) | 2b — D4's parent, and the figure is outside it |
| `salary-fields` | the field grid `div` (`:91`) | 2c — D4 is the immediate next box after the grid |
| `divisor-disclosure` | the D4 `<p>` | 2a, 2b, 2c, 2d |
| `divisor-alert` | the divisor `AlertBanner`, in all four states | `design.md` § 10 — R1's `aria-describedby`; and 2c's ordering assertion |

### Dependency and formatter decisions

| Need | Decision | Justification |
|---|---|---|
| A calendar icon for the new field | **`IconCalendarWeek` from `@tabler/icons-react`** | Already a dependency and already this repository's icon library (`__tests__/copy-guards.test.ts:86` forbids the retired one). Verified present in the installed package. Unused elsewhere in the tree, so `DESIGN.md`'s One-Idea-One-Icon rule holds |
| Any new npm package | **None.** | Nothing below needs one |
| Rendering `{divisor}` and `{carga}` | **`formatCurrencySimple` from `lib/utils.ts:59`** (`AMOUNT_FORMATTER`, `pt-BR`, 2 decimals) | `legal.md` § *Run 3 — rounding*: the comma is mandatory, at most two decimals, and **no new formatter may be added for the divisor**. `220,00` / `183,33`. Confirmed against `copy.md`'s own character counts: `A-3` = **108** and `B-2` = **136** only with `220,00` and `183,33`; with `220` they are 105 and 133 |
| Rendering `{semanais}` | **New `formatHours` in `lib/utils.ts`** — `new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 })` | The delivered refusal strings render **`60`** and **`52,8`**, not `60,00` and `52,80`: `C-1` = **216** and `C-2` = **224** are reproduced exactly by the trailing-zero-free form and are 219 / 225 with `AMOUNT_FORMATTER`. `legal.md`'s prohibition is scoped to *the divisor*; `{semanais}` is a different quantity, and it renders only in the two states where **no divisor exists**. The new formatter stays inside legal's two binding clauses: pt-BR comma, never more than two decimals |
| Rendering `{jornada}` | **New `formatCompactDuration` in `lib/duration.ts`** | `copy.md` § *Numbers*: always `{h}h{mm}`, minutes two digits, hours unpadded; *"Never `08:48` inside a sentence"*. Confirmed by the same counts: `8h48` (4 chars) is what makes `A-3` 108 |

### Test strategy, against the bars of `AGENTS.md` §9

- **`lib/**` and `hooks/**` at 100% statements/branches/functions/lines.** `checkDivisor` has eight
  outcomes and every one is reached by a named row below. This is where the money and the hours are.
- **`components/**` at 90%.** `DivisorSurface`'s eight `switch` arms are all exercised by the
  five-state table plus the two degenerate rows.
- **Queried by accessible role and name**, never by a Tailwind class. `getByRole("spinbutton", { name: "Dias Trabalhados" })`.
- **The three quantities jsdom cannot see** — visual box order, computed contrast, clipping — are
  asserted in Playwright (**T6**), per `AGENTS.md` §8's last two bullets and `legal.md` clause 2b.
- **Coverage thresholds in `vitest.config.ts` are not edited.** AC14.

---

## Tasks

Nine tasks. **`pnpm check` is green after every one of them**, which is why T2 leaves the shipped
strings in place and T4 replaces them: threading a new operand and rewriting the prose are two ideas,
and a task that ships both cannot be reviewed as either.

---

### T1 — Add the two renderers the divisor sentences need

- **Files:** `lib/duration.ts` (edit), `lib/utils.ts` (edit), `__tests__/duration.test.ts` (edit), `__tests__/utils.test.ts` (edit)
- **Depends on:** none
- **Reuse:** `lib/duration.ts`'s existing private `splitHoursAndMinutes` and `pad`; `lib/utils.ts`'s module-level `Intl.NumberFormat` idiom (`:43`, `:48`)
- **What to build:**

  In `lib/duration.ts`, export one function, placed immediately after `formatSignedHoursAndMinutes`:

  ```ts
  export function formatCompactDuration(minutes: number): string {
    const parts = splitHoursAndMinutes(minutes);
    return `${parts.hours}h${pad(parts.minutes)}`;
  }
  ```

  In `lib/utils.ts`, add the formatter beside `AMOUNT_FORMATTER` and the function beside
  `formatCurrencySimple`:

  ```ts
  const HOURS_FORMATTER = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });
  ```
  ```ts
  export function formatHours(value: number): string {
    return HOURS_FORMATTER.format(value);
  }
  ```

  **No comment anywhere in this task.** Nothing here cites a norm.

- **Tests:**
  - `__tests__/duration.test.ts` — a new `describe("formatCompactDuration")` with four cases:
    `528 → "8h48"`, `720 → "12h00"`, `440 → "7h20"`, `480 → "8h00"`. These are the four jornadas the
    delivered strings are counted at (`copy.md` § *Numbers*).
  - `__tests__/utils.test.ts` — a new `describe("formatHours")` with three cases, each named for the
    state it renders in: `60 → "60"` (E5, `12h00 × 5`), `8.8 * 6 → "52,8"` (R7a, and it proves the
    float tail `52.800000000000004` does not reach the screen), `2200 / 60 → "36,67"` (E4's weekly
    hours). **The third case is what forbids a three-decimal render**; `legal.md` § *Run 3 — rounding*
    caps every displayed quantity at two decimals.
- **Done when:** `pnpm vitest run __tests__/duration.test.ts __tests__/utils.test.ts` green and
  `pnpm check` green. Advances **AC7** (the formatter half) and **AC14**.

---

### T2 — Move the divisor rule into `lib/salary-period.ts` and collect the operand

This is the task that closes **X1**. It replaces the two clause-C constants with the collected value
and with the norm-fixed factors of `legal.md` § *Run 3 — the constants*, and it leaves every rendered
string exactly as shipped.

- **Files:** `lib/salary-period.ts` (edit), `lib/storage.ts` (edit), `hooks/use-salary-calculator.ts` (edit), `components/organisms/salary-calculator.tsx` (edit — call sites only), `__tests__/salary-period.test.ts` (edit), `__tests__/use-salary-calculator.test.ts` (edit)
- **Depends on:** none
- **Reuse:** `minutesToHours` from `lib/duration.ts`; `readStoredNumber` from `lib/storage.ts`; the `monthlyHours` state/persistence idiom already in `hooks/use-salary-calculator.ts`
- **What to build:**

  **1. `lib/storage.ts`** — one export, beside `DAILY_MINUTES_KEY`:

  ```ts
  export const WORK_DAYS_PER_WEEK_KEY = "workDaysPerWeek";
  ```

  **2. `lib/salary-period.ts`** — delete `WORK_DAYS_PER_WEEK`, `WEEKS_IN_DIVISOR`,
  `coherentMonthlyHours`, `findDivisorMismatch` **and the comment at `:40`**. Replace the constant
  block with the following, **verbatim, comments included**. Every comment cites a Brazilian norm and
  is inside `lib/`, which is the one exemption `__tests__/comment-free-code.test.ts` allows; each
  matches its `NORM_CITATION` regex, and none contains `—` or `–`
  (`__tests__/copy-guards.test.ts:79`).

  ```ts
  // CLT art. 64, caput: "por 30 (trinta) vezes o número de horas dessa duração"; Lei 605/1949, art. 7º, §2º.
  export const PAID_DAYS_PER_MONTH = 30;
  // CLT art. 67 e Lei 605/1949, art. 1º: repouso semanal de 24 horas consecutivas; CF art. 7º, XV.
  export const WORK_DAYS_AVAILABLE_PER_WEEK = 6;
  export const WEEKS_PER_MONTH_DIVISOR = PAID_DAYS_PER_MONTH / WORK_DAYS_AVAILABLE_PER_WEEK;
  // CF art. 7º, XIII: duração do trabalho normal não superior a quarenta e quatro horas semanais.
  export const WEEKLY_NORMAL_HOURS_CAP = 44;
  // CLT art. 59, §2º: "nem seja ultrapassado o limite máximo de dez horas diárias"; Súmula 85, I e II, do TST.
  export const DAILY_HOURS_CAP = 10;
  // Súmula 431 do TST: divisor 200 na semana de 40 horas do regime geral do art. 58, caput, da CLT.
  export const SUMULA_431_WEEKLY_HOURS = 40;
  // CF art. 7º, XIII, CLT art. 64 e Lei 605/1949, art. 7º, §2º. Não vem da Súmula 431, que fixa 200.
  export const DEFAULT_MONTHLY_HOURS = WEEKLY_NORMAL_HOURS_CAP * WEEKS_PER_MONTH_DIVISOR;
  // CLT art. 64, parágrafo único: o operando são os dias de trabalho por semana; CLT art. 67 limita a seis.
  export const MIN_WORK_DAYS_PER_WEEK = 1;
  export const MAX_WORK_DAYS_PER_WEEK = WORK_DAYS_AVAILABLE_PER_WEEK;
  // Nenhuma norma da CLT fixa tolerância sobre um divisor: este valor é uma escolha de produto.
  const DIVISOR_TOLERANCE_HOURS = 1;
  ```

  **`WEEKS_PER_MONTH_DIVISOR` is derived, never written as `5`.** `legal.md` R6 fixes it as `30 ÷ 6`
  and states in terms that *"it is not the number of weeks in a month"*; a literal `5` re-creates the
  false mechanism lesson **046** is about. `DEFAULT_MONTHLY_HOURS` is derived as `44 × 5` for the same
  reason and **its value does not change** (AC9: it is 220).

  `PAID_MONTHS_PER_YEAR = 13` stays exactly as it is.

  Then the rule itself:

  ```ts
  export type DivisorNorm = "sumula-431" | "clt-64-caput" | "clt-64-sole-paragraph";

  export type DivisorCheck =
    | { kind: "no-week-days" }
    | { kind: "too-many-week-days" }
    | { kind: "daily-cap-exceeded"; weeklyHours: number }
    | { kind: "weekly-cap-exceeded"; weeklyHours: number }
    | { kind: "workload-missing-without-week" }
    | { kind: "workload-missing"; divisor: number; norm: DivisorNorm }
    | { kind: "workload-mismatch"; divisor: number; norm: DivisorNorm }
    | { kind: "silent" };

  export interface DivisorInput {
    dailyMinutes: number;
    workDaysPerWeek: number;
    declaredMonthlyHours: number;
  }

  export function checkDivisor({ dailyMinutes, workDaysPerWeek, declaredMonthlyHours }: DivisorInput): DivisorCheck {
    if (!Number.isInteger(workDaysPerWeek) || workDaysPerWeek < MIN_WORK_DAYS_PER_WEEK) {
      return { kind: "no-week-days" };
    }
    if (workDaysPerWeek > MAX_WORK_DAYS_PER_WEEK) return { kind: "too-many-week-days" };
    if (dailyMinutes <= 0) {
      return declaredMonthlyHours > 0 ? { kind: "silent" } : { kind: "workload-missing-without-week" };
    }

    const weeklyHours = minutesToHours(dailyMinutes * workDaysPerWeek);
    if (minutesToHours(dailyMinutes) > DAILY_HOURS_CAP) return { kind: "daily-cap-exceeded", weeklyHours };
    if (weeklyHours > WEEKLY_NORMAL_HOURS_CAP) return { kind: "weekly-cap-exceeded", weeklyHours };

    const divisor = Math.round(weeklyHours * WEEKS_PER_MONTH_DIVISOR * 100) / 100;
    const norm: DivisorNorm =
      weeklyHours === SUMULA_431_WEEKLY_HOURS
        ? "sumula-431"
        : workDaysPerWeek === WORK_DAYS_AVAILABLE_PER_WEEK
          ? "clt-64-caput"
          : "clt-64-sole-paragraph";

    if (declaredMonthlyHours <= 0) return { kind: "workload-missing", divisor, norm };
    if (Math.abs(declaredMonthlyHours - divisor) >= DIVISOR_TOLERANCE_HOURS) {
      return { kind: "workload-mismatch", divisor, norm };
    }
    return { kind: "silent" };
  }
  ```

  Every clause above is `legal.md` § *Run 3 — order of operations*, in its own order, and **the
  ordering is not the developer's to change**:

  | Step | Clause | Source |
  |---|---|---|
  | 0 | domain `{1…6}`, integers only; outside it stop and render no divisor | R6 § *Domain of the collected operand* |
  | 1 | `horas semanais = jornada × dias`, computed **in minutes**, unrounded | R6 |
  | 2 | `jornada > 10 h` stops **before** `semanais > 44 h`, and both stop **before** a divisor exists | R7b then R7a; CLT art. 59 §2º; CF art. 7º XIII |
  | 3 | `divisor = horas semanais × 5`, rounded **once**, **half-up**, to **two decimals** | R6; `Math.round` on a positive value is half-up, and `legal.md` says *"what is binding is the rule, not the expression"* |
  | 4 | compare the **rounded** divisor with the declared carga; warn at `≥ DIVISOR_TOLERANCE_HOURS` | step 4, *"so the number compared is the number shown"* |
  | 5 | **Súmula 431 only at `semanais = 40`**; art. 64 **caput** at `dias = 6`; art. 64 **parágrafo único** below it. Súmula 431 wins where both would match | step 5; R1; D3 |

  **Boundaries, stated so they are not chosen:** `= 44,00 h` prices, `> 44,00 h` refuses; `= 10,00 h`
  prices, `> 10,00 h` refuses. Both comparisons read the exact minute product before any rounding.

  `amountForPeriod` gains the day count as a fifth positional parameter and uses it in the `week` case
  only:

  ```ts
  export function amountForPeriod(
    monthlyAmount: number,
    period: SalaryPeriod,
    monthlyHours: number,
    dailyHours: number,
    workDaysPerWeek: number,
  ): number {
  ```
  ```ts
      case "week":
        return hourlyAmount * dailyHours * workDaysPerWeek;
  ```

  **Nothing else in `amountForPeriod` moves.** `legal.md` E3's chaining trap is already prevented by
  the fact that every case derives from the unrounded `hourlyAmount`; keep it that way.

  **3. `hooks/use-salary-calculator.ts`** — delete the local `const DEFAULT_MONTHLY_HOURS = 220;` and
  import it from `@/lib/salary-period`. Add, beside `DEFAULT_DAILY_MINUTES`:

  ```ts
  const DEFAULT_WORK_DAYS_PER_WEEK = 5;
  ```

  **It stays in the hook and does not move to `lib/`.** `legal.md` § *Run 3 — L11*: *"no norm sets a
  default number of working days, and none could"*. A `5` sitting in `lib/salary-period.ts` beside the
  norm-cited constants would read as one of them.

  Add `workDaysPerWeek` to `STORAGE_KEYS` (`workDaysPerWeek: WORK_DAYS_PER_WEEK_KEY`), one
  `useState(DEFAULT_WORK_DAYS_PER_WEEK)`, one line in the restore effect
  (`setWorkDaysPerWeek(readStoredNumber(STORAGE_KEYS.workDaysPerWeek, DEFAULT_WORK_DAYS_PER_WEEK))`),
  one line in the persist effect
  (`localStorage.setItem(STORAGE_KEYS.workDaysPerWeek, workDaysPerWeek.toString())`),
  `workDaysPerWeek` in the `stats` `useMemo` dependency array, the fifth argument to `amountForPeriod`,
  and `workDaysPerWeek` / `setWorkDaysPerWeek` on the returned object.

  **The cleared field persists as `0` and is restored as `0`.** `readStoredNumber` returns its
  fallback only for a missing or blank entry; `"0"` parses, so a user who clears the field does not
  find a silent `5` on reload. That is `design.md` § 6.1's *empty* row and `legal.md` L11's rule that
  the silent assertion may not exist in any state. **The hook does not clamp**; the domain bound is
  `checkDivisor`'s.

  **4. `components/organisms/salary-calculator.tsx`** — call sites only, **no string and no markup
  changes in this task**:
  - pull `workDaysPerWeek` out of `useSalaryCalculator()` (the setter is wired in T3);
  - replace `const coherentMonthlyHours = findDivisorMismatch(monthlyHours, minutesToHours(dailyMinutes));`
    with `const divisorCheck = checkDivisor({ dailyMinutes, workDaysPerWeek, declaredMonthlyHours: monthlyHours });`;
  - change the mismatch banner's condition from `coherentMonthlyHours === null ? null : (…)` to
    `divisorCheck.kind === "workload-mismatch" ? (…) : null` and interpolate `divisorCheck.divisor`
    where `{coherentMonthlyHours}` was;
  - leave `hasMonthlyHours`, both banners' text and everything else exactly as shipped;
  - drop the now-unused `minutesToHours` import if nothing else uses it.

- **Tests:**
  - `__tests__/salary-period.test.ts` — rewrite around three groups.

    **(a) The constants, read from the constant and not from a test** (`legal.md` § *Run 3 — what G6
    will check*, item 1): `PAID_DAYS_PER_MONTH` 30, `WORK_DAYS_AVAILABLE_PER_WEEK` 6,
    `WEEKS_PER_MONTH_DIVISOR` 5, `WEEKLY_NORMAL_HOURS_CAP` 44, `DAILY_HOURS_CAP` 10,
    `SUMULA_431_WEEKLY_HOURS` 40, `DEFAULT_MONTHLY_HOURS` **220** (AC9),
    `MIN_WORK_DAYS_PER_WEEK` 1, `MAX_WORK_DAYS_PER_WEEK` 6.

    **(b) The thirteen numeric rows of `legal.md` § *The input domain, swept*, as one table-driven
    case per row.** Declare the table as a `const` array and assert `expect(ROWS).toHaveLength(13)`
    **before** iterating — a loop over an empty array passes and carries no record of its sample
    (`AGENTS.md` §5). `declaredMonthlyHours` is `0` for the pricing rows so the expected kind is
    `workload-missing` and the divisor is readable.

    | dailyMinutes | workDaysPerWeek | expected kind | divisor | norm |
    |---|---|---|---|---|
    | 240 | 5 | `workload-missing` | 100 | `clt-64-sole-paragraph` |
    | 360 | 5 | `workload-missing` | 150 | `clt-64-sole-paragraph` |
    | 360 | 6 | `workload-missing` | 180 | `clt-64-caput` |
    | 440 | 5 | `workload-missing` | **183.33** | `clt-64-sole-paragraph` |
    | 440 | 6 | `workload-missing` | 220 | `clt-64-caput` |
    | 480 | 5 | `workload-missing` | 200 | **`sumula-431`** |
    | 480 | 6 | `weekly-cap-exceeded` (`weeklyHours` 48) | — | — |
    | 528 | 5 | `workload-missing` | 220 | `clt-64-sole-paragraph` |
    | 528 | 6 | `weekly-cap-exceeded` (`weeklyHours` 52.8) | — | — |
    | 600 | 4 | `workload-missing` | 200 | **`sumula-431`** |
    | 720 | 3 | `daily-cap-exceeded` (`weeklyHours` 36) | — | — |
    | 720 | 5 | `daily-cap-exceeded` (`weeklyHours` 60) | — | — |
    | 528 | 7 | `too-many-week-days` | — | — |

    The fourteenth swept row — the 6 h bancário — is a **disclosure**, not an arithmetic row; it is
    asserted in T5 as D4's presence, which is where `legal.md` puts it.

    Plus the four rows the table cannot carry: `workDaysPerWeek` `0` → `no-week-days`; `5.5` →
    `no-week-days`; `-1` → `no-week-days`; `dailyMinutes` `0` with `declaredMonthlyHours` `220` →
    `silent`, and with `0` → `workload-missing-without-week`.

    **(c) Boundaries, tolerance, money.**
    - `600 / 4` prices (`= 10,00 h` diárias) and `601 / 4` is `daily-cap-exceeded`.
    - `528 / 5` prices (`= 44,00 h` semanais) and `529 / 5` is `weekly-cap-exceeded`.
    - tolerance: declared `219.5` against divisor `220` → `silent`; declared `219` → `workload-mismatch`.
    - **AC5, unmoved:** `{ dailyMinutes: 528, workDaysPerWeek: 5, declaredMonthlyHours: 220 }` → `silent`.
    - **E3 to the centavo:** `amountForPeriod(3000, "week", 220, 8.8, 5)` is `600` and **is not**
      `600.16` — assert both, because the 16 centavos are what the rule in step 6 exists to prevent.
      Assert `hour` `3000/220`, `day` `120`, `month` `3000`, `year` `39000` in the same case.
    - **E4:** `{ dailyMinutes: 440, workDaysPerWeek: 5, declaredMonthlyHours: 220 }` →
      `workload-mismatch` with `divisor` **183.33** and `norm` `clt-64-sole-paragraph`.
    - **E5:** `{ dailyMinutes: 720, workDaysPerWeek: 5, declaredMonthlyHours: 220 }` →
      `daily-cap-exceeded` with `weeklyHours` 60, **and no `divisor` field on the returned object**.
    - **AC8, the relation and not the constant:** the existing case *"counts five working days in a
      week"* is replaced by one asserting the Semana figure **follows the collected count at a day
      count other than 5** — `amountForPeriod(m, "week", h, d, 6)` is `amountForPeriod(m, "day", h, d, 6) * 6`.
    - **The identity worth pinning** (`legal.md` E3): for every `workDaysPerWeek` in `1…6`, with
      `dailyMinutes` 480 and `declaredMonthlyHours` equal to the computed divisor,
      `amountForPeriod(3000, "week", divisor, 8, days)` is `600`, i.e. `3000 ÷ 5`. Assert the loop's
      length is 6 before iterating.
  - `__tests__/use-salary-calculator.test.ts` — four cases: `workDaysPerWeek` starts at **5**; a
    stored `"6"` is restored; changing it writes `"6"` to `workDaysPerWeek` in `localStorage`;
    a stored `"0"` is restored as **`0` and not as `5`**.
- **Done when:** `pnpm vitest run __tests__/salary-period.test.ts __tests__/use-salary-calculator.test.ts`
  green; `pnpm test:coverage` reports **100% on `lib/salary-period.ts` and on `hooks/use-salary-calculator.ts`**;
  `pnpm check` green **with `__tests__/salary-calculator.test.tsx` unedited** — including its
  `:188` assertion on *"Súmula 431 do TST"*, which is still correct because this task changes no
  string. Advances **AC1**, **AC5**, **AC8**, **AC9**, **AC12**, **AC14**.

---

### T3 — Put the operand on the screen: the pair, and the `Dias Trabalhados` field

- **Files:** `components/organisms/salary-calculator.tsx` (edit), `__tests__/salary-calculator.test.tsx` (edit)
- **Depends on:** T2
- **Reuse:** `components/molecules/field.tsx`, `components/atoms/input.tsx`, `components/molecules/duration-field.tsx` — all unchanged. The *Carga Horária Mensal* block at `:102-112` is the pattern to copy: same molecule, same atom, same leading icon, same placeholder-equals-the-default idiom
- **What to build:**

  Give the card and the grid their ids, and nest the pair as the **fourth item of the existing outer
  grid** — the grid keeps four items at every width, so no new row appears at 390 and no orphan
  appears at `sm` (`design.md` § 2.2):

  ```tsx
  <div id="salary-panel" className="bg-surface rounded-xl p-6 sm:p-8 shadow-card border border-line">
  ```
  ```tsx
  <div id="salary-fields" className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
  ```

  Replace the standalone `<DurationField id="jornada-diaria" …>` at `:113-120` with:

  ```tsx
  <div className="grid grid-cols-2 gap-3">
    <DurationField
      id="jornada-diaria"
      label="Jornada Diária"
      hint="A mesma jornada diária usada na aba Jornada."
      icon={<IconSun className="w-5 h-5" aria-hidden="true" />}
      minutes={dailyMinutes}
      onMinutesChange={setDailyMinutes}
    />
    <Field id="dias-semana" label="Dias Trabalhados">
      <Input
        id="dias-semana"
        type="number"
        inputMode="numeric"
        min={1}
        max={6}
        step={1}
        icon={<IconCalendarWeek className="w-5 h-5" aria-hidden="true" />}
        placeholder="5"
        value={workDaysPerWeek || ""}
        onChange={(event) => setWorkDaysPerWeek(Number(event.target.value))}
        aria-invalid={isWeekDaysInvalid}
        aria-describedby={isWeekDaysInvalid ? DIVISOR_ALERT_ID : undefined}
      />
    </Field>
  </div>
  ```

  with, in the component body:

  ```tsx
  const isWeekDaysInvalid = divisorCheck.kind === "no-week-days" || divisorCheck.kind === "too-many-week-days";
  ```

  and, at module level beside `DETAILS_PANEL_ID`:

  ```tsx
  const DIVISOR_ALERT_ID = "divisor-alert";
  ```

  Add `IconCalendarWeek` to the existing `@tabler/icons-react` import, alphabetically.
  Add `id={DIVISOR_ALERT_ID}` to the **mismatch** `AlertBanner` (the only divisor banner that exists
  until T4) so `aria-describedby` has a target from this task forward.

  **The jornada's hint is unchanged at 44 characters.** `design.md` § 15.6 records that the whole
  +17.4 px this spec costs is that hint wrapping to two lines at the 148 px column, and that a hint of
  ≤ 19 characters would take it to 0.0 px. **It is a stated lever, not a request** — `content-writer`
  kept it at run 2 and nothing here reopens it.

  **The label is exactly `Dias Trabalhados`, 16 characters.** `copy.md` § *Rejected phrasings*
  records that `Dias por Semana` (15) **fits the column and still loses**, because it admits the
  reading *days the week has*, whose answer is 7 — the quantity `C-3` refuses. Do not shorten it.

  **No hint on this field.** `copy.md` § *The new field*: the absence is the decision, and the three
  things a hint might carry are placed where each is load-bearing.

  **No animation is added.** `design.md` § 7: every state on this surface is driven by a keystroke and
  `DESIGN.md` forbids queueing an animation on one. The field's `border-color` transition and its
  focus ring come from `components/atoms/input.tsx:18` unchanged. **No `transform` is introduced, so
  no `motion-reduce:` neutralizer is owed** — and none may be added as a bare
  `motion-reduce:transform-none` (`AGENTS.md` §8).

- **Tests:** `__tests__/salary-calculator.test.tsx`, four new cases:
  - **AC4, the field exists, is labelled and defaults to 5:**
    `expect(screen.getByRole("spinbutton", { name: "Dias Trabalhados" })).toHaveValue(5)`.
  - **AC4, changing it changes the rendered divisor:** seed `grossSalary 3000`, `monthlyHours 220`,
    `workMinutes 480`; the banner reads `200`; type `6` into the field and the banner is gone
    (`8 × 6 = 48 h` is above the cap and this task's markup renders the mismatch banner only) —
    assert `screen.queryByRole("status")` is null.
  - **AC4, it persists:** type `6`, then assert `localStorage.getItem("workDaysPerWeek")` is `"6"`.
  - **AC4, the keyboard path:** `await user.tab()` from `#jornada-diaria` reaches the new control —
    assert `document.activeElement` is the spinbutton. `design.md` § 10 fixes it as the fifth stop,
    immediately after the jornada.
- **Done when:** `pnpm vitest run __tests__/salary-calculator.test.tsx` green — **including its
  unedited `:188` assertion**, because the defaults still produce the shipped state — and
  `pnpm check` green. Advances **AC4**.

---

### T4 — The divisor surface: four states, the delivered strings, the norm restricted to its case

This is where **AC6** is discharged on the screen and where **AC10**'s red run happens.

- **Files:** `components/organisms/salary-calculator.tsx` (edit), `__tests__/salary-calculator.test.tsx` (edit), `tests/e2e/alert-legibility.spec.ts` (edit)
- **Depends on:** T1, T2, T3
- **Reuse:** `components/atoms/alert-banner.tsx` **unchanged** — its box is calibrated against `0006`'s LR2a budget and extending the atom would change it for all five consumers (`design.md` § 3); `formatCurrencySimple` and `formatHours` from `lib/utils.ts`; `formatCompactDuration` from `lib/duration.ts`
- **What to build:**

  **Order of work, and it is not optional (AC10).** Write the replacement assertions in
  `__tests__/salary-calculator.test.tsx` **first**, run them against the unfixed component, and save
  the red output to `.specs/0007-sumula-431-citation-scope/evidence/ac10-red.txt`. Then implement, and
  save the green run to `evidence/ac10-green.txt`. Both files are handed to `qa-engineer`, which
  pastes them into `reports/qa.md`; neither is committed (`AGENTS.md` §10).

  **1. Module-level constants** in `components/organisms/salary-calculator.tsx`:

  ```tsx
  const DIVISOR_NORMS: Record<DivisorNorm, string> = {
    "sumula-431": "(Súmula 431 do TST, para a semana de 40 horas)",
    "clt-64-caput": "(art. 64, caput, da CLT)",
    "clt-64-sole-paragraph": "(art. 64, parágrafo único, da CLT)",
  };

  const COLLECTIVE_AGREEMENT_DISCLOSURE =
    "Uma convenção ou acordo coletivo pode estabelecer outra jornada (art. 611-A, I, da CLT), e esta tela não tem como saber.";
  ```

  `DIVISOR_NORMS` is `D3` (`copy.md` `N-40`/`N-6`/`N-5`): **the scope word sits beside the norm name**,
  never in a sibling clause (lesson 004). `COLLECTIVE_AGREEMENT_DISCLOSURE` is `D-1`, 120 characters.

  **2. Three rendering helpers**, module level, above `SalaryCalculator`. Every quantity inside prose
  carries the `numeric` utility (`DESIGN.md` § *The Tabular Rule*, `design.md` § 4.1):

  ```tsx
  function DailyJourney({ minutes }: { minutes: number }) {
    return <span className="numeric">{formatCompactDuration(minutes)}</span>;
  }

  function WeekDays({ days }: { days: number }) {
    return (
      <>
        <span className="numeric">{days}</span> {days === 1 ? "dia" : "dias"} por semana
      </>
    );
  }
  ```

  `WeekDays` is the single home of `copy.md` § *Interpolation rules* 2 — **singular at one day**. All
  four sentences that name the day count use it; none inlines `dias` (lesson 030).

  ```tsx
  interface DivisorSentenceProps {
    dailyMinutes: number;
    workDaysPerWeek: number;
    divisor: number;
    norm: DivisorNorm;
    declaredMonthlyHours: number | null;
  }

  function DivisorSentence({
    dailyMinutes,
    workDaysPerWeek,
    divisor,
    norm,
    declaredMonthlyHours,
  }: DivisorSentenceProps) {
    return (
      <p>
        Para <DailyJourney minutes={dailyMinutes} /> por dia em <WeekDays days={workDaysPerWeek} />, o divisor é{" "}
        <span className="numeric">{formatCurrencySimple(divisor)}</span> horas por mês {DIVISOR_NORMS[norm]}.
        {declaredMonthlyHours === null ? null : (
          <>
            {" "}
            Você informou <span className="numeric">{formatCurrencySimple(declaredMonthlyHours)}</span> horas.
          </>
        )}
      </p>
    );
  }
  ```

  This one element carries **D6, D2 and D3 at once** (`copy.md` § *Disclosures*): both operands appear
  **as values** in the same sentence as the number, in every state that states one, and the norm names
  only the case its text covers. `legal.md` L11 makes it falsifiable by reading the banner's
  `textContent`. `declaredMonthlyHours` is `null` in R3 (`A-3`, 108 chars) and the declared carga in
  R4 (`B-2`, 136 chars).

  **3. `DivisorSurface`**, module level. Eight arms, one per `DivisorCheck.kind`, in this order, with
  every string verbatim:

  ```tsx
  interface DivisorSurfaceProps {
    check: DivisorCheck;
    dailyMinutes: number;
    workDaysPerWeek: number;
    declaredMonthlyHours: number;
  }

  function DivisorSurface({ check, dailyMinutes, workDaysPerWeek, declaredMonthlyHours }: DivisorSurfaceProps) {
    switch (check.kind) {
      case "no-week-days":
        return (
          <AlertBanner
            id={DIVISOR_ALERT_ID}
            icon={IconAlertTriangle}
            tone="danger"
            title="Informe os dias trabalhados por semana"
            className="mb-6"
          >
            <p>Sem eles não dá para conferir a sua carga horária mensal.</p>
          </AlertBanner>
        );
      case "too-many-week-days":
        return (
          <AlertBanner
            id={DIVISOR_ALERT_ID}
            icon={IconAlertTriangle}
            tone="danger"
            title="A semana tem um dia de descanso"
            className="mb-6"
          >
            <p>
              A lei garante 24 horas seguidas de descanso por semana (art. 67 da CLT; art. 1º da Lei 605/49), então o
              máximo aqui é 6 dias.
            </p>
          </AlertBanner>
        );
      case "daily-cap-exceeded":
        return (
          <AlertBanner
            id={DIVISOR_ALERT_ID}
            icon={IconAlertTriangle}
            tone="warning"
            title="Sem divisor acima de 10 horas por dia"
            className="mb-6"
          >
            <p>
              <DailyJourney minutes={dailyMinutes} /> por dia em <WeekDays days={workDaysPerWeek} /> dá{" "}
              <span className="numeric">{formatHours(check.weeklyHours)}</span> horas semanais. A jornada diária não
              passa de 10 horas (art. 59, §2º, da CLT). Acima disso, só a escala 12x36 do art. 59-A, que esta tela não
              calcula. Revise a jornada diária.
            </p>
          </AlertBanner>
        );
      case "weekly-cap-exceeded":
        return (
          <AlertBanner
            id={DIVISOR_ALERT_ID}
            icon={IconAlertTriangle}
            tone="warning"
            title="Sem divisor para esta semana"
            className="mb-6"
          >
            <p>
              <DailyJourney minutes={dailyMinutes} /> por dia em <WeekDays days={workDaysPerWeek} /> dá{" "}
              <span className="numeric">{formatHours(check.weeklyHours)}</span> horas semanais. A jornada normal vai até
              44 horas por semana (art. 7º, XIII, da Constituição), e acima disso não há divisor a conferir. Revise a
              jornada diária ou os dias por semana.
            </p>
          </AlertBanner>
        );
      case "workload-missing-without-week":
        return (
          <AlertBanner
            id={DIVISOR_ALERT_ID}
            icon={IconAlertTriangle}
            tone="danger"
            title="Informe a carga horária mensal"
            className="mb-6"
          >
            <p>Sem ela não dá para saber quanto vale a sua hora.</p>
          </AlertBanner>
        );
      case "workload-missing":
        return (
          <AlertBanner
            id={DIVISOR_ALERT_ID}
            icon={IconAlertTriangle}
            tone="danger"
            title="Informe a carga horária mensal"
            className="mb-6"
          >
            <div className="space-y-2">
              <p>Sem ela não dá para saber quanto vale a sua hora.</p>
              <DivisorSentence
                dailyMinutes={dailyMinutes}
                workDaysPerWeek={workDaysPerWeek}
                divisor={check.divisor}
                norm={check.norm}
                declaredMonthlyHours={null}
              />
              <p>{COLLECTIVE_AGREEMENT_DISCLOSURE}</p>
            </div>
          </AlertBanner>
        );
      case "workload-mismatch":
        return (
          <AlertBanner
            id={DIVISOR_ALERT_ID}
            icon={IconAlertTriangle}
            tone="warning"
            title="A carga mensal não combina com a sua semana"
            className="mb-6"
          >
            <div className="space-y-2">
              <DivisorSentence
                dailyMinutes={dailyMinutes}
                workDaysPerWeek={workDaysPerWeek}
                divisor={check.divisor}
                norm={check.norm}
                declaredMonthlyHours={declaredMonthlyHours}
              />
              <p>Os valores desta tela usam a carga que você informou.</p>
              <p>{COLLECTIVE_AGREEMENT_DISCLOSURE}</p>
            </div>
          </AlertBanner>
        );
      case "silent":
        return null;
    }
  }
  ```

  Notes the developer must not re-derive:
  - **The `div.space-y-2` wrapper appears only where there is more than one paragraph.** R1, R2 and
    the degenerate R3 pass a single `<p>`, which is the shipped idiom at `:125` and `:136`. The
    wrapper is at the **call site**, never inside the atom (`design.md` §§ 3, 12).
  - **Sentence order is `copy.md` § *Surface A/B* as amended at run 2:** divisor sentence → the
    screen's own behaviour (`B-3`, R4 only) → `D-1`, and the banner ends there. **D4 is in neither
    body** — it renders once, in T5's permanent slot.
  - **`role` follows `tone` in the shipped atom and that is correct here.** R1 and R3 are `danger` →
    `role="alert"`: an input the app cannot use. R2 and R4 are `warning` → `role="status"`: a CLT
    limit passed. `design.md` § 4 records why R2 is polite — this surface recomputes on every
    keystroke and an `alert` crossing the 10-hour boundary interrupts a screen reader mid-word.
  - **In R2 no norm is named as the authority for a number**, because no number is stated
    (`legal.md` R7, D3). `art. 59, §2º` and `art. 7º, XIII` are named as the **limit**, which is what
    R7 requires the surface to say.
  - **Nothing here animates and nothing is collapsible** (`design.md` § 7, § 4.1; lesson 018).

  **4. Wire it into the card**, replacing both conditionals at `:129-156` with one element placed
  after the salário-bruto banner and before the *Impostos e Descontos* button:

  ```tsx
  <DivisorSurface
    check={divisorCheck}
    dailyMinutes={dailyMinutes}
    workDaysPerWeek={workDaysPerWeek}
    declaredMonthlyHours={monthlyHours}
  />
  ```

  `hasMonthlyHours` stays only where it is still used — the hero's `MISSING_VALUE` and its supporting
  line (`:225`, `:244`), both unchanged.

  **5. `tests/e2e/alert-legibility.spec.ts`** — consumer **C3**'s `title` becomes
  `"A carga mensal não combina com a sua semana"`. Its `drive` is unchanged and **still reaches the
  state**: the defaults are `08:48 × 5 dias ⇒ divisor 220`, and `|200 − 220| = 20 ≥ 1`
  (`design.md` § 13). Consumers C1 and C2 are unchanged and their titles still exist.

- **Tests:** `__tests__/salary-calculator.test.tsx`.
  - **Replace `:181-190` entirely.** The new mismatch case seeds `grossSalary 3000`,
    `monthlyHours 220`, `workMinutes 480`, `workDaysPerWeek 5` and asserts on the `role="status"`
    element: it **has** `"A carga mensal não combina com a sua semana"`, `"8h00 por dia"`,
    `"5 dias por semana"`, `"200,00 horas por mês"`, `"Súmula 431 do TST, para a semana de 40 horas"`,
    `"Você informou 220,00 horas"`, `"Os valores desta tela usam a carga que você informou"` and
    `"art. 611-A, I, da CLT"`; and it **does not have** `"e não"` or
    `"Usar um divisor maior do que o devido"`.
  - **AC6 on the screen, as a claim and not a filter result:** at `workMinutes 440`,
    `workDaysPerWeek 5`, `monthlyHours 220` the banner reads `"183,33 horas por mês"` and
    `"(art. 64, parágrafo único, da CLT)"`, and `expect(banner).not.toHaveTextContent("Súmula 431")`.
    **This is the case the whole spec exists for** — a norm may be named only where its text covers
    the declared case.
  - **AC7 (N3):** the same 440-minute case asserts `"183,33"` and
    `expect(banner).not.toHaveTextContent("183.33")`.
  - **D6 at `dias = 6`:** `workMinutes 440`, `workDaysPerWeek 6`, `monthlyHours 200` → `"220,00 horas por mês"`
    and `"(art. 64, caput, da CLT)"`.
  - **Singular at one day:** `workDaysPerWeek 1` → the banner reads `"1 dia por semana"` and
    `expect(banner).not.toHaveTextContent("1 dias")`.
  - **AC2 / E5, R7b:** `workMinutes 720`, `workDaysPerWeek 5` → `role="status"` reads
    `"Sem divisor acima de 10 horas por dia"`, `"60 horas semanais"`, `"art. 59, §2º, da CLT"`,
    `"art. 59-A"`; and it states **no divisor and no norm as the authority for a number** —
    `expect(banner).not.toHaveTextContent("divisor é")` and `not.toHaveTextContent("Súmula 431")` and
    `not.toHaveTextContent("300")`.
  - **AC2, R7a:** `workMinutes 528`, `workDaysPerWeek 6` → `"Sem divisor para esta semana"`,
    `"52,8 horas semanais"`, `"art. 7º, XIII, da Constituição"`, and no `"divisor é"`.
  - **R1, out of domain:** `workDaysPerWeek 7` → `role="alert"` reads `"A semana tem um dia de descanso"`,
    `"art. 67 da CLT"`, `"art. 1º da Lei 605/49"`, `"o máximo aqui é 6 dias"`; and the field carries
    `aria-invalid="true"` with `aria-describedby="divisor-alert"` — queried by accessible role and
    name, never by class.
  - **R1, cleared:** clear the field → `role="alert"` reads `"Informe os dias trabalhados por semana"`.
  - **R3, carga missing:** `monthlyHours 0`, `grossSalary 5000` → `role="alert"` reads
    `"Informe a carga horária mensal"`, `"Sem ela não dá para saber quanto vale a sua hora"`,
    `"8h48 por dia"`, `"5 dias por semana"`, `"220,00 horas por mês"`, `"art. 611-A, I, da CLT"`.
    The existing case at `:155-164` is amended, not deleted — its three shipped assertions all still
    hold.
  - **Silence, AC5:** the defaults render **no** divisor banner — assert
    `screen.queryByText("A carga mensal não combina com a sua semana")` is null **and**
    `screen.queryByText(/divisor é/)` is null. The salário-bruto banner is unaffected.
- **Done when:** `evidence/ac10-red.txt` shows the new assertions failing against the unfixed
  component and `evidence/ac10-green.txt` shows them passing; `pnpm vitest run __tests__/salary-calculator.test.tsx __tests__/copy-guards.test.ts __tests__/comment-free-code.test.ts`
  green; `pnpm check` green. **`pnpm e2e tests/e2e/alert-legibility.spec.ts` green closes AC16 and is
  this task's clause** — if it fails on LR2a rather than on a title, that is a **finding routed to
  `product-designer`**, not a string to trim (`AGENTS.md` §4 rule 8; `copy.md` § *What is legally
  irreducible*). Advances **AC2**, **AC3**, **AC6**, **AC7**, **AC10**, **AC11**, **AC16**.

---

### T5 — D4's permanent slot: one unconditional `<p>`, five states, exactly once

- **Files:** `components/organisms/salary-calculator.tsx` (edit), `__tests__/salary-calculator.test.tsx` (edit)
- **Depends on:** T4
- **Reuse:** nothing new — it is a `<p>` with three utilities already used on this screen
- **What to build:**

  Module level, beside `DIVISOR_NORMS`:

  ```tsx
  const HOURLY_RATE_SCOPE_DISCLOSURE =
    "Bancário, turno ininterrupto de revezamento e escala 12x36 têm divisor próprio, fixado por norma da categoria (Súmula 124 e OJ 396 do TST, art. 59-A da CLT). Se for o seu caso, o valor da hora nesta tela é outro.";
  ```

  **212 characters, against a ≤ 220 budget** (`legal.md` addendum A clause 4). Not one character
  moves: *Bancário* occupies positions 1–8, the three categories keep their norms, there is no
  *"consulte a sua convenção"* and no *"pode estar errado"*, and the subject is **the money on this
  screen** with no deixis to a sibling that may not render (clause 2; lesson **049**).

  The slot, **the immediate next sibling of the field grid**, before the salário-bruto banner, the
  divisor surface and the *Impostos e Descontos* button:

  ```tsx
  <p id="divisor-disclosure" className="text-body-sm text-ink-muted text-pretty mb-6">
    {HOURLY_RATE_SCOPE_DISCLOSURE}
  </p>
  ```

  Verbatim from `design.md` § 15.11. **`--text-body-sm` and not `--text-caption`** — priced at 18 px
  in § 15.5 and decided under lesson 018: the unconditional disclosure may not be the least legible
  string on its own surface. Contrast **5.87:1** light, **7.49:1** dark, both AA.

  The card after this task, in order (`design.md` § 15.1):

  ```
  #salary-panel
  ├── card header                     unchanged
  ├── #salary-fields                  the grid, with the operand pair
  ├── p#divisor-disclosure            D4. Unconditional. Renders in all five states
  ├── AlertBanner  salário bruto      unchanged, conditional
  ├── DivisorSurface                  one of four, or null
  ├── button  Impostos e Descontos    the first interactive control after D4
  └── CollapsiblePanel                no disclosure has ever been in here, and none is now
  ```

  **Four things this slot is not, and each is a refusal already ruled:** it is **not** inside either
  banner body (clause 3 — the same 212-character sentence printed twice in one state is the fastest
  way to train a reader past it); **not** inside `components/atoms/collapsible-panel.tsx` (2a, lesson
  018); **not** in the footer of `components/organisms/calculator-views.tsx` (2b — two panel
  boundaries below every figure it would qualify); **not** in the hero (Option C, refused on 2b).

  **It is outside every live region, deliberately** (`design.md` § 15.8): the string never changes, so
  an `aria-live` wrapper would re-announce a constant on every keystroke. **It adds no tab stop and no
  animation**, and therefore owes **no `prefers-reduced-motion` path** — there is nothing to
  neutralise.

  **It does not go above the field grid**, even though that would put zero controls between the hero
  figure and D4: its whole 129.0 px would land **above `#salario-bruto`**, which is `0008`'s budget
  and the one quantity `design.md` § 13 promised 0.0 px of.

- **Tests:** `__tests__/salary-calculator.test.tsx`, one new `describe`.
  - Declare the verbatim 212-character string as a local `const` and a **five-row state table**:
    `{ name: "R1", storage: { workDaysPerWeek: "7" } }`, `{ name: "R2", storage: { workMinutes: "720" } }`,
    `{ name: "R3", storage: { monthlyHours: "0" } }`, `{ name: "R4", storage: { monthlyHours: "200" } }`,
    `{ name: "Silêncio", storage: {} }`, each on `grossSalary 3000`.
  - **Assert the table's length is 5 before iterating** — `expect(STATES).toHaveLength(5)`. A loop
    over an empty array passes and carries no record of its sample; addendum A clause 1 asks for five
    states and five rows, and clause 4 requires the guard to go red when D4 is absent from **any one**
    of them.
  - Per row: `expect(screen.getAllByText(D4_TEXT)).toHaveLength(1)` — presence **and**
    non-duplication (clause 3) in one assertion. **Do not scope the query to `[role="status"]` or
    `[role="alert"]`**: such a selector cannot see Silêncio and does not discriminate
    (`legal.md` § 5, *What G6 runs, amended*).
  - One structural case, jsdom-safe: `document.getElementById("divisor-disclosure")?.parentElement?.id`
    is `"salary-panel"`, and the slot's `previousElementSibling` is `#salary-fields`. That is clause
    2c's ordinal half in the one axis jsdom can read; **its visual-box half is T6's**.
  - One case proving the state the ruling exists for: seed the bancário — `grossSalary 3000`,
    `workMinutes 360`, `workDaysPerWeek 5`, `monthlyHours 150` — assert **no divisor banner renders**
    (it is the silent-agreement state) and D4 is on screen exactly once. This is the fourteenth row of
    `legal.md` § *The input domain, swept*, and the reason D4 is unconditional.
- **Done when:** `pnpm vitest run __tests__/salary-calculator.test.tsx` green; `pnpm test:coverage`
  reports **≥ 90%** on `components/organisms/salary-calculator.tsx`; `pnpm check` green. Advances
  **AC11** and discharges `legal.md` **D4**.

---

### T6 — Clause 2a–2d in a real browser, on the quantity the clause names

`getBoundingClientRect()` returns zeros in jsdom, so **nothing above can see reading order**. This
task is the only place clause 2b is actually tested, and `AGENTS.md` §8 requires exactly this for any
claim about the cascade or the box model.

- **Files:** `tests/e2e/divisor-disclosure.spec.ts` (create)
- **Depends on:** T5
- **Reuse:** the driving idiom of `tests/e2e/alert-legibility.spec.ts` (`setViewportSize`,
  `emulateMedia`, `goto`, `getByLabel(...).fill(...)`); `page.locator('p[aria-live="polite"]')` is the
  salário-hora figure — `components/organisms/hero-panel.tsx:43-59`, the only `<p>` with
  `aria-live="polite"` on this route
- **What to build:**

  One spec, `VIEWPORTS = [{ width: 390, height: 844 }, { width: 1440, height: 900 }]`,
  `THEMES = ["light", "dark"]`, and **five states with one driver each**:

  | State | Driver | Synchronisation barrier, before any measurement |
  |---|---|---|
  | R1 | `getByLabel("Dias Trabalhados").fill("7")` | `await expect(page.getByText("A semana tem um dia de descanso")).toBeVisible()` |
  | R2 | `getByLabel("Jornada Diária").fill("1200")` | `await expect(page.getByLabel("Jornada Diária")).toHaveValue("12:00")`, then `await expect(page.getByText("Sem divisor acima de 10 horas por dia")).toBeVisible()` |
  | R3 | `getByLabel("Carga Horária Mensal").fill("")` | `await expect(page.getByText("Sem ela não dá para saber quanto vale a sua hora")).toBeVisible()` |
  | R4 | `getByLabel("Carga Horária Mensal").fill("200")` | `await expect(page.getByText("A carga mensal não combina com a sua semana")).toBeVisible()` |
  | Silêncio | none | `await expect(page.locator("#divisor-alert")).toHaveCount(0)` |

  **Every step driven through a controlled input names its barrier** (lesson **027**): this surface
  recomputes on every keystroke and `MaskedInput` commits only a complete duration, so a measurement
  taken before the commit reads the previous state and is indistinguishable from a real regression.
  Assert the table's length is 5 before iterating.

  Per state, per viewport, per theme:

  - **2a — concealment.** `#divisor-disclosure` is visible with **no interaction of any kind**, its
    `textContent` equals the 212-character string verbatim, and in one `evaluate`:
    `element.closest("[hidden]")`, `element.closest('[aria-expanded="false"]')` and
    `element.closest("details:not([open])")` are all `null`, and
    `Math.abs(element.getBoundingClientRect().height - element.scrollHeight) <= 1` — it is not clipped
    by an `overflow: hidden` ancestor. *Falsifier the task must run once, by hand, and record:* move
    the `<p>` inside `CollapsiblePanel` and confirm 2a goes red. A guard never seen red is not a guard.
  - **2b — reading order, on `getBoundingClientRect().top` with ties broken on `left`, never on DOM
    position.** In one `evaluate`, collect the rects of `p[aria-live="polite"]` (the figure) and
    `#divisor-disclosure`, sort them on `top` then `left`, and assert the figure sorts **first** —
    at 390 the hero is visually first through `order-first` while the `main` column precedes the
    `aside` in the DOM, so a DOM-order assertion would pass for the wrong reason and fail at `lg`.
    Then assert: `#divisor-disclosure`'s `parentElement.id` is `"salary-panel"`; `#salary-panel` does
    **not** contain the figure; and no ancestor of `#divisor-disclosure` is a `button`, a `details`,
    or carries `aria-expanded` — **no control between the figure and D4 must be operated**.
  - **2c — precedence inside the card, exact and needing no calibration.** Sort the **direct element
    children** of `#salary-panel` on `top` then `left` and assert the box immediately after
    `#salary-fields` is `#divisor-disclosure`; and that `#divisor-disclosure`'s `top` is strictly less
    than the `top` of every `[role="alert"]` and `[role="status"]` inside the panel and of the
    *Impostos e Descontos* button, **in all five states**.
  - **2d — the calibration, recorded rather than asserted as a bar.** At **390×844, both themes**,
    record `#divisor-disclosure`'s document `top`, `#divisor-alert`'s document `top` where one
    renders, and the margin, into `.specs/0007-sumula-431-citation-scope/evidence/clause-2d.txt`
    beside `design.md` § 15.4's **129.0 px** and § 15.6's **1294.2**. **The binding assertion is 2c's
    strict ordering**; the margin is a measurement handed to G6. **A margin that differs from 129.0 px
    by more than one `--text-body-sm` line box at 390 — 21 px, `design.md` § 8 — is a finding routed
    through `tech-lead`, not a build failure**, because a pixel bar calibrated on one deployed build
    is not a bar this suite can own (lessons **014** and **026**).

  > **Amended at G5 triage, 2026-09-19 — this clause was defective and its defect is mine.** It named
  > the viewport, the themes and the target number and **never named the application state the 129.0
  > was measured in**. `design.md` § 14 measured it with `localStorage` seeded — `grossSalary 3000`,
  > `monthlyHours 220`, `workMinutes 528`, `salaryPeriod hour` — so the *"Informe o seu salário bruto"*
  > banner (`salary-calculator.tsx:329-333`) does not render. The drivers above seed nothing, so that
  > banner renders in all five states, **between** D4 and `#divisor-alert`, and the margin reads 276.0.
  > Both numbers are correct readings of two different states. **T10 replaces this clause's recording
  > step**; the rest of T6 stands and stays green (lesson **027**, second axis).

  **No comment in this file.** Every reason above belongs in the test's name.

- **Done when:** `pnpm e2e tests/e2e/divisor-disclosure.spec.ts` green on all three browser projects;
  `evidence/clause-2d.txt` holds the four recorded numbers for both themes; the 2a falsifier was run
  and its red output is in `evidence/clause-2a-red.txt`; `pnpm check` green. Discharges
  `legal.md` § *Run 3 — addendum A, correction 1* **clauses 2a–2d** and addendum A **clauses 1 and 3**
  in the axis jsdom cannot read.

---

### T7 — `README.md:58`: narrow the citation, do not delete it

- **Files:** `README.md` (edit)
- **Depends on:** none
- **Reuse:** the nine-bullet structure of that section, unchanged
- **What to build:** replace line 58 in full with `copy.md` § *README*'s delivered string:

  ```
  **Limites da CLT** — o teto de 2h extras (art. 59), o intervalo intrajornada (art. 71 e §1º), o interregno de 11h entre jornadas (art. 66) e a conferência do divisor mensal pelo art. 64 da CLT, com a Súmula 431 do TST na semana de 40 horas.
  ```

  **The citation is narrowed and joined, never deleted** (lesson 003) and never softened to
  *"conforme a legislação"* (lesson 004). **Keep the em-dash after the bold lead** — it is the shipped
  structure of all nine bullets and `__tests__/copy-guards.test.ts:79` walks `app`, `components` and
  `lib` for `.tsx?` only, so `.md` is outside it. Do not touch any other line.
- **Tests:** none of its own — `README.md` carries no suite. Its check is T8's boundary grep.
- **Done when:** `git diff README.md` touches exactly line 58, and
  `grep -n "431" README.md` returns one line, which is the new one. Advances **AC6**.

---

### T8 — Close the boundary: reproduce the three searches and the coverage bars

Every clause below reads files that already exist at this point in the plan; none forecasts a later
task (lesson **020**).

- **Files:** none — this task writes no source. It produces
  `.specs/0007-sumula-431-citation-scope/evidence/ac17-searches.txt` and `evidence/ac14-coverage.txt`
- **Depends on:** T1, T2, T3, T4, T5, T6, T7
- **Reuse:** the three commands verbatim from `spec.md` § *The searches, re-run at this HEAD*
- **What to build:** run, and paste each command with its full output:
  1. **AC1** — `grep -rnE "WORK_DAYS_PER_WEEK|WEEKS_IN_DIVISOR|\* 25\b" --include='*.ts' --include='*.tsx' lib components hooks app`.
     Every surviving hit is read in full and classified. `WORK_DAYS_PER_WEEK_KEY` and
     `DEFAULT_WORK_DAYS_PER_WEEK` are expected hits and are **not** clause-C sites: the first is a
     storage key, the second a product default that is read into state and never used as a fact about
     the user (`legal.md` L11). Expect **zero** hits of `WEEKS_IN_DIVISOR` and zero of `* 25`.
  2. **AC6** — `grep -rn "431" --include='*.ts' --include='*.tsx' --include='*.md' lib components hooks app __tests__ tests README.md`.
     Expect exactly the rows this plan creates: `lib/salary-period.ts` (the `SUMULA_431_WEEKLY_HOURS`
     norm comment, which names the case its text covers), `components/organisms/salary-calculator.tsx`
     (`DIVISOR_NORMS["sumula-431"]`, scope word beside the norm name), the assertions in
     `__tests__/salary-period.test.ts` and `__tests__/salary-calculator.test.tsx`, and `README.md:58`.
     **Every surviving hit restricts itself, in its own sentence, to the 40-hour week.** Read each
     one; do not count them. **S9–S22 are ruled-and-routed to `0003` and this diff does not touch
     them** — confirm with `git diff --name-only 4f3a458` containing no S9–S22 file.
  3. **AC17** — commands 2 and 3 of `spec.md` § *The searches*, diffed against that section's tables.
     A hit the re-run finds and the tables lack is a **finding routed to `product-manager`**, not a
     line to add quietly: it would mean the enumeration was never the domain.
  4. **AC14** — `pnpm check` and `pnpm test:coverage`. **`lib/**` and `hooks/**` at 100%**,
     `app/**` and `components/**` at ≥ 90%, and `git diff vitest.config.ts` **empty**.
  5. `node .agents/tools/docs-check.mjs` clean (`AGENTS.md` §9).
- **Done when:** all five outputs are in the two evidence files and every expectation above holds.
  Any that does not is written up and routed through `tech-lead` before `qa-engineer` is called.
  Advances **AC1**, **AC6**, **AC14**, **AC17**.

---

### T9 — Commit the uncommitted `lesson.mjs` repair

- **Files:** `.agents/tools/lesson.mjs` (already modified in the working tree; **no further edit**)
- **Depends on:** none
- **Reuse:** —
- **What to build:** nothing. `STATUS.md` **T1** records that `lesson.mjs`'s 255-byte filename defect
  is **already repaired in the tree and uncommitted** — `:46` carries `const MAX_SLUG = 120` and a
  `slugify` that cuts at the last whole word that fits. **What is owed is a commit, not an
  investigation.** It travels in `release-manager`'s G7 grouping as its own commit, under its own
  context, never mixed with the feature.
- **Tests:** `node .agents/tools/lesson.mjs list` runs and renders the index.
- **Done when:** `git status --porcelain .agents/tools/lesson.mjs` is empty after G7. **This task is
  `release-manager`'s to execute at G7 and is recorded here so it is not re-derived at a fourth gate.**

---

### T10 — Re-record clause 2d in the state its calibration was measured in, and in the one it was not

Added at **G5 triage, 2026-09-19**, after T6 recorded **276.0 px** against `design.md` § 15.4's
**129.0 px**. **The delivered geometry is correct and no source file changes.** Both numbers are
correct readings of two different application states, and the gap is accounted for to the hundredth
of a pixel: the *"Informe o seu salário bruto"* banner is **123.0 px** tall with **24.0 px** of
`mb-6`, and it renders between D4 and `#divisor-alert` whenever `grossSalary` is 0 — `129.0 + 147.0 =
276.0`. **This task changes the recording only.** T6's 2a, 2b and 2c cross product is green, is a
stricter state than the calibration's, and is not touched.

- **Files:** `tests/e2e/divisor-disclosure.spec.ts` (edit — the
  `clause 2d — calibration, recorded rather than asserted as a bar` describe block **only**)
- **Depends on:** T6
- **Reuse:** the `STATES` table, `driveUntil` from `tests/e2e/support/legibility.ts`, and the
  per-state `browser.newContext()` isolation already in that block. The seed keys are
  `lib/storage.ts:2-5` — `GROSS_SALARY_KEY`, `MONTHLY_HOURS_KEY`, `DAILY_MINUTES_KEY` — plus
  `salaryPeriod`, read by `hooks/use-salary-calculator.ts`
- **What to build:**

  The calibration block iterates **two conditions × two themes × five states = 20 rows**, and asserts
  the row count is 20 before writing anything (a boolean carries no record of its sample,
  `AGENTS.md` §5).

  | Condition | `localStorage` seeded into `browser.newContext({ storageState })`, beside the existing `workload_cookie_consent` entry | What it is |
  |---|---|---|
  | `calibrado` | `grossSalary` `"3000"`, `monthlyHours` `"220"`, `workMinutes` `"528"`, `salaryPeriod` `"hour"` | the state `design.md` § 14 measured in. **`#divisor-alert` is D4's next box; no salário-bruto banner renders** |
  | `padrão` | nothing seeded — exactly what T6 records today | the app's first-run state. The salário-bruto banner renders between D4 and `#divisor-alert` |

  For the `calibrado` condition the R3 driver clears *Carga Horária Mensal*, which is already seeded —
  it does not become a no-op, and its existing `driveUntil` barrier still holds.

  Each line written to `evidence/clause-2d.txt` **names its condition, its theme and its state**, in
  this exact shape, and additionally records the intervening banner so the delta is attributable in
  the file rather than re-derived:

  ```
  calibrado light R1 390x844: divisor-disclosure top=1294.16, divisor-alert top=1423.16, margin=129, salario-bruto banner=absent
  padrão light R1 390x844: divisor-disclosure top=1310.53, divisor-alert top=1586.53, margin=276, salario-bruto banner=123 + 24 mb-6
  ```

  The banner is the **direct child of `#salary-panel` carrying `role="alert"` and no `id`** — that is
  what distinguishes it from `#divisor-alert`; record `absent` or its `getBoundingClientRect().height`
  plus its computed `margin-bottom`. **Document `top` is `getBoundingClientRect().top + window.scrollY`
  on the border box**, the same quantity clause 2b sorts on and the same one T6 already uses — never a
  DOM-ordered walk, and never `offsetTop`.

  **Nothing here is an assertion on a pixel value.** The block records; 2c's strict ordering in T6 is
  the binding assertion and is unchanged. Keep the `test.skip(testInfo.project.name !== "chromium")`
  guard — one writer for one file.

- **Tests:** this task is a test. No new file.
- **Done when:** `pnpm e2e tests/e2e/divisor-disclosure.spec.ts` green on all three browser projects,
  built and served from an isolated copy on a port confirmed free (`AGENTS.md` §4 rule 6);
  `evidence/clause-2d.txt` holds **20 lines**, each naming its condition; `pnpm check` green.

  **The numbers these 20 lines should print**, measured by `tech-lead` at G5 triage in an isolated
  production build (`rsync` + `cp -al node_modules`, `rm -rf .next`, `pnpm build` with the three
  `NEXT_PUBLIC_*` values `playwright.config.ts` sets, `pnpm start` on port 3411, chromium 390×844,
  `deviceScaleFactor: 2`, `isMobile: true`, border box, both themes byte-identical):

  | Condition | State | D4 `top` | `#divisor-alert` `top` | margin |
  |---|---|---|---|---|
  | `calibrado` | R1, R2, R4, Silêncio | **1294.16** | **1423.16** (n/a in Silêncio) | **129.0** |
  | `calibrado` | R3 | **1234.30** | **1363.30** | **129.0** |
  | `padrão` | R1, R2, R4, Silêncio | **1310.53** | **1586.53** (n/a in Silêncio) | **276.0** |
  | `padrão` | R3 | **1234.30** | **1510.30** | **276.0** |

  **A row that differs from its cell above is a finding routed through `tech-lead`, never a number to
  reconcile in the test** (lessons **026**, **027**). Advances **AC15** and discharges
  `legal.md` § *Run 3 — addendum A, correction 1* clause **2d**'s recording duty.

---

## What this plan deliberately does not do

| Not done | Why, and who may reopen it |
|---|---|
| Touch `lib/weekly-rest.ts` (**N2**, **F8**) | `legal.md` § *Run 3 — L9* rules it **not a defect** and **retires D5**. Feeding a declared 5 into the dias-úteis denominator would be the defect. Owner `labor-law-analyst`; trigger: the next spec that opens that file or the DSR surface |
| Place any disclosure on the **Jornada** tab (**F9**) | `hooks/use-gross-hourly-rate.ts` → `components/organisms/day-summary.tsx` carries the same salário-hora with no D4 at all. Routed at G2, out of `spec.md`'s bound. Owner `labor-law-analyst` |
| Touch `lib/compliance.ts:65` (**F3**) | `0003`'s, else the human's (`Q-H4`) |
| Touch `lib/legal-tables.ts:48` | `0003`'s |
| Add a second field, a jornada preset, or a per-category divisor table | `spec.md` § *Non-goals*; `PRODUCT.md` §7. The categories are **disclosed** (D4), never modelled. **No override at any gate** |
| Shorten any delivered string to fit a slot | `AGENTS.md` §4 rule 8 — where a disclosure needs room, the room is found. `copy.md` § *What is legally irreducible* names the order of any cut and **`tech-lead` authorises it**. None is authorised here |
| Amend `PRODUCT.md` §9 | `copy.md` proposes the row and writes nothing. It is a **human approval point** (`AGENTS.md` §4) |
| Change `hint.jornada` to recover the +17.4 px | `design.md` § 15.6 states it as a lever, not a request; `content-writer` kept it at run 2 |
| Extend `components/atoms/alert-banner.tsx` | `design.md` § 3 — its box is calibrated against `0006`'s LR2a budget and five consumers read it |

---

## Risks

| Risk | Signal it happened |
|---|---|
| The developer plans the banner geometry against addendum A's withdrawn **+95 / −42 / +53** instead of the measured **129.0 / −134.0 / +129.0 and −5.0**, and expects a uniform surcharge | A G6 measurement reports R3/R4 **growing**. They shrink by 5.0 px; only R1, R2 and **Silêncio** pay the 129.0 |
| Clause 2b is asserted on DOM position because jsdom returns zeroed rects and the assertion passes anyway | `__tests__/salary-calculator.test.tsx` contains a `getBoundingClientRect` comparison, or T6 is skipped. A DOM-order assertion passes at 390 **for the wrong reason** — `order-first` is CSS — and would keep passing if the hero moved |
| The D4 guard is scoped to `[role="status"]` or `[role="alert"]` | The suite is green with D4 deleted from the card, because Silêncio emits no banner and the selector sees nothing to fail on. T5's guard iterates a table of **five** whose length is asserted first |
| `WEEKS_PER_MONTH_DIVISOR` is written as the literal `5` | `grep -n "= 5" lib/salary-period.ts` returns a hit. The factor is `30 ÷ 6`, and a literal re-creates the "five weeks in a month" mechanism the `product-manager` already had corrected once (lesson **046**) |
| The divisor is rounded twice, or the money is derived from the rounded hourly | The Semana row reads **R$ 600,16** instead of **R$ 600,00** at the defaults. T2 asserts both |
| A norm name survives into a refusal state as the authority for a number | R2's banner contains `divisor é` or `Súmula 431`. T4 asserts their absence in both refusal states |
| A `lib/` comment is written without a norm name — the `DIVISOR_TOLERANCE_HOURS` product-choice label is the one that invites it | `pnpm vitest run __tests__/comment-free-code.test.ts` red. The delivered comment names **CLT** so the guard passes while still stating the product choice (lesson **022**) |
| `content-writer`'s `{semanais}` rendering is read as `AMOUNT_FORMATTER` | `C-1` renders `60,00 horas semanais` and measures 219 characters against the delivered 216 |
| Clearing the day-count field silently falls back to 5 | `localStorage` holds `"0"` and the field shows `5` on reload. That is the exact defect X1 turned out to be (`legal.md` L11) |
| The `Semana` row renders **R$ 0,00** when the day count is cleared | See blocker **P-1** below. It is accompanied by R1's `role="alert"`, which names the missing field; recorded, shipped, and handed to G6 |
| A gate reads `design.md` § 15.3's *"the slot's `top` is identical in all five states"* as true and asserts **1294.2** in R3 | The assertion is red at **1234.30**. In R3 the hero swaps the salário-hora figure for its *"Sem carga horária"* empty state and loses **59.86 px** above the card. The **margin** of 129.0 and 2c's ordering hold in all five states; only the absolute `top` moves. Corrected by `product-designer` (**F-G5-2**), then clause 2d by `labor-law-analyst` (**F-G5-3**) |

---

## Handoff

| To | What |
|---|---|
| **`frontend-dev` (G5)** | T1 → T8 in order, then **T10**. Each is independently `pnpm check`-green; if one is not, stop and route it back rather than reordering or reinterpreting (lesson **020**) |
| **`product-designer` (G5 bounce, F-G5-2)** | § 15.3's `document top` row and § 15.6's *"**1294.2** in every one of the five states"* are wrong in **R3** — measured **1234.30** in the calibrated state, both themes, in an isolated production build. The cause is above the card, not in it: the hero renders *"Sem carga horária / Informe a carga horária mensal para calcular"* instead of the figure, and the `order-first` column measures **402.73** instead of **462.59**. § 15.4's **129.0**, § 15.7, § 15.9 and the placement are untouched by this |
| **`labor-law-analyst` (G5 bounce, F-G5-3)** | Clause **2d** of § *Run 3 — addendum A, correction 1* is calibrated on *"D4's document `top` is **1294.2** in every one of the five states, against the divisor banner's `top` of **1423.2**"*. The **margin of 129.0 and the strict ordering hold in all five states**; the two absolute `top` values do not hold in R3 (**1234.30 / 1363.30**). Two facts the clause may want, both measured: the margin is the state-invariant quantity, and **in R3 the salário-hora figure does not render at all** — the `p[aria-live="polite"]` that 2b sorts against carries the empty state, so *"between the figure and D4"* has no figure in that one state. **The ruling, the placement and the verdict on 2a–2c do not move**; this is the clause's text |
| **`qa-engineer` (G6)** | `evidence/ac10-red.txt`, `ac10-green.txt`, `clause-2a-red.txt`, `clause-2d.txt`, `ac17-searches.txt`, `ac14-coverage.txt`. The fourteen swept rows and E3/E4/E5 are pinned in `__tests__/salary-period.test.ts`; the five-state D4 table in `__tests__/salary-calculator.test.tsx`; clauses 2a–2d in `tests/e2e/divisor-disclosure.spec.ts` |
| **`web-standards-auditor` (G6)** | **AC15** is a measurement, not a build clause: at 390×844 record the document `top` of the divisor surface before and after, against `design.md` § 15.6's **1276.8 → 1423.2**, the D4 slot at **1294.2**, and **0.0 px** above `#salario-bruto` (864.1 → 864.1). Read with `getBoundingClientRect()` on a state loaded on purpose — **never off a `layout-shift` source rect** (`AGENTS.md` §5) |
| **`.specs/0010-…`** | **+17.4 px** at 390×844, unchanged, and still entirely the 44-character `hint.jornada` wrapping at the 148 px column. `F-1` at 16 characters costs **0.0 px** |
| **`.specs/0008-…`** | **0.0 px** added above `#salario-bruto`. Ceiling untouched, nothing to renegotiate |
| **`product-manager` (G5 bounce, F-G5-4)** | **AC17 expects a 15-file list; command 3 returns 16.** The sixteenth is `__tests__/salary-period.test.ts`. It was not a member at `5c0c6fa` — `git show 5c0c6fa:__tests__/salary-period.test.ts \| grep -c "…"` → **0** — and it is one now because **T2, which `spec.md` § *In scope* item 1 orders**, made it import `MIN_WORK_DAYS_PER_WEEK` / `MAX_WORK_DAYS_PER_WEEK` and pass a day count into `amountForPeriod` (`:9-10, :24-27, :112-113`). It is `lib/salary-period.ts`'s own test file, and `lib/salary-period.ts` is already row 7 of the list. **Nothing outside the criterion's domain entered it, and no undocumented file was touched** — the domain grew by exactly the work the spec commissioned. The criterion is `product-manager`'s: AC17 reads *"reproduces their outputs exactly"* without saying **at which tree state**, and a criterion re-run after the diff can never reproduce a pre-diff enumeration of the files the diff writes. Not amended here (`AGENTS.md` §4 rule 2) |
| **`release-manager` (G7)** | **T9** — the `lesson.mjs` repair is in the tree, uncommitted, and is its own commit |
