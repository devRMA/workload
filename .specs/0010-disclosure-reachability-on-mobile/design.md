# 0010 — disclosure reachability on mobile

> Owner: product-designer · Gate: `design` · Run 1

> **RUN 2 — scoped G3 re-run on M-R only (`plan.md` §3A A1.2, Q-A…Q-D), 2026-09-19.**
> **§17 is the binding statement of M-R and it supersedes every M-R sentence in §§1–16.** Where §17
> and an earlier section disagree about the relocated surface, its component, its tokens, its box or
> its budget, **§17 wins.** M-O, M-B and M-D are **untouched** by run 2, as are §5's AC2/AC3/AC7/
> AC10/AC15 rows, §5.1's corrected line counts (**re-measured in run 2 and unchanged**), §6's wide
> sweep, §7.2–§7.4, §8.2–§8.3, §9, §12.3, §12.5, §13, §15 and the 32-cell run-1 matrix.

---

## 0. How every number in this document was produced

**Nothing here is projected** (lesson **050**). Every pixel is a `getBoundingClientRect()` read,
**border box**, CSS px, one decimal place — the same quantity and the same box model `legal.md`
LR1, LR2a, LR3.5, LR4.2 and LR4.4 read, and the same one `evidence/g1-occlusion.mjs` implements.

**Isolated build, own port** (`AGENTS.md` §4 rule 6). `.next` is shared mutable state and two sibling
agents were building in this checkout while this gate ran — `uptime` read a load average of **18.83**
at the start, and `ss -ltnp` showed a `next-server` on **:3131** that is not mine. So:

```
rsync -a --exclude node_modules --exclude .next --exclude .git <repo>/ <scratch>/w0010/
cp -al <repo>/node_modules <scratch>/w0010/node_modules
cd <scratch>/w0010 && rm -rf .next && pnpm build     # EXIT=0
pnpm start -p 3910                                    # ✓ Ready, Next.js 16.3.5
```

Every run below points at `HOST=http://127.0.0.1:3910`, a production build of the current head that
owns its own `.next` and its own port.

**The baseline was reproduced before anything was proposed.** `evidence/g3-baseline.mjs` →
`evidence/g3-baseline.txt`, 16 cells:

| Quantity | `spec.md` G1 baseline | Reproduced here |
|---|---|---|
| fixed chrome, consent pending | header `0..65`, nav `766..828`, banner `354..820` `h`=466, **sum 593** | **identical, 16/16** |
| answer panel, `/` | `96..739.4` | **96..739.4**, 8/8 cells |
| answer panel, `/custo-da-hora` | `96..575` / `96..558.6` / `96..498.7` | **identical**, 8/8 |
| `linesOnFirstScreen` / `linesOccluded` | 8/4 on `/`, 9/6 and 9/5 on `/custo-da-hora` | **identical, 16/16** |
| answer label `vtop` | `/` **133.8**, `/custo-da-hora` **133.1** | **133.8 / 133.1** |
| DS1 P1..P4 heights at `w`=358 | 52.2 / 52.2 / 139.1 / **34.8** | **identical** |
| `#salario-bruto` bottom | empty **880.5**, seeded **864.1** | **880.5 / 864.1** |

**The proposed state was then constructed in the browser and measured**, never computed — the method
`legal.md` §4.4 used for the consent floor. `evidence/g3-v4.mjs` applies the design as DOM mutations
to that same production build and reads the result in **32 cells**: the 16-cell matrix, the four
consent-**answered** cells, and 1440 / 2560 / 3840 on both routes in both themes.
`evidence/g3-sweep.mjs` runs the LR3.5 scroll sweep at the three wide viewports.
`evidence/g3-lr42.mjs` measures LR4.2 and LR4.4 on the relocated consent surface.
`evidence/g3-contrast.mjs` reads every text-on-surface pair through a 1×1 canvas, because Chromium
serializes these tokens as `lab()`/`oklch()` and a naive `getComputedStyle` parse returns ~1.2:1 for
every pair — **a first pass of this gate's own contrast probe did exactly that, and it is recorded
rather than quietly re-run** (lesson **031**'s pattern, arriving on a colour instead of a surface).

All intermediate captures are in `evidence/`: `g3-baseline.txt`, `g3-prototype-v1.txt`,
`g3-prototype-v2.txt`, `g3-prototype-v3.txt`, `g3-v4.txt`, `g3-wide.txt`, `g3-sweep.txt`,
`g3-lr42.txt`, `g3-contrast.txt`.

---

## 1. Intent — what the eye does in the first two seconds at 390

1. **The number.** `17:48` on `/`, `R$ 17,31` on `/custo-da-hora` — `--text-numeral`, on the hero
   fill, **nothing painted over it**. Today it is behind the consent banner in 16 of 16 cells.
2. **The sentence under the number** — the line that says which tables produced it and from when.
   It sits in the page column, 8 px below the hero card, at `--text-caption`. It is the first thing
   the eye lands on after the figure, and it is the first time in this product's life that the
   qualification and the claim are on the same screen.
3. **The first input.** Unchanged, and measurably no lower than it is today.

Everything else — the form, the summary, the footer, the consent request — is below that, in that
order.

**What this design refuses to do:** make room by moving the answer down (AC2), by dropping a line
from the answer panel (AC4, § Non-goals), by shortening a disclosure (§ Out of scope 2), or by
spending flow height above `#salario-bruto` (AC15). All four are measured below, and all four
improve.

---

## 2. The design, in four moves

The first screen at 390×844 has **no free space**. The unoccluded flow band between the fixed header
(`0..65`) and the fixed tab bar (`766..828`) is **701 px**; the answer panel on `/` is **643.4 px**
of it in 8 of 8 cells, and the relocated surface needs 34.8. Flow height is conserved: anything
brought onto the first screen is paid for out of what is already there. That is the whole design
problem, and these four moves are the answer.

### M-O — the consent surface leaves the overlay model

`components/organisms/cookie-consent.tsx`'s first-level banner stops being `position: fixed` over the
content and becomes **the last block in the document flow**, rendered after the footer inside
`#main-content`. The persistent privacy shield renders **unconditionally** instead of only while the
banner is hidden.

This is the only family of remedy `legal.md` §4.5 leaves open. Its arithmetic is an impossibility
proof, not a preference: a bottom-anchored fixed surface may be at most **125.9 px** on `/` and
**277.0 px** on `/custo-da-hora` to clear the answer, and LR4.4's floor is **336**; the band above
the answer panel is **31 px**. `legal.md` §4.6 measures the permission in the code —
`components/organisms/analytics-wrapper.tsx:12` mounts GA only on an affirmative stored consent, so
nothing is processed before the user answers and the surface may render below the first screen.

### M-R — a whole DS1 paragraph moves from the footer to under the answer

> **SUPERSEDED BY §17.** Run 1 named **DS1 P4** as the surface that moves, on a measurement of a
> paragraph `0003`'s T2 has since replaced. Run 2 re-measured it and moves **DS1 P2** instead;
> **DS1 P4 (`0003`'s `F-1`) stays in the footer, whole.** The paragraph below describes run 1 and
> is kept for the record only.


The citation line — *Tabelas de INSS e IRRF de {ano}, em vigor desde … · Portaria …* — is **moved**,
not copied, out of `components/organisms/calculator-views.tsx`'s footer and into the page content
column directly below the answer panel, on both routes, at every width. It is the surface
`legal.md` §6 names: **34.8 px whole, at `w` 358, satisfying R with zero new copy**, and under
LR6.1 its claim is *"the calculator's output as a whole — page-level"*, which is on the first screen
in every cell.

It stays **one** rendered instance per page. The footer keeps P1, P2 and P3.

### M-B — the document's bottom reserve stops stranding surfaces under the tab bar

`#main-content`'s bottom reserve goes from **64 px** (`pb-16`) to **96 px** — `pb-16` plus `mb-8` on
whichever block is last (the footer, or the consent surface when it is mounted).

**This is F1's root cause, and M-R alone does not fix it.** Measured: in the consent-**answered**
state with M-O and M-R but without M-B, **DS1 P3 inherits the failure DS1 P4 had** — it needs
`scrollY` **2529.6** against a max of **2516** on `/`, and **1162.8** against **1149** on
`/custo-da-hora` (`evidence/g3-wide.txt`, `consent answered` rows). Moving the failing subject moved
the failure. The defect is that the reserve (64) is smaller than the band the tab bar occupies
(`844 − 766 = 78`), so **whatever is last is unreachable**. 96 > 78, with 18 px of slack.

### M-D — the phone gets its own density, and every other width is untouched

Six offsets step down one place on the Eight Steps scale, **below `sm` only**:

| # | Where | Today | Below `sm` | Buys |
|---|---|---|---|---|
| D1 | `#main-content` top breathing, `components/organisms/calculator-views.tsx:65` | `calc(--header-height + --spacing*8)` = 96 | `calc(--header-height + --spacing*4)` = 80 | 16 |
| D2 | hero card padding, `components/organisms/hero-panel.tsx:29` | `p-8` (32) | `p-6 sm:p-8` (24) | 16 |
| D3 | hero internal rhythm, `hero-panel.tsx:33` | `space-y-6` (24) | `space-y-4 sm:space-y-6` (16) | 16 |
| D4 | hero footer rule offset, `hero-panel.tsx:62` | `pt-6` (24) | `pt-4 sm:pt-6` (16) | 8 |
| D5 | card header block margin, `components/organisms/salary-calculator.tsx:78` and `components/organisms/journey-form.tsx` header | `mb-8` (32) | `mb-6 sm:mb-8` (24) | 8 |
| D6 | period control offset, `salary-calculator.tsx:246` | `mt-6` (24) | `mt-4 sm:mt-6` (16) | 8 |

**Net at 390:** 42.8 px are spent (34.8 for the surface + 8 for its gap) and 48–64 are recovered, so
the first screen ends up *shorter* than it is today, not longer. Measured deltas in §5.

**No width above 639 px changes at all** — every step is `sm:`-restored. § Out of scope 6 ("no
desktop layout change") holds by construction, and the 1440 / 2560 / 3840 measurements in §6 confirm
it.

---

## 3. Layout

### 390 × 844 — the design target

> **The M-R rows of this section are SUPERSEDED BY §17.6.**
> The header, hero and tab-bar geometry below is run 2's too — re-measured and identical, except
> that the hero card's top reads **80** and its bottom **699.4** in all five measured states.


```
   0 ┌──────────────────────────────────┐  header, fixed, 0..65
  65 │                                  │
  80 ├──────────────────────────────────┤  HeroPanel — the answer      (was 96)
     │   Saída Prevista      09:41:00   │
     │          ( progress ring )       │
     │             17 : 48              │
     │      é quando sua jornada fecha  │
     │   ── Entrada às 08:00    copiar  │
 699 ├──────────────────────────────────┤                              (was 739.4)
     │   8 px                           │  --spacing*2
 707 ├──────────────────────────────────┤  DS1 P4, w 358, h 34.8
 742 └──────────────────────────────────┘  clearance to tab bar: 23.8
 766 ┌──────────────────────────────────┐  tab bar, fixed, 766..828
 828 └──────────────────────────────────┘        shield, fixed, 784..828
 844
```

Below the fold, in flow order: the calculator card, the summary, the footer (P1, P2, P3), then the
consent surface, then 96 px of reserve.

`/custo-da-hora` is the same structure with a shorter hero: the citation lands at **542.1..576.9**
(empty), **524.8..559.6** (seeded / incoherent) and **458.7..493.5** (`monthlyHours=0`), with
**189.1 / 206.4 / 272.5 px** of clearance to the tab bar.

### 1440 × 900, 2560 × 1440, 3840 × 2160

The `lg` two-column split is unchanged: 7 (form) / 5 (hero), hero on the right, sticky at
`calc(--header-height + --spacing*8)`. The citation rides **with the hero** inside the sticky aside,
directly under the card — the same relationship the phone shows, in the column that carries the
answer.

| Width | citation box | `w` | type | horizontal overflow | control outside viewport |
|---|---|---|---|---|---|
| 390 | `707.4..742.2` | **358** | 12px | **no** | **none** |
| 1440 | `819.4..854.2` at rest, `565.8..600.5` at max scroll | **514.7** | 12px | **no** | **none** |
| 2560 | `921.7..960.8` | **729** | 13.5px | **no** | **none** |
| 3840 | `921.7..960.8` | **729** | 13.5px | **no** | **none** |

`evidence/g3-v4.txt`, both themes, both routes. The only element the off-viewport sweep returns at
any width is the `sr-only` skip link at `-1..0` (`components/templates/calculator-page.tsx:16`),
which is clipped by `sr-only` and is present identically in the baseline — pre-existing, untouched,
and reported rather than filtered out of the selector.

**Nothing reflows, nothing collapses, nothing is revealed on wide.** The Scale-Don't-Reflow Rule
holds: above 1920 the root steps and the citation grows with it (12px → 13.5px, 358 → 729), which is
the mechanism `DESIGN.md` already describes.

**What never moves:** the answer label's position relative to the top of the column (it only rises),
the hero's fill semantics, the tab bar, the header.

---

## 4. Component tree

> **The `TableCitation` row and the § Scope file list at the end of this
> section are SUPERSEDED BY §17.7.** `TableCitation` is not built; the component is
> `EstimateNotice`, an atom at `components/atoms/estimate-notice.tsx`. Every other row stands.


| Component | Level | Status | Path |
|---|---|---|---|
| `TableCitation` — the relocated DS1 P4 | **molecule** | **new** (a *move*, not an addition — the `<p>` it replaces is deleted from the footer in the same change) | `components/molecules/table-citation.tsx` |
| `HeroPanel` | organism | **extend** — three `sm:`-restored density steps (D2, D3, D4) | `components/organisms/hero-panel.tsx` |
| `CookieConsent` | organism | **extend** — first level leaves `fixed`; shield renders unconditionally | `components/organisms/cookie-consent.tsx` |
| `CalculatorViews` | organism | **extend** — D1, M-B, footer loses P4, consent rendered as the last block | `components/organisms/calculator-views.tsx` |
| `WorkCalculator` | organism | **extend** — `aside` slot becomes `<>{hero}{citation}</>` | `components/organisms/work-calculator.tsx` |
| `SalaryCalculator` | organism | **extend** — same, plus D5 and D6 | `components/organisms/salary-calculator.tsx` |
| `JourneyForm` | organism | **extend** — D5 | `components/organisms/journey-form.tsx` |
| `CalculatorLayout` | template | **reuse, unmodified** | `components/templates/calculator-layout.tsx` |
| `Button` | atom | **reuse, unmodified** | `components/atoms/button.tsx` |
| `ModalDialog` | atom | **reuse, unmodified** | `components/atoms/modal-dialog.tsx` |
| `DaySummary` (DS2, DS7) | organism | **not touched** | `components/organisms/day-summary.tsx` |
| `RegimeField` (CC) | molecule | **not touched** | `components/molecules/regime-field.tsx` |
| `CollapsiblePanel` | atom | **not touched** | `components/atoms/collapsible-panel.tsx` |

**`components/templates/calculator-layout.tsx` is not edited.** § Out of scope 4 protects it as
`0008`'s box. The citation reaches the column through the existing `aside` slot, which is why
`work-calculator.tsx` and `salary-calculator.tsx` are the files that compose it.

**Why a molecule and not two inline copies.** Two call sites need byte-identical markup around a
string AC4 and AC5 assert is unchanged; three similar lines would be fine, two copies of a legally
frozen sentence would not — a later edit to one of them manufactures the contradiction `AGENTS.md`
§5 warns about. `TableCitation` reads `CURRENT_LEGAL_YEAR` from `lib/legal-tables.ts`, exactly as the
footer paragraph does today. **No value in `lib/` changes.**

**Files this gate adds to `spec.md` § Scope, each path in full**, for `plan.md` to carry before any
edit (AC11): `components/organisms/work-calculator.tsx`, `components/organisms/hero-panel.tsx`,
`components/molecules/table-citation.tsx`.

---

## 5. What the four moves measure — the acceptance criteria, cell by cell

`evidence/g3-v4.txt`. Every row is 2 routes × 4 storage states × 2 themes unless narrowed.

| # | Criterion | Baseline | Measured after | Verdict |
|---|---|---|---|---|
| **AC1 / R** | a surface the `0006` §2.1 test returns, whole box in the first viewport, no `fixed`/`sticky` intersection, paired with a first-screen claim | **no such surface in 16/16** | **DS1 P4, 16/16.** `/`: `707.4..742.2`, `w` 358, `h` 34.8, `wholeBoxInViewport: true`, `intersectedByFixed: []`, clearance **23.8**. `/custo-da-hora`: `542.1..576.9` / `524.8..559.6` / `458.7..493.5`, clearance **189.1 / 206.4 / 272.5** | **pass** |
| **AC2** | answer label `vtop` ≤ baseline | `/` **133.8**, `/custo-da-hora` **133.1** | **104.7** and **104.0** — the answer rises **29.1** and **29.1** px | **pass** |
| **AC3** | fixed/sticky chrome on the first screen does not grow | **593** (65 + 62 + 466) | **171** (header 65 + nav 62 + shield 44), 16/16 and in all four consent-answered cells | **pass, −422** |
| **AC4 / AC5** | no rendered number, no disclosure string changes | — | **no string is written, shortened, reworded or added.** `copy.md` is an explicit no-op; G2's exemption list is **EMPTY**. The citation's text node is *moved*, not edited. `plan.md` re-runs `g1-text.mjs` and `diff`s | **by construction; verified at G6** |
| **AC6** | LR1, LR2a, LR2b, LR3-as-corrected, LR6.1 on every surface | DS1 at `w` 358 | citation `w` **358** at 390 (LR1 floor 320 ✓), **514.7** at 1440, **729** at 2560/3840. Font size unchanged at 12px, so LR2b's measured 52.4–56.7 cpl is unchanged — the column width is identical to the footer's | **pass** |
| **AC7** | `scrollY` to DS1 P1 does not grow | `/` 2459.8 / 2400.8 docTop; `/custo-da-hora` 1855.7 / 1692.3 / 1779.5 / 1901.3 | **2438.5 / 2379.5** and **1833.6 / 1669.3 / 1750.3 / 1878.3** — **−21.3 to −29.2 px in every cell** | **pass, decreases** |
| **AC10** | the AC1 surface is not intersected by the consent banner, cold load | banner over everything | banner is no longer `fixed`; `intersectedByFixed: []` in 16/16 | **pass** |
| **AC13 / O** | `linesOccluded == 0`, `linesOnFirstScreen` equal to its expected count, split sighted + assistive | 4/8, 6/9, 5/9 — **16/16 fail** | **`linesOccluded: 0` in 16/16**, and in 4/4 consent-answered cells. `linesOnFirstScreen` = **9** on `/`, **10** on `/custo-da-hora` | **pass, with a corrected baseline — see §5.1** |
| **AC15** | `#salario-bruto` bottom ≤ baseline | empty **880.5**, this spec's seeded **864.1** | **874.4** (−6.1) and **857.1** (−7.0); `monthlyHours=0` **791.0** | **pass, decreases** |
| **LR3.5** | every surface has a scroll position clear of fixed chrome | **DS1 P4 fails 4/4** — needs 2504.2 of 2490, 1228.6 of 1215 | **no surface fails, in any cell, including consent-answered.** DS1 P4 needs **zero** scroll. Bottom reserve after DS1 P3: **95.8 / 96.2** against the tab bar's 78 | **pass, F1 discharged at its cause** |
| **F2b** | DS4 spends ≤ 32 px of its root on horizontal chrome | **50** (fails by 18) | **26** — root 358, body text 332 | **fixed in passing** |

### 5.1 — AC13's expected line count changes, and this is the gate that says so

The relocated citation is a child of the answer panel's own cell, so
`evidence/g1-occlusion.mjs`'s `host` climb now includes it, and its `<a>` is one more leaf with text.
`linesOnFirstScreen` therefore moves **8 → 9** on `/` and **9 → 10** on `/custo-da-hora`.

`legal.md` §11's correction says a disagreement **corrects the baseline at the gate that found it,
never the assertion**. This is that gate, and the corrected expectation is:

| Cell | sighted | assistive | **expected `linesOnFirstScreen`** |
|---|---|---|---|
| `/`, all four storage states | 8 | 1 (*Faltam …h …m para o fim da jornada*) | **9** |
| `/custo-da-hora`, states with a period control | 9 | 1 (*Visualizar o valor por período*) | **10** |
| `/custo-da-hora`, `monthlyHours=0` | 9 | 1 | **10** |

`measured + exempt = expected` is checkable, and **zero is never a pass**. `plan.md` carries these
three numbers into the guard.

That the citation is now *inside* O's subject is a feature, not an accident: O is universal over
every rendered leaf of that panel, so from here on the disclosure is protected from occlusion by the
same criterion that protects the number.

---

## 6. The wide viewports, and the one thing the sweep had to prove

At 1440×900 on `/` with a full journey seeded, the citation rests at **819.4..854.2** at scroll 0,
and the tab bar's top is **806** — at rest it is under the chrome. **LR3.5 is existential over scroll
positions**, so "at rest" is not the question; "is there any position" is. `evidence/g3-sweep.mjs`
answers it by sweeping every scroll position:

| Viewport | route | scroll positions that clear the chrome | first clear | box at max scroll |
|---|---|---|---|---|
| 1440×900 | `/` | **8** of 60 sampled | `y` 810 → `672.8..707.5` | `565.8..600.5` |
| 1440×900 | `/custo-da-hora` | **65** | `y` 0 | `565.9..600.7` |
| 2560×1440 | `/` | **58** | `y` 0 | `921.7..960.8` |
| 2560×1440 | `/custo-da-hora` | **1** (page fits) | `y` 0 | `748.3..787.4` |
| 3840×2160 | both | **1** (page fits) | `y` 0 | clear |

**Every cell passes, and the 1440 `/` cell passes by 8 positions rather than by argument.** Had the
sweep returned zero there, this design would have been wrong and would have had to say so.

A note on reading `evidence/g3-v4.txt` at `lg` and above: the probe reports every line of the aside
as "occluded" by its own ancestor, because the aside is `lg:sticky` and the quick probe does not
implement LR3.5's exemption for *the surface itself and its own ancestors and descendants*. Those
rows are an artifact of that probe, not a finding; the sweep above is the instrument that implements
the exemption, and O/AC13 is defined at 390 only.

---

## 7. Tokens

Every value is a token. No raw hex, no arbitrary length, no step outside the sanctioned
`0.5, 2, 3, 4, 6, 8, 12, 16`.

### 7.1 — `TableCitation` (`components/molecules/table-citation.tsx`)

> **SUPERSEDED BY §17.8.** `TableCitation` is not built. The relocated surface carries no link and
> no `lib/` data; it is an atom, `components/atoms/estimate-notice.tsx`.


| Property | Token | Dark | Light |
|---|---|---|---|
| type step | `--text-caption` (0.75rem) | same | same |
| line-height | `--text-caption--line-height` (1.45) | same | same |
| letter-spacing | `--text-caption--letter-spacing` (0.012em) | same | same |
| weight | `--text-caption--font-weight` (400) | same | same |
| body colour | `--color-ink-subtle` | `oklch(0.645 0.016 264)` | `oklch(0.539 0.017 264)` |
| background (inherited) | `--color-canvas` | `oklch(0.178 0.01 264)` | `oklch(0.984 0.003 264)` |
| link colour at rest | `--color-ink-subtle` (inherited) | same | same |
| link colour on hover | `--color-accent-ink` | `oklch(0.775 0.105 262)` | `oklch(0.492 0.184 262)` |
| link underline offset | `underline-offset-2` (`--spacing*0.5` = 2px) | same | same |
| focus ring | `--color-focus` → `--color-accent-ink` (dark) / `--color-accent` (light), 2px, offset 2px | same as `globals.css` `:focus-visible` | same |
| top gap from the hero card | `--spacing*2` (8px) | same | same |
| horizontal inset | none — it is a direct child of the column at `w` 358 (page gutter `px-4`) | same | same |
| radius / border / shadow | **none.** It is text in the column, not a card | — | — |

It inherits no `text-center` (the footer's alignment stays with the footer) and carries
`text-pretty`, as the footer's paragraphs do. **It must be composed through `cn()`** —
`DESIGN.md`'s Type-Step-Is-Not-a-Colour Rule: without the extended merge config a caller's size class
silently deletes the colour class, and this element carries both.

### 7.2 — the consent surface in flow (`components/organisms/cookie-consent.tsx`)

| Property | Token | Note |
|---|---|---|
| position | static, last child of `#main-content` | was `fixed bottom-[max(--spacing*6, safe-area)] left-6 right-6 z-60` |
| width | `mx-auto max-w-4xl` — unchanged | 358 at 390, 896 at 1440 |
| top margin | `--spacing*12` (48px) — the "separates major regions" step | |
| bottom margin | `--spacing*8` (32px) — M-B | |
| surface | `--color-surface-raised` | dark `oklch(0.262 0.013 264)`, light `oklch(1 0 264)` |
| border | 1px `--color-line` | dark `oklch(0.302 0.013 264)`, light `oklch(0.912 0.006 264)` |
| radius | `--radius-2xl` (2rem) — unchanged | |
| elevation | `--shadow-raised` + `edge-lit` — unchanged | dark collapses to `0 20px 48px -28px rgb(0 0 0 / 0.6)` |
| inner row padding | `p-3 md:p-8` — **was `p-6 md:p-8`** | fixes F2b: LR2a spend **50 → 26** at 390 |
| heading / body / buttons | unchanged tokens, unchanged strings | |

**Why the elevation stays `--shadow-raised` on a surface that no longer floats.** It is still a
distinct plane asking for a decision, sitting on `--color-canvas` below a text footer; dropping to
`--shadow-card` would make it read as one more card in a column of cards. This is the one place the
Shadows-Are-A-Response-To-State rule is applied to *modality* rather than to overlap, and it is
stated so a reviewer can disagree with it deliberately.

### 7.3 — the privacy shield, now unconditional

| Property | Token | Value |
|---|---|---|
| size | `h-11 w-11` (`--spacing*11`) | 44 × 44 — The Forty-Four Rule |
| offset | `bottom-[max(calc(var(--spacing)*4),env(safe-area-inset-bottom))] right-4` | unchanged |
| surface / border / radius | `--color-chrome` + `--blur-chrome`, 1px `--color-line`, `--radius-full` | unchanged |
| icon | `IconShield` 18px `--color-ink-muted` | unchanged |
| elevation | `--shadow-card` | unchanged |
| z | `z-40` | unchanged; below the tab bar's `z-50`, and measured not to intersect it (`784..828` vs `766..828`, different x range) |

### 7.4 — the six density steps

| # | Utility today | Utility below `sm` | Token arithmetic |
|---|---|---|---|
| D1 | `pt-[calc(var(--header-height)+var(--spacing)*8)]` | `pt-[calc(var(--header-height)+var(--spacing)*4)] sm:pt-[calc(var(--header-height)+var(--spacing)*8)]` | 96 → 80 |
| D2 | `p-8 lg:p-12` | `p-6 sm:p-8 lg:p-12` | 32 → 24 |
| D3 | `space-y-6 lg:space-y-8` | `space-y-4 sm:space-y-6 lg:space-y-8` | 24 → 16 |
| D4 | `pt-6 lg:pt-8` | `pt-4 sm:pt-6 lg:pt-8` | 24 → 16 |
| D5 | `mb-8` | `mb-6 sm:mb-8` | 32 → 24 |
| D6 | `mt-6` | `mt-4 sm:mt-6` | 24 → 16 |
| M-B | `pb-16` | `pb-16` + `mb-8` on the last block | 64 → 96 |

---

## 8. States

Focus-visible is specified for every interactive element, never inherited by accident.

### 8.1 — the citation's source link (`<a>` inside `TableCitation`)

> **SUPERSEDED BY §17.9.** The relocated surface contains **no focusable element**, so this table
> has no subject. Nothing focusable is added to the first screen by M-R.


| State | Specification |
|---|---|
| **rest** | `--color-ink-subtle`, `underline underline-offset-2`. Dark **5.74:1**, light **4.84:1** on `--color-canvas` |
| **hover** | colour → `--color-accent-ink` over `--duration-fast` (160ms) `--ease-standard`. Dark **9.23:1**, light **6.19:1**. No transform |
| **focus-visible** | `outline: 2px solid var(--color-focus); outline-offset: 2px` — the `globals.css` `:focus-visible` base rule, stated here so it is not assumed. Dark ring `--color-accent-ink`, light ring `--color-accent` |
| **active** | colour holds at `--color-accent-ink`; no scale, no shadow — it is a text link inside a legal sentence, not a control |
| **disabled** | not applicable — an external source link is never disabled. If `CURRENT_LEGAL_YEAR.sourceUrl` were ever empty the component renders the sentence with no `<a>`, which is `labor-law-analyst`'s call, not a visual state |
| **loading** | not applicable — the string and the URL are static imports from `lib/legal-tables.ts`, present in the server HTML |
| **error** | not applicable |
| **empty** | not applicable — `CURRENT_LEGAL_YEAR` always resolves |
| **live-updating** | **none, deliberately.** The citation sits *outside* the hero's `aria-live="polite"` subtree (`hero-panel.tsx:44`), so typing into a field never re-announces it. A citation inside a live region would speak the Portaria number on every keystroke |

Hit target: the link is ~312 px wide × 17 px tall inside a 34.8 px paragraph. It is an inline text
link inside running prose, which is the one shape The Forty-Four Rule exempts by its own wording
("pad the hit area rather than growing the glyph" applies to controls, not to a citation inside a
sentence) — **and it is unchanged from what ships in the footer today**, at the same size, in the
same sentence. No target regresses.

### 8.2 — the consent surface's controls (behaviour unchanged, container changed)

| Element | rest | hover | focus-visible | active | disabled | loading | error | empty |
|---|---|---|---|---|---|---|---|---|
| *Configurar* | `--text-label` `--color-ink-muted`, `min-h-11`, `px-4` | colour → `--color-ink`, 160ms `--ease-standard` | `ring-focus` (2px `--color-focus`, offset 2) | no transform (it is a ghost text button) | n/a | n/a | n/a | n/a |
| *Recusar* | `Button variant="outline"`, `w-full`, **332 × 48**, area **15 936** | `--color-surface-sunken` fill, 160ms | `ring-focus` | `scale-[0.97]` + `--shadow-press`, 100ms; `motion-reduce:active:scale-100` | n/a | n/a | n/a | n/a |
| *Aceitar Tudo* | `Button variant="default"`, `w-full`, **332 × 48**, area **15 936** | `--color-accent-hover`, 160ms | `ring-focus` | as above, with its own neutralizer | n/a | n/a | n/a | n/a |
| privacy shield | 44 × 44, `--color-ink-muted` on `--color-chrome` | colour → `--color-accent-ink`, 160ms | `ring-focus` | n/a | n/a | n/a | n/a | **this is its empty state — it is now always rendered, so "no banner" is never "no way back"** |

`area(Recusar) = area(Aceitar Tudo) = 15 936 px²` at 390, measured in both themes
(`evidence/g3-lr42.txt`). **LR4.4 clause 2 holds exactly**, as it does today at 14 016 px².

### 8.3 — everything else

The hero, the tab bar, the fields, the segmented controls, the collapsible panels and the modal keep
every state they have. D2/D3/D4 change three offsets inside the hero and touch no state, no colour
and no hit target.

---

## 9. Motion

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion path |
|---|---|---|---|---|---|---|
| consent surface, enter | `isVisible` → true | `opacity` 0→1, `y` 12→0 | **320ms** (`--duration-slow`) | `--ease-out` | **1500ms** (`BANNER_DELAY_MS`, unchanged) | `MotionConfig reducedMotion="user"` drops the `y`; the opacity cross-fade is kept, because it explains that something appeared |
| consent surface, exit | a choice is saved | `opacity` 1→0, `y` 0→12 | 320ms | `--ease-out` | 0 | same — transform dropped, opacity kept |
| citation link colour | hover / focus | `color` | **160ms** (`--duration-fast`) | `--ease-standard` | 0 | kept: the scoped reset in `globals.css:310` clamps `transition-property` to `color` among others, at `--duration-fast` |
| **`TableCitation` itself** | — | **none** | — | — | — | nothing to suppress. It is present in the server HTML and never animates: it is part of the answer, and The Numbers-Don't-Move Rule reaches the sentence that qualifies the number |
| privacy shield | hover | `color` | 160ms | `--ease-standard` | 0 | kept (colour is in the clamp list) |
| hero, tab bar, panels, modal | unchanged | unchanged | unchanged | unchanged | unchanged | unchanged |

**The Same-Path Rule is preserved, and its example list changes.** Today the banner "enters from the
bottom and leaves to the bottom" of the *viewport*, via `y: 100`. In flow there is no viewport edge
to come from, so it enters from **12 px below its own resting position** and leaves the same way —
the same direction, now local. `y: 100` on a static block would drag 100 px of the page under it.

**No `transform` utility is added anywhere in this design, so no `motion-reduce:` neutralizer is
owed beyond the ones `button.tsx` and `copy-button.tsx` already carry.** The one animated element,
the consent surface, is driven by `motion` and is covered by `MotionConfig reducedMotion="user"`,
which is the mechanism `DESIGN.md` mandates for transform animations — and `y` is a transform, so it
is reached, unlike the `height: 0 → auto` residual `DESIGN.md` records against
`collapsible-panel.tsx`. **This spec does not open `collapsible-panel.tsx`, so that debt's trigger
does not fire here and it is re-routed intact**, owner `product-designer`, trigger unchanged.

**Layout shift.** The consent surface mounts 1500 ms after load as the **last** child of
`#main-content`. Nothing in the document sits below it, so no rendered box moves when it appears —
it only grows `scrollHeight`. That is a structural argument, not a measurement: `plan.md` must have
G6 measure CLS on both routes against `0004`'s budget before this claim is treated as verified
(`AGENTS.md` §5 — an instrument's output is a claim until it is reproduced, and so is an argument).
Today's `fixed` banner also mounts at 1500 ms and is exempt from CLS for a different reason
(`position: fixed`), so the comparison G6 runs is against the current number, not against zero.

---

## 10. Copy slots

> **The citation rows are SUPERSEDED BY §17.11**, which restates the slot,
> its role and its character budget for the surface that actually moves.


**No slot is filled by this gate, and none is opened.** `copy.md` is closed as an explicit no-op and
`legal.md` §6 states AC5's exemption list **EMPTY**. Every slot below is an existing frozen string
that changes container, never text.

| Slot | Role | Type step | Character budget at 390 | Source |
|---|---|---|---|---|
| citation body | names the table and the year that produced every figure on the page | `--text-caption` | **frozen, ~110 chars, 2 line boxes at `w` 358** — measured `h` 34.8. A string 1 char longer than the current one still fits; a third line box would push the box to ~52 and leave **6.4 px** of clearance to the tab bar on `/`, which is the point at which this placement stops working | `components/organisms/calculator-views.tsx:89-100`, unchanged |
| citation source link | the Portaria, as a link | `--text-caption` | frozen, inside the budget above | `CURRENT_LEGAL_YEAR.source` |
| consent heading / body / three labels | unchanged | unchanged | unchanged | `cookie-consent.tsx:53-73` |

**The character budget is the constraint `0003` must respect.** Any future change that lengthens the
citation past two line boxes at `w` 358 breaks R on `/`. `plan.md` routes that to `tech-lead` as the
boundary with `0003` that `spec.md` § Boundaries already names: **the citation's budget at 390 is two
line boxes; a longer string is a `0010` re-measurement, not a `0003` detail.**

**The one deictic constraint this gate was handed, and how it is honoured.** `content-writer` ruled
that **DS2 may not be separated from the *DSR sobre os extras* row it calls *estes extras***. This
design **does not move DS2, does not move that row, and does not open
`components/organisms/day-summary.tsx`.** Measured, `/` with a full journey seeded, both themes:
the DSR row's bottom is **2369.5** and DS2's top is **2381.5** — **12 px apart, the same 12 px as the
baseline** (2458.9 → 2470.9). The pair moved together, as one block, by the density steps.
`evidence/g3-v4.txt`, `consent answered + fullSeed` rows.

---

## 11. Disclosure placement — every surface in `legal.md`, and where it sits

> **The DS1 P2 and DS1 P4 rows are SUPERSEDED BY §17.12.**


| Surface | Today | After | Visible next to its number? |
|---|---|---|---|
| **DS1 P4** (citation, LR6.1 claim = the page's output) | footer, `docTop` 2727.2 on `/`, **never clear of the tab bar (F1)** | **first screen, `707.4..742.2` at 390, directly under the answer** | **yes — 8 px below the hero card that carries the number** |
| **DS1 P1** (storage) | footer | footer, **21.3–29.2 px closer** | reachable; LR3.5 passes |
| **DS1 P2** (estimate) | footer | footer, same shift | reachable; LR3.5 passes |
| **DS1 P3** (gap list) | footer | footer, same shift, **and the bottom reserve now clears it in the consent-answered state, which it did not before M-B** | reachable; LR3.5 passes |
| **DS2** (DSR / Súmula 172) | `day-summary.tsx`, 12 px under the DSR row | **unchanged, 12 px under the DSR row** | unchanged |
| **DS7** (art. 59 / art. 71) | `day-summary.tsx` | unchanged | unchanged |
| **DS4** (consent) | `fixed`, over the answer, 16/16 | **in flow, last block, `h` 466 ≥ LR4.4's 336 floor, LR2a spend 26 ≤ 32** | it is its own claim; it no longer covers anyone else's |
| **DS5 / DS6** (`salary-calculator.tsx` alerts) | in the card | unchanged | unchanged |
| **CA / CB / CC / CD / CE** | unmounted behind `aria-expanded="false"` | **unchanged — routed as F4**, out of this spec's remedy by § Non-goals | no, and that is `legal.md` §12 F4's finding, not this design's |

**Nothing is hidden behind a collapse by this design, and nothing that was visible becomes less so.**
The only surface that changes container is DS1 P4, and it moves from 2 700 px below the fold to 707
px above it.

---

## 12. Accessibility

### 12.1 — roles and structure

> **The `TableCitation` and source-link rows are SUPERSEDED BY §17.13.**


| Element | Role / semantics |
|---|---|
| `TableCitation` | a `<p>` in the document flow, inside the `aside` grid cell, **outside** the hero's `aria-live` subtree. No `role`, no `aria-label` — it is prose |
| its source link | `<a href target="_blank" rel="noreferrer">`, accessible name = `CURRENT_LEGAL_YEAR.source`, unchanged |
| consent surface | unchanged — `<h2>` + `<p>` + three buttons, now in flow; it gains no `role="dialog"` and loses none, because it never had one |
| privacy shield | `<button aria-label="Configurações de Privacidade">`, 44 × 44, now always present |
| the hero value | unchanged `aria-live="polite"` on the value `<p>` only |

### 12.2 — tab order at 390 (DOM order, no `tabindex` above 0 anywhere)

> **SUPERSEDED BY §17.13.** M-R as ruled adds **no focusable element**, so item 6 has no subject
> and the divergence it reports is pre-existing rather than produced by this spec.


1. *Pular para o conteúdo principal* (skip link)
2. header theme toggle
3. the tab bar's two links — `fixed`, but DOM-first inside `CalculatorViews`, unchanged
4. the form controls, in the main column
5. the summary's controls
6. **the citation's source link** — it follows the form in DOM order, because the `aside` cell is
   after `main` in the grid and only `order-first` visually. **This is a deliberate, stated
   divergence between visual and tab order, and it is the one `CalculatorLayout` already ships**:
   the hero's own copy button has exactly this relationship today. This design does not change it,
   and does not fix it, because fixing it means editing `calculator-layout.tsx`, which § Out of
   scope 4 forbids. **Reported to `tech-lead` as an observation with its cause, not absorbed.**
7. the consent surface's three controls
8. the privacy shield

### 12.3 — contrast, both themes, measured

`evidence/g3-contrast.txt`, read through a 1×1 canvas so `lab()`/`oklch()` serialization cannot
corrupt the arithmetic. WCAG 2.2 AA normal text = 4.5:1.

| Pair | Dark | Light | AA |
|---|---|---|---|
| `--color-ink-subtle` on `--color-canvas` — **the citation body** | **5.74:1** | **4.84:1** | ✓ |
| `--color-accent-ink` on `--color-canvas` — **the citation link on hover** | **9.23:1** | **6.19:1** | ✓ |
| `--color-ink` on `--color-canvas` | 17.02:1 | 15.10:1 | ✓ |
| `--color-ink-muted` on `--color-canvas` | 8.20:1 | 5.62:1 | ✓ |
| `--color-ink` on `--color-surface-raised` — consent heading | 13.87:1 | 15.77:1 | ✓ |
| `--color-ink-muted` on `--color-surface-raised` — consent body | 6.68:1 | 5.87:1 | ✓ |
| `--color-ink-subtle` on `--color-surface-raised` | 4.68:1 | 5.06:1 | ✓ |
| `--color-accent-ink` on `--color-surface-raised` | 7.52:1 | 6.47:1 | ✓ |
| `--color-ink-onfill` on `--color-accent` — hero text | 5.58:1 | 5.58:1 | ✓ |
| `--color-ink-onfill` on `--color-positive-deep` — hero text | 7.92:1 | 7.92:1 | ✓ |

**No new colour pair is introduced.** The citation renders on `--color-canvas` in the column, which
is the identical pair it renders on in the footer today.

### 12.4 — live regions while the user types

> **The `TableCitation` row is SUPERSEDED BY §17.13's live-region paragraph.** Every other row stands.


| Region | Behaviour |
|---|---|
| hero value `<p aria-live="polite">` | unchanged — announces the new figure as the user types |
| hero status `<p class="sr-only" aria-live="polite" aria-atomic>` | unchanged |
| `salary-calculator.tsx`'s stat grid `aria-live="polite"` | unchanged |
| **`TableCitation`** | **not in any live region, and must not be put in one.** Its content changes once a year, and the two states an assistive user needs from it — *which tables* and *from when* — are read on demand, not re-announced on every keystroke |

### 12.5 — reduced motion and reduced transparency

No new transform, so no new neutralizer. `prefers-reduced-transparency` already resolves
`--color-chrome` to `--color-surface` and `--blur-chrome` to 0 — which now matters *more*, because
the privacy shield is always on screen; measured `--color-ink-muted` on `--color-canvas`
**8.20:1 / 5.62:1**, above AA in the opaque fallback.

---

## 13. `PRODUCT.md` §8 — the reading this design assumes (AC14)

> **This design assumes §8 reaches the consent gate by substance: a surface that is not an ad but
> is the gate that makes ads possible is still a surface that "never sits between the user and an
> answer" and "never occupies the space where a result appears", and so it may not occupy the
> answer's band on the first screen.**

That is the reading the human has already ruled (`STATUS.md`, blockers, AC14). It is stated in one
sentence here so it can be overruled in one place rather than reconstructed from a diff.

**The L3 ruling this geometry change carries**, per AC10 and `legal.md` §4:

- **No norm fixes placement, height, width, duration or z-order** (§4.1, fourteen operative units).
- **The surface may render below the first screen or in document flow with no loss of validity**
  (§4.6), because `analytics-wrapper.tsx:12` mounts GA only on an affirmative stored consent.
- **LR4.4's five clauses, re-measured on the relocated surface at 390, both themes**
  (`evidence/g3-lr42.txt`): body text `w` **332**, LR2a spend **26** ≤ 32 ✓ (clause 1);
  `area(Recusar)` **15 936** = `area(Aceitar Tudo)` **15 936**, both inside the surface, unclipped ✓
  (clause 2); *Configurar* **103.5 × 44** ≥ 24 × 24 ✓ (clause 3); the art. 9º / art. 18 link is
  **still absent** — **finding F3, pre-existing, routed, untouched and not worsened** (clause 4);
  none of `sr-only`/`display:none`/`visibility:hidden`/`opacity:0`/`[hidden]`/`aria-expanded=false`
  ✓ (clause 5). **Height 466 ≥ the 336 floor.** The surface is not shrunk by this design.
- **Persistence (art. 8º §5º) improves rather than degrades:** the revocation shield goes from
  *rendered only while the banner is hidden* to *always rendered*.

**What this design does not price, in either direction:** what moving the request below the fold does
to consent rate or to revenue. § Out of scope 9 forbids it and `legal.md` §16 Q3 hands it to the
human. The consequence is recorded plainly and without a number: **a user who never scrolls never
answers, and telemetry never runs.**

---

## 14. Findings this gate produces or inherits

> **See §17.14 for the delta.** F1's row is
> re-evidenced, the tab-order row is **withdrawn**, and two rows are added. Every other row stands.


| # | What | Disposition |
|---|---|---|
| **F1 — discharged** | DS1 P4 under the tab bar at every scroll position, 4/4 | **fixed at its cause, not by moving the subject.** M-B raises the bottom reserve from 64 to 96 against the tab bar's 78. Verified in the consent-answered state, where M-R alone had handed the same failure to **DS1 P3** (2529.6 of 2516; 1162.8 of 1149) |
| **F2a — precondition, fires** | `cookie-consent.tsx:15` `useState(true)` — the telemetry switch opens pre-enabled | **This design opens `components/organisms/cookie-consent.tsx`, so `legal.md` §12's trigger fires and F2a becomes a precondition of this spec.** The switch's initial value is a consent ruling (LGPD art. 5º XII, art. 8º §4º, ANPD's avoid list), **not a design decision** — this gate does not set it. `plan.md` carries it as its own task, sequenced before or with the geometry task, and `labor-law-analyst` states the value |
| **F2b — fixed in passing** | DS4 spends 50 px of horizontal chrome against a 32 budget | Fixed: `p-6` → `px-3 py-6 md:p-8` at the phone, spend **50 → 26**, measured. Horizontal only — the vertical padding is untouched, so the surface height stays 466 and LR4.4's floor is not approached. Worth 0 px of height here and correctness everywhere |
| **F3 — untouched, not worsened** | no cookie policy, no privacy page, no art. 9º link | **Out of scope, raises the floor rather than lowering it.** This design does not add the link, because a link needs a **label**, which is a new pt-BR string § Non-goals forbids and `content-writer`'s **T1** already named as a G1 amendment. Routed intact |
| **F4 — untouched** | `Extra 100%` traces to no norm; CA/CB absent from the DOM | Out of this spec's remedy. Routed intact, trigger unchanged |
| **NEW — LR4.2's viewport clause against a surface that is legitimately below the fold** | LR4.2 reads *"fully within the viewport … at 390×844 and 1440×900"*. A consent surface in document flow has no control in the viewport at scroll 0, yet `legal.md` §4.6 **expressly permits** it to render below the first screen. The two clauses of one document point opposite ways on the same surface | **Stated, not resolved here** (`AGENTS.md` §4 rule 8; lesson **048**). The reading this design assumes is that LR4.2's viewport clause is **existential over scroll positions**, the same quantifier LR3.5 uses, and it is measured under that reading: at the scroll position that brings the surface into view, all three controls are `inViewport: true`, `inSurface: true`, `clipped: false`, both themes, at 390 and at 1440. **`tech-lead` routes this to `labor-law-analyst` for confirmation at G6.** If the universal reading is the right one, this family of remedy is closed and §4.5 has already closed every other one |
| **NEW — `area(reject) ≥ area(accept)` at 1440** | At 1440 the row is `md:flex-row` with intrinsic button widths: `Recusar` **4 935 px²** vs `Aceitar Tudo` **6 296 px²** | **Pre-existing and unchanged by this design** — the `md` row and the button sizing are not touched, and LR4.4's stated domain is **390×844**. Reported with its numbers rather than filtered out, and routed to `labor-law-analyst` with the trigger *the first spec that opens `cookie-consent.tsx`'s control row* |
| **NEW — visual order and tab order diverge in the aside cell** | The citation is visually second on a phone and seventh in the tab order, because `CalculatorLayout`'s aside is `order-first` only visually | **Pre-existing** — the hero's copy button has the same relationship today. Fixing it means editing `components/templates/calculator-layout.tsx`, which § Out of scope 4 forbids. Reported to `tech-lead` with its cause and its file |
| **Carried — DS2 / Súmula 172 e2e debt (`0006` G10)** | `grep -rn "Súmula 172\|DSR" __tests__ tests components lib` → 10 rows, **0 under `tests/`** | **The trigger does not fire.** This design does not open `components/organisms/day-summary.tsx`, does not change the caption's type token, and does not change `DESIGN.md`'s type scale. **Re-routed intact**, owner and trigger unchanged. AC9's alternative branch applies, and `plan.md` states it |
| **Carried — `collapsible-panel.tsx` reduced-motion residual (`DESIGN.md` Motion)** | `height: 0 → auto` is not suppressed under reduced motion | **Trigger does not fire.** This design opens no collapsible panel and adds no `motion` value animation on a non-transform property. Re-routed intact, owner `product-designer` |

---

## 15. System changes — **human approval points**

Three, each with what it replaces and why. `AGENTS.md` §4: the pipeline stops here for the human
before any of them is built.

### S1 — the hero panel gets a phone padding step

> **`DESIGN.md` § Hero panel, bullet 1.** Replace *"**Padding** 32px, 48px from `lg`"* with
> *"**Padding** 24px below `sm`, 32px from `sm`, 48px from `lg`"*.

**Why.** `DESIGN.md`'s own density table already says the card padding at **390 is 24px**, and the
hero is the single card in the product that spends 32 there. The two statements contradict each
other today; this resolves the contradiction **towards** the density table rather than away from it.
**What it buys, measured:** 16 of the 42.8 px the citation costs. **What it replaces:** nothing else
— 768, 1440, 2560 and 3840 are byte-identical, because the step is `sm:`-restored.

### S2 — the document's bottom reserve is defined against the tab bar, not as a constant

> **`DESIGN.md` § Density at the five reference widths, the 390 row.** Replace *"content reserves
> `pb-16` (64px) below"* with *"content reserves **96px** below — `pb-16` plus `mb-8` on the last
> block — because the floating tab bar occupies **78 CSS px** of the viewport's bottom
> (`766..828` plus its `--spacing*4` inset at 390×844) and a reserve smaller than that band leaves
> **whatever is last in the document unreachable at every scroll position**."*

**Why.** This is not a taste change; 64 < 78 is a defect, and it is the mechanism of `legal.md`'s
**F1**. It was seen red twice in this gate: once as DS1 P4 (the shipped state) and once as DS1 P3
(the proposed state before M-B). **What it replaces:** a constant that was never checked against the
chrome it had to clear. **What it costs:** 32 px of scroll at the very bottom of the document, and
nothing on the first screen.

### S3 — the Same-Path Rule's consent-banner example becomes local

> **`DESIGN.md` § Motion, The Same-Path Rule.** The cookie banner "enters from the bottom and leaves
> to the bottom" now refers to **its own resting position** (`y: 12`), not to the viewport edge
> (`y: 100`), because the surface is no longer viewport-anchored.

**Why.** The rule's substance — what enters from a direction exits to that direction — is preserved;
only the frame of reference moves with the element. **What it replaces:** an example that describes a
`fixed` element this spec makes static. The tab bar and the ad-block notice keep the viewport-edge
reading.

**Not proposed, and deliberately so:** no new token, no new type step, no new spacing key, no new
duration, no new curve. Every value in this document is already in `app/globals.css`. In particular
**no key is added to the `--spacing-*` namespace** — `DESIGN.md`'s Numeric Scale Rule, and the
reason a legally required disclosure once shipped 64 pixels wide.

---

## 16. What `plan.md` must carry

> **Item 7 is SUPERSEDED BY §17.15**, which replaces it with nine
> clauses for **T4′**. Items 1–6, 8 and 9 stand unchanged.


1. **Every measurement above is `design.md`'s, taken on a DOM-mutated production build.** `G5`
   builds it in source; `G6` re-runs `evidence/g1-fold.mjs`, `g1-answer.mjs`, `g1-chrome.mjs`,
   `g1-occlusion.mjs`, `g1-scroll.mjs`, `g1-firstinput.mjs` and `g1-text.mjs` with `HOST` re-pointed
   at the artifact under test and pastes the deltas. A number in this document that the built
   artifact disagrees with **corrects this document at the gate that found it**.
2. **AC13's corrected expected counts: 9 on `/`, 10 on `/custo-da-hora`, split `sighted + assistive`
   (8 + 1 and 9 + 1).** Zero is never a pass; assert the set size before the clause.
3. **LR3.5's guard asserts its surface count first** — four on `/` in the minimal seeds, seven on `/`
   with a full journey seeded, four on `/custo-da-hora` — then the clause. And it runs the
   **consent-answered** state, which is where M-R alone was seen red.
4. **F2a is a precondition**, and its value comes from `labor-law-analyst`, not from the developer.
5. **AC5's exemption list is EMPTY**, stated as empty.
6. **The DS2 debt is re-routed intact** with owner and trigger; the trigger did not fire.
7. **Three files are added to § Scope, each path in full:**
   `components/organisms/work-calculator.tsx`, `components/organisms/hero-panel.tsx`,
   `components/molecules/table-citation.tsx`.
8. **`components/templates/calculator-layout.tsx` is absent from the diff**, as are `lib/` and every
   other spec's scope.
9. **Three system changes (S1, S2, S3) are human approval points** and are not built until the human
   approves them.

---

## 17. Run 2 — M-R, re-measured on the footer as `0003` delivers it

Scoped G3 re-run, **M-R only**, answering `plan.md` §3A **A1.2 Q-A…Q-D**. Bounce 1 of 2 on this
spec's G3. Nothing below re-opens `legal.md`, `spec.md`, `copy.md`, M-O, M-B, M-D or §15's S1/S2/S3.

### 17.0 The state every number below was read in

**Tree state.** `HEAD` = **`5c0c6fa`**, plus an **uncommitted working tree** — `0003`'s T1–T7 and
this spec's T2/T3 are landed but not committed, so a bare sha does not identify the bytes measured.
The rendering inputs are pinned by content hash instead, `sha256`, read in this session:

| File | `sha256` |
|---|---|
| `components/organisms/calculator-views.tsx` | `104c06ab36bf20c5390e0a1cac9081b2ff950ad1f7ca50d1246cd33b574ad3ef` |
| `components/organisms/hero-panel.tsx` | `956a0e7b5cb5a958d645262de24293cf5b13e86467c20ecfaf4c04e8cfbb7c29` |
| `components/organisms/cookie-consent.tsx` | `89be99dd1954bfc543565cf82cd80bf32ffa63fe92a3683b9e9455255dc2fe1a` |
| `components/templates/calculator-layout.tsx` | `efd3ba5c969e8b669a5ae49a366121969887fedc5942a519ac1000019bbb6971` |
| `components/organisms/day-summary.tsx` | `ed924c4f76b716ff4c906e41545f83d4b5a695f66138994822b1de6fe5b3849a` |
| `lib/legal-tables.ts` | `c4a1045fc116e462c2bdd51c4f12a5f6f30c1cc07839b5872164d00b3299cd74` |
| `app/globals.css` | `1f715efcebc3f87fffbd01acc4c8a65b113a17b2c24a9c680a0c75e25b635caf` |

**Is the target still moving?** `0003`'s `STATUS.md` records **T1–T7 done, T8 and T9 pending**. T8
opens `components/molecules/regime-field.tsx` — a surface that renders **inside the journey settings
panel, which is `aria-expanded="false"` and absent from the DOM on load** (this spec's **L2**, and
`plan.md` §4's F4 row) — and T9 opens only `tests/e2e/support/legibility.ts` and
`tests/e2e/disclosure-legibility.spec.ts`. **Neither can move any box in §17.** `0003`'s
`plan.md` opens `components/organisms/calculator-views.tsx` in **no remaining task**
(`plan.md` §3A A1.3, checked against every `Files:` line). So the footer is measured in the state
`0003` delivers it, and the two open tasks are named rather than assumed away.

**Isolated build, own port.** `AGENTS.md` §4 rule 6. `uptime` before the run: load **13.21 / 6.23 /
2.97** on **16** cores; `ss -ltnp` showed `next-server` on **:3100** and **:3917**, neither mine, and
`pgrep -af "headless_shell|chrome-linux|playwright"` returned **no browser measurement in flight**.

```
rsync -a --exclude node_modules --exclude .next --exclude .git <repo>/ <scratch>/w0010r2/
cp -al <repo>/node_modules <scratch>/w0010r2/node_modules
cd <scratch>/w0010r2 && rm -rf .next && pnpm build     # EXIT=0
pnpm start -p 3920                                      # Ready, production build
```

`:3920` was confirmed free before the start. **Never `next dev`.**

**Box model.** `getBoundingClientRect()`, **border box**, CSS px, one decimal — the same quantity
`legal.md` LR1/LR2a/LR3.5/LR4.2/LR4.4 read. Line boxes are counted from
`Range.selectNodeContents(el).getClientRects()` distinct `round(top)`, never from characters
(lesson **050**).

**Nothing in §17 is projected.** Every cell is a reading. Instruments and captures:
`evidence/g3r2-mr.mjs` → `g3r2-mr.txt` (the DS1 P4 matrix, 24 cells × 3 variants),
`g3r2-placement.mjs` → `g3r2-placement.txt` (the above-the-hero placement),
`g3r2-alt.mjs` (the three candidate whole surfaces),
`g3r2-mr-p2.mjs` → `g3r2-p2.txt` (the DS1 P2 matrix, 24 cells × 3 variants),
`g3r2-footer.mjs` → `g3r2-footer.txt` (the footer's own LR3.5, before and after the move),
`g3r2-lines.mjs` → `g3r2-lines.txt` (AC13's counts), `g3r2-wide.mjs` → `g3r2-wide.txt` (2560, 3840).

**Three variants, measured in one page load each**, so every delta is a difference read on the same
load rather than across two runs:

| Variant | What is in the page |
|---|---|
| **A — shipped** | the tree above. **M-B (T3) is already in source**: `#main-content` `pb-16` + footer `mb-8` |
| **B — +M-O +M-D** | A, plus T5 (consent leaves `fixed`, shield unconditional) and T6 (the six phone density steps) applied as DOM mutations — this is **Q-C's state**, the tree T4′ actually lands in |
| **C — +M-R** | B, plus the candidate surface moved into the `aside` cell under the hero card |

---

### 17.1 Q-A — DS1 P4 (`0003`'s `F-1`) re-measured, in the footer and in the `aside` slot

The paragraph run 1 placed no longer exists. `F-1` is **398 characters with four `<a>`**, and it
measures, in **both** containers — they are the same column, so the size is the same object:

| Where | viewport | `w` | line boxes | cpl | **`h`** | font |
|---|---|---|---|---|---|---|
| footer (variants A, B) | 390×844 | **358** | **7** | **56.86** | **121.7** | 12px |
| `aside` slot (variant C) | 390×844 | **358** | **7** | **56.86** | **121.7** | 12px |
| footer (variants A, B) | 1440×900 | **768** | **4** | **99.50** | **69.6** | 12px |
| `aside` slot (variant C) | 1440×900 | **514.7** | **5** | **79.60** | **87.0** | 12px |

The 390 figures reproduce `0003` `design.md` §10.2 **M16** to the hundredth — **7 line boxes,
56.86 cpl** — independently, in this tree, in the destination container. **Run 1's `h` 34.8 is dead;
the surface is 3.5× taller.**

**M-R's run-1 placement, re-measured in variant C** (`evidence/g3r2-mr.txt`, 20 cells at 390 — 2
routes × 4 storage states × 2 themes, plus consent-answered + fullSeed on both routes × 2 themes):

| route | states | box at scroll 0 | whole box in viewport | intersects fixed | clearance to tab bar |
|---|---|---|---|---|---|
| `/` | all 4 storage states, both themes, **and** consent-answered | **`707.4..829.1`** | **yes** | **`nav` (766..828) + the privacy shield** | **−63.1** |
| `/custo-da-hora` | empty | `542.1..663.8` | yes | none | **+102.2** |
| `/custo-da-hora` | seeded / incoherent / consent-answered | `524.8..646.6` | yes | none | **+119.4** |
| `/custo-da-hora` | `monthlyHours=0` | `458.7..580.5` | yes | none | **+185.5** |

**Run 1's cells, beside run 2's, so the delta is attributed rather than argued:**

| Cell | run 1 (`h` 34.8) | run 2 (`h` 121.7) | delta |
|---|---|---|---|
| `/`, box | `707.4..742.2` | `707.4..829.1` | **+86.9 px of bottom**, all of it `0003`'s T2 |
| `/`, clearance to tab bar | **+23.8** | **−63.1** | **−86.9** |
| `/custo-da-hora`, clearance | +189.1 / +206.4 / +272.5 | +102.2 / +119.4 / +185.5 | **−86.9 in every cell** |

The top is identical — `707.4` in both runs — because the box above it did not change. **The whole
delta is the paragraph's own growth**, and it is exactly the growth `0003` measured.

---

### 17.2 Q-B — does **any** placement satisfy **R** with `F-1` whole? **No, on `/`.**

**The finding's subject is a container constant, not the paragraph** (lesson **054**). At 390 on `/`:

| Quantity | Measured | Where |
|---|---|---|
| header, fixed | `0..65` | `g3r2-mr.txt`, `fixedChrome` |
| tab bar, fixed, its top | **766** | same |
| the clear band R can use | **`766 − 65` = 701** | derived from the two above |
| `#main-content`'s content top (its `pt` under D1) | **80** | `g3r2-placement.txt`, `heroCard.top` |
| the first screen's usable budget | **`766 − 80` = 686** | — |
| hero card height, **all five measured states** | **619.4** | `g3r2-placement.txt` |
| separation token `--spacing*2` | 8 | §7.1 |
| `F-1` | **121.7** | §17.1 |
| **what M-R needs** | **`619.4 + 8 + 121.7` = 749.1** | — |
| **deficit** | **`749.1 − 686` = 63.1** | equal, to the decimal, to the measured `−63.1` clearance |

> **The rule, stated as the comparison and not as the pixel delta:**
> `navTop − contentTop (686) < heroCardHeight + gap + surfaceHeight`.
> On `/` at 390 the **whole budget for a relocated surface is `766 − 699.4 − 8` = 58.6 px**, which is
> **three line boxes** at `--text-caption`'s 17.4. `F-1` needs seven. **No ordering fixes this**:
> even at a zero gap, `619.4 + 121.7 = 741.1` exceeds the 701 px band by **40.1**, so the pair
> {hero card, `F-1`} does not fit on the first screen of `/` in **any** arrangement.

**The one arrangement that is not ruled out by that arithmetic was measured anyway, not argued**
(`evidence/g3r2-placement.txt`, 16 cells, 2 routes × 4 storage states × 2 themes) — `F-1` **above**
the hero card:

| Cell | citation box | hero card | answer label `vtop` | citation satisfies R | hero intersects fixed |
|---|---|---|---|---|---|
| `/`, all 4 states, both themes | `80..201.7` | `209.7..829.1` | **234.4** (baseline **112.7**) | yes | **`nav` + shield** |
| `/custo-da-hora`, all 4 states | `80..201.7` | `209.7..663.8` / `646.6` / `580.5` | **233.7** (baseline **112.0**) | yes | none |

It buys R for the disclosure by **breaking the criterion the disclosure exists to protect**:
**AC2** (answer label `vtop` ≤ baseline) fails by **+121.7 px** on both routes, and on `/` the hero
card — the box that holds the number — is itself intersected by the fixed tab bar, which is
**finding O**, `AC13`'s `linesOccluded == 0`, and `PRODUCT.md` §8. **Rejected on measurement.**

**`/custo-da-hora` alone would pass.** R is scored over 16/16 cells, so one route passing is not a
pass. Recorded because a later reader will otherwise re-derive it.

> ### Q-B, answered
>
> **No placement satisfies R with `F-1` whole at 390×844 on `/`.** The obstruction is not where the
> paragraph sits; it is that the first screen's budget below the answer is **58.6 px** and `F-1` is
> **121.7**. Nothing in this design shortens it, splits it, re-types it or moves it below a fold it
> is already below. **`F-1` stays in the footer, whole, exactly as `0003` delivered it.**

---

### 17.3 The ruling — **M-R relocates DS1 P2**, and the L5 route does **not** fire

`plan.md` A1.2's conditional route sends a *no* on Q-B to `labor-law-analyst` as **L5**. **It does
not fire, and the reason is in `legal.md`'s own text, not in this gate's preference.**

`legal.md` **§6** does not name DS1 P4. It names **four candidate whole surfaces** and rules:

> | Candidate whole surface | height | body `font-size` | LR2b at 390 today |
> |---|---|---|---|
> | **DS1 P4** | 34.8 | 12px | binds; passes |
> | **DS1 P1** | **52.2** | 12px | **binds; passes** |
> | **DS1 P2** | **52.2** | 12px | **binds; passes** |
> | DS1 P3 | 139.1 | 12px | binds; passes |
>
> *"A remedy that relocates **one of these** whole satisfies R with **zero new copy**, zero rewording
> and zero `0003` interaction. Naming their heights is a statement about the size of the object, not
> about where it goes — **the placement stays G3's**."*

**L5's subject is a split or a new string.** Its settled text forbids *"shortening an existing
surface to fit"* and conditions *"a short line above the fold plus the full text in the footer"*.
This design does neither: it relocates a **different whole paragraph**, which is the branch §6
authorises in advance and expressly leaves to G3. What `0003` killed is one row of that table, not
the table. **A1.2's own third bullet says the same thing from the other side —** *"choosing a
different surface for M-R is `design.md` §3/§5's call, not a task's."*

**All three remaining candidates were measured in the destination**, not selected from the table
(`evidence/g3r2-placement.txt` with the marker swapped; 8 cells each at 390, both routes, four
storage states, dark — light is byte-identical on every geometric field):

| Candidate | `h` | line boxes | `/` box | `/` clearance to tab bar | `/` R | `/custo-da-hora` R |
|---|---|---|---|---|---|---|
| **DS1 P1** — storage | **52.2** | 3 | `707.4..759.6` | **+6.4** | **pass** | pass (+171.7 … +255.1) |
| **DS1 P2** — estimate | **52.2** | 3 | `707.4..759.6` | **+6.4** | **pass** | pass (+171.7 … +255.1) |
| DS1 P3 — the gap list | 139.1 | 8 | `707.4..846.5` | **−80.5** | **fail** — `nav` + shield, and the box leaves the viewport | pass |

P1 and P2 are geometrically **identical**. The choice between them is a claim question, and it is
this gate's:

- **DS1 P2 qualifies the number.** *"…não substituem seu holerite, não valem como registro oficial
  de ponto…"* names the two outputs of the two routes — the payslip figure on `/custo-da-hora` and
  the time-clock record on `/`. **LR6.1 pairs a claim with the disclosure that qualifies it**, and
  on the first screen the claim is the figure in the hero card.
- **DS1 P1 qualifies the storage**, not the figure. It is a true and necessary disclosure and it
  stays where a page-level privacy statement belongs.

> ### The ruling
>
> **M-R relocates `DS1 P2` — the estimate disclaimer — whole, unedited, from the footer to the
> `aside` cell directly under the hero card, on both routes, at every width.**
> **`DS1 P4` (`0003`'s `F-1`) stays in the footer, whole. `DS1 P1` and `DS1 P3` stay in the footer.**
> **One rendered instance per page. No string is written, shortened, reworded, split or added —
> AC5's exemption list stays EMPTY.**

**And F1 — the finding that opened this spec — is already discharged without M-R.** §17.4's footer
table shows **LR3.5 passing for all four DS1 paragraphs in every measured cell of variants A and B**,
because **M-B (T3, in source) raised the bottom reserve from 64 to 96 against the tab bar's 78**.
That is exactly what §2's M-R/M-B paragraphs claimed — *"This is F1's root cause, and M-R alone does
not fix it"* — now measured on the grown footer. **M-R is therefore not load-bearing for LR3.5; it
is load-bearing for `spec.md`'s R clause 1, the product's bar** (`legal.md` §7, **L6**).

---

### 17.4 Q-C — the full matrix, with **M-B in source and M-O + M-D applied**

All cells are **variant C on top of variant B**, which is the tree T4′ lands in under the amended
order `T3 → T5 → T6 → T4′`. `evidence/g3r2-p2.txt`, 20 cells at 390 plus 4 at 1440;
`evidence/g3r2-wide.txt`, 8 cells at 2560 and 3840.

**The relocated surface, `DS1 P2`, at 390×844 — every cell, both themes:**

| route | storage state | box at scroll 0 | `w` | `h` | lines | cpl | whole box in viewport | intersects fixed | clearance to tab bar |
|---|---|---|---|---|---|---|---|---|---|
| `/` | empty | `707.4..759.6` | 358 | 52.2 | 3 | 56.67 | **yes** | **none** | **+6.4** |
| `/` | seeded | `707.4..759.6` | 358 | 52.2 | 3 | 56.67 | yes | none | +6.4 |
| `/` | `monthlyHours=0` | `707.4..759.6` | 358 | 52.2 | 3 | 56.67 | yes | none | +6.4 |
| `/` | incoherent | `707.4..759.6` | 358 | 52.2 | 3 | 56.67 | yes | none | +6.4 |
| `/` | **consent answered + fullSeed** | `707.4..759.6` | 358 | 52.2 | 3 | 56.67 | yes | none | +6.4 |
| `/custo-da-hora` | empty | `542.1..594.3` | 358 | 52.2 | 3 | 56.67 | yes | none | +171.7 |
| `/custo-da-hora` | seeded | `524.8..577.0` | 358 | 52.2 | 3 | 56.67 | yes | none | +189.0 |
| `/custo-da-hora` | `monthlyHours=0` | `458.7..510.9` | 358 | 52.2 | 3 | 56.67 | yes | none | +255.1 |
| `/custo-da-hora` | incoherent | `524.8..577.0` | 358 | 52.2 | 3 | 56.67 | yes | none | +189.0 |
| `/custo-da-hora` | **consent answered + fullSeed** | `524.8..577.0` | 358 | 52.2 | 3 | 56.67 | yes | none | +189.0 |

Each row is **two cells** — dark and light — and every geometric field is identical between them.
**20 of 20 pass R clauses 1 and 2.** 170 characters ÷ 3 line boxes = **56.67**, which is the measured
cpl, so the line count is read and not inferred.

**The invariance claim is produced by the measurements, not by an argument about the markup**
(lesson **061**). The hero card on `/` is **one row per state, measured, not one number repeated**:

| `/` application state | seed | hero card box | `h` | relocated surface | clearance |
|---|---|---|---|---|---|
| empty | none | `80..699.4` | **619.4** | `707.4..759.6` | **+6.4** |
| seeded | `grossSalary` 4200, `monthlyHours` 220, `workMinutes` 528 | `80..699.4` | **619.4** | `707.4..759.6` | **+6.4** |
| `monthlyHours=0` | same, `monthlyHours` 0 | `80..699.4` | **619.4** | `707.4..759.6` | **+6.4** |
| incoherent | same, `monthlyHours` 240, `workMinutes` 480 | `80..699.4` | **619.4** | `707.4..759.6` | **+6.4** |
| **consent answered + fullSeed** (`isManualExit`, entry/lunch/exit set, stored consent) | `fullSeed()` in `g3r2-mr-p2.mjs` | `80..699.4` | **619.4** | `707.4..759.6` | **+6.4** |

Five rows, five readings, both themes each. The fifth is the one that matters:
`isManualExit` with a full journey renders the longest of
`exit­Description`'s **three** variants (*"foi o horário que você registrou"*, 32 chars, one line at
the card's interior; the other two are shorter). The hero's other inputs — badge, ring, value,
footer row — are structurally fixed (`components/organisms/hero-panel.tsx`). So the 6.4 px is a
property of five measured states and of an enumerated string, not of one reading.

**The footer's own LR3.5, before and after the move** — the state where a **different** element is
last (lesson **054**), measured in the consent-**pending** state (last block in `#main-content` is
the relocated consent surface) and the consent-**answered** state (last block is the footer):
`evidence/g3r2-footer.txt`, `/` and `/custo-da-hora`, fullSeed, both themes.

LR3.5's window for a surface is `scrollY ∈ [docTop + h − navTop, min(docTop − headerBottom,
maxScroll)]`, non-empty and reachable:

| cell | last block in `#main-content` | bottom reserve | DS1 P1 | DS1 P2 | DS1 P3 | **DS1 P4** |
|---|---|---|---|---|---|---|
| `/`, consent pending, **footer intact** | consent surface | **87.9** | pass | pass | pass | **pass**, headroom 524.0 |
| `/`, consent pending, **P2 moved** | consent surface | **88.1** | pass | in `aside` | pass | **pass**, headroom 524.1 |
| `/`, consent answered, **footer intact** | footer | **95.9** | pass | pass | pass | **pass**, headroom **18.0** |
| `/`, consent answered, **P2 moved** | footer | **96.1** | pass | in `aside` | pass | **pass**, headroom **18.1** |
| `/custo-da-hora`, consent pending, intact | consent surface | 87.8 | pass | pass | pass | **pass**, headroom 523.9 |
| `/custo-da-hora`, consent pending, P2 moved | consent surface | 88.0 | pass | in `aside` | pass | **pass**, headroom 524.0 |
| `/custo-da-hora`, consent answered, intact | footer | 95.8 | pass | pass | pass | **pass**, headroom **17.9** |
| `/custo-da-hora`, consent answered, P2 moved | footer | 96.0 | pass | in `aside` | pass | **pass**, headroom **18.0** |

Three things this table settles, each of which would otherwise be an argument:

1. **`F-1` is reachable where it is.** Its LR3.5 window is non-empty in 8 of 8 cells, in both consent
   states and on both routes. The tightest cell has **18 px** of headroom, and **18 = 96 − 78** —
   the bottom reserve M-B set, minus the band the tab bar occupies. **The constant is what passes,
   not the paragraph.**
2. **Removing DS1 P2 from the footer changes `F-1`'s headroom by +0.1 px** (524.0 → 524.1, 18.0 →
   18.1). The document and the surface move together, so the *margin* is invariant while every
   *absolute* moves — stated separately because a downstream gate calibrates on whichever it is
   handed.
3. **The element that becomes last was measured as last**, in both of the states that promote a
   different one. M-R does not hand the failure to a neighbour, because M-B already removed it.

**1440 × 900** (`evidence/g3r2-p2.txt`): the surface rides with the hero inside the `lg:sticky`
aside, `w` **514.7**, `h` **34.8**, **2** line boxes, 85.0 cpl. At rest on `/` it sits `819.4..854.2`
against a tab bar at 806 — **at rest it is under the chrome, and LR3.5 is existential over scroll
positions**: the first clear position is `scrollY` **49**, and the sweep returns **310 of 400**
sampled positions clear. On `/custo-da-hora` it clears at **scroll 0** (`667.9..702.7`, +103.3).
The `div/Valor por Hora…` and `div/Saída Real…` entries in `intersectedByFixed` are the **sticky
aside itself**, the surface's own ancestor — the same probe artifact §6 already records, and the
sweep implements the exemption.

**2560 × 1440 and 3840 × 2160** (`evidence/g3r2-wide.txt`, both routes, both themes, 8 cells):
box `921.7..960.8` on `/` and `748.3..787.4` on `/custo-da-hora`, `w` **729**, `h` **39.1**, **2**
line boxes, **13.5px** (the root step), `horizontalOverflow` **false** in 8/8, LR3.5 clear at
**scroll 0** in 8/8. Identical to run 1's geometry for the same slot, because the slot did not
change — only its occupant did.

**AC13, re-measured** (`evidence/g3r2-lines.txt`, 16 cells, both themes): `linesOnFirstScreen`
**8 → 9** on `/` and **9 → 10** on `/custo-da-hora`, split `8 + 1` and `9 + 1` assistive,
`linesOccluded` **0 in 16/16**. **§5.1's corrected expectation is unchanged and stands**, because
DS1 P2 is a childless `<p>` and adds exactly one leaf to the probe's `host` climb — the same +1 the
one-link run-1 citation added. `plan.md` §16 item 2 carries forward verbatim.

---

### 17.5 Q-D — `DS1_EXPECTED_PARAGRAPHS`, and the ordering

- **`DS1_EXPECTED_PARAGRAPHS` 4 → 3 holds.** `tests/e2e/support/legibility.ts:5` counts
  `#main-content > footer`'s paragraphs (`DS1_FOOTER_SELECTOR`, `:17`). Measured **`footerParagraphs`
  = 3** in every variant-C cell of `g3r2-p2.txt` and `g3r2-footer.txt`. **What changes is *which*
  three: the footer keeps P1, P3 and P4**, not P1, P2 and P3 as A1.2's question assumed. The
  constant is the same; the sentence next to it is not, and a guard that names the survivors must
  name those three.
- **The relocated surface is a fourth DS1 measurement site, not a deleted one.** LR1/LR2a/LR2b must
  be re-measured on it in its new container. Measured here: `w` **358** at 390 (LR1 floor 320 ✓),
  chrome spend **0** — it is a direct child of the column with no padding — ≤ 32 ✓ (LR2a), **56.67
  cpl** ≥ 40 ✓ (LR2b, which binds at 12px). **Identical to its footer values, because the column and
  the footer are the same 358 px wide at 390.** `legal.md` **L4** names exactly this container as
  the one that qualifies.
- **`0003`'s T9 lands before T4′.** Confirmed from `0003`'s `STATUS.md` (T8, T9 pending) and
  `plan.md` §3A A1.3's ordering; T9 adds a describe and three selectors, T4′ moves the constant, and
  in that order neither overwrites the other.

**The coupling with Amendment 2 — the two rulings agree, and `frontend-dev` changes nothing.**
A2.1's surface is *"the nearest non-inline ancestor-or-self of the matched leaf"*. Measured in this
run with that exact walk: for **DS1 P4** the resolved surface is the footer `<p>` (`surfaceTag` `p`,
`display` `block`, `h` 121.7) in variants A and B, which is the node `citationParagraph` resolves to
— **V1 and V2 hold unchanged**. For **DS1 P2** the matched leaf *is* the `<p>` (it has no element
children), so the climb is a no-op and the resolved surface is the same node in the footer and in
the `aside`. **This re-measurement does not change which box LR3.5 measures, in either place.**

---

### 17.6 Layout — 390, 1440, 2560, 3840

```
   0 ┌──────────────────────────────────┐  header, fixed, 0..65
  65 │                                  │
  80 ├──────────────────────────────────┤  HeroPanel — the answer
     │   Saída Prevista      09:41:00   │
     │          ( progress ring )       │
     │             17 : 48              │
     │      é quando sua jornada fecha  │
     │   ── Entrada às 08:00    copiar  │
 699 ├──────────────────────────────────┤  hero card bottom  (h 619.4, 5 states)
     │   8 px  --spacing*2              │
 707 ├──────────────────────────────────┤  DS1 P2, w 358, h 52.2, 3 line boxes
 760 └──────────────────────────────────┘  clearance to tab bar: +6.4
 766 ┌──────────────────────────────────┐  tab bar, fixed, 766..828
 828 └──────────────────────────────────┘        shield, fixed, 784..828
 844
```

Below the fold, in flow order: the calculator card, the summary, the footer (**P1, P3, P4**), then
the consent surface, then the **96 px** reserve.

`/custo-da-hora` is the same structure with a shorter hero: the surface lands at **`542.1..594.3`**
(empty), **`524.8..577.0`** (seeded / incoherent / consent-answered) and **`458.7..510.9`**
(`monthlyHours=0`), with **+171.7 / +189.0 / +255.1** of clearance.

| Width | surface box | `w` | type | line boxes | horizontal overflow | control outside viewport |
|---|---|---|---|---|---|---|
| 390 | `707.4..759.6` (`/`) | **358** | 12px | 3 | **no** | **none** |
| 1440 | `819.4..854.2` at rest; first clear at `scrollY` 49 | **514.7** | 12px | 2 | **no** | **none** |
| 2560 | `921.7..960.8` | **729** | 13.5px | 2 | **no** | **none** |
| 3840 | `921.7..960.8` | **729** | 13.5px | 2 | **no** | **none** |

**Nothing reflows, nothing collapses, nothing is revealed on wide.** The surface rides with the hero
inside the sticky aside above `lg`, exactly as run 1 described for the slot. **What never moves:**
the answer label's position (it only rises — `112.7 → 104.7` on `/`, `112.0 → 104.0` on
`/custo-da-hora`, from M-D, unchanged by M-R), the hero's fill semantics, the tab bar, the header.

---

### 17.7 Component tree — the delta against §4

| Component | Level | Status | Path |
|---|---|---|---|
| ~~`TableCitation`~~ | ~~molecule~~ | **withdrawn — not built** | ~~`components/molecules/table-citation.tsx`~~ |
| **`EstimateNotice`** — the relocated DS1 P2 | **atom** | **new** (a *move*: the `<p>` it renders is deleted from the footer in the same change) | **`components/atoms/estimate-notice.tsx`** |
| `WorkCalculator` | organism | **extend** — `aside` slot becomes `<>{hero}{notice}</>` | `components/organisms/work-calculator.tsx` |
| `SalaryCalculator` | organism | **extend** — same | `components/organisms/salary-calculator.tsx` |
| `CalculatorViews` | organism | **extend** — the footer loses **P2**, keeps P1, P3, P4 | `components/organisms/calculator-views.tsx` |
| `CalculatorLayout` | template | **reuse, unmodified** | `components/templates/calculator-layout.tsx` |
| `AlertBanner` | atom | **not reused** — it carries a tone, an icon and a role; this is prose on the canvas | `components/atoms/alert-banner.tsx` |

**Why an atom and not a molecule.** The element is a single `<p>` with a frozen text node: no child
element, no data from `lib/`, no link, no props. `components/atoms/alert-banner.tsx` is the existing
precedent for a text-bearing atom. Run 1's molecule was justified by composition — text **plus** a
`CURRENT_LEGAL_YEAR` link — and that justification left with the surface.

**Why a component at all, rather than two inline copies.** Two call sites need byte-identical markup
around a string AC4 and AC5 assert is unchanged; a later edit to one of two copies manufactures the
contradiction `AGENTS.md` §5 warns about. One body, two calls (lesson **030**).

**Files this gate adds to `spec.md` § Scope, each path in full** (AC11), **replacing §4's list**:
`components/organisms/work-calculator.tsx`, `components/organisms/hero-panel.tsx`,
`components/atoms/estimate-notice.tsx`.
`components/organisms/hero-panel.tsx` stays on the list for **S1/D2–D4**, which are M-D's and
unchanged. **`components/molecules/table-citation.tsx` is removed from the list — it is not created.**

---

### 17.8 Tokens — `EstimateNotice` (`components/atoms/estimate-notice.tsx`)

| Property | Token | Dark | Light |
|---|---|---|---|
| type step | `--text-caption` (0.75rem) | same | same |
| line-height | `--text-caption--line-height` (1.45) | same | same |
| letter-spacing | `--text-caption--letter-spacing` (0.012em) | same | same |
| weight | `--text-caption--font-weight` (400) | same | same |
| body colour | `--color-ink-subtle` | `oklch(0.645 0.016 264)` | `oklch(0.539 0.017 264)` |
| background (inherited) | `--color-canvas` | `oklch(0.178 0.01 264)` | `oklch(0.984 0.003 264)` |
| top gap from the hero card | `--spacing*2` (8px) | same | same |
| horizontal inset | none — a direct child of the column at `w` 358 (page gutter `px-4`) | same | same |
| text wrap | `text-pretty`, as the footer's paragraphs carry today | same | same |
| alignment | start — the footer's `text-center` stays with the footer | same | same |
| radius / border / shadow / fill | **none.** It is text in the column, not a card | — | — |

**Exactly the tokens the paragraph already renders with**, minus the footer's centring: the type
step, the colour and the background are unchanged, which is why §12.3's contrast pair carries over
untouched. **It must be composed through `cn()`** — `DESIGN.md`'s Type-Step-Is-Not-a-Colour Rule:
the element carries both a size class and a colour class, and without the extended merge config a
caller's size class silently deletes the colour.

**No token is added, no step is added, no curve is added. §15's S1/S2/S3 are the only system changes
this spec carries, and run 2 adds none.**

---

### 17.9 States

The relocated surface has **no interactive element** — no link, no button, no control. Run 1's §8.1
table has no subject and is withdrawn.

| Element | rest | hover | focus-visible | active | disabled | loading | error | empty | live-updating |
|---|---|---|---|---|---|---|---|---|---|
| `EstimateNotice` `<p>` | `--text-caption` / `--color-ink-subtle` on `--color-canvas` | **none** — not interactive, no pointer affordance | **none, and none inherited**: no `tabindex`, no focusable descendant, so it is never a tab stop and `:focus-visible` cannot resolve to it | none | n/a | n/a | n/a | **never empty** — the string is a literal with no data dependency, so it renders identically in all four storage states (measured: identical box in 20/20 cells — the table in §17.4) | **does not update.** Not in any live region, and must not be put in one — see §17.13 |

**The state this removes is the one worth naming:** run 1 put a focusable `<a>` on the first screen,
which is what produced §12.2's visual-order/tab-order divergence and §14's routed observation.
**M-R as ruled adds nothing focusable, so the divergence does not arise from this spec** — see
§17.13.

---

### 17.10 Motion

| Element | Trigger | Property | Duration | Easing | Delay | `prefers-reduced-motion` |
|---|---|---|---|---|---|---|
| `EstimateNotice` | **none** | **none** | — | — | — | **nothing to neutralize** |
| the `aside` cell it joins | route change | the existing `PANEL_TRANSITION` on `CalculatorViews`' `motion.div` (`opacity`, `y` 12 → 0, spring, bounce 0, 0.32s) | unchanged | unchanged | unchanged | **unchanged** — it is the ancestor's existing animation and this design neither adds to it nor exempts the new child from it |

**No new transform, so no new neutralizer.** `AGENTS.md` §8's pairing rule — `hover:-translate-y-1`
needs `motion-reduce:hover:translate-y-0` — has no subject here, because the element carries no
state-bound transform and no hover state at all. §9's table is unchanged.

---

### 17.11 Copy slots

**No slot is filled by this gate, and none is opened.** `copy.md` stays an explicit no-op and
**AC5's exemption list stays EMPTY** (`legal.md` §6). The slot below is an existing frozen string
that changes container, never text.

| Slot | Role | Type step | Character budget at 390 | Source |
|---|---|---|---|---|
| **first-screen disclosure** | qualifies the figure in the hero card: it is an estimate, not a payslip and not a time-clock record | `--text-caption` | **frozen at 170 chars / 3 line boxes / `h` 52.2, measured.** The **hard ceiling is 58.6 px = 3 line boxes** — `navTop (766) − heroCardBottom (699.4) − gap (8)` on `/` at 390. **A fourth line box is 69.6 px and fails R by 11.0.** In characters at the measured 56.67 cpl that is **≈ 204**, but the budget is line boxes and the verdict is the rendered box (lesson **052**) | `components/organisms/calculator-views.tsx`, footer P2, moved unedited |
| footer P1, P3, P4 | unchanged | unchanged | unchanged | same file, unchanged |

> **The budget is the constraint any later spec must respect, and it is stated as the comparison:**
> `heroCardBottom + --spacing*2 + surfaceHeight ≤ navTop` at 390 on `/`.
> Today that reads `699.4 + 8 + 52.2 = 759.6 ≤ 766`, **6.4 px of slack**. Two things spend it, and
> both belong to other owners: **a longer string** (`content-writer`, `0003`) and **a taller hero
> card** (`product-designer`, S1/M-D). `plan.md` carries it as a **guard on the comparison, never as
> the literal 6.4** — a spec that hard-codes the delta ships the rule with an exception.

**M-D (T6) is a precondition of M-R, and the amended order already has it.** Without M-D the hero
card ends at **723.4**, the budget falls to `766 − 723.4 − 8` = **34.6**, and a 52.2 px surface fails
by **17.6**. `T3 → T5 → T6 → T4′` is therefore binding in that direction too, not only for
`legal.md` A1.7's M-B-before-M-O.

**The DS2 deixis constraint is honoured unchanged.** This design does not move DS2, does not move the
*DSR sobre os extras* row, and does not open `components/organisms/day-summary.tsx`. §10's measured
12 px adjacency stands.

---

### 17.12 Disclosure placement — the revised rows

| Surface | Today | After | Visible next to its number? |
|---|---|---|---|
| **DS1 P2** (estimate; LR6.1 claim = the page's output) | footer, `docTop` **3084.0** on `/` with a full journey seeded | **first screen, `707.4..759.6` at 390, directly under the answer, 20/20 cells** | **yes — 8 px below the hero card that carries the number** |
| **DS1 P4** (`0003`'s `F-1`, the table citation) | footer, last paragraph, **`h` 121.7** | **footer, unchanged, whole, all four `<a>`** — LR3.5 window non-empty in 8/8 measured cells, tightest headroom **18.0** | reachable by scroll; **not on the first screen, and this gate says so rather than pretending otherwise** |
| **DS1 P1** (storage) | footer | footer, unchanged | reachable; LR3.5 passes |
| **DS1 P3** (gap list) | footer | footer, unchanged | reachable; LR3.5 passes |
| DS2, DS7, DS4, DS5, DS6, CA–CE | — | **exactly as §11 records them** | unchanged |

**Nothing is hidden behind a collapse by this design, nothing that was visible becomes less so, and
no disclosure is dropped for want of room.** One surface changes container; every other stays,
whole, in the footer, and `0003`'s `F-1` ships with its RPPS clause and all four links intact.

**The honest statement about `F-1`:** it is **not** on the first screen and this design cannot put it
there — §17.2. It is reachable, legible and whole, and its LR3.5 window is discharged by M-B. Whether
the *table citation specifically* must also be on the first screen is a question no criterion in this
spec asks and no clause in `legal.md` answers; **it is stated here so it is on the record rather than
absorbed**, and it is `tech-lead`'s to route if anyone wants it asked.

---

### 17.13 Accessibility — the delta against §12

| Element | Role / semantics |
|---|---|
| `EstimateNotice` | a `<p>` in the document flow, inside the `aside` grid cell, **outside** the hero's `aria-live` subtree. No `role`, no `aria-label` — it is prose |
| the footer | unchanged `<footer>` with **three** paragraphs |

**Tab order at 390 is unchanged from the shipped tree**, because M-R adds **no focusable element**:

1. skip link → 2. header theme toggle → 3. the tab bar's two links → 4. the form controls →
5. the summary's controls → 6. the consent surface's three controls → 7. the privacy shield.

> **§12.2's item 6 and §14's *"visual order and tab order diverge in the aside cell"* finding are
> WITHDRAWN as products of this spec.** They existed because run 1 put a link into the `aside` cell.
> The underlying divergence — `CalculatorLayout`'s aside is `order-first` visually only, which the
> hero's own copy button already exhibits — is **pre-existing, untouched, and stays routed** to
> `product-designer` → `0008`, with the trigger unchanged: *the first spec that opens
> `components/templates/calculator-layout.tsx`* (`plan.md` §4). **Re-routed intact, not resolved.**

**Contrast.** No new pair. The surface renders `--color-ink-subtle` on `--color-canvas` — **5.74:1
dark, 4.84:1 light**, both above WCAG 2.2 AA's 4.5:1 for normal text (§12.3, measured through a 1×1
canvas). It is the **identical pair it renders on in the footer today**, at the identical type step
and size, so the move changes no contrast in either theme. The hover pair `--color-accent-ink` on
`--color-canvas` no longer has a subject on this surface and is not claimed.

**Live regions.** `EstimateNotice` is **not** in any live region and must not be put in one. Its text
never changes — it has no data dependency — so an `aria-live` on it would announce nothing on every
keystroke while stealing the queue from the hero value's `aria-live="polite"`, which is the region
that *does* update as the user types. §12.4's row for `TableCitation` is replaced by this one; every
other row in §12.4 is unchanged.

**Reduced motion and reduced transparency.** §12.5 unchanged — no new transform, no new surface with
a blur.

---

### 17.14 Findings — the delta against §14

| # | What | Disposition |
|---|---|---|
| **F1 — discharged, and the proof is stronger than run 1's** | DS1 P4 with no scroll position clear of the tab bar | **Fixed at its cause by M-B, measured on the grown footer:** LR3.5's window is non-empty for all four DS1 paragraphs in **8/8** cells across both consent states and both routes, tightest headroom **18.0 = 96 − 78**. **M-R is not what discharges it**, which is now measured rather than asserted |
| **NEW — `F-1` cannot be put on the first screen at 390** | The budget below the answer on `/` is **58.6 px**; `F-1` is **121.7** | **Stated, not resolved by shortening.** R is discharged by relocating **DS1 P2** whole, which `legal.md` §6 authorises in advance and leaves to G3. **The L5 route does not fire** — §17.3. If a later gate wants the *citation specifically* above the fold, that is a new question with a new owner, and this row is where it starts |
| **NEW — the first screen's budget is 6.4 px of slack** | `699.4 + 8 + 52.2 = 759.6` against `navTop` 766 | **A guard on the comparison, in `plan.md`, never a hard-coded 6.4.** Two owners can spend it: a longer string (`content-writer`/`0003`) and a taller hero (S1/M-D). Named so the next spec that touches either sees it |
| **WITHDRAWN — visual order vs tab order in the `aside` cell** | run 1 added a link to the cell | **Not a finding of this spec any more** — M-R adds nothing focusable. The pre-existing divergence stays routed to `0008`, trigger unchanged |
| **Carried — `DS1 P2`'s marker is a pt-BR literal** | `tests/e2e/first-screen-reachability.spec.ts:28` and `:34` pin `"Os valores são uma estimativa para você se organizar"` | **Observation, not a task.** T1a's rule — *locate by a value, never by a sentence* — was written for the citation, whose prose `0003` rewrites. This string is in no spec's remaining file list. Recorded so the next agent to widen T1a's rule knows where the remaining literals are: `DS1 P1`, `DS1 P2`, `DS1 P3`, `DS2`, both `DS7`s |
| **Every other row of §14** | — | **unchanged**: F2a, F2b, F3, F4, the LR4.2/LR4.2a question, `area(reject)` at 1440, the DS2 e2e debt and the `collapsible-panel.tsx` reduced-motion residual are all M-O/M-B/M-D's or pre-existing, and run 2 touched none of them |

---

### 17.15 What `plan.md` must carry for **T4′** — replacing §16 item 7

1. **The move is `DS1 P2`, not `DS1 P4`.** `components/organisms/calculator-views.tsx`'s footer
   loses its **second** paragraph and keeps P1, P3 and P4 — `0003`'s `F-1` is not read, not edited
   and not moved. The text node is moved **byte-identical**; AC4/AC5 are satisfied by construction
   and verified at G6 by `g1-text.mjs` + `diff`.
2. **Files added to § Scope, each path in full:** `components/organisms/work-calculator.tsx`,
   `components/organisms/hero-panel.tsx`, **`components/atoms/estimate-notice.tsx`**.
   **`components/molecules/table-citation.tsx` is not created**, and no task may restore
   `LegalYear.source` / `.sourceUrl` / `.effectiveFrom`.
3. **`DS1_EXPECTED_PARAGRAPHS` 4 → 3**, and any prose naming the survivors names **P1, P3, P4**.
4. **AC1's locator changes subject.** `citationParagraph` stays exactly as T1a left it and keeps
   pointing at the footer's `F-1`; AC1's R surface is the relocated `<p>`, located by **position** —
   the `aside` cell's own `<p>` child — and **never** by a pt-BR sentence.
5. **A guard on the comparison, not on the delta:** at 390 on `/`, assert
   `heroCardBottom + 8 ≤ navTop − surfaceHeight`, with the three quantities printed in the failure
   message. It must be seen **red** before T4′ and green after, in the consent-answered state as
   well as the four storage states.
6. **T4′ runs after T6.** Without M-D the budget is 34.6 px and the surface is 52.2 — the task fails
   by 17.6 px if it is ordered earlier. `T3 → T5 → T6 → T4′` is binding for this reason as well as
   for `legal.md` A1.7's.
7. **AC13's corrected counts are unchanged** — 9 on `/`, 10 on `/custo-da-hora`, split `8 + 1` and
   `9 + 1`, `linesOccluded` 0, re-measured in run 2. §16 item 2 stands verbatim.
8. **Nothing in Amendment 2 changes.** T1b's resolution rule, V1/V2/V3 and
   `EXPECTED_LR35_SURFACE_COUNT` are all correct for both the footer `F-1` and the relocated `<p>`
   — §17.5.
9. **Items 1, 3, 4, 5, 6, 8 and 9 of §16 stand unchanged.** Only item 7 is replaced, by this list.

---

### 17.16 System changes

**None.** Run 2 adds no token, no type step, no spacing value, no curve and no elevation level. The
three human approval points remain **S1, S2 and S3 in §15**, already approved on 2026-09-19, and
this amendment neither widens nor narrows them.

---

### 17.17 The coupling with Amendment 3 — what this gate did **not** measure

`plan.md` §3C landed while this re-run was in flight. Two points of contact, both stated so neither
gate reads the other's number as its own:

- **The predicate agrees.** Every LR3.5 cell in §17 is the **closed form A3.1 rules**, not a sample
  loop: a surface of height `h` at `docTop` clears at `s ∈ [docTop + h − navTop, min(docTop −
  headerBottom, maxScroll)]`, which is A3.1's conjunct 1 (`whole box in the viewport`) intersected
  with conjunct 2 for the only two fixed boxes that overlap the column horizontally — the header and
  the route nav — and with attainability `[0, maxScroll]`. No window this gate reports is narrower
  than **17.9 px**, so A3.3's **B5** sub-pixel-range observation has no subject in any cell here.
- **This gate measured only the state with T3 in.** Variant A is *"`0003` T2 in, **this spec's T3
  in**"*, because T3 is landed in the working tree and §17 is a design re-measurement, not a red
  baseline. **It therefore does not answer A3.3's `copyA` question** — *does F1 reproduce with this
  spec's own remedy reverted* — and nothing in §17 may be read as verdict (a), (b) or (c).
  **`frontend-dev`'s two-copy run under A3.3 is the instrument that settles that, and it is the only
  one.**
- **One number to reconcile, handed over without a verdict.** A3.2's projection computes DS1 P4's
  containment interval on `/` from `docTop` **2841.4**, `h` **121.7** and `maxScroll` **2347**.
  This gate reads the same `docTop` **2841.4** and the same `h` **121.7** on `/` at 390 in the empty
  storage state, dark and light, with T3 in — and reads `maxScroll` **2215**, not 2347, giving a
  clearing interval of **`[2197.1, 2215]`**, width **17.9**. The two readings are in different
  application states (the T1b probe's cell is not named in the plan) and this gate **does not
  attribute the 132 px** or derive a verdict from it (lesson **050**; `AGENTS.md` §5's
  *find the state that accounts for the delta*). It is recorded because A3.3's branch (c) is decided
  on the sign of exactly this quantity, and `tech-lead` should know the two numbers disagree
  **before** the run rather than after.

---

## 18. PR #42 integration with the glass results

The phone opens on the answer. On Jornada the countdown remains inside its progress ring, with
the exit time and the edit shortcut below. On Custo da Hora the amount, period controls and edit
shortcut lead into the estimate notice. Keep the full DS1 P2 paragraph as one `p#estimate-notice`
immediately after the hero in each result column. Its sole purpose is to qualify the displayed
answer. The full sources remain available in the footer, including the separate night-overtime
citation on Jornada. [Glass spec](../0100-glass-interface/spec.md) · [Estimate ruling](legal.md)

### Placement and tokens

- At 390 the result and notice use the full width inside the page gutters. The native edit link
  in the hero uses its existing 44 px minimum height and takes focus to the form heading below
  the fixed header. At 1440 the notice follows the hero inside the existing sticky right column.
  At 2560 and 3840 the same composition scales with the root font. [Layout system](../../DESIGN.md#layout)
- `components/atoms/estimate-notice.tsx` uses `--text-caption` with its existing weight, line
  height and tracking, `--color-ink-muted` on `--color-canvas` and
  `calc(var(--spacing) * 2)` above. This integration overrides §17.8's historical
  `--color-ink-subtle` ruling. Axe's `color-contrast` rule on the integrated 390×844 build,
  scoped to `#estimate-notice`, measured **5.62:1 light** and **8.19:1 dark** on both routes at
  12 px, against the **4.5:1** floor. The notice has
  static paragraph semantics, no tab stop, no automatic announcement and no motion. The
  shipped paragraph is the copy slot from §17.11.
- The footer in `components/organisms/calculator-views.tsx` has the three common disclosure
  paragraphs (storage, calculation exclusions and the four-link table citation). Jornada has a
  fourth with its separate night-overtime source. The footer passage and the relocated passage
  each keep their independent LR3.5 witness. [T4′ plan](plan.md#t4--m-r-ds1-p2-leaves-the-footer-and-renders-under-the-answer-as-estimatenotice)

### Browser evidence

Playwright Chromium, isolated production snapshot of `262c9a0`, with the test publisher and
analytics IDs present in the served JavaScript. The served Jornada HTML contains the glass ring
size and edit link. Consent was pending and the banner was mounted. In each of the 16 cells
(390×844, both routes and themes, the four `STORAGE_SEEDS`, reduced motion), the same document
supplied both readings. Before, the footer owned `<p>{DS1 P2}</p>`. The browser then moved that
same element immediately after the hero as
`<p class="mt-2 text-caption text-ink-muted text-pretty">{DS1 P2}</p>`. The braces denote
the original text node in both readings. The live substitution tested placement before the
integrated build. Read `getBoundingClientRect()`, computed margin and the distinct vertical
positions from `Range.getClientRects()` over the paragraph's text. [State definitions](../../tests/e2e/support/reachability.ts)

| Route and storage | Footer P2 top before move | Hero bottom | Gap | P2 height after move | P2 bottom after move | Dock top |
|---|---:|---:|---:|---:|---:|---:|
| Jornada, empty or `monthlyHours=0` | 2499.09 | 619.39 | 8 | 52.17 | 679.56 | 766 |
| Jornada, seeded or incoherent | 2701.78 | 619.39 | 8 | 52.17 | 679.56 | 766 |
| Custo da Hora, empty | 2102.39 | 594.09 | 8 | 52.17 | 654.27 | 766 |
| Custo da Hora, seeded | 1938.13 | 576.83 | 8 | 52.17 | 637.00 | 766 |
| Custo da Hora, `monthlyHours=0` | 2140.03 | 510.73 | 8 | 52.17 | 570.91 | 766 |
| Custo da Hora, incoherent | 2247.13 | 576.83 | 8 | 52.17 | 637.00 | 766 |

The two themes gave the same boxes within each row. The paragraph occupied three rendered
lines in every cell. The tightest clearance was **86.44 CSS px** on Jornada
(`766 − 619.39 − 8 − 52.17`). The glass result already leaves room for the notice with its
ring and edit shortcut. This replaces the older T6 prerequisite for **AC1 geometry** in §17.15.
The test reads the full notice box, measures the gap from the preceding hero, checks fixed
chrome clearance and confirms the value is on screen in the same frame.
[Reachability guard](../../tests/e2e/first-screen-reachability.spec.ts)

The same substitution at 1440×900, 2560×1440 and 3840×2160, empty storage and light theme,
kept the notice in the sticky aside and returned zero horizontal overflow on both routes. The
notice bottoms on Jornada were 750.17, 843.81 and 843.81. On Custo da Hora they were 682.72,
764.92 and 764.92. [Sticky result composition](../../components/templates/calculator-layout.tsx)

### Answer and consent coverage

- AC13's census is over the answer and its sibling notice, before any viewport check.
  At 390×844 the answer area contains **9 sighted text-bearing elements plus 1 assistive-only
  element** on Jornada and **15 plus 1** on Custo da Hora. The visible census includes the
  edit links and the five salary period labels, which have icon or input children. The
  paragraph's three rendered lines count as one text-bearing element. The full border box
  of each sighted element must fit the viewport and every measured element must clear
  fixed chrome. The older §17.15 counts described different markup and missed text in
  elements with children. [Answer census](../../tests/e2e/support/reachability.ts)
- The first-level consent card follows the footer in document flow. Its heading names
  the region. The privacy shield remains available with or without a pending choice.
  Measure the named region and its three controls at one attainable scroll position.
  For settings, measure the panel inside the native modal and its three controls in one
  frame. The dialog is the panel's fixed ancestor and belongs to the top layer. Document
  chrome behind it cannot occlude the panel. An independent fixed element in the modal
  can still obstruct a control. [LR4.2a](legal.md#a16--the-ruling)
- On the same isolated build at document end in light theme, reduced motion, empty storage
  and consent pending on Jornada, the actual banner was at **249.52..715.52** at 390×844
  and **587.83..771.83** at 1440×900. All three controls passed a center-point hit test
  in each frame. Opening settings from the banner put its panel at **162.81..681.19**
  and **240.81..659.19**, respectively. Its three controls also passed the hit test at
  each size. At 1440 the refusal measured 102.81×48 versus 131.17×48 for acceptance.
  This is the F2c baseline. [F2c ruling](legal.md)

### Equal consent targets

PR #42 includes the first-level action row within scope to resolve F2c's area disparity.
Below `sm`, keep the stacked choices at full width. From `sm`, replace the row's
`sm:flex-row` with `sm:grid sm:grid-cols-[max-content_repeat(2,minmax(max-content,1fr))]`.
Both binary choice buttons use `w-full`. The settings button keeps its intrinsic width,
the other two tracks share the width of the longer label, and `gap-3` keeps its existing
spacing. Their order, button variants, focus, pressed and disabled states follow the
existing controls. This is a scoped amendment to T5's action row exclusion. The separate
fill question remains with the analyst. [Consent action plan](plan.md#t5--m-o-the-consent-surface-leaves-the-overlay-and-the-privacy-shield-becomes-unconditional) · [F2c legal disposition](legal.md)

On the same isolated `262c9a0` build, Chromium loaded Jornada with pending consent and
empty storage in both themes. Third-party requests were blocked, and the browser read
the controls at document end before and after substituting the grid and two full-width
declarations on the actual row. The narrow and wide `sm` and `md` boundaries were
included. Values are browser border boxes in CSS px.

| Viewport | Refuse and accept widths before | Refuse and accept widths after | Common height |
|---|---:|---:|---:|
| 390×844 | 332 / 332 | 332 / 332 | 48 |
| 639×900 | 581 / 581 | 581 / 581 | 48 |
| 640×900 | 102.81 / 131.17 | 219.25 / 219.25 | 48 |
| 767×900 | 102.81 / 131.17 | 282.75 / 282.75 | 48 |
| 768×900 | 102.81 / 131.17 | 131.17 / 131.17 | 48 |
| 1024×900 | 102.81 / 131.17 | 131.17 / 131.17 | 48 |
| 1440×900 | 102.81 / 131.17 | 131.17 / 131.17 | 48 |
| 2560×900 and 3840×900 | 115.42 / 147.56 | 147.56 / 147.56 | 54 |

Every sampled row kept its three targets hittable together with unclipped labels and zero
horizontal overflow. At 1440 the card grew from 184 to 214 CSS px and still ended at
771.83. The informing paragraph retained four line boxes and 166 normalized characters
in the separate 1440 light-theme read of both states. The executable criterion compares
rendered choice areas in both themes at 390×844 and 1440×900. The failing 1440 baseline
uses the same button boxes that the equal-track candidate corrects.
[Consent geometry guard](../../tests/e2e/first-screen-reachability.spec.ts)

### Open mobile form geometry

The approved Glass hierarchy preserves the countdown ring and provides direct focus to
editing. The link serves access to the form and the following measurements keep the existing
AC15 question open. In Playwright Chromium at 390×844 on Custo da Hora, light theme and
pending consent, `#salario-bruto` bottom read as follows on the same snapshot before and
after moving the paragraph in the live DOM.

| State | Historical AC15 ceiling | Glass before move | After move |
|---|---:|---:|---:|
| Empty | 880.50 | 920.59 | 980.77 |
| 0010 seeded | 864.10 | 903.33 | 963.50 |
| 0008 seeded, `grossSalary=4200` and `salaryPeriod=month` | 832.80 | 870.38 | 930.55 |

Glass already moved the field below that calibration. The estimate notice adds its gap and
height to stacked flow. Route AC15 to `tech-lead` and `product-manager` with `0008` for a
joint decision on the first field criterion when that spec next takes the mobile salary
layout. The approved ring and focus shortcut govern this integration. AC15 stays open
pending that decision. The integration adds no design token, type step or motion curve.
[AC15](spec.md#acceptance-criteria) · [First-input budget](../0008-intermittent-layout-shift-on-custo-da-hora/design.md#c3-the-price-in-phone-pixels)
