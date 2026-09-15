# 0002 — design taste preflight

> Owner: product-manager · Gate: `spec`

**Amendment — run 2.** G1 re-issued after `labor-law-analyst` rejected G2 (blocker **B1**)
and `tech-lead` triaged it back here. Two things changed and nothing else:

1. The scope grew by the **"banco de horas" claim surface** (§ Scope / Claim correction),
   and the claim is **removed**, not reworded around. This is a claim correction under
   `PRODUCT.md` §4 "cite or omit" and §9's closing sentence, not a copy preference.
2. Finding **F1** (`lib/payroll.ts:24` mislabels R$ 8.475,55) is folded in, because the
   string is already being rewritten under S1/LD8.

F2, F3, F4 and F5 are **not** absorbed. They live in `.specs/0003-citation-registry/`.
Everything written at run 1 stands unchanged unless a section below says otherwise.

**Amendment — run 4.** G1 re-opened on two criteria routed here by `tech-lead` at the G5 run-4
triage. No scope moved; two acceptance criteria were restated and one non-goal and one
out-of-scope line were added to hold the line the restatement draws:

1. **AC7 is restated from an absolute lab threshold to a relative, instrument-aware criterion**,
   and the absolute 2,500 ms target moves to a new spec, **`.specs/0004-lcp-render-delay/`**, with
   the finding and the measurement carried. Full reasoning in § *AC7, restated (run 4)* — this is
   a defective criterion being fixed, and the argument is written down so it can be contested.
2. **AC10's verification cell is corrected** to name `.agents/tools/route-js.mjs` and the gzipped
   script `src` set of the pre-rendered HTML, which is what is actually authoritative on Next 16
   (B3). AC10's quantity and its 10 kB threshold are unchanged. R2 is corrected to match.

Everything else written at runs 1–3 stands.

## Problem

A CLT worker opens WorkLoad standing at the time clock, on mobile data, to read hours
and money off a screen. Today the first paint of that number arrives at **2.8s on
mobile**, above the 2.5s the squad's own performance bar names, and the numbers
themselves are set in a typeface whose figures were never checked for the one thing
this product does: columns of digits that must be read right the first time. A `0`
mistaken for an `O` or a `1` for an `l` in "R$ 1.087,10" is not a taste problem, it is
a wrong answer.

Separately, the design system shipped in run 0001 was built against three skills and
audited against a fourth, `design-taste-frontend`, whose Section 14 pre-flight was
never actually run against the code that shipped. Six boxes fail. Two of them
(Inter as the type family, `lucide-react` as the icon set) contradict the design
system exactly as built, so this is not a cleanup pass: it is a decision to bring a
shipping product into compliance with a standard it was only partially held to.

Honesty about what the user gets from each box, because the boxes are not equal:

| Failure | Who it serves |
|---|---|
| LCP 2.8s → under 2.5s on mobile | **The user.** §3: cold load matters more than any later interaction. |
| Typeface with real tabular figures and a disambiguated `0`/`1` | **The user.** Misread digits are misread money. |
| Zero user-visible em-dashes | **The user, marginally.** A hyphen reads the same at 14px on a phone; the real gain is a house style this squad can check mechanically instead of arguing about. |
| `lucide-react` off the allowed icon list | **House style.** No user notices which icon library drew a chevron. Justified only if the swap does not cost bundle size. |
| `min-h-screen` → `min-h-[100dvh]` | **The user.** `100vh` on mobile Safari is taller than the visible viewport; `100dvh` is the real one. |
| Design Read and dial values declared | **The squad.** Documentation the next design gate inherits instead of re-deriving. |

## Audience & moment

Unchanged from `PRODUCT.md` §1: the CLT worker at 10-second first contact, on a phone,
cold load. This spec does not add a screen, a field or a step. Every change here is
either invisible to that user or makes the same screen arrive faster and read cleaner.

Secondary audience, deliberate: the next agent to open `DESIGN.md`, who must find the
Design Read and dial values declared rather than inferred.

## Outcome

- The number the user came for renders in under 2.5s on mobile, measured, from a cold load.
- Every digit on screen is unambiguous at phone size, and columns of figures align.
- The full Section 14 matrix exists as a recorded artifact with a verdict per box, so
  the next change can be checked against it instead of re-audited from scratch.

## The inviolable constraint

**This product's content is hours and money in columns.** Any replacement typeface must
have:

1. Real OpenType tabular figures (`tnum`), not synthesised or absent.
2. An unambiguous `0` versus `O` (slashed or dotted zero, or a decisively narrower zero).
3. An unambiguous `1` versus `l` (a `1` with a foot serif or a flagged `l`).

A family missing any of the three is **disqualified regardless of taste, reputation or
how well it scores against any other box in the pre-flight**. This constraint outranks
the aesthetic argument for any particular font, and outranks the "Inter is an AI Tell"
box that motivated the swap: if the only families that clear the aesthetic bar fail the
figure bar, the correct outcome is to keep Inter with `tnum`/`zero` enabled and record
that box as a deliberate, documented exception, not to ship a prettier font that makes
a salary harder to read.

Choosing the family is `product-designer`'s call at G3. This spec only sets the gate it
must pass.

## Scope

**Pre-flight boxes in play.** WorkLoad is a tool, not a landing page. The boxes in scope are:

- Brief inference declared (Section 0.B): a one-line Design Read recorded in `DESIGN.md`.
- Dial values explicit and reasoned (Section 1): `DESIGN_VARIANCE`, `MOTION_INTENSITY`,
  `VISUAL_DENSITY` recorded in `DESIGN.md` with the signal from Section 1.A that produced them.
- Zero em-dashes user-visible (Section 9.G): the nine occurrences named below.
- No AI Tells (Section 9.B): the Inter default, subject to the inviolable constraint above.
- Icons from an allowed library (Section 9.E): `lucide-react` in 12 files, subject to the
  bundle-size gate below.
- Viewport stability: `min-h-[100dvh]`, never `h-screen` or `min-h-screen`.
- Core Web Vitals: LCP under 2.5s on mobile.
- Colour Consistency Lock, Shape Consistency Lock, Page Theme Lock, Button Contrast,
  Form Contrast, Dark mode tokens tested in both modes, Reduced motion, Mobile collapse,
  `useEffect` cleanup, empty/loading/error states, one design system: **verify and record
  the verdict**, no change expected since 0001 already settled them.

**The eleven em-dash occurrences.** Named so no reviewer has to hunt. The request listed
nine; a grep of `app/**`, `components/**` and `lib/**` found two more, both inside legally
bound strings, and both are in scope:

| File | What |
|---|---|
| `app/opengraph-image.tsx` | `alt` export |
| `app/twitter-image.tsx` | `alt` export |
| `app/custo-da-hora/opengraph-image.tsx` | `alt` export |
| `app/custo-da-hora/twitter-image.tsx` | `alt` export |
| `components/organisms/salary-calculator.tsx:34` | `MISSING_VALUE` |
| `components/organisms/salary-calculator.tsx:126` | body copy |
| `components/organisms/day-summary.tsx:221` | body copy |
| `components/organisms/calculator-views.tsx:79` | body copy |
| `lib/structured-data.ts:27` | JSON-LD `name` |
| `lib/payroll.ts:24` | `impact` string citing the RGPS ceiling and the table year (**not in the original request**) |
| `lib/payroll.ts:32` | `impact` string of the `estatutario` regime, which names R$ 8.475,55 the *"teto do INSS"* (**added run 3**, see F1) |
| `lib/compliance.ts:34` | CLT art. 59 / Súmula 376 TST warning (**not in the original request**) |

Every pt-BR replacement string is `content-writer`'s at G4. This spec names the
locations and the constraint (§ Disclosure obligations), not the wording.

### Claim correction — "banco de horas" comes out (added run 2)

**This is a claim correction, not a copy preference.** `PRODUCT.md` §4 says a number the app
cannot trace does not ship, *"not as an estimate, not as a 'aproximadamente'"*, and §9 closes
with *"Anything not in this table is not a claim the product may make, in the UI or in the
README"*. A feature claim in indexed metadata is held to the same bar as a number on screen,
or the promise means nothing the moment it is inconvenient.

**The ruling: the words "banco de horas" are removed from every shipping surface.** The app
computes the balance **of one day** (`components/organisms/day-summary.tsx:113,172`, from
`stats.balance`). There is no accrual across days, no compensation window, no pactuação and
no expiry anywhere in `lib/` — none of what CLT art. 59 §§2º, 5º e 6º makes a banco de horas.
Nothing in `PRODUCT.md` §9 backs it. The claim is unbacked and it comes out.

**The claim surface — seven locations, re-grepped at run 2 rather than trusted from the
report (lesson 001).** `tech-lead` named six; the seventh is the test fixtures, which pin the
strings and will fail the build if the rewrite ignores them.

| # | Location | What it is | User-visible how |
|---|---|---|---|
| C1 | `app/page.tsx:6` | `metadata.title.absolute` | Browser tab, SERP title |
| C2 | `app/page.tsx:11` | `metadata.openGraph.title` | Link preview on every share |
| C3 | `app/opengraph-image.tsx:3` | `alt` export | Assistive tech, crawlers (also one of the eleven) |
| C4 | `app/twitter-image.tsx:3` | `alt` export | Same (also one of the eleven) |
| C5 | `lib/og-image.tsx:14` | `OG_CONTENT.work.title` | Rendered **into** the OG image bitmap |
| C6 | `lib/calculator-view.ts:9` | `VIEW_HEADINGS.work` | The page `h1` **and**, via `lib/structured-data.ts:27`, the JSON-LD `name` (also one of the eleven) |
| C7 | `__tests__/app-header.test.tsx:12`, `__tests__/page.test.tsx:33,38`, `__tests__/calculator-page.test.tsx:39` | Assertions that hard-code the four strings above | Not user-visible; in scope because they must move with C1–C6 or `pnpm test` fails |

**`lib/calculator-view.ts:9` is ruled in**, explicitly, because `tech-lead` asked: it is the
single highest-leverage location of the seven. One constant feeds a visible `h1` and a
`schema.org/WebApplication` `name`, so it is simultaneously the most-read surface and the
most-indexed one. `lib/structured-data.ts:27` needs **no edit of its own** — it interpolates
C6 and inherits the correction.

**What may be claimed instead.** This spec rules on the *claim*; `content-writer` writes the
*wording* at G4, against S7/S8 and this permission:

| | |
|---|---|
| The `work` descriptor **may** name | the day's jornada (entrada, saída projetada, tempo decorrido), horas extras, adicional noturno, and the **saldo do dia** — each stated as belonging to a single day |
| It **may not** name | banco de horas, compensação de jornada, acúmulo, "banco", saldo do mês, histórico, ponto or registro de ponto — the first four because no code backs them, the last three because `PRODUCT.md` §7 forbids the feature outright |
| It **may not** imply | that the saldo carries from one day to the next, in any tense |

The operating test is the one the analyst already applied when clearing the `salary`
descriptor (`legal.md` §4.7.2): a descriptor may name a capability the code demonstrably has,
verified against the module that computes it. It may not name a legal instrument.
`PRODUCT.md` §9 gains one row in this amendment so the permission is recorded where the next
spec will look for it, instead of being re-derived from this document.

**The SEO cost, stated rather than waved away.** "banco de horas" was deliberately targeted —
it sits in the tab title, the OG title, the OG bitmap, the `h1` and the JSON-LD `name`, which
is a five-surface keyword placement, not an accident. Removing it **costs real search
surface** for a high-volume term, and nothing in this spec recovers it. That cost is accepted:
ranking for a query the product cannot answer sends a worker to a tool that will not do the
thing they came for, and `PRODUCT.md` §4 is the reason anyone should trust the numbers that
*are* right. Indexing a false claim harder is not a reason to keep it. No compensating keyword
work is authorised here — it is not this spec's problem to solve, and improvising one would be
the scope creep § Out of scope forbids.

### F1 — `lib/payroll.ts:24` mislabels the ceiling (added run 2)

| Location | Correction | Settled by |
|---|---|---|
| `lib/payroll.ts:24` | The string calls R$ 8.475,55 the *"teto de contribuição"*. It is the **teto do salário de contribuição** (the base); the teto da contribuição is R$ 988,09, named four words later in the same sentence. | `labor-law-analyst`, `legal.md` §4.1 + F1. The replacement phrase and its norm (Portaria Interministerial MPS/MF nº 13/2026, art. 2º) are already written there. |
| `lib/payroll.ts:32` (added run 3) | The `estatutario` string calls the same R$ 8.475,55 the *"teto do INSS"* — the identical collapse in colloquial dress, and `legal.md` **S10.3** forbids it **anywhere in `lib/`**. The clause must name the base it means without renaming the figure. | `labor-law-analyst`, `legal.md` §15.3 **S10.3**. Same norm, same article. |

One clause, inside a string S1 already rewrites. It changes **no number** — both figures stay
interpolated from `RGPS_CEILING` and `TABLE.rgpsCeilingDiscount` — so LD7 and AC15 are
untouched. `content-writer` applies it at G4 against S1 and invents no law.

**Run 3 — B2 is absorbed here, it does not go to `0003`.** `tech-lead` raised at G4 that
`legal.md` S10.3 bans *"teto do INSS"* everywhere in `lib/` while `copy.md` §5 left
`lib/payroll.ts:32` untouched as *"fora de escopo"*. The scope is wrong, not the rule, and this
spec fixes its own scope:

1. **S10.3 is this spec's own rule.** It was written by this spec's G2, at run 2, about this
   spec's own correction. Closing 0002 with S10.3 knowingly violated would make "a binding rule
   the analyst wrote, left unapplied because a scope table was drawn before the rule existed"
   into a precedent, and `AGENTS.md` §4 rule 8 says scope does not overrule the analyst.
2. **This spec creates the harm.** Before T6 both strings were wrong the same way. After T6 the
   CLT regime says *teto do salário de contribuição* and the estatutário regime, one `<select>`
   option away in the same `WORK_REGIME_INFO` array, still says *teto do INSS* — two names for
   one figure on one screen. That divergence is manufactured by this change; `0003` cannot own a
   defect 0002 introduces.
3. **It is not a widening.** No new legal dependency (LD11 already covers the naming), no new
   norm, no new claim surface, no new file — `lib/payroll.ts` is already edited by T6. `0003`
   holds citation accuracy in `lib/legal-tables.ts`; this is a naming collapse in a disclosure
   string, which is the subject F1 already opened.

It changes **no number** and adds **no interpolation**: the `estatutario` string carries no
figure. LD7 and AC15 stay untouched. The pt-BR is `content-writer`'s at G4, written against
S10.3 and against T12's preserved elements ("RPPS federal", "22%", the estadual/municipal scope
limit).

## Out of scope

Binding on every downstream agent.

- **Anything that changes what the calculator computes.** Not a rate, not a bracket, not
  a ceiling, not a rounding rule, not the 52min30s reduced hour, not the order of
  operations in any `lib/` module.
- **Building a banco de horas** (added run 2). Ruled unavailable to this spec by `tech-lead`
  at triage and confirmed here: a compensation regime has a period, an accrual, a pactuação
  and an expiry, which is a change to what the calculator computes and a spec of its own. The
  claim comes down **now** regardless, because a claim cannot be indexed on the promise of a
  future build. See § Deferral below for where that future build stands.
- **Recovering the lost "banco de horas" search traffic** (added run 2). No new keyword, no
  new page, no new metadata beyond correcting the seven locations in § Scope. Naming the SEO
  cost is honesty; chasing it here is scope creep.
- **The legal tables.** `lib/legal-tables.ts` is not touched by this spec for any reason.
- **The meaning of any disclaimer.** A disclaimer's sentence may be restructured to drop
  an em-dash; its meaning, its scope and the gap it names may not shift by one word.
- **CSS comments in `app/globals.css`.** Not user-visible. The em-dash ban applies to
  what reaches a screen or a crawler, not to source comments.
- **Every landing-page box in the Section 14 matrix**, recorded as `n/a — tool, not a
  landing page`, and named here so no agent invents marketing content to satisfy one:
  hero fit / hero top padding / hero stack discipline, eyebrow count, section-numbering
  eyebrows, split-header ban, zigzag alternation cap, duplicate CTA intent, CTA wrap,
  logo walls and "Used by / Trusted by", bento grids and bento background diversity,
  marquees, testimonials and quote attribution, scroll cues, version labels and version
  footers, photo-credit captions, decoration text strips, locale/city/weather strips,
  premium-consumer palette, serif discipline, italic descender clearance, real images /
  picsum placeholders, GSAP sticky-stack and horizontal-pan, section-layout repetition.
- **Any new page, route, section or content block.** Nothing is added to satisfy a box.
- **Redesign.** No layout, spacing, hierarchy or colour change beyond what a type swap
  mechanically forces (see Risks).
- **Adding a runtime dependency to fix LCP.** §3: nothing at runtime.
- **Changing how the hero numeral reaches first paint** (named explicitly run 4). The
  client-gated hero (`design.md` §5.1 cause 2) is the single largest LCP cost on both routes and
  §5.2 deliberately never put it on the "what may change" table. It stays out. `.specs/0004-lcp-render-delay/`
  owns it.
- **AdSense placement.** Untouched by this spec.
- **An English UI string**, per `PRODUCT.md` §7.

## Deferral — is "banco de horas" a candidate feature? (added run 2)

**No, not under `PRODUCT.md` as it stands today. It is dropped, not parked — and this is the
trail that says so.**

Removing the words is not a quiet erasure, and the honest answer is not "later". A banco de
horas requires a balance that accumulates across days and settles inside a statutory window.
That is a stored month of the user's journey, and `PRODUCT.md` §7 already refuses it in
writing: *"No timesheet history or ponto eletrônico. The moment it stores a month of records
it becomes a compliance system with a compliance system's obligations."* §5 "offline and
private" and the ten-second §1 path point the same way.

So the feature does not sit on a roadmap waiting for capacity — it sits behind a **§7
amendment**, and `AGENTS.md` says `PRODUCT.md` outranks every agent's judgment until a human
changes it. I am not amending §7, and no downstream agent may treat this section as
permission to.

**If the product wants it**, the sequence is: a human edits `PRODUCT.md` §7, *then* a new spec
is opened for the accrual, the compensation window and the pactuação, *then* `PRODUCT.md` §9
gains a row when the code backs it, *then* the words may return to the metadata. Not before,
and not in that order rearranged. Recorded in this section, in the `STATUS.md` decisions log,
and in `PRODUCT.md` §9 as an explicit non-claim, so the next agent inherits the reasoning
instead of re-deriving it from an absence.

## Legal dependencies

`labor-law-analyst` settles each of these at G2. They are named, not stated.

| # | Dependency | Why this spec touches it |
|---|---|---|
| LD1 | The exact text and legal meaning of the disclaimer at `components/organisms/day-summary.tsx:221` | An em-dash is being removed from a sentence that names a gap (`PRODUCT.md` §4). The analyst must confirm the sentence's legal claim and the boundary of what it disclaims, so `content-writer` can restructure the punctuation without narrowing or widening it. |
| LD2 | The exact text and legal meaning of the disclaimer at `components/organisms/calculator-views.tsx:79` | Same. |
| LD3 | The exact text and legal meaning of the body copy at `components/organisms/salary-calculator.tsx:126` | Same, for the salary path (INSS / IRRF / dependents / simplified deduction). |
| LD4 | Whether `MISSING_VALUE` at `salary-calculator.tsx:34` is a legal statement or a UI placeholder | Determines whether its replacement is a copy decision at G4 or a legally-bound string the analyst must fix. |
| LD5 | Whether the JSON-LD `name` in `lib/structured-data.ts:27` makes a product claim | It is crawler-visible and therefore a public claim, bound by `PRODUCT.md` §9. The analyst confirms the post-change name claims nothing §9 does not back. |
| LD6 | Whether the four `alt` strings make a product claim | Same reason: `alt` is user-visible and indexable. |
| LD8 | The exact legal meaning of the `impact` string at `lib/payroll.ts:24` | It states the RGPS ceiling behaviour and names a table year. `PRODUCT.md` §4: the year is part of the answer. The analyst confirms the claim and its year before the punctuation is restructured. |
| LD9 | The exact legal meaning of the warning at `lib/compliance.ts:34` | It cites CLT art. 59 and Súmula 376 TST and tells the user what remains owed. Restructuring the sentence around the em-dash must not shift which party the irregularity falls on. |
| LD7 | Confirmation that no number rendered by this change's touched files is altered | The gate that guarantees a typography change cannot silently become a calculation change. Every number the app shows keeps the table and the norm it already cites. |
| LD10 | (added run 2) Whether the replacement `work` descriptor claims any legal instrument or regime the code does not implement — checked against CLT art. 59 §§2º, 5º e 6º (banco de horas / regime de compensação) and against what `day-summary.tsx` and `lib/` actually compute | The claim correction in § Scope removes "banco de horas" from seven locations. The analyst confirms the removal is complete and that the permitted descriptor (jornada do dia, horas extras, adicional noturno, saldo do dia) names only capabilities the code has. This is the re-run of B1. |
| LD11 | (added run 2) The correct name for R$ 8.475,55 in `lib/payroll.ts:24`, and confirmation that the corrected clause still distinguishes it from R$ 988,09 in the same sentence | Finding F1. Already settled in `legal.md` §4.1 and F1 under Portaria Interministerial MPS/MF nº 13/2026, art. 2º; re-confirmed here so G6 checks it against a dependency rather than against a footnote in a rejected report. |

No new rate, bracket, ceiling, table or súmula is introduced by this spec. If a
downstream agent finds one is needed, the spec is wrong and must bounce.

## Acceptance criteria

| # | Criterion | How it is verified |
|---|---|---|
| AC1 | Zero user-visible em-dash (`—`) or en-dash (`–`) in `app/**`, `components/**` and `lib/**`, excluding CSS and code comments. | `rg '[—–]' app components lib --glob '!*.css'` returns no line outside a comment, and the command output is pasted into `reports/audit.md`. |
| AC2 | The eleven occurrences listed in Scope are each resolved, one row per occurrence. | A table in `reports/audit.md` with file, before, after, and the agent that wrote the replacement. |
| AC3 | The full Section 14 pre-flight matrix is recorded with a verdict of `pass`, `fail` or `n/a` **and a one-line reason** for every box in the skill, including the out-of-scope ones. | `evidence/preflight-matrix.md` exists; box count matches the skill's checklist; no box is blank. |
| AC4 | The Design Read one-liner (Section 0.B) and the three dial values with their Section 1.A justification are recorded in `DESIGN.md`. | Read `DESIGN.md`; both present, dial values are numbers, justification names the signal row. |
| AC5 | The shipped typeface renders tabular figures: the digits `0`–`9` occupy identical advance width in every numeric token on screen. | Browser check at 390px width on the jornada and salário screens: a changing live value does not shift the characters to its right by one pixel. Screenshot in `evidence/`. |
| AC6 | The shipped typeface renders `0` distinguishable from `O` and `1` from `l` at the smallest size the app uses for a number. | Specimen screenshot of `0O1l` at that size, in `evidence/`, both themes. |
| AC7 | **(restated run 4 — see § AC7, restated below)** On **both** routes, mobile LCP improves against the AC8 baseline, and the improvement is larger than the instrument can explain: (a) the median of the recorded post-change run set is below that route's AC8 baseline median; (b) the improvement is greater than the spread (max − min) of that route's post-change run set; (c) **no individual** post-change run is above that route's baseline median. | `NEXT_PUBLIC_ENABLE_ADS=false pnpm build` then `NEXT_PUBLIC_ENABLE_ADS=false pnpm exec lhci autorun` (default mobile preset, no `LH_PRESET`), same machine as the AC8 baseline. Every run's LCP, both medians and both spreads recorded in `evidence/after.md` §2 and carried into `reports/release.md`, with the run date. Three numbers per route, not an assertion. |
| AC8 | LCP is measured on the same route **before** the change, and the before/after pair is recorded. | Both numbers in `reports/release.md`. Without the before number, AC7 proves nothing about this change. |
| AC9 | No icon in the shipping UI comes from `lucide-react`; `lucide-react` is absent from `package.json` dependencies. | `rg 'lucide-react' --glob '!pnpm-lock.yaml'` returns nothing; `grep lucide package.json` returns nothing. |
| AC10 | The route JS transferred for the main route does not grow. If it grows, `plan.md` states the byte delta and the justification, and the delta is under 10 kB gzipped (10,240 bytes). | **(verification corrected run 4)** `node .agents/tools/route-js.mjs` for the route, which is the authoritative method on this Next version: it reads the `src` attribute of every `script` tag in the route's pre-rendered HTML under `.next/server/app/`, de-duplicates them, **excludes the `noModule` tag** (the legacy polyfill bundle, which no modern browser fetches), and gzips each chunk at level 9. Baseline: **228,446 bytes over 9 chunks** on both routes (`evidence/baseline.md` §1). Before and after figures and the chunk count recorded in `reports/release.md`. `pnpm build`'s output is **not** the source: Next 16 removed the `First Load JS` line (B3). |
| AC11 | No occurrence of `h-screen` or `min-h-screen` remains in `components/**` or `app/**`. | `rg 'min-h-screen\|h-screen' app components` returns nothing. |
| AC12 | Zero axe-core violations at `critical` or `serious`, in **both** light and dark themes, after the change. | The existing a11y suite, run on both themes, output in `reports/audit.md`. |
| AC13 | Every text and UI element still meets WCAG 2.2 AA contrast in both themes after the type swap. | Contrast check reported per token pair in `reports/audit.md`; a weight or optical-size change that lowers apparent contrast is caught here, not by eye. |
| AC14 | No horizontal overflow and no control outside the viewport at 390, 1440, 2560 and 3840, in both themes. | The existing Playwright suite, green. |
| AC15 | Every number the app displayed before the change displays the identical value after it. | `pnpm test` green with coverage unchanged at the `AGENTS.md` §9 thresholds; no snapshot of a computed value differs. |
| AC16 | `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test` and `node .agents/tools/docs-check.mjs` are all clean. | Command output in `reports/release.md`. |
| AC17 | `DESIGN.md` and the `@theme` block in `app/globals.css` agree with the shipped font stack: no token still names a family the app no longer loads. | `rg 'font-inter' app components DESIGN.md` returns only what the shipped stack actually uses. |
| AC18 | If the inviolable constraint disqualifies every candidate family and Inter is kept, `DESIGN.md` records the exception, the families tested and the figure that failed. | Read `DESIGN.md`; the exception paragraph exists and names at least two rejected candidates. |
| AC19 | (run 2) **Zero occurrences of "banco de horas"**, in any casing, anywhere in `app/**`, `components/**`, `lib/**` and `__tests__/**`. | `rg -i 'banco de horas' app components lib __tests__` returns **nothing**. Output pasted into `reports/audit.md`. Checked exactly the way AC1 checks the em-dashes. |
| AC20 | (run 2) Each of the seven claim locations C1–C7 is resolved, one row per location, with before and after. | A table in `reports/audit.md` with location, before, after, and the agent that wrote the replacement. Seven rows, none blank. `lib/structured-data.ts:27` is **not** a row: it inherits C6 and an edit there is a defect. |
| AC21 | (run 2) The replacement `work` descriptor names no regime and no accumulation. | `grep -rniE 'compensaç\|acúmul\|acumul\|banco\|saldo do mês\|saldo mensal\|histórico' app/page.tsx app/opengraph-image.tsx app/twitter-image.tsx lib/og-image.tsx lib/calculator-view.ts` returns nothing. Scoped to the five descriptor files on purpose: the footer disclaimer legitimately says "registro oficial de ponto" (`legal.md` D3) and a repo-wide grep would flag it. Output in `reports/audit.md`. |
| AC22 | (run 2) The rendered JSON-LD `name` and the page `h1` for the `work` view are **identical in descriptor** to the two root `alt` exports, and the two root `alt` exports are identical to each other. | Read the built page source and the four strings; a four-way diff of the descriptor segment, recorded in `reports/audit.md`. A rewrite that diverges them is a defect (`legal.md` S8). |
| AC23 | (run 2) `lib/payroll.ts:24` no longer calls R$ 8.475,55 the "teto de contribuição". | `rg 'teto de contribuição' lib` returns nothing; the rewritten string names the **teto do salário de contribuição** for `RGPS_CEILING` and keeps R$ 988,09 legible as the consequence of crossing it. Verified against `legal.md` S1 at G6. The sibling clause at `lib/payroll.ts:32` is **AC25**. |
| AC25 | (run 3) The phrase "teto do INSS" appears nowhere in `lib/`, and the `estatutario` `impact` still contains "RPPS federal", "22%" and the estadual/municipal scope limit. | `rg -i 'teto do INSS' lib` returns nothing, output pasted into `reports/audit.md`; `__tests__/payroll.test.ts:58-59` still green unmodified, plus the new case in `__tests__/copy-guards.test.ts` asserting no `WORK_REGIME_INFO` `impact` contains the phrase. |
| AC26 | (run 3) Across the two `WORK_REGIME_INFO` `impact` strings, R$ 8.475,55 is referred to by **one** name. | Read both rendered regime descriptions on the salário screen, both `<select>` options, in `reports/audit.md`: the noun phrase governing the figure is the same in both, and it is the one S10.1 requires. A rendering where one says *salário de contribuição* and the other says *INSS* fails. |
| AC24 | (run 2) `pnpm test` is green **without** any assertion having been deleted to make it pass. | `git diff` on `__tests__/**` shows string updates only: no removed `it()`, no removed `expect()`, no `.skip`. Coverage unchanged at the `AGENTS.md` §9 thresholds. |

No criterion above is satisfied by the words "properly", "correctly" or "as expected".
Each one is a command to run or a screen to read.

### AC7, restated (run 4) — and where the absolute 2.5 s went

`tech-lead` routed AC7 back here at the G5 run-4 triage rather than softening it, with the
measurement attached. I am restating it, and the honest name for what I am doing is **fixing a
defective criterion, not lowering a bar** — the reasoning is recorded so a reader in six months
can disagree with it on the evidence:

1. **It was written against the wrong phase.** AC7 came from the `design-taste-frontend` skill,
   which is written for marketing pages, where LCP is a server-rendered element and the levers
   are fonts, images and blocking CSS. On this page the LCP phases are TTFB 454 · load delay 0 ·
   **load time 0** · render delay 2,076: 82% of the metric is render delay, and every resource
   lever finishes 2.4 s before the LCP timestamp. The criterion aimed at a phase this page does
   not spend time in, and this spec's authorised levers (L1–L3) could not reach the phase that
   does.
2. **It was decided finer than its instrument.** A lab-simulated median was being read against
   2,500 ms, a threshold Core Web Vitals defines as a **field p75**, with a run-to-run spread of
   ~106 ms judging a 31 ms margin. Clause (b) of the restatement fixes exactly this: the
   improvement must exceed the instrument's own spread on that run set, so the criterion can
   never again be decided inside the noise.
3. **As written it was satisfiable only by work this same spec forbids.** The remaining cost is
   the client-gated hero numeral (`design.md` §5.1 cause 2), which §5.2 never put on the "what
   may change" table and which § Out of scope keeps out. A criterion that can only pass by
   breaking its own document is a defect in the criterion.

**What the restatement does not do: it does not retire the 2.5 s target.** The absolute target
moves, with an owner and a place, to **`.specs/0004-lcp-render-delay/`** (opened at this run,
`STATUS.md` holds the carried finding and the measurement). Not `0003-citation-registry`, which
is scoped to citations and touches `lib/legal-tables.ts` and footer prose — nothing it does moves
render delay. To reach 2,500 ms, `0004` has to change what `0002` protects: how the hero numeral
reaches first paint (server-render or placeholder-render the LCP element instead of gating it on
the client clock), which needs its own design pass, its own decision about what a stale or
placeholder number may show before hydration — a `PRODUCT.md` §4 question, not a performance one
— and a field instrument (CrUX p75) rather than a lab median.

**What this spec still owes:** the numbers themselves. AC7 restated is a claim about three
recorded figures per route; T11 step 2b produces them.

## Defaults for anything this spec introduces

This spec introduces no user-facing input, so there is no new default to state. The
defaults it does set, for downstream agents:

| Decision | Default | Why |
|---|---|---|
| Font loading strategy | `display: "swap"`, self-hosted via `next/font`, `subsets: ["latin"]` unchanged | Matches what ships; a change here is an LCP decision at G5, not a design one. |
| Theme, motion and density dials | Whatever run 0001 already built to, declared retroactively, not re-tuned | Section 1.A `redesign - preserve`. This is a compliance pass, not an overhaul. |
| Icon replacement mapping | One-for-one, same glyph meaning | Any icon whose meaning changes is a design decision and needs `product-designer` to sign it. |
| Where a box conflicts with `PRODUCT.md` | `PRODUCT.md` wins, exception recorded | `PRODUCT.md` outranks the skill. |

## Disclosure obligations

- **Every disclaimer rewritten to drop an em-dash keeps its exact scope.** `PRODUCT.md`
  §4 "name the gap": where the app omits a variable a real payslip includes, it says so
  visibly. Restructuring `A — B` into `A. B` or `A (B)` must not turn a stated omission
  into a softer one. `labor-law-analyst` (LD1–LD3) confirms the meaning before
  `content-writer` rewrites and again after.
- **The `alt` strings and the JSON-LD `name` are public claims**, not decoration. After
  the change they may claim only what `PRODUCT.md` §9 backs (LD5, LD6).
- **A metadata claim is held to the §4 bar** (added run 2). "banco de horas" in a tab title,
  an OG title, an OG bitmap, an `h1` and a JSON-LD `name` is the app asserting a named legal
  instrument (CLT art. 59 §§2º, 5º e 6º) it does not implement. `PRODUCT.md` §4 admits no
  softer version of a claim it cannot trace, and a claim the crawler reads is not exempt
  because the user did not type it into a field. It comes out; it is not hedged, qualified,
  or moved to a less prominent surface.
- **The removal is disclosed as a deferral, not an erasure** (added run 2). `PRODUCT.md` §9
  records "banco de horas" as an explicit non-claim, with the §7 collision that keeps it one.
  A claim retired without a trail is a claim the next well-meaning agent restores.
- **The year is part of the answer** (`PRODUCT.md` §4). Any string naming a table's year
  keeps that year visible after the rewrite.
- **If Inter is kept** under the inviolable constraint, that is disclosed in `DESIGN.md`
  as a knowing exception to the skill, with the reason. An undocumented failure to
  comply and a documented decision not to comply are different things, and only the
  second one is acceptable.

## Risks

| # | Risk | Must be measured, not assumed |
|---|---|---|
| R1 | **A typeface swap moves every metric the design system was tuned to.** `DESIGN.md` carries hand-tuned `letterSpacing` from `-0.035em` to `+0.005em` across nine type roles, plus `clamp()` sizes and line heights. A new family changes x-height, cap height, advance width and optical density, so the ramp does not transfer. | Re-tune every role and re-verify AC13 (contrast), AC14 (overflow) and AC5 (tabular alignment) after the swap. A ramp copied across unchanged is a failure of this gate, not a saving. |
| R2 | **An icon-library swap can cost bundle size.** `lucide-react` tree-shakes well today; a replacement may not, and 12 files of icons is not a small surface. | AC10: byte delta recorded from `node .agents/tools/route-js.mjs`, before and after (corrected run 4; `pnpm build` no longer prints the figure). If the swap costs more than 10 kB gzipped for a change no user can see, it is not worth it and the box is recorded as a documented exception instead. |
| R3 | **A font swap can make LCP worse, not better.** A heavier family, a second weight, or a variable font with more axes adds bytes on the critical path, and this spec already starts 0.3s over budget. | AC7 and AC8 together. If the chosen family pushes LCP up, it is disqualified by AC7 regardless of the aesthetic case. |
| R4 | **Rewriting a disclaimer to drop punctuation can change its legal meaning.** | LD1–LD3 plus the disclosure obligation above. |
| R5 | **Scope creep into a redesign.** The skill's matrix is written for landing pages, and a well-meaning agent can read "hero fits the viewport" as an instruction to build a hero. | The out-of-scope list is explicit and binding. Any box outside the Scope list is `n/a`, and inventing content to satisfy one bounces the gate. |

## Non-goals

What a downstream agent might reasonably add, and must not:

- A hero, a landing section, a logo wall, testimonials, a marquee or any marketing block.
- A scroll cue, a section-numbering eyebrow, a version label, a decorative dot.
- Any new animation. `MOTION_INTENSITY` is whatever 0001 shipped; this is a compliance
  pass, not a motion pass.
- A serif anywhere. This is a tool that displays money.
- Any new input, toggle or setting, including a font-size or a font-family preference.
- A dependency added to hit the LCP number.
- Rounding, reformatting or "cleaning up" a displayed number to make it fit a new
  typeface's metrics. If a number no longer fits, the layout yields, never the number.
- Removing a disclaimer because its sentence got awkward without the em-dash.
- Touching `lib/legal-tables.ts`.
- **Re-introducing "banco de horas" anywhere** — including as a `keywords` entry, a hidden
  heading, an `aria-label`, a `description`, an FAQ block, alt text, a sitemap entry or a
  comment that a later grep will surface as intent. The claim is retired, not relocated.
- **Renaming what the app computes to make the old keyword true** — calling the day's saldo a
  "mini banco de horas", "banco de horas do dia" or any phrase that keeps the instrument's
  name attached to something that is not the instrument.
- **Deleting or weakening a test** to make `pnpm test` pass after the strings move (AC24).
- **Reaching the absolute 2,500 ms LCP target by widening this spec** (added run 4). The only
  remaining lever is the client-gated hero numeral, which § Out of scope forbids. It belongs to
  `.specs/0004-lcp-render-delay/`, and pulling it in here — a rendering change with no design
  pass and no decision about what the hero may show before hydration — is precisely the creep
  this spec has been narrowed twice to avoid.
- **Absorbing F2, F3, F4 or F5.** They are `.specs/0003-citation-registry/`. Fixing one here
  means touching `lib/legal-tables.ts`, which § Out of scope forbids as the LD7 guard.

## Evidence available

| Claim | Source |
|---|---|
| The pre-flight was never run against what shipped | Team request, run 0002; no `evidence/preflight-matrix.md` exists in 0001 |
| Eleven user-visible em-dash occurrences | `grep -rn '—' app components lib --include='*.ts' --include='*.tsx'`, run at G1; file:line enumerated in Scope |
| Inter is an explicit AI Tell | `.agents/skills/design-taste-frontend/SKILL.md` §9.B, §0.D |
| Em-dash ban is non-negotiable | Same, §9.G |
| Allowed icon libraries are Phosphor / HugeIcons / Radix / Tabler | Same, §9.E |
| `min-h-[100dvh]`, never `h-screen` | Same, §14 |
| LCP target under 2.5s | Same, §14; `PRODUCT.md` §3 |
| Inter is the shipped family | `app/layout.tsx:2,9`; `DESIGN.md` typography block |
| `min-h-screen` ships today | `components/templates/calculator-page.tsx:20` |
| Current mobile LCP is 2.8s | Team request; to be re-measured as the AC8 baseline |
| The product may not claim anything outside §9 | `PRODUCT.md` §9 |
| The app computes a **single day's** balance, with no accumulation | `components/organisms/day-summary.tsx:113,172` (`stats.balance`); no multi-day carry anywhere in `lib/` — verified at G2 (`legal.md` §1) |
| "banco de horas" appears in exactly seven locations | `grep -rniI 'banco de horas'` over the working tree, run at G1 run 2; C1–C7 enumerated in Scope |
| A banco de horas is a named legal instrument, not a daily saldo | CLT art. 59 §§2º, 5º e 6º, redação da Lei nº 13.467/2017 — settled by `labor-law-analyst`, `legal.md` §1 |
| Storing a month of records is refused by the product | `PRODUCT.md` §7, "No timesheet history or ponto eletrônico" |
| R$ 8.475,55 is the teto do salário de contribuição, not the teto da contribuição | Portaria Interministerial MPS/MF nº 13/2026, art. 2º — `legal.md` §4.1, F1 |

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| Which typeface replaces Inter? | Not decided here. `product-designer` chooses at G3, gated by the inviolable constraint and AC5–AC7. | Font choice is design, not product. This spec sets the bar it must clear. |
| Which icon library replaces `lucide-react`? | Not decided here. `tech-lead` chooses at G5 against AC10. | Library choice is architecture, and the deciding factor is a measured byte delta. |
| What if no allowed family has real `tnum` and a disambiguated zero at an acceptable byte cost? | Keep Inter with `tnum`/`zero` enabled and record the exception per AC18. | The user's ability to read their own salary outranks a house-style box. |
| What if the icon swap grows the bundle past 10 kB gzipped? | Keep `lucide-react` and record the exception in `DESIGN.md`. | `PRODUCT.md` §3: cold load beats every later interaction, and no user can see which library drew the chevron. |
| Does dropping to 2.5s LCP require a change the out-of-scope list forbids? | Bounce to product-manager rather than widening scope. | Two bounces is the ceiling; a third stops the pipeline for a human. |
| (run 2) Drop the "banco de horas" claim, rename it, build the feature, or have the human accept the imprecision? | **Drop it**, and permit a descriptor that names the day's jornada, horas extras, adicional noturno and saldo do dia. | Building it is barred by this spec's Out of scope and by `PRODUCT.md` §7. Accepting the imprecision is only the human's to do and nobody asked for it. Renaming without removing launders the claim through a punctuation pass (lesson 002). |
| (run 2) Who recovers the SEO surface the removal costs? | Nobody, in this spec. Stated as an accepted cost, not solved. | Keyword recovery is new work with its own trade-offs; smuggling it into a typography pass is exactly the creep R5 describes. |
| (run 2) Does `PRODUCT.md` §9 change? | Yes — one row added for the single-day computation, one row recording "banco de horas" as an explicit non-claim, in this same amendment. | A spec that relies on a claim table it did not update leaves the next spec re-deriving this. |
