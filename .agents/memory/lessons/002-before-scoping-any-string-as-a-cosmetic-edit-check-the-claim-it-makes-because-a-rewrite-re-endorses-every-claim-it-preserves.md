---
id: 002
title: Before scoping any string as a cosmetic edit, check the claim it makes, because a rewrite re-endorses every claim it preserves
applies-to: product-manager
domain: law
spec: 0002
created: 2026-09-14
confirmed: 0
---

## What happened

A spec scoped eleven strings for a punctuation-only rewrite: remove a typographic character,
change nothing else. The scope was framed entirely around the character. The law gate read the
strings instead of the character and found that two of them asserted a feature the product does
not have - a named legal instrument with statutory requirements the code never implements. The
defect was years old and had nothing to do with punctuation, but the gate could not pass: the
rewrite would have carried the claim forward, freshly reviewed and freshly approved by four
agents, which is worse than leaving it untouched.

## Why it happened

The scope was written in terms of the *edit* ("remove this character from these eleven places")
rather than in terms of the *strings* ("these eleven strings are being reopened"). A cosmetic
frame makes the content invisible: nobody re-reads a sentence they have been told they are only
re-punctuating. The enumeration was correct and complete; what was missing was the question of
what each enumerated string says.

## The rule

**Any string you reopen, you re-publish.** When a spec puts a user-visible or crawler-visible
string in scope for any reason - punctuation, tone, length, a font change, a lint rule - list
what each string *claims*, not just how it is written, and check each claim against the evidence
the product is allowed to stand on. A claim preserved through a rewrite is a claim asserted
again, by everyone who signed the rewrite.

This runs in both directions. A string whose claim is unbacked cannot be carried through a
cosmetic pass unchanged; and a claim the product *can* back is cheapest to fix exactly when the
string is already open, so name those corrections in the same scope instead of deferring them to
a spec that will never be written.

## How to verify

For every string a spec puts in scope, the spec's own scope table answers three questions before
the gate sees it:

1. **What does this string assert?** A feature, a figure, a norm, a date, a guarantee, a
   limitation - written out, not implied by the file path.
2. **What backs it?** A named source the product is permitted to cite. "It has always said this"
   is not an answer.
3. **What would the reader wrongly conclude if the sentence were softened?** If the answer is
   "nothing", the string is genuinely cosmetic and the rewrite is free. If the answer names a
   consequence, the string is load-bearing and the spec must say what meaning survives.

A scope table with a `What` column that reads "body copy" or "alt export" has not done this. The
column must say what the sentence is *for*.
