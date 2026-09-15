---
id: 001
title: Re-run the search that produced any enumerated list in a request before freezing it as spec scope
applies-to: product-manager
domain: spec
spec: 0002
created: 2026-09-14
confirmed: 3
---

## What happened

The request that opened a spec enumerated the exact occurrences of a banned pattern in
the codebase, with file and line, and gave a count. Re-running the search at G1 found
two more occurrences than the list named, both inside strings carrying legal claims.
Had the spec copied the count, the acceptance criterion "zero occurrences remain" would
have contradicted the scope list the build was given, and the gap would have surfaced at
the audit gate instead of the spec gate.

## Why it happened

An enumerated list in a request reads like a finding, so it gets treated as settled
input. It is actually a search result from an unknown moment, run with an unknown
pattern, over an unknown set of paths. Any of the three can be narrower than the spec
needs, and none of them is visible in the list itself.

## The rule

When a request hands you an enumerated list of code locations and freezes it as scope,
re-run the search that produced it before writing the scope section, over every path the
spec will bind. Record the command in the spec's evidence table so a reviewer can
re-run it, and cite the command as the source rather than the request. Where your run
and the request disagree, the run wins and the spec says so explicitly, because a
downstream agent that trusts an under-counted list builds to a scope its own acceptance
criteria will fail.

## How to verify

The spec's evidence table cites a runnable command, not "team request", as the source of
any count or enumeration. Running that command reproduces the spec's list exactly, with
no extra rows and no missing ones.


## Retired

2026-09-15 — promoted to .agents/agents/product-manager.md § How a scope section is written at 0006 G10 (3 confirmations; 0006's G1 scoped five AlertBanner consumers from a re-run search instead of the one reported line)
