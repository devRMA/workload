# 0011 — privacy policy and lgpd information duty

> Owner: product-designer · Gate: `design` · Run 1

**Verdict: `pass`.** Every geometric number in this file was measured in a production build
(`next build` + `next start`) in an isolated copy outside the repository, at the four reference
widths and in both themes. Nothing is projected. Where a number could not be measured because the
string does not exist yet, the cell carries the **probe that produced its capacity figure** and says
what that figure measures, per lesson **052**; no cell carries a caveated estimate, per lesson **050**.

Three of this design's load-bearing decisions were **produced by a measurement that contradicted the
draft**, and are recorded as such in § *Measurements* rather than presented as judgment:

1. The policy link in the settings dialog sits **above** the category rows, because below them it is
   unreachable without scrolling at 390×667 — which fails `legal.md` §22's *Rendered* definition.
2. The **consent banner does not render on the policy route**, because it occludes **453.17 px** of
   that page's own content at 390×667 — the page the banner's own link sent the reader to.
3. The page's prose column is `max-w-prose`, not `max-w-3xl`, because `max-w-3xl` renders
   `--text-body` at **75 characters per line**, over `DESIGN.md`'s 68ch cap.

---

## 0. Method, and how to reproduce every number here

`AGENTS.md` §4 rule 6, and this gate's own obligation to measure rather than infer.

- **Isolated copy, never the repository.** `git archive HEAD | tar -x` into a scratchpad **outside**
  the tree; `cp -al node_modules`; `rm -rf .next` before the first build. No `git worktree`, no ref
  written, no file in the checkout touched. `git status --porcelain` over the repository after
  teardown is identical to before.
- **Production build only.** `next build` + `next start` on **port 3177**, confirmed free with
  `ss -ltn` before binding and released after. **`next dev` was not used and its readings would be
  false** — `legal.md`'s G2 decisions log records that under `next dev` in this environment the page
  never hydrates, no `useEffect` runs and the consent banner never appears.
- **Quantity.** Every presence, adjacency, occlusion and overflow number is
  `getBoundingClientRect()` on the **border box**, read at
  `document.documentElement.clientWidth ∈ {390, 1440, 1920, 2560, 3840}` — never DOM position.
  Line counts are `Range.getClientRects()` grouped by distinct `top`, not `scrollHeight ÷ lineHeight`:
  the first probe used the latter and reported **3 lines** for a 44px flex row that renders **2**,
  which is why the index-row capacity figure below is the range-derived one.
- **Both themes** measured with `colorScheme: "light"` and `"dark"` browser contexts. Geometry is
  byte-identical between them at every width; only colour differs. That identity is itself the check
  that no theme-conditional layout crept in.
- **Contrast** computed from the `DESIGN.md` frontmatter hexes by the WCAG 2.x relative-luminance
  formula, and **validated against `DESIGN.md`'s own published pairs before being trusted**:
  ink/surface 15.77 (published 15.77), ink-muted/surface 5.87 (5.87), accent-ink/surface 6.47 (6.47),
  accent-ink dark/surface 8.43 (8.43). The method reproduces the document, so the pairs the document
  does not publish are trustworthy from the same script.
- **A prototype was built and rendered.** This design was not drawn on paper. The structure below was
  built in the isolated copy as a real route against the real tokens, and the numbers are read off
  it. Where the prototype's first draft was wrong, § *Measurements* says so.

---

## 1. Intent — what the eye does in the first two seconds on a phone

This page has **no number on it**. That is the single most important fact about its design, and it is
why it is not a hero: `DESIGN.md`'s Colour-Means-a-Number Rule licenses a saturated plane only where
a quantity lives, and the Hero panel's three fills each encode a meaning this page has none of. A
cobalt hero here would be decoration on the one surface in the product that may not have any.

So the hierarchy is carried by **position and type step alone**, and it answers the two questions the
two readers actually arrive with.

- **0–1 s.** The page title, then the **first sentence of the summary card** — the app's true claim,
  the one `legal.md` §22 **D2** protects from being deleted along with the false one: the calculation
  runs in this browser and the numbers the reader types go nowhere. It is the top of the page because
  it is the only thing on it that is good news, and because a reader who bounces after one second
  should leave with the true half rather than with nothing.
- **1–5 s.** The summary card's second paragraph — *what does leave*, naming Google and Vercel — and
  the date the page last changed. The reader who arrived from the consent banner has now been told
  the thing the banner did not tell them, and can go back and decide.
- **5–30 s.** The six-row index. This is the reader who came to *do* something: refuse, change their
  mind, ask what is held, or complain. Six rows, not ten, because the index is grouped by the
  question a reader asks, not by the article that owes the answer.
- **30 s +.** The operation sections, one card per operation, each a labelled list of the units the
  law owes per operation; then what was collected before this page existed; then the rights; then who
  the controller is and how to reach them.

**Nothing decorative sits above the answer, and nothing at all sits between the reader and it.** No
ad slot is placed on this route in any state (`PRODUCT.md` §8), no illustration, no icon tile, no
collapsed panel.

---

## 2. Layout

### 2.1 The measured frame

Read off the built prototype. Both themes identical at every cell.

| Width | Root size | Gutter | Column border-box | Card inner text width | Header height | Card gap | Horizontal overflow |
|---|---|---|---|---|---|---|---|
| **390** | **16px** | `px-4` 16px | **358.00** | **308.00** (`p-6`) | **65.00** | 32 | `scrollWidth 390 = clientWidth 390` |
| **1440** | **16px** | `px-8` 32px | **594.88** | **528.88** (`p-8`) | **81.00** | 32 | `1440 = 1440` |
| **1920** | **17px** | `px-8` 34px | **632.05** | **562.05** | **86.00** | 34 | `1920 = 1920` |
| **2560** | **18px** | `px-8` 36px | **669.23** | **595.23** | **91.00** | 36 | `2560 = 2560` |
| **3840** | **18px** | `px-8` 36px | **669.23** | **595.23** | **91.00** | 36 | `3840 = 3840` |

**The root sizes were resolved in the browser at the band boundaries, not read off the stylesheet**
(lesson **028**). Probed at 390, 1440, **1919, 1920**, **2559, 2560, 2561** and 3840: the steps land
at **1920 → 17px** and **2560 → 18px**, so 2560 and 3840 are the **same band** and their rows above
are identical by measurement, not by assumption. The 1919/1920 and 2559/2560/2561 readings are in
the probe record; the table prints the four reference widths plus 1920 because 1920 is the only
band whose floor is not a reference width.

### 2.2 Structure

**One column at every width, from 390 to 3840.** This page never splits.

`DESIGN.md`'s two-column split is the calculator's: a form on the left and the answer on the right.
This page has no form and no answer — it is prose and labelled values. A second column would put two
legal statements side by side and make the reading order ambiguous exactly where the law requires
*clara e inequívoca*. Above 1920 the extra width becomes margin, which is what the Scale-Don't-Reflow
Rule already prescribes; below it, nothing reflows either, so there is no breakpoint on this route at
all. `components/templates/calculator-layout.tsx` is therefore **not** reused here, and that is a
decision rather than an omission.

**What never moves:** the order of the sections. The summary is always first, the index always
second, the rights section always before the controller section, and each operation's disclosure is
always inside or immediately under the cell it qualifies. There is no width at which a disclosure
changes neighbours.

**What reflows:** only the card padding, `p-6` → `p-8` at `sm` (640px), which is the shipped card
rule. Nothing collapses, nothing is revealed, nothing is hidden at any width.

### 2.3 The prose measure, and why the column is not `max-w-3xl`

`DESIGN.md` caps `--text-body` at **68ch**. Four column candidates were built and measured with a
600-character pt-BR corpus:

| Column | Text width @1440 | `--text-body` cpl | `--text-body-sm` cpl | Verdict |
|---|---|---|---|---|
| `max-w-3xl` (the footer's) | 702.00 | **75.0** | 85.7 | **Over the 68ch cap.** Rejected. |
| `max-w-2xl` | 606.00 | 66.7 | — | Under cap. |
| **`max-w-prose`** | **528.88** | **60.0** | **66.7** | **Chosen.** |

`max-w-prose` is a stock Tailwind container-scale key (65ch), not an arbitrary value and not a new
token, and it resolved correctly in the build — measured 594.88 at 1440 against `max-w-3xl`'s 768.00,
so it is not a silently-dropped class. It also **scales with the root** (594.88 → 632.05 → 669.23),
which a `ch`-based cap must.

**One standing dependency, recorded because it is invisible in the file that would break it.**
`DESIGN.md`'s Numeric Scale Rule exists because a `--spacing-3xl` key silently redefined `max-w-3xl`
and shipped a legally required disclosure 64px wide. `max-w-prose` is shadowable by exactly the same
mechanism — a `--spacing-prose` key. The namespace is empty and a unit test over `app/globals.css`
asserts it holds no non-numeric suffix, so the guard already covers this; it is named here so that
whoever reads the guard knows a second surface now depends on it.

### 2.4 Vertical rhythm

Every gap is one of the eight sanctioned steps, and each was measured rather than assumed:

| Relationship | Utility | Measured @390 | @1440 | @2560 |
|---|---|---|---|---|
| Section card → section card | `space-y-8` | **32.00** | **32.00** | **36.00** |
| Section heading → its `<dl>` | `mt-6` | **24.00** | **24.00** | **27.00** |
| Unit row → next unit row | `space-y-6` | **24.00** | **24.00** | **27.00** |
| Unit label → its value | `space-y-2` | **8.00** | **8.00** | **9.00** |
| Last value → the card's closing disclosure | `mt-2` | **8.00** | **8.00** | **9.00** |
| Index row → index row | `space-y-2` | **8.00** | **8.00** | **9.00** |

The last two rows are the ones `legal.md` §20.2 rules on. See § 5.

---

## 3. Component tree

Atomic level is binding (`AGENTS.md` §8). **Existing components are named by their real path.**
New components are marked `new`; their **file names and the route's URL are `tech-lead`'s at G4** —
`spec.md` § Scope reserves them — so the names below are proposals, and the atomic level is the part
this gate fixes.

| # | Element | Level | Status | Path |
|---|---|---|---|---|
| C1 | Document page shell — skip link, `<main>`, header, prose column | template | **new** (proposed `document-page.tsx`) | `components/templates/` |
| C2 | App header | organism | **reuse, unchanged** | `components/organisms/app-header.tsx` |
| C3 | Policy page body | organism | **new** (proposed `privacy-policy.tsx`) | `components/organisms/` |
| C4 | Policy section card — heading + `<dl>` + closing disclosure | molecule | **new** (proposed `policy-section.tsx`) | `components/molecules/` |
| C5 | Unit row — `<dt>` overline label + `<dd>` value | molecule | **new** (proposed `definition-row.tsx`) | `components/molecules/` |
| C6 | In-page index | molecule | **new** (proposed `page-index.tsx`) | `components/molecules/` |
| C7 | Row link — a standalone 44px-tall link | atom | **new** (proposed `text-link.tsx`) | `components/atoms/` |
| C8 | Consent surface | organism | **extend** | `components/organisms/cookie-consent.tsx` |
| C9 | Modal dialog | atom | **reuse, unchanged** | `components/atoms/modal-dialog.tsx` |
| C10 | Buttons on the consent surface | atom | **reuse, unchanged** | `components/atoms/button.tsx` |
| C11 | Standing footer — gains the policy link and the D2 replacement | organism | **extend** | `components/organisms/calculator-views.tsx` |

**C1 is new rather than a reuse of `components/templates/calculator-page.tsx`**, and the reason is
substantive: `calculator-page.tsx` takes a `CalculatorView` and injects
`buildStructuredData(view)` — calculator structured data — into every page it renders. A privacy
policy emitting `SoftwareApplication` markup is a false statement to a crawler on the one page in the
product whose whole purpose is not making false statements. C1 reuses `app-header.tsx` and the same
skip-link markup, and emits no structured data.

**C2 is reused unchanged and carries the page's `h1`.** `app-header.tsx:35-38` renders one `h1` whose
**accessible name is the `heading` prop** (`WorkLoad` is `aria-hidden`, the prop is the `sr-only`
span). Passing the policy page's name as `heading` gives the document exactly one `h1`, correctly
named, with no change to a shared component. The page's visible title is therefore an `h2` at
`--text-title`, and each section card's heading is an `h3` at `--text-heading`.

**Deliberately not used, each with its reason:**

- `components/atoms/collapsible-panel.tsx` — **forbidden on this route.** `legal.md` §22 defines
  *Rendered* to exclude anything behind `aria-expanded="false"`, so no unit and no disclosure may sit
  in a collapse. This also means the page does not inherit `DESIGN.md`'s known residual (the
  `height: 0 → auto` animation that no reduced-motion mechanism reaches), and that avoidance is
  deliberate rather than lucky.
- `components/atoms/alert-banner.tsx` — **not used for the re-ask notice.** Its two tones are
  Overtime Amber and Debit Red, and the Colour-Means-a-Number Rule reserves both for quantities. A
  privacy notice in amber would be the first amber in the product that encodes nothing.
- `components/atoms/stat-box.tsx` — its overline-label-over-value pattern is the model for C5, but
  `StatBox` sets its value in `--text-metric numeric`, which is a step for figures. C5 borrows the
  pattern, not the component.
- `components/templates/calculator-layout.tsx` — see § 2.2.

---

## 4. Tokens

Every value below is a token name from `app/globals.css`. No hex, no arbitrary value, no `dark:`
twin on a colour utility.

### 4.1 The page

| Element | Colour (light / dark — same token, both themes) | Surface | Radius | Type step | Weight | Line-height | Elevation |
|---|---|---|---|---|---|---|---|
| Page background | `--color-ink` on `--color-canvas` | `--color-canvas` | — | — | — | — | none |
| Prose column | — | — | — | — | — | — | — |
| Page title (`h2`) | `--color-ink` | `--color-canvas` | — | `--text-title` | `--font-weight-semibold` (600, from the step) | 1.25 (from the step) | none |
| Section card | border `--color-line` | `--color-surface` | `--radius-xl` | — | — | — | `--shadow-card` (light) / `none` (dark, by token) |
| Section heading (`h3`) | `--color-ink` | `--color-surface` | — | `--text-heading` | 600 | 1.3 | — |
| Unit label (`dt`) | `--color-ink-muted` | `--color-surface` | — | `--text-overline`, uppercase | 600 | 1.25 | — |
| Unit value (`dd`) | `--color-ink` | `--color-surface` | — | `--text-body-sm` | 400 | 1.5 | — |
| Summary lead paragraph | `--color-ink` | `--color-surface` | — | `--text-body` | 400 | 1.55 | — |
| Summary second paragraph | `--color-ink-muted` | `--color-surface` | — | `--text-body-sm` | 400 | 1.5 | — |
| Last-changed line | `--color-ink-subtle` | `--color-surface` | — | `--text-caption` | 400 | 1.45 | — |
| Closing disclosure in a card | `--color-ink-subtle` | `--color-surface` | — | `--text-caption` | 400 | 1.45 | — |
| Index panel | border `--color-line` | `--color-surface-sunken` | `--radius-lg` | — | — | — | none |
| Index row link | `--color-accent-ink` | `--color-surface-sunken` | `--radius-sm` | `--text-label` | 500 | 1.25 | none |
| Row link elsewhere | `--color-accent-ink` | `--color-surface` | `--radius-sm` | `--text-label` | 500 | 1.25 | none |

Spacing: column `space-y-8`; card padding `p-6` below `sm`, `p-8` from `sm`; heading→list `mt-6`;
unit rows `space-y-6`; label→value `space-y-2`; closing disclosure `mt-2`; index panel `p-4`, rows
`space-y-2`. **Every one of these is one of the eight sanctioned steps** (0.5, 2, 3, 4, 6, 8, 12, 16)
and each was measured in § 2.4.

Radii nest concentrically per the Concentric Rule: card `--radius-xl` (28) → index panel
`--radius-lg` (20) → row link `--radius-sm` (12). Borders are 1px everywhere; `--color-line` for
structure, and no interactive element on this page carries a border at rest, so `--color-line-strong`
is not needed here.

### 4.2 The cobalt budget

`DESIGN.md`'s One Mark Rule: at most three cobalt elements per viewport, each actionable.

On the policy page, cobalt appears **only** on row links (`--color-accent-ink`) and on the focus ring
(`--color-focus`). At 390 the first viewport contains the page title and the summary card and **zero
links**; the index's six links enter the viewport together. Six cobalt links in one viewport would
breach the rule read literally — and the rule's own text says the test is *"if a fourth cobalt thing
appears, one of them was decoration."* A list of six navigation links is one element of one kind, not
six marks; the rule bounds competing *marks*, and a `<nav>` is one mark. **This is the one place this
design reads the rule by its stated purpose rather than its count, and it is recorded here so a
reviewer can reject it rather than discover it.** The alternative — neutral link text — would remove
the only affordance on the page that says *these are the things you can do*, and `--color-ink` links
with underlines alone would drop the one channel `DESIGN.md` reserves for action.

### 4.3 The consent surface (C8), changed cells only

| Element | Colour | Surface | Radius | Type step |
|---|---|---|---|---|
| Banner policy link | `--color-accent-ink` | `--color-surface-raised` | `--radius-sm` | `--text-label` |
| Banner re-ask line | `--color-ink-muted` | `--color-surface-raised` | — | `--text-body-sm` |
| Dialog policy link | `--color-accent-ink` | `--color-surface-raised` | `--radius-sm` | `--text-label` |
| Advertising row (container) | border `--color-line` | `--color-surface-sunken` | `--radius-lg` | — |
| Advertising row title | `--color-ink` | `--color-surface-sunken` | — | `--text-body`, `--font-weight-semibold` |
| Advertising row description | `--color-ink-subtle` | `--color-surface-sunken` | — | `--text-caption` |
| Advertising / telemetry switch track, **off** | `--color-line-strong` | `--color-surface-sunken` | `--radius-full` | — |
| Advertising / telemetry switch track, **on** | `--color-accent` | `--color-surface-sunken` | `--radius-full` | — |
| Switch knob | `--color-ink-onfill` | — | `--radius-full` | — |
| On-device row status text | `--color-ink-muted` | `--color-surface-sunken` | — | `--text-caption` |

Two changes to existing cells, both required by a legal ruling rather than by taste:

1. **The switch tracks open in the `--color-line-strong` (off) state.** `legal.md` §20.1 rules the
   compliant opening state of every non-essential category is `false`. Measured in the prototype:
   both switches report `aria-checked="false"` on first paint, against the shipped baseline's
   `aria-checked="true"`.
2. **The decorative pseudo-switch at `components/organisms/cookie-consent.tsx:115-117` is removed.**
   It is `aria-hidden`, so it exists only as a picture — and the picture it paints is a consent
   control locked in the accepted position, next to a claim `legal.md` **F7** rules false. Lesson
   **048** is explicit that a presence rule must be stated in every quantity its substance can be
   breached in; an assertion made in pixels is still an assertion, and removing the false sentence
   while leaving the false picture would fix the axis the defect was written in and no other. Its
   replacement is the status text row above, in `--color-ink-muted` rather than `--color-accent-ink`,
   because nothing about that row is actionable. **This changes the row's horizontal content and its
   height budget is `0010`'s** — routed in § 9.

---

## 5. Disclosure placement

`legal.md` §22 states eight disclosures with rendering conditions, and §20.2 states the adjacency
condition in `getBoundingClientRect()` border-box terms. Every row below names where the disclosure
sits and **which clause of §20.2 it satisfies**, with the measured number.

### 5.1 The adjacency rule, and the clause this design prefers

§20.2: a qualifier is adjacent when **(a)** it is inside the same border box as the claim — the same
`<p>` — **or (b)** its border-box `top` minus the claim's border-box `bottom` is `<= 8` CSS px at
both 390 and 1440, with no element carrying a different claim between them in DOM order.

**This design uses clause (a) wherever the qualifier belongs to one cell, and clause (b) only where
the qualifier belongs to a whole section.** The reason is measured: `space-y-2` and `mt-2` are
`rem`-derived, so they render **8.00 px at 390 and 1440** — inside clause (b) — but **8.50 px at
1920** and **9.00 px at 2560 and 3840**. §20.2 bounds its test at 390 and 1440, so clause (b) is
satisfied as written; but a rule whose substance is *adjacency* and whose instrument is *CSS px*
stops being satisfiable by the same construction above 1920, and a later reviewer measuring at 2560
would read a failure. **Clause (a) is scale-invariant and clause (b) is not.** So:

> **Design rule for this route: a disclosure that qualifies one unit's value is written inside that
> unit's own `<dd>`. Only a disclosure that qualifies an entire section is written as the section's
> closing `<p>` at `mt-2`.**

This is handed to `tech-lead` and to `qa-engineer` as the reason the guard should read clause (a)
membership where it can, rather than re-measuring an 8px gap at a width where the gap is 9.

### 5.2 Placement table

| # | Disclosure | Surface | Position | §20.2 clause | Measured |
|---|---|---|---|---|---|
| **D1** | The specific purpose of the on-device storage | **consent surface**, banner | In the banner's body text block, rendered before any of *Aceitar Tudo*, *Recusar*, *Salvar Preferências* is reachable | (a) — same text block as the purpose claim | Banner box present and fully on screen at 390×844 (`top 354`, `bottom 820`) and 390×667 (`top 177`, `bottom 643`), `onScreen: true` at both |
| **D2** | The calculation runs in the browser; what the reader types reaches no one | **standing footer**, both routes, **and** the policy page's summary lead paragraph | Footer paragraph 1 (the replacement for the retired sentence), and the first paragraph of the summary card | (a) | Footer `<p>` stack measured: 4 paragraphs, border-box widths **358.00 @390** and **768.00 @1440**, vertical gaps **8.00 px** — reproduces `legal.md` §20.2's calibration exactly |
| **D3** | What actually leaves the device, where the user is asked to allow it | **consent surface**, banner **and** dialog | A row link to the policy page, rendered on the banner; and a row link **immediately under the dialog title, above the category rows** | (b) for the banner line; the link discharges D3's "or reachable by a link that is itself rendered there" | Banner links **0 → 1**; dialog links **0 → 1**. Dialog link `linkVisibleWithoutScroll: true` at 390×844, 390×667 **and** 1440×844 |
| **D4** | The art. 8º § 2º proof is weaker than a server-side log | **policy page**, consent-record section | The section's **closing `<p>`** at `mt-2` | (b) | `8.00 px` @390, `8.00 px` @1440 |
| **D5** | H1 or H2 not supplied | **not a rendering condition** — a shipping condition | See § 8 | — | — |
| **D6** | What was collected under the null consents, and what the controller cannot undo | **policy page**, its own section; **and** the consent surface on the re-ask | A full section between the operation sections and the rights section; plus one paragraph in the banner's body block in the re-ask state only | (a) within the banner block | Re-ask banner measured: **585.00 px** @390 vs **518.00 px** without the line |
| **D7** | The host, which no consent can decline | **policy page**, the host section **and** inside the art. 18 VIII value | The host section is one of the operation cards; the same fact is restated **inside the `<dd>`** of the rights row about the consequences of refusing | (a) in both places | — |
| **D8** | The international character of the transfer | **policy page**, inside **each** of the three sharing cells | Written **inside the `<dd>`** of the *com quem* unit of each of the three sections that share, never collected into one distant paragraph | (a), three times | — |

**D8 is the row most likely to be quietly broken at build time**, because writing it once in a
trailing paragraph is cheaper than writing it three times inside three cells, and the result renders
almost identically at 1440. It does not render identically at 390, where the sections are 945 px apart.
`legal.md` §22 D8 is explicit that art. 9º II and V are per-operation units. **A build that collects
D8 into one paragraph is a rejection at G6, not a style difference.**

---

## 6. The ten units, and where each one lives

`legal.md` §6.9 fixes **U1–U10** as the enumerated count for AC2, with `measured + exempt = 10` and
every exemption named. This is the map `tech-lead`'s guard needs.

| Unit | Scope | Section it lives in | Exemptible? |
|---|---|---|---|
| **U1** *finalidade específica* | per operation | The *para que* row of each operation card | No |
| **U2** *forma e duração* | per operation | The *como* and *por quanto tempo* rows of each operation card | No |
| **U3** *identificação do controlador* | page | Controller section | No — **H1** |
| **U4** *contato do controlador* | page | Controller section | **Only by not shipping at all** (§22 D5) — **H2** |
| **U5** *uso compartilhado* | per operation that shares | The *com quem* row; carries **D8** inside its own `<dd>` | No |
| **U6** *responsabilidades dos agentes* | per agent | The *quem responde* row of each operation card | No |
| **U7** *direitos do titular* | page | Rights section — nine incisos, the four further units, the 15-day deadline | No |
| **U8** the true claim | page | Summary card, lead paragraph — **this is D2's page restatement** | No |
| **U9** how to refuse and change one's mind | page | Its own section, naming the standing control | No |
| **U10** the date this page last changed | page | Summary card, closing line | No |

**The guard's addressability contract.** Each of the ten must be **individually addressable by a
stable marker on its own element**, so the guard can assert `10` *before* iterating and count
exemptions (`AGENTS.md` §5). The marker's name and mechanism are `tech-lead`'s; the requirement — one
marker per unit, on the unit's own element, not on its parent card — is this gate's, because a marker
on the card cannot tell U1 from U2 when both are rows of the same card.

**Operations, and the one that may be exempt.** `legal.md` §6.1 returns five operations (T1, T2, T3,
T4, T5), so the page carries **five operation sections**. If `tech-lead` picks §8.4's second compliant
shape — deleting the AdSense injection path entirely — then T4 does not exist and the page carries
**four**, with the exemption named. That is the only operation that may ever drop, and it drops by not
shipping, never by not being described.

---

## 7. States

`DESIGN.md` requires six states of every interactive component; this gate specifies eight, adding
*loading* and *empty* because the contract asks for them. Where a state cannot occur it is stated as
such rather than left undefined.

### 7.1 Row link (C7) — the index rows, the banner link, the dialog link, the footer link

| State | Specification |
|---|---|
| **rest** | `--color-accent-ink`, underline at `underline-offset-2`, no background, no border. Box **44.00 × ≥44.00 px measured** at 390 via `min-h-11`. |
| **hover** | Background `--color-surface-sunken` on a `--color-surface` parent; on the index panel (already sunken) the text goes `--color-ink` and the underline thickens by no token — the background does not change, because a sunken hover on a sunken plane would invert the Recession Rule. Transition `--duration-fast` `--ease-standard` on `color, background-color`. |
| **focus-visible** | `outline: 2px solid var(--color-focus); outline-offset: 2px` — the `ring-focus` utility already declared in `app/globals.css`. **Specified explicitly, never inherited.** Measured contrast in § 10. |
| **active** | `scale(0.97)` over `--duration-instant` with `--ease-out`, fired on pointer-down, paired with `motion-reduce:active:scale-100`. |
| **disabled** | **Not applicable** — no link on this page is ever disabled. A route that exists is always reachable; a route that does not exist is not rendered as a dead link. |
| **loading** | **Not applicable** — the policy page is server-rendered and static; there is no client fetch on this route. |
| **error** | **Not applicable** to a link. |
| **empty** | **Not applicable** — an index row with no target is not rendered at all. If a section is exempt (T4 under §8.4 shape 2), its index row is absent, not present-and-dead, and the index's row count is asserted against the section count rather than against a literal 6. |

### 7.2 Consent switch (C8) — telemetry and advertising rows

| State | Specification |
|---|---|
| **rest** | `aria-checked="false"`. Track `--color-line-strong`, knob `--color-ink-onfill` at the left. Hit area **44.00 × 44.00 px measured** in the prototype for both switches. |
| **rest, accepted** | `aria-checked="true"`. Track `--color-accent`, knob at `x: 20`. |
| **hover** | Track colour unchanged; the row's background is unchanged. A switch that lights up under a pointer invites a press the user did not intend, and this is the one control in the product where an unintended press writes a legal record. |
| **focus-visible** | `ring-focus` on the 44×44 button, not on the 24px track. |
| **active** | Track colour transitions over `--duration-fast` `--ease-standard`; the knob translates (see § 8). No `scale(0.97)` — the knob's travel is the feedback. |
| **disabled** | **Not applicable.** After F7 there is no always-on category and therefore no disabled switch anywhere on the surface. |
| **loading** | **Not applicable** — the write is synchronous to `localStorage`. |
| **error** | **Not applicable** — a boolean cannot be invalid. |
| **empty** | **Not applicable.** |

### 7.3 Consent surface — the four surface states

| State | What renders | Measured |
|---|---|---|
| **no record stored (first ask)** | Banner, with the policy row link | **518.00 px** @390 (from **466.00** today), **215.00 px** @1440 (from **163.00**) |
| **stale or absent version (re-ask, §7.5)** | Banner, with the policy row link **and** the D6 re-ask line | **585.00 px** @390, **261.00 px** @1440 |
| **record current** | Banner absent; standing control renders | Standing control unchanged — `legal.md` §10.2 R1 measured `{x:330, y:784, w:44, h:44}` |
| **settings dialog open** (from the banner **or** the standing control) | Dialog with the policy link above the rows, two switches, the on-device row | **775.95 px** @390×844 (from **518.38**), **598.56 px** @1440 |

**AC3 is satisfied by three rendered links across three states, from two `href`s in source**, and
this gate records the discrepancy rather than leaving it to be found: the banner carries one `href`,
the dialog carries one, and the dialog is reachable from both the banner's *Configurar* and the
standing control — so `grep -rno 'href="[^"]*"' components/organisms/cookie-consent.tsx` returns
**2**, while the test AC3 actually specifies ("renders each of the three states and asserts 3 links
found against an expected 3") returns **3**. The grep is `spec.md`'s known-good column; the rendered
count is its test form, and **the test form is the one that binds**, because `legal.md` §22's
*Rendered* is never satisfied by presence in the DOM alone, let alone by presence in source.

### 7.4 The live-updating state

**There is none on the policy page.** No value on this route changes as the user types; there is no
input on it. `DESIGN.md`'s live-region rule therefore does not attach to anything here, and no
`aria-live` is added — an empty live region is a defect, not a precaution.

The one value that changes on the consent surface is the switch, and `role="switch"` +
`aria-checked` already announces it. No live region is added there either.

---

## 8. Motion

| Element | Trigger | Property | Duration | Easing / spring | Delay | Reduced-motion path |
|---|---|---|---|---|---|---|
| Policy page, on load | — | **none** | — | — | — | Nothing to reduce. A document does not animate in. |
| Row link | hover | `color`, `background-color` | `--duration-fast` (160ms) | `--ease-standard` | 0 | Kept. The scoped reset in `app/globals.css` clamps `transition-property` to colour/opacity and shortens to `--duration-fast`, so this survives by design — a colour change explains that something responded. |
| Row link | pointer-down | `transform: scale(0.97)` | `--duration-instant` (100ms) | `--ease-out` | 0 | **`motion-reduce:active:scale-100`** — the neutralizer bound to the same state, because a bare `motion-reduce:transform-none` is `0-1-0` and loses to `active:scale-[0.97]` at `0-2-0` (`AGENTS.md` §8). This is the pattern `components/atoms/button.tsx:9` already ships. |
| Any focusable element | focus-visible | `outline-color` | `--duration-fast` | `--ease-standard` | 0 | Kept — `outline-color` is in the scoped reset's allow-list. |
| Consent banner | mount / unmount | `y: 100 → 0`, `opacity: 0 → 1`; exit to `y: 100` | spring | The system default spring `{ type: "spring", bounce: 0, duration: 0.35 }`, supplied by `MotionConfig` in `components/templates/theme-provider.tsx:10` | `1500ms` (`BANNER_DELAY_MS`) | `MotionConfig reducedMotion="user"` disables the transform leg; the opacity cross-fade remains. **Verified present in the tree**, not assumed: `grep -rn "MotionConfig" app components hooks lib` returns `components/templates/theme-provider.tsx:3,10,12`. |
| Consent banner | — | — | — | — | — | **Enters from the bottom and exits to the bottom** — the Same-Path Rule, unchanged. |
| Switch knob | toggle | `transform: translateX(0 → 20)` | spring (system default) | as above | 0 | `reducedMotion="user"` disables the transform animation; the knob jumps to its position. The track's `background-color` transition at `--duration-fast` `--ease-standard` is kept and is what carries the state change. |
| Settings dialog | open / close | `opacity`, and `transform: scale(0.96) translateY(0.75rem) → none` | `--duration-slow` (320ms) | `--ease-out` | 0 | The scoped reset clamps `transition-property` to opacity and friends, reducing it to a plain fade. **No JS runs this** — it is `@starting-style` + `allow-discrete` in `app/globals.css`, unchanged. |

**Nothing else on this route animates.** In particular: no scroll-behavior is added for the index's
in-page links. The base stylesheet declares none, so an anchor jump is instantaneous — which is both
the correct answer for a reader hunting a section and the one that needs no reduced-motion path.

**No `motion` value animation on a non-transform property is introduced anywhere by this design.**
`DESIGN.md`'s known residual — the `height: 0 → auto` sweep in
`components/atoms/collapsible-panel.tsx:18-20` that neither `MotionConfig` nor the CSS reset reaches
— is a gap this route deliberately does not enter, because § 3 forbids the collapsible outright. The
residual's trigger ("the next spec that opens `collapsible-panel.tsx`, or that adds any
Motion-driven animation on a non-transform property") **does not fire here**, and it remains open
with its recorded owner.

---

## 9. Measurements — and the three places a measurement overruled the draft

`AGENTS.md` §5: *when a measured value contradicts a modelled one, the model is wrong until a probe
says otherwise.* Three did.

### M1 — The dialog's policy link is unreachable below the rows at 390×667

The draft put the policy link near the *Salvar Preferências* button, which is where a link is
conventionally placed. Measured, with the advertising row added:

| Variant | Viewport | Dialog `scrollHeight` / `clientHeight` | Scrolls? | `linkVisibleWithoutScroll` |
|---|---|---|---|---|
| Link below the rows | 390×844 | 774 / 774 | no | **true** |
| Link below the rows | **390×667** | **774 / 633** | **yes** | **false** |
| Link below the rows | 1440×844 | 597 / 597 | no | true |
| **Link under the title** | 390×844 | 774 / 774 | no | **true** |
| **Link under the title** | **390×667** | **774 / 633** | **yes** | **true** |
| **Link under the title** | 1440×844 | 597 / 597 | no | **true** |

`components/atoms/modal-dialog.tsx:53` declares `overflow-y-auto` on the dialog's inner panel.
`legal.md` §22's *Rendered* excludes anything clipped by an ancestor whose computed `overflow` is
other than `visible`. At a 667px-tall viewport — an iPhone SE, which is not an edge case among CLT
workers — the link placed below the rows is inside that clip. **Placing it under the title is not a
preference; it is the only placement measured to satisfy D3 at every viewport tested.**

### M2 — The consent banner occludes the policy page it links to

The draft left the consent surface mounted globally, as it is today. Measured on the policy
prototype with the **current, unmodified** banner (466 px — the modified one is 518 or 585):

| Viewport | Banner box | % of viewport covered | Policy-page content occluded |
|---|---|---|---|
| 390×844 | `top 354`, `bottom 820` | **55.2 %** | **434.00 px** |
| **390×667** | `top 177`, `bottom 643` | **69.9 %** | **453.17 px** |
| 1440×844 | `top 657`, `bottom 820` | 19.3 % | 163.00 px |

A reader who taps *read the policy* from the banner arrives at a page with **70 % of the viewport
covered by the banner they were trying to read past**, and it gets worse once the banner grows by the
link that sent them. Lesson **048**'s *space* axis: a disclosure painted over is not rendered,
whatever the DOM says.

> **Design rule: the consent surface renders its banner on every route except the policy route. On
> the policy route it renders only the standing control and the settings dialog.**

This is a **presence** rule, not a geometry change — the banner's box, padding and anchoring are
untouched, so `0010`'s ownership of its geometry is intact and `spec.md` Non-goal 6 is not breached.
It also improves the legal position rather than weakening it: the page *is* the *apresentação
prévia*, the standing control still gives the reader a one-press route to the decision from that
page, and a reader who never returns has consented to nothing, which is the safe default.

### M3 — `max-w-3xl` renders body prose at 75 cpl, over the 68ch cap

See § 2.3. Four candidates measured; `max-w-prose` chosen at **60.0 cpl**.

### M4 — Two defects in this gate's own first draft, found by measuring it

Recorded because a design gate that only reports its successes is not measuring.

- The index rows were drafted with no gap. Measured: **row gap 0 px**, against `DESIGN.md`'s
  Accessibility floor of *at least 8px between adjacent targets*. Corrected to `space-y-2`, measured
  **8.00 px** at 390 and 1440.
- The index was drafted at **ten rows**, one per unit, measuring **546.00 px** at 390 — 546 px of
  navigation between the summary and the first substantive sentence, on a 667 px phone. Regrouped to
  **six rows by the question a reader asks** rather than by the article that owes the answer:
  measured **338.00 px**. The unit count on the page is unchanged at ten; only the index is grouped.

### M5 — The cost of the policy link, and a correction to `0010`'s budget

`spec.md` § Out of scope 3 records that `0010` `legal.md` §4.4 prices the banner link at **+28 px**.
Measured here, as a 44px row link with its stack gap:

| Banner state | Height @390 | Δ vs today | Height @1440 | Δ |
|---|---|---|---|---|
| Today (shipped baseline) | **466.00** | — | **163.00** | — |
| With the policy link | **518.00** | **+52.00** | **215.00** | **+52.00** |
| With the link **and** the D6 re-ask line | **585.00** | **+119.00** | **261.00** | **+98.00** |

**`0010`'s +28 px is low by 24 px**, because a link that satisfies the Forty-Four Rule is a 44px row
plus an 8px stack gap, not a line of text. The +67 px re-ask line renders **only in the re-ask
state**. Both numbers are routed to `0010` through `tech-lead` in § 12 — this gate does not amend
another spec's budget.

### M6 — The dialog's cost

| Dialog state | Height @390×844 | Δ | Height @1440 | Δ |
|---|---|---|---|---|
| Today (one category, one switch, zero links) | **518.38** | — | **418.38** | — |
| With the policy link and the advertising category | **775.95** | **+257.57** | **598.56** | **+180.18** |

At 390×844 the result fits without scrolling (`top 34.02`, `bottom 809.97`,
`scrollHeight 774 = clientHeight 774`). At **390×667 it scrolls** — which M1 already accounts for by
placing the link above the fold of the scroll container. The switches and the save button below it
are *controls*, and a control reached by scrolling is operable; a *disclosure* reached by scrolling is
not rendered. That distinction is the whole of M1.

---

## 10. Accessibility

### 10.1 Contrast — every text-on-surface pair, both themes

Computed by the method validated in § 0 against `DESIGN.md`'s published values. Floor **4.5:1** for
text, **3:1** for focus rings and control boundaries (WCAG 2.2 AA).

| Pair | Light | Dark | Floor | Where |
|---|---|---|---|---|
| `--color-ink` on `--color-surface` | **15.77** | **15.54** | 4.5 | Unit values, section headings, summary lead |
| `--color-ink` on `--color-canvas` | **15.10** | **17.02** | 4.5 | Page title |
| `--color-ink` on `--color-surface-raised` | **15.77** | **13.87** | 4.5 | Dialog and banner text |
| `--color-ink` on `--color-surface-sunken` | **14.31** | **16.34** | 4.5 | Consent row titles |
| `--color-ink-muted` on `--color-surface` | **5.87** | **7.49** | 4.5 | Unit labels (overline), summary second paragraph |
| `--color-ink-muted` on `--color-surface-raised` | **5.87** | **6.68** | 4.5 | Banner re-ask line |
| `--color-ink-muted` on `--color-surface-sunken` | **5.33** | **7.87** | 4.5 | On-device row status text |
| `--color-ink-muted` on `--color-canvas` | **5.62** | **8.20** | 4.5 | — |
| `--color-ink-subtle` on `--color-surface` | **5.06** | **5.25** | 4.5 | Closing disclosures, last-changed line |
| `--color-ink-subtle` on `--color-surface-sunken` | **4.59** | **5.51** | 4.5 | Consent row descriptions |
| `--color-ink-subtle` on `--color-surface-raised` | **5.06** | **4.68** | 4.5 | — |
| `--color-accent-ink` on `--color-surface` | **6.47** | **8.43** | 4.5 | Row links in a card |
| `--color-accent-ink` on `--color-surface-sunken` | **5.87** | **8.86** | 4.5 | **Index row links** |
| `--color-accent-ink` on `--color-surface-raised` | **6.47** | **7.52** | 4.5 | Banner and dialog links |
| `--color-focus` on `--color-surface` | **5.58** | **8.43** | 3 | Focus ring |
| `--color-focus` on `--color-surface-sunken` | **5.06** | **8.86** | 3 | Focus ring on the index |
| `--color-focus` on `--color-surface-raised` | **5.58** | **7.52** | 3 | Focus ring on the consent surface |
| `--color-line-strong` on `--color-surface-sunken` | **3.06** | **3.64** | 3 | Switch track, off state |

**Every pair clears its floor in both themes.** The two thinnest are `--color-ink-subtle` on
`--color-surface-sunken` in light (**4.59**) and `--color-line-strong` on `--color-surface-sunken` in
light (**3.06**); both are pre-existing token pairs the product already ships, and neither is
introduced here.

### 10.2 Semantics

| Element | Role |
|---|---|
| Page shell | `<main>`, with the existing skip link targeting it |
| Page name | the `h1` in `components/organisms/app-header.tsx`, named by the `heading` prop |
| Visible page title | `h2` |
| Operation / rights / controller sections | `<section>` with an `h3` |
| Unit rows | `<dl>` / `<dt>` / `<dd>` — a label-to-value relationship the law states as a label-to-value relationship |
| Index | `<nav>` with an accessible name, containing a `<ul>` of links |
| Consent categories | `role="switch"` with `aria-checked` and `aria-labelledby`, unchanged |
| Every icon | `aria-hidden="true"`, name from adjacent text — unchanged |

**Exactly one `h1` per document**, supplied by the header. Heading levels descend without skipping:
h1 (header) → h2 (page title) → h3 (sections). No `h4` is needed; a unit label is a `<dt>`, not a
heading, because it labels a value rather than opening a region.

### 10.3 Tab order

DOM order, with no `tabindex` above 0 anywhere. On the policy route:

skip link → header theme toggle → page title *(not focusable)* → summary card links, if any → the six
index links, in order → each section's inline links in reading order → the standing consent control
(fixed, bottom-right, last in DOM as it is today).

The standing control being last in DOM and last in tab order is the shipped behaviour and is correct
here: it is the action, and the page is the information that should precede it.

### 10.4 Targets

Measured, not asserted: every row link is **44.00 px** tall at 390 (`min-h-11`), both switches are
**44.00 × 44.00 px**, and adjacent index targets are separated by **8.00 px** — the `DESIGN.md` floor
exactly, measured at 390 and 1440.

**One standing breach recorded rather than fixed.** `components/organisms/calculator-views.tsx:92-99`
renders the Portaria citation as a bare inline `<a>` inside a `--text-caption` paragraph, so its hit
area is the ~17.4 px line box — below the Forty-Four Rule's floor, which explicitly includes
*"the ones that look like text links"*. It is out of this spec's scope (§ Out of scope 2 gives
citation disclosures to `0003`), every link **this** design adds is a 44px row link, and the debt is
routed in § 12 with an owner and a trigger rather than silently inherited.

### 10.5 Zoom and reflow

The column is `ch`- and `rem`-derived end to end, so 200 % zoom and a 320 px CSS width scale the
layout with the text. No horizontal overflow was measured at 390, 1440, 1920, 2560 or 3840, in either
theme: `scrollWidth == clientWidth` at all ten cells.

---

## 11. Copy slots

**Slots only. Every pt-BR string is `content-writer`'s, and not one is written here.**

Each budget is a **measured capacity figure**, produced by rendering a pt-BR corpus in that exact box
in the built prototype, and it states what it measures (lesson **052**): *characters per rendered
line box at 390*, times the number of line boxes the slot may occupy before it changes the layout.
**A budget is a window, not a verdict** — the verdict is rendering the delivered string, which is
`qa-engineer`'s at G6 and cannot be reached until H1, H2, H7 and H8 arrive.

The corpus is one pt-BR sentence with the language's real accent and word-length distribution,
repeated and sliced to length:

> `A jornada diária registrada neste aparelho permanece no navegador que você está usando agora, e
> nenhuma pessoa além de você consegue abrir esses números sem pegar o seu telefone na sua própria mão.`

| Slot | Role | Type step | cpl @390 (measured) | cpl @1440 | Budget at 390 | What the budget protects |
|---|---|---|---|---|---|---|
| Page title | the document's name | `--text-title` | **20.0** | 40.0 | **≤ 40 chars** = 2 line boxes | A third line pushes the summary card below the fold |
| Summary lead | U8 / D2 — the true claim | `--text-body` | **33.3** | 60.0 | **≤ 300 chars** = 9 line boxes | The second paragraph must start inside the first viewport |
| Summary second | what leaves, naming the recipients | `--text-body-sm` | **37.5** | 60.0 | **≤ 300 chars** = 8 line boxes | — |
| Last-changed line | U10 | `--text-caption` | **30.0** *(60 chars / 2 lines)* | 60.0 | **≤ 60 chars** = 2 line boxes | Keeps the date on one line at 1440 |
| Index row label | one of the six reader questions | `--text-label` | **24.0** | 48.0 | **≤ 48 chars** = 2 line boxes inside the **44.00 px** row | Measured: at 48 chars the row still renders at exactly 44.00 px; a third line box breaks the 8px inter-target gap |
| Section heading | the operation's name | `--text-heading` | **22.0** | 44.0 | **≤ 44 chars** = 2 line boxes | A third line at 390 costs 23.4 px in every one of five cards |
| Unit label (`dt`) | *para que*, *como*, *por quanto tempo*, *com quem*, *quem responde* | `--text-overline` | **8.0** *(one line, short term)* | — | **≤ 24 chars** = 1 line box | An overline that wraps reads as two labels |
| Unit value (`dd`) | the unit's content, incl. an inline disclosure | `--text-body-sm` | **40.0** | 66.7 | **no ceiling** — 200 chars renders 5 line boxes at 390 | This is the slot the law fills; it may not be truncated for layout. `AGENTS.md` §4 rule 8: a disclosure is never dropped because the layout has no room |
| Section closing disclosure | D4 | `--text-caption` | **40.0** | 66.7 | **no ceiling** | Same reason |
| Banner policy link | the route to this page | `--text-label` | — | — | **≤ 48 chars**; measured at **39 chars → 251.02 × 44.00 px** | Above ~48 the link wraps to a second line and the banner grows again |
| Banner re-ask line | D6 on the re-ask | `--text-body-sm` | 37.5 | — | **≤ 110 chars** = 3 line boxes; measured at 3 lines the banner is **585.00 px** @390 | Each further line box costs 21 px of `0010`'s occlusion budget |
| Dialog link | the route to this page | `--text-label` | — | — | **≤ 48 chars** | Same as the banner link |
| Advertising row title / description | the new category | `--text-body` / `--text-caption` | — | — | title **≤ 40 chars**, description **≤ 80 chars** | Matches the telemetry row's existing shape, so the two rows read as siblings |
| On-device row title / description | F7's replacement | `--text-body` / `--text-caption` | — | — | title **≤ 40 chars**, description **≤ 160 chars** | §20.2 entry 3 requires four assertions in this cell (what is kept, where, that it goes nowhere, that the basis is convenience and the art. 18 § 2º route) — the budget is wider than the telemetry row's on purpose |
| Footer D2 replacement | the retired sentence's replacement | `--text-caption` | 40.0 *(measured on the existing footer: 358.00 px box @390)* | 100.0 *(768.00 px box @1440)* | **no ceiling** | The footer is a standing disclosure stack; `0008` and `0003` own what else is in it |
| Footer policy link | AC4's route | `--text-label` | — | — | **≤ 48 chars** | Rendered as a 44px row link below the existing four paragraphs |

**Two budgets are deliberately absent.** The controller's name (U3) and the contact channel (U4)
have **no character budget**, because the value is the human's and a budget would be an invitation to
shorten it. They are single-line `--text-body-sm` values in the controller section and the column is
`max-w-prose`; if a supplied value wraps, it wraps.

---

## 12. Routed to `tech-lead` — not decided here

Each item is outside this gate's authority, has an owner, and carries a trigger rather than a date.

| # | Item | Owner | Trigger |
|---|---|---|---|
| R1 | **`0010`'s banner link budget is low by 24 px.** Measured `+52.00 px` @390 and @1440 for the link; `0010` `legal.md` §4.4 records `+28 px`. The re-ask line is a further `+67.00 px` @390, in the re-ask state only. | `0010`, via `tech-lead` | The task that lands the banner link in `components/organisms/cookie-consent.tsx` |
| R2 | **The dialog grows `+257.57 px` @390 and scrolls at 390×667.** Its geometry is `0010`'s; M1 fixes only the link's position within it. | `0010`, via `tech-lead` | The task that adds the advertising row |
| R3 | **The decorative pseudo-switch at `components/organisms/cookie-consent.tsx:115-117` must go** (F7's picture, not only its sentence). Its removal changes the on-device row's horizontal content. | `0010` for the height, `tech-lead` for sequencing | The task that rewrites the on-device row |
| R4 | **The banner must not render on the policy route** (M2). A presence rule; the box is untouched. | `tech-lead` | The task that creates the policy route |
| R5 | **`components/organisms/app-header.tsx:16-24` fires `session_metadata` on mount, including on the policy page** — so the page explaining the telemetry is instrumented by it. Not a design defect and not in this gate's scope; it is `legal.md` **F5**, and it is named here because reusing the header is this design's decision. | `tech-lead`, under F5 | The task that fixes F5 |
| R6 | **`components/organisms/calculator-views.tsx:92-99` breaches the Forty-Four Rule** (§ 10.4). Pre-existing, owned by `0003`'s citation disclosures. | `0003`, via `tech-lead` | The next spec that opens the footer's citation link |
| R7 | **AC3's known-bad/known-good grep returns 2, its test form returns 3** (§ 7.3). The guard must be written on rendered links across three states. | `tech-lead` at G4, `qa-engineer` at G6 | Writing AC3's guard |
| R8 | **D8 must render three times, inside three cells** (§ 5.2). The cheap build collects it into one paragraph and looks right at 1440. | `qa-engineer` | The G6 disclosure check |

---

## 13. If H1 or H2 never arrive

`legal.md` §22 **D5** is a **shipping** condition, not a rendering one, and this gate does not design
around it.

> With no controller name and no monitored channel, art. 9º III/IV and art. 41 § 2º I cannot be
> discharged. **The page does not ship**, and the application ships with the analytics and
> advertising paths disabled — T3 and T4 do not run at all.

The surface delta, stated so `tech-lead` can plan it as a removal rather than as a second design:

- The policy route is **not created**.
- The consent surface **does not render** — banner, dialog and standing control all absent, because
  there is nothing left to consent to.
- `app/sitemap.ts` keeps its two URLs.
- **The footer's D2 replacement still ships.** `legal.md` §20.2 entry 5 and §22 D2 do not depend on a
  controller, and the retired sentence is *still false* with T3 and T4 off, because **T5 remains** —
  every request reaches the host with the IP before any consent exists (`legal.md` **F6**, **D7**).
  A build that treats "no analytics" as making *"Nada é enviado para nenhum servidor"* true again has
  reintroduced the defect in the state nobody is looking at.

---

## 14. System change

**None.**

Every value in this document is an existing token in `app/globals.css` or an existing Tailwind
container-scale key. No new colour, no new type step, no new spacing value, no new radius, no new
duration, no new easing curve is proposed, and `DESIGN.md` needs no amendment for this page to be
built.

Three decisions that looked like they would need one, and did not:

1. **The page title.** `DESIGN.md` licenses `--text-display` for *"modal titles only"*, and a 2rem
   page title would have been an amendment. It is set at `--text-title` instead, with section
   headings at `--text-heading`, which preserves a descending ramp inside the system and is quieter —
   which is right for a page that exists to be read rather than glanced at.
2. **The prose column.** `max-w-prose` is a stock Tailwind container key, not a new token (§ 2.3).
3. **The one-accent budget.** The index's six links are read as one mark, and the reading is recorded
   in § 4.2 so it can be rejected rather than discovered.

---

## 15. What a reviewer should be able to do with this file

- **Rebuild the page's geometry** from § 2 without opening a browser, at any of the four reference
  widths, in either theme.
- **Reproduce every number** — § 0 gives the copy method, the port, the build command, the box model
  and the viewport list; §§ 2, 5, 9 and 10 give what each probe printed, including the two readings
  that contradicted this gate's own draft.
- **Reject this design where it is wrong.** The three judgment calls are flagged in place, not
  buried: the cobalt budget reading (§ 4.2), the banner suppression on the policy route (§ 9 M2), and
  the preference for §20.2 clause (a) over clause (b) (§ 5.1).
- **Build the screen without asking a question** — every element has a token, eight states, a motion
  path with its reduced-motion neutralizer, a copy slot with a measured budget, and a named atomic
  level.
