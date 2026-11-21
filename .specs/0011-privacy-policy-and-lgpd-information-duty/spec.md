# 0011 — Privacy policy and the LGPD information duty

> Owner: product-manager · Gate: `spec` · Run 1
>
> **Opened by human ruling, 2026-09-16**, ahead of every other spec in the queue. The finding is
> `.specs/0010-disclosure-reachability-on-mobile/legal.md` §12 **F3** and §16 **Q1**: the app asks
> for cookie consent and there is no privacy policy and no cookie policy anywhere in it. Five of the
> seven information units LGPD art. 9º requires are presented nowhere, and art. 9º § 1º makes consent
> obtained that way **null**. It is live on production and it is the only finding in the queue with
> direct legal exposure to the site's owner.
>
> **This spec states no legal rule.** Every norm, unit, retention period and applicability question
> below is *named* and left open; `labor-law-analyst` settles each one at G2 and `content-writer`
> writes the pt-BR prose at G3. Nothing here is drafted legal text and nothing here is a ruling.

---

## Problem

A CLT worker opens WorkLoad on their phone to find out what time they can leave. Before they get an
answer, a panel asks them to accept cookies. It says *"Respeitamos sua privacidade"* and names
*"Telemetria (Google Analytics)"*, and there is nowhere in the application they can go to find out
who is behind the site, what is actually collected, where it goes, how long it is kept, or what they
can do about it. There is no link on the banner, no link in the footer, and no page to link to.

The same footer they can reach tells them *"Nada é enviado para nenhum servidor"*
(`components/organisms/calculator-views.tsx:75`), on a page that loads Google Analytics as soon as
they tap *Aceitar Tudo*.

So the user is asked to make an informed decision by a product that has not informed them, and is
separately told something that stops being true the moment they say yes.

## Audience & moment

**The ten-second first contact, and it is the wrong moment.** The consent panel is the first thing
on the screen (`0010` `legal.md` §4.2: `position: fixed`, 354..820 at 390×844, covering the answer).
This spec does not put a policy in front of that user — it gives them somewhere to go, from the
surface that asks, and it makes the ask honest.

The second reader is the one who goes looking: a user exercising a right, or the controller
answering a request. They arrive at a URL, not at a banner.

## Outcome

- A user who is being asked for consent can reach, from the surface doing the asking, a page that
  presents the art. 9º information — before they decide, not after.
- Every claim the app makes about where the user's data goes is true in every state the app can be
  in, including "consent granted".
- The controller can point at a published page when asked to discharge the art. 8º § 2º burden.

## The `PRODUCT.md` check, run before anything else

`PRODUCT.md` outranks this spec. Read end to end against the request:

- **§7 — no legal advice.** A page describing this application's own processing is a disclosure about
  itself, not advice about what anyone should do. **No contradiction**, and § Non-goals 5 and § Out
  of scope 7 keep it that way.
- **§7 — no account, no sync, no cloud; no timesheet history.** The page adds no storage, no
  endpoint and no record. **No contradiction.**
- **§7 — pt-BR only.** The page is pt-BR. **No contradiction.**
- **§7 — no *convenção coletiva* database, because it cannot be kept accurate.** This is the one that
  reaches. It is a **maintainability** test, and `0010` §16 Q1 applied it to this exact question. It
  is **not resolved here**: it is **Q1**, it is precondition **H5**, and it is the human's. What is
  recorded instead of a decision is the asymmetry — a stale privacy policy is a false statement about
  processing that is happening, and the alternative to publishing is to stop the processing, not to
  publish less.
- **§8 — AdSense behind cookie consent.** The code does not implement this sentence (P6). That is a
  contradiction between `PRODUCT.md` and the tree, not between `PRODUCT.md` and this spec, and
  `PRODUCT.md` wins: scope item 8 moves the code toward §8, never the other way.
- **§9 — what the product may claim.** The footer's *"nada é enviado para nenhum servidor"* is in no
  row of the evidence table and cannot be carried forward unchanged. Scope item 6 and AC13.

**Nothing here required stopping the spec before writing it.** One question does require the human
before G3 ships words, and it is Q1/H5.

---

## How this scope was derived

Not from the brief that opened the spec. Four domain tests, each a test on what a code path or a
string *does* — never an enumeration — run over the tree in this session. The lists below are the
tests' **output**, not their definition; a member the test admits and the list lacks deletes the
list, not the test.

**D1 — consent.** Any code path that asks the user for a consent state, records one, reads one, or
changes behaviour because of one.

```
$ grep -rln "readTelemetryConsent\|writeTelemetryConsent\|CONSENT_CHANGED_EVENT\|CookieConsent" \
    app components hooks lib __tests__ tests | sort
app/layout.tsx
components/organisms/analytics-wrapper.tsx
components/organisms/cookie-consent.tsx
lib/consent.ts
__tests__/analytics-wrapper.test.tsx
__tests__/consent.test.ts
__tests__/cookie-consent.test.tsx
```

**D2 — egress and persistence.** Any code path that causes data originating on the user's device to
reach a party other than that browser, or to persist beyond the page.

```
$ grep -rln "googlesyndication\|googletagmanager\|GoogleAnalytics\|adsbygoogle\|gtag\|dataLayer\|safeGAEvent\|localStorage" \
    app components hooks lib | sort
components/atoms/google-ad.tsx
components/organisms/ad-manager.tsx
components/organisms/analytics-wrapper.tsx
components/organisms/app-header.tsx
components/organisms/calculator-views.tsx
components/organisms/tax-details-panel.tsx
components/organisms/work-calculator.tsx
hooks/use-gross-hourly-rate.ts
hooks/use-salary-calculator.ts
hooks/use-work-calculator.ts
lib/analytics.ts
lib/consent.ts
lib/storage.ts
```

> **The brief's version of this search is narrower than the tree.** It named
> `components/organisms/cookie-consent.tsx` and `components/atoms/analytics-wrapper.tsx:12` as
> starting points. The second path does not exist: the file is
> **`components/organisms/analytics-wrapper.tsx:12`**. Where this run and the brief disagree, the
> run wins.
>
> A first pass of D2 without `safeGAEvent` returned **9** files and missed four call sites that
> transmit — `app-header.tsx`, `calculator-views.tsx`, `tax-details-panel.tsx`,
> `work-calculator.tsx`. The corrected command above returns **13**. Recorded because the
> under-counted list is the one a reader reconstructs from the import names.

**D3 — privacy claims.** Any user-visible or crawler-visible string that asserts what happens to the
user's data: where it is kept, who receives it, what it is used for, or that it is private, local or
not transmitted. The grep below is the test's *input*: it returns **11 rows**, of which **7 are
admitted** by the test (grouped into 6 entries below, because four of them are adjacent sentences of
two strings). `calculator-views.tsx:86` is admitted by the grep and **rejected by the test** — its
*"servidor"* is a public employee, not a machine — and so are the three UI labels at
`cookie-consent.tsx:91`, `:103`, `:161`, which name the settings surface and assert nothing about
data.

```
$ grep -rn "navegador\|servidor\|privacidade\|Privacidade\|cookies\|Cookies\|telemetria\|Telemetria\|seus dados\|aparelho\|cadastro" \
    app components lib hooks README.md --include="*.tsx" --include="*.ts" --include="*.md"
```

| Where | What it asserts | Admitted by D3 |
|---|---|---|
| `components/organisms/cookie-consent.tsx:53` | *"Respeitamos sua privacidade"* — a stance | yes |
| `components/organisms/cookie-consent.tsx:55-56` | cookies are used to improve the experience and understand usage; telemetry can be switched off at any time — a **purpose** and a **revocability** claim | yes |
| `components/organisms/cookie-consent.tsx:110-111` | *Cookies Essenciais* / *"Necessários para o funcionamento do site."* — a necessity claim | yes |
| `components/organisms/cookie-consent.tsx:124-125` | *Telemetria (Google Analytics)* / *"Ajuda a entender como o site é usado."* — names a recipient and a purpose | yes |
| `components/organisms/calculator-views.tsx:75-76` | *"Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor, e ninguém além de você vê seus horários ou seu salário."* | yes |
| `README.md:8` | *"Roda no navegador, guarda tudo no seu aparelho, não pede cadastro."* | yes |
| `components/organisms/cookie-consent.tsx:91`, `:103`, `:161` | UI labels naming the settings surface; assert nothing about data | no |
| `components/organisms/calculator-views.tsx:86` | *"não vale para servidor estadual ou municipal"* — a regime claim | no |
| `components/organisms/cookie-consent.tsx:3` | an icon import | no |

`__tests__/calculator-views.test.tsx:68` pins the `calculator-views.tsx:75` string
(`getByText(/fica salvo apenas neste navegador/)`), so it inherits any correction and is named here
rather than discovered at G5.

**D4 — asserted operands.** Any constant or environment value the code uses to decide, on the user's
behalf, whether a third party receives data or whether consent exists. A constant asserts to nobody,
renders nothing, and is invisible to D1–D3 (lesson **045**).

```
$ grep -rn "NEXT_PUBLIC_GA_ID\|NEXT_PUBLIC_ADSENSE_ID\|NEXT_PUBLIC_ENABLE_ADS\|useState(true)\|CONSENT_KEY" \
    app components lib hooks
components/organisms/cookie-consent.tsx:15   const [telemetryEnabled, setTelemetryEnabled] = useState(true);
components/organisms/ad-manager.tsx:7        const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;
components/organisms/ad-manager.tsx:8        const enableAds = process.env.NEXT_PUBLIC_ENABLE_ADS === "true";
components/organisms/analytics-wrapper.tsx:9 const gaId = process.env.NEXT_PUBLIC_GA_ID;
components/atoms/google-ad.tsx:12            const adClient = process.env.NEXT_PUBLIC_ADSENSE_ID;
lib/consent.ts:1                             const CONSENT_KEY = "workload_cookie_consent";
lib/consent.ts:7,:21                         the read and the write of the consent record
```

Every one of these is a legal dependency, not a `lib/` detail, and each has a row in § Legal
dependencies.

---

## What the app actually does with data — established, not assumed

A policy that misdescribes the processing is worse than no policy, so every line below was produced
by a command in this session rather than read off `PRODUCT.md`. **These are observations of the
code, not legal classifications** — whether any of it is *dado pessoal*, and under which basis, is
G2's.

**P1 — the calculation never leaves the browser. Confirmed.** `PRODUCT.md` §5 says so; the tree
agrees. There is no network call, no server action and no route handler in the application code:

```
$ grep -rn "fetch(\|XMLHttpRequest\|sendBeacon\|axios\|\"use server\"" app components lib hooks \
    --include="*.ts" --include="*.tsx"
$ echo $?
1
```

**P2 — the inputs persist in `localStorage`, on the device, unconditionally.** Entry, lunch,
overtime rates, gross salary, monthly hours, dependents, regime, period, extra deductions and extra
gains: `hooks/use-work-calculator.ts:166-173`, `:187`, `hooks/use-salary-calculator.ts:139-146`,
through `lib/storage.ts`. These writes are **not** behind consent and the consent surface does not
mention them. Whether they should be is G2's, under the *cookies essenciais* claim at
`components/organisms/cookie-consent.tsx:110-111`.

**P3 — the consent record itself.** `lib/consent.ts:21` writes
`workload_cookie_consent = {"telemetry": true|false, "timestamp": 1758000000000}` to `localStorage`. It
has no version, no expiry and no record of *what was shown* when it was given — which is what art.
8º § 2º's burden is discharged with. Named for G2; no remedy is asserted here.

**P4 — Google Analytics loads only on an affirmative stored consent. Confirmed.**
`components/organisms/analytics-wrapper.tsx:12` is `readTelemetryConsent() === true`, and `:19`
returns `null` otherwise; `lib/consent.ts:5-18` returns `null` for an absent, malformed or
non-boolean record. `__tests__/analytics-wrapper.test.tsx:21,27,34` assert all three negative cases.
The brief asked for this to be verified rather than assumed: it holds.

**P5 — what is sent to Google Analytics is more than page views, and it is a device fingerprint
set.** `components/organisms/app-header.tsx:16-24` fires `session_metadata` on mount with
`screen_width`, `screen_height`, `viewport_width`, `viewport_height`, `device_pixel_ratio`,
`user_language` and `timezone`. Six further events carry interaction parameters:
`app-header.tsx:59` (`toggle_theme`), `calculator-views.tsx:50` (`switch_tab`),
`work-calculator.tsx:157` (`toggle_manual_mode`), `:169` (`reset_defaults`), `:249`
(`copy_to_clipboard`), `tax-details-panel.tsx:89` (`add_deduction`), `:114` (`add_gain`). Google
additionally receives the IP address of every request it serves. **The policy must describe this
set, not "melhorar sua experiência".**

**P6 — the advertising script is gated on environment variables, not on consent.**
`components/organisms/ad-manager.tsx:10-19` injects
`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` from a `useEffect` whose only
conditions are `NEXT_PUBLIC_ADSENSE_ID` and `NEXT_PUBLIC_ENABLE_ADS === "true"`. It never reads
`lib/consent.ts`. `PRODUCT.md` §8 says *"AdSense, behind cookie consent"*; the code does not
implement that sentence. Separately, **the consent surface has no advertising category at all** —
`components/organisms/cookie-consent.tsx` offers *Cookies Essenciais* and *Telemetria (Google
Analytics)*, and the accept button is labelled *Aceitar Tudo*. Whether one telemetry consent can
carry an advertising purpose is G2's, under art. 8º § 4º.

**P7 — third parties that receive something, as the code stands.** `Google LLC` via Google Analytics
(P4, P5) and via Google AdSense (P6, when enabled); **Vercel** as the host, which receives the IP and
request metadata of every load before any consent exists. No other origin is contacted: the font is
self-hosted by `next/font/google` at build time — `Atkinson_Hyperlegible_Next` at
`app/layout.tsx:9-13`, and the production HTML contains no `fonts.googleapis.com` or
`fonts.gstatic.com`. The list of recipients the policy must name is G2's to fix; this is the input
to it.

**P8 — production is not the artifact this spec is written against.** The deployed HTML at
`https://workload.devrma.com/` (HTTP 200, 41 882 bytes, fetched this session) carries
`<link rel="preconnect" href="https://www.googletagmanager.com">` and
`<link rel="preconnect" href="https://pagead2.googlesyndication.com" crossorigin="anonymous">`,
which open a connection to Google before any consent. **That is not a finding for this spec**: the
lines were removed by commit `4b9572d`, which is in `HEAD` and not in `origin/main`
(`git show origin/main:app/layout.tsx` still has them at `:58-59`), and production serves
`origin/main`, **45 commits behind** — the same stale-artifact condition `0004` recorded. Following
lesson **032**, production is context here and is excluded from every pass/fail arithmetic. Every
criterion below is written against `HEAD`.

---

## Scope

Stated as what must **exist** and be **true**, never as what it says. The seven art. 9º units are
`labor-law-analyst`'s to enumerate and fill at G2; every pt-BR word is `content-writer`'s at G3;
every route name, file path and component is `tech-lead`'s at G4.

1. **A published privacy-and-cookies page.** One new route, reachable by URL, carrying the art. 9º
   I–VII information for every processing operation established in P1–P7 — including the ones that
   are **not** consent-based (P2's `localStorage` writes, P7's host). It is a single page unless G2
   rules that a cookie-specific disclosure must be separable; this spec does not split it.
2. **A route to that page from every surface that asks for or manages consent**, reachable *before*
   the decision is made: the first-level banner, the second-level settings dialog, and the standing
   settings control at `components/organisms/cookie-consent.tsx:156-166`. `0010` `legal.md` §4.4
   already prices the banner link at **+28 px** and treats it as raising the floor, so it is not a
   new geometry question here.
3. **A route to that page from the application's standing furniture**, so the second reader — the one
   who arrives after consenting, or after clearing storage — can find it without a consent surface
   on screen. The footer at `components/organisms/calculator-views.tsx:73-101` is where every other
   standing disclosure lives.
4. **The page in the site's own indexing surfaces** — `app/sitemap.ts` currently lists two URLs
   (`:11`, `:17`) and the new page is a third. `app/robots.ts` must not exclude it.
5. **Correction of every string D3 admits, to what is true in every state the app can be in.** The
   binding form is what each must **say**, not a forbidden-word list: any string asserting where the
   user's data goes carries its qualifier **adjacent to the noun it limits**, and no string on a
   screen asserts an absence of transmission that the same screen's consented state contradicts.
   `components/organisms/calculator-views.tsx:75-76` is the instance; `README.md:8` and
   `components/organisms/cookie-consent.tsx:55-56`, `:110-111`, `:124-125` are the siblings, checked
   on the same pass because a rename landing in one of two adjacent strings manufactures a
   contradiction this spec created. The wording is `content-writer`'s; the truth condition is G2's.
6. **`PRODUCT.md` § 9 reconciled.** *"Nada é enviado para nenhum servidor"* is a public claim that is
   in no row of the evidence table. Per lesson **003**, it is retired with a recorded **non-claim
   row** naming why, and whatever replaces it gains a row of its own with its evidence — in the same
   amendment as the string change, never by silent deletion. The amendment is drafted here and
   **applied only by the human** (`AGENTS.md` §4, human approval points).
7. **The consent record's default.** `0010` F2a: `components/organisms/cookie-consent.tsx:15` is
   `useState(true)`, so a user who taps *Configurar* then *Salvar Preferências* without touching the
   switch is recorded as having consented to Google Analytics. This is a consent-**validity** defect,
   not a layout one, and `0010` `legal.md` §12 routes it to *"a consent spec"*. **This is that spec
   and it is taken here.** See § Boundaries.
8. **The consent gate over every third-party origin, not only over Google Analytics.** P6: no
   script, connection or cookie belonging to an analytics or advertising origin is initiated before
   an affirmative consent record exists that covers that purpose. This is in scope because the
   alternative is a policy that truthfully describes a practice `PRODUCT.md` §8 forbids — the
   document that outranks this spec. **How** it is gated is `tech-lead`'s; whether one consent may
   cover both purposes is G2's.

## Out of scope

Each exclusion states the property it protects and the gate that may override it. An exclusion and
the criterion that verifies it can disagree; when they do, **the exclusion is the one out of date**
and it is corrected here, in this file.

1. **Every number the calculator shows.** Protects the falsifiability of "no number moves": a
   reviewer can assert it with one diff over `lib/` and `hooks/`. **Overridden by nothing** — a
   legal finding about a calculated number at G2 is routed to its own spec, not absorbed. `0007`
   holds the divisor and the days-per-week operand; `0003` holds the citation registry.
2. **What any existing disclosure about the *calculation* says** — the omissions paragraph, the
   table-year line, the CLT warnings. Protects `0003`'s and `0007`'s ownership of citation content.
   Overridable only by G2, and only where a *privacy* correction in scope item 5 would otherwise
   leave a sibling string on the same screen contradicting it.
3. **Where the consent surface renders, what it occludes, and its geometry.** `0010` owns that, has
   measured it over 16 cells and has a G2 ruling in hand. Protects a single owner for the 466 px of
   occluded height and keeps two live specs from drawing the same box. **Two bounded exemptions,
   named here because AC3 carries them.** First, the **link** scope item 2 adds to the banner
   changes its height; `0010` `legal.md` §4.4 already prices it at **+28 px** as part of its own
   floor, so the height belongs to `0010`'s budget and the *obligation to link* belongs here.
   Second, if L3 requires an advertising category, the second-level dialog gains a row — its
   **presence** is decided here, its **geometry** by `0010` or by whichever spec holds the surface
   when the task lands. Beyond those two, **overridden by G4 only as sequencing**: if both specs land
   tasks in `components/organisms/cookie-consent.tsx`, `tech-lead` orders them; neither spec's
   *decisions* move.
4. **`0010` F2b** — DS4 spending 50 px of horizontal chrome against LR2a's 32 px budget at
   `components/organisms/cookie-consent.tsx:47`. It is a legibility-geometry defect, `0010`
   `legal.md` §12 puts it in `0010`'s scope when the remedy touches the banner's box, and `0010`'s
   remedy does. Protects the same single-owner property as 3. Overridden if `0010` closes without
   taking it, in which case `tech-lead` routes it — not this spec by assumption.
5. **Any account, login, data-export or deletion *mechanism*.** `PRODUCT.md` §7 refuses accounts and
   backends, and there is no server to delete from. Protects §7. The **information** about how a
   right is exercised is in scope (item 1); the machinery is not. Overridable only by a human
   amendment to §7.
6. **A consent-management platform, a cookie-scanner dependency, or any new runtime dependency.**
   `PRODUCT.md` §3: nothing at runtime, maintained by one person. Protects the offline guarantee.
   Overridable at G4 only with the written justification `AGENTS.md` §8 requires, and only if the
   obligation cannot be met without it.
7. **Legal advice, and any statement about what a user should do.** `PRODUCT.md` §7. The page
   describes this application's own processing and nothing else. Not overridable by any gate.
8. **Consent-rate and revenue effects of adding a link, a category or a gate.** Nobody in this
   pipeline has measured one, and `0010` § Out of scope 9 already forbids assuming it in either
   direction. Protects every criterion here from being traded against a number that does not exist.
   Overridable only by the human supplying the measurement.
9. **English.** `PRODUCT.md` §7. Not overridable.

---

## Preconditions — the human's, and nothing downstream can invent them

Recorded the way `0007` recorded its `planalto.gov.br` precondition: with an owner, blocking the
gate it blocks, and **with no placeholder**. A privacy policy that names a fictional controller or an
unmonitored inbox is a worse artifact than the absence it replaces.

| # | What is needed | Owner | Blocks |
|---|---|---|---|
| **H1** | **Who the controller is** — the legal or natural person responsible for `workload.devrma.com`, in the form that person is willing to publish. `app/layout.tsx:27-29` names *Rafael Augusto* as `authors`/`creator` and *devRMA* as `publisher`; **that is an authorship credit, not a controller identification**, and this spec does not promote one into the other. | human | **G3 copy.** G2 may rule on *what* must be identified without it. |
| **H2** | **A contact channel for data-subject requests** — an address or form that is actually monitored. There is none anywhere in the repository. | human | **G3 copy.** |
| **H3** | **Whether an encarregado is named**, and if so their identity or the channel that stands in for it. | human | G2 rules on whether it is required; G3 needs the value. |
| **H4** | **Whether `NEXT_PUBLIC_ENABLE_ADS` is `true` on the Vercel production environment**, and whether the AdSense account is configured for personalised ads. The repository's `.env` has `false`; the production value is not in the repository and cannot be read from the deployed HTML, because `ad-manager.tsx` injects client-side. P6's severity depends on the answer. | human | G2's ruling on scope item 8. |
| **H5** | **Acceptance of the maintenance obligation.** `PRODUCT.md` §7 refuses a *convenção coletiva* database because it cannot be kept accurate, and `0010` §16 Q1 applies the same test here: a policy that drifts from the processing is a false statement, not a stale one. `PRODUCT.md` §3 says one person maintains this. | human | Nothing downstream — but if the answer is no, the pipeline stops here and the remedy is to stop processing rather than to publish. |
| **H6** | **The `PRODUCT.md` § 9 amendment** drafted under scope item 6. `AGENTS.md` §4 makes a `PRODUCT.md` change a human approval point. | human | G7 docs. |

## Legal dependencies

Named, never stated. Every one is `labor-law-analyst`'s to settle at G2, with its source, before
anything is drawn or written. **No number, unit, period or name below may reach a screen without
passing G2.**

| # | The dependency | Why this change needs it |
|---|---|---|
| **L1** | The seven information units of LGPD art. 9º, I–VII, enumerated and each one's required content | They are the page's contract. Scope item 1 says the page carries them; only G2 says what each one is. |
| **L2** | LGPD art. 9º § 1º — the condition under which consent already given is void, and what re-consent (if any) the fix requires for users who accepted before the page existed | Decides whether shipping the page is sufficient or whether stored consents must be invalidated. This spec asserts neither. |
| **L3** | LGPD art. 8º § 4º — whether one consent may carry both the analytics and the advertising purpose, or whether the surface needs a second category | Settles scope item 8 and whether *Aceitar Tudo* is an accurate label. |
| **L4** | LGPD art. 8º § 2º — what the controller must be able to prove, and whether P3's consent record (`{telemetry, timestamp}`, no version, no record of what was shown) discharges it | Decides whether the consent record's shape changes. |
| **L5** | LGPD art. 8º § 5º — the standard for free and facilitated revocation, measured against the standing control at `components/organisms/cookie-consent.tsx:156-166` | `0010` `legal.md` §2 already reads this clause as satisfied; re-ruled here because this spec changes what is being consented to. |
| **L6** | LGPD art. 18 and the **explicit mention** art. 9º VII requires | Fixes what the page must say about rights, and how. |
| **L7** | LGPD art. 5º — whether each item in P5 (`screen_width`, `screen_height`, `viewport_width`, `viewport_height`, `device_pixel_ratio`, `user_language`, `timezone`), the IP address, and the P2 `localStorage` contents (including **gross salary and dependents**) are *dados pessoais*, and whether any is *sensível* | Decides what the page must describe and at what standard. The salary figure is the sharpest case and it never leaves the device (P1). |
| **L8** | The **lawful basis** for each operation in P1–P7 that is *not* consent — the P2 `localStorage` writes, and the host's receipt of the IP (P7) | The consent surface calls storage *essencial*; G2 rules whether that claim holds and under which basis. |
| **L9** | **Retention periods** — art. 9º II's *forma e duração* — for: the consent record, the P2 calculator inputs, Google Analytics data, and AdSense cookies | The page must state a duration for each. None exists anywhere today. |
| **L10** | LGPD arts. 33 and 26 (as applicable) on **international transfer**, given that P7's recipients process outside Brazil | The page must say so if required. |
| **L11** | Google's role for each product — *operador* or *controlador conjunto*, per product (Analytics, AdSense) — and what art. 9º V and VI then require the page to say | Changes the responsibilities section materially. |
| **L12** | Whether **Lei nº 12.965/2014 (Marco Civil da Internet)**, arts. 7º, 10 and 15, imposes any duty on this application, and whether the host's logs fall under it | Named because a privacy page that is silent about it may be incomplete; G2 decides applicability, including deciding it does not apply. |
| **L13** | **ANPD** guidance in force on cookie banners and second-level surfaces — `0010` `legal.md` §2 R5 cites the *Guia Orientativo — Cookies e Proteção de Dados Pessoais*, v1.0, outubro/2022, and rules on its weight | Binds the reject-button, second-level and easy-access-link expectations against which art. 8º § 2º is measured. |
| **L14** | Whether a controller of this size must appoint and publish an **encarregado**, under art. 41 and the ANPD's small-agent regime | Settles H3. |
| **L15** | Whether the default at `components/organisms/cookie-consent.tsx:15` (`useState(true)`) makes a consent recorded through *Salvar Preferências* invalid, and what the compliant default is | Scope item 7 / `0010` F2a. The spec states the defect, never the rule. |
| **L16** | The truth condition for each D3 string — what a string asserting where the user's data goes must **say** to be true in the consented state, and where in the sentence the qualifier must sit | Scope item 5. `content-writer` needs the condition before it can write a word. |

**Defaults for every input this spec introduces.** The spec introduces no calculator field. It
introduces exactly one user-settable state whose default changes: the telemetry switch at
`components/organisms/cookie-consent.tsx:15`, today `true`. **This spec does not set the new
default** — it is L15, and it is G2's. The common case in `PRODUCT.md` §5 is a user who came to read
a number and did not come to configure anything, which is why the default is a legal dependency
rather than a product preference.

## Boundaries with the live specs

| Spec | What it keeps | What moves here | Stated in both directions |
|---|---|---|---|
| `0010` | Where the consent surface renders, what it occludes, its geometry, **F1**, and **F2b** (`cookie-consent.tsx:47`, `p-6`, LR2a by 18 px) | **F2a** — `cookie-consent.tsx:15` `useState(true)`. It is a consent-validity defect and `0010` `legal.md` §12 routed it to *"a consent spec"* with the trigger *"the first spec that opens `cookie-consent.tsx`"*. This is it. And **F3**, in full. | Yes: `0010` § Out of scope 7 already reserves *what the surface asks and stores*, which is exactly items 7 and 8 here; and § Out of scope 3 and 4 above return the geometry to `0010`. `tech-lead` records the exchange in both `STATUS.md` files at G4. |
| `0003` | The citation registry and what a disclosure about a *number* says | Nothing | § Out of scope 2 |
| `0007` | Súmula 431, the divisor, the days-per-week operand | Nothing | § Out of scope 1 |
| `0008` | Flow height above `#salario-bruto` | Nothing. A footer link (scope item 3) sits **below** that boundary and spends none of `0008`'s budget, on the same reasoning `0010` `legal.md` §12 F1 used. | § Out of scope 3 |
| `0009` | Test falsifiability, and the class-string assertions | Nothing — but every guard this spec creates is bound by `AGENTS.md` §5 *How an instrument's reading is trusted*: it asserts the size of the set it iterates before iterating, and zero is never a pass. | AC10 |

---

## Acceptance criteria

Every command below was run in this tree, in this session, by `product-manager`. Each row carries
the **known-bad** output it produced today and the **known-good** output that closes it, so no
criterion is accepted on the failing side alone (lesson **040**). Route names, file paths and
component names are `tech-lead`'s — no criterion names one.

| # | Criterion | How it is verified | Known-bad (today) | Known-good |
|---|---|---|---|---|
| **AC1** | The application serves a page whose content is the art. 9º I–VII information G2 enumerates, at a stable URL, server-rendered. | `find app -name "page.tsx" \| sort` | `app/custo-da-hora/page.tsx`, `app/page.tsx` — **2** | **3**, the third being the policy page. A reviewer opens it and finds each L1 unit under its own heading. |
| **AC2** | Every unit G2 enumerates under L1 is present on that page, and the count of units found equals the count G2 enumerated. The guard asserts the expected count **before** iterating; zero is not a pass and `>= 1` does not discriminate. | `pnpm vitest run` on the page’s test file (named by `tech-lead` at G4) — command form verified today: `pnpm vitest run __tests__/analytics-wrapper.test.tsx` → `Test Files 1 passed (1) / Tests 6 passed (6)` | no page, no guard | `measured + exempt = expected`, with `expected` equal to G2's enumerated count and any exemption named. |
| **AC3** | From a cold load with no stored consent, the first-level banner offers a route to the policy page **before** *Aceitar Tudo*, *Recusar* or *Salvar Preferências* can be pressed; the second-level dialog does too; and so does the standing control at `components/organisms/cookie-consent.tsx:156-166`. | `grep -rno 'href="[^"]*"' components/organisms/cookie-consent.tsx` | **no output — zero links on the consent surface** | three link targets, each resolving to the AC1 page. A test renders each of the three states and asserts `3` links found against an expected `3`. |
| **AC4** | The policy page is reachable from the standing footer on both routes, in every consent state including *consent granted* (when no banner renders). | `grep -rno 'href="[^"]*"' components/organisms/calculator-views.tsx` | **no output** | one link target resolving to the AC1 page, rendered by the shared footer at `:73-101` so both routes inherit it. |
| **AC5** | The policy page is listed in the sitemap and not excluded by robots. | `grep -n "url:" app/sitemap.ts` | 2 entries (`:11`, `:17`) | 3 entries; `pnpm vitest run __tests__/sitemap.test.ts` and `__tests__/robots.test.ts` pass with the expected count updated. |
| **AC6** | No string anywhere in the shipped tree or its tests asserts an absence of transmission that the consented state contradicts. Binding form: a string asserting where the user's data goes carries its qualifier **adjacent to the noun it limits**; G2 fixes the truth condition (L16), `content-writer` the words. | `grep -rn "Nada é enviado para nenhum servidor" app components __tests__ tests README.md` | **1 row** — `components/organisms/calculator-views.tsx:75` | **0 rows.** The command is shown to discriminate: the same grep over `lib hooks` returns nothing (exit 1) today. The forbidden literal is a **backstop, not the specification** — AC7 carries the positive obligation. |
| **AC7** | Every string D3 admits is checked against its sibling on the same screen after the correction, and none contradicts another. The pass names, string by string, what each asserts and what backs it. | the D3 command in § *How this scope was derived*, re-run, with its output pasted into `reports/qa.md` and `reports/legal.md` | 11 rows, 6 admitted, 1 of them false in the consented state | the same command, every admitted row ruled true by G2 against the state it renders in. |
| **AC8** | With `NEXT_PUBLIC_ADSENSE_ID` set, `NEXT_PUBLIC_ENABLE_ADS="true"` and **no stored consent**, no `script[src*="pagead2.googlesyndication.com"]` is appended to the document. | `pnpm vitest run __tests__/ad-manager.test.tsx` | `3 passed (3)` — and the third case, *"loads the AdSense script once and renders a single slot"*, **passes with no consent stored**, which is P6 codified as expected behaviour | the same file passes with that case inverted and a consented case added; `measured + exempt = expected` over the consent states. |
| **AC9** | The telemetry switch's opening state equals the value L15 fixes, and a user who opens the settings dialog and presses *Salvar Preferências* without touching the switch records that value. | `pnpm vitest run __tests__/cookie-consent.test.tsx` | passes today with `useState(true)` at `components/organisms/cookie-consent.tsx:15` — the save-without-touching path records consent to Google Analytics | the same file passes against L15's value, with an assertion that fails if `:15` is changed back. |
| **AC10** | No guard this spec adds is vacuous. For each one, the artifact names the input that would make it fail, and the guard asserts the size of the set it iterates before iterating. | `pnpm test`, plus the per-guard statement in `reports/qa.md` | `Tests 506 passed (506)` today — and none of the 506 covers any obligation in this spec | the suite still green with the added guards, each one with a named failing input on the record. |
| **AC11** | No number the calculator shows changes, and no file under `lib/` or `hooks/` changes except as L15/L8 require. | `git diff --stat` between this branch’s base and its head, over `lib` and `hooks`, read at G6. Command form run today against `main` as a base, which printed a 69-file summary — **`main` is not this spec's base**, the branch it is cut from is, and `tech-lead` names it at G4. | n/a — this spec has no commits yet | the diff touches no `lib/` or `hooks/` file that computes a user-visible number, and `pnpm vitest run __tests__/payroll.test.ts __tests__/journey.test.ts __tests__/night-shift.test.ts __tests__/legal-tables.test.ts` — run today, `Tests 69 passed` across those four files — is unchanged and still passing. |
| **AC12** | H1, H2 and (if L14 requires it) H3 are supplied by the human and appear on the page as supplied. **No placeholder ships.** | a reviewer reads the page | n/a | the controller and the contact channel on the page are the values the human gave, verbatim. |
| **AC13** | `PRODUCT.md` § 9 carries the retirement of the *"nada é enviado"* claim as an explicit **non-claim row**, and a row for whatever replaces it, applied by the human. A reader who was not here can answer from § 9 alone why the old claim is not made. | `grep -n "enviado\|servidor\|navegador" PRODUCT.md` at G7 | no row either way | a non-claim row and its unlock sequence, per lesson **003**. |
| **AC14** | The page meets the same bars as every other surface in this repository: zero axe violations at `critical`/`serious` in both themes, no horizontal overflow and no control off-viewport at 390/1440/2560/3840, no console error or React warning. | `AGENTS.md` §9, by the instrument `web-standards-auditor` names at G6 and re-runs at G9. **No command is named here**: every instrument that could measure it builds the shared `.next`, `AGENTS.md` §4 rule 6 forbids running it during a parallel gate, and this gate did not run one. | n/a — the page does not exist | the §9 bar met on the new page, reported in `reports/audit.md` with the instrument the auditor ran and the count of surfaces it measured. |

---

## Disclosure obligations

Where this change computes or asserts something a real situation would produce differently, the app
says so out loud (`PRODUCT.md` §4, *name the gap*).

1. **The app must say what actually leaves the device, in the place the user is asked to allow it.**
   Today the banner says *"melhorar sua experiência e entender como você usa o WorkLoad"*, and what
   is sent is P5's fingerprint set plus an IP. The gap between those two sentences is the obligation.
   The wording is G3's; that a gap exists and must be named is settled here.
2. **The distinction between what stays on the device and what does not must survive every state.**
   P1 and P2 are true and are the product's strongest claim; P4–P7 are the exception to them. A
   correction that removes the true half to make the false half go away is a **rejection**, not a
   pass — the same rule `0010` §6 applies to its own disclosures.
3. **A policy page that describes an operation the code does not perform is the same defect as
   silence, in the other direction.** Every paragraph G3 writes is bound to P1–P7 as measured, and
   `labor-law-analyst` re-measures them at G6 against the built artifact rather than against this
   spec.
4. **The four standing disclosure obligations of `0010` and `0003` are unchanged and still binding.**
   Nothing here relocates, shortens or reworks a disclosure about a *number*. A privacy link added to
   the footer sits beside them and must not displace one.
5. **Where the human declines to supply H1 or H2**, the app does not publish a page with a blank or
   invented controller. The disclosure then owed is different and is G2's to define — this spec does
   not pre-empt it, and the pipeline stops at H1/H2 rather than improvising past it.

## Non-goals

What a well-meaning downstream agent might add, and must not.

1. **Do not draft, paraphrase or "improve" legal prose anywhere outside G3**, and at G3 only from
   G2's settled units. A plausible privacy paragraph written by an agent that did not read the norm
   is the exact failure this pipeline's G2 exists to prevent.
2. **Do not state a retention period, a norm number, an article, a rate or a deadline in this file or
   in `design.md` or `plan.md`.** They are L1–L16 and they are G2's.
3. **Do not invent a controller name, a CNPJ, an email address, a DPO or a placeholder for any of
   them.** H1–H3.
4. **Do not add a consent-management library, a cookie scanner, or any runtime dependency.**
   § Out of scope 6.
5. **Do not turn the policy into a modal, an interstitial, an onboarding step, or anything that sits
   between the user and the answer.** `PRODUCT.md` §1 and §8. It is a page and a link.
6. **Do not move, resize, restyle or re-anchor the consent banner.** `0010` owns it and has measured
   it; a second spec adjusting the same box is how two correct changes produce one wrong screen.
7. **Do not "fix" the footer disclosure by deleting the sentence.** § Disclosure obligations 2 and
   lesson **003**: a claim is retired with a recorded non-claim and its unlock sequence.
8. **Do not extend consent to the `localStorage` calculator inputs on your own initiative.** Whether
   P2 needs a basis, and which, is L8. Gating the calculator's own persistence behind a banner would
   break `PRODUCT.md` §5's *real time, not a submit button* for a rule nobody has yet stated.
9. **Do not add a second language, a translated policy, or an English fallback.** `PRODUCT.md` §7.

## Evidence available

Every row was produced by a command run in this session, in this tree, at `HEAD`.

| Claim | Source |
|---|---|
| There is no privacy or cookie policy page | `find app -name "page.tsx"` → 2 files, neither one |
| No consent surface links anywhere | `grep -rno 'href="[^"]*"' components/organisms/cookie-consent.tsx` → no output |
| The footer links nowhere either | `grep -rno 'href="[^"]*"' components/organisms/calculator-views.tsx` → no output |
| The sitemap lists two URLs | `grep -n "url:" app/sitemap.ts` → `:11`, `:17` |
| The calculation makes no network call | `grep -rn "fetch(\|XMLHttpRequest\|sendBeacon\|axios\|\"use server\"" app components lib hooks` → exit 1 |
| GA loads only on affirmative stored consent | `components/organisms/analytics-wrapper.tsx:12,19`; `lib/consent.ts:5-18`; `pnpm vitest run __tests__/analytics-wrapper.test.tsx` → `6 passed (6)` |
| The AdSense script is **not** consent-gated | `components/organisms/ad-manager.tsx:10-19`; `pnpm vitest run __tests__/ad-manager.test.tsx` → `3 passed (3)`, the third case loading the script with no consent stored |
| The telemetry switch opens pre-enabled | `components/organisms/cookie-consent.tsx:15`; `pnpm vitest run __tests__/cookie-consent.test.tsx` → `16 passed (16)` |
| What is sent to GA beyond page views | `components/organisms/app-header.tsx:16-24`, `:59`; `calculator-views.tsx:50`; `work-calculator.tsx:157`, `:169`, `:249`; `tax-details-panel.tsx:89`, `:114` |
| The inputs persist unconditionally | `hooks/use-work-calculator.ts:166-173`, `:187`; `hooks/use-salary-calculator.ts:139-146`; `lib/storage.ts` |
| The consent record's shape | `lib/consent.ts:21` |
| The unqualified no-transmission claim, and that the grep discriminates | `grep -rn "Nada é enviado para nenhum servidor" app components __tests__ tests README.md` → 1 row; same grep over `lib hooks` → exit 1 |
| The claim is pinned by a test | `__tests__/calculator-views.test.tsx:68` |
| The whole suite is green today | `pnpm test` → `Tests 506 passed (506)` |
| Production is a stale artifact and is context, not a control | `curl https://workload.devrma.com/` → HTTP 200, 41 882 bytes, carrying two `rel="preconnect"` tags to Google; `git show origin/main:app/layout.tsx` → the tags at `:58-59`; `grep -rn "preconnect" app components` at `HEAD` → exit 1; `git rev-list --count origin/main..HEAD` → **45** |
| No font is fetched at runtime | `app/layout.tsx:9-13` (`next/font/google`, self-hosted at build); the fetched production HTML contains no `fonts.googleapis.com` and no `fonts.gstatic.com` |
| `PRODUCT.md` §8 says ads sit behind consent | `PRODUCT.md` §8, first sentence |
| The finding's origin and its measurement | `.specs/0010-disclosure-reachability-on-mobile/legal.md` §4.1, §12 **F3**, §16 **Q1** |

## Open questions

| # | Question | Default chosen | Why |
|---|---|---|---|
| **Q1** | Does `PRODUCT.md` §7's maintainability test — the one that refuses a *convenção coletiva* database — also refuse a privacy policy? | **No default. Blocking, and it is H5.** | `0010` §16 Q1 raised it and it is the human's. Unlike the CC database, the alternative to a policy is not a disclaimer: art. 9º § 1º makes the consent null without it, so the fallback is to stop the processing, not to say less. That framing is named, not decided. |
| **Q2** | One page, or a privacy policy and a separate cookie policy? | **One page**, until G2 rules otherwise under L1/L13. | `PRODUCT.md` §5, *clarity over completeness*: two pages doubles what a user must open and what one person must keep accurate. G2 may override. |
| **Q3** | Does fixing P6 mean gating the ad script on the existing telemetry consent, or adding an advertising category to the surface? | **No default — it is L3.** | Reusing the telemetry consent for advertising is exactly the art. 8º § 4º question, and choosing it here would be deciding a legal rule. G2 settles it; `tech-lead` then plans it. |
| **Q4** | Do users who already accepted, under the current banner, need to be asked again? | **No default — it is L2.** | It changes what happens on a returning user's screen and depends on whether the stored consent is void. |
| **Q5** | Is `NEXT_PUBLIC_ENABLE_ADS` `true` in production right now? | **No default — it is H4.** | It is not in the repository and cannot be read from the deployed HTML. It sets P6's severity, not its existence. |
