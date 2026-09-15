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

## Also carried in — `og:image`/`twitter:image` resolve to the wrong host (0005 G9, routed at G10)

Added by `tech-lead` at 0005's G10. A second, **independent** finding, folded in here rather than
given its own spec: it changes no number, so `AGENTS.md` §11 does not demand ten gates for it, but
it is invisible anywhere except a deployment — and this is the only open spec whose subject already
*is* what `app/`'s document head and first paint emit on a real deployment, measured by
`web-standards-auditor` at G9. `0003` is scoped to citations and `lib/legal-tables.ts` and is the
wrong home.

- **Where:** `app/opengraph-image.tsx`, `app/twitter-image.tsx` (the generated `<meta>` tags on both
  routes). Both files entered earlier in the PR stack; `0005` never touched them.
- **What is wrong:** `app/layout.tsx:16` sets `metadataBase: new URL("https://workload.devrma.com")`,
  and `canonical`, `og:url`, the JSON-LD `@id`/`url`, `sitemap.xml` and `robots.txt` all resolve
  against it correctly. The two file-convention image routes do not — on the preview they render as
  `https://workload-git-fix-design-taste-preflight-devrmas-projects.vercel.app/opengraph-image?…`,
  the git-branch alias, a third host named nowhere in this repo. The image itself returns `200`
  `image/png`, so this is a metadata-correctness defect, not a broken asset: a crawler or a chat
  client unfurling a share fetches from a host outside the app's declared origin.
- **Standard violated:** `AGENTS.md` §9 — "Metadata, sitemap, robots, manifest and structured data
  still correct after the change" — the same bar every other field on the page already meets.
- **Reproduction, run at G9 and quoted here so G1 does not have to invent one:**
  `curl -s <preview-url>/ | grep -oE '<meta property="og:image"[^>]*>'`, and the same on
  `/custo-da-hora`. It cannot be reproduced against `localhost`, which is why it survived every G6.
- **Source of record:** `.specs/0005-…/reports/audit-preview.md` § SEO and metadata, Finding 1.

**Three bindings on `product-manager` at G1, from the G10 ruling:**

1. **Amend this spec's title and its `.specs/INDEX.md` row** to say it carries deployed-head
   correctness as well as LCP. A spec whose index row describes half of it is a spec the next agent
   scopes wrong.
2. **Two separate acceptance criteria, neither able to carry the other.** A partial pass is still a
   rejection (`AGENTS.md` §4 rule 1) — this must not become a spec that ships half and reads green
   because the easy half passed.
3. **Write the metadata criterion against the deployment**, with the `curl` above as its verification
   command (`AGENTS.md` §5, "How a criterion is written": the command has been run, on the artifact
   where the defect exists). A criterion written against a local build is unfalsifiable here.

## Not in this spec, on current evidence

- A runtime dependency added to hit the number (`0002` §3 and its non-goals still bind the app).
- A typeface, icon or bundle change. Those levers are spent and measured at zero load time.
- Anything that changes what the calculator computes.

## Also carried in — the budget failure is live on production, and the instrument drifts (0006 G9, routed at triage)

Added by `tech-lead` at `0006`'s G9 triage. Not a new finding: it is **this spec's own finding,
now measured on deployed artifacts** rather than on `0002`'s local build, and it moves two things
`product-manager` must write into `spec.md` at G1. Full ruling and raw numbers:
`.specs/0006-salary-alert-legibility/plan.md` § *G9 triage — run 1, ruled*, evidence in that spec's
`evidence/g9-control-build-ab/` (gitignored, regenerable; `summary.txt` has the 12-run table).

**What was measured**, one runner, one 6-minute window, `lighthouse 12.6.1`, unmodified
`.lighthouserc.js`, route `/`, 3 runs per host:

| Host | Build | `performance` | LCP (ms) |
|---|---|---|---|
| `workload.devrma.com` | production | 0.91 · 0.76 · 0.75 | 3259 · 5594 · 5613 |
| `workload-gqbii5wdl-…` | `0006` PR head, deployment alias | 0.73 · 0.74 · 0.78 | 6452 · 6338 · 5756 |
| `workload-git-fix-…` | same build, branch alias | 0.75 · 0.75 · 0.76 | 5922 · 6065 · 5711 |
| `workload-8kqr9212j-…` | **`0005`'s G9 deployment, unchanged** | 0.72 · 0.76 · 0.75 | 5770 · 5680 · 6065 |

1. **The target is missed on the production domain, not only in a lab.** `0002` left this spec a
   local-build gap of +31 ms and +38 ms. On the real domain the metric is now 3.3–5.6 s against
   2 500 ms. The gap this spec has to close is larger than the one it was opened with.
2. **The instrument moved 26 points on a frozen artifact.** `0005`'s G9 measured its own deployment
   at `performance` 0.98 / LCP 2.43 s a week ago; that same deployment, unchanged, now measures
   0.72–0.76 / 5.7–6.1 s. Nothing in this repo explains it (script transfer is flat: 239 975 B then
   239 647 B) and the branch/deployment alias question is settled — identical transport, identical
   scores. **No before/after claim in this spec may compare against a number copied from an older
   report.** Every comparison is a difference measured in one session against a control build, per
   `.agents/agents/web-standards-auditor.md` §G9's control-build rule, which this triage added.
3. **The falsifiable criterion is the phase, not the score.** In 11 of those 12 runs
   `largest-contentful-paint` equals `interactive` to the millisecond, while FCP lands at
   1.15–2.27 s. `hooks/use-current-time.ts` returns `null` on the first render, so
   `components/organisms/hero-panel.tsx`'s numeric `<p>` ships with no server-rendered text and
   cannot become an LCP candidate before hydration. Load Delay and Load Time are 0 ms in every run.
   Write the acceptance criterion as **`audits['largest-contentful-paint'].numericValue` must stop
   equalling `audits.interactive.numericValue`** — one lever, inside this spec's scope, on a margin
   that does not move with the runner (lessons **010**, **011**). The 2 500 ms absolute target stays
   as the goal; the phase equality is what a gate can score without re-deriving this triage.
4. **Measure from three hosts** at G6/G9: this spec's preview deployment alias, the pre-fix control
   deployment, and `workload.devrma.com`.
5. **The field is not the lab, and both belong in the evidence.** A real chromium at 4× CPU throttle
   with no network simulation paints that element once, at 448 ms (0005 build) / 560 ms (0006 build)
   — a single LCP candidate, no churn from the 1 s clock tick. The probe is reusable:
   `.specs/0006-salary-alert-legibility/evidence/g9-control-build-ab/lcp-candidate-probe.mjs`.
   It does not excuse the lab number; it bounds what the fix is actually buying a user.

The `PRODUCT.md` §4 gate above is unchanged and still comes first: what the hero may paint before
hydration is a product and disclosure decision, and it is the reason this is not a performance tweak.
