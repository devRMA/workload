# 0014 — Remove Google Analytics

> Owner: tech-lead · Gate: `plan` (G4) · Run 1 · 2026-09-19
>
> **Inputs:** `spec.md` (G1 `pass`), `legal.md` (G2 `pass`), `design.md` (G3 `pass`), `copy.md`
> (G3 `pass`). **Tree state every coordinate is read against: `5c0c6fa`** — the commit `spec.md`,
> `legal.md` and `design.md` all declare, and the current `HEAD`.
>
> **Two things this plan does not settle, by rule.** **H6** — whether *com destaque* requires the
> first viewport — is `labor-law-analyst`'s at **G6** (`AGENTS.md` §4 rule 8; `design.md` §13). No
> task below moves the notice, and if G6 answers *first viewport*, G3 re-opens and this plan is
> amended. **H3** — the GA4 property deletion — is the human's; **T6 ships the *"H3 not yet done"*
> variant unless a recorded act date is in `STATUS.md` before T6 starts**, and the rule for switching
> is written into T6 rather than left to judgement.
>
> **One blocker is open against this plan and it blocks exactly one task.** **B1** (below) returns
> `copy.md` to `content-writer` for the RR4 slot decomposition. **T1–T5, T7's AC2 half and T9 are
> unblocked and start now.**

---

## Architecture

### The approach, in one paragraph

Three deletions, one rewrite, two additions. The **transmission unit** (`lib/analytics.ts`,
`components/organisms/analytics-wrapper.tsx`, eight call sites, the `@next/third-parties`
dependency, four environment declarations) leaves the tree entirely — not behind a flag, because
`spec.md` **AC3** was measured to be unsatisfiable by the flag at both of its values. The **consent
machinery** (`lib/consent.ts`, `components/organisms/cookie-consent.tsx` and the e2e scaffolding
that existed to get its banner out of the way) leaves with the purpose it gated. The **footer
paragraph** is rewritten in place inside its existing `<p>`, which is the narrowest instruction
`legal.md` **RR2(d)** admits. What is added is deliberately small: one `lib/` module that owns the
residue rule and the script that executes it, and one organism that renders the one-time notice
**RR4** requires.

### Why there is no new hook, and no new state container

`RR1`'s clearing must run **before first paint** and **before the surface decides** (`design.md`
§5.5, `legal.md` §6.6). A hook runs after hydration, which is two paints too late and would read
storage a second time — the thing `design.md` §5.5 forbids by name. The clearing therefore lives in
a **blocking inline script**, and the only state the notice needs is the one bit that script leaves
behind on `document.documentElement`. One `useState` in one organism covers it. No context, no
provider, no store, no event bus. The deleted `CONSENT_CHANGED_EVENT` bus is not replaced by a
smaller one.

### Where each rule lives

| Rule | Module | Why there |
|---|---|---|
| **RR1 / RR1-m** — what counts as residue, and the exact program that eliminates it | **`lib/residue.ts`** (new) | `AGENTS.md` §8: business rules live in `lib/`. The storage key and the script that reads it are **one definition** — the script interpolates the key constant, so the literal `workload_cookie_consent` exists once in the shipped tree (lesson **059**) |
| **RR4** — the rendering condition and the surface | `components/organisms/privacy-change-notice.tsx` (new) + `lib/residue.ts` for the marker attribute name | The condition is a **read of the flag**, never a second read of storage (`design.md` §5.5) |
| **RR2** — the footer claim | `components/organisms/calculator-views.tsx`, same `<p>`, no new element | `legal.md` §7.4(d) + `design.md` §6.2: same border box satisfies adjacency at 0 px |
| **AC12** — the ads injection | `components/organisms/ad-manager.tsx`, the `useEffect` only | `legal.md` §8.3 bounds the override to the injection and widens it by nothing |

**No `lib/` or `hooks/` module that computes a user-visible number is opened** (`spec.md` § Out of
scope 2). `lib/residue.ts` computes no number and renders none.

### Component tree after the change

| Component | Level | Change |
|---|---|---|
| `RootLayout` (`app/layout.tsx`) | — | **edit** — drops the `CookieConsent` and `AnalyticsWrapper` mounts; gains the residue `<script>` as the **first child of `<body>`** |
| `CalculatorViews` | organism | **edit** — drops `safeGAEvent`; rewrites footer ¶1; mounts `PrivacyChangeNotice` between `</AnimatePresence>` and `<footer>` |
| `PrivacyChangeNotice` | **organism** (new) | The RR4 surface. `components/organisms/privacy-change-notice.tsx` |
| `Button` (`variant="ghost"`, `size="icon"`) | atom | **reuse, unchanged** — the dismiss control |
| `AppHeader`, `TaxDetailsPanel`, `WorkCalculator` | organisms | **edit, no visual change** — GA call sites only |
| `AdManager` | organism | **edit** — the injection `useEffect` only (AC12) |
| `CookieConsent`, `AnalyticsWrapper` | organisms | **deleted** |
| `CalculatorLayout` | template | **unchanged and deliberately not touched** — `design.md` §5.1 |
| `SalaryCalculator`, `DaySummary`, `JourneyForm`, `ModalDialog`, `AlertBanner` | — | **unchanged** |

### Data flow, `RR1` → `RR4`, end to end

```
<body> first child: inline script (lib/residue.ts RESIDUE_CLEARING_SCRIPT)
  ├─ reads   localStorage["workload_cookie_consent"]  → hadRecord
  ├─ reads   document.cookie                          → cookieNames[]
  ├─ deletes the record and every cookie on this origin          (RR1 / RR1-m)
  └─ if (hadRecord || cookieNames.length)  <html data-privacy-notice="1">
                                                   │
CalculatorViews → PrivacyChangeNotice (client)     │
  └─ useEffect on mount: reads the attribute ───────┘  → renders once, never storage again
```

**One read of storage, one clearing, one flag — one code path and one measurement**, which is what
`legal.md` §6.6 asks for and what makes AC4 and AC13 two readings of the same act.

### Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Render the notice's dismissal | **`motion` (installed)** — `AnimatePresence` + `motion.section` | `design.md` §10 specifies an opacity cross-fade at `--duration-base`; the repository already uses `motion/react` in `calculator-views.tsx` itself. Rung 5 of the ladder |
| Icons | **`@tabler/icons-react` (installed)** — `IconShieldCheck`, `IconX` | `design.md` §4. `IconCookie` and `IconShield` leave the product |
| Inline a script from a `lib/` constant | **React's `dangerouslySetInnerHTML` (platform)** | The idiom already ships at `components/templates/calculator-page.tsx:9-12`, with the same `biome-ignore` line and the same shape: static literal built in `lib/`. No wrapper, no `next/script` — `next/script` cannot guarantee *first child of `<body>`, before paint*, which `design.md` §5.5 makes binding |
| Delete the GA transport | **`@next/third-parties` is removed** | `spec.md` **AC9**. `pnpm-lock.yaml` is regenerated by `pnpm install`, never hand-edited |
| **Anything else** | **No dependency is added.** | `spec.md` AC9 scores it |

### The file boundary, as AC5 is actually scored — recorded here because recording it is this gate's job

`legal.md` §4.3 sets the protocol: *"AC5's union gains that file by name and `tech-lead` records it —
it is not absorbed."* **The authorised set is the 28-file union of E1 ∪ E2, plus `pnpm-lock.yaml`,
plus the ten paths below, and nothing else.** A path in the diff outside this list is a defect on
sight, exactly as AC5 says.

| # | Path | Why it is in, and which ruling put it there |
|---|---|---|
| A1 | `components/organisms/ad-manager.tsx` | **`legal.md` §8.3 fires AC12 and §16.5 makes it bind.** AC12 cannot be satisfied without editing the injection, and this file is in E3 only. **AC5 as written would fail on it**; it is added by name, bounded to `useEffect` |
| A2 | `__tests__/ad-manager.test.tsx` | Same ruling. The file asserts the script **is** injected (`0011` **F1**, *"the defect codified as expected behaviour"*) and cannot survive A1 unedited |
| A3 | `tests/e2e/disclosure-legibility.spec.ts` | **A different ground from `legal.md` §4.3's, which stands.** §4.3 keeps this file out because **RR2(a)** ships the first sentence verbatim — and it does, so line 32 keeps matching. It joins anyway because it drives `openPrivacySettings`, which clicks a button on a **deleted** surface. Bounded to the **DS4 case and its imports**; no LR assertion and no other case is touched |
| A4 | `lib/residue.ts` (create) | RR1 |
| A5 | `__tests__/residue.test.ts` (create) | RR1's coverage floor — `lib/**` at 100% |
| A6 | `components/organisms/privacy-change-notice.tsx` (create) | RR4 |
| A7 | `__tests__/privacy-change-notice.test.tsx` (create) | RR4 |
| A8 | `tests/e2e/privacy-change-notice.spec.ts` (create) | **AC13** and **RR1-m**, the two rows that need a browser |
| A9 | `__tests__/removal-guards.test.ts` (create) | **AC2** made durable. `git grep` is a run, not a guard; a repository that re-grows the transport has to fail a test (lesson **017**) |
| A10 | `tests/e2e/consent-opening-state.spec.ts` (**delete, conditional**) | `legal.md` §17.1.1: `0010`'s **LC1** instrument measures **zero** instances of its subject after this change and *"must be deleted, not left green"*. It is **`0010`'s untracked file today** (lesson **060**), so T9 owns it and the condition is written there |

### Sequencing against `0010` and `0011` — the decision, and it is this gate's alone

`spec.md` **R1/R2/R3**, `legal.md` §17.1 and `design.md` §3.3 all route here.

> **Ruling: `0014` is built on its own branch from `5c0c6fa` and merges only after `0010` merges.
> It does not wait for `0010` to build.**

Three reasons, each a measurement rather than a preference:

1. **`0014` needs nothing from `0010`.** `design.md` §3.3 measured every number in an isolated copy
   of `5c0c6fa`, from which `0010`'s 40 modified and 8 untracked files are absent by construction.
   There is no input to wait for.
2. **`0010` needs the current chrome to exist.** It is mid-**G5** on its third bounce (`T1c`), and
   its instruments are calibrated against a banner this spec deletes. Landing `0014` first would
   invalidate a running gate's baseline — `spec.md` § Out of scope 3's protected property.
3. **The repair is one-directional and cheap.** After `0010` lands, `0014` deletes one spec file and
   two helpers (**T9**). Landing the other way round, `0010` re-takes baselines mid-bounce.

`0011` is untouched: `spec.md` § Out of scope 3 and 4, and `legal.md` §8.4's **P-ADS** is a
precondition on a *future* ads spec, not on this one. **No task below edits any file under
`.specs/0010-*` or `.specs/0011-*`.**

### Blockers this gate raises

| # | What | Owner | Blocks |
|---|---|---|---|
| **B1** | **`copy.md` and `design.md` do not describe the same surface, and `copy.md`'s own Checks list has this box open.** `design.md` §8 specifies RR4 as **six slots** — `S1` a title (≤ 26 chars, the `<h2>` that is the region's accessible name), `S2`–`S5` four `<p>` cells (≤ 130 / 130 / 140 / 130 chars at 390), `S6` the dismiss `aria-label` (≤ 30). `copy.md` delivers **one paragraph of 347 / 345 characters and no title at all**. Two consequences, both measured: **(i)** `S1` has **no string in any artifact**, and it is the `aria-labelledby` target of the notice's region landmark — a developer would have to invent the product's accessible name; **(ii)** split at `copy.md`'s own sentence boundaries, the cells measure **40 / 121 / 155 (H3 done) or 153 (not done) / 28** characters, so `S4` **exceeds its budget by 15 and 13 characters**. `S6` (*"Fechar aviso"*, 12) fits. **What is asked:** `copy.md` run 2 delivering S1–S6 as six separate strings inside `design.md` §8's budgets, in both H3 variants. **If a required fact of `legal.md` §15.3 cannot fit a budget, that is a route to `product-designer`, never a dropped clause** (`copy.md`'s own argument, and `design.md` §8's *"a slot that overruns is a bounce to this gate, not a smaller font"*). | **content-writer** | **T6 only.** T1–T5, T7 (AC2 half), T9, T10 are unblocked |
| **B2** | **`legal.md`'s header announces "RR1–RR4" and `grep -n "RR3" legal.md` returns 0 matches.** `STATUS.md`'s G2 note already records that the fourth rule is the one stated at §15.3 rather than a label — the file is internally correct and its **header is not**. A downstream agent searching for RR3 finds nothing and cannot tell a missing rule from a missing label. **What is asked:** one edit to `legal.md`'s header, or an `RR3` label on the rule at §15.3. Bookkeeping; **no ruling changes and no task waits on it**. | **labor-law-analyst** | nothing |

---

## Tasks

**Rules binding on every task below**, stated once so no task restates them and none omits them:

- **No comments in shipped code** (`AGENTS.md` §8), with the two exemptions the guard already
  allows. `__tests__/comment-free-code.test.ts` enforces it across every root a task touches. **No
  code sample in this plan contains a comment, and none may be added.** The single exception is the
  `biome-ignore` directive T5 copies from `components/templates/calculator-page.tsx:10`, which is a
  tooling directive and not a comment.
- **Never assert a Tailwind class string.** Query by accessible role and name.
- **Coordinates drift, symbols do not.** Every `:line` in this plan is read at `5c0c6fa`; the
  working tree carries other specs' uncommitted edits and the same strings sit up to four lines
  lower (`legal.md` §1.2). **Locate by symbol or by string, never by line number.**
- **A number in a `Done when` that is not reached is a finding to route to `tech-lead`, never a
  number to adjust and never a reason to stop** (lesson **026**). Each task says which of its
  numbers are measured and which are predicted.

---

### T1 — Remove the transmission unit

- **Files:**
  - `lib/analytics.ts` — **delete**
  - `components/organisms/analytics-wrapper.tsx` — **delete**
  - `__tests__/analytics.test.ts` — **delete**
  - `__tests__/analytics-wrapper.test.tsx` — **delete**
  - `app/layout.tsx` — edit
  - `components/organisms/app-header.tsx` — edit
  - `components/organisms/calculator-views.tsx` — edit
  - `components/organisms/tax-details-panel.tsx` — edit
  - `components/organisms/work-calculator.tsx` — edit
  - `__tests__/app-header.test.tsx`, `__tests__/calculator-views.test.tsx`,
    `__tests__/tax-details-panel.test.tsx`, `__tests__/work-calculator.test.tsx` — edit (**mock and
    assertions**)
  - `__tests__/calculator-page.test.tsx`, `__tests__/custo-da-hora-page.test.tsx`,
    `__tests__/page.test.tsx`, `__tests__/salary-calculator.test.tsx` — edit (**mock only**)
  - `__tests__/layout.test.tsx` — edit
  - `package.json` — edit · `pnpm-lock.yaml` — regenerated
  - `.env.example`, `.github/workflows/ci.yml`, `playwright.config.ts` — edit
- **Depends on:** none
- **Reuse:** nothing new. This task only removes.
- **What to build:**
  1. Delete the four files above.
  2. **Eight call sites, four components**, each losing its `import { safeGAEvent } from
     "@/lib/analytics";` and its call and **nothing else** — no handler is deleted, no prop changes,
     no behaviour moves:

     | Component | Events removed |
     |---|---|
     | `app-header.tsx` | `session_metadata`, `toggle_theme` |
     | `calculator-views.tsx` | `switch_tab` (the `onClick` on the tab `<Link>` goes with it; `href`, `scroll={false}` and `aria-current` stay) |
     | `tax-details-panel.tsx` | `add_deduction`, `add_gain` |
     | `work-calculator.tsx` | `toggle_manual_mode`, `reset_defaults`, `copy_to_clipboard` |

     Where the call was the **entire** body of an arrow handler, the prop is removed with it. Where
     it shared a body with other statements, only the call leaves and the handler stays.
  3. `app/layout.tsx`: remove the `AnalyticsWrapper` import and its `<AnalyticsWrapper />` element.
     **`<CookieConsent />` stays until T2** — this task must leave the tree green on its own.
  4. **The eight test files split into two disjoint halves, and this is the split `spec.md` S1 hands
     to G4:**
     - **Assert-on-`safeGAEvent` (4):** `app-header`, `calculator-views`, `tax-details-panel`,
       `work-calculator`. Remove the `vi.mock("@/lib/analytics", …)` block, the
       `import { safeGAEvent }` line, and **each `expect(safeGAEvent).toHaveBeenCalledWith(…)`
       assertion**. Where removing the assertion empties an `it()` body, **delete the `it()`**; where
       the `it()` still asserts user-visible behaviour, keep it and keep its name.
     - **Mock-only (4):** `calculator-page`, `custo-da-hora-page`, `page`, `salary-calculator`.
       Remove the `vi.mock` block only. No `it()` changes.
  5. `__tests__/layout.test.tsx`: the `it("does not preconnect to any third-party origin ahead of
     consent")` case **loses its `googletagmanager` expectation entirely** — the literal may not
     survive anywhere outside `.specs/` and `.agents/` (**AC2**). Keep the
     `pagead2.googlesyndication.com` expectation, and **rename the case** to
     `"does not preconnect to any third-party origin"`: *ahead of consent* names a surface that no
     longer exists, and a test name that describes a deleted state misleads the next reader of a
     failing run (`AGENTS.md` §8).
  6. `package.json`: remove `"@next/third-parties": "^16.3.5"` from `dependencies`, then run
     `pnpm install` so `pnpm-lock.yaml` regenerates. **Do not hand-edit the lockfile.**
  7. Environment declarations, GA half only — **`NEXT_PUBLIC_ENABLE_ADS` and
     `NEXT_PUBLIC_ADSENSE_ID` are untouched everywhere:**
     - `.env.example`: delete the `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX` line.
     - `.github/workflows/ci.yml`: delete the three `NEXT_PUBLIC_GA_ID` lines (one `"G-TEST12345"`,
       two `""`), leaving the ads lines beside them.
     - `playwright.config.ts`: delete `NEXT_PUBLIC_GA_ID: "G-TEST12345"` from `webServer.env`.
- **Tests:** no new test file. The four assert-on files above are the tests that change; each must
  still pass by querying accessible role and name for the behaviour that remains.
- **Done when:**
  - `pnpm check` is clean and `pnpm test` is green on the whole suite.
  - `git grep -nEI "safeGAEvent|analytics-wrapper|@next/third-parties" -- app components lib hooks __tests__`
    returns **zero rows**. *(Measured known-bad at `5c0c6fa`: `safeGAEvent` alone returns rows in 13
    files.)*
  - `grep -c "third-parties" package.json pnpm-lock.yaml` returns **0** in both — **AC9**.
    *(Known-bad, measured `spec.md` E12: 4 matches in 2 files.)*
  - **Advances:** AC1, AC2, AC3, AC9. **AC2 is not closed here** — `cookie-consent.tsx` and
    `google-tracking.spec.ts` still carry matching rows until T2. **AC3 is not closed here** — the
    bundle is only measurable after a production build, which is T7's row.

---

### T2 — Delete the consent machinery and the scaffolding that existed to hide it

- **Files:**
  - `lib/consent.ts` — **delete**
  - `components/organisms/cookie-consent.tsx` — **delete**
  - `__tests__/consent.test.ts` — **delete**
  - `__tests__/cookie-consent.test.tsx` — **delete**
  - `app/layout.tsx` — edit
  - `playwright.config.ts` — edit
  - `tests/e2e/support/legibility.ts` — edit
  - `tests/e2e/disclosure-legibility.spec.ts` — edit *(boundary addition **A3**)*
  - `tests/e2e/google-tracking.spec.ts` — edit
- **Depends on:** T1 *(`analytics-wrapper.tsx` imports `lib/consent.ts`; deleting the module first
  leaves the tree red)*
- **Reuse:** nothing new.
- **What to build:**
  1. Delete the four files. **Thirteen pt-BR strings leave with them and none is ported anywhere** —
     `copy.md` § `cookie-consent.*` lists all thirteen with their discharge grounds, and `spec.md`
     § Non-goals 3 makes a replacement surface a rejection.
  2. `app/layout.tsx`: remove the `CookieConsent` import and its element. After T1 and T2 the
     `<body>` subtree is `ThemeProvider → {children} → <AdManager />` and nothing else.
  3. `playwright.config.ts`: delete the whole `storageState` block from `use` (the `cookies`/
     `origins` object seeding `workload_cookie_consent`). **The default becomes a clean device, and
     that is required rather than incidental**: `legal.md` §17.1.2 names the failure it prevents — a
     suite that keeps seeding residue would render T6's notice in every geometry assertion in the
     repository. **This task must land before T6.**
  4. `tests/e2e/support/legibility.ts`: delete `openPrivacySettings`, `DS4_PANEL_SELECTOR` and
     `DS4_EXPECTED_PARAGRAPHS` — all three name the deleted dialog. Delete the
     `page.addInitScript(() => localStorage.removeItem("workload_cookie_consent"))` that lives
     inside `openPrivacySettings`. **Touch nothing else in this file**: `assertLr1`, `assertLr2b`,
     `assertLr2bAcrossParagraphs`, `assertLr3`, `assertLr3Rendering`, `availableContentWidth`,
     `waitForStableBoundingBox`, `measureSurface`, `expectLr2a`, `driveUntil`, `driveC5`,
     `LR2B_MEASURE_FLOOR_CPL`, `DS1_*`, `D3_*`, `D4_*`, `D6_*` all stay — **T7 imports four of
     them.**
  5. `tests/e2e/disclosure-legibility.spec.ts`: delete the **DS4 case** and the three imports it
     alone uses (`DS4_PANEL_SELECTOR`, `DS4_EXPECTED_PARAGRAPHS`, `openPrivacySettings`). **Line 32's
     `assertLr3(page, route, footer, "Tudo o que você digita fica salvo apenas neste navegador")`
     does not change and must not** — `legal.md` §4.3 and **RR2(a)** are what keep it matching.
  6. `tests/e2e/google-tracking.spec.ts`: delete the three consent/GA cases — *"should show cookie
     consent banner on first visit"*, *"should allow accepting cookies and load GA script"*, *"should
     hide consent banner after choice"* — and the file-level `test.use({ storageState: { cookies: [],
     origins: [] } })`, which existed only to opt out of the seed T2 just deleted. **Keep
     *"should never place an ad above the calculator"*** and **replace its precondition**: delete
     `await page.click('button:has-text("Aceitar Tudo")')`; the `beforeEach`'s `page.goto("/")` is
     the whole setup now. Rename the `describe` from `"Google Tracking & Ads"` to `"Ads"`. **Do not
     rename the file** — **AC10** scores that this test *"still exists"*, and a path change is an
     identity change.
- **Tests:** the two e2e files above are the tests. **AC10's falsification, run once and pasted into
  the task's report** (`spec.md` AC10 requires the failing input be named before the guard is called
  passing, and lesson **064** requires the positive control in the same breath): with the surviving
  test's own `page`, evaluate
  `document.querySelector("#main-content")?.insertAdjacentHTML("afterbegin", '<ins class="adsbygoogle"></ins>')`
  before the `page.evaluate` block, and confirm the predicate computes **`false`**. **Revert the
  mutation; it does not ship.** If the predicate still computes `true` with an `ins.adsbygoogle`
  ahead of the `Sua Jornada` heading, the guard is dead and that is a **new finding routed to
  `tech-lead`**, not a closed criterion.
- **Done when:**
  - `pnpm check` clean, `pnpm test` green.
  - `git grep -nEI "CookieConsent|cookie-consent|TelemetryConsent|CONSENT_CHANGED_EVENT|workload_cookie_consent|lib/consent" -- . ':!.specs' ':!.agents' ':!pnpm-lock.yaml'`
    returns **zero rows**. *(Known-bad, `spec.md` E2, measured: 9 files.)*
  - `pnpm exec playwright test tests/e2e/google-tracking.spec.ts` green, **with the falsification run
    recorded** — the report names the injected input and the `false` it produced.
  - **Advances:** AC2, AC7, AC10, AC11.

---

### T3 — AC12: the ads path injects no script in any environment

- **Files:** `components/organisms/ad-manager.tsx` — edit *(**A1**)* · `__tests__/ad-manager.test.tsx`
  — edit *(**A2**)*
- **Depends on:** none
- **Reuse:** `components/atoms/google-ad.tsx` — **unchanged, and it must stay unchanged.**
- **What to build:** delete the entire `useEffect` that appends the
  `pagead2.googlesyndication.com` script, and the now-unused `useEffect` import. **Everything else in
  the file stays byte-identical**: the two `process.env` reads, the `if (!adClient || !enableAds)
  return null;` guard, the wrapper `div` and its classes, and `<GoogleAd slot="footer_slot" />`.
  `legal.md` §8.3 bounds this override and widens it by nothing: **no ad markup, no slot, no layout
  reserve, no `PRODUCT.md` §8 wording.** `0011` **F1** stays `0011`'s finding, at `high`, latent.
  Update `__tests__/ad-manager.test.tsx`: the case asserting the script **is** appended becomes a
  case asserting it is **not** — with `NEXT_PUBLIC_ENABLE_ADS="true"` and `NEXT_PUBLIC_ADSENSE_ID`
  set, `document.querySelector('script[src*="pagead2.googlesyndication.com"]')` is `null`. Keep every
  other case, including the ones asserting the `<ins>` renders under the flags and does not render
  without them.
- **Tests:** `__tests__/ad-manager.test.tsx` — the flipped case above, plus the existing render
  cases. Query the slot by its rendered element, never by a class string.
- **Done when:** `pnpm test __tests__/ad-manager.test.tsx` green; `pnpm check` clean;
  `git grep -n "createElement(\"script\")" components/organisms/ad-manager.tsx` returns **zero
  rows**. **Advances:** AC12. *(The environment half of AC12 — the count of injected scripts on a
  real build with both ads flags set — is **T7's** row; this task closes the unit half.)*

---

### T4 — RR2: rewrite the footer claim in place, and give it a guard that can fail

- **Files:** `components/organisms/calculator-views.tsx` — edit ·
  `__tests__/calculator-views.test.tsx` — edit
- **Depends on:** T1 *(same file, same import block)*
- **Reuse:** the existing `<footer>` and its existing first `<p>`. **No new element, no new class, no
  token change** — `design.md` §6.2.
- **What to build:** replace the text of the footer's **first `<p>`** — and only its text — with the
  exact string `copy.md` § `calculator-views.footer.privacy` delivers:

  > `Tudo o que você digita fica salvo apenas neste navegador. O que você digita não é enviado para nenhum servidor, e ninguém além de você vê seus horários ou seu salário.`

  Three clauses, each with its own binding source, each separately checkable:

  | Clause | Text | Rule |
  |---|---|---|
  | **(a)** | `Tudo o que você digita fica salvo apenas neste navegador.` | `legal.md` §7.4(a) — **verbatim, character for character.** `0011` §22 **D2**. It is also what keeps `tests/e2e/disclosure-legibility.spec.ts:32` matching and AC5's union at 28 |
  | **(b)** | *(the retired proposition)* | `legal.md` §7.4(b) — **absent.** No string anywhere in the app asserts, of the application as a whole, that it transmits nothing |
  | **(c)** | `O que você digita não é enviado para nenhum servidor, e ninguém além de você vê seus horários ou seu salário.` | `legal.md` §7.4(c) — the narrow true claim, subject scoped to *o que você digita* and never to the application |

  **Do not split into two `<p>` elements.** The same border box satisfies **RR2(d)**'s adjacency at
  0 px at every width (`legal.md` §7.4(d), `design.md` §6.2 — the permitted alternative is ≤ 8 px and
  the footer's own measured gap is exactly **8.0 px**). JSX line-wrapping inside the `<p>` is free;
  Testing Library normalises whitespace.
- **Tests:** `__tests__/calculator-views.test.tsx` — **RR2-g asserts three things, not one**
  (`legal.md` §7.5, §16.3):
  1. **(i)** the existing `expect(screen.getByText(/fica salvo apenas neste navegador/)).toBeInTheDocument()`
     **is kept, unchanged**. It guards D2's protected half — and it is **not** evidence for (ii) or
     (iii); `legal.md` §4.2 found it silently counted as both.
  2. **(ii)** `expect(screen.getByText(/O que você digita não é enviado para nenhum servidor/)).toBeInTheDocument()`.
  3. **(iii)** `expect(screen.queryByText(/Nada é enviado para nenhum servidor/)).not.toBeInTheDocument()`.
     The **repository-wide** half of (iii) is **T7**'s, in `__tests__/removal-guards.test.ts`; this
     task closes the rendered half and T7 closes the tree half. *(Lesson **020**: each clause is
     closed by the task whose own files can close it.)*
  4. **Rename the case at `:65`.** `it("promises that nothing leaves the browser and that the numbers
     are an estimate")` restates the retired claim in a test description (`legal.md` §4.2(b)). New
     name: `it("scopes the privacy promise to what the user types and calls the numbers an
     estimate")`.
- **Done when:** `pnpm test __tests__/calculator-views.test.tsx` green; `pnpm check` clean;
  **the three assertions are seen to fail against the unfixed state before they are trusted** —
  `git stash` the source hunk (not the test), run the file, and confirm **(ii)** and **(iii)** go red
  while **(i)** stays green. Paste the run. *(That asymmetry is the whole finding of `legal.md`
  §4.2, and a run that shows all three red or all three green means the stash took the wrong hunk.)*
  **Advances:** AC8.

---

### T5 — RR1: the residue rule, and the blocking script that executes it

- **Files:** `lib/residue.ts` — **create** *(**A4**)* · `__tests__/residue.test.ts` — **create**
  *(**A5**)* · `app/layout.tsx` — edit
- **Depends on:** T2 *(the record's writer must be gone before the reader deletes it; and `app/layout.tsx`'s
  edits are simpler in one direction)*
- **Reuse:** the inline-script idiom already shipping at `components/templates/calculator-page.tsx:9-12`
  — `<script>` with `dangerouslySetInnerHTML` fed from a `lib/` constant, and the same
  `biome-ignore lint/security/noDangerouslySetInnerHtml` directive, which is a tooling directive and
  therefore one of `AGENTS.md` §8's two comment exemptions. The precedent for removing a superseded
  key is `hooks/use-gross-hourly-rate.ts:11` with `lib/storage.ts:1`; **it is cited as precedent and
  not reused as a mechanism**, because `RR1` must run before paint and a hook cannot.
- **What to build:**

  `lib/residue.ts` exports exactly three symbols:

  ```ts
  export const CONSENT_RECORD_KEY = "workload_cookie_consent";

  export const RESIDUE_MARKER_ATTRIBUTE = "data-privacy-notice";

  export const RESIDUE_CLEARING_SCRIPT = `(function(){try{var key=${JSON.stringify(CONSENT_RECORD_KEY)};var hadRecord=localStorage.getItem(key)!==null;var cookieNames=document.cookie.split(";").map(function(entry){return entry.split("=")[0].trim();}).filter(Boolean);if(hadRecord){localStorage.removeItem(key);}for(var index=0;index<cookieNames.length;index+=1){document.cookie=cookieNames[index]+"=; Max-Age=0; path=/";}if(hadRecord||cookieNames.length>0){document.documentElement.setAttribute(${JSON.stringify(RESIDUE_MARKER_ATTRIBUTE)},"1");}}catch(residueError){}})();`;
  ```

  Five properties of that string are binding and each has a source:

  | Property | Source |
  |---|---|
  | The key literal exists **once** in the shipped tree, interpolated into the script | lesson **059** — a plan that paraphrases a constant ships two versions of it |
  | **Every** cookie on the origin is deleted, not the ones matching `^_ga` | `legal.md` §6.4 **RR1-m**: *"a count of cookies — all of them, not the ones matching a pattern"*. Its premise is `0011` **F7**: this app sets no first-party cookie of its own, re-verified at `5c0c6fa` |
  | The deletion form is `name + "=; Max-Age=0; path=/"` | The exact form measured to work in `evidence/residue.mjs`, which printed `{"record":null,"ga":[]}` in the same page. Not invented here |
  | The flag is set **before** any React code runs, from the same read that cleared | `legal.md` §6.6 (*one code path and one measurement*) and `design.md` §5.5 |
  | `try`/`catch` around the whole body | `localStorage` throws in partitioned/blocked contexts. A residue clearing that throws would take the first paint with it |

  **The known ceiling, stated as a prediction with its escape clause** (lesson **026**): the
  `path=/` form cannot reach a cookie set with an explicit `Domain` on a parent domain or with a
  non-`/` `Path`. The GA4 cookies this application caused are neither — `evidence/residue.mjs`
  measured both cleared. **If T7's run finds a surviving cookie, that is a finding routed to
  `tech-lead` → `labor-law-analyst` (RR1-m's premise), never a pattern to widen locally.**

  `app/layout.tsx`: the script is the **first child of `<body>`**, before `ThemeProvider`:

  ```tsx
  <body className={hyperlegible.variable} suppressHydrationWarning>
    <script
      // biome-ignore lint/security/noDangerouslySetInnerHtml: safe only while the payload is a static literal built in lib/residue.ts
      dangerouslySetInnerHTML={{ __html: RESIDUE_CLEARING_SCRIPT }}
    />
    <ThemeProvider …>
  ```

  **Never a hand-written `<head>`** — `design.md` §0.3 measured what that costs in the App Router
  (the stylesheet never loads and four false observations follow). **Never `next/script`**, which
  cannot promise *first child of `<body>`, before paint*. **Never a `setTimeout` and never a
  post-hydration effect that reads storage a second time** (`design.md` §5.5).
- **Tests:** `__tests__/residue.test.ts`, jsdom. **The test executes the shipped string itself** —
  `new Function(RESIDUE_CLEARING_SCRIPT)()` — so the tested artifact and the shipped artifact are the
  same bytes. Five cases, each asserting the **whole conjunction** the rule states, never one
  conjunct:
  1. **record + cookies** → `localStorage.getItem("workload_cookie_consent")` is `null` **and**
     `document.cookie` is `""` **and** `document.documentElement.getAttribute("data-privacy-notice")`
     is `"1"`.
  2. **cookies only, no record** → same three assertions (flag `"1"`).
  3. **record only, no cookies** → same three (flag `"1"`).
  4. **clean device** → record `null`, cookie `""`, **and the attribute is `null`** — the flag is the
     half a one-sided test would miss, and AC13's second row depends on it.
  5. **`localStorage.getItem` throws** (`vi.spyOn(Storage.prototype, "getItem").mockImplementation(()
     => { throw new Error("blocked"); })`) → the call does not throw **and** the attribute is `null`.
  Seed cookies with `document.cookie = "_ga=GA1.1.111.222"` and
  `document.cookie = "_ga_TEST12345=GS1.1.333"`, which are the names `spec.md` E6 measured.
  **Reset `document.documentElement` attributes and `localStorage` in a `beforeEach`**, because the
  script is idempotent but jsdom's document is not reset between cases (lesson **027**: the drive is
  idempotent and the starting state is stated).
- **Done when:** `pnpm test __tests__/residue.test.ts` green; `pnpm test:coverage` reports **100%**
  for `lib/residue.ts` on all four metrics; `pnpm check` clean; `pnpm build` succeeds and
  `grep -c "workload_cookie_consent" .next/server/app/index.html` — or the equivalent rendered
  document — is **≥ 1**, proving the literal reached the document rather than being tree-shaken.
  *(That count is a **prediction**, not a measurement: the expected value is 1 and anything ≥ 1 is a
  pass; **0** is a finding to route, because it means the script did not ship.)*
  **Advances:** AC4.

---

### T6 — RR4: `PrivacyChangeNotice`

> **BLOCKED ON B1.** This task does not start until `copy.md` run 2 delivers S1–S6. **A developer
> who reaches this task with B1 open stops and routes to `tech-lead`** — inventing the notice's
> accessible name is exactly the decision this plan exists to prevent.

- **Files:** `components/organisms/privacy-change-notice.tsx` — **create** *(**A6**)* ·
  `__tests__/privacy-change-notice.test.tsx` — **create** *(**A7**)* ·
  `components/organisms/calculator-views.tsx` — edit
- **Depends on:** **T2** *(the e2e seed must be gone first, or the notice renders in every geometry
  assertion in the repository — `legal.md` §17.1.2)*, **T5** *(the flag it reads)*, **B1**
- **Reuse:** `Button` from `components/atoms/button.tsx` (`variant="ghost"`, `size="icon"` — its
  `buttonClasses` already ship `active:scale-[0.97]` **and** its `motion-reduce:active:scale-100`
  neutraliser, so **no reduced-motion utility is written here**); `AnimatePresence` and `motion` from
  `motion/react`, already imported in `calculator-views.tsx`; `IconShieldCheck` and `IconX` from
  `@tabler/icons-react`; `RESIDUE_MARKER_ATTRIBUTE` from `lib/residue.ts`.
- **What to build:**

  ```tsx
  "use client";

  import { IconShieldCheck, IconX } from "@tabler/icons-react";
  import { AnimatePresence, motion } from "motion/react";
  import { useEffect, useState } from "react";
  import { Button } from "@/components/atoms/button";
  import { RESIDUE_MARKER_ATTRIBUTE } from "@/lib/residue";

  export function PrivacyChangeNotice() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      if (document.documentElement.getAttribute(RESIDUE_MARKER_ATTRIBUTE) === "1") setIsVisible(true);
    }, []);

    return (
      <AnimatePresence initial={false}>
        {isVisible ? (
          <motion.section
            key="privacy-change-notice"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            aria-labelledby="privacy-change-title"
            className="mx-auto mt-12 max-w-3xl rounded-xl border border-line bg-surface p-6 shadow-card sm:p-8"
          >
            …
          </motion.section>
        ) : null}
      </AnimatePresence>
    );
  }
  ```

  **Why the flag is read in an effect and not in a `useState` initializer:** the server renders
  nothing and the client would render the notice, which is a hydration mismatch. `design.md` §5.4
  specifies the mount-after-paint behaviour and measures that the insertion point is **1681.8 px
  below the fold at 390** (402.8 at 1440; 546.4 at 2560/3840), so **no element visible at first paint
  moves**. The `design.md` prototype's `useState(() => document…)` form is a measurement artifact and
  **does not ship**.

  **Markup, exactly** — the structure `design.md` §5.3 and §11.1 measured its nine axes against:

  | Node | Element and attributes | Classes (`design.md` §6.1) |
  |---|---|---|
  | root | `motion.section` with `aria-labelledby="privacy-change-title"` — a named **region** landmark. **Not** `role="alert"`, **not** `aria-live` (`design.md` §11.1) | `mx-auto mt-12 max-w-3xl rounded-xl border border-line bg-surface p-6 shadow-card sm:p-8` |
  | header row | `div` | `flex items-start gap-3` |
  | icon | `<IconShieldCheck size={20} stroke={2} aria-hidden="true" />` | `mt-0.5 shrink-0 text-ink-muted` |
  | title | `<h2 id="privacy-change-title">{S1}</h2>` — `h2` and not `h1`: `AppHeader` owns the page `h1` | `flex-1 text-heading text-ink` |
  | dismiss | `<Button variant="ghost" size="icon" aria-label={S6} onClick={() => setIsVisible(false)}>` wrapping `<IconX size={20} aria-hidden="true" />` | `-mt-1 -mr-1 shrink-0` |
  | body | `div` holding **four** `<p>`: S2, S3, S4, S5 in that order | `mt-4 max-w-prose space-y-2 text-body-sm text-ink-muted` |

  **No `data-probe` attribute ships.** The e2e queries the region by role and name.

  **The strings**, verbatim from `copy.md` run 2, with no edit of any kind:

  | Slot | Content | Ceiling |
  |---|---|---|
  | **S1** | the `<h2>` title | ≤ 26 chars / 1 line box; 2 line boxes is the ceiling |
  | **S2** | *what changed* — `legal.md` §15.4 cell 1 | ≤ 130 |
  | **S3** | *what was deleted on this device* — cell 2 | ≤ 130 |
  | **S4** | *what this does not reach at Google* — cell 3, **two variants** | ≤ 140 |
  | **S5** | *where to ask*, carrying the controller's channel as literal text | ≤ 130 |
  | **S6** | the dismiss `aria-label` (`Fechar aviso`) | ≤ 30 |

  **The S4 variant rule, and it is a lookup and not a judgement.** Ship the **"H3 not yet done"**
  variant. Ship the **"H3 done"** variant **only if** `STATUS.md` records H3's act date at the moment
  this task runs, and then substitute that recorded date for `[DD/MM/AAAA]`. **No agent invents a
  date, and no agent ships the "done" wording without one** — `legal.md` §15.4: no artifact of this
  product may state the data has been deleted before H3. Only one variant exists in the built
  bundle; this is not a runtime branch and not an environment flag.

  **Mount point**, in `components/organisms/calculator-views.tsx`: `<PrivacyChangeNotice />` is a
  **direct child of the `#main-content` div**, immediately after the closing `</AnimatePresence>`
  and immediately before `<footer>`. Not inside `CalculatorLayout`, not inside the `motion.div`, not
  in `app/layout.tsx` — `design.md` §5.1 eliminates each of those by a named rule, and the
  `order-first` aside is the one that makes the `main` column illegal outright.
- **Tests:** `__tests__/privacy-change-notice.test.tsx`, jsdom. Set and clear
  `document.documentElement` attributes in `beforeEach`/`afterEach`.
  1. **Residue state** — attribute `"1"` set before render: `screen.getByRole("region", { name: S1 })`
     is in the document; each of S2, S3, S4, S5 is found by `getByText`; the dismiss control is found
     by `getByRole("button", { name: S6 })`.
  2. **Clean state** — no attribute: `screen.queryByRole("region", { name: S1 })` is `null`. **Both
     rows are asserted**; a suite that measures only the residue row passes against a component that
     always renders (`legal.md` §15.3's *state count, and it must match*).
  3. **Pointer dismissal:** `await user.click(screen.getByRole("button", { name: S6 }))`, then
     `await waitFor(() => expect(screen.queryByRole("region", { name: S1 })).not.toBeInTheDocument())`.
     **Assert on the region's absence, never on a prop of a node inside the exiting subtree** —
     `AnimatePresence` freezes the exiting subtree's props until it unmounts (lesson **063**).
  4. **Keyboard path:** `await user.tab()` until the dismiss control has focus
     (`expect(screen.getByRole("button", { name: S6 })).toHaveFocus()`), then
     `await user.keyboard(" ")` — **the literal space character, never `{Space}`** (lesson **062**) —
     and assert the same removal as case 3. A second case presses `{Enter}`.
  5. **Reduced motion:** re-point the `matchMedia` mock in `vitest.setup.ts` so
     `matches` is `true` for `(prefers-reduced-motion: reduce)`, then repeat case 3. **The expected
     result is identical** — `design.md` §10 keeps the opacity cross-fade under reduced motion
     because there is no transform and no vestibular component. A test asserting the animation is
     *suppressed* would be asserting the opposite of the design.
  6. **Mount integration**, in `__tests__/calculator-views.test.tsx`: with the attribute set, the
     region renders **after** the calculator panel and **before** the footer in DOM order — assert
     with `compareDocumentPosition` against the `<footer>`'s first paragraph, not with a class or a
     selector string.
- **Done when:** `pnpm test __tests__/privacy-change-notice.test.tsx __tests__/calculator-views.test.tsx`
  green; `pnpm test:coverage` holds **90%** on `components/**` for all four metrics; `pnpm check`
  clean. **Advances:** AC13. *(AC13's browser rows — 1 / 0 / 0, both themes, at 390×844 — are
  **T7**'s; this task closes the unit rows.)*

---

### T7 — The guards that need a tree, a build and a browser

- **Files:** `__tests__/removal-guards.test.ts` — **create** *(**A9**)* ·
  `tests/e2e/privacy-change-notice.spec.ts` — **create** *(**A8**)*
- **Depends on:** T1, T2, T3, T4, T5, T6 *(the AC2 half of the first file may be written and run
  after T2; the rest needs the whole change)*
- **Reuse:** `tests/e2e/support/legibility.ts` — `assertLr1`, `assertLr2b`, `assertLr3Rendering`,
  `availableContentWidth`. **Named by path and symbol because the rule already exists in the tree as
  code** (lesson **059**); do not restate their thresholds in this spec's own file.
  `__tests__/copy-guards.test.ts` is the idiom for a tree-walking vitest guard — mirror its
  `readdirSync(..., { recursive: true })` shape rather than inventing one.
- **What to build:**

  **`__tests__/removal-guards.test.ts`** — **AC2** and the tree half of **RR2-g(iii)**, made durable.
  It walks `app`, `components`, `hooks`, `lib`, `__tests__`, `tests` and the root config files
  (`package.json`, `playwright.config.ts`, `.env.example`, `.github/workflows/ci.yml`) and asserts
  **zero** matches for each forbidden token.

  **The tokens are assembled, never written as literals, and the reason is a measurement:** a guard
  file containing the literal `googletagmanager` is itself a row in **AC2**'s own `git grep`, and the
  guard would fail the criterion it enforces (lesson **022** — run the mandated text through every
  guard that reads its destination, including the one this task is creating).

  ```ts
  const FORBIDDEN_TRANSPORT_TOKENS = [
    `safeGA${"Event"}`,
    `data${"Layer"}`,
    `g${"tag"}`,
    `google${"tagmanager"}`,
    `google-${"analytics"}`,
    `analytics.${"google"}`,
    `NEXT_PUBLIC_GA${"_ID"}`,
    `@next/third${"-parties"}`,
  ] as const;

  const FORBIDDEN_CONSENT_TOKENS = [
    `Cookie${"Consent"}`,
    `cookie-${"consent"}`,
    `CONSENT_CHANGED${"_EVENT"}`,
    `workload_cookie${"_consent"}`,
    `lib/${"consent"}`,
  ] as const;
  ```

  **`lib/residue.ts` is the one file that legitimately holds `workload_cookie_consent`**, and the
  guard must exempt it **by path and by no other property** — one named path, never a pattern, never
  a phrase about intent. A second `it()` asserts the retired proposition is absent: the literal
  `Nada é enviado para nenhum servidor` matches **zero** files under `app`, `components`, `lib`,
  `hooks` (`legal.md` §7.5 **RR2-g(iii)**, tree half).

  **`tests/e2e/privacy-change-notice.spec.ts`** — **AC13**, **RR1-m** and the six of `legal.md`
  §15.5's nine axes a browser can read. Structure: `test.use({ viewport: { width: 390, height: 844 } })`
  at file level, and a `for (const colorScheme of ["light", "dark"] as const)` describe loop with
  `test.use({ colorScheme })` inside each — **both themes are measured, not one and an argument**
  (`design.md` §11.4, `legal.md` §16.6).

  | Row | Drive | Assertions — **every clause of the rule, each with its own failure message** |
  |---|---|---|
  | **residue, first load** | `test.use({ storageState: { cookies: [{ name: "_ga", value: "GA1.1.111.222", domain: "localhost", path: "/", expires: -1 }, { name: "_ga_TEST12345", value: "GS1.1.333", domain: "localhost", path: "/", expires: -1 }], origins: [{ origin: baseURL, localStorage: [{ name: "workload_cookie_consent", value: JSON.stringify({ telemetry: true, timestamp: 0 }) }] }] } })`, then `page.goto("/")` | **count = 1** (`getByRole("region", { name: S1 })`); **`localStorage.getItem("workload_cookie_consent")` is `null`**; **`(await context.cookies()).length` is `0`** — *all* cookies, not a pattern (`legal.md` §6.4) |
  | **residue, second load** | `page.reload()` | **count = 0** — AC13's discriminating row |
  | **clean device** | `test.use({ storageState: { cookies: [], origins: [] } })`, two loads | **count = 0** on both |
  | **dismissal** | on the residue load, `getByRole("button", { name: S6 }).click()` | the region is detached; `page.reload()` leaves count **0** |
  | **space** | scroll the region into view | `document.elementFromPoint` at its centre returns **the region or a descendant of it** |
  | **rendering** | — | `assertLr3Rendering(region)` |
  | **size, bounded on both sides** | — | `width >= Math.min(320, await availableContentWidth(region))` **and** `width <= availableContentWidth(region)`. **Both bounds, because "no overflow" alone is satisfied by an element that collapses inward** — the floor and the ceiling are separate assertions with separate messages |
  | **measure** | — | `assertLr2b(bodyParagraph)` for each of the four `<p>` |
  | **operability** | `page.keyboard.press("Tab")` until the dismiss control is focused | `expect(dismiss).toBeFocused()`, and its accessible name equals **S6** |
  | **order** | — | the region's `compareDocumentPosition` against `#main-content > footer` yields `DOCUMENT_POSITION_FOLLOWING`, and its `boundingBox().y` is **less than** the footer's — DOM order **and** visual order, asserted as two clauses because the axis is a conjunction |

  **The synchronisation barrier for every row, named in the same clause as the drive** (lesson
  **027**): after `goto` or `reload`, wait on the app's own observable reaction — for the residue
  rows, `await expect(region).toBeVisible()`; **for every count-0 row, `await expect(page.getByRole(
  "heading", { name: "Sua Jornada" })).toBeVisible()` first.** A `0` read before hydration is a `0`
  that proves nothing, and it is the vacuous pass `legal.md` §15.3 names. **Never a fixed sleep.**

  **The positive control, printed on every run** (lesson **064**): each count-0 row logs the seeded
  state it started from and the count the residue row produced in the same file. A run whose residue
  row is not **1** invalidates every **0** beside it, and the spec fails rather than passes.
- **Tests:** the two files are the tests.
- **Done when:**
  - `pnpm test __tests__/removal-guards.test.ts` green, **and seen to fail against the unfixed
    state**: run it on a stash that restores `lib/analytics.ts` and confirm every token row goes red.
  - `pnpm exec playwright test tests/e2e/privacy-change-notice.spec.ts` green in both themes, with
    the coverage line printed.
  - **AC3, measured on a production build in an isolated copy on a confirmed-free port, never
    `next dev`, with `rm -rf .next` first because a `NEXT_PUBLIC_*` flag changed:** with
    `NEXT_PUBLIC_GA_ID` set to a **non-empty** value in the environment,
    `grep -rlE "googletagmanager|google-analytics" .next/static | wc -l` returns **0**.
    *(Known-bad, measured `spec.md` E9 at `5c0c6fa`: **1** at `"G-TEST12345"` and **1** again at
    `""` — the flag strips the ID and never the transport.)*
  - **AC12's environment half:** the same build with `NEXT_PUBLIC_ENABLE_ADS="true"` and
    `NEXT_PUBLIC_ADSENSE_ID` set renders **0** `script[src*="pagead2.googlesyndication.com"]`.
  - `pnpm check` clean; `pnpm test:coverage` holds 100 / 100 / 90 / 90 and
    **`git diff vitest.config.ts` is empty** — **AC6**; a threshold edit is a rejection, not a fix.
  - **Advances:** AC1, AC2, AC3, AC4, AC12, AC13, AC6.

---

### T8 — Full-surface verification pass

- **Files:** none — this task writes no source. Its deliverable is the measurement set `qa-engineer`
  and `web-standards-auditor` receive at G6.
- **Depends on:** T7
- **Reuse:** `evidence/measure.mjs`, `evidence/legacy.mjs`, `evidence/residue.mjs`,
  `evidence/surface.mjs` — **the four scripts `spec.md` already used to print every known-bad.** Run
  the same scripts against the delivered build so the two columns are readings of one instrument.
- **What to build:** run each script against the delivered production build in an **isolated copy on
  a confirmed-free port**, never in the repository and never under `next dev` (`AGENTS.md` §4 rule 6;
  `spec.md` § Evidence's own negative result is what a stale server produces). Record, for each:

  | Criterion | Quantity | Known-bad, already measured at `5c0c6fa` | Required |
  |---|---|---|---|
  | **AC1** | requests to the three named hosts, in states S-a / S-b / S-c | 0 / 2 / 3 | **0** in all three, **and `exercised = 8` asserted before the zeroes**, with `exercised + exempt = 8` |
  | **AC1 (widened, `legal.md` §16.1)** | requests to **any** host other than the app's own origin | `["www.googletagmanager.com/gtag/js", "www.google-analytics.com/g/collect"]` → ≥ 2 | **0**. A non-origin host that is **not** a Google one is a **finding routed to `tech-lead` → `0011`**, not a reason to narrow the criterion back |
  | **AC4 / RR1-m** | `localStorage` record, and **the count of all cookies** on the origin, after one load on S-c | `{"record":"{\"telemetry\":true,\"timestamp\":0}","ga":["_ga","_ga_TEST12345"]}` | `null` and **0** |
  | **AC7** | banner count, shield count — fresh and S-c, both themes | fresh `banner=1 shield=0`; S-c `banner=0 shield=1` | **0 / 0 in all four cells** |
  | **AC11** | `position: fixed` elements belonging to the consent surface | 2 | **0**, and the three surviving fixed elements are the header, the tab bar and the journey-reset `<dialog>` — **named, so a count of 3 is not read as a leak** |
  | **AC5** | `git diff --name-only <base>..HEAD` | — | **every path inside the 28-file union + `pnpm-lock.yaml` + A1–A10.** A path outside fails on sight |
- **Done when:** every row above is recorded with its command and its raw output, and **the raw log
  is read rather than a summary of it** (lesson **064**). `pnpm check`, `pnpm test`,
  `pnpm exec playwright test` and `node .agents/tools/docs-check.mjs` all clean.
  **Advances:** AC1, AC4, AC5, AC7, AC11 — and it is the artifact G6 rules on.

---

### T9 — Reconciliation with `0010`, executed at the merge and not before

- **Files:** `tests/e2e/consent-opening-state.spec.ts` — **delete, conditionally** *(**A10**)* ·
  `tests/e2e/first-screen-reachability.spec.ts` — **read only, never edited here**
- **Depends on:** T8, **and on `0010` having merged**
- **Reuse:** nothing.
- **What to build:** at the moment this branch rebases onto a `main` that contains `0010`, run
  `git ls-files tests/e2e/consent-opening-state.spec.ts` and branch on the output — **it is a lookup,
  not a judgement:**
  - **Tracked** → **delete the file** and record the deletion in `STATUS.md` as boundary addition
    **A10**. `legal.md` §17.1.1: `0010`'s **LC1** domain test returns **one** member at `5c0c6fa` and
    **zero** after this change, and *"a guard written for it then passes against any markup
    whatsoever"* — `AGENTS.md` §5 forbids signing a pass against a guard measuring zero instances of
    its subject.
  - **Not tracked** → **delete nothing.** Record in `STATUS.md` a routed precondition on `0010`: the
    file must not merge, because its subject no longer exists (lesson **060** — an untracked file is
    a sibling's live work and is never resolved by deleting it).
  - **Either way**, `git grep -n "DS4_PANEL_SELECTOR\|openPrivacySettings" tests/` names every
    surviving reference. **A reference from a file this spec does not own is not fixed here**: it is
    recorded in `STATUS.md`, routed to the owning spec by name, and `0010`'s
    `first-screen-reachability.spec.ts:527` is expected to be one of them.
- **Tests:** `pnpm exec playwright test` — the whole e2e suite, on the rebased tree.
- **Done when:** the suite is green on the rebased tree, or every failure is attributed **by file and
  by owning spec** in `STATUS.md`. **Advances:** AC5, AC6 — and it is the precondition for G7.

---

### T10 — Documentation reconciliation, at G7 — `release-manager`

- **Owner:** `release-manager` (not `frontend-dev`). Recorded as a task so it cannot be lost — the
  team-lead's instruction for **R6**, and the same for the three items beside it.
- **Files:** `DESIGN.md` · `PRODUCT.md` · `.specs/0001-foundation/copy.md`
- **Depends on:** T9
- **What to build:** four edits, three of them already approved:
  1. **R6** — three sentences in `DESIGN.md` name a component that stops existing (`design.md` §12.3):
     § Typography → *Display* (*"the privacy dialog"*), § Motion → *What animates* (*"cookie
     banner"*), § Motion → *The Same-Path Rule* (*"the cookie banner"*). **The rules themselves do
     not change** — only the enumerations that name a deleted subject.
  2. **R7 — approved.** One sentence in `DESIGN.md` § Typography recording that the prose cap ships
     as **`max-w-prose`** (Tailwind's own `--container-prose`, verified by measurement at **520.5 px
     @1440** and **585.6 px @2560/3840**, implementing the existing *"Capped at 68ch"*).
     **Provenance:** a human approval point under `AGENTS.md` §4, approved by the **team-lead under
     the owner's delegation for this batch**, 2026-09-19, recorded in `STATUS.md`.
  3. **H4** — `PRODUCT.md` §9 gains **two non-claim rows**, pasted verbatim from `copy.md`
     § Disclosures, in the shape of the existing `Banco de horas` row. **`PRODUCT.md` §3 and §8 are
     not touched — H2 stands**, and an agent softening either has breached `spec.md` § Non-goals 8.
  4. **`legal.md` §4.2(d)** — `.specs/0001-foundation/copy.md:87` holds `footer.privacy` with the
     retired claim and is a **rebuild source**: annotate or correct it, or `AGENTS.md` §5's rebuild
     contract re-publishes the retired proposition from `.specs/` alone.
- **Done when:** `node .agents/tools/docs-check.mjs` clean; the two `PRODUCT.md` rows are present
  **only if H4 has cleared**, and their absence with H4 open is a recorded state and not a defect.

---

## Risks

| Risk | The signal it happened |
|---|---|
| **The inline script does not reach the document** — tree-shaken, moved by the App Router, or emitted after `ThemeProvider` | T5's `grep` on the built document returns **0**; or T7's residue row reads `count = 0` with the storage record still present. **Not a reason to add a `setTimeout`** — it is a finding routed to `tech-lead` |
| **A cookie survives the clearing** because it carries an explicit `Domain` or a non-`/` `Path` | T7's `(await context.cookies()).length` is non-zero after one load. **RR1-m's premise (`0011` F7, re-verified at `5c0c6fa`) is what fails, so it routes to `labor-law-analyst`**, never to a locally widened pattern |
| **B1 returns strings that do not fit `design.md` §8's budgets** | A slot overruns its line-box ceiling at 390 when T7 measures it. `design.md` §8 is explicit: **a bounce to `product-designer`, not a smaller font** |
| **G6 rules that *com destaque* requires the first viewport (H6)** | `labor-law-analyst` answers the tenth question of `legal.md` §15.5's pass. **G3 re-opens and redraws**, T6 is rewritten against the new placement, and `design.md` §5.1's four eliminated candidates are the input to that redraw — not this plan |
| **`0010` lands a change to `calculator-views.tsx` or `legibility.ts` that collides with T2/T4/T6** | A conflict at T9's rebase. Expected, bounded and cheap: T4 touches one `<p>`'s text, T2 deletes three named exports, T6 adds one element |
| **Coverage falls below a bar because deleted files carried it** | `pnpm test:coverage` fails at the threshold. **`vitest.config.ts` may not move** — AC6 checks `git diff` on it is empty, and a lowered threshold is a rejection at G6 |
| **AC5 fails on a path nobody put in scope** | A path in `git diff --name-only` outside the 28-file union + `pnpm-lock.yaml` + **A1–A10**. The ten additions above are the complete recorded set; an eleventh is a finding routed to `tech-lead`, recorded by name, never absorbed |
| **The AC10 ad-order guard is dead rather than passing** | T2's falsification run computes `true` with an `ins.adsbygoogle` injected ahead of the `Sua Jornada` heading. That is a **new finding**, not a closed criterion (`spec.md` AC10's own words) |
