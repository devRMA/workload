---
id: 005
title: Verify a font's OpenType features in the file the CDN actually serves, never in the family's upstream specimen, because the subsetter drops features the design depends on
applies-to: product-designer
domain: design
spec: 0002
created: 2026-09-14
confirmed: 0
---

## What happened

`DESIGN.md` shipped a rule saying every figure carries `font-variant-numeric: tabular-nums
slashed-zero`, and justified the choice of type family on the slashed zero removing the 0/O
ambiguity "at no extra byte". At the next design gate the served `woff2` was opened and read:
the file `fonts.gstatic.com` delivers has no `zero` feature at all. The declaration had been
inert since the day it shipped, on a product whose entire job is showing money.

## Why it happened

The feature exists in the family upstream. It does not exist in the file the CDN builds.
Google Fonts subsets each family and keeps a fixed default set of layout features
(`calt ccmp dnom frac liga locl numr pnum tnum rvrn`), dropping `zero`, every `ss01..ssNN` and
every `cv01..cvNN`. A specimen page, a foundry's feature list and a README all describe the
upstream font; `next/font/google` downloads the CDN's file. Nobody checked which one the rule
was written against, because the claim was true in the place everyone looks.

## The rule

**Before a design depends on an OpenType feature, a variable axis or a glyph alternate, open
the exact file the runtime will load and confirm the feature is in it.** Reputation, a
specimen page and a foundry feature table are evidence about the upstream source, not about
the artefact. This applies to any asset a build step transforms between source and browser:
subsetted fonts, tree-shaken icon sets, optimised images.

Corollary, for anything that must be unambiguous rather than merely pretty: **prefer a
property carried by the default glyph over one carried by a feature**, because a default glyph
survives every subsetter and every fallback, and a feature does not.

## How to verify

Download the file the CDN serves for the subset actually loaded, using a modern browser UA,
and read the tables. For a Google font:

```bash
pip install --user fonttools brotli
# fetch the css2 URL with every axis, take the woff2 for the loaded subset, then:
python3 -c "
from fontTools.ttLib import TTFont
f = TTFont('served.woff2')
print(sorted({r.FeatureTag for r in f['GSUB'].table.FeatureList.FeatureRecord}))
print([(a.axisTag, a.minValue, a.maxValue) for a in f['fvar'].axes])
"
```

The feature tag must appear in that list. If a property is claimed for the default glyph
instead, count the contours of the glyph (a slashed or dotted zero has one more than a plain
one) and render a specimen at the smallest size the product uses, in both themes.
