# 0004 — LCP render delay

<!-- State: draft | in-progress | blocked | done | rejected -->

**State:** draft
**Next agent:** product-manager (G1 — write `spec.md` against the finding below)
**Bounces:** 0

Opened by `product-manager` at the G5 run-4 triage of spec 0002, so that the absolute
2,500 ms LCP target has an owner and a place instead of being retired inside a restatement.
`0002`'s AC7 was restated as a relative criterion because it was only satisfiable by work
`0002` forbids; **this spec is where the absolute target lives now.** It is not
`.specs/0003-citation-registry/`, which is scoped to citations and `lib/legal-tables.ts` and
moves no rendering phase.

## The carried finding

`0002` spent every lever its scope authorised (the mount fade, the viewport unit, the two
preconnects, the typeface, the icon library) and bought **−155.8 ms** on `/` and **−231.4 ms**
on `/custo-da-hora`. Both routes still land above 2,500 ms, and the measurement says why:

| Route | Baseline median | After median | Gap to 2,500 ms |
|---|---|---|---|
| `/` | 2,687.232 ms | 2,531.406 ms | +31.4 ms |
| `/custo-da-hora` | 2,769.030 ms | 2,537.612 ms | +37.6 ms |

**Phases on the median run: TTFB 454 · load delay 0 · load time 0 · render delay 2,076.**
82% of the metric is render delay; resource load time is **zero**. The shipped Atkinson woff2
(34,024 bytes) finishes at 65 ms, 2.4 s before the LCP timestamp. No font, image or bundle
lever can reach the remaining cost.

Source of record: `.specs/0002-design-taste-preflight/evidence/after.md` §2,
`.specs/0002-design-taste-preflight/STATUS.md` § *B5 ruling* and § *Routed to `product-manager`*,
`.specs/0002-design-taste-preflight/design.md` §5.1 cause 2 and §5.2.

## What this spec has to change to get there

Named, not decided — G1 writes the scope, G3 the design and G4 the plan:

1. **The client-gated hero numeral** (`design.md` §5.1 cause 2). The LCP element is a value the
   client computes after hydration, from a live clock. `0002` §5.2 deliberately never put it on
   the "what may change" table and `0002` § Out of scope keeps it out. Changing it means deciding
   how the number reaches first paint — server-rendered, placeholder-rendered, or something else.
2. **A `PRODUCT.md` §4 question, not a performance one.** If the hero paints before hydration, it
   paints *something*. What a stale, zeroed or placeholder number may show a user who came to read
   one number off a screen is a product and disclosure decision, and it is the reason this cannot
   be done as a performance tweak inside another spec. It is the gate that makes this spec exist.
3. **A field-realistic instrument.** 2,500 ms is a Core Web Vitals **field p75**, not a lab median.
   `0002`'s lab run-to-run spread (~106 ms) was more than three times the margin it was being asked
   to judge. This spec names its instrument — CrUX/field p75, or a lab median with a tolerance band
   wider than the tool's own spread — and the exact command, per lesson **009**, and attributes the
   metric to its phases before accepting any lever, per lesson **010**.

## Not in this spec, on current evidence

- A runtime dependency added to hit the number (`0002` §3 and its non-goals still bind the app).
- A typeface, icon or bundle change. Those levers are spent and measured at zero load time.
- Anything that changes what the calculator computes.
