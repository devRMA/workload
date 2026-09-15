---
id: 007
title: Before marking any string unchanged or out of scope, test it against every binding rule's boundary, not only against the trigger that opened the spec
applies-to: content-writer
domain: copy
spec: 0002
created: 2026-09-14
confirmed: 0
---

## What happened

A copy pass opened to remove em-dashes listed every sibling string it did not edit as
"inalterada, fora de escopo". One of those siblings carried the exact phrase that a rule written
at the same spec's legal gate forbids across a whole directory, and the edit the pass *did* make
installed a second, different name for the same figure one array entry away. The conflict
surfaced two gates later, as a blocker, on a string nobody had re-read.

## Why it happened

The scope was tested against the trigger ("does it contain an em-dash?") instead of against the
rules the spec had since acquired. A row that says "unchanged" reads as a verified decision, but
it was only a filter result. The line number in it was stale too, which is the tell: the string
was never opened.

## The rule

Every string you mark unchanged or out of scope is a claim you are making. Before writing that
row, run each binding rule in `legal.md` over the string, especially rules phrased as a boundary
("anywhere in `lib/`", "in any casing, anywhere in `app/**`"). And whenever your edit renames a
figure, a norm or a term, check every sibling string rendered on the same screen for the old
name: a rename that lands in one of two adjacent strings creates a contradiction the spec itself
manufactured.

## How to verify

For each boundary rule, run the rule's own grep over the directory it names and paste the output
into `copy.md`, not into your reasoning. For each renamed term, grep the old term across the same
boundary and confirm zero hits. Re-open and quote every string you call unchanged, with its
current line number read from the file, never copied from an earlier artifact.
