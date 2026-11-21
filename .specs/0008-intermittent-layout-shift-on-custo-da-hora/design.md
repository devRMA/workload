# 0008 — Design

> Owner: product-designer · Gate: `design`

**This gate draws nothing.** `spec.md` § Out of scope forbids a visual redesign of the form column
and `legal.md` §6 O1 mandates no string, so there is no new surface, no new token, no new state and
no new motion here. What a layout-defect spec needs from G3 is the thing the defect is a deviation
*from*: **the intended geometry, measured, stated as a target a diagnosis can be scored against.**
That is §A. §B does the same for the three elements the shift reports at zero size. §C rules on
whether reserving space is the right shape of answer, with the cost in phone pixels. §D freezes the
invariants. The template's own sections follow, and they describe the surface **as it must still
look after the remedy**, which is: exactly as it looks now.

**No cause is named in this document, and none may be read into it** (`spec.md` § Non-goals, lesson
**032**). §A.5 lists arithmetic identities between measured numbers *as candidates an experiment can
discriminate*. A candidate is not a diagnosis. AC3 owes the sentence and the refuting experiment.

---

## References

| Site | Technique borrowed | Why it fits this audience |
|---|---|---|
| — | none | This gate adds no surface. Borrowing a technique would be a visual change, which `spec.md` § Out of scope forbids and which would make the remedy's diff unattributable. |

---

## §A — The intended geometry of the main column

### A.1 How it was measured

`evidence/g3-geometry.mjs` (gitignored, regenerable), run in this session against the branch-alias
preview — the same host `legal.md` §0 and `0004`'s `cls-early-shift.mjs` used. 32 cells:
`{/custo-da-hora, /}` × `{390×844, 1440×900}` × `{dark, light}` × `{storage seeded, storage empty}`,
each loaded twice:

- **`javaScriptEnabled: false`** — the geometry of the server bytes, i.e. **what the first paint is
  supposed to be**. No hydration, no restore, no `motion`, no container-query relayout of a
  restored value.
- **`javaScriptEnabled: true`, sampled at 3500 ms** — **what the settled state is supposed to be**
  once the client has restored `localStorage`.

Boxes are `getBoundingClientRect()` in **document** coordinates (`top + scrollY`), border box.
`getBoundingClientRect()` is not clipped to the viewport; the `layout-shift` source rects in
`spec.md` § Problem **are** — see A.4, which corrects a number `spec.md` carries.

`evidence/g3-firstscreen.mjs` adds the first-screen positions §C prices.

### A.2 `/custo-da-hora` — the two intended states

390×844. **Dark and light returned identical numbers in every cell**, so one column serves both
(invariant **K2**). `docTop` / `height` in CSS px.

| Element | Selector | First paint (server bytes) | Settled, storage empty | Settled, storage seeded |
|---|---|---|---|---|
| `#main-content` | `#main-content` | 0 / 2222.0 | 0 / 2222.0 | 0 / 2027.3 |
| aside (hero), `order-first` | `.lg:col-span-7 + div` | 96.0 / 479.0 | 96.0 / 479.0 | 96.0 / **431.3** |
| **main column** | `.lg:col-span-7` | **607.0 / 1200.7** | 607.0 / 1200.7 | **559.3 / 1053.7** |
| card heading | `.lg:col-span-7 h2` | 632.0 | 632.0 | 584.3 |
| first field label | `label[for="salario-bruto"]` | 799.0 | 799.0 | 751.3 |
| first input | `#salario-bruto` | 824.5 (bottom 880.5) | 824.5 | 776.8 (bottom **832.8**) |
| regime legend | `fieldset legend` | 904.5 | 904.5 | 856.8 |
| **briefcase icon** | `svg.tabler-icon-briefcase` | **905.2 / 16.0**, w 16.0 | 905.2 / 16.0 | 857.6 / 16.0 |
| **regime button** | `button[aria-controls="regime-options"]` | **930.0 / 94.8**, w 308.0 | 930.0 / 94.8 | 882.3 / 94.8 |
| **`DIV.relative`** (hours input wrapper) | `#horas-mensais` parent | **1074.3 / 56.0**, w 308.0 | 1074.3 / 56.0 | 1026.6 / 56.0 |
| document | `scrollHeight` | 2222 | 2222 | 2027 |

1440×900, same four storage/theme conditions:

| Element | First paint | Settled, empty | Settled, seeded |
|---|---|---|---|
| main column | **112.0 / 889.7**, w 733.3 | 112.0 / 889.7 | **112.0 / 763.7** |
| aside (hero) | 112.0 / 547.9, w 514.7 | 112.0 / 547.9 | 112.0 / 522.7 |
| briefcase icon | 355.3 / 16.0 | 355.3 / 16.0 | 355.3 / 16.0 |
| regime button | 380.0 / 77.4, w 667.3 | 380.0 / 77.4 | 380.0 / 77.4 |
| `DIV.relative` | 506.9 / 56.0, w 321.7 | 506.9 / 56.0 | 506.9 / 56.0 |
| `#main-content` | 0 / 1294.2 | 0 / 1294.2 | 0 / 1168.2 |

`/`, under the identical protocol, because `spec.md` S1 is right that the box is one shared file and
`/` is measured rather than waved through:

| Element | 390, first paint | 390, settled (both storage states) | 1440, first paint | 1440, settled |
|---|---|---|---|---|
| main column | 771.4 / 1674.4 | ~~**771.4** / 1534.0~~ | 112.0 / 1110.8 | ~~**112.0** / 970.4~~ |
| aside (hero) | 96.0 / 643.4 | 96.0 / 643.4 | 112.0 / 699.4 | 112.0 / 699.4 |

> **The two struck cells are corrected in A.3.1 (blocker B5).** Re-measured, `/`'s settled column is
> **771.39 / 1640.36** at 390 and **112.00 / 1076.75** at 1440 with nothing in storage, and
> **771.39 / 2114.36** and **112.00 / 1404.75** under `plan.md` D1's journey seed. The two
> **first-paint** cells in this row reproduce exactly and stand. The parenthetical *"both storage
> states"* is what went wrong: the two storage states measured here were `empty` and the **salary**
> seed, which D1/D2 have since shown are the same state on this route.

### A.3 The two targets, stated

**Target 1 — first paint, every route, every viewport, every theme, every storage state.** The
column is at `607.0 / 1200.7` (390) and `112.0 / 889.7` (1440) on `/custo-da-hora`; `771.4 / 1674.4`
and `112.0 / 1110.8` on `/`. This is the geometry of the server bytes with scripting off, and it is
**storage-independent by construction** — the server does not know `localStorage` and must not
(`PRODUCT.md` §5, `legal.md` §1.2). It is also theme-independent, measured.

**Target 2 — settled, after the client restores.** The column is permitted to change by exactly two
things between Target 1 and Target 2, and by nothing else:

| Permitted change | 390 | 1440 | What it is |
|---|---|---|---|
| The column's **top** moves up by the hero's own resize when the restored salary shortens the numeral | **−47.7 px** | **0 px** (grid, `items-start`) | `0004` `design.md` **I7**, accepted, ceiling 60.4 px at 390. Measured here at 47.7 against I7's recorded 47.6 for `month`. |
| The column's **height** shrinks when the restored data makes one `AlertBanner` unnecessary | **−147.0 px** | **−126.0 px** | The DS3 banner (123 px at 390) plus its `mb-6` (24 px). The DS5 banner stays, because the seed sets no `monthlyHours`. |

**On both routes, at ≥1024, the column's top is 112.0 in every one of the sixteen cells** —
invariant **K3**. On `/` the column's top does not move at all at any viewport, in any cell, under
any seed: **771.39** at 390 and **112.0** at 1024 and 1440, Target 1 and Target 2 alike.

Anything else the column does is outside the design. That sentence is the target AC3's diagnosis and
AC4/AC5's re-measurement are scored against.

#### A.3.1 `/`'s Target 2, corrected — B5

> **Corrected at G5 run 2 (blocker B5), by re-measurement, not by transcription.** This section
> predicted `Δ = 0 / −140.4` for `/` at both viewports. That prediction was read under the
> **salary** seed, which `plan.md` **D1/D2** have since relabelled `partial seed` for `/`: not one
> key `hooks/use-work-calculator.ts` reads is in it, so the cell it produced is the **empty** state
> under another name. Under D1's **journey** seed the column does not shrink — it **grows**, and the
> empty cell does not equal Target 1 either. `/custo-da-hora`'s rows in §A.2/§A.3 are **not** touched
> by this correction.

Measured on the artifact and by the protocol named in **A.3.2**. `/`, column `.lg:col-span-7`,
document coordinates, border box. Dark and light returned identical numbers in every cell, so one
column serves both (**K2** holds on `/` too):

| `/` cell | Target 1 (server bytes, JS off) | Target 2 (settled, 3500 ms) | **Δ (top / height)** |
|---|---|---|---|
| **journey seed**, 390×844 | 771.39 / 1674.36 | 771.39 / **2114.36** | **0 / +440.00** |
| **journey seed**, 1024×768 | 112.00 / 1110.75 | 112.00 / **1446.75** | **0 / +336.00** |
| **journey seed**, 1440×900 | 112.00 / 1110.75 | 112.00 / **1404.75** | **0 / +294.00** |
| **empty**, 390×844 | 771.39 / 1674.36 | 771.39 / **1640.36** | **0 / −34.00** |
| **empty**, 1024×768 | 112.00 / 1110.75 | 112.00 / **1076.75** | **0 / −34.00** |
| **empty**, 1440×900 | 112.00 / 1110.75 | 112.00 / **1076.75** | **0 / −34.00** |
| **partial (salary) seed**, all three | identical to `empty` | identical to `empty` | **0 / −34.00** |

Four things this table settles, each of them a measured fact and none of them a cause:

1. **`/`'s Target 1 is unchanged and reproduces §A.2 exactly** — `771.39 / 1674.36` at 390 and
   `112.0 / 1110.75` at 1440, against §A.2's `771.4 / 1674.4` and `112.0 / 1110.8`. So the stale
   half of §A.3 was **Target 2 only**, and `/`'s server geometry is not implicated.
2. **The `/` seeded delta is a growth, and the routed figure for 1440 was one viewport's number
   applied to two.** The brief that reached this gate read *"+336.0 at 1024/1440"*. Measured,
   **1024 is +336.00 and 1440 is +294.00**, `n = 3` per viewport per theme, deterministic to the
   hundredth on all 18 replications. The two differ because the column's own width differs —
   **546.66** at 1024 against **733.33** at 1440 — so the restored day's content wraps to fewer line
   boxes at the wider column. Target 1 hides this, because with scripting off the column holds no
   restored content and measures **1110.75** at both.
3. **`plan.md` D1 is confirmed on the geometry, not only on the key list.** The salary seed and the
   empty state return the **same** column box on `/` in every one of the six cells. An axis whose two
   sides are the same state cannot discriminate, which is exactly what D1 says.
4. **The empty cell does not equal Target 1 on `/`, and does on `/custo-da-hora`.** `/` settles
   **34.00 px shorter** than its own server paint with nothing in storage, at all three viewports and
   in both themes. §A.3's Target 2 permits the column **two** changes and this is neither of them, so
   **it is a third permitted change or it is a finding, and this gate does not get to choose which**
   — naming a cause is forbidden here (`spec.md` § Non-goals, lesson **032**). It is handed to
   `tech-lead` in A.3.3 as a quantity, with the experiment that would discriminate it.

**What does not move.** The column's **top** on `/` is `0` delta in **all 36 measured `/` rows** (3 seeds × 3 viewports ×
2 themes × 2 targets), so **K3 holds
unchanged** and §A.4's restatement of the defect frame — a column **523 px too high** and **568.7 px
too short** against Target 1 — is untouched: every number in it is a `/custo-da-hora` number read
against `/custo-da-hora`'s Target 1, and none of it is derived from a `/` cell.

#### A.3.2 The artifact and the protocol A.3.1 was read on

`AGENTS.md` §4 rule 6 and §5. Not the shared checkout, not the shared `.next`, not `next dev`, and
not a number transcribed from the routing note.

- **Copy:** `rsync` of the working tree minus `node_modules`, `.next` and `.git`, into this session's
  own scratchpad; `node_modules` hard-linked with `cp -al`; `rm -rf .next`; `pnpm build` with
  `playwright.config.ts`'s three `NEXT_PUBLIC_*` values; `next start` on **port 3417**, confirmed
  free with `ss -ltn` before binding. A sibling session's `next-server` was holding **3100** and was
  left alone. `uptime` at launch: load average **4.00–6.05** on **16** cores.
- **Why the working tree and not `5c0c6fa`:** `/`'s geometry has to be read on the tree the developer
  is running against. It is also the stronger control here — `0007`'s uncommitted work is in this
  tree, and `/`'s Target 1 still reproduces §A.2 to the hundredth, which is the evidence that
  **`0007` moves nothing on `/`**. On the same build `/custo-da-hora`'s column measures **1347.13**
  at 390 against §A.2's **1200.7**: `+146.43`, which is `0007` § 15.6's `+146.39` D4 slot plus its
  field, not a `/` phenomenon and not a regression. §A.2's `/custo-da-hora` rows are readings of the
  **pre-`0007`** artifact and every later gate must say which artifact it is quoting.
- **Browser:** Chromium 1.63.0. 390×844 at `deviceScaleFactor: 2`, `isMobile: true`, `hasTouch: true`;
  1024×768 and 1440×900 at `deviceScaleFactor: 1`. `colorScheme` set explicitly per context.
- **Target 1** is `javaScriptEnabled: false`, `waitUntil: "load"`, 800 ms settle. **Target 2** is
  `javaScriptEnabled: true` with the seed written by `addInitScript` before the first paint, sampled
  at **3500 ms** — `plan.md` T4(b)'s sampling point.
- **Quantity:** `getBoundingClientRect().top + window.scrollY` and `.height`, **border box**, read
  directly on a state loaded on purpose. **No geometry here comes from a `layout-shift` source rect**
  — those are clipped to the viewport and carry no target (§A.4, `AGENTS.md` §5).
- **Vacuity guard, evaluated on every load:** `document.querySelectorAll(".lg\:col-span-7").length`
  **expected exactly 1**, printed per row; it returned **1** on all 72 rows. Zero is never a pass.
- **Replication:** the three `/` journey-seed Target 2 cells were re-run at `n = 3` per theme, 18
  loads, all identical to the hundredth of a pixel.

#### A.3.3 What A.3.1 hands to `tech-lead`

| Quantity | Value | What it is for |
|---|---|---|
| `/` seeded `(Δtop, Δheight)`, journey seed | `(0, +440.00)` at 390; `(0, +336.00)` at 1024; `(0, +294.00)` at 1440 | The per-cell exemption `plan.md` §1.2 recommends to **AC5**. Three viewports, three different numbers — the exemption cannot be one constant |
| `/` empty `(Δtop, Δheight)` | `(0, −34.00)` at all three viewports, both themes | The same, for the empty column. **`/`'s empty cell is not `(0, 0)`**, unlike `/custo-da-hora`'s, so an AC5 clause written as *"the empty cell equals Target 1"* fails on a build with no defect (lesson **040**) |
| `/` column `top` | `771.39` at 390, `112.00` at 1024 and 1440, in **all 36 measured `/` rows** | **K3**, unchanged, now measured on `/` under both seeds |
| The 34.00 px | Unexplained here, by design | Neither of the two changes §A.3 permits. The discriminating experiment is `plan.md` **T5 F** with the census printed per load: load `/` empty at 390 twice — `javaScriptEnabled: false`, then settled — and diff the node census, not the CLS log. If a node present in the server paint is absent at 3500 ms, the 34.00 is a mount difference; if the census matches, it is a reflow. **No cause is named at this gate** |
| Artifact discipline | §A.2's `/custo-da-hora` rows are pre-`0007`; §A.3.1's `/` rows are the delivered tree | Any gate comparing the two is comparing two artifacts, and `/custo-da-hora`'s column is **+146.43** taller on the later one for a reason that belongs to another spec |

### A.4 The defect frame, stated as a delta from Target 1 — and a correction

`spec.md` § Problem reads the shift as *"loses 383 px of height (632 → 249) and moves 511 px down
(top 84 → 595)"*. **The height half of that reading is an artifact of the instrument**, and the
correction changes what a diagnosis has to explain.

`layout-shift` source rects are clipped to the viewport; `getBoundingClientRect()` is not. Three
independent rows in `0004`'s `evidence/cls-early-shift.txt` have `top + height = 844` **exactly** —
the viewport height:

- `cur=595,249` → 844
- `cur=547,297` → 844 (the deterministic I7 event, 6/6 loads)
- `prev=595,249` → 844

So `595,249` is not a 249 px column. It is the intended column — `607.0 / 1200.7`, minus the 12 px
`PANEL_TRANSITION` `y` offset — clipped at the fold. **`cur` is the correct state.** And `prev`
(`84,632`, bottom 716, *below* the fold and therefore unclipped) is the anomalous one.

Restated against Target 1, at 390:

| Quantity | Target 1 | Anomalous frame (`prev`) | Delta |
|---|---|---|---|
| column `top` | 607.0 | 84 | **523 px too high** |
| column `height` | 1200.7 | 632 | **568.7 px too short** |
| column `bottom` | 1807.7 (past the fold) | 716 | ends 128 px **above** the fold |
| briefcase icon | 16.0 × 16.0 | 0 × 0 | absent from layout |
| regime button | 94.8 × 308.0 | 0 × 0 | absent from layout |
| `DIV.relative` | 56.0 × 308.0 | 0 × 0 | absent from layout |

**Two consequences for downstream gates, both routed to `tech-lead`:**

1. **The diagnosis must explain the `prev` frame, not the `cur` frame.** A remedy that changes what
   the column looks like at `cur` is changing the correct state.
2. **AC5 will print numbers that look nothing like `spec.md`'s.** It samples
   `getBoundingClientRect()`, which is unclipped, so a healthy `/custo-da-hora` at 390 reads
   `top 607.0 → 559.3`, `height 1200.7 → 1053.7`. A reviewer comparing those to `632`/`249` would
   read a regression. AC5's ≤ 1 px clause also cannot be met literally by the *correct* build,
   whose permitted −47.7 px and −147.0 px are in A.3 — the I7 exemption AC5 already carries covers
   the `top`; **the `height` side has no exemption written and needs one**, or AC5 fails on a build
   with no defect (lesson **040**). This is a `tech-lead` item at G4, not a design change.

### A.5 Arithmetic identities between the measured numbers — candidates, not causes

Recorded because a target is only useful if it can be differenced, and withheld from any conclusion
because more than one arrangement produces each number.

- `607.0 − 479.0 − 32 = 96.0`, and `96.0 − 12 = 84`. The column's anomalous top equals the top it
  would have if the aside contributed no height, offset by `PANEL_TRANSITION`'s `y: 12`. At least
  two distinct arrangements yield that number, and this gate distinguishes none of them.
- `1200.7 − 632 = 568.7`, while the three zero-size boxes sum to `16.0 + 94.8 + 56.0 = 166.8`.
  **The collapse of the three reported children accounts for at most 29 % of the missing height**,
  and they are nested inside a card whose own box is not among the sources — so "the three children
  collapsed" is, by itself, insufficient by 401.9 px. This is the one thing §A can refute for free,
  and it is a refutation, not a cause.
- The anomalous frame is 568.7 px shorter than Target 1 and 421.7 px shorter than Target 2
  (`1053.7`). It matches neither. A diagnosis that explains only the seeded settled state does not
  explain it.

---

## §B — The three elements reported at zero size

Every one of the three is **present at full size in the server bytes, with scripting disabled**, at
both viewports, in both themes, in both storage states. None has a legitimate zero state anywhere in
this design, at any paint, ever. That is the whole of §B, and it is measured rather than argued.

| Element | Where it lives | Intended box, 390 | Intended box, 1440 | Set by | From which paint |
|---|---|---|---|---|---|
| `svg.tabler-icon-briefcase` | `components/molecules/regime-field.tsx:29`, inside `<legend>` | **16.0 × 16.0** | 16.0 × 16.0 | `w-4 h-4` — a fixed 16 px box, viewport- and theme-independent | **the first paint.** Present in the server HTML (`legal.md` §1.2 confirms `Regime de Trabalho` renders server-side on both hosts) |
| `button[aria-controls="regime-options"]` | `regime-field.tsx:32-56` | **94.8 × 308.0** | **77.4 × 667.3** | `p-4` (16 px each side) over two stacked text lines: `font-semibold text-ink` + `text-caption text-ink-subtle`. The 17.4 px difference between viewports is the summary line wrapping to two lines at 308 px and one at 667.3 px — content-driven, not a breakpoint | **the first paint** |
| `DIV.relative` (the `Input` wrapper for `#horas-mensais`) | `components/atoms/input.tsx:11` | **56.0 × 308.0** | **56.0 × 321.7** | `h-14` — **56 px at every viewport, every theme, every state**, the single most invariant box on the page | **the first paint** |

**The rule this fixes for every downstream gate:** these three elements are sized by a fixed utility
(`w-4 h-4`, `h-14`) or by text the server already sent. There is no state in this design — not
loading, not empty, not error, not pre-hydration, not reduced-motion — in which any of them has a
zero box. A frame that contains one is a frame outside the design, and a remedy that makes the zero
box *stable* rather than *absent* has not fixed anything (this is `spec.md` AC5's point, and
`legal.md` §5.3's).

---

## §C — Is reserving space the right shape of answer?

**Ruling: no. Not on the column, not on the aside, not at any viewport.** Three grounds, in
descending order of how hard they are to argue with.

### C.1 There is nothing to reserve

Reserved space pays for a box whose content arrives after the box is laid out. That is not this
shape. **The intended geometry is fully determined by the server bytes**: with scripting disabled,
the column, the regime button, the input wrapper and the icon are all already at their final
position and size, in all sixteen `/custo-da-hora` cells (§A.2, §B). The box is *correct first* and
becomes wrong afterwards. A reservation would add a second wrong box on top of a first one that was
right, and it would spend permanent phone height to do it.

`0004` G3 rejected a ~60 px hero reservation for a deterministic event 2–10× **under** the 0.1
threshold (`0004` `design.md` §A.3). The same reasoning applies here with more force, not less: this
event fires in 5/20 loads of **one** cell (`STATUS.md`, `0004` T1/X6) and 0/20 in the other three,
and the reservation needed would be larger.

### C.2 The displacement is not the column's to reserve

523 of the anomalous frame's 568.7 + 523 px of error sit **above** the column. A `min-height` on
`.lg:col-span-7` constrains the column's height; it cannot hold the column's **top**, which is set
by the aside stacked above it under `order-first` at 390. Only a reservation on the *aside* could,
and the aside is already correct at first paint (`96.0 / 479.0`, every cell). Reserving on the aside
would additionally put `0004`'s **I1, I3, I5 and I7** back in play — the container-query numeral, the
theme-invariant fill, the single declared transition, and the accepted CLS ceiling — for a box that
was never wrong.

At 1440 there is nothing to reserve at all: the column's top is `112.0` in all sixteen cells and
never moves (**K3**).

### C.3 The price, in phone pixels

390×844. The fold is at 844.

| Quantity | Storage empty | Storage seeded (the audience `spec.md` names) |
|---|---|---|
| Header + hero above the column | 607.0 px = **71.9 %** of the viewport | 559.3 px = **66.3 %** |
| Column visible on the first screen | 237.0 px = **28.1 %** | 284.7 px = **33.7 %** |
| First input (`#salario-bruto`) | top 824.5, bottom **880.5** — 36.5 px **below** the fold | top 776.8, bottom **832.8** |
| **Slack before the first complete control leaves the first screen** | **none — there is already no complete control on the first screen** | **11.2 px** |

So the budget for reserving space at 390 is **11.2 px in the best state and negative in the other**.
Any reservation of 12 px or more takes the only complete input control off the first mobile screen
of the page that answers `PRODUCT.md` §1 question 3. A reservation large enough to matter — tens or
hundreds of px — is not a trade-off, it is a different, worse defect.

And it compounds a problem being opened elsewhere right now: every disclosure surface on both routes
is already below the fold at 390, the nearest at `vtop` **1245.5**, 401 px past the last visible row
(`legal.md` §5.2, measured). Reserved height pushes every one of them further away. `legal.md` §5.4
declines to attach a legal veto to that and hands the pixel budget to the product; this is the
product's answer, and it is no.

### C.4 What the right shape is, is not this gate's to say

That is AC3's, earned by an experiment. What this gate does hand the diagnosis is the target: **the
column's box must equal Target 1 at every frame until the restore, and Target 2 from the restore
onward, with no permitted change other than the two in §A.3.** A remedy is right when the difference
between those two states is the only difference a probe can find.

---

## §D — Invariants

`0004` G3 froze **I1–I8**. This gate does not renumber them and adds its own in a separate
namespace, **K1–K6**, so a reader can always tell which spec bought which.

### D.1 Which of `0004`'s I1–I8 bind here

| # | Binds? | Why |
|---|---|---|
| **I1** numeral on `--text-numeral`, the only step above 2rem | **only if a remedy touches the aside** | §C.2 — an aside-side reservation re-opens it. No remedy bounded to the column touches it. |
| **I2** numeral carries `numeric` | only if a remedy touches the aside | same |
| **I3** hero fill/ink theme-invariant | only if a remedy touches the aside | same. **K2** generalises the property to the whole column. |
| **I5** the hero's only declared transition is `transition-[background-color] duration-(--duration-slow) ease-standard` | only if a remedy touches the aside | A remedy that broadens it to `transition-all` would tween the numeral. |
| **I4** 1024 is the tightest hero container in the range (285.3 px, tighter than 390's 294) | **yes, directly** | It is why `spec.md` AC1 carries a 1024 axis. Any remedy touching the 7/5 split must be re-measured at 1024, not only at 390. |
| **I6** eight-step spacing; **the `--spacing-*` namespace stays empty** | **yes, directly** | Every gap in §A.2 is eight-step: `gap-8` (32), `space-y-8` (32), `p-6`/`p-8` (24/32), `mb-6` (24), `mb-8` (32), `space-y-2` (8). A remedy that reaches its number with a non-scale value breaks the ramp; one that adds a named `--spacing-*` key silently redefines a container-scale entry. |
| **I7** the hero swap's cost — `/` 0.0000; `/custo-da-hora` 0.0099 / **0.0481** / 0.0544 | **yes, directly** | `spec.md` AC8. Independently re-measured here as **−47.7 px** at 390 for `month` against I7's recorded 47.6 — I7 stands, unraised. |
| **I8** `AlertBanner` chrome ≤ 32 px; **no fourth root-size step above 18px** | **yes, directly** | The remedy's most likely accidental breakage. The two `AlertBanner`s in this column are DS3 (123 px tall at 390, 308 px wide) and DS5; a root-size step would push the atom over budget with nobody editing the atom. |

### D.2 New invariants, this spec

| # | Invariant | Measured as | Why it is at risk here |
|---|---|---|---|
| **K1** | **The intended geometry is the server-paint geometry.** At 390 and 1440, both themes, both storage states, the column, the regime button, the `DIV.relative` input wrapper and the briefcase icon render at their final size and position in the server bytes with scripting disabled. **No element in this subtree has a legitimate zero box in any state.** | `evidence/g3-geometry.mjs`, `javaScriptEnabled: false`, the table in §A.2 and §B | It is the clause that makes "the shift is absent, not concealed" checkable against something other than a score. |
| **K2** | **Theme is geometrically inert.** Every box in §A.2 is identical in dark and light, in all 32 cells. A remedy that makes any of these numbers theme-dependent is a regression. | same probe, `colorScheme: "dark" \| "light"` | It is also what makes AC1's light axis a check on *the remedy* rather than on the layout, which is worth knowing before 640 throttled loads are budgeted. |
| **K3** | **At ≥1024 the main column's top never moves.** `112.0` in all sixteen `lg:` cells, both routes, both storage states, both themes. All displacement lives at 390, where `order-first` stacks the aside above the column. | same probe | A remedy that "stabilises" the column by constraining it at desktop is fixing a viewport that has no defect, and `spec.md` AC9 would not see the cost. |
| **K4** | **No reserved height on the main column or on the aside, at any viewport.** No `min-h-*`, no fixed `height`, no `aspect-ratio` used as a spacer, no invisible placeholder occupying flow. | §C; the 11.2 px first-screen slack at 390 | It is the remedy a downstream gate reaches for first, and `spec.md` § Non-goals already forbids the blanket `min-height` by name. This extends it to the aside, which that bullet does not cover. |
| **K5** | **No skeleton, shimmer, placeholder, `aria-busy`, opacity ramp or mount animation anywhere inside `#main-content`'s paint path.** `0004` A.3 rejected it for the hero on its own design merit; this extends the same ruling from the hero to the column. | a reviewer reads the diff | It converts a visible shift into a hidden one and satisfies CLS without helping anyone (`legal.md` §5.3: CLS cannot see concealment; §2.2: it cannot see disclosure displacement either, in either direction). |
| **K6** | **Every `motion` subtree in this path stays inside the `MotionConfig reducedMotion="user"` provider** at `components/templates/theme-provider.tsx:10`. It is what gives `PANEL_TRANSITION` and `CollapsiblePanel` their reduced path; the CSS reset at `app/globals.css:303-315` overrides `transition-*` only and does not reach `motion`'s per-frame inline styles. | `grep -rn "MotionConfig\|reducedMotion" app components lib hooks` → one match, `theme-provider.tsx:10` | A remedy that renders a `motion` element through a portal or above the provider loses the reduced path silently, and no jsdom test would see it (`AGENTS.md` §8). |

**K1, K2 and K3 re-run over the members A.3.1 admitted (B5).** Widening a domain is a re-execution,
not a membership operation (`AGENTS.md` §5), so all three were run against the cells the journey seed
and the 1024 viewport added, and each green one is green for a stated reason:

- **K1 — holds, and is the clause that carried the correction.** `/`'s server paint is
  `771.39 / 1674.36` at 390 and `112.00 / 1110.75` at 1024 and 1440, identical under all three seeds
  because `addInitScript` cannot reach a context with scripting disabled. That is the premise this
  invariant was always resting on, and it is now stated rather than assumed.
- **K2 — holds on every new member.** Dark and light were compared cell by cell across all 72 rows
  and differ nowhere, including the six new journey-seed cells. Green because theme changes colour
  tokens only; no token in `app/globals.css` used on this path carries a length.
- **K3 — holds, and its sample grew from sixteen `lg:` cells to forty-eight.** `112.00` in every one:
  2 routes × {1024, 1440} × 2 themes × 3 seeds × 2 targets. The thirty-two new cells are the 1024
  viewport and the journey seed, neither of which existed when K3 was written. Green because at `lg` the aside is a
  side column (`components/templates/calculator-layout.tsx:16-20`) and `items-start` on the grid
  decouples the two columns' heights — the premise that makes the whole displacement a 390-only
  phenomenon.

**Residual, routed to `tech-lead`, not a blocker:** `reducedMotion="user"` suppresses transform and
layout animations; `CollapsiblePanel` animates `height: 0 → auto` as an explicit value
(`components/atoms/collapsible-panel.tsx:18-20`), which that setting does not suppress. It is
pre-existing, it is outside this spec's defect, and it is recorded so it is not discovered as new.

---

## Hierarchy

Unchanged. Stated because a remedy must not alter it, and `PRODUCT.md` §5's ten seconds are measured
against it. On `/custo-da-hora` at 390, first two seconds:

- **1s** — the hero numeral. `--text-numeral`, 87.36 px at 390 (`0004` I1), white on
  `--color-negative-deep`, the top 66–72 % of the first screen. It is the answer to *"quanto cai na
  minha conta?"* and it is the only thing the eye can land on above the fold.
- **5s** — the column's card heading and its first field. `--text-title` at `docTop` 584.3 (seeded),
  then `#salario-bruto` at 776.8. In the seeded state the eye travels from the answer to the input
  that produced it without a scroll; in the empty state it must scroll 36.5 px to see the whole
  field, which is the fold problem §C.3 prices and not this spec's to fix.
- **30s** — the regime field (`docTop` 857.6), the remaining inputs, the collapsible tax detail, and
  the footer disclosures at `vtop` 1855.7 → 2123.2.

---

## Layout

### 390 (the design target)

Single column. `#main-content` has `pt-[calc(var(--header-height)+var(--spacing)*8)]`
(`--header-height` 4rem + 8 × `--spacing` = 96 px), `px-4`, `pb-16`. The grid is
`grid-cols-1 gap-8`; the aside carries `order-first`, so the hero stacks **above** the column. The
column is `w-full` inside `max-w-app` (`--container-app` 80rem, not binding at 390), measured width
**358.0 px** (390 − 2 × `px-4`).

### 1440

`lg:grid-cols-12`, column `lg:col-span-7` (733.3 px), aside `lg:col-span-5` (514.7 px) with
`lg:order-none` and `lg:sticky lg:top-[calc(var(--header-height)+var(--spacing)*8)]`. `items-start`
on the grid is what pins both tops to **112.0** and what makes **K3** true. `px-8`,
`--header-height` 5rem above 48rem.

### 2560 and 3840

`--container-app` becomes 100rem at `min-width: 120rem` and the root steps to 106.25 % (2560) and
112.5 % (3840) — `app/globals.css:210-224`. **Both 2560 and 3840 resolve the 160rem step**, because a
length in a media *feature* resolves against the initial root size and `160rem = 2560px` exactly
(lesson **028**): at a viewport of exactly 2560 both queries match and the later rule wins. So the
root is 18 px at both, and the 7/5 split is proportionally identical to 1440. **Nothing in this spec
changes at either**, and **I8**'s no-fourth-root-step rule is what keeps that true.

### Reflow

The only reflow is the `lg:` breakpoint, where `order-first` stops applying and the hero moves from
above the column to beside it. That single line is the entire difference between a route whose
column top moves (390) and one whose column top is nailed to 112.0 (≥1024). A remedy must not move
that boundary.

**No horizontal overflow and no control off-viewport at 320, 390, 1024, 1440, 2560 or 3840** —
unchanged by this gate, and `spec.md` AC9 re-measures it after the remedy.

---

## Components

Nothing is created, extended or removed. The table names every component in the implicated subtree
at its atomic level so the plan can reuse by path rather than by memory.

| Component | Level | Status | Path |
|---|---|---|---|
| `CalculatorLayout` (the `lg:col-span-7` box) | template | **reuse, unmodified** | `components/templates/calculator-layout.tsx` |
| `CalculatorViews` (`#main-content`, `AnimatePresence`, the footer) | organism | reuse, unmodified | `components/organisms/calculator-views.tsx` |
| `SalaryCalculator` | organism | reuse, unmodified | `components/organisms/salary-calculator.tsx` |
| `WorkCalculator` | organism | reuse, unmodified | `components/organisms/work-calculator.tsx` |
| `TaxDetailsPanel` | organism | reuse, unmodified | `components/organisms/tax-details-panel.tsx` |
| `DaySummary` | organism | reuse, unmodified | `components/organisms/day-summary.tsx` |
| `JourneyForm` | organism | reuse, unmodified | `components/organisms/journey-form.tsx` |
| `HeroPanel` (the aside) | organism | reuse, **unmodified — §C.2** | `components/organisms/hero-panel.tsx` |
| `RegimeField` (the legend, the icon, the button) | molecule | reuse, unmodified | `components/molecules/regime-field.tsx` |
| `Field` | molecule | reuse, unmodified | `components/molecules/field.tsx` |
| `CurrencyInput` | molecule | reuse, unmodified | `components/molecules/currency-input.tsx` |
| `DurationField` | molecule | reuse, unmodified | `components/molecules/duration-field.tsx` |
| `PeriodSelector` | molecule | reuse, unmodified (the `p-1.5`/`gap-1` inset is `0004` D4 and is **not** scoped) | `components/molecules/period-selector.tsx` |
| `Input` (the `DIV.relative`) | atom | reuse, unmodified | `components/atoms/input.tsx` |
| `AlertBanner` (DS3, DS5, DS6) | atom | reuse, unmodified | `components/atoms/alert-banner.tsx` |
| `CollapsiblePanel` | atom | reuse, unmodified | `components/atoms/collapsible-panel.tsx` |
| `Label` / `labelClasses` (the `<legend>`) | atom | reuse, unmodified | `components/atoms/label.tsx` |
| `StatBox` | atom | reuse, unmodified | `components/atoms/stat-box.tsx` |
| `ThemeProvider` (`MotionConfig reducedMotion="user"`, **K6**) | template | reuse, unmodified | `components/templates/theme-provider.tsx` |

**`new`: none.** A remedy that needs a component this table does not name is a bounce to
`tech-lead` under `spec.md` § Scope item 5, not a design decision.

---

## Tokens

Every token below is declared in `app/globals.css` and is **already in use on these elements**. The
table exists so the plan can assert that none of them moves. No token is added, removed or
redefined; see § System change.

### The shifting box — `components/templates/calculator-layout.tsx:14-20`

| Use | Token / utility | Value | Dark | Light |
|---|---|---|---|---|
| container cap | `--container-app` (`max-w-app`) | 80rem → 100rem at `min-width: 120rem` | same | same |
| grid gutter | `gap-8` = 8 × `--spacing` | 32 px | same | same |
| column stack rhythm | `space-y-8` = 8 × `--spacing` | 32 px | same | same |
| sticky offset | `--header-height` + 8 × `--spacing` | 64+32 px; 80+32 above 48rem | same | same |
| `#main-content` top pad | `--header-height` + 8 × `--spacing` | as above | same | same |
| page fill | `--color-canvas` | `oklch(0.984 0.003 264)` / `oklch(0.178 0.01 264)` | `#0f1116` | `#f9fafc` |

### The card — `components/organisms/salary-calculator.tsx:73`

| Use | Token / utility | Dark | Light |
|---|---|---|---|
| fill | `--color-surface` | `#181b21` | `#ffffff` |
| hairline | `--color-line` | `#2b2e35` | `#e0e2e6` |
| radius | `--radius-xl` (`rounded-xl`) | 1.75rem | 1.75rem |
| elevation | `--shadow-card` | `none` (dark drops the card shadow by design) | `0 1px 2px … , 0 8px 24px -16px …` |
| padding | `p-6 sm:p-8` = 6/8 × `--spacing` | 24 / 32 px | same |
| heading | `--text-title` (1.5rem / 1.25 / −0.01em / 600) | `--color-ink` | `--color-ink` |
| heading support | `--text-body-sm` (0.875rem / 1.5 / 400) | `--color-ink-muted` | `--color-ink-muted` |

### The regime button — `components/molecules/regime-field.tsx:32-56`

| Use | Token / utility | Dark | Light |
|---|---|---|---|
| fill | `--color-surface` | `#181b21` | `#ffffff` |
| border, rest | `--color-line-strong` | `#6a707a` | `#888c95` |
| border, hover | `--color-ink-subtle` | `#898e98` | `#696f79` |
| radius | `--radius-md` (`rounded-md`) | 1rem | 1rem |
| padding | `p-4` = 4 × `--spacing` | 16 px | same |
| inner gap | `gap-4` / `gap-0.5` / `gap-2` | 16 / 2 / 8 px | same |
| selected label | `--text-body` at `--font-weight-semibold`, `--color-ink` | `#f2f3f6` | `#1e232c` |
| selected summary | `--text-caption`, `--color-ink-subtle` | `#898e98` | `#696f79` |
| action word + chevron | `--text-label`, `--color-accent-ink` | `#91b6f9` | `#1f57c7` |
| focus ring | `ring-focus` → `--color-focus` | `= --color-accent-ink` | `= --color-accent` |
| transition | `transition-[border-color] duration-(--duration-fast) ease-standard` | 160 ms, `cubic-bezier(0.4, 0, 0.2, 1)` | same |

### The `<legend>` and the briefcase icon — `regime-field.tsx:28-31`

| Use | Token / utility | Dark | Light |
|---|---|---|---|
| type | `labelClasses` → `--text-label` | — | — |
| ink (icon inherits `currentColor`) | `--color-ink-muted`, via `labelClasses` at `components/atoms/label.tsx:4` | `#a6abb5` — `lab(69.77 −0.40 −6.00)` | `#5f656f` — `lab(42.50 −0.37 −6.71)` |
| icon box | `w-4 h-4` | 16 × 16 px, theme- and viewport-invariant | same |
| stack gap | `space-y-2` = 2 × `--spacing` | 8 px | same |

### The `DIV.relative` input wrapper — `components/atoms/input.tsx:11-24`

| Use | Token / utility | Dark | Light |
|---|---|---|---|
| height | `h-14` | **56 px, every viewport, every theme, every state** | same |
| fill | `--color-surface` | `#181b21` | `#ffffff` |
| border, rest | `--color-line-strong` | `#6a707a` | `#888c95` |
| border, hover | `--color-ink-subtle` | `#898e98` | `#696f79` |
| border, focus | `--color-accent` (`focus-visible:border-accent`) | `#2a62d1` | `#2a62d1` |
| border, invalid | `--color-negative`; fill `--color-negative-soft` | `#ee5955` / `#3c1d24` | `#ca262e` / `#faebec` |
| radius | `--radius-md` | 1rem | 1rem |
| type | `--text-input` (1.125rem / 1.25 / 500) + `numeric` | `--color-ink` | `--color-ink` |
| placeholder | `--color-ink-subtle` | `#898e98` | `#696f79` |
| padding | `px-4`, `pl-12` with an icon | 16 / 48 px | same |
| disabled | `--color-surface-sunken`, `--color-line`, `opacity-60` | `#13161b` / `#2b2e35` | `#f2f4f7` / `#e0e2e6` |
| transition | `transition-[border-color] duration-(--duration-fast) ease-standard` | 160 ms | same |

### The `AlertBanner`s in this column — `components/atoms/alert-banner.tsx:18-37`

DS3 and DS5 are `tone="danger"`; DS6 is the same atom. Measured 123 × 308 (DS3, DS5) and 185 × 308
(DS6) at 390.

| Use | Token / utility | Dark | Light |
|---|---|---|---|
| fill | `--color-negative-soft` | `#3c1d24` | `#faebec` |
| border | `--color-negative` at 30 % | `#ee5955` / 30 % | `#ca262e` / 30 % |
| ink | `--color-negative-ink` | `#f98078` | `#bf2029` |
| radius | `--radius-lg` (`rounded-lg`) | 1.25rem | 1.25rem |
| padding | `px-3 py-4` = 3/4 × `--spacing` | 12 / 16 px | same |
| type | `--text-body-sm` (0.875rem / 1.5 / 400), title at `--font-weight-semibold` | — | — |
| icon | `h-5 w-5` + `mt-0.5`, gap `gap-3` | 20 px, 2 px, 12 px | same |
| stack | `space-y-1`; outer `mb-6` at the call site | 4 px; 24 px | same |
| chrome budget | **I8**: border + horizontal padding ≤ 32 px — 26 px at a 16 px root, 29 px at 18 px | same | same |

---

## States

Every interactive element in the implicated subtree, all eight states plus the live-updating one.
**Where a state has no distinct treatment, that is a specification and not an omission** — `spec.md`
§ Out of scope forbids adding one, and `legal.md` §6 O1 forbids the string it would need.

### Regime button — `regime-field.tsx:32`

| State | Treatment |
|---|---|
| rest | `border-line-strong` on `bg-surface`, `rounded-md`, `p-4`; action word reads `Alterar`, chevron at 0° |
| hover | `border-ink-subtle`, over `--duration-fast` / `--ease-standard`. Border colour only; **no transform, no elevation change** |
| focus-visible | `ring-focus` → `outline: 2px solid var(--color-focus)`, `outline-offset: 2px`. Explicitly specified, never inherited: `--color-focus` is `--color-accent` in light and `--color-accent-ink` in dark |
| active | no distinct treatment. The button has no `active:scale-*`; it must not gain one (a transform on a control inside the shifting column is exactly what this spec is about) |
| disabled | not reachable — the control is never disabled. If a remedy makes it so, that is a new state and a bounce |
| loading | **none, and none may be added** (**K5**). The control is server-rendered complete |
| error | none. The field cannot be invalid; the regime always has a value (`WORK_REGIME_INFO[0]` fallback, `regime-field.tsx:20`) |
| empty | none — same reason |
| live-updating | `aria-expanded` flips, the action word swaps `Alterar` ⇄ `Fechar`, the chevron rotates 180°. **The button's own box stays 94.8 × 308.0 through the swap** — both words are one line at `--text-label` — so opening the panel must not move the button |

### Regime option (radio inside a `<label>`) — `regime-field.tsx:59-81`

| State | Treatment |
|---|---|
| rest | `border-line-strong` on `bg-surface`, `p-4 pr-9`, check icon `opacity-0` |
| hover | `border-accent`, `--duration-fast` |
| focus-visible | `has-focus-visible:outline-2 outline-offset-2 outline-focus` on the label — the input is `sr-only`, so the ring is delegated to the label and must stay there |
| active | none |
| disabled | not reachable |
| loading / error / empty | none |
| checked | `has-checked:border-accent has-checked:bg-accent-soft`, check icon to `opacity-100` over `--duration-fast` |
| live-updating | selecting an option closes the panel (`handleChange`, `regime-field.tsx:22-25`) and rewrites the button's label and summary in the same commit |

### `#horas-mensais` / `#salario-bruto` (the `DIV.relative` wrapper's input)

| State | Treatment |
|---|---|
| rest | `h-14`, `border-line-strong`, `bg-surface`, `--text-input` + `numeric` |
| hover | `border-ink-subtle`, `--duration-fast` |
| focus-visible | `focus-visible:border-accent` **and** `ring-focus`'s 2 px outline at 2 px offset — both, deliberately: the border alone is 3.37:1 and carries the hover state too |
| active | none (text input) |
| disabled | `bg-surface-sunken`, `border-line`, `opacity-60`, `cursor-not-allowed` |
| loading | none, and none may be added (**K5**) |
| error | `aria-invalid:border-negative aria-invalid:bg-negative-soft` |
| empty | placeholder in `--color-ink-subtle`; the value is `monthlyHours \|\| ""`, and the empty state is what renders the DS5 `AlertBanner` below it |
| live-updating | every keystroke re-runs the hook and rewrites the hero numeral and the stat boxes. **The wrapper's box stays 56 px through all of it** — that invariance is `h-14`, and it is why the input is not a shift source in any recorded event |

### The two `AlertBanner`s in this column (DS3, DS5)

| State | Treatment |
|---|---|
| rest | `tone="danger"`; mounted only while its condition holds. DS3: 123 × 308 at 390, plus `mb-6` |
| hover / focus-visible / active / disabled | none — not interactive |
| loading | none |
| error | it *is* the error surface |
| empty | its absence is the healthy state |
| live-updating | **mount and unmount, with no animation and no reserved space** — DS3 disappears the moment a real salary is restored or typed, and that is the −147.0 px of §A.3. It must keep unmounting: reserving its height would spend 147 px of a phone permanently (§C.3), and fading it would delay a disclosure (`legal.md` §5.1, LR6.1) |

---

## Motion

Every animation reachable in the implicated subtree. **Nothing is added.** Durations and curves are
tokens from `app/globals.css`; the reduced path is `MotionConfig reducedMotion="user"` for the two
`motion` subtrees and `app/globals.css:303-315` for the CSS transitions.

| Element | Trigger | Property | Duration | Easing | Delay | Reduced-motion behaviour |
|---|---|---|---|---|---|---|
| view panel — `calculator-views.tsx:20-25` | route/tab change (**not** first paint: `initial={false}`) | `opacity` 0→1, `y` 12→0 (exit `y` 0→−12) | 320 ms | spring, `bounce: 0`, `duration: 0.32` | 0 | `reducedMotion="user"` suppresses the `y` transform; the opacity fade remains. `theme-provider.tsx:10` (**K6**) |
| `CollapsiblePanel` — `collapsible-panel.tsx:16-21` | regime panel / tax panel open or close | `height` 0 ⇄ auto, `opacity` 0 ⇄ 1 | 220 ms | `cubic-bezier(0.23, 1, 0.32, 1)` = `--ease-out` | 0 | opacity respects the setting; the `height` value animation is not suppressed by `reducedMotion="user"` — recorded as the §D.2 residual, pre-existing, routed to `tech-lead` |
| chevron — `regime-field.tsx:46-51` | `isOpen` toggles | `transform: rotate(180deg)` | `--duration-base` 220 ms | `--ease-standard` | 0 | the global reset drops `transform` from `transition-property`, so the rotation becomes instant. No `motion-reduce:` utility is needed and none may be added — there is no state-bound transform utility here to lose a specificity fight with |
| regime button / inputs | hover, focus | `border-color` | `--duration-fast` 160 ms | `--ease-standard` | 0 | `border-color` is in the reset's retained list at `--duration-fast`; unchanged |
| regime option check | `:checked` | `opacity` | `--duration-fast` 160 ms | default | 0 | opacity retained by the reset |
| hero panel — `hero-panel.tsx:30` | tone change | `background-color` | `--duration-slow` 320 ms | `--ease-standard` | 0 | retained at `--duration-fast`. `0004` **I5**: this is the panel's *only* declared transition and must stay so |
| hero numeral | value change | **none — the numeral resizes instantaneously** | — | — | — | unchanged. `0004` A.3: a tweened numeral is a numeral mid-lie |

**Prohibitions, restated as a rule a reviewer can apply.** No animation may be added on `opacity`,
`transform`, `height`, `clip-path`, `filter` or `content-visibility` to any element between
`#main-content` and the fields — that is **K5**, and it is the set of properties a "smooth" fix
reaches for. Any `motion` element added anywhere must sit inside `theme-provider.tsx`'s
`MotionConfig` (**K6**). Any state-bound transform utility added anywhere must ship its neutralizer
in the same state — `hover:-translate-y-1` needs `motion-reduce:hover:translate-y-0`, because a bare
`motion-reduce:transform-none` is `0-1-0` and loses to `0-2-0` for as long as the pointer is on the
element (`AGENTS.md` §8).

---

## Accessibility intent

### Roles and semantics — unchanged

`#main-content` is a `tabIndex={-1}` focus target moved to on a view change
(`calculator-views.tsx:60-62`). `RegimeField` is a `<fieldset>` with a `<legend>`; the control is a
`<button type="button">` with `aria-expanded` and `aria-controls="regime-options"`; the options are
real `<input type="radio" name="work-regime">` elements, `sr-only`, inside `<label>`s. The
disclosures are `<p>` elements inside a `<footer>` (DS1) and inside `AlertBanner` (DS3, DS5, DS6).
**None of this may change**: an `aria-hidden`, a `role="presentation"` or a `[hidden]` introduced to
stabilise layout is `legal.md` LR3 bullet 4 and a G2 rejection.

### Tab order at 390, `/custo-da-hora`

Skip link → header controls → `#salario-bruto` → regime button → (regime radios, only while the
panel is open) → `#horas-mensais` → `#jornada-diaria` → period selector → tax-details toggle → the
footer's source link → the fixed bottom tab nav. The order is DOM order; nothing in this spec
reorders the DOM, and a remedy that does — including a CSS `order` change — moves the tab order with
it and is a bounce.

### Contrast, both themes

Measured this session on the deployed preview, `evidence/g3-contrast.mjs`, computed styles read
through a canvas and scored by the WCAG 2.2 relative-luminance formula. 390×844,
`/custo-da-hora`.

| Pair | Dark | Light | Bar | Verdict |
|---|---|---|---|---|
| regime label — `text-ink` on `bg-surface` | **15.54:1** | **15.77:1** | 4.5 | pass |
| regime summary — `text-caption text-ink-subtle` on `bg-surface` | **5.25:1** | **5.06:1** | 4.5 | pass |
| regime action word — `text-label text-accent-ink` on `bg-surface` | **8.43:1** | **6.47:1** | 4.5 | pass |
| `<legend>` + briefcase icon on `bg-canvas` | **8.20:1** | **5.62:1** | 4.5 | pass |
| input value — `text-input text-ink` on `bg-surface` | **15.54:1** | **15.77:1** | 4.5 | pass |
| input border — `line-strong` on `bg-surface` | **3.46:1** | **3.37:1** | 3.0 (non-text) | pass |
| button border — `line-strong` on `bg-surface` | **3.46:1** | **3.37:1** | 3.0 (non-text) | pass |

Every pair passes AA in both themes **today**, and every one of them is a colour this gate does not
touch. The invariant is that all fourteen numbers are unchanged after the remedy.

### Touch targets

Regime button 94.8 × 308.0; inputs 56 px tall; regime options ≥ 56 px. All clear 44 × 44 at 390. A
reservation or a reflow that shrinks any of them below 44 px is a failure, and **K4** is the reason
none should be attempted.

### Live regions

The hero numeral is `aria-live="polite"` (`hero-panel.tsx:47`). It announces on every restore and
every keystroke, and it is the live region that carries the page's answer.

`AlertBanner` already carries a live role: `role="alert"` for `tone="danger"` and `role="status"`
for `tone="warning"` (`components/atoms/alert-banner.tsx:22`). **DS3, DS5 and DS6 are therefore
assertive live regions today**, announced on mount. The invariant is that the role stays exactly as
it is — an `AlertBanner` demoted to a plain `<div>` to stop it announcing during a reflow would
silence a disclosure, and one promoted from `status` to `alert` would change what the user hears
without a gate ruling on it.

**No new live region may be added.** A `role="status"` announcing that a layout has settled needs a
string, and `legal.md` §6 O1 mandates none. `legal.md` LR6.1 measures the disclosures by frame
co-presence with their claim, not by announcement, so no announcement can substitute for the
disclosure being on screen.

---

## Copy constraints

| Slot | Max length | Lines at 1440 / 390 |
|---|---|---|
| — | — | — |

**No slot. `legal.md` §6 O1 mandates no string and `spec.md` § Out of scope forbids adding or
rewording one, so AC6's exemption list from this gate is empty, exactly as it is from G2.**
`content-writer` is not running on this spec. Two existing strings have a length constraint this
gate *asserts* rather than sets, because the layout depends on them and a future rewording would
move a box:

- The regime button's action word (`Alterar` / `Fechar`, `regime-field.tsx:43`) must stay one line
  at `--text-label` in both states, or the button's 94.8 px height stops being invariant.
- The regime summary (`selected.summary`, from `WORK_REGIME_INFO` in `lib/payroll.ts`) wraps to two
  lines at 308 px and one at 667.3 px. That wrap is the whole 94.8 → 77.4 px difference between the
  viewports. A longer summary is a third line and a taller button at 390.

---

## Disclosure placement

Every surface `legal.md` §1.1 enumerates, where it sits, and the proof it is visible beside its
number rather than behind a collapse. **This gate moves none of them**; the table exists so a
reviewer can check that after the remedy.

| Surface | Source | Placement | Relationship to the shifting box |
|---|---|---|---|
| **DS1** P1–P4 (privacy, estimate, omissions, table year + source link) | `calculator-views.tsx:73-101` | `<footer>` inside `#main-content`, `max-w-3xl`, `text-caption`, `mt-12`. `vtop` 1855.7 → 2123.2 at 390 | **Outside the column** — a sibling of `AnimatePresence`, below `CalculatorLayout`'s grid (`legal.md` §1.1, correcting `spec.md`). **A remedy bounded to the nine scoped files can move it hundreds of px without editing its file**, and the diff will not show it. Re-measure it |
| **DS3** *Informe o seu salário bruto* | `salary-calculator.tsx:123-127` | `AlertBanner tone="danger"`, in flow directly under the field grid, `mb-6`. 123 × 308 at 390, `vtop` 1216.9–1293.1 | Inside the column. Its unmount on restore is the −147.0 px of §A.3 and must stay an unmount (**not** a reserved box, **not** a fade) |
| **DS5** *Informe a carga horária mensal* | `salary-calculator.tsx:129-140` | same, `vtop` 1363.9, 123 × 308 | Inside the column, immediately below the field it qualifies |
| **DS6** *A carga mensal não combina…* | `salary-calculator.tsx:142-155` | same, `vtop` 1245.5, 185 × 308 | Inside the column |
| **DS2** the DSR caption | `day-summary.tsx:232-236` | `/` only, `vtop` 2402.8 | Inside the column on `/` |
| **DS7** the compliance warnings | `day-summary.tsx:250-254` | `/` only, `vtop` 2478.9 / 2688.9 | Inside the column on `/` |

**None is behind a collapse, a dialog, a tooltip or a control.** Each is in normal document flow in
`#main-content`, adjacent to the number or the field it qualifies. `legal.md` §5.2 records that none
of them is above the fold at 390 in the correct build — the smallest `vtop` anywhere is 1245.5
against a fold at 844 — and declines to make that this spec's problem. **§C.3 is this gate's
answer to the same fact**: it is precisely why no pixel of reserved height is available to spend.

`legal.md` §6 O3 and O4 bind: no disclosure may leave `#main-content`, and DS1 may not be
deduplicated across the two routes. `legal.md` §7 V1–V8 re-measure all six after the remedy; this
gate's contribution is **K1**, which gives that re-measurement a baseline geometry to compare to.

---

## System change

**None.** No token added, removed or redefined; no new type step, no new curve, no new duration, no
new colour role, no new elevation level. `DESIGN.md` is unchanged by this gate and no human approval
point is raised.

The two rules most at risk of being broken *by accident* by a remedy, both already in `DESIGN.md` and
both restated as **I6** and **I8**: the `--spacing-*` namespace stays empty, and there is no fourth
root-size step above 18 px.
