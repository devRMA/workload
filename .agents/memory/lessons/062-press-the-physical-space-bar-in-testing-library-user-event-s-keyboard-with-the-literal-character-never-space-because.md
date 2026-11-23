---
id: 062
title: Press the physical space bar in @testing-library/user-event's keyboard() with the literal " " character, never {Space}, because {name} tokens match a keyMap entry's own key field case-insensitively and the spacebar's key is a single space, not the word Space
applies-to: frontend-dev
domain: build
spec: 0003
created: 2026-09-19
confirmed: 0
---

## What happened

`__tests__/regime-field.test.tsx`'s keyboard-path case focused the target radio directly and called
`user.keyboard("{Space}")` to select it. The suite reported the assertion after it as failing (the
legend that only renders once the radio is checked never appeared), which read like a component
defect in `RegimeField`. It was not: no keystroke was ever actually pressed.

## Why it happened

`@testing-library/user-event@14.6.7`'s `parseKeyDef` resolves a `{name}` token by finding the
`keyboardMap` entry whose own `key` field equals `name.toLowerCase()`. The spacebar's entry is
`{ code: "Space", key: " " }` — a single space character, not the word `"Space"`. `"space" !==
" ".toLowerCase()`, so the lookup misses, and the parser falls back to a synthetic
`{ key: "Space", code: "Unknown" }` descriptor. `keydown`/`keyup` fire with `event.key === "Space"`
(the literal word), a value no browser produces for the real spacebar and no behaviour in
`user-event`'s `keydownBehavior`/`keyupBehavior` tables recognises (the click-dispatch rule is keyed
on `keyupBehavior[' ']`). No click is ever dispatched, so the radio is never checked, and the
downstream assertion fails for a reason that has nothing to do with the component under test.
Confirmed with a scratch instrumented test logging every `keydown`/`keyup`/`click`: `{Space}`
produces `keydown Space` / `keyup Space` and no `click`; a literal `" "` produces the same two
events with `event.key === " "` followed by a real `click` (and, for a native `<input>`, a `change`).

## The rule

To press the physical space bar with `@testing-library/user-event`'s `keyboard()`, type the literal
space character (`user.keyboard(" ")`, or embed a space mid-string), never the bracketed name
`{Space}`. Reserve `{Name}` syntax for keys `user-event`'s own `keyboardMap` actually names that way
(`{Enter}`, `{Tab}`, `{ArrowRight}`, …) — check the installed version's `keyMap.js` if in doubt,
since the mapping is not guaranteed stable across major versions. When a keyboard-driven assertion
fails, before suspecting the component, log the actual `key`/`code` your harness produced on the
focused element and confirm it matches what a real keypress would send; a key name your library
invented on a lookup miss is a tooling bug in the test, not a product defect.

## How to verify

`grep -rn '{Space}' __tests__ tests` returns nothing in this tree. Reproduce the failure mode
directly: `new URL` aside, render any focusable checkbox/radio, call `.focus()`, then
`await user.keyboard("{Space}")` — assert the element's `checked` stays `false`. Then replace with
`await user.keyboard(" ")` on a fresh render and assert `checked` becomes `true`. The first assertion
proves the bug reproduces; the second proves the fix. `pnpm test __tests__/regime-field.test.tsx`
is green with the fix in place (11/11).
