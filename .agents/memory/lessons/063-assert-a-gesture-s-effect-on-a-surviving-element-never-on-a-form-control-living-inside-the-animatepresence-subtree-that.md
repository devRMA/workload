---
id: 063
title: Assert a gesture's effect on a surviving element, never on a form control living inside the AnimatePresence subtree that the same gesture makes exit, because the exiting subtree's props are frozen at their pre-gesture values until it unmounts
applies-to: frontend-dev
domain: build
spec: 0003
created: 2026-09-19
confirmed: 0
---

## What happened

A Playwright test drove `RegimeField`'s gesture (open the panel, select "Estatutário", which
collapses the panel as a side effect) and then asserted `toBeChecked()` on the very radio just
clicked. The assertion never passed: first it read back `unchecked`, then — once the panel's close
animation finished — `element(s) not found`. The same shape, with the same two-stage failure, had
already appeared in a jsdom unit test earlier in the same spec, so it is not a Playwright quirk or a
timing flake; it reproduced identically in a real browser.

## Why it happened

The radio lives inside `CollapsiblePanel`, which wraps its children in `motion/react`'s
`AnimatePresence`. Selecting the option calls `onChange` and then `setIsOpen(false)` in the same
handler. `AnimatePresence` intercepts the removal: the exiting child keeps rendering the props it
had at the instant exit began, ignoring further updates from its parent, until the exit transition
finishes and it unmounts. The click did toggle React's state (the sibling legend outside the panel,
and the button's `aria-expanded`, both prove it) — but the frozen clone of the panel's own content
never reflects that change, and then disappears entirely once the ~220 ms transition completes. An
assertion targeting a form control's own live DOM state, when that control sits inside the very
subtree the tested gesture makes exit, is asserting against a value the library has deliberately
stopped updating. It is not a timing race a longer wait fixes — the frozen value never updates and
the element is later removed regardless of how long you wait.

## The rule

When a gesture's handler triggers `AnimatePresence` to exit the container the acted-on element lives
in, do not assert that element's own post-gesture DOM state (checked, value, text). Assert a
**surviving** side effect instead: a sibling element outside the exiting container, an attribute on
a stable ancestor (`aria-expanded` on the toggle button), or the exiting element's *pre-exit*
state read before the transition starts. If the acceptance criteria explicitly demand a barrier on
the acted-on element itself, that is a signal the barrier is misplaced, not that the wait needs to be
longer — name the surviving effect that proves the same fact and use that instead.

## How to verify

Reproduce first: assert `toBeChecked()` (or any live-state assertion) on a radio/checkbox that a
click both changes and, via a sibling state update in the same handler, causes to exit through
`AnimatePresence` — watch it fail first with the stale value, then with "element(s) not found" once
the exit completes, regardless of retry timeout. Then replace it with an assertion on a surviving
side effect (e.g. a caption outside the collapsing container that only renders in the new state) and
confirm it passes reliably. In this spec: `tests/e2e/disclosure-legibility.spec.ts`'s D3 case, run in
an isolated copy against a production build, chromium project — 4/4 green once the barrier moved to
`aria-expanded="false"` on the button plus the legend's own visibility, with no `toBeChecked` on the
panel's own radio.
