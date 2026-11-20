# 0004 — LCP render delay on the deployed build, and deployed-head metadata correctness

> Owner: product-manager · Gate: `spec`

This spec carries **two independent findings**. Neither can carry the other, and a run that
satisfies one and not the other is a rejection (`AGENTS.md` §4 rule 1).

- **Finding A** — the Largest Contentful Paint of both routes lands at the moment the page becomes
  interactive, on every deployed artifact, and the Lighthouse performance budget the repo gates CI
  on cannot pass.
- **Finding B** — `og:image` and `twitter:image` resolve to the Vercel branch-alias host instead of
  the `metadataBase` origin, on both routes, on every **preview** deployment of this PR stack. It
  does not fire in production (C3), and it is scored as the smaller of the two findings for exactly
  that reason — smaller, not absent.

---

## Problem

**Finding A.** `PRODUCT.md` §1 gives the user ten seconds to read one number off a phone, and §3
says "cold load matters more than any subsequent interaction". The number they came for — the hero
numeral, `17:48` on `/` and `R$ 0,00` on `/custo-da-hora` — *is* in the HTML the server sends, and a
real Chromium at 4× CPU throttle paints it at **448–560 ms**. But on the instrument this repository
uses to decide whether the cold load is acceptable — Lighthouse mobile, `.lighthouserc.js`,
`categories:performance >= 0.93` — that same element's paint is recorded at **3.3 s to 6.5 s**, and
in 11 of 12 recorded runs it lands on the same millisecond as `interactive`. The budget fails on
every deployed artifact measured, and the squad currently cannot tell whether that is the
application or the runner.

`PRODUCT.md` §10 lists "Lighthouse budgets green" as one of four ways the product knows it is
working. Today it is not green anywhere, and no spec owns it.

**Finding B.** A crawler or a chat client that unfurls a share of either route **on a preview
deployment** is sent to a host named nowhere in this repository. `app/layout.tsx:16` declares
`metadataBase: new URL("https://workload.devrma.com")`, and `canonical`, `og:url`, the JSON-LD
`@id`/`url`, `sitemap.xml`, `robots.txt` and the manifest all honour it. The **four**
file-convention image routes do not. This is the same bar as `AGENTS.md` §9 — "metadata, sitemap,
robots, manifest and structured data still correct after the change" — that every other field on the
page already meets.

**What is true about its reach, stated once so no gate over- or under-reads it:** the framework
override that causes it only fires when `VERCEL_ENV === "preview"` (C3), so the defect is live on
every deployment of this PR stack and on every future preview, and **not** on
`workload.devrma.com`. A defect that never reaches production is still worth fixing — preview is
where this squad reviews and where `AGENTS.md` §9 is checked — and it is worth less than one that
does. It carries no user-facing urgency, and it is not dropped.

## Audience & moment

**Finding A** — the CLT worker at the time clock, on mobile data, at first contact. They get one
scan. Secondarily the maintainer, who cannot ship past a red budget and cannot currently learn
anything from it.

**Finding B** — not a user of the app at all: the crawler, the WhatsApp/Slack/X unfurler, and the
person who sees the card that unfurler produced. It never reaches the ten-second path, which is why
it is carried here rather than given its own ten gates (`AGENTS.md` §11).

## Outcome

- The cold-load first paint of both routes, measured as an elapsed time in the same session, is no
  later on the fixed host than on the pre-fix control, by more than the control's own spread.
  **Amended at bounce 1** — this bullet read *"the Lighthouse LCP stops being pinned to
  `interactive`"* at run 1; that phrasing named the identity AC1 scored, which does not discriminate
  (§ *AC1, replaced at bounce 1*), and there is no FCP→LCP gap on this build to close.
- Every absolute URL the deployed head emits resolves to `https://workload.devrma.com`.
- Whatever changes, the hero numeral's text is still in the initial HTML of both routes. A number
  that disappears from the server response to win a metric is a regression of `PRODUCT.md` §1, not a
  fix.

---

## What the re-run search found, and where it contradicts the brief

Per this agent's § *How a scope section is written*, § Scope below comes from commands run in this
session against the artifacts where the defects live, not from the finding list in `STATUS.md`. All
commands and their output are in § Evidence. **Three of `STATUS.md`'s stated facts did not survive
the re-run, and the run wins.**

### C1 — The hero numeral **is** server-rendered. F1's stated mechanism is false.

`STATUS.md` § F1 item 3 states: "`hooks/use-current-time.ts` returns `null` on the first render, so
`components/organisms/hero-panel.tsx`'s numeric `<p>` ships with no server-rendered text and cannot
become an LCP candidate before hydration."

The deployed head's HTML contains that text:

```
/                 <p aria-live="polite" class="numeric whitespace-nowrap …">17:48</p>
/custo-da-hora    <p aria-live="polite" class="numeric whitespace-nowrap …">R$ 0,00</p>
```

`useWorkCalculator` seeds `entry`/`lunchStart`/`lunchEnd` from lazy `useState` initialisers, not
from the clock, so the exit projection is computed on the server. `useCurrentTime` gates only the
header clock, the hero *badge* and the progress ring's `statusTime` — all three of which render the
`--:--:--` placeholder and are `aria-hidden`, and none of which is the LCP element.

The LCP element, read from the stored G9 reports, is the hero numeral `<p>` on every host. The
mechanism is therefore **not** "no server-rendered text", and any lever built on that premise would
be built against a fact the instrument disproves. **Identifying the real cause of the FCP→LCP gap is
in scope for this spec and is decided at G3/G4, not here.**

### C2 — `workload.devrma.com` is not a control build for this repository's head.

`STATUS.md` § F1 treats production as the reference artifact. Production serves `origin/main`, which
is **45 commits behind** this branch and predates the whole `0002`/`0005`/`0006` stack. Its HTML
still ships `lucide` icons (44 occurrences of `tabler` on the head deployment, 0 on production; 42
occurrences of `lucide` on production, 0 on the head deployment) and still ships the mount fade
`0002` removed — production serves `style="opacity:0;transform:translateY(20px) scale(0.98)"` on the
panel wrapper, the head deployment serves `style="opacity:1;transform:none"`.

An element at `opacity: 0` is not an LCP candidate until something animates it, which is a
sufficient explanation for production's own numbers and is **already fixed on head**. Production's
3.3–5.6 s therefore describes an artifact this squad did not build.

The budget failure is nonetheless real on head: the three deployments that *do* carry the stack
measure 5.7–6.5 s. Finding A stands; its reference host does not.

### C3 — Finding B is four emitted tags on two routes, produced by **four files**, and the cause is Next's preview override of `metadataBase`.

`app/custo-da-hora/opengraph-image.tsx` and `app/custo-da-hora/twitter-image.tsx` **exist**,
committed since `16097c3` ("feat: make the pages shareable and legible to crawlers"), each calling
`renderOgImage("salary")` with its own `alt`. **There is no inheritance.** A fix that edits only
`app/`'s pair leaves half the defect shipping — it would pass a check on `/` and ship
`/custo-da-hora` broken. Re-run in this session:

```
$ find app -name 'opengraph-image.tsx' -o -name 'twitter-image.tsx'
app/custo-da-hora/opengraph-image.tsx
app/custo-da-hora/twitter-image.tsx
app/opengraph-image.tsx
app/twitter-image.tsx
```

The cause is not a resolution bug and cannot be reached through `metadataBase`: for a
file-convention image route, Next 16.3.5 **overrides** the declared `metadataBase` with
`getSocialImageMetadataBaseFallback()`, which returns `VERCEL_BRANCH_URL || VERCEL_URL` whenever
`NODE_ENV === "production" && VERCEL_ENV === "preview"`
(`node_modules/next/dist/lib/metadata/resolvers/resolve-url.js`, quoted in `plan.md` §2.3). The
other six metadata surfaces are clean because none of them is a static metadata route file.

**Consequently the defect is preview-scoped.** On `workload.devrma.com`, where
`VERCEL_ENV=production`, those four URLs already resolve to `metadataBase`; production emits no
`vercel.app` host at all (E11). Finding B is therefore true of every deployment of this PR stack and
of every future preview — which is where the squad reviews and where `AGENTS.md` §9's metadata bar
is checked — and **false in production**. It is worth fixing and it is worth less than a defect that
reaches a real user: nothing downstream may describe it as a live production defect, and nothing
downstream may drop it on the grounds that production is clean.

AC5 and AC6 stay exactly as written, against H1. Each of the four URLs appears **twice** per
response — once in `<head>` and once in the streamed RSC flight payload — which is why AC6 is a
search over the whole response body rather than an assertion on four `<meta>` tags
(`AGENTS.md` §5). The same search confirmed `sitemap.xml`, `robots.txt`, `manifest.webmanifest`,
`canonical`, `og:url` and the JSON-LD block **clean** on both routes.

### C4 — Nothing else in the tree is gated the way the brief implies.

The search for the client-gating pattern across `app/`, `components/` and `hooks/` returns exactly
one hook that returns `null` before hydration and feeds a rendered string (`useCurrentTime`), one
that returns `null` from `localStorage` (`useGrossHourlyRate`, feeding a `DaySummary` sub-value, not
a hero), and no `next/dynamic`, no `ssr: false`, no mounted/hydrated flag anywhere. The three
surfaces that paint a placeholder before hydration are enumerated in § Scope. There is no fourth.

---

## Scope

### Finding A — the LCP/interactive coupling

1. **Diagnose the gap between FCP and LCP on the deployed head**, and record the attribution in
   `plan.md` before any file is edited (lesson **010**). FCP lands at 1.15–2.27 s; LCP lands at
   3.3–6.5 s on the same element, which is already painted with its final text. Load Delay and Load
   Time are 0 ms in all twelve recorded runs. The unexplained term is Render Delay, and naming its
   cause is the first deliverable of this spec.
2. **The work and the bytes on the cold-load path between first paint and interactive**, on both
   routes. This includes the **static assets the page requests on that path** — explicitly
   `public/favicon.ico`, `public/icon-192x192.png` and `public/icon-512x512.png`, which G4 measured
   at 234.8 kB each and 61% of the page's transferred bytes (K3, confirmed at this amendment: they
   are not the *"icon-library"* § Out of scope protects). It also includes: `bootup-time`
   (402–1190 ms) and `mainthread-work-breakdown` (1174–2159 ms) on the recorded runs, and the
   ~28 kB of unused JavaScript Lighthouse attributes to the largest chunk. This is the lever named
   for lesson **011**'s lever test; which part of it moves is G4's call.
3. **The hero numeral's paint path** — `components/organisms/hero-panel.tsx` and its two call sites
   (`components/organisms/work-calculator.tsx:213`,
   `components/organisms/salary-calculator.tsx:222`), including the container-query sizing
   (`clamp(2.5rem, <n>cqi, 6rem)` inside the `@container`) that makes its final geometry depend on
   layout of an ancestor.
4. **The three surfaces that render a placeholder before hydration**, in scope only for what they
   contribute to the paint path and to the disclosure question in § Disclosure obligations:
   `components/organisms/app-header.tsx:12` (header clock), the hero badge in
   `components/organisms/work-calculator.tsx`, and the progress ring's `statusTime`. All three are
   fed by `hooks/use-current-time.ts` and all three are `aria-hidden`.
5. **The measurement instrument itself.** This spec names the hosts, the run count and the
   statistic, and records them in `plan.md`, because the existing instrument moved 26 performance
   points on a frozen artifact in one week.

### Finding B — the emitted image host

6. **All four file-convention image modules** — `app/opengraph-image.tsx`, `app/twitter-image.tsx`,
   `app/custo-da-hora/opengraph-image.tsx`, `app/custo-da-hora/twitter-image.tsx` — and whatever
   makes their generated URLs resolve against the deployment host instead of `metadataBase`,
   including the copies of all four URLs in the RSC flight payload. The list is the output of
   `find app -name 'opengraph-image.tsx' -o -name 'twitter-image.tsx'`, re-run in this session; that
   command is the source, not the finding list in `STATUS.md`, which named two of the four. The
   rendered images themselves are correct and are **not** in scope (`design.md` §C fetched and
   viewed both PNGs); only the `content` of the emitted tags is wrong.

### Both

7. `.specs/INDEX.md` and this spec's `STATUS.md`, amended to describe both findings.

---

## Out of scope

Each exclusion states the property it protects and the gate that may override it. An exclusion
whose protected property is threatened by a legal, accessibility or correctness floor is overridden
by that floor, and any such override is bounded and named in the criterion that verifies it.

- **Changing what either calculator computes, or any number it displays.** Protects the §4 promise
  that every number traces to a cited table, and the falsifiability of AC3 — a performance claim
  measured on a page whose output changed is not a performance claim. Overridable only by
  `labor-law-analyst` at G2 or G6 finding an incorrect number; such an override is bounded to the
  specific figure the analyst names and is verified by AC3's unchanged-text assertion covering every
  other figure.
- **Removing the hero numeral's text from the server response, or replacing it with a skeleton, a
  spinner or an empty node.** Protects the ten-second answer in `PRODUCT.md` §1 — the number in the
  initial HTML is the product. Not overridable by any gate below G1; a downstream agent that
  believes the metric requires it must bounce to `tech-lead` rather than do it, and the human
  decides.
- **A new runtime dependency.** Protects `PRODUCT.md` §3 ("nothing at runtime") and `AGENTS.md` §8.
  Overridable only by a written justification in `plan.md` approved at G4, as §8 already provides.
- **A typeface, icon-library or font-loading change.** *"Icon-library"* means the rendered icon
  **components** — `@tabler/icons-react` and its call sites — and nothing else. It does **not** reach
  `public/favicon.ico`, `public/icon-192x192.png` or `public/icon-512x512.png`, which are static
  raster assets on the request path, not a library: those three are **inside** § Scope item 2 and
  this exclusion does not protect them (K3, confirmed at this amendment). Protects this spec from
  re-spending levers `0002` already measured at zero: Load Time is 0 ms in all twelve recorded runs
  and the shipped Atkinson woff2 finishes 2.4 s before the LCP timestamp. Overridable if the G4
  attribution required by scope item 1 shows a font term above zero on the deployed head — in which
  case the attribution table is the evidence and the override is bounded to the term it names.
- **Deploying this stack to `workload.devrma.com`, or any change to what production serves.**
  Protects the independence of the control-build comparison in AC2: a host that changes mid-session
  is not a control. Overridable only by the human at the G8 approval point, and never inside a
  measurement window.
- **Adding field/CrUX collection, analytics for Web Vitals, or any new telemetry.** Protects
  `PRODUCT.md` §5 ("offline and private") and keeps this spec's scope to one lever. Not overridable
  below G1; if the squad concludes the absolute target is only decidable in the field, that is a new
  spec, opened and indexed the same day (lesson **011**).
- **`lib/legal-tables.ts`, the citation footer, and anything `0003` holds.** Protects the
  boundary between this spec and `0003-citation-registry`. Overridable only by `labor-law-analyst`
  at G2/G6, whose rejection cannot be overruled (`AGENTS.md` §4 rule 8).
- **Design, layout, type ramp, colour, elevation or motion changes beyond what the G4 attribution
  proves necessary for the LCP path.** Protects `DESIGN.md` as shipped and the zero-visual-diff
  reading of AC3. Overridable by `product-designer` at G3 and by `web-standards-auditor` at G6/G9 on
  an accessibility floor; each override is named in `design.md` and bounded by the criterion that
  verifies it.
- **Raising, lowering or removing the thresholds in `.lighthouserc.js`.** Protects the meaning of
  "the budget passes" — a budget moved to meet the build measures nothing. Overridable only by the
  human, and only with the reason recorded in this spec.

---

## Legal dependencies

Named, not stated. `labor-law-analyst` settles each at G2 in `legal.md`. Every number this change
can cause to appear on a screen — including a number painted before the user's own stored inputs
are restored — is listed here, so nothing reaches the screen without passing G2.

| # | Rule, table or threshold this change relies on | Why this change depends on it |
|---|---|---|
| L1 | The statutory basis of the **default daily journey** currently encoded as `8 h 48 min` (`hooks/use-work-calculator.ts:12`) | It is the sole input to the exit projection the server paints. If the pre-hydration paint is altered, changed or held, this is the figure being held. The analyst states the norm and whether `8 h 48 min` is a defensible default; this spec does not. |
| L2 | The **default overtime rates** currently encoded as 50% and 100% (`hooks/use-work-calculator.ts:13–14`) | They feed `DaySummary`, which sits on the same first-paint path as the hero and may be touched by the paint-path work in scope item 2. |
| L3 | The **night-shift premium and reduced hour** | Same path: `stats.nightMinutes` is computed in the same first render this spec measures. Listed so no lever can alter its timing without G2 having seen it. |
| L4 | The **INSS and IRRF tables and the simplified deduction** behind the `R$ 0,00` the server paints on `/custo-da-hora` | That string is the LCP element of that route. Any change to when or whether it paints is a change to when a tax-derived figure reaches the user. |
| L5 | The **disclosure rule governing a figure shown before the user's own stored inputs are restored** | Open question O1. A returning user whose stored entry is 09:00 is shown `17:48` from the defaults until hydration completes. Whether that is a gap `PRODUCT.md` §4 requires the app to name, and in what terms, is a legal-and-disclosure call. |
| L6 | The **disclosure domain test** of lesson **024** applied to the three placeholder surfaces in scope item 4 | Each renders `--:--:--` where a figure will be. The analyst classifies what each asserts and whether a placeholder that is `aria-hidden` is inside or outside the disclosure domain. |
| L7 | Whether the **Open Graph image** (`lib/og-image.tsx`) asserts anything requiring a citation | Its strings were read in this session and contain no figure, rate or year. Recorded so Finding B's fix is confirmed to change a host and nothing else. |

No new number is introduced by this spec, and no new user input is introduced — so there is no new
default to state. The defaults already on the first-paint path are L1 and L2, and they are the
common case from `PRODUCT.md` §5.

---

## Acceptance criteria

Every criterion is checkable by running the command in its own row against the artifact named in it.
**AC1–AC4 (Finding A) and AC5–AC6 (Finding B) are independent**: a run that satisfies one group and
not the other is a rejection.

### The instrument, stated once

`lighthouse` 12.6.1 with the repository's unmodified `.lighthouserc.js`, one runner, one continuous
session, three runs per host, route `/` and `/custo-da-hora`. Three hosts, and **the third is
context, not a control**:

- **H1** — this spec's own preview deployment (post-fix).
- **H2** — the pre-fix control deployment built from the same branch point as H1, deployed for this
  measurement and not reused from an earlier report.
- **H3** — `workload.devrma.com`, recorded and labelled `origin/main`, 45 commits behind, reported
  for continuity with F1 and **excluded from every pass/fail arithmetic** (C2).

No criterion below compares against a number copied from an earlier report. Every comparison is a
difference measured inside one session, per the control-build rule in
`.agents/agents/web-standards-auditor.md` §G9.

### On the absolute 2,500 ms target — the ruling this spec makes

`0002` moved the absolute 2,500 ms mobile LCP target here. This spec **does not write it as a
Lighthouse-lab acceptance criterion**, and lesson **011**'s margin test is why: the same frozen
deployment measured 2.43 s a week ago and 5.7–6.1 s in the G9 session — a drift of roughly 3,300 ms
on an unchanged artifact, larger than the threshold itself. A pass/fail decided inside that spread
is decided by the runner, not by the build.

It is not retired and it is not moved to another spec. It stays here as the **goal**, and it is
carried by criteria a gate can score without re-deriving this analysis: AC2, a same-session
differential on LCP measured against the instrument's own spread, and — since bounce 1 — AC1, a
same-session differential on the *measured* first paint, in the same form. AC4 holds the absolute
number on the one instrument where it is currently decidable — a real browser — so that the goal
cannot be silently lost. **AC4 is where the absolute target lives; bounce 1 does not move it and
does not re-open it.**

What the restatement still forbids: a run may not be called a pass because the score improved, and
may not be called a pass on a median alone. AC1 must hold, and AC2's margin must exceed the control's
own spread.

### AC1, replaced at bounce 1 — what it scores now and why

Run 1's AC1 scored the identity `Math.round(simLCP) !== Math.round(simTTI)`. **It is withdrawn.**
T1's counterfactual table (`plan.md` §7.2) measured a state in which the defect is definitionally
absent — the page painting at **96 ms**, the best number this spec has recorded — and **that state
fails the identity**, while two other cause-absent states pass it. A criterion a known-good state
fails does not discriminate (lesson **040**), and the identity tracks how much of the resource graph
Lantern happens to hold, not the held paint. `plan.md` §1.3's endorsement of it is withdrawn with it.

Two facts bound the replacement, and no criterion in this spec may contradict either:

- **There is no FCP→LCP gap on this build.** Observed FCP and observed LCP are the same instant in
  22 of 22 runs on record; the apparent gap is an artifact of Lighthouse's `throttlingMethod:
  simulate` (Lantern).
- **The delivery property T1 found belongs to this machine's TLS-intercepting egress proxy**, not to
  the deployed origin, which serves `h2` on all four of its edge IPs (`plan.md` §7.1). No remedy for
  it exists in this repository, so **no criterion here may require the first paint to get faster.**

The replacement therefore scores `observedFirstContentfulPaint` — a measured elapsed time, read from
the recorded trace, that moved monotonically with the defect across T1's X4 (96 → 260 → 1281 →
2350 ms) and that every cause-absent state passes — **as a same-session H1/H2 differential, in the
non-regression direction.** Absolute, and not differential, was rejected for two reasons, each
sufficient: every absolute number this spec can measure is taken through the proxy and is not
field-representative (`plan.md` §7.1 consequence 2, R11), and an absolute paint target has **no lever
inside this spec's scope** now that the Finding A remedy is closed — lesson **011**'s lever test,
which is the failure this spec was opened not to repeat. The differential form cancels the proxy,
because both hosts sit behind it in the same session, and it keeps a lever: every task that does
ship (T2–T6) can hold the paint, and AC1 is what fails if one does.

**Run against a known-good state before acceptance** (lesson **040**): the three cause-absent states
on record — X4 at `requestLatencyMs=0` (96 ms), X1 local-3 (94 ms), X2 mirror-3 (101 ms) — all pass
the replacement, and the held states (1281, 2350 ms against a 96 ms peer) fail it by more than any
spread this instrument has produced. The withdrawn identity splits those same five states 2/3.

| # | Criterion | How it is verified |
|---|---|---|
| **AC1** *(replaced at bounce 1)* | **Per route, in one session:** `median(H1 observedFirstContentfulPaint)` over its 3 runs does **not exceed** `median(H2 observedFirstContentfulPaint)` by more than `max − min` of H2's own 3-run set for that route. H1 lower than H2 passes and is recorded; **no improvement is required** — T2 does not move the paint and nothing in this repository can (`plan.md` §7.4). **Void, not passed, if:** the H1 and H2 blocks carry different `fetchTime` sessions; or their T7-item-2 transport blocks differ (both hosts must show the same ALPN result and the same certificate issuer); or `max − min` on H2 exceeds **1,000 ms** on either route — that session is declared non-discriminating and re-run once, and a second non-discriminating session is a finding routed to `tech-lead`, never a pass. The absolute values are recorded in `summary.txt` and are **not** scored against 2,500 ms (R11); the absolute target is AC4's. | `node -e 'const m=require(require("path").resolve(process.argv[1])).audits.metrics.details.items[0]; console.log(m.observedFirstContentfulPaint)' $LHR.json` — the `path.resolve` is load-bearing: `require` on a bare relative path throws `MODULE_NOT_FOUND`. Run per report, both hosts, both routes; the six numbers per route give both medians and H2's spread. Verified against the known-good and held states in `plan.md` §7.2 and `evidence/t1-attribution.md` X1/X2/X4 before acceptance (§ *AC1, replaced at bounce 1*). |
| **AC2** | The **median LCP on H1 is lower than the median LCP on H2 by more than `max − min` of H2's own 3-run set**, per route, measured in the same session. | The `summary.txt` table the G9 instrument already produces, with an H1 block and an H2 block; the arithmetic is readable from that one table. Rejected if the two blocks carry different `fetchTime` sessions. |
| **AC3** | The initial HTML of both routes on H1 contains the hero numeral's text, and it is the same string H2 serves. No `<p>` on the LCP path is emptied, replaced by a skeleton, or made `opacity: 0`, `visibility: hidden` or `content-visibility: hidden` in the server response. | `curl -s $HOST/ \| grep -oE '<p aria-live="polite"[^>]*>[^<]*</p>'` and the same on `/custo-da-hora`, run on H1 and H2 and diffed. Ran in this session; output in § Evidence. |
| **AC4** | The real-browser probe reports, on H1, **exactly one** LCP candidate per load on each route, whose element text is the hero numeral, at **under 2,500 ms**, at 412×823 with 4× CPU throttling. This is a **guard, not the work**: it already holds on the current branch head (E14) and exists so the fix cannot win AC1/AC2 by making the real-browser paint later or by splitting the element into several candidates. | `node .specs/0004-lcp-render-delay/evidence/lcp-candidate-probe.mjs` — the `0006` probe with its host map repointed and its loop extended over both routes. Run from the repository root so `@playwright/test` resolves. Ran in this session against the current branch alias; output in E14. |
| **AC5** | On H1, `/` and `/custo-da-hora` each emit `og:image` and `twitter:image` whose `content` begins `https://workload.devrma.com`. All four. | `curl -s $H1/ \| grep -oE '<meta (property\|name)="(og:image\|twitter:image)"[^>]*>'` and the same on `/custo-da-hora`. Ran in this session against the current branch alias; the failing output is in § Evidence. |
| **AC6** | On H1, the string `vercel.app` appears **nowhere** in the bytes of `/`, `/custo-da-hora`, `/sitemap.xml`, `/robots.txt` or `/manifest.webmanifest` — including the RSC flight payload, not only the `<head>`. | `for r in / /custo-da-hora /sitemap.xml /robots.txt /manifest.webmanifest; do curl -s "$H1$r" \| grep -c 'vercel\.app'; done` — every line must print `0`. Ran in this session; current output in § Evidence. |
| **AC7** | `pnpm check` and `pnpm build` are clean, coverage holds at 100% in `lib/**` and `hooks/**` and 90% in `app/**` and `components/**`, and `pnpm e2e` is green. | `pnpm check`, `pnpm build`, `pnpm test:coverage`, `pnpm e2e` — `AGENTS.md` §9. |
| **AC8** | Zero axe-core violations at `critical` or `serious` in both themes on both routes, and no new console error or React warning on H1. | `node .agents/tools/preview.mjs --out <dir>` against H1. |

---

## Disclosure obligations

Where this change touches something a real payslip would compute differently, the app says so out
loud (`PRODUCT.md` §4, "name the gap").

1. **The pre-hydration numeral is not the returning user's number.** The server paints `17:48` on `/`
   and `R$ 0,00` on `/custo-da-hora` from the defaults in `hooks/use-work-calculator.ts`. A user
   whose stored entry is 09:00, or whose stored salary is R$ 4.200, reads a figure that is not
   theirs for the whole window this spec is trying to shorten — and shortening the window without
   naming the gap makes a wrong number *feel* more authoritative, not less. Whether this requires a
   visible disclosure, and in what terms, is L5 at G2 and `content-writer`'s string at G3. **It is
   pre-existing behaviour; this spec may not make it worse, and may not close without recording the
   analyst's ruling on it.**
2. **The three `--:--:--` placeholders** (header clock, hero badge, progress-ring `statusTime`)
   assert a live clock the page does not yet have. All three are currently `aria-hidden`. L6 settles
   whether an `aria-hidden` placeholder is inside the disclosure domain of lesson **024**.
3. **Any figure the fix causes to paint earlier** inherits every disclaimer already bound to it. A
   number that arrives sooner than its own disclosure is a §4 violation, so the `content-writer` and
   the analyst confirm at G6 that no disclosure now renders after the figure it qualifies.

---

## Non-goals

What a well-meaning downstream agent might add, and must not:

- **Do not "fix" the hero by server-rendering `useCurrentTime`.** It is not the LCP element and it is
  not the defect (C1). A change there buys nothing measured and costs a hydration mismatch.
- **Do not chase production's numbers.** `workload.devrma.com` runs `origin/main` and its LCP has a
  cause `0002` already fixed (C2). Optimising against it is optimising a build the squad deleted.
- **Do not add a loading state, a suspense boundary or a skeleton to the hero.** It already has its
  number; a skeleton would remove one.
- **Do not lazy-load, defer or `next/dynamic` the calculator to move the metric.** That converts a
  render-delay number into a load-delay number and makes the ten-second answer arrive later.
- **Do not attempt to close Finding B by changing `metadataBase`, by hardcoding the production host
  in `app/page.tsx`, or by deleting the image routes.** The other six metadata surfaces already
  resolve correctly against the existing `metadataBase`; the defect is in how these **four** resolve,
  and C3 shows `metadataBase` cannot reach them at all on a preview.
- **Do not fix only `app/`'s pair.** `/custo-da-hora` has its own two modules (C3). A run that
  verifies `/` and stops has verified half the defect.
- **Do not re-render, re-word or restyle either OG card.** The images are correct; `legal.md` §6
  authorises changing the host of the emitted URL and nothing else, and a rewrite re-endorses every
  claim it preserves (lesson **002**).
- **Do not drop or downgrade Finding B because it is preview-only**, and do not report it as a live
  production defect. Both misstatements are corrected in C3.
- **Do not let Finding B's green `curl` stand as evidence that Finding A landed**, or vice versa.
  They are scored separately (`AGENTS.md` §4 rule 1).
- **Do not restore the `lcp !== tti` identity**, in AC1 or anywhere else, and do not report a
  Lantern-simulated LCP or TTI as evidence for AC1. Both are withdrawn (§ *AC1, replaced at bounce
  1*). The `lcp`/`tti` pair may still be recorded as data, which is what `plan.md` §7.5 item 1 asks
  for.
- **Do not re-score AC1 as an absolute first-paint threshold**, and do not compare any absolute
  number from a proxied session to 2,500 ms (R11). The absolute target is AC4's and AC4 passes.
- **Do not build a remedy for the held paint on the deployed host.** It is this machine's egress
  proxy, the deployment already serves `h2` (`plan.md` §7.1), and T8+ is closed. AC1 asks only that
  no shipped task makes the paint later.
- **Do not open a CrUX/field pipeline**, however tempting after the ruling above. That is a new spec.
- **Do not edit `.lighthouserc.js`.**

---

## Evidence available

Every row was produced by a command run in this session, against the artifact named. Commands are
reproducible; the evidence directory is gitignored.

| # | Claim | Command, and what it printed |
|---|---|---|
| E1 | The hero numeral is server-rendered on both routes of the deployed head | `curl -s https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app/` → `<p aria-live="polite" class="numeric whitespace-nowrap text-[length:var(--hero-value-size)]" …>17:48</p>`; `/custo-da-hora` → the same element containing `R$ 0,00` |
| E2 | The LCP element is that `<p>`, on every host | `node -e '…audits["largest-contentful-paint-element"].details.items[0].items[0].node.snippet…'` over the stored G9 reports → the hero `<p>` snippet on `prod`, `s0005dep`, `s0006dep`, `s0006branch` |
| E3 | LCP equals `interactive`, and Load Delay / Load Time are 0 ms | same node one-liner for `largest-contentful-paint` vs `interactive`: prod run 2 → `5613 / 5613`; `s0005dep` run 1 → `5770 / 5770`; phases `TTFB=643 Load Delay=0 Load Time=0 Render Delay=5127` |
| E4 | FCP lands far before LCP on the same element | same reports → FCP `1151` / `1662` / `2273` ms against LCP `3259` / `5613` / `5770` ms |
| E5 | The work between FCP and interactive is the unexplained term | same reports → `bootup-time` 402 / 1190 / 544 ms, `mainthread-work-breakdown` 1174 / 2159 / 1236 ms, `unused-javascript` ≈ 28 kB on the largest chunk |
| E6 | A real browser paints the same element in under 600 ms | `.specs/0006-salary-alert-legibility/evidence/g9-control-build-ab/real-browser-lcp.txt` → `t=448ms` (0005-dep) and `t=560ms` (0006-dep), one candidate per load, element text `17:48` |
| E7 | Production is `origin/main`, 45 commits behind | `git rev-list --count origin/main..HEAD` → `45`; `git log --oneline -1 origin/main` → `4f3a458 Merge pull request #30`; `curl` counts of `tabler` / `lucide`: head `44 / 0`, production `0 / 42` |
| E8 | Production still ships the mount fade `0002` removed | `curl -s https://workload.devrma.com/ \| grep -oE 'style="[^"]*opacity[^"]*"'` → `style="opacity:0;transform:translateY(20px) scale(0.98)"`; the same command on the head deployment → `style="opacity:1;transform:none"` |
| E9 | Finding B is four wrong URLs on two routes | `curl -s https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app/ \| grep -oE '<meta (property\|name)="(og:image\|twitter:image)"[^>]*>'` → both point at `…-devrmas-projects.vercel.app`; the same on `/custo-da-hora` → `/custo-da-hora/opengraph-image` and `/custo-da-hora/twitter-image`, same wrong host |
| E10 | The rest of the metadata boundary is clean | `for r in / /custo-da-hora /sitemap.xml /robots.txt /manifest.webmanifest; do curl -s "$H1$r" \| grep -oE 'https://[a-zA-Z0-9.-]+\.vercel\.app[^"<) ]*'; done` → matches only on the two routes, only the four image URLs (each twice: `<head>` and RSC flight payload); sitemap, robots and manifest print nothing |
| E11 | Production emits no `og:image` at all | the E9 command against `https://workload.devrma.com` → only `og:url`. Finding B is observable solely on this stack's deployments, which is why every G6 against `localhost` missed it |
| E12 | No fourth client-gated surface exists | `grep -rn "useCurrentTime\|return null\|ssr: *false\|next/dynamic\|typeof window" --include='*.tsx' --include='*.ts' app components hooks` → `useCurrentTime` in `app-header.tsx:12` and `use-work-calculator.ts:132`; `return null` in `ad-manager.tsx:21`, `analytics-wrapper.tsx:19`, `day-summary.tsx:50`; no `next/dynamic`, no `ssr: false`, no mounted flag |
| E13 | The OG image asserts no legal figure | `grep -oE '"[^"]{4,80}"' lib/og-image.tsx` → two headlines and two descriptions, no rate, bracket, year or currency |
| E14 | The AC4 probe runs in this tree and already passes on the branch head, on **both** routes | `node .specs/0004-lcp-render-delay/evidence/lcp-candidate-probe.mjs` → `=== branch-head /  t=448ms size=32226 <P> "17:48"` and `=== branch-head /custo-da-hora  t=448ms size=41344 <P> "R$ 0,00"` — one candidate per load on each route. This is the measurement that makes § *On the absolute 2,500 ms target* decidable: the element the lab records at 5.7 s is painted by a real browser at 448 ms |
| E15 | The field AC1 now scores exists in a report this spec already holds, and the command reads it | `node -e 'const m=require(require("path").resolve(process.argv[1])).audits.metrics.details.items[0]; console.log(m.observedFirstContentfulPaint, m.observedLargestContentfulPaint)' .specs/0004-lcp-render-delay/evidence/g4-attribution/lh-prod.json` → `920 1125`. Run in this session at bounce 1. The pair is from **H3** (`origin/main`, 45 commits behind, still shipping the mount fade E8) and is recorded as an instrument check only: H3 is excluded from every pass/fail arithmetic (C2) and AC1 scores H1 against H2 |

### Verification status of each row, re-checked at the C3 amendment

Three gates on this spec have each refuted a fact they were handed, and all three were mine (C1, C2,
C3). So every row above is classified by **how it is known**, not by how confident it reads
(lesson **032**).

- **Re-verified in this amendment session, against the live artifact or a file in this tree:**
  **E1** (hero `<p>` with `17:48` / `R$ 0,00` in the deployed head's HTML), **E7** (`45` commits;
  `tabler` 44/0, `lucide` 0/42), **E8** (production still serves
  `style="opacity:0;transform:translateY(20px) scale(0.98)"`), **E9** (four wrong tags, and the four
  source files found by `find`), **E10** (each of the four URLs appears **twice** per response, head
  and RSC flight; sitemap, robots and manifest print zero), **E11** (production emits no `og:image`
  at all), **E12** (no fourth client-gated surface; `useGrossHourlyRate` at
  `work-calculator.tsx:108` feeds `DaySummary`'s `grossHourlyRate` at `:206`, not the hero),
  **E13** (`lib/og-image.tsx` carries no rate, bracket, year or currency).
- **Measured in an earlier session, from stored Lighthouse reports, and independently re-derived by
  `tech-lead` at G4 from the same reports** (`plan.md` §1): **E2–E5**. Their evidence directory is
  not readable from this amendment's process, so they are **not** re-run here. `plan.md` §1
  additionally establishes that `Render Delay 5,127 ms` in **E3** is a Lantern simulator term and
  **not time a browser spent** — E3 is retained as the instrument's output, and no lever may be
  scoped on it as if it were an observed phase (lesson **033**).
- **Probe output, not re-run here:** **E6** and **E14**. AC4 depends on E14, and AC4 is written as a
  guard that the verifying gate re-runs; a gate that cannot re-run the probe must report that, not
  infer the number.
- **Inference, held as inference:** none remains in the table. C3's inheritance claim was the last
  one and it is now retracted.


---

## Open questions

| # | Question | Default chosen | Why |
|---|---|---|---|
| O1 | Must the app disclose that the number painted before hydration comes from the defaults, not from the user's stored inputs? | **Yes, disclosure required** — `labor-law-analyst` rules at G2 (L5) and may overturn the default. | `PRODUCT.md` §4 "name the gap" is a commitment, not a preference, and this spec's whole purpose is to make that pre-hydration figure more prominent to the eye. Defaulting to silence would let a performance fix quietly strengthen a wrong number. |
| O2 | Is the Lighthouse mobile lab still the instrument this repository should gate on, given a 26-point drift on a frozen artifact? | **Yes, keep it unchanged for this spec** — `.lighthouserc.js` is not edited (§ Out of scope). | Changing the instrument inside the spec that is failing it makes the result unreadable. If the drift is the runner, AC2's same-session differential still measures the build correctly; if the squad concludes the lab is unfit, that is a separate spec with a separate argument. |
| O3 | Does the FCP→LCP gap have a single cause, or several? | **Unknown, and deliberately undecided at G1.** Scope item 1 makes the attribution the first deliverable of `plan.md`, per lesson **010**. | `STATUS.md`'s stated cause is disproved (C1). Guessing a replacement at G1 would hand G4 a second premise to inherit at full confidence, which is exactly how the first one survived to here. |
| O4 | Is one control deployment (H2) enough, or does the fix need a second control at an intermediate commit? | **One control (H2), at the same branch point as H1.** | AC2's margin is defined against H2's own spread, so a single control is sufficient to make the differential falsifiable. A second control adds runs without tightening the criterion — and lesson **014** warns that more runs of a spread-dependent threshold can argue against themselves. |
