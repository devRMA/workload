# Specs — index

Every spec in the repository, its state, and the agent that holds it. This is the one repo-wide view; per-spec detail lives in each `NNNN-slug/STATUS.md`.

States: `draft` · `pending` · `in-progress` · `blocked` · `done` · `rejected`

`0001`–`0099` document the calculator as it already exists. `0100`+ is new work. See `README.md`.

| # | Spec | State | Holder |
|---|---|---|---|
| 0001 | [foundation](0001-foundation/spec.md) — baseline spec documenting the calculator as it exists today | in-progress | release-manager |
| 0002 | [design taste preflight](0002-design-taste-preflight/spec.md) — Section 14 pre-flight compliance for the shipped design system, plus the "banco de horas" claim correction (B1) and F1 | in-progress | release-manager |
| 0003 | [citation registry](0003-citation-registry/STATUS.md) — the footer names the wrong norm for the IRRF table and links a commercial aggregator (F2–F5, carried from 0002) | draft | product-manager |
| 0004 | [LCP render delay](0004-lcp-render-delay/STATUS.md) — the absolute 2,500 ms mobile LCP target, carried out of 0002 when AC7 was restated: 82% of the metric is render delay from the client-gated hero numeral. **Also carries `og:image`/`twitter:image` resolving to the Vercel branch-alias host instead of `metadataBase`**, routed here at 0005's G10; both criteria are independent and G1 amends the title to match | draft | product-manager |
| 0005 | [tailwind theme collision and dark hydration hotfix](0005-tailwind-theme-collision-and-dark-hydration-hotfix/spec.md) — the `@theme` spacing scale shadowed Tailwind's container scale, so the legal disclosure rendered 64px wide; plus React #418 under a dark system theme. Namespace deleted and locked by a guard, consent rows stacked below `sm`, both theme glyphs server-rendered. **The merge block on the PR stack is lifted — the stack merges whole, with PR #39 at its tip** | done | — |
| 0006 | [salary alert legibility](0006-salary-alert-legibility/spec.md) — `AlertBanner` spends ~68px of chrome inside a card that does not reveal it, so every alert renders ~24 characters per line at 390 (DS3 and four siblings), against LR2's floor of 40. Carried out of `0005` G6 as a non-blocking finding. **Fixed and shipped on PR #39**; four debts carried forward with owners and triggers (X1, D3, F2, DS2), and the LCP budget failure it surfaced — **live on production** — routed to `0004` as F1 | done | — |
