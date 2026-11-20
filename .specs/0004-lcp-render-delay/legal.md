# 0004 — Legal basis

> Owner: labor-law-analyst · Gate: `law` (G2) · Run 1

**Verdict: pass.**

This spec changes no number, no rate, no bracket, no ceiling, no divisor and no rounding step. I
did not re-verify the tables: they were verified digit by digit at `0002` G6 and by hand at `0005`
G9 and `0006` G9, and nothing here opens `lib/legal-tables.ts`.

**The ruling this gate exists for is L5 / O1, and it overturns the spec's default.** A
server-rendered default that hydration replaces with the returning user's own value is **not a
disclosure**, under my own cite / gap / choice test (`0006` `legal.md` §2.1), and **no Brazilian
norm governs it**. `O1`'s default answer — *"Yes, disclosure required"* — is set aside. §2 gives the
reasoning, the primary text I read to reach it, and the two ways the ruling could be wrong.

What I did add is one binding rule, **LR5** (§3), and it is not a disclosure. It is a
**non-regression condition on the transition**, because the one thing that *would* become my
business is a fix that leaves a number on the screen which the app has already superseded in its own
memory, or that writes a default over a stored input. Neither happens today, and LR5 is what keeps
it that way.

I am also correcting a premise in the brief I was given, because a bound written against it would
have been three orders of magnitude wrong. **The 5.7–6.5 s figure is not the window in which the
user reads someone else's number.** That figure is the lab's LCP timestamp. The stale window is the
interval between the default's paint and hydration's swap, and I measured it on the deployed head at
**182–322 ms** — see §2.4 and E-L1.

---

## 0. Scope of this analysis

### Covered

- **L5 / O1** — whether a figure painted from the defaults, before the user's stored inputs are
  restored, is a disclosure, and what (if anything) the app owes the user because of it (§2).
- **LR5** — the binding non-regression condition this gate places on any lever that touches the
  hero numeral's paint path (§3).
- **L6** — the three `--:--:--` placeholder surfaces, classified from the module their strings come
  from, and the `aria-hidden` question the spec asks about them (§4).
- **L1, L2, L3, L4** — the norms behind the figures already on the first-paint path, stated with
  their primary text, and confirmed unreached by this spec's scope (§5).
- **L7** — whether `lib/og-image.tsx` asserts anything requiring a citation (§6).
- The `aria-live="polite"` announcement on the hero numeral, to the extent it is a `PRODUCT.md` §4
  per-modality question and not an accessibility one (§7).

### Explicitly not covered

State this as a boundary, not as a courtesy. An agent that reads a ruling into this file on any of
the following has misread it.

- **Rendering mechanics.** Why Render Delay dominates, what the lever should be, whether the swap
  happens in an effect or elsewhere. Not mine, and §3's rule is deliberately written so that it
  constrains no implementation.
- **Lighthouse methodology**, the instrument, the host list, `.lighthouserc.js`, and the
  2,500 ms target. `spec.md` § *On the absolute 2,500 ms target* settles those and I do not reopen
  them.
- **`metadataBase` and Finding B**, beyond L7's one question: does the image assert a legal figure.
  It does not. The host is a metadata-correctness matter and belongs to `web-standards-auditor`.
- **The tables in `lib/legal-tables.ts`.** Unreached, not re-verified, deliberately.
- **X1** (the Súmula 431 over-extension). Confirmed still recorded with an owner in §8.2; **not
  re-triaged**, and this spec is still not its place.
- **Whether the app should offer a "restore my inputs" affordance**, a loading state or a skeleton.
  `spec.md` § Non-goals forbids all three, and nothing in this analysis argues for any of them.

### Verification conditions

Everything asserted about the deployed artifact in this file was read or measured **in this
session**, against
`https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app` — the branch-alias
deployment carrying this stack. Everything asserted about the source was read from the working tree
at `5c0c6fa`, with line numbers read from the files, never copied (lesson 007). **I mutated
nothing** (`AGENTS.md` §4 rule 6): the one script I wrote lives in the gitignored `evidence/`
directory and drives a headless browser against the deployment.

---

## 1. Evidence — what I read and measured, before I ruled

Every row is a command run in this session against the artifact named. Lessons **031** and **032**
are why: a disclosure I have not rendered is a disclosure I cannot report on, and a routed claim's
mechanism travels at the confidence of the numbers behind it.

| # | Claim | Command, and what it printed |
|---|---|---|
| **E-L1** | **The stale window is ~0.3 s, not 5.7–6.5 s.** With a returning user's inputs seeded in `localStorage` (entry 09:00, lunch 12:00→13:00, gross R$ 4.200), on a real Chromium at 412×823 with 4× CPU throttling, the hero numeral transitions **exactly once** per cold load, from the default to the restored value. | `node .specs/0004-lcp-render-delay/evidence/stale-window.mjs`, 4 loads per route. `/` → `17:48`@131.7–236.3 ms then `18:48`@411.1–453.3 ms; **window 182.4 / 273.2 / 311.5 / 321.6 ms**. `/custo-da-hora` → `R$ 0,00`@187.8–288.5 ms then `R$ 17,31`@457.2–588.2 ms; **window 269.4 / 278.8 / 284.9 / 299.7 ms**. One transition per load on both routes, in all four loads. Raw output in `evidence/stale-window.txt` |
| **E-L2** | The pre-hydration DOM is the one I ruled on, read directly. `/` serves `17:48` and three `--:--:--`; `/custo-da-hora` serves `R$ 0,00`, one `--:--:--`, **and the banner that explains the zero**. | `curl -s $H/ \| grep -oE '<p aria-live="polite"[^>]*>[^<]*</p>'` → `…>17:48</p>`; same on `/custo-da-hora` → `…>R$ 0,00</p>`. `grep -oE '\-\-:\-\-(:\-\-)?'` → 3 on `/`, 1 on `/custo-da-hora`. `grep -o 'Esse zero não é o seu salário[^<]*'` on `/custo-da-hora` → *"Esse zero não é o seu salário, é a falta do dado."*, present in the **server** response |
| **E-L3** | **The default is never written over a stored input.** Every persistence effect in both calculators is guarded by the restore flag, so nothing the server painted can reach `localStorage` before the stored value has been read. | `grep -nF "isRestored) return" hooks/use-work-calculator.ts hooks/use-salary-calculator.ts` → `use-work-calculator.ts:164`, `use-salary-calculator.ts:137`; and `use-work-calculator.ts:186` guards the `lastExit` write with the same flag |
| **E-L4** | `17:48` is not an invented number: it is `0001` `legal.md` E13's verified worked example, reproduced to the minute by the deployed server. | `0001` `legal.md` E13 — *input entry 08:00, lunch 12:00→13:00, expected journey 528 min (8h48) · 240 + 288 · result **17:48***. Deployed HTML: `17:48`. `18:48` in E-L1 is the same arithmetic on entry 09:00 |
| **E-L5** | The full string set behind the three placeholder surfaces, read from the modules, not the call sites (lesson **024**). | `lib/utils.ts:31` → `PLACEHOLDER_CLOCK = "--:--:--"`; `lib/utils.ts:69` → `"--:--"`; `components/organisms/work-calculator.tsx:35-75` → `statusLabel` ∈ {*aguardando horários*, *balanço do dia*, *faltam*, *hora extra*}, `statusTime` ∈ {`--:--:--`, a signed balance, `+HH:MM:SS`, `HH:MM:SS`}, `statusAnnouncement` ∈ {*Aguardando os horários da jornada*, *Calculando o tempo restante*, *Balanço do dia: X*, *Hora extra de X*, …} |
| **E-L6** | `lib/og-image.tsx` renders four sentences and no figure. The two `100%` literals are `width`/`height` style values at `lib/og-image.tsx:29-30`, never rendered text. | `grep -oE '"[^"]{4,90}"' lib/og-image.tsx` → *"Jornada de trabalho, horas extras e saldo do dia"*, *"A que horas você pode sair, quanto já trabalhou e quanto tem de hora extra."*, *"Valor da hora e salário líquido CLT"*, *"Quanto vale a sua hora, já com INSS, IRRF e dependentes."* — plus colours and flex keywords |
| **E-L7** | **`planalto.gov.br` is unreachable from this environment**, as it was at `0006`'s law gate. Every norm below is therefore verified against **Câmara dos Deputados, Legislação Informatizada** (`www2.camara.leg.br/legin/…-normaatualizada-…`), an official consolidated text, and the article text is reproduced verbatim in §5. | `curl … planalto.gov.br` → `000` on three URLs, `WebFetch` → `socket hang up`; `curl -sL www2.camara.leg.br/legin/…` → `200`, 1.79 MB (CLT), 232 kB (CDC), 1.72 MB (CF) |

---

## 2. L5 / O1 — the ruling

**A server-rendered default, later replaced by hydration with the user's own stored value, is not a
disclosure and is not governed by any Brazilian norm. `O1`'s default of "disclosure required" is
overturned. Nothing is added to the screen.**

`spec.md` § *Disclosure obligations* item 1 says this spec "may not close without recording the
analyst's ruling on it". This is the ruling.

### 2.1 — The test is a test on content. It says nothing about time.

The cite / gap / choice test (`0006` `legal.md` §2.1) classifies a **rendered string by what it
asserts**. Applied to the hero numeral it returns the same answer at every instant of the page's
life, because the string's assertion does not change when the value does:

| Clause | Applied to `17:48` / `R$ 0,00` at first paint | Applied to `18:48` / `R$ 17,31` after hydration |
|---|---|---|
| **(a) Cite** — states a number, rate, threshold, divisor or year, or attributes one to a norm | **yes** — it is a quantity the app computed and presents as an answer | **yes**, identically |
| **(b) Gap** — names a variable, a right or an amount the user's real situation includes and this app does not produce | **no** — the string names nothing. The gaps are named in the footer's P3, which is server-rendered and already present at this instant (E-L2, `calculator-views.tsx:80-87`) | **no**, identically |
| **(c) Choice** — records, conditions or solicits a decision the app will store and act on | **no** — and this is the clause I checked hardest. See §2.3 | **no** |

So the test returns **(a) only, before and after**. The numeral is in the LR domain — it always was
— and the obligation clause (a) creates is `PRODUCT.md` §4's *cite or omit*, which the numeral
satisfies **in both states** (§2.2).

What the test does **not** return is a third state called "stale". It has no temporal clause,
deliberately, and I am not adding one by interpretation. **A test on what a string asserts cannot
manufacture an obligation out of when it was asserted.**

### 2.2 — The pre-hydration number is not wrong. It is a correctly-cited answer to a different question.

This is the distinction the brief asked me to test, and it does not hold. `17:48` is not an
approximation, not an estimate and not a placeholder. It is the **exact, verified output** of the
app's own arithmetic over the app's own defaults:

- `0001` `legal.md` **E13**, verified at that gate and reproduced here: entry 08:00, lunch
  12:00 → 13:00, expected journey 528 min → **17:48**. The deployed server prints `17:48` (E-L2,
  E-L4).
- The defaults it runs on are the ones `PRODUCT.md` §5 mandates: *"The default is the common case.
  CLT, 44h weekly, 50% overtime floor, one dependent-free salary."* 8 h 48 min is 44 h ÷ 5 (§5.1).
- `R$ 0,00` on `/custo-da-hora` is `0006` `legal.md` §2.3's C1, ruled there and unchanged: it is
  *"the arithmetic identity of an absent input"*, and the app says so **in the server response**,
  next to it — *"Esse zero não é o seu salário, é a falta do dado."* (E-L2). That route's
  pre-hydration state is therefore **already self-describing**, at first paint, with no interaction.

So the failure mode the brief names — *"it is not illegible, it is wrong for the time it is on
screen"* — misdescribes what is on screen. The number is right. What is false for a returning user
is an unstated **premise**: *that the entry time is 08:00*. And the app does not state that premise
as a fact about the user; it states it as the value of an editable field, which is on the same
screen and which hydration corrects in the same breath as the numeral.

A defensible restatement would be: "the app implies this user's entry is 08:00 for 0.3 s". That is a
statement about a form's initial value, not about a legal claim, and `PRODUCT.md` §4's three
commitments — *cite or omit*, *name the gap*, *the year is part of the answer* — each describe the
**content** of a number the app publishes. None of them is a freshness guarantee, and reading one in
would extend the promise past what it says.

### 2.3 — The clause that would have made this mine, and why it does not fire

Clause (c) is the one that matters here, and the code is what decides it.

If the pre-hydration default were **persisted** — written to `localStorage` before the stored value
had been read — this gate would reject, without hesitation, and the severity would be high. That is
not a staleness defect; it is the app **destroying a record of the user's own input and replacing it
with a value the user never chose**. It would put the string squarely inside clause (c), and it is
the failure mode that a performance lever reordering effects could plausibly introduce.

It does not happen today. Every write is behind the restore flag (E-L3):

- `hooks/use-work-calculator.ts:164` — `if (!isRestored) return;` guards the entry, lunch, exit
  override, journey minutes and both tier rates.
- `hooks/use-work-calculator.ts:186` — the same flag guards the `lastExit` write, which is the input
  to the art. 66 interregno warning on the **next** day's load. A default leaking into that key
  would corrupt a compliance warning, not just a field.
- `hooks/use-salary-calculator.ts:137` — the same guard for gross salary, monthly hours, daily
  minutes, dependents, regime, period and both extra-item lists.

This is the substance of **LR5 clause 4** (§3), and it is the one clause in this file I would bounce
a build over.

### 2.4 — On duration: I set no bound, and here is the number that would have been wrong

The brief asks how long is too long, and warns that *"a rule stated in milliseconds that nobody can
measure is worse than no rule"*. Agreed — and there is a prior condition it did not name: **a rule
stated in milliseconds calibrated against the wrong quantity is worse still**, because it is
measurable and it measures nothing (lesson **023**).

The brief offers 5.7–6.5 s as the size of the gap. **That is not the stale window.** It is the
Lighthouse lab's `largest-contentful-paint` timestamp on a throttled runner — the same figure
`spec.md` C1/C2 already show describes the instrument at least as much as the build, and the same
one `spec.md` AC4 answers with a 448 ms real-browser paint.

The stale window is a different quantity: **the interval between the default's paint and hydration's
swap**. I constructed the state — a returning user's inputs in `localStorage` — and measured it
(E-L1, lesson **031**):

| Route | Default painted | Restored value painted | **Stale window** | Transitions per load |
|---|---|---|---|---|
| `/` | 131.7 / 137.9 / 138.7 / 236.3 ms | 411.1 / 418.7 / 450.2 / 453.3 ms | **182.4 / 273.2 / 311.5 / 321.6 ms** | 1, 1, 1, 1 |
| `/custo-da-hora` | 187.8 / 196.2 / 239.6 / 288.5 ms | 457.2 / 481.1 / 518.4 / 588.2 ms | **269.4 / 278.8 / 284.9 / 299.7 ms** | 1, 1, 1, 1 |

Real Chromium, 412×823, 4× CPU throttling, deployed head, four loads per route.

Had I accepted the brief's framing and written *"the stale window must not exceed 2 s"*, the rule
would have been **satisfied by a factor of six on the unfixed build**, would have gone green forever,
and would have told a later gate that this gate had looked. That is a rule that certifies rather than
checks.

**So there is no duration bound in this file**, and the reason is not that the number is hard to
measure — I measured it four times. It is that **the quantity does not carry an obligation at any
magnitude.** If 300 ms creates no duty, neither does 3 s; and if 3 s did, it would be a usability
finding for the `product-designer`, not a legal one. §3 states the rule as a **condition on the
state machine** instead, which is what actually protects the user and what this spec's acceptance
criteria can be written against — the way LR1–LR4 were.

### 2.5 — CDC art. 31, read rather than remembered

The brief raises it, so I read it. Verbatim, from the consolidated text (§5.5):

> **Art. 31.** A oferta e apresentação de produtos ou serviços devem assegurar informações
> **corretas, claras, precisas, ostensivas e em língua portuguesa** sobre suas características,
> qualidades, quantidade, composição, preço, garantia, prazos de validade e origem, entre outros
> dados, bem como sobre os riscos que apresentam à saúde e segurança dos consumidores.

Three readings, all of which point the same way:

1. **Its object is the offer.** It governs information about *the product or service being offered*
   — characteristics, price, warranty, validity, origin. The hero numeral is not information about
   WorkLoad; it is the **output the user asked WorkLoad to compute**. The article that would govern
   WorkLoad's own description of itself is this one, and that surface is the footer and the metadata,
   which `0002` S3–S5 and `0005` LR1–LR3 already bind.
2. **"Ostensiva" is a perceptibility requirement**, not a freshness one — *de fácil constatação ou
   percepção*. That is precisely the axis LR1–LR3 measure, and it is discharged: both numerals are in
   the server-rendered DOM, visible, at the largest type size on the page, with no interaction
   (LR3's three conditions, satisfied by construction).
3. **There is no temporal clause anywhere in art. 31, nor in its parágrafo único** (which concerns
   indelible marking on refrigerated goods). The article has nothing to say about an interval.

**I therefore decline to extend CDC art. 31 to render latency.** Stretching a perceptibility norm
into a freshness norm to give this gate something to hold would be exactly the invented obligation
the brief warned against — and it would set a precedent that any interval on any screen is a
consumer-law question, which would make the veto worthless within two specs.

### 2.6 — The two ways this ruling could be wrong

Recorded so a later gate can falsify it rather than re-argue it.

1. **If the swap ever becomes conditional on interaction** — a lever that restores stored inputs on
   focus, on scroll, or behind a control — then the default stops being transient and becomes the
   app's standing answer for a user who never performs that interaction. At that moment clause (b)
   fires: the app would be showing a projection while holding a different one, and not saying so.
   **LR5 clause 3 is what catches it.**
2. **If the default ever reaches `localStorage` before restore**, clause (c) fires and this gate
   rejects. **LR5 clause 4 is what catches it.**

Both are conditions on the state machine, both are checkable by the probe in E-L1, and neither is a
duration.

---

## 3. LR5 — the binding rule

**Binding.** This spec's acceptance criteria are to be written against it; `qa-engineer` verifies it
at G6 and I verify it at G6 and G9. It joins LR1–LR4 (`0005` §3, as corrected by `0006` §3) as the
fifth rule of the same set, and it is the **only** new obligation this gate creates.

LR5 is not a disclosure rule. It adds no string, no caveat and no pixel to any screen. It is a
**non-regression condition on the transition from the default to the restored value**, and it exists
because §2.6 names two ways a performance lever could turn a harmless transient into a defect this
gate would have to reject.

### Domain — stated as a test, not as a list (lesson 024)

LR5 applies to **every rendered string whose value is seeded from a module default and later
replaced by a value read from `localStorage` on the same page load.**

Today that test returns exactly two surfaces, and the enumeration is the test's output, never its
definition:

| # | Surface | Source of the default | Source of the restored value |
|---|---|---|---|
| **HS1** | `components/organisms/hero-panel.tsx:42-58`, as called from `work-calculator.tsx:213` — the `/` hero numeral | `hooks/use-work-calculator.ts:12,135-137` | `hooks/use-work-calculator.ts:142-160` |
| **HS2** | the same element, as called from `salary-calculator.tsx:222` — the `/custo-da-hora` hero numeral | `hooks/use-salary-calculator.ts:29-31,69-78` | `hooks/use-salary-calculator.ts:80-98` |

Any surface a downstream lever adds that satisfies the test joins the domain automatically. A gate
that finds a third one and does not add it has misread this section.

### The quantity, named exactly (lesson 023)

Every clause below reads **`element.textContent.trim()` of the `<p aria-live="polite">` inside the
hero panel** — the same element LCP names, selected by `p[aria-live="polite"].numeric`. Sampled on
every animation frame from before navigation commits until 4,000 ms after `load`. Not a screenshot,
not an accessibility-tree value, not `innerHTML`. One quantity across all four clauses.

### The clauses

Measured on a real browser at **412×823 with 4× CPU throttling**, against the **deployed**
artifact, with a returning user's inputs seeded in `localStorage` before the measured load, on
**both** routes, in **both** themes.

| # | Clause | Why it exists |
|---|---|---|
| **LR5.1** | The sampled text takes **exactly two distinct values** per cold load: the module default, then the restored value. No third value, no intermediate, no empty string, no `—`, no `--:--`. | Each distinct value is one `aria-live="polite"` announcement (§7). A fix that flickers through an intermediate makes a screen-reader user hear a number that was never any user's number. |
| **LR5.2** | The **last** sampled value is the restored one, and it does not revert. | The failure this catches is a lever that re-runs the default-seeding initialiser after restore. |
| **LR5.3** | Both values are produced **with no user interaction beyond scrolling** — no click, focus, keypress or pointer event. | §2.6 case 1. This is `0005` LR3's "no interaction, no assistive-only presence" applied to the transition instead of to the presence. It is the clause that keeps the ruling in §2 true. |
| **LR5.4** | **No `localStorage` key that the calculators read is written before the restore completes.** Concretely: after a load performed with seeded storage, every seeded key holds the seeded value, byte for byte, and `lastExit` is not overwritten with a default-derived value. | §2.6 case 2, and **the clause with the substance.** The other three are tripwires; this is the one that protects the user's data. A violation here is a rejection at G6 regardless of every metric. |

### Worked measurement of the intended state

Taken **before** these clauses were written, on the unfixed deployed head, so that the rule is
calibrated against the state I consider correct and not against arithmetic (lesson **023** rule 3):

- **HS1, `/`** — sampled values per load: `["17:48", "18:48"]`. Two values, LR5.1 ✓. Last value
  `18:48` = entry 09:00 + 528 min + 60 min lunch, LR5.2 ✓. No interaction was performed, LR5.3 ✓.
- **HS2, `/custo-da-hora`** — sampled values per load: `["R$ 0,00", "R$ 17,31"]`. Same three ✓.
- Four loads per route; identical in all eight. Raw output: `evidence/stale-window.txt`.
- **LR5.4** holds by construction at `use-work-calculator.ts:164`, `:186` and
  `use-salary-calculator.ts:137` (E-L3). It has **not** been asserted by a running check, and that
  is a finding for `qa-engineer`, recorded as **F1** in §8.1.

**If the prose and this worked measurement ever disagree, the measurement wins** (lesson **023**
rule 4).

### How LR5 fails

An assertion that has never been red proves nothing. LR5.1 and LR5.2 cannot be seen red on the
unfixed build — they pass today, which is the point of a non-regression rule. So the check that
makes them trustworthy is a **negative control**, and it is cheap: run the probe with the sampler
looking at a different element (for instance the header clock, whose text changes every second) and
confirm LR5.1 reports more than two values. A sampler that cannot report three values cannot fail
LR5.1, and an LR5.1 that cannot fail is decoration.

**LR5.4 can and must be seen red**: seed a key, call the persistence effect's body with the restore
flag unset, and confirm the seeded value is destroyed. That is a unit-level check on a hook, it costs
one test, and `hooks/**` is at a 100% coverage bar already.

### What LR5 deliberately does not say

- **It states no duration.** §2.4.
- **It forbids no implementation.** Server-rendering the restored value, moving the read earlier,
  inlining a storage read, streaming — all satisfy LR5. So does changing nothing.
- **It does not require the default to be labelled, caveated, dimmed, or marked provisional.** §2
  is why. A downstream agent that adds such a string is not implementing LR5; it is adding an
  unrequested caveat next to the number the user came for, which `PRODUCT.md` §1 and §4 both argue
  against — the footer already carries the four disclosures this product owes, at first paint, and
  diluting them with a caveat about a 0.3 s state makes them **less** read, not more.

---

## 4. L6 — the three placeholder surfaces, and the `aria-hidden` question

`spec.md` L6 asks me to classify the three `--:--:--` surfaces and to settle "whether a placeholder
that is `aria-hidden` is inside or outside the disclosure domain".

**The question is put the wrong way round, and answering it as asked would have written a rule that
is right about the wrong things** (lesson **024**). `aria-hidden` is a property of a *node*. The
disclosure domain is defined over what a *string asserts*. So:

### 4.1 — The ruling

**None of the three is in the disclosure domain — and `aria-hidden` is not why.**

Classified from `lib/utils.ts` and `components/organisms/work-calculator.tsx:35-75`, the modules the
strings come from, with the full renderable set read rather than the call sites (E-L5, lesson 024):

| # | Surface | Full string set at the pre-hydration instant | (a) | (b) | (c) | Ruling |
|---|---|---|---|---|---|---|
| **P1** | `app-header.tsx:51` — header clock | `"--:--:--"` (`lib/utils.ts:31`), then wall-clock `HH:MM:SS` | no | no | no | **Not in the domain.** The placeholder asserts no quantity. The value that replaces it is the wall clock — a fact about the world, not a claim about this user's hours or money. |
| **P2** | `work-calculator.tsx:223` — hero badge | identical set to P1 | no | no | no | **Not in the domain**, same reason. |
| **P3** | `work-calculator.tsx:231` — progress-ring `statusTime` | `"--:--:--"`, then one of: a **signed day balance** (`+1h 00m`), `+HH:MM:SS` overtime, `HH:MM:SS` remaining | **yes, after hydration** | no | no | **Placeholder not in the domain; the value that replaces it is.** |

### 4.2 — P3 is the one that matters, and it is the counter-example to the question as asked

`statusTime` is **not always a placeholder**. Two of its four branches render a figure about the
user's own day — the signed balance and the overtime clock — and those satisfy clause (a). They sit
inside a `div aria-hidden="true"` at `work-calculator.tsx:228`.

That would be an **LR3 violation** — a number apprehensible in one modality and not another,
`PRODUCT.md` §4's promise discharged per-modality — **except that it is already discharged
correctly**: `work-calculator.tsx:234` renders `statusAnnouncement` in an `sr-only`
`aria-live="polite" aria-atomic="true"` paragraph, carrying the same figure in words
(*"Balanço do dia: +1h 00m"*, *"Hora extra de …"*). The visual node is hidden from assistive tech
**because an accessible equivalent exists beside it**. That is the correct pattern and it passes.

So the general rule L6 actually needs, stated so it survives the next feature:

> **`aria-hidden` neither puts a string into the disclosure domain nor takes it out.** Membership is
> decided by what the string asserts. `aria-hidden` decides only *whether the obligation has been
> discharged in every modality* — and a surface carrying a figure under `aria-hidden` satisfies LR3
> **only** if an accessible equivalent carrying the same figure is rendered alongside it, at first
> paint, without interaction.

Written the way `spec.md` L6 framed it — "aria-hidden placeholders are outside the domain" — the
rule would have been true of all three surfaces today and false the moment a lever moved a figure
into one of them, which is exactly the kind of lever this spec authorises.

### 4.3 — Binding on this spec

- P1, P2 and P3's placeholder branch carry **no disclosure obligation**. A lever may change when
  they paint, may server-render them, may leave them alone. This gate has nothing to say.
- **If any lever puts a figure about the user's hours or money into a node hidden from assistive
  technology, the accessible equivalent must land in the same render.** That is LR3, restated for
  this spec's scope item 4, and it is verified at G6 against `work-calculator.tsx:234` still being
  present and still carrying the figure.
- `spec.md` § Disclosure obligations item 3 — *"no disclosure now renders after the figure it
  qualifies"* — is verified at G6 by the same reading: the footer's four paragraphs and the
  `sr-only` announcement are both in the **server** response today (E-L2), so any lever that defers
  either of them past the numeral is a regression I will name.

---

## 5. L1–L4 — the norms behind the figures already on the first-paint path

These are settled, verified elsewhere, and **unreached by this spec's scope**. They are reproduced
here with their primary text so that a second analyst can confirm the first-paint figures without
opening another file, and so that `AGENTS.md` §5's rebuild contract is not weakened by a spec that
only points at its predecessors.

**Source note.** `planalto.gov.br` was unreachable from this environment (E-L7), as it was at
`0006`'s law gate. Every article below is quoted from **Câmara dos Deputados — Legislação
Informatizada**, the official consolidated (*norma atualizada*) text, fetched in this session. That
is a primary official source; it is not my first choice, and `0006`'s carried precondition — that
X1's repair needs an environment which can reach `planalto.gov.br` — still stands unchanged.

### 5.1 — L1: the default daily journey, `8 h 48 min` (`hooks/use-work-calculator.ts:12`)

**Ruling: defensible as a default, and not a legal constant.** It requires no citation in
`lib/legal-tables.ts` and no disclosure, and this spec may hold it, paint it earlier or paint it
later without consulting me again.

| | |
|---|---|
| Norm | **CF/1988 art. 7º, XIII**; **CLT (Decreto-Lei nº 5.452/1943) art. 58, caput**; **CLT art. 59, §§ 2º, 5º e 6º** |
| Effective from | CF 1988-10-05 · CLT art. 58 caput in its consolidated form · CLT art. 59 §§5º-6º acrescidos pela **Lei nº 13.467, de 13/7/2017**, em vigor 120 dias após a publicação (**2017-11-11**) |
| Superseded by | in force |
| Source | https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html · https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html |

> **CF art. 7º, XIII** — duração do trabalho normal não superior a oito horas diárias e quarenta e
> quatro semanais, **facultada a compensação de horários e a redução da jornada, mediante acordo ou
> convenção coletiva de trabalho**;

> **CLT art. 58** — A duração normal do trabalho, para os empregados em qualquer atividade privada,
> não excederá de 8 (oito) horas diárias, **desde que não seja fixado expressamente outro limite**.

> **CLT art. 59, § 6º** — É lícito o regime de compensação de jornada estabelecido por acordo
> individual, tácito ou escrito, para a compensação no mesmo mês.

**Why 8 h 48 min is defensible.** 44 h ÷ 5 = 8,8 h = 8 h 48 min. It exceeds the eight-hour daily
figure in CF art. 7º XIII, and it is lawful anyway: the same inciso expressly faculta a compensação
de horários, art. 58 caput expressly admits *outro limite*, and art. 59 §6 — since 2017 — makes the
compensation regime lawful by **acordo individual, tácito ou escrito**. The five-day week with
Saturday compensated is the arrangement this describes, and it is the Brazilian common case that
`PRODUCT.md` §5 names.

**Why it needs no citation and no disclosure.** It is an **editable input**, not a computed output.
`0001` `legal.md` **E13** already recorded this by writing `Rule: —` against the exit-projection
example: *journey arithmetic*, no norm attributed. The app does not tell the user their journey is
8 h 48 min; it pre-fills a field with the common case and computes over whatever the field holds.
`PRODUCT.md` §4's *cite or omit* governs numbers the app **publishes as answers**; extending it to
every form default would require citing a norm for the value `0` in the dependants field.

Two boundaries this ruling does **not** cross, recorded so nobody reads them into it:

- It does **not** rule that the app should tell the user their 8 h 48 min journey presupposes a
  compensation agreement. That would be a new disclosure on a pre-existing surface, this spec opens
  neither `hooks/use-work-calculator.ts`'s defaults nor any string, and §8.3 records it as an open
  question for the human rather than as a finding.
- It does **not** disturb `0001` § Out of scope, which excludes **banco de horas e compensação**
  (CLT art. 59 §§2º–6º, art. 611-A XIII) from what the app computes. That exclusion stands, and
  `PRODUCT.md` §9's explicit non-claim for *banco de horas* stands with it.

### 5.2 — L2: the default overtime rates, 50% and 100% (`hooks/use-work-calculator.ts:13-14`)

**Ruling: 50% is the statutory floor and is correctly encoded. 100% is a user-editable second tier
with no statutory basis, and that was already accepted by the human at `0001`.** Unreached here.

| | |
|---|---|
| Norm | **CF/1988 art. 7º, XVI**; **CLT art. 59, caput e § 1º** |
| Effective from | CF 1988-10-05 · art. 59 caput e §1º com redação da **Lei nº 13.467/2017**, em vigor **2017-11-11** |
| Source | as §5.1 |

> **CF art. 7º, XVI** — remuneração do serviço extraordinário superior, no mínimo, em cinqüenta por
> cento à do normal;

> **CLT art. 59** — A duração diária do trabalho poderá ser acrescida de horas extras, em número não
> excedente de duas, por acordo individual, convenção coletiva ou acordo coletivo de trabalho.
> **§ 1º** A remuneração da hora extra será, pelo menos, 50% (cinquenta por cento) superior à da
> hora normal.

`DEFAULT_FIRST_TIER_RATE = 50` is the floor, exactly. The 120-minute first-tier limit at
`hooks/use-work-calculator.ts:10` is art. 59 caput's *"número não excedente de duas"*, and
`lib/compliance.ts:28-35` raises the warning when it is crossed, citing art. 59 and Súmula 376 do
TST. `DEFAULT_EXTRA_TIER_RATE = 100` is a **convention, not a norm** — `0001` `legal.md` § Known
imprecisions already carries the related weekend-tier acceptance, signed by the human on 2026-09-14.
Nothing on this spec's path changes either.

### 5.3 — L3: the night premium and the reduced hour

**Ruling: unreached, and correctly encoded.** `stats.nightMinutes` is computed in the first render
this spec measures, but it is **not rendered in either hero numeral** — it reaches the screen through
`DaySummary`, below the fold, and only when the journey crosses 22:00. On the default 08:00 → 17:48
journey it is zero and nothing about it paints.

| | |
|---|---|
| Norm | **CLT art. 73, caput, §§ 1º, 2º e 5º** |
| Effective from | redação do **Decreto-Lei nº 9.666, de 28/8/1946** |
| Source | https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-5452-1-maio-1943-415500-normaatualizada-pe.html |

> **Art. 73.** Salvo nos casos de revezamento semanal ou quinzenal, o trabalho noturno terá
> remuneração superior à do diurno e, para esse efeito, sua remuneração terá um acréscimo de **20%
> (vinte por cento)**, pelo menos, sobre a hora diurna.
> **§ 1º** A hora do trabalho noturno será computada como de **52 (cinqüenta e dois) minutos e 30
> (trinta) segundos**.
> **§ 2º** Considera-se noturno, para os efeitos deste artigo, o trabalho executado **entre as 22
> (vinte duas) horas de um dia e as 5 (cinco) horas do dia seguinte**.
> **§ 5º** Às prorrogações do trabalho noturno aplica-se o disposto neste capítulo.

Matches `lib/night-shift.ts` as verified at `0001` (R1, R2, R3) and re-verified at `0002` G6. The
Súmula 60, II reading — the hour worked after 05:00 is **not** counted as night time — remains the
recorded imprecision at `0001` § Out of scope, and it is named in the footer's gap list
(*"a prorrogação da jornada noturna depois das 5h (Súmula 60 do TST)"*), which is server-rendered at
first paint (E-L2). **That is the §4 obligation on this path, and it is already discharged before
the numeral it qualifies exists** — which is what `spec.md` § Disclosure obligations item 3 asks
for.

### 5.4 — L4: the INSS/IRRF tables behind `R$ 0,00`

**Ruling: unreached, and not re-verified — deliberately.** Verified digit by digit at `0002` G6, by
hand at `0005` G9 and `0006` G9, against **Portaria Interministerial MPS/MF nº 13, de 09/01/2026**
(RGPS) and **Lei nº 15.270/2025** (IRRF and the simplified reduction), as recorded in
`PRODUCT.md` §9 and `lib/legal-tables.ts`.

The relevant fact for **this** spec is arithmetic, not fiscal: with `DEFAULT_GROSS_SALARY = 0`
(`hooks/use-salary-calculator.ts:29`), **no bracket is entered and no table is consulted**. The
`R$ 0,00` the server paints is `0 − 0 − 0`, which is `0006` §2.3's C1 — the arithmetic identity of an
absent input, accompanied at first paint by the sentence that says so. **No tax-derived figure
reaches the user before hydration on either route**, which disposes of the concern `spec.md` L4
raises.

The year the tables belong to *is* on the first-paint path — the footer's fourth paragraph renders
`CURRENT_LEGAL_YEAR.year` and `effectiveFrom` with its source link, server-side (E-L2). That is
`PRODUCT.md` §4's third commitment and it must not be deferred behind hydration by any lever.
Recorded as **F2** in §8.1.

---

## 6. L7 — the Open Graph image

**Ruling: it asserts no figure, names no norm, and requires no citation. Finding B's fix changes a
host and nothing else.**

Read from the module (E-L6), not from the rendered card. `lib/og-image.tsx` renders exactly four
sentences:

| String | (a) | (b) | (c) |
|---|---|---|---|
| *"Jornada de trabalho, horas extras e saldo do dia"* | no | no | no |
| *"A que horas você pode sair, quanto já trabalhou e quanto tem de hora extra."* | no | no | no |
| *"Valor da hora e salário líquido CLT"* | no | no | no |
| *"Quanto vale a sua hora, já com INSS, IRRF e dependentes."* | no | no | no |

No rate, no bracket, no ceiling, no divisor, no year, no currency amount. The two `100%` literals are
`width`/`height` style values at `lib/og-image.tsx:29-30` and never render as text. The strings name
INSS, IRRF and dependentes as **variables the computation includes**, which `PRODUCT.md` §9 backs
(*"the 2026 IRRF table and the simplified deduction are correct"*) — they do not state a rate.

**Binding on Finding B** (lesson **004** — bind the replacement by what it must say, not by a list of
forbidden words): the fix is authorised to change **the host of the emitted URL** and nothing else.
The four sentences above are re-endorsed by any edit to this file (lesson **002**), so if a lever
rewrites them, the rewrite passes back through this test before it ships — the descriptor may not
gain a rate, a bracket, a year or an amount, and it may not claim a capability
`PRODUCT.md` §9 does not back. *Banco de horas* and its everyday synonyms remain retired
(`PRODUCT.md` §9 non-claims); the strings above are clean of it today.

---

## 7. `aria-live="polite"` on the hero numeral

The brief asks me to rule on it specifically, and the framing is right: **the value changing under a
screen-reader user is an announcement, not a silent correction.** But the obligation it creates
splits in two, and only one half is mine.

**Measured** (E-L1): the numeral takes exactly two values per cold load, so a screen-reader user
hears **exactly one** announcement of the swap, per route, per load. There is no churn, no
per-second tick, and no announcement on a page the user has not changed. That is the good case, and
**LR5.1 is what preserves it** — each additional distinct value the fix introduces is one more
unrequested announcement of a bare numeral.

**What is mine and is discharged:** `PRODUCT.md` §4's promise is not satisfied per-modality
(`0005` LR3). The figures on this path are announced: the ring's balance and overtime through
`statusAnnouncement` (`work-calculator.tsx:234`), and the hero numeral through its own live region.
Both land in the same render as their visual counterparts. Nothing is visually present and aurally
absent, or the reverse.

**What is not mine and is routed:** `hero-panel.tsx:44`'s `<p aria-live="polite">` has **no
accessible name**. The label that gives the figure its meaning — *Saída Prevista* on `/`,
*Valor por Hora* on `/custo-da-hora` (`lib/salary-period.ts:9`, `DEFAULT_PERIOD = "hour"` at
`hooks/use-salary-calculator.ts:33`) — is a sibling `<span>` at `hero-panel.tsx:37` with no
association to it. So the announcement a screen-reader user hears is the bare string *"18:48"*, with
no antecedent, once per load. That is an accessibility finding, it is **pre-existing**, it is **not
caused by this spec**, and it belongs to `web-standards-auditor`. It is **not a veto** and it does
not block this gate. Recorded as **X2** in §8.2, with an owner.

I am deliberately not dressing it as a legal finding. It would be easy to argue that a number
announced without its label is a number the app failed to make *ostensiva*, and the argument is not
absurd — but the surface is visible, legible and labelled **in the visual modality**, the figure it
carries is correct in both states, and stretching CDC art. 31 to reach an `aria-labelledby` is the
same over-extension I declined in §2.5. One standard, applied in both directions.

---

## 8. Findings, carried debt, and questions

### 8.1 — Divergences from the code

**None blocking.** `lib/` agrees with this analysis everywhere it is reached. Two findings, both
low, both instructions to `tech-lead` rather than edits by me (`AGENTS.md` §4 rule 5).

| # | Where | What is true | What is missing | Severity | Owner |
|---|---|---|---|---|---|
| **F1** | `hooks/use-work-calculator.ts:164`, `:186`, `hooks/use-salary-calculator.ts:137` | The restore guard is present and correct; the default cannot reach `localStorage` before restore (E-L3, §2.3). | **No test asserts it.** `hooks/**` sits at a 100% coverage bar, so every line is executed — but a covered line is not an asserted invariant, and the guard is exactly the kind of line a performance refactor moves. LR5.4 needs a check that seeds a key, runs the persistence effect with the restore flag unset, and fails if the seeded value is destroyed. | **low** — correct today, unprotected tomorrow | `qa-engineer` at G6; the test belongs to `frontend-dev` if `tech-lead` scopes it |
| **F2** | `components/organisms/calculator-views.tsx:88-95` | The table-year disclosure (`CURRENT_LEGAL_YEAR.year`, `effectiveFrom`, source link) is in the **server** response on both routes today (E-L2). | Nothing today. This is a **guard**: `PRODUCT.md` §4's third commitment — *"the year is part of the answer"* — is discharged at first paint, and any lever that defers the footer past hydration while the numeral stays server-rendered would make the citation arrive after the number it qualifies (`spec.md` § Disclosure obligations item 3). | **low** — guard, passes today | verified by me at G6 and G9 |

### 8.2 — Carried debt

| # | What | Status | Owner and trigger |
|---|---|---|---|
| **X1** | `lib/salary-period.ts:40` and `components/organisms/salary-calculator.tsx:151` attribute a general `jornada semanal × 5` divisor rule to **Súmula 431 do TST**, whose text covers only the 40 h case. Numbers (220/200) right, citation over-extended. | **Confirmed still recorded with an owner**, in `0006` `legal.md` §10.1 X1 and §13 Q2, `0006` `reports/legal.md` §8, `0006` `reports/release.md`, `0006` `STATUS.md` § Blockers. **Not re-triaged here**, per the brief. | `product-manager`, in the first spec with scope over `lib/salary-period.ts`, from an environment that can reach `planalto.gov.br` or `tst.jus.br`. **This spec opens neither file and is still not its place.** This is the fourth cycle it has been carried; a fifth carry with no scope is a process failure, not a finding, and it should go to the human. |
| **X2** | `components/organisms/hero-panel.tsx:44` — the `<p aria-live="polite">` carrying the hero numeral has no accessible name; its label at `hero-panel.tsx:37` is an unassociated sibling. One bare-numeral announcement per cold load (§7). | **New, non-blocking, not a legal finding.** | `web-standards-auditor` at G6. `hero-panel.tsx` **is** in this spec's scope (scope item 3), so it may be fixed here if the auditor and `product-designer` choose; it is not required by this gate and it is not an acceptance criterion I am asking for. If it is not fixed here, it is carried with the same owner. |

### 8.3 — Open questions for the human

| # | Question | Why it is here and not in a criterion |
|---|---|---|
| **Q1** | The app's default daily journey of **8 h 48 min** is lawful only under a regime de compensação de jornada (CF art. 7º XIII; CLT art. 58 caput; CLT art. 59 §6º — §5.1). The app never says so. Should it? | It is **not** a `PRODUCT.md` §4 gap under my own test: the app computes no compensation, claims none, and `PRODUCT.md` §9 already carries *banco de horas* as an **explicit non-claim**, retired from seven locations at `0002`. So silence here is consistent, not evasive. But it is the one place where the app's own *default* presupposes a legal arrangement it never names, and the person who should decide whether that is worth a line in the footer's gap list is the human, not this gate under a performance spec that opens no string. **Recorded, not required. Nothing blocks on it.** |
| **Q2** | `planalto.gov.br` is unreachable from this environment for the second consecutive law gate (E-L7). Every citation in §5 is from Câmara/Legin's consolidated text, which is official and which I verified in this session — but it is a fallback, and X1's repair has a stated precondition on reaching `planalto.gov.br`. | This is now an **infrastructure precondition on the law gate**, not a caveat on one spec. If it persists, X1 cannot be repaired by the process that owns it, and the squad should decide whether Câmara/Legin is an accepted primary source for this repository or whether the network path gets fixed. |

---

## 9. What this gate requires of the downstream gates

Short, because there is very little. Each item names the gate that owns it.

| Gate | What this analysis binds |
|---|---|
| **G3 `product-designer`** | Nothing is added to any screen. LR5 requires no layout, no caveat, no dimming, no provisional state, no skeleton. §3 § *What LR5 deliberately does not say* is binding: a design that marks the pre-hydration numeral as provisional is **not** implementing this file. |
| **G3 `content-writer`** | **No new string.** O1 is answered *no* (§2), so there is no disclosure to word. The four footer paragraphs, the three salary banners and the four compliance warnings are unchanged and re-endorsed as they stand (`0005` §3, `0006` §2). |
| **G4 `tech-lead`** | Write **LR5.1–LR5.4** into the acceptance criteria, with the probe in E-L1 as the verification command — it has been run in this tree, by me, against the deployed artifact (`AGENTS.md` §5). Scope **F1**'s missing assertion, or record why not. |
| **G5 `frontend-dev`** | The restore guards at `use-work-calculator.ts:164`, `:186` and `use-salary-calculator.ts:137` are **load-bearing**. A refactor that moves, merges or removes any of them without preserving the invariant is a rejection at G6, whatever it buys on the metric. |
| **G6 `qa-engineer`** | F1 — the LR5.4 assertion, seen red before it is trusted. |
| **G6 / G9 `web-standards-auditor`** | X2, non-blocking. And the reading in §4.3: if any lever moves a figure about the user's hours or money into an `aria-hidden` node, its accessible equivalent lands in the same render. |
| **G6 / G9 `labor-law-analyst`** | LR5.1–LR5.4 on both routes and both themes; F2's guard; §4.3's LR3 reading; §6's binding on Finding B's fix. |

---

## 10. Out of scope

| Excluded | Why | What the user sees instead |
|---|---|---|
| Any change to a rate, bracket, ceiling, divisor, rounding step or table | This spec reaches none of them, and `spec.md` § Out of scope already protects them | The same numbers, unchanged, to the centavo |
| Banco de horas / compensação de jornada (CLT art. 59 §§2º–6º; art. 611-A XIII) | `0001` § Out of scope and `PRODUCT.md` §9's explicit non-claim. §5.1 Q1 does not reopen it | The day balance, with no compensation regime attached |
| A disclosure about the pre-hydration default | §2. It is not a disclosure, and adding one would dilute the four the product already owes | The number, and the four footer paragraphs already beside it at first paint |
| A duration bound on the stale window | §2.4. The quantity carries no obligation at any magnitude | — |

## 11. Known imprecisions

| Imprecision | Impact on the number | Accepted by | When |
|---|---|---|---|

**Empty.** This spec introduces none, and it accepts none. The imprecisions already on record —
`0001`'s Súmula 60 II reading and the Saturday tier, both accepted by the human on 2026-09-14 — are
unchanged, and the footer's gap list that names the first is server-rendered at first paint (E-L2,
§5.3).
