# 0005 — Implementation plan

> Owner: tech-lead · Gate: `plan` · Run 1

This plan **decomposes**. It does not re-decide. G1 fixed the scope and AC1–AC13, G2 fixed LR1–LR4
and they are not negotiable by architecture or schedule (`AGENTS.md` §4 rule 8), G3 ratified the
token deletion with an exhaustive 1:1 mapping and fixed the target geometry, the `DESIGN.md`
replacement text and D2's first-paint criterion. Where those four documents disagreed, §2 below
rules and routes; everything else here is mechanics.

`frontend-dev` makes **zero decisions**. Every class string, every regex, every file, every
threshold, every command is written out. Anything this plan left open goes into `STATUS.md`
§ Blockers and comes back to me — it is never chosen at the keyboard.

---

## 1. Architecture

### 1.1 What this change is

Two unrelated defects and one instrument repair, in one branch authored on top of the open PR stack.

| | D1 — token collision | D2 — hydration mismatch | D3 — the blind spot |
|---|---|---|---|
| Seam | `app/globals.css` `@theme` + 22 component files | `components/organisms/app-header.tsx` | `playwright.config.ts` + `tests/e2e/` |
| Mechanism | delete the `--spacing-<name>` namespace; migrate consumers to the numeric scale | render both glyphs, let the `.dark` class decide via `display`; stop the click handler reading `resolvedTheme` | production `webServer` locally, a dark-production project, a both-sides-bounded floor, a unit guard on the namespace |
| Proof it worked | line-wise substitution proof + before/after geometry diff | `pageerror` count 0 in dark production + first-paint screenshot pair | each new check seen **red** before the fix lands |

**Nothing moves between atomic levels and no component is created.** `design.md` §5.1 is the
component tree and it is entirely `reuse`. `lib/` and `hooks/` are **not touched** (AC11) — there is
no business rule in this change, so nothing belongs there.

### 1.2 Where each concern lives after this change

| Concern | File | Level | Status |
|---|---|---|---|
| Spacing scale declaration | `app/globals.css` | tokens | **edit — deletions only** (8 lines) |
| Spacing scale invariant | `__tests__/spacing-guards.test.ts` | unit | **create** |
| Utility consumers | 22 files under `components/` | atoms→templates | **edit — class strings only** |
| Consent row layout | `components/organisms/cookie-consent.tsx` | organism | **edit — two `className`s** |
| Theme glyph | `components/organisms/app-header.tsx` | organism | **edit — icon pair + click handler** |
| Suite target build | `playwright.config.ts` | config | **edit** |
| Disclosure legibility (LR1–LR4) | `tests/e2e/disclosure-legibility.spec.ts` | e2e | **create** |
| Dark production reproduction (AC8, D-AC5) | `tests/e2e/dark-hydration.spec.ts` | e2e | **create** |
| Inward-collapse floor (D3) | `tests/e2e/responsive.spec.ts` | e2e | **edit — one test added** |
| Zero-pixel proof (AC6) | `scripts/geometry-dump.mjs` | tooling | **create** |
| Substitution proof (AC6) | `scripts/spacing-migration-proof.mjs` | tooling | **create** |
| Design system record | `DESIGN.md` §§393–559 + frontmatter | docs | **edit** |

### 1.3 Data flow — D2 after the fix

```
pre-paint script (next-themes)  →  <html class="dark">  →  CSS :where(.dark, .dark *)
                                                             ↓
                       both <svg> server-rendered, one has display:none
                                                             ↓
                    first frame is already correct; hydration has nothing to reconcile
```

`resolvedTheme` disappears from the render path entirely. That is the point: a value the server does
not have cannot be read during render without a mismatch, and no mount guard can make the **first
frame** right (`design.md` §7.2). The click handler reads the class off `document.documentElement`
instead — a DOM read inside an event handler, after hydration, where it is always accurate.

## 2. Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Spacing scale | **Delete.** Tailwind derives the numeric scale from `--spacing: 0.25rem` already. | Ponytail rung 4: the platform does it. A named scale was a re-implementation of a framework feature that also collided with a framework namespace. Ratified `design.md` §2. |
| Container scale | **Declare nothing.** | Compiled against Tailwind 4.3.3 twice — `--spacing-<name>` beats a declared `--container-<name>` (tech-lead, `STATUS.md`), and with the spacing key gone, `max-w-3xl` resolves from `node_modules/tailwindcss/theme.css` unaided (`design.md` §2.1). A declaration would be dead weight that reopens the question. **`plan.md` must not add one** — and does not. |
| Theme glyph switch | **CSS `dark:` variant on `display`.** | Ponytail rung 4 again: CSS over JS. No state, no effect, no library. Compiled proof in §4.3. |
| Geometry diff tooling | **Two small committed `.mjs` scripts**, `@playwright/test` only. | Lesson 009: a numeric criterion needs a command in this repository that prints it. No pixel-diff library, no image comparison — AC6 explicitly refuses screenshots as the criterion. |
| **New npm dependencies** | **None.** | Nothing here needs one. |

---

## 3. Rulings on the open blockers B1–B7

The designer routed five questions and two findings to this gate. Each gets a ruling here, and each
ruling is repeated in `STATUS.md`.

### B1 — `pnpm e2e` could not complete (environmental dev lock)

**Ruled: resolved by T1, not worked around.** Scope item 5 already requires the local
`webServer.command` to be the production build, and a production server takes no Next.js
per-directory dev lock. T1 additionally makes the port configurable (`PORT`, default `3000`) so a
concurrent agent's server cannot collide with the suite at all (lesson 013 — an isolated tree is not
an isolated environment). `qa-engineer` re-verifies at G6 by running `pnpm e2e` to completion; the
blocker closes only on that run, not on this ruling.

### B2 / Q1 — LR4 clause 1's measurement basis

**Ruled, and binding on the tasks.** The measured element is the **panel** at
`components/organisms/cookie-consent.tsx:85` — the element carrying `max-w-lg`, i.e. the
`ModalDialog`'s inner `<div>`, **not** the `<dialog>` and not its content box. The measured quantity
is **`getBoundingClientRect().width`**, consistent with LR1 and with `legal.md` §4's own resolution
("`max-w-lg` = 32rem = 512px is the intended value and satisfies this").

Reasoning I am allowed to give: `legal.md` states the obligation twice, once as a phrase
("content-box width") and once as a worked value ("512px … satisfies this"). Those two readings are
inconsistent and the worked value is the one the analyst actually computed against, so it is the one
that carries the intent. Architecture does not get to pick the cheaper of two legal readings — so
this is written into `T5`'s assertion **as a statement to be confirmed**, and
`labor-law-analyst` confirms or corrects it at G6 against `legal.md` §4. If it corrects it to the
content box, the remedy is a number change in one assertion and a rerun; nothing else in this plan
moves.

### B3 / Q2 — LR2 is unsatisfiable for strings under 40 characters

**Ruled: the designer's reading is adopted and encoded.**

> An element whose entire text occupies **one line box** satisfies LR2 by definition. The ratio
> `textContent.trim().length / lineBoxes >= 40` is asserted only where `lineBoxes > 1`.

This is written into the LR2 helper in `tests/e2e/disclosure-legibility.spec.ts` as an explicit
branch with a comment naming the norm, not as a silent `if`. It preserves everything LR2 was written
to catch — a paragraph broken one word per line always has `lineBoxes > 1`, and DS1's P3 today
scores ≈9 over 20-odd line boxes. `labor-law-analyst` ratifies the wording at G6. **Not blocking:**
the ratified DS4 geometry puts both captions on exactly one line box under either reading.

### B4 / Q3 — the DS4 stack moves pixels at 390, which `spec.md` § Out of scope forbids

**Ruled, plainly, in two parts.**

**Part 1 — the build proceeds with the stack.** `legal.md` LR2 is binding and `AGENTS.md` §4 rule 8
says a legal finding is not overruled by scope or schedule. At a 258px row content box the two
granular-consent captions render at ≈20 and ≈19 characters per line; restoring 512px does not reach
inside the rows. Leaving them there would mean shipping an LGPD art. 8º §4º granular choice that is
formally offered and practically unreadable — the exact failure `legal.md` §4 says converts a
specific consent into a null generic authorisation. The stack lands (T4).

**Part 2 — the spec sentence is amended, and the amendment is a bounce to G1, not an edit I make.**
`spec.md` § Out of scope says "**Any visual redesign.** This spec must move zero pixels other than
the four collapsed widths." That sentence is now false in a way the reader cannot discover — AC6's
exemption covers the *verification* but the scope prose still reads as a prohibition, and the next
agent to read only § Out of scope will flag T4 as a scope breach at G6. Routed to
`product-manager` with the replacement text I recommend:

> **Any visual redesign.** This spec must move zero pixels other than the four collapsed widths and
> the granular-consent toggle rows inside `cookie-consent.tsx`, which stack below `sm` because
> `legal.md` LR2 cannot be satisfied at 390 by the width fix alone (`design.md` §3.3.1). No other
> pixel moves, and no token *value* changes anywhere.

**This amendment does not block T4 and does not re-run G2 or G3.** It changes prose to match a
ruling both gates already made; the criterion that verifies it (AC6) already carries the exemption.
If `product-manager` declines the amendment, that is a conflict between `spec.md` and `legal.md`
that only `labor-law-analyst` can settle, and it comes back to me before G6 — it does not get
settled by whoever is holding the keyboard.

### B5 / Q4 — AC12's verification command cannot see what AC12 asserts

**Ruled: AC12's verification is restated over the boundary, and moved out of a grep into a test.**
Command V3 greps for `--spacing-<name>` and is structurally blind to `DESIGN.md`'s YAML frontmatter
`spacing:` block, whose keys are the same eight retired names. AC12 as written would pass with the
machine-readable record still declaring a scale that does not exist — lesson 006 exactly.

AC12 is verified by **`__tests__/spacing-guards.test.ts`**, which asserts over the whole of
`DESIGN.md`: (a) no `--spacing-<non-numeric>` occurrence anywhere in the file, and (b) every key
under the frontmatter `spacing:` block parses as a number. It runs in `pnpm test` and therefore in
`pnpm check`, so it cannot be forgotten and it cannot be satisfied by a grep that does not look.
V3 stays as corroboration in `reports/`, never as the criterion.

### B6 / Q5 — DS3 at `salary-calculator.tsx:125` is ≈32 chars/line at 390, below LR2

**Ruled: the designer is right, and it is recorded as a carried-forward finding with a named owner,
not as a note.**

The designer's position survives all three tests I can apply to it:

1. **Causation.** DS3 has never resolved through the collided namespace. Its width at 390 is the
   card content box (308px) minus `AlertBanner`'s 80px of chrome, and not one of those numbers is a
   `--spacing-<name>` lookup. It measures 242px before this spec and 242px after.
2. **Remedy location.** The fix is in `components/atoms/alert-banner.tsx` — a shared atom with
   other consumers. Changing an atom's internal chrome to repair one consumer's measure is a design
   decision about a component this spec never opened, at a level this spec never touches, with a
   blast radius no criterion here bounds.
3. **Falsifiability.** Folding it in would destroy the one thing AC6 has going for it. AC6 is "zero
   pixels moved except inside four named subtrees"; a fifth, differently-motivated subtree turns a
   binary criterion into an argument.

**Carried forward as:**

| | |
|---|---|
| **Finding** | DS3 (`components/organisms/salary-calculator.tsx:125`) computes ≈32 characters per line at 390 inside `AlertBanner`, below `legal.md` LR2's floor of 40. `legal.md` §3 records DS3 as passing; the arithmetic in `design.md` §3.6 does not reproduce that. |
| **Owner, step 1** | `labor-law-analyst`, at **G6**, measures DS3 in a real browser on the **fixed** tree at 390 and 1440, both routes, both themes, production build, using the same LR2 helper T5 ships — and rules. Its width is unchanged by this spec, so the fixed tree is a valid measurement site and no pre-fix worktree is needed. |
| **Owner, step 2** | If confirmed, `product-manager` opens a spec for `alert-banner.tsx`. It is **not** implemented here under any circumstance. |
| **Trigger to escalate** | If `labor-law-analyst` rules DS3 a *blocking* LR2 failure rather than a finding, the pipeline stops at G6 and the ruling comes to me — it does not become a task in this spec. |

### B7 — no `prefers-reduced-motion` path for any `motion` animation

**Ruled: confirmed, out of scope, carried forward with an owner.** The global
`@media (prefers-reduced-motion: reduce)` block in `app/globals.css` clamps CSS
`transition-property`, which does not reach `motion`'s JS-driven inline styles;
`grep -rn "useReducedMotion\|prefers-reduced" components/` returns zero. The consent banner's 100px
slide and the telemetry knob's translate therefore play at full amplitude under reduced motion.

It predates this spec, it is a genuine `AGENTS.md` §8 violation, and it touches every `motion` call
site in the repo — which is a scope this spec has no criterion for and no legal lever over. **Owner:
`product-manager`, to open its own spec.** Recorded in `STATUS.md` so it is a queued item with a
name on it rather than a paragraph in a design document nobody reads twice.

**One constraint it places on this spec:** T4 changes a `flex` direction inside the consent dialog.
It must not add, remove or retime any animation while doing so (`design.md` §5.4 — "No motion is
added, removed or retimed"). A `motion` prop appearing in T4's diff is a rejection.

---

## 4. Decided mechanics — the three things a task would otherwise leave open

Everything in this section has been **executed in this tree** before being written down (lesson
008). Figures and outputs are pasted, not described.

### 4.1 The migration: a mechanical sweep with a closed prefix list, plus a line-wise proof

**Ruled: mechanical sweep, not file-by-file.** 129 occurrences over 22 files, every one of them a
pure string substitution with an exact 1:1 value mapping (`design.md` §2.1). A file-by-file pass
across 22 files is 22 chances for a hand to slip on a line nobody diffs twice, and it produces a
diff no reviewer can read. A single deterministic sweep produces a diff a *script* can read, and
that script is the thing that makes AC6 cheap.

**The prefix list is closed and exhaustive, and it deliberately excludes the width prefixes.** The
suffixes `xs sm md lg xl 2xl 3xl` also belong to `--radius-*` (`rounded-md`) and `--text-*`
(`text-body-sm`), which must **not** be touched, and to `--container-*` (`max-w-3xl`), which must
**not** be touched either — those four sites are repaired *by the deletion*, not by an edit
(`design.md` §3.2–§3.5: "no edit beyond the token migration").

Prefixes present in this tree, derived by scan, not by memory:

```
$ grep -rhoE '\b([a-z]+:)*(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|space-y|space-x|inset|inset-x|inset-y|top|right|bottom|left)-(hair|xs|sm|md|lg|xl|2xl|3xl)\b' components --include='*.tsx' \
  | sed -E 's/^([a-z]+:)*//; s/-(hair|xs|sm|md|lg|xl|2xl|3xl)$//' | sort -u | tr '\n' ' '
bottom gap left m mb mt p pb pt px py right space-y
```

Variant-prefixed forms present: `focus: lg: md: sm:`. They need no special handling — `:` is a
non-word character, so `\bpx-lg\b` already matches inside `sm:px-lg`.

**The sweep, verbatim. Run it exactly as written, once, from the repository root:**

```bash
PREFIX='(p|px|py|pt|pb|m|mb|mt|gap|space-y|bottom|left|right)'
find components -name '*.tsx' -print0 | xargs -0 sed -i -E \
 -e "s/\b${PREFIX}-3xl\b/\1-16/g" \
 -e "s/\b${PREFIX}-2xl\b/\1-12/g" \
 -e "s/\b${PREFIX}-hair\b/\1-0.5/g" \
 -e "s/\b${PREFIX}-xs\b/\1-2/g" \
 -e "s/\b${PREFIX}-sm\b/\1-3/g" \
 -e "s/\b${PREFIX}-md\b/\1-4/g" \
 -e "s/\b${PREFIX}-lg\b/\1-6/g" \
 -e "s/\b${PREFIX}-xl\b/\1-8/g" \
 -e "s/max\(var\(--spacing-lg\)/max(calc(var(--spacing)*6)/g" \
 -e "s/max\(var\(--spacing-md\)/max(calc(var(--spacing)*4)/g" \
 -e "s/var\(--spacing-xl\)/var(--spacing)*8/g"
```

`3xl` and `2xl` run first so the longest suffix always wins. `app/` needs no sweep: it contains
**zero** occurrences (verified — the scan above over `app` returns nothing, and `app/globals.css`
only *declares* the keys, at lines 69–76).

**Executed on an isolated copy of `components/` in the scratchpad. Output, pasted:**

```
--- survivors of  \b[a-z-]+-(hair|xs|sm|md|lg|xl|2xl|3xl)\b  (excluding rounded-/text-body-sm):
components/organisms/cookie-consent.tsx:85:max-w-lg
components/organisms/journey-form.tsx:238:max-w-md
components/organisms/ad-manager.tsx:24:max-w-3xl
components/organisms/calculator-views.tsx:73:max-w-3xl
--- survivors of  var(--spacing-  :
(none)
--- files changed: 22
```

Exactly the four intended survivors, and all five `var()` sites converted. The five converted lines,
checked against `design.md` §2.2 character by character:

```
cookie-consent.tsx:44   bottom-[max(calc(var(--spacing)*6),env(safe-area-inset-bottom))] left-6 right-6
cookie-consent.tsx:160  bottom-[max(calc(var(--spacing)*4),env(safe-area-inset-bottom))]
calculator-views.tsx:41 bottom-[max(calc(var(--spacing)*4),env(safe-area-inset-bottom))] sm:bottom-8
calculator-views.tsx:65 pt-[calc(var(--header-height)+var(--spacing)*8)] pb-16 px-4 sm:px-6 lg:px-8
calculator-layout.tsx:18 lg:top-[calc(var(--header-height)+var(--spacing)*8)]
```

All five match §2.2's "Intended expression" column exactly.

> **Note for G6, so nobody flags it as a scope breach:** `cookie-consent.tsx:44` is the banner that
> `spec.md` § Out of scope and `legal.md` §4 both say to leave alone. The sweep *does* touch that
> line — `left-lg right-lg` and one `var()` read. That is correct and required: the prohibition is
> on editing its **`max-w-4xl`** and its behaviour, and neither changes. `max-w-4xl` is untouched.

### 4.2 What proves nothing moved — two independent proofs, both required

AC6 is the hardest criterion in the spec. One check is not enough, and the screenshot comparison the
spec already rejects is not one of them.

**Proof A — the substitution proof (`scripts/spacing-migration-proof.mjs`). Cheap, total, offline.**

For every `.tsx` under `components/`, it reads the pre-migration content out of git and the
post-migration content off disk, asserts the **line counts are equal**, and asserts that applying
the forward mapping to line *i* of the old file yields line *i* of the new file, **byte for byte**.
This proves the entire diff is nothing but the sanctioned substitution: a stray edit, a "tidied"
value, a collapsed gap, a reordered class, an inserted line or a typo all fail it, by construction
and without a browser. This is the check that makes a 129-site sweep reviewable.

Run against the scratchpad copy before writing this plan:

```
PROOF OK — every changed line is exactly the sanctioned substitution
```

**Proof B — the geometry diff (`scripts/geometry-dump.mjs`). AC6's actual criterion.**

Playwright, production build, `/` and `/custo-da-hora` × 390×844 and 1440×900 × light and dark.
Walks every element inside `header`, `main` and `footer` and records
`getBoundingClientRect()` → `{x, y, width, height}`, rounded to 2 decimals.

**Elements are keyed by structural path** — `header>div:nth-child(1)>div:nth-child(2)>h1` — and
never by class name, id or text, because class names are exactly what this change rewrites. The DS4
stack (T4) changes no DOM structure, only two `className`s, so every path is stable across both
dumps.

`--diff` compares two dumps and exits non-zero on any delta, **except** inside the four subtrees
AC2/AC3 name, which are allowed and printed separately so a reviewer reads what changed rather than
trusting a silent filter.

Neither proof replaces the other: A cannot see a cascade effect, B cannot see an edit that happens
to be geometrically neutral.

### 4.3 D2's mechanism — decided here, compiled here

**Ruled: render both glyphs server-side; the `dark:` variant decides `display`. No mount guard, no
`useEffect`, no `suppressHydrationWarning`, no skeleton, no fade.**

`design.md` §7.1 clauses 1 and 2 eliminate the mount-guard family by consequence: a guard renders
the resting state from React state the server does not have, so its first frame is either a
placeholder (clause 2) or the wrong glyph in dark (clause 1). `suppressHydrationWarning` is barred
outright by `spec.md` § Non-goals. What remains is a paint-time decision, and the only thing
available at paint time is the `.dark` class the `next-themes` pre-paint script writes before the
first frame. `app/globals.css:3` already declares
`@custom-variant dark (&:where(.dark, .dark *))`.

`display` rather than `opacity` or `visibility`, so the hidden glyph contributes no box and clause 3
(zero CLS) holds by construction.

**The cascade is compiled, not assumed** (lesson 017 — the rule that caught the `--container-*`
non-remedy applies to every remedy, including mine). Tailwind 4.3.3, the version in this tree,
against this repository's own `@custom-variant` line:

```
@layer utilities {
  .block  { display: block; }
  .hidden { display: none; }
  .dark\:block:where(.dark, .dark *)  { display: block; }
  .dark\:hidden:where(.dark, .dark *) { display: none; }
}
```

`:where()` contributes **zero** specificity, so `.hidden` and `.dark\:block:where(…)` are both
`0-1-0` and the winner is decided by source order — and the generator emits the variant rules
**after** the plain ones. So inside `.dark`, `dark:block` beats `hidden`. That is the whole fix, and
it is the output that establishes it rather than the documentation.

**The click handler must stop reading `resolvedTheme` too.** With `defaultTheme="system"`,
`theme` is the string `"system"` for a user who has never chosen, so neither `theme` nor a
`setTheme` updater callback can tell light from dark. `resolvedTheme` can — but re-introducing it
into the component is re-introducing the read this fix exists to remove, and the next agent will not
know which reads are safe. **The handler reads the DOM class instead**, which is unambiguous, has no
SSR half, and is exactly what `next-themes` writes: verified in
`node_modules/next-themes/dist/index.js`, which with `attribute="class"` does
`classList.remove("light","dark")` then `classList.add(resolved)` on `document.documentElement`.

---

## 5. Tasks

**Ordering rule and its one stated exception.** `pnpm check` (lint + typecheck + `vitest run`) and
`pnpm build` are green after **every** task below, without exception. `pnpm e2e` is **deliberately
red from the end of T2 until T7**, because AC1 and AC8 require the new checks to be seen failing
against the unfixed tree and `spec.md`'s § Ruling refuses an assertion that has never been red
(lesson 012). That red window is the deliverable, not a broken build: it is why T2 comes before T5,
and it is why no commit between T2 and T7 may be pushed on its own.

**Standing prohibitions, binding on every task.** No token *value* changes. No `--container-*`
declaration. No new token, type step, curve, elevation level, colour role or breakpoint. No
pt-BR string added, removed or reworded — including the four footer paragraphs, which must stay
**byte-identical** (AC10, `legal.md` §9, L1). Nothing under `lib/` or `hooks/` is touched (AC11).
No new npm dependency. No `useReducedMotion`, no motion added, removed or retimed. No
`suppressHydrationWarning`. No `@ts-ignore`, no `any`, no `!`. Never assert a Tailwind class string
in a test.

---

### T1 — Point the suite at the production build and add the dark project

- **Files:** `playwright.config.ts` (edit)
- **Depends on:** none
- **Reuse:** the existing `storageState`, `projects` and `use` blocks — edit in place, do not restructure.
- **What to build:**

  1. **Port, read once at the top of the file**, so a concurrent agent's server can never collide
     with the suite (lesson 013, blocker B1):

     ```ts
     const PORT = process.env.PORT ?? "3000";
     const BASE_URL = `http://localhost:${PORT}`;
     ```

     Use `BASE_URL` for `use.baseURL`, for `webServer.url`, **and** for the `storageState`
     `origins[0].origin`, which is currently the hard-coded string `"http://localhost:3000"` and
     will silently stop seeding `localStorage` if the port moves.

  2. **`webServer.command` is the production build in both environments** (AC9, scope item 5):

     ```ts
     command: process.env.CI ? "pnpm start" : "pnpm build && pnpm start",
     ```

     CI already runs `pnpm build` in its own cached step (`.github/workflows/ci.yml:129`), so it
     only starts. Locally the build runs every time — deliberately: a `.next` left over from a
     previous branch serving a stale page is the same class of divergence this spec exists to close.
     Raise `webServer.timeout` from `120_000` to `300_000` to cover the build.

  3. **Environment parity with CI**, via `webServer.env` (not a shell prefix — `env` is
     cross-platform and applies to the build as well as to the server, which matters because
     `NEXT_PUBLIC_*` is inlined at build time). These are exactly the three values
     `.github/workflows/ci.yml:83-86` sets:

     ```ts
     env: {
       NEXT_PUBLIC_GA_ID: "G-TEST12345",
       NEXT_PUBLIC_ENABLE_ADS: "true",
       NEXT_PUBLIC_ADSENSE_ID: "ca-pub-0000000000000000",
     },
     ```

     Without `NEXT_PUBLIC_ENABLE_ADS=true`, `components/organisms/ad-manager.tsx:21` returns `null`
     and AC3's ad-slot measurement has nothing to measure locally while passing in CI.

  4. **A fourth project, and only a fourth project** (scope item 4; `spec.md` § Non-goals bars any
     other). Append after `Mobile Safari`:

     ```ts
     {
       name: "Dark production",
       testMatch: "**/dark-hydration.spec.ts",
       use: { ...devices["Desktop Chrome"], colorScheme: "dark" },
     },
     ```

     Add `testIgnore: "**/dark-hydration.spec.ts"` to the three existing projects, so the dark spec
     runs once rather than four times.

- **Tests:** none of its own — this task is the instrument.
- **Done when:** `pnpm lint` clean, `pnpm typecheck` clean, and
  `PORT=3210 pnpm e2e --project=chromium tests/e2e/responsive.spec.ts` runs to completion against a
  server the config built and started itself. Paste that run's summary line into `reports/`.
  **Closes blocker B1.** Advances AC9.

---

### T2 — The three checks that must be red before anything is fixed

- **Files:**
  `tests/e2e/disclosure-legibility.spec.ts` (create),
  `tests/e2e/dark-hydration.spec.ts` (create),
  `tests/e2e/responsive.spec.ts` (edit — one test appended)
- **Depends on:** T1
- **Reuse:** the `expect`/`test` imports and the `test.describe` idiom already in
  `tests/e2e/responsive.spec.ts`. Do not add a helper module — three specs do not need one.

- **What to build — `tests/e2e/disclosure-legibility.spec.ts`:**

  Two disclosure surfaces are asserted here: **DS1** and **DS4**, the two `legal.md` §10 names as
  **critical** and the two `legal.md` §3 requires to be seen red. DS2 and DS3 are in the LR domain
  but are not asserted by this spec — DS2 renders only after a form is filled, and DS3 is blocker
  **B6**, which `labor-law-analyst` measures at G6. Say so in a comment naming B6, so the absence
  reads as a decision rather than an oversight.

  Selectors, **structural and class-free** (a class assertion is barred by `AGENTS.md` §8, and every
  class in this subtree is about to change):

  | Surface | Locator |
  |---|---|
  | DS1 | `page.locator("#main-content > footer")` |
  | DS4 | `page.locator("dialog[aria-labelledby='privacy-settings-title'] > div")` |

  Matrix: routes `/` and `/custo-da-hora` × viewports `390×844` and `1440×900` × themes `light` and
  `dark`. Set the viewport with `page.setViewportSize`; set the theme with
  `page.emulateMedia({ colorScheme })`.

  **Reaching DS4:** `playwright.config.ts`'s `storageState` pre-seeds
  `workload_cookie_consent`, which hides the banner. Clear it before navigating —
  `await page.addInitScript(() => localStorage.removeItem("workload_cookie_consent"))` — then
  `await page.getByRole("button", { name: "Configurar" }).click()` and wait for the dialog.

  **LR1 — floor on rendered width.** For each surface:

  ```
  el.getBoundingClientRect().width  >=  Math.min(320, availableContentWidth)
  ```

  where `availableContentWidth` is the parent element's content-box width
  (`parent.clientWidth` minus its computed horizontal padding). Expected at 390: DS1 **358**, DS4
  **358**. Expected at 1440: DS1 **768**, DS4 **512**. Today: **64** and **≈24**.

  **LR4 clause 1 — DS4 only.** `getBoundingClientRect().width >= Math.min(480, viewportWidth - 32)`,
  **on the panel**, as ruled in §3/B2 above. Write the ruling in a comment naming `legal.md` §4 and
  blocker B2 verbatim, because `labor-law-analyst` has to be able to find and confirm it at G6.
  Expected: **358** at 390 (attained exactly — `design.md` §3.3 explains why there is no clearance
  available above it), **512** at 1440.

  **LR4 clause 2 — DS4 only.** Every choice control — the telemetry `role="switch"`, *Salvar
  Preferências*, and the close control — is fully inside the viewport **and** fully inside the
  panel's own bounds, with a non-empty accessible name. Query by role and name, never by class.

  **LR2 — floor on measure.** For each surface, and for DS1 additionally **per `<p>`**:

  ```js
  const lineBoxes = /* Range over the element's text content → getClientRects(),
                       deduplicated by Math.round(rect.top) */;
  const characters = el.textContent.trim().length;
  if (lineBoxes > 1) expect(characters / lineBoxes).toBeGreaterThanOrEqual(40);
  ```

  The `lineBoxes > 1` branch is blocker **B3**'s ruling: an element whose whole text occupies one
  line box satisfies LR2 by definition. Write it with a comment naming `legal.md` LR2 and B3 — it is
  a legal reading, and a reading with no comment becomes an unexplained `if` the next reviewer
  deletes. Expected after the fix: DS1's longest `<p>` scores **57** at 390 and **86** at 1440.
  Today: **≈9**.

  **LR3.** For each surface, on first paint with no interaction beyond the DS4 click: present in the
  server-rendered HTML (assert against `(await page.request.get(route)).text()`, not the hydrated
  DOM — that is what "server-rendered" means and it is the clause a client-only fix would break),
  `visibility: visible`, `opacity !== "0"`, `display !== "none"`, not `[hidden]`, not inside
  `details:not([open])`, not inside `[aria-expanded="false"]`, and not off-screen
  (`getBoundingClientRect().right > 0 && .bottom > 0`).

- **What to build — `tests/e2e/dark-hydration.spec.ts`** (runs only under the `Dark production`
  project, so the context is already `colorScheme: "dark"`):

  For each of `/` and `/custo-da-hora`:

  ```ts
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.goto(route, { waitUntil: "networkidle" });
  expect(pageErrors).toEqual([]);
  ```

  Assert on the **array**, not on its length: a failure that prints `["Minified React error #418…"]`
  tells the reviewer what happened; `expect(0).toBe(1)` does not.

  Add `design.md` §7.1's four clauses in the same file, so AC8 and D-AC5 cannot pass separately:

  - **Clause 1 — the glyph is theme-correct at first paint.** Assert the *server* HTML, which is the
    only artefact that exists before paint: `(await page.request.get(route)).text()` contains both
    `data-theme-icon="sun"` and `data-theme-icon="moon"` (the attributes T7 adds), and in the loaded
    page `page.locator('[data-theme-icon="sun"]')` computes `display !== "none"` while
    `[data-theme-icon="moon"]` computes `display === "none"`. **A computed-style read in a real
    browser** — this is a cascade assertion and `AGENTS.md` §8 forbids proving it in jsdom or with
    `toHaveClass`.
  - **Clause 2 — no substitution.** Count `header [data-theme-icon]` immediately after
    `domcontentloaded` and again after `networkidle`: **2 both times**, and the `display` pair is
    unchanged between the two reads.
  - **Clause 3 — no layout shift.** The theme toggle button's `getBoundingClientRect()` is identical
    at both moments, and a `PerformanceObserver` on `layout-shift` records no entry whose
    `sources[].node` is inside `<header>`.
  - **Clause 4 — the accessible name never changes.**
    `getByRole("button", { name: "Alternar tema" })` resolves before and after hydration, and no
    `aria-live` region exists inside `<header>`.

  Add the same file's light-theme counterpart with `page.emulateMedia({ colorScheme: "light" })`:
  moon visible, sun hidden, zero `pageerror`.

- **What to build — the floor in `tests/e2e/responsive.spec.ts`:** one test appended to the existing
  `describe`, nothing restructured (`spec.md` § Out of scope).

  ```
  for each viewport in [390×844, 1440×900]:
    collect every element under `main, footer` whose **own** text — the concatenation of its direct
    child text nodes, trimmed — is longer than 80 characters, and which has at least one client rect;
    assert getBoundingClientRect().width >= 240 for every one of them.
  ```

  **Direct child text nodes, not `textContent`** — otherwise every ancestor container matches and
  the test reports the page instead of the defect. **240px**, carried unchanged from `spec.md`'s
  open question: below the 310px narrowest legitimate text column at 390 (`design.md` §7 math) and
  far above the 64px defect, so it discriminates without flagging a healthy layout. Report failures
  as `{ tag, width, text: text.slice(0, 60) }`, so the red run names the element (lesson 016).

- **Tests:** these three files *are* the tests.
- **Done when:** all three run and **fail**, against this unfixed tree, and the failure output is
  pasted into `reports/qa.md`:
  - `PORT=3210 pnpm e2e --project=chromium tests/e2e/disclosure-legibility.spec.ts` → LR1 and LR2
    fail, naming **DS1** and **DS4**, at **390** and at **1440**. (AC1, `legal.md` §3)
  - `PORT=3210 pnpm e2e --project="Dark production"` → **≥1** `pageerror`, quoted verbatim. (AC8, first half)
  - `PORT=3210 pnpm e2e --project=chromium tests/e2e/responsive.spec.ts` → the floor fails on the
    `<footer>` of `calculator-views.tsx` at 390 and 1440. (AC1)
  - `pnpm check` and `pnpm build` still clean.

  **A green run here is a failure of this task**, and it means the check is measuring something
  other than the defect. Do not adjust a threshold to make it red; return it to the tech-lead.

---

### T3 — Falsify or confirm D2's cause, in writing, before any source file is edited

- **Files:** none. **This task edits nothing.** Its output is evidence.
- **Depends on:** T1
- **Reuse:** the Playwright driver already proven in this tree (`@playwright/test` 1.63.0, chromium 1243).
- **What to build:** a diagnosis, run in this order, with every output pasted into `reports/qa.md`:

  1. **Production, dark.** `NEXT_PUBLIC_ENABLE_ADS=true pnpm build && PORT=3210 pnpm start`; a
     chromium context with `colorScheme: "dark"`; `page.on("pageerror")` and
     `page.on("console")` both recording; load `/` and `/custo-da-hora`. Record the error text.
     **Expected: minified React error #418 on both routes.**
  2. **Production, light.** Same server, `colorScheme: "light"`. **Expected: zero errors.** This is
     the step that establishes the defect is theme-dependent rather than universal, and it is the
     one a diagnosis usually skips.
  3. **Development, dark.** `PORT=3210 pnpm dev`, same dark context. React's development build
     prints the hydration mismatch **unminified**, with the component stack and the differing
     content. Paste that message in full — it is the only artefact that *names the node*, which is
     what AC7 asks for.
  4. **Development, light.** Same. Expected: zero.

- **The decision rule, so this task has an outcome and not an opinion:**
  - If step 3 names the theme-toggle subtree of `components/organisms/app-header.tsx`, the
    hypothesis is **confirmed**: write "confirmed, `app-header.tsx:66`" plus the quoted message into
    `reports/qa.md`, and proceed to T4.
  - If step 3 names **anything else**, or names nothing identifiable, the hypothesis is **cleared**.
    **Stop. Edit no file.** Write the finding into `STATUS.md` § Blockers and return it to the
    tech-lead (`spec.md` scope item 3, AC7; `AGENTS.md` §4 rule 7). T7 does not start.
  - If step 1 produces **no** error, D2 does not reproduce in this tree and that is itself a finding
    for the tech-lead — it is not a reason to proceed on the hypothesis anyway.

- **Tests:** none.
- **Done when:** `reports/qa.md` contains all four runs' outputs and an explicit one-line verdict.
  **A fix committed without this evidence fails G6 regardless of whether the error stops** (AC7).
  Advances AC7.

---

### T4 — The "before" geometry dump, and the two proof scripts

- **Files:** `scripts/geometry-dump.mjs` (create), `scripts/spacing-migration-proof.mjs` (create)
- **Depends on:** T1
- **Reuse:** `@playwright/test`'s `chromium` export. No new dependency, no pixel-diff library.
- **What to build:**

  **`scripts/geometry-dump.mjs`, two subcommands.**

  ```
  node scripts/geometry-dump.mjs --out <file.json> [--base-url http://localhost:3210]
  node scripts/geometry-dump.mjs --diff <before.json> <after.json>
  ```

  `--out` iterates `/` and `/custo-da-hora` × `390×844` and `1440×900` × `light` and `dark`
  (`page.emulateMedia({ colorScheme })`), waits for `networkidle`, and for each of the eight
  combinations walks **every element inside `header`, `main` and `footer`** — exactly AC6's wording —
  recording:

  ```js
  { path, x, y, width, height }   // each number rounded with Number(v.toFixed(2))
  ```

  **`path` is the structural path from the dump root**, built by walking up and emitting
  `tag:nth-child(n)` at each step — for example `main>div:nth-child(2)>footer:nth-child(1)`.
  **Never key an element by class, id or text.** Class names are precisely what this change
  rewrites, and a dump keyed by class compares two different populations and reports zero deltas.

  `--diff` joins the two dumps on `(combination, path)` and exits non-zero on any of: a path present
  on one side only, or a delta above **0.01px** in any of `x`, `y`, `width`, `height`. Deltas whose
  path is inside the **DS1 footer subtree** are collected into a separate "permitted" list, printed
  in full and **not** counted as failures (AC6's named exemption). Every other delta is a rejection,
  printed with its path and both values.

  > **What the AC6 dump does not cover, stated so nobody assumes it does.** The ad slot renders in
  > `app/layout.tsx` outside `header`/`main`/`footer`; DS4 and the reset dialog live in closed
  > `<dialog>` elements with no boxes at rest. Those three are AC3's business and are measured
  > directly in T9, not by this dump. The dump's exemption list therefore has exactly **one** entry.

  **`scripts/spacing-migration-proof.mjs`** — §4.2 Proof A, argument-free, run from the repo root:

  1. Read the pre-migration content of every `components/**/*.tsx` from git
     (`git show <ref>:<path>`, `ref` defaulting to `HEAD` and overridable with `--ref`), and the
     current content from disk.
  2. Assert equal line counts.
  3. For each line index, assert `forward(before[i]) === after[i]` **byte for byte**, where
     `forward` applies exactly the eleven substitutions of §4.1 — same regexes, same order, same
     mapping `hair→0.5, xs→2, sm→3, md→4, lg→6, xl→8, 2xl→12, 3xl→16`.
  4. Print every deviation as `file:line` with both strings, and exit non-zero.

  It printed this against the rehearsal copy, and must print it again in T5:

  ```
  PROOF OK — every changed line is exactly the sanctioned substitution
  ```

  **`cookie-consent.tsx` is exempted from step 3 by `--ref`, not by a special case:** T6 changes two
  `className`s there for a reason the mapping does not describe, so T5 runs the proof **before** T6
  and the recorded OK belongs to the migration commit. Do not add an ignore list to the script.

  **Run the "before" dump now**, before any source file changes:

  ```bash
  NEXT_PUBLIC_ENABLE_ADS=true NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000 NEXT_PUBLIC_GA_ID=G-TEST12345 pnpm build
  PORT=3210 pnpm start &
  node scripts/geometry-dump.mjs --out .specs/0005-tailwind-theme-collision-and-dark-hydration-hotfix/evidence/geometry-before.json --base-url http://localhost:3210
  ```

  The same env on both sides of the diff, every time — a dump taken with ads off and compared
  against one taken with ads on reports a difference the code did not make.
  `evidence/` is gitignored, which is correct: the dumps are large and regenerable, and the
  *diff output* is what goes into `reports/qa.md`.

- **Tests:** none. These are one-shot verification tools, not shipped behaviour; a test for the test
  is the over-engineering `refactor-scout` will flag. Their proof is that Proof A must print `OK`
  on an unchanged tree and must print a deviation for a hand-edited line — demonstrate both once and
  paste both outputs.
- **Done when:** `pnpm lint` clean (Biome covers `scripts/`), `node scripts/spacing-migration-proof.mjs`
  prints `PROOF OK` against the untouched tree, and `geometry-before.json` exists with all eight
  combinations non-empty. Advances AC6.

---

### T5 — Delete the named spacing namespace, migrate its 129 consumers, and lock it shut

- **Files:**
  `app/globals.css` (edit — **deletions only**),
  22 files under `components/` (edit — **class strings only**),
  `__tests__/spacing-guards.test.ts` (create)
- **Depends on:** T4
- **Reuse:** the file-reading idiom already in `__tests__/copy-guards.test.ts` — same shape, same
  `readdirSync(..., { recursive: true })` walk. Do not write a new helper module for it.

- **What to build — step 1, the guard test, written and run FIRST, against the unfixed tree.**

  `__tests__/spacing-guards.test.ts`, five cases, each stated over its **boundary** and never over
  the sites known to be broken today (lesson 006):

  | # | Assertion | Today |
  |---|---|---|
  | 1 | Every `--spacing-<suffix>:` declaration **anywhere in `app/globals.css`** has a suffix matching `/^\d+(\.\d+)?$/`. The bare `--spacing:` multiplier has no suffix and is unaffected by the regex. | **fails — 8 declarations, lines 69–76** |
  | 2 | Zero `var(--spacing-<non-numeric>)` reads across every `.ts`/`.tsx`/`.css` under `app/` and `components/`. | **fails — 5** |
  | 3 | Zero spacing utilities with a named suffix across the same boundary, matching `\b(p\|px\|py\|pt\|pr\|pb\|pl\|m\|mx\|my\|mt\|mr\|mb\|ml\|gap\|gap-x\|gap-y\|space-y\|space-x\|inset\|inset-x\|inset-y\|top\|right\|bottom\|left)-(hair\|xs\|sm\|md\|lg\|xl\|2xl\|3xl)\b`. `:` is a non-word character, so `sm:px-lg` is matched without a variant clause. `max-w`/`w`/`min-w`/`basis`/`size` are **deliberately absent** — those resolve through `--container-*` and must keep their names. | **fails — 125** |
  | 4 | `DESIGN.md` contains no `--spacing-<non-numeric>` occurrence, anywhere in the file. | **fails — 8** |
  | 5 | Every key under `DESIGN.md`'s YAML frontmatter `spacing:` block parses as a number. | **fails — 8** |

  Cases 4 and 5 together are blocker **B5**'s ruling: they are AC12's verification, over the
  boundary rather than over command V3's pattern. Case 1 is `design.md` §6.5's Numeric Scale Rule,
  which the designer adopted **as part of the rule, not as an implementation detail of it** — so the
  test's failure message must say what it means, not just which regex matched:
  `"--spacing-<name> silently overrides the container-scale entry of the same name; see DESIGN.md, the Numeric Scale Rule"`.

  Run `pnpm test __tests__/spacing-guards.test.ts` now, paste all five failures into
  `reports/qa.md`. **This is the red run that earns the guard its place** (lesson 012, `spec.md`
  § Ruling clause 3). Do not skip it because the outcome is obvious.

- **What to build — step 2, `app/globals.css`.** Delete lines **69–76** — the eight
  `--spacing-hair|xs|sm|md|lg|xl|2xl|3xl` declarations — and **nothing else**. Keep
  `--spacing: 0.25rem` on line 68.

  **Add no `--container-*` declaration.** Compiled twice against Tailwind 4.3.3: with the spacing key
  gone, `max-w-3xl` resolves from `node_modules/tailwindcss/theme.css` unaided (`design.md` §2.1).
  A declaration is dead weight that reopens a settled question.

  The diff to this file is **deletions plus nothing** — D-AC7. Do not touch the `@theme` radius,
  text, colour, shadow, blur, duration or ease blocks; do not touch `--container-app`,
  `--header-height`, `--breakpoint-wide`; do not touch the `@media` overrides in `@layer base` that
  reassign `--header-height` and `--container-app`; do not touch the three `@utility` blocks; and
  **leave the raw `0.75rem` in the `dialog > div` starting transform exactly as it is**
  (`design.md` §9.3 N2 — rewriting it to `calc(var(--spacing)*3)` is value-preserving tidying,
  which is precisely what AC6 cannot absorb and `spec.md` § Non-goals forbids).

- **What to build — step 3, the sweep.** Run §4.1's command **verbatim**, once, from the repository
  root. Do not hand-edit a file before or after it. Do not add a prefix to the list. If a file
  needs an edit the sweep did not make, that is a finding for the tech-lead, not a keystroke.

  `app/` needs no sweep — it holds **zero** occurrences.

- **What to build — step 4, the proofs.** In this order:

  ```bash
  node scripts/spacing-migration-proof.mjs            # must print: PROOF OK
  pnpm test __tests__/spacing-guards.test.ts          # must be green, all five cases
  grep -rnE -- '--spacing-(hair|xs|sm|md|lg|xl|2xl|3xl)' app components   # V1 — must return 0 (13 today)
  grep -rnoE '\b(max-w|min-w|w|basis|size)-(hair|xs|sm|md|lg|xl|2xl|3xl)\b' app components  # V2 — must still return the SAME 4
  grep -rn 'var(--spacing-' app components            # V4 — must return 0 (5 today)
  ```

  **V2 must return 4, not 0.** Those four `max-w-*` sites are repaired *by the deletion* and must
  keep their names (`design.md` §3.2–§3.5). A V2 of 0 means the sweep ate the container utilities
  and the fix has been undone while looking like it succeeded.

- **Tests:** `__tests__/spacing-guards.test.ts` (above). No component test changes: not one
  component's rendered behaviour, role, name or text changes in this task, and `AGENTS.md` §8 bars
  asserting a class string — so there is nothing new for a unit test to see. The rendered *geometry*
  is T9's business.
- **Done when:** `PROOF OK`; the guard test green on all five cases; V1 = 0, V2 = 4, V4 = 0;
  `pnpm check` clean; `pnpm build` clean. Advances **AC4, AC5, AC12 (in part), D-AC1, D-AC2, D-AC7**.

---

### T6 — Stack the two granular-consent rows below `sm`

- **Files:** `components/organisms/cookie-consent.tsx` (edit — **two `className` strings, nothing else**)
- **Depends on:** T5
- **Reuse:** the rows as they stand. No new component, no extracted sub-component, no prop.
- **What to build:**

  This is blocker **B4**: `legal.md` LR2 compels it and `AGENTS.md` §4 rule 8 puts it above the scope
  sentence, which `product-manager` amends in parallel (§3/B4). At a 258px row content box the two
  captions render **≈20** and **≈19** characters per line; stacked they render on **one line box**
  each, at 41 and 37 characters (`design.md` §3.3.1).

  Two edits, each replacing `flex items-center` with the stack pair and **changing nothing else in
  the string**:

  | Line (post-T5) | Today | After |
  |---|---|---|
  | Essential row | `flex min-h-11 items-center justify-between gap-4 p-4 rounded-lg bg-surface-sunken border border-line` | `flex min-h-11 flex-col items-start justify-between gap-4 p-4 rounded-lg bg-surface-sunken border border-line sm:flex-row sm:items-center` |
  | Telemetry row | `flex items-center justify-between gap-4 p-4 rounded-lg bg-surface-sunken border border-line` | `flex flex-col items-start justify-between gap-4 p-4 rounded-lg bg-surface-sunken border border-line sm:flex-row sm:items-center` |

  `gap-4` (16px) is unchanged and becomes the vertical gap below `sm`. `shrink-0` stays on both
  control clusters. The `h-11 w-11` telemetry switch stays 44×44 (the Forty-Four Rule). At `sm` and
  above — therefore at 1440 — the computed layout is **identical to today's**: `sm:flex-row
  sm:items-center` restores exactly the pair being replaced. Nothing else in the file changes: not a
  string, not the `role="switch"`, not `aria-checked`, not `aria-labelledby`, not the `motion.span`
  knob, not its animation, not a token.

  **Do not touch `cookie-consent.tsx:44`**, the banner: `spec.md` § Out of scope and `legal.md` §4
  both bar it, and its `max-w-4xl` is correct today. T5's sweep already rewrote its `left-lg
  right-lg` and one `var()` read, which is the token migration and not an edit to the banner.

- **Tests:** `__tests__/cookie-consent.test.tsx` (edit) — the existing suite must still pass
  unchanged, which is the assertion that matters: **no role, no accessible name, no text, no
  `aria-checked` transition changes.** Add nothing that asserts a class string. The stacked geometry
  is a cascade fact and is asserted in a real browser by T2's LR2 case at 390, which flips from red
  to green here.
- **Done when:** `pnpm test __tests__/cookie-consent.test.tsx` green, `pnpm check` clean, and
  `PORT=3210 pnpm e2e --project=chromium tests/e2e/disclosure-legibility.spec.ts` shows DS4's LR1,
  LR2 and LR4 cases **green at 390 and 1440, both themes, both routes**. Advances **LR2, LR4,
  AC3 (DS4), D-AC4**.

---

### T7 — Fix D2: both glyphs server-rendered, the `.dark` class decides

- **Files:** `components/organisms/app-header.tsx` (edit), `__tests__/app-header.test.tsx` (edit)
- **Depends on:** T3 **confirming** the hypothesis, and T5
- **Reuse:** `Button` (`components/atoms/button.tsx`, `variant="ghost" size="icon"`), `IconSun` and
  `IconMoon` from `@tabler/icons-react`, `safeGAEvent` from `@/lib/analytics`. Nothing new is
  imported and nothing new is installed.
- **What to build:**

  **If T3 cleared the hypothesis, this task does not run.** Return to the tech-lead (AC7).

  1. **Stop destructuring `resolvedTheme`.** Line 13 becomes `const { setTheme } = useTheme();`.
     A value the server does not have must not be read during render — that is the defect, and
     leaving the binding in place leaves the next agent a loaded gun.

  2. **Render both glyphs**, replacing the ternary at lines 66–70 verbatim with:

     ```tsx
     <IconMoon className="w-5 h-5 dark:hidden" aria-hidden="true" data-theme-icon="moon" />
     <IconSun className="hidden w-5 h-5 dark:block" aria-hidden="true" data-theme-icon="sun" />
     ```

     `w-5 h-5` is unchanged from today, so the 20px glyph inside the 44×44 target is unchanged and
     clause 3's CLS contribution stays **0.000**. `display`, never `opacity` or `visibility`, so the
     hidden glyph contributes no box (`design.md` §7.2). Both stay `aria-hidden="true"`; the
     accessible name remains the static `aria-label="Alternar tema"` on the `Button`, so clause 4
     holds and **no `aria-live` region is introduced**.

     The `data-theme-icon` attributes are the stable, class-free selector `design.md` §7.3 says this
     criterion needs — "the one clause that needs a human or a stable selector rather than a diff".
     They are the hook for T2's computed-`display` assertions, and they are why those assertions do
     not have to name a Tailwind class, which `AGENTS.md` §8 forbids.

     Compiled proof that the pair resolves correctly, against Tailwind 4.3.3 and this repository's
     own `@custom-variant dark (&:where(.dark, .dark *))`, is in §4.3. `:where()` contributes zero
     specificity and the generator emits variant rules after plain ones, so `dark:block` beats
     `hidden` inside `.dark`.

  3. **The click handler stops reading React state.** Replace the `onClick` body with:

     ```ts
     const newTheme = document.documentElement.classList.contains("dark") ? "light" : "dark";
     setTheme(newTheme);
     safeGAEvent("toggle_theme", { theme: newTheme });
     ```

     Verified in `node_modules/next-themes/dist/index.js`: with `attribute="class"` it does
     `classList.remove("light","dark")` then `classList.add(resolved)` on `document.documentElement`.
     **Do not use `setTheme`'s updater form** — with `defaultTheme="system"` the value it receives is
     the literal string `"system"` for any user who has never chosen, so `prev === "dark"` is false
     for a dark-system visitor and the first click sets `"dark"` again, doing nothing. That is a real
     regression that a jsdom test with a mocked `useTheme` cannot see.

  4. **Nothing else changes.** Not `disableTransitionOnChange` in `app/layout.tsx:66`, which is
     load-bearing and stays (`design.md` §7.2). Not `suppressHydrationWarning`. No `useEffect`, no
     mounted state, no skeleton, no fade, no theme-transition animation (`spec.md` § Non-goals).

- **Tests — `__tests__/app-header.test.tsx`:** the `themeState.resolvedTheme` fixture disappears with
  the value it mocked. Keep the `next-themes` mock, reduced to `{ setTheme: vi.fn() }`, and keep
  every existing non-theme case unchanged.

  | Case | Assertion |
  |---|---|
  | Both glyphs are server-rendered | `renderToString(<AppHeader … />)` contains `data-theme-icon="moon"` **and** `data-theme-icon="sun"`. This is LR3-shaped and is the clause a client-only fix breaks. |
  | Neither glyph is announced | both `[data-theme-icon]` nodes carry `aria-hidden="true"`; the toggle resolves by `getByRole("button", { name: "Alternar tema" })`. |
  | No substitution across a click | the button contains exactly **two** `[data-theme-icon]` nodes before and after `await user.click(...)`, and the accessible name is unchanged. Clause 2, as far as jsdom can see it. |
  | Light → dark | with no `dark` class on `document.documentElement`, clicking calls `setTheme("dark")` and `safeGAEvent("toggle_theme", { theme: "dark" })`. |
  | Dark → light | with `document.documentElement.classList.add("dark")` in the arrange step, clicking calls `setTheme("light")` and `safeGAEvent("toggle_theme", { theme: "light" })`. Remove the class in `afterEach`. |
  | Keyboard path | `await user.tab()` to the toggle and `await user.keyboard("{Enter}")` produces the same `setTheme` call as the click. |

  **Assert no class string and do not test `display` here.** Which glyph is visible is a cascade
  question, jsdom has no Tailwind stylesheet, and `AGENTS.md` §8 requires a computed-style read in a
  real browser — which is T2's dark-hydration spec.

  Reduced motion: this element has **no** animation, by design (`design.md` §5.4 — "A theme swap
  must not animate"). The reduced-motion path is therefore "no motion exists"; state it in one
  assertion that the toggle carries no `motion` wrapper, rather than leaving the row blank.

- **Done when:** `pnpm test __tests__/app-header.test.tsx` green; `pnpm check` clean; `pnpm build`
  clean; and `PORT=3210 pnpm e2e --project="Dark production"` reports **exactly 0** `pageerror` on
  both routes with all four §7.1 clauses green — the same command that reported ≥1 in T2, quoted
  side by side in `reports/qa.md`. Advances **AC7, AC8, D-AC5**.

---

### T8 — Reconcile `DESIGN.md` with the tokens that ship

- **Files:** `DESIGN.md` (edit)
- **Depends on:** T5
- **Reuse:** `design.md` §6 is the **exact replacement text**. Substitute it; do not compose,
  paraphrase, shorten or improve it. Where §6 gives a blockquote, the blockquote's content is the
  new paragraph.
- **What to build,** anchored to the lines as they stand today:

  | Anchor | Action | Source |
  |---|---|---|
  | Frontmatter `spacing:` block, **lines 138–146** | Replace the eight named keys with the eight quoted numeric keys `"0.5" "2" "3" "4" "6" "8" "12" "16"`, same px values. | `design.md` §6.7 |
  | **Line 393** — Spacing scale | Replace the whole paragraph. | `design.md` §6.1 |
  | **Line 395** — Container and gutter | Replace the whole paragraph. Note it also corrects `1600px` → `1700px` at the 17px root and `1800px` from 2560px. | `design.md` §6.2 |
  | **Line 397** — two-column split | Replace **the sticky-offset clause only**; the rest of the paragraph is untouched. | `design.md` §6.3 |
  | **Lines 401–407** — density table | Replace the five body rows. | `design.md` §6.4 |
  | **Line 417** — Eight Steps Rule | Replace, and **append the new Numeric Scale Rule** immediately after it. | `design.md` §6.5 |
  | **Lines 492, 501, 542, 559** | Four incidental mentions, replaced cell by cell. | `design.md` §6.6 |

  **Two pre-existing arithmetic corrections travel with this rewrite, and they are corrections, not
  changes** (`design.md` §6.4, ratified in `STATUS.md` § Decisions): `--container-app: 100rem` against
  the 18px root has always computed **1800px**, not the documented 1600px, and the 2560/3840 gutters
  are **36px**, not 32px, for the same reason. No pixel moves; the description of the pixels becomes
  true. AC6 is untouched by this task because this task touches no CSS.

  **Change nothing else** (`design.md` §6.8): not the `colors`, `typography`, `rounded` or
  `components` frontmatter blocks; not the Overview, Design Read and Dials, Colors, Typography,
  Elevation & Depth, Shapes or Components prose; not any named rule other than the Eight Steps Rule;
  not the `rounded` scale, whose `xs…2xl` keys are **safe** because `--radius-*` shares no namespace;
  and not the `components` block's `padding: "24px"` / `"32px"` literals, which describe rendered
  values rather than reference tokens.

- **Tests:** `__tests__/spacing-guards.test.ts` cases 4 and 5, already written in T5, flip to green
  here. Add no new test file.
- **Done when:** `pnpm test __tests__/spacing-guards.test.ts` green;
  `grep -rnE -- '--spacing-(hair|xs|sm|md|lg|xl|2xl|3xl)' DESIGN.md` returns **0** (command V3,
  8 today) — as corroboration, with the test as the criterion (blocker B5). Advances **AC12, D-AC6**.
  `product-designer` ratifies the prose at G6; `release-manager` checks it at G7.

---

### T9 — Prove that nothing moved, and measure the four repaired surfaces

- **Files:** none — `reports/qa.md` and `evidence/` only. **No source file is edited in this task.**
- **Depends on:** T5, T6, T7, T8
- **Reuse:** `scripts/geometry-dump.mjs` from T4 and the "before" dump it produced.
- **What to build:**

  **1. The "after" dump and the diff (AC6).** Same build env, same port, same command:

  ```bash
  NEXT_PUBLIC_ENABLE_ADS=true NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000 NEXT_PUBLIC_GA_ID=G-TEST12345 pnpm build
  PORT=3210 pnpm start &
  node scripts/geometry-dump.mjs --out …/evidence/geometry-after.json --base-url http://localhost:3210
  node scripts/geometry-dump.mjs --diff …/evidence/geometry-before.json …/evidence/geometry-after.json
  ```

  **Expected: exit 0, with every reported delta inside the DS1 footer subtree and printed in full.**
  Any delta outside it — one element, one pixel, one theme, one route — **is a rejection, not a
  rounding note** (AC6). Do not widen the exemption list to make it pass; a delta outside the footer
  means the migration was not 1:1 and it comes back to the tech-lead.

  Paste the diff output — both the permitted list and the empty rejection list — into
  `reports/qa.md`.

  **2. The four surfaces, measured in a real browser (AC2, AC3, LR1, LR4).** At 390×844 and 1440×900,
  on `/` and `/custo-da-hora`, in **both** themes, against the production build. `getBoundingClientRect().width`
  is the quantity; the computed `max-width` is recorded beside it as corroboration, never as the
  criterion (`legal.md` §10):

  | Surface | Locator | 390 | 1440 | `max-width` | Today |
  |---|---|---|---|---|---|
  | DS1 footer | `#main-content > footer` | **358** | **768** | `768px` | 64 |
  | DS4 panel | `dialog[aria-labelledby='privacy-settings-title'] > div` | **358** | **512** | `512px` | ≈24 |
  | Ad slot | the `div` wrapping `GoogleAd` in `app/layout.tsx` (requires `NEXT_PUBLIC_ENABLE_ADS=true`) | **390** | **768** | `768px` | 64 |
  | Reset dialog | the `ModalDialog` panel opened from `journey-form.tsx:238` | **358** | **448** | `448px` | ≈16 |

  The last two are not in T2's committed spec and are not in the AC6 dump — the ad slot lives
  outside `header`/`main`/`footer` and the reset dialog is a closed `<dialog>` at rest. They are
  measured here, once, with their numbers pasted into `reports/qa.md`. Opening the reset dialog
  means clicking the reset control in `journey-form.tsx`; find it **by accessible role and name**.

  **3. The full standing sweep (AC13).**

  ```bash
  pnpm check && pnpm build
  PORT=3210 pnpm e2e                 # all four projects, production build, green
  pnpm test:coverage                 # per-area thresholds unchanged and met
  node .agents/tools/preview.mjs --out …/evidence/preview-after
  ```

  Zero axe violations at `critical` or `serious` in **both** themes; zero console errors; zero React
  warnings. The preview screenshots are **corroboration only** — AC6 says antialiasing noise cannot
  decide a zero-diff claim, and the diff in step 1 is the criterion.

  **4. The two diffs `labor-law-analyst` reads at G6 (AC10, AC11).**

  ```bash
  git diff main -- components/organisms/calculator-views.tsx   # only className changes inside <footer>
  git diff --stat                                              # no file under lib/
  ```

  If `git diff` shows **any** change inside the four `<p>` elements of the footer — a character, a
  space, a line break — stop. That is a legal change wearing a CSS diff (L1) and it does not get
  fixed at the keyboard.

- **Tests:** none new. This task runs the ones that exist.
- **Done when:** the geometry diff exits 0 with only footer deltas; the four widths match the table
  above at both viewports, both themes, both routes; `pnpm check`, `pnpm build`, `pnpm e2e` and
  `pnpm test:coverage` all green; AC10 and AC11 diffs clean; every output pasted into
  `reports/qa.md`. Advances **AC2, AC3, AC6, AC10, AC11, AC13, D-AC3, D-AC8**.

---

## 6. Risks

| # | Risk | The signal it happened |
|---|---|---|
| R1 | The sweep eats a `--radius-*` or `--text-*` utility — `rounded-md`, `text-body-sm` — because a prefix was added to the list "for completeness". | `scripts/spacing-migration-proof.mjs` prints a deviation naming the line; or the geometry diff reports corner-radius-driven deltas across unrelated components. |
| R2 | The sweep eats the four `max-w-*` sites and the collision looks fixed while the fix has been undone. | Command **V2 returns 0 instead of 4** at the end of T5. The geometry diff would *also* pass, because 768px is 768px either way — V2 is the only cheap detector, which is why T5 names the expected count rather than "clean". |
| R3 | The geometry dump keys elements by class, silently compares two different populations, and reports a perfect zero. | The two dumps have different element counts for the same combination, or the diff reports **zero** deltas including inside the footer — which cannot be true, since the footer is the one thing that must have changed. **A wholly empty diff is a failed dump, not a pass.** |
| R4 | The before/after dumps are taken with different `NEXT_PUBLIC_ENABLE_ADS`, and the ad slot's presence or absence shows up as a page-wide `y` shift. | The diff reports a uniform `y` delta across every element below the fold on one route. Re-take both dumps with the env line copied from T4 verbatim. |
| R5 | D2's real cause is not `app-header.tsx:66`, and T7 is written against a hypothesis that T3 never actually tested. | T3's step 3 (development, dark) produces a message naming something else — or T7 lands and `pnpm e2e --project="Dark production"` still reports a `pageerror`. The remedy is to **stop**, not to add a second fix on top. |
| R6 | The dark fix passes AC8 and fails `design.md` §7.1: no console error, but the user still watches a glyph appear. | T2's clause-2 assertion sees a different `[data-theme-icon]` count, or a different `display` pair, between `domcontentloaded` and `networkidle`. This is the failure a mount guard produces, and it is invisible to a `pageerror` listener. |
| R7 | The local `webServer` now runs `pnpm build` on every `pnpm e2e`, the suite gets slow, and someone reverts it to `pnpm dev` to get their loop back. | `playwright.config.ts`'s `webServer.command` contains `dev` on any branch after T1. That single word re-opens the divergence that hid D2 for two specs (AC9); it is a rejection at G6, not a preference. |
| R8 | `product-manager` declines B4's amendment, and `spec.md` § Out of scope still forbids the pixels T6 moves. | G6 reports T6 as a scope breach against a criterion (AC6) that already exempts it. **That is a conflict between `spec.md` and `legal.md`, and it routes to `labor-law-analyst` through me** — not to whoever is holding the keyboard. |
| R9 | Two bounces land on the same gate and a third is attempted. | `AGENTS.md` §4 rule 3: the pipeline stops, I write the impasse, the options and a recommendation into `STATUS.md`, and it goes to the human. No third loop. |
