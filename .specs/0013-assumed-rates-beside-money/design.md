# 0013 — Design

> Owner: product-designer · Gate: `design` · Run **1**

**Verdict:** the disclosure ships as **one `<p>` in the variable-pay block of
`components/organisms/day-summary.tsx`**, first in the paragraph stack, rendered under exactly the
same condition as the two rate labels, in the same type step and the same measure as the M3
paragraph beside it. **No new token, no new type step, no new curve. `DESIGN.md` is unchanged.**

Three of `legal.md` §8.2's axes were tripwires without a measured subject at G2 — **box**, **measure**
and **space**. All three now carry a measured subject, in eight viewport × theme cells, against the
string `content-writer` actually delivered. **None of the three fails.** §9 states the one place where
the *measure* clause, as written, does not measure what it was written to protect, and routes the
restatement to its owner rather than editing it here.

---

## 0. How everything below was measured

Two coordinates for every number in this file (`AGENTS.md` §5).

| | |
|---|---|
| **Tree state** | working tree of `fix/design-taste-preflight`, `HEAD` **5c0c6fa**, read 2026-09-19 14:46–15:10. `components/organisms/day-summary.tsx`, `app/globals.css`, `components/templates/calculator-layout.tsx`, `components/organisms/work-calculator.tsx`, `hooks/use-work-calculator.ts` read at the moment each claim was written (lesson **060**). |
| **Application state** | **ST-A** of `spec.md`, reached by seeding `localStorage` before first paint: `grossSalary=15000`, `monthlyHours=220`, `workMinutes=528`, `entry=2025-01-06T08:00`, `lunchStart=…T12:00`, `lunchEnd=…T13:00`, `exitOverride=…T22:00`, `isManualExit=true`, `firstTierRate=50`, `extraTierRate=100`. Locale `pt-BR`, timezone `America/Sao_Paulo`. Settings panel **closed** unless a row says `open`. |
| **Instrument** | Chromium via `@playwright/test` 1.63.0, against a **production build** (`next build` → `next start -p 3987`) of an **isolated copy** — `rsync -a --exclude node_modules --exclude .next --exclude .git` into the scratchpad plus `cp -al node_modules`. Port confirmed free before the run and confirmed closed after it. **No `next dev`.** The repository working tree was not modified, built or served by any run here. |
| **Load discipline** | `uptime` read **11.62** at 14:46 with **zero** `chrome-headless` processes alive — the previous agent's run (`g3r2-footer.mjs`) had exited. Re-checked **11.94** before the first browser launch. No browser instrument of mine ran while another agent's was running. |
| **Font** | `document.fonts.status === "loaded"` awaited before every measurement, so no figure is a fallback-face figure (lesson **005**'s family: measure the artefact the runtime loads). |
| **Raw output** | `.specs/0013-assumed-rates-beside-money/evidence/` — `g3-geometry-shipped-string.json`, `g3-occlusion-panel-320.json`, `g3-geometry-probe-420-360.json`, and the two scripts `g3-measure-a.mjs` / `g3-measure-b.mjs`. The directory is **gitignored** (`git check-ignore -v` → `.gitignore:55`, exit **0**), so the durable artefact is the numbers pasted into this file, not the files. |

**One correction the measurement forced on me, recorded rather than tuned away.** My first pass sized
the slot from a **capacity estimate** — 420 characters, with 360 as a bracket — and measured two
lorem probes at that size. `content-writer`, running in parallel, then delivered **589** characters,
and `copy.md` states in writing that the length is a consequence of `legal.md` §4 (three claims, three
separate attributions) and will not shrink to a slot that was not drawn. I **rebuilt and re-measured
with the delivered 589-character string** rather than carrying the 420 figure forward under a caveat
(lesson **050**), and rather than ruling on the slot from the capacity figure alone (lesson **052**).
Every geometric number in §4, §8 and §9 is the shipped string. The 420/360 probe run is kept in
`evidence/` because it is what proves the **measure** verdict is not an artefact of one string's word
boundaries — see §9.

---

## References

There is no external reference for this screen. The technique is borrowed from **two paragraphs
already shipped in the same container**, and that is deliberate: `legal.md` §6 **L10** names M3 as
this spec's compliant reference *of form*, and the cheapest correct design is the move that was
already made twice, eight lines away.

| Site | Technique borrowed | Why it fits this audience |
|---|---|---|
| `components/organisms/day-summary.tsx:232-235` (**M3**, night-premium disclosure) | A plain `<p>` in `text-caption text-ink-subtle text-pretty`, sibling to the money rows inside the same `space-y-3` block, rendering under no condition at all | It is the one disclosure shape in this product measured to satisfy clause **D** in every state (`legal.md` §7, six states). A worker who has already learned to read the grey line under the night row reads this one without learning anything new. |
| `components/organisms/day-summary.tsx:238-241` (**M4**, DSR disclosure) | The same `<p>`, carrying **two** attributions plus two named assumptions in 255 characters | Proves the form scales past one citation without a list, a box or a second type step. This spec carries three attributions; M4 is the evidence that a paragraph is still the right container at that load. |
| `components/molecules/field.tsx` hint (`text-caption text-ink-subtle`) | The product's single hint style, defined once | Keeps one voice for "the app is explaining itself" across the panel and the summary, so the reader does not have to classify the grey text by where it sits. |

**What was considered and rejected, with the rule that rejected it:**

- **`components/atoms/alert-banner.tsx`** (warning tone). Rejected by `DESIGN.md`'s
  *Colour-Means-a-Number Rule*: amber means "a CLT limit approached" and red means "an input the app
  cannot use". This is neither — nothing is wrong, and tinting a permanent disclosure amber would
  make every ordinary day look like a compliance warning. It would also put a data hue on a string
  that encodes no quantity.
- **A `<ul>` of three items, one per claim.** Rejected by the **measure** axis: a list adds a marker
  inset, which narrows the line box and drops characters-per-line **below** M3's — the exact
  regression `legal.md` §8.2 wrote that clause to catch. Measured cost of the inset is not needed to
  reject it; the direction is unambiguous.
- **A recessed `--color-surface-sunken` sub-panel at `--radius-lg`.** Rejected twice: it adds its own
  horizontal padding (narrowing the measure again), and `DESIGN.md`'s *Flat-at-Rest Rule* plus the
  card's existing structure give a sub-panel a meaning — "a group of controls" — that a sentence
  does not have.
- **A larger type step (`text-body-sm`, 14px).** Rejected because the **measure** clause is written
  as *characters per line ≥ M3's*, and enlarging the face lowers characters per line. See §9: this
  is the clause's defect, not a design preference, and it is routed rather than exploited.
- **`components/atoms/collapsible-panel.tsx`.** Rejected by `legal.md` §8.2 **presença** and
  `spec.md`'s Non-goals: a disclosure behind a gesture is the defect this spec exists to remove.

---

## Hierarchy

The screen is the Jornada view at 390. The card in question is `DaySummary`, below `JourneyForm`.

- **1s** — the **Saldo do dia** figure (`--text-metric`, `--color-positive-ink` / `--color-negative-ink`,
  `numeric`). It is the largest thing in the card and the only coloured number at the top of the
  variable-pay block. Nothing in this design moves, shrinks or crowds it: the disclosure enters
  **below** the last money row, never between the reader and a figure.
- **5s** — the four money rows, read as a column: `Extra 50%`, `Extra 100%`, `Adicional noturno 20%`,
  `DSR`, each with its minutes and its `--color-positive-ink` currency in the `w-24` right-aligned
  column. This is where the defect lives: the reader is currently told a price and a rate, and
  nothing else.
- **30s** — the grey paragraph stack. **The new disclosure is the first paragraph in it**, so the
  order of explanation matches the order of the rows it explains: rows 1–2 → new paragraph, row 3 →
  M3, row 4 → M4. The reader who looks down after reading `Extra 100% · R$ 300,00` meets the sentence
  about rows 1–2 first, not a sentence about the night premium.

**The rule this hierarchy obeys, stated so it can be checked:** nothing this spec adds sits above,
beside, or between a money figure and the eye. Measured in ST-A at 390: the disclosure's border box
starts **below** the bottom of the DSR row, which is the last money row in the block. Reading path =
tree path; `legal.md` §8.2's **ordem** axis stays green (`grep -nE "sticky|order-|absolute|fixed"` over
`day-summary.tsx` returns 4 rows, all `border`/`rounded`/`flex`, unchanged by this design).

---

## Layout

Structure is unchanged everywhere. One `<p>` is inserted into an existing `space-y-3` flow column;
nothing reflows, nothing collapses, nothing moves between breakpoints.

### The container it lives in

`components/templates/calculator-layout.tsx` → `main` column (`lg:col-span-7`) → `DaySummary` card
(`bg-surface rounded-xl p-6 sm:p-8 shadow-card border border-line space-y-6`) → the variable-pay
block (`space-y-3 border-t border-line-faint pt-6`). The new `<p>` is a direct child of that block,
inserted between the rows group (`</div>` at `day-summary.tsx:230`) and the M3 paragraph
(`:232`).

### Measured at four widths, both themes, production build, ST-A, panel closed

Border box of the **new disclosure**, and of M3/M4 in the same run for comparison. All eight
viewport × theme cells reproduce exactly; light and dark differ in **no** geometric figure.

| Width | Root | Card width | Block measure | New `<p>` border box | lines | M3 border box | M4 border box | `scrollWidth − clientWidth` |
|---|---|---|---|---|---|---|---|---|
| **320** (zoom / small phone) | 16px | 288.00 | 238.00 | **238.00 × 278.25** | 16 | 69.56 tall | 121.73 tall | **0** |
| **390** (phone) | 16px | 358.00 | 308.00 | **308.00 × 208.69** | 12 | 52.17 tall | 86.95 tall | **0** |
| **1440** (laptop) | 16px | 733.33 | 667.33 | **667.33 × 104.34** | 6 | 34.78 tall | 52.17 tall | **0** |
| **2560** (QHD) | 18px | 1035.00 | 961.00 | **961.00 × 97.81** | 5 | 19.56 tall | 39.13 tall | **0** |
| **3840** (4K) | 18px | 1035.00 | 961.00 | **961.00 × 97.81** | 5 | 19.56 tall | 39.13 tall | **0** |

**What this table establishes:**

- **No horizontal overflow at any width, in either theme.** `document.documentElement.scrollWidth −
  clientWidth` = **0** in 10/10 measured cells, including 320 CSS px (`DESIGN.md` *Accessibility* —
  320px and 200% zoom produce no horizontal scroll).
- **The disclosure's width is identical to M3's, to 0.00 px, in every cell.** 308.00 / 667.33 / 961.00.
  That is the geometric statement of "same measure as the known-good", and it is what makes the
  **measure** clause of `legal.md` §8.2 non-accidental rather than a coincidence of one string.
- **The 390 figure reproduces an independent earlier measurement.** `0003` §16.1/§16.3 measured this
  block's border box at **308.00 px @390** and **667.33 px @1440** on a production build in a prior
  session, on a different day, by a different agent. My run returns the same two numbers to the
  hundredth. The two coordinates agree.
- **2560 and 3840 are the same row.** `--container-app` caps at 100rem and the root caps at 18px
  (`DESIGN.md` *The Scale-Don't-Reflow Rule*). Extra width becomes margin. The design adds no column,
  no panel and no revealed-on-wide content.

### Reflow

| Breakpoint | What happens to this design |
|---|---|
| `sm` 640px | Card padding `p-6` → `p-8`. The measure widens; the paragraph reflows to fewer lines. No structural change. |
| `lg` 1024px | `CalculatorLayout` splits 7/5 and the hero becomes sticky on the right. The `DaySummary` card — and this paragraph inside it — stays in the `main` column and never enters the sticky region. |
| `wide` 1920px | `--container-app` 80rem → 100rem, root 16 → 17 → 18px. Everything scales; nothing reflows. |

**What never moves:** the paragraph's position in the flow. It is the first child after the rows
group in every state, at every width, in both themes. There is no breakpoint at which it is hidden,
truncated, clamped, collapsed or moved into a panel.

---

## Components

| Component | Level | Status | Path |
|---|---|---|---|
| Assumed-rate disclosure `<p>` | — (inline element of an organism) | **new**, as markup inside an existing organism | `components/organisms/day-summary.tsx`, between `:230` and `:232` |
| `DaySummary` card | organism | **reuse**, unmodified except for the inserted `<p>` | `components/organisms/day-summary.tsx` |
| Variable-pay block (`space-y-3 border-t border-line-faint pt-6`) | — (section of the organism) | **reuse**, unmodified | `components/organisms/day-summary.tsx:180` |
| M3 disclosure `<p>` | — | **reuse, untouched** — this spec's known-good | `components/organisms/day-summary.tsx:232-235` |
| M4 disclosure `<p>` | — | **reuse, untouched** — this spec's known-good | `components/organisms/day-summary.tsx:238-241` |
| `CalculatorLayout` | template | **reuse**, unmodified | `components/templates/calculator-layout.tsx` |
| `AlertBanner` | atom | **considered, not used** — see References | `components/atoms/alert-banner.tsx` |
| `CollapsiblePanel` | atom | **considered, not used** — see References | `components/atoms/collapsible-panel.tsx` |

**No new atom, no new molecule.** A single `<p>` with three existing utilities does not earn a
component, and extracting one would put the legally bound string one indirection away from the rows
it qualifies. If a second spec ever needs the same shape a third time — this would be the fourth
paragraph of its kind in one block — that is the moment to extract, and it is a `tech-lead` call, not
a design one.

### Markup shape the design specifies

```tsx
<p id="assumed-rate-disclosure" className="text-caption text-ink-subtle text-pretty">
  {/* content-writer's string */}
</p>
```

- **The `id` is a design requirement, not decoration.** **AC3** requires `qa-engineer` to read
  `getBoundingClientRect().height` and `getComputedStyle().opacity` on this element with no panel
  opened and no gesture performed. A selector that matches on the string's text would break the
  moment `content-writer` revises a word, and a selector matching `p.text-caption` matches three
  paragraphs. The element must be addressable without depending on its text.
- **The `id` is *not* the guard's iteration set.** `legal.md` §8 is explicit: a selector scoped to the
  disclosure cannot see **ST-C**, and would sign `pass` against a panel that emits nothing. The AC5
  guard derives its set of four from the **labels**, as `legal.md` requires; this `id` is for AC3's
  geometric read only.
- **No `aria-describedby` from the rate labels.** The labels are non-interactive `<span>`s;
  `aria-describedby` on a non-interactive, non-widget element is not reliably exposed by assistive
  technology, and relying on it would put the legally required association in the one channel
  `legal.md` §8.2's **modalidade** axis forbids being the only channel. The association is carried by
  reading order and co-presence in the same block, which is the mechanism M3 and M4 already use and
  which `legal.md` §6 **L10**/**L11** ruled sufficient.
- **No `role`.** A `<p>` of running text needs none, and adding `role="note"` would make three
  identical paragraphs announce differently from each other.

---

## Tokens

Every value is a named token from `app/globals.css`. No hex, no arbitrary value, no `dark:` twin —
each token resolves per theme through `.dark`, which is why the two theme columns hold token names
rather than colours.

| Use | Token | Light resolves to | Dark resolves to |
|---|---|---|---|
| Disclosure text colour | `--color-ink-subtle` (`text-ink-subtle`) | `#696f79` | `#898e98` |
| Surface behind it | `--color-surface` (inherited from the card, `bg-surface`) | `#ffffff` | `#181b21` |
| Type step | `--text-caption` (`text-caption`) | 0.75rem / 12px @390–1440, 13.5px @2560–3840 | identical |
| Line height | `--text-caption--line-height` `1.45` | 17.4px @16px root, 19.575px @18px root (measured) | identical |
| Letter spacing | `--text-caption--letter-spacing` `+0.012em` | — | identical |
| Weight | `--text-caption--font-weight` `400` (`--font-weight-normal`) | — | identical |
| Family | `--font-sans` (Atkinson Hyperlegible Next Variable) | — | identical |
| Wrapping | `text-pretty` (`text-wrap: pretty`, CSS, no token) | measured `textWrap: "pretty"` | identical |
| Gap to the rows group above and to M3 below | `space-y-3` = `calc(var(--spacing) * 3)` = **12px** @16px root | — | identical |
| Block top rule | `--color-line-faint` (`border-t border-line-faint`, existing) | `#ebedf0` | `#23262c` |
| Block top padding | `pt-6` = `calc(var(--spacing) * 6)` = **24px** | — | identical |
| Card surface / radius / border / shadow (unchanged) | `--color-surface`, `--radius-xl`, `--color-line`, `--shadow-card` | `#ffffff` / 28px / `#e0e2e6` / two-layer | `#181b21` / 28px / `#2b2e35` / `none` |
| Rate labels (unchanged) | inherited `--color-ink` at `--text-body-sm` | `#1e232c` | `#f2f3f6` |
| Money figures (unchanged) | `--color-positive-ink`, `--text-body-sm`, `--font-weight-semibold`, `numeric` | `#0a6d37` | `#6ad58b` |
| Bolt icon on the tier rows (unchanged) | `--color-overtime-ink` | `#905e16` | `#f8b35d` |

**Spacing** uses `12px`, which is the *Eight Steps Rule*'s "separates sibling rows" step, and it
arrives from the block's existing `space-y-3` rather than from anything declared on the paragraph.
The paragraph declares **no** margin, **no** padding and **no** width of its own — which is precisely
what makes its measure equal M3's to 0.00 px.

**No token is added, changed or removed.** No `--spacing-*` key is introduced (*The Numeric Scale
Rule*).

---

## States

The disclosure is **non-interactive running text**. Every one of the eight states is stated rather
than left undefined, because "not applicable" is a claim a later gate has to be able to check.

### The disclosure `<p>`

| State | Specification | How it is verified |
|---|---|---|
| **rest** | `text-caption text-ink-subtle text-pretty` on `--color-surface`. Border box **308.00 × 208.69** @390, **667.33 × 104.34** @1440, **961.00 × 97.81** @2560/3840, identical in both themes. `opacity: 1`, `visibility: visible` — measured. | `evidence/g3-geometry-shipped-string.json` |
| **hover** | **Not applicable — and specified as unchanged, not merely absent.** No `hover:` utility, no cursor change, no colour transition. A grey sentence that lights up under the pointer reads as a link the user cannot click. | `grep` for `hover:` on the element returns nothing |
| **focus-visible** | **The element is not focusable and adds no tab stop.** It has no `tabindex`, no `href`, no control. The global `:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px }` in `app/globals.css:252` therefore never paints on it. **It is not removed, suppressed or overridden** — if a future revision makes any part of this paragraph focusable, the global rule already covers it, and that revision must say so. | `globals.css:252-255`, unmodified |
| **active** | **Not applicable.** No press, no `scale(0.97)` — *The press* in `DESIGN.md` applies to pressable elements, and this is not one. Text selection is the browser default, tinted by `--color-selection`. | — |
| **disabled** | **Not applicable, and must stay so.** There is no state of the application in which this paragraph is dimmed, greyed further, or `aria-hidden`. `--color-ink-subtle` is the floor of the text ramp; nothing lighter may carry text (`DESIGN.md` *Neutral*). | AC3 asserts `opacity === "1"` |
| **loading** | **There is no loading state, and this is the strongest fact in this section.** The paragraph is static text with no interpolated value, so it is present in the **server-rendered HTML** — `curl http://127.0.0.1:3987/ \| grep` returned the slot **before any JavaScript ran**. `hooks/use-work-calculator.ts:134-135` initialises `firstTierRate`/`extraTierRate` to the two `DEFAULT_*` constants, so `Extra 50%` and `Extra 100%` are in that **same** HTML response. Label and disclosure arrive in the same byte stream, on the same paint. Nothing hydrates late. | `curl` + `grep` on the isolated production server |
| **empty** | **Unreachable by construction.** The string is a literal with no operand; there is no props value that can make it empty. The only way this paragraph renders empty is if someone deletes the string, which is what the AC5 guard fails on. | AC5 guard |
| **error** | **Not applicable to the paragraph.** The one error path in this view is `work-calculator.tsx:195` — `{issue ? null : <DaySummary …/>}` — which unmounts the **whole card**, taking the two rate labels and this disclosure together. The disclosure is never present without its labels, and never absent while they render. That is clause **D** satisfied in the error state, by the same mechanism that satisfies it everywhere else. | `work-calculator.tsx:195-207` |
| **live-updating, as the user types** | The paragraph **does not change and does not re-render visibly** while the user types into the journey fields. It contains no interpolated value, so every keystroke that moves `firstTierMinutes`, `extraTierPay` or `balanceMinutes` leaves this element's text and box untouched. **It is deliberately outside every `aria-live` region** — see *Accessibility*. | §*Accessibility*, live-region table |

### The two rate labels and their money — unchanged, stated for completeness

| Element | rest | hover | focus-visible | active | disabled | loading | empty | error |
|---|---|---|---|---|---|---|---|---|
| `Extra {firstTierRate}%` / `Extra {extraTierRate}%` (`day-summary.tsx:193`, `:203`) | `--text-body-sm`, inherited `--color-ink` | n/a | n/a — not focusable | n/a | n/a | rendered in the server HTML with the `DEFAULT_*` values | n/a — always a number | unmounts with the card |
| Tier money (`:197`, `:207`) | `--text-body-sm`, `--font-weight-semibold`, `--color-positive-ink`, `numeric`, `w-24 text-right` | n/a | n/a | n/a | n/a | same | **ST-C**: `grossHourlyRate === null` → the money span is **not rendered**, and the label **still is** | unmounts with the card |

**ST-C is the state that decides this design.** Rate asserted, no money. `legal.md` §6 **L8** rules
the label may stay and the disclosure must render there too. Because the disclosure is gated on
**nothing** — not on `grossHourlyRate !== null`, not on `restDayPay > 0`, not on minutes, not on a
panel — ST-C needs no special case. That is the whole reason the paragraph carries no condition:
one unconditional element satisfies all six of `legal.md` §7's states at once, and ST-C, which has
**no measured known-good in any prior session**, gets its known-good from construction rather than
from a branch someone has to remember.

---

## Motion

**Nothing this spec adds animates.** That is a specification, not an omission.

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion behaviour |
|---|---|---|---|---|---|---|
| Assumed-rate disclosure `<p>` | mount | **none** | **0ms** | — | — | **Identical** — there is nothing to reduce. No `motion` component, no `AnimatePresence`, no `initial`/`animate`, no CSS `transition`, no `@starting-style`. |
| Assumed-rate disclosure `<p>` | any keystroke in the journey form | **none** | **0ms** | — | — | Identical. `DESIGN.md` *What must never animate* — "anything triggered by a keystroke". |
| Assumed-rate disclosure `<p>` | theme change | **none** — `next-themes` runs with `disableTransitionOnChange` | **0ms** | — | — | Identical. |
| Assumed-rate disclosure `<p>` | `issue` appears/disappears (card unmounts/mounts) | **none** — the card itself has no enter/exit animation today and gains none here | **0ms** | — | — | Identical. |
| Tier rows, money figures (unchanged) | value change while typing | **none** | — | — | — | Identical. `DESIGN.md` *The Numbers-Don't-Move Rule*. |

**Why zero and not a fade.** A `--duration-fast` opacity fade on mount was considered and rejected:
the paragraph mounts in the same frame as the labels it qualifies, so a fade would make the
disclosure arrive **after** the assertion — measurably, by 160ms — against the one axis
(`legal.md` §8.2 **tempo**) that already has a red subject in this tree. A disclosure that fades in is
a disclosure that is briefly absent.

**No `motion-reduce:` neutralizer is owed, because no state-bound transform is introduced.** The
`AGENTS.md` §8 pairing rule (`hover:-translate-y-1` needs `motion-reduce:hover:translate-y-0`,
because a bare `motion-reduce:transform-none` loses on specificity) binds this design **vacuously**:
there is no `hover:`, no `active:`, no `translate`, no `scale` and no `rotate` on anything it adds.
Stated explicitly so a later gate does not read the absence of a `motion-reduce:` class as an
oversight.

**`DESIGN.md`'s recorded reduced-motion residual is not triggered by this spec.** That residual —
`collapsible-panel.tsx`'s `height: 0 → auto` surviving both `MotionConfig reducedMotion="user"` and
the CSS-only scoped reset — carries three triggers: a spec that opens
`components/atoms/collapsible-panel.tsx`, a spec that adds any `motion` value animation on a
non-transform property, or a spec that takes a reduced-motion finding on a disclosure panel. **This
design does none of the three**: it does not open that file, adds no `motion` animation at all, and
takes no reduced-motion finding, because it deliberately puts the disclosure **outside** a panel. The
residual stays open with its owner and its triggers unchanged.

---

## Copy slots

One slot. `content-writer` owns every word in it; this section owns its role, its step and its budget.

| Slot | Role | Type step | Budget at 390px | Lines at 390 / 1440 / 2560 |
|---|---|---|---|---|
| `day-summary.assumed-rate-disclosure` | The single co-rendered string that carries **DO1–DO4** for the two tier rows: the floor and its two norms, the second tier and its instrument, and the two-hour boundary as the app's own choice | `--text-caption` (`text-caption`), weight 400, `--color-ink-subtle`, `text-pretty` | **≤ 640 characters.** Delivered string measures **589**, rendering **12 / 6 / 5** lines. | **12 / 6 / 5** (measured, shipped string, both themes) |

**How the budget was set, and what it is and is not.**

- The slot's **measured capacity** at 390 is **≈51 characters per full line** — measured across four
  paragraphs in the same block, in the same run: full-line counts ranged **43–58**, with per-paragraph
  full-line means of 49.9 (new), 51.5 (M3), 51.8 (M4). At 1440 it is ≈111; at 2560/3840 ≈143.
- The budget is therefore a **capacity window, not a gate on meaning**. 640 is 589 plus one full
  rendered line of headroom at 390 (`589 + 51 = 640`), so `content-writer` can add a clause at G6
  without returning to this gate.
- **A string longer than 640 is not rejected by this design.** `AGENTS.md` §4 rule 8: a disclosure may
  not be dropped or trimmed because the layout has no room — the room is found. A string past 640
  returns here for a re-measure and a restated line count; it does not return to `content-writer` for
  a cut.
- **The verdict is the shipped string, measured — not the window.** Lesson **052**: the corpus sizes a
  window, the delivered string is the verdict. The 589-character string was rendered in a production
  build at four widths in both themes before this table was written, and every number in it is from
  that run. Lesson **050**: no figure here is projected.

**The slot is static text with no interpolation.** It does **not** interpolate `{firstTierRate}` or
`{extraTierRate}`. Two reasons, both load-bearing:

1. **Correctness across the user's own edits.** The two rates are editable in the settings panel. A
   reader who sets the second tier to 70 still needs to be told that **50% is the legal minimum** —
   which stays true at every value they can type. An interpolated sentence would either restate the
   number they just typed (telling them nothing) or contradict itself.
2. **Announcement hygiene.** A string that changes as the user types is a string a screen reader may
   re-announce. 589 characters re-announced on a keystroke is an attack, not a disclosure. See
   *Accessibility*.

---

## Disclosure placement

Each obligation from `legal.md`, with the place it occupies and the measurement that proves it is
visible next to its number rather than behind a collapse.

### Content obligations

| `legal.md` | Obligation | Where it sits | Proof it is visible |
|---|---|---|---|
| **DO1** / **C1** | 50% is the legal minimum (CF art. 7º XVI; CLT art. 59 §1º); the app uses it for lack of the reader's rate; contract or CCT may fix more | The single slot, first paragraph of the stack, 12px below the last money row | Border box **308.00 × 208.69** @390, `opacity: 1`, `visibility: visible`, `elementsFromPoint` at its centre returns **the paragraph itself** as the top hit — nothing painted over it |
| **DO2** / **C2**, **C5** | The second tier's value comes from convenção/acordo coletivo (CF art. 7º XXVI; CLT art. 611-A I), not from law for the employee in general | Same slot | Same element, same measurement |
| **DO3** / **C3** | The two-hour cut is the app's, **and CLT art. 59 *caput* is not cited as its source** | Same slot | Same element. **Design consequence, binding on `frontend-dev`:** no citation, no tooltip, no `title`, and no norm reference of any kind may be attached to the boundary anywhere in this block. `legal.md` §2.2 — the *caput* caps quantity, the constant fixes price, and they coincide only at the number 120. This design attaches **no** attribution to the boundary. |
| **DO4** | All three hold where there is **no money on screen** | Same slot, gated on nothing | **ST-C is satisfied by construction**: the paragraph has no render condition, so it cannot be absent in a state where the labels are present. There is no branch to get wrong. |
| **C7** | No deixis to a neighbouring element | Slot is a self-contained paragraph; the design gives it no positional dependency — it does not say "above", and it reads correctly wherever `text-pretty` breaks its lines | Lesson **049** |
| **L7** | **One** disclosure covers both rows, carrying **three** separate attributions | **One** `<p>`, not two, not a list | The design adds exactly one element |
| **L7** / the once-per-state rule (lesson **047**, retired 2026-09-19 — **promoted** into `.agents/agents/labor-law-analyst.md`, *How a disclosure rule is stated*, which is the binding form now) | It renders **exactly once** per state | One element, one insertion point | **See the collision finding in §9.2** — measured, and routed |

### Rendering axes — `legal.md` §8.2, with a subject for each

| Axis | Status at G2 | Subject after this design | Measurement |
|---|---|---|---|
| **presença** | **red** (M1/M2, 6/6 states) | **green** | The paragraph has no render condition. It is a sibling of the rows in the same block, present wherever `DaySummary` is mounted, which is wherever the labels are. Measured present with the panel **closed** at 320/390/1440, light and dark. |
| **tempo** | **red** (panel hints outside the DOM in ST-F, count **0**) | **green**, and stronger than "not later" | Label and disclosure are in the **same server-rendered HTML response** — the slot was found by `curl \| grep` before any JS ran, and `use-work-calculator.ts:134-135` puts `Extra 50%`/`Extra 100%` in that same response. The disclosure cannot arrive after the assertion; it arrives in the same byte stream. |
| **tamanho (caixa)** | tripwire, unswept | **measured, not failing** | Border box on the carrying element, panel closed: **238.00 × 278.25** @320, **308.00 × 208.69** @390, **667.33 × 104.34** @1440, **961.00 × 97.81** @2560 and @3840. Identical in both themes. Width equals M3's to **0.00 px** in every cell. |
| **medida (cpl)** | tripwire, to be calibrated **here** | **calibrated in §9; passes on the statistic that measures the property, in 8/8 cells** | §9 |
| **modalidade** | green | **green** | Rendered `<p>` of running text. Not `aria-label`, not `title`, not `sr-only`. Measured `opacity: 1`, `visibility: visible`. |
| **ordem** | green | **green** | Reading path = tree path. The design adds no `order-*`, no `sticky`, no `absolute`, no `fixed`. |
| **espaço** | tripwire, unswept | **measured, not failing** | `document.elementsFromPoint` at the paragraph's centre returns `["assumed-rate-disclosure", "div.space-y-3.border-t", "div.bg-surface.rounded-xl", "div.lg:col-span-7"]` — **the paragraph is the top hit** in 5/5 cells including both themes and the panel-open state. After `scrollIntoView`, `left ≥ 0 && right ≤ clientWidth` is **true** in 5/5. `scrollWidth − clientWidth` = **0** in 10/10. Ad elements matching `ins.adsbygoogle, [data-ad-slot], [id*='ad-'], [class*='adsbygoogle']` present in the document: **0** — nothing occupies the space where the result or its disclosure appears (`PRODUCT.md` §8). |
| **operabilidade** | deliberately open | **stays open** | This design gives the disclosure **no control** — no button, no link, no toggle, no expand. `spec.md` § Out of scope 2 forbids new input, and `legal.md` §6 **L4**/**L5** require none. The axis is therefore not activated and no clause is owed for it. |

**Three axes that had no measured subject at G2 now have one, and none of them fails.** Per the
routing note that opened this gate, a failing subject is what would have made them binding clauses.
The numbers above are what a later gate re-runs; they are not a ruling that the axes are closed —
**caixa** and **espaço** remain `legal.md`'s to close at G6 on `qa-engineer`'s own instrument.

---

## Accessibility

### Semantic roles

| Element | Role | Name | Notes |
|---|---|---|---|
| `DaySummary` card | generic `div` | — | Unchanged |
| `h3` "Seu Dia" | `heading` level 3 | its text | Unchanged. *The One Voice per Card Rule* holds: one Title per card, everything below it Heading or smaller. This design adds no heading. |
| Variable-pay block | generic `div` | — | Unchanged |
| Rate labels | inline text inside a `div` | — | Unchanged |
| **Assumed-rate disclosure** | **`paragraph`** | — | Plain `<p>`. No `role`, no `aria-label`, no `aria-describedby` wiring — see *Components* for why. |

### Tab order

**Unchanged. This design adds zero tab stops.** The `DaySummary` card's only focusable element is the
conditional `<Link>` at `day-summary.tsx:246`, rendered when `grossHourlyRate === null`. Inserting a
non-focusable `<p>` before the paragraph stack does not reorder it, and the link keeps its position
after all four paragraphs. Focus order follows DOM order, which follows reading order, which follows
row order.

### Contrast, both themes, measured

Computed from the hex values in `DESIGN.md`'s normative frontmatter with the WCAG 2.2 relative-luminance
formula, in this session.

| Pair | Light | Dark | AA 4.5:1 |
|---|---|---|---|
| **Disclosure — `--color-ink-subtle` on `--color-surface`** | **5.06:1** | **5.25:1** | **pass**, both |
| Rate label — `--color-ink` on `--color-surface` | 15.77:1 | 15.54:1 | pass |
| Tier money — `--color-positive-ink` on `--color-surface` | 6.45:1 | 9.45:1 | pass |
| Bolt icon — `--color-overtime-ink` on `--color-surface` (graphical, 3:1) | 5.53:1 | 9.53:1 | pass |
| Block rule — `--color-line-faint` on `--color-surface` (decorative divider, no floor) | 1.17:1 | 1.14:1 | n/a — structural hairline, carries no information; under `prefers-contrast: more` it resolves to `--color-line-strong` |

**One discrepancy, recorded rather than smoothed.** `DESIGN.md` states **5.08:1** for
`--color-ink-subtle` on `--color-surface` in light; my computation from the same frontmatter hex
returns **5.06:1**. The difference is the hex rounding of the authored OKLCH value
(`oklch(0.539 0.017 264)` → `#696f79`), and both figures clear 4.5:1 with the same margin. **No token
changes and no correction is requested** — this is noted so a later gate that recomputes does not read
a two-hundredths gap as a defect. The token pair is the **same pair M3 and M4 already use**, so this
design introduces no new colour pair at all.

### Live regions — the decision, and the proof it is safe

**The disclosure must not be inside any `aria-live` region, and it is not.** Measured in the shipped
tree:

| Live region | Where | Does it contain the disclosure? |
|---|---|---|
| `aria-live="polite"` on `TotalRow` | `day-summary.tsx:79-83`, applied only when `live` is true — i.e. the "Trabalhado até agora" row in the totals block at `:167-178` | **No.** Different block, three siblings above the variable-pay block. |
| `aria-live="polite"` sr-only announcer | `work-calculator.tsx:234`, inside `HeroPanel`'s `media` slot | **No.** Different organism, different column at `lg`. |
| Variable-pay block (`:180`) | — | **Carries no `aria-live` at all**, in the shipped tree, and this design adds none. |

**Why this matters and is not a technicality.** The tier rows recompute on every keystroke in the
journey form. If the disclosure were inside a polite live region, a screen-reader user editing their
lunch time would have 589 characters of legal text queued for re-announcement on each edit — which is
the same class of defect `DESIGN.md` names for the live clock ("a screen reader announcing the time
every second is an attack, not a feature"). The disclosure is **static text that never changes**, so
its correct behaviour is to be read once, in reading order, when the user reaches it.

**Design requirement for `tech-lead` and `frontend-dev`:** the insertion must not add `aria-live`,
`aria-atomic` or `role="status"` to the paragraph **or to any ancestor of it** inside the card. The
paragraph is the first child of `day-summary.tsx:180`'s block; putting a live region on that block to
"announce the money" would sweep the disclosure in.

### Zoom and reflow

320 CSS px and 200% zoom: `scrollWidth − clientWidth` = **0**, the paragraph renders at **238.00 ×
278.25** (16 lines), fully inside the viewport after `scrollIntoView`, nothing clipped, nothing
occluded. Because the whole ramp is in `rem`, the user's own font-size setting scales this paragraph
with everything else.

### Colour is never the only channel

The disclosure carries no colour-encoded information: it is the product's neutral text floor on the
card surface. Nothing about the assumption is communicated by hue, weight or position alone — it is
communicated by the sentence.

---

## 9. Calibrations, findings and things routed onward

### 9.1 The **measure** clause — calibrated, with the number, and with its defect named

`legal.md` §8.2 states the clause as: *the characters per rendered line of the new disclosure are
**≥** those of M3's paragraph in the same slot, measured in the same run, the same viewport and the
same theme*, and says it is **not binding until `product-designer` supplies the number of the run that
calibrates it**. Here is that run.

**All three summary statistics the clause could mean, computed from one run on the shipped
589-character string. Per-line counts at 390, both themes: new
`[43, 49, 50, 58, 50, 48, 52, 44, 51, 52, 52, 40]` (n = 12 lines); M3 `[48, 55, 19]` (n = 3); M4
`[50, 55, 51, 51, 48]` (n = 5).**

| Statistic | 390 new / M3 | 1440 new / M3 | 2560+3840 new / M3 | Clause `≥` |
|---|---|---|---|---|
| **max chars on a line** | **58 / 55** | **122 / 106** | **146 / 122** | pass 8/8 |
| **mean over all lines** | **49.1 / 40.7** | **98.2 / 61.0** | **117.8 / 122.0** | **fails at 2560/3840** |
| **mean over full lines** (last excluded) | **49.9 / 51.5** | **110.6 / 106.0** | **143.2 / 122.0** | **fails at 390** |

Identical in light and dark in every cell.

**No one of these three may be the verdict, and the rule that says so is this squad's own.**
`AGENTS.md` §5, *How a criterion is written*, clause **"A threshold that does not move when n does"**
(the promoted form of retired lesson **014**): *never use range, max or min as a noise threshold
unless n is fixed in the criterion's own verification command.* Here **n is the rendered line count**,
which is a function of the string's length — it is **3** for M3 and **12** for the new paragraph at
390, in the same container, at the same measure. A max over 12 draws from four times the sample a max
over 3 draws from, so the max rises with length alone. The two means fail the same test from the
other direction: `text-pretty` balances the ragged tail, so the tail's weight in the mean is `1/n`,
and the statistic drifts as the string grows. Apply the clause's own question — *if I doubled n with
no change to the code, would this number move?* — and all three answer **yes**. The three rows above
disagree with each other on **two** of the four widths, which is what a mis-specified threshold looks
like from the inside.

**The lorem-probe run is the control that proves it is noise and not signal.**
`evidence/g3-geometry-probe-420-360.json`: two probes of **420** and **360** characters, in the same
slot, same tokens, same run, same build, geometrically identical to M3 **to 0.00 px**, returned a max
of **54** and **54** against M3's **55** at 390 — a *failure by one character*. Three strings, one
geometry, opposite verdicts. The character statistic's spread at 390 is wider than the margin it is
being asked to resolve.

**The verdict therefore rests on the invariant that does not move when n does**, measured in 8/8
cells:

**The structural invariant that does resolve it, measured in 8/8 cells:**

| | New `<p>` | M3 `<p>` | Δ |
|---|---|---|---|
| Border-box width @390 | 308.00 | 308.00 | **0.00** |
| Border-box width @1440 | 667.33 | 667.33 | **0.00** |
| Border-box width @2560/3840 | 961.00 | 961.00 | **0.00** |
| Computed `font-size` | 12px / 13.5px | 12px / 13.5px | **equal** |
| Computed `line-height` | 17.4px / 19.575px | 17.4px / 19.575px | **equal** |
| `text-wrap` | `pretty` | `pretty` | **equal** |

**The second defect, independent of the first.** Even with n fixed, `cpl_new ≥ cpl_M3` is satisfied by
making the new text **smaller**: drop it to 11px and characters per line go **up**. The clause's own
purpose — that the disclosure is not set in a meaner measure than the known-good — is inverted by its
own operator. So the clause is both unscoreable (n moves) and, where scoreable, pointing the wrong
way.

**Calibration returned to its owner, which is what this gate was asked to supply.**
`legal.md` §8.2 says the **medida** clause *"is not binding until it carries the number of the run
that calibrates it"*. The run exists, and its result is that **the quantity the clause names cannot
be scored admissibly under `AGENTS.md` §5**. **Recommended restatement, routed to
`labor-law-analyst` through `tech-lead` — proposed, not applied, because a legal clause is not mine
to edit:** *the new disclosure's computed `font-size`, computed `line-height` and border-box width are
**equal** to M3's paragraph's, measured in the same run, the same viewport and the same theme.*
Equality does not move when n does, cannot be gamed in either direction, is theme- and
viewport-invariant, and is the property the original clause was written to defend.

**Where this leaves the verdict, said plainly rather than left for a later gate to guess:** on the
restated form, this design passes with **Δ = 0.00 px in 8/8 cells**. On the form as written, it passes
on two of three readings and fails on the third, and **no reading is admissible**, so the design
neither claims a pass nor accepts a fail on it. The **medida** axis is therefore **still not a binding
clause** — not because nobody swept it, but because the sweep found the quantity unfit. Its owner
closes it by restating it; I have supplied the numbers either way.

### 9.2 The one-sentence-twice collision — measured, and it triggers **AC9**'s exemption

`spec.md` § Out of scope 3 protects `journey-form.tsx:142` and `:157` from edit, **unless**
`tech-lead` records at G4 that this spec's slot would render the same sentence twice in one state.
**That state exists and I measured it.**

| State | `#first-tier-rate-hint` | `#extra-tier-rate-hint` | Disclosure slot |
|---|---|---|---|
| 390, settings panel **closed** | **absent** (not in the DOM) | **absent** | present, 308.00 × 208.69 |
| 390, settings panel **open** | **present**, height **34.78** | **present**, height **69.56** | present, 308.00 × 208.69 |
| 1440 dark, settings panel **open** | **present**, height **34.78** | **present**, height **69.56** | present, 667.33 × 104.34 |

`JourneyForm` and `DaySummary` are siblings in `CalculatorLayout`'s `main` column
(`work-calculator.tsx:174-210`); opening the settings panel does not unmount the summary. So with the
panel open, `journey-form.tsx:157` — *"O piso de 50% vale para toda hora extra, inclusive depois da 2ª
(art. 7º, XVI, da CF; art. 59, §1º, da CLT). O degrau de 100% vem de convenção coletiva, não da lei."*
— and the new disclosure assert **the same two claims in one state**.

**This is `tech-lead`'s call at G4 under AC9, and the resolution is constrained in one direction.**
`spec.md` § Out of scope 3 states it itself: the resolution is to change the **panel hint's text**,
never to delete the new slot. Two independent reasons the slot is the one that survives: the panel
hint is **absent from the DOM** in the state that matters (measured above, reproducing `0003` §16.2's
`count 0`), and `journey-form.tsx:157`'s second sentence is **DV-3** — `legal.md` §10 rules it
ambiguous, and its broad reading is falsified by Lei nº 8.906/1994 art. 20 §2º. The hint is the string
with the legal problem; the slot is the string `legal.md` §8.1 **C5** was written to keep clean.

**Not a design decision, and I do not make it.** Recorded with its measurement so G4 rules on numbers.

### 9.3 The caption stack — a cost, stated rather than designed away

Measured in ST-A at 390, both themes, panel closed:

| | Height |
|---|---|
| New disclosure | 208.69 |
| M3 paragraph | 52.17 |
| M4 paragraph | 86.95 |
| Two `space-y-3` gaps between them | 24.00 |
| **Caption stack total** | **371.81** |
| Variable-pay block total | 578.61 |
| `DaySummary` card total | 1162.78 |

**64% of the variable-pay block is now disclosure text at 390.** `legal.md` §12 predicted this cost in
words — *"leitores aprendem a pular o que é permanente"* — and this is its number. I am not reducing
it: every character of it is required by `legal.md` §4 and §6 **L7**, and `AGENTS.md` §4 rule 8
forbids me to trade a disclosure for layout.

**What the design does instead, and it is checkable:** the entire stack sits **below the last money
row**. Nothing this spec adds comes between the reader and a figure, at any width, in either theme.
The 1s and 5s reads in *Hierarchy* are untouched; only the 30s read got longer.

**Routed as a finding, not resolved here — `product-manager`.** The class, not the incident: this
block now holds three permanent disclosure paragraphs and will hold a fourth when `0012`'s **W1**
lands. The trigger for a product decision about the stack is **the spec that adds the fourth
paragraph**, and the question for that spec is whether disclosures accumulate in one block or bind
individually to their rows. This spec cannot answer it, because § Out of scope 4 forbids it from
touching M3 and M4.

### 9.4 `0012`'s **W1** slot — named, and deliberately not settled

**AC10** requires `plan.md` to name both slots and to say why they are two sentences and not one.
From this gate:

- **This spec's slot:** `day-summary.tsx`, variable-pay block, **first** paragraph of the stack,
  between `:230` and `:232`. Subject: the two tier **rates** and the two-hour **price** boundary.
- **`0012`'s W1 slot:** `.specs/0012-saturday-overtime-tier/design.md` is still the **unedited
  template** as of this writing, so W1 has no slot. Its subject is the **weekday routing** of minutes
  between the two tiers — a different operand, in a different spec, under a different norm.
- **Why two sentences and not one:** `legal.md` §6 **L9** forbids this spec's string from containing
  *sábado*, *domingo*, *fim de semana* or *final de semana*, or making the weekday the subject of any
  sentence. A single merged sentence would have to name the weekday to carry W1, which **C4** makes
  grep-checkably illegal here. They cannot be one string.
- **Their relative position stays undecided, and is named as undecided.** It is sequencing, therefore
  `tech-lead`'s call at G4, exactly as `legal.md` §14 and `spec.md`'s Open questions leave it. What
  this gate supplies is the constraint that bounds the call: **whatever order G4 chooses, both
  paragraphs are direct children of the same `space-y-3` block, carry the same three utilities, and
  therefore share the same 0.00 px measure** — so neither ordering can break the calibration in §9.1.

### 9.5 Routed items that reach this gate and have no design lever

| Id | What it is | What this design does about it |
|---|---|---|
| **DV-2** | `FIRST_TIER_LIMIT_MINUTES = 120` lives in `hooks/`, and `grep -rn "TIER" lib` returns **0** — three user-visible numbers with no table in `lib/` | **Nothing, and it cannot.** A disclosure is a rendering, not a constant's address. This design makes the number **honest on screen** while it stays in `hooks/`; it does not make it traceable. **Still `tech-lead`'s, with `legal.md` §10's trigger unchanged** — the next spec that moves the tier split. Not remedied here, for `spec.md` § Out of scope 1's reason. |
| **DV-3** | `journey-form.tsx:157`'s broad-form sentence | Measured in §9.2 as a **co-render collision**, which is the one mechanism by which this spec may reach it — through **AC9**'s exemption, at **G4**, as a text change to the hint. This design does not edit it. |
| **F-3** | 12×36 (CLT art. 59-A): hours 8–12 are not extras, and the app prices them as extras | **No design lever.** It is a silent operand — the app never collects the regime — so there is no string and no slot. It fails **T1**. Belongs with **F1** in `STATUS.md`, as `legal.md` §10 routes it. |
| **F-4** | The night window is 22h–05h at 20%; for the advogado empregado it is 20h–05h at 25% | **No design lever, and out of scope 4 forbids touching M3.** M3's string is not false (it asserts no exclusivity, `legal.md` §6 **L10**). Recorded so a future categories spec does not rediscover it. |

---

## System change

**None.**

No token is added, changed or removed. No type step, no spacing step, no radius, no duration, no
easing curve, no colour, no shadow. The design uses `--text-caption`, `--color-ink-subtle`,
`--color-surface` and the block's existing `space-y-3` — four values that already ship and are already
used by the two paragraphs it sits beside. `app/globals.css` is untouched by this spec, and
`DESIGN.md` needs no edit. **There is no human approval point in this design.**

Two proposals leave this gate without changing anything, both routed and neither applied:

1. **§9.1** — a restatement of `legal.md` §8.2's **medida** clause from `≥` to equality of type step
   and measure. Owner: `labor-law-analyst`, via `tech-lead`. It is a legal artifact, not a design
   token; this design passes the clause as currently written either way.
2. **§9.3** — the accumulation of permanent disclosure paragraphs in one block. Owner:
   `product-manager`. Trigger: the spec that adds the fourth paragraph.
