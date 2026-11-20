---
id: 037
title: Compare the measurement path itself — TLS interception, proxy, DNS — in any deployed-versus-local experiment, because loopback is the one path that bypasses it
applies-to: tech-lead
domain: plan
spec: 0004
created: 2026-09-15
confirmed: 0
---

## What happened

A plan set a diagnostic task to decide whether a held first paint came from *the bytes* or from *the
delivery*. The task did it properly: it mirrored the deployed response byte for byte, served it from
loopback, and the paint moved from 1.4–2.3 s to 101–207 ms. Delivery, not bytes. The plan then
enumerated, by name, the six properties the task was allowed to compare between the two paths — HTTP
version, content-encoding, cache-control, age, vary, and the CDN's own cache header. None of the six
explained a slower deployed paint; three differed in the *opposite* direction, because the local
mirror was HTTP/1.0, uncompressed and uncached and still painted early.

So the developer went past the list, measured round-trip time, reproduced the hold by injecting
100–150 ms of latency onto the local build, and — correctly — flagged that it had exceeded the plan's
enumeration rather than presenting the result as settled. The conclusion handed up was: the cause is
a platform property of the deployed origin, which serves nineteen requests over HTTP/1.1 to a single
origin against the browser's six-connection limit.

One `openssl s_client` call refuted the attribution. Every HTTPS host reachable from that machine —
the deployment, the production domain, the hosting vendor's own marketing site, and `example.com` —
was terminated and re-signed by the same corporate secure-web-gateway certificate, and that gateway
negotiated no ALPN at all. The machine could not observe HTTP/2 on any origin in the world. Queried
from an independent server-side vantage point outside that network, both deployed hosts advertised
`h2 http/1.1` on every edge IP. The mechanism was real and correctly measured; the agent it belonged
to was neither the vendor nor the repository. It was the egress proxy on the measurement host, and
it had been silently in every number the spec had on record, across three previous specs.

## Why it happened

The experiment was framed as *deployed versus local*, and the enumerated property list was built from
things the **origin** can differ in. A middlebox on the egress path is not a property of either
endpoint, so it could not appear on that list — and it is precisely the class of property that a
deployed-versus-local comparison cannot see, because it applies to *every* remote host equally and to
loopback not at all. That makes it perfectly correlated with the experiment's own independent
variable, and a confound perfectly correlated with the variable under test is indistinguishable from
the variable under test.

An enumerated list of properties is an upper bound on what an experiment can find. The list was the
plan's, and so was the omission.

## The rule

**Any experiment that compares a deployed artifact against a local one must compare the path as well
as the endpoints, and the plan must name the path checks explicitly — because the developer can only
check what the task enumerates.**

- Before attributing any transport-shaped difference to an origin, establish what the path does to
  *every* host: check ALPN and the certificate issuer against at least one **unrelated third-party
  host**. A result reproduced on `example.com` is a property of your network, not of your deployment.
- **Never conclude "the origin speaks HTTP/1.1" from a client on the measurement host.** Confirm it
  from a vantage point outside that network — an independent server-side checker, a CI runner, or
  field data.
- **Loopback is not "the same conditions minus the network".** It is the one path that bypasses the
  proxy, the corporate DNS, the VPN and the inspection appliance simultaneously. Everything those do
  will be attributed to whatever else differs.
- When a plan enumerates the properties an experiment may compare, add the path — interception,
  proxy, DNS resolution, egress — as a named row, and add an explicit instruction that a property
  outside the list is a finding to report, not a boundary to stop at.
- A developer that measures past the enumeration **and flags it** did the right thing in the right
  order. Confirm the process before ruling on the substance, and record that the incomplete list was
  the plan's defect.

## How to verify

Every performance or transport claim in a plan or report carries, in the same session, the ALPN and
certificate issuer of each host it measured plus one unrelated control host, and the per-request
protocol histogram from the tool's own network records. A session in which any host negotiates no
ALPN, or whose certificate issuer is not that host's own CA, is a session measured through an
intercepting middlebox: differentials measured inside it stay valid, and every absolute number in it
is labelled and may not be compared to a field threshold. A reviewer checks it by asking of any
deployed-versus-local claim: was the path measured, or only the two endpoints?
