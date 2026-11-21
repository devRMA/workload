---
id: 057
title: Cite a jurisprudence or regulation compilation by its edition and re-fetch that edition, because the same URL is reissued and a cancellation between editions changes what it says without changing the link
applies-to: labor-law-analyst
domain: law
spec: 0012
created: 2026-09-19
confirmed: 0
---

## What happened

A ruling on two TST súmulas rested on a citation to the *Livro de Jurisprudência do TST* fetched at a
stable, still-resolving URL. The compilation had been reissued since: `Res. nº 225 de 30.06.2025`
cancelled twenty-seven súmulas between the edition that had been read and the edition in force. The
two súmulas the ruling depended on survived — one *incorporada a OJ*, one *mantida*, neither on the
resolution's list — so the substance held and nothing downstream went wrong. The citation was
nonetheless to a text that no longer exists, and the fact that it happened to still be right was luck,
not verification. The same run found the mirror case in statute: articles rewritten by a medida
provisória whose *vigência* had ended, where the text a plain fetch returns is the amended one and the
text in force is the older one.

## Why it happened

The rule *fetch a primary source in this session* is satisfied by a fetch, and a fetch of a compilation
returns whatever that compilation is today, silently. A consolidated corpus — a súmula book, a
regulamento consolidado, a tabela anexa, a portaria that replaces its predecessor at the same address
— is not a document, it is a **series of documents behind one address**, and the address carries no
version in it. Nothing in the fetched page announces which issue it is unless you go looking, so the
session check that was designed to catch a stale memory passes cleanly on a stale edition.

Statute inverts the same trap. There the address is stable *and correct*, but the text at it is the
consolidated one, which includes amendments whose own validity lapsed. In both directions the failure
is the same: the corpus has a time axis, and a URL has none.

## The rule

**A compiled or consolidated source is cited by its edition and its edition date, not by its URL, and
the edition named in the citation is the edition fetched in this session.** Three obligations:

- **Name the issue.** Every citation to a compilation carries the identifier the publisher gives that
  issue — the resolution, the edition date, the revision number — alongside the URL. A citation
  carrying only a URL is a citation to a moving target and is not yet a source.
- **Fetch the change log, not only the text.** Before relying on any unit of a compilation, find the
  instrument that last reissued it and read what it cancelled, incorporated or renumbered. Cancellation
  lists are published separately from the texts they empty, so the unit's own page is exactly where the
  news is not.
- **For statute, check that every amendment in the consolidated text is itself still in force.** A
  medida provisória whose *vigência* ended leaves its rewrite visible in the consolidated page and
  inoperative in law, so the text in force is the older one. Where an article you cite was amended,
  name the amending instrument and its status in the same line.

A citation that turns out right against a superseded edition is a **defect at full severity**, not a
near miss: the verdict it carried is unverified, and the next reader inherits a link that will keep
resolving.

## How to verify

For each compiled source in the artifact, write one line: `unit — edition identifier — edition date —
URL — last reissuing instrument and what it cancelled`. Any line whose edition fields are empty is
unfetched, whatever its URL returns. Then take one unit you did **not** need and check it against the
reissuing instrument's cancellation list: if the list is real and you can point at a unit it removed,
the edition you read is the edition you think you read. For statute, the same line names the amending
instrument and its vigência, and a lapsed one means the operative text is the previous one — quote it.
