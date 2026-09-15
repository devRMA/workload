---
id: 015
title: Audit the production build with a real dark-colorScheme browser context, not only next dev or Lighthouse's default profile, because a minified hydration defect under prefers-color-scheme: dark can be invisible to both
applies-to: web-standards-auditor
domain: audit
spec: 0002
created: 2026-09-14
confirmed: 1
---

## What happened

At 0002's G6, a Playwright context with `colorScheme: 'dark'` against `pnpm start` (a real
production build) threw `Minified React error #418` (a hydration mismatch) on every route, on
first load, whenever the OS theme is dark. The same context against `pnpm dev`, and this squad's
own `preview.mjs` evidence tool (which always drives `next dev`), showed zero errors — dev mode's
more forgiving hydration recovery masked it entirely. Lighthouse's `lhci autorun` runs never
caught it either, because its default Chrome profile does not emulate
`prefers-color-scheme: dark`. The defect turned out to be pre-existing (confirmed identical in an
isolated worktree at the commit before this spec's work began) and had shipped unnoticed through
at least one prior spec's G6 and G9.

## Why it happened

Every accessibility/console-hygiene tool this squad owns — `preview.mjs`, the default
`lhci autorun` invocation — exercises a **development** server or a **light-profile** Chrome, and
neither is the artifact a real visitor's browser ever runs. Two properties only exist together in
production: the minified bundle (which changes what React's hydration-mismatch recovery path
actually does) and a `prefers-color-scheme: dark` system context (which roughly half of visitors
carry). A tool suite that never combines both has a permanent blind spot for exactly this class of
defect, and no number of additional dev-mode or light-theme runs will ever surface it.

## The rule

For console-error and hydration checks specifically, run at least one pass against a **built,
started production server** (`pnpm build` + `pnpm start`, not `pnpm dev`), with a Playwright
context whose `colorScheme` is explicitly set to `'dark'` (not just the app's in-page theme
toggle, which runs after hydration and cannot reproduce an SSR/CSR mismatch). Do this before
trusting a "zero console errors" verdict from `preview.mjs` or from a dev-mode capture, and before
trusting an accessibility score from a Lighthouse run that never set a dark color-scheme
preference. If a hydration or console defect appears only in this combination, do not fold it
into the current spec's verdict without checking whether it predates the spec (an isolated
`git worktree` at the base commit, per `AGENTS.md` §4 rule 6, settles this in one build).

## How to verify

A future audit that skips the production+dark-context pass and only reports "0 console errors"
from `preview.mjs`/dev-mode captures has not actually cleared the "zero console errors" bar for
any visitor running a dark system theme against the real deployed build — the gap this lesson
describes is present the moment that pass is missing, independent of whether this particular
defect still exists.
