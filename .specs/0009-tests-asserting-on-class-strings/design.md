# 0009 — tests asserting on class strings

> Owner: product-designer · Gate: `design`

## 0. Verdict — a no-op on the design system, and not a no-op on this gate

**Nothing in `DESIGN.md` changes, and nothing rendered changes.** No token is added, renamed or
retired; no type step, no colour role, no elevation level, no curve, no spacing value. No layout
reflows at 390, 1440, 2560 or 3840. No interactive state, no motion, no copy slot, no disclosure
placement moves. `legal.md` §10 binds this gate to *"Nothing. No pixel, no layout, no token."* and
the spec's § Out of scope forbids any file under `app/`, `components/`, `lib/` or `hooks/` from being
touched at all (AC6). There is no surface for a design decision to land on.

**What this gate does owe, and what the rest of this document is:** seven assertions in the suite
are written against a *class string*. A class string is the design system's private vocabulary — it
is what `DESIGN.md` reserves the right to rename, and it renames it roughly once per spec. So the
question *"what should this assertion measure instead"* is a question about **which visual property
the design actually promises at that site**, and that is mine. §2 answers it once per row: for each
of A1–A7, **the property of record** — the quantity whose value the design guarantees, stated so
that a class rename cannot move it and a broken render cannot satisfy it.

The distinction the rest of the document runs on:

| Kind | What the class carries | Is there a rendered quantity? |
|---|---|---|
| **Appearance** — `bg-surface-sunken`, `border-t`, `text-caption` | A token's value, through the stylesheet | **Yes**, and it is measurable only in a browser. In jsdom the class *is* the only observable, which is why a jsdom assertion on it is always a stylesheet mirror. |
| **Constraint** — `overscroll-contain`, `max-w-lg` | A behaviour or a box limit the design promises | **Yes**, and it is a computed style or an interaction outcome, never a class. |
| **Identity** — a sentinel passed by a caller | Nothing. It exists to be looked for | **No.** It has no visual property, and it must be a string that can never acquire one. |

Rows that fall in *Appearance* or *Constraint* and are asserted in jsdom have **no** correct jsdom
form: the honest options are to move the claim to the browser, or to assert the structural decision
that produced the class rather than the class itself. §2 says which, per row.

## References

| Site | Technique borrowed | Why it fits this audience |
|---|---|---|
| — | — | **Empty by ruling, not by neglect.** The audience of this spec is the next agent reading a green test run (`spec.md` § Audience & moment). It renders no surface, so there is no precedent to borrow and nothing to look at. |

## Hierarchy

Not applicable, and stated rather than skipped. This spec adds no surface and moves no element, so
the answer to *"what does the eye hit first on a 390px screen"* is unchanged on every route. The
two surfaces the spec's work sits next to — DS1, the legal footer, and DS4, the privacy settings
dialog — keep the hierarchy `0005` and `0006` set for them.

## Layout

### Desktop (1440) · 2560 · 3840
Unchanged. No element is added, removed, resized or reordered at any of the three.

### Mobile (390)
Unchanged. No horizontal overflow is introduced and no control moves off-viewport, because no
markup moves.

### Reflow
Unchanged. No breakpoint is added, no query is edited. Lesson **028** binds any per-viewport number
this gate states; this gate states none, so no boundary needs resolving in a browser.

## 2. The property of record — one row per in-scope assertion

**Read this as a design statement, never as a test.** Each row names the quantity the design
guarantees at that site and the instrument that can read it. Which selector, helper or assertion
shape achieves it is `tech-lead`'s at G4 and `frontend-dev`'s at G5 (`legal.md` §1.3). No number in
this section is projected: where a quantity has not been measured in the state that renders it, the
row says so and names the state, per lesson **050**.

| # | Site | The class it reads | **The property of record** | Instrument that can read it |
|---|---|---|---|---|
| **A1** | `__tests__/day-summary.test.tsx:96` | `.rounded-full.bg-neutral-100` | **No proportional track is painted when no minute was worked.** The track's meaning is *share of the day*; with an empty `segments` array there is no share to draw, and a track drawn anyway is a coloured bar asserting a division of nothing. | jsdom, structurally: the timeline subtree is absent — neither its boundary clock labels (`day-summary.tsx:60-61`) nor any child carrying an inline percentage `width` (`:56`) exists. |
| **A2** | `__tests__/hero-panel.test.tsx:72` | `.border-t` | **No separator rule is painted when there is nothing to separate.** The rule at `hero-panel.tsx:62` exists to divide the value from a footer; with no footer it divides the value from the panel's own edge. | jsdom, structurally: the panel renders no footer container, i.e. the value paragraph is the last painted child. In a browser: no descendant of the panel has a non-zero `border-top-width`. |
| **A3** | `__tests__/layout.test.tsx:21` | `font-hyperlegible` on `document.body.className` | **Body text renders in Atkinson Hyperlegible Next, not in a fallback.** The family is the accessibility premise of the whole product (`DESIGN.md` § Typography), and a fallback substitution is a legibility defect the user sees and no class detects. | **Not jsdom.** The literal `font-hyperlegible` is produced by `vitest.setup.ts:11`'s own mock, not by any shipped class — see finding **D1**. The jsdom-honest claim is identity with the font object's `variable`, not a substring of it; the rendered claim is `getComputedStyle(document.body).fontFamily` and the loaded face, in a browser. |
| **A4** | `__tests__/modal-dialog.test.tsx:96` | `overscroll-contain` | **Scrolling the dialog's content to its end does not scroll the page behind it.** This is a *constraint*, not an appearance: the promise is that the modal traps the scroll chain, the same promise `document.body.style.overflow` carries from the other side. | **Not jsdom** — jsdom has no scroll chaining. In a browser: the document's `scrollY` is unchanged after a wheel past the content's end. The sibling assertions at `:28,43,52,57,61` already hold the body-lock half of the same promise. |
| **A5** | `__tests__/modal-dialog.test.tsx:97` | `max-w-lg` passed by the caller | **A caller's width cap governs the dialog's rendered inline size.** Two separable claims live on this line: *the caller's class survives `cn()`* (identity, no visual property — see A6) and *the cap is the one that renders* (constraint, browser-measurable as the wrapper's rendered width). | Identity half: jsdom, with a **non-utility** sentinel. Constraint half: a browser reading the wrapper's rendered width against its container. `max-w-lg` is itself a live utility in a `cn()` merge group — finding **D3**. |
| **A6** | `__tests__/alert-banner.test.tsx:51,54` | `mb-6` used as the sentinel | **None — and that is the finding.** The assertion's subject is a prop contract (`0006`, and `legal.md` §5 confirms it). A sentinel must therefore be a string with **no** visual property, in no stylesheet, and in a namespace no future token can turn into a utility. | jsdom, unchanged in shape. The repository already has the correct convention in three sibling tests — `my-custom` (`stat-box.test.tsx:31`, `duration-field.test.tsx:60`, `regime-field.test.tsx:47`). Reuse it; do not invent a fourth spelling. |
| **A7** | `tests/e2e/disclosure-legibility.spec.ts:60` | `p.text-caption` | **Every paragraph the consent panel renders reads as prose at its own size** — the measure floor of LR2b, over the panel's whole text, in both themes, at every viewport in the suite's list. The domain is *the paragraphs the surface renders*, never *the paragraphs at one type step*. | `legal.md` §2 LG1 owns this outright: obligation-derived selector (LG1.1), count asserted before iterating (LG1.2, expected **5** per `legal.md` §3.4, and the rendered count overrules it). The design-side reinforcement is finding **D2**. |

### 2.1 — Why "the class" is never the property, in this repository specifically

`DESIGN.md` § Typography *The Type-Step-Is-Not-a-Colour Rule* records that the eleven type steps are
registered with `cn()`'s `extendTailwindMerge` as a `font-size` group. A class in a merge group is
not a stable attribute of an element — it is the **current winner of a merge**, and any caller
passing another member of the same group deletes it with no defect present and no rename anywhere.
That is a property of the design system as shipped, and it is the reason a class string cannot carry
a guarantee even between two renames.

The same rule has the mirror consequence for A6 and A5's identity half: a sentinel drawn from *any*
utility namespace is a sentinel the merge may legitimately eat.

## Components

**No component changes.** Listed so the reader can see the level each property belongs to.

| Component | Level | Status | Path |
|---|---|---|---|
| `DayTimeline` (inside `DaySummary`) | organism | **unchanged** — A1's property | `components/organisms/day-summary.tsx:48-64` |
| `HeroPanel` footer slot | organism | **unchanged** — A2's property | `components/organisms/hero-panel.tsx:62` |
| Root `<body>` font variable | template | **unchanged** — A3's property | `app/layout.tsx:61` |
| `ModalDialog` scroll wrapper | atom | **unchanged** — A4 and A5's properties | `components/atoms/modal-dialog.tsx:49` |
| `AlertBanner` root | atom | **unchanged** — A6 has no visual property | `components/atoms/alert-banner.tsx` |
| DS4 privacy panel paragraphs | organism | **unchanged** — A7's property | `components/organisms/cookie-consent.tsx:110-126` |
| DS1 legal footer paragraphs | organism | **unchanged** — F4's property | `components/organisms/calculator-views.tsx:74-89` |

## Tokens

**No token is added, changed or retired.** The tokens below appear only as the *subject* of an
assertion; each keeps its current value in both themes.

| Use | Token | Dark | Light |
|---|---|---|---|
| A1's track background | `--color-surface-sunken` (`app/globals.css:151` dark, `:103` light) | unchanged | unchanged |
| A3's family | `--font-hyperlegible`, consumed by `--font-sans` (`app/globals.css:6`) | unchanged | unchanged |
| A7's type step | `--text-caption` and its three companions (`app/globals.css:58-61`) | unchanged | unchanged |
| A2's separator | `border-ink-onfill/15` as shipped at `hero-panel.tsx:62` | unchanged | unchanged |

## States

**No interactive element is added or modified**, so there is no state table to write: rest, hover,
focus-visible, active, disabled, loading, error and empty are all exactly as shipped for every
control on every route.

One state is the *subject* of a property above and is named so it is not read as an omission:

| Element | The state at issue | Who owns it here |
|---|---|---|
| `DayTimeline` | **empty** — `segments` is `[]`, `total === 0`, nothing is painted | A1. The guard at `day-summary.tsx:50` is correct and does not move (`spec.md` § Non-goals). |
| `HeroPanel` | **no footer** — the slot is absent, the rule is not painted | A2. |

## Motion

**No motion changes.** No element gains, loses or alters a transition, a transform or a duration, so
there is no curve to specify and no `prefers-reduced-motion` path to pair. The neutraliser rule in
`AGENTS.md` §8 — every state-bound transform gets its `motion-reduce` counterpart in the same state —
is untouched because no state-bound transform is written.

## Accessibility intent

- **Contrast pairs (AA, both themes):** no text-on-surface pair is created, moved or recoloured.
  Every pair in the two surfaces this spec's work protects was verified at `0005` and `0006`; those
  verdicts stand and no number is restated here, because a contrast ratio republished without being
  re-measured is exactly the caveated number lesson **050** forbids.
- **Focus order:** unchanged on every route. No element enters or leaves the tab sequence.
- **Touch targets:** unchanged.
- **Screen reader:** unchanged. Note for A1: the track at `day-summary.tsx:54` is `aria-hidden="true"`,
  so it is **invisible to the accessibility tree by design** — the timeline is a visual restatement of
  numbers stated in text elsewhere in the summary. This is why A1's property must be read
  structurally or geometrically and can never be reached through a role or an accessible name.
- **Live regions:** unchanged. `hero-panel.tsx`'s `p[aria-live]` keeps its `polite` announcement, and
  the assertions covering it (`hero-panel.test.tsx:52,59,66`) are out of scope by the spec's own
  exclusion for computed values.

## Copy constraints

| Slot | Max length | Lines at 1440 / 390 |
|---|---|---|
| — | — | **None.** This spec ships no pt-BR string and moves none. Every string in the in-scope files is either an English `it` description or a fixture quoting a shipped string that does not move. `content-writer` owns `copy.md`; this gate defines no slot for it to fill. |

## Disclosure placement

No disclosure moves, and none is dropped for want of room. Recorded per row so the claim is checkable
rather than asserted:

| Disclosure | Where it sits | What this spec changes about it |
|---|---|---|
| **DS1** — the legal footer's four paragraphs | `components/organisms/calculator-views.tsx:74-89`, in the page footer, no interaction required | **Placement: nothing.** Its guard at `disclosure-legibility.spec.ts:34` gains the count assertion (F4). |
| **DS4** — the privacy dialog's five paragraphs | `components/organisms/cookie-consent.tsx:110-126` | **Placement: nothing.** Its guard at `:60` gains an obligation-derived selector and a count (F3). |

Neither is behind a collapse, and neither becomes so. The design lever that could have hidden one —
narrowing a selector until the suite is green — is explicitly forbidden by `legal.md` §3.5 and is
not proposed here.

## 3. Findings routed to `tech-lead` — design-owned, none of them an edit

| # | Severity | Where | What I found | Route |
|---|---|---|---|---|
| **D1** | medium | `__tests__/layout.test.tsx:21` with `vitest.setup.ts:11` | The literal `font-hyperlegible` the assertion looks for is **the mock's own return value**, not a shipped class: `app/layout.tsx:61` renders `hyperlegible.variable`, which in a real build is a generated `__variable_*` class. The assertion is falsifiable against exactly one defect — the `variable` being dropped from `<body>` — and against nothing about the family that actually renders. | `tech-lead` at G4. The smaller correction is to compare against the imported object's `variable` rather than a copied literal; the rendered-family claim needs a browser and is a widening of AC4's file set, i.e. the `tech-lead`'s call, not mine. |
| **D2** | corroborating to `legal.md` **F3** | `tests/e2e/disclosure-legibility.spec.ts:60` | A second, independent mechanism by which A7 loses its subject with **no rename anywhere**: `text-caption` is a registered `font-size` group member in `cn()` (`DESIGN.md` § Typography), so any caller passing another type step removes it from the element. The law gate's ground (domain narrowed by appearance, 3 of 5 paragraphs) is sufficient on its own; this adds that the class is not even stable between renames. | `tech-lead` at G4, **as reinforcement only**. It does not change F3's remedy and must not be read as an alternative to it. |
| **D3** | low | `__tests__/modal-dialog.test.tsx:97` | `max-w-lg` is a live utility used as a prop sentinel — the same clause **C3** shape as A6. The wrapper at `modal-dialog.tsx:49` carries `max-h-full` today and is one `max-w-*` away from voiding the caller's class, at which point the assertion goes red with no defect. A5 is in the inventory as C1; whether C3 also reaches it is the `product-manager`'s classification, not mine. | `tech-lead` at G4, with the `product-manager` consulted on the clause. If it stands, the sentinel takes the repository's existing `my-custom` convention and the *constraint* half (rendered width) is either moved to a browser or recorded as unguarded. |
| **D4** | low | `__tests__/day-summary.test.tsx` | Nothing in the file measures the timeline's **proportionality** — `grep -n "width\|style" __tests__/day-summary.test.tsx` returns **0 matches**. A track rendered with every segment at `width: 0%` passes the whole file. A1's fix covers the empty day; the non-empty day, which is the state the component exists for, has no assertion on the quantity the bar encodes. | `tech-lead` at G4, `qa-engineer` at G6. **Not a demand and not a scope change** — it is the known-good direction lesson **040** asks for, and the spec's AC5 does not require it. |

## System change

**None.** No token, no type step, no curve, no elevation level, no spacing value is added, changed or
retired, so there is no human approval point at this gate.
