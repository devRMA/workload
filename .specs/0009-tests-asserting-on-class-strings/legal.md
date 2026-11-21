# 0009 — Legal basis

> Owner: labor-law-analyst · Gate: `law` (G2) · Run 1 · 2026-09-16

**Verdict: pass.**

This spec computes nothing, moves no number, ships no string and touches no file under `lib/`. Three
of the four rows the `product-manager` routed to me settle as "not a legal dependency", and I say so
plainly rather than inventing an obligation to justify the gate.

**The fourth row is mine, it is blocking, and it is blocking on a narrower ground than the one I was
offered.** `tests/e2e/disclosure-legibility.spec.ts:60` is not a *risk* of going vacuous. Its
selector narrows LR2b's domain by an appearance class **today**, and it has been doing so since
`0006` shipped it: the loop measures 3 of the 5 paragraphs the DS4 consent surface renders, and the
2 it skips are the two that name **which purpose** the consent is for — the subject of LGPD
art. 8º §4º. That is a live finding, not a hypothetical, and it is the same defect lesson **024**
names, on the guard chosen to protect my own rule.

I pass the spec, and I bind the fix with one new rule — **LG1**, §2 — stating what a guard over
LR1–LR4 must satisfy to count as a guard at all. LG1 outlives this spec and applies to every future
disclosure guard.

---

## 0. Scope of this analysis

### Covered

- **The territory question** the spec routes at § Legal dependencies row 4 and § Open questions
  row 3: is a vacuous assertion over a disclosure rule blocking in my domain (§1).
- **LG1** — the falsifiability property a guard over LR1–LR4 must satisfy, stated so a reviewer
  checks it rather than judges it (§2).
- **A7** (`tests/e2e/disclosure-legibility.spec.ts:60`) measured against LG1, with the element counts
  the replacement must assert (§3).
- The four § Legal dependencies rows, each settled with a verdict (§4).
- **A6** (`__tests__/alert-banner.test.tsx:51,54`) — whether the `product-manager`'s narrowing of
  `0006`'s carry stands (§5).
- **`__tests__/copy-guards.test.ts`** — whether the spec's exclusion is sufficient, or whether I
  exercise the line-range override § Out of scope bullet 2 reserves for me (§6).

### Explicitly not covered

- **`lib/` is not re-verified.** The RGPS, RPPS and IRRF tables, the divisor, the night window and
  the DSR reflection were verified at `0003`, `0005`, `0007` and `0008` G6. This spec does not reach
  them, and re-opening them here would be scope I was not given.
- **Test architecture, coverage, and whether a permanent guard should exist.** `AGENTS.md` §3 —
  architecture is `tech-lead`'s at G4, bound by AC10. LG1 is a property any guard must have; it is
  not a requirement that one be built.
- **Citation content.** `0003-citation-registry` owns it and passed its own G2. `0007` owns the
  Súmula 431 attribution. Neither is reopened here.
- **LR3's server-rendered-DOM bullet.** Superseded at `0008` §4.1 and replaced by LR6.1, with the
  human's confirmation recorded 2026-09-16. `disclosure-legibility.spec.ts:32` and `:57` pass
  markers into `assertLr3`; that is `0008`'s object, not this spec's, and nothing here touches it.
- **Whether `0009` should exist.** `PRODUCT.md` §1's user never reads a test. The reader is the next
  gate. That is the `product-manager`'s judgment and I do not second-guess it.

---

## 1. The territory question — A7 is mine, and here is the ground

The `product-manager` asks it straight and offers a ground I decline, then reaches the right answer
by a different route. Both halves matter, because a gate that claims territory on a bad ground has
claimed it badly.

### 1.1 — The ground I decline

§ Legal dependencies row 4 asks whether A7's vacuity is *"a live breach of `PRODUCT.md` §4 name the
gap"*. **It is not, and I will not pretend it is.** §4 binds what the app **shows the user**. A test
that measures nothing shows the user nothing; it neither adds nor removes a word from any screen.
The disclosure at DS4 renders today, legibly, and §4 is discharged by the markup, not by the suite.
Ruling a test file a §4 breach would make §4 mean "anything I would like to be blocking", which is
exactly the failure mode lesson **024** forbids in the opposite direction — a domain drawn from the
defect in view rather than from what the rule says.

### 1.2 — The ground that holds

The obligation A7 sits inside is **mine by the record, not by analogy**:

- `0005` §3 opens with *"`qa-engineer` verifies them at G6 and **I verify them at G6 and G9**"*. I
  am not a consumer of this suite's output; I am one of its two named operators.
- `0005` §3 *How LR1–LR4 fail* already rules on this exact property: *"An assertion that has never
  been red proves nothing… LR1 and LR2 **must be seen to fail** against the unfixed tree."* The
  falsifiability of the LR guard was settled as a law-gate obligation at `0005` and has been in
  force since. A7 is not a new claim of territory. It is the enforcement of one I already made and
  then failed to check for four gates.
- `0006` chose `disclosure-legibility.spec.ts` as the **permanent** guard over LR1–LR4, over a
  cheaper class-string guard, with the reason written down (`0006/STATUS.md`, tech-lead,
  2026-09-15). A permanent guard is the instrument by which a legal rule is known to hold. When I
  sign a `pass` at G6 or G9, the evidence I sign against is this file's output.

**The rule that follows, and it is the general one:** *the verification instrument for a legal rule
is part of the legal rule.* An instrument that can report green while measuring **zero instances of
the rule's subject** is not evidence, and a gate that signs a pass on it has signed nothing. That is
a defect in my own artifact, not a quality defect in someone else's.

### 1.3 — What is therefore **not** mine, stated so the claim is bounded

A gate that claims territory to justify its existence is worse than one that passes (and I passed at
`0004` G2 and `0008` G2 on exactly that reasoning). So:

| Question | Whose |
|---|---|
| Whether A7 can report green while measuring nothing of LR2b's subject | **Mine.** §2, LG1. |
| Which selector, helper or assertion shape achieves LG1 | `tech-lead` at G4, `frontend-dev` at G5. I state the property; I do not design the test. |
| A1–A6's falsifiability | `qa-engineer`. A1 is a dead guard over a **rendering** behaviour (`total === 0`), not over a disclosure. It is the sharpest defect in the spec and **none of it is mine**. |
| Whether a permanent anti-vacuity guard is built | `tech-lead`, AC10. LG1 is a property, not a build order. |
| Coverage, test counts, flakiness, the e2e double-run | `qa-engineer`. |

**Six of the seven inventory rows are `qa-engineer`'s outright.** I claim one clause of one line.

---

## 2. LG1 — what a guard over LR1–LR4 must satisfy to be a guard

**Binding, from this gate onward, on every automated guard whose output is cited as evidence that
LR1, LR2a, LR2b, LR3-as-corrected, LR4 or LR6.1 holds** — in `tests/`, in `__tests__/`, or anywhere
a later gate reads its result. It attaches to the guard, never to a named file, because a rule
written as a list of files is a rule the next guard is written outside of (lesson **024**).

> **LG1 — a guard over a legibility rule must be unable to report a pass without having measured the
> rule's subject.** Four clauses.
>
> **LG1.1 — The iterated set is derived from the obligation, never from an appearance attribute.**
> A guard that iterates a collection of elements selects them by what carries the obligation — the
> surface root from the DS domain, and the elements that render its text — and never by a utility
> class, a token name, a colour, a spacing value or any other presentational attribute. A selector
> that filters by appearance narrows the legal domain by appearance, which is a narrowing no norm
> authorises and no reviewer can see.
>
> **LG1.2 — The size of the iterated set is asserted against a stated expected count, before the
> iteration.** The expected count is written into `legal.md` together with the markup it was
> measured on. **Zero is never a pass**, and neither is "fewer than expected": a collection that has
> shrunk is a subject that has stopped being measured, and it is indistinguishable from a rename
> unless the count is asserted.
>
> **LG1.3 — Every conditional exemption inside the loop is counted, not silent.** Where a clause
> exempts a member — LR2b's single-line-box exemption is the one in force — the guard reports
> `measured + exempt = expected`. A run in which every member is exempt is indistinguishable from a
> run with no members at all unless those three numbers are printed. This is `0006` §3.3's *the
> residual is reported, never absorbed*, applied to the guard instead of to the report.
>
> **LG1.4 — The guard has been seen red against the defect it names**, in an isolated copy, with the
> counts it printed recorded. This is `0005` §3 *How LR1–LR4 fail* restated as a standing obligation
> rather than a one-spec acceptance criterion, and it is the protocol `0009` AC2 already mandates.
>
> **Which clause carries the substance.** **LG1.2** decides the falsifiability verdict and **LG1.1**
> decides the domain verdict; a failure of **either one alone is a reject**. LG1.3 and LG1.4 are
> corroborating: a failure of either alone is a finding with an owner, not a rejection. No borderline
> reading of LG1.3 or LG1.4 decides a verdict on its own.

### 2.1 — Why LG1.2 is a count and not a `>= 1`

A floor of one would have passed A7 on every run since `0006`, including the runs where the class
filter was already skipping two paragraphs. The quantity that discriminates is the **difference**
between what the surface renders and what the guard measured, and only an expected count exposes it.
This is lesson **023**'s shape — a threshold stated without the base it applies to is prose — read
in the counting dimension rather than the geometric one.

### 2.2 — Satisfiability, asked explicitly (lesson **038**)

LG1 widens nothing's domain, but it is a new clause over existing members, so the question is owed
for each clause and each guard now in force:

| Clause | Satisfiable on `disclosure-legibility.spec.ts` as it stands? | Cost |
|---|---|---|
| LG1.1 | **Yes.** DS1's loop (`footer.locator("p")`, line 34) already satisfies it. DS4's (line 60) does not; the fix is to select the same quantity DS1 selects. | One selector. |
| LG1.2 | **Yes**, inside `tests/e2e/disclosure-legibility.spec.ts`, which AC4 permits. | Two `expect` lines. |
| LG1.3 | **Yes**, but not without either a helper change or per-call bookkeeping in the spec file — see §7 F2, where the file-set conflict is routed rather than assumed away. | See F2. |
| LG1.4 | **Yes.** AC2's protocol already produces it. | None. |
| **Does any clause require breaching another binding principle?** | **No.** LG1 reads only rendered geometry, which `PRODUCT.md` §5 already permits the suite to read; nothing leaves the device and no new input is asked of the user. | — |

Recorded because lesson **038**'s point is that the unsatisfiable clause is never the one you
suspect. LG1.3 is the one with a cost, and it is routed rather than demanded.

---

## 3. A7 measured against LG1 — and the live finding

`tests/e2e/disclosure-legibility.spec.ts:60`:

```ts
const captions = await panel.locator("p.text-caption").all();
for (const caption of captions) {
  await assertLr2b(caption);
}
```

### 3.1 — LG1.1: it fails **today**, not on some future rename

`DS4_PANEL_SELECTOR` is `dialog[aria-labelledby='privacy-settings-title'] > div`
(`tests/e2e/support/legibility.ts:16`). The panel it resolves to is the `div` at
`components/organisms/cookie-consent.tsx:96`, and that subtree renders **five** `<p>`, all
unconditional — no data-dependent branch, no `localStorage` gate inside the panel:

| # | `cookie-consent.tsx` | Class | Text | Matched by `p.text-caption`? |
|---|---|---|---|---|
| 1 | `:110` | `text-body font-semibold` | `Cookies Essenciais` | **no** |
| 2 | `:111` | `text-caption text-ink-subtle` | `Necessários para o funcionamento do site.` | yes |
| 3 | `:114` | `text-caption font-semibold text-accent-ink` | `Sempre ativo` | yes |
| 4 | `:122-124` | `text-body font-semibold` (`id="telemetry-consent-label"`) | `Telemetria (Google Analytics)` | **no** |
| 5 | `:126` | `text-caption text-ink-subtle` | `Ajuda a entender como o site é usado.` | yes |

**The loop measures 3 of 5.** The two it skips, #1 and #4, are the strings that name **which
purpose** each toggle governs. LGPD art. 8º §4º requires consent to refer to *finalidades
determinadas* and makes *autorizações genéricas* **nulas** — `0005` §4 is built on that article and
it is why DS4 carries LR4 at all. The finalidade caption is measured; the **purpose it qualifies**
is not. A guard over a consent surface that measures the explanation and skips the subject has the
domain exactly backwards.

`text-caption` is a **type-ramp token** (`app/globals.css:58`, `0.75rem`). Selecting by it is
selecting by font size. The elements that carry LR2b's obligation are the elements that render the
surface's text; DS1's own loop one screen earlier (`:34`, `footer.locator("p")`) selects exactly
that and takes no class. **One quantity across the rule set**: the sibling loop already reads the
right one, and A7 reads a different one with no text saying why it differs or what that buys.

### 3.2 — LG1.2: it fails on the count

`.all()` on a non-matching selector returns `[]` and a `for` loop over `[]` runs zero times. There
is no assertion on the collection's size anywhere in the file, for either loop. The `product-manager`
named this for A7; it is equally true of DS1's loop at `:34`, which would also report green over
zero paragraphs. **Both loops need LG1.2**, and the fix that gives it to only one of them has fixed
the coordinate rather than the rule.

### 3.3 — LG1.3: `assertLr2b` is silent by design, and the silence is uncounted

`tests/e2e/support/legibility.ts:35-40` guards its only `expect` with `if (lineBoxes > 1)`. The
single-line exemption is correct and is `0005` G6 **B3**'s ruling — I am not reopening it. What is
missing is the count: a run where all five paragraphs are single-line prints the same nothing as a
run where the selector matched none. Today, at 1440×900, #1 (18 chars) and #3 (12 chars) are almost
certainly single-line and therefore exempt, so the observable difference between "measured and
exempt" and "never selected" is currently **zero**. That is LG1.3's entire point.

### 3.4 — The counts the replacement must assert, and how they were calibrated

**Calibration method, stated because a number without its measurement is prose.** Both counts were
read from the unconditional JSX of the intended — i.e. **correct** — state, after confirming that
neither subtree contains a conditional, a `.map()` over data, or a `localStorage`-gated branch that
could change the count between runs. They were not derived from the current selector's output, and
not from arithmetic on a token.

| Surface | Selector the guard must iterate | Expected `<p>` count | Where the count comes from |
|---|---|---|---|
| **DS1** — legal footer | `page.locator(DS1_FOOTER_SELECTOR).locator("p")` | **4** | `components/organisms/calculator-views.tsx:74, 78, 82, 89` — four sibling `<p>`, no branch |
| **DS4** — privacy settings dialog | `page.locator(DS4_PANEL_SELECTOR).locator("p")` | **5** | `components/organisms/cookie-consent.tsx:110, 111, 114, 122, 126` — five `<p>`, no branch |

**Where the prose and the count disagree, the count wins.** Two bindings on how they are used:

1. **The counts are confirmed at runtime before they are trusted.** They are read from source by me,
   and a count read from source is a count nobody has rendered (lesson **031**). G5 asserts them
   against the running page; if the rendered count differs from 4 or 5, **the rendered count is
   right and this table is wrong** — correct it here, in `legal.md`, at the gate that found it, and
   say which element the source reading missed. Do not let the implementation absorb the difference
   by writing whatever number makes the run green.
2. **The count is asserted, never used as a filter.** `expect(paragraphs).toHaveLength(5)` is the
   clause. Slicing, `.first()`, or an inequality that tolerates a shrink is not.

### 3.5 — Is widening DS4's loop to all five satisfiable, or does it demand a failure? (lesson **038**, lesson **040**)

**Unknown, and it must be measured before it is binding — which is itself the ruling.** The analysis
that bounds it:

- At **1440×900**, LR2b binds for every disclosure surface (`0006` §3.2). #1 (18 chars) and #4 (29
  chars) are short and sit in a ≤512px dialog; both are expected single-line and therefore exempt
  under the `0005` G6 B3 exemption. Expected effect of the widening at 1440: **none**.
- At **390×844**, LR2b binds only for body text whose computed `font-size` ≤ 12px (`0006` §3.2).
  #1 and #4 are `text-body`, which is larger than `text-caption`'s 0.75rem. **LR2b does not bind for
  them at 390**, and their measured cpl is a **residual to be reported** under `0006` §3.3, not a
  failure.
- Therefore the widening is expected to add **two reported residuals and zero new failures**. That
  is an expectation, not a measurement, and `0009` AC2's own protocol is the instrument that settles
  it.

**Binding on G5 and G6:** if a paragraph newly admitted by the corrected selector **fails** LR2b
where LR2b binds, the route is `0006` §3.3 — report the residual and raise it as a finding — and
**never** to narrow the selector back until the failure disappears. A selector tuned until the suite
is green is the defect this whole spec exists to remove, reintroduced one level up.

---

## 4. The four § Legal dependencies rows, settled

| # | Row | Verdict |
|---|---|---|
| 1 | No user-visible number moves; is AC6's four-directory zero-diff the right boundary? | **Settled — yes, with one addition.** Every user-visible number originates in `lib/` (`AGENTS.md` §8) and is rendered from `app/` or `components/`; AC6 covers all four plus `hooks/`. The seven inventory sites are all under `__tests__/` or `tests/`. **The addition:** two legal-rule constants live **outside** those four directories — `LR2A_CHROME_BUDGET_PX = 32` and the bare `40` at `tests/e2e/support/legibility.ts:15` and `:38`. They are not user-visible numbers, so AC6 is the right boundary for the claim it makes; but they are thresholds I set at `0005`/`0006` and **neither may move under this spec**. Binding: `32` and `40` are byte-identical after this spec, and `tests/e2e/support/legibility.ts` is outside AC4's permitted file set. See §7 F2 for the one case that would need it opened. |
| 2 | Is changing a fixture that quotes a shipped pt-BR string a copy change? | **Settled — no**, and the spec's reasoning is right: the shipped string does not move, so no claim is re-endorsed (lesson **002**'s test, applied and passed). **One correction to the row's framing:** `disclosure-legibility.spec.ts:32` is **not** a fixture. `assertLr3(page, route, footer, "Tudo o que você digita fica salvo apenas neste navegador")` passes a **verbatim substring of a shipped disclosure** (`calculator-views.tsx:75-76`) as the marker a server-HTML assertion searches for. I verified it byte-for-byte against the source today: it matches. Binding: that literal stays byte-identical, and if the disclosure copy ever changes, this marker changes in the same commit. It is not in scope to alter, and a mismatch here fails **loudly** (`toContain` goes red), so it is not an LG1 defect. |
| 3 | Is excluding `__tests__/copy-guards.test.ts` sufficient, or do I name a line range? | **Settled — sufficient. I do not exercise the override; I name no line.** §6. |
| 4 | Is A7's vacuity blocking? | **Settled — yes, blocking, and mine** — on §1.2's ground, not on the `PRODUCT.md` §4 ground the row proposes. §1, §2, §3. |

None of the four returns *"a number or a shipped string is at stake"*. **The spec's premise holds and
it does not return to G1.**

---

## 5. A6 — the `product-manager`'s narrowing of `0006`'s carry **stands**

The spec asks me to rule because `AlertBanner` is the component that renders C2, C3 and C5, which
`0006` §2.2 ruled **are** disclosure surfaces in the LR domain. Having read the assertion
(`__tests__/alert-banner.test.tsx:49-55`), the ruling is short:

- The assertion renders `<AlertBanner … className="mb-6" />` with **no children** and asserts
  `container.firstElementChild?.className` contains `mb-6`. It asserts nothing about a disclosure, a
  number, a citation, or legibility. It is a prop-contract assertion, exactly as `0006` classified
  it, and **nothing in LR1–LR4 or LG1 reaches it.**
- `0006`'s carry — *"the next spec that opens the `AlertBanner` prop API"* — is about the **prop
  API**. Changing which string is passed as a sentinel does not open the prop API; the signature,
  the merge behaviour and the assertion shape are untouched. The narrowing is strictly smaller than
  the carry it narrows.
- **No legal objection. The override stands**, bounded:
  1. The replacement sentinel is a **non-utility string that produces no appearance and exists in no
     stylesheet** — `my-custom`, matching the three siblings the spec's own domain test excludes for
     exactly this property, is the obvious choice and makes four assertions consistent.
  2. It is **not** a pt-BR string and not a token name (`text-caption`, `bg-surface-*`, `--spacing-*`
     or any successor), so it cannot become a utility by a later token addition.
  3. Nothing else in that file moves, per AC4.

This ruling is **not** what makes A6 in scope — clause C3 is, and C3 is the `product-manager`'s
call. I am declining to veto, not granting permission.

---

## 6. `__tests__/copy-guards.test.ts` — the exclusion is sufficient, and the override is not exercised

`0002` settled the *banco de horas* non-claim (`PRODUCT.md` §9) and the descriptor prohibitions in
that file, and `0009` § Out of scope bullet 2 reserves me a line-range override. **I decline to use
it**, for a reason that is checkable rather than deferential: none of the file's assertions meets
clause C1, C2 or C3.

A prohibition guard (*"no source file contains X"*) cannot be vacuous in A1's sense — it is red
whenever the banned string appears and green otherwise, over any markup. I checked the two
legally-bound ones for the *other* vacuity vector, a pinned file that no longer carries the subject:

- `:65-68` — *"`lib/` never calls R$ 8.475,55 the contribution"*. `lib/payroll.ts:24` **still carries
  the claim** and still phrases it correctly (`o teto do salário de contribuição é …`), and
  `lib/legal-tables.ts:41` still holds `8475.55`. The guard reads the file that makes the claim.
  **Live.**
- `:34-56` — the descriptor prohibitions. All five files in `DESCRIPTOR_SOURCES` exist and still
  carry descriptors. **Live.**

`readSource` throws `ENOENT` if a pinned file is deleted, so deletion is loud. The `walkSourceFiles`
guards derive their file set from `SOURCE_ROOTS` and are domain-derived already, and E4 proved the
viewport-unit one red.

**One finding falls out of this check and it is routed, not fixed here** — see §7 F1.

---

## 7. Divergences and findings — instructions to `tech-lead`, never edits by me

| # | Severity | Where | What is wrong | What the norm or rule requires | Route |
|---|---|---|---|---|---|
| **F1** | **medium** | `__tests__/copy-guards.test.ts:6-12` (`DESCRIPTOR_SOURCES`) | The legally-bound descriptor guards read a **hard-coded list of five files**. Two live descriptor surfaces are not in it: `app/custo-da-hora/page.tsx:7-8,12-13` (`description` + `openGraph.description`) and `app/layout.tsx:24-25,35,44` (root `description`, `openGraph`, `twitter`). `app/manifest.ts:7` is a third. The *banco de horas* non-claim and the night-premium completeness prohibition are **unguarded** on all three. | The domain of a disclosure prohibition is a test on what each string **asserts**, never an enumerated list of surfaces — lesson **024**, `applies-to: all`. The guard should derive its file set the way `walkSourceFiles()` does, filtered to files that export metadata, or the enumeration must be justified in writing. | **`tech-lead`, as its own spec.** **Not** fixed under `0009`: the guard is not vacuous (§6), it is under-scoped, and under-scope is none of C1/C2/C3. **Measured, not assumed:** I ran all three regexes over the three unguarded files today — `banned` no match, `saldo`-unscoped `null`, `qualifier` no match on each. **No shipped string violates a non-claim.** This is a coverage gap, not a live defect, which is why it is medium and not blocking. |
| **F2** | low | `tests/e2e/support/legibility.ts:15`, `:38` | `LR2A_CHROME_BUDGET_PX = 32` is named; the LR2b floor `40` is a **bare literal** inside `assertLr2b`. Neither carries the rule it implements anywhere a reader of a failing assertion can see. | `AGENTS.md` §8 permits a norm-citing comment **in `lib/` only**, so a comment here would breach the comment-free guard — the satisfiable form is §8's own *"put the reasoning in the identifier or the test description"*: a named constant, e.g. `LR2B_MEASURE_FLOOR_CPL = 40`, beside the one that already exists. | **`tech-lead` at G4.** Touching this file requires widening AC4's permitted set; that is the `tech-lead`'s decision and it needs a written line in `plan.md`. **If AC4 is not widened, F2 is deferred and LG1.3 is satisfied inside the spec file instead.** The values `32` and `40` do not change either way. |
| **F3** | **blocking** | `tests/e2e/disclosure-legibility.spec.ts:60` | Fails **LG1.1** (domain narrowed by the `text-caption` type token — 3 of 5 paragraphs, skipping the two that name the consent purposes) and **LG1.2** (no count assertion). | §2 LG1; §3.1, §3.4. | **Fixed under `0009`** — the file is in AC4's set and A7 is in the spec's inventory. |
| **F4** | **blocking** | `tests/e2e/disclosure-legibility.spec.ts:34` | DS1's loop is domain-derived (LG1.1 **passes**) but has **no count assertion** — it reports green over zero paragraphs exactly as A7 would. | §2 LG1.2; expected count **4**, §3.4. | **Fixed under `0009`.** Same file, same rule, and fixing only the row the inventory names would fix the coordinate rather than the rule — which is the mistake lesson **035** was written about and which this spec's own `STATUS.md` opens by describing. |
| **F5** | low | `tests/e2e/support/legibility.ts:35-40` | `assertLr2b`'s single-line exemption is silent: measured and exempt are indistinguishable from not-selected. | §2 LG1.3. | **`tech-lead` at G4**, jointly with F2 — same file, same decision about AC4. Not blocking on its own (LG1's substance clauses are LG1.1 and LG1.2). |

**Nothing above is a patch, and I edited no file.** F3 and F4 are the two that block; F1, F2 and F5
are findings with owners.

---

## 8. Tables, worked examples, rounding — **none, and that is a finding of this gate, not an omission**

The template's §Tables, §Worked examples and §Rounding are **empty by ruling**, which is different
from empty by neglect:

| Section | Ruling |
|---|---|
| **Tables** | No bracket, rate, ceiling, divisor, parcela a deduzir or competence year is read, written or moved. No file under `lib/` is touched (AC6), and no file in AC4's permitted set contains a monetary or tax constant. **`lib/legal-tables.ts` is unchanged by this spec and is not reconstructed here** — the rebuild contract for it lives in `0003`, `0005`, `0007` and `0008`, which are the gates that settled those tables. |
| **Worked examples** | This spec computes nothing, so there is no computation to work. The two worked measurements this gate *does* owe are the element counts in §3.4 — 4 for DS1, 5 for DS4 — with their calibration method and the instruction that the rendered count overrules them. |
| **Rounding** | No quantity is rounded. `assertLr2b`'s `characters / lineBoxes` is compared with `>=` at full float precision, and `0005` §3 set that method; it does not move. The `roundedToTwoDecimals` helper at `tests/e2e/support/legibility.ts:104` serves `measureSurface`, which A7 does not call and this spec does not touch. |

---

## 9. Disclaimers the app must show

**None added.** This change renders nothing and computes nothing, so `PRODUCT.md` §4 creates no new
obligation, and the spec's § Disclosure obligations is correct as written.

**One protected, and it is the substance of this whole gate:**

| Disclosure | The obligation | What protects it after this spec |
|---|---|---|
| **DS1** — the legal footer's four paragraphs (`calculator-views.tsx:74-100`), including the *Não entram na conta* gap list and the table-year + source line | `PRODUCT.md` §4 *name the gap*; `AGENTS.md` §9 *where the app cannot be sure, it says so* | `disclosure-legibility.spec.ts:34`, iterating **4** paragraphs, with the count asserted (F4) |
| **DS4** — the privacy settings dialog's five paragraphs (`cookie-consent.tsx:110-126`), two of which name the purposes the consent governs | LGPD art. 5º XII (*informada*), art. 8º §3º, art. 8º §4º (*finalidades determinadas*; *autorizações genéricas* são **nulas**) — `0005` §4, LR4 | `disclosure-legibility.spec.ts:60`, iterating **5** paragraphs, with the count asserted (F3) |

Neither disclosure's **text** moves. What moves is whether anyone is still checking that the user
can read it.

---

## 10. What this gate binds downstream

| Gate | Binding |
|---|---|
| `product-designer` (G3) | Nothing. No pixel, no layout, no token. The gate may close as a no-op, and I am not deciding that it does — `tech-lead` routes. |
| `content-writer` (G4 copy) | Nothing new. **One prohibition:** the `assertLr3` marker literal at `disclosure-legibility.spec.ts:32` is a verbatim substring of DS1's shipped text (§4 row 2) — it does not move under this spec, and if DS1's copy ever changes it changes in the same commit. |
| `tech-lead` (G4 plan) | **F3 and F4 are in the plan or the plan is rejected.** The plan states which of LG1.3/F2/F5 it takes and which it defers, with AC4's file set widened in writing or not at all. AC10's guard reconciliation is `0006`'s object and not mine; LG1 is a property of whatever exists, never an instruction to build a guard. |
| `frontend-dev` (G5) | The corrected DS4 selector is **obligation-derived** (LG1.1), not another class. The counts 4 and 5 are asserted (LG1.2). If the rendered count differs from §3.4, **stop and route it** — do not write the number that makes the run green. |
| `qa-engineer` (G6) | AC2's refuting experiment for A7 is run **against the corrected guard**, and the recorded evidence includes the printed counts, not only red/green. AC3's *"loop body executes zero times"* is the pre-fix record; LG1.2 is what makes that state impossible afterwards. |
| `labor-law-analyst` (G6, G9) | I re-read DS1 and DS4 **rendered**, in both themes, at 390 and 1440, and confirm `measured + exempt = expected` for both surfaces (lesson **031** — a surface I bounded from its source text is a surface I will describe wrongly, and §3.4's counts are exactly that until G6). |

---

## 11. Open questions for the human

| # | Question | Why it is the human's |
|---|---|---|
| **Q1** | **F1** — the descriptor prohibitions in `__tests__/copy-guards.test.ts` guard five files and miss three live descriptor surfaces (`app/custo-da-hora/page.tsx`, `app/layout.tsx`, `app/manifest.ts`). No shipped string violates a non-claim today, measured. Does this open its own spec now, or wait for the next copy change? | It is a coverage gap in a `0002`-settled legal guard, outside `0009`'s domain. Scope is not mine; I route it and name the cost of waiting: the *banco de horas* non-claim is currently unenforced on three surfaces, so a future descriptor edit can reintroduce it silently. |
| **Q2** | **LG1 is new and binding from this gate onward.** It reaches guards written before it. Should the existing guards be swept against LG1 in one pass, or corrected as each is next opened? | A sweep is scope. `0009` corrects the two loops in `disclosure-legibility.spec.ts` because they are the only guards over LR1–LR4 that exist; if another is written later, LG1 binds it at its own gate. I flag the choice rather than assume the cheaper one. |

---

## Out of scope

Binding on every downstream agent. An agent that changes something listed here has broken this gate.

| Excluded | Why | What happens instead |
|---|---|---|
| Every table, rate, bracket, ceiling, divisor and competence year in `lib/` | Not reached by this spec; AC6 proves it with an empty diff | Unchanged, uncited here, verified at `0003`/`0005`/`0007`/`0008` |
| `LR2A_CHROME_BUDGET_PX = 32` and the LR2b floor `40` | `0006` §3.2 set both, with their calibration | Byte-identical after this spec, whatever else moves in that file |
| The `0005` G6 **B3** single-line-box exemption | Correct, and reopening it is not this spec's object | Unchanged; LG1.3 asks only that it be **counted**, never that it be removed |
| LR3's superseded server-render bullet and LR6.1 | `0008`'s object, confirmed by the human 2026-09-16 | Untouched |
| The shipped text of DS1 and DS4 | No copy change is in this spec | Byte-identical, including the `assertLr3` marker literal |
| The `__tests__/copy-guards.test.ts` line-range override | Not exercised — §6 | No line of that file is named by this gate; it stays fully out of scope |

---

## Known imprecisions

Only the human accepts a known legal imprecision, and the acceptance is recorded here.

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|
| The expected counts in §3.4 (DS1 **4**, DS4 **5**) are read from unconditional JSX, **not from a rendered page**. | None on any user-visible number. The risk is that a binding count is wrong, which §3.4 clause 1 makes self-correcting: G5 asserts it at runtime, and a mismatch corrects **this file** rather than the assertion. | Not accepted — **it is discharged at G5/G6**, not carried. | Recorded 2026-09-16 |
| §3.5's expectation that widening DS4's loop adds two residuals and zero failures is **an analysis, not a measurement**. | None on any user-visible number. If it is wrong, the route is `0006` §3.3 — report the residual, raise the finding — and never to narrow the selector. | Not accepted — **measured at G5**, per AC2's protocol. | Recorded 2026-09-16 |

No imprecision on this spec requires human acceptance, because no number moves.
