---
id: 047
title: Fix a disclosure's rendering condition by the number the user acts on, never by the surface that emits the app's derived value
applies-to: labor-law-analyst
domain: law
spec: 0007
created: 2026-09-16
confirmed: 1
---

## What happened

G2 settled four disclosures against one count: *the surfaces that can emit a divisor, which is two*.
Three of them — the CCT caveat, the norm's scope word, the operand-naming rule — genuinely have the
derived divisor as their subject, so that count was right for them. The fourth disclosed a **gap in
the salário-hora**: the app cannot detect a bancário, so a worker on a six-hour journey reads
R$ 20,00 where the súmula in force gives R$ 16,67. G3 rendered the states and found one the count
could not see — the state where the user's declared load already agrees with the computed divisor,
so no banner renders at all. The money renders; the disclosure does not. The user the disclosure was
written for is the only user who never sees it.

## Why it happened

The disclosure was scoped by adjacency to the sibling rules it was listed beside, and all of them
were conditioned on the app asserting something. A disclosure about a **gap** is not conditioned on
an assertion: the app's inability to ask for the category holds in every state, including the states
where everything the app can check is correct. Worse, the conditioned form inverts its own message —
it correlates with a mismatch warning, which teaches the reader that a silent screen is a screen
whose number applies to them. The disclosure then manufactures the confidence it exists to remove.

## The rule

For every disclosure, name **which number the user acts on** and ask what varies its truth:

- If the subject is a value the app **derived and printed**, the disclosure renders where that value
  renders.
- If the subject is a **variable the product refuses or is unable to collect**, the omission is
  state-independent, and so is the disclosure. It renders wherever any figure it affects renders —
  including the states where nothing looks wrong.

Before accepting a narrower condition, write each candidate down with the reason it fails. A
condition that rests on a closure claim you did not sweep this session ("no other norm fixes a
divisor for another journey") is a condition you may not write. A condition that is an exact-equality
test on a typed value fires for one worker and not for their colleague on the same contract.

State the cost rather than avoiding it: a disclosure on every correct calculation is one users learn
to skip, and the only honest mitigation is that it renders **exactly once** per state — never the
same sentence in a permanent slot and in a banner at the same time. Then check the deixis: a string
written for a slot with a value above it ("o divisor acima") has no referent in the state where that
value is absent, so an unconditional placement is a wording bounce, not a move. See [[018]] for the
render-condition half of this and [[024]]'s successor rule in `AGENTS.md` §5 for the domain half.

## How to verify

Count the states the panel can be in, from its own branch conditions, and give the disclosure one row
per state — including the state with no banner. The two numbers must be equal. Then read the guard
that will be cited for it: a selector scoped to the banner body cannot see the silent state and will
print a pass against a panel that emits nothing. A guard that cannot fail on the state that exposed
the defect is not evidence.


## Retired

2026-09-19 — promoted — folded into .agents/agents/labor-law-analyst.md, 'How a disclosure rule is stated': it supplies the states a clause fires in, derived from the number the user acts on
