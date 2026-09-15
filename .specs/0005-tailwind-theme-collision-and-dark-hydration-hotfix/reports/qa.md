# 0005 — Build evidence (frontend-dev)

> Owner: frontend-dev · Gate: `build` (G5) · Run 1

This file collects the evidence `plan.md` tells each task to paste into `reports/qa.md`. It is not
the QA verdict — `qa-engineer` writes that at G6, over this same file.

---

## T1 — Point the suite at the production build and add the dark project

```
$ PORT=3210 pnpm e2e --project=chromium tests/e2e/responsive.spec.ts

Running 3 tests using 3 workers

  ✓  1 [chromium] › tests/e2e/responsive.spec.ts:19:7 › Responsive layout › keeps every control reachable inside the viewport (244ms)
  ✓  2 [chromium] › tests/e2e/responsive.spec.ts:10:7 › Responsive layout › never scrolls horizontally (251ms)
  ✓  3 [chromium] › tests/e2e/responsive.spec.ts:33:7 › Responsive layout › keeps headings at a readable size instead of scaling them up (263ms)

  3 passed (5.6s)
```

Ran to completion against a server the config built (`pnpm build && pnpm start`) and started itself
on port 3210. `pnpm lint` and `pnpm typecheck` clean. Closes blocker B1.

---

## T2 — The three checks that must be red before anything is fixed

All three checks run against the unfixed tree and fail, as required (a green run here would be a
failure of this task).

### `disclosure-legibility.spec.ts` — LR1 fails, naming DS1 and DS4, at 390 and 1440, both routes, both themes

```
$ PORT=3210 pnpm e2e --project=chromium tests/e2e/disclosure-legibility.spec.ts

  16 failed
    [chromium] › ... Disclosure legibility — DS1, the legal footer › footer stays legible at / 390x844 light
    [chromium] › ... Disclosure legibility — DS1, the legal footer › footer stays legible at / 390x844 dark
    [chromium] › ... Disclosure legibility — DS1, the legal footer › footer stays legible at / 1440x900 light
    [chromium] › ... Disclosure legibility — DS1, the legal footer › footer stays legible at / 1440x900 dark
    [chromium] › ... Disclosure legibility — DS1, the legal footer › footer stays legible at /custo-da-hora 390x844 light
    [chromium] › ... Disclosure legibility — DS1, the legal footer › footer stays legible at /custo-da-hora 390x844 dark
    [chromium] › ... Disclosure legibility — DS1, the legal footer › footer stays legible at /custo-da-hora 1440x900 light
    [chromium] › ... Disclosure legibility — DS1, the legal footer › footer stays legible at /custo-da-hora 1440x900 dark
    [chromium] › ... Disclosure legibility — DS4, the privacy settings dialog › settings dialog stays legible and operable at / 390x844 light
    [chromium] › ... Disclosure legibility — DS4, the privacy settings dialog › settings dialog stays legible and operable at / 390x844 dark
    [chromium] › ... Disclosure legibility — DS4, the privacy settings dialog › settings dialog stays legible and operable at / 1440x900 light
    [chromium] › ... Disclosure legibility — DS4, the privacy settings dialog › settings dialog stays legible and operable at / 1440x900 dark
    [chromium] › ... Disclosure legibility — DS4, the privacy settings dialog › settings dialog stays legible and operable at /custo-da-hora 390x844 light
    [chromium] › ... Disclosure legibility — DS4, the privacy settings dialog › settings dialog stays legible and operable at /custo-da-hora 390x844 dark
    [chromium] › ... Disclosure legibility — DS4, the privacy settings dialog › settings dialog stays legible and operable at /custo-da-hora 1440x900 light
    [chromium] › ... Disclosure legibility — DS4, the privacy settings dialog › settings dialog stays legible and operable at /custo-da-hora 1440x900 dark
```

Representative failure (DS1, 390, light — LR1 floor):

```
Error: expect(received).toBeGreaterThanOrEqual(expected)
Expected: >= 320
Received:    64
    at assertLr1 (tests/e2e/disclosure-legibility.spec.ts:43:17)
```

Representative failure (DS4, 390, light — LR1 floor):

```
Error: expect(received).toBeGreaterThanOrEqual(expected)
Expected: >= 320
Received:    64.45127868652344
    at assertLr1 (tests/e2e/disclosure-legibility.spec.ts:43:17)
```

### `dark-hydration.spec.ts` — ≥1 pageerror on the dark production build, quoted verbatim

```
$ PORT=3210 pnpm e2e --project="Dark production"

  4 failed
    [Dark production] › Dark hydration — production build, dark system theme › zero pageerror and theme-correct first paint on /
    [Dark production] › Dark hydration — production build, dark system theme › zero pageerror and theme-correct first paint on /custo-da-hora
    [Dark production] › Dark hydration — production build, light system theme › zero pageerror and theme-correct first paint on /
    [Dark production] › Dark hydration — production build, light system theme › zero pageerror and theme-correct first paint on /custo-da-hora
```

Dark, route `/` — quoted verbatim:

```
Error: expect(received).toEqual(expected) // deep equality
- Expected  - 1
+ Received  + 4

- Array []
+ Array [
+   "Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]= for the full message or use the non-minified dev environment for full errors and additional helpful warnings.",
+   "adsbygoogle.push() error: No slot size for availableWidth=32",
+ ]
```

Light, route `/` — quoted verbatim (no React error, confirming the defect is theme-dependent; the
`adsbygoogle` line is unrelated pre-existing noise, tracked separately, not a React hydration error):

```
Error: expect(received).toEqual(expected) // deep equality
- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "adsbygoogle.push() error: No slot size for availableWidth=32",
+ ]
```

### `responsive.spec.ts` — the D3 floor fails on the footer, and only the footer

```
$ PORT=3210 pnpm e2e --project=chromium tests/e2e/responsive.spec.ts

  1 failed
    [chromium] › Responsive layout › never collapses a long text block inward

  3 passed (never scrolls horizontally / keeps every control reachable / keeps headings readable)
```

```
Error: expect(received).toEqual(expected) // deep equality
- Array []
+ Array [
+   Object { "tag": "p", "text": "Tudo o que você digita fica salvo apenas neste navegador. Na", "width": 64 },
+   Object { "tag": "p", "text": "Os valores são uma estimativa para você se organizar. Não su", "width": 64 },
+   Object { "tag": "p", "text": "Não entram na conta: FGTS, benefícios e adicionais da sua co", "width": 64 },
+ ]
```

`pnpm check` and `pnpm build` clean throughout.

---

## T3 — Falsify or confirm D2's cause

No source file edited. Four runs, in order, each a fresh chromium context with `page.on("pageerror")`
and `page.on("console")` recording, over `/` and `/custo-da-hora`.

### 1. Production, dark (`NEXT_PUBLIC_ENABLE_ADS=true pnpm build && PORT=3214 pnpm start`, `colorScheme: "dark"`)

```
pageErrors: [
  "Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]= for the full message …",
  "Xl",
  "Minified React error #418; visit https://react.dev/errors/418?args[]=HTML&args[]= for the full message …",
  "Xl"
]
```

React error #418 fires once per route (2 routes → 2 occurrences). `"Xl"` is a pre-existing,
theme-independent `adsbygoogle` script error (see T2's dark-hydration evidence), unrelated to D2.

### 2. Production, light (same server, `colorScheme: "light"`)

```
pageErrors: ["Xl", "Xl"]
```

Zero React errors. Confirms the defect is theme-dependent, not universal.

### 3. Development, dark (`PORT=3215 pnpm dev`, `colorScheme: "dark"`) — unminified

```
Hydration failed because the server rendered HTML didn't match the client. […]
  <AppHeader heading="Calculador...">
    <header className="fixed inse...">
      <div className="max-w-app ...">
        <div className="flex items...">
          <_c variant="ghost" size="icon" onClick={function onClick} title="Alternar tema" …>
            <button ref={null} type="button" …>
              <Sun className="w-5 h-5" aria-hidden="true">
                <svg … >
+                 className="tabler-icon tabler-icon-sun w-5 h-5"
-                 className="tabler-icon tabler-icon-moon w-5 h-5"
                  <path
+                   d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"
-                   d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0..."
```

Names the theme-toggle subtree of `components/organisms/app-header.tsx` exactly: server renders
`IconMoon`, client renders `IconSun`, at the node the `resolvedTheme` ternary controls.

### 4. Development, light (same server, `colorScheme: "light"`)

```
pageErrors: ["Xl", "Xl"]
```

Zero hydration errors, zero React errors.

### Verdict

**Confirmed, `app-header.tsx:66`** (the `resolvedTheme === "dark" ? <IconSun/> : <IconMoon/>` ternary).
Step 3 names exactly this subtree, with the component stack showing `<AppHeader>` → the ghost icon
`Button` → the `<Sun>`/`<Moon>` glyph, and the diffed `className`/`d` attributes matching the
`IconMoon`→`IconSun` swap the hypothesis predicted. Proceeding to T4/T7.

---

## T4 — The "before" geometry dump, and the two proof scripts

`scripts/geometry-dump.mjs` and `scripts/spacing-migration-proof.mjs` created. `pnpm lint` clean.

### Proof A demonstration — required once, before T5 touches the real tree

Since the real `components/` tree is not migrated yet, both demonstrations were run in an **isolated
git worktree** (`AGENTS.md` §4 rule 6), never in the shared tree: the worktree's `components/` was
swept with §4.1's exact command, matching what T5 will do for real.

**OK, on the swept worktree copy:**

```
$ node scripts/spacing-migration-proof.mjs
PROOF OK — every changed line is exactly the sanctioned substitution
```

**Deviation, after hand-editing one migrated line** (`calculator-page.tsx:16`, `focus:p-4` tidied to
`focus:p-3`):

```
components/templates/calculator-page.tsx:16
  expected:         className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:m-4 focus:rounded-md focus:bg-surface-raised focus:p-4 focus:text-ink focus:shadow-raised"
  actual:           className="sr-only focus:not-sr-only focus:absolute focus:z-100 focus:m-4 focus:rounded-md focus:bg-surface-raised focus:p-3 focus:text-ink focus:shadow-raised"
```

Worktree removed after the demonstration (`git worktree remove --force`); nothing in the shared tree
was mutated for this rehearsal.

### The "before" geometry dump

```
$ NEXT_PUBLIC_ENABLE_ADS=true NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000 NEXT_PUBLIC_GA_ID=G-TEST12345 pnpm build
$ PORT=3217 NEXT_PUBLIC_ENABLE_ADS=true NEXT_PUBLIC_ADSENSE_ID=ca-pub-0000000000000000 NEXT_PUBLIC_GA_ID=G-TEST12345 pnpm start &
$ node scripts/geometry-dump.mjs --out evidence/geometry-before.json --base-url http://localhost:3217

geometry-dump: wrote .../evidence/geometry-before.json
```

All eight combinations non-empty:

```
/__390x844__light 240 elements
/__390x844__dark 241 elements
/__1440x900__light 240 elements
/__1440x900__dark 241 elements
/custo-da-hora__390x844__light 165 elements
/custo-da-hora__390x844__dark 166 elements
/custo-da-hora__1440x900__light 165 elements
/custo-da-hora__1440x900__dark 166 elements
```

Sanity check — the DS1 footer subtree measures 64px today, as expected before the fix:

```
{ path: 'main:nth-child(5)>div:nth-child(3)>footer:nth-child(2)', x: 163, y: 2723.75, width: 64, height: 1728.28 }
```

`pnpm check` and `pnpm build` clean.

---

## T5 — Delete the named spacing namespace, migrate its 129 consumers, lock it shut

### Step 1 — the guard test, red against the unfixed tree (lesson 012)

```
$ pnpm test __tests__/spacing-guards.test.ts

 Test Files  1 failed (1)
      Tests  5 failed (5)
```

1. `app/globals.css declares no --spacing-<name> key` — 8 named keys found (`hair xs sm md lg xl 2xl 3xl`).
2. `no var(--spacing-<name>) read survives` — 5 found (`calculator-views.tsx` ×2, `cookie-consent.tsx` ×2, `calculator-layout.tsx` ×1).
3. `no spacing utility with a named suffix survives` — 125 found.
4. `DESIGN.md contains no --spacing-<non-numeric> occurrence` — 12 found (broader than the declaration-only count; includes prose mentions).
5. `every key under DESIGN.md's frontmatter spacing: block parses as a number` — fails on `hair`.

### Step 2 — `app/globals.css`, deletions only

Deleted lines 69–76 (the eight `--spacing-hair|xs|sm|md|lg|xl|2xl|3xl` declarations). `--spacing: 0.25rem` kept. No `--container-*` declaration added. No other block touched.

### Step 3 — the sweep, verbatim, once

```
$ find components -name '*.tsx' -print0 | xargs -0 sed -i -E ...(§4.1, verbatim)...
swept: 22 files changed
```

### Step 4 — the proofs, in order

```
$ node scripts/spacing-migration-proof.mjs
PROOF OK — every changed line is exactly the sanctioned substitution

$ pnpm test __tests__/spacing-guards.test.ts
Tests  2 failed | 3 passed (5)
```

Cases 1–3 (the `app/globals.css` + `components/` boundary) are green. Cases 4–5 (`DESIGN.md`) are
still red — `DESIGN.md` is not in T5's file list and is T8's own file, and T8's own text says these
two cases "flip to green here" (at T8), not at T5. See the decisions log: T8 is executed immediately
after T5, ahead of T6/T7, so that `pnpm check` — which the plan's ordering rule requires green after
*every* task with the e2e window as the only stated exception — is never red on a task boundary.

```
V1 (grep -rnE -- '--spacing-(hair|xs|sm|md|lg|xl|2xl|3xl)' app components) = 0
V2 (grep -rnoE '\b(max-w|min-w|w|basis|size)-(hair|xs|sm|md|lg|xl|2xl|3xl)\b' app components) = 4
     cookie-consent.tsx:85 max-w-lg
     journey-form.tsx:238 max-w-md
     ad-manager.tsx:24 max-w-3xl
     calculator-views.tsx:73 max-w-3xl
V4 (grep -rn 'var(--spacing-' app components) = 0
```

V2 = 4, not 0 (R2 avoided). `pnpm lint`, `pnpm typecheck`, `pnpm build` clean. `pnpm check` is
addressed after T8 below.

---

## T8 — Reconcile `DESIGN.md` with the tokens that ship (run ahead of T6/T7, see STATUS.md decisions log)

All anchors substituted verbatim from `design.md` §6, exactly as instructed (no composing, no
paraphrasing): frontmatter `spacing:` block rekeyed (§6.7), the Spacing scale paragraph (§6.1), the
Container paragraph (§6.2), the sticky-offset clause (§6.3), the five density-table body rows
(§6.4), the Eight Steps Rule plus the new Numeric Scale Rule (§6.5), and the four incidental
mentions at lines 492, 501, 542, 559 (§6.6). Nothing else in `DESIGN.md` touched.

```
$ grep -rnE -- '--spacing-(hair|xs|sm|md|lg|xl|2xl|3xl)' DESIGN.md
393: [one line — see blocker B8 below]

$ pnpm test __tests__/spacing-guards.test.ts
Tests  1 failed | 4 passed (5)
```

**Blocker B8** (full text in `STATUS.md` § Blockers): `design.md` §6.1's mandated verbatim text
itself contains two illustrative, past-tense mentions of the retired pattern (`` `--spacing-lg` ``,
`` `--spacing-3xl` ``), explaining why the collision happened. Case 4 of the guard test — built
exactly to B5's ruling, "no occurrence anywhere in the file" — has no carve-out for an explanatory
mention versus a live declaration, and inventing that carve-out is not mine to do. Substituted §6.1
verbatim, left the guard test's boundary as B5 specifies, and escalated rather than resolved either
side. This is the only failure in `pnpm check` right now.

```
$ pnpm check
Test Files  1 failed | 56 passed (57)
     Tests  1 failed | 497 passed (498)
```

`pnpm lint`, `pnpm typecheck`, `pnpm build` all clean.

**Holding here for `tech-lead`'s ruling on B8 before starting T6.**

---

## T6 — Stack the two granular-consent rows below `sm` (resumed per tech-lead's B8 ruling)

Two `className` edits in `components/organisms/cookie-consent.tsx`, exactly the two rows, exactly
the stack pair (`flex-col items-start … sm:flex-row sm:items-center`), nothing else in the file
touched — confirmed by `git diff`, which shows only the T5 sweep's spacing-token substitutions plus
these two lines. `cookie-consent.tsx:44` (the banner) untouched beyond the sweep.

```
$ pnpm test __tests__/cookie-consent.test.tsx
Tests  16 passed (16)
```

Unchanged, no edit needed — the existing suite already asserts role/name/text/`aria-checked` only,
no class string.

**A defect surfaced in the test, not in the migration**, while validating DS4 at 390: the settings
dialog panel enters over `--duration-slow` (320ms, scaling from `0.96` — `design.md` §5.4), and
`disclosure-legibility.spec.ts` was reading the panel's geometry before that transition settled,
under-reporting its width (as low as 346.8px measured mid-transition against a debug script; 357.7–
357.99px in the suite's own timing). Fixed in the test only: `openPrivacySettings` now polls the
panel's bounding box until three consecutive reads agree before any geometry assertion runs, rather
than a fixed sleep that would drift from the token if `--duration-slow` ever changes. Also removed a
broken manual "non-empty accessible name" recheck that used `aria-label ?? textContent` — the
telemetry switch's name comes from `aria-labelledby`, which that fallback cannot see; the
`getByRole(role, { name })` locators immediately above already require the exact accessible name to
resolve, so `toBeVisible()` on them already proves the label.

```
$ PORT=3220 pnpm e2e --project=chromium tests/e2e/disclosure-legibility.spec.ts
16 passed (9.1s)
```

DS4's LR1, LR2 and LR4 cases green at 390 and 1440, both themes, both routes.

```
$ pnpm check
Test Files  1 failed | 56 passed (57)     ← the one known, named B8 case only
     Tests  1 failed | 497 passed (498)
$ pnpm build
```

clean. No other test regressed. Advances LR2, LR4, AC3 (DS4), D-AC4.

---

## T8 — closed (B8 ruling landed at `design.md` run 2)

Re-substituted `DESIGN.md:393`'s blockquote only, verbatim, per `STATUS.md` § Ruling on B8 /
`design.md` §6.1 run 2: two phrases changed (`` `--spacing-lg` key `` → `a key in that namespace`;
`` declaring `--spacing-3xl` `` → `` declaring one named `3xl` ``), the teaching clause kept byte for
byte. Nothing else in `DESIGN.md` touched.

```
$ grep -rnE -- '--spacing-(hair|xs|sm|md|lg|xl|2xl|3xl)' DESIGN.md
(0 matches — V3 = 0)

$ pnpm test __tests__/spacing-guards.test.ts
Tests  5 passed (5)

$ pnpm check
Test Files  58 passed (58)
     Tests  499 passed (499)

$ pnpm build
(clean)
```

T8 and B8 both closed. `pnpm check` is now fully green — T9 is unblocked.

**Separately observed, not caused by this task and not fixed by me:** `__tests__/comment-free-code.test.ts` — not a file I created — currently strips the plan-mandated legal-citation comments this
gate's own T2 instructions required in `tests/e2e/disclosure-legibility.spec.ts` and
`responsive.spec.ts`. Recorded in `STATUS.md`'s decisions log rather than fought with a third
re-edit; the comment text itself is preserved verbatim in this file's T2/T6 sections above.

---

## T7 — Fix D2: both glyphs server-rendered, the `.dark` class decides

`components/organisms/app-header.tsx`: stopped destructuring `resolvedTheme`; both glyphs rendered
server-side (`dark:hidden` on `IconMoon`, `hidden dark:block` on `IconSun`, both `data-theme-icon`);
click handler reads `document.documentElement.classList.contains("dark")` instead of React state.
Nothing else changed — `disableTransitionOnChange` untouched, no `useEffect`, no mount guard.

`__tests__/app-header.test.tsx`: `themeState` reduced to `{ setTheme: vi.fn() }`. Added: both glyphs
server-rendered (`renderToString`), neither glyph announced, no substitution across a click (2 nodes
before/after), light→dark, dark→light (with `document.documentElement.classList` arranged/cleared),
keyboard path (`tab` + `Enter`), and a reduced-motion case asserting the toggle carries no `style`
attribute (the signature of a `motion` wrapper, absent here by design).

```
$ pnpm test __tests__/app-header.test.tsx
Tests  12 passed (12)

$ pnpm check
Test Files  58 passed (58)
     Tests  504 passed (504)

$ pnpm build
(clean)

$ PORT=3221 pnpm e2e --project="Dark production"
  4 passed (11.2s)
```

Zero `pageerror` on both routes, both themes — the same command that reported ≥1 `pageerror` in T2,
now clean. All four §7.1 clauses (theme-correct first paint, no substitution, no layout shift, no
accessible-name change) hold.

```
$ PORT=3222 pnpm e2e --project=chromium
  34 passed (12.1s)
```

No regression in any other e2e spec. Advances AC7, AC8, D-AC5.

---

## T9 — Prove that nothing moved, and measure the four repaired surfaces

### 1. The geometry diff (AC6)

**A real defect surfaced in `scripts/geometry-dump.mjs` itself, found and fixed before trusting its
output** (`AGENTS.md` §4 rule 6 spirit: prove the instrument, don't just read it):

- **Clock.** `hooks/use-work-calculator.ts` seeds its defaults from `new Date()`. The first "before"/
  "after" pair (taken minutes apart, real time) reported 1790 rejections purely from that — different
  wall-clock time, different calculated content, nothing to do with the migration. Fixed by freezing
  `context.clock.setFixedTime("2025-01-06T09:00:00")` on every context the dump opens, and by
  **retaking both dumps** — the "before" one from an isolated `git worktree` at HEAD (pre-migration;
  built with a symlinked `node_modules`, which Turbopack rejected as "outside the filesystem root" —
  worked around with a real `pnpm install --offline` against the local store instead), the "after" one
  from the current tree, same env, same frozen time, same port pattern, worktree removed afterward.
- **Ancestor cascade.** Even with time frozen, 1416 rejections remained, **100% of them present on
  one side only, 0% a genuine delta on a path that exists on both sides** — verified by direct count.
  All of them trace to one fact: `main:nth-child(5)` and `main:nth-child(5)>div:nth-child(3)` (the
  `#main-content` div) *contain* the footer, so of course their own height changes when the footer's
  does — a block container's height is the sum of its content's height in normal flow. This is not a
  second, unrelated defect; it is the same footer fix observed one level up. `isAncestorOfADs1FooterPath`
  added to the diff so an element that literally contains the footer is treated the same as the footer.
- **Zero-box new elements.** T7 renders two glyphs where there was one; the hidden one (`display:
  none` via the inactive `dark:` variant) is a path present on only one side with `x/y/width/height`
  all `0` — not a pixel moving, because it has no pixels. `isZeroBox` added so a genuinely invisible
  new/removed node is not counted as a rejection.

Both fixes are mechanical facts about CSS block layout and about what "zero pixels move" can mean for
an invisible node, not a loosening of AC6's substance — verified by re-running before/after these
fixes and inspecting exactly what changed (pasted below).

**Light theme, after both fixes — clean:**

```
$ node scripts/geometry-dump.mjs --diff evidence/geometry-before.json evidence/geometry-after.json
geometry-dump: 96 permitted delta(s) inside the DS1 footer subtree
geometry-dump: 1416 rejection(s)
```

All 1416 rejections are in **dark theme only** (392/404/304/316 across the four dark combinations);
**all four light combinations report zero rejections.** Every one of the 1416 is "present on one side
only" — zero are a delta on a path present on both sides.

**Why dark theme's "before" measurement is not usable, and what stands in for it.** The unfixed tree
(`before`) has D2: a real, already-diagnosed (T3) hydration crash on every dark load. `before`'s dark
dump for `/` has **212 elements** and **no `main:nth-child(5)` path at all** — the crash-and-recover
cycle produces a structurally different tree, not a geometrically shifted one. Comparing it to the
clean `after` dark tree is not testing whether D1's migration moved a pixel; it is testing whether
fixing D2 changed the DOM, which it does, by construction, and which T7 already proves correct on its
own terms (§ T7 above). **Corroborating check, using only the clean `after` dump (both sides already
verified clean and reproducible on repeat runs):** `after`-light vs `after`-dark, same route, same
viewport — **exactly 5 path differences per combination, all five inside the theme-toggle's two `svg`
elements, all at identical position and size (`x:342 y:22 20×20`), one glyph `0×0×0×0` and the other
visible depending on theme.** This is design.md §3.0's own invariant ("both themes produce identical
geometry") holding exactly, and it is the closest a diff can get to confirming dark theme's geometry
did not move, given the "before" state is unusable for the reason above.

**Verdict:** clean in light theme (0 rejections, 96 permitted, all footer-or-its-ancestor); dark theme's
literal before/after diff is contaminated by D2 and not decisive on its own, but the after-dump's own
light-vs-dark cross-check (5 expected diffs, all the theme glyph, nothing else) corroborates the same
"nothing else moved" conclusion. Flagging this reasoning for `qa-engineer`/`tech-lead` to confirm at
G6 rather than asserting it silently — it is an interpretation of what AC6 can mean when D2 and D1
are fixed in the same spec, not a threshold I invented.

### 2. The four surfaces, measured in a real browser (AC2, AC3, LR1, LR4)

Production build, both routes (reset dialog only exists on `/`), both viewports, both themes, frozen
clock:

| Surface | 390 | 1440 | Expected | Match |
|---|---|---|---|---|
| DS1 footer | 358 | 768 | 358 / 768 | yes, both themes |
| DS4 panel | 358 | 512 | 358 / 512 | yes, both themes |
| Ad slot | 390 | 768 | 390 / 768 | yes, both themes |
| Reset dialog (`/` only) | 358 | 448 | 358 / 448 | yes, both themes |

Identical in light and dark at every viewport — confirms design.md §3.0's "both themes produce
identical geometry" for all four surfaces, not only the header icon.

### 3. The full standing sweep (AC13)

```
$ pnpm check
Test Files  58 passed (58)
     Tests  504 passed (504)

$ pnpm build
(clean)

$ PORT=3210 pnpm e2e
98 passed (32.5s)               # all four projects: chromium, Mobile Chrome, Mobile Safari, Dark production

$ pnpm test:coverage
Statements   : 99.88% ( 894/895 )
Branches     : 99.77% ( 446/447 )
Functions    : 100% ( 251/251 )
Lines        : 100% ( 819/819 )

$ node .agents/tools/preview.mjs --out evidence/preview-after --path /,/custo-da-hora
capturas: 8 → evidence/preview-after
violações axe: 0 | contrast incomplete: 4 | erros de console: 16
```

Zero axe violations at any severity, in both themes, both routes. The 4 "contrast incomplete" flags
are the two close-but-passing pairs `design.md` §8.3 already names with their exact headroom (DS4
caption in light, 0.09; OFF track in light, 0.06) — not new, not a violation, axe correctly declines
to auto-verdict a near-floor pair. The 16 "console errors" are `next dev`'s own HMR WebSocket handshake
failures under Playwright's headless profile (`ws://.../hmr?id=...` `ERR_INVALID_HTTP_RESPONSE`), one
pair per page load — a `next dev` tooling artifact, not an application error; zero React warnings,
zero errors originating from this app's own code.

**One test file is red at the end of `pnpm check`, and it is not this spec's to fix — see `STATUS.md`
§ Decisions, "G5 T9, escalated."** `__tests__/comment-free-code.test.ts` is not named anywhere in
`plan.md`, is itself uncommitted, and enforces a narrower rule than `AGENTS.md` §8 actually states.
Restoring `lib/utils.ts`'s stripped comment (needed for AC11, below) turns it red again; I left it red
rather than delete a legitimate, pre-existing `AGENTS.md`-§8-compliant comment to satisfy a test that
isn't part of this spec.

### 4. The two diffs `labor-law-analyst` reads at G6 (AC10, AC11)

```
$ git diff main -- components/organisms/calculator-views.tsx
```

Pasted into `evidence/` (large — spans 0002's own footer rewrite plus this spec's className-only
changes). The four `<p>` elements' text is unchanged by this spec: `scripts/spacing-migration-proof.mjs`
already proved every changed line in the whole `components/` tree is exactly the sanctioned
substitution, byte for byte, and neither T6 nor T7 touch `calculator-views.tsx` at all — so whatever
this diff shows against `main` is entirely 0002's doing, not this spec's, and `labor-law-analyst`
confirms that reading against `0002/legal.md` S4.

```
$ git diff --stat
36 files changed, 1886 insertions(+), 187 deletions(-)
```

No file under `lib/` (confirmed by direct grep of the `--stat` output — 0 matches for `^ lib/`; see the
`lib/utils.ts` restoration in `STATUS.md` § Decisions, "G5 T9, escalated," for why that required an
extra step this run).

### Done

`pnpm check`, `pnpm build`, `pnpm e2e` (all four projects) and `pnpm test:coverage` all green except
the one named, out-of-scope test file above. AC2, AC3, AC6, AC10, AC11, AC13, D-AC3, D-AC8 advanced.
T1-T9 complete. Handing to G6: `qa-engineer`, `web-standards-auditor`, `labor-law-analyst`,
`refactor-scout`.


---
---

# 0005 — QA verdict (qa-engineer)

> Owner: qa-engineer · Gate: `qa` (G6) · Run 1

## Verdict: **pass**

Every AC1–AC13 is satisfied by code and by a test that would fail if the behaviour regressed, the
per-area coverage bars hold, `pnpm check`/`pnpm build`/`pnpm e2e`/`pnpm test:coverage` are all clean,
and the two hardest claims in this spec — AC6's "zero pixels moved" and the dark-theme corroboration
reasoning the developer asked to have confirmed — were independently re-derived in an isolated
worktree/scratch computation, not read off `reports/qa.md`'s own numbers. Four findings below,
none blocking: two code-craft comment violations under the now-settled §8 rule, one AC11
commit-staging risk for `tech-lead`/`release-manager` to manage before G8, and one test-quality
fragility in a single locator. None of them reopen a criterion or a settled boundary dispute.

All commands in this report were re-run by me, in this tree, on 2026-09-14. Where I probed the
pre-fix state, I did it in an isolated `git worktree` off `HEAD` (`AGENTS.md` §4 rule 6) — never by
mutating the shared tree — because `HEAD` is exactly the pre-fix commit (every change in this spec is
still uncommitted).

---

## Gate output — verified myself, not taken on the developer's word

| Command | Result | Notes |
|---|---|---|
| `pnpm lint` (`biome check .`) | **clean** | 140 files, no fixes applied |
| `pnpm typecheck` (`tsc --noEmit`) | **clean** | |
| `pnpm test` | **58 files / 504 tests, all green** | Matches `STATUS.md`'s claim exactly — including `__tests__/comment-free-code.test.ts`, which is green now (see § Findings, F3, for why it was red in the developer's own log and is not today) |
| `pnpm test:coverage` | **exit 0** | Aggregate: 99.88% stmts / 99.77% branches / 100% funcs / 100% lines. **Per area (recomputed from `coverage/lcov.info`, not the aggregate line):** |
| `pnpm build` (`NEXT_PUBLIC_ENABLE_ADS=true …`) | **clean** | One pre-existing, unrelated Turbopack warning ("Failed to find font override values for font `Atkinson Hyperlegible Next`") |
| `pnpm e2e` (all four projects, production build, `PORT=3999`) | **98 passed** | chromium, Mobile Chrome, Mobile Safari, Dark production — matches `STATUS.md`'s "98 tests, all four projects" exactly |

### Coverage, per area (not aggregate — lesson: an aggregate number hides a `lib/` gap)

| Area | Lines | Functions | Branches | Bar | Met? |
|---|---|---|---|---|---|
| `lib/**` | 232/232 — 100% | 62/62 — 100% | 124/124 — 100% | 100% all | **yes** |
| `hooks/**` | 200/200 — 100% | 51/51 — 100% | 78/78 — 100% | 100% all | **yes** |
| `app/**` | 30/30 — 100% | 10/10 — 100% | 0/0 (no branches in scope) | 90% all | **yes** |
| `components/**` | 357/357 — 100% | 128/128 — 100% | 244/245 — 99.59% | 90% all | **yes** |

`thresholds` in `vitest.config.ts` are configured exactly to `AGENTS.md` §9's split (100/100/100/100 for
`lib/**` and `hooks/**`, 90/90/90/90 for `app/**` and `components/**`) and the run exits 0. The single
uncovered branch is `components/organisms/ad-manager.tsx:12`, pre-existing and 5.6 points inside the
90% floor — not a gap that a blanket-100% reading over `components/**` would have hidden, since the
bar there is correctly 90, not 100.

---

## Independent re-verification (isolated worktree, AGENTS.md §4 rule 6)

`HEAD` (`804144b`) *is* the pre-fix tree — every T1–T9 change is still uncommitted — so I created a
detached worktree at `HEAD` in the scratchpad, symlinked/reinstalled `node_modules` there
(`pnpm install --offline`, same workaround the developer used for the same Turbopack-vs-symlink
reason), copied only the three new/edited test files and `playwright.config.ts` into it, and ran the
new checks against it. **The shared tree was never touched; the worktree was removed after.**

| Check | Claimed (dev, T2/T5/T3) | Independently reproduced |
|---|---|---|
| `__tests__/spacing-guards.test.ts` against pre-fix | 5 failed | **5 failed**, same 5 messages (8 named keys, 5 `var()` reads, 125 named utilities, 12 `DESIGN.md` occurrences, `hair` non-numeric) |
| V1 / V2 / V4 against pre-fix | 13 / 4 / 5 | **13 / 4 / 5** — exact match, including V2 naming the same four sites |
| V1 / V2 / V4 against fixed tree | 0 / 4 / 0 | **0 / 4 / 0** — R2 (sweep eating the four `max-w-*` survivors) did not happen |
| `disclosure-legibility.spec.ts` + `responsive.spec.ts` floor, pre-fix | 16 + 1 = 17 failed | **17 failed** (16 disclosure-legibility, 1 the `<footer>` floor), 3 responsive tests still green |
| `dark-hydration.spec.ts`, pre-fix, no `CI` env | 4 failed, React error #418 named on both routes in dark, light clean of React errors | **4 failed**, verbatim `"Minified React error #418…"` on both dark-theme sub-tests, light-theme sub-tests fail only on the pre-existing `adsbygoogle` noise — confirms AC9 too: production build was exercised **locally**, no `CI=true` set |

This closes my own obligation on lesson 013 (an isolated worktree isolates the files, not the
environment) — the worktree used a fresh port, its own `pnpm install --offline`, and was torn down
immediately after.

### AC6 — the two proofs, re-derived from the raw JSON, not from the printed summary

`node scripts/geometry-dump.mjs --diff evidence/geometry-before.json evidence/geometry-after.json`,
run by me: **96 permitted, 1416 rejections, exit 1** — identical to `reports/qa.md`'s T9 numbers.
I then parsed the raw dumps myself rather than trust the tool's own summary line:

- **R3 check (a wholly empty diff is a failed dump, not a pass): did not occur.** The diff is neither
  empty nor suspiciously clean — it correctly reports a large, structurally-explained rejection set.
- **The 1416 rejections are 100% inside the four dark-theme combinations** (392/404/304/316) and
  **0% of them are a delta on a path present on both sides** — every one is "path exists on one side
  only", which I confirmed by filtering the raw JSON (`rejections.filter(r => r.before && r.after).length === 0`).
- **The pre-fix dark dump for `/` at 390×844 has 212 elements and contains no `main:nth-child(5)` path
  at all** (confirmed directly against `evidence/geometry-before.json`) — this is D2's own
  crash-and-recover cycle producing a structurally different tree, not a geometrically shifted one,
  exactly as the developer's report states. Comparing that dump against the clean post-fix dark dump
  cannot be a pixel-geometry test; it is a test of "did fixing D2 change the DOM", which it does, by
  construction, and which is D2's own fix (T7), not D1's.
- **Light theme: 0 rejections in all four light-theme combinations** — the clean half of AC6 stands
  on the literal before/after diff, unmodified.
- **The after-dump light-vs-dark cross-check**, recomputed independently element-by-element rather
  than read off the developer's count: **exactly 5 path differences per combination, in all four
  combinations**, every one inside `header … button:nth-child(2) > svg` and its child `<path>`s — the
  two theme-toggle glyphs, one at `{x, y, width: 20, height: 20}` and the other `{0,0,0,0}`, swapping
  which is which between light and dark, at identical coordinates in both themes. This is
  `design.md` §3.0's "both themes produce identical geometry" invariant holding exactly, and it is the
  only artefact that can stand in for the unusable dark "before" state.

**Ruling on the reasoning the developer asked to have confirmed at G6: accepted.** The literal
before/after diff is not usable for dark theme for a reason that is independently verifiable (the
"before" dark DOM is structurally different, not geometrically shifted, because D2 crashes and
React discards and rebuilds the tree) and is orthogonal to D1's migration. The light-theme diff
being clean, plus the after-dump cross-check showing the only delta is the theme glyph itself
(the fix D2's own AC7/AC8 already require and prove), is the strongest evidence obtainable given the
circumstance, and I could not find a better one in the time available. This is accepted as
sufficient for AC6, with the caveat recorded in the acceptance-criteria table below rather than
silently folded into a plain "pass".

---

## Acceptance criteria

| # | Criterion | Code | Test | Verdict |
|---|---|---|---|---|
| AC1 | Floor assertion fails before the fix | `tests/e2e/responsive.spec.ts` (D3 test), `tests/e2e/disclosure-legibility.spec.ts` | Both, re-run by me against an isolated pre-fix worktree: 17 failures, naming the footer at both viewports | **pass** |
| AC2 | Footer measures a full text column, LR1/LR2 on rendered geometry | `components/organisms/calculator-views.tsx:73` className | `disclosure-legibility.spec.ts` DS1 block (16 green sub-tests in the fixed tree); T9's measured table (358/768, both themes) | **pass** |
| AC3 | Other three sites resolve correctly; DS4 satisfies LR1/LR2/LR4 incl. the `sm`-stack | `ad-manager.tsx:24`, `cookie-consent.tsx:85` (+ T6's two `className`s), `journey-form.tsx:238` | `disclosure-legibility.spec.ts` DS4 block; T9's measured table | **pass** |
| AC4 | Colliding namespace empty, over the whole file | `app/globals.css` (8-line deletion, confirmed by `git diff HEAD` — deletions only) | `__tests__/spacing-guards.test.ts` case 1, confirmed red pre-fix (8 keys) and green post-fix | **pass** |
| AC5 | Zero survivors in `app/`+`components/`, incl. `calc()`/responsive-prefixed forms | the sweep (22 files) | `spacing-guards.test.ts` cases 2–3 + V1/V2/V4, independently re-run: 0/4/0 | **pass** |
| AC6 | Zero pixels move except the four named subtrees | `scripts/geometry-dump.mjs` diff | Re-derived independently — see above | **pass, with the dark-theme substitution accepted and recorded, not silent** |
| AC7 | D2's cause falsified/confirmed in writing before any edit | none (T3 is evidence-only) | `reports/qa.md` T3; independently corroborated — pre-fix dev-mode dark run names `app-header.tsx`'s theme-toggle subtree exactly, matching the fixed file's actual change | **pass** |
| AC8 | Dark reproduction fails before, passes after | `tests/e2e/dark-hydration.spec.ts` | Re-run by me: 4 failed pre-fix (React #418 verbatim, both routes) → 4 passed post-fix (current tree) | **pass** |
| AC9 | Local e2e exercises the production build | `playwright.config.ts` (`pnpm build && pnpm start` locally) | AC8's pre-fix failure reproduced locally with no `CI` env set | **pass** |
| AC10 | Disclosure text byte-identical | `components/organisms/calculator-views.tsx` | `git diff HEAD -- components/organisms/calculator-views.tsx`: only `className` lines changed (spacing-token substitutions), all four `<p>` bodies untouched | **pass** |
| AC11 | `lib/` untouched | — | `git diff HEAD --stat -- lib/`: **one file, `lib/utils.ts`, differs by a 2-line comment removal unrelated to T1–T9** | **pass for frontend-dev's own work; flagged as a commit-staging risk — see Finding F3** |
| AC12 | `DESIGN.md` names the tokens that ship | `DESIGN.md` §§393–559 rewrite | `spacing-guards.test.ts` cases 4–5, green; V3 = 0, independently confirmed | **pass** |
| AC13 | Standing bars hold | — | `pnpm check`, `pnpm build`, `pnpm e2e`, `pnpm test:coverage` all green, re-run by me | **pass** |

No criterion is a partial pass folded into "pass" without a note above — AC6 and AC11 carry their
caveats explicitly.

---

## Findings

None block the gate. F1 and F2 are code-craft violations under the now-settled §8 rule ("no
comments, with exactly two exemptions"); F3 is a process risk for `tech-lead`/`release-manager`
at commit-staging time; F4 is a test-quality fragility.

### F1 — narrating comments in `scripts/geometry-dump.mjs` and `scripts/spacing-migration-proof.mjs`

**Severity: minor, but a real rule violation.** `AGENTS.md` §8's "no comments" rule now has exactly
two exemptions (a tooling directive; a Brazilian-norm citation, `lib/`-only) and no others. Neither
file is `lib/`, and none of the six comments below are tooling directives:

- `scripts/geometry-dump.mjs:14-16` — the frozen-clock rationale
- `scripts/geometry-dump.mjs:31-34` — the ancestor-cascade rationale
- `scripts/geometry-dump.mjs:130-133` — the zero-box rationale
- `scripts/spacing-migration-proof.mjs:8-9` — the mapping-order rationale

**Reproduce:** `grep -nE '^\s*//' scripts/geometry-dump.mjs scripts/spacing-migration-proof.mjs`.

**Why `__tests__/comment-free-code.test.ts` is green anyway:** its `SOURCE_DIRECTORIES` list is
`["app", "components", "hooks", "lib", "__tests__", "tests"]` — `scripts/` is not in it, so the guard
never sees these files. I am not proposing widening or narrowing the guard's boundary (that dispute
is settled and not mine to reopen); I am reporting that these six comments exist in this spec's own
diff, in files the guard does not scan, which is exactly what I was asked to check ("if you find a
comment anywhere in the diff, that is a finding against the code, not against the test").

### F2 — `playwright.config.ts:62-63`, a pre-existing comment, same shape, not this spec's to fix

`// A reused server carries the NEXT_PUBLIC_* values of whoever started it; a mismatched / // one
silently serves a different page and the suite blames the application.` Confirmed via
`git diff HEAD -- playwright.config.ts`: this comment is unchanged context, present verbatim in
`HEAD` already, and T1's edits do not touch it. Root-level config files are also outside
`comment-free-code.test.ts`'s scanned directories. **Not counted against this build** — frontend-dev
did not introduce or touch it — but recorded so it does not read as something I missed: it is the
same class of gap as F1 (a location the automated guard cannot see), pre-existing, and a candidate
for its own small cleanup, not a blocker here.

### F3 — `lib/utils.ts`'s current diff is a stripped comment, not a T1–T9 edit, and AC11 needs it kept out of this spec's commit

`git diff HEAD --stat -- lib/` shows exactly one file, two deletions: the `tailwind-merge`
configuration-hazard comment that was present and §8-compliant at `HEAD`. Per `STATUS.md`'s own
decisions log ("G5 T9, escalated"), frontend-dev restored this comment specifically *to keep AC11
green*, and it has since been removed again by the (now-settled) repo-wide comment cleanup — a
change with nothing to do with this spec's D1/D2/D3 scope. AC11 reads "`git diff --stat` for **this
spec's commits** lists no file under `lib/`" — nothing is committed yet, so AC11 is not failing
today, but it will fail the moment `release-manager` stages this comment-removal in the same commit
set as 0005's own work. **Action needed at G7/G8, not here:** keep the `lib/utils.ts` comment-removal
in whatever commit does the repo-wide cleanup, separate from 0005's own commits.

### F4 — `tests/e2e/disclosure-legibility.spec.ts:142`, a Tailwind-class locator for DS4's captions

```ts
const captions = await panel.locator("p.text-caption").all();
```

This selects DS4's two explanatory captions (`cookie-consent.tsx:111,126`) by the type-step utility
class `text-caption`. `plan.md`'s own T2 instructions call for "structural and class-free" selectors
in this exact file ("a class assertion is barred by `AGENTS.md` §8, and every class in this subtree
is about to change") and every other locator in the file (`DS1_FOOTER_SELECTOR`,
`DS4_PANEL_SELECTOR`, the role/name queries for the controls) follows that rule. This one does not.

**Why it is a real finding, not a nitpick — the test would not fail if the behaviour broke.** If a
future change renames the caption's type step (a foreseeable rename: `DESIGN.md`'s own type ramp is
a maintained system with eleven named steps, `caption` among them, in `lib/utils.ts`'s
`TYPE_STEPS`), `panel.locator("p.text-caption").all()` silently returns `[]`. The `for` loop over an
empty array runs zero iterations, so DS4's per-caption LR2 assertion asserts nothing and the test
stays green while a caption regresses to one character per line — exactly the class of defect LR2
exists to catch.

**Reproduce:** rename `text-caption` to any other string on `cookie-consent.tsx:111` and `:126`
(leaving the rendered width unchanged) and re-run
`PORT=<port> pnpm e2e --project=chromium tests/e2e/disclosure-legibility.spec.ts` — the suite stays
green; the per-caption LR2 clause silently stopped running. A positional/structural locator scoped
under the already-structural `DS4_PANEL_SELECTOR` (e.g. selecting the second `<p>` inside each of the
two caption-holding rows by position) would not have this gap.

---

## Test quality — read as an adversary

**The one test that would not fail if the behaviour broke: F4 above** (`disclosure-legibility.spec.ts:142`'s
class-based caption locator). Everything else I read against "would this fail if the behaviour
regressed" held up:

- `tests/e2e/dark-hydration.spec.ts` queries the toggle by `aria-label`, the glyphs by
  `[data-theme-icon]` (a stable attribute added for exactly this purpose, not a class), and asserts
  **computed `display`** in a real Chromium context — this is the CSS-override rule (`AGENTS.md` §8)
  satisfied correctly: a real browser, a condition that must be seen to fail first (independently
  reproduced above), and no `toHaveClass`.
- `tests/e2e/responsive.spec.ts`'s D3 floor collects elements by **own direct-child text**, not
  `textContent`, which is the one thing that keeps it from reporting every ancestor container instead
  of the collapsed element (lesson 016 — bound on both sides, and named per element in its failure
  output).
- `__tests__/app-header.test.tsx` covers both click directions, the keyboard path, the
  "no substitution across a click" clause, and asserts the accessible name via
  `getByRole(..., { name })` throughout — no test in this file reaches for `display` or any class,
  correctly leaving the cascade question to the e2e spec.
- `__tests__/spacing-guards.test.ts` states its failure boundary over the *file*, not over the eight
  keys known to be broken today (lesson 006), and I independently confirmed all five cases red
  pre-fix and green post-fix.
- `__tests__/cookie-consent.test.tsx` was left unchanged by T6 and asserts role/name/text/
  `aria-checked` only — correctly leaving the stacked-layout geometry to the e2e LR2 case, which is
  the only place a cascade fact can be honestly asserted.

## Code craft — `AGENTS.md` §8, by file and line

- **F1, F2** above — the only comments found anywhere in the diff, all six narrating a "why" rather
  than a tooling directive or (outside `lib/`) a norm citation. No comment anywhere else in the
  touched `app/`, `components/`, `hooks/`, `__tests__/`, `tests/e2e/` files — confirmed by
  `pnpm test __tests__/comment-free-code.test.ts` (green) plus my own manual `grep` sweep of every
  file in `git diff HEAD --name-only` and the untracked `scripts/`/`tests/e2e/`/`__tests__/` additions.
- **TypeScript strict**: no `any`, no `@ts-ignore`, no `!` non-null assertion found in any new or
  edited file (`app-header.tsx`, the two `scripts/*.mjs`, the three new `tests/e2e/*.spec.ts`,
  `spacing-guards.test.ts`). `pnpm typecheck` is clean.
- **English identifiers, descriptive names**: `assertLr1`/`assertLr2`/`assertLr3`,
  `isAncestorOfADs1FooterPath`, `isZeroBox`, `NUMERIC_SCALE_RULE_MESSAGE` — all read as what they do;
  no single-letter or abbreviated identifier found outside conventional loop indices.
- **Business rules stay in `lib/`**: T1–T9 add no rate, bracket, or rounding rule anywhere; confirmed
  by AC11's own check (F3 aside, which is a stripped comment, not a rule).
- **Tokens over raw values**: the sweep's own proof script (`spacing-migration-proof.mjs`) is the
  guarantee here, and I re-ran it — `PROOF OK` — as well as spot-checking `modal-dialog.tsx`'s
  `p-md`→`p-4` and `calculator-page.tsx`'s `focus:p-md`→`focus:p-4` directly against `git diff HEAD`.
- **`cn()` / no inline styles / no arbitrary values where a token exists**: unchanged by this spec
  outside the sanctioned sweep; no new inline `style` prop introduced anywhere in the diff.
- **Motion**: `app-header.tsx`'s theme toggle carries no `motion` wrapper by design (`design.md`
  §7.2 — "a theme swap must not animate"), verified by `app-header.test.tsx`'s own assertion and by
  reading the component directly (no `motion.` import in the file). `cookie-consent.tsx`'s T6 edit
  touches only two `className` strings — confirmed by `git diff HEAD`, no `motion` prop added,
  removed or retimed.
- **Reuse before writing**: T7 reuses `Button`, the existing icon imports, and `safeGAEvent`; no new
  component was created for either D1 or D2, matching `plan.md` §1.1's "no component is created".
- **No new dependency**: `pnpm-lock.yaml` unchanged by this spec's own commits (both new scripts use
  only `@playwright/test`, already a dependency; both new e2e specs use only `@playwright/test`).

## What passed — so the next run does not re-litigate it

- The migration mechanics (T5's sweep, the substitution proof, the guard test) are correct and
  proven twice over: once by the developer's own rehearsal, once by my independent worktree re-run
  against the real pre-fix tree.
- D2's fix is the CSS `dark:`/`display` approach exactly as `plan.md` §4.3 compiled it, both glyphs
  server-rendered, the click handler reading the DOM class — confirmed by reading
  `app-header.tsx` directly and by the independently-reproduced pre→post `pageerror` flip.
- AC6's tooling repairs (frozen clock, ancestor-of-footer exemption, zero-box exemption) are sound —
  I recomputed the diff from the raw JSON myself and the numbers match exactly, and neither R2 nor R3
  materialized.
- `DESIGN.md`'s B8 resolution (`design.md` run 2's two-phrase substitution) is in place verbatim at
  `DESIGN.md:393` and clears the guard.
- Coverage holds per area, not just in aggregate, with `lib/**` and `hooks/**` at 100% across the
  board and `app/**`/`components/**` comfortably above the 90% floor.

