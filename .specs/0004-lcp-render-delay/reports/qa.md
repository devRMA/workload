# 0004 — QA report (G6, run 1)

**Verdict: reject.**

One blocking finding (**F1**), in `STATUS.md`, not in source. Every shipped task — T2, T3, T4, T6,
T9 — is built as `plan.md` §3 as amended by §7 specifies, every guard this spec added was
independently re-observed red by `qa-engineer` in an isolated copy, the four gates are clean, and
coverage holds per area with no threshold lowered. What fails is the spec's own control document:
`STATUS.md` still instructs `web-standards-auditor` to write the retired **"AC1 — not scored"** line
that `plan.md` §7.5 item 1 withdrew and that `plan.md` **R12** names by name as the signal the
Finding A group was read as closed without ever being scored. T7 is the next gate, and it is the gate
that reads those two rows.

A second finding (**F2**) is a live instance of this spec's own defect class on a route outside AC6's
enumeration, reproduced in a preview-env build. It is **pre-existing**, not a regression from this
diff, and it needs a scope ruling from `tech-lead` rather than a build action from `frontend-dev`.

---

## Shared-tree attribution

`AGENTS.md` §4 rule 6. This tree carries concurrent work from specs `0003`, `0007`–`0014`; 56 paths
under `app/`, `components/`, `lib/`, `hooks/`, `public/`, `__tests__/` and `tests/` are modified or
untracked and most belong to siblings. Every red and every warning below was attributed with
`git status --short` and `git diff` before it was written down.

- `__tests__/layout.test.tsx` is modified in this tree, but the change is a sibling's (the font
  variable class assertion, `+6 -2`). Its `SITE_URL` assertion at `:51` is untouched, which is what
  makes it a valid T9 control.
- `__tests__/lr35-clearing-ranges.test.ts` appeared **during** this gate run (untracked, absent at
  14:55, present at 15:03). It is a sibling's. It is not in the 609-test figure below.
- `node .agents/tools/docs-check.mjs` reports **0 failures, 5 warnings**; all five name `0005`,
  `0006`, `0007`, `0008` and `0011`. **None names `0004`.** Alien.
- `next build` emits one warning — *"Failed to find font override values for font `Atkinson
  Hyperlegible Next`"*. The font setup in `app/layout.tsx:10-14` is untouched by this spec and the
  warning reproduces on the pre-T9 build of the same copy. Alien, pre-existing.
- No source file was edited by this gate. No git command that changes state was run. Every probe ran
  in a `tar` mirror at `…/scratchpad/iso` with a **hardlinked** `node_modules` (a symlinked one makes
  Turbopack panic with `Symlink [project]/node_modules is invalid`), deleted afterwards. No port was
  bound — ports 3917, 3920, 3941 and 3000 were occupied by other agents' `next start` processes
  throughout, and no browser measurement was run.

---

## Gate output

| Gate | Command | Result |
|---|---|---|
| lint | `pnpm lint` | **clean** — `Checked 150 files in 92ms. No fixes applied.` exit 0 |
| typecheck | `pnpm typecheck` | **clean** — `tsc --noEmit`, no output, exit 0 |
| test | `pnpm test:coverage` | **green** — `Test Files 61 passed (61) · Tests 609 passed (609)`, 12.94 s, exit 0 |
| build | `next build`, isolated copy | **clean** — exit 0, 11/11 static pages, 10 routes. One alien font warning (above) |
| build (preview env) | `VERCEL_ENV=preview VERCEL_BRANCH_URL=branch-alias.example.vercel.app next build` | **clean** — exit 0 |
| comments | `vitest run __tests__/comment-free-code.test.ts` | **green** — 1 passed. `AGENTS.md` §8 *No comments* holds across the diff |
| docs | `node .agents/tools/docs-check.mjs` | **0 failures**, 5 warnings, none for `0004` |

### Coverage, per area — never as an aggregate

Read out of `coverage/lcov.info` per top-level directory, not off the text reporter's `All files`
row. Vitest enforces the same split itself through four per-glob threshold entries, and the run
exited 0, so each glob met its own bar independently.

| Area | Bar | Statements | Branches | Functions | Lines |
|---|---|---|---|---|---|
| `lib/**` | 100 | **100%** | **100%** (140/140) | **100%** (64/64) | **100%** (258/258) |
| `hooks/**` | 100 | **100%** | **100%** (78/78) | **100%** (51/51) | **100%** (203/203) |
| `app/**` | 90 | **100%** | n/a (0/0 branches) | **100%** (10/10) | **100%** (29/29) |
| `components/**` | 90 | 99.06% | **99.25%** (265/267) | **100%** (133/133) | **99.74%** (378/379) |

The only sub-100 files are `components/organisms/salary-calculator.tsx` (line 157 uncovered, 96.87%)
and `components/organisms/ad-manager.tsx` (line 12 branch, 90%). Both are **above** the 90% bar,
both are sibling-spec files, neither is touched by T2/T3/T4/T6/T9.

**No threshold was lowered.** `vitest.config.ts` is **not modified in this working tree**. Its only
difference from `main` predates this spec and *tightens* the config rather than loosening it: a
single blanket `100` block was replaced by four per-glob entries that reproduce `AGENTS.md` §9 exactly
— `lib/**` and `hooks/**` at 100, `app/**` and `components/**` at 90.

---

## Acceptance criteria

`spec.md` AC1–AC2 and AC4 are `web-standards-auditor`'s at G6/G9 and are not scorable from a local
tree; they are marked **auditor** and the last column records whether this tree hands the auditor
what it needs. AC3, AC5, AC6 and AC7 are scored here.

| # | Criterion | Code that satisfies it | Test / evidence that proves it | Verdict |
|---|---|---|---|---|
| **AC1** | Per-route same-session `median(observedFirstContentfulPaint)` H1/H2 differential, V1/V2/V3 void conditions | none — no lever ships (`plan.md` §7.1, §7.4); T8+ closed | `plan.md` §7.5 item 1 + `.lighthouserc.js` (unmodified) + `evidence/t1-attribution.md` X1/X2/X4 for the known-good check | **auditor.** Tree is sufficient *except* F1 — `STATUS.md` tells the auditor the opposite |
| **AC2** | `median(LCP H1) < median(LCP H2)` by more than H2's own `max − min`, per route, one session | T2 (`public/*`, 781,915 → ≈308,829 B) | `summary.txt` at G9 | **auditor.** Lever shipped and verified on disk (below) |
| **AC3** | Hero numeral text in the initial HTML of both routes; no `<p>` on the LCP path emptied, skeletoned or `opacity: 0` | `components/organisms/hero-panel.tsx` (**at `HEAD`, byte for byte** — T5 dropped) | Reproduced here on the preview build: `.next/server/app/index.html` → `<p aria-live="polite" …>17:48</p>`; `custo-da-hora.html` → `<p aria-live="polite" …>R$ 0,00</p>`. The only `opacity-0` in the document is on the two visually-hidden `exit-mode` radio inputs, not on the hero path (**R3 clear**) | **pass** |
| **AC4** | Exactly one LCP candidate per load, the hero numeral, under 2,500 ms at 412×823 / 4× CPU | guard only, holds at branch head | `evidence/lcp-candidate-probe.mjs` present and runnable | **auditor.** Tree sufficient |
| **AC5** | Both routes emit `og:image` and `twitter:image` beginning `https://workload.devrma.com`. All four | `app/page.tsx:14-32`, `app/custo-da-hora/page.tsx:14-32` | `__tests__/page.test.tsx:49-70`, `__tests__/custo-da-hora-page.test.tsx:49-70`, `__tests__/metadata-image-host.test.ts:40-62`. **Reproduced here** on a `VERCEL_ENV=preview` build: all four tags on `workload.devrma.com`, exactly one of each per route | **pass** |
| **AC6** | `vercel.app` appears nowhere in `/`, `/custo-da-hora`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` — RSC payload included | T3 + T9 | **Reproduced here** on the preview build: `grep -c 'vercel\.app'` → `0` on `index.html`, `custo-da-hora.html`, `index.rsc`, `custo-da-hora.rsc`, `sitemap.xml.body`, `robots.txt.body`, `manifest.webmanifest.body`. Guarded by `__tests__/metadata-image-host.test.ts:64-68` over every `.ts`/`.tsx` under `app/` | **pass** — see **F2** for a route outside this enumeration |
| **AC7** | `pnpm check` and `pnpm build` clean; coverage 100 `lib`/`hooks`, 90 `app`/`components`; `pnpm e2e` green | — | Gate table above. `pnpm e2e` **not run by this gate**: the suite belongs to four concurrent specs, several `next start` servers were live on this machine, and a Playwright run against a shared port would race (lesson **029**). Routed to G9 | **pass on the four local gates; `pnpm e2e` deferred to the auditor, stated, not assumed** |
| **AC8** | Zero axe violations at critical/serious, both themes, both routes; no new console error | — | `node .agents/tools/preview.mjs` at G9 | **auditor.** Note **R14**: a green AC8 is evidence for nothing about X2 |

---

## Tasks against what `plan.md` actually said

| Task | Built as specified? | Evidence |
|---|---|---|
| **T2** | **yes, exactly** | `file public/favicon.ico` → `MS Windows icon resource - 3 icons`; the ICO directory parses to **three** entries, `16×16`, `32×32`, `48×48`. `icon-192x192.png` → `PNG image data, 192 x 192`; `icon-512x512.png` → `PNG image data, 512 x 512`. Sizes **14.7 kB / 22.9 kB / 132.6 kB** — the plan's table to the digit, 0% deviation, no ±15% finding owed. `app/manifest.ts` not edited, and its `type: "image/png"` is now true |
| **T3** | **yes, exactly** | `app/page.tsx:14-32` and `app/custo-da-hora/page.tsx:14-32` match the plan's two code blocks character for character, including both `alt` strings. `url` values relative and leading-slash; no `process.env.VERCEL_*`; the page-level `twitter` key carries **only** `images` — card, creator, title and description still merge from `app/layout.tsx:42-47`, one source of truth each |
| **T4** | **yes** | Three cases present and structured as the plan names them; the guard reads files from disk in `__tests__/spacing-guards.test.ts`'s idiom; the `alt` is asserted against the route module's own export, so the two cannot drift |
| **T6** | **yes, and the amendment landed** | Both cases named *"never writes a default over a stored value before the restore completes"*; §7.7 B2's correction is in — `__tests__/use-salary-calculator.test.ts:338` seeds `workRegime: "estatutario"`, not `regime: "pj"`. Every seeded key maps to a real `STORAGE_KEYS` entry in its hook (checked against `hooks/use-salary-calculator.ts:36-48` and `lib/storage.ts`), so no assertion is vacuous on a misspelt key. Both assertions are written as a loop over the seeded map, per step 4 |
| **T9** | **yes — and it stayed a refactor** | `app/sitemap.ts:2`, `app/robots.ts:2`, `app/layout.tsx:8` all `import { SITE_URL } from "@/lib/structured-data"`. **R15 checked directly:** no `lib/site.ts` exists; `SITE_URL` is not renamed or moved; a tree-wide grep for `https://workload.devrma.com` returns **zero** hits under `app/`, one declaration at `lib/structured-data.ts:3`, and one *rendered artwork label* at `lib/og-image.tsx:64` which `design.md` §C authorises and which is not a URL. `__tests__/robots.test.ts` and `__tests__/sitemap.test.ts` are **unmodified in the working tree** and green |
| **T5** | **correctly not built** | `components/organisms/hero-panel.tsx` and `__tests__/hero-panel.test.tsx` carry no T5 attributes; the hero `<p>` in the built HTML has no `aria-labelledby`. `plan.md` §7.7 B3 honoured |

### T9 byte-identity, measured rather than asserted

`plan.md` §7.3 and **R15** require T9's emitted output to be unchanged. Measured in the isolated copy,
two full builds, same tree, only `app/sitemap.ts`, `app/robots.ts` and `app/layout.tsx` swapped:

```
post-T9   5078146ee6e9926cd7f53d0437978a4b  .next/server/app/sitemap.xml.body
          2ed2b5c016ca00b19d56afd2e2d4e6f7  .next/server/app/robots.txt.body
pre-T9    5078146ee6e9926cd7f53d0437978a4b  .next/server/app/sitemap.xml.body   (HEAD versions restored)
          2ed2b5c016ca00b19d56afd2e2d4e6f7  .next/server/app/robots.txt.body
```

Byte-identical. No build warning about importing `@/lib/structured-data` from a metadata route, which
was T9's own escape clause.

---

## Test quality — read as an adversary, and re-proven red

`plan.md` §T4, §T6 and §T9 all require the guards to be seen red. `STATUS.md` § *Red-first evidence*
records the developer's runs. **I did not accept them.** Every guard below was re-broken
independently by this gate, in a fresh isolated copy, and the outputs are mine.

**T6 — the guard the lead flagged.** `legal.md` §8.1 F1 says the three `if (!isRestored) return;`
guards are *"correct by construction and asserted by no test"*, and the pre-existing case *"does not
overwrite stored values before restoring them"* stayed **green** through an unguarded run. So each of
the three guards was removed **individually** and the new cases re-run:

| Guard removed | New case result | First failing assertion |
|---|---|---|
| `hooks/use-salary-calculator.ts:142` | **red** | `grossSalary was written before the restore completed: expected '0' to be '4200'` |
| `hooks/use-work-calculator.ts:164` | **red** | `workMinutes was written before the restore completed: expected '528' to be '480'` |
| `hooks/use-work-calculator.ts:186` (the `!isRestored ||` clause of the `lastExit` effect, alone) | **red** | `never writes a default over a stored value before the restore completes` — `Tests 1 failed \| 33 passed (34)` |

All three go red on the shape LR5.4 forbids — **the first recorded write to a seeded key carrying the
module default**. The third row matters most: it is the guard `plan.md` §T6 step 5 singles out, and it
is red on its own, not only as collateral of the other two. `legal.md` **F1** is genuinely closed, and
the old case is not being counted as evidence.

**T4 and T9 — the metadata guards.** With `app/page.tsx`, `app/custo-da-hora/page.tsx`,
`app/sitemap.ts`, `app/robots.ts` and `app/layout.tsx` restored to `HEAD` in the copy:

```
FAIL  metadata image host > gives every route that ships an image route a page that declares its own social images
  +   "app declares no openGraph.images: …"          +   "app declares no twitter.images: …"
  +   "app/custo-da-hora declares no openGraph.images: …"  +   "app/custo-da-hora declares no twitter.images: …"

FAIL  metadata image host > declares the origin once, in lib/, and nowhere under app/
  +   "app/layout.tsx"   +   "app/robots.ts"   +   "app/sitemap.ts"

Test Files  1 failed (1)  ·  Tests  2 failed | 1 passed (3)
```

Case 3 names **both** files §7.7 B1 motivated it with, plus `app/layout.tsx` — the widening is real and
the exemption is genuinely gone, not replaced by a narrower one. Case 1's failure message carries the
§2.3 mechanism, as the plan required.

**Tests that would not fail if the behaviour broke.** None found in this spec's five tasks. No test in
the diff asserts a Tailwind class string, queries by class name, or mirrors an implementation. The two
page tests assert module shape; the three guards assert file contents over a class of file; the T6
cases assert write order and stored bytes.

### The one test-quality gap — F4

`__tests__/public-assets.test.ts` cases 2 and 3 loop over `manifestIcons`, derived from
`manifest().icons ?? []`, with **no assertion on its length**. Today the manifest declares two icons
and the loop bites. If a future edit empties or renames `icons`, both cases pass having measured
nothing, and the 234 kB defect becomes repeatable through the one door the task was written to close.
The sibling guard in `__tests__/metadata-image-host.test.ts:42` does exactly the right thing —
`expect(directories.length).toBeGreaterThan(0)` — so the idiom already exists in this spec's own diff.

### The one clause the plan asked for and the world cannot give — F5

`plan.md` §T4 requires **each of the three** metadata guards to be observed failing against the pre-T3
state. Case 2 (*"names no deployment host anywhere under `app/`"*) **cannot be**: the literal
`vercel.app` never appeared in any source file. The defect was always Next's *runtime* override of
`metadataBase`, never a hardcoded string, which is precisely `spec.md` C3's mechanism. The developer
did not claim otherwise — `STATUS.md`'s T4 block honestly shows three reds, not four. The clause is
unsatisfiable as written, and it should be restated as a **forward guard** rather than a red-first one,
so the next reader does not go looking for a fourth output that was never owed.

---

## Findings

### F1 — blocking. `STATUS.md` hands `web-standards-auditor` the retired AC1 instruction

- **Severity:** blocking. This is the finding that makes the verdict a reject.
- **Where:** `.specs/0004-lcp-render-delay/STATUS.md:267` (Tasks table, T7 row) and
  `.specs/0004-lcp-render-delay/STATUS.md:463-473` (Blockers, *"`tech-lead` — re-issue T7 with AC1
  scored"*).
- **What is wrong:** `:267` reads *"**amended — three changes (`plan.md` §7.5): AC1 is *not scored*
  until the bounce returns**"*. `:470` reads *"`plan.md` §7.5 item 1 tells `web-standards-auditor` to
  write **"AC1 — not scored, bounced at the T1 triage"**. That instruction is now stale"* and lists the
  re-issue as still owed. Both describe a state that no longer exists. The bounce returned; the spec
  gate closed at run 2; `spec.md` § *AC1, replaced at bounce 1* is binding; and `plan.md` §7.5 item 1
  has **already been amended** — it now opens *"AC1 is scored, on the replacement `product-manager`
  returned at bounce 1"* and withdraws T7's item 3 explicitly. `plan.md` is current. `STATUS.md` is not,
  and `STATUS.md` is what the auditor reads for task state.
- **Rule violated:** `plan.md` §7.5 item 1 — *"so is the `AC1 — not scored` line this item carried at
  the T1 triage. **Neither may appear in a report.**"* And `plan.md` **R12**, whose stated signal is a
  Finding A report that *"carries the retired `AC1 — not scored` line"*. `STATUS.md:25` of the same file
  already states the correct position — *"AC1 is now decided and must be **scored**"* — so the document
  contradicts itself 242 lines apart, and the stale half is the half sitting in the row an auditor
  opening the Tasks table will read first.
- **How to reproduce:** `grep -n "not scored" .specs/0004-lcp-render-delay/STATUS.md` → three hits.
  `:25` is correct (discharge, past tense). `:267` and `:470` are live instructions in the present
  tense. `sed -n '1127,1135p' .specs/0004-lcp-render-delay/plan.md` shows the amendment those two rows
  have not caught up with.
- **Owner:** `tech-lead`. **Not** `frontend-dev` — no source file is involved.
- **What must change to pass:** `:267`'s T7 row restated to §7.5 item 1's current three changes (AC1
  scored on the per-route `observedFirstContentfulPaint` differential with an explicit V1/V2/V3 verdict;
  `fetchTime` recorded verbatim per run; ALPN + issuer per host; `totalByteWeight` per run), and the
  `:463-473` blocker either closed as discharged by the §7.5 amendment or restated as whatever is
  genuinely still owed.

### F2 — routed for a scope ruling. `/_not-found` still emits the deployment host

- **Severity:** major, **pre-existing**, not a regression from this diff.
- **Where:** the `/_not-found` route. No source file — it is Next's generated 404 segment, which has no
  `page.tsx` and therefore no segment-level `openGraph.images` to bypass
  `getSocialImageMetadataBaseFallback` with.
- **What is wrong:** on a `VERCEL_ENV=preview VERCEL_BRANCH_URL=branch-alias.example.vercel.app` build
  of the delivered tree, `/` and `/custo-da-hora` are clean and `/_not-found` is not:

  ```
  .next/server/app/_not-found.html
    <meta property="og:image" content="https://branch-alias.example.vercel.app/opengraph-image?2f370e327c49a8d9"/>
    <meta name="twitter:image"  content="https://branch-alias.example.vercel.app/twitter-image?5964a15fb432b5df"/>
  ```

  and the string survives in four more artifacts: `_not-found.rsc`,
  `_not-found.segments/_full.segment.rsc`, `_not-found.segments/_not-found/__PAGE__.segment.rsc`,
  `pages/404.html`. Those are the only five `vercel.app` occurrences left in the entire build output.
- **Rule / criterion:** not an AC6 failure — AC6 enumerates five paths and `/_not-found` is not among
  them, so this is **outside** the spec as written. It is a failure against `AGENTS.md` §9 *"Metadata,
  sitemap, robots, manifest and structured data still correct after the change"*, and it is the exact
  defect class `spec.md` C3 describes, on the one route the class still reaches. It is also the shape
  lesson **024** warns about: `__tests__/metadata-image-host.test.ts:40-62` bounds its domain by an
  enumerated convention (*directories containing an `opengraph-image.tsx`*) rather than by the class of
  route that can emit a social image, and a route Next generates without a `page.tsx` falls outside that
  domain by construction. The guard is green and cannot see it.
- **How to reproduce:** in an isolated copy with a hardlinked `node_modules`,
  `VERCEL_ENV=preview VERCEL_BRANCH_URL=branch-alias.example.vercel.app ./node_modules/.bin/next build`,
  then `grep -rl "vercel\.app" .next/server`.
- **Owner:** `tech-lead`, for a scope ruling — either a task in this spec or a routed finding.
  `frontend-dev` should build nothing against it until that ruling exists. It was already true before
  T3, so nothing regressed; it is simply the last one standing and now visible.

### F3 — minor. X2 is carried in a table cell, not in § Carried to later gates

- **Where:** `.specs/0004-lcp-render-delay/STATUS.md` § *Carried to later gates* (`:484-517`).
- **What is wrong:** X2 is recorded as carried debt **only** inside the T5 row of the Tasks table
  (`:265`, *"X2 returns to `web-standards-auditor` as carried debt with the refutation attached"*). The
  § *Carried to later gates* list — the section `release-manager` reads at G7 and `web-standards-auditor`
  reads at G9 — carries D2, D4 twice, four lesson movements and the ledger count, and **does not mention
  X2**.
- **Rule violated:** `plan.md` **R14**, whose signal is *"`reports/audit.md`, `reports/release.md` or
  `STATUS.md` records X2 as fixed, resolved or out of scope, **or omits it from carried debt**"*. It is
  not recorded as fixed anywhere — that half is clean — but it is absent from the only list built to be
  read as the carried-debt list.
- **How to reproduce:** `sed -n '484,517p' .specs/0004-lcp-render-delay/STATUS.md | grep -c X2` → `0`.
- **Owner:** `tech-lead`. One bullet, naming X2, `components/organisms/hero-panel.tsx:44`, and the §7.7
  B3 refutation.

### F4 — minor, test quality. No positive control on the manifest icon loop

- **Where:** `__tests__/public-assets.test.ts:34-41` and `:43-49`.
- **What is wrong:** both cases iterate `manifestIcons` (`:24`, `manifest().icons ?? []`) with no
  assertion that it is non-empty. An empty collection and a collection with nothing wrong in it report
  identically green.
- **Rule violated:** `AGENTS.md` §8 *Tests … assert observable behavior*, and the lesson archived as
  **043** (*before citing a guard's green run as evidence a rule holds, assert it measured the expected
  count of the rule's subject*). The correct idiom is already in this spec's own diff at
  `__tests__/metadata-image-host.test.ts:42`.
- **How to reproduce:** stub `manifest()` to return `{ icons: [] }`; both cases pass.
- **Owner:** `frontend-dev`. One line — `expect(manifestIcons).toHaveLength(2)`, or a
  `toBeGreaterThan(0)` matching the sibling guard.

### F5 — minor, plan text. T4's case 2 cannot be seen red, and never could

Written out in full under *Test quality* above. **Owner:** `tech-lead`; restate the clause, do not ask
`frontend-dev` for a fourth red output that the mechanism makes impossible. No build action.

---

## Code craft — `AGENTS.md` §8

Checked clause by clause over `app/page.tsx`, `app/custo-da-hora/page.tsx`, `app/layout.tsx`,
`app/sitemap.ts`, `app/robots.ts`, `public/*`, and the five test files. **No violation found.**

- **English only** — every identifier and every test name in the diff is English; the only Portuguese is
  the two pt-BR `alt` strings, which are **re-used** from the existing route modules' `alt` exports and
  are user-visible.
- **No comments** — `__tests__/comment-free-code.test.ts` green, run on its own.
- **Descriptive names** — `appSourceFiles`, `imageRouteDirectories`, `readPngDimensions`,
  `MAXIMUM_ICON_BYTES`, `ORIGIN_DECLARATION_FILE`, `FALLBACK_MECHANISM`. No single letters, no
  abbreviations.
- **Strict TypeScript** — no `any`, no `!`, no `@ts-ignore`, no `@ts-expect-error` anywhere in the diff.
  The one assertion, `readdirSync(…, { recursive: true }) as string[]`
  (`__tests__/metadata-image-host.test.ts:17,22`), narrows an overload the Node types return as
  `string[] | Buffer[]`; it is the idiom `__tests__/spacing-guards.test.ts` already uses.
- **Business rules in `lib/`** — nothing moved. T9 moves a constant *into* `lib/` from three route
  modules, which is the rule running in the right direction.
- **Legal constants carry their source** — this diff defines none. `SITE_URL` is an origin, not a legal
  constant, and it carries no norm because it has none.
- **Atomic placement** — no component moved. `hero-panel.tsx` is untouched at `HEAD`, which T5's drop
  requires.
- **Reuse before writing** — T9 is the clause in action: `SITE_URL` already existed and was imported
  rather than redeclared, and R15's three forbidden shapes (a new `lib/site.ts`, a rename, a second
  literal) are all absent, checked by grep.
- **No new dependency** — `package.json` is unmodified in this tree.
- **Never assert a Tailwind class string** — no test in this diff does.
- **Motion / reduced-motion** — no motion in this diff. R3 confirmed clear on the built HTML.
- **CSS override rule** — **not engaged.** Nothing in T2, T3, T4, T6 or T9 is a utility whose job is to
  beat another rule, so no computed-style run is owed and none is claimed.

---

## What the tree gives the auditor for T7

Sufficient, with one correction owed. Present and runnable: `.lighthouserc.js` (unmodified),
`evidence/lcp-candidate-probe.mjs` for AC4, `.agents/tools/preview.mjs` for AC8,
`evidence/t1-attribution.md` with X1/X2/X4 for §7.5's known-good check against lesson **040**, and
T2's `totalByteWeight` lever verified on disk so the ≈782 kB vs ≈345 kB read is real. The AC1
command in `spec.md` is correct as written, `path.resolve` included.

**Not sufficient until F1 is fixed**, because the two `STATUS.md` rows the auditor reads for T7's
state instruct the opposite of `plan.md` §7.5 item 1.

---

## What passed — so the next run does not re-litigate it

- The four local gates: lint, typecheck, test (609/609), build — all clean, exit 0, numbers above.
- Coverage per area, all four bars met, no threshold lowered; `vitest.config.ts` unmodified.
- T2's three assets: correct file types, correct dimensions, the plan's sizes to the digit, `manifest.ts`'s `image/png` declaration now true.
- T3's four social URLs on `workload.devrma.com`, exactly one of each per route, reproduced on a preview-env build.
- AC5 and AC6, on every path AC6 enumerates, RSC payloads included.
- AC3, reproduced on the built HTML of both routes; R3 clear.
- T9 as a refactor: byte-identical `/sitemap.xml` and `/robots.txt`, R15's three forbidden shapes all absent, `robots.test.ts` and `sitemap.test.ts` unmodified and green.
- T6: all three restore guards individually re-broken and individually caught. `legal.md` F1 closed.
- T4 and T9's guards re-observed red by this gate, naming the right files.
- T5 correctly absent; `hero-panel.tsx` at `HEAD`.
- `AGENTS.md` §8, every clause, over the whole diff.

---

# 0004 — QA report (G6, run 2)

**Verdict: pass.**

The reject is discharged. **F1** is fixed in the document that caused it: the retired
*"AC1 — not scored"* instruction no longer exists anywhere in `STATUS.md` as an instruction, the T7
row now carries §7.5 item 1's three current changes, and the blocker is closed as discharged.
**T10** — the one build item in scope — is built exactly as `plan.md` §7.9 specifies and its positive
control was **re-derived here, not accepted**: emptied, the binding takes both cases red on the new
assertion; with T10's two lines removed the same emptied binding is **green**, which is F4's defect
reproduced; and with the binding cut to **one** icon the delivered exact count goes red where a
`toBeGreaterThan(0)` floor stays green, so §7.9's "exact count, not a floor" is not a preference in
this tree, it is load-bearing.

One new finding, **F6**, non-blocking and routed to `tech-lead`: `vitest.config.ts` and
`tsconfig.json` are modified in the delivered tree by no task in `plan.md` and by no row in the
decisions log. It does not block G6 — the change is narrowing, correct, and has in-repo precedent —
but `release-manager` will be asked to commit two config files this spec's documents do not explain.

**F2 is not re-raised.** `plan.md` §7.8 ruled it out of scope with an owner, four triggers and a
written candidate remedy, and it is recorded in § *Carried to later gates* as debt. That ruling is
accepted here without re-argument. **F3** and **F5** are verified fixed. Everything `plan.md` §7.8
declares not re-opened — T2, T3, T4, T6, T9, the four local gates, per-area coverage — was **not**
re-litigated; it was only re-confirmed still standing by the gates below and by a mtime check showing
exactly one file changed since run 1.

---

## Shared-tree attribution

`AGENTS.md` §4 rule 6. Three other agents are in this tree. Everything below was attributed before it
was written down.

- **Exactly one file under `app/`, `components/`, `lib/`, `hooks/`, `public/`, `__tests__/` or
  `tests/` changed since run 1.** `find … -newer reports/qa.md` → `__tests__/public-assets.test.ts`,
  15:14. That is T10 and nothing else: no scope creep, and run 1's passed items are byte-unchanged.
- **The orphaned worktree is gone.** `ls -d .claude/worktrees/*` → no matches. It appears in no output
  of this run. Nothing below is attributable to it.
- `node .agents/tools/docs-check.mjs` → **0 failures, 5 warnings**, naming `0005`, `0006`, `0007`,
  `0008`, `0011`. **None names `0004`.** Same five as run 1.
- `next build` still emits one warning — *"Failed to find font override values for font `Atkinson
  Hyperlegible Next`"*. Pre-existing, `app/layout.tsx:10-14`'s font setup is untouched by this spec.
- **No source file was edited by this gate. No git command that changes state was run.** Every probe
  ran in a `tar` mirror at `…/scratchpad/iso` with a **hardlinked** `node_modules`, deleted afterwards.
- **One environment incident, disclosed in full.** Clearing my own orphaned `next start` I issued a
  `pkill -f next-server`. It did **not** reach the sibling: pid `1467654` on port 3917 was still
  listening afterwards with the same pid, and `/proc/1467654/cwd` resolves to another session's
  `…/w0010r2` copy, i.e. spec `0010` run 2. The process I then killed by pid, `3919626`, had
  `/proc/…/cwd` inside my own `iso`. No sibling process was stopped, and no shared file was touched.
  Recorded because a reader must not have to take that on trust.
- **One editing incident on this file, disclosed.** Writing run 2 I overwrote run 1's section instead
  of appending to it, which is the convention `0006`'s `reports/qa.md` sets. Run 1 was restored
  **byte-identical** — 27,507 bytes, 355 lines, mtime 15:04 — from a sibling session's read-only
  mirror at `/tmp/claude-1000/wt-0014/`, and run 2 appended below it. Nothing under `app/`,
  `components/`, `lib/`, `hooks/`, `public/` or `__tests__/` was involved, and no other agent's file
  was written.

---

## Gate output

| Gate | Command | Result |
|---|---|---|
| lint | `pnpm lint` | **clean** — `biome check .` → `Checked 151 files in 71ms. No fixes applied.` exit 0 |
| typecheck | `pnpm typecheck` | **clean** — `tsc --noEmit`, no output, exit 0 |
| test | `pnpm test:coverage` | **green** — `Test Files 62 passed (62) · Tests 620 passed (620)`, 14.31 s, exit 0 |
| build | `next build`, isolated copy | **clean** — exit 0, 11/11 static pages, 10 routes, one alien font warning |
| comments | `vitest run __tests__/comment-free-code.test.ts` | **green** — 1 passed. `AGENTS.md` §8 *no comments* holds over T10's two lines |
| docs | `node .agents/tools/docs-check.mjs` | **0 failures**, 5 warnings, none for `0004` |
| e2e (partial, attributable) | `playwright test google-tracking responsive salary-calculator work-calculator dark-hydration`, isolated copy, clean `.next`, port 3000 | **46 passed (57.7 s)**, exit 0 |

620 tests against run 1's 609: **+4** are T10's file re-counted under the new config scope and **+7**
are siblings' untracked files that entered the tree between the runs (`__tests__/citation-guards.test.ts`,
`__tests__/lr35-clearing-ranges.test.ts`). The 62nd test file is likewise a sibling's. None of the
delta is this spec's.

### Coverage, per area — never as an aggregate

Read out of `coverage/lcov.info` per top-level directory, not off the text reporter's `All files` row.
Vitest also enforces the same split itself through four per-glob threshold entries and the run exited 0,
so each glob met its own bar independently.

| Area | Bar | Statements | Branches | Functions | Lines |
|---|---|---|---|---|---|
| `lib/**` | 100 | **100%** | **100%** (140/140) | **100%** (64/64) | **100%** (258/258) |
| `hooks/**` | 100 | **100%** | **100%** (78/78) | **100%** (51/51) | **100%** (203/203) |
| `app/**` | 90 | **100%** | n/a (0/0 branches) | **100%** (10/10) | **100%** (29/29) |
| `components/**` | 90 | 99.06% | **99.25%** (265/267) | **100%** (133/133) | **99.74%** (378/379) |

Identical to run 1, to the counted unit. The only sub-100 files remain
`components/organisms/salary-calculator.tsx` and `components/organisms/ad-manager.tsx`, both above the
90 bar, both sibling-spec files, neither touched by this spec.

**No threshold was lowered**, and this was checked against the tree as it now stands, not carried over
from run 1. `vitest.config.ts` **is** modified this run (F6), and the diff is one line — `exclude` gains
`"**/.claude/**"`. The four `thresholds` entries are untouched and still reproduce `AGENTS.md` §9
exactly: `lib/**` and `hooks/**` at 100, `app/**` and `components/**` at 90. `tsconfig.json`'s diff is
the matching `.claude` entry under `exclude`. Neither narrows the *coverage* `include` globs, which
still name `app/**`, `components/**`, `hooks/**`, `lib/**`.

---

## Acceptance criteria

AC1, AC2, AC4 and AC8 are `web-standards-auditor`'s at G9 and are not scorable from a local tree. AC3,
AC5, AC6 and AC7 are scored here. Rows verified in run 1 and not re-opened by `plan.md` §7.8 carry
their run-1 evidence; the last column says what run 2 added.

| # | Criterion | Code that satisfies it | Test / evidence that proves it | Verdict |
|---|---|---|---|---|
| **AC1** | Per-route same-session `median(observedFirstContentfulPaint)` H1/H2 differential, V1/V2/V3 void conditions | none — no lever ships (`plan.md` §7.1, §7.4) | `plan.md` §7.5 item 1; `.lighthouserc.js` unmodified; `evidence/t1-attribution.md` X1/X2/X4 for the lesson-**040** known-good check | **auditor.** Tree is now **sufficient**: F1 discharged, `STATUS.md`'s T7 row is the single live instruction and it matches §7.5 |
| **AC2** | `median(LCP H1) < median(LCP H2)` by more than H2's own `max − min`, per route, one session | T2 (`public/*`, 781,915 → ≈308,829 B) | `summary.txt` at G9 | **auditor.** Lever verified on disk at run 1, assets byte-unchanged since |
| **AC3** | Hero numeral text in the initial HTML of both routes; no `<p>` on the LCP path emptied, skeletoned or `opacity: 0` | `components/organisms/hero-panel.tsx`, at `HEAD` byte for byte (T5 dropped) | Run 1 reproduced `<p aria-live="polite">17:48</p>` and `R$ 0,00` in the built HTML of both routes, R3 clear. `hero-panel.tsx` unchanged since (mtime check) | **pass** |
| **AC4** | Exactly one LCP candidate per load, the hero numeral, under 2,500 ms at 412×823 / 4× CPU | guard only | `evidence/lcp-candidate-probe.mjs` present and runnable | **auditor.** Tree sufficient |
| **AC5** | Both routes emit `og:image` and `twitter:image` beginning `https://workload.devrma.com`. All four | `app/page.tsx:14-32`, `app/custo-da-hora/page.tsx:14-32` | `__tests__/page.test.tsx:49-70`, `__tests__/custo-da-hora-page.test.tsx:49-70`, `__tests__/metadata-image-host.test.ts:40-62`; run 1's `VERCEL_ENV=preview` build counted all four on `workload.devrma.com`, exactly one of each per route. Green again in this run's 620 | **pass** |
| **AC6** | `vercel.app` appears nowhere in `/`, `/custo-da-hora`, `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` — RSC payload included | T3 + T9 | Run 1's preview build: `grep -c 'vercel\.app'` → `0` on all seven artifacts. Guarded by `__tests__/metadata-image-host.test.ts:64-68`. `/_not-found` is **outside** this enumeration and is ruled debt by `plan.md` §7.8 | **pass** |
| **AC7** | `pnpm check` and `pnpm build` clean; coverage 100 `lib`/`hooks`, 90 `app`/`components`; `pnpm e2e` green | — | Gate table and coverage table above. `pnpm e2e`: see the paragraph below — a **partial, fully attributable** run is green; the **full** suite is not scorable from this tree and stays routed to G9 | **pass on the four local gates and on the attributable e2e subset; the full `pnpm e2e` remains G9's, stated, not presumed** |
| **AC8** | Zero axe violations at critical/serious, both themes, both routes; no new console error | — | `node .agents/tools/preview.mjs` at G9. **R14**: a green AC8 is evidence for nothing about X2 | **auditor** |

### `pnpm e2e` — whether the machine allowed it, answered rather than presumed

**The port objection from run 1 no longer held.** `ss -ltnp` showed **only** 3917 occupied, by spec
`0010`'s server; 3000, 3920 and 3941 were free. So I ran it, in the isolated copy, on 3000.

**The full-suite run is not usable as evidence about `0004`, and the reason is attribution, not ports.**
`CI=true` full run: **626 passed, 111 failed, 8 skipped**. All 111 sit in two files —
**108** in `tests/e2e/first-screen-reachability.spec.ts`, which is **untracked** (`?? `) and is spec
`0010`'s in-flight work, and **3** in `google-tracking.spec.ts`.

**Those 3 were my own instrument, and I am recording the mistake rather than the reading.** The first
run reused a `.next` built without the `NEXT_PUBLIC_ENABLE_ADS=true` that `playwright.config.ts`'s
`webServer.env` injects, which is exactly the Turbopack flag-cache trap `AGENTS.md` §4 rule 6 names.
Re-run properly — `rm -rf .next`, then the canonical `pnpm build && pnpm start` webServer path — the
tracked, sibling-unmodified specs are **46 passed, exit 0**: `google-tracking`, `responsive`,
`salary-calculator`, `work-calculator`, `dark-hydration`. `google-tracking`'s
*"should never place an ad above the calculator"* is green.

So: **nothing in this spec's diff breaks the baseline e2e**, measured, not assumed. The full suite
stays routed to G9, where spec `0010`'s file will be tracked and scorable by its own owner. `plan.md`
§7.8's routing is not re-ordered by this.

---

## T10 — built as `plan.md` §7.9 says, and its control re-derived here

| §7.9 clause | Delivered? | Evidence |
|---|---|---|
| `expect(manifestIcons).toHaveLength(2)` as the **first statement of each of the two cases** | **yes** | `__tests__/public-assets.test.ts:35` (case *"serves every manifest icon as a PNG…"*) and `:45` (case *"encodes every manifest icon at the size…"*). First statement of each body, not hoisted to a shared scope |
| Exact count, **not** `toBeGreaterThan(0)` | **yes** | Literal `2`. Discriminated by measurement below |
| `2` is what `app/manifest.ts` declares today | **yes** | `app/manifest.ts:12-23` declares exactly two icons, `/icon-192x192.png` and `/icon-512x512.png`. §7.9's escape clause ("if the count is not 2, that is a finding") is **not** triggered |
| No comment added | **yes** | `__tests__/comment-free-code.test.ts` green on its own |
| No other line changed, nothing renamed, loop bodies untouched | **yes** | The binding is still `const manifestIcons = manifest().icons ?? [];` at `:24`, the two loops and every pre-existing assertion are as run 1 quoted them, and the file is the **only** file changed since run 1 |
| No source file, no other test file | **yes** | mtime check: one file |
| Introduces no helper for two lines | **yes** | Two literal `expect` calls |

### The control, re-derived — three measurements, not one

Run in a `tar` mirror with a hardlinked `node_modules`, deleted afterwards.

**1. As delivered.** `Test Files 1 passed (1) · Tests 4 passed (4)`.

**2. Binding emptied, T10 present — both cases red on the new assertion, which is what §7.9 requires:**

```
FAIL  __tests__/public-assets.test.ts > public icon assets > serves every manifest icon as a PNG and not as a JPEG
AssertionError: expected [] to have a length of 2 but got +0
 ❯ __tests__/public-assets.test.ts:35:27
FAIL  __tests__/public-assets.test.ts > public icon assets > encodes every manifest icon at the size the manifest declares for it
AssertionError: expected [] to have a length of 2 but got +0
 ❯ __tests__/public-assets.test.ts:45:27
Test Files  1 failed (1)  ·  Tests  2 failed | 2 passed (4)
```

**3. The negative control the developer did not run, and the one that actually proves F4 was real.** A
red with the fix present only shows the assertion is wired. So the same emptied binding was run with
T10's **two lines deleted** — the pre-T10 state:

```
✓ __tests__/public-assets.test.ts (4 tests) 3ms
Test Files  1 passed (1)  ·  Tests  4 passed (4)
```

**Green on an empty collection.** F4 is not a style note; it was a live hole, and T10 closes it.

**4. The floor-versus-exact discriminator.** §7.9 insists on `2` rather than `toBeGreaterThan(0)`, and
that instruction is only worth anything if the two differ on a reachable state. With the binding cut to
**one** icon:

| Assertion under test | Result on a 1-icon binding |
|---|---|
| `expect(manifestIcons).toHaveLength(2)` — **as delivered** | **red**, both cases — `expected [ { src: '/icon-192x192.png', …(2) } ] to have a length of 2 but got 1` |
| `expect(manifestIcons.length).toBeGreaterThan(0)` — the floor | **green**, `Tests 4 passed (4)` |

A silently dropped 512×512 icon is invisible to the floor and caught by what shipped. This is the
reading the lead asked me to re-derive rather than accept: **a floor assertion does pass on a degraded
binding, and the exact count is the only one of the two that is a control.**

---

## F1 — verified discharged

`plan.md` §7.8's claim was that the retired wording survives only where a sentence retires it. Checked
by grep over the whole spec directory, not over the two lines run 1 named.

`grep -rn "not scored" .specs/0004-lcp-render-delay/` → 13 hits. Classified, every one:

| Location | What it is | Live instruction? |
|---|---|---|
| `plan.md:1150` (§7.5 item 1) | the sentence that **retires** it — *"…and so is the `AC1 — not scored` line this item carried at the T1 triage. Neither may appear in a report."* | no — it is the retirement |
| `plan.md:1412` (§7.8) | past-tense record of F1 upheld, naming the string as the defect | no |
| `plan.md:1539` (**R12**) | the risk's **stated signal**, which must name the string to be checkable | no — and R12 is meant to stay live |
| `STATUS.md:647` | past-tense record inside the discharged blocker, *"…still carried the retired `not scored` instruction"* | no |
| `STATUS.md:702`, `:940` | about **`pnpm e2e`** — *"AC7 is not scored as passed on `pnpm e2e` until that run exists"*. A different subject entirely | no |
| `plan.md:1486` | the same `pnpm e2e` sentence in §7.8 | no |
| `reports/qa.md` (run 1), 6 hits | my own report | no |

**Zero live instructions remain.** The two rows run 1 named are gone: the Tasks-table T7 row
(`STATUS.md:305`) now opens *"amended — three changes, and `plan.md` §7.5 is the binding text. (1) AC1
is **scored**…"*, carries `fetchTime` per run, the ALPN + issuer block as V2's decider, `totalByteWeight`
as T2's reading, the lesson-**040** known-good check, and closes *"This row is the only live
instruction for T7"* — which is §7.5 item 1's three changes, in order, with nothing added. The blocker
at `STATUS.md:643` now opens *"DISCHARGED at the G6 run-1 triage"* and explains which half had not
landed.

**The third copy.** `grep -rn "re-issue"` finds no surviving *"tech-lead still owns the T7 re-issue"*.
What stands at `STATUS.md:60-61` is its replacement in the past tense — *"The T7 re-issue that followed
from it is **done**"* — which is a record, not an instruction. I did not name this copy in run 1; it was
mine to find and I missed it. Recorded so the next reader knows the grep that caught it was
`grep -rn "re-issue"`, not `grep -n "not scored"` — **a retired instruction survives under words the
retirement never used**, which is why the sweep has to be over the *claim*, not over the phrase.

**R12 stays live**, as the lead states, and correctly: its subject is `reports/audit.md`, a document
that does not exist yet. Nothing in this run discharges it.

**F3 verified fixed.** `STATUS.md` § *Carried to later gates* (`:660`) now opens with an X2 bullet
naming `components/organisms/hero-panel.tsx:44`, the §7.7 B3 refutation and R14's "a green AC8 is
evidence for nothing about X2". **F5 verified fixed**: §T4's clause is restated in `plan.md` §7.8 as
clauses 1 and 3 red-first, clause 2 a forward guard, no fourth red owed.

**F2 not re-raised.** Ruled out of scope by `plan.md` §7.8 items 1–5 with an owner
(`product-manager`), four triggers, the candidate remedy and its named risk, and recorded as debt in
§ *Carried to later gates* with R16/R17 attached. Accepted as ruled.

---

## Findings

### F6 — new, minor, non-blocking. Two repository config files are modified by no task and no decision

- **Severity:** minor. It does **not** block this gate. It must be recorded before G7.
- **Where:** `vitest.config.ts:11` (`exclude` gains `"**/.claude/**"`) and `tsconfig.json:37-40`
  (`exclude` gains `".claude"`). Both mtime **15:19:08**, i.e. after T10 landed at 15:14.
- **What is wrong:** neither file appears in any task's file list in `plan.md` §3 or §7 — T2 is
  `public/`, T3 is the two route modules, T4/T6/T10 are `__tests__/`, T9 is the three `app/` files plus
  one test. And no row in `STATUS.md`'s decisions log records the change or its author. The only
  document trace runs the other way: the T10 decisions row at `STATUS.md:942` is `frontend-dev`
  **declining** to make this edit — *"I did not edit either config — that is a decision for whoever owns
  the build tooling, and out of T10's file list"* — which was the correct call under `AGENTS.md` §4
  rule 7. The escalation was raised properly and the answer to it landed in the tree without landing in
  the document.
- **Rule violated:** `AGENTS.md` §4 rule 7 and the spec-driven workflow — a decision taken outside a
  task's file list is recorded in `STATUS.md` or it is invisible. This is the same shape as F1: the
  decision reached the artifact and not the record.
- **Why it is not blocking:** the change is *narrowing* and correct. `.claude/` holds symlinks into
  `.agents/` (markdown) and, until this run, another agent's nested worktree; `biome.json` already
  excludes it, so the edit makes `vitest` and `tsc` agree with a precedent the repository already set.
  No coverage threshold and no coverage `include` glob is touched, and `tsc --noEmit` is clean with it.
  I re-derived the coverage table **after** the change, so no number in this report depends on trusting it.
- **How to reproduce:** `git diff -- vitest.config.ts tsconfig.json`;
  `grep -n "vitest.config\|tsconfig" .specs/0004-lcp-render-delay/STATUS.md` → three hits, none of them
  a decision row; `grep -n "vitest.config" .specs/0004-lcp-render-delay/plan.md` → none.
- **Owner:** `tech-lead`. **What must happen before G7:** one decisions-log row naming the author, the
  contamination it answers and the fact that the orphan directory is now gone — or a revert, since the
  condition that motivated it no longer exists. `release-manager` should not have to infer two config
  files at commit time.

### O1 — observation, not a finding. The fourth case in the same file has the same shape F4 named

Recorded so it is not re-discovered as new, and explicitly **not** a finding against T10.
`__tests__/public-assets.test.ts:52-60`, *"keeps every icon the app requests at most 150 kB"*, iterates
`[FAVICON_SOURCE, ...manifestIcons.map(...)]` with no count assertion. It can never measure nothing —
the favicon is always in the list — but on an emptied `icons` it degrades silently from three assets to
one and still reports green. `plan.md` §7.9 scoped T10 to the two cases at `:34-41` and `:43-49` and
told the developer to change no other line; the developer obeyed, which is correct. Whether the third
loop earns the same control is `tech-lead`'s call, in this spec or a later one.

---

## Test quality — read as an adversary

**Tests that would not fail if the behaviour broke: none in this spec's six tasks.** T10 specifically
was tested for exactly this and survives it: measurement 3 above shows the case it guards was
previously green on an empty collection, and measurement 4 shows it is red where a floor would not be.
No test in the diff asserts a Tailwind class string, queries by class name, or mirrors an
implementation.

Run 1's adversarial reads stand and are not repeated: T4's and T9's metadata guards were re-observed
red by this gate naming `app/layout.tsx`, `app/robots.ts` and `app/sitemap.ts`; T6's three
`if (!isRestored) return;` guards were removed **individually** and each took a case red, which is what
closed `legal.md` F1. None of those files changed since.

---

## Code craft — `AGENTS.md` §8

Checked over the only file changed since run 1, `__tests__/public-assets.test.ts`, clause by clause.
**No violation.**

- **English only** — `manifestIcons`, `toHaveLength`. No Portuguese introduced.
- **No comments** — `__tests__/comment-free-code.test.ts` green, run on its own.
- **Descriptive names** — nothing named; two assertions on an existing binding.
- **Strict TypeScript** — no `any`, no `!`, no `@ts-ignore`, no `@ts-expect-error`. `tsc --noEmit` clean.
- **Business rules in `lib/`** — nothing moved; no source file touched.
- **Legal constants carry their source** — none defined. `2` is not a legal constant; it is the count
  `app/manifest.ts:12-23` declares, and `plan.md` §7.9 names that as its source.
- **Tokens instead of raw values** — no style value introduced.
- **Reuse before new code** — `__tests__/metadata-image-host.test.ts:42` is the sibling idiom and T10
  follows it with a known count instead of a floor. No helper introduced for two lines.
- **No new dependency** — `package.json` unmodified.
- **Motion / reduced-motion** — no motion in this diff.
- **CSS-override rule** — **not engaged.** Nothing in T10 is a utility whose job is to beat another
  rule, so no computed-style run is owed and none is claimed.

---

## What must be true for the next gate

- `tech-lead`: one decisions-log row for **F6**, or a revert. Before G7.
- `web-standards-auditor` at G9: **AC1** on the per-route `observedFirstContentfulPaint` differential
  with an explicit V1/V2/V3 verdict, `fetchTime` per run, ALPN + issuer per host, `totalByteWeight` per
  run — `STATUS.md`'s T7 row is now the single live instruction and it says exactly this. **R12** is
  still live over `reports/audit.md`. **X2** and **F2** are carried debt and a green AC8 or AC6 is
  evidence for neither.
- The **full** `pnpm e2e` is G9's, on a tree where spec `0010`'s `first-screen-reachability.spec.ts` is
  tracked and owned.

## What passed — so the next run does not re-litigate it

- **F1 discharged**, verified by classifying all 13 occurrences of the retired string, plus the third
  copy under a different phrase. **F3** and **F5** verified fixed. **F2** accepted as ruled.
- **T10** built to §7.9 to the letter, and its control re-derived three ways, including the negative
  control and the floor-versus-exact discriminator.
- Four local gates clean: lint (151 files), typecheck, 620/620 tests, build. Coverage per area
  unchanged and no threshold lowered, re-derived after the config change.
- The attributable e2e subset green, 46/46, on a clean `.next` through the canonical webServer path.
- `AGENTS.md` §8 over the whole diff.
- T2, T3, T4, T6, T9, T5's correct absence: verified in run 1, byte-unchanged since, not re-opened.
