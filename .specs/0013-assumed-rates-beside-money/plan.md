# 0013 — Implementation plan

> Owner: tech-lead · Gate: `plan`

**Two coordinates for everything measured in this document** (`AGENTS.md` §5):

| | |
|---|---|
| **Tree state** | working tree of `fix/design-taste-preflight`, 2026-09-19 15:08–15:20, `HEAD` **5c0c6fa**. `components/organisms/day-summary.tsx` and `components/organisms/journey-form.tsx` are **modified and unstaged** — `git status --short` on both returns ` M`, so both carry a sibling spec's uncommitted work and are live (lesson **060**). Every number below was read on that tree, never on the sha. |
| **Application state** | `ST-A`…`ST-D` exactly as `spec.md` § The states defines them, reached by rendering `DaySummary` with explicit props. No hook, no `localStorage`, no browser. |
| **Instrument** | Vitest + Testing Library (jsdom) and Biome, run with `rtk proxy npx …` in an isolated copy at `…/scratchpad/iso-0013`, created with `rsync -a --exclude node_modules --exclude .next --exclude .git` + `cp -al node_modules`. **No port, no server, no `next dev`, no browser** — `spec.md` § Out of scope 7 and the team lead's instruction. The repository working tree was not modified by any run in this gate. |

---

## Architecture

### The approach, in one sentence

One unconditional `<p>` of static text is inserted as the first element of the paragraph stack in
`day-summary.tsx`'s variable-pay block, and a tracked guard scores `legal.md`'s clause **D** over the
four domain members in four application states. **Nothing else moves.**

### The ponytail ladder, run against this change

| Rung | Answer |
|---|---|
| Does this need to exist? | Yes — `legal.md` **DV-1**, severity major, with a red subject in 6/6 measured states. |
| Is it already in the codebase? | The *shape* is: `day-summary.tsx:232` (M3) and `:238` (M4) are the same element with the same three utilities. This task adds a third instance of a pattern that already ships twice, which is why it earns **no** component (`design.md` § Components). |
| Does the platform do it? | Yes — a `<p>` of running text. No `motion`, no `AnimatePresence`, no `title`, no tooltip, no `aria-describedby`, no `role`. |
| Does an installed dependency do it? | Not needed. |
| Can it be one line? | It is one element and one string. |

### What changes, by layer

| Layer | Change | Why |
|---|---|---|
| `lib/**` | **none** | There is no business rule here. The disclosure states no computed quantity — it is a literal with no operand (`design.md` § Copy slots). Nothing is added to `lib/` and no constant moves; see the **DV-2** ruling below. |
| `hooks/**` | **none** | `use-work-calculator.ts` is untouched. `DEFAULT_FIRST_TIER_RATE`, `DEFAULT_EXTRA_TIER_RATE` and `FIRST_TIER_LIMIT_MINUTES` keep their values, their file and their line numbers (**AC7**, **AC8**). |
| `components/organisms/day-summary.tsx` | one `<p>` inserted between `:230` and `:232` | `design.md` § Components, § Disclosure placement. |
| `components/organisms/journey-form.tsx` | **text only, and blocked — see B1** | **AC9**'s exemption is ruled triggered below. |
| `__tests__/` | one file edited, one created | **AC4**, **AC5**, **AC6**, **AC7**. |
| `app/globals.css`, `DESIGN.md`, `PRODUCT.md` | **none** | `design.md` § System change: no token added, changed or removed. No human approval point. |

### Component tree and atomic level

```
components/templates/calculator-layout.tsx        template   unchanged
└── components/organisms/work-calculator.tsx      organism   unchanged
    ├── components/organisms/journey-form.tsx     organism   text only, T3, blocked
    └── components/organisms/day-summary.tsx      organism   ← the whole of T1
        └── div (variable-pay block, :180)        section    unchanged
            ├── div (rows group)                  section    unchanged  ← M1 M2 M3 M4
            ├── p#assumed-rate-disclosure         element    NEW
            ├── p (M3 caption, :232)              element    untouched
            ├── p (M4 caption, :238)              element    untouched
            └── Link (ST-C only)                  atom       unchanged
```

**No new atom, no new molecule, no new organism.** `design.md` § Components rules a single `<p>` with
three existing utilities does not earn a component, and extracting one would put a legally bound
string one indirection away from the rows it qualifies. The fourth instance of this shape is the
moment to extract, and that call belongs to the spec that adds it (`F-5`).

### Data flow

There is none. The paragraph interpolates **no** prop, reads **no** hook and has **no** render
condition, so it is present in the server-rendered HTML in the same byte stream as `Extra 50%` and
`Extra 100%` (`design.md` § States, *loading*). That is what makes **ST-C** — rate asserted, no money
— satisfied by construction rather than by a branch someone has to remember, and it is what makes
this spec's tests immune to `0012`: every fixture below passes the tier minutes in as props, so the
weekday routing `0012` corrects is never executed by anything this spec ships.

### Dependency decisions

| Need | Decision | Justification |
|---|---|---|
| Render one paragraph of static pt-BR text | **No dependency.** JSX text node. | The platform renders text. `AGENTS.md` §8. |
| Score clause **D** over four members in four states | **No dependency.** Vitest + `@testing-library/react`, both already installed and already used by `__tests__/day-summary.test.tsx`. | Reuse before writing. |
| Motion | **None, and stated as a specification rather than an omission.** | `design.md` § Motion: a mount fade would make the disclosure arrive measurably **after** the assertion it qualifies, against `legal.md` §8.2's **tempo** axis. |

**No new dependency is added by this plan.**

---

## Rulings this gate owes

### AC9 — the exemption is triggered, and the remedy is routed, not improvised

`design.md` §9.2 measured the state: `JourneyForm` and `DaySummary` are siblings in
`CalculatorLayout`'s `main` column, so with the settings panel **open** at 390 and at 1440 the two
field hints render **alongside** the new slot — `#first-tier-rate-hint` 34.78 px tall,
`#extra-tier-rate-hint` 69.56 px. With the panel **closed** both are absent from the DOM.

Read the two strings against the one this spec ships:

| | String | Claim |
|---|---|---|
| `journey-form.tsx:142` | *"O piso legal é 50% sobre a hora normal (art. 7º, XVI, da CF; art. 59, §1º, da CLT)."* | **C1**, with the same two norms |
| `journey-form.tsx:157`, sentence 1 | *"O piso de 50% vale para toda hora extra, inclusive depois da 2ª (art. 7º, XVI, da CF; art. 59, §1º, da CLT)."* | **C1** + **L5(c)**, with the same two norms |
| new slot, sentence 3 | *"Os 50% são o mínimo que a lei garante a toda hora extra, inclusive depois da 2ª (art. 7º, XVI, da CF; art. 59, §1º, da CLT)."* | **C1** + **L5(c)**, same two norms |

**Ruled: the same assertion renders twice in one state.** `legal.md` §6 **L7** requires the
disclosure to render *exatamente uma vez* per state and forbids *"a mesma frase no bloco e no painel
ao mesmo tempo"*. That is a `labor-law-analyst` ruling and architecture may not overrule it
(`AGENTS.md` §4 rule 8). **AC9**'s exemption therefore fires, and `spec.md` § Out of scope 3
constrains the direction in advance: **the hint's text changes, the slot stays.** Two further reasons
the slot is the survivor, both already measured: the hint is **absent from the DOM** in the state that
matters (panel closed, `0003` §16.2 `count 0`), and `journey-form.tsx:157`'s second sentence is
`legal.md` **DV-3**, whose broad reading Lei nº 8.906/1994 art. 20 §2º falsifies.

**What this gate does not do is write the replacement.** The words are `content-writer`'s, the claim
is `labor-law-analyst`'s, and the file is held uncommitted by two live siblings (`0003` at G7, `0010`
at G5). Routed as **B1** and **B2** in `STATUS.md`. **T3 below is written but blocked**, and it ships
in this spec rather than being handed forward, because shipping the slot without it leaves a measured
**L7** breach in the tree — which only the human may accept (`AGENTS.md` §4 rule 8).

### AC10 — the two slots, named

| | Slot | Subject |
|---|---|---|
| **this spec** | `day-summary.tsx`, variable-pay block, **first** paragraph of the stack, between `:230` and `:232` | the two tier **rates** and the two-hour **price** boundary |
| **`0012`'s W1** | **none yet.** `.specs/0012-saturday-overtime-tier/design.md` is the unedited template. **Owner: `0012`'s `product-designer`; trigger: `0012`'s G3.** | the **weekday routing** of minutes between the two tiers |

**Why two sentences and not one repeated:** `legal.md` §6 **L9** / §8.1 **C4** forbid this spec's
string from containing *sábado*, *domingo*, *fim de semana* or *final de semana*, or making the
weekday the subject of any sentence — grep-checkable, and `copy.md` § Checks shows 0 matches. A merged
sentence would have to name the weekday to carry W1. They cannot be one string.

**Sequencing: `0012` ships first**, as `0012`'s own G4 already ruled, because `0013`'s **ST-B** fixture
is the routing `0012` corrects. This plan makes the order free of consequence rather than merely
tolerable: the file sets are disjoint (`0012` edits `hooks/use-work-calculator.ts` and its test; this
spec edits `day-summary.tsx`, `journey-form.tsx` and two test files), and every fixture here passes
tier minutes as **props**, so no assertion in T1 or T2 reads `0012`'s predicate. When W1 lands, both
paragraphs are direct children of the same `space-y-3` block with the same three utilities
(`design.md` §9.4), so neither ordering can break the §9.1 calibration.

### AC11 — the shipped guard against `0006`'s recorded refusal

`0006` refused **a class-string source guard mirroring `px-3`**, and chose the browser-measured
`expectLr2a` assertion instead (`.specs/0006-salary-alert-legibility/STATUS.md`, decisions log,
2026-09-15). The refusal is of *guards that assert the CSS instead of the property*; it is not a
refusal of permanent guards, and the guard `0006` chose **is** permanent. **T2's guard asserts a
rendered property — that a co-rendered paragraph names the source and states that another value is
lawful — queried by text, with no class string anywhere in it.** It is on the side of the line `0006`
chose, not against it.

### DV-2 — not remedied here, and the reason is written down

`FIRST_TIER_LIMIT_MINUTES = 120` lives in `hooks/use-work-calculator.ts:9`; `grep -rn "TIER" lib`
returns **0 lines**, re-measured by `labor-law-analyst` on 2026-09-19. Three user-visible numbers
trace to no table in `lib/`, which `AGENTS.md` §8 and §9 both name. **It stays open.** Moving the
constant is arithmetic-adjacent refactoring that `spec.md` § Out of scope 1 bars and that would make
this slice unfalsifiable; `labor-law-analyst` recommends against widening here (`legal.md` §13.2) and
`design.md` §9.5 records there is no design lever. **Owner: `tech-lead`. Trigger: the next spec that
moves the tier split** — today that is `0012`, which already edits the file the constant lives in.
Recorded here so the next reader does not re-derive it.

### Routed onward — neither adopted nor decided by me

| Id | To | What is routed |
|---|---|---|
| **F-6** | **`labor-law-analyst`** | `legal.md` §8.2's **medida** clause is unscoreable: its `n` is the rendered line count, which is a function of string length (3 for M3, 12 for the new paragraph at 390), and the three admissible readings disagree at 2 of 4 widths — the shape `AGENTS.md` §5 *A threshold that does not move when n does* forbids. `product-designer`'s control (probes of 420 and 360 characters, geometrically identical to M3 to 0.00 px, scoring 54/54 against 55) is a failure by one character on a difference that is not there. The proposed restatement — equality of computed `font-size`, computed `line-height` and border-box width, measured in the same run — is in `design.md` §9.1, **proposed and not applied**. I do not adopt it: the clause is `labor-law-analyst`'s. Until it is restated the axis stays **non-binding**, and the verdict rests on **C1–C3**, **presença** and **tempo**, which all have a red subject today. **Non-blocking for G5.** |
| **F-5** | **`product-manager`** | The variable-pay block now carries three permanent disclosure paragraphs — 371.81 px of a 578.61 px block at 390 (64%) — and `0012`'s W1 makes four. The class question (do disclosures accumulate in one block, or bind individually to their rows) cannot be answered here: § Out of scope 4 forbids touching M3 and M4. Trigger: the spec that adds the fourth paragraph. **Non-blocking for G5.** |
| **DV-4** | closed | `PRODUCT.md` §6 was corrected by the human before G3 opened (`.specs/INDEX.md`, 0013 row). Nothing owed here. |

---

## The criteria this plan endorses, measured at this gate

`AGENTS.md` §5: *endorsing a criterion without running it against a good state is the same defect,
one gate later.* Every run below was executed in the isolated copy during this gate.

### AC1 / AC2 — clause D in four states, both directions

Scored with the predicate T2 ships. `disclosures` per member; `absent` means the member's own label
does not render in that state.

| State | tree | M1 | M2 | M3 | M4 |
|---|---|---|---|---|---|
| ST-A | **known-bad** (working tree, no new paragraph) | **0** | **0** | 1 | 1 |
| ST-B | known-bad | **0** | **0** | 1 | 1 |
| **ST-C** | known-bad | **0** | **0** | 1 | absent |
| ST-D | known-bad | **0** | **0** | 1 | 1 |
| ST-A | **known-good** (paragraph inserted) | **1** | **1** | 1 | 1 |
| ST-B | known-good | **1** | **1** | 1 | 1 |
| **ST-C** | **known-good** | **1** | **1** | 1 | absent |
| ST-D | known-good | **1** | **1** | 1 | 1 |
| ST-A…ST-D | **refuted known-good** — the same paragraph with every `(art. …)` stripped | **0** | **0** | 1 | 1/absent |

**AC2's gap is closed.** `spec.md` recorded that *no run in this session produced a pass* for ST-C and
asked this gate to produce one before endorsing the criterion. The ST-C known-good above is that run:
`M1 = 1`, `M2 = 1`, with `grossHourlyRate = null` and **no money anywhere in the card** (money array
empty, asserted). The refuted row is the control that proves the citation half of **D** is
load-bearing and not decoration — a paragraph that states the assumption in plain words and cites
nothing scores **0**, exactly as `spec.md`'s run **D** did.

### AC6 — the guard fails on a shrunken set

With the disclosure in place and `<span>Adicional noturno 20%</span>` mutated to
`<span>Adicional noturno</span>` in the isolated copy:

```
ST-A | paragraphs=3 | measured=3 exempt=1 expected=4 | M1=1 M2=1 M3=absent M4=1
AssertionError: expected [ 'M3' ] to deeply equal []
Tests  1 failed (1)
```

A member that stops rendering is a **failure**, not an exemption. Only `M4` may be absent, and only in
`ST-C`, where its row is gated on `restDayPay > 0`: `measured + exempt = 4` in every state.

### AC7 — the four money strings, measured before and after

Read from the rendered card, NBSP (`U+00A0`) normalised to a space:

| State | `formatCurrency` output, in DOM order |
|---|---|
| ST-A | `R$ 204,55` · `R$ 300,00` · `R$ 0,00` · `R$ 74,75` |
| ST-B | `R$ 0,00` · `R$ 572,73` · `R$ 0,00` · `R$ 84,85` |
| ST-C | *(none — the four money spans do not render)* |
| ST-D | `R$ 204,55` · `R$ 300,00` · `R$ 27,27` · `R$ 78,79` |

Byte-identical before and after the insertion, and **asserted permanently** inside T2's guard rather
than snapshotted once. ST-A reproduces `legal.md` §7's measured row (204,55 · 300,00 · 0,00 · 74,75) to
the centavo. ST-B's and ST-D's DSR figures are measured here for the first time; `legal.md` §7's ST-D
row is a different fixture (274 night minutes) and is not the same state.

### The collision this gate found, which no upstream artifact could see

Running the **whole** suite in the isolated copy with the paragraph inserted returns

```
Test Files  1 failed | 61 passed (62)
Tests  1 failed | 619 passed (620)
FAIL  __tests__/day-summary.test.tsx > DaySummary > keeps the floor disclosure out of the footer and beside its own row
```

`__tests__/day-summary.test.tsx:228` asserts `caption.previousElementSibling` has the text content
`"Adicional noturno 20%"`. Inserting a paragraph **before** M3's caption — which is exactly what
`design.md` specifies, so that the order of explanation follows the order of the rows explained —
makes M3's previous sibling the new paragraph. **One assertion in the entire suite; nothing else moves.**

This corrects **the artifact that set the expectation**, not the assertion tuned until green
(`AGENTS.md` §5): the guard was written when M3's caption was first in the stack, and this spec
deliberately changes that order. The replacement in T1 re-states the guard's own two conjuncts — *out
of the footer* and *beside its own row* — and was proven to discriminate in this session, in both
directions:

| Arrangement | Verdict |
|---|---|
| M3's caption in the block, after its row (intended) | **18 passed (18)** |
| M3's caption moved to the card footer, after the warnings | **1 failed \| 17 passed (18)** — `AssertionError: the caption sits at card level, not beside its row` |

The original assertion is **vacuous** against the second arrangement in its naive rewrites: a
containment-only check passes at the footer too, because the card root contains the row as well. The
clause that discriminates is the one that names **which** container, and it is written into T1.

---

## Tasks

### T1 — Insert the assumed-rate disclosure into the variable-pay block

- **Files:**
  - `components/organisms/day-summary.tsx` (edit)
  - `__tests__/day-summary.test.tsx` (edit)
- **Depends on:** none
- **Reuse:**
  - `components/organisms/day-summary.tsx:232-235` — the M3 caption, whose element shape, utilities and voice this paragraph copies exactly. Do not extract a component; `design.md` § Components forbids it.
  - `__tests__/day-summary.test.tsx`'s existing `renderSummary(overrides)` helper and `BASE_PROPS`. Do not write a second render helper.
- **What to build:**

  Insert **exactly** this block into `components/organisms/day-summary.tsx`, after the `</div>` that
  closes the rows group at `:230` and its blank line, immediately **before** the M3 caption that
  currently begins at `:232`. This is the formatted output of `biome check` in this tree — type it as
  written and the formatter will not move it:

```tsx
        <p id="assumed-rate-disclosure" className="text-caption text-ink-subtle text-pretty">
          Assumimos 50% até 2h extras e 100% depois. Nenhuma das duas é necessariamente a taxa do seu contrato. Os 50%
          são o mínimo que a lei garante a toda hora extra, inclusive depois da 2ª (art. 7º, XVI, da CF; art. 59, §1º,
          da CLT). Usamos esse mínimo por não saber a taxa da sua convenção coletiva, que pode ser maior. Depois da 2ª
          hora, nenhuma lei fixa um valor maior para o empregado em geral. O degrau até 100% que o app aplica só existe
          onde há convenção ou acordo coletivo (art. 7º, XXVI, da CF; art. 611-A, I, da CLT). O corte em 2 horas também
          é uma escolha do app, não uma regra geral.
        </p>
```

  Every element of it is mandated upstream, and none of it is yours to vary:

  | Thing | Value | Source |
  |---|---|---|
  | The string | the 589 characters above, verbatim | `copy.md` § Strings, `day-summary.assumed-rate-disclosure`. **Measured in this gate: the rendered `textContent` is 589 characters and byte-identical to `copy.md`'s row.** The line breaks above are JSX source wrapping and collapse to single spaces — verified, not assumed. |
  | `id` | `assumed-rate-disclosure` | `design.md` § Components. It exists so **AC3** can read `getBoundingClientRect()` and `getComputedStyle()` on the element without depending on its text. It is **not** a selector any guard iterates. |
  | `className` | `text-caption text-ink-subtle text-pretty`, in that order | `design.md` § Tokens. `--text-caption`, `--color-ink-subtle`, `text-wrap: pretty`. No `dark:` twin, no arbitrary value, no hex. |
  | Spacing | **none of its own.** No margin, no padding, no width. The 12 px gap comes from the block's existing `space-y-3`. | `design.md` § Tokens — this is what makes its measure equal M3's to 0.00 px. |
  | Render condition | **none.** Not `grossHourlyRate !== null`, not `restDayPay > 0`, not minutes, not a panel. | `legal.md` §6 **L8**, §7, §8.2 *presença*; `spec.md` clause **D**. This is what satisfies **ST-C** by construction. |
  | Position | **first** in the paragraph stack, before M3 | `design.md` § Components, § Disclosure placement. |
  | Motion | **none.** No `motion` import, no `initial`/`animate`, no CSS `transition`, no `@starting-style`. | `design.md` § Motion. A fade would make the disclosure arrive 160 ms **after** the assertion it qualifies. No `motion-reduce:` utility is owed, because no state-bound transform is introduced — stated so a reviewer does not read the absence as an oversight. |
  | Interpolation | **none.** The string does **not** interpolate `{firstTierRate}` or `{extraTierRate}`. | `design.md` § Copy slots: 50% stays the legal minimum at every value the reader can type, and a string that changes on a keystroke is a string a screen reader re-announces. |
  | Live regions | **do not add** `aria-live`, `aria-atomic` or `role="status"` to the paragraph **or to any ancestor of it inside the card**. | `design.md` § Accessibility. 589 characters queued for polite re-announcement on every keystroke is the live-clock defect in another costume. |
  | Wiring | **no** `aria-describedby` from the rate labels, **no** `role`, **no** `title`, **no** tooltip, **no** link. | `design.md` § Components. |
  | Attribution on the boundary | **binding prohibition:** no citation, no tooltip, no `title` and no norm reference of any kind may be attached to the two-hour boundary anywhere in this block. **CLT art. 59 *caput* may not appear.** | `legal.md` §2.2, §6 **L6**, §8.1 **C3**; `design.md` § Disclosure placement, stated there as binding on `frontend-dev`. |
  | Comments | **none.** `design.md`'s markup sketch shows `{/* content-writer's string */}` as a placeholder for the string — **do not ship a JSX comment.** | `AGENTS.md` §8, enforced by `__tests__/comment-free-code.test.ts`. |

  Then repair the one assertion the insertion falsifies. In `__tests__/day-summary.test.tsx`, replace
  the body of `it("keeps the floor disclosure out of the footer and beside its own row", …)` — today
  `:225-229` — with **exactly** this, and change nothing else in that test's name or its
  `renderSummary` call except taking `container` from it:

```tsx
  it("keeps the floor disclosure out of the footer and beside its own row", () => {
    const { container } = renderSummary({ nightMinutes: 0, grossHourlyRate: 13.6364 });

    const caption = screen.getByText(/Os 20% do adicional noturno são o mínimo da CLT/);
    const row = screen.getByText("Adicional noturno 20%");
    const captionBlock = caption.parentElement as HTMLElement;

    expect(captionBlock.contains(row), "the caption left the block its row lives in").toBe(true);
    expect(captionBlock === container.firstElementChild, "the caption sits at card level, not beside its row").toBe(
      false,
    );
    expect(
      caption.compareDocumentPosition(row) & Node.DOCUMENT_POSITION_PRECEDING,
      "the caption no longer follows the row it qualifies",
    ).toBeTruthy();
  });
```

  Three clauses because the test's own sentence has three: the caption is in a block that holds its
  row, that block is **not** the card root (which is what "out of the footer" means, and the clause a
  containment-only check is blind to), and the caption **follows** the row it qualifies. **M3's string
  is not edited and M3's paragraph is not moved** — `spec.md` § Out of scope 4, **AC4**.

- **Tests:** `__tests__/day-summary.test.tsx` — add these four cases immediately before
  `it("renders the compliance warnings it is given", …)`. They are written out because every one of
  them was run red against the unmodified tree and green against the insertion in this gate:

```tsx
  it("names both tier rates as the app's own assumption, in the block that prices them", () => {
    renderSummary({ firstTierMinutes: 120, extraTierMinutes: 132, grossHourlyRate: 68.1818 });

    const disclosure = screen.getByText(/Assumimos 50% até 2h extras e 100% depois/);
    const firstTierRow = screen.getByText("Extra 50%");

    expect(disclosure).toHaveTextContent("art. 7º, XVI, da CF; art. 59, §1º, da CLT");
    expect(disclosure).toHaveTextContent("art. 7º, XXVI, da CF; art. 611-A, I, da CLT");
    expect(disclosure).toHaveTextContent("O corte em 2 horas também é uma escolha do app");
    expect((disclosure.parentElement as HTMLElement).contains(firstTierRow)).toBe(true);
  });

  it("keeps the assumption on screen where no money renders at all", () => {
    renderSummary({ firstTierMinutes: 120, extraTierMinutes: 132, grossHourlyRate: null });

    expect(screen.getByText("Extra 50%")).toBeInTheDocument();
    expect(screen.getByText("Extra 100%")).toBeInTheDocument();
    expect(screen.getByText(/Assumimos 50% até 2h extras e 100% depois/)).toBeInTheDocument();
    expect(screen.queryByText(/R\$/)).toBeNull();
  });

  it("explains the tier rows before the night premium they precede", () => {
    renderSummary({ firstTierMinutes: 120, grossHourlyRate: 68.1818 });

    const disclosure = screen.getByText(/Assumimos 50% até 2h extras e 100% depois/);
    const nightCaption = screen.getByText(/Os 20% do adicional noturno são o mínimo da CLT/);

    expect(disclosure.compareDocumentPosition(nightCaption) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it("keeps the assumption out of every live region and out of the tab order", () => {
    const { container } = renderSummary({ firstTierMinutes: 120, grossHourlyRate: 68.1818 });
    const disclosure = container.querySelector("#assumed-rate-disclosure") as HTMLElement;

    expect(disclosure).not.toBeNull();
    expect(disclosure.getAttribute("tabindex")).toBeNull();
    expect(disclosure.closest("[aria-live]")).toBeNull();
    expect(disclosure.closest("[aria-atomic]")).toBeNull();
    expect(disclosure.closest("[role='status']")).toBeNull();
  });
```

  **Three test paths this task does not owe, each with its reason** (so a reviewer does not read the
  absence as a gap): a **keyboard** path — the task adds no focusable element and no tab stop, and the
  fourth case asserts exactly that; a **reduced-motion** path — the task introduces no motion at all,
  and the check that it stays that way is the `git diff` clause below, not a test; a **class-string**
  assertion — forbidden by `AGENTS.md` §8, and the utilities are verified at G6 by computed style in a
  real browser instead.

- **Done when:**
  - `pnpm test __tests__/day-summary.test.tsx` → **22 passed (22)**. Measured in the isolated copy at this gate. A different number is a **finding to route, never a number to adjust**: 18 existing cases + 4 added.
  - `pnpm lint` clean over both files. Measured: `biome check` on the exact blocks above prints `Checked 2 files … No fixes applied.` If the formatter moves a line, the block above was mistyped — retype it, do not reformat the surrounding file.
  - `git diff -- components/organisms/day-summary.tsx` shows **only** the nine added lines above. The four `formatCurrency` call sites, both tier labels, `Adicional noturno 20%`, `DSR de extras e noturno` and the two existing paragraphs are untouched (**AC4**, **AC7**).
  - `git diff -- components/organisms/day-summary.tsx | grep -E "^\+" | grep -E "motion|aria-live|aria-atomic|role=|title=|tabindex|<input|<select|DEFAULT_|STORAGE_KEYS"` returns **nothing** (**AC8**, and the motion and live-region prohibitions above).
  - Advances **AC1**, **AC2**, **AC3** (produces the element AC3 measures), **AC4**, **AC7**, **AC8**, **AC12**.

### T2 — Ship the clause-D guard on a tracked path

- **Files:** `__tests__/assumed-rate-disclosure.test.tsx` (create)
- **Depends on:** **T1**
- **Reuse:** `DaySummary` and the `DayBreakdown` type only. The guard deliberately does **not** reuse
  `day-summary.test.tsx`'s `BASE_PROPS`: that fixture is a finished 8h48 day with no overtime, and this
  guard's states are `spec.md`'s **ST-A…ST-D**. Two fixtures, two purposes, stated so the next reader
  does not "consolidate" them.
- **What to build:** create the file with **exactly** this content. It is the file that was run in this
  gate; `biome check` prints `Checked 1 file … No fixes applied.` against it and `tsc --noEmit` is
  clean.

```tsx
import { render } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it } from "vitest";
import { DaySummary } from "@/components/organisms/day-summary";
import type { DayBreakdown } from "@/lib/day-breakdown";

type DaySummaryProps = ComponentProps<typeof DaySummary>;

const SOURCE_NAMED = /art\.\s*\d|Lei nº|Súmula/;
const OTHER_VALUE_LAWFUL =
  /convenção|acordo coletivo|pode prever|pode ser maior|supõe|Feriados não entram|escolha do app|necessariamente/i;

interface DomainMember {
  id: string;
  label: RegExp;
  subject: RegExp;
  rendersUnconditionally: boolean;
}

const MEMBERS: readonly DomainMember[] = [
  { id: "M1", label: /^Extra 50%$/, subject: /50%/, rendersUnconditionally: true },
  { id: "M2", label: /^Extra 100%$/, subject: /100%/, rendersUnconditionally: true },
  { id: "M3", label: /^Adicional noturno 20%$/, subject: /20%/, rendersUnconditionally: true },
  { id: "M4", label: /^DSR de extras e noturno$/, subject: /DSR/, rendersUnconditionally: false },
];

function coveringParagraphs(subject: RegExp, paragraphs: readonly string[]): number {
  return paragraphs.filter((text) => subject.test(text) && SOURCE_NAMED.test(text) && OTHER_VALUE_LAWFUL.test(text))
    .length;
}

const MONDAY = "2025-01-06";
const SATURDAY = "2025-01-04";

function journeyTimes(day: string) {
  return { entry: `${day}T08:00`, lunchStart: `${day}T12:00`, lunchEnd: `${day}T13:00`, exit: `${day}T22:00` };
}

const LONG_DAY: DayBreakdown = {
  morningMinutes: 240,
  lunchMinutes: 60,
  afternoonMinutes: 540,
  nightMinutes: 0,
  nightBonusMinutes: 0,
  workedMinutes: 780,
  expectedMinutes: 528,
  remainingMinutes: 0,
  overtimeMinutes: 252,
  progressPercent: 100,
  overtimePercent: 48,
  segments: [
    { kind: "morning", minutes: 240 },
    { kind: "lunch", minutes: 60 },
    { kind: "afternoon", minutes: 540 },
  ],
  isInProgress: false,
};

const STATE_A: DaySummaryProps = {
  breakdown: LONG_DAY,
  times: journeyTimes(MONDAY),
  balanceMinutes: 252,
  firstTierMinutes: 120,
  extraTierMinutes: 132,
  nightMinutes: 0,
  firstTierRate: 50,
  extraTierRate: 100,
  grossHourlyRate: 68.1818,
  warnings: [],
};

const STATES: readonly { id: string; props: DaySummaryProps; exempt: readonly string[]; money: readonly string[] }[] = [
  { id: "ST-A", props: STATE_A, exempt: [], money: ["R$ 204,55", "R$ 300,00", "R$ 0,00", "R$ 74,75"] },
  {
    id: "ST-B",
    props: { ...STATE_A, times: journeyTimes(SATURDAY), firstTierMinutes: 0, extraTierMinutes: 252 },
    exempt: [],
    money: ["R$ 0,00", "R$ 572,73", "R$ 0,00", "R$ 84,85"],
  },
  { id: "ST-C", props: { ...STATE_A, grossHourlyRate: null }, exempt: ["M4"], money: [] },
  {
    id: "ST-D",
    props: { ...STATE_A, nightMinutes: 120, breakdown: { ...LONG_DAY, nightMinutes: 120, nightBonusMinutes: 17 } },
    exempt: [],
    money: ["R$ 204,55", "R$ 300,00", "R$ 27,27", "R$ 78,79"],
  },
];

describe("clause D — every app-chosen rate beside money carries its disclosure", () => {
  it("scores its own predicate in both directions before it scores the app", () => {
    const cited = "Os 50% são o mínimo legal (art. 59, §1º, da CLT). A sua convenção coletiva pode prever mais.";
    const uncited = "Os 50% são uma suposição do app e a sua convenção coletiva pode prever mais.";
    const silent = "O dia tem 8h48 de jornada.";

    expect(coveringParagraphs(/50%/, [cited])).toBe(1);
    expect(coveringParagraphs(/50%/, [uncited])).toBe(0);
    expect(coveringParagraphs(/50%/, [silent])).toBe(0);
    expect(coveringParagraphs(/50%/, [])).toBe(0);
  });

  for (const state of STATES) {
    it(`covers every rendered member in ${state.id}`, () => {
      const { container } = render(<DaySummary {...state.props} />);
      const labels = [...container.querySelectorAll("span")].map((node) => node.textContent?.trim() ?? "");
      const paragraphs = [...container.querySelectorAll("p")].map(
        (node) => node.textContent?.replace(/\s+/g, " ").trim() ?? "",
      );

      const rendered = MEMBERS.filter((member) => labels.some((text) => member.label.test(text)));
      const absent = MEMBERS.filter((member) => !rendered.includes(member));

      expect(MEMBERS.length, `${state.id}: the domain lost a member`).toBe(4);
      expect(rendered.length + absent.length, `${state.id}: measured + exempt must equal the domain`).toBe(4);
      expect(rendered.length, `${state.id}: nothing was measured, which is a failure and not a pass`).toBeGreaterThan(
        0,
      );
      expect(
        absent.map((member) => member.id),
        `${state.id}: only the conditional member may be absent`,
      ).toEqual(state.exempt);
      expect(
        absent.every((member) => !member.rendersUnconditionally),
        `${state.id}: an unconditional member stopped rendering`,
      ).toBe(true);

      for (const member of rendered) {
        expect(
          coveringParagraphs(member.subject, paragraphs),
          `${state.id} ${member.id}: no co-rendered paragraph names its source and says another value is lawful`,
        ).toBeGreaterThanOrEqual(1);
      }

      const money = [...container.querySelectorAll("span")]
        .map((node) => (node.textContent ?? "").replace(/\u00a0/g, " "))
        .filter((text) => text.includes("R$"));
      expect(money, `${state.id}: a money figure moved`).toEqual(state.money);
    });
  }
});
```

  Why it is shaped this way, so a later gate can check the shape rather than trust it:

  - **The iterated set comes from the labels, never from the disclosures.** `legal.md` §8 is explicit: a selector scoped to the disclosure cannot see **ST-C** and would sign `pass` against a panel that emits nothing. `MEMBERS` is derived from the obligation — the four strings `legal.md` §7 and §11 **R2** measured as `T1 ∧ T2 ∧ T3` — and never from a class, a token or a size (`AGENTS.md` §5).
  - **The set size is asserted before it is iterated**, `expected = 4`, with `measured + exempt = 4` in every state and `measured > 0` as its own clause. Zero is a failure, not a pass.
  - **Only `M4` may be exempt, and only in ST-C**, where its row is gated on `restDayPay > 0`. Every other absence fails on a named clause rather than silently shrinking the sample.
  - **The predicate carries its own known-bad, permanently.** The first case scores `coveringParagraphs` against a cited string (**1**), the same string without its citation (**0**), an unrelated string (**0**) and an empty collection (**0**) — the three answers `legal.md` §8's closing paragraph demands in writing before any `pass` cites this guard, and they are three different answers, not two.
  - **Money is asserted, not snapshotted** — `AC7` becomes a permanent clause instead of a one-off capture, and a wrong NBSP is normalised rather than left to bite a later reader.
  - **No Tailwind class string is asserted anywhere in it** (`AGENTS.md` §8, and the **AC11** reconciliation above).

- **Tests:** the file **is** the test.
- **Done when:**
  - `pnpm test __tests__/assumed-rate-disclosure.test.tsx` → **5 passed (5)**. Measured at this gate.
  - `git ls-files __tests__ | wc -l` → **59**. Measured before this task: **58**, and the one added member is this file, attributed by name. `git check-ignore -v __tests__/assumed-rate-disclosure.test.tsx` exits **1** — run at this gate, on this path, before the file existed (**AC5**).
  - **The AC6 deliberate-failure run, in an isolated copy and never in the shared tree** (`AGENTS.md` §4 rule 6): change `<span>Adicional noturno 20%</span>` to `<span>Adicional noturno</span>`, run the guard, paste the output into `reports/` — it must read `expected [ 'M3' ] to deeply equal []` and `1 failed`. Restore the copy; do not restore by editing the repository.
  - `pnpm check` clean. Full-suite target after T1 and T2: **63 files / 629 tests passed**, measured at this gate against **62 / 620** before. Every added test is attributed: 4 in T1, 5 here. A different total is a finding to route.
  - Advances **AC1**, **AC2**, **AC4**, **AC5**, **AC6**, **AC7**.

### T3 — Remove the duplicated assertion from the two panel hints — **BLOCKED, do not start**

- **Files:**
  - `components/organisms/journey-form.tsx` (edit — **text only**, lines `:142` and `:157`)
  - `__tests__/journey-form.test.tsx` (edit — `:217`, `:220`, `:222`, `:247` pin the current strings)
- **Depends on:** **T1**, and on **B1** and **B2** in `STATUS.md` being discharged.
- **Blocked on, and it is not the developer's to unblock:**
  - **B1** — `content-writer` delivers the two replacement strings into `copy.md`, under the constraints `legal.md` already fixes: the hint keeps its role as the field's description (`aria-describedby` on both inputs points at it, so it may not become empty), it may not repeat the claim or the citation the slot now carries permanently in the same state (**L7**), and `journey-form.tsx:157`'s second sentence — `legal.md` **DV-3**, whose broad reading Lei nº 8.906/1994 art. 20 §2º falsifies — does not survive in its current form (**C5**).
  - **B2** — the file is **modified and unstaged**, held by `0003` (G7) and `0010` (G5). Before the first keystroke, run `git status --short -- components/organisms/journey-form.tsx` and confirm with the team lead that neither sibling is editing those two strings' text. Lesson **060**: untracked or unstaged means a sibling owns it.
- **What to build:** replace the `hint=` value on the `first-tier-rate` and `extra-tier-rate` `Field`s
  with the strings `copy.md` delivers, **verbatim**. Change nothing else: not the `id`s, not
  `aria-describedby`, not the labels, not the `Input` props, not the panel. The slot from T1 is **not**
  touched — `spec.md` § Out of scope 3 fixes the direction of this remedy in advance.
- **Tests:** update `__tests__/journey-form.test.tsx:217-222` and `:247` to the delivered strings, and
  add one case asserting that with the panel **open** the hint text and
  `#assumed-rate-disclosure`'s text share no sentence — the once-per-state rule, made permanent.
  The exact expected strings arrive with B1; **do not invent them and do not paraphrase the old ones.**
- **Done when:** `pnpm test __tests__/journey-form.test.tsx __tests__/assumed-rate-disclosure.test.tsx`
  green, `pnpm check` clean, and `git diff -- components/organisms/journey-form.tsx` touches **only**
  the two `hint=` string literals. Advances **AC9**, **AC12**.

---

## What G6 measures, and with which predicate

Not a task — written here so `qa-engineer` does not have to invent the thresholds, and so a
mis-prediction is visible as a mis-prediction.

**AC3 — the disclosure is visible without opening anything.** Production build, isolated copy, a port
confirmed free, panel **closed**, both themes, at 390 and 1440. The predicate is a **conjunction with
both bounds**, because a rule that only forbids overflow cannot see an element that collapses inward:

| Clause | Threshold | Status of the number |
|---|---|---|
| `getBoundingClientRect().height` | **> 0**, and `≥ 17.4` px — one `--text-caption` line at a 16 px root | a floor with a measured basis (`design.md` § Tokens) |
| `getBoundingClientRect().height` | expected **208.69** px @390 and **104.34** @1440 | **`product-designer`'s measurement, ±1 px for font-rendering drift. A value outside the band is a finding to route, not a number to adjust and not a reason to stop** (lesson **026**) |
| `getComputedStyle().opacity` | **=== "1"**, and `visibility === "visible"` | measured by `product-designer` |
| border-box **width** vs. M3's paragraph, same run, same viewport, same theme | **Δ = 0.00 px** | `design.md` §9.1, 8/8 cells. This is the ceiling half of the bound: a collapsed element fails it. |
| computed `font-size` and `line-height` vs. M3's | **equal** | `design.md` §9.1 |
| `scrollWidth − clientWidth` on the scrolling ancestor | **0** at 320, 390, 1440, 2560, 3840 | `design.md` § Rendering axes, 10/10 |
| after a full reload with the rates persisted | every clause above holds again | **AC3**'s second half |

**The medida clause is not scored** until `labor-law-analyst` restates it (**F-6**). A `pass` citing it
in its current form is not admissible, and neither is a `fail`.

**No numeric performance criterion exists in this spec**, so the decomposition rule that binds a plan
before it accepts one is vacuous here — stated rather than silently skipped. Nothing this spec adds
runs JavaScript, fetches, or moves a paint: the paragraph is static text in the server-rendered HTML.

---

## Risks

| Risk | Signal it happened |
|---|---|
| The developer ships `design.md`'s markup sketch literally, including `{/* content-writer's string */}` | `pnpm test __tests__/comment-free-code.test.ts` fails with an offender in `components/organisms/day-summary.tsx`. |
| The paragraph is inserted **after** M3 instead of before | `explains the tier rows before the night premium they precede` fails. The existing footer guard would **not** catch it — which is why that case exists. |
| Someone "fixes" the repaired footer assertion back to `previousElementSibling` | It passes, and it is then pinned to whatever happens to be first in the stack — so `0012`'s W1 breaks it again. The three-clause form is the fix; the one-clause form is the defect. |
| A later edit wraps the variable-pay block in an `aria-live` region to "announce the money" | `keeps the assumption out of every live region and out of the tab order` fails. 589 characters re-announced per keystroke is the defect it is there to stop. |
| The string is retyped rather than copied, and a character drifts | `names both tier rates as the app's own assumption` fails on one of the three citation substrings; the rendered length stops being 589. **Copy, do not retype.** |
| `0012` lands between T1 and G6 and a money figure moves | T2's money clause fails with `a money figure moved` on ST-B. That is a **finding about sequencing**, routed to `tech-lead`, never an assertion to update — `0012` owns every figure the tier split moves. |
| T3 is skipped because the slot already ships and the panel is closed by default | `legal.md` §6 **L7** stays breached in the panel-open state, `labor-law-analyst` rejects at G6, and the only route to accepting it is the human. A skipped T3 is a bounce, not a saving. |
| The guard is "consolidated" into `day-summary.test.tsx` at review | **AC5** requires a tracked file of its own, named in `plan.md` against the criterion. Consolidating it deletes the criterion's evidence path. |
