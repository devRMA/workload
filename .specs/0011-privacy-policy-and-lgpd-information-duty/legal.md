# 0011 — Legal basis

> Owner: labor-law-analyst · Gate: `law` (G2) · Run 1 · **Blocking — no design, copy, or code starts
> before this passes.**

**Verdict: `pass`.**

L1–L16 are settled, every one by name, in §§ 6–20. The gate adds **seven binding rules** (PR1–PR7),
**thirty-five information cells** (art. 9º units U1–U7 × the **five** processing operations the
OP-test returns, §6.1), **eleven findings** (§21), and **eight disclosure obligations with rendering
conditions** (§22). It raises **two new human preconditions** (H7, H8), **closes H3 without the
human** (§19), and **corrects four counts in `spec.md`** (§3.1, §3.2, §6.1, §6.10).

> **Header corrected inline by the second run of this gate**, which is the run that measured the
> build. The first run projected *eight findings*, *six disclosures* and *two corrected counts*
> before §§7–24 were written; the measurements returned eleven, eight and four. A measurement that
> contradicts a classification wins, and the correction is made here rather than left for a
> downstream agent to reconcile against §21 and §22. The same run also corrects §1's currency
> check, which missed **Lei nº 15.452/2026** — see §6.11.

This is the first gate in this body of work to rule that **something is owed to users beyond a fix**
(§7, **L2**). Two prior gates ruled nothing was; both were right about the questions they were asked,
and this one is not the same question. The ruling is in §7.4 and it is binding.

---

## 0. Scope of this analysis

### Covered

| # | Computation or assertion | Settled in |
|---|---|---|
| C1 | What the privacy-and-cookies page must contain, unit by unit, for every processing operation the code performs | §6 (**L1**) |
| C2 | The status of consent records stored before that page exists, and what is owed to the users who gave them | §7 (**L2**) |
| C3 | Whether one consent act may carry the analytics and the advertising purposes | §8 (**L3**) |
| C4 | What the consent record must contain to discharge the art. 8º § 2º burden | §9 (**L4**) |
| C5 | Whether revocation is free and facilitated **in fact**, measured against the code that runs after it | §10 (**L5**) |
| C6 | What the page must say about art. 18 rights, and in what form | §11 (**L6**) |
| C7 | Which of the app's operands are *dados pessoais*, and whether any is *sensível* | §12 (**L7**) |
| C8 | The lawful basis for every operation that is not consent-based | §13 (**L8**) |
| C9 | The retention period for each operation, and how each one is derived | §14 (**L9**) |
| C10 | International transfer | §15 (**L10**) |
| C11 | Google's role per product — *operador* or *controlador* — and what each one makes the page say | §16 (**L11**) |
| C12 | Whether the Marco Civil imposes a duty on this application | §17 (**L12**) |
| C13 | The weight of the ANPD cookie guidance, and which of its items bind this build | §18 (**L13**) |
| C14 | Whether an *encarregado* must be appointed and published | §19 (**L14**) |
| C15 | The compliant opening state of the telemetry switch | §20 (**L15**) |
| C16 | The truth condition for every string D3 admits, and where the qualifier must sit | §20.2 (**L16**) |

### Explicitly not covered

1. **Every number the calculator computes.** No table, rate, bracket, divisor or ceiling in `lib/` is
   re-opened here. They were verified at `0001`, `0003`, `0007`, `0008` and `0010`; this spec's
   § Out of scope 1 protects that and nothing in this analysis reaches it. **AC11 stands unchanged.**
2. **Where the consent surface renders, and its geometry.** `0010` owns it, has measured it over 16
   cells, and its LR4.4 floor of 336 px is binding and unchanged. The two exemptions this spec's
   § Out of scope 3 names — the **obligation** to link, and the **presence** of an advertising row —
   are ruled here; their **height** is `0010`'s budget.
3. **`0010` F2b** (`components/organisms/cookie-consent.tsx:47`, `p-6`, LR2a by 18 px). Legibility
   geometry, `0010`'s.
4. **Placement, wording and route names.** §22 states what must be said and under what rendering
   condition; `content-writer` writes the words at G3 and `tech-lead` names the routes at G4.
5. **Whether the product should publish at all.** That is `PRODUCT.md` §7's maintainability test,
   it is **H5**, and it is the human's. §24 Q1 states the asymmetry and does not decide it.

### What this gate would have rejected on, and did not have to

Recorded so the `pass` is falsifiable. Any one of these would have been a reject:

- a spec that stated a norm, an article, a retention period or a rate — it states none, deliberately;
- a spec that set the telemetry default as a product preference — it routes it to **L15**;
- a spec that proposed deleting *"Nada é enviado para nenhum servidor"* — it proposes retiring it
  under lesson **003**, which §20.2 confirms is the correct shape and **not sufficient on its own**;
- a spec that treated **P6** as out of scope because ads are off in production — it takes it.

---

## 1. How the sources in this file were obtained

Every norm below was fetched in this session, from the official publisher, and read in its own text.
Where a fetch failed, that is recorded as a fetch failure and the affected ruling says so.

| Source | Publisher | How | Result |
|---|---|---|---|
| Lei nº 13.709/2018 (LGPD), consolidated text | Planalto | `curl` → `/tmp/.../scratchpad/lgpd.htm` | **HTTP 200, 310 272 bytes**, `md5 129bfed877d1119132ae0c2e2838e9cb`. Read as text (110 497 chars). |
| Resolução CD/ANPD nº 2, de 27/01/2022 + Anexo I (Regulamento) | ANPD (gov.br) | `curl` → `res2.html` | **HTTP 200, 77 207 bytes.** Arts. 1º–13 of the Regulamento read verbatim. |
| ANPD, *Guia Orientativo — Cookies e Proteção de Dados Pessoais*, v1.0, out/2022 | ANPD (gov.br) | PDF in this session's scratchpad (`anpd.pdf`, 670 822 bytes), text-extracted | Read. **Confirmed still the current version** by a search restricted to `gov.br` this session — no v2.0 exists. |
| GA4 cookie names and default lifetimes | Google, Analytics Help 11397207 | fetched | `_ga` **2 years**, `_ga_<container-id>` **2 years**. |
| GA4 data retention options | Google, Analytics Help 7667196 | fetched | user-level and event-level: **2 months** or **14 months** (26/38/50 are 360-only). |
| Google advertising cookie lifetimes | `business.safety.google/adscookies/` | fetched | `__gads` **13 months**, `__gpi` **13 months**, `IDE`/`ANID` **13 months EEA/UK, 24 months elsewhere**. |
| Google's role for AdSense | Google, AdSense Help 9035987 | fetched | *"both you and Google operate as independent controllers of personal data"*. |
| Lei nº 12.965/2014 (Marco Civil da Internet), consolidated text | Planalto | `curl` → `mci.htm`, **after five failed attempts** (HTTP/2 and HTTP/1.1, default UA, 100–240 s timeouts, all timed out); the sixth, with a browser UA and a 240 s budget, returned | **HTTP 200, 119 976 bytes**, `md5 8687f67d79af20ed6d153b01417ffb33`. Arts. 5º, 7º, 10–16 read verbatim. |

**The five failures are recorded rather than hidden**, because the honest alternative to a
sixth attempt was §17 ruled from memory, and a Marco Civil article recalled rather than read is
exactly the defect this gate exists to catch. `WebFetch` on the same URL returned `socket hang up`
twice; the working call was `curl -A "Mozilla/5.0 …"`. The next agent that needs `planalto.gov.br`
should start there.

**One currency check that matters, and its result.** The LGPD has been amended twice since the last
time this squad read it: **Medida Provisória nº 1.317, de 2025** and **Lei nº 15.352, de 2026**. Six
occurrences of the latter in the consolidated text, located and read one at a time. **All six are
institutional**: art. 5º VIII and XIX, the Capítulo IX heading, and art. 55-C's V-A/V-B/VI. They
rename the authority from *Autoridade* to **Agência Nacional de Proteção de Dados (ANPD)**.

- **Not one of them touches art. 8º, art. 9º, art. 16, art. 18, art. 33 or art. 41.** Every
  substantive rule in this file is the rule in force.
- **The rename does reach the page.** `content-writer` writes *Agência Nacional de Proteção de Dados
  (ANPD)*, not *Autoridade*, wherever the body is named (art. 18 § 1º's right to petition). A page
  published in September 2026 naming the *Autoridade* would be citing a superseded wording of art. 5º
  XIX on the day it ships. **PR7.**

---

## 2. Rules in play

| # | Rule | Why this change depends on it |
|---|---|---|
| **PR1** | **The art. 9º information duty** — seven units, *clara, adequada e ostensiva*, with *acesso facilitado* | It is the page's entire contract. §6. |
| **PR2** | **The art. 9º § 1º nullity** — consent is null where the information was not presented previously | It decides whether shipping the page is enough. §7. |
| **PR3** | **The art. 8º § 4º granularity rule** — consent refers to determined purposes; generic authorisations are null | It decides whether one act may carry two purposes, and whether an advertising row is required. §8. |
| **PR4** | **The art. 8º § 2º burden** — the controller proves the consent was validly obtained | It decides the consent record's shape. §9. |
| **PR5** | **The art. 8º § 5º revocation standard** — free, facilitated, at any moment, by express manifestation | It is measured here against what the code does *after* the click, not before it. §10. |
| **PR6** | **The art. 5º XII definition** — free, **informed**, **unequivocal**, for a **determined purpose** | It is what a pre-enabled switch fails. §20. |
| **PR7** | **The authority's name in force** — *Agência* Nacional de Proteção de Dados (ANPD) | §1, and it reaches the page's art. 18 § 1º sentence. |

---

## 3. One correction to `spec.md`, made at the gate that found it

`spec.md` § *How this scope was derived*, D3 table, says the grep *"returns **11 rows**, of which
**7 are admitted**"*, and the prose two lines above says *"grouped into 6 entries below"*. The
`STATUS.md` decisions log says *"11 grep rows, **7 admitted**"*; **AC7**'s known-bad cell says
*"11 rows, **6 admitted**, 1 of them false"*.

The table itself has **six** rows marked `yes`, and the prose explains why — *"four of them are
adjacent sentences of two strings"*, so 7 strings become 6 entries. The counts are reconcilable and
the spec states the reconciliation; **AC7's cell is the one that is wrong**, because it says
*6 admitted* where the field is *strings*, not *entries*.

**Ruled, not routed:** the admitted set is **7 strings in 6 entries**, and every rule in §20.2 is
written over the **6 entries**, each named by its file and line. `tech-lead` corrects AC7's known-bad
cell at G4 to read *"11 rows, 7 admitted strings in 6 entries"*. This costs nothing and it stops a
G6 reviewer from reconciling a report's prose against its own count, which is a job that belongs to
nobody.

### 3.2 — A second count, and this one is a clipped range rather than a wording

`spec.md` **P2** and its evidence table cite the salary persistence as
`hooks/use-salary-calculator.ts:139-146`. Re-derived by listing, not by reading the spec:

```
$ grep -rn "localStorage.setItem\|writeStoredOptionalNumber\|localStorage.removeItem" \
    hooks lib components app | sort
hooks/use-salary-calculator.ts:139 … :148      ← ten writes, not eight
hooks/use-work-calculator.ts:166 … :173, :187  ← as stated
lib/consent.ts:21                              ← as stated
lib/storage.ts:30, :34                         ← the shared writer
hooks/use-gross-hourly-rate.ts:11              ← the only delete in the tree
```

The range stops at **`:146`** and the block runs to **`:148`**. The two writes outside it are
`writeStoredOptionalNumber(STORAGE_KEYS.manualInss, …)` and `…manualIrrf`, at `:147` and `:148` —
they are outside the range for exactly the reason the spec already diagnosed for `safeGAEvent`: the
search term was `localStorage`, and these two go through `lib/storage.ts:28`. **Same field, second
cell** (lesson **041**): the defect is that a persistence inventory was derived from a call spelling
rather than from a list of every writer, so ruling on the range would leave the field producing it
intact.

**The corrected inventory, which is what §6 and §12 are written against — 18 distinct keys plus the
consent record, 19 in all**, from `hooks/use-work-calculator.ts:18-28` and
`hooks/use-salary-calculator.ts:35-46`:

`workMinutes` · `entry` · `lunchStart` · `lunchEnd` · `exitOverride` · `lastExit` · `isManualExit` ·
`firstTierRate` · `extraTierRate` · `grossSalary` · `monthlyHours` · `dependents` · `manualInss` ·
`manualIrrf` · `workRegime` · `salaryPeriod` · `extraDeductions` · `extraGains` — and
`workload_cookie_consent` (`lib/consent.ts:1`).

`hourlyRate` (`lib/storage.ts:1`, `LEGACY_HOURLY_RATE_KEY`) is **deleted** on load by
`hooks/use-gross-hourly-rate.ts:11` and is therefore not in the inventory — but it is the one key a
returning user may still have on their device, and §14.2 rules on what the page says about it.

**Why this matters and is not pedantry:** `manualInss` and `manualIrrf` are the two keys where the
user overrides the app's own tax arithmetic with a number off their real payslip. A page that lists
what is kept on the device and omits them describes the storage as less revealing than it is. The
count is the page's content.

---

## 4. The threshold question, ruled before anything else: does the LGPD apply?

Not assumed. Both exclusions read, and each one executed against this app.

**art. 3º — territorial reach.** Verbatim: *"Esta Lei aplica-se a qualquer operação de tratamento
realizada por pessoa natural ou por pessoa jurídica de direito público ou privado,
**independentemente do meio, do país de sua sede ou do país onde estejam localizados os dados**,
desde que: I - a operação de tratamento seja realizada no território nacional; II - a atividade de
tratamento tenha por objetivo a oferta ou o fornecimento de bens ou serviços ou o tratamento de
dados de indivíduos localizados no território nacional; ou III - os dados pessoais objeto do
tratamento tenham sido coletados no território nacional."*

WorkLoad is a pt-BR calculator for the Brazilian CLT, served from a `.com.br`-facing audience at
`workload.devrma.com`, and `PRODUCT.md` §1 defines its user as *"a Brazilian worker under the CLT"*.
**Inciso II is met on the product's own stated purpose.** The fact that Vercel and Google process
outside Brazil is expressly irrelevant — art. 3º caput says *independentemente … do país onde estejam
localizados os dados*.

**art. 4º I — the private-and-non-economic exclusion.** Verbatim: *"Esta Lei não se aplica ao
tratamento de dados pessoais: I - realizado por pessoa natural para fins **exclusivamente
particulares e não econômicos**"*.

Three cumulative conditions, executed one at a time:

| Condition | This app | Verdict |
|---|---|---|
| *por pessoa natural* | Unknown — **H1**. Possibly met. | inconclusive |
| *fins exclusivamente particulares* | The site is published on the open internet, listed in its own `app/sitemap.ts` for indexing, and offered to any member of the public. A service offered to the public is the opposite of a purpose that is exclusively private. | **not met** |
| *e não econômicos* | `PRODUCT.md` §3: *"How it is funded: AdSense, behind consent."* §8 is a monetization section. | **not met** |

**Two of three fail, and they are cumulative. art. 4º I does not exempt this application.**

And the second failure does not depend on **H4**: the exclusion asks about the **purpose**, not about
whether the revenue switch is on this afternoon. A product whose own product document names its
funding model has an economic purpose whether or not `NEXT_PUBLIC_ENABLE_ADS` is `true` today. The
first failure does not depend on H4 at all.

**The LGPD applies in full.** Everything after this section rests on that and it is not re-opened.

---

## 5. Sources

### S1 — LGPD, Lei nº 13.709, de 14 de agosto de 2018

| | |
|---|---|
| Norm | Lei nº 13.709, de 14 de agosto de 2018 (LGPD) |
| As amended by | Lei nº 13.853/2019; Lei nº 14.010/2020; Lei nº 14.020/2020; Lei nº 14.460/2022; **Medida Provisória nº 1.317/2025**; **Lei nº 15.352/2026** |
| Articles read here | art. 3º; art. 4º; art. 5º I, II, VI, VII, VIII, IX, X, XI, XII, XIV, XV, XVI; art. 6º I–X; art. 7º I–X e §§ 3º–7º; art. 8º caput e §§ 1º–6º; art. 9º caput, I–VII e §§ 1º–3º; art. 16 I–IV; art. 18 caput, I–IX e §§ 1º–8º; art. 33 I–IX; art. 41 caput e §§ 1º–4º |
| Effective from | 2020-09-18 (Lei nº 14.058/2020); administrative sanctions from 2021-08-01 |
| Superseded by | **in force**; last amended by Lei nº 15.352/2026, institutional only (§1) |
| Source | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm |

**The operative units this analysis executes, one at a time.** `0010` §2 read fourteen units and
asked one question of each: *does it fix a pixel?* This gate reads a larger set and asks a different
question: **what does this unit require a published page to contain, or a stored record to carry?**
The two tables do not overlap in their conclusions and neither replaces the other.

| Unit | Verbatim substance (from the fetched text) | What it requires of **this** build |
|---|---|---|
| art. 3º II | *"a atividade de tratamento tenha por objetivo a oferta ou o fornecimento de bens ou serviços ou o tratamento de dados de indivíduos localizados no território nacional"* | The LGPD applies. §4. |
| art. 4º I | *"realizado por pessoa natural para fins exclusivamente particulares e não econômicos"* | **Does not exempt.** §4. |
| art. 5º I | *"dado pessoal: informação relacionada a pessoa natural identificada ou identificável"* | The classification test for every operand in §12. **"Identificável" is the operative word and it is why the P5 set qualifies.** |
| art. 5º II | *"dado pessoal sensível: dado pessoal sobre origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico"* | **A closed list, and salary is not in it.** §12.4 — the negative ruling that stops the page over-claiming. |
| art. 5º VI | *"controlador: pessoa natural ou jurídica … a quem competem as decisões referentes ao tratamento"* | Whoever decides that GA loads is the controller. **H1.** §16. |
| art. 5º VII | *"operador: … que realiza o tratamento de dados pessoais em nome do controlador"* | Vercel's role, and Google's for Analytics. §16. |
| art. 5º X | *"tratamento: toda operação realizada com dados pessoais, como as que se referem a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, **arquivamento, armazenamento**, eliminação …"* | **Storage is treatment.** It is the unit that settles whether the P2 `localStorage` writes are in scope at all. §13.1. |
| art. 5º XI | *"anonimização: utilização de meios técnicos razoáveis … por meio dos quais um dado perde a possibilidade de associação, **direta ou indireta**, a um indivíduo"* | The P5 set is **not** anonymised, because the `_ga` client id restores the association. §12.2. |
| art. 5º XII | *"manifestação **livre, informada e inequívoca** pela qual o titular concorda com o tratamento de seus dados pessoais para uma **finalidade determinada**"* | **PR6.** Four properties, and §20 executes the pre-enabled switch against each. |
| art. 5º XIV | *"eliminação: exclusão de dado ou de conjunto de dados armazenados em banco de dados, independentemente do procedimento empregado"* | *"independentemente do procedimento"* is why "we cannot delete it from Google" is not an answer. §10.3. |
| art. 5º XV | *"transferência internacional de dados: transferência de dados pessoais para país estrangeiro ou organismo internacional"* | §15. |
| art. 6º III | *"necessidade: limitação do tratamento ao mínimo necessário … com abrangência dos dados pertinentes, proporcionais e **não excessivos** em relação às finalidades"* | The unit that rules on the P5 fingerprint set independently of consent. §12.3, **finding F5**. |
| art. 6º IV | *"livre acesso: garantia … de consulta facilitada e gratuita sobre a **forma e a duração** do tratamento"* | Duration is not optional. §14. |
| art. 6º VI | *"transparência: garantia … de informações claras, precisas e facilmente acessíveis"* | §22's rendering conditions. |
| art. 7º I | *"mediante o fornecimento de consentimento pelo titular"* | The basis for GA and for AdSense. §13. |
| art. 7º II | *"para o cumprimento de obrigação legal ou regulatória pelo controlador"* | The basis for the **consent record itself**. §13.2. |
| art. 7º IX | *"quando necessário para atender aos interesses legítimos do controlador ou de terceiro, exceto no caso de prevalecerem direitos e liberdades fundamentais do titular"* | The basis for the P2 calculator storage and for the host's logs. §13.1, §13.3. |
| art. 7º § 5º | *"O controlador que obteve o consentimento … que necessitar comunicar ou compartilhar dados pessoais com outros controladores deverá obter **consentimento específico** do titular para esse fim"* | **The sharpest unit in the file for L3.** Google is an *independent controller* for AdSense (§16). Sharing with another controller therefore needs its own specific consent — which is a stronger answer than art. 8º § 4º alone gives. §8.3. |
| art. 8º caput | *"deverá ser fornecido por escrito ou por outro meio que demonstre a manifestação de vontade"* | A click qualifies. No finding. |
| art. 8º § 1º | *"cláusula destacada das demais cláusulas contratuais"* | **Not applicable** — no contract. Same ruling as `0010` §2. |
| art. 8º § 2º | *"Cabe ao controlador o **ônus da prova** de que o consentimento foi obtido em conformidade com o disposto nesta Lei"* | **PR4.** §9 — it is what the consent record's shape is measured against. |
| art. 8º § 3º | *"É vedado o tratamento de dados pessoais mediante **vício de consentimento**"* | §7.3 — it is what turns a null consent into a prohibition, not merely into an absence. |
| art. 8º § 4º | *"O consentimento deverá referir-se a **finalidades determinadas**, e as **autorizações genéricas** para o tratamento de dados pessoais **serão nulas**"* | **PR3.** §8. |
| art. 8º § 5º | *"pode ser revogado a qualquer momento mediante manifestação expressa do titular, por **procedimento gratuito e facilitado**, **ratificados os tratamentos realizados sob amparo do consentimento anteriormente manifestado enquanto não houver requerimento de eliminação**, nos termos do inciso VI do caput do art. 18"* | **PR5**, and the ratification clause is load-bearing in §7.4 — it is the unit that decides what the user is owed for the past, and it is the one a summary would have dropped. |
| art. 8º § 6º | *"Em caso de alteração de informação referida nos incisos I, II, III ou V do art. 9º … o controlador deverá informar ao titular, com **destaque de forma específica do teor das alterações**, podendo o titular … revogá-lo caso discorde da alteração"* | **The unit that makes this page a standing obligation rather than a one-off.** It is the legal half of **H5**, and it is why §24 Q1 is not rhetorical. |
| art. 9º caput | *"O titular tem direito ao **acesso facilitado** às informações sobre o tratamento de seus dados, que deverão ser disponibilizadas de forma **clara, adequada e ostensiva** acerca de, **entre outras características previstas em regulamentação** …"* | **PR1.** And *"entre outras"* means **the seven are a floor, not a ceiling** — §6.9. |
| art. 9º I–VII | the seven units, verbatim in §6 | The page's contract. §6. |
| art. 9º § 1º | *"esse será considerado **nulo** caso as informações fornecidas ao titular tenham **conteúdo enganoso ou abusivo** ou não tenham sido apresentadas previamente com transparência, de forma clara e inequívoca"* | **PR2.** §7. **Two independent triggers, and this build hits both** — §7.2. |
| art. 9º § 2º | change of purpose → inform previously, titular may revoke | Adding an advertising category **is** a change of purpose for a user who already consented. §8.4. |
| art. 9º § 3º | *"Quando o tratamento … for **condição** para o fornecimento de produto ou de serviço"* | **Not applicable**, and verified rather than assumed: `components/organisms/analytics-wrapper.tsx:12` loads GA only on `readTelemetryConsent() === true`, and the calculator's own `lib/` path has no consent read at all. |
| art. 16 | *"Os dados pessoais serão eliminados após o término de seu tratamento"*, four exceptions | §14's ceiling on every retention period. |
| art. 18 I–IX | the nine rights, verbatim in §11 | **PR1 unit VII** requires them named explicitly. §11. |
| art. 18 § 2º | *"O titular pode **opor-se** a tratamento realizado com fundamento em uma das hipóteses de dispensa de consentimento, em caso de descumprimento ao disposto nesta Lei"* | The right that attaches to the *legítimo interesse* operations in §13 — and which the page must state, because a reader who only sees the consent categories will believe they have no say over the rest. |
| art. 18 § 3º, § 4º, § 5º | request by express requerimento; if immediate action is impossible the controller answers saying why; **"sem custos para o titular"** | §11.2 — what the contact channel must actually do. |
| art. 33 I–IX | the nine permitted routes for international transfer | §15. |
| art. 41 caput e § 1º | *"O controlador **deverá indicar** encarregado"*; *"A identidade e as informações de contato do encarregado deverão ser divulgadas publicamente, de forma clara e objetiva, **preferencialmente no sítio eletrônico do controlador**"* | §19, together with the ANPD regulation that dispenses it. |
| art. 41 § 3º | *"A autoridade nacional poderá estabelecer normas complementares … inclusive **hipóteses de dispensa** da necessidade de sua indicação, conforme a natureza e o porte da entidade"* | The delegation Resolução CD/ANPD nº 2/2022 exercises. §19. |

### S2 — Resolução CD/ANPD nº 2, de 27 de janeiro de 2022, e seu Anexo I

| | |
|---|---|
| Norm | **Resolução CD/ANPD nº 2, de 27 de janeiro de 2022** — *Aprova o Regulamento de aplicação da LGPD para agentes de tratamento de pequeno porte*. **A binding normative act**, not guidance, issued under the delegation in LGPD art. 41 § 3º and art. 55-J XVIII. |
| Articles read | Resolução arts. 1º–2º; Anexo I arts. 1º–13 |
| Effective from | **2022-01-27** — *"Art. 2º Esta Resolução entra em vigor na data de sua publicação."* |
| Superseded by | in force |
| Source | https://www.gov.br/anpd/pt-br/documentos-e-publicacoes/regulamentacoes-da-anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022 |

Verbatim, the four units this analysis uses:

- **Anexo I, art. 1º, parágrafo único** — *"Este regulamento não se aplica ao tratamento de dados
  pessoais realizado por pessoa natural para fins exclusivamente particulares e não econômicos, bem
  como nas demais hipóteses previstas no art. 4º da LGPD."*
- **Anexo I, art. 3º** — *"Não poderão se beneficiar do tratamento jurídico diferenciado previsto
  neste Regulamento os agentes de tratamento de pequeno porte que: I - realizem tratamento de alto
  risco para os titulares, ressalvada a hipótese prevista no art. 8º; II - aufiram receita bruta
  superior ao limite estabelecido no art. 3º, II, da Lei Complementar nº 123, de 2006 …; ou III -
  pertençam a grupo econômico de fato ou de direito, cuja receita global ultrapasse os limites
  referidos no inciso II …"*
- **Anexo I, art. 4º** — *"será considerado de alto risco o tratamento de dados pessoais que atender
  **cumulativamente a pelo menos um critério geral e um critério específico**, dentre os a seguir
  indicados: I - critérios gerais: a) tratamento de dados pessoais em larga escala; ou b) tratamento
  de dados pessoais que possa afetar significativamente interesses e direitos fundamentais dos
  titulares; II - critérios específicos: a) uso de tecnologias emergentes ou inovadoras; b)
  vigilância ou controle de zonas acessíveis ao público; c) **decisões tomadas unicamente com base em
  tratamento automatizado de dados pessoais, inclusive aquelas destinadas a definir o perfil pessoal,
  profissional, de saúde, de consumo e de crédito ou os aspectos da personalidade do titular**; ou d)
  utilização de dados pessoais sensíveis ou de dados pessoais de crianças, de adolescentes e de
  idosos."* — with § 1º: *"O tratamento de dados pessoais em larga escala será caracterizado quando
  abranger número significativo de titulares, considerando-se, ainda, o volume de dados envolvidos,
  bem como a duração, a frequência e a extensão geográfica do tratamento realizado."*
- **Anexo I, art. 7º** — *"Os agentes de tratamento de pequeno porte devem disponibilizar informações
  sobre o tratamento de dados pessoais e atender às requisições dos titulares **em conformidade com o
  disposto nos arts. 9º e 18 da LGPD**, por meio: I - eletrônico; II - impresso; ou III - qualquer
  outro que assegure os direitos previstos na LGPD e o **acesso facilitado** às informações pelos
  titulares."*
- **Anexo I, art. 11** — *"Os agentes de tratamento de pequeno porte não são obrigados a indicar o
  encarregado … § 1º O agente de tratamento de pequeno porte que não indicar um encarregado **deve
  disponibilizar um canal de comunicação com o titular de dados** para atender o disposto no art. 41,
  § 2º, I da LGPD."*

**The finding of S2, stated here because it decides H5 and it is the opposite of what a reader
expects from a "small agent" regulation.** The ANPD's own small-agent regime simplifies the
*registro de operações* (art. 9º), the *incidente* notification (art. 10), the *encarregado*
(art. 11) and the *segurança* policy (art. 13). **It simplifies nothing about art. 9º's information
duty — art. 7º restates it in full and adds the words *acesso facilitado*.** There is no size below
which this page becomes optional. §24 Q1 records that.

### S3 — ANPD, *Guia Orientativo — Cookies e Proteção de Dados Pessoais*

| | |
|---|---|
| Status | **Not a norm.** Guidance. Its own words on its weight: *"serão apresentadas orientações não exaustivas, consideradas como boas práticas"*. |
| Version | **1.0, outubro/2022 — confirmed current in this session**, by a search restricted to `gov.br`. No later version exists. |
| Source | https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf |

`0010` §2 R5 ruled on its weight and this gate does not disturb that ruling: it is quoted because
**the regulator's stated expectation is what the art. 8º § 2º burden is measured against**, not
because it creates a rule. §18 lists which of its items bind this build and which do not.

### S4 — Google's own documentation, for the facts only Google can state

These are **not norms and are not cited as norms.** They are the processor's and the co-controller's
published statements about their own products, and they are the only admissible source for a
retention period or a cookie lifetime this project does not set. Where one of them changes, the
page's number changes with it — which is the maintenance obligation in **H5**, made concrete.

| Fact | Value | Source |
|---|---|---|
| GA4 cookies set by `gtag.js` | `_ga` — **2 years**, *"Used to distinguish users."*; `_ga_<container-id>` — **2 years**, *"Used to persist session state."* | https://support.google.com/analytics/answer/11397207 |
| GA4 retention options for user-level and event-level data | **2 months** or **14 months** (26/38/50 months are GA 360 only) | https://support.google.com/analytics/answer/7667196 |
| Google advertising cookie lifetimes | `__gads` **13 months**; `__gpi` **13 months**; `IDE` and `ANID` **13 months EEA/UK, 24 months elsewhere**; `RUL` 12 months; conversion 90 days | https://business.safety.google/adscookies/ |
| Google's role for AdSense | *"both you and Google operate as **independent controllers** of personal data"* · *"We operate as a controller because we regularly make decisions on the data to deliver and improve the product."* · *"We're asking only that you seek consent for your uses of our ads products on your properties."* | https://support.google.com/adsense/answer/9035987 |

### S5 — Lei nº 12.965, de 23 de abril de 2014 (Marco Civil da Internet)

| | |
|---|---|
| Norm | Lei nº 12.965/2014, as amended by Lei nº 13.709/2018 (art. 7º X, art. 16 II) |
| Articles read | art. 5º I–VIII; art. 7º I–XIII; art. 10 caput e §§; art. 11; art. 13; art. 15 caput e §§; art. 16 |
| Effective from | 2014-06-23 |
| Superseded by | in force. **MP nº 1.068/2021 was rejected** and none of its wordings is in force — checked unit by unit in the consolidated text, because the rejected wordings sit inline in Planalto's rendering and are trivially misread as current. |
| Source | https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm |

§17 executes it.

---

## 6. L1 — the art. 9º information units, enumerated and filled

> **This section is the page.** `content-writer` writes pt-BR prose at G3 from these cells and from
> nothing else. A cell left vague here is a sentence invented at G3, which is the failure G2 exists
> to prevent (`spec.md` § Non-goals 1).

### 6.1 — The domain: a test, and the five operations it returns

`AGENTS.md` §5 *How a rule's domain is defined* forbids an enumeration as a definition. So:

> **The OP-test.** An operation is in this page's domain when it is an *operação* in the sense of
> LGPD art. 5º X, performed with data that relates to an identified or identifiable natural person
> (art. 5º I), **and this application causes it** — by code it ships, by a script it injects, or by
> the infrastructure it is served from. The test does not ask whether the controller can read the
> data, whether the data leaves the device, or whether a human at the controller ever sees it. Those
> three questions change the **basis** and the **retention**, never the **membership**.

Three things the test deliberately excludes, each with its reason, so the veto stays narrow:

- **Operations on data that is not personal under art. 5º I even in combination** — none today; §12
  runs the test and finds none.
- **Operations a third party performs on its own account, unconnected to this app.** Google's use of
  an `IDE` cookie set on another publisher's site is Google's; this page describes what *this app*
  causes. Where the app causes the setting, it is in (T4).
- **The user's own browser doing what browsers do** — history, cache, autofill. Not caused by this
  app's code.

**Output of the test against `HEAD`, five operations.** Derived by listing the tree (§3.2 for
persistence, the `safeGAEvent` grep below for transmission), not from `spec.md`'s P-list:

```
$ grep -rn "safeGAEvent(" app components lib hooks | grep -v "^lib/analytics.ts" | sort
components/organisms/app-header.tsx:16      session_metadata
components/organisms/app-header.tsx:59      toggle_theme
components/organisms/calculator-views.tsx:50    switch_tab
components/organisms/tax-details-panel.tsx:89   add_deduction
components/organisms/tax-details-panel.tsx:114  add_gain
components/organisms/work-calculator.tsx:157    toggle_manual_mode
components/organisms/work-calculator.tsx:169    reset_defaults
components/organisms/work-calculator.tsx:249    copy_to_clipboard
```

**Eight call sites, eight named events** — and `spec.md` P5 says *"Six further events"* after
`session_metadata`, which is **seven**. Third count corrected; same field as §3.2, and it is the last
one. The page names **eight** events or it names the categories rather than the list; §6.4 U1 rules
which.

| # | Operation | Where in the tree | Basis (§13) | Reaches a third party? |
|---|---|---|---|---|
| **T1** | Keeping the calculator's inputs so the answer survives a reload | `hooks/use-work-calculator.ts:166-173,:187`; `hooks/use-salary-calculator.ts:139-148`; `lib/storage.ts` | art. 7º IX | **No.** Device only. |
| **T2** | Recording the cookie choice | `lib/consent.ts:21` | art. 7º II | **No.** Device only. |
| **T3** | Audience measurement — Google Analytics | `components/organisms/analytics-wrapper.tsx`; `lib/analytics.ts`; the eight call sites above | art. 7º I (consent) | **Yes** — Google, *operador* |
| **T4** | Advertising — Google AdSense | `components/organisms/ad-manager.tsx:10-19`; `components/atoms/google-ad.tsx` | art. 7º I (consent) **+ art. 7º § 5º** | **Yes** — Google, **independent controller** |
| **T5** | Serving the page | Vercel, the host. No file — and that is the point (**F6**) | art. 7º IX | **Yes** — Vercel, *operador* |

**T5 has no line number in this repository and it is the one a code-derived list loses.** It is
returned by the OP-test because the test asks what the application *causes*, and being served causes
the host to receive the IP of every load — **before any consent surface has rendered**, and for every
user including the one who presses *Recusar*. A page describing T1–T4 and not T5 would be describing
the operations that have code and omitting the only one that is unconditional.

### 6.2 — The units, verbatim

LGPD art. 9º, caput and I–VII, from the fetched text:

> *"Art. 9º O titular tem direito ao acesso facilitado às informações sobre o tratamento de seus
> dados, que deverão ser disponibilizadas de forma clara, adequada e ostensiva acerca de, entre
> outras características previstas em regulamentação para o atendimento do princípio do livre
> acesso:*
> *I - finalidade específica do tratamento;*
> *II - forma e duração do tratamento, observados os segredos comercial e industrial;*
> *III - identificação do controlador;*
> *IV - informações de contato do controlador;*
> *V - informações acerca do uso compartilhado de dados pelo controlador e a finalidade;*
> *VI - responsabilidades dos agentes que realizarão o tratamento; e*
> *VII - direitos do titular, com menção explícita aos direitos contidos no art. 18 desta Lei."*

| # | Unit | Scope |
|---|---|---|
| **U1** | finalidade específica do tratamento | per operation |
| **U2** | forma e duração do tratamento | per operation |
| **U3** | identificação do controlador | once for the page |
| **U4** | informações de contato do controlador | once for the page |
| **U5** | uso compartilhado de dados, e a finalidade | per operation that shares |
| **U6** | responsabilidades dos agentes que realizarão o tratamento | per agent |
| **U7** | direitos do titular, com menção explícita ao art. 18 | once for the page |

**U3, U4 and U7 are page-level; U1, U2, U5 and U6 are per-operation.** That is the shape of the
five-by-seven grid, and it is why the grid has 35 cells and not 35 paragraphs.

### 6.3 — U3 and U4 — the controller, and the channel

| | |
|---|---|
| **Required** | art. 9º III and IV — *identificação do controlador* and *informações de contato do controlador*. The controller is defined by art. 5º VI as *"pessoa natural ou jurídica … a quem competem as decisões referentes ao tratamento"*. |
| **Blocked on** | **H1** and **H2**. |
| **What must be stated, in the form the human supplies it** | (a) the name of the natural or legal person who decides that Google Analytics loads and that AdSense may be enabled; (b) if a legal person, its CNPJ; (c) a contact channel that is **monitored** and that can actually perform the art. 18 § 4º duty of answering. |
| **What may not be stated** | Anything from `app/layout.tsx:27-29`. `authors`, `creator` and `publisher` are **authorship metadata**. `spec.md` H1 already refuses to promote one into the other, and this gate confirms that refusal is legally correct: authorship answers *who wrote it*, art. 5º VI asks *who decides the treatment*. They coincide here in all probability and **a probability is not an identification**. |
| **If the human declines** | §22 **D5**, and it is not a softer page — it is a different remedy. |

### 6.4 — T1 · the calculator's inputs on the device

| Unit | What the page must state |
|---|---|
| **U1** *finalidade* | To keep the numbers the user typed available on the same device, so the answer survives a reload and the user does not retype their salary every visit. **One purpose, and no other.** In particular the page must not describe it as *melhorar sua experiência* — §22 **D1**. |
| **U2** *forma* | Stored by the browser, on the user's own device, in `localStorage`, under the site's own origin. **The nineteen keys, by what they hold rather than by their identifiers**: the times entered, the daily journey and the overtime rates, the gross salary, the monthly hours, the number of dependents, **the manual INSS and IRRF overrides**, the regime, the period, and the extra deductions and extra gains the user added by name and value. The list is the §3.2 inventory; a page that omits `manualInss` and `manualIrrf` understates what is kept. |
| **U2** *duração* | **Until the user clears it.** §14.1 — and because that is an indeterminate period, §14.1 also states what the app must therefore give the user, and it is not a sentence. |
| **U5** | **Nothing is shared.** This is the app's true claim and §22 **D2** protects it from being deleted along with the false one. |
| **U6** | The controller's responsibility here is limited to what the code does; **the controller has no access to this data and cannot read, recover or delete it remotely.** That is a responsibility statement in the art. 9º VI sense and it must be said, because a reader who has just been told the controller is responsible for the storage will otherwise assume the controller can see it. |

### 6.5 — T2 · the consent record

| Unit | What the page must state |
|---|---|
| **U1** | To remember the user's cookie choice, and to let the controller demonstrate it was made — art. 8º § 2º. Two purposes, both determined. |
| **U2** *forma* | One `localStorage` entry under the site's own origin, holding the choice, when it was made, **and which version of this page it was made against** — §9 makes the version mandatory. |
| **U2** *duração* | **Derived, not chosen: 24 months**, with the derivation in §14.3 and the re-ask that follows. |
| **U5** | Nothing shared. |
| **U6** | The controller's, alone. |

### 6.6 — T3 · Google Analytics

| Unit | What the page must state |
|---|---|
| **U1** *finalidade* | **Audience measurement: to know how many people use the site, on what kind of screen, in what language and time zone, and which parts of the calculator they use.** Not *"melhorar sua experiência"*. The purpose must be specific enough that a reader can tell it apart from advertising, because §8 makes that distinction carry a separate consent. |
| **U1** *the operands* | The page states **what is collected**, because a purpose without its operands is not *específica*: the **screen width and height, the browser window width and height, the device pixel ratio, the browser language and the time zone** (`components/organisms/app-header.tsx:16-24`), **the IP address of the request**, a **random identifier stored in a cookie on this site** that lets Google recognise the same browser across visits, **and the fact that one of eight actions happened** — switching tab, switching theme, toggling manual mode, resetting the defaults, copying the result, adding a deduction, adding a gain, and the page load itself. §6.1 fixes the count at eight. |
| **U1** *what is not collected* | **No entry time, no exit time, no salary, no dependants and no computed result is sent to Google.** This is verifiable — the eight call sites' parameter objects contain no calculator value — and it is the sentence that keeps §22 **D2** honest. `qa-engineer` gets a falsifiable guard from it at G6: **no `safeGAEvent` call site may pass a parameter whose value derives from a calculator field**, asserted over the eight sites with the count asserted first. |
| **U2** *forma* | Google's `gtag.js`, loaded from `googletagmanager.com` **only after consent**, writing two first-party cookies on this site — `_ga` and `_ga_<id>`. |
| **U2** *duração* | Cookies **2 years** (S4). The measurement data held by Google: **the retention configured on the property — 2 or 14 months — stated as the configured value, not as the range.** **H7.** |
| **U5** | **Shared with Google LLC**, for the audience-measurement purpose and no other, **and transferred outside Brazil** — §15. |
| **U6** | Google acts **as *operador*** for this product, on the controller's instructions — §16. The controller remains answerable for the choice to use it. |

### 6.7 — T4 · Google AdSense

**Conditional, and the condition is on the *code*, not on the flag.** These cells are required on the
page from the moment the repository contains a path that can inject the AdSense script, which it does
(`components/organisms/ad-manager.tsx:10-19`). §21 **F1** rules on the flag.

| Unit | What the page must state |
|---|---|
| **U1** | **To show advertising, and — if the account serves personalised ads — to select which advertising by building a profile of the reader's interests.** *(Whether the account is configured for personalised ads is **H4**; §8.5 gives the compliant text for both answers and the page must not be written before the answer arrives.)* |
| **U2** *forma* | A script loaded from `pagead2.googlesyndication.com`, which sets cookies in the browser under Google's own domains. |
| **U2** *duração* | `__gads` **13 months**, `__gpi` **13 months**, `IDE`/`ANID` **24 months outside the EEA/UK** (S4). The EEA/UK 13-month figure is **not** the one this page states, because this page's audience is in Brazil — writing the shorter number would understate the retention for every reader it has. |
| **U5** | **Shared with Google LLC**, transferred outside Brazil, **for Google's own purposes as well as the controller's**. |
| **U6** | **Google is an *independent controller* for this product, by its own published statement** (S4). The page must say that Google decides for itself what it does with the advertising data and that requests about that data go to Google as well as to this controller — §16.3. This is the cell where the page's two Google paragraphs must **not** be merged, and §16 says why. |

### 6.8 — T5 · the host

| Unit | What the page must state |
|---|---|
| **U1** | To deliver the page and keep the service available and secure. |
| **U2** *forma* | Every request for the site reaches **Vercel**, the host, which necessarily receives the **IP address**, the approximate time, the URL requested and the browser's user-agent string — **before any consent is asked for, and regardless of the answer.** |
| **U2** *duração* | The host's log retention under the plan in force. **H7.** |
| **U5** | Shared with Vercel as *operador*, and **transferred outside Brazil** — §15. |
| **U6** | Vercel acts on the controller's instructions; the controller answers for the choice of host. |

### 6.9 — U7, and the fact that seven is a floor

art. 9º caput says the information is due *"acerca de, **entre outras características previstas em
regulamentação** para o atendimento do princípio do livre acesso"*. **The seven are a minimum.**
Three further items are owed here, each derived from a unit already read, and each is a page cell
rather than a wish:

| # | Owed | Derived from |
|---|---|---|
| **U8** | **A statement that the calculator's own arithmetic runs entirely in the browser and sends nothing anywhere** — the app's true claim, carried forward in a form that survives the consented state. | §22 **D2**, art. 6º VI. Its *retirement* is §20.2; its *replacement* is this cell. |
| **U9** | **How to refuse and how to change one's mind afterwards**, naming the standing control that already exists at `components/organisms/cookie-consent.tsx:156-165`. | art. 8º § 5º, art. 18 IX, ANPD S3 (*"mecanismo direto, simplificado e próprio"*). |
| **U10** | **The date this page was last changed.** | art. 8º § 6º — a duty to inform of changes is unauditable by the reader without one, and it is the cheapest possible discharge of **H5**'s maintenance obligation. |

**U1–U10 is the enumerated count for AC2.** `tech-lead`'s guard asserts **10** before iterating, and
`measured + exempt = 10` with every exemption named — `AGENTS.md` §5 *How an instrument's reading is
trusted*. **U4 and, if H3 answers yes, an encarregado cell are the only two that may ever be
*exempt*, and only by not shipping at all** (§22 D5); no unit here is exempt by being obvious.

---

## 6.10 — A fourth count, found by re-deriving the inventory rather than re-reading §3.2

§3.2 lists **18** storage keys and says *"18 distinct keys plus the consent record, 19 in all"*. Re-derived
this run from the two `STORAGE_KEYS` objects rather than from §3.2's own prose:

```
hooks/use-work-calculator.ts:18-27   → workMinutes · entry · lunchStart · lunchEnd · exitOverride ·
                                       lastExit · isManualExit · firstTierRate · extraTierRate   (9)
hooks/use-salary-calculator.ts:36-48 → grossSalary · monthlyHours · workMinutes (shared) ·
                                       workDaysPerWeek · dependents · manualInss · manualIrrf ·
                                       workRegime · salaryPeriod · extraDeductions · extraGains  (11, one shared)
lib/consent.ts:1                     → workload_cookie_consent                                   (1)
```

**`workDaysPerWeek` (`lib/storage.ts:5`, written at `hooks/use-salary-calculator.ts:147`) is missing
from §3.2's list.** The distinct count is **19 keys, and 20 including the consent record** — not 18
and 19.

**Corrected inline at the gate that found it**, per `AGENTS.md` §4 and this agent's own rule that a
later run amends the earlier ruling's stated cause rather than leaving a downstream agent to
reconcile prose against counts:

- §3.2's *"18 distinct keys … 19 in all"* reads **19 distinct keys … 20 in all**.
- §6.4 **U2** *forma*'s *"The nineteen keys"* reads **the twenty entries** — nineteen calculator keys
  plus the consent record — or, in the form the page will actually use, the nineteen kinds of value
  listed there **plus `workDaysPerWeek`, the number of days per week the user works**.
- This file's own header says *"corrects two counts in `spec.md` (§3)"*. It corrects **four**:
  AC7's admitted-string count (§3.1), the persistence line range (§3.2), P5's event count (§6.1),
  and the key inventory (this section).

**Why this is not pedantry, in the same terms §3.2 used for `manualInss`.** `workDaysPerWeek` is the
operand `0007` ruled on for the Súmula 431 divisor. It is a statement about the user's contractual
arrangement, kept on their device, and a page that enumerates what is stored and omits it describes
the storage as less revealing than it is — which is the one failure mode §3.2 named and then
committed.

---

## 6.11 — The currency check, re-run this session, and one amendment the previous run did not have

`AGENTS.md` §5 *How an instrument's reading is trusted* applies to a source as much as to a guard.
The LGPD was re-fetched in **this** run and it is **not the same file** the run recorded in §1:

| | §1's fetch | This fetch |
|---|---|---|
| bytes | 310 272 | **310 252** |
| md5 | `129bfed877d1119132ae0c2e2838e9cb` | **`b53f95822bac303214900f80fec4adbd`** |

The twenty-byte difference is a real amendment, and it is **Lei nº 15.452, de 2026**, which §1 does
not name. Located by scanning every amendment marker in the consolidated text and resolving each to
its host article programmatically rather than by eye:

| Amendment | Occurrences | Host articles |
|---|---|---|
| Medida Provisória nº 1.317/2025 | 7 | art. 5º ×2, art. 54, art. 55-A, art. 55-C ×3 |
| Lei nº 15.352/2026 | 6 | art. 5º ×2, art. 54, art. 55-C ×3 |
| **Lei nº 15.452/2026** | **1** | **art. 55-A** |

Lei nº 15.452/2026 gives art. 55-A its current wording: *"Fica criada a **Agência** Nacional de
Proteção de Dados (ANPD), autarquia de natureza especial **vinculada ao Ministério da Justiça e
Segurança Pública**, dotada de autonomia funcional, técnica, decisória, administrativa e financeira
…"*.

**Nothing in the set touches art. 7º, art. 8º, art. 9º, art. 16, art. 18, art. 33 or art. 41.** Every
substantive rule in this file is the rule in force, and it is now established by a measurement over
the whole text rather than by six hand-located occurrences. **PR7 is reinforced, not disturbed**: the
body is the *Agência* Nacional de Proteção de Dados, vinculada ao Ministério da Justiça e Segurança
Pública, and `content-writer` names it that way.

### S2 is amended too, and §5 did not record it

The ANPD's own page for Resolução CD/ANPD nº 2/2022 links **Resolução CD/ANPD nº 15, de 24 de abril
de 2024**, whose art. 2º gives a new wording to **art. 14, II of Anexo I**. Read verbatim in the DOU:
it substitutes the cross-reference for incident communication with *"nos termos do Regulamento de
Comunicação de Incidente de Segurança, aprovado pela Resolução CD/ANPD nº 15, de 24 de abril de
2024"*. **Institutional; arts. 1º–13, which are the ones this file uses, are untouched.** S2's
*"Superseded by: in force"* row reads **in force, as amended by Resolução CD/ANPD nº 15/2024 art. 2º
(art. 14 II only)**.

### And one unit of S2 the previous run never read, which decides §19

**Anexo I, art. 2º, I**, verbatim from the DOU: *"agentes de tratamento de pequeno porte:
microempresas, empresas de pequeno porte, startups, pessoas jurídicas de direito privado, inclusive
sem fins lucrativos, nos termos da legislação vigente, bem como **pessoas naturais** e entes privados
despersonalizados que realizam tratamento de dados pessoais, assumindo obrigações típicas de
controlador ou de operador"*.

The human has ruled that the controller here **is a natural person**. Art. 2º I puts a natural person
inside the small-agent regime by name. §19 rests on this and on nothing else.

| | |
|---|---|
| Source | https://www.in.gov.br/en/web/dou/-/resolucao-cd/anpd-n-2-de-27-de-janeiro-de-2022-376562019 (DOU 28/01/2022, Edição 20, Seção 1, p. 6) · https://www.in.gov.br/en/web/dou/-/resolucao-cd/anpd-n-15-de-24-de-abril-de-2024-556243024 (DOU 26/04/2024, Edição 81, Seção 1, p. 114) |

### S6 — Resolução CD/ANPD nº 19, de 23 de agosto de 2024

| | |
|---|---|
| Norm | **Resolução CD/ANPD nº 19, de 23 de agosto de 2024** — *Aprova o Regulamento de Transferência Internacional de Dados e o conteúdo das cláusulas-padrão contratuais*. A binding normative act under LGPD arts. 33 I e II a–c, 34, 35 e 36. |
| Effective from | **2024-08-23** (*"entra em vigor na data de sua publicação"*), **as rectified 18/08/2025** — the ANPD's own page carries that observação and it is recorded rather than dropped. |
| The deadline it set | Parágrafo único: agents already transferring under contractual clauses had **12 months from publication** to incorporate the ANPD's cláusulas-padrão — i.e. **until 2025-08-23, already elapsed**. |
| Articles read | Resolução arts. 1º–2º; Anexo I arts. 1º–4º |
| Source | https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-19-de-23-de-agosto-de-2024 |

### S7 — the adequacy list, checked rather than assumed

The ANPD's *Transferência Internacional de Dados* page, fetched this session, states: *"Até o momento,
a **União Europeia** foi considerada como organismo internacional adequado pelo Conselho Diretor da
ANPD"* — **Resolução CD/ANPD nº 32/2026**. **The United States is not on the list.**

Source: https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados

This one fact closes art. 33 I for **both** recipients in §6.1, and it is why §15 is a finding rather
than a paragraph.

### S8 — Lei nº 12.965/2014, re-fetched

`md5 871909cb1a9e37b5825b24d17209b2a5`, 119 976 bytes, HTTP 200, first attempt, with the browser UA
§1 recommended. Arts. 7º I–XIII, 10, 11, 13 and 15 read verbatim. §17 executes them.

### S9 — Google's own statement on the Analytics data-processing relationship

Google Analytics Help 3379636, fetched this session: the **Google Ads Data Processing Terms** — the
instrument that makes Google a processor — are *automatically* incorporated for EEA/UK/Switzerland
accounts and must be **proactively accepted in Account Settings** elsewhere. Brazil is *elsewhere*.
**Whether they are accepted on this property is not visible from this repository and is H8.**

Source: https://support.google.com/analytics/answer/3379636

---

## 6.12 — How every measurement below was taken

`AGENTS.md` §4 rule 6: the working tree is read-only for this agent, and sibling agents build
concurrently. Nothing here was measured in the repository.

| | |
|---|---|
| Copy | `git archive HEAD \| tar -x -C <scratchpad>/iso` — no `git worktree`, no ref written, no file in the repository touched. `node_modules` copied whole (1.4 GB), not symlinked. |
| Port | **3141**, confirmed free before binding. |
| Artifact | **`next build` + `next start`**, not `next dev`. |
| Network | Every request to `*.googletagmanager.com`, `*.google-analytics.com`, `*.analytics.google.com` and `*/g/collect` intercepted by Playwright and fulfilled locally. **No hit reached Google's servers and the property's data was not polluted by this gate.** |
| Viewport | 390 × 844 unless stated. |

**One negative result is recorded because it would otherwise be read as a product defect.** Under
`next dev` in this environment the page **never hydrates**: the HMR websocket fails
(`ERR_INVALID_HTTP_RESPONSE`), no `useEffect` runs, the banner never appears, the theme toggle does
nothing, and the standing privacy control renders only because it is the server-rendered branch of
`{!isVisible && …}`. Every one of those observations is **false about the product** — the production
build on the same machine, the same minute, renders the banner and responds to every control. This is
lesson **013** exactly, and this gate did not conclude "the banner does not render" from the run that
could not produce it.

---

## 7. L2 — the status of every consent already stored, and what is owed for it

> **This is the ruling the header calls binding.** Two prior gates ruled nothing was owed to users
> beyond a fix. This one rules something is, and the reason is that art. 9º § 1º does not describe a
> defect to be corrected going forward — it describes a **nullity that has already happened**.

### 7.1 — The unit, and its two independent triggers

art. 9º § 1º, verbatim from the fetched text:

> *"Na hipótese em que o consentimento é requerido, esse será considerado **nulo** caso as informações
> fornecidas ao titular tenham **conteúdo enganoso ou abusivo** **ou** não tenham sido **apresentadas
> previamente** com transparência, de forma clara e inequívoca."*

Two triggers joined by **ou**. Either one alone voids the consent. Both are executed below against
the build at `HEAD`, separately, because a reader who only checks one will think the other is the
argument.

### 7.2 — Trigger B, *not presented previously*: executed unit by unit

The only information presented before the decision is the banner at `cookie-consent.tsx:53-57`, plus
the two rows of the second-level dialog at `:110-111` and `:123-126`. Against the seven units of §6.2:

| Unit | Presented before the decision? | Where, or why not |
|---|---|---|
| **U1** *finalidade específica* | **Partially, and not *específica*** | *"melhorar sua experiência e entender como você usa o WorkLoad"* (`:55-56`). §6.6 U1 fixes what *específica* requires here; this is a category, not a purpose, and it does not distinguish measurement from advertising. |
| **U2** *forma e duração* | **No** | Nothing anywhere states a cookie, a lifetime, a recipient's retention or a storage location. |
| **U3** *identificação do controlador* | **No** | Nowhere in the application. `app/layout.tsx:27-29` is authorship metadata and §6.3 refuses to promote it. |
| **U4** *contato do controlador* | **No** | No address, form or channel exists in the repository. |
| **U5** *uso compartilhado* | **Partially** | *"Telemetria (Google Analytics)"* (`:124`) names a recipient — but only at the second level, only if the user presses *Configurar*, and with no statement of what is shared or where it goes. |
| **U6** *responsabilidades dos agentes* | **No** | Nothing. |
| **U7** *direitos do titular, com menção explícita ao art. 18* | **No** | Nothing. Not one of the nine rights is named anywhere in the tree. |

**Five of seven are absent outright and the two that are present are present in a form §6 rules
insufficient.** Trigger B is met, and it is met by a wide margin rather than on a borderline reading.

### 7.3 — Trigger A, *conteúdo enganoso*: executed, and **measured**

`components/organisms/calculator-views.tsx:75-76` renders, on the same page, in the same session, to
the same user: *"Nada é enviado para nenhum servidor."*

This gate did not reason about whether that is false in the consented state. **It measured it.**
With the real `gtag.js` loaded and every Google endpoint intercepted locally:

| Step | Requests to `google-analytics.com/g/collect` | Events carried |
|---|---|---|
| Page loaded, **no consent stored** | **0** | — |
| After *Aceitar Tudo* | **2** | `page_view`, `session_metadata` |
| After one theme toggle, still consented | **+1** | `toggle_theme` |

`session_metadata` carries, measured off the wire as the code assembles it:
`{"screen_width":390,"screen_height":844,"viewport_width":390,"viewport_height":844,"device_pixel_ratio":1,"user_language":"en-US","timezone":"America/Sao_Paulo"}`.

The instrument discriminates: **0 before consent, non-zero after.** It is not a guard that would pass
on an empty collection — the pre-consent row is the empty-collection control and it prints 0.

So in the consented state the application displays *"Nada é enviado para nenhum servidor"* while
sending seven device attributes and a persistent identifier to a server in the United States. That is
**conteúdo enganoso** in the art. 9º § 1º sense, presented by the same application, on the same
screen the user reached the consent from. **Trigger A is met independently of Trigger B.**

### 7.4 — The ruling

> **Every consent record written by `lib/consent.ts:21` before the page required by this spec is
> published is NULL under LGPD art. 9º § 1º.** Publishing the page does not cure it, because art.
> 9º § 1º voids the consent *at the moment it was given*, on information that was not presented then
> and cannot be presented retroactively.
>
> **art. 8º § 3º then applies**: *"É vedado o tratamento de dados pessoais mediante vício de
> consentimento."* Continuing to load Google Analytics on the strength of a null record is not merely
> unsupported — it is prohibited.

**The ratification clause of art. 8º § 5º does not save the past, and it is the unit a summary would
have used to argue that it does.** Verbatim: *"… **ratificados os tratamentos realizados sob amparo
do consentimento anteriormente manifestado** enquanto não houver requerimento de eliminação …"*.
Executed: the clause ratifies processing carried out **under the protection of** a consent. A consent
that art. 9º § 1º declares null never afforded any protection to ratify. The clause governs a valid
consent later revoked; it says nothing about one void from the start. **The past processing has no
basis, and the honest thing to say about it is §22 D6, not a ratification.**

### 7.5 — What the code must therefore do, stated as a rule and not as a patch

**The rule.** A stored consent record is treated as **absent** unless it carries a version identifier
equal to or greater than the version of the information presented by the published page at the time
it is read. A record treated as absent loads no third-party script, sets no third-party cookie, and
causes the consent surface to render.

**Why a version and not a date.** A date makes the rule depend on the deploy clock and on the reader
knowing when the page changed. A version identifier is the same operand art. 8º § 6º already makes
the controller responsible for — *"alteração de informação referida nos incisos I, II, III ou V do
art. 9º"* — so the field that invalidates the old consents is the same field that discharges the
standing duty to re-inform. One operand, two obligations.

**What this looks like to the returning user**, and it is the answer to `spec.md` **Q4**: a user who
accepted under the current banner sees the consent surface **once more**, against information that
now exists. That is the re-consent, and `spec.md` was right not to assert it.

**And it is not only §7's consequence.** art. 9º § 2º independently requires it if §8's advertising
category is added: *"se houver mudanças da finalidade … o controlador deverá informar previamente o
titular sobre as mudanças de finalidade, podendo o titular revogar o consentimento"*. Two units, one
remedy.

---

## 8. L3 — whether one consent act may carry both purposes

### 8.1 — art. 8º § 4º

*"O consentimento deverá referir-se a **finalidades determinadas**, e as **autorizações genéricas**
para o tratamento de dados pessoais **serão nulas**."*

Audience measurement and advertising are different purposes with different recipients' roles,
different cookies, different lifetimes and different consequences for the user. A single switch
labelled *Telemetria (Google Analytics)* that also authorised advertising would be an *autorização
genérica* as to advertising, and art. 8º § 4º makes it **null** — not weak, null.

### 8.2 — And art. 7º § 5º, which is stronger and settles it without a proportionality argument

*"O controlador que obteve o consentimento … que necessitar comunicar ou compartilhar dados pessoais
com **outros controladores** deverá obter **consentimento específico** do titular para esse fim."*

Google's published position for AdSense (S4): *"both you and Google operate as **independent
controllers** of personal data"*. AdSense is therefore, by the recipient's own statement, a sharing
with another controller — and art. 7º § 5º requires a **specific** consent for it, in its own terms,
regardless of how the purposes are worded.

### 8.3 — Marco Civil art. 7º IX, read this session, pointing the same way

*"consentimento expresso sobre coleta, uso, armazenamento e tratamento de dados pessoais, que deverá
ocorrer **de forma destacada** das demais cláusulas contratuais"*. It is an independent statutory
right of the user, and it does not depend on any of the LGPD units above.

### 8.4 — The ruling

> **One consent act may not carry both purposes.** The consent surface must present advertising as a
> **separately refusable category**, with its own state, from the moment the repository contains a
> code path capable of injecting the AdSense script — which it does, at
> `components/organisms/ad-manager.tsx:10-19`.
>
> **The condition is on the code path, not on `NEXT_PUBLIC_ENABLE_ADS`.** The human has ruled that
> ads are **off in production**. That removes today's live exposure; it does not remove the
> obligation, because the gate that protects the user must be the consent, not an environment
> variable that one deploy can flip without passing any gate at all.

**Two compliant shapes, and `tech-lead` picks one at G4** — this gate fixes the property, not the
mechanism:

1. **A second category.** The settings dialog gains an advertising row with its own state; the
   record carries both booleans; `ad-manager.tsx` reads the advertising boolean and injects nothing
   without it. *(Its geometry is `0010`'s budget — `spec.md` § Out of scope 3 already reserves the
   height and grants this gate the presence.)*
2. **Removal of the path.** If advertising is not going to be switched on, deleting the injection
   path discharges the obligation entirely and costs the surface nothing. This gate does not prefer
   it; it records that it is available and that it is the only shape with no new row.

**What may not be done:** injecting AdSense on the strength of the telemetry consent. That is
precisely the *autorização genérica* art. 8º § 4º voids and the missing *consentimento específico* of
art. 7º § 5º.

### 8.5 — *Aceitar Tudo*, and personalised ads

*"Aceitar Tudo"* is accurate only if pressing it accepts **every category the surface presents**. With
an advertising category added it remains accurate. With an advertising category **absent** while
advertising can be served, it is a label asserting completeness over a set that does not contain the
thing being authorised — and that is trigger A of art. 9º § 1º again.

**Whether the AdSense account serves personalised ads (H4's second half) is still unanswered**, and
the page's U1 cell for T4 (§6.7) cannot be written until it is. Both compliant texts:

| If the account serves | The T4 purpose the page states |
|---|---|
| **personalised ads** | *to show advertising and to choose which advertising to show, by building a profile of the reader's interests* — and the art. 18 rights section must then also mention art. 20's right regarding automated decisions about one's profile. |
| **non-personalised ads only** | *to show advertising, chosen by the page's content and not by a profile of the reader* — and the page must not claim more privacy than the account setting delivers. |

---

## 9. L4 — what the consent record must carry

### 9.1 — The burden

art. 8º § 2º: *"Cabe ao controlador o **ônus da prova** de que o consentimento foi obtido em
conformidade com o disposto nesta Lei."* Note the object: not *that consent was given*, but that it
was **obtained in conformity with this Law** — which, via art. 9º § 1º, includes *what information
was presented before it*. A record that proves a click but not what the click was shown proves the
wrong proposition.

### 9.2 — What the record carries today, measured

Read off `localStorage` in the built artifact, not off the source:

```
after "Aceitar Tudo"   : {"telemetry":true,"timestamp":1789821820158}
after "Recusar"        : {"telemetry":false,"timestamp":1789821838736}
```

Two fields. **No version, no per-purpose granularity, no reference to what was shown.**

### 9.3 — The required fields

The **fields** are this gate's; their names and their serialisation are `tech-lead`'s at G4.

| Field | Why it is required | Unit |
|---|---|---|
| **the version of the information presented** | Without it the controller cannot state which text the user agreed to, and §7.5's invalidation rule has no operand. | art. 8º § 2º + art. 9º § 1º + art. 8º § 6º |
| **one boolean per purpose**, telemetry and advertising, independently | A single boolean cannot record a refusal of one purpose and an acceptance of the other. | art. 8º § 4º, art. 7º § 5º |
| **the moment of the manifestation** | Already present, and it is what makes §14.3's expiry computable. | art. 8º § 2º |

**Nothing else.** In particular: **no identifier of the user, no fingerprint, no IP, and no hash of
either.** A record built to prove consent must not become a new processing operation of its own —
art. 6º III. This is an explicit prohibition, not an omission, because "make the proof stronger" is
exactly the direction a well-meaning implementation drifts in.

### 9.4 — The honest limit, which the page must state rather than paper over

The record lives in `localStorage`, on the user's device. **The controller cannot read it, cannot
produce it on demand, and cannot audit it.** `PRODUCT.md` §7 forbids the account and the backend that
would change that, and this gate does not reopen §7.

So the art. 8º § 2º burden is discharged here by the only three things that are actually in the
controller's hands, and the page says so:

1. the **published, versioned, dated page** — evidence of what was presented;
2. the **code gate** — evidence that no third-party script can load without an affirmative record,
   which `__tests__/analytics-wrapper.test.tsx:21,27,34` already assert for the three negative cases;
3. the **record on the device** — evidence available to the user, who can show it.

**This is weaker than a server-side consent log and the page must not imply otherwise.** §22 **D4**.

---

## 10. L5 — revocation, measured against the code that runs after the click

> `0010` `legal.md` §2 read art. 8º § 5º as satisfied. **It read the control, not the consequence.**
> This gate rendered the state and measured what happens after the click, and the ruling changes.

### 10.1 — The unit

art. 8º § 5º: *"O consentimento pode ser revogado **a qualquer momento** mediante manifestação
expressa do titular, por **procedimento gratuito e facilitado** …"*. Three properties: *a qualquer
momento*, *gratuito*, *facilitado*. Plus art. 18 IX, which makes revocation a right in its own name.

### 10.2 — What was measured

| # | Measurement | Result |
|---|---|---|
| R1 | Standing revocation control present after consent, at 390×844 | **Yes.** `getBoundingClientRect()` = `{x:330, y:784, width:44, height:44}` — inside the layout viewport, above the safe-area inset. |
| R2 | Present after *Recusar* as well | **Yes**, same box. |
| R3 | Interactions from an arbitrary screen to a recorded revocation | **3** — shield, switch, *Salvar Preferências*. |
| R4 | Cost | **Zero.** No account, no form, no e-mail. |
| R5 | Record written | `{"telemetry":false,"timestamp":…}` — correct value. |
| R6 | `script[src*="googletagmanager.com"]` in the document **after** the revocation | **1 — still there.** |
| R7 | `typeof window.gtag` after the revocation | **`"function"` — still callable.** |
| R8 | New `g/collect` requests caused by **one instrumented interaction after the revocation** | **1**, carrying `en=toggle_theme` |
| R9 | The same interaction **before** the revocation, as the discriminating control | **1**, carrying `en=toggle_theme` |
| R10 | Cookies matching `^_ga` readable on the origin after the revocation | **`_ga`, `_ga_5BP2MQK9TG` — both still present** |
| R11 | Code path anywhere in the tree that deletes a cookie | **None.** `grep -rn "document.cookie" app components lib hooks` → no rows. The only deletions in the tree are `localStorage.removeItem` at `lib/storage.ts:31` and `hooks/use-gross-hourly-rate.ts:11`. |
| R12 | State after a **reload** while revoked | `script[src*="googletagmanager.com"]` = **0**, `window.dataLayer` undefined — the gate at `analytics-wrapper.tsx:12` works on the **next** document. |

**R8 and R9 are the pair that makes this a finding rather than an opinion**, and they are stated
together deliberately: the instrument prints **1** in the consented state and **1** in the revoked
state, and prints **0** before any consent. It discriminates between "transmitting" and "not
transmitting", and it reports the revoked state as **indistinguishable from the consented one**.

### 10.3 — The ruling

> **Revocation is *gratuito* and *facilitado*. It is not *effective*.** For the remainder of the
> document in which it is made, the application keeps a loaded Google tag and keeps feeding it: every
> one of the eight `safeGAEvent` call sites in §6.1 continues to transmit, because
> `lib/analytics.ts:11` never reads the consent record and `components/organisms/analytics-wrapper.tsx`
> unmounts a React component without removing the script it caused to be injected.
>
> A revocation that the user performs, that the application records, and that the application then
> ignores for the rest of the session is not a revocation *a qualquer momento* — it is a revocation
> at the next page load, which is a moment the user does not choose.

**And art. 5º XIV closes the escape.** *"eliminação: exclusão de dado ou de conjunto de dados
armazenados … **independentemente do procedimento empregado**"*. "The cookies are Google's" is not an
answer for the two cookies this site's own origin can read and delete.

### 10.4 — The rule, in the quantity its substance can be breached in

Three clauses. **The first carries the substance**; the second and third are the measurable
tripwires, and a borderline reading of either never decides the verdict alone.

- **RV1 — substance.** From the instant a revocation is recorded, this application causes no further
  personal data to reach Google, in that document or any later one, until a new affirmative consent
  for that purpose is recorded.
- **RV2 — transmission, measured.** Over the same document in which the revocation was recorded,
  after at least one instrumented interaction has been driven at **each** of the eight `safeGAEvent`
  call sites enumerated in §6.1: **zero** network requests whose URL host matches
  `(^|\.)google-analytics\.com$`, `(^|\.)analytics\.google\.com$` or `(^|\.)googletagmanager\.com$`.
  The guard asserts **8** call sites exercised before asserting 0 requests; `exercised + exempt = 8`
  with every exemption named. *A run that exercises zero call sites and reports zero requests is a
  vacuous pass and `AGENTS.md` §5 forbids signing against it.*
- **RV3 — residue, measured.** 1 000 ms after the revocation record is written, the count of entries
  in `document.cookie` on the application's own origin whose name matches `^_ga` is **0**. Measured
  today it is **2** (`_ga`, `_ga_5BP2MQK9TG`), which is the known-bad value and makes the guard
  falsifiable in both directions.

**What the app cannot do, and must therefore say.** Deleting the two first-party cookies does not
delete what Google already holds. The page states that, names art. 18 VI as the route, and names
Google as the party the request must also reach — §22 **D6**. Silence here would be a claim that
revocation undoes the past, which is the same defect as §7.3 in the opposite direction.

---

## 11. L6 — art. 18, and what *menção explícita* means

art. 9º VII requires *"direitos do titular, com **menção explícita** aos direitos contidos no art. 18
desta Lei"*. *Explícita* is the operative word: a sentence saying *"você tem os direitos previstos na
LGPD"* names none of them and satisfies no part of the unit.

**The nine, verbatim from the fetched text, each with what it means here.** The page carries all
nine; `content-writer` may compress the wording, never the set.

| Inciso | Verbatim | What it amounts to in this application |
|---|---|---|
| I | *confirmação da existência de tratamento* | Answerable for T1–T5; the page itself is most of the answer. |
| II | *acesso aos dados* | For T1/T2 the user already holds the data on their device. For T3/T4 the controller must pass the request to Google. |
| III | *correção de dados incompletos, inexatos ou desatualizados* | The user edits the fields directly. |
| IV | *anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade* | The route for the data collected under the null consents of §7. |
| V | *portabilidade dos dados a outro fornecedor* (redação da Lei nº 13.853/2019) | No provider relationship exists; the page says so rather than omitting the inciso. |
| VI | *eliminação dos dados pessoais tratados com o consentimento do titular, exceto nas hipóteses do art. 16* | The one that matters most here — §10.4 and §22 D6. |
| VII | *informação das entidades públicas e privadas com as quais o controlador realizou uso compartilhado* | **Google LLC** and **Vercel Inc.** Naming them on the page discharges this in advance. |
| VIII | *informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa* | The page states what refusing changes and what it does not: the calculator works identically, and the host still receives the request. |
| IX | *revogação do consentimento, nos termos do § 5º do art. 8º* | §10, and the standing control measured at R1. |

**Four further units, each of which the page must carry and none of which is in the list of nine:**

- **art. 18 § 1º** — the right to **petition the ANPD**. Written *Agência* Nacional de Proteção de
  Dados (PR7, §6.11).
- **art. 18 § 2º** — the right to **oppose** processing carried out without consent where the Law is
  not complied with. It attaches to T1 and T5, and it must be stated, because a reader who sees only
  the consent categories will conclude they have no say over the rest.
- **art. 18 §§ 3º–5º** — requests are made by *requerimento expresso*; where the controller cannot act
  immediately he must **answer saying why** (§ 4º II); and the whole thing is **"sem custos para o
  titular"** (§ 5º).
- **art. 19 II** — where the request is for confirmation or access, the *declaração clara e completa*
  is due **"no prazo de até 15 (quinze) dias, contado da data do requerimento"**. This is a **number
  the page states**, and it is the only deadline in this entire analysis.

### 11.2 — The consequence for H2

A channel that is published and not read converts art. 18 § 4º from a duty into a false statement.
**H2 is not a formality and it is not satisfiable by an address that forwards nowhere.** The
obligation the human accepts with H2 is a **15-day answer**, and §24 states it in those terms so it
is accepted knowingly.

---

## 12. L7 — which operands are *dados pessoais*, and whether any is *sensível*

### 12.1 — The test

art. 5º I: *"dado pessoal: informação relacionada a pessoa natural **identificada ou identificável**"*.
*Identificável* is the operative word, and it is satisfied by a combination, not only by a name.

### 12.2 — The P5 set, and why it is personal even though no field is a name

| Operand | Alone | In the set as transmitted |
|---|---|---|
| `screen_width`, `screen_height`, `viewport_width`, `viewport_height`, `device_pixel_ratio` | not identifying | |
| `user_language`, `timezone` | not identifying | |
| the request's **IP address** | identifying in combination | |
| the **`_ga` client identifier**, persistent for 2 years | **the one that closes it** | |

Each event is transmitted **with** the `_ga` identifier and **from** an IP address. The identifier is
stable across visits by design — Google's own description is *"Used to distinguish users"* (S4). A set
of device attributes bound to a stable per-browser identifier relates to *a natural person who is
identifiable*, and **art. 5º XI settles the objection**: anonymisation requires that the datum lose
the possibility of association *"direta ou indireta"* with an individual. An identifier whose stated
function is to restore the association is the opposite of that.

> **Every operand in P5 is *dado pessoal*.** The page describes the set; it does not describe it as
> anonymous.

### 12.3 — art. 6º III, which bites independently of consent

*"necessidade: limitação do tratamento ao **mínimo necessário** para a realização de suas
finalidades, com abrangência dos dados pertinentes, proporcionais e **não excessivos** em relação às
finalidades"*.

Consent does not switch this principle off; art. 6º applies to *todas as atividades de tratamento*.
So the question is not whether the user agreed, but whether seven device attributes are the minimum
for the purpose the app states.

**The finding is not "seven is too many" — no norm says that.** It is this: **the repository states no
purpose for any individual operand.** `components/organisms/app-header.tsx:16-24` transmits
`device_pixel_ratio` and `timezone` with no recorded reason anywhere in `PRODUCT.md`, `DESIGN.md` or
the spec set. An operand with no stated finalidade cannot be *proporcional em relação às
finalidades*, because there is no finalidade to be proportional to. **F5**, and the remedy is
symmetric: name the purpose each operand serves, or drop the operand. Either way the page states the
set that survives.

### 12.4 — The P2 storage, and the negative ruling that keeps the page honest

The gross salary, the number of dependants, the manual INSS and IRRF overrides, the working days per
week — these relate to an identified natural person, they are stored (art. 5º X: *armazenamento* is
*tratamento*), and they are therefore **dados pessoais being treated**, notwithstanding that they
never leave the device. §13.1 gives the basis.

**And they are not *dados pessoais sensíveis*.** art. 5º II is a **closed list**: *origem racial ou
étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter
religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou
biométrico*. Salary is not in it. Neither is the number of dependants, nor the work regime.

> **Ruled explicitly, because the failure here is over-claiming.** The page must not describe the
> salary as *dado sensível*. It is the most private thing this application touches and it is not what
> art. 5º II means, and a page that inflates the category teaches its reader a wrong rule about their
> own rights — which is `PRODUCT.md` §7's *no legal advice* line crossed from the generous side.

**One adjacent operand deserves the same negative ruling.** The *Estatutário* regime option records
that the user is a public servant. Public-service status is not *filiação a sindicato*, not an
*opinião política*, and not on the list. Not sensitive.

---

## 13. L8 — the basis for every operation that is not consent

| Op | Basis | The unit, and the test it has to pass |
|---|---|---|
| **T1** calculator inputs on the device | **art. 7º IX — legítimo interesse** | art. 10 requires *"finalidades legítimas, consideradas a partir de situações concretas"*, and the balancing in art. 7º IX excepts the case *"em que prevaleçam direitos e liberdades fundamentais do titular"*. Executed: the purpose is the **user's own** — their numbers survive a reload; the controller has **no access** to the data; it reaches **no third party**; and the user can delete it unilaterally. There is no configuration of this operation in which the titular's rights prevail against it. **Basis holds.** |
| **T2** the consent record | **art. 7º II — cumprimento de obrigação legal** | The obligation is art. 8º § 2º itself. This is the basis that lets the record be kept **even when the user refuses**, which would otherwise be the awkward case: refusing telemetry does not delete the record of the refusal, and the page says why. |
| **T5** the host receiving the request | **art. 7º IX — legítimo interesse** | Delivering a page the user requested, and keeping the service available and secure. Unavoidable: it happens **before** any consent surface renders and regardless of the answer. |

### 13.1 — And the consequence for the *Cookies Essenciais* row

`components/organisms/cookie-consent.tsx:110-111` renders *"Cookies Essenciais"* / *"Necessários para
o funcionamento do site."* against a fixed *"Sempre ativo"*. Two assertions, both examined:

1. **"Cookies."** The application sets **no first-party cookie of its own**. T1 and T2 are
   `localStorage`. The label names the wrong technology, and it names the one the reader has been
   trained to associate with tracking.
2. **"Necessários para o funcionamento do site."** **False.** The calculator computes identically
   with `localStorage` empty — the defaults at `hooks/use-work-calculator.ts:12-14` and
   `hooks/use-salary-calculator.ts:30-34` are what a first-time visitor gets, and every number on the
   screen is produced from them. What the storage buys is that the user does not retype; that is
   **convenience the user benefits from**, which is exactly why art. 7º IX supports it — and it is
   not necessity.

> **F7.** The row asserts a necessity that does not exist, in order to explain why a control is
> disabled. Under art. 9º § 1º that is *conteúdo enganoso* on the very surface where consent is
> collected. The truth condition (§20.2) is: the row states **what is kept, where, and that it goes
> nowhere**, and it states the basis is the user's own convenience rather than necessity — and
> therefore also states, per art. 18 § 2º, that the user may **oppose** it and how (clearing the
> site's data).

---

## 14. L9 — retention, one period per operation, each one derived

art. 6º IV makes the **duration** a mandatory subject of *livre acesso*; art. 9º II makes it a
mandatory unit of the page; art. 16 caput caps everything: *"Os dados pessoais serão eliminados após
o término de seu tratamento"*, subject to four exceptions none of which applies here.

| Op | Period the page states | How it is derived |
|---|---|---|
| **T1** | **Until the user removes it.** | Indeterminate — and admissible **only** because the user holds the sole control and the controller holds none. §14.1 states what that costs the page. |
| **T2** | **24 months** from the moment recorded. | §14.3. Derived from an operand, not chosen. |
| **T3** cookies | **`_ga` 2 years; `_ga_<measurement-id>` 2 years** | S4, Google's own published lifetimes. Measured present on the origin as `_ga` and `_ga_5BP2MQK9TG` (§10.2 R10). |
| **T3** data at Google | **the value configured on the property — 2 or 14 months** | S4 gives the option set; **which one is configured is H7**, and the page states the configured value, never the range. A page printing *"2 ou 14 meses"* is telling the reader the controller does not know his own setting. |
| **T4** cookies | **`__gads` 13 months · `__gpi` 13 months · `IDE`/`ANID` 24 months** | S4. §6.7 already rules that the **24-month** figure is the one this page states, because the 13-month EEA/UK value would understate the retention for every reader this page has. |
| **T5** host logs | **the retention of the plan in force** | **H7.** Not inferable from the repository. |

### 14.1 — What an indeterminate T1 period obliges, and it is not a sentence

*"Until you clear it"* is a true duration and a useless one unless the reader can act on it. art. 6º IV
requires *consulta facilitada e gratuita sobre a forma e a duração*; art. 18 IV and VI require the
elimination to be reachable. So the page carries, next to the period:

1. **What is stored, by what it holds** — the nineteen kinds of value in §6.4 U2 as corrected by
   §6.10, not the key strings, which mean nothing to the reader;
2. **How to remove it** — the browser's own site-data clearing, named as the mechanism, since
   `PRODUCT.md` §7 forbids the account that would offer a button;
3. **What removing it costs** — the stored numbers, and nothing else. No account is lost because
   there is none.

### 14.2 — The one key a returning user still has, and the app deletes without telling them

`hooks/use-gross-hourly-rate.ts:11` calls `localStorage.removeItem(LEGACY_HOURLY_RATE_KEY)` —
`"hourlyRate"` (`lib/storage.ts:1`) — on every load. It is the only deletion of a user value in the
tree, and it is **correct**: the app stopped using the key and removes it.

It is excluded from §6.10's inventory of nineteen because it is never written. **But a user who
last opened the app before that change still has it on their device until the next visit**, and the
page's T1 paragraph must therefore be written so it is true for them too: *what the app stores today*
plus *one value it no longer uses and deletes the next time you open it*. One clause, and it is the
difference between a description of the code and a description of the reader's device.

### 14.3 — Where T2's **24 months** comes from, stated so a second analyst reaches the same number

**No norm fixes a consent lifetime in Brazil.** The LGPD sets none, the ANPD guidance sets none, and
this gate will not invent one. So the period is derived from the operands actually in play, and the
derivation is stated rather than the conclusion:

1. art. 16 caput: data is eliminated **after the end of its treatment**. The consent record's
   treatment ends when the consent it records has no subject left.
2. The record authorises exactly two things: the loading of the Google tag, and the cookies that
   loading sets.
3. The **longest-lived artefact the consent authorises** is `_ga` / `_ga_<measurement-id>`, at
   **24 months** (S4).
4. A record shorter than that leaves live cookies standing on a consent that has expired. A record
   longer than that carries a permission for processing whose last trace has already died.

> **T2 = 24 months**, because it is the only value that makes the record's life equal the life of what
> it authorises. **The operand is Google's `_ga` lifetime, and it is named in the page.** If Google
> changes that lifetime, this number changes with it — which is `PRODUCT.md` §7's maintenance test
> (H5) made concrete and checkable rather than rhetorical.

**On expiry the record is treated as absent** — the same treatment §7.5 gives a stale version — so
the consent surface renders again. Two operands, one code path.

---

## 15. L10 — international transfer

### 15.1 — That it happens is measured, not assumed

The intercepted request URL, off the wire in the isolated copy:
`https://www.google-analytics.com/g/collect?v=2&tid=G-5BP2MQK9TG&…`. Google LLC is in the United
States; Vercel Inc. is in the United States. art. 5º XV: *"transferência internacional de dados:
transferência de dados pessoais para país estrangeiro ou organismo internacional"*. Both qualify.

### 15.2 — art. 33 executed, inciso by inciso, against **each** recipient

**This is the sweep across the input domain that §5 requires**, and the table is written that way
because the two recipients sit on different bases and a single row would have hidden it.

| Inciso | T3/T4 — Google LLC (consent-based) | T5 — Vercel Inc. (art. 7º IX) |
|---|---|---|
| **I** — adequate country or organisation | **Closed.** The ANPD's only adequacy decision is the **European Union**, Resolução CD/ANPD nº 32/2026 (S7). The United States is not on the list. | **Closed**, same reason. |
| **II a/b/c** — specific clauses, cláusulas-padrão, normas corporativas globais | **Available**, if the controller has and can prove the instrument. For Google Analytics that instrument is the **Google Ads Data Processing Terms**, which S9 shows must be **proactively accepted in Account Settings** outside the EEA/UK/Switzerland. **H8.** | **Available**, on the host's own terms. **H8.** |
| **II d** — selos, certificados, códigos de conduta | Not established. | Not established. |
| **III, IV, VI, VII** | Not applicable — no judicial cooperation, no threat to life, no international agreement, no public policy. | Same. |
| **V** — ANPD authorisation | Not sought. | Not sought. |
| **VIII** — the titular's **specific and highlighted** consent **for the transfer**, with prior information about its international character, **clearly distinguished from other purposes** | **Available, and it is a UI obligation.** Today no surface mentions a transfer, a country or a recipient's location, so this route is **not open on the current build**. | **Not available.** The user cannot refuse being served the page they requested; a consent conditioned that way would fail art. 5º XII's *livre*. |
| **IX** — necessary for art. 7º **II, V or VI** | Not applicable. | **Closed, and this is the unit a fast reading loses.** Inciso IX enumerates *II, V e VI* of art. 7º. T5's basis is **art. 7º IX**, which is **not in the list**. **Legítimo interesse does not carry an international transfer by itself.** |

### 15.3 — The ruling

> **Both transfers need a route under art. 33 and neither route is established in this repository.**
> For Google the live candidates are **II b** and **VIII**; for Vercel only **II b**, because IX does
> not reach art. 7º IX and VIII cannot be freely given for an operation the user cannot decline.
>
> Resolução CD/ANPD nº 19/2024's parágrafo único required agents already transferring under
> contractual clauses to incorporate the ANPD's **cláusulas-padrão** within **12 months of
> 2024-08-23** — a deadline that **elapsed on 2025-08-23**. Where the II b route is the one relied
> on, that is the standard it is measured against today, not a future one.

> **AMENDED AT RUN 3 BY §26.4, inline at the gate that found the error.** The ruling above is
> **right about the absence of an established route and wrong about T5's characterisation**.
> Resolução CD/ANPD nº 19/2024, Anexo I, **art. 6º** — *"A coleta internacional de dados não
> caracteriza transferência internacional de dados"* — is an operative unit this gate quoted no part
> of at run 2, and it removes T5 from art. 33 altogether. **T3/T4 stand on art. 33 VIII.** §26.4
> executes every unit and states the ambiguity it resolves and the operand it assumes.

**F8.** Routed to the human as **H8**, because the answer is in a Google account settings screen and
a hosting contract, neither of which is in the tree. **It does not block this gate** — the page's
obligation is the same under either route:

**What the page states either way**, and this part is settled here:

1. the data goes to **the United States**;
2. **Brazil has recognised no adequacy decision for the United States** — stated as a fact about the
   destination, not as a warning, and not as legal advice (`PRODUCT.md` §7);
3. the recipients, by name: **Google LLC** and **Vercel Inc.** (art. 18 VII, discharged in advance);
4. **that refusing cookies does not stop the transfer to the host**, because the request reaches
   Vercel before any surface renders. §22 **D7**.

---

## 16. L11 — Google's role, per product, and why the two paragraphs must not merge

| Product | Role | Source | What the page must therefore say |
|---|---|---|---|
| **Google Analytics (T3)** | ***operador*** — processing on the controller's instructions | The instrument is the **Google Ads Data Processing Terms** (S9). Outside the EEA/UK/Switzerland they are **not automatic**. | Google acts on the controller's instructions; the controller answers for the decision to use it and is the first address for any request. **Conditional on H8** — if the terms are not accepted on this property, the page may not assert the processor relationship, and §24 Q3 states what it says instead. |
| **Google AdSense (T4)** | ***controlador independente*** — Google's own published words | S4: *"both you and Google operate as **independent controllers** of personal data"* · *"We operate as a controller because we regularly make decisions on the data to deliver and improve the product."* | Google decides **for itself** what it does with the advertising data; a request about that data must reach **Google as well as** this controller; and the controller cannot answer for Google's own processing. |

> **The two paragraphs must not be merged into one "Google" section**, and this is a rule, not a
> preference. art. 9º VI requires *responsabilidades **dos agentes***, plural and per agent. A merged
> paragraph asserts one role for two relationships and gets one of them wrong whichever role it
> picks — and it gets it wrong in the direction that matters, because the reader's remedy differs:
> against an *operador* the reader goes to the controller; against an independent *controlador* the
> reader must also go to Google.

**Vercel (T5)** is an *operador* — art. 5º VII, *"realiza o tratamento … em nome do controlador"*. The
controller answers for the choice of host. One sentence, and it must exist, because T5 is the only
operation in §6.1 with no line number in this repository (**F6**) and is therefore the one every
code-derived description omits.

---

## 17. L12 — the Marco Civil, and it is **not** the "does not apply" the spec allowed for

`spec.md` **L12** explicitly permits this gate to rule that the Marco Civil does not apply. It does
apply, and the human's ruling on the controller's legal form is what makes the answer clean in both
directions.

### 17.1 — art. 15: does **not** bind, and the reason is the controller's legal form

Verbatim: *"O provedor de aplicações de internet **constituído na forma de pessoa jurídica** e que
exerça essa atividade de forma organizada, profissionalmente e com fins econômicos deverá manter os
respectivos registros de acesso a aplicações de internet … pelo prazo de **6 (seis) meses**."*

Three cumulative conditions. The first — *constituído na forma de pessoa jurídica* — **fails**: the
human has ruled the controller is a **natural person**. art. 15 caput imposes no log-retention duty
here, and the other two conditions are not reached.

> **This is the one place in this file where the human's ruling changes an outcome rather than
> confirming one**, and it changes it in the user's favour: there is no six-month statutory retention
> obligation pulling against art. 16's *eliminação após o término do tratamento*.

**Two clauses survive the failure and the page must not imply otherwise.** art. 15 § 1º: a judicial
order may compel a provider **outside** the caput to retain access records for a fixed period. art.
15 § 2º: police, administrative authority or the Ministério Público may request cautionary retention.
The page says the controller keeps no access log of its own and that a judicial order can require
one — it does not say *"we never keep logs"*, which would be a promise the controller cannot keep.

### 17.2 — art. 7º: **binds**, and three of its incisos reach this page directly

art. 7º assures rights **to the user**. It is not conditioned on the provider's legal form, and
nothing in this analysis may treat §17.1's result as disposing of it.

| Inciso | Verbatim | Effect here |
|---|---|---|
| **VII** | *"não fornecimento a terceiros de seus dados pessoais … salvo mediante consentimento **livre, expresso e informado** ou nas hipóteses previstas em lei"* | A second statutory footing for §7 and §8, independent of the LGPD: the sharing with Google needs a consent that is *informado*, and §7.2 measured that it was not. |
| **VIII** | *"informações claras e completas sobre coleta, uso, armazenamento, tratamento e proteção de seus dados pessoais, que somente poderão ser utilizados para finalidades que: a) justifiquem sua coleta; b) não sejam vedadas pela legislação; e c) **estejam especificadas nos contratos de prestação de serviços ou em termos de uso de aplicações de internet**"* | **Alínea c is the sharpest unit in this section.** A purpose that is not specified in the application's own published terms may not be pursued at all. Today none is specified anywhere, so every purpose in §6.1 is unspecified in the art. 7º VIII c sense. |
| **IX** | *"consentimento expresso … que deverá ocorrer de forma **destacada** das demais cláusulas contratuais"* | Reinforces §8.4's separately-refusable advertising category. |
| **XI** | *"**publicidade e clareza** de eventuais políticas de uso dos provedores de conexão à internet e de aplicações de internet"* | **A user right to a published, clear usage policy, assured by statute since 2014.** It is the second independent legal footing for this entire spec, and it does not depend on a single LGPD article. |

### 17.3 — art. 11, which applies to the recipients and not only to this app

*"Em qualquer operação de coleta, armazenamento, guarda e tratamento de registros, de dados pessoais
ou de comunicações por provedores de conexão e de aplicações de internet **em que pelo menos um
desses atos ocorra em território nacional**, deverão ser obrigatoriamente respeitados a legislação
brasileira e os direitos à privacidade, à proteção dos dados pessoais e ao sigilo …"*, with § 2º
extending it to *"pessoa jurídica sediada no exterior, desde que oferte serviço ao público
brasileiro"*.

Collection happens on a browser in Brazil. **Brazilian law governs the whole chain**, including
Google's and Vercel's parts of it. This is what lets §15's art. 33 analysis be asserted against
foreign recipients at all.

> **Ruling on L12: the Marco Civil applies, art. 15's retention duty does not, and arts. 7º VIII c
> and 7º XI are independent statutory grounds for the page.** The page cites the LGPD; it need not
> cite the Marco Civil by number, and `content-writer` is not required to. This gate records the
> footing so a later reviewer does not reopen L12 on the assumption that it was skipped.

---

## 18. L13 — the ANPD cookie guidance, and which of its items bind

S3 is **not a norm**, and `0010` §2 R5's ruling on its weight stands. Its function here is precise:
it is the **regulator's published expectation**, and the art. 8º § 2º burden is discharged before a
regulator who has published one. An item of guidance the controller departs from is a departure he
may be asked to justify; it is not, by itself, an illegality.

| Item | Status here | Why |
|---|---|---|
| A refusal option at the **same level** as the acceptance option | **Already met, and measured.** `Recusar` and `Aceitar Tudo` sit in the same row at `cookie-consent.tsx:68-73`, both reachable in one interaction. | — |
| A **second-level** granular surface | **Already met.** `cookie-consent.tsx:81-154`. | — |
| An **easy-access link** to the policy from the banner | **Not met — measured at 0 links** on the banner, 0 in the settings dialog, and 1 in the footer which resolves to `https://www.legisweb.com.br/legislacao/?id=489284`, the Portaria. **F11.** | This item is **not merely guidance here**: art. 9º § 1º requires the information to be *apresentada previamente*, and a link is the mechanism by which it is. |
| A **direct, simplified, dedicated** mechanism to change one's mind later | **Met in form** (§10.2 R1–R4), **failed in effect** (§10.3). | — |
| Consent **not pre-ticked** | **Not met.** §20. | And this one **is** a norm — art. 5º XII's *inequívoca* — so it is ruled there, not here. |

> **Ruling on L13: two of the guidance's five expectations are unmet, and both of them coincide with
> a binding unit of the Law.** Where guidance and norm coincide, the verdict rests on the norm, and
> §21's findings cite the norm. The guidance is cited for what it is: the measure of what a regulator
> considers ordinary practice.

---

## 19. L14 — the *encarregado*, settled without the human

Three units, executed in order.

1. **art. 41 caput**: *"O controlador **deverá indicar** encarregado pelo tratamento de dados
   pessoais."* The default is mandatory appointment.
2. **art. 41 § 3º**: *"A autoridade nacional poderá estabelecer normas complementares … inclusive
   **hipóteses de dispensa** da necessidade de sua indicação, conforme a natureza e o porte da
   entidade ou o volume de operações de tratamento de dados."* A delegation.
3. **Resolução CD/ANPD nº 2/2022, Anexo I, art. 11**: *"Os agentes de tratamento de pequeno porte
   **não são obrigados a indicar o encarregado** … § 1º O agente de tratamento de pequeno porte que
   não indicar um encarregado **deve disponibilizar um canal de comunicação com o titular de dados**
   para atender o disposto no art. 41, § 2º, I da LGPD."* The delegation exercised.

**Is this controller a small agent?** Anexo I art. 2º I names **pessoas naturais** expressly (§6.11),
and the human has ruled the controller is one. Then art. 3º's three exclusions:

| Exclusion | Applied |
|---|---|
| **I — high-risk treatment** (art. 4º: **one general and one specific** criterion, cumulatively) | **Not met today.** Specific criterion (c) — *"decisões tomadas unicamente com base em tratamento automatizado … destinadas a definir o perfil pessoal, profissional, de saúde, de **consumo**"* — would be met by **personalised** AdSense. But ads are **off in production** by the human's ruling, and the general criteria are not met either: not *larga escala* under art. 4º § 1º's test, and audience measurement of a calculator does not *afetar significativamente interesses e direitos fundamentais*. **Cumulative, so one absent criterion is enough.** |
| **II — gross revenue above the LC 123 art. 3º II limit** | Not met. |
| **III — economic group above the same limit** | Not met. |

> **Ruling on L14, and it closes H3 without the human:** **no *encarregado* is required.** What **is**
> required is Anexo I art. 11 § 1º's **canal de comunicação com o titular**, published — which is
> **H2**, already open. H3 is therefore **resolved, not pending**, and `STATUS.md` records it as such.
>
> **The condition under which this flips, stated so it is checkable rather than forgotten:** if
> personalised AdSense is switched on **and** the audience reaches art. 4º § 1º's *larga escala*, art.
> 3º I removes the small-agent regime and art. 41 caput's duty returns in full. That is a standing
> item for whoever owns H5's maintenance obligation, and §24 records it.

---

## 20. L15 and L16 — the opening state of the switch, and the truth condition for every admitted string

### 20.1 — L15: the compliant default is **false**, and the current default was measured producing an invalid consent

art. 5º XII defines consent as *"manifestação **livre, informada e inequívoca** pela qual o titular
concorda … para uma **finalidade determinada**"*. Four properties. Executed against
`components/organisms/cookie-consent.tsx:15`, `useState(true)`:

| Property | The pre-enabled switch |
|---|---|
| **livre** | Arguably — the user could have toggled it. |
| **informada** | Fails for §7.2's reasons, independently of the default. |
| **inequívoca** | **Fails.** The measured path: open the settings dialog, press *Salvar Preferências*, touch nothing. Recorded: `{"telemetry":true,"timestamp":1789821833846}`, and `script[src*="googletagmanager.com"]` = **1**. The user performed **no act directed at telemetry at all**, and the application recorded an agreement to it. An agreement inferred from the absence of an act is the definition of equivocal. |
| **para uma finalidade determinada** | Fails under §8. |

**One property is enough, and *inequívoca* is the one.** The ANPD guidance's expectation that consent
not be pre-ticked (§18) points the same way and is not what the ruling rests on.

> **Ruling on L15:** the compliant opening state of every non-essential category is **`false`**. The
> user who saves without touching anything must be recorded as having **refused**, and no third-party
> script may load on that record.
>
> **The rule, not the line:** no consent-bearing control in this application opens in the accepting
> state, and `AC9`'s guard asserts the recorded value for the save-without-touching path rather than
> the initial value of a React state variable — because the initial value is an implementation detail
> and the recorded value is the legal fact.

**This is `0010` F2a, and it is now measured rather than read.** `0010` inferred it from
`useState(true)`; this gate drove the path and read the record it produces.

### 20.2 — L16: what each admitted string must **say**

`spec.md` D3 admits **7 strings in 6 entries** (§3.1). Each is ruled here against **the state it
actually renders in**, which is the whole point — a string is not true or false in the abstract.

| # | Where | Renders in | Verdict | The truth condition |
|---|---|---|---|---|
| 1 | `cookie-consent.tsx:53` *"Respeitamos sua privacidade"* | banner, pre-decision | **A stance, not a claim.** No truth condition. | May stay. It asserts nothing falsifiable, and §22 D1 governs what sits under it. |
| 2 | `cookie-consent.tsx:55-56` *"Usamos cookies para melhorar sua experiência e entender como você usa o WorkLoad. Você pode optar por desativar a telemetria a qualquer momento."* | banner, pre-decision | **Both halves defective.** *"melhorar sua experiência"* is not a *finalidade específica* (art. 9º I; §6.6 U1). *"a qualquer momento"* is **measurably false** — §10.3 shows the revocation does not take effect until the next document. | The purpose sentence names the **measurement** purpose and, separately, the **advertising** purpose, distinguishably. The revocability sentence is true **only after RV1–RV3 hold**; until then it must not be written at all. **A string whose truth depends on a fix must ship with the fix, never before it.** |
| 3 | `cookie-consent.tsx:110-111` *"Cookies Essenciais / Necessários para o funcionamento do site."* | settings dialog | **False on both assertions.** §13.1, **F7**. | States what is kept, that it stays on the device, that it goes nowhere — and that the basis is the user's convenience, not necessity, with the art. 18 § 2º opposition route named. The word *Cookies* goes, because the app sets none of its own. |
| 4 | `cookie-consent.tsx:124-126` *"Telemetria (Google Analytics) / Ajuda a entender como o site é usado."* | settings dialog | **True but insufficient.** It names a recipient and a purpose and omits the operands and the destination. | Carries, or links to, §6.6's U1 operand list and §15's destination. This is the row the policy link most has to serve. |
| 5 | `calculator-views.tsx:75-76` *"Tudo o que você digita fica salvo apenas neste navegador. Nada é enviado para nenhum servidor, e ninguém além de você vê seus horários ou seu salário."* | footer, **every state including consented** | **First sentence true. Second sentence false in the consented state — measured (§7.3). Third sentence true.** | **Lesson 003's shape, and §22 D2's protection.** The true half is not deleted to make the false half go away. The qualifier sits **adjacent to the noun it limits**: the claim is about *what you type*, and what the app sends is *not what you type*. So the replacement asserts the true, narrower thing — the numbers the user enters go nowhere — and the sentence asserting an absolute absence of transmission is **retired**, with a link to the page that says what **is** sent. |
| 6 | `README.md:8` *"Roda no navegador, guarda tudo no seu aparelho, não pede cadastro."* | the repository's front page, crawler-visible | **All three true, and none of them is entry 5's claim.** *Roda no navegador* ✓ (P1). *Guarda tudo no seu aparelho* ✓ for what the user types. *Não pede cadastro* ✓. | **No change required, and this is a ruling, not an omission.** It was checked against the same boundary as entry 5 (lesson **007**) and it passes because it never asserted an absence of transmission. `content-writer` must not "fix" it by symmetry. |

**The qualifier-adjacency condition, in a measurable quantity** — calibrated against the repository's
own standing disclosure stack rather than invented:

> Measured at `HEAD` on the built artifact, the footer's four `<p>` elements have border boxes
> separated by a vertical gap of **8 CSS px**, at both 390 and 1440 viewport widths, at
> `font-size: 12px` / `line-height: 17.4px`, with border-box widths of 358 px and 768 px
> respectively.
>
> **A qualifier is adjacent to the claim it limits when either (a) it is inside the same border box
> as the claim — the same `<p>` — or (b) its border box `top` minus the claim's border box `bottom`
> is `<= 8` CSS px at both 390 and 1440, with no element carrying a different claim between them in
> DOM order.** Quantity: `getBoundingClientRect()`, border box, at `document.documentElement.clientWidth`
> of 390 and 1440.

`AC6`'s literal-string grep is a **backstop**, as `spec.md` already says. The condition above is the
specification, and it is what `qa-engineer` asserts.

---

## 21. Findings

Eleven, not the eight this file's header states — **corrected inline here at the gate that found
them**, per this agent's rule that a measurement contradicting a classification wins and is re-routed
with its new severity before any scope is written on the old one. Every one names a file and a line,
a norm, a source, and the worked case that exposes it. **None is a patch.**

| # | Sev | Where | What the code does | What the norm requires | Source | The case that exposes it |
|---|---|---|---|---|---|---|
| **F1** | high *(latent — ads off in production by human ruling)* | `components/organisms/ad-manager.tsx:10-19` | Injects `pagead2.googlesyndication.com/pagead/js/adsbygoogle.js` gated only on `NEXT_PUBLIC_ADSENSE_ID` and `NEXT_PUBLIC_ENABLE_ADS`. Never reads `lib/consent.ts`. | art. 7º I; art. 7º § 5º (specific consent for sharing with another controller); art. 8º § 4º | S1; S4 | `__tests__/ad-manager.test.tsx` third case loads the script **with no consent stored** and passes — the defect is codified as expected behaviour. `spec.md` AC8. |
| **F2** | **critical** | `components/organisms/cookie-consent.tsx:15` | `useState(true)`. | art. 5º XII — *inequívoca* | S1 | **Measured:** open settings → *Salvar Preferências*, touch nothing → record `{"telemetry":true,…}`, `script[src*="googletagmanager.com"]` = 1. §20.1. |
| **F3** | **critical** | `lib/analytics.ts:11`; `components/organisms/analytics-wrapper.tsx:19` | After a revocation the tag stays loaded and all eight call sites keep transmitting until the document is replaced. | art. 8º § 5º — *a qualquer momento*; art. 18 IX | S1 | **Measured:** one `toggle_theme` after revoking → **1** request to `google-analytics.com/g/collect` carrying `en=toggle_theme`, identical to the consented control. §10.2 R8/R9. |
| **F4** | high | no file — the absence is the defect | Nothing deletes `_ga` / `_ga_<measurement-id>` on revocation; `grep -rn "document.cookie" app components lib hooks` → no rows. | art. 18 VI; art. 5º XIV — *independentemente do procedimento empregado* | S1 | **Measured:** after revoking, `document.cookie` still carries `_ga` and `_ga_5BP2MQK9TG`. §10.2 R10/R11. |
| **F5** | medium | `components/organisms/app-header.tsx:16-24` | Transmits seven device attributes on mount. No document in the repository states a purpose for any individual operand. | art. 6º III — *pertinentes, proporcionais e não excessivos em relação às finalidades* | S1 | `device_pixel_ratio` and `timezone` appear in no purpose statement anywhere in `PRODUCT.md`, `DESIGN.md` or `.specs/`. §12.3. |
| **F6** | high | no file — **T5 has no line number and that is the finding** | Every request reaches Vercel with the IP, the URL and the user-agent, **before any consent surface renders** and regardless of the answer. No string in the application mentions it. | art. 9º I, II and V | S1 | Any cold load. The operation is invisible to `spec.md`'s D1–D4 because all four are code-derived and this one has no code. §6.1, §16. |
| **F7** | high | `components/organisms/cookie-consent.tsx:110-111` | *"Cookies Essenciais / Necessários para o funcionamento do site."* | art. 9º § 1º — *conteúdo enganoso* | S1 | The app sets **no first-party cookie of its own**, and the calculator computes identically with `localStorage` empty (`hooks/use-work-calculator.ts:12-14`, `hooks/use-salary-calculator.ts:30-34`). §13.1. |
| **F8** | high | no file — a contractual and account fact | Personal data is transferred to the United States with no established art. 33 route. | art. 33; Resolução CD/ANPD nº 19/2024 | S1; S6; S7; S9 | The ANPD's only adequacy decision is the **European Union** (Res. 32/2026). art. 33 IX does **not** reach art. 7º IX, so the host transfer cannot ride on legítimo interesse. §15.2. → **H8**. |
| **F9** | **critical** | `components/organisms/calculator-views.tsx:75-76`; pinned by `__tests__/calculator-views.test.tsx:68` | Renders *"Nada é enviado para nenhum servidor"* in the consented state. | art. 9º § 1º — *conteúdo enganoso*, which **voids the consent** | S1 | **Measured:** consented state, one theme toggle → `g/collect?…&en=toggle_theme`. §7.3. |
| **F10** | high | `lib/consent.ts:21` | Writes `{telemetry, timestamp}`. No version, no per-purpose granularity. | art. 8º § 2º — the burden is to prove conformity **with this Law**, which includes art. 9º § 1º | S1 | The controller cannot state which text any stored consent was given against, so §7.5's invalidation has no operand. §9. |
| **F11** | **critical** | `components/organisms/cookie-consent.tsx` (whole file); `components/organisms/calculator-views.tsx:73-101` | No route to any policy exists from any surface. | art. 9º caput — *acesso facilitado*, *apresentadas previamente*; Marco Civil art. 7º XI | S1; S8 | **Measured:** links inside the banner box = **0**; links inside the settings dialog = **0**; links in the footer = **1**, resolving to `https://www.legisweb.com.br/legislacao/?id=489284`. |

**Severity, stated so `tech-lead` can order the work.** F2, F3, F9 and F11 are **critical** because each
one independently voids consent or transmits against the user's recorded choice. F1 is high and
**latent**: the human's ruling that ads are off removes the live exposure, and the reclassification is
recorded here rather than left for a reader to infer from the original spec's framing.

---

## 22. Disclosures required

Eight, not the six this file's header states — **corrected inline**. Each names the omitted variable,
the obligation it discharges, and **the rendering condition in the quantity its substance can be
breached in** (lesson **048**; `AGENTS.md` §5). `content-writer` writes the words at G3; this gate
states what must be said and where it must be measurable.

**The shared quantity, one definition for every row below**, so no sibling rule drifts into a
different box model:

> **Rendered** := the element's `getBoundingClientRect()` **border box** has `width > 0 && height > 0`;
> its computed `visibility` is not `hidden` and its computed `opacity` is not `0`; its border box
> satisfies `left >= 0` and `right <= document.documentElement.clientWidth`; no ancestor with a
> computed `overflow` other than `visible` clips it; and it is in the accessibility tree **on the
> first paint of the surface that carries it**, with no ancestor that is `hidden`, `inert`, a closed
> `<details>`, or carries `aria-expanded="false"`.
>
> Measured at `document.documentElement.clientWidth` ∈ {390, 1440, 2560, 3840}, in **both** themes.
> **"Rendered" is never satisfied by presence in the DOM alone**, and a disclosure behind a control
> the user must press is **not** rendered for the purposes of any row below.

| # | The omitted variable | What must be said | Rendering condition |
|---|---|---|---|
| **D1** | The purpose of the on-device storage, which the banner today calls *"melhorar sua experiência"* | The specific purpose of §6.4 U1 — the numbers survive a reload — and nothing broader. | Rendered on the consent surface **before** any of *Aceitar Tudo*, *Recusar* or *Salvar Preferências* is reachable. Height is `0010`'s budget; presence is this gate's. |
| **D2** | Nothing — this is the **protection** of a true claim | That the calculation runs entirely in the browser and that what the user types reaches no one. **This survives the correction of F9.** | Rendered in **every** consent state, including *consent granted*, on both routes. A correction that removes it to dispose of F9 is a **rejection**, not a pass (`spec.md` § Disclosure obligations 2). |
| **D3** | What actually leaves the device, in the place the user is asked to allow it | §6.6 U1's operand list and the count of eight events, or a route to it that is rendered on the same surface. | Rendered on the consent surface before the decision, **or** reachable from it by a link that is itself rendered there. |
| **D4** | That the art. 8º § 2º proof is weaker than a server-side log | The consent record is kept **on the user's device**; the controller cannot read it, produce it or audit it; what the controller stands on is the published, versioned, dated page and the code gate. §9.4. | Rendered on the policy page, adjacent to the consent-record section, by §20.2's adjacency condition. |
| **D5** | **H1 or H2 not supplied** | Then **the page does not ship** with a blank or invented controller (`spec.md` § Disclosure obligations 5, § Non-goals 3). What is owed instead is **not a softer page**: the processing that depends on the missing value stops. Concretely — with no identified controller and no channel, art. 9º III/IV and art. 41 § 2º I cannot be discharged, so the consent-based operations **T3 and T4 must not run at all**, and the application ships with the analytics and advertising paths disabled until H1 and H2 arrive. | Not a rendering condition — a **shipping** condition, and it is the one remedy in this file that removes a feature rather than adding a sentence. |
| **D6** | What was collected under the consents §7 declares null, and what the controller cannot undo | That data collected before the page's first publication was collected under a consent the controller now treats as invalid; that this application has deleted what it can reach; that what Google holds can only be removed by a request to Google; and the art. 18 VI route, naming both addresses. | Rendered on the policy page. **Additionally rendered on the consent surface on the re-ask of §7.5**, because a returning user being asked a second time is entitled to know why. |
| **D7** | The host, which no consent can decline | Every request reaches **Vercel Inc.**, in the United States, with the IP address, the time, the URL and the user-agent — **before any consent is asked for and regardless of the answer**; refusing cookies does not change it. | Rendered on the policy page, and **named in the art. 18 VIII sentence about the consequences of refusing**, so the user's refusal is not read as achieving more than it does. |
| **D8** | The international character of the transfer | The data goes to the **United States**; **Brazil has recognised no adequacy decision for the United States** (S7); the recipients are **Google LLC** and **Vercel Inc.**; the route relied on is the one H8 establishes. | Rendered on the policy page, adjacent to each of the T3, T4 and T5 sections by §20.2's adjacency condition — **not** collected into a single distant paragraph, because art. 9º II and V are per-operation units. |

---

## 23. Divergences from the code

Every row is an instruction to `tech-lead`, to be planned at G4. **This agent edited nothing.**

| File and line | What it does | What this analysis requires | Finding |
|---|---|---|---|
| `components/organisms/cookie-consent.tsx:15` | `useState(true)` | The opening state of every non-essential category is `false`; the save-without-touching path records a refusal. | F2, §20.1 |
| `components/organisms/cookie-consent.tsx:110-111` | *Cookies Essenciais / Necessários para o funcionamento do site.* | §20.2 entry 3's truth condition. | F7, §13.1 |
| `components/organisms/cookie-consent.tsx:55-56` | *melhorar sua experiência* + *a qualquer momento* | §20.2 entry 2. The revocability half may not ship before RV1–RV3 hold. | §10.4, §20.2 |
| `components/organisms/cookie-consent.tsx` (whole file) | zero links | A route to the policy, rendered on the banner **and** the settings dialog **and** the standing control's surface. | F11 |
| `components/organisms/cookie-consent.tsx` (settings dialog, `:107-148`) | two rows | A **third, separately refusable** advertising row — or §8.4's alternative, removal of the injection path. | F1, §8.4 |
| `lib/consent.ts:21` | `{telemetry, timestamp}` | §9.3's fields: a version, one boolean per purpose, the moment. And nothing else. | F10 |
| `lib/consent.ts:5-18` | returns the stored boolean | A record with an absent or stale version, or older than 24 months, is treated as **absent**. | §7.5, §14.3 |
| `lib/analytics.ts:11` | transmits unconditionally | The single shared point where every one of the eight call sites routes: no transmission without a current affirmative record. **One guard here, not eight at the call sites** (lesson **030**'s shape). | F3, RV2 |
| `components/organisms/analytics-wrapper.tsx:19` | returns `null` | Unmounting is not removal. The injected script and the two `_ga` cookies must go. | F3, F4, RV3 |
| `components/organisms/ad-manager.tsx:10-19` | env-gated injection | Consent-gated on the **advertising** purpose. | F1 |
| `components/organisms/app-header.tsx:16-24` | seven operands | A stated purpose per operand, or the operand goes. | F5 |
| `components/organisms/calculator-views.tsx:75-76` | *Nada é enviado para nenhum servidor* | §20.2 entry 5. The true half survives; the false half is retired with `PRODUCT.md` §9's non-claim row (H6). | F9, D2 |
| `__tests__/calculator-views.test.tsx:68` | pins the string | Inherits the correction; named here rather than discovered at G5. | F9 |
| `__tests__/ad-manager.test.tsx` (third case) | codifies F1 as expected | Inverted, plus a consented case. | F1, `spec.md` AC8 |
| `app/sitemap.ts:9-22` | two URLs | Three. `app/robots.ts` already allows `/` and needs no change. | `spec.md` AC5 |
| `README.md:8` | *Roda no navegador…* | **No change.** Ruled true in §20.2 entry 6, and recorded here so nobody "fixes" it by symmetry. | — |
| `.specs/0011-.../spec.md` AC7 | *11 rows, 6 admitted, 1 of them false* | *11 rows, 7 admitted strings in 6 entries.* | §3.1 |
| `.specs/0011-.../spec.md` P2, §3.2 | 18 keys / `:139-146` | 19 keys, 20 with the consent record; `:139-148`. | §6.10 |
| `.specs/0011-.../spec.md` P5 | *"Six further events"* | Seven further, **eight** in total. | §6.1 |

**Explicitly unchanged, and this is the AC11 guarantee:** no file under `lib/` that computes a
user-visible number, and no table, rate, bracket, divisor or ceiling. `lib/consent.ts` and
`lib/analytics.ts` are in the list above and neither computes a number the user reads.

---

## 24. Open questions and preconditions for the human

> **UPDATED AT RUN 3.** **H1**, **H2** and the GA4 half of **H7** are **answered by the human** and
> recorded verbatim in §26.1–§26.3; **H8 is ruled** in §26.4. The rows below are left as they stood so
> the question each one asked stays readable; **§26 governs where they differ**. **H7's host-log half
> and a narrowed residual of H8 (`H8b`) remain open** — §26.3 and §26.4(g).

**H3 is closed by §19** and leaves this list. **H4 is answered** — ads are off in production — and its
second half (personalised vs non-personalised) survives inside Q2 below because it decides the page's
T4 wording. Two new preconditions are raised.

| # | What is needed | Why this gate cannot supply it | Blocks |
|---|---|---|---|
| **H1** | **The controller's display name**, in the form the responsible party is willing to publish. The human has ruled the controller **is a natural person, the repository owner**. The **name to print** is still owed. | art. 9º III. No value in the repository identifies a controller — `app/layout.tsx:27-29` is authorship metadata and §6.3 refuses to promote it. This gate **does not** invent a placeholder, does not use an address found in git history or configuration, and does not use the owner's employer address. | **G3 copy.** Not this gate. |
| **H2** | **A monitored contact e-mail** for data-subject requests. | art. 9º IV, art. 18 §§ 3º–5º, art. 41 § 2º I, and Resolução ANPD nº 2/2022 Anexo I art. 11 § 1º — which §19 makes **mandatory**, since no *encarregado* is appointed. **What is being accepted with H2 is a 15-day answer** (art. 19 II), not an address. | **G3 copy.** |
| **H5** | Acceptance of the maintenance obligation. | Unchanged, and §5's S2 finding sharpens it: the ANPD's small-agent regime simplifies the *registro*, the *incidente*, the *encarregado* and the *segurança* policy — **and nothing about art. 9º**. Anexo I art. 7º restates the information duty in full and adds *acesso facilitado*. **There is no size below which this page becomes optional.** | The spec, ultimately. |
| **H6** | The `PRODUCT.md` §9 amendment retiring *"nada é enviado para nenhum servidor"*, with the replacement's evidence row. | `AGENTS.md` §4 human approval point. §20.2 entry 5 supplies the truth condition it must be written against. | G7 docs. |
| **H7** *(new)* | **The GA4 property's configured data-retention value** (2 or 14 months, per S4) and **the host plan's log-retention period**. | art. 9º II requires a *duração* per operation. §14 derives every other period; these two are account settings, invisible to the repository. **The page states the configured value, never the range.** | **G3 copy**, for the T3 and T5 duration cells only. |
| **H8** *(new)* | **Which art. 33 route each transfer stands on**, and specifically whether the **Google Ads Data Processing Terms are accepted** on this GA property. | §15.2 closes art. 33 I (no US adequacy decision — S7) and art. 33 IX for the host (it reaches art. 7º II, V and VI, not IX). S9 shows the processor terms are **not automatic** outside the EEA/UK/Switzerland. Resolução ANPD nº 19/2024's 12-month incorporation deadline **elapsed 2025-08-23**. | **G3 copy** for the D8 route sentence, and §16's Analytics-role paragraph. |

| # | Question | This gate's position |
|---|---|---|
| **Q1** | Does `PRODUCT.md` §7's maintainability test refuse this page? | **Not decided here — it is H5.** What §5's S2 and §6.11 add is that the maintenance burden is now **enumerable**: four numbers drift (the `_ga` lifetime, the AdSense lifetimes, the GA retention setting, the host's log retention), one name drifts (the ANPD's — twice since 2025), and **U10's last-changed date is the cheapest possible discharge**. The asymmetry `spec.md` recorded stands: the alternative to publishing is to stop processing, not to publish less. |
| **Q2** | Does the AdSense account serve **personalised** ads? | **Open** — H4's surviving half. §8.5 gives the compliant text for both answers and the T4 cells may not be written before it arrives. Ads being off in production does **not** answer it, because the question is about the account's configuration when they are switched on. |
| **Q3** | If H8 returns that the Google Ads Data Processing Terms are **not** accepted on this property, what does §16 say? | Then the page **may not assert** that Google acts as *operador* for Analytics. It states instead that Google receives the measurement data and that the controller has not established a processing agreement for it — and that is a strong argument for switching Analytics off rather than for wording the paragraph carefully. This gate flags it now so the answer to H8 does not arrive at G3 with no rule attached to it. |
| **Q4** | Do users who already accepted need to be asked again? | **Yes. Answered — §7.5.** `spec.md` Q4 is closed. |
| **Q5** | Is `NEXT_PUBLIC_ENABLE_ADS` `true` in production? | **Answered by the human: no.** F1 is reclassified **latent** and the obligation in §8.4 is unchanged, because the gate that protects the user must be the consent and not the environment variable. |

---

## 25. What a second analyst must be able to do with this file

`AGENTS.md` §5's rebuild contract, stated for a file that contains no tax table:

- **Reconstruct the page's contract** — the ten units of §6.9, times the five operations of §6.1,
  with every cell filled in §§6.3–6.8, without opening the repository.
- **Reproduce every measurement** — §6.12 gives the copy method, the port, the artifact, the network
  interception and the viewport; §7.3, §9.2, §10.2, §20.1 and §20.2 give the numbers each one
  produced, including the discriminating controls.
- **Reach the same verdict on each of the sixteen dependencies** from the primary sources listed in
  §5, §6.11 and the S6–S9 entries, each with its publisher, its URL, its effective date and, for the
  two consolidated texts, the md5 of the file actually read.
- **Fail this gate where it is wrong.** §0's *what this gate would have rejected on*, the known-bad
  value beside every measured rule in §10.4, and the empty-collection control beside every guard.

**Verdict stands: `pass`.** The build is non-compliant in eleven measured ways and that is precisely
what a `pass` at G2 means — the rules are settled, the gaps are named with their norms, and nothing
downstream has to invent a number, a period, a role or a sentence.

---

## 26. Addendum — run 3, 2026-09-19: three preconditions recorded, H8 ruled

**The G2 verdict is unchanged and is not re-run.** Nothing ruled at runs 1–2 is reopened here except
where this section says *amended*, in which case the amendment is also marked inline at the section
that carried the error (§15.3, §24). This addendum does four things: it records **H1**, **H2** and
the GA4 half of **H7** verbatim as the human gave them; it **rules H8**; it states, in a measurable
quantity, what the route H8 lands on requires of the page; and it names, without softening, the two
measured defects that route currently breaches and the spec that owns each remedy.

### 26.1 — H1, recorded verbatim: the controller is **`Rafael Martins`**, natural person

| | |
|---|---|
| The value to print | **`Rafael Martins`** — exactly this string |
| Its form | **pessoa natural**, confirming the form §19 and §17 already ruled on |
| Its provenance, as given | the name already public in every commit in this repository; chosen by the human over their full civil name |
| Discharges | art. 9º **III** — *identificação do controlador* |

Three consequences, each executed rather than assumed:

1. **`content-writer` prints this string and adds nothing to it.** No honorific, no title, no CPF, no
   postal address. art. 6º III (*necessidade*, *não excessivos em relação às finalidades*) is the unit:
   art. 9º III asks for the controller's **identification**, and a CPF published on a static page is
   additional personal data of the controller with no purpose in the article. Where a reader needs a
   route to the controller, art. 9º **IV** supplies it and **H2** fills it.
2. **§19's small-agent ruling and §17's Marco Civil ruling now rest on a recorded value, not only on
   a ruling.** Anexo I art. 2º I of Resolução CD/ANPD nº 2/2022 names *pessoas naturais* expressly, so
   no *encarregado* is required; Marco Civil art. 15's caput requires a *pessoa jurídica*, so its
   six-month duty does not bind. Both stand.
3. **§22 D5's shipping condition lifts on its H1 half**, and only that half — see §26.2 for the other.

### 26.2 — H2, recorded verbatim: the channel is **`contact@devrma.com`**

| | |
|---|---|
| The value to print | **`contact@devrma.com`** — exactly this string |
| Its provenance, as given | published on the human's own portfolio; already public; **not** a work address |
| Discharges | art. 9º **IV**; art. 41 § 2º I via Resolução CD/ANPD nº 2/2022 Anexo I art. 11 § 1º (§19); it is the address art. 18 §§ 3º–5º requests arrive at |

**What was accepted with this value is an obligation, not a string** — restated here because §24's H2
row said so and the value's arrival is the moment it binds: **art. 19 II's 15-day answer**, *sem
custos para o titular* (art. 18 § 5º), for every art. 18 right named in §11.

**Rendering rule**, so the value is not lost in an `href`: the address is **rendered as text** per
§22's *Rendered* definition — a `mailto:` link whose accessible name or text content is the literal
string `contact@devrma.com`. An icon-only or *"fale conosco"*-labelled link does not discharge art. 9º
IV, because *acesso facilitado* (art. 9º caput) is measured on what the reader can read and copy.

> **§22 D5 is now fully discharged as to H1 and H2.** The consent-based operations T3 and T4 are no
> longer blocked by a missing controller or a missing channel. They remain blocked by §26.3 and by
> the defects in §26.4(f) — for different reasons, stated there.

### 26.3 — H7, recorded: **never configured, therefore the platform default** — and what that costs

**The answer is recorded exactly as given: the GA4 property's data-retention value was never
configured, so whatever is in force is Google's platform default rather than a decision by the
controller.** This gate's ruling is about what that provenance permits the page to say.

**26.3.1 — The finding, from the primary sources, is that Google publishes no default.** Checked this
session, in this order:

| Source | What it states | URL |
|---|---|---|
| Analytics Help 7667196, **en** and **pt-BR**, both fetched | the **option set** only — *2 months* or *14 months* for standard properties; 26/38/50 months **"Available to 360 properties only"**. **No sentence anywhere states which value a property starts at.** | https://support.google.com/analytics/answer/7667196 |
| Admin API v1beta, `DataRetentionSettings` | fields `eventDataRetention`, `userDataRetention`; enum `RETENTION_DURATION_UNSPECIFIED` *("Data retention time duration is not specified")*, `TWO_MONTHS`, `FOURTEEN_MONTHS`, `TWENTY_SIX_MONTHS` / `THIRTY_EIGHT_MONTHS` / `FIFTY_MONTHS` *("Available to 360 properties only")*. **No documented default.** | https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/DataRetentionSettings |

**So H7's answer supplies a provenance, not a value.** Two things nevertheless follow and are settled:

- **The default, whatever it is, is one of `{2 months, 14 months}`** for this property, because the
  longer durations are contractually restricted to Analytics 360. **Which property type applies here:
  the standard, free one** — `G-5BP2MQK9TG`, measured on the wire in §15.1, on an account with no 360
  contract. This is an **assumed operand** and it is named as one: if a 360 contract exists, the
  option set widens to 50 months and the sentence below changes.
- **How a reader verifies it, in one action:** GA4 **Admin → Data collection and modification → Data
  retention**, which displays the value in force even when it was never touched; or
  `GET https://analyticsadmin.googleapis.com/v1beta/properties/{propertyId}/dataRetentionSettings`.

**26.3.2 — Ruling: an unconfigured platform default may not be published as art. 9º II's *duração*.**
Four units executed, each with the answer it gives:

| Unit | Verbatim substance | Applied to an unconfigured default |
|---|---|---|
| art. 9º **II** | *"forma e duração do tratamento"* | A **duração** must be stated per operation. A value the controller has never read is not stated; it is guessed. |
| art. 6º **IV** | *"consulta facilitada e gratuita sobre a forma e a duração do tratamento"* | Same duty from the principles side; it is not discharged by a range. |
| art. 8º **§ 2º** | *"Cabe ao controlador o ônus da prova"* | The controller cannot prove, as of any date, a number he never set, that Google documents nowhere, and that Google may change unilaterally. |
| art. 8º **§ 6º** | *"Em caso de alteração de informação referida nos incisos I, II, III ou V do art. 9º … deverá informar ao titular, com destaque"* | **This is the unit the human's question about a silently changing default lands on.** A default that moves without anyone touching the property changes an art. 9º II information **without producing any event the controller can notice**, so the § 6º duty becomes structurally undischargeable. That is not a risk to accept; it is a duty that cannot be performed. |

> **Ruling on H7.** The page **does not print a platform default as a duration**, and — per §24 H7,
> unchanged — **never prints the range**. The remedy is the cheapest one in this whole file: the
> controller opens the property once and **sets** the value explicitly to 2 or 14 months. That single
> action converts a default into a decision, gives art. 8º § 2º something to prove, and restores
> art. 8º § 6º by making the value one that only changes when someone changes it.
>
> **Until it is set or at least read on a dated reading, T3's art. 9º II cell cannot be filled**, and
> §6.9's contract is that the cell is not optional. An operation whose *duração* is absent from the
> page has not been informed under art. 9º, and under art. 9º § 1º a consent given against
> information not *"apresentada previamente com transparência"* is **null** — the same trigger §7
> already applied to the whole prior record set. **So T3 does not run with that cell empty.** This is
> a thirty-second account action, not an argument for switching Analytics off; but if the action is
> not taken, the consequence is the one stated and it is not negotiable at G5.

**26.3.3 — A scope rule found this session that §14 does not carry, and that the duration sentence
must not omit.** From the same primary page, verbatim: *"The data retention setting does not affect
standard aggregated reports (including primary and secondary dimensions) in your Google Analytics
property"*; *"When data reaches the end of the retention period, it is deleted automatically on a
**monthly basis**"*; *"The maximum amount of time that Analytics will retain Google-signals data is
**26 months**, regardless of your settings."*

A page that says *"os dados são apagados após N meses"* is therefore **false in three directions**:
aggregated reporting is not covered at all, deletion lags the period by up to the next monthly sweep,
and Google-signals data has its own 26-month ceiling. **New disclosure D9**, §26.6.

**26.3.4 — The host half of H7 is unanswered and stays open as `H7b`.** The human's ruling covers the
GA4 property. **Vercel's log-retention period was not given**, is not in the repository, and is not
published in any source this gate could fetch as a primary statement of the plan in force. T5's
art. 9º II cell is therefore still empty. T5 is **not** consent-based, so art. 9º § 1º does not void
anything — but art. 9º II and art. 6º IV bind regardless of the legal basis, and §22 **D7** already
requires T5 to be described. The page states T5's retention only when H7b arrives; until then the
T5 duration cell says, truthfully, that the period is set by the hosting provider's plan and has not
been established by the controller — **and that sentence is itself a defect disclosure, not a
period**, which is precisely what `PRODUCT.md` §4's *cite or omit* permits and what an invented
number would not be.

### 26.4 — H8, ruled

**26.4.1 — The two-layer rule, which run 2 applied implicitly and which is now quoted.** Resolução
CD/ANPD nº 19/2024, **Anexo I art. 9º**, verbatim: *"A transferência internacional de dados somente
poderá ser realizada para atender a propósitos legítimos, específicos, explícitos e informados ao
titular … e desde que amparada em: I - uma das hipóteses legais previstas no art. 7º ou no art. 11 da
Lei nº 13.709 …; e II - um dos seguintes mecanismos válidos de realização da transferência
internacional: a) [decisão de adequação]; b) cláusulas-padrão contratuais, normas corporativas
globais ou cláusulas contratuais específicas …; ou **c) nas hipóteses previstas nos incisos II, 'd',
e III a IX do art. 33**."* And **Anexo I art. 1º parágrafo único**: *"O disposto neste Regulamento não
exclui a possibilidade da realização de transferência internacional de dados com base nos demais
mecanismos previstos no art. 33 … **que não dependam de regulamentação**."*

**Two layers, not one: a legal basis *and* a mechanism. art. 33 VIII is an admissible mechanism and
it needs no further ANPD act to be usable** — art. 9º II c names it and art. 1º parágrafo único says
so in terms.

**26.4.2 — art. 33 re-executed for a natural-person controller of small scale, with the evidence
gathered this run.** Every unit carries an answer; none is left as *"not established"* without saying
why it cannot be established **by this controller**.

| Unit | T3/T4 — Google LLC | T5 — Vercel Inc. | Evidence gathered this run |
|---|---|---|---|
| **I** adequacy | **Closed.** | **Closed.** | ANPD: *"Até o momento, a União Europeia foi considerada…"* — Resolução CD/ANPD nº 32/2026. The US is not on the list. (S7, re-confirmed) |
| **II a** specific clauses | **Closed in fact.** | **Closed in fact.** | The ANPD's own page, fetched this run: *"Until the present date, there has been no Board decision regarding specific contractual clauses, equivalent standard contractual clauses or corporate rules."* Art. 35 § 5º routes these through ANPD verification, which has produced nothing. |
| **II b** cláusulas-padrão | **Closed in fact.** Google's **Ads Data Processing Terms** carry SCCs for the **EU GDPR, UK GDPR and Swiss FDPA** only; the string *LGPD* appears **twice, both times in definitions** (*"'Applicable Data Protection Legislation' means … including European Data Protection Legislation, the LGPD and US State Privacy Laws"*; *"'LGPD' means the Brazilian General Data Protection Law"*), with **no operative Brazilian clause**. | **Closed in fact.** Vercel's DPA incorporates mechanisms *"from a jurisdiction (i.e. the European Economic Area, the United Kingdom, Switzerland or any other jurisdiction listed in Schedule 3)"*, with jurisdiction terms for Australia, Canada and California. **Brazil is absent.** | Res. 19/2024 Anexo I art. 16 requires the ANPD's text *"adotadas integralmente e sem qualquer alteração"* and **signed by exporter and importer**; the incorporation deadline **elapsed 2025-08-23**. A natural person cannot impose a signed addendum on Google LLC or Vercel Inc. **This route is not merely unestablished — it is unavailable to this controller.** |
| **II c** normas corporativas globais | Closed — same ANPD statement. | Closed — same. | — |
| **II d** selos/certificados/códigos | Not established; and art. 9º II c admits it only as an ANPD-recognised instrument. | Same. | — |
| **III, IV, VI, VII** | Not applicable. | Not applicable. | No judicial cooperation, no threat to life, no international agreement, no public policy. |
| **V** ANPD authorisation | Available in law, **not in practice**: a petition through the ANPD's SEI channel, per transfer. Not sought. | Same. | https://www.gov.br/anpd/pt-br/canais_atendimento/peticionamento-eletronico-anpd |
| **VIII** specific and highlighted consent | **OPEN, and it is the route.** Nothing outside the controller's own UI is required. | **Closed**, unchanged from §15.2: the user cannot decline being served the page they requested, so a consent conditioned that way is not *livre* (art. 5º XII). | LGPD art. 33 VIII, re-read verbatim this run. |
| **IX** necessity for art. 7º II, V, VI | Not applicable. | **Closed** — T5's basis is art. 7º **IX**, which inciso IX does not enumerate. | Unchanged from §15.2. |

**26.4.3 — Ruling, part one: T3 and T4 stand on art. 33 VIII.** It is the only route open to a
natural-person controller of small scale, and it is open **because it is the only one whose operand is
the controller's own screen** rather than a counterparty's signature or a regulator's docket. Its
price is stated in §26.5 and it is a UI obligation, not a paragraph.

**26.4.4 — Ruling, part two, and it amends §15.3: T5 is not governed by art. 33 at all.** Resolução
CD/ANPD nº 19/2024, Anexo I:

- **art. 3º V** — *"coleta internacional de dados: coleta de dados pessoais do titular efetuada
  **diretamente** pelo agente de tratamento localizado no exterior"*;
- **art. 6º** — *"A coleta internacional de dados **não caracteriza** transferência internacional de
  dados. Parágrafo único. A coleta internacional de dados observará as disposições da Lei nº 13.709 …
  quando verificada uma das hipóteses indicadas no art. 3º da Lei."*

The user's browser addresses its request to Vercel's edge. No agent in Brazil holds that IP, that URL
or that user-agent and then forwards it; Vercel collects it **directly from the titular**. That is
art. 3º V's definition, word for word, and art. 6º removes it from art. 33.

> **The ambiguity is the finding, and it is named rather than hidden.** The competing unit is **art.
> 3º III**: *"transferência: operação … por meio da qual um agente de tratamento **transmite,
> compartilha ou disponibiliza acesso** a dados pessoais a outro agente de tratamento."* On that
> reading, choosing a foreign host *disponibiliza acesso*, T5 **is** a transfer, and — since I, II
> a–c, V, VIII and IX are all closed for it — **no route exists at all**, and the only remedy would be
> a host bound by the ANPD's cláusulas-padrão or a host in Brazil.
>
> **The reading this analysis takes, and the operand it assumes on the user's behalf:** art. 6º, for
> T5 only. art. 6º is the **specific** unit — it exists precisely to answer *"what about data the
> foreign party collects itself?"* — and art. 3º III is the general definition it carves out of.
> **The assumed operand is that no Brazilian intermediary holds the request before Vercel does**,
> which is true of a static deployment served from Vercel's own edge and would be false if a Brazilian
> CDN or proxy were interposed. If that ever changes, this ruling changes with it.
>
> **What breaks if the ANPD reads it the other way:** the page's T5 sentence is wrong about a
> characterisation, not about a fact — the fact it states (the data reaches Vercel Inc. in the United
> States before any consent is asked) is the same under both readings, which is why **§22 D7 is
> unchanged and is what protects the reader either way**. Whether to move the host is a human
> decision about the product, not a gate decision; recorded as **Q6**, §26.7.

**26.4.5 — Why the same art. 6º escape is *not* taken for T3/T4, stated because a reader will ask.**
The gtag beacon also leaves the user's browser for a foreign recipient. The difference is an act of
the controller: this controller injects the tag, defines the **eight** events (§6.1/P5), and receives
the reports — art. 3º III's *disponibiliza acesso* is executed by him. Vercel receives a request the
user's own navigation addresses to it. **And the prudential asymmetry is recorded rather than left
implicit**: taking the protective reading for T3/T4 costs one sentence and one distinct act in a
dialog the user can refuse; taking it for T5 would cost the product. Where two units each yield a
defensible answer, this gate takes the protective one **where its price is a sentence**, and says so.

**26.4.6 — What amends §15.3, marked inline there.** §15.3's *"Both transfers need a route under art.
33 and neither route is established"* was **right that no route was established and wrong about T5's
characterisation**, and it was wrong because run 2 executed art. 33 and the LGPD's own art. 5º XV
without executing Anexo I arts. 3º V and 6º of the regulation that implements them. The lesson shape
is this file's own: **every operative unit of every instrument, including the regulation's definition
articles, not only the law's.**

### 26.5 — What makes the art. 33 VIII consent *specific and highlighted*, in measurable terms

art. 33 VIII's operative words, verbatim: *"quando o titular tiver fornecido o seu **consentimento
específico e em destaque** para a transferência, com **informação prévia sobre o caráter
internacional** da operação, **distinguindo claramente esta de outras finalidades**"* — read with art.
5º XII (*livre, informada e inequívoca*), art. 8º § 4º (generic authorisations are null) and art. 9º
§ 1º (misleading or non-prior information nullifies).

Seven conditions. **C1, C2, C3 and C6 carry the substance; C4 and C5 are geometric tripwires and a
borderline reading of either does not decide a verdict alone.** The quantity is the one §22 already
defined for the whole file — `getBoundingClientRect()`, **border box** — and *Rendered* means exactly
what §22 says, including *not behind a control the user must press*.

| # | Condition | How it is measured |
|---|---|---|
| **C1** | **A distinct act.** The transfer consent is produced by a user act directed at the transfer, and the stored record carries a **field of its own** for it, alongside §9.3's version and per-purpose booleans. No path that touches nothing may write it as granted. | Drive the save-without-touching path of §20.1: the record's transfer field must read **false**, and `script[src*="googletagmanager.com"]` must be **0**. This is the same discriminating control §20.1 used, run against the new field. |
| **C2** | **Distinguished from other purposes** (art. 33 VIII in fine). The sentence that states the international character is in **its own element** and **no other purpose is asserted inside the same border box**. A single sentence doing measurement-purpose duty *and* transfer duty fails, exactly as §16 forbids merging Google's two roles. | Element-level: the transfer sentence's border box contains no other purpose string from §6.6's inventory. |
| **C3** | **Prior information** (art. 33 VIII; art. 9º § 1º). The sentence is **Rendered** per §22 on the **first paint** of the surface carrying the control, before any of *Aceitar Tudo*, *Recusar* or *Salvar Preferências* is reachable. | §22's *Rendered*, at clientWidth ∈ {390, 1440, 2560, 3840}, both themes. |
| **C4** | **Destaque, geometric.** The sentence's border box is fully inside the surface's initially visible area **without scrolling** — `rect.top >= 0 && rect.bottom <= document.documentElement.clientHeight` — at **390 × 844** and **1440 × 900**, both themes; and its computed `font-size` is **not smaller** than the computed `font-size` of the body copy inside the same dialog. | **Calibration status, stated rather than implied:** the geometric half inherits §22's viewport set and needs no new measurement. **The `font-size` half has no worked measurement at G2, because the surface it measures does not exist yet.** It is calibrated at G5 against the built dialog by whoever implements it, and **re-measured at G6 by this gate**; the number that ends up in the rule is that measurement, not this prose, per this file's standing rule that the worked example wins. |
| **C5** | **Adjacency**, by §20.2's already-measured condition: inside the same border box as the control's label, or `top − bottom <= 8` CSS px, at 390 and 1440, with no element carrying a different claim between them in DOM order. | §20.2's measured 8 px gap on the built artifact. |
| **C6** | **The mechanism dies with the consent.** art. 33 VIII is the *mechanism*; when the consent is revoked the mechanism ceases at that instant, so **no further byte may leave for the United States in the same document**. RV1–RV3 of §10 are therefore not only art. 8º § 5º obligations — they are what keeps the transfer lawful at all. | §10.2's measured control: one instrumented interaction after revocation must produce **0** requests to `google-analytics.com/g/collect`, against the **1** measured today. |
| **C7** | **Provability** (art. 8º § 2º). The record carries §9.3's **version**, because the burden for a transfer consent is the burden to show **which transfer statement** the user was shown. | The version field is non-empty and matches the published page's version; a record with an absent or stale version is treated as absent (§7.5). |

**What the sentence must say, for the route to hold** — the content half, which `content-writer`
words from here and §22 D8/D10:

1. that the data is **sent to the United States**;
2. that the recipient is **Google LLC** (T3 and T4 named separately, per §16);
3. that **Brazil has recognised no adequacy decision for the United States** (S7) — the fact the
   reader needs in order to understand what they are being asked to accept, and the reason art. 33
   VIII exists as a route at all;
4. that this is the **basis on which the transfer is made**, i.e. that the transfer happens **because
   the reader agreed to it** and stops if they do not;
5. that **refusing it does not stop the request reaching the host** (§22 D7), so the refusal is not
   read as achieving more than it does.

### 26.6 — This ruling creates obligations that two measured defects currently breach

Stated plainly, and not softened because the fixes land in code rather than in words. **Both remedies
are owned by this spec, `0011`** — each is already a row in §23 — so nothing here is routed away.

| Condition | Breached by | The consequence the H8 route adds | Owner |
|---|---|---|---|
| **C1** | **F2** — `components/organisms/cookie-consent.tsx:15`, `useState(true)`: the switch is pre-enabled and the save-without-touching path **writes a consent record untouched** (measured, §20.1). | Under art. 5º XII this was already a null consent. Under art. 33 VIII it is **worse in kind**: with no specific act there is **no transfer mechanism at all**, so every beacon sent on such a record is an **art. 33 violation in addition to** the art. 5º XII one. A null consent does not degrade the transfer to *unconsented*; it leaves the transfer **unauthorised**. | **`0011`** — §23 row `cookie-consent.tsx:15`. |
| **C6** | **F3** — revocation takes effect only on the next document; one interaction after revoking still produces **1** request to `g/collect` (measured, §10.2). | The mechanism is extinguished at the moment of revocation. Every request after it is a transfer to the United States **with no route under art. 33**, on top of art. 8º § 5º and art. 18 IX. | **`0011`** — §23 rows `lib/analytics.ts:11` and `components/organisms/analytics-wrapper.tsx:19`. |
| **C1, C3, C7** | **§7** — every consent record predating this page is **null** under art. 9º § 1º, on both triggers. | A null consent is a null mechanism. **Every transfer made to date stands on no art. 33 route**, which is a fact §22 **D6** must now also convey. And the **re-ask of §7.5 must itself satisfy C1–C7** — a re-ask that reproduces the current dialog reproduces the defect. | **`0011`** — §7.5, D6. |

> **F2 and F3 are already `critical` in §21 and this addendum does not re-rank them.** What it changes
> is the *reason*: they were critical because they void consent; they are also the reason a transfer
> to the United States currently has no lawful route. A reader who fixes F2 for the art. 5º XII reason
> alone — by flipping a default — would still fail **C1 and C2**, because art. 33 VIII wants a
> **distinct, specifically informed act**, not merely an unset checkbox.

**Two disclosures are added to §22, whose count therefore becomes ten — corrected inline here at the
gate that found them, per this file's standing rule.**

| # | The omitted variable | What must be said | Rendering condition |
|---|---|---|---|
| **D9** | What the GA retention period does **not** cover | That the stated period governs **user-level and event-level** data; that **standard aggregated reports are not affected by it**; that deletion runs on a **monthly** sweep, so data can persist past the period until the next sweep; and that **Google-signals data is retained up to 26 months regardless of the setting**. All four are Google's own statements (§26.3.3). | Rendered on the policy page, **adjacent to the T3 duration figure** by §20.2's adjacency condition — a period stated without its scope is §22's own definition of a claim whose qualifier drifted away from it. |
| **D10** | The legal route the transfer stands on | That the transfer to Google **happens because the reader consented specifically to it**, with §26.5's five content items; and, for **T5**, that the request reaching **Vercel Inc.** in the United States is a **collection made directly by the host** and not something the reader can refuse (§26.4.4), with the LGPD applying to it regardless (Anexo I art. 6º parágrafo único; LGPD art. 3º). | The Google half is Rendered **on the consent surface**, by §26.5 C1–C5. The Vercel half is Rendered on the policy page and named in the art. 18 VIII consequences-of-refusing sentence, per §22 D7. |

### 26.7 — What remains open after this addendum

| # | What is still needed | Why this gate cannot supply it | Blocks |
|---|---|---|---|
| **H7b** | **The host plan's log-retention period.** The GA4 half is answered; this half was not. | Not in the repository; not published as a primary statement of the plan in force. §26.3.4 states what the page says meanwhile, and that sentence is a disclosure, not a period. | The T5 duration cell only. |
| **H8b** *(narrowed residual of H8)* | **Whether the Google Ads Data Processing Terms are accepted on this GA property.** | **No longer a transfer question** — art. 33 VIII is the mechanism and needs no contract (§26.4.3). It remains the **role** question: the terms are the instrument that makes Google an *operador* for Analytics. §24 **Q3** is unchanged and still governs: if they are not accepted, the page **may not** call Google an *operador*, and states instead that Google receives the measurement data with no processing agreement established. | §16's Analytics-role paragraph only. **Not** D8's route sentence, which §26.4 now settles. |
| **Q2 / H4 second half** | Personalised AdSense. | Unchanged. §8.5 gives both texts. | T4 cells. |
| **H5**, **H6** | Unchanged. | — | — |
| **Q6** *(new)* | **Whether the art. 6º *coleta internacional* reading for T5 is accepted as the position this site publishes**, knowing the alternative reading (art. 3º III) would leave the host transfer with no route and make a Brazilian or ANPD-clause-bound host the only remedy. | §26.4.4 rules the reading and states the operand it assumes. This question is not *which reading is right* — that is ruled — but **whether the human accepts the residual exposure** rather than changing hosts, and `AGENTS.md` §4 rule 8 makes the acceptance of a known legal imprecision a human act, written into the spec. | Nothing today. D7 and D10 protect the reader under **both** readings. |

### 26.8 — Sources added and re-verified at run 3

| # | What | Fetched this session | URL |
|---|---|---|---|
| **S10** | **Resolução CD/ANPD nº 19/2024, full DOU text**, Anexo I arts. 1º–12 and Anexo II read verbatim — the first time this gate read the **Regulamento's own definition articles**, which is what §26.4.4 turns on. `md5 cd987db0bb53fa3fafc75f838b3bc732`, 165 037 bytes, HTTP 200. | yes | https://www.in.gov.br/en/web/dou/-/resolucao-cd/anpd-n-19-de-23-de-agosto-de-2024-580095396 |
| **S11** | **Google Ads Data Processing Terms** — SCCs for EU GDPR, UK GDPR, Swiss FDPA; *LGPD* appears only in two definitions; acceptance is by affirmative act (*"the Processor Services for which Customer clicked to accept these Data Processing Terms"*). | yes | https://business.safety.google/adsprocessorterms/ |
| **S12** | **Vercel Data Processing Addendum** — transfer mechanisms for the EEA, the UK, Switzerland and the Schedule 3 jurisdictions; Australia, Canada and California terms; **no Brazil, no ANPD clauses**. | yes | https://vercel.com/legal/dpa |
| **S13** | **GA Admin API v1beta `DataRetentionSettings`** — the enum, and the absence of any documented default. | yes | https://developers.google.com/analytics/devguides/config/admin/v1/rest/v1beta/DataRetentionSettings |
| **S14** | **ANPD, *Transferência Internacional de Dados*** — re-confirmed: EU-only adequacy (Res. 32/2026) **and** *"no Board decision regarding specific contractual clauses, equivalent standard contractual clauses or corporate rules"* to date. The second half is new and is what closes art. 33 II a and II c **in fact**. | yes | https://www.gov.br/anpd/pt-br/assuntos/assuntos-internacionais/transferencia-internacional-de-dados |
| **S1 re-fetch** | LGPD re-fetched: `md5 a18ffce1d1dc8418c381ee8373a4f475`, **310 252 bytes** — the **same byte count** as run 2's file with a **different md5**. Run 2's file was not retained, so the delta **cannot be attributed** and is recorded as unattributed rather than explained away; Planalto's HTML carries per-response variation. **arts. 5º XII, 8º caput e §§ 1º–6º, 9º caput e §§ 1º–3º and 33 I–IX were re-read verbatim this run and are unchanged from §5's quotations.** | yes | https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm |

**Nothing in this addendum was measured against a rendered surface, and nothing in it claims to have
been.** §26.5 C4's font-size clause is the one number left uncalibrated, it is named as such, and it
is a G5 measurement and a G6 re-measurement rather than a value this gate invented.

**The G2 verdict is unchanged: `pass`.**
