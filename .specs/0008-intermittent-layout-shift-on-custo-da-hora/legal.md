# 0008 — Legal basis

**Verdict: `pass`.**

> Owner: labor-law-analyst · Gate: `law` · Run 1 · **Blocking — no design, copy, or code starts
> before this passes.**

This spec computes nothing and changes no number, so the usual body of this document — tables,
brackets, rounding, orders of operation — is empty by construction, and §9 says so rather than
leaving the reader to infer it. What this gate owes is a ruling on five named dependencies and on
one question the `tech-lead` put directly: **does a disclosure that renders and then moves 511 px
down the page still satisfy LR3?**

**The short answer, stated plainly so nobody has to read the rest to act on it.** On the measured
evidence, the 0.5452 event does not touch a disclosure obligation: at the moment it fires, **no
disclosure surface is inside the viewport on either route, in any of the four storage states I
rendered**, and four of the six are not in the DOM yet. CLS here is a quality metric with no legal
dimension, and I set no stability clause, no geometric floor on displacement, and no ceiling on how
far a disclosure may move. Manufacturing one would forbid the correct behaviour of every load: on a
healthy `/` load scoring **CLS 0.0013**, the footer carrying all four `PRODUCT.md` §4 disclosures
moves **474.2 px**, and it is right that it does.

**The long answer is that the same measurement found a hole, and it is not the one I was asked
about.** LR3 requires every disclosure surface to be "present in the server-rendered DOM (not
injected on an event)". I fetched the deployed HTML: `Súmula 172`, `Súmula 431` and `art. 59 da
CLT` return **0 occurrences on both routes**. Four of the six disclosure surfaces this product ships
are not in the server-rendered DOM at all, and cannot be, because they are conditional on inputs
that `PRODUCT.md` §5 keeps on the device. **LR3 as written has been false since the day I wrote
it**, and a downstream agent reading it literally would either reject a correct build or build a
remedy that uploads the user's salary to make the rule true. §4 corrects it. That correction, and
the single clause **LR6** that replaces the part of LR3 that was doing real work, are the only
obligations this gate creates.

---

## 0. Scope of this analysis

### Covered

- **L1–L5** of `spec.md` § Legal dependencies, each settled in §3.
- Whether the shift event described in `spec.md` § Problem violates any disclosure obligation (§2).
- **LR3, corrected** (§4.1) — the clause on server-rendered presence, which the deployed bytes
  refute.
- **LR6** (§4.2) — one new binding clause, co-presence, which is what LR3's first bullet was
  reaching for and failed to express.
- The four items in `spec.md` § Disclosure obligations, ruled one by one (§5) — one of them is
  measured vacuous and struck.
- What this gate forbids the remedy from doing to a string (§6).

### Explicitly not covered

- **The cause of the shift.** `spec.md` AC3 owns it and is right to. Nothing in this document names
  an artefact, a mechanism or a condition, and no clause below becomes unverifiable if the cause
  turns out to be anything in particular (lesson **032**).
- **`lib/legal-tables.ts`, `lib/payroll.ts`, `lib/night-shift.ts`, `lib/weekly-rest.ts`,
  `lib/compliance.ts`.** Verified at this gate four times across `0002`, `0005` and `0006`. This
  spec does not reach them, changes no value they produce, and re-verifying them here would be
  ceremony. The one thing I did check is that the strings `lib/compliance.ts` emits still render —
  §1.4 — because lesson **031** says a surface I report on is a surface I rendered.
- **Rendering mechanics, grid behaviour, reserved height, `min-height`, `content-visibility`.** I
  rule on what the user is owed, not on how a column is laid out. `product-designer` owns G3.
- **Whether the defect reaches production.** `spec.md` AC7 decides it by measurement and E5 already
  establishes the two hosts are different artifacts. I use the **branch-alias preview** throughout
  and say so in every row; I make no claim about `workload.devrma.com` (lesson **032**,
  obligation 1).
- **X1**, carried four times, now in its own spec. Not re-triaged here.
- **DS4**, the consent dialog. Read from source this session: `CookieConsent` mounts at
  `app/layout.tsx:65`, **outside `#main-content`** and outside the grid this spec touches. LR4 is
  untouched and out of scope.
- **The `p-1.5` / `gap-1` inset**, `design.md` I7, and `0004`'s LCP budget. Ruled out of scope by
  `spec.md`, correctly.

### How the measurements below were taken

Every number in §1 was produced in this session by a probe I wrote, against the **branch-alias
preview** `workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app`, at **390×844**,
**dark**, **4× CPU throttle**, Playwright + Chromium — the same instrument `spec.md` E6 records.
The working tree was not mutated and nothing was built: the probes are read-only network clients,
they live in this spec's gitignored `evidence/`, and no `.next` was written (`AGENTS.md` §4,
rule 6).

**Geometric quantities, named exactly.** Where I write `top` I mean
`element.getBoundingClientRect().top + window.scrollY` — the **border box**, in document
coordinates, no scroll performed by the probe so the two frames coincide. Where I write `h` and `w`
I mean `getBoundingClientRect().height` and `.width`, border box. One quantity across every row
below; `vtop` is the same box's viewport-relative `top`, reported only where the fold is the
question.

| Probe | What it produced |
|---|---|
| `evidence/g2-ds-stability.mjs` | per-animation-frame box of the column, of every `[role=alert]`/`[role=status]` in `#main-content`, and of each `footer > p`, over 4,000 ms, 6 loads |
| `evidence/g2-ds-stability2.mjs` | the same with presence intervals and four seeded states (`journey`, `alerts`, `incoherent`, `empty`) |
| `evidence/g2-copresence.mjs` | the first animation frame at which each disclosure's body text and each qualified claim's text appears in `document.body.innerText`, 3 loads |
| `evidence/g2-enumerate.mjs` | the full set of live regions inside `#main-content` on both routes |
| `curl` on both routes | which disclosure strings exist in the server-rendered bytes |

---

## 1. What I measured, before I ruled

### 1.1 — Where the disclosure surfaces actually sit relative to the shifting box

Read from source this session, not inferred (lesson **034**):

| Surface | Source | Inside `DIV.lg:col-span-7`? |
|---|---|---|
| **DS1** — the four footer `<p>` | `calculator-views.tsx:73-101` | **No.** The `<footer>` is a *sibling* of the `<AnimatePresence>` that renders the calculators, inside `#main-content` and **below** `CalculatorLayout`'s grid. |
| **DS2** — the DSR caption | `day-summary.tsx:232-236`, via `work-calculator.tsx:196` `main=` | Yes, on `/` |
| **DS3** — *Informe o seu salário bruto* | `salary-calculator.tsx:123-127`, via `salary-calculator.tsx:75` `main=` | Yes, on `/custo-da-hora` |
| **DS5** — *Informe a carga horária mensal* | `salary-calculator.tsx:129-140` | Yes, on `/custo-da-hora` |
| **DS6** — *A carga mensal não combina…* | `salary-calculator.tsx:142-155` | Yes, on `/custo-da-hora` |
| **DS7** — the compliance warnings | `day-summary.tsx:250-254`, `detail` from `lib/compliance.ts:31-66` | Yes, on `/` |
| DS4 — the consent dialog | `cookie-consent.tsx:85`, mounted at `app/layout.tsx:65` | No — outside `#main-content` entirely. Out of scope. |

**This corrects the premise of `spec.md` § Legal dependencies**, which says "the column that shifts
contains disclosures" and places L3/L4's footer "inside the same `#main-content` subtree". The
second half is right and the first is not: **DS1 is not in the column.** It is *downstream of it in
flow*, which is why every change to the column's height relocates it. The distinction matters
operationally: a remedy bounded to the nine files of `spec.md` § Scope item 5 can move DS1 by
hundreds of pixels **without editing the file DS1 lives in**, and a reviewer looking only at the
diff will not see it. §5 is written so that it is measured anyway.

### 1.2 — Four of six disclosure surfaces are absent from the server-rendered HTML

`curl -s <preview>/<route> | grep -c`, this session, both routes:

| Marker | Surface | `/` | `/custo-da-hora` |
|---|---|---|---|
| `Tabelas de INSS e IRRF` | DS1 P4 (the table-year citation, **L3**) | **1** | **1** |
| `Não entram na conta` | DS1 P3 (the omissions paragraph, **L4**) | **1** | **1** |
| `Súmula 172` | DS2 | **0** | 0 |
| `Súmula 431` | DS6 | 0 | **0** |
| `art. 59 da CLT` | DS7 | **0** | 0 |
| `Informe o seu sal` | DS3 | 0 | 1 |
| `Resumo do Dia`, `Hora extra`, `Trabalhado at`, `DSR` | the numbers DS2 and DS7 qualify | **0** | — |

The last row is the one that decides **L5**. It is not only the disclosures that are missing from
the server bytes — **the entire `DaySummary`, with every number in it, is missing too.** The server
does not know the user's journey and must not: `PRODUCT.md` §5, *offline and private*, "no upload
of anyone's salary. This is not a feature to be traded away later."

### 1.3 — Co-presence, measured at animation-frame resolution

`evidence/g2-copresence.mjs`, `/`, seeded journey (entry 08:00, lunch 12:00–12:30, exit 19:30,
`workMinutes` 528, `grossSalary` 4200, `monthlyHours` 220), 3 loads. Each cell is
`Math.round(performance.now())` at the first animation frame whose `document.body.innerText`
contains the marker.

| Load | `NUM_anyDuration` | DS1 P3 | DS1 P4 | `NUM_dsrRow` | DS2 | DS7 art. 59 title | DS7 art. 59 detail | DS7 art. 71 title |
|---|---|---|---|---|---|---|---|---|
| 1 | 575 | 575 | 575 | 1588 | 1589 | 1589 | 1589 | 1589 |
| 2 | 149 | 150 | 150 | 445 | 445 | 445 | 445 | 445 |
| 3 | 129 | 129 | 129 | 419 | 419 | 419 | 419 | 419 |

**Frame delta is 0 in all 6 observations.** The 0–1 ms differences are sequential `performance.now()`
calls inside one `requestAnimationFrame` callback, not separate frames. **There is no frame in
which a claim is on screen and the disclosure that qualifies it is not.** This is the worked
measurement of the state I consider correct, and **LR6.1 is calibrated on it** — not on arithmetic.

### 1.4 — Every LR-domain surface rendered, and its box (lesson 031)

Six rows, six surfaces, none filled from source text. Viewport 390×844, dark, 4× throttle, deployed
preview. `vtop` is viewport-relative; the fold is at **844**.

| Surface | State that renders it | First present | `vtop` in the settled frame | `h` | `w` |
|---|---|---|---|---|---|
| DS1 P1 | any | 94–242 ms (server HTML) | 1855.7 → 2967.9 | 52.2 | 358 |
| DS1 P2 | any | same | 1915.9 → 3028.1 | 52.2 | 358 |
| DS1 P3 | any | same | 1976.0 → 3088.3 | 139.1 | 358 |
| DS1 P4 | any | same | 2123.2 → 3235.4 | 34.8 | 358 |
| DS2 | `/`, seeded journey with overtime | 419–1589 ms | 2402.8 | 52.2 | 308 |
| DS5 | `/custo-da-hora`, `monthlyHours=0` | 520–549 ms | 1363.9 | 123 | 308 |
| DS6 | `/custo-da-hora`, `monthlyHours=240` vs `workMinutes=480` | 507–521 ms | 1245.5 | 185 | 308 |
| DS7 art. 59 | `/`, seeded journey, overtime > 120 min | 419–1589 ms | 2478.9 | 186 | 308 |
| DS7 art. 71 | `/`, seeded journey, lunch 30 min | 419–1589 ms | 2688.9 | 206 | 308 |
| DS7 art. 66 | previous `lastExit` < 11 h before entry | **not reached** — see §8, Q3 | — | — | — |
| DS3 (not LR domain) | `/custo-da-hora`, empty storage | 99–203 ms (server HTML) | 1216.9–1293.1 | 123 | 308 |

**Three facts fall out of this table and each of them decides something below.**

1. **Every disclosure surface on both routes is already below the fold at 390×844**, in the
   correct, settled state, in every storage condition. The smallest `vtop` measured anywhere is
   **1245.5**, and the viewport is 844 tall. This is what strikes `spec.md` § Disclosure obligations
   item 2 (§5.2).
2. **DS2, DS5, DS6 and DS7 are not present at first paint.** They first appear 419–1589 ms into the
   load, in the same frame as the claim they qualify (§1.3). This is what refutes LR3's first
   bullet (§4.1) and settles **L5** (§3.5).
3. **DS1 moves, legitimately, on every load.** Measured net displacement of `top` between the first
   and last sampled frame: **+474.2 px** on `/` seeded (CLS **0.0013**), **−194.6 px** on
   `/custo-da-hora` seeded (CLS 0.0481), **+70.8 px** on `/custo-da-hora` with `monthlyHours=0`
   (CLS 0.0775), **+14.4 px** on `/custo-da-hora` incoherent (CLS 0.0481). This is what forbids a
   stability clause (§2.2).

### 1.5 — What the shift looks like in the same run

The 0.5452 event did not fire in any of my 18 loads, which is consistent with `spec.md`'s one in
six and is why AC1 exists. What fired repeatedly is the deterministic hero event `design.md` **I7**
already accepts, and one intermittent companion:

```
SHIFT t=516  v=0.0481  DIV.lg:col-span-7.space-y-8 595,249->547,297 | DIV.pt-6.lg:pt-8 452,76->404,91 | ...
SHIFT t=209  v=0.0342  DIV.lg:col-span-7.space-y-8 520,324->595,249 | svg 830,14->0,0
SHIFT t=547  v=0.0775  DIV.lg:col-span-7.space-y-8 595,249->519,325 | DIV.pt-6.lg:pt-8 452,47->376,91 | ...
```

I record these because they are what my probe printed and `AGENTS.md` §5 asks for what was run, not
for what was expected. **I name no cause for any of them**, including the 0.0342 at t=209 that
`design.md` I7's four numbers do not cover. If it matters, it is AC1's output and AC3's problem.

---

## 2. The question I was asked: does LR3 have a stability hole?

The `tech-lead` framed it exactly right and did not ask me to agree: *a surface that is present,
visible, and then moves 511 px down the page is present by every test LR3 contains, and may be, in
practice, gone.* Lesson **018** exists because a rule about DOM position cannot see a string that
renders unreadably; a string that renders and then relocates would be the third case.

**My answer is no, and I want to be precise about why, because "no" is the easy answer and it is
also the one a gate under schedule pressure reaches for.**

### 2.1 — The event does not reach a disclosure, measured

Three facts, each measured in §1, and all three have to be false for the conclusion to change:

1. **At the moment the shift fires, four of the six surfaces do not exist.** The event is recorded
   at **t = 367 ms** in `spec.md`'s evidence; my own runs put the companion events at
   **t = 209–547 ms**. DS2, DS5, DS6 and DS7 first appear at **419–1589 ms** (§1.3, §1.4), and they
   are absent from the server bytes (§1.2). A shift cannot displace an element that is not in the
   layout.

   **`0004`'s X6, handed in to `STATUS.md` while this gate was measuring, narrows the window
   further and I have folded it in rather than leaving it for G6.** Its 80 loads put all five
   reproductions at **t = 188–304 ms**, and isolate the trigger to **seeded storage on
   `/custo-da-hora`, 5/20**, with the other three cells at 0/20 and the empty-storage cell at
   `CLS = 0` exactly. That is the state I rendered as `seeded` in §1.4, and in it the **only**
   surfaces in the DOM before 304 ms are **DS1**, at `vtop` 1855.7–2123.2, and **DS3**, at 1216.9,
   which `0006` §2.3 ruled carries no obligation. DS5 and DS6 require inputs the seeded state does
   not contain; DS2 and DS7 are on the other route. **In the one cell where the defect reproduces,
   the set of LR-domain surfaces that are both in the DOM and in the viewport when it fires is
   empty.** The new evidence makes the ruling stronger, not weaker, and I record that it was read
   because a routed number that arrives mid-gate and is not read is a number the next gate will
   assume I saw.
2. **The two that do exist are not in the viewport.** DS1's four paragraphs sit at `vtop`
   **1855.7–2123.2** in the pre-settled frame, with the viewport 844 px tall. DS3 sits at
   **1216.9–1293.1**, and DS3 is not in the LR domain anyway (`0006` §2.3). At 390×844 the user is
   looking at rows 0–844 and every disclosure is at least **401 px** below the last one of them.
3. **Nobody is reading at 367 ms.** `PRODUCT.md` §10 gives the user ten seconds to reach the number.
   The interval this defect occupies is the interval before the page has finished becoming itself,
   and `0004` §2.2 already ruled on exactly this class: the pre-hydration frame is not a wrong
   answer, it is a correctly-cited answer to a different question. That ruling held at `0004` G3,
   G6 and G9 and I am not reopening it from the other side.

The user harm here is real and it is `PRODUCT.md` §10's — they aim at a field and it moves. It is
not `PRODUCT.md` §4's. **A gate that manufactures a rule to justify its own existence is worse than
one that passes**, and §4 of `AGENTS.md` gives me a veto precisely so that I spend it on the number
and not on the column.

### 2.2 — And a stability clause would forbid the correct build

This is the harder half, and it is why I would refuse a stability clause even if §2.1 were closer.

Displacement of a disclosure is **not** a proxy for anything. Measured on the current, correct,
settled build (§1.4, fact 3):

| Route | State | Session CLS | DS1 net displacement of `top` |
|---|---|---|---|
| `/` | seeded journey | **0.0013** | **+474.2 px** |
| `/custo-da-hora` | seeded | 0.0481 | **−194.6 px** |
| `/custo-da-hora` | `monthlyHours=0` | 0.0775 | **+70.8 px** |
| `/custo-da-hora` | incoherent divisor | 0.0481 | **+14.4 px** |

The **healthiest** load in the set — CLS 0.0013, seventy-seven times under the threshold — moves the
disclosures **the furthest**, by a factor of thirty-three over the worst-scoring one. That is not
noise and it is not a defect: it is `DaySummary` mounting with the user's restored journey and
pushing the footer down, which is the app working. Any floor on disclosure displacement calibrated
to catch 511 px would fire on 474 px, and the remedy for *that* would be to stop mounting the
journey summary.

This is the same error the `tech-lead` warned against — "so it does not silently forbid every
legitimate reflow" — and the measurement shows it is not a hypothetical. **CLS and disclosure
displacement are uncorrelated in this app, in both directions**, so neither can stand in for the
other, and the honest consequence is that I bind neither.

### 2.3 — Where the hole actually is, and it is not stability

The same probe that refutes the stability hypothesis found a real one, and it is the **time axis
rather than the space axis**.

LR3's first bullet — *present in the server-rendered DOM (not injected on an event)* — is **false
today for DS2, DS5, DS6 and DS7**, refuted by `curl` on the deployed bytes (§1.2), on a build that
has passed this gate three times. I wrote that clause at `0005` against an enumerated domain of
four surfaces, three of which happen to be server-rendered; `0006` widened the domain by a test and
**I did not re-run the clause against the surfaces the widened domain returned.** That is lesson
**024**'s "run it backwards" step, skipped, and lesson **022**'s crossing owed in the other
direction: I ruled a guard over a class of string without executing it against every string then in
the class.

What makes it worth correcting rather than quietly dropping: the clause is not merely unmet, it is
**unmeetable without breaking `PRODUCT.md` §5.** DS2, DS5, DS6 and DS7 are conditional on
`localStorage`. To put them in the server-rendered DOM, the user's salary and journey would have to
reach the server. A downstream agent reading LR3 literally and trying to satisfy it has exactly two
moves, and one of them is a privacy breach dressed as compliance. **That is the defect a gate is
supposed to catch before a developer meets it**, and it is the reason this gate was not a
formality.

### 2.4 — What LR3's first bullet was reaching for

Not "server-rendered". It was reaching for **the user must never be shown the claim without the
qualification** — which is `PRODUCT.md` §4's own words, "the app says so, visibly, **next to the
number**". Read that way, the obligation is *relational*: it attaches to the frame in which the
qualified claim renders, not to the first frame of the document. §4.2 states it that way, §1.3
measures it, and the current build satisfies it at animation-frame resolution in 6/6 observations.

---

## 3. L1–L5, settled

`spec.md` names five dependencies and states them rather than asserting them, which is the correct
shape. Each is answered here, and each answer is **binding on G3, G4 and G5**.

### 3.1 — L1 · the disclosure rule governing the alerts inside the shifting column

**Settled: the rule is `0006` §2.1's three-clause test, applied to the instance and never to the
component, and the surfaces it returns inside the column are DS2 and DS7 on `/`, DS5 and DS6 on
`/custo-da-hora`. DS3 is not one of them.**

`spec.md` L1 says "`salary-calculator.tsx`'s three `AlertBanner`s" as though all three were
disclosures. They are not, and the distinction survives a remedy that touches all three. Reproduced
from `0006` §2.2 and re-read from the module this session:

| Instance | Test result | In the domain? |
|---|---|---|
| `salary-calculator.tsx:123-127` — *Informe o seu salário bruto* | no clause | **No.** `R$ 0,00` is the arithmetic identity of an absent input and the string exists to withdraw a claim, not to make one. |
| `salary-calculator.tsx:129-140` — *Informe a carga horária mensal* | **(a) cite** — states the divisor 220 for the 8h48 jornada | **Yes — DS5** |
| `salary-calculator.tsx:142-155` — *A carga mensal não combina…* | **(a) cite** — attributes a divisor to Súmula 431 do TST | **Yes — DS6** |
| `day-summary.tsx:232-236` — the DSR caption | **(a) cite**, **(b) gap** — Súmula 172 do TST; names what the estimate excludes (feriados) | **Yes — DS2** |
| `day-summary.tsx:250-254` — the compliance warnings, from `lib/compliance.ts:31-66` | **(a) cite**, **(b) gap** — arts. 59, 66, 71, 71 §1º, Súmula 376; each names *an amount owed to the user this app does not compute* | **Yes — DS7** |
| `journey-form.tsx:172-182` — *Confira seus horários*, `issue.message` from `lib/journey.ts:19-36` | no clause — eight chronological validation strings | **No** |

**So the ruling for the remedy is:** a remedy may treat all of them identically as a matter of
craft, and `PRODUCT.md` §5 says it should. But **only DS2, DS5, DS6 and DS7 carry my veto.** An
agent under schedule pressure must be able to tell a legally binding criterion from the product's
own bar, and saying so is what keeps the veto narrow enough to be worth having (lesson **024**).

### 3.2 — L2 · does `0004`'s LR5 bind this spec's column?

**Settled: no. LR5 binds exactly two surfaces and neither is in the column.**

LR5's domain is a test, not a list: *every rendered string whose value is seeded from a module
default and later replaced by a value read from `localStorage` on the same page load.* I ran the
test over this spec's surfaces this session:

- **HS1 / HS2** — the hero numeral, `p[aria-live="polite"].numeric`, in
  `CalculatorLayout`'s **`aside`**, not its `main`. Measured this session on `/custo-da-hora`:
  `R$ 0,00` → `R$ 3.807,40`, two values, LR5.1–LR5.3 hold. Unchanged.
- **DS2, DS5, DS6, DS7** — these do not *replace a default value*; they **mount or do not mount**.
  Their text never takes a second value. The test returns false.
- **DS3** — this one is interesting and still returns false. Measured: it is in the server bytes,
  visible from 99 ms, and **removed** at 475–490 ms when the restore lands. It transitions
  present → absent, not value → value. LR5 is a rule about *which number a string shows*; a string
  that is correctly withdrawn when the input it complains about arrives is the app working, and
  `0006` §2.3 already ruled it carries no obligation at all.

**Consequence for AC5.** `spec.md` AC5's hero exemption, bounded at 60.4 px at 390 by `design.md`
I7, stands untouched by me. LR5 is a condition on *text*, I7 is a condition on *geometry*, and
neither reaches the other. AC8 is the right instrument for I7 and it is not mine.

**One thing LR5 does bind here**, and it is the clause with the substance: **LR5.4** — *no
`localStorage` key that the calculators read is written before the restore completes*. Any remedy
that moves, delays, splits or memoises the restore path in `hooks/use-salary-calculator.ts` or
`hooks/use-work-calculator.ts` — which `spec.md` § Scope item 6 explicitly permits where the
diagnosis names them — is inside LR5.4's blast radius. A violation destroys a returning user's
stored inputs, and `0004` §8.1 **F1** records that LR5.4 has never been asserted by a running
check. **If the remedy touches either hook, F1 stops being a carried finding and becomes a
precondition**: the unit check `0004` specified must exist and must be seen red before the remedy
lands. That is a routing instruction for `tech-lead`, not an edit by me.

### 3.3 — L3 · the footer citation line

**Settled: DS1 P4 carries `PRODUCT.md` §4's third commitment — "the year is part of the answer" —
and the obligation is content and legibility, not position.**

Read from the rendered page this session, not from source: the line renders the year and effective
date from `CURRENT_LEGAL_YEAR` (`lib/legal-tables.ts`, via `calculator-views.tsx:95-107`) with a
live link to the source. It is in the server bytes on both routes (§1.2, `Tabelas de INSS e IRRF`
= 1/1), present from 94–242 ms, `w` **358**, `h` **34.8**.

The obligations that bind it after a remedy are the ones already in force — **LR1** (`width ≥ 320`),
**LR2a** (occupancy), **LR2b** at 1440 and, because its computed `font-size` is ≤ 12px, at 390 too,
and **LR3** as corrected. **Position is not one of them**, and `spec.md` L3's worry — "a remedy that
reserves or redistributes height could violate a visibility or position obligation" — is answered:
there is no position obligation on DS1 beyond being in the document without interaction. It has
moved between 14.4 and 474.2 px on correct builds for as long as this app has existed. What a
remedy may not do is make it **narrower**, and LR1/LR2a already say so, at a number.

### 3.4 — L4 · the omissions paragraph

**Settled: identical to L3, same subtree, same rules, and it is the sharpest of the four.**

DS1 P3 is the `PRODUCT.md` §4 "name the gap" paragraph — FGTS, convenção coletiva, 13º, terço de
férias, INSS/IRRF sobre horas extras, Súmula 60, feriados, *valor do intervalo suprimido*,
insalubridade/periculosidade, and the RPPS-federal-only caveat on the Estatutário regime. Measured:
`w` **358**, `h` **139.1**, in the server bytes on both routes.

It is the one surface whose loss would be materially misleading rather than merely incomplete,
because several of its items name amounts a user could otherwise believe are inside the number on
screen. LR1, LR2a and LR2b bind it at both viewports and both themes, unchanged. **No remedy may
reduce its rendered width or its measure**, and a remedy that reflows the column must re-measure it
rather than reason about it (§5.1).

### 3.5 — L5 · must a disclosure render in the pre-hydration frame?

**Settled: no — and the rule that said yes is corrected in §4.1. The obligation is co-presence with
the claim, not presence at first paint.**

This is the dependency `spec.md` was right to name, and it is the one with a real answer.

The argument, from the measurements and not from taste:

1. **The premise is refuted by the bytes.** Four of six surfaces are absent from the
   server-rendered HTML today (§1.2), on a build that shipped through this gate three times.
2. **It cannot be met without breaking a product principle.** `PRODUCT.md` §5: *"Everything the
   user types stays in `localStorage`. No account, no backend, no upload of anyone's salary. This
   is not a feature to be traded away later."* A server that could render DS7 is a server that
   knows the user's journey.
3. **The claims are absent in the same frame.** This is what makes the answer clean rather than a
   concession. It is not that the disclosures arrive late while the numbers are already up — **the
   whole `DaySummary`, numbers included, is absent from the server bytes too** (§1.2, last row),
   and the disclosure and its number appear in the **same animation frame**, 6/6 (§1.3). Nobody is
   ever shown the claim without the qualification. `PRODUCT.md` §4's "next to the number" is
   satisfied in time as well as in space.
4. **Therefore the obligation attaches relationally.** A disclosure must be present in every frame
   in which the claim it qualifies is present. Where the claim is server-rendered — DS1, which
   qualifies output present at first paint — the disclosure must be server-rendered, and it is.
   Where the claim is client-only, the disclosure may be client-only, and must arrive with it.

**This is falsifiable and it reproduces the rulings it descends from** (lesson **024**): applied to
DS1 it returns "must be in the server bytes" — which is `0005` LR3's ruling, and which the bytes
confirm. Applied to DS4 it returns the same, and DS4 is a consent surface whose trigger is the
document itself. Applied to DS2/DS5/DS6/DS7 it returns "must arrive with its claim", which the
build satisfies and LR3-as-written did not permit. A test that could not reproduce the old rulings
would be a new rule wearing an old name; this one reproduces all of them.

---

## 4. The binding rules this gate creates

Two things, and no more. **LR1, LR2a, LR2b, LR4 and LR5 stand word for word** as they read at
`.specs/0005-…/legal.md` §3, as corrected by `.specs/0006-…/legal.md` §3, and at
`.specs/0004-…/legal.md` §3. Their measured values on the current deployed head, read this session
so that a regression has a baseline to be measured against:

| Surface | `font-size` | LR1 — `getBoundingClientRect().width` ≥ 320 | LR2a — `rootW − bodyW` ≤ 32 |
|---|---|---|---|
| DS1 P1 | 12px | **358** ✓ | n/a (not a banner) |
| DS1 P2 | 12px | **358** ✓ | n/a |
| DS1 P3 | 12px | **358** ✓ | n/a |
| DS1 P4 | 12px | **358** ✓ | n/a |
| DS3 (not LR domain, measured as the control) | 14px body | 308 | **26** |

DS1's body text is **12px**, measured, which is the ≤ 12px population `0006` §3.2 names — so
**LR2b binds DS1 at 390 as well as at 1440**, and its 52.4–56.7 cpl must not regress.

### 4.1 — LR3, corrected

**Binding. This supersedes LR3's first bullet at `.specs/0005-…/legal.md` §3 for every surface,
including DS1 and DS4. LR3's remaining four bullets stand unchanged, word for word.**

> **Human-confirmed, 2026-09-16. Read this before applying the rule.** This correction rules that
> **the rule is wrong and the code is right**, which is the opposite of `AGENTS.md` §8's default
> direction — *when the code and `legal.md` disagree, the code is wrong until a human says
> otherwise*. It was raised as §8 **Q2** rather than taken quietly, and **the human confirmed the
> inversion**, on the ground this gate gave: satisfying LR3's old bullet literally would require the
> user's salary and journey to reach a server, and `PRODUCT.md` §5 forbids that. **No agent
> overruled the contract; a human signed this one.** The correction is **retroactive** — the bullet
> was false for DS2, DS5, DS6 and DS7 from `0006` onward, and the supersession is recorded in place
> at `.specs/0005-…/legal.md` §3 and `.specs/0006-…/legal.md` §3.

> **LR3 — no interaction, no assistive-only presence, no claim without its qualification.**
>
> For every disclosure surface, in every frame in which the claim it qualifies is rendered, with no
> user interaction beyond scrolling:
>
> - **present in the DOM in that frame, without an event** — and, where the claim it qualifies is
>   itself present in the server-rendered bytes, present in the server-rendered bytes. *(This bullet
>   replaces "present in the server-rendered DOM (not injected on an event)". The old wording is
>   refuted by `curl` on the deployed head — §1.2 — and cannot be satisfied by DS2, DS5, DS6 or DS7
>   without sending the user's inputs to a server, which `PRODUCT.md` §5 forbids. The substance it
>   was protecting — the user is never shown a claim without its qualification — is **LR6.1**, which
>   is measurable and which the current build passes.)*
> - `visibility` is `visible`, `opacity` is not `0`, `display` is not `none`;
> - not inside a `[hidden]`, a `details:not([open])`, or a subtree whose owner has
>   `aria-expanded="false"`;
> - not `.sr-only` or otherwise positioned off-screen.
>
> **What LR3 still does not say, and now says so explicitly:** it sets no bound on where a
> disclosure sits in the document, none on how far it may move, and none on how long after
> navigation it may arrive relative to anything other than its own claim. §2.2 is the measurement
> that forbids the first two; §5.2 is the measurement that strikes the third.

### 4.2 — LR6 — co-presence

**Binding. One clause. It is the whole of what this gate adds.** It is what replaces the
unmeetable clause corrected in §4.1, and it takes effect with the same human confirmation of
2026-09-16 recorded there.

> **LR6.1 — a claim is never rendered without the disclosure that qualifies it.**
>
> **Domain — a test, never a list** (lesson **024**). LR6.1 applies to every rendered string the
> `0006` §2.1 test returns — cite, gap, or choice — paired with **the claim it qualifies**, defined
> as: the rendered element whose number, right or amount the disclosure's own text refers to. Today
> the test returns six pairs, and the enumeration is the test's output, never its definition:
>
> | Surface | The claim it qualifies |
> |---|---|
> | DS1 P1–P4 | the calculator's output as a whole — page-level; its claim is present whenever any computed value is |
> | DS2 | the `restDayPay` currency value in the same `day-summary.tsx` block |
> | DS5 | the hourly value the absent `monthlyHours` prevents |
> | DS6 | the hourly value computed under the divisor the string disputes |
> | DS7 | the journey figures in `day-summary.tsx` the warning is raised about |
> | DS4 | the consent decision itself — out of this spec's scope, unchanged |
>
> **The quantity, named exactly.** `Math.round(performance.now())` at the **animation frame** — a
> `requestAnimationFrame` callback, one sample per frame — at which `document.body.innerText` first
> contains the surface's body text, and the same for its claim. Not a `MutationObserver`, not a
> screenshot, not `innerHTML`, not the accessibility tree. One quantity for both sides of the
> comparison.
>
> **The clause.**
>
> ```
> frameIndex(first present: disclosure)  −  frameIndex(first present: its claim)  ≤  0
> ```
>
> Sampled every animation frame from navigation commit to 4,000 ms after `load`, at **390×844** and
> **1024×768**, in **both** themes, on **both** routes, in **both** storage conditions, against the
> artifact `spec.md` AC1 measures.
>
> **Worked measurement of the intended state**, taken on the unfixed deployed head **before this
> clause was written**, so the rule is calibrated against the state I consider correct and not
> against arithmetic (§1.3): `/`, seeded journey, 390×844 dark, 4× throttle, 3 loads —
> `NUM_anyDuration` / DS1 P3 / DS1 P4 = **575/575/575**, **149/150/150**, **129/129/129** ms;
> `NUM_dsrRow` / DS2 / DS7×3 = **1588/1589**, **445/445**, **419/419** ms. Sub-millisecond and
> 1 ms differences are sequential `performance.now()` calls inside one `requestAnimationFrame`
> callback — **the frame delta is 0 in 6/6 observations**. **Where this prose and this measurement
> ever disagree, the measurement wins.**
>
> **Escape clause.** A remedy that cannot hold `≤ 0` does not improvise: it reports the measured
> frame delta, per pair, per cell, and bounces to `tech-lead`, who either routes it back or brings
> it to the human. A delta of 1 frame is a finding, not a licence (lesson **026**).

**How LR6.1 fails.** It passes today, which is the point of a non-regression clause, so it cannot
be seen red against the unfixed tree and an assertion that has never been red proves nothing. The
**negative control** is cheap and it is required before the clause is trusted: run the same sampler
with the disclosure marker replaced by a string that appears only after a `setTimeout` — or point
it at the header clock, which changes every second — and confirm it reports a delta greater than 0.
**A sampler that cannot report a positive delta cannot fail LR6.1, and an LR6.1 that cannot fail is
decoration.** `qa-engineer` owns running it; I verify it ran, at G6.

### 4.3 — What LR6 deliberately does not say

- **It sets no bound on displacement.** §2.2, with the measured 474.2 px on a CLS 0.0013 load.
- **It sets no duration.** A disclosure may arrive at 129 ms or at 1,589 ms; both were measured on
  correct loads, and the difference is CPU, not compliance. What it may not do is arrive **after**
  its claim.
- **It forbids no implementation.** Server-rendering more, streaming, reserving height, mounting
  earlier, mounting later, changing nothing — all satisfy LR6.1 as long as the pair moves together.
- **It requires no new string, no caveat, no badge, no "carregando", and no marking of a
  provisional state.** An agent that adds one is not implementing LR6; §6 forbids it.

---

## 5. `spec.md` § Disclosure obligations, ruled one by one

The `product-manager` wrote four, "binding on every downstream gate, subject to
`labor-law-analyst` settling L1–L5". Settling them is this section. Two stand with a measurable
form attached, one is struck as measured vacuous, one is re-labelled as the product's bar rather
than mine.

### 5.1 — Item 1, *"a remedy may not delay a disclosure"* · **upheld, and given a form**

**Upheld, with one correction: "delay" is measured against the disclosure's own claim, not against
first paint.** Measured against first paint it would condemn the current build, where DS2, DS5, DS6
and DS7 arrive at 419–1589 ms and are right to (§3.5). Measured against its claim it is **LR6.1**,
it has a number, a quantity, a sampler and a worked example, and the build passes it 6/6 today.

The spec's own wording — *"the report states the frame it rendered in before and after, measured,
not argued"* — is exactly right and I am adopting it verbatim as LR6.1's reporting requirement.

### 5.2 — Item 2, *"may not move a disclosure below the fold at 390"* · **struck, measured vacuous**

**Struck. It binds nothing and it cannot be seen red.** Measured at 390×844 on the correct,
settled build, `getBoundingClientRect().top` in viewport coordinates, border box, with the fold at
**844**:

| Surface | `vtop`, settled | Above the fold? |
|---|---|---|
| DS6 | **1245.5** | no |
| DS5 | **1363.9** | no |
| DS1 P1 → P4 | **1855.7 → 2123.2** (and 2967.9 → 3235.4 on `/` seeded) | no |
| DS2 | **2402.8** | no |
| DS7 art. 59 / art. 71 | **2478.9** / **2688.9** | no |

**Not one disclosure surface on either route, in any of the four storage states I rendered, is
above the fold at 390 in the state this project considers correct.** The smallest `vtop` anywhere
is 1245.5 — **401 px** below the last visible row. The clause's premise, *"where it was above it
before"*, is never satisfied, so no remedy can ever violate it and no reviewer can ever fail it. A
criterion that cannot be red is decoration, and shipping it would let a later gate believe the fold
was being watched when it was not.

**What replaces it: nothing new.** The substance it was reaching for — a remedy must not make a
disclosure harder to reach — is already carried by **LR1** (width ≥ 320), **LR2a** (occupancy),
**LR2b** (measure, binding on DS1 at both viewports) and **LR3** (no concealment). Those are the
clauses a reflow can actually break, and they have numbers.

**And I am not raising the fold as a new obligation.** `PRODUCT.md` §4's "visibly, next to the
number" was settled at `0005` — the footer is where this product's page-level disclosures live —
and `0006` §2.5 discharged the sharpest of them a second time at the moment it becomes concrete,
which is DS7, beside the journey that triggered it. Reopening it here on a layout spec would be
exactly the manufactured obligation §2 refuses. It is recorded as a standing residual for the human
in §8, Q1, where it belongs.

### 5.3 — Item 3, *"may not reach AC4 by hiding a disclosure"* · **upheld — it is LR3 verbatim**

**Upheld, and no new clause is needed.** LR3's surviving four bullets already forbid `display:none`,
`visibility:hidden`, `opacity:0`, `[hidden]`, `details:not([open])`, `aria-expanded="false"` and
off-screen positioning, for every surface the `0006` test returns. `content-visibility` and a
zero-height clip are not in that list by name and are in it by the last bullet's substance; I am
stating so here rather than extending the enumeration, because the rule is a test and not a list.

`spec.md` AC5 is the same idea applied to `DIV.lg:col-span-7`'s box, and the `product-manager` is
right that CLS cannot see concealment. §2.2 adds the stronger fact: **CLS cannot see disclosure
displacement either, in either direction.** So AC4 discharges nothing legal, and **LR1/LR2a/LR2b/LR3
must be re-measured after the remedy, on all six surfaces, in every cell AC1 defines** — not
inferred from a green CLS and not inferred from AC5's column rect. That re-measurement is the
G6 obligation §7 lists.

### 5.4 — Item 4, *"report the reserved height at 390 as a fraction of the viewport"* · **not mine**

**Upheld as the product's bar, explicitly not as a legal obligation.** It is `PRODUCT.md` §5 —
every pixel of chrome costs attention before it earns accuracy — and `spec.md` § Non-goals already
rejects a blanket `min-height` for the same reason. It is a good criterion and I am not attaching
my veto to it, because a veto that covers everything covers nothing (lesson **024**). If the remedy
reserves space, the number belongs in the report; a missing number there is a `tech-lead` bounce,
not a G2 rejection.

---

## 6. What the remedy may not do to a string

`spec.md` § Out of scope grants me an override to mandate a disclosure string, and AC6's exemption
list is written to receive one. **I mandate none, and I am closing that door deliberately so AC6
stays falsifiable.**

| # | Binding on `product-designer`, `content-writer`, `tech-lead`, `frontend-dev` |
|---|---|
| **O1** | **No new user-visible string.** Not a "carregando", not a skeleton label, not a badge marking a value provisional, not a caveat next to the hero. `0004` §3 already ruled that adding one is not implementing a rule, it is putting an unrequested caveat next to the number the user came for, against `PRODUCT.md` §1 and §4. **AC6's exemption list from this gate is empty.** |
| **O2** | **No rewording of DS1 P1–P4, DS2, DS5, DS6 or DS7.** Their text is settled at `0002` S3–S6, `0005` §2, `0006` §2 and §6. A remedy that reflows a column has no occasion to touch them, and a "shortening to fit" is a legal change wearing a layout costume (lesson **002**). |
| **O3** | **No disclosure may be moved out of `#main-content`**, into a dialog, a popover, a `title`, a tooltip, or any subtree gated on a control. LR3, bullets 3 and 4. |
| **O4** | **No disclosure may be moved from one route to the other, or deduplicated across them.** Both routes carry DS1; that is not redundancy, it is the same obligation discharged on two pages a user can land on independently. |
| **O5** | If the remedy touches `hooks/use-salary-calculator.ts` or `hooks/use-work-calculator.ts`, **LR5.4 becomes a precondition** and `0004`'s F1 check must exist and be seen red first (§3.2). |

O1–O4 are checkable by AC6's own `diff` with an empty exemption list. O5 is a routing instruction to
`tech-lead`.

---

## 7. What I will verify at G6 and G9

So that `tech-lead` can plan for it and `qa-engineer` can share the instrument rather than build a
second one.

| # | At G6, against the built code | At G9, against the deployed preview |
|---|---|---|
| V1 | **LR6.1**, all six pairs, every AC1 cell, with the negative control run and its output pasted | the same, both themes |
| V2 | **LR1** — `getBoundingClientRect().width >= min(320, A)`, border box, where `A` is the content-box width available in the containing block, on all six surfaces. Baselines measured this session at 390: DS1 P1–P4 = **358** (A ≈ 358, so the bar is 320 and it clears it); the banners = **308**, with `A ≈ 308` inside the column, so the bar is 308 | the same |
| V3 | **LR2a** — `rootW − bodyW ≤ 32` on DS2, DS5, DS6, DS7. Baseline measured this session: DS3 control **26** | the same |
| V4 | **LR2b** — cpl ≥ 40 on DS1 at 390 and 1440 (its `font-size` is 12px, measured); residual reported for the 14px banners per `0006` §3.3 | the same |
| V5 | **LR3** as corrected — all four surviving bullets, all six surfaces | the same |
| V6 | **Every surface rendered, not bounded from source** (lesson **031**). Six rows in my table, six surfaces the `0006` test returns, and the art. 66 warning of §8 Q3 reached or written up as unreached | the same |
| V7 | **AC6's diff is empty** — the exemption list from this gate is empty (§6) | read the rendered text off both routes in both themes |
| V8 | Every user-visible number on both routes still traces to a table in `lib/` that cites its norm — the traceability audit, unchanged from `0006` G6 | the same, read off the real page |

**V8 is the one that can reject on its own.** It is not a re-verification of `lib/` (§0) — it is the
check that the remedy did not delete, reorder, conditionally mount or collapse a number away from
the citation that backs it.

---

## 8. Open questions for the human

| # | Question | Why it is the human's and not mine |
|---|---|---|
| **Q1** | **No disclosure surface in this product is above the fold at 390×844.** Measured, every surface, every state (§5.2). `PRODUCT.md` §4 says "visibly, next to the number"; the nearest surface is 401 px below the last visible row and the footer is 1,855–3,235 px down. `0005` settled that the footer is where page-level disclosures live and `0006` §2.5 discharged the sharpest of them again beside its trigger, so **I am not reopening it and it is not a rejection.** It is recorded because it has now been measured three times and never decided, and a residual that stops being measured stops existing (lesson **031**, `0006` §3.3). | It is a product-positioning question, not a norm question. Deciding it would mean redesigning where disclosures live, which is `PRODUCT.md`'s and the human's, not a layout spec's. |
| **Q2 — ✅ answered 2026-09-16: the human confirmed the inversion. The rule is wrong; §4.1 takes effect, and the supersession is recorded in place at `.specs/0005-…/legal.md` §3 and `.specs/0006-…/legal.md` §3.** | **LR3 shipped false for three gates.** Its "present in the server-rendered DOM" clause has been unmet by DS2/DS5/DS6/DS7 since `0006` widened the domain, and I am the one who wrote it and the one who did not re-run it backwards. `AGENTS.md` §8 says that when the code and `legal.md` disagree, **the code is wrong until a human says otherwise** — here I am ruling the opposite, that the rule is wrong and the code is right, because satisfying the rule would breach `PRODUCT.md` §5. **That inversion is the human's to confirm**, and §4.1 does not take effect quietly: it is flagged here. | Only the human can accept a correction that runs against `AGENTS.md` §8's default direction. |
| **Q3** | **The CLT art. 66 warning (`lib/compliance.ts:59-66`) was not reached.** I seeded `lastExit` at 23:00 of the previous day against an 08:00 entry and the warning did not render; the other three did. I did **not** substitute an arithmetic bound for the reading (lesson **031**), so §1.4 records it as unreached rather than measured. This is a finding about the surface's reachability, and it is one of two things: the `shiftedByDays` normalisation at `hooks/use-work-calculator.ts:124-127` moving my seeded timestamp, or a condition I did not construct. | It needs someone who can drive the UI rather than seed storage, and it is a `qa-engineer` item for G6 rather than a G2 blocker — the surface's *content* was verified at `0006` §6.2 and is unchanged. |
| **Q4** | **`0004`'s F1 is still open** — LR5.4, the clause that protects a returning user's stored inputs, has never been asserted by a running check. Carried, not raised by me; §3.2 turns it into a precondition **only if** the remedy touches either hook. | It is `tech-lead`'s to schedule. It becomes mine at G6 if a hook was edited without it. |

---

## 9. The parts of this template that are empty, and why

Stated rather than omitted, so a reader can tell "nothing applies" from "nobody looked".

| Section | Why empty |
|---|---|
| **Tables** — RGPS, RPPS, IRRF brackets, parcela a deduzir, dependent deduction, the Lei 15.270/2025 reduction | This spec computes nothing and changes no value in `lib/legal-tables.ts`. The tables in force are settled at `0002` G2 and re-verified at `0005` G6/G9 and `0006` G6; **`legal.md` of `0002` remains the rebuild contract for `lib/legal-tables.ts`** and this document does not supersede any part of it. § Out of scope's first bullet — no change to any rendered number — is upheld without an override. |
| **Order of operations** | No deduction, no base, no sequence is introduced or reordered. |
| **Rounding** | No monetary or duration quantity is computed here. The only numbers this document sets are geometric and temporal, and each names its quantity, its box model and its sampling method in the clause that uses it (§0, §4.2). |
| **Worked examples of a computation** | None to work. The worked measurements that *do* carry weight are §1.3 (LR6.1's calibration) and §1.4 (the box of every surface), and both were taken before the clauses that read them were written. |
| **Known imprecisions** | None accepted. This gate accepts no legal imprecision, and none is proposed. |
| **New disclaimers the app must show** | **None.** §6 O1: the exemption list this gate contributes to AC6 is empty, deliberately. |

---

## 10. Verdict

**`pass`.**

The defect in `spec.md` is a rendering defect and it stays one. The 0.5452 event displaces no
disclosure a user could be reading, because at the moment it fires four of the six are not in the
DOM and the other two are more than 1,000 px below the fold — measured, on the artifact, this
session. I set no stability clause, because the correct build moves its disclosures further on its
healthiest load than the defect moves the column.

What this gate changes is one sentence of my own rule that the deployed bytes refute, and what it
adds is one clause, **LR6.1**, that says what the refuted sentence was trying to say, in a quantity
someone can read off a browser.

**Next: `product-designer` (G3) and `content-writer` (G3), in parallel.** Both are bound by §4, §5
and §6; `content-writer` should read §6 first, because its whole content is *do not write anything*.
