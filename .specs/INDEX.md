# Specs — index

Every spec in the repository, its state, and the agent that holds it. This is the one repo-wide view; per-spec detail lives in each `NNNN-slug/STATUS.md`.

States: `draft` · `pending` · `in-progress` · `blocked` · `done` · `rejected`

`0001`–`0099` document the calculator as it already exists. `0100`+ is new work. See `README.md`.

| # | Spec | State | Holder |
|---|---|---|---|
| 0001 | [foundation](0001-foundation/spec.md) — baseline spec documenting the calculator as it exists today | in-progress | release-manager |
| 0002 | [design taste preflight](0002-design-taste-preflight/spec.md) — Section 14 pre-flight compliance for the shipped design system, plus the "banco de horas" claim correction (B1) and F1 | in-progress | release-manager |
| 0003 | [citation registry](0003-citation-registry/STATUS.md) — the footer names the wrong norm for the IRRF table and links a commercial aggregator (F2–F5, carried from 0002) | draft | product-manager |
| 0004 | [LCP render delay](0004-lcp-render-delay/STATUS.md) — the absolute 2,500 ms mobile LCP target, carried out of 0002 when AC7 was restated: 82% of the metric is render delay from the client-gated hero numeral | draft | product-manager |
| 0005 | [tailwind theme collision and dark hydration hotfix](0005-tailwind-theme-collision-and-dark-hydration-hotfix/spec.md) — the `@theme` spacing scale shadows Tailwind's container scale, so the legal disclosure renders 64px wide; plus React #418 under a dark system theme in production. **Holds the merge of the open PR stack** | in-progress | release-manager |
