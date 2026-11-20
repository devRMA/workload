---
id: 004
title: When a claim is retired, bind the replacement by what it must say, not only by a list of forbidden words: a synonym list closes the words it names, never the claim.
applies-to: labor-law-analyst
domain: law
spec: 0002
created: 2026-09-14
confirmed: 0
---

## What happened

An unbacked claim was retired from every surface that carried it, and the replacement was
granted as a permission ("the descriptor may name X, Y and Z") plus a list of forbidden
synonyms, made mechanically checkable by a grep. The list was careful and the grep was real.
It still left the claim open: the everyday synonym of the retired instrument was a phrase the
list did not name and the grep did not match, and a replacement built only from the permitted
words would have passed every acceptance criterion while saying the same thing in softer words.

## Why it happened

A forbidden-word list is written by enumerating the ways the author can imagine the claim
coming back. That is a search over the author's vocabulary, not over the reader's. A legal
instrument has one name in the statute and several in ordinary speech, and the ordinary ones
are exactly what a person types into a search box - which is why they are what a descriptor
drifts toward. The grep then certifies the absence of the statutory name and says nothing at
all about the claim.

## The rule

When a claim is retired, write the replacement as a **positive obligation on meaning**, and
make that obligation the checkable thing. State what the descriptor must *say* - including the
qualifier that makes it true, and where in the sentence that qualifier must sit - before
listing what it may not say. The forbidden list is a backstop, never the specification.

Two sub-rules carry most of the weight:

- **Put the scope word next to the noun it limits.** A qualifier stated earlier in the string,
  or in a sibling clause, does not survive how the string is actually read: a title, an `alt`
  or a search result is read from its last noun phrase. Require adjacency, and state it in a
  form a grep can express.
- **When a permitted capability is only partly implemented, tie the permission to the
  disclosure that makes it honest.** Name the file and line of that disclosure inside the
  permission, so removing the disclosure visibly re-opens the claim instead of silently
  widening it.

## How to verify

For each permitted item, open the module that computes it and confirm the capability - not the
spec's prose about it, and not a test. Then try to write the one string that uses only
permitted words and still makes the retired claim. If you can write it, the binding rule is
incomplete, and the missing sub-rule is whatever your string exploited. Only then turn the rule
into a grep, and check that the grep rejects the string you just wrote.
