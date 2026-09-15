# 0005 — Tailwind theme collision and dark hydration hotfix

> Owner: product-manager · Gate: `spec` · Run 2

Two defects, one spec. They do not share a mechanism — one is a CSS token collision, the other a
React hydration mismatch. They share the **reason nobody saw them**: every instrument this squad
runs looks at something other than the production build, and every layout assertion it owns is
bounded on one side only. That shared blind spot is in scope here, not deferred.

---

## Problem

**D1 — the legal disclosure is 64 pixels wide.**

The worker finishes their scan, reaches the bottom of the page, and finds the paragraph that tells
them what this calculator did *not* compute: that the numbers are an estimate, that they do not
replace a holerite, that nothing here is legal advice. `PRODUCT.md` §4 calls this "name the gap",
and it is one third of the entire promise — the thing that separates WorkLoad from the dozens of
overtime calculators that show a number and say nothing.

That paragraph renders as a column **64 pixels wide**, at every viewport, on every route, in both
themes: one or two words per line, roughly 1700px of vertical scroll on a phone. A disclosure the
user will not read is a disclosure that was not made. The app still *contains* the sentence and a
screen reader still reads it in full — so nothing the squad measures registers a failure — but for
the sighted user standing at a time clock, the promise is not kept.

**D2 — every dark-theme visitor generates a React hydration error.**

Roughly half of visitors arrive with `prefers-color-scheme: dark`. On the production build, each
of them trips minified React error #418 on first load, on both routes: the server-rendered tree
and the client's first tree disagree, React throws the tree away and rebuilds it. The page
recovers — every number is correct, every control works — but the user sees a flash of re-render
before the page settles, and `AGENTS.md` §9's "zero console errors" bar is violated on every visit.
Unlike D1, this is **live in production today**.

### Which is worse

**D1.** Not because it is more frequent — D2 is, and D2 is the one shipping right now — but because
of what each costs the user.

D2 costs a flash and a console line. Nothing the user reads is wrong; nothing they decide changes.
It is a hygiene defect with a wide blast radius.

D1 costs the promise. The product's entire positioning (`PRODUCT.md` §2, §4) is that it names the
table, the year, and what it left out. The paragraph that does the "what it left out" part is the
one rendered unreadable. A calculator that shows an estimate and makes its caveat illegible is
closer to the competitors it defines itself against than to itself. There is no severity above
"the product stops being the product".

The exposure runs the other way — D1 is not in `main`; it entered with PR #35 and lives only inside
the unmerged stack — and that asymmetry is exactly why this spec blocks the merge. See § Blocking
condition.

### D3 — the blind spot, which outlives both defects

D1 survived two whole specs under a green suite. Playwright asserted no horizontal overflow and no
control off-viewport: an element that collapses *inward* produces neither. Lighthouse scored
accessibility 1.0 twelve times: the text is in the DOM with correct contrast. `preview.mjs`
photographed the footer eight times and compared nothing.

D2 survived because every tool the squad owns drives `next dev`, and the defect exists only in the
production bundle under a dark system scheme.

Both are the same failure of instrumentation: **the checks describe the page they expect instead of
measuring the page that ships.** Fixing two defects and leaving that in place fixes two incidents.

---

## Audience & moment

The CLT worker of `PRODUCT.md` §1, on a phone, at the end of the ten-second path — the moment they
have their number and look for what it does not include. Secondarily, the same user at first paint,
on a dark phone, watching the page rebuild itself.

## Outcome

- The disclosure paragraph reads as a normal measure of text at every viewport, with no visual
  change anywhere else on the page.
- A dark-theme visitor's first load produces no console error and no re-render flash.
- The next element that collapses inward, and the next defect that exists only in the production
  build, fail a check on the PR that introduces them.

---

## Scope

1. **D1 — fix the cause, not the four symptoms.** The `@theme` block in `app/globals.css` declares
   a named `--spacing-*` scale whose keys collide with Tailwind's container scale, so `max-w-<name>`
   resolves against the spacing value. Removing the named scale in favour of the numeric one
   Tailwind already derives from `--spacing: 0.25rem` empties the colliding namespace. Renaming
   the four broken utilities is explicitly **not** the fix: it leaves the trap armed for the fifth.
   The tech-lead compiled Tailwind 4.3.3 and established that declaring `--container-*` explicitly
   does not work; re-deriving that is out of bounds (lesson 017).
2. **A guard that makes the collision unrepeatable**, not merely absent: a check that fails if the
   `@theme` block declares any `--spacing-` key whose suffix is not numeric.
3. **D2 — falsify the cause before editing.** The hypothesis is `app-header.tsx:66` reading
   `resolvedTheme` without a mount guard. The diagnosis is its own step with its own evidence; if
   it clears, the finding returns to the tech-lead before any file is edited.
4. **A CI reproduction of D2**: both routes, production build, a browser context with
   `colorScheme: "dark"`, a `pageerror` listener, running on every PR.
5. **Close the dev/production divergence**: the local e2e run must exercise the same build CI does.
   A suite that looks at `next dev` locally is a suite that agrees with itself.
6. **Close the one-sided layout assertion**: a floor on rendered width, expressed over a class of
   element rather than over the four sites known to be broken today.
7. **Reconcile `DESIGN.md`'s spacing section** with the tokens that actually ship.
8. **Make the granular consent choice readable at 390** (added run 2). Restoring the dialog's width
   does not reach inside its rows, which stay below `legal.md` LR2; the two toggle rows therefore
   stack below `sm` and sit side by side from `sm` up (`design.md` §3.3.1). This is the same defect
   as D1 at a second surface — a disclosure formally present and practically unreadable — and it is
   bounded to a flow-direction and alignment change on those two rows.

## Out of scope

- **Any visual redesign.** This spec must move zero pixels other than the four collapsed widths and
  the granular-consent toggle rows inside `cookie-consent.tsx`, which stack below `sm` because
  `legal.md` LR2 cannot be satisfied at 390 by the width fix alone (`design.md` §3.3.1). No other
  pixel moves, and no token *value* changes anywhere.
  The stack is bounded to a flow-direction and alignment change on those two rows: it adds no
  control, removes none, changes no string, no token value, no type step, no colour, and no
  animation. Anything beyond that inside the dialog is a different spec (run 2 — see § Amendment).
- **Any token *value* change.** Not a spacing value, not a radius, not a colour, not a breakpoint.
  A migration that also "tidies" a value is no longer falsifiable as zero-diff.
- **The typeface, the icon set, the type ramp, motion.** Settled in 0002; not reopened.
- **Any user-visible string.** No pt-BR word changes, including the disclosure paragraphs
  themselves — their text is correct, only their width is wrong.
- **Any change to a number, rate, bracket, ceiling or table.**
- **The `max-w-4xl` site at `cookie-consent.tsx:44`,** which resolves correctly today only because
  no `--spacing-4xl` exists. It needs no edit; it is listed so nobody "fixes" it.
- **Restructuring `responsive.spec.ts` beyond adding the floor assertion**, and any new e2e project
  beyond the dark production one.
- **The minor `twitter` metadata divergence** also reported at 0002 G6 — a different spec's work.
- **Rebasing the PR stack.** 0005 is authored on top of it (tech-lead's ruling).

---

## Amendment (run 2) — why the zero-pixel sentence now has an exception

Run 1 wrote "zero pixels other than the four collapsed widths" before G2 existed. G2 then produced
`legal.md` LR1–LR4, which bind *rendering*, not wording: the granular-consent rows at 390 render at
roughly 20 and 19 characters per line even after the dialog is restored to its intended width, and
that is below LR2. The width fix does not reach inside the rows.

**Accepted, not merely acknowledged.** `AGENTS.md` §4 rule 8 puts a legal floor above scope, and
LR1–LR4 are not mine to soften. More to the point, this is not scope widening: an LGPD art. 8º §4º
granular choice that is offered but cannot be read is the same class of defect as a 64px
disclosure — it is the defect this spec exists to remove, appearing at a second surface. Removing
it is inside the spec's own purpose; a version of this spec that repairs the container and leaves
the choice unreadable would ship the problem it was opened to end.

What the amendment changes: the § Out of scope sentence above, AC3, and AC6's exemption clause. It
re-runs neither G2 nor G3 — both gates already ruled — and it widens nothing else. The bound is in
the scope sentence: two rows, one flow direction, below `sm`.

---

## Ruling — is the layout floor sufficient to close the blind spot?

The tech-lead asks whether the both-sides-bounded assertion in `tests/e2e/responsive.spec.ts` is
sufficient. **It is necessary and it is the right place — and it is not sufficient on its own.**
Three reasons, each producing a required companion check:

1. **It only sees elements that carry text.** The floor is expressed over blocks holding more than
   80 characters; a panel, a control row or an image frame can collapse to nothing and still pass.
   The token guard (scope item 2) is what covers those, because it removes the *cause* rather than
   detecting one of its effects. A symptom check and a cause check are not redundant — the cause
   check is cheap, runs in `pnpm check`, and is the only one that protects code nobody has written
   yet.
2. **It only runs where the suite runs.** Until scope item 5 lands, the local run measures
   `next dev`, and a defect that lives only in the production bundle is invisible to it exactly as
   D2 was. The floor assertion inherits whatever build the suite points at.
3. **An assertion that has never failed proves nothing** (lesson 012). The floor earns its place
   only if it is seen to fail against the unfixed tree first, which AC1 requires.

So: the floor assertion, the token guard, and the production-build local run are one deliverable in
three parts. Shipping any one of them alone leaves the blind spot open, and the spec does not accept
a partial pass on this.

---

## Legal dependencies

This change computes nothing and states no rule. It nevertheless depends on the following. Run 1
recorded the tech-lead's ruling that the law gate could be deferred to G6 since no string and no
number changes; **G2 was run anyway and rejected that reasoning for the two disclosure surfaces**,
producing rules LR1–LR4 (`legal.md` §3–§4), which are binding on this spec:

| # | Dependency | What must be confirmed |
|---|---|---|
| L1 | The four disclosure paragraphs in the `<footer>` of `components/organisms/calculator-views.tsx` — the D1–D4 gap statement settled in `.specs/0002-design-taste-preflight/legal.md` S4 | Byte-identical after this change. A width fix that re-words a disclosure is a legal change wearing a CSS diff. |
| L2 | `PRODUCT.md` §4 "name the gap" | Discharged only when the disclosure is legible to a sighted user at 390px, not merely present in the DOM. |
| L3 | Every legal table, rate, bracket and ceiling in `lib/` | Untouched. The spacing migration must not reach `lib/`. |
| L4 | `legal.md` LR1–LR4 over the four disclosure surfaces DS1–DS4, including the granular-consent choice at `cookie-consent.tsx:85` | Each surface measured against its rule on rendered geometry, on the production build, at 390 and 1440, both routes, both themes. AC2 and AC3 carry them. These rules are not this spec's to soften; where one cannot be satisfied, that is a blocker for the human, not a relaxed criterion. |

No new rule, table or threshold is required. If the build discovers it needs one, that is a scope
breach and it bounces to the tech-lead.

---

## Blocking condition

**The open PR stack (#32→#33→#34→#35→#36→#37, plus 0002's branch) does not merge until this spec
ships.**

D1 is not in production. `main`'s footer is `max-w-3xl` against stock Tailwind and measures 768px.
The defect entered with **PR #35** and lives only inside the unmerged stack — so merging the stack
as it stands is the act that would ship a 64px legal disclosure to users. The stack being green is
not a counter-argument; green is the finding, since every check in the repository passed over a
defect measurable in a browser in one line.

This condition is binding on `release-manager` at G8 and is recorded in `STATUS.md`.

---

## Acceptance criteria

Every command below has been run in this tree (lesson 012); where one could not complete, it is
recorded in `STATUS.md` § Blockers with the reason and the owner, not silently omitted.

| # | Criterion | How it is verified |
|---|---|---|
| AC1 | **The floor assertion fails before the fix.** The new both-sides-bounded layout check in `tests/e2e/responsive.spec.ts` fails against the unfixed tree, naming the `<footer>` of `calculator-views.tsx`, at 390 and at 1440. | Run the new spec against the pre-fix tree in an isolated worktree (`AGENTS.md` §4 rule 6) before the token migration commit; the failure output goes in `reports/qa.md`. Not a pass until a reviewer can read the red run. |
| AC2 | **The footer measures a full text column.** At 390 and 1440, on both `/` and `/custo-da-hora`, `getComputedStyle(footer).maxWidth` reads `768px` (48rem) and its rendered width is the lesser of 768px and the available content width. **Before: `64px` at both viewports** (measured in this tree — see Evidence). The computed value alone does not discharge this criterion: DS1 must also satisfy **LR1 and LR2 of `legal.md` §3** on rendered geometry, measured with the helper `plan.md` T2 specifies. | The floor assertion in `tests/e2e/responsive.spec.ts`, plus the LR1/LR2 reads, both reported in `reports/qa.md`. |
| AC3 | **The other three collision sites resolve to their container values**: `ad-manager.tsx:24` `max-w-3xl` → `768px`; `cookie-consent.tsx:85` `max-w-lg` → `512px`; `journey-form.tsx:238` `max-w-md` → `448px`. Before: 64px, ~24px, ~16px. **Additionally, for the consent dialog (DS4): it satisfies LR1, LR2 and LR4 of `legal.md` §3–§4 on rendered geometry at 390 and 1440, in both themes** — which at 390 requires the two granular-consent rows to stack below `sm` (`design.md` §3.3.1), since the width alone leaves their captions below LR2. The rows keep their 44×44 controls and their labels. | Computed-style and rendered-geometry reads in a real browser at 390 and 1440, using `plan.md` T2's LR helper, reported in `reports/qa.md`. The LR4 clauses are confirmed by `labor-law-analyst` at G6. |
| AC4 | **The colliding namespace is empty, across the whole file.** `app/globals.css` declares no `--spacing-` custom property whose suffix is anything other than a number (the bare `--spacing` multiplier excepted). Stated over the file, not over the eight keys known today (lesson 006). | A unit test over `app/globals.css` in `__tests__/`, run by `pnpm test` and therefore by `pnpm check`. It must be seen to fail when a non-numeric key is reintroduced. |
| AC5 | **No reference to a deleted token survives anywhere in the bound directories.** Zero occurrences of a non-numeric `--spacing-` custom property or of a spacing utility suffixed `hair/xs/sm/md/lg/xl/2xl/3xl` in `app/` and `components/`, including inside `calc()`/`max()` arbitrary values and including responsive-prefixed forms (`sm:px-lg`). | Commands **V1** and **V2** below return 0. Both run today and return 13 and 4 respectively. |
| AC6 | **Zero pixels move.** Over `/` and `/custo-da-hora`, at 390 and 1440, in both themes, the `getBoundingClientRect()` geometry (x, y, width, height) of every element in `header`, `main` and `footer` is identical before and after the migration — except inside the four subtrees named in AC2/AC3, which are the only permitted diffs. Inside the DS4 subtree that exemption explicitly covers the two granular-consent rows stacking below `sm` (AC3, `design.md` §3.3.1): at 390 their geometry is expected to change, at 1440 it is not, and a non-zero delta in those rows at 1440 is a rejection like any other. Any other non-zero delta is a rejection, not a rounding note. | A geometry dump captured before and after with a Playwright script and diffed. The read path is proven in this tree (see Evidence); where the dump lives is the tech-lead's call. Screenshot comparison from `node .agents/tools/preview.mjs --out <dir>` is corroboration, never the criterion — antialiasing noise cannot decide a zero-diff claim. |
| AC7 | **D2's cause is falsified or confirmed in writing before any fix is written.** `reports/qa.md` (or the task's own evidence) names the mismatching node, from a build where the error is legible, and states whether `app-header.tsx:66` is it. If it is not, the spec bounces to the tech-lead before an edit lands. | The diagnosis task's evidence, reviewed at G6. A fix committed without this evidence fails the gate regardless of whether the error stops. |
| AC8 | **The dark production reproduction fails before the fix and passes after.** A Playwright project running against the production build, `colorScheme: "dark"`, with a `page.on("pageerror")` listener, over `/` and `/custo-da-hora`, reports ≥1 error on the pre-fix tree and exactly 0 on the fixed tree. | The new e2e project, run twice — once against an isolated pre-fix worktree, once against the fixed tree. Both runs quoted in `reports/qa.md`. |
| AC9 | **The local e2e run exercises the production build**, so that a defect visible only in production cannot pass locally and fail in CI. | `playwright.config.ts`'s `webServer.command` is the production build in both environments; demonstrated by AC8's reproduction failing on an unfixed tree **locally**, not only under `CI=true`. |
| AC10 | **The disclosure text is untouched.** `git diff` over `components/organisms/calculator-views.tsx` shows no change inside the `<footer>`'s four `<p>` elements — only the `className`. | `git diff main -- components/organisms/calculator-views.tsx`, read at G6 by `labor-law-analyst` against `0002/legal.md` S4 (L1). |
| AC11 | **`lib/` is not touched.** `git diff --stat` for this spec's commits lists no file under `lib/`. | `git diff --stat` at G7. |
| AC12 | **`DESIGN.md`'s spacing section names the tokens that ship.** No occurrence of a retired token name survives in `DESIGN.md`, stated over the whole file rather than over the sections known to mention it today. | Command **V3** below returns 0 (it returns 8 today); the prose reads correctly to `product-designer` at their ratification gate. |
| AC13 | **The standing bars still hold**: `pnpm check` and `pnpm build` clean; coverage thresholds unchanged; zero axe violations at critical/serious in both themes. | `pnpm check`, `pnpm build`, `node .agents/tools/preview.mjs`. |

No criterion here is a threshold against an instrument with run-to-run spread (lesson 011): every
number above is a computed style, a file count or an error count, and each has a lever inside this
spec's own scope.

---

## Evidence available

| Claim | Source |
|---|---|
| The footer computes `max-width: 64px` and renders 64px wide at **both** 390 and 1440 | Measured in this tree against the running dev server with a Playwright `getBoundingClientRect`/`getComputedStyle` dump, 2026-09-14. Independent of the 0002 audit's own reading, which reports the same value. |
| `max-w-app` (1280px) and `max-w-60` (240px) resolve correctly on the same page | Same dump — confirms the defect is confined to keys that collide with the container scale, and that the numeric scale is unaffected. |
| Exactly **four** colliding utility sites exist in `app/` and `components/` — no `w-`, `min-w-`, `basis-` or `size-` collisions | Command **V2** → `ad-manager.tsx:24`, `calculator-views.tsx:73`, `cookie-consent.tsx:85`, `journey-form.tsx:238`. Re-run at G1, matching the triage brief exactly (lesson 001). |
| Five arbitrary values read a named spacing token inside `calc()`/`max()` | Command **V4** → `calculator-views.tsx:41,65`, `cookie-consent.tsx:44,160`, `calculator-layout.tsx:18`. These are invisible to a utility-name search and are the most likely thing a migration misses. |
| The migration surface is **~129–204 utility occurrences** | My scan over `git ls-files app components` counts 129 occurrences across a whitelist of spacing prefixes; the triage brief counts ~204 by a different method. **The count is not scope-bearing and neither number is frozen into a criterion** — AC5 binds the boundary (zero survivors in `app/` and `components/`), which is correct under either count (lesson 001, lesson 006). |
| `--spacing-hair` has **zero** usages | Same scan. It can be deleted outright rather than mapped. |
| `max-w-4xl` at `cookie-consent.tsx:44` is correct today | No `--spacing-4xl` is declared, so it resolves to `--container-4xl`. Listed as out of scope so it is not "fixed". |
| D1 is absent from production | `git show main:app/globals.css` declares no `--spacing-3xl`; the defect entered with PR #35 (tech-lead, triage brief). |
| D2 is present in production | `app-header.tsx` is identical on `main` (tech-lead, triage brief); reproduced at 0002 G6 against a pre-0002 worktree. |
| Playwright is operable in this tree | `@playwright/test` 1.63.0, chromium build 1243 present; the dump above ran through it. See `STATUS.md` § Blockers for the one environmental caveat on `pnpm e2e`. |

## Verification commands

Pasted from a terminal in this tree on 2026-09-14, with the count each returned today. A criterion
above cites these by number so no pipe has to be escaped into a table cell.

```bash
# V1 — any reference to a non-numeric spacing token (declarations + var() reads). Today: 13
grep -rnE -- '--spacing-(hair|xs|sm|md|lg|xl|2xl|3xl)' app components

# V2 — utilities that resolve through the collided namespace. Today: 4
grep -rnoE '\b(max-w|min-w|w|basis|size)-(hair|xs|sm|md|lg|xl|2xl|3xl)\b' app components

# V3 — retired token names surviving in the design doc. Today: 8
grep -rnE -- '--spacing-(hair|xs|sm|md|lg|xl|2xl|3xl)' DESIGN.md

# V4 — arbitrary values reading a named token inside calc()/max(). Today: 5
grep -rn 'var(--spacing-' app components
```

A spacing utility written as `sm:px-lg` is **not** matched by V2 (V2 covers width utilities only);
the full utility surface is scanned by the script recorded in Evidence, and AC5's boundary is the
directories, not any one command's pattern.

## Open questions

| Question | Default chosen | Why |
|---|---|---|
| Does the disclosure need a width of its own, or the same content measure as the panels above it? | The same measure — `48rem`, i.e. what `max-w-3xl` was always meant to produce. | The intent already in the code was `max-w-3xl`; this spec repairs an intent, it does not form a new one. A different measure is a design decision and belongs to `product-designer`, who may set it at their gate provided the value cannot collide with `--container-*`. |
| Where does the layout floor's threshold sit? | 240px minimum rendered width for block elements holding more than 80 characters of text, at 390 and 1440. | Carried from the tech-lead's triage; it is below the narrowest legitimate text column at 390 (310px per `design.md` §7's own math) and far above the 64px defect, so it discriminates without flagging healthy layouts. The exact number is the tech-lead's to adjust in `plan.md` provided it keeps both properties. |
| Does the token migration need a `--spacing-*` replacement namespace with non-colliding names? | No. Delete, and use the numeric scale. | An empty namespace cannot collide again; a renamed one can. `product-designer` may propose semantic names at their gate, but any proposal must demonstrate the names cannot collide with `--container-*`, and it does not reopen `design.md`. |
| Is D2 fixed with CSS (`dark:` / `not-dark:` toggling both icons) or with a mount guard? | Not settled here. | Implementation is the tech-lead's. This spec requires only AC7 and AC8. |

## Non-goals

What a well-meaning downstream agent might add, and must not:

- **Renaming the four broken utilities and stopping.** That is the symptom fix the spec exists to refuse.
- **Declaring a `--container-*` scale** as the remedy for D1. Compiled against Tailwind 4.3.3 and proven not to work; re-deriving it burns a gate (lesson 017).
- **"Improving" a spacing value while migrating it** — rounding 0.75rem to 0.5rem, collapsing two near-identical gaps, adopting a tidier ramp. Every such edit destroys AC6.
- **Touching the disclosure wording** while fixing the element that holds it (lesson 002: a rewrite re-endorses every claim it preserves, and this spec has no law gate to catch one).
- **Adding a `useEffect` mount guard plus a loading skeleton, a theme-transition animation, or a flash-prevention script** in the course of fixing D2. The defect is a mismatched icon, not a missing theming architecture.
- **Suppressing D2 with `suppressHydrationWarning` on the offending element.** That silences the console and leaves the mismatch; AC8 would pass while the user still sees the flash. If a fix works by hiding the error rather than removing the divergence, it fails this gate.
- **Reading the consent-row stack as permission to restyle the dialog.** The amendment buys one
  flow-direction change on two rows below `sm` and nothing else: no new spacing, no reordered
  controls, no changed switch, no `motion` prop added, removed or retimed (`STATUS.md` B7). A diff
  inside `cookie-consent.tsx` that touches anything beyond that is a rejection, not a judgement call.
- **Repairing DS3 (`salary-calculator.tsx:125`) in this spec** because the same rule caught it.
  It never resolved through the collided namespace and its remedy lives in a shared atom
  (`STATUS.md` B6). It gets its own spec if `labor-law-analyst` confirms it at G6.
- **Broadening the e2e suite** with additional viewports, projects or routes beyond scope items 4–6. The suite is already slow enough to be skipped.
- **Merging the stack because it is green.** See § Blocking condition.
