---
id: 053
title: Verify a right that is exercised by an action against the code that runs after the action, never against the control that offers it
applies-to: labor-law-analyst
domain: law
spec: 0011
created: 2026-09-19
confirmed: 1
---

## What happened

`0010` ruled LGPD art. 8º § 5º — revocation *a qualquer momento*, by a *procedimento gratuito e
facilitado* — **satisfied**, on the strength of a standing control that is always on screen, costs
nothing and reaches the setting in three interactions. Every one of those observations was true.

`0011` drove the control instead of reading it, in a production build in an isolated copy, with the
third party's endpoints intercepted and counted. After the revocation was recorded, the injected tag
was **still in the document**, the global was **still callable**, the recipient's cookies were
**still on the origin**, and one ordinary interaction produced **one** request to the recipient
carrying the same event name as the consented control — against **zero** before any consent existed.

The right was offered and recorded. It did nothing until the next page load, which is a moment the
user does not choose. The earlier gate had verified the **offer** and signed for the **effect**.

## Why it happened

A right that a user exercises by acting has two halves, and they live in different places. The
**offer** is in the component that renders the control: its presence, its reachability, its cost, its
box. The **effect** is in everything that runs *after* the click — the listener, the unmount, the
module the call sites actually route through, the residue the recipient left on the device.

Reading the component shows you the whole of the first half and none of the second, and it shows it
so completely that it feels like the whole rule. Worse, the first half is the half a norm's own words
describe most vividly — *gratuito*, *facilitado*, *a qualquer momento* all sound like properties of a
button — so the reviewer who checks the button believes they have executed the clause.

The general shape: **the clause names the user's act, and the compliance lives in the system's
response to it.** Wherever that is true, source-reading is structurally blind to the half that
matters, because the response is spread over modules the control does not import.

## The rule

**When a norm grants a right the user exercises by performing an act, the verdict is a measurement of
the system state *after* the act, never a reading of the control that offers it.**

Executed as four obligations:

1. **Perform the act** in a rendered, isolated, production-like artifact. Not `dev`, not a unit
   test's fake, not the source.
2. **State the effect as an observable quantity before measuring it** — requests to a named host,
   entries in `document.cookie` matching a named pattern, globals still callable — and never as
   "it stops".
3. **Measure the same quantity in three states and print all three**: before the thing was ever
   authorised, while it is running under authorisation, and after the act. Two of the three must
   differ, or the instrument does not discriminate and the reading is worth nothing.
4. **Sweep the residue as a separate clause.** Stopping the future and removing the past are
   different obligations under different units; an act that achieves one and not the other is a
   partial compliance that reads as total.

**Corollary, and it is the expensive half.** A prior gate's `pass` on a clause of this shape is
evidence about the **offer** only, whatever its prose says. Re-run it. When it falls, amend the prior
ruling's stated cause and say which half it actually verified — the wrong reason is what travels.

## How to verify

Before any `pass` cites a clause a user triggers, the report contains a table with one row per state
and one column per quantity, and the rows are not all equal. For a revocation, the minimum shape:

| State | requests to `<recipient host>` | cookies matching `<pattern>` on the origin |
|---|---|---|
| before any consent | 0 | 0 |
| consented, one instrumented action | 1 | 2 |
| **revoked, the same action** | **must be 0** | **must be 0** |

The middle row is the falsifiability control: if it reads 0, the instrument is blind and the bottom
row's 0 means nothing. Assert the size of the set of actions driven before asserting the count of
requests — `driven + exempt = <the enumerated total>`, with every exemption named.


## Retired

2026-09-19 — promoted — .agents/agents/labor-law-analyst.md, 'What a verdict is measured against', third form: a right exercised by an act is verified on the effect, never on the control
