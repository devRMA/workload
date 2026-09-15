# 0005 — tailwind theme collision and dark hydration hotfix

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** in-progress
**Next agent:** `product-designer` (G3) — ratify the spacing-token naming and reconcile `DESIGN.md`
§§393-395, 397, 403, 492, 501, 542, 559. `content-writer` does not run: no string changes.
The law gate **was run at G2 after all** and passed — see `legal.md`. It is binding on the design:
rules **LR1-LR4** set the measurable floor the collapsed surfaces must clear. `labor-law-analyst`
re-checks at G6 against `legal.md` and `spec.md` § Legal dependencies (L1-L3).
**Bounces:** none
**Urgency:** this spec **gates the merge of the whole open PR stack** (#32→#33→#34→#35→#36→#37 and
0002's branch on top). See § Merge ruling.

## Gates

| Gate | Agent | State | Run | Artifact |
|---|---|---|---|---|
| spec | product-manager | **done** | 1 | `spec.md` |
| law | labor-law-analyst | **pass** | 1 | `legal.md` — no number, no rate, no string changes, and the gate ran anyway: the collision collapses the `PRODUCT.md` §4 disclosure (`calculator-views.tsx:73`) and the granular consent dialog (`cookie-consent.tsx:85`). Sets binding rules **LR1-LR4**; asks AC2/AC3 to assert rendered geometry, not computed `max-width` |
| design | product-designer | pending | 0 | `design.md` — **ratification, not redesign**: the token rename below changes zero rendered pixels |
| copy | content-writer | **not required** | — | No user-visible string changes |
| plan | tech-lead | pending | 0 | `plan.md` |
| build | frontend-dev | pending | 0 | tasks below |
| qa | qa-engineer | pending | 0 | `reports/qa.md` |
| audit | web-standards-auditor | pending | 0 | `reports/audit.md` |
| release | release-manager | pending | 0 | `reports/release.md` |
| preview | web-standards-auditor | pending | 0 | `reports/audit-preview.md` |
| recruiter | tech-recruiter | pending | 0 | `reports/recruiter.md` |

---

## Tech-lead triage brief (G6 of 0002, run 1)

Source: `.specs/0002-design-taste-preflight/reports/audit.md`, Critical #1 and #2. Both confirmed
pre-existing relative to 0002. Both verified independently by me before this ruling.

### D1 — the `@theme` spacing scale shadows Tailwind's container scale

**Confirmed, and the auditor's stated mechanism is confirmed with one correction that changes the
remedy.** I compiled Tailwind 4.3.3 (the installed version) against a minimal `@theme` and read the
generated CSS:

```
--spacing-3xl: 4rem;  --container-3xl: 48rem;   →  .max-w-3xl { max-width: var(--spacing-3xl) }
--spacing-md:  1rem;  --container-md:  28rem;   →  .max-w-md  { max-width: var(--spacing-md) }
(no --spacing-4xl)                              →  .max-w-4xl { max-width: var(--container-4xl) }
```

**`--spacing-<name>` wins over `--container-<name>` even when the container key is explicitly
declared.** So "declare the container scale explicitly" — the obvious fix — **does not work**. It
is the option that would have left the trap armed *and* looked fixed. Anyone re-deriving this
without compiling would have picked it.

`app/globals.css:69-76` declares `--spacing-hair|xs|sm|md|lg|xl|2xl|3xl`. Seven of those eight names
collide with Tailwind's container scale (`3xs 2xs xs sm md lg xl 2xl 3xl 4xl 5xl 6xl 7xl`), so
**every `max-w-<name>`, `w-<name>`, `min-w-<name>`, `basis-<name>` and `size-<name>` in this repo
silently resolves to a spacing value**. Four sites are live today; the trap fires for the next one
written, too.

**Not in production.** `git show main:app/globals.css` has no `--spacing-3xl`; `main`'s footer is
`max-w-3xl` against stock Tailwind and measures 768px. The defect entered with **PR #35
`feat/design-system`** and lives only inside the unmerged stack. Nothing is shipping a 64px legal
disclosure right now — **merging the stack is what would ship it.**

**Root fix (mine to set; the mechanism, not the symptom): delete the named `--spacing-*` keys and
use the numeric spacing scale Tailwind already derives from `--spacing: 0.25rem`.** Every value is
an exact multiple of the 4px base, so the mapping is one-to-one and **no rendered pixel changes**:

| token | value | replacement | usages |
|---|---|---|---|
| `--spacing-hair` | 0.125rem | `0.5` (`p-0.5`) | — |
| `--spacing-xs` | 0.5rem | `2` | 28 |
| `--spacing-sm` | 0.75rem | `3` | 22 |
| `--spacing-md` | 1rem | `4` | 44 |
| `--spacing-lg` | 1.5rem | `6` | 40 |
| `--spacing-xl` | 2rem | `8` | 25 |
| `--spacing-2xl` | 3rem | `12` | 3 |
| `--spacing-3xl` | 4rem | `16` | 2 |

~204 utility occurrences across `app/` and `components/`, plus five arbitrary values that read
`var(--spacing-lg|md|xl)` inside `calc()`/`max()` (`cookie-consent.tsx:44,160`,
`calculator-views.tsx:41,65`, `calculator-layout.tsx:18`) which become
`calc(var(--spacing)*6)` etc. Mechanical, one commit, zero visual diff — which is exactly what
makes it verifiable: the preflight screenshots must be pixel-identical except the four broken
widths.

Why this over renaming to non-colliding semantic names (`--spacing-s1..s8`, `--spacing-gutter`…):
the named scale was duplicating a platform feature that was already there (`--spacing` multiplier),
and a replacement namespace is a namespace that can collide again tomorrow. Deleting it empties the
namespace, so **the collision cannot be re-armed** — and the guard below makes re-arming a test
failure rather than a discovery.

**This is not a design change and does not re-open `design.md`.** `product-designer` ratifies the
naming and rewrites `DESIGN.md`'s spacing section (§393-395, §397, §403, §492, §501, §542, §559
reference the old token names) so the doc matches what ships — the same shape as 0002's T10. If
`product-designer` wants different names, that is theirs to say at their gate, provided the names
cannot collide with `--container-*`.

**The guard that makes it impossible, not merely absent:** a unit test over `app/globals.css` that
fails if the `@theme` block declares any `--spacing-` key whose suffix is not numeric. Nine lines,
no browser, runs in `pnpm check`. Without the guard this is a fix; with it, it is a rule.

### D2 — React #418, production build, dark system theme

**Not verified by me at the DOM level, but there is a prime suspect and the diagnosis task must
falsify it before writing any fix.** `components/organisms/app-header.tsx:66` branches its icon on
`resolvedTheme` with no mounted guard:

```tsx
{resolvedTheme === "dark" ? <IconSun/> : <IconMoon/>}
```

Server renders `resolvedTheme === undefined` → `IconMoon`. `next-themes` 0.4.6 resolves the theme
during the **first client render**, so with a dark system scheme the client's first tree is
`IconSun` — a mismatch that exists **only when the system theme is dark**, which is precisely the
reported trigger. `suppressHydrationWarning` on `<html>`/`<body>` does not reach a child element.
`app-header.tsx` is identical on `main`, so **D2 is live in production today** — unlike D1.

Owner: `frontend-dev`, with the diagnosis step written as its own task and its own evidence, ahead
of any edit. If the falsification confirms line 66, the fix climbs the ladder to CSS: render both
icons and toggle with `dark:` / `not-dark:` utilities — no state, no mount flash, no `useEffect`,
and it keeps working with `attribute="class"`. The `onClick` handler must stop reading
`resolvedTheme` too (`setTheme(t => ...)` / read from the DOM class), or the first click after
hydration flips the wrong way. If the falsification clears line 66, the finding comes back to me
before anyone edits `layout.tsx`.

**CI reproduction, which is the real deliverable:** `playwright.config.ts` already runs
`pnpm start` under `CI`, so a fourth project with `colorScheme: "dark"` and a `page.on("pageerror")`
listener over both routes reproduces it on every PR. Locally the same config runs `pnpm dev`, which
is exactly the mode that hid this for two specs — so the local `webServer.command` becomes the
production build as well. A spec that only fixes the icon and leaves `pnpm e2e` looking at `next dev`
has fixed the incident and left the blind spot.

### D3 — the blind spot (the finding that outlives both defects)

Nothing in this repo can see an element that collapses **inward**. `responsive.spec.ts` asserts no
overflow and no control off-viewport; Lighthouse scores colour and weight; `preview.mjs` photographs
the page and compares nothing. A layout assertion bounded on one side only is half an assertion.

Closes it, in `tests/e2e/responsive.spec.ts` (the only candidate that runs on every PR —
`evidence/preflight-matrix.md` is a document and documents do not fail builds): at 390 and 1440, no
block-level element in `main`/`footer` holding more than 80 characters of text may compute a width
below 240px. General over the class of defect, not pinned to the four known sites, and it fails
today on the footer that carries D1–D4.

### Merge ruling

**The stack does not merge until this spec lands.** #35 introduced D1; merging #32–#37 as they
stand ships a 64px legal disclosure into production, and `PRODUCT.md` §4's promise rests on that
paragraph being readable. The stack being green is not an argument — green is the finding, since
every check passed over a defect measurable in a browser in one line. 0005 is authored **on top of
the stack** (branch off 0002's branch, PR at the tip), not folded back into #35: rebasing a
six-branch stack for a fix that changes no behaviour on the five branches below it buys a tidier
history at the price of five conflict resolutions over 204 edited strings.

### What `product-manager` owns from here

Scope it, write the acceptance criteria, and read lesson **012** before writing any verification
cell: every criterion below has a command that has already run in this tree.

1. `getComputedStyle(footer).maxWidth` is `48rem` at 390 and 1440 (`calculator-views.tsx:73`), and
   the other three sites resolve to their container values.
2. No `--spacing-<non-numeric>` key exists in `app/globals.css`, asserted by a test.
3. The preflight captures are otherwise pixel-identical to the pre-fix set — a zero-diff rename is
   falsifiable and should be falsified.
4. Zero `pageerror` on both routes, production build, `colorScheme: "dark"`, in CI.
5. `DESIGN.md`'s spacing section names the tokens that actually ship.

## Tasks

| Id | Title | State |
|---|---|---|

## Blockers

| # | Blocker | State | Owner / gate |
|---|---|---|---|
| B1 | **`pnpm e2e` could not be run to completion at G1.** `playwright.config.ts` sets `webServer.command` to `pnpm dev` locally with `reuseExistingServer: false`; a concurrent `next dev` from another agent (port 3101, same directory) holds Next.js's per-directory dev lock, so the spawned server exits 1 and Playwright reports `Process from config.webServer was not able to start`. This is environmental, not a repo defect (lesson 013): `@playwright/test` 1.63.0 and chromium 1243 are installed, and a standalone Playwright script against the running server produced the AC2 "before" measurement (footer 64px at 390 and 1440). **Scope item 5 removes the dependency** — a production `webServer.command` takes no dev lock. | open | `frontend-dev` at G5; re-verified by `qa-engineer` at G6 |

## Decisions log

| When | Agent | Decision |
|---|---|---|
| G6 triage of 0002 | tech-lead | Both criticals land here, in one spec, not folded into 0002 (complete, four gates passed) and not amended into PR #35 (six-branch rebase, no behavioural gain). |
| G6 triage of 0002 | tech-lead | Declaring `--container-*` explicitly is **rejected** as the fix for D1: compiled against Tailwind 4.3.3, `--spacing-<name>` wins anyway. The named spacing scale is deleted instead, and a test keeps it deleted. |
| G6 triage of 0002 | tech-lead | The token rename is architecture, not design: every value maps to an exact 4px multiple, so zero pixels move. `product-designer` ratifies and reconciles `DESIGN.md`; `design.md` is not re-opened. |
| G6 triage of 0002 | tech-lead | The open PR stack is held. Merging it would ship the 64px disclosure; `main` does not have the defect today. |
| G6 triage of 0002 | tech-lead | D2's cause is a hypothesis (`app-header.tsx:66`), not a ruling. `frontend-dev` falsifies it before editing, and returns to me if it clears. |
| G1 run 1 | product-manager | **D1 ranked worse than D2**, despite D2 being the one live in production. D2 costs a flash and a console line and changes no number the user reads; D1 makes the `PRODUCT.md` §4 "name the gap" disclosure illegible, which is the product's positioning failing, not a hygiene defect. The exposure asymmetry (D1 is not in `main`) is what makes the merge block the remedy rather than an urgency argument. |
| G1 run 1 | product-manager | **Ruled the layout floor in `responsive.spec.ts` necessary but not sufficient** to close D3. It only sees elements carrying text, it inherits whatever build the suite points at, and an assertion never seen red proves nothing. The floor, the `--spacing-*` namespace guard and the production-build local run are accepted as one three-part deliverable; a partial pass is a rejection. See `spec.md` § Ruling. |
| G1 run 1 | product-manager | **No count frozen into a criterion.** Re-running the triage brief's searches (lesson 001) reproduced the four collision sites exactly, but my utility-surface scan counts 129 occurrences against the brief's ~204 — different methods, both plausible. AC5 therefore binds the *boundary* (`app/` + `components/`, zero survivors) rather than a number, so it is correct under either count (lesson 006). |
| G1 run 1 | product-manager | **Deviation from `AGENTS.md` §4, recorded because it is deliberate**: G1 hands to `product-designer`, not to `labor-law-analyst`. The tech-lead stood the law gate down at G2 on the grounds that no string, number, rate or table changes. I accept it and constrain it: `spec.md` § Legal dependencies names L1 (the D1-D4 disclosure strings must be byte-identical), L2 (§4 is discharged only when the disclosure is legible, not merely present) and L3 (`lib/` untouched), each verifiable at G6 by `labor-law-analyst`, and AC10/AC11 make them checkable from a diff. If the build needs any new rule or table, that is a scope breach and bounces to the tech-lead. |
| G1 run 1 | product-manager | **`pnpm e2e` is not currently runnable in this tree** for an environmental reason (B1). Rather than write criteria against a command I could not complete (lesson 012), AC2's "before" is a measurement I took myself with a standalone Playwright script, AC1/AC8 require their red runs to be quoted in `reports/qa.md`, and B1 stays open until `qa-engineer` confirms it at G6. |
| G2 run 1 | labor-law-analyst | **The law gate was run rather than stood down.** No number or string changes, so the tech-lead's reasoning held for arithmetic — but the four collapsed sites include the footer that carries `PRODUCT.md` §4's gap list and table citation, and the consent dialog where the granular LGPD art. 8º §4º choice is exercised. Whether an obligatory disclosure is being made is a law question, not a CSS one. **Verdict: pass.** |
| G2 run 1 | labor-law-analyst | **Rule S4 of 0002 passes on its own terms and the disclosure is still not made.** S4 constrained wording and DOM position only, so a 64px column is outside its language while being strictly worse than the accordion S4 forbids. S3 and S5 are satisfied in substance (neither surface is inside a collapsed container). Closed with **LR1-LR4**, additive to S3-S10, and written up as lesson **018**. |
| G2 run 1 | labor-law-analyst | **Legibility set as a measurement, not an adjective.** LR1: rendered width ≥ min(320px, available) for the four named disclosure surfaces. LR2: ≥ 40 characters per rendered line box. LR3: present at first paint, visible, no interaction, not assistive-only. Both viewports, both routes, both themes, production build. The 320px floor coexists with the spec's general 240px class floor; they answer different questions. |
| G2 run 1 | labor-law-analyst | **The consent dialog ruled materially different from an informational disclosure.** An illegible disclosure leaves the user uninformed; an illegible consent surface writes a stored record of a choice they could not make, converting a purpose-specific consent into the generic authorisation LGPD art. 8º §4º nullifies. **LR4**: ≥ min(480px, viewport − 32px), every choice control fully rendered with its label — and if a granular surface cannot meet that, it must not be offered. |
| G2 run 1 | labor-law-analyst | **Nothing is owed to users beyond the fix.** Verified against `main`, not assumed: `main` declares no `--spacing-<name>` key (footer = 768px), and `cookie-consent.tsx` does not exist on `main` at all. No user was ever shown a 64px disclosure and no consent was ever collected through a 24px dialog. The affected population is empty; a notice would be noise. The merge block is the remedy, and I concur with it on legal grounds. |
| G2 run 1 | labor-law-analyst | **AC2 and AC3 asserted the computed `max-width` value, which restates the fix rather than the obligation** — they would pass an element whose `max-width` is 768px while a collapsed parent renders it at 40px. Instruction to `tech-lead` at G4: raise both to assert LR1/LR2 on rendered geometry and add DS4's LR4 clauses to AC3. Widens no scope, moves no additional pixel. |
