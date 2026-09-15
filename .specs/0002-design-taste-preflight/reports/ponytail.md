# 0002 — ponytail (refactor-scout), run 1

## Verdict: pass

## Scope

Diff audited: `docs/agent-squad...HEAD` (working tree of `fix/design-taste-preflight`), 52 files,
+481/−263. Modules the diff touched, all read in full:

- `app/layout.tsx`, `app/globals.css`, `app/page.tsx`, `app/{,twitter,opengraph}-image.tsx`,
  `app/custo-da-hora/{opengraph,twitter}-image.tsx`
- `components/organisms/{app-header,work-calculator,journey-form,day-summary,salary-calculator,
  calculator-views,tax-details-panel,cookie-consent,hero-panel}.tsx`,
  `components/molecules/{copy-button,regime-field,extra-entry-row,extra-entry-list}.tsx`,
  `components/templates/{calculator-layout,calculator-page}.tsx`
- `lib/{payroll,compliance,calculator-view,og-image,structured-data}.ts`
- `__tests__/*.test.ts(x)` (14 files) and the new `__tests__/copy-guards.test.ts`
- `package.json`, `pnpm-lock.yaml`, `playwright.config.ts`, `vitest.setup.ts`
- `.agents/tools/{preview,check-reduced-motion}.mjs`
- `DESIGN.md`, `PRODUCT.md`, `.specs/INDEX.md`, `.specs/0001-foundation/STATUS.md`,
  `.agents/memory/LESSONS.md`

Everything else in the repo is out of scope. Font choice, icon library, retired claim, coverage
split and every G5 ruling (B2–B6) are settled decisions, not re-litigated here.

## Findings

None. Every hunted pattern came back clean:

- **Guard file (T9), `__tests__/copy-guards.test.ts`.** 8 `it()`s, each a direct `node:fs`
  read + one regex/string assertion, no helper beyond a 6-line `walkSourceFiles`. Nothing here
  could have lived in an existing suite — the assertions cross-cut 5+ unrelated files
  (`app/page.tsx`, both OG/Twitter alts, `lib/og-image.ts`, `lib/calculator-view.ts`) and no
  single component test owns that boundary. No framework, no fixtures, no glob dependency. Smallest thing that fails when the rule breaks.
- **Icon swap.** 15 files, all direct named imports (`import { IconClock, IconLogin } from "@tabler/icons-react"`), zero wrappers, zero re-export barrels, zero icon maps. `rg 'lucide-react'` across `app/`, `components/`, `lib/` returns nothing; `package.json` has it removed, not aliased.
- **`HeroPanel` statement mode.** `const isFigure = /\d/.test(value)` plus one `cn()` branch — no new prop, no new component, no new token. Reads as a conditional, not a mode-object/enum/config.
- **Dead weight after deletions.** `calculator-layout.tsx`: `import { motion } from "motion/react"` removed cleanly, both `motion.div`s are now plain `<div>`s with byte-identical classNames, no orphaned prop. `motion/react` stays imported in `calculator-views.tsx` (`PANEL_TRANSITION`, a different, still-used animation) — not touched, correctly. No Inter/`font-inter` remnant in `app/globals.css`, `app/layout.tsx`, `vitest.setup.ts` or `DESIGN.md` (the 3 `DESIGN.md` grep hits are "Interruptible"/"Internal", false positives).
- **Tests.** One `it()` added per new behavior (statement mode, no-preconnect, no-mount-animation, JSON-LD/h1 parity, etc.), none duplicating an existing assertion; every string-rewrite test is an in-place update (case fix or literal swap), never a delete-and-recreate. No coverage lost — `hero-panel.test.tsx`'s empty-value case is kept and re-purposed rather than dropped.
- **Tooling repairs.** Both `chromium` import fixes are one line each; the dead `#projects` dialog loop in `preview.mjs` is a straight deletion (18 lines gone), not a rewrite into a new abstraction.

## Dependencies

| Package | plan.md justification | Holds? |
|---|---|---|
| `@tabler/icons-react` (prod) | Same 24px/2px grid as Lucide, already in Next's `optimizePackageImports`, one path set per icon vs. Phosphor's six — measured, not taste | Yes |
| `lucide-react` removed | One-for-one replacement, AC9 requires absence | Yes — confirmed absent from `package.json` and every source file |
| `@axe-core/playwright` (dev) | AC12 needs a zero-violation count in both themes; Lighthouse's `>=0.98` score can't discharge a zero-violation criterion; it's the missing half of a tool the repo already instructs agents to run | Yes — dev-only, zero production bytes, fills a gap that made `preview.mjs` unrunnable |
| No new font package | `Atkinson_Hyperlegible_Next` ships inside already-installed `next/font/google` | Yes |
| No new browser driver | `chromium` re-exported by already-installed `@playwright/test`; bare `playwright` doesn't resolve from repo root | Yes |

Net production dependency count: zero (one in, one out).

## Deliberate simplifications

No `ponytail:`-style comment was added by this diff — none was needed, since T9's guard file and the tooling deletions are self-explanatory string/file operations, not corner-cuts with a ceiling.

## Pre-existing, out of scope

- `STATUS.md`'s Gates table (line 116) still lists a `recruiter | tech-recruiter` row, a leftover from the portfolio-squad template; `AGENTS.md` §3 already states this squad has no `tech-recruiter` seat. Not this diff's doing and not scored — a note for whoever next edits the STATUS template.

## What is correctly simple

The whole change is exactly the "four independent edits plus one new file" the plan promised: no new component, hook, route or token; the icon migration is 15 direct imports with a documented 4-name exception list, not a lookup table; the hero's statement mode is a one-line predicate, not a variant system; `DESIGN.md`'s new "Design Read and Dials" section is a decision record required by T10 C1, not scaffolding. Nothing here needs a second pass.
