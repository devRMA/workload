# 0015 — Test suite egress to third-party hosts

> Owner: product-manager · Gate: `spec` · Run 1 · Tree measured: `HEAD` **5c0c6fa**
>
> **This spec states no norm, no article, no retention period and no rate.** Every one is a row in
> § Legal dependencies and is settled by `labor-law-analyst` at G2, blocking.
>
> **Scope ruling, stated first because it is the question that was asked.** `0014` does **not** own
> this and is **not** widened. `0014` § Out of scope **1** already excludes the whole AdSense
> boundary *in all ten of its files, naming `playwright.config.ts:66-67` and
> `.github/workflows/ci.yml:84-85` explicitly*, and its only override is **bounded** to the
> production injection path at `components/organisms/ad-manager.tsx:10-19`, conditional on **L4**
> and verified by its **AC12**. Test-time egress is neither that path nor that file range. Folding
> it in would contradict `0014`'s own exclusion and collide with its **AC5**, which subtracts the
> AdSense symbols **by symbol, not by path**. So: **`0014` keeps the Google Analytics removal it
> already scopes; `0015` owns what a test run sends to a third-party host; the *production*
> consent gate on ads stays `0014` L4 / `0011` F1 and is not reopened here.**

---

## Problem

Nobody on the product side is the user of this spec. The reader is the repository owner, whose
machine and whose CI runner are the ones making the request — and the boundary being defended is the
one `PRODUCT.md` §3 states as the product's foundation: *"What it depends on: nothing at runtime."*

Today that sentence is true of the shipped product's default build and **false of every test run**.
`pnpm e2e` — locally and on every CI run — serves a build with `NEXT_PUBLIC_ENABLE_ADS="true"` and
`NEXT_PUBLIC_ADSENSE_ID="ca-pub-0000000000000000"`, so `components/organisms/ad-manager.tsx:15`
injects `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=…` into every page
the suite loads, and that script executes. The request leaves the project, carries the runner's IP,
and returns 206,623 bytes of code this repository does not control and does not review.

It was found by measurement, not by reading: `0010`'s developer watched the ad slot grow from its
CSS floor of **100 px** to **390 px** roughly two seconds into a run — real creative arriving over
the network (`.specs/0010-disclosure-reachability-on-mobile/reports/build.md:365-390`, and the
routing ruling at `plan.md` §3E **A5.4(ii)**, trigger **immediate**).

## Audience & moment

Not a user-facing moment. Two moments, both in the development loop:

- **Every `pnpm e2e`**, on a contributor's machine, on whatever network that machine is on.
- **Every CI run**, on a GitHub-hosted runner, on every pull request.

## Outcome

A test run of this repository makes **no request to any host outside the application's own origin**,
and the suite can still prove the things it proves about ads today. Nothing about the shipped
product changes — no ad is removed, no slot is resized, no layout reserve moves, and the owner's
stated intention to enable ads on the site later is untouched.

## Why now — what today's numbers are

Every row below is a command re-run in this session (§ Evidence), never the routed note's list.
Where the two disagree, the run wins and the disagreement is named.

- **The host answers, from this environment, on the exact URL the code builds.** `curl` on
  `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000`
  → **HTTP 200, 206,623 bytes, from 142.251.135.226** (E5). The same request with the host resolved
  to loopback → **connect failure, 0 bytes** (E6). The quantity moves in both directions, here,
  today. This is the mechanism `0010` inferred from a pixel growth; it is re-derived here with a
  command of this session rather than inherited (`AGENTS.md` §5, *How a finding routed from another
  gate is inherited*).
- **The injection is unconditional on consent and conditional only on two environment variables.**
  `components/organisms/ad-manager.tsx:10-19` is a `useEffect` whose only guard is
  `if (!adClient || !enableAds) return` — no consent read anywhere in the file (E7). That is
  `0011` **P6**/**F1**, reproduced here as a source fact, and it is why the *test* config alone
  decides whether the request happens.
- **The suite pins both variables on, unconditionally, in two places.** `playwright.config.ts:66-67`
  (`webServer.env`) and `.github/workflows/ci.yml:84-85` (the `e2e-tests` job `env:`) (E2). Neither
  is conditional, so this is every local run and every CI run, not a configuration a contributor
  opted into.
- **The scale, printed with its operands rather than as one number.** The suite is **8 spec files /
  25 `test()` declarations** (E1), run across four Playwright projects whose `testIgnore`/`testMatch`
  resolve to `23 + 20 + 20 + 2 = 65` test executions per full run, each of which loads at least one
  page. The exact request count is what AC1's instrument prints; **65 is the floor on page loads,
  derived from the config, and it is labelled derived, not measured.**
- **Two hosts are in the domain today, and only one of them is `0015`'s.** The same test config also
  sets `NEXT_PUBLIC_GA_ID="G-TEST12345"` (`playwright.config.ts:65`, `ci.yml:83`) and seeds
  `{"telemetry":true,"timestamp":0}` into `storageState` for the whole suite
  (`playwright.config.ts:22-35`), so every run also reaches Google Analytics. **`0014` discharges
  that one by removing the feature**, measured in its own AC1/AC2. `0015` does not touch it and does
  not depend on the order.

**Corrections to the routed note, per the rule that the run wins.** The note named
`playwright.config.ts:66` and `ci.yml:82-85`. The search returns a **pair** of lines in each place —
`playwright.config.ts:66-67` and `ci.yml:84-85` — because `NEXT_PUBLIC_ADSENSE_ID` is as
load-bearing as `NEXT_PUBLIC_ENABLE_ADS`: `ad-manager.tsx:8,21` requires **both** to be truthy
before anything renders or is fetched. `ci.yml:82` is the `env:` key itself and `:83` is the GA
variable, which belongs to `0014`. A change written against the note's single line would leave the
other half of the condition in place.

## Scope

Every list below is the output of a command re-run in this session (§ Evidence), not the list the
request handed me.

### In scope

**S1 — the rule, stated as a test over hosts and not as a list of them.** For any process this
repository starts as part of running its tests, **every network request whose host is not the
application's own origin (`localhost:$PORT`) is a member**, whatever the host, whatever introduced
it, and whether it exists today or is added tomorrow. Today the test returns exactly two members —
`pagead2.googlesyndication.com` and the Google Analytics hosts (E5, E2) — and that enumeration is an
*example of the test's output, not its definition* (`AGENTS.md` §5, *How a rule's domain is
defined*). The allowed exceptions are enumerated in the harness, each with a written reason, and the
count of exceptions is printed beside the count of requests.

**S2 — the test harness's own configuration**, which is the only place the condition is created:

- `playwright.config.ts:66-67` — `NEXT_PUBLIC_ENABLE_ADS` and `NEXT_PUBLIC_ADSENSE_ID` in
  `webServer.env`
- `.github/workflows/ci.yml:84-85` — the same pair in the `e2e-tests` job `env:`
- `tests/e2e/google-tracking.spec.ts:24-37` — *"should never place an ad above the calculator"*,
  the one guard whose subject is the ad slot; it stays, and AC3 is what keeps it honest
- the shared e2e support layer (`tests/e2e/support/`), where a request-level guard belongs if the
  plan puts it there — **which file and which mechanism is `tech-lead`'s at G4, not this spec's**

**S3 — the guard that makes the rule survive this spec.** Whatever the remedy is, the repository
ends with a check that **fails the run** when the rule is broken, on a tracked path under `tests/`,
so an agent holding only the repository can still falsify it after `0015` closes (`AGENTS.md` §5).

**S4 — one comment that is reopened and therefore republished.** `.github/workflows/ci.yml:133-136`
states *"Lighthouse measures this application, not AdSense. The e2e build above runs with ads on so
the suite can assert their behaviour, and in that build the third-party cookie alone costs five
points of best-practices no change to our code can win back."* Lesson **002**: a spec that reopens a
string re-asserts every claim in it. Two of its clauses are load-bearing here — *the suite asserts
ad behaviour* (true: `google-tracking.spec.ts:24-37`) and *the third-party cookie costs five
points* (a measured claim about a build this spec changes the network conditions of). **AC6** binds
it: the comment ships describing what the file then does, or it is corrected, and no claim in it is
carried forward unverified.

### Out of scope

Each exclusion names the property it protects and the gate that may override it. Every exemption the
verifying criterion carries appears here in the same words.

1. **The production injection path** — `components/organisms/ad-manager.tsx:10-19` and whether ads
   may be injected with no consent surface. **Protects:** a single owner for one question;
   `0014` **L4** already asks it, with a bounded override verified by `0014` **AC12**, and `0011`
   **F1** already holds the finding. **Override: none from this gate.** If G2 wants to rule it here,
   it routes the request through `tech-lead` and the ruling lands in `0014`, not in this spec.
2. **Making ads impossible, or removing any ad code.** `components/atoms/google-ad.tsx` and
   `components/organisms/ad-manager.tsx` keep rendering exactly what they render today, in every
   environment they render it today. **Protects:** the owner's stated intention to enable ads on the
   site, and `PRODUCT.md` §8, which describes a funded product. **Override:** none — a remedy that
   deletes ad code is a rejection at G6, and the ask is a **consent-gated** ad, which is `0014` L4's.
3. **`0014`'s file list.** No file whose only reason to change is a Google Analytics symbol is
   opened here. `playwright.config.ts` and `.github/workflows/ci.yml` are touched by **both** specs
   at **disjoint lines** — `0014` at `playwright.config.ts:65` and `:22-35`, `ci.yml:83`, `:139`,
   `:146`; `0015` at `playwright.config.ts:66-67` and `ci.yml:84-85`. **Protects:** `0014`'s AC5,
   which subtracts by symbol. **Override:** none. The two specs' line ranges are stated here so
   `tech-lead` can sequence them; if a merge order makes them collide, that is a sequencing item for
   `tech-lead`, never a reason for either spec to absorb the other's lines.
4. **Every number the app shows, and every file under `lib/` or `hooks/`.** **Protects:**
   `AGENTS.md` §9's traceability bar and the 100% `lib/`/`hooks/` coverage floor. **Override: none.**
   A number that moves is a rejection at G6, routed to whichever spec owns that number.
5. **Every pt-BR string, every layout, hierarchy, type, colour, elevation and motion decision.**
   Nothing a user sees changes. **Protects:** `DESIGN.md`, `content-writer`'s and
   `product-designer`'s domains, and the falsifiability of AC4's zero-diff claim over
   `app/`, `components/`, `lib/` and `hooks/`. **Override:** an accessibility or legal floor found
   at G2/G6 overrides it, and any such override is **bounded to the file the floor names** and is
   recorded in the criterion that verifies it.
6. **`0010`'s geometry and `0011`'s findings.** Blocking the creative changes what a late-settle
   measurement reads (`0010` A5.4(i) already binds every read to the early settle point). **Protects:**
   two mid-pipeline specs against a change to their inputs from underneath. **Override: none from
   this gate** — the interaction is recorded in `STATUS.md` as a routed item for `tech-lead`, who
   owns whether `0010` re-measures.
7. **The Lighthouse job's own environment** (`ci.yml:139-141`, `:146-148`), which already runs with
   ads off. **Protects:** a measurement the repository deliberately isolated. **Override:** if AC1's
   rule makes that isolation redundant, the simplification is a finding for `tech-lead`, not a
   change this spec authorises.
8. **The host.** The CI runner still reaches GitHub, the registry and the browser download. The rule
   in S1 is about requests **the application under test** causes, not about the toolchain's own.
   **Protects:** a rule that can actually hold. **Override: none;** the boundary is drawn in AC1's
   own wording and its exception list.

## Legal dependencies

Named, not stated. `labor-law-analyst` settles each at G2, blocking.

| # | The dependency | Why this spec cannot settle it |
|---|---|---|
| **L1** | How a request caused by this repository's *test harness* to a third-party host is characterised — whether the runner's IP and the fetched script constitute anything owed by the repository owner, and to whom. | It is a characterisation of an operation, not a property of a config file. `0011` `legal.md` §15.3 as amended by §26.4 rules on the *host's* receipt of a request; nothing on the record rules on a request the project itself originates from CI. |
| **L2** | Whether the answer to L1 changes when the request is made from a contributor's own machine and network rather than from a CI runner. | Two different actors and two different networks. Only G2 says whether that distinction matters. |
| **L3** | Whether anything is owed to the owner of the environment executing the suite — a disclosure in the repository, in `README.md`, or in the CI definition — before a test run reaches a third party. | It is an information duty question of the same family as `0011`'s, on a different subject. `0011` owns the app's user; nobody owns the contributor. |
| **L4** | Whether the *absence* of test-time egress weakens any claim `PRODUCT.md` §9 makes or could make about ads, given that the suite would then assert placement rather than delivery. | `PRODUCT.md` §9 is the claim table and lesson **003** governs what may be retired from it. G2 rules whether a claim exists to retire. |
| **L5** | Whether the production consent gate on ads — already `0014` **L4** and `0011` **F1** — has any bearing on the *test* environment, i.e. whether a suite that runs ads-on with no consent surface is itself a finding. | If it is, it is `0014`'s or `0011`'s and this spec must know that before G4 writes a plan that assumes otherwise. This spec **does not restate `0014` L4** and does not answer it. |

**Nothing in this table is answered anywhere in this document.** A downstream agent that finds a
norm, an article, a period or a rate asserted in `spec.md` has found a defect and should bounce it.

## Acceptance criteria

Every criterion is scored on a **request count to a named host, in a named environment**. The
environment coordinate is mandatory on every cell: `NEXT_PUBLIC_ENABLE_ADS`,
`NEXT_PUBLIC_ADSENSE_ID` and `NEXT_PUBLIC_GA_ID` **as the build that served the page saw them**,
beside the project, the route and the tree sha (`AGENTS.md` §5, and `0010` A5.3).

**One limitation is stated rather than implied.** The suite-level known-bad count was **not**
measured in this session: `uptime` read load average **21.98 on 16 cores** with **four**
`next-server` processes owned by sibling agents on ports 3100, 3424, 3917 and 4941 (E8), and
`AGENTS.md` §4 rule 6 forbids a build or a browser run under those conditions. What **is** measured
in both directions, in this session, is the quantity the suite's requests are made of — E5/E6. AC2
is written to take the red baseline before the remedy exists, which is where that measurement is
owed (lesson **066**).

| # | Criterion | How it is verified — with the known-bad and known-good values |
|---|---|---|
| **AC1** | On a full `pnpm e2e` run of the delivered tree, the number of network requests whose host is not the application's own origin is **0**. The instrument prints, in the same output: the total number of requests observed, the number of page loads, and the number of allowed exceptions with the reason recorded for each, so that **requests_external = 0 with page_loads ≥ 60 and total_requests > 0**. A run that loads nothing and reports nothing is a vacuous pass and is rejected. | The instrument is the harness guard of S3, on a tracked path under `tests/`. **The 60 floor is derived, with its operands: `23 + 20 + 20 + 2 = 65` test executions from `playwright.config.ts`'s four projects over the 25 `test()` declarations of E1, floored to 60 for retries and `testIgnore` drift.** **Known-bad:** AC2's baseline run. **Known-good:** this run. |
| **AC2** | **The red baseline is taken before the remedy exists and pasted into `reports/build.md`:** the same instrument, on the same tree, with the remedy reverted, reports `requests_external ≥ 1` and its host list **contains `pagead2.googlesyndication.com`**. If it does not, the instrument is dead and that is a **new finding, not a closed one** — the criterion is not satisfied by a green from an untested instrument (lesson **068**). | Taken in an isolated copy with its own `.next` and its own port, after `rm -rf .next` because a `NEXT_PUBLIC_*` flag differs (`AGENTS.md` §4 rule 6), with `uptime` and `ss -ltnp` pasted. **The proxy quantity is already measured in both directions this session:** the exact URL `ad-manager.tsx:15` builds returns **HTTP 200, 206,623 bytes** (E5) and **connect failure, 0 bytes** with the host unreachable (E6). |
| **AC3** | `tests/e2e/google-tracking.spec.ts:24-37` — *"should never place an ad above the calculator"* — still exists, still runs, and still passes, **and the input that would make it fail is named and shown to fail**: an `ins.adsbygoogle` placed in DOM order before the `Sua Jornada` `h2`. If that input cannot be constructed, the guard is dead and that is a new finding. | The `<ins>` is rendered by `components/atoms/google-ad.tsx:28-37` from JSX, and `ad-manager.tsx:21` gates it on the two env vars **only** — not on the script having loaded (E7). So the guard's subject survives a blocked host by construction; AC3 is what proves it did. **Known-bad:** the assertion passing against a page with no `ins` at all, which is what it would do if `toBeAttached()` were weakened. **Known-good:** the guard red on the injected-above-the-heading input. |
| **AC4** | `git diff --name-only <base>..HEAD` contains **no path** under `app/`, `components/`, `lib/` or `hooks/`. The remedy is confined to the test harness, its support layer and the CI definition. | **Known-bad:** any such path in the diff — e.g. a change to `ad-manager.tsx`, which is Out of scope 1 and 2. **Known-good:** the empty output of `git diff --name-only <base>..HEAD -- app components lib hooks`, which is what the command prints today on an unchanged tree. |
| **AC5** | No path in the diff is one of `0014`'s Google-Analytics lines: `playwright.config.ts:65`, `playwright.config.ts:22-35`, `.github/workflows/ci.yml:83`, `:139`, `:146`. Verified by reading the hunk headers of `git diff -U0 -- playwright.config.ts .github/workflows/ci.yml` and checking every changed line number against that list. | **Known-bad:** a hunk touching `playwright.config.ts:65`, which would collide with `0014` AC5 and AC2. **Known-good:** hunks confined to `:66-67` and `ci.yml:84-85`. Both sets are printed by `git diff -U0`, so the check is a comparison of numbers, not a reading. |
| **AC6** | `.github/workflows/ci.yml:133-136`'s comment describes what the file does after the change: every clause in it is either still true of the delivered tree or rewritten. The G6 report names, clause by clause, which. | **Known-bad:** the comment shipping unchanged while the run it describes no longer loads AdSense — the shape lesson **002** names. **Known-good:** a G6 report row per clause. No clause is graded "correct"; each is quoted and matched to the line that makes it true. |
| **AC7** | `pnpm check` clean, and `pnpm test:coverage` holds **100%** for `lib/**` and `hooks/**` and **90%** for `app/**` and `components/**`, with `git diff vitest.config.ts` **empty** — a threshold is never the thing that moves. | The thresholds are enforced by config, so the run fails rather than reports. **Known-bad:** any threshold line in that diff. **Known-good:** empty output, which is what the command returns on this tree today. |
| **AC8** | On CI, the `e2e-tests` job fails when AC1's rule is broken. Verified by the same instrument running in CI and by the red baseline of AC2 having been produced with the same command CI runs. | **Known-bad:** a guard that runs only locally — the condition is a CI fact (`ci.yml:84-85`) and a local-only guard cannot see it. **Known-good:** one command name appearing in both `package.json` and the CI job. |

**No criterion above contains "properly", "correctly", "nicely" or "as expected".** Each names a
command, a count and two values.

**Every input this spec introduces has a stated default**, and the count of such inputs is **zero**:
no field, no toggle, no setting, no user-visible change of any kind.

## Evidence

Every row was produced by the author in this session, in the repository working tree at `HEAD`
**5c0c6fa**, read-only. No build was run, no browser was started, no file in the repository was
mutated by a measurement.

| # | Claim | Command | Output |
|---|---|---|---|
| **E1** | The e2e suite is 8 spec files and 25 `test()` declarations | `git ls-files 'tests/e2e/*.spec.ts'` ; `git grep -cE "^\s*(test\|it)\(" -- 'tests/e2e/*.spec.ts'` | **8** files; `alert-legibility 1, dark-hydration 2, disclosure-legibility 5, google-tracking 4, responsive 4, salary-calculator 3, wide-viewport 3, work-calculator 3` = **25** |
| **E2** | The ads pair is pinned in two places, unconditionally | `git grep -nEI "NEXT_PUBLIC_ENABLE_ADS\|NEXT_PUBLIC_ADSENSE_ID" -- . ':!.specs' ':!.agents'` | `playwright.config.ts:66,67`; `.github/workflows/ci.yml:84,85` (e2e job, `"true"`), `:140,141` and `:147,148` (Lighthouse job, `"false"`); `.env.example:2,3` (`false`); plus the two components and their unit tests |
| **E3** | The host appears in the shipped tree in exactly two source lines | `git grep -nEI "pagead2\.googlesyndication\.com\|adsbygoogle" -- . ':!.specs' ':!.agents' ':!pnpm-lock.yaml'` | 16 rows; the **source** rows are `components/organisms/ad-manager.tsx:12` and `:15`, `components/atoms/google-ad.tsx:21,22,29`; the rest are tests |
| **E4** | No other external host is fetched at runtime by the app | `git grep -nEIo "https?://[a-zA-Z0-9.-]+" -- app components lib hooks tests __tests__` | `www2.camara.leg.br` 7, `workload.devrma.com` 7, `www.gov.br` 2, `localhost` 2, `127.0.0.1` 2, `schema.org` 1, **`pagead2.googlesyndication.com` 1**, `nextjs.org` 1, `biomejs.dev` 1. The `camara`/`gov.br` rows are `href`s a user clicks, not fetches; `next/font/google` (`app/layout.tsx:2`) self-hosts at build time. Google Analytics has **no literal URL** in the tree — it arrives via `@next/third-parties`, which is why a URL grep alone does not define this domain |
| **E5** | **Known-bad direction.** This environment reaches the host, on the exact URL the code builds | `curl -sS -o … -w 'http=%{http_code} bytes=%{size_download} ip=%{remote_ip}' 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000'` | `http=200 bytes=206623 ip=142.251.135.226` |
| **E6** | **Known-good direction.** The same request, host unreachable | same command with `--resolve pagead2.googlesyndication.com:443:127.0.0.1` | `curl: (7) Failed to connect … after 0 ms`, exit 7, 0 bytes |
| **E7** | The injection reads no consent and is gated only on two env vars | `cat components/organisms/ad-manager.tsx` | `const enableAds = process.env.NEXT_PUBLIC_ENABLE_ADS === "true"` (`:8`); `useEffect` at `:10-19` with `if (!adClient \|\| !enableAds) return` as its only guard; `if (!adClient \|\| !enableAds) return null` at `:21`. No `consent`, no `localStorage`, no import from `lib/consent` |
| **E8** | The machine was too loaded to measure | `uptime` ; `nproc` ; `ss -ltnp` | load average **21.98** on **16** cores; `next-server` listening on **3100, 3424, 3917, 4941** — four sibling builds live |

## Disclosure obligations

- **Nothing on the screen changes, so there is nothing to disclose to the app's user.** Stated
  explicitly so no downstream agent adds a banner, a note or a line of pt-BR: the count of
  user-visible strings this spec creates, changes or deletes is **zero**, and AC4's zero-diff over
  `app/` and `components/` is what makes that falsifiable.
- **What the suite may then be said to prove changes, and that is a disclosure inside the
  repository.** After this spec, `tests/e2e/google-tracking.spec.ts:24-37` proves the ad slot's
  **placement**, not that an ad **loads**. Any artifact — `reports/qa.md`, `README.md`, a CI
  comment — that reads the suite as evidence of the latter is making a claim the suite no longer
  backs. **AC6** binds the one such artifact that exists today (`ci.yml:133-136`); **L4** is what
  says whether `PRODUCT.md` §9 has anything to retire.
- **The `PRODUCT.md` §8 tension is named and not resolved here.** §8 says *"AdSense, behind cookie
  consent"*. `0011` **F1** and `0014` **L4** hold the finding that production reads no consent at
  all. `0015` neither fixes nor worsens it — Out of scope 1 — and it is recorded here because a
  spec that touches the ad boundary and stays silent about the contradiction has hidden it.

## Non-goals

What a well-meaning agent downstream might add, and must not:

1. **Turning ads off in the test build as the remedy of first resort.** Setting
   `NEXT_PUBLIC_ENABLE_ADS="false"` in `playwright.config.ts` would satisfy AC1 and **break AC3**:
   `ad-manager.tsx:21` returns `null`, the `<ins>` never renders, and the one guard protecting
   `PRODUCT.md` §8's *"ads never sit between the user and an answer"* would pass vacuously against a
   page with no ad in it. Whether the remedy is a request-level block, an offline browser context,
   a stubbed route or something else is `tech-lead`'s at G4 — but it must leave the `<ins>` rendered.
2. **A network kill-switch over the whole suite that also blocks the app's own origin.** The rule in
   S1 is scoped to hosts outside `localhost:$PORT` for exactly this reason.
3. **Deleting `tests/e2e/google-tracking.spec.ts`** because `0014` is emptying its other half. Four
   tests live in that file; `0014` owns three of them and AC3 owns the fourth.
4. **Re-deriving `0010`'s or `0011`'s numbers here**, or amending either spec. Out of scope 6.
5. **Rebuilding a consent surface.** `0014` Decision 1 deletes it and states what a future ads spec
   inherits. That future spec is not this one.
6. **Any new dependency.** If a remedy needs one, it is a written justification in `plan.md`
   (`AGENTS.md` §8) and a decision for `tech-lead`, not an assumption this spec grants.

## Open questions and the defaults chosen

| Question | Default chosen | Why |
|---|---|---|
| Does `0014` own this? | **No — `0015` does.** | `0014` § Out of scope 1 excludes the AdSense boundary in all ten files, naming these exact two config sites, with an override bounded to `ad-manager.tsx:10-19` and verified by its AC12. Folding in would contradict its own exclusion and its AC5's symbol subtraction. |
| Does `0015` own the production consent gate on ads? | **No.** | `0014` **L4** asks it and `0011` **F1** holds it. Two specs asking one question is how a ruling gets two answers. |
| Should the remedy block the host or stop setting the flags? | **Neither is chosen here** — the outcome is stated, the mechanism is `tech-lead`'s. | Non-goal 1 records the one mechanism that would satisfy AC1 while breaking AC3, so the constraint is written down without the architecture being decided at G1. |
| Is the routed 100 → 390 px growth carried as fact? | **The number is carried; the mechanism was re-derived** (E5/E6). | `AGENTS.md` §5, *How a finding routed from another gate is inherited*. |

## What this spec deliberately does not claim

- It does not claim any request in this repository's history reached a real ad impression, a real
  billing event, or Google's ad inventory. The publisher id the suite uses is
  `ca-pub-0000000000000000`; what the script does with it is not measured here and is not needed by
  any criterion.
- It does not claim the CI runner's requests have ever been observed by anybody. E5 proves the host
  answers; who logs what at the other end is **L1**, and no agent in this pipeline has measured it.
- It does not claim the suite is otherwise egress-free. AC1 is a rule over a domain, and the first
  run of its instrument is also the first complete enumeration of that domain's members.
