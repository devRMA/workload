# 0014 — Remove Google Analytics

> Owner: product-manager · Gate: `spec` · Run 1 · Tree measured: `HEAD` **5c0c6fa**
>
> **Number taken: `0014`.** `0013` was free on disk at the time of writing (`ls -d .specs/0*/` returns
> `0001`–`0012`) but is **reserved for `tech-lead`** for a separate finding, per the routing note that
> opened this spec. `0014` is claimed here so the two cannot collide; if `0013` is never opened, the
> hole is a hole and the numbering rule in `.specs/README.md` — assigned in order, **never reused** —
> keeps it that way.
>
> **This spec states no norm, no article, no retention period and no rate.** Every one is a row in
> § Legal dependencies and is settled by `labor-law-analyst` at G2, blocking.

---

## Problem

A CLT worker opens WorkLoad on their phone, standing at a time clock, to answer one of
`PRODUCT.md` §1's three questions. A banner asks them about cookies. If they press **Aceitar Tudo** —
the visually dominant of the two choices — every interaction they make from then on sends a
description of their device to a server in the United States, and two identifier cookies are written
to their browser. Eight metres of scroll below, on the same page, the app tells them:

> *"Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor, e
> ninguém além de você vê seus horários ou seu salário."* — `components/organisms/calculator-views.tsx:79-80`

**The repository owner has ruled, today, that they were never using the data.** So the whole
apparatus — a consent decision the user has to make before they can read their own answer, a
transfer to another country, a false sentence on the results screen, and four `critical` findings
across two in-flight specs — buys nobody anything.

This spec removes Google Analytics from the product. Not switches it off: removes it.

## Audience & moment

The 10-second first contact, on a phone, from a cold load. The consent surface is the **only**
disclosure rendered on the first screen at 390×844 (`0010` `legal.md`), it covers the answer in
16 of 16 measured cells, and it is a question the product asks the user before the product answers
the question the user came with. Removing what it gates removes the reason to ask.

## Outcome

On any device, in any state — including a device that accepted the banner months ago — this
application causes **zero** bytes to reach Google, and **zero** `^_ga` cookies to exist on its own
origin. Measured, not asserted; the exact quantity, its instrument and both of its directions are in
§ Acceptance criteria.

---

## Why now — what today's numbers are

Every row below was measured **in this session**, on an isolated copy of `HEAD` 5c0c6fa
(`git archive HEAD | tar -x`, `node_modules` hard-linked, `next build` + `next start` on port 3142,
viewport 390×844), with every request to `*.googletagmanager.com`, `*.google-analytics.com` and
`*.analytics.google.com` intercepted by Playwright — `/gtag/js` allowed through so the real tag
executes, **every `g/collect` fulfilled locally with `204`, so no event data reached Google and no
property was polluted.** Scripts in `evidence/`; the full table is § Evidence.

| State | Requests to the Google hosts | `^_ga` cookies on this origin |
|---|---|---|
| Cold load, no consent stored | **0** | **none** |
| After *Aceitar Tudo* | **2** | **`_ga`, `_ga_TEST12345`** |
| After a **recorded refusal**, one interaction later | **1** | **`_ga`, `_ga_TEST12345`** |
| A device carrying a legacy `{"telemetry":true}` record, one load + one interaction | **3** | **`_ga`, `_ga_TEST12345`** |

Three facts follow, and each one is why this is a spec and not a delete:

1. **The instrument discriminates.** It prints `0` in the no-consent state and non-zero in the
   consented one, so a later run of zeroes is not a vacuous pass. That pre-consent `0` is the
   empty-collection control, and **on its own it proves nothing** — an acceptance criterion that
   scored only the cold load would pass against today's broken build.
2. **A recorded refusal still transmits.** `0011` `legal.md` §10.2 measured this as **F3**; it is
   reproduced above, in this session, against the artifact `0011` named, per lesson **032**. The
   user's choice is honoured at the next page load, which is a moment they do not choose.
3. **Turning the flag off is not removal, and the bundle proves it.** Rebuilding the same tree with
   `NEXT_PUBLIC_GA_ID=""` still ships a chunk containing the string `googletagmanager`:

   ```
   $ grep -rlE "googletagmanager|google-analytics" .next/static | wc -l
   1     # NEXT_PUBLIC_GA_ID="G-TEST12345"
   1     # NEXT_PUBLIC_GA_ID=""           ← .next/static/chunks/1e64ccvcwc9m_.js
   ```

   The environment variable gates *execution*, never *shipping*. Any remedy that stops at the flag
   passes a runtime check and fails AC3, which is the point of AC3.

And the standing record: `PRODUCT.md` §5 promises *"Offline and private… no upload of anyone's
salary. This is not a feature to be traded away later."* **Nothing in this request contradicts
`PRODUCT.md` §7** — removing a third-party recipient moves the product toward §5, not away from it.
The one place where `PRODUCT.md` and this change touch is §3's *"How it is funded: AdSense, behind
consent"* and §8, and that is **H2**, raised to the human below and settled by nobody else.

---

## The two decisions this spec exists to make

### Decision 1 — the consent machinery is **deleted with the purpose it gated**, not narrowed

**The bet, stated:** `lib/consent.ts` and `components/organisms/cookie-consent.tsx` are removed in
this spec, together with the Google Analytics unit.

**Why, in three steps.**

- The consent surface has exactly **one** non-essential purpose, and it is Google Analytics. Measured:
  `components/organisms/cookie-consent.tsx:121-147` is the only row carrying a control, its label reads
  *"Telemetria (Google Analytics)"* (`:124`), and `lib/consent.ts` stores exactly one boolean (`:21`).
  The *Cookies Essenciais* row at `:108-119` is `aria-hidden` decoration with no `role` and no handler —
  `0010` `legal.md` LC1 ruled it **not** a consent-bearing control, and `0011` F7 rules separately that
  what it **says** is false, because this app sets no first-party cookie of its own.
- Remove the purpose and the surface asks the user to decide about **nothing**, while continuing to
  name a recipient the app no longer has. That is not a neutral leftover: it is a rendered string
  asserting a data flow that does not exist, on the surface `0010` measured occluding the answer in
  **16/16** cells at **466 px**. A banner that gates nothing is a worse artifact than no banner.
- Once it renders in no state, the component is unreachable code, and the ladder says delete it.

**What a future ads spec has to rebuild under this bet, said plainly so the cost is not discovered
later.** It rebuilds the consent surface and the consent record from zero: today's 168 lines and
22 lines respectively. **What it does *not* rebuild is the specification**, and that is the whole
argument — `.specs/` already holds a far more complete description of that surface than the code
does, and `AGENTS.md` §5's rebuild contract is what makes deleting the code safe:

| What a future ads spec needs | Where it already exists, in a form `0014` does not touch |
|---|---|
| What the surface must say, per unit | `0011` `legal.md` §6.2–§6.9 (U1–U10), §22 D1–D10 |
| The opening state of every consent-bearing control, all seven axes | `0010` `legal.md` **LC1.1–LC1.7** |
| The record's required fields | `0011` `legal.md` §9.3 |
| What makes a transfer consent *specific and highlighted*, seven conditions | `0011` `legal.md` §26.5 **C1–C7** |
| Whether one act may carry two purposes | `0011` `legal.md` §8 |
| What revocation must actually do, three measurable clauses | `0011` `legal.md` §10.4 **RV1–RV3** |

**And the component being deleted satisfies almost none of it.** `0010` LC1.1 requires the switch to
open at `aria-checked="false"`; it opens `true` (`:15`, `useState(true)` — `0011` **F2**, `critical`).
`0011` §26.5 C1, C2, C3 and C7 are each unmet: no distinct act for the transfer, no separate element,
no prior information, no version in the record. `0011` **F11** measured **0** links to any policy in
the banner and **0** in the dialog. A future ads spec that inherited this component would inherit a
surface it has to rewrite anyway, plus four `critical` findings, plus the obligation to explain why
it kept them.

**The alternative bet, and what it would have bought.** Keeping `cookie-consent.tsx` and deleting only
its telemetry unit preserves the banner's layout, its motion and its focus handling — real work — and
keeps `lib/consent.ts` available as the module `0011` §23 plans for `ad-manager.tsx` to import when it
gates ads on consent. That last point is the strongest argument against this bet and it is **not**
resolved here: it is a cross-spec collision, recorded in `STATUS.md` and routed to `tech-lead`, who
owns sequencing. What is recorded as this spec's position is only this: `ad-manager.tsx` imports
nothing from `lib/consent.ts` **today** — measured, `git grep -n "lib/consent" components/organisms/ad-manager.tsx`
returns no rows — so deleting the module makes the ads path no worse than `0011` **F1** already
found it. It makes the future fix more expensive, and it does not make the present state less safe.

**H1** asks the human to accept this bet before G4 plans against it.

### Decision 2 — the residue on the user's device is **cleared**, once, and it is stated as a rule

**The rule, not a list of two keys:**

> When this application stops causing an operation, anything that operation left on the user's own
> device and that this application's origin can still reach is deleted on the next load — whether it
> was written by this app's code or by a script this app injected.

Today the rule returns exactly two members, and the enumeration is the rule's output, not its
definition: the consent record `workload_cookie_consent` in `localStorage`, and the cookies matching
`^_ga` on this origin.

**Why not "leave it".** Both survive a load untouched today — measured in both builds, § Evidence E6 —
and neither is inert. The record describes a consent for a product that no longer collects, and
`0011` §7 already rules every record written before its page is published **null**; the cookies are
identifiers with a two-year horizon that outlive the reason they exist. `0011`'s privacy page must
enumerate what is stored on the device (`legal.md` §6.4 U2), and a page that enumerates a live
consent record for a dead purpose describes the storage as something it is not.

**Why not "migrate".** There is no destination. GA is gone; there is no second purpose to carry the
boolean to.

**What it costs, and the honest ceiling.** Deleting the two `^_ga` cookies this origin can read does
**not** delete what Google already holds. This spec cannot reach that, says so in
§ Disclosure obligations, and hands the question of what is owed for it to G2 as **L7**.

**The precedent this reuses rather than invents.** `hooks/use-gross-hourly-rate.ts:11` already removes
a superseded key (`LEGACY_HOURLY_RATE_KEY`, `lib/storage.ts:1`) on mount. The pattern exists, is
tested, and is `tech-lead`'s to place — named here only to show the decision does not require a new
mechanism.

**Scored on a measured quantity.** AC4, with both directions printed in § Evidence.

---

## Scope

**Every list below is the output of a command re-run in this session, not the list the request
handed me.** Where the two disagree, the run wins. The commands are in § Evidence and each cell cites
the command, never the request.

### In scope

**S1 — the transmission unit.** `git grep -lEI "safeGAEvent|dataLayer|gtag|googletagmanager|google-analytics|NEXT_PUBLIC_GA_ID|@next/third-parties" -- . ':!.specs' ':!.agents' ':!pnpm-lock.yaml'` → **22 files** (E1). Deleted outright:

- `lib/analytics.ts`
- `components/organisms/analytics-wrapper.tsx`
- `__tests__/analytics.test.ts`
- `__tests__/analytics-wrapper.test.tsx`

Edited to drop the GA import, the call and nothing else — **eight call sites in four components**,
derived by `git grep -n "safeGAEvent(" app components lib hooks | grep -v "^lib/analytics.ts"`:

- `components/organisms/app-header.tsx:8` (import), `:16` `session_metadata`, `:59` `toggle_theme`
- `components/organisms/calculator-views.tsx:10` (import), `:50` `switch_tab`
- `components/organisms/tax-details-panel.tsx:5` (import), `:89` `add_deduction`, `:114` `add_gain`
- `components/organisms/work-calculator.tsx:7` (import), `:157` `toggle_manual_mode`, `:169` `reset_defaults`, `:249` `copy_to_clipboard`

**Eight call sites, eight named events — and the count is load-bearing:** AC1's guard asserts that
**8** interactions were exercised before it asserts 0 requests, so a run that exercises none and
reports none is a vacuous pass and is rejected.

Test files that mock `safeGAEvent` and must lose the mock — **seven**, and this is the half the
defect report never lists because nothing in them renders:
`__tests__/app-header.test.tsx`, `__tests__/calculator-page.test.tsx`,
`__tests__/calculator-views.test.tsx`, `__tests__/custo-da-hora-page.test.tsx`,
`__tests__/page.test.tsx`, `__tests__/salary-calculator.test.tsx`,
`__tests__/tax-details-panel.test.tsx`, `__tests__/work-calculator.test.tsx`.
*(That enumeration is eight names; the mock-only subset and the assert-on-`safeGAEvent` subset are
disjoint and `tech-lead` splits them at G4 — the count this spec binds is the one AC2's grep prints.)*

Configuration and delivery, GA half only:

- `package.json:27` — `@next/third-parties` removed; `pnpm-lock.yaml` inherits the change and is not
  hand-edited
- `.env.example:1` — `NEXT_PUBLIC_GA_ID`
- `.github/workflows/ci.yml:83`, `:139`, `:146` — `NEXT_PUBLIC_GA_ID`
- `playwright.config.ts:65` — `NEXT_PUBLIC_GA_ID`
- `__tests__/layout.test.tsx:34` — the `googletagmanager` preconnect assertion
- `tests/e2e/google-tracking.spec.ts:16-22` — *"should allow accepting cookies and load GA script"*

**S2 — the consent machinery that exists only to gate S1.** `git grep -lEI "CookieConsent|cookie-consent|TelemetryConsent|CONSENT_CHANGED_EVENT|workload_cookie_consent|lib/consent" -- . ':!.specs' ':!.agents' ':!pnpm-lock.yaml'` → **9 files** (E2). Per Decision 1:

- `lib/consent.ts` · `components/organisms/cookie-consent.tsx` · `__tests__/consent.test.ts` ·
  `__tests__/cookie-consent.test.tsx` — deleted
- `app/layout.tsx:6` (import), `:66` (mount) — the mount removed
- `playwright.config.ts:22-35` — the `storageState` that seeds `workload_cookie_consent` for the
  whole e2e suite
- `tests/e2e/support/legibility.ts:127` — the init script that clears the same key
- `tests/e2e/google-tracking.spec.ts:10-14`, `:39-42` — the two consent-surface tests

**The union of S1 and S2 is 28 files** (E-UNION), plus `pnpm-lock.yaml` as a derived artifact. No
file outside that union changes; AC5 checks it.

**S3 — the residue rule of Decision 2**, applied to its two current members.

**S4 — one string that is not deleted but *is* reopened, and therefore republished.** Lesson **002**:
any string a spec puts in scope is a claim the spec re-asserts. `components/organisms/calculator-views.tsx:79-80`
— *"Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor, e
ninguém além de você vê seus horários ou seu salário."* — is pinned by `__tests__/calculator-views.test.tsx:68`
and is `0011` **F9**, `critical`, for being false in the consented state. Removing GA changes its
truth conditions. **Whether it is then true, and whether it may stand unchanged, is L3 and is ruled at
G2**; this spec neither softens it nor declares it correct. `content-writer` gets the words only after
L3 returns.

**The claim table for every string this spec opens** — lesson **002**'s three questions, answered
before the gate sees them. All thirteen deleted strings live in `components/organisms/cookie-consent.tsx`:

| Line | The string | What it asserts | What backs it | If it simply vanished |
|---|---|---|---|---|
| `:53` | *Respeitamos sua privacidade* | A posture, no operand | Nothing to back | Nothing concluded wrongly — it is the surface's title |
| `:55-56` | *Usamos cookies para melhorar sua experiência e entender como você usa o WorkLoad. Você pode optar por desativar a telemetria a qualquer momento.* | **Three claims**: that cookies are used; a purpose; and that telemetry can be turned off *a qualquer momento* | The first two: GA, which is being removed. The third: **false today** — `0011` §10.4 measured revocation ineffective until the next document | The reader loses a sentence describing an operation that will no longer exist. **The revocability half is retired with the defect, not despite it** |
| `:66`, `:69`, `:72`, `:151` | *Configurar*, *Recusar*, *Aceitar Tudo*, *Salvar Preferências* | That a choice exists and is consequential | The choice gated GA | With no purpose, the choice is not consequential and the control is not owed |
| `:91`, `:103`, `:161` | *Fechar configurações de privacidade*, *Privacidade*, *Configurações de Privacidade* | That the app has privacy settings the user can reach | The settings were the telemetry switch | **This is the one with a cost, and it is named in § Disclosure obligations 3**: `0011`'s privacy page must be reachable, and this is the affordance that reaches nothing else today |
| `:110-111` | *Cookies Essenciais* / *Necessários para o funcionamento do site.* | That the site sets essential cookies | **Nothing** — `0011` **F7** measured that this app sets no first-party cookie of its own | A false claim is retired. It is not replaced, because the true version is *no cookie of ours at all* |
| `:114` | *Sempre ativo* | Same, as a state | Same — nothing | Same |
| `:124`, `:126` | *Telemetria (Google Analytics)* / *Ajuda a entender como o site é usado.* | That GA runs, and why | GA — removed here | The recipient's name leaves with the recipient |

Lesson **003** governs the two rows whose claim does not merely disappear with its feature — the
*Cookies Essenciais* pair and *Nada é enviado para nenhum servidor*. Both are handled by
§ Disclosure obligations and by **L8** (`PRODUCT.md` §9's claim table), never by silent deletion.

**S5 — one string marked unchanged, which is itself a claim** (`AGENTS.md` §5). `README.md:8` —
*"Roda no navegador, guarda tudo no seu aparelho, não pede cadastro."* — was ruled **true as written**
by `0011` `legal.md` §20.2 entry 6, with the ruling recorded there so nobody "fixes" it by symmetry.
The boundary search that admits it is E4, re-run this session and pasted in § Evidence. It changes
here only if L3's ruling reaches it, and AC8 makes that check explicit rather than assumed.

### Out of scope

Every exclusion below names **the property it protects** and **the gate that may override it**, and
every exemption the verifying criterion carries appears here in the same words.

1. **Google AdSense, in all ten of its files.** `git grep -lEI "GoogleAd|google-ad|ad-manager|AdManager|adsbygoogle|googlesyndication|ADSENSE|ENABLE_ADS" -- . ':!.specs' ':!.agents' ':!pnpm-lock.yaml'` → **10 files** (E3): `components/atoms/google-ad.tsx`, `components/organisms/ad-manager.tsx`, `app/layout.tsx:4,:65`, `.env.example:2-3`, `.github/workflows/ci.yml:84-85,:140-141,:147-148`, `playwright.config.ts:66-67`, `__tests__/ad-manager.test.tsx`, `__tests__/google-ad.test.tsx`, `__tests__/layout.test.tsx:36`, `tests/e2e/google-tracking.spec.ts:24-37`.
   **Protects:** `0011` **F1** keeps one owner, and the owner's stated intention to enable ads later keeps its dormant component. **Override:** G2 may rule (L4) that removing the only consent surface makes an env-gated ads injection unshippable. If it does, the override is **bounded to disabling the injection path at `components/organisms/ad-manager.tsx:10-19`** and is verified by **AC12** — no ad markup, no slot, no layout reserve and no `PRODUCT.md` §8 wording changes under it.
2. **Every number the app shows.** No file under `lib/` or `hooks/` that computes a user-visible value is opened; `lib/analytics.ts` and `lib/consent.ts` compute none. **Protects:** `AGENTS.md` §9's traceability bar and the 100% `lib/`/`hooks/` coverage floor. **Override: none.** A number that moves is a rejection at G6, routed to whichever spec owns that number (`0007`, `0012`), never absorbed here.
3. **`0010` and `0011` themselves.** Neither is rewritten, re-scoped or re-opened by this spec. **Protects:** two mid-pipeline gates running as this was written (`0010` G4, `0011` G3) against a spec that would invalidate their inputs underneath them. **Override: none from this gate.** The collision is recorded in `STATUS.md` as a routed item naming both specs and belongs to `tech-lead`.
4. **The privacy page.** It ships regardless of this spec and stays `0011`'s. **Protects:** the information duty, which GA's removal narrows and does not extinguish — `localStorage` still holds the user's inputs, the host still receives every request, and **U1–U10 remains `0011`'s enumerated count**. **Override: none.** What this removal empties out of that page's T2/T3 cells is **L5** and **L6**, ruled at G2 and written by `0011`, not here.
5. **The user's own inputs in `localStorage`** — the nineteen calculator keys of `0011` `legal.md` §6.10, across `hooks/use-work-calculator.ts:18-27`, `hooks/use-salary-calculator.ts:36-48` and `lib/storage.ts`. **Protects:** `PRODUCT.md` §5's offline promise; the answer must survive a reload. **Override: none.** The twentieth entry — the consent record — is in scope, and only as residue under Decision 2.
6. **The host.** Vercel still receives the IP, the time, the URL and the user-agent of every request, before any surface renders and regardless of any choice. **Protects:** the honesty of what this removal is allowed to claim — `0011` `legal.md` §15.3 as corrected by §26.4 rules host logs a **collection by the host**, not the same operation as the one being removed. **Override: none.** It is named in § Disclosure obligations 1 and is **L9**'s to characterise.
7. **`README.md:8`**, per S5. **Protects:** a ruling already on the record from being re-litigated by symmetry. **Override:** if L3 changes the footer's truth conditions, the same boundary search (E4) is re-run over `README.md` and the result recorded — and any change is **bounded to the clause that names where data goes**, verified by AC8.
8. **Every layout, hierarchy, type, colour, elevation and motion decision.** **Protects:** `DESIGN.md` and `product-designer`'s domain. **Override:** deleting two `position: fixed` containers vacates screen region that something may have to answer for; G3's designer owns whatever does, **bounded to the region the banner and the shield occupied**, and AC11 measures the vacancy without setting a target for it. *Note, and it is deliberately not a criterion:* `0010` measured the banner at **466 px** of occluded height and fixed chrome at **593 of 844 px**; those figures change here, and re-deriving them is **`0010`'s**, routed to `tech-lead`.
9. **Any replacement for the data GA was collecting.** Covered by § Non-goals 1 and 2 rather than by an exclusion, because the failure mode is an addition, not an omission.

---

## Legal dependencies

Every rule, threshold, duration and characterisation this change rests on, **named and not stated**.
`labor-law-analyst` settles each at G2, blocking, before anything is designed, worded or planned.
None of the rows below may be answered by any other agent, and none may reach the screen unruled.

| # | The dependency | Why this spec cannot settle it |
|---|---|---|
| **L1** | Whether an application may retire its only consent surface together with the single purpose it gated, and what — if anything — is owed to the user at the moment it does. | It is a question about consent as a legal instrument, not about a component. `0011` §7 already rules every record written to date **null**; whether a nullity plus a removal leaves anything outstanding is G2's. |
| **L2** | Whether the residue of Decision 2 **must** be deleted, by what trigger, and whether deleting it silently is itself a defect. | `0011` `legal.md` §14.2 raised exactly this shape for a different key — *"the one key a returning user still has, and the app deletes without telling them"*. The rule is stated here; its obligation is not. |
| **L3** | Whether `components/organisms/calculator-views.tsx:79-80` is **true** once GA is gone, and if not, which qualifier it needs and where in the sentence that qualifier must sit. | `0011` **F9** is `critical` on this exact string and `0011` §22 **D2** forbids disposing of it by deletion. The host still receives requests. Only G2 rules whether the sentence's scope — *what you type* — survives that. |
| **L4** | Whether removing the only consent surface, while `components/organisms/ad-manager.tsx` remains injectable by environment flag, breaches anything **today**, and what precondition a future ads spec inherits. | `0011` **F1** already found the ads path reads no consent at all. Whether the surface's absence changes that finding's severity is a legal ruling, and it is the trigger for Out of scope 1's bounded override. |
| **L5** | Which of `0011`'s findings are **discharged** by this removal, which **survive**, and which change owner: **F2**, **F3**, **F4**, **F9**, **F10** and the GA halves of **F5**, **F8** and **F11**. | A finding is discharged by the gate that raised it. This spec supplies the measurement; it does not grade `0011`'s own findings. |
| **L6** | What happens to `0011` `legal.md` §6.1's operation set when **T3** disappears and **T2** disappears with the surface that wrote it — and which of U1–U10's cells empty as a result. **U1–U10 remains the enumerated count**; the cells inside it are what move. | §6.1 is a domain test with a ruled output. Re-running it is the analyst's, at G2, and `0011`'s page inherits the result. |
| **L7** | What is owed about the data Google **already holds**, which deleting this origin's two cookies does not reach, and by which route a user asks for it. | The app cannot reach it; `0011` §22 **D6** already names the shape of the answer. The words and the route are G2's and `0011`'s. |
| **L8** | Whether `PRODUCT.md` §9's claim table needs a row — a claim, a non-claim, or both — for the footer sentence and for the retired *Cookies Essenciais* pair, and what the unlock sequence is. | Lesson **003**: a public claim is retired with a recorded non-claim and an unlock sequence, never silently. `0011` carries this as **H6**; the amendment is a human approval point under `AGENTS.md` §4. |
| **L9** | Whether, after this removal, **any** transfer of this application's causing remains, and how the host's receipt of each request is characterised. | `0011` §15.3 was amended at its own run 3 (§26.4) and the characterisation is unstable enough that this spec quoting it would be quoting a superseded ruling. |
| **L10** | Whether the privacy affordance at `cookie-consent.tsx:161` — the only standing privacy control in the product — may disappear before `0011`'s page exists to replace it, or whether its removal is conditioned on that page shipping. | It is a sequencing question with a legal floor underneath it. `tech-lead` owns the sequence; **only G2 says whether there is a floor**, and § Disclosure obligations 3 is written against whichever answer arrives. |
| **L11** | Whether anything must be **said** to a returning user whose device carried an accepted consent — at the moment the app stops honouring, and stops needing, that acceptance. | `0011` §7.5 required a re-ask against information that now exists. With the purpose gone there is nothing to re-ask **for**; whether that converts the obligation into a notice, or extinguishes it, is G2's. |

**Nothing in this table is answered anywhere in this document.** A downstream agent that finds a norm,
an article, a period or a rate asserted in `spec.md` has found a defect and should bounce it.

---

## Acceptance criteria

Every criterion below is scored on a **quantity measured in this session, in both directions**, on
the artifact named — lessons **040** and **051**. Where a known-good state is not reachable before
the change, the criterion says so in its own row rather than implying otherwise. Every command was
run by the author, in this tree or in the isolated copy of it, and its output is pasted in § Evidence.

| # | Criterion | How it is verified — with the known-bad and known-good values |
|---|---|---|
| **AC1** | On the delivered build, in **each of three device states**, the count of network requests whose URL host matches `(^\|\.)google-analytics\.com$`, `(^\|\.)analytics\.google\.com$` or `(^\|\.)googletagmanager\.com$` is **0**, and the count of cookies on the application's own origin whose name matches `^_ga` is **0**. The three states: **S-a** cold load, empty storage; **S-b** after **eight** interactions, one at each former `safeGAEvent` call site; **S-c** a device seeded with `{"telemetry":true,"timestamp":0}` under `workload_cookie_consent` **and** with `_ga` and `_ga_TEST12345` cookies already set. **The guard asserts `exercised = 8` before it asserts 0 requests**, and counts every exemption so that `exercised + exempt = 8`; a run that exercises zero and reports zero is a vacuous pass and is rejected. | `evidence/measure.mjs` and `evidence/legacy.mjs`, Playwright, 390×844, production build. **Known-bad, measured this session on `HEAD` 5c0c6fa with `NEXT_PUBLIC_GA_ID="G-TEST12345"`:** S-a `0` requests / no cookies; after *Aceitar Tudo* `2` requests / `["_ga","_ga_TEST12345"]`; after a **recorded refusal** `1` request / same cookies; S-c `3` requests / same cookies. **Known-good, measured this session on the same tree with `NEXT_PUBLIC_GA_ID=""`:** every state `0` requests, `[]` cookies, `hosts: []`. **S-a on its own does not discriminate** — it prints `0` on the broken build too, and is recorded as the empty-collection control. |
| **AC2** | `git grep -nEI "safeGAEvent\|dataLayer\|gtag\|googletagmanager\|google-analytics\|analytics\.google\|NEXT_PUBLIC_GA_ID\|@next/third-parties" -- . ':!.specs' ':!.agents'` returns **zero rows**. The boundary is the **whole tree** including configuration, CI and the lockfile — not a file and a line. | **Known-bad, run in this tree this session:** the same search returns matches in **22 files** (`git grep -l …` → 22, E1). **Known-good:** zero rows, which is the command's output on any tree that never had GA — reachable and checkable by running it against the same pattern restricted to `lib/utils.ts`, which returns nothing today. |
| **AC3** | In a production build made with `NEXT_PUBLIC_GA_ID` **set to a non-empty value** in the environment, `grep -rlE "googletagmanager\|google-analytics" .next/static \| wc -l` returns **0**. | This is the criterion the flag-flip remedy fails, and both of its known-bad values were measured this session on `HEAD` 5c0c6fa: **`1`** with `NEXT_PUBLIC_GA_ID="G-TEST12345"`, and **`1` again** with `NEXT_PUBLIC_GA_ID=""` (`.next/static/chunks/1e64ccvcwc9m_.js`). **Known-good:** `0`, reachable only once the dependency and the wrapper leave the tree — which is what AC3 exists to prove. The build runs in an isolated copy with its own `.next` and its own port, and `rm -rf .next` precedes it because a `NEXT_PUBLIC_*` flag changed (`AGENTS.md` §4 rule 6). |
| **AC4** | After **one** load of the delivered build on the S-c device of AC1, `localStorage.getItem("workload_cookie_consent")` is `null` **and** the count of `document.cookie` entries on this origin matching `^_ga` is `0`. | `evidence/residue.mjs`. **Known-bad, measured this session, and it is the same on both builds:** `{"record":"{\"telemetry\":true,\"timestamp\":0}","ga":["_ga","_ga_TEST12345"]}` — the residue survives a load untouched whether GA is on or off, which is why Decision 2 needs code and not a flag. **Known-good, measured in the same page immediately after:** `{"record":null,"ga":[]}`. Both directions printed; the quantity is not constant. |
| **AC5** | The set of files the change touches equals the **28-file union** of E1 and E2 recorded in § Scope, plus `pnpm-lock.yaml`, **minus** any file whose only match is an AdSense symbol. `git diff --name-only <base>..HEAD` contains no path outside that set. | The union is reproduced by re-running E1 and E2 and taking `sort -u`; § Evidence pastes the 28 names. **Known-bad:** any path outside the union in the diff — e.g. a file under `lib/` that computes a number — fails on sight. **Known-good:** the union itself, which the two greps print today. |
| **AC6** | `pnpm check` is clean, and `pnpm test:coverage` holds **100%** for `lib/**` and `hooks/**` and **90%** for `app/**` and `components/**`. Deleting tested files may not be paid for by lowering a threshold: `vitest.config.ts`'s threshold values are byte-identical before and after, checked by `git diff vitest.config.ts` returning **empty**. | The thresholds are enforced by config, so the run fails rather than reports. **Known-bad:** a `git diff vitest.config.ts` with any threshold line in it. **Known-good:** empty output, which is what the command returns on this tree today. |
| **AC7** | On the delivered build at 390×844, in **both** themes, on a fresh device **and** on the S-c device: the count of elements matching the consent banner's text and the count matching the standing privacy control's accessible name are **both 0**. | `evidence/surface.mjs`. **Known-bad, measured this session, four cells:** fresh device, light `banner=1 shield=0`; fresh device, dark `banner=1 shield=0`; S-c device `banner=0 shield=1` (`evidence/legacy.mjs`). Every state today renders **exactly one** of the two. **Known-good is not reachable before the change** — stated rather than implied. The quantity is a direct count of the thing being removed, monotonic in it, not a relation between two derived values (lesson **040**), and its floor of 0 is unambiguous in both directions. |
| **AC8** | `components/organisms/calculator-views.tsx:79-80` ships the text **L3 ruled**, `__tests__/calculator-views.test.tsx:68` pins that same text, and `copy.md` records the ruling it came from by section number. If L3 rules the string unchanged, `copy.md` says so **in those words** and `git diff` on both files is empty. The same boundary search (E4) is re-run over `README.md` in either case, and its output is pasted into the G6 report. | **Known-bad:** the string shipping with no L3 citation anywhere, which is today's state — `git grep -n "Nada é enviado"` returns one source row and one test row, and no artifact cites a ruling for either. **Known-good:** a `copy.md` section number that resolves in `legal.md`, checked by opening it. No criterion here says "correct", "appropriate" or "as expected"; it says which file names which section. |
| **AC9** | `@next/third-parties` appears in neither `package.json` nor `pnpm-lock.yaml`, and `pnpm install --frozen-lockfile` exits `0`. **No dependency is added.** | `grep -c "third-parties" package.json pnpm-lock.yaml`. **Known-bad, run in this tree this session:** `package.json:27` plus three rows in `pnpm-lock.yaml` — **4 matches in 2 files**. **Known-good:** `0` in both, which is what the same grep prints for any package not installed here. |
| **AC10** | The e2e test named *"should never place an ad above the calculator"* (`tests/e2e/google-tracking.spec.ts:24-37`) still exists, still runs, and still passes — with its `page.click('button:has-text("Aceitar Tudo")')` precondition replaced, because the button it clicks is being deleted. **Before it is called passing, name the input that would make it fail** (`AGENTS.md` §5): an `ins.adsbygoogle` placed in DOM order before the `Sua Jornada` heading. If that input cannot be constructed, the guard is dead and that is a **new finding**, not a closed one. | **Known-bad:** the test as written after the banner is deleted — its first line waits for a button that no longer exists, so it fails at the click, not at the assertion. **Known-good:** the same assertion driven from a state reached without the banner. It guards `PRODUCT.md` §8 and has nothing to do with GA; losing it silently while deleting its neighbours in the same file is the failure this criterion exists to prevent. |
| **AC11** | On the delivered build at 390×844, both themes, the count of `position: fixed` elements belonging to the consent surface is **0**, measured by `getComputedStyle().position === "fixed"` over the document. **This criterion sets no target for what the vacated region becomes** — that is Out of scope 8's bounded override and `0010`'s budget. | **Known-bad, from `0010`'s own measurements, cited and not re-derived here:** the banner occupies **466 px** (`354..820`) and fixed chrome totals **593 of 844 px**. **Known-good:** the two containers absent, count `0`. Whoever re-derives the resulting occlusion figures is `0010`, routed via `tech-lead`; this spec measures only the absence. |
| **AC12** | *Conditional — binds only if **L4** rules the ads path unshippable without a consent surface.* If it does: `components/organisms/ad-manager.tsx:10-19` injects no script in any environment, verified by the count of `script[src*="pagead2.googlesyndication.com"]` being **0** with `NEXT_PUBLIC_ENABLE_ADS="true"` and `NEXT_PUBLIC_ADSENSE_ID` set. **No ad markup, slot, layout reserve or `PRODUCT.md` §8 wording changes under this override.** | **Known-bad:** the same count with the same environment today — `__tests__/ad-manager.test.tsx` asserts the script **is** injected with no consent stored, which `0011` **F1** calls the defect codified as expected behaviour. **Known-good:** `0`, reachable by the same build with `NEXT_PUBLIC_ENABLE_ADS="false"`, which is production's setting per `0011` §24 **Q5**. If L4 does not rule, **this criterion does not apply and its absence is not a bounce.** |

**No criterion above contains "properly", "correctly", "nicely" or "as expected".** Each names a
command, a count and two values.

**Every input this spec introduces has a stated default**, and the count of such inputs is **zero**:
this spec adds no field, no toggle and no setting. The only user-facing default it changes is the
removal of a decision the user was being asked to make, which `PRODUCT.md` §5 — *"the default is the
common case… everything else is a step the user takes deliberately, not a form they have to
disarm"* — settles in favour of not asking.

---

## Evidence

Every row was produced by the author in this session. Commands marked **[iso]** ran in an isolated
copy of `HEAD` 5c0c6fa at `<scratchpad>/iso` — `git archive HEAD | tar -x`, `node_modules`
hard-linked, its **own** `.next` and its **own** port `3142`, confirmed free before binding
(`AGENTS.md` §4 rule 6). Nothing was measured in the repository, and no file in the repository was
mutated. `uptime` at the start of the run: load average `4.63` on **16** cores.

| # | Claim | Command | Output |
|---|---|---|---|
| **E1** | The transmission unit spans 22 files | `git grep -lEI "safeGAEvent\|dataLayer\|gtag\|googletagmanager\|google-analytics\|NEXT_PUBLIC_GA_ID\|@next/third-parties" -- . ':!.specs' ':!.agents' ':!pnpm-lock.yaml'` | **22** files, listed in § Scope S1 |
| **E2** | The consent machinery spans 9 files | `git grep -lEI "CookieConsent\|cookie-consent\|TelemetryConsent\|CONSENT_CHANGED_EVENT\|workload_cookie_consent\|lib/consent" -- . ':!.specs' ':!.agents' ':!pnpm-lock.yaml'` | **9** files, listed in § Scope S2 |
| **E3** | The AdSense boundary spans 10 files and is disjoint from neither | same pattern over `GoogleAd\|google-ad\|ad-manager\|AdManager\|adsbygoogle\|googlesyndication\|ADSENSE\|ENABLE_ADS` | **10** files; overlaps E1∪E2 at `app/layout.tsx`, `.env.example`, `.github/workflows/ci.yml`, `playwright.config.ts`, `__tests__/layout.test.tsx`, `tests/e2e/google-tracking.spec.ts` — **six shared files, which is why AC5 subtracts by symbol and not by path** |
| **E-UNION** | The change's file boundary is 28 files | `{ E1; E2; } \| sort -u` | **28**: `app/layout.tsx`, `components/organisms/analytics-wrapper.tsx`, `components/organisms/app-header.tsx`, `components/organisms/calculator-views.tsx`, `components/organisms/cookie-consent.tsx`, `components/organisms/tax-details-panel.tsx`, `components/organisms/work-calculator.tsx`, `.env.example`, `.github/workflows/ci.yml`, `lib/analytics.ts`, `lib/consent.ts`, `package.json`, `playwright.config.ts`, `__tests__/analytics.test.ts`, `__tests__/analytics-wrapper.test.tsx`, `__tests__/app-header.test.tsx`, `__tests__/calculator-page.test.tsx`, `__tests__/calculator-views.test.tsx`, `__tests__/consent.test.ts`, `__tests__/cookie-consent.test.tsx`, `__tests__/custo-da-hora-page.test.tsx`, `__tests__/layout.test.tsx`, `__tests__/page.test.tsx`, `__tests__/salary-calculator.test.tsx`, `__tests__/tax-details-panel.test.tsx`, `__tests__/work-calculator.test.tsx`, `tests/e2e/google-tracking.spec.ts`, `tests/e2e/support/legibility.ts` |
| **E4** | The strings asserting where data goes | `git grep -nEI "servidor\|navegador\|privacidade\|Privacidade\|cookie\|Cookie\|telemetria\|Telemetria\|rastrea\|coleta\|dados" -- app components lib hooks README.md` | 17 rows; the user-visible subset is the 13 strings of § Scope S4's table, plus `calculator-views.tsx:79`, plus `README.md:8` |
| **E5** | Egress and cookies, four states, both directions | `evidence/measure.mjs` **[iso]** | **GA on:** `A no-consent requests=0 gaCookies=[]` · `B after-accept requests=2 scripts=1 gaCookies=["_ga","_ga_TEST12345"]` · `D after-revoke requests=1 scripts=1 gaCookies=["_ga","_ga_TEST12345"]` · `hosts: ["www.googletagmanager.com/gtag/js","www.google-analytics.com/g/collect"]` · `consentRecord={"telemetry":false,…}`. **GA off:** every state `requests=0 scripts=0 gaCookies=[]`, `hosts: []` |
| **E6** | Residue survives a load untouched, and is reachable-zero | `evidence/residue.mjs` **[iso]** | `residue-after-one-load {"record":"{\"telemetry\":true,\"timestamp\":0}","ga":["_ga","_ga_TEST12345"]}` · `residue-after-deletion {"record":null,"ga":[]}` |
| **E7** | The legacy-consented device transmits without ever seeing a banner | `evidence/legacy.mjs` **[iso]** | **GA on:** `requests=3 scripts=1 gaCookies=["_ga","_ga_TEST12345"]`, `banner visible=0`, `shield present=1`. **GA off:** `requests=0 scripts=0 gaCookies=[]`, same surface counts |
| **E8** | The consent surface renders in every state, one control or the other | `evidence/surface.mjs` **[iso]** | `light fresh banner=1 shield=0` · `dark fresh banner=1 shield=0`; with E7's `banner=0 shield=1` on the seeded device |
| **E9** | The flag does not remove the bundle | `grep -rlE "googletagmanager\|google-analytics" .next/static \| wc -l` **[iso]**, after `rm -rf .next` and a full build at each flag value | `1` with `NEXT_PUBLIC_GA_ID="G-TEST12345"`; `1` with `NEXT_PUBLIC_GA_ID=""` → `.next/static/chunks/1e64ccvcwc9m_.js`. *(`grep -rl "G-TEST12345" .next/static` is `1` and `0` respectively — the **ID** is stripped by the flag, the **transport** is not.)* |
| **E10** | The ads path does not read consent, so deleting `lib/consent.ts` does not regress it | `git grep -n "lib/consent" components/organisms/ad-manager.tsx components/atoms/google-ad.tsx` | no rows |
| **E11** | Nothing in the tree deletes a cookie | `git grep -nEI "document\.cookie\|removeItem" -- app components lib hooks` | **2** rows, both `localStorage`: `hooks/use-gross-hourly-rate.ts:11`, `lib/storage.ts:31`. No cookie is ever deleted by this application |
| **E12** | The dependency's footprint | `grep -n "third-parties" package.json pnpm-lock.yaml` | **4 matches in 2 files** — `package.json:27`, `pnpm-lock.yaml:169,689,3145` |

**One negative result, recorded so it is not read as a product defect.** A measurement run against a
server still holding a **deleted** `.next` returned a 500 on a chunk, no hydration, `banner=0` and
`shield=1` — every one of those observations false about the product. The cause was a stale
`next start` holding port 3142 while the directory beneath it was rebuilt. It is `AGENTS.md` §4
rule 6 reproduced inside my own isolated copy, and no figure in this document comes from that run.

---

## Disclosure obligations

Where this change computes, or stops computing, something a user could reasonably read differently
from what is true (`PRODUCT.md` §4, *name the gap*). **This section states what must be said, never
the words and never the norm** — `content-writer` writes at G3, from G2's ruling and nothing else.

1. **Removing Google Analytics does not make the app serverless, and the app may not imply it does.**
   Every request still reaches the host, with the IP, the time, the URL and the user-agent, before
   any surface renders and regardless of any choice the user makes — `0011` `legal.md` §6.1 **T5**,
   §22 **D7**. A removal announced as *"nothing leaves your device"* would replace one overstatement
   with another. The exact characterisation and its wording are **L9** and **L3**.
2. **The true half of the footer survives the correction of the false half.** `0011` §22 **D2**
   states it as a rule: the claim that the calculation runs entirely in the browser must remain
   rendered in every state, and *a correction that removes it to dispose of F9 is a rejection, not a
   pass.* This spec binds itself to the same rule.
3. **The standing privacy control is the only route the product has to anything about privacy, and it
   is being deleted.** `0011` **F11** measured **0** links to any policy from the banner and **0**
   from the settings dialog — so what the shield reaches today is a dialog with one dead row and one
   false row. Deleting it removes an affordance that leads nowhere, **and** the product's only
   privacy-shaped surface. **L10** rules whether that removal may precede `0011`'s page; whichever way
   it rules, the answer is a route and never a softer sentence.
4. **The user is not told their stored consent record was deleted**, unless **L2** says they must be.
   Decision 2 clears it on the next load. `0011` §14.2 raised the identical shape for a different key
   and called it out; it is named here rather than discovered at G6.
5. **What Google already holds is not reached by anything in this spec.** Deleting two cookies on this
   origin deletes two cookies on this origin. **L7** rules what is owed about the rest, and where the
   user goes to ask.
6. **The retired claims get recorded non-claims, not silence** (lesson **003**). The *Cookies
   Essenciais* pair asserted something `0011` **F7** measured to be false, and it is being deleted
   along with the surface that carried it — which means it leaves the product with no record that it
   was ever wrong. **L8** decides whether `PRODUCT.md` §9 gains a row, and the unlock sequence for
   each: what a human must change, what must be built, when the claim table may gain the row back,
   and only then when the words may return.

---

## Non-goals

What a well-meaning agent downstream might add, and must not.

1. **Do not replace Google Analytics with another analytics product.** Not Plausible, not Umami, not
   a self-hosted collector, not a Vercel-native one. `PRODUCT.md` §3: *"What it depends on: nothing at
   runtime. No API, no database, no auth."* The owner's ruling is that they were not using the data —
   the remedy for unused data is not cheaper data.
2. **Do not keep a "privacy-friendly" counter, a page-view ping or a single beacon**, however small,
   however anonymous. AC1 scores **0**, and `0` has no small version.
3. **Do not build the replacement consent surface here.** It is a future ads spec's, and every input
   it needs is already written down — § Decision 1's table says where.
4. **Do not write, draft or stub the privacy page.** It is `0011`'s and it ships regardless.
5. **Do not soften `calculator-views.tsx:79-80` on your own judgement.** L3 rules it. A rewrite that
   passes through it untouched re-publishes it (lesson **002**); a rewrite that deletes it breaches
   `0011` §22 **D2**. Both are rejections.
6. **Do not delete, disable or "tidy" the AdSense path** — Out of scope 1, unless L4 opens AC12's
   bounded override, which changes exactly one thing and names it.
7. **Do not add a toast, banner, modal or notice** telling the user their consent record was removed,
   unless **L2** requires it. An unrequested notice is a new surface on the first screen, which is
   the thing this spec is removing.
8. **Do not amend `PRODUCT.md` §3 or §8.** That is **H2**, a human approval point under `AGENTS.md`
   §4, and an agent softening *"AdSense, behind cookie consent"* to match the code would be editing
   the document that outranks it.
9. **Do not re-scope, re-open or "align" `0010` or `0011`.** Out of scope 3. The collision is real, it
   is recorded in `STATUS.md`, and it is `tech-lead`'s.
10. **Do not lower a coverage threshold to pay for deleted tests.** AC6 checks `vitest.config.ts` is
    byte-identical.

---

## Open questions and the defaults chosen

| # | Question | Default chosen | Why it is the default, and who can change it |
|---|---|---|---|
| **H1** | Does the human accept **Decision 1** — that `components/organisms/cookie-consent.tsx` and `lib/consent.ts` are deleted rather than narrowed? | **Delete.** | `AGENTS.md` §4 makes deletion outside a declared scope a human approval point; this is inside the declared scope but touches `PRODUCT.md` §8's operative words, so it is raised anyway. The bet, its cost and the alternative are written out in Decision 1 so the human is choosing between two stated options and not ratifying a preference. **Only the human.** |
| **H2** | Do `PRODUCT.md` §3's *"How it is funded: AdSense, behind consent"* and §8's *"behind cookie consent"* stay as written, once the consent surface is gone and the ads path remains env-gated? | **Stay as written.** | They describe what the product **will** do when ads ship, not what it does today, and `0011` §24 **Q5** records the human's ruling that ads are off in production. Changing them here would weaken a promise in order to match a temporary state. **Only the human**, and an agent that edits either section has breached Non-goal 8. |
| **Q1** | Does anything replace the vacated fixed-chrome region at the bottom of the first screen? | **Nothing, in this spec.** | Out of scope 8. `0010` owns the occlusion budget and is mid-pipeline; a designer decision made here would land on top of a gate that is running. `product-designer` at G3, bounded to that region, or `0010` via `tech-lead`. |
| **Q2** | Does the e2e suite's `storageState` seed need a replacement once `workload_cookie_consent` means nothing? | **No seed.** | The seed exists (`playwright.config.ts:22-35`) so the whole suite runs without the banner in the way. With no banner there is nothing to seed past. **But removing it changes the state every e2e geometry assertion runs in**, including `0006`'s legibility guards and `0010`'s occlusion measurements — which is a routed item in `STATUS.md`, not a decision taken here. `tech-lead` at G4. |
| **Q3** | Is `0011`'s privacy page still worth its maintenance burden once GA is gone? | **Yes — the page ships.** | Named in the routing note that opened this spec and consistent with `0011` §24 **Q1**: `localStorage` still holds the user's inputs and the host still receives every request, so the information duty narrows and does not vanish. **U1–U10 remains `0011`'s enumerated count.** Which cells empty is **L6**. `0011`'s **H5** is the human's, unchanged by this spec. |

---

## What this spec deliberately does not claim

- **It does not claim `0011`'s findings are closed.** It supplies a measurement; **L5** grades them.
- **It does not claim the app becomes "private" or "offline".** The host is Out of scope 6 and
  § Disclosure obligations 1.
- **It does not claim `PRODUCT.md` §9 gains or loses a row.** That is **L8** and **H2**.
- **It does not claim a sequence against `0010` or `0011`.** That is `tech-lead`'s, and the collision
  is recorded rather than resolved.
